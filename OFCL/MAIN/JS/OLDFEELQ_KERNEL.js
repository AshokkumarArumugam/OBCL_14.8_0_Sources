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
**  File Name          : OLDFEELQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Gomathi G
**  Last modified on   : 27-MAY-2020
**  Reason             : To Display  Date, as per user date formatt
**  Search String      : OBCL_14.3_SUPPORT_BUG#31400838 Changes

**  Last Modified By   : Chandra Achuta
**  Last modified on   : 20-JUN-2024
**  Reason             : To Default the application date for value date and limit date
**  Search String      : BUG#36705041
****************************************************************************************************************************/
/*var fcjResponseDOM;
var fcjRequestDOM;*/
var gPrevAction;

function fnPostNew_KERNEL()
{	
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PAY__VALDT"));
	document.getElementById("BLK_OLTBS_CONTRACT_PAY__VALDT").value = mainWin.AppDate;
	//OBCL_14.3_SUPPORT_BUG#31400838 Changes Starts
	fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT_PAY__VALDT"),"onpropertychange"); 
	//document.getElementById("BLK_OLTBS_CONTRACT_PAY__VALDT").value = formatDate(mainWin.AppDate);
    	
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PAY__LIMITDT"));
	document.getElementById("BLK_OLTBS_CONTRACT_PAY__LIMITDT").value = mainWin.AppDate;
	fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT_PAY__LIMITDT"),"onpropertychange"); 
	//document.getElementById("BLK_OLTBS_CONTRACT_PAY__LIMITDT").value = formatDate(mainWin.AppDate);	
	//OBCL_14.3_SUPPORT_BUG#31400838 Changes Ends
	//BUG#36705041  Changes Starts
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PAY__VALUEDATE"));
	document.getElementById("BLK_OLTBS_CONTRACT_PAY__VALUEDATE").value = mainWin.AppDate;
	fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT_PAY__VALUEDATE"),"onpropertychange");
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PAY__LIMITDATE"));
	document.getElementById("BLK_OLTBS_CONTRACT_PAY__LIMITDATE").value = mainWin.AppDate;
	fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT_PAY__LIMITDATE"),"onpropertychange");
	//BUG#36705041  Changes Ends
	document.getElementById('cmdAddRow_BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI').style.visibility='hidden';
	document.getElementById('cmdAddRow_BLK_LFTBS_CONTRACT_LIQ').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_LFTBS_CONTRACT_LIQ').style.visibility='hidden';

	return true; 
}

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
return true;
}

function fnPopulate(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='POPULATE';
 fnBackendCall();  
 gAction=gPrevAction;
 return true;
}

function fnAllocate(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='ALLOCATE';
 fnBackendCall();  
 gAction=gPrevAction;
 return true;
}

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	fnEnableElement(getElementsByOjName("BTN_PREV")[0]);
	fnEnableElement(getElementsByOjName("BTN_NEXT")[0]);
	return true; 
}

function fnOnClick_BTN_NEXT_VER(){

	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT_PAY__CURRPMNT").value); 
	var VERNOCount=Number(document.getElementById("BLK_OLTBS_CONTRACT_PAY__TOTPAMNT").value); 
	document.getElementById("BLK_OLTBS_CONTRACT_PAY__TXTVERSIONCHK").value = 'Y';
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_OLTBS_CONTRACT_PAY__CURRPMNT").value=verNo; 
		document.getElementById("BLK_OLTBS_CONTRACT_PAY__CURRPMNT").value=verNo;  
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';        
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


function fnOnClick_BTN_PREV_VER(){
	
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT_PAY__CURRPMNT").value); 
	var VERNOCount=Number(document.getElementById("BLK_OLTBS_CONTRACT_PAY__TOTPAMNT").value); 
	document.getElementById("BLK_OLTBS_CONTRACT_PAY__TXTVERSIONCHK").value = 'Y';
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	
       if(verNo>1)
	{	
		verNo--; 
		document.getElementById("BLK_OLTBS_CONTRACT_PAY__CURRPMNT").value=verNo; 
		document.getElementById("BLK_OLTBS_CONTRACT_PAY__CURRPMNT").value=verNo; 		
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

function fnPostSave_KERNEL() {
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PAY__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PAY__BTN_NEXT"));
  return true;
}


function fnPreAuthorize_KERNEL(){
    authFunction = 'LFDFEAUT';
    authUixml = 'LFDFEAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LFDFEAUT'] = "KERNEL";
    ArrPrntFunc['LFDFEAUT'] = "";
    ArrPrntOrigin['LFDFEAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}

function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT_PAY__CONREFNO').value;
    return true;
}
//Bug#31400838 changes starts
/*
function formatDate(dsDate)
{
 var mb3Date = new MB3Date(dsDate, gDateFormatDSO);
 if (mb3Date.isValidDate()) 
	return mb3Date.getShortDate();
}
*/
//Bug#31400838 changes starts