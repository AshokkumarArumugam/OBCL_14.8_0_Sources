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
**  File Name          : TLDCPMND_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

var  currRowIndex= "";
var MNEMONICSEQNO;
var COUNTERPARTYMNEMONIC;
var TRADEID;
var PROCESSSTATUS;

function FnReProcess() {
	var som = SingleOrMultiCheck();
	if (som == 0) {
		showErrorAlerts("IN-HEAR-206");
		return false;
	} else if (som > 1) {
		showErrorAlerts("IN-HEAR-205");
		return false;
	}
	fnMultiRowHit("REPROCE");
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
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "TLDCPMND");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"TL");
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
		//fnRefreshSummary(event);//Refresh The Summary After Execution.//16177338_USDWFNA_12.0
		fnRefreshSummary();//16177338_USDWFNA_12.0
		
    }
	

}
//Function to Perpare the Body of the Request
function fnPrepareBody() {
        var msgxml_lbreprocess = "<FCUBS_BODY>";
            msgxml_lbreprocess += '    <FLD>'; 
            msgxml_lbreprocess += '      <FN PARENT="" RELATION_TYPE="1"			TYPE="BLK_TLTB_LQT_MNEMONIC_BROWSER">MNEMONICSEQNO~COUNTERPARTYMNEMONIC~TRADEID~PROCESSSTATUS~TRADEESN~TRADEREFNO~NEWCOUNTERPARTY~TRADEVERSION~OLDCOUNTERPARTY</FN>';
			
            msgxml_lbreprocess += '    </FLD>';
            msgxml_lbreprocess += '<REC RECID="1" TYPE="BLK_TLTB_LQT_MNEMONIC_BROWSER"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_lbreprocess);
    fnGetDCNList();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection(MNEMONICSEQNO +"~" +COUNTERPARTYMNEMONIC +"~" +TRADEID+ "~~~~~~");
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_TLTB_LQT_MNEMONIC_BROWSER']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}

//Function to get all the DCN List which are selected
function fnGetDCNList() { 
    MNEMONICSEQNO="";
	COUNTERPARTYMNEMONIC="";
	TRADEID="";
	PROCESSSTATUS="";
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){
             msob_tchk = msob_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]))!="")
				      MNEMONICSEQNO = MNEMONICSEQNO + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3])) ; 
				      COUNTERPARTYMNEMONIC = COUNTERPARTYMNEMONIC + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1])) ; 
					  TRADEID = TRADEID + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])) ; 
					  PROCESSSTATUS = PROCESSSTATUS + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[9])) ; 
             //DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + "~"+  getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]) +  "~"+ getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3]) +"~~~~~~~") ; 
           }
         }
	  }
      if (msob_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         proc =0;
         return false ; 
	  }     
}
