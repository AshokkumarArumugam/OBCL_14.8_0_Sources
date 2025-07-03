/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadNotify.js
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

var EleNtfyArray = new Array();
var curFrm = "";
var prevFrm = "";
var ntfylogMsg = "";
var fileNames = new Array();
var ntfyAction = "";
var roleRights = parent.groleRights;
var frntndFiles = "";
var notifyDOM = createHTTPActiveXObject();
//vinit
EleNtfyArray['NOTIFY_DTLS'] = "TYPE_XSD~FS_RES_XSD~PK_RES_XSD~FC_FUNCTION_ROUTING~NOTIFICATION_CODE~NOTIFICATION_DESC~NOTIFICATION_XSD~NOTIFICATION_MODULE~NOTIFICATION_MODULEDESC~BASE_TABLE~FULL_SCREEN_RESPONSE~OPERATION~GATEWAY_SERVICE~GATEWAY_OPERATION~GATEWAY_IO_REQUEST_NODE~FILTER_TYPE~HO_ONLY~SPECIFIC_NOTIFICATION~FILTERLOGIC~PK_COLS~PK_TYPES";
EleNtfyArray['WEBSER_TAGS'] = "ORDER~XSD_FIELD~TABLE_FIELD~DATA_TYPE~MAX_LENGTH";

function createDOM() {

    var ntfyDOM = "";
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = dataXML + "<RAD_FUNCTIONS><FUNCTION_ID/><FUNCTION_TYPE/><FUNCTION_CATEGORY/><FUNCTION_ORIGIN/><PARENT_FUNC_ID/><PARENT_ORIGIN/><HEADER_TEMPLATE/><FOOTER_TEMPLATE/><ACTION/><GEN_ALL/><RELEASE_TYPE/><CALL_FORM_TYPE/><LANG_CODE/><OPERATION/><ORIGINATION_DATE/><USER_ID/><RELEASE_CODE/><SFR_NO/><SUB_PROJECT/><DDL_REMARKS/><CHECKIN_MODE/><SITE_CODE/><ENV_CODE/><RAD_KERNEL/></RAD_FUNCTIONS>";
    ntfyDOM = loadXMLDoc(dataXML);
    notifyDOM = ntfyDOM;
    var rootnde = selectSingleNode(ntfyDOM, "//RAD_FUNCTIONS/RAD_KERNEL");
    var ndeElement = notifyDOM.createElement("RAD_NOTIFICATIONS");
    rootnde.appendChild(ndeElement);
    var nodeArray = new Array();
    nodeArray = EleNtfyArray['NOTIFY_DTLS'].split("~");
    for (var i = 0;i < nodeArray.length;i++) {
        var NtfyDtls = ntfyDOM.createElement(nodeArray[i]);
        ndeElement.appendChild(NtfyDtls);
    }
    notifyDOM = ntfyDOM;
    appendHdrData();
}

function appendHdrData() {
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/FUNCTION_ID"), document.getElementById("NOTIFICATION_FUNCTION").value);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"), "NOTIFICATION");
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"), parent.relType);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/RELEASE_TYPE"), parent.relType);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/LANG_CODE"), parent.lang);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/RELEASE_CODE"), parent.relCode);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/ORIGINATION_DATE"), parent.originDate);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/USER_ID"), parent.username);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/ENV_CODE"), parent.envCode);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/ACTION"), document.getElementById("NTFY_ACTION").value);
    setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/OPERATION"), ntfyAction);
    if (document.getElementById("NTFY_GEN_ALL").checked == true) {
        setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/GEN_ALL"), "Y");
    }
    else {
        setNodeText(selectSingleNode(notifyDOM, "//RAD_FUNCTIONS/GEN_ALL"), "N");
    }
}

function loadNtfyRad(fName) {

    if (fName.charAt(2) != 'N') {
        alertMessage("Please load the correct RAD XML file ..", "E");
        return;
    }

    var xml2 = loadxmldata;

    if (!xml2) {
        return false;
    }
    if (xml2.indexOf("RAD_FUNCTIONS") ==  - 1) {
        alertMessage("Load Valid RAD xml File...", "E");
        reloadNtfyForm();
        return false;
    }
    NewDOM = loadXMLDoc(xml2);
    notifyDOM = NewDOM;
    if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL").length > 0) {
        if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS").length > 0) {
            document.getElementById("NOTIFICATION_FUNCTION").value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ID"));
            document.getElementById("LBL_NTFY_LOAD_XML").innerText = "Save Xml Path";
            document.getElementById("NTFY_FILE_SAVE_PATH").style.visibility = "visible";
            document.getElementById("NTFY_LOAD_SCREEN_XML").style.visibility = "hidden";
            document.getElementById("NTFY_FILE_SAVE_PATH").disabled = true;
            document.getElementById("NTFY_FILE_SAVE_PATH").value = document.getElementById("NTFY_LOAD_SCREEN_XML").value;
            document.getElementById("NTFY_ACTION").disabled = true;
            if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/GEN_ALL")) == "Y") {
                document.getElementById("NTFY_GEN_ALL").checked = true;
            }
            else {
                document.getElementById("NTFY_GEN_ALL").checked = false;
            }
            document.getElementById("save").className = "BUTTONToolbar";
            document.getElementById("save").disabled = false;
            document.getElementById("genFiles").className = "BUTTONToolbar";
            document.getElementById("genFiles").disabled = false;
            document.getElementById("depFiles").className = "BUTTONToolbar";
            document.getElementById("depFiles").disabled = false;
            document.getElementById("chekinFiles").className = "BUTTONToolbar";
            document.getElementById("chekinFiles").disabled = false;
            document.getElementById("close").className = "BUTTONToolbar";
            document.getElementById("close").disabled = false;
            document.getElementById("exit").className = "BUTTONToolbarD";
            document.getElementById("exit").disabled = true;

            TempActionsOnLoad(notifyDOM);
            var elelen = new Array();
            elelen = EleNtfyArray['NOTIFY_DTLS'].split("~");
            if (selectSingleNode(selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS")[0], "PK_COLS") == null) {
                var amndElmt = notifyDOM.createElement("PK_COLS");
                selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS")[0].appendChild(amndElmt);
            }
            if (selectSingleNode(selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS")[0], "PK_TYPES") == null) {
                var amndElmt = notifyDOM.createElement("PK_TYPES");
                selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS")[0].appendChild(amndElmt);
            }
            for (var i = 0;i < elelen.length;i++) {
                if (elelen[i] == "FULL_SCREEN_RESPONSE") {

                    if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i])) == "Y") {
                        document.getElementById(elelen[i]).checked = true;
                    }
                    else if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i])) == "N") {
                        document.getElementById(elelen[i]).checked = false;
                    }
                }
                else if (elelen[i] == "HO_ONLY") {

                    if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i])) == "Y") {
                        document.getElementById(elelen[i]).checked = true;
                    }
                    else if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i])) == "N") {
                        document.getElementById(elelen[i]).checked = false;
                    }
                }
				//vinit
				 else if (elelen[i] == "SPECIFIC_NOTIFICATION") {

                    if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i])) == "Y") {
                        document.getElementById(elelen[i]).checked = true;
                    }
                    else if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i])) == "N") {
                        document.getElementById(elelen[i]).checked = false;
                    }
                }
                else {
                    document.getElementById(elelen[i]).value = getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]));
                }

            }

            var ntfmxlen = selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/WEBSERVICE_TAGS");
            for (var sml = 0;sml < ntfmxlen.length;sml++) {

                if (selectSingleNode(ntfmxlen[sml], "MAX_LENGTH") == null) {
                    var lname = notifyDOM.createElement("MAX_LENGTH");
                    ntfmxlen[sml].appendChild(lname);
                    setNodeText(selectSingleNode(ntfmxlen[sml], "MAX_LENGTH"), "");
                }
            }

            for (var mlt = 0;mlt < selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/WEBSERVICE_TAGS").length;mlt++) {
                addNewRow1('wbsrvtgs');
                var webSrvcTags = EleNtfyArray['WEBSER_TAGS'].split("~");
                for (var cln = 0;cln < webSrvcTags.length;cln++) {
                    document.getElementById('wbsrvtgs').tBodies[0].rows[mlt].cells[cln + 1].getElementsByTagName('INPUT')[0].value = getNodeText(selectSingleNode(selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/WEBSERVICE_TAGS")[mlt], webSrvcTags[cln]));
                }

            }

            enAbleNodes();
            //fn_notxsdformat();
        }
        else {
            alertMessage("Load Valid Radxml...", "E");
            reloadNtfyForm();
            return false;
        }
    }
}

function fnNtfyActions() {

    if (document.getElementById("NTFY_ACTION").value == "LOAD") {
        fngetReadMode("SINGLE");

        document.getElementsByName("NTFY_LOAD_SCREEN_XML")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].disabled = false;
        document.getElementsByName("NTFY_FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("NTFY_LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSE")[0].style.visibility = "visible";
        document.getElementsByName("NTFY_FILE_SAVE_PATH")[0].style.visibility = "visible";
        setInnerText((document.getElementsByName("LBL_LOAD_XML")), "Load Screen Xml");
        document.getElementById("LBL_NTFY_LOAD_XML").innerText = "Load Screen Xml";
        document.getElementById("NOTIFICATION_FUNCTION").disabled = true;
        document.getElementById("NTFY_GEN_ALL").disabled = false;
        document.getElementById('BTN_DESC_POPUP').style.visibitly = "hidden";
        document.getElementById('BTN_BASE_TABLE').style.visibitly = "hidden";
        document.getElementById('BTN_SERVICE_NAME').style.visibility = "hidden";
        document.getElementById('BTN_OPERATION_CODE').style.visibitly = "hidden";
        document.getElementById('BTN_NTFY_MODULE').style.visibility = "hidden";
        document.getElementById('BTN_MODULEDESC_POPUP').style.visibitly = "hidden";
        disAbleNodes();
        fnAllowedOperations('RDDNOTIF');

    }
    else if (document.getElementById("NTFY_ACTION").value == "NEW" && roleRights.charAt(1) == '1') {
        document.getElementById("LBL_NTFY_LOAD_XML").innerText = "Save XML Path";
        document.getElementById("NTFY_FILE_SAVE_PATH").style.visibility = "visible";
        document.getElementById("NTFY_FILE_SAVE_PATH").disabled = false;
        document.getElementById("NTFY_LOAD_SCREEN_XML").style.visibility = "hidden";
        document.getElementById("NTFY_LOAD_SCREEN_XML").disabled = true;
        document.getElementById("NOTIFICATION_FUNCTION").disabled = false;
        document.getElementById("NTFY_GEN_ALL").disabled = false;
        document.getElementById("save").className = "BUTTONToolbar";
        document.getElementById("save").disabled = false;
        document.getElementById("genFiles").className = "BUTTONToolbar";
        document.getElementById("genFiles").disabled = false;
        document.getElementById("depFiles").className = "BUTTONToolbar";
        document.getElementById("depFiles").disabled = false;
        document.getElementById("chekinFiles").className = "BUTTONToolbar";
        document.getElementById("chekinFiles").disabled = false;
        document.getElementById("close").className = "BUTTONToolbar";
        document.getElementById("close").disabled = false;
        document.getElementById("exit").className = "BUTTONToolbarD";
        document.getElementById("exit").disabled = true;
        createDOM();
        enAbleNodes();

    }
    else if (document.getElementById("NTFY_ACTION").value == "NEW" && roleRights.charAt(1) == '0') {
        alertMessage("New Not Allowed...", "E");
        document.getElementById("frmMAIN").reset();
        return false;
    }
    else {
        document.getElementById("LBL_NTFY_LOAD_XML").innerText = "Save XML Path";
        document.getElementById("NTFY_FILE_SAVE_PATH").style.visibility = "visible";
        document.getElementById("NTFY_FILE_SAVE_PATH").disabled = true;
        document.getElementById("NTFY_LOAD_SCREEN_XML").style.visibility = "hidden";
        document.getElementById("NTFY_FILE_SAVE_PATH").value = "";
        document.getElementById("NTFY_LOAD_SCREEN_XML").value = "";
        document.getElementById("NTFY_LOAD_SCREEN_XML").disabled = true;
        document.getElementById("NOTIFICATION_FUNCTION").value = "";
        document.getElementById("NOTIFICATION_FUNCTION").disabled = true;
        document.getElementById('BTN_DESC_POPUP').style.visibitly = "hidden";
        document.getElementById('BTN_BASE_TABLE').style.visibitly = "hidden";
        document.getElementById('BTN_SERVICE_NAME').style.visibility = "hidden";
        document.getElementById('BTN_OPERATION_CODE').style.visibitly = "hidden";
        document.getElementById('BTN_MODULEDESC_POPUP').style.visibitly = "hidden";
        document.getElementById('BTN_NTFY_MODULE').style.visibility = "visible";
        document.getElementById("save").className = "BUTTONToolbarD";
        document.getElementById("save").disabled = true;
        document.getElementById("genFiles").className = "BUTTONToolbarD";
        document.getElementById("genFiles").disabled = true;
        document.getElementById("depFiles").className = "BUTTONToolbarD";
        document.getElementById("depFiles").disabled = true;
        document.getElementById("chekinFiles").className = "BUTTONToolbarD";
        document.getElementById("chekinFiles").disabled = true;
        document.getElementById("close").className = "BUTTONToolbarD";
        document.getElementById("close").disabled = true;
        document.getElementById("exit").className = "BUTTONToolbar";
        document.getElementById("exit").disabled = false;
        disAbleNodes();
        fnResetAllFlds();
        delAll('wbsrvtgs');
    }
}

function fnResetAllFlds() {
    var rstFlds = EleNtfyArray['NOTIFY_DTLS'].split("~");
    var rstFldslen = rstFlds.length;
    for (var j = 0;j < rstFldslen;j++) {
        if (rstFlds[j] == "HO_ONLY") {
            document.getElementById(rstFlds[j]).checked = false;
        }
		//vinit
		else if (rstFlds[j] == "SPECIFIC_NOTIFICATION") {
            document.getElementById(rstFlds[j]).checked = false;
        }
        else if (rstFlds[j] == "FILTER_TYPE") {
            document.getElementById(rstFlds[j]).value = "NONE";
        }
        else {
            document.getElementById(rstFlds[j]).value = "";
        }
    }
}

function disableFormFields(container, isDisabled) {
    var tagNames = ["INPUT", "SELECT", "TEXTAREA", "BUTTON"];
    for (var i = 0;i < tagNames.length;i++) {
        var elems = container.getElementsByTagName(tagNames[i]);
        for (var j = 0;j < elems.length;j++) {
            elems[j].disabled = isDisabled;
            elems[j].readonly = isDisabled;
            if (tagNames[i] == "BUTTON") {
                if (isDisabled == true)
                    elems[j].style.visibility = "hidden";
                else 
                    elems[j].style.visibility = "visible";
            }
        }
    }
}

function disAbleNodes() {
    disableFormFields(document.getElementById('NOTIFDTLS'), true);
    document.getElementById('DIV_FILTERLOGIC').disabled = true;
    document.getElementById('wbsrvtgs_ME').disabled = true;
    document.getElementById('btnAdd').disabled = true;
    document.getElementById('btnDel').disabled = true;
    document.getElementById('wbsrvtgs').disabled = true;
    document.getElementById('RAD_SCHEMA').value = parent.jndiName;
}

function enAbleNodes() {
    disableFormFields(document.getElementById('NOTIFDTLS'), false);
    document.getElementById('DIV_FILTERLOGIC').disabled = false;
    document.getElementById('wbsrvtgs_ME').disabled = false;
    document.getElementById('btnAdd').disabled = false;
    document.getElementById('btnDel').disabled = false;
    document.getElementById('wbsrvtgs').disabled = false;
    document.getElementById('BTN_DESC_POPUP').style.visibility = "visible";
    document.getElementById('BTN_BASE_TABLE').style.visibility = "visible";
    document.getElementById('BTN_SERVICE_NAME').style.visibility = "visible";
    document.getElementById('BTN_OPERATION_CODE').style.visibility = "visible";
    document.getElementById('BTN_NTFY_MODULE').style.visibility = "visible";
    document.getElementById('BTN_MODULEDESC_POPUP').style.visibility = "visible";
    var enblnd = "TYPE_XSD~FS_RES_XSD~PK_RES_XSD~FC_FUNCTION_ROUTING";
    enblnd = enblnd.split("~");
    for (var i = 0;i < enblnd.length;i++) {
        document.getElementById(enblnd[i]).readonly = true;
    }
}

function fnShowData(node) {
    var elelen = new Array();
    elelen = EleNtfyArray[node].split("~");
    for (var i = 0;i < elelen.length;i++) {
        if (elelen[i] == "FULL_SCREEN_RESPONSE") {
            if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/" + elelen[i])) == "Y") {
                document.getElementById(elelen[i]).checked = true;
            }
            else if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/" + elelen[i])) == "N") {
                document.getElementById(elelen[i]).checked = false;
            }
        }
        else if (elelen[i] == "HO_ONLY") {

            if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/" + elelen[i])) == "Y") {
                document.getElementById(elelen[i]).checked = true;
            }
            else if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/" + elelen[i])) == "N") {
                document.getElementById(elelen[i]).checked = false;
            }
        }
		//vinit
		 else if (elelen[i] == "SPECIFIC_NOTIFICATION") {

            if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/" + elelen[i])) == "Y") {
                document.getElementById(elelen[i]).checked = true;
            }
            else if (getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/" + elelen[i])) == "N") {
                document.getElementById(elelen[i]).checked = false;
            }
        }
        else {
            document.getElementById(elelen[i]).value = getNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/" + elelen[i]));
        }

    }

}

function addNewRow1(tableName) {
    if (!document.getElementById(tableName)) {
        return;
    }

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=ORDER name=ORDER size=10> </TD>" + "<TD><INPUT aria-required=\"false\" id=XSD_FIELD name=XSD_FIELD size=25> </TD>" + "<TD><INPUT aria-required=\"false\" id=TABLE_FIELD name=TABLE_FIELD size=35 ><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\"  name=\"LOV\"  id=\"LOV\"  onclick=\"LOV_TABLE_FIELDS.show_lov('TABLE_FIELD~DATA_TYPE~MAX_LENGTH','frmLovDetls','BASE_TABLE', 'Field Name', 'Field Name~Data Type~Maximum Length', 'Field Name~Data Type~Maximum Length',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" id=DATA_TYPE name=DATA_TYPE size=25> </TD>" + "<TD><INPUT aria-required=\"false\" id=MAX_LENGTH name=MAX_LENGTH size=25> </TD>";
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var arrSize = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var styleArray = new Array();
    var trCellArray = tBodyHTML.split("</TD>");
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        try {
            newRow.cells[j].getElementsByTagName("INPUT")[0].title = "Record " + trwln + " col " + R;
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("SELECT")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        cellsArr[j] = newRow.cells[j];
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        R++;
    }
}

function delRow1(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableObject.tBodies[0].deleteRow(index);
        }
    }
}

function delAll(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        tableObject.tBodies[0].deleteRow(index);
    }
}

function fnLnchGen(act) {
    ntfyAction = act;
    loadSubScreenDIV("ChildWin", "RadGenerate.jsp");
}

function fnSaveData(val, reqDom) {

    if (document.getElementById("NOTIFICATION_FUNCTION").value == "") {
        alertMessage("Notification Function Cannot Be Null...", "E");
        return false;
    }

    var savepath = "";
    var ntfyId = "";
    var tblObj = document.getElementById('wbsrvtgs');
    errLogMsg = "";
    errType = "";

    ntfyId = document.getElementById("NOTIFICATION_FUNCTION").value;
    if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1) || (ua.indexOf("opera") !=  - 1)) {
        g_Save_Dir = "";
        parentPath = "";
    }
    else {
        if (parent.g_Wrk_Dir == "CURRENT_DIRECTORY") {
            if (act == "NEW") {
                g_Save_Dir = document.getElementsByName("NTFY_FILE_SAVE_PATH")[0].value;
            }
            else {
                g_Save_Dir = document.getElementsByName("NTFY_LOAD_SCREEN_XML")[0].value;
                g_Save_Dir = g_Save_Dir.substring(0, (g_Save_Dir.lastIndexOf("\\") + 1))
            }

        }
        else {
            g_Save_Dir = parent.g_Wrk_Dir;
        }
    }
    savepath = g_Save_Dir;
    var len = savepath.length;
    var last_char = savepath.charAt(len - 1);
    if (last_char != "\\") {
        savepath = savepath + "\\";
    }
    if (savepath.indexOf("\\RADXML\\") !=  - 1) {
        var radPath = savepath;
        parentPath = savepath.substring(0, savepath.indexOf("\\RADXML\\") + 1);
    }
    else {
        var radPath = savepath + "RADXML\\";
        parentPath = savepath;
    }

    appendHdrData();
    fnsetvalues();
    var elelen = new Array();
    elelen = EleNtfyArray['NOTIFY_DTLS'].split("~");
    for (var i = 0;i < elelen.length;i++) {
        if (elelen[i] == "FULL_SCREEN_RESPONSE") {
            if (document.getElementById(elelen[i]).checked == true) {
                setNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]), "Y");
            }
            else if (document.getElementById(elelen[i]).checked == false) {
                setNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]), "N");
            }
        }
        else if (elelen[i] == "HO_ONLY") {
            if (document.getElementById(elelen[i]).checked == true) {
                setNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]), "Y");
            }
            else if (document.getElementById(elelen[i]).checked == false) {
                setNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]), "N");
            }
        }
		//vinit
		   else if (elelen[i] == "SPECIFIC_NOTIFICATION") {
            if (document.getElementById(elelen[i]).checked == true) {
                setNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]), "Y");
            }
            else if (document.getElementById(elelen[i]).checked == false) {
                setNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]), "N");
            }
        }
		
        else {
            setNodeText(selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/" + elelen[i]), document.getElementById(elelen[i]).value);
        }
    }
    if (tblObj.tBodies[0].rows.length > 0) {
        var node = selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/WEBSERVICE_TAGS");
        for (var i = 0;i < node.length;i++) {
            node[i].parentNode.removeChild(node[i]);
        }
        for (var j = 0;j < tblObj.tBodies[0].rows.length;j++) {
            var rootnode = selectSingleNode(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS");
            var nodeElement = notifyDOM.createElement("WEBSERVICE_TAGS");
            rootnode.appendChild(nodeElement);

            var webservsArray = new Array();
            webservsArray = EleNtfyArray['WEBSER_TAGS'].split("~");
            for (var i = 0;i < webservsArray.length;i++) {
                var childElements = notifyDOM.createElement(webservsArray[i]);
                nodeElement.appendChild(childElements);
            }
            for (var cl = 1;cl < tblObj.tBodies[0].rows[j].cells.length;cl++) {
                var nodename = EleNtfyArray['WEBSER_TAGS'].split("~");
                var nodevalue = tblObj.tBodies[0].rows[j].cells[cl].getElementsByTagName('INPUT')[0].value;
                setNodeText(selectSingleNode(selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/WEBSERVICE_TAGS")[j], nodename[cl - 1]), nodevalue);
            }
            nodeElement.setAttribute("ID", getNodeText(selectSingleNode(selectNodes(notifyDOM, "//RAD_KERNEL/RAD_NOTIFICATIONS/WEBSERVICE_TAGS")[j], "XSD_FIELD")));
        }
    }

    frntndFiles += parent.gBodySeparator + ("RADXML\\" + document.getElementById("NOTIFICATION_FUNCTION").value + "_RAD.xml--") + getXMLString(notifyDOM);
    if (val == "0") {
        parent.gReqType = "GEN";
        parent.gReqCode = "GENERATE";
        parent.gClnUsrDir = "YES";
        parent.gIsSummary = 0;
        parent.gAction = "";
        gReleaseCode = parent.relCode;
        parent.gSubFolder = "";
        var radReqDOM = parent.buildRADXml();
        var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
        var gennode = radReqDOM.createElement("GENERATE");
        bodyNode.appendChild(gennode);
        var node = radReqDOM.createElement("RAD_XML");
        gennode.appendChild(node);
        setNodeText(selectSingleNode(radReqDOM, "//GENERATE/RAD_XML"), 'Y');
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(notifyDOM) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        if (parent.gfnPostStatus != "F") {
            var wres = parent.fnwritedata(response, parent.saveformat);
        }
        parent.alertMessage("File Saved", "I");
        return;
    }
    else {
        parent.gIsSummary = 0;
        parent.gAction = "";
        parent.gReqType = "GEN";
        parent.gReqCode = "GENERATE";
        parent.gClnUsrDir = "YES";
        gReleaseCode = parent.relCode;
        var response = parent.fnPost(getXMLString(reqDom) + parent.gBodySeparator + getXMLString(notifyDOM) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        if (parent.gfnPostStatus != "F") {
            var wres = parent.fnwritedata(response, parent.saveformat);
        }
        var files = response.split("--##FILE##--");
        return files[files.length - 1];
    }

}

function fndeploy(spcflName, spcflCntns, sqlflName, sqlflCntns, incflName, incflCntns) {

    if (ntfylogMsg != "") {
        if (errType == "E") {
            var res = fnLaunchLog(logMsg, errLogMsg, errType);
            if (res == "1") {
                var get_confirm = alertMessage("There Are Some Errors..Do You Want To Continue...", "O");
                if (get_confirm == false || get_confirm == "undefined")
                    return false;
            }
            if (!(fnCreateFile(fileSavePath, functionid + "_LOG.txt", logMsg, false))) {
                return false;
            }
        }
    }
    var winParams = new Object();
    winParams.deploy = "NOTIFY";
    winParams.allFils = new Array();
    winParams.AllFlCntnts = new Array();
    winParams.allFils['ntfyspcFils'] = spcflName;
    winParams.AllFlCntnts['ntfyspcFilCnts'] = spcflCntns;
    winParams.allFils['ntfysqlFils'] = sqlflName;
    winParams.AllFlCntnts['ntfysqlFilCnts'] = sqlflCntns;
    winParams.allFils['ntfyincFils'] = incflName;
    winParams.AllFlCntnts['ntfyincFilCnts'] = incflCntns;

    winParams.schName = parent.jndiName;

    addUIFieldsWin = window.showModalDialog("RadDeploy.jsp", winParams, "dialogHeight:680px; dialogWidth:720px; status=no;help=no;toolbar=no");
}

function fnLaunchLog(logMsg, errLogMsg, errType) {
    var winParams = new Object();
    winParams.lgMsg = logMsg;
    winParams.errLgMsg = errLogMsg;
    relsFils = window.showModalDialog("RadLog.jsp", winParams, "dialogHeight:630px; dialogWidth:700px; status=no;help=no;toolbar=no");
    if (errType == "E") {
        return 1;
    }

}

function fn_cancel() {
    logScreen = "C";
    errType = "O";
    var r = alertMessage("Changes Will Be Lost Do You Want To Proceed", "O");

}

function upper(r) {
    r.value = r.value.toUpperCase();
}

function reloadNtfyForm() {
    document.getElementById("NTFY_ACTION").value = "NONE";
    document.getElementById("LBL_NTFY_LOAD_XML").innerText = "Save XML Path";
    document.getElementById("NTFY_FILE_SAVE_PATH").style.visibility = "visible";
    document.getElementById("NTFY_FILE_SAVE_PATH").disabled = true;
    document.getElementById("NTFY_FILE_SAVE_PATH").value = "";
    document.getElementById("NTFY_LOAD_SCREEN_XML").style.visibility = "hidden";
    document.getElementById("NTFY_LOAD_SCREEN_XML").value = "";
    document.getElementById("NTFY_LOAD_SCREEN_XML").disabled = true;
    document.getElementById("NOTIFICATION_FUNCTION").value = "";
    document.getElementById("NOTIFICATION_FUNCTION").disabled = true;
    document.getElementById("close").className = "BUTTONToolbarD";
    document.getElementById("close").disabled = true;
    document.getElementById("exit").className = "BUTTONToolbar";
    document.getElementById("exit").disabled = false;
    document.getElementById("NTFY_ACTION").disabled = false;
    var nodes = selectNodes(notifyDOM, ("//RAD_NOTIFICATIONS"));
    for (var i = 0;i < nodes.length;i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
    notifyDOM = "";
    fnNtfyActions();
}

function fnsetvalues() {
    var ser_nam = document.getElementById("GATEWAY_SERVICE").value;
    var opr_code = document.getElementById("GATEWAY_OPERATION").value;
    if (ser_nam != "" && opr_code != "") {
        var queryString = "ROUTING_TYPE";
		//var queryString = "FETCH@select A.FS_RES_XSD, A.PK_RES_XSD, B.ROUTING_TYPE  from gwtm_operations_master A, SMTB_MENU B where A.FC_FUNCTION_ID = B.FUNCTION_ID AND A.service_name = '" + ser_nam + "' AND A.operation_code = '" + opr_code + "'";
        var WhereString = "where A.FC_FUNCTION_ID = B.FUNCTION_ID AND A.service_name = '" + ser_nam + "' AND A.operation_code = '" + opr_code + "'";
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
        if (multRec[0] != "") {
            document.getElementById("FS_RES_XSD").value = multRec[0].split("~")[0];
            document.getElementById("PK_RES_XSD").value = multRec[0].split("~")[1];
            document.getElementById("FC_FUNCTION_ROUTING").value = multRec[0].split("~")[2];
        }
        else {
            document.getElementById("FS_RES_XSD").value = "";
            document.getElementById("PK_RES_XSD").value = "";
            document.getElementById("FC_FUNCTION_ROUTING").value = "";
        }
    }
    else {
        document.getElementById("FS_RES_XSD").value = "";
        document.getElementById("PK_RES_XSD").value = "";
        document.getElementById("FC_FUNCTION_ROUTING").value = "";
    }

    var tablenam = document.getElementById("BASE_TABLE").value;
    var columnnms = "";
    var nodes = selectNodes(notifyDOM, ("//TABLE_FIELD"));
    for (var i = 0;i < nodes.length;i++) {
        columnnms = columnnms + "'" + getNodeText(nodes[i]) + "',";
    }
    columnnms = columnnms + "''";
    var queryString = "DATA_LENGTH";
    //var queryString = "FETCH@SELECT Column_Name , Data_Length FROM USER_TAB_COLS WHERE Table_Name = '" + tablenam + "' and Column_Name in( " + columnnms + ")";
    var WhereString = "WHERE Table_Name = '" + tablenam + "' and Column_Name in( " + columnnms + ")";
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
        return;
    }

    var tableObj = document.getElementById("wbsrvtgs");
    for (var sr = 0;sr < tableObj.tBodies[0].rows.length;sr++) {
	 for (var ml = 0;ml < multRec.length;ml++) {
		if(multRec[ml].split("~")[0] !="" && multRec[ml].split("~")[0]==tableObj.tBodies[0].rows[sr].cells[3].getElementsByTagName("INPUT")[0].value ){
        tableObj.tBodies[0].rows[sr].cells[5].getElementsByTagName("INPUT")[0].value = multRec[ml].split("~")[1];
		break;
		}
		}
    }

}

function fnAddNtfyPkColsNFlds() {

    var returArray = new Array();
    var pkcols = "";
    var pkcolsDataType = "";
    var tblName = document.getElementById("BASE_TABLE").value;
    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R001" + parent.gBodySeparator + tblName, "RADClientHandler");
    response = getXMLString(response);

    if (response.substring(response.indexOf("<VALIDITY>") + 10, response.indexOf("</VALIDITY>")) == "INVALID") {
        alertMessage("Enter a valid table", "E");
        return false;
    }
    else {
        parent.gReqCode = 'UICONTROLLER';
        parent.gReqType = "APP";
        var radReqDOM = parent.buildRADXml();
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R007" + parent.gBodySeparator + "~" + tblName, "RADClientHandler");

        var pkdetails = getXMLString(response);
        if (pkdetails.indexOf("DB Error") !=  - 1) {
            document.getElementById("PK_COLS").value = "";
            document.getElementById("PK_TYPES").value = "";
        }
        else {
            pkdetails = pkdetails.substring(pkdetails.indexOf("<pkfields>") + 10, pkdetails.indexOf("</pkfields>"));
            pkdetails = pkdetails.split("!");
            var lstChr = pkdetails[0].charAt(pkdetails[0].length - 1);
            if (lstChr == "~") {
                pkcols = pkdetails[0].substring(0, pkdetails[0].length - 1);
            }
            var fstChr = pkcols.charAt(0);
            if (fstChr == "~") {
                pkcols = pkcols.substring(pkcols.length, 1);
            }

            lstChr = pkdetails[1].charAt(pkdetails[1].length - 1);
            if (lstChr == "~") {
                pkcolsDataType = pkdetails[1].substring(0, pkdetails[1].length - 1);
            }
            fstChr = pkcolsDataType.charAt(0);
            if (fstChr == "~") {
                pkcolsDataType = pkcolsDataType.substring(pkcolsDataType.length, 1);
            }
            document.getElementById("PK_COLS").value = pkcols;
            document.getElementById("PK_TYPES").value = pkcolsDataType;
        }
    }

}

function TempActionsOnLoad(dom) {
    var elelen = new Array();
    elelen = EleNtfyArray['NOTIFY_DTLS'].split("~");
    var notif = selectSingleNode(dom, "//RAD_KERNEL/RAD_NOTIFICATIONS");
    for (var len = 0;len < elelen.length;len++) {
        if (selectSingleNode(notif, elelen[len]) == null) {
            var fldName = dom.createElement(elelen[len]);
            notif.appendChild(fldName);
        }
    }

    var WSTags = selectNodes(dom, "//RAD_KERNEL/RAD_NOTIFICATIONS/WEBSERVICE_TAGS");
    for (var n = 0;n < WSTags.length;n++) {
        if (selectSingleNode(WSTags[n], "DATA_TYPE") == null) {
            var fldName = dom.createElement("DATA_TYPE");
            WSTags[n].appendChild(fldName);
        }
    }
}

function trim(argvalue) {
    argvalue = argvalue + "";
    var tmpstr = ltrim(argvalue);
    return rtrim(tmpstr);
}

function fn_notxsdformat() {
    var nticd = document.getElementById("NOTIFICATION_CODE").value;
    if (nticd != "") {
        try {
            nticd = nticd.split("_");
            var Str = "";
            for (var i = 2;i < nticd.length;i++)
                Str = Str + nticd[i];
            var midname = parent.initCap(Str);
            var ntixsd = nticd[1] + "-" + midname + "-" + "Notif.xsd";
            document.getElementById("NOTIFICATION_XSD").value = ntixsd;
        }
        catch (e) {
        }
    }
}

function ltrim(argvalue) {
    argvalue = argvalue + "";
    while (true) {
        if (!isWhitespace(argvalue.substring(0, 1)))
            break;
        argvalue = argvalue.substring(1, argvalue.length);
    }
    return argvalue;
}

function rtrim(argvalue) {
    argvalue = argvalue + "";
    while (true) {
        if (!isWhitespace(argvalue.substring(argvalue.length - 1)))
            break;
        argvalue = argvalue.substring(0, argvalue.length - 1);
    }
    return argvalue;
}

function isWhitespace(ch) {
    if (ch == ' ' || ch == '\n' || ch == '\r' || ch == '\t' || ch == '\f' || ch == '\b')
        return true;
    return false;
}

function fnxsdflds() {
    if (document.getElementById("FC_FUNCTION_ROUTING").value == "X") {
        document.getElementById("TYPE_XSD").disabled = false;
    }
    else {
        document.getElementById("TYPE_XSD").disabled = true;
    }
}

function FnNotifEvnt(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (evnt.shiftKey == true && evnt.keyCode == 9) {
        if (srcElement.id == "RADNOTIFCLOSE") {
            if (document.getElementById("NTFY_ACTION").value != "NONE")
                document.getElementById("wbsrvtgs_TE").focus();
            else 
                document.getElementById("NTFY_ACTION").focus();
            fnDisableBrowserKey(e);
            preventpropagate(e);
            return;
        }

    }
    else if (evnt.keyCode == 9 && evnt.shiftKey != true) {
        if (srcElement.id == "wbsrvtgs_TE") {
            document.getElementById("RADNOTIFCLOSE").focus();
            fnDisableBrowserKey(e);
            preventpropagate(e);
            return;
        }
        else if (srcElement.id == "NTFY_ACTION") {
            if (document.getElementById("NTFY_ACTION").value == "NONE") {
                document.getElementById("RADNOTIFCLOSE").focus();
                fnDisableBrowserKey(e);
                preventpropagate(e);
                return;
            }
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