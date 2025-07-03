/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : FCCRCMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

  Changed By         : Vineeth T M
  Changed On         : 07-JAN-2021
  Search String      : OBCL_14.4_SUPP#32167862 change
  Change Reason      : Fix provided for the issue CCY updated wrongly on adding row to margin rate block
  
  Changed By         : Vineeth T M
  Date               : 27-Jan-2021
  Change Description : Curreny Mapping Fix
  Search String      : OBCL_14.4_BUG#31598653:Curreny_Mapping_Fix changes
  
  Changed By         : Akhila Samson
  Date               : 03-Mar-2023
  Change Description : Redwood changes
  Search String      : Bug#34958820_Redwood_changes
  
  Changed By         : Akhila Samson
  Date               : 13-Apr-2023
  Change Description : Redwood changes,total margin rate was not populating for participant margin
  Search String      : Bug#34958820_Redwood_fix
****************************************************************************************************************************/
var gPrevAction;
function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
//OBCL_14.4_SUPP#32167862 change start
/*function fnPostAddRow_BLK_MARGIN_RATE_KERNEL() {
	rowIndex = dbIndexArray["BLK_MARGIN_RATE"];
	for(var i=0;i<rowIndex;i++){	
		getElementsByOjName("CCY")[i].value = getElementsByOjName("CCY")[0].value;
	}
    return true;
}*/
//OBCL_14.4_SUPP#32167862 change end
//OBCL_14.4_BUG#31598653:Curreny_Mapping_Fix changes start
//throw error if multiple rows are selected at ccy block
function fnPreAddRow_BLK_MARGIN_RATE_KERNEL() {
	var msob_tchk = 0 ;
	len = getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows.length;//Bug#34958820_Redwood_changes
	for(i = 0;i < len; i++)
      {
        if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){ //Bug#34958820_Redwood_changes
          if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) //Bug#34958820_Redwood_changes
          {
            msob_tchk = msob_tchk +1;
            }
         }
        else
          break;
       }

	 if (msob_tchk > 1 ) {                  
	  showErrorAlerts('IN-HEAR-138');
	  return false ;
	  }
	 else if (msob_tchk == 0 ) {                  
	  showErrorAlerts('IN-HEAR-206');
	  return false ;  }
	 else {
		 return true;
	 }
}
//assign ccy value to blk_margin_rate from ccy block
function fnPostAddRow_BLK_MARGIN_RATE_KERNEL() {
	ri = dbIndexArray["BLK_MARGIN_RATE"];
	var sr = 0 ;
	var msob_tchk = 0 ;
	len = getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows.length; //Bug#34958820_Redwood_changes
	var tmp;
	for(i = 0;i < len; i++)
	  {
		if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){ //Bug#34958820_Redwood_changes
		  if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) //Bug#34958820_Redwood_changes
		  {
			msob_tchk = msob_tchk +1;
			sr = i ;
			break;
		  }
		 }
		else
		  break;
	   }
	tmp=getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[sr].cells[1].getElementsByTagName("oj-input-text")[0].value;  //Bug#34958820_Redwood_changes
	getTableObjForBlock("BLK_MARGIN_RATE").tBodies[0].rows[ri-1].cells[12].getElementsByTagName("oj-input-text")[0].value=tmp;//Bug#34958820_Redwood_changes
	return true;
}
//OBCL_14.4_BUG#31598653:Curreny_Mapping_Fix changes end
function fnPostLoad_CVS_MARGIN_KERNEL(){
	getElementsByOjName('BTN_ADD_BLK_MARGIN_COMPONENT')[0].style.visibility = 'hidden'; //Bug#34958820_Redwood_changes
	getElementsByOjName('BTN_REMOVE_BLK_MARGIN_COMPONENT')[0].style.visibility = 'hidden'; //Bug#34958820_Redwood_changes
	fnEnableElement(document.getElementById('BLK_CONTRA_MARGIN__BTNCALC'));
    fnEnableElement(document.getElementById('BLK_CONTRA_MARGIN__TXTTOTAL'));
	fnEnableElement(document.getElementById('BLK_CONTRA_MARGIN__TXTPARTPOP'));
	return true;
}

function fnCalculateRate(){
gPrevAction = gAction;
gAction = 'PARTMARGIN';
appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        //var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        //setDataXML(getXMLString(pureXMLDOM));
        //showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E'); 
        return false;    
    }
    var RecnodeList = selectSingleNode(fcjResponseDOM, '//REC[@TYPE="BLK_CONTRA_MARGIN"]/FV');    
	var TextContents = mySplit(getText(RecnodeList),"~");
	
//OBCL_141_SUPP_SMTB_#30147455 STARTS
var RecnodeList1 = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_MARGIN_RATE"]/FV');	
	if(RecnodeList1.length>0){
		setTimeout( function(){
	for(var i = 0; i < RecnodeList1.length; i++){	
var TextContents1 = mySplit(getText(RecnodeList1[i]),"~");		
    //document.getElementById("BLK_MARGIN_RATE__TXTPARTMAR").value = TextContents1[12]; //Bug#34958820_Redwood_changes//Bug#34958820_Redwood_fix
	getTableObjForBlock("BLK_MARGIN_RATE").tBodies[0].rows[0].cells[13].getElementsByTagName("oj-input-text")[0].value =Number(TextContents1[12]); //			Bug#34958820_Redwood_fix

		}
		},10);
	}
//OBCL_141_SUPP_SMTB_#30147455 ENDS
	//document.getElementById("BLK_CONTRA_MARGIN__TXTTOTAL").value = TextContents[8]; //Bug#34958820_Redwood_changes
//	document.getElementById("BLK_CONTRA_MARGIN__TXTTOTAL").value = TextContents[8]; //Bug#34958820_Redwood_changes
	getTableObjForBlock("BLK_CONTRA_MARGIN").tBodies[0].rows[i].cells[13].getElementsByTagName("oj-input-text")[0].value =Number(TextContents1[12]);//
   
     gAction = gPrevAction;
    return true; 
}
