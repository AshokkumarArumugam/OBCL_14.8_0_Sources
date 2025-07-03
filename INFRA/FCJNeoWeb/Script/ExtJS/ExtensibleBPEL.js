/*----------------------------------------------------------------------------------------------------
 **
 ** File Name    : ExtensibleBPEL.js
 **
 ** Module       : FCJNeoWeb
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
 
**  Last Modified By   : Subhashini Srinivasan
**  Last modified on   : 02-May-2016
**  Full Version       : FCUBS_12.2.0.0
**  Search String 	   : 23187928
**  Reason			   : Screen gets enabled while launching from Completed Queue, since mainWin.taskStatus is reset in finally block of fnLoad(). Fix given to backup the taskStatus in a global variable and use it in the Kernel JS files. Fix given for disabling callforms by default while taskstatus is not Acquired or null string
**
**  Last Modified By   : Priyanka Vijai
**  Last modified on   : 21-Nov-2016
**  Retro String       : 23187928
**  Search String      : 9NT1606_12_2_RETRO_12_0_1_23657448  
**  Reason             : fix provided in adding the Name spaces for the Request XML DOM. 

**  Modified By          : Neethu Sreedharan
**  Modified On          : 19-Jun-2017
**  Modified Reason      : Changes done to build the branch info in the txnBranch array in case of 
                           Multibranch operation
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_4_RETRO_12_0_2_26231030
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 16-Nov-2017
**  Reason               : When taskstatus is ASSIGNED, setting gAction to VIEW since null value was not loading the tabs with ME blocks.
**  Search String        : 9NT1606_12_4_RETRO_12_4_27041930
 ----------------------------------------------------------------------------------------------------
 */
/*var coreFnLoad = fnLoad;	//REDWOOD_CHANGES
var coreFnSave = fnSaveAll;
var coreFnExit = fnExitAll;
var coreFnNew = fnNew;
var coreBuildUBSXml = buildUBSXml;
var coreFnPost = fnPost;
var coreAppendTabData = appendTabData;
var coreAddHeaderNode = addHeaderNode;
var corefnValidate = fnValidate;
var corefnPickUpSubSystem = fnPickUpSubSystem;/*23653210  fix*/
/*			//REDWOOD_CHANGES
var coreFnProcessResponse = fnProcessResponse;
var coreFnEventsHandler = fnEventsHandler;
var coreFnSetExitButton = fnSetExitButton;
var coreFnSubScreenMain = fnSubScreenMain;

var coreFnProcessMsgNode = fnProcessMsgNode;

var coreFncloseAlerts = closeAlerts;
var coreFnCloseAlertWin = fnCloseAlertWin;
*/		   //REDWOOD_CHANGES

var workflowrefno = "";
var canDeleteInstance = true;
var taskXml = "";
var dbDataDomList = new Object();
var serverURL = "FCClientHandler";
var gDuplicateTaskCheckReqd = "";
var gBpelSave = false;
var gTaskCopy = false;
var gValidateProcess = false;
var gDuplicateTaskCheckFlag = false;
var gDuplicateCurCheckFlag = false;
var handleFunctionIdEvents = true;
var gInstanceId;
var gProcessName;
var acquireDate = "";
var gCurrMasterFuncId = "";
var gOperation = "";
var gPayloadOperations = new Array();
var gFuncIdMap = new Array();
var gBpelCall = false;

var gResponseXML = "";
var oldAction = "";
var gBpelSaveValSkip = false;
var gExternalRemarksRequired = false; //12.0.2 Changes
var comments = ""; //12.0.2 Changes
var gRemarksAction = ""; //12.0.2 Changes
var gTaskStatus="";//SFR#23187928
function fnFocus() {
    disableAllTBButtons();
    if (mainWin.document.getElementById(seqNo) != null && mainWin.document.getElementById(seqNo) != "") {
        if (mainWin.taskStatus == 'ASSIGNED') {
            window.unmaskTitle = true;
        }
        mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);
    }
    mainWin.document.getElementById("fastpath").value = functionId;
    if (mainWin.taskStatus == 'ASSIGNED') {
        window.unmaskTitle = true;
        showToolbar('', '', '');
    } else {
        if (gAction != '') {
            enableSave();
            fnEnableHoldButton();
        }
    }
}

function fnCallBackEnd(actionCd,alertSuccessMsg)
{
	var prevAction = gAction;    
	var prevBpelSave = gBpelSave;
	var prevValProcess = gValidateProcess;
	var prevBpelCall = gBpelCall;
	var prevDispAlert = gDispAlertOnSuccess;
	if (document.getElementById("BLK_PROCESS_AUDIT__OUTCOME"))
	{
		var stgOutcome = document.getElementById("BLK_PROCESS_AUDIT__OUTCOME").value;
		var stgPrevRem = document.getElementById("BLK_PROCESS_AUDIT__PREV_REMARK").value;
		var stgCurrRem = document.getElementById("BLK_PROCESS_AUDIT__REMARK").value;
	}
	gBpelSave = false;
	gValidateProcess = false;
	gBpelCall = false;
	if(alertSuccessMsg != null && alertSuccessMsg != "")
	{
		gDispAlertOnSuccess = alertSuccessMsg;
	}
	else
	{
	gDispAlertOnSuccess = "N";
	}	
	gAction = 'NEW';	
	appendData();
	gAction = actionCd;    	
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
	fnProcessResponse();		
	gAction = prevAction;
	gBpelSave = prevBpelSave;
	gValidateProcess = prevValProcess;
	gBpelCall = prevBpelCall;	
       gDispAlertOnSuccess = prevDispAlert;	
	showData();
	if (document.getElementById("BLK_PROCESS_AUDIT__OUTCOME"))
	{
		document.getElementById("BLK_PROCESS_AUDIT__OUTCOME").value = stgOutcome;
		document.getElementById("BLK_PROCESS_AUDIT__PREV_REMARK").value = stgPrevRem;
		document.getElementById("BLK_PROCESS_AUDIT__REMARK").value = stgCurrRem;
	}
	fnUpdateTxnBrnVariables(g_txnBranch); //9NT1606_12_4_RETRO_12_0_2_26231030 changes 
	return true;
}
/* Wrapped infra functions */
function getTaskDetails(taskId) {
    var taskDetailsRequest = '<TaskRequest OP="TASKDETAILS">';
    taskDetailsRequest += '<TaskId>' + taskId + '</TaskId>';
    taskDetailsRequest += '</TaskRequest>';
    var objHttp = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    var result = objHttp.send(taskDetailsRequest);
    var csrfNode = selectSingleNode(objHttp.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        if (objHttp.statusText == "OK") taskXml = getXMLString(objHttp.responseXML);
        else return false;
        return true;
    }
    return true;
}

fnLoad = function (xmlFileName, xslFileName) {
    gBpelCall = true;
    try {
        if (masterFuncId == "") masterFuncId = functionId;
        coreFnLoad(xmlFileName, xslFileName);
        if (document.getElementById("BLK_PROCESS_AUDIT__WF_REF_NO")) {
            document.getElementById("BLK_PROCESS_AUDIT__WF_REF_NO").disabled = false;
            document.getElementById("BLK_PROCESS_AUDIT__WF_REF_NO").style.width = "155px";
            document.getElementById("BLK_PROCESS_AUDIT__WF_REF_NO").disabled = true;
        }
        /* BPEL screen load functionality */
        gAction = "NEW";
        coreFnNew();
	//SFR#23187928 STARTS
    gTaskStatus= mainWin.taskStatus;
    if(gTaskStatus != '' && gTaskStatus != 'ACQUIRED')
	//9NT1606_12_4_RETRO_12_4_27041930 Changes Starts
	//gAction ="";
	{
	if(gTaskStatus == 'ASSIGNED') 
	  gAction = "VIEW"; 
	else
	gAction ="";  
	}
	//9NT1606_12_4_RETRO_12_4_27041930 Changes Ends
    //SFR#23187928 ENDS
        // Retrieve Task payload if main screen
        if (taskId && taskId != "") {
            if (getTaskDetails(taskId)) {
                var txnDomTemp = loadXMLDoc(taskXml);
				if (getBrowser().indexOf("IE") != -1)//ie11 changes 
                 txnDomTemp.setProperty("SelectionNamespaces", "xmlns:fcubs='http://fcubs.iflex.com'");
                 var taskBrn = getNodeText(selectSingleNode(txnDomTemp, "//fcubs:transaction/fcubs:txnIdentification/fcubs:branchCode"));
                if(taskBrn!=mainWin.CurrentBranch)
                   fnTxnBranch(taskBrn);
                fnBPELBuildDBDOMReq();
            }
            setOutcomeList();
        }
if((taskXml!=null)&&(taskXml!=""))
{
    var tempCpyDom = loadXMLDoc(taskXml);
	if (getBrowser().indexOf("IE") != -1)//ie11 changes 
   tempCpyDom.setProperty("SelectionNamespaces", "xmlns:fcubs='http://fcubs.iflex.com'");
    var copiedFnID ="";
   try
  {
   copiedFnID = getNodeText(selectSingleNode(tempCpyDom , "//fcubs:transaction/fcubs:additionalFields/fcubs:charField[@additional_field_name='COPYTASK']"));
   } catch(e) {
   copiedFnID ="";
  }
  if(copiedFnID==functionId)
  {
   gTaskCopy=true;
  }
   /*25502103  copy application number changes--start*/
  if (gTaskCopy && mainWin.taskStatus == 'ASSIGNED'){
        var txnIdNode = getNodeText(selectSingleNode(tempCpyDom, "//fcubs:txnId"));
    try{
      setNodeText(selectSingleNode(tempCpyDom, "//APPNO"), txnIdNode);
      taskXml = getXMLString(tempCpyDom);
    }catch (e){}
  }
  /*25502103  copy application number changes--ends*/
}
        var parentWin = fnGetParentWin();
        if (parentWin != "") {
            if (parentWin.parentWinParams.dbDataDomList) dbDataDomList = parentWin.parentWinParams.dbDataDomList;
        }
        if (setDbDataDom()) showData();
        setAuditDetails();
        if (mainWin.taskStatus == 'ASSIGNED') {
            disableForm();
            fnEnableAuditButton();
            window.unmaskTitle = true;
            showToolbar('', '', '');
        } else {
            try {
                fnScreenDefaults();
                 setRemarks();	  //14029894
                fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__OUTCOME"));
                if (document.getElementById("BLK_PROCESS_AUDIT__REMARK")) fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__REMARK"));
                fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__AUDIT"));
                fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY"));
            } catch (e) {}
        }
    } catch (e) {
        disableForm();
    } finally {
        gBpelCall = false;
	 mainWin.taskStatus = "";
         mainWin.status ="";
    }
	fnFocus();
    //document.getElementById("BTN_EXIT_IMG").focus();	//REDWOOD_CHANGES
}

function setAuditDetails() {
    // set Workflow Ref No
    var tempDom = loadXMLDoc(taskXml);
    if (tempDom != null) {
        if (getBrowser().indexOf("IE") != -1) tempDom.setProperty("SelectionNamespaces", "xmlns:fcubs='http://fcubs.iflex.com'");//ie11 changes
        var txnIdNode = selectSingleNode(tempDom, "//fcubs:txnId");
        var priority = selectSingleNode(tempDom, "//fcubs:transaction/@txnPriority");
        if (selectSingleNode(tempDom, "//fcubs:actionDateTime")) {
            var lastMod = getNodeText(selectSingleNode(tempDom, "//fcubs:actionDateTime"));
            var lastUsr = getNodeText(selectSingleNode(tempDom, "//fcubs:userId"));
        }
        if (txnIdNode) {
            if (document.getElementById("BLK_PROCESS_AUDIT__WF_REF_NO")) document.getElementById("BLK_PROCESS_AUDIT__WF_REF_NO").value = getNodeText(txnIdNode);
            else workflowrefno = getNodeText(txnIdNode);
        }
        // set priority
        if (priority) {
            if (document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY").type != 'hidden') {
                if ("High" == getNodeText(priority)) document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY").options[2].selected = true;
                else if ("Medium" == getNodeText(priority)) document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY").options[1].selected = true;
                else document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY").options[0].selected = true;
            } else {
                document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY").value = priority;
            }
        }

        if (document.getElementById("BLK_PROCESS_AUDIT__LSTMOD") && document.getElementById("BLK_PROCESS_AUDIT__LSTWRK")) {
            document.getElementById("BLK_PROCESS_AUDIT__LSTMOD").value = lastMod;
            document.getElementById("BLK_PROCESS_AUDIT__LSTWRK").value = lastUsr;
        }
    }
    if (document.getElementById("BLK_PROCESS_AUDIT__PREV_REMARK")) setRemarks();
    var auditButton = document.getElementById("BLK_PROCESS_AUDIT__AUDIT");
    if (auditButton) {
        addEvent(auditButton, 'onclick', "fnBpelAudit()");
    }
    //disable prev remarks
    var prevRemarkNode = document.getElementById("BLK_PROCESS_AUDIT__PREV_REMARK");
    if (prevRemarkNode) fnDisableElement(prevRemarkNode);
}

function setDbDataDom() {
    if (dbDataDomList && dbDataDomList[masterFuncId] && dbDataDomList[masterFuncId] != "") { // and data already present 
        dbDataDOM = loadXMLDoc(dbDataDomList[masterFuncId]);
		 /*25502103  copy application number changes--start*/
        if(gTaskCopy && mainWin.taskStatus == 'ASSIGNED'){
            dbDataDOM = loadXMLDoc(taskXml);
        }
         /*25502103  copy application number changes--end*/
        if (dbDataDOM != null) return true;
    }
    return false;
}

function setOutcomeList() {
    var outcomeObj = document.getElementById("BLK_PROCESS_AUDIT__OUTCOME");
    var outcomes;
    var outArray;
    if (outcomeObj) {
        var tempDom = loadXMLDoc(taskXml);
        if (tempDom != null) {
            if (getNodeText(selectSingleNode(tempDom, "//NEXTFUNCID")) != '' && getNodeText(selectSingleNode(tempDom, "//NEXTFUNCID")) != 'null' && getNodeText(selectSingleNode(tempDom, "//NEXTFUNCID")).indexOf("~") != 0) {
                outcomes = getNodeText(selectSingleNode(tempDom, "//SUBSTAGE_OUTCOMES"));
                outArray = outcomes.split('~');
                outcomeObj.options[0] = new Option("", "");
                outcomeObj.selectedIndex = 0;
                for (var i = 0; i < outArray.length; i++) {
                    if (outArray[i] !== "") outcomeObj.options[i + 1] = new Option(outArray[i].toUpperCase(), outArray[i].toUpperCase());
                }
            } else {
                var subStageOutcomes = getNodeText(selectSingleNode(tempDom, "//SUBSTAGE_OUTCOMES"));
                outcomes = getNodeText(selectSingleNode(tempDom, "//Outcome"));
                outArray = outcomes.split('~');
                outcomeObj.options[0] = new Option("", "");
                outcomeObj.selectedIndex = 0;
                var optionIndex = 1;
                for (var i = 0; i < outArray.length; i++) {
                    if (outArray[i].toUpperCase() == 'MOVENXT' || outArray[i].toUpperCase() == 'MOVEPREV' || outArray[i].toUpperCase() == 'AUTOMOVENXT') {
                        if (subStageOutcomes.indexOf(outArray[i]) == -1) {
                            continue;
                        }
                    }
                    if (outArray[i] !== "") {
                        outcomeObj.options[optionIndex] = new Option(outArray[i].toUpperCase(), outArray[i].toUpperCase());
                        optionIndex++;
                    }
                }
            }
        }
    }
    tempDom = null;
}
/*23653210  start*/
fnPickUpSubSystem = function (subsys, v_scrName, v_functionID, screenArgs) {
	gBpelCall=false;
	corefnPickUpSubSystem(subsys, v_scrName, v_functionID, screenArgs);
}
/*23653210  ends*/

buildUBSXml = function () {
    if (!gBpelCall) // Core function called if call is not from BPEL Infra
    return coreBuildUBSXml();
    if (gBpelCall && (gBpelSave || gValidateProcess)) {
        setgAction();
        return getTransactionXmlDom();
    }
}

function setgAction() {
    if (gBpelSave) gAction = "BPELSAVE";
    if (gValidateProcess) gAction = "BPELVALIDATE";
}

function validateOutcome() {
    var outcomeObj = document.getElementById("BLK_PROCESS_AUDIT__OUTCOME");
    var result = true;
    if (outcomeObj && outcomeObj.value == '') {
        mask();
        showAlerts(fnBuildAlertXML('CS-BPL001', 'I'), 'I');
        alertAction = "UNMASK";
        result = false;
    }
    return result;
}

fnValidate = function() {
	try
	{
		//eval("fnSetBpelSkipValidate()");
                var fnEval = new Function("fnSetBpelSkipValidate()");  
                fnEval();
	}
	catch(e){}
	if(!gBpelSaveValSkip)
	{
		if(!corefnValidate())
		return false; 
	}
	return true;
}
//12.0.2 Changes starts
fnSaveAll = function fnSaveRemarks()
{
	if(gExternalRemarksRequired)
        fnShowRemarks('SAVE');
    else
	   fnProcSaveAll();
}

fnProcSaveAll = function (v_scrName) {
//12.0.2 Changes  ends
    oldAction = gAction;
    if (typeof (strCurrentTabId) != 'undefined' && strCurrentTabId != "") {
        appendTabData(document.getElementById("TBLPage" + strCurrentTabId));
    }
    showAllData();
    gBpelCall = true;
    try {
        if (!validateOutcome()) return;
        setgAction();
        dbDataDomList[masterFuncId] = getXMLString(dbDataDOM);
        if ((gDuplicateTaskCheckReqd == 'Y')&&(!(gDuplicateCurCheckFlag ))) {
            gDuplicateTaskCheckFlag = true;
            gDuplicateCurCheckFlag = true;
            gOperation = 'DUPLICATETASKCHECK';
            appendData();
            var transactionDom = getTransactionXmlDom();
            gOperation = '';
            if (transactionDom) {
                setgAction();
				fcjRequestDOM = transactionDom;
                transactionDom = fnPost(transactionDom, serverURL, functionId, true);
                fcjResponseDOM = transactionDom;
                if (fnProcessResponse(getXMLString(transactionDom)) != "SUCCESS") {
                    gDuplicateTaskCheckFlag = false;
                    return;
                }
                gDuplicateTaskCheckFlag = false;
            }
        }
        else {
                      gDuplicateTaskCheckFlag = false;
            gDuplicateCurCheckFlag = false;
        }
//9NT1587 FCUBS1202 FCDB CASA dev changes starts
try
{
        if (!coreFnSave(v_scrName)) {
            gAction = oldAction;
            return;
        }
}
catch (e)
{
debugs(" BPEL coreFnSave: " + e.reason);
}
//ends
        canDeleteInstance = false; // on exit, the instance should not be deleted
        var parentWin = fnGetParentWin();
        if (parentWin != "" && parentWin.parentWinParams.bpelParentFunc && parentWinParams.bpelParentFunc != "" && parentWinParams.bpelParentFunc != functionId) { // is a child function
            // append the dbDataDOM object and the operation
            dbDataDomList[masterFuncId] = getXMLString(dbDataDOM);
            parentWin.unmask();
            fnExitAll();
            enableSave();
            fnEnableHoldButton();
        } else if (!(gBpelSave || gValidateProcess)) {
            if ((typeof (v_scrName) == "undefined" || v_scrName == '') && (parentSeqNo == "" || parentSeqNo == "null")) { // main screen save
                /* task payload updation */
                var transactionDom = getTransactionXmlDom();
                if (transactionDom) {
                    //gAction = "NEW"; // set here as its reset coreFnSave //1203_OR_CHANGES
                    gAction = "BPELNEW"; //12.1 Retro_Changes
                    transactionDom = fnPost(transactionDom, serverURL, functionId, true);
                    if (fnProcessResponse(getXMLString(transactionDom)) == "SUCCESS") {
                        dbDataDomList = null;
                        var outcomeObj = document.getElementById("BLK_PROCESS_AUDIT__OUTCOME");
                        if (outcomeObj && outcomeObj.value == 'AUTOMOVENXT') {
                            if (showNextStage()) return;
                        }
                    }
                }
            }
        }
    } catch (e) {
        debugs("BPEL fnSaveAll: " + e.reason);
    }
}

fnPost = function (fcjRequestDOM, servletURL, functionId, isBpelPost) {
    var callCoreFnPost = !gBpelCall || isBpelPost || (gBpelCall && (gBpelSave || gValidateProcess));
    if (callCoreFnPost) return coreFnPost(fcjRequestDOM, servletURL, functionId);
}

fnProcessMsgNode = function (msgStatus, v_Type, v_xPath) {
    if (!gBpelCall) {
        coreFnProcessMsgNode(msgStatus, v_Type, v_xPath);
    } else {
        return msgStatus;
    }
}

fnProcessResponse = function (responseXml) {
    if (!gBpelCall) {
        var result = coreFnProcessResponse();
        setAuditDetails();
        return result;
    }
    var success = true;
    if (responseXml || gBpelCall) {
        gResponseXML = responseXml;
        if (responseXml) {
            var txnDom = loadXMLDoc(responseXml);
        } else var txnDom = fcjResponseDOM;
        if (txnDom != null) {
            if (getBrowser().indexOf("IE") != -1) txnDom.setProperty("SelectionNamespaces", "xmlns:fcubs='http://fcubs.iflex.com'");//ie11 changes
			/* 25399703 */
			var typeNodeParent = selectSingleNode(txnDom, "//fcubs:transaction");
            //var typeNode = selectSingleNode(txnDom, "//fcubs:transaction").getAttribute("status");
			if (!typeNodeParent) {
				mask();
				showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
				alertAction = "UNMASK";
				return "FAILURE";
			}else{			
				var typeNode = typeNodeParent.getAttribute("status");
				/* 25399703 */
            var type = 'I';
            if (typeNode) {
                if (typeNode == 'SUCCESS') type = 'I';
                else if (typeNode == 'WARNING') {
                    type = 'O';
                } else if (typeNode == 'FAILURE') {
                    type = 'E';
                    success = false;
                    gAction = oldAction;
                }
            }
            if (type == 'I' && gDuplicateCurCheckFlag) {
                return "SUCCESS";
            }
            var exceptionsNode = selectSingleNode(txnDom, "//fcubs:exceptions");
            var action = displayException(exceptionsNode, type);
			}/* 25399703 */
        }  else {
            mask();
            showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
            alertAction = "UNMASK";
            return "FAILURE";
    }/* 25399703 */
    }
}


fnSetExitButton = function () {
    return true;
}

fnEventsHandler = function (actionFunction, arg) {
    var status = true;
    if (gBpelCall) {
        gBpelCall = false;
        if (handleFunctionIdEvents) status = coreFnEventsHandler(actionFunction, arg);
        gBpelCall = true;
    } else {
        if (handleFunctionIdEvents) status = coreFnEventsHandler(actionFunction, arg);
    }
    return status;
}

function addHeaderBodyToDom(tmpDom, currFunctionId, currMasterFuncId) {
    tmpDom = addHeaderNode(tmpDom);
    var headerNode = selectSingleNode(tmpDom, "//FCUBS_HEADER");
    var addlNode = tmpDom.createElement("ADDL");
    headerNode.appendChild(addlNode);
    //add addl node if the variable gPayloadSequence has value
    if (typeof (gPayloadSequence) != "undefined" && gPayloadSequence != '') {
        var paramNode = tmpDom.createElement("PARAM");
        addlNode.appendChild(paramNode);
        var nameNode = tmpDom.createElement("NAME");
        setNodeText(nameNode, "PAYLOADSEQ");
        paramNode.appendChild(nameNode);
        var valueNode = tmpDom.createElement("VALUE");
        setNodeText(valueNode, gPayloadSequence);
        paramNode.appendChild(valueNode);
    }
    if (currMasterFuncId && currMasterFuncId != '') {
        var paramNode = tmpDom.createElement("PARAM");
        addlNode.appendChild(paramNode);
        var nameNode = tmpDom.createElement("NAME");
        setNodeText(nameNode, "MASTERFUNCID");
        paramNode.appendChild(nameNode);
        var valueNode = tmpDom.createElement("VALUE");
        setNodeText(valueNode, currMasterFuncId);
        paramNode.appendChild(valueNode);
    }
    //12.0.2 Changes Starts
    if (typeof (comments) != "undefined" && comments != '') {
        var paramNode = tmpDom.createElement("PARAM");
        addlNode.appendChild(paramNode);
        var nameNode = tmpDom.createElement("NAME");
        setNodeText(nameNode, "COMMENTS");
        paramNode.appendChild(nameNode);
        var valueNode = tmpDom.createElement("VALUE");
        setNodeText(valueNode, comments);
        paramNode.appendChild(valueNode);
    }
	//12.0.2 Changes Ends
    setNodeText(selectSingleNode(tmpDom, "//FUNCTIONID"), currFunctionId);
    var ubsnode = selectSingleNode(tmpDom, "//FCUBS_REQ_ENV");
    var bodyNode = tmpDom.createElement("FCUBS_BODY");
    ubsnode.appendChild(bodyNode);
    return tmpDom;
}

function getProperties(obj) {
    var i, v;
    var count = 0;
    var props = [];
    if (typeof (obj) == 'object') {
        for (i in obj) {
            v = obj[i];
            if (v !== undefined && typeof (v) !== 'function') {
                props[count] = i;
                count++;
            }
        }
    }
    return props;
}


function buildMultipleUBSXml(buildPureXmlPayload) {
    var dbDataDOMCopy = "";
    dbDataDOMCopy = loadXMLDoc(getXMLString(dbDataDOM));
    var msgxmlCopy = msgxml;
    var functionIdCopy = functionId;
    var ubsXmlDom = "";
    //header and body for composite payload
    ubsXmlDom = addHeaderBodyToDom(ubsXmlDom, functionId);
    var oldgAction = gAction;
    gAction = 'NEW';
    var currFuncId = "";
    for (eachItem in dbDataDomList) {
        var eachDom = "";
        if (typeof (gFuncIdMap) != "undefined" && gFuncIdMap[eachItem]) currFuncId = gFuncIdMap[eachItem];
        else if (eachItem != masterFuncId) currFuncId = eachItem;
        else currFuncId = functionId;
        //SFR#11815002  11.2.1 Kernel Changes Start Here
        try {
            if (typeof (gActionMap) != "undefined" && gActionMap[eachItem]) gAction = gActionMap[eachItem];
            else gAction = 'NEW';
        } catch (e) {
            gAction = 'NEW';
        }
        //SFR#11815002  11.2.1 Kernel Changes Start Here      
        gCurrMasterFuncId = eachItem;
        functionId = currFuncId;
        if (buildPureXmlPayload) {
            // for building txn xml payload (moduleData)
            eachDom = addHeaderBodyToDom(eachDom, currFuncId, eachItem);
            tmpDom = loadXMLDoc(dbDataDomList[eachItem]);
            if (tmpDom == null) continue;
            try {
                selectSingleNode(eachDom, "//FCUBS_BODY").appendChild(tmpDom.documentElement);
            } catch (e) {
                   try{
                var importnode = document.importNode(tmpDom.documentElement, true);
                selectSingleNode(eachDom, "//FCUBS_BODY").appendChild(importnode);
            }
                catch(e1){
                      var importnode = eachDom.importNode(tmpDom.documentElement, true);
                selectSingleNode(eachDom, "//FCUBS_BODY").appendChild(importnode);

                   }
            }
        } else {
            if (gBpelSave || gValidateProcess) {
                // build txn xml with fcjmsg xml as payload
                if (eachItem != masterFuncId) {
if (exMsgXml[currFuncId]){
                    dbFCJDOM = loadXMLDoc(exMsgXml[currFuncId]);
                    dbDataDOM = loadXMLDoc(dbDataDomList[eachItem]);
}
                    if (exMsgXml[currFuncId] && dbFCJDOM != null && dbDataDOM != null) { // chk msgxml for sub functionids
                        msgxml = exMsgXml[currFuncId];
                        eachDom = coreBuildUBSXml();
                    } else {
                        //continue; //msgxml missing for corresponding funcid
                        eachDom = addHeaderBodyToDom(eachDom, currFuncId, eachItem);
                        tmpDom = loadXMLDoc(dbDataDomList[eachItem]);
                        if (tmpDom == null) continue;
                        try {
                            selectSingleNode(eachDom, "//FCUBS_BODY").appendChild(tmpDom.documentElement);
                        } catch (e) {
                           try{
                             
                            var importnode = document.importNode(tmpDom.documentElement, true);
                            selectSingleNode(eachDom, "//FCUBS_BODY").appendChild(importnode);
                             } 
 catch(e1){
                      var importnode = eachDom.importNode(tmpDom.documentElement, true);
                selectSingleNode(eachDom, "//FCUBS_BODY").appendChild(importnode);
                   }
                        }
                    }
                } else {
                    msgxml = msgxmlCopy;
                    dbFCJDOM = loadXMLDoc(msgxml);
                    dbDataDOM = loadXMLDoc(getXMLString(dbDataDOMCopy));
                    eachDom = coreBuildUBSXml();
                }
            }
        }
        try {
            selectSingleNode(ubsXmlDom, "//FCUBS_BODY").appendChild(eachDom.documentElement);
        } catch (e) {
try{          
            var importnode = document.importNode(eachDom.documentElement, true);
            selectSingleNode(eachDom, "//FCUBS_BODY").appendChild(importnode);
        }
catch(e1){
                      var importnode = ubsXmlDom.importNode(eachDom.documentElement, true);
                selectSingleNode(ubsXmlDom, "//FCUBS_BODY").appendChild(importnode);
          }      
        }
    }
    dbDataDOM = dbDataDOMCopy;
    msgxml = msgxmlCopy;
    dbFCJDOM = loadXMLDoc(msgxml);
    functionId = functionIdCopy;
    gAction = oldgAction;
    gCurrMasterFuncId = "";
    /*try{
    var atr=document.createAttribute('xmlns');
    atr.nodeValue="";
    ubsXmlDom.documentElement.setAttributeNode(atr);   
    }
    catch(e){}*/
    return ubsXmlDom;
}

function getTransactionXmlDom() {
    dbDataDomList[masterFuncId] = getXMLString(dbDataDOM);
    if (taskXml != '') {
        var ns = "xmlns:" + "fcubs" + "='" + "http://fcubs.iflex.com" + "'";
        var tempDom = loadXMLDoc(taskXml);
        if (tempDom != null) {
            if (getBrowser().indexOf("IE") != -1)//ie11 changes 
                tempDom.setProperty("SelectionNamespaces", ns);
            setNodeText(selectSingleNode(tempDom, "//fcubs:processName"), gProcessName);
            setNodeText(selectSingleNode(tempDom, "//fcubs:instanceId"), gInstanceId);
            if (document.getElementById("BLK_PROCESS_AUDIT__REMARK")) {
                setNodeText(selectSingleNode(tempDom, "//fcubs:txnAuditDetails/fcubs:currRemarks"), document.getElementById("BLK_PROCESS_AUDIT__REMARK").value);
                setNodeText(selectSingleNode(tempDom, "//fcubs:txnAuditDetails/fcubs:prevRemarks"), document.getElementById("BLK_PROCESS_AUDIT__PREV_REMARK").value);
            }
            setNodeText(selectSingleNode(tempDom, "//fcubs:operation"), gOperation);
            tempDom = selectSingleNode(tempDom, "//fcubs:transaction"); // transaction is the root node in txn xml
try
{           
            var childNodes = selectNodes(tempDom, "//fcubs:moduleData/*").removeAll();
            var childErrorNodes = selectNodes(tempDom, "//fcubs:exceptions/*").removeAll();
}catch(e)
{
            var childNodes = selectNodes(tempDom, "//fcubs:moduleData/*");
            var childErrorNodes = selectNodes(tempDom, "//fcubs:exceptions/*");
            
            if (childNodes) {
                for (var i = 0; i < childNodes.length; i++)
                    childNodes[i].parentNode.removeChild(childNodes[i]);
            }
            if (childErrorNodes) {
                for (var j = 0; j < childErrorNodes.length; j++)
                    childErrorNodes[j].parentNode.removeChild(childErrorNodes[j]);
            }
 }           
            var fcubsReqNode;
            if ((gBpelSave || gValidateProcess) && !(gDuplicateTaskCheckFlag)) 
                fcubsReqNode = buildMultipleUBSXml(false).documentElement;
            else /* 9NT1606_12_2_RETRO_12_0_1_23657448   Changes Starts */ 
			
				if (gOperation == 'HOLD')
					fcubsReqNode = loadXMLDoc(getXMLString(buildMultipleUBSXml(true)).replace('<FCUBS_REQ_ENV>', '<FCUBS_REQ_ENV xmlns="">')).documentElement;
				else
					fcubsReqNode = buildMultipleUBSXml(true).documentElement;
				 /* 9NT1606_12_2_RETRO_12_0_1_23657448   Changes Ends */ 
            try {
                selectSingleNode(tempDom, "//fcubs:moduleData").appendChild(fcubsReqNode);
            } catch(e) {
try{               
                var importnode = document.importNode(fcubsReqNode, true);
                selectSingleNode(tempDom, "//fcubs:moduleData").appendChild(importnode);
}catch(e1){
                      var importnode = tempDom.ownerDocument.importNode(fcubsReqNode, true);
                selectSingleNode(tempDom, "//fcubs:moduleData").appendChild(importnode);

                   }
            

            }
            fcubsReqNode = null;
        }
    }
    var priority = "Low";
    selectSingleNode(tempDom, "//fcubs:transaction").setAttribute("taskId", taskId);
    if (document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY").value == "H") 
        priority = "High";
    else if (document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY").value == "M") 
        priority = "Medium";
    else priority = "Low";
    selectSingleNode(tempDom, "//fcubs:transaction").setAttribute("txnPriority", priority);
    setNodeText(selectSingleNode(tempDom, "//fcubs:taskOutcome"), document.getElementById("BLK_PROCESS_AUDIT__OUTCOME").value);
    if (selectSingleNode(tempDom, "//fcubs:actionDateTime")) {
        setNodeText(selectSingleNode(tempDom, "//fcubs:userId"), parent.UserId);
        setNodeText(selectSingleNode(tempDom, "//fcubs:actionDateTime"), acquireDate);
		setNodeText(selectSingleNode(tempDom, "//fcubs:txnIdentification/fcubs:stage"),functionId);//12.0.2 Changes
    }
    if (document.getElementById("BLK_PROCESS_AUDIT__ASSNUSR")) 
        setNodeText(selectSingleNode(tempDom, "//fcubs:currentUser"), document.getElementById("BLK_PROCESS_AUDIT__ASSNUSR").value);
	if (getBrowser().indexOf("SAFARI") != -1)
		tempDom = loadXMLDoc(getXMLString(tempDom).replace(/xmlns=""/g,''));
    return tempDom;
}


function deleteProcessInstance(instanceId) {
    var deleteInstanceReqXml = "<TaskRequest OP = 'INSTANCEDELETE'>";
    deleteInstanceReqXml += "<InstanceId>" + instanceId + "</InstanceId>";
    deleteInstanceReqXml += "</TaskRequest>";
    var objHTTP = getXmlHttpObj("FCClientHandler", functionId, "BPELACTION");
    objHTTP.send(deleteInstanceReqXml);
    taskListXML = objHTTP.responseXML;
}

fnExitAll = function () {
    var parentWin = fnGetParentWin();
    if (parentWin != "" && parentWin.parentWinParams.bpelParentFunc && parentWinParams.bpelParentFunc != "" && parentWinParams.bpelParentFunc != functionId) { // is a child function
        parentWin.unmask();
        enableSave();
        fnEnableHoldButton();
        mainWin.fnBpelRefresh();
    }
    if (screenType == "P" && canDeleteInstance && gOperation != "HOLD") 
	{
		try{
			if(parent.status == '')
			{
        // parse taskXml to retrieve instanceId
        var ns = "xmlns:" + "fcubs" + "='" + "http://fcubs.iflex.com" + "'";
			var childNodes = "";
        var tempDom = loadXMLDoc(taskXml);
        if (tempDom != null) {
            if (getBrowser().indexOf("IE") != -1) tempDom.setProperty("SelectionNamespaces", ns);//ie11 changes
            var instanceIdNode = selectSingleNode(tempDom, "//fcubs:txnId");
	            childNodes = selectNodes(tempDom,"//fcubs:moduleData/*");
				if (instanceIdNode && getNodeText(instanceIdNode) != "" && childNodes.length == 0) 
                deleteProcessInstance(getNodeText(instanceIdNode));
        }
        }
		}catch(e){}
    }
    try {
        gAction = "";
        if (document.getElementsByName("BTN_OK")[0] && (document.getElementsByName("BTN_OK")[0].disabled)) 
            document.getElementsByName("BTN_OK")[0].disabled = false;
	  //fnBpelRefresh();
	 mainWin.fnBpelRefresh();
	//12.0.2 Arumugam
	if(parent.document.getElementById("hTab_DBoardTasks")!=null) 
		parent.fnShowQueue(parent.currentTaskTab); 
	mainWin.fnViewTaskHistory(); /* 17063019 Changes */
	//12.0.2 Arumugam
        coreFnExit();
    } catch (e) {
        dbDataDOM = null;
        isExitTriggered = true;
        //mainWin.showToolbar("", "", "");
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
    }
}

function fnLaunchSubfunction(v_functionID, v_UiXml, v_scrName) {
    appendData();
    parentWinParams = new Object();
    try {
        fnSetScreenArgs(parentWinParams);
    } catch (e) {}
    parentWinParams.bpelParentFunc = functionId; // indicates the current function id is launched as part of a bpel function id
    dbDataDomList[masterFuncId] = getXMLString(dbDataDOM);
    parentWinParams.dbDataDomList = dbDataDomList;
    mainWin.dispHref1(v_functionID, seqNo);
    //mainWin.showToolbar('', '', ''); //disable tool bar buttons
    mask();
    try {
        fnGetScreenArgs(parentWinParams);
    } catch (e) {}
}

function getUiName(funcId) {
    var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var uiName = "";
    var uiNameNode;
    uiNameNode = selectSingleNode(xmlDOM, "//LEAF[@FNID = '" + funcId + "']/@UINAME");
    if (uiNameNode) uiName = getNodeText(uiNameNode);
    xmlDom = null;
    return uiName;
}

function showToolbar(funcid, txnstat, authstat, showExecute) {
    if (parent.gActiveWindow && (parent.gActiveWindow.screenType == "P" || parent.gActiveWindow.screenType == "T")) return;
}

function displayException(exceptionsNode, type) {
    var ovrdRemarks = "N";
    if (typeof (remarksReq) != "undefined" && remarksReq == "Y") ovrdRemarks = "Y";
    var message = "";
    var returnVal = false;
    var messageNodes = selectNodes(exceptionsNode, "./fcubs:error");
    var msg = "";
    var errCode = "";
    if (type == "" || type == null) {
        type = "I";
    }
    if (messageNodes) {
        for (var index = 0; index < messageNodes.length; index++) {
            msg = getNodeText(selectSingleNode(messageNodes[index], "./fcubs:edesc"));
            errCode = getNodeText(selectSingleNode(messageNodes[index], "./fcubs:ecode"));
            message = message + errCode + "~" + msg + "__";
            if (errCode == "LCIP-004")
            {
                message = getNodeText(selectSingleNode(messageNodes[index], "./fcubs:ecode")) + "~" 
                          + getNodeText(selectSingleNode(messageNodes[index], "./fcubs:edesc")) + "__";
                break;
            }
        }
        message = message.substring(0, message.length - 2);
        gAlertMessage = message;
        var alertWindow = document.getElementById("ifr_AlertWin");
        if (alertWindow == null) {
            alertWindow = parent.document.getElementById("ifr_AlertWin");
            strTheme = parent.window.strTheme;
        }
        alertWindow.src = "Alert.jsp?MSG_TYPE=" + type.toUpperCase() + "&MESSAGE=" + message + "&THEME=" + strTheme + "&OVRDREMARKS=" + ovrdRemarks;
        var alertWinObj = document.getElementById("Div_AlertWin");
        if (alertWinObj == null) {
            alertWinObj = parent.document.getElementById("Div_AlertWin");
        }
        alertWinObj.style.display = "block";
        switch (type) {
        case 'E':
		alertAction = "UNMASK"; // 9NT1525_FCUBS12.0.3_RETRO:19901088
            break;
        case 'O':
            alertAction = "OVERRIDE";
            break;
        case 'I':
            alertAction = "BPELSCREENEXIT";
            break;
        default:
            alertAction = "EXITACTION";
        }
        returnVal = true;
    } else {
        mask();
        showAlerts(fnBuildAlertXML('ST-COM021', 'E'), 'E');
        alertAction = "UNMASK";
        returnVal = false;
    }
    return returnVal;
}



function fnBPELBuildDBDOMReq() {
    // for multiple response
    var ns = "xmlns:" + "fcubs" + "='" + "http://fcubs.iflex.com" + "'";
    var txnXmlDOM = loadXMLDoc(taskXml);
    if (txnXmlDOM != null) {
        if (getBrowser().indexOf("IE") != -1) txnXmlDOM.setProperty("SelectionNamespaces", ns);//ie11 changes
    }
    if (getXMLString(txnXmlDOM) == null || getXMLString(txnXmlDOM) == "") return;
    gInstanceId = getNodeText(selectSingleNode(txnXmlDOM, "//InstanceId"));
    gProcessName = getNodeText(selectSingleNode(txnXmlDOM, "//ProcessName"));
    acquireDate = getNodeText(selectSingleNode(txnXmlDOM, "//AcquiredDateTime"));
    var l_Index = 0;
    l_Index = selectNodes(txnXmlDOM, "//ADDL/PARAM[NAME='MASTERFUNCID']/VALUE").length;
    if (l_Index != 0) {
        funcIdNodes = selectNodes(txnXmlDOM, "//ADDL/PARAM[NAME='MASTERFUNCID']/VALUE");
        for (var i = 0; i < l_Index; i++) {
//            dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL/PARAM[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[0]);
			// 18365871 changes starts
	     	/*if(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL/PARAM[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes.length >1)
			dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL/PARAM[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[1]);
		else
            dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL/PARAM[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[0]);*/
			var childNodeLen = selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL/PARAM[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes.length;
			for( var j=0; j < childNodeLen; j++)
			{
				if(getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL/PARAM[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[j]).indexOf("BLK_") != -1)
					dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL/PARAM[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[j]);
			}
			// 18365871 changes ends
        }
    } 
	//else 
	 // NAME Node ideally should be under param , Needs to be checked as why this comes under ADDL node
  // Have a situation where it's present under both 
	//{
        l_Index = selectNodes(txnXmlDOM, "//ADDL[NAME='MASTERFUNCID']/VALUE").length;
        if (l_Index != 0) {
            funcIdNodes = selectNodes(txnXmlDOM, "//ADDL[NAME='MASTERFUNCID']/VALUE");
            for (var i = 0; i < l_Index; i++) {
//                dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[0]);
			// 18365871 changes starts
              /*if(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes.length >1)  
			dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[1]);
		else
                dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[0]);*/
			var childNodeLen = selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes.length;
				for( var j=0; j < childNodeLen; j++)
				{
					if(getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[j]).indexOf("BLK_") != -1)
						dbDataDomList[getNodeText(funcIdNodes[i])] = getXMLString(selectSingleNode(txnXmlDOM, "//FCUBS_REQ_ENV[FCUBS_HEADER[ADDL[NAME='MASTERFUNCID' and VALUE='" + getNodeText(funcIdNodes[i]) + "']]]/FCUBS_BODY").childNodes[j]);
				}
			// 18365871 changes ends
            }
        }
   // }
    gDuplicateTaskCheckReqd = getNodeText(selectSingleNode(txnXmlDOM, "//TaskDetails/DUPLICATE_CHK_REQD"));
}
/*
method needs to be rewritten based on actual scenario
function showNextStage() {
    var tempDom = loadXMLDoc(taskXml);
    try {
        if (tempDom != null) {
            if (getNodeText(selectSingleNode(tempDom, "//NEXTFUNCID")) != '' && getNodeText(selectSingleNode(tempDom, "//NEXTFUNCID")) != 'null') {
                document.forms[0].method = "POST";
                if (getNodeText(selectSingleNode(tempDom, "//NEXTFUNCID")).split("~").length <= 1) 
                    return false;
                var nextFunctionId = getNodeText(selectSingleNode(tempDom, "//NEXTFUNCID")).split("~")[0];
                window.onunload = null;
                window.onbeforeunload = null;
                if (typeof(mainWin.isChild) != "undefined") 
                    delete mainWin.isChild;
                document.forms[0].action = "SMSStartLogServlet?funcid=" + nextFunctionId + "&taskId=" + taskId + "&uiName=" + getUiName(nextFunctionId) + "&msgType=WORKFLOW&actionType=&autoAcquire=Y" + "&timestamp=" + (getDateObject()).getTime();
                document.forms[0].submit();
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    } catch(e) {
        return false;
    }
}
*/
function setRemarks() {
    var ns = "xmlns:" + "fcubs" + "='" + "http://fcubs.iflex.com" + "'";
    var txnXmlDOM = loadXMLDoc(taskXml);
    if (txnXmlDOM != null && (getBrowser().indexOf("IE") != -1)) txnXmlDOM.setProperty("SelectionNamespaces", ns);//ie11 changes
    if (txnXmlDOM == null) return;
    document.getElementById("BLK_PROCESS_AUDIT__REMARK").value = getNodeText(selectSingleNode(txnXmlDOM, "//fcubs:currRemarks"));
    document.getElementById("BLK_PROCESS_AUDIT__PREV_REMARK").value = getNodeText(selectSingleNode(txnXmlDOM, "//fcubs:prevRemarks"));
}

function fnBpelAudit() {
    mask();
  loadSubScreenDIV("ChildWin", "TempForward.jsp?action=BPELAudit.jsp&taskId=" + taskId + "&description=" + mainWin.getItemDesc("LBL_AUDIT_DTLS")+"&csrfTok=" + mainWin.CSRFtoken);
}

addHeaderNode = function (ubsXMLDOM) {
    ubsXMLDOM = coreAddHeaderNode(ubsXMLDOM);
    if (gBpelCall && gCurrMasterFuncId != '') {
        var headerNode = selectSingleNode(ubsXMLDOM, "//FCUBS_HEADER");
        var addlNode;
        if (selectSingleNode(ubsXMLDOM, "//ADDL")) {
            addlNode = selectSingleNode(ubsXMLDOM, "//ADDL");
        } else {
            addlNode = ubsXMLDOM.createElement("ADDL");
            headerNode.appendChild(addlNode);
        }
        var paramNode = ubsXMLDOM.createElement("PARAM");
        addlNode.appendChild(paramNode);
        var nameNode = ubsXMLDOM.createElement("NAME");
        setNodeText(nameNode, "MASTERFUNCID");
        paramNode.appendChild(nameNode);
        var valueNode = ubsXMLDOM.createElement("VALUE");
        setNodeText(valueNode, gCurrMasterFuncId);
        paramNode.appendChild(valueNode);
        if (typeof (gPayloadOperations) != 'undefined' && typeof (gPayloadOperations[functionId]) != 'undefined' && gPayloadOperations[functionId] != '') {
            setNodeText(selectSingleNode(headerNode, "//ACTION"), gPayloadOperations[functionId]);
        }
    }
    return ubsXMLDOM;
}

function fnEnableProcessAudit() {
    disableForm();
    fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__OUTCOME"));
    if (document.getElementById("BLK_PROCESS_AUDIT__REMARK")) fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__REMARK"));
    fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__AUDIT"));
    fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__WF_PRTY"));
    return true;
}

function fnEnableAuditButton() {
    fnEnableElement(document.getElementById("BLK_PROCESS_AUDIT__AUDIT"));
}


//12.0.2 Changes Starts
function fnHold() {
    fnShowRemarks('HOLD');
}

//function fnHold() {
function fnProcHold() {
//12.0.2 Changes Ends
    appendData();
    gBpelCall = true;
    if (!fnPreHoldMain()) return;
    //if (!fnEventsHandler('fnPreHold')) return;
    gOperation = 'HOLD';
    gBpelSave = false;
    gValidateProcess = false;
    var transactionDom = getTransactionXmlDom();
    if (transactionDom) {
        gAction = "HOLD"; // set here as its reset coreFnSave
        transactionDom = fnPost(transactionDom, serverURL, functionId, true);
        alertAction = "EXITACTION";
        if (fnProcessResponse(getXMLString(transactionDom)) == "SUCCESS") {
            dbDataDomList = null;
            canDeleteInstance = false; // on exit, the instance should not be deleted
            fnExitAll();
        }
    }
}

//12.0.2 Changes Starts 
function fnShowRemarks(action) {
    var l_Params  = "action=" +action;
    try {
        mask();
        loadSubScreenDIV("ChildWin", "WFRemarks.jsp?"+l_Params);
    } catch (e) {
        alert(scriptError);
    }
}

function fnCloseRemarks(processFlag) {
	var childDivObj = document.getElementById("ChildWin");
	/*
    if (navigator.userAgent.toLowerCase().indexOf("opera") != -1)
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}*/
	if (processFlag)
	{
		if (gRemarksAction == 'HOLD')
			fnProcHold();
		if (gRemarksAction == 'SAVE')
			fnProcSaveAll();
	}
	else
		unmask();
    if (getBrowser().indexOf("OPERA") != -1)//ie11 changes
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}		
}
//12.0.2 Changes Ends
function showAllData() {
    var tabList = document.getElementById("tablist");
    var tabs = "";
    showTabData(strCurrentTabId);
    tempCurrentTabId = strCurrentTabId;
	//SFR# 21269131 
	 if (arguments.callee.caller.toString()) {
        if (arguments.callee.caller.toString().indexOf("fnBuildTabHTML") < 0) {
            fnBuildTabHTML(true);
        }
    }
	//SFR# 21269131 
    if (document.getElementById("tablist")) {
        tabs = tabList.getElementsByTagName("li");
        for (var tabCnt = 0; tabCnt < tabs.length; tabCnt++) {
            strCurrentTabId = tabs[tabCnt].childNodes[0].id;
            showTabData(strCurrentTabId);
        }
    }
    strCurrentTabId = tempCurrentTabId;
}

closeAlerts = function (event) {
    if (alertType == "O") parent.override_remarks = document.getElementById("REMARKS").value;
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    if (parent.location.pathname.indexOf("TxnBranch.jsp") != -1) {
        parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parentHeight + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parentWidth + "px";
    } else if (parent.location.pathname.indexOf("ExtEditor.jsp") != -1) {
        parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parentHeight + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parentWidth + "px";
    }
    parent.document.getElementById("Div_AlertWin").children[0].src = "";
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    //eval("parent." + parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));
    var fnEval = new Function("event","parent." + parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));  
    fnEval();
}


fnCloseAlertWin = function (event) {
    gIsValid = true;
    if (alertAction == "BPELSCREENEXIT") fnExitAll();
    else if (gBpelCall && (gBpelSave || gValidateProcess)) {
        try {
            if (typeof (customAlertAction) != "undefined") {
                if (customAlertAction != "") {
                    //eval("fnCloseAlertWin_" + customAlertAction + "(evnt)");
                    var fnEval = new Function("evnt","fnCloseAlertWin_" + customAlertAction + "(evnt)");  
                    fnEval();
                    customAlertAction = "";
                    return;
                }
            }
        } catch (e) {}
        if (alertAction == "EXITACTION") {
            unmask();
            resetElements();
            gAction = "";
            fnSetExitButton();
            disableForm();
            //mainWin.showToolbar(functionId, "", "");
        } else if (alertAction == "CLOSEACTION") {
            unmask();
            try {
                fcjRequestDOM = buildUBSXml();
            } catch (e) {
                mask();
                showAlerts(fnBuildAlertXML("EXTCLS-001", "E"), "E");
                alertAction = "UNMASK";
                return;
            }
            if (typeof (remarksReq) != "undefined" && remarksReq == "Y") {
                show_remarks();
            } else {
                fnSaveAll_ReqResp();
            }
        } else if (alertAction == "UNMASK") {
            unmask();
        } else if (alertAction == "OVERRIDE") {
            unmask();
            if(gDuplicateCurCheckFlag) {
            gDuplicateTaskCheckFlag = false;
            fnSaveAll();
              return;
            }
            var txnDom = fcjResponseDOM;
            fcjResponseDOM = null; /* 25399703 */
            if (getBrowser().indexOf("IE") != -1)//ie11 changes //14029894
            txnDom.setProperty("SelectionNamespaces", "xmlns:fcubs='http://fcubs.iflex.com'");
            var requestXml = getXMLString(txnDom);
            requestXml = requestXml.replace(/FCUBS_RES_ENV/g, "FCUBS_REQ_ENV");
            var transactionDom = fcjRequestDOM;
            var payloadNode = "";
            var headerNodes = selectNodes(txnDom, "//FCUBS_REQ_ENV/FCUBS_BODY/FCUBS_REQ_ENV/FCUBS_HEADER");
            var tempNode = "";
            var tempFuncId = "";
            for (var index = 0; index < headerNodes.length; index++) {
                tempNode = loadXMLDoc(getXMLString(headerNodes[index]));
                tempFuncId = getNodeText(selectSingleNode(tempNode, "//FUNCTIONID"));
                try{
                var tempMultiId= getNodeText(selectSingleNode(tempNode, "//MULTITRIPID"));
				          if (getBrowser().indexOf("SAFARI") != -1){ //#23103178: checked for safari browser specific
                setNodeText(selectSingleNode(transactionDom, "//fcubs:FCUBS_REQ_ENV/fcubs:FCUBS_BODY/fcubs:FCUBS_REQ_ENV/fcubs:FCUBS_HEADER[fcubs:FUNCTIONID ='" + tempFuncId + "']/fcubs:MULTITRIPID"),tempMultiId );				           
				setNodeText(selectSingleNode(transactionDom, "//fcubs:FCUBS_REQ_ENV/fcubs:FCUBS_HEADER/fcubs:MULTITRIPID"),tempMultiId );
				} else {  // For other Browsers
                setNodeText(selectSingleNode(transactionDom, "//FCUBS_REQ_ENV/FCUBS_BODY/FCUBS_REQ_ENV/FCUBS_HEADER[FUNCTIONID ='" + tempFuncId + "']/MULTITRIPID"),tempMultiId );				           
				setNodeText(selectSingleNode(transactionDom, "//FCUBS_REQ_ENV/FCUBS_HEADER/MULTITRIPID"),tempMultiId );
				}
               }catch(e){}
            }
			if (getBrowser().indexOf("SAFARI") != -1){ //#23103178: checked for safari browser specific
            payloadNode = loadXMLDoc(getXMLString(selectSingleNode(transactionDom, "//fcubs:FCUBS_REQ_ENV")));
			} else {   // For other Browsers
			payloadNode = loadXMLDoc(getXMLString(selectSingleNode(transactionDom, "//FCUBS_REQ_ENV")));
			}
            var childNodes = selectNodes(txnDom, "//fcubs:moduleData/*");
try{ //14029894
            childNodes.removeAll();
}catch(e)	   //14029894 starts
{   
                       if (childNodes) {
                for (var i = 0; i < childNodes.length; i++)
                    childNodes[i].parentNode.removeChild(childNodes[i]);
            }           
 }         //14029894 ends  
            try {
                selectSingleNode(txnDom, "//fcubs:moduleData").appendChild(payloadNode.documentElement);
            } catch (e) {
try{  //14029894              
                var importnode = document.importNode(payloadNode.documentElement, true);
                selectSingleNode(txnDom, "//fcubs:moduleData").appendChild(importnode);
}catch(e1){		 //14029894 starts
                      var importnode = txnDom.importNode(payloadNode.documentElement, true);
                selectSingleNode(txnDom, "//FCUBS_BODY").appendChild(importnode);

                   }	  //14029894 ends
            }
			if (getBrowser().indexOf("SAFARI") != -1)
				txnDom = loadXMLDoc(getXMLString(txnDom).replace(/xmlns=""/g,''));			
            transactionDom = fnPost(txnDom, serverURL, functionId, true);
            canDeleteInstance = false;
            fnProcessResponse(getXMLString(transactionDom));
        }
    } else coreFnCloseAlertWin();
}
//9NT1462 ITR1 SFR 13146320 starts. added the below function. To handle those cases where this function was not defined at the process js.
function fnScreenDefaults() {}
//9NT1462 ITR1 SFR 13146320 ends