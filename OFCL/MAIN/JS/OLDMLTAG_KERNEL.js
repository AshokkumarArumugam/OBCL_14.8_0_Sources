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
**  File Name          : OLDMLTAG_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
fnDisableElement(document.getElementById("BLK_TM_TAG_MASTER__ID"));
function fnPostAddRow_BLK_TM_TAG_DETAIL_KERNEL(arg)
{
	var blockId = "BLK_TM_TAG_DETAIL";
	var length = getTableObjForBlock(blockId).tBodies[0].rows.length;
	var currPg = Number(getInnerText(document.getElementById("CurrPage__"+blockId)));
	var pgSize = getPgSize(blockId);
	if(length > 0 && length != '' && length != "")
	{
		for(var idx = 0;idx < length; idx++)
   		{
			getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value = (currPg - 1) * pgSize + idx + 1;
			fireHTMLEvent(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0], "onpropertychange");			
		}
	}
    appendData();
	return true;
}

function fnPostDeleteRow_BLK_TM_TAG_DETAIL_KERNEL(arg)
{
	var blockId = "BLK_TM_TAG_DETAIL";
	var length = getTableObjForBlock(blockId).tBodies[0].rows.length;
	var currPg = Number(getInnerText(document.getElementById("CurrPage__"+blockId)));
    var pgSize = getPgSize(blockId);
	if(length > 0 && length != '' && length != "")
	{
		for(var idx = 0;idx < length; idx++)
   		{
			getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value = (currPg - 1) * pgSize + idx + 1;
			fireHTMLEvent(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0], "onpropertychange");			
		}
	}
	appendData();
	return true;
}

function fnPostNavigate_BLK_TM_TAG_DETAIL_KERNEL(arg)
{
	var blockId = "BLK_TM_TAG_DETAIL";
	var length = getTableObjForBlock(blockId).tBodies[0].rows.length;
	var currPg = Number(getInnerText(document.getElementById("CurrPage__"+blockId)));
    var pgSize = getPgSize(blockId);
	if(length > 0 && length != '' && length != "")
	{
		for(var idx = 0;idx < length; idx++)
   		{
			getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value = (currPg - 1) * pgSize + idx + 1;
			fireHTMLEvent(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0], "onpropertychange");			
		}
	}
	appendData();
	return true;
}

function fnPostNew_KERNEL() {
    fn_default();
	fnDisableElement(document.getElementById("BLK_TM_TAG_MASTER__USECASENAME"));
    return true;
}

function fnPopulateUseCaseName() {
	var trainPath = document.getElementById("BLK_TM_TAG_MASTER__NERTRAINPATH").value;
	var pathElements = trainPath.replace(/\/$/, '').split('/');
	var lastFolder = pathElements[pathElements.length - 1];
	document.getElementById("BLK_TM_TAG_MASTER__USECASENAME").value = lastFolder;
	fireHTMLEvent(document.getElementById("BLK_TM_TAG_MASTER__USECASENAME"), "onpropertychange");			
	return true;
}

function fnCallBackEnd(action) {
    if (gAction) {
        var prevAction = gAction;
        gAction = action;
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
    var l_id = document.getElementById("BLK_TM_TAG_MASTER__ID").value;
	if (resp == "FAILURE") {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), resp, 'E');
		return false;
	} else if (resp == "WARNING" || resp == "SUCCESS") {
		fireHTMLEvent(document.getElementById("BLK_TM_TAG_MASTER__ID"), "onpropertychange");
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

function fnEnableTagDfltVal(evet) {
	var objTr = getCurrentRow(evet);
	var idx = objTr.rowIndex;
	if (getTableObjForBlock("BLK_TM_TAG_DETAIL").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value)
	{
		fnDisableElement(getTableObjForBlock("BLK_TM_TAG_DETAIL").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0]);
	} else {
		fnEnableElement(getTableObjForBlock("BLK_TM_TAG_DETAIL").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0]);		
	}
	
	return true;
}