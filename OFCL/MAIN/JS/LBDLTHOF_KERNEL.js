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
**  File Name          : LBDLTHOF_KERNEL.js
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
fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_RUN'));
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

/*function fnrun() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction= 'RUN';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}*/
/*function fnrerun(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='RUNNING';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}*/
function fnrerun(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='RUNNING';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}