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
**  File Name          : LBDPYMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Ashokkumar Arumugam
**  Last modified on   : 15-Apr-2019
**  Full Version       : OBCL_14.3.0.0.0
**  Reason             : Added code to skip 'DFLTPMNT' action on execute query.
**  Search String      : OBCL_14.3_29485141_Changes


**  Last Modified By   : ANUSHA K
**  Last modified on   : 25-NOV-2019
**  Full Version       : OBCL_14.3.0.0.0
**  Reason             : Added code to disable '+' and '-' buttons in participant penalty ratio screen
**  Search String      : OBCL_14.4_PREPAYMENT_PENALTY CHANGES

**  Last Modified By   : Gomathi G
**  Last modified on   : 11-JUN-2020
**  Reason             : To Display  Date, as per user date formatt
**  Search String      : OBCL_14.3_SUPPORT_BUG#31400838 Changes	

**  Last Modified By   : Surya Prabha
**  Last modified on   : 08-JULY-2020
**  Full Version       : OBCL_14.4.0.0.0
**  Reason             : Added code to disable/enable 'Reverse' button
**  Search String      : BUG#31544734 changes

**  Last Modified By   : Vigneshram S
**  Last modified on   : 21-Aug-2020
**  Full Version       : OBCL_14.5.0.0.0
**  Reason             : Added code to force calc during sofr payment
**  Search String      : OBCL_LS_SOFR changes

**Changed By         : Akhila Samson
**Date               : 18-MAR-2021
**Change Description : Date format.
**Search String      : Bug#31400838

**  Last Modified By   : Surya Prabha
**  Last modified on   : 21-JULY-2021
**  Reason             : Code fix to throw override messages
**  Search String      : BUG#33129319 changes

**  Last Modified By   : Palanisamy M
**  Last modified on   : 31-Aug-2021
**  Reason             : Fix provided to handle CONTRACTREFNO LOV defaulting
**  Search String      : BUG#33273675 changes

**  Last Modified By   : Pallavi R
**  Last modified on   : 18-Nov-2021
**  Reason             : Fix provided to handle overrides for custom button action 
**  Search String      : OBCL_14.5_Supp_#33563292 Changes

**  Last Modified By   : Jayaram N
**  Last modified on   : 08-Feb-2022
**  Reason             : LBDPYMNT-LIMIT DATE IS NOT LOV
**  Search String      : Bug#33831074

**  Last Modified By   : Palanisamy M
**  Last modified on   : 18-Apr-2022
**  Reason             : Fix for NEW action populate, after cancelling
**  Search String      : BUG#34072249 changes

**  Last Modified By   : Arunprasath
**  Last modified on   : 09-Aug-2022
**  Reason             : Added fix for enabled reverse button when payment status is Active
**  Search String      : BUG#34418162 changes

**  Last Modified By   : Palanisamy M
**  Last modified on   : 19-Oct-2022
**  Reason             : Fix for Incorrect Interest population for RFR Component
**  Search String      : BUG#34688499 changes

**  Last Modified By   : RAMYA M
**  Last modified on   : 10-MAY-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820

**  Last Modified By   : RAMYA M
**  Last modified on   : 11-MAY-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820

**  Last Modified By   : Sudharshini Balaji
**  Last modified on   : 31-Jan-2024
**  Reason             : Decimal parsing should be done only when the amount paid is not NULL
**  Search String      : Bug#36237150 changes

**  Last Modified By   : Akhila Samson
**  Last modified on   : 13-Dec-2024
**  Reason             : Added the fix to disable/Enable the authorize and reverse button based payment status. 
**  Search String      : Bug#37335197 changes
****************************************************************************************************************************/
var vCustomAction;
var vProcessed = false; //BUG#33273675 changes
/*function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_AUDIT__AUTH_STATUS").value == 'A')
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
  if (document.getElementById("BLK_AUDIT__AUTH_STATUS").value == 'U')
{
EnableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
return true;
} */

//OBCL_14.4_LS_Payment Gateway Populate Changes Starts		
function fnPostLoad_KERNEL(){
	document.getElementById("BLK_PMT_SUMMARY__CURR_ACTION_CODE").style.display = "none";
}
//OBCL_14.4_LS_Payment Gateway Populate Changes End 

function fnCallBackendLB(){
    var g_prev_gAction = gAction;
    gAction = vCustomAction;
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	/*
	//BUG#33129319  changes start
	 if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	// BUG#33129319 changes end*/
	
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
    if (!fnProcessResponse()) {
        gAction = g_prev_gAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        return false;
    }
	
	// BUG#33129319 changes start
	if (fcjResponseDOM) {
		var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == "FAILURE") 
		{
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
			return false;
		}
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
			if (msgStatus == "WARNING")
				{
					//OBCL_14.5_Supp_#33563292 Changes Starts
					if ((vCustomAction !='') &&(vCustomAction!='undefined')){
						processingAction =''; 
					}	
					//OBCL_14.5_Supp_#33563292 Changes Ends
					var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				}
		}
		// BUG#33129319 changes end
	}
	// OBCL_LS_SOFR changes
	 if (gAction == "POPTILLDTACCR"){
		fnClassDefault('BLK_PMT_HDR'); 
	}
    gAction = g_prev_gAction;
    return true;
}

function fnDefaultPmnt()
{
	if(gAction !="" 
	&& gAction !="EXECUTEQUERY" && document.getElementById("BLK_PMT_HDR__CONTRACTREFNO").value != "" && vProcessed == false //BUG#33273675 changes
	)
	{ //OBCL_14.3_29485141_Changes
    vCustomAction = "DFLTPMNT";
    fnCallBackendLB();
	vProcessed = true; //BUG#33273675 changes	
	fnClassDefault('BLK_PMT_HDR'); //BUG#34688499 changes	
	} //OBCL_14.3_29485141_Changes	
}

function fnPopTillDtAccr()
{
    vCustomAction = "POPTILLDTACCR";
    fnCallBackendLB();
}

function fnPartShare()
{
	vCustomAction = "PARTSHARE";
    fnCallBackendLB();
}

function fnpopplinterest()
{
	vCustomAction = "POPPLINT";
    fnCallBackendLB();
}
//OLDPMNT
//Bug#37335197 start
/*function EnableDisableAuthBtn()
{
    if (document.getElementById("BLK_AUDIT__AUTH_STATUS").value == "A")
    {
    DisableToolbar_buttons("Authorize");
    DisableToolbar_buttons("Delete");
    }
    if (document.getElementById("BLK_AUDIT__AUTH_STATUS").value == "U")
    {
    EnableToolbar_buttons("Authorize");
    EnableToolbar_buttons("Delete");
    return true;
    }
}*/
//Bug#37335197 Ends

function fnPostEnterQuery_KERNEL() {
    debugs("In fnPostEnterQuery", "A");
    disableForm();
    fnEnableElement(getElementsByOjName("CONTRACTREFNO")[0]);
    return true; 
}

function fnPostExecuteQuery_KERNEL() {
    debugs("In fnPostExecuteQuery", "A");
    fnEnableElement(getElementsByOjName("BTN_PREV")[0]);
    fnEnableElement(getElementsByOjName("BTN_NEXT")[0]);
	//EnableDisableRevBtn(); // BUG#31544734 changes  //Bug#37335197 COMMENTED
    //EnableDisableAuthBtn();  //Bug#37335197 COMMENTED
    return true; 
}

function fnPartShare(){
	g_prev_gAction = gAction;
	gAction = 'PARTSHARE';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
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
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
 gAction = g_prev_gAction;
 fnSubScreenMain('LBCINTSH','','CVS_LBCINTSH'); 
 return true; 
}

/*

function fnPostLoad(){
    debugs("In fnPostLoad", "A");
    if (getElementsByOjName('CONTRACT_REF_NO')[0].value.length == 0)
    {
      DisableToolbar_buttons("NEW");
    }
    EnableDisableAuthBtn();
    document.getElementById("cmdAddRow_BLK_PMT").style.visibility="hidden";
    document.getElementById("cmdDelRow_BLK_PMT").style.visibility="hidden";
    document.getElementById("BTN_SINGLE_VIEW_BLK_LDVWS_PAYMENT_BREAKUP").style.visibility="hidden";
}

function fnPostNew_KERNEL()
{
    disableForm();
    fnEnableElement(document.getElementById("BLK_PMT_HDR__CONTRACT_REF_NO"));
    fnEnableElement(document.getElementById("BLK_PMT_HDR__VALDT"));
    document.getElementById("BLK_PMT_HDR__VALDT").value = mainWin.AppDate;
    document.getElementById("BLK_PMT_HDR__VALDT").value = mainWin.AppDate;
    fnEnableElement(document.getElementById("BLK_PMT_HDR__LIMITDT"));
    document.getElementById("BLK_PMT_HDR__LIMITDT").value = mainWin.AppDate;
    document.getElementById("BLK_PMT_HDR__LIMITDT").value = mainWin.AppDate;
    fnEnableElement(document.getElementById("BLK_PMT_HDR__BTN_P"));
    return true; 
}

*/
//Bug#31400838 start
/*
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS
function fnPostNew_KERNEL()
{
	fireHTMLEvent(document.getElementById("BLK_PMT_SUMMARY__VALUE_DATE"),"onpropertychange");
	fireHTMLEvent(document.getElementById("BLK_PMT_SUMMARY__LIMIT_DATE"),"onpropertychange");
    return true; 
}
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES ENDS
*/
//Bug#31400838 end

function fnPopulatePmnt(){
    vCustomAction = 'POPPYMNT';
    fnCallBackendLB(); 
	fnClassDefault('BLK_PMT_HDR'); //BUG#34688499 changes	
}

function fnAllocatePmnt() {
    var tableRef=getTableObjForBlock("BLK_PMT"); //Bug#34958820 changes
    var amt_paid_list = tableRef.tBodies[0].rows;
   /* for(var amtIndex = 0; amtIndex < amt_paid_list.length; amtIndex++) 
    {
        if (getElementsByOjName('AMOUNT_DUE')[amtIndex].value.length != 0)
            {
                getElementsByOjName('AMOUNT_DUE')[amtIndex].value = parseFloat(getElementsByOjName('AMOUNT_DUE')[amtIndex].value.replace(gDecimalSymbol,"."));
            }
    } */
    vCustomAction = 'PMTALLOCT';
    fnCallBackendLB();
}

function fnSumAmtPmnt() {
    var tableRef=getTableObjForBlock("BLK_PMT");//Bug#34958820 changes
    var amt_paid_list = tableRef.tBodies[0].rows;
    for(var amtIndex = 0; amtIndex < amt_paid_list.length; amtIndex++) 
    {
        if (getElementsByOjName('AMOUNT_DUE')[amtIndex].value.length != 0)
            {
                 //getElementsByOjName('AMOUNT_DUE')[amtIndex].value = parseFloat(getElementsByOjName('AMOUNT_DUE')[amtIndex].value.replace(gDecimalSymbol,"."));//Bug#34958820
                 //getElementsByOjName('AMOUNT_PAID')[amtIndex].value = parseFloat(getElementsByOjName('AMOUNT_PAID')[amtIndex].value.replace(gDecimalSymbol,"."));//Bug#34958820
				 
				 getElementsByOjName('AMOUNT_DUE')[amtIndex].value = getElementsByOjName('AMOUNT_DUE')[amtIndex].value.replace(gDecimalSymbol,".");//Bug#34958820
               //COMMENTED FOR Bug#36237150 changes   getElementsByOjName('AMOUNT_PAID')[amtIndex].value =getElementsByOjName('AMOUNT_PAID')[amtIndex].value.replace(gDecimalSymbol,".");//Bug#34958820
    
            }

		//Bug#36237150 changes Starts

			 if (getElementsByOjName('AMOUNT_PAID')[amtIndex].value.length != 0)
            {
				getElementsByOjName('AMOUNT_PAID')[amtIndex].value =getElementsByOjName('AMOUNT_PAID')[amtIndex].value.replace(gDecimalSymbol,".");
    
			}
			//Bug#36237150 changes Ends
			
    }
    vCustomAction = 'SUMAMTPD';
    fnCallBackendLB();
}

//Bug#37335197 start
/*
//BUG#31544734 changes starts 
function EnableDisableRevBtn()
{
 if (document.getElementById("BLK_PMT_SUMMARY__PAYMENT_STATUS").value == "V" || document.getElementById("BLK_PMT_SUMMARY__PAYMENT_STATUS").value == "Reversed")
{
DisableToolbar_buttons("Reverse");
}
 if (document.getElementById("BLK_AUDIT__AUTH_STATUS").value == "U" || document.getElementById("BLK_AUDIT__AUTH_STATUS").value == "Unauthorized")
{
DisableToolbar_buttons("Reverse");
}
//Bug#34418162 start
else if ((document.getElementById("BLK_AUDIT__AUTH_STATUS").value == "A" || document.getElementById("BLK_AUDIT__AUTH_STATUS").value == "Authorized") && document.getElementById("BLK_PMT_SUMMARY__PAYMENT_STATUS").value == "A") 
{
EnableToolbar_buttons("Reverse");
}
//Bug#34418162 end
/*else
{
EnableToolbar_buttons("Reverse");
}*/	
/*return true;
}*/
//Bug#37335197 start

function fnPostReverse_KERNEL() {
	debugs("In fnPostReverse", "A");
	//EnableDisableRevBtn(); //Bug#37335197 COMMENTED
	return true; 
}
//BUG#31544734 changes ends

function fnPreAuthorize_KERNEL() {
    authFunction   = 'LBDPYAUT';
    authUixml      = 'LBDPYAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDPYAUT']="KERNEL";
    ArrPrntFunc['LBDPYAUT'] = "";
    ArrPrntOrigin['LBDPYAUT'] ="";
    return true;
}

function fnPostAuthorize_KERNEL() {
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	//EnableDisableRevBtn(); // BUG#31544734 changes //Bug#37335197 COMMENTED
    //EnableDisableAuthBtn(); //Bug#37335197 COMMENTED
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
    return true;
}
//Bug#37335197 Start
/*
function fnNextVer() {
	vCustomAction = "NEXT";
    fnCallBackendLB();
	EnableDisableAuthBtn();
	EnableDisableRevBtn();//Bug#34418162
 /*appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='NEXT';
 fnCallBackendLB();
EnableDisableAuthBtn();
 gAction=gPrevAction;
 return true;*/
//}*/
/*
function fnPrevVer() {
	vCustomAction = "PREV";
    fnCallBackendLB();
	EnableDisableAuthBtn();
	EnableDisableRevBtn();//Bug#34418162
 /*appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PREV';
 fnCallBackendLB();
EnableDisableAuthBtn();
 gAction=gPrevAction;
 return true;*/
//}*/



function  fnNextVer(){
    var verNo=Number(document.getElementById("BLK_PMT_HDR__CURRENT_PMT").value);
    var VERNOCount=Number(document.getElementById("BLK_PMT_HDR__TOTAL_PMTS").value);
    if(verNo == VERNOCount){
        showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E");
    }
    if(VERNOCount>verNo)
    {
        verNo++;
        document.getElementById("BLK_PMT_HDR__CURRENT_PMT").value=verNo;
        //document.getElementById("BLK_PMT_HDR__CURRENT_PMT").value=verNo;
        g_prev_gAction=gAction;
        gAction='EXECUTEQUERY';
        fnExecuteQuery();
        //EnableDisableAuthBtn();
        gAction=g_prev_gAction;
    }
    return true;
}

function  fnPrevVer(){
    var verNo=Number(document.getElementById("BLK_PMT_HDR__CURRENT_PMT").value);
    var VERNOCount=Number(document.getElementById("BLK_PMT_HDR__TOTAL_PMTS").value);
    if(verNo == 1){
        showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E");
    }
       if(verNo>1)
    {    
        verNo--;
        document.getElementById("BLK_PMT_HDR__CURRENT_PMT").value=verNo;
        //document.getElementById("BLK_PMT_HDR__CURRENT_PMT").value=verNo;
        g_prev_gAction=gAction;
        gAction='EXECUTEQUERY';
        fnExecuteQuery();
        //EnableDisableAuthBtn();
        gAction=g_prev_gAction;
    }
    return true;
}

//Bug#37335197 ends
function fnPostSave_KERNEL() {
    fnEnableElement(document.getElementById("BLK_PMT_HDR__BTN_PREV"));
    fnEnableElement(document.getElementById("BLK_PMT_HDR__BTN_NEXT"));
	//EnableDisableRevBtn(); // BUG#31544734 changes //Bug#37335197 COMMENTED
    //EnableDisableAuthBtn(); //Bug#37335197 COMMENTED
    return true;
}

//OBCL_14.4_PREPAYMENT_PENALTY CHANGES
function fnPostLoad_CVS_PART_PENAL_KERNEL()
{
	
       //fnDisableElement(document.getElementById('cmdAddRow_BLK_PART_PENAL'));
	//fnDisableElement(document.getElementById('cmdDelRow_BLK_PART_PENAL'));
	fnDisableElement(document.getElementById('cmdAddRow_BLK_PART_RATIO'));
	fnDisableElement(document.getElementById('cmdDelRow_BLK_PART_RATIO'));
	
	return true;
}

//OBCL_14.4_PREPAYMENT_PENALTY CHANGES

function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_PMT_HDR__CONTRACTREFNO').value;    
    return true;
}

//OLDPMNT


//Bug#33831074:Changes starts here
function fnPostNew_KERNEL()
{
	vProcessed = false; //BUG#34072249 changes
	fnEnableElement(document.getElementById("BLK_PMT_SUMMARY__VALUE_DATE"));
	document.getElementById("BLK_PMT_SUMMARY__VALUE_DATE").value = mainWin.AppDate;
	fireHTMLEvent(document.getElementById("BLK_PMT_SUMMARY__VALUE_DATE"),"onpropertychange");
	
	fnEnableElement(document.getElementById("BLK_PMT_SUMMARY__LIMIT_DATE"));
	document.getElementById("BLK_PMT_SUMMARY__LIMIT_DATE").value = mainWin.AppDate;
	fireHTMLEvent(document.getElementById("BLK_PMT_SUMMARY__LIMIT_DATE"),"onpropertychange");
	return true; 	
}
//Bug#33831074:Changes ends here