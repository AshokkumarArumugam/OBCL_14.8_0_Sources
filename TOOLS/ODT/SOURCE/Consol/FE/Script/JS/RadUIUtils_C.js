/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadUIUtils.js
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
var prevPartname;

function winNtfyrtn() {
    logScreen = "C";
    var r = alertMessage("Changes Will Be Lost Do You Want To Proceed", "O");

}

function checkAll(tableName, chk) {
    var inputs = document.getElementById(tableName).getElementsByTagName('INPUT');
    var checkboxes = [];
    for (var i = 0;i < inputs.length;i++) {
        if (document.getElementById(tableName).rows[0].getElementsByTagName("INPUT")[0].checked == true) {
            if (inputs[i].name == chk) {
                inputs[i].checked = true;
            }
        }
        if (document.getElementById(tableName).rows[0].getElementsByTagName("INPUT")[0].checked == false) {
            if (inputs[i].name == chk) {
                inputs[i].checked = false;
            }
        }
    }
}

function fnCheckUncheckAll() {

    var l_ChBoxs = document.getElementsByName("RSLT_CHKBOX");
    var l_ChkStatus = true;
    if (l_ChBoxs[0].checked == true)
        l_ChkStatus = true;
    else 
        l_ChkStatus = false;

    for (var l_Cnt = 0;l_Cnt < l_ChBoxs.length;l_Cnt++) {
        l_ChBoxs[l_Cnt].checked = l_ChkStatus;
    }
}

function checkAll(tableName, chk, chkName) {

    var l_ChkStatus = true;
    tableObject = document.getElementsByName(tableName)[0];
    rowList = tableObject.tBodies[0].rows;
    numRows = rowList.length;

    var l_ChBoxs = document.getElementsByName(chkName);
    if (l_ChBoxs[0].checked == true)
        l_ChkStatus = true;
    else 
        l_ChkStatus = false;

    for (var i = 0;i < numRows;i++) {
        document.getElementById(tableName).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = l_ChkStatus;
    }
}

function LovEnableLOVFlds(lovname) {

    if (lovname == 'OFF_LINE_LOV_NAME') {
        document.getElementById('GLOBAL_OFF_LINE_LOV_NAME').value = "";
    }
    else {
        document.getElementById('GLOBAL_LOV_NAME').value = "";
    }
    LovEnableFlds();
}

function EnableDBDFlds() {

    if (document.getElementById('DISPLAY_TYPE_BLKF').value == "LINK") {
        document.getElementById("li_DashBoardLink").style.display = "inline";
        document.getElementById("li_DashBoardLink").disabled = false;
    }
    if (document.getElementById('DISPLAY_TYPE_BLKF').value != "LINK") {
        document.getElementById("li_DashBoardLink").style.display = "none";
        document.getElementById("li_DashBoardLink").disabled = true;
    }
}

function LovEnableFlds() {

    if (document.getElementById('LOV_NAME').value != "" || document.getElementById('GLOBAL_LOV_NAME').value != "") {
        document.getElementById("li_bindVariables").style.display = "inline";
        document.getElementById("li_bindVariables").disabled = false;
        document.getElementById("li_returnField").style.display = "inline";
        document.getElementById("li_returnField").disabled = false;

    }
    if (document.getElementById('LOV_NAME').value == "" && document.getElementById('GLOBAL_LOV_NAME').value == "") {
        document.getElementById("li_bindVariables").style.display = "none";
        document.getElementById("li_bindVariables").disabled = true;
        document.getElementById("li_returnField").style.display = "none";
        document.getElementById("li_returnField").disabled = true;
    }
    if (document.getElementById('OFF_LINE_LOV_NAME').value != "" || document.getElementById('GLOBAL_OFF_LINE_LOV_NAME').value != "") {
        document.getElementById("li_offlineBindVariables").style.display = "inline";
        document.getElementById("li_offlineBindVariables").disabled = false;
        document.getElementById("li_offlineReturnField").style.display = "inline";
        document.getElementById("li_offlineReturnField").disabled = false;
    }
    if (document.getElementById('OFF_LINE_LOV_NAME').value == "" && document.getElementById('GLOBAL_OFF_LINE_LOV_NAME').value == "") {
        document.getElementById("li_offlineBindVariables").style.display = "none";
        document.getElementById("li_offlineBindVariables").disabled = true;
        document.getElementById("li_offlineReturnField").style.display = "none";
        document.getElementById("li_offlineReturnField").disabled = true;
    }
    var disptype = document.getElementById('DISPLAY_TYPE_BLKF').value;
    if (disptype != "AMOUNT" && disptype != "LOV" && disptype != "TEXT" && disptype != "SELECT") {
        document.getElementById("li_AmountTab").style.display = "none";
        document.getElementById("li_AmountTab").disabled = true;
    }
    else if (disptype == "AMOUNT" || disptype == "LOV" || disptype == "TEXT" || disptype == "SELECT") {
        document.getElementById("li_AmountTab").style.display = "inline";
        document.getElementById("li_AmountTab").disabled = false;
    }

    if (disptype != "ACCOUNT" && disptype != "CUSTOMER" && disptype != "GLCODE") {
        document.getElementById("li_Patternstab").style.display = "none";
        document.getElementById("li_Patternstab").disabled = true;
    }
    else if (disptype == "ACCOUNT" || disptype == "CUSTOMER" || disptype == "GLCODE") {
        document.getElementById("li_Patternstab").style.display = "inline";
        document.getElementById("li_Patternstab").disabled = false;
    }

}

function SetMultirec() {
    var selindex = document.getElementById('RELATION_TYPE_DSR').options.selectedIndex;
    var selval = document.getElementById('RELATION_TYPE_DSR').options[selindex].value;
    if (selval == "N") {
        document.getElementById('MULTI_RECORD_DSR').value = "Y";
    }
    else if (selval == "1") {
        document.getElementById('MULTI_RECORD_DSR').value = "N";
    }

}

function FnShowTabs(divid) {

    var tablist = "DIV_DBF~DIV_CB~DIV_SUMORDER~DIV_EVENTS~DIV_CUST_ATTRS~DIV_BIND_VRBLS~DIV_RTN_FLD~DIV_OFF_LINE_BIND_VRBLS~DIV_OFF_LINE_RTN_FLD~DIV_DASHBOARD_LINK~DIV_AMOUNTTAB~DIV_PRG_BUS_FLTR_D~DIV_PRG_EXE_FLTR_D~DIV_PRG_FF_FLTR_D~DIV_PATTERNS~DIV_CRISEARCH";
    tablist = tablist.split('~');
    for (var i = 0;i < tablist.length;i++) {
        if (document.getElementById(tablist[i])) {
            document.getElementById(tablist[i]).style.display = "none";
            document.getElementsByName("TAB_" + tablist[i])[0].style.borderBottom = "1px solid #fff";
            document.getElementsByName("TAB_" + tablist[i])[0].style.background = "url(Images/Flexblue/RTabLeft.gif) no-repeat left top";
            document.getElementsByName("SP_" + tablist[i])[0].style.background = "url(Images/Flexblue/RTabRight.gif) no-repeat right top";
        }
    }
    document.getElementById(divid).style.display = "block";
    document.getElementsByName("TAB_" + divid)[0].style.borderBottom = "1px solid #fff";
    document.getElementsByName("TAB_" + divid)[0].style.background = "url(Images/Flexblue/RTabSLeft.gif) no-repeat left top";
    document.getElementsByName("SP_" + divid)[0].style.background = "url(Images/Flexblue/RTabSRight.gif) no-repeat right top";
    if (divid == "DIV_SUMORDER") {
        fnShowSummaryOrders();
    }
    fnSetSmrQryOrder();
}

function fnShowSummaryOrders() {
    var Smryflds = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS");
	var SmryRflds = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS[RESULT='Y']");
    var SmryQlds = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS[QUERY='Y']");
    var smrqryord = getNodeText(selectSingleNode(dom, "//RAD_SUMMARY/SUM_QUERYORDER"));
    var smrrsltord = getNodeText(selectSingleNode(dom, "//RAD_SUMMARY/SUM_RESULTORDER"));

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

    if ((smrrsltord == "" && smrqryord == "") || (SmryRflds.length != smrrsltord.split("~").length) || (SmryQlds.length != smrqryord.split("~").length) || ((smrrrd.length != sres || smrord.length != sor))) {
        smrrsltord = "";
        smrqryord = "";
        for (var i = 0;i < SmryRflds.length;i++) {
            var fldn = getNodeText(selectSingleNode(SmryRflds[i], "FIELD_NAME"));
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
    deleteAll("SUM_RESULT_ORDER");
    deleteAll("SUM_QUERY_ORDER");
    if (smrrsltord != "" && smrqryord != "") {
        var smrrsltord_R = smrrsltord.split("~");
        var smrqryord_Q = smrqryord.split("~");

        for (var j = 0;j < smrrsltord_R.length;j++) {
            addNewRow("SUM_RESULT_ORDER");
            document.getElementsByName("SUM_RESULT_ORDER")[0].tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].value = smrrsltord_R[j];
            document.getElementsByName("SUM_RESULT_ORDER")[0].tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value = j + 1;
        }
        for (j = 0;j < smrqryord_Q.length;j++) {
            addNewRow("SUM_QUERY_ORDER");
            document.getElementsByName("SUM_QUERY_ORDER")[0].tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].value = smrqryord_Q[j];
            document.getElementsByName("SUM_QUERY_ORDER")[0].tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value = j + 1;
        }
    }
    setNodeText(selectSingleNode(dom, "//RAD_SUMMARY/SUM_QUERYORDER"), smrqryord);
    setNodeText(selectSingleNode(dom, "//RAD_SUMMARY/SUM_RESULTORDER"), smrrsltord);

}

function fnSetSmrQryOrder() {
    var tableName = "SUM_QUERY_ORDER~SUM_RESULT_ORDER".split("~");
    if (selectNodes(dom, "//RAD_SUMMARY").length > 0) {
        for (var t = 0;t < tableName.length;t++) {
            var sumrflds = "";
            var tableObj1 = document.getElementById(tableName[t]);
            var newRows = new Array();
            if (tableObj1.tBodies[0].rows.length > 1) {
                for (var j = 0;j < tableObj1.tBodies[0].rows.length;j++) {
                    newRows[j] = new Array(2);
                    for (var k = 0;k < 2;k++) {
                        newRows[j][k] = tableObj1.tBodies[0].rows[j].cells[k].getElementsByTagName("INPUT")[0].value;
                    }
                }
                newRows.sort(mySortingSummary);

                for (var j = 0;j < newRows.length;j++) {
                    if (j > 0) {
                        sumrflds = sumrflds + "~" + newRows[j][0];
                    }
                    else {
                        sumrflds = newRows[j][0];
                    }
                }

                if (tableName[t] == "SUM_QUERY_ORDER")
                    setNodeText(selectSingleNode(dom, "//RAD_SUMMARY/SUM_QUERYORDER"), sumrflds);
                else if (tableName[t] == "SUM_RESULT_ORDER")
                    setNodeText(selectSingleNode(dom, "//RAD_SUMMARY/SUM_RESULTORDER"), sumrflds);
            }
        }
    }
}

function mySortingSummary(a, b) {
    sortflag = 1;
    a = a[1];
    b = b[1];
    return parseInt(a) == parseInt(b) ? 0 : (parseInt(a) > parseInt(b) ? 1 :  - 1)
}

function showReturnFields(tableName, lovDetails) {

    var lovname = "";
    var globalLovDetails = "";

    if (tableName == "retflds") {
        lovname = document.getElementsByName('LOV_NAME')[0].value;
        if (document.getElementsByName('GLOBAL_LOV_NAME')[0].value != "" && lovDetails == "") {
            lovDetails = globalLOV(document.getElementsByName('GLOBAL_LOV_NAME')[0].value, 'GLOBAL_LOV_NAME');
        }

    }
    else if (tableName == "offlineretflds") {
        lovname = document.getElementsByName('OFF_LINE_LOV_NAME')[0].value;
        if (document.getElementsByName('GLOBAL_OFF_LINE_LOV_NAME')[0].value != "" && lovDetails == "") {
            lovDetails = globalLOV(document.getElementsByName('GLOBAL_OFF_LINE_LOV_NAME')[0].value, 'GLOBAL_OFF_LINE_LOV_NAME');
        }

    }

    if (lovname != "") {
        if (glblLovRetFldsList[lovname] != undefined)
            globalLovDetails = glblLovRetFldsList[lovname].split("!");

        var radlovs = selectNodes(dom, "//RAD_LOVS[LOV_NAME ='" + lovname + "']");
        if (radlovs.length > 0) {
            var lovdetailslen = selectNodes(radlovs[0], "RAD_LOV_DETAILS").length;
            var lovdetails = selectNodes(radlovs[0], "RAD_LOV_DETAILS");
            deleteAll(tableName);

            for (var j = 0;j < lovdetailslen;j++) {
                var queeryfield = getNodeText(selectNodes(lovdetails[j], "QUERY_COLS")[0]);
                addNewRow(tableName);
                document.getElementsByName(tableName)[0].tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value = queeryfield;
            }
        }
        else {
            var radlovs = globalLovDetails[1].split("~");
            var lovdetailslen = radlovs.length;
            deleteAll(tableName);
            for (var j = 0;j < lovdetailslen - 1;j++) {
                addNewRow(tableName);
                document.getElementsByName(tableName)[0].tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value = radlovs[j];
            }
        }
    }

}

function showBindVariables(condition, tableName, lovDetails) {

    var lovname = "";
    var globalLovName = "";

    if (tableName == "bindvar") {
        lovname = document.getElementsByName('LOV_NAME')[0].value;
        if (document.getElementsByName('GLOBAL_LOV_NAME')[0].value != "" && lovDetails == "") {
            lovDetails = globalLOV(document.getElementsByName('GLOBAL_LOV_NAME')[0].value, 'GLOBAL_LOV_NAME');
        }

    }
    else if (tableName == "offlinebindvar") {
        lovname = document.getElementsByName('OFF_LINE_LOV_NAME')[0].value;
        if (document.getElementsByName('GLOBAL_OFF_LINE_LOV_NAME')[0].value != "" && lovDetails == "") {
            lovDetails = globalLOV(document.getElementsByName('GLOBAL_OFF_LINE_LOV_NAME')[0].value, 'GLOBAL_OFF_LINE_LOV_NAME');
        }

    }
    if (lovname != "") {
        if (glblLovRetFldsList[lovname] != undefined)
            var globalLovDet = glblLovRetFldsList[lovname].split("!");

        var radlov = selectSingleNode(dom, ("//RAD_LOVS[LOV_NAME ='" + lovname + "']"));
        if (radlov != null) {
            var LovQuery = getNodeText(selectSingleNode(radlov, "LOV_QUERY"));
            var bindVarCount = LovQuery.split('?');
            var obj = "";
            if (condition == "Bind" && bindVarCount.length == 1) {
                alertMessage("No bind variables", "E");
            }
            deleteAll(tableName);
            for (var j = 0;j < bindVarCount.length - 1;j++) {
                addNewRow(tableName);
            }
        }
        else {
            var LovQuery = globalLovDet[0];
            var bindVarCount = LovQuery.split('?');
            var obj = "";
            if (condition == "Bind" && bindVarCount.length == 1) {
                alertMessage("No Bind Variables", "E");
            }
            deleteAll(tableName);
            for (var j = 0;j < bindVarCount.length - 1;j++) {
                addNewRow(tableName);
            }
        }
    }

}

function globalLOV(lovName, fldName) {
    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R011" + parent.gBodySeparator + lovName, "RADClientHandler");

    var responseText = getXMLString(response);
    var query = responseText.substring(responseText.indexOf("<query>") + 7, responseText.indexOf("</query>"));
    var list = responseText.substring(responseText.indexOf("<fldList>") + 9, responseText.indexOf("</fldList>"));
    var lovDetails = query + "!" + list;

    if (lovDetails.substring(lovDetails.length - 1, lovDetails.length) == "~") {
        lovDetails = lovDetails.substring(0, lovDetails.length - 1);
    }
    return lovDetails;
}

function partWtChanged() {
    var rowIndex = getRowIndex(event);
    var objTable = document.getElementsByName("partition")[0];
    var trows = objTable.tBodies[0].rows;
    if (rowIndex >= 1 && document.getElementById('MULTIPLE_SECTION').checked == false) {
    var strWidth = trows[rowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value;
    var otherRowIndex;

    if (rowIndex == 2)
        otherRowIndex = 1;
    else 
        otherRowIndex = 2;

    if (strWidth == '33') {

        if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "33") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "66";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "75") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "66";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "25") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "66";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "66";
        trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
        trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
        trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
        trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
        trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";

    }
    else if (strWidth == '66') {

        if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "66") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "33";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "50") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "33";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].selectedText = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "75") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "33";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "25") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "33";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "33";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";

        }
    }
    else if (strWidth == '75') {
        if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "66") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "50") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "33") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }

    }

    else if (strWidth == '25') {
        if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "66") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "75";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "50") {
            if (rowIndex == 2 && trows.length == 3) {
                trows[otherRowIndex].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[rowIndex].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else {
                trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "75";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "33") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "75";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        else if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "25") {
            if (rowIndex == 3 && trows.length == 3) {
                trows[otherRowIndex - 2].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[otherRowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[otherRowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else if (rowIndex == 2 && trows.length == 3) {
                trows[otherRowIndex].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[rowIndex].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else if (rowIndex == 1 && trows.length == 3) {
                trows[otherRowIndex].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[rowIndex].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else {
                trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "75";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
        }
        else {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "75";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        if (document.getElementsByName("SCREEN_PORTION")[0].value == "FOOTER") {
            if (rowIndex == 3) {
                trows[rowIndex - 3].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[rowIndex - 2].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex - 1].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex - 3].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[rowIndex - 3].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 3].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else if (rowIndex == 2 && trows.length == 3) {
                trows[rowIndex - 2].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[rowIndex - 1].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else if (rowIndex == 1 && trows.length == 3) {
                trows[rowIndex + 1].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[rowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex + 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[rowIndex + 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex + 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }

        }
    }
    if (strWidth == '50') {
        if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "66") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "50";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
        }
        if (trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value == "33") {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "50";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
        }
        else {
            trows[otherRowIndex - 1].cells[3].getElementsByTagName("SELECT")[0].value = "50";
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[otherRowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
            trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
        }

        if (document.getElementsByName("SCREEN_PORTION")[0].value == "FOOTER") {
            if (rowIndex == 3) {
                trows[rowIndex - 3].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex - 2].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex - 3].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 3].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 3].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else if (rowIndex == 2 && trows.length == 3) {
                trows[rowIndex - 2].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 2].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }
            else if (rowIndex == 1 && trows.length == 3) {
                trows[rowIndex + 1].cells[3].getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex].cells(3).getElementsByTagName("SELECT")[0].value = "25";
                trows[rowIndex + 1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex + 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex + 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex].cells[4].getElementsByTagName("SELECT")[0].value = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].text = "";
                trows[rowIndex - 1].cells[4].getElementsByTagName("SELECT")[0].value = "";
            }

        }
    }

}
if (document.getElementById('MULTIPLE_SECTION').checked == true) {
        var trows = objTable.tBodies[0].rows;
		if(trows.length>=1){
        var stWidth = 0;
        for (var rowCnt = 0;rowCnt < trows.length;rowCnt++) { 
            stWidth += parseInt(trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0].value);
        }
        if (stWidth != 100) {
            alertMessage("Total Width of Partitions in Section should be 100", "E");
            return false;
        }
		}
    }
}

function getRowIndex(e) {
    var objTR;
    var rowIndex =  - 1;
    var event = window.event || e;

    if (event != null) {
        objTR = event.srcElement || event.target;
        try //SFR 2095
        {
            while (objTR.tagName != "TR") {
                objTR = objTR.parentNode;
            }
            rowIndex = objTR.rowIndex;
        }
        catch (e) {
        }
    }
    return rowIndex;
}

function lovbind() {
    if (document.getElementsByName('LBL_BIND_VRBLS')[0].style.display == 'none') {
        document.getElementsByName('LBL_BIND_VRBLS')[0].style.display = 'block';
        document.getElementsByName('LOVDET')[0].style.display = 'none';
    }
    else {
        document.getElementsByName('LBL_BIND_VRBLS')[0].style.display = 'none';
        document.getElementsByName('LOVDET')[0].style.display = 'block';
    }
}

function EnableFlds(tableName) {
    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var funcId = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID"));
    if (funcId.substring(2, 3) == "C") {
        document.getElementsByName('OPERATION_ID')[0].disabled = true;
        if (document.getElementsByName('SERVICE_NAME')[0].value == "") {
            document.getElementsByName('SERVICE_NAME')[0].value = funcId;
        }
        for (var j = 0;j <= numRows;j++) {
            if (j > 1) {
                document.getElementById(tableName).rows[j].cells[0].getElementsByTagName("INPUT")[0].disabled = true;
                document.getElementById(tableName).rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = false;
                document.getElementById(tableName).rows[j].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
                document.getElementById(tableName).rows[j].cells[2].getElementsByTagName("INPUT")[0].value = "";
            }
        }
        fnCheckFnCatgry(tableName);
    }
    else {
        document.getElementById('SERVICE_NAME').disabled = false;
        document.getElementById('OPERATION_ID').disabled = false;
        var opCode = document.getElementById('OPERATION_ID').value;
        if (opCode != null && opCode != "") {
            for (var i = 0;i <= numRows;i++) {
                if (i > 0) {
                    document.getElementById(tableName).rows[i].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                    var obj = document.getElementById(tableName).rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
                    obj = obj.toLowerCase();
                    obj = obj.substring(0, 1).toUpperCase() + obj.substring(1, obj.length);
                    if (obj == "New") {
                        obj = "Create";
                    }
                    if (document.getElementById(tableName).rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                        if (document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].value == "") {
							document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].value = "";
							document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].value = obj + opCode;
                        
						}
                        document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
                        document.getElementById(tableName).rows[i].cells[3].getElementsByTagName("INPUT")[0].disabled = false;
                    }
                    if (document.getElementById(tableName).rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == false) {
                        document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
                        document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].value = "";
                        document.getElementById(tableName).rows[i].cells[3].getElementsByTagName("INPUT")[0].disabled = true;
                    }
                }
            }
        }
        else {
            for (var k = 0;k <= numRows;k++) {
                if (k > 0) {
                    document.getElementById(tableName).rows[k].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                    document.getElementById(tableName).rows[k].cells[0].getElementsByTagName("INPUT")[0].checked = false;
                    document.getElementById(tableName).rows[k].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
                    document.getElementById(tableName).rows[k].cells[2].getElementsByTagName("INPUT")[0].value = "";
                    document.getElementById(tableName).rows[k].cells[3].getElementsByTagName("INPUT")[0].disabled = true;
                }
            }
        }
        if (numRows > 11) {
            for (var m = 12;m <= numRows;m++) {
                obj = document.getElementById(tableName).rows[m].cells[1].getElementsByTagName("INPUT")[0].value;
                obj = obj.toLowerCase();
                obj = obj.substring(0, 1).toUpperCase() + obj.substring(1, obj.length);
                document.getElementById(tableName).rows[m].cells[1].getElementsByTagName("INPUT")[0].value = obj.toUpperCase();
                if (document.getElementById(tableName).rows[m].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                    document.getElementById(tableName).rows[m].cells[2].getElementsByTagName("INPUT")[0].value = "";
                    document.getElementById(tableName).rows[m].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
                    document.getElementById(tableName).rows[m].cells[2].getElementsByTagName("INPUT")[0].value = obj + opCode;
                    document.getElementById(tableName).rows[m].cells[3].getElementsByTagName("INPUT")[0].disabled = false;
                }
                if (document.getElementsByName(tableName)[0].rows[m].cells[0].getElementsByTagName("INPUT")[0].checked == false) {
                    document.getElementById(tableName).rows[m].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
                    document.getElementById(tableName).rows[m].cells[2].getElementsByTagName("INPUT")[0].value = "";
                    //document.getElementById(tableName).rows[m].cells[3].getElementsByTagName("INPUT")[0].disabled=true;
                }

            }
        }
        fnCheckFnCatgry(tableName);
    }
    // For SUMMARYQUERY fields	            
    try {
        document.getElementById(tableName).rows[12].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
        document.getElementById(tableName).rows[12].cells[3].getElementsByTagName("INPUT")[0].disabled = true;
        if (document.getElementById(tableName).rows[12].cells[2].getElementsByTagName("INPUT")[0].value != "") {
            document.getElementById(tableName).rows[12].cells[2].getElementsByTagName("INPUT")[0].value = "SummaryQuery" + opCode;
        }
    }
    catch (e) {
        addNewRow(tableName);
        document.getElementById(tableName).rows[12].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
        document.getElementById(tableName).rows[12].cells[3].getElementsByTagName("INPUT")[0].disabled = true;
        document.getElementById(tableName).rows[12].cells[1].getElementsByTagName("INPUT")[0].value = "SUMMARYQUERY";
        if (document.getElementById(tableName).rows[12].cells[2].getElementsByTagName("INPUT")[0].value != "") {
            document.getElementById(tableName).rows[12].cells[2].getElementsByTagName("INPUT")[0].value = "SummaryQuery" + opCode;
        }
    }

    for (var k = 1;k <= 11;k++) {
        if (document.getElementById('FUNCTION_TYPE').value == "S")
            document.getElementById(tableName).rows[k].cells[4].getElementsByTagName("BUTTON")[0].disabled = true;
    }

}

function fnCheckFnCatgry(tableName) {
    var funCtgry = document.getElementsByName('FUNCTION_CATEGORY')[0].value;
    if (funCtgry == "MAINTENANCE") {
        for (var i = 8;i <= 11;i++) {
            document.getElementById(tableName).rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = false;
            document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
            document.getElementById(tableName).rows[i].cells[4].getElementsByTagName("BUTTON")[0].disabled = true;
            document.getElementById(tableName).rows[i].cells[2].getElementsByTagName("INPUT")[0].value = "";
            document.getElementById(tableName).rows[i].cells[3].getElementsByTagName("INPUT")[0].disabled = true;
        }
    }
    else {
        for (var i = 4;i <= 11;i++) {
            document.getElementById(tableName).rows[i].cells[3].getElementsByTagName("INPUT")[0].disabled = false;
            if (i > 7) {
                document.getElementById(tableName).rows[i].cells[4].getElementsByTagName("BUTTON")[0].disabled = false;
            }
        }
    }
}

function popupedit(tablename, fieldid, cellno, e) {
    var event = window.event || e;
    var obj = "";
    var winParams = new Object();
    var Title = "";
    var recNum =  - 1;
    var textvalue = "";
    var readnly = "";
    var title = "";
    if (tablename != "" && cellno != "") {
        if (getRowIndex(event) == 0) {
            recNum = 0;
        }
        else {
            recNum = getRowIndex(event) - 1;
        }
        tab = document.getElementById(tablename);
        obj = tab.tBodies[0].rows[recNum].cells[cellno].getElementsByTagName('INPUT')[0];
        textvalue = obj.value;
        if (tab.tBodies[0].rows[recNum].cells[cellno].getElementsByTagName('INPUT')[0].readOnly) {
            readnly = "YES";
        }
        else {
            readnly = "NO";
        }
        title = tab.getElementsByTagName('THEAD')[0].rows[0].cells[cellno].outerText;
        if (title) {
            title = tab.getElementsByTagName('THEAD')[0].rows[0].cells[cellno].outerText;
        }
        else {
            title = tab.tBodies[0].rows[recNum].cells[cellno].getElementsByTagName('INPUT')[0].name;
        }
        poptextvalue = textvalue;
        popTextObj = obj;
        popReadOnly = readnly;

    }
    else {
        var objStmt = "document.getElementById('" + fieldid + "')";
        obj = eval(objStmt);
        poptextvalue = obj.value;
        popTextObj = obj;
        if (obj.readOnly) {
            popReadOnly = "YES";
        }
        else {
            popReadOnly = "NO";
        }
        title = getInnerText(obj.parentNode);
    }
    loadSubScreenDIV("ChildWin", "RadPopup.jsp?Title=" + title);
}

isNotDoubleClick = function (targetE) {
    parent.timerbtn = targetE;
    if (document.getElementById(targetE).className == 'BUTTONToolbar')
        document.getElementById(targetE).disabled = true;
    setTimeout("blockClick()", 200);
    return document.getElementById(targetE).disabled;
}
blockClick = function () {
    document.getElementById(parent.timerbtn).disabled = false;
}

function fnSetCustmAttrbts(tableName) {
    var disVal = document.getElementsByName('DISPLAY_TYPE')[0].value;
    var tab = document.getElementById(tableName);
    var tabRows = tab.tBodies[0].rows;
    if (disVal == "CHECKBOX") {
        if (tabRows.length == 0) {
            for (var i = 0;i < 2;i++) {
                addNewRow(tableName);
                var rowlen = tab.tBodies[0].rows.length;
                if (i == 0) {
                    tab.tBodies[0].rows[i].cells[1].getElementsByTagName('INPUT')[0].value = "ON";
                    tab.tBodies[0].rows[i].cells[2].getElementsByTagName('INPUT')[0].value = "Y";
                }
                else if (i == 1) {
                    tab.tBodies[0].rows[i].cells[1].getElementsByTagName('INPUT')[0].value = "OFF";
                    tab.tBodies[0].rows[i].cells[2].getElementsByTagName('INPUT')[0].value = "N";
                }
            }
        }
        else if (tabRows.length == 1) {
            if (tab.tBodies[0].rows[0].cells[1].getElementsByTagName('INPUT')[0].value != "ON" && tab.tBodies[0].rows[0].cells[1].getElementsByTagName('INPUT')[0].value != "OFF") {
                tab.tBodies[0].deleteRow(0);
                fnSetCustmAttrbts(tableName);
            }
            else {
                if (tab.tBodies[0].rows[0].cells[1].getElementsByTagName('INPUT')[0].value == "ON") {
                    if (tab.tBodies[0].rows[0].cells[2].getElementsByTagName('INPUT')[0].value == "") {
                        tab.tBodies[0].rows[0].cells[2].getElementsByTagName('INPUT')[0].value = "Y";
                    }
                }
                else if (tab.tBodies[0].rows[0].cells[1].getElementsByTagName('INPUT')[0].value == "OFF") {
                    if (tab.tBodies[0].rows[0].cells[2].getElementsByTagName('INPUT')[0].value == "") {
                        tab.tBodies[0].rows[0].cells[2].getElementsByTagName('INPUT')[0].value = "N";
                    }
                }

            }
            addNewRow(tableName);
            if (tab.tBodies[0].rows[0].cells[1].getElementsByTagName('INPUT')[0].value == "ON") {
                tab.tBodies[0].rows[1].cells[1].getElementsByTagName('INPUT')[0].value = "OFF";
                if (tab.tBodies[0].rows[0].cells[2].getElementsByTagName('INPUT')[0].value == "Y") {
                    tab.tBodies[0].rows[1].cells[2].getElementsByTagName('INPUT')[0].value = "N";
                }
            }
            else if (tab.tBodies[0].rows[0].cells[1].getElementsByTagName('INPUT')[0].value == "OFF") {
                tab.tBodies[0].rows[1].cells[1].getElementsByTagName('INPUT')[0].value = "ON";
                if (tab.tBodies[0].rows[0].cells[2].getElementsByTagName('INPUT')[0].value == "N") {
                    tab.tBodies[0].rows[1].cells[2].getElementsByTagName('INPUT')[0].value = "Y";
                }
            }

        }
        else if (tabRows.length > 0) {
            for (var j = 0;j < tabRows.length;j++) {
                if (tab.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value != "ON" && tab.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value != "OFF") {
                    tab.tBodies[0].deleteRow(j);
                    fnSetCustmAttrbts(tableName);
                }
                else {
                    if (tab.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value == "ON") {
                        if (tab.tBodies[0].rows[j].cells[2].getElementsByTagName('INPUT')[0].value == "") {
                            tab.tBodies[0].rows[j].cells[2].getElementsByTagName('INPUT')[0].value = "Y";
                        }
                    }
                    else if (tab.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value == "OFF") {
                        if (tab.tBodies[0].rows[j].cells[2].getElementsByTagName('INPUT')[0].value == "") {
                            tab.tBodies[0].rows[j].cells[2].getElementsByTagName('INPUT')[0].value = "N";
                        }
                    }

                }
            }
            if (tabRows.length == 0) {
                fnSetCustmAttrbts(tableName);
            }
            else if (tabRows.length == 1) {
                fnSetCustmAttrbts(tableName);
            }
        }
        tab.tBodies[0].rows[0].cells[1].getElementsByTagName('INPUT')[0].disabled = true;
        tab.tBodies[0].rows[1].cells[1].getElementsByTagName('INPUT')[0].disabled = true;
    }
    else {
        for (var i = 0;i < tabRows.length;i++) {
            tab.tBodies[0].rows[i].cells[1].getElementsByTagName('INPUT')[0].disabled = false;
        }
    }
}

function fnSelectParentFld() {

    var itmVal = document.getElementById('ITEM_TYPE_BLKF').value;
    var disVal = document.getElementById('DISPLAY_TYPE_BLKF').value;
    if (itmVal == "DESC") {
        document.getElementById('DATATYPE_BLKF').disabled = false;
        document.getElementById('MAX_LENGTH_BLKF').readOnly = false;
        if (disVal != "BUTTON") {
            if (document.getElementsByName('PARENT_FIELD')[0].value == "") {
                document.getElementsByName('DBC')[0].value = "";
                isDialog = true;
                alertMessage("Please select parent field..", "E");
                return 0;
            }
            else {
                document.getElementById('DATATYPE_BLKF').disabled = false;
                if (document.getElementById('DATATYPE_BLKF').value == "") {
                    alertMessage("Please select datatype", "E");
                    return 0;
                }
                return 1;
            }
        }
        else if (disVal == "BUTTON") {
        }
        else {
            document.getElementsByName('PARENT_FIELD')[0].value = "";
            document.getElementById('DATATYPE_BLKF').value = "";
            document.getElementById('DATATYPE_BLKF').disabled = true;
            return 1;
        }
    }

    else if (itmVal == "CONTROL") {
        document.getElementById('DATATYPE_BLKF').disabled = false;
        document.getElementById('MAX_LENGTH_BLKF').readOnly = false;
        if (disVal != "BUTTON") {
            document.getElementsByName('PARENT_FIELD')[0].value = "";
            document.getElementsByName('DBC').value = "";
            document.getElementById('DATATYPE_BLKF').disabled = false;
            if (document.getElementById('DATATYPE_BLKF').value == "") {
                alertMessage("Please Select DataType", "E");
                return 0;
            }
            else {
                document.getElementById('DATATYPE_BLKF')[0].disabled = false;
                return 1;
            }
        }
        else {
            document.getElementsByName('PARENT_FIELD')[0].value = "";
            document.getElementsByName('DBC')[0].value = "";
            document.getElementById('DATATYPE_BLKF').value = "";
            document.getElementById('DATATYPE_BLKF').disabled = true;
            return 1;
        }
    }
    else if (itmVal == "DBITEM") {
        document.getElementById('MAX_LENGTH_BLKF').readOnly = true;
    }

    /*if(disVal=="AMOUNT")
	{
        if(document.getElementsByName('RELATED_BLOCK')[0].value=="" || document.getElementsByName('RELATED_FIELD')[0].value=="")
	   	{alertMessage("Please Select Related Block and Related Field","I");}
	}*/
}

function validateObject(nodeName, elmntName, ObjName) {
    if (nodeName != "RAD_TABS" && nodeName != "RAD_SECTIONS") {
        var Dscrs = selectNodes(dom, ("//RAD_KERNEL/" + nodeName));
        for (var i = 0;i < Dscrs.length;i++) {
            if (getNodeText(selectSingleNode(Dscrs[i], elmntName)) == ObjName) {
                return 1;
            }
        }
    }
    else if (nodeName == "RAD_TABS") {
        try {
            var Dscrs = selectNodes(dom, ("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + clickedobjects[1] + "']/" + clickedobjects[2] + "/RAD_TABS"));
            for (var i = 0;i < Dscrs.length;i++) {
                if (getNodeText(selectSingleNode(Dscrs[i], elmntName)) == ObjName) {
                    return 1;
                }
            }
        }
        catch (e) {
        }
    }
    else if (nodeName == "RAD_SECTIONS") {
        try {
            var Dscrs = selectNodes(dom, ("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + clickedobjects[1] + "']/" + clickedobjects[2] + "/RAD_TABS[TAB_NAME='" + clickedobjects[3] + "']/RAD_SECTIONS"));
            for (var i = 0;i < Dscrs.length;i++) {
                if (getNodeText(selectSingleNode(Dscrs[i], elmntName)) == ObjName) {
                    return 1;
                }
            }
        }
        catch (e) {
        }
    }
}

function FildSetValidations(fldSet) {
    if (fldSet == "") {
        var fldSet = document.getElementById('FIELDSET_NAME').value;
    }
    var mltRecFld = document.getElementById('MULTI_RECORD_FST').value;

    if (mltRecFld == "N") {
        document.getElementById('VIEW_TYPE').disabled = true;
        document.getElementById('NAV_BUTTONS_REQ').disabled = true;
        document.getElementById('FIELDSET_HEIGHT').disabled = false;
        document.getElementById('FIELDSET_LABEL').disabled = false;
        document.getElementById('FIELDSET_WIDTH').disabled = true;
    }
    else if (mltRecFld == "Y") {
        document.getElementById('VIEW_TYPE').disabled = false;
        if (document.getElementById('VIEW_TYPE').value == "SINGLE") {
            document.getElementById('NAV_BUTTONS_REQ').disabled = false;
            document.getElementById('FIELDSET_HEIGHT').disabled = true;
            document.getElementById('FIELDSET_WIDTH').disabled = true;
            document.getElementById('ROWS_PER_PAGE').value = "";
            document.getElementById('ROWS_PER_PAGE').disabled = true;
        }
        else {
            document.getElementById('NAV_BUTTONS_REQ').disabled = true;
            document.getElementById('NAV_BUTTONS_REQ').checked = false;
            document.getElementById('FIELDSET_HEIGHT').disabled = false;
            document.getElementById('FIELDSET_WIDTH').disabled = false;
            document.getElementById('ROWS_PER_PAGE').disabled = false;
        }
    }
}

function validatePartionRows(tableName, screenName) {

    var scrSize = getNodeText(selectSingleNode(selectNodes(dom, "//RAD_SCREENS[SCREEN_NAME='" + screenName + "']")[0], "SCREEN_SIZE"));
    var ScrPortion = document.getElementById("SCREEN_PORTION_SEC").value;
    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    if (numRows > 0) {
        var fnres = fn_checkRepetition(tableName, document.getElementById(tableName).tBodies[0].rows[numRows - 1].cells[2].getElementsByTagName("INPUT")[0]);
    }
    numRows = document.getElementById(tableName).tBodies[0].rows.length;

    if (numRows > 0) {

        if (document.getElementById(tableName).tBodies[0].rows[numRows - 1].cells[2].getElementsByTagName("INPUT")[0].value == "") {
            document.getElementById(tableName).tBodies[0].rows[numRows - 1].cells[0].getElementsByTagName("INPUT")[0].checked = true;
            delRow('partition');
            alertMessage("Partition Name Cannot be Null...", "E");
            return false;
        }
    }
    if (document.getElementById('MULTIPLE_SECTION').checked == true) {
        return 1;
    }
    if (numRows >= "2") {
        if ((scrSize == "SMALL" || scrSize == "MEDIUM") && ScrPortion != "FOOTER") {
            return 0;
        }
        if (numRows >= "3" && (ScrPortion == "BODY" || ScrPortion == "HEADER")) {
            return 0;
        }
        else if (ScrPortion == "FOOTER" && numRows >= "4") {
            return 0;
        }
    }
    else {
        return 1;
    }
}

function fn_Check_MandFlds_Calfrms(tblName) {

    var tableObject = document.getElementById(tblName);
    var numRows = tableObject.tBodies[0].rows.length;
    var cells = tableObject.tBodies[0].rows[numRows - 1].cells;
    var alertMsg = "The Following Fields Cannot be Null...: \n";
    var l_Msg = alertMsg.length;
    for (var i = 1;i < cells.length;i++) {
        if (i < 4) {

            if (tableObject.tBodies[0].rows[numRows - 1].cells[i].getElementsByTagName("INPUT").length == "1") {
                if (tableObject.tBodies[0].rows[numRows - 1].cells[i].getElementsByTagName("INPUT")[0].value == "") {
                    alertMsg += " - " + tableObject.getElementsByTagName('THEAD')[0].rows[0].cells(i).outerText; + "\n";
                }
            }
            else if (tableObject.tBodies[0].rows[numRows - 1].cells[i].getElementsByTagName("SELECT").length == "1") {
                if (tableObject.tBodies[0].rows[numRows - 1].cells[i].getElementsByTagName("SELECT")[0].value == "") {
                    alertMsg += " - " + tableObject.getElementsByTagName('THEAD')[0].rows[0].cells(i).outerText; + "\n";
                }
            }
        }
    }

    if (alertMsg.length == l_Msg) {
        return true;
    }
    else {
        alertMessage(alertMsg, "E");
        return 0;
    }
}

function EnableScrArgs(flag) {

    var tab = document.getElementsByName('ScrArgnts')[0].tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        for (var i = 0;i < tablen;i++) {
            if (document.getElementById("MAIN_SCREEN").cheked == true) {
                tab.rows[i].cells[2].getElementsByTagName('SELECT')[0].options.length = 0;
                tab.rows[i].cells(3).getElementsByTagName('SELECT')[0].options.length = 0;
                tab.rows[i].cells[2].getElementsByTagName('SELECT')[0].disabled = true;
                tab.rows[i].cells(3).getElementsByTagName('SELECT')[0].disabled = true;
                // tab.rows[i].cells[4].getElementsByTagName('INPUT')[0].disabled=true;
            }
            else if (document.getElementById("MAIN_SCREEN").checked == false) {
                if (flag == "1") {
                    fn_populate_Blocks_toCallfrmFlds('RAD_DATA_BLOCKS', 'ScrArgnts', 'SSC', 'BLOCK_NAME', 2);
                    fn_populate_Blocks_toCallfrmFlds('RAD_DATA_BLOCKS', 'ScrArgnts', 'SSC', 'BLOCK_NAME', 5);
                }
                tab.rows[i].cells[2].getElementsByTagName('SELECT')[0].disabled = false;
                tab.rows[i].cells[3].getElementsByTagName('SELECT')[0].disabled = false;
				
            }
            if (flag == "2") {
                tab.rows[i].cells[1].getElementsByTagName('INPUT')[0].disabled = true;
                tab.rows[i].cells[2].getElementsByTagName('SELECT')[0].disabled = true;
                tab.rows[i].cells[3].getElementsByTagName('SELECT')[0].disabled = true;
                tab.rows[i].cells[4].getElementsByTagName('INPUT')[0].disabled = true;
                tab.rows[i].cells[5].getElementsByTagName('SELECT')[0].disabled = true;
                tab.rows[i].cells[6].getElementsByTagName('SELECT')[0].disabled = true;
            }
        }
    }
}

function partNameClicked(val) {
    prevPartname = val;
}

function partNameChanged(val) {
    var currVal = val;
    if (currVal != prevPartname)
        var fldsets = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_SCREEN='" + document.getElementById("SCREEN_NAME11")[0].value + "' and FIELDSET_PORTION='" + document.getElementsByName("SCREEN_PORTION")[0].value + "' and FIELDSET_TAB='" + document.getElementsByName("TAB_NAME")[0].value + "' and FIELDSET_SECTION='" + document.getElementsByName("SECTION_NAME")[0].value + "' and FIELDSET_PARTITION='" + prevPartname + "']");
    for (var i = 0;i < fldsets.length;i++) {
        setNodeText(selectSingleNode(fldsets[i], "FIELDSET_PARTITION"), currVal);
    }
}

function disableBlkFlds(blkName, blkFld) {

    var blktxtFlds = "FIELD_NAME~DATATYPE~MAX_LENGTH~DISPLAY_TYPE~LABEL_CODE~DEFAULT_VALUE~PARENT_FIELD~XSD_TAG~DBT~DBC~FIELDSET_NAME~MIN_VAL~MAX_VAL~MAX_DECIMALS~TXTAREA_ROWS~TXTAREA_COLS";
    blktxtFlds = blktxtFlds.split("~");
    for (var blfld = 0;blfld < blktxtFlds.length;blfld++) {
        document.getElementById(blktxtFlds[blfld]).readOnly = true;
    }

    var blkchkFlds = "FORMAT_REQD~NOT_REQD_IN_XSD~LOV_VAL_REQ~INPUT_ONLY_BY_LOV~BLOCK_PK_FLD~SUBSYSTEM_DEPENDANT~REQUIRED~RELATED_BLOCK~RELATED_FIELD~ITEM_TYPE~PARENT_FIELD~BTN_LBLCD"
    blkchkFlds = blkchkFlds.split("~");
    for (var blchfld = 0;blchfld < blkchkFlds.length;blchfld++) {
        document.getElementById(blkchkFlds[blchfld]).disabled = true;
    }
    var lovTyps = "LOV_NAME~GLOBAL_LOV_NAME~OFF_LINE_LOV_NAME~GLOBAL_OFF_LINE_LOV_NAME~BTN_GLB_LOV~BTN_GLB_OFF_LOV";
    lovTyps = lovTyps.split("~");
    var temp = 0;
    for (var val = 0;val < 3;val++) {

        if (getNodeText(selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + blkFld + "']/" + lovTyps[val])) != "") {
            for (var disbLov = 0;disbLov < lovTyps.length;disbLov++) {
                if (lovTyps[disbLov] == "LOV_NAME") {
                    document.getElementsByName('LOV_NAME')[0].disabled = true;
                }
                else {
                    document.getElementsByName(lovTyps[disbLov])[0].disabled = true;
                }
                temp = 1;
            }
        }
    }
    if (temp == 0) {
        for (var enbLov = 0;enbLov < lovTyps.length;enbLov++) {
            if (lovTyps[enbLov] == "LOV_NAME") {
                document.getElementsByName('LOV_NAME')[0].disabled = false;
            }
            else {
                document.getElementById(lovTyps[enbLov]).disabled = false;
            }

        }
    }
}

function readOnlyFid(tabName) {
    var tabOjb = document.getElementById(tabName);
    var numRows = tabOjb.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        var callfrom = tabOjb.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].value;
        if (callfrom != "") {
            var i = fnCheckCallForm(callfrom);
            if (i == "1" || i == "2") {
                tabOjb.tBodies[0].rows[index].cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
            }
        }
    }
}

function fnAddMenuDtls() {
    var funcId = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS"))[0], ("FUNCTION_ID")));
    var funCtrgy = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS"))[0], ("FUNCTION_CATEGORY")));
    if (funcId == "") {
        alertMessage("Please enter function Id", "E");
        return;
    }
    if (selectSingleNode(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES")) == null) {
        CreateDOM("MND");
    }

    if (selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS") == null) {
        addTableRow('funcDesc');
        document.getElementById('funcDesc').tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value = funcId.toUpperCase();
        if (document.getElementsByName('MODULE_ID').value == "") {
            if (document.getElementsByName("ACTION")[0].value == "LOAD") {
                document.getElementsByName('MODULE_ID')[0].value = funcId.substring(0, 2).toUpperCase();
                document.getElementById('funcDesc').tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = funcId.substring(0, 2).toUpperCase();
            }
        }
        else {
            document.getElementById('funcDesc').tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_ID')[0].value;
            document.getElementById('funcDesc').tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_DESC')[0].value;
        }
        if (document.getElementById('funcDesc').tBodies[0].rows[0].cells[4].getElementsByTagName("INPUT")[0].value == "") {
            if (funCtrgy == "MAINTENANCE") {
                document.getElementById('funcDesc').tBodies[0].rows[0].cells[4].getElementsByTagName("INPUT")[0].value = "1111111100000000";
            }
            else if (funCtrgy == "TRANSACTION") {
                document.getElementById('funcDesc').tBodies[0].rows[0].cells[4].getElementsByTagName("INPUT")[0].value = "111111111111011";
            }
            else {
                document.getElementById('funcDesc').tBodies[0].rows[0].cells[4].getElementsByTagName("INPUT")[0].value = "0000000000000000";
            }
        }
        if (selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY") != null) {
            if (getNodeText(selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY/RSLT_DATABLK")[0]) != "") {
                addTableRow('funcDesc');
                funcId = funcId.substr(0, 2) + "S" + funcId.substr(3, funcId.length)
                document.getElementById('funcDesc').tBodies[0].rows[1].cells[1].getElementsByTagName("INPUT")[0].value = funcId.toUpperCase();
                if (document.getElementsByName("MODULE_ID").value == "") {
                    if (document.getElementsByName("ACTION").value == "LOAD") {
                        document.getElementsByName('MODULE_ID').value = funcId.substring(0, 2).toUpperCase();
                        document.getElementById('funcDesc').tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = funcId.substring(0, 2).toUpperCase();
                    }
                }
                document.getElementById('funcDesc').tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_ID')[0].value;
                document.getElementById('funcDesc').tBodies[0].rows[1].cells[3].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_DESC')[0].value;
                document.getElementById('funcDesc').tBodies[0].rows[1].cells[4].getElementsByTagName("INPUT")[0].value = "0000000000000000";
            }
        }
    }
    else if (selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS") != null) {
        if (document.getElementsByName('funcDesc')[0].tBodies[0].rows.length < 2) {
            if (selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY") != null) {
                if (getNodeText(selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY/RSLT_DATABLK")[0]) != "") {
                    addTableRow('funcDesc');
                    funcId = funcId.substr(0, 2) + "S" + funcId.substr(3, funcId.length)
                    document.getElementById('funcDesc').tBodies[0].rows[1].cells[1].getElementsByTagName("INPUT")[0].value = funcId.toUpperCase();
                    if (document.getElementsByName('MODULE_ID').value == "") {
                        if (document.getElementsByName("ACTION")[0].value == "LOAD") {
                            document.getElementsByName('MODULE_ID').value = funcId.substring(0, 2).toUpperCase();
                            document.getElementById('funcDesc').tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = funcId.substring(0, 2).toUpperCase();
                        }
                    }
                    document.getElementById('funcDesc').tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_ID')[0].value;
                    document.getElementById('funcDesc').tBodies[0].rows[1].cells[3].getElementsByTagName("INPUT")[0].value = document.getElementsByName('MODULE_DESC')[0].value;
                    document.getElementById('funcDesc').tBodies[0].rows[1].cells[4].getElementsByTagName("INPUT")[0].value = "0000000000000000";
                }
            }
        }
    }
}

function fnfetchmissingComments() {
    //Code added to resolve the problem of wrong display
    loadSubScreenDIV("ChildWin", "RadMissingComments.jsp"); 
    gfromSummary = false;

}

function fnMissingcomments_XsdAnnotation() {
    var lbl_C = new Array();
    var typ_C = new Array();
    parent.lbl_C = new Array();
    parent.typ_C = new Array();
    lbl_C = parent.lbl_C;
    typ_C = parent.typ_C;
    var k=0;
	
	 var tableObject = document.getElementsByName("XSD_Annotation")[0].tBodies[0];
	 for (var j = 0;j < tableObject.rows.length;j++) {
	 if(tableObject.rows[j].cells[3].getElementsByTagName("INPUT")[0].value !="")
	{
        lbl_C[k] = tableObject.rows[j].cells[3].getElementsByTagName("INPUT")[0].value;
        typ_C[k] = "BLK";		
        k++;
		}
    }  
    parent.lbl_C = lbl_C;
    parent.typ_C = typ_C;
}

function fnMissingcomments() {
    var lbl_C = new Array();
    var typ_C = new Array();
    parent.lbl_C = new Array();
    parent.typ_C = new Array();
    lbl_C = parent.lbl_C;
    typ_C = parent.typ_C;
    var k=0;

    var lblcodes = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var j = 0;j < lblcodes.length;j++) {
	if(getNodeText(selectSingleNode(lblcodes[j], "BLK_COMMENT_ID"))!="")
	{
        lbl_C[k] = getNodeText(selectSingleNode(lblcodes[j], "BLK_COMMENT_ID"));
        typ_C[k] = "BLK";		
        k++;
		}
    }
  
   var lblcodes = selectNodes(dom, "//RAD_DATA_BLOCKS/RAD_BLK_FIELDS");
    for (var j = 0;j < lblcodes.length;j++) {
	if(getNodeText(selectSingleNode(lblcodes[j], "FLD_COMMENT_ID"))!="")
	{
        lbl_C[k] = getNodeText(selectSingleNode(lblcodes[j], "FLD_COMMENT_ID"));
        typ_C[k] = "FLD";
        k++;
    }  	}
    parent.lbl_C = lbl_C;
    parent.typ_C = typ_C;
}

function fnfetchmissingLabelCodes() {
    //Code added to resolve the problem of wrong display
    loadSubScreenDIV("ChildWin", "RadMissingLabels.jsp");
    //parent.openWindow('testwin2', 'RadMissingLabels.jsp', 'RDDLBLCE');
    gfromSummary = false;

}

function fnMissinglabels() {

    var lbl = new Array();
    var typ = new Array();
    parent.lbl = new Array();
    parent.typ = new Array();
    lbl = parent.lbl;
    typ = parent.typ;
    var k;

    var lblcodes = selectNodes(dom, "//RAD_SCREENS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[j] = getNodeText(selectSingleNode(lblcodes[j], "SCREEN_TITLE"));
        typ[j] = "SCR";
    }
    k = j;
    var lblcodes = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "BLOCK_TITLE"));
        typ[k] = "BLK";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_FIELDSETS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "FIELDSET_LABEL"));
        typ[k] = "FST";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_LOVS/RAD_LOV_DETAILS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "COL_HEADING"));
        typ[k] = "LCL";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_DATA_BLOCKS/RAD_BLK_FIELDS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "LABEL_CODE"));
        typ[k] = "FLD";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_SUMMARY");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "TITLE"));
        typ[k] = "SCR";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_SCREENS/BODY/RAD_TABS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "TAB_LABEL"));
        typ[k] = "TAB";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_SCREENS/HEADER/RAD_TABS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "TAB_LABEL"));
        typ[k] = "TAB";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_SCREENS/FOOTER/RAD_TABS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "TAB_LABEL"));
        typ[k] = "TAB";
        k++;
    }
    var lblcodes = selectNodes(dom, "//RAD_FIELD_CUSTOM_ATTRS");
    for (var j = 0;j < lblcodes.length;j++) {
        lbl[k] = getNodeText(selectSingleNode(lblcodes[j], "ATTR_NAME"));
        typ[k] = "OPT";
        k++;
    }
    parent.lbl = lbl;
    parent.typ = typ;
}

function numbersonly(myfield, e, dec) {
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else 
        return true;
    keychar = String.fromCharCode(key);

    // control keys
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27))
        return true;

    // numbers
    else if ((("0123456789").indexOf(keychar) >  - 1))
        return true;

    // decimal point jump
    else if (dec && (keychar == ".")) {
        myfield.form.elements[dec].focus();
        return false;
    }
    else 
        return false;
}

function isValidNumber(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    if(number.length>1 && charCode == 46){
         return false;
    }

    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 3)){
        return false;
    }
    return true;
}

function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate();
		r.moveEnd('character', o.value.length);
		if (r.text == '') {
			return o.value.length;
		}
		return o.value.lastIndexOf(r.text);
	} else {
		return o.selectionStart;
	}
}

function fnXsdRefresh(NewDOM) {

var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
	var Modified=false;

    NewDOM = loadXMLDoc(getXMLString(NewDOM).toString());
    if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/XSD_COMMENTS_DEFAULT") == null) {
        var orderCorrection = traildom.createElement("XSD_COMMENTS_DEFAULT");
        var funcNode = selectSingleNode(NewDOM, "//RAD_FUNCTIONS");
        funcNode.insertBefore(orderCorrection, selectSingleNode(funcNode, "RAD_KERNEL"));
        setNodeText(selectSingleNode(funcNode, "XSD_COMMENTS_DEFAULT"), "N");

            }
    if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/XSD_COMMENTS_DEFAULT")) == "" || getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/XSD_COMMENTS_DEFAULT")) == "Y") {
        setNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/XSD_COMMENTS_DEFAULT"), "N");
        }

    if (getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/XSD_COMMENTS_DEFAULT")) == 'N') {


    var lblcodes = selectNodes(NewDOM, "//RAD_DATA_BLOCKS");
    multRec = fnXsdData_Block(lblcodes);
	if(multRec[0] !="<Records")
	{


	for (var i = 0;i < multRec.length;i++) {
        if (multRec[i] != "") {
    for (var j = 0;j < lblcodes.length;j++) {
                if (getNodeText(selectSingleNode(lblcodes[j], "BLOCK_NAME")) == multRec[i].split("~")[0] && (multRec[i].split("~")[1] != "" && multRec[i].split("~")[1] != "null") && multRec[i].split("~")[0] != "") {
                    setNodeText(selectSingleNode(lblcodes[j], "BLK_COMMENT_ID"), multRec[i].split("~")[1]);
					Modified=true;
                    break;
                }
                }
            }
        }
    }

    lblcodes = selectNodes(NewDOM, "//RAD_DATA_BLOCKS/RAD_BLK_FIELDS");
    multRec = fnXsdData_Fld(lblcodes);
	

    for (var j = 0;j < lblcodes.length;j++) {
                    for (var i = 0;i < multRec.length;i++) {
            var Fieldid = getNodeText(selectSingleNode(lblcodes[j].parentNode, "BLOCK_NAME")) + "." + getNodeText(selectSingleNode(lblcodes[j], "FIELD_NAME"));
            if (Fieldid == multRec[i].split("~")[0] && (multRec[i].split("~")[1] != "" && multRec[i].split("~")[1] != "null") && multRec[i].split("~")[0] != "") {
                setNodeText(selectSingleNode(lblcodes[j], "FLD_COMMENT_ID"), multRec[i].split("~")[1]);
				Modified=true;
                            }
                }
            }
	if(Modified)
	 setNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/XSD_COMMENTS_DEFAULT"), 'D');
        }
	return NewDOM;
    }

function fnXsdData_Fld(lblcodes) {
    var funcId = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID"));
    
 	//1000+ in IN_CLAUSE --ORACLE does not support more than 1000 in IN_CLAUSE
     var orInClause = "' or FIELD_ID in(";
     var lblNodes = "";
     for (var j = 0;j < lblcodes.length;j++) {
         if (getNodeText(selectSingleNode(lblcodes[j], "FIELD_NAME")) != "") {
             lblNodes += "'" + getNodeText(selectSingleNode(lblcodes[j].parentNode, "BLOCK_NAME")) + "." + getNodeText(selectSingleNode(lblcodes[j], "FIELD_NAME")) + "',";
         }
         if(j != 0 && j%998 == 0){
         	lblNodes +=  "'') AND FUNCTION_ID ='" + funcId + orInClause;
         }
     }

     if(lblNodes.indexOf(orInClause, this.length - orInClause.length) != -1){
     	lblNodes += "'')";
     } else {
     	lblNodes += "'') AND FUNCTION_ID ='" + funcId + "'";
 	}
    var XsdLBLQuery = "XSDLBLQUERY";
 	//var XsdLBLQuery = "FETCH@SELECT FIELD_ID,COMMENT_ID FROM CSTB_XSD_TAG_COMMENTS where FIELD_ID in( " + lblNodes + " ) AND FUNCTION_ID ='" + funcId + "'";
 	var WhereString = "where FIELD_ID in( "+ lblNodes;
 	//1000+ in IN_CLAUSE
 	
     try {
         parent.parent.gReqType = "APP";
         parent.parent.gReqCode = parent.parent.gAction;
         var radReqDOM = parent.parent.buildRADXml();
         var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
         var tempNode = radReqDOM.createElement("QUERY");
         bodyNode.appendChild(tempNode);
         setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
         setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
         setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), XsdLBLQuery); 
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
     return multRec;
}

function fnXsdData_Block(lblcodes) {
    var funcId = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ID"));
    var lblNodes = "";
    for (var j = 0;j < lblcodes.length;j++) {
        if (getNodeText(selectSingleNode(lblcodes[j], "BLOCK_NAME")) != "")
            lblNodes += "'" + getNodeText(selectSingleNode(lblcodes[j], "BLOCK_NAME")) + "',";
            }
    lblNodes = lblNodes + "''";
	var XsdLBLQuery = "XSDOTHERCOMMENTS";
    //var XsdLBLQuery = "FETCH@SELECT FIELD_ID,COMMENT_ID FROM CSTB_XSD_OTHER_COMMENTS where FIELD_ID in( " + lblNodes + " ) AND FUNCTION_ID ='" + funcId + "'";
	var WhereString = "where FIELD_ID in( " + lblNodes + " ) AND FUNCTION_ID ='" + funcId + "'";
    
    try {
        parent.parent.gReqType = "APP";
        parent.parent.gReqCode = parent.parent.gAction;
        var radReqDOM = parent.parent.buildRADXml();
        var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
        var tempNode = radReqDOM.createElement("QUERY");
        bodyNode.appendChild(tempNode);
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), XsdLBLQuery);
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
    return multRec;
}


function fnPopulate_Maxlength() {

    var dataSrcs = selectNodes(dom, "//RAD_DATASOURCES")
    for (var i = 0;i < dataSrcs.length;i++) {
	 try {
        var dsName = getNodeText(selectSingleNode(dataSrcs[i], "DATASRC_NAME"));
        var dsName_A = dsName;
            if (dsName.indexOf("__") !=  - 1) {
		dsName=dsName.split("__")[0];
		}		
        var tabname = dsName;
        var tabname1 = tabname;
        var tabn = fn_dsrvalidate(tabname);
        if (tabn != "") {
            tabname = tabn;
        }
		var queryString = "MAXLENGTH_TABCOLS";
        //var queryString = "FETCH@SELECT COLUMN_NAME, DECODE(DATA_TYPE,'CHAR', CHAR_LENGTH, 'VARCHAR2', CHAR_LENGTH, 'NUMBER', NVL(DATA_PRECISION,DATA_LENGTH), DATA_LENGTH) DATA_LENGTH , DATA_SCALE FROM user_tab_cols  WHERE TABLE_NAME ='" + tabname + "' AND DATA_TYPE='NUMBER'";
        var WhereString = "WHERE TABLE_NAME ='" + tabname + "' AND DATA_TYPE='NUMBER'";
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
        var multRec = "";
        try {
            multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
        }
        catch (e) {
            multRec = response.substring(9, response.indexOf("</Records>")).split(">");
        }

        for (var sr = 0;sr < multRec.length;sr++) {
            if (multRec[sr] != "") {
                var singleRec = multRec[sr].split("~");
                try {
                        var blkname = getNodeText(selectSingleNode(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + dsName_A + "']/RAD_FIELDS[COLUMN_NAME='" + singleRec[0] + "']/BLOCK_NAME"));
                        setNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + dsName_A + "']/RAD_FIELDS[COLUMN_NAME='" + singleRec[0] + "']")[0], ('MAX_LENGTH')), singleRec[1]);
						if(singleRec[2] != "" && singleRec[2] != "null")
                        setNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + dsName_A + "']/RAD_FIELDS[COLUMN_NAME='" + singleRec[0] + "']")[0], ('MAX_DECIMALS')), singleRec[2]);
                        if (blkname != "") {
                            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS[DBC='" + singleRec[0] + "'][DBT='" + tabname1 + "']"))[0], ('MAX_LENGTH')), singleRec[1]);
                        } 
                        if(singleRec[2] != "" && singleRec[2] != "null") {
						    setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS[DBC='" + singleRec[0] + "'][DBT='" + tabname1 + "']"))[0], ('MAX_DECIMALS')), singleRec[2]);
                       
						}
			    if(singleRec[2] == "null"){

				setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS[DBC='" + singleRec[0] + "'][DBT='" + tabname1 + "']"))[0], ('MAX_DECIMALS')), '');
	

				}
                }
                catch (e) {
                }

            }

        }
		 }
        catch (e) {
           
        }

    }
}

function addCriteria(){
			/*var tab1 = document.getElementById('cri_src_btn').tBodies[0];
			var tablen1 = tab1.rows.length;
			var criteriaName =new Array();
			var searchname = "";
			var tmp1 =0;
                if (tablen1 != 0) {
                for (var i = 0;i < tablen1;i++) {
				  if (tab.rows[i].cells[0].getElementsByTagName('INPUT')[0].checked == true){
						last = i;

				   }
                if (tab1.rows[i].cells[1].getElementsByTagName('INPUT')[0].value != ""){
				     criteriaName[tmp1]=tab1.rows[i].cells[1].getElementsByTagName('INPUT')[0].value;
						tmp1 = tmp1 + 1;
								
				}				
				}
			var nameflag=false;
			     for (var i = 0;i < criteriaName.length;i++) {
				 for(var j = 0;j < criteriaName.length;j++){
				 if(criteriaName[i]==criteriaName[j]){
				 nameflag =true;
				 break;
				 }
				 }
				 if(nameflag)
				 break;
				 }
				if(nameflag){
			   alertMessage("Same criteria name cannot be added twice", "I");
			   }}
if(!nameflag){*/
    var Smryflds = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS");
    var SmryQlds = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS[QUERY='Y']");
	var allQueryFields = ""; 
    for (var j = 0;j < SmryQlds.length;j++) {
            if (getNodeText(selectSingleNode(SmryQlds[j], "FIELD_NAME")) != "") {
			allQueryFields += getNodeText(selectSingleNode(SmryQlds[j], "FIELD_NAME"))+'~';
        }
		 }
	var tab = document.getElementById('cri_src_btn').tBodies[0];
                var tablen = tab.rows.length;
				var tmp =0;
                if (tablen != 0) {
                for (var i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[0].getElementsByTagName('INPUT')[0].checked == true){
						last = i;
						tmp = tmp + 1;							
            }
        }
           
				 if (tmp > 1) {           
                alertMessage("Select only one Criteria", "I");
        }
				else if(tab.rows[last].cells[1].getElementsByTagName('INPUT')[0].value == "")
				alertMessage("Add criteria name", "I");
			else
			loadSubScreenDIV("ChildWin", "RadCriteria2.jsp");

    }
		 else
		 alertMessage("Add Criteria first", "I");
//	loadSubScreenDIV("ChildWin", "RadCriteria.jsp");
return allQueryFields;
//}

}

function fndefault(){
			var last = "";
				var tab = parent.document.getElementById('cri_src_btn').tBodies[0];
                var tablen = tab.rows.length;
				var tmp =0;
                if (tablen != 0) {
                for (var i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[0].getElementsByTagName('INPUT')[0].checked == true){
						last = i;
						tmp = tmp + 1;							
				}				
				}
				var cols = tab.rows[last].cells[2].getElementsByTagName("INPUT")[0].value;
				var coldetarr = new Array();
				coldetarr = cols.split("~");
				if(coldetarr.length==2){
				var fieldname =new Array();
				var searchcharlen =new Array();
				fieldname = coldetarr[0].split(":");
				searchcharlen = coldetarr[1].split(":");
				var tableObj = document.getElementById("Criteria_Search");
            if (fieldname.length == searchcharlen.length) {
					 var queryfields = new Array();
			    deleteAll("Criteria_Search");
				var xml = parent.dom;
				var queryfield = selectNodes(xml, "//SUMMARY_DETAILS[QUERY='Y']");
				for (var i = 0; i < queryfield.length; i++) {
					var query = getNodeText(selectSingleNode(queryfield[i], "FIELD_NAME"));
					queryfields[i] = query;
				}
				
				for(var i=0; i<queryfields.length;i++){
				var m = "";
				for(var j=0 ;j<queryfields.length ;j++){
				var testflag = false;
				if(	queryfields[i] == fieldname[j]	){
				testflag = true;
				m = j;
				break;
                        }
                    }
				if(testflag){
				addNewRow("Criteria_Search");
				
				tableObj.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = fieldname[m];
				tableObj.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].checked = true;
				tableObj.tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value = searchcharlen[m];	
			//	break;
                    }
                    else {
				addNewRow("Criteria_Search");
				
				tableObj.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = queryfields[i];
				tableObj.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].checked = false;
				tableObj.tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value = "";	
			//	break;
				}
				
				}
				}
				else{
				 alertMessage("Mismatch in the search fields and Search char length", "I");
				}
				
				}
				
    }
}

function checkNameValue(){
var tab = document.getElementById('cri_src_btn').tBodies[0];
			var tablen = tab.rows.length;
			var criteriaName =new Array();
			var flag =false;
			var tmp =0;
                if (tablen > 0) {
                for (var i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[1].getElementsByTagName('INPUT')[0].value == "" || tab.rows[i].cells[2].getElementsByTagName('INPUT')[0].value == ""){
				flag=true;
				break;
            }
        }

}
return flag;
}

function checkName(k) {
			var name=k.value;
			var tab = document.getElementById('cri_src_btn').tBodies[0];
			var tablen = tab.rows.length;
			var criteriaName =new Array();
			var tmp =0;
                if (tablen > 1) {
                for (var i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[1].getElementsByTagName('INPUT')[0].value != ""){
				criteriaName[tmp]=tab.rows[i].cells[1].getElementsByTagName('INPUT')[0].value;
						tmp = tmp + 1;							
				}				
				}
				var nameflag=0;;
				 for(var j = 0;j < criteriaName.length;j++){
				 if(criteriaName[j]==name){
				 nameflag = nameflag+1;
				 if(nameflag==2)
				 break;
				 }
				 }
				if(nameflag>=2){
				alertMessage("Same criteria name cannot be added twice", "I");
			    k.value="";
			   }
    }
}

function checkCriteria(compstr){
				
			var tab = parent.document.getElementById('cri_src_btn').tBodies[0];
			var tablen = tab.rows.length;
			var criteriaVal =new Array();
			var criteriaStrVal = new Array();
			var tmp =0;
			var loopbreakflag = true;
                if (tablen > 1) {
                for (var i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[2].getElementsByTagName('INPUT')[0].value != ""){
				criteriaVal[tmp]=tab.rows[i].cells[2].getElementsByTagName('INPUT')[0].value;
						tmp = tmp + 1;							
            }
        }
				}
				
				if(criteriaVal.length>0 && loopbreakflag){
				 for (var i = 0;i < criteriaVal.length;i++) {
				      var eachcrival = new Array();
					  eachcrival = criteriaVal[i].split("~");
					  var eachcriquerystring = new Array();
					  var eachcrivalstring = new Array();
					  eachcriquerystring = eachcrival[0].split(":");
					  eachcrivalstring = eachcrival[1].split(":");
					 var compareQrystring = ""; 
					 var compareValstring = "";
					 for(var k=0 ; k<eachcrivalstring.length;k++){
					 compareQrystring += eachcriquerystring[k];
					 compareValstring += eachcrivalstring[k];
					 }
					 if(compareQrystring == compstr){
					 loopbreakflag = false;
					 alertMessage("Criteria selected is already a part of existing criteria please select different option ", "I");
					 break;
					 }	 
				}
				}
     return loopbreakflag;
}

function checkCriteriavalueDS(fld){
var value=fld.value;
var title=fld.title;
var rownum = fld.title.substring(7,fld.title.indexOf("col")-1);

var summtable=document.getElementById('SUM_DTLS').tBodies[0];
var tablen = summtable.rows.length;
var summry = selectNodes(dom, "//RAD_SUMMARY");
var DsName = getNodeText(selectSingleNode(summry[0], "RSLT_DATASRC"));
var datablkname = getNodeText(selectSingleNode(summry[0], "RSLT_DATABLK"));
var blkNodes = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + datablkname + "']");
var fldname = summtable.rows[rownum-1].cells[1].getElementsByTagName('INPUT')[0].value;
var datasourcename = getNodeText(selectNodes(selectNodes(blkNodes[0],"//RAD_BLK_FIELDS[FIELD_NAME='"+fldname+"']")[0],"DBT")[0]);
var datasourcefldname = getNodeText(selectNodes(selectNodes(blkNodes[0],"//RAD_BLK_FIELDS[FIELD_NAME='"+fldname+"']")[0],"DBC")[0]);

var dsNodes = selectNodes(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + datasourcename + "']");
var datalen = getNodeText(selectNodes(selectNodes(dsNodes[0],"//RAD_FIELDS[COLUMN_NAME='"+datasourcefldname+"']")[0],"MAX_LENGTH")[0]);
if(parseInt(datalen)<parseInt(value)){
	 alertMessage("Value entered must be lesser than the maximum value of the field in database ", "I");
	 fld.value="";
	 return;
}
}

function checkNewCriteria() {

            var tab = document.getElementById('SUM_DTLS').tBodies[0];
			var tablen = tab.rows.length;
			var criteriaName =new Array();
			var loopbreakflag=false;
                if (tablen > 1) {
                for (var i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[4].getElementsByTagName('INPUT')[0].value != ""){
				       loopbreakflag=true;
						break;					   
            }
        }
                 }
      return loopbreakflag;
           }