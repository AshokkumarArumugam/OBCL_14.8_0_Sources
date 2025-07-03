/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2021, Oracle and/or its affiliates.
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
**  File Name          : IFDOBERQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

****************************************************************************************************************************/
var REQ_LIST;
var len = 0;
var msob_tchk = 0 ;

function fnForcePost()
{
	fnMultiRowHit('FORCEPOST');
    return true;
}

function fnResend()
{
	fnMultiRowHit('TWRESEND');
    return true;
}

function fnReject()
{
	fnMultiRowHit('TWREJECT');
    return true;
}

function fnViewServicelog()
{
SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	 g_prev_gAction = gAction;
	 gAction='EXECUTEQUERY';
	 var QryTable = getTableObjForBlock('TBL_QryRslts');  //redwood_changes
     var rowInfo = QryTable.rows[currRowIndex];
     var er = fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
     dbDataDOM = er;
     var detailPk = g_DetPkArray[currRowIndex - 1];
     detailWinParams.ShowSummary = 'TRUE';
     detailWinParams.DetailPkVals = detailPk;
     screenArgs = new Array();
     screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
     screenArgs['FUNCTION_ID'] = 'IFDOBERL';
     screenArgs['ACTION'] = 'LAUNCH'
     screenArgs['MODULE'] = 'IF';
     screenArgs['LANG'] = mainWin.LangCode;
     screenArgs['DESCRIPTION'] = 'Core External Error Description';
     screenArgs['UI_XML'] = 'IFDOBERL';
	 screenArgs['MSGID'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);  //redwood_changes
	 screenArgs['PROCESSSEQNO']  = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[4]);  //redwood_changes
     parent.screenArgs = screenArgs;
     mainWin.dispHref1('IFDOBERL', parent.seqNo);	 
	 gAction = g_prev_gAction;
 return true;
}

function fnGetREQList() { 
      REQ_LIST = "";
      len = getOjTableRowsLength("TBL_QryRslts"); //redwood_changes
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){  //redwood_changes
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].value ){  //redwood_changes
             msob_tchk = msob_tchk +1;
			 var msgid = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]);  //redwood_changes
			 var seqno = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[4]);  //redwood_changes
			 var pkey  =  msgid+'^'+seqno;
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
    msgxml_sqsexlmt += '    <FLD>'; 
	msgxml_sqsexlmt += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CO_RETRY_REQ">AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~COMM_MODE~DESTINATION_SYSTEM~EXT_STATUS~FORCEPROCESS~FUNCTION_ID~KEYID~LOG_TIME~MAKER_DT_STAMP~MAKER_ID~MSGID~PROCESS_SEQ_NO~PROCESS_STATUS~REQ_TYPE~SERVICE_CODE~BRANCH_CODE~SOURCE_SEQ_NO~REQ_LIST</FN>';
	msgxml_sqsexlmt += '    </FLD>'; 
    msgxml_sqsexlmt += '<REC RECID="1" TYPE="BLK_CO_RETRY_REQ"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_sqsexlmt);
	fnGetREQList();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection("~~~~~~~~~~~~~~~~~~~"+REQ_LIST);
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_CO_RETRY_REQ']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");
}

function fnMultiRowHit(gActionCode) {
	fnGetREQList();
    var g_prev_gAction = gAction;
    gAction = gActionCode;

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "IFSOBERQ");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"IF");

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

//Function to Check whether Single row is selected or multiple row
function SingleCheck()
  {
   var selected_row = 0 ;
   var msob_tchk = 0 ;
   currRowIndex = 0 ;
   len = getOjTableRowsLength("TBL_QryRslts");  //redwood_changes
   temp = 0 ;


     for(i = 0;i < len; i++)
      {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){  //redwood_changes
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].value)  //redwood_changes
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
                  return false ;  }
                 else {
                  currRowIndex = selected_row +1 ;  }
  }
 