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
**  File Name          : LDDPMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : K . PRIYADARSHINI
**  Last modified on   : 27-OCT-2016
**  Search String      : OFCL_12.3.0.0.0_24936916
**  Reason             : Version number changes and date defaulting to app date
**
**  CHANGE LOG
**  Last Modified By   : K . PRIYADARSHINI
**  Last modified on   : 02-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25026150
**  Reason             : Authorise Button is disabled from toolbar based on auth_status of footer
**
**  CHANGE LOG
**  Last Modified By   : K . PRIYADARSHINI
**  Last modified on   : 02-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25075539 
**  Reason             : Delete Button is disabled from toolbar based on auth_status of footer
**
**  SFR Number         : 25096590 
**  Search String      : OFCL_12.3.0.0.0_25096590 
**  Changed By         : K.PRIYADARSHINI
**  Change Description : Added check for msgStatus == "WARNING" for the overrides to appear on button click itself.
**
**  SFR Number         : 26612637 
**  Search String      : OFCL_12.3.0.0.0_26612637 
**  Changed By         : Anjaneya Prasad S
**
**  Last Modified By   : Shishirkumar Aithal	
**  Last modified on   : 08-Dec-2017
**  Search String      : OFCL_12.3.0.0.0_27054356 
**  Reason             : Added code to check the parseFloat of AMTPAID,it will be applied if the AMTPAID is not null.

**  SFR Number         : 27190209 
**  Search String      : BUG#27190209
**  Changed By         : Shishirkumar Aithal
**  Change Description : Commented changes given as part of 25075539  and 25026150 for enabling auth button 

**  Last Modified By   : Arvind Baskar
**  Last modified on   : 21-DEC-2018
**  Search String      : OFCL_14.2.0.0.0_29051928 
**  Reason             : Date formatting.

**  Last Modified By   : Jithin Mahesh
**  Last modified on   : 24-OCT-2019
**  Search String      : OFCL_14.3.0.0.0_29583889
**  Reason             : LOV change

**  SFR Number         : 30489103  
**  Search String      : BUG#30489103 
**  Changed By         : Arunprasath K
**  Change Description : Pop up editor is required in query/view mode 

**  SFR Number         : 31429569  
**  Search String      : BUG#31429569 
**  Changed By         : Abhinav Bhasker
**  Change Description : Force recal Changes w.r.t. Populate while Manual Payment

**  SFR Number         : 31473456  
**  Search String      : OBCL_14.3_SUPPORT_BUG#31473456
**  Changed By         : Gomathi G
**  Change Description : Currency mapping 

**  SFR Number         : 32606723  
**  Search String      : BUG#32606723
**  Changed By         : Narendra Dhaker
**  Change Description : Snapshot change to update Master data source 

**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : To change Date format as per user preference
**Search String      : Bug#31400838

**Changed By         : Revathi Dharmalingam
**Date               : 01-Nov-2021
**Change Description : Changes made for FX Variation Changes during Contract booking screen
**Search String      : OBCL_14.5_FX_Variation Changes

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 07-Mar-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820
****************************************************************************************************************************/
var gPrevAction;

/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */
 
//OFCL_12.3.0.0.0_25026150  starts 
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_AUDITTRIAL__AUTHSTATUS").value == "Authorized")
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete"); //OFCL_12.3.0.0.0_25075539
}
  if (document.getElementById("BLK_AUDITTRIAL__AUTHSTATUS").value == "Unauthorized")
{
EnableToolbar_buttons("Authorize");
EnableToolbar_buttons("Delete"); //OFCL_12.3.0.0.0_25075539
}
return true;
}
//OFCL_12.3.0.0.0_25026150 ends

function fnPostLoad_KERNEL(){
	debugs("In fnPostLoad", "A");
	/* if (getElementsByOjName('FCCREF')[0].value.length == 0)
    {
      DisableToolbar_buttons("NEW");	//FCUBS11.2_Cross_Browser#1
    } */
	// EnableDisableAuthBtn(); //OFCL_12.3.0.0.0_24936916 //BUG#27190209_Commented
	 document.getElementById("cmdAddRow_BLK_OLVWS_PAYMENT_BREAKUP").style.visibility="hidden";
     document.getElementById("cmdDelRow_BLK_OLVWS_PAYMENT_BREAKUP").style.visibility="hidden";
	 document.getElementById("BTN_SINGLE_VIEW_BLK_LDVWS_PAYMENT_BREAKUP").style.visibility="hidden";
	 
	 //document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRVERU").value=document.getElementById("OLVWS_PAYMENT_SUMMARY__CURRPMNT").value;
	 //document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTVERNOU").value=document.getElementById("OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value;
	 //fnEnableElement(getElementsByOjName("BTN_NEXT_VER")[0]);		
	
	 //document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRVERU").value=document.getElementById("OLVWS_PAYMENT_SUMMARY__CURRPMNT").value;
	 //document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTVERNOU").value=document.getElementById("OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value;
	 //fnEnableElement(getElementsByOjName("BTN_NEXT_VER")[0]);	
}

/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid 
 */
function fnPostEnterQuery_KERNEL() {
	debugs("In fnPostEnterQuery", "A");
	disableForm();
	fnEnableElement(getElementsByOjName("CONTRACTREFNOP")[0]);//BUG#32606723
    fnEnableElement(getElementsByOjName("FCCREF")[0]);
	return true; 
}

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	//disableForm();
    //fnEnableElement(getElementsByOjName("FCCREF")[0]);
	//fnDisableTBar();
	fnEnableElement(getElementsByOjName("BTN_PREV")[0]);
	fnEnableElement(getElementsByOjName("BTN_NEXT")[0]);
	//OFCL_12.3.0.0.0_26612637 changes start
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_SCHDT"));
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__PAYMNTREM"));//BUG#30489103
    document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__PAYMNTREM").readOnly = true;//BUG#30489103
	//OFCL_12.3.0.0.0_26612637 ends
	//EnableDisableAuthBtn(); //OFCL_12.3.0.0.0_25026150 //BUG#27190209_Commented
	fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes
	
	return true; 
}

function fnPostNew_KERNEL()
{
	disableForm();
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__FCCREF"));
	try{
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CONTRACTREFNOP"));
	//OBCL_14.5_FX_Variation Changes Start
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__SPOT_RATE"));
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__PAYMENT_CCY2"));
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__PAYMENT_CCY"));
	//OBCL_14.5_FX_Variation Changes End
 }catch(e){} //BUG#32606723															  
	
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_P"));
	document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__UI_ACTIONCODE").value  = gAction; //OFCL_14.3.0.0.0_29583889
	//OFCL_12.3.0.0.0_24936916 starts
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__VALDT"));
	document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__VALDT").value = mainWin.AppDate;
    fireHTMLEvent(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__VALDT"),"onpropertychange");//Bug#31400838
	//document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__VALDT").value = formatDate(mainWin.AppDate); //OFCL_14.2.0.0.0_29051928 // commented for Bug#31400838
	//document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__VALDT").value = mainWin.AppDate; //OFCL_14.2.0.0.0_29051928 
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__LIMITDT"));
	document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__LIMITDT").value = mainWin.AppDate;
	fireHTMLEvent(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__LIMITDT"),"onpropertychange");//Bug#31400838
	
	//document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__LIMITDT").value = formatDate(mainWin.AppDate); //OFCL_14.2.0.0.0_29051928 // commented for Bug#31400838
	//document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__LIMITDT").value = mainWin.AppDate; //OFCL_14.2.0.0.0_29051928

	//OFCL_12.3.0.0.0_24936916 ends
	//fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_P"));
	//OBCL_14.5_FX_Variation Changes Start
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__PAYMENT_CCY.1"));
	fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__PAYMENT_CCY.2"));
	//OBCL_14.5_FX_Variation Changes End
	
	return true; 
}

function fn_PopulatePayment(){
	g_prev_gAction = gAction;
	gAction = 'POPULATE';
	document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__ACTION_UI").value  = gAction; //Bug#31429569
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
	//OFCL_12.3.0.0.0_25096590 changes ends
	if(msgStatus=="SUCCESS") 
	{
		fnPostPopulatePayment();	
	}
 //Bug#31429569
 if (gAction == "POPULATE"){
		fnClassDefault('BLK_OLVWS_PAYMENT_SUMMARY'); // master block
	}
	gAction = g_prev_gAction;
	document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__ACTION_UI").value  = '';
 return true; 
}

function fnPostPopulatePayment()
{
	enableForm();
    fnDisableElement(getElementsByOjName("CONTRACTREFNOP")[0]);//BUG#32606723
	fnDisableElement(getElementsByOjName("FCCREF")[0]);
	//fnDisableElement(getElementsByOjName("BTN_P")[0]);
}

function fn_Allocate_Payment() {
    g_prev_gAction = gAction;
	gAction = "ALLOCATE";

	//appendTextFieldValue(getElementsByOjName('LIMITDT')[0], 1, 'OLVWS_PAYMENT_SUMMARY'); 
	//appendTextFieldValue(getElementsByOjName('VALDT')[0], 1, 'OLVWS_PAYMENT_SUMMARY'); 
	//appendTextFieldValue(getElementsByOjName('TOTPAID')[0], 1, 'OLVWS_PAYMENT_SUMMARY');
	//var tableRef=document.getElementById("BLK_OLVWS_PAYMENT_BREAKUP"); //Bug#34958820 changes
	var tableRef=getTableObjForBlock("BLK_OLVWS_PAYMENT_BREAKUP"); //Bug#34958820 changes
	var amt_paid_list = tableRef.tBodies[0].rows;
	for(var amtIndex = 0; amtIndex < amt_paid_list.length; amtIndex++) 
	{
		if (getElementsByOjName('AMTDUE')[amtIndex].value.length != 0)
			{
				//getElementsByOjName('AMTDUE')[amtIndex].value = parseFloat(getElementsByOjName('AMTDUE')[amtIndex].value.replace(gDecimalSymbol,"."));
                getElementsByOjName('AMTDUE')[amtIndex].value = getElementsByOjName('AMTDUE')[amtIndex].value.replace(gDecimalSymbol,".");//REDWOOD_CHANGES
			}
		
	}
	appendData(document.getElementById('TBLPageAll'));
	//	(document.getElementById('TBLPage'+strCurrentTabID));
	fcjRequestDOM = buildUBSXml(); 
     servletURL = "FCClientHandler";
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
    //OFCL_12.3.0.0.0_25096590 changes ends
	
  //getElementsByOjName('VERNO')[0].value  =	getElementsByOjName('LATEST_VERNO')[0].value;
  //fn_disable_docElements();			 //This function will disable the currpmnt and totpamnt text boxes
  //gAction = "NEW";
  gAction = g_prev_gAction;  
  return true;
}

function fn_Sumup_Payment() {
	g_prev_gAction = gAction;
	 //var tableRef=document.getElementById("BLK_OLVWS_PAYMENT_BREAKUP"); //Bug#34958820 changes
	 var tableRef=getTableObjForBlock("BLK_OLVWS_PAYMENT_BREAKUP"); //Bug#34958820 changes
	 var amt_paid_list = tableRef.tBodies[0].rows;
	for(var amtIndex = 0; amtIndex < amt_paid_list.length; amtIndex++) 
	{
		if (getElementsByOjName('AMTDUE')[amtIndex].value.length != 0)
			{
				 //getElementsByOjName('AMTDUE')[amtIndex].value = parseFloat(getElementsByOjName('AMTDUE')[amtIndex].value.replace(gDecimalSymbol,".")); //REDWOOD_CHANGES
				 getElementsByOjName('AMTDUE')[amtIndex].value =  getElementsByOjName('AMTDUE')[amtIndex].value.replace(gDecimalSymbol,"."); //REDWOOD_CHANGES
         //OFCL_12.3.0.0.0_27054356 changes Start
            }
		if (getElementsByOjName('AMTPAID')[amtIndex].value.length != 0)
			{
        //OFCL_12.3.0.0.0_27054356 changes End    				 
				 //getElementsByOjName('AMTPAID')[amtIndex].value = parseFloat(getElementsByOjName('AMTPAID')[amtIndex].value.replace(gDecimalSymbol,"."));  //REDWOOD_CHANGES
				 getElementsByOjName('AMTPAID')[amtIndex].value = getElementsByOjName('AMTPAID')[amtIndex].value.replace(gDecimalSymbol,".");  //REDWOOD_CHANGES
			}	
	}

     appendData(document.getElementById('TBLPageAll'));
     gAction = "SUMUP";	
	 fcjRequestDOM = buildUBSXml(); 
     servletURL = "FCClientHandler";
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
	//OFCL_12.3.0.0.0_25096590 changes ends
	
   //getElementsByOjName('VERNO')[0].value  =	getElementsByOjName('LATEST_VERNO')[0].value;
   //fn_disable_docElements();			 //This function will disable the currpmnt and totpamnt text boxes
   //gAction = "NEW";
   //[SITECODE: 12.1, INTERNAL, BugDB ID: 20817812]_Retro_from_20810237 changes end	  
   if (gAction == "SUMUP"){
		fnClassDefault('BLK_OLVWS_PAYMENT_SUMMARY'); // master block
	}
	gAction = g_prev_gAction;  
  return true;
}

function fnPreAuthorize_KERNEL() {
    authFunction   = 'OLDPMAUT';
    authUixml      = 'OLDPMAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDPMAUT']="KERNEL";
    ArrPrntFunc['OLDPMAUT'] = "";
    ArrPrntOrigin['OLDPMAUT'] ="";
    return true;
}

function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	//EnableDisableAuthBtn(); //BUG#27190209_Commented
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
	return true;
}


function  fnOnClick_BTN_NEXT_VER(){

	/*var verNo=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value; 
	var VERNOCount=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value;*/

	var verNo=Number(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value); //OFCL_12.3.0.0.0_24936916
	var VERNOCount=Number(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value); //OFCL_12.3.0.0.0_24936916
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo; //Bug#17414862 change from BLK_PYMNT_SUMM__VERNO to BLK_PYMNT_SUMM__CURRPMNT
		document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo;  //OFCL_12.3.0.0.0_24936916
		//appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';
              //appendData(document.getElementById("TBLPageTAB_MAIN"));		
		fnExecuteQuery();
		//EnableDisableAuthBtn(); //OFCL_12.3.0.0.0_25026150 //BUG#27190209_Commented
		gAction=g_prev_gAction;
	}
	return true;
}


function  fnOnClick_BTN_PREV_VER(){

	/*var verNo=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value; 
	var VERNOCount=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value;*/

	var verNo=Number(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value); //OFCL_12.3.0.0.0_24936916
	var VERNOCount=Number(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value); //OFCL_12.3.0.0.0_24936916
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	//verNo--;//Ashok commented
	//if(verNo>0)
       if(verNo>1)
	{	
		verNo--; //Ashok added	
		document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo; //Bug#17414862 change from BLK_PYMNT_SUMM__VERNO to BLK_PYMNT_SUMM__CURRPMNT
		document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo; //OFCL_12.3.0.0.0_24936916
		//appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		//appendData(document.getElementById("TBLPageTAB_MAIN"));
		fnExecuteQuery();
		//EnableDisableAuthBtn(); //OFCL_12.3.0.0.0_25026150 //BUG#27190209_Commented
		gAction=g_prev_gAction;
	}
	return true;
}
function fnPostSave_KERNEL() {
  fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_NEXT"));
//EnableDisableAuthBtn(); //BUG#27190209_Commented
  return true;
}
//OFCL_12.3.0.0.0_26612637 changes start
function fnPostLoad_CVS_SCHDETAILS_KERNEL(){
document.getElementById("cmdAddRow_BLK_AMOUNT_SCH_DTLS").style.visibility="hidden";
document.getElementById("cmdDelRow_BLK_AMOUNT_SCH_DTLS").style.visibility="hidden";
return true;
}
//OFCL_14.2.0.0.0_29051928
//Bug#31400838 changes starts
/*
function formatDate(dsDate)
{
 var mb3Date = new MB3Date(dsDate, gDateFormatDSO);
 if (mb3Date.isValidDate()) 
	return mb3Date.getShortDate();
}
*/
//Bug#31400838 changes ends
//OFCL_14.2.0.0.0_29051928
//OFCL_12.3.0.0.0_26612637 changes start

/* function  fnOnClick_BTN_NEXT_VER()
{
	var functionId = 'OLDPMNT';
	var verNo=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value;
	var versionCount=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value;	 
	if(verNo<versionCount)
	{
		verNo++;
		document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo;
		document.getElementById("OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo;
		
		showErrorAlerts('CD-VAL-001',document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value);  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
		
		//alert('Fetching the contract version '+document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value+"...");		
		appendTextFieldValue(getElementsByOjName('VERNO')[0], 1, 'OLVWS_PAYMENT_SUMMARY'); 
		appendTextFieldValue(getElementsByOjName('CURRPMNT')[0], 1, 'OLVWS_PAYMENT_SUMMARY'); 
		appendTextFieldValue(getElementsByOjName("TOTPAMNT")[0],1,'OLVWS_PAYMENT_SUMMARY'); 	
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';
		fcjRequestDOM = buildUBSXml();		
		servletURL = "FCClientHandler";
	     fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);

		if(fcjResponseDOM) 
		{
			 var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			 var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			 var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
			 if (msgStatus == 'SUCCESS')
			 {
				 setDataXML(getXMLString(pureXMLDOM));
				 showData(dbStrRootTableName, 1);				
			 }
			 else if (msgStatus == 'FAILURE')
			 {
				var returnVal = displayResponse(messageNode);
				 //alert('Contract msg failed');
				 showErrorAlerts('IN-HEAR-314');//NLS change -Removal of hardcoded alerts
			 }  
		}		
	}
	else
	{
		//alert('No other versions');
		// 11.3 Retro sfr-12365555 changes <18-APR-2011> starts
		/*showErrorAlerts('IN-HEAR-14
		');//NLS change -Removal of hardcoded alerts
		showErrorAlerts('IN-HEAR-140');//NLS change -Removal of hardcoded alerts
        // 11.3 Retro sfr-12365555 changes <18-APR-2011> ends
	}
} 
*/

/*function  fnOnClick_BTN_PREV_VER()
{
	var verNo=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value;
	var versionCount=document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__TOTPAMNT").value;	 
	if(verNo>0)
	{
		verNo--;
		document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo;
		document.getElementById("OLVWS_PAYMENT_SUMMARY__CURRPMNT").value=verNo;
		
		showErrorAlerts('CD-VAL-001',document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value);  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
		//alert('Fetching the contract version '+document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CURRPMNT").value+"...");		
		appendTextFieldValue(getElementsByOjName('VERNO')[0], 1, 'OLVWS_PAYMENT_SUMMARY'); 
		appendTextFieldValue(getElementsByOjName('CURRPMNT')[0], 1, 'OLVWS_PAYMENT_SUMMARY'); 
		appendTextFieldValue(getElementsByOjName("TOTPAMNT")[0],1,'OLVWS_PAYMENT_SUMMARY'); 
		
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';
		fcjRequestDOM = buildUBSXml();		
		servletURL = "FCClientHandler";
		fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);

		 if(fcjResponseDOM) 
		 {
			 var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			 var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			 var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
			 if (msgStatus == 'SUCCESS')
			 {
				 setDataXML(getXMLString(pureXMLDOM));
				 showData(dbStrRootTableName, 1);				
			 }
			 else if (msgStatus == 'FAILURE')
			 {
				var returnVal = displayResponse(messageNode);
				 //alert('Contract msg failed');
				 showErrorAlerts('IN-HEAR-314');//NLS change -Removal of hardcoded alerts
			 }      
		 }
	}
	else
	{
		showErrorAlerts('IN-HEAR-140');//NLS change -Removal of hardcoded alerts
	}
} */
/* Removed Enable Disable Message_Preview Subsystem Changes :: Starts */
/* //OBCL_14.2.0.0.0_Message_Preview_Changes_Starts
function fnEnableDisableMessagePreviewSubsys() {
	var processList = ['LDPMNT', 'LDREVP'];
    var validCheck = false;
	var unauthFunctionId;
    var pCode = document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value;
    for (var i = 0; i < processList.length; i++) {
        if (pCode == processList[i] && validCheck == false) {
            validCheck = true;
			unauthFunctionId = 'OLDPMNT';
        }
    }
    if (!validCheck) {
		var processCode = pCode.substring(pCode.length - 4);
		if (processCode == 'AMND') {
			unauthFunctionId = 'OLDVAMND';
		} else if (pCode == 'LDREVC' || pCode == 'LDBOOK' || pCode == 'LDCAMD' || pCode == 'LDINIT' || pCode == 'LDROLL' || pCode == 'LDRAMD') {
			unauthFunctionId = 'OLDTRONL';
		} else if (processCode == 'RFND') {
			unauthFunctionId = 'OLDREFND';
		} else if (pCode == 'OLFEE') {
			unauthFunctionId = 'LFDACFIN';
		} else if (pCode == 'LDMSC') {
			unauthFunctionId = 'OLDMSCDT';
		} else {
			unauthFunctionId = pCode;
		}
		var len = document.getElementById("DIVSubSystem").children[0].children.length;
		for (var idx = 0; idx < len; idx++) {
			if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "OLDMSPRV") {
				var messagPreviewLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];
				if (messagPreviewLink == undefined) {
					messagPreviewLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
				}
				if (pCode != "" && unauthFunctionId != 'OLDPMNT') {
					fnDisableSubSysButtons(messagPreviewLink);
				} else if (pCode == "") {
					fnDisableSubSysButtons(messagPreviewLink);
				} else {
					fnEnableSubSysButtons(messagPreviewLink);
				}
			}
		}
	}
    return true;
}
//OBCL_14.2.0.0.0_Message_Preview_Changes_Ends */
/* Removed Enable Disable Message_Preview Subsystem Changes :: Starts */
/* Currency Mapping Changes IN Schedule Breakup Screen :: Starts */
//OBCL_14.3_SUPPORT_BUG#31473456 changes starts
function fnPreLoad_CVS_SCHBREAKUP_KERNEL() {
    screenArgs['CONTRACT_REF'] = document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD").value; //BUG#32606723
    screenArgs['EVENT_SEQ_NO'] = document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__EVENTSEQNO").value;
    screenArgs['CCY'] = document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__CCY").value;
    parent.screenArgs = screenArgs;
    return true;
}

function fnPostLoad_CVS_SCHBREAKUP_KERNEL() {
    document.getElementById("BLK_SCHBREAKUP_HDR__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF'];
    document.getElementById("BLK_SCHBREAKUP_HDR__EVENT_SEQ_NO").value = parent.screenArgs['EVENT_SEQ_NO'];
    document.getElementById("BLK_SCHBREAKUP_HDR__CURRENCY").value = parent.screenArgs['CCY'];
    return true;
}
//OBCL_14.3_SUPPORT_BUG#31473456 changes starts
/* Currency Mapping Changes IN Schedule Breakup Screen :: Ends */