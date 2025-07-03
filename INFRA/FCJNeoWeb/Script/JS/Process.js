/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : Process.js
**
** Module       : FCJWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004- 2011 by Oracle Financial Services Software Limited. 

 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                            to user as alert and on click of Ok button on alert window, screen will be 
                            unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
----------------------------------------------------------------------------------------------------
*/

if (!mainWin.txnBranch[mainWin.CurrentBranch])
    mainWin.txnBranch[mainWin.CurrentBranch] = new setTxnBrnInfo();
var g_txnBranch         = dlgArg.mainWin.frames["Global"].CurrentBranch;

var duplicateTaskcheckReq = "N";
var duplicateValueList;
var duplicateCheckIsDone = true;
var StageComments;
var dlgArg = dialogArguments;
var servletURL = "FCClientHandler";
var isExitTriggered = false;
var gIsAuditExist = true;
var temp_gActionHold = "";
var dbdomreq = new Array();
 var compositeArray = new Array();	 //Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009
// Saidul Added For removing alerts:
var lblBranchStage = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_BRANCH_STAGE");
var lblModifyFailed = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_MODIFY_FAIL");
var lblProcessingFailed = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSING_FAIL");
var gBpelSave = "N";
var lblProcessActionMissing = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESS_ACTION");
var deleteFlag = "Y";
var holdFlag = "N";
var gOperation = "";
var gMultipleReqFlag = "N";
var nextDayFlag = "N";
var gDisableField = new Array();
var gBPELLoadData = false; //FC10.5ITR2 SFR#1074
var dbDOM ; // = new ActiveXObject("Msxml2.DOMDocument.4.0"); //LoanOrigination Changes
dbDOM = getMsXmlDom(); // LoanOrigination Changes 
dbDOM.async = false;
dbDOM.resolveExternals = false;
var gTextAttribute3 = "@";
var gTextAttribute4 = "@";
var gTextAttribute5 = "@";
var gTextAttribute6 = "@";
var gTextAttribute7 = "@";
var gTextAttribute8 = "@";
var gTextAttribute9 = "@";
var gTextAttribute10 = "@";

var gProcTextAttribute1 = "@";
var gProcTextAttribute2 = "@";
var gProcTextAttribute3 = "@";
var gProcTextAttribute4 = "@";
var gProcTextAttribute5 = "@";

var gNumAttribute2 = "@";
var gNumAttribute3 = "@";
var gNumAttribute4 = "@";
var gNumAttribute5 = "@";

var gDateAttribute1 = "@";
var gDateAttribute2 = "@";
var gDateAttribute3 = "@";
var gDateAttribute4 = "@";
var gDateAttribute5 = "@";

/*
 * Subsystem Declarations
 */
var subSysFunIDMapping = new Array();
subSysFunIDMapping['BRCETFRM'] = 'BRKDETAILS';
subSysFunIDMapping['CSCCNFDM'] = 'UDFDETAILS';
subSysFunIDMapping['ISCONDET'] = 'STTLMENT';
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
//LoanOrigination Changes Starts
function getMsXmlDom(){ 
	var tempDom;
	try{
		tempDom = new ActiveXObject("Msxml2.DOMDocument.6.0");
	}catch(e){
		tempDom = new ActiveXObject("Msxml2.DOMDocument.4.0");
	}

	return tempDom;
}
//LoanOrigination Changes Ends

function resetIndex()
{
    for (var dataSrcIndex = 0; dataSrcIndex < dataSrcLocationArray.length; dataSrcIndex++)
    {
        dbIndexArray[dataSrcLocationArray[dataSrcIndex]] = 1;
    }
}

/**
 * Inform Main Window that this child window is closed Called from Launcher.jsp
 * during onbeforeunload event.
 */
function fnBeforeUnload()
{
    var retVal = false;

    if (gAction != "")
    {
        appendErrorCode('ST-COM012', "");
        var message = buildMessage(gErrCodes).split("~");
        event.returnValue = message[0];
    }
    if (dlgArg.ShowSummary && dlgArg.ShowSummary == "TRUE")
    {
        if (!dlgArg.sourceWin.closed)
        {
            if (dlgArg.sourceWin.lastRequestTS == dlgArg.lastRequestTS)
            {
                dlgArg.sourceWin.refresh();
            }
        }
    }
}

/**
 * Called from Launcher.jsp during onUnload event.
 */

function fnUnload()
{
    if (gAction != "")
    {
        fnDirectClose();
    }
    if (!isExitTriggered)
    {
        dlgArg.mainWin.frames["FrameToolbar"].showToolbar("", "", "");
        dlgArg.mainWin.fnExit(window);
    }
}

/**
 * Called from Launcher.jsp during onFocus event. Inform main window that this
 * Child Window is the active window This will allow Main Window to call this
 * window's action, navigation functions when User clicks Toolbar
 */

function fnFocus(){

    dlgArg.mainWin.setActiveWindow(window);
    dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value = functionId;
    if ( dlgArg.mainWin.frames["Global"].getBpelRoleRight(functionId)=="R" || dlgArg.status =='ASSIGNED'){    
    	dlgArg.mainWin.frames["FrameToolbar"].showToolbar('','','');
	}else{
		if (gAction != ''){
	    	dlgArg.mainWin.frames["FrameToolbar"].enableSave();
	       	dlgArg.mainWin.frames["FrameToolbar"].fnEnableHoldButton();
       	}
    }
}

/**
 * Called from Launcher.jsp during onLoad of body.
 */
function fnLoad(xmlFileName, xslFileName, screenName)
{
    fnPreLoad();
    // Set the current window as the active window.
    dlgArg.mainWin.setActiveWindow(window);

    var html = ShowXML(xmlFileName, screenName, xslFileName);

    ResTree.insertAdjacentHTML("afterBegin", html);

    if (document.getElementById("DIV_BLK_AUDIT") == null || document.getElementById("DIV_BLK_AUDIT") == "null")
    {
        gIsAuditExist = false;
    }
    var fldVal = new Array();
    var fieldName;
    var fieldValue;
    var currFldVal;
    var index;
    var drillDownQry = dlgArg.pDrillDownQry;
    if (drillDownQry != "" & drillDownQry != null)
    {
        fnEnterQuery();
        var strReqMsg = "<FCJMSG SRC=\"FLEXCUBE\"><MAINTQRY TYPE=\"N\">";
        strReqMsg += drillDownQry;
        strReqMsg += "</MAINTQRY></FCJMSG>";
       // var fcjReqMsgDOM = new ActiveXObject("Msxml2.DOMDocument.4.0"); //LoanOrigination Changes
        var fcjReqMsgDOM = getMsXmlDom();
        fcjReqMsgDOM.loadXML(strReqMsg);
        fnExecuteQuery(fcjReqMsgDOM);
    }
    try
    {
        fnBuildMultipleEntryArray();
    } catch(e)
    {}
    disableForm();

    var xmlDoc = dlgArg.mainWin.loadXML(xmlFileName);
    if (screenName == '')
    {
        screenName = xmlDoc.selectSingleNode("//SCREEN[@MAIN_WIN = 'Y']").getAttribute("NAME");
    }
    if (xmlDoc.selectSingleNode("//SCREEN[@MAIN_WIN = 'Y']").getAttribute("POSITION") == 'template')
    {
        var tabNodes = xmlDoc.selectNodes("//SCREEN[@NAME = '" + screenName + "']/TAB/PAGE[@ID != 'All']");
        if (tabNodes.length > 0)
        {
            expandcontent("TBLPage" + strCurrentTabID, document.getElementById(strCurrentTabID));
        }
    }
    fnEnableElement(document.forms[0].BTN_EXIT);

    if (dlgArg.ShowSummary == "TRUE")
    {
        fnExecuteQuery(null);
    }
    if (screenType == 'P' || screenType == 'T')
    {

        //if (getXMLString(txnXmlDOM) == "" && functionId != 'CSDRASGN')	 //commented and changed for Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 11-feb-2009
		if(getXMLString(txnXmlDOM) == "" && functionId != 'CSDRASGN' && dlgArg.isChild != 'Y') 
        {
            alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_TASK_INIT_FAIL"));
            fnEnableElement(document.forms[0].BTN_EXIT);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar('', '', '');
            document.forms[0].BTN_EXIT.focus();
            return;
        }

        fnBPELLoad();
        } //LoanOrigination Changes
 //Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 starts
/*
        if (dlgArg.mainWin.frames["Global"].getBpelRoleRight(functionId) == "R" || dlgArg.status == 'ASSIGNED')
        {
            if (functionId != 'CSDRASGN')
            {
                gAction = '';
                disableForm();
                fnEnableSubSysButtons();
                enableAllElements("BUTTON");
                dlgArg.mainWin.frames["FrameToolbar"].showToolbar('', '', '');
                try
                {
                    fnPostFormDisable();
                } catch(e)
                {}

                fnEnableElement(document.forms[0].BTN_EXIT);
            }
        }
        if (typeof(dlgArg.isChild) == "undefined")
        {
            if (txnXmlDOM && txnXmlDOM.selectSingleNode("//Outcome"))
            {
                var outcomes = txnXmlDOM.selectSingleNode("//Outcome").text;
                var outArray = outcomes.split('~');
                for (var i = 0; i < outArray.length; i++)
                {
                    document.getElementById("PROCESS_ACTIONS").options[i] = new Option(outArray[i], outArray[i]);
                }
            } else document.getElementById("PROCESS_ACTIONS").disabled = true;
        }

        if (functionId != 'CSDRASGN')
        {
            if (txnXmlDOM && txnXmlDOM.selectSingleNode("//fcubs:transaction").getAttribute("txnPriority") != "") document.getElementById("DROP_PRIORITYLIST").value = txnXmlDOM.selectSingleNode("//fcubs:transaction").getAttribute("txnPriority");

            // ctcb issue no 61 change starts
            if (txnXmlDOM && txnXmlDOM.selectSingleNode("//fcubs:txnAuditDetails").selectSingleNode("//fcubs:userComments").text != "" && txnXmlDOM.selectSingleNode("//fcubs:txnIdentification/fcubs:operation").text == "HOLD")
            {
                var tempcomments = txnXmlDOM.selectSingleNode("//fcubs:txnAuditDetails").selectSingleNode("//fcubs:userComments").text.split("~");
                document.getElementById("AUDIT_FIELD").value = tempcomments[tempcomments.length - 1]; //ctcb hold change
            }
            // ctcb issue no 61 change ends

        }
    }
    if ((dlgArg.mainWin.frames["Global"].getBpelRoleRight(functionId) != "R" && dlgArg.status != 'ASSIGNED') || functionId == 'CSDRASGN')
    {
        fnPostLoad();

        // fnDisableFieldList();
        fnFocus();
    }
  */
	
  if(typeof( dlgArg.isChild)=="undefined" ){
        	if(txnXmlDOM && txnXmlDOM.selectSingleNode("//NEXTFUNCID").text != '' && txnXmlDOM.selectSingleNode("//NEXTFUNCID").text != 'null' && txnXmlDOM.selectSingleNode("//NEXTFUNCID").text.indexOf("~")!= 0){
		        var outcomes = txnXmlDOM.selectSingleNode("//SUBSTAGE_OUTCOMES").text;
		        var outArray = outcomes.split('~');
		        for(var i=0;i<outArray.length;i++){
		            document.getElementById("PROCESS_ACTIONS").options[i] = new Option(outArray[i],outArray[i]);
		            if(outArray[i] == "")
		            	document.getElementById("PROCESS_ACTIONS").options[i].selected="true";
		        }
        	}
			else if(txnXmlDOM && txnXmlDOM.selectSingleNode("//Outcome")){
   		        var subStageOutcomes = txnXmlDOM.selectSingleNode("//SUBSTAGE_OUTCOMES").text;
		        var outcomes = txnXmlDOM.selectSingleNode("//Outcome").text;
		        var outArray = outcomes.split('~');
		        var optionIndex = 0;
		        for(var i=0;i<outArray.length;i++){
		        	if (outArray[i] == 'MOVENXT' || outArray[i] == 'MOVEPREV' || outArray[i] == 'AUTOMOVENXT'){
		        		if (subStageOutcomes.indexOf(outArray[i]) == -1){
		        			continue;
		        		}
		        	}
		            document.getElementById("PROCESS_ACTIONS").options[optionIndex] = new Option(outArray[i],outArray[i]);
		            if(outArray[i] == "")
		            	document.getElementById("PROCESS_ACTIONS").options[optionIndex].selected="true";
		            optionIndex++;	
		        }
	    	}
	    else
	    	document.getElementById("PROCESS_ACTIONS").disabled=true;
          }
	   
       if (dlgArg.status =='ASSIGNED'){
        	if (functionId != 'CSDRASGN'){
        		gAction='';   
       			disableForm();
           		fnEnableSubSysButtons();
			dlgArg.mainWin.frames["FrameToolbar"].showToolbar('','','');   
       			try{ 
           			fnPostFormDisable();
       			}catch(e){}
        		
            		fnEnableElement(document.forms[0].BTN_EXIT);
		}	
       }else {		
   		fnPostLoad();	

// Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 ends 
    document.forms[0].BTN_EXIT.focus();
}
  }

function getWorkflowReferenceNo()
{
    return txnXmlDOM.selectSingleNode("//ProcessName").text + txnXmlDOM.selectSingleNode("//InstanceId").text;
}

/**
 * Called from Launcher.jsp during onactivate event.
 */
function fnActivate()
{

    if (dlgArg.ShowSummary == "TRUE")
    {
        dlgArg.mainWin.frames["FrameToolbar"].disableNavForSummary();
    }

}

function fnNew()
{

    // Pre action code
    if (!fnPreNew())
    {
        return;
    }
    createDOM(dbStrRootTableName);

    /*
		 * var html = ShowXML(xmlFileName, '', xslFileName); ResTree.innerHTML =
		 * ""; ResTree.insertAdjacentHTML("afterBegin", html);
		 */
    resetElements();
    fnClearMultipleEntryBlocks();
    enableForm();
    // KGS: fn_maintenance_stamp is applicable only for maintenance screens.
    if (gIsAuditExist)
    {
        if (document.forms[0].MOD_NO)
        {
            fn_maintenance_stamp(document.forms[0], 'N');
        } else
        {
            fn_transaction_stamp('N');
        }
    }
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');

    fnSetExitButton(true);
    fnPostNew();
    fnSetFocusOnMasterPKField();
    // FCUBS10ITR1 -- SFR 964 START
    temp_gActionHold = gAction;
    // FCUBS10ITR1 -- SFR 964 END
}

/**
 * Function called when Unlock/Edit is clicked
 */
function fnUnlock()
{
    if (!fnPreUnlock())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            return;
        }
    }

    // Value should be equal to the primary key value for the current
    // function id.
    var value = fnGetPKInfo();

    // Change made to remove the query only datasource from the dbDataDom -
    // Senthil (29/03/05)
    /*
		 * for(var index = 0; index < dataSrcLocationArray.length; index++) {
		 * var value = isQuery[dataSrcLocationArray[index]]; if(value == "1") {
		 * dbDataDOM.selectNodes("//"+dataSrcLocationArray[index]).removeAll(); } }
		 */

    if (!fnValidateOperation())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            fnSetExitButton(false);
            return;
        }
    }

    gAction = "UNLOCK";//LOanOrigination Changes 
    fcjRequestDOM = buildUBSXml();
    debug(dlgArg.mainWin, getXMLString(fcjRequestDOM), "P");

    fcjRequestDOM.selectNodes("FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ").removeAll();

    var tempParent = fcjRequestDOM.selectSingleNode("FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT ='']").getAttribute("TYPE");
    fcjRequestDOM.selectNodes("FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + tempParent + "']").removeAll();

    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    gAction = "MODIFY";
    temp_gActionHold = gAction;
    // fnEnableAmendFields();
    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;
     dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');
    fnSetExitButton(true);

    enableForm();
    if (gIsAuditExist)
    {
        // KGS: fn_maintenance_stamp is applicable only for maintenance
        // screens.
        if (document.forms[0].MOD_NO)
        {
            fn_maintenance_stamp(document.forms[0], 'M');
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        } else
        {
            fn_transaction_stamp('M');
        }
    }
    // enableForm();
    // disableElements("INPUT");
    // disableElements("SELECT");
    // disableElements("TEXTAREA");
    fnDisablePKFields();
    // fnEnableAmendFields();
    fnPostUnlock();
    // fnEnableChkAll();
    fnSetAudtDesc();

}

/**
 * This method is called by fnExit() if the gAction is "MODIFY" , the lock is
 * released on the record. A message is posted to the server and the lock
 * released.
 */
function releaseLock()
{

    gAction = "RELEASELOCK";
    fcjRequestDOM = buildRelaseLockXML();
    debug(dlgArg.mainWin, "Relasing lock on record");
    debug(dlgArg.mainWin, getXMLString(fcjRequestDOM), "P");

    // remove the child records before posting it to the server
    fcjRequestDOM.selectNodes("//FCJMSG/MSG/FLD/FN[@PARENT != ''] ").removeAll();
    var tempParent = fcjRequestDOM.selectSingleNode("//FCJMSG/MSG/FLD/FN[@PARENT ='']").getAttribute("TYPE");
    fcjRequestDOM.selectNodes("//FCJMSG/MSG/REC/REC[@TYPE !='" + tempParent + "']").removeAll();

    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCJMSG/MSG").getAttribute("MSGSTATUS");
        var messageNode = fcjResponseDOM.selectSingleNode("FCJMSG/MSG/RESPONSE");
        if (msgStatus == 'SUCCESS')
        {
            debug(dlgArg.mainWin, "Lock released!!");
            gAction = "";
            return true;
        } else
        {
            debug(dlgArg.mainWin, "Please check ...Lock not released!!");
            var returnVal = displayResponse_auth(messageNode);
            return false;
        }
    }
}

/**
 * Function called when Authorize action is performed
 */
function fnAuthorize()
{

    // Pre action code
    if (!fnPreAuthorize())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            return;
        }
    }

    gAction = "AUTHQUERY";
    temp_gActionHold = gAction;
    if (!fnValidateOperation())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            fnSetExitButton(false);
            return;
        }
    }

    var dlgArgsForAuth = new Object();
    dlgArgsForAuth.mainWin = dlgArg.mainWin;
    dlgArgsForAuth.parentWin = window;

    dlgArgsForAuth.screenTitle = screenTitle;
    dlgArgsForAuth.screenType = 'T';

    var screenArgs = new Array();
    screenArgs['SCREEN_NAME'] = 'CVS_MAIN';

    var funcId = dlgArgsForAuth.parentWin.functionId;
    var userLanguageCode = dlgArg.mainWin.frames("Global").LangCode;
    funcId = funcId.substring(0, funcId.length - 2) + 'AU';
    screenArgs['FUNCTION_ID'] = funcId;
    // screenArgs['DESCRIPTION'] = 'Details';
    screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + userLanguageCode + '/' + funcId + '.xml', screenArgs['SCREEN_NAME']);
    screenArgs['LANG'] = userLanguageCode;
    screenArgs['UI_XML'] = 'CVS_MAIN';
    screenArgs['PARENT_FUNC_ID'] = dlgArgsForAuth.parentWin.functionId;

    screenArgs['parentWin'] = dlgArgsForAuth.parentWin;
    fnShowCallForm(screenArgs);

    fnSetExitButton(false);
    // Post action code
    fnPostAuthorize();
    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');

}

/**
 * Function called when Copy button is clicked
 */

function fnCopy()
{
    // Pre action code
    if (!fnPreCopy())
    {
        return;
    }
    var pureXML;
    pureXML = getCurrentRecord();
    setDataXML(getXMLString(pureXML));
    fnDeleteChildTables();
    fnClearAuditFields();
    // resetElements();
    // FCUBS10ITR1 -- SFR 1 START
    enableForm();
    // FCUBS10ITR1 -- SFR 1 END
    if (gIsAuditExist)
    {
        appendData(document.getElementById("DIV_BLK_AUDIT"));
    }

    // Set Data XML and call AuditTrail, maintStamp once Again.
    if (gIsAuditExist)
    {
        if (document.forms[0].MOD_NO)
        {
            fn_maintenance_stamp(document.forms[0], 'C');
        } else
        {
            fn_transaction_stamp('C');
        }
    }
    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value ;//Laon Origination Changes
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');
    fnSetExitButton(true);
    if (gIsAuditExist)
    {
        if (document.forms[0].ONCE_AUTH) fnDisableElement(document.forms[0].ONCE_AUTH);
    }

    appendData(document.getElementById("TBLPage" + strCurrentTabID));
    gAction = 'COPY';
    temp_gActionHold = gAction;
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
        if (msgStatus == 'FAILURE' || msgStatus == "WARNING")
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            var returnVal = displayResponse(messageNode);
        } else if (msgStatus == "SUCCESS")
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);

        }
    }

    gAction = 'NEW';
    // FCUBS10ITR1 -- SFR 1 START
    // enableForm();
    // FCUBS10ITR1 -- SFR 1 END
    fnPostCopy();
    fnSetAudtDesc();
}

/**
 * Function called when Close Action performed
 */
function fnClose()
{
    // Pre action code
    if (!fnPreClose())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            return;
        }
        return;
    }

    if (!fnValidateOperation())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            fnSetExitButton(false);
            return;
        }
    }
    appendErrorCode('FC-MAINT13', null);
    if (! (confirmAction()))
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            gAction = "";
            return;
        }
    }

    if (gIsAuditExist)
    {
        if (document.forms[0].MOD_NO)
        {
            fn_maintenance_stamp(document.forms[0], 'C');
        }
    }

    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    fnProcessResponse();

    fnSetExitButton(false);

    // Post action code
    fnPostClose();
    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');
}

/**
 * Function called when Reopen Action is performed
 */
function fnReopen()
{
    // Pre action code
    if (!fnPreReOpen())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            return;
        }
    }

    if (!fnValidateOperation())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            fnSetExitButton(false);
            return;
        }
    }

    appendErrorCode('FC-MAINT14', null);
    if ((!confirmAction()))
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            gAction = "";
            return;
        }
    }
    if (gIsAuditExist)
    {
        if (document.forms[0].MOD_NO)
        {
            fn_maintenance_stamp(document.forms[0], 'O');
        }
        appendData(document.getElementById("DIV_BLK_AUDIT"));
    }

    document.forms[0].CHECKERSTAMPI.value = '';
    document.forms[0].CHECKERID.value = '';
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    fnProcessResponse();
    fnSetExitButton(false);

    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;//LoanOrigination Changes
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');
}

/**
 * Function called when Delete Action performed
 */
function fnDelete()
{

    // Pre action code
    if (!fnPreDelete())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            return;
        }
    }

    if (!fnValidateOperation())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            fnSetExitButton(false);
            return;
        }
    }

    appendErrorCode('FC-MAINT17', null);
    if (! (confirmAction()))
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            gAction = "";
            return;
        }
    }

    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
        if (msgStatus == 'FAILURE')
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));

        var returnVal = displayResponse(messageNode);
        // if(msgStatus == 'SUCCESS'){
        // FCUBS10ITR1 -- SFR 1486 START
        if (msgStatus == 'SUCCESS' || msgStatus == "WARNING")
        {
            // FCUBS10ITR1 -- SFR 1486 END
            resetElements();
            fnPostDelete();
            dbDataDOM.loadXML("");
            var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');
        } else
        {
            var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');

        }
        fnSetExitButton(false);
    }
    try
    {
        //eval('fnPostDelete()');
        var fnEval = new Function('fnPostDelete()');  
        fnEval();
    } catch(e)
    {}

}

/**
 * Called for allowing to enter Query Criteria
 */
function fnEnterQuery()
{
    // Pre action code
    if (!fnPreEnterQuery())
    {
        return;
    }

    resetDOM();
    resetElements();
    fnClearMultipleEntryBlocks();

    // Enable the PK elements to input the criteria
    fnEnablePKOnlyFields();
    fnDisableSubSysButtons();
    fnSetExitButton(true);
    // changeTabPageToFirstTab();
    if (gIsAuditExist)
    {
        if (document.forms[0].AUTHSTAT)
        {
            if (document.forms[0].ONCE_AUTH) fnDisableElement(document.forms[0].ONCE_AUTH);
            fnEnableElement(document.forms[0].MAKERID);
        } else
        {
            if (document.forms[0].AUTH_STATUS) fnDisableElement(document.forms[0].AUTH_STATUS);
        }
    }
    dbAuthFlag = false;
    dbRecFlag = false;

    toolbarActions();

    dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("buttonSave").disabled = true;
    dlgArg.mainWin.frames["FrameMenu"].document.getElementById("actions8").disabled = true;
    fnPostEnterQuery();
    fnSetFocusOnMasterPKField();
    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;//LoanOrigination Changes 
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');

}

/**
 * Called when Execute Query Action performed
 */
function fnExecuteQuery(reqDOM)
{
    var l_isFrmSum = false;
    if (dlgArg && dlgArg.ShowSummary && dlgArg.ShowSummary == "TRUE") l_isFrmSum = true;
    if (!fnPreExecuteQuery())
    {
        return;
    }

    // Dont build the Request if its frm the summary
    if (l_isFrmSum != true)
    {
        if (reqDOM == null)
        {
            fcjRequestDOM = buildUBSXml();
        } else
        {
            fcjRequestDOM = reqDOM;
        }
    } else resetDOM();
    intCurrentQueryResultIndex = 0;
    intCurrentQueryRecordCount = 0;
    if (l_isFrmSum != true)
    {
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    }
    if (l_isFrmSum == true)
    {
        fcjResponseDOM = dlgArg.SummaryResultFCJXML;
    }

    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
        if (msgStatus == 'FAILURE')
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
        if (msgStatus != 'SUCCESS')
        {
            var returnVal = displayResponse(messageNode);
        } else
        {
            var objQueryRecords = fcjResponseDOM.selectNodes("//FCUBS_BODY/REC");
            if (objQueryRecords.length == 0)
            {
                appendErrorCode('ST-COM036', null);
                var msg = buildMessage(gErrCodes);
                alertMessage(msg);
                disableForm();
                fnEnableSubSysButtons();
            } else
            {
                intCurrentQueryRecordCount = objQueryRecords.length;
                goToRec(1);
                disableForm();
                fnEnableSubSysButtons();
                fnPostExecuteQuery();
            }
        }
        fnSetExitButton(false);

        if (gIsAuditExist)
        {
            if (document.forms[0].AUTHSTAT)
            {
                fnDisableElement(document.forms[0].AUTHSTAT);
                if (document.forms[0].RECORD_STAT) fnDisableElement(document.forms[0].RECORD_STAT);
                if (document.forms[0].ONCE_AUTH) fnDisableElement(document.forms[0].ONCE_AUTH);
            } else
            {
                if (document.forms[0].AUTH_STATUS) fnDisableElement(document.forms[0].AUTH_STATUS);
            }
        }
    }
    dlgArg.ShowSummary = "FALSE";
    window.focus();
    fnSetAudtDesc();
    fnEnableBlockCheckBox();
    fnDisableMultipleAddDel();
}

function show_remarks()
{
    var dlgLeft = 100;
    var dlgTop = 50;
    var dlgArg = new Object();
    dlgArg.curWin = window;
    w = window.showModalDialog("Remarks.jsp", dlgArg, "center:yes; dialogHeight:160px; dialogWidth:400px; help:no; resizable:no; scroll:no; status:no;");
}


   //Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 starts 
function getTxnXmlDom(){
	var txnXmlDOM = getMSXmlDom();
	txnXmlDOM.loadXML(TxnXml.innerHTML);
	
	return txnXmlDOM;
}

function getMSXmlDom(){
	//var msXmlDOM = new ActiveXObject('Msxml2.DOMDocument.4.0'); //LoanOrigination Changes
	 var msXmlDOM =getMsXmlDom(); 
	msXmlDOM.async = false;
	msXmlDOM.resolveExternals = false;    
	var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
	msXmlDOM.setProperty("SelectionNamespaces", ns);
	
	return msXmlDOM;
}
	//Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 ends 


/*
 * Method to hold
 */
function fnHold()
{

    if (!fnPreHold())
    {
        gAction = 'NEW';
        return;
    }

    if (screenType == 'P' || screenType == 'T')
    {
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        // ctcb change
        /*
		 * if (gValidateProcess=='Y') if (!fnBPELvalidate()) return false;
		 */

        deleteFlag = "N";
        dbdomreq[gmasterFunctionID] = getXMLString(dbDataDOM);
        holdFlag = 'Y';
        fcjRequestDOM = buildTransactionXML();
        if (fnSaveTxnXml())
        {
            fnPostSave();
            if (screenType != "P" || typeof(dlgArg.status) != "undefined") // ctcb
            // issue
            // no
            // 61
            // change
            dlgArg.mainWin.frames["FrameMenuB"].fnBpelRefresh();
            fnExit("false"); // ctcb issue no 61 change

        }
        return;
    }
    gAction = "HOLD";

    if (gIsAuditExist)
    {
        appendData(document.getElementById("DIV_BLK_AUDIT"));
    }
    appendData(document.getElementById("TBLPage" + strCurrentTabID));

    // Build Request XML
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
        if (msgStatus == 'FAILURE')
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }

        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
        if (msgStatus == 'SUCCESS')
        {
            disableForm();
            document.getElementById("BTN_EXIT_IMG").src = cache1.src;
            fnEnableElement(document.forms(0).BTN_EXIT);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
            gAction = "";
            fnSetExitButton(false);
        } else
        {
            // ;
            gAction = temp_gActionHold;
            fnSetExitButton(true);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
        }
        var returnVal = displayResponse(messageNode);
        // release lock Anam added
        if (temp_gActionHold == 'MODIFY' && msgStatus == 'SUCCESS')
        {
            releaseLock();
            fnSetExitButton(false);
        }
    }
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', ''); // PATCH
}

/*
 * Method to reverse
 */

function fnReverse()
{

    gAction = "REVERSE";
    try
    {
        //eval('fnPreReverse()');
        var fnEval = new Function('fnPreReverse()');  
        fnEval();
    } catch(e)
    {}
    // FCUBS10ITR1 -- SFR 1018 START
    appendErrorCode('FC-MAINT18', null);
    if (! (confirmAction()))
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            gAction = "";
            return;
        }
    }
    // FCUBS10ITR1 -- SFR 1018 END
    if (gIsAuditExist)
    {
        appendData(document.getElementById("DIV_BLK_AUDIT"));
    }
    appendData(document.getElementById("TBLPage" + strCurrentTabID));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
        if (msgStatus == 'FAILURE')
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }

        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
        if (msgStatus == 'SUCCESS')
        {
            disableForm();
            document.getElementById("BTN_EXIT_IMG").src = cache1.src;
            fnEnableElement(document.forms(0).BTN_EXIT);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
            gAction = "";
            fnSetExitButton(false);
        } else
        {
            fnSetExitButton(true);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
        }
        var returnVal = displayResponse(messageNode);

    }
    try
    {
        //eval('fnPostReverse()');
        var fnEval = new Function('fnPostReverse()');  
        fnEval();
    } catch(e)
    {}

}

function displayException(exceptionsNode)
{
    var message = "";
    var returnVal = false;
    var messageNodes = exceptionsNode.selectNodes("./fcubs:error");
    var msg = "";
    var errCode = "";
    var type = "";
    // Check for firstNode is null or not given by Sankarganesh 16/03/05
    // if(firstNode){
    if (messageNodes)
    {
        for (var index = 0; index < messageNodes.length; index++)
        {
            msg = messageNodes.item(index).selectSingleNode("./fcubs:edesc").text;
            errCode = messageNodes.item(index).selectSingleNode("./fcubs:ecode").text;
            type = "I";
            message = message + errCode + " " + msg + "~";
        }
        returnVal = ShowErrorDialog(type, message);
    } else
    {
        appendErrorCode('ST-COM021', null);
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        returnVal = false;
    }
    return returnVal;
}

function fnSaveTxnXml()
{
    var ns = "xmlns:fcubs='http://fcubs.iflex.com'";

    fcjRequestDOM.setProperty("SelectionNamespaces", ns);

    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    if (fcjResponseDOM)
    {
        fcjResponseDOM.setProperty("SelectionNamespaces", ns);
        // if the response has a txn id....then load the payload into txnXmlDOM
        // (variable in launcher)
        if (txnXmlDOM == null)
        {
            //txnXmlDOM = new ActiveXObject('Msxml2.DOMDocument.4.0');
            txnXmlDOM =getMsXmlDom(); //LoanOrigination Changes
            txnXmlDOM.async = false;
            txnXmlDOM.resolveExternals = false;
            var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
            txnXmlDOM.setProperty("SelectionNamespaces", ns);
        }
        if (fcjResponseDOM.selectSingleNode("//fcubs:txnId").text != '')
        {
            txnXmlDOM.loadXML('<Payload>' + getXMLString(fcjResponseDOM.documentElement.cloneNode(true)) + '</Payload>');
        }

        var dbDataDOMXml = getXMLString(fcjResponseDOM.selectSingleNode("//fcubs:moduleData").childNodes[0].childNodes[1].childNodes[0]);

        var exceptionsNode = fcjResponseDOM.selectSingleNode("//fcubs:exceptions");
        dbDataDOM.loadXML(dbDataDOMXml);

        if (exceptionsNode)
        {
            document.getElementById("BTN_EXIT_IMG").src = cache1.src;
            fnEnableElement(document.forms(0).BTN_EXIT);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
            var returnVal = displayException(exceptionsNode);
            if (returnVal == 'POST')
            {
                // resend the response (without removing the exception
                // dom(including rulename, decision)
                fcjRequestDOM.loadXML(getXMLString(fcjResponseDOM));
                fnSaveTxnXml();
            }
            fnSetExitButton(true);
            if (fcjResponseDOM.selectSingleNode("//MSGSTAT").text == 'SUCCESS' && fcjResponseDOM.documentElement.selectSingleNode("//fcubs:txnIdentification/fcubs:operation").text == '')
            {
                document.getElementById("BTN_EXIT_IMG").src = cache1.src;
                fnEnableElement(document.forms(0).BTN_EXIT);
                toolbarReset();
                fnSetExitButton(false);
            }
        }
    }
    fnPostSave();
    return true;
}

function buildTransactionXML()
{

    var txnXML = '<?xml version="1.0"?>';
    var txnStartIndex = 0;
    var txnClosingIndex = 0;
    var xmlns = "http://fcubs.iflex.com";

    var xsi = "http://www.w3.org/2001/XMLSchema-instance";
    var schemaLocation = "http://fcubs.iflex.com";
    //var txnXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");//LoanOrigination Changes
    var txnXMLDOM =getMsXmlDom();
    txnXMLDOM.async = false;
    txnXMLDOM.resolveExternals = false;

    if (txnXmlDOM == null || getXMLString(txnXmlDOM) == "")
    {
        // Create the Transaction XML DOM.
        txnXMLDOM.loadXML(txnXML);
        txnXMLDOM.loadXML("<transaction/>");

        // create the atttributes of the Root Node.
        var transactionNode = txnXMLDOM.selectSingleNode("//transaction");
        transactionNode.setAttribute("taskId", "");
        if (screenType == "P" && gOperation == 'GETPRIORITY') transactionNode.setAttribute("txnPriority", "");
        // Create the TXNIdentification Child Node
        var txnidentificationNode = txnXMLDOM.createNode("element", "txnIdentification", xmlns);
        transactionNode.appendChild(txnidentificationNode);

        var txnidnode = txnXMLDOM.createNode("element", "txnId", xmlns);
        txnidentificationNode.appendChild(txnidnode);

        var instanceidnode = txnXMLDOM.createNode("element", "instanceId", xmlns);
        txnidentificationNode.appendChild(instanceidnode);

        var processnamenode = txnXMLDOM.createNode("element", "processName", xmlns);
        processnamenode.text = gProcessName;
        txnidentificationNode.appendChild(processnamenode);

        var branchcodennode = txnXMLDOM.createNode("element", "branchCode", xmlns);
        branchcodennode.text = dlgArg.mainWin.frames["Global"].CurrentBranch;
        txnidentificationNode.appendChild(branchcodennode);

        var modulecodennode = txnXMLDOM.createNode("element", "moduleCode", xmlns);
        modulecodennode.text = dlgArg.mainWin.frames["Global"].CurrentModule;
        txnidentificationNode.appendChild(modulecodennode);

        var currentusernode = txnXMLDOM.createNode("element", "currentUser", xmlns);
        currentusernode.text = dlgArg.mainWin.frames["Global"].UserId;
        txnidentificationNode.appendChild(currentusernode);

        var txncommentnode = txnXMLDOM.createNode("element", "txnComment", xmlns);
        txnidentificationNode.appendChild(txncommentnode);

        var taskoutcomenode = txnXMLDOM.createNode("element", "taskOutcome", xmlns);
        txnidentificationNode.appendChild(taskoutcomenode);

        var stagenode = txnXMLDOM.createNode("element", "stage", xmlns);
        stagenode.text = functionId;
        txnidentificationNode.appendChild(stagenode);

        var operationnode = txnXMLDOM.createNode("element", "operation", xmlns);
        txnidentificationNode.appendChild(operationnode);

        // Create the TransactionData Node.
        var transactiondatanode = txnXMLDOM.createNode("element", "transactionData", xmlns);
        transactionNode.appendChild(transactiondatanode);

        var moduledatanode = txnXMLDOM.createNode("element", "moduleData", xmlns);
        var reqDOM;
        var old_functionid = functionId;
        if (typeof(dbdomreq) != 'undefined')
        {
            for (i in dbdomreq)
            {
                dbDataDOM.loadXML(dbdomreq[i]);
                // var funactionArray=i.split('~');
                functionId = i;
                // gAction=i;
                reqDOM = buildUBSTxnXml();
                moduledatacode = reqDOM.documentElement;
                moduledatanode.appendChild(moduledatacode);
                transactiondatanode.appendChild(moduledatanode);
            }
        }
        functionId = old_functionid;
        // Create the Additional Fields Node
        var additionalfldnode = txnXMLDOM.createNode("element", "additionalFields", xmlns);
        transactionNode.appendChild(additionalfldnode);

        var charfieldnode = txnXMLDOM.createNode("element", "charField", xmlns);
        charfieldnode.setAttribute("additional_field_name", "=String");
        additionalfldnode.appendChild(charfieldnode);

        var numericFldnode = txnXMLDOM.createNode("element", "numericField", xmlns);
        numericFldnode.setAttribute("additional_field_name", "=String"); 
        var numericFldcode = txnXMLDOM.createCDATASection("3.1415926535897932384626433832795");
        numericFldnode.appendChild(numericFldcode);
        additionalfldnode.appendChild(numericFldnode);

        var datefieldnode = txnXMLDOM.createNode("element", "dateField", xmlns);
        datefieldnode.setAttribute("additional_field_name", "=String"); 
        var datefieldcode = txnXMLDOM.createCDATASection("1967-08-13");
        datefieldnode.appendChild(datefieldcode);
        additionalfldnode.appendChild(datefieldnode);

        var genericfldnode = txnXMLDOM.createNode("element", "genericField", xmlns);
        genericfldnode.setAttribute("additional_field_name", "=String");
        additionalfldnode.appendChild(genericfldnode);

        // Create the Documents node.
        var documentsnode = txnXMLDOM.createNode("element", "documents", xmlns);
        transactionNode.appendChild(documentsnode);

        var documentnode = txnXMLDOM.createNode("element", "document", xmlns);
        documentsnode.appendChild(documentnode);

        var docrefnode = txnXMLDOM.createNode("element", "docRef", xmlns);
        documentnode.appendChild(docrefnode);

        var doctypenode = txnXMLDOM.createNode("element", "docType", xmlns);
        documentnode.appendChild(doctypenode);

        var docurlnode = txnXMLDOM.createNode("element", "docUrl", xmlns);
        documentnode.appendChild(docurlnode);

        var docoperationnode = txnXMLDOM.createNode("element", "docOperation", xmlns);
        documentnode.appendChild(docoperationnode);

        var docremarksnode = txnXMLDOM.createNode("element", "docRemarks", xmlns);
        documentnode.appendChild(docremarksnode);

        // Create the Exceptions Node
        var exceptionsnode = txnXMLDOM.createNode("element", "exceptions", xmlns);
        transactionNode.appendChild(exceptionsnode);

        var exceptionnode = txnXMLDOM.createNode("element", "error", xmlns);
        exceptionsnode.appendChild(exceptionnode);

        var exceptioncodenode = txnXMLDOM.createNode("element", "ecode", xmlns);
        exceptionnode.appendChild(exceptioncodenode);

        /*
		 * var exceptiontypenode =
		 * txnXMLDOM.createNode("element","etype",xmlns);
		 * exceptionnode.appendChild(exceptiontypenode);
		 */

        var exceptiondescnode = txnXMLDOM.createNode("element", "edesc", xmlns);
        exceptionnode.appendChild(exceptiondescnode);

        // Create TaskAssignment Node
        var taskAssignmentnode = txnXMLDOM.createNode("element", "taskAssignment", xmlns);
        transactionNode.appendChild(taskAssignmentnode);

        var assignmentrulenode = txnXMLDOM.createNode("element", "assignmentRule", xmlns);
        taskAssignmentnode.appendChild(assignmentrulenode);

        var srcsystemnode = txnXMLDOM.createNode("element", "sourceSystem", xmlns);
        taskAssignmentnode.appendChild(srcsystemnode);

        var assigneesnode = txnXMLDOM.createNode("element", "assignees", xmlns);
        taskAssignmentnode.appendChild(assigneesnode);

        var assigneeIdnode = txnXMLDOM.createNode("element", "assigneeId", xmlns);
        assigneesnode.appendChild(assigneeIdnode);

        var assigneenamenode = txnXMLDOM.createNode("element", "assigneeName", xmlns);
        assigneesnode.appendChild(assigneenamenode);

        var assigneetypenode = txnXMLDOM.createNode("element", "assigneeType", xmlns);
        assigneesnode.appendChild(assigneetypenode);

        // Create FlowControlRule Node
        var flowctrlrulenode = txnXMLDOM.createNode("element", "flowControlRule", xmlns);
        transactionNode.appendChild(flowctrlrulenode);

        var rulenamenode = txnXMLDOM.createNode("element", "ruleName", xmlns);
        flowctrlrulenode.appendChild(rulenamenode);

        var decisionnode = txnXMLDOM.createNode("element", "decision", xmlns);
        flowctrlrulenode.appendChild(decisionnode);

        // Create Audit Node
        var txnAuditnode = txnXMLDOM.createNode("element", "txnAuditDetails", xmlns);
        transactionNode.appendChild(txnAuditnode);

        var SeqNonode = txnXMLDOM.createNode("element", "SeqNo", xmlns);
        txnAuditnode.appendChild(SeqNonode);

        var userIdnode = txnXMLDOM.createNode("element", "userId", xmlns);
        txnAuditnode.appendChild(userIdnode);

        var actionnode = txnXMLDOM.createNode("element", "action", xmlns);
        txnAuditnode.appendChild(actionnode);

        var actionDateTimenode = txnXMLDOM.createNode("element", "actionDateTime", xmlns);
        txnAuditnode.appendChild(actionDateTimenode);

        var userCommentsnode = txnXMLDOM.createNode("element", "userComments", xmlns);
        txnAuditnode.appendChild(userCommentsnode);
        // audit\

        if (txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(0).text == "")
        {
            txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(0).text = "~" + 1;
        } else
        {
            var seqnoArray = txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(0).text.split("~");
            var lastSeqno = seqnoArray[seqnoArray.length] + 1;
            txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(0).text = txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(0).text + "~" + lastSeqno;
        }
        txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(1).text = txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(1).text + "~" + taskId;
        txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(2).text = txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(2).text + "~" + dlgArg.mainWin.frames["Global"].UserId;
        txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(3).text = txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(3).text + "~" + "ACCEPT";
        txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(4).text = txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(4).text + "~" + "hi";
        txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(5).text = txnXMLDOM.documentElement.childNodes.item(7).childNodes.item(5).text + "~" + StageComments;

        transactionNode.setAttribute("xmlns", xmlns);
        transactionNode.setAttribute("status", "");

    } else
    {
        txnXmlDOM.selectSingleNode("//fcubs:txnIdentification/fcubs:operation").text = ""; // clear
        // the
        // (initiate)
        // operation
        while (txnXmlDOM.selectSingleNode("//fcubs:moduleData").childNodes.length > 0)
        {
            var childNode = txnXmlDOM.selectSingleNode("//fcubs:moduleData").childNodes[0];
            txnXmlDOM.selectSingleNode("//fcubs:moduleData").removeChild(childNode);
        }
        var moduledatanode = txnXmlDOM.selectSingleNode("//fcubs:moduleData").cloneNode(true);
        var childNode = txnXmlDOM.selectSingleNode("//fcubs:moduleData");
        txnXmlDOM.selectSingleNode("//fcubs:transactionData").removeChild(childNode);
        var transactiondatanode = txnXmlDOM.selectSingleNode("//fcubs:transactionData").cloneNode(true);
        var old_functionid = functionId;
        if (typeof(dbdomreq) != 'undefined')
        {
            for (i in dbdomreq)
            {
                dbDataDOM.loadXML(dbdomreq[i]);
                functionId = i;
                reqDOM = buildUBSTxnXml();
                moduledatacode = reqDOM.documentElement.cloneNode(true);
                moduledatanode.appendChild(moduledatacode.cloneNode(true));
            }
        }
        transactiondatanode.appendChild(moduledatanode.cloneNode(true));
        functionId = old_functionid;
        var childNode = txnXmlDOM.selectSingleNode("//fcubs:transactionData");
        txnXmlDOM.selectSingleNode("//fcubs:transaction").removeChild(childNode);
        txnXmlDOM.selectSingleNode("//fcubs:transaction").appendChild(transactiondatanode);
        txnXmlDOM.selectNodes("//fcubs:exception").removeAll();
        var exceptionsNode = txnXmlDOM.selectSingleNode("//fcubs:exceptions");
        var exceptionnode = txnXmlDOM.createNode("element", "error", xmlns);
        exceptionsNode.appendChild(exceptionnode);
        var exceptioncodenode = txnXMLDOM.createNode("element", "ecode", xmlns);
        exceptionnode.appendChild(exceptioncodenode);
        var exceptiondescnode = txnXMLDOM.createNode("element", "edesc", xmlns);
        exceptionnode.appendChild(exceptiondescnode);
        // remove the exception nodes and rebuild.

        // clear the rulename and other decision tags
        if (txnXmlDOM.selectSingleNode("//fcubs:flowControlRule/fcubs:ruleName") && txnXmlDOM.selectSingleNode("//fcubs:flowControlRule/fcubs:decision"))
        {
            txnXmlDOM.selectSingleNode("//fcubs:flowControlRule/fcubs:ruleName").text = "";
            txnXmlDOM.selectSingleNode("//fcubs:flowControlRule/fcubs:decision").text = "";
        }
        if (txnXmlDOM.selectSingleNode("//fcubs:transaction"))
        {
            txnXmlDOM.selectSingleNode("//fcubs:transaction").setAttribute("taskId", taskId);
            txnXML = getXMLString(txnXmlDOM.selectSingleNode("//fcubs:transaction"));
        } else
        {
            txnXML = getXMLString(txnXmlDOM.selectSingleNode("//Payload"));
            txnXML = txnXML.substring(txnXML.indexOf('>') + 1, txnXML.lastIndexOf('<'));
            txnXML = "<?xml version='1.0'?><transaction xmlns='http://fcubs.iflex.com' taskId='" + taskId + "'>" + txnXML + "</transaction>";
        }
        txnXMLDOM.loadXML(txnXML);
        var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
        txnXMLDOM.setProperty("SelectionNamespaces", ns);
        // ctcb changes start
        txnXMLDOM.selectSingleNode("//fcubs:stage").text = functionId;
        txnXMLDOM.selectSingleNode("//fcubs:txnComment").text = document.getElementById("AUDIT_FIELD").value;
        if (duplicateTaskcheckReq == "Y" && duplicateFieldList != "null" && typeof(duplicateFieldList) != "undefined" && duplicateFieldList != "" && gOperation == 'DUPLICATETASKCHECK')
        {
            // ctcb lot1 infra change starts
            // var duplicateFieldArray=duplicateFieldList.split("~");
            // var duplicateValueList="";
            // for (i in duplicateFieldArray)
            // {
            // duplicateValueList +=
            // document.getElementById(duplicateFieldArray[i]).value + '~';
            // }

            txnXMLDOM.selectSingleNode("//fcubs:charField").text = duplicateValueList; // ctcb
            // lot1
            // infra
            // change
            // ends
            txnXMLDOM.selectSingleNode("//fcubs:charField").setAttribute("additional_field_name", "DUPLICATETASKCHECK");
        }
        if (screenType == "P" && gOperation == 'GETPRIORITY')
        {
            txnXMLDOM.selectSingleNode("//fcubs:charField").text = fnGetProcessCode() + '~' + fnGetCustomerNo() + '~' + fnGetChannel() + '~' + fnGetProductCode();
            txnXMLDOM.selectSingleNode("//fcubs:charField").setAttribute("additional_field_name", "GETPRIORITY");
            txnXMLDOM.selectSingleNode("//fcubs:transaction").setAttribute("txnPriority", "");
        }
 txnXMLDOM.selectSingleNode("//fcubs:updateAttribute").text=gTextAttribute3+"~"+gTextAttribute4+"~"+gTextAttribute5+"~"+gTextAttribute6+"~"+gTextAttribute7+"~"+gTextAttribute8+"~"+gTextAttribute9+"~"+gTextAttribute10+"~"+"!"+gProcTextAttribute1+"~"+gProcTextAttribute2+"~"+gProcTextAttribute3+"~"+gProcTextAttribute4+"~"+gProcTextAttribute5+"~"+"!"+gNumAttribute2+"~"+gNumAttribute3+"~"+gNumAttribute4+"~"+gNumAttribute5+"~"+"!"+gDateAttribute1+"~"+gDateAttribute2+"~"+gDateAttribute3+"~"+gDateAttribute4+"~"+gDateAttribute5+"~";  // added for Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 
        // get priority propagation fix
        if (holdFlag == "Y" || nextDayFlag == "Y")
        {
            txnXMLDOM.selectSingleNode("//fcubs:charField").text = gTextAttribute3 + "~" + gTextAttribute4 + "~" + gTextAttribute5 + "~" + gTextAttribute6 + "~" + gTextAttribute7 + "~" + gTextAttribute8 + "~" + gTextAttribute9 + "~" + gTextAttribute10 + "~" + "!" + gProcTextAttribute1 + "~" + gProcTextAttribute2 + "~" + gProcTextAttribute3 + "~" + gProcTextAttribute4 + "~" + gProcTextAttribute5 + "~" + "!" + gNumAttribute2 + "~" + gNumAttribute3 + "~" + gNumAttribute4 + "~" + gNumAttribute5 + "~" + "!" + gDateAttribute1 + "~" + gDateAttribute2 + "~" + gDateAttribute3 + "~" + gDateAttribute4 + "~" + gDateAttribute5 + "~";
            txnXMLDOM.selectSingleNode("//fcubs:charField").setAttribute("additional_field_name", "HOLD");
        }
        txnXMLDOM.selectSingleNode("//fcubs:transaction").setAttribute("txnPriority", document.getElementById("DROP_PRIORITYLIST").value);

        // ctcb changes end
        txnXMLDOM.selectSingleNode("//fcubs:operation").text = gOperation;

        if (document.getElementById("PROCESS_ACTIONS") && holdFlag == "N" && nextDayFlag == "N") txnXMLDOM.selectSingleNode("//fcubs:taskOutcome").text = document.getElementById("PROCESS_ACTIONS").value;
        else if (holdFlag == "Y")
        {
            txnXMLDOM.selectSingleNode("//fcubs:operation").text = "HOLD";
        } else if (nextDayFlag == "Y")
        {
            txnXMLDOM.selectSingleNode("//fcubs:operation").text = "NEXTDAYTASK";
        }
        txnXMLDOM.selectSingleNode("//fcubs:currentUser").text = dlgArg.mainWin.frames["Global"].UserId;
        txnXMLDOM.selectSingleNode("//fcubs:branchCode").text = dlgArg.mainWin.frames["Global"].CurrentBranch;
        txnXMLDOM.selectSingleNode("//fcubs:stage").text = functionId;

    }

    // audit\
    var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
    txnXMLDOM.setProperty("SelectionNamespaces", ns);
    var auditNode = txnXMLDOM.selectSingleNode("//fcubs:txnAuditDetails");
    // ctcb lot1 infra change for bpelaudit starts
    /*
 * if (auditNode.childNodes.item(0).text==""){
 * auditNode.childNodes.item(0).text="~"+1; } else { var
 * seqnoArray=auditNode.childNodes.item(0).text.split("~"); var
 * lastSeqno=(seqnoArray[seqnoArray.length-1]*1)+1;
 * auditNode.childNodes.item(0).text=auditNode.childNodes.item(0).text+"~"+lastSeqno; } //
 * Append the basic audit details
 * auditNode.childNodes.item(1).text=auditNode.childNodes.item(1).text + "~"
 * +taskId; auditNode.childNodes.item(2).text=auditNode.childNodes.item(2).text +
 * "~" +dlgArg.mainWin.frames["Global"].UserId;
 * auditNode.childNodes.item(3).text=auditNode.childNodes.item(3).text + "~" +
 * document.getElementById("PROCESS_ACTIONS").value;
 * auditNode.childNodes.item(4).text=auditNode.childNodes.item(4).text + "~"
 * +dlgArg.mainWin.frames["Global"].AppDate;
 * auditNode.childNodes.item(5).text=auditNode.childNodes.item(5).text + "~"
 * +document.getElementById("AUDIT_FIELD").value;
 */
    if (gOperation != 'GETPRIORITY')
    { // ctcb bug no 44
        if (auditNode.selectSingleNode("//fcubs:SeqNo").text == "")
        {
            auditNode.selectSingleNode("//fcubs:SeqNo").text = "~" + 1;
        } else
        {
            var seqnoArray = auditNode.selectSingleNode("//fcubs:SeqNo").text.split("~");
            var lastSeqno = (seqnoArray[seqnoArray.length - 1] * 1) + 1;
            auditNode.selectSingleNode("//fcubs:SeqNo").text = auditNode.selectSingleNode("//fcubs:SeqNo").text + "~" + lastSeqno;
        }

        auditNode.selectSingleNode("//fcubs:userId").text = auditNode.selectSingleNode("//fcubs:userId").text + "~" + dlgArg.mainWin.frames["Global"].UserId;
        auditNode.selectSingleNode("//fcubs:historyTasks").text = auditNode.selectSingleNode("//fcubs:historyTasks").text + "~" + taskId;
        auditNode.selectSingleNode("//fcubs:action").text = auditNode.selectSingleNode("//fcubs:action").text + "~" + document.getElementById("PROCESS_ACTIONS").value;
        auditNode.selectSingleNode("//fcubs:actionDateTime").text = auditNode.selectSingleNode("//fcubs:actionDateTime").text + "~" + dlgArg.mainWin.frames["Global"].AppDate;
        auditNode.selectSingleNode("//fcubs:userComments").text = auditNode.selectSingleNode("//fcubs:userComments").text + "~" + document.getElementById("AUDIT_FIELD").value;
        // ctcb lot1 infra change for bpelaudit ends
    } // ctcb bug no 44
    return txnXMLDOM;
}

/**
 * Function to be called from Authorize.js to build Auth Query Request XML This
 * xml is used to bring all the versions to be authorized for the current Screen
 * Record
 */
function getVersions()
{
    return buildUBSXml();
}

/**
 * Function to be called from Authorize.js To Submit the Auth Query Request to
 * Server. Since Servlet name won't be available in Authorize.js, this is
 * written here
 */
function postQuery(objReqDOM)
{
    // debug(dlgArg.mainWin, objReqDOM.xml, "P");
    var qryResponse = fnPost(objReqDOM, servletURL, functionId);
    return qryResponse;
}

function fnProcessAuth(recPart)
{
    gAction = "AUTH";
    var recId = fnGetPKValues() ;//LoanOrigination Changes 
    var oldMod = dbDataDOM.selectSingleNode("//MOD_NO").text;
    dbDataDOM.selectSingleNode("//MOD_NO").text = selectedMod;
    fcjRequestDOM = buildUBSXml();
    dbDataDOM.selectSingleNode("//MOD_NO").text = oldMod;
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    fnProcessResponse();
    fnSetExitButton(false);
}

function fnSetExitButton(enableBtn)
{
    fnEnableElement(document.forms(0).BTN_EXIT);
    document.forms(0).BTN_EXIT.focus();
    if (enableBtn)
    {
        if (gAction == "ENTERQUERY")
        {
            document.getElementById("BTN_EXIT_IMG").src = cache2.src;
        } else document.getElementById("BTN_EXIT_IMG").src = cache2.src;

    } else
    {
        gAction = "";
        document.getElementById("BTN_EXIT_IMG").src = cache1.src;
    }
}

/**
 * The HTML form elements a custom attribute called REQUIRED which can have
 * value 0 and -1. -1 indicates that the field is a mandatory field. Validate
 * for the all the fields with REQUIRED == -1 and append the error code.
 */
function fnValidateMandatory()
{

    var validate = true;
    var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
    var tempVal = "";
    for (var elemIndex = 0; elemIndex < elements.length; elemIndex++)
    {

        if (elements[elemIndex] && elements[elemIndex].type.toUpperCase() == "RADIO") continue;
        if (elements[elemIndex].REQUIRED == -1)
        {
            tempVal = getFieldData(elements[elemIndex]);
            if (isNull(tempVal))
            {
                var label = fnGetLabel(elements[elemIndex]);
                appendErrorCode('ST-COM013', label);
                validate = false;
            }
        }
    }

    var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
    for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++)
    {
        if (elements1[elemIndex1].REQUIRED == -1)
        {
            tempVal = getFieldData(elements1[elemIndex1]);
            if (isNull(tempVal))
            {
                var label = fnGetLabel(elements1[elemIndex1]);
                appendErrorCode('ST-COM013', label);
                validate = false;
            }
        }
    }
    var elements = document.getElementById("ResTree").getElementsByTagName("SELECT");
    for (var elemIndex = 0; elemIndex < elements.length; elemIndex++)
    {
        if (elements[elemIndex].REQUIRED == -1)
        {
            tempVal = getFieldData(elements[elemIndex]);
            if (isNull(tempVal))
            {
                var label = fnGetLabel(elements[elemIndex]);
                appendErrorCode('ST-COM013', label);
                validate = false;
            }
        }
    }
    return validate;
}

/**
 * Kals On June 9 .. If the field is frm ME , prepend the block lable and the
 * field label Chk the Field is From ME block or SE Blk .. For ME blk , DBT =
 * "", later there can some attribute to give a better distinction of ME and SE.
 * If the Field is frm ME , then if the blk lable shud also be shwn in Err
 * presentation
 */

function fnGetLabel(obj)
{

    var l_FldSetLbl = "";
    var l_DBT = "";
    if (obj.DBT) l_DBT = obj.DBT;
    if (l_DBT) l_FldSetLbl = fnGetFldSetLbl(l_DBT);
    var l_temp = obj;
    if (l_temp.DBT == null || l_temp.DBT == "")
    {
        var l_parent = l_temp.parentNode;
        while (! (l_parent.tagName == 'TABLE'))
        {
            l_temp = l_parent;
            l_parent = l_temp.parentNode;
        }
        l_DBT = l_parent.getAttribute("DBT");
        l_FldSetLbl = fnGetFldSetLbl(l_DBT);
    }
    if (obj.LABEL_VALUE && trim(obj.LABEL_VALUE) != "" && l_FldSetLbl.length > 0)
    {
        return ("Mandatory field  " + obj.LABEL_VALUE + "  In  " + l_FldSetLbl);
    }

    if (obj.LABEL_VALUE && trim(obj.LABEL_VALUE) != "" && l_FldSetLbl.length == 0)
    {
        if (obj.REQUIRED == -1) return "Mandatory field  " + obj.LABEL_VALUE;
        else return obj.LABEL_VALUE;

    }
    return obj.name;
}

function fnGetFldSetLbl(v_DBT)
{

    var l_isMe = false;
    var l_Lbl = "";
    for (var l_Cnt = 0; l_Cnt < multipleEntryIDs.length; l_Cnt++)
    {
        if (multipleEntryIDs[l_Cnt].toUpperCase() == "BLK_" + v_DBT.toUpperCase())
        {
            l_isMe = true;
            break;
        }
    }
    if (l_isMe)
    {
        if (gscrPos != "template")
        {
            var l_FldSet = document.getElementById("LBL_FLDSET_BLK_" + v_DBT);
            if (l_FldSet) return l_FldSet.value;
            else return "";
        } else
        {
            // Changed by Saidul for Template position
            var FldSetCaption = document.getElementById("BLK_" + v_DBT).getAttribute("caption");
            return FldSetCaption;
        }
    }
    return "";

}

/**
 * The HTML form elements a custom attribute called DTYPE which can have values
 * VARCHAR, CHAR, DATE, NUMERIC.Validate the fields for the correct datatype.
 * Ignore DATE and AMOUNT as they are entities which will be validated by the
 * Entity model. Append the error code if the validation fail.
 */
function fnValidateDataType()
{

    var validate = true;
    var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
    var tempVal = "";
    for (var elemIndex = 0; elemIndex < elements.length; elemIndex++)
    {
        if (elements[elemIndex].type != 'hidden')
        {
            tempVal = getFieldData(elements[elemIndex]);
            if ((elements[elemIndex].REQUIRED == '0') && (tempVal == ''))
            {
                continue;
            }
            if (elements[elemIndex].DTYPE == 'NUMERIC' || elements[elemIndex].DTYPE == 'NUMBER' || elements[elemIndex].DTYPE == 'DECIMAL' || elements[elemIndex].DTYPE == 'SMALLINT' || elements[elemIndex].DTYPE == 'INTEGER')
            {
                tempVal = getFieldData(elements[elemIndex]);
                if (!isNumeric(tempVal))
                {
                    var l_Label = fnGetLabel(elements[elemIndex]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
            if (elements[elemIndex].DTYPE == 'VARCHAR' || elements[elemIndex].DTYPE == 'VARCHAR2' || elements[elemIndex].DTYPE == 'CHAR')
            {
                tempVal = getFieldData(elements[elemIndex]);
                if (!isAlphaNumeric(tempVal))
                {
                    var l_Label = fnGetLabel(elements[elemIndex]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
        }
    }

    var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
    for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++)
    {
        tempVal = getFieldData(elements1[elemIndex1]);
        if ((elements1[elemIndex1].REQUIRED == '0') && (tempVal == ''))
        {
            continue;
        }
        if (elements1[elemIndex1].DTYPE == 'NUMERIC' || elements1[elemIndex1].DTYPE == 'DECIMAL' || elements1[elemIndex1].DTYPE == 'SMALLINT' || elements1[elemIndex1].DTYPE == 'INTEGER' || elements1[elemIndex1].DTYPE == 'NUMBER')
        {
            tempVal = getFieldData(elements1[elemIndex1]);
            if (!isNumeric(tempVal))
            {
                var l_Label = fnGetLabel(elements1[elemIndex1]);
                appendErrorCode('FC-MAINT02', l_Label);
                validate = false;
            }
        }
        if (elements1[elemIndex1].DTYPE == 'VARCHAR' || elements1[elemIndex1].DTYPE == 'VARCHAR2' || elements1[elemIndex1].DTYPE == 'CHAR')
        {
            tempVal = getFieldData(elements1[elemIndex1]);
            if (!isAlphaNumeric(tempVal))
            {
                var l_Label = fnGetLabel(elements1[elemIndex1]);
                appendErrorCode('FC-MAINT02', l_Label);
                validate = false;
            }
        }
    }
    return validate;
}

/**
 * This Function Will Disable all Primary Key Fields.
 */

function fnDisablePKFields()
{
    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++) fnDisableElement(document.getElementById(pkFields[loopIndex]));
}

/**
 * This function will the necessary steps when user close the function window
 * directly, from the winow's exit button insert of application close button.
 */

function fnDirectClose()
{
    resetElements();
    disableForm();
    if (gAction == "MODIFY")
    {
        releaseLock();
    }
    gAction = "";
    fnClearMultipleEntryBlocks();
    toolbarReset();
    isExitTriggered = true;
    // dlgArg.mainWin.fnExit(window);
    fnExit();
}

/**
 * For auth response will be read here . Saidul added for neo phase2
 */

function displayResponse_auth(messageNode, isModal)
{
    var isModal = (isModal == null) ? true: isModal;
    var message = "";
    var returnVal = false;
    if (messageNode)
    {
        var firstNode = messageNode.selectSingleNode("//MESSAGE");
        if (firstNode)
        {
            var type = firstNode.getAttribute("TYPE");
            var messageNodes = messageNode.selectNodes("//MESSAGE");//LoanORigination Changes  
            for (var index = 0; index < messageNodes.length; index++)
            {
                var msg = messageNodes.item(index).text;
                message = message + msg + "~";
            }
            if (isModal) returnVal = ShowErrorDialog(type, message);
            else returnVal = ShowErrorDialog(type, message, isModal, false);
            return returnVal;
        } else
        {
            appendErrorCode('ST-COM021', null);
            var msg = buildMessage(gErrCodes);
            alertMessage(msg);
            disableForm();
            returnVal = false;
        }
    }
}

/**
 * Functions to handel sub screen
 */

function extractSubSysStat(statusStr, subsys)
{
    var stat;
    var start;
    start = statusStr.indexOf(subsys + ':');
    if (start == -1)
    {
        return 'NULL';
    }
    stat = statusStr.substr(start + subsys.length + 1, 1);
    return stat;
}

function getCurrentSubSysStat(subsys)
{
    var statusStr = document.getElementsByName('SUBSYSTEMSTAT')[0].value;
    return extractSubSysStat(statusStr, subsys);
}

function setSubSystemAsChanged(subsys)
{
    var start;
    var statusStr = document.getElementsByName('SUBSYSTEMSTAT')[0].value;
    if (statusStr.indexOf(subsys + ':') == -1)
    {
        return;
    }
    statusStr = statusStr.replace(subsys + ':U', subsys + ':D');
    statusStr = statusStr.replace(subsys + ':S', subsys + ':D');
    document.getElementsByName('SUBSYSTEMSTAT')[0].value = statusStr;
}

function getSubSysStatFromResp(pureXMLDOM, subsys)
{
    var statusStr = pureXMLDOM.selectSingleNode(dbStrRootTableName + "/SUBSYSTEMSTAT").text;
    return extractSubSysStat(statusStr, subsys);
}

function goToServerForSubSystem(subsys)
{
    var ActionCode = gAction;
    gAction = "SUBSYS_PKP";

    fcjRequestDOM = buildUBSXml();
    gAction = ActionCode;
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM)
    {
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        var subsysyStat = pureXMLDOM.selectSingleNode(dbStrRootTableName + "/SUBSYSTEMSTAT").text;
        document.getElementsByName(dbStrRootTableName + '__SUBSYSTEMSTAT')[0].value = subsysyStat;
        stat = getSubSysStatFromResp(pureXMLDOM, subsys);
        if (stat == 'D')
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            displayResponse(messageNode);
            return false;
        }
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
        gAction = ActionCode;
        return true;
    } else
    {
        gAction = ActionCode;
        return false;
    }
}

function fnShowSubSystem(functionId, screenName)
{
    fnPreShowSubSystem();
    var dbDOMBefore;
    var dbDOMAfter;
    var subsys = subSysFunIDMapping[functionId];
    var stat = getCurrentSubSysStat(subsys);
    if (typeof(l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") appendData(document.getElementById("TBLPage" + l_HeaderTabId));
    if ((stat != 'NULL') && ((gAction != "") && (gAction != "EXECUTEQUERY")))
    {
        if ((stat != 'U') && (stat != 'S'))
        {
            if (!goToServerForSubSystem(subsys)) return;
        }
    } else
    {}
    dbDOMBefore = getXMLString(dbDataDOM);
    fnShowScreen(functionId, screenName);//LoanOrigination Changes
    dbDOMAfter = getXMLString(dbDataDOM);
    if (dbDOMAfter != dbDOMBefore)
    {
        changedflg = true;
    } else
    {
        changedflg = false;
    }
    fnSetDependentSubSystem(subsys, changedflg);
    fnPostShowSubSystem();
}

function fnProductPickup()
{
    fnPreProductPickup();
    g_prev_gAction = gAction;
    gAction = 'PRD_DFLT';

    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
        if (msgStatus == 'FAILURE')
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            var returnVal = displayResponse(messageNode);
            fnSetExitButton(true);
        }

        if (msgStatus == 'SUCCESS')
        {
            /*
				 * var html = ShowXML(xmlFileName, '', xslFileName);
				 * ResTree.innerHTML = "";
				 * ResTree.insertAdjacentHTML("afterBegin", html);
				 */
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
            fnSetExitButton(true);
        }
    }
    gAction = g_prev_gAction;
    enableForm();
    fnPostProductPickup();
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');

}

/*
 * function fnRollover() Added BY Saidul
 */
function fnRollover()
{

    if (!fnPreHold())
    {
        gAction = 'NEW';
        return;
    }
    gProcTextAttribute2 = getWorkflowReferenceNo();

    if (screenType == 'P' || screenType == 'T')
    {
        appendData(document.getElementById("TBLPage" + strCurrentTabID));

        //	deleteFlag = "N";
        //	dbdomreq[gmasterFunctionID]=getXMLString(dbDataDOM);
        nextDayFlag = 'Y';
        dbdomreq[gmasterFunctionID] = getXMLString(dbDataDOM);
        fcjRequestDOM = buildTransactionXML();
        if (fnSaveTxnXml())
        {
            fnPostSave();
            if (screenType != "P" || typeof(dlgArg.status) != "undefined") // ctcb
            // issue
            // no
            // 61
            // change
            dlgArg.mainWin.frames["FrameMenuB"].fnBpelRefresh();
            fnExit("false"); // ctcb issue no 61 change

        }
        return;
    }

    gAction = "ROLLOVER";
    if (gIsAuditExist)
    {
        appendData(document.getElementById("DIV_BLK_AUDIT"));
    }
    appendData(document.getElementById("TBLPage" + strCurrentTabID));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM)
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;

        if (msgStatus == 'FAILURE')
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
        {
            var messageNode = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
        if (msgStatus == 'SUCCESS')
        {
            disableForm();
            document.getElementById("BTN_EXIT_IMG").src = cache1.src;
            fnEnableElement(document.forms(0).BTN_EXIT);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
            gAction = "";
            fnSetExitButton(false);
        } else
        {
            gAction = "";
            fnSetExitButton(false);
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
        }
        var returnVal = displayResponse(messageNode);
    }

}

/*
 * function fnConfirm() Added BY Saidul
 */
function fnConfirm()
{
    try
    {
        if (!fnPreConfirm())
        {
            var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
            if (validate == 'N')
            {
                debug(dlgArg.mainWin, "No Validation at Client Side", "P");
            }
            if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
            {
                return;
            }
        }
    } catch(e)
    {
        // Do nothing.
    }
    gAction = "CONFIRM_QRY";

    if (!fnValidateOperation())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            fnSetExitButton(false);
            return;
        }
    }
    var dlgArgsForConfirmQuery = new Object();
    dlgArgsForConfirmQuery.mainWin = dlgArg.mainWin;
    dlgArgsForConfirmQuery.parentWin = window;

    dlgArgsForConfirmQuery.screenTitle = screenTitle;
    dlgArgsForConfirmQuery.screenType = 'T';

    var screenArgs = new Array();
    screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
    var funcId = dlgArgsForConfirmQuery.parentWin.functionId;
    var userLanguageCode = dlgArg.mainWin.frames("Global").LangCode;
    funcId = funcId.substring(0, funcId.length - 2) + 'CQ';
    screenArgs['FUNCTION_ID'] = funcId;
    // screenArgs['DESCRIPTION'] = 'Details';
    screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + userLanguageCode + '/' + funcId + '.xml', screenArgs['SCREEN_NAME']);
    screenArgs['LANG'] = userLanguageCode;
    screenArgs['UI_XML'] = 'CVS_MAIN';
    screenArgs['PARENT_FUNC_ID'] = dlgArgsForConfirmQuery.parentWin.functionId;
    screenArgs['parentWin'] = dlgArgsForConfirmQuery.parentWin;
    fnShowCallForm(screenArgs);
    fnSetExitButton(false);
    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value;//LoanOrigination Changes
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');

}

function fnLiquidate()
{
    try
    {
        if (!fnPreLiquidate())
        {
            var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
            if (validate == 'N')
            {
                debug(dlgArg.mainWin, "No Validation at Client Side", "P");
            }
            if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
            {
                return;
            }
        }

    } catch(e)
    {
        // Do nothing.
    }
    gAction = "LIQUIDATE_QRY";

    if (!fnValidateOperation())
    {
        var validate = dlgArg.mainWin.frames['Global'].ValidateFlag;
        if (validate == 'N')
        {
            debug(dlgArg.mainWin, "No Validation at Client Side", "P");
        }
        if (dlgArg.mainWin.frames['Global'].ValidateFlag == 'Y')
        {
            fnSetExitButton(false);
            return;
        }
    }

    var dlgArgsForLiquidateQuery = new Object();
    dlgArgsForLiquidateQuery.mainWin = dlgArg.mainWin;
    dlgArgsForLiquidateQuery.parentWin = window;
    dlgArgsForLiquidateQuery.screenTitle = screenTitle;
    dlgArgsForLiquidateQuery.screenType = 'T';

    var screenArgs = new Array();
    screenArgs['SCREEN_NAME'] = 'CVS_MAIN';

    var funcId = dlgArgsForLiquidateQuery.parentWin.functionId;
    var userLanguageCode = dlgArg.mainWin.frames("Global").LangCode;
    funcId = funcId.substring(0, funcId.length - 2) + 'LQ';
    screenArgs['FUNCTION_ID'] = funcId;
    // screenArgs['DESCRIPTION'] = 'Details';
    screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + userLanguageCode + '/' + funcId + '.xml', screenArgs['SCREEN_NAME']);
    screenArgs['LANG'] = userLanguageCode;
    screenArgs['UI_XML'] = 'CVS_MAIN';
    screenArgs['PARENT_FUNC_ID'] = dlgArgsForLiquidateQuery.parentWin.functionId;
    screenArgs['parentWin'] = dlgArgsForLiquidateQuery.parentWin;
    fnShowCallForm(screenArgs);
    fnSetExitButton(false);
    var l_FncId = dlgArg.mainWin.frames["FrameToolbar"].document.getElementById("fastpath").value ;//LoanOrigination Changes
    dlgArg.mainWin.frames["FrameToolbar"].showToolbar(l_FncId, '', '');

}

// Kals on June 29 . Sets the Contract Status Desc
function fnSetAudtDesc()
{
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
    if (l_P_Val == "N") l_P_Val = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_PEND_AUTH");
    if (l_P_Val == "A") l_P_Val = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_PEND_RELEASE");
    if (l_P_Val == "P") l_P_Val = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_PROCESSED");
    if (l_P_Val == "F") l_P_Val = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_FAILED_VERIFICATION");
    if (l_P_Val == "H") l_P_Val = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_HOLD");
    l_Process_StatObj[0].value = l_P_Val;

}

function fnGetContractAuditValue(val)
{
    var auditRetVal = "";
    if (l_OnlineAuditDesc && l_OnlineAuditDesc[val])
    {
        auditRetVal = l_OnlineAuditDesc[val];
        return auditRetVal;
    }
    return auditRetVal;
}

function fnGetContractAuditDesc(val)
{
    var auditRetDesc = "";
    if (l_OnlineAuditVals && l_OnlineAuditVals[val])
    {
        auditRetDesc = l_OnlineAuditVals[val];
        return auditRetDesc;
    }
    return auditRetDesc
}

function fnGetProcessAuditValue(val)
{
    var auditRetVal = "";
    if (l_OnlineProcessStatusDesc && l_OnlineProcessStatusDesc[val])
    {
        auditRetVal = l_OnlineProcessStatusDesc[val];
        return auditRetVal;
    }
    return auditRetVal;
}

function fnGetProcessAuditDesc(val)
{
    var auditRetDesc = "";
    if (l_OnlineProcessStatusVals && l_OnlineProcessStatusVals[val])
    {
        auditRetDesc = l_OnlineProcessStatusVals[val];
        return auditRetDesc;
    }
    return auditRetDesc
}

function buildUBSTxnXml()
{

    var ubsXML = '<?xml version="1.0"?>';
    var ubsStartIndex = 0;
    var ubsClosingIndex = 0;
    // var xmlns = "http://fcubs.iflex.com/service/FCREQ";
    var xmlns = "";
    //var ubsXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");//LoanOrigination Changes
    var ubsXMLDOM =getMsXmlDom();
    ubsXMLDOM.async = false;
    ubsXMLDOM.resolveExternals = false;

    if (ubsXMLDOM != null)
    {

        ubsXMLDOM.loadXML(ubsXML);
        // Create the UBS XML DOM.
        ubsXMLDOM.loadXML("<FCUBS_REQ_ENV/>");

        var ubsnode = ubsXMLDOM.selectSingleNode("//FCUBS_REQ_ENV");
        // ubsnode.setAttribute("xmlns", xmlns);
        var headerNode = ubsXMLDOM.createNode("element", "FCUBS_HEADER", xmlns);
        ubsnode.appendChild(headerNode);
        var sourceNode = ubsXMLDOM.createNode("element", "SOURCE", xmlns);
        headerNode.appendChild(sourceNode);
        var ubscompNode = ubsXMLDOM.createNode("element", "UBSCOMP", xmlns);
        headerNode.appendChild(ubscompNode);
        /*
	 * var msgIdnode = ubsXMLDOM.createNode("element","MSGID",xmlns);
	 * headerNode.appendChild(msgIdnode);
	 */
        /*
		 * var correlIdnode = ubsXMLDOM.createNode("element","CORRELID",xmlns);
		 * headerNode.appendChild(correlIdnode);
		 */
        var userIdnode = ubsXMLDOM.createNode("element", "USERID", xmlns);
        headerNode.appendChild(userIdnode);
        var branchNode = ubsXMLDOM.createNode("element", "BRANCH", xmlns);
        headerNode.appendChild(branchNode);

        var moduleidNode = ubsXMLDOM.createNode("element", "MODULEID", xmlns);
        headerNode.appendChild(moduleidNode);
        var serviceNode = ubsXMLDOM.createNode("element", "SERVICE", xmlns);
        headerNode.appendChild(serviceNode);
        var opnode = ubsXMLDOM.createNode("element", "OPERATION", xmlns);
        headerNode.appendChild(opnode);
        var multitripNode = ubsXMLDOM.createNode("element", "MULTITRIPID", xmlns);
        headerNode.appendChild(multitripNode);
        var funcIdnode = ubsXMLDOM.createNode("element", "FUNCTIONID", xmlns);
        headerNode.appendChild(funcIdnode);
        /*
	 * var srcusrIdnode = ubsXMLDOM.createNode("element","SOURCE_USERID",xmlns);
	 * headerNode.appendChild(srcusrIdnode);
	 */
        var actionNode = ubsXMLDOM.createNode("element", "ACTION", xmlns);
        headerNode.appendChild(actionNode);

        var msgstatusNode = ubsXMLDOM.createNode("element", "MSGSTAT", xmlns);
        headerNode.appendChild(msgstatusNode);

        // ADDED by SAIDUL TO ADD THE MODULE ID

        var bodyNode = ubsXMLDOM.createNode("element", "FCUBS_BODY", xmlns);
        ubsnode.appendChild(bodyNode);
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(0).text = "FCJBPEL";
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(2).text = dlgArg.mainWin.frames["Global"].UserId;
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(3).text = dlgArg.mainWin.frames["Global"].CurrentBranch;
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(1).text = "FCUBS";

        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(8).text = functionId;
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(9).text = gAction;

        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(10).text = "SUCCESS";

        // added by Saidul to include MODULEID in request header
        var module = functionId.substring(0, 2);
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(4).text = module;
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(5).text = "FCUBSAccService";
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(6).text = "CreateCustAcc";

        ubsXMLDOM.documentElement.childNodes.item(1).appendChild(dbDataDOM.documentElement.cloneNode(true));

        return ubsXMLDOM;
    }
}
function show_remarks()
{
    var dlgLeft = 100;
    var dlgTop = 50;
    var dlgArg = new Object();
    dlgArg.curWin = window;

    dlgArg.comments = "";
    w = window.showModalDialog("BPELRemark.jsp", dlgArg, "center:yes; dialogHeight:180px; dialogWidth:400px; help:no; resizable:no; scroll:no; status:no;");
    return dlgArg.comments;
}

function fnBPELDisplayResponse(messageNode, msgStatus)
{

    var message = "";
    var returnVal = false;
    if (!msgStatus || typeof(msgStatus) == 'undefined')
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
    }
    if (messageNode && messageNode.selectSingleNode("//FCUBS_ERROR_RESP"))
    {
        var firstErrNode = messageNode.selectSingleNode("//FCUBS_ERROR_RESP");
    }

    if (messageNode && messageNode.selectSingleNode("//FCUBS_WARNING_RESP"))
    {
        var firstWarNode = messageNode.selectSingleNode("//FCUBS_WARNING_RESP");
    }

    var type;
    if (msgStatus == 'WARNING')
    {
        var type = "O";
    } else if (msgStatus == 'FAILURE')
    {
        var type = "F";
    }

    if (type == "F")
    {

        if (firstErrNode)
        {
            var messageNodes = firstErrNode.selectNodes("//ERROR"); //LoanOrigination Changes 
            for (var index = 0; index < messageNodes.length; index++)
            {
                var ecode = "";
                if (messageNodes[index].selectSingleNode("ECODE"))
                {
                    ecode = messageNodes[index].selectSingleNode("ECODE").text;
                }
                var edesc = "";
                if (messageNodes[index].selectSingleNode("EDESC"))
                {
                    edesc = messageNodes[index].selectSingleNode("EDESC").text;
                }
                // if(ecode != '' && edesc != ''){
                if (ecode != '')
                {
                    var msg = ecode + " " + edesc;
                    message = message + msg + "~";
                }
            }
            returnVal = ShowErrorDialog(type, message);
        }
    } else
    {
        if (firstWarNode)
        {

            var messageNodes = firstWarNode.selectNodes("//WARNING");//LoanOrigination Changes  
            for (var index = 0; index < messageNodes.length; index++)
            {

                var wcode = "";
                if (messageNodes[index].selectSingleNode("WCODE"))
                {
                    wcode = messageNodes[index].selectSingleNode("WCODE").text;
                }
                var wdesc = "";
                if (messageNodes[index].selectSingleNode("WDESC"))
                {
                    wdesc = messageNodes[index].selectSingleNode("WDESC").text;
                }
                // if(wcode != '' && wdesc != ''){
                if (wcode != '')
                {
                    var msg = wcode + " " + wdesc;
                    message = message + msg + "~";
                }
            }
            returnVal = ShowErrorDialog(type, message);
        }
    }

    return returnVal;
}
function fnBPELvalidate()

{
    if (gMultipleReqFlag == "Y")
    {
        fcjRequestDOM = buildUBSXml();
        dbdomreq[gmasterFunctionID] = getXMLString(fcjRequestDOM);
        fcjRequestDOM = buildMultipleUBSXml(dbdomreq);
    } else
    {
        fcjRequestDOM = buildUBSXml();
    }
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    dbDataDOM.loadXML(dbdomreq[gmasterFunctionID]);
    var pureXMLDOM = fnGetDataXMLFromFCJXML(dbDataDOM, 1);
    if (getXMLString(pureXMLDOM) != "")
    {
        dbDataDOM.loadXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (fcjResponseDOM)
    {
        if (fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT") != null)
        {
            var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
            var messageNode = "";
            var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
            if (msgStatus == 'FAILURE')
            {
                l_xPath += "FCUBS_ERROR_RESP";
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
            {
                l_xPath += "FCUBS_WARNING_RESP";
            }
            messageNode = fcjResponseDOM.selectSingleNode(l_xPath);
            if (msgStatus == 'WARNING' || msgStatus == "SUCCESS")
            {
                for (i in dbdomreq)
                {
                    dbDataDOM.loadXML(dbdomreq[i]);
                    var pureXMLDOM = fnGetDataXMLFromFCJXML(dbDataDOM, 1);
                    if (getXMLString(pureXMLDOM) != "") dbdomreq[i] = getXMLString(pureXMLDOM);
                }
                dbDataDOM.loadXML(dbdomreq[gmasterFunctionID]);
            }
            if (msgStatus != "SUCCESS") var returnVal = fnBPELDisplayResponse(messageNode, msgStatus);
            if (msgStatus == 'FAILURE')
            {
                return false;
            }
            if (msgStatus == "SUCCESS" || (msgStatus == "WARNING" && returnVal == "OK"))
            {
                return true;
            } else if (msgStatus == "WARNING" && returnVal != "OK")
            {
                return false;
            }
        }

        else if (fcjResponseDOM.selectSingleNode("FCJMSG/MSG") != null)
        {
            var msgStatus = fcjResponseDOM.selectSingleNode("FCJMSG/MSG").getAttribute("MSGSTATUS");
            var messageNode = fcjResponseDOM.selectSingleNode("FCJMSG/MSG/RESPONSE");
            if (msgStatus == 'WARNING')
            {
                var returnVal = displayResponse_auth(messageNode);
                if (returnVal != 'OK')
                {
                    return false;
                } else
                {
                    duplicateCheckIsDone = true;
                    return true;
                }
            } else if (msgStatus == 'FAILURE')
            {
                debug(dlgArg.mainWin, "Please check ...Lock not released!!");
                var returnVal = displayResponse_auth(messageNode);

                return false;
            }
            //06-11-2008  Changes Done For 9NT860 SFR 112 FLEXCUBE_UBS_V.UM_10.0.0.0.CTCBTW.4.0  Gokul START 
            else
            {
                duplicateCheckIsDone = true;
                return true;
            }
            //06-11-2008  Changes Done For 9NT860 SFR 112 FLEXCUBE_UBS_V.UM_10.0.0.0.CTCBTW.4.0  Gokul END
        }
    } else
    {
        dbDataDOM.loadXML(dbdomreq[gmasterFunctionID]);
        var pureXMLDOM = fnGetDataXMLFromFCJXML(dbDataDOM, 1);
        if (getXMLString(pureXMLDOM) != "") dbdomreq[gmasterFunctionID] = getXMLString(pureXMLDOM);
        dbDataDOM.loadXML(dbdomreq[gmasterFunctionID]);
        showData(dbStrRootTableName, 1);
        alert(lblProcessingFailed);
        return false;
    }

}

function fnExit(msgFlag)
{
    if (msgFlag != "false")
    {
        appendErrorCode('ST-COM012', "");
        if (!confirmAction())
        {
            return;
        }
    }
    if (fnPreClose())
    {
        if (screenType == "P" && deleteFlag == "Y" && typeof(dlgArg.isChild) == "undefined" && typeof(dlgArg.status) == "undefined" && getXMLString(txnXmlDOM) != "" && nextDayFlag != 'Y')
        { // CTCB
            // ISSUE
            // NO
            // 64
            // CHANGE
            var serverURL = "FCClientHandler";
            var objHTTP = new ActiveXObject("MSXML2.XMLHTTP.4.0");
            var responseFromServer = null;

            taskSearchXML = "<TaskRequest OP = 'INSTANCEDELETE'>";
            taskSearchXML = taskSearchXML + "<InstanceId>" + txnXmlDOM.selectSingleNode("//fcubs:txnId").text + "</InstanceId>";
            taskSearchXML = taskSearchXML + "<TaskId>" + taskId + "</TaskId>";
            taskSearchXML = taskSearchXML + "</TaskRequest>";
            try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
            objHTTP.open("POST", serverURL, false); // Open the Connection to the
            // Server
            objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
            objHTTP.setRequestHeader("FUNCTIONID", functionId);
            objHTTP.setRequestHeader("OPERATION", "BPELACTION");
            objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
            objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
            objHTTP.send(taskSearchXML);
			} // 9NT1606_12_2_RETRO_12_0_3_21182929 changes start
             catch(exp){
                mainWin.handleNetWorkErr(exp);
              }  //9NT1606_12_2_RETRO_12_0_3_21182929 changes end 
            if (objHTTP.status == 200){
                mainWin.inactiveTime = 0;
                var csrfNode = selectSingleNode(objHTTP.responseXML,"//CSRF");
                if(csrfNode != null && getNodeText(csrfNode) == "SM-00420"){
                    alert(getNodeText(csrfNode)+mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
                }else{
                    taskListXML = objHTTP.responseXML;
                    var response = getXMLString(taskListXML.documentElement.lastChild);
                }
            }
        }

        if (gAction == "MODIFY")
        {
            releaseLock();
        }
        gAction = "";
        dlgArg.isChild = "N";
        dbDataDOM.loadXML("");
        isExitTriggered = true;
        dlgArg.mainWin.fnExit(window);

    }
}

 
    function fnShowBPELSubscreen(functionId,ScreenName,dlgArg,uiName)
{
	try{
       
            dlgArg.isChild='Y';
            dlgArg.screenArgs['SCREEN_NAME'] = ScreenName;
            dlgArg.screenArgs['FUNCTION_ID'] = functionId;
            dlgArg.domArray=dbdomreq;
            dlgArg.mainWin.gNumChildWindows = dlgArg.mainWin.gNumChildWindows +1;
			if(uiName == "" || uiName == undefined)
			{
				var newwin = dlgArg.mainWin.showModalDialog("SMSStartLogServlet?funcid="+functionId+"&uiName=&msgType=WORKFLOW&actionType=initiate"+"&userLevelDbgEnabled="+userLevelDbgEnabled, dlgArg, "dialogTop:74px;dialogLeft:253px; dialogHeight:480px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no"); 
			}
			else
			{
				var newwin = dlgArg.mainWin.showModalDialog("SMSStartLogServlet?funcid="+functionId+"&uiName="+uiName+"&msgType=WORKFLOW&actionType=initiate"+"&userLevelDbgEnabled="+userLevelDbgEnabled, dlgArg, "dialogTop:74px;dialogLeft:253px; dialogHeight:480px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no"); 
			}
            dbdomreq=dlgArg.domArray;
            
       }
        catch(e){fnSetExitButton(true);}
        window.focus();
}

//Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 ends

function fnBPELLoad()
{

    try
    {

        if (typeof(dlgArg.isChild) != "undefined")
        {

            var action = dlgArg.screenArgs["ACTION"];
            if (action == "NEW" && dlgArg.domArray[gmasterFunctionID] == undefined)
            {
                gAction = action;
                fnNew();

            } else if (action == "NEW" && dlgArg.domArray[gmasterFunctionID] != undefined)
            {
                gAction = action;
                resetIndex();
                enableForm();
                dbDataDOM.loadXML(dlgArg.domArray[gmasterFunctionID]);
                showData(dbStrRootTableName, 1);
            }

            /*
		 * else if(action== "MODIFY" ) { resetIndex();////17-01-2008 change for
		 * (var innerIndex = 0; innerIndex < queryFields.length; innerIndex++) {
		 * document.getElementById(queryFields[innerIndex]).readOnly = false;
		 * document.getElementById(queryFields[innerIndex]).value=dlgArg.queryFieldsValue[innerIndex]; }
		 * gAction = 'EXECUTEQUERY'; fcjRequestDOM = buildUBSXml();
		 * fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		 * if(fcjResponseDOM) { var msgStatus =
		 * fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
		 * 
		 * 
		 * if (msgStatus == "SUCCESS" ) { var messageNode =
		 * fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
		 * var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		 * setDataXML(getXMLString(pureXMLDOM)); showData(dbStrRootTableName, 1); gAction =
		 * action; disableForm(); fnEnableAmendFields(); } } } //17-01-2008
		 * change starts
		 */
            else if (action == "EXECUTEQUERY")
            {
                resetIndex();
                for (var innerIndex = 0; innerIndex < queryFields.length; innerIndex++)
                {
                    document.getElementById(queryFields[innerIndex]).readOnly = false;
                    document.getElementById(queryFields[innerIndex]).value = dlgArg.queryFieldsValue[innerIndex];
                }
                gAction = 'EXECUTEQUERY';
                fnExecuteQuery();
            } // //17-01-2008 change ends

        } else
        {
            gAction = "NEW";
            fnNew();
            if (txnXmlDOM) fnBPELBuildDBDOMReq();
            if (dbdomreq[gmasterFunctionID])
            { //FC10.5ITR2 SFR#1074
            dbDataDOM.loadXML(dbdomreq[gmasterFunctionID]);
            //FC10.5ITR2 SFR#1074 starts
            gBPELLoadData = true;
            }
            //FC10.5ITR2 SFR#1074 ends
            showTabData();

        }

        fnSetExitButton(true);
        // fnEnableElement(document.getElementsByName("BTN_OK")[0] );
        //for ctcb4.0 (setting instanceId in txn Xml for appending workflow reference number in error code LCIP-004 ) 
        txnXmlDOM.selectSingleNode("//fcubs:instanceId").text = txnXmlDOM.selectSingleNode("//InstanceId").text;
    } catch(e)
    {
        fnSetExitButton(true);
    }
}

function fnBPELBuildDBDOMReq()
{
    // for multiple response
    var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
    txnXmlDOM.setProperty("SelectionNamespaces", ns);
    var l_Index = txnXmlDOM.selectNodes("//FCUBS_HEADER/FUNCTIONID").length;
    var uiXMLIndex;

    for (i = 0; i < l_Index; i++)
    {
        uiXMLIndex = txnXmlDOM.selectNodes("//FCUBS_HEADER/FUNCTIONID")[i].text;
        // actionIndex=txnXmlDOM.selectSingleNode("//fcubs:moduleData").childNodes[i].childNodes[0].childNodes[9].text;
        dbdomreq[uiXMLIndex] = getXMLString(txnXmlDOM.selectSingleNode("//fcubs:moduleData").childNodes[i].childNodes[1].childNodes[0]);

    }
}

// bpelaudit
function fnBpelAudit()
{
    var dlgLeft = 50;
    var dlgTop = 50;
    var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
    txnXmlDOM.setProperty("SelectionNamespaces", ns);
    dlgArg.auditxmlObj = txnXmlDOM.selectSingleNode("//fcubs:txnAuditDetails");
    w = window.showModalDialog("BPELAudit.jsp", dlgArg, "center:yes; dialogHeight:400px; dialogWidth:750px; help:no; resizable:no; scrollbar:no; status:no;");
}
function buildMultipleUBSXml(domReq)
{

    var ubsXML = '<?xml version="1.0"?>';
    var ubsStartIndex = 0;
    var ubsClosingIndex = 0;
    var xmlns = "";
   // var ubsXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");//LoanOrigination Changes
    var ubsXMLDOM =getMsXmlDom();
    ubsXMLDOM.async = false;
    ubsXMLDOM.resolveExternals = false;
    //var tempDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");//LoanOrigination Changes
    var tempDOM = getMsXmlDom();
    tempDOM.async = false;
    tempDOM.resolveExternals = false;

    if (ubsXMLDOM != null)
    {

        ubsXMLDOM.loadXML(ubsXML);
        ubsXMLDOM.loadXML("<FCUBS_REQ_ENV/>");

        var ubsnode = ubsXMLDOM.selectSingleNode("//FCUBS_REQ_ENV");
        var headerNode = ubsXMLDOM.createNode("element", "FCUBS_HEADER", xmlns);
        ubsnode.appendChild(headerNode);
        var sourceNode = ubsXMLDOM.createNode("element", "SOURCE", xmlns);
        headerNode.appendChild(sourceNode);
        var ubscompNode = ubsXMLDOM.createNode("element", "UBSCOMP", xmlns);
        headerNode.appendChild(ubscompNode);
        var userIdnode = ubsXMLDOM.createNode("element", "USERID", xmlns);
        headerNode.appendChild(userIdnode);
        var branchNode = ubsXMLDOM.createNode("element", "BRANCH", xmlns);
        headerNode.appendChild(branchNode);
        var serviceNode = ubsXMLDOM.createNode("element", "SERVICE", xmlns);
        headerNode.appendChild(serviceNode);
        var opnode = ubsXMLDOM.createNode("element", "OPERATION", xmlns);
        headerNode.appendChild(opnode);
        var multitripNode = ubsXMLDOM.createNode("element", "MULTITRIPID", xmlns);
        headerNode.appendChild(multitripNode);
        var funcIdnode = ubsXMLDOM.createNode("element", "FUNCTIONID", xmlns);
        headerNode.appendChild(funcIdnode);
        var actionNode = ubsXMLDOM.createNode("element", "ACTION", xmlns);
        headerNode.appendChild(actionNode);

        var msgstatusNode = ubsXMLDOM.createNode("element", "MSGSTAT", xmlns);
        // ctcb change starts
        if (duplicateTaskcheckReq == "Y" && typeof(duplicateFieldList) != "undefined" && duplicateFieldList != "")
        //if(gAction=='DUPLICATETASKCHECK~NEW'||gAction=='DUPLICATETASKCHECK~BPELVALIDATE'|| gAction=='DUPLICATETASKCHECK')
        if (gAction.match('DUPLICATETASKCHECK'))
        {
            var addlNode = ubsXMLDOM.createNode("element", "ADDL", xmlns);
            headerNode.appendChild(addlNode);
            var paramNode = ubsXMLDOM.createNode("element", "PARAM", xmlns);
            addlNode.appendChild(paramNode);
            var nameNode = ubsXMLDOM.createNode("element", "NAME", xmlns);
            paramNode.appendChild(nameNode);
            var valueNode = ubsXMLDOM.createNode("element", "VALUE", xmlns);
            paramNode.appendChild(valueNode);
            ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(0).text = 'DUPLICATETASKCHECK';
            var duplicateFieldArray = duplicateFieldList.split("~");

            // ctcb lot1 infra change starts
            // var valueList = "";
            for (i in duplicateFieldArray)
            {
                if (duplicateFieldArray[i] != "")
                {
                    var tempfieldlist = duplicateFieldArray[i].split("__"); //ctcb change for duplicatetask

                    if (typeof(tempfieldlist[2]) != "undefined" && typeof(tempfieldlist[3]) != "undefined")
                    {
                        var MEValueList = "";
                        for (j = 0; j < dbDataDOM.selectNodes("//" + tempfieldlist[0] + "[" + tempfieldlist[2] + "='" + tempfieldlist[3] + "']/" + tempfieldlist[1]).length; j++)
                        {
                            MEValueList = MEValueList + "~" + dbDataDOM.selectNodes("//" + tempfieldlist[0] + "[" + tempfieldlist[2] + "='" + tempfieldlist[3] + "']/" + tempfieldlist[1]).item(j).text;
                        }
                        MEValueList = MEValueList.split("~").sort();
                        for (k in MEValueList)
                        {
                            duplicateValueList = duplicateValueList + MEValueList[k] + "~";
                        }
                    } else
                    {
                        duplicateValueList = duplicateValueList + dbDataDOM.selectSingleNode("//" + tempfieldlist[0] + "/" + tempfieldlist[1]).text + '~';
                    } //ctcb change for duplicatetask
                }
            }
            ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text = duplicateValueList + "!" + txnXmlDOM.selectSingleNode("//fcubs:txnId").text; // ctcb
            // lot1
            // infra
            // change
            // ends
            /*
			 * for (i in duplicateFieldArray){ if
			 * (ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text!=
			 * "")
			 * ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text=
			 * ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text+"~"+document.getElementById(duplicateFieldArray[i]).value;
			 * else
			 * ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text=
			 * document.getElementById(duplicateFieldArray[i]).value; }
			 */
        }
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(8).text = gAction;
        // ctcb change ends
        headerNode.appendChild(msgstatusNode);

        var moduleidNode = ubsXMLDOM.createNode("element", "MODULEID", xmlns);
        headerNode.appendChild(moduleidNode);
        var bodyNode = ubsXMLDOM.createNode("element", "FCUBS_BODY", xmlns);
        ubsnode.appendChild(bodyNode);

        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(0).text = "FLEXCUBE";
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(2).text = dlgArg.mainWin.frames["Global"].UserId;
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(3).text = dlgArg.mainWin.frames["Global"].CurrentBranch;
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(1).text = "FCUBS";

        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(7).text = functionId;
        // ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(8).text
        // = gAction;

        var module = functionId.substring(0, 2);
        if (dlgArg.mainWin.frames["Global"].applicationName == 'FCIS')
        {
            module = dlgArg.mainWin.frames["Global"].CurrentModule
        }

        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(10).text = module;
        var fldStartIndex1 = msgxml.indexOf("<FLD");
        var fldEndIndex1 = msgxml.indexOf("</FLD>");
        msgxml_fld = msgxml.substring(fldStartIndex1, fldEndIndex1);
        msgxml_fld = msgxml_fld + "</FLD>";

   //Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 starts 
	/****
        for (i in domReq)
        {
            dbDataDOM.loadXML(domReq[i]);
            ubsXMLDOM.documentElement.childNodes.item(1).appendChild(dbDataDOM.documentElement.cloneNode(true));

        }
	   ***/	   
var oldfunctionId = functionId;
	var tempmsgxml = msgxml;
	for (functionId in domReq)
	{ 
		msgxml = compositeArray[functionId];
		dbDataDOM.loadXML(domReq[functionId])
		try
		{
		  var funcid = dbDataDOM.selectSingleNode("//FUNCTIONID").text;
		}
		catch(e)
		{
			if (functionId == 'CLDCOLLT')
			   funcid = 'CLDCO001';						
			else
			{
				if (functionId == 'CLDORIGN')
				{
					try
					{
						var funcid = dbDataDOM.selectSingleNode("//FUNCTION_ID").text;
					}
					catch(e)
					{
						funcid = functionId;
					}
				}
				else					       
					funcid = functionId;
			}
		}
		try
		{
			var act = dbDataDOM.selectSingleNode("//ACTION").text;
		}
		catch(e)
		{
			act = 'NEW';					   
		}					
		var xmlData = getXMLString(dbDataDOM);
		var postion = xmlData.indexOf('FCUBS_REQ_ENV');
		if(postion == -1)
		{		
			fcjRequestDOM = buildUBSXml();	
		}	
		else
		{
			fcjRequestDOM.loadXML(getXMLString(dbDataDOM));
		}
		fcjRequestDOM.selectNodes("//FCUBS_HEADER/FUNCTIONID")[0].text = funcid;
		fcjRequestDOM.selectNodes("//FCUBS_HEADER/ACTION")[0].text = act;					
		dbDataDOM.loadXML(getXMLString(fcjRequestDOM));
		ubsXMLDOM.documentElement.childNodes.item(1).appendChild(dbDataDOM.documentElement.cloneNode(true));

	}
	functionId = oldfunctionId;
	msgxml = tempmsgxml;
//Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-2009 ends 

    }
    return ubsXMLDOM;
}

function fnBpelSave()
{

    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM)
    {
        if (fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT") != null)
        {
            var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
            var messageNode = "";
            var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
            if (msgStatus == 'FAILURE')
            {
                l_xPath += "FCUBS_ERROR_RESP";
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
            {
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1); // for
                // CTCB
                // 5
                // enhancement
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                l_xPath += "FCUBS_WARNING_RESP";
            }
            messageNode = fcjResponseDOM.selectSingleNode(l_xPath);

            if (msgStatus == 'WARNING')
            {
                var returnVal = displayResponse(messageNode, msgStatus);
                if (returnVal != 'OK')
                {
                    return false;
                }
            }
            if (msgStatus == 'FAILURE')
            {
                var returnVal = displayResponse(messageNode, msgStatus);
                return false;
            }
            if (msgStatus == 'SUCCESS')
            {
                var returnVal = displayResponse(messageNode, msgStatus);
                return true;
            }

        } else if (fcjResponseDOM.selectSingleNode("FCJMSG/MSG") != null)
        {
            var msgStatus = fcjResponseDOM.selectSingleNode("FCJMSG/MSG").getAttribute("MSGSTATUS");
            var messageNode = fcjResponseDOM.selectSingleNode("FCJMSG/MSG/RESPONSE");
            if (msgStatus == 'WARNING')
            {
                var returnVal = displayResponse_auth(messageNode);
                if (returnVal != 'OK')
                {
                    return false;
                } else
                {
                    duplicateCheckIsDone = true;
                    return true;
                }
            } else if (msgStatus == 'FAILURE')
            {
                debug(dlgArg.mainWin, "Please check ...Lock not released!!");
                var returnVal = displayResponse_auth(messageNode);

                return false;
            }
        }
    } else
    {
        alert(lblProcessingFailed);
        return;
    }
    return true;
}
function fnShowGetPriority()
{
    gOperation = 'GETPRIORITY';
    fcjRequestDOM = buildTransactionXML();
    fnGetPriority();
    document.getElementById("DROP_PRIORITYLIST").value = txnXmlDOM.selectSingleNode("Payload").childNodes[0].getAttribute("txnPriority");
}
function fnGetProcessCode()
{
    return "ALL";
}
function fnGetCustomerNo()
{
    return "All";
}
function fnGetChannel()
{
    return "All";
}
function fnGetProductCode()
{
    return "All";
}

function fnShowErrorScreen()
{
    // w = window.showModalDialog("BPELAudit.jsp", dlgArg,"center:yes;
    // dialogHeight:400px; dialogWidth:750px; help:no; resizable:no;
    // scrollbar:no; status:no;");
    if (getXMLString(fcjResponseDOM) != "" && fcjResponseDOM != null)
    {
        if (fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT") != null)
        {
            var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
            var messageNode = "";

            var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";

            if (msgStatus == 'FAILURE')
            {
                l_xPath += "FCUBS_ERROR_RESP";
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
            {
                l_xPath += "FCUBS_WARNING_RESP";
            }
            messageNode = fcjResponseDOM.selectSingleNode(l_xPath);
            fnBPELDisplayErrScr(messageNode, msgStatus);
        } else if (fcjResponseDOM.selectSingleNode("FCJMSG/MSG") != null)
        {
            var msgStatus = fcjResponseDOM.selectSingleNode("FCJMSG/MSG").getAttribute("MSGSTATUS");
            var messageNode = fcjResponseDOM.selectSingleNode("FCJMSG/MSG/RESPONSE");
            if (msgStatus == 'WARNING')
            {
                var returnVal = displayResponse_auth(messageNode, false);
                if (returnVal != 'OK')
                {
                    return false;
                }
                /*
									 * else { duplicateCheckIsDone=true; return
									 * true; }
									 */
            } else if (msgStatus == 'FAILURE')
            {
                debug(dlgArg.mainWin, "Please check ...Lock not released!!");
                var returnVal = displayResponse_auth(messageNode, false);

                return false;
            }

        }
    } else alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_NO_ERROR")); // ctcb
    // 10.1lot1
    // issue
}
function fnGetPriority()
{
    var ns = "xmlns:fcubs='http://fcubs.iflex.com'";

    fcjRequestDOM.setProperty("SelectionNamespaces", ns);

    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    if (fcjResponseDOM)
    {
        fcjResponseDOM.setProperty("SelectionNamespaces", ns);
        // if the response has a txn id....then load the payload into txnXmlDOM
        // (variable in launcher)
        if (txnXmlDOM == null)
        {
            //txnXmlDOM = new ActiveXObject('Msxml2.DOMDocument.4.0');//LoanOrigination Changes
            txnXmlDOM=getMsXmlDom();
            txnXmlDOM.async = false;
            txnXmlDOM.resolveExternals = false;
            var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
            txnXmlDOM.setProperty("SelectionNamespaces", ns);
        }
        if (fcjResponseDOM.selectSingleNode("//fcubs:txnId").text != '')
        {
            txnXmlDOM.loadXML('<Payload>' + getXMLString(fcjResponseDOM.documentElement.cloneNode(true)) + '</Payload>');
        }
    }
    gOperation = "";
    txnXmlDOM.selectSingleNode("//fcubs:operation").text = ""; // ctcb bug no
    // 44
}

// for bpel error screen display
function fnBPELDisplayErrScr(messageNode, msgStatus)
{

    var message = "";
    var returnVal = false;
    if (!msgStatus || typeof(msgStatus) == 'undefined')
    {
        var msgStatus = fcjResponseDOM.selectSingleNode("FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT").text;
    }
    if (messageNode && messageNode.selectSingleNode("//FCUBS_ERROR_RESP"))
    {
        var firstErrNode = messageNode.selectSingleNode("//FCUBS_ERROR_RESP");
    }

    if (messageNode && messageNode.selectSingleNode("//FCUBS_WARNING_RESP"))
    {
        var firstWarNode = messageNode.selectSingleNode("//FCUBS_WARNING_RESP");
    }

    var type;
    if (msgStatus == 'WARNING')
    {
        var type = "O";
    } else if (msgStatus == 'FAILURE')
    {
        var type = "F";
    }

    if (type == "F")
    {

        if (firstErrNode)
        {
            var messageNodes = firstErrNode.selectNodes("//ERROR");
            for (var index = 0; index < messageNodes.length; index++)
            {
                var ecode = "";
                if (messageNodes[index].selectSingleNode("ECODE"))
                {
                    ecode = messageNodes[index].selectSingleNode("ECODE").text;
                }
                var edesc = "";
                if (messageNodes[index].selectSingleNode("EDESC"))
                {
                    edesc = messageNodes[index].selectSingleNode("EDESC").text;
                }
                // if(ecode != '' && edesc != ''){
                if (ecode != '')
                {
                    var msg = ecode + " " + edesc;
                    message = message + msg + "~";
                }
            }
            returnVal = ShowErrorDialog(type, message, false, false);
        }
    } else
    {
        if (firstWarNode)
        {

            var messageNodes = firstWarNode.selectNodes("//WARNING");//LoanOrigination Changes 
            for (var index = 0; index < messageNodes.length; index++)
            {

                var wcode = "";
                if (messageNodes[index].selectSingleNode("WCODE"))
                {
                    wcode = messageNodes[index].selectSingleNode("WCODE").text;
                }
                var wdesc = "";
                if (messageNodes[index].selectSingleNode("WDESC"))
                {
                    wdesc = messageNodes[index].selectSingleNode("WDESC").text;
                }
                // if(wcode != '' && wdesc != ''){
                if (wcode != '')
                {
                    var msg = wcode + " " + wdesc;
                    message = message + msg + "~";
                }
            }
            returnVal = ShowErrorDialog(type, message, false, false);
        }
    }

    return returnVal;
}
function fnHideProcessWait()
{
    if (dlgArg.ShowSummary == "TRUE")
    {
        var t = setTimeout("dlgArg.mainWin.frames['FrameMenu'].fnHideProcess();", 4000);
    } else
    {
        var t = setTimeout("dlgArg.mainWin.frames['FrameMenu'].fnHideProcess();", 1000);
    }
}
   //Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-209 starts
function fnFocusWait() {
    var t=setTimeout("fnFocus()",2000);
}
 //Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-209 ends
function fnPreHold()
{
    debug(dlgArg.mainWin, "In fnPreHold", "A");
    return true;
}	 
//Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-209 starts
function getUiName(funcId){
	var uiNameNode;
	var uiName = funcId;
	var menuDom = getMSXmlDom();
	menuDom.loadXML(dlgArg.mainWin.gXmlMenu);
	uiNameNode = menuDom.selectSingleNode("//LEAF[@FNID = '" + funcId + "']");
	if (uiNameNode) {
		uiName = uiNameNode.attributes[2].text;
	}
	
	return uiName;
}

function getSubStageName(){
	return txnXmlDOM.selectSingleNode("//CURRENTSUBSTAGE").text;
} //Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 as on 12-feb-209 ends