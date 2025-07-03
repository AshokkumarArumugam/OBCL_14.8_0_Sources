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
**  File Name          : LDDXLUPD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Commented the mainWin.AppDate assignment for BOOKDATEI
**Search String      : Bug#31400838 
****************************************************************************************************************************/
function fn_browse(evnt) {
    try {
        var batch_no = document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO").value;
        var book_date = document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value;
        if ((batch_no != "") && (book_date != "")) {
            mask();
            loadSubScreenDIV("ChildWin", "LDUpload.jsp?actionType=UPLOAD&functionId=LDDXLUPD&filePathField=BLK_OLTBS_UPLOAD_XLDTLS__XL_PATH&batch_no=" + batch_no + "&book_date=" + book_date + "");
        }
    }
    catch (e) {
        alert(scriptError);
    }
}

function fnPostNew_KERNEL() {
    disableForm();
    fn_default();
    if (document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value == "" || document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value == null) {
        document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value = mainWin.AppDate;
        fireHTMLEvent(document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE"), "onpropertychange");
		//document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value = mainWin.AppDate; //Bug#31400838
    }
    return true;
}

function fnCallBackEnd(action) {
    if (gAction) {
        var prevAction = gAction;
        gAction = action;
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        showProcessMsg = false;
        var l_resp_code = fnProcessResponse();
        gAction = prevAction;
        return l_resp_code;
    }
    return false;
}
function fn_default(){
    var resp = fnCallBackEnd("DEFAULT");
    var l_batch_no = document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO").value;
    if (resp != 'SUCCESS' || !l_batch_no) {
        fnEnableElement(document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO"));
        if (document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value == "" || document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value == null) {
            document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value = mainWin.AppDate;
            fireHTMLEvent(document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE"), "onpropertychange");
	 // document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value = mainWin.AppDate;//Bug#31400838
        }
        var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        return true;
    }
    else{
        fnDisableElement(document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO"));
        if (document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value == "" || document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value == null ) {
            document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value = mainWin.AppDate;
            fireHTMLEvent(document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE"), "onpropertychange");
		 // document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE").value = mainWin.AppDate;//Bug#31400838 

        }
        fnEnableElement(document.getElementById("BLK_OLTBS_UPLOAD_XLDTLS__BTN_BROWSE"));    
    }
    return true;
}
function fn_populate(){
    var gPrevAction = gAction;
    gAction = 'EXECUTEQUERY';
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
function fn_delete(){
    var gPrevAction = gAction;
    gAction = 'DELETE';
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
