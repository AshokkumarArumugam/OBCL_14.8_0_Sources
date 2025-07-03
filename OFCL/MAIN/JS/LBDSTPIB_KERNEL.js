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
**  File Name          : LBDSTPIB_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Sudharshini Balaji
**  Last modified on   : 28-Mar-2022
**  Search String      : Bug#34000026
**  Reason             : To disable Authorize button based on the auth status

**  Last Modified By   : Sudharshini Balaji
**  Last modified on   : 8-Apr-2022
**  Search String      : Bug#34000026_1
**  Reason             : Moving the fix from JS to RAD

**Changed By         : Jayaram N
**Date               : 17-JAN-2023
**Change Description : REDWOOD - Fix for error "Please select a record" when trying to reprocess Handoff records
**Search String      : Bug#34958820
****************************************************************************************************************************/

var  currRowIndex= "";
var DCN_LIST;
//  Bug#34000026_1commenting starts
// Bug#34000026 changes starts
/* function fnPostLoad_KERNEL(){
	if (document.getElementById("BLK_LBTB_STP_INTERFACE_BROWSER__AUTH_STAT").value == "A")
{
DisableToolbar_buttons("Authorize");

}
  if (document.getElementById("BLK_LBTB_STP_INTERFACE_BROWSER__AUTH_STAT").value == "U")
{
EnableToolbar_buttons("Authorize");

}
} */
//Bug#34000026 changes ends
// Bug#34000026_1 commenting ends 




function fn_reprocess() {
	var som = SingleOrMultiCheck();
	if (som == 0) {
		showErrorAlerts("IN-HEAR-206");
		return false;
	} else if (som > 1) {
		showErrorAlerts("IN-HEAR-205");
		return false;
	}
	fnMultiRowHit("MBOS_RP");
	return true;
}

function SingleOrMultiCheck() {
	var selected_row = 0;
	var lbob_tchk = 0;
	currRowIndex = 0;
	len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
	temp = 0;
	for (i = 0; i < len; i++) {
		//if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]) { //Bug#34958820:Commented
			//if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].value) { //Bug#34958820:Commented
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //Bug#34958820:Added
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true) { //Bug#34958820:Added		
				lbob_tchk = lbob_tchk + 1;
				selected_row = i;
				temp = i;
			}
		} else {
			break;
		}
	}
	return lbob_tchk;
}


//Function to Hit Backend with a Specifiec Action Code
function fnMultiRowHit(gActionCode) {
	
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        //var isChkd = sumTblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value; //Bug#34958820:Commented
		var isChkd = sumTblObj[j].cells[0].getElementsByTagName("INPUT")[0].checked; //Bug#34958820:Added
        if(isChkd)
            chkd = true;        
    }
    if(!chkd){
        mask();
        showAlerts(fnBuildAlertXML('','I',mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    var g_prev_gAction = gAction;
    gAction = gActionCode;

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><ENTITY/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "LBDSTPIB");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"LB");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);

    var bodyReq = fnPrepareBody();
    
    
	var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
    
	if (fcjResponseDOM) 
	{ 
	    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE')
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
        var returnVal = displayResponse(messageNode,msgStatus,'E');
		    }
		if (msgStatus == "WARNING" ||msgStatus == "SUCCESS")
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
        var returnVal = displayResponse(messageNode,msgStatus,'I');
		    }	
        gAction = g_prev_gAction;
		
		fnRefreshSummary();
		
    }
	

}
//Function to Perpare the Body of the Request
function fnPrepareBody() {
        var msgxml_lbreprocess = "<FCUBS_BODY>";
            msgxml_lbreprocess += '    <FLD>'; 
            msgxml_lbreprocess += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTB_STP_INTERFACE_BROWSER">EXPENSE_CODE~PRODUCT_CODE~PLACEMENT_RATE~FUNDING_METHOD~BORR_REF_NO~BORR_ESN~PART_REF_NO~PART_ESN~PROCESSING_DATE~LD_REF_NO~LD_ESN~LD_EVENT_CODE~PROCESSING_STATUS~RECORD_STAT~AUTH_STAT~MOD_NO~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~ONCE_AUTH~LS_EVENT_CODE~INTERFACE_TYPE~LD_BRANCH~PARTICIPANT~EVENT_VALUE_DATE~TRANCHE_REF_NO~FACILITY_NAME~CCY~SELF_PARTICIPANT~DESK_CODE~BRANCH_CODE</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="N" TYPE="BLK_LBTBS_STP_EXCEPTION">ORA_MESSAGE~ERROR_CODE</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="N" TYPE="BLK_LBVWS_STP_TR_DD_SUMMARY">BORROWER_REF_NO~BORROWER_ESN~PARTICIPANT_REF_NO~PARTICIPANT_ESN~BORROWER_TRANCHE_REF_NO~PROCESS_STATUS~LD_CONTRACT_REF_NO</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="N" TYPE="BLK_STP_INTERFACE_POS">OLCOMPONENT~LBCOMPONENT~LDCCY~LBPOSITION~OLPOSITION~ACQ_INTEREST~LSCCY~BORR_REF_NO~PART_REF_NO~BORR_ESN~LD_REF_NO</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="1" TYPE="BLK_LBTBS_STP_STATUS_LOG">CHECKER_DT_STAMP~MAKER_DT_STAMP~CHECKER_ID~MAKER_ID~PREV_STATUS~LB_MAKERID</FN>'
            msgxml_lbreprocess += '    </FLD>';
            msgxml_lbreprocess += '<REC RECID="1" TYPE="BLK_LBTB_STP_INTERFACE_BROWSER"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_lbreprocess);
    fnGetDCNList();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection("~~~~" + DCN_LIST);
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_LBTB_STP_INTERFACE_BROWSER']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}

//Function to get all the DCN List which are selected
function fnGetDCNList() { 
      DCN_LIST = "";
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
       // if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]){	//Bug#34958820:Commented
        //  if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].value ){ //Bug#34958820:Commented	
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //Bug#34958820:Added
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true) { //Bug#34958820:Added		
	         msob_tchk = msob_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]))!="")
             DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + "~" +  getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])  + "~" +  getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[4]) +"~~~~~~~~~~~~~~~~~~~~~~~~~" ) ; 
           }
         }
	  }
      if (msob_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         proc =0;
         return false ; 
	  }     
}
