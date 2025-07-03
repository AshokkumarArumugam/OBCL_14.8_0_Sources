/*----------------------------------------------------------------------------------------------------
**
** File Name    : SMMDIFRM.js
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

  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 22-Aug-2016
  **  Modified Reason      : Hook given to show the menu expanded on load and on change 
                             branch showHideVtab(e) needs to be called in SMMDIFRM_CUSTOM.js 
  **  Retro Source         : 9NT1606_12_0_3_FHB_EXO-BIT_HUNGARY
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23654778
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 29-Sep-2016
  **  Modified Reason      : Changes done to check for validate session when the user gives password in 
                             the screensaver 
  **  Retro Source         : 9NT1606_12_0_3_AO_UNICREDIT_BANK
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23652537
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 07-Oct-2016
  **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                               to user as alert and on click of Ok button on alert window, screen will be 
                               unmasked and user can try the action again.
  **  Retro Source         : 9NT1606_12_0_3_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 16-Jun-2017
  **  Modified Reason      : Added a condition alertAction == "EXIT" in function reqSignOff() which was missing in 12.2 version
  **  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
  **  Search String        : 9NT1606_12_4_RETRO_12_2_26231116
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 31-Aug-2017
  **  Modified Reason      : Changes done to avoid scripting error on clicking of Exit button of session expiry message 
  **  Retro Source         : 9NT1606_12_1_SYGNITY_S_A
  **  Search String        : 9NT1606_12_4_RETRO_12_1_26724262 

  **  Modified By          : Ambika S
  **  Modified On          : 29-Jun-2018
  **  Modified Reason      : Code Changes done to display warning message on exiting the application using 
                             browser close button when any function ID window is opened   
  **  Search String        : 9NT1606_14_1_RETRO_12_4_28118860
  
**  Modified By          : Siva Kamisetti
**  Modified On          : 28-Feb-2020
**  Modified Reason      : GETTING A BROWSER POP-UP TO LEAVE SITE WHEN SESSION EXPIRES
**  Search String        : Bug_30900854
**
**  Modified By          : Vignesh M G
**  Modified On          : 11-SEP-2020
**  Modified Reason      : ACCESSIBILITY ISSUE
**  Search String        : 30867757
**
**  Modified By          : Girish M
**  Modified On          : 15-Jan-2025
**  Modified Reason      : Chatbot fix
**  Search String        : Bug_37456724
----------------------------------------------------------------------------------------------------
*/
var gNumChildWindows = 0;
var gNumCustWindows = 0;
var gActiveWindow;
var gLOVParentWindow;
var gSignedOff = false;
var gUnloadReqd = true;
var arrChildWindows = new Array();
var arrCustWindows = new Array();
var sessionTimeOut = false;
var g_HTMLCacheSignView = "";
var ldapuser; // LDAP_POC_Changes
 var appDbg = '';
var webDbg = '' ;
var dbDbg = '';
var tempSeqNo ;
//var timeLogsArray = new Array();
/*12.1 Performance related changes start */
var screenHtmlCache = new Array();
/*12.1 Performance related changes ends */
var isOBIEELaunched = "N";//OBIEE Changes
var actionBeforeUnmask = "";//MULTIPLE_FUNC_ID_LAUNCH_ISSUE
var nonceStatus = false;
var platoLaunched = true;
var platoRef = null;
var platoframeCnt = 1;	  
//REDWOOD_CHANGES
var debugData = [];
var debugDataCount=0;  
//REDWOOD_CHANGES

function showWindow(offset) {
    arrChildWindows[offset].focus();
}

function invokeNonceGen() {
    var objHTTP = new parent.createHTTPActiveXObject();
    objHTTP.open("POST", "FCNonceGenServlet", false);
    objHTTP.setRequestHeader("Content-Type", "application/text");
    objHTTP.setRequestHeader("GENERATE_NONCE", "Y");
    objHTTP.setRequestHeader("X-CSRFTOKEN", parent.CSRFtoken);
    objHTTP.send();
    var nonceGenStatus = parent.getNodeText(parent.selectSingleNode(objHTTP.responseXML, "//SESSION"));

    if (nonceGenStatus == "SUCCESS") {
        nonceStatus = true;
    }
    else {
        nonceStatus = false;
    }
}

function openPlatoWindow(platoUrl){
    //if(!platoLaunched && nonceStatus){
    //if(nonceStatus) {   
    //} else {
    invokeNonceGen();
    //}
    platoURL = platoUrl;
    var platoFrameDiv = document.getElementById("PlatoFrameDiv");
    var platoFrame = document.createElement("IFRAME");
    platoFrame.id = "platoframe"+platoframeCnt;
    platoFrameDiv.appendChild(platoFrame);
    platoFrame.src = "PLATO.jsp?platoframeCnt="+platoframeCnt;
    platoframeCnt++;
    //mask();
}

function setActiveWindow(activeDiv, activeWin, fromDropDown) {
    /*Fix for 18180616 Starts*/
    if(activeWin.document.getElementById("masker")!= null && activeWin.document.getElementById("masker").offsetHeight != 0){    
      return false;
    }
    /*Fix for 18180616 Ends*/
    if(typeof(activeWin.functionId) == "undefined")
        activeWin = activeDiv.children[0].contentWindow;
    for(var i = 0; i < arrChildWindows.length; ++i) {
        if(arrChildWindows[i].id != activeDiv.id) {
            arrChildWindows[i].style.zIndex = 2;
        }
    }
    if(activeDiv.getAttribute("minimized") == "true") {
      activeDiv.style.display = "";
      removeTab(activeDiv.id);
      activeDiv.setAttribute("minimized", "false");
    }
    activeDiv.style.zIndex = 10;
    gActiveWindow = activeWin;
    if (activeWin.viewMnt || activeWin.gAction == "ENTERQUERY" ) {
        //showToolbar("", "", ""); 
        activeWin.showToolbar("", "", ""); 
    } else {
        /*if(activeWin.document.getElementById("masker").style.height =="0px" || activeWin.document.getElementById("masker").style.height == "")
            showToolbar(activeWin.functionId, "", "");*/
		/*Fix for 17003695 Starts*/
		if(activeWin.screenType != 'LNC' && activeWin.screenType != 'LNM' ) { //Fixes 20873220 starts
			if (activeWin.userFuncId != '' && activeWin.userFuncId != 'null') {
			  document.getElementById("fastpath").value = activeWin.userFuncId;
			} else {
				document.getElementById("fastpath").value = activeWin.functionId;
			} 
		} //Fixes 20873220 ends  
		/*Fix for 17003695 Ends*/
    }
    if(fromDropDown != undefined && fromDropDown == true){
        var currActiveWin = activeWin;
        while(currActiveWin.location.href != "about:blank") {
        if(currActiveWin.frames.length > 0)
          if(currActiveWin.frames[0].location.href != "about:blank")
            currActiveWin = currActiveWin.frames[0];
          else if(currActiveWin.frames[1] && currActiveWin.frames[1].location.href != "about:blank")
            currActiveWin = currActiveWin.frames[1];
          else break;
        else
          break;
        }
        
        if(currActiveWin == activeWin){
        try {
            currActiveWin.document.getElementById("BTN_EXIT_IMG").focus();
        }catch(e) {
            currActiveWin.document.getElementById("BTN_EXIT").focus();
        }
        } else {
        try{
            currActiveWin.document.getElementById("WNDbuttons").focus();
        }catch(e){
            try {
              currActiveWin.document.getElementById("BTN_CANCEL").focus();
            } catch(e1) {
               try {
                currActiveWin.document.getElementById("BTN_OK").focus();
              } catch(e2) {} 
            }
            return false;
        }
        }
        /*Debug window Z-Index Fix 17001559 starts
		if(mainWin.DebugWindowFlg == "Y") {  
        mainWin.document.getElementById("debugwin").zIndex = 2;
        }  Debug window Z-Index Fix 17001559 ends*/ 
    }
	//Debug window Z-Index Fix 17001559 starts
	if(mainWin.DebugWindowFlg == "Y") {
        mainWin.document.getElementById("debugwin").style.zIndex = 2;
        } 
		//Debug window Z-Index 17001559 Fix ends
    try {
        activeWin.fnPostFocusMain();
    } catch (e) {
        try {
            activeWin.fnPostFocus();
        } catch (e1) {}
    }
}

function setDebugActiveWindow() {
    for(var i = 0; i < arrChildWindows.length; ++i) {
        arrChildWindows[i].style.zIndex = 2;
    }
    mainWin.document.getElementById("debugwin").style.zIndex = 10;//Debug window Z-Index 17001559 Fix
    //showToolbar("", "", "");
}

function setLOVParentWindow(activeWin) {
    gLOVParentWindow = activeWin;
}
// Added from smscommon.jsp Start
function asyncPost(activeWin,seqNo, fromViewMaint) {/* Changes for Undefined Seq no*/
     mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
     
   /*var timeLogValues = "";
     var timelogChk = "N";
     var timelogElement = document.getElementById('timelogChk');
     if(timelogElement) {
         if (timelogElement.checked)
            timelogChk = "Y";
     }
     
   if(typeof(activeWin.timeLogsArray) !='undefined' ) {
         for (var i in activeWin.timeLogsArray) {
             timeLogValues = timeLogValues + i +"~"+activeWin.timeLogsArray[i]+";_SEP_;" ;
         }
     }*/
     //if(typeof(fromViewMaint) == 'undefined' || fromViewMaint=="FALSE"){
          //var strFormData = "moduleid="+activeWin.moduleid+"&timeLogEnabled="+ timelogChk +  "&functionId="+activeWin.functionId+"&timeLogValues="+timeLogValues+"&license="+activeWin.license+"&sequenceno="+activeWin.seqNo+"&exit_flag=1";
          var strFormData = "moduleid="+activeWin.moduleid+"&functionId="+activeWin.functionId+"&license="+activeWin.license+"&sequenceno="+activeWin.seqNo+"&exit_flag=1";
          if(typeof(activeWin.screenType) !='undefined' && activeWin.screenType == 'WB' && activeWin.funcID != 'CLRU')//Changed By Amit #22-jan
              strFormData = strFormData + "&funcid=" + activeWin.funcID + "&XREF="+activeWin.xref+"&actionType="+activeWin.action;	//FCUBS11.1 WB Changes
          var objHTTP = createHTTPActiveXObject();
          objHTTP.open("POST","SMSEndLogServlet?msgType=WORKFLOW",true); // Open the Connection to the Server //FCUBS11.1 WB Changes
          objHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);	//9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_55
          objHTTP.onreadystatechange = function() { /*Session Timeout changes starts*/
              if (objHTTP.readyState==4 && objHTTP.status==200) {
                  mainWin.inactiveTime = 0;
                  if(selectSingleNode(objHTTP.responseXML, "FCUBS_RES_ENV/SESSION_INTERVAL") != null) {
                     // appendDebug(objHTTP.responseXML);
                      var session_interval = getNodeText(selectSingleNode(objHTTP.responseXML, "FCUBS_RES_ENV/SESSION_INTERVAL"));
                      mainWin.sessionInterval = Number(session_interval);
                  }
              }
        };/*Session Timeout changes ends*/
          objHTTP.send(strFormData);
     //}
    
}        
// Added from smscommon.jsp End

function fnExitAsync(){
}
//HTML5 Changes Start
function fnAddWindowMenu_Old(seqNo, functionId, scrTitle) {	//REDWOOD_CHANGES
    parent.document.getElementById("window").setAttribute("onmouseover","showMenu(this, true, event)");
    parent.document.getElementById("window").setAttribute("onmouseout","hideMenu(this, true, false, event)");
    parent.document.getElementById("window").setAttribute("onclick","showMenu(this, true, event)");
    parent.document.getElementById("wndMenu").innerHTML += '<li id="li_'+seqNo+'" onClick="hideMenu(this, true, true, event);return setActiveWindow(document.getElementById(\''+seqNo+'\'), window, true);"  onmouseover="showMenu(this, true, event)" onmouseout="hideMenu(this, true, false, event)" onkeydown=" return setActiveWindowDropDown(document.getElementById(\''+seqNo+'\'), window, true,this, true, event);" title="'+scrTitle+'">'+scrTitle+'</li>';
}//HTML5 Changes End
//REDWOOD_CHANGES
function fnAddWindowMenu(seqNo, functionId, scrTitle) {
    var wizard = {
          "id": 'li_'+seqNo,
          "label": scrTitle
          
        }; 
     var obj = {'id': 'li_'+seqNo , 'menu_click': 'return maximizeWiz('+JSON.stringify(wizard)+');' , 'label':scrTitle};

    parent.menuItems.push(obj);
}	  
//REDWOOD_CHANGES
function setActiveWindowDropDown(activeDiv, activeWin, fromDropDown,menuObj,isLi,e){
   e = window.event || e;
    if(e.keyCode == 40 || e.keyCode == 38){
        handleKeys(menuObj,isLi,e);
    }else if(e.keyCode == 13 || e.keyCode == 32){
        setActiveWindow(activeDiv, activeWin, fromDropDown);
        hideMenu(menuObj, isLi, fromDropDown, e);//HTML5 Changes
    }else{
        hideMenu(menuObj, isLi, fromDropDown, e);//HTML5 Changes
    }
    preventpropagate(e);
    return false;
}
//REDWOOD_CHANGES
function fnRemoveWindowMenu(seqNo) {//debugger;
    var id = "li_" + seqNo;
    var index;
    for (var i = 0;i < menuItems().length;i++) {
        if (menuItems()[i].id == id) {
            index = i;
            break;
        }
    }
    if (typeof(index)!= "undefined") {
        menuItems.splice(index,1);
        wizardArray.splice(index,1);
    }
}

function fnSetDatalist(functionId) {
    var fnidExists = false;
    var menuXml = getmenuxml();
    if (menuXml.indexOf(functionId) ==  - 1) {
        return;
    }

    for (var i = 0;i < fastPastFids().length;i++) {
        if (fastPastFids()[i].value == functionId) {
            fnidExists = true;
            break;
        }
    }

    if (!fnidExists) {
        var obj = {
            'label' : functionId, 'value' : functionId
        };
        fastPastFids().push(obj);
        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem(mainWin.UserId + "fpFnids")) {
                var fnids = localStorage.getItem(mainWin.UserId + "fpFnids");
                if (fnids.indexOf(functionId) ==  - 1) {
                    fnids += "~" + functionId;
                    localStorage.setItem(mainWin.UserId + "fpFnids", fnids);
                }
            }
            else {
                localStorage.setItem(mainWin.UserId + "fpFnids", functionId);
            }
        }
    }
}
function fnRemoveWindowMenu_Old(seqNo) {  
//REDWOOD_CHANGES
    var mnuitmObj = document.getElementById("li_"+seqNo);
    if(mnuitmObj) {
        var wndMenu = document.getElementById("wndMenu");
        wndMenu.removeChild(mnuitmObj);
        if(wndMenu.getElementsByTagName("LI").length == 0) {
            //wndMenu.style.display="none";HTML5 Changes
            var anchorTag = parent.document.getElementById("wndMenu").parentNode.children[0];
            if (anchorTag){
            anchorTag.disabled = true;
            }   
            parent.document.getElementById("window").removeAttribute("onmouseover");
            parent.document.getElementById("window").removeAttribute("onmouseout");
            parent.document.getElementById("window").removeAttribute("onclick");
            /*if (anchorTag){
                anchorTag.className = "";
                anchorTag.disabled = true;
            }
            if (anchorTag.children[0]) {
                anchorTag.children[0].className = "BTNiconD";
            }*/
        }
    }
}

function fnExit(winObj,seqNo, fromViewMaint) {/* Changes for Undefined Seq no*/
    iFrameObj = winObj.getElementsByTagName("IFRAME")[0];
    asyncPost(iFrameObj.contentWindow, '', fromViewMaint);
    
    var activeWinIndex = 0;
    for(var i = 0; i < arrChildWindows.length; ++i) {
      if(arrChildWindows[i].id == winObj.id) {
          activeWinIndex = i;
          break;
      }
    }
    var isNextWindowFocused = false;
    for(var i = activeWinIndex - 1; i >= 0; --i) {
      var isMinimized = arrChildWindows[i].getAttribute("minimized");
      if(isMinimized == null || isMinimized == "false") {
        setActiveWindow(arrChildWindows[i], window, false);
        isNextWindowFocused = true;
        break;
      }
    }
    if(!isNextWindowFocused) {
      for(var i = activeWinIndex + 1; i < arrChildWindows.length; ++i) {
        var isMinimized = arrChildWindows[i].getAttribute("minimized");
        if(isMinimized == null || isMinimized == "false") {
          setActiveWindow(arrChildWindows[i], window, false);
          isNextWindowFocused = true;
          break;
        }
      }
    }
    /*
    if(!isNextWindowFocused) {
      showToolbar("", "", "");
    }
    */
    
    if(getBrowser().indexOf("OPERA") > 0){
      winObj.parentNode.removeChild(winObj);
    }else{
       iFrameObj.src = "";
       document.getElementById("IFlauncher").removeChild(winObj); 
    }
        
    for (var i=0;i<arrChildWindows.length;i++) {
        if (arrChildWindows[i] == winObj) {
            arrChildWindows.splice(i,1);
            gNumChildWindows--;
        }
    }
    
    if (gNumChildWindows == 0) {
        gActiveWindow = null;
        //document.getElementById("windowMenu").className = "ICOwindows";
    }
    fnRemoveWindowMenu(winObj.id);
    /*
    if(!isNextWindowFocused) {
      showToolbar("", "", "");
    }
    */
    document.getElementById("fastpath").focus();  
    if((getBrowser().indexOf("IE") > 0) && (getBrowser().indexOf("7") != -1)){//ie11 changes
        //if(navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
            document.getElementById("fastpath").select();
        }
    }


function fnCloseOtherWindows() {

    var len = arrChildWindows.length;
    for (var loopIndex = 0; loopIndex < len; loopIndex++) {
        if (arrChildWindows[loopIndex]) {
            try {
                if (arrChildWindows[loopIndex].name) {
                    if (arrChildWindows[loopIndex].name == 'Lov_Window' || arrChildWindows[loopIndex].name == 'Editor_Window' || arrChildWindows[loopIndex].name == 'Cal_Window') {
                        arrChildWindows[loopIndex].close();
                        arrChildWindows.splice(loopIndex, 1);
                    }
                } else continue;
            } catch(e) {
                arrChildWindows.splice(loopIndex, 1);
            }
            loopIndex--;
        }
    }
}

function doLoad() {
    window.moveTo(0, 0);
    gSignedOff = false;
}

//9NT1606_14_1_RETRO_12_4_28118860 added below function
function doBeforeUnload(e){
    if (gNumChildWindows > 0) {
        e.preventDefault();
        e.returnValue = false;
    }	
}

function doUnload(evt) {
    var evt = window.event || evt;
    fnCloseOtherWindows();
    //var chilWindowLength = parent.top.gNumChildWindows;
    var chilWindowLength = gNumChildWindows;
    for (var index = 0; index < chilWindowLength; index++) {
        try {
            if (arrChildWindows[index].name)
            {
                //do nothing
            }
        } catch(e) {
            gNumChildWindows--;
        }
    }

    if (gUnloadReqd && !gSignedOff) {
        //if (parent.top.gNumChildWindows > 0)
        if (gNumChildWindows > 0) {
            if (evt) {
                //if (event.keyCode == 0)
                if (evt.keyCode == null || event.keyCode == 0)
                {} else {
                    //var lblAlertSignOff = mainWin.getItemDesc("LBL_ALERT_SIGNOFF");
                    var lblAlertSignOff = getItemDesc("LBL_ALERT_SIGNOFF");
                    //alert(lblAlertSignOff);
                    alertAction = "UNMASK";
                    mask();
                    showAlerts(fnBuildAlertXML("", "I", lblAlertSignOff), "I");
                }
            } else {
                var lblAlertSignOff = getItemDesc("LBL_ALERT_SIGNOFF");
                //alert(lblAlertSignOff);
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML("", "I", lblAlertSignOff), "I");
                if (evt) {
                    //event.returnValue = false;
                    evt.returnValue = false;
                } else {
                    return;
                }
            }
        }
        /*var currentBranch = CurrentBranch;
        var homeBranch = HOMEBranch;
        if (currentBranch != homeBranch) {
            try {
                var message = getCommonErrorList()["FC-MAINT52"];
                message = message.substring(0, message.lastIndexOf("~"));
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML("FC-MAINT52", "E", lblAlertSignOff), "E");
                return false;
            } catch(e) {
                // do nothing
            }
            return;
        }*/
        if(alertAction == "") alertAction = "EXIT"; 
        var responseXML = reqSignOff();
        //if (responseXML.xml != "") {
        if (responseXML != null) {
            //var xmlServerDoc = loadXMLDoc(responseXML.xml);
            var xmlServerDoc = responseXML;
            var node = selectSingleNode(xmlServerDoc, "//SIGNOFF");
            gSignedOff = true;
            closeAllChildWindows();
            //fnCloseDebugWindow(); TODO
            var ah = screen.availHeight - 48;
            var aw = screen.availWidth - 10;
            document.body.setAttribute("onbeforeunload", "", 0);
            location.href = "LoginServlet?entity="+entity;
        } else if (!sessionTimeOut) {
            gUnloadReqd = false;
            closeAllChildWindows();
            /* TODO
            var winParams = new Object();
            winParams.mainWin = parent.window;
            var retVal = parent.showModalDialog("expired.html", winParams, "center:yes; dialogHeight:500px; dialogWidth:600px; help:yes; resizable:yes; scroll:no; status:no");
            */
        }

    } else
    {
        //fnCloseDebugWindow(); TODO
        return false;
    }
}

function evtBeforeUnload(evt) {
    
    if (!funcScreenOpened()) {
        return false;
    }

    var bpelMsg = "";
    if (arguments.callee.caller) {
        if (arguments.callee.caller.toString()) {
            if (arguments.callee.caller.toString().indexOf("doUnload") != -1) return;
        }
    }

    if (evt) {
        if (evt.keyCode == 0) {
            evt.returnValue = EXIT;
        } else {
            alertAction = "SIGNOFF";
            mask();
            showAlerts(fnBuildAlertXML("", "I", bpelMsg + SIGNOUT), "C");
        }
    } else {
        alertAction = "SIGNOFF";
        mask();
        showAlerts(fnBuildAlertXML("", "I", bpelMsg + SIGNOUT), "C");
    }
}

function loadChildWindow(divObj, winObj) {
    if (divObj != null && divObj != "") {
        if (gNumChildWindows == -1) 
            gNumChildWindows = 0;
        arrChildWindows[gNumChildWindows] = divObj;
        gNumChildWindows++;
        setActiveWindow(divObj, winObj);
    }
}

function closeAllChildWindows() {
    for (var windowIndex = 0; windowIndex < arrChildWindows.length; windowIndex++) {
        try {
            arrChildWindows[windowIndex].close();
        } catch(e)
        {}
    }
}

function funcScreenOpened() {
    var chilWindowLength = gNumChildWindows;
    for (var index = 0; index < chilWindowLength; index++) {
        try {
            if (arrChildWindows[index].name) {
                //do nothing
            }
        } catch(e) {
            gNumChildWindows--;
        }
    }
    if (gNumChildWindows > 0) {
        var lblAlertExit = getItemDesc("LBL_ALERT_EXIT");
        alertAction = "UNMASK";
        mask();
        showAlerts(fnBuildAlertXML("", "I", lblAlertExit), "I");
        return false;
    }
    return true;
}

function exitAll() {

    if (!funcScreenOpened()) {
        return false;
    }
    mask();
    showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_EXIT_APP")), "C");
    alertAction = "EXIT";    
}

function exitCurrentWindow() {
    parent.top.frames["FrameToolbar"].document.getElementById("fastpath").value = "";
    if (parent.top.gNumChildWindows <= 0) {
        exitAll();
    } else {
        fnExit(this.parent.gActiveWindow);
    }
}

function reqSignOff() {
    var strFormData = "userId=userId";
    var objHTTP = createHTTPActiveXObject();
	/* Bug 16579551 Changes Starts */
    var signOffAction = false;
    //if (alertAction == "SIGNOFF") { //9NT1606_12_4_RETRO_12_2_26231116 changes 
	if (alertAction == "SIGNOFF" || alertAction == "EXIT"){ //9NT1606_12_4_RETRO_12_2_26231116 changes 
      signOffAction = true;
      preSignOff();
    }
    /* Bug 16579551 Changes Ends */
    
    /* Stopping mbean Request.*/
    if(mBean_required == 'Y' && "ONLINE"==brnHostLinkStatus){ //21493993
        var strmBeanData = createMBeanRequestXml();
        if(getBrowser().indexOf("CHROME") < 0){ //Fix for 32161870
        objHTTP.open("POST", "FCMbeanClientServlet?actionType=signOff", false); // Open the Connection to the Server
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
        objHTTP.send(strmBeanData);
        if(csrfNode != null && getNodeText(csrfNode) == "SM-00420"){
            alert(getNodeText(csrfNode)+mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
        }
        else if (objHTTP.responseXML && selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start. //9NT1606_12_4_RETRO_12_1_26724262 changes
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change end
        else{  
            var responseXML = objHTTP.responseXML;
        }
        //Fix for 32161870 Starts
        }else{
                fetch("FCMbeanClientServlet?actionType=signOff", {
                    method: 'POST',
                    headers: {
                      'X-CSRFTOKEN': CSRFtoken,
                      'Content-Type': 'application/xml'
                    },
                    keepalive: true,
                    body: strmBeanData
                });
        }
        //Fix for 32161870 Ends
    }
    if(isOBIEELaunched == 'Y'){//OBIEE Changes starts
        var iframeObj = document.createElement("IFRAME");
        iframeObj.setAttribute("src",obiee_signout);
        iframeObj.setAttribute("visibility","hidden");
        document.getElementById("masthead").appendChild(iframeObj);
    }//OBIEE Changes ends
	if(!(alertAction == "EXIT" && getBrowser().indexOf("CHROME") > -1)){  //Fix for 32161870 
    objHTTP.open("POST", "SMSSignOffServlet?actionType=signOff", false); // Open the Connection to the Server
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("X-CSRFTOKEN", CSRFtoken);
    objHTTP.send(strFormData); // Send the Request
    if(objHTTP.responseXML != null) { //Fix for Bug No :18629260
    var csrfNode = selectSingleNode(objHTTP.responseXML,"//CSRF");
        if(csrfNode != null && getNodeText(csrfNode) == "SM-00420"){
            alert(getNodeText(csrfNode)+mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
        }else{  
            var responseXML = objHTTP.responseXML;
        }
	/* Bug 16579551 Changes Starts */
    }
    //Fix for 32161870 Starts
    }else{
        fetch("SMSSignOffServlet?actionType=signOff", {
            method: 'POST',
            headers: {
              'X-CSRFTOKEN': CSRFtoken,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            keepalive: true,
            body: strFormData
        });
        //navigator.sendBeacon("SMSSignOffServlet?actionType=signOff", strFormData);
    }
    //Fix for 32161870 Ends
    //BUG#32891272: Changes Start
	//Fix for 34020049 Starts
	if(SSO_SIGNOFF_REQ == "Y"){
		if (SSO_TYPE == "IDCS_TOKEN" ) {//IDCS changes
			var hostname = location.host;
			var url = "https://"+ hostname + SSO_SIGNOFF_URL + "?postlogouturl=https://" + hostname + SSO_SIGNOFF_POST_RD_URL;
			location.href = url;
		}else {
			location.href = SSO_SIGNOFF_URL;
		}
	}
	//Fix for 34020049 Ends
    //BUG#32891272: Changes End
    if (signOffAction) {
      postSignOff();
    }
    /* Bug 16579551 Changes Ends */
    //Fix for Bug No :18629260,Fix for 32161870 
    return responseXML;
}
//------------------------------------------------------------------------------
// FUNCTIONS to Cache XSL and XML
//------------------------------------------------------------------------------
var xslDetailed; // Holds DETAIL.xsl
var xslSummary; // Holds SUMMARY.xsl
var xslDashboardDetail;
var xslDashboardSummary;
var detailedCached = false; // Flags
var summaryCached = false; // Flags
var HTMLCache = new Array();
function XMLCache()
{} // Holds UI XML for the Function Id

/*function HTMLCache()
{}*/ // Holds Translated HTML for the LANG CODE and the UI XML

//var functions = new XMLCache();    

/**
   Function that caches and returns the FUNCTIONID.xml
**/
function getXML(fn)
{

    if (mainWin.cacheContent == 'D')
    {
        retval = createXSL(fn);

    } else
    {
        retval = XMLCache[fn];
        if (retval == null || typeof(retval) == 'undefined')
        {
            retval = createXSL(fn);
        }
    }
    return retval;
}

function loadXSL(screenType) {

    if (screenType == 'Detail.xsl') {
        if (mainWin.cacheContent == 'D' || xslDetailed == null) {
            detailedCached = true;
            xslDetailed = "Templates/XSL/Detail.xsl";
        }
        return xslDetailed;
    } else if (screenType == 'ExtDetail.xsl') {
        if (mainWin.cacheContent == 'D' || xslDetailed == null) {
            detailedCached = true;
            xslDetailed = "Templates/ExtXSL/ExtDetail.xsl";
        }
        return xslDetailed;
    } else if (screenType == 'ExtDetailTab.xsl') {
        if (mainWin.cacheContent == 'D' || xslDetailed == null) {
            detailedCached = true;
            xslDetailed = "Templates/ExtXSL/ExtDetailTab.xsl";
        }
        return xslDetailed;
    } else if (screenType == 'Summary.xsl') {
        if (mainWin.cacheContent == 'D' || xslSummary == null) {
            summaryCached = true;
            xslSummary = "Templates/XSL/Tmp_Summary.xsl";
        }
        return xslSummary;
    } else if (screenType == 'Tmp_Summary.xsl') {
        xslSummary = "Templates/XSL/Tmp_Summary.xsl";
        return xslSummary;
    } else if (screenType == 'ExtSummary.xsl') {
        xslSummary = "Templates/ExtXSL/ExtSummary.xsl";
        return xslSummary;
    } else if (screenType == 'Summary_Advanced.xsl') {
        xslSummary_Adv = "Templates/XSL/Tmp_Summary_Advanced.xsl";
        return xslSummary_Adv;
    } else if (screenType == 'Tmp_Summary_Advanced.xsl') {
        xslSummary_Adv = "Templates/XSL/Tmp_Summary_Advanced.xsl";
        return xslSummary_Adv;
    } else if (screenType == 'ExtSummary_Advanced.xsl') {
        xslSummary_Adv = "Templates/ExtXSL/ExtSummary_Advanced.xsl";
        return xslSummary_Adv;
    } else if(screenType == 'ExtDashboardDetail.xsl') {
        xslDashboardDetail = "Templates/ExtXSL/ExtDashboardDetail.xsl";
        return xslDashboardDetail;
    } else if(screenType == 'ExtDashboardDetailTab.xsl') {
        xslDashboardSummary = "Templates/ExtXSL/ExtDashboardDetailTab.xsl";
        return xslDashboardSummary;
    } else if(screenType == 'ExtDashboardSummary.xsl') {
        xslDashboardSummary = "Templates/ExtXSL/ExtDashboardSummary.xsl";
        return xslDashboardSummary;
	/*Customer changes start*/
    } else if (screenType == 'ExtTemplate.xsl') {
        xslDetailed = "Templates/ExtXSL/ExtTemplate.xsl";    
        return xslDetailed;
    } else if (screenType == 'ExtDetail_Cust.xsl') {
        xslDetailed = "Templates/ExtXSL/ExtDetail_Cust.xsl";    
        return xslDetailed;
        /*Customer changes end*/
    } else { 
        return "XSL/Detail_RPTDsgnr.xsl";
    }
}

function loadXML(functionId) {
    return getXML(functionId);
}

//Mbean Change
function fnPopulateMbeanData(startTime,endTime,functionId,operation){
    if(mainWin.mBean_required == 'Y'){
        var mbeanArrayLength    = mBeanArray.length;
        var mBeanCount          = 1;
        var mBeanTime           = parseFloat(parseFloat(endTime)-parseFloat(startTime))/parseFloat(1000); 
        mBeanTime=Math.round(mBeanTime*100)/100;
        var existinMbean        = false; 
        
        for(var i=0;i<mbeanArrayLength;i=i+1){    
            var mBeanValue      = mBean_Array[i].split('~');       
            var mbeanUserId     = mBeanValue[0];
            var mbeanFID        = mBeanValue[1];
            var mbeanAction     = mBeanValue[2];
            mBeanCount          = mBeanValue[3];    
            var min_Time        = mBeanValue[4]; 
            var max_Time        = mBeanValue[5];              
            var ExecutionTime   = mBeanValue[6]; 
            
            if(mbeanFID==functionId && mbeanAction ==operation){    
                if(mBeanTime > max_Time)                   
                    max_Time =   mBeanTime;
                if(mBeanTime < min_Time)
                    min_Time =   mBeanTime;
                
                mBeanTime       = parseFloat(parseFloat(mBeanCount*ExecutionTime)+parseFloat(mBeanTime))/parseFloat(parseFloat(mBeanCount)+parseFloat(1));
                mBeanTime       =Math.round(mBeanTime*100)/100;
                mBeanCount      = parseFloat(mBeanCount)+parseFloat(1);
                mBean_Array[i]  = UserId + '~' + functionId + '~' + operation + '~' + mBeanCount +  '~'+min_Time + '~' +max_Time+'~' + mBeanTime;
                mBeanArray[i]   = UserId + '~' + functionId + '~' + operation ;
                mBeanArray[UserId + '~' + functionId + '~' + operation ]   =  mBeanCount + '~' +min_Time + '~' +max_Time+ '~' +mBeanTime; 
                existinMbean    =true;
            }
        }
        if(!existinMbean){                
            mBean_Array[mbeanArrayLength]   = UserId + '~' + functionId + '~' + operation + '~' + '1' + '~'+mBeanTime + '~' +mBeanTime+'~' + mBeanTime;
            mBeanArray[mbeanArrayLength]   = UserId + '~' + functionId + '~' + operation ;
            mBeanArray[UserId + '~' + functionId + '~' + operation ]   =  '1' + '~' +mBeanTime + '~' +mBeanTime+ '~' +mBeanTime;
        }
    }
}

function createMBeanRequestXml()
{
     var mbeanArrayLength   = mBean_Array.length;
     var mBeanXML           = "<?xml version='1.0' encoding='UTF-8'?>";
     mBeanXML               =  mBeanXML+"<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FCUBS</SOURCE><UBSCOMP>FCUBS</UBSCOMP><MSGID/><USERID/><ENTITY/><BRANCH/>" +
                              "<DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>";
     mBeanXML               =  mBeanXML+"<ADDL>";
     for(var i=0;i<mbeanArrayLength;i++){
     
         mBeanXML   = mBeanXML+"<PARAM><NAME>";
         mBeanXML   = mBeanXML+mBeanArray[i];
         mBeanXML   = mBeanXML+"</NAME><VALUE>";
         mBeanXML   = mBeanXML+mBeanArray[mBeanArray[i]];
         mBeanXML   = mBeanXML+"</VALUE></PARAM>";
         
     }
     mBeanXML       = mBeanXML+"</ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY='0' PARENT='' RELATION='' TYPE=''/></FLD><REC TYPE=''/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>";
     return mBeanXML;
}

function fnPopulateLoad(jstime,dbTime,serverTime,totaltime,clientLog,seqno,dbSesId,loginSeqNo,actionSeqno){
    loadTimeArray[seqno]  = jstime+"~"+dbTime+"~"+serverTime+"~"+totaltime+"~"+clientLog+"~"+dbSesId+"~"+loginSeqNo+"~"+actionSeqno;
}
 //REDWOOD_CHANGES
function handleMenuSearchAction(event){
    var selFunctionId = event.detail.value;

    var filteredData = menuSearchList().filter(function(el)
 {
  return el.value == selFunctionId;
 });
 if(filteredData && filteredData.length>0){
      var fnEval = new Function(filteredData[0].menu_click);  
    fnEval();
 }
}
function handleMenuAction(event){
    //debugger;
     var fnEval = new Function("event",event.target.getAttribute("menu_click"));  
    fnEval(event);
}	
//REDWOOD_CHANGES

function fnCloseAlertWin(event) {
    var event = window.event || event;
    if(alertAction == "LOGIN") {
        //12.1 Dashboard changes --start
        //postLoginDetails(event);
        //12.1 Dashboard changes --end
		expandMenu(event); //9NT1606_12_2_RETRO_12_0_3_23654778 changes
        fnPostLogin();//TERMINAL_NAME_ENH_14.1
        unmask();
    } else if(alertAction == "SIGNOFF") {
        doUnload(event);
    } else if(alertAction == "CHGDEPT") {
		confirmatioReq = false;
        fnChangeDept(parent.document.getElementById("BLK_DEPT__DEPT_CODE").value);
        parent.document.getElementById("BLK_DEPT__DEPT_CODE").value = "";
    } else if(alertAction=="CHGBRN") {
        confirmatioReq = false;
        chgBrn(parent.document.getElementById("BLK_BRANCH__BRANCH_CODE").value);
        parent.document.getElementById("BLK_BRANCH__BRANCH_CODE").value = "";
    } else if(alertAction=="HOMEBRN") {
        confirmatioReq = false;
        chgBrn();
    //SMSStandalone12.3 Changes starts
    } else if(alertAction=="CHGENT") {
        confirmatioReq = false;
        chgEntity(parent.document.getElementById("BLK_ENTITY_DETAILS__ENTITY_ID").value);
        parent.document.getElementById("BLK_ENTITY_DETAILS__ENTITY_ID").value = "";
    } else if(alertAction=="HOMEENT") {
        confirmatioReq = false;
        chgEntity();
    //SMSStandalone12.3 Changes ends
    }else if(alertAction=="CHGMOD") {
        confirmatioReq = false;
        chgMod(parent.document.getElementById("BLK_MODULE__MODULE_CODE").value);
        parent.document.getElementById("BLK_MODULE__MODULE_CODE").value = "";
    } else if(alertAction=="DEFAULTMOD") {
        confirmatioReq = false;
        chgMod();
    } else if(alertAction=="CHGBRNERR") {
        unmask();
        showChangeBranch("SMCHGBRN.jsp");
    } else if(alertAction=="CHGPWD") {
        unmask();
        showChangePassword('SMCHGPWD.jsp');
    } else if (alertAction == "UNMASK") {
        unmask();
        //fc11.1wb cust changes starts
    } else if (alertAction == "SETCUSTDETAILS") {	//fc11.1 lastsupper
        unmask();
		fnStartCustomerSessionAction();
    }else if (alertAction == "ENDCUSTSESSION") { //fc11.1 lastsupper
        unmask();
		fnEndCustomerSessionAction();
		//fc11.1wb cust changes ends
    } else if (alertAction == "EXITAPP") {
         /* var chilWindowLength = gNumChildWindows;
        for (var index = 0; index < chilWindowLength; index++) {
            try {
                if (arrChildWindows[index].name) {
                }
            } catch(e) {
                gNumChildWindows--;
            }
        }        
        if (gNumChildWindows > 0) {
            var lblAlertExit = getItemDesc("LBL_ALERT_EXIT");
            alertAction = "UNMASK";
            mask();
            showAlerts(fnBuildAlertXML("", "I", lblAlertExit), "I");
            return false;
        }*/
        reqSignOff();
        sessionTimeOut = true;
        gUnloadReqd = false;
		document.body.setAttribute("onbeforeunload", "", 0); //Bug_30900854
        closeAllChildWindows();
        mainWin.window.close();	 //REDWOOD_CHANGES
        //document.body.setAttribute("onbeforeunload", "", 0); //Bug_30900854
    } else if(alertAction == "DISPLOGIN") {
        showLoginPage();
    } else if(alertAction == "EXIT"){
        unmask();
        reqSignOff();
        sessionTimeOut = true;
        gUnloadReqd = false;
        closeAllChildWindows();
        if (SSO_TYPE != "IDCS_TOKEN" ) {//BUG#32891272 IDCS changes
        mainWin.window.close();	//REDWOOD_CHANGES
        }
        document.body.setAttribute("onbeforeunload", "", 0);
    } else if(alertAction == "INVFUNC"){
        unmask();
        document.getElementById("fastpath").focus();
        mainWin.actionBeforeUnmask = "INVFUNC";//MULTIPLE_FUNC_ID_LAUNCH_ISSUE
     }else if(alertAction == "USERSET") {
        unmask();
        mainWin.document.body.setAttribute("onbeforeunload", "", 0);
        mainWin.document.body.setAttribute("onunload", "", 0);
        mainWin.location.href="SMMDIFRM.jsp?chgtheme=true";
    }else if(alertAction == "USRSET") {//fix for 17021201
        unmask();
        showChangePassword('SMUSRSET.jsp');
    }else {
        unmask();
    }
    alertAction = "";
}

function fnExitAlertWin(evnt) {
    if(alertAction=="CHGBRN") {
        parent.document.getElementById("BLK_BRANCH__BRANCH_CODE").value = "";
    }
    unmask();
}

function handleMenuKeys(evnt) {
    //HTML5 Changes 6/OCT/2016 Start
    var evt = window.event || evnt;
    var srcElem = getEventSourceElement(evt);
    fnUpdateScreenSaverInterval();
    if(evt.keyCode == 40){
        if (srcElem.tagName) {
            if (srcElem.tagName == "UL") {
                fireHTMLEvent(srcElem.children[0], "onmouseout", evt);
                fireHTMLEvent(getNextSibling(srcElem).children[0], "onmouseover", evt);
                getNextSibling(srcElem).children[0].setAttribute("class","listPopKeydown");
                getNextSibling(srcElem).children[0].focus();
            } else if (srcElem.tagName == "LI") {
                fireHTMLEvent(srcElem, "onmouseout", evt);
                fireHTMLEvent(getNextSibling(srcElem.parentNode).children[0], "onmouseover", evt);
                getNextSibling(srcElem.parentNode).children[0].setAttribute("class","listPopKeydown");
                getNextSibling(srcElem.parentNode).children[0].focus();
            } else if (srcElem.tagName == "DIV") {
                fireHTMLEvent(srcElem, "onmouseout", evt);
                fireHTMLEvent(getNextSibling(srcElem.parentNode).children[0], "onmouseover", evt);
                getNextSibling(srcElem.parentNode).children[0].setAttribute("class", "listPopKeydown");
                getNextSibling(srcElem.parentNode).children[0].focus();
            }
        }
    } else if (evt.keyCode == 39) {
        if (srcElem.tagName == "LI") {
            fireHTMLEvent(srcElem, "onmouseout", evt);
            if (getNextSibling(srcElem.parentNode.parentNode).children[1].children[0]) {
                fireHTMLEvent(getNextSibling(srcElem.parentNode.parentNode).children[0].children[0], "onmouseover", evt);//HTML5 changes 2/NOV/2016 Fix for 24941207
                getNextSibling(srcElem.parentNode.parentNode).children[0].children[0].focus();//HTML5 changes 2/NOV/2016 Fix for 24941207
            } else {
                fireHTMLEvent(getNextSibling(getNextSibling(srcElem.parentNode.parentNode)).children[0].children[0], "onmouseover", evt);//HTML5 changes 2/NOV/2016 Fix for 24941207
                getNextSibling(getNextSibling(srcElem.parentNode.parentNode)).children[0].children[0].focus();//HTML5 changes 2/NOV/2016 Fix for 24941207
            }
        }
    } else if (evt.keyCode == 37) {
        if (srcElem.tagName == "LI") {
            fireHTMLEvent(srcElem, "onmouseout", evt);
            if (getPreviousSibling(srcElem.parentNode.parentNode).children[1].children[0]) {
                fireHTMLEvent(getPreviousSibling(srcElem.parentNode.parentNode).children[0].children[0], "onmouseover", evt);//HTML5 changes 2/NOV/2016 Fix for 24941207
                getPreviousSibling(srcElem.parentNode.parentNode).children[0].children[0].focus();//HTML5 changes 2/NOV/2016 Fix for 24941207
            } else {
                fireHTMLEvent(getPreviousSibling(getPreviousSibling(srcElem.parentNode.parentNode)).children[0].children[0], "onmouseover", evt);//HTML5 changes 2/NOV/2016 Fix for 24941207
                getPreviousSibling(getPreviousSibling(srcElem.parentNode.parentNode)).children[0].children[0].focus();//HTML5 changes 2/NOV/2016 Fix for 24941207
            }
        }
    }
    preventpropagate(evt);
    return false;
}

function handleKeys(menuObj,isLi,evt){
    var e = window.event || evt;
    fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(e.shiftKey && e.keyCode == 9){
        fireHTMLEvent(menuObj, "onmouseout", e);    //HTML5 Changes
        document.getElementById("menuExpandCollapse").focus();   
        preventpropagate(e);
        return false;
    }
    if(e.keyCode == 9){
        fireHTMLEvent(menuObj, "onmouseout", e);    //HTML5 Changes
        document.getElementById("fastpath").focus();   
        preventpropagate(e);
        return false;
    } else if (e.keyCode == 27) {
        fireHTMLEvent(menuObj, "onmouseout", e);  //HTML5 Changes      
        getPreviousSibling(menuObj.parentNode).focus();
        preventpropagate(e);
        return false;
    } else if (e.keyCode == 40) {
        if(getNextSibling(menuObj) != null){
            if (menuObj.tagName == "LI") {
                fireHTMLEvent(menuObj, "onmouseout", e);
                fireHTMLEvent(getNextLiElement(menuObj), "onmouseover", e);
                getNextLiElement(menuObj).focus();
                if (getNextLiElement(menuObj).className && getNextSibling(menuObj).className == "pD") {
                    getNextLiElement(menuObj).setAttribute("class", "pD listPopKeydown");
                } else {
                    getNextLiElement(menuObj).setAttribute("class", "listPopKeydown");
                }
            }
        } else {
            fireHTMLEvent(menuObj, "onmouseout", e);
            fireHTMLEvent(menuObj.parentNode.children[0], "onmouseover", e);
            menuObj.parentNode.children[0].focus();
            if (menuObj.parentNode.children[0].className && menuObj.parentNode.children[0].className == "pD") {
                menuObj.parentNode.children[0].setAttribute("class","pD listPopKeydown");
            } else {
                menuObj.parentNode.children[0].setAttribute("class","listPopKeydown");
            }
        }
        preventpropagate(e);
        return false;
    } else if (e.keyCode == 38) {
        if(getPreviousSibling(menuObj) != null){
            if (menuObj.tagName == "LI") {
            fireHTMLEvent(menuObj, "onmouseout", e);
                fireHTMLEvent(getPreviousLiElement(menuObj), "onmouseover", e);
                getPreviousLiElement(menuObj).focus();
                if (getPreviousLiElement(menuObj).className && getNextSibling(menuObj).className == "pD") {
                    getPreviousLiElement(menuObj).setAttribute("class", "pD listPopKeydown");
                } else {
                    getPreviousLiElement(menuObj).setAttribute("class", "listPopKeydown");
                }
            } 
        } else {
            fireHTMLEvent(menuObj, "onmouseout", e);
            fireHTMLEvent(menuObj.parentNode.children[menuObj.parentNode.children.length-1], "onmouseover", e);
            menuObj.parentNode.children[menuObj.parentNode.children.length-1].focus();
            if (menuObj.parentNode.children[menuObj.parentNode.children.length-1].className && menuObj.parentNode.children[menuObj.parentNode.children.length-1].className == "pD") {
                menuObj.parentNode.children[menuObj.parentNode.children.length-1].setAttribute("class","pD listPopKeydown");
            } else {
                menuObj.parentNode.children[menuObj.parentNode.children.length-1].setAttribute("class","listPopKeydown");
            }
        }
        preventpropagate(e);
        return false;
    } else if (e.keyCode == 39) {
        var nextFocusDiv = getNextSibling(menuObj.parentNode.parentNode);
        if (nextFocusDiv != null) {
            var nextFocusUL = nextFocusDiv.children;
            if (nextFocusUL.length > 1) {
                var nextFocusLI = nextFocusUL[1].children[0];
                if (nextFocusLI != null) {
                } else {
                    nextFocusDiv = getNextSibling(nextFocusDiv);
                    nextFocusLI = nextFocusDiv.children[1].children[0];
                }
            } else {
                nextFocusDiv = menuObj.parentNode.parentNode.parentNode.children[1];
                nextFocusLI = nextFocusDiv.children[1].children[0];
            }
            fireHTMLEvent(menuObj, "onmouseout", e);
            fireHTMLEvent(getPreviousSibling(nextFocusLI.parentNode).children[0], "onmouseover", e);//HTML5 changes 2/NOV/2016 Fix for 24941207
            getPreviousSibling(nextFocusLI.parentNode).children[0].focus();//HTML5 changes 2/NOV/2016 Fix for 24941207
            if (nextFocusLI.className && getNextSibling(nextFocusLI).className == "pD") {
                nextFocusLI.setAttribute("class","pD listPopKeydown");
            } else {
                nextFocusLI.setAttribute("class","listPopKeydown");
            }
        }
        preventpropagate(e);
        return false;
    } else if (e.keyCode == 37) {
        var prevFocusDiv = getPreviousSibling(menuObj.parentNode.parentNode);
        if (prevFocusDiv != null) {
            var prevFocusUL = prevFocusDiv.children;
            if (prevFocusUL.length > 1) {
                var prevFocusLI = prevFocusUL[1].children[0];
                if (prevFocusLI != null) {
                } else {
                    prevFocusDiv = getPreviousSibling(prevFocusDiv);
                    prevFocusLI = prevFocusDiv.children[1].children[0];
                }
            } else {
                prevFocusDiv = menuObj.parentNode.parentNode.parentNode.children[menuObj.parentNode.parentNode.parentNode.children.length-2];
                prevFocusLI = prevFocusDiv.children[1].children[0];
            }
            fireHTMLEvent(menuObj, "onmouseout", e);
            fireHTMLEvent(getPreviousSibling(prevFocusLI.parentNode).children[0], "onmouseover", e);//HTML5 changes 2/NOV/2016 Fix for 24941207
            getPreviousSibling(prevFocusLI.parentNode).children[0].focus();//HTML5 changes 2/NOV/2016 Fix for 24941207
            if (prevFocusLI.className && prevFocusLI.className == "pD") {
                prevFocusLI.setAttribute("class","pD listPopKeydown");
            } else {
                prevFocusLI.setAttribute("class","listPopKeydown");
            }
        }
        preventpropagate(e);
        return false;
    } else if (e.keyCode == 13) { //30867757 start
		if(e.target.onclick != null){
			e.target.onclick();
		}
	}//30867757 end
}
//HTML5 Changes 6/OCT/2016 End
function showChangePassword(src) {
    fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
//LDAP_POC_Changes start
// if("null" != ldapuser && ldapuser != "") {  
// alert("Password Change is not allowed when logged in with LDAP User !");
// return; 
// }   
// else {
 //LDAP_POC_Changes end	 
//REDWOOD_CHANGES
        var alertWindow = document.getElementById("ifr_AlertWin");
        alertWindow.src = src+"?THEME="+strTheme+"&FROMLOGIN=false";
        var alertWinObj = document.getElementById("Div_AlertWin");
        
        alertWinObj.style.display = "block";
        alertWinObj.style.height = "100%";
        alertWinObj.style.width = "100%"; //For DIV
        alertWinObj.style.width = "100%";
        alertWinObj.style.top = "0px";
        alertWinObj.children[0].style.height = "100%"; //For IFRAME
        alertWinObj.children[0].style.width = "100%";
        alertWinObj.children[0].style.top = "0px";
 
//		mask();	   
//REDWOOD_CHANGES
    } //LDAP_POC_Changes
//}

function showLoginPage(){
    gSignedOff = true;
    closeAllChildWindows();
    document.body.setAttribute("onbeforeunload", "", 0);
    location.href = "LoginServlet";
}
// User amount_format, date_format changes begin
function showUserSettings(src) {
    //document.getElementById("vTabDB_DASHBOARD").innerHTML = "";
    document.getElementById("Div_AlertWin").style.display = "block";
    document.getElementById("ifr_AlertWin").src=src+"?THEME="+strTheme;
    mask();
}
// User amount_format, date_format changes end
function doKeyAction(e){
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(event.keyCode == 13 && (srcElem.tagName.toUpperCase() != 'A' && srcElem.tagName.toUpperCase() != 'BUTTON')) {
        return false;
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
    if (event.altKey == true && event.keyCode == 71 ) {//HTML5 changes 2/NOV/2016 Fix for 24941207 start //REDWOOD_CHANGES
        doAction('SignOff',event);
    }//HTML5 changes 2/NOV/2016 Fix for 24941207 end
    disableCommonKeys(event);
    /*if (event.ctrlKey == true) {
      switch(event.keyCode) {
        case 66 : //B = Organize Favourities in IE
        case 68 : //D = Add a Favouritie in IE
        case 69 : //E = Search Web in IE
        case 70 : //F = Find in IE
        case 72 : //H = History in IE
        case 73 : //I = Manage Favourities in IE
        case 74 : //J = Manage Feeds in IE
        case 76 : //L = Open in IE
        case 78 : //N = Open in IE
        case 79 : //O = Open in IE
        case 80 : //P = Print in IE
        case 82 : //R = Refresh in IE
        case 87 : //W = Close window in IE
        case 112: //F1 = Help
        case 116: //F5 = Refresh
          fnDisableBrowserKey(event);
          preventpropagate(event);
          document.getElementById("fastpath").focus();
          try {
              event.keyCode = 0;
          } catch(e) {}
          return false;
      }
    }*/ 
	if (event.ctrlKey == true && event.shiftKey == false && event.keyCode == 33) { // If 'Page Up' is pressed with Ctrl Key...for PREVIOUS TAB//Customer Accessibilty
	  fnNavigateDBoardTabs(event,'backward', tab_arr, tab_ids);
	  fnDisableBrowserKey(event);
	  return false;
	} else if (event.ctrlKey == true && event.shiftKey == false && event.keyCode == 34) { // If 'Page Down' is pressed with Ctrl Key...for NEXT TAB//Customer Accessibilty
	  fnNavigateDBoardTabs(event,'forward', tab_arr, tab_ids);
	  fnDisableBrowserKey(event);
	  return false;
	}    	
//REDWOOD_CHANGES
        // window menu
        if((event.altKey == true && event.shiftKey == true && event.keyCode == 78) ||  (event.altKey == true && event.keyCode == 78)){
            document.getElementById('windowsMenu').click();
        }
        // Refresh landing page
        if(event.altKey == true && event.shiftKey == true && event.keyCode == 49){
            document.getElementById('btnrefresh').click();
        }

        // change module
        if(event.altKey == true && event.keyCode == 66){
            document.getElementById('branchMenu').click();
        }
    
        // help
        if(event.altKey == true && event.shiftKey == true && event.keyCode == 69){
            fnshowHelpFile();
        }	 
//REDWOOD_CHANGES
    
      if(event.ctrlKey == true || event.keyCode == 8 || event.keyCode == 118){
        if((event.keyCode == 8 || event.ctrlKey == true)&& (srcElem.tagName.toUpperCase() == 'INPUT' )) {
            return true;
        }else if ((event.keyCode == 8 || event.ctrlKey == true)&& (srcElem.id == 'oda-chat-user-text-input')) {  //CHATBOT Fix Bug_37456724
         return true; 
        }else if(event.shiftKey == true && (event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 54)){
            var i = event.keyCode
            if(document.getElementsByTagName("iframe")[i-49]){
                document.getElementsByTagName("iframe")[i-49].contentWindow.focus();
                return true;
            }
        }else{
            return false;
        }
    }/*else if(event.altKey == true && event.keyCode == 48){
       fnShowToolbarScreen('AccessKeyDetails.jsp'); 
       return true;
    }else if(event.altKey == true && event.keyCode == 72){
       showDBoardTabs("DBoardHome", event);
       return true;
    }else if(event.altKey == true && event.keyCode == 73){
       showDBoardTabs("DBoardMessages", event);
       return true;
    }else if(event.altKey == true && event.keyCode == 67){
       showDBoardTabs("DBoardCustomer", event);
       return true;
    }else if(event.altKey == true && event.keyCode == 87){
       showDBoardTabs("DBoardWorkFlow", event);
       return true;
    }else if(event.altKey == true && event.keyCode == 84){
       showDBoardTabs("DBoardTasks", event);
       return true;
    }else if(event.altKey == true && event.keyCode == 80){
       showDBoardTabs("DBoardMyDashBoard", event);
       return true;
    }*/else if(event.keyCode == 32 || event.keyCode==13){
         if(document.getElementById("WNDbuttons")){
              /* document.getElementById("WNDbuttons").focus();
               fireHTMLEvent(document.getElementById("WNDbuttons"),"onclick");*/
           
         }
         /*preventpropagate(event);
         return false;*/
    }
    else{
        if (srcElem.accessKey == "A" && (event.shiftKey == true && event.keyCode == 9))
            hideMenu(srcElem,false,false, event);//HTML5 Changes
        else if(event.keyCode == 9) {//12.0.3 changes  starts
        if(srcElem.parentNode.parentNode.parentNode && srcElem.parentNode.parentNode.parentNode.parentNode.id == "MINwinds" && getNextSibling(srcElem.parentNode.parentNode.parentNode) == null){//HTML5 Changes 6/OCT/2016
				
                                document.getElementById("Branch_Menu").focus();
                                return false;
			}//12.0.3 changes  ends
		 //Bug 18068084 Fixes Starts
	//Bug 18433305 Fixes Starts
			try{
				if (mainWin.gActiveWindow && mainWin.gActiveWindow.frameElement && mainWin.gActiveWindow.frameElement.contentWindow) {
				  if (mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker")) {
					if (mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker").style.height != 0) {
						if(mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker").children[0].children[0].contentWindow.document.getElementById("BTN_OK"))
						  mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker").children[0].children[0].contentWindow.document.getElementById("BTN_OK").focus();
					}
				  }
				}    
			}catch(e){}
            //Bug 18433305 Fixes Ends
            //Bug 18068084 Fixes Ends
            /*if (typeof(srcElem.parentNode.tagName) != "undefined" && srcElem.parentNode.tagName.toUpperCase() == "LI") {//HTML5 Changes 6/OCT/2016 start
                if (srcElem.parentNode.parentNode.parentNode.tagName.toUpperCase() == "LI") {
                    if (srcElem.parentNode.parentNode.parentNode.children[0].accessKey == "W") {
                        var liLength = srcElem.parentNode.parentNode.parentNode.getElementsByTagName("LI").length;
                        if(srcElem == srcElem.parentNode.parentNode.parentNode.getElementsByTagName("LI")[liLength-1].children[0]) {
                            hideMenu(srcElem.parentNode.parentNode.parentNode,true, false, event);//HTML5 Changes
                            document.getElementById("fastpath").focus();
                            return false;
                        }
                    }
                }
            }*/ //HTML5 Changes 6/OCT/2016 end
        }
        return true;
    }
}

var presentTab = 0;
var tabCount = 0;

function addTab(seqNo, scrTitle, e) {	 
//REDWOOD_CHANGES
    var isWizPresent = false;
  
    for(var i = 0; i < wizardArray().length; ++i) {
        if( wizardArray()[i].id== "li_"+seqNo) {
            isWizPresent= true;
        break;
    }
  }
    var wizard = {
          "id": 'li_'+seqNo,
          "label": scrTitle,
          "active": landingKo.observable(true)
        };    
        
        
        if(!isWizPresent){
            wizardArray.push(wizard);
    }
         
        for (var i=0; i<wizardArray().length;i++) {
            var wizId = wizardArray()[i].id.replace("li_", "");
            if (wizId != seqNo) {
                wizardArray()[i].active(false);
  }
      }
        
 //REDWOOD_CHANGES
  var winObj = document.getElementById(seqNo);
  winObj.setAttribute("minimized", "true");
  winObj.style.visibility = "hidden";
  
  var activeWinIndex = 0;
  for(var i = 0; i < arrChildWindows.length; ++i) {
    if(arrChildWindows[i].id == seqNo) {
        activeWinIndex = i;
        break;
    }
  }
  var isNextWindowFocused = false;
  for(var i = activeWinIndex - 1; i >= 0; --i) {
    var isMinimized = arrChildWindows[i].getAttribute("minimized");
    if(isMinimized == null || isMinimized == "false") {
    setTimeout(function () { //REDWOOD_CHANGES
      setActiveWindow(arrChildWindows[i], window, false);
    },0);//REDWOOD_CHANGES
      isNextWindowFocused = true;
      break;
    }
  }
  if(!isNextWindowFocused) {
    for(var i = activeWinIndex + 1; i < arrChildWindows.length; ++i) {
      var isMinimized = arrChildWindows[i].getAttribute("minimized");
      if(isMinimized == null || isMinimized == "false") {
      setTimeout(function () {	//REDWOOD_CHANGES
        setActiveWindow(arrChildWindows[i], window, false);
        },0);  //REDWOOD_CHANGES
        isNextWindowFocused = true;
        break;
      }
    }
  }
  

}
function removeTab(tabNo) {	  
//REDWOOD_CHANGES
//console.log('tabNo',tabNo)
//	var tabNode = document.getElementById(tabNo);
//	tabNode.parentNode.removeChild(tabNode);
//	--tabCount;
//	if((tabCount >= 10) && (presentTab+9 != tabCount)) {
//		document.getElementById("MINwinds").children[presentTab+9].style.display = "block";
//	} else if(presentTab > 0) {
//		document.getElementById("MINwinds").children[presentTab-1].style.display = "block";
//		--presentTab;
//	}
//	controlNavigationButtons();
//  var winObj = document.getElementById(tabNo);
//  if(winObj.getAttribute("minimized") == "true") {
//    winObj.setAttribute("minimized", "false");
//    winObj.style.visibility = "visible";
//    setActiveWindow(winObj, window, false);
//  }		 
//REDWOOD_CHANGES
}
function moveLeft() {
	document.getElementById("MINwinds").children[presentTab].style.display = "none";
	document.getElementById("MINwinds").children[9+presentTab+1].style.display = "block";// Fix for 18761175
	presentTab++;
	controlNavigationButtons();
}
function moveRight() {
	document.getElementById("MINwinds").children[presentTab-1].style.display = "block";
	document.getElementById("MINwinds").children[9+presentTab].style.display = "none";// Fix for 18761175
	presentTab--;
	controlNavigationButtons();
}
function controlNavigationButtons() {
	if(10+presentTab >= tabCount)
    document.getElementById("ml").style.visibility = "hidden";
	else
    document.getElementById("ml").style.visibility = "visible";
	if(presentTab > 0)
    document.getElementById("mr").style.visibility = "visible";
	else
    document.getElementById("mr").style.visibility = "hidden";
}

function putFocuson(activeDiv, activeWin, fromDropDown, event){    
    var event = window.event || event;    
    setActiveWindow(activeDiv,activeWin, fromDropDown);      
    try{
        gActiveWindow.document.getElementById("BTN_EXIT_IMG").focus();
      }catch(e){
        gActiveWindow.document.getElementById("BTN_EXIT").focus();
      }
      preventpropagate(event);
     return false;
}

var inactiveTime = 0;
var screenSaverInactiveTime=0; /*12.0.2 Screen Saver Changes*/
//12.0.2 change
//function checkTimeout(){
if (typeof(mainWin) != "undefined") {
    setInterval("updateTimeout()",1000);
    setInterval("updateScreenSaverTimeout()",1000); /*12.0.2 Screen Saver Changes*/
}
//12.0.2 change
var reminderWin  = null;


function updateTimeout(){
    inactiveTime++;
  // sessionInactiveMins++;
    if(inactiveTime == (mainWin.sessionInterval-60)){
         //reminderWin = window.open('Reminder.jsp,'', "toolbar=no,location=false,status=yes,menubar=no,scrollbars=no,directory=false,resizable=no,top=0,left=0,width=600,height=215");
         reminderWin=window.open("", "newwin","toolbar=no,location=false,status=yes,menubar=no,scrollbars=no,directory=false,resizable=no,top=0,left=0,width=600,height=215");
         reminderWin.document.write("<HTML><TITLE>"+getItemDesc("LBL_TITLE_REMINDER")+"</TITLE><head><script type=\"text/javascript\"> setTimeout(\"closeReminder()\",65*1000);function closeReminder(){window.opener.isSessionActive();self.close();} </script><style> .reminderButton{border:1px solid #3c537d; background-color:#4e6ca4;		padding-top:2px; 		padding-bottom:4px;		margin-top:10px; 		font-weight:bold; 		color:#fff;		} </style> </head>");     
         reminderWin.document.write("<BODY class=\"WNDcontent\" style=\"width:100%\">");
         reminderWin.document.write(" <div class=\"loginHeader\"> <span class=\"loginLogo\"><img width=\"105px\" height=\"15px\" title=\"\" alt=\""+getItemDesc("LBL_ORACLE")+"\" src=\"data:image/gif;base64,R0lGODlhaQAQAMQQAP4QEPjq7PxeX/jb3PqcnfuMjfnLzf0vL/4fIPqsrfxOT/tub/0/P/t9fvm7vf8AAPf6/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAABpABAAAAX/ICSOZGmeaAoZg+q+cNqOgwA8eK4rDqn/OUQitcARUgkFUEdw4Bowg22JEwxuUAjhRv0JRt3f0eTEAWYlQfhxgJSzKsL67GAcFisdY8/ncx9ZZn19BzloIww7JkWCg3s9by4JOQCOewUQAw8MeAg4B4cmDYYQOAwpag+YJHIPCFw9I2WqLpEpAVwCAS4DPZNsuy6MX6YyTyQBng8JBZ8kqXAptiitpzEQo8swATgIpZvSxyPZ1sqrEDcAMNMnSoAO8PHyDsEiiQ/1Lvff1iYDhQ/GZCLlxkywYi/Ymbi3xhuJfTH2mQoAcAmAeu7wIMKhEYeCdeJQMAwz5BkOAzE81KkrRtEiShFlLpIwkANlN5CAVNwT0KCnT5/nRrT6+GIoPxEtu3E6pCzVklP3YqlQWKJZzmu4cAQ9YYDLEIQQkgJ4OcKqN6dAErQaWyvkCU1GrkGwuqnBPHgFnFoDGxYgAKlZH/QYYKlb0gcCCtyFZ6CMgMXystWFLHUE2jUHDoJD5nRMqn4n7jVItkbVrDBfLi8hWvVPlwX1+FrOQYAmjlAlYg4IoFpHG9thzoho4BoIblkEfgKlV6KnwKo+HTh/UaBnrAAOqitv8NLAduUlkX8PLyIEADs=\"></span></div> ");
         reminderWin.document.write("<div style=\"margin:15px\"><h1 class=\"hh3\" style=\"font-weight:bold;font-size: .9em;font-family: arial,helvetica,sans-serif;\">"+getItemDesc("LBL_REMINDER")+"</h1></div>");				
         reminderWin.document.write("<div style=\"margin:15px;margin-top:60px;\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"99%\"><tr><td width=\"98%\" valign=\"top\"></td><td nowrap=\"nowrap\" style=\"padding-left:10px\"><input type='button'  class=\"reminderButton\" id=\"fc_close\" value='"+getItemDesc("LBL_CLOSE")+ "' onclick=\"javascript:window.opener.isSessionActive();self.close();\"></td></tr> </table></div>");
         reminderWin.document.write("</BODY></HTML>");
        /* Biometric Changes Start*/
         if(typeof(branchPlugin)!="undefined" && "Y"==branchPlugin){
            ws.close();
         }/* Biometric Changes End*/
    } 
}
/*12.0.2 Screen Saver Changes Start*/
function updateScreenSaverTimeout(){
    screenSaverInactiveTime++;
    if(screenSaverInactiveTime == parseInt(mainWin.screenSaverTimeOut)){
        if (SSO_REQ == "N" && sessionTimeOut == false) {//ScreenSaver window appearing after Session Expired
            setScreenSaverTimeOut(); 
        }
    }
}

function setScreenSaverTimeOut() {
if(document.getElementById('screenSaverPwdDIV').style.display=='none') {
//REDWOOD_CHANGES
    /*
   // document.getElementById("Div_AlertWin").style.display='none';
    if(parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0){ 
        mainDiv =  mainWin.document.getElementById("dashboard"); 
    } else{ 
	mainDiv =  mainWin.document.getElementById("MenuSearchDiv"); 
    }
    */
        mainDiv =  mainWin.document.getElementById("mainContent"); 
    //screenSavermask();
   // document.getElementById('screenSaverPwdDIV').style.marginTop = mainDiv.offsetHeight/3 + "px";
    //document.getElementById('screenSaverPwdDIV').style.marginLeft = mainDiv.offsetWidth/2.5 + "px";
     //document.getElementById('screenSaverPwdDIV').style.marginTop =  "10px";
    //document.getElementById('screenSaverPwdDIV').style.marginLeft = "10px";
    document.getElementById('screenSaverPwdDIV').style.zIndex=document.getElementById('screenSavermasker').style.zIndex + 1;
    //document.getElementById('screenSaverPwdDIV').style.display='block';
    document.getElementById('screenSavermasker').style.display="block";
    try {
             alertHeadersScreenSaver( [{"headerText" : "message", "field" : "message"}]);
             alerMessagesScreenSaver.removeAll();
             alerMessagesScreenSaver.push({"message":labelScreenSaverMsg});
         }
        catch (e) {
        console.log(e)
        }
        
       // document.getElementById('screenSaverPwdDIV').open();
        
	if(!document.getElementById('screenSaverPwdDIV').isOpen()){
		document.getElementById('screenSaverPwdDIV').open();
	}
        
   //REDWOOD_CHANGES 
    document.getElementById("enteredPwd").focus();
    }
}


function screenSaverLock() {    
    var objHTTP = createHTTPActiveXObject();
    var strFormData = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>screenSaverPwdVerify</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY><ENTEREDPASSWD>USRSCRLOCK</ENTEREDPASSWD></FCUBS_BODY></FCUBS_REQ_ENV>';
    objHTTP.open("POST", "PasswordResetServlet?login=false&actionType=screenSaverPwdVerify", false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(strFormData);
}

function fnverifyScreenSaverPwd(){
	//if(!isSessionActive()) return false; //9NT1606_12_2_RETRO_12_0_3_23652537 changes
    var passData = '<ENTEREDPASSWD>' + document.getElementById('enteredPwd').value + '</ENTEREDPASSWD>';
    var strFormData = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>screenSaverPwdVerify</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY>' + passData + '</FCUBS_BODY></FCUBS_REQ_ENV>';
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", "PasswordResetServlet?login=false&actionType=screenSaverPwdVerify", false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    //E2E Changes
    if (typeof (reqEncReqd) != "undefined" && reqEncReqd == "Y") {
        objHTTP.send(AESEncrypt(strFormData));
    }else{
    objHTTP.send(strFormData);
    }
	 } //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
      catch(exp){
          handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change end
    var resp = objHTTP.responseXML;
    mainWin.inactiveTime = 0;
    var respNode =  null;
    if(resp != null){
        respNode = selectSingleNode(resp, "//MESSAGE");
    }
    if(respNode == null){
        screenSaverInactiveTime=0;		
//REDWOOD_CHANGES
       // document.getElementById("screensavertblcontainer").innerHTML = "";
        //document.getElementById("screensavertblcontainer").innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" summary="Alert" class="TBLtwo" id="SCREEN_SAVER_TBL"><tbody id="cloneMsg"><tr id="alertMsg"><td style="display:block" scope="row" id="alertMsgI"><em title="'+AlertMsg+'" class="BTNicon"><span tabindex="0" class="ICOAlert_I"></span></em><span class="SPNtbltwoC">'+labelScreenSaverMsg+'</span></td></tr><tr id="wrongAlertMsg"></tr></tbody></table>';
       // document.getElementById("screensavertblcontainer").innerHTML = '<div id="SCREEN_SAVER_TBL"><oj-label  slot="label" for="labelScreenSaverMsg" class="LBLstd"><span class="SPNtbltwoH">'+labelScreenSaverMsg+'</span> </oj-label><oj-label  slot="label" for="labelScreenSaverMsg" class="LBLstd"><span class="SPNtbltwoH">'+AlertMsg+'</span><div id="wrongAlertMsg" style="display:none"></div></oj-label><div>';
        
        if(document.getElementById('screenSaverPwdDIV').isOpen()){
		document.getElementById('screenSaverPwdDIV').close();
	}
       // document.getElementById('screenSaverPwdDIV').style.display="none";
       document.getElementById('screenSavermasker').style.display="none";
  //REDWOOD_CHANGES     
        document.getElementById('enteredPwd').value="";    
        //screenSaverunmask();//REDWOOD_CHANGES
	    if(!isSessionActive()) return false; 
    } else{
        document.getElementById('enteredPwd').value="";	 
//REDWOOD_CHANGES
        fnScreenSaverOnErrorMessage(resp) //new function OJET changes here.below code get commented
        /*
        if(document.getElementById('wrongAlertMsg')) {
            var scrSaverErrMsgtable=document.getElementById("SCREEN_SAVER_TBL").tBodies[0];             
            var newRow = document.createElement("TR");
            var newCell = document.createElement("TD");
            if(document.getElementById('wrongAlertMsg').style.display=='block') {
                var msgArr = fnBuildMsgArr(getXMLString(resp));
                var err_code = "",
                err = "";
                    for (var i in msgArr) {
                        err_code = i + "~";
                        err = msgArr[i] + "~";
                    }
                err_code = err_code.substring(0, err_code.length - 1);
                err = err.substring(0, err.length - 1);
                    if(err_code == "SM-00013" || err_code == "OF-4569"){
                        newCell.innerHTML = '<em title="'+AlertMsg+'" class="BTNicon"><span tabindex="0" class="ICOAlert_E"></span></em><span class="SPNtbltwoC">'+ err + '</span>';
                        document.getElementById("enteredPwd").disabled=true;
                        document.getElementById("BTN_OK").disabled=true;
                    }else{
                        newCell.innerHTML = '<em title="'+AlertMsg+'" class="BTNicon"><span tabindex="0" class="ICOAlert_E"></span></em><span class="SPNtbltwoC">'+ labelScreenSaverErrMsg + '</span>';
                    }
                newRow.appendChild(newCell);
            } else { 
                document.getElementById('wrongAlertMsg').style.display='block';
                newCell.innerHTML = '<em title="'+AlertMsg+'" class="BTNicon"><span tabindex="0" class="ICOAlert_E"></span></em><span class="SPNtbltwoC">'+ labelScreenSaverErrMsg + '</span>';
                newRow.appendChild(newCell);
            } 
            scrSaverErrMsgtable.appendChild(newRow);
        }
        */
    }
}

function fnScreenSaverOnErrorMessage(resp) {
    if (document.getElementById('screenSaverPwdDIV').isOpen) {
        var msgArr = fnBuildMsgArr(getXMLString(resp));
        var err_code = "", err = "";
        for (var i in msgArr) {
            err_code = i + "~";
            err = msgArr[i] + "~";
        }
        err_code = err_code.substring(0, err_code.length - 1);
        err = err.substring(0, err.length - 1);
        if (err_code == "SM-00013" || err_code == "OF-4569") {
            alerMessagesScreenSaver.push( {
                "message" : err
            });
            document.getElementById("enteredPwd").disabled = true;
            document.getElementById("BTN_OK").disabled = true;
        }
        else {
            alerMessagesScreenSaver.push( {
                "message" : labelScreenSaverErrMsg
            });
        }
    }
    else {
        alerMessagesScreenSaver.push( {
            "message" : labelScreenSaverErrMsg
        });	  
//REDWOOD_CHANGES
    }
}

function fnUpdateScreenSaverInterval(){
    screenSaverInactiveTime=0;
}
/*12.0.2 Screen Saver Changes End*/


// Changes For Customer Signature Starts
  function getHTMLForSignView() {
  // Changes For Customer Signature Starts
 if (g_HTMLCacheSignView == "") {
 var ccyAcc = mainWin.getItemDesc("LBL_ACC_CCY");//Fix for 17310360
 var descAcc = mainWin.getItemDesc("LBL_ACC_DESC");
 var first = mainWin.getItemDesc("LBL_FIRST");
 var prev = mainWin.getItemDesc("LBL_PREVIOUS");
 var next = mainWin.getItemDesc("LBL_NEXT");
 var last = mainWin.getItemDesc("LBL_LAST");
 var gotopage = mainWin.getItemDesc("LBL_GOTO_PAGE");
 var brnCode = mainWin.getItemDesc("LBL_ACCOUNT_BRANCH");//Fix for 17310360
 var sigtype = mainWin.getItemDesc("LBL_SIG_TYPE");
 var custAcc = mainWin.getItemDesc("LBL_ACC_NUMBER");//Fix for 17310360
 var custId = mainWin.getItemDesc("LBL_CUSTOMER_ID");
 var custName = mainWin.getItemDesc("LBL_CUST_NAME");
 var accMsg = mainWin.getItemDesc("LBL_ACC_MSG");
 var signdet = mainWin.getItemDesc("LBL_IMAGE_DETAILS");//Fix for 17310360
 var accdet = mainWin.getItemDesc("LBL_ACCOUNT_DETAILS");
 var signid = mainWin.getItemDesc("LBL_SIGN_ID");
 var jointHolderType = mainWin.getItemDesc("LBL_JOINT_TYPE");//Fix for 17310360
 var applimit = mainWin.getItemDesc("LBL_APP_LMT");
 var sigmsg = mainWin.getItemDesc("LBL_SIG_MSG");
 var imgtype = mainWin.getItemDesc("LBL_IMG_TYP");
 var filetype = mainWin.getItemDesc("LBL_FILE_TYP");
 var mandatory = mainWin.getItemDesc("LBL_INFRA_MANDATORY");
 var signname = mainWin.getItemDesc("LBL_SIGN_NAME");
 var specno = mainWin.getItemDesc("LBL_SPECIMEN_NO");
 var solosuf = mainWin.getItemDesc("LBL_SOLO_SUFFICIENT");
 var zoomin = mainWin.getItemDesc("LBL_ZOOMIN");
 var zoomout = mainWin.getItemDesc("LBL_ZOOMOUT");
 var rcwise = mainWin.getItemDesc("LBL_RCWISE");
 var racwise = mainWin.getItemDesc("LBL_RACWISE");
 var horiz = mainWin.getItemDesc("LBL_HORIZONTAL");
 var vert = mainWin.getItemDesc("LBL_VERTICAL");
 var pagefoot = mainWin.getItemDesc("LBL_PAGE_FOOTER");
 var instdet = mainWin.getItemDesc("LBL_INST_DET");
 var jntacc = mainWin.getItemDesc("LBL_JNT_ACC");
 var exit = mainWin.getItemDesc("LBL_EXIT");
 var ok = mainWin.getItemDesc("LBL_OK");
 var imgdet = mainWin.getItemDesc("LBL_IMG_DETAILS");
 var allSigns = mainWin.getItemDesc("LBL_ALL_SIG");
 var selectallrows = mainWin.getItemDesc("LBL_SELECT_ALL_ROWS");
 
var HTMLCacheSignView = '<div id="ResTree" class="DIVTwoColLyt"><div class="DIVHeaderBodyContainer" id="DIVMainTmp"><div class="DIVHeader" ID="TBLPageTAB_HEADER"></div><div class="DIVHeader" id="TBLPageTAB_MAIN">';
HTMLCacheSignView += '<DIV class=TwoColSectionContainer><DIV class=DIVColumnDouble><FIELDSET class=FSTstd view="SE" type="ME" block="BLK_ACCOUNT_DETAILS"><LEGEND>'+accdet+'</LEGEND><div class="DIVSubColumnOne">';
/*Commented for 17310360 
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_ACCOUNT_DETAILS__BRANCH>'+brnCode+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_ACCOUNT_DETAILS__BRANCH onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=brnCode REQUIRED="0" DTYPE="VARCHAR2" DBC="BRANCH" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+brnCode+'" viewMode="Y"></DIV>';*/
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_ACCOUNT_DETAILS__CUST_ACC>'+custAcc+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_ACCOUNT_DETAILS__CUST_ACC onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=custAcc REQUIRED="-1" DTYPE="VARCHAR2" DBC="CUST_ACC" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+custAcc+'" viewMode="Y"></DIV>';
/*Commented for 17310360 
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_ACCOUNT_DETAILS__CCY>'+ccyAcc+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_ACCOUNT_DETAILS__CCY onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=ccyAcc REQUIRED="0" DTYPE="VARCHAR2" DBC="CCY" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+ccyAcc+'" viewMode="Y"></DIV>';*/
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_ACCOUNT_DETAILS__DESC_ACC>'+descAcc+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_ACCOUNT_DETAILS__DESC_ACC onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=descAcc REQUIRED="0" DTYPE="VARCHAR2" DBC="DESC_ACC" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+descAcc+'" viewMode="Y"></DIV>';
//Fix for 19862450 starts
HTMLCacheSignView += '<DIV class="DIVColumnDouble"><DIV class=DIVText><LABEL class="LBLstd star" for=BLK_ACCOUNT_DETAILS__ACCMSG>'+accMsg+'</LABEL>';//Data Uri changes
//Fix for 18948123 starts
HTMLCacheSignView += '<textarea class=TXTro id=BLK_ACCOUNT_DETAILS__ACCMSG onfocusout=fnToUppercase(this) readOnly maxLength=500 rows =5 cols =100 name=accMsg REQUIRED="0" DTYPE="VARCHAR2" DBC="ACCMSG" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+accMsg+'" viewMode="Y"></textarea></DIV>';
//HTMLCacheSignView += '<INPUT class=TXTro id=BLK_ACCOUNT_DETAILS__ACCMSG onfocusout=fnToUppercase(this) readOnly maxLength=500 size=26 name=accMsg REQUIRED="0" DTYPE="VARCHAR2" DBC="ACCMSG" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+accMsg+'" viewMode="Y"></DIV>';
//Fix for 18948123 ends
HTMLCacheSignView += '</DIV></DIV>';
//Fix for 19862450 ends
/*Fix for 17310360 start*/
HTMLCacheSignView +='<div class="DIVSubColumnOne">';
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_ACCOUNT_DETAILS__BRANCH>'+brnCode+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_ACCOUNT_DETAILS__BRANCH onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=brnCode REQUIRED="0" DTYPE="VARCHAR2" DBC="BRANCH" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+brnCode+'" viewMode="Y"></DIV>';
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_ACCOUNT_DETAILS__CCY>'+ccyAcc+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_ACCOUNT_DETAILS__CCY onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=ccyAcc REQUIRED="0" DTYPE="VARCHAR2" DBC="CCY" DBT="BLK_ACCOUNT_DETAILS" LABEL_VALUE="'+ccyAcc+'" viewMode="Y"></DIV>';
/*Fix for 17310360 end*/
HTMLCacheSignView +='</DIV></div>';


HTMLCacheSignView += '<div class="TwoColSectionContainer"><div class="DIVColumnDouble"><fieldset class="FSTcell" block="BLK_SIGNATURE_DETAILS" type="ME" view="ME"><div name="dataContainer" id="dataContainer_BLK_SIGNATURE_DETAILS" class="DIVMultipleMedium">';
HTMLCacheSignView += '<div class="DIVmultiplebox"><div id="tableContainer" style="Height:160px;" onscroll="toggleSelectBoxes(this,BLK_SIGNATURE_DETAILSHeader)" class="DIVMultipleMediumInner">';
HTMLCacheSignView += '<table border="0" cellspacing="0" cellpadding="0" ID="BLK_SIGNATURE_DETAILS" caption="Records" class="TBLgrid" type="ME" summary="" DBT="BLK_SIGNATURE_DETAILS" pgsize="15"><COLGROUP span=6></COLGROUP><thead id="BLK_SIGNATURE_DETAILSHeader"><tr>';
HTMLCacheSignView += '<th class=Textleft id=Table_Options scope=col colSpan=6><DIV class=DIVgrid><SPAN class=Fleft><SPAN class=FleftBtns>';                                                             
HTMLCacheSignView += '<button class="BTNicon2D" title="'+first+'" name="nFirst__BLK_SIGNATURE_DETAILS" id="nFirst__BLK_SIGNATURE_DETAILS" onclick="Navigate(N_FIRST,\'BLK_SIGNATURE_DETAILS\')" type="navBtn" disabled><span tabindex="-1" class="ICOfirst"><span class="LBLinv"> '+first+' </span></span></button>';
HTMLCacheSignView += '<button class="BTNicon2D" title="'+prev+'" name="nPrev__BLK_SIGNATURE_DETAILS" id="nPrev__BLK_SIGNATURE_DETAILS" onclick="Navigate(N_PREVIOUS,\'BLK_SIGNATURE_DETAILS\')" type="navBtn" disabled><span tabindex="-1" class="ICOprevious"><span class="LBLinv"> '+prev+' </span></span></button>';
HTMLCacheSignView += '<span id="CurrPage__BLK_SIGNATURE_DETAILS" name="CurrPage__BLK_SIGNATURE_DETAILS" class="SPNtext">&nbsp;1</span><span class="SPNtext">&nbsp;of&nbsp;</span>&nbsp;&nbsp;<span id="TotPage__BLK_SIGNATURE_DETAILS" name="TotPage__BLK_SIGNATURE_DETAILS" class="SPNtext">1</span>';
HTMLCacheSignView += '<button class="BTNicon2D" title="'+next+'" name="nNext__BLK_SIGNATURE_DETAILS" id="nNext__BLK_SIGNATURE_DETAILS" onclick="Navigate(N_NEXT,\'BLK_SIGNATURE_DETAILS\')" type="navBtn" disabled><span tabindex="-1" class="ICOnext"><span class="LBLinv"> '+next+' </span></span></button>';
HTMLCacheSignView += '<button class="BTNicon2D" title="'+last+'" name="nLast__BLK_SIGNATURE_DETAILS" id="nLast__BLK_SIGNATURE_DETAILS" onclick="Navigate(N_LAST,\'BLK_SIGNATURE_DETAILS\')" type="navBtn" disabled><span tabindex="-1" class="ICOlast"><span class="LBLinv"> '+last+' </span></span></button></SPAN>&nbsp;';
HTMLCacheSignView += '<LABEL class=LBLinv for=goto__BLK_SIGNATURE_DETAILS></LABEL><input id="goto__BLK_SIGNATURE_DETAILS" type="text" size="1" class="TXTstd" value="" disabled="true">&nbsp;';
HTMLCacheSignView += '<button class="BTNtextD" title="'+gotopage+'" name="go__BLK_SIGNATURE_DETAILS" id="go__BLK_SIGNATURE_DETAILS" value="Go" onclick="Navigate(N_GOTO,\'BLK_SIGNATURE_DETAILS\')" disabled="true"><'+gotopage+'></button>';
HTMLCacheSignView += '</span><div></th></tr>';

HTMLCacheSignView += '<tr DBT="BLK_SIGNATURE_DETAILS">';
HTMLCacheSignView += '<th class="THgrid1" scope="col"><label class="LBLauto" for="BLK_SIGNATURE_DETAILS_CHK_ME"><input type="checkbox" class="CHKstd" id="BLK_SIGNATURE_DETAILS_CHK_ME" OnClick="fnToggleAllOrNoneME(BLK_SIGNATURE_DETAILS,this)" title="'+selectallrows+'"></label></th>';
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+custId+'</span></th>';//Data Uri changes
//HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+custName+'<img src="Images/star_disabled.gif" title="'+custName+'" ALT=""></span></th>';Commented for 17310360 
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+jointHolderType+'</span></th>';
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+signid+'</span></th>';
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+signname+'</span></th>';
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+sigtype+'</span></th>';
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+applimit+'</span></th>'; 
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+sigmsg+'</span></th>';
HTMLCacheSignView += '<th class="THgrid" scope="col"><span class="SPNtext">'+solosuf+'</span></th>';
HTMLCacheSignView += '<th class="THgrid" width="99%">&nbsp;</th></tr></thead><tbody><tr>';
HTMLCacheSignView += '<td class="TDgrid1"><label class="LBLauto" for="chkDeleteRow"><input name="chkDeleteRow" type="checkbox" id="chkDeleteRow" parentDBT="BLK_SIGNATURE_DETAILS" onclick="fnMulipleEntryRow_onClick(event)"></label></td>';
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_CUST_ID"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+custId+'" title="'+custId+'" ID="BLK_CUST_ID" DBT="BLK_SIGNATURE_DETAILS" DBC="CUST_ID" NAME="CUST_ID" DTYPE="VARCHAR2" SIZE="12" REQUIRED="" MAXLENGTH="12"></td>';
//HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_CUST_NAME"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+custName+'"title="'+custName+'" ID="BLK_CUST_NAME" DBT="BLK_SIGNATURE_DETAILS" DBC="CUST_NAME" NAME="CUST_NAME" DTYPE="VARCHAR2" SIZE="20" REQUIRED="" MAXLENGTH="20"></td>';Commented for 17310360 
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_JOINT_HOLDER"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+jointHolderType+'" title="'+jointHolderType+'" ID="BLK_JOINT_HOLDER" DBT="BLK_SIGNATURE_DETAILS" DBC="JOINT_TYPE" NAME="JOINT_TYPE" DTYPE="VARCHAR2" SIZE="22" REQUIRED="" MAXLENGTH="22"></td>';
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_SIGNATURE_ID"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+signid+'" title="'+signid+'" ID="BLK_SIGNATURE_ID" DBT="BLK_SIGNATURE_DETAILS" DBC="SIGN_ID" NAME="SIGN_ID" DTYPE="VARCHAR2" SIZE="25" REQUIRED="" MAXLENGTH="50"></td>';
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_SIGN_NAME"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+signname+'" title="'+signname+'" ID="BLK_SIGN_NAME" DBT="BLK_SIGNATURE_DETAILS" DBC="SIG_NAME" NAME="SIG_NAME" DTYPE="VARCHAR2" SIZE="25" REQUIRED="" MAXLENGTH="50"></td>';
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_SIGNATURE_TYPE"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+sigtype+'" title="'+sigtype+'" ID="BLK_SIGNATURE_TYPE" DBT="BLK_SIGNATURE_DETAILS" DBC="SIGN_TYPE" NAME="SIGN_TYPE" DTYPE="VARCHAR2" SIZE="25" REQUIRED="" MAXLENGTH="50"></td>';
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_APP_LIMIT"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+applimit+'" title="'+applimit+'" ID="BLK_APP_LIMIT" DBT="BLK_SIGNATURE_DETAILS" DBC="APPR_LIMIT" NAME="APPR_LIMIT" DTYPE="VARCHAR2" SIZE="25" REQUIRED="" MAXLENGTH="50"></td>';
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_SIGMSG"></label><textarea class="TXTro" cols="40" rows="1" viewMode="Y" readOnly="true" LABEL_VALUE="'+sigmsg+'" title="'+sigmsg+'" ID="BLK_SIGMSG" DBT="BLK_SIGNATURE_DETAILS" DBC="SIGN_MSG" NAME="SIGN_MSG" DTYPE="VARCHAR2" REQUIRED="" MAXLENGTH="500"></textarea></td>';                                                      
/* Fix for 18938078 starts */
//HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_SIG_SOLO_SUFFICIENT"></label><input type="text" class="TXTro" viewMode="Y" readOnly="true" LABEL_VALUE="'+solosuf+'" title="'+solosuf+'" ID="BLK_SIG_SOLO_SUFFICIENT" DBT="BLK_SIGNATURE_DETAILS" DBC="SOLO_SUFFICIENT" NAME="SOLO_SUFFICIENT" DTYPE="VARCHAR2" SIZE="25" REQUIRED="" MAXLENGTH="50"></td>';
HTMLCacheSignView += '<td class="TDgrid"><label class="LBLinv" for="BLK_SIG_SOLO_SUFFICIENT"></label><input type="checkbox" class="CHKstd" disabled LABEL_VALUE="'+solosuf+'" OFF="0" ON="1" title="'+solosuf+'" ID="BLK_SIG_SOLO_SUFFICIENT" DBT="BLK_SIGNATURE_DETAILS" DBC="SOLO_SUFFICIENT" NAME="SOLO_SUFFICIENT" DTYPE="VARCHAR2" REQUIRED=""></td>';
/* Fix for 18938078 ends */
HTMLCacheSignView += '</tr></tbody></table></div></div></div></fieldset></div></div>';

HTMLCacheSignView += '<DIV class=TwoColSectionContainer><DIV class=DIVColumnDouble><FIELDSET class=FSTstd view="SE" type="ME" block="BLK_SIGNATURE"><LEGEND>'+signdet+'</LEGEND>';
/*Fix for 17310360 start*/
HTMLCacheSignView += '<DIV class=DIVpage><button class="BTNicon2D" title="'+prev+'" name="BTN_PREV__BLK_SIGNATURE"  id="BTN_PREV_BLK_SIGNATURE" onclick="NavigateImage(N_PREVIOUS);" disabled><span tabindex="-1" class="ICOprevious"><span class="LBLinv">'+prev+'</span></span></button>'; //Fix for 19954276
HTMLCacheSignView += '<span id="CurrPageSV__BLK_SIGNATURE" name="CurrPageSV__BLK_SIGNATURE" class="SPNtext">&nbsp;1</span><span class="SPNtext">&nbsp;of&nbsp;</span>&nbsp;&nbsp;<span id="TotPageSV__BLK_SIGNATURE" name="TotPageSV__BLK_SIGNATURE" class="SPNtext">1</span>';
HTMLCacheSignView += '<button class="BTNicon2D" title="'+next+'" name="BTN_NEXT___BLK_SIGNATURE" id="BTN_NEXT_BLK_SIGNATURE" onclick="NavigateImage(N_NEXT);" disabled><span tabindex="-1" class="ICOnext"><span class="LBLinv">'+next+'</span></span></button></div>'; //Fix for 19954276
HTMLCacheSignView += '<div class="DIVSubColumnOne">';
/*Fix for 17310360 end*/
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_SIG_SPECIMEN_NO>'+specno+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_SIG_SPECIMEN_NO onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=specno REQUIRED="-1" DTYPE="VARCHAR2" DBC="SPECIMAN_NO" DBT="BLK_SIG_SPECIMEN_NO" LABEL_VALUE="'+specno+'" viewMode="Y"></DIV>';
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_IMGTYPE>'+imgtype+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_IMGTYPE onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=imgtype REQUIRED="-1" DTYPE="VARCHAR2" DBC="IMG_TYPE" DBT="BLK_IMGTYPE" LABEL_VALUE="'+imgtype+'" viewMode="Y"></DIV>';
HTMLCacheSignView += '<DIV class=DIVText><LABEL class="LBLstd star" for=BLK_FILETYPE>'+filetype+'</LABEL>';//Data Uri changes
HTMLCacheSignView += '<INPUT class=TXTro id=BLK_FILETYPE onfocusout=fnToUppercase(this) readOnly maxLength=12 size=12 name=filetype REQUIRED="-1" DTYPE="VARCHAR2" DBC="FILE_TYPE" DBT="BLK_FILETYPE" LABEL_VALUE="'+filetype+'" viewMode="Y"></DIV>';
HTMLCacheSignView += '</DIV></DIV></div>';
HTMLCacheSignView += '<div class="DIVSubColumnDouble"><div class="DIVpage" id="MESV_BLK_SIGNATURE"><span class="DIVpageH">&nbsp;&nbsp;</span><span class="SPNpageH">';
HTMLCacheSignView += '<button class="BTNicon2" title="'+zoomin+'" name="incSize"  id="incSize" onClick="enlargeImage(\'SIGNATUREIMG\');"><span tabindex="-1" class="ICOzoomin"><span class="LBLinv">'+zoomin+'</span></span></button>';
HTMLCacheSignView += '<button class="BTNicon2" title="'+zoomout+'" name="decSize"  id="decSize" onClick="dropImage(\'SIGNATUREIMG\');"><span tabindex="-1" class="ICOzoomout"><span class="LBLinv">'+zoomout+'</span></span></button>';
HTMLCacheSignView += '<button class="BTNicon2" title="'+rcwise+'" name="rotate"  id="rotate" onClick="fnCrotate(\'SIGNATUREIMG\');" ><span tabindex="-1" class="ICOrotateclk"><span class="LBLinv">'+rcwise+'</span></span></button>';
HTMLCacheSignView += '<button class="BTNicon2" title="'+racwise+'" name="rotate"  id="rotate" onClick="fnArotate(\'SIGNATUREIMG\');"><span tabindex="-1" class="ICOrotateanticlk"><span class="LBLinv">'+racwise+'</span></span></button>';
HTMLCacheSignView += '<button class="BTNicon2" title="'+horiz+'" name="flipH"  id="flipH" onClick="fnFlipH(\'SIGNATUREIMG\');"><span tabindex="-1" class="ICOfliph"><span class="LBLinv">'+horiz+'</span></span></button>';
HTMLCacheSignView += '<button class="BTNicon2" title="'+vert+'" name="flipV"  id="flipV" onClick="fnFlipV(\'SIGNATUREIMG\');"><span tabindex="-1" class="ICOflipv"><span class="LBLinv">'+vert+'</span></span></button></span>';
/*Fix for 17310360 start*/
/*HTMLCacheSignView += '<button class="BTNicon2D" title="'+prev+'" name="BTN_PREV__BLK_SIGNATURE"  id="BTN_PREV_BLK_SIGNATURE" onclick="Navigate(N_PREVIOUS);" disabled><span tabindex="-1" class="ICOprevious"><span class="LBLinv">'+prev+'</span></span></button>';
HTMLCacheSignView += '<span id="CurrPageSV__BLK_SIGNATURE" name="CurrPageSV__BLK_SIGNATURE" class="SPNtext">&nbsp;1</span><span class="SPNtext">&nbsp;of&nbsp;</span>&nbsp;&nbsp;<span id="TotPageSV__BLK_SIGNATURE" name="TotPageSV__BLK_SIGNATURE" class="SPNtext">1</span>';
HTMLCacheSignView += '<button class="BTNicon2D" title="'+next+'" name="BTN_NEXT___BLK_SIGNATURE" id="BTN_NEXT_BLK_SIGNATURE" onclick="Navigate(N_NEXT);" disabled><span tabindex="-1" class="ICOnext"><span class="LBLinv">'+next+'</span></span></button>';*/
/*Fix for 17310360 end*/
HTMLCacheSignView += '</div>';	
HTMLCacheSignView += '<div class=DIVText id=IMAGEDIV  style="overflow:auto; height:15em; "></div>';
HTMLCacheSignView += '<!-- Added for Flipping and rotating image Starts -->';
        if(navigator.userAgent.indexOf("MSIE ") != -1){
            HTMLCacheSignView += '<style>.IMGButton{cursor: default; FILTER: progid:DXImageTransform.Microsoft.Matrix(sizingmethod=\'auto expand\') flipv flipv fliph fliph }</style>';
}
HTMLCacheSignView += '<!-- Added for Flipping and rotating image Ends -->';
HTMLCacheSignView += '</div></FIELDSET></div></DIV></DIV></div></div></div>';
HTMLCacheSignView += '<div class="DIVfooter" id="DIVFooter"><h2 class="LBLinv">'+pagefoot+'</h2><DIV class=DIVAbutton id=DIVSubSystem><UL>';
HTMLCacheSignView += '<LI id=CVS_INS_DETAILS><A class=Abutton tabindex=0 onblur="this.className=\'Abutton\'" onmouseover="this.className=\'AbuttonH\'" onfocus="this.className=\'AbuttonH\'" onkeydown="return handleScrObj(this,event)" onclick="fndispNotepadDet(document.getElementById(\'BLK_ACCOUNT_DETAILS__CUST_ACC\').value,\'CUST_ACC\',\'\',document.getElementById(\'BLK_ACCOUNT_DETAILS__BRANCH\').value)" onmouseout="this.className=\'Abutton\'">'+instdet+'</A></LI>';
HTMLCacheSignView += '<LI id=CVS_ALL_SIGNS><A class=Abutton tabindex=0 onblur="this.className=\'Abutton\'" onmouseover="this.className=\'AbuttonH\'" onfocus="this.className=\'AbuttonH\'" onkeydown="return handleScrObj(this,event)" onclick="fnShowAllImg()" onmouseout="this.className=\'Abutton\'">'+allSigns+'</A></LI></UL></DIV><div class="DIVAudit">';
//HTMLCacheSignView += '<LI id=CVS_JOINT_ACC_HOLD><A class=Abutton tabindex=0 onblur="this.className=\'Abutton\'" onmouseover="this.className=\'AbuttonH\'" onfocus="this.className=\'AbuttonH\'" onkeydown="return handleScrObj(this,event)" onclick="fndispJointAcc(document.getElementById(\'BLK_ACCOUNT_DETAILS__CUST_ACC\').value,\'CUST_ACC\',\'\',document.getElementById(\'BLK_ACCOUNT_DETAILS__BRANCH\').value)" onmouseout="this.className=\'Abutton\'">'+jntacc+'</A></LI></UL>';
HTMLCacheSignView += '<TABLE ID="TBLPageTAB_FOOTER" cellpadding="0" cellspacing="0" border="0" width="99%" summary=""><TR><TD width="98%" valign="top"></TD><TD nowrap style="padding-left:10px">';
HTMLCacheSignView += '<button class="BTNfooter" ID="BTN_OK_IMG" name="BTN_OK" VALUE="Ok" onclick="fnOkCustSignView()"  onkeydown="return handleScrObj(this,event)" >'+ok+'</button>';
HTMLCacheSignView += '<button class="BTNfooter" ID="BTN_EXIT_IMG" name="BTN_EXIT" VALUE="Exit" onclick="fnExitCustSignView()"  onkeydown="return handleScrObj(this,event)" >'+exit+'</button>';
HTMLCacheSignView += '</TD></TR></TABLE></div></div>';
g_HTMLCacheSignView = HTMLCacheSignView;
    } else {}
    return g_HTMLCacheSignView;
}// Changes For Customer Signature Ends

function showChangeScreenSaver(src) {
    document.getElementById("Div_AlertWin").style.display = "block";
    document.getElementById("ifr_AlertWin").src=src+"?THEME="+strTheme+"&FROMLOGIN=false";
    mask();
}

//9NT1606_12_2_RETRO_12_0_3_21182929 changes start	
//REDWOOD_CHANGES
/*
function displayTimeOutErrDiv(messageArr){
        mask();
        var timeOutErrDiv =  document.getElementById("timeOutAlertDiv");
        timeOutErrDiv.style.display = "block";
        timeOutErrDiv.style.position = "absolute";
        timeOutErrDiv.style.zIndex = "9999";
         var alertMsgTitle = mainWin.getItemDesc("LBL_ALERT_MSG_E");
        var errtable = document.getElementById("ERRTBL").tBodies[0];
        var tobodyRows = errtable.rows;
        for(var cnt = 0; cnt <tobodyRows.length; cnt++)
        {
          tobodyRows[cnt].parentNode.removeChild(tobodyRows[cnt]);
        }
        timeOutErrDiv.style.width =  document.getElementById("timeOutErrWndtitle").offsetWidth + "px";
        setHorizontalPosition(timeOutErrDiv, false, ((mainWin.x/2) - ( ( document.getElementById("timeOutErrWndwidth").offsetWidth / 2) + 12)));
        timeOutErrDiv.style.top = parent.document.getElementById("masthead").offsetHeight + 4 + "px";
        var messageArr  = messageArr.split("__");
        var tableBody = document.getElementById("ERRTBL").tBodies[0];
         for (var i=0;i<messageArr.length;i++) {
            var rowElem = document.createElement("TR");
            var cell1 = document.createElement("TD");
            cell1.setAttribute("scope", "row");
            var cell1Data = "<em class='BTNicon' title='"+alertMsgTitle+"'><SPAN class='ICOAlert_E' tabIndex=0></SPAN></em><SPAN tabindex=\"0\"  class='SPNtbltwoC'>"+messageArr[i].split("~")[1]+"</SPAN>";
            cell1.innerHTML = cell1Data;
            rowElem.appendChild(cell1);
            var cell2 = document.createElement("TD");
            var cell2Data = "<SPAN tabindex=\"0\"  class='SPNtbltwoC' style='word-break: break-all;'>"+messageArr[i].split("~")[0]+"</SPAN>";
            cell2.innerHTML = cell2Data;
            rowElem.appendChild(cell2);
            tableBody.appendChild(rowElem);
    } 
    document.getElementById("BTN_OK").focus();
}
*/

function displayTimeOutErrDiv(messageArr){
        mask();
        var timeOutErrDiv =  document.getElementById("timeOutAlertDiv");
		if(!document.getElementById('timeOutAlertDiv').isOpen()){
			document.getElementById('timeOutAlertDiv').open();
		}
		
        timeOutErrDiv.style.display = "block";
        timeOutErrDiv.style.position = "absolute";
        timeOutErrDiv.style.zIndex = "9999";
         var alertMsgTitle = mainWin.getItemDesc("LBL_ALERT_MSG_E");
		 
		 try {
             alertHeadersTimeOut( [{"headerText" : lblErrDesc , "field" : "errorDesc"},
                                    {"headerText" : lblErrCode, "field" : "errorCode"},
                                  ]);
                                  
             alertMessagesTimeOut.removeAll();

			 var messageArr  = messageArr.split("__");
			 for (var i=0;i<messageArr.length;i++) {
                                if(messageArr[i].split("~")[1] && messageArr[i].split("~")[1].includes("<br>")){
                                        var messageArrNewLineData  = messageArr[i].split("~")[1].split("<br>");
                                         for (var j=0;j<messageArrNewLineData.length;j++) {
                                             alertMessagesTimeOut.push({"errorDesc":messageArrNewLineData[j], "errorCode":messageArr[i].split("~")[0]});
                                         }
                                }
                                else{
                                    alertMessagesTimeOut.push({"errorDesc":messageArr[i].split("~")[1], "errorCode":messageArr[i].split("~")[0]});
                                } 
			 }
             
         }
        catch (e) {
        console.log(e)
        }
		
        timeOutErrDiv.style.width =  document.getElementById("timeOutErrWndtitle").offsetWidth + "px";
       // setHorizontalPosition(timeOutErrDiv, false, ((mainWin.x/2) - ( ( document.getElementById("timeOutErrWndwidth").offsetWidth / 2) + 12)));
        timeOutErrDiv.style.top = parent.document.getElementById("masthead").offsetHeight + 4 + "px";
        
    document.getElementById("TIMEOUT_BTN_OK").focus();
}

function displayTimeOutErrDiv_withouOjet(messageArr){ 
//REDWOOD_CHANGES
        mask();
        var timeOutErrDiv =  document.getElementById("timeOutAlertDiv");
        timeOutErrDiv.style.display = "block";
        timeOutErrDiv.style.position = "absolute";
        timeOutErrDiv.style.zIndex = "9999";
         var alertMsgTitle = mainWin.getItemDesc("LBL_ALERT_MSG_E");
        var errtable = document.getElementById("ERRTBL").tBodies[0];
        var tobodyRows = errtable.rows;
        for(var cnt = 0; cnt <tobodyRows.length; cnt++)
        {
          tobodyRows[cnt].parentNode.removeChild(tobodyRows[cnt]);
        }
        timeOutErrDiv.style.width =  document.getElementById("timeOutErrWndtitle").offsetWidth + "px";
        setHorizontalPosition(timeOutErrDiv, false, ((mainWin.x/2) - ( ( document.getElementById("timeOutErrWndwidth").offsetWidth / 2) + 12)));
        timeOutErrDiv.style.top = parent.document.getElementById("masthead").offsetHeight + 4 + "px";
        var messageArr  = messageArr.split("__");
        var tableBody = document.getElementById("ERRTBL").tBodies[0];
         for (var i=0;i<messageArr.length;i++) {
            var rowElem = document.createElement("TR");
            var cell1 = document.createElement("TD");
            cell1.setAttribute("scope", "row");
            var cell1Data = "<em class='BTNicon' title='"+alertMsgTitle+"'><SPAN class='ICOAlert_E' tabIndex=0></SPAN></em><SPAN tabindex=\"0\"  class='SPNtbltwoC'>"+messageArr[i].split("~")[1]+"</SPAN>";
            cell1.innerHTML = cell1Data;
            rowElem.appendChild(cell1);
            var cell2 = document.createElement("TD");
            var cell2Data = "<SPAN tabindex=\"0\"  class='SPNtbltwoC' style='word-break: break-all;'>"+messageArr[i].split("~")[0]+"</SPAN>";
            cell2.innerHTML = cell2Data;
            rowElem.appendChild(cell2);
            tableBody.appendChild(rowElem);
    } 
    document.getElementById("BTN_OK").focus();
}

function closeTimeOutErrDiv(event){
    var timeOutErrDiv =  document.getElementById("timeOutAlertDiv");  
//REDWOOD_CHANGES
        if(timeOutErrDiv){
           if(document.getElementById('timeOutAlertDiv').isOpen()){
                    document.getElementById('timeOutAlertDiv').close();
            }	  
//REDWOOD_CHANGES
         timeOutErrDiv.style.display = "none";
         unmask();
}

}  //REDWOOD_CHANGES


function handleNetWorkErr(exp){
   unmask();
   var excepMess = mainWin.getCommonErrorList()["SM-NE001"].split("~")[0].split(",")[0];
   var expstack = "";
   if(debugWindowEnabled == "Y" || debugWindowEnabled == "y") {
      if(null != exp && typeof(exp.stack) != "undefined"){
        expstack = exp.stack;
      }
       if(null != exp && typeof(exp.message) != "undefined"){
        excepMess += "<br>" + exp.message;
      }
      excepMess += "<br>" +expstack;   
   }
   displayTimeOutErrDiv("SM-NE001~"+excepMess);
   throw exp;
}
//9NT1606_12_2_RETRO_12_0_3_21182929 changes end

function loadCustWindow(divObj, winObj) {
    if (divObj != null && divObj != "") {
        if (gNumCustWindows == -1) 
            gNumCustWindows = 0;
        arrCustWindows[gNumCustWindows] = divObj;
        gNumCustWindows++;
    }
}

function fnExit_Cust(winObj,seqNo) {/* Changes for Undefined Seq no*/
    iFrameObj = winObj.getElementsByTagName("IFRAME")[0];
    asyncPost(iFrameObj.contentWindow);  
        
    for (var i=0;i<arrCustWindows.length;i++) {
        if (arrCustWindows[i] == winObj) {
            arrCustWindows.splice(i,1);
            gNumCustWindows--;
        }
    }
    
    if (gNumCustWindows == 0) {
        gNumCustWindows = null;       
    }
}

//HTML5 Changes 6/OCT/2016 Start
function getNextLiElement(ele) {
    var parlemntchildrens = ele.parentNode.children;
    var lieleList = [];
    var j = 0;
    for (var i = 0;i < parlemntchildrens.length;i++) {
        if (parlemntchildrens[i].nodeName == "LI") {
            lieleList[j] = parlemntchildrens[i];
            j++;
        }
    }
    if (lieleList.length > 1) {
        for (i = 0;i < lieleList.length;i++) {
            if (lieleList[i] == ele) {
                if (i == lieleList.length - 1) {
                    return lieleList[0];
                } else {
                    return lieleList[i + 1];
                }
            }
        }
    } else { 
        return ele;
    }
}

function getPreviousLiElement(ele) {
    var parlemntchildrens = ele.parentNode.children;
    var lieleList = [];
    var j = 0;
    for (var i = 0;i < parlemntchildrens.length;i++) {
        if (parlemntchildrens[i].nodeName == "LI") {
            lieleList[j] = parlemntchildrens[i];
            j++;
        }
    }
    if (lieleList.length > 1) {
        for (i = 0;i < lieleList.length;i++) {
            if (lieleList[i] == ele) {
                if (i == 0) {
                    return lieleList[lieleList.length];
                } else {
                    return lieleList[i - 1];
                }
            }
        }
    } else { 
        return ele;
    }
}
//HTML5 Changes 6/OCT/2016 End

//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist start
function removeOption(list, currOptions) {
    for (var i=0;i<currOptions.length;i++) {
        if (!currOptions[i].getAttribute("hotkey")) {
            list.removeChild(currOptions[i]);
            break;
        }
    }
}

function fnSetDatalist_Old(functionId) {   //REDWOOD_CHANGES
    var dataList = document.getElementById("fpFuncIdList");
    var fnidExists = false;
    var menuXml = getmenuxml();
    if (menuXml.indexOf(functionId) == -1) {
        return;
    }
    if (dataList && dataList.options) {
        if (dataList.options.length == 15) {
            removeOption(dataList, dataList.options);
        }
        for (var i=0;i<dataList.options.length;i++) {
            if (dataList.options[i].value == functionId) {
                fnidExists = true;
                break;
            }
        }
    } else {
        if(!dataList) {
            var dlElem = document.createElement("DATALIST");
            dlElem.id = "fpFuncIdList";
            dlElem.setAttribute("id","fpFuncIdList");
            document.getElementById("fastpath").parentNode.appendChild(dlElem);
            dataList = document.getElementById("fpFuncIdList");
        }
    }
    if (!fnidExists) {
        var dlOption = document.createElement("OPTION");
        dlOption.setAttribute("value",functionId);
        setInnerText(dlOption,functionId);
        dataList.appendChild(dlOption);
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem(mainWin.UserId+"fpFnids")) {
                var fnids = localStorage.getItem(mainWin.UserId+"fpFnids");
                if (fnids.indexOf(functionId) == -1) {
                    fnids+= "~" + functionId;
                    localStorage.setItem(mainWin.UserId+"fpFnids", fnids);
                }
            } else {
                localStorage.setItem(mainWin.UserId+"fpFnids", functionId);
            }
        }
    }
}
/* Biometric Changes Start */
var custGlobalId;
var ws;
function fnStartWebSocket(){
 if(typeof(branchPlugin)!="undefined" && "Y"==branchPlugin){
        var host = document.location.host;

        var path = window.location.pathname.split("/");
        var pathname = "/"+path[1]+"/";
      
        ws = new WebSocket("wss://" +host  + pathname + "BioMetric/" + mainWin.UserId);
        ws.onmessage = function(event) {
        //var message = JSON.parse(event.data)
        var message = event.data;
        var luser = message.split("~")[0];
       if(luser == mainWin.UserId){
           var imgName = "img"+message.split("~")[1]+'img.jpg';
           //var imgName = "img"+message.custtomerId+'img.jpg';
            document.getElementById('custmer_image').src="\FCUBSSignatureServlet?X-CSRFTOKEN=" + CSRFtoken+"&fileName="+imgName + "&actionType=READ";
            
            document.getElementById('custId').value = message.split("~")[1];
            document.getElementById('cust_name').innerHTML=message.split("~")[2];
        /*
            document.getElementById('custId').value = message.customerId
            document.getElementById('cust_name').innerHTML=message.CustomerName;
          */     
            document.getElementById('blw').style.visibility ='visible';
           }
      }
      ws.onerror = function(event) {
        //alert('error occured');
      }
      ws.onclose = function(event) {
        //alert('closed');
      }
 }
}

function dispCustDetails(event) {
 if(typeof(branchPlugin)!="undefined" && "Y"==branchPlugin){
     custGlobalId =document.getElementById('custId').value;
     document.getElementById('blw').style.visibility ='hidden';
     showDBoardTabs("DBoardCustomer", event)
     
     var len = arrChildWindows.length;
    for (var loopIndex = 0; loopIndex < len; loopIndex++) {
        if (arrChildWindows[loopIndex]) {
            try {
                if (arrChildWindows[loopIndex].name) {
                    if (arrChildWindows[loopIndex].name == 'Lov_Window' || arrChildWindows[loopIndex].name == 'Editor_Window' || arrChildWindows[loopIndex].name == 'Cal_Window') {
                        arrChildWindows[loopIndex].close();
                        arrChildWindows.splice(loopIndex, 1);
                        
                    }
                } else {
                   addTab(arrChildWindows[loopIndex].id, arrChildWindows[loopIndex].children[0].title, event);
                }
            } catch(e) {
                //arrChildWindows.splice(loopIndex, 1);
            }
            //loopIndex--;
        }
    }
     
     
     
 }
    /* Biometric Changes End */
    // custGlobalId ='';
}


//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist end