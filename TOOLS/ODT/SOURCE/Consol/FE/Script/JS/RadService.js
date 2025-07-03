/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadService.js
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
var ServiceDom = createHTTPActiveXObject();
var username = parent.parent.username;
var usersequence = parent.parent.usersequence;
parent.username = username;
parent.usersequence = usersequence;
var elementArray_service = new Array();
elementArray_service['RAD_FUNCTION_ID'] = "NAME~ACTIVE~TYPE_XSD_NAME~IS_SUMMARY_PRESENT~RELEASE_TYPE~RELEASE_NAME";
elementArray_service['OPERATION'] = "ACTION_CODE~ACTIVE~OPERATION_CODE~TYPE_XSD_NAME~RELEASE_TYPE~RELEASE_NAME";
var nodeChildArray_service = new Array();
nodeChildArray_service['RAD_FUNCTION_ID'] = "OPERATION";

var consoldom_Srv = "";
consoldom_Srv.async = false;
consoldom_Srv.resolveExternals = false;
consoldom_Srv = "<?xml version='1.0' encoding='UTF-8'?>";
consoldom_Srv = loadXMLDoc(consoldom_Srv);
var funcdom_Srv = "";
funcdom_Srv.async = false;
funcdom_Srv.resolveExternals = false;
funcdom_Srv = "<?xml version='1.0' encoding='UTF-8'?>";
funcdom_Srv = loadXMLDoc(funcdom_Srv);

var basedom_Srv = "";
basedom_Srv.async = false;
basedom_Srv.resolveExternals = false;
basedom_Srv = "<?xml version='1.0' encoding='UTF-8'?>";
basedom_Srv = loadXMLDoc(basedom_Srv);

var nodeNonCompareArray_service = new Array();
nodeNonCompareArray_service['RAD_FUNCTION_ID'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray_service['OPERATION'] = "RELEASE_TYPE~RELEASE_NAME";

function FnServiceEvnt(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (evnt.shiftKey == true && evnt.keyCode == 9) {
        if (srcElement.id == "RADNOTIFCLOSE") {
            if (document.getElementById("SRV_ACTION").value != "NONE")
                document.getElementById("EXTRAD_TE").focus();
            else 
                document.getElementById("SRV_ACTION").focus();
            fnDisableBrowserKey(e);
            preventpropagate(e);
            return;
        }

    }
    else if (evnt.keyCode == 9 && evnt.shiftKey != true) {
        if (srcElement.id == "EXTRAD_TE") {
            document.getElementById("RADNOTIFCLOSE").focus();
            fnDisableBrowserKey(e);
            preventpropagate(e);
            return;
        }
        else if (srcElement.id == "SRV_ACTION") {
            if (document.getElementById("SRV_ACTION").value == "NONE") {
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

function fnSrvActions() {

    if (document.getElementById("SRV_ACTION").value == "LOAD") {
        fngetReadMode("SINGLE");

        document.getElementsByName("SRV_LOAD_SCREEN_XML")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].disabled = false;
        document.getElementsByName("SRV_FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("SRV_LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSE")[0].style.visibility = "visible";
        document.getElementsByName("SRV_FILE_SAVE_PATH")[0].style.visibility = "visible";
        setInnerText((document.getElementsByName("LBL_LOAD_XML")), "Load Screen Xml");
        document.getElementById("LBL_SRV_LOAD_XML").innerText = "Load Screen Xml";

    }
    else if (document.getElementById("SRV_ACTION").value == "NEW" && roleRights.charAt(1) == '1') {
        document.getElementById("LBL_SRV_LOAD_XML").innerText = "Save XML Path";
        document.getElementById("SRV_FILE_SAVE_PATH").style.visibility = "visible";
        document.getElementById("SRV_FILE_SAVE_PATH").disabled = false;
        document.getElementById("SRV_LOAD_SCREEN_XML").style.visibility = "hidden";
        document.getElementById("SRV_LOAD_SCREEN_XML").disabled = true;
        document.getElementById("SERVICE_NAME").disabled = false;
        document.getElementById("SERVICE_DESC").disabled = false;
        //document.getElementById("SOAP_FAULT").disabled = false; 
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
    }
    else if (document.getElementById("SRV_ACTION").value == "NEW" && roleRights.charAt(1) == '0') {
        alertMessage("New Not Allowed...", "E");
        document.getElementById("frmMAIN").reset();
        return false;
    }
    else {
        document.getElementById("LBL_SRV_LOAD_XML").innerText = "Save XML Path";
        document.getElementById("SRV_FILE_SAVE_PATH").style.visibility = "visible";
        document.getElementById("SRV_FILE_SAVE_PATH").disabled = true;
        document.getElementById("SRV_LOAD_SCREEN_XML").style.visibility = "hidden";
        document.getElementById("SRV_FILE_SAVE_PATH").value = "";
        document.getElementById("SRV_LOAD_SCREEN_XML").value = "";
        document.getElementById("SRV_LOAD_SCREEN_XML").disabled = true;
        document.getElementById("SERVICE_NAME").value = "";
        document.getElementById("SERVICE_NAME").disabled = true;
        document.getElementById("SERVICE_DESC").value = "";
        document.getElementById("SERVICE_DESC").disabled = true;
        //document.getElementById("SOAP_FAULT").disabled = true;     
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
        deleteAll('EXTRAD');
    }
}

function addNewRow1(tableName) {
    if (!document.getElementById(tableName)) {
        return;
    }

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    if (tableName == "EXTRAD")
        var trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=E_FUNCTION_ID name=E_FUNCTION_ID size=40><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\"  name=\"LOV\"  id=\"LOV\"  onclick=\"LOV_SRV_FUNCTION_ID.show_lov('E_FUNCTION_ID~','frmLovDetls','MODULE_ID', 'Function Name~Module', 'Function Name~Module', 'Function Name~Module',event)\"><span class=\"ICOlov\"></span></BUTTON> </TD>" + "<TD><INPUT aria-required=\"false\" type=input id=EXT_NONEXT name=EXT_NONEXT value=\"Extensible\" disabled size=30></TD>" + "<TD><INPUT aria-required=\"false\" disabled type=input id=TYPE_XSD_NAME name=TYPE_XSD_NAME size=50></TD>" + "<TD><INPUT aria-required=\"false\" type=HIDDEN id=ACTIVE name=ACTIVE size=60></TD>";

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

function appendHdrData(ServiceDom) {
    setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/SERVICE_NAME"), document.getElementById("SERVICE_NAME").value);
    setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/SERVICE_DESC"), document.getElementById("SERVICE_DESC").value);
    setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/SERVICE_ORIGIN"), parent.relType);
    setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/RELEASE_CODE"), parent.relCode);
    setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/TYPE_SYSTEM"), "S");
    setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/SOAP_FAULT"), "Y");
    setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/MODULE"), document.getElementById("MODULE_ID").value);

    try {
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/ORIGINATION_DATE"), parent.originDate);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/LANG_CODE"), parent.lang);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/USER_ID"), parent.username);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/ENV_CODE"), parent.envCode);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/ACTION"), document.getElementById("SRV_ACTION").value);
		setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/SRV_PRODUCT"), document.getElementById("SRV_PRODUCT").value);
    }
    catch (e) {
        var rootnode = selectSingleNode(ServiceDom, "//RAD_FUNCTIONS");
        var nodeElement = ServiceDom.createElement("ORIGINATION_DATE");
        rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "MODULE"));
        nodeElement = ServiceDom.createElement("LANG_CODE");
        rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "MODULE"));
        nodeElement = ServiceDom.createElement("USER_ID");
        rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "MODULE"));
        nodeElement = ServiceDom.createElement("ENV_CODE");
        rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "MODULE"));
        nodeElement = ServiceDom.createElement("ACTION");
        rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "MODULE"));
		nodeElement = ServiceDom.createElement("SRV_PRODUCT");
        rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "MODULE"));

        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/ORIGINATION_DATE"), parent.originDate);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/LANG_CODE"), parent.lang);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/USER_ID"), parent.username);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/ENV_CODE"), parent.envCode);
        setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/ACTION"), document.getElementById("SRV_ACTION").value);
		setNodeText(selectSingleNode(ServiceDom, "//RAD_FUNCTIONS/SRV_PRODUCT"), document.getElementById("SRV_PRODUCT").value);

    }

    return ServiceDom;
}

function fn_del_records() {
    var tblObj_E = document.getElementById('EXTRAD');
    var check = false;
    blkdtscr = selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID");
    for (var k = 0;k < blkdtscr.length;k++) {
        check = false;
        functid1 = getNodeText(selectSingleNode(blkdtscr[k], "NAME"));
        for (var j = 0;j < tblObj_E.tBodies[0].rows.length;j++) {
            if (functid1 == tblObj_E.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value) {
                check = true;
                break;
            }
        }
        if (check == false) {
            if (getNodeText(selectSingleNode(blkdtscr[k], "RELEASE_TYPE")) == parent.relType && getNodeText(selectSingleNode(blkdtscr[k], "RELEASE_NAME")) == parent.relCode) {
                blkdtscr[k].parentNode.removeChild(blkdtscr[k]);
            }
            else {
                setNodeText(selectSingleNode(selectSingleNode(ServiceDom, "//RAD_FUNCTION_ID[@ID='" + functid1 + "']"), "ACTIVE"), "N");
                setNodeText(selectSingleNode(selectSingleNode(ServiceDom, "//RAD_FUNCTION_ID[@ID='" + functid1 + "']"), "RELEASE_TYPE"), parent.relType);
                setNodeText(selectSingleNode(selectSingleNode(ServiceDom, "//RAD_FUNCTION_ID[@ID='" + functid1 + "']"), "RELEASE_NAME"), parent.relName);

                var removeNode = selectNodes(ServiceDom, "//RAD_FUNCTION_ID[@ID='" + functid1 + "']/OPERATION");
                for (var i = 0;i < removeNode.length;i++) {
                    setNodeText(selectSingleNode(removeNode[i], "ACTIVE"), "N");
                    setNodeText(selectSingleNode(removeNode[i], "RELEASE_TYPE"), parent.relType);
                    setNodeText(selectSingleNode(removeNode[i], "RELEASE_NAME"), parent.relName);

                }
            }
        }
    }

    blkdtscr = selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION");
    for (var k = 0;k < blkdtscr.length;k++) {
        check = false;
        functid1 = getNodeText(selectSingleNode(blkdtscr[k], "FUNCTION_ID"));
        for (var j = 0;j < tblObj_E.tBodies[0].rows.length;j++) {
            if (functid1 == tblObj_E.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value) {
                check = true;
                break;
            }
        }
        if (check == false) {
            blkdtscr[k].parentNode.removeChild(blkdtscr[k]);
        }
    }
}

function fn_save_details() {

    var tblObj_E = document.getElementById('EXTRAD');

    if (tblObj_E.tBodies[0].rows.length > 0) {
        for (var j = 0;j < tblObj_E.tBodies[0].rows.length;j++) {

            if (tblObj_E.tBodies[0].rows[j].cells[2].getElementsByTagName('INPUT')[0].value == "Extensible") {
                var functid1 = "";
                var check = false;
                var k = 0;
                if (selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID").length > 0)
                    for (k = 0;k < selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID").length;k++) {
                        try {
                            functid1 = getNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[k], "NAME"));
                        }
                        catch (e) {
                        }
                        if (functid1 == tblObj_E.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value) {
                            setNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[k], "ACTIVE"), "Y");
                            setNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[k], "RELEASE_TYPE"), parent.relType);
                            setNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[k], "RELEASE_NAME"), parent.relName);
                            setNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[k], "TYPE_XSD_NAME"), tblObj_E.tBodies[0].rows[j].cells[3].getElementsByTagName('INPUT')[0].value);

                            check = true;
                            break;
                        }
                    }
                if (check == false && tblObj_E.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value != "") {
                    var rootnode = selectSingleNode(ServiceDom, "//RAD_KERNEL");
                    var DataSource = ServiceDom.createElement("RAD_FUNCTION_ID");
                    rootnode.appendChild(DataSource);
                    nodeArray = elementArray_service['RAD_FUNCTION_ID'].split("~");
                    var ser = tblObj_E.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value;
                    for (var i = 0;i < nodeArray.length;i++) {
                        var DsDetails = ServiceDom.createElement(nodeArray[i]);
                        DataSource.appendChild(DsDetails);
                        DataSource.setAttribute("ID", ser);
                    }
                    setNodeText(selectSingleNode(selectSingleNode(ServiceDom, "//RAD_FUNCTION_ID[@ID='" + ser + "']"), "RELEASE_TYPE"), parent.relType);
                    setNodeText(selectSingleNode(selectSingleNode(ServiceDom, "//RAD_FUNCTION_ID[@ID='" + ser + "']"), "RELEASE_NAME"), parent.relName);

                    for (var cl = 1;cl < tblObj_E.tBodies[0].rows[j].cells.length;cl++) {

                        var nodevalue = tblObj_E.tBodies[0].rows[j].cells[cl].getElementsByTagName('INPUT')[0].value;
                        if (nodeArray[cl - 1] == "ACTIVE")
                            nodevalue = "Y";
                        if (nodeArray[cl - 1] == "IS_SUMMARY_PRESENT")
                            nodevalue = "";
                        if (nodevalue != "" && nodeArray[cl - 1] != undefined) {
                            setNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[k], nodeArray[cl - 1]), nodevalue);
                        }

                    }
                }
            }
        }
    }

    if (tblObj_E.tBodies[0].rows.length > 0) {
        var nodename = "FUNCTION_ID~TYPE_XSD_NAME".split("~");

        for (var j = 0;j < tblObj_E.tBodies[0].rows.length;j++) {
            if (tblObj_E.tBodies[0].rows[j].cells[2].getElementsByTagName('INPUT')[0].value == "Non-Extensible") {

                var functid1 = "";
                var check = false;
                for (var k = 0;k < selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION").length;k++) {
                    functid1 = getNodeText(selectSingleNode(selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION")[k], "FUNCTION_ID"));
                    if (functid1 == tblObj_E.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value) {
                        check = true;
                        break;
                    }
                }
                if (check == false && tblObj_E.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value != "") {
                    var rootnode = selectSingleNode(ServiceDom, "//NONEXT_FUNCTIONS");
                    var nodeElement = ServiceDom.createElement("NONEXT_FUNCTION");
                    rootnode.appendChild(nodeElement);

                    for (var i = 0;i < nodename.length;i++) {
                        var childElements = ServiceDom.createElement(nodename[i]);
                        nodeElement.appendChild(childElements);
                    }
                    for (var cl = 1;cl < tblObj_E.tBodies[0].rows[j].cells.length;cl++) {

                        var nodevalue = tblObj_E.tBodies[0].rows[j].cells[cl].getElementsByTagName('INPUT')[0].value;
                        if (nodevalue != "" && nodename[cl - 1] != undefined) {
                            setNodeText(selectSingleNode(selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION")[k], nodename[cl - 1]), nodevalue);
                        }
                    }
                }
            }
        }
    }

}

function fngen_service() {
    loadSubScreenDIV("ChildWin", "RadSrvGenerate.jsp");

}

function fnSaveData(val, reqDom) {

    if (document.getElementById("SERVICE_NAME").value == "") {
        alertMessage("Service Cannot Be Null...", "E");
        return false;
    }

    var frntndFiles = "";
    var savepath = "";
    var ntfyId = "";
    errLogMsg = "";
    errType = "";
    var serviceDomForGen = "";

    ntfyId = document.getElementById("SERVICE_NAME").value;
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

    fn_save_details();
    ServiceDom = appendHdrData(ServiceDom);
    serviceDomForGen = getCloneDocElement(ServiceDom);
    serviceDomForGen = loadXMLDoc(getXMLString(serviceDomForGen).toString());
    ServiceDom = RetroChangesToRespectiveRelease_service(ServiceDom);
    ServiceDom = appendHdrData(ServiceDom);
    frntndFiles += parent.gBodySeparator + ("RADXML\\" + document.getElementById("SERVICE_NAME").value + ".sxml--") + getXMLString(ServiceDom);
    if (val == "0") {
        parent.gReqType = "SAVEXML";
        parent.gReqCode = "SAVE";
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
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(ServiceDom) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        var wres = fnwritedata(response, parent.saveformat);
        if (wres == true) {
            alertMessage("File Saved", "I");
            debug('Succesfully saved File');
            ServiceDom = serviceDomForGen;
            return true;
        }
        else {
            alertMessage("Failed", "E");
            debug('Failed to save File');
            ServiceDom = serviceDomForGen;
            return false;
        }

    }
    else {
        parent.gIsSummary = 0;
        parent.gAction = "";
        parent.gReqType = "GEN";
        parent.gReqCode = "GENERATE";
        parent.gClnUsrDir = "YES";
        gReleaseCode = parent.relCode;
        var radReqDOM = reqDom;
        var genNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE");
        var node = radReqDOM.createElement("SXML");
        genNode.appendChild(node);
        setNodeText(selectSingleNode(radReqDOM, "//GENERATE/SXML"), 'Y');
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(serviceDomForGen) + frntndFiles, "RADClientHandler");
        if (response == false || response == "false") {
            parent.alertMessage("Error in generating artifacts", "E");
            return false;
        }
        if (parent.gfnPostStatus != "F") {
            var wres = parent.fnwritedata(response, parent.saveformat);
        }
        //parent.alertMessage("File Saved", "I");
        return response;

    }

}

function createDOM() {

    var SerDom = "";
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = dataXML + "<RAD_FUNCTIONS><SERVICE_NAME/><SERVICE_DESC/><TYPE_SYSTEM>S</TYPE_SYSTEM><SOAP_FAULT>Y</SOAP_FAULT><SERVICE_ORIGIN/><ACTION/><LANG_CODE/><MODULE/><ORIGINATION_DATE/><USER_ID/><RELEASE_CODE/><ENV_CODE/><RAD_KERNEL/><NONEXT_FUNCTIONS/></RAD_FUNCTIONS>";
    SerDom = loadXMLDoc(dataXML);
    ServiceDom = SerDom;
    ServiceDom = appendHdrData(ServiceDom);

}

function loadSRVRad(fName) {

    var xml2 = loadxmldata;

    if (!xml2) {
        return false;
    }
    if (xml2.indexOf("RAD_FUNCTIONS") ==  - 1) {
        alertMessage("Load Valid RAD xml File...", "E");
        reloadsrvForm();
        return false;
    }
    NewDOM = loadXMLDoc(xml2);

    if (selectNodes(NewDOM, "RAD_FUNCTIONS/SERVICE_NAME").length == 0) {
        alertMessage("Please load the correct RAD XML file ..", "E");
        return;
    }
    var ndeChk = fn_Chekc_RadXml(NewDOM);
    if (ndeChk == false)
        return false;

    var Servicename = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/SERVICE_NAME"));
    ServiceDom = fnPrepareconsoldom_Service(NewDOM, Servicename, "LOAD");
    if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL").length > 0) {
        document.getElementById("SERVICE_NAME").value = Servicename;
        document.getElementById("SERVICE_DESC").value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/SERVICE_DESC"));
        document.getElementById("MODULE_ID").value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/MODULE"));
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

        for (var mlt = 0;mlt < selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION").length;mlt++) {
            addNewRow1('EXTRAD');
            var webSrvcTags = "FUNCTION_ID~EXT_NONEXT~TYPE_XSD_NAME".split("~");
            document.getElementById('EXTRAD').tBodies[0].rows[mlt].cells[1].getElementsByTagName('BUTTON')[0].style.visibility = "hidden";
            document.getElementById('EXTRAD').tBodies[0].rows[mlt].cells[4].getElementsByTagName('INPUT')[0].disabled = true;
            for (var cln = 0;cln < webSrvcTags.length;cln++) {
                try {
                    document.getElementById('EXTRAD').tBodies[0].rows[mlt].cells[cln + 1].getElementsByTagName('INPUT')[0].value = getNodeText(selectSingleNode(selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION")[mlt], webSrvcTags[cln]));
                    document.getElementById('EXTRAD').tBodies[0].rows[mlt].cells[cln + 1].getElementsByTagName('INPUT')[0].disabled = true;
                }
                catch (e) {
                    document.getElementById('EXTRAD').tBodies[0].rows[mlt].cells[cln + 1].getElementsByTagName('INPUT')[0].value = "Non-Extensible";
                }
            }

        }
        var curr_row = mlt;

        for (var mlt = 0;mlt < selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID").length;mlt++) {
            var webSrvcTags = "NAME~EXT_NONEXT~TYPE_XSD_NAME".split("~");
            if (getNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[mlt], "ACTIVE")) == "Y") {
                addNewRow1('EXTRAD');

                for (var cln = 0;cln < webSrvcTags.length;cln++) {
                    try {
                        document.getElementById('EXTRAD').tBodies[0].rows[curr_row].cells[cln + 1].getElementsByTagName('INPUT')[0].value = getNodeText(selectSingleNode(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID")[mlt], webSrvcTags[cln]));
                    }
                    catch (e) {
                        document.getElementById('EXTRAD').tBodies[0].rows[curr_row].cells[cln + 1].getElementsByTagName('INPUT')[0].value = "Extensible";
                    }
                }
                curr_row++;
            }

        }
		try{
		document.getElementById("SRV_PRODUCT").value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/SRV_PRODUCT"));
        }
		catch(e){
		}

    }
}

function reloadsrvForm() {
    document.getElementById("NTFY_ACTION").value = "NONE";
    document.getElementById("LBL_NTFY_LOAD_XML").innerText = "Save XML Path";
    document.getElementById("NTFY_FILE_SAVE_PATH").style.visibility = "visible";
    document.getElementById("NTFY_FILE_SAVE_PATH").disabled = true;
    document.getElementById("NTFY_FILE_SAVE_PATH").value = "";
    document.getElementById("NTFY_LOAD_SCREEN_XML").style.visibility = "hidden";
    document.getElementById("NTFY_LOAD_SCREEN_XML").value = "";
    document.getElementById("NTFY_LOAD_SCREEN_XML").disabled = true;
    document.getElementById("SERVICE_NAME").value = "";
    document.getElementById("SERVICE_NAME").disabled = true;
    document.getElementById("close").className = "BUTTONToolbarD";
    document.getElementById("close").disabled = true;
    document.getElementById("exit").className = "BUTTONToolbar";
    document.getElementById("exit").disabled = false;
    document.getElementById("SRV_ACTION").disabled = false;
    var nodes = selectNodes(ServiceDom, ("//RAD_KERNEL"));
    for (var i = 0;i < nodes.length;i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
    ServiceDom = "";
    fnSrvActions();
}

function fn_srv_populate() {
    /* used to populate  data in tables*/
    var tmp = 0;
    var currRow = 0;
    var tableObject = document.getElementById("EXTRAD");
    for (var i = 0;i < tableObject.tBodies[0].rows.length;i++) {
        if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tmp = tmp + 1;
            currRow = i;
        }
    }
    if (tmp > 1) {
        i = 0;
        alertMessage("Select only one row", "I");
        return false;
    }
    else if (tmp == 0) {
        alertMessage("No row  selected", "I");
        return false;
    }

    var callorlaunch = tableObject.tBodies[0].rows[currRow].cells[2].getElementsByTagName("INPUT")[0].value;

    if (callorlaunch == 'Non-Extensible') {
        var fld = tableObject.tBodies[0].rows[currRow].cells[1].getElementsByTagName("INPUT")[0].value;

        loadSubScreenDIV("ChildWin", "RadSrvNExtOperations.jsp?tbName=" + callorlaunch + "&rowid=" + currRow + "&fld=" + fld);

    }

    if (callorlaunch == 'Extensible') {
        var fld = tableObject.tBodies[0].rows[currRow].cells[1].getElementsByTagName("INPUT")[0].value;
        loadSubScreenDIV("ChildWin", "RadSrvExtOperations.jsp?tbName=" + callorlaunch + "&rowid=" + currRow + "&fld=" + fld);
    }
}