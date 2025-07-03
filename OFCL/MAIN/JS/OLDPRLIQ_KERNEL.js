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
**  File Name          : LDDPRLIQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

	**Changed By         : Chandra Achuta
	**Date               : 23-MAR-2021
	**Change Description : Added code for working of page version.
	**Search String      : Bug#32666702
****************************************************************************************************************************/
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
function FNPOPULATE() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='POPULATE';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function FNNEXT(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='NEXT';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function FNPREV(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PREV';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnPostExecuteQuery_KERNEL(){
  //Bug#32666702  Changes Starts
  //fnEnableElement(document.getElementById('BLK_CSTBS_CONTRACT_PAYREC__BTN_PREV'));
  //fnEnableElement(document.getElementById('BLK_CSTBS_CONTRACT_PAYREC__BTN_NEXT'));
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_PREV'));
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_NEXT'));
  //Bug#32666702  Changes Ends
  return true;
}
function fnPostNew_KERNEL() {
  //Bug#32666702  Changes Starts	
  //fnDisableElement(document.getElementById('BLK_CSTBS_CONTRACT_PAYREC__BTN_PREV'));
  //fnDisableElement(document.getElementById('BLK_CSTBS_CONTRACT_PAYREC__BTN_NEXT'));
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_PREV'));
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_NEXT')); 
  //Bug#32666702  Changes Ends  
  return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDPRLAU';
    authUixml = 'OLDPRLAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['OLDPRLAU'] = "KERNEL";
    ArrPrntFunc['OLDPRLAU'] = "";
    ArrPrntOrigin['OLDPRLAU'] = "";

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
