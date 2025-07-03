/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadDeploy.js
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

//dlgArg = dialogArguments;
var flNames = parent.fileNames;
var filePathArray = new Array();
var fileNameArray = new Array();

function fnLaunchDeployment() {

    try {
        if (parent.deploy == "NOTIFY") {
            fnshow_files(parent.allFils['ntfyincFils'], parent.schName.split("/")[1]);
            fnshow_files(parent.allFils['ntfyspcFils'], parent.schName.split("/")[1]);
            fnshow_files(parent.allFils['ntfysqlFils'], parent.schName.split("/")[1]);
        }
        else if (parent.deploy == "TIGGER") {
            fnshow_files(parent.allFils['trgFils'], parent.schName.split("/")[1]);
        }
        else if (parent.deploy == "DEPLOY") {
            fnshow_files(parent.deplyFls);
        }
        else if (parent.deploy == "TRG") {
        }
    }
    catch (e) {
    }

}

function fnshow_files(fileNames) {
    fileNames = fileNames.split("~");
    for (fl = 0;fl < fileNames.length;fl++) {
        fileNameArray[fl] = trim(fileNames[fl].substring(fileNames[fl].lastIndexOf("\\") + 1, fileNames[fl].length));
        filePathArray[fileNameArray[fl]] = fileNames[fl];
    }
    for (var flen = 0;flen < fileNameArray.length;flen++) {
        if (fileNameArray[flen] != "") {
            flextn = fileNameArray[flen].split(".");
            if (flextn[0].match("_")) {
                radfl = flextn[0].split("_");
            }
            if (flextn[1] == "txt") {
            }
            else {

                if (flextn[1].toUpperCase() == "JS") {
                    addRow('DEPLOY_TB');
                    var rowRef = document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows[document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows.length - 1];
                    rowRef.cells[1].getElementsByTagName("INPUT")[0].value = fileNameArray[flen];
                    rowRef.cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
                    rowRef.cells[2].getElementsByTagName("INPUT")[0].value = parent.parent.jsPath;
                    rowRef.cells[2].getElementsByTagName("INPUT")[0].readOnly = true;

                }
                else if (flextn[1].toUpperCase() == "XML") {
                    if (radfl[1] != "RAD") {
                        addRow('DEPLOY_TB');
                        var rowRef = document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows[document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows.length - 1];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].value = fileNameArray[flen];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].value = parent.parent.uixmlPath;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].readOnly = true;
                    }
                }
                if (parent.changeUI != "Y") {
                    if (flextn[1].toUpperCase() == "SPC") {
                        addRow('DEPLOY_TB');
                        var rowRef = document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows[document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows.length - 1];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].value = fileNameArray[flen];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].value = parent.parent.userSchema;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].readOnly = true;

                    }
                    else if (flextn[1].toUpperCase() == "SQL") {
                        addRow('DEPLOY_TB');
                        var rowRef = document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows[document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows.length - 1];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].value = fileNameArray[flen];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].value = parent.parent.userSchema;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].readOnly = true;

                    }
                    else if (flextn[1].toUpperCase() == "INC") {
                        addRow('DEPLOY_TB');
                        var rowRef = document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows[document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows.length - 1];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].value = fileNameArray[flen];
                        rowRef.cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].value = parent.parent.userSchema;
                        rowRef.cells[2].getElementsByTagName("INPUT")[0].readOnly = true;

                    }

                }
            }

        }
    }

}

function getRow(tableName) {
    var trow = "";
    if (tableName == 'DEPLOY_TB') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox CHECKED name=checkgroup></INPUT> </TD>" + "<TD><INPUT aria-required=\"false\" id=FILE_NAME style=\" HEIGHT: 20px\" size=40 name=FILE_NAME></INPUT> </TD>" + "<TD><INPUT aria-required=\"false\" id=DEST_PATH style=\" HEIGHT: 20px\" size=50 name=DEST_PATH> </INPUT></TD>" + "<TD><SELECT aria-required=\"false\" id=DEP_STS  name=DEP_STS DISABLED=true><option  value=\"E\">Error</option><option  value=\"Y\">Yes</option><option Selected value=\"N\">No</option></SELECT></TD>";
    }
    else if (tableName == 'RELS_TB') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox CHECKED name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=RELS_FILE_NAME style=\" HEIGHT: 20px\" size=40 name=RELS_FILE_NAME> </TD>" + "<TD><INPUT aria-required=\"false\" id=RELS_FILE_LOC style=\" HEIGHT: 20px\" size=20 name=RELS_FILE_LOC> </TD>" + "<TD><SELECT aria-required=\"false\" id=RELS_STS  name=RELS_STS DISABLED=true><option  value=\"E\">Error</option><option  value=\"Y\">Yes</option><option Selected value=\"N\">No</option></SELECT></TD>";
    }
    return trow;
}

function addRow(tableName) {

    var trow = getRow(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var arrSize = new Array();
    var tableRef = document.getElementsByName(tableName);
    var tHead = tableRef[0].tHead.rows[0];
    var tBodyHTML = document.getElementsByName(tableName)[0].tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var styleArray = new Array();
    var trCellArray = tBodyHTML.split("</TD>");

    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        cellsArr[j] = newRow.cells[j];
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
    }
}

function dltAll(tableName) {
    var tableObject = document.getElementsByName(tableName);
    var numRows = tableObject[0].tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        tableObject[0].tBodies[0].deleteRow(index);
    }
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function fnDeploy() {
    document.getElementsByName("DPLY_LOG")[0].value = "";

    var filesToDply = "~";
    var chkdFiles = "~";

    for (var row = 0;row < document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows.length;row++) {
        if (document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows[row].cells[0].firstChild.checked == true) {
            chkdFiles += document.getElementsByName('DEPLOY_TB')[0].tBodies[0].rows[row].cells[1].firstChild.value + '~';
        }
    }

    if (chkdFiles == '~') {
        document.getElementsByName("DPLY_LOG")[0].value += 'No files selected for deployment.. \r\n';
        return;
    }
    else {
        chkdFiles = chkdFiles.split("~");
        for (cf = 0;cf < chkdFiles.length;cf++) {
            filesToDply += filePathArray[chkdFiles[cf]] + '~';
        }
    }

    var xmlhttpbcnd = createHTTPActiveXObject();
    var xmlhttpfrnt = createHTTPActiveXObject();
    var DataSrc = parent.schName;

    if (parent.filedeployMode == "FILECOPY") {
        top.parent.gAction = "FILECOPY";
        var deployData = filesToDply;

    }
    else if (parent.filedeployMode == "FILEMANAGER") {
        top.parent.gAction = "FILEMANAGER";
        var deployData = filesToDply + top.parent.gBodySeparator + parent.FilemgrURL;
    }
    top.parent.gReqCode = top.parent.gAction;
    top.parent.gReqType = "APP";
    var radReqDOM = top.parent.buildRADXml();
    var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "" + top.parent.gBodySeparator + deployData, "RADClientHandler");

    fnsetDeployStatus(response);
    document.getElementsByName("DPLY_LOG")[0].value += "Files Deployed.. \r\n";
}

function fnsetDeployStatus(resXML) {
    var tableObj = document.getElementsByName('DEPLOY_TB')[0];
    try {
        var success = selectSingleNode(resXML, "//success");
        var failed = selectSingleNode(resXML, "//failed");
        for (var i = 0;i < tableObj.tBodies[0].rows.length;i++) {
            var filename = document.getElementsByName("FILE_NAME")[i].value;
            var isChecked = document.getElementsByName("checkgroup")[i].checked;
            if (getXMLString(success).indexOf(filename.toUpperCase()) !=  - 1 && isChecked) {
                document.getElementsByName("DEP_STS")[i].value = "Y";
            }
            if (getXMLString(failed).indexOf(filename.toUpperCase()) !=  - 1 && isChecked) {
                document.getElementsByName("DEP_STS")[i].value = "E";
            }
        }

    }
    catch (e) {
    }
}