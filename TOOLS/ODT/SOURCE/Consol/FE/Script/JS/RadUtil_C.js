/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadUtil.js
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
var blockColumnArray = new Array();
var blockFieldsArray = new Array();
var blockLblCodeArray = new Array();
var blockDataTypeArray = new Array();
var blockMaxLengthArray = new Array();
var blockDecimalArray = new Array();
var columnsUIArr = new Array();
var columnsUIDTArr = new Array();
var fileNames = new Array();
var jsflCntnts = new Array();
var uixmlCntnts = new Array();
var spcflsCntnts = new Array();
var sqlflsCntnts = new Array();
var incCntnts = new Array();
var radxmlCntnts = new Array();
var jsFils = new Array();
var xmlFils = new Array();
var spFils = "";
var ifchildSeq = 1;
var sqFils = "";
var inFils = new Array();
var jsrFils = new Array();
var xmlrFils = new Array();
var sprFils = "";
var sqrFils = "";
var incrFils = new Array();
var radxmlFils = new Array();
var jsPath = "";
var uixmlPath = "";
var spcPath = "";
var sqlPath = "";
var xsdPath = "";
var incPath = "";
var schName = "";

var Relxml = "";
var Relxml1 = "";

var selectedFuncId = "";

function enableHeaderAction() {
    if (parent.vwChg == "Y" || parent.chngUIFlg == "Y") {
    }
    else {
        if (document.getElementsByName("ACTION")) {
            document.getElementsByName("ACTION")[0].disabled = false;
            document.getElementsByName("ACTION")[0].focus();
            BasicVals();
        }
    }
}

function createMenu(val, e) {

    if (document.getElementById('ACTION').value == "NEW") {

        if (selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID") == null || getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID")) == "") {
            createMainElements();
            if (selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID") == null || getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID")) == "") {
                alertMessage("Please enter function Id", "E");
                return;
            }
        }
    }
    var selectedType = val;
    clickedxpath = document.getElementsByName(selectedType).name;
    clickedobjects = selectedType.split("~");
    var index = "";
    index = clickedobjects[0];
    var screensec = "";
    if (clickedobjects[2] != "") {
        screensec = clickedobjects[2];
    }

    if (screensec == "HEADER" || screensec == "FOOTER" || screensec == "BODY") {
        for (var i = 0;i < clickedobjects.length;i++) {
            selected = TreeObjectsArray[screensec][i];
        }
    }
    else {
        for (var i = 0;i < clickedobjects.length;i++) {
            selected = TreeObjectsArray[index][i];
        }
    }

    if (parent.chngUIFlg == 'Y') {
        if (index != "SCR" && index != "BODY" && index != "HEADER" && index != "FOOTER" && index != "FLD") {
            return;
        }
    }
    else if (parent.vwChg == "Y") {
        if (index == "SCR") {

        }
        else {
            return;
        }
    }

    var menudiv = "";

    var treemenu = document.getElementById("TreeMenu");
    if ((selected != "SUM" && selected != "BFD" && selected != "DBC" && selected != "SEC" && selected != "FDN" && selected != "SSC" && selected != "LNM") && parent.vwChg != "Y") {
        if (selected == "TAB_FOOTER" && document.getElementsByName("AUDIT_TEMP")[0].value == "MAINTENANCE" && document.getElementsByName("MAIN_SCREEN")[0].value == "Y") {

        }
        else if (selected != "BNM") {
            menudiv += "<div class=\"menuitems\" onclick=\"fnadd('" + val + "')\">";
            menudiv += "Add</div>";
        }
    }
    if (selected == "BNM") {
        menudiv += "<div class=\"menuitems\" onclick=\"addfieldsui('" + val + "')\">";
        menudiv += "Add Fields";
        menudiv += "</div>";
        menudiv += "<div class=\"menuitems\" onclick=\"fnRename('" + val + "')\">";
        menudiv += "Rename";
        menudiv += "</div>";
    }

    if ((selected != "BODY" && selected != "FOOTER" && selected != "HEADER" && selected != "FLD" && selected != "LOV" && selected != "BLK" && selected != "ACT" && selected != "CFM" && selected != "LFM" && selected != "SCR" && selected != "DSN" && selected != "SUM") && parent.vwChg != "Y") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnDel('" + val + "')\">";
        menudiv += "Delete";
        menudiv += "</div>";
    }

    if ((selected == "SSC" || selected == "TAB" || selected == "SEC") && parent.vwChg != "Y") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnRename('" + val + "')\">";
        menudiv += "Rename";
        menudiv += "</div>";

    }

    if (selected == "BFD") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnRename('" + val + "')\">";
        menudiv += "Rename";
        menudiv += "</div>";
        menudiv += "<div class=\"menuitems\" onclick=\"fnFieldLocator('" + this + "')\">";
        menudiv += "Locate Field";
        menudiv += "</div>";

    }

    if (selected == "FDN") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnRename('" + val + "')\">";
        menudiv += "Rename";
        menudiv += "</div>";
    }

    if (selected == "LNM") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnRename('" + val + "')\">";
        menudiv += "Rename";
        menudiv += "</div>";
    }

    if (selected == "SSC") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnPreview('" + val + "')\">";
        menudiv += "Preview";
        menudiv += "</div>";

    }
    if (selected == "SUM") {
        menudiv += "<div class=\"menuitems\" onclick=\"fnPreview('" + val + "')\">";
        menudiv += "Preview";
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

function addfieldsui(attr) {
    if (selected == "BNM") {

        var schema = parent.jndiName;
        selectedval = selected;
        blkName = clickedobjects[1];
        attr = attr;
        parent.attr = attr;
        parent.blkName = blkName;

        parent.selectedval = selected;
        parent.datasrcDom = dom;

        loadSubScreenDIV("ChildWin", "RadAddDbUiFields.jsp?Title=");

    }

}

function fnPreview(val) {
    parent.dataXmlFlg = 'N';
    if (parent.vwChg != 'Y' && selectSingleNode(dom, "//RAD_DATA_BLOCKS[MASTER_BLOCK='Y']") == null) {
        alertMessage("Please select a Master block", "E");
        return false;
    }
    if (val == "SUM") {
        showPreview('SUMMARY');
    }
    else {
        var scr = clickedobjects[1];
        if (document.getElementById('SCREEN_VISIBLE').checked == false) {
            alertMessage("Screen is Invisible.Preview cannot be shown", "E");
            return false;
        }
        showPreview(scr);
    }
}

function CreateSCR(element) {
    var releaseNode = "RAD_KERNEL";
    var DATASRCNAME = "";
    DATASRCNAME = "CVS_MAIN";
    var rootnode = selectSingleNode(dom, ("//RAD_FUNCTIONS/" + releaseNode));
    var nodeArray = new Array();
    var ScreenSec = "";

    if (selectNodes(dom, "//RAD_SCREENS").length == 0) {
        var RadScreens = dom.createElement("RAD_SCREENS");
        rootnode.appendChild(RadScreens);
        nodeArray = elementArray['RAD_SCREENS'].split("~");

        for (var i = 0;i < nodeArray.length;i++) {
            var Screens = dom.createElement(nodeArray[i]);
            RadScreens.appendChild(Screens);
            RadScreens.setAttribute("ID", DATASRCNAME);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_POSITION"), "TEMPLATE");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_SIZE"), "SMALL");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "MAIN_SCREEN"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "EXIT_BUTTON_TYPE"), "1");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);

        var screensecArray = new Array();
        var secRootNode = selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']");

        var sec1 = dom.createElement("HEADER");

        var headerTab = dom.createElement("RAD_TABS");
        headerTab.setAttribute("ID", "TAB_HEADER");

        screensecArray = "";
        screensecArray = elementArray['RAD_TABS'].split("~");
        for (var i = 0;i < screensecArray.length;i++) {
            var prop = dom.createElement(screensecArray[i]);
            headerTab.appendChild(prop);
        }

        sec1.appendChild(headerTab);
        secRootNode.appendChild(sec1);
        sec1.setAttribute("ID", "HEADER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "TAB_NAME"), "TAB_HEADER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "TAB_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "RELEASE_NAME"), parent.relName);

        var sec2 = dom.createElement("BODY");
        var bodyTab = dom.createElement("RAD_TABS");
        bodyTab.setAttribute("ID", "TAB_MAIN");

        screensecArray = "";
        screensecArray = elementArray['RAD_TABS'].split("~");
        for (var i = 0;i < screensecArray.length;i++) {
            var prop = dom.createElement(screensecArray[i]);
            bodyTab.appendChild(prop);
        }

        sec2.appendChild(bodyTab);
        secRootNode.appendChild(sec2);
        sec2.setAttribute("ID", "BODY");

        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "TAB_NAME"), "TAB_MAIN");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "TAB_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "RELEASE_NAME"), parent.relName);

        var sec3 = dom.createElement("FOOTER");
        var footerTab = dom.createElement("RAD_TABS");
        footerTab.setAttribute("ID", "TAB_FOOTER");

        screensecArray = "";

        screensecArray = elementArray['RAD_TABS'].split("~");
        for (var i = 0;i < screensecArray.length;i++) {
            var prop = dom.createElement(screensecArray[i]);
            footerTab.appendChild(prop);
        }

        sec3.appendChild(footerTab);
        secRootNode.appendChild(sec3);
        sec3.setAttribute("ID", "FOOTER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "TAB_NAME"), "TAB_FOOTER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "TAB_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "RELEASE_NAME"), parent.relName);

        setScreens("SSC");
        showData("SCR~" + DATASRCNAME);
        Preobjec = "SCR~" + DATASRCNAME;
        PreNode = DATASRCNAME;
    }
}

function fnAddUI(attr) {

    var schema = parent.jndiName;
    selectedval = selected;
    blkName = clickedobjects[1];
    parent.attr = attr;
    parent.blkName = blkName;
    parent.selectedval = selected;
    parent.datasrcDom = dom;
    menuobj.style.visibility = "hidden";
    loadSubScreenDIV("ChildWin", "RadAddUIFlds.jsp?Title=");
}

function fnAmendables(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var act = srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[1].value;
    actVal = act;
    parent.actVal = actVal;
    loadSubScreenDIV("ChildWin", "RadAmendables.jsp?Title=" + act);

}

function fnComments(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var act = srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[1].value;
    actVal = act;
    parent.actVal = actVal;
    loadSubScreenDIV("ChildWin", "RadCommentActions.jsp?Title=" + act);

}

function fnadd(attr, flag) {
    DeletFlag = "NO";
    var Title = "";
    var ColumnName = "";
    var click = "";
    var defaultValue = "";
    var Block = selectNodes(dom, "//RAD_KERNEL/RAD_DATA_BLOCKS");
    if (clickedobjects[2] != "") {
        click = clickedobjects[2];
    }
    if (attr == "DSN" && document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && Block.length != 0) {
        alertMessage("Only one Data Source can be added for Function Category Dashboard", "E");
        return;
    }

    if (attr == "BLK" && document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && Block.length != 0) {
        alertMessage("Only one block can be added for Function Category Dashboard", "E");
        return;
    }
    if (click == "FOOTER" && document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD") {
        alertMessage("Addition of Footer not allowed for Dashboard Screens", "I");
        return;
    }

    if (click == "HEADER" || click == "FOOTER" || click == "BODY") {
        for (var i = 0;i < clickedobjects.length;i++) {
            Title = DisplayNameArray[click][i];
            ColumnName = DisplayColumnArray[click][i];
            defaultValue = DisplayDefaultValueArray[click][i];
        }
    }
    else {

        for (var j = 0;j < clickedobjects.length;j++) {
            var index = "";
            index = clickedobjects[0];
            for (var i = 0;i < clickedobjects.length;i++) {
                Title = DisplayNameArray[index][i];
                ColumnName = DisplayColumnArray[index][i];
                defaultValue = DisplayDefaultValueArray[index][i];
            }
        }
    }
    if (flag == "") {
        menuobj.style.visibility = "hidden";
    }

    if (selected == "DSN") {
        var schema = parent.jndiName;
        parent.changesDOM = dom;

        loadSubScreenDIV("ChildWin", "RadAddDatasource.jsp?schema=" + schema);

    }
    else if (selected == "BNM") {

        var schema = parent.jndiName;
        selectedval = selected;
        blkName = clickedobjects[1];
        attr = attr;
        parent.attr = attr;
        parent.blkName = blkName;
        parent.selectedval = selected;
        parent.datasrcDom = dom;

        loadSubScreenDIV("ChildWin", "RadAddDbUiFields.jsp?Title=");

    }
    else if (selected == "DBT") {
        fnGetDBColFields(clickedobjects[1], attr);

    }
	//customer changes tabs
	else if (Title == "Add Section" && document.getElementById("FUNCTION_CATEGORY").value =="TABS") {
       alertMessage("Sections Will not be allowed for Tab Screen", "E");
        return;  
    }
    else {

        var schema = parent.jndiName;
        selectedval = selected;
        parent.selectedval = selected;
        parent.attr = attr;
        renameFlg = "NO";
        parent.renameFlg = renameFlg;
        loadSubScreenDIV("ChildWin", "RadAddElements.jsp?Title=" + Title + "&ColumnName=" + ColumnName + "&defaultValue=" + defaultValue, "Lov_Window", "Height:200; Width:400; status=no;help:no;");

    }

}

function checkNamingConv(newvalue, ColumnName, namingCon) {

    if (newvalue.substring(0, 4) != namingCon) {
        alertMessage(ColumnName + " should start with " + namingCon, "E");
        return false;
    }
    else {
        return true;
    }
}

function fnClose(alk) {
    latestvalue = alk;
    CreateDOM(attr);
    newwin.close();

}

function fnDel(attr, flag) {
    DeletFlag = "YES";
    if (selected == "DBT") {
        var val1 = fnCheckDataSource(clickedobjects[1]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements...", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }
    }
    else if (selected == "DBC") {
        var val1 = fnCheckDataSrcFld(clickedobjects[1], clickedobjects[2]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }
    }
    else if (selected == "BNM") {
        var val1 = fnCheckDataBlk(clickedobjects[1]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }
    }
    else if (selected == "BFD") {
        var val1 = fnCheckDataBlkFld(clickedobjects[1], clickedobjects[2]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }
    }
    else if (selected == "LNM") {
        var val1 = fnCheckLov(clickedobjects[1]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }
    }
    else if (selected == "FLD") {
        var val1 = fnCheckFieldSet(clickedobjects[1]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }

    }
    else if (selected == "SSC") {
        var val1 = fnCheckScreens(clickedobjects[1]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }

    }
    else if (selected == "TAB") {
        var val1 = fnCheckTabs(clickedobjects[1], clickedobjects[2], clickedobjects[3]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }

    }
    else if (selected == "SEC") {
        var val1 = fnCheckSections(clickedobjects[1], clickedobjects[2], clickedobjects[3], clickedobjects[4]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }
    }
    else if (selected == "FDN") {
        var val1 = fnCheckFieldSet(clickedobjects[1]);
        if (val1 == "1") {
            alertMessage("Deletion not allowed to Base Elements", "I");
            return false;
        }
        else if (val1 == "2") {
            alertMessage("Elements from previous releases cannot be deleted", "I");
            return false;
        }
    }
    if (flag == "") {
        menuobj.style.visibility = "hidden";
    }
    if (giInterFace) {
        clickedobjects = attr.split("~");
    }
    logScreen = "D";
    var get_res = alertMessage("Do you want to delete..?", "O");

}

function fnCnfrmDel(get_res) {
    if (get_res == true) {
        if (!giInterFace && !purgeFilter) {
            if (selected == "DBT") {
                fnDelDatascr(clickedobjects[1]);
                selected = "DSN";
            }
            else if (selected == "DBC") {
                fnDelFldIndatascr(clickedobjects[2], clickedobjects[1]);
                selected = "DBT";
            }
            else if (selected == "SSC") {
                fnDeleteScreen(clickedobjects[1]);
                selected = "SCR";
            }
            else if (selected == "BNM") {
                fnDelBlock(clickedobjects[1]);
                selected = "BLK";
            }
            else if (selected == "BFD") {
                fnDelFldInBlock(clickedobjects[2], clickedobjects[1]);
                selected = 'BNM';
            }
            else if (selected == "FDN") {
                fnDelFldset(clickedobjects[1]);
                selected = "FLD";
            }
            else if (selected == "LNM") {
                fnDleteLov(clickedobjects[1]);
                selected = "LOV";
            }
            else if (selected == "TAB") {
                fnDeleteTab(clickedobjects[1], clickedobjects[2], clickedobjects[3]);
                selected = clickedobjects[2];
            }
            else if (selected == "SEC") {
                fnDeleteSection(clickedobjects[1], clickedobjects[2], clickedobjects[3], clickedobjects[4]);
                selected = "TAB";
            }
            clickedxpath = clickedxpath.substring(0, clickedxpath.indexOf('~' + clickedobjects[clickedobjects.length - 1]));
            afterDelete(attr);
        }
        else if (giInterFace) {
            fnDeleteGIRec(clickedobjects);

        }
        else if (purgeFilter) {
            fnDeletePFRec(clickedobjects);
        }

    }
    else {
        return;
    }
}

function afterDelete(attr) {
    setScreens(selected);
    showData(clickedxpath);
    Preobjec = "";
    PreNode = selected;

}
var display_url = 0
var ie5 = document.all && document.getElementById
var ns6 = document.getElementById && !document.all

function showmenuie5(e) {

    var str = navigator.appName;
    var evt = window.event || e;
    menuobj = document.getElementById("TreeMenu");
    menuobj.style.left = (evt.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)) + 'px';
   /* if (str == 'Microsoft Internet Explorer') {
        var s = document.getElementById("Dleft").scrollTop;
        menuobj.style.top = (evt.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop)) - 125 + s + 'px';
    }
    else {*/
        menuobj.style.top = (evt.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop)) + 'px';
    //}
    menuobj.style.visibility = "visible"
    return false

}

function hidemenuie5(e) {
    if (menuobj) {
        menuobj.style.visibility = "hidden"
    }
}

function highlightie5(e) {
    var firingobj = ie5 ? event.srcElement : e.target
    if (firingobj.className == "menuitems" || ns6 && firingobj.parentNode.className == "menuitems") {
        if (ns6 && firingobj.parentNode.className == "menuitems")
            firingobj = firingobj.parentNode//up one node
        firingobj.style.backgroundColor = "highlight"
        firingobj.style.color = "white"
        if (display_url == 1)
            window.status = event.srcElement.url
    }
}

function lowlightie5(e) {
    var firingobj = ie5 ? event.srcElement : e.target
    if (firingobj.className == "menuitems" || ns6 && firingobj.parentNode.className == "menuitems") {
        if (ns6 && firingobj.parentNode.className == "menuitems")
            firingobj = firingobj.parentNode//up one node
        firingobj.style.backgroundColor = ""
        firingobj.style.color = "black"
        window.status = ''
    }
}

function fnActions() {

    var winParams = new Object();
    var tmp = 0;
    var tabObj = document.getElementById("funcDesc");
    for (var i = 0;i < tabObj.tBodies[0].rows.length;i++) {
        if (tabObj.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tmp = tmp + 1;
            rowindex = i;
        }
    }
    if (tmp > 1) {
        i = 0;
        alertMessage("Select only one Function Id", "E");
        return false;
    }
    else if (tmp == 0) {
        alertMessage("No Function Id selected", "E");
        return false;
    }
    var tmp = 0;

    var fncId = tabObj.tBodies[0].rows[rowindex].cells[1].getElementsByTagName("INPUT")[0].value;
    var ctrlStngActns = tabObj.tBodies[0].rows[rowindex].cells[4].getElementsByTagName("INPUT")[0].value;

    if (ctrlStngActns == "" || ctrlStngActns.length != 16) {

        if (getNodeText(selectSingleNode(dom, "RAD_FUNCTIONS/FUNCTION_CATEGORY")) == "MAINTENANCE") {
            ctrlStngActns = "1111111100000000";
        }
        else if (getNodeText(selectSingleNode(dom, "RAD_FUNCTIONS/FUNCTION_CATEGORY")) == "TRANSACTION") {
            ctrlStngActns = "111111111111011";
        }
        else {
            ctrlStngActns = "0000000000000000";
        }
    }
    ctrlFncId = fncId;
    ctrlStrng = ctrlStngActns;
    ctrlrwIndx = rowindex;
    loadSubScreenDIV("ChildWin", "RadMenuActions.jsp?Title=" + fncId);

}

function fn_Chekc_RelType(NewDOM) {
    var relType = parent.relType;
    if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "KERNEL") {
        if (relType == "KERNEL" || relType == "CUSTOM" || relType == "CLUSTER") {
            return 0;
        }
    }
    else if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "CLUSTER") {
        if (relType == "CUSTOM" || relType == "CLUSTER") {
            return 0;
        }
        else if (relType == "KERNEL") {
            return 1;
        }

    }
    else if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "CUSTOM") {
        if (relType == "CUSTOM") {
            return 0;
        }
        else if (relType == "CLUSTER" || relType == "KERNEL") {
            return 2;
        }
    }

}

function fnvalRel_Raddnode(NewDOM) {
    var reltype = parent.relType;
    if (reltype == 'KERNEL') {
        if (selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            alertMessage("Error in loading XML - Cluster Node found in kernel Rad", "E");
            return false;
        }
        if (selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
            alertMessage("Error in loading XML --Custom Node found in Kernel Rad", "E");
            return false;
        }
        if (selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOMER").length != 0) {
            alertMessage("Error in loading XML --Customer Node found in kernel Rad", "E");
            return false;
        }
    }
    if (reltype == 'CLUSTER') {

        if (selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
            alertMessage("Error in loading XML --Custom Node found in Cluster Rad", "E");
            return false;
        }
        if (selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOMER").length != 0) {
            alertMessage("Error in loading XML --Customer Node found in Cluster Rad", "E");
            return false;
        }
    }
    if (reltype == 'CUSTOM') {

        if (selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOMER").length != 0) {
            alertMessage("Error in loading XML --Customer Node found in Custom Rad", "E");
            return false;
        }
    }
}

function fnDisplayLoadFuncId() {
    var l_xmlPath = document.getElementsByName("LOAD_XML")[0].value;
    var xml2 = fnReadFileFF(l_xmlPath);
}

function addNewRow(tableName) {

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;

    if (tableName == "partition" && document.getElementsByName("FUNCTION_CATEGORY")[0].value == "DASHBOARD") {
        if ((numRows > 0)) {
            alertMessage("Only one partition allowed for Dashboard Screens", "I");
            return false;
        }
    }
    if (tableName == "partition") {
        var res = validatePartionRows(tableName, clickedobjects[1]);
        if (res == "0") {
            return false;
        }
    }
    else if (tableName == "CALFRMS") {

        if (numRows >= 1) {
            var res = fn_Check_MandFlds_Calfrms('CALFRMS');
            if (res == "0") {
                return false;
            }
        }
    }
    else if (tableName == "attributes") {
        if (document.getElementById('DISPLAY_TYPE_BLKF').value == "CHECKBOX") {
            if (numRows >= 2) {
                return false;
            }
        }
    }
    var newR = addTableRow(tableName);
    fnUncheckAll(tableName);
    if (newR.cells[0].children[0].type == "checkbox")
        newR.cells[0].children[0].checked = true;

    if (tableName == 'CALFRMS') {
        fn_populate_Blocks_toCallfrmFlds('RAD_DATA_BLOCKS', 'CALFRMS', 'frmSum', 'CALLFROM_PARENT_DATASRC', 2, 3);
        fn_populate_Blocks_toCallfrmFlds("RAD_SCREENS[MAIN_SCREEN='Y']", 'CALFRMS', 'frmSum', 'CALLFROM_PARENT_DATASRC', 6);
        getTabsToCallforms('CALFRMS', 7);
        fnAppndRelFlag('CALFRMS');
    }
    if (tableName == 'lfmform') {
        fnAppndRelFlag('lfmform');
    }
    if (tableName == "attributes") {
        fnAppndRelFlag('attributes');
    }
    if (tableName == "partition") {
        validPartitions();
        fnAppndRelFlag('partition');
    }
    if (tableName == "FieldsetFields") {
        SetSubpartition();
        fnAppndRelFlag('FieldsetFields');

    }
    if (tableName == "events") {
        fn_populate_Blocks_toCallfrmFlds('RAD_SCREENS', 'events', 'frmBlkFldDtls', 'BUTTON_SCREEN', 4);
    }
    if (tableName == "ScrArgnts") {
        fnAppndRelFlag('ScrArgnts');
    }
    if (tableName == "GI_B_AssocRecords") {
        fn_populate_RECORDS_togi('REC_CODE', 'GI_B_AssocRecords', 'frmSum', 'REC_CODE', 1, 4);
    }
    if (tableName == "PF_TABLES") {
        funcPFPrntTabs();
    }
	if (tableName == "PF_ARGDESC") {
        fn_populate_Tables_PF_ARGDESC();
    }
}

function fnUncheckAll(blockId) {
    if (blockId == "ACTNS_TB")
        return;
    var rowObj = document.getElementById(blockId).tBodies[0].rows;
    for (var i = 0;i < rowObj.length;i++) {
        rowObj[i].children[0].getElementsByTagName("INPUT")[0].checked = false;
    }
}

function delRow(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;

    if (tableName == "CALFRMS") {
        for (var index = numRows - 1;index >= 0;index--) {

            if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                var callfrom = tableObject.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
                if (callfrom != "") {
                    var i = fnCheckCallForm(callfrom);
                    if (i == "1") {
                        alertMessage("Deletion not allowed to Base Elements", "I");
                        return false;
                    }
                    else if (i == "2") {
                        alertMessage("Elements from previous releases cannot be deleted", "I");
                        return false;
                    }
                    else {
                        tableObject.tBodies[0].deleteRow(index);
                    }
                }
                else {
                    tableObject.tBodies[0].deleteRow(index);
                }
            }
        }
    }
    else if (tableName == "attributes") {
        if (clickedobjects[0] = "BLK") {
            for (var index = numRows - 1;index >= 0;index--) {

                if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                    var CustAttr = tableObject.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
                    if (CustAttr != "") {
                        var blkName = clickedobjects[1];
                        var fieldName = clickedobjects[2];
                        var i = fnCheckCustAttr(blkName, fieldName, CustAttr);
                        if (i == "1") {
                            alertMessage("Deletion not allowed to Base Elements", "I");
                            return false;
                        }
                        else if (i == "2") {
                            alertMessage("Elements from previous releases cannot be deleted", "I");
                            return false;
                        }
                        else {
                            tableObject.tBodies[0].deleteRow(index);
                        }
                    }
                    else {
                        tableObject.tBodies[0].deleteRow(index);
                    }
                }
            }
        }
    }
    else if (tableName == "ScrArgnts") {
        if (clickedobjects[0] = "SCR") {
            for (var index = numRows - 1;index >= 0;index--) {

                if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                    var ScrArgnt = tableObject.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
                    if (ScrArgnt != "") {
                        var scrName = clickedobjects[1];
                        var i = fnCheckScrArgnts(scrName, ScrArgnt);
                        if (i == "1") {
                            alertMessage("Deletion not allowed to Base Elements", "I");
                            return false;
                        }
                        else if (i == "2") {
                            alertMessage("Elements from previous releases cannot be deleted", "I");
                            return false;
                        }
                        else {
                            tableObject.tBodies[0].deleteRow(index);
                        }
                    }
                    else {
                        tableObject.tBodies[0].deleteRow(index);
                    }
                }
            }
        }
    }
    else if (tableName == "partition") {
        if (clickedobjects[0] = "SCR") {
            for (var index = numRows - 1;index >= 0;index--) {

                if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                    var Partition = tableObject.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
                    if (Partition != "") {
                        var scrName = clickedobjects[1];

                        var i = fnCheckPartition(scrName, clickedobjects[2], clickedobjects[3], clickedobjects[4], Partition);
                        if (i == "1") {
                            alertMessage("Deletion not allowed to Base Elements", "I");
                            return false;
                        }
                        else if (i == "2") {
                            alertMessage("Elements from previous releases cannot be deleted", "I");
                            return false;
                        }
                        else {
                            tableObject.tBodies[0].deleteRow(index);
                        }
                    }
                    else {
                        tableObject.tBodies[0].deleteRow(index);
                    }
                }
            }
            validPartitions();
        }
    }
    else if (tableName == "lfmform") {
        for (var index = numRows - 1;index >= 0;index--) {

            if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                var launchfrm = tableObject.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
                if (launchfrm != "") {
                    var i = fnCheckLaunchForm(launchfrm);
                    if (i == "1") {
                        alertMessage("Deletion not allowed to Base Elements", "I");
                        return false;
                    }
                    else if (i == "2") {
                        alertMessage("Elements from previous releases cannot be deleted", "I");
                        return false;
                    }
                    else {
                        tableObject.tBodies[0].deleteRow(index);
                    }
                }
                else {
                    tableObject.tBodies[0].deleteRow(index);
                }
            }
        }
    }
    else if (tableName == "ACTNS_TB") {
        if (numRows > 11) {
            for (var indx = numRows - 1;indx > 10;indx--) {
                if (tableObject.tBodies[0].rows[indx].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                    tableObject.tBodies[0].deleteRow(indx);
                }
            }
        }
    }
    else if (tableName == "FieldsetFields") {

        for (var index = numRows - 1;index >= 0;index--) {
            if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                var fldset = document.getElementById('FDN').getElementsByTagName('fieldset')[0].getElementsByTagName("INPUT")[0].value;
                var field = tableObject.tBodies[0].rows[index].cells[1].getElementsByTagName('INPUT')[0].value;
                var basefieldset = selectNodes(basedom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS[FIELD_NAME='" + field + "']");
                var prvsRelsType = tableObject.tBodies[0].rows[index].cells[3].getElementsByTagName('INPUT')[0].value;
                var prvsRelsName = tableObject.tBodies[0].rows[index].cells[4].getElementsByTagName('INPUT')[0].value;
                if (prvsRelsName == parent.relName && prvsRelsType == parent.relType && basefieldset.length == 0) {
                    tableObject.tBodies[0].deleteRow(index);
                }
            }
        }

    }
    else {
        for (var index = numRows - 1;index >= 0;index--) {
            if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                if (tableName == "attributes") {
                    if (document.getElementById("DISPLAY_TYPE_BLKF").value == "CHECKBOX") {
                        if (numRows >= 2) {
                            return false;
                        }
                    }
                }
                tableObject.tBodies[0].deleteRow(index);

            }
            if (tableName == "partition") {
                validPartitions();
            }
        }

    }
    /*if(numRows>1)
	tableObject.tBodies[0].rows[2].cells[0].children[0].checked = true;*/

}

function upper(r) {
    r.value = r.value.toUpperCase();
}

function deleteAll(tableName) {

    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        tableObject.tBodies[0].deleteRow(index);
    }

}

function FnFstMltRecValidation() {
    var MulRecblk = new Array();
    var MultFsts = new Array();
    var cnt = 0;
    var len = 0;

    var Blks = selectNodes(dom, "//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (var i = 0;i < Blks.length;i++) {
        if (getNodeText(selectSingleNode(Blks[i], "MULTI_RECORD")) == "Y") {
            MulRecblk[len] = getNodeText(selectSingleNode(Blks[i], "BLOCK_NAME"));
            len++;
        }
    }
    len = 0;
    for (var n = 0;n < MulRecblk.length;n++) {
        var fsts = selectNodes(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_VISIBLE='Y']");

        for (var m = 0;m < fsts.length;m++) {
            var blkName = MulRecblk[n];
            if (getNodeText(selectSingleNode(fsts[m], "FIELDSET_BLOCK")) == MulRecblk[n]) {
                MultFsts[len] = getNodeText(selectSingleNode(fsts[m], "FIELDSET_NAME"));
                len++;
            }
        }
        if (MultFsts.length > 1) {
            for (var i = 0;i < MultFsts.length;i++) {
                if (getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + MultFsts[i] + "']"))[0], "VIEW_TYPE")) == "MULTIPLE") {
                    cnt = cnt + 1;
                }
            }
        }

        if (cnt >= 2) {
            return blkName;
        }
        len = 0;
        cnt = 0;
        MultFsts.length = 0;
    }
    return "";

}

function writeLog(msg, msgType) {

    if (msgType == "E" || msgType == "") {
        errLogMsg += msg + "\n";
        errType = msgType;

    }
    else if (msgType == "A") {
        //amount field validation
        amterrLogMsg += msg + "\n";
    }
    else {
        logMsg += msg + "\n";
    }

}

function fntransform(xmlDoc, xslName) {
    var xmlData = xmlDoc;
    var xslProc;
    var xslt = "";
    var xslDoc = "";
    xslDoc = loadXSLFile(xslName);
    xslPro = transform(xmlData, xslDoc, "");
    return xslPro;
}

function disableAll2() {
    if (!giInterFace && !purgeFilter) {
        firstTreeobject = document.getElementById("treebody").innerHTML;

        if (parent.chngUIFlg == "Y") {
            fnAllowUIChangeOnly_ScrnCstm();
        }
    }
    else {
        firstTreeobject = document.getElementById("treebody").innerHTML;
    }
}

function appendChildData() {
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID"), document.getElementsByName("FUNCTION_ID")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_TYPE"), document.getElementsByName("FUNCTION_TYPE")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"), document.getElementsByName("FUNCTION_CATEGORY")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_FUNC_ID"), document.getElementsByName("PARENT_FUNC_ID")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODULE_ID"), document.getElementsByName("PARENT_MODULE_ID")[0].value);
   // setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/HEADER_TEMPLATE"), document.getElementsByName("HEADER_TEMPLATE")[0].value);
    //setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FOOTER_TEMPLATE"), document.getElementsByName("FOOTER_TEMPLATE")[0].value);
    if (selectSingleNode(dom, "//RAD_FUNCTIONS/CALL_FORM_TYPE") != null) {
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/CALL_FORM_TYPE"), document.getElementsByName("CALL_FORM_TYPE")[0].value);
    }
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RELEASE_TYPE"), parent.relType);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/USER_ID"), document.getElementsByName("USER_ID")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RELEASE_CODE"), document.getElementsByName("RELEASE_CODE")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/LANG_CODE"), document.getElementsByName("LANG")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/OPERATION"), document.getElementsByName("OPERATION")[0].value);
    if (document.getElementsByName("ACTION")[0].value == "NEW") {
        if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_ORIGIN")) == "") {
            setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/PARENT_ORIGIN")), getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")));
        }
    }

    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/ACTION"), document.getElementsByName("ACTION")[0].value);
    if (document.getElementsByName("ACTION")[0].value == "NEW") {
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"), parent.relType);
    }

}

function appendMainData() {
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID"), document.getElementsByName("FUNCTION_ID")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_TYPE"), document.getElementsByName("FUNCTION_TYPE")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"), document.getElementsByName("FUNCTION_CATEGORY")[0].value);
    //setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_FUNC_ID"), document.getElementsByName("PARENT_FUNC_ID")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODULE_ID"), document.getElementsByName("PARENT_MODULE_ID")[0].value);
    //setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/HEADER_TEMPLATE"), document.getElementsByName("HEADER_TEMPLATE")[0].value);
   // setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FOOTER_TEMPLATE"), document.getElementsByName("FOOTER_TEMPLATE")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/CALL_FORM_TYPE"), document.getElementsByName("CALL_FORM_TYPE")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RELEASE_TYPE"), parent.relType);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/USER_ID"), document.getElementsByName("USER_ID")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RELEASE_CODE"), document.getElementsByName("RELEASE_CODE")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/ACTION"), document.getElementsByName("ACTION")[0].value);
    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/LANG_CODE"), document.getElementsByName("LANG")[0].value);
    try{	
	setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/LANDING_PAGE_COMPONENT"), "Y");
	}
	catch(e){
	
    var bodyNode1 = selectSingleNode(dom, "//RAD_FUNCTIONS");
    var tempNode1 = dom.createElement("LANDING_PAGE_COMPONENT");
	bodyNode1.insertBefore(tempNode1,selectSingleNode(dom, "//RAD_FUNCTIONS/LANG_CODE"));
	setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/LANDING_PAGE_COMPONENT"), "Y");
	
   }
    if (parent.gen_gwinFuncId == 'RDDNOTIF') {
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/OPERATION"), ntfyAction);
    }
    else {
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/OPERATION"), document.getElementsByName("OPERATION")[0].value);
    }
    if (document.getElementsByName("ACTION")[0].value == "NEW") {
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"), parent.relType);
        if (document.getElementsByName("FUNCTION_ID")[0].value.substring(2, 3) == "C") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/CALL_FORM_TYPE"), document.getElementsByName("CALL_FORM_TYPE")[0].value);
        }
    }
}

function CallCodeGenerator(radReqDOM, xml2, frntndFiles) {

    var objHTTP = createHTTPActiveXObject();
    parent.gReqType = "GEN";
    parent.gReqCode = "GENERATE";
    parent.gIsSummary = 0;
    parent.gAction = "";
    gReleaseCode = parent.relCode;
    parent.gSubFolder = "";
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + xml2 + frntndFiles, "RADClientHandler");
    if (!response) {
        //parent.alertMessage("Error in generating packages", "E");
        return false;
    }

    return response;

}

function setChildFlg() {
    var dataSrcs = selectNodes(dom, "//RAD_DATASOURCES")
    for (var i = 0;i < dataSrcs.length;i++) {
        var dsName = getNodeText(selectSingleNode(dataSrcs[i], "DATASRC_NAME"));
        var val1 = isFromParent(dsName, "RAD_DATASOURCES", "DATASRC_NAME");
        if (val1 != "1") {
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATASOURCES[DATASRC_NAME='" + dsName + "']"))[0], "CHILD_DATASRC"), "Y");
        }
        else {
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATASOURCES[DATASRC_NAME='" + dsName + "']"))[0], "CHILD_DATASRC"), "N");
        }

    }
    var dataSrcs = selectNodes(dom, "//RAD_CALLFORM")
    for (var i = 0;i < dataSrcs.length;i++) {
        var clfName = getNodeText(selectSingleNode(dataSrcs[i], "CALLFORM_FUCNTIONID"));
        var val1 = isFromParent(clfName, "RAD_CALLFORM", "CALLFORM_FUCNTIONID");
        if (val1 != "1") {
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_CALLFORM[CALLFORM_FUCNTIONID='" + clfName + "']"))[0], "CHILD_CALLFORM"), "Y");
        }
        else {
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_CALLFORM[CALLFORM_FUCNTIONID='" + clfName + "']"))[0], "CHILD_CALLFORM"), "N");
        }

    }

}

function isFromParent(id, node, element) {
    if (getXMLString(funcdom) != "") {
        var releaseNodeArray = "RAD_KERNEL~RAD_CLUSTER~RAD_CUSTOM~RAD_CUSTOMER";
        var releaseNodes = new Array();
        releaseNodes = releaseNodeArray.split("~");
        for (j = 0;j < releaseNodes.length;j++) {
            var basenodes = selectNodes(funcdom, "//" + releaseNodes[j] + "/" + node);
            for (var k = 0;k < basenodes.length;k++) {
                if (getNodeText(selectSingleNode(basenodes[k], element)) == id) {
                    return "1";
                }
            }
        }
    }
    return "2";
}

function fntransferRadFld(final1Xml) {

    var lovs = selectNodes(final1Xml, "//LOV");

    for (var i = 0;i < lovs.length;i++) {
        var colheadinglist = "";
        var headinglist = selectNodes(lovs[i], "COL_HEADING");
        var len = headinglist.length;
        for (var j = 0;j < len;j++) {
            colheadinglist = colheadinglist + headinglist[j].text + '~';
            if (j < len - 1) {
                x = headinglist[j];
                x.parentNode.removeChild(x);
            }
        }
        if (headinglist[0]) {
            if (colheadinglist.substring(colheadinglist.length - 1, colheadinglist.length) == "~") {
                setNodeText(selectNodes(lovs[i], "COL_HEADING")[0], colheadinglist.substring(0, colheadinglist.length - 1));
            }
            else {
                setNodeText(selectNodes(lovs[i], "COL_HEADING")[0], colheadinglist);
            }
        }

    }

    var lovs = selectNodes(final1Xml, "//OFFLINE_LOV");

    for (var i = 0;i < lovs.length;i++) {
        var colheadinglist = "";
        var headinglist = selectNodes(lovs[i], "COL_HEADING");
        var len = headinglist.length;
        for (var j = 0;j < len;j++) {
            colheadinglist = colheadinglist + headinglist[j].text + '~';
            if (j < len - 1) {
                x = headinglist[j];
                x.parentNode.removeChild(x);
            }
        }
        if (headinglist[0]) {
            if (colheadinglist.substring(colheadinglist.length - 1, colheadinglist.length) == "~") {
                setNodeText(selectNodes(lovs[i], "COL_HEADING")[0], colheadinglist.substring(0, colheadinglist.length - 1));
            }
            else {
                setNodeText(selectNodes(lovs[i], "COL_HEADING")[0], colheadinglist);
            }
        }

    }

    var lovs = selectNodes(final1Xml, "//LOV");

    for (var i = 0;i < lovs.length;i++) {
        var redheadinglist = "";
        var headinglist = selectNodes(lovs[i], "REDUCTION_FLD_LABELS");
        var radfldlist = selectNodes(lovs[i], "RED_FIELD");
        var len = headinglist.length;
        for (var j = 0;j < len;j++) {
            x = headinglist[j];
            x.parentNode.removeChild(x);

            redheadinglist = redheadinglist + headinglist[j].text + '!' + radfldlist[j].text + '~';
            if (j < len - 1) {
                y = radfldlist[j];
                y.parentNode.removeChild(y);
            }
        }
        if (radfldlist[0]) {
            if (redheadinglist.substring(redheadinglist.length - 1, redheadinglist.length) == "~") {
                setNodeText(selectNodes(lovs[i], "RED_FIELD")[0], redheadinglist.substring(0, redheadinglist.length - 1));
            }
            else {
                setNodeText(selectNodes(lovs[i], "RED_FIELD")[0], redheadinglist);
            }
        }
    }

    var lovs = selectNodes(final1Xml, "//OFFLINE_LOV");

    for (var i = 0;i < lovs.length;i++) {
        var redheadinglist = "";
        var headinglist = selectNodes(lovs[i], "REDUCTION_FLD_LABELS");
        var radfldlist = selectNodes(lovs[i], "RED_FIELD");
        var len = headinglist.length;
        for (var j = 0;j < len;j++) {
            x = headinglist[j];
            x.parentNode.removeChild(x);

            redheadinglist = redheadinglist + headinglist[j].text + '!' + radfldlist[j].text + '~';
            if (j < len - 1) {
                y = radfldlist[j];
                y.parentNode.removeChild(y);
            }
        }
        if (radfldlist[0]) {
            if (redheadinglist.substring(redheadinglist.length - 1, redheadinglist.length) == "~") {
                setNodeText(selectNodes(lovs[i], "RED_FIELD")[0], redheadinglist.substring(0, redheadinglist.length - 1));
            }
            else {
                setNodeText(selectNodes(lovs[i], "RED_FIELD")[0], redheadinglist);
            }
        }
    }

    var lovs = selectNodes(final1Xml, "//LOV");

    for (var i = 0;i < lovs.length;i++) {
        var redheadinglist = "";
        var visiblelist = selectNodes(lovs[i], "VISIBLE");

        var len = visiblelist.length;
        for (var j = 0;j < len;j++) {
            redheadinglist = redheadinglist + visiblelist[j].text + '~';
            if (j < len - 1) {
                x = visiblelist[j];
                x.parentNode.removeChild(x);
            }
        }
        if (visiblelist[0]) {
            if (redheadinglist.substring(redheadinglist.length - 1, redheadinglist.length) == "~") {
                setNodeText(selectNodes(lovs[i], "VISIBLE")[0], redheadinglist.substring(0, redheadinglist.length - 1));
            }
            else {
                setNodeText(getNodeText(selectNodes(lovs[i], "VISIBLE")[0]), redheadinglist);
            }
        }
    }

    var lovs = selectNodes(final1Xml, "//OFFLINE_LOV");

    for (var i = 0;i < lovs.length;i++) {
        var redheadinglist = "";
        var visiblelist = selectNodes(lovs[i], "VISIBLE");

        var len = visiblelist.length;
        for (var j = 0;j < len;j++) {
            redheadinglist = redheadinglist + visiblelist[j].text + '~';
            if (j < len - 1) {
                x = visiblelist[j];
                x.parentNode.removeChild(x);
            }
        }
        if (visiblelist[0]) {
            if (redheadinglist.substring(redheadinglist.length - 1, redheadinglist.length) == "~") {
                setNodeText(selectNodes(lovs[i], "VISIBLE")[0], redheadinglist.substring(0, redheadinglist.length - 1));
            }
            else {
                setNodeText(selectNodes(lovs[i], "VISIBLE")[0], redheadinglist);
            }
        }
    }

    return final1Xml;

}

function setTempHeaderNodes(dom) {
    debug('In setTempHeaderNodes to set the headernodes');
    var funcNodes = selectNodes(dom, "//RAD_FUNCTIONS");
    var hdrTempNodes = "CALL_FORM_TYPE~LANG_CODE~OPERATION~ORIGINATION_DATE~USER_ID~RELEASE_CODE~SFR_NO~SUB_PROJECT~CHECKIN_MODE~DDL_REMARKS~SVN_USER~SVN_PASS~PARENT_MODULE_ID~MODIFIED_IN_KERNEL~MODIFIED_IN_CLUSTER~MODIFIED_IN_CUSTOM~MODIFIED_IN_CUSTOMER~PARENT_MODIFIED_IN_KERNEL~PARENT_MODIFIED_IN_CLUSTER~PARENT_MODIFIED_IN_CUSTOM~PARENT_MODIFIED_IN_CUSTOMER~TEMP_CORRECTION_DONE~ORDER_CORRECTION_DONE"
    hdrTempNodes = hdrTempNodes.split("~");
    for (var hn = 0;hn < hdrTempNodes.length;hn++) {
        if (selectSingleNode(dom, "//RAD_FUNCTIONS/" + hdrTempNodes[hn]) == null) {
            funcNodes[0].insertBefore((dom.createElement(hdrTempNodes[hn])), selectSingleNode(funcNodes[0], 'RAD_KERNEL'));
        }
    }
    if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "") {
        if (selectNodes(NewDOM, "//RAD_KERNEL").length != 0) {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"), "KERNEL");
        }
        else if (selectNodes(NewDOM, "//RAD_CLUSTER").length != 0) {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"), "CLUSTER");
        }
        else if (selectNodes(NewDOM, "//RAD_CUSTOM").length != 0) {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"), "CUSTOM");
        }
    }
    if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "KERNEL") {
        if (parent.relType == "KERNEL" || parent.relType == "CLUSTER" || parent.relType == "CUSTOM" || parent.relType == "CUSTOMER") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_KERNEL"), "Y");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOMER"), "N");

        }
        if (parent.relType == "CLUSTER") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"), "Y");
        }
        if (parent.relType == "CUSTOM") {
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"), "Y");
            }
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "Y");

        }
        if (parent.relType == "CUSTOMER") {
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"), "Y");
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "Y");
            }
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOMER"), "Y");

        }

    }
    else if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "CLUSTER") {
        if (parent.relType == "CLUSTER" || parent.relType == "CUSTOM" || parent.relType == "CUSTOMER") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_KERNEL"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"), "Y");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOMER"), "N");

        }
        if (parent.relType == "CUSTOM") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "Y");

        }
        if (parent.relType == "CUSTOMER") {

            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "Y");
            }
            else {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "N");
            }
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOMER"), "Y");

        }
    }
    else if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "CUSTOM") {
        if (parent.relType == "CUSTOM") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_KERNEL"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "Y");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOMER"), "N");

        }
        if (parent.relType == "CUSTOMER") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOMER"), "Y");

        }
    }
    else if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")) == "CUSTOMER") {
        if (parent.relType == "CUSTOMER") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_KERNEL"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOMER"), "Y");
        }
    }
    if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_TYPE")) == "C") {
        if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_ORIGIN")) == "KERNEL") {
            if (parent.relType == "KERNEL" || parent.relType == "CLUSTER" || parent.relType == "CUSTOM") {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_KERNEL"), "Y");
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CLUSTER"), "N");
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOM"), "N");
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOMER"), "N");
            }
            if (parent.relType == "CLUSTER" || parent.relType == "CUSTOM") {
                if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CLUSTER"), "Y");
                }
            }
            if (parent.relType == "CUSTOM") {
                if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOM"), "Y");
                }
            }
        }
        else if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_ORIGIN")) == "CLUSTER") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_KERNEL"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CLUSTER"), "Y");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOMER"), "N");
            if (parent.relType == "CUSTOM") {
                if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOM"), "Y");
                }
                else {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOM"), "N");
                }
            }
        }
        else if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_ORIGIN")) == "CUSTOM") {
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_KERNEL"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CLUSTER"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOMER"), "N");
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOM"), "Y");
        }

    }
    else {
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_KERNEL"), "N");
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CLUSTER"), "N");
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOM"), "N");
        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_MODIFIED_IN_CUSTOMER"), "N");
    }
    try {
        if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE")) == "") {

            if (document.getElementById("ACTION").value == "NEW") {
                if (func_type == "C" || func_type == "S") {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE"), "N");
                }
                else {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE"), "Y");
                }
            }
            else {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE"), "N");
            }
        }
    }
    catch (e) {
        null;
    }
    try {
        if (getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE")) == "") {
            if (document.getElementById("ACTION").value == "NEW") {
                if (func_type == "C" || func_type == "S") {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE"), "N");
                }
                else {
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE"), "Y");
                }
            }
            else {
                setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE"), "N");
            }
        }
    }
    catch (e) {
        null;
    }
    return dom;
}

function TemproaryToModifyActions(dom) {
    debug('In TemproaryToModifyActions');
    var blkFields = selectNodes(dom, "//RAD_BLK_FIELDS");
    for (var i = 0;i < blkFields.length;i++) {
        if (selectSingleNode(blkFields[i], 'AMENDABLE_IN') != null) {
            setNodeText(selectSingleNode(blkFields[i], "AMENDABLE_IN"), (getNodeText(selectSingleNode(blkFields[i], "AMENDABLE_IN")).replace("VIEW", "QUERY")));
            setNodeText(selectSingleNode(blkFields[i], "AMENDABLE_IN"), (getNodeText(selectSingleNode(blkFields[i], "AMENDABLE_IN")).replace("UNLOCK", "MODIFY")));
        }

    }

    var Actions = selectNodes(dom, "//RAD_ACTIONS");
    var viewAction = selectNodes(dom, "//RAD_ACTION[@ID='VIEW']");
    var modifyAction = selectNodes(dom, "//RAD_ACTION[@ID='UNLOCK']");
    if (viewAction[0] != null) {
        viewAction[0].setAttribute("ID", "QUERY")
        setNodeText(selectSingleNode(viewAction[0], 'ACTION_CODE'), "QUERY");
    }
    if (modifyAction[0] != null) {
        modifyAction[0].setAttribute("ID", "MODIFY")
        setNodeText(selectSingleNode(modifyAction[0], 'ACTION_CODE'), "MODIFY");
    }

    var actionNodes = selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS/RAD_ACTION");
    for (var actN = 0;actN < actionNodes.length;actN++) {
        if (selectSingleNode(actionNodes[actN], 'ACTION_STAGE_TYPE') == null) {
            var actStgElemnt = dom.createElement("ACTION_STAGE_TYPE");
            actionNodes[actN].appendChild(actStgElemnt);
        }
		 if (selectSingleNode(actionNodes[actN], 'FSREQ_CMT_ID') == null) {
            var actStgElemnt = dom.createElement("FSREQ_CMT_ID");
            actionNodes[actN].appendChild(actStgElemnt);
        }
		if (selectSingleNode(actionNodes[actN], 'IOREQ_CMT_ID') == null) {
            var actStgElemnt = dom.createElement("IOREQ_CMT_ID");
            actionNodes[actN].appendChild(actStgElemnt);
        }
		 if (selectSingleNode(actionNodes[actN], 'FSRES_CMT_ID') == null) {
            var actStgElemnt = dom.createElement("FSRES_CMT_ID");
            actionNodes[actN].appendChild(actStgElemnt);
        }if (selectSingleNode(actionNodes[actN], 'PKRES_CMT_ID') == null) {
            var actStgElemnt = dom.createElement("PKRES_CMT_ID");
            actionNodes[actN].appendChild(actStgElemnt);
        }
			  
    }
    //To Add NEW_ALLOWED_IN,DELETE_ALLOWED_IN && ALL_RECORDS to BLOCKS
    var blks = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var j = 0;j < blks.length;j++) {
        var blkName = getNodeText(selectSingleNode(blks[j], 'BLOCK_NAME'));
        var block = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']");
        if (selectSingleNode(block[0], 'ROWS_PER_PAGE') == null) {
            var allwElmt = dom.createElement("ROWS_PER_PAGE");
            block[0].insertBefore(allwElmt, selectSingleNode(block[0], 'BLOCK_TYPE'));
        }
        if (selectSingleNode(block[0], "NEW_ALLOWED_IN") == null) {
            var allwElmt = dom.createElement("NEW_ALLOWED_IN");
            block[0].insertBefore(allwElmt, selectSingleNode(block[0], "BLOCK_TITLE"));
            if (getNodeText(selectSingleNode(block[0], "MULTI_RECORD")) == "Y") {
                setNodeText(selectSingleNode(block[0], "NEW_ALLOWED_IN"), "MODIFY")
            }
        }
        if (selectSingleNode(block[0], "DELETE_ALLOWED_IN") == null) {
            var allwElmt = dom.createElement("DELETE_ALLOWED_IN");
            block[0].insertBefore(allwElmt, selectSingleNode(block[0], "BLOCK_TITLE"));
            if (getNodeText(selectSingleNode(block[0], "MULTI_RECORD")) == "Y") {
                setNodeText(selectSingleNode(block[0], "DELETE_ALLOWED_IN"), "MODIFY");
            }
        }
        if (selectSingleNode(block[0], "ALL_RECORDS") == null) {
            var allwElmt = dom.createElement("ALL_RECORDS");
            block[0].insertBefore(allwElmt, selectSingleNode(block[0], "BLOCK_TITLE"));
            if (getNodeText(selectSingleNode(block[0], "MULTI_RECORD")) == "Y") {
                setNodeText(selectSingleNode(block[0], "ALL_RECORDS"), "MODIFY");
            }
        }
        if (selectSingleNode(block[0], "MANDATORY_IN") == null) {
            var allwElmt = dom.createElement("MANDATORY_IN");
            block[0].insertBefore(allwElmt, selectSingleNode(block[0], "BLOCK_TITLE"));

            if (getNodeText(selectSingleNode(block[0], "MULTI_RECORD")) == "Y") {
                setNodeText(selectSingleNode(block[0], "MANDATORY_IN"), "MODIFY");

            }
        }
    }

    //To Add AMENDABLE_IN to BLOCK_FIELDS
    var blkflds = selectNodes(dom, "//RAD_DATA_BLOCKS/RAD_BLK_FIELDS");
    for (var k = 0;k < blkflds.length;k++) {
        if (selectSingleNode(blkflds[k], "AMENDABLE_IN") == null) {
            var amndElmt = dom.createElement("AMENDABLE_IN");
            blkflds[k].appendChild(amndElmt);
        }
        if (selectSingleNode(blkflds[k], "RELATED_BLOCK") == null) {
            var amndElmt = dom.createElement("RELATED_BLOCK");
            blkflds[k].appendChild(amndElmt);
        }
        if (selectSingleNode(blkflds[k], "NOT_REQD_IN_XSD") == null) {
            var ntRqdXsd = dom.createElement("NOT_REQD_IN_XSD");
            blkflds[k].appendChild(ntRqdXsd);
            setNodeText(selectSingleNode(blkflds[k], "NOT_REQD_IN_XSD"), "Y")

        }
        if (selectSingleNode(blkflds[k], "LOV_VAL_REQ") == null) {
            var LovValRqd = dom.createElement("LOV_VAL_REQ");
            blkflds[k].appendChild(LovValRqd);
            setNodeText(selectSingleNode(blkflds[k], "LOV_VAL_REQ"), "Y")
        }
        if (selectSingleNode(blkflds[k], "PREVIEW_VALUE") == null) {
            var prevVal = dom.createElement("PREVIEW_VALUE");
            blkflds[k].appendChild(prevVal);
        }
        if (selectSingleNode(blkflds[k], "MASK_ID") == null) {
            var prevVal = dom.createElement("MASK_ID");
            blkflds[k].appendChild(prevVal);
        }
        if (selectSingleNode(blkflds[k], ("REPORT_PARAMETER")) == null) {
            var prevVal = dom.createElement("REPORT_PARAMETER");
            blkflds[k].appendChild(prevVal);
            setNodeText(selectSingleNode(blkflds[k], ("REPORT_PARAMETER")), "N");
        }
    }
    //To add FIELD_NAME node to cloumns
    var clms = selectNodes(dom, "//RAD_DATASOURCES/RAD_FIELDS");
    for (var n = 0;n < clms.length;n++) {
        if (selectSingleNode(clms[n], "FIELD_NAME") == null) {
            var fldName = dom.createElement("FIELD_NAME");
            clms[n].appendChild(fldName);
        }
    }
    //To update Release Type and ReleaseName 
    var relType = selectNodes(dom, "//RELEASE_TYPE[not(text())]");
    for (var m = 0;m < relType.length;m++) {
        setNodeText(relType[m], parent.relType);
    }

    var relName = selectNodes(dom, "//RELEASE_NAME[not(text())]");
    for (var n = 0;n < relName.length;n++) {
        setNodeText(relName[n], "BASE_RELEASE");
    }

    //To Add Release Name and Release Type to Call Forms
    var scrns = selectNodes(dom, "//RAD_SCREENS");
    for (var m = 0;m < scrns.length;m++) {
        var scrnName = getNodeText(selectSingleNode(scrns[m], "SCREEN_NAME"));
        var tabs = selectNodes(dom, "//RAD_SCREENS[SCREEN_NAME = '" + scrnName + "']/BODY/RAD_TABS");
        for (var n = 0;n < tabs.length;n++) {
            var tabName = getNodeText(selectSingleNode(tabs[n], "TAB_NAME"));

            if (selectSingleNode(tabs[n], "TAB_TYPE") == null) {
                var tabType = dom.createElement("TAB_TYPE");
                tabs[n].appendChild(tabType);
                setNodeText(selectSingleNode(tabs[n], "TAB_TYPE"), "DATA");
            }
        }
    }

    return dom;
}

function fnSetLovDetailsID(NewDOM) {
    debug('In fnSetLovDetailsID');
    var radLovs = selectNodes(NewDOM, "//RAD_LOVS[RAD_LOV_DETAILS[not(@ID)]]");
    for (var m = 0;m < radLovs.length;m++) {
        var radLovDetails = selectNodes(radLovs[m], "RAD_LOV_DETAILS");
        for (var n = 0;n < radLovDetails.length;n++) {
            var id = getNodeText(selectSingleNode(radLovDetails[n], "QUERY_COLS"));
            radLovDetails[n].setAttribute("ID", id);
        }
    }
    return NewDOM;
}

function fnSetCallFrmID(NewDOM) {
    debug('In fnSetCallFrmID');
    var calfrms = selectNodes(NewDOM, "//RAD_CALLFORM");
    for (var j = 0;j < calfrms.length;j++) {
        if (calfrms[j].getAttribute("ID") == null) {
            var clfrmID = getNodeText(selectSingleNode(calfrms[j], "CALLFORM_FUCNTIONID"));
            calfrms[j].setAttribute("ID", clfrmID);
        }
    }
    var summry = selectNodes(NewDOM, "//RAD_SUMMARY");
    for (var i = 0;i < summry.length;i++) {
        if (summry[i].getAttribute("ID") == null) {
            var summryID = "SUMMARY";
            summry[i].setAttribute("ID", summryID);
        }
    }
    return NewDOM;
}

function fnCallFrmArgs(val, callorlaunch) {

    var tmp = 0;
    var rowindex = 0;
    var scrArg = "";
    var tabObj = document.getElementById(callorlaunch);
    if (callorlaunch != "TAB") {
        for (var i = 0;i < tabObj.tBodies[0].rows.length;i++) {
            if (tabObj.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                tmp = tmp + 1;
                rowindex = i;
            }
        }
        if (tmp > 1) {
            i = 0;
            if (callorlaunch == 'CALFRMS') {
                alertMessage("Select only one Call form", "I");
            }
            else if (callorlaunch == 'lfmform') {
                alertMessage("Select only one Launch form", "I");
            }

            return false;
        }
        else if (tmp == 0) {
            if (callorlaunch == 'CALFRMS') {
                alertMessage("No Call form selected", "I");
            }
            else if (callorlaunch == 'lfmform') {
                alertMessage("No Launch form selected", "I");
            }

            return false;
        }
    }
    else if (callorlaunch == "TAB") {
        if (document.getElementById("TAB_TYPE_TABS").value != "SERVICE") {
            alertMessage("Tab type should be service", "E");
            return false;
        }
    }
    if (callorlaunch == 'lfmform') {
        var calFrmName = tabObj.tBodies[0].rows[rowindex].cells[1].getElementsByTagName("INPUT")[0].value;
        var calFrmArgs = tabObj.tBodies[0].rows[rowindex].cells[5].getElementsByTagName("INPUT")[0].value;
    }
    else if (callorlaunch == 'TAB') {
        var dpndtFlds = document.getElementsByName("DEPENDENT_ON")[0].value;
    }
    else if (callorlaunch == 'CALFRMS') {
        var calFrmName = tabObj.tBodies[0].rows[rowindex].cells[1].getElementsByTagName("INPUT")[0].value;
        var calFrmArgs = tabObj.tBodies[0].rows[rowindex].cells[11].getElementsByTagName("INPUT")[0].value;
        var dpndtFlds = tabObj.tBodies[0].rows[rowindex].cells[12].getElementsByTagName("INPUT")[0].value;
    }
    calFrmName = calFrmName;
    lcfrm = callorlaunch;
    ctrlrwIndx = rowindex;
    if (val == 'ScrArgs') {
        if (calFrmArgs == "") {
            scrArg = getCallFormScrArg(calFrmName, parent.jndiName);
        }
        else {
            scrArg = "";
        }
        calFrmArgs = calFrmArgs;
        if (scrArg == "null") {
            scrArg = "";
        }
        else {
            scrArg = scrArg;
        }
        parentcalFrmArgs = calFrmArgs;
        parentscrArg = scrArg;
        parentcalFrmName = calFrmName;
        parentlcfrm = lcfrm;
        loadSubScreenDIV("ChildWin", "RadCallFrmArgs.jsp");

    }
    else if (val == 'DpndtFlds') {
        parentlcfrm = callorlaunch;
        if (callorlaunch == 'CALFRMS') {
            parentcalFrmArgs = dpndtFlds;
            loadSubScreenDIV("ChildWin", "RadDependentFields.jsp");

        }
        else {
            parentcalFrmArgs = dpndtFlds;

            loadSubScreenDIV("ChildWin", "RadDependentFields.jsp");

        }

    }
}

function fn_Reset_BlkFld_FldSets(dom) {
    debug('In fn_Reset_BlkFld_FldSets');
    var blkFields = selectNodes(dom, "//RAD_BLK_FIELDS");
    for (var i = 0;i < blkFields.length;i++) {
        if (selectSingleNode(blkFields[i], "FIELDSET_NAME") != null) {
            setNodeText(selectSingleNode(blkFields[i], "FIELDSET_NAME"), "");
        }
    }
    var fldSets = selectNodes(dom, "//RAD_FIELDSETS");
    for (var j = 0;j < fldSets.length;j++) {
        var fldsetName = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_NAME"));
        var fldsetBlk = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_BLOCK"));
        var fldsetflds = selectNodes(fldSets[j], "FIELDSET_FIELDS");
		var fldsetVisible = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_VISIBLE"));
        for (var p = 0;p < fldsetflds.length;p++) {
            if (getNodeText(selectSingleNode(fldsetflds[p], "ACTIVE")) == 'Y') {

                var fldname = getNodeText(selectSingleNode(fldsetflds[p], "FIELD_NAME"));
                if (selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + fldsetBlk + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "']")[0] != null && fldsetVisible=="Y") {
                    setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[BLOCK_NAME='" + fldsetBlk + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "']"))[0], "FIELDSET_NAME"), fldsetName);
                }
				else  if (selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + fldsetBlk + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "']")[0] != null){
				    setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[BLOCK_NAME='" + fldsetBlk + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "']"))[0], "FIELDSET_NAME"), "");
               }
            }
        }
    }
    return dom;
}

function Fn_Vldt_MltpSec() {
    var fldSets = selectNodes(dom, "//RAD_FIELDSETS");
    var err_msg = "";
    for (var j = 0;j < fldSets.length;j++) {
        var fldsetName = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_NAME"));
        var fldsetBlk = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_BLOCK"));
        var fldst_Mltrcd = getNodeText(selectSingleNode(fldSets[j], "MULTI_RECORD"));
        var fldst_Scnr = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_SCREEN"));
        var fldst_Prtn = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_PORTION"));
        var fldst_Tab = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_TAB"));
        var fldst_Sectn = getNodeText(selectSingleNode(fldSets[j], "FIELDSET_SECTION"));
        try {
            if (fldst_Mltrcd == "N") {
                if (getNodeText(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + fldst_Scnr + "']/" + fldst_Prtn + "/RAD_TABS[@ID='" + fldst_Tab + "']/RAD_SECTIONS[@ID='" + fldst_Sectn + "']/MULTIPLE_SEC")) == "Y") {
                    err_msg += fldsetName + " ";
                }
            }
        }
        catch (e) {
        }
    }
    if (err_msg != "")
        err_msg = "Multiple Sections to be Removed in Single Entry Fieldsets : " + err_msg;
    return err_msg;
}

function fn_Reset_DsrFldBlocks(dom) {
    debug('In fn_Reset_DsrFldBlocks');
    var dsr = selectNodes(dom, "//RAD_DATASOURCES");
    var fieldFoundFlag = false;
    for (var eachDsr = 0;eachDsr < dsr.length;eachDsr++) {
        var dsrName = getNodeText(selectSingleNode(dsr[eachDsr], "DATASRC_NAME"));
        var dsrFields = selectNodes(dsr[eachDsr], "//RAD_DATASOURCES[DATASRC_NAME='" + dsrName + "']/RAD_FIELDS");
        for (var eachFld = 0;eachFld < dsrFields.length;eachFld++) {
            fieldFoundFlag = false;
            var fldName = getNodeText(selectSingleNode(dsrFields[eachFld], "COLUMN_NAME"));
            if (getNodeText(selectSingleNode(dsrFields[eachFld], "BLOCK_NAME")) == "" || getNodeText(selectSingleNode(dsrFields[eachFld], "FIELD_NAME")) == "") {
                var blkFld = selectSingleNode(dom, "//RAD_BLK_FIELDS[DBT='" + dsrName + "' and DBC='" + fldName + "']");
                if (blkFld != null) {
                    setNodeText(selectSingleNode(dsrFields[eachFld], "BLOCK_NAME"), getNodeText(selectSingleNode(blkFld.parentNode, "BLOCK_NAME")));
                    setNodeText(selectSingleNode(dsrFields[eachFld], "FIELD_NAME"), getNodeText(selectSingleNode(blkFld, "FIELD_NAME")));
                    fieldFoundFlag = true;

                }
				else{
				 setNodeText(selectSingleNode(dsrFields[eachFld],"BLOCK_NAME"),"");
				  setNodeText(selectSingleNode(dsrFields[eachFld],"FIELD_NAME"),"");
				
				}
            }
        }
    }
    return dom;
}

function getCallFormScrArg(calFrmName, Datscr) {
    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R014" + parent.gBodySeparator + calFrmName, "RADClientHandler");
    response = getXMLString(response);
    var ScrArgs = response.substring(response.indexOf("<SCRARG>") + 8, response.indexOf("</SCRARG>"));
    return ScrArgs;
}

function fn_basic_valids(dom) {
    var dtScrs = selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATASOURCES");
    var count = 0;
    var errMsg = "";
    var mstrYN = "";
    for (var i = 0;i < dtScrs.length;i++) {
        var dtScrName = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATASOURCES"))[i], "DATASRC_NAME"));
        mstrYN = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dtScrName + "']"))[0], "MASTER_DATASRC"));

        if (mstrYN == "Y") {
            count = count + 1;
        }

    }
    if (count == "0") {
        errMsg = " Master DataSource Not Selected~";
    }
    else if (count > 1) {
        errMsg += " Only One Data Source Allowed As Master DataSource~";
    }
    var scrns = selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SCREENS");
    count = 0;
    var funCtgry = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
    if (funCtgry == "MAINTENANCE" || funCtgry == "TRANSACTION" || scrns.length > 0) {
        for (var j = 0;j < scrns.length;j++) {
            var ScrName = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SCREENS"))[j], "SCREEN_NAME"));

            mstrYN = getNodeText(selectSingleNode(selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + ScrName + "']")[0], "MAIN_SCREEN"));
            if (mstrYN == "Y") {
                count = count + 1;
            }
        }
        if (count == "0") {
            errMsg += "\n Main Screen Not Selected~";
        }
        else if (count > 1) {
            errMsg += "\n Only One Screen Allowed As Main Screen~";
        }
    }
    var blks = selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATA_BLOCKS");
    count = 0;
    for (var k = 0;k < blks.length;k++) {
        var blkName = getNodeText(selectSingleNode(selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATA_BLOCKS")[k], "BLOCK_NAME"));
        mstrYN = getNodeText(selectSingleNode(selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']")[0], "MASTER_BLOCK"));
        if (mstrYN == "Y") {
            count = count + 1;
        }
    }
    if (count == "0") {
        errMsg += "\n Master Block Not Selected~";
    }
    else if (count > 1) {
        errMsg += "\n Only One Block Allowed As Master Block~";
    }
    try {
        // Validation for Xsd Count.
        var xsdcount = fnValidateXSDCount();
        if (xsdcount >= 1) {
            errMsg += "\n XSD Name Already Used~";
        }
    }
    catch (e) {
    }
    try {
        // Validation for Multiple Section.
        errMsg = Fn_Vldt_MltpSec();
    }
    catch (e) {
    }

    if (errMsg == "") {
        return 1;
    }
    else {
        return errMsg;
    }
}

function fnValidateXSDCount() {
    var RadActions = selectNodes(dom, "//RAD_KERNEL//RAD_ACTIONS/RAD_ACTION");
    var Xsd_names = "";
    var funC_ID = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID"));

    var Module = getNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MODULE_ID")));
    if (Module == "")
        Module = funC_ID.substring(0, 1);
    for (var actN = 0;actN < RadActions.length;actN++) {
        var nodevalue = getNodeText(selectSingleNode(RadActions[actN], "OPERATION_CODE"));
        if (nodevalue != "") {
            Xsd_names += "'" + Module + "-" + nodevalue + "-Req-Full-MSG.xsd',";
            Xsd_names += "'" + Module + "-" + nodevalue + "-Req-IO-MSG.xsd',";
            Xsd_names += "'" + Module + "-" + nodevalue + "-Res-Full-MSG.xsd',";
            Xsd_names += "'" + Module + "-" + nodevalue + "-Res-PK-MSG.xsd',";
        }
    }
    var Type_xsd = getNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS/RAD_XSD_TYPE_NAME")));
    Xsd_names = Xsd_names + "'" + Module + "-" + Type_xsd + "-Types.xsd',''";

 var XsdNameQuery = "XSDNAMEQUERY"; 
var WhereString = "WHERE FUNCTION_ID NOT IN ('"+funC_ID+"')  AND XSD_NAME IN ( " + Xsd_names + " )";
    try {
        parent.parent.gReqType = "APP";
        parent.parent.gReqCode = parent.parent.gAction;
        var radReqDOM = parent.parent.buildRADXml();
        var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
        var tempNode = radReqDOM.createElement("QUERY");
        bodyNode.appendChild(tempNode);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), XsdNameQuery);
		setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    }
    catch (e) {
    }

    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    return multRec[0];
}

function fnAllowUIChangeOnly_ScrnCstm() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML;
    var nodeBlkContent = "";
    var nodeScrContent = "";
    var nodeFldContent = "";
    var nodeDsnContent = "";
    var nodeLovContent = "";
    var nodeSumContent = "";
    var nodeActContent = "";
    var nodeCfmContent = "";
    var nodeLfmContent = "";
    var nodeMndContent = "";

    nodeBlkContent = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    nodeScrContent = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    nodeFldContent = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    nodeMndContent += "<li id=\"li_MND\" noDrag=\"true\" style=\"visibility:hidden\">";
    nodeMndContent += "<a   id='MND' class='parentNode' name=\"MND\" style=\"visibility:hidden\">Preferences</a>";
    nodeDsnContent += "<li id=\"li_DSN\" noDrag=\"true\" style=\"visibility:hidden\">";
    nodeDsnContent += "<a   id='DSN' class='parentNode' name=\"DSN\" style=\"visibility:hidden\">DataSource</a>";
    nodeLovContent += "<li id=\"li_LOV\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeLovContent += "<a  id='LOV' class='parentNode' name=\"LOV\" style=\"visibility:hidden\" >ListOfValues</a>";
    nodeActContent += "<li id=\"li_ACT\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeActContent += "<a  id='ACT' class='parentNode' name=\"ACT\" style=\"visibility:hidden\">Actions</a>";
    nodeCfmContent += "<li id=\"li_CFM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeCfmContent += "<a  id='CFM' class='parentNode' name=\"CFM\" style=\"visibility:hidden\" >CallForms</a>";
    nodeLfmContent += "<li id=\"li_LFM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeLfmContent += "<a  id='LFM' class='parentNode' name=\"LFM\" style=\"visibility:hidden\" >LaunchForms</a>";
    nodeSumContent += "<li id=\"li_SUM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeSumContent += "<a  id='SUM' class='parentNode' name=\"SUM\" style=\"visibility:hidden\">Summary</a>";

    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeMndContent);
    var blkFldHTML = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    preInnerHtml = preInnerHtml.replace(blkFldHTML, nodeDsnContent);
    var blkLovHTML = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    preInnerHtml = preInnerHtml.replace(blkLovHTML, nodeLovContent);
    var blkActHTML = getOuterHTML_TXADisp(document.getElementById("li_ACT"));
    preInnerHtml = preInnerHtml.replace(blkActHTML, nodeActContent);
    var blkCfmHTML = getOuterHTML_TXADisp(document.getElementById("li_CFM"));
    preInnerHtml = preInnerHtml.replace(blkCfmHTML, nodeCfmContent);
    var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_LFM"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeLfmContent);
    var blkSumHTML = getOuterHTML_TXADisp(document.getElementById("li_SUM"));
    preInnerHtml = preInnerHtml.replace(blkSumHTML, nodeSumContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_MND"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeBlkContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_DSN"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeScrContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeFldContent);
    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();
    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}

function fnAllowUIChangeOnly() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML;
    var nodeBlkContent = "";
    var nodeScrContent = "";
    var nodeFldContent = "";
    var nodeDsnContent = "";
    var nodeLovContent = "";
    var nodeSumContent = "";
    var nodeActContent = "";
    var nodeCfmContent = "";
    var nodeLfmContent = "";
    var nodeMndContent = "";

    nodeBlkContent = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    nodeScrContent = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    nodeFldContent = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    nodeActContent = getOuterHTML_TXADisp(document.getElementById("li_ACT"));
    nodeMndContent += "<li id=\"li_MND\" noDrag=\"true\" style=\"visibility:hidden\">";
    nodeMndContent += "<a   id='MND' class='parentNode' name=\"MND\" style=\"visibility:hidden\">Preferences</a>";
    nodeDsnContent += "<li id=\"li_DSN\" noDrag=\"true\" style=\"visibility:hidden\">";
    nodeDsnContent += "<a   id='DSN' class='parentNode' name=\"DSN\" style=\"visibility:hidden\">DataSource</a>";
    nodeLovContent += "<li id=\"li_LOV\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeLovContent += "<a  id='LOV' class='parentNode' name=\"LOV\" style=\"visibility:hidden\" >ListOfValues</a>";
    nodeCfmContent += "<li id=\"li_CFM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeCfmContent += "<a  id='CFM' class='parentNode' name=\"CFM\" style=\"visibility:hidden\" >CallForms</a>";
    nodeLfmContent += "<li id=\"li_LFM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeLfmContent += "<a  id='LFM' class='parentNode' name=\"LFM\" style=\"visibility:hidden\" >LaunchForms</a>";
    nodeSumContent += "<li id=\"li_SUM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeSumContent += "<a  id='SUM' class='parentNode' name=\"SUM\" style=\"visibility:hidden\">Summary</a>";

    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeMndContent);
    var blkFldHTML = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    preInnerHtml = preInnerHtml.replace(blkFldHTML, nodeDsnContent);
    var blkLovHTML = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    preInnerHtml = preInnerHtml.replace(blkLovHTML, nodeLovContent);
    var blkActHTML = getOuterHTML_TXADisp(document.getElementById("li_ACT"));
    preInnerHtml = preInnerHtml.replace(blkActHTML, nodeMndContent);
    var blkCfmHTML = getOuterHTML_TXADisp(document.getElementById("li_CFM"));
    preInnerHtml = preInnerHtml.replace(blkCfmHTML, nodeCfmContent);
    var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_LFM"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeLfmContent);
    var blkSumHTML = getOuterHTML_TXADisp(document.getElementById("li_SUM"));
    preInnerHtml = preInnerHtml.replace(blkSumHTML, nodeSumContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_MND"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeBlkContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_DSN"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeScrContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeFldContent);
    preInnerHtml = preInnerHtml.replace(nodeMndContent, nodeActContent);
    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();
    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}

function fnAllowUIChangeOnlyDashboard() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML;
    var nodeBlkContent = "";
    var nodeScrContent = "";
    var nodeFldContent = "";
    var nodeDsnContent = "";
    var nodeLovContent = "";
    var nodeSumContent = "";
    var nodeActContent = "";
    var nodeCfmContent = "";
    var nodeLfmContent = "";
    var nodeMndContent = "";
    var nodeLov1Content = "";
    nodeMndContent = getOuterHTML_TXADisp(document.getElementById("li_MND"));
    nodeDsnContent = getOuterHTML_TXADisp(document.getElementById("li_DSN"));
    nodeBlkContent = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    nodeSumContent = getOuterHTML_TXADisp(document.getElementById("li_SUM"));
    nodeLovContent = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    nodeScrContent = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    nodeFldContent = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    nodeLov1Content += "<li id=\"li_LOV\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeLov1Content += "<a  id='LOV' class='parentNode' name=\"LOV\" style=\"visibility:hidden\" >ListOfValues</a>";
    nodeActContent += "<li id=\"li_ACT\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeActContent += "<a  id='ACT' class='parentNode' name=\"ACT\" style=\"visibility:hidden\">Actions</a>";
    nodeCfmContent += "<li id=\"li_CFM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeCfmContent += "<a  id='CFM' class='parentNode' name=\"CFM\" style=\"visibility:hidden\" >CallForms</a>";
    nodeLfmContent += "<li id=\"li_LFM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeLfmContent += "<a  id='LFM' class='parentNode' name=\"LFM\" style=\"visibility:hidden\" >LaunchForms</a>";

    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_MND"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeMndContent);
    var blkDSNHTML = getOuterHTML_TXADisp(document.getElementById("li_DSN"));
    preInnerHtml = preInnerHtml.replace(blkDSNHTML, nodeDsnContent);
    var blkBLKHTML = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    preInnerHtml = preInnerHtml.replace(blkBLKHTML, nodeLovContent);
    var blkLOVHTML = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    preInnerHtml = preInnerHtml.replace(blkLOVHTML, nodeBlkContent);
    var blkSCRHTML = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    preInnerHtml = preInnerHtml.replace(blkSCRHTML, nodeLovContent);
    var blkLOVHTML = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    preInnerHtml = preInnerHtml.replace(blkLOVHTML, nodeScrContent);
    var blkFLDHTML = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    preInnerHtml = preInnerHtml.replace(blkFLDHTML, nodeLovContent);
    var blkLOVHTML = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    preInnerHtml = preInnerHtml.replace(blkLOVHTML, nodeFldContent);
    var blkSUMHTML = getOuterHTML_TXADisp(document.getElementById("li_SUM"));
    preInnerHtml = preInnerHtml.replace(blkSUMHTML, nodeLovContent);
    var blkLOVHTML = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    preInnerHtml = preInnerHtml.replace(blkLOVHTML, nodeSumContent);
    var blkLOV1HTML = getOuterHTML_TXADisp(document.getElementById("li_LOV"));
    preInnerHtml = preInnerHtml.replace(blkLOV1HTML, nodeLov1Content);
    var blkActHTML = getOuterHTML_TXADisp(document.getElementById("li_ACT"));
    preInnerHtml = preInnerHtml.replace(blkActHTML, nodeActContent);
    var blkCfmHTML = getOuterHTML_TXADisp(document.getElementById("li_CFM"));
    preInnerHtml = preInnerHtml.replace(blkCfmHTML, nodeCfmContent);
    var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_LFM"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeLfmContent);
    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();
    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}

function fnShowTree() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML;
    var nodeBlkContent = "";
    var nodeScrContent = "";
    var nodeFldContent = "";
    var nodeDsnContent = "";
    var nodeLovContent = "";
    var nodeSumContent = "";
    var nodeActContent = "";
    var nodeCfmContent = "";
    var nodeLfmContent = "";
    var nodeMndContent = "";

    preInnerHtml = "<ul id=\"ulTreeMenu\" class='TreeView'>";
    preInnerHtml += "<li id=\"li_MND\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('MND')\" class=\"parentNode\" id='TMND' name='TMND' >Preferences</a><ul id ='ULMND' class='Fields' name='details'></ul></li>";
    preInnerHtml += "<li id=\"li_DSN\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('DSN')\" class=\"parentNode\" id=TDSN' name='TDSN' oncontextmenu=\"createMenu('DSN',event);\">DataSource</a><ul id ='ULDSN' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_LOV\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('LOV')\" class=\"parentNode\" id='TLOV' name='TLOV' oncontextmenu=\"createMenu('LOV',event);\">ListOfValues</a><ul id ='ULLOV' class='Fields' name='details'></ul></li>";
    preInnerHtml += "<li id=\"li_BLK\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('BLK')\" class=\"parentNode\" id='TBLK' name='TBLK' oncontextmenu=\"createMenu('BLK',event);\">DataBlocks</a><ul id ='ULBLK' class='Fields' name='details'></ul></li>";
    preInnerHtml += "<li id=\"li_SCR\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('SCR')\" class=\"parentNode\" id='TSCR' name='TSCR' oncontextmenu=\"createMenu('SCR',event);\">Screens</a><ul id ='ULSCR' class='Fields' name='details' ></ul></li>";
    preInnerHtml += "<li id=\"li_FLD\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('FLD')\" class=\"parentNode\" id='TFLD' name='TFLD' oncontextmenu=\"createMenu('FLD',event);\">FieldSets</a><ul id ='ULFLD' class='Fields' name='details' ></ul></li>";
    //preInnerHtml += "<li id=\"li_ACT\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('ACT')\" class=\"parentNode\" id='TACT' name='TACT'>Actions</a><ul id ='Actions' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_CFM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('CFM')\" class=\"parentNode\" id='TCFM' name='TCFM'>CallForms</a><ul id ='Callforms' class='Fields' name='details' ></ul></li>";
    preInnerHtml += "<li id=\"li_LFM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('LFM')\" class=\"parentNode\" id='TLFM' name='TLFM'>LaunchForms</a><ul id ='LaunchForms' class='Fields' name='details' ></ul></li>";
    preInnerHtml += "<li id=\"li_SUM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('SUM')\" class=\"parentNode\" id='TSUM' name='TSUM' oncontextmenu=\"createMenu('SUM',event)\">Summary</a><ul id ='ULSUM' class='Fields' name='details'></ul></li></ul>";

    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();

    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}

function fnShowTree_Master() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML;
    var nodeBlkContent = "";
    var nodeScrContent = "";
    var nodeFldContent = "";
    var nodeDsnContent = "";
    var nodeLovContent = "";
    var nodeSumContent = "";
    var nodeActContent = "";
    var nodeCfmContent = "";
    var nodeLfmContent = "";
    var nodeMndContent = "";

    preInnerHtml = "<ul id=\"ulTreeMenu\" class='TreeView'>";
    preInnerHtml += "<li id=\"li_MND\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('MND')\" class=\"parentNode\" id='TMND' name='TMND' >Preferences</a><ul id ='ULMND' class='Fields' name='details'></ul></li>";
  //  preInnerHtml += "<li id=\"li_DSN\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('DSN')\" class=\"parentNode\" id=TDSN' name='TDSN' oncontextmenu=\"createMenu('DSN',event);\">DataSource</a><ul id ='ULDSN' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_LOV\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('LOV')\" class=\"parentNode\" id='TLOV' name='TLOV' oncontextmenu=\"createMenu('LOV',event);\">ListOfValues</a><ul id ='ULLOV' class='Fields' name='details'></ul></li>";
   // preInnerHtml += "<li id=\"li_BLK\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('BLK')\" class=\"parentNode\" id='TBLK' name='TBLK' oncontextmenu=\"createMenu('BLK',event);\">DataBlocks</a><ul id ='ULBLK' class='Fields' name='details'></ul></li>";
    preInnerHtml += "<li id=\"li_SCR\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('SCR')\" class=\"parentNode\" id='TSCR' name='TSCR' oncontextmenu=\"createMenu('SCR',event);\">Screens</a><ul id ='ULSCR' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_FLD\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('FLD')\" class=\"parentNode\" id='TFLD' name='TFLD' oncontextmenu=\"createMenu('FLD',event);\">FieldSets</a><ul id ='ULFLD' class='Fields' name='details' ></ul></li>";
    //preInnerHtml += "<li id=\"li_ACT\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('ACT')\" class=\"parentNode\" id='TACT' name='TACT'>Actions</a><ul id ='Actions' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_CFM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('CFM')\" class=\"parentNode\" id='TCFM' name='TCFM'>CallForms</a><ul id ='Callforms' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_LFM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('LFM')\" class=\"parentNode\" id='TLFM' name='TLFM'>LaunchForms</a><ul id ='LaunchForms' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_SUM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('SUM')\" class=\"parentNode\" id='TSUM' name='TSUM' oncontextmenu=\"createMenu('SUM',event)\">Summary</a><ul id ='ULSUM' class='Fields' name='details'></ul></li></ul>";

    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();

    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}



function fnAllowUI_MasterOnly() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML; 
    var nodeScrContent = ""; 
    var nodeMndContent = "";
	var nodeLfmContent = ""; 

    nodeMndContent = getOuterHTML_TXADisp(document.getElementById("li_MND"));
    nodeScrContent = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
	nodeLfmContent += "<li id=\"li_LFM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeLfmContent += "<a  id='LFM' class='parentNode' name=\"LFM\" style=\"visibility:hidden\" >LaunchForms</a>";
	
	
	var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_MND"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeMndContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeLfmContent);
   var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeLfmContent);
   var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_LFM"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeLfmContent);
    var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_SUM"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeLfmContent);
	 var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeLfmContent); 
	 var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_DSN"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeScrContent);
   
    
    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();
    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}


function fnShowTree_SubSystem() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML;
    var nodeBlkContent = "";
    var nodeScrContent = "";
    var nodeFldContent = "";
    var nodeDsnContent = "";
    var nodeLovContent = "";
    var nodeSumContent = "";
    var nodeActContent = "";
    var nodeCfmContent = "";
    var nodeLfmContent = "";
    var nodeMndContent = "";

    preInnerHtml = "<ul id=\"ulTreeMenu\" class='TreeView'>";
    preInnerHtml += "<li id=\"li_MND\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('MND')\" class=\"parentNode\" id='TMND' name='TMND' >Preferences</a><ul id ='ULMND' class='Fields' name='details'></ul></li>";
  //  preInnerHtml += "<li id=\"li_DSN\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('DSN')\" class=\"parentNode\" id=TDSN' name='TDSN' oncontextmenu=\"createMenu('DSN',event);\">DataSource</a><ul id ='ULDSN' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_LOV\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('LOV')\" class=\"parentNode\" id='TLOV' name='TLOV' oncontextmenu=\"createMenu('LOV',event);\">ListOfValues</a><ul id ='ULLOV' class='Fields' name='details'></ul></li>";
    preInnerHtml += "<li id=\"li_BLK\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('BLK')\" class=\"parentNode\" id='TBLK' name='TBLK' oncontextmenu=\"createMenu('BLK',event);\">DataBlocks</a><ul id ='ULBLK' class='Fields' name='details'></ul></li>";
    preInnerHtml += "<li id=\"li_SCR\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('SCR')\" class=\"parentNode\" id='TSCR' name='TSCR' oncontextmenu=\"createMenu('SCR',event);\">Screens</a><ul id ='ULSCR' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_FLD\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('FLD')\" class=\"parentNode\" id='TFLD' name='TFLD' oncontextmenu=\"createMenu('FLD',event);\">FieldSets</a><ul id ='ULFLD' class='Fields' name='details' ></ul></li>";
    //preInnerHtml += "<li id=\"li_ACT\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('ACT')\" class=\"parentNode\" id='TACT' name='TACT'>Actions</a><ul id ='Actions' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_CFM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('CFM')\" class=\"parentNode\" id='TCFM' name='TCFM'>CallForms</a><ul id ='Callforms' class='Fields' name='details' ></ul></li>";
    preInnerHtml += "<li id=\"li_LFM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('LFM')\" class=\"parentNode\" id='TLFM' name='TLFM'>LaunchForms</a><ul id ='LaunchForms' class='Fields' name='details' ></ul></li>";
   // preInnerHtml += "<li id=\"li_SUM\" noDrag=\"true\"><a href=\"javaScript:getNodeDetails('SUM')\" class=\"parentNode\" id='TSUM' name='TSUM' oncontextmenu=\"createMenu('SUM',event)\">Summary</a><ul id ='ULSUM' class='Fields' name='details'></ul></li></ul>";

    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();

    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}

function fnAllowUI_SubSystemOnly() {

    var divobject = document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML; 
    var nodeScrContent = ""; 
    var nodeMndContent = "";
	var nodeLfmContent = ""; 
	var nodeSumContent = "";

    nodeMndContent = getOuterHTML_TXADisp(document.getElementById("li_MND"));
	nodeBlkContent = getOuterHTML_TXADisp(document.getElementById("li_BLK"));    
    nodeScrContent = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
	nodeLfmContent = getOuterHTML_TXADisp(document.getElementById("li_LFM"));
	nodeSumContent += "<li id=\"li_SUM\" noChildren=\"true\" style=\"visibility:hidden\">";
    nodeSumContent += "<a  id='SUM' class='parentNode' name=\"SUM\" style=\"visibility:hidden\">Summary</a>";

	
	var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_MND"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeMndContent);
	var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_LFM"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeSumContent);   
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_SCR"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeLfmContent);
   var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_BLK"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeScrContent);
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_DSN"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeBlkContent); 
    var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_SUM"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeSumContent);
	 var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_FLD"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeSumContent);  
    var blkMNDHTML = getOuterHTML_TXADisp(document.getElementById("li_DSN"));
    preInnerHtml = preInnerHtml.replace(blkMNDHTML, nodeBlkContent);
	var blkLfmHTML = getOuterHTML_TXADisp(document.getElementById("li_SUM"));
    preInnerHtml = preInnerHtml.replace(blkLfmHTML, nodeLfmContent);
	
   
    
    divobject.innerHTML = preInnerHtml;
    paintTreeMenu();
    var enbTreeNds = "li_MND~MND~ULMND~li_DSN~DSN~ULDSN~li_LOV~LOV~ULLOV~li_ACT~ACT~ULACT~li_CFM~CFM~ULCFM~li_LFM~LFM~ULLFM~li_SUM~SUM~ULSUM";

}



function fnSetCheckBoxOnSave(dom) {
    setCustomCheckbox(dom, 'ACTION_STAGE_TYPE', 'Y~2', 'N~1');

}

function fnSetCheckBoxOnLoad(dom) {
    setCustomCheckbox(dom, 'ACTION_STAGE_TYPE', '2~Y', '1~N');
}

function fnFieldLocator() {

    var filed = selectSingleNode(dom, "//RAD_FIELDSETS[FIELDSET_BLOCK='" + clickedobjects[1] + "']/FIELDSET_FIELDS[@ID='" + clickedobjects[2] + "']");
    if (filed) {
        var scrName = getNodeText(selectSingleNode(filed.parentNode, "FIELDSET_SCREEN"));
        var fldLoc = "true"
        showPreview(scrName, fldLoc);
    }
}

function fnCollectGlobalLov(dom) {

    var gLOVList = "";
    var tmp = 0;
    var delNode = selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_GLOBAL_LOVS");
    for (var cnt = 0;cnt < delNode.length;cnt++) {
        delNode[cnt].parentNode.removeChild(delNode[cnt]);
    }
    var dtscrlen = selectNodes(dom, ("//RAD_LOVS")).length;
    var globalLovs = selectNodes(dom, "//RAD_BLK_FIELDS/LOV_NAME");
    for (cnt = 0;cnt < globalLovs.length;cnt++) {
        tmp = 0;
        if (getNodeText(globalLovs[cnt]) == "") {
        }

        else {
            for (var lv = 0;lv < dtscrlen;lv++) {
                if (getNodeText(globalLovs[cnt]) == getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_LOVS"))[lv], ("LOV_NAME")))) {
                    tmp = 1;
                    break;
                }
            }
            if (tmp == 0) {
                gLOVList += "'" + getNodeText(globalLovs[cnt]) + "',";
            }
        }

    }
    var globalLovs = selectNodes(dom, "//SUMMARY_DETAILS/LOV_NAME");
    for (cnt = 0;cnt < globalLovs.length;cnt++) {
        tmp = 0;
        if (getNodeText(globalLovs[cnt]) == "") {
        }

        else {
            for (var lv = 0;lv < dtscrlen;lv++) {
                if (getNodeText(globalLovs[cnt]) == getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_LOVS"))[lv], ("LOV_NAME")))) {
                    tmp = 1;
                    break;
                }
            }
            if (tmp == 0) {
                gLOVList += "'" + getNodeText(globalLovs[cnt]) + "',";
            }
        }

    }
    if (gLOVList == "") {
        return;
    }
    else {
        gLOVList = " WHERE LOV_ID IN (" + gLOVList.substring(0, gLOVList.length - 1) + ") AND FUNCTION_ID='COMMON'";
        parent.gReqCode = 'UICONTROLLER';
        parent.gReqType = "APP";
        var radReqDOM = parent.buildRADXml();
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R019" + parent.gBodySeparator + gLOVList, "RADClientHandler");

        var responseTextArr = response.split("<GLOV>");
        for (cnt = 0;cnt < responseTextArr.length;cnt++) {
            createglobalLovNode(responseTextArr[cnt]);
        }
    }

}

function createglobalLovNode(lovn) {

    var lovTag = "";
    lovTag += '<RAD_GLOBAL_LOVS ID="' + lovn.split("!")[0] + '" Type="MULTIPLE"><LOV_NAME>' + lovn.split("!")[0] + '</LOV_NAME>';
    lovTag += '<LOV_QUERY><![CDATA[' + lovn.split("!")[4] + ']]></LOV_QUERY>';

    var lovdetnode = lovn.split("!")[1].split("~");
    for (var lov = 0;lov < lovdetnode.length - 1;lov++) {
        lovTag += createglobalLovDetail(lovn, lov);
    }
    lovTag += '</RAD_GLOBAL_LOVS>';
    glblov = loadXMLDoc(lovTag);
    selectSingleNode(dom, "//RAD_KERNEL").appendChild(fnImportNode(dom, selectSingleNode(glblov, "RAD_GLOBAL_LOVS")));

}

function createglobalLovDetail(lovn, num) {
    var lovDetailTag = "";
    var lovfld = lovn.split("!");
    var LovId = lovfld[0];
    var LovFlds = lovfld[1];
    var Lovlbls = lovfld[2];
    var Lovredn = lovfld[3].substring(0, lovfld[3].length - 1);
    var Lovquery = lovfld[4];
    var LovVisible = lovfld[5];
    var LovDtype = lovfld[6];
    var redflag = "";

    if (Lovredn.indexOf(lovfld[1].split("~")[num]) ==  - 1) {
        redflag = "N";
    }
    else {
        redflag = "Y";
    }
    lovDetailTag += '<RAD_LOV_DETAILS ID="' + LovFlds.split("~")[num] + '"><QUERY_COLS>' + lovfld[1].split("~")[num] + '</QUERY_COLS><DATATYPE>' + LovDtype.split("~")[num] + '</DATATYPE>';
    lovDetailTag += '<VISIBLE>' + LovVisible.split("~")[num] + '</VISIBLE><REDN_FLD_TYPE></REDN_FLD_TYPE><COL_HEADING>' + Lovlbls.split("~")[num] + '</COL_HEADING>';
    lovDetailTag += '<REDN_FLD_FLAG>' + redflag + '</REDN_FLD_FLAG></RAD_LOV_DETAILS>';

    return lovDetailTag;
}

function fnCollectCallfrmData(dom) {

    var gcallformList = "";
    var callforms = selectNodes(dom, "//RAD_CALLFORM");
    for (cnt = 0;cnt < callforms.length;cnt++) {
        if (getNodeText(callforms[cnt]) == "") {
        }

        else {
            gcallformList += "'" + callforms[cnt].getAttribute("ID") + "',";
        }

    }
    if (gcallformList == "") {
        return;
    }
    else {
        gcallformList = " WHERE CALL_FORM IN (" + gcallformList.substring(0, gcallformList.length - 1) + ") AND A.CALL_FORM = B.FUNCTION_ID";

        parent.gReqCode = 'UICONTROLLER';
        parent.gReqType = "APP";
        var radReqDOM = parent.buildRADXml();
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R018" + parent.gBodySeparator + gcallformList, "RADClientHandler");

        resXML = response;
        if (selectSingleNode(resXML, "//result") != null) {
            if (getNodeText(selectNodes(resXML, "//result")[0]) != "") {
                var responseTextArr = getNodeText(selectSingleNode(resXML, "//result")).split(">");
                for (cnt = 0;cnt < responseTextArr.length;cnt++) {
                    createCallformnewNodes(responseTextArr[cnt]);
                }
            }
        }
    }
}

function createCallformnewNodes(data) {

    var cfnode = selectNodes(dom, "//RAD_CALLFORM[@ID='" + data.split("!")[0] + "']");
    var callformArray = ['CALLFORM_MST_DATA_SRC', 'CALLFORM_MST_BLOCK', 'CALLFORM_MST_XSD_NODE', 'CALLFORM_XSD_TYPE_DESC', 'CALLFORM_MST_MULTI_REC', 'CALLFORM_MODULE', 'IS_UPLOAD_TABLE_PRESENT'];
    for (var cfmc = 0;cfmc < cfnode.length;cfmc++) {
        for (var cfcnt = 0;cfcnt < callformArray.length;cfcnt++) {
            callformnode = loadXMLDoc("<" + callformArray[cfcnt] + ">" + data.split("!")[cfcnt + 1] + "</" + callformArray[cfcnt] + ">");
            try {
                setNodeText(selectSingleNode(cfnode[cfmc], callformArray[cfcnt]), data.split("!")[cfcnt + 1]);

            }
            catch (e) {
                cfnode[cfmc].appendChild(fnImportNode(dom, callformnode.childNodes[0]));
            }
        }
    }
}

function fnDefaultPreferences(dom) {
    debug('In fnDefaultPreferences');
    if (selectSingleNode(dom, "//RAD_FUNC_PREFERENCES") == null) {
        parent.gReqCode = 'UICONTROLLER';
        parent.gReqType = "APP";
        var radReqDOM = parent.buildRADXml();
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R020" + parent.gBodySeparator + funcId, "RADClientHandler");
        resXML = loadXMLDoc(getXMLString(response));
        if (selectSingleNode(resXML, "//RAD_FUNC_PREFERENCES") != null) {
            selectSingleNode(dom, "//RAD_KERNEL").appendChild(fnImportNode(dom, selectSingleNode(resXML, ("//RAD_FUNC_PREFERENCES"))));
        }
        return dom;
    }
    else {
        return dom;
    }

}

function fnLaunchLog(logMsg, errLogMsg, errType) {
    if (errType == "E") {
        return 1;
    }

}

function setCustomCheckbox(dom, node, onval, offval) {
    var actionStageTyp = selectNodes(dom, ("//" + node));
    for (var i = 0;i < actionStageTyp.length;i++) {
        if (getNodeText(actionStageTyp[i]) == onval.split('~')[0]) {
            setNodeText(actionStageTyp[i], onval.split('~')[1]);
        }
        else if (getNodeText(actionStageTyp[i]) == offval.split('~')[0]) {
            setNodeText(actionStageTyp[i], offval.split('~')[1]);
        }
    }
}

function fnAddAttr(attr) {
    if (attr == "DSN") {
        if (parent.parent.tableName != null) {
            parent.parent.latestvalue = parent.parent.tableName;
            parent.latestvalue = parent.parent.latestvalue;
            pkcols = parent.parent.pkCols.split("!")[0];
            if (pkcols != "") {
                var lstChr = pkcols.charAt(pkcols.length - 1);
                if (lstChr == "~") {
                    pkcols = pkcols.substring(0, pkcols.length - 1);
                }
                var fstChr = pkcols.charAt(0);
                if (fstChr == "~") {
                    pkcols = pkcols.substring(pkcols.length, 1);
                }
                pkcolsDataType = parent.parent.pkCols.split("!")[1];
                lstChr = pkcolsDataType.charAt(pkcolsDataType.length - 1);
                if (lstChr == "~") {
                    pkcolsDataType = pkcolsDataType.substring(0, pkcolsDataType.length - 1);
                }
                fstChr = pkcolsDataType.charAt(0);
                if (fstChr == "~") {
                    pkcolsDataType = pkcolsDataType.substring(pkcolsDataType.length, 1);
                }
                parent.pkcols = pkcols;
                parent.pkcolsDataType = pkcolsDataType;
            }
            else {
                parent.pkcols = "";
                parent.pkcolsDataType = "";
            }

            var val1 = parent.validateObject("RAD_DATASOURCES", "DATASRC_NAME", parent.parent.latestvalue);

            if (val1 == "1") {
                parent.alertMessage("Table already exists", "E");
                return;
            }
            parent.CreateDOM(attr);
        }
    }
    else {
        if (parent.element != null) {
            parent.latestvalue = parent.element;
            ColumnName = parent.elementval;
            attr = parent.parent.attr;
            selected = parent.selectedval;
            latestvalue = parent.latestvalue;
            if (selected == "BLK") {
                var valid = checkNamingConv(parent.latestvalue, ColumnName, 'BLK_');
                if (valid == false) {
                    return;
                }
                var val1 = parent.validateObject("RAD_DATA_BLOCKS", "BLOCK_NAME", parent.latestvalue);
            }
            else if (selected == "FLD") {
                var valid = checkNamingConv(parent.latestvalue, ColumnName, 'FST_');
                if (valid == false) {
                    return;
                }
                var val1 = parent.validateObject("RAD_FIELDSETS", "FIELDSET_NAME", parent.latestvalue);
            }
            else if (selected == "SCR") {

                var valid = checkNamingConv(parent.latestvalue, ColumnName, 'CVS_');
                if (valid == false) {
                    return;
                }
                var val1 = parent.validateObject("RAD_SCREENS", "SCREEN_NAME", parent.latestvalue);
            }
            else if (selected == "LOV") {

                var valid = checkNamingConv(parent.latestvalue, ColumnName, 'LOV_');
                if (valid == false) {
                    return;
                }
                var val1 = parent.validateObject("RAD_LOVS", "LOV_NAME", parent.latestvalue);
            }
            else if (selected == "HEADER" || selected == "BODY" || selected == "FOOTER") {

                var valid = checkNamingConv(parent.latestvalue, ColumnName, 'TAB_');
                if (valid == false) {
                    return;
                }
                var val1 = parent.validateObject("RAD_TABS", "TAB_NAME", parent.latestvalue);

            }
            else if (selected == "TAB") {

                var valid = checkNamingConv(parent.latestvalue, ColumnName, 'SEC_');
                if (valid == false) {
                    return;
                }
                var val1 = parent.validateObject("RAD_SECTIONS", "SECTION_NAME", parent.latestvalue);
            }

            if (val1 == "1") {
                try {
                    alertMessage("Element already exists", "E");
                    return;
                }
                catch (e) {
                    parent.alertMessage("Element already exists", "E");
                    return;
                }
            }
            else {
                parent.CreateDOM(attr);
            }
            if (selected == 'FLD') {
                fn_enableFieldsetFields(parent.latestvalue, '2');
            }
            if (selected == 'SCR') {
                fn_enableScreens(parent.latestvalue, '2');
            }
            if (selected == 'TAB') {
                fn_enableTab(parent.latestvalue, '', '', '2');
            }
        }
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
    //for    
    return retStr;
}

function alertMessage(message, type, arguments) {
    showLogmessage = message;
    if (type == "I")
        var title = "Information";
    else if (type == "E")
        var title = "Error";
    else if (type == "O")
        var title = "Warning";

    errType = type;
    loadSubScreenDIV("ChildWin", "RadError.jsp?Title=" + title + "&arguments=" + arguments);
}

function loadSubScreenDIV(divId, src) {
    mask();
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    //customWin.style.zIndex = 1;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var ifchildid = "IFGENCHILD" + ifchildSeq;
    var customWinData = '<iframe src="' + src + '" class="frames" title="iFrame" allowtransparency="true" frameborder="0" scrolling="no" id="IFCHILD" name = "' + ifchildid + '"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = document.getElementById(divId);
    if (src != "RadGenerate_C.jsp" && src != "RadMissingLabels.jsp") {
        if (document.getElementById("Dtop"))
            winObj.style.top = document.getElementById("Dtop").offsetHeight + 25 + "px";
        else 
            winObj.style.top = "50px";
        if (document.getElementById("Dleft"))
            winObj.style.left = document.getElementById("Dleft").offsetWidth + "px";
        else 
            winObj.style.left = "0px";
    }
    else {
        winObj.style.top = "50px";
        winObj.style.left = "0px";
        if (document.getElementById("Dleft")) {
            document.getElementsByName(ifchildid)[0].style.width = document.getElementById("Dright").offsetWidth + document.getElementById("Dleft").offsetWidth + "px";
            document.getElementsByName(ifchildid)[0].style.height = document.getElementById("DIVScrContainer").offsetHeight - document.getElementById("WNDtitlebar").offsetHeight + "px";
        }
        else if (document.getElementById("Dright1")) {
            document.getElementById("IFCHILD").style.width = document.getElementById("Dright1").offsetWidth + "px";
            document.getElementById("IFCHILD").style.height = document.getElementById("Dright1").offsetHeight + 20 + "px";
        }
        else {
            document.getElementById("IFCHILD").style.width = scrwdt - 30 + "px";
            document.getElementById("IFCHILD").style.height = scrht - 200 + "px";
        }
    }

    ifchildSeq = ifchildSeq + 1;
    winObj.style.visibility = "visible";
    winObj.style.display = "block";
}

function loadChildSubScreenDIV(divId, src) {
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe src="' + src + '" class="frames" title="iFrame" allowtransparency="true" frameborder="0" scrolling="no" id="IFCHILD"></iframe>';
    customWin.innerHTML = customWinData;
    parent.document.getElementById("Div_ChildWin").appendChild(customWin);
    parent.document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = parent.document.getElementById(divId);
    winObj.style.top = 0 + "px";
    winObj.style.left = parent.document.getElementById("Dleft").offsetWidth + 5 + "px";
    winObj.style.visibility = "visible";
    winObj.style.display = "block";

}

function loadChildWindow(divObj, winObj) {
    if (divObj != null && divObj != "") {
        if (gNumChildWindows ==  - 1)
            gNumChildWindows = 0;
        arrChildWindows[gNumChildWindows] = divObj;
        gNumChildWindows++;
        setActiveWindow(divObj, winObj);
    }
}

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

function fnRADExitSub(target, e) {
    parent.unmask();
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (srcElement.disabled)
        return;
    if (parent.gen_gwinFuncId == "RDDVWCHG" || parent.gen_gwinFuncId == "RDDLNPGE" || parent.gen_gwinFuncId == "RDDFNCGN" || parent.gen_gwinFuncId == "RDDGIMNT" || parent.gen_gwinFuncId == "RDDSCRDF") {
        if (parent.document.getElementById("saveRADXml").disabled == false)
            parent.document.getElementById("saveRADXml").focus();
        else 
            parent.document.getElementsByTagName("A")[0].focus();
    }
    try {
        if (parent.popTextObj)
            parent.popTextObj.focus();
    }
    catch (e) {
    }
    var winObj = document.getElementById(target);
    fnExitSub();
    fnDisableBrowserKey(e);
    preventpropagate(e);
}

function fnRADChildExitSub(target, e) {
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (srcElement.disabled)
        return;

    var winObj = document.getElementById(target);
    fnExitChildSub(winObj);

}

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

function fnExitSub() {
    var winDivObj = parent.document.getElementById("ChildWin");
    if (winDivObj) {
        winDivObj.children[0].src = "";
        parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
    }
}

function fnExitChildSub() {
    var winDivObj = parent.document.getElementById("ChildWin1");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);

}

function loadPreviewScreenDIV(divId, src, scrType) {
    mask();
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    //customWin.style.zIndex = 1;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe src="' + src + '" class="frames" title="iFrame" allowtransparency="true" frameborder="0" scrolling="no" id="IFCHILD"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = document.getElementById(divId);
    winObj.style.top = 0 + "px";
    if (scrType == 'L') {
        winObj.style.left = 0 + "px";
    }
    else {
        winObj.style.left = document.getElementById("Dleft").offsetWidth + 5 + "px";
    }
    winObj.style.visibility = "visible";
    winObj.style.display = "block";

}

function loadChildErroDIV(divId, src) {
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    //customWin.style.zIndex = 1;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe src="' + src + '" class="frames" title="iFrame" allowtransparency="true" frameborder="0" scrolling="no" id="IFCHILD1"></iframe>';
    customWin.innerHTML = customWinData;
    parent.document.getElementById("Div_ChildWin").appendChild(customWin);
    parent.document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = parent.document.getElementById(divId);
    winObj.style.top = 0 + "px";
    winObj.style.left = parent.document.getElementById("Dleft").offsetWidth + 5 + "px";
    winObj.style.visibility = "visible";
    winObj.style.display = "block";

}

function fnrenameChildNode(NewDOM, funcTyp) {
    debug('In fnrenameChildNode');
    if (funcTyp == "C" || funcTyp == "S") {

        if (selectNodes(NewDOM, "//RAD_CHILD").length != 0) {
            newl = NewDOM.createElement("RAD_CHILD_" + parent.relType);
            head = selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl);
            var len1 = selectNodes(NewDOM, "//RAD_CHILD")[0].childNodes.length;
            var nodes = selectNodes(NewDOM, "//RAD_CHILD")[0].childNodes;
            for (var i = 0;i < len1;i++) {
                selectSingleNode(NewDOM, "//RAD_CHILD_" + parent.relType).appendChild(fnImportNode(NewDOM, getCloneDocElement(nodes[i])));
            }
        }
        var bskNodes = selectNodes(NewDOM, "//RAD_CHILD//*");
        for (var j = 0;j < bskNodes.length;j++) {
            bskNodes[j].parentNode.removeChild(bskNodes[j]);
        }
        if (selectNodes(NewDOM, "//RAD_CHILD")[0])
            selectNodes(NewDOM, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(NewDOM, "//RAD_CHILD")[0]);
    }
    return NewDOM;
}

function fnPrepareConsolDOM(NewDOM, funcid, func_type, action) {
    debug('Preparing ConsolDOM');
    releaseType = parent.relType;
    NewDOM = fnrenameChildNode(NewDOM, func_type);
    NewDOM = setTempHeaderNodes(NewDOM);
    NewDOM = fnDelOldNodes(NewDOM);
    NewDOM = FnChek_RefreshedFldSet(NewDOM);
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
    NewDOM = fnSetCallFrmID(NewDOM);
    NewDOM = fnSetLovDetailsID(NewDOM);
    NewDOM = fnScreenNode_Correction(NewDOM);
    NewDOM = fnOrderCorrection(NewDOM);
    NewDOM = ApplyreleaseChanges(NewDOM, funcId, func_type, action);
    NewDOM = TemproaryToModifyActions(NewDOM);
    NewDOM = fn_Reset_BlkFld_FldSets(NewDOM);
    NewDOM = fn_Reset_DsrFldBlocks(NewDOM);
    NewDOM = fnDefaultPreferences(NewDOM);
    NewDOM = FnSort_Nodes(NewDOM);// Sorting Nodes Based On Orders.  
    debug('succesfully prepared ConsolDOM');
    return NewDOM;

}

function fnChkUnChkFlds(fldGroup) {
    if (fldGroup == "Front-End Files") {
        var frntEndFlds = "RAD_XML~UIXML~SYS_JS";
        frntEndFlds = frntEndFlds.split("~");
        for (var i = 0;i < frntEndFlds.length;i++) {
            if (document.getElementsByName(frntEndFlds[i])[0].disabled == false) {
                if (document.getElementsByName(frntEndFlds[i])[0].checked == true) {
                    document.getElementsByName(frntEndFlds[i])[0].checked = false;
                }
                else if (document.getElementsByName(frntEndFlds[i])[0].checked == false) {
                    document.getElementsByName(frntEndFlds[i])[0].checked = true;
                }
            }
        }
    }
    else if (fldGroup == "System Packages") {
        var pckgFlds = "MAIN_SPC~MAIN_SQL~UPLOAD_SPC~UPLOAD_SQL";
        pckgFlds = pckgFlds.split("~");
        for (var j = 0;j < pckgFlds.length;j++) {
            if (document.getElementsByName(pckgFlds[j])[0].disabled == false) {
                if (document.getElementsByName(pckgFlds[j])[0].checked == true) {
                    document.getElementsByName(pckgFlds[j])[0].checked = false;
                }
                else if (document.getElementsByName(pckgFlds[j])[0].checked == false) {
                    document.getElementsByName(pckgFlds[j])[0].checked = true;
                }
            }
        }
    }
    else if (fldGroup == "Hook Packages") {
        var pckgFlds = "KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL";
        pckgFlds = pckgFlds.split("~");
        for (var j = 0;j < pckgFlds.length;j++) {
            if (document.getElementsByName(pckgFlds[j])[0].disabled == false) {
                if (document.getElementsByName(pckgFlds[j])[0].checked == true) {
                    document.getElementsByName(pckgFlds[j])[0].checked = false;
                }
                else if (document.getElementsByName(pckgFlds[j])[0].checked == false) {
                    document.getElementsByName(pckgFlds[j])[0].checked = true;
                }
            }
        }
    }
    else if (fldGroup == "Meta Data") {
        var incFlsList = "MENU_DETAILS~LABEL_DETAILS~AMEND_DETAILS~SUMMARY_DETAILS~SCREEN_DETAILS~LOV_DETAILS~BLOCK_PK_COLS~CALL_FORM_DETAILS~BLOCK_DETAILS~DATASCR_DETAILS~FUNCTION_CALL_FORMS~GATEWAY_DETAILS~VARIABLE_MAPPING~NOTIFICATION_DETAILS~FUNCTION_PARAMETERS~NOTIFICATION_TRIGGER";
        incFlsList = incFlsList.split("~");
        for (var k = 0;k < incFlsList.length;k++) {
            if (document.getElementsByName(incFlsList[k])[0]) {
                if (document.getElementsByName(incFlsList[k])[0].disabled == false) {
                    if (document.getElementsByName(incFlsList[k])[0].checked == true) {
                        document.getElementsByName(incFlsList[k])[0].checked = false;
                    }
                    else if (document.getElementsByName(incFlsList[k])[0].checked == false) {
                        document.getElementsByName(incFlsList[k])[0].checked = true;
                    }
                }
            }
        }
    }
    else if (fldGroup == "Others") {
        var othrFldsList = "XSD_FILES~EXCEL_TEMPLATE~SCREEN_HTMLS~DATA_HTMLS~UPLOAD_TRIGGER~UPLOAD_TABLE_DDL~ARCHIVE_TBL_DEF";
        othrFldsList = othrFldsList.split("~");
        for (var m = 0;m < othrFldsList.length;m++) {
            if (!(document.getElementsByName(othrFldsList[m])[0]) == false) {
                if (document.getElementsByName(othrFldsList[m])[0].disabled == false) {
                    if (document.getElementsByName(othrFldsList[m])[0].checked == true) {
                        document.getElementsByName(othrFldsList[m])[0].checked = false;
                    }
                    else if (document.getElementsByName(othrFldsList[m])[0].checked == false) {
                        document.getElementsByName(othrFldsList[m])[0].checked = true;
                    }
                }
            }
        }
    }

}

function fnGetLableXml(cnslDom, fnID, radReqDOM) {
    var genlblxml = "";
    //amount field validatons start
    var tempbulkgenflag = bulkgenflag;
    bulkgenflag = "Y";
    //amount field validatons ends
    uixml = transformDOMtoUIxml(cnslDom);
    var resLblDtls = translateUIXML(uixml, fnID, parent.lang, parent.jndiName, "LBLS");
    var newel = fnRtnLabls(resLblDtls, radReqDOM);
    newel = fngetFuncPrefLbls(cnslDom, newel);
    bulkgenflag = tempbulkgenflag;//amount field validatons
    return newel;
}

function fnRtnLabls(resLblDtls, radReqDOM) {

    var newel = radReqDOM.createElement("RAD_FID_LABELS");
    newel = loadXMLDoc(getXMLString(newel));
    genlblxml = loadXMLDoc('<?xml version="1.0"?>' + getXMLString(newel));

    function fnRtnLabls(resLblDtls, radReqDOM) {

        var newel = radReqDOM.createElement("RAD_FID_LABELS");
        newel = loadXMLDoc(getXMLString(newel));
        genlblxml = loadXMLDoc('<?xml version="1.0"?>' + getXMLString(newel));
        try {
            if (selectSingleNode(loadXMLDoc(getXMLString(resLblDtls)), "/ROOT/LABEL_CODES") != null) {
                var labelCodes = getNodeText(selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_CODES")).split("~");
                var labelTexts = getNodeText(selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_TEXTS")).split("~");
                for (var i = 0;i < labelCodes.length;i++) {
                    var lblDtls = newel.createElement("LABEL_DETAILS");
                    lblDtls.setAttribute("ID", i);
                    var lblCode = newel.createElement("LABLE_CODE");
                    var lblDesc = newel.createElement("LABLE_DESC");
                    lblDtls.appendChild(lblCode);
                    lblDtls.appendChild(lblDesc);
                    selectSingleNode(newel, "RAD_FID_LABELS").appendChild(lblDtls);
                    setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + i + "]/LABLE_CODE"), labelCodes[i]);
                    setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + i + "]/LABLE_DESC"), '<![CDATA[' + labelTexts[i] + ']]>');
                }
            }
            else {
                if (selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_CODES") != null) {
                    var labelCodes = getNodeText(selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_CODES")).split("~");
                    var labelTexts = getNodeText(selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_TEXTS")).split("~");
                    for (var i = 0;i < labelCodes.length;i++) {
                        var lblDtls = newel.createElement("LABEL_DETAILS");
                        lblDtls.setAttribute("ID", i);
                        var lblCode = newel.createElement("LABLE_CODE");
                        var lblDesc = newel.createElement("LABLE_DESC");
                        lblDtls.appendChild(lblCode);
                        lblDtls.appendChild(lblDesc);
                        selectSingleNode(newel, "RAD_FID_LABELS").appendChild(lblDtls);
                        setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + i + "]/LABLE_CODE"), labelCodes[i]);
                        setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + i + "]/LABLE_DESC"), '<![CDATA[' + labelTexts[i] + ']]>');
                    }
                }
            }
        }
        catch (e) {
            if (selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_CODES") != null) {
                var labelCodes = getNodeText(selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_CODES")).split("~");
                var labelTexts = getNodeText(selectSingleNode(loadXMLDoc(resLblDtls), "/ROOT/LABEL_TEXTS")).split("~");
                for (var i = 0;i < labelCodes.length;i++) {
                    var lblDtls = newel.createElement("LABEL_DETAILS");
                    lblDtls.setAttribute("ID", i);
                    var lblCode = newel.createElement("LABLE_CODE");
                    var lblDesc = newel.createElement("LABLE_DESC");
                    lblDtls.appendChild(lblCode);
                    lblDtls.appendChild(lblDesc);
                    selectSingleNode(newel, "RAD_FID_LABELS").appendChild(lblDtls);
                    setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + i + "]/LABLE_CODE"), labelCodes[i]);
                    setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + i + "]/LABLE_DESC"), '<![CDATA[' + labelTexts[i] + ']]>');
                }
            }

        }
        return newel;
    }

    return newel;
}

function fngetFuncPrefLbls(cnslDom, newel) {
    var fncLbls = "";
    var funcMnDtls = selectNodes(cnslDom, "//RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS");

    for (var fnm = 0;fnm < funcMnDtls.length;fnm++) {
        var fid = getNodeText(selectSingleNode(funcMnDtls[fnm], "FUNCTION_ID"));
        fncLbls += "LBL_" + fid + "_DESC~LBL_" + fid + "_MAIN_MENU~LBL_" + fid + "_SUB_MENU_1~LBL_" + fid + "_SUB_MENU_2~";
    }
    fncLbls = fncLbls.substring(0, fncLbls.length - 1);
    fncLbls = fncLbls.split("~");
    var bldqry = "";
    for (var fnlb = 0;fnlb < fncLbls.length;fnlb++) {
        bldqry += "'" + fncLbls[fnlb] + "',";
    }

    bldqry = bldqry.substring(0, bldqry.length - 1);
    var query = "WHERE LANGUAGE_CODE = '" + language + "' AND (( LABEL_CODE IN (" + bldqry + ") ))";
    var radReqDOM = parent.buildRADXml();
    setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_TYPE"), 'APP');
    setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_CODE"), 'UICONTROLLER');
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R006" + parent.gBodySeparator + query, "RADClientHandler");
    if (selectSingleNode(response, "/ROOT/LABEL_CODES") != null) {
        var lblCodes = getNodeText(selectSingleNode(response, "/ROOT/LABEL_CODES")).split("~");
        var lblTexts = getNodeText(selectSingleNode(response, "/ROOT/LABEL_TEXTS")).split("~");

        for (var ln = 0;ln < lblCodes.length;ln++) {
            var lblLen = selectNodes(newel, "//RAD_FID_LABELS/LABEL_DETAILS").length;
            var lblDtls = newel.createElement("LABEL_DETAILS");
            lblDtls.setAttribute("ID", lblLen);
            var lblCode = newel.createElement("LABLE_CODE");
            var lblDesc = newel.createElement("LABLE_DESC");
            lblDtls.appendChild(lblCode);
            lblDtls.appendChild(lblDesc);
            selectSingleNode(newel, "RAD_FID_LABELS").appendChild(lblDtls);
            setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + lblLen + "]/LABLE_CODE"), lblCodes[ln]);
            setNodeText(selectSingleNode(newel, "//LABEL_DETAILS[@ID=" + lblLen + "]/LABLE_DESC"), lblTexts[ln]);
        }
    }
    return newel;
}

function SetCursorToTextEnd(eleId) {
    var text = document.getElementById(eleId);
    if (text != null && text.value.length > 0) {
        if (text.createTextRange) {
            var FieldRange = text.createTextRange();
            FieldRange.moveStart('character', text.value.length);
            FieldRange.collapse();
            FieldRange.select();
        }
    }
    else {
        document.getElementById(eleId).focus();
    }
}

function fnSetPrefModule() {
    var funcId = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS"))[0], ("FUNCTION_ID")));
    if (document.getElementById('funcDesc').tBodies[0].rows.length > 0) {
        for (var fln = 0;fln < document.getElementById('funcDesc').tBodies[0].rows.length;fln++) {
            if (funcId == document.getElementById('funcDesc').tBodies[0].rows[fln].cells[1].getElementsByTagName("INPUT")[0].value) {
                document.getElementById('funcDesc').tBodies[0].rows[fln].cells[2].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_ID')[0].value;
                document.getElementById('funcDesc').tBodies[0].rows[fln].cells[3].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_DESC')[0].value;
            }
        }
    }
}

function fnSetDefaultvals(NewDOM, mainNode) {
    debug('In fnSetDefaultvals mainnode=' + mainNode);
    // New Node Maintenance. 
    if (selectNodes(NewDOM, "//" + mainNode)) {
        if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE") == null) {
            var tempCorrFlag = "N";
        }
        else {
            if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE")) == "N") {
                var tempCorrFlag = "N";
            }
            else {
                var tempCorrFlag = "Y";
            }
        }
        var blkKerNodes = selectNodes(NewDOM, "//" + mainNode + "/RAD_DATA_BLOCKS");
        for (var ba = 0;ba < blkKerNodes.length;ba++) {
            if (selectSingleNode(blkKerNodes[ba], "BLK_COMMENT_ID") == null) {
                var blkAnnElmt = NewDOM.createElement("BLK_COMMENT_ID");
                blkKerNodes[ba].appendChild(blkAnnElmt);
                setNodeText(selectSingleNode(blkKerNodes[ba], "BLK_COMMENT_ID"), "");
            }
        }
        for (var bkn = 0;bkn < blkKerNodes.length;bkn++) {
            var blkpkvals = "";
            var blkKerName = getNodeText(selectSingleNode(blkKerNodes[bkn], "BLOCK_NAME"));
            var blkkerblkflds = selectNodes(blkKerNodes[bkn], "//" + mainNode + "/RAD_DATA_BLOCKS[@ID='" + blkKerName + "']/RAD_BLK_FIELDS");
            for (var bkf = 0;bkf < blkkerblkflds.length;bkf++) {
                var fldKfldName = getNodeText(selectSingleNode(blkkerblkflds[bkf], "FIELD_NAME"));
                var fldKdispTyp = getNodeText(selectSingleNode(blkkerblkflds[bkf], "DISPLAY_TYPE"));
                var gblLovName = getNodeText(selectSingleNode(blkkerblkflds[bkf], "GLOBAL_LOV_NAME"));
                var lclLovName = getNodeText(selectSingleNode(blkkerblkflds[bkf], "LOV_NAME"));
                var gblofLovName = getNodeText(selectSingleNode(blkkerblkflds[bkf], "GLOBAL_OFF_LINE_LOV_NAME"));
                var lclofLovName = getNodeText(selectSingleNode(blkkerblkflds[bkf], "OFF_LINE_LOV_NAME"));
                if (gblLovName != "") {
                    if (lclLovName == "") {
                        setNodeText(selectSingleNode(blkkerblkflds[bkf], "LOV_NAME"), gblLovName);
                        setNodeText(selectSingleNode(blkkerblkflds[bkf], "GLOBAL_LOV_NAME"), "");
                    }
                }
                if (gblofLovName != "") {
                    if (lclofLovName == "") {
                        setNodeText(selectSingleNode(blkkerblkflds[bkf], "OFF_LINE_LOV_NAME"), gblofLovName);
                        setNodeText(selectSingleNode(blkkerblkflds[bkf], "GLOBAL_OFF_LINE_LOV_NAME"), "");
                    }
                }
                if (selectSingleNode(blkkerblkflds[bkf], "BLOCK_PK_FLD") == null) {
                    var blkpkElmt = NewDOM.createElement("BLOCK_PK_FLD");
                    blkkerblkflds[bkf].insertBefore(blkpkElmt, selectSingleNode(blkkerblkflds[bkf], "BLOCK_TITLE"));
                }
                if (selectSingleNode(blkkerblkflds[bkf], "FLD_COMMENT_ID") == null) {
                    var blkfldann = NewDOM.createElement("FLD_COMMENT_ID");
                    blkkerblkflds[bkf].appendChild(blkfldann);
                    setNodeText(selectSingleNode(blkkerblkflds[bkf], "FLD_COMMENT_ID"), "");
                }
                //VINIT
                if (selectSingleNode(blkkerblkflds[bkf], "EXACT_FETCH") == null) {
                    var blkfldann = NewDOM.createElement("EXACT_FETCH");
                    blkkerblkflds[bkf].appendChild(blkfldann);
                    setNodeText(selectSingleNode(blkkerblkflds[bkf], "EXACT_FETCH"), "");
                }
                //VINIT
                if (selectSingleNode(blkkerblkflds[bkf], "CALENDAR_TEXT") == null) {
                    var blkfldann = NewDOM.createElement("CALENDAR_TEXT");
                    blkkerblkflds[bkf].appendChild(blkfldann);
                    setNodeText(selectSingleNode(blkkerblkflds[bkf], "CALENDAR_TEXT"), "N");
                }
                if (selectSingleNode(blkkerblkflds[bkf], "FORMAT_REQD") == null) {
                    var blkfldann = NewDOM.createElement("FORMAT_REQD");
                    blkkerblkflds[bkf].appendChild(blkfldann);
                    setNodeText(selectSingleNode(blkkerblkflds[bkf], "FORMAT_REQD"), "N");
                }
                //VINIT hot key changes
                if (selectSingleNode(blkkerblkflds[bkf], "HOTKEYREQ") == null) {
                    var blkfldann = NewDOM.createElement("HOTKEYREQ");
                    blkkerblkflds[bkf].appendChild(blkfldann);
                    setNodeText(selectSingleNode(blkkerblkflds[bkf], "HOTKEYREQ"), "N");
                }
                if (selectSingleNode(blkkerblkflds[bkf], "FOCUSREQ") == null) {
                    var blkfldann = NewDOM.createElement("FOCUSREQ");
                    blkkerblkflds[bkf].appendChild(blkfldann);
                    setNodeText(selectSingleNode(blkkerblkflds[bkf], "FOCUSREQ"), "N");
                }
                //VINIT
                var blkPkFld = getNodeText(selectSingleNode(blkkerblkflds[bkf], "BLOCK_PK_FLD"));
                if (fldKdispTyp == "SELECT" || fldKdispTyp == "RADIO" || fldKdispTyp == "CHECKBOX" || fldKdispTyp == "ROSELECT") {
                    var fldKcustAtrbts = selectNodes(blkkerblkflds[bkf], "//RAD_DATA_BLOCKS[@ID='" + blkKerName + "']/RAD_BLK_FIELDS[@ID='" + fldKfldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                    var attp = 1;
                    for (kcst = 0;kcst < fldKcustAtrbts.length;kcst++) {
                        if (selectSingleNode(fldKcustAtrbts[kcst], "SELECTED")) {

                            if (selectSingleNode(fldKcustAtrbts[kcst], "SELECTED")) {
                                var fldSlctd = getNodeText(selectSingleNode(fldKcustAtrbts[kcst], "SELECTED"));
                            }
                            else {
                                var fldSlctd = "";
                            }
                            var fldSlctdval = getNodeText(selectSingleNode(fldKcustAtrbts[kcst], "ATTR_VALUE"));
                            if (fldSlctd == "Y") {
                                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATA_BLOCKS[@ID='" + blkKerName + "']/RAD_BLK_FIELDS[@ID='" + fldKfldName + "']/DEFAULT_VALUE"), fldSlctdval);
                                setNodeText(selectSingleNode(fldKcustAtrbts[kcst], "SELECTED"), "N");
                            }

                            if (selectSingleNode(fldKcustAtrbts[kcst], "RELEASE_TYPE") == null) {
                                var relTyp = NewDOM.createElement("RELEASE_TYPE");
                                fldKcustAtrbts[kcst].appendChild(relTyp);
                                setNodeText(selectSingleNode(fldKcustAtrbts[kcst], "RELEASE_TYPE"), "KERNEL");
                            }
                            if (selectSingleNode(fldKcustAtrbts[kcst], "RELEASE_NAME") == null) {
                                var relName = NewDOM.createElement("RELEASE_NAME");
                                fldKcustAtrbts[kcst].appendChild(relName);
                                setNodeText(selectSingleNode(fldKcustAtrbts[kcst], "RELEASE_NAME"), "BASE_RELEASE");
                            }

                            if (selectSingleNode(fldKcustAtrbts[kcst], "ACTIVE") == null) {
                                var custAttrActive = NewDOM.createElement("ACTIVE");
                                fldKcustAtrbts[kcst].appendChild(custAttrActive);
                                setNodeText(selectSingleNode(fldKcustAtrbts[kcst], "ACTIVE"), "Y");
                            }

                            if (fldKdispTyp == "CHECKBOX") {
                                if (selectSingleNode(fldKcustAtrbts[kcst], "SELECTED")) {
                                    var fldchkd = getNodeText(selectSingleNode(fldKcustAtrbts[kcst], "SELECTED"));
                                }
                                else {
                                    var fldchkd = "";
                                }
                                if (fldchkd == "Y") {
                                    var fldchkdattrName = getNodeText(selectSingleNode(fldKcustAtrbts[kcst], "ATTR_NAME"));
                                    if (fldchkdattrName == "ON") {
                                        var fldchkdattrval = getNodeText(selectSingleNode(fldKcustAtrbts[kcst], "ATTR_VALUE"));
                                        if (fldSlctd == "Y")
                                            setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATA_BLOCKS[@ID='" + blkKerName + "']/RAD_BLK_FIELDS[@ID='" + fldKfldName + "']/DEFAULT_VALUE"), fldchkdattrval);
                                    }
                                }
                                else {
                                    var fldchkdattrName = getNodeText(selectSingleNode(fldKcustAtrbts[kcst], "ATTR_NAME"));
                                    if (fldchkdattrName == "OFF") {
                                        var fldchkdattrval = getNodeText(selectSingleNode(fldKcustAtrbts[kcst], "ATTR_VALUE"));
                                        if (fldSlctd == "Y")
                                            setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATA_BLOCKS[@ID='" + blkKerName + "']/RAD_BLK_FIELDS[@ID='" + fldKfldName + "']/DEFAULT_VALUE"), fldchkdattrval);
                                    }
                                }
                            }

                            try {
                                var delNode = selectSingleNode(fldKcustAtrbts[kcst], "SELECTED");
                                fldKcustAtrbts[kcst].removeChild(delNode);
                            }
                            catch (e) {
                            }
                        }

                    }
                }
                if (selectSingleNode(blkKerNodes[bkn], "BLK_PK_FLD") == null) {
                    var blkpkElmt = NewDOM.createElement("BLK_PK_FLD");
                    blkKerNodes[bkn].insertBefore(blkpkElmt, selectSingleNode(blkKerNodes[bkn], "BLOCK_TITLE"));
                }

                if (blkPkFld == "Y") {
                    blkpkvals = blkpkvals + fldKfldName + "~";

                }

                if (fldKdispTyp == "CHECKBOX") {
                    if (selectNodes(NewDOM, "//TEMP_CORRECTION_DONE").length == 0) {
                        if (selectSingleNode(blkkerblkflds[bkf], "RAD_FIELD_CUSTOM_ATTRS") == null) {
                            var custattrNodeOn = NewDOM.createElement("RAD_FIELD_CUSTOM_ATTRS");
                            custattrNodeOn.setAttribute("ID", "ON");
                            var attrName = NewDOM.createElement("ATTR_NAME");
                            var attrVal = NewDOM.createElement("ATTR_VALUE");
                            custattrNodeOn.appendChild(attrName);
                            custattrNodeOn.appendChild(attrVal);
                            blkkerblkflds[bkf].appendChild(custattrNodeOn);
                            setNodeText(selectSingleNode(blkkerblkflds[bkf], "RAD_FIELD_CUSTOM_ATTRS[@ID='ON']/ATTR_NAME"), "ON");
                            setNodeText(selectSingleNode(blkkerblkflds[bkf], "RAD_FIELD_CUSTOM_ATTRS[@ID='ON']/ATTR_VALUE"), "Y");
                            var custattrNode = NewDOM.createElement("RAD_FIELD_CUSTOM_ATTRS");
                            custattrNode.setAttribute("ID", "OFF");
                            var attrName = NewDOM.createElement("ATTR_NAME");
                            var attrVal = NewDOM.createElement("ATTR_VALUE");
                            custattrNode.appendChild(attrName);
                            custattrNode.appendChild(attrVal);
                            blkkerblkflds[bkf].appendChild(custattrNode);
                            setNodeText(selectSingleNode(blkkerblkflds[bkf], "RAD_FIELD_CUSTOM_ATTRS[@ID='OFF']/ATTR_NAME"), "OFF");
                            setNodeText(selectSingleNode(blkkerblkflds[bkf], "RAD_FIELD_CUSTOM_ATTRS[@ID='OFF']/ATTR_VALUE"), "N");
                        }
                    }
                    if (selectSingleNode(blkkerblkflds[bkf], "RAD_FIELD_CUSTOM_ATTRS") != null) {
                        var Cust_Attr_name = selectNodes(blkkerblkflds[bkf], "RAD_FIELD_CUSTOM_ATTRS");
                        for (var cs = 0;cs < Cust_Attr_name.length;cs++) {
                            if (selectSingleNode(Cust_Attr_name[cs], "ATTR_NAME") != null && getNodeText(selectSingleNode(Cust_Attr_name[cs], "ATTR_NAME")) != "")
                                Cust_Attr_name[cs].setAttribute("ID", getNodeText(selectSingleNode(Cust_Attr_name[cs], "ATTR_NAME")));
                        }
                    }
                }

            }
            blkpkvals = blkpkvals.substring(0, blkpkvals.length - 1);
            if (selectSingleNode(blkKerNodes[bkn], "BLK_PK_FLD") != null && blkpkvals != "")
                setNodeText(selectSingleNode(blkKerNodes[bkn], "BLK_PK_FLD"), blkpkvals);
        }

        var fstFlds = selectNodes(NewDOM, "//" + mainNode + "/RAD_FIELDSETS/FIELDSET_FIELDS");
        for (var ffl = 0;ffl < fstFlds.length;ffl++) {
            if (selectSingleNode(fstFlds[ffl], "RELEASE_TYPE") == null) {
                var relTyp = NewDOM.createElement("RELEASE_TYPE");
                fstFlds[ffl].appendChild(relTyp);
                setNodeText(selectSingleNode(fstFlds[ffl], "RELEASE_TYPE"), "KERNEL");
            }
            if (selectSingleNode(fstFlds[ffl], "RELEASE_NAME") == null) {
                var relName = NewDOM.createElement("RELEASE_NAME");
                fstFlds[ffl].appendChild(relName);
                setNodeText(selectSingleNode(fstFlds[ffl], "RELEASE_NAME"), "BASE_RELEASE");
            }

        }
        var scrns = selectNodes(NewDOM, "//" + mainNode + "/RAD_SCREENS");
        for (var scn = 0;scn < scrns.length;scn++) {
            if (selectSingleNode(scrns[scn], "SCREEN_VISIBLE") == null) {
                var scrVis = NewDOM.createElement("SCREEN_VISIBLE");
                scrns[scn].insertBefore(scrVis, selectSingleNode(scrns[scn], "HEADER"));
                setNodeText(selectSingleNode(scrns[scn], "SCREEN_VISIBLE"), "Y");
            }
            if (selectSingleNode(scrns[scn], "SCREEN_OBIEE") == null) {
                var scrVis = NewDOM.createElement("SCREEN_OBIEE");
                scrns[scn].insertBefore(scrVis, selectSingleNode(scrns[scn], "HEADER"));
                setNodeText(selectSingleNode(scrns[scn], "SCREEN_OBIEE"), "N");
            }

            if (getNodeText(selectSingleNode(scrns[scn], "SCREEN_VISIBLE")) == "" || tempCorrFlag == "N") {
                setNodeText(selectSingleNode(scrns[scn], "SCREEN_VISIBLE"), "Y");
            }
            if (selectSingleNode(scrns[scn], "RELEASE_TYPE") == null) {
                var relTyp = NewDOM.createElement("RELEASE_TYPE");
                scrns[scn].insertBefore(relTyp, selectSingleNode(scrns[scn], "HEADER"));
                setNodeText(selectSingleNode(scrns[scn], "RELEASE_TYPE"), "KERNEL");

            }
            if (selectSingleNode(scrns[scn], "RELEASE_NAME") == null) {
                var relName = NewDOM.createElement("RELEASE_NAME");
                scrns[scn].insertBefore(relName, selectSingleNode(scrns[scn], "HEADER"));
                setNodeText(selectSingleNode(scrns[scn], "RELEASE_NAME"), "BASE_RELEASE");

            }
        }

        var scrPortns = "HEADER~BODY~FOOTER"
        scrPortns = scrPortns.split("~");
        for (var sp = 0;sp < scrPortns.length;sp++) {
            var scrPrtns = selectNodes(NewDOM, "//" + mainNode + "/RAD_SCREENS/" + scrPortns[sp] + "/RAD_TABS/RAD_SECTIONS/RAD_PARTITIONS");
            for (var spr = 0;spr < scrPrtns.length;spr++) {
                if (selectSingleNode(scrPrtns[spr], "RELEASE_TYPE") == null) {
                    var relTyp = NewDOM.createElement("RELEASE_TYPE");
                    scrPrtns[spr].appendChild(relTyp);
                    setNodeText(selectSingleNode(scrPrtns[spr], "RELEASE_TYPE"), "KERNEL");
                }
                if (selectSingleNode(scrPrtns[spr], "RELEASE_NAME") == null) {
                    var relName = NewDOM.createElement("RELEASE_NAME");
                    scrPrtns[spr].appendChild(relName);
                    setNodeText(selectSingleNode(scrPrtns[spr], "RELEASE_NAME"), "BASE_RELEASE");
                }

            }

            var scrTabs = selectNodes(NewDOM, "//" + mainNode + "/RAD_SCREENS/" + scrPortns[sp] + "/RAD_TABS");
            for (var sct = 0;sct < scrTabs.length;sct++) {
                if (selectSingleNode(scrTabs[sct], "TAB_VISIBLE") == null) {
                    var tabVis = NewDOM.createElement("TAB_VISIBLE");
                    scrTabs[sct].insertBefore(tabVis, selectSingleNode(scrTabs[sct], "RAD_SECTIONS"));
                    setNodeText(selectSingleNode(scrTabs[sct], "TAB_VISIBLE"), "Y");
                }
                if (getNodeText(selectSingleNode(scrTabs[sct], "TAB_VISIBLE")) == "" || tempCorrFlag == "N") {
                    setNodeText(selectSingleNode(scrTabs[sct], "TAB_VISIBLE"), "Y");
                }
                if (selectSingleNode(scrTabs[sct], "RELEASE_TYPE") == null) {
                    var relTyp = NewDOM.createElement("RELEASE_TYPE");
                    scrTabs[sct].insertBefore(relTyp, selectSingleNode(scrTabs[sct], "RAD_SECTIONS"));
                    setNodeText(selectSingleNode(scrTabs[sct], "RELEASE_TYPE"), "KERNEL");
                }
                if (selectSingleNode(scrTabs[sct], "RELEASE_NAME") == null) {
                    var relName = NewDOM.createElement("RELEASE_NAME");
                    scrTabs[sct].insertBefore(relName, selectSingleNode(scrTabs[sct], "RAD_SECTIONS"));
                    setNodeText(selectSingleNode(scrTabs[sct], "RELEASE_NAME"), "BASE_RELEASE");
                }
            }
            var scrSecs = selectNodes(NewDOM, "//" + mainNode + "/RAD_SCREENS/" + scrPortns[sp] + "/RAD_TABS/RAD_SECTIONS");
            for (var scs = 0;scs < scrSecs.length;scs++) {
                if (selectSingleNode(scrSecs[scs], "SEC_VISIBLE") == null) {
                    var scrVis = NewDOM.createElement("SEC_VISIBLE");
                    scrSecs[scs].insertBefore(scrVis, selectSingleNode(scrSecs[scs], "RAD_PARTITIONS"));
                    setNodeText(selectSingleNode(scrSecs[scs], "SEC_VISIBLE"), "Y");
                }
                if (selectSingleNode(scrSecs[scs], "SECTION_LBL") == null) {
                    var scrVis = NewDOM.createElement("SECTION_LBL");
                    scrSecs[scs].insertBefore(scrVis, selectSingleNode(scrSecs[scs], "RAD_PARTITIONS"));
                    setNodeText(selectSingleNode(scrSecs[scs], "SECTION_LBL"), "");
                }
                if (selectSingleNode(scrSecs[scs], "COLLAPSE") == null) {
                    var scrVis = NewDOM.createElement("COLLAPSE");
                    scrSecs[scs].insertBefore(scrVis, selectSingleNode(scrSecs[scs], "RAD_PARTITIONS"));
                    setNodeText(selectSingleNode(scrSecs[scs], "COLLAPSE"), "N");
                }
                if (selectSingleNode(scrSecs[scs], "MULTIPLE_SEC") == null) {
                    var scrVis = NewDOM.createElement("MULTIPLE_SEC");
                    scrSecs[scs].insertBefore(scrVis, selectSingleNode(scrSecs[scs], "RAD_PARTITIONS"));
                    setNodeText(selectSingleNode(scrSecs[scs], "MULTIPLE_SEC"), "N");
                }
                if (getNodeText(selectSingleNode(scrSecs[scs], "SEC_VISIBLE")) == "" || tempCorrFlag == "N") {
                    setNodeText(selectSingleNode(scrSecs[scs], "SEC_VISIBLE"), "Y");
                }
                if (selectSingleNode(scrSecs[scs], "RELEASE_TYPE") == null) {
                    var relTyp = NewDOM.createElement("RELEASE_TYPE");
                    scrSecs[scs].insertBefore(relTyp, selectSingleNode(scrSecs[scs], "RAD_PARTITIONS"));
                    setNodeText(selectSingleNode(scrSecs[scs], "RELEASE_TYPE"), "KERNEL");
                }
                if (selectSingleNode(scrSecs[scs], "RELEASE_NAME") == null) {
                    var relName = NewDOM.createElement("RELEASE_NAME");
                    scrSecs[scs].insertBefore(relName, selectSingleNode(scrSecs[scs], "RAD_PARTITIONS"));
                    setNodeText(selectSingleNode(scrSecs[scs], "RELEASE_NAME"), "BASE_RELEASE");
                }
            }
        }

        var fldSts = selectNodes(NewDOM, "//" + mainNode + "/RAD_FIELDSETS");
        for (var fst = 0;fst < fldSts.length;fst++) {
            if (selectSingleNode(fldSts[fst], "FIELDSET_VISIBLE") == null) {
                var fstVis = NewDOM.createElement("FIELDSET_VISIBLE");
                fldSts[fst].insertBefore(fstVis, selectSingleNode(fldSts[fst], "FIELDSET_FIELDS"));
                setNodeText(selectSingleNode(fldSts[fst], "FIELDSET_VISIBLE"), "Y");
            }
            if (getNodeText(selectSingleNode(fldSts[fst], "FIELDSET_VISIBLE")) == "") {
                setNodeText(selectSingleNode(fldSts[fst], "FIELDSET_VISIBLE"), "Y");
            }

            if (selectSingleNode(fldSts[fst], "FIELDSET_IMAGE") == null) {
                var fstVis = NewDOM.createElement("FIELDSET_IMAGE");
                fldSts[fst].insertBefore(fstVis, selectSingleNode(fldSts[fst], "FIELDSET_FIELDS"));
                setNodeText(selectSingleNode(fldSts[fst], "FIELDSET_IMAGE"), "N");
            }

            if (selectSingleNode(fldSts[fst], "FIELDSET_TYPE") == null || getNodeText(selectSingleNode(fldSts[fst], "FIELDSET_TYPE")) == "") {
                var fstVis = NewDOM.createElement("FIELDSET_TYPE");
                fldSts[fst].insertBefore(fstVis, selectSingleNode(fldSts[fst], "FIELDSET_FIELDS"));
                setNodeText(selectSingleNode(fldSts[fst], "FIELDSET_TYPE"), "Normal");
                if (getNodeText(selectSingleNode(fldSts[fst], "FIELDSET_IMAGE")) != null && getNodeText(selectSingleNode(fldSts[fst], "FIELDSET_IMAGE")) == "Y") {
                    setNodeText(selectSingleNode(fldSts[fst], "FIELDSET_TYPE"), "ImageSet");
                }
            }

            if (selectSingleNode(fldSts[fst], "RELEASE_TYPE") == null) {
                var fstVis = NewDOM.createElement("RELEASE_TYPE");
                fldSts[fst].insertBefore(fstVis, selectSingleNode(fldSts[fst], "FIELDSET_FIELDS"));
                setNodeText(selectSingleNode(fldSts[fst], "RELEASE_TYPE"), "KERNEL");
            }
            if (selectSingleNode(fldSts[fst], "RELEASE_NAME") == null) {
                var fstVis = NewDOM.createElement("RELEASE_NAME");
                fldSts[fst].insertBefore(fstVis, selectSingleNode(fldSts[fst], "FIELDSET_FIELDS"));
                setNodeText(selectSingleNode(fldSts[fst], "RELEASE_NAME"), "BASE_RELEASE");
            }

        }

        var calfrms = selectNodes(NewDOM, "//" + mainNode + "/RAD_CALLFORM");
        for (var j = 0;j < calfrms.length;j++) {

            var clfrnFuncId = getNodeText(selectSingleNode(calfrms[j], "CALLFORM_FUCNTIONID"));
            var clfrm = selectNodes(NewDOM, "//" + mainNode + "/RAD_CALLFORM[CALLFORM_FUCNTIONID='" + clfrnFuncId + "']");
            if (selectSingleNode(clfrm[0], "RELEASE_TYPE") == null) {
                var relTyp = NewDOM.createElement("RELEASE_TYPE");
                clfrm[0].appendChild(relTyp);
                setNodeText(selectSingleNode(clfrm[0], "RELEASE_TYPE"), "KERNEL");
            }
            if (selectSingleNode(clfrm[0], "RELEASE_NAME") == null) {
                var relName = NewDOM.createElement("RELEASE_NAME");
                clfrm[0].appendChild(relName);
                setNodeText(selectSingleNode(clfrm[0], "RELEASE_NAME"), "BASE_RELEASE");
            }
            if (selectSingleNode(clfrm[0], "CALLFORM_DISPLAY_TYPE") == null) {
                var calfrmTyp = NewDOM.createElement("CALLFORM_DISPLAY_TYPE");
                clfrm[0].appendChild(calfrmTyp);

            }
            if (selectSingleNode(clfrm[0], "CALLFORM_ACTIVE") == null) {
                var calfrmActv = NewDOM.createElement("CALLFORM_ACTIVE");
                clfrm[0].appendChild(calfrmActv);
                setNodeText(selectSingleNode(clfrm[0], "CALLFORM_ACTIVE"), "Y");
            }
        }

        var lanfrms = selectNodes(NewDOM, "//" + mainNode + "/RAD_LAUNCHFORM");
        for (var j = 0;j < lanfrms.length;j++) {

            var lanFuncId = getNodeText(selectSingleNode(lanfrms[j], "LAUNCHFORM_FUCNTIONID"));
            var lnfrm = selectNodes(NewDOM, "//" + mainNode + "/RAD_LAUNCHFORM[LAUNCHFORM_FUCNTIONID='" + lanFuncId + "']");
            if (selectSingleNode(lnfrm[0], "RELEASE_TYPE") == null) {
                var relTyp = NewDOM.createElement("RELEASE_TYPE");
                lnfrm[0].appendChild(relTyp);
                setNodeText(selectSingleNode(lnfrm[0], "RELEASE_TYPE"), "KERNEL");
            }
            if (selectSingleNode(lnfrm[0], "RELEASE_NAME") == null) {
                var relName = NewDOM.createElement("RELEASE_NAME");
                lnfrm[0].appendChild(relName);
                setNodeText(selectSingleNode(lnfrm[0], "RELEASE_NAME"), "BASE_RELEASE");
            }

            if (selectSingleNode(lnfrm[0], "LAUNCHFORM_ACTIVE") == null) {
                var calfrmActv = NewDOM.createElement("LAUNCHFORM_ACTIVE");
                lnfrm[0].appendChild(calfrmActv);
                setNodeText(selectSingleNode(lnfrm[0], "LAUNCHFORM_ACTIVE"), "Y");
            }
        }

        var funcPrfs = selectNodes(NewDOM, "//" + mainNode + "/RAD_FUNC_PREFERENCES");
        if (funcPrfs.length > 0) {
            if (selectSingleNode(funcPrfs[0], "VCS_FOLDER") == null) {
                var vcsFld = NewDOM.createElement("VCS_FOLDER");
                funcPrfs[0].insertBefore(vcsFld, selectSingleNode(funcPrfs[0], "TANK_MODIFICATIONS"));
            }
            if (selectSingleNode(funcPrfs[0], "MULTI_BRANCH_ACCESS") == null) {
                var vcsFld = NewDOM.createElement("MULTI_BRANCH_ACCESS");
                funcPrfs[0].insertBefore(vcsFld, selectSingleNode(funcPrfs[0], "TANK_MODIFICATIONS"));
            }
            if (selectSingleNode(funcPrfs[0], "TXN_BLOCK_NAME") == null) {
                var vcsFld = NewDOM.createElement("TXN_BLOCK_NAME");
                funcPrfs[0].insertBefore(vcsFld, selectSingleNode(funcPrfs[0], "TANK_MODIFICATIONS"));
            }
            if (selectSingleNode(funcPrfs[0], "TXN_FIELD_NAME") == null) {
                var vcsFld = NewDOM.createElement("TXN_FIELD_NAME");
                funcPrfs[0].insertBefore(vcsFld, selectSingleNode(funcPrfs[0], "TANK_MODIFICATIONS"));
            }
            if (selectSingleNode(funcPrfs[0], "EXPORT_REQD") == null) {
                var vcsFld = NewDOM.createElement("EXPORT_REQD");
                funcPrfs[0].insertBefore(vcsFld, selectSingleNode(funcPrfs[0], "TANK_MODIFICATIONS"));
            }
            if (selectSingleNode(funcPrfs[0], "ELCM_FUNCTION") == null) {
                var vcsFld = NewDOM.createElement("ELCM_FUNCTION");
                funcPrfs[0].insertBefore(vcsFld, selectSingleNode(funcPrfs[0], "TANK_MODIFICATIONS"));
            }
			if (selectSingleNode(funcPrfs[0], "MODULE_AUTO_AUTH") == null) {
                var vcsFld = NewDOM.createElement("MODULE_AUTO_AUTH");
                funcPrfs[0].insertBefore(vcsFld, selectSingleNode(funcPrfs[0], "TANK_MODIFICATIONS"));
            }

        }

        var fieldsets = selectNodes(NewDOM, "//" + mainNode + "/RAD_FIELDSETS");
        for (var j = 0;j < fieldsets.length;j++) {
            var fldset = getNodeText(selectSingleNode(fieldsets[j], "FIELDSET_NAME"));
            var fldsetfields = selectNodes(NewDOM, "//" + mainNode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS");
            for (var k = 0;k < fldsetfields.length;k++) {
                if (selectSingleNode(fldsetfields[k], "ACTIVE") == null) {
                    var active = NewDOM.createElement("ACTIVE");
                    fldsetfields[k].appendChild(active);
                    setNodeText(selectSingleNode(fldsetfields[k], "ACTIVE"), "Y");
                }
                if (selectSingleNode(fldsetfields[k], "FIELD_ORDER") == null) {
                    var fldorder = NewDOM.createElement("FIELD_ORDER");
                    fldsetfields[k].appendChild(fldorder);
                }
            }
        }

        var screens = selectNodes(NewDOM, "//" + mainNode + "/RAD_SCREENS");
        for (var j = 0;j < screens.length;j++) {
            var scrname = getNodeText(selectSingleNode(screens[j], "SCREEN_NAME"));
            var scrargs = selectNodes(NewDOM, "//" + mainNode + "/RAD_SCREENS[SCREEN_NAME='" + scrname + "']/SCREEN_ARGS");
            for (var k = 0;k < scrargs.length;k++) {
                if (selectSingleNode(scrargs[k], "ACTIVE") == null) {
                    var active = NewDOM.createElement("ACTIVE");
                    scrargs[k].appendChild(active);
                    setNodeText(selectSingleNode(scrargs[k], "ACTIVE"), "Y");
                }
            }
        }
        // Lov Release Name Defaulting
        var lovrel = selectNodes(NewDOM, "//" + mainNode + "/RAD_LOVS");
        for (var j = 0;j < lovrel.length;j++) {

            var lovFuncId = getNodeText(selectSingleNode(lovrel[j], "LOV_NAME"));
            var lovrel_det = selectNodes(NewDOM, "//" + mainNode + "/RAD_LOVS[LOV_NAME='" + lovFuncId + "']/RAD_LOV_DETAILS");
            for (var k = 0;k < lovrel_det.length;k++) {
                //vinit 
                var lovFuncId_details = getNodeText(selectSingleNode(lovrel_det[k], "QUERY_COLS"));
                var lov_queycols = selectNodes(NewDOM, "//" + mainNode + "/RAD_LOVS[LOV_NAME='" + lovFuncId + "']/RAD_LOV_DETAILS[QUERY_COLS='" + lovFuncId_details + "']");
                if (selectSingleNode(lov_queycols[0], "IS_INDEXED") == null) {
                    var relTyp = NewDOM.createElement("IS_INDEXED");
                    lov_queycols[0].appendChild(relTyp);
                    setNodeText(selectSingleNode(lov_queycols[0], "IS_INDEXED"), "N");
                }
                if (selectSingleNode(lov_queycols[0], "MIN_SEARCH_CHAR_LEN") == null) {
                    var relName = NewDOM.createElement("MIN_SEARCH_CHAR_LEN");
                    lov_queycols[0].appendChild(relName);
                    setNodeText(selectSingleNode(lov_queycols[0], "MIN_SEARCH_CHAR_LEN"), "");
                }
            }

            var lnfrm = selectNodes(NewDOM, "//" + mainNode + "/RAD_LOVS[LOV_NAME='" + lovFuncId + "']");
            if (selectSingleNode(lnfrm[0], "RELEASE_TYPE") == null) {
                var relTyp = NewDOM.createElement("RELEASE_TYPE");
                lnfrm[0].appendChild(relTyp);
                setNodeText(selectSingleNode(lnfrm[0], "RELEASE_TYPE"), "KERNEL");
            }
            if (selectSingleNode(lnfrm[0], "RELEASE_NAME") == null) {
                var relName = NewDOM.createElement("RELEASE_NAME");
                lnfrm[0].appendChild(relName);
                setNodeText(selectSingleNode(lnfrm[0], "RELEASE_NAME"), "BASE_RELEASE");
            }

        }

        //VINIT 081214 STARTS
        var sumbs = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY");
        if (sumbs.length > 0) {
            if (selectSingleNode(sumbs[0], "BLIND_SEARCH") == null) {
                var lname = NewDOM.createElement("BLIND_SEARCH");
                sumbs[0].appendChild(lname);
                setNodeText(selectSingleNode(sumbs[0], "BLIND_SEARCH"), "N");
            }
        }
        //081214 ENDS
        var summlov = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUMMARY_DETAILS");
        for (var sml = 0;sml < summlov.length;sml++) {

            if (selectSingleNode(summlov[sml], "LOV_NAME") == null) {
                var lname = NewDOM.createElement("LOV_NAME");
                summlov[sml].appendChild(lname);
                setNodeText(selectSingleNode(summlov[sml], "LOV_NAME"), "");
            }

            //vinit summary lov changes
            var sumlovnode = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY");
            var blkKerName = getNodeText(selectSingleNode(sumlovnode[0], "RSLT_DATABLK")); 
            var blkfldlovarray = new Array();
            var lovcount = 0;
            var blkNodes = selectNodes(NewDOM, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkKerName + "']");

            var blkflds = selectNodes(NewDOM, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkKerName + "']/RAD_BLK_FIELDS");
            for (var bkf = 0;bkf < blkflds.length;bkf++) {
                var fldKfldName = getNodeText(selectSingleNode(blkflds[bkf], "FIELD_NAME"));
                var fldKdispTyp = getNodeText(selectSingleNode(blkflds[bkf], "DISPLAY_TYPE"));
                var lclLovName = getNodeText(selectSingleNode(blkflds[bkf], "LOV_NAME"));
                if (fldKdispTyp == 'LOV' && lclLovName != '') {
                    blkfldlovarray[lovcount] = fldKfldName;
                    lovcount++;
                }
            }
            for (var sml = 0;sml < summlov.length;sml++) {
                var queryflag = getNodeText(selectSingleNode(summlov[sml], "QUERY"));
                var fieldname = getNodeText(selectSingleNode(summlov[sml], "FIELD_NAME"));
                var lovflag = false;
                for (var k = 0;k < blkfldlovarray.length;k++) {
                    if (blkfldlovarray[k] == fieldname) {
                        lovflag = true;
                        break;
                    }
                }
                if (selectSingleNode(summlov[sml], "LOV_QUERY_REQ") == null) {
                    var lname = NewDOM.createElement("LOV_QUERY_REQ");
                    summlov[sml].appendChild(lname);
                    if (queryflag == 'Y' && lovflag)
                        setNodeText(selectSingleNode(summlov[sml], "LOV_QUERY_REQ"), "Y");
                    else 
                        setNodeText(selectSingleNode(summlov[sml], "LOV_QUERY_REQ"), "N");
                }
                if (selectSingleNode(summlov[sml], "MIN_CHAR_LEN") == null) {
                    var lname = NewDOM.createElement("MIN_CHAR_LEN");
                    summlov[sml].appendChild(lname);
                    setNodeText(selectSingleNode(summlov[sml], "MIN_CHAR_LEN"), "");
                }
                if (selectSingleNode(summlov[sml], "RETURN_FLDS") == null) {
                    var lname = NewDOM.createElement("RETURN_FLDS");
                    summlov[sml].appendChild(lname);
                    setNodeText(selectSingleNode(summlov[sml], "RETURN_FLDS"), "");
                }
                if (selectSingleNode(summlov[sml], "BIND_FLDS") == null) {
                    var lname = NewDOM.createElement("BIND_FLDS");
                    summlov[sml].appendChild(lname);
                    setNodeText(selectSingleNode(summlov[sml], "BIND_FLDS"), "");
                }

            }
        }
        var sum = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY");
        if (sum.length > 0) {
            if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != "DASHBOARD") {
                if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_SCREEN_SIZE") == null) {
                    var lname = NewDOM.createElement("SUM_SCREEN_SIZE");
                    selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY").appendChild(lname);
                    setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_SCREEN_SIZE"), "MEDIUM");
                }
                else if (getNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_SCREEN_SIZE")) == "SMALL") {
                    setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_SCREEN_SIZE"), "MEDIUM");
                }
            }

            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_QUERYORDER") == null) {
                var lname = NewDOM.createElement("SUM_QUERYORDER");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY").appendChild(lname);
                lname = NewDOM.createElement("SUM_RESULTORDER");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY").appendChild(lname);

                //
                var Smryflds = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUMMARY_DETAILS");
                var SmryQlds = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUMMARY_DETAILS[QUERY='Y']");
                var smrqryord = ""
                var smrrsltord = ""
                for (var i = 0;i < Smryflds.length;i++) {
                    var fldn = getNodeText(selectSingleNode(Smryflds[i], "FIELD_NAME"));
                    if (i > 0)
                        smrrsltord = smrrsltord + "~" + fldn;
                    else 
                        smrrsltord = fldn;
                }
                for (i = 0;i < Smryflds.length;i++) {
                    var fldn = getNodeText(selectSingleNode(Smryflds[i], "FIELD_NAME"));
                    var fldqry = getNodeText(selectSingleNode(Smryflds[i], "QUERY"));
                    if (fldqry == "Y") {
                        if (smrqryord != "")
                            smrqryord = smrqryord + "~" + fldn;
                        else 
                            smrqryord = fldn;
                    }
                }
                //
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_RESULTORDER"), smrrsltord);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_QUERYORDER"), smrqryord);
            }
            else {
                var Smryflds = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUMMARY_DETAILS");
                var SmryQlds = selectNodes(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUMMARY_DETAILS[QUERY='Y']");

                var smrqryord = getNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_QUERYORDER"));
                var smrrsltord = getNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_RESULTORDER"));

                var smrrrd = smrrsltord.split("~");
                var smrord = smrqryord.split("~");
                var sor = 0;
                var sres = 0;

                for (var s = 0;s < Smryflds.length;s++) {
                    for (sr = 0;sr < smrrrd.length;sr++) {
                        if (smrrrd[sr] == getNodeText(selectSingleNode(Smryflds[s], "FIELD_NAME"))) {
                            sres++;
                        }
                    }
                    for (sr = 0;sr < smrord.length;sr++) {
                        if (smrord[sr] == getNodeText(selectSingleNode(Smryflds[s], "FIELD_NAME"))) {
                            sor++;
                        }
                    }
                }

                if ((smrrsltord == "" && smrqryord == "") || (Smryflds.length != smrrsltord.split("~").length) || (SmryQlds.length != smrqryord.split("~").length) || ((smrrrd.length != sres || smrord.length != sor))) {
                    smrrsltord = "";
                    smrqryord = "";
                    for (var i = 0;i < Smryflds.length;i++) {
                        var fldn = getNodeText(selectSingleNode(Smryflds[i], "FIELD_NAME"));
                        if (i > 0)
                            smrrsltord = smrrsltord + "~" + fldn;
                        else 
                            smrrsltord = fldn;
                    }
                    for (i = 0;i < Smryflds.length;i++) {
                        var fldn = getNodeText(selectSingleNode(Smryflds[i], "FIELD_NAME"));
                        var fldqry = getNodeText(selectSingleNode(Smryflds[i], "QUERY"));
                        if (fldqry == "Y") {
                            if (smrqryord != "")
                                smrqryord = smrqryord + "~" + fldn;
                            else 
                                smrqryord = fldn;
                        }
                    }
                }

                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_QUERYORDER"), smrqryord);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_SUMMARY/SUM_RESULTORDER"), smrrsltord);
            }
        }
        //update table
        var screens = selectNodes(NewDOM, "//" + mainNode + "/RAD_DATASOURCES");
        for (var j = 0;j < screens.length;j++) {
            var datasrcnm = getNodeText(selectSingleNode(screens[j], "DATASRC_NAME"));
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']/UPLOAD_TABLE") == null) {
                var lname = NewDOM.createElement("UPLOAD_TABLE");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']/UPLOAD_TABLE"), "");
            }
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']/UP_TBL_PK_COLS") == null) {
                var lname = NewDOM.createElement("UP_TBL_PK_COLS");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']/UP_TBL_PK_COLS"), "");
            }
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']/UP_TBL_WHERE_CLAUSE") == null) {
                var lname = NewDOM.createElement("UP_TBL_WHERE_CLAUSE");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']/UP_TBL_WHERE_CLAUSE"), "");
            }
            var scrargs = selectNodes(NewDOM, "//" + mainNode + "/RAD_DATASOURCES[DATASRC_NAME='" + datasrcnm + "']/RAD_FIELDS");
            for (var k = 0;k < scrargs.length;k++) {
                if (selectSingleNode(scrargs[k], "NOT_REQD_IN_UPLOAD_PKGS") == null) {
                    var active = NewDOM.createElement("NOT_REQD_IN_UPLOAD_PKGS");
                    scrargs[k].appendChild(active);
                    setNodeText(selectSingleNode(scrargs[k], "NOT_REQD_IN_UPLOAD_PKGS"), "N");
                }
                if (selectSingleNode(scrargs[k], "UPLD_TABLE_COLUMN") == null) {
                    var active = NewDOM.createElement("UPLD_TABLE_COLUMN");
                    scrargs[k].appendChild(active);
                    setNodeText(selectSingleNode(scrargs[k], "UPLD_TABLE_COLUMN"), "");
                }
                if (selectSingleNode(scrargs[k], "MAX_DECIMALS") == null) {
                    var active = NewDOM.createElement("MAX_DECIMALS");
                    scrargs[k].appendChild(active);
                    setNodeText(selectSingleNode(scrargs[k], "MAX_DECIMALS"), "");
                }
            }
        }
        // update table
        //updating SUMMARYQUERY
        var screens = selectNodes(NewDOM, "//" + mainNode + "/RAD_ACTIONS");
        for (var j = 0;j < screens.length;j++) {
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS/SERVICE_NAME") == null) {
                var lname = NewDOM.createElement("SERVICE_NAME");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS/SERVICE_NAME"), "");
            }
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS/OPERATION_ID") == null) {
                var lname = NewDOM.createElement("OPERATION_ID");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS/OPERATION_ID"), "");
            }
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS/RAD_XSD_TYPE_NAME") == null) {
                var lname = NewDOM.createElement("RAD_XSD_TYPE_NAME");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_ACTIONS/RAD_XSD_TYPE_NAME"), "");
            }
            if (selectSingleNode(screens[j], "RAD_XSD_TYPE_NAME") != null) {
                var datasrcnm = getNodeText(selectSingleNode(screens[j], "RAD_XSD_TYPE_NAME"));
                var scrargs = selectNodes(NewDOM, "//" + mainNode + "/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + datasrcnm + "']/RAD_ACTION");
                if (scrargs.length > 2) {
                    if (scrargs[11] == null) {
                        var active = loadXMLDoc("<RAD_ACTION ID=\"SUMMARYQUERY\"><ACTION_CODE>SUMMARYQUERY</ACTION_CODE><OPERATION_CODE></OPERATION_CODE><WEBSERVICE_APPLICABLE>N</WEBSERVICE_APPLICABLE><ACTION_STAGE_TYPE>1</ACTION_STAGE_TYPE></RAD_ACTION>");
                        screens[j].appendChild(active.lastChild);
                    }
                }
            }
        }
        // update table
    }
    return NewDOM;

}

function fnAttrival(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (srcElement.value == "N") {
        getNextSibling(srcElement.parentNode).children[0].value = 0;
    }
    else 
        getNextSibling(srcElement.parentNode).children[0].value = "";
}

function fn_enableFieldsetFields(fldset, flag) {

    if (flag != '2') {
        var basefieldset = selectNodes(basedom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']");
        var prvsRelsName = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']"))[0], ("RELEASE_NAME")));
        var prvsRelsType = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']"))[0], ("RELEASE_TYPE")));
        if (prvsRelsName == parent.relName && prvsRelsType == parent.relType && basefieldset.length == 0) {
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[0], false);
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[1], false);
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[2], false);
            document.getElementById('FDN').getElementsByTagName("fieldset")[2].getElementsByTagName("INPUT")[3].disabled = false;
            document.getElementById('FDN').getElementsByTagName("TABLE")[1].getElementsByTagName("SELECT")[0].disabled = false;
            FildSetValidations(fldset);
        }
        else {
            document.getElementById('FDN').getElementsByTagName("TABLE")[1].getElementsByTagName("SELECT")[0].disabled = false;
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[0], true);
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[1], false);
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[2], false);
            document.getElementById('FDN').getElementsByTagName("fieldset")[2].getElementsByTagName("INPUT")[3].disabled = false;
            FildSetValidations(fldset);
        }
        if (getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_VISIBLE")) == 'N') {
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[0], true);
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[1], true);
            disableFormElm(document.getElementById('FDN').getElementsByTagName("fieldset")[2], true);
            document.getElementById('FDN').getElementsByTagName("TABLE")[1].getElementsByTagName("SELECT")[0].disabled = true;
            try {
                document.getElementById('FDN').getElementsByTagName("fieldset")[2].getElementsByTagName("INPUT")[3].disabled = false;
            }
            catch (e) {
            }
            //disableFormElm(document.getElementById('FDN').getElementsByTagName("TABLE")[0],true);
        }
    }

    if (flag == '2') {
        disableFormElm(parent.document.getElementById('FDN').getElementsByTagName("fieldset")[0], false);
        disableFormElm(parent.document.getElementById('FDN').getElementsByTagName("fieldset")[1], false);
        disableFormElm(parent.document.getElementById('FDN').getElementsByTagName("fieldset")[2], false);
        try {
            parent.document.getElementById('FDN').getElementsByTagName("TABLE")[1].getElementsByTagName("SELECT")[0].disabled = false;
        }
        catch (e) {
        }
        //disableFormElm(parent.document.getElementById('FDN').getElementsByTagName("TABLE")[0],false);
    }
}

function fn_enableScreens(scrname, flag) {
    /*
  if (flag!='2'){
  var basefieldset=selectNodes(basedom,"//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='"+scrname+"']");
  var prvsRelsName=getNodeText(selectSingleNode(selectNodes(dom,("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='"+scrname+"']"))[0],("RELEASE_NAME")));
    var prvsRelsType=getNodeText(selectSingleNode(selectNodes(dom,("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='"+scrname+"']"))[0],("RELEASE_TYPE")));
	if(prvsRelsName==parent.relName && prvsRelsType==parent.relType && basefieldset.length==0){
	document.getElementById('SSC').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[0].disabled=false; 
    document.getElementById('SSC').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[1].disabled=false; 
	}else{
	document.getElementById('SSC').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[0].disabled=true; 
    document.getElementById('SSC').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[1].disabled=true; 	   
        
	}
	}
	 if (flag=='2')
	 {
	 parent.document.getElementById('SSC').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[0].disabled=false; 
     parent.document.getElementById('SSC').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[1].disabled=false; 
		
	 }*/
}

function fn_enableTab(scrname, scrportion, tabname, flag) {
    /*
  if (flag!='2'){
   var basefieldset=selectNodes(basedom,"//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='"+scrname+"']/"+scrportion+"/RAD_TABS[TAB_NAME='"+tabname+"']");
  var prvsRelsName=getNodeText(selectSingleNode(selectNodes(dom,("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='"+scrname+"']/"+scrportion+"/RAD_TABS[TAB_NAME='"+tabname+"']"))[0],("RELEASE_NAME")));
    var prvsRelsType=getNodeText(selectSingleNode(selectNodes(dom,("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='"+scrname+"']/"+scrportion+"/RAD_TABS[TAB_NAME='"+tabname+"']"))[0],("RELEASE_TYPE")));
	if(prvsRelsName==parent.relName && prvsRelsType==parent.relType && basefieldset.length==0 ){
	document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[0].disabled=false;
	document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[1].disabled=false;
	  
	  document.getElementById('TAB').getElementsByTagName("fieldset")[1].getElementsByTagName('INPUT')[1].disabled=false;
	  document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('SELECT')[0].disabled=false;
	  document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('BUTTON')[0].disabled=false;  
	}else{
	document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[0].disabled=true;
	  document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[1].disabled=true;
	  
	  document.getElementById('TAB').getElementsByTagName("fieldset")[1].getElementsByTagName('INPUT')[1].disabled=true;
	  document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('SELECT')[0].disabled=true;
	  document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('BUTTON')[0].disabled=true;
	}
	}
	 
	 if (flag=='2')
	 {
	  parent.document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[0].disabled=false;
	  parent.document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('INPUT')[1].disabled=false;	  
	  parent.document.getElementById('TAB').getElementsByTagName("fieldset")[1].getElementsByTagName('INPUT')[1].disabled=false;
	  parent.document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('SELECT')[0].disabled=false;
	  parent.document.getElementById('TAB').getElementsByTagName("fieldset")[0].getElementsByTagName('BUTTON')[0].disabled=false;
	  
	 }*/
}

function fn_val_MoveToDtBlkFlds(formname, fldset, fields, index) {
    if (formname == 'FLD') {
        for (var j = 0;j < fields.length;j++) {
            var prvsRelsType = document.getElementById('FieldsetFields').tBodies[0].rows[index[j]].cells[3].getElementsByTagName('INPUT')[0].value;
            var prvsRelsName = document.getElementById('FieldsetFields').tBodies[0].rows[index[j]].cells[4].getElementsByTagName('INPUT')[0].value;
            var basefieldset = selectNodes(basedom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS[FIELD_NAME='" + fields[j] + "']");

            if (prvsRelsName == parent.relName && prvsRelsType == parent.relType && basefieldset.length == 0) {

            }
            else {
                document.getElementById('FieldsetFields').tBodies[0].rows[index[j]].cells[5].getElementsByTagName('INPUT')[0].value = 'N';

            }

        }

    }

}

function fnStatus(field) {
    var tempValue = field.parentNode.parentNode.getElementsByTagName('INPUT')[1].value;
    var tempIndex = tempValue.indexOf('__');
    parent.g_DDLtableName = tempValue.substring(0, tempIndex);
    loadChildSubScreenDIV1("ChildWin1", "RadDetailscreen.jsp");
}
/*
function fnExecutequery_DDLdetails() {
    var batchRef = parent.ddlbatchRefNo;
    g_DDLtableName = parent.g_DDLtableName;
    var headerQuery = "FETCH@SELECT TOTAL_RECORDS,RECORDS_INSERTED,RECORDS_DELETED,RECORDS_UPDATED,RECORDS_FAILED,RECORDS_IGNORED,FILE_NAME FROM DLTU_BATCH_TABLES where batch_ref_no= '" + batchRef + "' and table_name='" + g_DDLtableName + "'";
    var sumaryQuery = "FETCH@SELECT RECORD_NO,RECORD_KEY,RECORD_ACTION,STATUS,ERROR FROM DLTU_BATCH_RECORDS where batch_ref_no= '" + batchRef + "' and table_name='" + g_DDLtableName + "'";
    var tableheaderObj = document.getElementById("DdlStatus");
    var tableSumObj = document.getElementById("Detail_ScreenTB");
    fnDDLSummary(headerQuery, "DdlStatus");
    fnDDLSummary(sumaryQuery, "Detail_ScreenTB");

}

function fnDDLSummary(queryData, tblname) {
    parent.parent.gReqType = "APP";
    parent.parent.gReqCode = "EXECUTEQUERY";
    var radReqDOM = parent.parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryData);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

    var response = parent.parent.fnPost(getXMLString(radReqDOM) + parent.parent.gBodySeparator + "");
    var multRec = "";
    var tableObj = document.getElementById(tblname);
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    if (tblname == 'Detail_ScreenTB') {

        for (var sr = 0;sr < multRec.length;sr++) {
            if (multRec[sr] != "") {
                var singleRec = multRec[sr].split("~");
                addNewRow(tblname);
                for (var pnt = 0;pnt < singleRec.length;pnt++) {
                    if (singleRec[pnt] == "null") {
                        try {
                            tableObj.tBodies[0].rows[sr].cells[pnt].getElementsByTagName("INPUT")[0].value = "";
                        }
                        catch (e) {
                            tableObj.tBodies[0].rows[sr].cells[pnt].getElementsByTagName("SELECT")[0].value = "";
                        }
                    }
                    else {
                        if (pnt == 1) {
                            var singleRec1 = singleRec[pnt].split(",");
                            singleRec[pnt] = singleRec1[singleRec1.length - 1];
                        }
                        try {
                            tableObj.tBodies[0].rows[sr].cells[pnt].getElementsByTagName("INPUT")[0].value = singleRec[pnt];
                        }
                        catch (e) {
                            tableObj.tBodies[0].rows[sr].cells[pnt].getElementsByTagName("SELECT")[0].value = singleRec[pnt];
                        }
                    }
                }
            }
        }
    }
    else if (tblname == 'DdlStatus') {

        var singleRec = multRec[0].split("~");
        for (var pnt = 0;pnt < singleRec.length;pnt++) {
            if (singleRec[pnt] == 'null') {
                document.getElementById(tblname).getElementsByTagName('INPUT')[pnt].value = '0';
            }
            else {
                document.getElementById(tblname).getElementsByTagName('INPUT')[pnt].value = singleRec[pnt];
            }
        }

    }

}
*/

function loadChildSubScreenDIV1(divId, src) {
    // for detiails button in release of units
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    //customWin.style.zIndex = 1;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe src="' + src + '" class="frames" title="iFrame" allowtransparency="true" frameborder="0" scrolling="no" id="IFCHILD1"></iframe>';
    customWin.innerHTML = customWinData;
    parent.document.getElementById("Div_ChildWin").appendChild(customWin);
    parent.document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = parent.document.getElementById(divId);
    winObj.style.top = 0 + "px";
    winObj.style.left = parent.document.getElementById("Dleft").offsetWidth + 5 + "px";
    winObj.style.visibility = "visible";
    winObj.style.display = "block";

}

function fnTestConnection() {

    var queryString = "TEST_SUCCESS";
	var WhereString="";
    try {
        parent.parent.gReqType = "APP";
        parent.parent.gReqCode = parent.parent.gAction;
        var radReqDOM = parent.parent.buildRADXml();
        var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
        var tempNode = radReqDOM.createElement("QUERY");
        bodyNode.appendChild(tempNode);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
		setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
        var response = parent.parent.fnPost(getXMLString(radReqDOM) + parent.parent.gBodySeparator + "");
    }
    catch (e) {
        parent.gReqType = "APP";
        parent.gReqCode = parent.gAction;
        var radReqDOM = parent.buildRADXml();
        var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
        var tempNode = radReqDOM.createElement("QUERY");
        bodyNode.appendChild(tempNode);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
		setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    }

    try {
        var multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
        return true;
    }
    catch (e) {
        try {
            alertMessage("Unable to Connect to User Schema", "E");
        }
        catch (e) {
            try {
                parent.alertMessage("Unable to Connect to User Schema", "E");
            }
            catch (e) {
                parent.parent.alertMessage("Unable to Connect to User Schema", "E");
            }
        }
        return false;
    }
}

function fnHideInactiveFields(tablename) {
    var tableobj = document.getElementById(tablename).tBodies[0];
    var len = tableobj.rows.length;
    for (var i = 0;i < len;i++) {
        if (tableobj.rows[i].cells[5].getElementsByTagName('INPUT')[0].value == 'N') {
            //document.getElementById(tablename).getElementsByTagName('TBODY')[0].getElementsByTagName('TR')[i].style.visibility='hidden';
            document.getElementById(tablename).getElementsByTagName('TBODY')[0].getElementsByTagName('TR')[i].style.display = "none";
            var obj = tableobj.rows[i].cloneNode(true);
            obj.getElementsByTagName('INPUT')[4].value = 'N';
            tableobj.appendChild(obj);
            tableobj.deleteRow(i);
            len = len - 1;
            i = i - 1;
        }
    }
}

function fnSetChildFId(dom) {
    var ndLen = selectNodes(dom, "//RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID").length;
    for (var nl = 0;nl < ndLen;nl++) {
        if (getNodeText(selectNodes(dom, "//RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID")[nl]).substr(2, 1) == "D") {
            setNodeText(selectNodes(dom, "//RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID")[nl], document.getElementsByName("FUNCTION_ID")[0].value);
        }
        else if (getNodeText(selectNodes(dom, "//RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID")[nl]).substr(2, 1) == "S") {
            var sumryFid = document.getElementsByName("FUNCTION_ID")[0].value.substr(0, 2) + "S" + document.getElementsByName("FUNCTION_ID")[0].value.substr(3, document.getElementsByName("FUNCTION_ID")[0].value.length);
            setNodeText(selectNodes(dom, "//RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID")[nl], sumryFid);
        }
    }
    return dom;
}

function fnMinimize(target, e) {
    var e = window.event || e;
    var srcElement = e.srcElement || e.target;
    if (srcElement.disabled || (e.shiftKey == true && e.keyCode == 9) || e.keyCode == 9)
        return;
    var ifr = parent.document.getElementById(target);
    ifr.style.visibility = "hidden";
    parent.document.getElementById("LAND_BROWSER").focus();
}

function startDrag(target, e) {
    var evt = window.event || e;
    var divObj = parent.document.getElementById(target);
    if (parent.document.getElementById("ChildWin")) {
    }
    else {
    }
    divObj.style.cursor = "default";
    var x = evt.clientX;
    var y = evt.clientY;
    var initx = divObj.offsetLeft;
    var inity = divObj.offsetTop;
    document.onmousemove = function (e) {
        var evt = window.event || e;
        var ex = evt.clientX;
        var ey = evt.clientY;
        var dx = ex - x;
        var dy = ey - y;
        var ypos = inity + dy;
        var tBarHgt = 0;
        if (parent.document.getElementById("WNDtitlebar") != null) {
            tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight *  - 1;
        }
        else if (typeof (mainWin) != "undefined") {
            tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
        }
        if (ypos > (tBarHgt + 4)) {
            divObj.style.left = initx + dx + "px";
            divObj.style.top = inity + dy + "px";
            initx = initx + dx;
            inity = ypos;
        }
        else {
            divObj.style.top = (tBarHgt + 4) + "px";
            inity = tBarHgt + 4;
        }
    };
    document.onmouseup = function (event) {
        divObj.style.cusor = "default";
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function fnAccessChildScreens(e) {
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (e.keyCode == 120) {
        if (srcElement.tagName == "INPUT" && srcElement.type.toUpperCase() == 'TEXT') {
            if (typeof (srcElement.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
                srcElement.parentNode.getElementsByTagName("BUTTON")[0].click();
            }
        }
    }
    else if (e.keyCode == 9 && !e.shiftKey && srcElement.id == "Cancel") {
        document.getElementById("WINCLOSE").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return false;
    }
    else if (e.keyCode == 9 && e.shiftKey && srcElement.id == "WINCLOSE") {
        document.getElementById("Cancel").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return false;
    }
    else if (e.keyCode == 27) {
        fnRADExitSub('ChildWin', e);
        return false;
    }
    else if ((e.keyCode == 37 || e.keyCode == 39) && (srcElement.id.indexOf("TAB_DIV") == 0)) {
        var tabs = srcElement.parentNode.parentNode.getElementsByTagName("A");
        for (var t = 0;t < tabs.length;t++) {
            if (tabs[t].id == srcElement.id) {
                if (e.keyCode == 37) {
                    if (t == 0)
                        return;
                    FnShowTabs(tabs[t - 1].id.substring(4, tabs[t - 1].id.length));
                    document.getElementById(tabs[t - 1].id).focus();
                    return;
                }
                else if (e.keyCode == 39) {
                    if (t == tabs.length)
                        return;
                    FnShowTabs(tabs[t + 1].id.substring(4, tabs[t + 1].id.length));
                    document.getElementById(tabs[t + 1].id).focus();
                    return;
                }
            }
        }

    }
    else if (e.keyCode == 113) {
        parent.switchWindows();
        fnDisableBrowserKey(e);
        disableCommonKeys(e);
        return;
    }
    else if (e.ctrlKey == true && e.keyCode == 87) {
        fnRADExitAll(seqNo, e);
        disableCommonKeys(e);
        return;
    }
    else if (e.keyCode == 9 && e.shiftKey == true || (e.keyCode == 13) || (e.keyCode == 32) || (e.keyCode == 123) || (e.keyCode == 9)) {
    }
    else if ((e.keyCode == 37 && e.altKey == true) || (e.keyCode == 36 && e.altKey == true)) {
        fnDisableBrowserKey(e);
        disableCommonKeys(e);
        return;
    }
    else {
        disableCommonKeys(e);
        return;
    }
    return true;
}

function disableFormElm(container, isDisabled) {
    var tagNames = ["INPUT", "SELECT", "TEXTAREA"];
    for (var i = 0;i < tagNames.length;i++) {
        var elems = container.getElementsByTagName(tagNames[i]);
        for (var j = 0;j < elems.length;j++) {
            elems[j].disabled = isDisabled;
            elems[j].readonly = isDisabled;
            if (tagNames[i] == "BUTTON") {
                if (isDisabled == true)
                    elems[j].style.visibility = "hidden";
                else 
                    elems[j].style.visibility = "visible";
            }
        }
    }
}

function fnDelOldNodes(NewDOM) {

    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);

    NewDOM = loadXMLDoc(getXMLString(NewDOM).toString());
    if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/DELET_OLDNODES_DONE") == null) {
        var orderCorrection = traildom.createElement("DELET_OLDNODES_DONE");
        var funcNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS");
        funcNode.insertBefore(orderCorrection, selectSingleNode(funcNode, "RAD_KERNEL"));
        setNodeText(selectSingleNode(funcNode, "DELET_OLDNODES_DONE"), "N");

    }
    if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/DELET_OLDNODES_DONE")) == "") {
        setNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/DELET_OLDNODES_DONE"), "N");
    }

    if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/DELET_OLDNODES_DONE")) == 'N') {
        var RelNds = "RAD_KERNEL~RAD_CLUSTER~RAD_CUSTOM~RAD_CUSTOMER~RAD_CHILD_KERNEL~RAD_CHILD_CLUSTER~RAD_CHILD_CUSTOM~RAD_CHILD_CUSTOMER~RAD_SCRCHLD_KERNEL~RAD_SCRCHLD_CLUSTER~RAD_SCRCHLD_CUSTOM~RAD_SCRCHLD_CUSTOMER".split("~");

        for (var r = 0;r < RelNds.length;r++) {
            if (selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r]).length != 0) {

                var DataBlkNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS");
                for (i = 0;i < DataBlkNode.length;i++) {
                    var NodeName = DataBlkNode[i].getAttribute("ID");
                    var fldNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS");
                    for (var item = 0;item < fldNode.length;item++) {
                        var fldName = fldNode[item].getAttribute("ID");
                        // removing COPY_FROM_BLOCK
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/COPY_FROM_BLOCK");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing COPY_FROM_FIELD
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/COPY_FROM_FIELD");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing CALENDAR_TEXT
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/CALENDAR_TEXT");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing ACCESSKEY_CODE
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/ACCESSKEY_CODE");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing IMAGE_SRC 
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/IMAGE_SRC");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing SELECT_MULTIPLE 
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/SELECT_MULTIPLE");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing MASK
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/MASK");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing ALT_IMAGE
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/ALT_IMAGE");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing FIELD_ID
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/FIELD_ID");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing OPTION_LINK
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/OPTION_LINK");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing AMENDABLE
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/AMENDABLE");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing TEXT_ALIGN
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/TEXT_ALIGN");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing ALL_RECORDS
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']/ALL_RECORDS");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                    }
                }
                // removing FORM_TITLE
                var DataBlkNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_LOVS");
                for (i = 0;i < DataBlkNode.length;i++) {
                    var NodeName = DataBlkNode[i].getAttribute("ID");
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_LOVS[@ID='" + NodeName + "']/FORM_TITLE");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_LOVS[@ID='" + NodeName + "']").removeChild(delNode);
                    }
                    catch (e) {
                    }

                }
                // removing AEOD_AWARE
                var DataBlkNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_FUNC_PREFERENCES");
                for (i = 0;i < DataBlkNode.length;i++) {
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_FUNC_PREFERENCES/AEOD_AWARE");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_FUNC_PREFERENCES").removeChild(delNode);
                    }
                    catch (e) {
                    }

                }
                var DataBlkNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS");
                for (i = 0;i < DataBlkNode.length;i++) {
                    var NodeName = DataBlkNode[i].getAttribute("ID");
                    // removing SCREEN_ID
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/SCREEN_ID");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']").removeChild(delNode);
                    }
                    catch (e) {
                    }
                    // removing SCREEN_HEIGHT
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/SCREEN_HEIGHT");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']").removeChild(delNode);
                    }
                    catch (e) {
                    }
                    // removing SCREEN_WIDTH
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/SCREEN_WIDTH");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']").removeChild(delNode);
                    }
                    catch (e) {
                    }
                    // removing VERSION_BTN_REQD
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/VERSION_BTN_REQD");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']").removeChild(delNode);
                    }
                    catch (e) {
                    }
                    // removing TAB_ACCESS_KEY from HEADER
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/HEADER/TAB_ACCESS_KEY");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/HEADER").removeChild(delNode);
                    }
                    catch (e) {
                    }
                    // removing TAB_ACCESS_KEY from BODY
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/BODY/TAB_ACCESS_KEY");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/BODY").removeChild(delNode);
                    }
                    catch (e) {
                    }
                    // removing TAB_ACCESS_KEY from FOOTER
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER/TAB_ACCESS_KEY");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER").removeChild(delNode);
                    }
                    catch (e) {
                    }

                }
                // removing CALLFORM_PATH
                var DataBlkNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_CALLFORM");
                for (i = 0;i < DataBlkNode.length;i++) {
                    var NodeName = DataBlkNode[i].getAttribute("ID");
                    try {
                        var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_CALLFORM[@ID='" + NodeName + "']/CALLFORM_PATH");
                        selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_CALLFORM[@ID='" + NodeName + "']").removeChild(delNode);
                    }
                    catch (e) {
                    }

                }

                var DataBlkNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SUMMARY");
                for (i = 0;i < DataBlkNode.length;i++) {
                    var NodeName = DataBlkNode[i].getAttribute("ID");
                    var fldNode = selectNodes(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SUMMARY[@ID='" + NodeName + "']/SUMMARY_DETAILS");
                    for (var item = 0;item < fldNode.length;item++) {
                        var fldName = fldNode[item].getAttribute("ID");
                        // removing RESULT
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SUMMARY[@ID='" + NodeName + "']/SUMMARY_DETAILS[@ID='" + fldName + "']/RESULT");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SUMMARY[@ID='" + NodeName + "']/SUMMARY_DETAILS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                        // removing ADVANCED
                        try {
                            var delNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SUMMARY[@ID='" + NodeName + "']/SUMMARY_DETAILS[@ID='" + fldName + "']/ADVANCED");
                            selectSingleNode(NewDOM, "//RAD_FUNCTIONS/" + RelNds[r] + "/RAD_SUMMARY[@ID='" + NodeName + "']/SUMMARY_DETAILS[@ID='" + fldName + "']").removeChild(delNode);
                        }
                        catch (e) {
                        }
                    }
                }
            }
        }
        setNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/DELET_OLDNODES_DONE"), 'Y');
    }
    return NewDOM;
}

//VINIT IS_INDEXED
function myFunctionisindex(x) {
    var tab = document.getElementById('lovDetails').tBodies[0]
    var rowindex = x.parentNode.parentNode.rowIndex - 1;

    var isindex = tab.rows[rowindex].cells[7].getElementsByTagName("SELECT")[0];
    var minsearch = tab.rows[rowindex].cells[8].getElementsByTagName("INPUT")[0];

    if (isindex.value != "" && isindex.value == 'Y') {
        minsearch.value = 3;
        minsearch.disabled = false;

    }
    else {
        minsearch.value = "";
        minsearch.disabled = true;
    }
}

function myFunction(x) {
    var tab = document.getElementById('lovDetails').tBodies[0]
    var rowindex = x.parentNode.parentNode.rowIndex - 1;

    var redfld = tab.rows[rowindex].cells[4].getElementsByTagName("SELECT")[0];
    var isindex = tab.rows[rowindex].cells[7].getElementsByTagName("SELECT")[0];
    var minsearch = tab.rows[rowindex].cells[8].getElementsByTagName("INPUT")[0];

    if (redfld.value != "" && redfld.value == 'Y') {
        isindex.value = 'Y';
        minsearch.value = 3;
        isindex.disabled = false;
        minsearch.disabled = false;

    }
    else {
        isindex.value = 'N';
        minsearch.value = "";
        isindex.disabled = true;
        minsearch.disabled = true;
    }
}
function findMinSrchChr(x) {
    // var selparentblk = document.getElementsByName("lovDetails")[0].tBodies[0].rows[0].cells[8].getElementsByTagName("INPUT")[0].value;
    var tab = document.getElementById('lovDetails').tBodies[0]
    var rowindex = x.parentNode.parentNode.rowIndex - 1;
    var minsearch = tab.rows[rowindex].cells[8].getElementsByTagName("INPUT")[0];

    if (minsearch.value < 3) {
        alertMessage("Min search char value should minimum be 3 ", 'I');
        minsearch.value = 3;
        //alert("Master block cannot have parent"); 
    }
}

function Fn_SmLv_Dtls(tab) {
    var currRow = tab.parentElement.parentElement.rowIndex - 1;
    var tableObject = document.getElementById("SUM_DTLS");

    var LovId = tableObject.tBodies[0].rows[currRow].cells[4].getElementsByTagName("INPUT")[0].value;
    var MnCrLng = tableObject.tBodies[0].rows[currRow].cells[5].getElementsByTagName("INPUT")[0].value;
    var rtnfd = tableObject.tBodies[0].rows[currRow].cells[6].getElementsByTagName("INPUT")[0].value;
    var bndFlds = tableObject.tBodies[0].rows[currRow].cells[7].getElementsByTagName("INPUT")[0].value;

    loadSubScreenDIV("ChildWin", "RadLOVSummary.jsp?&rowid=" + currRow + "&lovName=" + LovId + "&Mincharln=" + MnCrLng + "&RetrnFld=" + rtnfd + "&bndFlds=" + bndFlds);
}