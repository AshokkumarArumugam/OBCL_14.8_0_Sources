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
**  File Name          : IFDMKTIB_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Search String      :  
**  Reason             : 
****************************************************************************************************************************/

var  currRowIndex= "";
var DCN_LIST;

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
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
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
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
function fnPostExecuteQuery_KERNEL() {
fnEnableElement(document.getElementById('BLK_OLTBS_LS_MARKIT_MASTER__BTN_REPROCESS'));
 return true;
}
function fnBackendCall(){
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
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    } else if (msgStatus == "SUCCESS") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
   }  
       else if (msgStatus == "SUCCESS") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'O');
        return true;
   }  


}
function fn_reprocess(event){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='MBOS_RP';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}



//Function to Hit Backend with a Specifiec Action Code
function fnMultiRowHit(gActionCode) {
	
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;
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
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "IFDMKTIB");
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
            msgxml_lbreprocess += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LS_MARKIT_MASTER">BRANCH~MESSAGE_SEQ_NO~MESSAGE_REF_NO~AGENT_MEI~DD_MARKIT_CONTRACT_ID~PARTICIPANT_MEI~MESSAGE_ID~MESSAGE_NAME~PROCESSING_STATUS~EXTERNAL_CUSIP_NO~DEPARTMENT_CODE~RECEIVE_DATE~PROCESSING_DATE~ACTIVITY_SEQ_NO~CONTRACT_REF_NO~EVENT_SEQ_NO~MARKIT_CONTRACT_ID~TRANCHE_REF_NO~FACILITY_NAME~TRANCHE_CCY~TRANCHE_TYPE~TRANCHE_GLOBAL_AMT~TRANCHE_AMT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~RECORD_STAT~AUTH_STAT~ONCE_AUTH~MOD_NO</FN>';                        
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="1" TYPE="BLK_OLTBS_LS_MARKIT_DRAWDOWN">PRODUCT_CODE~MATURITY_DATE~LC_TYPE~CURRENCY~BORROWER_MEI~VALUE_DATE~GLOBAL_AMOUNT~BORROWER~AMOUNT</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_INT_RATE">RATE~FLOATING_RATE_INDEX~PERIOD~ALL_IN_RATE~END_DATE~START_DATE~RATE_FIXING_DATE~PERIOD_MULTIPLIER~MARGIN~INTEREST_DAY_BASIS</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_EX_RATE">RATE_FIXING_DATE~START_DATE~END_DATE~EXCHANGE_RATE</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_EXCEPTION">ERROR_SEQ_NO~ERROR_CODE~ERROR_PARAM</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_INT_PYMT">AMOUNT~PAYMENT_DATE</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_PRIN_PYMT">AMOUNT~PAYMENT_DATE</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_FEE_PAYMENT">FEE_TYPE~PAYMENT_DATE~AMOUNT~FEE_COMPOMENT</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_FEE">FEE_TYPE~RATE~EFFECTIVE_DATE~FEE_COMP</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_MARGIN">EFFECTIVE_DATE~MARKIT_CONTRACT_ID~RATE~CONTRACT_REF_NO</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_DD_RENEWAL">MARKIT_CONTRACT_ID~EVENT_SEQ_NO~PRINCIPAL_AMOUNT~PAYMENT_DATE~CONTRACT_REF_NO~INTEREST_AMOUNT~CURRENCY~MATURITY_DATE~CONSOLE_REF_NO</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_DD_RENEWAL" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MRKT_DD_CHLD">PRODUCT_CODE~MATURITY_DATE~MARKIT_CONTRACT_ID~CURRENCY~CONTRACT_REF_NO~GLOBAL_AMOUNT~AMOUNT</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MRKT_DD_CHLD" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MKT_INT_RT_CHD">RATE~FLOATING_RATE_INDEX~ALL_IN_RATE~END_DATE~START_DATE~RATE_FIXING_DATE~MARGIN~INTEREST_DAY_BASIS</FN>'; 
			msgxml_lbreprocess += '      <FN PARENT="BLK_OLTBS_LS_MRKT_DD_CHLD" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MRKT_EX_RT_CHD">RATE_FIXING_DATE~START_DATE~END_DATE~EXCHANGE_RATE</FN>'
            msgxml_lbreprocess += '    </FLD>';
            msgxml_lbreprocess += '<REC RECID="1" TYPE="BLK_OLTBS_LS_MARKIT_MASTER"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_lbreprocess);
    fnGetDCNList();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection("~" + DCN_LIST);
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_OLTBS_LS_MARKIT_MASTER']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}

//Function to get all the DCN List which are selected
function fnGetDCNList() { 
      DCN_LIST = "";
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){
             msob_tchk = msob_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]))!="")
             DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]) + "~~~~~" +  getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + "~~~~~~~~~~~~~~~~~~~~~~~~" ) ; 
           }
         }
	  }
      if (msob_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         proc =0;
         return false ; 
	  }     
}

function fnPostUnlock_KERNEL() 
{ 
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_INT_RATE").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_INT_RATE").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_EX_RATE").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_EX_RATE").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_EXCEPTION").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_EXCEPTION").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_INT_PYMT").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_INT_PYMT").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_PRIN_PYMT").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_PRIN_PYMT").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_FEE_PAYMENT").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_FEE_PAYMENT").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_FEE").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_FEE").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_MARGIN").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_MARGIN").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MARKIT_DD_RENEWAL").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MARKIT_DD_RENEWAL").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MRKT_DD_CHLD").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MRKT_DD_CHLD").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MKT_INT_RT_CHD").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MKT_INT_RT_CHD").style.visibility = 'hidden';
	
	document.getElementById("cmdAddRow_BLK_OLTBS_LS_MRKT_EX_RT_CHD").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTBS_LS_MRKT_EX_RT_CHD").style.visibility = 'hidden';
		
	return true;

}
function fnPostLoad_KERNEL() 
{ 
var message_Name=document.getElementById("BLK_OLTBS_LS_MARKIT_MASTER__MESSAGE_NAME").value;
if(message_Name.toUpperCase() == "DRAWDOWNNOTICE" || message_Name.toUpperCase() ==  "LCISSUANCENOTICE")
	{
		enableTabs("TAB_MAIN~TAB_EXCEPTIONS", "~");
		disableTabs("TAB_PAYMENT~TAB_FEE_PMNT~TAB_FEE_DET~TAB_RENEWAL", "~");
		//document.getElementById('TAB_FEE_PMNT').style.visibility = 'hidden';
		//document.getElementById('TAB_PAYMENT').parentElement.style.visibility = 'hidden';
		//document.getElementById("TAB_FEE_DET").parentNode.parentNode.style.display = "none";
		//document.getElementById("TAB_FEE_DET").parentNode.style.display = "none";
		expandcontent("TAB_MAIN");
		
	} 
else if(message_Name.toUpperCase() == "ROLLOVERNOTICE")
	{
		enableTabs("TAB_RENEWAL~TAB_EXCEPTIONS", "~");
		disableTabs("TAB_PAYMENT~TAB_FEE_PMNT~TAB_FEE_DET~TAB_MAIN", "~");
		expandcontent("TAB_RENEWAL");
	}
else if(message_Name.toUpperCase() == "PRINCIPALPAYMENTNOTICE" || message_Name.toUpperCase() == "INTERESTPAYMENTNOTICE" || message_Name.toUpperCase() == "REPAYMENTNOTICE")
	{
		enableTabs("TAB_PAYMENT~TAB_EXCEPTIONS", "~");
		disableTabs("TAB_MAIN~TAB_FEE_PMNT~TAB_FEE_DET~TAB_RENEWAL", "~");
		expandcontent("TAB_PAYMENT");
	}
else if(message_Name.toUpperCase() == "ONGOINGFEENOTICE")
	{
		enableTabs("TAB_FEE_PMNT~TAB_EXCEPTIONS", "~");
		disableTabs("TAB_PAYMENT~TAB_MAIN~TAB_FEE_DET~TAB_RENEWAL", "~");
		expandcontent("TAB_FEE_PMNT");
	}
else if(message_Name.toUpperCase() == "PRICINGCHANGENOTICE")
	{
		enableTabs("TAB_FEE_DET~TAB_EXCEPTIONS", "~");
		disableTabs("TAB_PAYMENT~TAB_MAIN~TAB_FEE_PMNT~TAB_RENEWAL", "~");
		expandcontent("TAB_FEE_DET");
	}	

   return true; 
}

