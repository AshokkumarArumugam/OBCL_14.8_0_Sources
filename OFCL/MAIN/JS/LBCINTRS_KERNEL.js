/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : LBCINTRS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**
**Changed By         : Pallavi R
**Date               : 17-Jan-2019
**Change Description : Rate fixing changes for multiple components
**Search String      : OBCL_14.3_#Multi_RTFX Changes 

**Changed By         : Arun
**Date               : 28-Jul-2020
**Change Description : Added code for rate pickup.
**Search String      : SOFR changes   
**  
**  Last Modified By   : Surya Prabha
**  Last modified on   : 25-OCT-2021
**  Reason             : Code fix to disable tranche margin rate field
**  Search String      : Bug#33426455 changes

**  Last Modified By   : Arunprasath
**  Last modified on   : 02-Feb-2022
**  Reason             : LS Risk participant changes
**  Search String      : OBCL_14.5_Risk_Comp
**
**Changed By         : Pallavi R
**Date               : 15-Jul-2022
**Change Description : Rate code was not getting populated in Ratefixing screen
**Search String      : OBCL_14.5_SMTB_#34386248 Changes 

**Changed By         : kavitha Asokan
**Date               : 25-Aug-2022
**Change Description : ERROR ON UPDATING FLOATING RATE CODE FOR DRAWDOWNS 
**Search String      : Bug#34502629 changes

**Changed By         : Chandra Achuta
**Date               : 23-SEP-2022
**Change Description : Added code for disable of +/- buttons, Margin_Component field in Margin Details tab. 
**Search String      : Bug#34651721

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 08-03-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

    Changed By         : Mohan Pal
    Changed On         : 04-Sep-2023
    Change Description : Backend call with RATEPICKUP action.
    Search String      : Bug#35592744 CHANGES
	
   Changed By         : Arunprasath
   Changed On         : 27-jul-2023
   Change Description : a) Changes to enable risk participant screen removal button (-) during unlock before Auth action
                      b) Changes to disbale risk amt, rate and status during CAMD action.
   Search String      : Bug#36963087 
   
   Changed By         : Akhila Samson
   Changed On         : 03-Dec-2024
   Change Description : Fix has been provided to populate the currency from the interest screen to the risk participation multigrid.
   Search String      : Bug#37331556 

	Changed By         : Pallavi R
    Changed On         : 19-Nov-2023
    Change Description : Repick up rate should be enabled from ONLINE screens only on unlock before auth
    Search String      : OBCL_14.7_MASH_#37259053 Changes  
****************************************************************************************************************************/
var gParentFid;
var gAuthStat;
function fnPostLoad_CVS_INTEREST_KERNEL(){
	getElementsByOjName('BTN_ADD_BLK_LFTBS_CONTRACT_INTEREST')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_LFTBS_CONTRACT_INTEREST')[0].style.visibility = 'hidden';
	addEvent(document.getElementById("BLK_MARGIN_INT"), "onclick", "fnDisablefield()"); //Bug#33426455 changes
	// SOFR changes start
	if (gAction == 'NEW'){
	fnClassDefault('BLK_MASTER_INT'); // master block
	}
	//SOFR changes end
	//Bug#34651721	Changes Starts
	getElementsByOjName("cmdAddRow_BLK_MARGIN_INT")[0].className="BTNhide";
	getElementsByOjName("cmdDelRow_BLK_MARGIN_INT")[0].className="BTNhide";	
    //Bug#34651721	Changes Ends	
  //Bug#35592744 STARTS
	if (document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='LBDDDONL' && gAction == 'MODIFY' && document.getElementById("BLK_MASTER_INT__ONCE_AUTH").value == 'Y'){//OBCL_14.7_MASH_#37259053 Changes,Added ONCE_AUTH
			fnDisableElement(document.getElementById("BLK_MASTER_INT__BTN_INT"));
	}
	
	if (document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='LBDVAMND' && gAction == 'MODIFY'){
			fnEnableElement(document.getElementById("BLK_MASTER_INT__BTN_INT"));
	}
	//Bug#35592744 ENDS
	return true;
}

//Bug#33426455 changes start
function fnDisablefield() 
{
	var noRows = getTableObjForBlock("BLK_MARGIN_INT").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) 
	{
		if (gAction != 'EXECUTEQUERY')
		{
			if (getElementsByOjName("UI_MARGIN_BASIS")[rowIndex].value == 'T')
			{
			//	fnDisableElement(getElementsByOjName("MARGIN_RATEI")[rowIndex]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			fnDisableElement(getElementsByOjName("MARGIN_RATE")[rowIndex]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			
			}	
		}
	}	
}
//Bug#33426455 changes end

//OBCL_12.5_26636176  changes starts
function fnPreLoad_CVS_RTFX_KERNEL(){
    screenArgs["FLOATING_RATE_CODE"] = document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__RATECODE").value;
	//OBCL_14.5_SMTB_#34386248 Changes Starts
	gParentFid = parent.screenArgs['FID'];	
	gAuthStat = parent.screenArgs['AUTH_STAT'];	 
	screenArgs["PRNT_FUNC"] = parent.screenArgs['FID'];	 
	screenArgs['AUTH_STAT'] = parent.screenArgs['AUTH_STAT'];	
	//OBCL_14.5_SMTB_#34386248 Changes Ends
	return true;
}
//OBCL_12.5_26636176  changes ends
function fnPostLoad_CVS_RTFX_KERNEL(){
        //OBCL_12.5_26636176  changes starts
        /* Checking Rate Revision Method Manual or Auto */
	if ( (parent.screenArgs["FLOATING_RATE_CODE"] != 'undefined' ) && (parent.screenArgs["FLOATING_RATE_CODE"] != "")
		&&((parent.screenArgs["FLOATING_RATE_CODE"]!= document.getElementById("BLK_RTFX__RTFX_RTCD").value)&&
			(((gAction =='NEW') && (parent.screenArgs['PRNT_FUNC']=='LBDDDONL'))
			||((gAction =='MODIFY') && (parent.screenArgs['PRNT_FUNC']=='LBDDDONL') &&(parent.screenArgs['AUTH_STAT']=='N') )
			||((gAction =='MODIFY') && (parent.screenArgs['PRNT_FUNC']=='LBDVAMND'))))) {//OBCL_14.5_SMTB_#34386248 Changes, ADDED PRNT_FUNC,gAction AND CONDITION
		document.getElementById("BLK_RTFX__RTFX_RTCD").value = parent.screenArgs["FLOATING_RATE_CODE"];
		//fnFetch(); --Bug#34502629 changes
	}
	//fnFetch();
        //OBCL_12.5_26636176  changes ends

        //OBCL_12.5_26636176  changes starts
        /* Resetting screenArgs[] Parameters */
	parent.screenArgs['FLOATING_RATE_CODE'] == '';
	/* Resetting screenArgs[] Parameters */
        //OBCL_12.5_26636176  changes ends
	return true;
}
//OBCL_14.3_#Multi_RTFX Changes Starts
function fnFetch(){
	var g_prev_gAction = gAction;   
	fnClassDefault("BLK_MASTER_INT");
	gAction = g_prev_gAction;	
	return true;	 
}	
function  fnPreClassDefault_CVS_RTFX_KERNEL(){
	gAction = "FETCH";
	return true;
}
//OBCL_14.5_Risk_Comp start
function fnPostAddRow_BLK_CONTRACT_RISK_PART_DTLS_KERNEL(){
	var cnt = getTableObjForBlock('BLK_CONTRACT_RISK_PART_DTLS').tBodies[0].rows.length;
	
	
	for(var i = 0; i< cnt; i++){ //Bug#37331556 "=" condition removed
	//Bug#37331556 start
	//for(var i = 1; i<=cnt; i++){	
		
		getTableObjForBlock('BLK_CONTRACT_RISK_PART_DTLS').tBodies[0].rows[i].cells[8].getElementsByTagName("oj-input-text")[0].value = parent.getTableObjForBlock("BLK_LFTBS_CONTRACT_INTEREST__CURRENCY").value ;
	
		//commented below code
		/*if (i ==1){
			
			document.getElementById('BLK_CONTRACT_RISK_PART_DTLS__DD_CURRENCY').value = parent.document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__CURRENCY").value;
		}
		else{	
			var flagstats=8;
			getTableObjForBlock('BLK_CONTRACT_RISK_PART_DTLS').tBodies[0].rows[i-1].cells[flagstats].getElementsByTagName("oj-input-text")[0].value=  parent.getTableObjForBlock("BLK_LFTBS_CONTRACT_INTEREST__CURRENCY").value ;
			//BUG #27076460 end
		}*/
		
		//Bug#37331556 End
	}
	return true;
}		

//Bug#36963087 Start
function fnPreLoad_CVS_RISK_PARTICIPANT_KERNEL(){

   screenArgs['AUTH_STAT'] = parent.screenArgs['AUTH_STAT'];
   screenArgs['FID']       = parent.screenArgs['FID'];
	return true;
}
//Bug#36963087 End	

function fnPostLoad_CVS_RISK_PARTICIPANT_KERNEL(){
  // Bug#36963087 Start
  //if (gAction == 'MODIFY')
	  if ((gAction == 'MODIFY') && (parent.screenArgs['AUTH_STAT'] == 'Y'))
  //Bug#36963087 End
	   {
	
        document.getElementById('cmdDelRow_BLK_CONTRACT_RISK_PART_DTLS').style.visibility='hidden';	
		
	var rowLength = document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows.length;
		for (var i = 0;i < rowLength;i++) {
			
				fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0]); 
				fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[5].getElementsByTagName("INPUT")[0]);
				fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[7].getElementsByTagName("INPUT")[0]);
				fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[4].getElementsByTagName("INPUT")[0]);
				fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[6].getElementsByTagName("INPUT")[0]);				
		//Bug#36963087 Start
		//Contract status is Authorized, CAMD action then disbale risk amount, risk rate and status button 
		//becuase risk decrease/insreae, rate change and risk cancellation should be done via VAMI action
		
		if ((parent.screenArgs['FID'] == 'LBDDDONL')  && (parent.screenArgs['AUTH_STAT'] == 'Y'))
			{
				
			fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[9].getElementsByTagName("INPUT")[0]);
			fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[10].getElementsByTagName("INPUT")[0]);
			fnDisableElement(document.getElementById("BLK_CONTRACT_RISK_PART_DTLS").tBodies[0].rows[i].cells[11].getElementsByTagName("SELECT")[0]);				

			
			}	
         //Bug#36963087 End			
		 
		 }
        		 
		
		}
	return true;
}
//OBCL_14.5_Risk_Comp end
/*
//OBCL_12.5_26636176   changes starts
var screenArguments = new Array();
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
//OBCL_12.5_26636176  changes ends//OBCL_12.5_Rate_Fixing_for_manual starts
function fnFetch(){
	var g_prev_gAction = gAction;
    gAction = "FETCH";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
       if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_RTFX"]/FV');
		if(RecnodeList.length>0){
			var RecnodeListLen = RecnodeList.length;
			for(var i = 0; i < RecnodeListLen; i++){
				var TextContents = mySplit(getText(RecnodeList[i]),"~");			
					document.getElementById("BLK_RTFX__RATE").value = '';  
					document.getElementById("BLK_RTFX__RATE").value = '';
		 					
			}
		}
		 gAction = g_prev_gAction;		 
        return false;
    }
	
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_RTFX"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
			    document.getElementById("BLK_RTFX__RATE").value = TextContents[10]; //OBCL_12.5_26574328  changes 
				document.getElementById("BLK_RTFX__RATE").value = TextContents[10];
				document.getElementById("BLK_RTFX__ACTUAL_FIXING_DATE").value = TextContents[19]; //OBCL_12.5_26574328  changes 
				document.getElementById("BLK_RTFX__ACTUAL_FIXING_DATE").value = TextContents[19];
				document.getElementById("BLK_RTFX__RATE_EFFECTIVE_START_DATE").value = TextContents[3]; //OBCL_12.5_26574328  changes 
				document.getElementById("BLK_RTFX__RATE_EFFECTIVE_START_DATE").value = TextContents[3];				
									
		}
	}
	return true;
	
}
//OBCL_12.5_Rate_Fixing_for_manual ends*/

//OBCL_14.3_#Multi_RTFX Changes Ends
//Bug#35592744 STARTS
function fn_rate_pickup()
{
    var g_prev_gAction = gAction;
    gAction = "RATEPICKUP";	
	
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	
	
   var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
	
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
	
    if (dbDataDOM.documentElement.nodeName != dataSrcLocationArray[0]) {
        var blockId = 'BLK_MASTER_INT' ;
	 var removeNode = selectNodes(orgDom, getXPathQuery(blockId));  
        for (var i = 0; i < removeNode.length; i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        var parentNode = relationArray[dbDataDOM.documentElement.nodeName]; 
        if(parentNode.indexOf("~") == -1){            
            orgDom.documentElement.appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }else{
            var parentNodename =parentNode.substring(0,parentNode.indexOf("~"));
            var xpathquery = getXPathQuery(parentNodename) ;
            xpathquery = xpathquery + "[@ID=" + dbIndexArray[parentNodename] + "]";            
            selectSingleNode(orgDom,xpathquery).appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        showData();
    }
	
	
	
	fnClassDefault('BLK_MASTER_INT'); 
	
    gAction = g_prev_gAction;
return true;
}

//Bug#35592744 ENDS