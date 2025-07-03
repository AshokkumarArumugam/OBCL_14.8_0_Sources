/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : Palanisamy Muthukumar
**  Date of creation   : 
**  File Name          : LBDPSUPL_KERNEL.js
**  Purpose            : Payables/Receivables Upload
**  Called From        : LBDPRUPL
****************************************************************************************************************************/
/*var fcjResponseDOM;
var fcjRequestDOM;*/
//var gPrevAction;
/* OBCL_CSV_File_Upload_Changes :: Starts */
var gDisableBrowseButton = true;
var blockId = "";//block id to upload the CSV file
var currPg = 1;//current page of the block
var totPg = 1;//total page of the block
var pgSize = 0;//page size to dispaly the datas
var totRow = 0;//total rows of the block
var length = 0;//current length of the block
var fileUploadBtn = "";//file upload object
var errCode = "";//error code
var errParam = "";//error param
var csvRows = "";//rows parser object
var gIsValid = true;
var valid = true;
var negativeNum = false;

function dateFormat(existingFormat, neededFormat, existingSeperator, newSeperator, dateValue) {
    var exst = existingFormat.toLowerCase().split(existingSeperator);
    var d = dateValue.split(existingSeperator);
    d[exst[0]] = d[0];
    d[exst[1]] = d[1];
    d[exst[2]] = d[2];
    var newst = neededFormat.toLowerCase().split(newSeperator);
    newDate = d[newst[0]] + newSeperator + d[newst[1]] + newSeperator + d[newst[2]];
    return (newDate);
}

function fnCheckAnFocusSelectedRow(j) {
    getTableObjForBlock(blockId).tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked = false;
    getTableObjForBlock(blockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = true;
    getTableObjForBlock(blockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].click();
    return true;
}

function fnResetUpload() {
    gDisableBrowseButton = true;
    blockId = "";//block id to upload the CSV file
    currPg = 1;//current page of the block
    totPg = 1;//total page of the block
    pgSize = 0;//page size to dispaly the datas
    totRow = 0;//total rows of the block
    length = 0;//current length of the block
    fileUploadBtn.value = "";//file upload object
    errCode = "";//error code
    errParam = "";//error param
    csvRows = "";//rows parser object
    gIsValid = true;
    valid = true;
    negativeNum = false;
    return true;
}

function fnUpdateBlockLength() {
    if (blockId != undefined && blockId != '' && blockId != "") {
        currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));//current page of the block
        totPg = Number(getInnerText(document.getElementById("TotPage__" + blockId)));//total page of the block
        if (currPg != totPg) {
            Navigate(N_LAST, blockId);//navigate to last page, if the current page not equal to total page
        }
        pgSize = getPgSize(blockId);//page size to dispaly the datas
        totRow = 0;
        length = getTableObjForBlock(blockId).tBodies[0].rows.length;//current length of the block
        currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
        if (length > 0 && length != '' && length != "") {
            for (var idx = 0;idx < length;idx++) {
                totRow = (currPg - 1) * pgSize + idx + 1;//total row
            }
        }
    }
    return true;
}

function fnDeleteAllRowOfUpload() {
    if (blockId != undefined && blockId != '' && blockId != "") {
        fnUpdateBlockLength();
        var deleteCount = 1;
        var focusRow = 0;
        //delete rows, if the rows already have records in the block
        for (var index = 0;index < totRow;index++) {
            fnDeleteRow(blockId);
            deleteCount = deleteCount + 1;
            focusRow = totRow - deleteCount;
            if (totPg > 1) {
                focusRow = focusRow % pgSize;
            }
            if (focusRow > 1) {
                fnCheckAnFocusSelectedRow(focusRow);//focus to the selected row
            }
        }
        appendData();
    }
    return true;
}

function fnCloseAlertWin_ACCEPTOVERRIDE() {
    unmask();//unmasking the screen
    fnDeleteAllRowOfUpload();
    fnUpdateBlockLength();
    var uploadSuccess = fnPayRcvUpload(csvRows);
    if (uploadSuccess) {
        fnUpdateBlockLength();
        if (totRow > 0 && uploadSuccess) {
            var backEndCall = fnBackEndCall();
            if (backEndCall) {
                fnResetUpload();//reset upload parameters
                return true;
            }
            else {
                fnResetUpload();//reset upload parameters
                return false;
            }
        }
    }
    else {
        if (errCode != null && errCode != '' && errCode != "") {
            fnUpdateBlockLength();//current length of block
            fnDeleteAllRowOfUpload();
            if (errParam != null && errParam != '' && errParam != "") {
                var alertMessage = fnBuildAlertMessage(errCode, "E", "", errParam);
            fnResetUpload();
                alert(alertMessage);//display error if upload fails
            }
            else {
                fnResetUpload();
                showErrorAlerts(errCode);//display error if upload fails
            }
            return false;
        }
    }
    customAlertAction = "";
    return true;
}

function fnExitAlertWin_ACCEPTOVERRIDE() {
    fnUpdateBlockLength();
    fnResetUpload();//reset upload parameters
    unmask();//unmasking the screen
    customAlertAction = "";
    return true;
}

function fnPayRcvUploadValidation(rows) {
    for (var i = 0;i < 2;i++) {
        var cells = rows[i].split(",");
        if (cells.length > 1) {
            if (i == 0) {
                if (cells[0].toUpperCase() != '[Payables/Receivables Upload]'.toUpperCase()) {
                    fnResetUpload();//reset upload parameters
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
            if (i == 1) {
                if ( (cells[0].toUpperCase() != 'Contract Reference'.toUpperCase()) || (cells[1].toUpperCase() != 'Component'.toUpperCase()) || (cells[2].toUpperCase() != 'Due date'.toUpperCase()) || (cells[3].toUpperCase() != 'Pay/Receive'.toUpperCase()) ) {
                    fnResetUpload();//reset upload parameters
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
        }
    }
    return true;
}

function fnBackEndCall() {
    g_prev_gAction = gAction;
    //document.getElementById("BLK_OLTBS_CONTRACT_PAY__ORGACTCOD").value = gAction;
    gAction = 'PAYRCVUPLD';
    appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml();//requestDOM
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);//responseDOM
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = "";
        if (msgStatus == "FAILURE") {
            messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
            messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    setDataXML(getXMLString(pureXMLDOM));
    showData(dbStrRootTableName, 1);
    var returnVal = "";
    if (msgStatus == "FAILURE") {
        //delete all rows if message status is 'FAILURE'
        fnDeleteAllRowOfUpload();
        fnResetUpload();//reset upload parameters
        gAction = g_prev_gAction;
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    else if (msgStatus == "WARNING") {
        fnResetUpload();//reset upload parameters
        gAction = g_prev_gAction;
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'O');
        return true;
    }
    else if (msgStatus == "SUCCESS") {
        fnResetUpload();//reset upload parameters
        gAction = g_prev_gAction;
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    }
    return true;
}

function fnPayRcvUpload(rows) {
    var rowCheck = true;//row availability check
    var rowsLength = rows.length - 1;
    for (var i = 2 + length;i < rowsLength + length;i++) {
        //row iteration
        var currIdx = i - 1;//current index of the row in block
        var row = currIdx % pgSize;
        var multiplesPgSize = Math.floor(currIdx / pgSize);
        if ((row == 0) && (multiplesPgSize != 0)) {
            row = pgSize;
        }
        try {
            if (getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) {
                rowCheck = false;//if rowCheck flag is false then, system will not allow to add new row
            }
            if ((rowCheck) || (multiplesPgSize >= 1 && row == 1)) {
                fnAddRow(blockId);//add new row to upload CSV file datas
                appendData();
                fnCheckToggleChkBox(blockId);
                checkAnFocusSelectedRow(blockId);//check and focus to the current row
            }
        }
        catch (e) {
            fnAddRow(blockId);//add new row to upload CSV file datas
            appendData();
            fnCheckToggleChkBox(blockId);
            checkAnFocusSelectedRow(blockId);//check and focus to the current row
        }
        var cells = rows[i - length].split(",");//cells split logic in rows
        if (cells.length > 1) {
            if ((getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) && (rowCheck)) {
                for (var j = 0;j < cells.length - 1;j++) {
                    //cells iteration of current row
                    if (cells[j] == '~END~') {
                        //last cell value in current row
                        continue;//if last cell value is '~END~' then, system will skip current row and continue to the next row      
                    }
                    if (cells[j] != "" && cells[j] != '~END~') {
                        var currObject = getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-select-single")[0];
                        var firstCellHeader = "";
                        var firstCellValue = "";
                        var currentCellHeader = "";
                        if (currObject == undefined) {
                            currObject = getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-input-text")[0];
                            if (currObject == undefined) {
                                currObject = getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("TEXTAREA")[0];
                            }
								if ((currObject.getAttribute("maxlength") != null) && (currObject.getAttribute("maxlength") != undefined) && (currObject.getAttribute("maxlength") < cells[j].length)) {
								firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                currentCellHeader = fnGetHeaderDetails(rows, 1, j);
								errCode = 'LB-UPD-018';
								errParam = currObject.getAttribute("maxlength") + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
								return false;								
							}
                            if (currObject.getAttribute("data_type") == "DATE") {
                                //current object type is 'DATE'
                                currObject.value = dateFormat('mm/dd/yyyy', 'yyyy-mm-dd', '/', '-', cells[j]);//date format parser
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else if ((currObject.type == "hidden") && (currObject.getAttribute("onpropertychange") == "displayFormattedNumber(this)")) {
                                firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                //process for number validation, if the current object is number
                                var validateNumber = validateCSVUploadNumber(currObject, cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                if (validateNumber && gIsValid) {
                                    currObject.value = cells[j];
                                    fireHTMLEvent(currObject, 'onpropertychange');
                                }
                                else {
                                    return false;
                                }
                            }
                            else if ((currObject.type == "hidden") && (getOuterHTML(currObject).indexOf("displayAmount") !=  - 1)) {
                                firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                //process for number validation, if the current object is number
                                var validateAmount = fnValidateCSVUploadAmount(currObject.getAttribute("name"), currObject.getAttribute("related_ccy"), cells[j], currentCellHeader, firstCellValue, firstCellHeader, getNextSibling(getNextSibling(currObject)));
                                if (validateAmount && gIsValid) {
                                    var validateAmtRange = fnValidateCSVUploadNumberRange(getNextSibling(getNextSibling(currObject)), cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                    if (validateAmtRange && gIsValid) {
                                        currObject.value = cells[j];
                                        fireHTMLEvent(currObject, 'onpropertychange');
                                    }
                                    else {
                                        return false;
                                    }
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (currObject.type == "checkbox") {
                                //current object type is 'CHECKBOX'
                                currObject.value = cells[j];
                                if (currObject.value == 'Y') {
                                    currObject.value = true;
                                }
                                else {
                                    currObject.value = false;
                                }
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else {
                                currObject.value = cells[j];
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                        }
                        else {
                            currObject.value = cells[j];//current object type is 'SELECT'
                            fireHTMLEvent(currObject, 'onpropertychange');
                        }
                    }
                }
            }
        }
    }
    appendData();
    return true;
}

function fnPayRcvUpld(e) {
    gDisableBrowseButton = false;
    blockId = "BLK_LBTBS_PAY_RECV_UPLOAD";//block id to upload the CSV file
    fileUploadBtn = document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER__BTN_FILE_UPD");
    evnt = e;//onchange event
    if (gAction == 'NEW' || gAction == 'MODIFY') {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;//file format parser
        if (regex.test(fileUploadBtn.value.toLowerCase())) {
            if (typeof (FileReader) != undefined) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var rows = e.target.result.split("\n");//csv file parser
					document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER__FILE_NAME").value=fileUploadBtn.value.split('\\').pop();
                    var payRcvUploadVal = fnPayRcvUploadValidation(rows);//header validations, system will validate first two rows
                    if (payRcvUploadVal) {
                        fnUpdateBlockLength();
                        if (totRow > 0) {
                            csvRows = rows;
                            customAlertAction = "ACCEPTOVERRIDE";
                            mask();//masking the screen
                            showErrorAlerts("LB-UPD-016", "O", "Payables/Receivables Upload");
                            return false;
                        }
                        else {
                            var uploadSuccess = fnPayRcvUpload(rows);//process upload schedules
                            if (uploadSuccess) {
                                fnUpdateBlockLength();//current length of block
                                if (totRow > 0 && payRcvUploadVal) {
                                    var backEndCall = fnBackEndCall();//back end call to validate uploaded schedules
                                    if (backEndCall) {
                                        fnResetUpload();//reset upload parameters
                                        return true;
                                    }
                                    else {
                                        fnResetUpload();//reset upload parameters
                                        return false;
                                    }
                                }
                            }
                            else {
                                if (errCode != null && errCode != '' && errCode != "") {
                                    fnUpdateBlockLength();//current length of block
                                    fnDeleteAllRowOfUpload();
                                    if (errParam != null && errParam != '' && errParam != "") {
                                        var alertMessage = fnBuildAlertMessage(errCode, "E", "", errParam);
                                    fnResetUpload();
                                        alert(alertMessage);//display error if upload fails
                    }
                    else {
                                        fnResetUpload();//reset upload parameters
                                        showErrorAlerts(errCode);//display error if upload fails
                                    }
                                    return false;
                                }
                            }
                        }
                    }
                    else {
                        fnResetUpload();//reset upload parameters
                        showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file.");
                        return false;
                    }
                }
                reader.readAsText(fileUploadBtn.files[0]);
            }
            else {
                fnResetUpload();//reset upload parameters
                showErrorAlerts("LB-UPD-015");//alert("This browser does not support CSV upload.");
                return false;
            }
        }
        else {
            fnResetUpload();//reset upload parameters
            showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file.");
            return false;
        }
    }
    else {
        fnResetUpload();//reset upload parameters
        showErrorAlerts("LB-UPD-014");//alert("CSV file Upload is not supported for this operation");
        return false;
    }
    gDisableBrowseButton = true;
    return true;
}


function fnGetHeaderDetails(rows, i, j) {
    var cells = rows[i].split(",");
    if (cells.length > 1) {
        if (i == 0) {
            return cells[j];//returns upload CSV header.
        }
        if (i >= 1) {
            return cells[j];//returns current cell header for display
        }
    }
    return null;
}

function getSum(total, num) {
    return total + num;
}

function fnBuildAlertMessage(alertCode, type, message, replaceString) {
    if (typeof (message) == "undefined" || (typeof (message) != "undefined" && message == "")) {
        var alertCodes = alertCode.split("~");
        message = "";
        for (var i = 0;i < alertCodes.length;i++) {
            if (alertCodes[i] != "") {
                var tempmessage = mainWin.getCommonErrorList()[alertCodes[i]];
                if (tempmessage == undefined) {
                    message += mainWin.getItemDesc("LBL_UNKNOWN_ERROR") + "~";
                }
                else {
                    if (typeof (replaceString) != "undefined") {
                        replaceString = replaceString + "";
                        var replaceStr = replaceString.split("~");
                        for (var j = 0;j < replaceStr.length;j++) {
                            if (replaceStr[j] != "") {
                                var findReplaceStr = '$' + getSum(j, 1);
                                tempmessage = tempmessage.replace(findReplaceStr, replaceStr[j]);
                                //tempmessage = tempmessage.replace('{0}', replaceStr[j]);
                            }
                        }
                    }
                    message += tempmessage.split("~")[0];
                    message += "~";
                }
            }
        }
        message = message.substring(0, message.length - 1);
    }
    return message;
}

function validateCSVUploadNumber(dispNumField, dispNumFieldValue, currentCellHeader, firstCellValue, firstCellHeader) {
    var arrNumComponents = "";
    if (dispNumFieldValue == "") {
        return true;
    }
    if (gDecimalSymbol != ".") {
        arrNumComponents = dispNumFieldValue.match(new RegExp(gDecimalSymbol, 'g'));
    }
    else {
        arrNumComponents = dispNumFieldValue.match(/\./g);
    }
    if (arrNumComponents != null && (arrNumComponents.length > 1)) {
        errCode = 'LB-UPD-023';
        errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    //Changes for formatting number start
    var enteredVal = dispNumFieldValue;//changed
    var replacepattern = "\\" + gDigitGroupingSymbol;
    var pattern = new RegExp(replacepattern, 'g');
    var digitsBfreDecimal = enteredVal.split(gDecimalSymbol)[0].replace(pattern, "");
    if (enteredVal.split(gDecimalSymbol)[1] != undefined) {
        var digitsAftrDecimal = enteredVal.split(gDecimalSymbol)[1].replace(pattern, "");
        enteredVal = digitsBfreDecimal + gDecimalSymbol + digitsAftrDecimal;
    }
    else {
        enteredVal = digitsBfreDecimal;
    }
    //Changes for formatting number end
    if (!checkNumberValidation(enteredVal) || ((enteredVal.indexOf(" ") !=  - 1))) {
        //CHANGED
        errCode = 'LB-UPD-022';
        errParam = dispNumFieldValue + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    var hidNumField = getNextSibling(getNextSibling(dispNumField));
    if (dispNumFieldValue != "") {
        updatedValue = enteredVal;
        //Changes for formatting number start
        if (hidNumField.value != updatedValue) {
            var validateNumberRange = fnValidateCSVUploadNumberRange(hidNumField, dispNumFieldValue, currentCellHeader, firstCellValue, firstCellHeader);
            if (validateNumberRange) {
                return true;
            }
            else {
                return false;
            }

        }
    }
    return true;
}

function fnValidateCSVUploadNumberRange(v_NumberFld, v_NumberFldValue, currentCellHeader, firstCellValue, firstCellHeader) {
    var noBefDecimals = "";
    var maxBefDecimal = "";
    var maxLen = "";
    /*if (getOuterHTML(v_NumberFld).indexOf("validateInputAmount") ==  - 1 && getOuterHTML(v_NumberFld).indexOf("processAmount") ==  - 1) {
        if (v_NumberFldValue != "")
            v_NumberFldValue = Number(v_NumberFldValue);
    }*/
    if (v_NumberFld.type == "checkbox")
        return true;
    if (!v_NumberFld || v_NumberFldValue == '')
        return true;
    var valueEntered = v_NumberFldValue;
    var maxVal = v_NumberFld.getAttribute("MAX_VAL");
    var minVal = v_NumberFld.getAttribute("MIN_VAL");
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');//added newly
    if (!isNumericValidation(valueEntered) || (valueEntered.indexOf(" ") !=  - 1 && gDigitGroupingSymbol != " " && gDecimalSymbol != " ")) {
        errCode = 'LB-UPD-022';
        errParam = v_NumberFldValue + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    if (valueEntered.indexOf(gDecimalSymbol) ==  - 1) {
        if (!isNaN(parseInt(minVal))) {
            if (parseInt(valueEntered) < parseInt(minVal)) {
                errCode = 'LB-UPD-019';
                errParam = minVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseInt(valueEntered) > parseInt(maxVal)) {
                errCode = 'LB-UPD-018';
                errParam = maxVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        noBefDecimals = valueEntered.length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                errCode = 'LB-UPD-021';
                errParam = maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) > maxLen) {
                errCode = 'LB-UPD-021';
                errParam = maxLen + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
    }
    else {
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"))) {
                //var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                errCode = 'LB-UPD-020';
                errParam = v_NumberFld.getAttribute("MAX_DECIMALS") + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
            }
        }
        noBefDecimals = valueEntered.substring(0, valueEntered.indexOf(".")).length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                errCode = 'LB-UPD-021';
                errParam = ":" + maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) - 1 > maxLen) {
                errCode = 'LB-UPD-021';
                errParam = ":" + maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(minVal))) {
            if (parseFloat(valueEntered) < parseFloat(minVal)) {
                errCode = 'LB-UPD-019';
                errParam = minVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseFloat(valueEntered) > parseFloat(maxVal)) {
                errCode = 'LB-UPD-018';
                errParam = maxVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
    }
    return true;
}

function fnValidateCSVUploadAmount(idAmount, idCCY, curInpElemValue, currentCellHeader, firstCellValue, firstCellHeader, curInpElem) {
    isfromscreen = true;
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV")
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var inpAmount = curInpElemValue;
    var ccy = "";
    var isMEBlock = "";
    var rowNo =  - 1;
    var rowIndex = 0;
    if (idCCY == "")
        ccy = mainWin.Lcy;
    else {
        var singleView = false;
        if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
            singleView = true;
        }
        if (curInpElem.parentNode.tagName.toUpperCase() == "DIV") {
            singleView = true;
        }
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            isMEBlock = isMultipleEntry(blockName);
            if (isMEBlock == 'true' && !singleView) {
                //Block is a multiple entry
                rowNo =  - 1;
                rowIndex = fnSingleCheck(blockName);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                ccy = getElementsByOjName(ccyFieldName)[rowNo].value;
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
            }
        }
        else {
            //Block is not part of the idCCY
            blockName = curInpElem.id.substring(0, curInpElem.id.lastIndexOf("__"));
            isMEBlock = isMultipleEntry(blockName);
            if (isMEBlock == 'true' && !singleView) {
                //Block is a multiple entry
                rowNo =  - 1;
                rowIndex = fnSingleCheck(blockName);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                var tableObj = getTableObjForBlock(blockName);
                if (tableObj) {
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("oj-input-text");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idCCY) {
                                ccy = inputElements[j].value;
                                break;
                            }
                        }
                        if (ccy != "")
                            break;
                    }
                }
                if (ccy == "") {
                    if (getElementsByOjName(idCCY).length > 0) {
                        rowNo =  - 1;
                        rowIndex = fnSingleCheck(blockName);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (getElementsByOjName(idCCY)[rowNo])
                            ccy = getElementsByOjName(idCCY)[rowNo].value;
                        else 
                            ccy = getElementsByOjName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
                else {
                    if (getElementsByOjName(idCCY).length > 0) {
                        rowNo =  - 1;
                        rowIndex = fnSingleCheck(blockName);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (getElementsByOjName(idCCY)[rowNo])
                            ccy = getElementsByOjName(idCCY)[rowNo].value;
                        else 
                            ccy = getElementsByOjName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
    }

    if (ccy == "" && inpAmount != "") {
        errCode = 'LB-UPD-024';
        errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        isfromscreen = false;
        return false;
    }
    if (!mainWin.g_objCcy[ccy]) {
        isfromscreen = false;
        return false;
    }
    if (inpAmount && inpAmount != "") {
        fnMB3CSVUploadAmount(inpAmount, true, ccy, currentCellHeader, firstCellValue, firstCellHeader);
        if (isValid()) {
            isformat = false;
            isformat = true;
            var inpElemId = curDataBoundElem.name + "I";
            var inpElem;
            if (curDataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || curDataBoundElem.parentNode.tagName.toUpperCase() == "DIV")
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode.parentNode, inpElemId);
            else 
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode, inpElemId);
            if (inpElem && inpElem.getAttribute("MAXLENGTH1")) {
                if (inpAmount && inpAmount != "") {
                    var tmp = inpAmount;
                    if (inpAmount.lastIndexOf(gDecimalSymbol) !=  - 1)
                        tmp = inpAmount.substring(0, inpAmount.lastIndexOf(gDecimalSymbol));
                    tmp = replaceAllChar(tmp, gDigitGroupingSymbol, "");
                    tmp = replaceAllChar(tmp, gNegativeSymbol, "");
                    if (tmp.length > inpElem.getAttribute("MAXLENGTH1")) {
                        errCode = 'LB-UPD-021';
                        errParam = inpElem.getAttribute("MAXLENGTH1") + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                        gIsValid = false;
                        return false;
                    }
                }
            }
        }
        else {
            gIsValid = false;
            return false;
        }

    }
    else {
        if (curDataBoundElem.value != '')
            curDataBoundElem.value = '';
    }
    isfromscreen = false;
    isformat = false;
    return true;
}

function fnMB3CSVUploadAmount(amt, isInputAmt, ccy, currentCellHeader, firstCellValue, firstCellHeader) {
    var tmpAmt;
    var amountSpecifier = "";
    var arrAmtComponents;
    var negativeSymbol = "-";
    var decimalSymbol = ".";
    var digitGroupingSymbol = ",";
    var newAmountFormat = mainWin.nlsAmountFormat;
    var dbdecimalSymbol = newAmountFormat.substr(0, 1);
    if (isInputAmt) {
        negativeSymbol = gNegativeSymbol;
        decimalSymbol = gDecimalSymbol;
        digitGroupingSymbol = gDigitGroupingSymbol;
    }
    if (ccy != null && ccy != "") {
        ccy = doTrim(ccy);
    }
    if (isValid()) {
        if (amt == null || amt == "") {
            tmpAmt = "0" + decimalSymbol + "0";
        }
        else {
            tmpAmt = doTrim(amt);
            if (tmpAmt == null || tmpAmt == "") {
                tmpAmt = "0" + decimalSymbol + "0";
            }
        }
    }

    if (isValid()) {
        if (cAmountSpecifiers.indexOf(tmpAmt.toUpperCase().substr(tmpAmt.length - 1)) >  - 1) {
            amountSpecifier = tmpAmt.toUpperCase().substr(tmpAmt.length - 1);
            tmpAmt = tmpAmt.substr(0, tmpAmt.length - 1);
        }
        if (tmpAmt.substr(0, 1) == negativeSymbol) {
            negativeNum = true;
            tmpAmt = tmpAmt.substr(1);
        }
        if (!isfromscreen) {
            tmpAmt = replaceAllChar(tmpAmt, dbdecimalSymbol, decimalSymbol);
        }
        tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
        if (digitGroupingSymbol.charCodeAt(0) == 160) {
            digitGroupingSymbol = digitGroupingSymbol.replace(String.fromCharCode(digitGroupingSymbol.charCodeAt(0)), " ");
            tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
        }
        if (tmpAmt.indexOf('E') !=  - 1) {
            tmpAmt = tmpAmt * 1 + "";
        }
        arrAmtComponents = tmpAmt.split(decimalSymbol);
        if ((arrAmtComponents.length != 1) && (arrAmtComponents.length != 2)) {
            //displayMsg("ST-COM009");
            errCode = 'LB-UPD-025';
            errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
            valid = false;
            return false;
        }
    }
    if (isValid()) {
        for (var tmpIndex = 0;tmpIndex < arrAmtComponents.length;tmpIndex++) {
            if (!containsOnlyDigits(arrAmtComponents[tmpIndex])) {
                //displayMsg("ST-COM010");
                errCode = 'LB-UPD-026';
                errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                valid = false;
                return false;
            }
        }
    }
    if (isValid()) {
        if (arrAmtComponents.length == 1) {
            arrAmtComponents[1] = "0000000000000000000000000000000000000000000000000000";
        }
        else {
            arrAmtComponents[1] += "0000000000000000000000000000000000000000000000000000";
        }
        if (amountSpecifier == cThousandSpecifier) {
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 3);
            arrAmtComponents[1] = arrAmtComponents[1].substr(3);

        }
        else if (amountSpecifier == cMillionSpecifier) {
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 6);
            arrAmtComponents[1] = arrAmtComponents[1].substr(6);
        }
        else if (amountSpecifier == cBillionSpecifier) {
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 9);
            arrAmtComponents[1] = arrAmtComponents[1].substr(9);
        }
        if (isInputAmt) {
            var discardableVal = arrAmtComponents[1].substr(getNumDigitsAfterDecimal(ccy));
            if (parseInt(discardableVal, 10) > 0) {
                //displayMsg("ST-COM011", ccy + "~");
                errCode = 'LB-UPD-027';
                errParam = ccy + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                valid = false;
                return false;

            }
            else {
                arrAmtComponents[1] = arrAmtComponents[1].substr(0, getNumDigitsAfterDecimal(ccy));
            }
        }
        if (isInputAmt) {
            if (arrAmtComponents[0].length == 0) {
                arrAmtComponents[0] = "0";
            }
            while (arrAmtComponents[0].length > 1) {
                if (arrAmtComponents[0].substr(0, 1) == "0") {
                    arrAmtComponents[0] = arrAmtComponents[0].substr(1);
                }
                else {
                    break;
                }
            }
        }
    }
    if (isValid()) {
        amt = arrAmtComponents.join(decimalSymbol);
        ccy = ccy;
    }
    return valid;
}

function isValid() {
    return valid;
}

function fnSingleCheck(ccyBlockId) {
    var selected_row = 0;
    var msob_tchk = 0;
    var currRowIndex = 0;
    len = getTableObjForBlock(ccyBlockId).tBodies[0].rows.length;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock(ccyBlockId).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (getTableObjForBlock(ccyBlockId).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }
        }
        else 
            break;
    }
    return currRowIndex + 1;
}

function fnDisableUploadBtnElement(object) {
    object.disabled = true;
    object.readOnly = true;
    object.className = "TXTro";
    return true;
}

function fnEnableUploadBtnElement(object) {
    object.disabled = false;
    object.readOnly = false;
    object.className = "TXTstd";
    return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDPRUAT';
    authUixml = 'LBDPRUAT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['LBDPRUAT'] = "KERNEL";
    ArrPrntFunc['LBDPRUAT'] = "";
    ArrPrntOrigin['LBDPRUAT'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	
	EnableDisableAuthBtn(); 
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER_AU__AUTH_STAT").value == "A")
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
  if (document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER_AU__AUTH_STAT").value == "U")
{
EnableToolbar_buttons("Authorize");
}
return true;
}

function fnPostFocus_KERNEL() {
  /*  var componentFlag = true;
    length = getTableObjForBlock("BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI").tBodies[0].rows.length;
    if (length > 0 && length != '' && length != "") {
        for (var idx = 0;idx < length;idx++) {
            if(getTableObjForBlock("BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-input-text")[0].value !="" && componentFlag){
                componentFlag = false;
            }
            
        }
    }
    if(componentFlag){
        gDisableBrowseButton = false;
    }else{
        gDisableBrowseButton = true;
    }*/
    if (((gAction == 'NEW') || (gAction == 'MODIFY')) && gDisableBrowseButton) {
        fnEnableUploadBtnElement(document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER__BTN_FILE_UPD")); 
    }
    else {
        fnDisableUploadBtnElement(document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER__BTN_FILE_UPD"));
    }
    return true;
}
/* OBCL_CSV_File_Upload_Changes :: Ends */