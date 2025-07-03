/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadSmdradsc.js
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

var domB4CFAddition = null;
var cbSysJsGenerator = false;
var cbFlag = false;

function fnCreateSysFiles_Old(radXml, jsPath) {
    dbDataDOM = fnGetTempDOM();
    dbDataDOM = loadXMLDoc(radXml);
    if (selectNodes(dbDataDOM, "//RAD_FUNCTIONS/RAD_KERNEL").length > 0) {
        return false;
    }
    gJsPath = jsPath;
    callingFrom = 'SYSJS';
    cbSysJsGenerator = true;
    return fnPreSave();
}

function fnCreateUIXMLFiles_Old(radXml, uiPath) {
    dbDataDOM = fnGetTempDOM();
    dbDataDOM = loadXMLDoc(radXml);
    gUiPath = uiPath;
    callingFrom = 'UITool';
    return fnPreSave();
}

function fnPreSave() {

    if (callingFrom != 'UITool' && callingFrom != 'SYSJS') {
        return;
    }
    else {
        gfuncid = function_id;
        fnAddLovChildNodes();//Done
    }

    var xml = fnTransform_Old("XSLold/2oldXML.xsl");//Done
    if (navigator.appName == navAppName()) {
        xml = loadXMLDoc(xml);
    }
    else {
        xml = loadXMLDoc(getXMLString(xml).toString());
    }
    var domTemp = "";
    domTemp = xml;
    if (navigator.appName == navAppName() ) {
        var smryNode = selectNodes(domTemp, "//SCREEN[@NAME='SUMMARY']");
    }
    else {
        var smryNode = selectNodes(domTemp, "//screen[@name='SUMMARY']");
    }
    for (var smn = 0;smn < smryNode.length;smn++) {
        smryNode[smn].parentNode.removeChild(smryNode[smn]);
    }

    var jsFileContent = fnSaveUIXml(xml);
    if (callingFrom != 'SYSJS') {
        fnRemoveLovChildNodes();
        var uixmlcontent = fnSaveEngXml_Old(xml, "");
    }
    if (callingFrom == 'UITool')
        return uixmlcontent;
    if (callingFrom == 'SYSJS')
        return jsFileContent;
    var radXml = fileSavePath + gfuncid + "_RAD.xml";

    var callformContents = " ";
    var callforms = selectNodes(dbDataDOM, "//RAD_CALLFORM");
    for (var callformCnt = 0;callformCnt < callforms.length;callformCnt++) {
        var callform = callforms[callformCnt];
        var callformFuncId = getNodeText(selectSingleNode(callform, "CALLFORM_FUCNTIONID"));
        var callformPath = document.getElementsByName("SOURCE_XML")[0].value + "\\CALLFORM_PATH\\";
        if (callformPath.indexOf("\\") !=  - 1)
            callformPath = replaceAllChar_Old(callformPath, "\\", "\/");
        if (callformPath.lastIndexOf("\/") != callformPath.length - 1)
            callformPath = callformPath + "\/";
        var callformRadXmlFile = callformPath + callformFuncId + "_Rad.xml";
        var callformRadXml = fnReadFile_Old(callformRadXmlFile);
        callformContents += callformRadXml;
        if (callformCnt != callforms.length - 1)
            callformContents += "@@@@@";
    }
    var schema = parent.jndiName;

    return false;
}

function fnSaveEngXml_Old(xml) {
    xml = fnMakeStdBtnBlk1(xml);

    xml = fnGetTabAllHgt1(xml);
    var uixmlpath = gUiPath;
    var lang = document.getElementsByName("LANG_CODE")[0].value;
    var transXml = fnGetTranslatedXml_Old(lang, xml);
    return getXMLString(transXml);

}

function fnCreateFileForUixml(Path, filename, contents, isInc) {
    var fso = null;
    var tf = null;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    try {
        if (!(fso.FolderExists(Path))) {
            alertMessage("Invalid Path for file " + filename);
            return false;
        }
        if (fso.FileExists(Path + filename))
            fso.DeleteFile(Path + filename, true);
        //"ForAppending" - 8
        if (!isInc) {
            tf = fso.CreateTextFile(Path + filename, true, true);
        }
        else {
            tf = fso.OpenTextFile(Path + filename, 8, true, true);
        }
        tf.Write(contents);
        tf.Close();
        return true;
    }
    catch (e) {
        alertMessage("error in writing to file");
        return false;
    }
    tf.Close();

}

function fnGetTranslatedXml_Old(lang, xmlStr) {
    var tmpDom = "";
    tmpDom = xmlStr;
    return translateUIXML_Old(tmpDom);
}

function translateUIXML_Old(xmlDoc, reqst) {
    var functionID = function_id;
    var translationQuery = getTranslationQuery_Old(xmlDoc, functionID);
    if (translationQuery == "")
        return xmlDoc;

    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R015" + parent.gBodySeparator + translationQuery, "RADClientHandler");

    var responseXML = response;
    var error = selectSingleNode(responseXML, "/ROOT/ERROR");
    if (reqst == "LBLS") {
        return responseXML;
    }
    if (error != null && selectSingleNode(responseXML, "/ROOT/LABEL_CODES")== null) {

        return xmlDoc;
    }

    var labelCodes = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_CODES")).split("~");

    var labelTexts = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_TEXTS")).split("~");
    if (labelCodes != '') {
        var respLBL = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_CODES")) + "~";
        var strtIndex = translationQuery.indexOf("LBL_");
        var endIndex = translationQuery.indexOf("')");
        var lblsArr = translationQuery.substring(strtIndex, endIndex).split("','");
        var noLblDesc = "";
        for (var i = 0;i < lblsArr.length;i++) {
            if (respLBL.indexOf(lblsArr[i] + "~") ==  - 1)
                noLblDesc += lblsArr[i] + "~";
        }

        if (noLblDesc != "") {
            writeLog("No Maintenance For Label Codes.. ", "");
            noLblDesc = noLblDesc.split("~");
            for (j = 0;j < noLblDesc.length;j++) {
                writeLog(noLblDesc[j], "");
            }
            writeLog("", "E");
        }

    }

    for (var i = 0;i < labelCodes.length;i++) {
        var nodes = selectNodes(xmlDoc, "(//LABEL[normalize-space(text())='" + labelCodes[i] + "']) | (//LEGEND[normalize-space(text())='" + labelCodes[i] + "']) | (//OPTION[normalize-space(text())='" + labelCodes[i] + "']) | (//@TITLE[(.) ='" + labelCodes[i] + "']) | (//TITLE[normalize-space(text())='" + labelCodes[i] + "']) | (//BUTTON_LABEL[normalize-space(text())='" + labelCodes[i] + "'])");
        for (var j = 0;j < nodes.length;j++) {
            setNodeText(nodes[j], labelTexts[i]);
        }
    }

    var nodes = selectNodes(xmlDoc, "//LOV/REDUCTION_FLD_LABELS | //LOV/COL_HEADING");
    for (var j = 0;j < nodes.length;j++) {
        if (getNodeText(nodes[j]) != "") {
            if (trim(getNodeText(nodes[j])).indexOf('~') !=  - 1) {
                var tempCodes = getNodeText(nodes[j]).split('~');
                var respText = fnGetLabelTexts(tempCodes, labelCodes, labelTexts);
                setNodeText(nodes[j], respText.substring(0, respText.length - 1));
            }
            else {
                var respText = fnGetLabelText(getNodeText(nodes[j]), labelCodes, labelTexts);
                setNodeText(nodes[j], respText);
            }
        }
    }
    return xmlDoc;
}

function fnGetLabelTexts(source, lCodes, lTexts) {
    var responseText = "";
    for (var k = 0;k < source.length;k++) {
        if (trim(source[k]) == '') {
            responseText += "~";
        }
        else {
            for (var i = 0;i < lCodes.length;i++) {
                if (source[k] == lCodes[i]) {
                    responseText += lTexts[i] + "~";
                    break;
                }
            }
        }
    }
    return responseText;
}

function fnGetLabelText(source, lCodes, lTexts) {
    var responseText = "";
    for (var i = 0;i < lCodes.length;i++) {
        if (source == lCodes[i]) {
            responseText += lTexts[i];
            break;
        }
    }
    return responseText;
}

function getTranslationQuery_Old(xmlDoc, functionID) {

    var language = document.getElementsByName("LANG_CODE")[0].value;
    var queryScreens = getScreenLabelsQuery_Old();
    var queryFields = getFieldLabelsQuery_Old(functionID);
    var blockLabels = getBlockTitleQuery_Old(functionID);
    var partitionFieldSetFields = getPartitionFieldSetQuery_Old(functionID);
    var summaryQueryFields = getSummaryFieldLabelsQuery_Old(functionID);
    var summaryButtons = getSummaryButtonLabelsQuery_Old(functionID);
    var query = "WHERE LANGUAGE_CODE = '" + language + "' AND ";
    var queryString = queryScreens + "|" + queryFields + "|" + summaryQueryFields + "|" + summaryButtons + "|" + blockLabels + "|" + partitionFieldSetFields;
    var nodes = selectNodes(xmlDoc, "(" + queryString + ")");
    var whereClause = makeWhereClause_Old(functionID, nodes);

    if (whereClause != "") {
        query += "(" + whereClause + ") ORDER BY DECODE(FUNCTION_ID,'COMMON',NULL,FUNCTION_ID) NULLS LAST";
        return query;
    }
    else 
        return "";
}

function getScreenLabelsQuery_Old() {

    var predicate = "//FORM/SCREEN/";
    var tags = new Array("@TITLE", "TAB/PAGE/ACCESSKEY", "TAB/PAGE/LABEL", "SUBSCREEN/FORM/LABEL");

    var queryScreens = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        queryScreens += "|" + "(" + predicate + tags[index] + ")";
    }
    return queryScreens;

}

function getFieldLabelsQuery_Old(functionID) {
    var predicate = "//FORM/BLOCK/FIELD/";
    var tags = new Array("LABEL", "ACCESSKEY", "ALT", "LEGEND", "POPUPEDIT/TITLE", "OPTION", "OPTION/LABEL", "LOV/COL_HEADING", "LOV/REDUCTION_FLD_LABELS", "LOV/TITLE", "FIELD/LABEL", "FIELD/OPTION", "FIELD/OPTION/LABEL", "FIELD/ACCESSKEY", "FIELD/ALT", "FIELD/LEGEND", "FIELD/POPUPEDIT/TITLE", "FIELD/LOV/COL_HEADING", "FIELD/LOV/REDUCTION_FLD_LABELS", "FIELD/LOV/TITLE");
    var queryFields = "(" + predicate + tags[0] + ")";
    for (var index = 1;index < tags.length;index++) {
        queryFields += "|" + "(" + predicate + tags[index] + ")";
    }

    return queryFields;
}

function getBlockTitleQuery_Old(functionID) {
    var predicate = "//FORM/BLOCK/";
    var tags = new Array("LABEL");
    var blockTitle = "(" + predicate + tags[0] + ")";
    for (var index = 1;index < tags.length;index++) {
        blockTitle += "|" + "(" + predicate + tags[index] + ")";
    }

    return blockTitle;
}

function getPartitionFieldSetQuery_Old(functionID) {
    var predicate = "//FORM/SCREEN/TAB/PAGE/SECTION/PARTITION/";
    var tags = new Array("LABEL");
    var blockTitle = "(" + predicate + tags[0] + ")";
    return blockTitle;
}

function getSummaryFieldLabelsQuery_Old(functionID) {
    var predicate = "//FORM/SUMBLOCK/";
    var tags = new Array("FIELD/LABEL", "FIELD/POPUPEDIT/TITLE", "FIELD/OPTION", "FIELD/OPTION/LABEL", "FIELD/LOV/COL_HEADING", "FIELD/LOV/REDUCTION_FLD_LABELS", "LEGENDS/LABEL", "LEGENDS/OPTION");

    var summaryQueryFields = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        summaryQueryFields += "|" + "(" + predicate + tags[index] + ")";
    }

    return summaryQueryFields;
}

function getSummaryButtonLabelsQuery_Old(functionID) {
    var predicate = "//FORM/";
    var tags = new Array("SUMBUTTONS/BUTTON/BUTTON_LABEL");

    var summaryButtons = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        summaryButtons += "|" + "(" + predicate + tags[index] + ")";
    }

    return summaryButtons;
}

function makeWhereClause_Old(functionID, nodes) {
    var whereClause = "";
    var labelCodes = new Array();

    if (nodes.length > 0) {
        whereClause = "( (FUNCTION_ID='" + functionID + "' OR FUNCTION_ID = 'COMMON' ) AND ITEM_NAME IN (";

        for (var index = 0;index < nodes.length;index++) {
            //sundar added for title attribute
            if (getNodeText(nodes[index]) == '')
                continue;
            var label = getNodeText(nodes[index]);
            //if already added to where clause do not add again
            if (label != '') {
                var labels = label.split('~');
                if (labels.length > 0) {
                    for (var i = 0;i < labels.length;i++) {
                        if (labelCodes[labels[i]] == undefined) {
                            labelCodes[labels[i]] = "";
                            whereClause += "'" + labels[i] + "',";
                        }
                    }
                }
            }
        }

        whereClause = whereClause.substring(0, whereClause.length - 1) + ") )";
    }

    return whereClause;
}

function fnRemoveLovChildNodes() {
    var remChlds = selectNodes(dbDataDOM, "(//REDUCTION_FLDS) | (//REDUCTION_FLD_LABELS) | (//DATA_TYPES) | (//RET_FLDS) | (//COLUMN_HEADING) | (//BIND_VARS)");
    for (var rmc = 0;rmc < remChlds.length;rmc++) {
        remChlds[rmc].parentNode.removeChild(remChlds[rmc]);
    }
}

function fnAddLovChildNodes() {
    var domTemp = fnGetTempDOM();

    var lovNodes = selectNodes(dbDataDOM, "//RAD_LOVS");
    for (var i = 0;i < lovNodes.length;i++) {
        var lovDetailNodes = selectNodes(lovNodes[i], "RAD_LOV_DETAILS");
        var rednFieldsXml = "";
        var rednFldLabelsXml = "";
        var datatypes = "";
        var retFlds = "";
        var colHeading = "";
        var bindVarNodeXml = fnGetBindVarNode(lovNodes[i]);

        domTemp = loadXMLDoc("<BIND_VARS>" + bindVarNodeXml + "</BIND_VARS>");
        lovNodes[i].insertBefore(selectSingleNode(domTemp, "BIND_VARS"), null);

        for (var j = 0;j < lovDetailNodes.length;j++) {
            if (rednFieldsXml != "")
                rednFieldsXml += "~";
            if (getNodeText(selectSingleNode(lovDetailNodes[j], "REDN_FLD_NAME")) != "") {
                rednFieldsXml += getNodeText(selectSingleNode(lovDetailNodes[j], "REDN_FLD_NAME"));
                rednFieldsXml += "!" + getNodeText(selectSingleNode(lovDetailNodes[j], "REDN_FLD_TYPE"));
                rednFieldsXml += "!" + getNodeText(selectSingleNode(lovDetailNodes[j], "QUERY_COLS"));
            }
            else 
                rednFieldsXml = rednFieldsXml.substring(0, rednFieldsXml.length - 1);

            if (rednFldLabelsXml != "" && getNodeText(selectSingleNode(lovDetailNodes[j], "REDN_FLD_LABEL")) != "")
                rednFldLabelsXml += "~";

            rednFldLabelsXml += getNodeText(selectSingleNode(lovDetailNodes[j], "REDN_FLD_LABEL"));

            if (datatypes != "")
                datatypes += "~";

            datatypes += getNodeText(selectSingleNode(lovDetailNodes[j], "DATATYPE"));

            if (retFlds != "")
                retFlds += "~";

            retFlds += getNodeText(selectSingleNode(lovDetailNodes[j], "RETURN_FLD_NAME"));

            if (colHeading != "")
                colHeading += "~";

            colHeading += getNodeText(selectSingleNode(lovDetailNodes[j], "COL_HEADING"));

        }
        domTemp = loadXMLDoc("<REDUCTION_FLDS>" + rednFieldsXml + "</REDUCTION_FLDS>");
        lovNodes[i].insertBefore(selectSingleNode(domTemp, "REDUCTION_FLDS"), null);

        domTemp = loadXMLDoc("<REDUCTION_FLD_LABELS>" + rednFldLabelsXml + "</REDUCTION_FLD_LABELS>");
        lovNodes[i].insertBefore(selectSingleNode(domTemp, "REDUCTION_FLD_LABELS"), null);

        domTemp = loadXMLDoc("<DATA_TYPES>" + datatypes + "</DATA_TYPES>");
        lovNodes[i].insertBefore(selectSingleNode(domTemp, "DATA_TYPES"), null);

        domTemp = loadXMLDoc("<RET_FLDS>" + retFlds + "</RET_FLDS>");
        lovNodes[i].insertBefore(selectSingleNode(domTemp, "RET_FLDS"), null);

        domTemp = loadXMLDoc("<COLUMN_HEADING>" + colHeading + "</COLUMN_HEADING>");
        lovNodes[i].insertBefore(selectSingleNode(domTemp, "COLUMN_HEADING"), null);
    }
}

function fnTransform_Old(xslName) {
    xmlData = dbDataDOM;
    var xslProc;
    var xslt = "";
    var xslDoc = "";
    xslDoc = loadXSLFile(xslName);
    var xmlDoc = ""
    xmlDoc = dbDataDOM;
    xslPro = transform(xmlDoc, xslDoc, "");
    return xslPro;
}

function fnSaveUIXml(xml) {

    var arrParentDsc = new Array();
    var pDaraSrcNode = selectNodes(dbDataDOM, "//RAD_DATASOURCES");

    var noOfMainFormDatasources = pDaraSrcNode.length;
    for (var dLength = 0;dLength < pDaraSrcNode.length;dLength++) {
        var l_Temp = getNodeText(selectSingleNode(pDaraSrcNode[dLength], "DATASRC_NAME"));
        arrParentDsc[l_Temp] = l_Temp;
    }

    var pSrcNode = selectNodes(dbDataDOM, "//RAD_SCREENS");

    var noOfMainFormScreens = pSrcNode.length;
    for (var sLength = 0;sLength < pSrcNode.length;sLength++) {
        var scrTemp = pSrcNode[sLength].getAttribute("ID");
        arrParentScr[scrTemp] = scrTemp;

    }
    if (callingFrom == '' || callingFrom == 'SYSJS')
        var jsFileContent = saveScripts_Old(xml);

    if (selectNodes(dbDataDOM, "//RAD_FUNCTIONS/SCREEN_TYPE").length > 0) {
        screenType = getNodeText(selectNodes(dbDataDOM, "//RAD_FUNCTIONS/SCREEN_TYPE")[0]);
    }

    if (screenType == "MAINTENANCE" || screenType == "TRANSACTION") {
        if (selectNodes(dbDataDOM, "//RAD_DATASOURCES[@ID > '" + noOfMainFormDatasources + "']").length > 0) {
            var noMnFrmDtrs = selectNodes(dbDataDOM, "//RAD_DATASOURCES[@ID > '" + noOfMainFormDatasources + "']");
            for (var fd = 0;fd < noMnFrmDtrs.length;fd++) {
                noMnFrmDtrs[fd].parentNode.removeChild(noMnFrmDtrs[fd]);
            }
        }
    }

    if (selectNodes(dbDataDOM, "//RAD_SCREENS[@ID > '" + noOfMainFormScreens + "']").length > 0) {
        var remScrNds = selectNodes(dbDataDOM, "//RAD_SCREENS[@ID > '" + noOfMainFormScreens + "']");
        for (var scn = 0;scn < remScrNds.length;scn++) {
            remScrNds[scn].parentNode.removeChild(remScrNds[scn]);
        }
    }

    xml = fnMakeStdBtnBlk1(xml);
    xml = fnGetTabAllHgt1(xml);

    return jsFileContent;

}

function fnMakeStdBtnBlk1(xml) {
    var uixml = "";
    uixml = loadXMLDoc(getXMLString(xml));
    if (navigator.appName == navAppName() ) {
        var scrNodes = selectNodes(uixml, "//SCREEN[@NAME != 'SUMMARY']");

        for (var scrCnt = 0;scrCnt < scrNodes.length;scrCnt++) {
            var scrNode = scrNodes[scrCnt];
            var scrName = scrNodes[scrCnt].getAttribute("NAME");
            var stdBtnImgBlk = selectSingleNode(uixml, "//BLOCK[@SCREEN = '" + scrName + "' and ID = 'BLK_STD_BUTTONS_IMG']");
            if (!stdBtnImgBlk) {
                var stdBtnNodes = selectNodes(uixml, "//BLOCK[@SCREEN = '" + scrName + "' and ID != 'BLK_STD_BUTTONS_IMG']/FIELD[NAME = 'BTN_OK' or NAME = 'BTN_EXIT']");
                if (stdBtnNodes.length > 0) {
                    var stdBtnBlkNode = dbDataDOM.createElement("BLOCK");
                    var blkIdNode = dbDataDOM.createElement("ID");
                    setNodeText(blkIdNode, 'BLK_STD_BUTTONS_IMG');
                    stdBtnBlkNode.appendChild(blkIdNode);
                    var scrName = "CVS_MAIN";
                    for (var btnCnt = 0;btnCnt < stdBtnNodes.length;btnCnt++) {
                        var btnNode = stdBtnNodes[btnCnt];
                        scrName = btnNode.parentNode.getAttribute("SCREEN");
                        if (scrName == 'SUMMARY')
                            continue;
                        stdBtnBlkNode.appendChild(btnNode.cloneNode(true));
                        btnNode.parentNode.removeChild(btnNode);
                    }
                    stdBtnBlkNode.setAttribute("SCREEN", scrName);
                    stdBtnBlkNode.setAttribute("TYPE", "Single Entry");
                    selectSingleNode(uixml, "//FORM").appendChild(stdBtnBlkNode);
                }
            }
        }
    }
    else {
        var scrNodes = selectNodes(uixml, "//screen[@name != 'SUMMARY']");

        for (var scrCnt = 0;scrCnt < scrNodes.length;scrCnt++) {
            var scrNode = scrNodes[scrCnt];
            var scrName = scrNodes[scrCnt].getAttribute("name");
            var stdBtnImgBlk = selectSingleNode(uixml, "//block[@screen = '" + scrName + "' and id = 'BLK_STD_BUTTONS_IMG']");
            if (!stdBtnImgBlk) {
                var stdBtnNodes = selectNodes(uixml, "//block[@screen = '" + scrName + "' and id != 'BLK_STD_BUTTONS_IMG']/field[name = 'BTN_OK' or name = 'BTN_EXIT']");
                if (stdBtnNodes.length > 0) {
                    var stdBtnBlkNode = dbDataDOM.createElement("block");
                    var blkIdNode = dbDataDOM.createElement("id");
                    setNodeText(blkIdNode, 'BLK_STD_BUTTONS_IMG');
                    stdBtnBlkNode.appendChild(blkIdNode);
                    var scrName = "CVS_MAIN";
                    for (var btnCnt = 0;btnCnt < stdBtnNodes.length;btnCnt++) {
                        var btnNode = stdBtnNodes[btnCnt];
                        scrName = btnNode.parentNode.getAttribute("screen");
                        if (scrName == 'SUMMARY')
                            continue;
                        stdBtnBlkNode.appendChild(btnNode.cloneNode(true));
                        btnNode.parentNode.removeChild(btnNode);
                    }
                    stdBtnBlkNode.setAttribute("screen", scrName);
                    stdBtnBlkNode.setAttribute("type", "Single Entry");
                    selectSingleNode(uixml, "//form").appendChild(stdBtnBlkNode);
                }
            }
        }
    }
    return uixml;
}

function fnGetTabAllHgt1(xml) {
    var uixml = "";
    uixml = xml;
    if (navigator.appName == navAppName() ) {
        var scrNodes = selectNodes(uixml, "/FORM/SCREEN");
        for (var scrCnt = 0;scrCnt < scrNodes.length;scrCnt++) {
            var scrNode = scrNodes[scrCnt];
            var scrName = scrNode.getAttribute("NAME");
            if (scrName != 'SUMMARY') {
                var fldInTabAllCnt = 0;
                var blocksInTabAllCnt = selectNodes(uixml, "/FORM/BLOCK[ID != 'BLK_STD_BUTTONS_IMG' and @SCREEN = '" + scrName + "']");
                if (blocksInTabAllCnt.length > 0)
                    for (var blkCnt = 0;blkCnt < blocksInTabAllCnt.length;blkCnt++) {
                        var blkType = blocksInTabAllCnt[blkCnt].getAttribute("TYPE");
                        if (blkType != 'Multiple Entry') {
                            var fldNodes = selectNodes(blocksInTabAllCnt[blkCnt], "FIELD[@TABPAGE = 'All']");
                            if (fldNodes.length > 0) {
                                fldInTabAllCnt++;
                                break;
                            }
                        }
                        else {
                            if (blocksInTabAllCnt[blkCnt].getAttribute("TABPAGE") == 'All') {
                                fldInTabAllCnt++;
                                break;
                            }
                        }
                    }
                if (fldInTabAllCnt > 0) {
                    var tabAllNode = uixml.createElement("TABPAGE_ALL");
                    tabAllNode.setAttribute("HEIGHT", "75");
                    var labelNode = uixml.createElement("LABEL");
                    setNodeText(labelNode, 'All');
                    tabAllNode.appendChild(labelNode);
                    selectSingleNode(uixml, "/FORM/SCREEN[@NAME = '" + scrName + "']").appendChild(tabAllNode);
                }
                else {
                    var tabAllNode = uixml.createElement("TABPAGE_ALL");
                    tabAllNode.setAttribute("HEIGHT", "0");
                    var labelNode = uixml.createElement("LABEL");
                    setNodeText(labelNode, 'All');
                    tabAllNode.appendChild(labelNode);
                    selectSingleNode(uixml, "/FORM/SCREEN[@NAME = '" + scrName + "']").appendChild(tabAllNode);
                }
            }
        }
    }
    else {
        var scrNodes = selectNodes(uixml, "/form/screen");
        for (var scrCnt = 0;scrCnt < scrNodes.length;scrCnt++) {
            var scrNode = scrNodes[scrCnt];
            var scrName = scrNode.getAttribute("name");
            if (scrName != 'SUMMARY') {
                var fldInTabAllCnt = 0;
                var blocksInTabAllCnt = selectNodes(uixml, "/form/block[id != 'BLK_STD_BUTTONS_IMG' and @screen = '" + scrName + "']");
                if (blocksInTabAllCnt.length > 0)
                    for (var blkCnt = 0;blkCnt < blocksInTabAllCnt.length;blkCnt++) {
                        var blkType = blocksInTabAllCnt[blkCnt].getAttribute("type");
                        if (blkType != 'Multiple Entry') {
                            var fldNodes = selectNodes(blocksInTabAllCnt[blkCnt], "field[@tabpage = 'All']");
                            if (fldNodes.length > 0) {
                                fldInTabAllCnt++;
                                break;
                            }
                        }
                        else {
                            if (blocksInTabAllCnt[blkCnt].getAttribute("tabpage") == 'All') {
                                fldInTabAllCnt++;
                                break;
                            }
                        }
                    }
                if (fldInTabAllCnt > 0) {
                    var tabAllNode = uixml.createElement("tabpage_all");
                    tabAllNode.setAttribute("height", "75");
                    var labelNode = uixml.createElement("label");
                    setNodeText(labelNode, 'All');
                    tabAllNode.appendChild(labelNode);
                    selectSingleNode(uixml, "/form/screen[@name = '" + scrName + "']").appendChild(tabAllNode);
                }
                else {
                    var tabAllNode = uixml.createElement("tabpage_all");
                    tabAllNode.setAttribute("height", "0");
                    var labelNode = uixml.createElement("label");
                    setNodeText(labelNode, 'All');
                    tabAllNode.appendChild(labelNode);
                    selectSingleNode(uixml, "/form/screen[@name = '" + scrName + "']").appendChild(tabAllNode);
                }
            }
        }
    }
    return uixml;
}

function getCallFormDataSources_Old(callFormNode, node) {

    var callFormFunctionId = getNodeText(selectSingleNode(callFormNode, "CALLFORM_FUCNTIONID"));
    var callFormPath = filePathsArry[callFormFunctionId + "_RAD.xml"];
    if (callFormPath != undefined) {
        if (callFormPath.indexOf("--") !=  - 1) {
            callFormPath = callFormPath.replace("--", "");
        }
        if (callingFrom == 'SYSJS') {
            var callFormRadFile = "";
            if (document.getElementById("RAD_UIGEN__SRC_FOLDER_PATH")) {
                callFormRadFile = document.getElementById("RAD_UIGEN__SRC_FOLDER_PATH").value + "\\" + callFormFunctionId + "_RAD.xml";
            }
            else {
                callFormRadFile = callFormPath;
            }
        }

        else var callFormRadFile = callFormPath;
        var radFlname = function_id + "_RAD.xml";
        var xmlCallFormRad = "";
        if (callFormRadFile != "undefined") {
            xmlCallFormRad = javaBulkReadFile(callFormRadFile, "");

        }
        xmlCallFormRad = loadXMLDoc(xmlCallFormRad);
        var DataSrcNodes = selectNodes(xmlCallFormRad, node);

        return DataSrcNodes;
    }
    else {
        fnShowResult('bulkresult', radFlname, subFldrName, 'N', "Callforms Not Available");
        log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Callforms Not Found...\n";
        failedFiles = failedFiles + 1;
        return false;
    }
}

function getCallFormParentInfo_Old(callFormNode) {
    var callFormParent = getNodeText(selectSingleNode(callFormNode, "CALLFROM_PARENT"));
    var callFormRelation = getNodeText(selectSingleNode(callFormNode, "CALLFROM_RELATION"));
    var callFormRelType = getNodeText(selectSingleNode(callFormNode, "CALLFORM_RELATION_TYPE"));
    var info = callFormParent + "~" + callFormRelation + "!" + callFormRelType;
    return info;
}

function saveScripts_Old(xml) {
    arrDataSrcMapping = new Array();
    arrTabList = new Array();
    arrMultipleEntryBlockIDs = new Array();

    uixmlRev = loadXMLDoc(getXMLString(xml));
    var javaPath = gJsPath;
    var scriptpath = javaPath;
    var incPath = javaPath;
    var comIncPath = javaPath;
    var auditFlds = "";

    if (selectNodes(dbDataDOM, "//RAD_FUNCTIONS/SCREEN_TYPE").length > 0) {
        screenType = getNodeText(selectNodes(dbDataDOM, "//RAD_FUNCTIONS/SCREEN_TYPE")[0]);
    }
    if (screenType == 'MAINTENANCE' || screenType == 'NEWMAINTENANCE')
        auditFlds = "MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~MOD_NO~RECORD_STAT~AUTH_STAT~ONCE_AUTH~";
    else {
        auditFlds = "MAKERID~MAKERSTAMP~CHECKERID~CHECKERSTAMP~";
        if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']")) {
            if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/REVERSAL") && getNodeText(selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/REVERSAL")) == '-1')
                auditFlds = auditFlds + "REVR_MAKERID~REVR_CHECKERID~REVR_MAKERSTAMP~REVR_CHECKERSTAMP~";
            if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/AUTH_STATUS") && getNodeText(selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/AUTH_STATUS")) == '-1')
                auditFlds = auditFlds + "AUTHSTAT~";
            if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/CONTRACT_STATUS") && getNodeText(selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/CONTRACT_STATUS")) == '-1')
                auditFlds = auditFlds + "CONTSTAT~";
            if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/COLLECTION_STATUS") && getNodeText(selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/COLLECTION_STATUS")) == '-1')
                auditFlds = auditFlds + "COLLECTION_STATUS~";
            if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/PAYMENT_STATUS") && getNodeText(selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/PAYMENT_STATUS")) == '-1')
                auditFlds = auditFlds + "PAYMENT_STATUS~";
            if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/PROCESS_STATUS") && getNodeText(selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/PROCESS_STATUS")) == '-1')
                auditFlds = auditFlds + "PROCESSTAT~";
            if (selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/DEAL_STATUS") && getNodeText(selectSingleNode(uixmlRev, "//BLOCK[ID = 'BLK_AUDIT']/DEAL_STATUS")) == '-1')
                auditFlds = auditFlds + "DEAL_STATUS~";
        }
    }
    if (getNodeText(selectSingleNode(dbDataDOM, "//RAD_FUNCTIONS/AUDIT_BLK_REQD")) == 'N')
        auditFlds = "";
    gFuncid = getNodeText(selectNodes(dbDataDOM, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
    var nodesTab = selectNodes(dbDataDOM, "//RAD_TABS[TAB_TYPE!='HEADER']");
    for (var i = 0;i < nodesTab.length;i++)
        arrTabList[i] = getNodeText(selectSingleNode(nodesTab[i], "TAB_ID"));

    var msgArr = new Array();
    if (screenType == "MAINTENANCE" || screenType == "TRANSACTION") {
        var callFormNodes = selectNodes(dbDataDOM, "//RAD_FUNCTIONS/RAD_CALLFORM");
        for (var k = 0;k < callFormNodes.length;k++) {
            var datasrcNodesCallFrm = getCallFormDataSources_Old(callFormNodes[k], "//RAD_DATASOURCES");
            if (datasrcNodesCallFrm && datasrcNodesCallFrm.length == 0) {
                return false;
            }
            var callFormInfo = getCallFormParentInfo_Old(callFormNodes[k]);

            var callFormParent = callFormInfo.substring(0, callFormInfo.indexOf("~"));
            var callFormRelation = callFormInfo.substring(callFormInfo.indexOf("~") + 1, callFormInfo.indexOf("!"));
            var callFormRelType = callFormInfo.substring(callFormInfo.indexOf("!") + 1, callFormInfo.length);
            var callFormParentDataSrcNode = datasrcNodesCallFrm[0];

            setNodeText(selectSingleNode(datasrcNodesCallFrm[0], "//PARENT_DATASRC"), callFormParent);
            setNodeText(selectSingleNode(datasrcNodesCallFrm[0], "//RELATION_WITH_PARENT"), callFormRelation);

            datasrcNodesCallFrm = fnImportNode(dbDataDOM, datasrcNodesCallFrm);

            for (var m = 0;m < datasrcNodesCallFrm.length;m++) {
                if (navigator.appName == navAppName()) {
                    dbDataDOM.documentElement.insertBefore(datasrcNodesCallFrm[m], null);
                }
                else {
                    dbDataDOM.documentElement.appendChild(datasrcNodesCallFrm[m]);
                }
            }

        }

        fnReassignIdsToNodes(selectNodes(dbDataDOM, "//RAD_DATASOURCES"));
    }

    var nodesDatasources = selectNodes(dbDataDOM, "//RAD_DATASOURCES");

    var nodesMultipleEntryDatasources = selectNodes(dbDataDOM, "//RAD_DATA_BLOCKS[VIEW_TYPE='Multiple Entry']");

    if (screenType == "MAINTENANCE" || screenType == "TRANSACTION") {
        fnAddCallFormScrens();
        fnReassignIdsToNodes(selectNodes(dbDataDOM, "//RAD_SCREENS"));
    }

    for (var i = 0;i < nodesMultipleEntryDatasources.length;i++) {
        var mutileEntryDataSrcName = getNodeText(selectSingleNode(nodesMultipleEntryDatasources[i], "DATASRC_NAME"));
        arrMultipleEntryBlockIDs[i] = "BLK_" + mutileEntryDataSrcName;
    }

    for (var i = 0;i < nodesDatasources.length;i++) {

        var strDatasrcName = getNodeText(selectSingleNode(nodesDatasources[i], "DATASRC_NAME"));
        if (selectSingleNode(nodesDatasources[i], "DATASRC_ALIAS")) {
            var aliasName = getNodeText(selectSingleNode(nodesDatasources[i], "DATASRC_ALIAS"));
            if (aliasName != "")
                strDatasrcName = strDatasrcName + "__" + aliasName;
        }
        msgArr[i] = strDatasrcName;
        arrDataSrcMapping[i] = strDatasrcName;
        arrDataSrcMapping[strDatasrcName] = getNodeText(selectSingleNode(nodesDatasources[i], "PARENT_DATASRC")) + (getNodeText(selectSingleNode(nodesDatasources[i], "PARENT_DATASRC")) == "" ? "" : "~" + getNodeText(selectSingleNode(nodesDatasources[i], "RELATION_TYPE")));

        var nodesRadFields = selectNodes(nodesDatasources[i], "RAD_FIELDS[FIELD_TYPE!='LABEL']");
        var fldLstArray = new Array();
        var strFieldList = "";
        var k = 0;
        for (var j = 0;j < nodesRadFields.length;j++) {

            if (selectNodes(dbDataDOM, "//RAD_BLK_FIELDS[@Identifier = '" + nodesRadFields[j].getAttribute("Identifier") + "' and normalize-space(DBC) != '']").length > 0) {
                var fldDbc = getNodeText(selectSingleNode(nodesRadFields[j], "DATAFIELD"));
                if (!fldLstArray[fldDbc]) {
                    fldLstArray[k] = fldDbc;
                    fldLstArray[fldDbc] = 1;
                    k++;
                }
            }
        }
        for (var l = 0;l < k;l++) {
            strFieldList = strFieldList + fldLstArray[l] + "~";
        }

        var parentDSrc = getNodeText(selectSingleNode(nodesDatasources[i], "PARENT_DATASRC"));
        if (parentDSrc != "") {
            if (selectSingleNode(dbDataDOM, "//RAD_DATASOURCES[DATASRC_NAME = '" + parentDSrc + "']/DATASRC_ALIAS")) {
                var parentAlias = getNodeText(selectSingleNode(dbDataDOM, "//RAD_DATASOURCES[DATASRC_NAME = '" + parentDSrc + "']/DATASRC_ALIAS"));
                if (parentAlias != "")
                    parentDSrc = parentDSrc + "__" + parentAlias;
            }
        }
        var dsrcName = getNodeText(selectSingleNode(nodesDatasources[i], "DATASRC_NAME"));
        if (selectSingleNode(nodesDatasources[i], "DATASRC_ALIAS")) {
            var alias_ds = getNodeText(selectSingleNode(nodesDatasources[i], "DATASRC_ALIAS"));
            if (alias_ds != "")
                dsrcName = dsrcName + "__" + alias_ds;
        }

        var auditdsrcName = getNodeText(selectSingleNode(dbDataDOM, "//SEL_AUDIT_DATASRC"));
        if (dsrcName == auditdsrcName || (auditdsrcName == '' && parentDSrc == ''))
            strFieldList += auditFlds;
        var isControl = 0;
        if (selectSingleNode(nodesDatasources[i], "IS_QUERYSRC") != null)
            var strFieldListPrefix = '<FN ISQUERY="' + (getNodeText(selectSingleNode(nodesDatasources[i], "IS_QUERYSRC")) == 'Y' ? 1 : 0) + '" ';

        if (selectSingleNode(nodesDatasources[i], "IS_CONTROLDS") != null)
            isControl = getNodeText(selectSingleNode(nodesDatasources[i], "IS_CONTROLDS")) == 'Y' ? 1 : 0;
        strFieldListPrefix += 'ISCONTROL="' + isControl + '" ';
        strFieldListPrefix += 'PARENT="' + parentDSrc + '" ';
        strFieldListPrefix += 'RELATION="' + getNodeText(selectSingleNode(nodesDatasources[i], "RELATION_WITH_PARENT")) + '" ';
        strFieldListPrefix += 'TYPE="' + strDatasrcName + '">';
        var strFieldListSuffix = "</FN>";
        strFieldList = strFieldListPrefix + strFieldList.substring(0, strFieldList.length - 1) + strFieldListSuffix;
        strFieldList = replaceAllChar_Old(strFieldList, '\n', ' ');
        msgArr[strDatasrcName] = strFieldList;
    }

    var strLov = "";

    var nodesLov = selectNodes(dbDataDOM, "//RAD_LOVS");
    var lovScriptElem = "";
    for (var i = 0;i < nodesLov.length;i++) {

        var lovName = getNodeText(selectSingleNode(nodesLov[i], "LOV_NAME"));
        var lovQuery = getNodeText(selectSingleNode(nodesLov[i], "LOV_QUERY"));
        var lovForm = getNodeText(selectSingleNode(nodesLov[i], "FORM_NAME"));
        var lovTitle = getNodeText(selectSingleNode(nodesLov[i], "FORM_TITLE"));
        var datapgsz = getNodeText(selectSingleNode(nodesLov[i], "DATA_PG_SIZE"));
        var fetchrows = getNodeText(selectSingleNode(nodesLov[i], "FETCH_ROWS"));
        var lovBindVars = getNodeText(selectSingleNode(nodesLov[i], "BIND_VARS"));
        if (cbSysJsGenerator == true || cbFlag == true) {
            if (nodesLov[i].getElementsByTagName("AUTO_LOV_REQ").length > 0) {
                var autoLOVRequired = getNodeText(selectSingleNode(nodesLov[i], "AUTO_LOV_REQ"));
            }
            else {
                var autoLOVRequired = "Y";
            }
        }
        var nodesLovDet = selectNodes(nodesLov[i], "RAD_LOV_DETAILS");
        var lovRednFlds = "";
        var lovDatatype = "";
        var lovRetFlds = "";
        var lovColHeader = "";

		  //vinit
        var indexFetcher = "";
        var searchFetcher = "";
        var finallovstr = "";
        //vinit ends
        
        //lov detail elements
        for(var j=0;j<nodesLovDet.length;j++)
        {
            if (selectSingleNode(nodesLovDet[j], "REDN_FLD_FLAG")) {
                if (getNodeText(selectSingleNode(nodesLovDet[j], "REDN_FLD_FLAG")) == 'Y') {
                    lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "QUERY_COLS")) + "!";
                    lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "REDN_FLD_TYPE")) + "!";
                    lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "REDN_FLD_NAME")) + "~";
                }
          }else{
                lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "QUERY_COLS")) + "!";
                lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "REDN_FLD_TYPE")) + "!";
                lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "REDN_FLD_NAME")) + "~";
            }
            lovDatatype += getNodeText(selectSingleNode(nodesLovDet[j], "DATATYPE")) + "~";
            lovRetFlds += getNodeText(selectSingleNode(nodesLovDet[j], "RETURN_FLD_NAME")) + "~";
            lovColHeader += getNodeText(selectSingleNode(nodesLovDet[j], "COL_HEADING")) + "~";
		  
		   //VINIT
		   if(nodesLovDet[j].getElementsByTagName("REDN_FLD_FLAG")[0] !== null && nodesLovDet[j].getElementsByTagName("REDN_FLD_FLAG")[0].text != ""&&nodesLovDet[j].getElementsByTagName("REDN_FLD_FLAG")[0].text == 'Y')
		   {
            if(nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0] !== null && nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text != ""&& nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text=='Y')
          {
          indexFetcher += nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text + "~"; 
                    
          if(nodesLovDet[j].getElementsByTagName("MIN_SEARCH_CHAR_LEN")[0] !== null && nodesLovDet[j].getElementsByTagName("MIN_SEARCH_CHAR_LEN")[0].text != "")
          {
          searchFetcher += nodesLovDet[j].getElementsByTagName("MIN_SEARCH_CHAR_LEN")[0].text + "~";
          
                   
          if(nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text == 'Y' && nodesLovDet[j].getElementsByTagName("MIN_SEARCH_CHAR_LEN")[0]!=null &&  nodesLovDet[j].getElementsByTagName("MIN_SEARCH_CHAR_LEN")[0].text != "")
          {
          finallovstr += nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text +"!"+ nodesLovDet[j].getElementsByTagName("MIN_SEARCH_CHAR_LEN")[0].text + "~";
          }
          }
          }
           else if(nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0] !== null && nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text != ""&& nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text == 'N')
          {
          finallovstr += nodesLovDet[j].getElementsByTagName("IS_INDEXED")[0].text + "~";
          }
          }
//vinit ends
        }

        lovQuery = replaceAllChar_Old(lovQuery, '\n', ' ');
		lovQuery="";
        lovScriptElem += 'var ' + lovName + ' = ';
        lovScriptElem += 'new lov("' + lovQuery + '","';
        lovScriptElem += lovRednFlds.substring(0, lovRednFlds.length - 1) + '","';
        lovScriptElem += lovDatatype.substring(0, lovDatatype.length - 1) + '","';
        lovScriptElem += lovRetFlds.substring(0, lovRetFlds.length - 1) + '","';
        lovScriptElem += lovTitle + '","';
        lovScriptElem += lovColHeader.substring(0, lovColHeader.length - 1) + '","';
        lovScriptElem += lovForm + '","';
        lovScriptElem += lovBindVars + '","';
        lovScriptElem += fetchrows + '","';
        lovScriptElem += datapgsz + '","';
         //vinit starts
        if (cbSysJsGenerator == true || cbFlag == true) {
            lovScriptElem += 'ORACLE","~"," ","';
           // lovScriptElem += autoLOVRequired + '");\r\n';
           lovScriptElem +=  autoLOVRequired +'\"' + ',"' ;
           lovScriptElem += finallovstr.substring(0,finallovstr.length-1) +  '");\r\n';
        } else {
           // lovScriptElem += 'ORACLE","~");\r\n';
           // lovScriptElem += 'ORACLE","~");
            lovScriptElem += 'ORACLE","~"' + "," + '\"' + finallovstr.substring(0,finallovstr.length-1) + '");\r\n';
        }
        
     //vinit ends
    }
    var strLOV = lovScriptElem;
    var strScripts = fnGetScriptCodeForDetailScreen_Old(msgArr, strLOV, xml);

    return strScripts;
}

function fnReassignIdsToNodes(nodes) {
    for (var i = 0;i < nodes.length;i++)
        nodes[i].setAttribute("ID", i + 1);
}

function fnAddCallFormScrens() {
    domB4CFAddition = dbDataDOM;
    var callFormNodes = selectNodes(dbDataDOM, "//RAD_FUNCTIONS/RAD_CALLFORM");
    for (var k = 0;k < callFormNodes.length;k++) {
        var screenNodesCallFrm = getCallFormDataSources_Old(callFormNodes[k], "//RAD_SCREENS");
        for (var scrnIndex = 0;scrnIndex < screenNodesCallFrm.length;scrnIndex++) {

            if (navigator.appName == navAppName()) {
                dbDataDOM.documentElement.insertBefore(screenNodesCallFrm[scrnIndex], null);
            }
            else {
                dbDataDOM.documentElement.appendChild(screenNodesCallFrm[scrnIndex]);
            }
        }
    }

}

function replaceAllChar_Old(str, searchChar, replaceChar) {
    var retStr = "";
    for (var loopIndex = 0;loopIndex < str.length;loopIndex++) {
        if (str.substr(loopIndex, 1) == searchChar)
            retStr += replaceChar;
        else 
            retStr += str.substr(loopIndex, 1);
    }
    return retStr;
}

function fnGetScriptCodeForDetailScreen_Old(parrMessage, pstrLOV, xml) {
    var strScriptForDetailScreen = "";

    strScriptForDetailScreen += fnGetCopyrightInfo("", "", gFuncid + "_SYS.js", "", "");
    strScriptForDetailScreen += fnGetCodeForFCJXML_Old(parrMessage);
    if (getNodeText(selectNodes(dbDataDOM, "//RAD_FUNCTIONS/SUMMARY_REQD")[0]) == "Y") {
        strScriptForDetailScreen += fnGetCodeForFCJXMLForSummary_Old(xml);
        var tableName = getNodeText(selectNodes(dbDataDOM, "//RAD_SUMMARY/RSLT_DATASRC")[0]);
        var defaultWhereClauseOrderBy = "";
        var defaultWhereClause = '';
        if (selectNodes(dbDataDOM, "//RAD_SUMMARY_WHERECLAUSE").length > 0) {
            var defaultWhereClauseNodes = selectNodes(dbDataDOM, "//RAD_SUMMARY_WHERECLAUSE");
            for (var whereCnt = 0;whereCnt < defaultWhereClauseNodes.length;whereCnt++) {
                var colName = getNodeText(selectSingleNode(defaultWhereClauseNodes[whereCnt], "COL_NAME"));
                var colValue = getNodeText(selectSingleNode(defaultWhereClauseNodes[whereCnt], "COL_VALUE"));
                if (trim(colValue) != "") {
                    if (cbSysJsGenerator == true || cbFlag == true) {
                        if (colValue.indexOf("mainWin") !=  - 1) {
                            colValue = "mainWin" + colValue.substring(colValue.lastIndexOf("."));
                        }
                    }
                    if (defaultWhereClause != "")
                        defaultWhereClause += "~";
                    defaultWhereClause += colName + ":" + colValue;
                }

                var selText = getNodeText(selectSingleNode(defaultWhereClauseNodes[whereCnt], "ORDER_BY"));
                if (selText != "") {
                    if (defaultWhereClauseOrderBy != "")
                        defaultWhereClauseOrderBy += " AND ";
                    defaultWhereClauseOrderBy += tableName + "." + colName + " " + selText;
                }
            }
        }

        var multiBrnWhereClause = '';
        if (selectNodes(dbDataDOM, ("//RAD_SUMMARY_MULTIBRN")).length > 0) {
            var multiBrnWhereClauseNodes = selectNodes(dbDataDOM, ("//RAD_SUMMARY_MULTIBRN"));
            for (var whereCnt = 0;whereCnt < multiBrnWhereClauseNodes.length;whereCnt++) {
                var colName = getNodeText(selectSingleNode(multiBrnWhereClauseNodes[whereCnt], ("COL_NAME")));
                var colValue = getNodeText(selectSingleNode(multiBrnWhereClauseNodes[whereCnt], ("COL_VALUE")));
                if (trim(colValue) != "") {
                    if (cbSysJsGenerator == true || cbFlag == true) {
                        if (colValue.indexOf("dlgArg.mainWin") !=  - 1) {
                            colValue = "mainWin" + colValue.substring(colValue.lastIndexOf("."));
                        }
                    }
                    if (multiBrnWhereClause != "")
                        multiBrnWhereClause += "~";
                    multiBrnWhereClause += colName + ":" + colValue;
                }
            }
        }
        var g_SummaryType = 'S';
        var g_SummaryBtnCount = 0;
        if (selectNodes(dbDataDOM, "//RAD_SUMMARY").length > 0) {
            if (selectSingleNode(dbDataDOM, "//RAD_SUMMARY/SUMMARY_TYPE"))
                g_SummaryType = getNodeText(selectSingleNode(dbDataDOM, "//RAD_SUMMARY/SUMMARY_TYPE"));
            if (selectNodes(dbDataDOM, "//RAD_SUMMARY/RAD_CUSTOM_BUTTONS").length > 0)
                g_SummaryBtnCount = selectNodes(dbDataDOM, "//RAD_SUMMARY/RAD_CUSTOM_BUTTONS").length;
        }
        strScriptForDetailScreen += "\r\n";
        var gfuncid = getNodeText(selectNodes(dbDataDOM, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
        strScriptForDetailScreen += 'var detailFuncId = "' + gfuncid + '";\r\n';
        strScriptForDetailScreen += 'var defaultWhereClause = "' + defaultWhereClause + '";\r\n';
        strScriptForDetailScreen += 'var defaultOrderByClause ="' + defaultWhereClauseOrderBy + '";\r\n';
        strScriptForDetailScreen += 'var multiBrnWhereClause ="' + multiBrnWhereClause + '";\r\n';

        strScriptForDetailScreen += 'var g_SummaryType ="' + g_SummaryType + '";\r\n';
        strScriptForDetailScreen += 'var g_SummaryBtnCount =' + g_SummaryBtnCount + ';\r\n';
        strScriptForDetailScreen += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    }
    strScriptForDetailScreen += fnGetScriptForDataBinding_Old("DETAIL");
    strScriptForDetailScreen += fnGetCodeForQueryMode_Old("DETAIL");
    strScriptForDetailScreen += fnGetCodeForAmendableSubsystem_Old();
    strScriptForDetailScreen += fnScriptForSubscreens_Old();
    strScriptForDetailScreen += fnScriptForCallform_Old();
    strScriptForDetailScreen += fnGetCodeForLOVs(pstrLOV);
    strScriptForDetailScreen += fnScriptForTabs_Old();
    strScriptForDetailScreen += fnScriptForMultipleEntryBlocks_Old("DETAIL");
    strScriptForDetailScreen += fnScriptForMultipleEntryViewSingleEntry_Old();
    if (screenType == "NEWMAINTENANCE" || screenType == "NEWTRANSACTION")
        strScriptForDetailScreen += fnScriptForAttachedCallforms_Old();

    return strScriptForDetailScreen;
}

function fnScriptForAttachedCallforms_Old() {
    var strCallformScript = '';
    var tempStr = '';
    var callFormNodes = selectNodes(dbDataDOM, "//RAD_FUNCTIONS/RAD_CALLFORM");

    strCallformScript += "\r\n\r\n//----------------------------------------------------------------------------------------------------------------------";
    strCallformScript += "\r\n//***** SCRIPT FOR ATTACHED CALLFORMS *****";
    strCallformScript += "\r\n//----------------------------------------------------------------------------------------------------------------------";

    strCallformScript += '\r\nvar CallFormArray= new Array();\r\n';
    for (var index = 0;index < callFormNodes.length;index++) {
        tempStr = getNodeText(selectSingleNode(callFormNodes[index], ("CALLFORM_FUCNTIONID"))) + "~" + getNodeText(selectSingleNode(callFormNodes[index], "CALLFROM_PARENT"));
        strCallformScript += 'CallFormArray[' + index + ']="' + tempStr + '";\r\n';
    }

    strCallformScript += '\r\nvar CallFormRelat=new Array();\r\n';
    for (var index = 0;index < callFormNodes.length;index++) {
        strCallformScript += getNodeText('CallFormRelat[' + index + ']="' + selectSingleNode(callFormNodes[index], "CALLFROM_RELATION")) + '";\r\n';
    }

    strCallformScript += '\r\nvar CallRelatType= new Array();\r\n';
    for (var index = 0;index < callFormNodes.length;index++) {
        strCallformScript += getNodeText('CallRelatType[' + index + ']="' + selectSingleNode(callFormNodes[index], "CALLFORM_RELATION_TYPE")) + '";\r\n';
    }

    return strCallformScript;
}

function fnScriptForMultipleEntryViewSingleEntry_Old() {
    var strMultipleEntryViewSingleScripts = "";

    strMultipleEntryViewSingleScripts += "//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****\r\n"
    strMultipleEntryViewSingleScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";
    var strMultipleEntrySingleViewBlks = "";
    if (domB4CFAddition != null)
        strMultipleEntrySingleViewBlks = selectNodes(domB4CFAddition, "//RAD_DATA_BLOCKS[@Type='MULTIPLE' and VIEW_TYPE = 'Single Entry']");
    else 
        strMultipleEntrySingleViewBlks = selectNodes(dbDataDOM, "//RAD_DATA_BLOCKS[@Type='MULTIPLE' and VIEW_TYPE = 'Single Entry']");
    if (strMultipleEntrySingleViewBlks.length > 0) {
        for (var i = 0;i < strMultipleEntrySingleViewBlks.length;i++) {
            var blockId = getNodeText(selectSingleNode(strMultipleEntrySingleViewBlks[i], "BLOCK_ID"));
            var dataSrcId = blockId.substring(4, blockId.length);
            var strSingleViewBlkFields = selectNodes(strMultipleEntrySingleViewBlks[i], "RAD_BLK_FIELDS[FIELD_TYPE = 'BUTTON' and (FIELD_NAME = 'BTN_NEXT_" + blockId.toUpperCase() + "' or FIELD_NAME = 'BTN_PREV_" + blockId.toUpperCase() + "' or FIELD_NAME = 'BTN_ADD_" + blockId.toUpperCase() + "'  or FIELD_NAME = 'BTN_REMOVE_" + blockId.toUpperCase() + "')]");
            if (strSingleViewBlkFields.length > 0) {
                for (var cnt = 0;cnt < strSingleViewBlkFields.length;cnt++) {
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_NEXT_" + blockId.toUpperCase()) {
                        strMultipleEntryViewSingleScripts += "function fnMoveNext_" + getNodeText(selectSingleNode(strMultipleEntrySingleViewBlks[i], "BLOCK_ID")) + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabID)); \r\n    displayNextData('" + dataSrcId + "');\r\n}\r\n";
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_PREV_" + blockId.toUpperCase()) {
                        strMultipleEntryViewSingleScripts += "function fnMovePrev_" + getNodeText(selectSingleNode(strMultipleEntrySingleViewBlks[i], "BLOCK_ID")) + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabID)); \r\n    displayPrevData('" + dataSrcId + "'); \r\n}\r\n";
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_ADD_" + blockId.toUpperCase()) {
                        if (cbSysJsGenerator == false && cbFlag == false) {
                            strMultipleEntryViewSingleScripts += "function fnAddRow_" + getNodeText(selectSingleNode(strMultipleEntrySingleViewBlks[i], "BLOCK_ID")) + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabID));\r\n    disableAllBlockElements('" + blockId + "' , false , true);\r\n    if(selectNodes(dbDataDOM,getXPathQuery('" + dataSrcId + "')).length > 0);\r\n      dbIndexArray['" + dataSrcId + "'] = dbIndexArray['" + dataSrcId + "']+1;\r\n}\r\n";
                        }
                        else {
                            strMultipleEntryViewSingleScripts += "function fnAddRow_" + getNodeText(selectSingleNode(strMultipleEntrySingleViewBlks[i], "BLOCK_ID")) + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabID));\r\n    disableAllBlockElements('" + blockId + "' , false , true);\r\n    if(selectNodes(dbDataDOM,getXPathQuery('" + dataSrcId + "')).length > 0);\r\n      dbIndexArray['" + dataSrcId + "'] = dbIndexArray['" + dataSrcId + "']+1;\r\n}\r\n";
                        }
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_REMOVE_" + blockId.toUpperCase()) {
                        strMultipleEntryViewSingleScripts += "function fnDelRow_" + getNodeText(selectSingleNode(strMultipleEntrySingleViewBlks[i], "BLOCK_ID")) + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabID));\r\n    deleteData('" + dataSrcId + "');\r\n}\r\n";
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                }
            }
        }
    }
    return strMultipleEntryViewSingleScripts;
}

function fnScriptForMultipleEntryBlocks_Old(pstrScreenMode) {
    var strMultipleEntryScripts = "";

    strMultipleEntryScripts += "//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****\r\n"
    strMultipleEntryScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";

    //Global variables for Multiple Entry Blocks
    strMultipleEntryScripts += "var multipleEntryIDs = new Array();\r\n"
    strMultipleEntryScripts += "var multipleEntryArray = new Array();\r\n"
    strMultipleEntryScripts += "var multipleEntryCells = new Array();\r\n"
    strMultipleEntryScripts += "//--------------------------------------------\r\n";
    //Set Multiple Entry Block IDs
    if (pstrScreenMode == "DETAIL") {
        for (var i = 0;i < arrMultipleEntryBlockIDs.length;i++) {
            strMultipleEntryScripts += "multipleEntryIDs[" + i + "] = '" + arrMultipleEntryBlockIDs[i] + "';\r\n";
        }
        strMultipleEntryScripts += "//--------------------------------------------\r\n";
    }
    else if (pstrScreenMode == "SUMMARY") {
        strMultipleEntryScripts += "multipleEntryIDs[0] = 'BLK_" + arrDataSrcMapping[0] + "';\r\n";
    }

    //code for Add Row/Delete Row functions for individual Multiple Entry blocks
    if (pstrScreenMode == "DETAIL") {
        for (var i = 0;i < arrMultipleEntryBlockIDs.length;i++) {
            strMultipleEntryScripts += "function fnAddRow_" + arrMultipleEntryBlockIDs[i] + "()\r\n{\r\n    return true;\r\n}\r\n"
            strMultipleEntryScripts += "//--------------------------------------------\r\n";
            strMultipleEntryScripts += "function fnDeleteRow_" + arrMultipleEntryBlockIDs[i] + "()\r\n{\r\n    return true;\r\n}\r\n"
            if (i < arrMultipleEntryBlockIDs.length - 1) {
                strMultipleEntryScripts += "//--------------------------------------------\r\n";
            }
        }
    }

    strMultipleEntryScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";

    return strMultipleEntryScripts;
}

function fnScriptForTabs_Old() {
    var strTabScripts = "";

    strTabScripts += "//***** SCRIPT FOR TABS *****\r\n"
    strTabScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";
    var headerTab = '';
    var mainScreen = getNodeText(selectSingleNode(dbDataDOM, "//RAD_FUNCTIONS/MAIN_SCR"));
    if (selectSingleNode(dbDataDOM, "//RAD_TABS[SCREEN_NAME = '" + mainScreen + "'][TAB_TYPE = 'HEADER']"))
        headerTab = getNodeText(selectSingleNode(dbDataDOM, "//RAD_TABS[SCREEN_NAME = '" + mainScreen + "'][TAB_TYPE = 'HEADER']/TAB_ID"));
    strTabScripts += "var l_HeaderTabId = '" + headerTab + "';\r\n";
    //Global variables for Tabs
    var currTab = "";
    if (!arrTabList[0]) {
        currTab = "All";
        strTabScripts += "var strCurrentTabID = '" + currTab + "';\r\n";
    }
    else {
        if (arrTabList[0] == 'All') {
            if (arrTabList[1] == undefined) {
                strTabScripts += "var strCurrentTabID = '" + arrTabList[0] + "';\r\n";
            }
            else {
                if (arrTabList[1] == headerTab)
                    strTabScripts += "var strCurrentTabID = '" + arrTabList[2] + "';\r\n";
                else 
                    strTabScripts += "var strCurrentTabID = '" + arrTabList[1] + "';\r\n";
            }
        }
        else if (arrTabList[0] == headerTab) {
            strTabScripts += "var strCurrentTabID = '" + arrTabList[1] + "';\r\n";
        }
        else {
            strTabScripts += "var strCurrentTabID = '" + arrTabList[0] + "';\r\n";
        }
    }
    strTabScripts += "//--------------------------------------------\r\n";

    //code for function inTab()
    if (arrTabList.length > 0) {
        strTabScripts += "function inTab(pstrTabID)\r\n{";
        for (var i = 0;i < arrTabList.length;i++) {
            strTabScripts += "\r\n";
            strTabScripts += "    if (pstrTabID == '" + arrTabList[i] + "')\r\n";
            strTabScripts += "    {\r\n        fnInTab_" + arrTabList[i] + "();\r\n    }";
        }
        strTabScripts += "\r\n    strCurrentTabID = pstrTabID;\r\n"
        strTabScripts += "}\r\n"
        strTabScripts += "//--------------------------------------------\r\n";

        //code for function outTab()
        strTabScripts += "function outTab(pstrTabID)\r\n{";
        for (var i = 0;i < arrTabList.length;i++) {
            strTabScripts += "\r\n";
            strTabScripts += "    if (pstrTabID == '" + arrTabList[i] + "')\r\n";
            strTabScripts += "    {\r\n        return fnOutTab_" + arrTabList[i] + "();\r\n    }";
        }
        strTabScripts += "\r\n}\r\n"
        strTabScripts += "//--------------------------------------------\r\n";

        //code for Tab In/Out functions for individual tabs
        for (var i = 0;i < arrTabList.length;i++) {
            strTabScripts += "function fnInTab_" + arrTabList[i] + "()\r\n{\r\n    showTabData();\r\n}\r\n"
            strTabScripts += "//--------------------------------------------\r\n";
            strTabScripts += "function fnOutTab_" + arrTabList[i] + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabID));\r\n    return true;\r\n}\r\n"
            if (i < arrTabList.length - 1) {
                strTabScripts += "//--------------------------------------------\r\n";
            }
        }
    }
    strTabScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";

    return strTabScripts;
}

function fnGetCodeForLOVs(pstrLOV) {
    var strCodeForLOVs = "";

    if (pstrLOV != null && typeof (pstrLOV) != "undefined" && trim(pstrLOV) != "") {
        strCodeForLOVs += "\r\n//***** CODE FOR LOVs *****\r\n";
        strCodeForLOVs += "//----------------------------------------------------------------------------------------------------------------------\r\n"
        strCodeForLOVs += pstrLOV;
        strCodeForLOVs += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    }

    return strCodeForLOVs;
}

function fnScriptForCallform_Old() {

    var strScrLaunchScripts = "";
    var callFormNodes = selectNodes(dbDataDOM, "//RAD_BLK_FIELDS/RAD_FIELD_EVENTS[LAUNCH_CALLFORM = 'Y' ]");

    strScrLaunchScripts += "\r\n/***** Script for call form functionalities *****/\r\n";
    for (var i = 0;i < callFormNodes.length;i++) {
        var funcName = getNodeText(selectSingleNode(callFormNodes[i], "FUNCTION_NAME"));
        var callFnId = getNodeText(selectSingleNode(callFormNodes[i], "CALLFORM_NAME"));
        var callScreen = getNodeText(selectSingleNode(callFormNodes[i], "CALLFORM_SCREEN"));
        var fnName = funcName.split("(");
        strScrLaunchScripts += "\r\nfunction " + fnName[0] + "(functionId,ScreenName){\r\n";
        if (callFnId != "" && callScreen != "") {
            strScrLaunchScripts += "\t screenArgs=getOtherScreenArgs(functionId,ScreenName);\r\n";
            strScrLaunchScripts += "\tscreenArgs['SCREEN_NAME'] = ScreenName;\r\n";
            strScrLaunchScripts += "\tscreenArgs['FUNCTION_ID'] = functionId;\r\n";
            strScrLaunchScripts += "\tappendData(document.getElementById('TBLPage'+strCurrentTabID));\r\n";
            strScrLaunchScripts += "\r\n\tfnShowCallForm(screenArgs);\r\n";
        }
        strScrLaunchScripts += "\r\n}\r\n";
    }
    return strScrLaunchScripts;
}

function fnScriptForSubscreens_Old() {

    if (screenType == "MAINTENANCE" || screenType == "TRANSACTION") {
        var allScreens = selectNodes(dbDataDOM, "//RAD_SCREENS");
        for (var scrCnt = 0;scrCnt < allScreens.length;scrCnt++) {
            var l_ScrId = allScreens[scrCnt].getAttribute("ID");
            if (!arrParentScr[l_ScrId]) {
                var l_scrNode_toDel = selectSingleNode(dbDataDOM, "//RAD_SCREENS[@ID = '" + l_ScrId + "']");
                if (l_scrNode_toDel != null)
                    l_scrNode_toDel.parentNode.removeChild(l_scrNode_toDel);
            }
        }
    }
    //End Added By Saidul
    var strScrLaunchScripts = "";
    var mainscrName = getNodeText(selectSingleNode(dbDataDOM, "//RAD_FUNCTIONS/MAIN_SCR"));
    /* This validation is for an exceptional case. Fro some RAD xml, the domB4CFAddition would be null and hence this validation. As part of crossBrowserCompatibility changes. */
    if (domB4CFAddition != null) {
        var subscreenNodes = selectNodes(domB4CFAddition, "//RAD_SCREENS[SCREEN_NAME !='" + mainscrName + "' and SCREEN_NAME !='SUMMARY']");
    }
    else {
        var subscreenNodes = selectNodes(dbDataDOM, "//RAD_SCREENS[SCREEN_NAME !='" + mainscrName + "' and SCREEN_NAME !='SUMMARY']");
    }
    var languageCode = document.getElementsByName("LANG_CODE")[0].value;

    strScrLaunchScripts += "\r\n/***** Script for subscreen functionalities *****/\r\n";
    for (var i = 0;i < subscreenNodes.length;i++) {
        var subscrName = getNodeText(selectSingleNode(subscreenNodes[i], "SCREEN_NAME"));
        if (selectNodes(dbDataDOM, "//RAD_FIELD_EVENTS[LAUNCH_SUBSCREEN='Y' and SUBSCREEN_NAME='" + subscrName + "']").length > 0) {
            var desc = selectSingleNode(selectSingleNode(dbDataDOM, "//RAD_SCREENS[SCREEN_NAME='" + subscrName + "']"), "SCREEN_TITLE");
            strScrLaunchScripts += "\r\nfunction fnShowSubscreen_" + subscrName + "(){\r\n";

            if (cbFlag == false && cbSysJsGenerator == false) {
                strScrLaunchScripts += "\tscreenArgs = new Array();\r\n";
            }
            else {
                strScrLaunchScripts += "\tscreenArgs = new Array();\r\n";
            }
            strScrLaunchScripts += "\tscreenArgs['SCREEN_NAME'] = '" + subscrName + "';\r\n";
            strScrLaunchScripts += "\tscreenArgs['FUNCTION_ID'] = '" + gFuncid + "';\r\n";

            if (cbSysJsGenerator == false && cbFlag == false) {
                strScrLaunchScripts += "\tscreenArgs['LANG'] = mainWin.LangCode;\r\n";
            }
            else {
                strScrLaunchScripts += "\tscreenArgs['LANG'] = mainWin.LangCode;\r\n";
            }

            strScrLaunchScripts += "\tscreenArgs['UI_XML'] = '" + gFuncid + "';\r\n";
            strScrLaunchScripts += "\tappendData(document.getElementById('TBLPage'+strCurrentTabID));\r\n";

            if (cbSysJsGenerator == false && cbFlag == false) {
                strScrLaunchScripts += "\tscreenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'" + "+mainWin.LangCode+" + "'/" + gFuncid + ".xml',screenArgs['SCREEN_NAME']);\r\n";
            }
            else {
                strScrLaunchScripts += "\tscreenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'" + "+mainWin.LangCode+" + "'/" + gFuncid + ".xml',screenArgs['SCREEN_NAME']);\r\n";
            }

            strScrLaunchScripts += "\r\n\tfnShowSubScreen(screenArgs);\r\n}\r\n";
        }

        strScrLaunchScripts += "\r\nfunction fnSave_" + subscrName + "(){\r\n";
        strScrLaunchScripts += "\tfnSaveSubScreenData();\r\n}\r\n";

        if (cbSysJsGenerator == false && cbFlag == false) {
            strScrLaunchScripts += "\r\nfunction fnExit_" + subscrName + "(){\r\n";
            strScrLaunchScripts += "\tfnExitSubScreen();\r\n}\r\n";
        }
        else {
            strScrLaunchScripts += "\r\nfunction fnExit_" + subscrName + "(event){\r\n";
            strScrLaunchScripts += "\tfnExitSubScreen(event);\r\n}\r\n";
        }
    }

    return strScrLaunchScripts;
}

function fnGetCodeForAmendableSubsystem_Old() {
    var strCodeForAmendableSubsys = "";
    strCodeForAmendableSubsys += "//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****\r\n";
    strCodeForAmendableSubsys += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    strCodeForAmendableSubsys += "var amendArr = new Array(); \r\n";
    strCodeForAmendableSubsys += "var subsysArr    = new Array(); \r\n";
    strCodeForAmendableSubsys += "\r\n";

    var amendableNodes = selectNodes(dbDataDOM, "//RAD_BLK_FIELDS[DBC != ''][AMENDABLE = 'Y']");
    if (amendableNodes.length > 0) {
        for (var nodeCnt = 0;nodeCnt < amendableNodes.length;nodeCnt++) {
            var fldName = getNodeText(selectSingleNode(amendableNodes[nodeCnt], "FIELD_NAME"));
            var fldType = getNodeText(selectSingleNode(amendableNodes[nodeCnt], "FIELD_TYPE"));
            if (fldType == 'DATE')
                fldName += "I";
            var datasrc = getNodeText(selectSingleNode(amendableNodes[nodeCnt], "DBT"));
            if (datasrc == '')
                datasrc = getNodeText(selectSingleNode(amendableNodes[nodeCnt].parentNode, "DATASRC_NAME"));
            strCodeForAmendableSubsys += "amendArr[" + nodeCnt + "] = \"" + datasrc + "__" + fldName + "\";\r\n";
        }
    }
    strCodeForAmendableSubsys += "\r\n";
    var subsysNodes = selectNodes(dbDataDOM, "//RAD_BLK_FIELDS[DBC != ''][SUBSYSTEM_DEPENDANT = 'Y']");
    if (subsysNodes.length > 0) {
        for (var nodeCnt = 0;nodeCnt < subsysNodes.length;nodeCnt++) {
            var fldName = getNodeText(selectSingleNode(subsysNodes[nodeCnt], "FIELD_NAME"));
            var fldType = getNodeText(selectSingleNode(subsysNodes[nodeCnt], "FIELD_TYPE"));
            if (fldType == 'DATE')
                fldName += "I";
            var datasrc = getNodeText(selectSingleNode(subsysNodes[nodeCnt], "DBT"));
            if (datasrc == '')
                datasrc = getNodeText(selectSingleNode(subsysNodes[nodeCnt].parentNode, "DATASRC_NAME"));
            strCodeForAmendableSubsys += "subsysArr[" + nodeCnt + "] = \"" + datasrc + "__" + fldName + "\";\r\n";
        }
    }
    strCodeForAmendableSubsys += "\r\n";
    var txnBrnNodes = selectNodes(dbDataDOM, ("//RAD_BLK_FIELDS[DBC != ''][TXNBRANCHFLD = 'Y']"));
    if (txnBrnNodes.length > 0) {
        for (var nodeCnt = 0;nodeCnt < 1;nodeCnt++) {
            var fldName = getNodeText(selectSingleNode(txnBrnNodes[nodeCnt], ("FIELD_NAME")));
            var fldType = getNodeText(selectSingleNode(txnBrnNodes[nodeCnt], ("FIELD_TYPE")));
            var datasrc = getNodeText(selectSingleNode(txnBrnNodes[nodeCnt], ("DBT")));
            if (datasrc == '')
                datasrc = getNodeText(selectSingleNode(parentNode, txnBrnNodes[nodeCnt], ("DATASRC_NAME")));
            strCodeForAmendableSubsys += "var txnBranchFld = \"" + datasrc + "__" + fldName + "\";\r\n";
        }
    }
    strCodeForAmendableSubsys += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    return strCodeForAmendableSubsys;
}

function fnGetBindVarNode(lovNode) {

    var bindVarNodes = selectNodes(lovNode, "RAD_BIND_VARS");
    var bindVarXml = "";

    for (var i = 0;i < bindVarNodes.length;i++) {
        if (bindVarXml != "")
            bindVarXml += "~";
        bindVarXml += getNodeText(selectSingleNode(bindVarNodes[i], "BIND_VAR_NAME"));
        bindVarXml += "!" + getNodeText(selectSingleNode(bindVarNodes[i], "BIND_VAR_TYPE"));
    }
    return bindVarXml;

}

function fnGetCodeForFCJXML_Old(parrMessage) {
    var strScriptForFCJXML = "";

    strScriptForFCJXML += "\r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += "//***** FCJ XML FOR THE SCREEN *****\r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += "var msgxml=\"\"; \r\n";
    strScriptForFCJXML += "msgxml += '    <FLD>'; \r\n";
    for (var i = 0;i < parrMessage.length;i++) {
        strScriptForFCJXML += "msgxml += '      " + parrMessage[parrMessage[i]] + "'; \r\n";
    }
    strScriptForFCJXML += "msgxml += '    </FLD>'; \r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    return strScriptForFCJXML;
}

function fnGetCodeForFCJXMLForSummary_Old(xml) {

    var rsltDS = getNodeText(selectSingleNode(dbDataDOM, "//RAD_SUMMARY/RSLT_DATASRC"));

    var nodesDatasource = selectSingleNode(dbDataDOM, "//RAD_DATASOURCES[DATASRC_NAME = '" + rsltDS + "']");
    var parentDSrc = getNodeText(selectSingleNode(nodesDatasource, "PARENT_DATASRC"));
    uixmlResultFldsOrder = xml;
    if (navigator.appName == navAppName() ) {
        var rsltFldsOrder = selectNodes(uixmlResultFldsOrder, "//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD");
    }
    else {
        var rsltFldsOrder = selectNodes(uixmlResultFldsOrder, "//sumblock[@tabpage = 'RESULT']/field");
    }
    var fldLstArray = new Array();
    var strFieldList = "";
    var k = 0;
    for (var j = 0;j < rsltFldsOrder.length;j++) {
        if (navigator.appName == navAppName() ) {
            var fldDbc = getNodeText(selectSingleNode(rsltFldsOrder[j], "DBC"));
        }
        else {
            var fldDbc = getNodeText(selectSingleNode(rsltFldsOrder[j], "dbc"));
        }
        if (!fldLstArray[fldDbc]) {
            fldLstArray[k] = fldDbc;
            fldLstArray[fldDbc] = 1;
            k++;
        }
    }
    for (var l = 0;l < k;l++) {
        strFieldList = strFieldList + fldLstArray[l] + "~";
    }

    var auditFlds = "";
    if ((getNodeText(selectSingleNode(dbDataDOM, "//RAD_FUNCTIONS/SCREEN_TYPE")) == 'MAINTENANCE' || getNodeText(selectSingleNode(dbDataDOM, "//RAD_FUNCTIONS/SCREEN_TYPE")) == 'NEWMAINTENANCE') && getNodeText(selectSingleNode(dbDataDOM, "//RAD_FUNCTIONS/AUDIT_BLK_REQD")) == 'Y')
        auditFlds = "AUTH_STAT~RECORD_STAT~";
    strFieldList = auditFlds + strFieldList;
    var appName = "FCJ";

    var strFieldListPrefix = '<FN ISQUERY="' + (getNodeText(selectSingleNode(nodesDatasource, "IS_QUERYSRC")) == 'Y' ? 1 : 0) + '" ';
    var isControl = getNodeText(selectSingleNode(nodesDatasource, "IS_CONTROLDS")) == 'Y' ? 1 : 0;
    strFieldListPrefix += 'ISCONTROL="' + isControl + '" ';
    strFieldListPrefix += 'PARENT="' + parentDSrc + '" ';
    strFieldListPrefix += 'RELATION="' + getNodeText(selectSingleNode(nodesDatasource, "RELATION_WITH_PARENT")) + '" ';
    strFieldListPrefix += 'TYPE="' + rsltDS + '">';
    var strFieldListSuffix = "</FN>";
    strFieldList = strFieldListPrefix + strFieldList.substring(0, strFieldList.length - 1) + strFieldListSuffix;
    strFieldList = replaceAllChar_Old(strFieldList, '\n', ' ');

    var strScriptForFCJXML = "";
    strScriptForFCJXML += "\r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += "//***** FCJ XML FOR SUMMARY SCREEN *****\r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += "var msgxml_sum=\"\"; \r\n";
    strScriptForFCJXML += "msgxml_sum += '    <FLD>'; \r\n";
    strScriptForFCJXML += "msgxml_sum += '      " + strFieldList + "'; \r\n";
    strScriptForFCJXML += "msgxml_sum += '    </FLD>'; \r\n";

    return strScriptForFCJXML;
}

function fnGetScriptForDataBinding_Old(pstrScreenMode) {
    var strScriptForDataBinding = "";

    strScriptForDataBinding += "//***** CODE FOR DATABINDING *****\r\n";
    strScriptForDataBinding += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForDataBinding += "var relationArray = new Array(); \t\t\t";
    strScriptForDataBinding += "// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value \r\n";
    if (pstrScreenMode == "DETAIL") {
        for (var i = 0;i < arrDataSrcMapping.length;i++) {
            strScriptForDataBinding += "relationArray['" + arrDataSrcMapping[i] + "'] = \"" + arrDataSrcMapping[arrDataSrcMapping[i]] + "\"; \r\n";
        }
    }
    else if (pstrScreenMode == "SUMMARY") {
        strScriptForDataBinding += "relationArray['SUMMARY'] = \"\"; \r\n"
        strScriptForDataBinding += "relationArray['" + arrDataSrcMapping[0] + "'] = \"SUMMARY~N\"; \r\n";
    }
    strScriptForDataBinding += "\r\n"

    strScriptForDataBinding += "var dataSrcLocationArray = new Array(); \t";
    strScriptForDataBinding += "// Array of all Data Sources used in the screen \r\n";

    if (pstrScreenMode == "DETAIL") {
        for (var i = 0;i < arrDataSrcMapping.length;i++) {
            strScriptForDataBinding += "dataSrcLocationArray[" + i + "] = \"" + arrDataSrcMapping[i] + "\"; \r\n";
        }
    }
    else if (pstrScreenMode == "SUMMARY") {
        strScriptForDataBinding += "dataSrcLocationArray[0] = \"" + arrDataSrcMapping[0] + "\"; \r\n";
    }
    strScriptForDataBinding += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    return strScriptForDataBinding;
}

function fnGetCodeForQueryMode_Old(pstrScreenMode) {
    var strCodeForQueryMode = "";

    strCodeForQueryMode += "//***** CODE FOR QUERY MODE *****\r\n";
    strCodeForQueryMode += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    if (getNodeText(selectSingleNode(dbDataDOM, "//RAD_FUNCTIONS/DETAIL_REQD")) == 'Y') {
        strCodeForQueryMode += "var detailRequired = true ;\r\n";
    }
    else {
        strCodeForQueryMode += "var detailRequired = false ;\r\n";
    }
    strCodeForQueryMode += "var intCurrentQueryResultIndex = 0;\r\n"
    strCodeForQueryMode += "var intCurrentQueryRecordCount = 0;\r\n\r\n"

    strCodeForQueryMode += "var queryFields = new Array();    //Values should be set inside " + gFuncid + ".js, in \"TableName__FieldName\" format\r\n";
    strCodeForQueryMode += "var pkFields    = new Array();    //Values should be set inside " + gFuncid + ".js, in \"TableName__FieldName\" format\r\n";

    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R007" + parent.gBodySeparator + 'FCJDEV' + "~" + arrDataSrcMapping[0], "RADClientHandler");

    var response = getXMLString(response) + "";
    if (response == "") {
        if (cbSysJsGenerator == false)
            alertMessage("Error: Please enter a record in STTB_PK_COLS table for PK Fields");

    }
    else {
        if (response != undefined && response != "undefined") {
            var pkData = response.split("<pkfields>",  - 1)[1].split("</pkfields>",  - 1)[0];
            if (pkData.indexOf("DB Error") !=  - 1) {
                alertMessage(pkData);
                return strCodeForQueryMode;
            }
            pkFields = pkData.split("!");
            var pkField = pkFields[0].split("~");
        }
        else {
            pkField = "null";
        }
        if (pkField == "null") {
            var tmp = "";
            var finalval = "";
            tmp = arrDataSrcMapping[0].substring(0, 4);
            if (arrDataSrcMapping[0].substring(4, 8) == "SSS_") {
                finalval = tmp + arrDataSrcMapping[0].substring(7, arrDataSrcMapping[0].length);
            }
            else if (arrDataSrcMapping[0].substring(4, 7) == "SS_") {
                finalval = tmp + arrDataSrcMapping[0].substring(6, arrDataSrcMapping[0].length);
            }
            else if (arrDataSrcMapping[0].substring(4, 6) == "S_") {
                finalval = tmp + arrDataSrcMapping[0].substring(5, arrDataSrcMapping[0].length);
            }
            else {
                finalval = arrDataSrcMapping[0];
            }
            parent.gReqCode = 'UICONTROLLER';
            parent.gReqType = "APP";
            var radReqDOM = parent.buildRADXml();
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R007" + parent.gBodySeparator + 'FCJDEV' + "~" + finalval, "RADClientHandler");

            var response = getXMLString(response) + "";
            if (response != undefined && response != "undefined") {
                pkData = response.split("<pkfields>",  - 1)[1].split("</pkfields>",  - 1)[0];
                pkFields = pkData.split("!");
                var pkField = pkFields[0].split("~");
            }
            else {
                pkData = "null";
                pkFields = pkData.split("!");
                var pkField = pkFields[0].split("~")
            }
        }
        var fldIndex = 0;
        for (var pkFieldIndex = 0;pkFieldIndex < pkField.length;pkFieldIndex++) {
            if (pkField[pkFieldIndex] != '') {
                strCodeForQueryMode += "queryFields[" + fldIndex + "] = \"" + arrDataSrcMapping[0] + "__" + pkField[pkFieldIndex] + "\";\r\n";
                strCodeForQueryMode += "pkFields[" + fldIndex + "] = \"" + arrDataSrcMapping[0] + "__" + pkField[pkFieldIndex] + "\";\r\n";
                fldIndex++;
            }
        }

    }
    if (pstrScreenMode == "SUMMARY") {
        strCodeForQueryMode += "\r\n";
        strCodeForQueryMode += "var servletURL   = \"MaintenanceServlet\";\r\n";
        strCodeForQueryMode += "var detailFuncId = \"" + gFuncid + "\";\r\n";
        strCodeForQueryMode += "var gErrCodes    = \"\";\r\n";
    }

    strCodeForQueryMode += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    return strCodeForQueryMode;
}