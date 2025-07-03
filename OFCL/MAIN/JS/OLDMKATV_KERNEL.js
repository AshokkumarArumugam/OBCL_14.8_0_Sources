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
**  File Name          : OLDMKATV_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  
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
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDATAUT';
    authUixml = 'OLDATAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['OLDATAUT'] = "KERNEL";
    ArrPrntFunc['OLDATAUT'] = "";
    ArrPrntOrigin['OLDATAUT'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	
	EnableDisableAuthBtn(); 
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_CSTBS_CONTRACTEVENTLOG__AUTHSTATUS").value == "A")
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
  if (document.getElementById("BLK_CSTBS_CONTRACTEVENTLOG__AUTHSTATUS").value == "U")
{
EnableToolbar_buttons("Authorize");
}
return true;
}
function fnPostExecuteQuery_KERNEL(){
  EnableDisableAuthBtn();
  
  return true;
}

function fnPostSave_KERNEL(){

  EnableDisableAuthBtn();
  
  return true;
}
function fnPostDelete_KERNEL(){

  EnableDisableAuthBtn();
  
  return true;
}
