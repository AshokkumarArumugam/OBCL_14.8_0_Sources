/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2010 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : Vipan Kuamr
**  Date of creation   : 08-AUG-2017
**  File Name          : GIDIFPRC_KERNEL.js
**  Purpose            : Kernel JS file for Extensible Screen 
**  Called From        : GIDIFPRC_SYS.js
**  Modify Reason	   : RETRO
**
****************************************************************************************************************************/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;
var isValidated= "true";
var gErrCodes = "";
var msgStatus = "";
customAlertAction = "";

function fnPreLoad() {
	debugs("In fnPreLoad", "A");
}

function fnPostLoad_KERNEL() {
    enableForm();
    var dbDataDOM=createDOM(dbStrRootTableName);
	gAction='CUSTOM'; 
    debugs("In fnPostLoad", "A");
	document.getElementById('GITM_INTERFACE_TRIGGER__FILE_PATH').parentElement.style.display="none";
	fnEnableElement(document.getElementById("GITM_INTERFACE_TRIGGER__BTN_PROC"));
	fnEnableElement(document.getElementById("GITM_INTERFACE_TRIGGER__BTN_FILE_UPLD"));
        
}
function fnPreNew() {
    var newAction = true;
	debugs("In fnPreNew", "A");
	return newAction;
}

function fnPostNew() {
 	debugs("In fnPostNew", "A");	
}
//added by Ria
function fnEnableDisable() {
	if(document.getElementById("GITM_INTERFACE_TRIGGER__INTERFACE_TYPE").value=='O') {
		document.getElementById("GITM_INTERFACE_TRIGGER__FILE_NAME").value='';
		fnDisableElement(document.getElementById("GITM_INTERFACE_TRIGGER__FILE_NAME"));
		fnDisableElement(document.getElementById("GITM_INTERFACE_TRIGGER__PROCESS_CODE"));
                
	}
	else {
		fnEnableElement(document.getElementById("GITM_INTERFACE_TRIGGER__FILE_NAME"));
		fnEnableElement(document.getElementById("GITM_INTERFACE_TRIGGER__PROCESS_CODE"));
	}
}

function fnPreUnlock() {
	var unlock = true;
	debugs("In fnPreUnlock", "A");
	return unlock;
}

function fnPostUnlock() {
	debugs("In fnPostUnlock", "A");
}

function fnPreAuthorize() {
	var authorize = true;
	debugs("In fnPreAuthorize", "A");
	return authorize;
}

function fnPostAuthorize() {
	debugs("In fnPostAuthorize", "A");
}

function fnPreCopy() {
	var copy = true;
	debugs("In fnPreCopy", "A");
	return copy;
}

function fnPostCopy() {
	debugs("In fnPostCopy", "A");
}

function fnPreClose() {
	var close = true;
	debugs("In fnPreClose", "A");
	return close;
}

function fnPostClose() {
	debugs("In fnPostClose", "A");
}

function fnPreReOpen() {
	var reOpen = true;
	debugs("In fnPreReOpen", "A");
	return reOpen;
}

function fnPostReOpen() {
	debugs("In fnPostReOpen", "A");
}

function fnPreDelete() {
	var deleteAction = true;
	debugs("In fnPreDelete", "A");
	return deleteAction;
}

function fnPostDelete() {
	debugs("In fnPostDelete", "A");
}

function fnPreEnterQuery() {
	var execute = true;
	debugs("In fnPreEnterQuery", "A");
	return execute;
}

function fnPostEnterQuery() {
	debugs("In fnPostEnterQuery", "A");
}

function fnPreExecuteQuery() {
	var execute = true;
	debugs("In fnPreExecuteQuery", "A");
	return execute;
}

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	fnEnableElement(document.getElementsByName("BTN_PROC")[0]);
	fnEnableElement(document.getElementsByName("BTN_FILE_UPLD")[0]);
}

function fnPreSave() {
	if(!fnValidate())
        return false;

	debugs("In fnPreSave", "A");	
	var isValid = true;
		
	
	if (!isValid) {		
		var msg = buildMessage(gErrCodes);
		alertMessage(msg);
		return false;
	}
	
	return isValid;	
}

function fnPostSave() {
	debugs("In fnPostSave", "A");
}

//Scheduling of uploads Begin
function fnFileUpload(){

    if (!fnValidateMandatory()) {
        mask();
        showAlerts(fnBuildAlertXML(gErrCodes.substring(0, gErrCodes.length - 1), 'I', '', replaceStr.substring(0, replaceStr.length - 1)), 'I');
        alertAction = "UNMASK";
        gErrCodes = "";
        replaceStr = "";
        return false;
    }
    if (document.getElementsByName("FILE_NAME")[0].value == ""){
        mask();
        showErrorAlerts('GI-INF-20','I');
        return false;
    }
     
    var title = mainWin.getItemDesc("LBL_FILE_UPLOAD");      // "Image Upload"
    var upload = mainWin.getItemDesc("LBL_UPLOAD");
    var filepath = document.getElementsByName("FILE_PATH")[0].value;
    var Infilename = document.getElementsByName("FILE_NAME")[0].value;
    var Infilemask = document.getElementsByName("FILE_MASK")[0].value;
    var InterfacCode = document.getElementsByName("INTERFACE_CODE")[0].value;
	var l_Params = "title=" + title;
    l_Params += "&upload=" + upload;
     l_Params += "&filepath=" + filepath;
     l_Params += "&inFilename=" + Infilename;
     l_Params += "&inFilemask=" + Infilemask;
     l_Params += "&interfacCode=" + InterfacCode;
    loadSubScreenDIV("ChildWin", "FileUpload.jsp?" + l_Params);
	document.getElementsByName("PHY_FILE_NAME")[0].value = Infilename;
    
}//Scheduling of uploads End

function fnPreGoToRec() {
	var navigate = true;
	return navigate;
}

function fnPostGoToRec() {
	
}
function fnValidate(){

	var prevgAction;
    prevgAction=gAction;
    gAction='DEFAULT';
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    gAction=prevgAction;
     
    var msgStatus = fnProcessResponse();
    if (msgStatus == 'FAILURE'){
		isValidated = "false";
	}
    fnPostProcessResponse(msgStatus);
    disableForm();
}
function fnProcess(){
	
	customAlertAction = "process";
	var prevgAction;
	var isValid = true;
	isValid = isValid & fnValidate();
		if (!isValid) {		
			if (isValidated=="false"){
				fnEnableElement(document.getElementsByName("BTN_EXIT")[0]);
				isValidated="false";
				return false;
			}
		}
	if(isValidated="true") {
		mask();
		showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_INIT_DESC")), "C");
	}
	fnEnableElement(document.getElementsByName("BTN_EXIT")[0]); 
}