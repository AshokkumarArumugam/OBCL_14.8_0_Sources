/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : Transaction.js
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
  **  Modified On          : 07-Oct-2016
  **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                               to user as alert and on click of Ok button on alert window, screen will be 
                               unmasked and user can try the action again.
  **  Retro Source         : 9NT1606_12_0_3_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
  
  **  Modified By          : Chandrashekar N
  **  Modified On          : 19-Apr-2023
  **  Modified Reason      : To support redwood framework .type attribute is replaced with .tagName attribure.
  **  Search String        : Bug#35277268
  
  **
**	Modified By          : Arunkumar R
** 	Modified on          : 20-Apr-2023
** 	Modified Reason      : Code changes for Script error occured from summary screens in Redwood
** 	Search String        : bug#35262971
**
**    Modified By          : Shayam Sundar Ragunathan
**    Modified On          : 28-Apr-2023
**    Modified Reason      : Changes done to populate arrProvider properly for select fields
**    Search String        : REDWOOD_35313329
**
**  Modified By          : Manoj S
**  Modified On          : 01-Jun-2023
**  Modified Reason      : Changes done to handle Enable/disable of Subscreen buttons.
**  Search String        : Redwood_35337126
**
**  Modified By          : Selvam Manickam
**  Modified On          : 12-Jun-2023
**  Modified Reason      : While loading screen all call forms are disbaled
**  Search String        : Redwood_35372207_1	
**
**  Modified By          : Manoj S
**  Modified On          : 23-Jun-2023
**  Modified Reason      : While perparing array provider field Name is replaced when DBC is null 
**  Search String        : REDWOOD_35512089
**
**  Modified By          : Manoj S
**  Modified On          : 19-July-2023
**  Modified Reason      : While perparing array provider field Name is replaced when DBC is null 
**  Search String        : Redwood_35337126
**
**  Modified By          : Girish M
**  Modified On          : 17-Nov-2023
**  Modified Reason      : Handled code to query data post load of screen from summary.
**  Search String        : REDWOOD_35850089
----------------------------------------------------------------------------------------------------
*/
/* Start of Variable declarations from XSL files */
var l_tmp_scr_type = null;
var gscrPos = null;
var auditControl={}; //REDWOOD_CHANGES
var l_OnlineAuditVals = new Array();
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
var LBL_CONSTAT_REDEEMED = mainWin.getItemDesc("LBL_CONSTAT_REDEEMED");
var LBL_CONSTAT_CLOSED_PARTIALLY = mainWin.getItemDesc("LBL_CONSTAT_CLOSED_PARTIALLY");
var LBL_CONSTAT_PROCESSED = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
var LBL_CONSTAT_SUGGESTED = mainWin.getItemDesc("LBL_CONSTAT_SUGGESTED");
var LBL_CONSTAT_RESIDUED = mainWin.getItemDesc("LBL_CONSTAT_RESIDUED");
var l_OnlineAuditDesc = new Array();
var l_OnlineProcessStatusVals = new Array();
var LBL_PROCESSTAT_PEND_AUTH = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_AUTH");
var LBL_PROCESSTAT_PEND_RELEASE = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_RELEASE");
var LBL_PROCESSTAT_PROCESSED = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
var LBL_PROCESSTAT_FAILED_VERIFICATION = mainWin.getItemDesc("LBL_PROCESSTAT_FAILED_VERIFICATION");
var LBL_PROCESSTAT_HOLD = mainWin.getItemDesc("LBL_PROCESSTAT_HOLD");
var LBL_PROCESSTAT_SUPPRESSED = mainWin.getItemDesc("LBL_PROCESSTAT_SUPPRESSED");
var LBL_PROCESSTAT_CANCELLED = mainWin.getItemDesc("LBL_CONSTAT_CANCELLED");
var l_OnlineProcessStatusDesc = new Array();
var l_OnlineAuditVals = new Array();
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
var l_OnlineAuditDesc = new Array();
var l_OnlineProcessStatusVals = new Array();
var LBL_PROCESSTAT_PEND_AUTH = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_AUTH");
var LBL_PROCESSTAT_PEND_RELEASE = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_RELEASE");
var LBL_PROCESSTAT_PROCESSED = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
var LBL_PROCESSTAT_FAILED_VERIFICATION = mainWin.getItemDesc("LBL_PROCESSTAT_FAILED_VERIFICATION");
var LBL_PROCESSTAT_HOLD = mainWin.getItemDesc("LBL_PROCESSTAT_HOLD");
var l_OnlineProcessStatusDesc = new Array(); /* End of Variable declarations from XSL files */
var StageComments;
//var dlgArg = dialogArguments;
var servletURL = "FCClientHandler";
var isExitTriggered = false;
var gIsAuditExist = true;
var temp_gActionHold = "";
var dbdomreq = new Array();
//Saidul Added For removing alerts:
var lblBranchStage = mainWin.getItemDesc("LBL_BRANCH_STAGE");
var lblModifyFailed = mainWin.getItemDesc("LBL_MODIFY_FAIL");
var lblProcessingFailed = mainWin.getItemDesc("LBL_PROCESSING_FAIL");
var scriptError = mainWin.getItemDesc("LBL_SCRIPT_ERROR"); //20932 to avoid Script error
var deleteFlag = "Y";
var holdFlag = "N";
var launchMsgScreen = false;
if (!mainWin.txnBranch[mainWin.CurrentBranch]) mainWin.txnBranch[mainWin.CurrentBranch] = new setTxnBrnInfo();
var g_txnBranch = mainWin.CurrentBranch;
var multiBrnScrOpened = false;
var ShowSummary = "FALSE";
var responseDOM_Modify = null;
//Performance Changes Starts
var inTime="";
//Performance Changes Ends
/*
 * Subsystem Declarations
 */
var subSysFunIDMapping = new Array();
subSysFunIDMapping['BRCETFRM'] = 'BRKDETAILS';
subSysFunIDMapping['CSCCNFDM'] = 'UDFDETAILS';
subSysFunIDMapping['ISCONDET'] = 'STTLMENT';
subSysFunIDMapping['ISCONDT1'] = 'STTLMENT';
subSysFunIDMapping['ISCMSDET'] = 'STTLMENT';
subSysFunIDMapping['TACETFRM'] = 'TAXDETAILS';
subSysFunIDMapping['CFCONCHG'] = 'CHGDETAILS';
subSysFunIDMapping['CFCINCHG'] = 'INTDETAILS';
subSysFunIDMapping['MICTXMIS'] = 'MISDETAILS';
subSysFunIDMapping['CFCHARGE'] = 'CHGDETAILS';
subSysFunIDMapping['MSDCGCLM'] = 'CHG_CLAIM';
subSysFunIDMapping['MSCHGENT'] = 'ADVDETAILS';
subSysFunIDMapping['CSCADVCE'] = 'ADVDETAILS';
subSysFunIDMapping['CFCOMONL'] = 'ICCF';
subSysFunIDMapping['LCCONCOL'] = 'COLLATERAL';
subSysFunIDMapping['BCCARFFT'] = 'ADVDETAILS';
subSysFunIDMapping['CSCSPLIT'] = 'SPLITDETAILS';
subSysFunIDMapping['BCCLPREF'] = 'BCLDPREF';
subSysFunIDMapping['SVCJRSIG'] = 'SIGNDETAILS';
subSysFunIDMapping['TACONTAX'] = 'TAXDETAILS';
subSysFunIDMapping['DVCSCADV'] = 'ADVDETAILS';
subSysFunIDMapping['TACONTAX'] = 'TAXDETAILS';
subSysFunIDMapping['DVCPRDET'] = 'PRNDETAILS';
subSysFunIDMapping['DVCINTDT'] = 'PRNDETAILS';
subSysFunIDMapping['OTCINTDT'] = 'PRNDETAILS';
subSysFunIDMapping['CFCPDCHG'] = 'CHGDETAILS';
/*Fix for 15854381 changes starts*/
subSysFunIDMapping['ISCINCHG'] = 'INTDETAILS'; 
/*Fix for 15854381 changes ends*/	  
//REDWOOD_CHANGES
var tempArrayDataProvider;
var pagingDataProviderView;
var selectControl={};
var selectArrayProvider={};
var multipleEntryFieldList=[];
var meArrayForAddDelete = {};
var showTable;
var recordsPerPageDataProvider;
var recordsPerPage;
var ojconverter_number; 
//REDWOOD_CHANGES

function resetIndex() {
    try {
        for (var dataSrcIndex = 0; dataSrcIndex < dataSrcLocationArray.length; dataSrcIndex++) {
            dbIndexArray[dataSrcLocationArray[dataSrcIndex]] = 1;
        }
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * Inform Main Window that this child window is closed
 * Called from Launcher.jsp during onbeforeunload event.
 */
function fnBeforeUnload() {
    try {
        var retVal = false;
        if (gAction != "") {
            appendErrorCode('ST-COM012', "");
            var message = buildMessage(gErrCodes).split("~");
            event.returnValue = message[0];
        }
        if (dlgArg.ShowSummary && dlgArg.ShowSummary == "TRUE") {
            if (!dlgArg.sourceWin.closed) {
                if (dlgArg.sourceWin.lastRequestTS == dlgArg.lastRequestTS) {
                    dlgArg.sourceWin.refresh();
                }
            }
        }
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * Called from Launcher.jsp during onUnload event.
 */
function fnUnload() {
    try {
        debugs("Closing the window", "");
        if (gAction != "") {
            fnDirectClose();
        }
        if (!isExitTriggered) {
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar("", "", "");
            dlgArg.mainWin.fnExit(window);
        }
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * Called from Launcher.jsp during onFocus event.
 * Inform main window that this Child Window is the active window
 * This will allow Main Window to call this window's action,
 * navigation functions when User clicks Toolbar
 */
function fnFocus() {
    try {
        mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);
        //Added for function numeric
        if (userFuncId != '' && userFuncId != 'null') {
            mainWin.document.getElementById("fastpath").value = userFuncId;
        } else {
            mainWin.document.getElementById("fastpath").value = functionId;
        }
		
        /*Fix for 18180616 Starts*/
        //Fix for bug: 18556654 starts 
        /*if(document.getElementById("masker")!= null && document.getElementById("masker").offsetHeight != 0){    
          showToolbar("", "", "");
          return false;
        }*/
        /*Fix for 18180616 Ends*/
        //if (gAction == "VIEWMNTLOG" || gAction == "ENTERQUERY" || unmaskTitle) 
        //Commented for 12.0.2 as toolbar ia not shown after calform launch
       //Fix for bug: 18556654 ends
      if (gAction == "VIEWMNTLOG" || gAction == "ENTERQUERY" ) 
			showToolbar("", "", "");
        else 
			showToolbar(functionId, "", "");
    } catch (e) {
        alert(scriptError);
    }
    try {
        fnPostFocus();
    } catch (e) {}
}
/**
 * Called from Launcher.jsp during onLoad of body.
 */
function fnLoad(xmlFileName, xslFileName, screenName) {
    //Performance Changes Starts
    var t = getDateObject();
    var sjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes Ends
    try {
        fnPreLoad();
    } catch (e) {
        debugs("Failed in fnPreLoad", "");
    }
    var funcId = xmlFileName.substring(xmlFileName.lastIndexOf("/") + 1, xmlFileName.lastIndexOf(".xml"));
    debugs("FunctionId~xmlFileName~xslFileName", functionId + "~" + funcId + "~" + xslFileName);
    try {
        var html = ShowXML(xmlFileName, screenName, xslFileName);
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes
            document.getElementById("ResTree").insertAdjacentHTML("beforeEnd", html);
        } else {
            document.getElementById("ResTree").appendChild(html);
        }	
//REDWOOD_CHANGES
       if (getBrowser().indexOf("FIREFOX") != -1) {
        document.getElementById("ResTree").querySelectorAll('template').forEach((elem) => elem.remove());
        document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
    }else{
         document.getElementById("ResTree").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
    }
    document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
        fnBindScreenElements();	 
//REDWOOD_CHANGES
    } catch (e) {
        debugs("Failed in ShowXML", "");
    }
    document.getElementById("toolbar").style.display = "flex"; //REDWOOD_CHANGES
   
    if ((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes,Fix for 21355639
        try {
            var scriptElements = document.getElementsByTagName("script");
            for (var i = 0; i < scriptElements.length; ++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));  
                    fnEval();
                }
            }
        } catch (e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 start*/
    else if(getBrowser().indexOf("IE") != -1){ //ie11 changes
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
    debugs("Inner Html", html);
    fnTabDetails();
    if (document.getElementById("DIV_BLK_AUDIT") == null || document.getElementById("DIV_BLK_AUDIT") == "null") {
        gIsAuditExist = false;
    }
//REDWOOD_CHANGES
   // fnSetScreenSize();//static header change
   // fnBuildMultipleEntryArray();
    setTimeout(function() {
		disableForm();
	    //Redwood_35372207_1 start	
	    fnEnableSubSysButtons();
	    //Redwood_35372207_1 end
	},0); 
//REDWOOD_CHANGES
    if (strCurrentTabID != 'All' && strCurrentTabID != "") {
        debugs("calling expandcontent", "");
        if (document.getElementById(strCurrentTabID)) expandcontent("TBLPage" + strCurrentTabID, document.getElementById(strCurrentTabID));
    }
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
	//jc2 changes
	if (typeof (screenType) != "undefined" && screenType == "WB"){
	if( typeof(mainWin.branchAvlbltyStatus) == "undefined" || mainWin.branchAvlbltyStatus == null || mainWin.branchAvlbltyStatus=="" )//jc2 changes
	  mainWin.branchAvlbltyStatus  = 'Y';
	}
	  //jc2 changes end
	//changes_for_24x7
	if ((mainWin.branchAvlbltyStatus != 'Y') && (mainWin.eodFunctions.indexOf(functionId) > 0) && l_offlineAllowed == 'Y')//jc2 24*7 changes
        document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML  = document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML + ": " + eodDesc;
		//changes_for_24x7
    showToolbar(functionId, "", "");
   // fnEnableElement(document.getElementById("BTN_EXIT_IMG")); //REDWOOD_CHANGES
    if (parentSeqNo != "") {
        var parentWin = "";
        for (var i = 0; i < mainWin.arrChildWindows.length; i++) {
            if (mainWin.arrChildWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
                break;
            }
        }
        if (parentWin.detailWinParams && parentWin.detailWinParams.ShowSummary && parentWin.detailWinParams.ShowSummary == "TRUE") {
            debugs("Loading from sumamry", "");
            try {
                posttime = parentWin.detailWinParams.posttime;
                afterposttime = parentWin.detailWinParams.afterposttime;
                ShowSummary = "TRUE";
                setTimeout( function(){ //REDWOOD_35850089 
                fnExecuteQuery(null, parentWin);
                },10); //REDWOOD_35850089
                parentWin.detailWinParams.posttime = "";
                parentWin.detailWinParams.afterposttime = "";
                inLoadTime = parentWin.detailWinParams.inDate;
                parentWin.detailWinParams.inDate = "";
                
            } catch (e) {
                debugs("Failed in fnExecuteQuery", "");
            }
        }
    }
    if (screenType == 'P' || screenType == 'T') {
        try {
            fnBPELLoad();
        } catch (e) {
            debugs("Failed in fnBPELLoad", "");
        }
    }
    mainWin.fnSetDatalist(functionId);//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist
    try {
        fnPostLoad();
        debugs("In fnPostLoad", "");
    } catch (e) {
        debugs("Failed in fnPostLoad", "");
    }
    if (dashboardSeqNo != "" && dashboardSeqNo != "null") {
        var dashboardWin = parent.document.getElementById(dashboardSeqNo).children[0].contentWindow;
        if (dashboardWin.detailWinParams) {
            mask();
            //gAction ="ENTERQUERY";
            fnEnterQuery();
            fnSetPkvals(dashboardWin.detailWinParams.DetailPkVals);
            gAction = 'EXECUTEQUERY';
            fnExecuteQuery();
        }
    }
    setTimeout(function() {//Sudipta //REDWOOD_CHANGES
    fnCalcHgt();
		if(document.getElementById("BTN_EXIT_IMG")){////Redwood_35337126 starts
			document.getElementById("BTN_EXIT_IMG").focus();
		}////Redwood_35337126 Ends
 
    },0);//REDWOOD_CHANGES
   //Performance Changes
   /* if (mainWin.mBean_required == "Y") {
      var dbtime=0;
      var databaseSessionID = "";
      var loginSeqNo = mainWin.SignonSerial;
      var servertime=clientHandlerExit-clientHandlerEntry;
      var actionSeqno = actionseqNo;
      t = getDateObject();
      time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
      var jstime           = parseFloat(parseFloat(time)-parseFloat(sjsTime)); 
      jstime=Math.round(jstime*100)/100;  
      totaltime = parseFloat(parseFloat(t.getTime())-parseFloat(inLoadTime));
      startDate = new Date(parseFloat(inLoadTime));
      startTime = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+startDate.getDate()+" "+startDate.getHours()+':'+startDate.getMinutes()+':'+startDate.getSeconds();
      endTime = t.getFullYear()+'-'+t.getMonth()+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
      if (ShowSummary == "TRUE") {
          var executeQueryTime = mainWin.loadTimeArray[parentSeqNo];
          jstime = parseFloat(parseFloat(jstime) + parseFloat(executeQueryTime.split("~")[0]));
          dbtime = Math.round(parseFloat(parseFloat(dbtime) + parseFloat(executeQueryTime.split("~")[1])) * 100) / 100;
          servertime = Math.round(parseFloat(parseFloat(servertime) + parseFloat(executeQueryTime.split("~")[2])) * 100) / 100;
          databaseSessionID = executeQueryTime.split("~")[5];
          loginSeqNo = executeQueryTime.split("~")[6];
          actionSeqno = executeQueryTime.split("~")[7];
          mainWin.loadTimeArray[seqNo] = 0;
    }
      //fnPostActionLog(jstime,dbtime,servertime,startTime, endTime, totaltime,"","","",actionSeqno,databaseSessionID,loginSeqNo,seqNo,"LOAD"); 
      //fnPopulateTimes(loginSeqNo,seqNo,actionSeqno,jstime,dbtime,servertime,startTime,endTime,totaltime);
      
    }*/
    //Performance Changes
    setActionTime(inTime, functionId, 'LOAD'); //Non Extensible Mbean Changes
	
   // document.getElementById("BTN_EXIT_IMG").focus(); Sudipta	  //REDWOOD_CHANGES
    
    /*if(mainWin.DebugWindowFlg == "Y") {            
        if(ShowSummary == 'TRUE'){
            mainWin.serverDebugStmt = webDbg + "\n\n" + mainWin.serverDebugStmt;
        }else{
            mainWin.serverDebugStmt = webDbg + "\n\n"+ appDbg+"\n\n"+dbDbg;
        }
    }debug revert*/
}

function fnNew() {
    if(navigator.appName=="Opera"){
        if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && multiBrnScrOpened == false) {
            fnOpenTxnBrnScreen();
            processingAction = "New";
            if (!fnPreNew())  {
                debugs("Failed in fnPreNew", "");
                return;
            }
        }
    }else{
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && multiBrnScrOpened == false) {
        fnOpenTxnBrnScreen();
        return;
    }
    processingAction = "New";
    if (!fnPreNew()) {
        debugs("Failed in fnPreNew", "");
        return;
        }
    }
    try {
        createDOM(dbStrRootTableName);
    } catch (e) {
        debugs("Failed in Creating DOM ", "");
    }
    debugs("Resetting and enabling the form for new action", "");
    resetElements();
    debugs("Clearing MultipleEntryBlocks", "");
    fnClearMultipleEntryBlocks();
    enableForm();
    // KGS: fn_maintenance_stamp is applicable only for maintenance screens.
    if (gIsAuditExist) {
        if (document.getElementsByName("MOD_NO")[0]) {
            fn_maintenance_stamp('', 'N');
        } else {
            fn_transaction_stamp('N');
        }
    }
    showToolbar(functionId, '', '');
    fnSetExitButton(true);
    if (gIsAuditExist) {
        if (document.getElementsByName("AUTHSTAT")[0]) {
            fnDisableElement(document.getElementsByName("AUTHSTAT")[0]);
            if (document.getElementsByName("RECORD_STAT")[0]) fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
            if (document.getElementsByName("ONCE_AUTH")[0]) fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
        } else {
            if (document.getElementsByName("AUTH_STATUS")[0]) fnDisableElement(document.getElementsByName("AUTH_STATUS")[0]);
        }
    }
	setTimeout(function(){//Redwood_35337126
		fnSetFocusOnMasterPKField();
	},0);//Redwood_35337126
    try {
        fnPostNew();
    } catch (e) {
        debugs("Failed in fnPostNew", "");
    }
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
            document.getElementById(txnBranchFld).value = g_txnBranch;
        }
    }
    //FCUBS10ITR1 -- SFR 964 START
    temp_gActionHold = gAction;
    //FCUBS10ITR1 -- SFR 964 END
}
/**
 * Function called when Unlock/Edit is clicked
 */
function fnUnlock() {
    inDate = setActionTime();//Performance Changes
    processingAction = "Unlock";
    try {
        if (!fnPreUnlock()) {
            debugs("Failed in fnPreUnlock", "");
            return;
        }
        var value = fnGetPKInfo();
        if (!fnValidateOperation()) {
            debugs("Failed in fnValidateOperation", "");
            fnSetExitButton(false);
            return;
        }
        gAction = "UNLOCK";
        try {
            fcjRequestDOM = buildUBSXml();
            debugs("fcjRequestDOM", getXMLString(fcjRequestDOM));
        } catch (e) {
            debugs("failed in buildUBSXml", "");
        }
        //selectNodes(fcjRequestDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ").removeAll();
        var removeNode = selectNodes(fcjRequestDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
        for (var i = 0; i < removeNode.length; i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        var tempParent = selectSingleNode(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT ='']").getAttribute("TYPE");
        //selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + tempParent + "']").removeAll();
        var removeNode = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + tempParent + "']");
        for (var i = 0; i < removeNode.length; i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("failed in fnPost", "");
        }
        gAction = "MODIFY";
        temp_gActionHold = gAction;
        //fnEnableAmendFields();
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar(l_FncId, '', '');
        fnSetExitButton(true);
        enableForm();
        if (gIsAuditExist) {
            // KGS: fn_maintenance_stamp is applicable only for maintenance screens.
            if (document.getElementsByName("MOD_NO")[0]) {
                fn_maintenance_stamp('', 'M');
                appendData(document.getElementById("DIV_BLK_AUDIT"));
            } else {
                fn_transaction_stamp('M');
            }
        }
        fnDisablePKFields();
        try {
            fnPostUnlock();
        } catch (e) {
            debugs("Failed in fnPostUnlock", "");
        }
        //fnEnableChkAll();
        fnSetAudtDesc();
        //fnpostAction('UNLOCK');
    } catch (e) {
        alert(scriptError);
    }
}
/** 
    This method is called by fnExit() if the gAction is "MODIFY" ,
    the lock is released on the record.
    A message is posted to the server and the lock released.  
*/
function releaseLock() {
    inDate = setActionTime();//Performance Changes
    processingAction = "ReleaseLock";
    gAction = "RELEASELOCK";
    try {
        //fcjRequestDOM = buildRelaseLockXML();
        fcjRequestDOM = buildUBSXml();
        debugs("fcjRequestDOM", fcjRequestDOM);
    } catch (e) {
        debugs("failed in buildRelaseLockXML", "");
    }
    //remove the child records before posting it to the server
    //selectNodes(fcjRequestDOM, "//FCJMSG/MSG/FLD/FN[@PARENT != ''] ").removeAll();
    //var removeNode = selectNodes(fcjRequestDOM, "//FCJMSG/MSG/FLD/FN[@PARENT != ''] ");
    var removeNode = selectNodes(fcjRequestDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
    for (var i = 0; i < removeNode.length; i++) {
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }
    //var tempParent = selectSingleNode(fcjRequestDOM, "//FCJMSG/MSG/FLD/FN[@PARENT ='']").getAttribute("TYPE");
    //selectNodes(fcjRequestDOM, "//FCJMSG/MSG/REC/REC[@TYPE !='" + tempParent + "']").removeAll();
    //var removeNode = selectNodes(fcjRequestDOM, "//FCJMSG/MSG/REC/REC[@TYPE !='" + tempParent + "']");
    var tempParent = selectSingleNode(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT ='']").getAttribute("TYPE");
    var removeNode = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + tempParent + "']");
    for (var i = 0; i < removeNode.length; i++) {
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }
    try {
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    } catch (e) {
        debugs("failed in fnPost", "");
    }
    if (fcjResponseDOM) {
        //var msgStatus = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
        //var messageNode = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/RESPONSE");
        var l_MsgStatNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
        var msgStatus = getNodeText(l_MsgStatNode);
        debugs("Msgstatus ", msgStatus);
        //fnpostAction('RELEASELOCK');
        if (msgStatus == 'SUCCESS') {
            processingAction = "Save";
            debugs("Lock released", "");
            gAction = "";
            return true;
        } else {
            debugs("Please check ...Lock not released!!", "");
            //var returnVal = displayResponse_auth(messageNode);
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            displayResponse(messageNode, msgStatus);
            return false;
        }
    }
}
/**
 * Function called when Authorize action is performed
 */
function fnAuthorize() {
    inDate = setActionTime();//Performance Changes
    processingAction = "Authorize";
    forOnlineAuth = true;
    try {
        // Pre action code
        if (!fnPreAuthorize()) {
            debugs("Failed in fnPreAuthorize", "");
            return;
        }
        gAction = "AUTHQUERY";
        temp_gActionHold = gAction;
        if (!fnValidateOperation()) {
            fnSetExitButton(false);
            debugs("Failed in fnValidateOperation", "");
            return;
        }
        screenArgs = new Array();
        screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
        var funcId = "";
        if (uiXML == "") {
            funcId = functionId;
        } else {
            funcId = uiXML;
        }
        var userLanguageCode = mainWin.LangCode;
        funcId = funcId.substring(0, funcId.length - 2) + 'AU';
        screenArgs['FUNCTION_ID'] = funcId;
        // screenArgs['DESCRIPTION'] = 'Details';
        screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + userLanguageCode + '/' + funcId + '.xml', screenArgs['SCREEN_NAME']);
        screenArgs['LANG'] = userLanguageCode;
        screenArgs['UI_XML'] = 'CVS_MAIN';
        screenArgs['PARENT_FUNC_ID'] = functionId;
        screenArgs['parentWin'] = window;
        fnShowCallForm(screenArgs);
    } catch (e) {
        alert(scriptError);
    }
}
/**
 *  Function called when Copy button is clicked
 */
function fnCopy() {
    inDate = setActionTime();//Performance Changes
    processingAction = "Copy";
    try {
        if (!fnPreCopy()) {
            debugs("Failed in fnPreCopy", "");
            return;
        }
        var pureXML;
        pureXML = getCurrentRecord();
        setDataXML(getXMLString(pureXML));
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        gAction = 'COPY';
        temp_gActionHold = gAction;
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            //fnpostAction('COPY');
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            if (msgStatus == 'FAILURE' || msgStatus == "WARNING") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                //var returnVal = displayResponse(messageNode);
                displayResponse(messageNode);
                gAction = "";
            } else if (msgStatus == "SUCCESS") {
                fnDeleteChildTables();
                fnClearAuditFields();
                //fnChangeLabelToText("TEXTAREA");
                enableForm();
                if (gIsAuditExist) {
                    if (document.getElementsByName("MOD_NO")[0]) {
                        fn_maintenance_stamp('', 'C');
                    } else {
                        fn_transaction_stamp('C');
                    }
                }
                
                showToolbar(functionId, '', '');
                fnSetExitButton(true);
                if (gIsAuditExist) {
                    if (document.getElementsByName("ONCE_AUTH")[0]) fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
                }
                gAction = 'NEW';
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                fnSetAudtDesc();
            }
        }
        try {
            fnPostCopy();
        } catch (e) {
            debugs("Failed in fnPreCopy", "");
        }
    } catch (e) {
        alert(scriptError);
    }
    showToolbar(functionId, '', '');
}
/**
 * Function called when Close Action performed
 */
function fnClose() {
    inDate = setActionTime();
    processingAction = "Close";
    alertAction = "CLOSEACTION";
    try {
        if (!fnPreClose()) {
            debugs("Failed in fnPreClose", "");
            return;
        }
        if (!fnValidateOperation()) {
            debugs("Failed in fnValidateOperation", "");
            return;
        }
        //appendErrorCode('FC-MAINT13', null);
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CLOSE_DESC")), "C");
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * Function called when Reopen Action is performed
 */
function fnReopen() {
    inDate = setActionTime();
    processingAction = "Reopen";
    alertAction = "REOPENACTION";
    try {
        if (!fnPreReOpen()) {
            debugs("Failed in fnPreReOpen", "");
            return;
        }
        if (!fnValidateOperation()) {
            debugs("Failed in fnValidateOperation", "");
            return;
        }
        //appendErrorCode('FC-MAINT14', null);
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_REOPEN_DESC")), "C");
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * Function called when Delete Action performed
 */
function fnDelete() {
    inDate = setActionTime();
    processingAction = "Delete";
    alertAction = "DELETEACTION";
    try {
        if (!fnPreDelete()) {
            debugs("Failed in fnPreDelete", "");
            return;
        }
        if (!fnValidateOperation()) {
            debugs("Failed in fnValidateOperation", "");
            return;
        }
        //appendErrorCode('FC-MAINT17', null);
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_DELETE_DESC")), "C");
    } catch (e) {
        alert(scriptError);
    }
}
/**
   Called for allowing to enter Query Criteria
**/
function fnEnterQuery() {
    try {
        if (!fnPreEnterQuery()) {
            gAction = "";
            debugs("Failed in fnPreEnterQuery", "");
            return;
        }
        resetDOM();
        resetElements();
        fnClearMultipleEntryBlocks();
        fnEnablePKOnlyFields();
        fnDisableSubSysButtons();
        fnSetExitButton(true);
        //changeTabPageToFirstTab();
        if (gIsAuditExist) {
            if (document.getElementsByName("AUTHSTAT")[0]) {
                if (document.getElementsByName("ONCE_AUTH")[0]) fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
                fnEnableElement(document.getElementsByName("MAKERID")[0]);
            } else {
                if (document.getElementsByName("AUTH_STATUS")[0]) fnDisableElement(document.getElementsByName("AUTH_STATUS")[0]);
            }
        }
        dbAuthFlag = false;
        dbRecFlag = false;
        /*toolbarActions();

        mainWin.document.getElementById("Save").disabled = true;*/
        //dlgArg.mainWin.frames["FrameMenu"].document.getElementById("actions8").disabled = true;
        try {
            fnPostEnterQuery();
        } catch (e) {
            gAction = "";
            debugs("Failed in  fnPostEnterQuery", "");
            return;
        }
        if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
            if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
                if (document.getElementById(txnBranchFld).className != "hidden") {
                    for (var j = 0; j < pkFields.length; j++) {
                        if (pkFields[j] == txnBranchFld) {
                            fnEnableElement(document.getElementById(txnBranchFld));
                            document.getElementById(txnBranchFld).value = g_txnBranch;
                            break;
                        }
                    }
                }
            }
        }
		setTimeout(function(){//Redwood_35337126
        fnSetFocusOnMasterPKField(); /*var l_FncId = mainWin.document.getElementById("fastpath").value;*/
		},0);//Redwood_35337126
        showToolbar('', '', '');
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * Called when Execute Query Action performed
 */
// TODO  THE CODE RELATED TO SUMMARY WILL BE DONE WHEN WE HANDLE SUMMARY SCREENS
function fnExecuteQuery(reqDOM, parentWin) {
    try {
        window.focus();
        inDate = setActionTime(); //Performance Changes
        var l_isFrmSum = false;
        if (typeof (parentWin) != 'undefined') {
            if (parentWin.detailWinParams.ShowSummary && parentWin.detailWinParams.ShowSummary == "TRUE") l_isFrmSum = true;
        }
        if (!fnPreExecuteQuery()) {
            gAction = "";
            debugs("Failed in fnPreExecuteQuery", "");
            return;
        }
        if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y") {
            if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
                g_txnBranch = document.getElementById(txnBranchFld).value;
            }
        }
        // Dont build the Request if its frm the summary 
        if (l_isFrmSum != true) {
            if (reqDOM == null) {
                fcjRequestDOM = buildUBSXml();
            } else {
                fcjRequestDOM = reqDOM;
            }
        } else resetDOM();
        intCurrentQueryResultIndex = 0;
        intCurrentQueryRecordCount = 0;
        if (l_isFrmSum != true) {
            debugs("calling fnPost", "");
            try {
                if(ShowSummary =="TRUE"){
                    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL+"?fromSummary="+ShowSummary, functionId);
                }else{
                    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
                }
                //fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            } catch (e) {
                debugs("Failed in fnpost", "");
            }
        }
        if (l_isFrmSum == true) {
            fcjResponseDOM = parentWin.detailWinParams.response;
        }
        var postExecQry = false;//21547370
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("msgStatus=", msgStatus);
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
            if (msgStatus != 'SUCCESS') {
                //var returnVal = displayResponse(messageNode);              
                displayResponse(messageNode);
                gAction = "ENTERQUERY";
            } else {
                var objQueryRecords = selectNodes(fcjResponseDOM, "//FCUBS_BODY/REC");
                if (objQueryRecords.length == 0) {
                    /*
                    debugs("Success with out any record", "");
                    appendErrorCode('ST-COM036', null);
                    var msg = buildMessage(gErrCodes);
                    alertMessage(msg);
*/
                    mask();
                    showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
                    alertAction = "UNMASK";
                    disableForm();
                    fnEnableSubSysButtons();
                } else {
                    intCurrentQueryRecordCount = objQueryRecords.length;
                    goToRec(1);
                    viewModeAction = true;
                    disableForm();
                    viewModeAction = false;
                    fnEnableSubSysButtons();
                    debugs("calling fnPostExecuteQuery", "");
                    postExecQry = true; //21547370
                    //fnPostExecuteQuery();  //21547370
                    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
                        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
                            if (document.getElementById(txnBranchFld).value != "") {
                                g_txnBranch = document.getElementById(txnBranchFld).value;
                                fnUpdateTxnBrnVariables(g_txnBranch);
                            } else {
                                g_txnBranch = mainWin.CurrentBranch; //Changes for 11.4 ITR1 SFR# 13081633
                            }
                            var scrTitle = document.title + " - " + mainWin.getItemDesc("LBL_TXN_BRANCH") + " ::: " + g_txnBranch;
                            setInnerText(document.getElementsByTagName("H1")[0], scrTitle);
                        }
                    }
                    if (document.getElementById("Goto_version")) fnEnableGOTOVersionButton();
                    gAction = "";
                }
            }
            fnSetExitButton(false);
            if (gIsAuditExist) {
                if (document.getElementsByName("AUTHSTAT")[0]) {
                    fnDisableElement(document.getElementsByName("AUTHSTAT")[0]);
                    if (document.getElementsByName("RECORD_STAT")[0]) fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
                    if (document.getElementsByName("ONCE_AUTH")[0]) fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
                } else {
                    if (document.getElementsByName("AUTH_STATUS")[0]) fnDisableElement(document.getElementsByName("AUTH_STATUS")[0]);
                }
            }
        }
       // ShowSummary = "FALSE";
        try{
        showToolbar(functionId, '', '');
        }catch(e){}
        window.focus();
        fnSetAudtDesc();
        //fnEnableBlockCheckBox(); //REDWOOD_CHANGES
        fnDisableMultipleAddDel();
        if(postExecQry) //21547370
            fnPostExecuteQuery();
        setActionTime(inTime, functionId, 'EXECUTEQUERY');
       //Performance Changes
       
        /*if(ShowSummary == "FALSE" && mainWin.mBean_required == "Y") {
            fnpostAction('EXECUTEQUERY');
        }*/
        //Performance Changes
        
        // appendDebug(fcjResponseDOM); //Logging changes
        
    } catch (e) {
        alert(scriptError);
    }
}

function show_remarks() {
    try {
        var dlgLeft = 100;
        var dlgTop = 50;
        var dlgArg = new Object();
        dlgArg.curWin = window;
        w = window.showModalDialog("Remarks.jsp", dlgArg, "center:yes; dialogHeight:160px; dialogWidth:400px; help:no; resizable:no; scroll:no; status:no;");
    } catch (e) {
        alert(scriptError);
    }
}

function fnSave(e) { /*Changes for lov issue on SAVE*/
    if (gIsValid == false) return;
    if (isLovOpen) {
        return false;
    }
    inDate = setActionTime();//Performance Changes
    processingAction = "Save";
    try {
        //if (!mainWin.isSessionActive()) return; session expiry change  
        window.focus();
        debugs("Validating the fields before save", "");
        if (gIsAuditExist) {
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        if (typeof (l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") appendData(document.getElementById("TBLPage" + l_HeaderTabId));
		//Fix for 16999792 start
      var dbDataStr = getXMLString(dbDataDOM);
      if((dbDataStr.indexOf('^') != -1) || (dbDataStr.indexOf('~') != -1))
        {
            isResponseProcessed = true; //21301992
            mask();
            showAlerts(fnBuildAlertXML('FC-MAINT03', 'I'), 'I');
            alertAction = "UNMASK";
            return false;
        }
        //Fix for 16999792 end
        /*if(typeof(gProcessName) != "undefined" && trim(gProcessName) != ""){
            if(txnXmlDOM != null && txnXmlDOM.xml != ""){
              gOperation = txnXmlDOM.selectSingleNode("//fcubs:txnIdentification/fcubs:operation").text;
            }
        }*/
        if (!fnPreSave()) {
            debugs("Failed in fnPreSave", "");
            return;
        }
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        var temp_gAction = '';
        temp_gActionHold = gAction;
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode = "";
            var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
            if (msgStatus == 'FAILURE') {
                l_xPath += "FCUBS_ERROR_RESP";
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                l_xPath += "FCUBS_WARNING_RESP";
            }
            messageNode = selectSingleNode(fcjResponseDOM, l_xPath);
            if (msgStatus == 'SUCCESS') {
                debugs("Msgstatus", msgStatus);
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                var l_LockRelStatus = true;
                if (gAction == 'MODIFY') {
                    l_LockRelStatus = releaseLock();
                }
                viewModeAction = true;
                disableForm();
                viewModeAction = false;
                fnSetExitButton(false);
                gAction = "";
                //fnpostAction('SAVE');
            } else if (msgStatus == 'WARNING') {
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
            }
            if (msgStatus == 'FAILURE') {
                displayResponse(messageNode);
                //fnpostAction('SAVE');
                return;
            }
            //var returnVal = displayResponse(messageNode, msgStatus);
            displayResponse(messageNode, msgStatus);
        } else {
            //alert("Processing Has Failed");
            //fnpostAction('SAVE');
            alert(lblProcessingFailed);
            return;
        }
    } catch (e) {
        alert(scriptError);
    }
}
/*
 * Method to hold 
 */
function fnHold() {
    processingAction = "Hold";
    inDate = setActionTime();//Performance Changes
    debugs(" Just started", "");
    try {
        try {
            fnPreHold();
        } catch (e) {}
        gAction = "HOLD";
        if (gIsAuditExist) {
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        // Build Request XML
        try {
            fcjRequestDOM = buildUBSXml();
        } catch (e) {
            debugs("Failed in buildUBSXml", "");
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("Failed in fnpost", "");
        }
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("Msgstatus", msgStatus);
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
            if (msgStatus == 'SUCCESS') {
                disableForm();
                document.getElementById("BTN_EXIT_IMG").src = cache1.src;
                fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
                showToolbar(functionId, '', '');
                gAction = "";
                fnSetExitButton(false);
            } else {
                gAction = temp_gActionHold;
                fnSetExitButton(true);
                showToolbar(functionId, '', '');
            }
            //var returnVal = displayResponse(messageNode);
            displayResponse(messageNode);
            //release lock Anam added
            if (temp_gActionHold == 'MODIFY' && msgStatus == 'SUCCESS') {
                releaseLock();
                fnSetExitButton(false);
            }
        }
        showToolbar(functionId, '', ''); //PATCH     
        try {
            fnPostHold();
            //fnpostAction('HOLD');//Performance Changes
        } catch (e) {}
    } catch (e) {
        alert(scriptError);
    }
}
/*
 * Method to reverse
 */
function fnReverse() {
    inDate = setActionTime();
    processingAction = "Reverse";
    alertAction = "REVERSEACTION";
    try {
        debugs("Just strated", "");
        gAction = "REVERSE";
        try {
            //eval('fnPreReverse()');
            var fnEval = new Function('fnPreReverse()');  
            fnEval();
        } catch (e) {}
        //FCUBS10ITR1 -- SFR 1018 START
        //appendErrorCode('FC-MAINT18', null);
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_REVERSE_DESC")), "C");
        //FCUBS10ITR1 -- SFR 1018 END
    } catch (e) {
        alert(scriptError);
    }
}

function displayException(exceptionsNode) {
    try {
        var message = "";
        var returnVal = false;
        var messageNodes = selectNodes(exceptionsNode, "./fcubs:error");
        var msg = "";
        var errCode = "";
        var type = "";
        //Check for firstNode is null or not given by Sankarganesh 16/03/05
        //if(firstNode){
        if (messageNodes) {
            for (var index = 0; index < messageNodes.length; index++) {
                msg = getNodeText(selectSingleNode(messageNodes[index], "./fcubs:edesc"));
                errCode = getNodeText(selectSingleNode(messageNodes[index], "./fcubs:ecode"));
                type = "I";
                message = message + errCode + " " + msg + "~";
            }
            returnVal = ShowErrorDialog(type, message);
        } else {
            /*appendErrorCode('ST-COM021', null);
            var msg = buildMessage(gErrCodes);
            alertMessage(msg);
            */
            mask();
            showAlerts(fnBuildAlertXML('ST-COM021', 'E'), 'E');
            alertAction = "UNMASK";
            returnVal = false;
        }
        return returnVal;
    } catch (e) {
        alert(scriptError);
    }
}

function fnSaveTxnXml() {
    try {
        var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
        fcjRequestDOM.setProperty("SelectionNamespaces", ns);
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            fcjResponseDOM.setProperty("SelectionNamespaces", ns);
            // if the response has a txn id....then load the payload into txnXmlDOM (variable in launcher)
            if (txnXmlDOM == null) {
                try {
                    txnXmlDOM = new ActiveXObject('Msxml2.DOMDocument.6.0');
                } catch (e) {
                    txnXmlDOM = new ActiveXObject('Msxml2.DOMDocument.4.0');
                }
                txnXmlDOM.async = false;
                txnXmlDOM.resolveExternals = true;
                var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
                txnXmlDOM.setProperty("SelectionNamespaces", ns);
            }
            if (getNodeText(selectSingleNode(fcjResponseDOM, "//fcubs:txnId")) != '') {
                txnXmlDOM = loadXMLDoc('<Payload>' + getXMLString(fcjResponseDOM.documentElement.cloneNode(true)) + '</Payload>');
            }
            var dbDataDOMXml = getXMLString(selectSingleNode(fcjResponseDOM, "//fcubs:moduleData").childNodes[0].childNodes[1].childNodes[0]);
            var exceptionsNode = selectSingleNode(fcjResponseDOM, "//fcubs:exceptions");
            dbDataDOM.loadXML(dbDataDOMXml);
            //for multiple response
            var l_Index = selectNodes(fcjResponseDOM, "//FUNCTIONID").length;
            var uiXMLIndex;
            //var actionIndex;
            for (i = 0; i < l_Index; i++) {
                uiXMLIndex = getNodeText(selectSingleNode(fcjResponseDOM, "//fcubs:moduleData").childNodes[i].childNodes[0].childNodes[8]);
                // actionIndex=fcjResponseDOM.selectSingleNode("//fcubs:moduleData").childNodes[i].childNodes[0].childNodes[9].text;
                dbdomreq[uiXMLIndex] = getXMLString(selectSingleNode(fcjResponseDOM, "//fcubs:moduleData").childNodes[i].childNodes[1].childNodes[0]);
            }
            showTabData();
            if (exceptionsNode) {
                document.getElementById("BTN_EXIT_IMG").src = cache1.src;
                fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
                showToolbar(functionId, '', '');
                var returnVal = displayException(exceptionsNode);
                if (returnVal == 'POST') {
                    // resend the response (without removing the exception dom(including rulename, decision)
                    //fcjRequestDOM.loadXML(fcjResponseDOM.xml);
                    fcjRequestDOM = loadXMLDoc(getXMLString(fcjResponseDOM));
                    fnSaveTxnXml();
                }
                fnSetExitButton(true);
                if (getNodeText(selectSingleNode(fcjResponseDOM, "//MSGSTAT")) == 'SUCCESS' && getNodeText(selectSingleNode(fcjResponseDOM, "//fcubs:txnIdentification/fcubs:operation")) == '') {
                    document.getElementById("BTN_EXIT_IMG").src = cache1.src;
                    fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
                    toolbarReset();
                    fnSetExitButton(false);
                }
            }
        }
        fnPostSave();
        return true;
    } catch (e) {
        alert(scriptError);
    }
}

function buildTransactionXML() {
    try {
        var txnXML = '<?xml version="1.0"?>';
        var txnStartIndex = 0;
        var txnClosingIndex = 0;
        var xmlns = "http://fcubs.iflex.com";
        var xsi = "http://www.w3.org/2001/XMLSchema-instance";
        var schemaLocation = "http://fcubs.iflex.com";
        /*
        try
        {
            var txnXMLDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
        } catch(e)
        {
            var txnXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
        }
        txnXMLDOM.async = false;
        txnXMLDOM.resolveExternals = true;
        */
        var txnXMLDOM = loadXMLDoc(txnXML);
        if (txnXmlDOM == null || getXMLString(txnXmlDOM) == "") {
            //Create the Transaction XML DOM.
            /*txnXMLDOM.loadXML(txnXML);
            txnXMLDOM.loadXML("<transaction/>");*/
            txnXMLDOM.loadXMLDoc("<transaction/>");
            //create the atttributes of the Root Node.
            var transactionNode = selectSingleNode(txnXMLDOM, "//transaction");
            transactionNode.setAttribute("taskId", "");
            //Create the TXNIdentification Child Node
            var txnidentificationNode = txnXMLDOM.createElement("txnIdentification");
            transactionNode.appendChild(txnidentificationNode);
            var txnidnode = txnXMLDOM.createElement("txnId");
            txnidentificationNode.appendChild(txnidnode);
            var processnamenode = txnXMLDOM.createElement("processName");
            //processnamenode.text = gProcessName;
            setNodeText(processnamenode, gProcessName);
            txnidentificationNode.appendChild(processnamenode);
            var branchcodennode = txnXMLDOM.createElement("branchCode");
            // added by aakriti for MUTBdemo
            // branchcodennode.text = "CHO";//mainWin.CurrentBranch;
            //branchcodennode.text = mainWin.CurrentBranch;
            setNodeText(branchcodennode, mainWin.CurrentBranch);
            txnidentificationNode.appendChild(branchcodennode);
            var currentusernode = txnXMLDOM.createElement("currentUser");
            //currentusernode.text = mainWin.UserId;
            setNodeText(currentusernode, mainWin.UserId);
            txnidentificationNode.appendChild(currentusernode);
            var txncommentnode = txnXMLDOM.createElement("txnComment");
            txnidentificationNode.appendChild(txncommentnode);
            var uixmlnode = txnXMLDOM.createElement("uiXml");
            txnidentificationNode.appendChild(uixmlnode);
            var stagenode = txnXMLDOM.createElement("stage");
            //stagenode.text = '';
            setNodeText(stagenode, '');
            txnidentificationNode.appendChild(stagenode);
            var operationnode = txnXMLDOM.createElement("operation");
            txnidentificationNode.appendChild(operationnode);
            //Create the TransactionData Node.
            var transactiondatanode = txnXMLDOM.createElement("transactionData");
            transactionNode.appendChild(transactiondatanode);
            var moduledatanode = txnXMLDOM.createElement("moduleData");
            var reqDOM; //= buildUBSTxnXml();
            var old_functionid = functionId;
            //	var old_gaction=gAction;
            //added for multiple request
            if (typeof (dbdomreq) != 'undefined') {
                for (i in dbdomreq) {
                    dbDataDOM.loadXML(dbdomreq[i]);
                    //var funactionArray=i.split('~');
                    functionId = i;
                    //gAction=i;
                    reqDOM = buildUBSTxnXml();
                    moduledatacode = reqDOM.documentElement;
                    moduledatanode.appendChild(moduledatacode);
                    transactiondatanode.appendChild(moduledatanode);
                }
            }
            //
            //  gAction=old_gaction;
            functionId = old_functionid;
            //Create the Additional Fields Node
            var additionalfldnode = txnXMLDOM.createElement("additionalFields");
            transactionNode.appendChild(additionalfldnode);
            var charfieldnode = txnXMLDOM.createElement("charField");
            additionalfldnode.appendChild(charfieldnode);
            var numericFldnode = txnXMLDOM.createElement("numericField");
            numericFldnode.setAttribute("additional_field_name", "=String");
            var numericFldcode = txnXMLDOM.createCDATASection("3.1415926535897932384626433832795");
            numericFldnode.appendChild(numericFldcode);
            additionalfldnode.appendChild(numericFldnode);
            var datefieldnode = txnXMLDOM.createElement("dateField");
            datefieldnode.setAttribute("additional_field_name", "=String");
            var datefieldcode = txnXMLDOM.createCDATASection("1967-08-13");
            datefieldnode.appendChild(datefieldcode);
            additionalfldnode.appendChild(datefieldnode);
            var genericfldnode = txnXMLDOM.createElement("genericField");
            genericfldnode.setAttribute("additional_field_name", "=String");
            additionalfldnode.appendChild(genericfldnode);
            //Create the Documents node.
            var documentsnode = txnXMLDOM.createElement("documents");
            transactionNode.appendChild(documentsnode);
            var documentnode = txnXMLDOM.createElement("document");
            documentsnode.appendChild(documentnode);
            var docrefnode = txnXMLDOM.createElement("docRef");
            documentnode.appendChild(docrefnode);
            var doctypenode = txnXMLDOM.createElement("docType");
            documentnode.appendChild(doctypenode);
            var docurlnode = txnXMLDOM.createElement("docUrl");
            documentnode.appendChild(docurlnode);
            var docoperationnode = txnXMLDOM.createElement("docOperation");
            documentnode.appendChild(docoperationnode);
            var docremarksnode = txnXMLDOM.createElement("docRemarks");
            documentnode.appendChild(docremarksnode);
            //Create the Exceptions Node
            var exceptionsnode = txnXMLDOM.createElement("exceptions");
            transactionNode.appendChild(exceptionsnode);
            var exceptionnode = txnXMLDOM.createElement("error");
            exceptionsnode.appendChild(exceptionnode);
            var exceptioncodenode = txnXMLDOM.createElement("ecode");
            exceptionnode.appendChild(exceptioncodenode);
            /*var exceptiontypenode = txnXMLDOM.createNode("element","etype",xmlns);
       exceptionnode.appendChild(exceptiontypenode);*/
            var exceptiondescnode = txnXMLDOM.createElement("edesc");
            exceptionnode.appendChild(exceptiondescnode);
            //Create TaskAssignment Node
            var taskAssignmentnode = txnXMLDOM.createElement("taskAssignment");
            transactionNode.appendChild(taskAssignmentnode);
            var assignmentrulenode = txnXMLDOM.createElement("assignmentRule");
            taskAssignmentnode.appendChild(assignmentrulenode);
            var srcsystemnode = txnXMLDOM.createElement("sourceSystem");
            taskAssignmentnode.appendChild(srcsystemnode);
            var assigneesnode = txnXMLDOM.createElement("assignees");
            taskAssignmentnode.appendChild(assigneesnode);
            var assigneeIdnode = txnXMLDOM.createElement("assigneeId");
            assigneesnode.appendChild(assigneeIdnode);
            var assigneenamenode = txnXMLDOM.createElement("assigneeName");
            assigneesnode.appendChild(assigneenamenode);
            var assigneetypenode = txnXMLDOM.createElement("assigneeType");
            assigneesnode.appendChild(assigneetypenode);
            //Create FlowControlRule Node
            var flowctrlrulenode = txnXMLDOM.createElement("flowControlRule");
            transactionNode.appendChild(flowctrlrulenode);
            var rulenamenode = txnXMLDOM.createElement("ruleName");
            flowctrlrulenode.appendChild(rulenamenode);
            var decisionnode = txnXMLDOM.createElement("decision");
            flowctrlrulenode.appendChild(decisionnode);
            //Create Audit Node
            var txnAuditnode = txnXMLDOM.createElement("txnAuditDetails");
            transactionNode.appendChild(txnAuditnode);
            var SeqNonode = txnXMLDOM.createElement("SeqNo");
            txnAuditnode.appendChild(SeqNonode);
            var userIdnode = txnXMLDOM.createElement("userId");
            txnAuditnode.appendChild(userIdnode);
            var actionnode = txnXMLDOM.createElement("action");
            txnAuditnode.appendChild(actionnode);
            var actionDateTimenode = txnXMLDOM.createElement("actionDateTime");
            txnAuditnode.appendChild(actionDateTimenode);
            var userCommentsnode = txnXMLDOM.createElement("userComments");
            txnAuditnode.appendChild(userCommentsnode);
            //audit\
            if (getNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[0]) == "") {
                //txnXMLDOM.documentElement.childNodes[7].childNodes[0].text = "~" + 1;
                setNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[0], "~" + 1);
            } else {
                var seqnoArray = getNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[0]).split("~");
                var lastSeqno = seqnoArray[seqnoArray.length] + 1;
                setNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[0], getNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[0]) + "~" + lastSeqno);
            }
            setNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[1], getNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[1]) + "~" + mainWin.UserId);
            setNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[2], getNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[2]) + "~" + "ACCEPT");
            setNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[3], getNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[3]) + "~" + "hi");
            setNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[4], getNodeText(txnXMLDOM.documentElement.childNodes[7].childNodes[4]) + "~" + StageComments);
            transactionNode.setAttribute("xmlns");
            transactionNode.setAttribute("status", "");
        } else {
            setNodeText(selectSingleNode(txnXmlDOM, "//fcubs:txnIdentification/fcubs:operation"), ""); // clear the (initiate) operation
            while (selectSingleNode(txnXmlDOM, "//fcubs:moduleData").childNodes.length > 0) {
                var childNode = selectSingleNode(txnXmlDOM, "//fcubs:moduleData").childNodes[0];
                selectSingleNode(txnXmlDOM, "//fcubs:moduleData").removeChild(childNode);
            }
            var moduledatanode = selectSingleNode(txnXmlDOM, "//fcubs:moduleData").cloneNode(true);
            var childNode = selectSingleNode(txnXmlDOM, "//fcubs:moduleData");
            selectSingleNode(txnXmlDOM, "//fcubs:transactionData").removeChild(childNode);
            var transactiondatanode = selectSingleNode(txnXmlDOM, "//fcubs:transactionData").cloneNode(true);
            //var reqDOM = buildUBSTxnXml();
            //var moduledatacode = reqDOM.documentElement.cloneNode(true);
            //moduledatanode.appendChild(moduledatacode.cloneNode(true));    
            var old_functionid = functionId;
            //var old_gaction=gAction;
            //added for multiple request
            if (typeof (dbdomreq) != 'undefined') {
                for (i in dbdomreq) {
                    //dbDataDOM.loadXML(dbdomreq[i]);
                    dbDataDOM = loadXMLDoc(dbdomreq[i]);
                    //var funactionArray=i.split('~');
                    functionId = i;
                    //gAction=funactionArray[1];
                    reqDOM = buildUBSTxnXml();
                    moduledatacode = reqDOM.documentElement.cloneNode(true);
                    moduledatanode.appendChild(moduledatacode.cloneNode(true));
                }
            }
            transactiondatanode.appendChild(moduledatanode.cloneNode(true));
            //gAction=old_gaction;
            functionId = old_functionid;
            var childNode = selectSingleNode(txnXmlDOM, "//fcubs:transactionData");
            selectSingleNode(txnXmlDOM, "//fcubs:transaction").removeChild(childNode);
            selectSingleNode(txnXmlDOM, "//fcubs:transaction").appendChild(transactiondatanode);
            //txnXmlDOM.selectSingleNode("//fcubs:moduleData").appendChild(reqDOM.documentElement.cloneNode(true));
            // remove the exception nodes and rebuild.s
            //selectNodes(txnXmlDOM, "//fcubs:exception").removeAll();
            var removeNode = selectNodes(txnXmlDOM, "//fcubs:exception");
            for (var i = 0; i < removeNode.length; i++) {
                removeNode[i].parentNode.removeChild(removeNode[i]);
            }
            var exceptionsNode = selectSingleNode(txnXmlDOM, "//fcubs:exceptions");
            var exceptionnode = txnXmlDOM.createElement("exception");
            exceptionsNode.appendChild(exceptionnode);
            var exceptioncodenode = txnXMLDOM.createElement("exceptionCode");
            exceptionnode.appendChild(exceptioncodenode);
            var exceptiontypenode = txnXMLDOM.createElement("exceptionType");
            exceptionnode.appendChild(exceptiontypenode);
            var exceptiondescnode = txnXMLDOM.createElement("exceptionDescription");
            exceptionnode.appendChild(exceptiondescnode);
            // remove the exception nodes and rebuild.
            // clear the rulename and other decision tags
            if (selectSingleNode(txnXmlDOM, "//fcubs:flowControlRule/fcubs:ruleName") && selectSingleNode(txnXmlDOM, "//fcubs:flowControlRule/fcubs:decision")) {
                setNodeText(selectSingleNode(txnXmlDOM, "//fcubs:flowControlRule/fcubs:ruleName"), "");
                setNodeText(selectSingleNode(txnXmlDOM, "//fcubs:flowControlRule/fcubs:decision"), "");
            }
            if (selectSingleNode(txnXmlDOM, "//fcubs:transaction")) {
                selectSingleNode(txnXmlDOM, "//fcubs:transaction").setAttribute("taskId", taskId);
                txnXML = getXMLString(selectSingleNode(txnXmlDOM, "//fcubs:transaction"));
            } else {
                txnXML = getXMLString(selectSingleNode(txnXmlDOM, "//Payload"));
                txnXML = txnXML.substring(txnXML.indexOf('>') + 1, txnXML.lastIndexOf('<'));
                txnXML = "<?xml version='1.0'?><transaction xmlns='http://fcubs.iflex.com' taskId='" + taskId + "'>" + txnXML + "</transaction>";
            }
            //txnXMLDOM.loadXML(txnXML);
            txnXMLDOM = loadXMLDoc(txnXML);
            var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
            txnXMLDOM.setProperty("SelectionNamespaces", ns);
            //txnXMLDOM.documentElement.childNodes.item(0).childNodes.item(7).text = gOperation;
            setNodeText(selectSingleNode(txnXMLDOM, "//fcubs:operation"), gOperation);
            if (document.getElementById("PROCESS_ACTIONS") && holdFlag == "N") setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[6], document.getElementById("PROCESS_ACTIONS").value);
            else setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[6], "HOLD");
            setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[3], mainWin.UserId);
            setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[2], mainWin.CurrentBranch);
        }
        // Changes done By Fahad Starts Here
        //audit\
        var auditNode = selectSingleNode(txnXMLDOM, "//fcubs:txnAuditDetails");
        if (getNodeText(auditNode.childNodes[0]) == "") {
            setNodeText(auditNode.childNodes[0], "~" + 1);
        } else {
            var seqnoArray = getNodeText(auditNode.childNodes[0]).split("~");
            var lastSeqno = (seqnoArray[seqnoArray.length - 1] * 1) + 1;
            setNodeText(auditNode.childNodes[0], getNodeText(auditNode.childNodes[0]) + "~" + lastSeqno);
        }
        setNodeText(auditNode.childNodes[1], getNodeText(auditNode.childNodes.item[1]) + "~" + mainWin.UserId);
        setNodeText(auditNode.childNodes[2], getNodeText(auditNode.childNodes.item[2]) + "~" + document.getElementById("PROCESS_ACTIONS").value);
        setNodeText(auditNode.childNodes[3], getNodeText(auditNode.childNodes.item[3]) + "~" + mainWin.AppDate);
        setNodeText(auditNode.childNodes[4], getNodeText(auditNode.childNodes.item[4]) + "~" + document.getElementById("AUDIT_FIELD").value);
        // Changes done By Fahad Ends Here      
        return txnXMLDOM;
    } catch (e) {
        alert(scriptError);
    }
}

function fnExit(e) {
    try {
        if (typeof (callFormLaunched) != "undefined" && callFormLaunched == "yes") {
            fnExitSubScreen(e);
            return;
        } else {
            if (gAction != "") {
                mask();
                showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
                alertAction = "EXITACTION";
            } else {
                dbDataDOM = null;
                isExitTriggered = true;
                fnFocus();
                showToolbar("", "", ""); /* HAS BEEN ADDED NEWLY */
                var winObj = mainWin.document.getElementById(seqNo);
                mainWin.fnExit(winObj);
            }
        }
    } catch (e) {
        alert(scriptError);
    }
    e.cancelBubble = true;
}

function fnExitAlertWin(evnt) {
    try {
        if (typeof (customAlertAction) != "undefined") {
            if (customAlertAction != "") {
                //eval("fnExitAlertWin_" + customAlertAction + "(evnt)");
                var fnEval = new Function("evnt","fnExitAlertWin_" + customAlertAction + "(evnt)");  
                fnEval(evnt); //Fix for 18423705
                customAlertAction = "";
                return;
            }
        }
    } catch (e) {}
    unmask();
    if (alertAction == "OVERRIDE") {
        fnPostProcessResponse("FAILURE");
    } else if (alertAction == "CLOSEACTION") {
        gAction = "";
        debugs("Failed in confirmAction", "");
        return;
    } else if (alertAction == "REOPENACTION") {
        gAction = "";
        debugs("Failed in confirmAction", "");
        return;
    } else if (alertAction == "DELETEACTION") {
        gAction = "";
        debugs("Failed in confirmAction", "");
        return;
    } else if (alertAction == "REVERSEACTION") {
        debugs("Failed in confirmAction", "");
        return;
    }
}

function fnCloseAlertWin(evnt) {
    gIsValid = true;
    //Performance Changes Starts
    var t = getDateObject();
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds(); 
    //Performance Changes Ends
    try {
        if (typeof (customAlertAction) != "undefined") {
            if (customAlertAction != "") {
                //eval("fnCloseAlertWin_" + customAlertAction + "(evnt)");
                var fnEval = new Function("evnt","fnCloseAlertWin_" + customAlertAction + "(evnt)");  
                fnEval(evnt); //Fix for 18423705
                customAlertAction = "";
                return;
            }
        }
    } catch (e) {}
    if (alertAction == "EXITACTION") {
        multiBrnScrOpened = false;
        var l_RelLockStatus = true;
        if (gAction == "MODIFY") {
            l_RelLockStatus = releaseLock();
        }
        resetElements();
        disableForm();
        gAction = "";
        dbDataDOM = null;
        fnClearMultipleEntryBlocks();
        //toolbarReset();
      //  showToolbar(functionId, '', '');	//REDWOOD_CHANGES
        fnEnableSubSysButtons();
        fnSetExitButton(false);
        multiBrnScrOpened = false; /* ADDED NEWLY */
        unmask();
        if (gIsAuditExist) {
            if (document.getElementsByName("AUTH_STAT")[0]) {
                fnDisableElement(document.getElementsByName("AUTH_STAT")[0]);
            }
            if (document.getElementsByName("RECORD_STAT")[0]) {
                fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
            }
            if (document.getElementsByName("ONCE_AUTH")[0]) {
                fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
            }
        }
        return;
    } else if (alertAction == "OVERRIDE") {
        var ubsXMLDOM = loadXMLDoc("<FCUBS_REQ_ENV/>");
        var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
        //ubsXMLDOM.documentElement.appendChild(getCloneDocElement(fcjResponseDOM.documentElement.childNodes[0]));
        //ubsXMLDOM.documentElement.appendChild(getCloneDocElement(fcjResponseDOM.documentElement.childNodes[0]));
		ubsXMLDOM.documentElement.appendChild(selectSingleNode(fcjResponseDOM, "//FCUBS_HEADER"));//Fixes for 17016517 
		ubsXMLDOM.documentElement.appendChild(selectSingleNode(fcjResponseDOM, "//FCUBS_BODY"));//Fixes for 17016517 
        var moduleNode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID");//Fix for 17637992 start
        if(moduleNode == null) {
          var moduleNod = ubsXMLDOM.createElement("MODULEID");
          var module = functionId.substring(0, 2);
          //Prakash@FCIS8.0 - ITR1 - SCF# - 24/09/2007 - Start
          if (mainWin.applicationName == 'FCIS') {
              module = mainWin.CurrentModule
          }
          setNodeText(moduleNod, module);
          selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER").appendChild(moduleNod);
        }//Fix for 17637992 end
       
        if (typeof (servletURL) == 'undefined') {
            servletURL = 'FCClientHandler';
        }
        fcjResponseDOM = fnPost(ubsXMLDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")); // SANDEEP-CHGMSG
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
            if (msgStatus == 'SUCCESS') {
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                var l_LockRelStatus = true;
                if (gAction == 'MODIFY') {
                    responseDOM_Modify = loadXMLDoc(getXMLString(fcjResponseDOM));
                    l_LockRelStatus = releaseLock();
                    fcjResponseDOM = loadXMLDoc(getXMLString(responseDOM_Modify));
                    responseDOM_Modify = null;
                }
                disableForm();
                fnSetExitButton(false);
                gAction = "";
                //var returnVal = displayResponse(messageNode);
                displayResponse(messageNode);
            }
            //  dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
            if (msgStatus != 'SUCCESS') {
                //var returnVal = displayResponse(messageNode);
                displayResponse(messageNode);
                return;
            }
        } else {
            alert(mainWin.getItemDesc("LBL_EMPTY_RESPONSE"));
            fnPostProcessResponse("FAILURE");
            return;
        }
        fnPostProcessResponse(msgStatus);
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
    } else if (alertAction == "CLOSEACTION") {
        if (gIsAuditExist) {
            if (document.getElementsByName("MOD_NO")[0]) {
                fn_maintenance_stamp('', 'C');
            }
        }
        try {
            fcjRequestDOM = buildUBSXml();
        } catch (e) {
            debugs("Failed in buildUBSXml", "");
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("Failed in fnPost", "");
        }
        fnProcessResponse();
        fnSetExitButton(false);
        // Post action code
        try {
            fnPostClose();
        } catch (e) {
            debugs("Failed in fnPostClose", "");
        }
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar(l_FncId, '', '');
        //fnpostAction('CLOSE');//Performance Changes
    } else if (alertAction == "REOPENACTION") {
        if (gIsAuditExist) {
            if (document.getElementsByName("MOD_NO")[0]) {
                fn_maintenance_stamp('', 'O');
            }
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        document.getElementsByName("CHECKERSTAMP").value = ''; //REDWOOD_CHANGES
        document.getElementsByName("CHECKERID")[0].value = '';
        try {
            fcjRequestDOM = buildUBSXml();
        } catch (e) {
            debugs("failed in buildUBSXml", "");
            gAction = "";
            return;
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("failed in buildUBSXml", "");
            gAction = "";
            return;
        }
        try {
            fnProcessResponse();
        } catch (e) {
            debugs("failed in fnProcessResponse", "");
            gAction = "";
            return;
        }
        fnSetExitButton(false);
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar(l_FncId, '', '');
        //fnpostAction('REOPEN');//Performance Changes
    } else if (alertAction == "DELETEACTION") {
        try {
            fcjRequestDOM = buildUBSXml();
        } catch (e) {
            debugs("failed in buildUBSXml", "");
            return;
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("failed in fnPost", "");
        }
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("msgStatus=" + msgStatus, "");
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
            debugs("calling fnGetDataXMLFromFCJXML", "");
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            debugs("calling setDataXML", "");
            setDataXML(getXMLString(pureXMLDOM));
            //var returnVal = displayResponse(messageNode);
            displayResponse(messageNode);
            //            if(msgStatus == 'SUCCESS'){
            //FCUBS10ITR1 -- SFR 1486 START
            if (msgStatus == 'SUCCESS' || msgStatus == "WARNING") {
                //FCUBS10ITR1 -- SFR 1486 END
                var delRecNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/REC");
                if (typeof (delRecNode) != "undefined") {
                    var delChildNodes = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/REC").childNodes;
                }
                if (typeof (delChildNodes) == "undefined" || delChildNodes.length <= 1) {
                    resetElements();
                    dbDataDOM.loadXML("");
                } else {
                    showData(dbStrRootTableName, 1);
                }
                fnPostDelete();
                //dbDataDOM.loadXML("");
                /*Fix for 21967061 ends*/
                if (msgStatus == 'SUCCESS') {
                gAction = "";
                } /*Fix for 21967061 ends*/
                var l_FncId = mainWin.document.getElementById("fastpath").value;
                showToolbar(l_FncId, '', '');
            } else {
                var l_FncId = mainWin.document.getElementById("fastpath").value;
                showToolbar(l_FncId, '', '');
            }
            fnSetExitButton(false);
        }
        try {
            //eval('fnPostDelete()');
            //fnpostAction('DELETE');//Performance Changes
            var fnEval = new Function('fnPostDelete()');  
            fnEval();
        } catch (e) {}
    } else if (alertAction == "REVERSEACTION") {
        if (gIsAuditExist) {
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("Msgstatus", msgStatus);
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
            if (msgStatus == 'SUCCESS') {
                disableForm();
                document.getElementById("BTN_EXIT_IMG").src = cache1.src;
                fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
                gAction = "";
                showToolbar(functionId, '', '');
                fnSetExitButton(false);
            } else {
                fnSetExitButton(true);
                showToolbar(functionId, '', '');
            }
            //var returnVal = displayResponse(messageNode);
            displayResponse(messageNode);
        }
        try {
             //fnpostAction('REVERSE');//Performance Changes
            //eval('fnPostReverse()');
            var fnEval = new Function('fnPostReverse()');  
            fnEval();
        } catch (e) {}
    } else if (alertAction == "TXNBRANERROR") {
        unmask();
        resetElements();
        resetIndex();
        disableForm();
        fnEnableSubSysButtons();
        fnSetExitButton(false);
        gAction = "";
        dbDataDOM = loadXMLDoc("");
        multiBrnScrOpened = false;
        fnSetExitButton();
        showToolbar(functionId, '', '');
        return false;
    } else if (alertAction == "DELETECRITERIA") {
        unmask();
        fnQueryCriteria("QUERYCRITERIA",evnt);
        return false;
    } else if (alertAction == "UPDATECRITERIA") {
        unmask();
        var flag = "true";
        fnSaveSumCriteria(evnt,flag);
        return false;
    } else {
        unmask();
    }
}
/**
 * Function to be called from Authorize.js 
 * to build Auth Query Request XML
 * This xml is used to bring all the versions to be authorized for the current Screen Record
 */
function getVersions() {
    return buildUBSXml();
}
/**
 * Function to be called from Authorize.js 
 * To Submit the Auth Query Request to Server. Since Servlet name won't be 
 * available in Authorize.js, this is written here
 */
function postQuery(objReqDOM) {
    try {
        //debug(dlgArg.mainWin,  objReqDOM.xml, "P");
        var qryResponse = fnPost(objReqDOM, servletURL, functionId);
        return qryResponse;
    } catch (e) {
        alert(scriptError);
    }
}

function fnProcessAuth(recPart) {
    try {
        inTime = setActionTime();//Performance Changes
        debugs("Started", "");
        gAction = "AUTH";
        var recId = fnGetPKValues();
        var oldMod = getNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"));
        setNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"), selectedMod);
        fcjRequestDOM = buildUBSXml();
        setNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"), oldMod);
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        fnProcessResponse();
        fnSetExitButton(false);
        //fnpostAction('AUTH');//Performance Changes
    } catch (e) {
        alert(scriptError);
    }
}

function fnSetExitButton(enableBtn) {
    try {
        fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
        //35262971 starts 
		//document.getElementById("BTN_EXIT_IMG").focus();
		 setTimeout(function(){
		document.getElementById("BTN_EXIT_IMG").focus();
		 },0);
		 //35262971 ends
        if (enableBtn) {
            if (gAction == "ENTERQUERY") {
                if (gscrPos) {
                    if (gscrPos == "template") {
                       // document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_CANCEL");//REDWOOD_CHANGES
                        document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_CANCEL"); //REDWOOD_CHANGES
                    } else {
                        document.getElementById("BTN_EXIT_IMG").src = cache2.src;
                    }
                }
            } else if (gscrPos) {
                if (gscrPos == "template") {
                    //document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_CANCEL");//REDWOOD_CHANGES
                    document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_CANCEL");//REDWOOD_CHANGES
                }
            } else {
                document.getElementById("BTN_EXIT_IMG").src = cache2.src;
            }
        } else if (gscrPos) {
            if (gscrPos == "template") {
                //document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_EXIT"); //REDWOOD_CHANGES
                document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_EXIT"); //REDWOOD_CHANGES
            }
        } else {
            document.getElementById("BTN_EXIT_IMG").src = cache1.src;
        }
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * The HTML form elements a custom attribute called REQUIRED
 * which can have value 0 and -1. -1 indicates that the field
 * is a mandatory field. Validate for the all the fields with
 * REQUIRED == -1 and append the error code.
 */
function fnValidateMandatory() {
    try {
        var validate = true;
//REDWOOD_CHANGES        
        //var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
         var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME");
       
       // var tempVal = "";
        for (var i in eleArray) {
         var elements = document.getElementById("ResTree").getElementsByTagName(eleArray[i]);
//REDWOOD_CHANGES
        var tempVal = "";
        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++) {
            if (elements[elemIndex] && elements[elemIndex].tagName.toUpperCase() == "OJ-RADIOSET") continue;//Bug#35277268
			//if (elements[elemIndex] && elements[elemIndex].type.toUpperCase() == "OJ-RADIOSET") continue;//Bug#35277268
            if (elements[elemIndex].getAttribute("REQUIRED") == "true") { //REDWOOD_CHANGES
                tempVal = getFieldData(elements[elemIndex]);
                if (isNull(tempVal)) {
                    var label = fnGetLabel(elements[elemIndex]);
                    appendErrorCode('ST-COM013', label);
                    validate = false;
                }
            }
        }	
//REDWOOD_CHANGES
      /*  var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
        for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++) {
            if (elements1[elemIndex1].getAttribute("REQUIRED") == -1) {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (isNull(tempVal)) {
                    var label = fnGetLabel(elements[elemIndex]);
                    appendErrorCode('ST-COM013', label);
                    validate = false;
                }
            }
        }
        var elements = document.getElementById("ResTree").getElementsByTagName("SELECT");
        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++) {
            if (elements[elemIndex].getAttribute("REQUIRED") == -1) {
                tempVal = getFieldData(elements[elemIndex]);
                if (isNull(tempVal)) {
                    var label = fnGetLabel(elements[elemIndex]);
                    appendErrorCode('ST-COM013', label);
                    validate = false;
                }
            }
        }*/	 
//REDWOOD_CHANGES
        }
        return validate;
    } catch (e) {
        alert(scriptError);
    }
}
/** 
     Kals On June 9 .. If the field is frm ME , prepend the block lable and the field label
     Chk the Field is From ME block or SE Blk .. For ME blk , DBT = "", later 
     there can some attribute to give a better distinction of ME and SE.
     If the Field is frm ME , then if the blk lable shud also be shwn in Err presentation
*/
function fnGetLabel(obj) {
    try {
        var l_FldSetLbl = "";
        var l_DBT = "";
        if (obj.getAttribute("DBT")) l_DBT = obj.getAttribute("DBT");
        if (l_DBT) l_FldSetLbl = fnGetFldSetLbl(l_DBT);
        var l_temp = obj;
        if (l_temp.getAttribute("DBT") == null || l_temp.getAttribute("DBT") == "") {
            var l_parent = l_temp.parentNode;
            while (!(l_parent.tagName == 'TABLE')) {
                l_temp = l_parent;
                l_parent = l_temp.parentNode;
            }
            l_DBT = l_parent.getAttribute("DBT");
            l_FldSetLbl = fnGetFldSetLbl(l_DBT);
        }
        if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length > 0) {
            return (mainWin.getItemDesc("LBL_MANDATORY") + obj.getAttribute("LABEL_VALUE") + mainWin.getItemDesc("LBL_IN") + l_FldSetLbl);
        }
        if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length == 0) {
            if (obj.getAttribute("REQUIRED") == -1) return mainWin.getItemDesc("LBL_MANDATORY") + obj.getAttribute("LABEL_VALUE");
            else return obj.getAttribute("LABEL_VALUE");
        }
        return obj.name;
    } catch (e) {
        alert(scriptError);
    }
}

function fnGetFldSetLbl(v_DBT) {
    try {
        var l_isMe = false;
        var l_Lbl = "";
        for (var l_Cnt = 0; l_Cnt < multipleEntryIDs.length; l_Cnt++) {
            if (multipleEntryIDs[l_Cnt].toUpperCase() == "BLK_" + v_DBT.toUpperCase()) {
                l_isMe = true;
                break;
            }
        }
        if (l_isMe) {
            if (gscrPos != "template") {
                var l_FldSet = document.getElementById("LBL_FLDSET_BLK_" + v_DBT);
                if (l_FldSet) return l_FldSet.value;
                else return "";
            } else {
                //Changed by Saidul for Template position
                var FldSetCaption = document.getElementById("BLK_" + v_DBT).getAttribute("caption");
                return FldSetCaption;
            }
        }
        return "";
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * The HTML form elements a custom attribute called DTYPE
 * which can have values VARCHAR, CHAR, DATE, NUMERIC.Validate 
 * the fields for the correct datatype. Ignore DATE and AMOUNT as
 * they are entities which will be validated by the Entity model.
 * Append the error code if the validation fail.
 */
function fnValidateDataType() {
    try {
        var validate = true;
        var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
        var tempVal = "";
        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++) {
            if (elements[elemIndex].type != 'hidden') {
                tempVal = getFieldData(elements[elemIndex]);
                if ((elements[elemIndex].getAttribute("REQUIRED") == '0') && (tempVal == '')) {
                    continue;
                }
                if (elements[elemIndex].getAttribute("DTYPE") == 'NUMERIC' || elements[elemIndex].getAttribute("DTYPE") == 'NUMBER' || elements[elemIndex].getAttribute("DTYPE") == 'DECIMAL' || elements[elemIndex].getAttribute("DTYPE") == 'SMALLINT' || elements[elemIndex].getAttribute("DTYPE") == 'INTEGER') {
                    tempVal = getFieldData(elements[elemIndex]);
                    if (!isNumeric(tempVal)) {
                        var l_Label = fnGetLabel(elements[elemIndex]);
                        appendErrorCode('FC-MAINT02', l_Label);
                        validate = false;
                    }
                }
                if (elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR' || elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR2' || elements[elemIndex].getAttribute("DTYPE") == 'CHAR') {
                    tempVal = getFieldData(elements[elemIndex]);
                    if (!isAlphaNumeric(tempVal)) {
                        var l_Label = fnGetLabel(elements[elemIndex]);
                        appendErrorCode('FC-MAINT02', l_Label);
                        validate = false;
                    }
                }
            }
        }
        var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
        for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++) {
            tempVal = getFieldData(elements1[elemIndex1]);
            if ((elements1[elemIndex1].getAttribute("REQUIRED") == '0') && (tempVal == '')) {
                continue;
            }
            if (elements1[elemIndex1].getAttribute("DTYPE") == 'NUMERIC' || elements1[elemIndex1].getAttribute("DTYPE") == 'DECIMAL' || elements1[elemIndex1].getAttribute("DTYPE") == 'SMALLINT' || elements1[elemIndex1].getAttribute("DTYPE") == 'INTEGER' || elements1[elemIndex1].getAttribute("DTYPE") == 'NUMBER') {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (!isNumeric(tempVal)) {
                    var l_Label = fnGetLabel(elements1[elemIndex1]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
            if (elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR' || elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR2' || elements1[elemIndex1].getAttribute("DTYPE") == 'CHAR') {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (!isAlphaNumeric(tempVal)) {
                    var l_Label = fnGetLabel(elements1[elemIndex1]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
        }
        return validate;
    } catch (e) {
        alert(scriptError);
    }
}
/**
 * This Function Will Disable all Primary Key Fields.
 */
function fnDisablePKFields() {
    try {
        for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++)
        fnDisableElement(document.getElementById(pkFields[loopIndex]));
    } catch (e) {
        alert(scriptError);
    }
}
/**
*   This function will the necessary steps when 
    user close the function window 
*   directly, from the winow's exit 
    button insert of application close button.
*/
function fnDirectClose() {
    try {
        if (gAction == "MODIFY") {
            releaseLock();
        }
        resetElements();
        disableForm();
        gAction = "";
        fnClearMultipleEntryBlocks();
        toolbarReset();
        isExitTriggered = true;
        dlgArg.mainWin.fnExit(window);
    } catch (e) {
        alert(scriptError);
    }
}
/**
For auth response will be read here .
Saidul added for neo phase2
*/
function displayResponse_auth(messageNode) {
    try {
        var message = "";
        var returnVal = false;
        if (messageNode) {
            var firstNode = selectSingleNode(messageNode, "//MESSAGE");
            if (firstNode) {
                var type = firstNode.getAttribute("TYPE");
                var messageNodes = selectNodes(messageNode, "//MESSAGE");
                for (var index = 0; index < messageNodes.length; index++) {
                    var msg = getNodeText(messageNodes[index]);
                    message = message + msg + "~";
                }
                returnVal = ShowErrorDialog(type, message);
            } else {
                /*appendErrorCode('ST-COM021', null);
                var msg = buildMessage(gErrCodes);
                alertMessage(msg);
                */
                mask();
                showAlerts(fnBuildAlertXML('ST-COM021', 'E'), 'E');
                alertAction = "UNMASK";
                disableForm();
                returnVal = false;
            }
        }
    } catch (e) {
        alert(scriptError);
    }
}
/**
    Functions to handel sub screen
*/
function extractSubSysStat(statusStr, subsys) {
    try {
        var stat;
        var start;
        start = statusStr.indexOf(subsys + ':');
        if (start == -1) {
            return 'NULL';
        }
        stat = statusStr.substr(start + subsys.length + 1, 1);
        return stat;
    } catch (e) {
        alert(scriptError);
    }
}

function getCurrentSubSysStat(subsys) {
    try {
        var statusStr = document.getElementsByName('SUBSYSTEMSTAT')[0].value;
        return extractSubSysStat(statusStr, subsys);
    } catch (e) {
        alert(scriptError);
    }
}

function setSubSystemAsChanged(subsys) {
    try {
        var start;
        var statusStr = document.getElementsByName('SUBSYSTEMSTAT')[0].value;
        if (statusStr.indexOf(subsys + ':') == -1) {
            return;
        }
        statusStr = statusStr.replace(subsys + ':U', subsys + ':D');
        statusStr = statusStr.replace(subsys + ':S', subsys + ':D');
        document.getElementsByName('SUBSYSTEMSTAT')[0].value = statusStr;
    } catch (e) {
        alert(scriptError);
    }
}

function getSubSysStatFromResp(pureXMLDOM, subsys) {
    try {
        var statusStr = getNodeText(selectSingleNode(pureXMLDOM, dbStrRootTableName + "/SUBSYSTEMSTAT"));
        return extractSubSysStat(statusStr, subsys);
    } catch (e) {
        alert(scriptError);
    }
}

function goToServerForSubSystem(subsys) {
    try {
        var ActionCode = gAction;
        gAction = "SUBSYS_PKP";
        try {
            fcjRequestDOM = buildUBSXml();
        } catch (e) {
            debugs("Failed in buildUBSXml", "");
        }
        gAction = ActionCode;
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("Failed in fnpost", "");
        }
        if (fcjResponseDOM) {
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            var subsysyStat = getNodeText(selectSingleNode(pureXMLDOM, dbStrRootTableName + "/SUBSYSTEMSTAT"));
            document.getElementById(dbStrRootTableName + '__SUBSYSTEMSTAT').value = subsysyStat;
            stat = getSubSysStatFromResp(pureXMLDOM, subsys);
            if (stat == 'D') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                displayResponse(messageNode);
                return false;
            }
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
            gAction = ActionCode;
            return true;
        } else {
            gAction = ActionCode;
            return false;
        }
    } catch (e) {
        alert(scriptError);
    }
}
var dbDOMBefore;
var isSubSys = false;
var subSysFunIDMap;

function fnShowSubSystem(functionId, screenName) {
   // if (!mainWin.isSessionActive()) return;  // 14669746 12.0 fix session expiry change  
    try {
        fnPreShowSubSystem();
        isSubSys = true;
        var dbDOMAfter;
        subSysFunIDMap = subSysFunIDMapping[functionId];
        var stat = getCurrentSubSysStat(subSysFunIDMap);
        if (typeof (l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") appendData(document.getElementById("TBLPage" + l_HeaderTabId));
        if ((stat != 'NULL') && ((gAction != "") && (gAction != "EXECUTEQUERY"))) {
            if ((stat != 'U') && (stat != 'S')) {
                if (!goToServerForSubSystem(subSysFunIDMap)) return;
            }
        } else {}
        if (dbDataDOM != null) {
            dbDOMBefore = loadXMLDoc(getXMLString(dbDataDOM));
        }
        fnShowScreen(functionId, screenName);
        /* if(dbDataDOM != null){
        dbDOMAfter = getXMLString(dbDataDOM);
            }
        if (dbDOMAfter != dbDOMBefore)
        {
            changedflg = true;
        } else
        {
            changedflg = false;
        }
        fnSetDependentSubSystem(subsys, changedflg);
        fnPostShowSubSystem();*/
    } catch (e) {
        alert(scriptError);
    }
}

function fnProductPickup() {
    try {
        fnPreProductPickup();
        g_prev_gAction = gAction;
        gAction = 'PRD_DFLT';
        try {
            fcjRequestDOM = buildUBSXml();
        } catch (e) {
            debugs("Failed in buildUBSXml", "");
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("Failed in fnpost", "");
        }
        if (fcjResponseDOM != null) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("Msgstatus", msgStatus);
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                //var returnVal = displayResponse(messageNode);
                fnSetExitButton(true);
            }
            if (msgStatus == 'SUCCESS') {
                /*var html = ShowXML(xmlFileName, '', xslFileName);
                ResTree.innerHTML = "";
                ResTree.insertAdjacentHTML("afterBegin", html);*/
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                fnSetExitButton(true);
            }
        }
        gAction = g_prev_gAction;
        enableForm();
        fnPostProductPickup();
        showToolbar(functionId, '', '');
    } catch (e) {
        alert(scriptError);
    }
}
/*
 *function fnRollover()
 * Added BY Saidul
 */
function fnRollover() {
    processingAction = "Rollover";
    try {
        debugs("Started", "");
        gAction = "ROLLOVER";
        if (gIsAuditExist) {
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        try {
            fcjRequestDOM = buildUBSXml();
        } catch (e) {
            debugs("Failed in buildUBSXml", "");
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch (e) {
            debugs("Failed in fnpost", "");
        }
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("Msgstatus", msgStatus);
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
            if (msgStatus == 'SUCCESS') {
                disableForm();
                document.getElementById("BTN_EXIT_IMG").src = cache1.src;
                fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
                showToolbar(functionId, '', '');
                gAction = "";
                fnSetExitButton(false);
            } 
			/* fix for bug 19791934 starts 
			else {
                gAction = "";
                fnSetExitButton(false);
                showToolbar(functionId, '', '');
            } fix for bug 19791934 ends */
            //var returnVal = displayResponse(messageNode);
            displayResponse(messageNode);
        }
    } catch (e) {
        alert(scriptError);
    }
}
/*
 *function fnConfirm()
 * Added BY Saidul
 */
// TODO THE CODE HAS TO BE MODIFIED TO USE THE ALERT FRAME WORK
function fnConfirm() {
    try {
        try {
            if (!fnPreConfirm()) {
                debugs("Failed in fnPreConfirm", "");
            }
        } catch (e) {}
        gAction = "CONFIRM_QRY";
        if (!fnValidateOperation()) {
            debugs("Failed in fnValidateOperation", "");
            return;
        }
        screenArgs = new Array();
        screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
        var funcId = functionId;
        var userLanguageCode = mainWin.LangCode;
        funcId = funcId.substring(0, funcId.length - 2) + 'CQ';
        screenArgs['FUNCTION_ID'] = funcId;
        //screenArgs['DESCRIPTION'] = 'Details';
        screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + userLanguageCode + '/' + funcId + '.xml', screenArgs['SCREEN_NAME']);
        screenArgs['LANG'] = userLanguageCode;
        screenArgs['UI_XML'] = 'CVS_MAIN';
        screenArgs['PARENT_FUNC_ID'] = functionId;
        screenArgs['parentWin'] = window;
        fnShowCallForm(screenArgs);
        gAction =""; //Fix for 17448246
        fnSetExitButton(false);
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar(l_FncId, '', '');
    } catch (e) {
        alert(scriptError);
    }
}

function fnLiquidate() {
    processingAction = "Liquidate";
    forLiquidate = true;
    try {
        try {
            if (!fnPreLiquidate()) {
                debugs("Failed in fnPreLiquidate", "");
            }
        } catch (e) {}
        gAction = "LIQUIDATE_QRY";
        if (!fnValidateOperation()) {
            debugs("Failed in fnValidateOperation", "");
            return;
        }
        screenArgs = new Array();
        screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
        var funcId = functionId;
        var userLanguageCode = mainWin.LangCode;
        funcId = funcId.substring(0, funcId.length - 2) + 'LQ';
        screenArgs['FUNCTION_ID'] = funcId;
        //screenArgs['DESCRIPTION'] = 'Details';
        screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + userLanguageCode + '/' + funcId + '.xml', screenArgs['SCREEN_NAME']);
        screenArgs['LANG'] = userLanguageCode;
        screenArgs['UI_XML'] = 'CVS_MAIN';
        screenArgs['PARENT_FUNC_ID'] = functionId;
        screenArgs['parentWin'] = window;
        fnShowCallForm(screenArgs);
        gAction =""; //Fix for 17448246
        fnSetExitButton(false);
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar(l_FncId, '', '');
    } catch (e) {
        alert(scriptError);
    }
}
// Kals on June 29 . Sets the Contract Status Desc 
function fnSetAudtDesc() {
    try {
        var l_CntStatElmts = document.getElementsByName("CONTSTAT");
        if (l_CntStatElmts.length == 0) return;
        var l_AuditVal = document.getElementsByName("CONTSTAT")[0].value;
        if (!l_OnlineAuditVals) return;
        var l_AuditDesc = l_OnlineAuditVals[l_AuditVal];
        if (!l_AuditDesc) return;
        document.getElementsByName("CONTSTAT")[0].value = l_AuditDesc;
        // THis is an Inline mapping .. This shud be NLS ..
        var l_Process_StatObj = document.getElementsByName("PROCESSTAT");
        if (l_Process_StatObj.length == 0) return;
        var l_P_Val = l_Process_StatObj[0].value;
        l_P_Val = trim(l_P_Val);
        if (l_P_Val == "N") l_P_Val = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_AUTH");
        if (l_P_Val == "A") l_P_Val = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_RELEASE");
        if (l_P_Val == "P") l_P_Val = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
        if (l_P_Val == "F") l_P_Val = mainWin.getItemDesc("LBL_PROCESSTAT_FAILED_VERIFICATION");
        if (l_P_Val == "H") l_P_Val = mainWin.getItemDesc("LBL_PROCESSTAT_HOLD");
        l_Process_StatObj[0].value = l_P_Val;
    } catch (e) {
        alert(scriptError);
    }
}

function fnGetContractAuditValue(val) {
    try {
        var auditRetVal = "";
        if (l_OnlineAuditDesc && l_OnlineAuditDesc[val]) {
            auditRetVal = l_OnlineAuditDesc[val];
            return auditRetVal;
        }
        return auditRetVal;
    } catch (e) {
        alert(scriptError);
    }
}

function fnGetContractAuditDesc(val) {
    try {
        var auditRetDesc = "";
        if (l_OnlineAuditVals && l_OnlineAuditVals[val]) {
            auditRetDesc = l_OnlineAuditVals[val];
            return auditRetDesc;
        }
        return auditRetDesc
    } catch (e) {
        alert(scriptError);
    }
}

function fnGetProcessAuditValue(val) {
    try {
        var auditRetVal = "";
        if (l_OnlineProcessStatusDesc && l_OnlineProcessStatusDesc[val]) {
            auditRetVal = l_OnlineProcessStatusDesc[val];
            return auditRetVal;
        }
        return auditRetVal;
    } catch (e) {
        alert(scriptError);
    }
}

function fnGetProcessAuditDesc(val) {
    try {
        var auditRetDesc = "";
        if (l_OnlineProcessStatusVals && l_OnlineProcessStatusVals[val]) {
            auditRetDesc = l_OnlineProcessStatusVals[val];
            return auditRetDesc;
        }
        return auditRetDesc
    } catch (e) {
        alert(scriptError);
    }
}

function buildUBSTxnXml() {
    try {
        var ubsXML = '<?xml version="1.0" encoding="UTF-8"?>';
        var ubsStartIndex = 0;
        var ubsClosingIndex = 0;
        //   var xmlns = "http://fcubs.iflex.com/service/FCREQ";
        var xmlns = "";
        /*
        try
        {
            var ubsXMLDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
        } catch(e)
        {
            var ubsXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
        }
        ubsXMLDOM.async = false;
        ubsXMLDOM.resolveExternals = true;
        */
        var ubsXMLDOM = loadXMLDoc(ubsXML);
        if (ubsXMLDOM != null) {
            //ubsXMLDOM.loadXML(ubsXML);
            //Create the UBS XML DOM.
            //ubsXMLDOM.loadXML("<FCUBS_REQ_ENV/>");
            ubsXMLDOM = loadXMLDoc("<FCUBS_REQ_ENV/>");
            var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
            //ubsnode.setAttribute("xmlns", xmlns);
            var headerNode = ubsXMLDOM.createElement("FCUBS_HEADER");
            ubsnode.appendChild(headerNode);
            var sourceNode = ubsXMLDOM.createElement("SOURCE");
            headerNode.appendChild(sourceNode);
            var ubscompNode = ubsXMLDOM.createElement("UBSCOMP");
            headerNode.appendChild(ubscompNode);
            /*	var msgIdnode = ubsXMLDOM.createNode("element","MSGID",xmlns);
		headerNode.appendChild(msgIdnode);*/
            /*var correlIdnode = ubsXMLDOM.createNode("element","CORRELID",xmlns);
		headerNode.appendChild(correlIdnode);*/
            var userIdnode = ubsXMLDOM.createElement("USERID");
            headerNode.appendChild(userIdnode);
            var branchNode = ubsXMLDOM.createElement("BRANCH");
            headerNode.appendChild(branchNode);
            var moduleidNode = ubsXMLDOM.createElement("MODULEID");
            headerNode.appendChild(moduleidNode);
            var serviceNode = ubsXMLDOM.createElement("SERVICE");
            headerNode.appendChild(serviceNode);
            var opnode = ubsXMLDOM.createElement("OPERATION");
            headerNode.appendChild(opnode);
            var multitripNode = ubsXMLDOM.createElement("MULTITRIPID");
            headerNode.appendChild(multitripNode);
            var funcIdnode = ubsXMLDOM.createElement("FUNCTIONID");
            headerNode.appendChild(funcIdnode);
            /*var srcusrIdnode = ubsXMLDOM.createNode("element","SOURCE_USERID",xmlns);
	headerNode.appendChild(srcusrIdnode);*/
            var actionNode = ubsXMLDOM.createElement("ACTION");
            headerNode.appendChild(actionNode);
            var msgstatusNode = ubsXMLDOM.createElement("MSGSTAT");
            headerNode.appendChild(msgstatusNode);
            //ADDED by SAIDUL TO ADD THE MODULE ID
            var bodyNode = ubsXMLDOM.createElement("FCUBS_BODY");
            ubsnode.appendChild(bodyNode);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[0], "FCJBPEL");
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[2], mainWin.UserId);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[3], mainWin.CurrentBranch);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[1], "FCUBS");
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[8], functionId);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[9], gAction);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[10], "SUCCESS");
            //added by Saidul to include MODULEID in request header
            var module = functionId.substring(0, 2);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[4], module);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[5], "FCUBSAccService");
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[6], "CreateCustAcc");
            ubsXMLDOM.documentElement.childNodes[1].appendChild(dbDataDOM.documentElement.cloneNode(true));
            return ubsXMLDOM;
        }
    } catch (e) {
        alert(scriptError);
    }
}

function show_remarks() {
    try {
        var dlgLeft = 100;
        var dlgTop = 50;
        var dlgArg = new Object();
        dlgArg.curWin = window;
        dlgArg.comments = "";
        w = window.showModalDialog("BPELRemark.jsp", dlgArg, "center:yes; dialogHeight:180px; dialogWidth:400px; help:no; resizable:no; scroll:no; status:no;");
        return dlgArg.comments;
    } catch (e) {
        alert(scriptError);
    }
}

function displayResponse_validate(messageNode, msgStatus) {
    try {
        var message = "";
        var returnVal = false;
        if (!msgStatus || typeof (msgStatus) == 'undefined') {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        }
        if (messageNode && selectSingleNode(messageNode, "//FCUBS_ERROR_RESP")) {
            var firstErrNode = selectSingleNode(messageNode, "//FCUBS_ERROR_RESP");
        }
        if (messageNode && selectSingleNode(messageNode, "//FCUBS_WARNING_RESP")) {
            var firstWarNode = selectSingleNode(messageNode, "//FCUBS_WARNING_RESP");
        }
        var type;
        if (msgStatus == 'WARNING') {
            var type = "O";
        } else if (msgStatus == 'FAILURE') {
            var type = "F";
        }
        if (type == "F") {
            if (firstErrNode) {
                var messageNodes = selectNodes(firstErrNode, "//ERROR");
                for (var index = 0; index < messageNodes.length; index++) {
                    var ecode = "";
                    if (selectSingleNode(messageNodes[index], "ECODE")) {
                        ecode = getNodeText(selectSingleNode(messageNodes[index], "ECODE"));
                    }
                    var edesc = "";
                    if (selectSingleNode(messageNodes[index], "EDESC")) {
                        edesc = getNodeText(selectSingleNode(messageNodes[index], "EDESC"));
                    }
                    // if(ecode != '' && edesc != ''){
                    if (ecode != '') {
                        var msg = ecode + " " + edesc;
                        message = message + msg + "~";
                    }
                }
                returnVal = ShowErrorDialog(type, message);
            }
        } else {
            if (firstWarNode) {
                var messageNodes = selectNodes(firstWarNode, "//WARNING");
                for (var index = 0; index < messageNodes.length; index++) {
                    var wcode = "";
                    if (selectSingleNode(messageNodes[index], "WCODE")) {
                        wcode = getNodeText(selectSingleNode(messageNodes[index], "WCODE"));
                    }
                    var wdesc = "";
                    if (selectSingleNode(messageNodes[index], "WDESC")) {
                        wdesc = getNodeText(selectSingleNode(messageNodes[index], "WDESC"));
                    }
                    //if(wcode != '' && wdesc != ''){
                    if (wcode != '') {
                        var msg = wcode + " " + wdesc;
                        message = message + msg + "~";
                    }
                }
                returnVal = ShowErrorDialog(type, message);
            }
        }
        return returnVal;
    } catch (e) {
        alert(scriptError);
    }
}

function fnBPELDisplayResponse(messageNode, msgStatus) {
    try {
        var message = "";
        var returnVal = false;
        if (!msgStatus || typeof (msgStatus) == 'undefined') {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        }
        if (messageNode && selectSingleNode(messageNode, "//FCUBS_ERROR_RESP")) {
            var firstErrNode = selectSingleNode(messageNode, "//FCUBS_ERROR_RESP");
        }
        if (messageNode && selectSingleNode(messageNode, "//FCUBS_WARNING_RESP")) {
            var firstWarNode = selectSingleNode(messageNode, "//FCUBS_WARNING_RESP");
        }
        var type;
        if (msgStatus == 'WARNING') {
            var type = "O";
        } else if (msgStatus == 'FAILURE') {
            var type = "F";
        }
        if (type == "F") {
            if (firstErrNode) {
                var messageNodes = selectNodes(firstErrNode, "//ERROR");
                for (var index = 0; index < messageNodes.length; index++) {
                    var ecode = "";
                    if (selectSingleNode(messageNodes[index], "ECODE")) {
                        ecode = getNodeText(selectSingleNode(messageNodes[index], "ECODE"));
                    }
                    var edesc = "";
                    if (selectSingleNode(messageNodes[index], "EDESC")) {
                        edesc = getNodeText(selectSingleNode(messageNodes[index], "EDESC"));
                    }
                    // if(ecode != '' && edesc != ''){
                    if (ecode != '') {
                        var msg = ecode + " " + edesc;
                        message = message + msg + "~";
                    }
                }
                returnVal = ShowErrorDialog(type, message);
            }
        } else {
            if (firstWarNode) {
                var messageNodes = selectNodes(firstWarNode, "//WARNING");
                for (var index = 0; index < messageNodes.length; index++) {
                    var wcode = "";
                    if (selectSingleNode(messageNodes[index], "WCODE")) {
                        wcode = getNodeText(selectSingleNode(messageNodes[index], "WCODE"));
                    }
                    var wdesc = "";
                    if (selectSingleNode(messageNodes[index], "WDESC")) {
                        wdesc = getNodeText(selectSingleNode(messageNodes[index], "WDESC"));
                    }
                    //if(wcode != '' && wdesc != ''){
                    if (wcode != '') {
                        var msg = wcode + " " + wdesc;
                        message = message + msg + "~";
                    }
                }
                returnVal = ShowErrorDialog(type, message);
            }
        }
        return returnVal;
    } catch (e) {
        alert(scriptError);
    }
}

function fnBPELvalidate() {
    try {
        var old_gAction = gAction;
        gAction = 'BPELVALIDATE';
        // StageComments =   show_remarks();
        debugs("Validating and building request XML for BPEL validation", "");
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        var temp_gAction = '';
        temp_gActionHold = gAction;
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode = "";
            var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
            if (msgStatus == 'FAILURE') {
                l_xPath += "FCUBS_ERROR_RESP";
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                l_xPath += "FCUBS_WARNING_RESP";
            }
            messageNode = selectSingleNode(fcjResponseDOM, l_xPath);
            if (msgStatus == 'WARNING') {
                //   var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
                //   setDataXML(pureXMLDOM.xml);
                //     showData(dbStrRootTableName, 1);
            }
            if (msgStatus != "SUCCESS") var returnVal = fnBPELDisplayResponse(messageNode, msgStatus);
            if (msgStatus == 'FAILURE') {
                gAction = old_gAction;
                return false;
            }
        } else {
            alert(lblProcessingFailed);
            gAction = old_gAction;
            return false;
        }
        if (msgStatus == "SUCCESS" || (msgStatus == "WARNING" && returnVal == "OK")) {
            gAction = old_gAction;
            return true;
        } else if (msgStatus == "WARNING" && returnVal != "OK") {
            gAction = old_gAction;
            return false;
        }
    } catch (e) {
        alert(scriptError);
    }
}

function fnBPELOk() {
    //alert('In fnBPELOk');
    try {
        window.focus();
        appendData(document.getElementById("TBLPageALL"));
        if (typeof (l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") appendData(document.getElementById("TBLPage" + l_HeaderTabId));
        if (screenType == 'P' || screenType == 'T') {
            if (txnXmlDOM != null && getXMLString(txnXmlDOM) != "") {
                gOperation = getNodeText(selectSingleNode(txnXmlDOM, "//fcubs:txnIdentification/fcubs:operation"));
            }
        }
        if (!fnPreSave()) {
            var validate = mainWin.ValidateFlag;
            if (validate == 'N') {
                debugs("No Validation at Client Side", "");
            }
            if (mainWin.ValidateFlag == 'Y') {
                return;
            }
        }
        if (gValidateProcess == 'Y') {
            if (!fnBPELvalidate()) return false;
        }
        deleteFlag = "N";
        dbdomreq[gmasterFunctionID] = getXMLString(dbDataDOM);
        fcjRequestDOM = buildTransactionXML();
        if (fnSaveTxnXml()) {
            fnPostSave();
            return true;
        } else return false;
    } catch (e) {
        alert(scriptError);
    }
}

function fnBPELCancel() {
    try {
        if (screenType == "P" && deleteFlag == "Y" && typeof (dlgArg.isChild) == "undefined") {
            var serverURL = "FCClientHandler";
            try {
                var objHTTP = new ActiveXObject("MSXML2.XMLHTTP.6.0");
            } catch (e) {
                var objHTTP = new ActiveXObject("MSXML2.XMLHTTP.4.0");
            }
            var responseFromServer = null;
            var objHTTP = createHTTPActiveXObject();
            taskSearchXML = "<TaskRequest OP = 'INSTANCEDELETE'>";
            taskSearchXML = taskSearchXML + "<InstanceId>" + getNodeText(selectSingleNode(txnXmlDOM, "//fcubs:txnId")) + "</InstanceId>";
            taskSearchXML = taskSearchXML + "</TaskRequest>";
			try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
            objHTTP.open("POST", serverURL, false); // Open the Connection to the Server
            objHTTP.setRequestHeader("FUNCTIONID", "");
            objHTTP.setRequestHeader("OPERATION", "BPELACTION");
            objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
            objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
            objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
            objHTTP.send(taskSearchXML);
			} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
             catch(exp){
                mainWin.handleNetWorkErr(exp);
              } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
            mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                taskListXML = objHTTP.responseXML;
                var response = getXMLString(taskListXML.documentElement.lastChild);
            }
        }
        if (gAction == "MODIFY") {
            releaseLock();
        }
        gAction = "";
        //dbDataDOM.loadXML("");
        dbDataDOM = null;
        isExitTriggered = true;
        dlgArg.mainWin.fnExit(window);
    } catch (e) {
        alert(scriptError);
    }
}

function fnSubscreenBPELOk() {
    //alert('In fnSubscreenBPELOk');
    try {
        if (typeof (dlgArg.isChild) != "undefined") {
            appendData(document.getElementById('TBLPage' + strCurrentTabID));
            window.focus();
            if (typeof (l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") appendData(document.getElementById("TBLPage" + l_HeaderTabId));
            if (typeof (gProcessName) != "undefined" && trim(gProcessName) != "") {
                if (txnXmlDOM != null && getXMLString(txnXmlDOM) != "") {
                    gOperation = getNodeText(selectSingleNode(txnXmlDOM, "//fcubs:txnIdentification/fcubs:operation"));
                }
            }
            if (!fnPreSave()) {
                var validate = mainWin.ValidateFlag;
                if (validate == 'N') {
                    debugs("No Validation at Client Side", "");
                }
                if (mainWin.ValidateFlag == 'Y') {
                    return;
                }
            }
            if (gValidateProcess == 'Y') {
                if (!fnBPELvalidate()) return false;
            }
            dlgArg.domArray[gmasterFunctionID] = getXMLString(dbDataDOM);
            fnBPELCancel();
        } else {
            fnBPELOk();
        }
    } catch (e) {
        fnSetExitButton(true);
    }
}
//function fnSubscreenBPELCancel()
//{}
function fnShowBPELSubscreen(functionId, ScreenName, dlgArg) {
    try {
        dlgArg.isChild = 'Y';
        dlgArg.screenArgs['SCREEN_NAME'] = ScreenName;
        dlgArg.screenArgs['FUNCTION_ID'] = functionId;
        dlgArg.domArray = dbdomreq;
        var timeStamp = getDateObject();
        var newwin = dlgArg.mainWin.showModalDialog("SMSStartLogServlet?funcid=" + functionId + "&uiName=&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime(), dlgArg, "dialogTop:74px;dialogLeft:253px; dialogHeight:480px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no");
        dbdomreq = dlgArg.domArray;
    } catch (e) {
        fnSetExitButton(true);
    }
}

function fnBPELLoad() {
    debugs("In fnBPELLoad", "");
    try {
        if (typeof (dlgArg.isChild) != "undefined") {
            var action = dlgArg.screenArgs["ACTION"];
            if (action == "NEW" && dlgArg.domArray[gmasterFunctionID] == undefined) {
                gAction = action;
                fnNew();
            } else if (action == "NEW" && dlgArg.domArray[gmasterFunctionID] != undefined) {
                gAction = action;
                enableForm();
                dbDataDOM.loadXML(dlgArg.domArray[gmasterFunctionID]);
                showData(dbStrRootTableName, 1);
            } else if (action == "MODIFY") {
                resetIndex(); ////17-01-2008 change 
                for (var innerIndex = 0; innerIndex < queryFields.length; innerIndex++) {
                    document.getElementById(queryFields[innerIndex]).readOnly = false;
                    document.getElementById(queryFields[innerIndex]).value = dlgArg.queryFieldsValue[innerIndex];
                }
                gAction = 'EXECUTEQUERY';
                fcjRequestDOM = buildUBSXml();
                fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
                if (fcjResponseDOM) {
                    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                    if (msgStatus == 'FAILURE') {
                        gAction = 'NEW';
                        fnNew();
                    } else if (msgStatus == "SUCCESS") {
                        var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                        setDataXML(getXMLString(pureXMLDOM));
                        showData(dbStrRootTableName, 1);
                        gAction = action;
                        disableForm();
                        fnEnableAmendFields();
                    }
                }
            }
            /* else if(action== "MODIFY" &&   dlgArg.domArray[uiXML]!=undefined)
            {
                gAction = action;
                dbDataDOM.loadXML(dlgArg.domArray[uiXML]);
                showData(dbStrRootTableName, 1);
                disableForm();
                fnEnableAmendFields();
            }
            */
            document.getElementsByName("BTN_OK")[0].onclick = fnSubscreenBPELOk;
        } else {
            gAction = "NEW";
            fnNew();
            if (txnXmlDOM) fnBPELBuildDBDOMReq();
            if (dbdomreq[gmasterFunctionID]) dbDataDOM.loadXML(dbdomreq[gmasterFunctionID]);
            showTabData();
            document.getElementsByName("BTN_OK")[0].onclick = fnBPELOk;
        }
        fnSetExitButton(true);
        fnEnableElement(document.getElementsByName("BTN_OK")[0]);
        document.getElementsByName("BTN_EXIT_IMG")[0].onclick = fnBPELCancel;
    } catch (e) {
        fnSetExitButton(true);
        alert(scriptError);
    }
}

function fnBPELBuildDBDOMReq() {
    try {
        //for multiple response
        var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
        txnXmlDOM.setProperty("SelectionNamespaces", ns);
        var l_Index = txnXmlDOM.selectNodes("//FUNCTIONID").length;
        var uiXMLIndex;
        for (i = 0; i < l_Index; i++) {
            uiXMLIndex = getNodeText(selectNodes(txnXmlDOM, "//FCUBS_HEADER/FUNCTIONID")[i]);
            //actionIndex=txnXmlDOM.selectSingleNode("//fcubs:moduleData").childNodes[i].childNodes[0].childNodes[9].text;
            dbdomreq[uiXMLIndex] = getXMLString(selectSingleNode(txnXmlDOM, "//fcubs:moduleData").childNodes[i].childNodes[1].childNodes[0]);
        }
    } catch (e) {
        alert(scriptError);
    }
}

function fnBPELHold() {
    debugs("In fnBPELHold", "");
    try {
        var oldValidateProcess = gValidateProcess;
        gValidateProcess = "N";
        holdFlag = "Y";
        fnBPELOk();
        holdFlag = "N";
        gValidateProcess = oldValidateProcess;
    } catch (e) {
        alert(scriptError);
    }
}
//bpelaudit
function fnBpelAudit() {
    debugs("In fnBpelAudit", "");
    try {
        var dlgLeft = 50;
        var dlgTop = 50;
        var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
        txnXmlDOM.setProperty("SelectionNamespaces", ns);
        dlgArg.auditxmlObj = selectSingleNode(txnXmlDOM, "//fcubs:txnAuditDetails");
        w = window.showModalDialog("BPELAudit.jsp", dlgArg, "center:yes; dialogHeight:400px; dialogWidth:750px; help:no; resizable:no; scrollbar:no; status:no;");
    } catch (e) {
        alert(scriptError);
    }
}

function fnFocusWait() {
    var t = setTimeout("fnFocus()", 2000);
}

function fnHideProcessWait() {
    try {
        if (ShowSummary == "TRUE") {
            var t = setTimeout("dlgArg.mainWin.frames['FrameMenu'].fnHideProcess();", 4000);
        } else {
            var t = setTimeout("dlgArg.mainWin.frames['FrameMenu'].fnHideProcess();", 1000);
        }
    } catch (e) {
        alert(scriptError);
    }
}

function fnSaveSuccess() {
    showToolbar(functionId, '', '');
    try {
        fnPostSave();
    } catch (e) {
        debugs("Failed in fnPostSave", "");
    }
    showToolbar(functionId, '', '');
    fnPasteControlFieldValues(); // 16/09/08 Added for isControl Data source
    return;
}

function fnSaveFailure() {
    return;
}

function fnUnlockSuccess() {
    return;
}

function fnUnlockFailure() {
    return;
}

function setActionTime(inTime, functionId, action) {
    if (mainWin.mBean_required == "N") return;
    var t = getDateObject();
    var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    if (inTime) {
        var outTime = time;
        mainWin.fnPopulateMbeanData(inTime, outTime, functionId, action);
    } else {
        return t;
    }
}	
//REDWOOD_CHANGES
function displayAuditSection(){ //OJET Migration
    document.getElementById("auditPop").open("#BTN_AUDIT");
}
function cancelListener() {
    document.getElementById("auditPop").close();
}function fnBindScreenElements(tabsObj) {
    if(!tabsObj){
      tabsObj = document;  
    }
    if ((getBrowser().indexOf("SAFARI") !=  - 1) || (getBrowser().indexOf("CHROME") !=  - 1) ||  (getBrowser().indexOf("FIREFOX") !=  - 1) || (getBrowser().indexOf("OPERA") !=  - 1)) {
        //ie11 changes//12.0.4 summary performance chages
        try {
        
        
      
            var scriptElements = tabsObj.getElementsByTagName("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));
                    fnEval();
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 start*/
    else if (getBrowser().indexOf("IE") !=  - 1) {
        //ie11 changes
        try {
            var scriptElements = tabsObj.getElementsByTagName("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].defer == true) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(scriptElements[i].innerHTML);
                    fnEval();
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    }
      
    
     try {
     if( tabsObj.getElementsByTagName("template")){
         for(var j = 0;j< tabsObj.getElementsByTagName("template").length;j++){
            var scriptElements = tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));
                    fnEval();
                    
                }
            }
                    fnBindSelectElements(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-select-single"));
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-button"),"oj-button","onclick","on-oj-action");
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-select-single"),"oj-select-single","onchange","on-oj-value-action");
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-radioset"),"oj-radioset","onchange","on-value-changed");
             tabsObj.getElementsByTagName("template")[j].innerHTML =  tabsObj.getElementsByTagName("template")[j].innerHTML.replace(new RegExp("readonly_temp", 'g'), "readonly");
         }
         
     }
     
         
        }
        catch (e) {
            alert(e.message);
        }
        fnBindSelectElements();
       fnUpdateEventActions(null,"oj-button","onclick","on-oj-action");
       fnUpdateEventActions(null,"oj-select-single","onchange","on-oj-value-action");
       fnUpdateEventActions(null,"oj-radioset","onchange","on-value-changed");
    /*fnBindSelectElements(document.getElementsByTagName("template")[0].content.querySelectorAll("oj-select-single"));
    document.getElementsByTagName("template")[0].innerHTML =document.getElementsByTagName("template")[0].innerHTML.replace(new RegExp("value_temp", 'g'), "value");
    document.getElementsByTagName("template")[0].innerHTML =  document.getElementsByTagName("template")[0].innerHTML.replace(new RegExp("readonly_temp", 'g'), "readonly");*/


}

function fnBindSelectElements(obj) {
    var selectElem;
    if (obj != null) {
        selectElem = obj;//.getElementsByTagName("oj-select-single");
    }
    else {
        selectElem = document.getElementsByTagName("oj-select-single");
    }
    for (var cnt = 0;cnt < selectElem.length;cnt++) {
        if (selectElem[cnt].id != ""  && selectElem[cnt].getAttribute("adv_search")== null) {
        var dbt = selectElem[cnt].getAttribute("DBT");
        if(dbt==null){
            dbt =  selectElem[cnt].getAttribute("CONTROL_DBT");
        }
        //REDWOOD_35313329 starts
        if(dbt==null || dbt=='')
           dbt = selectElem[cnt].getAttribute("id").split("__")[0];
        //REDWOOD_35512089 starts
		var fldName = selectElem[cnt].getAttribute("DBC");
        if(fldName==null || fldName == ''){ 
         fldName = selectElem[cnt].getAttribute("NAME");
        }
		//REDWOOD_35512089 Ends
        //REDWOOD_35313329 ends
        var fldId = dbt+"__"+fldName;
            selectElem[cnt].setAttribute("data", "[[arrProvider" +fldId + "]]");
        try {
                var parentVal = "";
                while (typeof (isDetailed) == "undefined") {
                    parentVal += "parent."
                    var fnEval = new Function("return " + parentVal + "isDetailed");
                    isDetailed = fnEval();
                }
                if (isDetailed && selectControl[fldId]) {
                    for (var i = 0;i < selectControl[fldId].length;i++) {
                        if (selectControl[fldId][i].defaultValue && selectElem[cnt].getAttribute("ME")!='Y') {
                            selectElem[cnt].setAttribute("value", selectControl[fldId][i].defaultValue);
                        break;
                    }
    }

}

        }
        catch (e) {
            console.log(e);
        }
             if(selectElem[cnt].getAttribute("ME")=='Y'){
                selectElem[cnt].setAttribute(":id", "[['" + fldId + "RC'+row.index]]");
            }
        }

    }
}

function fnUpdateEventActions(obj,elemntType,eventName,actionName) {
    var element;
    if (obj != null) {
        element = obj;//.getElementsByTagName("oj-select-single");
    }
    else {
        element = document.getElementsByTagName(elemntType);
    }
    for (var cnt = 0;cnt < element.length;cnt++) {
        if (element[cnt].id != "WNDbuttonsMin" && element[cnt].id != "WNDbuttons") {
            var onClickMethods = element[cnt].getAttribute(eventName);
            var consolidatedMethod = "";
            if (onClickMethods) {
                element[cnt].removeAttribute(eventName);
                consolidatedMethod = "[[function() {" + onClickMethods + "}.bind(null)]]";
                element[cnt].setAttribute(actionName, consolidatedMethod);
            }
        }

    }
    
    
}	
//REDWOOD_CHANGES