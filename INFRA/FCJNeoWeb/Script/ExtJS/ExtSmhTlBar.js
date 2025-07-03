/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtSmhtlBar.js
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
Copyright © 2004-2012  by Oracle Financial Services Software Limited..
********************************************************************************************
*/
function ExtshowToolbar(funcid, txnstat, authstat, showExecute) {
    var txn_auth_status = new Array(); //Array used to store txn and auth status
    //User just logs in /closes all function id's and toolbar should be disabled
    if (!gActiveWindow || gNumChildWindows == 0) {
        disableAllButtons();
        return;
    }
    // if function id is null, disable all buttons
    if (typeof (funcid) == 'undefined' || funcid == '') {
        disableAllButtons();
        if (gActiveWindow.gAction == "ENTERQUERY") {
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").className = 'BTNicon';
        }
        //hideToolBar();
        return;
    }
    //disabling toolbar on launch of summary, callform, Query, batch screens
    var screenTypes = "SCQB";
    if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && gActiveWindow.screenType != 'WB') { //FCUBS10.3 WEBBRANCH CHANGES
        disableAllButtons();
        return;
    }
    //Disabling toolbar for eod status other than N (Also applicable for host screens)
    // Changes made for WARBA - EOD time Operations - Start  //
    if (BranchEoi != "N" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1) && gActiveWindow.l_offlineAllowed != 'Y') 
	// Changes made for WARBA - EOD time Operations - End //
	{
        disableAllButtons();
        return;
    }
   
    // dbDataDom is empty (Screen just launched without any data)
    if (gActiveWindow.dbDataDOM == null) {
        disableAllButtons();
        finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
        //function that enables or disables the toolbar
        ExtfnEnableAcns_OnActionCode(funcid, finalarr, actions_arr);
        if (BranchEoi == 'N') {
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").className = 'BTNicon';
        }
        return;
    } else {
        //Obtain final array based on function rights
        if (gActiveWindow.screenType != "WB") {
            finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
        } //FC11.0 WB CHANGES
        // Getting txn and auth status
        txn_auth_status = getTxnAndAuthStatus();
        /*If txnstat and authstat are passed from FID.js*/
        if (typeof (txnstat) == "undefined" || (typeof (txnstat) != "undefined" && txnstat == "")) {
            txnstat = txn_auth_status[0];
        }
        if (typeof (authstat) == "undefined" || (typeof (authstat) != "undefined" && authstat == "")) {
            authstat = txn_auth_status[1];
        }
        if (txn_auth_status) if (gActiveWindow.screenType == "WB") {
            if (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "HOLD" || gActiveWindow.gAction == "") {
                gActiveWindow.gAction = "NEW";
                disableAllButtons(); //fc11.1wb changes
                enableSave();
   
                if (typeof (gActiveWindow.dataObj) != "undefined" && gActiveWindow.dataObj.action == "ENRICH") {
                    if (typeof (mainWin.functionDef[funcid]) != "undefined") //11.4.0 ITR2 SFR 13483671 
                    { //11.4.0 ITR2 SFR 13483671 
                        if (mainWin.functionDef[funcid].slipReqd == "Y") {
                            fnEnableGenerateButton();
                        }
                        if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                            fnEnableConfirmButton();
                        }
                    }
                } //11.4.0 ITR2 SFR 13483671 
                fnEnableHoldButton();
                enableDeleteForIPR();
                return;
            }
            if (gActiveWindow.gAction == "VIEW") {
                disableAllButtons();
                gActiveWindow.gAction = 'VIEW';
                enableDeleteForIPR();
                if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                    fnEnableGenerateButton();
                }
                return;
            }
            if (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH") {
                disableAllButtons(); //fc11.1wb changes
                fnEnableAuth();
                fnDisableHoldButton();
                enableDeleteForIPR();
                return;
            }

            if ((gActiveWindow.gAction == "REVERSE") || (gActiveWindow.gAction == "GENERATE")) {
                disableAllButtons(); //fc11.1wb changes
                if (typeof (gActiveWindow.dataObj) != "undefined") {
                    if (gActiveWindow.dataObj.action == "ENRICH") {
                        enableSave();
                        if (mainWin.functionDef[funcid].slipReqd == "Y") {
                            fnEnableGenerateButton();
                        }
                        if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                            fnEnableConfirmButton();
                        }
                    } else {
                        fnEnableReverseButton();
                        fnEnableGenerateButton();
                        if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                            fnEnableGenerateButton();
                        }
                    }
                }
                return;
            }
            return;
        }
       
        if ((gActiveWindow.gAction == "" || gActiveWindow.gAction == "EXECUTEQUERY" || gActiveWindow.gAction == "VIEWMNTLOG") && (gActiveWindow.dbDataDOM != null)) {
            disableAllButtons();
            finalarr = finalarrBasedOnTxnRights(finalarr, funcid, txnstat, authstat);
            //call the function that enables and disables the Tool bar based on the finalArr
            enableOrDisableBasedOnLastAction(finalarr);
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").className = 'BTNicon';
            return;
        }
        //enable and disable buttons according to gAction
        if (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") {
            disableAllButtons();
            enableHold();
            enableSave();
            return;
        }
        if (gActiveWindow.gAction == "LIQUIDATE" || gActiveWindow.gAction == "ROLLOVER" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
            for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
            enableSave();
            return;
        } else {
            disableAllButtons();
            return;
        }
    }
}

//returns the Txn and Auth status
function getTxnAndAuthStatus() {
    var txn_auth_status = new Array();

    var l_Txn_Auth_Stat = "";
    if (gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") || gActiveWindow.screenType == 'WB') {
        l_Txn_Auth_Stat = "1~2"; // paTCH fix.
    } else {
        if (gActiveWindow && gActiveWindow.routingType == "X") {
            l_Txn_Auth_Stat = fnGetExtTxnAuthStat();
        } else {
            l_Txn_Auth_Stat = gnGetTxnAuthStat();
        }
    }
    txn_auth_status[0] = l_Txn_Auth_Stat.split("~")[0];
    txn_auth_status[1] = l_Txn_Auth_Stat.split("~")[1];

    return txn_auth_status;
}

function fnGetExtTxnAuthStat() {

    var authStatNode = gActiveWindow.document.getElementsByName("AUTHSTAT");
    var l_AuthVal = getAuthTxnNodeValue(authStatNode);
    var txnStatNode = gActiveWindow.document.getElementsByName("TXNSTAT");
    var l_TxnVal = getAuthTxnNodeValue(txnStatNode);

    return (l_TxnVal + "~" + l_AuthVal);
}

function getAuthTxnNodeValue(objAuthTxn) {
    var authTxnNodeValue = "";
    if (objAuthTxn.length != 0) {
        var tagName = objAuthTxn[0].tagName;
        var type = objAuthTxn[0].type;
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
                        } else authTxnNodeValue = objAuthTxn[0].getAttribute("OFF");
                        break;
                    }
                case 'RADIO':
                    {
                        for (var i = 0; i < objAuthTxn.length; i++) {
                            if (objAuthTxn[i].checked) {
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

//returns onceAuth flg
function getOnceAuth() {
    var l_OnceAuth = "N";
    if (applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    return l_OnceAuth;
}

function enableDeleteForIPR() {
    if (gTxn != null && gTxn != undefined) {
        if (gTxn == 'IPR' && gStage == 'IPR') {
            document.getElementById("Delete").disabled = false;
            document.getElementById("Delete").className = 'BTNicon';
        }
    }
}

// enables hold for Transaction and Processing screens
function enableHold() {
    for (var l_Cnt = 0; l_Cnt < actions_arr.length; l_Cnt++) {
        if (actions_arr[l_Cnt].toUpperCase() == "HOLD" || ((gActiveWindow.screenType == "P" || gActiveWindow.screenType == "T") && actions_arr[l_Cnt].toUpperCase() == "ROLLOVER")) {
            continue;
        }
        document.getElementById(actions_arr[l_Cnt]).disabled = true;
        document.getElementById(actions_arr[l_Cnt]).className = 'BTNiconD';
    }
    // If the LATESTVERNO is 1 and Record is UnAuthorized, and Action id Unlock
    // then Hold shud be enabled if its available in list of actions.
    for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {

        if (finalarr[l_Cnt].toUpperCase() == "HOLD") {
            document.getElementById("Hold").disabled = true;
            document.getElementById("Hold").className = 'BTNiconD';
            if (gNumChildWindows != 0 && gActiveWindow) {
                if (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") {
                    document.getElementById("Hold").disabled = false;
                    document.getElementById("Hold").className = 'BTNicon';
                } else {
                    var l_txnval = getTxnVal_Mapping("CONTSTAT");
                    if (typeof (gActiveWindow.holdStatus) != "undefined") if (gActiveWindow.gAction == "MODIFY" && (l_txnval == "H" || gActiveWindow.holdStatus.toUpperCase() == "HOLD")) {
                        document.getElementById("Hold").disabled = false;
                        document.getElementById("Hold").className = 'BTNicon';
                    }
                }
            }
        }
    }
}

//changes the save button image
function changeSaveImg() {
    if (document.getElementById("Save").disabled) {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").className = "BTNiconD";
    } else {
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").className = "BTNicon";
    }

}

//disables all toolbar buttons
function disableAllButtons() {
    if (actions_arr) {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
            if (applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").className = 'BTNiconD';
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").className = 'BTNiconD';
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
    }
    fnSetImgSrc(actions_arr);
    changeSaveImg();
}

//hides the tool bar
function hideToolBar() {
    if (actions_arr) {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
            if (parent.frames['Global'].applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).style.visibility = 'hidden';
        }
        //Save Button is not part of the control string. So handling seperatly.
        document.getElementById("Save").style.visibility = 'hidden';
    }
}

//Displays tool bar
function refreshToolBar() {
    if (actions_arr) {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
            if (applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
        }
        document.getElementById("TlBarOper").className = "TBgp1";
    }
}

// returns the final rights array based on Txn rights
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

// returns the final rights array based on function rights
function finalarrBasedOnFuncRights(funcid, txnstat, authstat) {
    var finalRightsStr = getDefaultRightsStr(funcid);
    var j = finalarr.length;
    l_OnceAuth = getOnceAuth();
    if (funcid && funcid != "") {
        for (i = 0; i < j; i++) {
            finalarr.pop();
        }
        var finalcnt = 0;
        var finalActions = new Array();
        var i = 0,
            k = 0;
        var addIndex = 0;
        var l_Testing = "";
        var finalRights = "";
       t1 = t[txnstat + '+' + authstat];        
        while (finalRightsStr.indexOf('~') != -1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights; temp != 0; temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    if (t1 != null) { 
                        for (z = 0; z < t1.length; z++) {
                            if (t1[z].toUpperCase() == actions_arr[i + addIndex].toUpperCase()) {
                                if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                                    continue;
                                }                               
                                finalarr[k] = actions_arr[i + addIndex];
                                k++;
                                break;
                            }
                        }
                    } else {
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                            continue;
                        }                       
                        finalarr[k] = actions_arr[i + addIndex];
                        k++;
                    }
                } else l_Testing = l_Testing + "0";
                i++;
            }
            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }
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
                document.getElementById(finalarr[i]).disabled = false;
                document.getElementById(finalarr[i]).className = 'BTNicon';
            }
        }
        return finalarr;
    }
}

// builds a default rights string based on the control string in menu xml.
function getDefaultRightsStr(funcid) {
    var finalRightsStr = "";
    var objRights = "";
    try {
        objRights = mainWin.document.getElementById("finalFunctionRights").value;

    } catch (e) {
        // do nothing if the user doesn't have rights for the branch
        return;
    }
    //change for bug id 14294364 : 11.2 version STDCIF -PROBLEM WITH ROLE RIGHTS [funcid changed to funcid+"+"]
    var funcidPos = objRights.indexOf(funcid+"=");
    if(funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos)+1, objRights.indexOf(";", funcidPos));
    }
    return finalRightsStr;
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
            document.getElementById(finalarr[i]).disabled = false;
            document.getElementById(finalarr[i]).className = 'BTNicon';
        }
    }
}

function ExtfnEnableAcns_OnActionCode(funcid, finalarr, action_arr) {

    // If no windows are opened then , disable all the actions
    if (gNumChildWindows == 0) return;
    //FCJ BranchEoi will be N normal,F - end of finanical input,T - end of transaction input,..
    // in cas eof fcis --> N - Online , T - Offline.
    var l_OfflineAllowed = 'N';
    var functionId = document.getElementById("fastpath").value.toUpperCase();
    var xmlDOM = loadXMLDoc(gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + functionId + "']");
    if (functionIdNode) {
        for (var i = 0; i < functionIdNode.attributes.length; i++) {
            if (functionIdNode.attributes[i].nodeName == "OFFLINEALLOWED") {
                l_OfflineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
                break;
            }
        }
    }

    if (gActiveWindow && gActiveWindow.gAction == "") {
        if (gActiveWindow.dbDataDOM == null) {
            for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {
                if (finalarr[l_Cnt].toUpperCase() == "NEW") {
				// Changes made for WARBA - EOD time Operations - Start  //
                    if (BranchEoi == 'N'|| (BranchEoi != 'N' && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) != -1) && gActiveWindow.l_offlineAllowed != 'Y'))
					// Changes made for WARBA - EOD time Operations - End  //
					{
                        document.getElementById(finalarr[l_Cnt]).disabled = false;
                        document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        document.getElementById("EnterQuery").disabled = false;
                        document.getElementById("EnterQuery").className = 'BTNicon';
                    } else {
                        if (l_OfflineAllowed != "Y") {
                            document.getElementById(finalarr[l_Cnt]).disabled = true;
                            document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                            disableActionsInToolbar();
                        } else {
                            document.getElementById(finalarr[l_Cnt]).disabled = false;
                            document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        }
                    }
                } else {
                    document.getElementById(finalarr[l_Cnt]).disabled = true;
                    document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                }
            }
        }
    }

    if (funcid.charAt(2).toUpperCase() == "S" || (BranchEoi != "T" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1) && gActiveWindow.l_offlineAllowed != 'Y')) { // Summary case
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").children[0].className = "BTNiconD";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    }
    fnSetImgSrc(action_arr);
    changeSaveImg();
} //fnc

function fnEnableAuth() {
    document.getElementById("Save").disabled = true;
    document.getElementById("Save").className = "BTNiconD";
    gActiveWindow.gAction = 'REMOTEAUTH';
    document.getElementById("Authorize").className = "BTNicon";
    document.getElementById("Authorize").disabled = false;
}

function fnDoReverse() {
    document.getElementById("Save").disabled = true;
    document.getElementById("Save").className = "BTNiconD";
    document.getElementById("Reverse").disabled = false; //FC11.1WB CHANGES
    document.getElementById("Reverse").className = "BTNicon";
    mainWin.gActiveWindow.gAction = 'REVERSE';
}


function fnEnableGenerateButton() {
    document.getElementById("Generate").className = "BTNicon";
    document.getElementById("Generate").disabled = false;
}

function fnEnableHoldButton() {
    document.getElementById("Hold").className = "BTNicon";
    document.getElementById("Hold").disabled = false;
}

function fnDisableHoldButton() {
    document.getElementById("Hold").className = "BTNiconD";
    document.getElementById("Hold").disabled = true;
}

function fnView() {
    mainWin.gActiveWindow.gAction = 'VIEW';
}

function fnEnableConfirmButton() {
    document.getElementById("Confirm").className = "BTNicon";
    document.getElementById("Confirm").disabled = false;
}
// FCUBS 11.4 Confirmation Changes Ends