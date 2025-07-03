/*----------------------------------------------------------------------------------------------------
**
** File Name    : BROWSER_IE.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2012 - 2013  by Oracle Financial Services Software Limited..

********************************************************************************************
*/

function fireHTMLEvent(object, eventName) {
    if (eventName == "onpropertychange")
        return true;
    return object.fireEvent(eventName);
}

function getToolBarPreviousSibling(ele) {
    return ele.previousSibling;
}

function getToolBarNextSibling(ele) {
    return ele.nextSibling;
}

function getPreviousSibling(ele) {
    return ele.previousSibling;
}

function preventpropagate(e) {
    if (event != undefined)
        event.cancelBubble = true;
    else 
        e.cancelBubble = true;
}

function getEventSourceElement(e) {
    return e.srcElement;
}

function createHTTPActiveXObject() {
    var HttpObj;
    try {
        try {
            HttpObj = new ActiveXObject("MSXML2.XMLHTTP.6.0");
        }
        catch (e) {
            HttpObj = new ActiveXObject("MSXML2.XMLHTTP.4.0");
        }
    }
    catch (e) {
        return false;
    }
    return HttpObj;

}

function selectSingleNode(xmlDoc, strXMLPath) {
    return xmlDoc.selectSingleNode(strXMLPath);
}

function selectNodes(xmlDoc, strXMLPath) {
    return xmlDoc.selectNodes(strXMLPath);
}

function loadXMLDoc(txt) {
    if (txt == "") {
        return null;
    }
    else {
        var xmlDoc = null;
        try {
            xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
        }
        catch (e) {
            xmlDoc = new ActiveXObject("Msxml2.DOMDocument.4.0");
        }
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
        return xmlDoc;
    }

}

function loadXMLFile(fname) {
    var xmlDoc = null;
    // code for IE
    try {
        xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
    }
    catch (e) {
        xmlDoc = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    xmlDoc.async = false;
    xmlDoc.load(fname);
    return xmlDoc;
}

function removeChildren(node) {
	node.removeAll();
}

function loadIFrameContent(iFrameObj) {
    return loadXMLFile(iFrameObj.contentWindow.document.XMLDocument);
}

function loadXSLFile(xslFilePath) {
    var xslObj = null;
    try {
        xslObj = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
    }
    catch (e) {
        xslObj = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.4.0");
    }
    xslObj.async = false;
    xslObj.resolveExternals = true;
    xslObj.load(xslFilePath);
    return xslObj;

}

function transform(xmlDoc, xslDoc, params) {
    var xslt = null;
    var xmlDoc1 = null;
    try {
        xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
    }
    catch (e) {
        xslt = new ActiveXObject("Msxml2.XSLTemplate.4.0");
    }
    try {
        xslt.stylesheet = xslDoc;
        xslProc = xslt.createProcessor();
        xmlDoc1 = loadXMLDoc(xmlDoc.xml);
        xslProc.input = xmlDoc1;
        if (params != null) {
            for (var i in params) {
                xslProc.addParameter(i, params[i]);
            }
        }
    }
    catch (e) {
        return false;
    }

    xslProc.transform();
    var html = xslProc.output;
    return html;

}

function fnDisableBrowserKey(e) {
    e.returnValue = false;
}

function getCurrentStyle(currObj, styleName) {
    return currObj.currentStyle[styleName];
}

function getOuterHTML(ele) {
    return ele.outerHTML;
}

function setOuterHTML(ele, strHTML) {
    ele.outerHTML = strHTML;
}

function getOuterHTML_TXADisp(ele) {
    return ele.outerHTML;
}

function setOuterHTML_TXADisp(ele, strHTML) {
    ele.outerHTML = strHTML;
}

function getInnerText(ele) {
    return ele.innerText;
}

function setInnerText(ele, txt) {
    ele.innerText = txt;
}

function getXMLString(xmlDoc) {
    if (xmlDoc !== "") {
        return xmlDoc.xml;
    }
    else {
        return "";
    }
}

function getNodeText(textNode) {
    return textNode.text;
}

function setNodeText(textNode, text) {
    textNode.text = text;
}

function getEventSourceElement(e) {
    return e.srcElement;
}

function getCloneDocElement(docEle) {
    return docEle.cloneNode(true);
}

function getNextSibling(ele) {
    return ele.nextSibling;
}

function fnImportNode(dom, domEle) {
    return domEle;
}

function addEvent(ele, eventType, eventHandler) {
    if (navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
        if (eventType == "class") {
            ele.setAttribute("className", eventHandler);
        }
        else {
            eval("ele." + eventType + "=" + "function(event){" + eventHandler + ";};");
        }
    }
    else {
        //ele.setAttribute(eventType, eventHandler);
        eval("ele." + eventType + "=" + "function(event){" + eventHandler + ";};");
    }
}

function fnReadFileFF(filePath, obj) {
    if (obj == "") {
        filePath = filePath;
    }
    else {
        filePath = obj.value;
    }

    var scripts = "";
    //var filePath=document.getElemntById(obj).value;
    var fso = null;
    var ts = null;
    var ForReading = 1;

    try {
        fso = new ActiveXObject("Scripting.FileSystemObject");
    }
    catch (e) {

        return true;
    }
    if (!(fso.FileExists(filePath))) {
        //alertMessage("File not found: " + filePath, "E");
        return false;
    }
    ts = fso.OpenTextFile(filePath, ForReading);
    var char1 = ts.read(1);
    var char2 = ts.read(1);
    ts = fso.OpenTextFile(filePath, ForReading);
    if (char1.charCodeAt(0) == 255 && char2.charCodeAt(0) == 254) {
        var streamObj = fso.GetFile(filePath);
        ts = streamObj.OpenAsTextStream(ForReading, true);
    }
    scripts = ts.ReadAll();
    ts.Close();
    return scripts;
}

function fnCreateFileFF(Path, filename, contents, isInc) {
    //function fnCreateFileFF(Path,contents) {
    var fso = null;
    var tf = null;
    var flen = fileNames.length;
    var jtmp = jsflCntnts.length;
    var utmp = uixmlCntnts.length;
    var sptmp = spcflsCntnts.length;
    var sqtmp = sqlflsCntnts.length;
    var intmp = incCntnts.length;
    var radtmp = radxmlCntnts.length;
    var jfltmp = jsFils.length;
    var xmfltmp = xmlFils.length;
    var spfltmp = spFils.length;
    var sqfltmp = sqFils.length;
    var infltmp = inFils.length;
    var jrfltmp = jsrFils.length;
    var xmrfltmp = xmlrFils.length;
    var sprfltmp = sprFils.length;
    var sqrfltmp = sqrFils.length;
    var inrfltmp = incrFils.length;
    var radfltmp = radxmlFils.length;
    var radfl = '';

    flen = fileNames.length;
    flextn = filename.split(".");
    if (flextn[0].match("_")) {
        radfl = flextn[0].split("_");
    }
    if (flextn[1] == "txt") {
    }
    else {
        if (flen != 0 || flen != undefined) {
            fileNames[flen] = filename;
        }
        else {
            fileNames[0] = filename;
        }
        if (flextn[1].toUpperCase() == "JS") {
            jsflCntnts[jtmp] = filename + "##FILENAME" + contents;
            jsFils[jfltmp] = filename;
            jsrFils[jrfltmp] = filename;

        }
        else if (flextn[1].toUpperCase() == "XML") {
            if (radfl[1] != "RAD") {
                uixmlCntnts[utmp] = filename + "##FILENAME" + contents;
                xmlFils[xmfltmp] = filename;
                xmlrFils[xmrfltmp] = filename;
            }
            else if (radfl[1] == "RAD") {
                if (radxmlCntnts.length < 1) {
                    radxmlCntnts[radtmp] = contents;
                    radxmlFils[radfltmp] = filename;
                }
            }
        }
        else if (flextn[1].toUpperCase() == "SPC") {
            spcflsCntnts[sptmp] = filename + "##FILENAME" + contents;
        }
        else if (flextn[1].toUpperCase() == "SQL") {
            sqlflsCntnts[sqtmp] = filename + "##FILENAME" + contents;

        }
        else if (flextn[1].toUpperCase() == "INC") {
            incCntnts[intmp] = filename + "##FILENAME" + contents;
            inFils[infltmp] = filename;
            incrFils[inrfltmp] = filename;
        }

    }
    fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FolderExists(Path))
        fso.CreateFolder(Path);
    try {
        if (!(fso.FolderExists(Path))) {
            alertMessage("Invalid Path for file " + filename, "E");
            return false;
        }
        if (fso.FileExists(Path + filename))
            fso.DeleteFile(Path + filename, true);
        if (!isInc) {
            tf = fso.CreateTextFile(Path + filename, true, false);
        }
        else {
            tf = fso.OpenTextFile(Path + filename, 8, true);
        }
        tf.Write(contents);
        tf.Close();
        return true;
    }
    catch (e) {
        alertMessage("error in writing to file", "E");
        return false;
    }
    tf.Close();

}

function fnCreateFileForUixml_new(Path, filename, contents, isInc) {
    var fso = null;
    var tf = null;
    var utmp = uixmlCntnts.length;
    var flen = fileNames.length;
    var xmfltmp = xmlFils.length;
    var radtmp = radxmlCntnts.length;
    var radfltmp = radxmlFils.length;
    var xmrfltmp = xmlrFils.length;
    var radfl = '';

    flen = fileNames.length;
    flextn = filename.split(".");
    if (flextn[0].match("_")) {
        radfl = flextn[0].split("_");
    }
    if (flextn[1].toUpperCase() == "XML") {
        if (radfl[1] != "RAD") {
            uixmlCntnts[utmp] = filename + "##FILENAME" + contents;
            xmlFils[xmfltmp] = filename;
            xmlrFils[xmrfltmp] = filename;
        }
        else if (radfl[1] == "RAD") {
            if (radxmlCntnts.length < 1) {
                radxmlCntnts[radtmp] = contents;
                radxmlFils[radfltmp] = filename;
            }
        }
    }
    fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FolderExists(Path)) {

        //if(!fso.CreateFolder(Path)){
        var subFldr = Path.split("\\");
        subFldr = subFldr[subFldr.length - 2];
        if (subFldr == "ENG") {
            if (!fso.FolderExists(Path.substring(0, Path.indexOf("\\ENG\\") + 1)))
                fso.CreateFolder(Path.substring(0, Path.indexOf("\\ENG\\") + 1));
            fso.CreateFolder(Path);
        }
        //}
    }
    try {
        if (!(fso.FolderExists(Path))) {
            alertMessage("Invalid Path for file " + filename, "E");
            return false;
        }
        if (fso.FileExists(Path + filename))
            fso.DeleteFile(Path + filename, true);
        if (!isInc) {
            tf = fso.CreateTextFile(Path + filename, true, true);
        }
        else {
            tf = fso.OpenTextFile(Path + filename, 8, true, false);
        }
        tf.Write(contents);
        tf.Close();
        return true;
    }
    catch (e) {
        alertMessage("error in writing to file", "E");
        return false;
    }
    tf.Close();

}

function fnCreateNtfyFile(Path, res, separator, p_folder) {

    var data = res.split(separator);
    var l_path = Path;
    for (var i = 1;i < data.length;i++) {

        var file = data[i].substring(0, data[i].indexOf("--"));
        if (data[i].indexOf('--##FILE##') ==  - 1) {
            data[i] = data[i].substring(data[i].indexOf("--") + 2, data[i].length);
        }
        else {
            data[i] = data[i].substring(data[i].indexOf("--") + 2, data[i].indexOf('--##FILE##'));
        }
        contents = data[i];

        Path = l_path + '\\' + p_folder;

        var fso = null;
        var tf = null;
        fso = new ActiveXObject("Scripting.FileSystemObject");
        if (!fso.FolderExists(Path))
            fso.CreateFolder(Path);
        try {
            if (!(fso.FolderExists(Path))) {
                alertMessage("Invalid Path for file " + filename, "E");
                return false;
            }
            if (fso.FileExists(Path)) {
                fso.DeleteFile(Path, true);
            }
            Path = l_path + '\\' + p_folder + file;
            tf = fso.CreateTextFile(Path, true, false);
            tf.Write(contents);
            tf.Close();
        }
        catch (e) {
            alertMessage("Error In Writing To File", "E");
            return false;
        }
        tf.Close();

    }

}

function fnReadFileBulkIE(filePath) {
    var scripts = "";
    var fso = null;
    var ts = null;
    var ForReading = 1;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!(fso.FileExists(filePath))) {
        //alertMessage("File not found: " + filePath,"E");
        return false;
    }
    ts = fso.OpenTextFile(filePath, ForReading);
    var char1 = ts.read(1);
    var char2 = ts.read(1);
    ts = fso.OpenTextFile(filePath, ForReading);
    if (char1.charCodeAt(0) == 255 && char2.charCodeAt(0) == 254) {
        var streamObj = fso.GetFile(filePath);
        ts = streamObj.OpenAsTextStream(ForReading, true);
    }
    scripts = ts.ReadAll();
    ts.Close();
    return scripts;
}

function writeFiles(filePath, fileName, data) {
    var fso = null;
    var writeFlag = true;
    if (!g_Save_Dir) {

        var g_Save_Dir = "";
    }
    if (!parent.g_Wrk_Dir) {
        parent.g_Wrk_Dir = parent.parent.g_Wrk_Dir;
    }
    try {
        fso = new ActiveXObject("Scripting.FileSystemObject");
        if (g_Save_Dir != "") {
            if (!fso.FolderExists(g_Save_Dir)) {
                fso.CreateFolder(g_Save_Dir);
            }
        }
        else if (parent.g_Wrk_Dir != "") {
            if (parent.g_Wrk_Dir == "CURRENT_DIRECTORY") {
                if (document.getElementsByName('FUNCTION_TYPE')[0].value == "NEW") {
                    if (!fso.FolderExists(document.getElementsByName("FILE_SAVE_PATH")[0].value)) {
                        fso.CreateFolder(document.getElementsByName("FILE_SAVE_PATH")[0].value);
                    }
                }
            }
            else {
                if (!fso.FolderExists(parent.g_Wrk_Dir)) {
                    fso.CreateFolder(parent.g_Wrk_Dir);
                }
            }
        }
        if (!fso.FolderExists(filePath)) {
            var subFldr = filePath.split("\\");
            subFldr = subFldr[subFldr.length - 2];
            if (subFldr == parent.lang) {
                if (!fso.FolderExists(filePath.substring(0, filePath.indexOf("\\" + parent.lang) + 1)))
                    fso.CreateFolder(filePath.substring(0, filePath.indexOf("\\" + parent.lang) + 1));
                fso.CreateFolder(filePath);
            }
            else {
                fnfolder(filePath);
            }
        }
        if (!(fso.FolderExists(filePath))) {
            alertMessage("Invalid Path for file ", "E");
            return false;
        }
        if (fso.FileExists(filePath)) {
            fso.DeleteFile(filePath, true);
        }
        
        filePath = filePath + '\\' + fileName;
        filePath = replaceAll(filePath, "/", "\\");
		if (!fso.FolderExists(filePath.substring(0, filePath.lastIndexOf("\\")))) {
			fnfolder(filePath.substring(0, filePath.lastIndexOf("\\")));
		}
		if (fileName.indexOf(".java") != -1 || fileName.indexOf(".js") != -1) {
			tf = fso.CreateTextFile(filePath, true, false);
		} else {
			if (parent.lang == "ENG") {
				tf = fso.CreateTextFile(filePath, true, false);
			} else {
				tf = fso.CreateTextFile(filePath, true, true);
			}
		}
		tf.Write(data);
		tf.Close();
    }
    catch (e) {
        writeFlag = false;
        if(tf){
          tf.Close();
        }
    }
    return writeFlag;
}

function getFileName(filePath) {
	var fileNameIndex = filePath.lastIndexOf("/");
	if (fileNameIndex < 0) {
		fileNameIndex = filePath.lastIndexOf("\\");
	}
	return filePath.substring(fileNameIndex + 1, filePath.length);
}

function getParentPath(filePath) {
	var fileNameIndex = filePath.lastIndexOf("/");
	if (fileNameIndex < 0) {
		fileNameIndex = filePath.lastIndexOf("\\");
		if (fileNameIndex < 0) {
			fileNameIndex = filePath.length;
		}
	}
	return filePath.substring(0, fileNameIndex);
}

function debug(dbg, isInc) {
    try {
        if (dbgreqd == "Y" || dbgreqd == "N") {
            var dbgreqd = dbgreqd;
        }
        else {
            var dbgreqd = parent.dbgreqd;
        }
    }
    catch (e) {
        try {
            var dbgreqd = parent.dbgreqd;
        }
        catch (e) {
            var dbgreqd = 'N';
        }
    }
    if (dbgreqd == 'Y') {
        var fso, tf;
        if (parent.g_Wrk_Dir == "CURRENT_DIRECTORY") {
            try {
                var func_type = document.getElementsByName('FUNCTION_TYPE')[0].value;
                var act = document.getElementsByName("ACTION")[0].value;
                if (act == "NEW") {
                    if (func_type == "P") {
                        g_Save_Dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
                    }
                    else {
                        g_Save_Dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
                        g_Save_Dir = g_Save_Dir.substring(0, (g_Save_Dir.lastIndexOf("\\") + 1))
                    }
                }
                else {
                    g_Save_Dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
                    g_Save_Dir = g_Save_Dir.substring(0, (g_Save_Dir.lastIndexOf("\\") + 1))
                }

            }
            catch (e) {
                g_Save_Dir = "D:\RADTOOL";
            }
        }
        else {
            g_Save_Dir = parent.g_Wrk_Dir;
        }

        if (g_Save_Dir == "") {
            g_Save_Dir = "D:\RADTOOL";
        }
        var path2 = g_Save_Dir;
        var fname = '\\' + parent.username + '.txt';

        try {
            fso = new ActiveXObject("Scripting.FileSystemObject");
            if (!fso.FolderExists(path2))
                fso.CreateFolder(path2);
            if (!isInc) {
                tf = fso.OpenTextFile(path2 + fname, 8, true);
            }
            else {
                tf = fso.CreateTextFile(path2 + fname, true, false);
            }

            dbg = 'RAD==>' + dbg + '\n';
            tf.Write(dbg);
            tf.Close();
            return;
        }
        catch (e) {
            return;
        }
    }
}

function fnIEsettingsval() {
    var Ieset = "";
    try {
        try {
            Ieset = new ActiveXObject("Scripting.FileSystemObject");
        }
        catch (e) {
            Ieset = new ActiveXObject("Scripting.FileSystemObject");
        }
        return true
    }
    catch (e) {
        parent.alertMessage("Make Sure Browser Settings allows the application to Write in Client Machine", "I");
        return false;
    }
}

function disableCommonKeys(evnt) {
    switch (evnt.keyCode) {
        case 112:
        //F1 = Help
        case 114:
        //F3 = Search
        case 115:
        //F4 = Address History
        case 116:
        //F5 = Refresh
        case 117:
        //F6 = Move to next Frame in FF
        case 118:
        //F7 = Caret Browsing in FF
        case 122:
        //F11 = Full Screen Mode
            fnDisableBrowserKey(evnt);
            preventpropagate(evnt);
            try {
                evnt.keyCode = 0;
            }
            catch (e) {
            }
            return false;
    }

    if (evnt.ctrlKey == true) {
        switch (evnt.keyCode) {
            case 66:
            //B = Organize Favourities in IE
            case 68:
            //D = Add a Favouritie in IE
            case 69:
            //E = Search Web in IE
            case 70:
            //F = Find in IE
            case 71:
            //G = //
            case 72:
            //H = History in IE
            case 73:
            //I = Manage Favourities in IE
            case 74:
            //J = Manage Feeds in IE
            case 76:
            //L = Open in IE
            case 78:
            //N = Open in IE
            case 79:
            //O = Open in IE
            case 80:
            //P = Print in IE
            case 81:
            //Q = Quick Tab View
            case 82:
            //R = Refresh in IE
            case 84:
            //T = New Tab
            case 85:
            //U
            case 87:
            //W = Close window in IE
            case 112:
            //F1 = Help
            case 114:
            //F3 = Search
            case 115:
            //F4 = Close Tab in FF
            case 116:
            //F5 = Refresh
                fnDisableBrowserKey(evnt);
                preventpropagate(evnt);
                //document.getElementById("fastpath").focus();
                try {
                    evnt.keyCode = 0;
                }
                catch (e) {
                }
                return false;
        }
    }
    if (evnt.altKey == true) {
        switch (evnt.keyCode) {
            case 36:
            //home   
                fnDisableBrowserKey(evnt);
                preventpropagate(evnt);
                //document.getElementById("fastpath").focus();
                try {
                    evnt.keyCode = 0;
                }
                catch (e) {
                }
                return false;
        }
    }
}

var isNS = (navigator.appName == "Netscape") ? 1 : 0;
if (navigator.appName == "Netscape")
    document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);

function mischandler() {
    return false;
}

function mousehandler(e) {
    var myevent = (isNS) ? e : event;
    var eventbutton = (isNS) ? myevent.which : myevent.button;
    if ((eventbutton == 2) || (eventbutton == 3))
        return false;
}
document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;

function mask() {
    var x = 0, y = 0;
    if (self.innerHeight) {
        x = self.innerWidth;
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    }
    else if (document.body) {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    var maskObj = document.getElementById("masker");
    if (maskObj != null) {
        maskObj.style.height = y + "px";
        maskObj.style.width = x + "px";
        maskObj.style.display = "block";
    }
}

function unmask(unmaskTitleBar) {
    var maskObj;
    if (document.getElementById("masker"))
        maskObj = document.getElementById("masker");
    else 
        maskObj = parent.document.getElementById("masker");
    if (maskObj != null) {
        maskObj.style.height = 0 + "px";
        maskObj.style.width = 0 + "px";
        maskObj.style.display = "none";
    }
    if (typeof (unmaskTitleBar) != "undefined") {
        document.getElementById("WNDbuttons").disabled = false;
        document.getElementById("WNDbuttons").setAttribute("href", "#");
    }
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

function checkActivex() {
	try {
		return new ActiveXObject("Scripting.FileSystemObject");
	} catch (e) {
		return null;
	}
}

function navAppName(){
	return "Netscape";
}