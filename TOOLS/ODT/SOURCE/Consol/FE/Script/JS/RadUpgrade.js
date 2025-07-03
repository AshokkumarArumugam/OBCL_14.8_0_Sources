/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadUpgrade.js
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
  
  SFR Number         :  31212657
  Changed By         :  N S Anirudhan
  Change Description :  Considering base and source summary as different 
                        even if the length between the same is different.
                        As the loop is done till the length of Base, when there are 
                        more fields in Source, the extra fields were not considered as 
                        change.
  
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
    var rSIndx = document.getElementsByName("RFRSHMODE")[0].options.selectedIndex;
    var rfsMode = document.getElementsByName("RFRSHMODE")[0].options[rSIndx].value;
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
	for (var fl = 0; fl < srcfileList.length; fl++) {
		if (!(srcfileList[fl] == "" || srcfileList[fl] == "\r")) {

			srcFileNamesArry[fl] = trim(getFileName(srcfileList[fl]));
			srcFilePathsArry[srcFileNamesArry[fl]] = srcfileList[fl].split("\r")[0];
		}

	}
	destfileList = xmlSrcFileList;
	destfileList = destfileList.split("\n");
	for (var fl = 0; fl < destfileList.length; fl++) {
		if (!(destfileList[fl] == "" || destfileList[fl] == "\r")) {

			destFileNamesArry[fl] = trim(getFileName(destfileList[fl]));
			destFilePathsArry[destFileNamesArry[fl]] = destfileList[fl].split("\r")[0];
		}
	}
    for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
        subFldr = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
        subFldr = getParentPath(subFldr);
        subFldr = getFileName(subFldr);
    }

    log += "---------------------------------------------------------------------------------------------------------------\r\n";
    log += "  File Name  \t  | Sub Folder \t      | File Status \t  | Error Description                   \r\n";
    log += " Start Date Time " + dateDispaly();
    log += "---------------------------------------------------------------------------------------------------------------\r\n";

    if (rfsMode == "SR") {
        rdbglog += "Doing Source Refresh \n";
        for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
            try {
                subFldr = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                subFldr = getParentPath(subFldr);
                subFldr = getFileName(subFldr);
                destPath = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                xml1 = javaBulkReadFile(srcFilePathsArry[srcFileNamesArry[rfl]], "");
                g_Save_Dir = destPath;
                if (getFileName(g_Save_Dir) == "RADXML") {
                    g_Save_Dir = getParentPath(g_Save_Dir);
                }
                updatedom = loadXMLDoc(xml1);
                // Fix For Refresh.
                if (xml1 == null || xml1 == false) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Not Found...");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Not Found...";
                    log += "\r\n";
                    RefreshFailed++;
                    continue;
                }
                if (xml1.indexOf("RAD_KERNEL") ==  - 1) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...";
                    log += "\r\n";
                    RefreshFailed++;
                    continue;
                }
                if (xml1.indexOf("RAD_NOTIFICATIONS") !=  - 1) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Notification Radxml...");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Notification Radxml...";
                    log += "\r\n";
                    RefreshFailed++;
                    continue;
                }
                //
                if (selectNodes(updatedom, "//RAD_KERNEL").length == 0) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...");
                    continue;
                }
                var functype = getNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
                var xml2 = javaBulkReadFile(destFilePathsArry[srcFileNamesArry[rfl]], "");

                // Fix For Refresh.
                if (xml2 == null || xml2 == false) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Not Found...");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Not Found...";
                    log += "\r\n";
                    RefreshFailed++;
                    continue;
                }
                if (xml2.indexOf("RAD_KERNEL") ==  - 1) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...";
                    log += "\r\n";
                    RefreshFailed++;
                    continue;
                }
                if (xml2.indexOf("RAD_NOTIFICATIONS") !=  - 1) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Notification Radxml...");
                    log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t    base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Notification Radxml...";
                    log += "\r\n";
                    RefreshFailed++;
                    continue;
                }
                //
                scrpath = getParentPath(destFilePathsArry[srcFileNamesArry[rfl]]);
                basedom = loadXMLDoc(xml2);
                var bsFuncTpe = getNodeText(selectSingleNode(basedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
                if (selectNodes(basedom, "//RAD_KERNEL").length == 0) {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...");
                    continue;
                }
                if (getXMLString(basedom) == "") {
                    fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Base Rad xml for " + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + " Not Available... Failed to Refresh");
                }
                else if (functype == "P") {
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

        for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
            try {
                subFldr = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                subFldr = getParentPath(subFldr);
                subFldr = getFileName(subFldr);
                destPath = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                g_Save_Dir = destPath;
                if (getFileName(g_Save_Dir) == "RADXML") {
                    g_Save_Dir = getParentPath(g_Save_Dir);
                }
                
                xml1 = javaBulkReadFile(srcFilePathsArry[srcFileNamesArry[rfl]], "");

                // Fix For Refresh.
                if (xml1.indexOf("RAD_KERNEL") ==  - 1) {
                    continue;
                }
                if (xml1.indexOf("RAD_NOTIFICATIONS") !=  - 1) {
                    continue;
                }
                //
                updatedom = loadXMLDoc(xml1);
                var functype = getNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
                if (functype == 'C') {
                    var filename1 = getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/PARENT_FUNC_ID")[0]);
                    updatedom = removeChildNode(updatedom, srcRelType);
                    updatedom = fnApplyTempCorrections(updatedom, srcRelType);
                    var parentdestPath = "";
                    if (parent.g_Wrk_Dir.substring(parent.g_Wrk_Dir.length - 1, parent.g_Wrk_Dir.length) != "\\") {
                        parent.g_Wrk_Dir = parent.g_Wrk_Dir + "\\";
                    }
                    parentdestPath = parent.g_Wrk_Dir + "RADXML\\" + filename1 + "_RAD.xml";
                    var xml2 = javaBulkReadFile(parentdestPath, "");
                    scrpath = getParentPath(destFilePathsArry[srcFileNamesArry[rfl]]);
                    basedom = loadXMLDoc(xml2);
                    if (selectNodes(basedom, "//RAD_KERNEL").length == 0) {
                        fnShowResult(tblObj, filename1 + "_RAD.xml", subFldr, 'F', "Base File:" + getNodeText(selectNodes(basedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...\r\n");
                        continue;
                    }
                    else if (selectNodes(updatedom, "//RAD_KERNEL").length == 0) {
                        fnShowResult(tblObj, filename1 + "_RAD.xml", subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...\r\n");
                        continue;
                    }
                    if (getXMLString(basedom) == "") {
                        fnShowResult(tblObj, filename1 + "_RAD.xml", subFldr, 'F', "Base Rad xml for " + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + " Not Available in Source Release... Failed to Refresh \r\n");

                    }
                    else {
                        var tempdom = fnChildRefresh(updatedom, basedom, srcFileNamesArry[rfl], g_Save_Dir, scrpath, "YES");
                        if (tempdom) {
                            updatedom = tempdom;

                        }
                        else {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "FAILED");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done For Child!!";
                            log += "\r\n";
                            RefreshFailed++;

                        }
                        var filename2 = getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
                        var xml2 = javaBulkReadFile(destFilePathsArry[filename2 + "_RAD.xml"], "");
                        scrpath = getParentPath(destFilePathsArry[srcFileNamesArry[rfl]]);
                        basedom = loadXMLDoc(xml2);
                        basedom = removeChildNode(basedom, bsRelType);
                        basedom = fnApplyTempCorrections(basedom, bsRelType);
                        basedom = fnCorrectFieldsets(basedom, updatedom, srcRelType);
                        if (fnUpdateBaseChildNode(updatedom, basedom, srcFileNamesArry[rfl], destPath, scrpath, "YES")) {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'S', "");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Refreshed" + "\t   " + "Source Refresh Done For Child !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t   \t Refreshed \t    Source Refresh Done For Child !!";
                            rdbglog += "\r\n";

                            RefreshSucceeded++;
                        }
                        else {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "FAILED");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done For Child !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t   \t Failed \t    Source Refresh Not Done For Child !!";
                            rdbglog += "\r\n";
                            RefreshFailed++;
                        }
                    }
                }

            }
            catch (e) {
                RefreshFailed = RefreshFailed + 1;
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "Failed");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done For Child !!";
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

        for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
            try {
                subFldr = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                subFldr = getParentPath(subFldr);
                subFldr = getFileName(subFldr);
                destPath = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                
                g_Save_Dir = destPath;
                if (getFileName(g_Save_Dir) == "RADXML") {
                    g_Save_Dir = getParentPath(g_Save_Dir);
                }
                xml1 = javaBulkReadFile(srcFilePathsArry[srcFileNamesArry[rfl]], "");
                updatedom = loadXMLDoc(xml1);
                // Fix For Refresh.
                if (xml1.indexOf("RAD_KERNEL") ==  - 1) {
                    continue;
                }
                if (xml1.indexOf("RAD_NOTIFICATIONS") !=  - 1) {
                    continue;
                }
                var functype = getNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
                if (functype == 'S') {
                    var filename1 = getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/PARENT_FUNC_ID")[0]);
                    updatedom = removeChildNode(updatedom, srcRelType);
                    updatedom = fnApplyTempCorrections(updatedom, srcRelType);
                    var parentdestPath = "";
                    if (parent.g_Wrk_Dir.substring(parent.g_Wrk_Dir.length - 1, parent.g_Wrk_Dir.length) != "\\") {
                        parent.g_Wrk_Dir = parent.g_Wrk_Dir + "\\";
                    }
                    parentdestPath = parent.g_Wrk_Dir + "RADXML\\" + filename1 + "_RAD.xml";
                    var xml2 = javaBulkReadFile(parentdestPath, "");
                    scrpath = getParentPath(destFilePathsArry[srcFileNamesArry[rfl]]);
                    basedom = loadXMLDoc(xml2);
                    if (selectNodes(basedom, "//RAD_KERNEL").length == 0) {
                        fnShowResult(tblObj, filename1 + "_RAD.xml", subFldr, 'F', "Base File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...\r\n");
                        continue;
                    }
                    else if (selectNodes(updatedom, "//RAD_KERNEL").length == 0) {
                        fnShowResult(tblObj, filename1 + "_RAD.xml", subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...\r\n");
                        continue;
                    }
                    if (getXMLString(basedom) == "") {
                        fnShowResult(tblObj, filename1 + "_RAD.xml", subFldr, 'F', "Base Rad xml for " + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + " Not Available in Source Release... Failed to Refresh \r\n");

                    }
                    else {
                        var tempdom = fnScreenChildRefresh(updatedom, basedom, srcFileNamesArry[rfl], g_Save_Dir, scrpath, "YES");
                        if (tempdom) {
                            updatedom = tempdom;

                        }
                        else {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "FAILED");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done For Screen Child !!";
                            log += "\r\n";
                            RefreshFailed++;

                        }
                        var filename2 = getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
                        var xml2 = javaBulkReadFile(destFilePathsArry[filename2 + "_RAD.xml"], "");
                        scrpath = getParentPath(destFilePathsArry[srcFileNamesArry[rfl]]);
                        basedom = loadXMLDoc(xml2);
                        basedom = removeChildNode(basedom, bsRelType);
                        basedom = fnApplyTempCorrections(basedom, bsRelType);
                        basedom = fnCorrectFieldsets(basedom, updatedom, srcRelType);
                        if (fnUpdateBaseScrChildNode(updatedom, basedom, srcFileNamesArry[rfl], destPath, scrpath, "YES")) {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'S', "");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Refreshed" + "\t   " + "Source Refresh Done For Screen Child !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t   \t Refreshed \t   Source Refresh Done For Screen Child !!";
                            rdbglog += "\r\n";
                            RefreshSucceeded++;
                        }
                        else {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "FAILED");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done For Screen Child !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t  \t Failed \t   Source Refresh Not Done For Screen Child !!";
                            rdbglog += "\r\n";
                            RefreshFailed++;
                        }
                    }
                }

            }
            catch (e) {
                RefreshFailed = RefreshFailed + 1;
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "Failed");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Source Refresh Not Done For Screen Child !!";
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

    }
    else if (rfsMode == "CR") {
        rdbglog += "Doing Child Refresh \n";
        for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
            try {
                subFldr = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                subFldr = getParentPath(subFldr);
                subFldr = getFileName(subFldr);
                destPath = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                
                g_Save_Dir = destPath;
                if (getFileName(g_Save_Dir) == "RADXML") {
                    g_Save_Dir = getParentPath(g_Save_Dir);
                }

                if (srcFileNamesArry[rfl].indexOf("_RAD") !=  - 1 || srcFileNamesArry[rfl].indexOf("_rad") !=  - 1) {
                    xml1 = javaBulkReadFile(srcFilePathsArry[srcFileNamesArry[rfl]], "");
                    updatedom = loadXMLDoc(xml1);
                    if (selectNodes(updatedom, "//RAD_KERNEL").length == 0) {
                        fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...\r\n");
                        continue;
                    }
                    scrpath = "";
                    var functype = getNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
                    if (functype == 'C') {
                        var filename1 = getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/PARENT_FUNC_ID")[0]);
                        var xml2 = javaBulkReadFile(destFilePathsArry[filename1 + "_RAD.xml"], "");
                        basedom = loadXMLDoc(xml2);
                        if (fnChildRefresh(updatedom, basedom, srcFileNamesArry[rfl], g_Save_Dir, scrpath, "NO")) {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'S', "");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Refreshed" + "\t   " + "Child Refresh Done !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t   \t Refreshed \t   Child Refresh  Done !!";
                            rdbglog += "\r\n";
                            RefreshSucceeded++;

                        }
                        else {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "FAILED");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Child Refresh Not Done !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t   \t Failed \t   Child Refresh Not Done !!";
                            rdbglog += "\r\n";
                            RefreshFailed++;

                        }

                    }
                }
            }
            catch (e) {
                RefreshFailed = RefreshFailed + 1;
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "Failed");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "Child Refresh Not Done !!";
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
    }
    else if (rfsMode == "SCR") {
        rdbglog += "Doing Screen Child Refresh \n";

        for (var rfl = 0;rfl < srcFileNamesArry.length;rfl++) {
            try {
                subFldr = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                subFldr = getParentPath(subFldr);
                subFldr = getFileName(subFldr);
                destPath = getParentPath(srcFilePathsArry[srcFileNamesArry[rfl]]);
                
                g_Save_Dir = destPath;
                if (getFileName(g_Save_Dir) == "RADXML") {
                    g_Save_Dir = getParentPath(g_Save_Dir);
                }

                if (srcFileNamesArry[rfl].indexOf("_RAD") !=  - 1 || srcFileNamesArry[rfl].indexOf("_rad") !=  - 1) {
                    xml1 = javaBulkReadFile(srcFilePathsArry[srcFileNamesArry[rfl]], "");
                    updatedom = loadXMLDoc(xml1);
                    if (selectNodes(updatedom, "//RAD_KERNEL").length == 0) {
                        fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'F', "Source File:" + getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]) + "_RAD.xml Is Invalid...\r\n");
                        continue;
                    }
                    scrpath = "";
                    var functype = getNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
                    if (functype == 'S') {
                        var filename1 = getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/PARENT_FUNC_ID")[0]);
                        var xml2 = javaBulkReadFile(destFilePathsArry[filename1 + "_RAD.xml"], "");
                        basedom = loadXMLDoc(xml2);
                        var tempdom = fnScreenChildRefresh(updatedom, basedom, srcFileNamesArry[rfl], g_Save_Dir, scrpath, "NO");
                        if (tempdom) {
                            updatedom = tempdom;
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'S', "");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Refreshed" + "\t   " + "ScreenChild Refresh Done !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t   \t Refreshed \t   ScreenChild Refresh  Done !!";
                            rdbglog += "\r\n";
                            RefreshSucceeded++;

                        }
                        else {
                            fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "FAILED");

                            log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "ScreenChild Refresh Not Done !!";
                            log += "\r\n";
                            rdbglog += srcFileNamesArry[rfl] + "\t   \t Failed \t   ScreenChild Refresh  Not Done !!";
                            rdbglog += "\r\n";
                            RefreshFailed++;

                        }

                    }
                }
            }
            catch (e) {
                RefreshFailed = RefreshFailed + 1;
                fnShowResult(tblObj, srcFileNamesArry[rfl], subFldr, 'N', "Failed");
                log += srcFileNamesArry[rfl] + "\t   " + subFldr + "\t" + "Failed" + "\t   " + "ScreenChild Refresh Not Done !!";
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
    }

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
    var functype = getNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    var func_id = getNodeText(selectNodes(basedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
    var frntndFiles = "";
    if (destpath.substring(destpath.length - 1, destpath.length) != "\\") {
        destpath = destpath + "\\";
    }
    updatedom = fnApplyTempCorrections(updatedom, srcRelType);
    basedom = fnApplyTempCorrections(basedom, bsRelType);
    basedom = fnCorrectFieldsets(basedom, updatedom, srcRelType);
    updatedom = fnCorrectRad_Actions_beforeRefresh(updatedom);
	updatedom = fnCorrectRad_Summary_beforeRefresh(updatedom);

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

        updatedom = fnCorrectionAfterRefresh(updatedom);
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
        updatedom = fnCorrectionAfterRefresh(updatedom);
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
        updatedom = fnCorrectionAfterRefresh(updatedom);
        var lang = parent.lang;
        frntndFiles += parent.gBodySeparator + ("RADXML\\" + func_id + "_RAD.xml--") + getXMLString(updatedom);
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

function fnChildRefresh(updatedom, basedom, filename, destpath, scrpath, srcRfrsh) {
    rdbglog += "====================================================\n";
    rdbglog += "Doing Child Refresh for " + filename + "\n";
    rdbglog += "-----------------------------------------------------\n";
    var releasee = parent.relType;
    var srRtIndx = document.getElementsByName("SRCRTP")[0].options.selectedIndex;
    var srcRelType = document.getElementsByName("SRCRTP")[0].options[srRtIndx].value;
    var bsRtIndx = document.getElementsByName("BSRTP")[0].options.selectedIndex;
    var bsRelType = document.getElementsByName("BSRTP")[0].options[bsRtIndx].value;
    var func_id = getNodeText(selectNodes(basedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
    var frntndFiles = "";
    updatedom = removeChildNode(updatedom, srcRelType);
    updatedom = fnApplyTempCorrections(updatedom, srcRelType);
    basedom = fnApplyTempCorrections(basedom, bsRelType);
    basedom = fnCorrectFieldsets(basedom, updatedom, srcRelType);
    updatedom = fnCorrectRad_Actions_beforeRefresh(updatedom);
	updatedom = fnCorrectRad_Summary_beforeRefresh(updatedom);

    if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") != null) {
        nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
        x = selectSingleNode(updatedom, "//RAD_KERNEL");
        rdbglog += "Copying RAD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x)
    }
    if (selectSingleNode(basedom, "//RAD_CHILD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_CHILD_KERNEL") != null) {
        nodes = selectSingleNode(basedom, "//RAD_CHILD_KERNEL").cloneNode(true);
        x = selectSingleNode(updatedom, "//RAD_CHILD_KERNEL");
        rdbglog += "Copying RAD_CHILD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x)
    }
    else if (selectSingleNode(basedom, "//RAD_CHILD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_CHILD_KERNEL") == null) {
        nodes = selectSingleNode(basedom, "//RAD_CHILD_KERNEL").cloneNode(true);
        var chldKerNode = updatedom.createElement("RAD_CHILD_KERNEL");
        selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
        x = selectSingleNode(updatedom, "//RAD_CHILD_KERNEL");
        rdbglog += "Copying RAD_CHILD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x);
    }
    if (srcRelType == "CLUSTER" || srcRelType == "CUSTOM" || srcRelType == "CUSTOMER") {
        if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            var clustNode = updatedom.createElement("RAD_CLUSTER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD"));
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }

        if (selectSingleNode(basedom, "//RAD_CHILD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_CHILD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CLUSTER").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CHILD_CLUSTER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER");
            rdbglog += "Copying RAD_CHILD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
    }
    if (srcRelType == "CUSTOM" || srcRelType == "CUSTOMER") {
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
        if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM") != null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOM").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CHILD_CUSTOM");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM");
            rdbglog += "Copying RAD_CHILD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }

    }
    if (srcRelType == "CUSTOMER") {
        if (selectSingleNode(basedom, "//RAD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_CUSTOMER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CUSTOMER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CUSTOMER");
            rdbglog += "Copying RAD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_CUSTOMER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CUSTOMER").cloneNode(true);
            var clustNode = updatedom.createElement("RAD_CUSTOMER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD"));
            x = selectSingleNode(updatedom, "//RAD_CUSTOMER");
            rdbglog += "Copying RAD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }

        if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOMER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_KERNEL");
            rdbglog += "Copying RAD_KERNEL in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        else if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOM").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CHILD_CUSTOM");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM");
            rdbglog += "Copying RAD_CHILD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }

    }
    updatedom = fnCorrectionAfterRefresh(updatedom);
    if (srcRfrsh == "YES") {
        return updatedom;
    }

    try {
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
    catch (e) {
        return false;
    }

}

function fnScreenChildRefresh(updatedom, basedom, filename, destpath, scrpath, srcRfrsh) {
    rdbglog += "====================================================\n";
    rdbglog += "Doing ChScreenChild Refresh for " + filename + "\n";
    rdbglog += "-----------------------------------------------------\n";
    var func_id = getNodeText(selectNodes(basedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
    var frntndFiles = "";
    var srRtIndx = document.getElementsByName("SRCRTP")[0].options.selectedIndex;
    var srcRelType = document.getElementsByName("SRCRTP")[0].options[srRtIndx].value;
    var bsRtIndx = document.getElementsByName("BSRTP")[0].options.selectedIndex;
    var bsRelType = document.getElementsByName("BSRTP")[0].options[bsRtIndx].value;
    updatedom = fnApplyTempCorrections(updatedom, srcRelType);
    basedom = fnApplyTempCorrections(basedom, bsRelType);
    basedom = fnCorrectFieldsets(basedom, updatedom, srcRelType);
    if (selectSingleNode(basedom, "//RAD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_KERNEL") != null) {
        nodes = selectSingleNode(basedom, "//RAD_KERNEL").cloneNode(true);
        x = selectSingleNode(updatedom, "//RAD_KERNEL");
        rdbglog += "Copying RAD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x)
    }
    if (selectSingleNode(basedom, "//RAD_CHILD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_CHILD_KERNEL") != null) {
        nodes = selectSingleNode(basedom, "//RAD_CHILD_KERNEL").cloneNode(true);
        x = selectSingleNode(updatedom, "//RAD_CHILD_KERNEL");
        rdbglog += "Copying RAD_CHILD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x)
    }
    else if (selectSingleNode(basedom, "//RAD_CHILD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_CHILD_KERNEL") == null) {
        nodes = selectSingleNode(basedom, "//RAD_CHILD_KERNEL").cloneNode(true);
        var chldKerNode = updatedom.createElement("RAD_CHILD_KERNEL");
        selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
        x = selectSingleNode(updatedom, "//RAD_CHILD_KERNEL");
        rdbglog += "Copying RAD_CHILD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x);
    }
    if (selectSingleNode(basedom, "//RAD_SCRCHLD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL") != null) {
        nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_KERNEL").cloneNode(true);
        x = selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL");
        rdbglog += "Copying RAD_SCRCHLD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x)
    }
    else if (selectSingleNode(basedom, "//RAD_SCRCHLD_KERNEL") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL") == null) {
        nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_KERNEL").cloneNode(true);
        var chldKerNode = updatedom.createElement("RAD_SCRCHLD_KERNEL");
        selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
        x = selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL");
        rdbglog += "Copying RAD_SCRCHLD_KERNEL in Source File\n";
        x.parentNode.replaceChild(nodes, x);
    }

    if (srcRelType == "CLUSTER" || srcRelType == "CUSTOM" || srcRelType == "CUSTOMER") {
        if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CLUSTER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CLUSTER").cloneNode(true);
            var clustNode = updatedom.createElement("RAD_CLUSTER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD"));
            x = selectSingleNode(updatedom, "//RAD_CLUSTER");
            rdbglog += "Copying RAD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        if (selectSingleNode(basedom, "//RAD_CHILD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CLUSTER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER");
            rdbglog += "Copying RAD_CHILD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_CHILD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CLUSTER").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CHILD_CLUSTER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER");
            rdbglog += "Copying RAD_CHILD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        if (selectSingleNode(basedom, "//RAD_SCRCHLD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CLUSTER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER");
            rdbglog += "Copying RAD_SCRCHLD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_SCRCHLD_CLUSTER") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CLUSTER").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_SCRCHLD_CLUSTER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER");
            rdbglog += "Copying RAD_SCRCHLD_CLUSTER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
    }
    if (srcRelType == "CUSTOM" || srcRelType == "CUSTOMER") {
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

        if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOM").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM");
            rdbglog += "Copying RAD_CHILD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOM").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CHILD_CUSTOM");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM");
            rdbglog += "Copying RAD_CHILD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        if (selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM") != null) {
            nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOM").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM");
            rdbglog += "Copying RAD_SCRCHLD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOM") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM") == null) {
            nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOM").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_SCRCHLD_CUSTOM");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM");
            rdbglog += "Copying RAD_SCRCHLD_CUSTOM in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }

    }
    if (srcRelType == "CUSTOMER") {
        if (selectSingleNode(basedom, "//RAD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_CUSTOMER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CUSTOMER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CUSTOMER");
            rdbglog += "Copying RAD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_CUSTOMER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CUSTOMER").cloneNode(true);
            var clustNode = updatedom.createElement("RAD_CUSTOMER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD_CUSTOMER"));
            x = selectSingleNode(updatedom, "//RAD_CUSTOMER");
            rdbglog += "Copying RAD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x)
        }
        if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOMER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOMER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOMER");
            rdbglog += "Copying RAD_CHILD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_CHILD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_CHILD_CUSTOMER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOMER").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_CHILD_CUSTOMER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOMER");
            rdbglog += "Copying RAD_CHILD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        if (selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOMER") != null) {
            nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOMER").cloneNode(true);
            x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOMER");
            rdbglog += "Copying RAD_SCRCHLD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }
        else if (selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOMER") != null && selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOMER") == null) {
            nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOMER").cloneNode(true);
            var chldKerNode = updatedom.createElement("RAD_SCRCHLD_CUSTOMER");
            selectSingleNode(updatedom, "//RAD_FUNCTIONS").appendChild(chldKerNode);
            x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOMER");
            rdbglog += "Copying RAD_SCRCHLD_CUSTOMER in Source File\n";
            x.parentNode.replaceChild(nodes, x);
        }

    }
    updatedom = fnCorrectionAfterRefresh(updatedom);
    if (srcRfrsh == "YES") {
        return updatedom;
    }

    try {
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
    catch (e) {
        return false;
    }

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

function fnSelectUpgrade() {
    var rfSindx = document.getElementsByName('RFRSHMODE')[0].options.selectedIndex;
    var refType = document.getElementsByName('RFRSHMODE')[0].options[rfSindx].value;
    if (refType == "SR") {
        document.getElementsByName('BSRTP')[0].disabled = false;
    }
    else {
        document.getElementsByName('BSRTP')[0].disabled = true;
    }

}

function removeChildNode(upddom, relstp) {
    rdbglog += "Removing Child Node \n";
    if (selectNodes(upddom, "//RAD_CHILD").length != 0) {
        newl = upddom.createElement("RAD_CHILD_" + relstp);
        head = selectNodes(upddom, ("//RAD_FUNCTIONS/RAD_KERNEL"))[0];
        head.parentNode.appendChild(newl);
        var len1 = selectNodes(upddom, "//RAD_CHILD")[0].childNodes.length;
        var nodes = selectNodes(upddom, "//RAD_CHILD")[0].childNodes;
        for (var i = 0;i < len1;i++) {
            selectSingleNode(upddom, "//RAD_CHILD_" + relstp).appendChild(nodes[i].cloneNode(true));
        }

        selectNodes(upddom, "//RAD_CHILD//*").removeAll();
        if (selectNodes(upddom, "//RAD_CHILD")[0])
            selectNodes(upddom, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(upddom, "//RAD_CHILD")[0]);
    }
    return upddom;
}

function fnUpdateBaseScrChildNode(updatedom, basedom, filename, destpath, scrpath, saveFile) {
    rdbglog += "Updating Base ScrChild Node for " + filename + "\n";
    var scrRelTypeIndx = document.getElementsByName("SRCRTP")[0].options.selectedIndex;
    var scrRelType = document.getElementsByName("SRCRTP")[0].options[scrRelTypeIndx].value;
    var bseRelTypeIndx = document.getElementsByName("BSRTP")[0].options.selectedIndex;
    var bseRelType = document.getElementsByName("BSRTP")[0].options[bseRelTypeIndx].value;

    if (scrRelType == "CLUSTER" || scrRelType == "CUSTOM" || scrRelType == "CUSTOMER") {
        if (bseRelType == "KERNEL") {
            if (selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL") != null) {
                nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_KERNEL").cloneNode(true);
                x = selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL");
                rdbglog += "Copying RAD_SCRCHLD_KERNEL in Source File\n";
                x.parentNode.replaceChild(nodes, x);
            }
            else if (selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL") == null) {
                nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_KERNEL").cloneNode(true);
                var clustNode = updatedom.createElement("RAD_SCRCHLD_KERNEL");
                selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER"));
                x = selectSingleNode(updatedom, "//RAD_SCRCHLD_KERNEL");
                rdbglog += "Copying RAD_SCRCHLD_KERNEL in Source File\n";
                x.parentNode.replaceChild(nodes, x)
            }
        }
    }
    if (scrRelType == "CUSTOM" || scrRelType == "CUSTOMER") {
        if (bseRelType == "CLUSTER") {
            if (selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER") != null) {
                nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CLUSTER").cloneNode(true);
                x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER");
                rdbglog += "Copying RAD_SCRCHLD_CLUSTER in Source File\n";
                x.parentNode.replaceChild(nodes, x);
            }
            else if (selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER") == null) {
                nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CLUSTER").cloneNode(true);
                var clustNode = updatedom.createElement("RAD_SCRCHLD_CLUSTER");
                selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM"));
                x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CLUSTER");
                rdbglog += "Copying RAD_SCRCHLD_CLUSTER in Source File\n";
                x.parentNode.replaceChild(nodes, x)
            }
        }
    }
    if (scrRelType == "CUSTOMER") {
        if (bseRelType == "CUSTOM") {
            if (selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM") != null) {
                nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOM").cloneNode(true);
                x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM");
                rdbglog += "Copying RAD_SCRCHLD_CUSTOM in Source File\n";
                x.parentNode.replaceChild(nodes, x);
            }
            else if (selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM") == null) {
                nodes = selectSingleNode(basedom, "//RAD_SCRCHLD_CUSTOM").cloneNode(true);
                var clustNode = updatedom.createElement("RAD_SCRCHLD_CUSTOM");
                selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOMER"));
                x = selectSingleNode(updatedom, "//RAD_SCRCHLD_CUSTOM");
                rdbglog += "Copying RAD_SCRCHLD_CUSTOM in Source File\n";
                x.parentNode.replaceChild(nodes, x)
            }
        }
    }
    if (saveFile == "NO") {
        return updatedom;
    }
    try {
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
    catch (e) {
        return false;
    }
}

function fnUpdateBaseChildNode(updatedom, basedom, filename, destpath, scrpath, saveFile) {
    rdbglog += "Updating Base Child Node for " + filename + "\n";
    var scrRelTypeIndx = document.getElementsByName("SRCRTP")[0].options.selectedIndex;
    var scrRelType = document.getElementsByName("SRCRTP")[0].options[scrRelTypeIndx].value;
    var bseRelTypeIndx = document.getElementsByName("BSRTP")[0].options.selectedIndex;
    var bseRelType = document.getElementsByName("BSRTP")[0].options[bseRelTypeIndx].value;

    if (scrRelType == "CLUSTER" || scrRelType == "CUSTOM" || scrRelType == "CUSTOMER") {
        if (bseRelType == "KERNEL") {
            if (selectSingleNode(updatedom, "//RAD_CHILD_KERNEL") != null) {
                nodes = selectSingleNode(basedom, "//RAD_CHILD_KERNEL").cloneNode(true);
                x = selectSingleNode(updatedom, "//RAD_CHILD_KERNEL");
                rdbglog += "Copying RAD_CHILD_KERNEL in Source File\n";
                x.parentNode.replaceChild(nodes, x);
            }
            else if (selectSingleNode(updatedom, "//RAD_CHILD_KERNEL") == null) {
                nodes = selectSingleNode(basedom, "//RAD_CHILD_KERNEL").cloneNode(true);
                var clustNode = updatedom.createElement("RAD_CHILD_KERNEL");
                selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER"));
                x = selectSingleNode(updatedom, "//RAD_CHILD_KERNEL");
                rdbglog += "Copying RAD_CHILD_KERNEL in Source File\n";
                x.parentNode.replaceChild(nodes, x)
            }
        }
    }
    if (scrRelType == "CUSTOM" || scrRelType == "CUSTOMER") {
        if (bseRelType == "CLUSTER") {
            if (selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER") != null) {
                nodes = selectSingleNode(basedom, "//RAD_CHILD_CLUSTER").cloneNode(true);
                x = selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER");
                rdbglog += "Copying RAD_CHILD_CLUSTER in Source File\n";
                x.parentNode.replaceChild(nodes, x);
            }
            else if (selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER") == null) {
                nodes = selectSingleNode(basedom, "//RAD_CHILD_CLUSTER").cloneNode(true);
                var clustNode = updatedom.createElement("RAD_CHILD_CLUSTER");
                selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM"));
                x = selectSingleNode(updatedom, "//RAD_CHILD_CLUSTER");
                rdbglog += "Copying RAD_CHILD_CLUSTER in Source File\n";
                x.parentNode.replaceChild(nodes, x)
            }
        }
    }
    if (scrRelType == "CUSTOMER") {
        if (bseRelType == "CUSTOM") {
            if (selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM") != null) {
                nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOM").cloneNode(true);
                x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM");
                rdbglog += "Copying RAD_CHILD_CUSTOM in Source File\n";
                x.parentNode.replaceChild(nodes, x);
            }
            else if (selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM") == null) {
                nodes = selectSingleNode(basedom, "//RAD_CHILD_CUSTOM").cloneNode(true);
                var clustNode = updatedom.createElement("RAD_CHILD_CUSTOM");
                selectSingleNode(updatedom, "//RAD_FUNCTIONS").insertBefore(clustNode, selectSingleNode(updatedom, "//RAD_CHILD_CUSTOMER"));
                x = selectSingleNode(updatedom, "//RAD_CHILD_CUSTOM");
                rdbglog += "Copying RAD_CHILD_CUSTOM in Source File\n";
                x.parentNode.replaceChild(nodes, x)
            }
        }
    }
    if (saveFile == "NO") {
        return updatedom;
    }
    try {
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
    catch (e) {
        return false;
    }
}

function fnApplyTempCorrections(NewDOM, releaseType) {
    rdbglog += "Applying TempCorrections \n";
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_KERNEL");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CLUSTER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CUSTOM");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CUSTOMER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_KERNEL");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_CLUSTER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_CUSTOM");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_CUSTOMER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_KERNEL");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_CLUSTER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_CUSTOM");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_CUSTOMER");
    NewDOM = fnScreenNode_Correction(NewDOM);
    NewDOM = fnOrderCorrection(NewDOM);
    return NewDOM;
}

function fnCorrectFieldsets(basedom, updatedom, srcreltype) {
    rdbglog += "Correction of Fieldsets before Refresh \n";
    var tempconsolDom = "";
    tempconsolDom.async = false;
    tempconsolDom.resolveExternals = false;
    tempconsolDom = "<?xml version='1.0' encoding='UTF-8'?>";
    tempconsolDom = loadXMLDoc(tempconsolDom);

    var tempbaseDom = "";
    tempbaseDom.async = false;
    tempbaseDom.resolveExternals = false;
    tempbaseDom = "<?xml version='1.0' encoding='UTF-8'?>";
    tempbaseDom = loadXMLDoc(tempbaseDom);

    var tempreltype = parent.relType;
    var correctedfsts = new Array();
    var cnt = "0";
    var exitFlag = false;
    var RadNodes = "RAD_KERNEL~RAD_CLUSTER~RAD_CUSTOM~RAD_CUSTOMER~RAD_CHILD_KERNEL~RAD_CHILD_CLUSTER~RAD_CHILD_CUSTOM~RAD_CHILD_CUSTOMER~RAD_SCRCHLD_KERNEL~RAD_SCRCHLD_CLUSTER~RAD_SCRCHLD_CUSTOM~RAD_SCRCHLD_CUSTOMER";
    var funtype = getNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    var funid = getNodeText(selectNodes(updatedom, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);

    parent.relType = srcreltype;
    tempconsolDom = ApplyreleaseChanges(updatedom, funid, funtype, 'LOAD');

    parent.relType = tempreltype;

    var nodenames = RadNodes.split("~");

    for (radnode = 0;radnode < nodenames.length;radnode++) {
        var basenode = selectNodes(basedom, "//RAD_FUNCTIONS/" + nodenames[radnode]);
        if (basenode.length > 0) {
            var basefieldsets = selectNodes(basedom, "//" + nodenames[radnode] + "/RAD_FIELDSETS");
            for (var fldlen = 0;fldlen < basefieldsets.length;fldlen++) {
                basefstname = getNodeText(selectSingleNode(basefieldsets[fldlen], "FIELDSET_NAME"));
                updomfldset = selectSingleNode(tempconsolDom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + basefstname + "']");
                if (updomfldset != null) {
                    var diffst = fnCompNodes(basefieldsets[fldlen], updomfldset, "RAD_FIELDSETS");
                    if (diffst == "2") {
                        var correctNodes = selectNodes(basedom, "//" + nodenames[radnode] + "/RAD_FIELDSETS[FIELDSET_NAME='" + basefstname + "']");

                        var tempdom = loadXMLDoc(getXMLString(correctNodes[0]).toString());
                        correctNodes[0].parentNode.removeChild(correctNodes[0]);
                        var corrfstname = basefstname + "__1";
                        cnt = "1";
                        while (!exitFlag) {
                            exitFlag = true;
                            var updfstcnt = selectNodes(tempconsolDom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + corrfstname + "']").length;
                            var basefstcnt = selectNodes(basedom, "//RAD_FIELDSETS[FIELDSET_NAME='" + corrfstname + "']").length;
                            if (updfstcnt > 0 || basefstcnt > 0) {
                                cnt = parseInt(cnt) + 1;
                                corrfstname = basefstname + "__" + cnt;
                                exitFlag = false;
                            }
                        }
                        correctedfsts[basefstname] = corrfstname;
                        selectSingleNode(tempdom, "//RAD_FIELDSETS[FIELDSET_NAME='" + basefstname + "']").setAttribute("ID", corrfstname);
                        setNodeText(selectSingleNode(tempdom, "//RAD_FIELDSETS[@ID='" + corrfstname + "']/FIELDSET_NAME"), corrfstname);
                        var head = selectSingleNode(basedom, "//RAD_FUNCTIONS/" + nodenames[radnode]);
                        corrfstdom = selectSingleNode(tempdom, "//RAD_FIELDSETS[FIELDSET_NAME='" + corrfstname + "']");
                        head.appendChild(fnImportNode(basedom, corrfstdom));

                        var updfst = selectNodes(updatedom, "//" + nodenames[radnode] + "/RAD_FIELDSETS[FIELDSET_NAME='" + basefstname + "']");
                        if (updfst.length > 0) {
                            head.appendChild(fnImportNode(basedom, updfst[0]));
                        }
                    }
                }
            }
        }
    }

    return basedom;
}

function fnCorrectionAfterRefresh(updatedom) {
    rdbglog += "Corrections After Refresh \n";
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    if (selectSingleNode(updatedom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE") == null) {
        var orderCorrection = traildom.createElement("ORDER_CORRECTION_DONE");
        var funcNode = selectSingleNode(updatedom, "//RAD_FUNCTIONS");
        funcNode.insertBefore(orderCorrection, selectSingleNode(funcNode, "RAD_KERNEL"));
    }
    setNodeText(selectSingleNode(updatedom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE"), "R");
    return updatedom;
}

function fnRelvalidations() {
    rdbglog += "Checking Release Validations \n";
    var relType = parent.relType;
    var refreshmodeIndx = document.getElementsByName('RFRSHMODE')[0].options.selectedIndex;
    var refreshmode = document.getElementsByName('RFRSHMODE')[0].options[refreshmodeIndx].value;

    if (refreshmode == "SR") {
        document.getElementsByName('SRCRTP')[0].disabled = false;
        document.getElementsByName('BSRTP')[0].disabled = false;
        document.getElementsByName('SRCRTP')[0].options.length = 0;
        document.getElementsByName('BSRTP')[0].options.length = 0;
        document.getElementsByName('SRCRTP')[0].options[0] = new Option("Cluster", "CLUSTER", true, false);
        document.getElementsByName('SRCRTP')[0].options[1] = new Option("Custom", "CUSTOM", false, false);
        document.getElementsByName('BSRTP')[0].options[0] = new Option("Kernel", "KERNEL", true, false);

    }
    else {
        document.getElementsByName('SRCRTP')[0].disabled = true;
        document.getElementsByName('BSRTP')[0].disabled = true;
        document.getElementsByName('SRCRTP')[0].options.length = 0;
        document.getElementsByName('BSRTP')[0].options.length = 0;
        document.getElementsByName('SRCRTP')[0].options[0] = new Option(parent.relType, parent.relType, true, false);
        document.getElementsByName('BSRTP')[0].options[0] = new Option(parent.relType, parent.relType, true, false);
    }

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

function fnCorrectRad_Actions_beforeRefresh(updatedom) {
	var basefldset = "";
    var consolfldsets = "";  
	for (var r = 0;r < RelNodes.length;r++) {
		for (var L = r+1;L < RelNodes.length;L++) {
			if (selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[r]+ "/RAD_ACTIONS").length != 0 && selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[L]+ "/RAD_ACTIONS").length != 0) { 
				basefldset = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[r] + "/RAD_ACTIONS");
				consolfldsets = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[L] + "/RAD_ACTIONS");
				var diffldsets = fnComparenodes_RadActions(basefldset[0], consolfldsets[0], "RAD_ACTIONS");
				if (diffldsets != 1) {
					basefldset_act = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[r] + "/RAD_ACTIONS/RAD_ACTION");
					consolfldsets_act = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[L] + "/RAD_ACTIONS/RAD_ACTION");
					var Changed=0;
					for (var n = 0;n < basefldset_act.length;n++) {
					diffldsets = fnComparenodes_RadActions(basefldset_act[n], consolfldsets_act[n], "RAD_ACTIONS");
					if(diffldsets ==1){
						Changed++;
					}
					}
					if (Changed == 0) {
					updatedom.selectNodes("//" + RelNodes[L] + "/RAD_ACTIONS").removeAll();
					continue;
					}
					else{
					break;
					}
				}
				else{
				 break;
				}
			} 
    }
    }
    return updatedom;
    }
 
function fnCorrectRad_Summary_beforeRefresh(updatedom) {   
    var basefldset = "";
    var consolfldsets = "";
	var basefldset_act = "";
    var consolfldsets_act = "";  
	
    for (var r = 0;r < RelNodes.length;r++) {
		for (var L = r+1;L < RelNodes.length;L++) {
			if (selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[r]+ "/RAD_SUMMARY").length != 0 && selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[L]+ "/RAD_SUMMARY").length != 0) { 
				basefldset = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[r] + "/RAD_SUMMARY");
				consolfldsets = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[L] + "/RAD_SUMMARY"); 
				var diffldsets = fnComparenodes_RadSummary(basefldset[0], consolfldsets[0], "RAD_SUMMARY"); 
            if (diffldsets != 1) {
					var Changed=0;
					basefldset_act = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[r] + "/RAD_SUMMARY/SUMMARY_DETAILS");
					consolfldsets_act = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[L] + "/RAD_SUMMARY/SUMMARY_DETAILS");
					
//					31212657 Starts
					if(basefldset_act.length !== consolfldsets_act.length){
						Changed++;
					}
//					31212657 Ends
					
					 for (var n = 0;n < basefldset_act.length;n++) {
						diffldsets = fnComparenodes_RadSummary(basefldset_act[n], consolfldsets_act[n], "SUMMARY_DETAILS");
						if(diffldsets ==1){
							Changed++;
						}
					}
					var basefldset_cb = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[r] + "/RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS");
					var consolfldsets_cb = selectNodes(updatedom, "//RAD_FUNCTIONS/" + RelNodes[L] + "/RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS");
					
//					31212657 Starts
					if(basefldset_cb.length !== consolfldsets_cb.length){
						Changed++;
					}
//					31212657 Ends
					
					for (var n = 0;n < basefldset_cb.length;n++) {
						diffldsets = fnComparenodes_RadSummary(basefldset_cb[n], consolfldsets_cb[n], "SUMMARY_DETAILS");
						if(diffldsets ==1){
							Changed++;
						}
					}
					if (Changed ==0) { 
					updatedom.selectNodes("//" + RelNodes[L] + "/RAD_SUMMARY").removeAll(); 
					continue;
					}
					else{
						break;
					}
				}
				else{
					break; 
            }
            }
        }
    }
    return updatedom;
}
 
