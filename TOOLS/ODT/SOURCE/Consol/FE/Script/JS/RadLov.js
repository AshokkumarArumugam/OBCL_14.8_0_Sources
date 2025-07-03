/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadLov.js
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
var firstrow = 0;
var lastrow = 15;
var page1 = 0;
var page2 = 1;
var gcNAV_FIRST = 0;
var gcNAV_PREVIOUS = 1;
var gcNAV_GOTO = 2;
var gcNAV_NEXT = 3;
var gcNAV_LAST = 4;
var gcNUM_NAV_BUTTONS = 5;

function parent_submit(evnt) {
    var evnt = window.event || evnt;
    var srcElement = getEventSourceElement(evnt);
    var selectedRowNum = "";
    if (srcElement.tagName.toUpperCase() == "A")
        selectedRowNum = srcElement.parentNode.parentNode.rowIndex;
    else 
        selectedRowNum = srcElement.parentNode.rowIndex;
    var fieldValuesArr = new Array();
    var selectedRowObj = document.getElementById("RAD_LOV").tBodies[0].rows[selectedRowNum - 1].cells;
    var fieldVal = "";
    for (var rowNum = 0;rowNum < selectedRowObj.length;rowNum++) {
        if (selectedRowObj[rowNum].children[0].type == "DATE")
            fieldValuesArr[rowNum] = selectedRowObj[rowNum].children[selectedRowObj[rowNum].children.length - 1].value;
        else 
            fieldValuesArr[rowNum] = getInnerText(selectedRowObj[rowNum]);
        fieldVal += getInnerText(selectedRowObj[rowNum]) + "~";
    }
    var field_names_recNum = parseInt(document.getElementById('par_field_names_recNum').value, 10);

    var tmpParFields = document.getElementById("par_field_names").value.split("~");
    var tmpfieldVal = fieldVal.split("~");
    var elementsLength = 1;
    elementsLength = parent.document.getElementsByName(tmpParFields[0]).length;
    if (elementsLength == 1) {
        for (var flds = 0;flds < tmpParFields.length;flds++) {
            if (parent.document.getElementById(tmpParFields[flds]))
                parent.document.getElementById(tmpParFields[flds]).value = tmpfieldVal[flds];
        }
    }
    else {
        for (var flds = 0;flds < tmpParFields.length;flds++) {
            if (parent.document.getElementsByName(tmpParFields[flds])[field_names_recNum - 1])
                parent.document.getElementsByName(tmpParFields[flds])[field_names_recNum - 1].value = tmpfieldVal[flds];
        }

    }

    fnexitlov(evnt);
}

function FnfetchQuery(event) {
var event = window.event || event;
var bind_var = "";
var Lov_id = "";
if(document.getElementById("bind_var").value!=null){
	bind_var = document.getElementById("bind_var").value;
}
if(document.getElementById("lov_queryid").value!=null){
	Lov_id = document.getElementById("lov_queryid").value;
}
var serverURL = "ExtLovFetchData";
var formData = '';
formData += "lovid=" + Lov_id;
formData += "&bidvar=" + bind_var;
formData += "&Ujndi=" + top.parent.jndiName;
var enterd = 0;
var tesq = "";
 var NumberOfTables = document.getElementsByTagName("fieldset");
    for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
        var tblObj = NumberOfTables[tableIndex];
        var divele = tblObj.getElementsByTagName("INPUT");
        for (index = 0;index < divele.length;index++) {
            var fldvalue = divele[index].value;
            var fldname = divele[index].id;
            if (doTrim(fldvalue) != "") {
                if (doTrim(fldvalue).indexOf("%") >= 0) {
                    if (enterd <= 0) {
                        tesq += " WHERE UPPER(" + fldname + ") like UPPER('" + doTrim(fldvalue) + "')";
                        enterd++;
                    }
                    else 
                        tesq += " AND UPPER(" + fldname + ") like UPPER('" + doTrim(fldvalue) + "')";
                }
                else {
                    if (enterd <= 0) {
                        tesq += " WHERE UPPER(" + fldname + ") = UPPER('" + doTrim(fldvalue) + "')";
                        enterd++;
                    }
                    else 
                        tesq += " AND UPPER(" + fldname + ") = UPPER('" + doTrim(fldvalue) + "')";
                }
            }
        }
    }
   
	formData += "&whereclause=" + tesq;
	formData += "&firstrow=" + firstrow;
	formData += "&lastrow=" + lastrow +" order by "+divele[0].id;
    try {    
    	var objHTTP = createHTTPActiveXObject();
    	objHTTP.open("POST", encodeURI(serverURL), false);
    	objHTTP.setRequestHeader("charset", "utf-8");
    	objHTTP.setRequestHeader("X-CSRFTOKEN",top.parent.CSRFtoken);
    	objHTTP.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    	objHTTP.send(encodeURI(formData));
	    var LOVResponseDOM = objHTTP.responseXML;
   } catch (e) {
   }
 
	deleteAll("RAD_LOV");
	var LOVCount = objHTTP.getResponseHeader("COUNTING");
	 var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(LOVCount, "//Records")).split(">");
    }
    catch (e) {
        multRec = LOVCount.substring(9, LOVCount.indexOf("</Records>")).split(">");
    }
    countoflines = multRec[0];
    paintbutton(countoflines)
	
	 var multRec1 = "";
    try {
        multRec1 = getNodeText(selectSingleNode(LOVResponseDOM, "//Records")).split(">");
    }
    catch (e) {
        multRec1 = LOVResponseDOM.substring(9, LOVResponseDOM.indexOf("</Records>")).split(">");
    }
    var tableObj = document.getElementById("RAD_LOV");
    for (var sr = 0;sr < multRec1.length;sr++) {
        if (multRec1[sr] != "") {
            var singleRec = multRec1[sr].split("~");
            addTableRow("RAD_LOV");
            var tbfields = document.getElementById("displfld").value;
            tbfields = tbfields.split("~");
            for (var pnt = 0;pnt < singleRec.length - 1;pnt++) {

                if (singleRec[pnt] == "null") {
                    tableObj.tBodies[0].rows[sr].cells[pnt].getElementsByTagName("A")[0].innerHTML = "";
                }
                else {
                    tableObj.tBodies[0].rows[sr].cells[pnt].getElementsByTagName("A")[0].innerHTML = singleRec[pnt];
                }
                if (tbfields.length - 1 < pnt) {
                    tableObj.tBodies[0].rows[sr].cells[pnt].getElementsByTagName("A")[0].style.display = "none";
                }
            }
        }
    }
    try {
        document.getElementById(tbfields[0]).focus();
    }
    catch (e) {
        document.getElementById("LOVPageHead").getElementsByTagName("INPUT")[0].focus();
    }
    
} 

function getTabelRow(tableName) {
    var trow = "";
    if (document.getElementById("par_field_names").value.split("~").length > document.getElementById("displfld").value.split("~").length)
        var tbfields = document.getElementById("par_field_names").value;
    else var tbfields = document.getElementById("displfld").value;
    tbfields = tbfields.split("~");
    if (tableName == "RAD_LOV") {
        for (var qf = 0;qf < tbfields.length;qf++) {
            if (tbfields[qf] != "") {
                var tdname = tbfields[qf];
                trow += "<TD><A type=\"TEXT\" tabindex=\"0\" onkeydown=\"fnHandleLovRslt(event)\" OnClick=\"parent_submit(event)\" ></A></TD>";
            }
        }
    }
    return trow;
}

function fncalstyle(event) {
    parent.document.getElementById("IFCHILD").style.width = "500px";
    parent.document.getElementById("IFCHILD").style.height = "600px";
    FnfetchQuery(event);
} 

function paintbutton(countoflines) {
    page1 = Math.ceil(firstrow / 15);
    page1 = page1 + 1;
    page2 = Math.ceil(countoflines / 15);
    if (page2 == 0)
        page1 = 0;
    document.getElementById('pagesflow').innerHTML = " " + page1 + "of" + page2;
    if (page1 < page2 && page1 == 1) {
        document.getElementById('navFirst').disabled = true;
        document.getElementById('navPrev').disabled = true;
        document.getElementById('navNext').disabled = false;
        document.getElementById('navLast').disabled = false;
    }
    if (page1 <= page2 && page1 != 1) {
        document.getElementById('navFirst').disabled = false;
        document.getElementById('navPrev').disabled = false;
        document.getElementById('navNext').disabled = true;
        document.getElementById('navLast').disabled = true;
    }
    if (page2 <= 1) {
        document.getElementById('navFirst').disabled = true;
        document.getElementById('navPrev').disabled = true;
        document.getElementById('navNext').disabled = true;
        document.getElementById('navLast').disabled = true;
    }
    if (page1 > 1 && page1 < page2) {
        document.getElementById('navFirst').disabled = false;
        document.getElementById('navPrev').disabled = false;
        document.getElementById('navNext').disabled = false;
        document.getElementById('navLast').disabled = false;
    }
} 
 

function addTableRow(tableName) {
    if (!document.getElementById(tableName)) {
        return;
    }
    var trow = getTabelRow(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var trCellArray = tBodyHTML.split("</TD>");
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        try {
            newRow.cells[j].getElementsByTagName("A")[0].title = "Record " + trwln + " col " + R;
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("A")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        cellsArr[j] = newRow.cells[j];
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        R++;
    }
}

function FndoNavigate(type, event) {
    switch (type) {
        case gcNAV_FIRST: {
            firstrow = 0;
            lastrow = 15;
            FnfetchQuery(event);
        }
        break;
        case gcNAV_PREVIOUS: {
            if (firstrow <= 15) {
                firstrow = 0;
                lastrow = 15;
            }
            else {
                firstrow = firstrow - 15;
                lastrow = lastrow - 15;
            }

            FnfetchQuery(event);
        }
        break;
        case gcNAV_NEXT: {
            if (lastrow >= countoflines) {
                firstrow = countoflines - 15;
                lastrow = countoflines;
            }
            else {
                firstrow = firstrow + 15;
                lastrow = lastrow + 15;
            }
            FnfetchQuery(event);
        }
        break;
        case gcNAV_LAST: {
            if (countoflines >= 15) {
                firstrow = countoflines - 15;
                lastrow = countoflines;
            }
            else {
                firstrow = 0;
                lastrow = countoflines;

            }
            FnfetchQuery(event);
        }
        break;
    }

}

function form_reset() {
    var NumberOfTables = document.getElementsByTagName("fieldset");
    for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
        var tblObj = NumberOfTables[tableIndex];
        var divele = tblObj.getElementsByTagName("INPUT");
        for (index = 0;index < divele.length;index++) {
            divele[index].value = "";
        }
    }
    deleteAll("RAD_LOV");
    firstrow = 0;
    lastrow = 15;
    paintbutton(0);
}

function fnexitlov(evnt) {
    parent.unmask();
    var field_names = document.getElementById('par_field_names').value.split("~");
    var field_names_recNum = parseInt(document.getElementById('par_field_names_recNum').value, 10);
    try {
        if (field_names_recNum >= 1)
            parent.document.getElementsByName(field_names[0])[field_names_recNum - 1].focus();
        else 
            parent.document.getElementById(field_names[0]).focus();
    }
    catch (e) {
        parent.document.getElementById("close").focus();
    }
    var winDivObj = parent.document.getElementById("ChildWin");
    if (winDivObj) {
        winDivObj.children[0].src = "";
        parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
    }
}

function lovAccessKeys(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (evnt.keyCode == 27) {
        fnexitlov(evnt);
        return;
    }
    else if (evnt.keyCode == 8) {
        if (srcElement.tagName.toUpperCase() == 'INPUT') {
            return true;
        }
        else {
            fnDisableBrowserKey(evnt);
            preventpropagate(evnt);
            try {
                evnt.keyCode = 0;
            }
            catch (e) {
            }
            return false;
        }
    }
    else if (evnt.keyCode == 33 && evnt.ctrlKey == false && evnt.altKey == false) {
        if (document.getElementsByName("navPrev")[0].disabled == false)
            FndoNavigate(gcNAV_PREVIOUS, e);
    }
    else if (evnt.keyCode == 34 && evnt.ctrlKey == false && evnt.altKey == false) {
        if (document.getElementsByName("navNext")[0].disabled == false)
            FndoNavigate(gcNAV_NEXT, e);
    }
    else if (evnt.keyCode == 35 && evnt.ctrlKey == false && evnt.altKey == false) {
        FndoNavigate(gcNAV_LAST, e);
    }
    else if (evnt.keyCode == 36 && evnt.ctrlKey == false && evnt.altKey == false) {
        FndoNavigate(gcNAV_FIRST, e);
    }
    else if (evnt.shiftKey == true && evnt.keyCode == 9) {
        if (srcElement.id == "RAD_LOV_TE") {
            document.getElementsByTagName("fieldset")[0].document.getElementsByTagName("INPUT")[0].focus();
            disableCommonKeys(e);
            preventpropagate(e);
            return false;
        }
        else if (srcElement.id == "RADLOVC") {
            document.getElementById("RAD_LOV_TE").focus();
            disableCommonKeys(e);
            preventpropagate(e);
        }
        return false;
    }
    else if (evnt.keyCode == 9) {
        if (srcElement.id == "RAD_LOV_TE")
            document.getElementById("RADLOVC").focus();
        disableCommonKeys(e);
        preventpropagate(e);
        return false;
    }
    else {
        return disableCommonKeys(evnt);
    }
}

function fnHandleLovRslt(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById("RAD_LOV").tBodies[0].rows;
    if (evnt.shiftKey == true && evnt.keyCode == 9) {
        document.getElementById("RAD_LOV_ME").focus();
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 13 || evnt.keyCode == 32) {
        parent_submit(evnt);
        fnDisableBrowserKey(evnt);
        preventpropagate(evnt);
        return false;
    }
    else if (evnt.keyCode == 9) {
        document.getElementById("RADLOVC").focus();
        fnDisableBrowserKey(evnt);
        preventpropagate(evnt);
        return false;
    }
    else if (evnt.keyCode == 40) {
        for (var i = 0;i < l_TableObj.length;i++) {
            var tblCells = l_TableObj[i].cells;
            for (var j = 0;j < tblCells.length;j++) {
                if (tblCells[j].children[0] == srcElement) {
                    if (l_TableObj[i + 1] != undefined)
                        l_TableObj[i + 1].cells[j].children[0].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }
        }
    }
    else if (evnt.keyCode == 38) {
        for (var i = 0;i < l_TableObj.length;i++) {
            var tblCells = l_TableObj[i].cells;
            for (var j = 0;j < tblCells.length;j++) {
                if (tblCells[j].children[0] == srcElement) {
                    if (l_TableObj[i - 1] != undefined) {
                        l_TableObj[i - 1].cells[j].children[0].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    }
    else if (evnt.keyCode == 39) {
        activeElement = document.activeElement;
        if (getNextSibling(activeElement.parentNode) != null) {
            getNextSibling(activeElement.parentNode).children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
    else if (evnt.keyCode == 37) {
        activeElement = document.activeElement;
        if (getPreviousSibling(activeElement.parentNode) != null) {
            getPreviousSibling(activeElement.parentNode).children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
}

function doTrim(obj) {
    if (obj.indexOf("\' ") !=  - 1)
        return obj.substring(0, obj.indexOf("\' "));
    return obj.replace(/^\\s*(\\b.*\\b|)\\s*$/, "$1 ");
}

function FnSearchfetchQuery(event) {
    firstrow = 0;
    lastrow = 15;
    FnfetchQuery(event);
}