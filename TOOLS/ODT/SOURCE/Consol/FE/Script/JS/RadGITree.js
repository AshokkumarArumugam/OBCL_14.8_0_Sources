/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadGITree.js
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

function updateGITreeAfterAdd(val, recordVal) {
    /*   to update the tree aftere adding the record    */
    var records = "";
    var recdval = val + "~" + recordVal;
    records += "<li id='li_" + recdval + "'  noDrag=\"true\">";
    records += "<a  href=\"javaScript:getNodeDetails('" + recdval + "');\"  oncontextmenu=\"createGIMenu('" + recdval + "',event)\"  class=\"parentNode\" id='" + recdval + "' name='" + recordVal + "' >";
    records += recordVal;
    records += "</a>";
    records += "<UL id=ULFBDY class=Fields name=\"details\">";
    records += "<li id='li_FBDY~BTFREC'  noDrag=\"true\">";
    records += "<a  href=\"javaScript:getNodeDetails('FBDY~" + recdval + "');\"  oncontextmenu=\"createGIMenu('FBDY~" + recdval + "',event)\"  class=\"parentNode\" id='FBDY~" + recdval + "' name='FBDY~" + recdval + "' >Fields";
    records += "</a>";
    records += "</li></UL>";
    records += "</li>";
    var recordsHTML = "";
    if (val == "RHAD") {
        recordsHTML = document.getElementById("ULRHAD").innerHTML;
        document.getElementById("ULRHAD").innerHTML = recordsHTML + records;
        document.getElementById("ULRHAD").style.display = "block";
    }
    else if (val == "RBDY") {
        recordsHTML = document.getElementById("ULRBDY").innerHTML;
        document.getElementById("ULRBDY").innerHTML = recordsHTML + records;
        document.getElementById("ULRBDY").style.display = "block";
    }
    else if (val == "RFTR") {
        recordsHTML = document.getElementById("ULRFTR").innerHTML;
        document.getElementById("ULRFTR").innerHTML = recordsHTML + records;
        document.getElementById("ULRFTR").style.display = "block";
    }
    paintTreeMenu();
}

function updateGITreeAfterDelete(element) {
    /*   to update the tree aftere deleting  the record    */
    var levels = element.split("~");
    document.getElementById("li_" + element).innerHTML = "";
    var scrHTML = document.getElementById("UL" + levels[0]).innerHTML;
    var pattern = "<LI id=li_" + element + " noDrag=\"true\"></LI>";
    scrHTML = scrHTML.replace(pattern, "");
    document.getElementById("UL" + levels[0]).innerHTML = scrHTML;
    paintTreeMenu();
}

function updateGITreeAfterRename(newelement, oldele) {
    /*   to update the tree aftere Renamin  the record    */
    var levels = oldele.split("~");
    var newval = newelement.split("~");
    document.getElementById("li_" + oldele).innerHTML = "";
    var scrHTML = document.getElementById("UL" + levels[0]).innerHTML;
    var pattern = "<LI id=li_" + oldele + " noDrag=\"true\"></LI>";
    scrHTML = scrHTML.replace(pattern, "");
    document.getElementById("UL" + levels[0]).innerHTML = scrHTML;
    updateGITreeAfterAdd(newval[0], newval[1]);
}

function createGITree() {
    /*   to  create  tree structure in the radgitree with nodes    */
    var gimenuDtls = dom.getElementsByTagName("RAD_MENU_DTLS");
    var header = dom.getElementsByTagName("FORMAT_HEADER");
    var headerRecords = header[0].getElementsByTagName("RECORD");
    var body = dom.getElementsByTagName("FORMAT_BODY");
    var bodyRecords = body[0].getElementsByTagName("RECORD");
    var footer = dom.getElementsByTagName("FORMAT_FOOTER");
    var footerRecords = footer[0].getElementsByTagName("RECORD");
    var divobject = document.getElementById("treebody");
    var bodyContent = "";
    bodyContent = '';
    bodyContent = "<ul id='ulTreeMenu' class='TreeView'>";

    bodyContent += "<li id=\"li_GND\" noDrag=\"true\" noChildren=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('GND'); \" id='TGND' class='parentNode' name=\"TGND\" >Preferences</a>";
    bodyContent += "<ul id ='ULGND' class='Fields' name='details'></ul>";
    bodyContent += "</li>";

    bodyContent += "<li id=\"li_HAD\" noDrag=\"true\" >";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('HAD'); \" id='THAD' class='parentNode' name=\"THAD\" >Header</a>";
    bodyContent += "<ul id ='ULHAD' class='Fields' name='details'>";
    bodyContent += "<li id=LIHRED noDrag=\"true\"><a id=TRHAD class='parentNode' href=\"javaScript:getNodeDetails('DHAD')\" name=TRHAD>Records</a>";
    bodyContent += "<UL id=ULRHAD class=Fields name=\"details\">";
    for (var i = 0;i < headerRecords.length;i++) {
        var value = getNodeText(selectSingleNode(headerRecords[i], "REC_CODE"));
        bodyContent += "<li id=li_RHAD~" + value + " noDrag=\"true\">";
        bodyContent += "<a id=RHAD~" + value + " oncontextmenu=\"createGIMenu('RHAD~" + value + "',event)\" class='parentNode' href=\"javascript:getNodeDetails('RHAD~" + value + "');\" name=" + value + ">" + value + "";
        bodyContent += "</a>";
        bodyContent += "<UL id=ULFHAD class=Fields name=\"details\">";
        bodyContent += "<li id=li_FHAD~" + value + " noDrag=\"true\">";
        bodyContent += "<a id=FHAD~" + value + " oncontextmenu=\"createGIMenu('FHAD~" + value + "',event)\" class='parentNode' href=\"javascript:getNodeDetails('FHAD~" + value + "');\" name=" + value + ">Fields";
        bodyContent += "</a></li>";
        bodyContent += "</ul></li>";

    }
    bodyContent += "</ul></li>";
    bodyContent += "</ul></li>";

    bodyContent += "<li id=\"li_BDY\" noDrag=\"true\" >";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('BDY'); \" id='TBDY' class='parentNode' name=\"TBDY\" >Body</a>";
    bodyContent += "<ul id ='ULBDY' class='Fields' name='details'>";
    bodyContent += "<li id=LIBRED noDrag=\"true\"><a id=TRBDY class='parentNode' href=\"javaScript:getNodeDetails('DBDY')\" oncontextmenu=\"createGIMenu('DBDY',event)\" name=TRBDY>Records</a>";
    bodyContent += "<UL id=ULRBDY class=Fields name=\"details\">";
    for (var i = 0;i < bodyRecords.length;i++) {
        var value = getNodeText(selectSingleNode(bodyRecords[i], "REC_CODE"));
        bodyContent += "<li id=li_RBDY~" + value + " noDrag=\"true\">";
        bodyContent += "<a id=RBDY~" + value + " oncontextmenu=\"createGIMenu('RBDY~" + value + "',event)\" class='parentNode' href=\"javascript:getNodeDetails('RBDY~" + value + "');\" name=" + value + ">" + value + "";
        bodyContent += "</a>";
        bodyContent += "<UL id=ULFBDY class=Fields name=\"details\">";
        bodyContent += "<li id=li_FBDY~" + value + " noDrag=\"true\">";
        bodyContent += "<a id=FBDY~" + value + " oncontextmenu=\"createGIMenu('FBDY~" + value + "',event)\" class='parentNode' href=\"javascript:getNodeDetails('FBDY~" + value + "');\" name=" + value + ">Fields";
        bodyContent += "</a></li>";
        bodyContent += "</ul></li>";

    }
    bodyContent += "</ul></li>";
    bodyContent += "</ul></li>";

    bodyContent += "<li id=\"li_FTR\" noDrag=\"true\" >";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('FTR'); \" id='TFTR' class='parentNode' name=\"TFTR\" >Footer</a>";
    bodyContent += "<ul id ='ULFTR' class='Fields' name='details'>";
    bodyContent += "<li id=LIFRED noDrag=\"true\"><a id=TRFTR class='parentNode' href=\"javaScript:getNodeDetails('DFTR')\" name=TRFTR>Records</a>";
    bodyContent += "<UL id=ULRFTR class=Fields name=\"details\">";
    for (var i = 0;i < footerRecords.length;i++) {
        var value = getNodeText(selectSingleNode(footerRecords[i], "REC_CODE"));
        bodyContent += "<li id=li_RFTR~" + value + " noDrag=\"true\">";
        bodyContent += "<a id=RFTR~" + value + " oncontextmenu=\"createGIMenu('RFTR~" + value + "',event)\" class='parentNode' href=\"javascript:getNodeDetails('RFTR~" + value + "');\" name=" + value + ">" + value + "";
        bodyContent += "</a>";
        bodyContent += "<UL id=ULFFTR class=Fields name=\"details\">";
        bodyContent += "<li id=li_FFTR~" + value + " noDrag=\"true\">";
        bodyContent += "<a id=FFTR~" + value + " oncontextmenu=\"createGIMenu('FFTR~" + value + "',event)\" class='parentNode' href=\"javascript:getNodeDetails('FFTR~" + value + "');\" name=" + value + ">Fields";
        bodyContent += "</a></li>";
        bodyContent += "</ul></li>";

    }
    bodyContent += "</ul></li>";
    bodyContent += "</ul></li>";

    bodyContent += "</ul>";
    divobject.innerHTML = "";
    divobject.innerHTML = bodyContent;
    paintTreeMenu();
}

function createGIMenu(val, e) {
    /*   to create the menu for the records.   */
    if (document.getElementById('ACTION').value == "NEW") {
        if (document.getElementById('FORMAT_ID').value == "") {
            alertMessage("Please enter Interface Id", "E");
            return;
        }
        if (selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_ID") == null || getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_ID")) == "") {
            createGIMainElements();
        }
    }
    var selectedType = val;
    clickedxpath = document.getElementsByName(selectedType).name;
    clickedobjects = selectedType.split("~");
    var len = clickedobjects.length;
    var sel = clickedobjects[0];
    var menudiv = "";
    var treemenu = document.getElementById("TreeMenu");
    if (sel == "DHAD" || sel == "DBDY" || sel == "DFTR") {
        menudiv += "<div class=\"menuitems\" onclick=\"addRecords('" + val + "')\">";
        menudiv += "Add";
        menudiv += "</div>";
    }
    else if (sel == "RBDY") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnDel('" + val + "')\">";
        menudiv += "Delete";
        menudiv += "</div>";
        menudiv += "<div class=\"menuitems\" onclick=\"fnGIRename('" + val + "')\">";
        menudiv += "Rename";
        menudiv += "</div>";
    }
    else if (sel == "RHAD" || sel == "RFTR") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnGIRename('" + val + "')\">";
        menudiv += "Rename";
        menudiv += "</div>";
    }
    if (menudiv == "")
        return;
    treemenu.innerHTML = menudiv;
    showmenuie5(e);
    document.onclick = hidemenuie5
    fnDisableBrowserKey(e);
    getNodeDetails(val);
}

function LoadGIxml() {
    /* to load the gi xml in the screen */
    if (document.getElementsByName('LOAD_SCREEN_XML')) {
        var load_path = document.getElementsByName('LOAD_SCREEN_XML')[0].value;
        var xml2 = loadxmldata;
        if (!xml2) {
            return false;
        }
        if (xml2.indexOf("RAD_FUNCTIONS") ==  - 1) {
            alertMessage("Load Valid RAD xml File", "E");
            reloadForm();
            return false;
        }
        dom = loadXMLDoc(xml2);
        try {
            document.getElementsByName('FORMAT_CATEGORY')[0].value = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_CATEGORY"));
            document.getElementsByName('MAX_LINE_SIZE')[0].value = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_PREFERENCES/MAX_LINE_SIZE"));
            document.getElementsByName('FORMAT_ID')[0].value = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_ID")).toUpperCase();
            document.getElementsByName('FUNCTION_ID')[0].value = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/INCOMING_FUNCTIONID")).toUpperCase();
            document.getElementsByName('FORMAT_DESCRIPTION')[0].value = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_PREFERENCES/FORMAT_DESCRIPTION")).toUpperCase();
        }
        catch (err) {
            alertMessage("Some Header Tags are Missing In Loaded xml ", "E")
            reloadForm();
            return false;
        }
        createGITree();
        GIBasicVals('AfterLoad');

    }
    return true;
}

function saveGIxml(val, radReqDOM) {
    /* to save the gi radxml  */
    var frntndFiles = "";
    var domforsys = "";
    var ua = navigator.userAgent.toLowerCase();
    var func_type = document.getElementsByName('FORMAT_CATEGORY')[0].value;

    appendData("");

    logMsg = "";
    errType = "";
    errLogMsg = "";
    if (document.getElementsByName("FORMAT_ID")[0].value == "") {
        alertMessage("Format Id Cannot Be Null", "E");
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

    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_CATEGORY")), document.getElementById('FORMAT_CATEGORY').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/INCOMING_FUNCTIONID")), document.getElementsByName('FUNCTION_ID')[0].value);
    domforsys = getCloneDocElement(dom);

    functionid = document.getElementsByName("FORMAT_ID")[0].value;
    var lang = parent.lang;
    frntndFiles += parent.gBodySeparator + ("RADXML\\" + functionid + "_RAD.xml--") + getXMLString(dom);
    schName = parent.jndiName;
    if (val == "0") {
        document.getElementsByName("OPERATION")[0].value = 'SAVE';
        var oprtn = document.getElementsByName("OPERATION")[0].value;
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
        var response = CallCodeGenerator(radReqDOM, getXMLString(dom), frntndFiles);
        if (response != null) {
            response = frntndFiles + "--##FILE##--" + response;
            fnSplitFiles(response, parentPath, parent.operMode);
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
       var wres = fnwritedata(response, parent.saveformat);
        return files[files.length - 1];
    }
}