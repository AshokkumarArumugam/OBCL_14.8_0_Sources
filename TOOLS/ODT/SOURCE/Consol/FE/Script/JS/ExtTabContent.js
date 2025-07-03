/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : ExtTabContent.js
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

var strCurrentTabId = "";
var xmlFileName = "";
var strScreenName = "CVS_MAIN"
var previoustab = "";
var prevTab = "";
var gAction = "";
var strTheme = "";
var viewModeAction = "";
var dbDataDOM = "";

function fnShowROSelectValue(selectObject) {
    for (var i = 0;i < selectObject.options.length;i++) {
        if (selectObject.options[i].selected) {
            getNextSibling(getNextSibling(selectObject.parentNode)).value = getInnerText(selectObject.options[i]);
            break;
        }
    }
}

function setValueOfTextBox(innerHTML, ele) {
    return innerHTML;
}

function showTabData(objName) {
    isformat = false;
    if (dbDataDOM == null) {
        return;
    }

    //Ashok Commenetd this as part of 12.0.2, not used.            
    //buildIsQuery();
    //buildIsControl();
    var tabObject = document.getElementById("TBLPage" + objName);

    if (tabObject.innerHTML == "") {
        if (typeof (xmlFileName) != 'undefined') {
            var html = ShowXMLTab(xmlFileName, 'ExtDetailTab.xsl', strScreenName, objName);
            //debugs("tabsContent=", html);
            if (window.ActiveXObject) {
                tabObject.innerHTML = html;
            }
            else {
                tabObject.appendChild(html);
            }
        }
        fnBuildMultipleEntryArray(objName);
    }
    var fldSetList = tabObject.getElementsByTagName("fieldset");
    //showFldsetData(fldSetList);
}

// copy from infra
var gcNAV_FIRST = 0;
var gcNAV_PREVIOUS = 1;
var gcNAV_GOTO = 2;
var gcNAV_NEXT = 3;
var gcNAV_LAST = 4;
var gcNUM_NAV_BUTTONS = 5;
var tab_arr = new Array();
var tab_ids = new Array();
var tablist_curr_id = 0;
var funcErrList = new Array();
var checkViewMode = false;
var gSeparator = ",";
var parentWinParams = new Object();
var isAutoLOVOpened = false;
var alertAction = "";
var customAlertAction = "";
var fileNameArray = new Array();
var attachmentData = new Array();
var isAlertOpen = false;//9NT1490_11.4P01_SFR#13803679  //FCUBS_12.0_PS_01 
/* variables required for focusing on particular elements after closing alerts */
var focusReqd = true;
var focusField = null;

var multiBrnScrOpened = false;

function fnChangeLabelToText(type, obj) {
    var elements;
    if (typeof (obj) != "undefined") {
        elements = obj.getElementsByTagName(type);
    }
    else {
        elements = document.getElementById('ResTree').getElementsByTagName(type);
    }
    for (var loopIndex = 0;loopIndex < elements.length;loopIndex++) {
        var object = elements[loopIndex];
        if (!object.getAttribute("oldInnerHTML"))
            continue;
        else {
            var oldInnerHTML = object.getAttribute("oldInnerHTML");
            var parentDIV = object.parentNode;
            var labelElements = parentDIV.getElementsByTagName("TEXTAREA");
            for (var cnt = 0;cnt < labelElements.length;cnt++) {
                if (!labelElements[cnt].getAttribute("oldInnerHTML")) {
                    continue;
                }
                else {
                    var tempId = labelElements[cnt].id;
                    setOuterHTML_TXADisp(labelElements[cnt], oldInnerHTML);
                    if (tempId != "" && tempId != "undefined") {
                        var tempObject = document.getElementById(tempId);
                        if (tempObject) {
                            if (tempObject.value == "") {
                                if (tempObject.getAttribute("DEFAULT")) {
                                    tempObject.value = tempObject.getAttribute("DEFAULT");
                                }
                            }
                        }
                    }
                    loopIndex--;
                    break;
                }
            }
            if (gAction == "NEW" || gAction == "ENTERQUERY") {
                if (parentDIV.getElementsByTagName("INPUT")[0])
                    parentDIV.getElementsByTagName("INPUT")[0].value = "";
            }
        }
    }
}

function resetAllElements(type, obj) {
    var elements;
    if (typeof (obj) != "undefined") {
        elements = obj.getElementsByTagName(type);
    }
    else {
        elements = document.getElementById('ResTree').getElementsByTagName(type);
    }
    for (var loopIndex = 0;loopIndex < elements.length;loopIndex++) {
        var tmpElem = elements[loopIndex];
        if (tmpElem.tagName.toUpperCase() == 'INPUT') {
            if (tmpElem.type.toUpperCase() == 'TEXT' || tmpElem.type.toUpperCase() == 'HIDDEN' || tmpElem.type.toUpperCase() == 'PASSWORD') {
                if (tmpElem.getAttribute("DEFAULT"))
                    tmpElem.value = tmpElem.getAttribute("DEFAULT");
                else 
                    tmpElem.value = "";
            }
            if (tmpElem.type.toUpperCase() == 'CHECKBOX') {
                if (tmpElem.getAttribute("DEFAULT") == 'yes')
                    tmpElem.checked = true;
                else 
                    tmpElem.checked = false;
            }
            if (tmpElem.type.toUpperCase() == 'RADIO') {
                var elemName = tmpElem.name;
                if (elemName) {
                    var radioElem = document.getElementsByName(elemName);
                    if (radioElem.length > 0) {
                        for (var elemCnt = 0;elemCnt < radioElem.length;elemCnt++) {
                            if (radioElem[elemCnt].getAttribute("DEFAULT") == 'yes') {
                                radioElem[elemCnt].checked = true;
                                break;
                            }
                        }
                    }
                    else {
                        radioElem.checked = false;
                    }
                }
                else {
                    tmpElem.checked = false;
                }
            }
        }
        if (tmpElem.tagName.toUpperCase() == 'SELECT') {
            var selOptions = tmpElem.options;
            var anySelected = false;
            for (var optnCnt = 0;optnCnt < selOptions.length;optnCnt++) {
                if (selOptions[optnCnt].getAttribute("DEFAULT") || selOptions[optnCnt].getAttribute("DEFAULT") == "") {
                    anySelected = true;
                    tmpElem.value = selOptions[optnCnt].getAttribute("DEFAULT");
                }
            }
            if (!anySelected) {
                if (selOptions.length != 0)
                    tmpElem.value = selOptions[0].value;
            }
        }
        if (tmpElem.tagName.toUpperCase() == 'TEXTAREA') {
            if (tmpElem.getAttribute("DEFAULT"))
                tmpElem.value = tmpElem.getAttribute("DEFAULT");
            else 
                tmpElem.value = "";
        }
    }
}

function fnEnablePKOnlyFields() {
    for (var loopIndex = 0;loopIndex < pkFields.length;loopIndex++) {
        var CurrentPK = pkFields[loopIndex];
        var currObject = document.getElementById(CurrentPK);
        if (currObject && getCurrentStyle(currObject, "visibility").toUpperCase() == "HIDDEN")
            continue;
        var objType = currObject.getAttribute("type");
        var type = "";
        if (objType != undefined && objType != null)
            type = objType.toUpperCase();
        if (type == "HIDDEN") {
            currObject = document.getElementById(CurrentPK + "I");
            if (currObject != null) {
                fnEnableElement(document.getElementById(CurrentPK + "I"));
                document.getElementById(CurrentPK + "I").readOnly = false;
            }
            else 
                continue;
        }
        else {
            var l_FieldType = "";
            if (currObject)
                l_FieldType = currObject.getAttribute("type");
            l_FldDataType = currObject.getAttribute("data_type");
            if (l_FldDataType && l_FldDataType.toUpperCase() == "DATE") {
                getNextSibling(document.getElementById(CurrentPK + "I")).disabled = false;
            }
            if (l_FieldType && l_FieldType.toUpperCase() == "RADIO") {
                var l_FieldName = "";
                l_FieldName = currObject.name
                var l_RdoFlds = document.getElementsByName(l_FieldName);
                for (var l_Cnt = 0;l_Cnt < l_RdoFlds.length;l_Cnt++) {
                    fnEnableElement(l_RdoFlds[l_Cnt]);
                    l_RdoFlds[l_Cnt].readOnly = false;
                }
                //for
            }
            //if Radio                
            if (mainWin.applicationName == "FCIS" && CurrentPK.indexOf("AUTH_STAT") !=  - 1) {
                document.getElementById(CurrentPK).disabled = false;
            }
            else 
                fnEnableElement(document.getElementById(CurrentPK));
            if ((document.getElementById(CurrentPK).getAttribute("READONLY1")) && gAction == "ENTERQUERY")
                document.getElementById(CurrentPK).readOnly = false;
            else 
                document.getElementById(CurrentPK).readOnly = false;
        }
    }
}

function fnSetFocusOnMasterPKField() {
    if (pkFields && pkFields.length > 0) {
        var l_SortedPkFlds = fnGetPkFieldOrderby_TabIdx();
        for (var l_PkCount = 0;l_PkCount < l_SortedPkFlds.length;l_PkCount++) {
            var l_PkElement = document.getElementById(l_SortedPkFlds[l_PkCount]);
            var l_PkElement_Misc = document.getElementById(l_SortedPkFlds[l_PkCount] + "I");
            if (l_PkElement_Misc != null)
                l_PkElement = l_PkElement_Misc;
            try {
                if (l_PkElement) {
                    if ((l_PkElement.className && l_PkElement.className.toUpperCase() == "HIDDEN") || l_PkElement.type.toUpperCase() == "HIDDEN" || getCurrentStyle(l_PkElement, "visibility").toUpperCase() == "HIDDEN" || l_PkElement.readOnly == true || l_PkElement.disabled == true) {
                        if ((l_PkCount == l_SortedPkFlds.length - 1) && (document.getElementById("BTN_EXIT"))) {
                            document.getElementById("BTN_EXIT_IMG").focus();
                        }
                        continue;
                    }
                    else {
                        if (l_PkElement.type.toUpperCase() != "RADIO") {
                            l_PkElement.focus();
                            return;
                        }
                        if (l_PkElement.type.toUpperCase() == "RADIO") {
                            fnEnableRadioField(l_PkElement);
                            return;
                        }
                    }
                }
            }
            catch (e) {
            }
        }
    }
    //if  
}
//fnc 
function fnEnableRadioField(v_PkElement) {
    var l_FldName = v_PkElement.name;
    var l_RDOFlds = document.getElementsByName(l_FldName);
    if (l_RDOFlds.length > 0)
        l_RDOFlds[0].focus();
}

function fnGetPkFieldOrderby_TabIdx() {
    var count = 0;
    var l_PkFieldSoretedArr = new Array();
    for (var l_Itr = 0;l_Itr < pkFields.length;l_Itr++)
        l_PkFieldSoretedArr[l_Itr] = pkFields[l_Itr];
    for (var l_TabCnt = 0;l_TabCnt < l_PkFieldSoretedArr.length;l_TabCnt++) {
        var l_TbIdxTemp = document.getElementById(l_PkFieldSoretedArr[l_TabCnt]).tabIndex;
        if (isNaN(parseInt(l_TbIdxTemp)) || parseInt(l_TbIdxTemp) == 0) {
            return l_PkFieldSoretedArr;
        }
    }
    for (var l_Cnt = 0;l_Cnt < l_PkFieldSoretedArr.length;l_Cnt++) {
        var l_OuterPkField = document.getElementById(l_PkFieldSoretedArr[l_Cnt]);
        var l_TabIdxOuter = l_OuterPkField.tabIndex;
        for (Idx = 0;Idx < l_PkFieldSoretedArr.length;Idx++) {
            var l_InnerPkField = document.getElementById(l_PkFieldSoretedArr[Idx]);
            var l_TabIdxInner = l_InnerPkField.tabIndex;
            if (parseInt(l_TabIdxOuter) <= parseInt(l_TabIdxInner)) {
                var l_Temp = l_PkFieldSoretedArr[l_Cnt];
                l_PkFieldSoretedArr[l_Cnt] = l_PkFieldSoretedArr[Idx];
                l_PkFieldSoretedArr[Idx] = l_Temp;
                count++;
            }
        }
        //For Inner    
    }
    //for Outer         
    return l_PkFieldSoretedArr;
}

function fnSetFocusOnQueryField() {
    if (queryAmendArr && queryAmendArr.length > 0) {
        var l_SortedQryFlds = fnGetQryFieldOrderby_TabIdx();
        for (var l_QryCount = 0;l_QryCount < l_SortedQryFlds.length;l_QryCount++) {
            var l_QryElement = document.getElementById(l_SortedQryFlds[l_QryCount]);
            var l_QryElement_Misc = document.getElementById(l_SortedQryFlds[l_QryCount] + "I");
            if (l_QryElement_Misc != null)
                l_QryElement = l_QryElement_Misc;
            try {
                if (l_QryElement) {
                    if ((l_QryElement.className && l_QryElement.className.toUpperCase() == "HIDDEN") || l_QryElement.tagName.toUpperCase() == "HIDDEN" || getCurrentStyle(l_QryElement, "visibility").toUpperCase() == "HIDDEN" || l_QryElement.readOnly == true || l_QryElement.disabled == true) {
                        if ((l_QryCount == l_SortedQryFlds.length - 1) && (document.getElementById("BTN_EXIT"))) {
                            if (queryAmendArr.length == 0)
                                document.getElementById("BTN_EXIT_IMG").focus();
                            else 
                                fnSetFocusOnQueryField();
                        }
                        continue;
                    }
                    else {
                        if (l_QryElement.type.toUpperCase() != "RADIO") {
                            l_QryElement.focus();
                            return;
                        }
                        if (l_QryElement.type.toUpperCase() == "RADIO") {
                            fnEnableRadioField(l_QryElement);
                            return;
                        }
                    }
                }
            }
            catch (e) {
            }
        }
    }
}

function fnGetQryFieldOrderby_TabIdx() {
    var count = 0;
    var l_QryFieldSoretedArr = new Array();
    for (var l_Itr = 0;l_Itr < queryAmendArr.length;l_Itr++)
        l_QryFieldSoretedArr[l_Itr] = queryAmendArr[l_Itr];
    for (var l_TabCnt = 0;l_TabCnt < l_QryFieldSoretedArr.length;l_TabCnt++) {
        if (document.getElementById(l_QryFieldSoretedArr[l_TabCnt])) {
            var l_TbIdxTemp = document.getElementById(l_QryFieldSoretedArr[l_TabCnt]).tabIndex;
            if (isNaN(parseInt(l_TbIdxTemp)) || parseInt(l_TbIdxTemp) == 0) {
                return l_QryFieldSoretedArr;
            }
        }
    }
    for (var l_Cnt = 0;l_Cnt < l_QryFieldSoretedArr.length;l_Cnt++) {
        var l_OuterQryField = document.getElementById(l_QryFieldSoretedArr[l_Cnt]);
        if (l_OuterQryField) {
            var l_TabIdxOuter = l_OuterQryField.tabIndex;
            for (Idx = 0;Idx < l_QryFieldSoretedArr.length;Idx++) {
                var l_InnerQryField = document.getElementById(l_QryFieldSoretedArr[Idx]);
                if (l_InnerQryField)
                    var l_TabIdxInner = l_InnerQryField.tabIndex;
                if (parseInt(l_TabIdxOuter) <= parseInt(l_TabIdxInner)) {
                    var l_Temp = l_QryFieldSoretedArr[l_Cnt];
                    l_QryFieldSoretedArr[l_Cnt] = l_QryFieldSoretedArr[Idx];
                    l_QryFieldSoretedArr[Idx] = l_Temp;
                    count++;
                }
            }
            //For Inner    
        }
    }
    //for Outer         
    return l_QryFieldSoretedArr;
}

function validateRestrictedTextValue(elem) {
    if (gAction == 'QUERY' || gAction == 'EXECUTEQUERY' || gAction == 'ENTERQUERY' || gAction == "") {
        if (/[^A-z|0-9|%]/.test(elem.value)) {
            elem.value = "";
            alert(mainWin.getItemDesc("LBL_SPECIAL_CHAR_NOT_ALLOWED"));
            elem.focus();
            return;
        }
    }
    else {
        if (/[^A-z|0-9]/.test(elem.value)) {
            elem.value = "";
            alert(mainWin.getItemDesc("LBL_SPECIAL_CHAR_NOT_ALLOWED"));
            elem.focus();
            return;
        }
    }
}

function enableForm(obj) {

    if (typeof (obj) != "undefined") {
        fnChangeLabelToText("TEXTAREA", obj);
        enableAllElements("INPUT", obj);
        enableAllElements("BUTTON", obj);
        enableAllElements("SELECT", obj);
        enableAllElements("TEXTAREA", obj);
    }
    else {
        fnChangeLabelToText("TEXTAREA");
        enableAllElements("INPUT");
        enableAllElements("BUTTON");
        enableAllElements("SELECT");
        enableAllElements("TEXTAREA");
    }
}

function fnValidateOnF8(event) {
    var event = window.event || event;
    var elem = getEventSourceElement(event);
    if (elem) {
        var elemName = elem.name;
        if (elemName) {
            if (getPreviousSibling(elem)) {
                if (getPreviousSibling(getPreviousSibling(elem))) {
                    if (getPreviousSibling(getPreviousSibling(elem)).name) {
                        if (getPreviousSibling(getPreviousSibling(elem)).name == elemName.substring(0, elemName.length - 1)) {
                            if (elem.blur) {
                                if (getOuterHTML(elem).indexOf("validateInputAmount") > 0 || getOuterHTML(elem).indexOf("validateInputNumber") > 0 || getOuterHTML(elem).indexOf("validateInputValue") > 0) {
                                    if (!fireHTMLEvent(elem, "onblur", event))
                                        return false;
                                }
                                //fix for 14765267 starts
                                else {
                                    if (getOuterHTML(elem).indexOf("fnToUppercase(this, event)") > 0) {
                                        fnToUppercase(elem, event);
                                    }
                                }
                                //fix for 14765267 ends
                            }
                        }
                    }
                }
            }
        }
        if (elem.blur) {
            if (getOuterHTML(elem).indexOf("validateInputAmount") > 0 || getOuterHTML(elem).indexOf("validateInputNumber") > 0 || getOuterHTML(elem).indexOf("validateInputValue") > 0) {
                if (!fireHTMLEvent(elem, "onblur", event))
                    return false;
            }
            //fix for 14765267 starts
            else {
                if (getOuterHTML(elem).indexOf("fnToUppercase(this, event)") > 0) {
                    fnToUppercase(elem, event);
                }
            }
            //fix for 14765267 ends
        }
    }
    return true;
}

function fnEnableBlockCheckBox() {
    var CurrentMultipleBlock;
    if (multipleEntryIDs.length > 0) {
        for (var idIndex = 0;idIndex < multipleEntryIDs.length;idIndex++) {
            CurrentMultipleBlock = getTableObjForBlock(multipleEntryIDs[idIndex]);
            if (document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[idIndex])[0]) {
                fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[idIndex])[0]);
            }
            if (CurrentMultipleBlock) {
                fnEnableElement(CurrentMultipleBlock.tHead.rows[1].cells[0].getElementsByTagName("INPUT")[0]);
                var tableSize = CurrentMultipleBlock.tBodies[0].rows.length;
                for (var rowIndex = 0;rowIndex < tableSize;rowIndex++) {
                    var currentRow = CurrentMultipleBlock.tBodies[0].rows[rowIndex];
                    fnEnableElement(currentRow.cells[0].getElementsByTagName("INPUT")[0]);
                }
            }
        }
    }
}

function fnGetSubScreenTitle(xmlFile, scrnName) {
    if (getXMLString(loadXMLFile(xmlFile)) == "") {
        return "";
    }
    else {
        var xmlDoc = loadXMLFile(xmlFile);
        var screenNode = selectSingleNode(xmlDoc, "//SCREEN[@NAME='" + scrnName + "']/@TITLE");
        if (screenNode) {
            return getNodeText(screenNode);
        }
        else {
            return "";
        }
    }
}

function fnSetReferenceFiledValueAsDefaultVal(rowCell) {
    var refField = "";
    if (rowCell.getElementsByTagName("INPUT")[0] != undefined)
        refField = rowCell.getElementsByTagName("INPUT")[0].getAttribute("REF_FIELD");
    else if (rowCell.getElementsByTagName("CHECKBOX")[0] != undefined)
        refField = rowCell.getElementsByTagName("CHECKBOX")[0].getAttribute("REF_FIELD");
    else if (rowCell.getElementsByTagName("SELECT")[0] != undefined)
        refField = rowCell.getElementsByTagName("SELECT")[0].getAttribute("REF_FIELD");
    if (refField != null) {
        if (refField != "")
            rowCell.getElementsByTagName("INPUT")[0].value = document.getElementById(refField).value;
    }
}

function cursorEOT(isField) {
    isRange = isField.createTextRange();
    isRange.move('textedit');
    isRange.select();
    testOverflow = isField.scrollTop;
    if (testOverflow != 0) {
        return true
    }
    else {
        return false
    }
}

function adjustRows(isField) {
    var TEXTAREA_LINE_HEIGHT = 13;
    var textarea = isField;
    var newHeight = 0;
    var prevScrollHeight = 0;
    while ((newHeight = textarea.scrollHeight) != prevScrollHeight) {
        prevScrollHeight = newHeight;
        var currentHeight = textarea.clientHeight;
        if (newHeight > currentHeight) {
            textarea.style.height = newHeight - 0.1 * TEXTAREA_LINE_HEIGHT + 'px';
        }
    }
}

function toggleSelectBoxes(tableDivContainer, tableHeader) {
    if (!tableDivContainer || !tableHeader) {
        return;
    }
    var selectBoxes = tableDivContainer.getElementsByTagName('select');
    if (!selectBoxes) {
        return;
    }
    for (var i = 0;i < selectBoxes.length;i++) {
        if (tableDivContainer.scrollTop > eval(selectBoxes[i].parentNode.offsetTop - tableHeader.offsetHeight)) {
            selectBoxes[i].style.visibility = 'hidden';
        }
        else {
            selectBoxes[i].style.visibility = 'visible';
        }
    }
}

function replaceAllChar(str, searchChar, replaceChar) {
    var retStr = "";
    for (var loopIndex = 0;loopIndex < str.length;loopIndex++) {
        if (str.substr(loopIndex, 1) == searchChar)
            retStr += replaceChar;
        else 
            retStr += str.substr(loopIndex, 1);
    }
    return retStr;
}

function isNumericValidation(AStr) {
    if (typeof (gSummaryOpened) != 'undefined' && gSummaryOpened)
        inTheStr = "1234567890.-,%";
    else 
        inTheStr = "1234567890.-,";
    tempChar = "";
    if (getLength(trim(AStr)) <= 0)
        return true;
    for (i = 0;i < AStr.length;i++) {
        if (AStr.charAt(i) != 0) {
            tempChar = AStr.charAt(i);
            if ((inTheStr.indexOf(tempChar)) < 0) {
                return false;
            }
        }
    }
    return true;
}

function disableTabs(idTabs, strSeparator) {
    if (arguments.length < 2) {
        strSeparator = gSeparator;
    }
    setTabDisabledProp(idTabs, strSeparator, true);
}

function enableTabs(idTabs, strSeparator) {
    if (arguments.length < 2) {
        strSeparator = gSeparator;
    }
    setTabDisabledProp(idTabs, strSeparator, false);
}

function setTabDisabledProp(idTabs, strSeparator, styleValue) {
    var arrTabs = idTabs.split(strSeparator);
    for (var loopIndex = 0;loopIndex < arrTabs.length;loopIndex++) {
        if (arrTabs[loopIndex] != null && arrTabs[loopIndex] != "") {
            var elem = document.getElementById(arrTabs[loopIndex]);
            elem.disabled = styleValue;
            elem.parentNode.disabled = styleValue;
            if (styleValue) {
                if (elem.getAttribute("onblur")) {
                    elem.setAttribute("onblur_old", elem.getAttribute("onblur"));
                    elem.removeAttribute("onblur");
                }
                if (elem.getAttribute("onfocus")) {
                    elem.setAttribute("onfocus_old", elem.getAttribute("onfocus"));
                    elem.removeAttribute("onfocus");
                }
                if (elem.getAttribute("onmouseout")) {
                    elem.setAttribute("onmouseout_old", elem.getAttribute("onmouseout"));
                    elem.removeAttribute("onmouseout");
                }
                if (elem.getAttribute("onmouseover")) {
                    elem.setAttribute("onmouseover_old", elem.getAttribute("onmouseover"));
                    elem.removeAttribute("onmouseover");
                }
                if (elem.getAttribute("onclick")) {
                    elem.setAttribute("onclick_old", elem.getAttribute("onclick"));
                    elem.removeAttribute("onclick");
                }
                addEvent(elem, "class", "Htabdsb");
            }
            else {
                if (elem.getAttribute("onblur_old")) {
                    elem.setAttribute("onblur", elem.getAttribute("onblur_old"));
                    elem.removeAttribute("onblur_old");
                }
                if (elem.getAttribute("onfocus_old")) {
                    elem.setAttribute("onfocus", elem.getAttribute("onfocus_old"));
                    elem.removeAttribute("onfocus_old");
                }
                if (elem.getAttribute("onmouseout_old")) {
                    elem.setAttribute("onmouseout", elem.getAttribute("onmouseout_old"));
                    elem.removeAttribute("onmouseout_old");
                }
                if (elem.getAttribute("onmouseover_old")) {
                    elem.setAttribute("onmouseover", elem.getAttribute("onmouseover_old"));
                    elem.removeAttribute("onmouseover_old");
                }
                if (elem.getAttribute("onclick_old")) {
                    elem.setAttribute("onclick", elem.getAttribute("onclick_old"));
                    elem.removeAttribute("onclick_old");
                }
                addEvent(elem, "class", "Htaball");
            }
        }
    }
}

function fnGetRef(tagName, objElemRef) {
    while (objElemRef.tagName != tagName) {
        objElemRef = objElemRef.parentNode;
    }
    return objElemRef;
}

function fnSetFocusOnFirstEnabledField() {
    var textFields = document.getElementsByTagName("input");
    try {
        for (var fieldCount = 0;fieldCount < textFields.length;fieldCount++) {
            var textField = textFields[fieldCount];
            if (textField.type.toUpperCase() == "TEXT" && (!textField.readOnly)) {
                textField.focus();
                return;
            }
            else 
                continue;
        }
    }
    catch (e) {
        alert(e.message);
    }
}

function getCurrentRow(e) {
    var event = window.event || e;
    var objTR;
    if (event != null) {
        objTR = getEventSourceElement(event);
        try {
            while (objTR.tagName != "TR") {
                objTR = objTR.parentNode;
            }
        }
        catch (e) {
        }
    }
    return objTR;
}

function disableForm() {
    disableAllElements("INPUT");
    disableAllElements("BUTTON");
    disableAllElements("SELECT");
    disableAllElements("TEXTAREA");
    fnEnableBlockCheckBox();
    fnEnableSubSysButtons();
    if (document.getElementById('BTN_EXIT_IMG')) {
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
    }
}

function fnEnableSubSysButtons() {
    var subSysButtons = document.getElementById("DIVSubSystem");
    if (subSysButtons) {
        var subSysElem = subSysButtons.getElementsByTagName("A");
        for (var elemLength = 0;elemLength < subSysElem.length;elemLength++) {
            subSysElem[elemLength].disabled = false;
        }
    }
}

function fnDisableSubSysButtons() {
    var subSysButtons = document.getElementById("DIVSubSystem");
    if (subSysButtons) {
        var subSysElem = subSysButtons.getElementsByTagName("A");
        for (var elemLength = 0;elemLength < subSysElem.length;elemLength++) {
            subSysElem[elemLength].disabled = true;
        }
    }
}

function fnDisableElement(object) {
    if (object == null)
        return;
    if (object && object.style && (object.style.visibility.toUpperCase() == "HIDDEN" || object.className.toUpperCase() == "HIDDEN"))
        return;
    var type = object.type.toUpperCase();
    var tagName = object.tagName;
    if (object) {
        if (type == 'HIDDEN') {
            var indexDate = getOuterHTML(object).indexOf("displayDate");
            var indexAmount = getOuterHTML(object).indexOf("displayAmount");
            var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                var inputObj = getNextSibling(getNextSibling(object));
                if (inputObj) {
                    var entityDBC = object.getAttribute("DBC");
                    var entityDBT = object.getAttribute("DBT");
                    if (entityDBC) {
                        if (entityDBT) {
                            inputObj.readOnly = true;
                            inputObj.className = "TXTro";
                            if (indexDate > 0) {
                                if (getNextSibling(inputObj) && getNextSibling(getNextSibling(inputObj)))
                                    getNextSibling(getNextSibling(inputObj)).disabled = true;
                            }
                        }
                        else {
                        }
                    }
                }
            }
        }
        else {
            if (tagName == 'INPUT') {
                if (type == 'TEXT') {
                    if (getOuterHTML(object).indexOf("validateInputAmount") > 0 || getOuterHTML(object).indexOf("validateInputNumber") > 0) {
                        object.readOnly = true;
                        object.disabled = false;
                        object.className = "TXTro numeric";
                    }
                    else {
                        if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "DIVgrid" && object.parentNode.className != "Fleft") {
                            object.readOnly = true;
                            object.disabled = false;
                            object.className = "TXTro";
                        }
                    }
                    if (gAction == 'EXECUTEQUERY' || (viewModeAction && viewModeAction == true) || (gAction == "" && ShowSummary && ShowSummary == "TRUE") || gAction == "AUTHQUERY") {
                        if (object.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'TABLEFooter')
                            return;
                        var fieldValue = object.value;
                        var fieldId = object.id;
                        var fieldName = object.name;
                        var fleldDBC = object.getAttribute("DBC");
                        var fieldSize = object.getAttribute("size");
                        var parentDIV = object.parentNode;
                        var oldInnerHTML = getOuterHTML(parentDIV.getElementsByTagName("INPUT")[0]);
                        oldInnerHTML = setValueOfTextBox(oldInnerHTML, parentDIV.getElementsByTagName("INPUT")[0]);
                        var dNumber = getOuterHTML(object).indexOf("validateInputNumber");
                        var dAmount = getOuterHTML(object).indexOf("validateInputAmount");
                        if (fieldSize != "") {
                            if (fieldValue.length > fieldSize && fieldValue.length > 3 && dNumber < 0 && dAmount < 0) {
                                if (object.getAttribute("viewMode")) {
                                    if (getNextSibling(object)) {
                                        if (getNextSibling(object).tagName) {
                                            if (getNextSibling(object).tagName.toUpperCase() == 'BUTTON') {
                                                getNextSibling(object).disabled = true;
                                                if (getNextSibling(object).className != 'BUTTONMultiple') {
                                                    if (getNextSibling(object).className != 'BTNhide') {
                                                        getNextSibling(object).setAttribute("oldClassName", getNextSibling(object).className);
                                                        getNextSibling(object).className = 'BTNhide';
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    var textareaNode = document.createElement("TEXTAREA");
                                    textareaNode.setAttribute("id", fieldId);
                                    textareaNode.setAttribute("DBC", fleldDBC);
                                    addEvent(textareaNode, "class", "TXAro");
                                    textareaNode.setAttribute("name", fieldName);
                                    textareaNode.setAttribute("value", fieldValue);
                                    textareaNode.setAttribute("oldInnerHTML", oldInnerHTML);
                                    if (fieldValue.indexOf("<") !=  - 1) {
                                        var re = new RegExp('<', "g");
                                        fieldValue = fieldValue.replace(re, "&lt;");
                                    }
                                    else if (fieldValue.indexOf(">") !=  - 1) {
                                        var re = new RegExp('>', "g");
                                        fieldValue = fieldValue.replace(re, "&gt;");
                                    }
                                    textareaNode.innerHTML = fieldValue;
                                    parentDIV.getElementsByTagName("INPUT")[0].name = textareaNode.name;
                                    parentDIV.getElementsByTagName("INPUT")[0].value = textareaNode.value;
                                    var finalOuterHTML = getOuterHTML_TXADisp(textareaNode);
                                    if (finalOuterHTML.indexOf("<TEXTAREA") ==  - 1) {
                                        finalOuterHTML = finalOuterHTML.replace("<textarea", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
                                        finalOuterHTML = finalOuterHTML.replace("</textarea>", "</TEXTAREA>");
                                    }
                                    else {
                                        finalOuterHTML = finalOuterHTML.replace("<TEXTAREA", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
                                    }
                                    setOuterHTML_TXADisp(parentDIV.getElementsByTagName("INPUT")[0], finalOuterHTML);
                                    parentDIV.getElementsByTagName("TEXTAREA")[0].readOnly = true;
                                    adjustRows(parentDIV.getElementsByTagName("TEXTAREA")[0]);
                                    checkViewMode = true;
                                }
                            }
                        }
                    }
                }
                else if (type == "RADIO") {
                    object.disabled = true;
                }
                else if (type == "CHECKBOX") {
                    object.disabled = true;
                }
                else if (type == "PASSWORD") {
                    object.readOnly = true;
                    object.className = "TXTro";
                }
                else if (type == "BUTTON") {
                    object.disabled = true;
                }
                else if (type == "FILE") {
                    object.readOnly = true;
                    object.className = "TXTro";
                }
                else {
                    object.readOnly = true;
                }
            }
            else if (tagName == 'TEXTAREA') {
                object.readOnly = true;
                if (!object.getAttribute("oldInnerHTML")) {
                    object.className = "TXAro";
                }
                else {
                    object.setAttribute("onpropertychange", "", 0);
                    object.className = "TXAro";
                }
            }
            else if (tagName == 'BUTTON') {
                if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "DIVgrid" && object.parentNode.className != "Fleft") {
                    if (object.children[0]) {
                        if (object.children[0].className == 'IMGPopupEdit') {
                            object.disabled = false;
                        }
                        else {
                            object.disabled = true;
                        }
                    }
                    else {
                        object.disabled = true;
                    }
                }
                else if (object.name.indexOf("cmdAddRow_") !=  - 1 || object.name.indexOf("cmdDelRow_") !=  - 1 || object.name.indexOf("BTN_SINGLE_VIEW_") !=  - 1) {
                    object.disabled = true;
                    object.className = "BTNimgD";
                }
            }
            else if (tagName == 'SELECT') {
                object.disabled = true;
                object.className = "SELro";
            }
            else {
                object.disabled = true;
            }
        }
        var nextSibling = getNextSibling(object);
        if (nextSibling) {
            if (nextSibling.tagName) {
                if (nextSibling.tagName.toUpperCase() == 'BUTTON') {
                    if (nextSibling.name.indexOf("cmdAddRow_") !=  - 1 || nextSibling.name.indexOf("cmdDelRow_") !=  - 1 || nextSibling.name.indexOf("BTN_SINGLE_VIEW_") !=  - 1) {
                        nextSibling.disabled = true;
                        nextSibling.className = "BTNimgD";
                    }
                    if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "Fleft" && object.parentNode.className != "DIVgrid" && nextSibling.name != 'BTN_NEXT_VER' && object) {
                        if (object.parentNode.parentNode.parentNode.className != "DIVgrid") {
                            if (nextSibling.className != "BTNhide") {
                                nextSibling.setAttribute("oldClassName", getNextSibling(object).className);
                                nextSibling.className = 'BTNhide';
                            }
                        }
                    }
                }
            }
        }
        else if (getPreviousSibling(object)) {
            if (getPreviousSibling(object).tagName) {
                if (getPreviousSibling(object).tagName.toUpperCase() == 'BUTTON') {
                    if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "Fleft")
                        getPreviousSibling(object).disabled = true;
                    if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "Fleft" && object.parentNode.className != "DIVgrid" && getPreviousSibling(object).name != 'BTN_NEXT_VER' && object) {
                        if (object.parentNode.parentNode.parentNode.className != "DIVgrid") {
                            if (getPreviousSibling(object).className != "BTNhide") {
                                getPreviousSibling(object).setAttribute("oldClassName", getPreviousSibling(object).className);
                                getPreviousSibling(object).className = 'BTNhide';
                            }
                        }
                    }
                }
            }
        }
    }
    return;
}

function fnEnableElement(object) {
    if (object == null)
        return;
    if (object && object.style && object.style.visibility.toUpperCase() == "HIDDEN" && object.className.toUpperCase() == "HIDDEN")
        return;
    var type = object.type.toUpperCase();
    var tagName = object.tagName;
    if (object) {
        if (type == 'HIDDEN') {
            var entityName = object.name;
            var indexDate = getOuterHTML(object).indexOf("displayDate");
            var indexAmount = getOuterHTML(object).indexOf("displayAmount");
            var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                var entityDBC = object.getAttribute("DBC");
                var entityDBT = object.getAttribute("DBT");
                if (entityDBC) {
                    if (entityDBT) {
                        entityName = entityDBT + "__" + entityDBC + "I";
                        var nextSibling = getNextSibling(getNextSibling(object));
                        if (nextSibling) {
                            //if(nextSibling.id == entityName) {
                            if (nextSibling.name == object.name + "I") {
                                if (nextSibling.getAttribute("READONLY1")) {
                                    nextSibling.readOnly = true;
                                    nextSibling.className = "TXTro numeric";
                                }
                                else {
                                    nextSibling.disabled = false;
                                    nextSibling.readOnly = false;
                                    nextSibling.className = "TXTstd numeric";
                                }
                                if (indexDate > 0) {
                                    var nextSibling1 = getNextSibling(nextSibling);
                                    if (nextSibling1) {
                                        nextSibling1.className = "BTNimg";
                                        nextSibling1.disabled = false;
                                    }
                                }
                                var nextSibling1 = getNextSibling(nextSibling);
                                if (nextSibling1) {
                                    if (nextSibling1.tagName.toUpperCase() == "BUTTON") {
                                        nextSibling1.disabled = false;
                                        if (nextSibling1.className == 'BTNhide' && indexDate > 0)
                                            nextSibling1.className = getNextSibling(getNextSibling(object)).getAttribute("oldClassName");
                                        else 
                                            nextSibling1.className = nextSibling1.getAttribute("oldClassName");
                                    }
                                }
                            }
                        }
                    }
                    else {
                    }
                }
            }
        }
        else {
            if (tagName == 'INPUT') {
                if (type == 'TEXT') {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.readOnly = true;
                        if (getOuterHTML(object).indexOf("validateInputAmount") > 0 || getOuterHTML(object).indexOf("validateInputNumber") > 0) {
                            object.className = "TXTro numeric";
                        }
                        else {
                            object.className = "TXTro";
                        }

                    }
                    else {
                        if (getOuterHTML(object).indexOf("validateInputAmount") > 0 || getOuterHTML(object).indexOf("validateInputNumber") > 0) {
                            object.disabled = false;
                            object.readOnly = false;
                            object.className = "TXTstd numeric";
                        }
                        else if (object.id && object.id.indexOf("goto__") !=  - 1) {
                            object.readOnly = true;
                            object.className = "TXTro";
                        }
                        else {
                            object.disabled = false;
                            object.readOnly = false;
                            object.tabIndex = "0";
                            object.className = "TXTstd";
                        }
                    }
                }
                else if (type == "PASSWORD") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.readOnly = true;
                        object.className = "TXTro";
                    }
                    else {
                        object.disabled = false;
                        object.readOnly = false;
                        object.className = "TXTstd";
                    }
                }
                else if (type == "FILE") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.readOnly = true;
                        object.className = "TXTro";
                    }
                    else {
                        object.disabled = false;
                        object.readOnly = false;
                        object.className = "TXTstd";
                    }
                }
                else if (type == "RADIO") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.disabled = true;
                        object.readOnly = true;
                    }
                    else {
                        object.disabled = false;
                        object.readOnly = false;
                    }
                }
                else if (type == "CHECKBOX") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.disabled = true;
                        object.readOnly = true;
                    }
                    else {
                        object.disabled = false;
                        object.readOnly = false;
                    }
                }
                else {
                    object.disabled = false;
                }
            }
            else if (tagName == 'TEXTAREA') {
                object.readOnly = false;
                object.className = "TXAstd";
            }
            else if (tagName == 'SELECT') {
                if (object.getAttribute("READONLY1")) {
                    object.disabled = true;
                    object.className = "SELro";
                }
                else {
                    object.disabled = false;
                    object.className = "SELstd";
                }
            }
            else if (tagName == 'BUTTON') {
                if (object.name.indexOf("go__") != 0) {
                    if (object.name.indexOf("cmdAddRow_") !=  - 1 || object.name.indexOf("cmdDelRow_") !=  - 1 || object.name.indexOf("BTN_SINGLE_VIEW_") !=  - 1) {
                        object.disabled = false;
                        object.className = "BTNimg";
                    }
                    else {
                        object.disabled = false;
                    }
                }
                else {
                    object.disabled = false;
                }
            }
        }
        var nextSibling = getNextSibling(object);
        if (nextSibling) {
            if (nextSibling.tagName) {
                if (nextSibling.tagName.toUpperCase() == "BUTTON") {
                    if (nextSibling.name.indexOf("go__") != 0)
                        nextSibling.disabled = false;
                    if (nextSibling.className == 'BTNhide')
                        nextSibling.className = nextSibling.getAttribute("oldClassName");
                }
            }
        }
    }
    fnHover(object);
    return;
}

function fnHover(object) {
    var last_char = object.className.charAt(object.className.length - 1);
    if (last_char != "D" && last_char != "H") {
        if (object.tagName.toUpperCase() == "BUTTON" || object.type.toUpperCase() == "BUTTON") {
            object.onmouseover = function () {
                setHoverClass(object, object.className, 'onmouseover')
            }
            object.onblur = function () {
                setHoverClassOut(object, object.className, 'onblur')
            }
            object.onfocus = function () {
                setHoverClass(object, object.className, 'onfocus')
            }
            object.onmouseout = function () {
                setHoverClassOut(object, object.className, 'onmouseout')
            }
        }
    }
}

function setHoverClass(object, tempHover, event_type) {
    var last_char = object.className.charAt(object.className.length - 1);
    if (last_char != "H") {
        object.className = tempHover + 'H';
    }
}

function setHoverClassOut(object, tempHover, event_type) {
    var last_char = object.className.charAt(object.className.length - 1);
    if (last_char == "H") {
        object.className = object.className.substring(0, object.className.length - 1);
    }
}

function disableRowElements(row) {
    var numElem = row.children.length;
    var tmpElem;
    for (var loopIndex = 1;loopIndex < numElem;loopIndex++) {
        var lChildRow = row.children[loopIndex];
        for (lcount = 0;lcount < lChildRow.children.length;lcount++) {
            tmpElem = lChildRow.children[lcount];
            var queryMode = "";
            if (tmpElem.getAttribute("queryMode")) {
                queryMode = isNull(tmpElem.getAttribute("queryMode"));
            }
            switch (tmpElem.tagName.toUpperCase()) {
                case "BUTTON":
                case "SELECT":
                case "TEXTAREA":
                case "INPUT":
                    if (queryMode != 'E')
                        fnDisableElement(tmpElem);
                    break;
            }
        }
    }
}

function enableRowElements(row) {
    var numElem = row.children.length;
    var tmpElem;
    for (var loopIndex = 0;loopIndex < numElem;loopIndex++) {
        var lChildRow = row.children[loopIndex];
        for (lcount = 0;lcount < lChildRow.children.length;lcount++) {
            tmpElem = lChildRow.children[lcount];
            if (tmpElem.children[1] && tmpElem.children[1].type == "checkbox") {
                tmpElem = lChildRow.children[lcount].children[1];
            }
            var queryMode = "";
            if (tmpElem.getAttribute("queryMode")) {
                queryMode = isNull(tmpElem.getAttribute("queryMode"));
            }
            switch (tmpElem.tagName.toUpperCase()) {
                case "BUTTON":
                case "SELECT":
                    fnEnableElement(tmpElem);
                    break;
                case "TEXTAREA":
                case "INPUT":
                    fnEnableElement(tmpElem);
                    break;
            }
        }
    }
}

function ShowXML(xmlFile, xslName, scrnName) {
    var imagePath = 'Images/Ext' + strTheme.substring(0, strTheme.indexOf('.css'));
    var html;
    strScreenName = scrnName;
    var xmlDoc = loadXMLFile(xmlFile);
    if (scrnName != "CVS_ADVANCED") {
        g_scrType = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/@TMP_SCR_TYPE"));
        subScrHeaderTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/HEADER/TAB/@ID"));
        subScrBodyTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/BODY/TAB/@ID"));
    }
    else {
        g_scrType = "M";
    }
    if (mainWin.cacheContent == 'E') {
        try {
            html = mainWin.HTMLCache[functionId + scrnName + xslName].cloneNode(true);
        }
        catch (e) {
        }

        if (typeof (html) != 'undefined')
            return html;
    }
    var applicationName = mainWin.applicationName;
    var dispSize = mainWin.dispSize;
    var XslLabels = fnBuildXslLabels();
    var xslDoc = loadXSLFile(xslName);
    if (html == null || mainWin.cacheContent == 'D') {
        if (typeof (screenType) != "undefined") {
            if (screenType == "WB") {
                var xmlDoc = embeddcall(xmlDoc);
            }
            else {
                if (typeof (callformTabArray) != "undefined") {
                    for (var i in callformTabArray) {
                        xmlDoc = insertCallFormXmlToTab(xmlDoc, i, callformTabArray[i]);
                    }
                }
                if (functionId == "CSCFNUDF") {
                    xmlDoc = convertUDFToSE(xmlDoc);
                }
            }
        }
        var params = new Array();
        params["screen"] = scrnName;
        params["uiXML"] = uiXML;
        params["imgPath"] = imagePath;
        params["displaySize"] = dispSize;
        params["thirdChar"] = thirdChar;
        params["XslLabels"] = XslLabels;
        params["applicationName"] = applicationName;
        if (thirdChar == "S")
            params["functionId"] = parentFunc;
        else 
            params["functionId"] = functionId;
        params["CurTabId"] = subScrBodyTabId;
        try {
            getDashboardParams(params);
        }
        catch (e) {
        }
        html = transform(xmlDoc, xslDoc, params);
        try {
            if (mainWin.cacheContent == 'E') {
                mainWin.HTMLCache[functionId + scrnName + xslName] = html.cloneNode(true);
            }
        }
        catch (e) {
        }

        gXmlFileName = xmlFile;
        gScreenName = scrnName;
        gXslFileName = xslName;

    }
    return html;
}

function insertCallFormXmlToTab(currXmlDoc, callformInfo, callformName) {
    var callformXmlPath = mainWin.UIXmlPath + "/" + langCode + "/" + callformName + ".xml";
    var callformXmlDoc = loadXMLFile(callformXmlPath);
    var parentTabId = callformInfo.substring(callformInfo.lastIndexOf("__") + 2, callformInfo.length);
    var parentScrName = callformInfo.substring(0, callformInfo.lastIndexOf("__"));
    var callformSecNodes = selectNodes(callformXmlDoc, "//BODY/TAB/SECTION");
    var currSecNodes = selectNodes(currXmlDoc, "//SCREEN[@NAME='" + parentScrName + "']/BODY/TAB[@ID='" + parentTabId + "']/SECTION");
    for (var i = 0;i < currSecNodes.length;i++) {
        currSecNodes[i].parentNode.removeChild(currSecNodes[i]);
    }
    for (var j = 0;j < callformSecNodes.length;j++) {
        selectSingleNode(currXmlDoc, "//SCREEN[@NAME='" + parentScrName + "']/BODY/TAB[@ID='" + parentTabId + "']").appendChild(callformSecNodes[j]);
    }
    return currXmlDoc;
}

//Fix for 14321478 -UDF update issue starts
function convertUDFToSE(xmlDocUDF) {
    selectSingleNode(xmlDocUDF, "//FLDSET[@VIEW='ME'][@TYPE='ME']").setAttribute("HIDDEN", "Y");
    var udfStr = '<SECTION><PART WIDTH="100"><FLDSET VIEW="SE" TYPE="SE" INDEX=""><LBL>' + mainWin.getItemDesc("LBL_UDF_FLDSET") + '</LBL><BLOCK>BLK_UDF_DETAILS_VIEW</BLOCK><HREQ>0</HREQ>';
    if (dbDataDOM != null && selectNodes(dbDataDOM, "//BLK_UDF_DETAILS").length > 0) {
        var udfNodes = selectNodes(dbDataDOM, "//BLK_UDF_DETAILS");
        for (var i = 0;i < udfNodes.length;i++) {
            if (getNodeText(selectSingleNode(udfNodes[i], "DATATYP")) == "D") {
                udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL' + i + '</NAME><TYPE>DATE</TYPE><LBL>' + getNodeText(selectSingleNode(udfNodes[i], "FLDNAM")) + '</LBL><MAXLENGTH>11</MAXLENGTH><DTYPE>DATE</DTYPE><SIZE></SIZE><CHECKED>N</CHECKED><VALUE><![CDATA[' + getNodeText(selectSingleNode(udfNodes[i], "FLDVAL")) + ']]></VALUE>';
            }
            else if (getNodeText(selectSingleNode(udfNodes[i], "DATATYP")) == "N") {
                udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL' + i + '</NAME><TYPE>TEXT</TYPE><LBL>' + getNodeText(selectSingleNode(udfNodes[i], "FLDNAM")) + '</LBL><MAXLENGTH>150</MAXLENGTH><DTYPE>NUMBER</DTYPE><SIZE>20</SIZE><CHECKED>N</CHECKED><VALUE><![CDATA[' + getNodeText(selectSingleNode(udfNodes[i], "FLDVAL")) + ']]></VALUE>';
            }
            else {
                udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL' + i + '</NAME><TYPE>TEXT</TYPE><LBL>' + getNodeText(selectSingleNode(udfNodes[i], "FLDNAM")) + '</LBL><MAXLENGTH>150</MAXLENGTH><DTYPE>VARCHAR2</DTYPE><SIZE>20</SIZE><CHECKED>N</CHECKED><VALUE><![CDATA[' + getNodeText(selectSingleNode(udfNodes[i], "FLDVAL")) + ']]></VALUE>';
            }
            if (getNodeText(selectSingleNode(udfNodes[i], "VALTYP")) == "V" || getNodeText(selectSingleNode(udfNodes[i], "DATATYP")) == "C")
                udfStr += '<LOV><NAME>LOV_UDF</NAME></LOV>';
            udfStr += '</FIELD>';
        }
        udfStr += '</FLDSET></PART></SECTION>';
        var udfSEDom = loadXMLDoc(udfStr);
        setNodeText(selectSingleNode(xmlDocUDF, "//PGSIZE"), "100");// SE UDF size increased
        selectSingleNode(xmlDocUDF, "//BODY/TAB").appendChild(getCloneDocElement(selectSingleNode(udfSEDom, "//SECTION")));
    }
    return xmlDocUDF;
}
//Fix for 14321478 -UDF update issue ends
function fnBuildXslLabels() {

    var labels = '@@LBL_ADVANCED~~Advanced Search@@LBL_RESET~~Reset@@LBL_QRY_QUERY~~Query@@LBL_REFRESH~~Refresh@@LBL_RESULT~~Result@@LBL_MAKERID~~Maker Id@@LBL_CHECKER_ID~~Checker Id@@LBL_MAKER_DT_STAMP~~Maker Date Stamp@@LBL_CHECKER_DT_STAMP~~Checker Date Stamp@@LBL_RECORD_STAT~~Record Status@@LBL_AUTHORISATION_STATUS~~Authorization Status@@LBL_A~~A@@LBL_SUMMARY_U~~U@@LBL_UN_AUTH_FLG~~Unauthorized@@LBL_O~~O@@LBL_OPEN~~Open@@LBL_C~~C@@LBL_CLOSED~~Closed@@LBL_EXIT~~Exit@@LBL_OK~~Ok@@LBL_CANCEL~~Cancel@@LBL_FIELDS~~Fields@@LBL_OPERATOR~~Operator@@LBL_VALUE~~Value @@LBL_AND~~And@@LBL_CLEAR_QUERY~~Clear Query@@LBL_ORDER_BY~~Order By@@LBL_ASCENDING~~Ascending@@LBL_DESCENDING~~Descending@@LBL_ACCEPT~~Accept@@LBL_TO~~To@@LBL_OR~~Or@@LBL_SEARCH~~Search@@LBL_RECORDS_PER_PAGE~~Records per page@@LBL_GOTO_PAGE~~Go to Page@@LBL_OF~~of@@LBL_AUTHORIZED~~Authorized @@LBL_INPUT_BY~~Input By@@LBL_AUTH_BY~~Authorized By@@LBL_DATE_TIME~~Date Time@@LBL_MOD_NO~~Modification Number@@LBL_OPEN~~Open@@LBL_CONTRACT_STATUS~~Contract Status@@LBL_PAYMENT_STATUS~~Payment Status@@LBL_COLLECTION_STATUS~~Collection Status@@LBL_DEAL_STATUS~~Deal Status@@LBL_PROCESS_STATUS~~Process Status@@LBL_REVERSAL~~Reversal@@LBL_REMARKS~~Remarks@@LBL_AUDIT~~Audit@@LBL_PRIORITY_AUDIT~~PRIORITY@@LBL_HIGH~~HIGH@@LBL_NORMAL~~NORMAL@@LBL_SHOWERR~~ERROR@@LBL_REMARKS~~Remarks@@LBL_GETPRIORITY~~Priority@@LBL_SUM_LOCK~~Lock@@LBL_CHECKBOX_YES~~YES@@LBL_CHECKBOX_NO~~NO@@LBL_INFRA_MANDATORY~~Mandatory@@LBL_NOSCRIPT_LABEL~~Script Label@@LBL_SUMMARY~~undefined@@LBL_EXPAND_GROUP~~undefined@@LBL_LIST_OF_VALUES~~List Of Values@@LBL_INFRA_PREVIOUS~~Previous@@LBL_NEXT~~Next@@LBL_FIRST~~First@@LBL_LAST~~Last@@LBL_ADDROW~~Add Row@@LBL_DELETEROW~~Delete Row@@LBL_SINGLE_REC_VIEW~~Single view@@LBL_LOCK~~undefined@@LBL_COLUMNS~~undefined@@LBL_NARRATIVE~~Narrative@@LBL_SELECT_ALL_ROWS~~Select All Rows@@LBL_REJECT~~Reject@@LBL_EXPORT~~Export@@';
    return labels;
}

function fnGetUixmlForFunction(vFunctionId) {
    var xmlDOM = loadXMLDoc(mainWin.getXmlMenu());
    var uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + vFunctionId + "']");
    var uiName = vFunctionId;
    if (uiNameNode) {
        for (var i = 0;i < uiNameNode.attributes.length;i++) {
            if (uiNameNode.attributes[i].nodeName == "UINAME") {
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    return uiName;
}

function fnGetSubScrDlgArgs(screenArgs) {
    var dlgArgs = new Object();
    dlgArgs.openerDoc = document;
    dlgArgs.mainWin = dlgArg.mainWin;
    dlgArgs.parentWin = window;
    dlgArgs.dbDataDOM = dbDataDOM.cloneNode(true);
    dlgArgs.dbIndexArray = dbIndexArray;
    dlgArgs.gAction = gAction;
    if (screenArgs["AUTHORIZE_SCREEN_TYPE"] == 'O') {
        dlgArgs.exitOnlineAuth = true;
    }
    if (screenArgs["AUTHORIZE_SCREEN_TYPE"] != 'O') {
        dlgArgs.dataSrcLocationArray = dataSrcLocationArray;
        dlgArgs.relationArray = relationArray;
    }
    return dlgArgs;
}

function loadSubScreenDIV(divId, src) {
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe class="frames" id="ifrSubScreen" title="" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = document.getElementById(divId);
    winObj.style.visibility = "visible";
    winObj.style.display = "block";
}

function fnPopulateScrArgs(screenArgs, scrName, funcId) {
    if (typeof (scrArgName) != "undefined") {
        if (scrArgName[scrName]) {
            var screenArgName = scrArgName[scrName].split("~");
            var screenArgDest = scrArgDest[scrName].split("~");
            for (var i = 0;i < screenArgName.length;i++) {
                if (screenArgName[i] == "ACTION_CODE")
                    continue;
                document.getElementById(screenArgDest[i]).value = screenArgs[screenArgName[i]];
            }
        }
    }
}

function fnLoadSubScreen(xmlFileName, xslFileName, screenName) {
    g_txnBranch = txnBranch;
    //txnBranchUC = parent.txnBranchUC;
    if (parent.screenArgs["AUTHORIZE_SCREEN_TYPE"] == 'O') {
        exitOnlineAuth = true;
    }
    else {
        exitOnlineAuth = true;
    }
    var funcId = xmlFileName.substring(xmlFileName.lastIndexOf("/") + 1, xmlFileName.lastIndexOf(".xml"));
    debugs("xmlFileName", funcId);
    debugs("xslFileName", xslFileName);
    if (parent.dbDataDOM != null)
        dbDataDOM = loadXMLDoc(getXMLString(parent.dbDataDOM));

    dbIndexArray = parent.dbIndexArray;
    gAction = parent.gAction;
    if (parent.screenArgs["AUTHORIZE_SCREEN_TYPE"] != 'O') {
        if (parent.relationArray) {
            relationArray = parent.relationArray;
        }
        if (parent.dataSrcLocationArray) {
            dataSrcLocationArray = parent.dataSrcLocationArray;
        }
    }

    var html = ShowXML(xmlFileName, xslFileName, screenName);
    if (window.ActiveXObject) {
        document.getElementById("ResTree").insertAdjacentHTML("beforeEnd", html);
    }
    else {
        document.getElementById("ResTree").appendChild(html);
    }
    debugs("InnerHTML", document.getElementById("ResTree").innerHTML);

    if (tab_arr.length == 0 || tab_ids.length == 0) {
        fnTabDetails();
    }
    for (var i = 0;i < tab_arr.length;i++) {
        if (document.getElementById("TBLPage" + tab_arr[i].id).innerHTML == "") {
            html = ShowXMLTab(xmlFileName, 'ExtDetailTab.xsl', strScreenName, tab_arr[i].id);
            debugs("tabsContent=", html);
            if (window.ActiveXObject) {
                document.getElementById("TBLPage" + tab_arr[i].id).innerHTML = html;
            }
            else {
                document.getElementById("TBLPage" + tab_arr[i].id).appendChild(html);
            }
        }
    }

    fnBuildMultipleEntryArray();
    //mainWin.showToolbar('', '', '');
    if (xslFileName == "ExtSummary_Advanced.xsl") {
        var advTblObj = document.getElementById("TblAdvanced");
        lovHtml = advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML;
        lovHtml1 = advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML;
        document.getElementById("idTextFieldValue").disabled = true;
        document.getElementById("idTextFieldValue").className = 'TXTro';
        getNextSibling(document.getElementById("idTextFieldValue")).className = 'BTNhide';
        fnCalcHgt(true);
        addEvent(document.getElementById("WNDbuttons"), "onclick", "fnExit_sum('" + screenName + "')");
        document.getElementById('BTN_EXIT').focus();
        return;
    }

    strHeaderTabId = subScrHeaderTabId;
    strCurrentTabId = subScrBodyTabId;
    expandContentLoad(strCurrentTabId);
    fnCalcHgt();
    addEvent(document.getElementById("WNDbuttons"), "onclick", "fnExitAll('" + screenName + "', event)");

    debugs("gAction=", gAction);
    if (gAction == '' || gAction == 'EXECUTEQUERY' || parent.viewMnt == true) {
        if (parent.viewMnt)
            viewMnt = true;

        debugs("calling showData", "");
        showData();
        viewModeAction = true;
        disableAllElements("INPUT");
        viewModeAction = false;
        fnEnableBlockCheckBox();
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        fnDisableElement(document.getElementById('BTN_OK'));
    }
    else if (gAction == 'MODIFY' || gAction == "ROLLOVER" || gAction == "LIQUIDATE") {
        if (gAction == 'MODIFY' && onceAuthObj) {
            if (onceAuthObj.value == 'Y') {
                disableForm();
                debugs("calling showData", "");
                showData();
                fnEnableAmendFields(gAction.toLowerCase());
                disableMESVFields();
            }
            else {
                debugs("calling showData", "");
                showData();
                enableForm();
                disableMESVFields();
            }
        }
        else {
            disableForm();
            debugs("calling showData", "");
            showData();
            fnEnableAmendFields(gAction.toLowerCase());
            disableMESVFields();
        }
        fnEnableElement(document.getElementById('BTN_OK'));
        fnSetExitButton();
    }
    else {
        debugs("calling showData", "");
        showData();
        enableForm();
        disableMESVFields();
        fnSetExitButton();
    }

    try {
        debugs("calling fnPopulateScrArgs", "");
        fnPopulateScrArgs(parent.screenArgs, screenName, funcId);

        //Ashok this needs to be send as part of bellow else case.
        if (functionId == "EXTAUTHORIZE") {
            if (!fnPostLoad_CVS_AUTHORIZE(parent.screenArgs)) {
                disableForm();
                fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
                document.getElementById('BTN_EXIT_IMG').focus();
                gAction = '';
                fnSetExitButton();
                parent.mask();
                return;
            }
        }
        else {
            if (!fnEventsHandlerSubScreen('fnPostLoad', screenName, functionId, parent.screenArgs)) {
                disableForm();
                fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
                document.getElementById('BTN_EXIT_IMG').focus();
                gAction = '';
                fnSetExitButton();
                parent.mask();
                return;
            }
        }
    }
    catch (e) {
    }
    appendData();
    fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
    document.getElementById('BTN_EXIT_IMG').focus();
    parent.mask();
}

function embeddcall(xmlDoc) {
    var xmlDOMtest1;
    var xmlDOMfile2;
    var arr2 = new Array();
    var i = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM").length;
    var fid = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM/FUNCTION").length;
    if (fid > 0) {
        for (var loopIndex = 0;loopIndex < i;loopIndex++) {
            xmlDOMtest1 = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM")[loopIndex];
            arr2[loopIndex] = new Array();
            arr2[loopIndex]["SEQ"] = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM")[loopIndex].getAttribute("SEQ");
            arr2[loopIndex]["DISP_TAB"] = getNodeText(selectSingleNode(xmlDOMtest1, "DISP_TAB"));
            arr2[loopIndex]["DISP_TYPE"] = getNodeText(selectSingleNode(xmlDOMtest1, "DISP_TYPE"));
            arr2[loopIndex]["FUNCTION"] = getNodeText(selectSingleNode(xmlDOMtest1, "FUNCTION"));
        }
        for (var loopIndex = 0;loopIndex < arr2.length;loopIndex++) {
            if (arr2[loopIndex]["DISP_TYPE"] == 'TAB') {
                if (arr2[loopIndex]["DISP_TAB"] == "TAB_MIS" && arr2[loopIndex]["FUNCTION"] == "CMIS") {
                    if (fcjResponseDOM && selectNodes(fcjResponseDOM, "//REC[@TYPE = 'BLK_MIS_DETAILS']").length > 0)
                        xmlDOMfile2 = fnModifyMISXml(arr2[loopIndex]);
                }
                else {
                    xmlDOMfile2 = loadXMLFile("UIXML/" + langCode + "/" + arr2[loopIndex]["FUNCTION"] + ".xml");
                }
                if (typeof (xmlDOMfile2) != "undefined") {
                    var secNodes = selectNodes(xmlDOMfile2, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']/SECTION");
                    for (var secCnt = 0;secCnt < secNodes.length;secCnt++) {
                        selectSingleNode(xmlDoc, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']").appendChild(getCloneDocElement(secNodes[secCnt]));
                    }
                }
            }
        }
    }
    return xmlDoc;
}

function fnModifyMISXml(arrMIS) {
    var currXml = loadXMLFile("UIXML/" + langCode + "/" + arrMIS["FUNCTION"] + ".xml");
    var partNodes = selectNodes(currXml, "//PART");
    var recMIS = getNodeText(selectSingleNode(fcjResponseDOM, "//REC[@TYPE = 'BLK_MIS_DETAILS']/FV")).split("~");
    for (var i = 0;i < partNodes.length - 2;i++) {
        var fldNodes = selectNodes(partNodes[i + 2], "FLDSET/FIELD");
        for (var j = 0;j < fldNodes.length;j++) {
            setNodeText(selectSingleNode(fldNodes[j], "LBL"), recMIS[i * fldNodes.length + j]);
        }
    }
    return currXml;
}

var gCalBtn = null;
var gCalDSODate = null;

function disp_cal(idDate, e) {
    var event = window.event || e;
    if (!mainWin.isSessionActive())
        return;
    var currUser = mainWin.UserId;
    gCalBtn = getEventSourceElement(event);

    if (gCalBtn.parentNode.tagName.toUpperCase() == "NOBR" || gCalBtn.parentNode.tagName.toUpperCase() == "DIV") {
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode.parentNode, idDate);
    }
    else {
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode, idDate);
    }
    var currentBranch = mainWin.CurrentBranch;
    if (typeof (g_txnBranch) != "undefined" || g_txnBranch != undefined) {
        var date = mainWin.txnBranch[g_txnBranch].AppDate;
    }
    else {
        var date = mainWin.AppDate;
    }
    var nCurrYear = null;
    var nCurrMonth = null;
    if (gCalDSODate && gCalDSODate != '' && gCalDSODate.value && (gCalDSODate.value != '')) {
        var curDate = gCalDSODate.value;
        if (gDateFormatDSO == "yyyy-MM-dd") {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(5, 2);
        }
        else {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(4, 2);
        }
    }
    else {
        var l_date = date.split("-");
        nCurrYear = l_date[0];
        if (parseInt(nCurrYear) < 1000)
        	nCurrYear = parseInt(nCurrYear) + 1900;
        nCurrMonth = l_date[1];
    }
    var l_Params = "&Year=" + nCurrYear;
    l_Params += "&Month=" + nCurrMonth;
    l_Params += "&Brn=" + currentBranch;
    l_Params += "&currUser=" + currUser;
    if (typeof (functionId) != "undefined") {
        l_Params += "&functionId=" + functionId;
    }
    l_Params += "&txnBranch=" + g_txnBranch;
    l_Params += "&txnBranchDate=" + date;
    mask();
    loadSubScreenDIV("ChildWin", "ExtCalendar.jsp?" + l_Params);
}

//LOV specific variables Start
var bindFldsStr = "";
var returnFlds = "";
var recordNum = 0;
var lovSrcElem;
var lovBlockObj;
var redValue = "";//for Auto LOV
var isLovOpen = false;
var strLov = "LOV_CHANGE_BRANCH_CODE~LOV_TASK_COPY~LOV_CHANGE_MODULE_CODE~LOV_CHANGE_BRANCH_SESSION~LOV_DC_CHANGE_BRANCH_SESSION~LOV_CHANGE_DEPT_CODE~LOV_USRID_PREFERENCES~LOV_HOMEBRN_PREFERENCES~LOV_CIFID_CUSTOMER~LOV_BRANCH_CUSTOMER~LOV_ACCOUNT_CUSTOMER~LOV_ACCOUNT_WORKFLOW";
//LOV specific variables End
function handleChkBoxBindVar(bindString, bindObj) {
    if (bindObj.getAttribute("ON")) {
        if (bindObj.checked)
            bindString = bindString + bindObj.getAttribute("ON") + "~";
        else 
            bindString = bindString + bindObj.getAttribute("OFF") + "~";
    }
    else {
        if (bindObj.checked)
            bindString = bindString + "Y" + "~";
        else 
            bindString = bindString + "N" + "~";
    }
    return bindString;
}

function handleRadioBindVar(bindString, bindObj) {
    for (var i = 0;i < bindObj.length;i++) {
        if (bindObj[i].checked) {
            bindString = bindString + bindObj[i].value + "~";
            break;
        }
    }
    return bindString;
}

function getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView) {
    if (document.getElementsByName(bindFldName).length > 1) {
        var bndRowNo = dbIndexArray[bindFldBlkName] - 1;
        if (document.getElementsByName(bindFldName)[bndRowNo].type.toUpperCase() == "CHECKBOX")
            bindFldsStr = handleChkBoxBindVar(bindFldsStr, document.getElementsByName(bindFldName)[bndRowNo]);
        else if (document.getElementsByName(bindFldName)[bndRowNo].type.toUpperCase() == "RADIO")
            bindFldsStr = handleRadioBindVar(bindFldsStr, document.getElementsByName(bindFldName));
        else 
            bindFldsStr = bindFldsStr + document.getElementsByName(bindFldName)[bndRowNo].value + "~";
    }
    else {
        if (typeof (document.getElementsByName(bindFldName)[0]) != "undefined") {
            if (document.getElementsByName(bindFldName)[0].type.toUpperCase() == "CHECKBOX")
                bindFldsStr = handleChkBoxBindVar(bindFldsStr, document.getElementsByName(bindFldName)[0]);
            else if (document.getElementsByName(bindFldName)[0].type.toUpperCase() == "RADIO")
                handleRadioBindVar(bindFldsStr, document.getElementsByName(bindFldName));
            else 
                bindFldsStr = bindFldsStr + document.getElementsByName(bindFldName)[0].value + "~";
        }
        else {
            if (parent.document.getElementsByName(bindFldName).length > 1) {
                var rowNo = dbIndexArray[bindFldBlkName] - 1;
                if (parent.document.getElementsByName(bindFldName)[rowNo].type.toUpperCase() == "CHECKBOX")
                    bindFldsStr = handleChkBoxBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName)[rowNo]);
                else if (parent.document.getElementsByName(bindFldName)[rowNo].type.toUpperCase() == "RADIO")
                    bindFldsStr = handleRadioBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName));
                else 
                    bindFldsStr = bindFldsStr + parent.document.getElementsByName(bindFldName)[rowNo].value + "~";
            }
            else {
                if (singleView == "true") {
                    if (parent.document.getElementsByName(bindFldName)[0].type.toUpperCase() == "CHECKBOX")
                        bindFldsStr = handleChkBoxBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName)[0]);
                    else if (parent.document.getElementsByName(bindFldName)[0].type.toUpperCase() == "RADIO")
                        bindFldsStr = handleRadioBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName));
                    else 
                        bindFldsStr = bindFldsStr + parent.document.getElementsByName(bindFldName)[0].value + "~";
                }
                else {
                    if (parent.document.getElementsByName(bindFldName)[0].type.toUpperCase() == "CHECKBOX")
                        bindFldsStr = handleChkBoxBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName)[0]);
                    else if (parent.document.getElementsByName(bindFldName)[0].type.toUpperCase() == "RADIO")
                        bindFldsStr = handleRadioBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName));
                    else 
                        bindFldsStr = bindFldsStr + parent.document.getElementsByName(bindFldName)[0].value + "~";
                }
            }
        }
    }
    return bindFldsStr;
}
/* Changes for AUTO_LOV, autoRedCriteria parameter has been added*/
function disp_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, autoRedCriteria, e) {
    if (isLovOpen)
        return false;
    if (typeof (scrChild) != "undefined" && scrChild == "Y") {
        if (thirdChar == "S") {
            containerId = parentFunction.substring(2, 0) + "S" + parentFunction.substring(3, parentFunction.length)
        }
        else {
            containerId = parentFunction;
        }
    }
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    if (srcElem.parentNode && srcElem.parentNode.tagName.toUpperCase() == 'BUTTON') {
        lovSrcElem = getPreviousSibling(srcElem.parentNode);
    }
    else {
        if (srcElem.tagName.toUpperCase() == 'BUTTON') {
            if (getPreviousSibling(srcElem)) {
                lovSrcElem = getPreviousSibling(srcElem);
            }
            else {
                lovSrcElem = srcElem;
            }
        }
        else {
            //AutoLOV Case
            lovSrcElem = srcElem;
        }
    }
    if (lovSrcElem == null)
        lovSrcElem = srcElem;
    var isME = "false";
    var singleView = "false";

    if ((containerId == "COMMON" || containerId == "SMCHGBRN") && strLov.indexOf(lovId) !=  - 1) {
        disp_custom_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo);
        return;
    }
    if (!fnEventsHandler('fnPreDispLov_' + lovId))
        return false;
    appendData();
    if (!mainWin.isSessionActive())
        return;
    var lovType = 'Y';
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") ==  - 1) {
        for (var i = 0;i < multipleEntryIDs.length;i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                if (recordNum >= 0)
                    fnMulipleEntryRow_onClick(event);
                break;
            }
        }
    }
    if (recordNum < 0)
        recordNum = 0;
    if (document.getElementById(blockId + "__" + fieldName) && document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.getAttribute("VIEW")) {
        if (document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.getAttribute("VIEW") == "SE") {
            isME = "false";
            recordNum = 0;
        }
    }
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = "true";
        recordNum = 0;
    }
    if (functionId == "CSCFNUDF") {
        if (blockId == "BLK_UDF_DETAILS_VIEW") {
            /*Fix for 14627783 */
            //udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='"+(Number(fieldName.substring(fieldName.length-1)) + 1) +"']/FLDNAM"));
            var udfNo = fieldName.substring(fieldName.length - 2);
            if (isNaN(udfNo)) {
                udfNo = fieldName.substring(fieldName.length - 1);
            }
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + (Number(udfNo) + 1) + "']/FLDNAM"));
            /*Fix for 14627783 */
            retflds[blockId + "__" + fieldName + "__" + lovId] = blockId + "__" + fieldName + "~~";
            bndFlds[blockId + "__" + fieldName + "__" + lovId] = bndFlds["BLK_UDF_DETAILS__FLDVAL__" + lovId];
            dbIndexArray["BLK_UDF_DETAILS"] = Number(fieldName.substring(6)) + 1;
        }
        else 
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + dbIndexArray["BLK_UDF_DETAILS"] + "']/FLDNAM"));
    }
    else if (functionId == "CSCTRUDF") {
        udfLovId = document.getElementsByName("FLDNAME")[recordNum].value;
    }
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }
    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") {
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
    }

    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    if (udfLovId != "")
        l_Params += "&lovId=" + udfLovId;
    else 
        l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    }
    else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    /*if(typeof(txnBranchUC)!="undefined"){
         l_Params +="&txnBranchUC="+txnBranchUC;
    }*/
    if (typeof (autoRedCriteria) != "undefined" && autoRedCriteria != "") {
        redValue = autoRedCriteria;
    }
    else {
        /**/
        redValue = lovSrcElem.value;
        //redValue = "";
    }
    l_Params += "&rednFldval=" + redValue;

    if (blockId != '') {
        returnFlds = retflds[blockId + "__" + fieldName + "__" + lovId];
        var bindFlds = bndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        if (bindFlds[0] != "") {
            for (var i = 0;i < bindFlds.length;i++) {
                var bindStr = bindFlds[i].split("!");
                var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
                var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
                if (dbDataDOM != null && selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
                    bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~";
                }
                else {
                    bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
                }
            }
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    }
    else {
        returnFlds = retflds[lovId];
    }
    l_Params += "&bindFldsStr=" + bindFldsStr;
    isLovOpen = true
    mask();
    loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
    fnEventsHandler('fnPostDispLov_' + lovId);
}

function disp_custom_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo) {
    var lovType = 'Y';
    recordNum = 0;
    bindFldsStr = "";
    showChgBrnLOV = true;
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + "M";
    l_Params += "&lovType=" + lovType;
    l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    l_Params += "&isME=" + "false";
    l_Params += "&singleView=" + "false";
    if (typeof (istxnBrn) != 'undefined')
        l_Params += "&istxnBrn=" + istxnBrn;
    else 
        l_Params += "&istxnBrn=" + "false";
    if (blockId != '') {
        if (typeof (retflds) != 'undefined') {
            returnFlds = retflds[blockId + "__" + fieldName + "__" + lovId];
            bindFldsStr = bndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        }
        else {
            var retflds = new Array();
            var bndFlds = new Array();
            retflds["BLK_BRANCH__BRANCH_CODE__LOV_CHANGE_BRANCH_CODE"] = "BRANCH_CODE~";
            bndFlds["BLK_BRANCH__BRANCH_CODE__LOV_CHANGE_BRANCH_CODE"] = "";
            //FCUBS_12.0_PS_01 Starts 
            if (containerId == "SMCHGBRN" && lovId == "LOV_TASK_COPY") {
                retflds["BLK_BRANCH__STAGE__LOV_TASK_COPY"] = "BLK_BRANCH__STAGE~";
                bndFlds["BLK_BRANCH__STAGE__LOV_TASK_COPY"] = mainWin.document.getElementById('BLK_BRANCH__STAGE').value;
            }
            //FCUBS_12.0_PS_01 Ends		
            retflds["USERSEARCH__USRID__LOV_USRID_PREFERENCES"] = "UserId~";
            bndFlds["USERSEARCH__USRID__LOV_USRID_PREFERENCES"] = "";

            retflds["USERSEARCH__HOME_BRN__LOV_HOMEBRN_PREFERENCES"] = "HomeBrn~";
            bndFlds["USERSEARCH__HOME_BRN__LOV_HOMEBRN_PREFERENCES"] = "";

            retflds["CUSTSEARCH__CIF_ID__LOV_CIFID_CUSTOMER"] = "CFid~";
            bndFlds["CUSTSEARCH__CIF_ID__LOV_CIFID_CUSTOMER"] = "";

            retflds["CUSTSEARCH__BRANCH__LOV_BRANCH_CUSTOMER"] = "CustBrn~";
            bndFlds["CUSTSEARCH__BRANCH__LOV_BRANCH_CUSTOMER"] = "";

            retflds["CUSTSEARCH__CustAccountNo__LOV_ACCOUNT_CUSTOMER"] = "CustAccountNo~";
            bndFlds["CUSTSEARCH__CustAccountNo__LOV_ACCOUNT_CUSTOMER"] = "";

            //Added for FCIS change starts
            retflds["BLK_MODULE__MODULE_CODE__LOV_CHANGE_MODULE_CODE"] = "BLK_MODULE__MODULE_CODE~~~~";
            bndFlds["BLK_MODULE__MODULE_CODE__LOV_CHANGE_MODULE_CODE"] = "";

            //// Added for FCIS change ends

            retflds["WorkflowSearch__BRANCH__LOV_BRANCH_CUSTOMER"] = "BRANCH~";
            bndFlds["WorkflowSearch__BRANCH__LOV_BRANCH_CUSTOMER"] = "";

            retflds["WorkflowSearch__ACCOUNT__LOV_ACCOUNT_WORKFLOW"] = "ACCOUNT~";
            bndFlds["WorkflowSearch__ACCOUNT__LOV_ACCOUNT_WORKFLOW"] = "";
            returnFlds = retflds[blockId + "__" + fieldName + "__" + lovId];
            bindFldsStr = bndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        }
    }
    else {
        if (typeof (retflds) != 'undefined') {
            returnFlds = retflds[lovId];
        }
        else {
            var retflds = new Array();
            if (brnidentifier == 'Y') {
                retflds["LOV_CHANGE_BRANCH_SESSION"] = 'BRANCH_CODE~';
                returnFlds = retflds[lovId];
                retVal[0] = '';
            }
            else {
                retflds["LOV_DC_CHANGE_BRANCH_SESSION"] = 'BRANCH_CODE~';
                returnFlds = retflds[lovId];
                retVal[0] = '';
            }
        }

    }
    l_Params += "&bindFldsStr=" + bindFldsStr;
    mask();
    loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
}

function disp_offlinelov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, autoRedCriteria, e) {
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    if (srcElem.parentNode.tagName.toUpperCase() == 'BUTTON') {
        lovSrcElem = getPreviousSibling(srcElem.parentNode);
    }
    else {
        lovSrcElem = getPreviousSibling(srcElem);
    }
    if (lovSrcElem == null)
        lovSrcElem = srcElem;
    var isME = "false";
    var singleView = "false";
    if (!fnEventsHandler('fnPreDispLov_' + lovId))
        return false;
    appendData();
    if (!mainWin.isSessionActive())
        return;
    var lovType = 'N';
    //Bug 14836553 Changes Starts
    autoRedCriteria = lovSrcElem.value;
    var offlineLov = 'Y';
    //Bug 14836553 Changes Ends
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") ==  - 1) {
        for (var i = 0;i < multipleEntryIDs.length;i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                break;
            }
        }
    }
    if (recordNum < 0)
        recordNum = 0;
    if (document.getElementById(blockId + "__" + fieldName) && document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.getAttribute("VIEW")) {
        if (document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.VIEW == "SE") {
            isME = "false";
            recordNum = 0;
        }
    }
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = "true";
        recordNum = 0;
    }

    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }

    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") {
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
    }
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    if (udfLovId != "")
        l_Params += "&lovId=" + udfLovId;
    else 
        l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    }
    else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    /*if(typeof(txnBranchUC)!="undefined"){
        l_Params +="&txnBranchUC="+txnBranchUC;
    }*/
    if (typeof (autoRedCriteria) != "undefined") {
        redValue = autoRedCriteria;
    }
    else {
        redValue = "";
    }
    l_Params += "&rednFldval=" + redValue;//Bug 14836553 Changes
    if (blockId != '') {
        returnFlds = offlineRetflds[blockId + "__" + fieldName + "__" + lovId];
        var bindFlds = offlineBndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        if (bindFlds[0] != "") {
            for (var i = 0;i < bindFlds.length;i++) {
                var bindStr = bindFlds[i].split("!");
                var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
                var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
                if (dbDataDOM != null && selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
                    bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~";
                }
                else {
                    bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
                }
            }
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    }
    else {
        returnFlds = offlineRetflds[lovId];
    }
    l_Params += "&bindFldsStr=" + bindFldsStr;
    //Bug 14836553 Changes  Starts 
    l_Params += "&offlineLov=" + offlineLov;
    isLovOpen = true;
    //Bug 14836553 Changes Ends
    mask();
    loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
    fnEventsHandler('fnPostDispLov_' + lovId);
}

function disableAllElements(type) {
    var elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0;loopIndex < elements.length;loopIndex++) {
        var tmpElem = elements[loopIndex];
        if (tmpElem.type.toUpperCase() != 'HIDDEN' && getCurrentStyle(tmpElem, "visibility").toUpperCase() != "HIDDEN" && tmpElem.className.toUpperCase() != "HIDDEN") {
            fnDisableElement(tmpElem);
            if (checkViewMode && checkViewMode == true)
                loopIndex--;
            checkViewMode = false;
            if (gAction == 'EXECUTEQUERY' || gAction == '' || ShowSummary == 'TRUE') {
                var nextSibling = getNextSibling(tmpElem);
                if (nextSibling) {
                    if (nextSibling.tagName) {
                        if (nextSibling.tagName == 'BUTTON' && nextSibling.innerHTML) {
                            if (nextSibling.innerHTML.indexOf('IMGPopupEdit') !=  - 1) {
                                nextSibling.disabled = false;
                            }
                        }
                    }
                }
            }
        }
        if (type.toUpperCase() == "BUTTON") {
            if (gAction == 'EXECUTEQUERY' || gAction == '' || ShowSummary == 'TRUE') {
                if (tmpElem.name.indexOf("BTN_PREV_") !=  - 1 || tmpElem.name.indexOf("BTN_NEXT_") !=  - 1) {
                    fnEnableElement(tmpElem);
                }
                else if (tmpElem.innerHTML) {
                    if ((tmpElem.innerHTML.indexOf('IMGPopupEdit') >= 0) || (getOuterHTML(tmpElem).indexOf('show_editor') >= 0)) {
                        fnEnableElement(tmpElem);
                    }
                }
            }
        }
    }
}

function enableAllElements(type, obj) {
    var elements;
    if (typeof (obj) != "undefined")
        elements = obj.getElementsByTagName(type);
    else 
        elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0;loopIndex < elements.length;loopIndex++) {
        var tmpElem = elements[loopIndex];
        if (tmpElem.type.toUpperCase() != 'HIDDEN' && getCurrentStyle(tmpElem, "visibility").toUpperCase() != "HIDDEN" && tmpElem.className.toUpperCase() != 'HIDDEN') {
            if (tmpElem.className != null && gAction == 'ENTERQUERY' && (tmpElem.className == 'BtnAddRow' || tmpElem.className == 'BtnDelRow')) {
                return;
            }
            else {
                if (tmpElem.readOnly && tmpElem.disabled && (!tmpElem.getAttribute("INPUT_LOV") || tmpElem.getAttribute("INPUT_LOV") == 'N')) {
                    if (tmpElem.type.toUpperCase() != 'CHECKBOX') {
                        tmpElem.className = 'TXTro';
                        tmpElem.readOnly = true;
                    }
                }
                else 
                    fnEnableElement(tmpElem);
            }
        }
    }
}

function alert(message) {
    mask();
    showAlerts(fnBuildAlertXML('', 'I', message), 'I');
    alertAction = "UNMASK";
}

function fnShowSingleViewForME(blockId) {
    if (!mainWin.isSessionActive())
        return;
    var tableObject = document.getElementById(blockId);
    var scrType = screenType;//FC10.3 WB CHANGES
    var fnId = "";
    var xmlDOM = loadXMLDoc(mainWin.getXmlMenu());
    var uiNameNode;
    var title = mainWin.getItemDesc("LBL_SINGLE_REC_VIEW_TITLE");
    title = tableObject.summary + ' ' + title;
    var exitLabel = mainWin.getItemDesc("LBL_EXIT");
    var okLabel = mainWin.getItemDesc("LBL_OK");
    if (typeof (screenArgs) != "undefined") {
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + screenArgs['FUNCTION_ID'] + "']")
    }
    else {
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + mainWin.document.getElementById("fastpath").value + "']")
    }
    var uiName = "";
    if (uiNameNode) {
        for (var i = 0;i < uiNameNode.attributes.length;i++) {
            if (uiNameNode.attributes[i].nodeName == "UINAME") {
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    if (uiNameNode && uiName != "" && uiName != "null") {
        //since the value of uiName will comeas "null"(String) in menu xml
        fnId = uiName;
    }
    else if (scrType == "WB") {
        uiName = mainWin.gActiveWindow.uiXML;
        fnId = uiName.substring(0, uiXML.indexOf(".", 0));
    }
    else {
        fnId = functionId;
    }
    if (typeof (childFunctionOrigin) != "undefined") {
        functionOrigin = childFunctionOrigin;
        parentFunction = childParentFunction;
        parentOrigin = childParentOrigin;
    }
    var l_Params = "title=" + title;
    l_Params += "&scrType=" + screenType;
    l_Params += "&ExitLabel=" + exitLabel;
    l_Params += "&OkLabel=" + okLabel;
    l_Params += "&l_strTheme=" + strTheme;
    l_Params += "&blockId=" + blockId;
    l_Params += "&functionId=" + functionId;
    if (mainWin.txnBranch[g_txnBranch]) {
        // l_Params += "&txnBranchUC=" + txnBranchUC; 
        l_Params += "&g_txnBranch=" + g_txnBranch;
    }

    if (tableObject) {
        if (tableObject.tBodies[0].rows.length > 0) {
            mask();
            loadSubScreenDIV("ChildWin", "ExtLaunchSingleViewScreen.jsp?" + l_Params);
        }
    }
}

function fnExitSingleViewScreen() {
    unmask();
    var winDivObj = document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

var editorSrcElem;

function show_editor(elemId, maxLength, title, e) {
    var event = window.event || e;
    var scrElem = getEventSourceElement(event);
    if (scrElem.tagName.toUpperCase() == 'BUTTON') {
        editorSrcElem = scrElem;
    }
    else if (getNextSibling(scrElem).tagName.toUpperCase() == 'BUTTON') {
        //12902575 - F4 not opening Editor in Non-IE browsers
        editorSrcElem = getNextSibling(scrElem);
    }
    if (getPreviousSibling(scrElem) && getPreviousSibling(scrElem).getAttribute("LABEL_VALUE")) {
        title = getPreviousSibling(scrElem).getAttribute("LABEL_VALUE");
    }
    else {
        title = title;
    }
    var recNum =  - 1;
    if ((getRowIndex(event) == 0) || (getRowIndex(event) ==  - 1))
        recNum = 0;
    else 
        recNum = getRowIndex(event);
    var inputBoxName;
    if (scrElem.parentNode.tagName.toUpperCase() == 'BUTTON') {
        //Safari Change
        if (getPreviousSibling(scrElem.parentNode).tagName.toUpperCase() == 'BUTTON') {
            inputBoxName = getPreviousSibling(getPreviousSibling(scrElem.parentNode)).name;
        }
        else {
            inputBoxName = getPreviousSibling(scrElem.parentNode).name;
        }
    }
    else {
        if (getPreviousSibling(scrElem).tagName.toUpperCase() == 'BUTTON') {
            inputBoxName = getPreviousSibling(getPreviousSibling(scrElem)).name;
        }
        else {
            inputBoxName = getPreviousSibling(scrElem).name;
        }
    }
    var elementsLength = document.getElementsByName(inputBoxName).length;
    if (elementsLength > 0) {
        if (document.getElementsByName(inputBoxName)[0].ownerDocument) {
            if (document.getElementsByName(inputBoxName)[0].ownerDocument.title == 'Single Record View') {
                elementsLength = 1;
            }
        }
    }
    if (elementsLength == 1 && recNum < 1) {
        recNum = 0;
    }
    else {
        tmpElem = scrElem;
        while (tmpElem.tagName != "TR") {
            tmpElem = tmpElem.parentNode;
            if (tmpElem == null) {
                recNum = 0;
                break;
            }
        }
        if (tmpElem) {
            recNum = tmpElem.rowIndex - 1;
        }
    }
    if (typeof (summaryScreen) != "undefined")
        recNum = 0;
    if (!maxLength)
        maxLength = document.getElementsByName(elemId)[0].getAttribute("SIZE");

    var readOnlyAttr = "false";
    if (document.getElementById(elemId).readOnly || document.getElementById(elemId).disabled) {
        readOnlyAttr = "true";
    }
    var l_Params = "title=" + title;
    l_Params += "&elemId=" + elemId;
    l_Params += "&maxLength=" + maxLength;
    l_Params += "&recNum=" + recNum;
    l_Params += "&readOnlyAttr=" + readOnlyAttr;
    l_Params += "&editorSrcElem=" + editorSrcElem;
    mask();
    loadSubScreenDIV("ChildWin", "ExtEditor.jsp?" + l_Params);
}

function getFrmtDate(inputDate, dateFormat) {
    this.validDate = true;
    var sep = null;
    var dFormat = null
    var ddInput, mmInput, yyInput;
    if (inputDate == null || inputDate == "") {
        return;
    }
    dFormat = getInputDateFormat(dateFormat);
    sep = getSeparator(dFormat);
    var dmy = new Array();
    try {
        get_dd_mm_yy(inputDate, dFormat, sep, dmy);
        ddInput = dmy[0];
        mmInput = dmy[1];
        yyInput = dmy[2];
    }
    catch (e) {
        alert(mainWin.getItemDesc("LBL_EXCEPTION_PARS_DATE"));
        this.validDate = false;
    }
    this.yyyy = yyInput;
    this.mm = mmInput - 1 + '';
    this.dd = ddInput;
    this.dateInputFormat = dFormat;
    this.isValidDate = isValidDate;
    this.getShortDate = getShortDate;
    this.getDSODate = getDSODate;
    this.getInputDateFormat = getInputDateFormat;
}

function fnFormatTimeStamp(elem) {
    var objDtStamp = elem;
    if (objDtStamp && objDtStamp.value) {
        var objDtStampValue = objDtStamp.value;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
        var formattedTS = mb3Date.getShortDate() + timePart;
        getNextSibling(getNextSibling(objDtStamp)).value = formattedTS;
        //document.getElementById(objDtStamp.id + "I").value = formattedTS;
    }
    else if (objDtStamp && objDtStamp.value == "") {
        //document.getElementById(objDtStamp.id + "I").value = "";
        getNextSibling(getNextSibling(objDtStamp)).value = "";
    }
    return;
}

function fnFormatTimeStampString(str) {
    if (str && (str != "")) {
        var objDtStampValue = str;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
        var formattedTS = mb3Date.getShortDate() + timePart;
        str = formattedTS;
    }
    return str;
}

var DIGIT_KEY = '#';
var ANYTHING_KEY = '*';
var UPPERCASE_KEY = 'U';
var LOWERCASE_KEY = 'L';
var HEX_KEY = 'H';
var MASK_KEY_CHARS = DIGIT_KEY + ANYTHING_KEY + UPPERCASE_KEY + LOWERCASE_KEY + HEX_KEY;

function MB3MaskFormatter(value, mask) {
    this.mask = "";
    this.value = "";
    this.displayValue = "";
    this.valid = true;
    this.mask = mask;
    var invalidCharacters = getInvalidCharacters(mask);
    var valueIndex = 0;
    var maskSegment = "";
    var valueSegment = "";
    var nextMaskChar = "";
    var nextValueChar = "";

    for (var maskIndex = 0;maskIndex < mask.length;maskIndex++) {
        nextMaskChar = this.mask.substr(maskIndex, 1);
        if (valueIndex < value.length) {
            nextValueChar = value.substr(valueIndex, 1);
        }
        if (MASK_KEY_CHARS.indexOf(nextMaskChar) < 0) {
            var fmtSegment = formatSegment(valueSegment, maskSegment);
            if (fmtSegment.length == maskSegment.length) {
                this.value += fmtSegment;
                this.displayValue += fmtSegment;
                this.displayValue += nextMaskChar;
                valueSegment = "";
                maskSegment = "";
                if (nextValueChar == nextMaskChar) {
                    valueIndex++;
                }
            }
            else {
                displayMsg('ST-COM001', mask + '~');
                this.valid = false;
                break;
            }
        }
        else {
            maskSegment += nextMaskChar;
            if (valueIndex < value.length) {
                switch (nextMaskChar) {
                    case DIGIT_KEY:
                        if ((nextValueChar >= 0) && (nextValueChar <= 9)) {
                            valueSegment += nextValueChar;
                            valueIndex++;
                        }
                        break;
                    case ANYTHING_KEY:
                        if (invalidCharacters.indexOf(nextValueChar) < 0) {
                            valueSegment += nextValueChar;
                            valueIndex++;
                        }
                        break;
                    case UPPERCASE_KEY:
                        if (invalidCharacters.indexOf(nextValueChar) < 0) {
                            valueSegment += nextValueChar.toUpperCase();
                            valueIndex++;
                        }
                        break;
                    case LOWERCASE_KEY:
                        if (invalidCharacters.indexOf(nextValueChar) < 0) {
                            valueSegment += nextValueChar.toLowerCase();
                            valueIndex++;
                        }
                        break;
                    case HEX_KEY:
                        if (((nextValueChar >= 0) && (nextValueChar <= 9)) || ((nextValueChar.toUpperCase() >= "A") && (nextValueChar.toUpperCase() <= "F"))) {
                            valueSegment += nextValueChar;
                            valueIndex++;
                        }
                        break;
                    default :
                        break;
                }
            }
        }
    }
    //for
    if ((this.valid == true) && (maskSegment != "")) {
        var fmtSegment = formatSegment(valueSegment, maskSegment);
        if (fmtSegment.length == maskSegment.length) {
            this.value += fmtSegment;
            this.displayValue += fmtSegment;
            valueSegment = "";
            maskSegment = "";
        }
        else {
            displayMsg('ST-COM001', mask + '~');
            this.valid = false;
        }
    }
    if ((this.valid == true) && (valueIndex < value.length)) {
        displayMsg('ST-COM001', mask + '~');
        this.valid = false;
    }
}

MB3MaskFormatter.prototype.isValid = isValid;
MB3MaskFormatter.prototype.getDisplayValue = getDisplayValue;//When DSO value changes, this function is called by the hidden field bound to DSO 
MB3MaskFormatter.prototype.getDSOValue = getDSOValue;//When user enters a value and leaves the field, this function sets the value in DSO bound hidden field
function isValid() {
    return (this.valid);
}

function getDisplayValue() {
    return this.displayValue;
}

function getDSOValue() {
    return this.value;
}

function getInvalidCharacters(mask) {
    var retVal = "";
    var re = new RegExp("[^" + MASK_KEY_CHARS + "]", "g");
    var tmp;
    while ((tmp = re.exec(mask)) != null) {
        if (retVal.indexOf(tmp) < 0)
            retVal += tmp;
    }
    return retVal;
}

function formatSegment(valueSegment, maskSegment) {
    var retVal = valueSegment;
    var tmp = "";
    if ((valueSegment == null) || (valueSegment == "")) {
        retVal = zeroPrefix("", maskSegment.length);
    }
    else {
        var re = new RegExp("[^" + maskSegment.substr(0, 1) + "]", "g");
        if (tmp = re.exec(maskSegment) == null) {
            retVal = zeroPrefix(valueSegment, maskSegment.length);
        }
    }
    return retVal;
}

function displayValue(dataBoundElem) {
    var idDispVal = dataBoundElem.id + "I";
    var inpElem = dataBoundElem.parentNode.parentNode.parentNode[idDispVal];
    var mask = inpElem.getAttribute("mask");
    var val = dataBoundElem.value;
    if (val && val != "") {
        var mb3Value = new MB3MaskFormatter(val, mask);
        inpElem.value = mb3Value.getDisplayValue();
    }
    else {
        inpElem.value = "";
    }
    if ((document.getElementById('op').value != 'QUERY') && (arguments.length == 1)) {
        inpElem.fireEvent("onchange");
    }
}

var gCurDisplayMaskValue = 0;

function acceptInputValue(idVal) {
    var curInpElem = getEventSourceElement(event);
    gCurDisplayMaskValue = curInpElem.value;
}

function validateInputValue(idVal) {
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem = curInpElem.parentNode.parentNode.parentNode[idVal];
    var mask = curInpElem.getAttribute("mask");
    var inpVal = curInpElem.value;

    if (inpVal && inpVal != "") {
        var mb3Value = new MB3MaskFormatter(inpVal, mask);
        if (mb3Value.isValid()) {
            if (gCurDisplayMaskValue != inpVal) {
                curDataBoundElem.value = mb3Value.getDSOValue();
            }
            else {
                displayValue(curDataBoundElem, false);
            }
        }
        else {
            event.returnValue = false;
        }
    }
    else {
        if (curDataBoundElem.value != '')
            curDataBoundElem.value = '';
    }
}

/* ExtTabContent.js Functions Start *********************/
function expandContentLoad(cid) {
    var aobject = document.getElementById(cid);
    if (!aobject) {
        if (tab_arr.length == 0 || tab_ids.length == 0) {
            fnTabDetails();
        }
        if (tab_arr.length == 0) {
            cid = strCurrentTabId;
        }
        else {
            for (var i = 0;i < tab_arr.length;i++) {
                cid = tab_ids[0];
                break;
            }
        }
        aobject = document.getElementById(cid);
    }
    if (document.getElementById("tablist")) {
        if (aobject != null) {
            highlighttab(aobject);
            detectSourceindex(aobject);
        }
        document.getElementById("TBLPage" + cid).style.display = "block";
        previoustab = cid;
    }
    strCurrentTabId = cid;
}

function expandcontent(cid) {
    if (cid != "") {
        var aobject = document.getElementById(cid);
        if (document.getElementById("tablist")) {
            prevTab = strCurrentTabId;
            if (aobject != null) {
                highlighttab(aobject);
                detectSourceindex(aobject);
            }
            if (previoustab != "") {
                document.getElementById("TBLPage" + previoustab).style.display = "none";
            }
            document.getElementById("TBLPage" + cid).style.display = "block";
            previoustab = cid;

        }
        strCurrentTabId = cid;
        if (document.getElementById("TBLPage" + strCurrentTabId).innerHTML == "") {
            var html = ShowXMLTab(xmlFileName, 'ExtDetailTab.xsl', strScreenName, strCurrentTabId);
            if (window.ActiveXObject) {
                document.getElementById("TBLPage" + strCurrentTabId).innerHTML = html;
            }
            else {
                document.getElementById("TBLPage" + strCurrentTabId).appendChild(html);
            }
            //fnBuildMultipleEntryArray(strCurrentTabId);
        }
    }
    return false;
}

function highlighttab(aobject) {
    if (typeof (tabobjlinks) == "undefined" || typeof (tabobjlinks[0]) == "undefined" || typeof (tabobjlinks[0]) == "unknown")
        collecttablinks();
    fnSetTabAttributes(aobject, tabobjlinks);
}

function fnSetTabAttributes(aobject, tabobjlinks) {
    for (i = 0;i < tabobjlinks.length;i++) {
        tabobjlinks[i].parentNode.id = "";
        addEvent(tabobjlinks[i], "class", "Htaball");
        tabobjlinks[i].setAttribute("objClicked", "false");
        tabobjlinks[i].setAttribute("selected", "false");
        tabobjlinks[i].setAttribute("title", "");
    }
    aobject.parentNode.id = "current";
    aobject.setAttribute("objClicked", "true");
    aobject.setAttribute("objvisited", "true");
    aobject.setAttribute("selected", "true");
    //aobject.setAttribute("title", mainWin.getItemDesc("LBL_SELECTED"));
    aobject.setAttribute("title", "selected");
    addEvent(aobject, "onmouseover", "setTabClass(this,'onmouseover')");
    addEvent(aobject, "onmouseout", "setTabClass(this,'onmouseout')");
    addEvent(aobject, "onblur", "setTabClass(this,'onblur')");
    addEvent(aobject, "class", "Htabsel");

}

function setTabClass(object, event_type) {
    if (object.getAttribute("objClicked") == "false") {
        if (event_type == "onmouseover") {
            addEvent(object, "class", "Htabover");
        }
        else {
            addEvent(object, "class", "Htaball");
        }
    }
}

// The following code has been copied from TabContent.js for performance tuning
function collecttablinks() {
    var tabobj = document.getElementById("tablist");
    tabobjlinks = tabobj.getElementsByTagName("A");
}

function getFirstElementToFocus(Obj) {
    if (Obj != null) {
        var objTagName = Obj.tagName.toUpperCase();
        if ((objTagName == "INPUT" || objTagName == "TEXTAREA" || objTagName == "SELECT" || objTagName == "BUTTON") && !Obj.disabled && Obj.type.toUpperCase() != "HIDDEN")
            return Obj;
        else {
            var children = Obj.children;
            for (var i = 0;i < children.length;++i) {
                var firstElementToFocus = getFirstElementToFocus(children[i]);
                if (firstElementToFocus != null) {
                    return firstElementToFocus;
                }
            }
            return null;
        }
    }
    else {
        return null;
    }
}

function handleTabKeys(tabObj, e) {
    var e = window.event || e;
    if (e.shiftKey && e.keyCode == 9) {
        var headerInputElem = document.getElementById("TBLPage" + strHeaderTabId).getElementsByTagName("INPUT");
        for (var i = 0;i < headerInputElem.length;i++) {
            if (!headerInputElem[i].disabled && headerInputElem[i].type.toUpperCase() != "HIDDEN") {
                headerInputElem[i].focus();
                preventpropagate(e);
                return false;
            }
        }
    }
    else if (e.keyCode == 9) {
        /*
        var tabInputElem = document.getElementById("TBLPage"+strCurrentTabId).getElementsByTagName("INPUT");
        for(var i=0; i<tabInputElem.length; i++) {
            if(!tabInputElem[i].disabled && tabInputElem[i].type.toUpperCase() != "HIDDEN"){
                tabInputElem[i].focus();
                preventpropagate(e);
                return false;             
            }
        }        
      */
        var firstElementToFocus = getFirstElementToFocus(document.getElementById("TBLPage" + strCurrentTabId));
        if (firstElementToFocus != null) {
            firstElementToFocus.focus();
        }
        else {
            document.getElementById("BTN_EXIT_IMG").focus();
        }
        preventpropagate(e);
        return false;
    }
    else if (e.keyCode == 39) {
        if (getNextSibling(tabObj.parentNode) != null) {
            getNextSibling(tabObj.parentNode).getElementsByTagName("A")[0].focus();
            expandcontent(getNextSibling(tabObj.parentNode).getElementsByTagName("A")[0].id);
            preventpropagate(e);
            return false;
        }
    }
    else if (e.keyCode == 37) {
        if (getPreviousSibling(tabObj.parentNode) != null) {
            getToolBarPreviousSibling(tabObj.parentNode).getElementsByTagName("A")[0].focus();
            expandcontent(getToolBarPreviousSibling(tabObj.parentNode).getElementsByTagName("A")[0].id);
            preventpropagate(e);
            return false;
        }
    }
}

function handleScrObj(scrObj, e) {
    var e = window.event || e;
    if (e.keyCode == 9 && !e.shiftKey) {
        document.getElementById("WNDbuttons").focus();
        preventpropagate(e);
        return false;
    }
    return true;
}

function fnHandleScrBtn(e) {
    var event = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (event.keyCode == 27) {
        if (document.getElementById('queryCriteria'))
            fnExitSumCriteria(event);
        else if (document.getElementById('qCriteriaName'))
            fnExitSumQueryCriteria(event);
        document.getElementById("BTN_EXIT").focus();
        return;
    }
    if (event.shiftKey && event.keyCode == 9) {
        if (srcElement.className.indexOf("WNDcls") !=  - 1) {
            if (getOuterHTML(srcElement).indexOf("_sum") !=  - 1)
                document.getElementById("BTN_EXIT").focus();
            else if (document.getElementById("BTN_EXIT_IMG"))
                document.getElementById("BTN_EXIT_IMG").focus();
            else 
                document.getElementById("BTN_OK").focus();
        }
        else if (srcElement.id != "resultsLink")
            document.getElementById("WNDbuttons").focus();
        else if (srcElement.id == "resultsLink")
            document.getElementById("BTN_CANCEL").focus();
        if (srcElement.id == "criteriaName")
            document.getElementById("BTN_CANCEL").focus();
        else if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("BTN_OK"))
                document.getElementById("BTN_OK").focus();
            else if (document.getElementById("resultsLink"))
                document.getElementById("resultsLink").focus();
        }
        else if (srcElement.id == "BTN_OK")
            document.getElementById("criteriaName").focus();
        preventpropagate(event);
        return false;
    }
    else if (e.keyCode == 9) {
        if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("criteriaName"))
                document.getElementById("criteriaName").focus();
            else if (document.getElementById("resultsLink"))
                document.getElementById("resultsLink").focus();
            preventpropagate(event);
            return false;
        }
    }
    else if (!document.getElementById('queryCriteria')) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            if (getIEVersionNumber() > 0)
                fireHTMLEvent(srcElement, "onclick");
            else 
                eval(srcElement.getAttribute("onclick"));
            return false;
        }
    }
}

function fnhandleSubScrBtn(e) {
    var event = window.event || e;
    var srcElement = getEventSourceElement(event);
    //mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (event.keyCode == 9 || (event.shiftKey && event.keyCode == 9)) {
        if (srcElement.id == "enteredPwd")
            document.getElementById("BTN_OK").focus();
        else if (srcElement.id == "BTN_OK") {
            if (document.getElementById("enteredPwd"))
                document.getElementById("enteredPwd").focus();
        }
        preventpropagate(event);
        return false;
    }
    if (srcElement.id != "enteredPwd") {
        if (event.keyCode == 13 || event.keyCode == 32) {
            if (getIEVersionNumber() > 0)
                fireHTMLEvent(srcElement, "onclick");
            else 
                setTimeout(function () {
                    //eval(srcElement.getAttribute("onclick"))
                    var fnEval = new Function("event", srcElement.getAttribute("onclick"));
                    fnEval();
                },
0);//Fix for FCIS 9.2.1 SFR 12910711
            return false;
        }
    }
    else if (event.keyCode == 13) {
        fnverifyScreenSaverPwd(event);
        return false;
    }
    return true;
}

function detectSourceindex(aobject) {
    for (i = 0;i < tabobjlinks.length;i++) {
        if (aobject == tabobjlinks[i]) {
            tabsourceindex = i
            break 
        }
    }
}

// The following code has been copied from TabPersist.js for performance tuning
var enablepersistence = true;
var persisttype = "local";

function get_cookie(Name) {
    var search = Name + "=";
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset !=  - 1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end ==  - 1)
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    return returnvalue;
}

/* ExtTabContent.js Functions End*********************/

function fnLaunchHotkyFunc(keyDown, functionID) {
    var hotKey = "";
    if (keyDown) {
        if (event.ctrlKey == true && (event.keyCode == 77)) {
            hotKey = getEventSourceElement(event).value;
        }
        else {
            return;
        }
    }
    else {
        var tagName = getPreviousSibling(getEventSourceElement(event)).tagName;
        var inputElement = getPreviousSibling(getEventSourceElement(event));
        while (tagName != "INPUT") {
            inputElement = getPreviousSibling(inputElement);
            tagName = inputElement.tagName;
        }
        if (tagName == "INPUT")
            hotKey = inputElement.value;
    }
    if (hotKey != "") {
        dlgArg.hotKey = hotKey;
        dlgArg.mainWin.frames["FrameMenuB"].dispHref1(functionID, dlgArg);
    }
    event.returnValue = false;
}

var responseDom = "";

function fndispImage(accno, kvalue, brn) {
    var p_gAction = gAction;
    gAction = "DISPCUSTIMAGE";
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + brn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>DISPCUSTIMAGE</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><ADDL><PARAM><NAME>ACCNO</NAME><VALUE>' + accno + '</VALUE></PARAM><PARAM><NAME>KVALUE</NAME><VALUE>' + kvalue + '</VALUE></PARAM></ADDL>' + '</FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    responseDom = fnPost(requestDom, "FCUBSSignatureServlet", functionId);
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            if (selectSingleNode(responseDom, "//FCUBS_BODY/REC")) {
                loadSubScreenDIV("ChildWin", "CustomerSignView.jsp?");
            }
            else {
                mask();
                if (kvalue == 'S')
                    showAlerts(fnBuildAlertXML('FC-MAINT54', 'E', '', brn), 'E');
                else 
                    showAlerts(fnBuildAlertXML('FC-MAINT55', 'E', '', brn), 'E');
                alertAction = "UNMASK";
            }
        }
        else {
            mask();
            if (kvalue == 'S')
                showAlerts(fnBuildAlertXML('FC-MAINT54', 'E', '', brn), 'E');
            else 
                showAlerts(fnBuildAlertXML('FC-MAINT55', 'E', '', brn), 'E');
            alertAction = "UNMASK";
        }
    }
    gAction = p_gAction;
}

function fndispCustbal(accno, brn) {
    var p_gAction = gAction;
    gAction = "CUSTACCBAL";
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + brn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ADDL><PARAM><NAME>ACCNO</NAME><VALUE><![CDATA[' + accno + ']]></VALUE></PARAM></ADDL><ACTION>CUSTACCBAL</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    if (typeof (dataObj) != "undefined" && dataObj.brnstat == "OFFLINE") {
        responseDom = fnPost(requestDom, "BranchServlet?msgType=NONWORKFLOW&actionType=CustBal&funcid=" + functionId + "&Brn=" + brn + "&Acc=" + accno, functionId);
    }
    else {
        responseDom = fnPost(requestDom, "FCClientHandler", functionId);
    }

    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            loadSubScreenDIV("ChildWin", "CustomerBalance.jsp?");
        }
        else {
            //alert(mainWin.getItemDesc("LBL_INFRA_INVACC"));  
            mask();
            showAlerts(fnBuildAlertXML('FC-MAINT58', 'E'), 'E');
            alertAction = "UNMASK";
        }
    }
    gAction = p_gAction;
}

function mask(unmaskTitleBar) {
    var x = 0, y = 0;
    if (self.innerHeight) {
        x = self.innerWidth;
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        // Explorer 6 Strict Mode
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    }
    else if (document.body) {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    var maskObj = document.getElementById("masker");
    maskObj.style.height = y + "px";
    maskObj.style.width = x + "px";
    maskObj.style.display = "block";
    if (typeof (unmaskTitleBar) != "undefined") {
        maskObj.style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
        document.getElementById("WNDbuttons").disabled = true;
        document.getElementById("WNDbuttons").removeAttribute("href");
    }
}

function unmask(unmaskTitleBar) {
    var maskObj;
    if (document.getElementById("masker"))
        maskObj = document.getElementById("masker");
    else 
        maskObj = parent.document.getElementById("masker");
    maskObj.style.height = 0 + "px";
    maskObj.style.width = 0 + "px";
    if (typeof (unmaskTitleBar) != "undefined") {
        document.getElementById("WNDbuttons").disabled = false;
        document.getElementById("WNDbuttons").setAttribute("href", "#");
    }
}

function savePwdScreen() {
    var oldPwd = document.getElementById("oldpwd").value;
    var newPwd = document.getElementById("newpwd").value;
    var confPwd = document.getElementById("confnew").value;
    if (fromLogin == "false")
        parent.alertAction = "CHGPWD";
    if (oldPwd == "") {
        var alertXML = fnBuildAlertXML('', 'I', oldPwdMsg);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("oldpwd")[0].focus();
    }
    else if (newPwd == "") {
        var alertXML = fnBuildAlertXML('', 'I', newPwdMsg);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("newpwd")[0].focus();
    }
    else if (confPwd == "") {
        var alertXML = fnBuildAlertXML('', 'I', newConfirmPwdMsg);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("confnew")[0].focus();
    }
    else if (document.getElementById("newpwd").value != document.getElementById("confnew").value) {
        var alertXML = fnBuildAlertXML('SM-00041', 'E');
        showAlerts(alertXML, 'E');
        parent.gAlertMessage = gAlertMessage;
        document.getElementById("newpwd").value = "";
        document.getElementById("confnew").value = "";
        document.getElementById("newpwd").focus();
    }
    else if (document.getElementById("oldpwd").value == document.getElementById("newpwd").value) {
        var alertXML = fnBuildAlertXML('SM-00043', 'E');
        showAlerts(alertXML, 'E');
        parent.gAlertMessage = gAlertMessage;
        document.getElementById("newpwd").value = "";
        document.getElementById("confnew").value = "";
        document.getElementById("newpwd").focus();
    }
    else {
        var newpwd = document.getElementById("newpwd").value;
        if (newpwd == curr_user) {
            var alertXML = fnBuildAlertXML('SM-00042', 'E');
            showAlerts(alertXML, 'E');
            parent.gAlertMessage = gAlertMessage;
            return;
        }
        if (newpwd == fnReverseStr(curr_user)) {
            var alertXML = fnBuildAlertXML('SM-00042', 'E');
            showAlerts(alertXML, 'E');
            parent.gAlertMessage = gAlertMessage;
            return;
        }
        //var passData = 'hdOldPwd=' + oldPwd + '&hdNewPwd=' + newPwd + '&hdNewPwdInCaps=' + hash_pwd_new_InCaps + '&hdConfPwd=' + confPwd;
        var passData = '<OLDPASSWD>' + oldPwd + '</OLDPASSWD><NEWPASSWD>' + newPwd + '</NEWPASSWD><CONFNEWPASSWD>' + confPwd + '</CONFNEWPASSWD>';
        var strFormData = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>PROCESS_USERALERTS</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY>' + passData + '</FCUBS_BODY></FCUBS_REQ_ENV>';
        var objHTTP = createHTTPActiveXObject();
        if (fromLogin == "false")
            objHTTP.open("POST", "PasswordResetServlet?login=false&actionType=ChgPwd", false);
        else 
            objHTTP.open("POST", "PasswordResetServlet?login=true&actionType=ChgPwd", false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.send(strFormData);// Send the Request
        var resp = objHTTP.responseXML;
        mainWin.inactiveTime = 0;
        var respNode = null;
        if (resp != null) {
            respNode = selectSingleNode(resp, "//MESSAGE");
        }
        if (respNode == null) {
            var alertXML = fnBuildAlertXML('', 'I', pwdChangedMsg);
            if (fromLogin == "false")
                parent.alertAction = "UNMASK";
            parent.chgPwd = true;
            showAlerts(alertXML, 'I');
            parent.gAlertMessage = gAlertMessage;
        }
        else {
            var msgArr = fnBuildMsgArr(getXMLString(resp));
            var err_code = "", err = "";
            for (var i in msgArr) {
                err_code = i + "~";
                err = msgArr[i] + "~";
            }
            err_code = err_code.substring(0, err_code.length - 1);
            err = err.substring(0, err.length - 1);
            var alertXML = fnBuildAlertXML(err_code, 'E', err);
            //Fix for 14784839    
            if (err_code.indexOf("~") !=  - 1) {
                err_code = err_code.split("~");
                alertXML = fnBuildAlertXML(err_code[0], 'E', err, err_code[1]);
            }
            //Fix for 14784839   
            showAlerts(alertXML, 'E');
            parent.gAlertMessage = gAlertMessage;
        }
    }
}

function closePwdScreen() {
    unmask();
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    if (fromLogin != "false") {
        parent.reqSignOff();
        parent.location.href = "LoginServlet";
    }
    if (fromLogin == "false") {
        parent.document.getElementById("nav").children[1].children[0].focus();
        parent.document.getElementById("nav").children[1].children[0].className == "navhover";
    }
}

function fnHandleScreenBtn(e) {
    e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (e.shiftKey == true && e.keyCode == 9) {
        if (srcElement.id == "oldpwd" || srcElement.id == "amtFmt") {
            document.getElementById("BTN_CANCEL").focus();
            preventpropagate(e);
            return false;
        }
        else {
            preventpropagate(e);
            return true;
        }
    }
    if (e.keyCode == 9) {
        if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("oldpwd"))
                document.getElementById("oldpwd").focus();
            else 
                document.getElementById("amtFmt").focus();
            preventpropagate(e);
            return false;
        }
        else {
            preventpropagate(e);
            return true;
        }
    }
}

function add2FunctionErrorList(errCode, errDesc) {
    funcErrList[errCode] = errDesc;
    return;
}

function fnReverseStr(str) {
    var retStr = "";
    var s = new String(str);
    for (i = s.length - 1;i >= 0;i--) {
        retStr = retStr + s.charAt(i);
    }
    return retStr;
}

function appendErrorCode(code, anyArg) {
    gErrCodes += code;
    if (anyArg != null && anyArg != "") {
        replaceStr += anyArg;
        replaceStr += "~";
    }
    else 
        replaceStr += "~";
    gErrCodes += "~";
}

function fnFormatUnmask(obj) {
    if (obj && obj.value != "") {
        if (obj.getAttribute("MASK_ID"))
            var maskId = eval(obj.getAttribute("MASK_ID"));
        else var maskId = eval(obj.MASK_ID);
        var MASK_KEY_CHARS = "";
        for (var mi = 0;mi < maskId.length;mi++) {
            var maskCh = maskId.charAt(mi);
            if (maskCh != "#") {
                if (MASK_KEY_CHARS.indexOf(maskCh) ==  - 1) {
                    MASK_KEY_CHARS = MASK_KEY_CHARS + maskCh;
                }
            }
        }
        var txtValMask = obj.value;
        var txtRe = new RegExp("[^" + MASK_KEY_CHARS + "]", "g");
        txtValMask = txtValMask.replace(txtRe, "#");
        if (maskId == txtValMask) {
            var txtValue = obj.value;
            var txtRegExp = new RegExp("[" + MASK_KEY_CHARS + "]", "g");
            txtValue = txtValue.replace(txtRegExp, "");
            obj.value = txtValue;
        }
        else {
            alert(mainWin.getItemDesc("LBL_INVALID_MASK"));
            return false;
        }
    }
}

/* Changes for AUTO_LOV start */
var autoRedCriteria = "";

function disp_auto_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, e) {
    if (hotKeyPressed) {
        hotKeyPressed = false;
        return;
    }
    if (typeof (scrChild) != "undefined" && scrChild == "Y") {
        if (thirdChar == "S") {
            containerId = parentFunction.substring(2, 0) + "S" + parentFunction.substring(3, parentFunction.length)
        }
        else {
            containerId = parentFunction;
        }
    }
    if (mainWin.autoLovReqd != 'Y')
        return;
    if (isLovOpen)
        return;

    if ((dbDataDOM == null || gAction == "")) {
        return;
    }
    var event = window.event || e;
    var elem = getEventSourceElement(event);
    autoRedCriteria = elem.value;
    if (autoRedCriteria == "")
        return;
    lovSrcElem = getEventSourceElement(event);
    if (lovSrcElem.getAttribute("PREVAUTOLOVVAL") == lovSrcElem.value) {
        return;
    }
    if (lovSrcElem.readOnly == true) {
        return;
    }
    /*if (blockId != "" && selectSingleNode(dbDataDOM, getXPathQuery(blockId)+"[@ID="+dbIndexArray[blockId]+"]/"+fieldName) != null) {
        if (getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(blockId)+"[@ID="+dbIndexArray[blockId]+"]/"+fieldName)) == lovSrcElem.value)
            return;
    }*/
    var isME = "false";
    var singleView = "false";
    appendData();
    if (!mainWin.isSessionActive())
        return;
    var lovType = 'Y';
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") ==  - 1) {
        for (var i = 0;i < multipleEntryIDs.length;i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                break;
            }
        }
    }
    if (recordNum < 0)
        recordNum = 0;

    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = "true";
        recordNum = 0;
    }

    if (functionId == "CSCFNUDF") {
        if (blockId == "BLK_UDF_DETAILS_VIEW") {
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + (Number(fieldName.substring(fieldName.length - 1)) + 1) + "']/FLDNAM"));
            retflds[blockId + "__" + fieldName + "__" + lovId] = blockId + "__" + fieldName + "~~";
            bndFlds[blockId + "__" + fieldName + "__" + lovId] = bndFlds["BLK_UDF_DETAILS__FLDVAL__" + lovId];
            dbIndexArray["BLK_UDF_DETAILS"] = Number(fieldName.substring(6)) + 1;
        }
        else 
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + dbIndexArray["BLK_UDF_DETAILS"] + "']/FLDNAM"));
    }
    else if (functionId == "CSCTRUDF") {
        udfLovId = document.getElementsByName("FLDNAME")[recordNum].value;
    }
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }

    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") {
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
    }

    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    if (udfLovId != "")
        l_Params += "&lovId=" + udfLovId;
    else 
        l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    }
    else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    /*if(typeof(txnBranchUC)!="undefined"){
        l_Params +="&txnBranchUC="+txnBranchUC;
    }*/
    if (blockId != '') {
        returnFlds = retflds[blockId + "__" + fieldName + "__" + lovId];
        var bindFlds = bndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        if (bindFlds[0] != "") {
            for (var i = 0;i < bindFlds.length;i++) {
                var bindStr = bindFlds[i].split("!");
                var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
                var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
                if (dbDataDOM != null && selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
                    bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~";
                }
                else {
                    bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
                }
            }
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    }
    else {
        returnFlds = retflds[lovId];
    }
    var orderBy = "";
    if (typeof (autoRedCriteria) == "undefined" || autoRedCriteria == "" || autoRedCriteria == null) {
        var field_namesArr = returnFlds.split("~");
        var field_names_recNum = parseInt(recordNum, 10);
        for (var i = 0;i < field_namesArr.length - 1;i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") ==  - 1)
                fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0;j < lovBlkObj.length;j++) {
                    if (getInnerText(lovBlkObj[j]) != " ") {
                        var lovFldObj = "";
                        if (lovBlkObj[j].children.length > 0) {
                            if (!lovBlkObj[j].children[1]) {
                                if (!lovBlkObj[j].children[0].children[0]) {
                                    lovFldObj = lovBlkObj[j].children[0];
                                }
                                else {
                                    lovFldObj = lovBlkObj[j].children[0].children[0];
                                }
                            }
                            else {
                                lovFldObj = lovBlkObj[j].children[1];
                            }
                        }
                        if (lovFldObj.name == fldName) {
                            lovFldObj.value = "";
                        }
                    }
                }
            }
            else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    document.getElementById(field_namesArr[i]).value = "";
                    if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") !=  - 1)
                        getNextSibling(document.getElementById(field_namesArr[i])).value = "";
                }
                else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        document.getElementsByName(fldName)[field_names_recNum].value = "";
                        if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") !=  - 1)
                            getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = "";
                    }
                }
            }
        }
        return false;
    }
    var flag = getAutoLovResults("FLEXCUBE", functionId, blockId, fieldName, lovId, bindFldsStr, orderBy, lovType, recordNum, containerId, autoRedCriteria, isME);
    isAutoLOVOpened = false;
    if (flag) {
        redValue = autoRedCriteria;
        isAutoLOVOpened = true;
        if (typeof (lovVal) != "undefined") {
            if (typeof (lovVal[blockId + "__" + fieldName + "__" + lovId] != "undefined")) {
                if (lovVal[blockId + "__" + fieldName + "__" + lovId] == "N") {
                    isAutoLOVOpened = false;
                    return;
                }
            }
        }
        if (getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA")) == "") {
            l_Params += "&autoLovResp=" + "";
            l_Params += "&pageCount=" + "";
        }
        else {
            var intTotPgs = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//TOTALPAGES"));
            var fldList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//FLDLIST"));
            var redFldTypeList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDFLDTYPELIST"));
            var lblList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//LABELLIST"));
            var redLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDLIST"));
            var vLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//VLIST"));

            if (intTotPgs == 0)
                intTotPgs = 1;
            else 
                intTotPgs = intTotPgs;
            l_Params += "&pageCount=" + intTotPgs;
            // l_Params+="&AUTOLovResult="+getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
            l_Params += "&fldList=" + fldList;
            l_Params += "&redFldTypeList=" + redFldTypeList;
            l_Params += "&lblList=" + lblList;
            l_Params += "&redLIst=" + redLIst;
            l_Params += "&vLIst=" + vLIst;
            AUTOLovResult = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
        }
        l_Params += "&bindFldsStr=" + bindFldsStr;
        isLovOpen = true;
        mask();
        loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
        //  fnEventsHandler('fnPostDispLov_' + lovId);
    }
}

function disp_auto_offlinelov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, e) {
    if (hotKeyPressed) {
        hotKeyPressed = false;
        return;
    }
    if (mainWin.autoLovReqd != 'Y')
        return;
    if (isLovOpen)
        return;

    if (dbDataDOM == null || gAction == "") {
        return;
    }
    var event = window.event || e;
    var elem = getEventSourceElement(event);
    autoRedCriteria = elem.value;
    lovSrcElem = getEventSourceElement(event);
    if (lovSrcElem.getAttribute("PREVAUTOLOVVAL") == lovSrcElem.value) {
        return;
    }
    if (lovSrcElem.readOnly == true) {
        return;
    }
    /*if (blockId != "" && selectSingleNode(dbDataDOM, getXPathQuery(blockId)+"[@ID="+dbIndexArray[blockId]+"]/"+fieldName) != null) {
        if (getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(blockId)+"[@ID="+dbIndexArray[blockId]+"]/"+fieldName)) == lovSrcElem.value)
            return;
    }*/
    var isME = "false";
    var singleView = "false";
    appendData();
    if (!mainWin.isSessionActive())
        return;
    var lovType = 'N';
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") ==  - 1) {
        for (var i = 0;i < multipleEntryIDs.length;i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                break;
            }
        }
    }
    if (recordNum < 0)
        recordNum = 0;

    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = "true";
        recordNum = 0;
    }
    if (document.getElementById(blockId + "__" + fieldName) && document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.getAttribute("VIEW")) {
        if (document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.VIEW == "SE") {
            isME = "false";
            recordNum = 0;
        }
    }
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }
    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") {
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
    }
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    if (udfLovId != "")
        l_Params += "&lovId=" + udfLovId;
    else 
        l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    }
    else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    /*if(typeof(txnBranchUC)!="undefined"){
        l_Params +="&txnBranchUC="+txnBranchUC;
    }*/
    if (typeof (autoRedCriteria) != "undefined") {
        redValue = autoRedCriteria;
    }
    else {
        redValue = "";
    }
    if (blockId != '') {
        returnFlds = offlineRetflds[blockId + "__" + fieldName + "__" + lovId];
        var bindFlds = offlineBndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        if (bindFlds[0] != "") {
            for (var i = 0;i < bindFlds.length;i++) {
                var bindStr = bindFlds[i].split("!");
                var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
                var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
                if (dbDataDOM != null && selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
                    bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~";
                }
                else {
                    bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
                }
            }
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    }
    else {
        returnFlds = offlineRetflds[lovId];
    }

    var orderBy = "";
    if (typeof (autoRedCriteria) == "undefined" || autoRedCriteria == "" || autoRedCriteria == null) {
        var field_namesArr = returnFlds.split("~");
        var field_names_recNum = parseInt(recordNum, 10);
        for (var i = 0;i < field_namesArr.length - 1;i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") ==  - 1)
                fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0;j < lovBlkObj.length;j++) {
                    if (getInnerText(lovBlkObj[j]) != " ") {
                        var lovFldObj = "";
                        if (lovBlkObj[j].children.length > 0) {
                            if (!lovBlkObj[j].children[1]) {
                                if (!lovBlkObj[j].children[0].children[0]) {
                                    lovFldObj = lovBlkObj[j].children[0];
                                }
                                else {
                                    lovFldObj = lovBlkObj[j].children[0].children[0];
                                }
                            }
                            else {
                                lovFldObj = lovBlkObj[j].children[1];
                            }
                        }
                        if (lovFldObj.name == fldName) {
                            lovFldObj.value = "";
                        }
                    }
                }
            }
            else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    document.getElementById(field_namesArr[i]).value = "";
                    if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") !=  - 1)
                        getNextSibling(document.getElementById(field_namesArr[i])).value = "";
                }
                else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        document.getElementsByName(fldName)[field_names_recNum].value = "";
                        if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") !=  - 1)
                            getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = "";
                    }
                }
            }
        }
        return false;
    }
    var flag = getAutoLovResults("FLEXCUBE", functionId, blockId, fieldName, lovId, bindFldsStr, orderBy, lovType, recordNum, containerId, autoRedCriteria, isME);
    isAutoLOVOpened = false;
    if (flag) {
        redValue = autoRedCriteria;
        isAutoLOVOpened = true;
        if (typeof (lovVal) != "undefined") {
            if (typeof (lovVal[blockId + "__" + fieldName + "__" + lovId] != "undefined")) {
                if (lovVal[blockId + "__" + fieldName + "__" + lovId] == "N") {
                    isAutoLOVOpened = false;
                    return;
                }
            }
        }
        if (getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA")) == "") {
            l_Params += "&autoLovResp=" + "";
            l_Params += "&pageCount=" + "";
        }
        else {
            var intTotPgs = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//TOTALPAGES"));
            var fldList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//FLDLIST"));
            var redFldTypeList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDFLDTYPELIST"));
            var lblList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//LABELLIST"));
            var redLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDLIST"));
            var vLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//VLIST"));

            if (intTotPgs == 0)
                intTotPgs = 1;
            else 
                intTotPgs = intTotPgs;
            l_Params += "&pageCount=" + intTotPgs;
            // l_Params+="&AUTOLovResult="+getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
            l_Params += "&fldList=" + fldList;
            l_Params += "&redFldTypeList=" + redFldTypeList;
            l_Params += "&lblList=" + lblList;
            l_Params += "&redLIst=" + redLIst;
            l_Params += "&vLIst=" + vLIst;
            AUTOLovResult = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
        }
        l_Params += "&bindFldsStr=" + bindFldsStr;
        isLovOpen = true;
        mask();
        loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
    }
}

var AUTOLovRequestDOM = null;
var AUTOLovResponseDOM = null;

function getAutoLovResults(source, functionId, blockId, fldName, lovId, bindFlds, orderBy, lovType, recNum, containerId, redCriteria, isME) {

    var cnt = 0;
    var serverURL = "ExtLovFetchData?";
    var labelArrLength = "1";
    serverURL += "Source=" + source;
    serverURL += "&functionId=" + containerId;
    serverURL += "&blockId=" + blockId;
    serverURL += "&fldName=" + fldName;
    serverURL += "&lovId=" + lovId;
    serverURL += "&RedFldNames=" + redCriteria;
    serverURL += "&orderBy=" + orderBy;
    serverURL += "&bndVar=" + bindFlds;
    serverURL += "&fetchSize=25";
    serverURL += "&columnList=" + labelArrLength;
    serverURL += "&containerId=" + containerId;
    serverURL += "&fieldName=" + fldName;
    serverURL += "&screenType=" + mainWin.gActiveWindow.screenType;
    serverURL += "&TotalPages=";
    serverURL += "&CurPage=1";
    serverURL += "&lovType=" + lovType;
    if (typeof (g_txnBranch) == "undefined") {
        serverURL += "&txnBranch=" + mainWin.CurrentBranch;
    }
    else {
        serverURL += "&txnBranch=" + g_txnBranch;
    }
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", encodeURI(serverURL), false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(AUTOLovRequestDOM);
    AUTOLovResponseDOM = objHTTP.responseXML;
    mainWin.inactiveTime = 0;
    var field_namesArr = returnFlds.split("~");
    var field_names_recNum = parseInt(recNum, 10);
    var fieldValuesArr = new Array();
    //var resAutoValue = getNodeText(AUTOLovResponseDOM.childNodes[0]).split("!");
    var resAutoValue = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA")).split("!");
    var resValue = resAutoValue[0].split("~");
    for (var i = 0;i < resValue.length - 1;i++) {
        fieldValuesArr[i] = resValue[i];
    }
    if (resAutoValue == "" || resAutoValue.length > 2) {
        if (typeof (lovVal) == "undefined" || (typeof (lovVal) != "undefined" && typeof (lovVal[blockId + "__" + fldName + "__" + lovId]) == "undefined") || (typeof (lovVal) != "undefined" && typeof (lovVal[blockId + "__" + fldName + "__" + lovId]) != "undefined" && lovVal[blockId + "__" + fldName + "__" + lovId] == "Y")) {
            for (var i = 0;i < field_namesArr.length - 1;i++) {
                var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
                if (field_namesArr[i].indexOf("__") ==  - 1)
                    fldName = field_namesArr[i];
                if (isME == 'true') {
                    var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                    for (var j = 0;j < lovBlkObj.length - 1;j++) {
                        var lovFldObj = "";
                        if (lovBlkObj[j].children.length > 0) {
                            if (!lovBlkObj[j].children[1]) {
                                if (!lovBlkObj[j].children[0].children[0]) {
                                    lovFldObj = lovBlkObj[j].children[0];
                                }
                                else {
                                    lovFldObj = lovBlkObj[j].children[0].children[0];
                                }
                            }
                            else {
                                lovFldObj = lovBlkObj[j].children[1];
                            }
                        }
                        if (lovFldObj.name == fldName) {
                            lovFldObj.value = "";
                        }
                    }
                }
                else {
                    if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                        document.getElementById(field_namesArr[i]).value = "";
                        if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") !=  - 1)
                            getNextSibling(document.getElementById(field_namesArr[i])).value = "";
                    }
                    else if (fldName != "" && document.getElementsByName(fldName)) {
                        if (document.getElementsByName(fldName).length > 0) {
                            document.getElementsByName(fldName)[field_names_recNum].value = "";
                            if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") !=  - 1)
                                getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = "";
                        }
                    }
                }
            }
        }
        if (resAutoValue == "")
            autoRedCriteria = "";
        return true;
    }
    else {
        for (var i = 0;i < field_namesArr.length - 1;i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") ==  - 1)
                fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0;j < lovBlkObj.length - 1;j++) {
                    var lovFldObj = "";
                    if (lovBlkObj[j].children.length > 0) {
                        if (!lovBlkObj[j].children[1]) {
                            if (!lovBlkObj[j].children[0].children[0]) {
                                lovFldObj = lovBlkObj[j].children[0];
                            }
                            else {
                                lovFldObj = lovBlkObj[j].children[0].children[0];
                            }
                        }
                        else {
                            lovFldObj = lovBlkObj[j].children[1];
                        }
                    }
                    if (lovFldObj.name == fldName) {
                        lovFldObj.value = fieldValuesArr[i];
                        if (lovFldObj.type.toUpperCase() == 'CHECKBOX') {
                            if (typeof (lovFldObj.getAttribute("ON")) != "undefined") {
                                if (lovFldObj.getAttribute("ON") == fieldValuesArr[i]) {
                                    lovFldObj.checked = true;
                                }
                                else {
                                    lovFldObj.checked = false;
                                }
                            }
                            else {
                                if (fieldValuesArr[i] == 'Y') {
                                    lovFldObj.checked = true;
                                }
                                else {
                                    lovFldObj.checked = false;
                                }
                            }
                        }
                        else if (lovFldObj.type.toUpperCase() == 'RADIO') {
                            setRadioButtonsData(lovFldObj, fieldValuesArr[i]);
                        }
                    }
                }
            }
            else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                        if (typeof (document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                            if (document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i]) {
                                document.getElementById(field_namesArr[i]).checked = true;
                            }
                            else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        }
                        else {
                            if (fieldValuesArr[i] == 'Y') {
                                document.getElementById(field_namesArr[i]).checked = true;
                            }
                            else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        }
                    }
                    else if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'RADIO') {
                        setRadioButtonsData(document.getElementById(field_namesArr[i]), fieldValuesArr[i]);
                    }
                    else {
                        var reg = new RegExp('<br/>', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
                        document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                        if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") !=  - 1)
                            getNextSibling(document.getElementById(field_namesArr[i])).value = fieldValuesArr[i];
                    }
                }
                else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        if (document.getElementsByName(field_namesArr[i])[field_names_recNum].type.toUpperCase() == 'CHECKBOX') {
                            if (typeof (document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON")) != "undefined") {
                                if (document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i] == 'Y') {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                                }
                                else {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                                }
                            }
                            else {
                                if (fieldValuesArr[i] == 'Y') {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                                }
                                else {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                                }
                            }
                        }
                        else {
                            var reg = new RegExp('<br/>', "g");
                            fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
                            document.getElementsByName(fldName)[field_names_recNum].value = fieldValuesArr[i];
                            if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") !=  - 1)
                                getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = fieldValuesArr[i];
                        }
                    }
                }
            }
            if (fieldValuesArr[i] == "")
                cnt++;
        }
        if (cnt == field_namesArr.length - 1)
            return;
    }
}

function saveUserSettings() {
    var amtFmt = document.getElementById("amtFmt").value;
    var dtFmt = document.getElementById("dtFmt").value;
    var theme = document.getElementById("theme").value;
    var dboardReqd = document.getElementById("dboardReqd").value;
    var alertHome = document.getElementById("alertHome").value;

    var strFormData = 'amtFmt=' + amtFmt + '&dtFmt=' + dtFmt + '&theme=' + theme + '&dboardReqd=' + dboardReqd + '&alertHome=' + alertHome;
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", "UserSettingsServlet?login=true&actionType=UsrSet", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(strFormData);
    var resp = objHTTP.responseXML;
    mainWin.inactiveTime = 0;
    var alertXML = "";
    var respNode = selectSingleNode(resp, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
    if (respNode == null || getNodeText(selectSingleNode(resp, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")) == "FAILURE") {
        userSettingsChangedMsg = mainWin.getItemDesc("LBL_USER_SETTINGS_NOT_UPDATED");
        alertXML = fnBuildAlertXML('', 'E', userSettingsChangedMsg);
        parent.alertAction = "UNMASK";
        showAlerts(alertXML, 'E');
        parent.gAlertMessage = gAlertMessage;
    }
    else if (getNodeText(selectSingleNode(resp, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")) == "SUCCESS") {
        userSettingsChangedMsg = mainWin.getItemDesc("LBL_USER_SETTINGS_UPDATED");

        var RecnodeList = selectNodes(resp, "//PARAM");
        if (RecnodeList.length >= 2) {
            mainWin.systemDateFormat = getNodeText(RecnodeList[0].childNodes[1]);
            mainWin.nlsAmtFmt = getNodeText(RecnodeList[1].childNodes[1]);
            mainWin.dashboardReqd = getNodeText(RecnodeList[2].childNodes[1]);
            mainWin.alerthomeReqd = getNodeText(RecnodeList[3].childNodes[1]);
            mainWin.gDecimalSymbol = getNodeText(RecnodeList[1].childNodes[1]).substring(0, 1);
            mainWin.gDigitGroupingSymbol = getNodeText(RecnodeList[1].childNodes[1]).substring(1);
        }
        alertXML = fnBuildAlertXML('', 'I', userSettingsChangedMsg);
        if (RecnodeList.length == 1 || RecnodeList.length == 3) {
            parent.alertAction = "USERSET";
            showAlerts(alertXML, 'I');
        }
        else {
            parent.alertAction = "UNMASK";
            showAlerts(alertXML, 'I');
            parent.alertAction = "";
        }
        parent.gAlertMessage = gAlertMessage;
        //}
    }
    //mainWin.document.getElementById("treemenu4").getElementsByTagName("A")[2].focus();
}

function closeUserSettings() {
    unmask();
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    //mainWin.document.getElementById("treemenu4").getElementsByTagName("A")[2].focus();
}

function fnGetParentWin() {
    var parentWin = "";
    if (parentSeqNo && parentSeqNo != "") {
        for (var i = 0;i < mainWin.arrChildWindows.length;i++) {
            if (mainWin.arrChildWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
                break;
            }
        }
    }
    return parentWin;
}

function fndispInstr(fieldValue, fieldName, fieldId, brnFldValue) {
    parentWinParams = new Object();
    if (typeof (fieldName) != "undefined" && fieldName.indexOf("REF") !=  - 1) {
        if (fieldValue != "") {
            parentWinParams.contrefno = fieldValue;
            mainWin.dispHref1("CSDINSTQ", seqNo);
        }
    }
    else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") !=  - 1 || fieldName.indexOf("AC") !=  - 1)) {
        if (fieldValue != "") {
            parentWinParams.accno = fieldValue;
            parentWinParams.branch = brnFldValue;
            mainWin.dispHref1("CSDINSTQ", seqNo);
        }
    }
    else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("CST") !=  - 1 || fieldName.indexOf("CUST") !=  - 1 || fieldName.indexOf("CIF") !=  - 1)) {
        /*fieldName.indexOf("CIF")!= -1 Added*/
        if (fieldValue != "") {
            parentWinParams.custno = fieldValue;
            mainWin.dispHref1("CSDINSTQ", seqNo);
        }
    }
}

function fndispJointAcc(fieldValue, fieldName, fieldId, brnFldValue) {
    parent.parentWinParams = new Object();
    if (typeof (fieldName) != "undefined" && fieldName.indexOf("REF") !=  - 1) {
        if (fieldValue != "") {
            parent.parentWinParams.contrefno = fieldValue;
            mainWin.dispHref1("CSDJNTHD", parent.seqNo);
        }
    }
    else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") !=  - 1 || fieldName.indexOf("AC") !=  - 1)) {
        if (fieldValue != "") {
            parent.parentWinParams.accno = fieldValue;
            parent.parentWinParams.branch = brnFldValue;
            mainWin.dispHref1("CSDJNTHD", parent.seqNo);
        }
    }
    else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("CST") !=  - 1 || fieldName.indexOf("CUST") !=  - 1 || fieldName.indexOf("CIF") !=  - 1)) {
        /*fieldName.indexOf("CIF")!= -1 Added*/
        if (fieldValue != "") {
            parent.parentWinParams.custno = fieldValue;
            mainWin.dispHref1("CSDJNTHD", parent.seqNo);
        }
    }
}

function fndispNotepadDet(fieldValue, fieldName, fieldId, brnFldValue) {
    parent.parentWinParams = new Object();
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") !=  - 1 || fieldName.indexOf("AC") !=  - 1)) {
        if (fieldValue != "") {
            parent.parentWinParams.accno = fieldValue;
            parent.parentWinParams.branch = brnFldValue;
            mainWin.dispHref1("CSDINSTQ", parent.seqNo);
        }
    }
}

function fnOpenTxnBrnScreen(brnCode, funcid, uiName, finalRights, drillDownQry) {
    if (mainWin.multiBranchOperation == 'Y') {
        var currBrn = mainWin.CurrentBranch;
        var istxnBrn = true;
        var l_Params = "currBrn=" + currBrn;
        l_Params += "&istxnBrn=" + istxnBrn;
        if (typeof (funcid) != "undefined") {
            l_Params += "&funcid=" + funcid;
            l_Params += "&uiName=" + uiName;
            l_Params += "&finalRights=" + finalRights;
            l_Params += "&drillDownQry=" + drillDownQry;
        }
        else {
            l_Params += "&funcid=NONWB";
            l_Params += "&uiName=NONWB";
            l_Params += "&finalRights=NONWB";
            l_Params += "&drillDownQry=NONWB";
        }
        mask();
        loadSubScreenDIV("ChildWin", "TxnBranch.jsp?" + l_Params);
    }
    return;
}

function fnShowTxnBrnScreen(brnCode) {
    return true;
}

function fnTxnBranch(retVal) {
    //var isUCAvailable = false;
    if (retVal != "") {
        g_txnBranch = retVal;
        if (!mainWin.txnBranch[g_txnBranch]) {
            if (!fnUpdateTxnBrnVariables(retVal))
                return false;
        }
        if (typeof (functionId) != 'undefined') {
            var title = document.title;
            if (title.indexOf(":::") !=  - 1) {
                var titleBeforeBranch = title.split(":::")[0];
                var scrTitle = titleBeforeBranch + " ::: " + retVal;
            }
            else {
                var scrTitle = document.title + " - " + mainWin.getItemDesc("LBL_TXN_BRANCH") + " ::: " + retVal;
            }
            document.title = scrTitle;
            setInnerText(document.getElementsByTagName("H1")[0], scrTitle);
        }
    }
    return true;
}

function fnSetTxnBranch(brnCode) {
    return true;
}

function fnUpdateTxnBrnVariables(txnBrn) {
    if (!mainWin.txnBranch[g_txnBranch]) {
        var requsetStr = "";
        var responseDOM = null;
        var requestDom = null;
        if (typeof (functionId) != 'undefined') {
            requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + txnBrn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>UCTXNBRANCH</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>' + '<ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
            requestDom = loadXMLDoc(requsetStr);
            responseDom = fnPost(requestDom, "MultiBranchUCFetchServlet", functionId);
        }
        else {
            requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + txnBrn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>CLRU</FUNCTIONID><ACTION>UCTXNBRANCH</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>' + '<ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
            requestDom = loadXMLDoc(requsetStr);
            if (!mainWin.isSessionActive()) {
                event.returnValue = false;
                responseDOM = loadXMLDoc("<SESSION>EXPIRED</SESSION>");
                return responseDOM;
            }
            var strFormData = getXMLString(requestDom);
            var objHTTP = createHTTPActiveXObject();
            objHTTP.open("POST", "MultiBranchUCFetchServlet", false);
            objHTTP.setRequestHeader("Content-Type", "application/xml");
            objHTTP.setRequestHeader("charset", "utf-8");
            objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
            objHTTP.setRequestHeader("TXNBRANCH", txnBrn);
            if (typeof (seqNo) != 'undefined') {
                objHTTP.setRequestHeader("SEQNO", seqNo);
            }
            objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
            objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
            objHTTP.send(strFormData);
            if (objHTTP.status != 200) {
                mask();
                showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText), "I");
                alertAction = "UNMASK";
            }
            else {
                mainWin.inactiveTime = 0;
                var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
                if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                    alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
                }
                else {
                    responseDom = objHTTP.responseXML;
                }
            }
        }
        if (responseDom && getXMLString(responseDom) != "") {
            var msgStat = getNodeText(selectSingleNode(responseDom, "//FCUBS_HEADER/MSGSTAT"));
            if (msgStat == "SUCCESS") {
                var ucVarNames = getNodeText(selectSingleNode(responseDom, "//PARAM/NAME")).split("~");
                var ucVarValues = getNodeText(selectSingleNode(responseDom, "//PARAM/VALUE")).split("~");
                mainWin.txnBranch[txnBrn] = new setTxnBrnInfo(ucVarNames, ucVarValues);
            }
            else {
                alertAction = "TXNBRANERROR";
                showAlerts(getXMLString(selectSingleNode(responseDom, "//FCUBS_ERROR_RESP")), 'E');
                return false;
            }

        }
        return true;
    }
    else {
        return true;
    }
}

function setTxnBrnInfo(ucVarNames, ucVarValues) {
    /*for (var i=0;i<ucVarNames.length;i++) {
        eval("var ucVarNames["+i+"] = ucVarValues["+i+"]");
    }*/
    if (typeof (ucVarValues) == "undefined") {
        this.Lcy = mainWin.Lcy;
        this.AppDate = mainWin.AppDate;
        this.dsnName = mainWin.dsnName;
        this.CurrentBranchName = mainWin.CurrentBranchName;
        this.CurrentCycle = mainWin.CurrentCycle;
        this.CurrentPeriod = mainWin.CurrentPeriod;
        this.BankCode = mainWin.BankCode;
        this.BranchEoi = mainWin.BranchEoi;
        return;
    }
    this.Lcy = ucVarValues[0];
    this.AppDate = ucVarValues[1];
    this.dsnName = ucVarValues[2];
    this.CurrentBranchName = ucVarValues[3];
    this.CurrentCycle = ucVarValues[4];
    this.CurrentPeriod = ucVarValues[5];
    this.BankCode = ucVarValues[6];
    this.BranchEoi = ucVarValues[7];
}

function fnExitTxnBranch(funcid, uiName, finalRights, drillDownQry) {
    unmask();
    var childDivObj = document.getElementById("ChildWin");
    iFrameObj = childDivObj.getElementsByTagName("IFRAME")[0];
    if (navigator.userAgent.toLowerCase().indexOf("opera") !=  - 1) {
        try {
            childDivObj.parentNode.removeChild(childDivObj);
            //iFrameObj.contentWindow.document.documentElement.outerHTML="";
        }
        catch (e) {
            iFrameObj.style.display = 'none';
            iFrameObj.id = 'newiframe';
        }
    }
    else {
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        document.getElementById("Div_ChildWin").removeChild(childDivObj);
    }
    if (typeof (alertAction) != "undefined" && alertAction != "TXNBRANERROR")
        try {
            fnPostCloseTxnBranch();
        }
        catch (e) {
        }
    multiBrnScrOpened = true;
    if (typeof (funcid) == "undefined" || (typeof (funcid) != "undefined" && funcid == "NONWB"))
        fnNew();
    else 
        dispHref(funcid, uiName, finalRights, drillDownQry);
}

function EnableToolbar_buttons(type) {
    switch (type.toUpperCase()) {
        case 'NEW':
            enablebutton('New', 'actions0');
            break;
        case 'COPY':
            enablebutton('Copy', 'actions1');
            break;
        case 'DELETE':
            enablebutton('Delete', 'actions7');
            break;
        case 'CLOSE':
            enablebutton('Close', 'actions5');
            break;
        case 'UNLOCK':
            enablebutton('Unlock', 'actions2');
            break;
        case 'REOPEN':
            enablebutton('Reopen', 'actions6');
            break;
        case 'PRINT':
            enablebutton('Print', 'actions9');
            break;
        case 'AUTHORIZE':
            enablebutton('Authorize', 'actions8');
            break;
        case 'REVERSE':
            enablebutton('Reverse', 'operation3');
            break;
        case 'ROLLOVER':
            enablebutton('Rollover', 'operation2');
            break;
        case 'CONFIRM':
            enablebutton('Confirm', 'operation0');
            break;
        case 'LIQUIDATE':
            enablebutton('Liquidate', 'operation1');
            break;
        case 'HOLD':
            enablebutton('Hold', 'actions3');
            break;
        default :
            enablebutton('Save', 'actions4');
            break;
    }
}

function DisableToolbar_buttons(type) {
    switch (type.toUpperCase()) {
        case 'NEW':
            disablebutton('New', 'actions0');
            break;
        case 'COPY':
            disablebutton('Copy', 'actions1');
            break;
        case 'DELETE':
            disablebutton('Delete', 'actions7');
            break;
        case 'CLOSE':
            disablebutton('Close', 'actions5');
            break;
        case 'UNLOCK':
            disablebutton('Unlock', 'actions2');
            break;
        case 'REOPEN':
            disablebutton('Reopen', 'actions6');
            break;
        case 'PRINT':
            disablebutton('Print', 'actions9');
            break;
        case 'AUTHORIZE':
            disablebutton('Authorize', 'actions8');
            break;
        case 'REVERSE':
            disablebutton('Reverse', 'operation3');
            break;
        case 'ROLLOVER':
            disablebutton('Rollover', 'operation2');
            break;
        case 'CONFIRM':
            disablebutton('Confirm', 'operation0');
            break;
        case 'LIQUIDATE':
            disablebutton('Liquidate', 'operation1');
            break;
        case 'HOLD':
            disablebutton('Hold', 'actions3');
            break;
        default :
            disablebutton('Save', 'actions4');
            break;
    }
}

function enablebutton(type, action) {
    mainWin.document.getElementById(type).disabled = false;
    mainWin.document.getElementById(type).className = "BTNicon";
}

function disablebutton(type, action) {
    mainWin.document.getElementById(type).disabled = true;
    mainWin.document.getElementById(type).className = "BTNiconD";
}

function ShowXMLTab(xmlFile, xslName, scrnName, cid) {
    var imagePath = 'Images/Ext' + strTheme.substring(0, strTheme.indexOf('.css'));
    var html;
    var xmlDoc;
    var applicationName = "";
    var dispSize = "";
    var XslLabels = fnBuildXslLabels();
    xmlDoc = loadXMLFile(xmlFile);
    if (typeof (screenType) != "undefined") {
        if (screenType == "WB") {
            xmlDoc = embeddcall(xmlDoc);
        }
    }
    var xslDoc = loadXSLFile(xslName);
    if (scrnName != "CVS_ADVANCED") {
        g_scrType = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/@TMP_SCR_TYPE"));
        subScrHeaderTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/HEADER/TAB/@ID"));
        subScrBodyTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/BODY/TAB/@ID"));
    }
    else {
        g_scrType = "M";
    }
    var params = new Array();
    params["screen"] = scrnName;
    params["uiXML"] = uiXML;
    params["imgPath"] = imagePath;
    params["displaySize"] = dispSize;
    params["thirdChar"] = thirdChar;
    params["XslLabels"] = XslLabels;
    params["applicationName"] = applicationName;
    if (thirdChar == "S")
        params["functionId"] = parentFunc;
    else 
        params["functionId"] = functionId;
    params["CurTabId"] = cid;
    try {
        getDashboardParams(params);
    }
    catch (e) {
    }

    html = transform(xmlDoc, xslDoc, params);
    gXmlFileName = xmlFile;
    gScreenName = scrnName;
    gXslFileName = xslName;
    return html;
}

function fnLaunchLinkWindow(anchorTag, paramList) {
    var paramListArray = new Array();
    var paramName = '';
    fieldName = '';
    queryString = '';
    if (paramList != '') {
        paramListArray = paramList.split('&');
        for (var index = 0;index < paramListArray.length - 1;++index) {
            paramName = paramListArray[index].split('=')[0];
            fieldName = paramListArray[index].split('=')[1];
            if (document.getElementById(fieldName) && document.getElementById(fieldName).value != '')
                queryString += paramName + '=' + document.getElementById(fieldName).value + '&';
        }
        if (queryString != '') {
            if (anchorTag.href.indexOf('?') ==  - 1)
                anchorTag.href += '?';
            else 
                anchorTag.href += '&';
            anchorTag.href += queryString.substring(0, queryString.length - 1);
        }
    }
}

/*Used for BPEL*/
function getXmlHttpObj(serverUrl, funcId, operation) {
    var objHttp = createHTTPActiveXObject();
    objHttp.open("POST", serverUrl, false);
    objHttp.setRequestHeader("Content-Type", "application/xml");
    objHttp.setRequestHeader("charset", "utf-8");
    objHttp.setRequestHeader("FUNCTIONID", funcId);
    objHttp.setRequestHeader("OPERATION", operation);
    objHttp.setRequestHeader("DBUPLOAD", "FALSE");
    objHttp.setRequestHeader("TXNBRANCH", g_txnBranch);
    objHttp.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHttp.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    return objHttp;
}

function getCalcAmount(amount) {
    amount = amount.replace(gDecimalSymbol, ".");
    return amount;
}

function getIEVersionNumber() {
    var ua = navigator.userAgent;
    var MSIEOffset = ua.indexOf("MSIE ");
    if (MSIEOffset ==  - 1) {
        return 0;
    }
    else {
        return parseFloat(ua.substring(MSIEOffset + 5, ua.indexOf(";", MSIEOffset)));
    }
}

function disableCommonKeys(event) {
    switch (event.keyCode) {
        //FCUBS_12.0_PS_01 Starts
        //9NT1490_11.4P02_SFR#13897908
        case 8:
            return false;
        //9NT1490_11.4P02_SFR#13897908 //FCUBS_12.0_PS_01 Ends
        case 112:
        //F1 = Help
        case 114:
        //F3 = Search
        case 115:
        //F4 = Address History
        case 116:
        //F5 = Refresh
        case 117:
        //F6 = Move to next Frame in FF
        case 118:
        //F7 = Caret Browsing in FF
        case 122:
        //F11 = Full Screen Mode
            fnDisableBrowserKey(event);
            preventpropagate(event);
            try {
                event.keyCode = 0;
            }
            catch (e) {
            }
            return false;
    }
    //FCUBS_12.0_PS_01 Starts
    //9NT1490_11.4P02_SFR#13897908
    if (event.altKey == true) {
        switch (event.keyCode) {
            case 37:
                return false;
            case 39:
                return false;
        }
    }
    //9NT1490_11.4P02_SFR#13897908
    //FCUBS_12.0_PS_01 Ends
    if (event.ctrlKey == true) {
        switch (event.keyCode) {
            case 66:
            //B = Organize Favourities in IE
            case 68:
            //D = Add a Favouritie in IE
            case 69:
            //E = Search Web in IE
            case 70:
            //F = Find in IE
            case 72:
            //H = History in IE
            case 73:
            //I = Manage Favourities in IE
            case 74:
            //J = Manage Feeds in IE
            case 76:
            //L = Open in IE
            case 78:
            //N = Open in IE
            case 79:
            //O = Open in IE
            case 80:
            //P = Print in IE
            case 81:
            //Q = Quick Tab View
            case 82:
            //R = Refresh in IE
            case 84:
            //T = New Tab
            case 87:
            //W = Close window in IE
            case 112:
            //F1 = Help
            case 114:
            //F3 = Search
            case 115:
            //F4 = Close Tab in FF
            case 116:
            //F5 = Refresh
                fnDisableBrowserKey(event);
                preventpropagate(event);
                document.getElementById("fastpath").focus();
                try {
                    event.keyCode = 0;
                }
                catch (e) {
                }
                return false;
        }
    }
}
//9NT1466 Customer Signature and Image Upload changes starts
function fnPopulateAttachMent(pkColName, pkColValues) {
    fileNameArray = new Array();
    if (fcjResponseDOM) {
        pkColArray = pkColName.split("~");
        pkValArray = pkColValues.split("~");
        if (getXMLString(fcjResponseDOM).length > 0) {
            if (selectNodes(fcjResponseDOM, "//ATTACHMENTS/ATTACHMENT")) {
                var attachmentNodes = selectNodes(fcjResponseDOM, "//ATTACHMENTS/ATTACHMENT");
                for (var i = 0;i < attachmentNodes.length;i++) {
                    var node = attachmentNodes[i];
                    var attachMentString = "";
                    attachMentString = "<ATTACHMENT>";
                    for (var pk = 0;pk < pkColArray.length;pk++) {
                        if (pkColArray[pk] == "")
                            continue;
                        attachMentString += "<" + pkColArray[pk] + ">" + pkValArray[pk] + "</" + pkColArray[pk] + ">";
                    }
                    //Changes  for image upload 10.4
                    attachMentString += "<PKVALUES>" + getNodeText(selectSingleNode(node, "PKVALUES")) + "</PKVALUES>";
                    attachMentString += "<PKFIELDS>" + getNodeText(selectSingleNode(node, "PKFIELDS")) + "</PKFIELDS>";
                    //changes end
                    attachMentString += "<IMGFIELDNAME>" + getNodeText(selectSingleNode(node, "IMGFIELDNAME")) + "</IMGFIELDNAME>";
                    attachMentString += "<SEQNO>" + getNodeText(selectSingleNode(node, "SEQNO")) + "</SEQNO>";
                    attachMentString += "<VALUE><![CDATA[" + getNodeText(selectSingleNode(node, "FTYPE")) + "]]></VALUE><FTYPE>" + getNodeText(selectSingleNode(node, "FTYPE")) + "</FTYPE>";
                    attachMentString += "</ATTACHMENT>";
                    attachmentData[i] = attachMentString;
                    fileNameArray[i] = getNodeText(selectSingleNode(node, "FTYPE"));
                    if (getNodeText(selectSingleNode(node, "FTYPE")) == "" || getNodeText(selectSingleNode(node, "FTYPE")) == null) {
                        attachmentData[i] = "";
                        fileNameArray[i] = "";
                    }
                }
            }
        }
    }
}

function fnImageUpload(pkColName, pkColValues, imgFldName, seqNo, e) {
    var imageName = "";
    var rowIndex = getRowIndex(e);
    var functionId = mainWin.document.getElementById("fastpath").value;
    if (rowIndex == 'undefined' || rowIndex < 0) {
        rowIndex = 1;
    }
    var pkNameforFile = "";
    var title = mainWin.getItemDesc("LBL_IMG_UPLOAD");
    var upload = mainWin.getItemDesc("LBL_UPLOAD");
    pkNameforFile = replaceAllChar(pkColValues, "~", "_");
    pkNameforFile = pkNameforFile;
    if (attachmentData.length > 0) {
        imageName = fileNameArray[rowIndex - 1];
    }
    var l_Params = "keyName=" + pkNameforFile;
    l_Params += "&pkColName=" + pkColName;
    l_Params += "&pkColVal=" + pkColValues;
    l_Params += "&seqNo=" + seqNo;
    l_Params += "&image=" + imageName;
    l_Params += "&action=" + gAction;
    l_Params += "&title=" + title;
    l_Params += "&upload=" + upload;
    l_Params += "&imgFieldName=" + imgFldName;
    l_Params += "&rowIndex=" + rowIndex;
    l_Params += "&functionId=" + functionId;
    loadSubScreenDIV("ChildWin", "ImageUpload.jsp?" + l_Params);
}

//9NT1466 Customer Signature and Image Upload changes ends
function fndispCustomer(fieldValue, fieldName, fieldId, brnFldValue) {
    parentWinParams = new Object();
    //9nt1466 changes for iut sfr 584 starts
    if (typeof (seqNo) == "undefined") {
        seqNo = parent.seqNo;
    }
    //9nt1466 changes for iut sfr 584 ends
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("CUS") !=  - 1 || fieldName.indexOf("AC") !=  - 1)) {
        if (fieldValue != "") {
            parentWinParams.custno = fieldValue;
            parentWinParams.branch = brnFldValue;
            mainWin.dispHref1("CSDINSTQ", seqNo);
        }
    }
}

function fndispAccDetails(fieldValue, fieldName, fieldId, brnFldValue) {
    parent.parentWinParams = new Object();
    if (typeof (seqNo) == "undefined") {
        seqNo = parent.seqNo;
    }
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") !=  - 1 || fieldName.indexOf("AC") !=  - 1)) {
        if (fieldValue != "") {
            parent.parentWinParams.accno = fieldValue;
            parent.parentWinParams.branch = brnFldValue;
            mainWin.dispHref1("STDCUSBL", parent.seqNo);
        }
    }
}

/****************************/
function showToolbar(funcid, txnstat, authstat, showExecute) {
    //12012012
    //hideTooolbarIcons();
    /*
    11012012
    if (gActiveWindow || gNumChildWindows > 0){
    } else {
    	return;
    }
    */
    //11012012
    //if (gActiveWindow && gActiveWindow.routingType == "X") {
    if (typeof (routingType) != "undefined" && routingType == "X") {
        ExtshowToolbar(funcid, txnstat, authstat, showExecute);
        return;
    }
    if (funcid == "" || funcid.substring(2, 3) == "S") {
        //fnDisableAllActions();
        for (var l_Itr = 0;l_Itr < actions_arr.length;l_Itr++) {
            //FCIS10.3 Changes
            if (applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = 'BTNiconD';
        /* along with save, the remainting 2 buttons have to be disabled */
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
        /* along with save, the remainting 2 buttons have to be disabled */
        if (gActiveWindow.gAction == "ENTERQUERY") {
            /*
            12012012
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").className = 'BTNicon';
            */
        }

        fnSetImgSrc(actions_arr);
        return;
    }

    var l_Txn_Auth_Stat = "";
    //11012012
    //if (gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") || (gActiveWindow.screenType == "WB")) //FCUBS 10.3 WEBBRANCH CHANGES
    if ((gAction == "NEW" || gAction == "MODIFY") || (screenType == "WB"))//FCUBS 10.3 WEBBRANCH CHANGES
    {
        l_Txn_Auth_Stat = "1~2";// paTCH fix.
    }
    else {
        var l_Txn_Auth_Stat = gnGetTxnAuthStat();
    }
    /*If txnstat and authstat are passed from FID.js*/
    if (typeof (txnstat) == "undefined" || (typeof (txnstat) != "undefined" && txnstat == "")) {
        txnstat = l_Txn_Auth_Stat.split("~")[0];
    }
    if (typeof (authstat) == "undefined" || (typeof (authstat) != "undefined" && authstat == "")) {
        authstat = l_Txn_Auth_Stat.split("~")[1];
    }
    var l_OnceAuth = "N";
    if (mainWin.applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    if (actions_arr) {
        for (var l_Itr = 0;l_Itr < actions_arr.length;l_Itr++) {
            if (mainWin.applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = 'BTNiconD';
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
    }

    var objRights = new Array();
    try {
        //objRights = new fnGetFinalRights();
        objRights = mainWin.document.getElementById("finalFunctionRights").value;
    }
    catch (e) {
        // do nothing if the user doesn't have rights for the branch
    }

    var finalRightsStr = ""
    /*if (objRights[funcid] != "") 
        finalRightsStr = objRights[funcid];
    */
    var funcidPos = objRights.indexOf(funcid);
    if (funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos) + 1, objRights.indexOf(";", funcidPos));
    }
    if (!finalRightsStr) {
        // If it's an invalid function id then return.
        finalRightsStr = "";
    }
    else if (showExecute) {
        // If Enter Query button is pressed, show the Execute Query button.
        // Don't hide all the buttons. RightsString for ExecuteQuery is 65536~ 
        //finalRightsStr = "65536~"; 
    }

    var j = finalarr.length;
    if (funcid && funcid != "") {
        for (i = 0;i < j;i++) {
            finalarr.pop();
        }
        var finalcnt = 0;
        t1 = t[txnstat + '+' + authstat];
        var finalActions = new Array();
        var i = 0, k = 0;
        var addIndex = 0;
        var l_Testing = "";
        while (finalRightsStr.indexOf('~') !=  - 1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights;temp != 0;temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    if (t1 != null) {
                        //Kals Comenting .. APr 30
                        for (z = 0;z < t1.length;z++) {
                            if (t1[z].toUpperCase() == actions_arr[i + addIndex].toUpperCase()) {
                                if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                                    continue;
                                }
                                /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                                    continue;
                                }*/
                                finalarr[k] = actions_arr[i + addIndex];
                                k++;
                                break;
                            }
                        }
                    }
                    else {
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                            continue;
                        }
                        /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                            continue;
                        }*/
                        finalarr[k] = actions_arr[i + addIndex];
                        k++;
                    }
                }
                else 
                    l_Testing = l_Testing + "0";

                i++;
            }

            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }

        var lastAction = "";
        var pDoc = gActiveWindow.document;
        var auth_stat = typeof (pDoc.getElementsByName("AUTH_STAT")[0]) != 'undefined' ? pDoc.getElementsByName("AUTH_STAT")[0] : pDoc.getElementsByName("AUTHSTAT")[0];
        var rec_stat = typeof (pDoc.getElementsByName("RECORD_STAT")[0]) != 'undefined' ? pDoc.getElementsByName("RECORD_STAT")[0] : pDoc.getElementsByName("TXNSTAT")[0];
        if (isSameMakerId()) {
            if (finalarr.length > 0) {
                for (var j = 0;j < finalarr.length;j++) {
                    if (finalarr[j]) {
                        if (finalarr[j].toUpperCase() == 'DELETE') {
                            finalarr.splice(j, 1);
                        }
                    }
                    //Doesn't enable the unlock button before authrorization
                    if (authstat) {
                        if (authstat == "U") {
                            if (finalarr[j]) {
                                if (finalarr[j].toUpperCase() == 'UNLOCK') {
                                    finalarr.splice(j, 1);
                                }
                            }
                        }
                    }
                    else if (auth_stat) {
                        if (auth_stat.checked == false) {
                            if (finalarr[j]) {
                                if (finalarr[j].toUpperCase() == 'UNLOCK') {
                                    finalarr.splice(j, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
        for (i = 0;i < finalarr.length;i++) {
            if (finalarr[i] == lastAction) {
                var temp = finalarr[i + 1];
                finalarr[i + 1] = finalarr[lastElement];
                for (j = i + 2;j < finalarr.length;j++) {
                    temp1 = finalarr[j];
                    finalarr[j] = temp;
                    temp = temp1;
                }
            }
            if (finalarr[i]) {
                document.getElementById(finalarr[i]).disabled = false;
                document.getElementById(finalarr[i]).style.display = "block";
                //document.getElementById(finalarr[i]).className = 'BTNicon';
            }
        }
    }

    fnEnableAcns_OnActionCode(funcid);// action code based
    //If New is enabled then save shud be disabled
    var l_SaveBtn = document.getElementById("Save");
    var l_NewBtn = document.getElementById("New");
    //hOLD Related Code
    if (gNumChildWindows != 0 && gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY")) {
        disableAllTBButtons();//added
        for (var l_Cnt = 0;l_Cnt < actions_arr.length;l_Cnt++) {
            if (actions_arr[l_Cnt].toUpperCase() == "HOLD" || ((gActiveWindow.screenType == "P" || gActiveWindow.screenType == "T") && actions_arr[l_Cnt].toUpperCase() == "ROLLOVER")) {
                continue;
            }
            document.getElementById(actions_arr[l_Cnt]).disabled = true;
            document.getElementById(actions_arr[l_Cnt]).style.display = "none";
            //document.getElementById(actions_arr[l_Cnt]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "block";
        //document.getElementById("Save").className = 'BTNicon';
    }
    // If the LATESTVERNO is 1 and Record is UnAuthorized, and Action id Unlock
    // then Hold shud be enabled if its available in list of actions.
    for (var l_Cnt = 0;l_Cnt < finalarr.length;l_Cnt++) {
        if (finalarr[l_Cnt].toUpperCase() == "HOLD") {
            document.getElementById("Hold").disabled = true;
            document.getElementById("Hold").style.display = "block";
            //document.getElementById("Hold").className = 'BTNiconD';
            if (gNumChildWindows != 0 && gActiveWindow) {
                if (gActiveWindow.gAction == "NEW") {
                    document.getElementById("Hold").disabled = false;
                    document.getElementById("Hold").style.display = "block";
                    //document.getElementById("Hold").className = 'BTNicon';
                }
                else {
                    var l_txnval = getTxnVal_Mapping("CONTSTAT");
                    if (typeof (gActiveWindow.holdStatus) != "undefined")
                        if (gActiveWindow.gAction == "MODIFY" && (l_txnval == "H" || gActiveWindow.holdStatus.toUpperCase() == "HOLD")) {
                            document.getElementById("Hold").disabled = false;
                            document.getElementById("Hold").style.display = "block";
                            //document.getElementById("Hold").className = 'BTNicon';
                        }
                }
            }
        }
    }

    //lIQUIDATE case
    if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "LIQUIDATE") {
        if (finalarr) {
            for (var l_Itr = 0;l_Itr < finalarr.length;l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).style.display = "none";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //Rollover case
    if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "ROLLOVER") {
        if (finalarr) {
            for (var l_Itr = 0;l_Itr < finalarr.length;l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).style.display = "none";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //fcis Delegate case
    if (applicationName == "FCIS") {
        if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "DELEGATE") {
            if (finalarr) {
                for (var l_Itr = 0;l_Itr < finalarr.length;l_Itr++) {
                    document.getElementById(finalarr[l_Itr]).disabled = true;
                    document.getElementById(finalarr[l_Itr]).style.display = "block";
                    //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
                }
            }
            enableSave();
        }
    }
    fnSetImgSrc(actions_arr);
    //FCUBS10.3_WebBranch Changes
    //11012012
    //if (gActiveWindow && gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction != "REVERSE") && (gActiveWindow.gAction != "VIEW") && (gActiveWindow.gAction != "REMOTEAUTH") && (gActiveWindow.gAction != "GENERATE") && (gActiveWindow.gAction != "AUTH")) {
    if (screenType == 'WB' && (gAction != "REVERSE") && (gAction != "VIEW") && (gAction != "REMOTEAUTH") && (gAction != "GENERATE") && (gAction != "AUTH")) {
        fnEnableHoldButton();
    }
    //11012012
    //if (gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH")) {
    if (screenType == 'WB' && (gAction == "REMOTEAUTH" || gAction == "AUTH")) {
        fnEnableAuth();
    }
    //for enabling reverse in WB 
    //FCUBS10.3_WebBranch Changes
    if (gActiveWindow) {
        if ((gActiveWindow.gAction == "REVERSE") || (gActiveWindow.gAction == "GENERATE")) {
            fnEnableReverseButton();
            //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
            //fnEnableGenerateButton();
            if (typeof (mainWin.functionDef[funcid]) != "undefined") {
                if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                    fnEnableGenerateButton();
                }
            }
            else {
                fnEnableGenerateButton();
            }
            //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
        }
    }
}

// Reddy Prasad added
function fnSetImgSrc(actions_arr) {
    for (var l_idx = 0;l_idx < actions_arr.length;l_idx++) {
        var l_str;
        var l_temp = actions_arr[l_idx];
        l_str = InitCap(l_temp);

        //Murali Preformance tunning
        //while(!parent.frames['Global']){}
        // fnWaitProcess(); TODO
        if (mainWin.applicationName == "FCIS" && actions_arr[l_idx] == "ROLLOVER") {
            actions_arr[l_idx] = "DELEGATE";
        }
        if (document.getElementById(actions_arr[l_idx]).disabled) {
            //document.getElementById(actions_arr[l_idx]).firstChild.src = theme_imagesPath + "/Toolbar/ic" + l_str + "_D.gif";
            document.getElementById(actions_arr[l_idx]).disabled = true;
            document.getElementById(actions_arr[l_idx]).style.display = "none";
            //12012012
            //document.getElementById(actions_arr[l_idx]).className = "BTNiconD";
        }
        else {
            //document.getElementById(actions_arr[l_idx]).firstChild.src = theme_imagesPath + "/Toolbar/ic" + l_str + ".gif";
            document.getElementById(actions_arr[l_idx]).disabled = false;
            document.getElementById(actions_arr[l_idx]).style.display = "block";
            //12012012
            //document.getElementById(actions_arr[l_idx]).className = "BTNicon";
        }
    }

    if (document.getElementById("Save").disabled) {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = "BTNiconD";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";        
    }
    else {
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "block";
        //document.getElementById("Save").className = "BTNicon";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    }
}

function hideTooolbarIcons() {
    //11012012
    document.getElementById("TlBarOper").className = "TBgp1";
}

// returns the final rights array based on function rights
function finalarrBasedOnFuncRights(funcid, txnstat, authstat) {
    var finalRightsStr = mainWin.getDefaultRightsStr(funcid);
    var j = mainWin.finalarr.length;
    l_OnceAuth = getOnceAuth();
    if (funcid && funcid != "") {
        for (i = 0;i < j;i++) {
            mainWin.finalarr.pop();
        }
        var finalcnt = 0;
        var finalActions = new Array();
        var i = 0, k = 0;
        var addIndex = 0;
        var l_Testing = "";
        var finalRights = "";
        t1 = mainWin.t[txnstat + '+' + authstat];//Fix for SFR 14783869 
        while (finalRightsStr.indexOf('~') !=  - 1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights;temp != 0;temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    //Fix for SFR 14783869 
                    /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') continue;
                    mainWin.finalarr[k] = actions_arr[i + addIndex];
                    k++;*/
                    if (t1 != null) {
                        for (z = 0;z < t1.length;z++) {
                            if (t1[z].toUpperCase() == actions_arr[i + addIndex].toUpperCase()) {
                                if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                                    continue;
                                }
                                mainWin.finalarr[k] = actions_arr[i + addIndex];
                                k++;
                                break;
                            }
                        }
                    }
                    else {
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                            continue;
                        }
                        mainWin.finalarr[k] = actions_arr[i + addIndex];
                        k++;
                    }
                    //Fix for SFR 14783869 
                }
                else 
                    l_Testing = l_Testing + "0";
                i++;
            }
            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }
        var lastAction = "";
        for (i = 0;i < mainWin.finalarr.length;i++) {
            if (mainWin.finalarr[i] == lastAction) {
                var temp = mainWin.finalarr[i + 1];
                mainWin.finalarr[i + 1] = mainWin.finalarr[lastElement];
                for (j = i + 2;j < mainWin.finalarr.length;j++) {
                    temp1 = mainWin.finalarr[j];
                    mainWin.finalarr[j] = temp;
                    temp = temp1;
                }
            }

            if (mainWin.finalarr[i]) {
                document.getElementById(mainWin.finalarr[i]).disabled = false;
                document.getElementById(mainWin.finalarr[i]).style.display = "none";
                //document.getElementById(mainWin.finalarr[i]).className = 'BTNicon';
            }
        }
        return mainWin.finalarr;
    }
}

function ExtfnEnableAcns_OnActionCode(funcid, finalarr, action_arr) {

    // If no windows are opened then , disable all the actions
    /*
    11012012
    if (gNumChildWindows == 0)
        return;
    */
    /*
    if (gNumChildWindows == 0)
    {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++)
        {
            //document.getElementById(actions_arr[l_Itr]).style.visibility = "hidden";
            //document.getElementById("Save").style.visibility = "hidden";
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById("Save").className = 'BTNiconD';
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").className = 'BTNiconD';
        }
        return;
    }
    if (gNumChildWindows > 0)
    {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++)
        {
            //document.getElementById(actions_arr[l_Itr]).style.visibility = "";
            //document.getElementById("Save").style.visibility = "";
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById("Save").className = 'BTNiconD';
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").className = 'BTNiconD';
        }
    }
    if (funcid == "") {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className ='BTNiconD';
        }
        return;
    }
    */

    //Murali performance tunning
    //while(!parent.gActiveWindow) {}  
    //while(!parent.gActiveWindow.dbDataDOM && parent.gActiveWindow.dbDataDOM!=null){} //ctcb 10.1 lot1 fixes
    //fnWait();
    //setTimeout('fnEnableAcns_OnActionCode()',20);
    //FCJ BranchEoi will be N normal,F - end of finanical input,T - end of transaction input,..
    // in cas eof fcis --> N - Online , T - Offline.
    var l_OfflineAllowed = 'N';
    //11012012
    //var functionId = document.getElementById("fastpath").value.toUpperCase();
    var functionId = mainWin.document.getElementById("fastpath").value.toUpperCase();
    /*
    try
    {
        var xmlDOM = new ActiveXObject('Msxml2.DOMDocument.6.0');
    } catch(e)
    {
        var xmlDOM = new ActiveXObject('Msxml2.DOMDocument.4.0');
    }
    xmlDOM.loadXML(parent.gXmlMenu);
    */
    //11012012
    //var xmlDOM = loadXMLDoc(gXmlMenu);
    var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + functionId + "']");
    //Changes for new menuXML starts
    if (functionIdNode) {
        for (var i = 0;i < functionIdNode.attributes.length;i++) {
            if (functionIdNode.attributes[i].nodeName == "OFFLINEALLOWED") {
                l_OfflineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
                break;
            }
        }
    }
    //11012011
    //if (gActiveWindow && gActiveWindow.gAction == "") {
    if (gAction == "") {
        if (dbDataDOM == null) {
            for (var l_Cnt = 0;l_Cnt < finalarr.length;l_Cnt++) {
                if (finalarr[l_Cnt].toUpperCase() == "NEW") {
                    if (mainWin.BranchEoi == 'N') {
                        document.getElementById(finalarr[l_Cnt]).disabled = false;
                        document.getElementById(finalarr[l_Cnt]).style.display = "block";
                        //document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        document.getElementById("EnterQuery").disabled = false;
                        document.getElementById("EnterQuery").style.display = "block";
                        //document.getElementById("EnterQuery").className = 'BTNicon';
                    }
                    else {
                        if (l_OfflineAllowed != "Y") {
                            document.getElementById(finalarr[l_Cnt]).disabled = true;
                            document.getElementById(finalarr[l_Cnt]).style.display = "none";
                            //document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                            disableActionsInToolbar();
                        }
                        else {
                            document.getElementById(finalarr[l_Cnt]).disabled = false;
                            document.getElementById(finalarr[l_Cnt]).style.display = "block";
                            //document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        }
                    }
                }
                else {
                    document.getElementById(finalarr[l_Cnt]).disabled = true;
                    document.getElementById(finalarr[l_Cnt]).style.display = "none";
                    //document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                }
            }
        }
    }

    /*if ((gActiveWindow && gActiveWindow.gAction == "ENTERQUERY")) {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
    }
    */
    //11012012
    //if (funcid.charAt(2).toUpperCase() == "S" || (BranchEoi != "N" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1) && gActiveWindow.l_offlineAllowed != 'Y'))
    if (funcid.charAt(2).toUpperCase() == "S" || (mainWin.BranchEoi != "N" && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) ==  - 1) && l_offlineAllowed != 'Y')) {
        // Summary case
        for (var l_Itr = 0;l_Itr < finalarr.length;l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).style.display = "none";
            //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").children[0].className = "BTNiconD";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    }
    //showtoolbar tuning
    fnSetImgSrc(action_arr);
    changeSaveImg();
}
//fnc
//If the delete button is enabled and once_auth for the record is yes, 
//then disable the delete button
function gnGetOnceAuth() {
    var l_Once_Auth = 'N';
    //11012012
    //if (gNumChildWindows != 0 && gActiveWindow)
    //{
    if (document.getElementsByName("ONCE_AUTH").length > 0) {
        if (document.getElementsByName("ONCE_AUTH")[0].value == "Y")
            l_Once_Auth = 'Y';
    }
    //}
    return l_Once_Auth;
}

function ExtshowToolbar(funcid, txnstat, authstat, showExecute) {
    var txn_auth_status = new Array();//Array used to store txn and auth status
    //User just logs in /closes all function id's and toolbar should be disabled
    /*
    11012012
    if (!gActiveWindow || gNumChildWindows == 0) {
        disableAllTBButtons();
        return;
    }*/
    // if function id is null, disable all buttons
    if (gAction == "" && mainWin.CurrentBranch != mainWin.HOBranch && typeof (hoFunction) != 'undefined' && hoFunction == 'Y' && screenType != "WB") {
        disableAllTBButtons();
        if (mainWin.BranchEoi == 'N') {
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "block";
        }
        return;
    }
    if (typeof (funcid) == 'undefined' || funcid == '') {
        disableAllTBButtons();
        //if(gActiveWindow.gAction == "ENTERQUERY"){
        if (gAction == "ENTERQUERY") {
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").style.display = "block";
            //setInnerText(document.getElementById("EnterQuery").children[0], mainWin.getItemDesc("LBL_EXEC_QUERY"));
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").style.display = "none";
        }
        //hideToolBar();
        return;
    }
    //disabling toolbar on launch of summary, callform, Query, batch screens
    var screenTypes = "SCQB";
    //11012012
    //if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && gActiveWindow.screenType != 'WB') { //FCUBS10.3 WEBBRANCH CHANGES
    if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && screenType != 'WB') {
        //FCUBS10.3 WEBBRANCH CHANGES
        disableAllTBButtons();
        return;
    }
    //Disabling toolbar for eod status other than N (Also applicable for host screens)
    //11012012
    //if (BranchEoi != "N" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1)&& gActiveWindow.l_offlineAllowed != 'Y') {
    if (mainWin.BranchEoi != "N" && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) ==  - 1) && l_offlineAllowed != 'Y') {
        disableAllTBButtons();
        return;
    }
    //If dbDataDOM is undefined, disable the tool bar.
    /*
    if (!gActiveWindow.dbDataDOM || typeof(gActiveWindow.dbDataDOM) == 'undefined') {
        disableAllTBButtons();
        return;
    }
    */

    // dbDataDom is empty (Screen just launched without any data)
    //11012012
    //if (gActiveWindow.dbDataDOM == null) {
    if (dbDataDOM == null) {
        //debugger;   
        disableAllTBButtons();
        //11012012
        //finalarr = finalarrBasedOnFuncRights(funcid,'','','');
        finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
        //function that enables or disables the toolbar
        //11012012
        //ExtfnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
        ExtfnEnableAcns_OnActionCode(funcid, finalarr, actions_arr);
        if (mainWin.BranchEoi == 'N') {
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "block";
            //document.getElementById("EnterQuery").className = 'BTNicon';
        }
        //refreshToolBar();
        return;
    }
    else {
        //Obtain final array based on function rights
        //
        //if (gActiveWindow.screenType != "WB") {
        if (screenType != "WB") {
            finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
        }
        //FC11.0 WB CHANGES
        // Getting txn and auth status
        txn_auth_status = getTxnAndAuthStatus();
        /*If txnstat and authstat are passed from FID.js*/
        if (typeof (txnstat) == "undefined" || (typeof (txnstat) != "undefined" && txnstat == "")) {
            txnstat = txn_auth_status[0];
        }
        if (typeof (authstat) == "undefined" || (typeof (authstat) != "undefined" && authstat == "")) {
            authstat = txn_auth_status[1];
        }
        if (txn_auth_status)
        //11012012
        //if (gActiveWindow.screenType == "WB") {
            if (screenType == "WB") {
                if (gAction == "NEW" || gAction == "HOLD" || gAction == "") {
                    gAction = "NEW";
                    disableAllTBButtons();//fc11.1wb changes
                    enableSave();

                    // FCUBS 11.4 Confirmation Changes Starts             
                    if (typeof (dataObj) != "undefined" && dataObj.action == "ENRICH") {
                        if (typeof (mainWin.functionDef[funcid]) != "undefined")//11.4.0 ITR2 SFR 13483671 
                        {
                            //11.4.0 ITR2 SFR 13483671 
                            if (mainWin.functionDef[funcid].slipReqd == "Y") {
                                fnEnableGenerateButton();
                            }
                            if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                                fnEnableConfirmButton();
                            }
                        }
                    }
                    //11.4.0 ITR2 SFR 13483671 
                    // FCUBS 11.4 Confirmation Changes Ends
                    fnEnableHoldButton();
                    enableDeleteForIPR();
                    return;
                }
                if (gAction == "VIEW") {
                    disableAllTBButtons();
                    //11012012
                    //gActiveWindow.gAction = 'VIEW';
                    gAction = 'VIEW';
                    enableDeleteForIPR();
                    //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
                    //1201_16386475 starts
                    //  if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                    if (mainWin.functionDef[funcid].adviceReqd == "Y" && dataObj.oldStageStat == "COM" && dataObj.oldTxnStat == "COM" && dataObj.msgType == '200') {
                        //1201_16386475 Ends
                        fnEnableGenerateButton();
                    }
                    //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
                    return;
                }
                //11012012
                //if (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH") {
                if (gAction == "REMOTEAUTH" || gAction == "AUTH") {
                    disableAllTBButtons();//fc11.1wb changes
                    fnEnableAuth();
                    fnDisableHoldButton();
                    enableDeleteForIPR();
                    return;
                    //fnDisableHoldButton();
                }
                //11012012
                //if ((gActiveWindow.gAction == "REVERSE") || (gActiveWindow.gAction == "GENERATE")) {
                if ((gAction == "REVERSE") || (gAction == "GENERATE")) {
                    disableAllTBButtons();//fc11.1wb changes
                    // FCUBS 11.4 Confirmation Changes Starts
                    //11012012
                    //if(typeof(gActiveWindow.dataObj) != "undefined"){
                    if (typeof (dataObj) != "undefined") {
                        if (dataObj.action == "ENRICH") {
                            enableSave();
                            if (mainWin.functionDef[funcid].slipReqd == "Y") {
                                fnEnableGenerateButton();
                            }
                            if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                                fnEnableConfirmButton();
                            }
                        }
                        else {
                            fnEnableReverseButton();
                            fnEnableGenerateButton();
                            //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
                            if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                                fnEnableGenerateButton();
                            }
                        }
                    }
                    // FCUBS 11.4 Confirmation Changes Starts
                    //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
                    //fnDisableHoldButton();
                    return;
                    //fnDisableHoldButton();
                }
                return;
            }
        // gAction == "" means Action is successfully completed & DbDataDome not=""
        //11012012
        //if ((gActiveWindow.gAction == "" || gActiveWindow.gAction == "EXECUTEQUERY" || gActiveWindow.gAction == "VIEWMNTLOG") && (gActiveWindow.dbDataDOM != null)) {
        if ((gAction == "" || gAction == "EXECUTEQUERY" || gAction == "VIEWMNTLOG") && (dbDataDOM != null)) {
            disableAllTBButtons();
            finalarr = finalarrBasedOnTxnRights(finalarr, funcid, txnstat, authstat);
            //call the function that enables and disables the Tool bar based on the finalArr
            enableOrDisableBasedOnLastAction(finalarr);
            //ExtfnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
            document.getElementById("ExecuteQuery").disabled = true;
            document.getElementById("ExecuteQuery").style.display = "none";
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "block";
            //document.getElementById("EnterQuery").className = 'BTNicon';
            return;
        }
        //enable and disable buttons according to gAction
        //11012012
        //if (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") {
        if (gAction == "NEW" || gAction == "MODIFY") {
            disableAllTBButtons();
            //enableDeleteForIPR(); TODO
            enableHold();
            enableSave();
            //fnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
            return;
        }
        //11012012
        //if (gActiveWindow.gAction == "LIQUIDATE" || gActiveWindow.gAction == "ROLLOVER" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
        if (gAction == "LIQUIDATE" || gAction == "ROLLOVER" || (mainWin.applicationName == "FCIS" && gAction == "DELEGATE")) {
            //if (gActiveWindow.gAction == "DELETE" || gActiveWindow.gAction == "CLOSE" ||gActiveWindow.gAction == "REOPEN" ||gActiveWindow.gAction == "REVERSE" || gActiveWindow.gAction == "ROLLOVER"|| gActiveWindow.gAction == "CONFIRM"|| gActiveWindow.gAction == "LIQUIDATE" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
            for (var l_Itr = 0;l_Itr < finalarr.length;l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).style.display = "block";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
            enableSave();
            return;
        }
        // Problem in obtaining gAction. Disable the toolbar.
        else {
            disableAllTBButtons();
            //hideToolBar();
            return;
        }
    }
}

//returns onceAuth flg
function getOnceAuth() {
    var l_OnceAuth = "N";
    //11012012
    //if (applicationName == "FCJ") {
    if (mainWin.applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    return l_OnceAuth;
}

function InitCap(str) {
    var str = str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
    if (str == "Delegate")
        str = "Rollover";
    return str;
}

//changes the save button image
function changeSaveImg() {
    if (document.getElementById("Save").disabled) {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = "BTNiconD";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    }
    else {
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "block";
        //document.getElementById("Save").className = "BTNicon";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    }

}

function disableAllTBButtons() {
    if (actions_arr) {
        for (var l_Itr = 0;l_Itr < actions_arr.length;l_Itr++) {
            if (mainWin.applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //12012012
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //12012012
        //document.getElementById("Save").className = 'BTNiconD';
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        12012012  
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
    }
    fnSetImgSrc(actions_arr);
    changeSaveImg();
}

//returns the Txn and Auth status
function getTxnAndAuthStatus() {
    var txn_auth_status = new Array();

    var l_Txn_Auth_Stat = "";
    if ((gAction == "NEW" || gAction == "MODIFY") || screenType == 'WB') {
        l_Txn_Auth_Stat = "1~2";// paTCH fix.
    }
    else {
        if (routingType == "X") {
            l_Txn_Auth_Stat = fnGetExtTxnAuthStat();
        }
        else {
            l_Txn_Auth_Stat = gnGetTxnAuthStat();
        }
    }
    txn_auth_status[0] = l_Txn_Auth_Stat.split("~")[0];
    txn_auth_status[1] = l_Txn_Auth_Stat.split("~")[1];

    return txn_auth_status;
}

function fnGetExtTxnAuthStat() {
    //11012012
    //var authStatNode = gActiveWindow.document.getElementsByName("AUTHSTAT");
    var authStatNode = document.getElementsByName("AUTHSTAT");
    var l_AuthVal = getAuthTxnNodeValue(authStatNode);
    /*if (AuthStatNode.checked == true)
        l_AuthVal = AuthStatNode.ON;
    else
        l_AuthVal = AuthStatNode.OFF;
    */
    //11012012
    //var txnStatNode = gActiveWindow.document.getElementsByName("TXNSTAT");
    var txnStatNode = document.getElementsByName("TXNSTAT");
    var l_TxnVal = getAuthTxnNodeValue(txnStatNode);
    /*if (TxnStatNode.type.toUpperCase() == 'CHECKBOX') {
        if (TxnStatNode.checked == true)
            l_TxnVal = TxnStatNode.ON;
        else
            l_TxnVal = TxnStatNode.OFF;
    } else {
        l_TxnVal = parent.gActiveWindow.document.getElementsByName("TXNSTAT")[0].value;
    }
    */
    return (l_TxnVal + "~" + l_AuthVal);
}

function getAuthTxnNodeValue(objAuthTxn) {
    var authTxnNodeValue = "";
    if (objAuthTxn.length != 0) {
        var tagName = objAuthTxn[0].tagName;
        var type = objAuthTxn[0].type;
        switch (tagName.toUpperCase()) {
            case 'SELECT': {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
            case 'TEXTAREA': {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
            default : {
                switch (type.toUpperCase()) {
                    case 'CHECKBOX': {
                        if (objAuthTxn[0].checked) {
                            authTxnNodeValue = objAuthTxn[0].getAttribute("ON");
                        }
                        else 
                            authTxnNodeValue = objAuthTxn[0].getAttribute("OFF");
                        break;
                    }
                    case 'RADIO': {
                        for (var i = 0;i < objAuthTxn.length;i++) {
                            if (objAuthTxn[i].checked) {
                                authTxnNodeValue = objAuthTxn[i].value;
                                break;
                            }
                        }
                        break;
                    }
                    default : {
                        authTxnNodeValue = objAuthTxn[0].value;
                        break;
                    }
                }
            }
        }
        return authTxnNodeValue;
    }
    else {
        return "1~2";
    }
}
// returns the final rights array based on Txn rights
function finalarrBasedOnTxnRights(finalarr, funcid, txnstat, authstat) {
    l_OnceAuth = getOnceAuth();
    if (finalarr) {
        var t1 = mainWin.t[txnstat + '+' + authstat];
        var j = finalarr.length;
        var i = 0, k = 0, x = 0;
        var addIndex = 0;
        var finalArray = new Array();
        if (t1 != null) {
            if (finalarr.length > t1.length) {
                for (var k = 0;k < finalarr.length;k++) {
                    for (var x = 0;x < t1.length;x++) {
                        if (finalarr[k] == t1[x]) {
                            finalArray[finalArray.length] = finalarr[k];
                        }
                    }
                }
            }
            else {
                for (var k = 0;k < t1.length;k++) {
                    for (var x = 0;x < finalarr.length;x++) {
                        if (t1[k] == finalarr[x]) {
                            finalArray[finalArray.length] = t1[k];
                        }
                    }
                }
            }
        }
        else {
            return finalarr;
        }
    }
    return finalArray;
}

function enableOrDisableBasedOnLastAction(finalarr) {
    var lastAction = "";
    for (i = 0;i < finalarr.length;i++) {
        if (finalarr[i] == lastAction) {
            var temp = finalarr[i + 1];
            finalarr[i + 1] = finalarr[lastElement];
            for (j = i + 2;j < finalarr.length;j++) {
                var temp1 = finalarr[j];
                finalarr[j] = temp;
                temp = temp1;
            }
        }

        if (finalarr[i]) {
            document.getElementById(finalarr[i]).disabled = false;
            document.getElementById(finalarr[i]).style.display = "block";
            //document.getElementById(finalarr[i]).className ='BTNicon';
        }
    }
}

function enableHold() {
    for (var l_Cnt = 0;l_Cnt < actions_arr.length;l_Cnt++) {
        if (actions_arr[l_Cnt].toUpperCase() == "HOLD" || ((screenType == "P" || screenType == "T") && actions_arr[l_Cnt].toUpperCase() == "ROLLOVER")) {
            continue;
        }
        document.getElementById(actions_arr[l_Cnt]).disabled = true;
        document.getElementById(actions_arr[l_Cnt]).style.display = "none";
        //document.getElementById(actions_arr[l_Cnt]).className = 'BTNiconD';
    }
    // If the LATESTVERNO is 1 and Record is UnAuthorized, and Action id Unlock
    // then Hold shud be enabled if its available in list of actions.
    for (var l_Cnt = 0;l_Cnt < finalarr.length;l_Cnt++) {

        if (finalarr[l_Cnt].toUpperCase() == "HOLD") {
            document.getElementById("Hold").disabled = true;
            document.getElementById("Hold").style.display = "none";
            //document.getElementById("Hold").className = 'BTNiconD';
            if (gAction == "NEW" || gAction == "MODIFY") {
                document.getElementById("Hold").disabled = false;
                document.getElementById("Hold").style.display = "block";
                //document.getElementById("Hold").className = 'BTNicon';
            }
            else {
                var l_txnval = getTxnVal_Mapping("CONTSTAT");
                if (typeof (holdStatus) != "undefined")
                    if (gAction == "MODIFY" && (l_txnval == "H" || holdStatus.toUpperCase() == "HOLD")) {
                        document.getElementById("Hold").disabled = false;
                        document.getElementById("Hold").style.display = "block";
                        //document.getElementById("Hold").className = 'BTNicon';
                    }
            }
        }
    }
}

function enableDeleteForIPR() {
    if (parent.gTxn != undefined && parent.gTxn != null) {
        if (parent.gTxn == 'IPR' && parent.gStage == 'IPR') {
            document.getElementById("Delete").disabled = false;
            document.getElementById("Delete").style.display = "block";
        }
    }
}

function enableSave() {
    //document.getElementById("Save").className ="BTNicon";
    document.getElementById("Save").disabled = false;
    document.getElementById("Save").style.display = "block";

    /*document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";*/

}

function fnEnableAuth() {
    document.getElementById("Save").disabled = true;
    document.getElementById("Save").style.display = "none";
    //gActiveWindow.gAction ='REMOTEAUTH';
    gAction = 'REMOTEAUTH';
    document.getElementById("Authorize").disabled = false;
    document.getElementById("Authorize").style.display = "block";
}

function fnDoReverse() {
    document.getElementById("Save").disabled = true;
    document.getElementById("Save").style.display = "none";
    document.getElementById("Reverse").disabled = false;
    document.getElementById("Reverse").style.display = "block";
    //mainWin.gActiveWindow.gAction ='REVERSE';
    gAction = 'REVERSE';
}

function fnEnableReverseButton() {

    //document.getElementById("Reverse").firstChild.src = theme_imagesPath + "/Toolbar/icReverse.gif";
    document.getElementById("Reverse").disabled = false;
    document.getElementById("Reverse").style.display = "block";
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.src = theme_imagesPath + "/Toolbar/icReverse.gif";
}

function fnDisableReverseButton() {
    //document.getElementById("Reverse").className ="BTNiconD";
    //document.getElementById("Reverse").firstChild.src = theme_imagesPath + "/Toolbar/icReverse_D.gif";
    document.getElementById("Reverse").disabled = true;
    document.getElementById("Reverse").style.display = "none";
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").disabled = true;
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.className = "BTNiconD";
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.src = theme_imagesPath + "/Toolbar/icReverse_D.gif";
}

function fnEnableGenerateButton() {
    document.getElementById("Generate").disabled = false;
    document.getElementById("Generate").style.display = "block";
}

function fnEnableHoldButton() {
    document.getElementById("Hold").disabled = false;
    document.getElementById("Hold").style.display = "block";
}

function fnDisableHoldButton() {
    document.getElementById("Hold").disabled = true;
    document.getElementById("Hold").style.display = "none";
}

function fnView() {
    mainWin.gActiveWindow.gAction = 'VIEW';
}

function fnEnableConfirmButton() {
    document.getElementById("Confirm").disabled = false;
    document.getElementById("Confirm").style.display = "block";
}

function disableActionsInToolbar() {
    var jIndex = mainWin.finalarr.length;
    document.getElementById("Save").disabled = true;
    for (index = 0;index < jIndex;index++) {
        document.getElementById(mainWin.finalarr[index]).disabled = true;
    }
}

function expandCollapseSection(elem, action) {
    // for(var secCount = 1 ; secCount < secContainer.length; secCount++){
    if (action == 'COLLAPSE') {
        elem.parentNode.parentNode.parentNode.parentNode.childNodes[1].style.display = 'none';
        elem.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.display = 'block';
    }
    else {
        elem.parentNode.parentNode.parentNode.childNodes[1].style.display = 'block';
        elem.parentNode.parentNode.parentNode.childNodes[0].style.display = 'none';
    }
    // }
}

function addEvent(ele, eventType, eventHandler) {
    try {
        if (navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
            if (eventType == "class") {
                ele.setAttribute("className", eventHandler);
            }
        }
        else {
            ele.setAttribute(eventType, eventHandler);
        }
    }
    catch (e) {
        ele.setAttribute(eventType, eventHandler);
    }
}

function getTabId() {

    var itstab = document.getElementById(parent.previewfieldid)

    while (itstab.id.substring(0, 7) != "TBLPage") {
        itstab = itstab.parentNode;
    }
    var tabId1 = itstab.id;
    return tabId1;
}

function fnTabDetails() {
    var tab_obj;
    if (document.getElementById("tablist")) {
        tab_obj = document.getElementById("tablist");
    }
    else if (document.getElementById("dboardtablist")) {
        tab_obj = document.getElementById("dboardtablist");
    }
    if (tab_obj) {
        for (var i = 0;i < tab_obj.children.length;i++) {
            tab_arr[i] = tab_obj.children[i].children[0];
            tab_ids[i] = tab_obj.children[i].children[0].id;
        }
    }
}

function fnSelCheckBox(e, v_rowid) {
    var rowList = document.getElementById("TBL_QryRslts").tBodies[0].rows;
    var event1 = window.event || e;
    var scrElem = getEventSourceElement(event1);
    if (typeof (scrElem) != "undefined" && typeof (scrElem.type) != "undefined" && scrElem.type.toUpperCase() != "CHECKBOX") {
        for (var rowIndex = 0;rowIndex < rowList.length;rowIndex++) {
            if (document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked)
                document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = false;
        }
        if (typeof (v_rowid) != "undefined")
            document.getElementById("TBL_QryRslts").tBodies[0].rows[v_rowid].cells[0].getElementsByTagName("INPUT")[0].checked = true;
    }
}

function fnSortRecs(e) {
    var event = window.event || e;
    var scrElem = getEventSourceElement(event);
    if (document.getElementsByName("Search")[0].disabled == true) {
        if (scrElem.parentNode.getAttribute("name") == 'undefined') {
            var fldName = scrElem.parentNode.name;
        }
        else {
            var fldName = scrElem.parentNode.getAttribute("name");
        }
        var orderType = scrElem.getAttribute("order");
        var imgLen = document.getElementById("TBL_QryRslts").tHead.rows[1].getElementsByTagName("span");
        if (imgLen.length > 0) {
            for (var i = 0;i < imgLen.length;i++) {
                imgLen[i].className = "SPNup hide";
            }
        }
        fnSetImage(true, event);
        var tempDefaultOrderByClause = defaultOrderByClause;
        //fnResetQry();
        defaultOrderByClause = fldName + ">" + orderType;
        travOrderByClause = defaultOrderByClause;/*15903479 */
        fnExecuteQuery_sum('S');/*15903479 - Changed to 'S'- Sort*/
        //fnExecuteQuery_sum('Y', event);
        //defaultOrderByClause = tempDefaultOrderByClause;
        return true;
    }
}

function fnResetQry(e) {
    return true;
}

function fnSubScreenMain(functid, functid, screen, val) {
    return true;
}

function fnUpdateScreenSaverInterval() {
    screenSaverInactiveTime = 0;
}

var subsystem = true;

function fnExpandCollapseSubSys(srcElem) {
    // mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (document.getElementById("DIVSubSystem")) {
        var isLiHidden = false;
        var tempLiPos = 0;
        var firstLiPos = 0;
        var divFooterHgt = document.getElementById("DIVFooter").offsetHeight;
        var clsName = 'subSystemCollapse'
        if (srcElem && !subsystem) {
            clsName = srcElem.getElementsByTagName("SPAN")[0].className;
        }
        subsystem = false;
        var liElemList = document.getElementById("DIVSubSystem").getElementsByTagName("LI");
        if (parent.language != 'ARB') {
            firstLiPos = liElemList[0].offsetLeft;
        }
        else {
            firstLiPos = liElemList[0].offsetLeft + liElemList[0].offsetWidth;
        }
        if (clsName == 'subSystemCollapse') {
            for (var liCnt = 1;liCnt < liElemList.length;liCnt++) {
                if ((parent.language != 'ARB') && (liElemList[liCnt].offsetLeft == firstLiPos) || (parent.language == 'ARB') && ((liElemList[liCnt].offsetLeft + liElemList[liCnt].offsetWidth) == firstLiPos)) {
                    isLiHidden = true;
                    tempLiPos = liCnt;
                    break;
                }
            }
            if (isLiHidden) {
                for (var liCnt = liElemList.length - 1;liCnt >= tempLiPos;liCnt--) {
                    liElemList[liCnt].style.display = 'none';
                }
            }
            if (srcElem) {
                srcElem.getElementsByTagName("SPAN")[0].className = 'subSystemExpand';
                //srcElem.title = mainWin.getItemDesc("LBL_EXPAND_SECTION");
            }
        }
        else {
            for (var liCnt = 1;liCnt < liElemList.length;liCnt++) {
                if (liElemList[liCnt].style.display == 'none') {
                    liElemList[liCnt].style.display = 'block';
                    isLiHidden = true;
                }
            }
            srcElem.getElementsByTagName("SPAN")[0].className = 'subSystemCollapse';
            //srcElem.title = mainWin.getItemDesc("LBL_COLLAPSE_SECTION");
        }
        if (isLiHidden) {
            document.getElementById("DIVSubSystemController").style.height = document.getElementById("DIVSubSystem").offsetHeight + 'px';
            document.getElementById("DIVMainTmp").style.height = document.getElementById("DIVMainTmp").offsetHeight + (divFooterHgt - document.getElementById("DIVFooter").offsetHeight) + 'px';
        }
        else {
            document.getElementById("DIVSubSystemController").style.visibility = "hidden";
        }
    }
}

function getFuncid(funcid) {
    if (window.location.search) {
        var itstab = document.getElementsByName(window.location.search.substring(1));

        if (itstab != null) {
            while (itstab.id.substring(0, 7) != "TBLPage") {
                itstab = itstab.parentElement;
            }
            var tabId1 = itstab.id;
            expandcontent(tabId1);
            DisableFormControls(false);
            document.getElementsByName(window.location.search.substring(1)).style.background = '#FFFF00';
        }
        else 
            self.close();
    }
    else 
        functionId = funcid;
}