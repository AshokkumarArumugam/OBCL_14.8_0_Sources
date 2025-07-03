/*----------------------------------------------------------------------------------------------------
**
** File Name    : BROWSER_NonIE.js
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

var dbDataDOM = document.implementation.createDocument("", "", null);

function fireHTMLEvent(object, eventName, event) {
    var eventHandlerStr = object.getAttribute(eventName);
    if (eventHandlerStr) {
        eventHandlerStr = eventHandlerStr.replace(new RegExp("this", "g"), "object");
        eval(eventHandlerStr);
    }
    return true;
}

function getToolBarPreviousSibling(ele) {
    return ele.previousElementSibling;
}

function getToolBarNextSibling(ele) {
    return ele.nextElementSibling;
}

function getPreviousSibling(ele) {
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1)) {
        return ele.previousElementSibling;
    }
    else {
        return ele.previousSibling;
    }
}

function preventpropagate(e) {
    e.stopPropagation();
}

function createHTTPActiveXObject() {
    if (window.XMLHttpRequest)
        return new XMLHttpRequest();
    else 
        return null;
}

function selectSingleNode(xmlDoc, strXMLPath) {
    var oEvaluator = new XPathEvaluator();
    var oResult = oEvaluator.evaluate(strXMLPath, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return oResult.singleNodeValue;
}

function selectNodes(xmlDoc, strXMLPath) {
    var oEvaluator = new XPathEvaluator();
    var oResult = oEvaluator.evaluate(strXMLPath, xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var aNodes = new Array;
    if (oResult != null) {
        var oElement = oResult.iterateNext();
        while (oElement) {
            aNodes.push(oElement);
            oElement = oResult.iterateNext();
        }
    }
    return aNodes;
}

function loadXMLDoc(txt) {
    if (txt == "") {
        return null;
    }
    else {
        var xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
        return xmlDoc;
    }
}

function loadXMLFile(fname) {
    var xmlhttp = createHTTPActiveXObject();
    xmlhttp.open("GET", fname, false);
    xmlhttp.send(null);
    var xmlDoc = loadXMLDoc(xmlhttp.responseText);
    return xmlDoc;
}

function removeChildren(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function fnReadFileFF(savefile, obj) {

    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    }
    catch (e) {
        alertMessage("Permission to read file was denied." + e);
    }
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    if (obj == "") {
        file.initWithPath(savefile);
    }
    else {
        file.initWithPath(obj.value);
    }

    if (file.exists() == false) {
        alertMessage("File does not exist");
    }
    var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
    is.init(file, 0x01, 00004, null);
    var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
    sis.init(is);
    var output = sis.read(sis.available());
    return output;
}

function fnCreateFileFF(sFilePath, filename, sFileContent, isInc) {
    sFilePath = sFilePath + filename;
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
            jsflCntnts[jtmp] = filename + "##FILENAME" + sFileContent;
            jsFils[jfltmp] = filename;
            jsrFils[jrfltmp] = filename;

        }
        else if (flextn[1].toUpperCase() == "XML") {
            if (radfl[1] != "RAD") {
                uixmlCntnts[utmp] = filename + "##FILENAME" + sFileContent;
                xmlFils[xmfltmp] = filename;
                xmlrFils[xmrfltmp] = filename;
            }
            else if (radfl[1] == "RAD") {
                if (radxmlCntnts.length < 1) {
                    radxmlCntnts[radtmp] = sFileContent;
                    radxmlFils[radfltmp] = filename;
                }
            }
        }
        else if (flextn[1].toUpperCase() == "SPC") {
            spcflsCntnts[sptmp] = filename + "##FILENAME" + sFileContent;
        }
        else if (flextn[1].toUpperCase() == "SQL") {
            sqlflsCntnts[sqtmp] = filename + "##FILENAME" + sFileContent;

        }
        else if (flextn[1].toUpperCase() == "INC") {
            incCntnts[intmp] = filename + "##FILENAME" + sFileContent;
            inFils[infltmp] = filename;
            incrFils[inrfltmp] = filename;
        }

    }
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    }
    catch (e) {
        alertMessage("Permission UniversalXPConnect denied.");
    }
    file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath(sFilePath);
    if (file.exists() == true)
        file.remove(true);
    file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
    outputStream = Components.classes['@mozilla.org/network/file-output-stream;1'].createInstance(Components.interfaces.nsIFileOutputStream);
    outputStream.init(file, 0x04 | 0x08 | 0x20, 420, 0);
    outputStream.write(sFileContent, sFileContent.length);
    outputStream.close();
}

function fnCreateFileForUixml_new(Path, filename, contents, isInc) {
    Path = Path + filename;
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

    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    }
    catch (e) {
        alertMessage("Permission UniversalXPConnect denied.");
    }
    file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath(Path);
    if (file.exists() == true)
        file.remove(true);
    file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
    outputStream = Components.classes['@mozilla.org/network/file-output-stream;1'].createInstance(Components.interfaces.nsIFileOutputStream);
    outputStream.init(file, 0x04 | 0x08 | 0x20, 420, 0);
    outputStream.write(contents, contents.length);
    outputStream.close();

}

function loadIFrameContent(iFrameObj) {
    return iFrameObj.contentDocument;
}

function loadXSLFile(xslFilePath) {
    return loadXMLFile(xslFilePath);
}

function transform(xmlDoc, xslDoc, params) {
    var xslProc = new XSLTProcessor();
    xslProc.importStylesheet(xslDoc);
    if (params != null) {
        for (var i in params) {
            xslProc.setParameter(null, i, params[i]);
        }
    }
    var oResultDom = xslProc.transformToFragment(xmlDoc, document);
    return oResultDom;
}

function fnDisableBrowserKey(e) {
    e.preventDefault();
}

function getCurrentStyle(currObj, styleName) {
    return document.defaultView.getComputedStyle(currObj, null).getPropertyValue(styleName);
}

function getXMLString(xmlDoc) {
    if (xmlDoc != "") {
        var serializer = new XMLSerializer();
        var xml = serializer.serializeToString(xmlDoc);
        if (xml.indexOf("</parsererror>") !=  - 1)
            return "";
        else 
            return xml;
    }
    else {
        return "";
    }
}

function getNodeText(textNode) {
    return textNode.textContent;
}

function setNodeText(textNode, text) {
    textNode.textContent = text;
}

function getOuterHTML(ele) {
    var tempDIV = document.createElement("DIV");
    tempDIV.appendChild(ele.cloneNode(false));
    var outerHTML = tempDIV.innerHTML;
    tempDIV = null;
    return outerHTML;
}

function setOuterHTML(ele, strHTML) {
    ele.parentNode.innerHTML = strHTML;
}

function getOuterHTML_TXADisp(ele) {
    var tempDIV = document.createElement("DIV");
    tempDIV.appendChild(ele.cloneNode(true));
    var outerHTML = tempDIV.innerHTML;
    tempDIV = null;
    return outerHTML;
}

function setOuterHTML_TXADisp(ele, strHTML) {
    var oldOuterHTML = getOuterHTML_TXADisp(ele);
    var oldInnerHTML = ele.parentNode.innerHTML;
    var oldOuterIndex = oldInnerHTML.indexOf(oldOuterHTML);
    ele.parentNode.innerHTML = oldInnerHTML.substring(0, oldOuterIndex) + strHTML + oldInnerHTML.substring(oldOuterIndex + oldOuterHTML.length);
}

function getInnerText(ele) {
    return ele.textContent;
}

function setInnerText(ele, txt) {
    ele.textContent = txt;
}

function getNextSibling(ele) {
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1)) {
        return ele.nextElementSibling;
    }
    else {
        return ele.nextSibling;
    }
}

function getEventSourceElement(e) {
    return e.target;
}

function getCloneDocElement(docEle) {
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1)) {
        return docEle.firstChild.cloneNode(true);
    }
    else {
        return docEle.cloneNode(true);
    }
}

function addEvent(ele, eventType, eventHandler) {
    ele.setAttribute(eventType, eventHandler);
}

function fnImportNode(doc, domEle) {
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1)) {
        if (domEle.nodeType != document.ELEMENT_NODE) {
            domEle = domEle.nextSibling;
        }
        if (domEle) {
            try {
                return doc.importNode(domEle, true);
            }
            catch (e) {
                return loadXMLDoc(doc).importNode(domEle, true);
            }
        }
    }
    else {
        return domEle;
    }
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

        Path = l_path + '\\' + p_folder + file;

        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch (e) {
            alertMessage("Permission UniversalXPConnect denied.");
        }
        file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(Path);
        if (file.exists() == true)
            file.remove(true);
        file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
        outputStream = Components.classes['@mozilla.org/network/file-output-stream;1'].createInstance(Components.interfaces.nsIFileOutputStream);
        outputStream.init(file, 0x04 | 0x08 | 0x20, 420, 0);
        outputStream.write(contents, contents.length);
        outputStream.close();

    }

}

function fnReadFileBulkFF(savefile) {
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    }
    catch (e) {
        alertMessage("Permission to read file was denied." + e);
    }
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath(savefile);

    if (file.exists() == false) {
        alertMessage("File does not exist");
    }
    var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
    is.init(file, 0x01, 00004, null);
    var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
    sis.init(is);
    var output = sis.read(sis.available());
    return output;
}

function writeFiles(filePath, fileName, data) {
    contents = data;
    filePath = filePath + fileName;
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    }
    catch (e) {
        alertMessage("Permission UniversalXPConnect denied.");
    }
    file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath(filePath);
    if (file.exists() == true)
        file.remove(true);
    file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
    outputStream = Components.classes['@mozilla.org/network/file-output-stream;1'].createInstance(Components.interfaces.nsIFileOutputStream);
    outputStream.init(file, 0x04 | 0x08 | 0x20, 420, 0);
    outputStream.write(contents, contents.length);
    outputStream.close();

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
    return;
}

function fnIEsettingsval() {
    return;
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

function checkActivex(){
       return null;
}

function navAppName(){
	return "";
}