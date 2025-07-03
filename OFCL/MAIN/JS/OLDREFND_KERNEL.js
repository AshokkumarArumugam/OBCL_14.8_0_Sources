/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLDREFND_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
****************************************************************************************************************************/
var gPrevAction;
function FNCOMPPICKUP() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='COMPPKP';
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
 gAction=gPrevAction;
 return true;
}
function fnPostExecuteQuery_KERNEL(){
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_PREV_VER'));
  fnEnableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_NEXT_VER'));
  return true;
}
function fnPostNew_KERNEL() {
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_PREV_VER'));
  fnDisableElement(document.getElementById('BLK_OLTBS_CONTRACT__BTN_NEXT_VER'));
  return true;
}

function FNONCLICK_BTN_NEXT() {
gPrevAction = gAction;
gAction = 'NEXT';
appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    
     gAction = gPrevAction;
    return true;
}
function FNONCLICK_BTN_PREV() {
gPrevAction = gAction;
gAction = 'PREV';
appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    
     gAction = gPrevAction;
    return true;
}

function fnPreAuthorize_KERNEL() {
    authFunction   = 'OLDREFAU';
    authUixml      = 'OLDREFAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDREFAU']="KERNEL";
    ArrPrntFunc['OLDREFAU'] = "";
    ArrPrntOrigin['OLDREFAU'] ="";
    //screenArgs['CCY'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTCCY').value;
    return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CCY'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTCCY').value;
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONREFNO').value;
    screenArgs['COUNTERPART'] = document.getElementById('BLK_OLTBS_CONTRACT__COUNTERPARTY').value;
    return true;
}
