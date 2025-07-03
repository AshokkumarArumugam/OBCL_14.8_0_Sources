/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtdashboardTlBar.js
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
Copyright © 2004-2014  by Oracle Financial Services Software Limited..
********************************************************************************************
*/
function ExtshowToolbarDashboard(funcid, txnstat, authstat, showExecute) {
    var txn_auth_status = new Array(); //Array used to store txn and auth status
    // if function id is null, disable all buttons
    if (typeof (funcid) == 'undefined' || funcid == '') {
        deleteAllButtons();
        if (gAction == "ENTERQUERY") {
            addDashboardToolbar("ExecuteQuery");
        }
        return;
    }
    //disabling toolbar on launch of summary, callform, Query, batch screens
    var screenTypes = "SCQB";
    if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && gActiveWindow.screenType != 'WB') {
        deleteAllButtons();
        return;
    }
    //Disabling toolbar for eod status other than N (Also applicable for host screens)
    if (mainWin.BranchEoi != "N" && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y') {
        deleteAllButtons();
        return;
    }

    // dbDataDom is empty (Screen just launched without any data)
    if (dbDataDOM == null) {
        if (gAction == "ENTERQUERY") {
            deleteAllButtons();
            addDashboardToolbar("ExecuteQuery");
            return;
        } else {
            deleteAllButtons();
            finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
            //function that enables or disables the toolbar
            ExtfnEnableAcns_OnActionCode(funcid, finalarr, mainWin.actions_arr);
            if (mainWin.BranchEoi == 'N') {
                addDashboardToolbar("EnterQuery");
            }
            return;
        }
    } else {
        //Obtain final array based on function rights
        if (screenType != "WB") {
            finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
        }
        // Getting txn and auth status
        txn_auth_status = getTxnAndAuthStatus();
        /*If txnstat and authstat are passed from FID.js*/
        if (typeof (txnstat) == "undefined" || (typeof (txnstat) != "undefined" && txnstat == "")) {
            txnstat = txn_auth_status[0];
        }
        if (typeof (authstat) == "undefined" || (typeof (authstat) != "undefined" && authstat == "")) {
            authstat = txn_auth_status[1];
        }
        if (txn_auth_status) if (screenType == "WB") {
            if (gAction == "NEW" || gAction == "HOLD" || gAction == "") {
                gAction = "NEW";
                deleteAllButtons();
                addDashboardToolbar("Save");

                // FCUBS 11.4 Confirmation Changes Starts             
                if (typeof (dataObj) != "undefined" && dataObj.action == "ENRICH") {
                    if (mainWin.functionDef[funcid].slipReqd == "Y") {
                        addDashboardToolbar("Generate");
                    }
                    if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                        addDashboardToolbar("Confirm");
                    }
                }

                // FCUBS 11.4 Confirmation Changes Ends
                addDashboardToolbar("Hold");
                enableDeleteForIPR();
                return;
            }
            if (gAction == "VIEW") {
                deleteAllButtons();
                gAction = 'VIEW';
                enableDeleteForIPR();
                //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
                if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                    addDashboardToolbar("Generate");
                }
                //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
                return;
            }
            if (gAction == "REMOTEAUTH" || gAction == "AUTH") {
                deleteAllButtons();
                deleteDashboardToolbar("Save");
                gAction = 'REMOTEAUTH';
                addDashboardToolbar("Authorize");
                deleteDashboardToolbar("Hold");
                enableDeleteForIPR();
                return;
            }

            if ((gAction == "REVERSE") || (gAction == "GENERATE")) {
                deleteAllButtons();
                // FCUBS 11.4 Confirmation Changes Starts
                if (typeof (dataObj) != "undefined") {
                    if (dataObj.action == "ENRICH") {
                        addDashboardToolbar("Save");
                        if (mainWin.functionDef[funcid].slipReqd == "Y") {
                            addDashboardToolbar("Generate");
                        }
                        if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                            addDashboardToolbar("Confirm");
                        }
                    } else {
                        addDashboardToolbar("Reverse");
                        fnEnableGenerateButton();
                        //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
                        if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                            addDashboardToolbar("Generate");
                        }
                    }
                }
                return;
            }
            return;
        }
        if ((gAction == "" || gAction == "EXECUTEQUERY" || gAction == "VIEWMNTLOG") && (dbDataDOM != null)) {
            deleteAllButtons();
            finalarr = finalarrBasedOnTxnRights(finalarr, funcid, txnstat, authstat);
            //call the function that enables and disables the Tool bar based on the finalArr
            enableOrDisableBasedOnLastAction(finalarr);
            addDashboardToolbar("EnterQuery");
            return;
        }
        //enable and disable buttons according to gAction
        if (gAction == "NEW" || gAction == "MODIFY") {
            deleteAllButtons();
            addDashboardToolbar("Hold");
            addDashboardToolbar("Save");
            return;
        }
        if (gAction == "LIQUIDATE" || gAction == "ROLLOVER" || (mainWin.applicationName == "FCIS" && gAction == "DELEGATE")) {
            //if (gActiveWindow.gAction == "DELETE" || gActiveWindow.gAction == "CLOSE" ||gActiveWindow.gAction == "REOPEN" ||gActiveWindow.gAction == "REVERSE" || gActiveWindow.gAction == "ROLLOVER"|| gActiveWindow.gAction == "CONFIRM"|| gActiveWindow.gAction == "LIQUIDATE" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
            for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                deleteDashboardToolbar(finalarr[l_Itr]);
            }
            addDashboardToolbar("Save");
            return;
        }
        // Problem in obtaining gAction. Disable the toolbar.
        else {
            deleteAllButtons();
            //hideToolBar();
            return;
        }
    }
}

function deleteAllButtons() {
    document.getElementById("TABlist2").innerHTML = "";
}

function addDashboardToolbar(action) {
    var liElements = document.getElementById("TABlist2").childNodes;
    var cnt = "0";
    for (var i = 0; i < liElements.length; i++) {
        if (getInnerText(liElements[i].childNodes[0]) == action) {
            cnt = "1";
        }
    }
    if (cnt == "0") {
        var liElem = document.createElement("li");
        liElem.innerHTML = '<a class=\"TBitem\" onclick=\"doActionDashboard(\'' + action + '\',event)\" href=\"#&quot;\">' + action + '</a>';
        document.getElementById("TABlist2").appendChild(liElem);
    }
}

function deleteDashboardToolbar(action) {
    var liElem = document.getElementById("TABlist2").childNodes;
    for (var i = 0; i < liElem.length; i++) {
        if (getInnerText(liElem[i].childNodes[0]) == action) {
            document.getElementById("TABlist2").removeChild(liElem[i]);
        }
    }
}

//JS Segregation changes starts.
function getDefaultRightsStr(funcid) {
    var finalRightsStr = "";
    //var objRights = new Array();//Array used to store menu rights
    var objRights = "";
    try {
        //objRights = new fnGetFinalRights();
        objRights = mainWin.document.getElementById("finalFunctionRights").value;

    } catch (e) {
        // do nothing if the user doesn't have rights for the branch
        return;
    }
    /*
    if(objRights[funcid] != "") {
        finalRightsStr = objRights[funcid];
    }
    */
	//change for bug id 14294364 : 11.2 version STDCIF -PROBLEM WITH ROLE RIGHTS [funcid changed to funcid+"+"]
    var funcidPos = objRights.indexOf(funcid+"=");
    if(funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos)+1, objRights.indexOf(";", funcidPos));
    }
    return finalRightsStr;
}

function fnEnableGenerateButton() {
    document.getElementById("Generate").className = "BTNicon";
    //document.getElementById("Generate").firstChild.className = "BTNicon";
    //document.getElementById("Generate").firstChild.src = theme_imagesPath + "/Toolbar/icGenerate.gif";
    document.getElementById("Generate").disabled = false;
}
//JS Segregation changes ends.

function finalarrBasedOnFuncRights(funcid, txnstat, authstat) {
    
    var finalRightsStr = getDefaultRightsStr(funcid);//JS Segregation changes.
    var j = mainWin.finalarr.length;
    l_OnceAuth = getOnceAuth();//JS Segregation changes.
	
    if (funcid && funcid != "") {
        for (i = 0; i < j; i++) {
            mainWin.finalarr.pop();
        }
        var i = 0,
            k = 0;
        var addIndex = 0;
        var l_Testing = "";
        var finalRights = "";
        while (finalRightsStr.indexOf('~') != -1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights; temp != 0; temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    if (mainWin.actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') continue;

                    mainWin.finalarr[k] = mainWin.actions_arr[i + addIndex];
                    k++;
                } else l_Testing = l_Testing + "0";
                i++;
            }
            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }
        var lastAction = "";
        for (i = 0; i < mainWin.finalarr.length; i++) {
            if (mainWin.finalarr[i] == lastAction) {
                var temp = mainWin.finalarr[i + 1];
                mainWin.finalarr[i + 1] = mainWin.finalarr[lastElement];
                for (j = i + 2; j < mainWin.finalarr.length; j++) {
                    temp1 = mainWin.finalarr[j];
                    mainWin.finalarr[j] = temp;
                    temp = temp1;
                }
            }
        }
        return mainWin.finalarr;
    }
}

function getTxnAndAuthStatus() {
    var txn_auth_status = new Array();

    var l_Txn_Auth_Stat = "";
    if (gAction == "NEW" || gAction == "MODIFY" || screenType == 'WB') {
        l_Txn_Auth_Stat = "1~2"; // paTCH fix.
    } else {
        if (routingType == "X") {
            l_Txn_Auth_Stat = fnGetExtTxnAuthStat();
        } else {
            l_Txn_Auth_Stat = gnGetTxnAuthStat();
        }
    }
    txn_auth_status[0] = l_Txn_Auth_Stat.split("~")[0];
    txn_auth_status[1] = l_Txn_Auth_Stat.split("~")[1];

    return txn_auth_status;
}

//JS Segregation changes starts.
function getAuthTxnNodeValue(objAuthTxn) {
    var authTxnNodeValue = "";
    if (objAuthTxn.length != 0) {
        var tagName = objAuthTxn[0].tagName;
        var type    = objAuthTxn[0].type;
        switch (tagName.toUpperCase()) {
            case 'SELECT':
            {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
            case 'TEXTAREA':
            {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
            default:
            {
                switch (type.toUpperCase()) {
                    case 'CHECKBOX':
                    {
                        if (objAuthTxn[0].checked) {
                            authTxnNodeValue = objAuthTxn[0].getAttribute("ON");
                        } else
                            authTxnNodeValue = objAuthTxn[0].getAttribute("OFF");
                        break;
                    }
                    case 'RADIO':
                    {
                        for (var i=0;i<objAuthTxn.length;i++) {
                            if(objAuthTxn[i].checked) {
                                authTxnNodeValue = objAuthTxn[i].value;
                                break;
                            }
                        }
                        break;
                    }
                    default:
                    {
                        authTxnNodeValue = objAuthTxn[0].value;
                        break;
                    }
                }
            }
        }
        return authTxnNodeValue;
    } else {
        return "1~2";
    }
}
//JS Segregation changes ends.

function fnGetExtTxnAuthStat() {
    var authStatNode = document.getElementsByName("AUTHSTAT");
	//JS Segregation changes starts.
    var l_AuthVal = getAuthTxnNodeValue(authStatNode);
    var txnStatNode = document.getElementsByName("TXNSTAT");
    var l_TxnVal = getAuthTxnNodeValue(txnStatNode);
	//JS Segregation changes ends.
    return (l_TxnVal + "~" + l_AuthVal);
}
//JS Segregation changes starts.
function getOnceAuth() {
    var l_OnceAuth = "N";
    if (applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    return l_OnceAuth;
}

//JS Segregation changes starts.
function finalarrBasedOnTxnRights(finalarr, funcid, txnstat, authstat) {
    l_OnceAuth = getOnceAuth();
    if (finalarr) {
        t1 = t[txnstat + '+' + authstat];
        var j = finalarr.length;
        var i = 0,
            k = 0,
            x = 0;
        var addIndex = 0;
        var finalArray = new Array();
        if (t1 != null) {
            if (finalarr.length > t1.length) {
                for (var k = 0; k < finalarr.length; k++) {
                    for (var x = 0; x < t1.length; x++) {
                        if (finalarr[k] == t1[x]) {
                            finalArray[finalArray.length] = finalarr[k];
                        }
                    }
                }
            } else {
                for (var k = 0; k < t1.length; k++) {
                    for (var x = 0; x < finalarr.length; x++) {
                        if (t1[k] == finalarr[x]) {
                            finalArray[finalArray.length] = t1[k];
                        }
                    }
                }
            }
        } else {
            return finalarr;
        }
    }
    return finalArray;
}
//JS Segregation changes ends.
function ExtfnEnableAcns_OnActionCode(funcid, finalarr, action_arr) {
    // in cas eof fcis --> N - Online , T - Offline.
    var l_OfflineAllowed = 'N';
    var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + functionId + "']");
    //Changes for new menuXML starts
    if (functionIdNode) {
        for (var i = 0; i < functionIdNode.attributes.length; i++) {
            if (functionIdNode.attributes[i].nodeName == "OFFLINEALLOWED") {
                l_OfflineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
                break;
            }
        }
    }

    if (gAction == "") {
        if (dbDataDOM == null) {
            for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {
                if (finalarr[l_Cnt].toUpperCase() == "NEW") {
                    if (mainWin.BranchEoi == 'N') {
                        addDashboardToolbar(finalarr[l_Cnt]);
                        addDashboardToolbar("EnterQuery");
                    } else {
                        if (l_OfflineAllowed != "Y") {
                            deleteDashboardToolbar(finalarr[l_Cnt]);
                            disableActionsInToolbar();
                        } else {
                            addDashboardToolbar(finalarr[l_Cnt]);
                        }
                    }
                } else {
                    deleteDashboardToolbar(finalarr[l_Cnt]);
                }
            }
        }
    }

    if (funcid.charAt(2).toUpperCase() == "S" || (mainWin.BranchEoi != "N" && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y')) { // Summary case
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            deleteDashboardToolbar(finalarr[l_Itr]);
        }
        addDashboardToolbar("Save");
    }
}

function enableOrDisableBasedOnLastAction(finalarr) {
    var lastAction = "";
    for (i = 0; i < finalarr.length; i++) {
        if (finalarr[i] == lastAction) {
            var temp = finalarr[i + 1];
            finalarr[i + 1] = finalarr[lastElement];
            for (j = i + 2; j < finalarr.length; j++) {
                temp1 = finalarr[j];
                finalarr[j] = temp;
                temp = temp1;
            }
        }

        if (finalarr[i]) {
            addDashboardToolbar(finalarr[i]);
        }
    }
}

function enableDeleteForIPR() {
    if (gTxn != null && gTxn != undefined) {
        if (gTxn == 'IPR' && gStage == 'IPR') {
            addDashboardToolbar("Delete");
        }
    }
}


function doActionDashboard(type, e) {
    var evnt = window.event || e;

    if (type == "EnterQuery") {
        gAction = 'ENTERQUERY';
        fnEnterQueryDashboard();
        return;
    }

    if ((gAction == "MODIFY") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'MODIFY';

    } else if ((gAction == "DELETE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'DELETE';

    } else if ((gAction == "CLOSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'CLOSE';

    } else if ((gAction == "REOPEN") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'REOPEN';

    } else if ((gAction == "REVERSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'REVRESE';

    } else if ((gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'ROLLOVER';

    } else if ((gAction == "CONFIRM") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'CONFIRM';

    } else if ((gAction == "LIQUIDATE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'LIQUIDATE';

    } else if ((gAction == "CRYSTALLIZE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'CRYSTALLIZE';

    } else if ((gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
        gAction = 'ROLLOVER';
    } else {
        if (type.toUpperCase() == "HOLD") {} else {
            gAction = type.toUpperCase();
        }
        if ('PROCNEW' == gAction) {
            gAction = 'NEW';
            type = 'New';
        }
        if ('PROCSAVE' == gAction) {
            gAction = 'NEW';
            type = 'BPELOk'; //Added By Fahad
        }
        if ('PROCHOLD' == gAction) { //Added By Fahad
            gAction = 'HOLD'; //Added By Fahad
            type = 'BPELHold'; //Added By Fahad
        }
        if ('AUTHORIZE' == gAction) {
            gAction = 'AUTH';
        }
        if ('COPY' == gAction) {
            gAction = 'COPY';
        }
        if ('UNLOCK' == gAction) {
            gAction = 'MODIFY';
        }
        if ('SAVE' == gAction || 'SAVEALL' == gAction) //ashok Ext changes
        {
            gAction = 'NEW';
        }
        if (mainWin.applicationName == "FCIS") {
            if ('DELEGATE' == gAction) {
                gAction = 'DELEGATE';
            }
        }
        if (screenType == 'T') {
            if ('ROLLOVER' == gAction) {
                gAction = 'ROLLOVER';
            }
            if ('REVERSE' == gAction) {
                gAction = 'REVERSE';
            }
            if ('CONFIRM' == gAction) {
                gAction = 'CONFIRM';
            }
            if ('LIQUIDATE' == gAction) {
                gAction = 'LIQUIDATE';
            }
            if ('CRYSTALLIZE' == gAction) {
                gAction = 'CRYSTALLIZE';
            }
        }

    }

    if (routingType == "X" && type.toUpperCase() == "SAVE") { //ashok Ext changes
        fnSaveAll("", evnt);
    } else if (routingType == "X" && type.toUpperCase() == "PRINT") {
        fnExtPrint();
    } else if (type.toUpperCase() == "EXECUTEQUERY") {
        if (typeof (gSummaryOpened) != 'undefined' && gSummaryOpened) {
        //eval('fn' + type + 'Dashboard' + '(evnt)');
        var fnEval = new Function('evnt','fn' + type + 'Dashboard' + '(evnt)');  
        fnEval();
        } else {
        //eval('fn' + type + 'Dashboard' + '()');
        var fnEval = new Function('fn' + type + 'Dashboard' + '()');  
        fnEval();
        }   
    } else {
        //eval('fn' + type + 'Dashboard' + '(evnt)');
        var fnEval = new Function('evnt','fn' + type + 'Dashboard' + '(evnt)');  
        fnEval();
    }
    if ('Print' == type) type = 'EXECUTEQUERY';
}