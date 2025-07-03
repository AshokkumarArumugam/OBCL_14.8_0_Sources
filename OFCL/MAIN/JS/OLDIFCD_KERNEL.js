/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : OLDIFCD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var REQ_LIST;
var len = 0;
var msob_tchk = 0 ;

function fnResend()
{
	fnMultiRowHit('TWRESEND');
    return true;
}

function fnTrnLog() //CHANGES TO BE DONE ONCE THE SCREEN IS DONE...
{
//alert('View transaction');
SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	 g_prev_gAction = gAction;
	 gAction='EXECUTEQUERY';
	 var QryTable = getTableObjForBlock('TBL_QryRslts');
     var rowInfo = QryTable.rows[currRowIndex];
     var er = fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
     dbDataDOM = er;
     var detailPk = g_DetPkArray[currRowIndex - 1];
     detailWinParams.ShowSummary = 'TRUE';
     detailWinParams.DetailPkVals = detailPk;
     screenArgs = new Array();
     screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
     screenArgs['FUNCTION_ID'] = 'OLDIFCDL';
     screenArgs['ACTION'] = 'LAUNCH'
     screenArgs['MODULE'] = 'OL';
     screenArgs['LANG'] = mainWin.LangCode;
     screenArgs['DESCRIPTION'] = 'Transaction History';
     screenArgs['UI_XML'] = 'OLDIFCDL';
	 screenArgs['SEQNO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[3]);//SEQ_NO--
	 //screenArgs['PROCESSSEQNO']  = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[4]);//process_seq_no--
     parent.screenArgs = screenArgs;
     mainWin.dispHref1('OLDIFCDL', parent.seqNo);	 
	 gAction = g_prev_gAction;
 return true;
}

function fnGetREQList() { 
      REQ_LIST = "";
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){
             msob_tchk = msob_tchk +1;
			 //if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]))!="")
			 var contref = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]);//contract_ref_no--
			 var seqno = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3]);//SEQ_NO-- change needs to be done if more pk colls are included later
			 //var pkey  =  contref+'~'+seqno; //tilda is not supposed to be used
                      var pkey  =  contref+'^'+seqno;
             REQ_LIST = REQ_LIST + pkey + ':' ; 
           }
         }
	  }
      if (msob_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         return false ; 
	  }     
}

function fnPreShowDetail_Sum_KERNEL(arg) {
    return false;
}

function fnPrepareBody() {	
    var msgxml_sqsexlmt = "<FCUBS_BODY>";
	msgxml_sqsexlmt += '<FLD>'; 
	msgxml_sqsexlmt += '<FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MASTER">CONTRACTREFNO~ACTION~BRANCH~SEQNO~STATUS~REQLIST</FN>'; 
	msgxml_sqsexlmt += '</FLD>'; 
    msgxml_sqsexlmt += '<REC RECID="1" TYPE="BLK_MASTER"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_sqsexlmt);
	fnGetREQList();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection("~~~~~"+REQ_LIST);//
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_MASTER']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");
}

function fnMultiRowHit(gActionCode) {
	fnGetREQList();
    var g_prev_gAction = gAction;
    gAction = gActionCode;

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><ENTITY/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
	setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);//
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "OLSIFCD");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"OL");

    var bodyReq = fnPrepareBody();
    
    
	var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
    
	if (fcjResponseDOM) 
	{ 
	    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE')
            {
		var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP")); 
        var returnVal = displayResponse(messageNode,msgStatus,'E');
		    }
		if (msgStatus == "WARNING" ||msgStatus == "SUCCESS")
            {
		var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP"));
        var returnVal = displayResponse(messageNode,msgStatus,'I');
		    }	
        gAction = g_prev_gAction;
		fnRefreshSummary();
		
    }
	

}
function fnPreShowDetail_Sum_KERNEL(arg) {
    return false;
}
// starts
//Function to Check whether Single row is selected or multiple row
function SingleCheck()
{
	var selected_row = 0 ;
	var msob_tchk = 0 ;
	currRowIndex = 0 ;
	len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
	temp = 0 ;
    for(i = 0;i < len; i++)
	{
		if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
			if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
			{
				msob_tchk = msob_tchk +1;
				selected_row = i ;
				temp=i ;
			}
		}
		else
			break;
	}
	if (msob_tchk > 1 ) {                  
		showErrorAlerts('IN-HEAR-205');
		return false ;
	}
	else if (msob_tchk == 0 ) {                  
		showErrorAlerts('IN-HEAR-206');
		return false ;  
	} else {
		currRowIndex = selected_row +1 ;  
	}
}
 
//Function Common for Single row Selection Ends
// ends
//Manikandan V Starts (common Browser Screen)
function fnPostLoad_Sum_KERNEL(e){
	if (typeof(parent.screenArgs) != 'undefined') {
		 document.getElementById("BLK_MASTER__BRANCH").value = parent.screenArgs['BRANCH'];	
		 document.getElementById("BLK_MASTER__CONTRACTREFNO").value = parent.screenArgs['CONTRACTREFNO'];	
	    fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
   }	
return true;	
 }
 //Manikandan End for get date from parent screen