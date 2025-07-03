/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
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
**  File Name          : TXDRLHIS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnPostExecuteQuery_KERNEL() {
fnEnableElement(document.getElementById('BLK_TATMSRULEHISTORY__BTN_PREV'));
fnEnableElement(document.getElementById('BLK_TATMSRULEHISTORY__BTN_NEXT'));
 return true;
}

/*function  fnOnClick_BTN_NEXT(){

	var verNo=getElementsByOjName('VERSION_NO')[0].value; 
	var VERNOCount=getElementsByOjName('MAXVERSIONNUMBER')[0].value;
	if(parseInt(verNo)<parseInt(VERNOCount))
	{
		verNo++;
		getElementsByOjName('VERSION_NO')[0].value=parseInt(verNo);
		appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
		if (parseInt(verNo) != parseInt(VERNOCount))
		{
			DisableToolbar_buttons("AUTHORIZE");
			DisableToolbar_buttons("DELETE");
			DisableToolbar_buttons("REVERSE");
			DisableToolbar_buttons("NEW");
		}
	}
	else
	{
		showErrorAlerts('IN-HEAR-122');
	}
}

function  fnOnClick_BTN_PREVIOUS(){

	var verNo=getElementsByOjName('VERSION_NO')[0].value; 
	var VERNOCount=getElementsByOjName('MAXVERSIONNUMBER')[0].value;
	verNo = parseInt(verNo) - 1;
	if(parseInt(verNo)>0)
	{		
		getElementsByOjName('VERSION_NO')[0].value=parseInt(verNo);
		appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		appendData(document.getElementById("TBLPageTAB_MAIN"));
		fnExecuteQuery();
		gAction=g_prev_gAction;
		if (parseInt(verNo) != parseInt(VERNOCount))
		{
			DisableToolbar_buttons("AUTHORIZE");
			DisableToolbar_buttons("DELETE");
			DisableToolbar_buttons("REVERSE");
			DisableToolbar_buttons("NEW");
		}
	}
	else
	{
		showErrorAlerts('IN-HEAR-121');
	}
}

function fnOnClick_BTN_PREVIOUS()
{
	var verNo = document.getElementById("BLK_TATMSRULEHISTORY__VERSION_NO").value;

	var versionCount = document.getElementById("BLK_TATMSRULEHISTORY__MAXVERSIONNUMBER").value;
       if (verNo > 1) 
	{ 
       	verNo--;
       
       	document.getElementById("BLK_TATMSRULEHISTORY__VERSION_NO").value = verNo;
	document.getElementById("BLK_TATMSRULEHISTORY__MAXVERSIONNUMBER").value= versionCount; //newly added
         	alert('Fetching the contract version ' + document.getElementById("BLK_TATMSRULEHISTORY__VERSION_NO").value + "...");
        	appendData();
        	g_prev_gAction = gAction;
        	gAction = 'EXECUTEQUERY';
        	fcjRequestDOM = buildUBSXml();
        	fnExecuteQuery(fcjRequestDOM);
		
        	gAction = g_prev_gAction;
       } 
	else 
	{
       	showErrorAlerts('IN-HEAR-140');
       }
	   
}

function fnOnClick_BTN_NEXT()
{
	var verNo = document.getElementById("BLK_TATMSRULEHISTORY__VERSION_NO").value;
   
       var versionCount = document.getElementById("BLK_TATMSRULEHISTORY__MAXVERSIONNUMBER").value;
       if (verNo < versionCount) 
	{
       	verNo++;

              document.getElementById("BLK_TATMSRULEHISTORY__VERSION_NO").value = verNo;
       		document.getElementById("BLK_TATMSRULEHISTORY__MAXVERSIONNUMBER").value= versionCount;//newly
              alert('Fetching the contract version ' + document.getElementById("BLK_TATMSRULEHISTORY__VERSION_NO").value + "...");
              appendData();
              g_prev_gAction = gAction;
              gAction = 'EXECUTEQUERY';
              fcjRequestDOM = buildUBSXml();
              fnExecuteQuery(fcjRequestDOM);
              gAction = g_prev_gAction;
       } 
	else 
	{
       	showErrorAlerts('IN-HEAR-140');
       }
	
}
*/

var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
function fnBackendCall(){
 fcjRequestDOM = buildUBSXml();
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
    }   
}
function fnOnClick_BTN_NEXT(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='NEXT';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnOnClick_BTN_PREVIOUS(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PREV';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnPostExecuteQuery_KERNEL() {
fnEnableElement(document.getElementById('BLK_TXTMSRULEHISTORY__BTN_PREV'));
fnEnableElement(document.getElementById('BLK_TXTMSRULEHISTORY__BTN_NEXT'));
 return true;
}
/*
function fnOnClick_BTN_NEXT() {
	var verNo = document.getElementById("BLK_TXTMSRULEHISTORY__VERSION_NO").value;
	var versionCount = document.getElementById("BLK_TXTMSRULEHISTORY__MAXVERSIONNUMBER").value;
	if (verNo < versionCount) {
		verNo++;
		document.getElementById(""BLK_TXTMSRULEHISTORY__VERSION_NO").value = verNo;
		appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction = gAction;
		gAction = 'EXECUTEQUERY';
		fnExecuteQuery();
		gAction = g_prev_gAction;
	}
}

function fnOnClick_BTN_PREV() {
	var verNo = document.getElementById("BLK_TXTMSRULEHISTORY__VERSION_NO").value;
	var versionCount = document.getElementById("BLK_TXTMSRULEHISTORY__MAXVERSIONNUMBER").value;
	verNo--;
	if (verNo > 0) {
		document.getElementById("BLK_TXTMSRULEHISTORY__VERSION_NO").value = verNo;
		appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction = gAction;
		gAction = 'EXECUTEQUERY';
		appendData(document.getElementById("TBLPageTAB_MAIN"));
		fnExecuteQuery();
		gAction = g_prev_gAction;
	}
}*/