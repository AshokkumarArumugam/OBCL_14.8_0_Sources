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
**  Written by         : Avinav Seal
**  Date of creation   : 07/09/16
**  File Name          : LFDACFIN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Janki Kholiya
**  Last modified on   : 03-JUL-2020
**  Full Version       : 
**  Reason             : Added participant summary form - OBCL14.4_ADHOC_EXPENSE

**Changed By           : Satheesh Seshan
**Date                 : 17-Aug-2021
**Change Description   : lfdacfin screen plus minus hiding during unlock. 
**Search String        : Bug#33274416

**Changed By           : Sowmya Bitra
**Date                 : 16-Aug-2022
**Change Description   : Disabling +/- for participant ratio details 
**Search String        : Bug#34487029

**Changed By           : Narendra Dhaker
**Date                 : 11-Oct-2023
**Change Description   : UNABLE TO SEE DELETE OR AUTHORIZE BUTTON IN REVERSAL OF LFDACFIN
**Search String        : Bug#35834900

****************************************************************************************************************************/
function appending_data()
{
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
}

function FN_DEFAULT()
{
	l_prev_gAction=gAction;
	gAction = "DEFAULT";
	appending_data();
	gAction = l_prev_gAction;
	enableForm();
	fnDisableElement(document.getElementById('BLK_COMPONENT__CONTSTAT'));
	return true;
}
function FN_PREV()
{
//Bug#35834900 Changes Starts
   // l_prev_gAction=gAction;
   // gAction = "PREV";
   // appending_data();
   // gAction = l_prev_gAction;
   
  var verNo=Number(document.getElementById("BLK_CONTRACT__UI_CURR_ESN").value);
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E");
	   }
       if(verNo>1)
	{	
		verNo--; 
		document.getElementById("BLK_CONTRACT__UI_CURR_ESN").value=verNo;	
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
//Bug#35834900 Changes ends
	return true; 
}
function FN_NEXT(){
//Bug#35834900 Changes Starts
	// l_prev_gAction=gAction;
	// gAction = "NEXT";
	// appending_data();
	// gAction = l_prev_gAction;
	
	var verNo=Number(document.getElementById("BLK_CONTRACT__UI_CURR_ESN").value); 
	var VERNOCount=Number(document.getElementById("BLK_CONTRACT__UI_LATEST_ESN").value);
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E");
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_CONTRACT__UI_CURR_ESN").value=verNo; 	
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
//Bug#35834900 Changes ends
	return true; 
}
function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById('BLK_CONTRACT__UI_CURR_ESN'));
	fnEnableElement(document.getElementById('BLK_CONTRACT__UI_LATEST_ESN'));
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_NEXT'));
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_PREV'));
	fnDisablePartSummary(); //OBCL14.4_ADHOC_EXPENSE
	return true; 
}

function fnPostNew_KERNEL() {
	fnDisableElement(document.getElementById('BLK_CONTRACT__UI_CURR_ESN'));
	fnDisableElement(document.getElementById('BLK_CONTRACT__UI_LATEST_ESN'));
	fnDisableElement(document.getElementById('BLK_COMPONENT__CONTSTAT'));
	getElementsByOjName('BTN_ADD_BLK_COMPONENT')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_COMPONENT')[0].style.visibility = 'hidden';
	fnDisablePartSummary(); //OBCL14.4_ADHOC_EXPENSE
	return true;
}
function FN_CREATE_SCH() {
	l_prev_gAction=gAction;
	if (gAction=='MODIFY')
		gAction = 'CREATESCHM';
	else if(gAction=='NEW')
		gAction = 'CREATESCHN';
	appending_data();
	gAction = l_prev_gAction;
	return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'LFDACAUT';
    authUixml = 'LFDACAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LFDACAUT'] = "KERNEL";
    ArrPrntFunc['LFDACAUT'] = "";
    ArrPrntOrigin['LFDACAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
    DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTRACTREFNO').value;  
    return true;
}
//start: OBCL14.4_ADHOC_EXPENSE

function fnDisablePartSummary(){
	if (document.getElementById("BLK_CONTRACT__CONT_MOD").value == 'FC' || document.getElementById("BLK_CONTRACT__CONT_MOD").value == 'OL')
	{
	fnDisableSubSysButtons(document.getElementById("LPSCOMNT").children[0]);
	}
	return true;
}

function fnPreLaunchForm_CVS_PARTSUM_KERNEL(screenArgs ){
	if (document.getElementById("BLK_CONTRACT__PRODTYPE").value == 'C' )
	{
	screenArgs['Product_Type'] =  'T';
	screenArgs['TRANREF'] = document.getElementById("BLK_CONTRACT__CONTRACTREFNO").value;
	}
	else if (document.getElementById("BLK_CONTRACT__PRODTYPE").value == 'L' )
	{
	screenArgs['Product_Type'] =  'D';
	screenArgs['PTREF'] = document.getElementById("BLK_CONTRACT__CONTRACTREFNO").value;
	}
parent.screenArgs =screenArgs;
	return true;
}
//end: OBCL14.4_ADHOC_EXPENSE

//Bug#33274416 Satrts
function fnPostUnlock_KERNEL() {
	getElementsByOjName('BTN_ADD_BLK_COMPONENT')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_COMPONENT')[0].style.visibility = 'hidden';
	return true;
}
//Bug#33274416 End

//Bug#34487029 Start
function fnPostLoad_CVS_PART_EVENT_RATIO_KERNEL()
{
	fnDisableElement(document.getElementById('cmdAddRow_BLK_PART_EVENT_RATIO'));
	fnDisableElement(document.getElementById('cmdDelRow_BLK_PART_EVENT_RATIO'));
	
	return true;
}
//Bug#34487029 End
