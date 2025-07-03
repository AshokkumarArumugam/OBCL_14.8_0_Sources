/*----------------------------------------------------------------------------------------------------
**
** File Name    : AmountUtil.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004-2021   by Oracle Financial Services Software Limited..

**   Modified By         : Ambika S
**   Modified On         : 29-June-2018
**   Modified Reason   	 : Fix provided to show the negative symbol if the amount is in negative and 
                           amount format is comma+dot. 
**   Search String       : 9NT1606_14_1_RETRO_12_3_28204522

**   Modified By         : Manojkumar S
**   Modified On         : 19-mar-2021
**   Modified Reason   	 : Fix provided to remove the hard coded ALL currency check.
**   Search String       : 32647772

**   Modified By         : Indirakumari C
**   Modified On         : 06-Oct-2022
**   Modified Reason   	 : For multi-entry block related currency index is not fetched/assigned properly.
**   Retro String        : Bug_34144551	
**   Search String       : Bug_34667776								   
----------------------------------------------------------------------------------------------------
 */

var cThousandSpecifier = "T";
var cMillionSpecifier = "M";
var cBillionSpecifier = "B";
var cAmountSpecifiers = cThousandSpecifier + cMillionSpecifier + cBillionSpecifier;
var isfromscreen = false;
var isformat =false;
function ccy(numDigitsAfterDecimal, formatMask, roundRule, roundUnit){
    this.numDigitsAfterDecimal = numDigitsAfterDecimal;
    this.formatMask = formatMask;
    this.roundRule = roundRule;
    this.roundUnit = roundUnit;
}

function getNumDigitsAfterDecimal(ccyCode){
  //32647772
    //if (ccyCode != "ALL"){
      //   return mainWin.g_objCcy[ccyCode].numDigitsAfterDecimal;
    //}else{
	//return mainWin.g_objCcy[mainWin.Lcy].numDigitsAfterDecimal;
  //  }
   return mainWin.g_objCcy[ccyCode].numDigitsAfterDecimal;
}

function getFormatMask(ccyCode){ 
  //32647772
   // if (ccyCode != "ALL"){
    //    return mainWin.g_objCcy[ccyCode].formatMask;
   // }else {
	//return mainWin.g_objCcy[mainWin.Lcy].formatMask;
       //}
       return mainWin.g_objCcy[ccyCode].formatMask;
           
}

function MB3Amount(amt, isInputAmt, ccy, fromSummary){
    this.valid = true;
    this.amt = "0.0";
    this.ccy = "";
    this.negativeNum = false;

    var tmpAmt;
    var amountSpecifier = "";
    var arrAmtComponents;
    var negativeSymbol = "-";
    var decimalSymbol = ".";
    var digitGroupingSymbol = ",";

    var newAmountFormat = mainWin.nlsAmountFormat;
    var dbdecimalSymbol = newAmountFormat.substr(0, 1);
    var dbdigitGroupingSymbol = newAmountFormat.substr(1);

    if (isInputAmt){
        negativeSymbol = gNegativeSymbol;
        decimalSymbol = gDecimalSymbol;
        digitGroupingSymbol = gDigitGroupingSymbol;
    }

    if (ccy != null && ccy != ""){
        ccy = doTrim(ccy);
    }

    if (this.isValid()){
        if (amt == null || amt == ""){
            tmpAmt = "0" + decimalSymbol + "0";
        } else{
            tmpAmt = doTrim(amt);
            if (tmpAmt == null || tmpAmt == ""){
                tmpAmt = "0" + decimalSymbol + "0";
            }
        }
    }

    if (this.isValid()){
        if (cAmountSpecifiers.indexOf(tmpAmt.toUpperCase().substr(tmpAmt.length - 1)) > -1){
            amountSpecifier = tmpAmt.toUpperCase().substr(tmpAmt.length - 1);
            tmpAmt = tmpAmt.substr(0, tmpAmt.length - 1);
        }
        if (tmpAmt.substr(0, 1) == negativeSymbol){
            this.negativeNum = true;
            tmpAmt = tmpAmt.substr(1);
        }

        if (!isfromscreen){
            tmpAmt = replaceAllChar(tmpAmt, dbdecimalSymbol, decimalSymbol);
        }
        tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");

        if (digitGroupingSymbol.charCodeAt(0) == 160){
            digitGroupingSymbol = digitGroupingSymbol.replace(String.fromCharCode(digitGroupingSymbol.charCodeAt(0)), " ");
            tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
        }
        arrAmtComponents = tmpAmt.split(decimalSymbol);

        if ((arrAmtComponents.length != 1) && (arrAmtComponents.length != 2)){
            displayMsg("ST-COM009");
            this.valid = false;
        }

    }

    if (this.isValid()){
        for (var tmpIndex = 0; tmpIndex < arrAmtComponents.length; tmpIndex++){
            if (!containsOnlyDigits(arrAmtComponents[tmpIndex])){
                displayMsg("ST-COM010");
                this.valid = false;
            }
        }
    }
    if (this.isValid()){
        if (arrAmtComponents.length == 1){
            arrAmtComponents[1] = "0000000000000000000000000000000000000000000000000000";
        } else{
            arrAmtComponents[1] += "0000000000000000000000000000000000000000000000000000";
        }
        var leftShift = 0;
        if (amountSpecifier == cThousandSpecifier){
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 3);
            arrAmtComponents[1] = arrAmtComponents[1].substr(3);

        } else if (amountSpecifier == cMillionSpecifier){
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 6);
            arrAmtComponents[1] = arrAmtComponents[1].substr(6);
        } else if (amountSpecifier == cBillionSpecifier){
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 9);
            arrAmtComponents[1] = arrAmtComponents[1].substr(9);
        }
        if (isInputAmt){
            var discardableVal = arrAmtComponents[1].substr(getNumDigitsAfterDecimal(ccy));
            if (parseInt(discardableVal, 10) > 0){
                if (!fromSummary) displayMsg("ST-COM011", ccy + "~");
                this.valid = false;
            } else{
                arrAmtComponents[1] = arrAmtComponents[1].substr(0, getNumDigitsAfterDecimal(ccy));
            }
        }

        if (isInputAmt){
            if (arrAmtComponents[0].length == 0){
                arrAmtComponents[0] = "0";
            }
            while (arrAmtComponents[0].length > 1){
                if (arrAmtComponents[0].substr(0, 1) == "0"){
                    arrAmtComponents[0] = arrAmtComponents[0].substr(1);
                } else{
                    break;
                }
            }
        }
    }
    if (this.isValid()){
        this.amt = arrAmtComponents.join(decimalSymbol);
        this.ccy = ccy;
    }
    return this.valid;
}

MB3Amount.prototype.isValid = isValid;
MB3Amount.prototype.getDisplayAmount = getDisplayAmount;
MB3Amount.prototype.getInputAmount = getInputAmount;
MB3Amount.prototype.getDSOAmount = getDSOAmount;

function isValid(){
    return (this.valid);
}

function getInputAmount(){
    var amountFormat = getFormatMask(this.ccy);
    var numDigitsAfterDecimal = getNumDigitsAfterDecimal(this.ccy);
    return formatAmount(this.amt, this.negativeNum, amountFormat, numDigitsAfterDecimal, gDecimalSymbol, gDigitGroupingSymbol, "-1");
}

function getDisplayAmount(){
    var amountFormat = getFormatMask(this.ccy);
    var numDigitsAfterDecimal = getNumDigitsAfterDecimal(this.ccy);
    return formatAmount(this.amt, this.negativeNum, amountFormat, numDigitsAfterDecimal, gDecimalSymbol, gDigitGroupingSymbol, gNegativeFormat);
}

function getDSOAmount(){
    var retAmt = "";
    if (parseFloat(this.amt) != 0){
        if (this.negativeNum == true){
            retAmt = "-";
        }
        retAmt += this.amt;
    } else{
        retAmt = this.amt;
    }
    return retAmt;
}

function formatAmount(dsoAmt, isNegative, digitGrouping, numDigitsAfterDecimal, gDecimalSymbol, gDigitGroupingSymbol, negativeFormat){
    var arrTemp = dsoAmt.split(gDecimalSymbol);
    var numBeforeDecimal = arrTemp[0];
    var numAfterDecimal = arrTemp[1];
    var retVal = "";
    var digitPos = 0;
    for (var loopIndex = numBeforeDecimal.length - 1; loopIndex >= 0; loopIndex--){
        switch (digitGrouping){
        case "I":
            if ((digitPos > 1) && ((digitPos % 3) == 0)){
                retVal = gDigitGroupingSymbol + retVal;
            }
            retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
            break;

        case "N":
            if ((digitPos > 1) && ((digitPos % 2) == 1)){
                retVal = gDigitGroupingSymbol + retVal;
            }
            retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
            break;
        default:
            retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
        }
        digitPos++;
    }

    if (numDigitsAfterDecimal > 0){
        retVal += gDecimalSymbol;
        numAfterDecimal += "000000000000000000000000000000000000";
        retVal += numAfterDecimal.substr(0, numDigitsAfterDecimal);
    }
    if (isNegative){
        switch (negativeFormat){
        case "(1)":
            retVal = "(" + retVal + ")";
            break;

        case "- 1":
            retVal = gNegativeSymbol + " " + retVal;
            break;

        case "1-":
            retVal = retVal + gNegativeSymbol;
            break;

        case "1 -":
            retVal = retVal + " " + gNegativeSymbol;
            break;

        default:
            retVal = gNegativeSymbol + retVal;
        }
    }
    return retVal;

}

function displayAmount(dataBoundElem, idCCY, triggerOnChange){
    if (isformat == true && isfromscreen == true){ //fix for bug :18758920
    return;
	}
    var idDispAmt = dataBoundElem.name + "I";
    var inpElem;
	var tableObj = ""; //fix for bug :18758920
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV") 
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode.parentNode, idDispAmt);
    else 
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode, idDispAmt);
    var amt = dataBoundElem.value;

    var ccy;
    if (idCCY == "" || document.getElementsByName(idCCY).length <= 0) {
        ccy = mainWin.Lcy;
    } else {
		/* commented for bug: 18758920 starts
        var rowNo = -1;
        if(document.getElementsByName(idCCY).length > 1) {
        var objTR = dataBoundElem.parentNode;
        while(typeof(objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
            objTR = objTR.parentNode;
        }
        rowNo = objTR.rowIndex-1;
        } else {
            rowNo = 0;
        }
        if (document.getElementsByName(idCCY)[rowNo]) 
            ccy = document.getElementsByName(idCCY)[rowNo].value;
        else 
            ccy = document.getElementsByName(idCCY)[0].value;
		commented for bug: 18758920 ends */
		//added code changes for bug: 18758920 start 
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);

            var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }

            if ((isMEBlock&& !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2,3) != "D")) { /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo = -1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = curDataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if(typeof (screenType) != "undefined" && screenType == "D"){
                        if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 1;
                        else rowNo = 0;
                    }else{
                        if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 2;
                        else rowNo = 0;
                    }
                } else {
                    rowNo = 0;
                }

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
            } else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
            }
        } else {
            //Block is not part of the idCCY
            blockName = dataBoundElem.id.substring(0, dataBoundElem.id.lastIndexOf("__"));

            var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }

            if ((isMEBlock&& !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2,3) != "D")) { /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo = -1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if(typeof (screenType) != "undefined" && screenType == "D"){
                        if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 1;
                        else rowNo = 0;
                    }else{
                        if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 2;
                        else rowNo = 0;
                    }
                } else {
                    rowNo = 0;
                }
                if(typeof (screenType) != "undefined" && screenType == 'D'){
                    tableObj = document.getElementById("Innertable_" +  functionId);
                }else{
                    tableObj = getTableObjForBlock(blockName);
                }
			if(tableObj.tBodies[0].rows.length>0){
                for (var i = 0; i < tableObj.tBodies[0].rows[rowNo].cells.length; ++i) {
                    var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                    for (var j = 0; j < inputElements.length; ++j) {
                        if (inputElements[j].name == idCCY) {
                            ccy = inputElements[j].value;
                            break;
                        }
                        }
                    }
                }
				/* Fix for 16960456*/
				if (ccy == "") {
                    if (document.getElementsByName(idCCY).length > 0) {
						ccy = document.getElementsByName(idCCY)[0].value;
                    } else ccy = mainWin.Lcy;
                }
            } else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                } else {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo = -1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = dataBoundElem.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if(typeof (screenType) != "undefined" && screenType == "D"){
                                if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 1;
                                else rowNo = 0;
                            }else{
                                //if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 2; //Bug_34667776
								if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex ;//Bug_34667776
                                else rowNo = 0;
                            }
                        } else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else ccy = document.getElementsByName(idCCY)[0].value;
                    } else ccy = mainWin.Lcy;
                }
            }
        }
        //added code changes for bug: 18758920 ends 
    }

    if (document.getElementsByName(idCCY).length > 0 && ccy == "") {
        ccy = mainWin.Lcy;
    }
    if (amt && amt != "") {

        var mb3Amount = new MB3Amount(amt, true, ccy);
        if (mb3Amount.isValid()) {
            inpElem.value = mb3Amount.getDisplayAmount();
            isformat = true;
			isfromscreen = true; //fix for bug: 18758920
            dataBoundElem.value = dataBoundElem.value.replace(gDecimalSymbol, ".");
        }
    } else {
        inpElem.value = "";
    }
    isformat = false;
	isfromscreen = false; //fix for bug: 18758920
}
var gCurDisplayAmount = 0;

function acceptInputAmount(idAmount, idCCY){
    isfromscreen = true;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") //Abs Positioning
         curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var dsAmount = curInpElem.value;

    var ccy = "";
    if (idCCY == "") ccy = mainWin.Lcy;
    else{
        if (document.getElementById(idCCY)){
            var rowNo = -1;
            if (getRowIndex() == 0 || getRowIndex() == -1) rowNo = 0;
            else rowNo = getRowIndex() - 1;
            if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
            else ccy = document.getElementsByName(idCCY)[0].value;
        } else ccy = mainWin.Lcy;
    }
    if (ccy == ""){
	isfromscreen = false;
        return;
    }
    if (!mainWin.g_objCcy[ccy]){
        displayMsg("ST-COM008", ccy + "~");
        document.getElementsByName(idCCY)[0].focus();
	isfromscreen = false;
        return;
    }

    if (dsAmount && dsAmount != ""){
        var mb3Amount = new MB3Amount(dsAmount, true, ccy);
        if (mb3Amount.isValid()){
            curInpElem.value = mb3Amount.getInputAmount();
            curDataBoundElem.value = mb3Amount.getDSOAmount();
        }
    }
    gCurDisplayAmount = curInpElem.value;
    isfromscreen = false;
    isformat = true;
}

function validateInputAmount(idAmount, idCCY, event){
    isfromscreen = true;
    var event = window.event || event;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var inpAmount = curInpElem.value;

    var ccy = "";
    if (idCCY == "") ccy = mainWin.Lcy;
    else{
        if (document.getElementsByName(idCCY).length > 0){
            var rowNo = -1;
            if (getRowIndex(event) == 0 || getRowIndex(event) == -1) rowNo = 0;
            else rowNo = getRowIndex(event) - 1;
            if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
            else ccy = document.getElementsByName(idCCY)[0].value;
        } else ccy = mainWin.Lcy;
    }
   
    if (ccy == "" && inpAmount!= ""){
        mask(); //Changes for 11.4 ITR1 SFR# 13080345 starts
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I'); 
        alertAction = "UNMASK"; //Changes for 11.4 ITR1 SFR# 13080345 ends
        focusReqd = false;
        focusField = curInpElem;
        curInpElem.value = "";
        if(getPreviousSibling(getPreviousSibling(curInpElem)).tagName != "LABEL"){
            getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
        }else{
            getPreviousSibling(getPreviousSibling(getPreviousSibling(curInpElem))).value = "";
        }     
        isfromscreen = false;    
        gIsValid = false;
        return;
    }
    if (!mainWin.g_objCcy[ccy]){
		//Fix for 18295564
		curDataBoundElem.value = '';
		isfromscreen = false;
        return;
    }
    if (inpAmount && inpAmount != ""){
        var mb3Amount = new MB3Amount(inpAmount, true, ccy);
        if (mb3Amount.isValid()){
                isformat = false;
                curDataBoundElem.value = mb3Amount.getDSOAmount();
                fireHTMLEvent(curDataBoundElem, "onpropertychange");
                isformat = true;
            var inpElemId = curDataBoundElem.id + "I";
            var inpElem;
            if (curDataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || curDataBoundElem.parentNode.tagName.toUpperCase() == "DIV") 
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode.parentNode, inpElemId);
            else 
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode, inpElemId);
            if (inpElem && inpElem.getAttribute("MAXLENGTH1")){
                if (inpAmount && inpAmount != ""){
                    var tmp = inpAmount;
                    if (inpAmount.lastIndexOf(gDecimalSymbol) != -1) tmp = inpAmount.substring(0, inpAmount.lastIndexOf(gDecimalSymbol)); //9NT1606_14_1_RETRO_12_3_28204522 replace . with gDecimalSymbol
                    tmp = replaceAllChar(tmp, gDigitGroupingSymbol, "");
                    tmp = replaceAllChar(tmp, gNegativeSymbol, "");
                    if (tmp.length > inpElem.getAttribute("MAXLENGTH1")){
                        alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED")+ inpElem.getAttribute("MAXLENGTH1"));
                        focusReqd = false;
                        focusField = curInpElem;
                        curInpElem.value = "";
                        if(getPreviousSibling(getPreviousSibling(curInpElem)).tagName != "LABEL"){
                            getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
                        }else{
                            getPreviousSibling(getPreviousSibling(getPreviousSibling(curInpElem))).value = "";
                        } 
                        event.returnValue = false;
                        gIsValid = false;
                    }
                }
            }
        } else{
            focusReqd = false;
            focusField = curInpElem;
            alertAction = "UNMASK";
            curInpElem.value = "";
            if(getPreviousSibling(getPreviousSibling(curInpElem)).tagName != "LABEL"){
                getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
            }else{
                getPreviousSibling(getPreviousSibling(getPreviousSibling(curInpElem))).value = "";
            } 
            event.returnValue = false;
            gIsValid = false;
        }

    } else{
        if (curDataBoundElem.value != '') curDataBoundElem.value = '';
    }
    isfromscreen = false;
    isformat = false;
}
