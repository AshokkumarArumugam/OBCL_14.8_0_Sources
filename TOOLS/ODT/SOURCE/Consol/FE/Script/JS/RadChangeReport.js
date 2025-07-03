/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadChangeReport.js
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
var rfl = 0;
var stat;
var erordesc;
var log = "";
var logHdr = "";
var countlog = "";
var ttlFiles = "";
var cmntdFiles = 0;
var sucesFiles = 0;
var failedFiles = 0;
var ignrdFiles = 0;
var ntfctnFiles = 0;
var tenzeofiles = 0;
var comparisontype;
var chgRptModifiedNodes = new Array();
var chgRptNewNodes = new Array();
var chgRptOldVals = new Array();
var chgRptNewVals = new Array();
var chgRptModifiedVals = new Array();
var chgRptDelVals = new Array();
var newNodescnt = 0;
var modNodesCnt = 0;
var delNodesCnt = 0;
var chgRptPathArray = new Array();
var ChngDomXpath = new Array();
var changeRptdom = "";
var sfileList = "";
var sfileNamesArry = new Array();
var sfilePathsArry = new Array();
var bfileList = "";
var bfileNamesArry = new Array();
var bfilePathsArry = new Array();

changeRptdom.async = false;
changeRptdom.resolveExternals = false;
changeRptdom = "<?xml version='1.0' encoding='UTF-8'?>";
changeRptdom = loadXMLDoc(changeRptdom);
var srcHeader = new Array();
var baseHeader = new Array();
var currCompNode = "";
var chgRptNodeArray = new Array();
chgRptNodeArray["RAD_FUNC_PREFERENCES"] = "PREFERENCES";
chgRptNodeArray["MENU_DETAILS"] = "MENU_DETAILS";
chgRptNodeArray["RAD_DATASOURCES"] = "DATASOURCES";
chgRptNodeArray["RAD_FIELDS"] = "COLUMNS";
chgRptNodeArray["RAD_LOVS"] = "LOVS";
chgRptNodeArray["RAD_LOV_DETAILS"] = "LOV_DETAILS";
chgRptNodeArray["RAD_DATA_BLOCKS"] = "DATA_BLOCKS";
chgRptNodeArray["RAD_BLK_FIELDS"] = "BLOCK_FIELDS";
chgRptNodeArray["BLK_DATASOURCES"] = "DATASOURCES_ATTACHED";
chgRptNodeArray["RAD_FIELD_CUSTOM_ATTRS"] = "CUSTOM_ATTRIBUTES";
chgRptNodeArray["RAD_RETURN_FIELDS"] = "LOV_RETURN_FIELDS";
chgRptNodeArray["RAD_BIND_VARS"] = "LOV_BIND_VARS";
chgRptNodeArray["RAD_FIELD_EVENTS"] = "FIELD_EVENTS";
chgRptNodeArray["RAD_OFF_LINE_BIND_VARS"] = "LOV_OFF_LINE_BIND_VARS";
chgRptNodeArray["RAD_OFF_LINE_RETURN_FIELDS"] = "LOV_OFF_LINE_RETURN_FIELDS";
chgRptNodeArray["RAD_SCREENS"] = "SCREENS";
chgRptNodeArray["SCREEN_ARGS"] = "SCREEN_ARGUMENTS";
chgRptNodeArray["RAD_TABS"] = "TABS";
chgRptNodeArray["RAD_SECTIONS"] = "SECTIONS";
chgRptNodeArray["RAD_PARTITIONS"] = "PARTITIONS";
chgRptNodeArray["RAD_FIELDSETS"] = "FIELDSETS";
chgRptNodeArray["FIELDSET_FIELDS"] = "FIELDSET_FIELDS";
chgRptNodeArray["RAD_SUMMARY"] = "SUMMARY";
chgRptNodeArray["SUMMARY_DETAILS"] = "SUMMARY_DETAILS";
chgRptNodeArray["RAD_LAUNCHFORM"] = "LAUNCHFORMS";
chgRptNodeArray["RAD_CALLFORM"] = "CALLFORMS";
chgRptNodeArray["RAD_ACTIONS"] = "ACTIONS";
chgRptNodeArray["RAD_ACTION"] = "WEB_SERVICES";

var nodeRptChildArray = new Array();
nodeRptChildArray['RAD_FUNC_PREFERENCES'] = "MENU_DETAILS";
nodeRptChildArray['RAD_DATASOURCES'] = "RAD_FIELDS";
nodeRptChildArray['RAD_LOVS'] = "RAD_LOV_DETAILS";
nodeRptChildArray['RAD_DATA_BLOCKS'] = "RAD_BLK_FIELDS~BLK_DATASOURCES";
nodeRptChildArray['RAD_BLK_FIELDS'] = "RAD_FIELD_CUSTOM_ATTRS~RAD_RETURN_FIELDS~RAD_BIND_VARS~RAD_FIELD_EVENTS~RAD_OFF_LINE_BIND_VARS~RAD_OFF_LINE_RETURN_FIELDS";
nodeRptChildArray['RAD_SCREENS'] = "SCREEN_ARGS~HEADER~BODY~FOOTER";
nodeRptChildArray['HEADER'] = "RAD_TABS";
nodeRptChildArray['BODY'] = "RAD_TABS";
nodeRptChildArray['FOOTER'] = "RAD_TABS";
nodeRptChildArray['RAD_TABS'] = "RAD_SECTIONS";
nodeRptChildArray['RAD_SECTIONS'] = "RAD_PARTITIONS";
nodeRptChildArray['RAD_FIELDSETS'] = "FIELDSET_FIELDS";
nodeRptChildArray['RAD_SUMMARY'] = "SUMMARY_DETAILS";
nodeRptChildArray['RAD_ACTIONS'] = "RAD_ACTION";
var chgRptElementArray = new Array();
chgRptElementArray = elementArray;
var chgRptNonCompareArray = new Array();
chgRptNonCompareArray = nodeNonCompareArray;
chgRptNonCompareArray['MENU_DETAILS'] = "LBL_FUNCTION_DESC~FUNCTION_DESC~LBL_FUNC_MODULE_DESC~FUNC_MODULE_DESC";

var nodeStatus = false;

function fnGenChangeRpt() {
    deleteAll('changereport');
    parent.gReqType = "APP";
    parent.gReqCode = "CHANGE_REPORT";
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");

    setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER//REQ_CODE"), parent.gReqCode);

    setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_TYPE"), 'APP');

    var srclist = document.getElementsByName("DEST_XML1")[0].value;
    var baselist = document.getElementsByName("DEST_XML2")[0].value;
    var destpath = srclist;
    destpath = destpath.substring(0, destpath.lastIndexOf("\\"));
    comparisontype = document.getElementById("Comparison_Type").value;
    var orderchanges = document.getElementById("Order_Changes").checked;
    if (orderchanges == false) {
        chgRptNonCompareArray["RAD_PARTITIONS"] = chgRptNonCompareArray["RAD_PARTITIONS"] + "~PARTITION_ORDER";
        chgRptNonCompareArray["FIELDSET_FIELDS"] = chgRptNonCompareArray['FIELDSET_FIELDS'] + "~FIELD_ORDER";
        chgRptNonCompareArray["RAD_FIELDSETS"] = chgRptNonCompareArray['RAD_FIELDSETS'] + "~FIELDSET_ORDER";
        chgRptNonCompareArray["RAD_TABS"] = chgRptNonCompareArray['RAD_TABS'] + "~TAB_ORDER";
        chgRptNonCompareArray["RAD_SECTIONS"] = chgRptNonCompareArray['RAD_SECTIONS'] + "~SEC_ORDER";
        chgRptNonCompareArray["RAD_DATA_BLOCKS"] = chgRptNonCompareArray['RAD_DATA_BLOCKS'] + "~DATA_BLK_ORDER";
        chgRptNonCompareArray["RAD_BLK_FIELDS"] = chgRptNonCompareArray['RAD_BLK_FIELDS'] + "~BLK_FIELD_ORDER";
    }

    sfileList = xmlFileList;
    sfileList = sfileList.split("\n");
    for (var fl = 0;fl < sfileList.length;fl++) {
        if (sfileList[fl] == "" || sfileList[fl] == "\n" || sfileList[fl] == "\r") {
        }
        else {
            sfileNamesArry[fl] = trim(sfileList[fl].substring(sfileList[fl].lastIndexOf("\\") + 1, sfileList[fl].length));
            sfilePathsArry[sfileNamesArry[fl]] = sfileList[fl].split("\r")[0];

        }
    }

    bfileList = xmlSrcFileList;
    bfileList = bfileList.split("\n");
    for (var fl = 0;fl < bfileList.length;fl++) {
        if (bfileList[fl] == "" || bfileList[fl] == "\n" || bfileList[fl] == "\r") {
        }
        else {
            bfileNamesArry[fl] = trim(bfileList[fl].substring(bfileList[fl].lastIndexOf("\\") + 1, bfileList[fl].length));
            bfilePathsArry[bfileNamesArry[fl]] = bfileList[fl].split("\r")[0];

        }
    }

    var i = 0;
    log += "---------------------------------------------------------------------------------------------------------------";
    log += "\n  FILE NAME \t\t\t\t\t\t\t   STATUS \t\t\t Error Description \t\t \n";
    log += "----------------------------------------------------------------------------------------------------------------\n";
    log += " Start Date Time " + dateDispaly();
    log += "----------------------------------------------------------------------------------------------------------------\n";
    for (rfl = 0;rfl < sfileNamesArry.length;rfl++) {

        try {
            var finalres = fnGenExcel(bfilePathsArry[bfileNamesArry[rfl]], sfilePathsArry[sfileNamesArry[rfl]], radReqDOM);

        }
        catch (e) {
            log += bfileNamesArry[rfl] + "\t\t\t\t\t Failed \t\t Not Generated ...\n";
            failedFiles = failedFiles + 1;
            countlog = "\n\nTotal No Of Files                         \t\t: " + sfileNamesArry.length + "\n";
            countlog += "Total No Of Successfully Generated Files  \t  : " + sucesFiles + "\n";
            countlog += "Total No Of Failed  Files                 \t  : " + failedFiles + "\n";
            fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");
            fnWriteMode(destpath, debugLog, parent.username + "_FRONTEND_LOG.txt");
            stat = "N";
            erordesc = "Failed";
        }
        countlog = "\nTotal No Of Files                           \t\t: " + sfileNamesArry.length + "\n";
        countlog += "Total No Of Successfully Generated Files  \t  : " + sucesFiles + "\n";
        countlog += "Total No Of Failed  Files                 \t  : " + failedFiles + "\n";
        fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");
        fnWriteMode(destpath, debugLog, parent.username + "_FRONTEND_LOG.txt");

        addNewRow('changereport');
        var tableObject = document.getElementById('changereport');
        var numRows = tableObject.tBodies[0].rows.length;
        tableObject.tBodies[0].rows[rfl].cells[0].getElementsByTagName("INPUT")[0].value = rfl + 1;
        tableObject.tBodies[0].rows[rfl].cells[1].getElementsByTagName("INPUT")[0].value = bfileNamesArry[rfl];
        tableObject.tBodies[0].rows[rfl].cells[2].getElementsByTagName("SELECT")[0].value = stat;
        tableObject.tBodies[0].rows[rfl].cells[3].getElementsByTagName("INPUT")[0].value = erordesc;

    }
    log += "----------------------------------------------------------------------------------------------------------------\n";
    log += "End Date Time : " + dateDispaly();
    log += "----------------------------------------------------------------------------------------------------------------\n";
    fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");
    if (sucesFiles >= 1) {
        parent.alertMessage("File Saved", "I");
    }
    return true;
}

function fnGenExcel(base, source, radReqDOM) {
    var sourcexml = javaBulkReadFile(source, "");
    var basexml = javaBulkReadFile(base, "");

    if (sourcexml == null || basexml == null) {
        log += bfileNamesArry[rfl] + "\t\t\t\t\t  Failed \t\t File Not Found...\n";
        failedFiles = failedFiles + 1;
        stat = "N";
        erordesc = "File Not Found";
        return;
    }
    if (sourcexml == false || basexml == false) {
        log += bfileNamesArry[rfl] + "\t\t\t\t\t  Failed \t\t File Not Found...\n";
        failedFiles = failedFiles + 1;
        stat = "N";
        erordesc = "File Not Found";
        return;
    }

    sourcexml = loadXMLDoc(sourcexml);
    basexml = loadXMLDoc(basexml);

    var sfuncTyp = getNodeText(selectSingleNode(sourcexml, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    var bfuncTyp = getNodeText(selectSingleNode(basexml, "//RAD_FUNCTIONS/FUNCTION_TYPE"));

    var sfuncid = getNodeText(selectSingleNode(sourcexml, "//RAD_FUNCTIONS/FUNCTION_ID"));
    var bfuncid = getNodeText(selectSingleNode(basexml, "//RAD_FUNCTIONS/FUNCTION_ID"));

    if (comparisontype == "PARENT_CHILD") {
        var parentsfuncid = getNodeText(selectSingleNode(sourcexml, "//RAD_FUNCTIONS/PARENT_FUNC_ID"));
        var parentbfuncid = getNodeText(selectSingleNode(basexml, "//RAD_FUNCTIONS/PARENT_FUNC_ID"));
        if (parentsfuncid != bfuncid && parentbfuncid != sfuncid) {
            log += bfileNamesArry[rfl] + "\t\t\t\t\t  Failed \t\t Parent Not Found...\n";
            failedFiles = failedFiles + 1;
            stat = "N";
            erordesc = "Parent Not Found";
            return false;
        }
    }
    var tempRelType = parent.relType;
    parent.relType = fnGetReleaseType(sourcexml);
    var vsrcdom = fnPrepareConsolDOM(sourcexml, sfuncid, sfuncTyp, "LOAD").cloneNode(true);
    parent.relType = fnGetReleaseType(basexml);
    var vbasedom = fnPrepareConsolDOM(basexml, bfuncid, bfuncTyp, "LOAD").cloneNode(true);
    parent.relType = tempRelType;
    fnInitializeHeaderArray(sourcexml, basexml);
    fnCreateDOMforChgRpt(vsrcdom, vbasedom);

    var response = CallCodeGenerator(radReqDOM, getXMLString(changeRptdom) + "--END OF RAD XML --" + "", "");
    response = frntndFiles + "--##FILE##--" + response;
    if (response != null && response != false) {
        log += bfileNamesArry[rfl] + "\t\t\t\t\t Successful \t\t Generated Successfully ...\n";
        sucesFiles = sucesFiles + 1;
        erordesc = "Generated Successfully";
        stat = "G";

    }
    var wres = fnwritedata(response, "SHARE");

}

function fnCreateDOMforChgRpt(srcdom, bsdom) {
    changeRptdom = "";
    changeRptdom.async = false;
    changeRptdom.resolveExternals = false;
    changeRptdom = "<?xml version='1.0' encoding='UTF-8'?>";
    changeRptdom = changeRptdom + "<CHANGE_REPORT/>";
    changeRptdom = loadXMLDoc(changeRptdom);
    srcdom = fnCorrectDomBeforeComparison(srcdom);
    bsdom = fnCorrectDomBeforeComparison(bsdom);
    fnPrepareHeaderNode();

    var all_nodes_vcr = document.getElementById("all_nodes_cr").checked;
    if (all_nodes_vcr == true) {
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_FUNC_PREFERENCES");
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_SUMMARY");
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_ACTIONS");
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_LAUNCHFORM");
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_CALLFORM");
    }
    var Data_blocks_vcr = document.getElementById("Data_blocks_cr").checked;
    if (Data_blocks_vcr == true) {
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_DATA_BLOCKS");
    }
    var Fieldset_vcr = document.getElementById("Fieldset_cr").checked;
    if (Fieldset_vcr == true) {
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_FIELDSETS");
    }
    var Data_source_vcr = document.getElementById("Data_source_cr").checked;
    if (Data_source_vcr == true) {
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_DATASOURCES");
    }
    var Lov_vChanges = document.getElementById("Lov_Changes").checked;
    if (Lov_vChanges == true) {
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_LOVS");
    }
    var Screen_vcr = document.getElementById("Screen_cr").checked;
    if (Screen_vcr == true) {
        fnPrepareChangeDomNode(srcdom, bsdom, "RAD_SCREENS");
    }

    changeRptdom = fnCorrectDomAfterComparison(changeRptdom);

}

function fnCreateChngReportFields(status, tagelement, eleid, level) {
    var path = "//CHANGE_REPORT";
    var rootNdpath = "//CHANGE_REPORT";
    var nodTagName = "NODE_ELEMENT";
    var nodTagElement = "TAG_ELEMENT";
    var nodeName = fnGetNodeName(tagelement);
    if (currCompNode == tagelement) {
        nodTagName = nodeName;
    }
    if (level == 1) {
        chgRptPathArray = new Array();
        chgRptPathArray[0] = nodTagName + "[@NODE_NAME='" + nodeName + "']";
        chgRptPathArray[0] = chgRptPathArray[0] + "/NODE_TAG[@ID='" + eleid + "']";
    }
    else {
        chgRptPathArray[level - 1] = nodTagName + "[@NODE_NAME='" + nodeName + "']";
        chgRptPathArray[level - 1] = chgRptPathArray[level - 1] + "/NODE_TAG[@ID='" + eleid + "']";
    }
    for (var i = 0;i < level;i++) {
        if (i == level - 1) {
            var aPosition = chgRptPathArray[i].indexOf("]");
            var partialElement = chgRptPathArray[i].substring(0, aPosition + 1);
            path = path + "/" + partialElement;
        }
        else {
            path = path + "/" + chgRptPathArray[i];
        }
    }

    if (nodeStatus) {

        var traildom = createRootNode("NODE_TAG");
        traildom.getElementsByTagName("NODE_TAG")[0].setAttribute("STATUS", status);
        traildom.getElementsByTagName("NODE_TAG")[0].setAttribute("ID", eleid);
        var rootNd = "NODE_TAG[@ID='" + eleid + "']";

        for (var i = 0;i < modNodesCnt;i++) {
            newel = traildom.createElement(nodTagElement);
            newel.setAttribute("TAG_NAME", chgRptModifiedNodes[i]);
            newel.setAttribute("STATUS", "MODIFIED");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']")[0];
            x.appendChild(newel);

            newel = traildom.createElement("OLD_VALUE");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptModifiedNodes[i] + "']")[0];
            x.appendChild(newel);
            setNodeText(selectSingleNode(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptModifiedNodes[i] + "']/OLD_VALUE"), chgRptOldVals[i]);

            newel = traildom.createElement("NEW_VALUE");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptModifiedNodes[i] + "']")[0];
            x.appendChild(newel);
            setNodeText(selectSingleNode(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptModifiedNodes[i] + "']/NEW_VALUE"), chgRptModifiedVals[i]);

        }
        for (var i = 0;i < newNodescnt;i++) {
            newel = traildom.createElement(nodTagElement);
            newel.setAttribute("TAG_NAME", chgRptNewNodes[i]);
            newel.setAttribute("STATUS", "NEW");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']")[0];
            x.appendChild(newel);

            newel = traildom.createElement("OLD_VALUE");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptNewNodes[i] + "']")[0];
            x.appendChild(newel);

            newel = traildom.createElement("NEW_VALUE");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptNewNodes[i] + "']")[0];
            x.appendChild(newel);
            setNodeText(selectSingleNode(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptNewNodes[i] + "']/NEW_VALUE"), chgRptNewVals[i]);

        }
        for (var i = 0;i < delNodesCnt;i++) {
            newel = traildom.createElement(nodTagElement);
            newel.setAttribute("TAG_NAME", chgRptDelNodes[i]);
            newel.setAttribute("STATUS", "DELETED");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']")[0];
            x.appendChild(newel);

            newel = traildom.createElement("OLD_VALUE");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptDelNodes[i] + "']")[0];
            x.appendChild(newel);
            setNodeText(selectSingleNode(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptDelNodes[i] + "']/OLD_VALUE"), chgRptDelVals[i]);

            newel = traildom.createElement("NEW_VALUE");
            x = selectNodes(traildom, "//NODE_TAG[@ID='" + eleid + "']/TAG_ELEMENT[@TAG_NAME='" + chgRptDelNodes[i] + "']")[0];
            x.appendChild(newel);

        }
        fnAppendParentFields(level, "MODIFIED");
        x = selectSingleNode(changeRptdom, path);
        x.appendChild(selectSingleNode(traildom, rootNd));
    }
}

function fnCompareforChangeRept(cons, base, node) {
    chgRptModifiedNodes = new Array();
    chgRptNewNodes = new Array();
    chgRptDelNodes = new Array();
    chgRptOldVals = new Array();
    chgRptNewVals = new Array();
    chgRptModifiedVals = new Array();
    chgRptDelVals = new Array();
    newNodescnt = 0;
    modNodesCnt = 0;
    delNodesCnt = 0;
    nodeStatus = false;
    var elelen = new Array();
    if (chgRptElementArray[node]) {
        elelen = chgRptElementArray[node].split("~");
    }
    var nonCompareArray = chgRptNonCompareArray[node];
    for (j = 0;j < elelen.length;j++) {
        if (base == null && cons == null) {
            null;
        }
        else if (base == null && cons != null) {
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1) {
                    var consval = fnGetNodeValue(cons, elelen[j]);
                    if (consval != "") {
                        chgRptNewNodes[newNodescnt] = fnGetNodeName(elelen[j]);
                        chgRptNewVals[newNodescnt] = consval;
                        newNodescnt++;
                        nodeStatus = true;
                    }

                }
            }
            else {
                var consval = fnGetNodeValue(cons, elelen[j]);
                if (consval != "") {
                    chgRptNewNodes[newNodescnt] = fnGetNodeName(elelen[j]);
                    chgRptNewVals[newNodescnt] = consval;
                    newNodescnt++;
                    nodeStatus = true;
                }
            }
        }
        else if (base != null && cons == null) {
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1) {
                    var baseval = fnGetNodeValue(base, elelen[j]);
                    if (baseval != "") {
                        chgRptDelNodes[delNodesCnt] = fnGetNodeName(elelen[j]);
                        chgRptDelVals[delNodesCnt] = baseval;
                        delNodesCnt++;
                        nodeStatus = true;
                    }
                }
            }
            else {
                var baseval = fnGetNodeValue(base, elelen[j]);
                if (baseval != "") {
                    chgRptDelNodes[delNodesCnt] = fnGetNodeName(elelen[j]);
                    chgRptDelVals[delNodesCnt] = baseval;
                    delNodesCnt++;
                    nodeStatus = true;
                }
            }
        }
        else if (selectSingleNode(cons, elelen[j]) != null && selectSingleNode(base, elelen[j]) != null) {
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1) {
                    var consval = fnGetNodeValue(cons, elelen[j]);
                    var baseval = fnGetNodeValue(base, elelen[j]);
                    if (baseval == "" && consval != "") {
                        chgRptNewNodes[newNodescnt] = fnGetNodeName(elelen[j]);
                        chgRptNewVals[newNodescnt] = consval;
                        newNodescnt++;
                        nodeStatus = true;
                    }
                    else if (baseval != "" && consval == "") {
                        chgRptDelNodes[delNodesCnt] = fnGetNodeName(elelen[j]);
                        chgRptDelVals[delNodesCnt] = baseval;
                        delNodesCnt++;
                        nodeStatus = true;
                    }
                    else if (baseval != consval) {
                        chgRptModifiedNodes[modNodesCnt] = fnGetNodeName(elelen[j]);
                        chgRptOldVals[modNodesCnt] = baseval;
                        chgRptModifiedVals[modNodesCnt] = consval;
                        modNodesCnt++;
                        nodeStatus = true;
                    }
                }
            }
            else {
                var consval = fnGetNodeValue(cons, elelen[j]);
                var baseval = fnGetNodeValue(base, elelen[j]);
                if (baseval == "" && consval != "") {
                    chgRptNewNodes[newNodescnt] = fnGetNodeName(elelen[j]);
                    chgRptNewVals[newNodescnt] = consval;
                    newNodescnt++;
                    nodeStatus = true;
                }
                else if (baseval != "" && consval == "") {
                    chgRptDelNodes[delNodesCnt] = fnGetNodeName(elelen[j]);
                    chgRptDelVals[delNodesCnt] = baseval;
                    delNodesCnt++;
                    nodeStatus = true;
                }
                else if (baseval != consval) {
                    chgRptModifiedNodes[modNodesCnt] = fnGetNodeName(elelen[j]);
                    chgRptOldVals[modNodesCnt] = baseval;
                    chgRptModifiedVals[modNodesCnt] = consval;
                    modNodesCnt++;
                    nodeStatus = true;
                }
            }
        }
        else if (selectSingleNode(cons, elelen[j]) == null && selectSingleNode(base, elelen[j]) != null) {
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1 && fnGetNodeValue(base, elelen[j]) != "") {
                    chgRptDelNodes[delNodesCnt] = fnGetNodeName(elelen[j]);
                    chgRptDelVals[delNodesCnt] = baseval;
                    delNodesCnt++;
                    nodeStatus = true;
                }
            }
            else {
                chgRptDelNodes[delNodesCnt] = fnGetNodeName(elelen[j]);
                chgRptDelVals[delNodesCnt] = baseval;
                delNodesCnt++;
                nodeStatus = true;
            }
        }
        else if (selectSingleNode(cons, elelen[j]) != null && selectSingleNode(base, elelen[j]) == null) {
            if (nonCompareArray) {
                var consval = fnGetNodeValue(cons, elelen[j]);
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1 && consval != "") {
                    chgRptNewNodes[newNodescnt] = fnGetNodeName(elelen[j]);
                    chgRptNewVals[newNodescnt] = consval;
                    newNodescnt++;
                    nodeStatus = true;
                }
            }
            else {
                var consval = fnGetNodeValue(cons, elelen[j]);
                if (consval != "") {
                    chgRptNewNodes[newNodescnt] = fnGetNodeName(elelen[j]);
                    chgRptNewVals[newNodescnt] = consval;
                    newNodescnt++;
                    nodeStatus = true;
                }
            }
        }
    }

}

function fnPrepareDeletedNodes(sourcedom, bsDelNode, nodeName, elementId, level) {
    var xpath = "//RAD_KERNEL";
    if (level == 1) {
        ChngDomXpath = new Array();
        ChngDomXpath[0] = nodeName + "[@ID='" + elementId + "']";
    }
    else {
        ChngDomXpath[level - 1] = nodeName + "[@ID='" + elementId + "']";
    }
    for (var p = 0;p < level;p++) {
        xpath = xpath + "/" + ChngDomXpath[p];
    }
    fnCompareforChangeRept(sourcedom, bsDelNode, nodeName);
    fnCreateChngReportFields('DELETED', nodeName, elementId, level);
    var childsLevel = nodeRptChildArray[nodeName];
    if (childsLevel) {
        var chldsArray = childsLevel.split("~");
        level = level + 1;
        for (var levelOne = 0;levelOne < chldsArray.length;levelOne++) {
            var baseDet = selectNodes(bsDelNode, xpath + "/" + chldsArray[levelOne]);
            for (var k = 0;k < baseDet.length;k++) {
                var delNodeId = baseDet[k].getAttribute("ID");
                fnPrepareDeletedNodes(sourcedom, baseDet[k], chldsArray[levelOne], delNodeId, level);
            }
        }
    }

}

function fnPrepareNewNodes(srcNewdom, bsNewdom, nodeName, elementId, level) {
    var xpath = "//RAD_KERNEL";
    if (level == 1) {
        ChngDomXpath = new Array();
        ChngDomXpath[0] = nodeName + "[@ID='" + elementId + "']";
    }
    else {
        ChngDomXpath[level - 1] = nodeName + "[@ID='" + elementId + "']";
    }
    for (var p = 0;p < level;p++) {
        xpath = xpath + "/" + ChngDomXpath[p];
    }
    fnCompareforChangeRept(srcNewdom, bsNewdom, nodeName);
    fnCreateChngReportFields('NEW', nodeName, elementId, level);
    var childsLevel = nodeRptChildArray[nodeName];
    if (childsLevel) {
        var chldsArray = childsLevel.split("~");
        level = level + 1;
        for (var levelOne = 0;levelOne < chldsArray.length;levelOne++) {
            var srcDet = selectNodes(srcNewdom, xpath + "/" + chldsArray[levelOne]);
            for (var k = 0;k < srcDet.length;k++) {
                var newNodeId = srcDet[k].getAttribute("ID");
                fnPrepareNewNodes(srcDet[k], bsNewdom, chldsArray[levelOne], newNodeId, level);
            }
        }
    }

}

function fnPrepareModifiedNodes(srcModdom, bsModdom, nodeName, elementId, level) {
    var xpath = "//RAD_KERNEL";
    if (level == 1) {
        ChngDomXpath = new Array();
        ChngDomXpath[0] = nodeName + "[@ID='" + elementId + "']";
    }
    else {
        ChngDomXpath[level - 1] = nodeName + "[@ID='" + elementId + "']";
    }
    for (var p = 0;p < level;p++) {
        xpath = xpath + "/" + ChngDomXpath[p];
    }
    fnCompareforChangeRept(srcModdom, bsModdom, nodeName);
    fnCreateChngReportFields('MODIFIED', nodeName, elementId, level);
    var childsLevel = nodeRptChildArray[nodeName];
    if (childsLevel) {
        var chldsArray = childsLevel.split("~");
        level = level + 1;
        // prepare new and modified child nodes		  
        for (var levelOne = 0;levelOne < chldsArray.length;levelOne++) {
            var srcDet = selectNodes(srcModdom, xpath + "/" + chldsArray[levelOne]);
            for (var k = 0;k < srcDet.length;k++) {
                var modNodeId = srcDet[k].getAttribute("ID");
                var basDet = selectSingleNode(bsModdom, xpath + "/" + chldsArray[levelOne] + "[@ID='" + modNodeId + "']");
                if (basDet) {
                    fnPrepareModifiedNodes(srcDet[k], basDet, chldsArray[levelOne], modNodeId, level);
                }
                else {
                    fnPrepareNewNodes(srcDet[k], basDet, chldsArray[levelOne], modNodeId, level);
                }
            }
        }
        // prepare deleted child nodes
        var basDet = selectNodes(bsModdom, xpath + "/" + chldsArray[levelOne]);
        for (var k = 0;k < basDet.length;k++) {
            var delid = basDet[k].getAttribute("ID");
            var srcDet = selectSingleNode(srcModdom, xpath + "/" + chldsArray[levelOne] + "[@ID='" + modNodeId + "']");
            if (srcDet == null) {
                fnPrepareDeletedNodes(srcDet, basDet[k], chldsArray[levelOne], delid, level);
            }
        }
    }

}

function fnPrepareChangeDomNode(srcdom, bsdom, nodeName) {
    currCompNode = nodeName;
    var srcNodes = selectNodes(srcdom, "//RAD_KERNEL/" + nodeName);
    // prepare new and modified nodes
    for (i = 0;i < srcNodes.length;i++) {

        var id = srcNodes[i].getAttribute("ID");
        if (id == null) {
            id = nodeName;
        }
        var baseNodes = selectSingleNode(bsdom, "//RAD_KERNEL/" + nodeName + "[@ID='" + id + "']");
        if (baseNodes) {
            fnPrepareModifiedNodes(srcNodes[i], baseNodes, nodeName, id, 1);
        }
        else if (baseNodes == null) {
            fnPrepareNewNodes(srcNodes[i], baseNodes, nodeName, id, 1);
        }
    }
    // prepare deleted nodes
    var baseNodes = selectNodes(bsdom, "//RAD_KERNEL/" + nodeName);
    for (i = 0;i < baseNodes.length;i++) {
        var id = baseNodes[i].getAttribute("ID");
        var srcNodes = selectSingleNode(srcdom, "//RAD_KERNEL/" + nodeName + "[@ID='" + id + "']");
        if (srcNodes == null) {
            fnPrepareDeletedNodes(srcNodes, baseNodes[i], nodeName, id, 1);
        }
    }
}

function createRootNode(node) {
    var rootNode = "";
    rootNode.async = false;
    rootNode.resolveExternals = false;
    rootNode = "<?xml version='1.0' encoding='UTF-8'?>";
    rootNode = rootNode + "<" + node + "/>";
    rootNode = loadXMLDoc(rootNode);
    return rootNode;
}

function fnAppendParentFields(level, status) {
    var tagId;
    var NodeElement;
    var NodeElementName;
    var scrPortion;
    var appendNodeBpath = "//CHANGE_REPORT";
    var appendNodeApath = "//CHANGE_REPORT";
    for (var app = 0;app < level;app++) {
        var aPosition = chgRptPathArray[app].indexOf("[");
        var firstPos = chgRptPathArray[app].indexOf("'");
        var secondPos = chgRptPathArray[app].indexOf("'", firstPos + 1);
        var thirdPos = chgRptPathArray[app].indexOf("'", secondPos + 1);
        var fourthPos = chgRptPathArray[app].indexOf("'", thirdPos + 1);
        NodeElement = chgRptPathArray[app].substring(0, aPosition);
        NodeElementName = chgRptPathArray[app].substring(firstPos + 1, secondPos);
        tagId = chgRptPathArray[app].substring(thirdPos + 1, fourthPos);
        appendNodeBpath = appendNodeBpath + "/" + NodeElement + "[@NODE_NAME='" + NodeElementName + "']";
        if (selectSingleNode(changeRptdom, appendNodeBpath) == null) {
            newel = changeRptdom.createElement(NodeElement);
            newel.setAttribute("NODE_NAME", NodeElementName);
            x = selectSingleNode(changeRptdom, appendNodeApath);
            x.appendChild(newel);
            appendNodeApath = appendNodeBpath;
            appendNodeBpath = appendNodeBpath + "/NODE_TAG[@ID='" + tagId + "']";
            if (app != level - 1) {
                newel = changeRptdom.createElement("NODE_TAG");
                newel.setAttribute("ID", tagId);
                newel.setAttribute("STATUS", status);
                x = selectSingleNode(changeRptdom, appendNodeApath);
                x.appendChild(newel);
            }
            appendNodeApath = appendNodeBpath;
        }
        else {
            appendNodeApath = appendNodeBpath;
            appendNodeBpath = appendNodeBpath + "/NODE_TAG[@ID='" + tagId + "']";
            if (selectSingleNode(changeRptdom, appendNodeBpath) == null && app != level - 1) {
                newel = changeRptdom.createElement("NODE_TAG");
                newel.setAttribute("ID", tagId);
                newel.setAttribute("STATUS", status);
                x = selectSingleNode(changeRptdom, appendNodeApath);
                x.appendChild(newel);
            }
            appendNodeApath = appendNodeBpath;
        }
    }

}

function fnCorrectDomBeforeComparison(InitialDom) {
    if (selectNodes(InitialDom, "//RAD_KERNEL/RAD_ACTIONS").length > 0) {
        var newe = selectSingleNode(InitialDom, "//RAD_KERNEL/RAD_ACTIONS");
        newe.setAttribute("ID", "ACTIONS");
    }
    return InitialDom;
}

function fnCorrectDomAfterComparison(finaldom) {
    var tmpdom = "";
    tmpdom.async = false;
    tmpdom.resolveExternals = false;
    tmpdom = "<?xml version='1.0' encoding='UTF-8'?>";
    tmpdom = loadXMLDoc(tmpdom);
    var scrprtns = "HEADER~BODY~FOOTER";
    var scrNodes = selectNodes(finaldom, "//SCREENS[@NODE_NAME='SCREENS']/NODE_TAG");
    for (var scr = 0;scr < scrNodes.length;scr++) {
        scrName = scrNodes[scr].getAttribute("ID");
        var scrprtn = scrprtns.split('~');
        for (var prtn = 0;prtn < scrprtn.length;prtn++) {
            var prtnNodes = selectNodes(finaldom, "//SCREENS[@NODE_NAME='SCREENS']/NODE_TAG[@ID='" + scrName + "']/NODE_ELEMENT[@NODE_NAME='" + scrprtn[prtn] + "']");
            for (var nodes = 0;nodes < prtnNodes.length;nodes++) {
                var tabNodes = selectNodes(finaldom, "//SCREENS[@NODE_NAME='SCREENS']/NODE_TAG[@ID='" + scrName + "']/NODE_ELEMENT[@NODE_NAME='" + scrprtn[prtn] + "']//NODE_ELEMENT[@NODE_NAME='TABS']");
                tmpdom.appendChild(tabNodes[0]);
                selectNodes(tmpdom, "//NODE_ELEMENT[@NODE_NAME='TABS']")[0].setAttribute("NODE_NAME", scrprtn[prtn] + "_TABS")
                selectNodes(finaldom, "//SCREENS[@NODE_NAME='SCREENS']/NODE_TAG[@ID='" + scrName + "']")[0].removeChild(prtnNodes[nodes]);
                var appNode = selectSingleNode(finaldom, "//SCREENS[@NODE_NAME='SCREENS']/NODE_TAG[@ID='" + scrName + "']");
                appNode.appendChild(selectSingleNode(tmpdom, "//NODE_ELEMENT[@NODE_NAME='" + scrprtn[prtn] + "_TABS']"));
            }
        }
    }
    return finaldom;
}

function fnInitializeHeaderArray(srcdom, basedom) {
    srcHeader = new Array();
    baseHeader = new Array();

    srcHeader['FUNCTION_ID'] = getNodeText(selectSingleNode(srcdom, "//RAD_FUNCTIONS/FUNCTION_ID"));
    srcHeader['RELEASE_CODE'] = getNodeText(selectSingleNode(srcdom, "//RAD_FUNCTIONS/RELEASE_CODE"));
    srcHeader['FUNCTION_TYPE'] = getNodeText(selectSingleNode(srcdom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    srcHeader['FUNCTION_CATEGORY'] = getNodeText(selectSingleNode(srcdom, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
    srcHeader['RELEASE_TYPE'] = fnGetReleaseType(srcdom);

    baseHeader['FUNCTION_ID'] = getNodeText(selectSingleNode(basedom, "//RAD_FUNCTIONS/FUNCTION_ID"));
    baseHeader['RELEASE_CODE'] = getNodeText(selectSingleNode(basedom, "//RAD_FUNCTIONS/RELEASE_CODE"));
    baseHeader['FUNCTION_TYPE'] = getNodeText(selectSingleNode(basedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    baseHeader['FUNCTION_CATEGORY'] = getNodeText(selectSingleNode(basedom, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
    baseHeader['RELEASE_TYPE'] = fnGetReleaseType(basedom);

}

function fnGetReleaseType(dom) {
    var releaseType;
    if (selectNodes(dom, "//RAD_CUSTOMER").length > 0 || selectNodes(dom, "//RAD_CHILD_CUSTOMER").length > 0 || selectNodes(dom, "//RAD_SCRCHLD_CUSTOMER").length > 0) {
        releaseType = "CUSTOMER";
    }
    else if (selectNodes(dom, "//RAD_CUSTOM").length > 0 || selectNodes(dom, "//RAD_CHILD_CUSTOM").length > 0 || selectNodes(dom, "//RAD_SCRCHLD_CUSTOM").length > 0) {
        releaseType = "CUSTOM";
    }
    else if (selectNodes(dom, "//RAD_CLUSTER").length > 0 || selectNodes(dom, "//RAD_CHILD_CLUSTER").length > 0 || selectNodes(dom, "//RAD_SCRCHLD_CLUSTER").length > 0) {
        releaseType = "CLUSTER";
    }
    else {
        releaseType = "KERNEL";
    }
    return releaseType;
}

function fnPrepareHeaderNode() {
    var traildom = createRootNode("HEADER");
    var headerNodes = "FUNCTION_ID~RELEASE_CODE~RELEASE_TYPE~FUNCTION_TYPE~FUNCTION_CATEGORY";
    var hdrNode = headerNodes.split('~');
    for (var hdr = 0;hdr < hdrNode.length;hdr++) {
        newel = traildom.createElement("TAG_ELEMENT");
        newel.setAttribute("TAG_NAME", hdrNode[hdr]);
        x = selectNodes(traildom, "//HEADER")[0];
        x.appendChild(newel);

        newel = traildom.createElement("OLD_VALUE");
        x = selectNodes(traildom, "//HEADER/TAG_ELEMENT[@TAG_NAME='" + hdrNode[hdr] + "']")[0];
        x.appendChild(newel);
        setNodeText(selectSingleNode(traildom, "//HEADER/TAG_ELEMENT[@TAG_NAME='" + hdrNode[hdr] + "']/OLD_VALUE"), srcHeader[hdrNode[hdr]]);

        newel = traildom.createElement("NEW_VALUE");
        x = selectNodes(traildom, "//HEADER/TAG_ELEMENT[@TAG_NAME='" + hdrNode[hdr] + "']")[0];
        x.appendChild(newel);
        setNodeText(selectSingleNode(traildom, "//HEADER/TAG_ELEMENT[@TAG_NAME='" + hdrNode[hdr] + "']/NEW_VALUE"), baseHeader[hdrNode[hdr]]);
    }
    x = selectSingleNode(changeRptdom, "CHANGE_REPORT");
    x.setAttribute("FUNCTION_ID", srcHeader['FUNCTION_ID']);
    x.appendChild(selectSingleNode(traildom, "HEADER"));

}

function fnGetNodeName(radNodeName) {
    if (chgRptNodeArray[radNodeName]) {
        return chgRptNodeArray[radNodeName];
    }
    else {
        return radNodeName;
    }
}

function fnGetNodeValue(dom, NodeName) {
    var nodeval;
    try {
        nodeval = getNodeText(selectSingleNode(dom, NodeName));
    }
    catch (e) {
        nodeval = "";
    }
    return nodeval;
}

function fnSetModeSrc(obj) {
    fngetReadMode('BULK'); 
        document.getElementsByName(obj)[0].disabled = false
        document.getElementsByName("BROWSE_SRC")[0].disabled = false;
        document.getElementsByName("FILE_SAVE_PATH_SRC")[0].disabled = false;
        document.getElementsByName(obj)[0].style.visibility = "hidden";
        document.getElementsByName("BROWSE_SRC")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH_SRC")[0].style.visibility = "visible"; 
}

function fnLoadRadXMLFORNONIE(p_funcId) {
    if (xmlFileList == "") {
        xmlFileList = loadxmldata;
        document.getElementById('FILE_SAVE_PATH').value = p_funcId;
    }
    else if (xmlFileList != "") {
        xmlSrcFileList = loadxmldata;
        document.getElementById('FILE_SAVE_PATH_SRC').value = p_funcId;
    }
}