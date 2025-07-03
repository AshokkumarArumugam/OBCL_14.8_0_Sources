/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : FCJReport.js
**
** Module       : FCJWeb
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

Copyright © 2004-2014   by Oracle Financial Services Software Limited.. 


  Modified By           : Rishabh Gupta
  Modified On           : 26-Sept-2016
  Modified Reason       : Changes done to the execute the script elements in case of IE11
  Search String         : 12_0_3_RETRO_12_2_23652359
  SFR No.               : 23652359
*/

//var dlgArg = dialogArguments;
var servletURL = "FCClientHandler";

var isExitTriggered = false;

var gIsAuditExist = true;
var gFromSummary = true;
ShowSummary = "FALSE";// TODO
var txnBranchUC         = new Array();
var g_txnBranch         = mainWin.CurrentBranch;
if (!mainWin.txnBranch[mainWin.CurrentBranch])
    mainWin.txnBranch[mainWin.CurrentBranch] = new setTxnBrnInfo();

function resetIndex() {
    for (var dataSrcIndex = 0; dataSrcIndex < dataSrcLocationArray.length; dataSrcIndex++) {
        dbIndexArray[dataSrcLocationArray[dataSrcIndex]] = 1;
    }
}

//------------------------------------------------------------------------------
// FUNCTIONS CALLED FROM Launcher.jsp for DHTML events.
//------------------------------------------------------------------------------




function fnFocus(){
    /*mainWin.setActiveWindow(window);
    mainWin.document.getElementById("fastpath").value = functionId;
    mainWin.showToolbar(functionId, '', '');*/
    mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);    
    if(userFuncId!='' && userFuncId!='null'){
        mainWin.document.getElementById("fastpath").value = userFuncId;
    }else{
        mainWin.document.getElementById("fastpath").value = functionId;
}
    showToolbar(functionId, '', '');

}

function fnLoad(xmlFileName, xslFileName, screenName){
    fnPreLoad();
    /*mainWin.setActiveWindow(window);
    var html = ShowXML(xmlFileName, screenName, xslFileName);
    ResTree.insertAdjacentHTML("afterBegin", html);*/
    try {
    var html = ShowXML(xmlFileName, screenName, xslFileName);
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes
            document.getElementById("ResTree").insertAdjacentHTML("beforeEnd", html);
        } else {
            document.getElementById("ResTree").appendChild(html);
        }
    } catch(e) {
        debugs("Failed in ShowXML", "");
    }
    document.getElementById("toolbar").style.display = "block";
    /* Code for executing the Script inside XSL files - Start */
   
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
        try {
            var scriptElements = document.getElementsByTagName("script");
            for(var i = 0; i < scriptElements.length; ++i) {
                if(scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));  
                    fnEval();
                }
            }
        } catch(e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 start*/
    else if(getBrowser().indexOf("IE") != -1 && ((getBrowser().indexOf("10") != -1) || (getBrowser().indexOf("11") != -1))){// 12_0_3_RETRO_12_2_23652359 //ie11 changes
      try {
            var scriptElements = document.getElementsByTagName("script");
            for (var i = 0; i < scriptElements.length; ++i) {
                if (scriptElements[i].defer == true) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(scriptElements[i].innerHTML);  
                    fnEval();
                }
            }
        } catch (e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 end*/
    /* Code for executing the Script inside XSL files - End */

    if (document.getElementById("DIV_BLK_AUDIT") == null || document.getElementById("DIV_BLK_AUDIT") == "null"){
        gIsAuditExist = false;
    }
    debugs(html, "P");

    fnBuildMultipleEntryArray();
    disableForm();
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
    fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
    fnCalcHgt();

    fnPostLoad();
    document.getElementById("BTN_EXIT_IMG").focus();
    //fnFocus();
    showToolbar(functionId, '', '');
}

function fnNew(){
    return;
}

function fnUnlock(){
    return;
}

function releaseLock(){
    return false;
}

function fnEnterQuery(){
    return;
}

function fnExecuteQuery(reqDOM){
    return;
}

function fnSave(){
    window.focus();
    if (gIsAuditExist){
        appendData(document.getElementById("DIV_BLK_AUDIT"));
    }
    appendData(document.getElementById("TBLPage" + strCurrentTabID));
    if (typeof(l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") appendData(document.getElementById("TBLPage" + l_HeaderTabId));
    if (!fnPreSave()){
        var validate = mainWin.ValidateFlag;
        if (validate == 'N'){
            debugs("No Validation at Client Side", "P");
        }
        if (mainWin.ValidateFlag == 'Y'){
            return;
        }
    }

    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var temp_gAction = gAction;
    if (fcjResponseDOM){
        debugs(getXMLString(fcjResponseDOM), "P");
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = "";
        var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
        if (msgStatus == 'FAILURE'){
            l_xPath += "FCUBS_ERROR_RESP";
        } else if (msgStatus == "SUCCESS" || msgStatus == "WARNING"){
            l_xPath += "FCUBS_WARNING_RESP";
        }

        messageNode = selectSingleNode(fcjResponseDOM, l_xPath);
        if (msgStatus == 'SUCCESS'){
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);

            disableForm();
            fnSetExitButton(false);
            gAction = "INIT";
        } else if (msgStatus == 'WARNING'){
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
        }

        var returnVal = displayResponseReport(messageNode, msgStatus);

        //showToolbar(functionId, '', '');
        if (msgStatus == 'FAILURE'){
            return;
        }

    } else{
        //alert("Processing Has Failed");
        //CHANGES FOR NLS
        alert(mainWin.getItemDesc("LBL_PROCESS_FAIL"));
        return;
    }

    fnPostSave();

}
function displayResponseReport(messageNode, msgStatus) {
        if (!msgStatus || typeof(msgStatus) == 'undefined') {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        }
        if(messageNode!= null){
        if(msgStatus == 'SUCCESS') {
            alertAction = "SUCCESS";
            type = "I";
        } else if (msgStatus == 'WARNING') {
            alertAction = "OVERRIDE";
            type = "O";
        } else if (msgStatus == 'FAILURE') {
            alertAction = "ERROR";
            type = "E";
        }
        mask();
        showAlerts(getXMLString(messageNode), type);
        } /*else {
            mask();
            showAlerts(fnBuildAlertXML("", "E", mainWin.getItemDesc("LBL_SERVER_FAILED")), "E");
            alertAction = "UNMASK";
            return "FAILURE";
        }*/
    }
function fnExit(fromAlert){
    /*Commented below code as part of fix for 19207583*/
	/*if (fromAlert == null) {
    } else {*/
    if (gAction != ""){
        //appendErrorCode('ST-COM012', "");
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
        alertAction = "EXITACTION";
    } else{
        dbDataDOM = null;
        resetElements();
        isExitTriggered = true;
        //dlgArg.mainWin.frames["FrameToolbar"].showToolbar("", "", "");//TODO
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
        }
    //} /*Commented as part of fix for 19207583*/
}

function postQuery(objReqDOM){
    var qryResponse = fnPost(objReqDOM, servletURL, functionId);
    return qryResponse;
}

function fnSetExitButton(enableBtn){
    fnEnableElement(document.getElementsByName("BTN_EXIT")[0]);
    if (enableBtn){
        if (gAction == "ENTERQUERY"){
            document.getElementById("BTN_EXIT_IMG").src = cache2.src;
        } else{
            document.getElementById("BTN_EXIT_IMG").src = cache2.src;
        }
    } else{
        document.getElementById("BTN_EXIT_IMG").src = cache1.src;
    }
}

function fnValidateMandatory(){
    var validate = true;
    var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
    var tempVal = "";
    for (var elemIndex = 0; elemIndex < elements.length; elemIndex++){
        if (elements[elemIndex] && elements[elemIndex].type.toUpperCase() == "RADIO") continue;
        if (elements[elemIndex].getAttribute("REQUIRED") == -1){
            tempVal = getFieldData(elements[elemIndex]);
            if (isNull(tempVal)){
                var label = fnGetLabel(elements[elemIndex]);
                appendErrorCode('ST-COM013', label);
                validate = false;
            }
        }
    }
    var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
    for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++){
        if (elements1[elemIndex1].getAttribute("REQUIRED") == -1){
            tempVal = getFieldData(elements1[elemIndex1]);
            if (isNull(tempVal)){
                var label = fnGetLabel(elements1[elemIndex1]);
                appendErrorCode('ST-COM013', label);
                validate = false;
            }
        }
    }

    var elements = document.getElementById("ResTree").getElementsByTagName("SELECT");
    for (var elemIndex = 0; elemIndex < elements.length; elemIndex++){
        if (elements[elemIndex].getAttribute("REQUIRED") == -1) {
            tempVal = getFieldData(elements[elemIndex]);
            if (isNull(tempVal)){
                var label = fnGetLabel(elements[elemIndex]);
                appendErrorCode('ST-COM013', label);
                validate = false;
            }
        }
    }
    return validate;
}

function fnGetLabel(obj){
    var l_FldSetLbl = "";
    var l_DBT = "";
    if (obj.getAttribute("DBT")) l_DBT = obj.getAttribute("DBT");
    if (l_DBT) l_FldSetLbl = fnGetFldSetLbl(l_DBT);
    var l_temp = obj;
    if (l_temp.getAttribute("DBT") == null || l_temp.getAttribute("DBT") == "") {
        var l_parent = l_temp.parentNode;
        while (! (l_parent.tagName == 'TABLE')){
            l_temp = l_parent;
            l_parent = l_temp.parentNode;
        }
        l_DBT = l_parent.getAttribute("DBT");
        l_FldSetLbl = fnGetFldSetLbl(l_DBT);
    }
    if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length > 0){
        return (mainWin.getItemDesc("LBL_MANDATORY") + obj.LABEL_VALUE + mainWin.getItemDesc("LBL_IN") + l_FldSetLbl);
    }

    if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length == 0){
        if (obj.getAttribute("REQUIRED") == -1)
            return mainWin.getItemDesc("LBL_MANDATORY") + obj.getAttribute("LABEL_VALUE");
        else 
            return obj.getAttribute("LABEL_VALUE");
    }
    return obj.name;
}

function fnGetFldSetLbl(v_DBT){
    var l_isMe = false;
    var l_Lbl = "";
    for (var l_Cnt = 0; l_Cnt < multipleEntryIDs.length; l_Cnt++){
        if (multipleEntryIDs[l_Cnt].toUpperCase() == "BLK_" + v_DBT.toUpperCase()){
            l_isMe = true;
            break;
        }
    }
    if (l_isMe){
        var l_FldSet = document.getElementById("LBL_FLDSET_BLK_" + v_DBT);
        if (l_FldSet)
            return l_FldSet.value;
        else
            return "";
    }
    return "";
}

function fnValidateDataType(){
    var validate = true;
    var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
    var tempVal = "";

    var valReq = true;
    var dbFCJDomnew = loadXMLDoc(msgxml);
    var isQueryTypes = new Array();
    var xmlNodes = new Array();
    xmlNodes = selectNodes(dbFCJDomnew, "//FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@ ISQUERY='1']");
    for (var x = 0; x < xmlNodes.length; x++){
        isQueryTypes[x] = xmlNodes[x].getAttribute("TYPE");
    }
    for (var elemIndex = 0; elemIndex < elements.length; elemIndex++){
        valReq = true;
        if (elements[elemIndex].type != 'hidden'){
            tempVal = getFieldData(elements[elemIndex]);
            if ((elements[elemIndex].getAttribute("REQUIRED") == '0') && (tempVal == '')){
                continue;
            }
            for (var j = 0; j < isQueryTypes.length; j++){
                if (elements[elemIndex].getAttribute("DBT") == isQueryTypes[j]){
                    valReq = false;
                }
            }
            if (valReq){
                if (elements[elemIndex].getAttribute("DTYPE") == 'NUMERIC' || elements[elemIndex].getAttribute("DTYPE") == 'NUMBER' || elements[elemIndex].getAttribute("DTYPE") == 'DECIMAL' || elements[elemIndex].getAttribute("DTYPE") == 'SMALLINT' || elements[elemIndex].getAttribute("DTYPE") == 'INTEGER'){
                    tempVal = getFieldData(elements[elemIndex]);
                    if (!isNumeric(tempVal)){
                        var l_Label = fnGetLabel(elements[elemIndex]);
                        appendErrorCode('FC-MAINT02', l_Label);
                        validate = false;
                    }
                }
                if (elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR' || elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR2' || elements[elemIndex].getAttribute("DTYPE") == 'CHAR'){
                    tempVal = getFieldData(elements[elemIndex]);
                    if (!isAlphaNumeric(tempVal)){
                        var l_Label = fnGetLabel(elements[elemIndex]);
                        appendErrorCode('FC-MAINT02', l_Label);
                        validate = false;
                    }
                }
            }
        }
    }

    var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
    for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++){
        tempVal = getFieldData(elements1[elemIndex1]);
        if ((elements1[elemIndex1].getAttribute("REQUIRED") == '0') && (tempVal == '')){
            continue;
        }
        if (elements1[elemIndex1].getAttribute("DTYPE") == 'NUMERIC' || elements1[elemIndex1].getAttribute("DTYPE") == 'DECIMAL' || elements1[elemIndex1].getAttribute("DTYPE") == 'SMALLINT' || elements1[elemIndex1].getAttribute("DTYPE") == 'INTEGER' || elements1[elemIndex1].getAttribute("DTYPE") == 'NUMBER'){
            tempVal = getFieldData(elements1[elemIndex1]);
            if (!isNumeric(tempVal)){
                var l_Label = fnGetLabel(elements1[elemIndex1]);
                appendErrorCode('FC-MAINT02', l_Label);
                validate = false;
            }
        }
        if (elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR' || elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR2' || elements1[elemIndex1].getAttribute("DTYPE") == 'CHAR'){
            tempVal = getFieldData(elements1[elemIndex1]);
            if (!isAlphaNumeric(tempVal)){
                var l_Label = fnGetLabel(elements1[elemIndex1]);
                appendErrorCode('FC-MAINT02', l_Label);
                validate = false;
            }
        }
    }
    return validate;
}


function fnShowCallform_CVS_MAIN(functionId, ScreenName){
    screenArgs = getOtherScreenArgs(functionId, ScreenName);
    screenArgs['SCREEN_NAME'] = ScreenName;
    screenArgs['FUNCTION_ID'] = functionId;
    appendData(document.getElementById('TBLPage' + strCurrentTabID));
    screenArgs['TSNAME'] = document.getElementsByName('TSNAME')[0].value;
    screenArgs['TSVALUE'] = document.getElementsByName('TSVALUE')[0].value;
	//9NT1368 SFR 1238 -- Cross Browser Issue -- Start -- 06-08-2010
    /*if (document.getElementById('REPORT_ID')){
        screenArgs['REPORT_ID'] = document.getElementById('REPORT_ID').value;
    } else{
        screenArgs['REPORT_ID'] = "";
    }*/
	
	if (document.getElementsByName('REPORT_ID')[0]){
	    screenArgs['REPORT_ID'] = document.getElementsByName('REPORT_ID')[0].value;
    } else{
        screenArgs['REPORT_ID'] = "";
    }
	//9NT1368 SFR 1238 -- Cross Browser Issue -- End -- 06-08-2010
    fnShowCallForm(screenArgs);
   /* if (mainWin.applicationName == "FCIS"){
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
    }*/
}

function fnHideProcessWait(){
    var t = setTimeout("mainWin.fnHideProcess();", 1000);
}

function fnCloseAlertWin(event) {
    if (alertAction == "EXITACTION") {
        unmask();
        var l_RelLockStatus = true;
        if (gAction == "MODIFY"){
            l_RelLockStatus = releaseLock();
        }
        if (l_RelLockStatus){
            if (gAction == "ENTERQUERY"){
                showData(dbStrRootTableName, 1);
            } else{
                resetElements();
                dbDataDOM =null;
            }
			/*Fix for 19274492 Starts*/
            /*gAction = "";
            disableForm();
            multiBrnScrOpened = false;
            fnSetExitButton(false);
            showToolbar("", "", "");*/
            //fnExitSubScreen(); //Changes for FCUBSV.UM_10.2.0.0.LOANORIGINATION.1.0
			dbDataDOM = null;
            resetElements();
            isExitTriggered = true;
            var winObj = mainWin.document.getElementById(seqNo);
            mainWin.fnExit(winObj);
			/*Fix for 19274492 Ends*/
            return;
        } else{
            return;
        }
    } else if (alertAction == "ERROR") {
        unmask();
        fnPostProcessResponse("FAILURE");
        return false;
    } else if (alertAction == "SUCCESS") {
        unmask();
        fnPostProcessResponse("SUCCESS");
        return true;
    } else if (alertAction == "UNMASK") {
        unmask();
    } 
}

function fnExitAlertWin(evnt) {
    unmask();
    if (alertAction == "EXITACTION") {
        return ;
    } 
}
