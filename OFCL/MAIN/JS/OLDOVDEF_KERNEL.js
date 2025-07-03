/***************************************************************************************************************************
 **  This source is part of the FLEXCUBE Software System and is copyrighted by
 **  Oracle Financial Services Software Limited.
 **  Copyright (c) 2008 - 2015 by Oracle Financial Services Software Limited.
 **  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system,
 **  adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
 **  graphic, optic recording or otherwise, translated in any language or computer language,
 **  without the prior written permission of Oracle Financial Services Software Limited.
 **
 **  Oracle Financial Services Software Limited.
 **  10-11, SDF I, SEEPZ, Andheri (East),
 **  Mumbai - 400 096.
 **  India.
 **
 **   All rights reserved.
 **
 **  Written by         :
 **  Date of creation   :
 **  File Name          : OLDOVDEF_KERNEL.js
 **  Purpose            :
 **  Called From        :
 **
 **  Last Modified By   : Kavitha Asokan
 **  Last modified on   : 07-Mar-2023
 **  Reason             : REDWOOD_ADOPTION changes
 **  Search String      : Bug#34958820
 **
 **  Last Modified By   : Narendra Dhaker
 **  Last modified on   : 10-Jan-2024
 **  Reason             : Multi-level authorization not working
 **  Search String      : Bug#34958820
 ****************************************************************************************************************************/

var selectedIndex = '';
var flag;

function fnPreEnterQuery_KERNEL() {
    debugs("In fnPostEnterQuery", "A");
    fnEnableElement(getElementsByOjName("PRODUCT_CODE")[0]);
    fnEnableElement(getElementsByOjName("BRANCH")[0]);
    fnEnableElement(getElementsByOjName("CONTRACT_REF_NO")[0]);
    return true;
}

function fnPreExecuteQuery_KERNEL() {
    gContract_Ref_No = getElementsByOjName("CONTRACT_REF_NO")[0].value;
    debugs("In fnPreExecuteQuery", "A");
    fnEnableElement(document.getElementById("BLK_HEAD__BTN_AUTH"));
    return true;
}

function fnPostExecuteQuery_KERNEL() {
    debugs("In fnPostExecuteQuery", "A");
    fnEnableElement(document.getElementById("BLK_HEAD__BTN_AUTH"));
    //var tableRef = document.getElementById('BLK_OVD'); //Bug#34958820
	var tableRef = getTableObjForBlock('BLK_OVD'); //Bug#34958820
    var noOfRows = tableRef.tBodies[0].rows;
    for (rowIndex = 0;rowIndex < noOfRows.length;rowIndex++) {
        fnEnableElement(getElementsByOjName("BTN_CONTRACT")[rowIndex]);
        fnEnableElement(getElementsByOjName("OVD_STATUS")[rowIndex]);
        fnEnableElement(getElementsByOjName("REMARKS")[rowIndex]);
        fnDisableElement(getElementsByOjName("MAKER_ID")[rowIndex]);
        //getElementsByOjName("OVD_STATUS")[rowIndex].value = 'A';
        fnEnableElement(getElementsByOjName("BTN_ROLE")[rowIndex]);
    }
    getElementsByOjName("CONTRACT_REF_NO")[0].value = gContract_Ref_No;
    return true;
}

function fnShowContract(event) {
    parentWinParams = new Object();
    var index = getRowIndex(event) - 1;
	//Bug#32476677 Start
    //var tableObj = document.getElementById('BLK_OVD');
	var tableObj = getTableObjForBlock('BLK_OVD');
	//Bug#32476677 End
    parentWinParams.CONTRACT_REF_NO = tableObj.tBodies[0].rows[index].cells[1].getElementsByTagName("oj-input-text")[0].value;
    var brnCode = document.getElementById("BLK_HEAD__BRANCH").value;
    var l_module = document.getElementById("BLK_HEAD__MODULE").value;
    try {
        if (l_module == 'OL') {
            parentWinParams.FUNCTION_ID = 'OLDTRONL';
        }
    }
    catch (e) {
        debugs("In fnShowContract exceptions", "A");
    }
    parentWinParams.LANG = mainWin.LangCode;
    parentWinParams.UI_XML = '';
    parentWinParams.BRANCH = brnCode;
    parentWinParams.PARENT_FUNC_ID = 'OLDOVDEF';
    mainWin.dispHref1(parentWinParams.FUNCTION_ID, seqNo);
    return true;
}

function fnShowSubscreen_CVS_ROLE(event) {
    selectedIndex = getRowIndex(event) - 1;
    if (getElementsByOjName("ERR_CODE")[selectedIndex].value == 'OL-OVD-01') {
        fnSubScreenMain('OLDOVDEF', 'OLDOVDEF', 'CVS_ROLE', false);
    }
    return true;
}

function EnableControls() {
    disableForm();
    //var tableRef = document.getElementById('BLK_OVD'); //Bug#34958820
	var tableRef = getTableObjForBlock('BLK_OVD'); //Bug#34958820
    var noOfRows = tableRef.tBodies[0].rows;
    for (rowIndex = 0;rowIndex < noOfRows.length;rowIndex++) {
        fnEnableElement(getElementsByOjName("OVD_STATUS")[rowIndex]);
        fnEnableElement(getElementsByOjName("REMARKS")[rowIndex]);
        fnDisableElement(getElementsByOjName("MAKER_ID")[rowIndex]);
        fnEnableElement(tableRef.tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0]);
    }
    fnEnableElement(getElementsByOjName("BTN_ROLE")[0]);
    fnEnableElement(getElementsByOjName("BTN_CONTRACT")[0]);
    return true;
}

function getCurrentRowIndex(dataBlock) {
    selectedIndex = '';
    //var TableObj = document.getElementById(dataBlock); //Bug#34958820
	var TableObj = getTableObjForBlock(dataBlock); //Bug#34958820
    for (i = 0;i < TableObj.tBodies[0].rows.length;i++) {
        if (TableObj.tBodies[0].rows[i].cells[0].getElementsByTagName('INPUT')[0].value == true) {
            selectedIndex = i;
        }
    }
    return true;
}

function fnPostFocus_KERNEL() {
    len = getTableObjForBlock("BLK_OVD").tBodies[0].rows.length;
    for (i = 0;i < len;i++) {
        fnEnableElement(getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[10].getElementsByTagName("oj-input-text")[0])
        fnEnableElement(getElementsByOjName("REMARKS")[i]);
    }
    return true;
}

function fnPostNavigate_BLK_OVD_KERNEL(args) {
    EnableControls()
    //var tableRef = document.getElementById('BLK_OVD'); //Bug#34958820
	var tableRef = getTableObjForBlock('BLK_OVD'); //Bug#34958820
    var noOfRows = tableRef.tBodies[0].rows;
    for (rowIndex = 0;rowIndex < noOfRows.length;rowIndex++) {
        getElementsByOjName("OVD_STATUS")[rowIndex].value = 'A';
    }
    return true;
}

function fnPostRow_onClick_BLK_ROLE_KERNEL() {
    fnCheck();
    fnmodify();
    return true;
}

function fnmodify() {
    fnDisableElement(document.getElementById("BLK_ROLE_CHK_ME"));
    fnEnableElement(getElementsByOjName("BTN_OK")[0]);
    var detailObj = selectNodes(dbDataDOM, "//BLK_ROLE");
    var rowsRole = detailObj.length;
    var tObject = getTableObjForBlock("BLK_ROLE").tBodies[0];
    var rows = tObject.rows;
    for (var i = 0;i < rows.length;i++) {
        fnDisableElement(tObject.rows[i].cells[0].getElementsByTagName("INPUT")[0]);
        for (var j = 0;j < rowsRole;j++) {
            if ((getElementsByOjName("AUTH_LEVEL")[i].value == getNodeText(selectSingleNode(detailObj[j], "AUTH_LEVEL"))) && (getElementsByOjName("CONTRACT_REF_NO")[i].value == getNodeText(selectSingleNode(detailObj[j], "CONTRACT_REF_NO")))) {
                if (getElementsByOjName("EVENT_SEQ_NO")[i].value == getNodeText(selectSingleNode(detailObj[j], "EVENT_SEQ_NO"))) {
                    setNodeText(selectNodes(dbDataDOM, "//BLK_ROLE/PRIMARY_PATH")[j], 'N');
                    setNodeText(selectNodes(dbDataDOM, "//BLK_ROLE/ALTERNATE_PATH")[j], 'N');
                    if (getNodeText(selectSingleNode(detailObj[j], "PRIMARY_ALLOWED")) == "Y")
                        fnEnableElement(tObject.rows[i].cells[2].getElementsByTagName("oj-input-text")[0]);
                    if (getNodeText(selectSingleNode(detailObj[j], "ALTERNATE_ALLOWED")) == "Y")
                        fnEnableElement(tObject.rows[i].cells[4].getElementsByTagName("oj-input-text")[0]);
                }
            }
        }
    }
    fnEnableElement(getElementsByOjName("BTN_OK")[0]);
    return true;
}

function fnupdateSubScreen(e) {
    fnEnableElement(getElementsByOjName("BTN_ROLE")[0]);
    fnEnableElement(getElementsByOjName("BTN_OK")[0]);
    return true;
}

function fnShowdata(event) {
    fnmodify(event);
    return true;
}

function fnCheck() {
    len = getTableObjForBlock("BLK_ROLE").tBodies[0].rows.length;
    msob_tchk = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("BLK_ROLE").tBodies[0].rows[i].cells[2].getElementsByTagName("oj-input-text")[0]) {
            if (getTableObjForBlock("BLK_ROLE").tBodies[0].rows[i].cells[2].getElementsByTagName("oj-input-text")[0].value) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }
            if (getTableObjForBlock("BLK_ROLE").tBodies[0].rows[i].cells[4].getElementsByTagName("oj-input-text")[0].value) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }
        }
        else 
            break;
    }

    if (msob_tchk > 1) {
        showErrorAlerts('IN-HEAR-283');
        return false;
    }
    return true;
}

function fnPostRow_onClick_BLK_GRID() {
    len = getTableObjForBlock("BLK_OVD").tBodies[0].rows.length;
    msob_tchk = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }

        }
        else 
            break;
    }
    if (msob_tchk == 1) {
        fnEnableElement(getElementsByOjName("BTN_ROLE")[0]);
        return true;
    }
    if (msob_tchk > 1) {
        fnDisableElement(getElementsByOjName("BTN_ROLE")[0]);
        return true;
    }
    return true;
}

function fnPreLoad_CVS_ROLE_KERNEL() {
    var tObject = getTableObjForBlock("BLK_OVD").tBodies[0];
    var rows = tObject.rows;
    screenArgs['CONTRACT_REF'] = tObject.rows[selectedIndex].cells[1].getElementsByTagName('INPUT')[0].value;
    screenArgs['BRANCH'] = tObject.rows[selectedIndex].cells[18].getElementsByTagName('INPUT')[0].value;
    screenArgs['PENDING_LEVELS'] = tObject.rows[selectedIndex].cells[7].getElementsByTagName('INPUT')[0].value;
    screenArgs['MAKER'] = tObject.rows[selectedIndex].cells[11].getElementsByTagName('INPUT')[0].value;
    screenArgs['FUNCTION'] = tObject.rows[selectedIndex].cells[19].getElementsByTagName('INPUT')[0].value;
    screenArgs['POSTDATE'] = tObject.rows[selectedIndex].cells[20].getElementsByTagName('INPUT')[0].value;
    parent.screenArgs = screenArgs;
    return true;
}

function fnPostLoad_CVS_ROLE_KERNEL() {
    getElementsByOjName("BTN_ROLE")[0].style.visibility = "hidden";
    document.getElementById("BLK_ROLE_HEAD__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF'];
    document.getElementById("BLK_ROLE_HEAD__BRANCH_CODE").value = parent.screenArgs['BRANCH'];
    document.getElementById("BLK_ROLE_HEAD__PENDING_APPROVALS").value = parent.screenArgs['PENDING_LEVELS'];
    document.getElementById("BLK_ROLE_HEAD__MAKER").value = parent.screenArgs['MAKER'];
    document.getElementById("BLK_ROLE_HEAD__FUNCTION_ID").value = parent.screenArgs['FUNCTION'];
    document.getElementById("BLK_ROLE_HEAD__POSTING_DATE").value = parent.screenArgs['POSTDATE'];
    fnmodify();
    return true;
}

function fnPostFocus_KERNEL() {
    DisableToolbar_buttons("Authorize");
    len = getTableObjForBlock("BLK_OVD").tBodies[0].rows.length;
    for (i = 0;i < len;i++) {
        fnEnableElement(getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[10].getElementsByTagName("oj-input-text")[0])
        fnEnableElement(getElementsByOjName("REMARKS")[i]);
    }
    return true;
}

function fnCheckClk() {
    len = getTableObjForBlock("BLK_OVD").tBodies[0].rows.length;
    msob_tchk = 0;

    for (i = 0;i < len;i++) {
    //Bug#34958820 changes starts
       // if (getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]) {
       // if (getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].value) {
		var isChkd = getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked;
		if(isChkd){
   //Bug#34958820 changes ends
                msob_tchk = msob_tchk + 1;
                selected_row = i;
                getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[17].getElementsByTagName("oj-input-text")[0].value = "Y";
            }
            else {
                getTableObjForBlock("BLK_OVD").tBodies[0].rows[i].cells[17].getElementsByTagName("oj-input-text")[0].value = "N";
            }
        } 
 //   }  //Bug#34958820 code added
    if (msob_tchk == 0) {
        showErrorAlerts('IN-HEAR-206');
        return false;
    }
    return true;
}

function fnAuthClick(event) {
    g_prev_gAction = gAction;
    gAction = 'AUTH';
    if (fnCheckClk()) {

    }
    appendData(document.getElementById('TBLPageAll'));
    doAction('Authorize', event);
    //gAction = g_prev_gAction;
    return true;
}