/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadCallFrmArgs.js
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

var localDom = parent.dom;
var calFrmName = parent.parentcalFrmName;
var calFrmArgs = parent.parentcalFrmArgs;
var scrArg = parent.parentscrArg;
var Datscr = parent.parent.jndiName;
var lcfrm = parent.parentlcfrm;

function fn_populate_Blocks_toScreenArgs(node, tablename, frmname, fld, cellno) {

    if (node == "RAD_DATA_BLOCKS") {
        var nodename = "BLOCK_NAME";
    }
    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        obj = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0];
        obj.options.length = 0
        var blks = selectNodes(localDom, "//" + node + "");
        var blkslen = blks.length;
        addOption(obj, "", "", true);
        for (var i = 0;i < blkslen;i++) {
            addOption(obj, getNodeText(selectSingleNode(blks[i], nodename)), getNodeText(selectSingleNode(blks[i], nodename)), false);
        }

    }
}

function reSetCallFormScrArg() {

    var tblObject = document.getElementById('ClfArgnts');

    deleteAll1('ClfArgnts');
    top.parent.gReqCode = 'UICONTROLLER';
    top.parent.gReqType = "APP";
    var radReqDOM = top.parent.buildRADXml();
    var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R014" + top.parent.gBodySeparator + calFrmName, "RADClientHandler");

    response = getXMLString(response);
    var ScrArgs = response.substring(response.indexOf("<SCRARG>") + 8, response.indexOf("</SCRARG>"));
    if (ScrArgs != "") {
        if (ScrArgs != "null") {
            ScrArgs = ScrArgs.split("~");
            for (var i = 0;i < ScrArgs.length;i++) {
                if (ScrArgs[i] != "") {
                    addNewRow1('ClfArgnts');
                    tblObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = ScrArgs[i];
                    fn_populate_Blocks_toScreenArgs('RAD_DATA_BLOCKS', 'ClfArgnts', 'frmclfargs', 'BLOCK_NAME', 2);
                }
            }
        }
    }
}

function fn_populate_Blocks(node, tablename, frmname, fld, cellno) {

    if (node == "RAD_DATA_BLOCKS") {
        var nodename = "BLOCK_NAME";
    }
    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        for (var i = 0;i < tablen;i++) {

            if (tab.rows[i].cells[0].getElementsByTagName('INPUT')[0].checked == true) {
                obj = tab.rows[i].cells[cellno].getElementsByTagName('SELECT')[0];
                obj.options.length = 0;
                if (tablename == "dpndtflds") {
                    tab.rows[i].cells[2].getElementsByTagName('SELECT')[0].options.length = 0;
                }
                else if (tablename == "ClfArgnts") {
                    tab.rows[i].cells[3].getElementsByTagName('SELECT')[0].options.length = 0;
                }
                var blks = selectNodes(localDom, "//" + node + "");
                var blkslen = blks.length;
                addOption(obj, "", "", true);
                for (var j = 0;j < blkslen;j++) {
                    addOption(obj, getNodeText(selectSingleNode(blks[j], nodename)), getNodeText(selectSingleNode(blks[j], nodename)), false);
                }
            }
        }

    }
}

function showCalFrmArgs() {

    var tableObject = document.getElementById('ClfArgnts');
    var dbScrArgs = parent.parentscrArg;
    deleteAll1('ClfArgnts');
    var ScrArgs = new Array();
    if (calFrmArgs != "") {
        ScrArgs = parent.parentcalFrmArgs.split(":");
        for (var i = 0;i < ScrArgs.length;i++) {
            addNewRow1('ClfArgnts');
            var ScrArgvals = new Array();
            ScrArgvals = ScrArgs[i].split("~");
            tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = ScrArgvals[0];
            var Scrblk = new Array();
            if (ScrArgvals[1] != "")
                Scrblk = ScrArgvals[1].split("__");
            var optn = document.createElement("OPTION");
            optn.text = Scrblk[0];
            optn.value = Scrblk[0];
            tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("SELECT")[0].options.add(optn);
            var optn1 = document.createElement("OPTION");
            optn1.text = Scrblk[1];
            optn1.value = Scrblk[1];
            tableObject.tBodies[0].rows[i].cells[3].getElementsByTagName("SELECT")[0].options.add(optn1);
            tableObject.tBodies[0].rows[i].cells[4].getElementsByTagName("INPUT")[0].value = ScrArgvals[2];
        }

        var dbArgs = new Array();
        dbArgs = dbScrArgs.split("~");
        if (dbArgs[0] != "") {
            for (var j = 0;j < dbArgs.length;j++) {
                var tmp = 0;
                for (var k = 0;k < tableObject.tBodies[0].rows.length;k++) {
                    if (tableObject.tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value == dbArgs[j]) {
                        tmp = 1;
                    }
                }
                if (tmp == 0) {
                    addNewRow1('ClfArgnts');
                    tableObject.tBodies[0].rows[tableObject.tBodies[0].rows.length - 1].cells[1].getElementsByTagName("INPUT")[0].value = dbArgs[j];
                    fn_populate_Blocks_toScreenArgs('RAD_DATA_BLOCKS', 'ClfArgnts', 'frmclfargs', 'BLOCK_NAME', 2);
                }
            }
        }
    }
    else {
        if (dbScrArgs != "") {
            ScrArgs = dbScrArgs.split("~");
            for (var i = 0;i < ScrArgs.length;i++) {
                addNewRow1('ClfArgnts');
                tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = ScrArgs[i];
                fn_populate_Blocks_toScreenArgs('RAD_DATA_BLOCKS', 'ClfArgnts', 'frmclfargs', 'BLOCK_NAME', 2);
            }
        }
    }
    document.getElementById("Cancel").focus();
}

function appendMultiple() {

    var rowindex = parent.ctrlrwIndx;
    var tableref = document.getElementById('ClfArgnts');
    var rtnSrnArgs = "";
    for (var index = 0;index < tableref.tBodies[0].rows.length;index++) {
        rtnSrnArgs += tableref.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
        rtnSrnArgs += "~" + tableref.tBodies[0].rows[index].cells[2].getElementsByTagName("SELECT")[0].value;
        rtnSrnArgs += "__" + tableref.tBodies[0].rows[index].cells[3].getElementsByTagName("SELECT")[0].value;
        rtnSrnArgs += "~" + tableref.tBodies[0].rows[index].cells[4].getElementsByTagName("INPUT")[0].value;
        rtnSrnArgs += ":";
    }
    rtnSrnArgs = rtnSrnArgs.substring(0, rtnSrnArgs.length - 1);
    if (lcfrm == 'CALFRMS') {
        parent.document.getElementById("CALFRMS").tBodies[0].rows[rowindex].cells[11].getElementsByTagName("INPUT")[0].value = rtnSrnArgs;
    }
    else {
        parent.document.getElementById("lfmform").tBodies[0].rows[rowindex].cells[5].getElementsByTagName("INPUT")[0].value = rtnSrnArgs;
    }

}

function fn_Populate_BlkFields(tableName, blkCell, fldCell, evnt) {

    var rowNum = getRowIndex(evnt);
    var tablerows = document.getElementById(tableName).tBodies[0].rows.length;
    var blkName = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[blkCell].getElementsByTagName("SELECT")[0].value;
    var blks = selectNodes(localDom, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS");
    var blkslen = blks.length;
    obj = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[fldCell].getElementsByTagName("SELECT")[0];

    obj.options.length = 0;
    addOption(obj, "", "", true);
    for (var i = 0;i < blkslen;i++) {
        addOption(obj, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
    }

}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function getTabelRow1(tableName) {

    if (tableName == "ClfArgnts") {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=SCREEN_ARG_NAME style=\"height: 20px\" name=SCREEN_ARG_NAME> </TD>" + "<TD><SELECT aria-required=\"false\" name=BLOCK_NAME id=BLOCK_NAME onChange=\"fn_Populate_BlkFields('ClfArgnts','2','3',event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" name=FIELD_NAME id=FIELD_NAME ></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" name=FIELD_VALUE style=\"height: 20px\" id=FIELD_VALUE ></TD>";
    }
    else if (tableName == 'dpndtflds') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup></TD>" + "<TD><SELECT aria-required=\"false\" name=BLOCK_NAME id=BLOCK_NAME onChange=\"fn_Populate_BlkFields('dpndtflds','1','2',event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" name=FIELD_NAME id=FIELD_NAME ></SELECT></TD>";

    }
    else if (tableName == 'dpndtsvrs') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup></TD>" + "<TD><SELECT aria-required=\"false\" id=CALL_FORM   name=CALL_FORM></SELECT></TD>";
    }
    return trow;
}

function addNewRow1(tableName) {

    var trow = getTabelRow1(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var arrSize = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var styleArray = new Array();
    var trCellArray = tBodyHTML.split("</TD>");
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        styleArray[j] = rowArr[j].substring(rowArr[j].indexOf("=") + 1, rowArr[j].indexOf(">"));
        newCell.setAttribute("className", styleArray[j], 0);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        try {
            newRow.cells[j].getElementsByTagName("INPUT")[0].title = "Record " + trwln + " col " + R;
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("SELECT")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        R++;
        cellsArr[j] = newRow.cells[j];
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        arrSize[j] = newRow.cells[j].offsetWidth;
        if (newRow.cells[j].offsetWidth != 0) {
            tHead.cells[j].width = newRow.cells[j].offsetWidth;
        }
    }
}

function delRow1(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableObject.tBodies[0].deleteRow(index);

        }
    }
}

function deleteAll1(tableName) {

    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        tableObject.tBodies[0].deleteRow(index);
    }
}

function showdpndtFlds() {
    var tableObject = document.getElementById('dpndtflds');
    deleteAll1('dpndtflds');
    var blkflds = "";
    var clfrms = "";
    if (calFrmArgs != "") {
        var dpndtFlds = calFrmArgs.split(":");
        if (dpndtFlds.length > 1) {
            if (dpndtFlds[0] != "") {
                blkflds = dpndtFlds[0].split("~");
            }
            if (dpndtFlds[1] != "") {
                clfrms = dpndtFlds[1].split("~");
            }
        }
        else if (dpndtFlds[0].match("__") != null) {
            blkflds = dpndtFlds[0].split("~");
        }
        else {
            clfrms = dpndtFlds[0].split("~");
        }
        var blkName = new Array();
        if (blkflds.length > 0) {
            for (var j = 0;j < blkflds.length;j++) {
                addNewRow1('dpndtflds');
                if (blkflds[j] != "")
                    blkName = blkflds[j].split("__");
                var optn = document.createElement("OPTION");
                optn.text = blkName[0];
                optn.value = blkName[0];
                tableObject.tBodies[0].rows[j].cells[1].getElementsByTagName("SELECT")[0].options.add(optn);
                var optn1 = document.createElement("OPTION");
                optn1.text = blkName[1];
                optn1.value = blkName[1];
                tableObject.tBodies[0].rows[j].cells[2].getElementsByTagName("SELECT")[0].options.add(optn1);
            }
        }
        if (clfrms.length > 0) {
            for (var i = 0;i < clfrms.length;i++) {
                addNewRow1('dpndtsvrs');
                var optn2 = document.createElement("OPTION");
                optn2.text = clfrms[i];
                optn2.value = clfrms[i];
                document.getElementsByName('dpndtsvrs')[0].tBodies[0].rows[i].cells[1].getElementsByTagName("SELECT")[0].options.add(optn2);
            }
        }

    }
    document.getElementById("Cancel").focus();
}

function fn_get_CalFrms(e) {
    var rowNum = getRowIndex(e);
    var tablerows = document.getElementsByName('dpndtsvrs')[0].tBodies[0].rows.length;
    var obj = "";
    var tab = document.getElementsByName('dpndtsvrs')[0].tBodies[0];
    var callFrms = selectNodes(localDom, "//RAD_CALLFORM");
    if (callFrms.length > 0) {
        addNewRow1('dpndtsvrs');
        var tablen = tab.rows.length;
        obj = tab.rows[tablen - 1].cells[1].getElementsByTagName('SELECT')[0];
        obj.options.length = 0
    }
    for (var j = 0;j < callFrms.length;j++) {
        addOption(obj, getNodeText(selectSingleNode(callFrms[j], "CALLFORM_FUCNTIONID")), getNodeText(selectSingleNode(callFrms[j], "CALLFORM_FUCNTIONID")), false);
    }
    var scrns = selectNodes(localDom, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    for (var m = 0;m < scrns.length;m++) {
        var scrnName = getNodeText(selectSingleNode(scrns[m], "SCREEN_NAME"));
        var tabs = selectNodes(localDom, "//RAD_SCREENS[SCREEN_NAME = '" + scrnName + "']/BODY/RAD_TABS[TAB_VISIBLE='Y']");
        for (var n = 0;n < tabs.length;n++) {
            var tabName = getNodeText(selectSingleNode(tabs[n], "TAB_NAME"));
            var tabTyp = getNodeText(selectSingleNode(tabs[n], "TAB_TYPE"));
            if (tabTyp == "SERVICE") {
                addOption(obj, tabName, tabName, false);
            }
        }
    }
}

function fn_Populate_CalFrms() {
    var tablerows = document.getElementById('dpndtsvrs').tBodies[0].rows.length;
    var obj = "";
    var tab = document.getElementById('dpndtsvrs').tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        for (var i = 0;i < tablen;i++) {
            if (tab.rows[i].cells[0].getElementsByTagName('INPUT')[0].checked == true) {
                obj = tab.rows[i].cells[1].getElementsByTagName('SELECT')[0];
                obj.options.length = 0;
                var callFrms = selectNodes(localDom, "//RAD_CALLFORM");
                addOption(obj, "", "", true);
                for (var j = 0;j < callFrms.length;j++) {
                    addOption(obj, getNodeText(selectSingleNode(callFrms[j], "CALLFORM_FUCNTIONID")), getNodeText(selectSingleNode(callFrms[j], "CALLFORM_FUCNTIONID")), false);

                }
                var scrns = selectNodes(localDom, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
                for (var m = 0;m < scrns.length;m++) {
                    var scrnName = getNodeText(selectSingleNode(scrns[m], "SCREEN_NAME"));
                    var tabs = selectNodes(localDom, "//RAD_SCREENS[SCREEN_NAME = '" + scrnName + "']/BODY/RAD_TABS[TAB_VISIBLE='Y']");
                    for (var n = 0;n < tabs.length;n++) {
                        var tabName = getNodeText(selectSingleNode(tabs[n], "TAB_NAME"));
                        var tabTyp = getNodeText(selectSingleNode(tabs[n], "TAB_TYPE"));
                        if (tabTyp == "SERVICE") {
                            addOption(obj, tabName, tabName, false);
                        }
                    }
                }
            }
        }
    }
}

function fnSaveDpndtFlds() {
    var tableFlds = document.getElementById('dpndtflds');
    var tablesvrs = document.getElementById('dpndtsvrs');
    var rowindex = parent.ctrlrwIndx;
    var rtnDpndtFlds = "";
    var rtnDpndtsvrs = "";
    if (tableFlds.tBodies[0].rows.length > 0) {
        for (var index = 0;index < tableFlds.tBodies[0].rows.length;index++) {
            rtnDpndtFlds += tableFlds.tBodies[0].rows[index].cells[1].getElementsByTagName("SELECT")[0].value;
            rtnDpndtFlds += "__" + tableFlds.tBodies[0].rows[index].cells[2].getElementsByTagName("SELECT")[0].value;
            rtnDpndtFlds += "~";
        }
    }
    else {
        rtnDpndtFlds = "";
    }
    if (tablesvrs.tBodies[0].rows.length > 0) {
        for (var i = 0;i < tablesvrs.tBodies[0].rows.length;i++) {
            rtnDpndtsvrs += tablesvrs.tBodies[0].rows[i].cells[1].getElementsByTagName("SELECT")[0].value;
            rtnDpndtsvrs += "~";
        }
    }
    else {
        rtnDpndtsvrs = "";
    }
    if (rtnDpndtFlds != "" || rtnDpndtsvrs != "") {
        rtnDpndtFlds = rtnDpndtFlds.substring(0, rtnDpndtFlds.length - 1);
        rtnDpndtsvrs = rtnDpndtsvrs.substring(0, rtnDpndtsvrs.length - 1);
        rtnRslt = rtnDpndtFlds + ":" + rtnDpndtsvrs;
    }
    else {
        rtnRslt = "";
    }
    if (lcfrm == 'CALFRMS') {
        parent.document.getElementById('CALFRMS').tBodies[0].rows[rowindex].cells[12].getElementsByTagName("INPUT")[0].value = rtnRslt;
    }
    else {
        parent.document.getElementById("DEPENDENT_ON").value = rtnRslt;
    }

}