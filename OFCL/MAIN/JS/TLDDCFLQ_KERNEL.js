/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : TLDDCFLQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnBackendCall(){
	appendData(document.getElementById("TBLPageAll"));
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") 
	{
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }	
	return true;
 /*fcjRequestDOM = buildUBSXml();
 fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
     if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }  /*else if (msgStatus == "SUCCESS") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    } */
}

function fn_populate(){
	appendData(document.getElementById("TBLPageAll"));		
    gPrevAction=gAction;
    gAction='POPULATE';
    fnBackendCall();
    gAction=gPrevAction;
    return true;
}


function fn_prev_ver(){
	appendData(document.getElementById("TBLPageAll"));		
    gPrevAction=gAction;
    gAction='PREV';
    fnBackendCall();
    gAction=gPrevAction;
    return true;
}

function fn_next_ver(){
	appendData(document.getElementById("TBLPageAll"));		
    gPrevAction=gAction;
    gAction='NEXT';
    fnBackendCall();
    gAction=gPrevAction;
    return true;
}
/*
function fn_next_ver(){

	var verNo=Number(document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO").value); 
	var VERNOCount=Number(document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_TOTAL_VER").value); 
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO").value=verNo; 
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';        
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


function fn_prev_ver(){
	
	var verNo=Number(document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO").value); 
	var VERNOCount=Number(document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_TOTAL_VER").value); 
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	
       if(verNo>1)
	{	
		verNo--; 
		document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO").value=verNo;
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}*/

function fn_sum_master(){
	appendData(document.getElementById("TBLPageAll"));		
    gPrevAction=gAction;
    gAction='SUM_MASTER';
    fnBackendCall();
    gAction=gPrevAction;
    return true;	
}

function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDDCFAU';
    authUixml = 'TLDDCFAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['TLDDCFAU'] = "KERNEL";
    ArrPrntFunc['TLDDCFAU'] = "";
    ArrPrntOrigin['TLDDCFAU'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
    //setDataXML(getXMLString(pureXMLDOM));
    //showData(dbStrRootTableName, 1);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}

function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}

function fnPostNew_KERNEL(){
	
	fnDisableElement(document.getElementById('BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO'));
	fnDisableElement(document.getElementById('BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_BTN_PREV_VER'));
	fnDisableElement(document.getElementById('BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_BTN_NEXT_VER'));
	return true; 
}

function fnPostExecuteQuery_KERNEL() {
	fnEnableElement(document.getElementById('BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_BTN_PREV_VER'));
	fnEnableElement(document.getElementById('BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_BTN_NEXT_VER'));
	
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_TLTB_DCF_LIQD_AGENCY_MASTER"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
				document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_TOTAL_VER").value = TextContents[13]; // getting TextContents[13] value
				document.getElementById("BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_TOTAL_VER").value = TextContents[13]; // getting TextContents[13] value
		}
	}
	return true;
}


