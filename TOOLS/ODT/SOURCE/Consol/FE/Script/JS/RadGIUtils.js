/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadGIUtils.js
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

var xml3 = " ";
var domgi = " ";
giInterFace = true;

function fnGIRename(val) {
    /*TO rename the records*/
    var Title = "Rename Record ";
    var action = "rename";
    loadSubScreenDIV("ChildWin", "RadAddGIRecord.jsp?FormatType=" + val + "&Action=" + action + "&Title=" + Title);
}

function addRecords(val) {
    /*TO ADD New records*/
    var Title = "Add Record ";
    var action = "add";
    loadSubScreenDIV("ChildWin", "RadAddGIRecord.jsp?FormatType=" + val + "&Action=" + action + "&Title=" + Title);
}

function fnRenameGIrec(patharray, NewVal) {
    /*TO Rename records*/
    var elements = patharray.split("~");
    var oldval = elements[1];
    var xpath = getGINodePath(elements);
    var scr = selectSingleNode(dom, xpath[0]);
    scr.setAttribute("ID", NewVal);
    if (getNodeText(selectSingleNode(scr, "REC_CODE")) == oldval) {
        setNodeText(selectSingleNode(scr, "REC_CODE"), NewVal);
    }
    Preobjec = xpath[1] + "~" + NewVal;
    updateGITreeAfterRename(xpath[1] + '~' + NewVal, patharray);
    showData(xpath[1] + "~" + NewVal);

}

function loaddom() {
    /*TO load basic dom structure for gi*/
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = dataXML + "<RAD_FUNCTIONS><FORMAT_ID/><FORMAT_CATEGORY/><INCOMING_FUNCTIONID/>";
    dataXML = dataXML + "<ACTION/><ORIGINATION_DATE/><USER_ID/><RELEASE_CODE/><ENV_CODE/>";
    dataXML = dataXML + "<FORMAT_PREFERENCES><MAX_LINE_SIZE/><FORMAT_DESCRIPTION/></FORMAT_PREFERENCES>";
    dataXML = dataXML + "<FORMAT_HEADER><SECTION_TYPE/><NO_OF_LINES/><LENGTH/><ST_TAG/><END_TAG/><RECORD ID=\"HDRREC\"><REC_CODE>HDRREC</REC_CODE><REC_CATEGORY>HDR</REC_CATEGORY><HOMOGENOUS/><HIERARCHICAL/><DB_TABLES/><WHERE_CLAUSE/><ORDER_BY_CLAUSE/><REC_LOC_TYPE/><REC_DELIMITER/><TAG_FLD_POS/><NO_OF_LINES/><LENGTH/><FIELD_TYPE/><FIELD_DELIMITER/><REC_ID_TYPE/><ST_TAG/><ED_TAG/></RECORD></FORMAT_HEADER>";
    dataXML = dataXML + "<FORMAT_BODY><SECTION_TYPE/><NO_OF_LINES/><LENGTH/><ST_TAG/><END_TAG/></FORMAT_BODY>";
    dataXML = dataXML + "<FORMAT_FOOTER><SECTION_TYPE/><NO_OF_LINES/><LENGTH/><ST_TAG/><END_TAG/><RECORD ID=\"FTRREC\"><REC_CODE>FTRREC</REC_CODE><REC_CATEGORY>FTR</REC_CATEGORY><HOMOGENOUS/><HIERARCHICAL/><DB_TABLES/><WHERE_CLAUSE/><ORDER_BY_CLAUSE/><REC_LOC_TYPE/><REC_DELIMITER/><TAG_FLD_POS/><NO_OF_LINES/><LENGTH/><FIELD_TYPE/><FIELD_DELIMITER/><REC_ID_TYPE/><ST_TAG/><ED_TAG/></RECORD></FORMAT_FOOTER>";
    dataXML = dataXML + "</RAD_FUNCTIONS>";
    dom = loadXMLDoc(dataXML);
}

function createGIMainElements() {
    /*TO create and set values of main elements in  gi*/
    loaddom();
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_ID")), document.getElementById('FORMAT_ID').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_CATEGORY")), document.getElementById('FORMAT_CATEGORY').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/INCOMING_FUNCTIONID")), document.getElementById('FUNCTION_ID').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_PREFERENCES/MAX_LINE_SIZE")), document.getElementById('MAX_LINE_SIZE').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_PREFERENCES/FORMAT_DESCRIPTION")), document.getElementById('FORMAT_DESCRIPTION').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ORIGINATION_DATE")), parent.originDate);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/USER_ID")), parent.username);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ENV_CODE")), parent.envCode);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/RELEASE_CODE")), parent.relCode);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ACTION")), document.getElementById('ACTION').value);

}

function addGIAtrr(val, val1) {
    /*TO   add records in gi and validations*/
    var val2;
    if (val == 'DHAD') {
        val2 = 'RHAD';
    }
    else if (val == 'DBDY') {
        val2 = 'RBDY';
        var res = selectNodes(dom, "//FORMAT_BODY/RECORD/REC_CODE");
        for (i = 0;i < res.length;i++) {
            var rec = getNodeText(res[i]);
            if (val1 == rec) {
                alertMessage("Record already exists", "E");
                return;
            }
        }
    }
    else if (val == 'DFTR') {
        val2 = 'RFTR';
    }
    updateGITreeAfterAdd(val2, val1);
    CreateGIdom(val2, val1);
    giInterFace = true;
    setScreens(val2);
    showData(val2 + "~" + val1);
    Preobjec = val2 + "~" + val1;
}

function CreateGIdom(val, redId) {
    /*TO   create gi dom */
    var giRecords = "";
    var rootnode;

    if (val == "RHAD") {
        rootnode = selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_HEADER");
        giRecords = dom.createElement("RECORD");
        rootnode.appendChild(giRecords);
        var nodeArray = elementArray['RECORD'].split("~");
        for (var i = 0;i < nodeArray.length;i++) {
            var Records = dom.createElement(nodeArray[i]);
            giRecords.appendChild(Records);
            giRecords.setAttribute("ID", redId);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//FORMAT_HEADER/RECORD[@ID='" + redId + "']"), "REC_CODE"), redId);
    }
    else if (val == "RBDY") {
        rootnode = selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_BODY");
        giRecords = dom.createElement("RECORD");
        rootnode.appendChild(giRecords);
        var nodeArray = elementArray['RECORD'].split("~");
        for (var i = 0;i < nodeArray.length;i++) {
            var Records = dom.createElement(nodeArray[i]);
            giRecords.appendChild(Records);
            giRecords.setAttribute("ID", redId);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//FORMAT_BODY/RECORD[@ID='" + redId + "']"), "REC_CODE"), redId)
    }
    else if (val == "RFTR") {
        rootnode = selectSingleNode(dom, "//RAD_FUNCTIONS/FORMAT_FOOTER");
        giRecords = dom.createElement("RECORD");
        rootnode.appendChild(giRecords);
        var nodeArray = elementArray['RECORD'].split("~");
        for (var i = 0;i < nodeArray.length;i++) {
            var Records = dom.createElement(nodeArray[i]);
            giRecords.appendChild(Records);
            giRecords.setAttribute("ID", redId);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//FORMAT_FOOTER/RECORD[@ID='" + redId + "']"), "REC_CODE"), redId)
    }
}

function fnDeleteGIRec(patharray) {
    /*TO   delete gi record */
    var node;
    var sel;
    if (patharray[0] == 'RHAD') {
        node = selectNodes(dom, "//FORMAT_HEADER/RECORD[@ID='" + patharray[1] + "']");
        sel = 'DHAD';
    }
    else if (patharray[0] == 'RBDY') {
        node = selectNodes(dom, "//FORMAT_BODY/RECORD[@ID='" + patharray[1] + "']");
        sel = 'DBDY';
    }
    else if (patharray[0] == 'RFTR') {
        node = selectNodes(dom, "//FORMAT_FOOTER/RECORD[@ID='" + patharray[1] + "']");
        sel = 'DFTR';
    }
    updateGITreeAfterDelete(patharray[0] + '~' + patharray[1]);
    for (var i = 0;i < node.length;i++) {
        x = node[i];
        x.parentNode.removeChild(x);
    }
    setScreens(sel);
    showData(sel);
    Preobjec = "";
    PreNode = sel;
}

function GIBasicVals(action) {
    /* basic validations used in the gi at various places in gi*/

    showhidedivid();
    var roleRights = parent.rolerights;
    var actIndex = document.getElementsByName("ACTION")[0].selectedIndex;
    var actVal = document.getElementsByName("ACTION")[0].options[actIndex].value;

    if (action == "AfterLoad") {
        enablegifields();
    }
    else if (actVal == "LOAD") {
        fngetReadMode("SINGLE"); 
        document.getElementsByName("LOAD_SCREEN_XML")[0].disabled = false
        document.getElementsByName("BROWSE")[0].disabled = false;
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSE")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible"; 
        setInnerText((document.getElementsByName("LBL_LOAD_XML")), "Load Screen Xml");
        document.getElementsByName("PARENT_XML").disabled = false;
        document.getElementsByName("FORMAT_ID")[0].value = "";
        document.getElementsByName("FORMAT_ID")[0].disabled = true;
        document.getElementsByName("FORMAT_CATEGORY")[0].value = "O";
        document.getElementsByName("FORMAT_CATEGORY")[0].disabled = false;
        document.getElementsByName("FUNCTION_ID")[0].disabled = true;
        document.getElementsByName("FUNCTION_ID")[0].value = "";
        document.getElementsByName("PARENT_XML")[0].disabled = true;
        document.getElementsByName("PARENT_XML")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSEPRNT")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSEPRNT")[0].disabled = false;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
        document.getElementsByName("saveRADXml")[0].disabled = false;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("genFiles")[0].disabled = false;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("depFiles")[0].disabled = false;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("chekinFiles")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = false;

    }
    else if (actVal == "NONE") {
        setInnerText((document.getElementsByName("LBL_LOAD_XML")), "Load Screen Xml");
        document.getElementsByName("FORMAT_ID")[0].disabled = true;
        document.getElementsByName("FORMAT_ID")[0].value = "";
        document.getElementsByName("FORMAT_CATEGORY")[0].value = "O";
        document.getElementsByName("FORMAT_CATEGORY")[0].disabled = true;
        document.getElementsByName("LOAD_SCREEN_XML")[0].disabled = true;
        document.getElementsByName("LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("LOAD_SCREEN_XML")[0].value = "";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
        document.getElementsByName("FILE_SAVE_PATH")[0].value = "";
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("FUNCTION_ID")[0].disabled = true;
        document.getElementsByName("FUNCTION_ID")[0].value = "";
        document.getElementsByName("PARENT_XML")[0].disabled = true;
        document.getElementsByName("PARENT_XML")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSEPRNT")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSEPRNT")[0].disabled = false;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbarD";
        document.getElementsByName("saveRADXml")[0].disabled = true;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("genFiles")[0].disabled = true;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("depFiles")[0].disabled = true;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("chekinFiles")[0].disabled = true;
        document.getElementsByName("close")[0].className = "BUTTONToolbarD";
        document.getElementsByName("close")[0].disabled = true;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = true;

    }

    else if (actVal == "NEW") {
        setInnerText((document.getElementsByName("LBL_LOAD_XML")), "Load Screen Xml");
        document.getElementsByName("FORMAT_ID")[0].disabled = false;
        document.getElementsByName("FORMAT_CATEGORY")[0].value = "O";
        document.getElementsByName("FORMAT_CATEGORY")[0].disabled = false;
        document.getElementsByName("LOAD_SCREEN_XML")[0].disabled = true;
        document.getElementsByName("LOAD_SCREEN_XML")[0].style.visibility = "hidden";
        document.getElementsByName("FUNCTION_ID")[0].disabled = true;
        document.getElementsByName("FUNCTION_ID")[0].value = "";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
        document.getElementsByName("saveRADXml")[0].disabled = false;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("genFiles")[0].disabled = false;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("depFiles")[0].disabled = false;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("chekinFiles")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = false;
    }

}

function showhidedivid() {
    /* basic validations used in the gi for showing and hiding the tables and divs*/
    enbleincomingfields();
    var formatcat = document.getElementById("FORMAT_CATEGORY").value;
    var H_Fields_Out = document.getElementsByName("DIV_ASSOCIATED_H_FIELDS_OUT")[0];
    var H_Fields_In = document.getElementsByName("DIV_ASSOCIATED_H_FIELDS_IN")[0];
    var B_Fields_Out = document.getElementsByName("DIV_ASSOCIATED_B_FIELDS_OUT")[0];
    var B_Fields_In = document.getElementsByName("DIV_ASSOCIATED_B_FIELDS_IN")[0];
    var F_Fields_Out = document.getElementsByName("DIV_ASSOCIATED_F_FIELDS_OUT")[0];
    var F_Fields_In = document.getElementsByName("DIV_ASSOCIATED_F_FIELDS_IN")[0];
    var F_ASSOCIATED_Out = document.getElementsByName("DIV_ASSOCIATED_B_RECORDS")[0];
    var F_ASSOCIATED_In = document.getElementsByName("DIV_ASSOCIATED_B_BLOCKS")[0];

    if (formatcat == "O") {
        H_Fields_Out.style.display = "block";
        B_Fields_Out.style.display = "block";
        F_Fields_Out.style.display = "block";
        F_ASSOCIATED_Out.style.display = "block";

        H_Fields_In.style.display = "none";
        B_Fields_In.style.display = "none";
        F_Fields_In.style.display = "none";
        F_ASSOCIATED_In.style.display = "none";
    }

    if (formatcat == "I") {
        H_Fields_Out.style.display = "none";
        B_Fields_Out.style.display = "none";
        F_Fields_Out.style.display = "none";
        F_ASSOCIATED_Out.style.display = "none";

        H_Fields_In.style.display = "block";
        B_Fields_In.style.display = "block";
        F_Fields_In.style.display = "block";
        F_ASSOCIATED_In.style.display = "block";

    }

}

function enbleincomingfields() {
    /* basic validations used in the gi forenabling and disabling various fields*/

    var formatcat = document.getElementById("FORMAT_CATEGORY").value;
    if (formatcat == "I") {
        document.getElementById("FUNCTION_ID").disabled = true;
        document.getElementById("PARENT_XML").disabled = true;
        document.getElementById("PARENT_XML").style.visibility = "hidden";
        document.getElementsByName("BROWSEPRNT")[0].style.visibility = "visible";
        document.getElementsByName("BROWSEPRNT")[0].disabled = false;
        document.getElementsByName("REC_ID_TYPE")[0].disabled = false;
        document.getElementsByName("REC_ID_TYPE")[1].disabled = false;
        document.getElementsByName("REC_ID_TYPE")[2].disabled = false;
        document.getElementsByName("WHERE_CLAUSE")[0].disabled = true;
        document.getElementsByName("WHERE_CLAUSE")[1].disabled = true;
        document.getElementsByName("WHERE_CLAUSE")[2].disabled = true;
        document.getElementsByName("ORDER_BY_CLAUSE")[0].disabled = true;
        document.getElementsByName("ORDER_BY_CLAUSE")[1].disabled = true;
        document.getElementsByName("ORDER_BY_CLAUSE")[2].disabled = true;
        document.getElementsByName("WHERE_CLAUSE")[0].value = "";
        document.getElementsByName("WHERE_CLAUSE")[1].value = "";
        document.getElementsByName("WHERE_CLAUSE")[2].value = "";
        document.getElementsByName("ORDER_BY_CLAUSE")[0].value = "";
        document.getElementsByName("ORDER_BY_CLAUSE")[1].value = "";
        document.getElementsByName("ORDER_BY_CLAUSE")[2].value = "";
        document.getElementsByName("HWHERE_CLAUSE0")[0].style.visibility = "hidden";
        document.getElementsByName("BWHERE_CLAUSE1")[0].style.visibility = "hidden";
        document.getElementsByName("FWHERE_CLAUSE2")[0].style.visibility = "hidden";
        document.getElementsByName("HORDER_BY_CLAUSE0")[0].style.visibility = "hidden";
        document.getElementsByName("BORDER_BY_CLAUSE1")[0].style.visibility = "hidden";
        document.getElementsByName("FORDER_BY_CLAUSE2")[0].style.visibility = "hidden";

    }
    else if (formatcat == "O") {
        document.getElementById("FUNCTION_ID").disabled = true;
        document.getElementById("FUNCTION_ID").value = "";
        document.getElementById("PARENT_XML").disabled = true;
        document.getElementById("PARENT_XML").style.visibility = "hidden";
        document.getElementsByName("BROWSEPRNT")[0].style.visibility = "hidden";
        document.getElementsByName("BROWSEPRNT")[0].disabled = false;
        document.getElementsByName("REC_ID_TYPE")[0].disabled = true;
        document.getElementsByName("REC_ID_TYPE")[1].disabled = true;
        document.getElementsByName("REC_ID_TYPE")[2].disabled = true;
        document.getElementsByName("WHERE_CLAUSE")[0].disabled = false;
        document.getElementsByName("WHERE_CLAUSE")[1].disabled = false;
        document.getElementsByName("WHERE_CLAUSE")[2].disabled = false;
        document.getElementsByName("ORDER_BY_CLAUSE")[0].disabled = false;
        document.getElementsByName("ORDER_BY_CLAUSE")[1].disabled = false;
        document.getElementsByName("ORDER_BY_CLAUSE")[2].disabled = false;
        document.getElementsByName("REC_ID_TYPE")[0].value = "";
        document.getElementsByName("REC_ID_TYPE")[1].value = "";
        document.getElementsByName("REC_ID_TYPE")[2].value = "";
        document.getElementsByName("HWHERE_CLAUSE0")[0].style.visibility = "visible";
        document.getElementsByName("BWHERE_CLAUSE1")[0].style.visibility = "visible";
        document.getElementsByName("FWHERE_CLAUSE2")[0].style.visibility = "visible";
        document.getElementsByName("HORDER_BY_CLAUSE0")[0].style.visibility = "visible";
        document.getElementsByName("BORDER_BY_CLAUSE1")[0].style.visibility = "visible";
        document.getElementsByName("FORDER_BY_CLAUSE2")[0].style.visibility = "visible";

    }
}

function fnincomingvalidations() {

    var formatindex = document.getElementsByName("FORMAT_CATEGORY")[0].selectedIndex;
    var formatcat = document.getElementsByName("FORMAT_CATEGORY")[0].options[formatindex].value;
    if (formatcat == "I") {
        try {
            var func = getNodeText(selectSingleNode(domgi, "//RAD_FUNCTIONS/FUNCTION_ID"));
            if (document.getElementsByName('FUNCTION_ID')[0].value != func) {
                document.getElementsByName("PARENT_XML")[0].value = "";
                document.getElementById("PARENT_XML").disabled = false;
                document.getElementById("PARENT_XML").style.visibility = "visible";
                alertMessage("please load a valid Radxml", "I");
            }
        }
        catch (e) {
            if (document.getElementById("PARENT_XML").value != "") {
                document.getElementById("PARENT_XML").disabled = true;
                document.getElementById("PARENT_XML").style.visibility = "visible";
            }
            else {
                document.getElementById("PARENT_XML").disabled = false;
                document.getElementById("PARENT_XML").style.visibility = "visible";
            }
            alertMessage("please load a Radxml", "I");
        }

    }
}

function trim(stringToTrim) {
    /* used to trim the data sent*/
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function fngipopulate(val, callorlaunch) {
    /* used to populate  data in tables*/
    var tmp = 0;
    var currRow = 0;
    var tableObject = document.getElementById(callorlaunch);
    for (var i = 0;i < tableObject.tBodies[0].rows.length;i++) {
        if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tmp = tmp + 1;
            currRow = i;
        }
    }
    if (tmp > 1) {
        i = 0;
        if (callorlaunch == 'GI_HIN_fields' || callorlaunch == 'GI_BIN_fields' || callorlaunch == 'GI_FIN_fields' || callorlaunch == 'GI_HOUT_fields' || callorlaunch == 'GI_BOUT_fields' || callorlaunch == 'GI_FOUT_fields') {
            alertMessage("Select only one row", "I");
        }
        return false;
    }
    else if (tmp == 0) {
        if (callorlaunch == 'GI_HIN_fields' || callorlaunch == 'GI_BIN_fields' || callorlaunch == 'GI_FIN_fields' || callorlaunch == 'GI_HOUT_fields' || callorlaunch == 'GI_BOUT_fields' || callorlaunch == 'GI_FOUT_fields') {
            alertMessage("No row  selected", "I");
        }
        return false;
    }
    if (callorlaunch == 'GI_HOUT_fields' || callorlaunch == 'GI_BOUT_fields' || callorlaunch == 'GI_FOUT_fields') {
        var fld = tableObject.tBodies[0].rows[currRow].cells[1].getElementsByTagName("INPUT")[0].value;
        var datatype = tableObject.tBodies[0].rows[currRow].cells[2].getElementsByTagName("SELECT")[0].value;
        var datefmt = tableObject.tBodies[0].rows[currRow].cells[3].getElementsByTagName("INPUT")[0].value;
        var tablename = tableObject.tBodies[0].rows[currRow].cells[4].getElementsByTagName("INPUT")[0].value;
        var col = tableObject.tBodies[0].rows[currRow].cells[5].getElementsByTagName("SELECT")[0].value;
        var value = tableObject.tBodies[0].rows[currRow].cells[6].getElementsByTagName("INPUT")[0].value;
        var length = tableObject.tBodies[0].rows[currRow].cells[7].getElementsByTagName("INPUT")[0].value;
        var key = tableObject.tBodies[0].rows[currRow].cells[8].getElementsByTagName("SELECT")[0].value;
        var padpref = tableObject.tBodies[0].rows[currRow].cells[9].getElementsByTagName("SELECT")[0].value;
        var padchr = tableObject.tBodies[0].rows[currRow].cells[10].getElementsByTagName("INPUT")[0].value;
        var excludesel = tableObject.tBodies[0].rows[currRow].cells[11].getElementsByTagName("INPUT")[0].checked;
        var pos = tableObject.tBodies[0].rows[currRow].cells[12].getElementsByTagName("INPUT")[0].value;

        loadSubScreenDIV("ChildWin", "RadGIFieldOUT.jsp?tbName=" + callorlaunch + "&rowid=" + currRow + "&fld=" + fld + "&datatype=" + datatype + "&datefmt=" + datefmt + "&pos=" + pos + "&tablename=" + tablename + "&col=" + col + "&value=" + value + "&length=" + length + "&key=" + key + "&padpref=" + padpref + "&padchr=" + padchr + "&excludesel=" + excludesel);

    }
    if (callorlaunch == 'GI_HIN_fields' || callorlaunch == 'GI_BIN_fields' || callorlaunch == 'GI_FIN_fields') {
        var fld = tableObject.tBodies[0].rows[currRow].cells[1].getElementsByTagName("INPUT")[0].value;
        var datatype = tableObject.tBodies[0].rows[currRow].cells[2].getElementsByTagName("SELECT")[0].value;
        var datefmt = tableObject.tBodies[0].rows[currRow].cells[3].getElementsByTagName("INPUT")[0].value;
        var stpos = tableObject.tBodies[0].rows[currRow].cells[4].getElementsByTagName("INPUT")[0].value;
        var length = tableObject.tBodies[0].rows[currRow].cells[5].getElementsByTagName("INPUT")[0].value;
        var trimpref = tableObject.tBodies[0].rows[currRow].cells[6].getElementsByTagName("SELECT")[0].value;
        var trimchr = tableObject.tBodies[0].rows[currRow].cells[7].getElementsByTagName("INPUT")[0].value;
        var blk = tableObject.tBodies[0].rows[currRow].cells[8].getElementsByTagName("SELECT")[0].value;
        var fldname = tableObject.tBodies[0].rows[currRow].cells[9].getElementsByTagName("SELECT")[0].value;
        var parentblk = tableObject.tBodies[0].rows[currRow].cells[10].getElementsByTagName("SELECT")[0].value;
        var exitsfile = tableObject.tBodies[0].rows[currRow].cells[11].getElementsByTagName("INPUT")[0].checked;
        var fcfldpos = tableObject.tBodies[0].rows[currRow].cells[12].getElementsByTagName("INPUT")[0].value;
        var fldpos = tableObject.tBodies[0].rows[currRow].cells[13].getElementsByTagName("INPUT")[0].value;
        loadSubScreenDIV("ChildWin", "RadGIFieldsIN.jsp?tbName=" + callorlaunch + "&rowid=" + currRow + "&fld=" + fld + "&datatype=" + datatype + "&datefmt=" + datefmt + "&fldpos=" + fldpos + "&stpos=" + stpos + "&length=" + length + "&trimpref=" + trimpref + "&trimchr=" + trimchr + "&blk=" + blk + "&fldname=" + fldname + "&fcfldpos=" + fcfldpos + "&parentblk=" + parentblk + "&exitsfile=" + exitsfile);
    }
}

function numberval(id) {
    /*   validation for fields which are of number type*/
    var val = id.value;
    if (val >= 0) {
    }
    else {
        document.getElementById(id.uniqueID).value = "";
        alertMessage("Please enter valid number for " + id.id, "E");
    }
}

function fn_populate_Blocks_togi(node, tablename, frmname, fld, cellno) {
    /*  to  populate blocks in gi for incoming*/
    if (node == "RAD_DATA_BLOCKS") {
        var nodename = "BLOCK_NAME";
    }
    var obj = "";
    var nodename1 = "BLOCK_ID";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (document.getElementsByName("FUNCTION_ID")[0].value == "") {
        var tableObject = document.getElementById(tablename);
        tab.rows[tablen - 1].cells[0].getElementsByTagName("INPUT")[0].checked = true;
        delRow(tablename);
        alertMessage("Please load a radxml", "E");
        return;
    }
    if (tablen != 0 || tablename == 'GI_B_AssocBlocks') {
        obj = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0];
        obj.options.length = 0;
        var result = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0].value;
        var blks = selectNodes(domgi, ("//" + node + ""));
        var blkslen = blks.length;
        addOption(obj, "", "", true);
        for (var i = 0;i < blkslen;i++) {
            try {
                addOption(obj, getNodeText(selectSingleNode(blks[i], nodename)), getNodeText(selectSingleNode(blks[i], nodename)), false);
            }
            catch (e) {
                addOption(obj, getNodeText(selectSingleNode(blks[i], nodename1)), getNodeText(selectSingleNode(blks[i], nodename1)), false);
            }
        }
        tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0].value = result;

        if (tablename != 'GI_B_AssocBlocks') {
            var obj1 = "";
            obj1 = tab.rows[tablen - 1].cells[10].getElementsByTagName('SELECT')[0];
            obj1.options.length = 0
            var result1 = tab.rows[tablen - 1].cells[10].getElementsByTagName('SELECT')[0].value;
            var blks1 = selectNodes(domgi, ("//" + node + ""));
            var blkslen1 = blks.length;
            addOption(obj1, "", "", true);
            for (var i = 0;i < blkslen1;i++) {
                try {
                    addOption(obj1, getNodeText(selectSingleNode(blks[i], nodename)), getNodeText(selectSingleNode(blks[i], nodename)), false);
                }
                catch (e) {
                    addOption(obj1, getNodeText(selectSingleNode(blks[i], nodename1)), getNodeText(selectSingleNode(blks[i], nodename1)), false);
                }
            }
            tab.rows[tablen - 1].cells[10].getElementsByTagName('SELECT')[0].value = result1;

        }

    }
}

function fn_populate_FieldsFIELD_togi(tablename) {

    /*  to  populate Fields in gi for INCOMING*/

    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;

    for (rl = 0;rl < tablen;rl++) {
        var result = tab.rows[rl].cells[9].getElementsByTagName('SELECT')[0].value;
        var blkname = tab.rows[rl].cells[8].getElementsByTagName('SELECT')[0].value;
        var dsfld = tab.rows[rl].cells[9].getElementsByTagName('SELECT')[0];
        dsfld.options.length = 0;
        addOption(dsfld, "", "", true);
        try {
            var funcTyp = getNodeText(selectSingleNode(domgi, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
            var dsnodes = selectNodes(domgi, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS"));
        }
        catch (e) {
            var dsnodes = selectNodes(domgi, ("//RAD_SCREENS/RAD_DATA_BLOCKS[BLOCK_ID='" + blkname + "']/RAD_BLK_FIELDS"));
        }
        for (i = 0;i < dsnodes.length;i++) {
            addOption(dsfld, getNodeText(selectSingleNode(dsnodes[i], 'FIELD_NAME')), getNodeText(selectSingleNode(dsnodes[i], 'FIELD_NAME')), false);
        }
        tab.rows[rl].cells[9].getElementsByTagName('SELECT')[0].value = result;
    }

}

function fn_populate_RECORDS_togi(node, tablename, frmname, fld, cellno) {
    /*  to  populate Records in gi for outgoing*/
    var nodename = node;
    var obj = "";
    var obj1 = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        obj = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0];
        obj1 = tab.rows[tablen - 1].cells[cellno + 1].getElementsByTagName('SELECT')[0];
        var res1 = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0].value;
        var res2 = tab.rows[tablen - 1].cells[cellno + 1].getElementsByTagName('SELECT')[0].value;
        obj.options.length = 0
        obj1.options.length = 0
        var blks = selectNodes(dom, "//FORMAT_BODY/RECORD");
        var blkslen = blks.length;
        addOption(obj, "", "", true);
        addOption(obj1, "", "", true);
        for (var i = 0;i < blkslen;i++) {
            if (getNodeText(selectSingleNode(blks[i], nodename)) != document.getElementById('REC_CODE').value) {
                if (getNodeText(selectNodes(dom, "//FORMAT_BODY/RECORD/REC_CATEGORY")[i]) == "REC") {
                    addOption(obj, getNodeText(selectSingleNode(blks[i], nodename)), getNodeText(selectSingleNode(blks[i], nodename)), false);
                    addOption(obj1, getNodeText(selectSingleNode(blks[i], nodename)), getNodeText(selectSingleNode(blks[i], nodename)), false);
                }
            }
        }
        tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0].value = res1;
        tab.rows[tablen - 1].cells[cellno + 1].getElementsByTagName('SELECT')[0].value = res2;

    }
}

function enablegifields() {
    /* used for enabling various fields */
    document.getElementsByName("ACTION")[0].disabled = true;
    document.getElementsByName("FORMAT_ID")[0].disabled = true;
    document.getElementsByName("FORMAT_CATEGORY")[0].disabled = true;
    document.getElementsByName("LOAD_SCREEN_XML")[0].disabled = true;
    document.getElementsByName("PARENT_XML")[0].disabled = true;
    document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_CATEGORY")), document.getElementById('FORMAT_CATEGORY').value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/INCOMING_FUNCTIONID")), document.getElementsByName('FUNCTION_ID')[0].value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_PREFERENCES/MAX_LINE_SIZE")), document.getElementsByName('MAX_LINE_SIZE')[0].value);
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FORMAT_PREFERENCES/FORMAT_DESCRIPTION")), document.getElementsByName('FORMAT_DESCRIPTION')[0].value);
}

function fncheckfieldsdup(tablename) {
    /* used to check for similar fields */
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;

    for (i = 0;i < tablen;i++) {
        tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].disabled = true;
        if (tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].value == "") {
            tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].disabled = false;
        }
        for (j = i + 1;j < tablen;j++) {
            if ((tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].value) == (tab.rows[j].cells[1].getElementsByTagName("INPUT")[0].value)) {
                tab.rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = true;
                delRow(tablename);
                alertMessage("FIELD Already present", "E");
                return;
            }
        }
    }
}

function fnfieldssetvalues(tablename) {
    /*  to  populate Fields in gi for INCOMING*/

    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    var fieldname = "";
    var nodepath = "";
    var Blockname = "";
    var blockfield = "";

    for (var i = 0;i < tablen;i++) {
        fieldname = tab.rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
        if (document.getElementsByName("FORMAT_CATEGORY")[0].value == "O")
            tab.rows[i].cells[12].getElementsByTagName("INPUT")[0].value = i + 1;
        else 
            tab.rows[i].cells[13].getElementsByTagName("INPUT")[0].value = i + 1;

        try {
            Blockname = tab.rows[i].cells[8].getElementsByTagName("SELECT")[0].value;
            blockfield = tab.rows[i].cells[9].getElementsByTagName("SELECT")[0].value;
            if (Blockname != "" || blockfield != "") {
                var fields = selectNodes(domgi, ("//RAD_DATA_BLOCKS[@ID='" + Blockname + "']/RAD_BLK_FIELDS"));
                for (var fp = 0;fp < fields.length;fp++) {
                    if (getNodeText(selectSingleNode(fields[fp], 'FIELD_NAME')) == blockfield) {
                        tab.rows[i].cells[12].getElementsByTagName('INPUT')[0].value = fp + 1;
                    }

                }
            }
            else {
                tab.rows[i].cells[12].getElementsByTagName('INPUT')[0].value = "";
            }

        }
        catch (e) {
        }

    }

}

function funcGIfieldcolumns(tab, tablename, row) {
    /* for fetch columns from teh table selected   */
    try {
        var tabname = tab.parentElement.getElementsByTagName('INPUT')[0].value;
    }
    catch (e) {
        var tabname = tab;
    }

    if (row != "") {
        var rowindex1 = parseInt(row) + 1;
    }
    else {
        var rowindex1 = tab.parentElement.parentElement.rowIndex;
    }

    var tabn = funcGItablersyno(tabname);
    if (tabn != "") {
        tabname = tabn;
    }
	var  queryString = "DEFAULT_ONLY_COLUMN";
    //var queryString = "FETCH@SELECT COLUMN_NAME FROM user_tab_cols  WHERE TABLE_NAME ='" + tabname + "'";
    var WhereString="WHERE TABLE_NAME ='" + tabname + "'";
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
    var obj = "";
    var tabl = document.getElementById(tablename).tBodies[0];
    var tablen = tabl.rows.length;
    obj = tabl.rows[rowindex1 - 1].cells[5].getElementsByTagName('SELECT')[0];
    var result = tabl.rows[rowindex1 - 1].cells[5].getElementsByTagName('SELECT')[0].value;
    var cloumns = multRec.length;
    if (multRec.length >= 2) {
        addOption(obj, "", "", true);
        for (var i = 0;i < cloumns - 1;i++) {
            addOption(obj, multRec[i], multRec[i], false);
        }
        tabl.rows[rowindex1 - 1].cells[5].getElementsByTagName('SELECT')[0].value = result;
    }
    else {
        addOption(obj, "", "", true);
        obj.length = 1;
        alertMessage("Enter a valid table", "E");
        return;
    }

}

function funcGItablersyno(tablename) {
    /* for check if  the table is synonym or not  */
	var queryString = "USERSYNONYMS";
    //var queryString = "FETCH@SELECT TABLE_NAME FROM USER_SYNONYMS WHERE SYNONYM_NAME='" + tablename + "'";
	var WhereString = "WHERE SYNONYM_NAME='" + tablename + "'";
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
    return multRec[0];
}