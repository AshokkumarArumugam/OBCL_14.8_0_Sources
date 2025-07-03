/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadXsd.js
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
var sortflag;
var scell;
var sortcell;
var goparam = "IMPL_FILE~CONFIG_FILES~WSDL_FILE";
var resresult = "";
var xsdnode = "OPERATION_CODE~OPERATION_DESCRIPTION~FS_REQ_XSD~IO_REQ_XSD~PK_RES_XSD~FS_RES_XSD~FC_FUNCTION_ID~FC_ACTION~DEFAULT_FUNCTION~LOG_REQD~SMS_FUNCTION_ID~SMS_ACTION";
var xsddom2 = "";
var GOdom = "";
var bulkgen = "N";
var modulename = "";
var sername = "";
var serdesc = "";
var log = "";
var countlog = "";
var sucesFiles = 0;
var failedFiles = 0;

function getSchemadetails() {
    schema = parent.jndiName;
    releaseType = parent.relType;
    language = parent.lang;
    document.getElementsByName("LANG_CODE")[0].value = language;
    document.getElementsByName("DEST_XML")[0].value = parent.g_Wrk_Dir;
    if (!fnTestConnection()) {
        return false;
    }
}

function fncontobulk() {
    deleteAll('XSDBULKGEN');
    var conto = document.getElementsByName("CONNECT_TO")[0].value;
    if (conto == "F") {
        document.getElementById("XELEASE_NAME").value = parent.relCode;
    }
    else {
        document.getElementById("XELEASE_NAME").value = "";
        document.getElementById("BTN_XELEASE_NAME").style.visibility = "visible";

    }
}

function fnconto() {
    deleteAll('XSDGEN');
    var conto = document.getElementsByName("CONNECT_TO")[0].value;
    if (conto == "F") {
        document.getElementById("XELEASE_NAME").value = parent.relCode;
        document.getElementById("TYPE_SYSTEM").value = "S";
        document.getElementById("SERVICE_NAME").value = "";
        document.getElementById("SERVICE_DESC").value = "";
        document.getElementById("BTN_XELEASE_NAME").style.visibility = "hidden";
        document.getElementById("XSD_PATH").disabled = false;
        document.getElementById("XSD_PATH1").style.visibility = "visible";
    }
    else {
        document.getElementById("XELEASE_NAME").value = "";
        document.getElementById("SERVICE_NAME").value = "";
        document.getElementById("SERVICE_DESC").value = "";
        document.getElementById("BTN_XELEASE_NAME").style.visibility = "visible";
        document.getElementsByName("VALIDT")[0].style.visibility = "hidden";
        document.getElementById("XSD_PATH").disabled = true;
        document.getElementById("XSD_PATH").value = "";
        document.getElementById("XSD_PATH1").style.visibility = "hidden";
    }
}

function fnlov(e) {
    document.getElementsByName("VALIDT")[0].style.visibility = "hidden";
    deleteAll('XSDGEN');
    if (document.getElementById("XELEASE_NAME").value == "") {
        alertMessage("Please Enter Release Name", "I");
        return false;
    }
    else {
        var conto = document.getElementById("CONNECT_TO").value;
        if (conto == "F")
            LOV_SERVICE_NAME.show_lov('SERVICE_NAME~SERVICE_DESC~', 'frmTCM', '', 'Service Name', 'Service Name~Service Description', 'Service Name~Service Description', e);
        else 
            LOV_WSERVICE_NAME.show_lov('SERVICE_NAME~SERVICE_DESC~', 'frmTCM', 'XELEASE_NAME', 'Service Name', 'Service Name~Service Description', 'Service Name~Service Description', e);
    }
}

function fn_populate_xsd() {
    /* for fetch columns from the table selected   */
    var vali = xsdvalidations();
    if (vali == false)
        return false;
    var conto = document.getElementById("CONNECT_TO").value;
    deleteAll('XSDGEN');
    var sername = document.getElementById("SERVICE_NAME").value;
    var relnme = document.getElementById("XELEASE_NAME").value;
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    if (conto == "F") {
        document.getElementsByName("VALIDT")[0].style.visibility = "visible";
        var queryString = "FETCH@SELECT OPERATION_CODE,OPERATION_DESCRIPTION,FS_REQ_XSD,IO_REQ_XSD,PK_RES_XSD,FS_RES_XSD,FC_FUNCTION_ID,FC_ACTION,DEFAULT_FUNCTION,LOG_REQD,SMS_FUNCTION_ID,SMS_ACTION  FROM gwtm_operations_master  WHERE service_name ='" + sername + "' ";
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    }
    else {
        var queryString = "FETCH@SELECT OPERATION_NAME,OPERATION_DESCRIPTION,FS_REQ_XSD,IO_REQ_XSD,PK_RES_XSD,FS_RES_XSD,FC_FUNCTION_ID,FC_ACTION,DEFAULT_FUNCTION,LOG_REQD,SMS_FUNCTION_ID,SMS_ACTION  FROM XSTM_OPERATION  WHERE service_name ='" + sername + "' and release_name='" + relnme + "' ";
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "EXECUTEQUERY");
    }
    var multRec = fnfetchvalues(radReqDOM, queryString);
    resresult = multRec;
    var tableObj = document.getElementById('XSDGEN');
    for (var sr = 0;sr < multRec.length;sr++) {
        if (multRec[sr] != "") {
            var singleRec = multRec[sr].split("~");
            addNewRow("XSDGEN");
            var flp = 0;
            for (var pnt = 0;pnt < singleRec.length;pnt++) {
                if (pnt == 0 || pnt == 1 || pnt == 6 || pnt == 7) {
                    flp = flp + 1;
                    if (singleRec[pnt] == "null") {
                        tableObj.tBodies[0].rows[sr].cells[flp].getElementsByTagName("INPUT")[0].value = "";
                    }
                    else {
                        tableObj.tBodies[0].rows[sr].cells[flp].getElementsByTagName("INPUT")[0].value = singleRec[pnt];
                    }
                }
            }
        }
    }
    xsddom();
}

function xsddom() {
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = dataXML + "<RAD_FUNCTIONS><SERVICE_NAME/><SERVICE_DESC/><TYPE_SYSTEM/><SOAP_FAULT/></RAD_FUNCTIONS>";
    xsddom2 = loadXMLDoc(dataXML);
    GOdom = xsddom2;
    if (document.getElementById('SOAP_FAULT').checked == true) {
        var SOAP_value = "Y";
    }
    else {
        SOAP_value = "N";
    }
    var xsdnodes = xsdnode.split("~");
    if (bulkgen != "Y") {
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "SERVICE_NAME"), document.getElementById('SERVICE_NAME').value);
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "SERVICE_DESC"), document.getElementById('SERVICE_DESC').value);
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "TYPE_SYSTEM"), document.getElementById('TYPE_SYSTEM').value);
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "SOAP_FAULT"), SOAP_value);
    }
    else {
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "SERVICE_NAME"), sername);
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "SERVICE_DESC"), serdesc);
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "TYPE_SYSTEM"), "S");
        setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS"), "SOAP_FAULT"), SOAP_value);
    }
    if (bulkgen != "Y") {
        var tableObj = document.getElementById('XSDGEN').tBodies[0].rows;
        var rstllen = tableObj.length;
    }
    else {
        var rstllen = resresult.length;
    }
    for (var j = 0;j < rstllen;j++) {
        var tabre = resresult[j].split("~");
        if (tabre[0] != "") {

            var rootnode = selectSingleNode(GOdom, "//RAD_FUNCTIONS");
            var DataSource = GOdom.createElement("GATEWAY_OPERATIONS");
            rootnode.appendChild(DataSource);
            for (var z = 0;z < xsdnodes.length;z++) {
                var DsDetails = GOdom.createElement(xsdnodes[z]);
                DataSource.appendChild(DsDetails);
                DataSource.setAttribute("ID", tabre[0]);
            }

            for (var k = 0;k < xsdnodes.length;k++) {
                if (tabre[k] != "null")
                    setNodeText(selectSingleNode(selectSingleNode(GOdom, "//RAD_FUNCTIONS/GATEWAY_OPERATIONS[@ID='" + tabre[0] + "']"), xsdnodes[k]), tabre[k]);
            }

        }
    }

}

function fnGeneratexsd() {
    var Sxmlformat = parent.Xmlformat;
    parent.Xmlformat = "N";
    if (bulkgen != "Y") {
        var vali = xsdvalidations();
        if (vali == false)
            return false;
        if (document.getElementById('XSDGEN').tBodies[0].rows.length <= 0) {
            alertMessage("No Data Found", "E");
            return false;
        }
    }
    parent.gReqType = "GEN";
    parent.gReqCode = "GENERATE";
    parent.gIsSummary = 0;
    parent.gAction = "";
    parent.gSubFolder = "";
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    var gennode = radReqDOM.createElement("GENERATE");
    bodyNode.appendChild(gennode);
    var goparams = goparam.split("~");
    for (var fln = 0;fln < goparams.length;fln++) {
        var node = radReqDOM.createElement(goparams[fln]);
        gennode.appendChild(node);
        if (bulkgen != "Y") {
            var nodev = document.getElementById(goparams[fln]).checked;
        }
        else {
            var nodev = true;
        }
        if (nodev == true)
            nodev = "Y";
        else 
            nodev = "N";
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/" + goparams[fln]), nodev);
    }
    var frntndFiles = "--##FILE##--";
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(GOdom) + frntndFiles, "RADClientHandler");
    response = frntndFiles + "--##FILE##--" + response;
    if (response != null) {
        var spath = parent.g_Wrk_Dir;
        var parentPath = document.getElementById("DEST_XML").value;
        if (bulkgen == "Y") {
            parent.g_Wrk_Dir = parentPath + "\\" + modulename + "\\Gateway\\Services\\" + sername + "\\";
            if(checkActivex()){ 
                fnfolder(parent.g_Wrk_Dir);
            }

        }
        else {
            parent.g_Wrk_Dir = parentPath + "\\" + document.getElementById("SERVICE_NAME").value;
        }
        var wres = fnwritedata(response, parent.saveformat);
        var files = response.split("--##FILE##--");
        var error = "";
        parent.g_Wrk_Dir = spath;
    }
    if (bulkgen != "Y") {
        var result = files[files.length - 1];
        if (result != false) {
            var logdbmsgs = selectNodes(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR");
            var logmCODE = "";
            var logmMESSAGE = "";
            var log1, log2;
            for (var lb = 0;lb < logdbmsgs.length;lb++) {
                log1 = getNodeText(selectNodes(logdbmsgs[lb], "EDESC")[0]);
                log2 = getNodeText(selectNodes(logdbmsgs[lb], "ECODE")[0]);
                logmMESSAGE = log1 + "," + log2;
                logmCODE = logmCODE + "~" + logmMESSAGE;
            }
            var checkstatus1 = getNodeText(selectSingleNode(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR/ETYPE"));
            alertMessage(logmCODE, checkstatus1);
        }
    }
    parent.Xmlformat = Sxmlformat;
}

function popupedit(tablename, fieldid, cellno, e) {
    var event = window.event || e;
    var obj = "";
    var winParams = new Object();
    var Title = "";
    var recNum =  - 1;
    var textvalue = "";
    var readnly = "";
    var title = "";

    var objStmt = "document.getElementById('" + fieldid + "')";
    obj = eval(objStmt);
    parent.poptextvalue = obj.value;
    parent.popTextObj = obj;
    if (obj.readOnly) {
        parent.popReadOnly = "YES";
    }
    else {
        parent.popReadOnly = "NO";
    }
    title = getInnerText(obj.parentNode.previousSibling);

    parent.loadSubScreenDIV("ChildWin", "RadPopup.jsp?Title=" + title);
}

function fnsorttable(cell) {
    sortcell = cell;
    var tableObj1 = document.getElementById('XSDGEN');
    var tableObj = document.getElementById('XSDGEN');
    var newRows = new Array();

    for (var j = 0;j < tableObj1.tBodies[0].rows.length;j++) {
        newRows[j] = new Array(5);
        for (var k = 0;k < 5;k++) {
            newRows[j][k] = tableObj1.tBodies[0].rows[j].cells[k].getElementsByTagName("INPUT")[0].value;
        }
    }
    if (sortflag == 1 && scell == cell)
        newRows.sort(mySortingup);
    else {
        newRows.sort(mySortingdown);
        scell = cell;
    }

    deleteAll('XSDGEN');

    for (var j = 0;j < newRows.length;j++) {
        addNewRow("XSDGEN");
        for (var k = 0;k < 5;k++) {
            tableObj.tBodies[0].rows[j].cells[k].getElementsByTagName("INPUT")[0].value = newRows[j][k];
        }
    }

}

function mySortingup(a, b) {
    sortflag = 2;
    a = a[sortcell];
    b = b[sortcell];
    return a == b ? 0 : (a < b ? 1 :  - 1)
}

function mySortingdown(a, b) {
    sortflag = 1;
    a = a[sortcell];
    b = b[sortcell];
    return a == b ? 0 : (a > b ? 1 :  - 1)
}

function xsdvalidations() {
    var rel = document.getElementById("XELEASE_NAME").value;
    var ser = document.getElementById("SERVICE_NAME").value;
    var dpath = document.getElementById("DEST_XML").value;
    if (rel == "") {
        parent.alertMessage("Please enter Release Name", "I");
        return false;
    }
    else if (ser == "") {
        parent.alertMessage("Please enter Service Name", "I");
        return false;
    }
}

function fn_validate_xsd() {
    var Path = document.getElementById("XSD_PATH").value;
    path = parent.trim(Path);
    if (path == "") {
        parent.alertMessage("Enter Proper XSD Path", "I");
        return false;
    }
    var vldnodes = "FS_REQ_XSD~IO_REQ_XSD~PK_RES_XSD~FS_RES_XSD";
    vldnodes = vldnodes.split("~");
    document.getElementById("XSD_PATH").value = path;
    if (Path.substring(Path.length - 1) != "\\")
        Path = Path + "\\";

    try {
        var Gatewaynodes = selectNodes(GOdom, "//RAD_FUNCTIONS/GATEWAY_OPERATIONS");
        for (var g = 0;g < Gatewaynodes.length;g++) {
            var OPValue = Gatewaynodes[g].getAttribute("ID");
            var vlflag = 0;
            for (var v = 0;v < vldnodes.length;v++) {
                var filename = getNodeText(selectSingleNode(Gatewaynodes[g], vldnodes[v]));
                if (parent.saveformat == "CLIENT") {
                    if (fnReadFileBulkIE(Path + filename, "") && filename != "") {
                    }
                    else {
                        vlflag++;
                        setNodeText(selectSingleNode(Gatewaynodes[g], vldnodes[v]), "");
                    }
                }
                else {
                    if (javaBulkReadFile(Path + filename, "") && filename != "") {
                    }
                    else {
                        vlflag++;
                        setNodeText(selectSingleNode(Gatewaynodes[g], vldnodes[v]), "");
                    }
                }
            }
            if (vlflag == 4) {
                var node1 = selectSingleNode(GOdom, "//RAD_FUNCTIONS/GATEWAY_OPERATIONS[@ID='" + OPValue + "']");
                node1.parentNode.removeChild(node1);
                var tableObj1 = document.getElementById('XSDGEN');
                for (var j = 0;j < tableObj1.tBodies[0].rows.length;j++) {
                    if (tableObj1.tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value == OPValue) {
                        tableObj1.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = true;
                        delRow('XSDGEN');
                        break;
                    }
                }
            }
        }
    }
    catch (e) {
        parent.alertMessage("error ", "E");
        return false;
    }

}

function fnBulkGeneratexsd(tablet) {
    deleteAll('XSDBULKGEN');
    bulkgen = "Y";
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    var ro = 0;
    var tableObj = document.getElementById(tablet);
    var conto = document.getElementsByName("CONNECT_TO")[0].value;
    var releaname = document.getElementById("XELEASE_NAME").value;
    var destpath = document.getElementById("DEST_XML").value;
    if (conto == "F") {
        var queryString = "FETCH@SELECT DISTINCT(service_name),module_CODE,service_DESC FROM (SELECT a.service_name, b.module_CODE, a.service_DESC FROM Gwtm_Services_Master a, gwtm_operations_master b where a.service_name = b.service_name)";
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    }
    else {
        var queryString = "FETCH@select service_name,module_code,service_description from XSTM_SERVICE where release_name='" + releaname + "' ";
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "EXECUTEQUERY");
    }
    var result1 = fnfetchvalues(radReqDOM, queryString);
    log += "---------------------------------------------------------------------------------------------------------------";
    log += "\n  FILE NAME \t\t\t\t\t STATUS \t\t\t Error Description \t\t \n";
    log += "----------------------------------------------------------------------------------------------------------------\n";
    log += " Start Date Time " + dateDispaly();
    log += "----------------------------------------------------------------------------------------------------------------\n";

    for (var sr1 = 0;sr1 < result1.length;sr1++) {
        var filenos = result1.length - 1;
        if (result1[sr1] != "") {
            var singleRec1 = result1[sr1].split("~");
            sername = singleRec1[0];
            modulename = singleRec1[1];
            serdesc = singleRec1[2];

            parent.gReqType = "APP";
            parent.gReqCode = parent.gAction;
            var radReqDOM = parent.buildRADXml();
            var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
            var tempNode = radReqDOM.createElement("QUERY");
            bodyNode.appendChild(tempNode);

            if (conto == "F") {
                var queryString = "FETCH@SELECT OPERATION_CODE,OPERATION_DESCRIPTION,FS_REQ_XSD,IO_REQ_XSD,PK_RES_XSD,FS_RES_XSD,FC_FUNCTION_ID,FC_ACTION,DEFAULT_FUNCTION,LOG_REQD,SMS_FUNCTION_ID,SMS_ACTION  FROM gwtm_operations_master WHERE service_name ='" + sername + "' ";
                setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
            }
            else {
                var queryString = "FETCH@SELECT OPERATION_NAME,OPERATION_DESCRIPTION,FS_REQ_XSD,IO_REQ_XSD,PK_RES_XSD,FS_RES_XSD,FC_FUNCTION_ID,FC_ACTION,DEFAULT_FUNCTION,LOG_REQD,SMS_FUNCTION_ID,SMS_ACTION  FROM XSTM_OPERATION  WHERE  service_name ='" + sername + "' and release_name='" + releaname + "' ";
                setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "EXECUTEQUERY");
            }
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
            var multRec2 = "";
            try {
                multRec2 = getNodeText(selectSingleNode(response, "//Records")).split(">");
            }
            catch (e) {
                multRec2 = response.substring(9, response.indexOf("</Records>")).split(">");
            }
            try {
                resresult = multRec2;
                xsddom();
                fnGeneratexsd();
                addNewRow(tablet);
                tableObj.tBodies[0].rows[ro].cells[1].getElementsByTagName("INPUT")[0].value = sername;
                tableObj.tBodies[0].rows[ro].cells[2].getElementsByTagName("INPUT")[0].value = "Generated";
                ro = ro + 1;
                sucesFiles = sucesFiles + 1;
                countlog = "\n\nTotal No Of Files                      \t  : " + filenos + "\n";
                countlog += "Total No Of Successfully Generated Files  \t  : " + sucesFiles + "\n";
                countlog += "Total No Of Failed  Files                 \t  : " + failedFiles + "\n";
                log += sername + "\t\t\t\t\t Successful \t\t Generated Successfully...\n";
                fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");

            }
            catch (e) {
                addNewRow(tablet);
                tableObj.tBodies[0].rows[ro].cells[1].getElementsByTagName("INPUT")[0].value = sername;
                tableObj.tBodies[0].rows[ro].cells[2].getElementsByTagName("INPUT")[0].value = "Failed";
                ro = ro + 1;
                failedFiles = failedFiles + 1;
                countlog = "\n\nTotal No Of Files                      \t  : " + filenos + "\n";
                countlog += "Total No Of Successfully Generated Files  \t  : " + sucesFiles + "\n";
                countlog += "Total No Of Failed  Files                 \t  : " + failedFiles + "\n";
                log += sername + "\t\t\t\t\t Failed \t\t Failed ..\n";
                fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");
            }
        }
        countlog = "\nTotal No Of Files                        \t  : " + filenos + "\n";
        countlog += "Total No Of Successfully Generated Files  \t  : " + sucesFiles + "\n";
        countlog += "Total No Of Failed  Files                 \t  : " + failedFiles + "\n";
        fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");

    }
    log += "----------------------------------------------------------------------------------------------------------------\n";
    log += "End Date Time : " + dateDispaly();
    log += "----------------------------------------------------------------------------------------------------------------\n";
    fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");

}

function fnfetchvalues(radReqDOM, queryString) {
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec1 = "";
    try {
        multRec1 = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec1 = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    return multRec1;
}

function dateDispaly() {
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var millsec = currentTime.getMilliseconds();
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var pmam = "";
    if (hours > 11) {
        pmam = "PM";
    }
    else {
        pmam = "AM";
    }

    return month + "/" + day + "/" + year + " " + hours + ":" + minutes + " : " + millsec + " " + pmam + "\n";

}

function fnfolder(filePath) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var filePath1 = filePath.split("\\");
    var path1 = "";
    for (i = 0;i < filePath1.length;i++) {
        path1 = path1 + filePath1[i] + "\\";
        if (!fso.FolderExists(path1)) {
            var subFldr = path1.split("\\");
            subFldr = subFldr[subFldr.length - 2];
            fso.CreateFolder(path1);

        }
    }
}