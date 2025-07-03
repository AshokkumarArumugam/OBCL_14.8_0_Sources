/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadSelectColumns.js
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

var newwin1 = "";
var columns = "";
var columnSizes = "";
var columnDataTypes = "";
var columnLable = "";
var columnFiledName = "";
var coldecimal = "";
var queryArea = "";
var lovName = "";

var radLovDetNodeXml = '<RAD_LOV_DETAILS><QUERY_COLS/><DATATYPE/><REDN_FLD_NAME/>';
radLovDetNodeXml += '<REDN_FLD_LABEL/><REDN_FLD_TYPE/><COL_HEADING/></RAD_LOV_DETAILS>';

function fnGetDBColFields(strDatasrcName, attr) {
	var gwFuncNode = selectNodes(dom, "//RAD_FUNC_PREFERENCES/GW_FUNCTION")[0];
	if(gwFuncNode != null && getNodeText(gwFuncNode) == "Y"){
		var dataSourceName = strDatasrcName;
	    if (strDatasrcName.indexOf("__") !=  - 1) {
	        dataSourceName = strDatasrcName.substring(0, strDatasrcName.indexOf("__"));

	    }
		loadSubScreenDIV("ChildWin", "RadDataScrFields_GW.jsp");
		return;
	}

    var dataSourceName = strDatasrcName;
    if (strDatasrcName.indexOf("__") !=  - 1) {
        dataSourceName = strDatasrcName.substring(0, strDatasrcName.indexOf("__"));

    }
    top.parent.gReqCode = 'UICONTROLLER';
    top.parent.gReqType = "APP";
    var radReqDOM = top.parent.buildRADXml();
    var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R002" + top.parent.gBodySeparator + "" + "~" + dataSourceName, "RADClientHandler");
    var response = getXMLString(response);
    if (response == "") {
        alertMessage("Error: DATASRC field in datablk screen should be a valid table", "E");
        return false;
    }

    var rawColumns = response.split("<column>",  - 1)[1].split("</column>",  - 1)[0];

    if (rawColumns.lastIndexOf("DB Error") !=  - 1) {
        var error = rawColumns;
        alertMessage(error, "E");
        return false;
    }
    var rawSize = response.split("<size>",  - 1)[1].split("</size>",  - 1)[0];
    var rawDataType = response.split("<data>",  - 1)[1].split("</data>",  - 1)[0];
    var rawNullable = response.split("<nullable>",  - 1)[1].split("</nullable>",  - 1)[0];
    var fieldName = response.split("<fldsName>",  - 1)[1].split("</fldsName>",  - 1)[0];
	var decimals = response.split("<decimals>",-1)[1].split("</decimals>",-1)[0];
	

    dbColumns = rawColumns.split("~");
    var dbColumnSizes = rawSize.split("~");
    dbColumnDataTypes = rawDataType.split("~");
    var dbColumnNullable = rawNullable.split("~");
    var dbfldName = fieldName.split("~");
	var dbdecmal = decimals.split("~");

    var radFldNodes = "";
    if (selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + strDatasrcName + "']/RAD_FIELDS")) {
        radFldNodes = selectNodes(dom, "//RAD_DATASOURCES[@ID='" + strDatasrcName + "']/RAD_FIELDS")
        var deleteFlag = 0;

        for (var i = 0;i < dbColumns.length;i++) {
            deleteFlag = 0;
            for (var j = 0;j < radFldNodes.length;j++) {

                if (getNodeText(selectSingleNode(radFldNodes[j], "COLUMN_NAME")) == dbColumns[i]) {
                    deleteFlag = 1;
                    if (deleteFlag) {
                        delete dbColumns[i];
                        delete dbColumnSizes[i];
                        delete dbColumnDataTypes[i];
                        delete dbColumnNullable[i];
                        delete dbfldName[i];
						delete dbdecmal[i];
                    }
                }
            }
        }

    }
    dbColumns = rearrangeArray(dbColumns);
    dbColumnSizes = rearrangeArray(dbColumnSizes);
    dbColumnDataTypes = rearrangeArray(dbColumnDataTypes);
    dbColumnNullable = rearrangeArray(dbColumnNullable);
    dbfldName = rearrangeArray(dbfldName);
	dbdecmal = rearrangeArray(dbdecmal);

    dbColumsArry[0] = dbColumns;
    dbColumsArry[1] = dbColumnSizes;
    dbColumsArry[2] = dbColumnDataTypes;
    dbColumsArry[3] = dbColumnNullable;
    dbColumsArry[4] = dbfldName;
    dbColumsArry[5] = attr;
	dbColumsArry[6] = dbdecmal;
	

    parent.dbColumsArry = dbColumsArry;

    columns = dbColumns;
    columnSizes = dbColumnSizes;
    columnDataTypes = dbColumnDataTypes;
    columnLable = dbColumnNullable;
    columnFiledName = dbfldName;
	coldecimal = dbdecmal;
    loadSubScreenDIV("ChildWin", "RadDataScrFields.jsp");

}

function getTabelRowDsFlds(tableName) {

    var trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=COL_NAME readonly size=45 name=COL_NAME> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=DATA_TYPE readonly size=10 name=DATA_TYPE></TD>" + "<TD><INPUT aria-required=\"false\" type=hidden id=MAX_LEN readonly  name=MAX_LEN></TD>" + "<TD><INPUT aria-required=\"false\" type=hidden id=LBL_CODE readonly  name=LBL_CODE></TD>" + "<TD><INPUT aria-required=\"false\" type=hidden id=FLD_NAME readonly  name=FLD_NAME></TD>" +"<TD><INPUT type=hidden id=MAX_DEC readonly  name=MAX_DEC></TD>"
    return trow;
}

function addNewRowDsFlds(tableName) {

    if (!document.getElementById(tableName)) {
        return;
    }

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var trow = getTabelRowDsFlds(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
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

function populateFlds(columns, datatypes, newdtsize, columnlable, selectcolumnFiledName, frmnumCol, toColum,coldecimal) {

    var tableObject = document.getElementById("DataScrfldTable");
    for (var i = 0;i < columns.length;i++) {
        addNewRowDsFlds('DataScrfldTable');
        tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = columns[i];
        tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value = datatypes[i];
        tableObject.tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value = newdtsize[i];
        tableObject.tBodies[0].rows[i].cells[4].getElementsByTagName("INPUT")[0].value = columnlable[i];
        tableObject.tBodies[0].rows[i].cells[5].getElementsByTagName("INPUT")[0].value = selectcolumnFiledName[i];
		 tableObject.tBodies[0].rows[i].cells[6].getElementsByTagName("INPUT")[0].value=coldecimal[i];

    }
}

function addFields(frmfields, attr, columns, datatypes, dtsize, columnlable,coldecimal) {

    var returnvals = new Array();
    var tableObject = document.getElementById("DataScrfldTable");
    var rowlength = tableObject.tBodies[0].rows.length;

    for (var i = 0;i < rowlength;i++) {
        if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
            columns[i] = tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
            datatypes[i] = tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value;
            dtsize[i] = tableObject.tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value;
            columnlable[i] = tableObject.tBodies[0].rows[i].cells[4].getElementsByTagName("INPUT")[0].value;
            columnFiledName[i] == tableObject.tBodies[0].rows[i].cells[5].getElementsByTagName("INPUT")[0].value;
			  coldecimal[i]==tableObject.tBodies[0].rows[i].cells[6].getElementsByTagName("INPUT")[0].value;
        }
        else {

            delete columns[i];
            delete datatypes[i];
            delete dtsize[i];
            delete columnlable[i];
            delete columnFiledName[i];
			delete coldecimal[i];

        }
    }

    columns = rearrangeArray(columns);
    datatypes = rearrangeArray(datatypes);
    dtsize = rearrangeArray(dtsize);
    columnlable = rearrangeArray(columnlable);
    columnFiledName = rearrangeArray(columnFiledName);
		coldecimal= rearrangeArray(coldecimal);

    if (columns.length == 0) {
        alertMessage("No Field Selected", "E");
        return false;
    }

    parent.columns = columns;
    parent.columnDataTypes = datatypes;
    parent.columnSizes = dtsize;
    parent.columnNullable = columnlable;
    parent.columnFiledName = columnFiledName;
	 parent.coldecimal= coldecimal;
    parent.CreateDOM(attr);

}

function rearrangeArray(arrayName) {
    var tempArr = new Array();
    var j = 0;
    for (var i = 0;i < arrayName.length;i++) {
        if (typeof arrayName[i] != 'undefined') {
            if (arrayName[i] == "null") {
                arrayName[i] = "";
            }
            tempArr[j] = arrayName[i];
            j++;
        }
    }
    return tempArr;
}

function fnCheckDuplicate(blkName, flds) {
    var blkFlds = selectNodes(selectSingleNode(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']"), "RAD_BLK_FIELDS");
    for (var i = 0;i < blkFlds.length;i++) {
        for (var j = 0;j < flds.length;j++) {
            if (getNodeText(selectSingleNode(blkFlds[i], "FIELD_NAME")) == flds[j]) {
                return 1;
            }
        }
    }
}

//LOV populate
function fnPopulateQueryCols(query, lovname) {
    queryArea = query;
    lovName = lovname;
    appendData("LOV~" + lovName);

    var txt = populateQueryDetail(1);
}

function populateQueryDetail(rsbindvar) {

    var xmlhttp = createHTTPActiveXObject();
    // queryArea=document.getElementById("LOV_QUERY");
    var queryText = queryArea;//trim(queryArea.value);
    if (queryText == "") {
        alertMessage("Enter a query", "E");
        return;
    }
    if (queryText.indexOf('?') !=  - 1) {
        if (rsbindvar.length < 1) {
            alertMessage("Entries for Bind variables are missing!! Please ReCheck", "E");
            return;
        }

        var counter = queryText.split('?');

        var index = queryText.indexOf('?');
        // for(var i=0;i<rsbindvar.length;i++)
        for (var i = 0;i < counter.length - 1;i++) {
            queryText = queryText.substring(0, index) + " '' " + queryText.substring(index + 1);
            index = queryText.indexOf('?', index + 1);
        }
    }

    var query = formatQuery(queryText, "FCJDEV");//dlgArg.MAIN_WIN.schemaName);
    //xmlhttp.open("POST", "UIControllerServlet?" + parent.jndiName + "@R013", false);
    //xmlhttp.send(query);
    top.parent.gReqCode = 'UICONTROLLER';
    top.parent.gReqType = "APP";
    var radReqDOM = top.parent.buildRADXml();
    var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R013" + top.parent.gBodySeparator + query, "RADClientHandler");
    //var response = xmlhttp.responseXML;
    response = getXMLString(response) + "";

    var rawColumns = response.split("<column>",  - 1)[1].split("</column>",  - 1)[0];
    if (rawColumns.lastIndexOf("DB Error") !=  - 1) {
        var error = rawColumns;
        alertMessage(error, "E");//show error
        return;
    }
    else if (rawColumns.lastIndexOf(",") !=  - 1) {
	  alertMessage("Special Characters Not Allowed in Lov Query","E");
      deleteAll("lovDetails");
	  return false;
	}

    var rawdataTypes = response.split("<data>",  - 1)[1].split("</data>",  - 1)[0];
    columns = new Array();
    dataType = new Array();

    columns = rawColumns.split("~");
    dataType = rawdataTypes.split("~");
    var lovDOM = "";
    var lovNode = null;

    //delete the existing nodes
    var lovNodes = selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS"));
    for (var j = 0;j < lovNodes.length;j++) {
        lovNodes[j].parentNode.removeChild(lovNodes[j]);
    }
    var radLovDetNodeXml = '<RAD_LOV_DETAILS><QUERY_COLS/><DATATYPE/><REDN_FLD_NAME/>';
    radLovDetNodeXml += '<REDN_FLD_LABEL/><REDN_FLD_TYPE/><COL_HEADING/></RAD_LOV_DETAILS>';
    //get the info from above and populate the nodes and append to current rad_lovs node
    for (var i = 0;i < columns.length;i++) {
        lovDOM = loadXMLDoc("<root>" + radLovDetNodeXml.toString() + "</root>");
        if (columns[i] == "''") {
            columns[i] = 1;
        }
        selectSingleNode(dom, ("//RAD_LOVS[@ID='" + lovName + "']")).appendChild(lovDOM.createElement("RAD_LOV_DETAILS"));
        var ndLen = selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS")).length;
        selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS"))[ndLen - 1].appendChild(lovDOM.createElement("QUERY_COLS"));
        setNodeText(selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS/QUERY_COLS"))[ndLen - 1], columns[i]);
        selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS"))[ndLen - 1].appendChild(lovDOM.createElement("DATATYPE"));
        setNodeText(selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS/DATATYPE"))[ndLen - 1], dataType[i]);
        selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS"))[ndLen - 1].appendChild(lovDOM.createElement("REDN_FLD_NAME"));
        setNodeText(selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS/REDN_FLD_NAME"))[ndLen - 1], columns[i]);
        selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS"))[ndLen - 1].appendChild(lovDOM.createElement("REDN_FLD_TYPE"));
        setNodeText(selectNodes(dom, ("//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS/REDN_FLD_TYPE"))[ndLen - 1], "TEXT");

    }
    fnReassignIdsToFields();
    showData("LOV~" + lovName);

}

function fnReassignIdsToFields() {
    var nodeFields = selectNodes(dom, ("//RAD_LOV[@ID='" + lovName + "']/RAD_LOV_DETAILS"));
    for (var i = 0;i < nodeFields.length;i++)
        nodeFields[i].setAttribute("ID", i + 1);
}

function formatQuery(queryString, schemaName) {
    var i;
    var j;
    var k;
    var queryStringLowerCase = "";
    var transformedQuery = "";
    var leftQuery = "";
    var leftQueryLowerCase = "";
    var fromPos, startPos;
    var nextChar;
    var endPos;
    var tablePart = "";
    var lastStartPos;

    // queryString=trim(replaceAllOutsideQuotes(queryString,"\t"," "));
    queryString = replaceAllOutsideQuotes(queryString, "\t", " ");
    queryString = replaceAll(queryString, "~", "");
    //alertMessage("query="+queryString);
    queryString = replaceAllOutsideQuotes(queryString, "(", " ( ");// added by ANANTHL - 21 April 2004
    queryString = replaceAllOutsideQuotes(queryString, ")", " ) ");// added by ANANTHL - 21 April 2004
    queryString = replaceAllOutsideQuotes(queryString, "   ", " ");// added by aakriti - 19/04/04    
    queryString = replaceAllOutsideQuotes(queryString, "  ", " ");
    queryString = replaceAllOutsideQuotes(queryString, "   ", " ");// added by aakriti - 19/04/04    
    queryString = replaceAllOutsideQuotes(queryString, "  ", " ");// added by aakriti - 19/04/04    
    queryStringLowerCase = queryString.toLowerCase();

    fromPos = indexOf(queryStringLowerCase, " from ", 0);

    while (fromPos !=  - 1) {
        transformedQuery = transformedQuery + " " + queryString.substring(0, fromPos + 5);
        leftQueryLowerCase = queryStringLowerCase.substring(fromPos + 5);
        leftQuery = queryString.substring(fromPos + 5);

        startPos = 0;
        endPos = 0;

        //Take the Table Name Part Alone    
        for (j = 0;j < leftQueryLowerCase.length;j++) {
            nextChar = leftQueryLowerCase.charAt(j);

            lastStartPos =  - 1;

            if (nextChar != ' ') {
                startPos = j;

                for (k = j;k < leftQueryLowerCase.length;k++) {
                    nextChar = leftQueryLowerCase.charAt(k);

                    if ((nextChar == ' ') || (nextChar == ',') || (nextChar == ')') || (k == leftQueryLowerCase.length - 1)) {
                        endPos = k;

                        if (lastStartPos !=  - 1) {
                            startPos = lastStartPos;
                        }

                        tablePart = leftQuery.substring(startPos, endPos);

                        if (tablePart != "") {
                            if (trim(tablePart).charAt(0) == '(') {
                                if ((endPos + 7 <= leftQuery.length) && ((leftQueryLowerCase.substring(endPos + 1, endPos + 7)) == "SELECT")) {
                                    var subqueryStart = endPos + 1;
                                    k = subqueryStart;
                                    var subquery = "";
                                    var paranthesesDepth = 0;

                                    while ((nextChar = leftQuery.charAt(k++)) != ')' || paranthesesDepth > 0) {
                                        if (nextChar == '(')
                                            paranthesesDepth++;
                                        else if (nextChar == ')')
                                            paranthesesDepth--;
                                        else if (nextChar == "\'")//ignore the quoted char literals
                                        {
                                            subquery += "\'";
                                            while ((nextChar = leftQuery.charAt(k++)) != "\'")
                                                subquery += nextChar;
                                        }

                                        subquery += nextChar;
                                    }

                                    nextChar = leftQuery.charAt(k);//if a subquery comes in a main query in the FROM clause, it should have an alias name attached to it
                                    endPos = k - 1;

                                    tablePart = "(" + formatQuery(subquery, schemaName);
                                }
                            }
                        }
                        else if (lastStartPos !=  - 1) {
                            startPos = lastStartPos;
                            continue;
                        }

                        transformedQuery = transformedQuery + ' ' + tablePart;

                        if (nextChar == ',') {
                            //Second Table Exists.
                            transformedQuery = transformedQuery + ' ' + nextChar;
                            lastStartPos = endPos + 1;
                            startPos = 0;
                            continue;// added by aakriti - 19/04/04  
                        }
                        // added by aakriti - 19/04/04                                    
                        // here we need to look for the next comma and if there is a space in that string.
                        else if (nextChar == ' ') {
                            //alertMessage("within if"+(endPos+1)+"  "+leftQueryLowerCase.length);
                            if (leftQueryLowerCase.charAt(endPos + 1) == ')')//if the sub query ends
                                break;

                            var index = leftQueryLowerCase.indexOf(',', endPos + 1);

                            if (index !=  - 1) {
                                var cnt = countOccurrences(leftQueryLowerCase, " ", endPos + 1, index);

                                if (cnt <= 1) {
                                    lastStartPos = index + 1;
                                    k = index + 1;
                                    startPos = 0;
                                    transformedQuery = transformedQuery + leftQuery.substring(endPos, index + 1);
                                    continue;
                                }
                            }
                        }

                        break;
                    }
                }

                break;
            }
        }

        queryStringLowerCase = leftQueryLowerCase.substring(endPos);
        queryString = leftQuery.substring(endPos);
        fromPos = indexOf(queryStringLowerCase, " from ", 0);

        if (fromPos ==  - 1) {
            if (queryStringLowerCase.indexOf(' ') !=  - 1) {
                transformedQuery = transformedQuery + " " + queryString;
            }
            else {
                transformedQuery = transformedQuery + queryString;
            }
        }
    }

    return trim(transformedQuery);
}

function replaceAllOutsideQuotes(queryString, findString, replaceString)
/** This method replaces all the occurences of 'findString' within 'queryString'
 * which don't occur within a pair of quotes
 */
{
    var startIndex = 0;
    var endIndex = 0;

    var length = queryString.length;
    var findStringLength = findString.length;
    var replaceStringLength = replaceString.length;

    while ((endIndex = queryString.indexOf(findString, startIndex)) !=  - 1) {
        if (isQuoteClosed(queryString, startIndex, endIndex)) {
            queryString = queryString.substring(0, endIndex) + replaceString + queryString.substring(endIndex + findStringLength);
            startIndex = endIndex + replaceStringLength;
        }
        else {
            startIndex = queryString.indexOf('\'', endIndex) + 1;
        }
    }
    return queryString;
}

function countOccurrences(mainString, findString, startIndex, endIndex) {
    var count = 0;
    var nextStart = startIndex, nextEnd =  - 1;

    while (((nextEnd = mainString.indexOf(findString, nextStart)) !=  - 1) && (nextEnd < endIndex)) {
        nextStart = nextEnd + 1;
        count++;
    }

    return count;
}

function isQuoteClosed(queryString, startIndex, endIndex) {
    return countOccurrences(queryString, "\'", startIndex, endIndex) % 2 == 0;
}

function isWhitespace(ch) {
    if (ch == ' ' || ch == '\n' || ch == '\r' || ch == '\t' || ch == '\f' || ch == '\b')
        return true;
    return false;
}

function ltrim(argvalue) {
    argvalue = argvalue + "";
    while (true) {
        if (!isWhitespace(argvalue.substring(0, 1)))
            break;
        argvalue = argvalue.substring(1, argvalue.length);
    }
    return argvalue;
}

function rtrim(argvalue) {
    argvalue = argvalue + "";
    while (true) {
        if (!isWhitespace(argvalue.substring(argvalue.length - 1)))
            break;
        argvalue = argvalue.substring(0, argvalue.length - 1);
    }
    return argvalue;
}

/* To trim any field*/

function trim(argvalue) {
    argvalue = argvalue + "";
    var tmpstr = ltrim(argvalue);
    return rtrim(tmpstr);
}

function indexOf(query, findString, from)
/** This method gives the 'index' of 'findString' within the query such that 'index'
 * lies outside any pair of quotes (if any)
 */
{
    var lastIndex = from, index;
    var findLength = findString.length;

    while ((index = query.indexOf(findString, lastIndex)) !=  - 1) {
        if (isQuoteClosed(query, lastIndex, index))
            return index;
        else {
            lastIndex = query.indexOf('\'', index) + 1;
        }
    };

    return  - 1;
}


function fn_Mapping() { 
 
    var tmp = 0;
    var rowindex = 0;
    var scrArg = "";
   
        if (document.getElementById('LOV_STATUS_LOVDTLS').value != "C") { 
            alertMessage("Only for Combined Lov", "I"); 
        return false;
    }
        var lov_q=document.getElementById('LOV_QUERY_LOVDTS').value;
        var bindr=lov_q.split("?"); 
        var tabObj = document.getElementById("lovDetails");
        var tmp="";
        for (var i = 0;i < tabObj.tBodies[0].rows.length;i++) { 
                tmp += tabObj.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value +","; 
        }
        
        document.getElementById('COMBINED_QUERY_DTLS_LOVDTLS').value = bindr.length+"?"+tmp;
        var Lov_Name = document.getElementById('LOV_NAME_QUERY_LOVDTLS').value;
        var Lov_QUERY = document.getElementById('COMBINED_QUERY_DTLS_LOVDTLS').value;
        var functionname = document.getElementById("FUNCTION_ID").value; 
       
          
        loadSubScreenDIV("ChildWin", "RadLovCMapping.jsp?&lovName=" + Lov_Name + "&functionname=" + functionname + "&lovquery=" + Lov_QUERY);
}