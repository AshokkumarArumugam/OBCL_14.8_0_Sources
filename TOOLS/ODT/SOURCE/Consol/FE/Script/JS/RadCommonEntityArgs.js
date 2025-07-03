/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadCommonEntityArgs.js
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

    if (node == "PURGE_TABLE") {
        var nodename = "TABLE_NAME";
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

    var tblObject = document.getElementById('CommonEntity_Args');

    deleteAll1('CommonEntity_Args');
    var ScrArgs = parent.parentscrArg;
    if (ScrArgs != "") {
        if (ScrArgs != "null") {
            ScrArgs = ScrArgs.split("~");
            for (var i = 0;i < ScrArgs.length;i++) {
                if (ScrArgs[i] != "") {
                    addNewRow1('CommonEntity_Args');
                    tblObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = ScrArgs[i];
                    fn_populate_Blocks_toScreenArgs('PURGE_TABLE', 'CommonEntity_Args', 'frmclfargs', 'TABLE_NAME', 2);
                }
            }
        }
    }
}

function fn_populate_Blocks(node, tablename, frmname, fld, cellno) {

    if (node == "PURGE_TABLE") {
        var nodename = "TABLE_NAME";
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
                else if (tablename == "CommonEntity_Args") {
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

function showCommonEntityArgs() {

    var tableObject = document.getElementById('CommonEntity_Args');
    var dbScrArgs = parent.parentscrArg;
    deleteAll1('CommonEntity_Args');
    var ScrArgs = new Array();
    if (calFrmArgs != "") {
        ScrArgs = parent.parentcalFrmArgs.split(":");
        for (var i = 0;i < ScrArgs.length;i++) {
            addNewRow1('CommonEntity_Args');
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
                    addNewRow1('CommonEntity_Args');
                    tableObject.tBodies[0].rows[tableObject.tBodies[0].rows.length - 1].cells[1].getElementsByTagName("INPUT")[0].value = dbArgs[j];
                    fn_populate_Blocks_toScreenArgs('PURGE_TABLE', 'CommonEntity_Args', 'frmclfargs', 'TABLE_NAME', 2);
                }
            }
        }
    }
    else {
        if (dbScrArgs != "") {
            ScrArgs = dbScrArgs.split("~");
            for (var i = 0;i < ScrArgs.length;i++) {
                addNewRow1('CommonEntity_Args');
                tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = ScrArgs[i];
                fn_populate_Blocks_toScreenArgs('PURGE_TABLE', 'CommonEntity_Args', 'frmclfargs', 'TABLE_NAME', 2);
            }
        }
    }
    document.getElementById("Cancel").focus();
}

function appendMultiple() {

    var rowindex = parent.ctrlrwIndx;
    var tableref = document.getElementById('CommonEntity_Args');
    var rtnSrnArgs = "";
    for (var index = 0;index < tableref.tBodies[0].rows.length;index++) {
        rtnSrnArgs += tableref.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
        rtnSrnArgs += "~" + tableref.tBodies[0].rows[index].cells[2].getElementsByTagName("SELECT")[0].value;
        rtnSrnArgs += "__" + tableref.tBodies[0].rows[index].cells[3].getElementsByTagName("SELECT")[0].value;
        rtnSrnArgs += "~" + tableref.tBodies[0].rows[index].cells[4].getElementsByTagName("INPUT")[0].value;
        rtnSrnArgs += ":";
    }
    rtnSrnArgs = rtnSrnArgs.substring(0, rtnSrnArgs.length - 1);
    
        parent.document.getElementById("COMMON_ENTITY").tBodies[0].rows[rowindex].cells[3].getElementsByTagName("INPUT")[0].value = rtnSrnArgs;
     

}

function fn_Populate_BlkFields(tableName, blkCell, fldCell, evnt) {

    var rowNum = getRowIndex(evnt);
    var tablerows = document.getElementById(tableName).tBodies[0].rows.length;
    var blkName = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[blkCell].getElementsByTagName("SELECT")[0].value;
    var blks = getNodeText(selectSingleNode(localDom, "//PURGE_TABLE[@ID='" + blkName + "']/TABLE_COLUMNS"));
	 blks=blks.split("~");
    var blkslen = blks.length;
    obj = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[fldCell].getElementsByTagName("SELECT")[0];

    obj.options.length = 0;
    addOption(obj, "", "", true);
    for (var i = 0;i < blkslen;i++) {
        addOption(obj,  blks[i] , blks[i] , false);
    }

}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function getTabelRow1(tableName) {

    if (tableName == "CommonEntity_Args") {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=SCREEN_ARG_NAME style=\"height: 20px\" name=SCREEN_ARG_NAME> </TD>" + "<TD><SELECT aria-required=\"false\" name=TABLE_NAME id=TABLE_NAME style=\"WIDTH: 190px; HEIGHT: 20px\" onChange=\"fn_Populate_BlkFields('CommonEntity_Args','2','3',event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" name=FIELD_NAME id=FIELD_NAME style=\"WIDTH: 190px; HEIGHT: 20px\" ></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" name=FIELD_VALUE style=\"height: 20px\" id=FIELD_VALUE ></TD>";
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