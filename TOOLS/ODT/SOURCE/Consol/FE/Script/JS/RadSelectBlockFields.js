/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadSelectBlockFields.js
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

var columnsUI = "";
var dataTypeUI = "";
var dbDataDOM = parent.dom;
var blkName = parent.blkName;
var attr = parent.attr;

function closeWindow() {
    attr = parent.parent.attr;

    var columnName = new Array();
    var fieldName = new Array();
    var returnValue = new Array();
    var labelCode = new Array();
    var maxLength = new Array();
    var dataType = new Array();
	var deciMal = new Array();

    var flag = checkFlds('blkfldTable');
    var tableObject = document.getElementById('blkfldTable');
    var rowslength = tableObject.tBodies[0].rows.length;

    for (var i = 0;i < rowslength;i++) {

        if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            columnName[i] = tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value.toUpperCase();
            var val = tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value;
            var rest = new Array();
            rest = val.split(' ');
            if (rest.length > 1) {
                alertMessage("Space Not Allowed in FieldName", "E");
                return false;
            }
            fieldName[i] = tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value.toUpperCase();
            labelCode[i] = tableObject.tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value.toUpperCase();
            if (fieldName[i] == "") {
                alertMessage("Field Name Cannot be Null", "E");
                return false;
            }
            var datascrname = document.getElementsByName("DATASRC_NAME")[0].value;
            var datafileds = selectNodes(dbDataDOM, "//RAD_DATASOURCES[@ID='" + datascrname + "']/RAD_FIELDS");

            if (fieldName[i] != "") {
                for (var j = 0;j < datafileds.length;j++) {

                    if (getNodeText(selectSingleNode(datafileds[j], "COLUMN_NAME")) == columnName[i]) {
                        maxLength[i] = getNodeText(selectSingleNode(datafileds[j], "MAX_LENGTH"));
                        dataType[i] = getNodeText(selectSingleNode(datafileds[j], "DATATYPE"));
						deciMal[i] = getNodeText(selectSingleNode(datafileds[j], "MAX_DECIMALS"));
                        setNodeText(selectSingleNode(datafileds[j], "BLOCK_NAME"), blkName);
						setNodeText(selectSingleNode(datafileds[j], "FIELD_NAME"), fieldName[i]);

                    }
                }
            }
            for (var j = 0;j < rowslength;j++) {
                tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value == tableObject.tBodies[0].rows[j].cells[2].getElementsByTagName("INPUT")[0].value;

            }

        }
    }

    for (var i = 0;i < fieldName.length;i++) {
        if (fieldName[i] == "") {
            delete fieldName[i];
            delete columnName[i];
            delete labelCode[i];
            delete maxLength[i];
            delete dataType[i];
			delete deciMal[i];
			
        }
    }

    returnValue[1] = rearrangeArray(columnName);
    returnValue[2] = rearrangeArray(fieldName);
    var res = fnCheckDuplicate(blkName, returnValue[2]);
    if (res == "1") {
        parent.alertMessage("Field Already Exist", "E");
        return false;
    }
    returnValue[3] = getXMLString(dbDataDOM);
    returnValue[4] = datascrname;
    returnValue[5] = rearrangeArray(labelCode);
    returnValue[6] = rearrangeArray(maxLength);
    returnValue[7] = rearrangeArray(dataType);
	returnValue[8] = rearrangeArray(deciMal);
    parent.UIFlag = "FIELD";
    parent.blockColumnArray = returnValue[1];
    parent.blockFieldsArray = returnValue[2];
    parent.dom = loadXMLDoc(returnValue[3]);
    parent.latestvalue = returnValue[4];
    parent.blockLblCodeArray = returnValue[5];
    parent.blockMaxLengthArray = returnValue[6];
    parent.blockDataTypeArray = returnValue[7];
	parent.blockDecimalArray = returnValue[8];
    parent.CreateDOM(attr);

}

function fnCheckDuplicate(blkName, flds) {
    var blkFlds = selectNodes(selectSingleNode(dbDataDOM, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']"), "RAD_BLK_FIELDS");
    for (var i = 0;i < blkFlds.length;i++) {
        for (var j = 0;j < flds.length;j++) {
            if (getNodeText(selectSingleNode(blkFlds[i], "FIELD_NAME")) == flds[j]) {
                return 1;
            }
        }
    }
}

function rearrangeArray(arrayName) {
    var tempArr = new Array();
    var j = 0;
    for (var i = 0;i < arrayName.length;i++) {
        if (typeof arrayName[i] != 'undefined') {
            tempArr[j] = arrayName[i];
            j++;
        }
    }
    return tempArr;
}

function checkFlds(tableName) {
    var flag = 0;
    var tableObject = document.getElementById(tableName);
    var rowslength = tableObject.tBodies[0].rows.length;
    for (var j = 0;j < rowslength;j++) {
        if (tableObject.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            flag = 1;
            break;
        }
    }
    return flag;
}

function Populatexml(obj) {
    document.getElementById(obj).options.length = 0;
    var dsnLength = selectNodes(dbDataDOM, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/BLK_DATASOURCES").length;
    var datascr = "";
    for (var j = 0;j < dsnLength;j++) {
        datascr = getNodeText(selectSingleNode(selectNodes(dbDataDOM, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/BLK_DATASOURCES")[j], "DATASOURCE_NAME"));
        addOption(document.getElementById(obj), datascr, datascr, false);
        if (j == 0) {
            Populatefileds(datascr);
        }
    }
}

function Populatefileds(datasrc) {

    var datascrname = "";

    if (datasrc != "") {
        datascrname = datasrc;
    }

    var Optlen = document.getElementsByName("DATASRC_NAME")[0].options.length;
    for (var j = 0;j < Optlen;j++) {
        if (document.getElementsByName("DATASRC_NAME")[0].options[j].selected == true) {
            datascrname = document.getElementsByName("DATASRC_NAME")[0].options[j].text;
        }
    }
    var datafileds = selectNodes(dbDataDOM, "//RAD_DATASOURCES[@ID='" + datascrname + "']/RAD_FIELDS"); 

    deleteAll('blkfldTable');

    var tableObject = document.getElementById("blkfldTable");
    for (var j = 0;j < datafileds.length;j++) {
        addNewRow('blkfldTable');
        if (getNodeText(selectSingleNode(datafileds[j], "BLOCK_NAME")) == "") {
            tableObject.tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value = getNodeText(selectSingleNode(datafileds[j], "COLUMN_NAME")).toUpperCase();

            try {
                tableObject.tBodies[0].rows[j].cells[2].getElementsByTagName("INPUT")[0].value = getNodeText(selectSingleNode(datafileds[j], "FIELD_NAME")).toUpperCase();
                if (getNodeText(selectSingleNode(datafileds[j], "FIELD_NAME")) != "") {
                    //vldtblkfields();
                    var lblCode = "LBL_" + getNodeText(selectSingleNode(datafileds[j], "FIELD_NAME"));

                    tableObject.tBodies[0].rows[j].cells[3].getElementsByTagName("INPUT")[0].value = lblCode.toUpperCase();
                }

            }
            catch (e) {
            }
        }
    }

    var tabObj = document.getElementById("blkfldTable");
    var tableLength = tabObj.tBodies[0].rows.length;
    for (var index = 0;index < tableLength;index++) {
        if (tabObj.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value == "") {
            tabObj.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked = true;

        }
    }
    delRow('blkfldTable');

}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function getTabelRow(tableName) {
    var trow = "";
    if (tableName == "blkfldTable") {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=COL_NAME disabled style=\"WIDTH: 160px; HEIGHT: 20px\" name=COL_NAME> </TD>" + "<TD><INPUT aria-required=\"false\" id=FLD_NAME  style=\"WIDTH: 160px; HEIGHT: 20px\" name=FLD_NAME onchange=\"fnDfltFldName(event)\"> </TD>" + "<TD><INPUT aria-required=\"false\" id=LABEL_CODE  readonly style=\"WIDTH: 160px; HEIGHT: 20px\" name=LABEL_CODE ></TD>";
    }
    else if (tableName == "BlkUIfldTable") {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup checked=true> </TD>" + "<TD><INPUT aria-required=\"false\" id=FLD_NAME size=54 name=FLD_NAME onchange=\"fnDfltFldNameUI(event)\"></TD>" + "<TD><SELECT aria-required=\"false\" id=DATA_TYPE  name=FLD_NAME><OPTION value=></OPTION><OPTION value=DATE>Date</OPTION><OPTION VALUE=VARCHAR2>Varchar2</OPTION><OPTION VALUE=NUMBER>Number</OPTION><OPTION VALUE=DATETIME>DateTime</OPTION></TD>";
    }
    return trow;

}

function addNewRow(tableName) {

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var trow = getTabelRow(tableName);
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
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        cellsArr[j] = newRow.cells[j];
        try {
            newRow.cells[j].getElementsByTagName("INPUT")[0].title = "Record " + trwln + " col " + R;
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("SELECT")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        R++;
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
    }

}

function deleteAll(tableName) {

    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        tableObject.tBodies[0].deleteRow(index);
    }

}

function delRow(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableObject.tBodies[0].deleteRow(index);

        }
    }
}

function addFieldsUI() {
    attr = parent.parent.attr;
    parent.UIFlag = "UI";
    var returnUIArr = new Array();
    var blkName = new Array();
    blkName = attr.split("~");
    blkName = blkName[1];
    var flag = checkFlds('BlkUIfldTable');
    if (flag == 0) {
        alertMessage("No Field Selected", "E");
        return false;
    }
    var tableObject = document.getElementById("BlkUIfldTable");

    var rowlength = tableObject.tBodies[0].rows.length;
    columnsUI = "";

    for (var i = 0;i < rowlength;i++) {
        if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
            if (tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value != "") {
                var val = tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
                var rest = new Array();
                rest = val.split(' ');
                if (rest.length > 1) {
                    alertMessage("Space Not Allowed in FieldName", "E");
                    return false;
                }
                columnsUI = columnsUI + tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value.toUpperCase() + ",";
                dataTypeUI = dataTypeUI + tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("SELECT")[0].value + ",";
            }
            else {
                alertMessage("FieldName Cannot be Null", "E");
                return false;
            }
        }
    }
    columnsUIArr = columnsUI.split(",");
    columnsUIDTArr = dataTypeUI.split(",");
    var res = fnCheckDuplicate(blkName, columnsUIArr);
    if (res == "1") {
        parent.alertMessage("Field Already Exist", "E");
        return false;
    }
    returnUIArr[0] = columnsUIArr;
    returnUIArr[1] = columnsUIDTArr;

    parent.columnsUIArr = returnUIArr[0];
    parent.columnsUIDTArr = returnUIArr[1];
    parent.CreateDOM(attr);

}

function fnDfltFldName(event) {

    var index = getRowIndex(event);
    var tableObje = document.getElementById("blkfldTable");
    var fieldflag = 0;
    var rowslengthdbfield = tableObje.tBodies[0].rows.length;
    tableObje.tBodies[0].rows[index - 1].cells[2].getElementsByTagName("INPUT")[0].value = tableObje.tBodies[0].rows[index - 1].cells[2].getElementsByTagName("INPUT")[0].value.toUpperCase();
    var fldName = tableObje.tBodies[0].rows[index - 1].cells[2].getElementsByTagName("INPUT")[0].value;
    for (var i = 0;i < rowslengthdbfield;i++) {
        if (fldName == tableObje.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value.toUpperCase()) {
            fieldflag = fieldflag + 1;
        }
    }
    if (fieldflag >= 2) {
        tableObje.tBodies[0].rows[index - 1].cells[2].getElementsByTagName("INPUT")[0].value = "";

        alertMessage("Field Already Entered", "I");
        return false;

    }

    tableObje.tBodies[0].rows[index - 1].cells[3].getElementsByTagName("INPUT")[0].value = "LBL_" + fldName;
}

function fnDfltFldNameUI(event) {

    var index = getRowIndex(event);
    var tableObje = document.getElementById("BlkUIfldTable");
    var fieldflag = 0;
    var rowslengthdbfield = tableObje.tBodies[0].rows.length;
    tableObje.tBodies[0].rows[index - 1].cells[1].getElementsByTagName("INPUT")[0].value = tableObje.tBodies[0].rows[index - 1].cells[1].getElementsByTagName("INPUT")[0].value.toUpperCase();
    var fldName = tableObje.tBodies[0].rows[index - 1].cells[1].getElementsByTagName("INPUT")[0].value;
    for (var i = 0;i < rowslengthdbfield;i++) {
        if (fldName == tableObje.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value.toUpperCase()) {
            fieldflag = fieldflag + 1;
        }
    }
    if (fieldflag >= 2) {
        tableObje.tBodies[0].rows[index - 1].cells[1].getElementsByTagName("INPUT")[0].value = "";

        alertMessage("Field Already Entered", "I");
        return false;

    }
}