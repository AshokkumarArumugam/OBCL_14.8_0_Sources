/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadNotifyTrg.js
  **
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/
var ua = navigator.userAgent.toLowerCase();
var g_Save_Dir = "";

function fnLnchGenForTrg(act) {
    ntfyTrgAction = act;
    loadSubScreenDIV("ChildWin", "RadGenerate.jsp");
}

function fnEnableGenBtns() {
    document.getElementById('TRG_GenFiles').disabled = false;
    document.getElementById('TRG_GenFiles').className = "BUTTONToolbar";
    document.getElementById('TRG_depFiles').disabled = false;
    document.getElementById('TRG_depFiles').className = "BUTTONToolbar";
    document.getElementById('TRG_chekinFiles').disabled = false;
    document.getElementById('TRG_chekinFiles').className = "BUTTONToolbar";
}

function fnDisableGenBtns() {
    document.getElementById('TRG_GenFiles').disabled = true;
    document.getElementById('TRG_GenFiles').className = "BUTTONToolbarD";
    document.getElementById('TRG_depFiles').disabled = true;
    document.getElementById('TRG_depFiles').className = "BUTTONToolbarD";
    document.getElementById('TRG_chekinFiles').disabled = true;
    document.getElementById('TRG_chekinFiles').className = "BUTTONToolbarD";

}

function fnSave_RDDNFTRG(val, radReqDOM, operation) {
    parent.gAction = "GENERATE";
    parent.gReqType = "GEN";
    parent.gReqCode = parent.gAction;
    var savePath = "";
    g_Save_Dir = parent.g_Wrk_Dir;
    //var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("TRIGGER_CODE");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/TRIGGER_CODE"), document.getElementById("GWTM_NOTIFICATION_TRIGGERS.TRIGGER_CODE").value);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("TRIGGER_DESC");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/TRIGGER_DESC"), document.getElementById("GWTM_NOTIFICATION_TRIGGERS.TRIGGER_DESCRIPTION").value);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("BASE_TABLE");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/BASE_TABLE"), document.getElementById("GWTM_NOTIFICATION_TRIGGERS.BASE_TABLE").value);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("PK_COL_LIST");
    bodyNode.appendChild(tempNode);
    var pkcls = document.getElementById("TRG_PK_COLS").value;
    pkcls = ReplaceAll(pkcls, "~", "!");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/PK_COL_LIST"), pkcls);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("PK_COL_DTYP_LIST");
    bodyNode.appendChild(tempNode);
    var pkDtTyp = document.getElementById("TRG_PK_TYPES").value;
    pkDtTyp = ReplaceAll(pkDtTyp, "~", "!");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/PK_COL_DTYP_LIST"), pkDtTyp);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("COLUMNS_TO_BE_TRACKED");
    bodyNode.appendChild(tempNode);
    var clmtbTrcd = document.getElementById("COLUMNS_TO_BE_TRACKED").value;
    clmtbTrcd = ReplaceAll(clmtbTrcd, "~", "!");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/COLUMNS_TO_BE_TRACKED"), clmtbTrcd);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("TRACKED_COLUMN_DATA_TYPES");
    bodyNode.appendChild(tempNode);

    var trckdClDtp = document.getElementById("TRACKED_COLUMN_DATA_TYPES").value;
    trckdClDtp = ReplaceAll(trckdClDtp, "~", "!");

    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/TRACKED_COLUMN_DATA_TYPES"), trckdClDtp);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("TRIGGER_WHEN_CLAUSE");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/TRIGGER_WHEN_CLAUSE"), document.getElementById("GWTM_NOTIFICATION_TRIGGERS.TRIGGER_WHEN_CLAUSE").value);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("NOTIFICATION_CODES");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/NOTIFICATION_CODES"), document.getElementById("GWTM_NOTIFICATION_TRIGGERS.NOTIFICATION_CODES").value);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("SPECIFIC_TRIGGEER");
    bodyNode.appendChild(tempNode);
    var speciValue = "N"
    if (document.getElementById("SPFC_TRIGGER").checked) {
        speciValue = "Y"
    }
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/SPECIFIC_TRIGGEER"), speciValue);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("FIRING_TIME");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/FIRING_TIME"), document.getElementById("GWTM_NOTIFICATION_TRIGGERS.FIRING_TIME").value);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("EACH_RECORD");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/EACH_RECORD"), document.getElementById("GWTM_NOTIFICATION_TRIGGERS.EACH_RECORD").value);

    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation);
    var tempNode = radReqDOM.createElement("TRIGGER_LOGIC");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + operation + "/TRIGGER_LOGIC"), "<![CDATA[" + document.getElementById("GWTM_NOTIFICATION_TRIGGERS.TRIGGER_LOGIC").value + "]]>");

    var radxml = "<RAD_FUNCTIONS ID='1' Type='SINGLE'>"
    radxml += "<FUNCTION_ID>" + document.getElementById('GWTM_NOTIFICATION_TRIGGERS.TRIGGER_CODE').value + "</FUNCTION_ID><FUNCTION_CATEGORY>NOTIFICATIONTRIGGER</FUNCTION_CATEGORY>"
    radxml += "<FUNCTION_TYPE>P</FUNCTION_TYPE><FOOTER_TEMPLATE>NONE</FOOTER_TEMPLATE>"
    radxml += "<PARENT_FUNC_ID /><FUNCTION_ORIGIN>KERNEL</FUNCTION_ORIGIN><PARENT_ORIGIN /> "
    radxml += "<ACTION>LOAD</ACTION><GEN_ALL>N</GEN_ALL>"
    radxml += "<RELEASE_TYPE>KERNEL</RELEASE_TYPE><HEADER_TEMPLATE />"
    radxml += "<CALL_FORM_TYPE>DATA</CALL_FORM_TYPE><LANG_CODE>" + parent.lang + "</LANG_CODE>"
    radxml += "<OPERATION>" + operation + "</OPERATION><ORIGINATION_DATE /> "
    radxml += "<USER_ID>" + parent.username + "</USER_ID><RELEASE_CODE>" + parent.relCode + "</RELEASE_CODE> "
    radxml += "<SFR_NO /><CHECKIN_MODE /><SUB_PROJECT/><DDL_REMARKS/><SITE_CODE /><ENV_CODE>" + parent.envCode + "</ENV_CODE> "
    radxml += "<PARENT_MODULE_ID></PARENT_MODULE_ID>"
    radxml += "<RAD_KERNEL></RAD_KERNEL></RAD_FUNCTIONS>";

    if (operation == "RELEASE") {

        var chkIndx = document.getElementById("CHK_MD").options.selectedIndex;
        var chkInVal = document.getElementById("CHK_MD").options[chkIndx].value;
        setNodeText(selectSingleNode(radxml, "//CHECKIN_MODE"), chkInVal);
        setNodeText(selectSingleNode(radxml, "//SITE_CODE"), document.getElementById("SITE_CD").value);
        setNodeText(selectSingleNode(radxml, "//SFR_NO"), document.getElementById("SFR_NO").value);
    }

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + radxml, "RADClientHandler");

    if (response != null) {
        // parent.fnSplitFiles(response,g_Save_Dir,parent.operMode);				
        var files = response.split("--##FILE##--");
        var error = "";

    }
    if (parent.gfnPostStatus != "F") {
        var wres = parent.fnwritedata(response, parent.saveformat);
    }
    return files[files.length - 1];
}

function ReplaceAll(Source, stringToFind, stringToReplace) {

    var temp = Source;

    var index = temp.indexOf(stringToFind);

    while (index !=  - 1) {
        temp = temp.replace(stringToFind, stringToReplace);

        index = temp.indexOf(stringToFind);

    }

    return temp;

}

function fnbasetablepopulate(tab) {
    /* for fetch columns from teh table selected   */
    try {
        var tabname = tab.parentElement.getElementsByTagName('INPUT')[0].value;
    }
    catch (e) {
        var tabname = tab;
    }

    var tabn = fnbasetablecheck(tabname);
    if (tabn != "") {
        tabname = tabn;
    }
    var queryString = "STTB_PK_COLS";
	//var queryString = "FETCH@SELECT COLUMN_lIST,DATA_TYPE_LIST FROM sttb_pk_cols  WHERE TABLE_NAME ='" + tabname + "'";
    var WhereString = "WHERE TABLE_NAME ='" + tabname + "'";
	parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    if (multRec.length >= 2) {
        var result = multRec[0].split("~~~");
        result[0] = result[0].substr(1);
        result[1] = result[1].substring(0, result[1].length - 1);
        document.getElementById("TRG_PK_COLS").value = result[0];
        document.getElementById("TRG_PK_TYPES").value = result[1];

    }
    else {
        alertMessage("Enter a valid table", "E");
        return;
    }

}

function fnbasetablecheck(tablename) {
    /* for check if  the table is synonym or not  */
    var queryString = "USERSYNONYMS";
	//var queryString = "FETCH@SELECT TABLE_NAME FROM USER_SYNONYMS WHERE SYNONYM_NAME='" + tablename + "'";
	var WhereString = "WHERE SYNONYM_NAME='" + tablename + "'";
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    return multRec[0];
}

function FnTriggerEvnt(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (evnt.shiftKey == true && evnt.keyCode == 9) {
        if (srcElement.id == "RADTRIGGCLOSE") {
            document.getElementById("GWTM_NOTIFICATION_TRIGGERS.TRIGGER_LOGIC").focus();
            fnDisableBrowserKey(e);
            preventpropagate(e);
            return;
        }

    }
    else if (evnt.keyCode == 9 && evnt.shiftKey != true) {
        if (srcElement.id == "GWTM_NOTIFICATION_TRIGGERS.TRIGGER_LOGIC") {
            document.getElementById("RADTRIGGCLOSE").focus();
            fnDisableBrowserKey(e);
            preventpropagate(e);
            return;
        }
    }
    else if (evnt.keyCode == 120) {
        if (srcElement.tagName == "INPUT" && srcElement.type.toUpperCase() == 'TEXT') {
            if (typeof (srcElement.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
                srcElement.parentNode.getElementsByTagName("BUTTON")[0].click();
            }
        }
    }
    else if (evnt.keyCode == 113) {
        parent.switchWindows();
        fnDisableBrowserKey(evnt);
        disableCommonKeys(evnt);
        return;
    }
    else if (evnt.ctrlKey == true && evnt.keyCode == 87) {
        fnRADExitAll(seqNo, evnt);
        disableCommonKeys(evnt);
        return;
    }
    else if (evnt.keyCode == 9 && evnt.shiftKey == true || (evnt.keyCode == 13) || (evnt.keyCode == 32) || (evnt.keyCode == 123) || (evnt.keyCode == 9)) {
    }
    else if ((evnt.keyCode == 37 && evnt.altKey == true) || (evnt.keyCode == 36 && evnt.altKey == true)) {
        fnDisableBrowserKey(e);
        disableCommonKeys(evnt);
        return;
    }
    else {
        disableCommonKeys(evnt);
        return;
    }
}