/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright (c) 2008 - 2012 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : MSDNOTIB_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
** Modified  By         : Manoj
** Modified  On         : 08-feb-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_changes
** Bug Number			: 
****************************************************************************************************************************/
var local_dom = "";
var fcjRequestDOM;
var fcjResponseDOM;
var currRowIndex = "";
var gErrCodes = "";
var gCur
var l_pk_arr = new Array();
var detailWinParams = new Object();
var notifyPkValues1 = ""; //Notification Message changes
var l_Media = "";

function SingleCheck() {
    var selected_row = 0;
    var msob_tchk = 0;
    l_currRow = 0;
    currRowIndex = 0;
    //len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length; //redwood_changes
	len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    temp = 0;

    for (i = 0; i < len; i++) {
        //if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //redwood_changes
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {	
            //if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {//redwood_changes
		    if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].value==true) {	
                l_currRow = i;
                msob_tchk = msob_tchk + 1;
                selected_row = i;
                temp = i;
            }
        } else
            break;
    }

    if (msob_tchk > 1) {
        showErrorAlerts('IN-HEAR-205');
        return false;
    } else if (msob_tchk == 0) {
        showErrorAlerts('IN-HEAR-206');
        return false;
    } else {
        currRowIndex = selected_row+1 ;
    }
}

function fnPostExecuteQuery_sum_KERNEL()
{	
	var RecnodeList = selectNodes(fcjResponseDOM, "//REC");
	for (var i = 0; i < RecnodeList.length; i++) 
	{      
		l_pk_arr[i] = RecnodeList[i].getAttribute("RECID");
	}
}

function fnView_msg() 
{
    SingleCheck()
        if (currRowIndex == 0) {
        return false;
    }
	var detailPk = l_pk_arr[currRowIndex-1];
    detailWinParams.ShowSummary = "TRUE";
    detailWinParams.DetailPkVals = detailPk;
	screenArgs['DCN'] = detailPk;
    detailWinParams.sumTxnBranch = sumTxnBranch;
    mainWin.dispHref1('MSDVWNOT', seqNo);
	parent.screenArgs=screenArgs;     
    return true;			
}

function fnPostLoad_CVS_MAIN(screenArgs) {
    dbIndexArray['MSTBS_DLY_SWIFT_MSG_NOTIF'] = 1;
    disableForm();
    showTabData();
}

//Notification message changes starts
function fn_view_ack_nak_msg() {
	
	if (fnCheck()) {
		
		fn_GetDcn();
		fn_GetMedia();
		if (l_Media == 'FINPLUS') {
			var l_cnt = count ; 
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'ACK_NAK';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_MAIN'
			screenArgs['FUNCTION_ID'] = 'MSDACKNT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDACKNT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDACKNT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDACKNT", parent.seqNo);
		} else {
			var l_cnt = count ; 
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'ACK_NAK';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_VIEWMSG'
			screenArgs['FUNCTION_ID'] = 'MSDVWNOT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDVWNOT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDVWNOT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDVWNOT", parent.seqNo);
		}
	}
	return true;
}

function fn_view_delivery_notify_msg() {
	
	if (fnCheck()) {
		
		fn_GetDcn();
		fn_GetMedia();
		if (l_Media == 'FINPLUS') {
			var l_cnt = count ; 
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'DELIVERY_NOTIFY';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_MAIN'
			screenArgs['FUNCTION_ID'] = 'MSDDELNT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDDELNT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDDELNT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDDELNT", parent.seqNo);
		} else {
			var l_cnt = count; 
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'DELIVERY_NOTIFY';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_VIEWMSG'
			screenArgs['FUNCTION_ID'] = 'MSDVWNOT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDVWNOT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDVWNOT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDVWNOT", parent.seqNo);
		}
	}
	return true;
}

function fn_view_non_delivery_warn_msg() {
	
	if (fnCheck()) {
		
		fn_GetDcn();
		fn_GetMedia();
		if (l_Media == 'FINPLUS') {
			var l_cnt = count ; 
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'NON_DELIVERY_WARNING';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_MAIN'
			screenArgs['FUNCTION_ID'] = 'MSDNDLNT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDNDLNT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDNDLNT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDNDLNT", parent.seqNo);
		} else {
			var l_cnt = count;
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'NON_DELIVERY_WARNING';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_VIEWMSG'
			screenArgs['FUNCTION_ID'] = 'MSDVWNOT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDVWNOT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDVWNOT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDVWNOT", parent.seqNo);
		}
	}
	return true;
}

function fn_view_failed_delivery_warn_msg() {
	
	if (fnCheck()) {
		
		fn_GetDcn();
		fn_GetMedia();
		if (l_Media == 'FINPLUS') {
			var l_cnt = count ; 
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'VIEW_FAIL_DEL_WARN_MSG';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_MAIN'
			screenArgs['FUNCTION_ID'] = 'MSDFDLNT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDFDLNT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDFDLNT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDFDLNT", parent.seqNo);
		} else {
			var l_cnt = count ; 
			screenArgs = new Array();
			screenArgs['DCN'] = notifyPkValues1;
			screenArgs['MSG_TYPE'] = 'VIEW_FAIL_DEL_WARN_MSG';
			screenArgs['SUB_SCREEN'] = 'Y';
			screenArgs['SCREEN_NAME'] = 'CVS_VIEWMSG'
			screenArgs['FUNCTION_ID'] = 'MSDVWNOT';
			screenArgs['ACTION'] = 'EXECUTEQUERY';
			screenArgs['UI_XML'] = 'MSDVWNOT';
			screenArgs['PARENT_FUNC_ID'] = 'MSDNOTIB';
			funcid = 'MSDVWNOT';
			parent.screenArgs = screenArgs;
			gAction = "EXECUTEQUERY";
			mainWin.dispHref1("MSDVWNOT", parent.seqNo);
		}
	}
	return true;
}

function fnCheck() {
	
	//len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;//redwood_changes
	len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
	msob_tchk = 0;
	for (i = 0; i < len; i++) {
		//if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {//redwood_changes
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {	
			//if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {//redwood_changes
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true) {
			msob_tchk = msob_tchk + 1;
			selected_row = i;
			}
		} else
			break;
	}

	if (msob_tchk == 0) {

		showErrorAlerts('IN-HEAR-206');
		return false;
	}

	if (msob_tchk > 1) {

		showErrorAlerts('IN-HEAR-205');
		return false;
	}
	return true;
}

function fn_GetDcn() {
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
    var sumfldTag = summaryFN.substring(summaryFN.indexOf(">") + 1, summaryFN.length);
    //var tableObject = document.getElementById("TBL_QryRslts");//redwood_changes
	var tableObject = getTableObjForBlock("TBL_QryRslts");
    var allRows = tableObject.tBodies[0].rows;
    var recNodes = selectNodes(fcjResponseDOM, "//MSG/REC");
    var recPkCols = new Array();;
	count = 0;

	notifyPkValues1 = "";
    try {
        for (var recCnt = 0; recCnt < allRows.length; recCnt++) {
            //if (allRows[recCnt].cells[0].getElementsByTagName("INPUT")[0].checked) { //redwood_changes
			if (allRows[recCnt].cells[0].getElementsByTagName("INPUT")[0].checked==true) {
				count++;
                //var addRec = Number(getInnerText(document.getElementById("CurPage")));//redwood_changes
                var addRec = Number(getInnerText(document.getElementById("CurPage")));
                var recNode = selectSingleNode(fcjResponseDOM, "//MSG/REC[position()=" + (recCnt + addRec) + "]");
                
                var refIdCell= fnGetCellIndexOf("DCN1");
                
                //var recId = getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[recCnt].cells[refIdCell]);//redwood_changes
				var recId = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[recCnt].cells[refIdCell]);
                
                recId = replaceAllChar(recId, '~', '-');
                notifyPkValues1 += recId;
            }
        }
    } catch (e) {}
    return true;
}

function fn_GetMedia() {
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
    var sumfldTag = summaryFN.substring(summaryFN.indexOf(">") + 1, summaryFN.length);
    var tableObject = document.getElementById("TBL_QryRslts");
    var allRows = tableObject.tBodies[0].rows;
    var recNodes = selectNodes(fcjResponseDOM, "//MSG/REC");
    var recPkCols = new Array();;
	count = 0;

	l_Media = "";
    try {
        for (var recCnt = 0; recCnt < allRows.length; recCnt++) {
            if (allRows[recCnt].cells[0].getElementsByTagName("INPUT")[0].checked) {
				count++;
                var addRec = Number(getInnerText(document.getElementById("CurPage")));
                var recNode = selectSingleNode(fcjResponseDOM, "//MSG/REC[position()=" + (recCnt + addRec) + "]");
                
                var refIdCell= fnGetCellIndexOf("MEDIA");
                
                var recId = getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[recCnt].cells[refIdCell]);
                
                recId = replaceAllChar(recId, '~', '-');
                l_Media += recId;
            }
        }
    } catch (e) {}
    return true;
}

function fnGetCellIndexOf(pVar){

	//for (var i = 0 ; i < document.getElementById("TBL_QryRslts").tBodies[0].rows[1].cells.length ; i++){//redwood_changes
	for (var i = 0 ; i < document.getElementById("TBL_QryRslts").getElementsByTagName("table")[0].tBodies[0].rows[0].cells.length;i++){	
			//if (document.getElementById("TBL_QryRslts").tBodies[0].rows[1].cells[i].getAttribute("name") == pVar) {//redwood_changes
		if (document.getElementById("TBL_QryRslts").getElementsByTagName("table")[0].tBodies[0].rows[0].cells[i].getAttribute("name") == pVar) {	
			return i;
		}
	}
}
//Notification message changes ends