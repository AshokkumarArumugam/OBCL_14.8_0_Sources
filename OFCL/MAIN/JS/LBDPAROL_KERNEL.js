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
**  File Name          : LBSPAROL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var len = 0;
var msob_tchk = 0 ;
var selected_row = 0 ; 
var curpage ;
var over_flag = false;
var l_Multitripid = '';
var bulkPkValues = "";
function fnCheck(){
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
	msob_tchk = 0;
    for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
            msob_tchk = msob_tchk +1; 
            selected_row = i ; 
           	} 
         }
        else
          break;
       }
	 if (msob_tchk == 0 ) {
            //alert ( 'Please Select a Record');
			showErrorAlerts('IN-HEAR-206');
            return false ;  
		 }
	/* if (msob_tchk > 1 ) {
            //alert ( 'Please Select One Record');
			showErrorAlerts('IN-HEAR-206');
            return false ;
    }	 */	
  return true;	
}
function fnMultiCheck(){
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
	msob_tchk = 0;
	for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
           getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = true;
         }
        else
          break;
     }
	return true;	
}
function fn_GetId(){
    var summaryFN =   msgxml_sum.substring(msgxml_sum.indexOf("<FN"),msgxml_sum.indexOf("</FN>"));
    summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE")+6,summaryFN.indexOf(">")-1);
    var sumfldTag  = summaryFN.substring(summaryFN.indexOf(">")+1 , summaryFN.length);
    var tableObject = getTableObjForBlock("TBL_QryRslts");
    var allRows = tableObject.tBodies[0].rows;
    var recNodes = selectNodes(fcjResponseDOM,"//MSG/REC");
    var recPkCols = new Array();;
    try {                                                                              
    for (var recCnt=0; recCnt<allRows.length; recCnt++) {                                            
            if (allRows[recCnt].cells[0].getElementsByTagName("INPUT")[0].checked){
			var recNode = selectSingleNode(fcjResponseDOM,"//MSG/REC[position()=" + (recCnt + 1) + "]");
			var recId = recNode.getAttribute("RECID");
			// alert(recId);
            recId = replaceAllChar(recId,'~','-');
			//alert(recId)
            bulkPkValues += recId +'!';
        }
    }
	}
	  catch(e) {}     
       return true;	  
}
function fnCreateBody_LBSPAROL() {
    var msgxml_lbsparol = "<FCUBS_BODY>";
    msgxml_lbsparol += '    <FLD>'; 
	msgxml_lbsparol += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PARTIAL_ROLLOVER_DETAIL">CONTRACTREFNO~ROLLOVERMETHOD~MATURITYDATE~PROCESSSTATUS~BRANCHCODE~PROCESSDATE~SUM_REC_ID</FN>'; 
	msgxml_lbsparol += '    </FLD>'; 
    msgxml_lbsparol += '<REC RECID="1" TYPE="BLK_PARTIAL_ROLLOVER_DETAIL"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_lbsparol);
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection('~~~~~~'+bulkPkValues);
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_PARTIAL_ROLLOVER_DETAIL']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");
}
function fn_Process(){
	    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><ENTITY/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
		headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
		exlRequestDOM =loadXMLDoc(headerNode);
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "LBSPAROL");
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gAction);
		setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"LB");
		if (over_flag ){
			setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MULTITRIPID"),l_Multitripid);
			over_flag = false;
		}
		var bodyReq = fnCreateBody_LBSPAROL();
		var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
		node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
		if(!fnResponse()){
			return false;
		}
		return true;
}
function fnResponse(){
	fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus == 'WARNING') {
		customAlertAction = "ACCEPTOVERRIDE";
		l_Multitripid =getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MULTITRIPID"));
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
		var returnVal = displayResponse(messageNode,msgStatus,'O');
	}
	if (msgStatus == 'SUCCESS'){
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
		var returnVal = displayResponse(messageNode,msgStatus,'I');	
			gAction = g_prev_gAction;
			if (gAction == 'PROCESS'/*|| gAction == 'Authorize'*/){
				setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gAction);
				dbDataDOM = fnGetDataXMLFromFCJXML(exlRequestDOM,1);
				fnPostAsync(exlRequestDOM,servletURL,functionId);
				fnRefreshSummary();
				return true;
			}
		fnRefreshSummary();
	}
	if (msgStatus == 'FAILURE'){
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
		var returnVal = displayResponse(messageNode,msgStatus,'E');
		//fnRefreshSummary();
	}
	return true;
}
function fnPostAsync(fcjMsgDOM, servletURL, functionID)
{  
  if (fcjMsgDOM != null )  {
    var strFormData = getXMLString(fcjMsgDOM);   
	objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", servletURL, true); 
    objHTTP.setRequestHeader("FUNCTIONID", functionID); 
    objHTTP.setRequestHeader("OPERATION", gAction);
	objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    if(strFormData.indexOf("<ATTACHMENTS>")>-1){
        objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
    }
    else{
        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
     }
     objHTTP.send(strFormData);    
  } 
}
function fnProcessupdate(){
	g_prev_gAction = gAction;
    if(fnCheck()){
	bulkPkValues = "" ;
		if(fn_GetId()){
			gAction = "PROCESS";
			if(!fn_Process()){
				gAction = g_prev_gAction;
			}
		}
	}
}
function fnPreLaunchForm_SUMMARY_KERNEL(screenArgs){
	i = selected_row;
	screenArgs["FCCREF"]= getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[5]); 
	return true;
}
function fnPreShowDetail_Sum_KERNEL(arg){
return false;
}

