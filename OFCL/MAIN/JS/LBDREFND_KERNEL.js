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
**  File Name          : LBDREFND_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
****************************************************************************************************************************/
var gPrevAction;
function fnFetch() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='FETCH';
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
function fnPopulate() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='POPULATE';
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
  fnEnableElement(document.getElementById('BLK_LBTB_PR_MASTER__BTN_PREV_VER'));
  fnEnableElement(document.getElementById('BLK_LBTB_PR_MASTER__BTN_NEXT_VER'));
  return true;
}
function fnPostNew_KERNEL() {
  fnDisableElement(document.getElementById('BLK_LBTB_PR_MASTER__BTN_PREV_VER'));
  fnDisableElement(document.getElementById('BLK_LBTB_PR_MASTER__BTN_NEXT_VER'));
  fnDisableElement(document.getElementById('cmdAddRow_BLK_LBTB_PR_DETAIL'));
  fnDisableElement(document.getElementById('cmdDelRow_BLK_LBTB_PR_DETAIL'));
  fnDisableElement(document.getElementById('cmdAddRow_BLK_LBTB_PR_AMOUNT_PAID'));
  fnDisableElement(document.getElementById('cmdDelRow_BLK_LBTB_PR_AMOUNT_PAID'));
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
    authFunction   = 'LBDREFAU';
    authUixml      = 'LBDREFAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDREFAU']="KERNEL";
    ArrPrntFunc['LBDREFAU'] = "";
    ArrPrntOrigin['LBDREFAU'] ="";
    //screenArgs['CCY'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTCCY').value;
    return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CCY'] = document.getElementById('BLK_LBTB_PR_MASTER__CONTCCY').value;
    screenArgs['CONREF'] = document.getElementById('BLK_LBTB_PR_MASTER__CONTRACTREFNO').value;
    screenArgs['COUNTERPART'] = document.getElementById('BLK_LBTB_PR_MASTER__COUNTERPARTY').value;
    return true;
}
