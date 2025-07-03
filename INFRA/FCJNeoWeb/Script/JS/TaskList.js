/*----------------------------------------------------------------------------------------------------
**
** File Name    : TaskList.js
** 
** Module       : Flexbranch
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004-2015   by Oracle Financial Services Software Limited..


 	Modified By           : Sriraam S
	Modified On           : 06-Feb-2014
	Modified Reason       : All Instrument Transactions brought under DD
	Search String         : 9NT1525_1203_18194276
	
**  Modified By          : Neethu Sreedharan
**  Modified On          : 16-Feb-2017
**  Modified Reason      : ISSUE RELATED TO RT WORKFLOW SCREEN
**  Retro Source         : 9NT1606_12_1_BANK_AUDI
**  Search String        : 9NT1606_12_3_RETRO_12_1_25562136

**  Modified By          : Vipan Kumar
**  Modified On          : 26-Jul-2017
**  Modified Reason      : Label with special character got replaced with html name. ie for eg: & was replaced with &amp;. Hence html event failed to fire due to the following replacement.
**  Search String        : 9NT1606_12_4_RETRO_12_3_26524845
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 16-Jun-2017
**  Modified Reason      : WORKFLOW - THE ACTIVE ACTION ON CLICK IS NOT HIGHLIGHTED
**  Search String        : 9NT1606_12_4_RETRO_12_3_26624737
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 16-Jun-2017
**  Modified Reason      : WORKFLOW - THE ACTIVE ACTION TYPE SHOULD BE RECOGNIZABLE 
**  Search String        : 9NT1606_12_4_RETRO_12_3_26583067
----------------------------------------------------------------------------------------------------


*/

/**
 * @Author BOGI RAJA C
 * This file contain task list xml parsing code.
 * Auto request to server for tasklist and all Task List screen specific Function
 */
var textRespXML = "";
var timOID;
var qryStr="";
var objXMLHTTP = null;
var timerRedirect;
var listCnt = new Array();
var mainWin = parent;
var userId = mainWin.userId;
var timeout_responseXML = '<RESP>TIMEOUT</RESP>';
var timeout_responseText = 'TIMEOUT';
var searchOption = '';
var list = new Image();
var imgPath = null;
if (typeof(theme_imagesPath) != "undefined") {
    imgPath = theme_imagesPath;
}
list = imgPath + "/list.gif";
var next="next";
var prev="prev";
var gcurrpage="1";
var fcjRespWrkflow='';

var WrkResp = new Array();
var WokflowArr = new Array();
var transactionLabel = "spanWorkflowSearch";
var msgChar="";/* security fixes for WF */
var curWfTab = 1;//Fix for 16958871
//-----------------------------------------------------------------------------------------
function hideProgress() {
    slowScreenSplash.style.display = "none";
    document.getElementById('TLResTree').innerHTML = "";
}

function sendRequest(method, serverUrl, queryStr) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var respXML = "";
    objXMLHTTP = createHTTPActiveXObject();
    objXMLHTTP.open(method, urlencode(serverUrl) + '?' + queryStr, false); //12.1_Fortify_Fixes  
    objXMLHTTP.setRequestHeader("Content-Type", "application/xml");
   //12.1 Dashboard changes start 
objXMLHTTP.setRequestHeader("charset", "utf-8");
//12.1 Dashboard changes end
    objXMLHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objXMLHTTP.send();
    var csrfNode = selectSingleNode(objXMLHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        if (objXMLHTTP.status != 200) { //200 - OK
            alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + " " + objXMLHTTP.status + ":" + objXMLHTTP.statusText);
            respXML = "ERROR";
        } 
        else if (selectSingleNode(objXMLHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objXMLHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change start
                mainWin.mask(); 
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }//session expiry change end
        else {
            respXML = objXMLHTTP.responseText;
        }
        return respXML;
    }
}

function sortTaskTable(id, colPos) {
    shortTable(id, colPos)
}

function shortTable(id, col) {
    var tref = document.getElementById(id).tBodies[0];
    var lengthRow = tref.rows.length
    for (var i = 0; i < lengthRow; i++) {
        for (var j = i; j < lengthRow; j++) {
            var outerVal = tref.rows[i].cells[col].innerText;
            var innerVal = tref.rows[j].cells[col].innerText;
            if (outerVal.toUpperCase() < innerVal.toUpperCase()) {
                var outerRef = tref.rows[i];
                var innerRef = tref.rows[j];
                var colLength = tref.rows[j].cells.length;
                for (var k = 0; k < colLength; k++) {
                    var thtml = outerRef.cells[k].innerHTML;
                    outerRef.cells[k].innerHTML = innerRef.cells[k].innerHTML;
                    innerRef.cells[k].innerHTML = thtml;
                }
            }
        }
    }

}
//---------------------------------------------------------------------------------------
function getTasklist() {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    objXMLHTTP = createHTTPActiveXObject();
    var serverURL = "BranchServlet";
    objXMLHTTP.open("POST", serverURL + "?msgType=TASKLIST&queryType=All", false);
    objXMLHTTP.setRequestHeader("Content-Type", "application/xml");
    objXMLHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objXMLHTTP.send();
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    }
    else if (selectSingleNode(objXMLHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objXMLHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change start  
        mainWin.mask(); 
        mainWin.sessionTimeOut = true;
        mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
        return false;
    }//session expiry change  end
    else {
        if (objXMLHTTP.status != 200) { //200 - OK
            alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + " " + objXMLHTTP.status + ":" + objXMLHTTP.statusText);
        } else {
            textRespXML = objXMLHTTP.responseText;
            if (!textRespXML || textRespXML == timeout_responseXML) {
                openTimeOutPage();
            }
        }
    }
}

function autoPuller() {
    autoPullerHelper();
    clearInterval(timerRedirect);
    timerRedirect = setInterval('autoPullerHelper();', Number(parseInt(branchWorkflowFrequency)*1000));
}
// workflow tab changes
function autopullerWFTab(){

    var returnarray=autoPullerHelperWFTab(); // wftab changes
    clearInterval(timerRedirect);
    timerRedirect = setInterval('autoPullerHelper();', Number(parseInt(branchWorkflowFrequency)*1000));
    return returnarray;
}
function getWorkflowTabCount(){
    var serverURL = "BranchServlet";
    var queryStr = 'msgType=TASKLIST&queryType=Count&cntFnid=N&userId=' + mainWin.UserId;
    var reqmethod = 'POST';
    var textRespXML = sendRequest(reqmethod, serverURL, queryStr);
    if (textRespXML == timeout_responseXML) {
        openTimeOutPage();
        return '';
    }
    if (textRespXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
        return '';
    } else {
        var cntDOM = null;
        cntDOM = loadXMLDoc(textRespXML);
        listCnt = null;
        listCnt = new Array();
        if (getXMLString(cntDOM) != "") {
            listCnt[0] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/PENDINGTXN'));
            listCnt[1] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/ASSIGNEDTXN'));
            listCnt[2] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UNASSIGNEDTXN'));
            listCnt[3] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/COMPLETETXN'));
            listCnt[4] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/FAILEDTXN'));
            listCnt[5] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/REVERSEDTXN'));
            listCnt[6] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/SENDTOHOSTTXN'));
            listCnt[7] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/TANKEDTXN'));
            listCnt[8] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UNTANKEDTXN'));
            listCnt[9] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/APPROVEDTXN'));
            listCnt[10] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/AUTHHISTORYTXN'));
            listCnt[11] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/SENTFORREVERSAL'));
            listCnt[12] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/MULTIAUTHTXN')); //12.1_multiauth
            listCnt[13] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/DISCARDEDTXN')); //12.1_multiauth
            var brnStat = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/BRNSTAT'));
            try {
                parent.setBrnStat(brnStat);
            } catch(e) {}
            return listCnt;
        } else {
            return listCnt;
        }
    }
}

function autoPullerHelper() {        //reduntant---not using now..
    var serverURL = "BranchServlet";
    var queryStr = 'msgType=TASKLIST&queryType=Count&userId=' + mainWin.UserId;
    var reqmethod = 'POST';
    var textRespXML = sendRequest(reqmethod, serverURL, queryStr);
    if (textRespXML == timeout_responseXML) {
        openTimeOutPage();
        return '';
    }
    if (textRespXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
        return '';
    } else {
        var cntDOM = null;
        cntDOM = loadXMLDoc(textRespXML);

        listCnt = null;
        listCnt = new Array();
        if (getXMLString(cntDOM) != "") {
            listCnt[0] = getNodeText(selectSingleNode(cntDOM, "//TASKLIST/TLREC/PENDINGTXN"));
            listCnt[1] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/ASSIGNEDTXN'));
            listCnt[2] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UNASSIGNEDTXN'));
            listCnt[3] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/COMPLETETXN'));
            listCnt[4] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/FAILEDTXN'));
            listCnt[5] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/REVERSEDTXN'));            
            listCnt[6] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/TANKEDTXN'));
            listCnt[7] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UNTANKEDTXN'));
            listCnt[8] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/APPROVEDTXN'));
            listCnt[9] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/AUTHHISTORYTXN'));
            listCnt[10] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/SENTFORREVERSAL'));
            listCnt[11] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/MULTIAUTHTXN'));  //12.1_multiauth
            listCnt[12] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/DISCARDEDTXN'));  //12.1_multiauth
            //listCnt[6] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/SENDTOHOSTTXN'));
            var brnStat = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/BRNSTAT'));
            try {
                parent.setBrnStat(brnStat);
            } catch(e) {}
            document.getElementById("vTabCN_TELLER").innerHTML = getSummaryMenuBuilder(listCnt);
        } else {
            document.getElementById("vTabCN_TELLER").innerHTML = "";
        }
    }
}

function getCustomerAccountDetails() {
    document.getElementById('TBLPageTaskSummary').style.display = 'none';
    document.getElementById('TLResTree').style.display = 'none';
    document.getElementById('TBLPageTaskResult').style.display = 'none';
    document.getElementById('TBLPageTaskSearch').style.display = 'none';
    document.getElementById('TBLCustomerAccountDetails').style.display = "";
    document.getElementById('TBLCustomerImageDetails').style.display = "";
}
/*
 * This function will show summary menus
 *
 */
function fnShowSummary() {
    if (typeof(sc3) != "undefined")
        sc3.getElementsByTagName("DIV")[1].innerHTML = autoPullerHelper();
    autoPuller();
    createTree("treemenu4", true);
}

function getSummaryMenuBuilder(countsArr) {
    var labelWorkflow = mainWin.getItemDesc("LBL_WORKFLOW");
    var labelSearchTasks = mainWin.getItemDesc("LBL_SEARCH_TASKS");
    var labelSearchResult = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    var labelarray = new Array();
    var count=0;
    labelarray[0]  = mainWin.getItemDesc("LBL_PENDING");
    labelarray[1]  = mainWin.getItemDesc("LBL_ASSIGNED");
    labelarray[2]  = mainWin.getItemDesc("LBL_UNASSIGNED");
    labelarray[3]  = mainWin.getItemDesc("LBL_COMPLETED");
    labelarray[4]  = mainWin.getItemDesc("LBL_FAILED");
    labelarray[5]  = mainWin.getItemDesc("LBL_REVERSED");
    labelarray[6]  = mainWin.getItemDesc("LBL_TANKED");
    labelarray[7]  = mainWin.getItemDesc("LBL_UNTANKED");
    labelarray[8]  = mainWin.getItemDesc("LBL_APPROVED");
    labelarray[9]  = mainWin.getItemDesc("LBL_AUTHHISTORY");    
    labelarray[10] = mainWin.getItemDesc("LBL_SENDFORREVERSAL");
    labelarray[11] = mainWin.getItemDesc("LBL_MULTIAUTH"); //12.1_multiauth
    labelarray[12] = mainWin.getItemDesc("LBL_DISCARDED"); //12.1_multiauth
   
    //document.getElementById("DIVresultsTBL1").style.height=25*document.getElementById("CustQueryResults").rows.length+"px";
    

    /*var html = '<a name="href' + labelWorkflow + '"></a>';
    html += '<ul id="treemenu4" class="treeview" >';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'PENDING\');" id="pending" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelPending + '&nbsp;&nbsp; (' + countsArr[0] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'ASSIGNED\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelAssigned + '&nbsp;&nbsp; (' + countsArr[1] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'APPROVED\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelApproved + '&nbsp;&nbsp; (' + countsArr[9] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'AUTHHISTORY\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelAuthHistory + '&nbsp;&nbsp; (' + countsArr[10] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'FAILURE\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelFailed + '&nbsp;&nbsp; (' + countsArr[4] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'UNASSIGN\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelUnAssigned + '&nbsp;&nbsp; (' + countsArr[2] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'COMPLETE\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelCompleted + '&nbsp;&nbsp; (' + countsArr[3] + ')</a>';
    html += '</li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat">';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'REVERSE\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelReversed + '&nbsp;&nbsp; (' + countsArr[5] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'TANK\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelTanked + '&nbsp;&nbsp; (' + countsArr[7] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'UNTANK\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelUntanked + '&nbsp;&nbsp; (' + countsArr[8] + ')</a>';
    html += '</li>';
    html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:fnShowSearchTab();" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelSearchTasks + '&nbsp;&nbsp; </a>';
    html += '</li>';
	html += '<li style="BACKGROUND-IMAGE: url(' + list + '); BACKGROUND-REPEAT: no-repeat"><a class="Astd" href="javascript:showResult(\'SENTFORREVERSAL\');" onkeydown=\"return fnHandleTellerKeys(event)\">' + labelSentForReversal + '&nbsp;&nbsp; (' + countsArr[11] + ')</a>';
    html += '</li>';
    html += '</ul>';*/
    return html;
}

function fnShowSearchTaskList() {
    var labelFunctionId = mainWin.getItemDesc("LBL_FUNCTIONID");
    var labelMakerID = mainWin.getItemDesc("LBL_MAKERID");
    var labelTxnStatus = mainWin.getItemDesc("LBL_TXN_STATUS");
    var labelAll = mainWin.getItemDesc("LBL_ALL");
    var labelInProgress = mainWin.getItemDesc("LBL_IN_PROGRESS");
    var labelCompleted = mainWin.getItemDesc("LBL_COMPLETED");
    var labelFailed = mainWin.getItemDesc("LBL_FAILED");
    var labelTanked = mainWin.getItemDesc("LBL_TANKED");
    var labelStageStatus = mainWin.getItemDesc("LBL_STAGE_STATUS");
    var labelAll = mainWin.getItemDesc("LBL_ALL");
    var labelInProgress = mainWin.getItemDesc("LBL_IN_PROGRESS");
    var labelWaitingToAutoassign = mainWin.getItemDesc("LBL_WAIT_AUTOASSIGN");
    var labelWaitingToManualassign = mainWin.getItemDesc("LBL_WAIT_MANUALASSIGN");
    var labelWaitingToStart = mainWin.getItemDesc("LBL_WAIT_START");
    var labelCompleted = mainWin.getItemDesc("LBL_COMPLETED");
    var labelFailed = mainWin.getItemDesc("LBL_FAILED");
    var labelXRef = mainWin.getItemDesc("LBL_XREF");
    var labelWFSDate = mainWin.getItemDesc("LBL_WFSDATE");
    var labelAssignTo = mainWin.getItemDesc("LBL_ASSGN_TO");
    var labelLockedBy = mainWin.getItemDesc("LBL_LOCKED_BY");
    var labelAnd = mainWin.getItemDesc("LBL_AND");
    var labelOr = mainWin.getItemDesc("LBL_OR");
    var labelFull = mainWin.getItemDesc("LBL_FULL");
    var labelQuick = mainWin.getItemDesc("LBL_QUICK");
    var labelTransactionBranch = mainWin.getItemDesc("LBL_TXNBRANCH");
    var labelTransactionAccount = mainWin.getItemDesc("LBL_TXNACCOUNT");
    var labelCurrency = mainWin.getItemDesc("LBL_TXNCCY");
    var labelAmount = mainWin.getItemDesc("LBL_TXNAMOUNT");
	var labelTxnSeqno = mainWin.getItemDesc("LBL_TXNSEQNO");
	var search = mainWin.getItemDesc("LBL_SEARCH");
	var workflow = mainWin.getItemDesc("LBL_WORKFLOW");
	

    var html = '<DIV ID="mainsearchtask" style="display:block; width:99.9%" >';
    /* FC 11.4 NLS Changes Starts */
    //html += '<div class="DIVpage" style="padding-bottom:3px; width:100%" ><h2 class="SPNpageH" tabindex="0"><a name="#" tabindex="0" accesskey="4">Workflow - Search</a></h2></div>';
    //html += '<TABLE class="TBLlyt" style="visibility:visible; width:99.8%; clear:both" summary="" cellpadding="1" cellspacing="0" border="0" valign="top" onkeydown="return fnHTLBarKeyEvents(event);" onmousedown="return fnHTLBarKeyEvents(event);">';
    //FCUBS 11.4.1 INFRA Fix starts
    html += '<div class="DIVpage" style="padding-bottom:3px; width:100%" ><h2 class="SPNpageH"tabindex="0"><a name="#" accesskey="2">'+workflow+' - '+search+'</a></h2></div>';
	html += '<TABLE class="TBLlyt" style="visibility:visible; width:99.8%; clear:both" summary="" cellpadding="1" cellspacing="0" border="0" valign="top" onkeydown="return fnHTLBarKeyEvents(event);" onmousedown="return fnHTLBarKeyEvents(event);">';
   //FCUBS 11.4.1 INFRA Fix ends 

    html += '<TBODY><TR>';
    html += '<TD><label class="LBLauto" for="FUNCTIONID">' + labelFunctionId + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="FUNCTIONID" class="TXTstd" title="' + labelFunctionId + '"/></TD>';
    html += '<TD><label class="LBLauto" for="MakerID">' + labelMakerID + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" class="TXTstd" ID="MakerID" title="' + labelMakerID + '"/></TD>';
    html += '<TD><label class="LBLauto" for="XREFID">' + labelXRef + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="XREFID" class="TXTstd" title="' + labelXRef + '"/></TD>';
    html += '</TR>';

    html += '<TR>';
    html += '<TD><label class="LBLauto" for="WFINITDATE">' + labelWFSDate + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="WFINITDATE" class="TXTstd" title="' + labelWFSDate + '"/></TD>';
    html += '<TD><label class="LBLauto" for="TXNSTATUS">' + labelTxnStatus + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><SELECT ID="TXNSTATUS" CLASS="SELstd">';
    html += '<OPTION value="">' + labelAll + '</OPTION>';
    html += '<OPTION value="IPR">' + labelInProgress + '</OPTION>';
    html += ' <OPTION value="COM">' + labelCompleted + '</OPTION>';
    html += '<OPTION value="FAL">' + labelFailed + '</OPTION>';
    html += '<OPTION value="TNK">' + labelTanked + '</OPTION>';
    html += '</SELECT></TD>';
    html += '<TD><label class="LBLauto" for=STAGESTATUS>' + labelStageStatus + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><SELECT CLASS="SELstd" id="STAGESTATUS" >';
    html += '<OPTION value="">' + labelAll + '</OPTION>';
    html += ' <OPTION value="IPR">' + labelInProgress + '</OPTION>';
    html += '<OPTION value="WAA">' + labelWaitingToAutoassign + '</OPTION>';
    html += ' <OPTION value="WMA">' + labelWaitingToManualassign + '</OPTION>';
    html += '<OPTION value="WTS">' + labelWaitingToStart + '</OPTION>';
    html += '<OPTION value="COM">' + labelCompleted + '</OPTION>';
    html += '<OPTION value="FAL">' + labelFailed + '</OPTION>';
    html += '</SELECT></TD>';
    html += '</TR>';

    html += '<TR>';
    html += '<TD><label class="LBLauto" for="ASSIGNEDTO">' + labelAssignTo + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="ASSIGNEDTO" class="TXTstd" title="' + labelAssignTo + '"/></TD>';
    html += '<TD><label class="LBLauto" for="LOCKEDBY">' + labelLockedBy + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="LOCKEDBY" class="TXTstd" title="' + labelLockedBy + '"/></TD>';
    html += '<TD><label class="LBLauto" for="TransactionBranch">' + labelTransactionBranch + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="TXNBRANCH" class="TXTstd" title="' + labelTransactionBranch + '"/></TD>';
    html += '</TR>';
    
    html += '<TR>';
    html += '<TD><label class="LBLauto" for="TransactionAccount">' + labelTransactionAccount + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="TXNACCOUNT" class="TXTstd" title="' + labelTransactionAccount + '"/></TD>';
    html += '<TD><label class="LBLauto" for="TXNCCY">' + labelCurrency + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="TXNCCY" class="TXTstd" title="' + labelCurrency + '"/></TD>';
    html += '<TD><label class="LBLauto" for="TXNAMOUNT">' + labelAmount + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="TXNAMOUNT" name="TXNAMOUNT" class="TXTstd" title="' + labelAmount + '" onblur=\"validateInputAmount(\'TXNAMOUNT\', event)\"/></TD>';
    html += '<TR>';
    html += '<TD><label class="LBLauto" for="TXNSEQNO">' + labelTxnSeqno + '&nbsp;&nbsp;</label></TD>';
    html += '<TD><INPUT TYPE="TEXT" ID="TXNSEQNO" class="TXTstd" title="' + labelTxnSeqno + '"/></TD>';
    html += '</TR>';
	html += '</TR></TBODY></TABLE>';

    html += '<DIV id="searchbtndiv" class="DIVpage">';
    html += '<label style="display:none" class="LBLauto" for="condtion"><input type="radio" name="rad" value="AND" id="condtion">' + labelAnd + '&nbsp;&nbsp;</label>';
    html += '<label style="display:none" class="LBLauto" for="condtion"><input type="radio" name="rad" value="OR"  id="condtion">' + labelOr + '&nbsp;&nbsp;</label>';
    html += '<label class="LBLauto" style="float:none;clear:none" for="SEARCHTYPE1"><input type="radio" name="SEARCHTYPE" value="Full" id="SEARCHTYPE1">' + labelFull + '&nbsp;&nbsp;</label>';
    html += '<label class="LBLauto" style="float:none;clear:none" for="SEARCHTYPE2"><input type="radio" name="SEARCHTYPE" checked="checked" value="Quick" id="SEARCHTYPE2">' + labelQuick + '&nbsp;&nbsp;</label>';
    html += '<BUTTON class="BTNtext" id="search" onclick="doSearch2(event);">'+search+'</BUTTON>';
	
   
    html += '</DIV>';
    html += '</DIV>';
	html+='<div id="searchContent"></div>';
    return html;
}

function showResult(summaryType) {
    try {
        searchOption = '';       
	
		summaryType = summaryType.toUpperCase();
        switch (summaryType) {
        case "PENDING":
            {
                getSearchResult('IPR~!IPR~', 'specific');
                break;
            }
        case "ASSIGNED":
            {
                getSearchResult('IPR~!WTS~', 'specific');
                break;
            }
        case "APPROVED":
            {
                getSearchResult('IPR~!APP~', 'specific');
                break;
            }
        case "AUTHHISTORY":
            {
                getSearchResult('IPR~!AUT~', 'specific');
                break;
            }
        case "UNASSIGN":
            {
                getSearchResult('IPR~!WAA~WMA~', 'specific');
                break;
            }
        case "COMPLETE":
            {
                getSearchResult('IPR~!WTS~', 'Completed');
                break;
            }
        case "FAILURE":
            {
                getSearchResult('FAL~!FAL~', 'specific');
                break;
            }
        case "REVERSE":
            {
                getSearchResult('REV~!~', 'reverseSearch');
                break;
            }
        case "SENDTOHOST":
            {
                getSearchResult('IPR~!STH~', 'specific');
                break;
            }
        case "TANK":
            {
                getSearchResult('TNK~!COM~', 'tankSearch');               
                break;
            }
        case "SENTFORREVERSAL":
            {
                getSearchResult('IPR~!WTS~', 'sendingForAuth');
                break;
            }
        case "UNTANK":
            {
                getSearchResult('TNK~!COM~', 'untankSearch');
                break;
            }
              //12.1_multi_auth starts
            case "MULTIAUTH": {
                getSearchResult('IPR~!MTS~', 'specific');
                break;
            }   
              case "DISCARDED": {
                getSearchResult('DIS~!DIS~', 'specific');
                break;
            }  
            
            //12.1_multi_auth ends    
        }

        setTableCaption(summaryType);
    } catch(e) {
		
	}
}

function getGrpLinks(){
    var actionobj = document.getElementById('TRANSDETAILS');
    var actionobjlinks = actionobj.getElementsByTagName("A");
    return actionobjlinks;
}

function highlightGrouprec(groupobj,tabobjlinks){
for (i = 0; i < tabobjlinks.length; i++) {
 //12.1 Dashboard changes  -start
      if(tabobjlinks[i].className == 'AstdDisabled'){
      
      continue;
      }
       //12.1 Dashboard changes  -end
        addEvent(tabobjlinks[i], "class", "Astd");         
    }
    addEvent(groupobj, "class","Astdselected");    
}

function showResultTable(funcid , queue, myflag,eventElem){

    //var event=window.event||evnt;
    //var eventElem = getEventSourceElement(event);
    /*9NT1606_12_4_RETRO_12_3_26524845--changes start*/
    //transactionLabel = eventElem.innerHTML;
    transactionLabel = eventElem.textContent;
    /*9NT1606_12_4_RETRO_12_3_26524845--changes ends*/
    var grpLinks = getGrpLinks();
    var qryStr = buildQueryString();
    highlightGrouprec(eventElem,grpLinks); 
    
    //if (document.getElementById(transactionLabel)){
   // closeCurrentTab(document.getElementById(transactionLabel).parentNode)
  // refreshTransactionData(transactionLabel);
   //fnToggleDisplay(document.getElementById(transactionLabel).parentNode.id);
   
  // }
   
//12.1 Dashboard changes  -start
 //  if(currentTab== 'DBoardWorkFlow'){
   // document.getElementById('Divtxncount').innerHTML  = "";
  //  }
//12.1 Dashboard changes  -end
   // if(myflag=="load"){
    // if(typeof(document.getElementById('Divwfgrpdtls').getElementsByTagName("A")[0])!="undefined")
   //  document.getElementById('Divwfgrpdtls').getElementsByTagName("A")[0].className="Astdselected"; 
  //  }
    

    try {
        searchOption = '';        
        var funarr = funcid.split(",");
        
        
      /* security fixes for WF changes starts */ 
        switch (queue) {
        case "IPR|!IPR|":
            {
                queue='IPR|!IPR|';
                getResultTable(qryStr,queue,'specific',funarr,'');
                break;
            }
        case "IPR|!WTS|":
            {
                queue='IPR|!WTS|';
                getResultTable(qryStr,queue,'specific',funarr,'');                
                break;
            }
        case "IPR|!APP|":
            {
                queue='IPR|!APP|';   
                getResultTable(qryStr,queue,'specific',funarr,'');                
                break;
            }
        case "IPR|!AUT|":
            {
                queue='IPR|!AUT|';
                getResultTable(qryStr,queue,'specific',funarr,'');
               
                break;
            }
        case "IPR|!WAA|WMA|":
            {
                queue='IPR|!WAA|WMA|';
                getResultTable(qryStr,queue,'specific',funarr,'');
                break;
            }
        case "COM|!COM|":
            {
             queue='COM|!COM|';
	     getResultTable(qryStr,queue,'specific',funarr,'');
                break;
            }
        case "FAL|!FAL|":
            {
                queue='FAL|!FAL|';
                getResultTable(qryStr,queue,'specific',funarr,'');               
                break;
            }
        case "REV|!REV|":
            {
                queue='REV|!REV|'; 
                getResultTable(qryStr,queue,'reverseSearch',funarr,'');
                break;
            }
        case "IPR|!STH|":
            {
                queue='IPR|!STH|';
                getResultTable(qryStr,queue,'specific',funarr,'');                
                break;
            }
        case "TNK|RTK!COM|":
            {
                queue='TNK|RTK!COM|';
                getResultTable(qryStr,queue,'tankSearch',funarr,''); 
                break;
            }
        case "SENTFORREVERSAL":
            {
                queue='IPR|!DIS|';
                getResultTable(qryStr,queue,'specific',funarr,'');                
                break;
            }
        case "RUT|UTK|ARV|RFW|DEL!COM|":
            {
                queue='RUT|UTK|ARV|RFW|DEL!COM|';
                getResultTable(qryStr,queue,'untankSearch',funarr,''); 
                break;
            }
            //12.0.2_17337720 starsts
            case "IPR|!WTS|!SFA|": 
            {
                 queue='IPR|!WTS|!SFA|';
                getResultTable(qryStr,queue,'specific',funarr,''); 
                break;
            }//12.0.2_17337720 ends
            
                        //12.1_multi_auth
           case  "IPR|!MTS|" :
           {
           queue="IPR|!MTS|" ;
               getResultTable(qryStr,queue,'specific',funarr,'');    
			    break;
           }
           
                      case  "DIS|!DIS|" :
           {
           queue="DIS|!DIS|" ;
               getResultTable(qryStr,queue,'specific',funarr,'');    
			    break;
           }
            //12.1_multi_auth
        }
        
  /* security fixes for WF changes ends */ 
  
    }catch(e) {
    }  
//12.1 Dashboard changes   start
  unmask();
//12.1 Dashboard changes end
}
//--------------------------------------------------------------------------------------
/*
 *This screen will show the search tab
 *
 */
function fnShowSearchTab(wftab) {
    var WFTablinks = getWFTabs();
    highlightWFTab(wftab,WFTablinks);   
    document.getElementById('WFTabContent').innerHTML = '';
    var html = fnShowSearchTaskList();
    document.getElementById('WFTabContent').innerHTML = html;
    //document.getElementById('searchtask').style.height= document.getElementById('searchtask').offsetHeight-document.getElementById("SYS_TBL_TABS").offsetHeight  - document.getElementById("DIVM_WorkFlow").offsetHeight+"px";
   // document.getElementById('DIVTaskContent').style.display = "";
    //document.getElementById('FUNCTIONID').focus();
    //doSearch2();
}
function fnShowSearchTabWF() { //reduntant---not using now..
    //document.getElementById('WorkFlow_Tabs').style.display = "none";
    var html = fnShowSearchTaskList();
    //var target = document.getElementById('vTabDB_TELLER');
    //target.insertAdjacentHTML("beforeEnd", html);
    document.getElementById('WorkFlow_SearchTasks').innerHTML= html;
}

function  fnShowWorkFlowold(){
    document.getElementById('vTabDB_CENTRAL_PROCESS').innerHTML = "";
    var tabcnt = autopullerWFTab();
    var html  = fnShowWorkFlowContent(tabcnt);
    //document.getElementById('vTabDB_DASHBOARD').innerHTML = ""
    document.getElementById('vTabDB_TELLER').innerHTML= html;
    showWFTabResult("Pending");
    //document.getElementById('DIVTaskContent').style.display = "";
    //document.getElementById('FUNCTIONID').focus();   
}

function fnShowWFTabContent(wftab){
    var WFTablinks = getWFTabs();
    highlightWFTab(wftab,WFTablinks);
    showWFTabResult(wftab);  
}


function fnShowWorkFlowContent(tabarr){
    var workflowHtml='';    
    var	inparam='';
    var labelFromDate = mainWin.getItemDesc("LBL_FROM_DATE");
    var labelToDate = mainWin.getItemDesc("LBL_TO_DATE");
    var labelFunctionId = mainWin.getItemDesc("LBL_FUNCTIONID");
    var labelAcBranch = getItemDesc("LBL_BRANCH");
    var labelCustAcNo = getItemDesc("LBL_ACC_NUMBER");
    var labeluntanked=mainWin.getItemDesc("LBL_UNTANKED"); 
    var lablesearchtasks=mainWin.getItemDesc("LBL_SEARCH_TASKS");
    var labelWorkflow = mainWin.getItemDesc("LBL_WORKFLOW_SEARCH");
    
    var labelMakerID = mainWin.getItemDesc("LBL_MAKERID");   
    var labelXRef = mainWin.getItemDesc("LBL_XREF");
    var labelWFSDate = mainWin.getItemDesc("LBL_WFSDATE");
    var labelTxnStatus = mainWin.getItemDesc("LBL_TXN_STATUS");
    var labelStageStatus = mainWin.getItemDesc("LBL_STAGE_STATUS");
    var labelAssignTo = mainWin.getItemDesc("LBL_ASSGN_TO");
    var labelLockedBy = mainWin.getItemDesc("LBL_LOCKED_BY");
    var labelTransactionBranch = mainWin.getItemDesc("LBL_TXNBRANCH");
    var labelTransactionAccount = mainWin.getItemDesc("LBL_TXNACCOUNT");
    var labelCurrency = mainWin.getItemDesc("LBL_TXNCCY");
    var labelAmount = mainWin.getItemDesc("LBL_TXNAMOUNT");
    var labelTxnSeqno = mainWin.getItemDesc("LBL_TXNSEQNO");
    var labelSearch = mainWin.getItemDesc("LBL_SEARCH");
    var labelReset = mainWin.getItemDesc("LBL_RESET");
	var labelPending = mainWin.getItemDesc("LBL_PENDING"); //Fix for 24570115
    
    var workflowHtml = "";
   // workflowHtml = workflowHtml + "<a name=\'href"+labelWorkflow+"\'></a>";
   // workflowHtml = workflowHtml + "<fieldset class=\'FSTstd\'>";
   // workflowHtml = workflowHtml + "<legend>" + labelWorkflow + "</legend>";
   // workflowHtml = workflowHtml + "<div id=\'ContentMainWorkflowSearch\' class=\'DIVCustSearch\' onkeydown=\'return fnHTLBarKeyEvents(event);\' onmousedown=\'return fnHTLBarKeyEvents(event);\'>"
    workflowHtml = workflowHtml + "<div id=\'ContentMainWorkflowSearch\' class=\"ContentTabSearch\">"
    //workflowHtml = workflowHtml + "<div class=\"DIVThreeColSectionContainer DIVSmallRowContainer\" style=\"padding-top: 10px; width:100%; \" ><div class=\"DIVColumnOne\" > <fieldset class=\'FSTcell\'>";
    workflowHtml = workflowHtml + "<div class=\"DIVThreeColSectionContainer DIVSmallRowContainer\" onkeydown=\'return fnHTLBarKeyEvents(event);\' onmousedown=\'return fnHTLBarKeyEvents(event);\'><div class=\"DIVColumnOne\" > <fieldset class=\'FSTcell\'>";
   // workflowHtml = workflowHtml + "<table style=\"margin-left:auto;margin-right:auto;text-align:left\"><tr><td>";
    workflowHtml = workflowHtml + "<div class=\'DIVText\'>";
    workflowHtml = workflowHtml + "<label for=\'XREFID\' class=\'LBLstd\'>" + labelXRef + "</label>";
    workflowHtml = workflowHtml + "<input name=\'XREFID\' ID=\'XREFID\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' >";
    workflowHtml = workflowHtml + "</div>";
    workflowHtml = workflowHtml +  "<div class=\'DIVText\'>";
    workflowHtml = workflowHtml + "<label for=\'FUNCTIONID\' class=\'LBLstd\'>" + labelFunctionId + "</label>";
    workflowHtml = workflowHtml + "<input name=\'FUNCTIONID\' ID=\'FUNCTIONID\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\'>";
    workflowHtml = workflowHtml + "</div>";
    workflowHtml = workflowHtml + "<div class=\'DIVText\'>";
    workflowHtml = workflowHtml + "<label for=\'TXNSEQNO\' class=\'LBLstd\'>" + labelTxnSeqno + "</label>";
    workflowHtml = workflowHtml + "<input name=\'TXNSEQNO\' ID=\'TXNSEQNO\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' >";
    workflowHtml = workflowHtml + "</div>";
    workflowHtml = workflowHtml + "</fieldset></div>" ;
    workflowHtml = workflowHtml +"<div class=\"DIVColumnOne\" > <fieldset class=\'FSTcell\'>";
    workflowHtml = workflowHtml + "<div class=\'DIVText\'>";
    workflowHtml = workflowHtml + "<label for=\'CustAccountNo\' class=\'LBLstd\'>" + labelCustAcNo + "</label>";
    workflowHtml = workflowHtml + "<input name=\'ACCOUNT\' ID=\'ACCOUNT\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnHandleKeyEvents(event)\'>";
    if('ONLINE' == brnHostLinkStatus)  workflowHtml = workflowHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"WorkflowSearch\", \"ACCOUNT\", \"CustAccountNo\", \"LOV_ACCOUNT_WORKFLOW\", \"\", \"\", \"\", \"\", event)'";  
    else workflowHtml = workflowHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"WorkflowSearch\", \"ACCOUNT\", \"CustAccountNo\", \"LOV_ACCOUNT_WORKFLOW_OFFLINE\", \"\", \"\", \"\", \"\", event)'";
    workflowHtml = workflowHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    workflowHtml = workflowHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    workflowHtml = workflowHtml + '<span tabindex="-1" class="ICOlov"></span>';
    workflowHtml = workflowHtml + '<span class="LBLinv">List Of Values</span>';
    workflowHtml = workflowHtml + '</button> ';
    workflowHtml = workflowHtml + "</div>" 
    workflowHtml = workflowHtml + "<div class=\'DIVText\'>";
    workflowHtml = workflowHtml + "<label for=\'AccountBranch\' class=\'LBLstd\'>" + labelAcBranch + "</label>";
    workflowHtml = workflowHtml + "<input name=\'BRANCH\' ID=\'BRANCH\' type=\'text\' value =\'"+mainWin.CurrentBranch+"\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnHandleKeyEvents(event)\'>";
    if('ONLINE' == brnHostLinkStatus) workflowHtml = workflowHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"WorkflowSearch\", \"BRANCH\", \"AccountBranch\", \"LOV_BRANCH_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
    else workflowHtml = workflowHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"WorkflowSearch\", \"BRANCH\", \"AccountBranch\", \"LOV_BRANCH_CUSTOMER_OFFLINE\", \"\", \"\", \"\", \"\", event)'";
    workflowHtml = workflowHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    workflowHtml = workflowHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    workflowHtml = workflowHtml + '<span tabindex="-1" class="ICOlov"></span>';
    workflowHtml = workflowHtml + '<span class="LBLinv">List Of Values</span>';
    workflowHtml = workflowHtml + '</button> ';
    workflowHtml = workflowHtml +"</div>";
    workflowHtml = workflowHtml + "</fieldset></div>" ;
   // workflowHtml = workflowHtml + "<div class=\'DIVText\'>";
   // workflowHtml = workflowHtml + "<label for=\'AccountBranch\' class=\'LBLstdfld\'>" + labelAcBranch + "</label>";
   // workflowHtml = workflowHtml + "<input name=\'BRANCH\' ID=\'BRANCH\' type=\'text\' value =\'"+mainWin.CurrentBranch+"\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
   // workflowHtml = workflowHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"WorkflowSearch\", \"BRANCH\", \"AccountBranch\", \"LOV_BRANCH_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
   // workflowHtml = workflowHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
  //  workflowHtml = workflowHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
  //  workflowHtml = workflowHtml + '<span tabindex="-1" class="ICOlov"></span>';
   // workflowHtml = workflowHtml + '<span class="LBLinv">List Of Values</span>';
  //  workflowHtml = workflowHtml + '</button> ';
  //  workflowHtml = workflowHtml +"</div></td><td>";
    
    
    var tempDate =  new getFrmtDate(mainWin.AppDate,gDateFormatDSO);
    var displayDate = tempDate.getShortDate();
   
    workflowHtml = workflowHtml +"<div class=\"DIVColumnOne\" > <fieldset class=\'FSTcell\'>";
    workflowHtml = workflowHtml + "<div class=\'DIVText\'>";
    workflowHtml = workflowHtml + "<label class=\'LBLinv\' for=\'BLK_WORKFLOW__WFINITDATE\'></label>";
    workflowHtml = workflowHtml + "<INPUT onpropertychange=\'displayDate(this)\' id=\'BLK_WORKFLOW__WFINITDATE\' value=\'"+ mainWin.AppDate+"\' type='hidden' name=\'WFINITDATE\' REQUIRED=\'-1\' DBC=\'WFINITDATE\' DBT=\'BLK_WORKFLOW\' data_type=\'DATE\'>";
    workflowHtml = workflowHtml + "<label class=\'LBLstd\' for=\'BLK_WORKFLOW__WFINITDATEI\'>" + labelFromDate + "</label>";
    workflowHtml = workflowHtml + "<INPUT onblur=\"validateInputDateWrkflw(\'WFINITDATE\', event)\" name='WFINITDATEI' TYPE = 'TEXT' title='" + labelFromDate + "' align='left' id='BLK_WORKFLOW__WFINITDATEI' value=" + displayDate + " class='TXTstd' size=11 maxlength=11 onkeydown=\'return fnHandleKeyEvents(event)\'>";
    workflowHtml = workflowHtml + "<BUTTON class='BTNimg' title='Calendar' tabIndex='-1' onclick=\"disp_cal('WFINITDATE', event)\" type='submit' oldClassName='BTNimg'><SPAN class='ICOcalendar' tabIndex='-1'><SPAN class='LBLinv'>Calendar</SPAN></SPAN></BUTTON>";    
    workflowHtml = workflowHtml +"</div>";
    workflowHtml = workflowHtml +  "<div class=\'DIVText\'>";
    workflowHtml = workflowHtml + "<label class=\'LBLinv\' for=\'BLK_WORKFLOW__WFTODATE\'></label>";
    workflowHtml = workflowHtml + "<INPUT onpropertychange=\'displayDate(this)\' id=\'BLK_WORKFLOW__WFTODATE\' value=\'"+ mainWin.AppDate+"\' type='hidden' name=\'WFTODATE\' REQUIRED=\'-1\' DBC=\'WFTODATE\' DBT=\'BLK_WORKFLOW\' data_type=\'DATE\'>";
    workflowHtml = workflowHtml + "<label class='LBLstd' for='WFTODATE'>" + labelToDate + "</label>";
    workflowHtml = workflowHtml + "<INPUT onblur=\"validateInputDateWrkflw(\'WFTODATE\', event)\" name='WFTODATEI' TYPE = 'TEXT' title='" + labelToDate + "' align='left' ID='BLK_WORKFLOW__WFTODATEI' value=" + displayDate + " class='TXTstd' size=11 maxlength=11 onkeydown=\'return fnHandleKeyEvents(event)\'>";
    workflowHtml = workflowHtml + "<BUTTON class='BTNimg' title='Calendar' tabIndex='-1' onclick=\"disp_cal('WFTODATE', event)\" type='submit' oldClassName='BTNimg'><SPAN class='ICOcalendar' tabIndex='-1'><SPAN class='LBLinv'>Calendar</SPAN></SPAN></BUTTON>";    
    workflowHtml = workflowHtml + "</div>";   
    //workflowHtml = workflowHtml + "<div style=\"text-align:center;\">" ;
    workflowHtml = workflowHtml + "<div style=\"DIVText\"><label class=\'LBLstd\'></label>";
	 //workflowHtml = workflowHtml + "<div style=\'height:1.2em; class=\'DIVText\'>";
    //workflowHtml = workflowHtml +"&nbsp;&nbsp;"
    //workflowHtml = workflowHtml + "</div>";
    workflowHtml = workflowHtml+ "<BUTTON id='btnWrkFlwSearch' class='BTNtext' onClick='doSearch2(\"\",\"\",event);getGroupcnt(\""+labelPending+"\",\"\",\"load\",\"\",event);'  onkeydown=\"fireOnclickEvnt(event)\"  onmouseout=\"this.className='BTNtext'\"  onmouseover=\"this.className='BTNtextH'\" onblur=\"this.className='BTNtext'\" onfocus=\"this.className='BTNtextH'\"  href=\'#\'>" + labelSearch + "</BUTTON>&nbsp;&nbsp;"; //Fix for 24570115  //9NT1606_12_3_RETRO_12_1_25562136 changes 
    workflowHtml = workflowHtml+ "<BUTTON id='btnWrkFlwReset' class='BTNtext'onclick=\'fnWrkflwReset()\'  onmouseout=\"this.className='BTNtext'\"  onmouseover=\"this.className='BTNtextH'\" onblur=\"this.className='BTNtext'\" onfocus=\"this.className='BTNtextH'\" onkeydown=\"handleWfQueryKeyDownEvents(event)\"  href=\'#\'>" + labelReset + "</BUTTON>&nbsp;&nbsp;";
    //workflowHtml = workflowHtml+"<input id=\'SEARCHTYPE2\' class = \'BTNfooter\' onClick='doSearch2(\"\",\"\",event)' value=\'Search\' type=\'button\' name=\'btnSearch\'>";
    //workflowHtml = workflowHtml+"<input id=\'btnReset\' class=\'BTNfooter\' value=\'Reset\' type=\'button\' name = \'btnReset\'>";
    workflowHtml = workflowHtml +"</div></fieldset>";
    workflowHtml = workflowHtml +"</div></div>";
    workflowHtml +="<div  class=\"DIVThreeColSectionContainer DIVBigRowContainer\" id=\'searchTxnCntResultDiv\'>";
    workflowHtml += "<div class=\"DIVColumnTriple\"><fieldset class=\"FSTcell\" id=\"containerFldset\" type=\"ME\" view=\"ME\" ><div id=\'WRKFLWDETAILS\' class=\"DIVMultipleBig\" ></div></fieldset></div></div>";
    workflowHtml += "<div  class=\"DIVThreeColSectionContainer DIVMediumRowContainer\" id=\"searchWfGrpResultDiv\">";
    workflowHtml += "<div class=\"DIVColumnTriple\"><fieldset class=\"FSTcell\" id=\"containerFldset\" type=\"ME\" view=\"ME\" ><div   class=\"DIVMultipleBig\"  id=\'TRANSDETAILS\'></div></fieldset></div></div>";
    workflowHtml +="</div>";
    
    
   /* html += "<FIELDSET class='FSTcell'>";
    html += "<legend class=\'invisible\'>" + labelWorkflow + "</legend>";
    html += "<div id=\'DivWorkFlowSum\' class=\'DIVCustSearch\' onkeydown=\'return fnHTLBarKeyEvents(event);\' onmousedown=\'return fnHTLBarKeyEvents(event);\' style='DISPLAY: block;'>";
   // html += "<tr onkeydown='return fnHTLBarKeyEvents(event);' id='WORKFLOWSEARCH' class='DIVWorkflowSearch' onmousedown='return fnHTLBarKeyEvents(event);'></DIV>";
    //html +="<DIV class='DIVText'><LABEL class='LBLstd' for='FUNCTIONID'>Function Id</LABEL> <INPUT id='FUNCTIONID' class='TXTstd' value='%' size='11' title='Function Id' type='text' name='FUNCTIONID'> </DIV>";
    html += "<div class=\'DIVText\'>";
    html += "<label class=\'LBLstd\'  for=\'FUNCTIONID\'>" + labelFunctionId + "</label>";
    html += "<input class=\'TXTstd\' NAME=\'FUNCTIONID\' ID=\'FUNCTIONID\' type='text' size='11' value =\'%\'  title='Function Id' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    html += "</div>";
    html += "<div class=\'DIVText\'>";
    html += "<label class=\'LBLstd\'  for=\'MakerID\'>" + labelMakerID + "</label>";
    html += "<input class=\'TXTstd\' NAME=\'MakerID\' ID=\'MakerID\' type='text' size='11' value =\'%\'   onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    html += "</div>";
    html += "<div class=\'DIVText\'>";
    html +=  "<label class=\'LBLstd\' for=\'XREFID\'>" + labelXRef + "</label>";
    html +=  "<input class=\'TXTstd\' NAME=\'XREFID\' ID=\'XREFID\' type='text' size='11' value =\'%\'   onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label  class=\'LBLstd\' for=\'WFINITDATE\'>" + labelWFSDate + "</label>";
    html +=  "<input class=\'TXTstd\' NAME=\'WFINITDATE\' ID=\'WFINITDATE\' type='text' size='11' value =\'%\'   onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label  class=\'LBLstd\' for=\'TXNSTATUS\'>" + labelTxnStatus + "</label>";
    html +=  "<SELECT id='TXNSTATUS' class='SELstd'><OPTION selected value=''>All</OPTION><OPTION value='IPR'>In Progress</OPTION> <OPTION value='COM'>Completed</OPTION><OPTION value='FAL'>Failed</OPTION><OPTION value='TNK'>Tanked</OPTION></SELECT>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label  class=\'LBLstd\' for=\'STAGESTATUS\'>" + labelStageStatus + "</label>";
    html +=  "<SELECT id='STAGESTATUS' class='SELstd'><OPTION selected value=''>All</OPTION><OPTION value='IPR'>In Progress</OPTION> <OPTION value='WAA'>Waa</OPTION><OPTION value='WMA'>Wma</OPTION><OPTION value='WTS'>Wts</OPTION><OPTION value='COM'>Completed</OPTION><OPTION value='FAL'>Failed</OPTION></SELECT>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label  class=\'LBLstd\' for=\'ASSIGNEDTO\'>" + labelAssignTo + "</label>";
    html +=  "<INPUT id='ASSIGNEDTO' class='TXTstd' value='%' size='11'  type='text' name='ASSIGNEDTO'>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label class=\'LBLstd\'  for=\'LOCKEDBY\'>" + labelLockedBy + "</label>";
    html +=  "<INPUT id='LOCKEDBY' class='TXTstd' value='%' size='11'  type='text' name='LOCKEDBY'>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label class=\'LBLstd\'  for=\'TXNBRANCH\'>" + labelTransactionBranch + "</label>";
    html +=  "<INPUT id='TXNBRANCH' class='TXTstd' value='%' size='11'  type='text' name='TXNBRANCH'>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label  class=\'LBLstd\' for=\'TXNACCOUNT\'>" + labelTransactionAccount + "</label>";
    html +=  "<INPUT id='TXNACCOUNT' class='TXTstd' value='%' size='11'  type='text' name='TXNACCOUNT'>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label class=\'LBLstd\' for=\'TXNACCOUNT\'>" + labelCurrency + "</label>";
    html +=  "<INPUT id='TXNCCY' class='TXTstd' value='%' size='11'  type='text' name='TXNCCY'>";
    html +=  "</div>";
    html +=  "<div class=\'DIVText\'>";
    html +=  "<label class=\'LBLstd\' for=\'TXNAMOUNT\'>" + labelAmount + "</label>";
    html +=  "<INPUT id='TXNAMOUNT' onblur=\"validateInputAmount(\'TXNAMOUNT\', event)\" class='TXTstd' value='%' size='11' type='text' name='TXNAMOUNT'>";
    html +=  "</div>";
    html += "<div class=\'DIVText\'>";
    html +=  "<label class=\'LBLstd\' for=\'TXNSEQNO\'>" + labelTxnSeqno + "</label>";
    html +=  "<INPUT id='TXNSEQNO' class='TXTstd' value='%' size='11'  type='text' name='TXNSEQNO'>";
    html +=  "</div>";
    html +="<DIV class='DIVText'><LABEL style='DISPLAY: none' class='LBLstd' for='condtion'><INPUT id='condtion' value='AND' type='radio' name='rad'>And</LABEL><LABEL style='DISPLAY: none' class='LBLauto' for='condtion'><INPUT id='condtion' value='OR' type='radio' name='rad'>Or</LABEL><LABEL style='FLOAT: none; CLEAR: none' class='LBLauto' for='SEARCHTYPE1'><INPUT id='SEARCHTYPE1' value='Full' type='radio' name='SEARCHTYPE'>Full</LABEL><LABEL style='FLOAT: none; CLEAR: none' class='LBLauto' for='SEARCHTYPE2'><INPUT id='SEARCHTYPE2' value='Quick' CHECKED type='radio' name='SEARCHTYPE'>Quick</LABEL><BUTTON id='search' class='BTNtext' onclick='doSearch2();' type='submit'>Search</BUTTON></DIV>";
    html +="</div>";
    html +="</FIELDSET>";
    html +="<UL id='WFTabs' class='treeview'>";    
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Pending' onclick='fnShowWFTabContent(\"Pending\")'  href='#' >"+labelpending+"("+pending_count+")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Assigned' onclick='fnShowWFTabContent(\"Assigned\")' class='TBitem' href='#'>"+labelassigned+"("+assigned_count+")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Approved'onclick='fnShowWFTabContent(\"Approved\")'  class='TBitem' href='#'>"+labelapproved+"(" +approved_count+ ")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_AuthHistory' onclick='fnShowWFTabContent(\"AuthHistory\")'  class='TBitem' href='#'>"+labelauthhistory+"(" +authhistory_count+ ")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Failed'onclick='fnShowWFTabContent(\"Failed\")'  class='TBitem' href='#'>"+labelfailed+"(" +failed_count+ ")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Unassigned'onclick='fnShowWFTabContent(\"Unassigned\")'  class='TBitem' href='#'>"+labelunassigned+"(" +unassigned_count+ ")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Completed' onclick='fnShowWFTabContent(\"Completed\")' class='TBitem' href='#'>"+labelcompleted+"(" +completed_count+ ")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Reversed' onclick='fnShowWFTabContent(\"Reversed\")' class='TBitem' href='#'>"+labelreversed+"(" +reversed_count+ ")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Tanked' onclick='fnShowWFTabContent(\"Tanked\")' class='TBitem' href='#'>"+labeltanked+"(" +tanked_count+ ")</a></li>";
    html +="<li style='BACKGROUND-IMAGE: url(Images/ExtFlexblue/list.gif); BACKGROUND-REPEAT: no-repeat'><a id='WFTab_Untanked' onclick='fnShowWFTabContent(\"Untanked\")' class='TBitem' href='#'>"+labeluntanked+"(" +untanked_count+ ")</a></li>";
    //html+="<li visibility='hidden'><a visibility='hidden' id='WFTab_SearchTasks' onclick='fnShowSearchTab(\"SearchTasks\")' class='TBitem current4' href='#' title='(selected)'>"+lablesearchtasks+"</a></li>";
    html+="</ul>";    
   
    //html+="<DIV id ='WFTabContent'></DIV>";*/
    return workflowHtml;
}

function validateInputDateWrkflw(idDate, e){
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idDate);
    else curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idDate);
    var inpDate = curDataBoundElem.value;
    if (inpDate > mainWin.AppDate){
    alert(mainWin.getItemDesc("LBL_DATE_FAIL_ERR_DESC"));
    }else{
    validateInputDate(idDate, event);   
    }
}


function fnWrkflwReset(){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    document.getElementById("XREFID").value = "%";
    document.getElementById("ACCOUNT").value = "%";
    document.getElementById("BRANCH").value = "%";
    document.getElementById("FUNCTIONID").value = "%";
    document.getElementById("TXNSEQNO").value = "%";
    document.getElementById("BLK_WORKFLOW__WFINITDATE").value = mainWin.AppDate;
    document.getElementById("BLK_WORKFLOW__WFTODATE").value = mainWin.AppDate;
	//9NT1606_12_3_RETRO_12_1_25562136  starts
	 fireHTMLEvent(document.getElementById("BLK_WORKFLOW__WFINITDATE"), "onpropertychange");
     fireHTMLEvent(document.getElementById("BLK_WORKFLOW__WFTODATE"), "onpropertychange");
   //9NT1606_12_3_RETRO_12_1_25562136  ends
   /* if(document.getElementById('DIVWfcaptionSR1')){
      document.getElementById('DIVWfcaptionSR1').innerHTML = "";
    }
    if(document.getElementById('DIVWfcaptionSR2')){
      document.getElementById('DIVWfcaptionSR2').innerHTML = "";
    }*/
    var tdArr = document.getElementById('ContentMainWorkflowSearch').getElementsByTagName('TD');
   for(var tdCnt = 0; tdCnt < tdArr.length ; tdCnt++){
     tdArr[tdCnt].innerHTML = "&nbsp;";
      tdArr[tdCnt].removeAttribute("onkeydown");
     
   }
   clearDisplayedTabs();
    /*var tabArr = document.getElementById("hTab_DBoardWorkFlow").getElementsByTagName("A");
    var contentDiv = null;
    for(var tabCnt = 1 ; tabCnt < tabArr.length;){
      contentDiv =  document.getElementById("Content"+tabArr[tabCnt].id);
      contentDiv.parentNode.removeChild(contentDiv);
      tabArr[tabCnt].parentNode.removeChild(tabArr[tabCnt])
    }
    curPage = 1;
    */
}


function getWFTabs(){
    var tabobj = document.getElementById('WFTabs');
    var tabobjlinks = tabobj.getElementsByTagName("A");
    return tabobjlinks;
}
function getDBTabs(){
    var tabobj = document.getElementById('tablist');
    var tabobjlinks = tabobj.getElementsByTagName("A");
    return tabobjlinks;
}
function highlightWFTab(aobject,tabobjlinks){
for (i = 0; i < tabobjlinks.length; i++) {
        tabobjlinks[i].parentNode.id = "";
        addEvent(tabobjlinks[i], "class", "TBitem");
        tabobjlinks[i].removeAttribute("title");
        tabobjlinks[i].parentNode.setAttribute("id","");
    }
    addEvent(document.getElementById("WFTab_"+aobject), "class","TBitem current4");
    document.getElementById("WFTab_"+aobject).setAttribute("title","selected");
    document.getElementById("WFTab_"+aobject).parentNode.setAttribute("id","currentWFTab");
}

function highlightDBTab(object,tabobjlinks){
for (i = 0; i < tabobjlinks.length; i++) {
        tabobjlinks[i].parentNode.id = "";
        addEvent(tabobjlinks[i], "class", "Htaball");
        tabobjlinks[i].setAttribute("objClicked","false");
    }
    var aobject = document.getElementById(object);
    aobject.parentNode.id = "current";
    aobject.setAttribute("objClicked","true");
    aobject.setAttribute("objvisited","true");
    addEvent(aobject, "onmouseover", "setTabClass(this,'onmouseover')");
    addEvent(aobject, "onmouseout", "setTabClass(this,'onmouseout')");
    addEvent(aobject, "onblur", "setTabClass(this,'onblur')");
    addEvent(aobject, "class","Htabsel");
    
}
function ShowDBTabs(tabname){
    var tablinks = getDBTabs();
    var prevtabid = getPrevDBTab(tablinks);
    //document.getElementById("DIVM_"+prevtabid).style.display="none";
    highlightDBTab(tabname,tablinks);
    document.getElementById('DIVTabContent').innerHTML="";
    if (tabname=="WorkFlow"){
        fnShowWorkFlow()
        return;
    }
        
}

function getPrevDBTab(tabobjlinks){
     var prevtab;
    for (i = 0; i < tabobjlinks.length; i++) {
     if (tabobjlinks[i].getAttribute("objClicked") == "true") {
         prevtab=tabobjlinks[i].id;
     }
    }
    return prevtab;
}

function showWFTabResult(atabid){
     try {
        searchOption = '';
        atabid = atabid.toUpperCase();
       
        switch (atabid) {
            case "PENDING":
            {
                getWFTabSearchResult('IPR~!IPR~', 'specific');
                break;
            }
            case "ASSIGNED":
            {
                getWFTabSearchResult('IPR~!WTS~', 'specific');
                break;
            }
            case "APPROVED":
            {
                getWFTabSearchResult('IPR~!APP~', 'specific');
                break;
            }
            case "AUTHHISTORY":
            {
                getWFTabSearchResult('IPR~!AUT~', 'specific');
                break;
            }
            case "UNASSIGNED":
            {
                getWFTabSearchResult('IPR~!WAA~WMA~', 'specific');
                break;
            }
            case "COMPLETED":
            {
                document.getElementById('DIVTabContent').innerHTML = showSearch('completeSearch');
                document.getElementById('DIVTabContent').style.display = '';
                break;
            }
            case "FAILED":
            {
                getWFTabSearchResult('FAL~!FAL~', 'specific');
                break;
            }
            case "REVERSED":
            {
                document.getElementById('DIVTabContent').innerHTML = showSearch('reverseSearch'); //Kirti 14-Jan                                                   
                document.getElementById('DIVTabContent').style.display = '' ///Kirti 14-Jan
                break;
            }
            case "SENDTOHOST":
            {
                getWFTabSearchResult('IPR~!STH~', 'specific');
                break;
            }
            case "TANKED":
            {
                document.getElementById('DIVTabContent').innerHTML = showSearch('tankSearch'); //Kirti 14-Jan                                                   
                document.getElementById('DIVTabContent').style.display = '' ///Kirti 14-Jan
                break;
            }
            case "SENTFORREVERSAL":
            {
                getWFTabSearchResult('IPR~!WTS~', 'sendingForAuth');
                break;
            }
            case "UNTANKED":
            {
                document.getElementById('DIVTabContent').innerHTML = showSearch('untankSearch'); //Kirti 14-Jan                                                   
                document.getElementById('DIVTabContent').style.display = '' ///Kirti 14-Jan
                break;
            }
              //12.1_MULTI_AUTH STARTS
                case "MULTIAUTH":
            {
               getWFTabSearchResult('IPR~!MTS~', 'specific');
                break;
            }            
                 case "DISCARDED":
            {
               getWFTabSearchResult('DIS~!DIS~', 'specific');
                break;
            }  
            //12.1_MULTI_AUTH ENDS
        }
        setTableCaption(summaryType);
    } catch(e) {}
}
function getWFTabSearchResult(qryStr, qryType,tabid, myFlag) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    objXMLHTTP = createHTTPActiveXObject();
    var serverURL = "BranchServlet";
    var queryStr = 'msgType=TASKLIST&queryType=' + qryType + '&queryString=' + qryStr + '&cntFnid=Y';
    if (myFlag == 'SEARCH_TAB') {
        queryStr = 'msgType=TASKLIST&queryType=' + qryType + '&queryString=' + qryStr + '&cntFnid=Y';
    }
    var reqmethod = 'POST';
    var respXML = sendRequest(reqmethod, serverURL, queryStr);
    if (respXML == timeout_responseXML) {
        openTimeOutPage();
        return;
    }
    if (respXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
    } else {
      
        loadWFTabTasklist(respXML, document.getElementById('DIVTabContent'));
        document.getElementById('vTabDB_TELLER').style.display = "";
       /* if (myFlag == "SEARCH_TAB") {            
            document.getElementById("FIRSTASKDIV").style.height = document.getElementById("dashboard").offsetHeight - document.getElementById("taskbar").offsetHeight - document.getElementById("DIVTaskArea").offsetHeight + "px";
        } else {
           // document.getElementById("FIRSTASKDIV").style.height = document.getElementById("DIVTaskArea").offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight - document.getElementById("WFTabs").offsetHeight + "px";
             //document.getElementById("FIRSTASKDIV").style.height = document.getElementById("dashboard").offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight - document.getElementById("taskbar").offsetHeight- document.getElementById("DIVM_WorkFlow").offsetHeight + "px";
        }*/
    }
}
function getResultTable(qryStr,queue,qryType,funarr,myFlag){
     objXMLHTTP = createHTTPActiveXObject();
    var serverURL = "BranchServlet";
    WrkResp = new Array();
    WokflowArr = new Array();
    pos = 0;
	curPage = 1;//Fix for 16958871
    document.getElementById('btnprev').disabled = true;
    document.getElementById('btnnext').disabled = true;
    for(var i =0;i<funarr.length-1;i++){
    var queryStr = 'msgType=TASKLIST&queryType=' + qryType + '&queryString=' + qryStr + '&grFuncid=' + funarr[i] + '&trnqueue='+queue+'&result=Y';
    if (myFlag == 'SEARCH_TAB') {
        queryStr = 'msgType=TASKLIST&queryType=' + qryType + '&queryString=&' + qryStr + '&grFuncid=' + funarr[i] + '&trnqueue='+queue+'&result=Y';
    }
    var reqmethod = 'POST';
    var respXML = sendRequest(reqmethod, serverURL, queryStr);
    if (respXML == timeout_responseXML) {
        openTimeOutPage();
        return;
    }
    if (respXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
    } else {
                
            //loadResultTable(respXML,funcid);
            
			//fcjRespWrkflow= loadXMLDoc(respXML);
      
      WrkResp[i] = respXML;
			
      WokflowArr[i]='SMSTXNDB';
			
			
        }
    }
    
    if(document.getElementById('hTab_DBoardWorkFlow').getElementsByTagName("A").length > 1){
       curWfTab++;//Fix for 16958871
    }
     var anchorElem = null;
    if(!document.getElementById(transactionLabel)){
    var liElem =  document.createElement("LI");
    anchorElem = document.createElement("a");
    anchorElem.id = "TransactionTab"+curWfTab;//Fix for 16958871
    addEvent(anchorElem, "onclick", "fnToggleDisplay(this.id)");
	addEvent(anchorElem, "onkeydown", "return handleTabKeys(this,event)");
	anchorElem.tabIndex = '0';
    
    var spanElem = document.createElement("span");
    spanElem.className  = "DBoardHeadDivSpanSel";
    spanElem.id =  transactionLabel;
    //Added close button image
    //1202 nls
    spanElem.innerHTML = transactionLabel+  "<span class=\"DBoardHeadClose\" onclick=\"closeCurrentTab(this.parentNode.parentNode,event)\" ><span class=\"tabClosedGIF\"></span></span>";
    anchorElem.appendChild(spanElem);
     liElem.appendChild(anchorElem);
    //document.getElementById('WorkflowSearch').getElementsByTagName("SPAN")[0].className = 'DBoardHeadDivSpanDeSel';
    document.getElementById('hTab_DBoardWorkFlow').getElementsByTagName("UL")[0].appendChild(liElem);
   
    

    
    }
    else{
    anchorElem = document.getElementById(transactionLabel).parentNode;
    var contentDiv =  document.getElementById("ContentMain"+anchorElem.id);//Fix for 16958871
    contentDiv.parentNode.removeChild(contentDiv) ;
    anchorElem.id = "TransactionTab" + curWfTab;//Fix for 16958871
     document.getElementById(transactionLabel).className = "DBoardHeadDivSpanSel";
    //fnToggleDisplay("TransactionTab"+curPage);
    }
	anchorElem.focus();
    var dboardDiv = document.createElement("DIV");
    dboardDiv.id = "ContentMainTransactionTab" + curWfTab;//Fix for 16958871
    dboardDiv.className  = "ContentSearch";
    dboardDiv.style.height =document.getElementById('vTabDB_DASHBOARD').offsetHeight - (document.getElementById('hTab_DBoardWorkFlow').offsetHeight +4) + "px";
    dboardDiv.style.overflow ="scroll";//fix for bug:19177615   
    dboardDiv.innerHTML = "<a id=\"href" + anchorElem.id + "\" ></a>";
    document.getElementById('hTabCN_WORKFLOW').appendChild(dboardDiv);
    document.getElementById('WorkflowSearch').getElementsByTagName("SPAN")[0].className = 'DBoardHeadDivSpanDeSel';
    document.getElementById('ContentMainWorkflowSearch').style.display = 'none';//Fix for 16958871
    fnShowDboardFuncs(WokflowArr, "ContentTransactionTab"+curWfTab);//Fix for 16958871
    
    //document.getElementById(transactionLabel).innerHTML = transactionLabel;
    //document.getElementById(transactionLabel).className = 'DBoardHeadDivSpanSel';
   // document.getElementById('detailsTabDBoardWorkFlow').className = 'DBoardHeadDivSpanDeSel';
  // fnShowDboardFuncs(WokflowArr);
   //setDataWorkflow(funarr,WrkResp);
   /*for(var i =0;i<funarr.length-1;i++){
      g_DetPkArray = new Array();
    //var RecnodeList = selectNodes(fcjRespWrkflow, "//REC");
	if(mainWin.WrkResp[i] !=null){
    var RecnodeList = selectNodes(mainWin.WrkResp[i], "//TASKLIST/TLREC");
    for (var i = 0; i < RecnodeList.length; i++) {
        g_DetPkArray[i] = getNodeText(selectSingleNode(RecnodeList[i], "WFName"));
        //g_DetPkArray[i] = RecnodeList[i].getAttribute("RECID"); //array build 
        //var l_fv = getNodeText(RecnodeList[i].childNodes[0]);
        var l_fv = builStringWorkflow();
        var fvArray = l_fv.split("~");
        for (var j = 0; j < fvArray.length - 1; j++) {
            var value = fvArray[j];
            var currObject = document.getElementById("Innertable_" + functionId).tBodies[0].rows[i].cells[j].children[1];
            var tagName = currObject.tagName;
            if (currObject.getAttribute("type") != null) 
                var type = currObject.getAttribute("type");
            else 
                var type = currObject.type;
        if (tagName == 'INPUT'){
           switch (type.toUpperCase()) {
            case 'TEXT': {
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                        break;
                    }
                }
                //Added to format the number in number field
                if (getOuterHTML(currObject).indexOf("fnValidateRange") != -1 && getOuterHTML(currObject).indexOf("acceptInputAmount") == -1) {
                    if (value != "") {
                        currObject.value = Number(value);
                        break;
                    }
                }
                currObject.value = value;
                break;
            }
            case 'HIDDEN':{
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                    } else {
                        currObject.value = value;
                        fireHTMLEvent(currObject, "onpropertychange");
                    }
                }
            else { 
                if (getOuterHTML(currObject).indexOf("displayAmount") != -1) {
                currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
                fireHTMLEvent(currObject, "onpropertychange");
                validateResponseAmount(currObject.name, currObject.getAttribute("related_ccy"), getNextSibling(getNextSibling(currObject)));
                break;
            } else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
                currObject.value = value.replace(decimalSymbol, ".");
                fireHTMLEvent(currObject, "onpropertychange");
                break;
              } 
              currObject.value = value;
              fireHTMLEvent(currObject, "onpropertychange");
              break;
            }     
        
          }
          default:
            currObject.value = value;
        } 
        }
        else
            currObject.innerText = value;
    }
   } 
   }
  }  */
}
function setDataWorkflow(funcArray, respArray){
  for(var i =0;i<funcArray.length-1;i++){
    document.getElementById("heading").innerHTML = i;
     //document.getElementsByTagName("h2")[i].innerHTML = i;
   //var count = document.getElementsByTagName("table")
  }
}
function builStringWorkflow(){
    var strWorkflow = "";
    var funcNodes = selectNodes(mainWin.WrkResp[i], "//TASKLIST/TLREC");
        var  fnid = getNodeText(selectSingleNode(funcNodes[0], "WFName"));
        var tkdisc = getNodeText(selectSingleNode(funcNodes[0], "TKDisc"));
        document.getElementById("heading").innerHTML = "";
		document.getElementById("heading").innerHTML = tkdisc;
        for(count = 0;count < funcNodes.length;count++){
            var xref = getNodeText(selectSingleNode(funcNodes[count], "XREF")); 
			var brn = getNodeText(selectSingleNode(funcNodes[count], "Brn"));
			var acc = getNodeText(selectSingleNode(funcNodes[count], "Account"));
			var ccy = getNodeText(selectSingleNode(funcNodes[count], "Ccy"));
			var amount = getNodeText(selectSingleNode(funcNodes[count], "Amount"));
			var mkrid = getNodeText(selectSingleNode(funcNodes[count], "MakerID"));    
            var stagename = getNodeText(selectSingleNode(funcNodes[count], "StageName"));
            var txnstatus = getNodeText(selectSingleNode(funcNodes[count], "TxnStatus"));
            var stagestatus = getNodeText(selectSingleNode(funcNodes[count], "StageStatus"));
            var txnseqno = getNodeText(selectSingleNode(funcNodes[count], "TxnSeqNo"));
            var reversal = getNodeText(selectSingleNode(funcNodes[count], "Reversal"));
            var lockedby = getNodeText(selectSingleNode(funcNodes[count], "LockedBy"));
            var assignedto = getNodeText(selectSingleNode(funcNodes[count], "AssignedTo"));
           
            
            
            
            var postingdate = getNodeText(selectSingleNode(funcNodes[count], "PostingDate"));
            var wfstarttime = getNodeText(selectSingleNode(funcNodes[count], "WFStartTime"));
             
            strWorkflow = xref + "~" +brn+ "~" +acc+ "~" +ccy+ "~" +amount+ "~" +mkrid+ "~"+ stagename+ "~" +txnstatus+ "~" +stagestatus+ "~"  +
            lockedby+ "~" +assignedto+ "~" +txnseqno+ "~"+postingdate+ "~" +reversal+ "~"  +wfstarttime ;
        }
        return strWorkflow;
}


function buildTh(params){
     var strHtml="";     
     for(count=0;count< params.length;count++){
        strHtml += '<th scope=\'col\'>'+params[count]+'</th>';    
     }     
    return strHtml;
}
function loadResultTable(respXML,funcid){
     var resulthtml= "";  
     var tablehtml="";
    var xmlDoc = loadXMLDoc(respXML);    
    var params = new Array();
     params[0]=mainWin.getItemDesc("LBL_REF");  
     params[1]=mainWin.getItemDesc("LBL_BRANCH");
     params[2]=mainWin.getItemDesc("LBL_TXNACCOUNT");
     params[3]=mainWin.getItemDesc("LBL_TXNCCYDET");
     params[4]=mainWin.getItemDesc("LBL_AMOUNT");
     params[5]=mainWin.getItemDesc("LBL_MAKER");
     params[6]=mainWin.getItemDesc("LBL_ASSIGNED_TO");
     params[7]=mainWin.getItemDesc("LBL_LOCKED_BY");
     params[8]=mainWin.getItemDesc("LBL_STAGE_STATUS");
     params[9]=mainWin.getItemDesc("LBL_POSTING_DATE");
     params[10]=mainWin.getItemDesc("LBL_ST_TIME");
    var fcjResponseDOM = loadXMLDoc(respXML); 
    if (getXMLString(loadXMLFile(xmlDoc)) == "" || getXMLString(loadXMLFile(xmlDoc)).indexOf("404 Not Found") != -1) {
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR"));
    } else {
        var funcNodes = selectNodes(fcjResponseDOM, "//TASKLIST/TLREC");
        var  fnid = getNodeText(selectSingleNode(funcNodes[0], "WFName"));
        var tkdisc = getNodeText(selectSingleNode(funcNodes[0], "TKDisc"));
        tablehtml += '<div class=\'widgetonetblbox\' id= "resulttable_'+fnid+'">';        
        tablehtml += '<table  class=\'widgetonetbl colw\'  id="'+fnid+'"summary = "'+tkdisc+'"width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><tbody><tr>';        
        tablehtml += buildTh(params);        
        tablehtml += '</tr>';
        
        for(count = 0;count < funcNodes.length;count++){
            var xref = getNodeText(selectSingleNode(funcNodes[count], "XREF")); 
            var stagename = getNodeText(selectSingleNode(funcNodes[count], "StageName"));
            var txnstatus = getNodeText(selectSingleNode(funcNodes[count], "TxnStatus"));
            var stagestatus = getNodeText(selectSingleNode(funcNodes[count], "StageStatus"));
            var txnseqno = getNodeText(selectSingleNode(funcNodes[count], "TxnSeqNo"));
            var reversal = getNodeText(selectSingleNode(funcNodes[count], "Reversal"));
            var lockedby = getNodeText(selectSingleNode(funcNodes[count], "LockedBy"));
            var assignedto = getNodeText(selectSingleNode(funcNodes[count], "AssignedTo"));
            var brn = getNodeText(selectSingleNode(funcNodes[count], "Brn"));
            var acc = getNodeText(selectSingleNode(funcNodes[count], "Account"));
            var ccy = getNodeText(selectSingleNode(funcNodes[count], "Ccy"));
            var amount = getNodeText(selectSingleNode(funcNodes[count], "Amount"));
            var postingdate = getNodeText(selectSingleNode(funcNodes[count], "PostingDate"));
            var wfstarttime = getNodeText(selectSingleNode(funcNodes[count], "WFStartTime"));
            var mkrid = getNodeText(selectSingleNode(funcNodes[count], "MakerID"));            
            tablehtml += '<tr><td scope=\'row\'>';            
            if(txnstatus == 'COM'||txnstatus == 'TNK'||txnstatus == 'RTK'||txnstatus == 'RUT'||txnstatus == 'UTK'){
                tablehtml += "<a class='Anorm' href=\"javascript:loadScreenForRev('" + xref + "','" + brn + "','" + fnid + "')\">" + xref + "</a></td>";
            }
            else if (txnstatus == 'REV' || txnstatus == 'FAL' || txnstatus == 'AUTAPP' || txnstatus == 'AUTREJ') {
                tablehtml += "<a class='Anorm' href=\"javascript:loadScreenForView('" + xref + "','" + brn + "','" + fnid + "')\">" + xref + "</a></td>";
            }
            //12.1_multi_auth starts
            else if (txnstatus == 'IPR' && stagestatus == 'MTS') {
                tablehtml += "<a class='Anorm' href=\"javascript:loadScreenForMultiAuth('" + xref + "','" + brn + "','" + fnid + "')\">" + xref + "</a></td>";
            }
            else if (txnstatus == 'DIS' && stagestatus == 'DIS') {
                    tablehtml += "<a class='Anorm' href=\"javascript:loadScreenForView('" + xref + "','" + brn + "','" + fnid + "')\">" + xref + "</a></td>";
            }
            //12.1_multi_auth ends
            else{
              tablehtml += "<a class=\'Anorm\' href=\"javascript:loadScreen('"+xref+"','"+brn+"','"+fnid+"','"+txnstatus+"','"+stagestatus+"')\">"+xref+"</a></td>";  
            }            
            tablehtml += '<td scope=\'row\'><span>'+brn+'</span></td>';
            tablehtml += '<td scope=\'row\'><span>'+acc+'</span></td>';
            tablehtml += '<td scope=\'row\'><span>'+ccy+'</span></td>';
            tablehtml += '<td scope=\'row\'><span>'+amount+'</span></td>';
            tablehtml += '<td scope=\'row\'><span>'+mkrid+'</span></td>';
            tablehtml += '<td scope=\'row\'><span>'+assignedto+'</span></td>';
            tablehtml += '<td scope=\'row\'><span>'+lockedby+'</span></td>';           
            if(stagestatus=='IPR'){
               tablehtml += '<td scope=\'row\'><span>'+ mainWin.getItemDesc("LBL_IN_PROGRESS")+'</span></td>';
            }else if(stagestatus=='COM'){
               tablehtml += '<td scope=\'row\'><span>'+ mainWin.getItemDesc("LBL_COMPLETED")+'</span></td>'; 
            }else if(stagestatus=='WMA'){
               tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_WAITING_MANUAL_ASS")+'</span></td>'; 
           // }else if(stagestatus=='DIS'){
             //  tablehtml += '<td scope=\'row\'><span>'+ mainWin.getItemDesc("LBL_DELETED")+'</span></td>'; 
            }else if(stagestatus=='STH'){
               tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_SEND_TO_HOST")+'</span></td>'; 
            }else if(stagestatus=='WTS' && reversal=='N'){
              tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_IN_PROGRESS")+'</span></td>';
            }else if(stagestatus=='WTS' && reversal=='Y'){
              tablehtml += '<td scope=\'row\'><span>'+ mainWin.getItemDesc("LBL_PENDINGREVAUTH")+'</span></td>';
            }else if(stagestatus=='AUTAPP'){
              tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_APPROVED")+'</span></td>';
            }else if(stagestatus=='AUTREJ'){
              tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_REJECTED")+'</span></td>';
            }else if(stagestatus !='AUTREJ' && txnstatus=='FAL' ){
              tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_FAILED")+'</span></td>';
            }else if(txnstatus=='REV'){
              tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_REVERSED")+'</span></td>';
            }
             //12.1_multi_auth starts
            else if(txnstatus=='MTS'){
              tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_MULTIAUTH")+'</span></td>';
            }
             else if(txnstatus=='DIS'){
              tablehtml += '<td scope=\'row\'><span>'+mainWin.getItemDesc("LBL_DISCARDED")+'</span></td>';
            }
            //12.1_multi_auth ends           
            else{
              tablehtml += '<td scope=\'row\'><span>N.A</span></td>'; 
            }
            tablehtml += '<td scope=\'row\'><span>'+postingdate+'</span></td>';
            tablehtml += '<td scope=\'row\'><span>'+wfstarttime+'</span></td>';
        }
        tablehtml +='</tbody></table></div>';       
    }
         resulthtml="<div class = 'csc' id='csc'>";
         resulthtml+="<span class='tr'></span>";
         resulthtml+=document.getElementById("sectionheading_"+funcid).outerHTML;
         resulthtml+=tablehtml;
         resulthtml+="<span class='bl'></span>";
         resulthtml+="<span class='br'></span>";
         resulthtml+="</div>"
         document.getElementById('widgetcontainer_'+funcid).innerHTML=resulthtml;
    
}
function loadWFTabTasklist_old(respXML, target) { //reduntant---not using now..
    var xslName = "Templates/XSL/TaskTbls.xsl";
    
    var xslDoc = loadXSLFile(xslName);
    var xmlDoc = loadXMLDoc(respXML);
    var params = new Array();
    params["imgPath"]           = parent.theme_imagesPath;
    params["search_results"]    = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    params["start_time"]        = mainWin.getItemDesc("LBL_ST_TIME");
    params["posting_date"]      = mainWin.getItemDesc("LBL_POSTING_DATE");
    params["stage_status"]      = mainWin.getItemDesc("LBL_STAGE_STATUS");
    params["locked_by"]         = mainWin.getItemDesc("LBL_LOCKED_BY");
    params["assigned_to"]       = mainWin.getItemDesc("LBL_ASSIGNED_TO");
    params["maker"]             = mainWin.getItemDesc("LBL_MAKER");
    params["amount"]            = mainWin.getItemDesc("LBL_AMOUNT");
    params["account"]           = mainWin.getItemDesc("LBL_TXNACCOUNT");
    params["ref"]               = mainWin.getItemDesc("LBL_REF");
    params["branch"]            = mainWin.getItemDesc("LBL_BRANCH");
    params["in_progress"]       = mainWin.getItemDesc("LBL_IN_PROGRESS");
    params["waiting_manual_ass"] = mainWin.getItemDesc("LBL_WAITING_MANUAL_ASS");
    params["completed"]         = mainWin.getItemDesc("LBL_COMPLETED");
    params["deleted"]           = mainWin.getItemDesc("LBL_DELETED");
    params["send_to_host"]      = mainWin.getItemDesc("LBL_SEND_TO_HOST");
    params["reversed"]          = mainWin.getItemDesc("LBL_REVERSED");
    params["failed"]            = mainWin.getItemDesc("LBL_FAILED");
    params["approved"]          = mainWin.getItemDesc("LBL_APPROVED");
    params["rejected"]          = mainWin.getItemDesc("LBL_REJECTED");
    params["makerId_SummaryAudit"] = mainWin.getItemDesc("LBL_MAKERID");
    params["txn_seq_no"]      = mainWin.getItemDesc("LBL_TXNSQNO");     
    //params["pending_for_auth"]      = mainWin.getItemDesc("LBL_PENDINGFORAUTH");
    params["pending_rev_auth"]      = mainWin.getItemDesc("LBL_PENDINGREVAUTH"); 
    params["ccy"]      = mainWin.getItemDesc("LBL_TXNCCYDET");   
    params["brn"]      = mainWin.getItemDesc("LBL_TXNBRNDET");     
    params["multiauth"]          = mainWin.getItemDesc("LBL_MULTIAUTH");//12.1_multi_auth 
    params["discarded"]          = mainWin.getItemDesc("LBL_DISCARDED");//12.1_multi_auth 
   // target.innerHTML =''; //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_28 //-- workflow tab change
    if (getXMLString(loadXMLFile(xmlDoc)) == "" || getXMLString(loadXMLFile(xmlDoc)).indexOf("404 Not Found") != -1) {
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR"));
    } else {
        var html = transform(xmlDoc, xslDoc, params);
    }
    if (searchOption == 'SEARCH_TAB') {
        if (document.getElementById("FIRSTASKDIV") != null) {
            //document.getElementById("FIRSTASKDIV").innerHTML = "";
           // document.getElementById('vTabDB_TELLER').innerHTML = "";
            //document.getElementById('vTabDB_TELLER').removeChild(document.getElementById("FIRSTASKDIV"));
            //target = document.getElementById('vTabDB_TELLER').parentElement;
            target = document.getElementById('searchContent');
            //document.getElementById('vTabDB_TELLER').parentElement.removeChild(document.getElementById("vTabDB_TELLER"));
        }
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes                        
               //target = document.getElementById('vTabDB_TELLER').parentElement;
                 target = document.getElementById('searchContent');
               /*if(document.getElementById('TASKLIST_CAP1'))
                  document.getElementById('vTabDB_TELLER').parentElement.removeChild(document.getElementById("TASKLIST_CAP1")); */
               //document.getElementById('vTabDB_TELLER').parentElement.removeChild(document.getElementById("vTabDB_TELLER"));                              
               //target.insertAdjacentHTML("beforeEnd", html);           
               target.innerHTML= html;
            
        } else {
            //target.appendChild(html);
            target.innerHTML= html;
        }
    } else {
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes
            //target.insertAdjacentHTML("beforeEnd", html);
			
            target.innerHTML=html;
        } else {
            //target.appendChild(html);
          
            target.innerHTML=html;
        }
    }
    //document.getElementById("vTabDB_TELLER").style.height = '100%';
    //document.getElementById("FIRSTASKDIV").style.height = '100%';
    var strhtml = target.innerHTML;
    strhtml = replaceAll(strhtml, '&lt;', '<', strhtml);
    strhtml = replaceAll(strhtml, '&gt;', '>', strhtml);
    strhtml = strhtml.replace('\n', '');
    target.innerHTML = strhtml;
    //document.getElementById("vTabDB_TELLER").height = document.getElementById("dashboard").offsetHeight - document.getElementById("TASKLIST_CAP1").offsetHeight + "px";
    //document.getElementById("DIVTabContent").style.height = document.getElementById("dashboard").offsetHeight -document.getElementById("SYS_TBL_TABS").offsetHeight - document.getElementById("DIVM_WorkFlow").offsetHeight+ "px" ;
	  
          
          if (document.getElementById('searchtask'))
          {
	  document.getElementById("dashboardContainer").style.height= document.getElementById("dashboard").offsetHeight-document.getElementById("searchtask").offsetHeight + "px";
	  }
          else if (document.getElementById('mainsearchtask'))
          {
	  document.getElementById("dashboardContainer").style.height= document.getElementById("dashboard").offsetHeight-document.getElementById("mainsearchtask").offsetHeight-document.getElementById("searchbtndiv").offsetHeight + "px";
	  }
	  else{
            document.getElementById("dashboardContainer").style.height= document.getElementById("dashboard").offsetHeight-document.getElementById("SYS_TBL_TABS").offsetHeight+ "px";
                }
    /*if (document.getElementById("ID_TASKLIST").getElementsByTagName("A")[0]) {
        document.getElementById("ID_TASKLIST").getElementsByTagName("A")[0].focus();
    }*/
}
function loadWFTabTasklist(respXML, target) {    
    
    //document.getElementById("vTabDB_TELLER").height = document.getElementById("dashboard").offsetHeight - document.getElementById("TASKLIST_CAP1").offsetHeight + "px";
    //document.getElementById("DIVTabContent").style.height = document.getElementById("dashboard").offsetHeight -document.getElementById("SYS_TBL_TABS").offsetHeight - document.getElementById("DIVM_WorkFlow").offsetHeight+ "px" ;
	  
          
        /*  if (document.getElementById('searchtask'))
          {
	  document.getElementById("dashboardContainer").style.height= document.getElementById("dashboard").offsetHeight-document.getElementById("searchtask").offsetHeight + "px";
	  }
          else if (document.getElementById('mainsearchtask'))
          {
	  document.getElementById("dashboardContainer").style.height= document.getElementById("dashboard").offsetHeight-document.getElementById("mainsearchtask").offsetHeight-document.getElementById("searchbtndiv").offsetHeight + "px";
	  }
	  else{
            document.getElementById("dashboardContainer").style.height= document.getElementById("dashboard").offsetHeight-document.getElementById("SYS_TBL_TABS").offsetHeight + "px";
                }*/
   
}
function getPrevWFTab(tabobjlinks){
    var prevtab;
    for (i = 0; i < tabobjlinks.length; i++) {
     if (tabobjlinks[i].getAttribute("title") == "(selected)") {
         prevtab=tabobjlinks[i].id;
     }
    }
    return prevtab;
}


function doSearch1() {
    if (document.getElementById('SEARCHTYPE1').checked == true) {
        var qryStr = buildQueryString(document.getElementById('srcDet'));
        getSearchResult(qryStr, '', 'SUMMARY_TAB');
    } else {
        var qryStr = buildQueryString(document.getElementById('srcDet'));
        getSearchResult(qryStr, 'Search', 'SUMMARY_TAB');
    }
}
function getActionLinks(){
    var actionobj = document.getElementById('searchTxnCntResultDiv');
    var actionobjlinks = actionobj.getElementsByTagName("A");
    return actionobjlinks;
}

function highlightActionrec(actionobj,tabobjlinks){
for (i = 0; i < tabobjlinks.length; i++) {
 //12.1 Dashboard changes  -start
        if(tabobjlinks[i].className == 'AstdDisabled'){
        continue;
        }
         //12.1 Dashboard changes  -end
        addEvent(tabobjlinks[i], "class", "Astd");         
    }
    if (actionobj.id && actionobj.id != ("DBoardWorkFlow")) //HTML5 Changes 3/OCT/2016
    addEvent(actionobj, "class","Astdselected");    
}
function getGroupcnt(queue,qryStr,myflag,currpage,evnt){    
    
	/* Fix for Bug 16840737 - start */
    var labelPending = mainWin.getItemDesc("LBL_PENDING");
    var labelAssigned = mainWin.getItemDesc("LBL_ASSIGNED");
    var labelApproved = mainWin.getItemDesc("LBL_APPROVED");
    var labelAuthHistory = mainWin.getItemDesc("LBL_AUTHHISTORY");
    var labelUnassigned = mainWin.getItemDesc("LBL_UNASSIGNED");
    var labelCompleted = mainWin.getItemDesc("LBL_COMPLETED");
    var labelFailed = mainWin.getItemDesc("LBL_FAILED");
    var labelReversed = mainWin.getItemDesc("LBL_REVERSED");
    var labelSendForReversal= mainWin.getItemDesc("LBL_SENDFORREVERSAL");
    var labelTanked = mainWin.getItemDesc("LBL_TANKED");
    var labelSentForReversal = mainWin.getItemDesc("LBL_SENTFORREVERSAL");
    var labelUntanked = mainWin.getItemDesc("LBL_UNTANKED");
     var labelMultiAuth = mainWin.getItemDesc("LBL_MULTIAUTH"); //12.1_MULTI_AUTH
     var labeldiscarded = mainWin.getItemDesc("LBL_DISCARDED"); //12.1_MULTI_AUTH
    /* Fix for Bug 16840737 - end */
	
    var inparam='';
    if(evnt){
        var event=window.event||evnt;
        var eventElem = getEventSourceElement(event);
        
        var actionLinks = getActionLinks();
        if(eventElem.tagName== "A"){
            highlightActionrec(eventElem,actionLinks);  
        }
    }
    if(myflag=="load"){
      if(typeof(document.getElementById('searchTxnCntResultDiv').getElementsByTagName("A")[0])!="undefined")
      document.getElementById('searchTxnCntResultDiv').getElementsByTagName("A")[0].className="Astdselected";
    }	
    qryStr = buildQueryString(); 
    /* 12.0.2 change for wrkflow search*/
    if(qryStr.lastIndexOf("Blankfld")>0)
    {
      var len = qryStr.length; 
      var pos = qryStr.lastIndexOf("=");
       var sub =  qryStr.substring(pos+1,len-1);
      if(sub =='WFINITDAT')
      alert(mainWin.getItemDesc("LBL_QRY_FAIL_INPUT_DATE_DESC2"));
      else 
      alert(mainWin.getItemDesc("LBL_QRY_FAIL_INPUT_DATE_DESC1"));
      return ;
    }
 /* 12.0.2 change for wrkflow search*/
    objXMLHTTP = createHTTPActiveXObject();
    var serverURL = "BranchServlet";
     
     var count=0;
     switch (queue) {
        //case "Pending":
		case labelPending: /* Fix for Bug 16840737 */
            {
                queryType='specific';
                //queue='IPR~!IPR~';                
                queue='IPR|!IPR|';  /* security fixes for WF */              
                break;
            }
        //case "Assigned":
		case labelAssigned: /* Fix for Bug 16840737 */
            {
                queryType='specific';
                //queue='IPR~!WTS~';                
                queue='IPR|!WTS|';      /* security fixes for WF */          
                break;
            }
        //case "Approved":
		case labelApproved: /* Fix for Bug 16840737 */
            {
                queryType='specific';
                //queue='IPR~!APP~';                
                queue='IPR|!APP|';   /* security fixes for WF */             
                break;
            }
        //case "Auth History":
		case labelAuthHistory: /* Fix for Bug 16840737 */
            {
                queryType='specific';
                //queue='IPR~!AUT~';
                queue='IPR|!AUT|';	/* security fixes for WF */
                break;
            }
        //case "Unassigned":
		case labelUnassigned: /* Fix for Bug 16840737 */
            {
                queryType='specific';
                //queue='IPR~!WAA~WMA~';
                queue='IPR|!WAA|WMA|';	/* security fixes for WF */
                break;
            }
        //case "Completed":
		case labelCompleted: /* Fix for Bug 16840737 */
            {
               queryType='specific';
               //queue='COM~!COM~';
               queue='COM|!COM|';	/* security fixes for WF */
               break;
            }
        //case "Failed":
		case labelFailed: /* Fix for Bug 16840737 */
            {
                queryType='specific';
                //queue='FAL~!FAL~';                
                queue='FAL|!FAL|'/* security fixes for WF */
                break;
            }
        //case "Reversed":
		case labelReversed: /* Fix for Bug 16840737 */
            {
               queryType='reverseSearch';
               //queue='REV~!REV~';    
               queue='REV|!REV|';/* security fixes for WF */
                break;
            }
        //case "Sending For Authorisation":
		case labelSendForReversal: /* Fix for Bug 16840737 */
            {
                //queue='IPR~!STH~';
                //queue='IPR|!STH|';/* security fixes for WF */
		//queue='IPR|!WTS|'; //FCUBS12.0.2_9NT1587_17085622  Sending for auth stage status should be WTS
                queue='IPR|!WTS|!SFA|'; //12.0.2_17337720
                
                break;
            }
        //case "Tanked":
		case labelTanked: /* Fix for Bug 16840737 */
            {
               queryType='tankSearch';
               //queue='TNK~RTK!COM~';
               queue='TNK|RTK!COM|';/* security fixes for WF */
                break;
            }
		 //case "SENTFORREVERSAL":
		 case labelSentForReversal: /* Fix for Bug 16840737 */
            {
                //queue='IPR~!WTS~';   /* security fixes for WF */             
                queue='IPR|!WTS|';  
                break;
            }
        //case "Untanked":
		case labelUntanked: /* Fix for Bug 16840737 */
            {
               queryType='untankSearch';
               //queue='RUT~UTK~ARV~RFW~DEL!COM~';
               queue='RUT|UTK|ARV|RFW|DEL!COM|';/* security fixes for WF */
                break;
            }
            
              //12.1_multi_auth starts
         case labelMultiAuth: 
            {
              queryType='specific';
               queue='IPR|!MTS|';
                break;
            }
             case labeldiscarded: 
            {
              queryType='specific';
               queue='DIS|!DIS|';
                break;
            }
            //12.1_multi_auth ends
        }

     
   /* if(typeof(myflag)!=="undefined"){
         if(myflag=='next'){           
           gcurrpage=parseInt(currpage)+1;           
         }else{
           gcurrpage=parseInt(currpage)-1;           
         }
         var queryStr = 'msgType=TASKLIST&queryType='+queryType+'&queryString=\'\'&' + qryStr+'&trnqueue='+queue+'&result=N';  
     }else{
         var queryStr = 'msgType=TASKLIST&queryType='+queryType+'&queryString=\'\'&' + qryStr +'&trnqueue='+queue+'&result=N';  
     } */
     var queryStr = 'msgType=TASKLIST&queryType='+queryType+'&queryString='+msgChar+'&' + qryStr +'&trnqueue='+queue+'&result=N';
    var reqmethod = 'POST';
    var respXML = sendRequest(reqmethod, serverURL, queryStr);
    if (respXML == timeout_responseXML) {
        openTimeOutPage();
        return;
    }
     if (respXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
     }else {       
        var xmlDoc = loadXMLDoc(respXML);
        var cntDOM = null;
        cntDOM = loadXMLDoc(respXML);        
        var listCnt = new Array();
      if (getXMLString(cntDOM) != "") {
        listCnt[0] = (getNodeText(selectSingleNode(cntDOM, "//TASKLIST/TLREC/RTTXN"))).split("~").length - 1;
        listCnt[1] = (getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/DDTXN'))).split("~").length - 1;
        listCnt[2] = (getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/CGTXN'))).split("~").length - 1;
        listCnt[3] = (getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/TDTXN'))).split("~").length - 1;
        listCnt[4] = (getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UPTXN'))).split("~").length - 1;  
        //listCnt[5] = (getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/BCTXN'))).split("~").length - 1;   //9NT1525_1203_18194276 commented
	
        var queryResultsArr = [];
        queryResultsArr[mainWin.getItemDesc("LBL_RETAIL_TELLER")] = elimDup(getNodeText(selectSingleNode(cntDOM, "//TASKLIST/TLREC/RTTXN")).split("~"));
        queryResultsArr[mainWin.getItemDesc("LBL_WF_DD")] = elimDup(getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/DDTXN')).split("~")); //9NT1525_1203_18194276 changed the abel
        queryResultsArr[mainWin.getItemDesc("LBL_CLEARING")] = elimDup(getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/CGTXN')).split("~"));
        queryResultsArr[mainWin.getItemDesc("LBL_TERMS_DEPOSIT")] = elimDup(getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/TDTXN')).split("~"));
        queryResultsArr[mainWin.getItemDesc("LBL_UTILITY_PAYMENT")] = elimDup(getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UPTXN')).split("~")); 
        //queryResultsArr[mainWin.getItemDesc("LBL_BANKERS_CHEQUE")] = elimDup(getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/BCTXN')).split("~")); //ssraa, commented
       
       fnCreateTransactionHtml();
   
        var resultTable= document.getElementById('WorkflowcntQueryResults');
        var tBodyElem = resultTable.tBodies[0];
        var index = 0;
         sortDescByValForTxDet(queryResultsArr, function(key, value) {
         
            if(((value.length)-1) >0){
            tBodyElem.rows[index].cells[0].innerHTML =  "<a  id=\"anchor" + key +"\" class='Astd' href=\"#\" onclick=\"showResultTable('"+ value + "','"+queue +"','" +inparam+"',this);\" onkeydown=\"return handleWfQueryKeyDownEvents(event)\" >" +key+ "</a>";
            tBodyElem.rows[index].cells[1].innerHTML = "<span class='SPNtext' tabindex=0 id = '"+key+"id"+ "'>" + ((value.length)-1) + "</span>";/*9NT1606_12_4_RETRO_12_3_26583067 changes*/
           }
           else{
           tBodyElem.rows[index].cells[0].innerHTML =  "<a  class='AstdDisabled' href=\"#\" onclick=\"return false;\">" +key+ "</a>";
           tBodyElem.rows[index].cells[1].innerHTML = "<span class='SPNtextDisabled' tabindex=0 id= '"+key+"id"+ "'>" + ((value.length)-1) + "</span>";/*9NT1606_12_4_RETRO_12_3_26583067 changes*/
           }
           
			tBodyElem.rows[index].cells[2].innerHTML = "<span class='SPNtext' tabindex=0 id= '"+key+"id"+ "' >" + value + "</span>";/*9NT1606_12_4_RETRO_12_3_26583067 changes*/
            index++;
          
         }
        );
     
              
/*
            if (count % 2 == 0){
            html += '<tr class=\'TBLoneTR\'>'; 
            }else {
            html += '<tr class=\'TBLoneTRalt\'>';
            }
            count=count+1;
            html += '<td scope=\'row\'>';       
            html += "<a class=\'Astd\' href=\"#\" onclick=\"showResultTable(\'"+elimDup(eval("Funarr"+i))+ "\',\'"+queue +"\',\'" +inparam+"\',event);\" onkeydown=\"return fnHandleTellerKeys(event)\" >" + labelarray[i]+ "</a></td>"; 
            html += "<td ><span class=\'SPNtext\' tabindex=0>" + listCnt[i] + "</span></td>";
			html += "<td class=\'TDnone\'><span class=\'SPNtext\' tabindex=0>" + elimDup(eval("Funarr"+i))+ "</span></td>";
            html += "</tr>";
            }
         }
*/
   //12.1 Dashboard changes -end 
        
        //html += "<A class='ASearchBar' onmouseover=\"this.className=\'ASearchover\'\" onmouseout=\"this.className=\'ASearchBar\'\" onfocus=\"this.className=\'ASearchover\'\" onclick=\"getGroupcnt( \'" + next + "\',"+gcurrpage+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_PREVIOUS") + "</A>&nbsp;&nbsp;";
        //html += "<A class='ASearchBar' onmouseover=\"this.className=\'ASearchover\'\" onmouseout=\"this.className=\'ASearchBar\'\" onfocus=\"this.className=\'ASearchover\'\" onclick=\"getGroupcnt( \'" + next + "\',"+gcurrpage+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_NEXT") + "</A>&nbsp;&nbsp;";
        //html += "<button class = \'Abut\' onclick=\"getGroupcnt( \'" + prev + "\',"+gcurrpage+")\" title = \'Previous\'><img src=\'Images/widgetonePrevious.gif\' alt = \'Previous\' title = \'Previous\'></button>";
        //html += "<span>&nbsp;</span>";
        //html += "<button class = \'Abut\'  onclick=\"getGroupcnt( \'" + next + "\',"+gcurrpage+")\" title = \'Next\'><img src = \'Images/widgetoneNext.gif\' alt = \'Next\' title = \'Next\'></button>";
       
        }else{
            document.getElementById('TRANSDETAILS').innerHTML='';
        } 
        
        var tempObj = document.getElementById('TRANSDETAILS');
            setWidthHeight(tempObj);
            tempObj = document.getElementById('DIVWfcaptionSR2');
            setWidthHeight(tempObj);
            tempObj = document.getElementById('DIVWfresultsTBL2');
            tempObj.style.width = tempObj.parentNode.offsetWidth  - 2+ 'px';
            tempObj.style.height = document.getElementById('DIVWfcaptionSR2').offsetHeight - (document.getElementById('btnDivTxnCnt1').offsetHeight + 10) +'px';
    }
    var resultTable = document.getElementById('WorkflowcntQueryResults');
    var transactionLabel = "";
    var rowLength =  resultTable.tBodies[0].rows.length;
    var tBodyElem = resultTable.tBodies[0];
    for (var cnt = 0; cnt < rowLength ; cnt++){
        var anchorTag =  tBodyElem.rows[cnt].cells[0].getElementsByTagName("A")[0];
        /*9NT1606_12_4_RETRO_12_3_26524845 changes start*/
        //transactionLabel = anchorTag.innerHTML;
        transactionLabel = anchorTag.textContent;
        /*9NT1606_12_4_RETRO_12_3_26524845 changes ends*/
        if((anchorTag.className == "AstdDisabled") && document.getElementById(transactionLabel) != null){
        closeCurrentTab(document.getElementById(transactionLabel).parentNode);
        
        
      }
    
    }
    /*
	if(queue == "IPR~!IPR~" && myflag=="load" )
  if(listCnt[0]>0){
    return elimDup(eval(Funarr0));
  }else if(listCnt[1]>0){
     return elimDup(eval(Funarr1));
  }else if(listCnt[2]>0){
     return elimDup(eval(Funarr2));
  }else if(listCnt[3]>0){
     return elimDup(eval(Funarr3));
  }else if(listCnt[4]>0){
     return elimDup(eval(Funarr4));
  }else if(listCnt[5]>0){
     return elimDup(eval(Funarr5));
  }
  */
   
}
 //12.1 Dashboard changes --start

 function sortDescByValForTxDet(obj, callback, context) { 
   var tempArr = [];     
  for (var key in obj) tempArr.push([key, obj[key]]);      
    tempArr.sort(function(a, b) { 
    return a[1].length > b[1].length ? 1 : a[1].length < b[1].length ? -1 : 0 });     
    var length = tempArr.length;    
    while (length--) 
    callback.call(context, tempArr[length][0], tempArr[length][1]); 
 }  
 //12.1 Dashboard changes --end
function elimDup(arr) 
{ 
	var i;
	len=arr.length; 
	out=[];
	obj={};    
	for (i=0;i<len;i++) 
	{     	
		obj[arr[i]]=0; 
	}
	for (i in obj) 
	{    
		out.push(i); 
	}   
	return out; 
} 

   //12.1 Dashboard changes --start

 function sortDescByVal(obj, callback, context) { 
   var tempArr = [];     
  for (var key in obj) tempArr.push([key, obj[key]]);      
    tempArr.sort(function(a, b) { 
    return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0 });     
    var length = tempArr.length;    
    while (length--) 
    callback.call(context, tempArr[length][0], tempArr[length][1]); 
 }  
 
 
 function sortDescByValForTxDet(obj, callback, context) { 
   var tempArr = [];     
  for (var key in obj) tempArr.push([key, obj[key]]);      
    tempArr.sort(function(a, b) { 
    return a[1].length > b[1].length ? 1 : a[1].length < b[1].length ? -1 : 0 });     
    var length = tempArr.length;    
    while (length--) 
    callback.call(context, tempArr[length][0], tempArr[length][1]); 
 }  
 //12.1 Dashboard changes --end


function doSearch2(myflag,currpage,evnt) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var html1='';    
    var inparam='';
   var centralized = branchIdentifier ;
    //var event=window.event||evnt;
   /* var labelWorkflow = mainWin.getItemDesc("LBL_WORKFLOW");
    var labelSearchTasks = mainWin.getItemDesc("LBL_SEARCH_TASKS");
    var labelSearchResult = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    var labelPrevious = mainWin.getItemDesc("LBL_PREVIOUS");
    var labelNext = mainWin.getItemDesc("LBL_NEXT");
    var labelActionType = mainWin.getItemDesc("LBL_ACTION_TYPE");
    var labelActionCount = mainWin.getItemDesc("LBL_ACTION_COUNT");
    */
    var labelarray = new Array();    
    labelarray[0]  = mainWin.getItemDesc("LBL_PENDING");
    labelarray[1]  = mainWin.getItemDesc("LBL_ASSIGNED");
    labelarray[2]  = mainWin.getItemDesc("LBL_UNASSIGNED");
    labelarray[3]  = mainWin.getItemDesc("LBL_COMPLETED");
    labelarray[4]  = mainWin.getItemDesc("LBL_FAILED");
    labelarray[5]  = mainWin.getItemDesc("LBL_REVERSED");
	labelarray[6]  = mainWin.getItemDesc("LBL_SEND_TO_HOST");
    labelarray[7]  = mainWin.getItemDesc("LBL_TANKED");
    labelarray[8]  = mainWin.getItemDesc("LBL_UNTANKED");
    labelarray[9]  = mainWin.getItemDesc("LBL_APPROVED");
    labelarray[10]  = mainWin.getItemDesc("LBL_AUTHHISTORY");    
    labelarray[11] = mainWin.getItemDesc("LBL_SENDFORREVERSAL");
    labelarray[12] = mainWin.getItemDesc("LBL_MULTIAUTH");//12.1_MULTI_AUTH   
    labelarray[13] = mainWin.getItemDesc("LBL_DISCARDED");//12.1_MULTI_AUTH   
    if(typeof(currpage)!="undefined"){
        gcurrpage=currpage; 
     }else{
        gcurrpage=gcurrpage;  
     }  
        qryStr = buildQueryString(); 
     /* 12.0.2 change for wrkflow search*/    
    if(qryStr.lastIndexOf("Blankfld")>0)
    {
      var len = qryStr.length; 
      var pos = qryStr.lastIndexOf("=");
      var sub =  qryStr.substring(pos+1,len-1);
      if(sub =='WFINITDAT')
      alert(mainWin.getItemDesc("LBL_QRY_FAIL_INPUT_DATE_DESC2"));
      else 
      alert(mainWin.getItemDesc("LBL_QRY_FAIL_INPUT_DATE_DESC1"));
      return ;
    }
     /* 12.0.2 change for wrkflow search*/
    objXMLHTTP = createHTTPActiveXObject();
    var serverURL = "BranchServlet";
    //if(typeof(myflag)!=="undefined"){
         //if(myflag=='next'){           
   //if(typeof(myflag)!=="undefined"){
       //  if(myflag=='next'){           
         //  gcurrpage=parseInt(currpage)+1;           
         //}else{
          // gcurrpage=parseInt(currpage)-1;           
        // }
       //   var queryStr = 'msgType=TASKLIST&queryType=Count&queryString=\'\'&' + qryStr + '&pgno='+gcurrpage;  
   // }else{
           var queryStr = 'msgType=TASKLIST&queryType=Count&queryString='+msgChar+'&' + qryStr + '&pgno=1';  /* security fixes for WF */ 
     
   // }     
    var reqmethod = 'POST';
    var respXML = sendRequest(reqmethod, serverURL, queryStr);
    if (respXML == timeout_responseXML) {
        openTimeOutPage();
        return;
    }
    if (respXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
    } else {
        document.getElementById('searchTxnCntResultDiv').style.display = "";   
        document.getElementById('searchWfGrpResultDiv').style.display = "";
        var xmlDoc = loadXMLDoc(respXML);
        var cntDOM = null;
        cntDOM = loadXMLDoc(respXML);        
        var listCnt = new Array();
        if (getXMLString(cntDOM) != "") {
        listCnt[0] = getNodeText(selectSingleNode(cntDOM, "//TASKLIST/TLREC/PENDINGTXN"));
        listCnt[1] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/ASSIGNEDTXN'));
        listCnt[2] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UNASSIGNEDTXN'));
        listCnt[3] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/COMPLETETXN'));
        listCnt[4] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/FAILEDTXN'));
        listCnt[5] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/REVERSEDTXN'));
        listCnt[6] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/SENDTOHOSTTXN'));
        listCnt[7] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/TANKEDTXN'));
        listCnt[8] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/UNTANKEDTXN'));
        listCnt[9] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/APPROVEDTXN'));
        listCnt[10] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/AUTHHISTORYTXN'));
        listCnt[11] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/SENTFORREVERSAL'));
        listCnt[12] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/MULTIAUTHTXN')); //12.1_MULTI_AUTH
        listCnt[13] = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/DISCARDEDTXN')); //12.1_MULTI_AUTH
        var brnStat = getNodeText(selectSingleNode(cntDOM, '//TASKLIST/TLREC/BRNSTAT'));
        try {
            parent.setBrnStat(brnStat);
        } catch(e) {}  

        //fnCreateWorkFlowHtml(); //12.1_multi_auth changes 
        fnCreateWorkFlowHtml(listCnt.length);  //12.1_multi_auth changes 
        var resultTable= document.getElementById('WorkflowQueryResults');
        var tBodyElem = resultTable.tBodies[0];
        var rowLength =  resultTable.tBodies[0].rows.length;
        var x = 0 ; //temp rows
        for(i=0;i<listCnt.length ;i++){ 
        if(listCnt[i] > 0){
 
if( (centralized == "Y" && labelarray[i]  != mainWin.getItemDesc("LBL_APPROVED") && labelarray[i] != mainWin.getItemDesc("LBL_FAILED") && labelarray[i]  != mainWin.getItemDesc("LBL_SEND_TO_HOST") && labelarray[i]  != mainWin.getItemDesc("LBL_TANKED") && labelarray[i]  != mainWin.getItemDesc("LBL_UNTANKED"))
|| (centralized != "Y" && labelarray[i]  != mainWin.getItemDesc("LBL_APPROVED") && labelarray[i] != mainWin.getItemDesc("LBL_FAILED") )) {
        /*9NT1606_12_4_RETRO_12_3_26524845--changes starts*/
        //tBodyElem.rows[x].cells[0].innerHTML = "<a class='Astd' onclick=\"getGroupcnt('"+labelarray[i]+ "' ,'"+qryStr+"' ,'"+inparam+"' ,'"+inparam+"',event);\" onkeydown=\"return handleWfQueryKeyDownEvents(event)\" href=\"#\">"+ labelarray[i]+ "</a>";
        tBodyElem.rows[x].cells[0].innerHTML = "<a class='Astd' name = '"+labelarray[i]+ "' onclick=\"getGroupcnt('"+labelarray[i]+ "' ,'"+qryStr+"' ,'"+inparam+"' ,'"+inparam+"',event);fn_selected(this.name);\" onkeydown=\"return handleWfQueryKeyDownEvents(event)\" href=\"#\">"+ labelarray[i]+ "</a>";
        /*9NT1606_12_4_RETRO_12_3_26524845--changes ends*/
        tBodyElem.rows[x].cells[1].innerHTML = "<span class='SPNtext'  tabindex=0 id = '"+labelarray[i]+ "' >" +listCnt[i] + "</span>";/*9NT1606_12_4_RETRO_12_3_26583067 changes*/
       x++ ; //12.1
        } //12.1
        }
        else{

if( (centralized == "Y" && labelarray[i]  != mainWin.getItemDesc("LBL_APPROVED") && labelarray[i] != mainWin.getItemDesc("LBL_FAILED") && labelarray[i]  != mainWin.getItemDesc("LBL_SEND_TO_HOST") && labelarray[i]  != mainWin.getItemDesc("LBL_TANKED") && labelarray[i]  != mainWin.getItemDesc("LBL_UNTANKED"))
|| (centralized != "Y" && labelarray[i]  != mainWin.getItemDesc("LBL_APPROVED") && labelarray[i] != mainWin.getItemDesc("LBL_FAILED") )) {
		/*9NT1606_12_4_RETRO_12_3_26624737 changes start*/
        //tBodyElem.rows[x].cells[0].innerHTML = "<a class='AstdDisabled' onclick=\"return false;\" href=\"#\">"+ labelarray[i]+ "</a>";
		tBodyElem.rows[x].cells[0].innerHTML = '<a class=\'AstdDisabled\' name = "'+ labelarray[i] +'" onclick="fn_selected(this.name);" href="#">' + labelarray[i] + "</a>";
		/*9NT1606_12_4_RETRO_12_3_26624737 changes ends*/
        tBodyElem.rows[x].cells[1].innerHTML = "<span class='SPNtextDisabled' tabindex=0 id = '"+labelarray[i]+ "'>" +listCnt[i] + "</span>";/*9NT1606_12_4_RETRO_12_3_26583067 changes*/
      x++ ; //12.1
        }//12.1
        }
        
       	
       }
        	
       // );
        //12.1 fix for 14784632 -ends
         //changes for workflow -end
    /*     for(i=0;i<listCnt.length ;i++){ 
        if(listCnt[i]>0){
if (count % 2 == 0){
        html += '<tr class=\'TBLoneTR\'>';        
        }else {
        html += '<tr class=\'TBLoneTRalt\'>';
        }
        count=count+1;
        html += '<td scope=\'row\'>';       
        html += "<a class=\'Astd\' onclick=\"getGroupcnt(\'"+labelarray[i]+ "\',\'"+qryStr+"\',\'"+inparam+"\',\'"+inparam+"\',event);\" onkeydown=\"return fnHandleTellerKeys(event)\" href=\"#\">" + labelarray[i]+ "</a></td>"; 
        html += "<td ><span class=\'SPNtext\' tabindex=0>" + listCnt[i] + "</span></td>";
        html += "</tr>";
       	
        }
        	}*/
        
//12.1 Dashboard changes --end
        
        
        //html += "<div class=\"DIVLinkBar\">";
        //html += "<A class='ASearchBar' onmouseover=\"this.className=\'ASearchover\'\" onmouseout=\"this.className=\'ASearchBar\'\" onfocus=\"this.className=\'ASearchover\'\" onclick=\"doSearch2( \'" + prev + "\',"+gcurrpage+")\" href=\'#\'>" + labelPrevious + "</A>&nbsp;&nbsp;";
        //html += "<A class='ASearchBar' onmouseover=\"this.className=\'ASearchover\'\" onmouseout=\"this.className=\'ASearchBar\'\" onfocus=\"this.className=\'ASearchover\'\" onclick=\"doSearch2( \'" + next + "\',"+gcurrpage+")\" href=\'#\'>" + labelNext + "</A>&nbsp;&nbsp;";
        //html += "<button class = \'Abut\' onclick=\"doSearch2( \'" + prev + "\',"+gcurrpage+")\" title = \'Previous\'><img src=\'Images/widgetonePrevious.gif\' alt = \'Previous\' title = \'Previous\'></button>";
        //html += "<span>&nbsp;</span>";
        //html += "<button class = \'Abut\'  onclick=\"doSearch2( \'" + next + "\',"+gcurrpage+")\" title = \'Next\'><img src = \'Images/widgetoneNext.gif\' alt = \'Next\' title = \'Next\'></button>";
        //html += "</div>";
        //html += '<div id="Divwfgrpdtls" style="display:none"></div>';
        
        
        
        }
        var tempObj = document.getElementById('WRKFLWDETAILS');
            setWidthHeight(tempObj);
            tempObj = document.getElementById('DIVWfcaptionSR1');
            setWidthHeight(tempObj);
            tempObj = document.getElementById('DIVWfresultsTBL1');
            tempObj.style.width = tempObj.parentNode.offsetWidth  - 2+ 'px';
            tempObj.style.height = document.getElementById('DIVWfcaptionSR1').offsetHeight - (document.getElementById('btnDivTxnCnt').offsetHeight + 10) +'px';
    }
	return listCnt;
}

/*9NT1606_12_4_RETRO_12_3_26624737--Changes start*/

function fn_selected(LabelDesc){
	var currentTxnStatus = "";
	var anchorArr = document.getElementById("WorkflowQueryResults").getElementsByTagName("A");
	var spanArr = document.getElementById("WorkflowQueryResults").getElementsByTagName("span");/*9NT1606_12_4_RETRO_12_3_26583067 changes*/
			for (var cnt = 0; cnt < anchorArr.length; cnt++) {
					if (LabelDesc == anchorArr[cnt].text) {
					anchorArr[cnt].className = "Astdselected";
					/*9NT1606_12_4_RETRO_12_3_26583067 changes starts*/
					if (spanArr[LabelDesc].innerText == 0){
						var AnchorArrwfcntqryresult = document.getElementById("WorkflowcntQueryResults").getElementsByTagName("A");
						var spanArrwfcntqryresult = document.getElementById("WorkflowcntQueryResults").getElementsByTagName("span");
						for (var i = 0; i < AnchorArrwfcntqryresult.length; i++) {
						if(spanArrwfcntqryresult[AnchorArrwfcntqryresult[i].innerText+"id"].innerText != 0)
					    spanArrwfcntqryresult[AnchorArrwfcntqryresult[i].innerText+"id"].innerText = 0;
						spanArrwfcntqryresult[AnchorArrwfcntqryresult[i].innerText+"id"].className = "SPNtextDisabled";
						AnchorArrwfcntqryresult[i].onclick = "";
						}
					}
					/*9NT1606_12_4_RETRO_12_3_26583067 changes ends*/
				} else {
					anchorArr[cnt].className = "AstdDisabled";
				}
			}
	return true;
}
/*9NT1606_12_4_RETRO_12_3_26624737--Changes ends*/


function ShowSearchTasksResult(funcid){
 searchOption = 'SEARCH_TAB';
    if (document.getElementById('SEARCHTYPE1').checked == true) {
        qryStr = buildQueryString(document.getElementById('srcDet'));
        getSearchTaskResult(qryStr, 'AllResult', 'SEARCH_TAB',funcid); //this will fetch all the records
    } else {
        qryStr = buildQueryString(document.getElementById('srcDet'));
        getSearchTaskResult(qryStr, 'SearchResult', 'SEARCH_TAB',funcid);
    }
    
}

/*
 * This function will get Result from DB and will  show in the Result Tab
 */
function getSearchResult(qryStr, qryType, myFlag) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    objXMLHTTP = createHTTPActiveXObject();
    var serverURL = "BranchServlet";
    var queryStr = 'msgType=TASKLIST&queryType=' + qryType + '&queryString=' + qryStr+ '&cntFnid=Y';
    if (myFlag == 'SEARCH_TAB') {
        queryStr = 'msgType=TASKLIST&queryType=' + qryType + '&queryString=&' + qryStr + '&cntFnid=Y';
    }
    var reqmethod = 'POST';
    var respXML = sendRequest(reqmethod, serverURL, queryStr);
    if (respXML == timeout_responseXML) {
        openTimeOutPage();
        return;
    }
    if (respXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
    } else {
        document.getElementById('DIVTabContent').style.display = "";
        document.getElementById('DIVTabContent').innerHTML = ""; // workflow tab change
        loadSTasklist(respXML, document.getElementById('DIVTabContent'));
        document.getElementById('DIVTabContent').style.display = "";
        if (myFlag == "SEARCH_TAB") {            
            document.getElementById("FIRSTASKDIV").style.height = document.getElementById("dashboard").offsetHeight - document.getElementById("taskbar").offsetHeight - document.getElementById("DIVTaskArea").offsetHeight + "px";
        } else {
            document.getElementById("FIRSTASKDIV").style.height = document.getElementById("dashboard").offsetHeight - document.getElementById("taskbar").offsetHeight + "px";
        }
    }
}
function getWFSearchResult(qryStr, qryType) {
    
}

function getSearchTaskResult(qryStr, qryType, myFlag, funcid){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
     objXMLHTTP = createHTTPActiveXObject();
    var serverURL = "BranchServlet";
    var queryStr = 'msgType=TASKLIST&cntFnid=N&queryType=' + qryType + '&queryString=&' + qryStr + '&funcid=' + funcid;
    if (myFlag == 'SEARCH_TAB') {
        queryStr = 'msgType=TASKLIST&cntFnid=N&queryType=' + qryType + '&queryString=&' + qryStr+ '&funcid=' + funcid;
    }
    var reqmethod = 'POST';
    var respXML = sendRequest(reqmethod, serverURL, queryStr);
    if (respXML == timeout_responseXML) {
        openTimeOutPage();
        return;
    }
    if (respXML == "ERROR") {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC"));
    } else {
        document.getElementById('DIVTabContent').style.display = "";
        loadResultTable(respXML,funcid);
      
    }
}

function validateTwoDates(fromDate, toDate) {
    var fromDateArray = fromDate.split("-");
    var toDateArray = toDate.split("-");
    var fromDateWithFormat = getDateObject();
    fromDateWithFormat.setFullYear(fromDateArray[0], fromDateArray[1], fromDateArray[2]);
    var toDateWithFormat = getDateObject();
    toDateWithFormat.setFullYear(toDateArray[0], toDateArray[1], toDateArray[2]);
    if (fromDateWithFormat > toDateWithFormat) {
        return false;
    } else {
        return true;
    }
}

function doSearch(queryType) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var fromDate = document.getElementById('FROMDATE').value;
    var toDate = document.getElementById('TODATE').value;
    if (fromDate == 'undefined' || trim(fromDate) == '' || toDate == 'undefined' || trim(toDate) == '') {
        return;
    }
    if (validateTwoDates(fromDate, toDate)) {
        objXMLHTTP = createHTTPActiveXObject();
        var serverURL = 'BranchServlet';
        var queryStr = 'msgType=TASKLIST&queryType=' + queryType + '&queryString=' + fromDate + "~" + toDate + '&cntFnid=Y';
        var reqMethod = 'POST';
        var respXML = sendRequest(reqMethod, serverURL, queryStr);
        if (respXML == timeout_responseXML) {
            openTimeOutPage();
            return;
        }
        if (respXML == 'ERROR') {
        /* FC 11.4 NLS Changes Starts*/
            //alert("Query Failed. Error Description: ");
            alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + " " + objXMLHTTP.status + ":" + objXMLHTTP.statusText);
            /* FC 11.4 NLS Changes Ends*/
        } else {
            loadWFTabTasklist(respXML, document.getElementById("searchContent")); //Kirti 14-Jan-- WF Dashboard  changes--
        }
    } else {
        //alert("Please enter valid Dates ");//FC 11.4 NLS Changes
         alert(mainWin.getItemDesc("LBL_ENTERVALIDDATES"));//FC 11.4 NLS Changes
    }
    setTableCaption(queryType);
}

function showSearchResult(queryType,funcid){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var fromDate = document.getElementById('FROMDATE').value;
    var toDate = document.getElementById('TODATE').value;
    if (fromDate == 'undefined' || trim(fromDate) == '' || toDate == 'undefined' || trim(toDate) == '') {
        return;
    }
    if (validateTwoDates(fromDate, toDate)) {
        objXMLHTTP = createHTTPActiveXObject();
        var serverURL = 'BranchServlet';
        var queryStr = 'msgType=TASKLIST&cntFnid=N&queryType=' + queryType + '&queryString=' + fromDate + "~" + toDate +'&funcid=' +funcid;
        var reqMethod = 'POST';
        var respXML = sendRequest(reqMethod, serverURL, queryStr);
        if (respXML == timeout_responseXML) {
            openTimeOutPage();
            return;
        }
        if (respXML == 'ERROR') {
            alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + " " + objXMLHTTP.status + ":" + objXMLHTTP.statusText);
        } else {
           loadSearchResult(respXML,funcid);
        }
    } else {
       
         alert(mainWin.getItemDesc("LBL_ENTERVALIDDATES"));
    }
    setTableCaption(queryType);
}
function loadSearchResult(respXML,funcid){
     var xslName = "Templates/XSL/resultable.xsl";
    var xslDoc = loadXSLFile(xslName);
    var dosearch2 = loadXMLDoc(respXML);
    var resulthtml= "";
    var params = new Array();
    params["imgPath"]           = parent.theme_imagesPath;
    params["search_results"]    = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    params["start_time"]        = mainWin.getItemDesc("LBL_ST_TIME");
    params["posting_date"]      = mainWin.getItemDesc("LBL_POSTING_DATE");
    params["stage_status"]      = mainWin.getItemDesc("LBL_STAGE_STATUS");
    params["locked_by"]         = mainWin.getItemDesc("LBL_LOCKED_BY");
    params["assigned_to"]       = mainWin.getItemDesc("LBL_ASSIGNED_TO");
    params["maker"]             = mainWin.getItemDesc("LBL_MAKER");
    params["amount"]            = mainWin.getItemDesc("LBL_AMOUNT");
    params["account"]           = mainWin.getItemDesc("LBL_TXNACCOUNT");
    params["ref"]               = mainWin.getItemDesc("LBL_REF");
    params["branch"]            = mainWin.getItemDesc("LBL_BRANCH");
    params["in_progress"]       = mainWin.getItemDesc("LBL_IN_PROGRESS");
    params["waiting_manual_ass"]= mainWin.getItemDesc("LBL_WAITING_MANUAL_ASS");
    params["completed"]         = mainWin.getItemDesc("LBL_COMPLETED");
    params["deleted"]           = mainWin.getItemDesc("LBL_DELETED");
    params["send_to_host"]      = mainWin.getItemDesc("LBL_SEND_TO_HOST");
    params["reversed"]          = mainWin.getItemDesc("LBL_REVERSED");
    params["failed"]            = mainWin.getItemDesc("LBL_FAILED");
    params["approved"]          = mainWin.getItemDesc("LBL_APPROVED");
    params["rejected"]          = mainWin.getItemDesc("LBL_REJECTED");
    params["makerId_SummaryAudit"] = mainWin.getItemDesc("LBL_MAKERID");
    params["txn_seq_no"]      = mainWin.getItemDesc("LBL_TXNSQNO");     
    //params["pending_for_auth"]      = mainWin.getItemDesc("LBL_PENDINGFORAUTH");
    params["pending_rev_auth"]      = mainWin.getItemDesc("LBL_PENDINGREVAUTH"); 
    params["ccy"]      = mainWin.getItemDesc("LBL_TXNCCYDET");   
    params["brn"]      = mainWin.getItemDesc("LBL_TXNBRNDET");     
    params["multiauth"]      = mainWin.getItemDesc("LBL_MULTIAUTH");     //12.1_MULTI_AUTH
    params["discarded"]      = mainWin.getItemDesc("LBL_DISCARDED");     //12.1_MULTI_AUTH
   // target.innerHTML =''; //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_28 //-- workflow tab change
    if (getXMLString(loadXMLFile(xmlDoc)) == "" || getXMLString(loadXMLFile(xmlDoc)).indexOf("404 Not Found") != -1) {
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR"));
    } else {
        var tablehtml = transform(xmlDoc, xslDoc, params);
    }
     if (searchOption == 'SEARCH_TAB') {
     }
     else{
         resulthtml="<div class = 'csc' id='csc'>";
         resulthtml+="<span class='tr'></span>";
         resulthtml+=document.getElementById("sectionheading_"+funcid).outerHTML;
         resulthtml+=tablehtml;
         resulthtml+="<span class='bl'></span>";
         resulthtml+="<span class='br'></span>";
         resulthtml+="</div>"
         document.getElementById('widgetcontainer_'+funcid).innerHTML=resulthtml;
     }
}
function toQueryComponent(input) {
    if (!input.id || input.disabled) return "";

    var n = urlencode(input.id);
    switch (input.type) {
    case "text":
    case "password":
    case "submit":
    case "hidden":
        if(input.value==''){
         input.value='%';   
        }
        return n + "=" + urlencode(replaceChar(input.value));/* security fixes for WF */
        
    case "textarea":
        var v = input.value.split(/\r\n|\r|\n/).join("\r\n");
        return n + "=" + urlencode(v);
    case "checkbox":
    case "radio":
        if (!input.checked) return "";
        var v = getRealValue(input);
        if (v === null) v = "on";
        return n + "=" + urlencode(v);
    case "select-one":
    case "select-multiple":
        var nvp = [];
        var opt, i = 0;
        while ((opt = input.options[i++]) != null) {
            if (opt.selected) {
                var v = getRealValue(opt);
                if (v === null) v = opt.text;
                nvp[nvp.length] = n + "=" + urlencode(v);
            }
        }
        return nvp.join("&");
    default:
        return "";
    }
}

function urlencode(str) {
    var v;
    try {
        v = encodeURIComponent(str);
    } catch(e) {
        v = escape(str);
    }
    return v.replace(/%20/g, "+");
}

function getRealValue(input) {
    var attr = input.getAttributeNode("value");
    return (attr && attr.specified) ? input.getAttribute("value") : null;
}

function buildQueryString(form) {
    var element, i = 0;
    var count=0;
    var qstrForm = "";
    var strBlankfld ="";
    var qstrElem = toQueryComponent(document.getElementById('FUNCTIONID'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
  /* 12.0.2 change for wrkflow search
   if(document.getElementById("BLK_WORKFLOW__WFINITDATEI").value=='%' || document.getElementById("BLK_WORKFLOW__WFINITDATEI").value=='')
document.getElementById('BLK_WORKFLOW__WFINITDATEI').value=AppDate;
  */
  if(document.getElementById("BLK_WORKFLOW__WFINITDATEI").value=='')
  {
   qstrElem = "BLK_WORKFLOW__WFINITDATE=%25" ;
   strBlankfld ="WFINITDATE";
  } 
  else
  {
        count += 1;
        qstrElem = toQueryComponent(document.getElementById('BLK_WORKFLOW__WFINITDATE'));
  } 
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
 /*12.0.2 change for wrkflow search
  * if(document.getElementById("BLK_WORKFLOW__WFTODATEI").value=='%' || document.getElementById("BLK_WORKFLOW__WFTODATEI").value=='')
   // document.getElementById('BLK_WORKFLOW__WFTODATEI').value=AppDate;
    */
    if(document.getElementById("BLK_WORKFLOW__WFTODATEI").value=='')
    {
        qstrElem = "BLK_WORKFLOW__WFTODATE=%25" ;
        strBlankfld ="WFTODATE";
    }
  else {
       count += 1;
       qstrElem = toQueryComponent(document.getElementById('BLK_WORKFLOW__WFTODATE'));
   }
   
    
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    
    qstrElem = toQueryComponent(document.getElementById('BRANCH'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('ACCOUNT'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('XREFID'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('TXNSEQNO'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }   
    /*
    qstrElem = toQueryComponent(document.getElementById('MakerID'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('TXNSTATUS'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('STAGESTATUS'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('ASSIGNEDTO'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }

    qstrElem = toQueryComponent(document.getElementById('LOCKEDBY'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    
    qstrElem = toQueryComponent(document.getElementById('TXNCCY'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('TXNAMOUNT'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('condtion'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('SEARCHTYPE1'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('SEARCHTYPE2'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }
    qstrElem = toQueryComponent(document.getElementById('search'));
    if (qstrElem != "") {
        qstrForm += "&" + qstrElem;
    }*/
    // 12.0.2 change for wrkflow search
    if(count==1) 
     qstrForm += "&Blankfld="+ strBlankfld ;
   // 12.0.2 change for wrkflow search

    return qstrForm.substring(1);
}

function getSearchTasklist(xPathQuery) {
    var taskXMLDOM = null;
    var filterTaskXMLDOM = null;
    taskXMLDOM.async = true;
    taskXMLDOM.resolveExternals = true;
    if (textRespXML != null) {
        taskXMLDOM = loadXMLDoc(textRespXML);
        filterTaskXMLDOM = loadXMLDoc('<TASKLIST></TASKLIST>');
        var nodeList = selectNodes(taskXMLDOM, xPathQuery);
        var nlLength = nodeList.length;
        for (rowIdx = 0; rowIdx < nlLength; rowIdx++) {
            var element = nodeList[rowIdx];
            filterTaskXMLDOM.documentElement.appendChild(element);
        }

        return getXMLString(filterTaskXMLDOM);
    } else {
        alert(mainWin.getItemDesc("LBL_NOLOCAL_DATA_REQSERVER"));
    }
}

function loadSTasklist(respXML, target) {    //reduntant---not using now..
    var xslName = "Templates/XSL/TaskTbls.xsl";
    var xslDoc = loadXSLFile(xslName);
    var xmlDoc = loadXMLDoc(respXML);
    var params = new Array();
    params["imgPath"]           = parent.theme_imagesPath;
    params["search_results"]    = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    params["start_time"]        = mainWin.getItemDesc("LBL_ST_TIME");
    params["posting_date"]      = mainWin.getItemDesc("LBL_POSTING_DATE");
    params["stage_status"]      = mainWin.getItemDesc("LBL_STAGE_STATUS");
    params["locked_by"]         = mainWin.getItemDesc("LBL_LOCKED_BY");
    params["assigned_to"]       = mainWin.getItemDesc("LBL_ASSIGNED_TO");
    params["maker"]             = mainWin.getItemDesc("LBL_MAKER");
    params["amount"]            = mainWin.getItemDesc("LBL_AMOUNT");
    params["account"]           = mainWin.getItemDesc("LBL_TXNACCOUNT");
    params["ref"]               = mainWin.getItemDesc("LBL_REF");
    params["branch"]            = mainWin.getItemDesc("LBL_BRANCH");
    params["in_progress"]       = mainWin.getItemDesc("LBL_IN_PROGRESS");
    params["waiting_manual_ass"] = mainWin.getItemDesc("LBL_WAITING_MANUAL_ASS");
    params["completed"]         = mainWin.getItemDesc("LBL_COMPLETED");
    params["deleted"]           = mainWin.getItemDesc("LBL_DELETED");
    params["send_to_host"]      = mainWin.getItemDesc("LBL_SEND_TO_HOST");
    params["reversed"]          = mainWin.getItemDesc("LBL_REVERSED");
    params["failed"]            = mainWin.getItemDesc("LBL_FAILED");
    params["approved"]          = mainWin.getItemDesc("LBL_APPROVED");
    params["rejected"]          = mainWin.getItemDesc("LBL_REJECTED");
    params["makerId_SummaryAudit"] = mainWin.getItemDesc("LBL_MAKERID");
	params["txn_seq_no"]      = mainWin.getItemDesc("LBL_TXNSQNO");     
    //params["pending_for_auth"]      = mainWin.getItemDesc("LBL_PENDINGFORAUTH");
    params["pending_rev_auth"]      = mainWin.getItemDesc("LBL_PENDINGREVAUTH"); 
    params["ccy"]      = mainWin.getItemDesc("LBL_TXNCCYDET");   
    params["brn"]      = mainWin.getItemDesc("LBL_TXNBRNDET");     
    params["multiauth"]      = mainWin.getItemDesc("LBL_MULTIAUTH");    //12.1_MULTI_AUTH
    params["discarded"]      = mainWin.getItemDesc("LBL_DISCARDED");    //12.1_MULTI_AUTH
   // target.innerHTML =''; //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_28 //-- workflow tab change
    if (getXMLString(loadXMLFile(xmlDoc)) == "" || getXMLString(loadXMLFile(xmlDoc)).indexOf("404 Not Found") != -1) {
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR"));
    } else {
        var html = transform(xmlDoc, xslDoc, params);
    }
    if (searchOption == 'SEARCH_TAB') {
      
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes                        
               target = document.getElementById('vTabDB_TELLER').parentElement;
               if(document.getElementById('TASKLIST_CAP1'))
                  document.getElementById('vTabDB_TELLER').parentElement.removeChild(document.getElementById("TASKLIST_CAP1")); 
               document.getElementById('vTabDB_TELLER').parentElement.removeChild(document.getElementById("vTabDB_TELLER"));                              
               target.insertAdjacentHTML("beforeEnd", html);           
            
        } else {
            target.appendChild(html);
        }
    } else {
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes
            target.insertAdjacentHTML("beforeEnd", html);
        } else {
            target.appendChild(html);
        }
    }
    //document.getElementById("vTabDB_TELLER").style.height = '100%';
    //document.getElementById("FIRSTASKDIV").style.height = '100%';
    var strhtml = target.innerHTML;
    strhtml = replaceAll(strhtml, '&lt;', '<', strhtml);
    strhtml = replaceAll(strhtml, '&gt;', '>', strhtml);
    strhtml = strhtml.replace('\n', '');
    target.innerHTML = strhtml;
    //document.getElementById("vTabDB_TELLER").height = document.getElementById("dashboard").offsetHeight - document.getElementById("TASKLIST_CAP1").offsetHeight + "px";
    document.getElementById("FIRSTASKDIV").style.height = document.getElementById("dashboard").offsetHeight -document.getElementById("WorkFlow_Tabs").offsetHeight - document.getElementById("DIVTaskArea").offsetHeight-document.getElementById("taskbar").offsetHeight + "px" ;
    if (document.getElementById("ID_TASKLIST").getElementsByTagName("A")[0]) {
        document.getElementById("ID_TASKLIST").getElementsByTagName("A")[0].focus();
    }
}

function replaceAll(src, replace, replaceWith, result) {
    var re = new RegExp(replace, "g");
    result = src.replace(re, replaceWith);
    return result;
}

function loadTasklist(respXML, target) {
    var xslName = "Templates/XSL/TaskRows.xsl";
    var xslDoc = loadXSLFile(xslName);
    var xmlDoc = loadXMLDoc(respXML);
    var params = new Array();
    params["imgPath"] = parent.theme_imagesPath;
    if (getXMLString(loadXMLFile(xmlDoc)) == "" || getXMLString(loadXMLFile(xmlDoc)).indexOf("404 Not Found") != -1) {
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR"));
    } else {
        var html = transform(xmlDoc, xslDoc, params);
    }
    target.insertAdjacentHTML("afterBegin", html);
}

function toggleTbody(srcEl, obj) {
    var tbodyRef = document.getElementById(obj).tBodies[0];
    if (obj != undefined) {
        var imgEx = srcEl.children[0].children[0];
        imgEx.src = (imgEx.src.indexOf('open') != -1) ? imgPath + "/taskclosed.gif" : imgPath + "/taskopen.gif";
        tbodyRef.style.display = (tbodyRef.style.display == 'none') ? '' : 'none';
    }
}
function expandSection(srcEl){
  var sectionid = srcEl.id;
  var functionid = sectionid.substr(sectionid.lastIndexOf("_")+1);
  var imgEx;
  var resultdiv = document.getElementById("resulttable_"+functionid);
  if ( resultdiv){
      imgEx = document.getElementById('sectionheading_'+functionid).children[0].children[0];
      imgEx.src = (imgEx.src.indexOf('open') != -1) ? imgPath + "/taskclosed.gif" : imgPath + "/taskopen.gif";
      //document.getElementById("resulttable_"+functionid).style.display=  (document.getElementById("resultable_"+functionid).style.display =='none')?'':'none';
      //document.getElementById(resultdiv).style.display= 'none';
      resultdiv.style.display= resultdiv.style.display =='none'?'':'none';
    }
  else if(!resultdiv){
      var tab='';
      var maintab='';
      tab=getWFMainTab();
      if (typeof(tab) != "undefined") {
      maintab=tab.substr(tab.lastIndexOf("_")+1);
      }else{
        maintab="SearchTasks";
      }
      if (maintab=="Pending" || maintab=="Assigned"|| maintab=="Approved"|| maintab=="AuthHistory"|| maintab=="Unassigned"|| maintab=="Failed"){
      showResultTable(functionid,maintab);
      }else if (maintab=="Completed"){
      showSearchResult('completeSearchResult',functionid);
      }else if (maintab=="Reversed"){
      showSearchResult('reverseSearchResult',functionid);
      }else if (maintab=="Tanked"){
      showSearchResult('tankSearchResult',functionid);
      }else if (maintab=="Untanked"){
      showSearchResult('untankSearchResult',functionid);
      }
        //12.1_multi_auth starts
      else if (maintab=="Multiauth"){
      showSearchResult('multiAuthSearchResult',functionid);
      }
      else if (maintab=="Discarded"){
      showSearchResult('discardedSearchResult',functionid);
      }
      //12.1_multi auth ends
      else if (maintab=="SearchTasks"){
      ShowSearchTasksResult(functionid);
      }
      imgEx = document.getElementById('sectionheading_'+functionid).children[0].children[0];
      imgEx.src = (imgEx.src.indexOf('open') != -1) ? imgPath + "/taskclosed.gif" : imgPath + "/taskopen.gif";
      }
}
function getWFMainTab(){
    var tabobjlinks = getWFTabs();
    for (i =0;i<tabobjlinks.length;i++){
        if (tabobjlinks[i].getAttribute('title')=='selected'){
            return tabobjlinks[i].getAttribute('id');
        }
    }
}
function handleWorkFlowKeyDown(e, obj) {
    var evnt = window.event || e;
    var srcEl = getEventSourceElement(evnt);
    var imgEx;
    var tbodyRef = document.getElementById(obj).tBodies[0];
     mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.keyCode == 13) {//enter key
        return false;
    } else if (evnt.keyCode == 37) {//left arrow
        if(srcEl.parentNode.tagName.toUpperCase() == "TD") {
            if(getToolBarPreviousSibling(srcEl.parentNode)){
                if (getToolBarPreviousSibling(srcEl.parentNode).getElementsByTagName("A").length > 0) {
                    getToolBarPreviousSibling(srcEl.parentNode).getElementsByTagName("A")[0].focus();
                } else {
                    getToolBarPreviousSibling(srcEl.parentNode).getElementsByTagName("SPAN")[0].focus();
                }
            }
        } else {
            imgEx = srcEl.children[0];
            imgEx.src = imgPath + "/taskclosed.gif";
            tbodyRef.style.display = 'none';
        }
    } else if (evnt.keyCode == 39) {//right arrow
        if(srcEl.parentNode.tagName.toUpperCase() == "TD") {
            if (getToolBarNextSibling(srcEl.parentNode)) {
                getToolBarNextSibling(srcEl.parentNode).getElementsByTagName("SPAN")[0].focus();
            }
        } else {
            imgEx = srcEl.children[0];
            imgEx.src = imgPath + "/taskopen.gif";
            tbodyRef.style.display = '';
        }
    } else if (evnt.keyCode == 38) {//up arrow
        if (srcEl.tagName.toUpperCase() == "A" || srcEl.tagName.toUpperCase() == "SPAN"){
            srcEl = srcEl.parentNode;
        }
        if (srcEl.tagName.toUpperCase() == "DIV"){
            if (getToolBarPreviousSibling(srcEl) && getToolBarPreviousSibling(getToolBarPreviousSibling(srcEl))) {
                getToolBarPreviousSibling(getToolBarPreviousSibling(srcEl)).getElementsByTagName("A")[0].focus();
            }
        } else {
            if (srcEl.parentNode.tagName.toUpperCase() == "TR" && getToolBarPreviousSibling(srcEl.parentNode)){
                tbodyRef.getElementsByTagName("TR")[getRowIndex(evnt)-2].cells[srcEl.cellIndex].children[0].focus();
            }
        }
    } else if (evnt.keyCode == 40) {//down arrow
        if (srcEl.tagName.toUpperCase() == "A" || srcEl.tagName.toUpperCase() == "SPAN"){
            srcEl = srcEl.parentNode;
        }
        if (srcEl.tagName.toUpperCase() == "DIV"){
            if (getToolBarNextSibling(srcEl) && getToolBarNextSibling(getToolBarNextSibling(srcEl))) {
                getToolBarNextSibling(getToolBarNextSibling(srcEl)).getElementsByTagName("A")[0].focus();
            }
        } else {
            if (srcEl.parentNode.tagName.toUpperCase() == "TR" && getToolBarNextSibling(srcEl.parentNode)){
                tbodyRef.getElementsByTagName("TR")[getRowIndex(evnt)].cells[srcEl.cellIndex].children[0].focus();
            }
        }
    } else if(evnt.keyCode == 9) {//tab key
        if ((srcEl.tagName.toUpperCase() == "A" || srcEl.tagName.toUpperCase() == "SPAN") && srcEl.parentNode.tagName.toUpperCase() == "TD") {
            if (getToolBarNextSibling(tbodyRef.parentNode) && getToolBarNextSibling(tbodyRef.parentNode).tagName.toUpperCase() == "DIV") {
                getToolBarNextSibling(tbodyRef.parentNode).getElementsByTagName("A")[0].focus();
                preventpropagate(evnt);
                return false;
            } else {
                if(document.getElementById("TlBarOper").className == "dispNone"){
                    document.getElementById("nav").getElementsByTagName("A")[0].focus();
                    preventpropagate(e);
                    return false;
                }else{
                    var elemBtn = document.getElementById("TlBarOper").getElementsByTagName("BUTTON");
                    for(var i=0; i<elemBtn.length; i++){ 
                        if(!elemBtn[i].disabled ){
                            elemBtn[i].focus();
                            preventpropagate(e);
                            return false;
                        }
                    }
                }
            }
        }
    }
}

function showSearch(type) {
    var labelFromDate = mainWin.getItemDesc("LBL_FROM_DATE");
    var labelToDate = mainWin.getItemDesc("LBL_TO_DATE");
    var labelSearch = mainWin.getItemDesc("LBL_SEARCH");	  // 9NT1462-ITR1-13059753
    var html = "<div id='searchtask' class='TASKButtonBar'>";
    html = html + "<TABLE class='TBLlyt' border='0' cellpadding='3' cellspacing='0' summary='' onkeydown='return fnHTLBarKeyEvents(event);' onmousedown='return fnHTLBarKeyEvents(event);'>";
    html = html + "<TR>";
    html = html + "<TD><label class='LBLstd' for='FROMDATE'>" + labelFromDate + "</label></TD>";
    html = html + "<TD><INPUT TYPE = 'TEXT' title='" + labelFromDate + "' align='left' ID='FROMDATE' value=" + mainWin.AppDate + " class='TXTstd' size=10 maxlength=10 ></TD>";
    html = html + "<TD><label class='LBLstd' for='TODATE'>" + labelToDate + "</label></TD>";
    html = html + "<TD><INPUT TYPE = 'TEXT' title='" + labelToDate + "' ID='TODATE' value=" + mainWin.AppDate + " class='TXTstd' size=10 maxlength=10 ></TD>";
    /* FC 11.4 NLS Changes Starts  */
 //html = html + "<TD><BUTTON class='BTNtext' id='search' onclick='doSearch(\"" + type + "\");'>Search</BUTTON></td>";
	html = html + "<TD><BUTTON class='BTNtext' id='search' onclick='doSearch(\"" + type + "\");'>"+labelSearch+"</BUTTON></td>";
	    /* FC 11.4 NLS Changes Ends  */
  
    html = html + "</TR>";
    html = html + "</TABLE></div>";
	html+="<div id ='searchContent'></div>"
    return html;
}
/* 12.0.1 Security fix for 9836689 XSS Starts */
/*
function showSignature(path) {
    var labelSpecimenNumber = mainWin.getItemDesc("LBL_SPECIMEN_NUMBER");
    var sigHTML = "";
    var imageFileNames = path.split('!');
    var imageLength = imageFileNames.length;
    var langCode = mainWin.LangISOCode;
    sigHTML += "<HTML lang = " + langCode + "><BODY><TABLE WIDTH = '100%' summary=''>";
    for (var i = 0; i < imageLength - 1; i++) {
        sigHTML += "<TR><td CLASS='TextDesc' width=\"40%\">" + labelSpecimenNumber + "&nbsp;&nbsp;:&nbsp;" + (i + 1) + "</td>";
        //sigHTML += "<td width=\"40%\"><img src='Images/Signature/" + imageFileNames[i] + "' ALT=''></td></TR>";
        sigHTML += "<td width=\"40%\"><img src='FCUBSSignatureServlet?Action=READ&fileName=" + imageFileNames[i] + "' ALT=''></td></TR>";
    }
    sigHTML += "</TABLE></BODY></HTML>";
    var w = window.open("", "Report_Window", "center=yes,width=600,height=360,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
    w.document.write(sigHTML);
}*/
/* 12.0.1 Security fix for 9836689 XSS Ends */
function setTableCaption(capIdentifier) {
    var labelPending = mainWin.getItemDesc("LBL_PENDING");
    var labelAssigned = mainWin.getItemDesc("LBL_ASSIGNED");
    var labelApproved = mainWin.getItemDesc("LBL_APPROVED");
    var labelAuthHistory = mainWin.getItemDesc("LBL_AUTHHISTORY");
    var labelFailed = mainWin.getItemDesc("LBL_FAILED");
    var labelUnAssigned = mainWin.getItemDesc("LBL_UNASSIGNED");
    var labelAsynchronous = mainWin.getItemDesc("LBL_ASYNCHRONOUS");
    var labelCompleted = mainWin.getItemDesc("LBL_COMPLETED");
    var labelReversed = mainWin.getItemDesc("LBL_REVERSED");
    var labelTanked = mainWin.getItemDesc("LBL_TANKED");
    var labelUntanked = mainWin.getItemDesc("LBL_UNTANKED");
    var labelworkflow = mainWin.getItemDesc("LBL_WORKFLOW");//FC 11.4 NLS Changes
    var labelMultiAuth = mainWin.getItemDesc("LBL_MULTIAUTH");//12.1_MULTI_AUTH
    var labelDiscarded = mainWin.getItemDesc("LBL_DISCARDED");//12.1_MULTI_AUTH
    var caption = '';
    switch (capIdentifier) {
    case "PENDING":
        {
            caption = labelPending;
            break;
        }
	case "SENTFORREVERSAL":
        {
            caption = labelSentForReversal;
            break;
        }
    case "ASSIGNED":
        {
            caption = labelAssigned;
            break;
        }
    case "APPROVED":
        {
            caption = labelApproved;
            break;
        }
    case "AUTHHISTORY":
        {
            caption = labelAuthHistory;
            break;
        }
    case "UNASSIGN":
        {
            caption = labelUnAssigned;
            break;
        }
    case "completeSearch":
        {
            caption = labelCompleted;
            break;
        }
    case "FAILURE":
        {
            caption = labelFailed;
            break;
        }
    case "reverseSearch":
        {
            caption = labelReversed;
            break;
        }
    case "SENDTOHOST":
        {
            caption = labelAsynchronous;
            break;
        }
    case "tankSearch":
        {
            caption = labelTanked;
            break;
        }
    case "untankSearch":
        {
            caption = labelUntanked;
            break;
        }
         //12.1_MULTI_AUTH STARTS
        
         case "multiAuthSearch":
        {
            caption = labelMultiAuth;
            break;
        }
               case "discardedSearch":
        {
            caption = labelDiscarded;
            break;
        }
        
        
        //12.1_MULTI_AUTH ENDS
    }
    if (document.getElementById('TASKLIST_CAP'))
    /*FC 11.4 Changes Starts */
    //setInnerText(document.getElementById("TASKLIST_CAP"), "Workflow - " + caption); // Changed TASK LIST to Workflow - // Tiji Jan 18
    setInnerText(document.getElementById("TASKLIST_CAP"), labelworkflow + " - " + caption);// Changed TASK LIST to Workflow - // Tiji Jan 18
    /*FC 11.4 Changes Ends */
}

function changeDateFormat() {
    var dateTDs = document.getElementsByName('StartDateTD');
    for (var index = 0; index < dateTDs.length; index++) {
        setInnerText(dateTDs[index], parent.getShortDateStamp(getInnerText(dateTDs[index])));
    }
}

function openTimeOutPage() {
/* # BUG SEC-12-Patch-072 fixes start */
    openWindow("DummyPage", "TempForward.jsp?action=BranchServlet&funcid=DUMMY&brnStat=ONLINE&actionType=initiate&msgType=WORKFLOW&date="); 
/* # BUG SEC-12-Patch-072 fixes end */    
}

function refreshTransactionData(tabId){
if(tabId == 'spanWorkflowSearch'){
    var currentTxnStatus = "";
    var myflag = "";
    if(document.getElementById('WorkflowQueryResults')){
    var anchorArr = document.getElementById('WorkflowQueryResults').getElementsByTagName("A");
    for(var cnt = 0; cnt < anchorArr.length ; cnt++){
      if(anchorArr[cnt].className == 'Astdselected'){
        currentTxnStatus = trim(anchorArr[cnt].innerHTML);
        break;
      }
    }
    doSearch2('','');
    var anchorArr = document.getElementById('WorkflowQueryResults').getElementsByTagName("A");
    for(var cnt = 0; cnt < anchorArr.length ; cnt++){
      if(trim(anchorArr[cnt].innerHTML) == currentTxnStatus){
        anchorArr[cnt].className = 'Astdselected';
      }
      else{
         anchorArr[cnt].className = 'Astd';
      }
    }
    if(currentTxnStatus == ""){
      currentTxnStatus = mainWin.getItemDesc("LBL_PENDING"); //Fix for 24570115
      myflag="load";
    }
    getGroupcnt(currentTxnStatus,'',myflag,''); 
    }
  }
  else{
   fireHTMLEvent(document.getElementById('anchor'+tabId), 'onclick');
  }
}

//function fnCreateWorkFlowHtml(){//12.1_multi_auth changes
function fnCreateWorkFlowHtml(count1){ //12.1_multi_auth changes
  if(document.getElementById('WorkflowcntQueryResults')){
    var tdArr = document.getElementById('DIVWfresultsTBL1').getElementsByTagName('TD');
    for(var tdCnt = 0; tdCnt < tdArr.length ; tdCnt++){
    tdArr[tdCnt].innerHTML = "&nbsp;";
    tdArr[tdCnt].removeAttribute("onkeydown");
    }
    
}else{
      var count=0;
    var labelSearchResult = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    var labelActionType = mainWin.getItemDesc("LBL_ACTION_TYPE");
    var labelActionCount = mainWin.getItemDesc("LBL_ACTION_COUNT");
    var html = '<div class=\'DIVmultiplebox\' id=\'DIVWfcaptionSR1\' onkeydown=\"return handleWfQueryKeyDownEvents(event)\"><h2 class=\"hh4dash\">' + labelSearchResult + '</h2>';
    html += "<DIV style=\"PADDING-BOTTOM: 3px; FLOAT: right;visibility:hidden;\" id=btnDivTxnCnt>"; 
    html +="<BUTTON id=wfTabBtnPrev1 class=Abut type=submit>" ;
    html +="<span title=\"Previous\" class=\"WidgetonePrevious\"></span></BUTTON><BUTTON id=wfTabBtnNext1 class=Abut type=submit><span class=\"WidgetoneNext\" title=Next></span>";
    html +="</BUTTON><BUTTON id=btnrefreshd class=Abut onclick=fnRefreshData() type=submit style=\"display:none;\"><span class=\"WidgetoneRefresh\" title=\"Refresh\"></span></BUTTON>" ;
    html +="</DIV>";
    html += '<div id=\'DIVWfresultsTBL1\' class=\'DIVMultipleSmallInner\' style=\'display:block;clear:both;overflow:auto;\'>';
    html += '<TABLE id = \"WorkflowQueryResults\" border=\'0\'  style=\'width:100%\' cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'WorkFlow Search Results\' >';
    html += "<thead><tr><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>" + labelActionType + "</SPAN></th><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>" + labelActionCount + "</SPAN></th></tr></thead>";
    html += '<tbody>';
//	for(i=0;i<12 ;i++){  //12.1_multi_auth changes
	for(i=0;i<count1 ;i++){ //12.1_multi_auth changes
		if (count % 2 == 0){
			html += '<tr class=\'TBLoneTR\'>';        
        }else {
			html += '<tr class=\'TBLoneTRalt\'>';
        }
        count=count+1;
		html += "<td scope=\'row\'>&nbsp;</td>";
		html += '<td>&nbsp;</td>';
		html += "</tr>";
	}
	html += '</tbody>';
    html += '</table>';       
    html += '</div></div>';
	
	document.getElementById('searchTxnCntResultDiv').style.display='';
        if(document.getElementById('searchWfGrpResultDiv')) {
        	document.getElementById('searchWfGrpResultDiv').style.display='none';
		}
        if(document.getElementById('TRANSDETAILS')) {
        	document.getElementById('TRANSDETAILS').innerHTML='';
		}
        document.getElementById('WRKFLWDETAILS').innerHTML='';
        document.getElementById('WRKFLWDETAILS').innerHTML=html;
    }
}

function fnCreateTransactionHtml(){
  if(document.getElementById('WorkflowcntQueryResults')){
  var tdArr = document.getElementById('DIVWfresultsTBL2').getElementsByTagName('TD');
   for(var tdCnt = 0; tdCnt < tdArr.length ; tdCnt++){
      tdArr[tdCnt].innerHTML = "&nbsp;";
      tdArr[tdCnt].removeAttribute("onkeydown");
     
   }
    
  }else{
    var labelTransType = mainWin.getItemDesc("LBL_TRANS_TYPE");
    var labelTransCount = mainWin.getItemDesc("LBL_TRANS_COUNT");
    var labelFunctionId = mainWin.getItemDesc("LBL_FUNCTION_ID");
    var labelTransDetails = mainWin.getItemDesc("LBL_TRANS_DETAILS");
    var html = '<div class=\'DIVmultiplebox\' id=\'DIVWfcaptionSR2\' onkeydown=\"return handleWfQueryKeyDownEvents(event)\"><h2 class=\"hh4dash\">'+ labelTransDetails +'</h4>';
    html += "<DIV style=\"PADDING-BOTTOM: 3px; FLOAT: right;visibility:hidden;\" id=btnDivTxnCnt1>"; 
    html +="<BUTTON id=wfTabBtnPrev1 class=Abut type=submit>" ;
    html +="<span title=\"Previous\" class=\"WidgetonePrevious\"></span></BUTTON><BUTTON id=wfTabBtnNext1 class=Abut type=submit><span class=\"WidgetoneNext\" title=Next></span>" ;
    html +="</BUTTON><BUTTON id=btnrefreshd class=Abut onclick=fnRefreshData() type=submit style=\"display:none;\"><span class=\"WidgetoneRefresh\" title=\"Refresh\"></span></BUTTON>" ;
    html +="</DIV>";
    html += '<div id=\'DIVWfresultsTBL2\' class=\'DIVMultipleSmallInner\' style=\'display:block;clear:both;overflow:auto;\'>';
    html += '<TABLE id = \"WorkflowcntQueryResults\" border=\'0\' style=\'width:100%\' cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'WorkFlow Search Results\' >';
    html += "<thead><tr><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>" + labelTransType + "</SPAN></th><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>" + labelTransCount + "</SPAN></th><th scope=\'col\' class=\'TDnone\'><SPAN class=SPNtext>" + labelFunctionId + "</th></tr></thead>";
    html += '<tbody>';
	for(i=0;i<5 ;i++){ //9NT1525_1203_18742499 Changed from 6 to 5 as BCTXN tag removed from Workflow
		html += '<tr>'; 
		html += "<td scope=\'row\'>&nbsp;</td>";
		html += '<td>&nbsp;</td>';
		html += "<td class=\'TDnone\'></td>";
		html += "</tr>";
	}
	html += '</tbody>';
    html += '</table>';       
    html += '</div></div>';
	
	document.getElementById('searchWfGrpResultDiv').style.display='';
  document.getElementById('TRANSDETAILS').innerHTML=html;
  }
}

function fnHandleKeyEvents(event) {
    var event = window.event || event;
    if (event.keyCode == 13) {//Enter Key
        var eventElem = getEventSourceElement(event);
        if (eventElem.name != "LinkedCustomers") {
            fnCustomerQuery();
            preventpropagate(event);
            return false;
        }
    }
    if (event.keyCode == 120) {//F9 key
      var eventElem = getEventSourceElement(event);
      if (eventElem.tagName == "INPUT" && eventElem.type.toUpperCase() == 'TEXT') {
        if (typeof (eventElem.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
          eventElem.parentNode.getElementsByTagName("BUTTON")[0].click();
          preventpropagate(event);
          return false;
        }
      }
    }
}

function handleWfQueryKeyDownEvents(evnt) {
  var e = window.event || evnt;
  var srcEle = getEventSourceElement(e);
  if (e.keyCode == 9) {//tab keyd
    if(srcEle.id == 'btnWrkFlwReset'){
      if((document.getElementById("WorkflowQueryResults")) &&  (document.getElementById("WorkflowQueryResults").getElementsByTagName("A")[0])){
        setTimeout(function(){document.getElementById("WorkflowQueryResults").getElementsByTagName("A")[0].focus();},0);   
      }
	  else{
		document.getElementById("DIVTabContentDBoardWorkFlow").getElementsByTagName("A")[0].focus();	  
	  }
	  preventpropagate(e);
	  return false;
    }else if((srcEle.parentNode.parentNode.parentNode.parentNode.id == "WorkflowQueryResults") && (document.getElementById("WorkflowcntQueryResults")) && (document.getElementById("WorkflowcntQueryResults").getElementsByTagName("A")[0])){
      document.getElementById("WorkflowcntQueryResults").getElementsByTagName("A")[0].focus();
      preventpropagate(e);
      return false;
      }else if(srcEle.id == 'btnWrkFlwSearch'){
        document.getElementById("btnWrkFlwReset").focus();
        preventpropagate(e);
        return false;
       }else {
         document.getElementById("DIVTabContentDBoardWorkFlow").getElementsByTagName("A")[0].focus();
         preventpropagate(e);
         return false;
       }
  } else if (e.keyCode == 38) {//up arrow
        if (srcEle.tagName.toUpperCase() == "A" || srcEle.tagName.toUpperCase() == "SPAN") {
            srcEle = srcEle.parentNode;
        }
        if (srcEle.parentNode.tagName.toUpperCase() == "TR" && (getToolBarPreviousSibling(srcEle.parentNode) && getToolBarPreviousSibling(srcEle.parentNode).children[0].tagName.toUpperCase() == "TD")) {
            if (getToolBarNextSibling(srcEle)) {
                getToolBarPreviousSibling(srcEle.parentNode).getElementsByTagName("A")[0].focus();
            } else {
                getToolBarPreviousSibling(srcEle.parentNode).getElementsByTagName("SPAN")[0].focus();
            }
        }
		preventpropagate(e);
        return false;
    } else if (e.keyCode == 40) {//down arrow
        if (srcEle.tagName.toUpperCase() == "A" || srcEle.tagName.toUpperCase() == "SPAN") {
            srcEle = srcEle.parentNode;
        }
        if (srcEle.parentNode.tagName.toUpperCase() == "TR" && getNextSibling(srcEle.parentNode)) {
            if (getToolBarNextSibling(srcEle)) {
                getToolBarNextSibling(srcEle.parentNode).getElementsByTagName("A")[0].focus();
            } else {
                getToolBarNextSibling(srcEle.parentNode).getElementsByTagName("SPAN")[0].focus();
            }
        }
		preventpropagate(e);
        return false;
    } else if (e.keyCode == 13) {//enter key
		if(srcEle.id != "btnWrkFlwReset"){
        if (srcEle.tagName.toUpperCase() != "A" && srcEle.tagName.toUpperCase() != "SPAN") {
            srcEle = srcEle.children[0];
        }
		}
        if (srcEle.tagName.toUpperCase() == "A" || srcEle.tagName.toUpperCase() == "BUTTON"){
            if(getIEVersionNumber() > 0)
                fireHTMLEvent(srcEle,"onclick");
            else {
                var fnEval = new Function("event",srcEle.getAttribute("onclick"));  
                fnEval(e);
            }
        }
		preventpropagate(e);
        return false;
    }
}


