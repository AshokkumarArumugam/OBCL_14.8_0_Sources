/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadWelcome.js
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
var mainWin = parent;
var CSRFtokens = mainWin.CSRFtoken; 
var schm = "";
var title = "";
var username = "";
var pwd = "";
var userterminal = "";
var userrole = "";
var relCode = "";
var usersequence = "";
var lang = "";
var scrTabNo = 0;
var timerbtn = "";
var envCode = "";
var envDesc = "";
var saveformat = "";
var Xlformat = "";
var Xmlformat = "";
var jndiName = "";
var openWindows = new Array();
var radControlStrArray = new Array();
var radFunctionsArray = new Array();
var ctrlStrngArray = new Array();
var adminFuncsArray = new Array(6);
var winno = 0;
var g_Wrk_Dir = "";
var g_Save_Dir = "";
var arrChildWindows = new Array();
var gNumChildWindows = 0;
var funcGenSeqNo = 1500;
var gfuncGenSeqNo = 1500;
var gwinFuncId = "";
var groleRights = "";
var PrveClassElem = "";
var relType = "";
var x, y;
var gAction;
var gReqType = "FID";
var gReqCode = "";
var gSubFolder = "";
var Bulkgenflag = "N";
var gGenPckgs = "YES";
var gGenElTemp = "NO";
var gClnUsrDir = "YES";
var gReleaseCode;
var gIsSummary = 0;
var gBodySeparator = "--##FILE##--";
var gfnPostStatus = "";
var gMsgxml;
var gAdmnDom;
var gfromSummary = false;
var gScreenPkVal = "";
var originDate = "";
var chngUIFlg = "";
var vwChg = "";
var gRadOrUser = "RAD";
var operMode = "";
var tempFile = 0;
var currentCount = 0;
var dataXmlFlg = 'N';
var dataXmlPath = '';
var g_appEntryPoint = '';
var g_gatewayUrl = '';
var g_ubsReqURL = "";
var g_clearCaseDir = '';
var duser = '';
var dbgreqd = '';
// Set Height of the Screen 
function setHeight() {
    if (self.innerHeight) {
        x = self.innerWidth;
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        // Explorer 6 Strict Mode
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    }
    else if (document.body) {
        // other Explorers	
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
}
//Trim Spaces from the string 
function trim(argvalue) {
    argvalue = argvalue + "";
    var tmpstr = ltrim(argvalue);
    return rtrim(tmpstr);
}
//Check Whehther char is a whitespace
function isWhitespace(ch) {
    if (ch == ' ' || ch == '\n' || ch == '\r' || ch == '\t' || ch == '\f' || ch == '\b')
        return true;
    return false;
}
// Left Trin Space from argument 
function ltrim(argvalue) {
    argvalue = argvalue + "";
    while (true) {
        if (!isWhitespace(argvalue.substring(0, 1)))
            break;
        argvalue = argvalue.substring(1, argvalue.length);
    }
    return argvalue;
}
// Right Trim Space from argument 
function rtrim(argvalue) {
    argvalue = argvalue + "";
    while (true) {
        if (!isWhitespace(argvalue.substring(argvalue.length - 1)))
            break;
        argvalue = argvalue.substring(0, argvalue.length - 1);
    }
    return argvalue;
}

//processing for LOGIN
function fnLogin() {
    userterminal = document.getElementById("USERTERMINAL").value;
    username = document.getElementById("username-field").value;
    pwd = document.getElementById("password-field").value;
    username = trim(username);
    pwd = trim(pwd);
    document.getElementById("username-field").value = username;
    document.getElementById("password-field").value = pwd;
    if (username == "") {
        alertMsg("User Id Cannot be Blank", "E")
        return false;
    }
    if (pwd == "") {
        alertMsg("Password Cannot be Blank", "E")
        return false;
    }
    gReqType = "GEN";
    gReqCode = "LOGIN";
    var radReqDOM = buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    var lgnnode = radReqDOM.createElement("LOGIN");
    bodyNode.appendChild(lgnnode);
    var node = radReqDOM.createElement("PWD");
    lgnnode.appendChild(node);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/LOGIN/PWD"), password);
    document.getElementById("SUBDETAILS").value = getXMLString(radReqDOM) + gBodySeparator + "";
    document.getElementById("ISSUMMARY").value = gIsSummary;
}
//Build request DOM
function buildRADXml() {
    var ubsXMLDOM = addHeaderNode();
    var ubsnode = selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV");
    var bodyNode = ubsXMLDOM.createElement("RAD_BODY");
    ubsnode.appendChild(bodyNode);
    if (gReqType == "FID" || gReqType == "FIDT") {
        var fldNode = loadXMLDoc(gMsgxml);
        selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_BODY").appendChild(selectSingleNode(fldNode, "//FLD").cloneNode(true));
        var fnNodeList1 = selectNodes(fldNode, "//FLD/FN[@PARENT = '']");
        var list = "";
        var currFNNode = null;
        var currFN = "";
        var fnTSL = "";
        var fnArray = null;
        var currField = null;
        var colName = "";
        currFNNode = fnNodeList1[0];
        currFN = currFNNode.getAttribute("TYPE");
        fnTSL = getNodeText(currFNNode);
        fnArray = fnTSL.split("~");
        list += '<REC RECID="1" TYPE="' + currFN + '"><FV><![CDATA[';
        for (var colIndex = 0;colIndex < fnArray.length;colIndex++) {
            colName = fnArray[colIndex];
            try {
                currField = selectSingleNode(gAdmnDom, "//" + currFN + "/" + colName);
                list += getNodeText(currField) + "~";
            }
            catch (e) {
                list += "" + "~";
            }
        }
        list = list + "]]></FV></REC>";
        var tempDom = loadXMLDoc(list);
        selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_BODY").appendChild(fnImportNode(ubsXMLDOM, tempDom.documentElement));
        fnNodeList1 = selectNodes(fldNode, "//FLD/FN[@PARENT != '']");
        for (var nodeIndex = 0;nodeIndex < fnNodeList1.length;nodeIndex++) {
            currFNNode = fnNodeList1[nodeIndex];
            currFN = currFNNode.getAttribute("TYPE");
            fnTSL = getNodeText(currFNNode);
            fnArray = fnTSL.split("~");
            list = "";
            var type = currFNNode.getAttribute("RELATION_TYPE");
            var parentDS = currFNNode.getAttribute("PARENT");
            if (type == "1") {
                list = '<REC RECID="1" TYPE="' + currFN + '"><FV><![CDATA[';
                for (var colIndex = 0;colIndex < fnArray.length;colIndex++) {
                    colName = fnArray[colIndex];
                    try {
                        currField = selectSingleNode(gAdmnDom, "//" + currFN + "/" + colName);
                        list += getNodeText(currField) + "~";
                    }
                    catch (e) {
                        list += "" + "~";
                    }
                }
                list = list + "]]></FV></REC>";
                tempDom = loadXMLDoc(list);
                selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_BODY/REC[@TYPE='" + parentDS + "']").appendChild(fnImportNode(ubsXMLDOM, tempDom.documentElement));
            }
            try {
                var tabobj = selectNodes(gAdmnDom, "//" + currFN);
                if (type == "N") {
                    for (var rec = 0;rec < tabobj.length;rec++) {
                        list = '<REC RECID="' + rec + '" TYPE="' + currFN + '"><FV><![CDATA[';
                        for (var colIndex = 0;colIndex < fnArray.length;colIndex++) {
                            colName = fnArray[colIndex];
                            try {
                                currField = selectSingleNode(tabobj[rec], colName);
                                list += getNodeText(currField) + "~";
                            }
                            catch (e) {
                                list += "" + "~";
                            }
                        }
                        list = list + "]]></FV></REC>";
                        tempDom = loadXMLDoc(list);
                        selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_BODY/REC[@TYPE='" + parentDS + "']").appendChild(fnImportNode(ubsXMLDOM, tempDom.documentElement));
                    }
                }
            }
            catch (e) {
            }
        }
        return ubsXMLDOM;
    }
    else 
        return ubsXMLDOM;
}
//Add header Node for the Request XML 
function addHeaderNode() {
    if (userterminal == "")
        userterminal = parent.userterminal;
    else if (parent.userterminal == "")
        userterminal = parent.parent.userterminal;
    var ubsXMLDOM = loadXMLDoc('<RAD_REQ_ENV/>');
    var radnode = selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV");
    var headerNode = ubsXMLDOM.createElement("RAD_HEADER");
    radnode.appendChild(headerNode);
    var node = ubsXMLDOM.createElement("USERID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("USERTERMINAL");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("USERSEQUENCE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("FUNCTIONID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("ACTION");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("RELEASE_CODE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("ENV_CODE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("REQ_TYPE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("REQ_CODE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("LANG_CODE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("CLEAR_USER_DIR");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("RADORUSER");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("ISSUMMARY");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("USERSCHEMA");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("UIFLAG");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("SUBFOLDER");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("BULKGENFLAG");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("BULKPATH");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("MSGSTAT");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("OPERMODE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("XLFORMAT");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("XMLFORMAT");
    headerNode.appendChild(node);
	node = ubsXMLDOM.createElement("WHERECLAUSE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("RELEASE_TYPE");
    headerNode.appendChild(node);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/USERID"), username);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/USERTERMINAL"), userterminal);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/USERSEQUENCE"), usersequence);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/XLFORMAT"), Xlformat);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/XMLFORMAT"), Xmlformat);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/FUNCTIONID"), gwinFuncId);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), gAction);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/RELEASE_CODE"), relCode);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_TYPE"), gReqType);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), gReqCode);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/LANG_CODE"), lang);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/ENV_CODE"), envCode);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/RADORUSER"), gRadOrUser);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), gIsSummary);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/USERSCHEMA"), jndiName);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/UIFLAG"), jndiName);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/CLEAR_USER_DIR"), gClnUsrDir);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/BULKGENFLAG"), Bulkgenflag);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/BULKPATH"), "");
	setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), "");
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/SUBFOLDER"), gSubFolder);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/OPERMODE"), operMode);
    setNodeText(selectSingleNode(ubsXMLDOM, "//RAD_REQ_ENV/RAD_HEADER/RELEASE_TYPE"), relType);
    return ubsXMLDOM;
}
// Call Servlet
function fnPost(radMsgDOM, serverURL) {
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", "RADClientHandler", false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    /*objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");        */
    objHTTP.setRequestHeader("X-CSRFTOKEN",mainWin.CSRFtoken);
    objHTTP.send(radMsgDOM);
    gfnPostStatus = objHTTP.getResponseHeader("STAT");
	try{
    if (gReqType != "GEN" && objHTTP.responseXML && getXMLString(objHTTP.responseXML) != "") {
        if (objHTTP.readyState != 4)
            return;
        return objHTTP.responseXML;
    }
    else {
        return trim(objHTTP.responseText);
    }
	}
	catch(e){
	return "";
	}
}
// Process response for Login and Set Release 
function loadResponseTree(finalRes) {
    setUserData(selectNodes(finalRes, "//RAD_RES_ENV/RAD_BODY/LOGIN"));
    if (selectNodes(finalRes, "//RAD_RES_ENV/RAD_BODY/LOGIN/MENU_DETAILS").length > 0) {
        createTree(selectNodes(finalRes, "//RAD_RES_ENV/RAD_BODY/LOGIN/MENU_DETAILS")[0], "vTabCN_EXPLORE");
    }
    langDesc = getNodeText(selectSingleNode(finalRes, "//RAD_RES_ENV/RAD_BODY/LOGIN").getElementsByTagName("LANG_DESC")[0]);
    document.getElementById("usr-disp-name").firstChild.innerHTML = getNodeText(selectSingleNode(finalRes, "//RAD_RES_ENV/RAD_BODY/LOGIN").getElementsByTagName("USER_NAME")[0]);
    if(appUrl=='') {
    	document.getElementById("FCUBSLINK").href = '#';
    	document.getElementById("FCUBSLINK").style.display = "none";
    } else {
    	document.getElementById("FCUBSLINK").href = appUrl;
    }
    duser = getNodeText(selectSingleNode(finalRes, "//RAD_RES_ENV/RAD_HEADER/USERID"));
    g_Wrk_Dir = g_Wrk_Dir.replace(":", ":\\");
    var dtime = dateDispalylogin();
    dbgreqd = getNodeText(selectSingleNode(finalRes, "//RAD_RES_ENV/RAD_BODY/LOGIN/USER_DETAILS/DEBUG_REQD"));
    debug(duser + ' login Date Time ' + dtime + '=================================================================', true);
   var frcpwdchange = getNodeText(selectSingleNode(finalRes, "//RAD_RES_ENV/RAD_BODY/LOGIN").getElementsByTagName("FORCE_PASSWD_CHANGE")[0]);
     if(frcpwdchange=="" || frcpwdchange<1){  
    	 openWindow('testwin','RadPassword.jsp','Change Password');	 
     }
}
// Set User Prefernces variables after Login or Set Release 
function setUserData(dataString) {
    usersequence = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/USERSEQUENCE"));
    relCode = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/RELEASE_CODE"));
    relDesc = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/RELEASE_DESC"));
    relType = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/RELEASE_TYPE"));
    relName = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/RELEASE_CODE"));
    relStage = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/RELEASE_STAGE"));
    userrole = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/USER_ROLE"));
    envCode = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/ENV_CODE"));
    g_Wrk_Dir = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/WORK_DIRECTORY"));
    dbInst = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/DB_INSTANCE"));
    envDesc = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/ENV_DESC"));
    saveformat = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/SAVEFORMAT"));
    Xlformat = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/XLFORMAT"));
    Xmlformat = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/XMLFORMAT"));
    userSchema = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/DB_SCHEMA"));
    jsPath = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_JS_FOLDER"));
    uixmlPath = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_XML_FOLDER"));
    filedeployMode = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_TRNF_TYPE"));
    ftpUser = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_FTP_USER"));
    ftpPasswrd = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_FTP_PASSWORD"));
    FilemgrURL = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_HTTP_URL"));
    lang = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/LANG_CODE"));
    langDesc = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/LANG_DESC"));
    appUrl = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_URL"));
    if (selectSingleNode(dataString[0], "USER_DETAILS/APP_ENTRY_POINT") != null) {
        g_appEntryPoint = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/APP_ENTRY_POINT"));
    }
    if (selectSingleNode(dataString[0], "USER_DETAILS/GATEWAY_URL") != null) {
        g_gatewayUrl = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/GATEWAY_URL"));
    }
    vssFolder = "";
    jndiName = getNodeText(selectSingleNode(dataString[0], "USER_DETAILS/JNDI_NAME"));
    changesDOM = "";
    tableName = "";
    pkCols = "";
    latestvalue = "";
    var dbColumsArry = new Array();
    selectedval = "";
    element = "";
    elementval = "";
    datasrcDom = "";
    blkName = "";
    datasrcDom = "";
    attr = "";
    if (appUrl != '' && appUrl != null) {
        if (appUrl.indexOf('.jsp') !=  - 1) {
            g_ubsReqURL = appUrl.substring(0, appUrl.lastIndexOf('/'));
        }
        else {
            g_ubsReqURL = appUrl;
        }
    }
}
//Build tree After Login or Set Release 
function createTree(menuTree, divId) {
    var titleArray = new Array();
    var menuval = "";
    var subMnVal1 = "";
    var subMnVal2 = "";
    var mnItem = "";
    var funcID = "";
    var jspName = "";
    var jspTtle = "";
    var divobject = document.getElementById(divId);
    var bodyContent = "";
    var menuContent = "";
    var rolerights = "";
    var tabIndx = 0;
    bodyContent = '';
    bodyContent = "<ul id=\"ulTreeMenu\" class=\"TreeView\">";
    for (var i = 0;i < menuTree.childNodes.length;i++) {
        if (menuTree.childNodes[i].nodeType == 1) {
            tabIndx = tabIndx + 1;
            if (menuTree.childNodes[i].tagName == "LEAF") {
                funcID = menuTree.childNodes[i].getAttribute("FNID");
                jspName = menuTree.childNodes[i].getAttribute("USER_FNID");
                menuval = menuTree.childNodes[i].getAttribute("LABEL");
                ctrlStrngArray[menuTree.childNodes[i].getAttribute("FNID")] = menuTree.childNodes[i].getAttribute("RIGHTS");
                rolerights = menuTree.childNodes[i].getAttribute("RIGHTS");
                titleArray[menuTree.childNodes[i].getAttribute("FNID")] = menuval;
                menuContent += "<li id=\"Li_" + funcID + "\" noDrag=\"true\"><a class=\"parentNode\"   nochildren =\"true\" title=\"" + funcID + "\" href=\"javascript:setWinVariables(\'" + funcID + "\',\'" + rolerights + "\');openWindow(\'testwin\',\'" + jspName + "\',\'" + menuval + "\');\" >" + menuval + "</a></li>";
            }
            else if (menuTree.childNodes[i].tagName == "NODE") {
                funcID = menuTree.childNodes[i].getAttribute("FNID");
                jspName = menuTree.childNodes[i].getAttribute("USER_FNID");
                menuval = menuTree.childNodes[i].getAttribute("LABEL");
                menuContent += "<li><a class=\"parentNode\" href=\"#\" nochildren =\"false\">" + menuval + "</a>";
                menuContent += "<ul id=\"ulTreeMenu\" class=\"Fields\" rel=\"closed\" >";
                var tbindx = 0;
                var tempMenu = menuval;
                var tempMenu1 = menuval;
                for (var j = 0;j < menuTree.childNodes[i].childNodes.length;j++) {
                    if (menuTree.childNodes[i].childNodes[j].nodeType == 1) {
                        tbindx = tbindx + 1;
                        if (menuTree.childNodes[i].childNodes[j].tagName == "NODE") {
                            funcID = menuTree.childNodes[i].childNodes[j].getAttribute("FNID");
                            menuval = menuTree.childNodes[i].childNodes[j].getAttribute("LABEL");
                            tempMenu = menuval;
                            if (funcID) {
                                menuContent += "<li><a class=\"parentNode\" href=\"#\"  >" + menuval + "</a>";
                                menuContent += "<ul id=\"ulTreeMenu\" class=\"Fields\" rel=\"closed\">";
                            }
                            else {
                                menuContent += "<li><a class=\"parentNode\" href=\"#\" >" + menuval + "</a>";
                                menuContent += "<ul id=\"ulTreeMenu\" class=\"Fields\"  rel=\"closed\">";
                            }
                            var tindx = 0;
                            for (k = 0;k < menuTree.childNodes[i].childNodes[j].childNodes.length;k++) {
                                if (menuTree.childNodes[i].childNodes[j].childNodes[k].nodeType == 1) {
                                    var tindx = tindx + 1;
                                    funcID = menuTree.childNodes[i].childNodes[j].childNodes[k].getAttribute("FNID");
                                    jspName = menuTree.childNodes[i].childNodes[j].childNodes[k].getAttribute("USER_FNID");
                                    menuval = menuTree.childNodes[i].childNodes[j].childNodes[k].getAttribute("LABEL");
                                    tempMenu = tempMenu + "_" + menuval;
                                    rolerights = menuTree.childNodes[i].childNodes[j].childNodes[k].getAttribute("RIGHTS");
                                    ctrlStrngArray[funcID] = rolerights;
									if(jspName.indexOf("RadInfra") == -1 )
                                    menuContent += "<li> <a class=\"parentNode\" title=\"" + funcID + "\"  href=\"javaScript:setWinVariables(\'" + funcID + "\',\'" + rolerights + "\');openWindow(\'testwin\',\'" + jspName + "\',\'" + tempMenu + "\');\" >" + menuval + "</a></li>";
                                    else
									menuContent += "<li> <a class=\"parentNode\" title=\"" + funcID + "\"  href=\"javaScript:setWinVariables(\'" + funcID + "\',\'" + rolerights + "\');openWindow(\'testwin\',\'RadInfra.jsp?incFile="+funcID+"\',\'" + tempMenu + "\');\" >" + menuval + "</a></li>";
                                }
                            }
                            menuContent += "</ul></li>";
                        }
                        else {
                            try {
                                funcID = menuTree.childNodes[i].childNodes[j].getAttribute("FNID");
                                jspName = menuTree.childNodes[i].childNodes[j].getAttribute("USER_FNID");
                                menuval = menuTree.childNodes[i].childNodes[j].getAttribute("LABEL");
                                tempMenu = tempMenu + "_" + menuval;
                                rolerights = menuTree.childNodes[i].childNodes[j].getAttribute("RIGHTS");
                            }
                            catch (e) {
                                return;
                            }
                            ctrlStrngArray[funcID] = rolerights;
                            if(jspName.indexOf("RadInfra") == -1 )
							menuContent += "<li> <a class=\"parentNode\"  title=\"" + funcID + "\"   href=\"javaScript:setWinVariables(\'" + funcID + "\',\'" + rolerights + "\');openWindow(\'testwin\',\'" + jspName + "\',\'" + tempMenu + "\');\" >" + menuval + "</a></li>";
                            else
							menuContent += "<li> <a class=\"parentNode\"  title=\"" + funcID + "\"   href=\"javaScript:setWinVariables(\'" + funcID + "\',\'" + rolerights + "\');openWindow(\'testwin\',\'RadInfra.jsp?incFile="+funcID+"\',\'" + tempMenu + "\');\" >" + menuval + "</a></li>";
                            tempMenu = tempMenu1;
                        }
                    }
                }
                menuContent += "</ul></li>";
            }
        }
    }
    bodyContent += menuContent;
    bodyContent += "</ul>";
    divobject.innerHTML = "";
    divobject.innerHTML = bodyContent;
    paintTreeMenu();
}
//Setting key variables
function setWinVariables(fnID, rolerights) {
    gwinFuncId = fnID;
    if (gwinFuncId == "RDDSCRDF") {
        chngUIFlg = "Y";
        vwChg = "N";
    }
    else if (gwinFuncId == "RDDVWCHG") {
        vwChg = "Y";
        chngUIFlg = "N";
    }
    else {
        chngUIFlg = "N";
        vwChg = "N";
    }
    groleRights = rolerights;
}
// Prevent Propogate
function preventpropagate(e) {
    if (typeof e != "undefined")
        e.stopPropagation();
    else 
        event.cancelBubble = true;
}
//Handling Key Events
function HandleKeyEvents(e) {
    var evnt = window.event || e;
    if (evnt.keyCode == 13)
        fnLogin();
}

function initOverLabels() {
    if (!document.getElementById)
        return;

    var labels, id, field;

    labels = document.getElementsByTagName('label');
    for (var i = 0;i < labels.length;i++) {

        if (labels[i].className == 'overlabel') {
            id = labels[i].htmlFor || labels[i].getAttribute('for');
            if (!id || !(field = document.getElementById(id))) {
                continue;
            }
            labels[i].className = 'overlabel-apply';
            if (field.value !== '') {
                hideLabel(field.getAttribute('id'), true);
            }
            field.onfocus = function () {
                hideLabel(this.getAttribute('id'), true);
            };
            field.onblur = function () {
                if (this.value === '') {
                    hideLabel(this.getAttribute('id'), false);
                }
            };
            labels[i].onclick = function () {
                var id, field;
                id = this.getAttribute('for');
                if (id && (field = document.getElementById(id))) {
                    field.focus();
                }
            };

        }
    }
}

function initCap(str) {
    var words = str.split(" ");
    var string = "";
    for (var i = 0;i < words.length;i++) {
        words[i] = words[i].substring(0, 1).toUpperCase() + words[i].substring(1, words[i].length).toLowerCase();
    }
    return words.join(" ");
}
//Convert to Upper case
function upper(r) {
    r.value = r.value.toUpperCase();
}

//
var isNS = (navigator.appName == "Netscape") ? 1 : 0;
if (navigator.appName == "Netscape")
    document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);

function hideLabel(field_id, hide) {
    var field_for;
    var labels = document.getElementsByTagName('label');
    for (var i = 0;i < labels.length;i++) {
        field_for = labels[i].htmlFor || labels[i].getAttribute('for');
        if (field_for == field_id) {
            labels[i].style.textIndent = (hide) ? '-2400px' : '0px';
            return true;
        }
    }
}

window.onload = function () {
    setTimeout(initOverLabels, 50);
};

function setActiveWindow(activeDiv, activeWin) {
    try {

        if (typeof (activeWin.functionId) == "undefined")
            activeWin = activeDiv.children[0].contentWindow;
        for (var i = 0;i < arrChildWindows.length;++i) {
            if (arrChildWindows[i].id != activeDiv.id) {
                arrChildWindows[i].style.zIndex = 0;
            }
        }
        activeDiv.style.zIndex = 10;
        gActiveWindow = activeWin;
    }
    catch (e) {
    }
}
// Open main Screen Windows
function openWindow(winId, src, desc) {
    desc = replaceAll(desc, " ", "");
    var customWin = document.createElement("div");
    customWin.id = winId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    customWin.style.zIndex = 1;
    var customWinData = '<iframe id="ifr_LaunchWin" class="frames" title="' + desc + '" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("IFlauncher").appendChild(customWin);
    if (document.getElementById("vtab")) {
        customWin.style.height = document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.children[0].style.height = document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.style.width = 0 + "px";
        customWin.children[0].style.width = 0 + "px";

    }
    else if (parent.document.getElementById("vtab")) {
        customWin.style.height = parent.document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.children[0].style.height = parent.document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.style.width = 0 + "px";
        customWin.children[0].style.width = 0 + "px";
    }
    if (src.substring(0, 12) == "RadInfra.jsp") {
        customWin.style.left = 253 + "px";
        customWin.style.top = 62 + "px";
    }
    gfuncGenSeqNo = gfuncGenSeqNo + 1;
    funcGenSeqNo = gfuncGenSeqNo + "_" + desc;
}
function openWindowFaq(winId, src, desc) {
    desc = replaceAll(desc, " ", "");
    var customWin = document.createElement("div");
    customWin.id = winId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    customWin.style.zIndex = 1;
    var customWinData = '<iframe id="ifr_LaunchWin" class="frames" title="' + desc + '" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="yes"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("IFlauncher").appendChild(customWin);
    if (document.getElementById("vtab")) {
        customWin.style.height = document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.children[0].style.height = document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.style.width = 0 + "px";
        customWin.children[0].style.width = 0 + "px";

    }
    else if (parent.document.getElementById("vtab")) {
        customWin.style.height = parent.document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.children[0].style.height = parent.document.getElementById("vtab").offsetHeight - 4 + "px";
        customWin.style.width = 0 + "px";
        customWin.children[0].style.width = 0 + "px";
    }
    if (src.substring(0, 12) == "RadInfra.jsp") {
        customWin.style.left = 253 + "px";
        customWin.style.top = 62 + "px";
    }
    gfuncGenSeqNo = gfuncGenSeqNo + 1;
    funcGenSeqNo = gfuncGenSeqNo + "_" + desc;
}
// Load Child Window
function loadChildWindow(divObj, winObj) {
    if (divObj != null && divObj != "") {
        if (gNumChildWindows ==  - 1)
            gNumChildWindows = 0;
        arrChildWindows[gNumChildWindows] = divObj;
        gNumChildWindows++;
        setActiveWindow(divObj, winObj);
    }
}
// Exit Windows
function fnExit(winObj) {
    iFrameObj = winObj.getElementsByTagName("IFRAME")[0];
    iFrameObj.src = "";
    document.getElementById("IFlauncher").removeChild(winObj);
    for (var i = 0;i < arrChildWindows.length;i++) {
        if (arrChildWindows[i] == winObj) {
            arrChildWindows.splice(i, 1);
            gNumChildWindows--;
        }
    }

    if (gNumChildWindows == 0) {
        gActiveWindow = null;
    }

}
// Show Alert message
function alertMessage(message, type) {
    showLogmessage = message;
    if (type == "I")
        var title = "Information";
    else if (type == "E")
        var title = "Error";
    else if (type == "O")
        var title = "Warning";
    errType = type;
    loadSubScreenDIV("ChildWin", "RadError.jsp?Title=" + title);
}
// Load SubScreen
function loadSubScreenDIV(divId, src) {
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    customWin.style.zIndex = 11;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe src="' + src + '" class="frames" title="iFrame" allowtransparency="true" frameborder="0" scrolling="no" id="IFCHILD"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = document.getElementById(divId);
    if (document.getElementById("Dtop")) {
        winObj.style.top = document.getElementById("Dtop").offsetHeight + 25 + "px";
    }
    if (document.getElementById("Dleft")) {
        winObj.style.left = document.getElementById("Dleft").offsetWidth + 5 + "px";
    }
    else {
        winObj.style.left = "0px";
    }
    winObj.style.visibility = "visible";
    winObj.style.display = "block";
}

var win = null;
// launch Login Window on Sinout 
function newWindow(mypage, myname, w, h, features) {
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    if (winl < 0)
        winl = 0;
    if (wint < 0)
        wint = 0;
    var settings = 'height=' + h + ',';
    settings += 'width=' + w + ',';
    settings += 'top=' + wint + ',';
    settings += 'left=' + winl + ',';
    settings += features;
    window.close();
    win = window.open(mypage, myname, settings);
    win.window.focus();
}
//shotcut Keys on Rad Landing Page
function shortcut(e) {
    var evnt = window.event || e;
    var srcElem = e.srcElement || e.target;
    var type = srcElem.type;
    if (evnt.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        }
        else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    else if (evnt.altKey == true && evnt.keyCode == 66) {
        // focus ot windows  
        if (document.getElementById("LAND_BROWSER"))
            document.getElementById("LAND_BROWSER").focus();
    }
    else if (evnt.altKey == true && evnt.keyCode == 87) {
        // focus ot windows  
        if (document.getElementById("LAND_WINDOWS"))
            document.getElementById("LAND_WINDOWS").focus();
    }
    else if (evnt.altKey == true && evnt.keyCode == 79) {
        // focus ot Options 
        if (document.getElementById("OPTIONS_MENU"))
            document.getElementById("OPTIONS_MENU").focus();
    }
    else if (evnt.altKey == true && evnt.keyCode == 83) {
        // focus ot Signout 
        if (document.getElementById("LAND_SIGNOUT"))
            document.getElementById("LAND_SIGNOUT").focus();
    }
    else if (evnt.keyCode == 9 && evnt.shiftKey != true && srcElem.id == "LAND_SIGNOUT") {
        document.getElementById("LAND_BROWSER").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return;
    }
    else if (evnt.keyCode == 9 && evnt.shiftKey == true && srcElem.id == "LAND_BROWSER") {
        document.getElementById("LAND_SIGNOUT").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return;
    }
    else if (evnt.keyCode == 9 && evnt.shiftKey == true || (evnt.keyCode == 13) || (evnt.keyCode == 32) || (evnt.keyCode == 123) || (evnt.keyCode == 9)) {
    }
    else {
        disableCommonKeys(evnt);
        return false;
    }
}

function fnloginshortcut(e) {
    var evnt = window.event || e;
    var srcElem = e.srcElement || e.target;
    var type = srcElem.type;
    if (evnt.keyCode == 9 && evnt.shiftKey == true || (evnt.keyCode == 13) || (evnt.keyCode == 32) || (evnt.keyCode == 123) || (evnt.keyCode == 9)) {
    }
    else if ((evnt.ctrlKey == true && (evnt.keyCode == 83 || evnt.keyCode == 77)) || (evnt.altKey == true && evnt.keyCode == 76)) {
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return;
    }
    else {
        disableCommonKeys(evnt);
        return false;
    }

}

function fnOpenWinds() {
    alertMessage(arrChildWindows.length);
    for (var i = 0;i < arrChildWindows.length;++i) {
        alertMessage(arrChildWindows[i].id);
    }
}

var timeout = 500;
var closetimer = 0;
var ddmenuitem = 0;

function loadWindowScr(scr, actwin) {
    if (typeof (actwin.functionId) == "undefined")
        actwin = scr.children[0].contentWindow;
    scr.style.visibility = "visible";
    scr.style.zIndex = 50;
    actwin.document.body.getElementsByTagName("A")[1].focus();
}

function mopen(id) {
    mcancelclosetime();
    var ttt = "";
    for (var i = 0;i < arrChildWindows.length;++i) {
        var tmpWindow = arrChildWindows[i].id;
        if (arrChildWindows[i].childNodes[0].contentWindow.document.getElementById('FUNCTION_ID') && arrChildWindows[i].childNodes[0].contentWindow.document.getElementById('FUNCTION_ID') != null) {
            var fid = arrChildWindows[i].childNodes[0].contentWindow.document.getElementById('FUNCTION_ID').value;
            if (arrChildWindows[i].childNodes[0].contentWindow.document.getElementById('FUNCTION_ID').value)
                ttt = ttt + "<a id=" + arrChildWindows[i].id + " title=" + arrChildWindows[i].id + " href=\"javaScript:setActiveWindow(document.getElementById(\'" + arrChildWindows[i].id + "\'),window);\" onclick=\"loadWindowScr(document.getElementById(\'" + arrChildWindows[i].id + "\'),window)\" >" + tmpWindow.substring(tmpWindow.indexOf("_") + 1) + "_" + fid + "</a>";
            else 
                ttt = ttt + "<a id=" + arrChildWindows[i].id + " title=" + arrChildWindows[i].id + " href=\"javaScript:setActiveWindow(document.getElementById(\'" + arrChildWindows[i].id + "\'),window);\" onclick=\"loadWindowScr(document.getElementById(\'" + arrChildWindows[i].id + "\'),window)\" >" + tmpWindow.substring(tmpWindow.indexOf("_") + 1) + "</a>";
        }
        else {
            ttt = ttt + "<a id=" + arrChildWindows[i].id + " title=" + arrChildWindows[i].id + " href=\"javaScript:setActiveWindow(document.getElementById(\'" + arrChildWindows[i].id + "\'),window);\" onclick=\"loadWindowScr(document.getElementById(\'" + arrChildWindows[i].id + "\'),window)\" >" + tmpWindow.substring(tmpWindow.indexOf("_") + 1) + "</a>";
        }
    }
    document.getElementById(id).innerHTML = ttt;
    showMenu(document.getElementById("LAND_WINDOWS"));
}

function showMenu(menuObj) {
    if (!menuObj)
        return false;
    var hasMenuItems = menuObj.parentNode.getElementsByTagName("div").length > 0;
    if (hasMenuItems) {
        if (menuObj.parentNode.getElementsByTagName("div")[0].style.visibility == "hidden" || 
        		!menuObj.parentNode.getElementsByTagName("div")[0].style.visibility) {
            menuObj.parentNode.getElementsByTagName("div")[0].style.visibility = "visible";//Displaying the menu
            menuObj.parentNode.getElementsByTagName("div")[0].style.zIndex = 100;
            menuObj.parentNode.children[0].focus();
        }
        else {
            menuObj.parentNode.getElementsByTagName("div")[0].style.visibility = "hidden";
        }
    }
    if (menuObj.id == "OPTIONS_MENU")
        document.getElementById("LAND_WINDOWS").parentNode.getElementsByTagName("div")[0].style.visibility = "hidden";
    else 
        document.getElementById("OPTIONS_MENU").parentNode.getElementsByTagName("div")[0].style.visibility = "hidden";
    return true;
}

//vinit silent odt
function downloadSilentOdt(){
window.open("DownLoadFile?USERNAME=Silentodt&X-CSRFTOKEN="+mainWin.CSRFtoken, "", "");
}

function fnOnclickVal(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (srcElement.id != "LAND_WINDOWS" && srcElement.id != "OPTIONS_MENU") {
        document.getElementById("LAND_WINDOWS").parentNode.getElementsByTagName("div")[0].style.visibility = "hidden";
        document.getElementById("OPTIONS_MENU").parentNode.getElementsByTagName("div")[0].style.visibility = "hidden";
    }
    else if (srcElement.id == "LAND_WINDOWS" && srcElement.id == "OPTIONS_MENU") {
        document.getElementById(srcElement.id).parentNode.getElementsByTagName("div")[0].style.visibility = "vissible";
    }
    
    if(srcElement.id == "LAND_BROWSER"){
    	 if(document.getElementById("LAND_BROWSER").title=="Expand Menu"){
    		 document.getElementById("LAND_BROWSER").title='Collapse Menu';
    		 document.getElementById("LAND_BROWSER").className= 'hamMenu selected';
    	 }
    	 else{
    		 document.getElementById("LAND_BROWSER").title='Expand Menu' ;
    		 document.getElementById("LAND_BROWSER").className= 'hamMenu';
    	 }
    }
}

function hideMenu(menuObj, isLi, fromDropDown) {
    if (!isLi) {
        menuObj = menuObj.parentNode;
    }
    if (fromDropDown) {
        menuObj = menuObj.parentNode.parentNode.parentNode;
    }
    var hasMenuItems = menuObj.getElementsByTagName("DIV").length > 0;
    var menuAnchor = menuObj.children[0];
    if (menuAnchor && menuAnchor.children[0] && menuAnchor.children[0].className == "BTNiconD") {
        return;
    }
    if (hasMenuItems) {
        menuObj.getElementsByTagName("DIV")[0].style.visibility = "visible";
    }
    else 
    menuObj.getElementsByTagName("DIV")[0].style.visibility = "hidden";
    //menuAnchor.className = "navnormal"; //Remove Highlighting from the menu heading
}

function mclose() {
    if (ddmenuitem)
        ddmenuitem.style.visibility = 'hidden';
}

function mclosetime() {
    closetimer = window.setTimeout(mclose, timeout);
}

function mcancelclosetime() {
    if (closetimer) {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}
document.onclick = mclose;
//Signing Out 
function fndebugsignout() {
    fnsignoutstatus();
    debug('Sign Out' + '\n' + '=================================================================');
    debug(duser + ' Sign Out  Date Time ' + dateDispalylogin());
}
// Get Date
function dateDispalylogin() {
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
// Minimize window
function fnMinimize(target, e) {
    var e = window.event || e;
    var srcElement = e.srcElement || e.target;
    if (srcElement.disabled || (e.shiftKey == true && e.keyCode == 9) || e.keyCode == 9)
        return;
    var ifr = parent.document.getElementById(target);
    ifr.style.visibility = "hidden";
    parent.document.getElementById("LAND_BROWSER").focus();
}
//Signing out 
function fnsignoutstatus() {
    fndlserfiles();
    var query = "TEST_SUCCESS";
    var queryString = parent.parent.userterminal + "~" + parent.parent.usersequence;
    try {
        parent.parent.gReqType = "APP";
        parent.parent.gReqCode = parent.parent.gAction;
        var radReqDOM = parent.parent.buildRADXml();
        var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
        var tempNode = radReqDOM.createElement("QUERY");
        bodyNode.appendChild(tempNode);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "SIGNOUT");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "SIGNOUT");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
        var response = parent.parent.fnPost(getXMLString(radReqDOM) + parent.parent.gBodySeparator + "");
    }
    catch (e) {
    }
}

function replaceAll(str, searchChar, replaceChar) {
    var retStr = "";
    for (var loopIndex = 0;loopIndex < str.length;loopIndex++) {
        if (str.substr(loopIndex, 1) == searchChar)
            retStr += replaceChar;
        else 
            retStr += str.substr(loopIndex, 1);
    }
    return retStr;
}

function switchWindows() {
    var cnt = 0;
    var windowsCnt = mainWin.arrChildWindows.length;
    if (windowsCnt > 0) {
        for (var currWin = 0;currWin < windowsCnt;currWin++) {
            if (currWin == windowsCnt - 1) {
                cnt = 0;
            }
            else {
                cnt = currWin + 1;
            }
            if (mainWin.arrChildWindows[currWin].children[0].contentWindow == mainWin.gActiveWindow) {
                mainWin.setActiveWindow(mainWin.arrChildWindows[cnt], mainWin.arrChildWindows[cnt].children[0].contentWindow, true);
                try {
                    mainWin.arrChildWindows[cnt].children[0].contentWindow.document.body.getElementsByTagName("A")[1].focus();
                }
                catch (e) {
                }
                break;
            }
        }
    }
}