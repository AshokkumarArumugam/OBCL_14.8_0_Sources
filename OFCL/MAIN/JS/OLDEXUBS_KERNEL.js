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
 **  File Name          : OLDEXUBS_KERNEL.js
 **  Purpose            :
 **  Called From        :
 **
 **  CHANGE LOG
 **  Last Modified By   :
 **  Last modified on   :
 **  Full Version       :
 **  Reason             :
 
 **  Modified By   		: Kavitha Asokan 
 **  Modified on   		: 22-07-2024
 **	Modified Reason	   	: Unable to select record after selecting the row - modified the type for checkbox selection - "oj-input-text" ==> "INPUT" 
 **  Bug no     		: Bug#36850522  

 ****************************************************************************************************************************/
var len = 0;
var msob_tchk = 0;
var selected_row = 0;
var curpage;
var over_flag = false;
var l_Multitripid = '';
var bulkPkValues = "";
var REQ_LIST;

function fnCheck() {
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    msob_tchk = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //Bug#36850522 
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) { //Bug#36850522 
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }
        }
        else 
            break;
    }
    if (msob_tchk == 0) {
        showErrorAlerts('IN-HEAR-206');
        return false;
    }
    return true;
}

function fnMultiCheck() {
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    msob_tchk = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //Bug#36850522 
            getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = true; //Bug#36850522 
        }
        else 
            break;
    }
    return true;
}

function fnCreateBody_OLSEXUBS() {
    var msgxml_olsexubs = "<FCUBS_BODY>";
    msgxml_olsexubs += '<FLD>';
    msgxml_olsexubs += '<FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLVWS_IF_OLCONTRACT_MASTER">VERSIONNO~SEQNO~LATESTESN~TRADEREFNO~STATUS~CONTRACTREFNO~REQ_LIST</FN>';
    msgxml_olsexubs += '</FLD>';
    msgxml_olsexubs += '<REC RECID="1" TYPE="BLK_OLVWS_IF_OLCONTRACT_MASTER"><FV/></REC></FCUBS_BODY>';
    reqDom = loadXMLDoc(msgxml_olsexubs);
    var blkCdtSecNd = "";
    blkCdtSecNd = reqDom.createCDATASection('~~~~~~' + REQ_LIST);
    selectSingleNode(selectSingleNode(reqDom, "//REC[@RECID='1'][@TYPE='BLK_OLVWS_IF_OLCONTRACT_MASTER']"), "FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom, "//FCUBS_BODY");
}

function fn_Process() {
    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><ENTITY/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM = loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/USERID"), mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"), mainWin.entity);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "OLSEXUBS");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"), gAction);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"), "OL");
    if (over_flag) {
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/MULTITRIPID"), l_Multitripid);
        over_flag = false;
    }
    var bodyReq = fnCreateBody_OLSEXUBS();
    var node = selectSingleNode(exlRequestDOM, "//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    if (!fnResponse()) {
        return false;
    }
    return true;
}

function fnResponse() {
    var fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == 'FAILURE') {
            var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP"));
            var returnVal = displayResponse(messageNode, msgStatus, 'E');
        }
        if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
            var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP"));
            var returnVal = displayResponse(messageNode, msgStatus, 'I');
        }
        fnRefreshSummary();
    }
}

function fnPostAsync(fcjMsgDOM, servletURL, functionID) {
    if (fcjMsgDOM != null) {
        var strFormData = getXMLString(fcjMsgDOM);
        objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", servletURL, true);
        objHTTP.setRequestHeader("FUNCTIONID", functionID);
        objHTTP.setRequestHeader("OPERATION", gAction);
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        if (strFormData.indexOf("<ATTACHMENTS>") >  - 1) {
            objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
        }
        else {
            objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
        }
        objHTTP.send(strFormData);
    }
}

function fnResend() {
    g_prev_gAction = gAction;
    if (fnCheck()) {
        bulkPkValues = "";
        if (fnGetREQList()) {
            gAction = "RESEND";
            if (!fn_Process()) {
                gAction = g_prev_gAction;
            }
        }
    }
}

function fnPreShowDetail_Sum_KERNEL(arg) {
    return false;
}

function fnGetREQList() {
    REQ_LIST = "";
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    var msob_tchk = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //Bug#36850522 
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) { //Bug#36850522 
                msob_tchk = msob_tchk + 1;
                var contract = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]);
                var seqno = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]);
                var pkey = contract + '^' + seqno;
                REQ_LIST = REQ_LIST + pkey + ':';
            }
        }
    }
    if (msob_tchk == 0) {
        showErrorAlerts('IN-HEAR-206');
        return false;
    }
    return true;
}