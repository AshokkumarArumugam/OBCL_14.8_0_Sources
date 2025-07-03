/*----------------------------------------------------------------------------------------------------
    **
    ** File Name    : SMHTLBAR.js
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
    
    Copyright © 2004-2016   by Oracle Financial Services Software Limited.. 
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
	**  Modified By           : Neethu Sreedharan
    **  Modified On           : 06-Oct-2016
    **  Modified Reason       : The status code for the XMLHttpRequestObject check is done for status 
                                codes other than 200 
    **  Retro Source          : 9NT1606_12_0_3_COMMONWEALTH_BANK_OF_AUSTRALIA
    **  Search String         : 9NT1606_12_2_RETRO_12_0_3_23656268
	
	**  Modified By          : Neethu Sreedharan
    **  Modified On          : 07-Oct-2016
    **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                               to user as alert and on click of Ok button on alert window, screen will be 
                               unmasked and user can try the action again.
    **  Retro Source         : 9NT1606_12_0_3_INTERNAL
    **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
    **
	**  Modified By          : Shayam Sundar Ragunathan
    **  Modified On          : 02-Sep-2022
    **  Modified Reason      : Added Changes to restrict dashboard function ids from fast path
    **  Search String        : 9NT1606_14_5_PROTEGO_TRUST_34569395
    ----------------------------------------------------------------------------------------------------
    */

var gSeparator = ",";

var tempFlag = true;
var saveButtonAdded = false;

var lovInfoFlds = {"BLK_BRANCH__BRANCH_CODE__LOV_CHANGE_BRANCH_CODE":["BLK_BRANCH__BRANCH_CODE~~~~",""],"BLK_MODULE__MODULE_CODE__LOV_CHANGE_MODULE_CODE":["BLK_MODULE__MODULE_CODE~~~~",""],"BLK_DEPT__DEPT_CODE__LOV_CHANGE_DEPT_CODE":["BLK_DEPT__DEPT_CODE~~~~",""],"BLK_BRANCH__STAGE__LOV_TASK_COPY":["BLK_BRANCH__STAGE~",""]}; /*12.0.4 UI performance changes */

//JS Segregation changes starts.
function doAction(type, e) {

    mainWin.fnUpdateScreenSaverInterval();
    var evnt = window.event || e;
   /*  if (type != 'Go') { session expiry change start
       if (!isSessionActive()) {
            if (typeof (parent.gActiveWindow) != "undefined" && parent.gActiveWindow != null) parent.gActiveWindow.gAction = "";
            return;
        }
    } session expiry change end*/

    if (type == 'SignOff') {
        var currentBranch = "", homeBranch ="";
        var currentDept = "",  homeDept = "";
        if (applicationName == "FCJ" || applicationName == "FGL") {
             currentBranch = CurrentBranch;
             homeBranch = HOMEBranch;
            if (applicationExt == "FCJLA" && applicationName == "FCJ") {
                 currentDept = CurrentDept;
                 homeDept = HomeDept;
            }
        } else {
              currentBranch = CurrentModule;
              homeBranch = DefaultModule;
        }
        if (applicationName == "FCJ") {
            if (currentBranch != homeBranch) {
                try {
                    var message = getCommonErrorList()["FC-MAINT52"];
                    message = message.substring(0, message.lastIndexOf("~"));
                    mask();
                    showAlerts(fnBuildAlertXML("FC-MAINT52", "E", message), "E");
                    return false;
                } catch (e) {
                    mask();
                    showAlerts(fnBuildAlertXML("", "I", getItemDesc("LBL_MAINTAIN_MODULE")), "I");
                    return false;
                }
            } /*Bugfix16408732 starts*/
            else {
                if (SSO_REQ == "Y") {
                    exitAll();
                } else {
                    evtBeforeUnload();
                }
            }
            /*Bugfix16408732 ends*/
        } else {
			if (SSO_REQ == "Y") {
				exitAll();
            } else {
                evtBeforeUnload();
            }
		}

    } else if (type == 'Exit') {
        exitAll();
    } else if (type == 'ExitCurrWin') {
        exitCurrentWindow();
    } if (type == 'Go') {
        var functionId = document.getElementById("fastpath").value.toUpperCase();
        document.getElementById("fastpath").value = document.getElementById("fastpath").value.toUpperCase();
        var funcid = functionId;
        var uiName = "";
        var drillDownQry = "";
        var finalRights = "";
        if (funcid != "" && funcid != "null") {
            //dispHref(funcid, uiName, finalRights, drillDownQry); //9NT1606_14_5_PROTEGO_TRUST_34569395 -Commented
            dispHref(funcid, '', '', '', '', '', '','FP'); //9NT1606_14_5_PROTEGO_TRUST_34569395
        }
    } 
}
//JS Segregation changes ends.

function doNavigate(type)
{
    /*
        * When the User clicks on a navigation button, this function is called
        *Call the appropriate function in the JSP that is active currently
        */
    if (!parent.gActiveWindow || parent.gActiveWindow.closed)
    {
        //alert ("Select a Child Window before performing this operation!");
        alert(parent.frames['Global'].getItemDesc("LBL_SELECT_WINDOW"));
        return (true);
    }
    parent.gActiveWindow.focus();
    parent.gActiveWindow.doNavigate(type);
}

function goToRec()
{
    /*
        * When the User clicks on GoTo button, this function is called
        *Call the appropriate function in the JSP that is active currently
        */
    if (!parent.gActiveWindow || parent.gActiveWindow.closed)
    {
        //alert ("Select a Child Window before performing this operation!");
        alert(parent.frames['Global'].getItemDesc("LBL_MAINTAIN_MODULE"));
        return (true);
    }
    var recNum = prompt("Go to Record:", 1);
    recNum = trim(recNum);
    if (isNaN(recNum))
    {
        //alert("Please enter a valid Record Number.");
        alert(parent.frames['Global'].getItemDesc("LBL_VALID_NO"));
        return (true);
    }
    recNum = parseInt(recNum);
    parent.gActiveWindow.focus();
    parent.gActiveWindow.goToRec(recNum);
}

function Timer(startTime)
{
    this.clockTime = startTime;
    this.reEnterPassword = false;
    this.resetClock = fnResetClock();
}

function doAction(type, e) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var evnt = window.event || e;
   /* session expiry change start if(type != 'Go') { //Don't call isSessionActive() when function id launched from Fastpath because it will be called from dispHref()
        if (!isSessionActive()) {
            if (typeof(parent.gActiveWindow) != "undefined" && parent.gActiveWindow != null) parent.gActiveWindow.gAction = "";
            return;
        }
    }  session expiry change end*/

    if (type == "EnterQuery") { // Kals
        mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
        gActiveWindow.gAction = 'ENTERQUERY';
        gActiveWindow.fnEnterQuery(); // Reset the Navigation Buttons.
		return;
    }

    if (type == 'SignOff') {
        if (applicationName == "FCJ") {
            var currentBranch = CurrentBranch;
            var homeBranch = HOMEBranch;
            if(applicationExt == "FCJLA") {
                var currentDept =    CurrentDept;
                var homeDept =    HomeDept;
            }
        } else if (applicationName == "FGL") {
            var currentBranch = CurrentBranch;
            var homeBranch = HOMEBranch;
        } else {
            var currentBranch = CurrentModule;
            var homeBranch = DefaultModule;
        }
        if (applicationName == "FCJ") {
            if (currentBranch != homeBranch) {
                try {
                    var message = getCommonErrorList()["FC-MAINT52"];
                    message = message.substring(0, message.lastIndexOf("~"));
                    mask();
                    showAlerts(fnBuildAlertXML("FC-MAINT52", "E", message), "E");
                    return false;
                } catch(e) {
                    mask();
                    showAlerts(fnBuildAlertXML("", "I", getItemDesc("LBL_MAINTAIN_MODULE")), "I");
                    return false;
                }
            } /*Bugfix16408732 starts*/
            else {
                if (SSO_REQ == "Y") {
                    exitAll();
                } else {
                    evtBeforeUnload();
                }
            }
            /*Bugfix16408732 ends*/
        } else {
                if (SSO_REQ == "Y") {
                    exitAll();
                } else {
                    evtBeforeUnload();
                }
            }

    } else if (type == 'Help') {
        var filetoOpen = "";
        if (gNumChildWindows <= 0) {
            //do nothing
        } else {
            filetoOpen = document.getElementById("fastpath").value.toUpperCase();
            if (gActiveWindow) {
                if (gActiveWindow.screenType) {
                    if (gActiveWindow.screenType == "WB") {
                        var xmlFile = gActiveWindow.xmlFileName;
                        if (xmlFile.lastIndexOf(".xml") == -1) 
                            var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".XML"));
                        else 
                            var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".xml"));
                        filetoOpen = funcId;
                    }
                }
            }
        }
        if (gNumChildWindows > 0 && filetoOpen != "") 
            showDbt_dbc(filetoOpen);
    } else if (type == 'CustomTb') {
        var winParams = new Object();
        winParams.mainWin = parent.window;
        var newWin = parent.showModalDialog("custtb.jsp", winParams, "center:yes; dialogHeight:480px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no");
        parent.window.loadChildWindow(newWin);

    } else if (type == 'ChgBrn') {
        var winParams = new Object();
        winParams.mainWin = parent.window;
        var newWin = parent.showModalDialog("SMCHGBRN.jsp", winParams, "center:yes; dialogHeight:480px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no");
        parent.window.loadChildWindow(newWin);

    } else if (type == 'ChgPwd') {
        if (SSO_REQ == "Y") {
            alert(getItemDesc("LBL_PWDCHANGE_NA")); // Password Change Not Allowed
        } else {
            var winParams = new Object();
            winParams.mainWin = parent.window;
            var returnVal = parent.showModalDialog("SMCHGPWD.jsp?login=true", winParams, "center:yes; dialogHeight:240px; dialogWidth:300px; help:yes; resizable:yes; scroll:no; status:no");
            if (returnVal == "SignOff") {
                var responseXML = parent.reqSignOff();
                parent.top.gSignedOff = true;
                parent.location.href = "LoginServlet";
            }
        }
    } else if (type == 'Exit') {
        exitAll();
    } else if (type == 'ExitCurrWin') {
        exitCurrentWindow();
    } else if (type == 'Go') {
        var functionId = document.getElementById("fastpath").value.toUpperCase();
        document.getElementById("fastpath").value = document.getElementById("fastpath").value.toUpperCase();
        var funcid = functionId;
        var uiNameNode;
        var uiName = "";
        var drillDownQry = "";
        var finalRights = "";
        if (funcid != "" && funcid != "null") {            
            //dispHref(funcid, uiName, finalRights, drillDownQry); //9NT1606_14_5_PROTEGO_TRUST_34569395 -Commented
            dispHref(funcid, '', '', '', '', '', '','FP'); //9NT1606_14_5_PROTEGO_TRUST_34569395
        }

    } else if (type == 'procTerminate')
    {

        alert(type);
    } else if (type == 'procAccept')
    {

        alert(type);

    } else if (type == 'procReject')
    {
        alert(type);

    } else
    {

        if ((parent.gActiveWindow.gAction == "MODIFY") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) //Ashok Ext Changes
        {
            parent.gActiveWindow.gAction = 'MODIFY';

        } else if((parent.gActiveWindow.gAction == "DELETE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             parent.gActiveWindow.gAction = 'DELETE';
        
        } else if((parent.gActiveWindow.gAction == "CLOSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL")))  
        {
             parent.gActiveWindow.gAction = 'CLOSE';
        
        } else if((parent.gActiveWindow.gAction == "REOPEN") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             parent.gActiveWindow.gAction = 'REOPEN';
        
        } else if((parent.gActiveWindow.gAction == "REVERSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             parent.gActiveWindow.gAction = 'REVRESE';
        
        } else if((parent.gActiveWindow.gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             parent.gActiveWindow.gAction = 'ROLLOVER';
        
        } else if((parent.gActiveWindow.gAction == "CONFIRM") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             parent.gActiveWindow.gAction = 'CONFIRM';
             
        } else if((parent.gActiveWindow.gAction == "LIQUIDATE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             parent.gActiveWindow.gAction = 'LIQUIDATE';
             
        } else if((parent.gActiveWindow.gAction == "CRYSTALLIZE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL")))  
        {
             parent.gActiveWindow.gAction = 'CRYSTALLIZE';
        
        } else if((parent.gActiveWindow.gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             parent.gActiveWindow.gAction = 'ROLLOVER';
        } else
        {
            if (type.toUpperCase() == "HOLD") {
            } else {
                parent.gActiveWindow.gAction = type.toUpperCase();
            }
            if ('PROCNEW' == parent.gActiveWindow.gAction)
            {
                parent.gActiveWindow.gAction = 'NEW';
                type = 'New';
            }
            if ('PROCSAVE' == parent.gActiveWindow.gAction)
            {
                parent.gActiveWindow.gAction = 'NEW';
                type = 'BPELOk'; //Added By Fahad
            }
            if ('PROCHOLD' == parent.gActiveWindow.gAction)
            { 
                parent.gActiveWindow.gAction = 'HOLD'; 
                type = 'BPELHold'; //Added By Fahad
            }
            if ('AUTHORIZE' == parent.gActiveWindow.gAction)
            {
                parent.gActiveWindow.gAction = 'AUTH';
            }
            if ('COPY' == parent.gActiveWindow.gAction)
            {
                parent.gActiveWindow.gAction = 'COPY';
            }
            if ('UNLOCK' == parent.gActiveWindow.gAction)
            {
                parent.gActiveWindow.gAction = 'MODIFY';
            }
            if ('SAVE' == parent.gActiveWindow.gAction || 'SAVEALL' == parent.gActiveWindow.gAction) //ashok Ext changes
            {
                parent.gActiveWindow.gAction = 'NEW';
            }
            if (applicationName == "FCIS")
            {
                if ('DELEGATE' == parent.gActiveWindow.gAction)
                {
                    parent.gActiveWindow.gAction = 'DELEGATE';
                }
            }
            if (parent.gActiveWindow && parent.gActiveWindow.screenType == 'T')
            {
                if ('ROLLOVER' == parent.gActiveWindow.gAction)
                {
                    parent.gActiveWindow.gAction = 'ROLLOVER';
                }
                if ('REVERSE' == parent.gActiveWindow.gAction)
                {
                    parent.gActiveWindow.gAction = 'REVERSE';
                }
                if ('CONFIRM' == parent.gActiveWindow.gAction)
                {
                    parent.gActiveWindow.gAction = 'CONFIRM';
                }
                if ('LIQUIDATE' == parent.gActiveWindow.gAction)
                {
                    parent.gActiveWindow.gAction = 'LIQUIDATE';
                }
                if ('CRYSTALLIZE' == parent.gActiveWindow.gAction)
                {
                    parent.gActiveWindow.gAction = 'CRYSTALLIZE';
                }
            }

        }

        if (parent.gActiveWindow && parent.gActiveWindow.routingType == "X" && type.toUpperCase() == "SAVE") { //ashok Ext changes
            var fnEval = new Function('evnt','parent.gActiveWindow.fnSaveAll("", evnt)');  
            fnEval(evnt);
        } else if (parent.gActiveWindow && parent.gActiveWindow.routingType == "X" && type.toUpperCase() == "PRINT") {
            var fnEval = new Function('parent.gActiveWindow.fnExtPrint()');  
            fnEval();
        } else if(type.toUpperCase() == "EXECUTEQUERY") {
            if (typeof(parent.gActiveWindow.gSummaryOpened) != 'undefined' && parent.gActiveWindow.gSummaryOpened) {
                var fnEval = new Function('evnt','parent.gActiveWindow.fn' + type + '(evnt)');  
                fnEval(evnt);
            } else { 
                var fnEval = new Function('parent.gActiveWindow.fn' + type + '()');  
                fnEval();
            }
        }  else {
            mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
            var fnEval = new Function('evnt','parent.gActiveWindow.fn' + type + '(evnt)');  
            fnEval(evnt);
        }
        if ('Print' == type) type = 'EXECUTEQUERY';
    }

}

function openDebugWindow(winId, src) {    
     src = mainWin.addIframeReqParam(src); //session expiry change
    var customWin       = document.createElement("div");
    customWin.id        = winId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe id="ifrDebugWin" class="frames" src="'+src+'" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("debugWindowDIV").appendChild(customWin);
    
    var winObj = document.getElementById(winId);
    winObj.style.visibility="visible";
    winObj.style.display="block";
        
     //REDWOOD_CHANGES  
        winObj.style.display = "block";
        winObj.style.height = "100%";
        winObj.style.width = "100%"; //For DIV
        winObj.style.width = "100%";
        winObj.style.top = "0px";
        winObj.children[0].style.height = "100%"; //For IFRAME
        winObj.children[0].style.width = "100%";
        winObj.children[0].style.top = "0px";  
     //REDWOOD_CHANGES
    return winObj;
}

function debugWindowFlg(e)
{   
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(DebugFlg == 'Y'){
        if (DebugWindowFlg == 'N') {
            DebugWindowFlg = 'Y';
            debugWindow = openDebugWindow("debugwin", "Debug.jsp");   
        }else {
            parent.fnExitDebug(parent.document.getElementById("debugwin"), e);
            DebugWindowFlg = 'N';
        }
    }else{
        
    }
}

function debugFlg(e)
{   
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (DebugFlg == 'N') {
        DebugFlg = 'Y';        
    }else {        
        DebugFlg = 'N';        
        mainWin.DebugStmt = "";
    }
}

function fnLoadDebug() {        
    document.getElementById("div3").style.visibility = 'hidden';
    document.getElementById("div3").style.display = "none"; 
    document.getElementById("div4").style.visibility = 'hidden';
    document.getElementById("div4").style.display = "none"; 
    document.getElementById("div5").style.visibility = 'hidden';
    document.getElementById("div5").style.display = "none"; 
    var debugStmt = mainWin.DebugStmt;
    if(debugStmt != ""){
        var debugArray = debugStmt.split("!!!");
        var msg,value;
        for(var i= 0;i<debugArray.length-1;i++){
            msg     = debugArray[i].split("~~~")[0];
            value   = debugArray[i].split("~~~")[1];
            fname   = debugArray[i].split("~~~")[2];
            debugs(msg,value,fname);
        }
    }
    mainWin.DebugStmt = "";
}


function fnExitDebug(winObj, e) {
    var e = window.event || e;
    iFrameObj = winObj.getElementsByTagName("IFRAME")[0];
    asyncPost(iFrameObj.contentWindow);
    iFrameObj.src = "";
    document.getElementById("debugWindowDIV").removeChild(winObj);
    DebugWindowFlg = 'N';
    DebugFlg = 'N'; //Fix for 17652314
    fnRemoveWindowMenu(winObj.id);
    e.cancelBubble = true;
    parent.document.getElementById("LoggedUser_Menu").focus();
    parent.document.getElementById("LoggedUser_Menu").className == "navhover";
}

function hideTooolbarIcons(){
    if (gActiveWindow || gNumChildWindows > 0){
        document.getElementById("TlBarOper").className = "TBgp1";
    }else{
        document.getElementById("TlBarOper").className = "dispNone";
    }
}

function showToolbar(funcid, txnstat, authstat, showExecute) {
    
    hideTooolbarIcons();
    if (gActiveWindow || gNumChildWindows > 0){
    } else {
    	return;
    }
    if (gActiveWindow && gActiveWindow.routingType == "X") {
        ExtshowToolbar(funcid, txnstat, authstat, showExecute);
        return;
    }
     if  (funcid =="" || funcid.substring(2,3) == "S") {
        //fnDisableAllActions();
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
        	//FCIS10.3 Changes
            if (applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").className = 'BTNiconD';
        /* along with save, the remainting 2 buttons have to be disabled */
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").className = 'BTNiconD';
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        /* along with save, the remainting 2 buttons have to be disabled */
        if(gActiveWindow.gAction == "ENTERQUERY"){
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").className = 'BTNicon';
        }
       
        fnSetImgSrc(actions_arr);
        return;
    }

    var l_Txn_Auth_Stat = "";
    if (gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") || (gActiveWindow.screenType == "WB")) //FCUBS 10.3 WEBBRANCH CHANGES
    {
        l_Txn_Auth_Stat = "1~2"; // paTCH fix.
    } else{
          var l_Txn_Auth_Stat   =  gnGetTxnAuthStat();
    }
    /*If txnstat and authstat are passed from FID.js*/
    if(typeof(txnstat) == "undefined"  || (typeof(txnstat) != "undefined" && txnstat == "" )){
        txnstat = l_Txn_Auth_Stat.split("~")[0];               
    }          
    if(typeof(authstat) == "undefined"  || (typeof(authstat) != "undefined" && authstat == "" )){
        authstat = l_Txn_Auth_Stat.split("~")[1];
    }       
    var l_OnceAuth = "N";
    if (applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
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

    var objRights = new Array();
    try {
        //objRights = new fnGetFinalRights();
        objRights = mainWin.document.getElementById("finalFunctionRights").value;
    } catch(e) {
        // do nothing if the user doesn't have rights for the branch
    }

    var finalRightsStr = ""
    /*if (objRights[funcid] != "") 
        finalRightsStr = objRights[funcid];
    */
	//change for bug id 14294364 : 11.2 version STDCIF -PROBLEM WITH ROLE RIGHTS [funcid changed to funcid+"+"]
    var funcidPos = objRights.indexOf(funcid+"=");
    if(funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos)+1, objRights.indexOf(";", funcidPos));
    }
    if (!finalRightsStr) {
        // If it's an invalid function id then return.
        finalRightsStr = "";
    } else if (showExecute) {
        // If Enter Query button is pressed, show the Execute Query button.
        // Don't hide all the buttons. RightsString for ExecuteQuery is 65536~ 
        //finalRightsStr = "65536~"; 
    }

    var j = finalarr.length;
    if (funcid && funcid != "") {
        for (i = 0; i < j; i++) {
            finalarr.pop();
        }
        var finalcnt = 0;
        t1 = t[txnstat + '+' + authstat];
        var finalActions = new Array();
        var i = 0,
        k = 0;
        var addIndex = 0;
        var l_Testing = "";
        while (finalRightsStr.indexOf('~') != -1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights; temp != 0; temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    if (t1 != null) { //Kals Comenting .. APr 30
                        for (z = 0; z < t1.length; z++) {
                            if (t1[z].toUpperCase() == actions_arr[i + addIndex].toUpperCase()) {
                                if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                                    continue;
                                }
                                /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                                    continue;
                                }*/
                                finalarr[k] = actions_arr[i + addIndex];
                                k++;
                                break;
                            }
                        }
                    } else {
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                            continue;
                        }
                        /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                            continue;
                        }*/
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
        var pDoc = gActiveWindow.document;
        var auth_stat = typeof(pDoc.getElementsByName("AUTH_STAT")[0])!='undefined'?pDoc.getElementsByName("AUTH_STAT")[0]:pDoc.getElementsByName("AUTHSTAT")[0];
        var rec_stat  = typeof(pDoc.getElementsByName("RECORD_STAT")[0])!='undefined'?pDoc.getElementsByName("RECORD_STAT")[0]:pDoc.getElementsByName("TXNSTAT")[0];
        if(isSameMakerId()){
            if(finalarr.length>0){
                for(var j=0;j<finalarr.length;j++){
                    if (finalarr[j]) {
	                    if(finalarr[j].toUpperCase() == 'DELETE' ){
	                        finalarr.splice(j,1);
	                    }
                    }
                    //Doesn't enable the unlock button before authrorization
                    if(authstat){
                        if(authstat == "U"){
                            if (finalarr[j]) {
	                            if(finalarr[j].toUpperCase() == 'UNLOCK'){
	                                finalarr.splice(j,1);
	                            }
                        	}
                        }
                    }else if(auth_stat){
                    	if(auth_stat.checked == false){
                            if (finalarr[j]) {
	                            if(finalarr[j].toUpperCase() == 'UNLOCK'){
	                                finalarr.splice(j,1);
	    	                    }
                            }
    	                 }
                    }
                 }
            }
        }
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

    fnEnableAcns_OnActionCode(funcid); // action code based
    //If New is enabled then save shud be disabled
    var l_SaveBtn = document.getElementById("Save");
    var l_NewBtn = document.getElementById("New");
    //hOLD Related Code
    if (gNumChildWindows != 0 && gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY")) {
     disableAllButtons();//added
        for (var l_Cnt = 0; l_Cnt < actions_arr.length; l_Cnt++) {
            if (actions_arr[l_Cnt].toUpperCase() == "HOLD" || ((gActiveWindow.screenType == "P" || gActiveWindow.screenType == "T") && actions_arr[l_Cnt].toUpperCase() == "ROLLOVER")) {
                continue;
            }
            document.getElementById(actions_arr[l_Cnt]).disabled = true;
            document.getElementById(actions_arr[l_Cnt]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").className = 'BTNicon';
        }
    // If the LATESTVERNO is 1 and Record is UnAuthorized, and Action id Unlock
    // then Hold shud be enabled if its available in list of actions.
    for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {
        if (finalarr[l_Cnt].toUpperCase() == "HOLD") {
            document.getElementById("Hold").disabled = true;
            document.getElementById("Hold").className = 'BTNiconD';
            if (gNumChildWindows != 0 && gActiveWindow) {
                if (gActiveWindow.gAction == "NEW") {
                    document.getElementById("Hold").disabled = false;
                    document.getElementById("Hold").className = 'BTNicon';
                } else {
                    var l_txnval = getTxnVal_Mapping("CONTSTAT");
                    if (typeof(gActiveWindow.holdStatus) != "undefined") if (gActiveWindow.gAction == "MODIFY" && (l_txnval == "H" || gActiveWindow.holdStatus.toUpperCase() == "HOLD")) {
                        document.getElementById("Hold").disabled = false;
                        document.getElementById("Hold").className = 'BTNicon';
                    }
                }
            }
        }
    }

    //lIQUIDATE case
    if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "LIQUIDATE") {
        if (finalarr) {
            for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //Rollover case
    if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "ROLLOVER") {
        if (finalarr) {
            for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //fcis Delegate case
    if (applicationName == "FCIS") {
        if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "DELEGATE") {
            if (finalarr) {
                for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                    document.getElementById(finalarr[l_Itr]).disabled = true;
                    document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
                }
            }
            enableSave();
        }
    }
    fnSetImgSrc(actions_arr);
    //FCUBS10.3_WebBranch Changes
    if (gActiveWindow && gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction != "REVERSE") && (gActiveWindow.gAction != "VIEW") && (gActiveWindow.gAction != "REMOTEAUTH") && (gActiveWindow.gAction != "GENERATE") && (gActiveWindow.gAction != "AUTH")) {
            fnEnableHoldButton();
        }
    if (gActiveWindow && gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH")) {
            fnEnableAuth();
         }
   //for enabling reverse in WB 
   //FCUBS10.3_WebBranch Changes
    if (gActiveWindow) {
        if ((gActiveWindow.gAction == "REVERSE") || (gActiveWindow.gAction == "GENERATE")) {
            fnEnableReverseButton();
            //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
            //fnEnableGenerateButton();
			if(typeof(mainWin.functionDef[funcid])!="undefined"){
				if (mainWin.functionDef[funcid].adviceReqd == "Y"){
					fnEnableGenerateButton();
				}
			}else{
				fnEnableGenerateButton();
			}
			//9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
         }
    }
}

// Reddy Prasad added
function fnSetImgSrc(actions_arr)
{
    for (var l_idx = 0; l_idx < actions_arr.length; l_idx++)
    {
        var l_str;
        var l_temp = actions_arr[l_idx];
        l_str = InitCap(l_temp);

        //Murali Preformance tunning
        //while(!parent.frames['Global']){}
        // fnWaitProcess(); TODO

        if (applicationName == "FCIS" && actions_arr[l_idx] == "ROLLOVER")
        {
            actions_arr[l_idx] = "DELEGATE";
        }
        if (document.getElementById(actions_arr[l_idx]).disabled)
        {
            document.getElementById(actions_arr[l_idx]).disabled = true;
            document.getElementById(actions_arr[l_idx]).className = "BTNiconD";
        } else
        {
            document.getElementById(actions_arr[l_idx]).disabled = false;
            document.getElementById(actions_arr[l_idx]).className = "BTNicon";
        }
    }
    
    if (document.getElementById("Save").disabled)
    {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").className = "BTNiconD";       
    } else
    {
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").className = "BTNicon";
    }
}

// performance tunning
function fnWaitProcess()
{
    if (!parent.frames['Global'])
    {
        window.setTimeout("fnWaitProcess()", 25);
    }
}

function fnEnableDelete()
{
    document.getElementById("Delete").disabled = false;
}

function InitCap(str)
{
    var str = str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
    if (str == "Delegate") str = "Rollover";
    return str;
}

//If the delete button is enabled and once_auth for the record is yes, 
//then disable the delete button
function gnGetOnceAuth()
{
    var l_Once_Auth = 'N';
    if (gNumChildWindows != 0 && gActiveWindow)
    {
        if (gActiveWindow.document.getElementsByName("ONCE_AUTH").length > 0)
        {
            if (gActiveWindow.document.getElementsByName("ONCE_AUTH")[0].value == "Y") l_Once_Auth = 'Y';
        }
    }
    return l_Once_Auth;
}

/* Enables the action Codes based on Action Code
      Ex: if action Code is New then only a Save shud be enabled.
*/
function fnEnableAcns_OnActionCode(funcid)
{
    // If no windows are opened then , disable all the actions
    if (gNumChildWindows == 0)
    {
        document.getElementById("TlBarOper").className = "dispNone";
        return;
    }

    if (gNumChildWindows > 0)
    {
        document.getElementById("TlBarOper").className = "TBgp1";
    }

    if (funcid == "")
    {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++)
        {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
        return;
    }

    //fnWait();

    var l_TempAcnCode = gActiveWindow.gAction;

    //setTimeout('fnEnableAcns_OnActionCode()',20);

    //FCJ BranchEoi will be N normal,F - end of finanical input,T - end of transaction input,..
    // in cas eof fcis --> N - Online , T - Offline.
    var l_OfflineAllowed = 'N';
    var functionId = document.getElementById("fastpath").value.toUpperCase();
    var xmlDOM = loadXMLDoc(gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM,"//*[@FNID = '" + functionId + "']");
    //Changes for new menuXML starts
    if (functionIdNode)
    {
        for (var i = 0; i < functionIdNode.attributes.length; i++)
        {
            if (functionIdNode.attributes[i].nodeName == "OFFLINEALLOWED")
            {
                l_OfflineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
                break;
            }
        }
    }
    var actWin = gActiveWindow;
    if (actWin && actWin.gAction == "")
    {
        if (actWin.dbDataDOM == null)
        {
            disableAllButtons();//Added
            for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++)
            {
                if (finalarr[l_Cnt].toUpperCase() == "NEW")
                {
				    // Changes made for WARBA - EOD time Operations - Start  //
                    if (BranchEoi == 'N'|| (BranchEoi != 'N' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) != -1) && gActiveWindow.l_offlineAllowed != 'Y'))
					// Changes made for WARBA - EOD time Operations - End  //
                    {
                        document.getElementById(finalarr[l_Cnt]).disabled = false;
                        document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        document.getElementById("EnterQuery").disabled = false;
                        document.getElementById("EnterQuery").className = 'BTNicon';
                    } else
                    {
                        if (l_OfflineAllowed != "Y")
                        {
                            document.getElementById(finalarr[l_Cnt]).disabled = true;
                            document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                            disableActionsInToolbar();
                        } else
                        {
                            document.getElementById(finalarr[l_Cnt]).disabled = false;
                            document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        }
                        }
                } else {
                    document.getElementById(finalarr[l_Cnt]).disabled = true;
                    document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                    }
            }
        } else {
            /* HAS BEEN ADDED TO ENABLE THE ENTER QUERY AFTER THE EXECUTE QUERY HAS BEEN COMPLETED */
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").className = 'BTNicon';
        }
    }

    if ((actWin && actWin.gAction == "ENTERQUERY"))
    {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++)
        {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
    }
    // Changes made for WARBA - EOD time Operations - Start  //
    //if (funcid.charAt(2).toUpperCase() == "S" || (l_OfflineAllowed != "Y" && BranchEoi == "T" && gActiveWindow.screenType != 'WB'))
	if (funcid.charAt(2).toUpperCase() == "S" || (l_OfflineAllowed != "Y" && BranchEoi == "T" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1)))
	// Changes made for WARBA - EOD time Operations - End  //
	
    { // Summary case
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++)
        {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").className= "BTNiconD";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    }
} //fnc

// Murali performance tunning
function fnWait() {
    if (!parent.gActiveWindow) {
        window.setTimeout("fnWait()", 25);
    }
    if (!gActiveWindow.dbDataDOM) {
        window.setTimeout("fnWait()", 25);
    }
}

/* Reads the RECORD_STAT/CONTRACT_STAT , AUTH_STAT or AUTH_STATS  from the HTML and returns as a ~ separated */
function gnGetTxnAuthStat()
{

    if (!gActiveWindow || gNumChildWindows < 0) return "~";

    var l_TxnVal = "";
    var l_Auth = "";
    var l_AuthField = "AUTH_STAT";
    var l_TxnField = "RECORD_STAT";
    var l_IsMaintScr = true;

    if (gNumChildWindows > 0 && gActiveWindow)
    {
        if (gActiveWindow.document.getElementsByName("MOD_NO").length == 0)
        {
            l_AuthField = "AUTHSTAT";
            l_TxnField = "CONTSTAT";
            l_IsMaintScr = false;
        }
    }

    if (gNumChildWindows > 0 && gActiveWindow)
    {
        if (gActiveWindow.document.getElementsByName(l_AuthField).length > 0)
        {
            if (gActiveWindow.document.getElementsByName(l_AuthField)[0].checked == true) l_Auth = "A";

            if (gActiveWindow.document.getElementsByName(l_AuthField)[0].checked == false) l_Auth = "U";
        }
    }

    if (gNumChildWindows > 0 && gActiveWindow)
    {
        if (gActiveWindow.document.getElementsByName(l_TxnField).length > 0)
        {
            if (l_IsMaintScr == true)
            {
                if (gActiveWindow.document.getElementsByName(l_TxnField)[0].checked == true) l_TxnVal = "O";

                if (gActiveWindow.document.getElementsByName(l_TxnField)[0].checked == false) l_TxnVal = "C";

            } else l_TxnVal = getTxnVal_Mapping(l_TxnField);
        }
    }

    return (l_TxnVal + "~" + l_Auth);
}

/* 
	Function :getTxnVal_Mapping
	This function will be used to extract the appropriate character value from audit contract status. 
	For example Description "Terminated" will be sent as "T".
	Author: Saidul Anam
    */

function getTxnVal_Mapping(l_TxnField)
{

    var l_TxnTempVal = "";
    if (parent.gActiveWindow)
    {
        if (parent.gActiveWindow.document.getElementsByName(l_TxnField)[0]) l_TxnTempVal = parent.gActiveWindow.document.getElementsByName(l_TxnField)[0].value;
    }

    if (l_TxnTempVal.length == 0) return "";

    if (l_TxnTempVal.length == 1) return l_TxnTempVal;

    var l_AuditValDesc = new Array();
    var LBL_CONSTAT_ACTIVE = mainWin.getItemDesc("LBL_CONSTAT_ACTIVE");
    var LBL_CONSTAT_CLOSED = mainWin.getItemDesc("LBL_CONSTAT_CLOSED");
    var LBL_CONSTAT_EXERCISED = mainWin.getItemDesc("LBL_CONSTAT_EXERCISED");
    var LBL_CONSTAT_HOLD = mainWin.getItemDesc("LBL_CONSTAT_HOLD");
    var LBL_CONSTAT_KNOCKEDIN = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDIN");
    var LBL_CONSTAT_CANCELLED = mainWin.getItemDesc("LBL_CONSTAT_CANCELLED");
    var LBL_CONSTAT_LIQUIDATED = mainWin.getItemDesc("LBL_CONSTAT_LIQUIDATED");
    var LBL_CONSTAT_REVERSED = mainWin.getItemDesc("LBL_CONSTAT_REVERSED");
    var LBL_CONSTAT_KNOCKEDOUT = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDOUT");
    var LBL_CONSTAT_EXPIRED = mainWin.getItemDesc("LBL_CONSTAT_EXPIRED");
    var LBL_CONSTAT_UNINITIATED = mainWin.getItemDesc("LBL_CONSTAT_UNINITIATED");
    var LBL_CONSTAT_OPEN = mainWin.getItemDesc("LBL_CONSTAT_OPEN");
    var LBL_CONSTAT_REV_INITIATED = mainWin.getItemDesc("LBL_CONSTAT_REV_INITIATED");
    var LBL_CONSTAT_REV_PARTIALLY = mainWin.getItemDesc("LBL_CONSTAT_REV_PARTIALLY");
    var LBL_CONSTAT_LAUNCH_INITIATED = mainWin.getItemDesc("LBL_CONSTAT_LAUNCH_INITIATED");
    var LBL_CONSTAT_LAUNCHED_PARTIALLY = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED_PARTIALLY");
    var LBL_CONSTAT_CAN_INITIATED = mainWin.getItemDesc("LBL_CONSTAT_CAN_INITIATED");
    var LBL_CONSTAT_CAN_PARTIALLY = mainWin.getItemDesc("LBL_CONSTAT_CAN_PARTIALLY");
    var LBL_CONSTAT_LAUNCHED = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED");
    var LBL_CONSTAT_TERMINATED = mainWin.getItemDesc("LBL_CONSTAT_TERMINATED");
    var LBL_CONSTAT_CL_PARTIALY = mainWin.getItemDesc("LBL_CONSTAT_CL_PARTIALY");
    var LBL_CONSTAT_REDEMD = mainWin.getItemDesc("LBL_CONSTAT_REDEMD");
    var LBL_CONSTAT_PROCESSED  = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
    var LBL_CONSTAT_SUGGESTED = mainWin.getItemDesc("LBL_CONSTAT_SUGGESTED");
    var LBL_CONSTAT_RESIDUED = mainWin.getItemDesc("LBL_CONSTAT_RESIDUED"); 

    l_AuditValDesc[LBL_CONSTAT_ACTIVE] = "A";
    l_AuditValDesc[LBL_CONSTAT_CLOSED] = "C";
    l_AuditValDesc[LBL_CONSTAT_EXERCISED] = "E";
    l_AuditValDesc[LBL_CONSTAT_HOLD] = "H";
    l_AuditValDesc[LBL_CONSTAT_KNOCKEDIN] = "I";
    l_AuditValDesc[LBL_CONSTAT_CANCELLED] = "K";
    l_AuditValDesc[LBL_CONSTAT_LIQUIDATED] = "L";
    l_AuditValDesc[LBL_CONSTAT_REVERSED] = "R";
    l_AuditValDesc[LBL_CONSTAT_CLOSED] = "S";
    l_AuditValDesc[LBL_CONSTAT_REVERSED] = "V";
    l_AuditValDesc[LBL_CONSTAT_KNOCKEDOUT] = "W";
    l_AuditValDesc[LBL_CONSTAT_EXPIRED] = "X";
    l_AuditValDesc[LBL_CONSTAT_UNINITIATED] = "Y";
    l_AuditValDesc[LBL_CONSTAT_OPEN] = "O";
    l_AuditValDesc[LBL_CONSTAT_TERMINATED] = "T";
    l_AuditValDesc[LBL_CONSTAT_REV_INITIATED] = "F";
    l_AuditValDesc[LBL_CONSTAT_REV_PARTIALLY] = "J";
    l_AuditValDesc[LBL_CONSTAT_LAUNCH_INITIATED] = "B";
    l_AuditValDesc[LBL_CONSTAT_LAUNCHED_PARTIALLY] = "G";
    l_AuditValDesc[LBL_CONSTAT_CAN_INITIATED] = "D";
    l_AuditValDesc[LBL_CONSTAT_CAN_PARTIALLY] = "Z";
    l_AuditValDesc[LBL_CONSTAT_LAUNCHED] = "Q";
    l_AuditValDesc[LBL_CONSTAT_CL_PARTIALY] = "M";
    l_AuditValDesc[LBL_CONSTAT_REDEMD] = "N";
    l_AuditValDesc[LBL_CONSTAT_PROCESSED] = "P";
    l_AuditValDesc[LBL_CONSTAT_SUGGESTED] = "s";
    l_AuditValDesc[LBL_CONSTAT_RESIDUED] = "r";

    if (l_AuditValDesc[l_TxnTempVal]) return l_AuditValDesc[l_TxnTempVal];
    else return "";

}

// Based on the Action Code the Tool bar buttons are enabled and disabled.
/*  If Save is succesful , Enable the tool bar with the User Rts + Txn Rts , Save shud be disabled
        If Save is not succesful , then only save shud be enabled. Similar to after new  
    */
function fnSetToolBarOnAction(v_Action)
{

    /*var funcid = document.all.fastpath.value;*/
    var funcid = document.getElementById("fastpath").value;
    if (funcid.charAt(2).toUpperCase() == "S" || (parent.frames["Global"].BranchEoi == 'T' && parent.gActiveWindow.screenType != 'WB')) return;

    /*var l_FncId = document.all.fastpath.value;*/
    var l_FncId = document.getElementById("fastpath").value;
    if (v_Action == "SAVE_SUCCESS")
    {
        showToolbar(l_FncId, '', '', '');
        document.getElementById("Save").disabled = true;
        parent.window.frames["FrameMenu"].document.getElementById("actions4").disabled = true; //sandy 
    }

    if (v_Action == "NEW")
    { // This is common for New and Save Fail 
        for (var l_Cnt = 0; l_Cnt < actions_arr.length; l_Cnt++)
        {
            document.getElementById(actions_arr[l_Cnt]).disabled = true;
        }
        disableActionsInDropdown();
        document.getElementById("Save").disabled = false;
        parent.window.frames["FrameMenu"].document.getElementById("actions4").disabled = false; //sandy 
    } // if NEW  
}

function showAction(action)
{
    document.getElementById(action).style.display = "inline";
}

function fnMouseOverRoot(curElem)
{
    if (curElem.className == 'BUTTONToolbarAction')
    {
        curElem.className = 'BUTTONToolbarActionOver';
    } else if (curElem.className == 'BUTTONToolbarNav')
    {
        curElem.className = 'BUTTONToolbarNavOver';
    } else if (curElem.className == 'BUTTONToolbarGoto')
    {
        curElem.className = 'BUTTONToolbarGotoOver';
    }
    return;
}

function fnMouseOutRoot(curElem)
{
    if (curElem.className == 'BUTTONToolbarActionOver')
    {
        curElem.className = 'BUTTONToolbarAction';
    } else if (curElem.className == 'BUTTONToolbarNavOver')
    {
        curElem.className = 'BUTTONToolbarNav';
    } else if (curElem.className == 'BUTTONToolbarGotoOver')
    {
        curElem.className = 'BUTTONToolbarGoto';
    }
    return;
}

function fnMouseDownRoot(curElem)
{
    if (curElem.className == 'BUTTONToolbarActionOver')
    {
        curElem.className = 'BUTTONToolbarAction';
    } else if (curElem.className == 'BUTTONToolbarNavOver')
    {
        curElem.className = 'BUTTONToolbarNav';
    } else if (curElem.className == 'BUTTONToolbarGotoOver')
    {
        curElem.className = 'BUTTONToolbarGoto';
    }
    return;
}

function isSessionActive() {
    objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", "BranchServlet", false); // Open the Connection to the Server
    objHTTP.setRequestHeader("Content-Type", "application/text");
    objHTTP.setRequestHeader("IS_SESSION_ACTIVE", "Y");
    objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
    objHTTP.send();
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
    catch(exp){
          mainWin.handleNetWorkErr(exp);
    } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    if(objHTTP.status != 200){ //9NT1606_12_2_RETRO_12_0_3_23656268 changes start
        
            mainWin.displayTimeOutErrDiv(objHTTP.status + "~" +   mainWin.getCommonErrorList()["SM-NE002"].split("~")[0].split(",")[0] + "<br>" + objHTTP.status + " - " +  objHTTP.statusText  );
            throw new Error(  mainWin.getCommonErrorList()["SM-NE002"].split("~")[0].split(",")[0]+ '. '+ objHTTP.statusText);
        }//9NT1606_12_2_RETRO_12_0_3_23656268 changes end
    var csrfNode = selectSingleNode(objHTTP.responseXML,"//CSRF");
    if(csrfNode != null && getNodeText(csrfNode) == "SM-00420"){
        alert(getNodeText(csrfNode)+mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    }else{ 
        var responseXML = objHTTP.responseXML;
        //var sessionNode = responseXML.selectSingleNode("//SESSION");
        var sessionNode = selectSingleNode(responseXML, "//SESSION");
        if (sessionNode) {
            //var sessionText = sessionNode.text;
            var sessionText = getNodeText(sessionNode);
            /*  changed for session timeout reminder starts */
            if (typeof(reminderWin) != "undefined" && reminderWin != null) {
                //inactiveTime=0; //ScreenSaver window appearing after Session Expired
                reminderWin.close();
            }
            /*  changed for session timeout reminder ends */
            if (sessionText == "EXPIRED") {
                /*12.0.2 Screen Saver Changes Start*/
                document.getElementById('screenSaverPwdDIV').style.display='none';
                screenSaverunmask(); 
                /*12.0.2 Screen Saver Changes End*/
                mainWin.mask();
                sessionTimeOut = true;
                showAlerts(fnBuildAlertXML("", "I", getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }
        }
		mainWin.inactiveTime = 0;
				/*Biometric Changes Start*/
                if( typeof(mainWin.branchPlugin) != 'undefined' && mainWin.branchPlugin =="Y"){
                  var funname = arguments.callee.caller.toString();
                 if(funname.indexOf("onclick")){
                    fnStartWebSocket();
                 }
                }/*Biometric Changes End*/
        return true;
    }
}

function fnShowProcess() {
    document.getElementById("processingDIV").children[0].src = "Processing.html";
    document.getElementById("processingDIV").style.display = "block";
}

function fnHideProcess() {
    document.getElementById("processingDIV").children[0].src = "";
    document.getElementById("processingDIV").style.display = "none";
}

/*Changes made to call the function from menu and toolbar
      Added parameter calledFrom. calledFrom is true when the function is called from Menu
     */
function fnChangeBrnOrMod(application, objectval, calledFrom)
{

   /* if (!isSessionActive()) session expiry change
    {
        return;
    } */
    var bool = true;
    if (application == 'FCJ')
    {
        bool = fnChangeBrn(objectval, calledFrom);
    } else
    {
        bool = fnChangeModule(objectval, calledFrom);
    }
    if (!bool)
    {
        return;
    }

    var chilWindowLength = parent.top.gNumChildWindows;
    for (var index = 0; index < chilWindowLength; index++)
    {
        try
        {
            if (parent.arrChildWindows[index].name)
            {
                //do nothing
            }
        } catch(e)
        {
            parent.top.gNumChildWindows--;
        }
    }

    if (top.gNumChildWindows > 0)
    {
        if (calledFrom)
        {
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
        } else
        {
            alert(top.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
        }
        return false;
    }

    if (application == 'FCJ')
    {
        if (calledFrom)
        {
            var conf = confirm(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CHANGE_BRN_CONFIRM") + objectval);
            if (conf == false) document.getElementById("BRANCH_CODE").value = "";
        } else
        {
            var conf = confirm(top.frames["Global"].getItemDesc("LBL_CHANGE_BRN_CONFIRM") + objectval);
            if (conf == false) document.getElementById("BRANCH_CODE").value = "";
        }
    } else
    {
        if (calledFrom)
        {
            var conf = confirm(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CHANGE_MODULE_CONFIRM") + objectval);
            if (conf == false) document.getElementById("TXT_MODULE_CODE").value = "";
        } else
        {
            var conf = confirm(top.frames["Global"].getItemDesc("LBL_CHANGE_MODULE_CONFIRM") + objectval);
            if (conf == false) document.getElementById("TXT_MODULE_CODE").value = "";
        }
    }

    if (conf)
    {
        fnPostBrnOrMod(objectval, application, calledFrom);
    }
}

function fnChangeBrn(objectval, calledFrom)
{
    if (objectval == null || "" == objectval || trim(objectval) == "")
    {
        if (calledFrom)
        {
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_NO_BRANCH"));
        } else
        {
            alert(top.frames["Global"].getItemDesc("LBL_NO_BRANCH"));
        }
        return false;
    }
    //If you try to change the branch to the current branch message is alerted. Included by Tazneem. 
    if (calledFrom)
    {
        var currentBranch = dlgArg.mainWin.frames["Global"].CurrentBranch;
        if (objectval == currentBranch)
        {
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_ALREADY_IN_SAME_BRN") + currentBranch);
            document.getElementById("BRANCH_CODE").value = "";
            return false;
        }
    } else
    {
        var currentBranch = top.frames["Global"].CurrentBranch;
        if (objectval == currentBranch)
        {
            alert(top.frames["Global"].getItemDesc("LBL_ALREADY_IN_SAME_BRN") + currentBranch);
            document.getElementById("BRANCH_CODE").value = "";
            return false;
        }
    } //end of change

    return true;
}

function fnChangeModule(objectval, calledFrom)
{

    if (objectval == null || "" == objectval || trim(objectval) == "")
    {
        if (calledFrom)
        {
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_NO_MODULE"));

        } else
        {
            alert(top.frames["Global"].getItemDesc("LBL_NO_MODULE"));
        }
        return false;
    }

    //If you try to change the module to the current module message is alerted. Included by Tazneem. 
    if (calledFrom)
    {
        var currentModule = dlgArg.mainWin.frames["Global"].CurrentModule;
        if (objectval == currentModule)
        {
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_ALREADY_IN_SAME_MODULE") + currentModule);
            return false;
        }

    } else
    {
        var currentModule = top.frames["Global"].CurrentModule;
        if (objectval == currentModule)
        {
            alert(top.frames["Global"].getItemDesc("LBL_ALREADY_IN_SAME_MODULE") + currentModule);
            return false;
        }
    } //end of change

    return true;
}

function fnPostBrnOrMod(objectval, application, calledFrom)
{
    var strFormData;
    var objHTTP;
    var xmlDoc;
    strFormData = 'branchtochange=' + objectval;

    try
    {
        objHTTP = new ActiveXObject("MSXML2.XMLHTTP.6.0");
    } catch(e)
    {
        objHTTP = new ActiveXObject("MSXML2.XMLHTTP.4.0");
    }
    try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes
    objHTTP.open("POST", "ChgBrnServlet?actionType=ChgBrn", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    var resp = objHTTP.responseXML;
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start
         mainWin.mask(); 
         mainWin.sessionTimeOut = true;
         mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
         return false;
    }//session expiry change end
    mainWin.inactiveTime = 0;
    /** Satish Modified bellow block for handling, change branch could not happen offline. */
    if (getXMLString(resp) == '')
    {
        var errcode = trim(objHTTP.responseText);
        if (errcode != "")
        {
            if (application == 'FCJ')
            {
                document.getElementById("BRANCH_CODE").value = objectval;
                document.getElementById("BRANCH_CODE").focus();
            } else
            {
                document.getElementById("TXT_MODULE_CODE").value = objectval;
                document.getElementById("TXT_MODULE_CODE").focus();
            }

            try
            {
                if (application == "FCJ")
                {
                    if (calledFrom)
                    {
                        //var message = eval('dlgArg.mainWin.frames["Global"].getCommonErrorList()["' + errcode + '"]');
                        var message = getCommonErrorList()[errcode];
                        message = message.substring(0, message.lastIndexOf("~"));
                        alert(message);
                        return false;
                    } else
                    {
                        //var message = eval('top.frames["Global"].getCommonErrorList()["' + errcode + '"]');
                        var message = getCommonErrorList()[errcode];
                        message = message.substring(0, message.lastIndexOf("~"));
                        alert(message);
                        return false;
                    }
                } else
                {
                    if (calledFrom)
                    {
                        //var message = eval('dlgArg.mainWin.frames["Global"].getCommonErrorList()["' + errcode + '"]');
                        var message = getCommonErrorList()[errcode];
                        message = message.substring(0, message.lastIndexOf("~"));
                        alert(message);
                        return false;
                    } else
                    {
                        //var message = eval('top.frames["Global"].getCommonErrorList()["' + errcode + '"]');
                        var message = getCommonErrorList()[errcode];
                        message = message.substring(0, message.lastIndexOf("~"));
                        alert(message);
                        return false;
                    }
                }
            } catch(e)
            {
                return false;
            }
            return;
        }

        if (calledFrom)
        {
            dlgArg.mainWin.gUnloadReqd = false;
            dlgArg.mainWin.document.body.setAttribute("onbeforeunload", "", 0);
            dlgArg.mainWin.location.href = "SMMDIFRM.jsp?chgbrn=true&loggedInTime="+gLoginTime;;
        } else
        {
            top.gUnloadReqd = false;
            top.document.body.setAttribute("onbeforeunload", "", 0);
            top.location.href = "SMMDIFRM.jsp?chgbrn=true&loggedInTime="+gLoginTime;;
        }
        self.close();

    } else
    {

        try
        {
            xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
        } catch(e)
        {
            xmlDoc = new ActiveXObject("Msxml2.DOMDocument.4.0");
        }

        xmlDoc.async = false;
        xmlDoc.loadXML('<RESPONSE>' + getXMLString(resp) + '</RESPONSE>');
        var elem = xmlDoc.selectSingleNode("//RESPONSE");
        if (elem != null)
        {
            var nodeList = elem.selectNodes("//MESSAGE");
            if (nodeList.length > 0)
            {
                var node = elem.selectSingleNode("//MESSAGE");
                var attr = node.getAttribute("TYPE");
                var message = "";
                if (nodeList.length > 0)
                {
                    for (var i = 0; i < nodeList.length; i++)
                    {
                        node = nodeList.item(i);
                        message = message + node.text;
                        message = message + "~";
                    }

                    var returnVal = "";
                    returnVal = ShowErrorDialog(attr, message);
                    if (returnVal == 'OK')
                    {
                        //document.all.errors.value="";	
                    }
                }
            }
        }
    }
}

function fnLoad()
{
    if (parent.isAppGlobalLoaded == true)
    {
        /*var d = getDateObject();   
        parent.toolbarEnd = "ToolbarEndTime:-->" + d.getHours() + ":" + d.getMinutes()+ ":" +d.getSeconds()+":"+d.getMilliseconds() ;  
        */
        finalarr = new Array();
        t = new parent.txn_actions();
        parent.isHToolbarLoaded = true;
    } else {
        setTimeout("fnLoad()", 5);
    }
    //var d = getDateObject();   
    //parent.toolbarEnd = "ToolbarEndTime:-->" + d.getHours() + ":" + d.getMinutes()+ ":" +d.getSeconds()+":"+d.getMilliseconds() ;  
    //disableForm();
    //alert("toolbar-->"+startUp);
}
/*When the function is called from SMCHGBRN.jsp homeBranch1 is passed which is the home branch
      changed by Tazneem
    */
function fnChangeToHomeBrn(homeBranch, application, calledFrom)
{

   /* if (!isSessionActive()) session expiry change
    {
        return;
    } */

    var bool = true;
    if (homeBranch)
    {
        if (application == "FCJ")
        {
            if (calledFrom)
            {
                if (dlgArg.mainWin.frames["Global"].CurrentBranch == homeBranch)
                {
                    //fnHideProcess();
                    alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_ALREADY_IN_HOME"));
                    return false;
                } else
                {
                    bool = fnChangeBrn(homeBranch, calledFrom);
                }
            } else
            {
                if (top.frames["Global"].CurrentBranch == homeBranch)
                {
                    alert(top.frames["Global"].getItemDesc("LBL_ALREADY_IN_HOME"));
                    return false;
                } else
                {
                    bool = fnChangeBrn(homeBranch, calledFrom);
                }
            }
        } else
        {
            // Check for FCIS      
            if (calledFrom)
            {
                if (dlgArg.mainWin.frames["Global"].CurrentModule == homeBranch)
                {
                    alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_ALREADY_IN_MODULE"));
                    return false;
                } else
                {
                    bool = fnChangeBrn(homeBranch, calledFrom);
                }

            } else
            {
                if (top.frames["Global"].CurrentModule == homeBranch)
                {
                    alert(top.frames["Global"].getItemDesc("LBL_ALREADY_IN_MODULE"));
                    return false;
                } else
                {
                    bool = fnChangeBrn(homeBranch, calledFrom);
                }
            }
        }
    }
    if (!bool)
    {
        return;
    }

    var chilWindowLength = parent.top.gNumChildWindows;
    for (var index = 0; index < chilWindowLength; index++)
    {
        try
        {
            if (parent.arrChildWindows[index].name)
            {
                //do nothing
            }
        } catch(e)
        {
            parent.top.gNumChildWindows--;
        }
    }
    if (top.gNumChildWindows > 0)
    {
        if (calledFrom)
        {
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
        } else
        {
            alert(top.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
        }
        return false;
    }
    if (application == 'FCJ')
    {
        if (calledFrom) var conf = confirm(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CHANGE_TO_HOME"));
        else var conf = confirm(top.frames["Global"].getItemDesc("LBL_CHANGE_TO_HOME"));
        if (conf == false) document.getElementById("BRANCH_CODE").value = "";
    } else
    {
        if (calledFrom) var conf = confirm(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CHANGE_TO_DEFAULT"));
        else var conf = confirm(top.frames["Global"].getItemDesc("LBL_CHANGE_TO_DEFAULT"));
        if (conf == false) document.getElementById("TXT_MODULE_CODE").value = "";
    }
    if (conf)
    {
        fnPostBrnOrMod(homeBranch, application, calledFrom);
    } else
    {
        //fnHideProcess();
    }
}

/*Added functions enableMenu and disableMenu by Tazneem
     *These functions will enable and disable the items in menu according to user rights.
     *Index refers to index of DIV in SMAPPMNU.jsp
     *action refers to those actions for which the user has rights.
     *Called from showToolbar. 
     */
function enableMenu(action)
{
    var menuAction;
    if (tempFlag)
    {
        for (var index = 3; index < 10; index++)
        {
            menuAction = parent.frames["FrameMenu"].document.getElementsByTagName("DIV")[index];
            menuAction.disabled = true;
        }
    }
    tempFlag = false;
    for (var index = 3; index < 10; index++)
    {
        menuAction = parent.frames["FrameMenu"].document.getElementsByTagName("DIV")[index];
        var action1 = menuAction.innerText;
        if (action1 == action)
        {
            menuAction.disabled = false;
        }
    }
}
function disableMenu(action)
{
    for (var index = 3; index < 10; index++)
    {
        var menuAction = parent.frames["FrameMenu"].document.getElementsByTagName("DIV")[index];
        var action1 = menuAction.innerText;
        if (action1 == action)
        {
            menuAction.disabled = true;
        }
    }
}

function fnHandleHotKeys(keyCode,event) {
        if(mainWin.hotkeyArray.length <= 0){
             event.returnValue = false;
             return false;
        }
        if (keyCode == 49 || keyCode == 97) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[0];
        } else if (keyCode == 50 || keyCode == 98) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[1];
        } else if (keyCode == 51 || keyCode == 99) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[2];
        } else if (keyCode == 52 || keyCode == 100) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[3];
        } else if (keyCode == 53 || keyCode == 101) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[4];
        } else if (keyCode == 54 || keyCode == 102) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[5];
        } else if (keyCode == 55 || keyCode == 103) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[6];
        } else if (keyCode == 56 || keyCode == 104) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[7];
        } else if (keyCode == 57 || keyCode == 105) {
            mainWin.document.getElementById("fastpath").value = mainWin.hotkeyArray[8];
    }
    event.returnValue = false;
    doAction('Go');
}

function fnHTLBarKeyEvents(e) {
    var event = window.event || e;
    if (event.ctrlKey == true && ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106))) {
        fnHandleHotKeys(event.keyCode,event);
    }
    //fix for 16177138 starts
    if (event.shiftKey == true && event.keyCode == 121) {
        fnDisableBrowserKey(event);
        preventpropagate(event);
        try {
            event.keyCode = 0;
        } catch (e) {}
        return false;
    }
    //fix for 16177138 ends
    if (event.altKey == true && event.keyCode == 71 && getBrowser().indexOf("IE") !=  - 1) {//HTML5 changes 2/NOV/2016 Fix for 24941207 start
        doAction('SignOff',event);
    }//HTML5 changes 2/NOV/2016 Fix for 24941207 end
    disableCommonKeys(event);
    /*if (event.ctrlKey) {
      switch(event.keyCode) {
        case 66 : //B = Organize Favourities in IE
        case 68 : //D = Add a Favouritie in IE
        case 69 : //E = Search Web in IE
        case 70 : //F = Find in IE
        case 72 : //H = History in IE
        case 73 : //I = Manage Favourities in IE
        case 74 : //J = Manage Feeds in IE
        case 76 : //L = Open in IE
        case 78 : //N = New
        case 79 : //O = Open in IE
        case 80 : //P = Print in IE
        case 82 : //R = Refresh in IE
        case 87 : //W = Close window in IE
        case 112: //F1 = Help
        case 116: //F5 = Refresh
          fnDisableBrowserKey(event);
          preventpropagate(event);
          try {
            event.keyCode = 0;
          } catch(e) {}
          return false;
      }
    }
    if (event.keyCode == 112)
    {
        event.returnValue = false;
        return;
    }*/
    if(event.ctrlKey == true){
        if(event.shiftKey == true && (event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 54)){
            var i = event.keyCode;
            if(document.getElementsByTagName("iframe")[i-49]){
                document.getElementsByTagName("iframe")[i-49].contentWindow.focus();
                return true;
            }
        }
    }
    if (event.keyCode == 13)
    {
        var eventElem = getEventSourceElement(event);
        if (eventElem.name == "BRANCH_CODE")
        {
            fnChangeBrn(eventElem.value);
        } else if (eventElem.id == "fastpath")//REDWOOD_CHANGES
        {
            if(mainWin.actionBeforeUnmask == "INVFUNC"){//MULTIPLE_FUNC_ID_LAUNCH_ISSUE starts
                mainWin.actionBeforeUnmask="";
            }else{//MULTIPLE_FUNC_ID_LAUNCH_ISSUE ends
                doAction('Go');
            }
        }
         /*12.0.2 Changes Start*/
         else if (eventElem.name == "MenuSearch"){
         fnQuickSearch();
           
         }
           /*12.0.2 Changes End*/
//12.0.2 changes for customer tab starts       
//12.1 Dashboard changes --start
       /*         else if (document.getElementById("customerQuery"))
        {
        fnCustomerQuery("true");

        }*/
        
//12.1 Dashboard changes --end
//12.0.2 changes for customer tab ends 
        return false;
    }
    // Reddy Prasad added here
    if (event.altKey == true && event.keyCode == 70)
    {
        if (document.getElementById("fastpath"));
        document.getElementById("fastpath").focus();
    }
    // Don't bubble the event on the TXT_BRANCH_CODE and fastpath field.
    event.cancelBubble = true;
}

function disableActionsInToolbar()
{
    var jIndex = finalarr.length;
    document.getElementById("Save").disabled = true;
    for (index = 0; index < jIndex; index++)
    {
        document.getElementById(finalarr[index]).disabled = true;
    }
}

function enableActionsInToolbar()
{
    document.getElementById("Save").disabled = true;
    var jIndex = finalarr.length;
    for (index = 0; index < jIndex; index++)
    {
        if (finalarr[index] != "Save")
        {
            document.getElementById(finalarr[index]).disabled = false;
        }
    }
    // showActionsInDropdown(finalarr);
}

function fnSave()
{
    if (parent.gActiveWindow)
    {
        parent.gActiveWindow.fnSave();
    } else
    {
        window.close;
    }
}
//Added By Fahad as part of Retro from 9NT496
function fnProcSave()
{
    parent.gActiveWindow.stage = "ACCEPT";
    fnSave();
}
//Added By Fahad as part of Retro from 9NT496
function fnProcHold()
{
    if (txnXmlDOM && txnXmlDOM.selectSingleNode("//neo:transaction/@taskId") && gAction == "NEW")
    {
        if (trim(txnXmlDOM.selectSingleNode("//neo:transaction/@taskId").text) != '')
        {
            parent.gActiveWindow.stage = "HOLD";
            fnSave();
            return;
        }

        alert(parent.frames['Global'].getItemDesc("LBL_INVALID_OP"));
    }
}

function disableSaveInToolbarForSummary()
{
    var jIndex = finalarr.length;
    for (index = 0; index < jIndex; index++)
    {
        if (finalarr[index] == "Save")
        {
            document.getElementById(finalarr[index]).disabled = true;
        }
    }
}

function disableDeleteInToolbarForSummary()
{
    var jIndex = finalarr.length;
    for (index = 0; index < jIndex; index++)
    {
        if (finalarr[index] == "DELETE")
        {
            //fnDisableElement(document.getElementById(finalarr[index]));
            document.getElementById(finalarr[index]).disabled = true;
        }
    }
}

function disableNavForSummary()
{}

// Kals On July 6 . If the LATESTVERNO is 1 and Reocrd in U , then enable Hold
function fnEnableHold()
{
    try
    {

        var l_TableName = parent.gActiveWindow.dataSrcLocationArray[0]
        var l_RespMsg = parent.gActiveWindow.fcjResponseDOM;
        var l_Xpath = "//FLD/FN[@TYPE = '" + l_TableName + "']"
        var l_FN_Node = l_RespMsg.selectSingleNode(l_Xpath);
        var l_LatVerIdx = -1;

        if (!l_FN_Node) return;
        var l_TSL_FN = l_FN_Node.text;
        var l_FNArr = l_TSL_FN.split("~");
        for (var l_Cnt = 0; l_Cnt < l_FNArr.length; l_Cnt++)
        {
            if (l_FNArr[l_Cnt] == "LATESTVERNO")
            {
                l_LatVerIdx = l_Cnt;
                break;
            }
        } //for

        if (l_LatVerIdx == -1) return;

        var l_FVXpath = "//REC[@TYPE = '" + l_TableName + "']";
        var l_FV_Node = l_RespMsg.selectSingleNode(l_FVXpath);
        if (!l_FV_Node) return;
        var l_FV_Arr = l_FV_Node.text.split("~");
        var l_LatVer = l_FV_Arr[l_LatVerIdx];
        var l_HoldBtn = document.getElementById("HOLD");
        if (l_LatVer == "1" && l_HoldBtn)
        {
            l_HoldBtn.disabled = false;
        }

    } //try
    catch(e)
    {}
}

function enableSave()
{
    document.getElementById("Save").className ="BTNicon";
    document.getElementById("Save").disabled = false;
    
    /*document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";*/

}

function fnEnableHoldButton()
{
    document.getElementById("Hold").className ="BTNicon";
    //document.getElementById("Hold").firstChild.src = theme_imagesPath + "/Toolbar/icHold.gif";
    document.getElementById("Hold").disabled = false;
    //parent.window.frames["FrameMenu"].document.getElementById("actions3").firstChild.src = theme_imagesPath + "/Toolbar/icHold.gif";
}

function fnDisableHoldButton()
{
    document.getElementById("Hold").className ="BTNiconD";
    //document.getElementById("Hold").firstChild.src = theme_imagesPath + "/Toolbar/icHold_D.gif";
    document.getElementById("Hold").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("actions3").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("actions3").firstChild.className = "BTNiconD";
    //parent.window.frames["FrameMenu"].document.getElementById("actions3").firstChild.src = theme_imagesPath + "/Toolbar/icHold_D.gif";

}

function fnEnableReverseButton()
{
    document.getElementById("Reverse").className ="BTNicon";
    //document.getElementById("Reverse").firstChild.src = theme_imagesPath + "/Toolbar/icReverse.gif";
    document.getElementById("Reverse").disabled = false;
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.src = theme_imagesPath + "/Toolbar/icReverse.gif";

}

function fnDisableReverseButton()
{
    document.getElementById("Reverse").className ="BTNiconD";
    //document.getElementById("Reverse").firstChild.src = theme_imagesPath + "/Toolbar/icReverse_D.gif";
    document.getElementById("Reverse").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation3").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.className = "BTNiconD";
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.src = theme_imagesPath + "/Toolbar/icReverse_D.gif";
}

function fnEnableRolloverButton()
{
    document.getElementById("Rollover").className ="BTNicon";
    //document.getElementById("Rollover").firstChild.src = theme_imagesPath + "/Toolbar/icRollover.gif";
    document.getElementById("Rollover").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("operation2").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("operation2").firstChild.className = "BTNicon";
    //parent.window.frames["FrameMenu"].document.getElementById("operation2").firstChild.src = theme_imagesPath + "/Toolbar/icRollover.gif";

}

function fnDisableRolloverButton()
{
    document.getElementById("Rollover").className ="BTNiconD";
    //document.getElementById("Rollover").firstChild.src = theme_imagesPath + "/Toolbar/icRollover_D.gif";
    document.getElementById("Rollover").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation2").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation2").firstChild.className = "BTNiconD";
    //parent.window.frames["FrameMenu"].document.getElementById("operation2").firstChild.src = theme_imagesPath + "/Toolbar/icRollover_D.gif";

}

function fnEnableConfirmButton()
{
    document.getElementById("Confirm").className ="BTNicon";
    //document.getElementById("Confirm").firstChild.src = theme_imagesPath + "/Toolbar/icConfirm.gif";
    document.getElementById("Confirm").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("operation0").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("operation0").firstChild.className = "BTNicon";
    //parent.window.frames["FrameMenu"].document.getElementById("operation0").firstChild.src = theme_imagesPath + "/Toolbar/icConfirm.gif";

}

function fnDisableConfirmButton()
{
    document.getElementById("Confirm").className ="BTNiconD";
    //document.getElementById("Confirm").firstChild.src = theme_imagesPath + "/Toolbar/icConfirm_D.gif";
    document.getElementById("Confirm").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation0").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation0").firstChild.className = "BTNiconD";
    //parent.window.frames["FrameMenu"].document.getElementById("operation0").firstChild.src = theme_imagesPath + "/Toolbar/icConfirm_D.gif";

}

function fnEnableLiquidateButton()
{
    document.getElementById("Liquidate").className ="BTNicon";
    //document.getElementById("Liquidate").firstChild.src = theme_imagesPath + "/Toolbar/icLiquidate.gif";
    document.getElementById("Liquidate").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("operation1").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("operation1").firstChild.className = "BTNicon";
    //parent.window.frames["FrameMenu"].document.getElementById("operation1").firstChild.src = theme_imagesPath + "/Toolbar/icLiquidate.gif";

}

function fnDisableLiquidateButton()
{
    document.getElementById("Liquidate").className ="BTNiconD";
    //document.getElementById("Liquidate").firstChild.src = theme_imagesPath + "/Toolbar/icLiquidate_D.gif";
    document.getElementById("Liquidate").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation1").disabled = true;
    parent.window.frames["FrameMenu"].document.getElementById("operation1").firstChild.className = "BTNiconD";
    //parent.window.frames["FrameMenu"].document.getElementById("operation1").firstChild.src = theme_imagesPath + "/Toolbar/icLiquidate_D.gif";

}

/*function alert(message)
{
    var labelDesc = "";
    var attr = "I";
    return window.showModalDialog("ExtAlert.jsp?type=" + attr + "&label=" + labelDesc, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
}
*/
function confirm(message)
{
    var returnVal = window.showModalDialog("ExtAlert.jsp?type=C", message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
    if (returnVal == "CANCEL") return false;
    else return true;
}

function fnHideProcessWait()
{
    var t = setTimeout("fnHideProcess();", 25);
}

function isSameMakerId() {
    if (gNumChildWindows != 0 && gActiveWindow) {
        var field = "MAKERID";
        if (gActiveWindow.screenType == 'M') {
            field = "MAKER_ID";
        }
        if (gActiveWindow.document.getElementsByName(field).length > 0) {
            if (gActiveWindow.document.getElementsByName("REVR_MAKERID").length > 0 && gActiveWindow.document.getElementsByName("REVR_MAKERID")[0].value != "") {
                if (gActiveWindow.document.getElementsByName("REVR_MAKERID")[0].value == UserId) {
                    return false;
                }
            } else {
                if (gActiveWindow.document.getElementsByName(field)[0].value == UserId) {
                    return false;
                }
            }
        }
    }
    return true;
}
function fnChangeDeptOrMod(application,objectval,calledFrom){
  /* if(!isSessionActive()) { session expiry change
      return;
    } */
    var bool = true;
    if(application == 'FCJ')     {
        bool = fnChangeDept(objectval,calledFrom);
    }
    if(!bool)
        return;
    
    var chilWindowLength = parent.top.gNumChildWindows;
    for(var index =0;index < chilWindowLength;index++){
        try{
            if(parent.arrChildWindows[index].name){    
            }
        }catch(e){
             parent.top.gNumChildWindows--;
        }
    }        
    
    if(top.gNumChildWindows > 0) {
        if(calledFrom){
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
        }
        else{
            alert(top.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
        }
        return false;
      }
      if(application == 'FCJ'){
            if(calledFrom){
                var conf=confirm(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CHANGE_DEPT_CONFIRM")+objectval);
                if(conf == false)
                    document.getElementById("DEPARTMENT_CODE").value = "";
            }
            else{
                var conf=confirm(top.frames["Global"].getItemDesc("LBL_CHANGE_DEPT_CONFIRM")+objectval);
                if(conf == false)
                    document.getElementById("DEPARTMENT_CODE").value = "";
            }
      }
      
      if(conf){
            //alert("its conf");FC 11.4 NLS Changes
            fnPostDeptOrMod(objectval,application,calledFrom);
      }          
}

function fnChangeDept(objectval,calledFrom){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(objectval == null || "" == objectval || trim(objectval) == "" ) {
        parent.alertAction = "UNMASK";
        mask();
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_NO_DEPT"));
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    }
    if(gNumChildWindows > 0){
        parent.alertAction="UNMASK";
        mask();
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_CLOSE_ALL") ,'I');
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    }
    var currentDept = mainWin.CurrentDept;
    if(objectval == currentDept){
        parent.alertAction = "UNMASK";
        mask();
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_NO_DEPT"));
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    } else if (confirmatioReq) {
        parent.alertAction = "CHGDEPT";
        mask();
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_CHANGE_DEPT_CONFIRM") + objectval);
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"C");
        return;
    }
    var objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", "ChgDeptServlet?actionType=ChgDep", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
    strFormData = 'depttochange='+objectval;
    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    var responseText = objHTTP.responseText;
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start
         mainWin.mask(); 
         mainWin.sessionTimeOut = true;
         mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
         return false;
    }//session expiry change end
    var msgStat = getNodeText(selectSingleNode(loadXMLDoc(responseText), "//MSGSTAT"));
    if (msgStat.indexOf("SUCCESS") < 0) {
        parent.alertAction = "UNMASK";
        mask();
        var message = parent.getCommonErrorList()[msgStat];
        message = message.substring(0, message.indexOf("~"));
        var alertXML = fnBuildAlertXML(responseText, 'E', message);
        showAlerts(alertXML, 'E');
        return;
    } else {
        top.document.body.setAttribute("onbeforeunload", "", 0);
        top.document.body.setAttribute("onunload", "", 0);
        top.location.href="SMMDIFRM.jsp?chgdept=true&loggedInTime="+gLoginTime;;
    }
    parent.alertAction = "";   
}

 function fnPostDeptOrMod(objectval,application,calledFrom){
     var strFormData;
      var objHTTP;
      var xmlDoc;             
       strFormData = 'depttochange='+objectval;              
      objHTTP = new ActiveXObject("MSXML2.XMLHTTP.4.0");
      objHTTP.open("POST","ChgDeptServlet?actionType=ChgDep",false);
      objHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
      objHTTP.send(strFormData);
      var resp = objHTTP.responseXML;  
      if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start
          mainWin.mask(); 
          mainWin.sessionTimeOut = true;
          mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
          return false;
      }//session expiry change end
      mainWin.inactiveTime = 0;
  /**
        *  bellow block for handling, change branch could not happen offline.
   */          
  if(getXMLString(resp)==''){
    //if(objHTTP.responseText == "FC-MAINT51"){
    var errcode = trim(objHTTP.responseText);
    if(errcode != ""){
        if(application == 'FCJ'){
        //document.getElementById("BRANCH_CODE").value = objectval;
        //document.getElementById("BRANCH_CODE").focus();
        document.getElementById("DEPARTMENT_CODE").value = objectval;
        document.getElementById("DEPARTMENT_CODE").focus();
        }

        try{
             if(application == "FCJ"){
                if (calledFrom) {
                    //var message = eval('dlgArg.mainWin.frames["Global"].getCommonErrorList()["'+ errcode +'"]');
                    var message = getCommonErrorList()[errcode];
                    message = message.substring(0,message.lastIndexOf("~"));
                    alert(message);
                    return false;
                }
                else {
                    //var message = top.frames["Global"].getCommonErrorList()["FC-MAINT51"];
                    //var message = eval('top.frames["Global"].getCommonErrorList()["'+ errcode +'"]');
                    var message = getCommonErrorList()[errcode];
                    message = message.substring(0,message.lastIndexOf("~"));
                    alert(message);
                    return false;
                }
             }
             else{
                  if (calledFrom) {
                      //var message = eval('dlgArg.mainWin.frames["Global"].getCommonErrorList()["'+ errcode +'"]');
                      var message = getCommonErrorList()[errcode];
                      message = message.substring(0,message.lastIndexOf("~"));
                      alert(message);
                      return false;
                  }
                  else {
                      //var message = eval('top.frames["Global"].getCommonErrorList()["'+ errcode +'"]');
                      var message = getCommonErrorList()[errcode];
                      message = message.substring(0,message.lastIndexOf("~"));
                      alert(message);
                      return false;
                  }
             }
        }
        catch(e){
             return false;
        }
        return;
    }    
    if(calledFrom){
        dlgArg.mainWin.gUnloadReqd = false;
        dlgArg.mainWin.location.href = "SMMDIFRM.jsp?chgdept=true&loggedInTime="+gLoginTime;;
    }
    else{
        top.gUnloadReqd = false;
        top.location.href = "SMMDIFRM.jsp?chgdept=true&loggedInTime="+gLoginTime;;
    }
    self.close();
  }
  else 
  {	
        xmlDoc = new ActiveXObject("Msxml2.DOMDocument.4.0");
        xmlDoc.async = false;
        xmlDoc.loadXML('<RESPONSE>'+getXMLString(resp)+'</RESPONSE>');
        var elem = xmlDoc.selectSingleNode("//RESPONSE");
            if(elem != null)
            {
         var nodeList = elem.selectNodes("//MESSAGE");
         if(nodeList.length > 0)
         {
                    var node = elem.selectSingleNode("//MESSAGE");
                    var attr = node.getAttribute("TYPE");
            var message = "";
            if(nodeList.length > 0)
            {
                    for(var i = 0; i < nodeList.length; i++)
                    { 
                            node = nodeList.item(i);
                            message = message + node.text;
                                    message = message +"~";
                    }
            var returnVal = "";
                    //alert("Message is "+message);    	
                    
                            returnVal = ShowErrorDialog(attr, message);
                            if(returnVal == 'OK') {
                                    //document.all.errors.value="";	
                }
            }
        }
    }
      }	
}
 
function fnChangeToHomeDept(homeDept,application,calledFrom){
 /*   if(!isSessionActive()) session expiry change
            return;
*/
            var bool = true;
            if(homeDept){
                    if (calledFrom) {    
                            if(dlgArg.mainWin.frames["Global"].CurrentDept == homeDept){
                                      alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_ALREADY_IN_HOME_DEPT"));
                                      return false;
                            }else{

                                            bool = fnChangeDept(homeDept,calledFrom);
                            }
                    }
                    else {
                            if(top.frames["Global"].CurrentDept == homeDept){
                                      alert(top.frames["Global"].getItemDesc("LBL_ALREADY_IN_HOME_DEPT"));
                                      return false;
                            }else{

                                            bool = fnChangeDept(homeDept,calledFrom);
                            }
                    }
            }

    if(!bool)
            return;

    var chilWindowLength = parent.top.gNumChildWindows;
    for(var index =0;index < chilWindowLength;index++){
            try{
                    if(parent.arrChildWindows[index].name){    
                            //do nothing
                    }
            }catch(e){
                     parent.top.gNumChildWindows--;
            }
    }
    if(top.gNumChildWindows > 0) {
            if(calledFrom){
                    alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
            }
            else{
                    alert(top.frames["Global"].getItemDesc("LBL_CLOSE_ALL"));
            }
            return false;
              }
    //Latam changes by Sampath -- 11/3/09
      if(application == 'FCJ'){
                    if(calledFrom)
                            var conf=confirm(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CHANGE_TO_HOME_DEPT"));
                    else
                            var conf=confirm(top.frames["Global"].getItemDesc("LBL_CHANGE_TO_HOME_DEPT"));
                    if(conf == false)
                            document.getElementById("DEPARTMENT_CODE").value = "";
      }else{
                    if(calledFrom)
                            var conf=confirm(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CHANGE_TO_HOME_DEPT"));
                    else
                            var conf=confirm(top.frames["Global"].getItemDesc("LBL_CHANGE_TO_HOME_DEPT"));
                    if(conf == false)
                            document.getElementById("TXT_MODULE_CODE").value = "";
      }
      if(conf){
                    fnPostDeptOrMod(homeDept,application,calledFrom);
      }              
}
//HTML5 Changes Start
function showMenu(menuObj, isLi, evnt) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var e = window.event || evnt;
    if(!menuObj) return false;
    if (menuObj.tagName.toUpperCase() == "UL") {
        if (menuObj.className == "listPop") {
            menuObj.className = "listPop show";
            getPreviousSibling(menuObj).getElementsByTagName("LI")[0].className = getPreviousSibling(menuObj).getElementsByTagName("LI")[0].className + " selected";
            getPreviousSibling(menuObj).getElementsByTagName("LI")[0].children[0].className = getPreviousSibling(menuObj).getElementsByTagName("LI")[0].children[0].className + " selected";
        } else if (getNextSibling(menuObj).tagName.toUpperCase() == "UL" && getNextSibling(menuObj).className == "listPop") {
            getNextSibling(menuObj).className = "listPop show";
        }
    } else if (menuObj.tagName.toUpperCase() == "LI") {
        if (menuObj.parentNode.tagName.toUpperCase() == "UL" && menuObj.parentNode.className == "listPop") {
            menuObj.parentNode.className = "listPop show";
            getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].className = getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].className + " selected";
            getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].children[0].className = getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].children[0].className + " selected";
        } else if (getNextSibling(menuObj.parentNode)!= null && getNextSibling(menuObj.parentNode).tagName.toUpperCase() == "UL" && getNextSibling(menuObj.parentNode).className == "listPop") {//HTML5 Changes 6/OCT/2016
            getNextSibling(menuObj.parentNode).className = "listPop show";
        }
    } else {
        srcElem = getEventSourceElement(e);
        if (srcElem.tagName.toUpperCase() == "UL") {
            if (srcElem.className == "listPop") {
                srcElem.className = "listPop show";
                getPreviousSibling(srcElem).getElementsByTagName("LI")[0].className = getPreviousSibling(srcElem).getElementsByTagName("LI")[0].className + " selected";
                getPreviousSibling(srcElem).getElementsByTagName("LI")[0].children[0].className = getPreviousSibling(srcElem).getElementsByTagName("LI")[0].children[0].className + " selected";
            } else if (getNextSibling(srcElem).tagName.toUpperCase() == "UL" && getNextSibling(srcElem).className == "listPop") {
                getNextSibling(srcElem).className = "listPop show";
                srcElem.getElementsByTagName("LI")[0].className = srcElem.getElementsByTagName("LI")[0].className + " selected";
                srcElem.getElementsByTagName("LI")[0].children[0].className = srcElem.getElementsByTagName("LI")[0].children[0].className + " selected";
            }
        }
    }
    return true;
}

function hideMenu(menuObj, isLi, fromDropDown, evnt) {
    var e = window.event || evnt;
    if(!menuObj) return false;
    if (menuObj.tagName.toUpperCase() == "UL") {
        if (menuObj.className == "listPop show") {
            menuObj.className = "listPop";
            removeKeydownLIClass(menuObj.children);//HTML5 Changes 6/OCT/2016
            getPreviousSibling(menuObj).getElementsByTagName("LI")[0].className = getPreviousSibling(menuObj).getElementsByTagName("LI")[0].className.split(" ")[0];
            getPreviousSibling(menuObj).getElementsByTagName("LI")[0].children[0].className = getPreviousSibling(menuObj).getElementsByTagName("LI")[0].children[0].className.split(" ")[0];
        } else if (getNextSibling(menuObj).tagName.toUpperCase() == "UL" && getNextSibling(menuObj).className == "listPop show") {
            getNextSibling(menuObj).className = "listPop";
        }
    } else if (menuObj.tagName.toUpperCase() == "LI" && menuObj.parentNode.tagName.toUpperCase() == "UL") {
        if (menuObj.parentNode.className.indexOf("listPop") != -1) {
            menuObj.parentNode.className = "listPop";
            removeKeydownLIClass(menuObj.parentNode.children);//HTML5 Changes 6/OCT/2016
            getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].className = getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].className.split(" ")[0];
            getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].children[0].className = getPreviousSibling(menuObj.parentNode).getElementsByTagName("LI")[0].children[0].className.split(" ")[0];
        } else if (getNextSibling(menuObj.parentNode).tagName.toUpperCase() == "UL" && getNextSibling(menuObj.parentNode).className == "listPop show") {
            getNextSibling(menuObj.parentNode).className = "listPop";
        }
    } else {
        srcElem = getEventSourceElement(e);
        if (srcElem.tagName.toUpperCase() == "UL") {//HTML5 Changes 6/OCT/2016 Start
            if (srcElem.className == "listPop show") {
                srcElem.className = "listPop";
                removeKeydownLIClass(srcElem.children);
                getPreviousSibling(srcElem).getElementsByTagName("LI")[0].className = getPreviousSibling(srcElem).getElementsByTagName("LI")[0].className.split(" ")[0];
                getPreviousSibling(srcElem).getElementsByTagName("LI")[0].children[0].className = getPreviousSibling(srcElem).getElementsByTagName("LI")[0].children[0].className.split(" ")[0];
            } else if (getNextSibling(srcElem).tagName.toUpperCase() == "UL" && getNextSibling(srcElem).className == "listPop show") {
                getNextSibling(srcElem).className = "listPop";
                removeKeydownLIClass(getNextSibling(srcElem).children);
                srcElem.getElementsByTagName("LI")[0].className = srcElem.getElementsByTagName("LI")[0].className.split(" ")[0];
                srcElem.getElementsByTagName("LI")[0].children[0].className = srcElem.getElementsByTagName("LI")[0].children[0].className.split(" ")[0];
            }  
        }//HTML5 Changes 6/OCT/2016 End
    }
}
//HTML5 Changes End

function removeKeydownLIClass(liObj) {//HTML5 Changes 6/OCT/2016
    for (var i=0;i<liObj.length;i++) {
        if (liObj[i].className) {
            if (liObj[i].className == "listPopKeydown") {
                liObj[i].removeAttribute("class");
                liObj[i].setAttribute("class", "");
            } else {
                liObj[i].className = "pD";
            }
        }
    }
}

function fnCloseToolbarScreen() {
    window.frameElement.src = "";	 
//REDWOOD_CHANGES
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    mainWin.document.getElementById("Div_AlertWin").style.display = "none";
//    var maskObj = mainWin.document.getElementById("masker");//HTML5 Changes
//    mainWin.unmask();//HTML5 Changes 6/OCT/2016
//    maskObj.innerHTML = '<div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe></div><div id="Div_ChildWin" style="width:100%; height:100%"></div>';//HTML5 Changes
//    mainWin.document.getElementById("fastpath").focus();	
//REDWOOD_CHANGES
}

function fnShowToolbarScreen(src){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    document.getElementById("Div_AlertWin").style.display = "block";
    document.getElementById("ifr_AlertWin").src=src+"?THEME="+strTheme;
    mask();
}

function chgBrn(brn) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var homeBranch = HOMEBranch;
    var currBranch = CurrentBranch;
    var branchCode;
    if(typeof(brn) == "undefined"){
        branchCode = HOMEBranch;
    } else {
        branchCode = brn.toUpperCase();
    }
    /*Fix for 19566978 Starts*/
    /*if(gNumChildWindows > 0){
        parent.alertAction="UNMASK";
        mask();
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_CLOSE_ALL") ,'I');
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    }*/
    /*Fix for 19566978 Ends*/
    if ((branchCode == homeBranch) && (currBranch == homeBranch)) {
            parent.alertAction = "UNMASK";
          //  mask(); //REDWOOD_CHANGES
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_ALREADY_IN_HOME"));
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    } else if (currBranch == branchCode) {
        parent.alertAction="UNMASK";
       // mask();  //REDWOOD_CHANGES
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_ALREADY_IN_SAME_BRN") + " " + branchCode);
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    } else if (confirmatioReq) {
        if(typeof(brn) == "undefined"){
            parent.alertAction="HOMEBRN";
        }else{
            parent.alertAction="CHGBRN";
        }
        //mask();//REDWOOD_CHANGES
        /*Fix for 19566978 Starts*/
        if(gNumChildWindows > 0){
          strErrMsg = fnBuildAlertXML("", 'I',parent.getItemDesc("LBL_WINDOW_NOTCLOSED")+ parent.getItemDesc("LBL_CHANGE_BRN_CONFIRM")+ " "+ branchCode);
        }else{
          strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_CHANGE_BRN_CONFIRM")+ " "+ branchCode);
        }
        /*Fix for 19566978 Ends*/
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"C");
        return;
    }
    if(isOBIEELaunched == 'Y'){//OBIEE Changes for change branch starts   //21528607 
        var iframeObj = document.createElement("IFRAME");
        iframeObj.setAttribute("src",obiee_signout);
        iframeObj.setAttribute("visibility","hidden");
        document.getElementById("masthead").appendChild(iframeObj);
        isOBIEELaunched = 'N'
    }//OBIEE Changes for change branch ends
    var objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", "ChgBrnServlet?actionType=ChgBrn", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
    strFormData = 'branchtochange=' + branchCode;
    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    var responseText = objHTTP.responseText;
    mainWin.inactiveTime = 0;
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start
        mainWin.mask(); 
        mainWin.sessionTimeOut = true;
        mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
        return false;
    }//session expiry change end
    var msgStat = getNodeText(selectSingleNode(loadXMLDoc(responseText), "//MSGSTAT"));
    if (msgStat.indexOf("SUCCESS") < 0) {
            parent.alertAction = "UNMASK";
            mask();
        var message = parent.getCommonErrorList()[msgStat];
        message = message.substring(0, message.indexOf("~"));
        var alertXML = fnBuildAlertXML(responseText, 'E', message);
        showAlerts(alertXML, 'E');
        return;
    } else {
        top.document.body.setAttribute("onbeforeunload", "", 0);
        top.document.body.setAttribute("onunload", "", 0);
        top.location.href="SMMDIFRM.jsp?chgbrn=true&loggedInTime="+gLoginTime;
    }
    parent.alertAction = "";
}


function chgMod(brn) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var homeBranch = DefaultModule;
    var currBranch = CurrentModule;
    var branchCode;
    if(typeof(brn) == "undefined"){
        branchCode = DefaultModule;
    } else {
        branchCode = brn.toUpperCase();
    }
    if(gNumChildWindows > 0){
            parent.alertAction="UNMASK";
           // mask();//REDWOOD_CHANGES
            strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_CLOSE_ALL") ,'I');
            parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
            parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
            parent.document.getElementById("Div_AlertWin").style.display = "block";
            showAlerts(strErrMsg,"I");
            return;
        }
    if ((branchCode == homeBranch) && (currBranch == homeBranch)) {
            parent.alertAction = "UNMASK";
            //mask(); //REDWOOD_CHANGES
			// Added for FCIS change starts
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_ALREADY_IN_HOME_MOD"));
		    // Added for FCIS change ends
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    } else if (currBranch == branchCode) {
        parent.alertAction="UNMASK";
        //mask();//REDWOOD_CHANGES
        // Added for FCIS change starts
		// changes done for bug 17387241 
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_ALREADY_IN_SAME_MODULE") + " " + branchCode);
		// Added for FCIS change ends
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    } else if (confirmatioReq) {
        if(typeof(brn) == "undefined"){
            parent.alertAction="DEFAULTMOD";
        }else{
            parent.alertAction="CHGMOD";
        }
        //mask(); //REDWOOD_CHANGES
       // Added for FCIS change starts
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_CHANGE_MOD_CONFIRM") + branchCode);
	   // Added for FCIS change ends
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"C");
        return;
    }
    
    var objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", "ChgBrnServlet?actionType=ChgBrn", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
    strFormData = 'branchtochange=' + branchCode;
    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    var responseText = objHTTP.responseText;
    mainWin.inactiveTime = 0;
     if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start
         //mainWin.mask();//REDWOOD_CHANGES 
         mainWin.sessionTimeOut = true;
         mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
         return false;
    }//session expiry change end
    var msgStat = getNodeText(selectSingleNode(loadXMLDoc(responseText), "//MSGSTAT"));
    if (msgStat.indexOf("SUCCESS") < 0) {
            parent.alertAction = "UNMASK";
            //mask();//REDWOOD_CHANGES
        var message = parent.getCommonErrorList()[msgStat];
        message = message.substring(0, message.indexOf("~"));
        var alertXML = fnBuildAlertXML(responseText, 'E', message);
        showAlerts(alertXML, 'E');
        return;
    } else {
        top.document.body.setAttribute("onbeforeunload", "", 0);
        top.document.body.setAttribute("onunload", "", 0);
        top.location.href="SMMDIFRM.jsp?chgbrn=true&loggedInTime="+gLoginTime;;
    }
    parent.alertAction = "";
}

function getFocus(object){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    object.focus();
}

//SMSStandalone12.3 Changes starts
function chgEntity(brn) {
    mainWin.fnUpdateScreenSaverInterval();
    var homeBranch = HOMEEntity;
    var currBranch = CurrentEntity;
    var branchCode;
    if(typeof(brn) == "undefined"){
        branchCode = HOMEBranch;
    } else {
        branchCode = brn.toUpperCase();
    }
    
    if ((branchCode == homeBranch) && (currBranch == homeBranch)) {
            parent.alertAction = "UNMASK";
            mask();
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_ALREADY_IN_SAME_ENT") + " " + branchCode);
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    } else if (currBranch == branchCode) {
        parent.alertAction="UNMASK";
        mask();
        strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_ALREADY_IN_SAME_ENT") + " " + branchCode);
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"I");
        return;
    } else if (confirmatioReq) {
        if(typeof(brn) == "undefined"){
            parent.alertAction="HOMEENT";
        }else{
            parent.alertAction="CHGENT";
        }
        mask();
        /*Fix for 19566978 Starts*/
        if(gNumChildWindows > 0){
          strErrMsg = fnBuildAlertXML("", 'I',parent.getItemDesc("LBL_WINDOW_NOTCLOSED")+ parent.getItemDesc("LBL_CHANGE_BRN_CONFIRM")+ " "+ branchCode);
        }else{
          strErrMsg = fnBuildAlertXML("", 'I', parent.getItemDesc("LBL_CHANGE_ENT_CONFIRM")+ " "+ branchCode);
        }
        /*Fix for 19566978 Ends*/
        parent.document.getElementById("Div_AlertWin").style.top = parent.document.getElementById("masthead").offsetHeight +"px";
        parent.document.getElementById("Div_AlertWin").style.left = parent.document.getElementById("vtab").offsetWidth +"px";
        parent.document.getElementById("Div_AlertWin").style.display = "block";
        showAlerts(strErrMsg,"C");
        return;
    }
    if(isOBIEELaunched == 'Y'){//OBIEE Changes for change branch starts   //21528607 
        var iframeObj = document.createElement("IFRAME");
        iframeObj.setAttribute("src",obiee_signout);
        iframeObj.setAttribute("visibility","hidden");
        document.getElementById("masthead").appendChild(iframeObj);
        isOBIEELaunched = 'N'
    }//OBIEE Changes for change branch ends
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", "ChgEntServlet?actionType=ChgEnt", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
    strFormData = 'entitytochange=' + branchCode;
    objHTTP.send(strFormData);
    var responseText = objHTTP.responseText;
    mainWin.inactiveTime = 0;
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start
        mainWin.mask(); 
        mainWin.sessionTimeOut = true;
        mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
        return false;
    }//session expiry change end
    var msgStat = getNodeText(selectSingleNode(loadXMLDoc(responseText), "//MSGSTAT"));
    if (msgStat.indexOf("SUCCESS") < 0) {
            parent.alertAction = "UNMASK";
            mask();
        var message = parent.getCommonErrorList()[msgStat];
        message = message.substring(0, message.indexOf("~"));
        var alertXML = fnBuildAlertXML(responseText, 'E', message);
        showAlerts(alertXML, 'E');
        return;
    } else {
        top.document.body.setAttribute("onbeforeunload", "", 0);
        top.document.body.setAttribute("onunload", "", 0);
        top.location.href="SMMDIFRM.jsp?chgent=true&loggedInTime="+gLoginTime;
    }
    parent.alertAction = "";
}
//SMSStandalone12.3 Changes ends