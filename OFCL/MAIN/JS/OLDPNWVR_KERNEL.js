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
**  File Name          : LDDPNWVR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
****************************************************************************************************************************/
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
function FNNEXT(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='NEXT';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function FNPREV() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PREV';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function FNPOPULATE(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='POPULATE';
 fnBackendCall();  
 gAction=gPrevAction;
 return true;
}
function fnPostExecuteQuery_KERNEL(){
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__SP__BTN_PREV'));
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__SP__BTN_NEXT'));
  return true;
}
function fnPostNew_KERNEL() {
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__SP__BTN_PREV'));
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__SP__BTN_NEXT'));
  return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDPNWAU';
    authUixml = 'OLDPNWAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['OLDPNWAU'] = "KERNEL";
    ArrPrntFunc['OLDPNWAU'] = "";
    ArrPrntOrigin['OLDPNWAU'] = "";

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
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERID").value = "";
    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERID").value = "";
	//document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERDTSTAMPI").value = "";
    //document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERDTSTAMPI").value = "";
    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERDTSTAMP").value = ""; //Bug#34958820_REDWOOD_ADOPTION
    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERDTSTAMP").value = ""; //Bug#34958820_REDWOOD_ADOPTION
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end