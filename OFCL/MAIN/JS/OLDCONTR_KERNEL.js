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
**  File Name          : LDDCONTR_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Neeraj.krishna
**  Last modified on   : 21-NOV-2016
**  Version			   : OFCL_12.3.0.0.0
**  Reason             : The function names FNNEXT,FNPREV,FNPOPULATE have to be in capitals as defined in RAD.
**  Last Modified By   : k.PRIYADARSHINI
**  Last modified on   : 02-DEC-2016
**  Version			   : OFCL_12.3.0.0.0
**  Reason             : Added EnableDisableAuthBtn()
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_EVENT_LOG__AUTHSTATUS").value == "A")
{
DisableToolbar_buttons("Authorize");
}
  if (document.getElementById("BLK_EVENT_LOG__AUTHSTATUS").value == "U")
{
EnableToolbar_buttons("Authorize");
}
return true;
}
function fnPostLoad_KERNEL(){
	EnableDisableAuthBtn();
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
}
function FNNEXT() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='NEXT';
 fnBackendCall();
 EnableDisableAuthBtn();
 gAction=gPrevAction;
 return true;
}
function FNPREV() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PREV';
 fnBackendCall();
 EnableDisableAuthBtn();
 gAction=gPrevAction;
 return true;
}
function FNPOPULATE() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='POPULATE';
 fnBackendCall();  
 EnableDisableAuthBtn();
 gAction=gPrevAction;
 return true;
}
function fnPostExecuteQuery_KERNEL(){
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_PREV'));
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_NEXT'));
  EnableDisableAuthBtn();
  return true;
}
function fnPostNew_KERNEL() {
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_PREV'));
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_NEXT'));
  return true;
}
function fnPreAuthorize_KERNEL() {
    authFunction   = 'OLDCBAUT';
    authUixml      = 'OLDCBAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDCBAUT']="KERNEL";
    ArrPrntFunc['OLDCBAUT'] = "";
    ArrPrntOrigin['OLDCBAUT'] ="";
    return true;
}
function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
    //setDataXML(getXMLString(pureXMLDOM));
   // showData(dbStrRootTableName, 1);
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
}
function fnPostSave_KERNEL() {
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
EnableDisableAuthBtn();
  return true;
}