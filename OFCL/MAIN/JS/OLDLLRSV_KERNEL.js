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
**  Written by         : K.PRIYADARSHINI
**  Date of creation   : 27.5.2016
**  File Name          : LDDLLRSV_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Asigning mainWin.AppDate to format the date as per user preference 
**Search String      : Bug#31400838

**Changed By         : Abhinav Bhasker
**Date               : 18-Oct-2022
**Change Description : Disable Delete and Authorize buttons if Contract Status is "L" Liquidated
**Search String      : Bug#34706450

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Full Version       : 
**  Reason             : Bug#34958820_REDWOOD_ADOPTION
****************************************************************************************************************************/
//Bug#34706450 Start
/*
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_FOOTER__AUTHSTATUSUI").value == "Authorised")
{
DisableToolbar_buttons("Authorize");
}
  if (document.getElementById("BLK_FOOTER__AUTHSTATUSUI").value == "Unauthorised")
{
EnableToolbar_buttons("Authorize");
}
return true;
}
*/
function EnableDisableAuthBtn()
{
 if (document.getElementById("BLK_OLTBS_CONTRACT__CONTRACTSTATUS").value == "L")
  {
	DisableToolbar_buttons("Authorize");
	DisableToolbar_buttons("Delete");
  } else {	
	  if (document.getElementById("BLK_FOOTER__AUTHSTATUSUI").value == "A")
		{
			DisableToolbar_buttons("Authorize");
		}
	  if (document.getElementById("BLK_FOOTER__AUTHSTATUSUI").value == "U")
		{
			EnableToolbar_buttons("Authorize");
		}
  }
return true;
}
//Bug#34706450 End
function fnPostLoad_KERNEL(){
	EnableDisableAuthBtn();
	return true;
}
function fnPostExecuteQuery_KERNEL(){
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
  EnableDisableAuthBtn();
  return true;
}


 
function fnPostNew_KERNEL() {
  fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
  fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
  // OBCL_14.3_Support_Bug#31400838  changes starts
  document.getElementById("BLK_CONTRACT_RESERVE__VALUEDATE").value = mainWin.AppDate;	//Bug#31400838
  fireHTMLEvent(document.getElementById("BLK_CONTRACT_RESERVE__VALUEDATE"),"onpropertychange"); 
  document.getElementById("BLK_OLVWS_CONTRACT_RESERVE_SUMMARY__VALUEDATE").value = mainWin.AppDate;	
  fireHTMLEvent(document.getElementById("BLK_CONTRACT_RESERVE__VALUEDATE"),"onpropertychange"); 
    // OBCL_14.3_Support_Bug#31400838  changes ends
  return true;
}

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
function fnOnClick_BTN_NEXT() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='NEXT';
 fnBackendCall();
EnableDisableAuthBtn();
 gAction=gPrevAction;
 return true;
}
function fnOnClick_BTN_PREV() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PREV';
 fnBackendCall();
EnableDisableAuthBtn();
 gAction=gPrevAction;
 return true;
}

function fnPreAuthorize_KERNEL() {
    authFunction   = 'OLDLRAUT';
    authUixml      = 'OLDLRAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDLRAUT']="KERNEL";
    ArrPrntFunc['OLDLRAUT'] = "";
    ArrPrntOrigin['OLDLRAUT'] ="";
    return true;
}

function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
}
function fnPostSave_KERNEL() {
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
EnableDisableAuthBtn();
  return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	document.getElementById("BLK_FOOTER__MAKERID").value = "";
    document.getElementById("BLK_FOOTER__CHECKERID").value = "";
	//Bug#34958820_REDWOOD_ADOPTION starts 
    //document.getElementById("BLK_FOOTER__MAKERDTSTAMPI").value = "";
    //document.getElementById("BLK_FOOTER__CHECKERDTSTAMPI").value = "";
    document.getElementById("BLK_FOOTER__MAKERDTSTAMP").value = "";
    document.getElementById("BLK_FOOTER__CHECKERDTSTAMP").value = "";
	//Bug#34958820_REDWOOD_ADOPTION ends 
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end