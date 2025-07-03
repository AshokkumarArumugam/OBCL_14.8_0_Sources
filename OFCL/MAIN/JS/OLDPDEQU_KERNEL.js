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
**  File Name          : MSDPDEQU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
function fnPostExecuteQuery_KERNEL() {
fnEnableElement(document.getElementById('BLK_BRANCH__PDETYPES'));
fnEnableElement(document.getElementById('BLK_BRANCH__PDETYPES2'));
fnEnableElement(document.getElementById('BLK_BRANCH__PDETYPES3'));
fnEnableElement(document.getElementById('BLK_BRANCH__REFRESHBTN'));
fnEnableElement(document.getElementById('BLK_BRANCH__BTNPDE'));
fnEnableElement(document.getElementById('BLK_BRANCH__BTNHOLD'));
fnEnableElement(document.getElementById('BLK_BRANCH__BTNWITHOUTPDE'));
fnEnableElement(document.getElementById('BLK_BRANCH__BTNCANCEL'));
fnEnableElement(document.getElementById('BLK_BRANCH__BTNEXECUTE'));
 return true;
}
function fnPostNew_KERNEL(){
document.getElementById("Save").style.visibility = "hidden";
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
function fnPDEQuery(){
appendData(); 	
fcjRequestDOM = buildUBSXml();
gAction='PDQUERY';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnPostLoad_CVS_MSVWMSG_KERNEL(){
appendData(); 	
gPrevAction=gAction;
gAction='VWMESG';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnrefresh() {
 appendData();
 gPrevAction=gAction;
 gAction='REFRESH';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnhold() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PDEHOLD';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnpde() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='PDE';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnwithoutpde() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='WPDE';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fncancel() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='CANCEL';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
