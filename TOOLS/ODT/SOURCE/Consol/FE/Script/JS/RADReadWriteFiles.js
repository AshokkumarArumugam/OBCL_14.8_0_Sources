/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RADReadWriteFiles.js
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
  ** Copyright � 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/

function javaScriptReadFile(filePath, obj) {
    var fileData = "";
    try {
        fileData = fnReadFileFF(filePath, obj);
    }
    catch (e) {
        fileData = null;
    }

    return fileData;

}

function javascriptWriteFile(filePath, fileData, fileName, isInc) {
    var fileData = true;
    try {
        fileData = writeFiles(filePath, fileName, fileData);
    }
    catch (e) {
        fileData = false;
    }

    return fileData;

}

function javaReadFile(filePath, obj) { 
    var fileData = "";
    //var path = parent.username + "\\" + parent.userterminal + "\\" + parent.usersequence;
    var path = parent.username + "\\" + parent.usersequence;
    if (obj == "") {
        filePath = filePath;
    }
    else {
        filePath = obj.value;
    }
    try {
        var objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "ReadServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objHTTP.setRequestHeader("FUNCTION_ID", filePath);
        objHTTP.setRequestHeader("USERNAME", parent.username);
        objHTTP.setRequestHeader("PATH", path);
        objHTTP.setRequestHeader("ACTION", 'UPLOAD');
        objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);        
        objHTTP.send();
        fileData = objHTTP.responseText;
    }
    catch (e) {
        fileData = null;
    }

    return fileData;

}

function javaBulkReadFile(filePath, obj) {
    var fileData = "";
    if (parent.saveformat == "CLIENT") {
        fileData = javaScriptReadFile(filePath, obj);
        // fileData = fnReadMode('', filePath, '');
    }
    else {
        fileData = javaBRF(filePath, obj);
    }
    return fileData;
}

function javaBRF(filePath, obj) {
    var fileData = "";

    if (obj == "") {
        filePath = filePath;
    }
    else {
        filePath = obj.value;
    }
    try {
        var objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "ReadServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objHTTP.setRequestHeader("FUNCTION_ID", filePath);
        objHTTP.setRequestHeader("USERNAME", parent.username);
        objHTTP.setRequestHeader("ACTION", 'BUPLOAD');
        objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
        objHTTP.send();
        fileData = objHTTP.responseText;
    }
    catch (e) {
        fileData = null;
    }
    if (fileData == "\r\n") {
        return false;
    }
    if (fileData == "\n") {
        return false;
    }
    return fileData;
}

function javaWebServerReadFile(filePath, obj) {
    var fileData = "";

    if (obj == "") {
        filePath = filePath;
    }
    else {
        filePath = obj.value;
    }
    try {

        var objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "ReadServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        objHTTP.setRequestHeader("FUNCTION_ID", filePath);
        objHTTP.setRequestHeader("USERNAME", parent.username);
        objHTTP.setRequestHeader("FLAG", 'FALSE');
        objHTTP.setRequestHeader("PATH", filePath);
        objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
        objHTTP.send();

        fileData = objHTTP.responseText;
    }
    catch (e) {
        fileData = null;
    }

    return fileData;

}

function javaWriteFile(filePath, fileData, fileName) {
    try {
        var objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "ReadServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        objHTTP.setRequestHeader("PATH", filePath);
        objHTTP.setRequestHeader("FILEDATA", fileData);
        objHTTP.setRequestHeader("FILENAME", fileName);
        objHTTP.setRequestHeader("ACTION", 'WRITE');
        objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
        objHTTP.send();
    }
    catch (e) {
        fileData = false;
    }
    return fileData;

}

function javaWriteBulkFile(SfilePath, DfilePath, fileData) {

    try {
        var objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "ReadServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        objHTTP.setRequestHeader("SPATH", SfilePath);
        objHTTP.setRequestHeader("DPATH", DfilePath);
        objHTTP.setRequestHeader("FILENAME", "");
        objHTTP.setRequestHeader("USERNAME", parent.username);
        objHTTP.setRequestHeader("ACTION", 'COPYDIR');
        objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
        objHTTP.send();
    }
    catch (e) {
        return false;
    }
    return true;

}

function fnReadMode(location, filePath, p_obj) {
    var mode = parent.operMode;
    if (!mode) {
        mode = parent.parent.operMode;
    }

    var fileData = "";

    if (mode == 'UPLOAD') {
        try {
            readFileServer(filePath, p_obj);
        }
        catch (e) {
            javaWebServerReadFile(filePath, p_obj);
        }

    }
    else if (mode == 'JS') {
        fileData = javaScriptReadFile(filePath, p_obj);

    }
    else if (mode == 'SERVER') {
        fileData = javaWebServerReadFile(filePath, p_obj);
    }
    return fileData;

}

function fnWriteMode(filePath, fileData, fileName, mode) {
    var data = "";
    if (!mode) {
        mode = parent.operMode;
        if (!mode)
            mode = parent.parent.operMode;
    }
    if (parent.saveformat == "CLIENT") {
        data = writeFiles(filePath, fileName, fileData);
    }
}

function fnSplitFiles(data, filePath, mode) {
    var noOfFiles;
    var fileName1;
    var filename;
    var tempfilepath;
    var folderName;
    var fileData;
    try {
        noOfFiles = data.split("--##FILE##--");
        for (var i = 1;i < noOfFiles.length;i++) {
            tempfilepath = filePath;
            if (noOfFiles[i] != "") {
                var tempData = noOfFiles[i].substring(0, noOfFiles[i].indexOf("--"));
                if (tempData.lastIndexOf("\\") ==  - 1) {
                    fileName = tempData;
                    folderName = "";
                }
                else {
                    fileName1 = (noOfFiles[i].substring(0, noOfFiles[i].indexOf("--")));
                    fileName = fileName1.substring(fileName1.lastIndexOf("\\") + 1);
                    folderName = fileName1.substring(0, fileName1.lastIndexOf("\\"));
                }

                fileData = trim(noOfFiles[i].substring(noOfFiles[i].indexOf("--") + 2));
                tempfilepath = tempfilepath + "\\" + folderName + "\\";
                if (fileName != "") {
                    fnWriteMode(tempfilepath, fileData, fileName, mode)
                }

            }
        }
    }
    catch (e) {
        alertMessage(e);

    }
}
var browsebtn;

function readFileServer(filePath, e) {
    var event = window.event || e;
    var srcElement = getEventSourceElement(event);
    browsebtn = getPreviousSibling(srcElement);
    var win = loadSubScreenDIV("ChildWin", "UploadBrowse.jsp");
}

function fngetReadMode(type) {
    if (parent.saveformat == "CLIENT") {
        parent.operMode = "JS";
    }
    else {
        parent.operMode = "UPLOAD";
    }
}

function fngetWriteMode(type) {
    if (parent.saveformat == "CLIENT") {
        parent.operMode = "JS";
    }
    else {
        parent.operMode = "UPLOAD";
    }

}

function loadBrowserXML(event) {
    fngetReadMode("SINGLE");
    if (parent.operMode == "UPLOAD" || parent.operMode == "JS") {
        try {
            readFileServer("", event);
        }
        catch (e) {
            javaWebServerReadFile("", event);
        }

    }
}

function onInitFs(fs) {
    fs.root.getFile(filePath, 
    {
    },
    function (fileEntry) {

        // Get a File object representing the file,
        // then use FileReader to read its contents.
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                var txtArea = document.createElement('textarea');
                txtArea.value = this.result;
                document.body.appendChild(txtArea);
            };

            reader.readAsText(file);
        },
        errorHandler);

    },
    errorHandler);

}

function fnReadMode1(location, filePath, p_obj) {
    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFs, errorHandler);
}

function fnwritedata(response, sformat) {
    try {
        if (sformat == "CLIENT") {
            fnSplitFiles(response, parent.g_Wrk_Dir, "JS");
        }
        else if (sformat == "ZIP") {
            var path = parent.username + "/" + parent.usersequence;
            window.open("DownLoadFile?USERNAME=" + path+"&X-CSRFTOKEN="+mainWin.CSRFtoken, "", "");
        }
        else if (sformat == "SHARE") {
            path = parent.username + "\\" + parent.usersequence;
            javaWriteBulkFile(path, parent.g_Wrk_Dir + "\\", "");
        }

        return true;
    }
    catch (e) {
        return false;
    }

}

function fndlserfiles() {
    var path = parent.username + "\\" + parent.usersequence;

    try {
        var objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "ReadServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
        objHTTP.setRequestHeader("DPATH", path);
        objHTTP.setRequestHeader("USERNAME", parent.username);
        objHTTP.setRequestHeader("ACTION", 'DELFILE');
        objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
        objHTTP.send();
    }
    catch (e) {
        return false;
    }
    return true;

}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}