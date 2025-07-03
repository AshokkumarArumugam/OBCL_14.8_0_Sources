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
**  File Name          : OLDGPROS_KERNEL.js
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
fnEnableElement(document.getElementById('BLK_OLTBS_BG_STATUS__BTN_REFRESH'));
//fnEnableElement(document.getElementById('BLK_OLTBS_BG_STATUS___AL__STATUS'));
 //var len =getTableObjForBlock("BLK_OLTBS_BG_STATUS").tBodies[0].rows.length;
 for (var i = 0; i < getElementsByOjName("STATUS").length; i++){
getElementsByOjName("STATUS")[i].disabled = false;
 }
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

function fnrefresh() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='REFRESH';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnlist() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='ONLIST';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
/*
fnPostExecuteQuery_KERNEL() {     
    var length = selectNodes(dbDataDOM,"//BLK_OLTBS_BG_STATUS___AL").length ;
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){        
        for (var i=0;i<length;i++){         
            fnEnableElement(getElementsByOjName("BLK_OLTBS_BG_STATUS___AL__STATUS")[i]);
        }
    }
    document.getElementById("BTN_SINGLE_VIEW_BLK_OLTBS_BG_STATUS___AL__STATUS").className ="hidden";
    return true;
}*/
