/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadGIUtils.js
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

var xml3 = " ";
var domPf = " ";
purgeFilter = true;

function PFBasicVals() {
    /* basic validations used in the gi at various places in gi*/

    var roleRights = parent.rolerights;
    var actIndex = document.getElementsByName("ACTION")[0].selectedIndex;
    var actVal = document.getElementsByName("ACTION")[0].options[actIndex].value;

    if (actVal == "LOAD") {
        fngetReadMode("SINGLE");

        document.getElementsByName("LOAD_SCREEN_XML")[0].disabled = false
        document.getElementsByName("BROWSE")[0].disabled = false;
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSE")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("ENTITY_NAME")[0].value = "";
        document.getElementsByName("MODULE_NAME")[0].value = "";
        document.getElementsByName("ENTITY_ID")[0].value = "";
        document.getElementsByName("ENTITY_NAME")[0].disabled = true;
        document.getElementsByName("MODULE_NAME")[0].disabled = true;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
        document.getElementsByName("saveRADXml")[0].disabled = false;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("genFiles")[0].disabled = false;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("depFiles")[0].disabled = false;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("chekinFiles")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = false;

    }
    else if (actVal == "NONE") {
        setInnerText((document.getElementsByName("LBL_LOAD_XML")), "Load Screen Xml");
        document.getElementsByName("ENTITY_NAME")[0].disabled = true;
        document.getElementsByName("MODULE_NAME")[0].disabled = true;
        document.getElementsByName("ENTITY_NAME")[0].value = "";
        document.getElementsByName("MODULE_NAME")[0].value = "";
        document.getElementsByName("ENTITY_ID")[0].value = "";
        document.getElementsByName("LOAD_SCREEN_XML")[0].disabled = true;
        document.getElementsByName("LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("LOAD_SCREEN_XML")[0].value = "";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
        document.getElementsByName("FILE_SAVE_PATH")[0].value = "";
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbarD";
        document.getElementsByName("saveRADXml")[0].disabled = true;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("genFiles")[0].disabled = true;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("depFiles")[0].disabled = true;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("chekinFiles")[0].disabled = true;
        document.getElementsByName("close")[0].className = "BUTTONToolbarD";
        document.getElementsByName("close")[0].disabled = true;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = true;

    }

    else if (actVal == "NEW") {
        setInnerText((document.getElementsByName("LBL_LOAD_XML")), "Load Screen Xml");
        document.getElementsByName("ENTITY_NAME")[0].disabled = false;
        document.getElementsByName("MODULE_NAME")[0].disabled = false;
        document.getElementsByName("LOAD_SCREEN_XML")[0].disabled = true;
        document.getElementsByName("LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
        document.getElementsByName("saveRADXml")[0].disabled = false;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("genFiles")[0].disabled = false;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("depFiles")[0].disabled = false;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("chekinFiles")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = false;
    }

}

function trim(stringToTrim) {
    /* used to trim the data sent*/
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function numberval(id) {
    /*   validation for fields which are of number type*/
    var val = id.value;
    if (val >= 0) {
    }
    else {
        document.getElementById(id.uniqueID).value = "";
        alertMessage("Please enter valid number for " + id.id, "E");
    }
}

function fncheckfieldsdup(tablename) {
    /* used to check for similar fields */
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;

    for (i = 0;i < tablen;i++) {
        tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].disabled = true;
        if (tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].value == "") {
            tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].disabled = false;
        }
        for (j = i + 1;j < tablen;j++) {
            if ((tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].value) == (tab.rows[j].cells[1].getElementsByTagName("INPUT")[0].value)) {
                tab.rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = true;
                delRow(tablename);
                alertMessage("FIELD Already present", "E");
                return;
            }
        }
    }
}

function setPFScreens(screenId) {
    /* to set ecreens in gi*/
    for (var i = 0;i < DivPFArray.length;i++) {
        document.getElementById(DivPFArray[i]).style.display = "none";
    }
    try {
        document.getElementById(screenId).style.display = "block";
    }
    catch (e) {
    }
}

function getPFNodePath(xpathArray) {
    /* getGINodePath will  create pfxpath array */
    var pfxpath = new Array();

    if (xpathArray[0] == "PND") {
        pfxpath[0] = "//PURGE_PREFERENCES";
        pfxpath[1] = "PND";
    }
    else if (xpathArray[0] == "PTD") {
        pfxpath[0] = "//PURGE_TABLES";
        pfxpath[1] = "PTD";
    }
    else if (xpathArray[0] == "PFD") {
        pfxpath[0] = "//PURGE_FILTERS";
        pfxpath[1] = "PFD";
    }
	else if (xpathArray[0] == "PCL") {
        pfxpath[0] = "//PURGE_COMMON_ENTITY";
        pfxpath[1] = "PCL";
    }
    return pfxpath;

}

function createPFMainElements() {
    loadPFdom();
    fndefaultheaderdetails();
}

function fndefaultheaderdetails() {
    /*TO create and set values of main elements in  gi*/

    if (document.getElementById("ACTION").value == "NEW") {
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"), parent.relType);
    }
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ENTITY_NAME")), document.getElementById('ENTITY_NAME').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ENTITY_ID")), document.getElementById('ENTITY_ID').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ENTITY_TYPE")), document.getElementById('ENTITY_TYPE').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ENTITY_MODULE_CODE")), document.getElementById('MODULE_NAME').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ORIGINATION_DATE")), parent.originDate);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/USER_ID")), parent.username);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ENV_CODE")), parent.envCode);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/RELEASE_CODE")), parent.relCode);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/RELEASE_TYPE")), parent.relType);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/LANG_CODE")), parent.lang);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ACTION")), document.getElementById('ACTION').value);

    if (parent.relType == "KERNEL")
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/MODIFIED_IN_KERNEL")), "Y");
    if (parent.relType == "CLUSTER")
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER")), "Y");
    if (parent.relType == "CUSTOM")
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM")), "Y");

}

function loadPFdom() {
    /*TO load basic dom structure for gi*/
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = dataXML + "<RAD_FUNCTIONS><ENTITY_NAME/><ENTITY_MODULE_CODE/><ENTITY_ID/><ENTITY_TYPE/><FUNCTION_ORIGIN/><ACTION/><GEN_ALL/><RELEASE_TYPE/><LANG_CODE/><OPERATION/><ORIGINATION_DATE/><USER_ID/><RELEASE_CODE/><SFR_NO/><SUB_PROJECT/><DDL_REMARKS/><CHECKIN_MODE/><SITE_CODE/><ENV_CODE/><MODIFIED_IN_KERNEL>N</MODIFIED_IN_KERNEL><MODIFIED_IN_CLUSTER>N</MODIFIED_IN_CLUSTER><MODIFIED_IN_CUSTOM>N</MODIFIED_IN_CUSTOM>";
    dataXML = dataXML + "<RAD_KERNEL>";
    dataXML = dataXML + "<RAD_PURGE>";
    dataXML = dataXML + "<PURGE_PREFERENCES><ENTITY_DESCRIPTION/><PURGE_TYPE>D</PURGE_TYPE><PURGE_MODE>E</PURGE_MODE><PURGE_FREQUENCY/><ACTIVE_FLAG/><START_DATE/><PURGE_QUERY/></PURGE_PREFERENCES>";
    dataXML = dataXML + "<PURGE_TABLES/><PURGE_FILTERS><PURGE_FF_FILTER/><FINAL_FILTER/><FINAL_FILTER_VALIDATION/></PURGE_FILTERS><PURGE_COMMON_ENTITY/>";
    dataXML = dataXML + "</RAD_PURGE></RAD_KERNEL></RAD_FUNCTIONS>";
    dom = loadXMLDoc(dataXML);
}

function savePFxml(val, radReqDOM) {
    /* to save the gi radxml  */
    var frntndFiles = "";
    var domforsys = "";
    var ua = navigator.userAgent.toLowerCase();
    // Defaulting hideen clumns and types
    fn_default_tabledetails();

    //
    appendData("");
    logMsg = "";
    errType = "";
    errLogMsg = "";
    var oprtn = document.getElementsByName("OPERATION")[0].value;
    if (document.getElementsByName("ENTITY_ID")[0].value == "") {
        alertMessage("Entity ID Cannot Be Null", "E");
        return false;
    }
    var act = document.getElementsByName("ACTION")[0].value;
    if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1) || (ua.indexOf("opera") !=  - 1)) {
        g_Save_Dir = "";
        parentPath = "";
    }
    else {
        if (parent.g_Wrk_Dir == "CURRENT_DIRECTORY") {
            if (act == "NEW") {
                g_Save_Dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
            }
            else {
                g_Save_Dir = document.getElementsByName("LOAD_SCREEN_XML")[0].value;
                g_Save_Dir = g_Save_Dir.substring(0, (g_Save_Dir.lastIndexOf("\\") + 1))
            }
        }
        else {
            g_Save_Dir = parent.g_Wrk_Dir;
        }
    }
    fileSavePath = g_Save_Dir;
    var len = fileSavePath.length;
    var last_char = fileSavePath.charAt(len - 1);
    if (last_char != "\\") {
        fileSavePath = fileSavePath + "\\";
    }
    if (fileSavePath.indexOf("\\RADXML\\") !=  - 1) {
        var radPath = fileSavePath;
        parentPath = fileSavePath.substring(0, fileSavePath.indexOf("\\RADXML\\") + 1);
    }
    else {
        var radPath = fileSavePath + "RADXML\\";
        parentPath = fileSavePath;
    }

    fndefaultheaderdetails();
    domforsys = getCloneDocElement(dom);
    functionid = document.getElementsByName("ENTITY_ID")[0].value;
    var lang = parent.lang;
    frntndFiles += parent.gBodySeparator + ("RADXML\\" + functionid + "_RAD.xml--") + getXMLString(dom);
    schName = parent.jndiName;
    if (val == "0") {
        document.getElementsByName("OPERATION")[0].value = 'SAVE';
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
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(dom) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        var wres = fnwritedata(response, parent.saveformat);
        if (wres == true) {
            alertMessage("File Saved", "I");
            debug('Succesfully saved File');
            dom = domforsys;
            return true;
        }
        else {
            alertMessage("Failed", "E");
            debug('Failed to save File');
            dom = domforsys;
            return false;
        }
    }
    else {
        var mainArray = new Array();
        dom = domforsys;
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/OPERATION"), oprtn);
        var response = CallCodeGenerator(radReqDOM, getXMLString(dom), frntndFiles);
        if (response != null) {
            response = frntndFiles + "--##FILE##--" + response;
            var files = response.split("--##FILE##--");
            var error = "";
        }
        if (parent.gfnPostStatus != 'S') {
            if (error != "") {
                writeLog(error, 'E');
            }
            else {
                writeLog('Package Generation Failed..', 'E');
            }
            if (errType == "E") {
                var res = fnLaunchLog(logMsg, errLogMsg, errType);
            }
        }
        else {
            var wres = fnwritedata(response, parent.saveformat);
        }
        return files[files.length - 1];
    }
}

function CreatePFdom(val, redId) {
    /*TO   create gi dom */
    var giRecords = "";
    var rootnode;

    if (val == "PTT") {
        rootnode = selectSingleNode(dom, "//PURGE_TABLES");
        giRecords = dom.createElement("TABLES");
        rootnode.appendChild(giRecords);
        var nodeArray = elementArray["TABLES"].split("~");
        for (var i = 0;i < nodeArray.length;i++) {
            var Records = dom.createElement(nodeArray[i]);
            giRecords.appendChild(Records);
            giRecords.setAttribute("ID", redId);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//PURGE_TABLES/PURGE_TABLE[@ID='" + redId + "']"), "TABLE_NAME"), redId);
        if (parent.parent.pkCols != "")
            var pkc = parent.parent.pkCols.split("!");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//PURGE_TABLES/PURGE_TABLE[@ID='" + redId + "']"), "KEY_FIELDS"), pkc[0]);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//PURGE_TABLES/PURGE_TABLE[@ID='" + redId + "']"), "DATA_TYPE"), pkc[1]);
    }
}

function FnEntityid() {
    document.getElementById("ENTITY_ID").value = document.getElementById("MODULE_NAME").value + "P" + document.getElementById("ENTITY_NAME").value;
}

function funcPFPrntTabs() {

    var tabl = document.getElementById("PF_TABLES").tBodies[0];
    var tablen = tabl.rows.length;
    obj1 = tabl.rows[tablen - 1].cells[3].getElementsByTagName('SELECT')[0];
    var result = tabl.rows[tablen - 1].cells[3].getElementsByTagName('SELECT')[0].value;
    obj1.length = 0;
    addOption(obj1, "", "", true);
    var ptab = "";
    for (var i = 0;i < tablen;i++) {
        ptab = tabl.rows[i].cells[1].getElementsByTagName('INPUT')[0].value;
        addOption(obj1, ptab, ptab, false);
    }
}

function fnPfClDataType(tab, rowid) {
    var returArray = new Array();
    try {
        var tableName = tab.parentElement.getElementsByTagName('INPUT')[0].value;
        var rowindex = tab.parentElement.parentElement.rowIndex;
    }
    catch (e) {
        var tableName = tab;
        var rowindex = rowid;
    }
    if (tableName == "") {
        alertMessage("Table Name Is Mandatory", "E");
        return;
    }
    else {
        top.parent.gReqCode = 'UICONTROLLER';
        top.parent.gReqType = "APP";
        var radReqDOM = top.parent.buildRADXml();
        var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R001" + top.parent.gBodySeparator + tableName, "RADClientHandler");

        if (getNodeText(selectSingleNode(response, "//VALIDITY")) == "INVALID") {
            alertMessage("Enter a valid table", "E");
            return false;
        }
        else {
            var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R007" + top.parent.gBodySeparator + tableName, "RADClientHandler");
            try {
                var pkdetails = getXMLString(response);

                if (pkdetails.indexOf("DB Error") !=  - 1) {
                    returArray[0] = "";
                }
                else {
                    returArray[0] = pkdetails.substring(pkdetails.indexOf("<pkfields>") + 10, pkdetails.indexOf("<\/pkfields>"));
                }
            }
            catch (e) {
                returArray[0] = "";
            }
        }
    }

    var tabl = document.getElementById("PF_TABLES").tBodies[0];
	if(returArray[0].split("!")[0] !="")
	{
    tabl.rows[rowindex - 1].cells[5].getElementsByTagName('INPUT')[0].value = returArray[0].split("!")[0];
    tabl.rows[rowindex - 1].cells[6].getElementsByTagName('INPUT')[0].value = returArray[0].split("!")[1];
	}
    fnDefault_columns(tab, rowindex, "PF_TABLES");
}

function fnDefault_columns(tab, rowi, tabled) {

    try {
        var tableName = tab.parentElement.getElementsByTagName('INPUT')[0].value;
        var rowindex = tab.parentElement.parentElement.rowIndex;
        var ptab = tab.parentElement.parentElement.parentElement.parentElement.id;
    }
    catch (e) {
        var tableName = tab;
        var rowindex = rowi;
        var ptab = tabled;
    }
    var queryString = "DEFLT_TABCOLS";
	//var queryString = "FETCH@SELECT COLUMN_NAME,DATA_TYPE,DATA_LENGTH FROM USER_TAB_COLS  WHERE TABLE_NAME ='" + tableName + "' AND HIDDEN_COLUMN='NO'";
    var WhereString = "WHERE TABLE_NAME ='" + tableName + "'";
	parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
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

    var tabl = document.getElementById(ptab).tBodies[0];

    var tabv = "";
    var tabcl = "";
    var clDt = "";
    if (multRec.length > 0)
        for (var i = 0;i < multRec.length - 1;i++) {
            if (i > 0 && multRec[i].split("~")[0] != "") {
                tabv = tabv + "~" + multRec[i].split("~")[0];
                tabcl = tabcl + "~" + multRec[i].split("~")[1];
				if (multRec[i].split("~")[3] != "undefined" && multRec[i].split("~")[3] != "null")
					clDt = clDt + "~" + multRec[i].split("~")[2] + "," + multRec[i].split("~")[3];
				else
                clDt = clDt + "~" + multRec[i].split("~")[2];
			} else if (multRec[i].split("~")[0] != "") {
                tabv = multRec[i].split("~")[0];
                tabcl = multRec[i].split("~")[1];
				if (multRec[i].split("~")[3] != "undefined" && multRec[i].split("~")[3] != "null")
					clDt = multRec[i].split("~")[2] + "," + multRec[i].split("~")[3];
				else
                clDt = multRec[i].split("~")[2];
            }
        }
    tabl.rows[rowindex - 1].cells[9].getElementsByTagName('INPUT')[0].value = tabv;
    tabl.rows[rowindex - 1].cells[10].getElementsByTagName('INPUT')[0].value = tabcl;
    tabl.rows[rowindex - 1].cells[11].getElementsByTagName('INPUT')[0].value = clDt;
}

function createNewNode(nodeName, className) {
    if (typeof (nodeName) != "undefined") {
        var newNode = document.createElement(nodeName);
        if (typeof (className) != "undefined")
            newNode.setAttribute("CLASS", className);
    }
    return newNode;
}

function LoadPFxml() {
    var xml2 = loadxmldata;
    if (!xml2) {
        return false;
    }
    if (xml2.indexOf("RAD_FUNCTIONS") ==  - 1) {
        alertMessage("Load Valid RAD xml File", "E");
        reloadForm();
        return false;
    }
    if (xml2.indexOf("RAD_PURGE") ==  - 1) {
        alertMessage("Load Valid RAD xml File", "E");
        reloadForm();
        return false;
    }
    dom = loadXMLDoc(xml2);
    dom = fnUpdateDom(dom);
    return true;
}

function fndeltabfil() {
    var tabl = document.getElementById("PF_TABLES").tBodies[0];
    var tablen = tabl.rows.length;
    var tabval = "";
    for (i = 0;i < tablen;i++) {
        if (tabl.rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tabval = tabl.rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
            var filter = selectNodes(dom, "//PURGE_FILTERS/PURGE_FILTER[TABLE_NAME='" + tabval + "']");
            fnRemoveChildren(filter);
        }
    }

}

function fnRemoveChildren(node) {
    for (var i = 0;i < node.length;i++) {
        x = node[i];
        x.parentNode.removeChild(x);
    }
}

function FnFilterDetails(tabl) {
    var tmp = 0;
    var rowindex = 0;
    var tabObj = document.getElementById(tabl);
    for (var i = 0;i < tabObj.tBodies[0].rows.length;i++) {
        if (tabObj.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tmp = tmp + 1;
            rowindex = i;
        }
    }
    if (tmp > 1) {
        alertMessage("Select only one Filter", "I");
        return false;
    }
    else if (tmp == 0) {
        alertMessage("Select one Filter", "I");
        return false;
    }

    loadSubScreenDIV("ChildWin", "RadFilterDetails.jsp?rowindex=" + rowindex + "&tabl=" + tabl);
}

function FnTABLEDetails(tabl) {
    var tmp = 0;
    var rowindex = 0;
    var tabObj = document.getElementById(tabl);
    for (var i = 0;i < tabObj.tBodies[0].rows.length;i++) {
        if (tabObj.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tmp = tmp + 1;
            rowindex = i;
        }
    }
    if (tmp > 1) {
        alertMessage("Select only one Filter", "I");
        return false;
    }
    else if (tmp == 0) {
        alertMessage("Select one Filter", "I");
        return false;
    }

    loadSubScreenDIV("ChildWin", "RadTableDetails.jsp?rowindex=" + rowindex + "&tabl=" + tabl);
}

function fnExpression_builder(tablename, fieldid, cellno, e) {
    var event = window.event || e;
    var obj = "";
    var obj1 = "";
    var winParams = new Object();
    var recNum =  - 1;
    var textvalue = "";
    var textvalueq = "";
    var readnly = "";
    if (tablename != "" && cellno != "") {
        if (getRowIndex(event) == 0) {
            recNum = 0;
        }
        else {
            recNum = getRowIndex(event) - 1;
        }
        tab = document.getElementById(tablename);
        obj = tab.tBodies[0].rows[recNum].cells[cellno].getElementsByTagName('INPUT')[0];
        textvalue = obj.value;
        obj1 = tab.tBodies[0].rows[recNum].cells[10].getElementsByTagName('INPUT')[0];
        textvalueq = obj1.value;
        poptextvalue = textvalue;
        poptextvalueqry = textvalueq;
        popTextObj = obj;
        popTextObjqry = obj1;
        popReadOnly = readnly;

    }
    else {
        var objStmt = "document.getElementById('" + fieldid + "')";
        var objStmtq = "document.getElementById('FILTER_QUERY')";

        obj = eval(objStmt);
        obj1 = eval(objStmtq);
        poptextvalue = obj.value;
        poptextvalueqry = obj1.value;
        popTextObj = obj;
        popTextObjqry = obj1;
    }
    loadSubScreenDIV("ChildWin", "RadFilterExpression.jsp");
}

function fnUpdateDom(dom) {
    if (selectNodes(dom, "//PURGE_COMMON_ENTITY").length == 0) {
    var bodyNode = selectSingleNode(dom, "//RAD_PURGE");
    var gennode = dom.createElement("PURGE_COMMON_ENTITY");
    bodyNode.appendChild(gennode);

   // setNodeText(selectSingleNode(dom, "//RAD_PURGE/FINAL_FILTER_VALIDATION"), "N");
    } 
	
	    if (selectSingleNode(dom, "//RAD_FUNCTIONS/ENTITY_TYPE") == null) {
        var Entity_typ = dom.createElement("ENTITY_TYPE");
        var funcNode = selectSingleNode(dom, "//RAD_FUNCTIONS");
        funcNode.insertBefore(Entity_typ,selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"));
        setNodeText(selectSingleNode(funcNode, "ENTITY_TYPE"), "NORMAL");
    }
	
	

    var filter = selectNodes(dom, "//PURGE_FILTERS/PURGE_FILTER");
    for (var i = 0;i < filter.length;i++) {
        var fltype = getNodeText(selectSingleNode(filter[i], "FILTER_TYPE"))
        dom.getElementsByTagName("PURGE_FILTER")[i].setAttribute("ATR", fltype);
    }

    if (selectSingleNode(dom, "//PURGE_FILTERS/FINAL_FILTER_VALIDATION") == null || getNodeText(selectSingleNode(dom, "//PURGE_FILTERS/FINAL_FILTER_VALIDATION")) == null) {
    var bodyNode = selectSingleNode(dom, "//PURGE_FILTERS");
    var gennode = dom.createElement("FINAL_FILTER_VALIDATION");
    bodyNode.appendChild(gennode);

    setNodeText(selectSingleNode(dom, "//PURGE_FILTERS/FINAL_FILTER_VALIDATION"), "N");
    }

    return dom;
}

function fnFinalFilter_builder(tablename, fieldid, cellno, e) {
    var event = window.event || e;
    var obj = "";
    var obj1 = "";
    var winParams = new Object();
    var recNum =  - 1;
    var textvalue = "";
    var textvalueq = "";
    var readnly = "";

    var objStmt = "document.getElementById('" + fieldid + "')";
    var objStmtq = "document.getElementById('FINAL_FILTER_QUERY')";
    obj = eval(objStmt);
    obj1 = eval(objStmtq);
    poptextvalueFF = obj.value;
    poptextvalueFFqry = obj1.value;
    popTextObjFF = obj;
    popTextObjFFqry = obj1;
    loadSubScreenDIV("ChildWin", "RadFilterBuilder.jsp");
}

function fnDefaultFilter() {
    var vali = document.getElementById("FINAL_FILTER_VALIDATION").value;
    if (vali == "C") {
        return;
    }
    var tab_b = document.getElementById("PF_B_FILTERS").tBodies[0].rows;
    var tab_e = document.getElementById("PF_E_FILTERS").tBodies[0].rows;
    var FinalFilterValue_b = "";
    var FinalFilterQuery_b = "";
    var FinalFilterValue_e = "";
    var FinalFilterQuery_e = "";
    var FinalFilterValue = "";
    var FinalFilterQuery = "";

    var expresion_b = "";
    var expresion_e = "";
    var expresion = "";
    var texpr = "";

    for (var i = 0;i < tab_b.length;i++) {
        texpr = fnTexpresion(tab_b, i);
        if (texpr != "") {
            if (i > 0) {
                FinalFilterValue_b = FinalFilterValue_b + " AND " + tab_b[i].cells[1].getElementsByTagName('INPUT')[0].value;
                FinalFilterQuery_b = FinalFilterQuery_b + " AND " + "1=1";
                expresion_b = expresion_b + "\n AND \n" + texpr;
            }
            else {
                FinalFilterValue_b = tab_b[i].cells[1].getElementsByTagName('INPUT')[0].value;
                FinalFilterQuery_b = "1=1";
                expresion_b = texpr;
            }
        }
    }
    for (var i = 0;i < tab_e.length;i++) {
        texpr = fnTexpresion(tab_e, i);
        if (texpr != "") {
            if (i > 0) {
                FinalFilterValue_e = FinalFilterValue_e + " AND " + tab_e[i].cells[1].getElementsByTagName('INPUT')[0].value;
                FinalFilterQuery_e = FinalFilterQuery_e + " AND 1=1";
                expresion_e = expresion_e + "\n AND \n" + texpr;
            }
            else {
                FinalFilterValue_e = tab_e[i].cells[1].getElementsByTagName('INPUT')[0].value;
                FinalFilterQuery_e = "1=1";
                expresion_e = texpr;
            }
        }
    }
    if (FinalFilterValue_b != "" && FinalFilterValue_e != "") {
        FinalFilterValue = FinalFilterValue_b + " AND " + FinalFilterValue_e;
        FinalFilterQuery = FinalFilterQuery_b + " AND " + FinalFilterQuery_e;
        expresion = expresion_b + "\n AND \n" + expresion_e;
    }
    else if (FinalFilterValue_b == "" && FinalFilterValue_e != "") {
        FinalFilterValue = FinalFilterValue_e;
        FinalFilterQuery = FinalFilterQuery_e;
        expresion = expresion_e;

    }
    else if (FinalFilterValue_b != "" && FinalFilterValue_e == "") {
        FinalFilterValue = FinalFilterValue_b;
        FinalFilterQuery = FinalFilterQuery_b;
        expresion = expresion_b;
    }
    if (document.getElementById("PURGE_FF_FILTER").value != "") {
        FinalFilterValue = FinalFilterValue + " AND FREE_FORMAT_FILTER";
        FinalFilterQuery = FinalFilterQuery + " AND 1=1";
        expresion = expresion + "\nAND \n" + document.getElementById("PURGE_FF_FILTER").value;
    }
    document.getElementById("FINAL_FILTER").value = fnCorrectFilterVals(FinalFilterValue);
    document.getElementById("FINAL_FILTER_QUERY").value = fnCorrectFilterVals(FinalFilterQuery);
    document.getElementById("FINAL_FILTER_EXPRESSION").value = fnCorrectFilterVals(expresion);
    document.getElementById("FINAL_FILTER_VALIDATION").value = "N";

}

function fnCorrectFilterVals(tdata) {
    tdata = trim(tdata);
    if (tdata.substring(tdata.length - 4, tdata.length - 1) == "AND" || tdata.indexOf("AND") == 0) {
        tdata = tdata.replace("AND", "");
    }
    tdata = trim(tdata);
    return tdata;
}

function replaceAll(str, searchChar, replaceChar) {
    var retStr = "";
    for (var loopIndex = 0;loopIndex < str.length;loopIndex++) {
        if (str.substr(loopIndex, 1) == searchChar)
            retStr += replaceChar;
        else 
            retStr += str.substr(loopIndex, 1);
    }
    //for    
    return retStr;
}

function fnDefaultBuilder() {

    var Testbuilder = document.getElementById("FINAL_FILTER").value;
    Testbuilder = Testbuilder.split(" ");

    var tab_b = document.getElementById("PF_B_FILTERS").tBodies[0].rows;
    var tab_e = document.getElementById("PF_E_FILTERS").tBodies[0].rows;
    var chklength = 0;
    var testlength = Testbuilder.length;
    for (var n = 0;n < testlength;n++) {
        var n1 = Testbuilder[n];
        for (var i = 0;i < tab_b.length;i++) {
            if (tab_b[i].cells[1].getElementsByTagName('INPUT')[0].value == n1) {
                chklength++;
            }
        }
        for (var i = 0;i < tab_e.length;i++) {
            if (tab_e[i].cells[1].getElementsByTagName('INPUT')[0].value == n1) {
                chklength++;
            }
        }

        if (n1 == "AND" || n1 == "OR" || n1 == "(" || n1 == ")") {
            chklength++;
        }
    }
    if (testlength - 1 != chklength) {
        document.getElementById("FINAL_FILTER_VALIDATION").value = "N";
    }
    fnDefaultFilter();
}
var firsttime = true;

function fnTexpresion(tab, rowid) {

    if (tab[rowid].cells[4].getElementsByTagName('SELECT')[0].value == "T") {
        return "";
    }
    var exp1 = tab[rowid].cells[5].getElementsByTagName('INPUT')[0].value;
    var exp2 = tab[rowid].cells[6].getElementsByTagName('SELECT')[0].value;
    var exp3 = tab[rowid].cells[7].getElementsByTagName('INPUT')[0].value;
    var dtype = tab[rowid].cells[4].getElementsByTagName('SELECT')[0].value;
    if (exp3 == "") {
        exp3 = "?";
    }
    var exp3a = exp3;
    if (dtype == "VARCHAR2") {
        if (exp3a.split("~").length > 1) {
            var exp4 = exp3a.split("~");
            for (var i = 0;i < exp4.length;i++) {
                if (i > 0) {
                    exp3 = exp3 + "~" + "'" + exp4[i] + "'";
                }
                else {
                    exp3 = "'" + exp4[i] + "'";
                }
            }
        }
        else {
            exp3 = "'" + exp3 + "'";
        }
        exp3a = exp3;
    }
    else if (dtype == "DATE") {
        if (exp3a.split("~").length > 1) {
            var exp4 = exp3a.split("~");
            for (var i = 0;i < exp4.length;i++) {
                if (i > 0) {
                    exp3 = exp3 + "~" + "TO_DATE('" + exp4[i] + "','RRRR-MM-DD')";
                }
                else {
                    exp3 = "TO_DATE('" + exp4[i] + "','RRRR-MM-DD')";
                }
            }
        }
        else {
            exp3 = "TO_DATE('" + exp3 + "','RRRR-MM-DD')";
        }
        exp3a = exp3;
    }
    if (exp2 == "EQUALS")
        exp2 = "=";
    else if (exp2 == "NOT EQUALS")
        exp2 = "<>";
    else if (exp2 == "GREATER THAN")
        exp2 = ">";
    else if (exp2 == "LESSER THAN")
        exp2 = "<";
    else if (exp2 == "GREATER OR EQUAL")
        exp2 = ">=";
    else if (exp2 == "LESSER OR EQUAL")
        exp2 = "<=";
    else if (exp2 == "IS NULL")
        exp2 = "IS NULL";
    else if (exp2 == "IS NOT NULL")
        exp2 = "IS NOT NULL";
    else if (exp2 == "BETWEEN") {
        exp2 = "BETWEEN";
        exp3a = exp3a.split("~");
        for (var i = 0;i < exp3a.length;i++) {

            if (i > 0) {
                exp3 = exp3 + " AND " + exp3a[i];
            }
            else {
                exp3 = exp3a[i];
            }
        }
    }
    else if (exp2 == "NOT BETWEEN") {
        exp2 = "NOT BETWEEN";
        exp3a = exp3a.split("~");
        for (var i = 0;i < exp3a.length;i++) {

            if (i > 0) {
                exp3 = exp3 + " AND " + exp3a[i];
            }
            else {
                exp3 = exp3a[i];
            }
        }
    }
    else if (exp2 == "LIKE") {
        exp2 = "LIKE";
    }
    else if (exp2 == "NOT LIKE") {
        exp2 = "NOT LIKE";
    }
    else if (exp2 == "IN") {
        exp2 = "IN";
        exp3a = exp3a.split("~");
        for (var i = 0;i < exp3a.length;i++) {

            if (i > 0) {
                exp3 = exp3 + "," + exp3a[i] + "";
            }
            else if (i == 0) {
                exp3 = "(" + exp3a[i];
            }
        }
        exp3 = exp3 + ")";
    }
    else if (exp2 == "NOT IN") {
        exp2 = "NOT IN";
        exp3a = exp3a.split("~");
        for (i = 0;i < exp3a.length;i++) {

            if (i > 0) {
                exp3 = exp3 + "," + exp3a[i] + " ";
            }
            else if (i == 0) {
                exp3 = "(" + exp3a[i];
            }
        }
        exp3 = exp3 + ")";
    }
    var expres = exp1 + " " + exp2 + " " + exp3;
    return expres;
}

function fncheckname() {
    var tab_b = document.getElementById("PF_B_FILTERS").tBodies[0].rows;
    var tab_e = document.getElementById("PF_E_FILTERS").tBodies[0].rows;
    for (var i = 0;i < tab_b.length;i++) {
        tab_b[i].cells[1].getElementsByTagName('INPUT')[0].disabled = true;
        tab_b[i].cells[1].getElementsByTagName('INPUT')[0].className = "TXTro";
    }
    for (var i = 0;i < tab_e.length;i++) {
        tab_e[i].cells[1].getElementsByTagName('INPUT')[0].disabled = true;
        tab_e[i].cells[1].getElementsByTagName('INPUT')[0].className = "TXTro";
    }
}

function fnValidateExpresion() {
    var expr = document.getElementById("FINAL_FILTER").value;
    var texpr = "";
    var tab_b = document.getElementById("PF_B_FILTERS").tBodies[0].rows;
    var tab_e = document.getElementById("PF_E_FILTERS").tBodies[0].rows;
    for (var i = 0;i < tab_b.length;i++) {
        var fltnm = tab_b[i].cells[1].getElementsByTagName('INPUT')[0].value;
        if (tab_b[i].cells[4].getElementsByTagName('SELECT')[0].value == "T")
            continue;
        if (i > 0)
            texpr = "\n" + fnTexpresion(tab_b, i) + "\n";
        else 
            texpr = fnTexpresion(tab_b, i) + "\n";

        expr = expr.replace(fltnm, texpr);
    }
    for (var i = 0;i < tab_e.length;i++) {
        var fltnm = tab_e[i].cells[1].getElementsByTagName('INPUT')[0].value;
        if (tab_e[i].cells[4].getElementsByTagName('SELECT')[0].value == "T")
            continue;
        if (i > 0)
            texpr = "\n" + fnTexpresion(tab_e, i) + "\n";
        else 
            texpr = fnTexpresion(tab_e, i) + "\n";
        expr = expr.replace(fltnm, texpr);
    }
    expr = expr.replace("FREE_FORMAT_FILTER", "\n" + document.getElementById("PURGE_FF_FILTER").value);

    document.getElementById("FINAL_FILTER_EXPRESSION").value = fnCorrectFilterVals(expr);
}

function fn_default_tabledetails() {
    var tabl = document.getElementById("PF_TABLES").tBodies[0];
    var tablen = tabl.rows.length;
    var tabval = "";
    for (i = 0;i < tablen;i++) {
        if (tabl.rows[i].cells[9].getElementsByTagName('INPUT')[0].value == "" || tabl.rows[i].cells[9].getElementsByTagName('INPUT')[0].value == "TEST_SUCCESS") {
            var tabv = tabl.rows[i].cells[1].getElementsByTagName('INPUT')[0].value;
            var pk = tabl.rows[i].cells[5].getElementsByTagName('INPUT')[0].value;
            if (pk == "") {
                fnPfClDataType(tabv, i + 1);
            }
            else {
                fnDefault_columns(tabv, i + 1, "PF_TABLES");
            }
        }
    }
}

function fn_Refresh_tabledetails() {
    var tabl = document.getElementById("PF_TABLES").tBodies[0];
    var tablen = tabl.rows.length;
    var tabval = "";
    for (i = 0;i < tablen;i++) {
       var tabv = tabl.rows[i].cells[1].getElementsByTagName('INPUT')[0].value; 
       fnPfClDataType(tabv, i + 1);  
    }
}

function fnCommonEntityArgs(val, callorlaunch) {

    var tmp = 0;
    var rowindex = 0;
    var scrArg = "";
    var tabObj = document.getElementById(callorlaunch);
    if (callorlaunch != "TAB") {
        for (var i = 0;i < tabObj.tBodies[0].rows.length;i++) {
            if (tabObj.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                tmp = tmp + 1;
                rowindex = i;
            }
        }
        if (tmp > 1) {
            i = 0; 
                alertMessage("Select only one Entity", "I");  
            return false;
        }
        else if (tmp == 0) { 
                alertMessage("No Entity selected", "I"); 
            return false;
        }
    } 
    
       var calFrmName = tabObj.tBodies[0].rows[rowindex].cells[1].getElementsByTagName("INPUT")[0].value;
        var calFrmArgs = tabObj.tBodies[0].rows[rowindex].cells[3].getElementsByTagName("INPUT")[0].value;
		
    calFrmName = calFrmName; 
    ctrlrwIndx = rowindex;
    if (val == 'ScrArgs') {
		scrArg = getCommonEntityArg(calFrmName); 
        calFrmArgs = calFrmArgs;
        if (scrArg == "null") {
            scrArg = "";
        }
        else {
            scrArg = scrArg;
        }
        parentcalFrmArgs = calFrmArgs;
        parentscrArg = scrArg;
        parentcalFrmName = calFrmName; 
        loadSubScreenDIV("ChildWin", "RadCommonEntityArgs.jsp");

    } 
} 

function getCommonEntityArg(tableName) { 
		
    var queryString = "STTM_COMMON_PURGE_ENTITY";
	//var queryString = "FETCH@SELECT SRC_ARG_NAMES FROM STTM_COMMON_PURGE_ENTITY  WHERE COMMON_ENTITY ='" + tableName + "'";
	var WhereString = "WHERE COMMON_ENTITY ='" + tableName + "'";
	top.parent.gReqCode = 'UICONTROLLER';
    top.parent.gReqType = "APP";
    var radReqDOM = top.parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

    var response = top.parent.fnPost(getXMLString(radReqDOM) +  top.parent.gBodySeparator + "");
    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
       
    }
	
	 return multRec[0];
    
}

function fn_Display_Arguments(){

if(document.getElementById('ENTITY_TYPE').value=="COMMON"){
	document.getElementById("DIV_PF_ARGDESC").style.display = "block";
	}
	else {
	deleteAll("PF_ARGDESC");
	document.getElementById("DIV_PF_ARGDESC").style.display = "none";	
	}

}

function fn_populate_Tables_PF_ARGDESC() {
var node = "PURGE_TABLE";
var nodename = "TABLE_NAME"; 
    var obj = "";
    var tab = document.getElementById("PF_ARGDESC").tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        for (var i = 0;i < tablen;i++) {

            if (tab.rows[i].cells[0].getElementsByTagName('INPUT')[0].checked == true) {
                obj = tab.rows[i].cells[2].getElementsByTagName('SELECT')[0];
                obj.options.length = 0;
                
                    tab.rows[i].cells[2].getElementsByTagName('SELECT')[0].options.length = 0;
                 
                var blks = selectNodes(dom, "//" + node + "");
                var blkslen = blks.length;
                addOption(obj, "", "", true);
                for (var j = 0;j < blkslen;j++) {
                    addOption(obj, getNodeText(selectSingleNode(blks[j], nodename)), getNodeText(selectSingleNode(blks[j], nodename)), false);
                }
            }
        }

    }
}

function fn_populate_Columns_PF_ARGDESC(tableName, blkCell, fldCell, evnt) {

    var rowNum = getRowIndex(evnt);
    var tablerows = document.getElementById(tableName).tBodies[0].rows.length;
    var blkName = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[blkCell].getElementsByTagName("SELECT")[0].value;
    var blks = getNodeText(selectSingleNode(dom, "//PURGE_TABLE[@ID='" + blkName + "']/TABLE_COLUMNS"));
	 blks=blks.split("~");
    var blkslen = blks.length;
    obj = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[fldCell].getElementsByTagName("SELECT")[0];

    obj.options.length = 0;
    addOption(obj, "", "", true);
    for (var i = 0;i < blkslen;i++) {
        addOption(obj,  blks[i] , blks[i] , false);
    }

}