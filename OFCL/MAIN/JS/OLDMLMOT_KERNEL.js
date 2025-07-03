/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2020, Oracle and/or its affiliates.
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
**  File Name          : OLDMLMOT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostLoad_KERNEL() {
	fnEnableElement(document.getElementById("BLK_ML_TRAIN_PERF_MAS__BTN_P"));
    return true;
}

function fnPopulateId(event) {
	doAction('New',event);
	fn_default();
	enableForm(document.getElementById('TBLPageTAB_MAIN'));
    return true;
}

function fnEnableDisableButtons() {
	if (document.getElementById("BLK_ML_TRAIN_PERF_MAS__MODELTYPE").value)
		fnEnableElement(document.getElementById("BLK_ML_TRAIN_PERF_MAS__BTN_SAVE_MODEL"));
	else
		fnDisableElement(document.getElementById("BLK_ML_TRAIN_PERF_MAS__BTN_SAVE_MODEL"));
	return true;
}

function fnTrainModel(event) {
    var resp = fnCallBackEnd("TRAINMODEL");
    if (resp == "FAILURE") {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), resp, 'E');
		return false;
	} else if (resp == "WARNING" || resp == "SUCCESS") {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), resp, 'I');			
	}
	fnDisableElement(document.getElementById("BLK_ML_TRAIN_PERF_MAS__BTN_TRAIN_MODEL"));
	return true;
}

function fnSaveModel(event) {
	var resp = fnCallBackEnd("SAVEMODEL");
    if (resp == "FAILURE") {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), resp, 'E');
		return false;
	} else if (resp == "WARNING" || resp == "SUCCESS") {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), resp, 'I');			
	}
	fnDisableElement(document.getElementById("BLK_ML_TRAIN_PERF_MAS__BTN_SAVE_MODEL"));
	disableForm();
	return true;
}

function fnCallBackEnd(action) {
    if (gAction) {
        var prevAction = gAction;
        gAction = action;
		appendData(document.getElementById("TBLPageAll"));
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        showProcessMsg = false;
        var l_resp_code = fnProcessResponse();
        gAction = prevAction;
        return l_resp_code;
    }
    return false;
}
function fn_default(){
    var resp = fnCallBackEnd("DEFAULT");
    var l_id = document.getElementById("BLK_ML_TRAIN_PERF_MAS__ID").value;
	if (resp == "FAILURE") {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), resp, 'E');
		return false;
	} else if (resp == "WARNING" || resp == "SUCCESS") {
		fireHTMLEvent(document.getElementById("BLK_ML_TRAIN_PERF_MAS__ID"), "onpropertychange");
		fnDisableElement(document.getElementById("BLK_ML_TRAIN_PERF_MAS__BTN_P"));
		document.getElementById('Save').style.display = 'none';
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), resp, 'I');
	}  
    return true;
}
function fn_populate(){
    var gPrevAction = gAction;
    gAction = 'EXECUTEQUERY';
    appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }    
     gAction = gPrevAction;
    return true;
}
function fnPostFocus_KERNEL() {
    document.getElementById('EnterQuery').style.display = 'none';
	document.getElementById('Save').style.display = 'none';
    return true;
}