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
**  File Name          : TLDSWPBW_KERNEL.js
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
fnEnableElement(document.getElementById('BLK_OLTBS_LT_SWAPALLOC_MASTER_AL__BTN_UPLOAD'));
fnEnableElement(document.getElementById('BLK_OLTBS_LT_SWAPALLOC_MASTER_AL__BTN_REJECT'));
fnEnableElement(document.getElementById('BLK_OLTBS_LT_SWAPALLOC_MASTER_AL__BRN_REP'));


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
    } else if (msgStatus == "SUCCESS") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    }   
}
function fnuplod(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='UPLD';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}

function fnsend(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='REPLY';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnrejet(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='REJET';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}

