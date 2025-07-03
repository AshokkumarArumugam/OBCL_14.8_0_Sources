/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadSrvGenerate.js
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
var srcFileNamesArry = new Array();
var srcFilePathsArry = new Array();
var destFileNamesArry = new Array();
var destFilePathsArry = new Array();
var ua = navigator.userAgent.toLowerCase();
var frntndFiles = "";
var g_Save_Dir = "";
var log = "";
var rdbglog = "";
var countlog = "";

function fnRefresh() {
    log = "";
    countlog = "";
    rdbglog = "Refresh Started \n";
    var RefreshSucceeded = 0;
    var RefreshFailed = 0;

    var releaseType = parent.relType;
    var srcfileList = "";
    var destfileList = "";
    var destPath = "";
    var logpath = parent.g_Wrk_Dir;
    releaseType = releaseType.toUpperCase();
    var tblObj = "RefResult";
    var srRtIndx = document.getElementsByName("SRCRTP")[0].options.selectedIndex;
    var srcRelType = document.getElementsByName("SRCRTP")[0].options[srRtIndx].value;
    var bsRtIndx = document.getElementsByName("BSRTP")[0].options.selectedIndex;
    var bsRelType = document.getElementsByName("BSRTP")[0].options[bsRtIndx].value;

    if (document.getElementsByName(tblObj)[0].tBodies[0].rows.length > 0) {
        deleteAll(tblObj);
    }
    if (parent.saveformat == "ZIP") {
        alertMessage("Save Mode Should be Client Or Server", "E");
        return false;
    }
    var stat = "";

    srcfileList = xmlFileList;
    srcfileList = srcfileList.split("\n");
    for (var fl = 0;fl < srcfileList.length;fl++) {
        if (srcfileList[fl] == "" || srcfileList[fl] == "\n" || srcfileList[fl] == "\r") {
        }
        else {
            srcFileNamesArry[fl] = trim(srcfileList[fl].substring(srcfileList[fl].lastIndexOf("\\") + 1, srcfileList[fl].length));
            srcFilePathsArry[srcFileNamesArry[fl]] = srcfileList[fl].split("\r")[0];
        }
    }
    destfileList = xmlSrcFileList;
    destfileList = destfileList.split("\n");
    for (var fl = 0;fl < destfileList.length;fl++) {
        if (destfileList[fl] == "" || destfileList[fl] == "\n" || destfileList[fl] == "\r") {
        }
        else {
            destFileNamesArry[fl] = trim(destfileList[fl].substring(destfileList[fl].lastIndexOf("\\") + 1, destfileList[fl].length));
            destFilePathsArry[destFileNamesArry[fl]] = destfileList[fl].split("\r")[0];
        }
    }
    for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
        subFldr = srcFilePathsArry[srcFileNamesArry[rfl]].substring(0, srcFilePathsArry[srcFileNamesArry[rfl]].lastIndexOf("\\"));
        subFldr = subFldr.substring(0, subFldr.lastIndexOf("\\"));
        subFldr = subFldr.substring(subFldr.lastIndexOf("\\") + 1, subFldr.length);
    }

    log += "---------------------------------------------------------------------------------------------------------------\r\n";
    log += "  File Name  \t  | Sub Folder \t      | File Status \t  | Error Description                   \r\n";
    log += " Start Date Time " + dateDispaly();
    log += "---------------------------------------------------------------------------------------------------------------\r\n";

    rdbglog += "Doing Source Refresh \n";
    for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
        try {
            subFldr = srcFilePathsArry[srcFileNamesArry[rfl]].substring(0, srcFilePathsArry[srcFileNamesArry[rfl]].lastIndexOf("\\"));
            subFldr = subFldr.substring(0, subFldr.lastIndexOf("\\"));
            subFldr = subFldr.substring(subFldr.lastIndexOf("\\") + 1, subFldr.length);
            destPath = srcFilePathsArry[srcFileNamesArry[rfl]].substring(0, srcFilePathsArry[srcFileNamesArry[rfl]].lastIndexOf("\\"));
            xml1 = javaBulkReadFile(srcFilePathsArry[srcFileNamesArry[rfl]], "");
            g_Save_Dir = destPath;
            if (g_Save_Dir.substring(g_Save_Dir.lastIndexOf("\\") + 1, g_Save_Dir.length) == "RADXML") {
                g_Save_Dir = g_Save_Dir.substring(0, g_Save_Dir.lastIndexOf("\\"));
            }
            updatedom = loadXMLDoc(xml1);
            // Fix For Refresh.
            if (xml1 == null || xml1 == false) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Not Found...");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Not Found...";
                log += "\r\n";
                RefreshFailed++;
                continue;
            }
            if (xml1.indexOf("RAD_KERNEL") ==  - 1) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Invalid...");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Invalid...";
                log += "\r\n";
                RefreshFailed++;
                continue;
            }
            if (xml1.indexOf("RAD_NOTIFICATIONS") !=  - 1) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Notification Radxml...");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Notification Radxml...";
                log += "\r\n";
                RefreshFailed++;
                continue;
            }
            //
            if (selectNodes(updatedom, "//RAD_KERNEL").length == 0) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Invalid...");
                continue;
            }
            var xml2 = javaBulkReadFile(destFilePathsArry[srcFileNamesArry[rfl]], "");

            // Fix For Refresh.
            if (xml2 == null || xml2 == false) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Not Found...");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Not Found...";
                log += "\r\n";
                RefreshFailed++;
                continue;
            }
            if (xml2.indexOf("RAD_KERNEL") ==  - 1) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Invalid...");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Invalid...";
                log += "\r\n";
                RefreshFailed++;
                continue;
            }
            if (xml2.indexOf("RAD_NOTIFICATIONS") !=  - 1) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Notification Radxml...");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Notification Radxml...";
                log += "\r\n";
                RefreshFailed++;
                continue;
            }
            //
            scrpath = destFilePathsArry[srcFileNamesArry[rfl]].substring(0, destFilePathsArry[srcFileNamesArry[rfl]].lastIndexOf("\\"));
            basedom = loadXMLDoc(xml2);
            if (selectNodes(basedom, "//RAD_KERNEL").length == 0) {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + ".sxml Is Invalid...");
                continue;
            }
            if (getXMLString(basedom) == "") {
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Base Rad xml for " + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]) + " Not Available... Failed to Refresh");
            }
            else {
                if (fnParentRefresh(updatedom, basedom, srcFileNamesArry[rfl], g_Save_Dir, scrpath)) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'S', "");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Refreshed" + "\t   " + "Source Refresh Done !!";
                    log += "\r\n";
                    rdbglog += srcFileNamesArry[rfl] + "\t Refreshed Source Refresh Done !! \r\n";
                    RefreshSucceeded++;
                }
                else {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done !!";
                    log += "\r\n";
                    rdbglog += srcFileNamesArry[rfl] + "\t  Failed  Source Refresh Not Done !! \r\n";
                    RefreshFailed++;
                }
            }
        }
        catch (e) {
            RefreshFailed = RefreshFailed + 1;
            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "Failed");
            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done !!";
            log += "\r\n";

        }
        countlog = "\r\n\r\nTotal Number of Files  :  " + srcFileNamesArry.length;
        countlog += "\r\n";
        countlog += "Total Number of Files Successfully Refreshed : " + RefreshSucceeded;
        countlog += "\r\n";
        countlog += "Total Number of Files Failed 				 : " + RefreshFailed;
        countlog += "\r\n";
        fnWriteMode(logpath, log + countlog, parent.username + "_Refresh_Log.txt");
    }
    xml1 = null;
    xml2 = null;

    log += "\n\n";
    log += "----------------------------------------------------------------------------------------------------------------\n";
    log += "End Date Time : " + dateDispaly();
    log += "----------------------------------------------------------------------------------------------------------------";
    log += "\r\n\r\nTotal Number of Files  :  " + srcFileNamesArry.length;
    log += "\r\n";
    log += "Total Number of Files Successfully Refreshed : " + RefreshSucceeded;
    log += "\r\n";
    log += "Total Number of Files Failed 				 : " + RefreshFailed;
    log += "\r\n";

    rdbglog += "====================================================\n";
    rdbglog += "Refresh Completed \n";
    fnWriteMode(logpath, log, parent.username + "_Refresh_Log.txt");
    fnWriteMode(logpath, rdbglog, parent.username + "_REFRESH_ReportLog.txt");
}

function fnParentRefresh(updatedom, basedom, filename, destpath, scrpath) {
    rdbglog += "====================================================\n";
    rdbglog += "Doing Parent Refresh for " + filename + "\n";
    rdbglog += "----------------------------------------------------\n";
    var releasee = parent.relType;
    var srRtIndx = document.getElementsByName("SRCRTP")[0].options.selectedIndex;
    var srcRelType = document.getElementsByName("SRCRTP")[0].options[srRtIndx].value;
    var bsRtIndx = document.getElementsByName("BSRTP")[0].options.selectedIndex;
    var bsRelType = document.getElementsByName("BSRTP")[0].options[bsRtIndx].value;
    var func_id = getNodeText(selectNodes(basedom, "//RAD_FUNCTIONS/SERVICE_NAME")[0]);
    var frntndFiles = "";
    if (destpath.substring(destpath.length - 1, destpath.length) != "\\") {
        destpath = destpath + "\\";
    }
    updatedom = fnApplyTempCorrections(updatedom, srcRelType);
    basedom = fnApplyTempCorrections(basedom, bsRelType);

    if (srcRelType == 'CLUSTER') {
        if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") != null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") == null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_KERNEL");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }

        var lang = parent.lang;
        frntndFiles += parent.gBodySeparator + ("RADXML\\" + filename + "--") + getXMLString(updatedom);
        schName = parent.jndiName;
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
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(updatedom) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        var wres = fnwritedata(response, parent.saveformat);
        return true;
    }

    if (srcRelType == 'CUSTOM') {
        if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") != null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") == null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_KERNEL");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CLUSTER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        var lang = parent.lang;
        frntndFiles += parent.gBodySeparator + ("RADXML\\" + filename + "--") + getXMLString(updatedom);
        schName = parent.jndiName;
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
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(updatedom) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        var wres = fnwritedata(response, parent.saveformat);
        return true;

    }

    if (srcRelType == 'CUSTOMER') {
        if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") != null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") == null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_KERNEL");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CLUSTER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        if (selectSingleNode(basedom, "//RAD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_CUSTOM") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CUSTOM").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CUSTOM");
            rdbglog += "Copying RAD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_CUSTOM") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CUSTOM").cloneNode(true);
            var clustNode = updatedom.createElement("RAD_CUSTOM");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD"));
            x = selectSingleNode(updatedom, "//RAD_CUSTOM");
            rdbglog += "Copying RAD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        var lang = parent.lang;
        frntndFiles += parent.gBodySeparator + ("RADXML\\" + func_id + ".sxml--") + getXMLString(updatedom);
        schName = parent.jndiName;
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
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(updatedom) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        var wres = fnwritedata(response, parent.saveformat);
        return true;

    }
    return false;

}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function loadRADXMLFilesSrc(obj) {
    var radXml = fnReadMode("", document.getElementsByName(obj)[0].value, document.getElementsByName(obj)[0]);
    xmlSrcFileList = radXml;
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

function fnApplyTempCorrections(NewDOM, releaseType) {
    rdbglog += "Applying TempCorrections \n";
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_KERNEL");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CLUSTER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CUSTOM");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CUSTOMER");
    return NewDOM;
}

function fnRelvalidations() {
    rdbglog += "Checking Release Validations \n";
    var relType = parent.relType;
    document.getElementsByName('SRCRTP')[0].disabled = false;
    document.getElementsByName('BSRTP')[0].disabled = false;
    document.getElementsByName('SRCRTP')[0].options.length = 0;
    document.getElementsByName('BSRTP')[0].options.length = 0;
    document.getElementsByName('SRCRTP')[0].options[0] = new Option("Cluster", "CLUSTER", true, false);
    document.getElementsByName('SRCRTP')[0].options[1] = new Option("Custom", "CUSTOM", false, false);
    document.getElementsByName('BSRTP')[0].options[0] = new Option("Kernel", "KERNEL", true, false);
}

function fnSetBaseRel() {
    rdbglog += "Setting Base Release \n";

    var srcRelIndx = document.getElementsByName('SRCRTP')[0].options.selectedIndex;
    var srcRelse = document.getElementsByName('SRCRTP')[0].options[srcRelIndx].value;

    if (srcRelse == 'CLUSTER') {
        document.getElementsByName('BSRTP')[0].options.length = 0;
        document.getElementsByName('BSRTP')[0].options[0] = new Option("Kernel", "KERNEL", true, false);
    }

    if (srcRelse == 'CUSTOM') {
        document.getElementsByName('BSRTP')[0].options.length = 0;
        document.getElementsByName('BSRTP')[0].options[0] = new Option("Kernel", "KERNEL", true, false);
        document.getElementsByName('BSRTP')[0].options[1] = new Option("Cluster", "CLUSTER", true, false);

    }

    if (srcRelse == 'CUSTOMER') {
        document.getElementsByName('BSRTP')[0].options.length = 0;
        document.getElementsByName('BSRTP')[0].options[0] = new Option("kernel", "KERNEL", true, false);
        document.getElementsByName('BSRTP')[0].options[1] = new Option("Cluster", "CLUSTER", true, false);
        document.getElementsByName('BSRTP')[0].options[2] = new Option("Custom", "CUSTOM", false, false);
    }
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