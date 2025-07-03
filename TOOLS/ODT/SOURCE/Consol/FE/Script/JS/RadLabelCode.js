/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadLabelCode.js
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
var lastrow = 13;
var page1 = 0;
var page2 = 1;
var countoflines;

function winnclose() {
    self.close();
}

function createxml() {

	var elements = document.getElementsByTagName("INPUT");
	var strParams = "SMDRADSC!";
	var isCommon = false;
	var lang = parent.parent.lang;
	var schema = parent.parent.jndiName;
	var flag = 0;
	var checked = 0;
	var tableObject = document.getElementById("mlabelCode");
	var tablerows = tableObject.tBodies[0].rows;
	for (var i = 0; i < tablerows.length; i++) {
		if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
			checked = 1;
			if (tablerows[i].cells[1].getElementsByTagName("INPUT")[0].value == "") {
				flag = 1;
				break;
			} else if (tablerows[i].cells[2].getElementsByTagName("INPUT")[0].value == "") {
				flag = 2;
				break;
			}
		}
	}
	if (tablerows.length == 0 || checked == 0) {
		alertMessage("No row is selected", "E");
		return;
	}
	if (flag == 1) {
		alertMessage("Label Code Cannot Be Null", "E");
		flag = 0;
		return;
	} else if (flag == 2) {
		alertMessage("Label Description Cannot Be Null", "E");
		flag = 0;
		return;
	}
	for (var i = 0;i < tablerows.length;i++) {
	    if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
	        strParams += tablerows[i].cells[1].getElementsByTagName("INPUT")[0].value.toUpperCase() + "~" + lang + "~" + tablerows[i].cells[2].getElementsByTagName("INPUT")[0].value + "~" + tablerows[i].cells[3].getElementsByTagName("SELECT")[0].value.toUpperCase() + "~" + tablerows[i].cells[4].getElementsByTagName("SELECT")[0].value.toUpperCase();
	        strParams += "!";
	    }
	}
	top.parent.gReqCode = 'UICONTROLLER';
	top.parent.gReqType = "APP";
	var radReqDOM = top.parent.buildRADXml();
	var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R004" + top.parent.gBodySeparator + strParams, "RADClientHandler");
	alertMessage(getXMLString(response), "I");
}

function getTabelRow(tableName) {

    var trow = "<TD><INPUT aria-required=\"false\" type=checkbox id=IS_COMMON name=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=ITEM_CODE name=ITEM_CODE size=24 onMouseOut=\"labelValidate(this);\"> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=ITEM_DESC name=ITEM_DESC size=40> </TD>" + "<TD><SELECT aria-required=\"false\" type=text id=LABEL_TYPE name=LABEL_TYPE ><OPTION VALUE=FLD>Field Label</OPTION><OPTION VALUE=BLK>Block Title</OPTION><OPTION VALUE=FST>Fieldset Title</OPTION><OPTION VALUE=SCR>Screen Title</OPTION><OPTION VALUE=LCL>LOV Column Heading</OPTION><OPTION VALUE=TAB>Tab Heading</OPTION><OPTION VALUE=BTN>Button Label</OPTION><OPTION VALUE=OPT>Field Option</OPTION></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" type=text id=Operation name=Operation ><OPTION VALUE=I>Insert</OPTION><OPTION VALUE=U>Update</OPTION></SELECT>  </TD>";
    return trow;
}

function labelValidate(field) {
    if (field.value != "") {
        var label = field.value;
        if (label.substring(0, 4) != "LBL_") {
            alertMessage("Label Code should start as: LBL_", "E");
            document.getElementById('ITEM_CODE').value = "";
        }
    }
}

function addNewRow(tableName) {

    if (!document.getElementById(tableName)) {
        return;
    }
    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var trow = getTabelRow(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(numRows);
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

function delRow(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableObject.tBodies[0].deleteRow(index);
        }
    }
}

function fnLoadmissinglabels(tblname) {
    // to fetch all missing labels   
    deleteAll(tblname.id);
    var listloop = parent.parent.lbl.length / 1000;
    var multRecd1 = "";
    for (var db = 0;db < listloop;db++) {
        var labels = "";
        if (parent.parent.lbl.length > 1000) {
            var list = db * 1000;
            var loop = list + 1000;
            if (loop > parent.parent.lbl.length)
                loop = parent.parent.lbl.length;
        }
        else {
            var loop = parent.parent.lbl.length;
            var list = 0;
        }
        for (var i = list;i < loop;i++) {
            if (parent.parent.lbl[i] != "")
                labels = labels + "'" + parent.parent.lbl[i] + "',";
        }
        labels = labels + "''";
        //labels
        var lang=parent.parent.lang; 
		var Missing_label_query="CSTB_LABEL_CODE";
		//var Missing_label_query= "FETCH@SELECT LABEL_CODE FROM CSTB_LABELS where LABEL_CODE in( " + labels + " ) and LANGUAGE_CODE='"+ lang +"'";
		var WhereString = "where LABEL_CODE in( " + labels + " ) and LANGUAGE_CODE='"+ lang +"'";
		try {
            parent.parent.gReqType = "APP";
            parent.parent.gReqCode = parent.parent.gAction;
            var radReqDOM = parent.parent.buildRADXml();
            var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
            var tempNode = radReqDOM.createElement("QUERY");
            bodyNode.appendChild(tempNode);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), Missing_label_query);
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
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), Missing_label_query);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
        }
        var multRecd = "";
        try {
            multRecd = getNodeText(selectSingleNode(response, "//Records")).split(">");
        }
        catch (e) {
            multRecd = response.substring(9, response.indexOf("</Records>")).split(">");
        }
        multRecd1 = multRecd1 + multRecd;
    }
    multRecd = multRecd1;
    multRecd = multRecd.split(",");
    var lbl = new Array();
    var typ = new Array();
    var n = 0;
    for (var i = 0;i < parent.parent.lbl.length;i++) {
        var flag = true;
        for (var j = 0;j < multRecd.length;j++) {
            if (parent.parent.lbl[i] == multRecd[j]) {
                flag = false;
                break;
            }
        }
        if (flag == true) {
            lbl[n] = parent.parent.lbl[i];
            typ[n] = parent.parent.typ[i]
            n++;
        }
    }
    var multRec = new Array();
    var multTyp = new Array();
    var k = 0;
    for (var i = 0;i < lbl.length;i++) {
        flag = true;
        for (var j = i + 1;j < lbl.length;j++) {
            if (lbl[i] == lbl[j]) {
                flag = false;
                break;
            }
        }
        if (flag == true) {
            if (lbl[i] != "") {
                multRec[k] = lbl[i];
                multTyp[k] = typ[i];
                k++;
            }
        }
    }
    var tableObj = tblname;
    parent.multRec = multRec;
    parent.multTyp = multTyp;
    parent.multRecd = multRecd;
    countoflines = multRec.length;
    if (tblname.id == 'mlabelCode') {
        firstrow = 0;
        page1 = Math.ceil(firstrow / 13);
        page1 = page1 + 1;
        page2 = Math.ceil(countoflines / 13);
        if (page2 == 0) {
            page1 = page2;
        }
        document.getElementById('pagesflow').value = " " + page1 + "of" + page2;
        if (page1 < page2 && page1 == 1) {
            document.getElementById('lblFirst').disabled = true;
            document.getElementById('lblPrev').disabled = true;
            document.getElementById('lblNext').disabled = false;
            document.getElementById('lblLast').disabled = false;
        }
        if (page1 <= page2 && page1 != 1 && page1 != 0) {
            document.getElementById('lblFirst').disabled = false;
            document.getElementById('lblPrev').disabled = false;
            document.getElementById('lblNext').disabled = true;
            document.getElementById('lblLast').disabled = true;
        }
        if (page2 == 1 || page2 == 0) {
            document.getElementById('lblFirst').disabled = true;
            document.getElementById('lblPrev').disabled = true;
            document.getElementById('lblNext').disabled = true;
            document.getElementById('lblLast').disabled = true;
        }
        if (page1 > 1 && page1 < page2) {
            document.getElementById('lblFirst').disabled = false;
            document.getElementById('lblPrev').disabled = false;
            document.getElementById('lblNext').disabled = false;
            document.getElementById('lblLast').disabled = false;
        }

        if (multRec.length <= 13) {
            var displaylength = multRec.length;
        }
        else var displaylength = 13;
        for (var sr = 0;sr < displaylength;sr++) {
            if ((multRec[sr] != "") && (multRec[sr] != 0)) {

                var singleRec = multRec[sr];
                var singleTyp = multTyp[sr];
                addNewRow(tblname.id);

                try {
                    tableObj.tBodies[0].rows[sr].cells[1].getElementsByTagName("INPUT")[0].value = singleRec;
                    tableObj.tBodies[0].rows[sr].cells[3].getElementsByTagName("SELECT")[0].value = singleTyp;
                }
                catch (e) {
                    tableObj.tBodies[0].rows[sr].cells[1].getElementsByTagName("SELECT")[0].value = singleRec[pnt];
                }

            }
        }
        doNavigatelbl1m(gcNAV_FIRST);
    }
}

function fnLoadAlllabels(tblname) {
    // to fetch all  labels  
    deleteAll(tblname.id);
    var listloop = parent.parent.lbl.length / 1000;
    var multRecd1 = "";
    for (var db = 0;db < listloop;db++) {
        var labels = "";
        if (parent.parent.lbl.length > 1000) {
            var list = db * 1000;
            var loop = list + 1000;
            if (loop > parent.parent.lbl.length)
                loop = parent.parent.lbl.length;
        }
        else {
            var loop = parent.parent.lbl.length;
            var list = 0;
        }
        for (var i = list;i < loop;i++) {
            if (parent.parent.lbl[i] != "")
                labels = labels + "'" + parent.parent.lbl[i] + "',";
        }
        labels = labels + "''";
        //labels
        var lang=parent.parent.lang;
		var Missing_label_query= "CSTBLABELS";
		//var Missing_label_query= "FETCH@SELECT LABEL_CODE,LABEL_DESCRIPTION FROM CSTB_LABELS where LABEL_CODE in( " + labels + " )  and LANGUAGE_CODE='"+ lang +"'";
		var WhereString = "where LABEL_CODE in( " + labels + " )  and LANGUAGE_CODE='"+ lang +"'";
        try {
            parent.parent.gReqType = "APP";
            parent.parent.gReqCode = parent.parent.gAction;
            var radReqDOM = parent.parent.buildRADXml();
            var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
            var tempNode = radReqDOM.createElement("QUERY");
            bodyNode.appendChild(tempNode);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), Missing_label_query);
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
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), Missing_label_query);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
        }
        var multRecd = "";
        try {
            multRecd = getNodeText(selectSingleNode(response, "//Records")).split(">");
        }
        catch (e) {
            multRecd = response.substring(9, response.indexOf("</Records>")).split(">");
        }
        multRecd1 = multRecd1 + multRecd;
    }
    multRecd = multRecd1;
    multRecd = multRecd.split(",");
    var lbl = new Array();
    var typ = new Array();
    var n = 0;

    var multRec = new Array();
    var multdesc = new Array();
    var multTyp = new Array();
    var k = 0;
    for (i = 0;i < parent.parent.lbl.length;i++) {
        flag = true;
        for (j = i + 1;j < parent.parent.lbl.length;j++) {
            if (parent.parent.lbl[i] != "") {
                if (parent.parent.lbl[i] == parent.parent.lbl[j]) {
                    flag = false;
                    break;
                }
            }
        }
        if (flag == true) {
            if (parent.parent.lbl[i] != "") {
                multRec[k] = parent.parent.lbl[i];
                multTyp[k] = parent.parent.typ[i];
                k++;
            }
        }
    }
    var tableObj = tblname;
    parent.multRec = multRec;
    parent.multTyp = multTyp;
    parent.multRecd = multRecd;
    countoflines = multRec.length;
    if (tblname.id == 'mlabelCode') {
        firstrow = 0;
        page1 = Math.ceil(firstrow / 13);
        page1 = page1 + 1;
        page2 = Math.ceil(countoflines / 13);
        document.getElementById('pagesflow').value = " " + page1 + "of" + page2;
        if (page1 < page2 && page1 == 1) {
            document.getElementById('lblFirst').disabled = true;
            document.getElementById('lblPrev').disabled = true;
            document.getElementById('lblNext').disabled = false;
            document.getElementById('lblLast').disabled = false;
        }
        if (page1 <= page2 && page1 != 1) {
            document.getElementById('lblFirst').disabled = false;
            document.getElementById('lblPrev').disabled = false;
            document.getElementById('lblNext').disabled = true;
            document.getElementById('lblLast').disabled = true;
        }
        if (page2 == 1) {
            document.getElementById('lblFirst').disabled = true;
            document.getElementById('lblPrev').disabled = true;
            document.getElementById('lblNext').disabled = true;
            document.getElementById('lblLast').disabled = true;
        }
        if (page1 > 1 && page1 < page2) {
            document.getElementById('lblFirst').disabled = false;
            document.getElementById('lblPrev').disabled = false;
            document.getElementById('lblNext').disabled = false;
            document.getElementById('lblLast').disabled = false;
        }

        if (multRec.length <= 13) {
            var displaylength = multRec.length;
        }
        else var displaylength = 13;
        for (var sr = 0;sr < displaylength;sr++) {
            if (multRec[sr] != 0) {

                var singleRec = multRec[sr];
                var singleTyp = multTyp[sr];
                var singledesc;
                addNewRow(tblname.id);
                for (var de = 0;de < multRecd.length;de++) {
                    if (singleRec == multRecd[de].split("~")[0]) {
                        singledesc = multRecd[de].split("~")[1];
                        break;
                    }
                    singledesc = "";
                }

                try {
                    tableObj.tBodies[0].rows[sr].cells[1].getElementsByTagName("INPUT")[0].value = singleRec;
                    tableObj.tBodies[0].rows[sr].cells[2].getElementsByTagName("INPUT")[0].value = singledesc;
                    tableObj.tBodies[0].rows[sr].cells[3].getElementsByTagName("SELECT")[0].value = singleTyp;
                }
                catch (e) {
                    tableObj.tBodies[0].rows[sr].cells[1].getElementsByTagName("SELECT")[0].value = singleRec[pnt];
                }

            }
        }
        doNavigatelbl1m(gcNAV_FIRST);

    }
}

function doNavigatelbl1(type) {
    // to navigate for  all labels 
    switch (type) {
        case gcNAV_FIRST: {
            firstrow = 0;
            lastrow = 13;
            displaylist();
        }
        break;
        case gcNAV_PREVIOUS: {
            if (firstrow <= 13) {
                firstrow = 0;
                lastrow = 13;
            }
            else {
                firstrow = firstrow - 13;
                lastrow = lastrow - 13;
            }

            displaylist();
        }
        break;
        case gcNAV_NEXT: {
            if (lastrow >= countoflines) {
                firstrow = countoflines - 13;
                lastrow = countoflines;
            }
            else {
                firstrow = firstrow + 13;
                lastrow = lastrow + 13;
            }
            displaylist();
        }
        break;
        case gcNAV_LAST: {
            if (countoflines >= 13) {
                firstrow = countoflines - 13;
                lastrow = countoflines;
            }
            else {
                firstrow = 0;
                lastrow = countoflines;

            }
            displaylist();
        }
        break;
        default :
            alertMessage("Program Error: doNavigate doesn't handle this action", "E");
    }

}

function doNavigatelbl1m(type) {
    // to navigate for missing labels 
    switch (type) {
        case gcNAV_FIRST: {
            firstrow = 0;
            lastrow = 13;
            displaylistlbls();
        }
        break;
        case gcNAV_PREVIOUS: {
            if (firstrow <= 13) {
                firstrow = 0;
                lastrow = 13;
            }
            else {
                firstrow = firstrow - 13;
                lastrow = lastrow - 13;
            }

            displaylistlbls();
        }
        break;
        case gcNAV_NEXT: {
            if (lastrow >= countoflines) {
                firstrow = countoflines - 13;
                lastrow = countoflines;
            }
            else {
                firstrow = firstrow + 13;
                lastrow = lastrow + 13;
            }
            displaylistlbls();
        }
        break;
        case gcNAV_LAST: {
            if (countoflines >= 13) {
                firstrow = countoflines - 13;
                lastrow = countoflines;
            }
            else {
                firstrow = 0;
                lastrow = countoflines;

            }
            displaylistlbls();
        }
        break;
        default :
            alertMessage("Program Error: doNavigate doesn't handle this action", "E");
    }

}

function displaylist() {
    // to display all labels  
    deleteAll("mlabelCode");
    page1 = Math.ceil(firstrow / 13);
    page1 = page1 + 1;
    document.getElementById('pagesflow').innerHTML = "<sup>" + page1 + " of " + page2+"</sup>";
    if (page1 < page2 && page1 == 1) {
        document.getElementById('lblFirst').disabled = true;
        document.getElementById('lblPrev').disabled = true;
        document.getElementById('lblNext').disabled = false;
        document.getElementById('lblLast').disabled = false;
    }
    if (page1 <= page2 && page1 != 1) {
        document.getElementById('lblFirst').disabled = false;
        document.getElementById('lblPrev').disabled = false;
        document.getElementById('lblNext').disabled = true;
        document.getElementById('lblLast').disabled = true;
    }
    if (page2 == 1) {
        document.getElementById('lblFirst').disabled = true;
        document.getElementById('lblPrev').disabled = true;
        document.getElementById('lblNext').disabled = true;
        document.getElementById('lblLast').disabled = true;
    }
    if (page1 > 1 && page1 < page2) {
        document.getElementById('lblFirst').disabled = false;
        document.getElementById('lblPrev').disabled = false;
        document.getElementById('lblNext').disabled = false;
        document.getElementById('lblLast').disabled = false;
    }

    multRec = parent.multRec;
    multTyp = parent.multTyp;
    multRecd = parent.multRecd;
    var tableObj = document.getElementById("mlabelCode");
    var rowcnt = 0;
    var endrow = lastrow;
    if (endrow >= countoflines)
        endrow = countoflines;
    for (var sr = firstrow;sr < endrow;sr++) {
        if (multRec[sr] != 0) {
            var singleRec = multRec[sr];
            var singleTyp = multTyp[sr];
            var singledesc;
            addNewRow("mlabelCode");
            for (var de = 0;de < multRecd.length;de++) {
                if (singleRec == multRecd[de].split("~")[0]) {
                    singledesc = multRecd[de].split("~")[1];
                    break;
                }
                singledesc = "";
            }

            try {
                tableObj.tBodies[0].rows[rowcnt].cells[1].getElementsByTagName("INPUT")[0].value = singleRec;
                tableObj.tBodies[0].rows[rowcnt].cells[2].getElementsByTagName("INPUT")[0].value = singledesc;
                tableObj.tBodies[0].rows[rowcnt].cells[3].getElementsByTagName("SELECT")[0].value = singleTyp;
                rowcnt++;
            }
            catch (e) {
                null;
            }

        }
    }
}

function displaylistlbls() {
    // to display missing labels  
    deleteAll("mlabelCode");
    page1 = Math.ceil(firstrow / 13);
    page1 = page1 + 1;
    document.getElementById('pagesflow').innerHTML = "<sup>" + page1 + " of " + page2+"</sup>";
    if (page1 < page2 && page1 == 1) {
        document.getElementById('lblFirst').disabled = true;
        document.getElementById('lblPrev').disabled = true;
        document.getElementById('lblNext').disabled = false;
        document.getElementById('lblLast').disabled = false;
    }
    if (page1 <= page2 && page1 != 1) {
        document.getElementById('lblFirst').disabled = false;
        document.getElementById('lblPrev').disabled = false;
        document.getElementById('lblNext').disabled = true;
        document.getElementById('lblLast').disabled = true;
    }
    if (page2 == 1) {
        document.getElementById('lblFirst').disabled = true;
        document.getElementById('lblPrev').disabled = true;
        document.getElementById('lblNext').disabled = true;
        document.getElementById('lblLast').disabled = true;
    }
    if (page1 > 1 && page1 < page2) {
        document.getElementById('lblFirst').disabled = false;
        document.getElementById('lblPrev').disabled = false;
        document.getElementById('lblNext').disabled = false;
        document.getElementById('lblLast').disabled = false;
    }

    multRec = parent.multRec;
    multTyp = parent.multTyp;
    multRecd = parent.multRecd;
    var tableObj = document.getElementById("mlabelCode");
    var rowcnt = 0;
    var endrow = lastrow;
    if (endrow >= countoflines)
        endrow = countoflines;
    for (var sr = firstrow;sr < endrow;sr++) {
        if (multRec[sr] != 0) {
            var singleRec = multRec[sr];
            var singleTyp = multTyp[sr];
            addNewRow("mlabelCode");
            for (var de = 0;de < multRecd.length;de++) {
                if (singleRec == multRecd[de].split("~")[0]) {
                    singledesc = multRecd[de].split("~")[1];
                    break;
                }
                singledesc = "";
            }

            try {
                tableObj.tBodies[0].rows[rowcnt].cells[1].getElementsByTagName("INPUT")[0].value = singleRec;
                tableObj.tBodies[0].rows[rowcnt].cells[2].getElementsByTagName("INPUT")[0].value = singledesc;
                tableObj.tBodies[0].rows[rowcnt].cells[3].getElementsByTagName("SELECT")[0].value = singleTyp;
                rowcnt++;
            }
            catch (e) {
                null;
            }

        }
    }
}