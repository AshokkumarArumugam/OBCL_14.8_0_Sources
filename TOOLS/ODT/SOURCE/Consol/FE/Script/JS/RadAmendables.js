/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadAmendables.js
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

//dlgArg       = dialogArguments;
var localDom = parent.dom;
var act = parent.actVal;
var prevobj = "";

function fnInValues() {
    parent.document.getElementById("IFCHILD").style.width = "800px";
    parent.document.getElementById("IFCHILD").style.height = "500px";
    parent.document.getElementById("IFCHILD").scrolling = "no";
    blks = selectNodes(localDom, "//RAD_DATA_BLOCKS");
    for (var i = 0;i < blks.length;i++) {
        var blkName = getNodeText(selectSingleNode(blks[i], 'BLOCK_NAME'));
        if (i == 0) {
            addOption(document.getElementById("DATABLK_LIST"), blkName, blkName, true);
            showBlkFlds();
        }
        else {
            addOption(document.getElementById("DATABLK_LIST"), blkName, blkName, false);
        }
    }
    document.getElementById("Cancel").focus();
}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        if (parent.vwChg != "Y")
            obj.options[obj.options.length] = new Option(text, value, false, selected);
        else {
            obj.options[obj.options.length] = new Option(text, value, false, selected);
            try {
                var action = selectSingleNode(dom, xpath + "[@ID='" + text + "']").getAttribute("Action");
                if (action != null && action == "New") {
                    obj.options[obj.options.length - 1].style.color = "009900";
                }
            }
            catch (e) {
            }
        }
    }
}

function showBlkFlds() {

    if (prevobj != "") {
        fn_append_data(prevobj);
    }

    if (document.getElementById('DATABLK_LIST').options.length != 0) {
        var blkindex = document.getElementById('DATABLK_LIST').options.selectedIndex;
        var blkName = document.getElementById('DATABLK_LIST').options[blkindex].text;
        var blkMltRec = getNodeText(selectSingleNode(selectNodes(localDom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']")[0], "MULTI_RECORD"));
        fnCheckAllowFlds(blkName, blkMltRec);

        var blkflds = selectNodes(selectSingleNode(localDom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']"), "RAD_BLK_FIELDS");
        deleteAll1('actBlkFlds');
        for (var i = 0;i < blkflds.length;i++) {
            addNewRow1('actBlkFlds');
            var rowlen = document.getElementById('actBlkFlds').tBodies[0].rows.length;
            var cells = document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells.length;
            for (var j = 0;j < cells;j++) {
                if (document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[j].getElementsByTagName("INPUT")[0].type == "text") {
                    document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[0].getElementsByTagName("INPUT")[0].value = getNodeText(selectSingleNode(blkflds[i], 'FIELD_NAME'));
                    document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[0].getElementsByTagName("INPUT")[0].disabled = true;
                }
                else if (document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[j].getElementsByTagName("INPUT")[0].type == "checkbox") {
                    if (selectSingleNode(blkflds[i], 'AMENDABLE_IN') != null) {
                        var val1 = fncheckValue(getNodeText(selectSingleNode(blkflds[i], 'AMENDABLE_IN')));
                        if (val1 == "Y") {
                            document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[j].getElementsByTagName("INPUT")[0].checked = true;
                        }
                        else if (val1 == "N") {
                            document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[j].getElementsByTagName("INPUT")[0].checked = false;
                        }
                    }
                    else if (selectSingleNode(blkflds[i], 'AMENDABLE_IN') == null) {
                        var amndElmt = localDom.createElement("AMENDABLE_IN");
                        blkflds[i].appendChild(amndElmt);
                        var val1 = fncheckValue(getNodeText(selectSingleNode(blkflds[i], 'AMENDABLE_IN')));
                        if (val1 == "Y") {
                            document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[j].getElementsByTagName("INPUT")[0].checked = true;
                        }
                        else if (val1 == "N") {
                            document.getElementById('actBlkFlds').tBodies[0].rows[rowlen - 1].cells[j].getElementsByTagName("INPUT")[0].checked = false;
                        }
                    }
                }
            }
        }
        prevobj = blkName;
    }
}

function fnCheckAllowFlds(blkName, blkMltRec) {

    var blk = selectNodes(localDom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']")
    if (selectSingleNode(blk[0], "NEW_ALLOWED_IN") == null) {
        var amndElmt = localDom.createElement("NEW_ALLOWED_IN");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "BLOCK_TITLE"));
    }
    if (selectSingleNode(blk[0], "DELETE_ALLOWED_IN") == null) {
        var amndElmt = localDom.createElement("DELETE_ALLOWED_IN");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "BLOCK_TITLE"));
    }
    if (selectSingleNode(blk[0], "ALL_RECORDS") == null) {
        var amndElmt = localDom.createElement("ALL_RECORDS");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "BLOCK_TITLE"));
    }
    if (selectSingleNode(blk[0], "MANDATORY_IN") == null) {
        var amndElmt = localDom.createElement("MANDATORY_IN");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "BLOCK_TITLE"));
    }
    if (selectSingleNode(blk[0], "NEW_ALLOWED_IN") != null) {
        var res = fncheckValue(getNodeText(selectSingleNode(blk[0], "NEW_ALLOWED_IN")));
        if (res == "Y") {
            document.getElementById('NEW_ALLOWED_IN').checked = true;
        }
        else {
            document.getElementById('NEW_ALLOWED_IN').checked = false;
        }
    }
    document.getElementById('NEW_ALLOWED_IN').disabled = false;
    if (selectSingleNode(blk[0], "DELETE_ALLOWED_IN") != null) {
        var res = fncheckValue(getNodeText(selectSingleNode(blk[0], "DELETE_ALLOWED_IN")));
        if (res == "Y") {
            document.getElementById('DELETE_ALLOWED_IN').checked = true;
        }
        else {
            document.getElementById('DELETE_ALLOWED_IN').checked = false;
        }
    }
    document.getElementById('DELETE_ALLOWED_IN').disabled = false;
    if (selectSingleNode(blk[0], "ALL_RECORDS") != null) {
        var res = fncheckValue(getNodeText(selectSingleNode(blk[0], "ALL_RECORDS")));
        if (res == "Y") {
            document.getElementById('ALL_RECORDS').checked = true;
        }
        else {
            document.getElementById('ALL_RECORDS').checked = false;
        }
    }
    document.getElementById('ALL_RECORDS').disabled = false;
    if (selectSingleNode(blk[0], "MANDATORY_IN") != null) {
        var res = fncheckValue(getNodeText(selectSingleNode(blk[0], "MANDATORY_IN")));
        if (res == "Y") {
            document.getElementById('MANDATORY_IN').checked = true;
        }
        else {
            document.getElementById('MANDATORY_IN').checked = false;
        }
    }
    document.getElementById('MANDATORY_IN').disabled = false;

}

function fn_append_data(blkName) {

    var blk = selectNodes(localDom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']");
    var NewAllwVals = getNodeText(selectSingleNode(blk[0], "NEW_ALLOWED_IN"));
    var DelAllwVals = getNodeText(selectSingleNode(blk[0], "DELETE_ALLOWED_IN"));
    var AllRecVals = getNodeText(selectSingleNode(blk[0], "ALL_RECORDS"));
    var MandVals = getNodeText(selectSingleNode(blk[0], "MANDATORY_IN"));
    var NewRes = document.getElementById('NEW_ALLOWED_IN').checked;
    var DelRes = document.getElementById('DELETE_ALLOWED_IN').checked;
    var AllRecRes = document.getElementById('ALL_RECORDS').checked;
    var MandRes = document.getElementById('MANDATORY_IN').checked;
    if (NewRes == true) {
        if (NewAllwVals.match(act)) {
        }
        else {
            if (NewAllwVals != "" || NewAllwVals == null) {
                setNodeText(selectSingleNode(blk[0], "NEW_ALLOWED_IN"), NewAllwVals + "~" + act);
            }
            else {
                setNodeText(selectSingleNode(blk[0], "NEW_ALLOWED_IN"), act);
            }
        }
    }
    else if (NewRes == false) {
        if (NewAllwVals.match(act)) {
            var NewAlwArry = new Array();
            NewAlwArry = NewAllwVals.split("~");
            for (var i = 0;i < NewAlwArry.length;i++) {
                if (NewAlwArry[i] == act) {
                    NewAlwArry.splice(i, 1);
                }
            }
            var NewAllActs = "";
            for (var p = 0;p < NewAlwArry.length;p++) {
                NewAllActs += NewAlwArry[p] + "~";
            }
            NewAllActs = NewAllActs.substring(0, NewAllActs.lastIndexOf("~"));
            setNodeText(selectSingleNode(blk[0], "NEW_ALLOWED_IN"), NewAllActs);
        }
    }
    if (DelRes == true) {
        if (DelAllwVals.match(act)) {
        }
        else {
            if (DelAllwVals != "" || DelAllwVals == null) {
                setNodeText(selectSingleNode(blk[0], "DELETE_ALLOWED_IN"), DelAllwVals + "~" + act);
            }
            else {
                setNodeText(selectSingleNode(blk[0], "DELETE_ALLOWED_IN"), act);
            }
        }
    }
    else if (DelRes == false) {
        if (DelAllwVals.match(act)) {
            var DelAlwArry = new Array();
            DelAlwArry = DelAllwVals.split("~");
            for (var i = 0;i < DelAlwArry.length;i++) {
                if (DelAlwArry[i] == act) {
                    DelAlwArry.splice(i, 1);
                }
            }
            var DelAllActs = "";
            for (var p = 0;p < DelAlwArry.length;p++) {
                DelAllActs += DelAlwArry[p] + "~";
            }
            DelAllActs = DelAllActs.substring(0, DelAllActs.lastIndexOf("~"));
            setNodeText(selectSingleNode(blk[0], "DELETE_ALLOWED_IN"), DelAllActs);
        }
    }
    if (AllRecRes == true) {
        if (AllRecVals.match(act)) {
        }
        else {
            if (AllRecVals != "" || AllRecVals == null) {
                setNodeText(selectSingleNode(blk[0], "ALL_RECORDS"), AllRecVals + "~" + act);
            }
            else {
                setNodeText(selectSingleNode(blk[0], "ALL_RECORDS"), act);
            }
        }
    }
    else if (AllRecRes == false) {
        if (AllRecVals.match(act)) {
            var AllRecArry = new Array();
            AllRecArry = AllRecVals.split("~");
            for (var i = 0;i < AllRecArry.length;i++) {
                if (AllRecArry[i] == act) {
                    AllRecArry.splice(i, 1);
                }
            }
            var AllRecActs = "";
            for (var p = 0;p < AllRecArry.length;p++) {
                AllRecActs += AllRecArry[p] + "~";
            }
            AllRecActs = AllRecActs.substring(0, AllRecActs.lastIndexOf("~"));
            setNodeText(selectSingleNode(blk[0], "ALL_RECORDS"), AllRecActs);
        }
    }
    if (MandRes == true) {
        if (MandVals.match(act)) {
        }
        else {
            if (MandVals != "" || MandVals == null) {
                setNodeText(selectSingleNode(blk[0], "MANDATORY_IN"), MandVals + "~" + act);
            }
            else {
                setNodeText(selectSingleNode(blk[0], "MANDATORY_IN"), act);
            }
        }
    }
    else if (MandRes == false) {
        if (MandVals.match(act)) {
            var MandArry = new Array();
            MandArry = MandVals.split("~");
            for (var i = 0;i < MandArry.length;i++) {
                if (MandArry[i] == act) {
                    MandArry.splice(i, 1);
                }
            }
            var MandActs = "";
            for (var p = 0;p < MandArry.length;p++) {
                MandActs += MandArry[p] + "~";
            }
            MandActs = MandActs.substring(0, MandActs.lastIndexOf("~"));
            setNodeText(selectSingleNode(blk[0], "MANDATORY_IN"), MandActs);
        }
    }

    var blkflds = selectNodes(selectSingleNode(localDom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']"), "RAD_BLK_FIELDS");
    for (var i = 0;i < blkflds.length;i++) {
        var rowlen = document.getElementById('actBlkFlds').tBodies[0].rows.length;
        for (j = 0;j < rowlen;j++) {
            if (getNodeText(selectSingleNode(blkflds[i], 'FIELD_NAME')) == document.getElementById('actBlkFlds').tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].value) {
                var res = document.getElementById('actBlkFlds').tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].checked;
                var amndVal = getNodeText(selectSingleNode(blkflds[i], 'AMENDABLE_IN'));
                if (res == true) {
                    if (amndVal.match(act)) {
                    }
                    else {
                        if (amndVal != "" || amndVal == null) {
                            setNodeText(selectSingleNode(blkflds[i], 'AMENDABLE_IN'), amndVal + "~" + act);
                        }
                        else {
                            setNodeText(selectSingleNode(blkflds[i], 'AMENDABLE_IN'), act);
                        }
                    }
                }
                else if (res == false) {
                    if (amndVal.match(act)) {
                        var amndArray = new Array();
                        amndArray = amndVal.split("~");
                        for (var k = 0;k < amndArray.length;k++) {
                            if (amndArray[k] == act) {
                                amndArray.splice(k, 1);
                            }
                        }
                        var actns = "";
                        for (var m = 0;m < amndArray.length;m++) {
                            actns += amndArray[m] + "~";
                        }
                        actns = actns.substring(0, actns.lastIndexOf("~"));
                        setNodeText(selectSingleNode(blkflds[i], 'AMENDABLE_IN'), actns);
                        actns = "";
                    }
                    else {

                    }
                }
            }
        }
    }
}

function fncheckValue(val) {

    if (val.match(act)) {
        return "Y";
    }
    else {
        return "N";
    }
}

function returnAmnds() {

    var blkindex = document.getElementById('DATABLK_LIST').options.selectedIndex;
    var blkName = document.getElementById('DATABLK_LIST').options[blkindex].text;
    fn_append_data(blkName);
    parent.dom = localDom;

}

function addNewRow1(tableName) {

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var trow = "<TD><INPUT aria-required=\"false\" type=\"text\"  size=40 name=FIELD_NAME id=FIELD_NAME  readonly=\"true\" ></TD><TD align=\"center\"><INPUT aria-required=\"false\" type=checkbox name=AMENDABLE_IN id=AMENDABLE_IN></TD>";
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var arrSize = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var styleArray = new Array();
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    var trCellArray = tBodyHTML.split("</TD>");
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
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
    }
}

function deleteAll1(tableName) {

    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    if (numRows > 0) {
        for (var index = numRows - 1;index >= 0;index--) {
            tableObject.tBodies[0].deleteRow(index);
        }
    }
}