/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtUtil.js
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
Copyright ? 2004-2021   by Oracle Financial Services Software Limited..
** Modified By         : Sriraam S
** Modified On         : 18-Feb-2013
** Modified Reason     : 1.Negative Decimal Values are picked up as positive values during decimal split up(eg: -0.25 is returned as 0.25)
						  2.Negative Decimal Addition procedure is incorrect.(eg: -1.25 is split as -1 and 0.25, when added returns -0.75 instead of 1.25)
** Search String       : 9NT1525_114_TFB_16354062
   Changed By		       : Sanath KN
   Change Description      : To accomodate large numbers in the denomnation count of the Till
   Search Tag              : FCUBS_12.0.1_RETRO_16373726
   
**  Modified By          : Neethu Sreedharan
**  Modified On          : 21-Sep-2016
**  Modified Reason      : INCORRECT VALUES DISPLAYED IN FORWARD RATE INPUT SCREEN
**  Retro Source         : 9NT1606_12_0_3_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_23652325


**  Modified By          : Rishabh Gupta
**  Modified On          : 27-Sep-2016
**  Modified Reason      : Dragging restricted when parent screen is masked.
**  Search String        : 12_1_RETRO_12_2_23652976
**  SFR no.  			 : 23652976

**  Modified By          : Neethu Sreedharan
**  Modified On          : 27-Sep-2016
**  Modified Reason      : Code changes done to restrict the browser behavior of IE11 when F1 key is 
                           pressed 
**  Retro Source         : 9NT1606_12_0_1_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_2_RETRO_12_0_1_23653303


**  Modified By          : Rishabh Gupta
**  Modified On          : 13-Oct-2016
**  Modified Reason      : ME and MESV block has the same name.MESV block field is considering as ME. so code is modified to check field is present in MESV or ME
**  Search String        : 12_0_2_RETRO_12_2_24813514
**  SFR No.				 : 24813514

**  Modified By          : Divyansh Sharma
**  Modified On          : 10-Apr-2017
**  Modified Reason      : Code changes done to enable enter key to select values in select box for IE
**  Search String        : Fix for Bug 25727823

**
** 	Modified By          : Piyush Sharma
** 	Modified On          : 23-June-2017
** Modified Reason       : Hotkey Changes
** Search String         : MCY/VA Hot Key  

**  Modified By          : SAURAV
**  Modified On          : 26-SEP-2017 
**  Modified Reason      : RETRO_Changes done to provide space between checkbox and the label. Changes also 
                           provided to drag the screen to right in case of Arabic user
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_4_RETRO_12_0_2_26231164
**
**  Modified By          : SAURAV
**  Modified On          : 26-Sep-2017
**  Modified Reason      : RETRO_Added UI_TXN_ACC field for Signature Verification.
**  Search String        : 9NT1606_12_4_INTERNAL_26820002

** 	Modified By          : Ambika Selvaraj
** 	Modified On          : 23-Oct-2017
** 	Modified Reason      : Issue:Signature viewing for credit leg disabled.
				           Fix:Given to enable the signature viewing for credit leg,but the verification to be only supported for
						   the debit leg.
** 	Search String        : 9NT1606_12_4_RETRO_12_2_26939842

**   Modified By         : Ambika Selvaraj
**   Modified On         : 24-Oct-2017
**   Modified Reason   	 : Changes done to return proper date in case of different time zones. 
**   Retro Source        : 9NT1606_12_1_AFIANZADORA ASERTA
**   Search String       : 9NT1606_12_4_RETRO_12_1_26939865

**  Modified By          : Karthikeyan k
**  Modified On          : 29-Nov-2017
**  Modified Reason      : Field in SE block is considering as ME.Code changes done to check for ME block.
**  Search String        : 12.4_OBDX_27189724 
**  SFR No.				 : 27189724

**	Modified By          : Ambika S
** 	Modified on          : 31-Jan-2018
** 	Modified Reason      : Changes done to auto fill Date Separator on inputting value on Date fields.
                           The Date separator should be based on Date format configured in User Settings.
** 	Search String        : 9NT1606_14_0_RETRO_12_0_3_27393036

** Monica R - 11/apr/2018 -UDF FIELD POPS LOV DIALOG BOX EVEN IF IT IS A TEXT FIELD - Search string : 27295304 

**   Modified By         : Ambika S
**   Modified On         : 29-June-2018
**   Modified Reason   	 : Fix provided to show the negative symbol if the amount is in negative and 
                           amount format is comma+dot. 
**   Search String       : 9NT1606_14_1_RETRO_12_3_28204522

**   Modified By         : Mantinder Kaur
**   Modified On         : 04-March-2019
**   Modified Reason   	 :Even though user is doing F12 for signature verification,still on save system is throwing error signature verification not done.
						  The flag to validate whether signature verification has been done was not getting set to true.due to mismatch between the tag recieved from frontend(UI_AC_NO) and 
						  the tag to which it was compared(AC_NO).Fix provided to set the correct tag while validating the signature.
**   Search String       : FCUBS_141_MGN_EMPEROR_26878904(retro from 28383828)

**  Modified By          : Vignesh MG
**  Modified On          : 23-Jan-2020
**  Change Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
**  Search String        : 30620131
**
**   Modified By         : Manojkumar S
**   Modified On         : 19-mar-2021
**   Modified Reason   	 : Fix provided to remove the hard coded ALL currency check.
**   Search String       : 32647772
********************************************************************************************
*/
var gDecimalSymbol = mainWin.gDecimalSymbol;
var gDigitGroupingSymbol = mainWin.gDigitGroupingSymbol;
var gNegativeSymbol = mainWin.gNegativeSymbol;
var gNegativeFormat = mainWin.gNegativeFormat;
var hotkeySrcElem;
var hotKeyBrn = "";//Fix for 15928835 
var hotKeyCcy = "";//MCY/VA Hot Key 
// added for Amount/Exchange Rate patterns starts
function processAmount(idAmount, idCCY, e, v_NumberFld) {
    var event = window.event || e;
    validateInputAmount(idAmount, idCCY, e);
    fnValidateRange(v_NumberFld);
    maskerStyle = document.getElementById("masker");
    if (maskerStyle.offsetWidth == 0) {
        processFields(event);
    }
}

function processNumber(v_NumberFld, e) {
    var event = window.event || e;
    validateInputNumber(v_NumberFld);
    maskerStyle = document.getElementById("masker");
    if (maskerStyle.offsetWidth == 0) {
        processFields(event);
    }
}
// added for Amount/Exchange Rate patterns ends
function fnShowROSelectValue(selectObject) {
    for (var i = 0;i < selectObject.options.length;i++) {
        if (selectObject.options[i].selected) {
            getNextSibling(getNextSibling(selectObject.parentNode)).value = getInnerText(selectObject.options[i]);
			//Changes_authStat_Highligt start
			if((selectObject.name=='AUTHSTAT') && (selectObject.options[i].value=='U')){
				getNextSibling(getNextSibling(selectObject.parentNode)).className="TXTroUnAuth";			
			}  else if((selectObject.name=='AUTHSTAT') && (selectObject.options[i].value!='U')){
				getNextSibling(getNextSibling(selectObject.parentNode)).className="TXTro";
				getNextSibling(getNextSibling(selectObject.parentNode)).style.fontWeight="normal";				
			}
			//Changes_authStat_Highligt end
            break;
        }
    }
}

function fnTabDetails() {
    var tab_obj = document.getElementById("tablist");
    var lSafIndx = 0;
    if (document.getElementById("tablist")) {
        if (tab_obj.childNodes.length > 0) {
            if (tab_obj.childNodes[0].nodeType == '3')/*This happens in case of Safari Browser, the first child is text node*/
            {
                for (var i = 0;i < tab_obj.childNodes.length;i++) {
                    if (tab_obj.childNodes[i].nodeType != '3' && !tab_obj.childNodes[i].classList.contains( "oj-navigationlist-divider") )/*checking node is not text becos, setting childNodes[0].id is not possible for text nodes*//* Fix for Bug 16514031 - changed childNodes[0] to childNodes[i] in if condition*/
                    { //OJET Migration
                        tab_arr[lSafIndx] = tab_obj.childNodes[i].childNodes[0];
                        tab_ids[lSafIndx] = tab_obj.childNodes[i].childNodes[0].id;
                        lSafIndx = lSafIndx + 1;
                    }
                }

            }
            else /*normal existing processing*/
            {
                for (var i = 0;i < tab_obj.childNodes.length;i++) {
                if(!tab_obj.childNodes[i].classList.contains( "oj-navigationlist-divider") ){ //OJET Migration
                    tab_arr[i] = tab_obj.childNodes[i].childNodes[0];
                    tab_ids[i] = tab_obj.childNodes[i].childNodes[0].id;
                }
                }
            }
        }
    }
}

function shortcut(e) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);/*Fix for 18380388 End*/
    /*Fix for 18380388 Start*/
    /*Fix for 18180616 Starts*/
    if (document.getElementById("masker") != null && document.getElementById("masker").offsetHeight != 0 && event.keyCode != 9) {
        if (thirdChar != "S" || (srcElem.tagName != 'INPUT' && srcElem.tagName != 'TEXTAREA')) {
            fnDisableBrowserKey(event);
            event.returnValue = false;
            return false;
        }
    }
    /*Fix for 18380388 End*/
    /*Fix for 18180616 Ends*/
    //  var srcElem = getEventSourceElement(event);  /*Fix for 18380388 */
    var type = srcElem.type;
    Obj = new Object();
    Obj.event = event;
    /*if (event.shiftKey && event.keyCode == 9) {
        if (document.getElementById("tablist")) {
            var elemA = document.getElementById("tablist").getElementsByTagName("A");
            for (var i = 0; i < elemA.length; i++) {
                if (elemA[i].id == strCurrentTabId) {
                    elemA[i].focus();
                    preventpropagate(event);
                    return false;
                }
            }
        }
    }*/
    //Bug 18433305 Fixes Starts
	  try{	
		  if (event.keyCode == 9) {          
			  if (mainWin.gActiveWindow && mainWin.gActiveWindow.frameElement && mainWin.gActiveWindow.frameElement.contentWindow) {
				if (mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker")) {
					if (mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker").style.height != 0) {
						if(mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker").children[0].children[0].contentWindow.document.getElementById("BTN_OK"))
						  mainWin.gActiveWindow.frameElement.contentWindow.document.getElementById("masker").children[0].children[0].contentWindow.document.getElementById("BTN_OK").focus();
					}
				}
			}        
		  }
	  }catch(e){}
      //Bug 18433305 Fixes Ends
	/*Fix for 16799210*/
    if (e.keyCode == 116) {
        fnDisableBrowserKey(event);
        preventpropagate(event);
        try {
            event.keyCode = 0;
        }
        catch (e) {
        }
        return false;
    }
    /*Fix for 16799210*/
    if (event.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        }
        else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    if (event.keyCode == 13) {
        if (typeof (type) == "undefined") {
            return false;
        /*Fix for Bug 25727823 */
        }else if ((type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "BUTTON"  && typeof(srcElem.tagName)!="undefined" && srcElem.tagName.toUpperCase()!="SELECT") || srcElem.readOnly )  {
            return false;
        }
    }
    if (event.ctrlKey == true && event.altKey == false &&((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106))) { //Fix for 18993321 - added check for alt key
        mainWin.fnHandleHotKeys(event.keyCode, event);
    }
    fnHandleButtons(event);
    if (event.ctrlKey == true && event.altKey == false &&  event.keyCode == 78) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'N' is pressed with Ctrl Key...for NEW
        fnDisableBrowserKey(event);
        if (!(document.getElementById("New").disabled))
            setTimeout("doAction(mainWin.ACTIONNEW)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 83) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'S' is pressed with Ctrl Key...for SAVE
        fnDisableBrowserKey(event);
        if (document.getElementById("SaveCriteria")) {
            if (document.getElementById("SaveCriteria").style.display == "block") {
                fnOpenCriteriaScr(event);
                return false;
            }
        }
        else if (!(document.getElementById("Save").disabled)) {
            if (!fnValidateOnF8(event)) {
                return false;
            }
            Obj = new Object();
            Obj.event = event;
            if (screenType == "WB") {
                fnSaveAll(scrName, event);
            }
            else {
                setTimeout("doAction(mainWin.ACTIONSAVE,'Obj.event')", 0);//JS Segregation changes
            }

        }
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 70) {//Ctrl + F  // 21594948 //9NT1606_12_4_RETRO_12_1_26744468 changes
        fnDisableBrowserKey(event);
        mainWin.document.getElementById("fastpath").focus();
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 67) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'C' is pressed with Ctrl Key and Shift Kry...for Copy
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Copy").disabled))
            setTimeout("doAction(mainWin.ACTIONCOPY)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 89) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'Y' is pressed with Ctrl Key...for Close
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Close").disabled))
            setTimeout("doAction(mainWin.ACTIONCLOSE)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 90) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'Z' is pressed with Ctrl Key...for Authorize
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Authorize").disabled))
            setTimeout("doAction(mainWin.ACTIONAUTHORIZE)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 68) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'D' is pressed with Ctrl Key...for Delete
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Delete").disabled))
            setTimeout("doAction(mainWin.ACTIONDELETE)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 85) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'U' is pressed with Ctrl Key...for Unlock     
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Unlock").disabled))
            setTimeout("doAction(mainWin.ACTIONUNLOCK)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 82) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'R' is pressed with Ctrl Key...for Reopen
        fnDisableBrowserKey(event);
        if (thirdChar == 'S') {
            fnResetQry(event);
            return false;
        }
        else if (!(document.getElementById("Reopen").disabled))
            setTimeout("doAction(mainWin.ACTIONREOPEN)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 80) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'P' is pressed with Ctrl Key...for Print
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Print").disabled))
            setTimeout("doAction(mainWin.ACTIONPRINT)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 69) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'E' is pressed with Ctrl Key...for Reverse
        fnDisableBrowserKey(event);
        if (document.getElementById("Export")) {
            if (document.getElementById("Export").style.display == "block") {
                setTimeout("fnExportToExcel()", 0);// fix  for 17014727 
            }
        }
        else if (!(document.getElementById("Reverse").disabled))
            setTimeout("doAction(mainWin.ACTIONREVERSE)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 86) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'V' is pressed with Ctrl Key...for Rollover
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Rollover").disabled))
            setTimeout("doAction(mainWin.ACTIONROLLOVER)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 77) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'M' is pressed with Ctrl Key...for Confirm
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Confirm").disabled))
            setTimeout("doAction(mainWin.ACTIONCONFIRM)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.altKey == false && event.keyCode == 81) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'Q' is pressed with Ctrl Key...for Liquidate // Fix for 17448572
        fnDisableBrowserKey(event);
        if (document.getElementById("advSearch")) {
            if (getIEVersionNumber() > 0) {
                fireHTMLEvent(document.getElementById("advSearch"), "onclick");
            }
            else {
                var fnEval = new Function("event", document.getElementById("advSearch").getAttribute("onclick"));
                fnEval(event);
            }
            document.getElementById("BTN_EXIT").focus();
        }
        else if (!(document.getElementById("Liquidate").disabled))
            setTimeout("doAction(mainWin.ACTIONLIQUIDATE)", 0);//JS Segregation changes
        return false;
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 72) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'H' is pressed with Ctrl Key...for Hold
        fnDisableBrowserKey(event);
        if (thirdChar == 'S') {
            if (document.getElementById("Refresh").style.display == 'block') {
                fnRefreshSummary(event);
                document.getElementById("BTN_EXIT").focus();
                return false;
            }
        }
        if (!(document.getElementById("Hold").disabled))
            setTimeout("doAction(mainWin.ACTIONHOLD)", 0);//JS Segregation changes
        return false;
    }
    /*else if (event.altKey == true && event.keyCode == 49) {
        var toolBarBtns = mainWin.document.getElementById("tbactions").getElementsByTagName("BUTTON");
        for (var l_Itr = 0; l_Itr < toolBarBtns.length; l_Itr++) {
            if (toolBarBtns[l_Itr].disabled == false && toolBarBtns[l_Itr].id != "btnHomeBranch" && toolBarBtns[l_Itr].id != "btnChangeBranch") {
                toolBarBtns[l_Itr].focus();
                break;
            }
        }
    }*/
    else if (event.altKey == true && event.keyCode == 70) {
        // If 'F' is pressed with Alt key for fastpath      
        mainWin.document.getElementById("fastpath").value = "";
        mainWin.document.getElementById("fastpath").focus();
    }
    else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 66) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'B' is pressed with Ctrl Key...for GENERATE
        fnDisableBrowserKey(event);
        if (!(document.getElementById("Generate").disabled))
            doAction(mainWin.ACTIONGENERATE);//JS Segregation changes
        return false;
    }

    if (event.ctrlKey == true && event.altKey == false && event.keyCode == 80) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'P' is pressed with Ctrl Key...for PRINT
        if (!(document.getElementById("Print").disabled))
            doAction(mainWin.ACTIONPRINT);//JS Segregation changes
    }
    if (event.ctrlKey == true && event.altKey == false && event.keyCode == 84) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        if (typeof (screenType) != 'undefined' && screenType == "WB") {
            var element = getEventSourceElement(event);
            var arrBlockName = element.id.split('__');
            var blkname = arrBlockName[0];
            if (blkname == gFXDenomSEBlockName || blkname == gFXDenomBlockName)
                callDisplayTillContent(gFXDenomBlockName);
            else if (blkname == gDenomBlockName || blkname == gDenomSEBlockName)
                callDisplayTillContent(gDenomBlockName);
            else if (blkname == gNonCcyBlockName)
                callDisplayTillContent(gNonCcyBlockName);
        }
        fnDisableBrowserKey(e);
        return false;
    }
    if (event.keyCode == 113) {
        switchWindows();
    }
    if (gAction != null && gAction != '' && gAction != "ENTERQUERY") {
        return;
    }
    if (event.keyCode == 118) {
		fnDisableBrowserKey(e);//Fix for 20826419
        // F7 Function key
        /*if (thirdChar == 'S') {
            //fnResetQry(event);
            if (document.getElementById("SavedQry").style.display == 'block') {
                fnQueryCriteria('QUERYCRITERIA', event);
            }
            fnDisableBrowserKey(event);
            return;
        }
        else {
            if (gAction != "") {
                fnDisableBrowserKey(event);
                return;
            }
            if(document.getElementById("EnterQuery").style.display != 'none'){//SMDUSDBG changes starts
                gAction = 'ENTERQUERY';
                fnDisableBrowserKey(event);//12.0.3 changes 
                fnEnterQuery();
                return false;//12.0.3 changes 
            }//SMDUSDBG changes ends
        }*/
    }
    else if (event.keyCode == 119) {
        // F8 Function key
		//Fix for 20840923 start
        fnDisableBrowserKey(event);
        /*if (gAction != 'ENTERQUERY' && thirdChar != 'S') {
            return false;
        }
        if (thirdChar == 'S') {
           
            if (!fnValidateOnF8(event))
                return;
           
            fnExecuteQuery_sum('Y', event);
            document.getElementById("BTN_EXIT").focus();
            return false;
        }
        else {
            gAction = 'EXECUTEQUERY';
            if (!fnValidateOnF8(event)) {
                gAction = "ENTERQUERY";
                return;
            }
            if (!isAutoLOVOpened) {
                fnExecuteQuery();
            }
            else {
                gAction = "ENTERQUERY";
                return;
            }
        }*/
    }
}

function switchWindows() {
    var cnt = 0;
    var windowsCnt = mainWin.arrChildWindows.length;
    if (windowsCnt > 0) {
        for (var currWin = 0;currWin < windowsCnt;currWin++) {
            if (currWin == windowsCnt - 1) {
                cnt = 0;
            }
            else {
                cnt = currWin + 1;
            }
            if (mainWin.arrChildWindows[currWin].children[0].contentWindow == mainWin.gActiveWindow) {
                mainWin.setActiveWindow(mainWin.arrChildWindows[cnt], mainWin.arrChildWindows[cnt].children[0].contentWindow, true);
                break;
            }
        }
    }
}

function f1Help(e) {
    l_functionId = functionId;
    var e = window.event || e;
    var scrElem = getEventSourceElement(e);
    if (e.keyCode == 112) {
        if (mainWin.applicationName == "FCIS") {
            var filetoOpen = l_functionId;
            showDbt_dbc(filetoOpen);
            fnDisableBrowserKey(e);
            return;
        }
        if (mainWin.gActiveWindow) {
            if (mainWin.gActiveWindow.screenType) {
                if (mainWin.gActiveWindow.screenType == "WB") {
                    var blkname;
                    blkname = scrElem.getAttribute("DBT");
                    if (getPreviousSibling(document.activeElement) && getPreviousSibling(getPreviousSibling(document.activeElement))) {
                        //if (getPreviousSibling(getPreviousSibling(document.activeElement)).id + "I" == document.activeElement.id) {
                        var elemD = getPreviousSibling(getPreviousSibling(scrElem));
                        blkname = elemD.getAttribute("DBT");
                        colname = elemD.getAttribute("DBC");
                        //}
                    }
                    if (blkname == gDenomBlockName || blkname == gDenomSEBlockName) {
                        var l_functionId = 'CDNM';
                    }
                    else if (blkname == gChargeBlockName) {
                        var l_functionId = 'CCHG';
                    }
                    else if (blkname == gMisBlockName) {
                        var l_functionId = 'CMIS';
                    }
                    else if (blkname == gUdfBlockName) {
                        var l_functionId = 'CUDF';
                    }
                    else if (blkname == gNonCcyBlockName) {
                        var l_functionId = 'CTCD';
                    }
                    else {
                        l_functionId = functionId;
                    }
                }
            }
        }
        var blkname;
        var colname;
        var id;
        var nextSib = getNextSibling(scrElem);
        if (scrElem.className == "BTNfooter" || scrElem.className == "BTNfooterH" || (scrElem.parentNode.parentNode.tagName == "TD" && (scrElem.getAttribute("name") != undefined && scrElem.getAttribute("name") == "chkDeleteRow")) || (scrElem.tagName == "SPAN" && (nextSib != null && (nextSib.getAttribute("name") != undefined) && (nextSib.getAttribute("name") == "chkDeleteRow")))) {
            fnDisableBrowserKey(e);
            return;
        }
        if (scrElem.tagName == "DIV" || scrElem.tagName == "TD") {
            for (var i = 0;i < scrElem.childNodes.length;i++) {
                if (scrElem.childNodes[i].tagName == 'LABEL') {
                    if (scrElem.childNodes[i].childNodes.length != 0 && scrElem.childNodes[i].childNodes.length != 1) {
                        scrElem = scrElem.childNodes[i];
                    }
                }
                if ((scrElem.childNodes[i].tagName == "INPUT") || (scrElem.childNodes[i].tagName == "SELECT") || (scrElem.childNodes[i].tagName == "TEXTAREA")) {
                    scrElem = scrElem.childNodes[i];
                    id = scrElem.id;
                    break;
                }
            }
            blkname = scrElem.getAttribute("DBT");
            colname = scrElem.getAttribute("DBC");
            if (colname != "" && typeof (colname) != "undefined") {
                var filetoOpen = l_functionId + "." + blkname + "." + colname;
                showDbt_dbc(filetoOpen);
                fnDisableBrowserKey(e);
                return;
            }
            else {
                fnDisableBrowserKey(e);
                return;
            }
        }
        if ((scrElem.tagName != "INPUT") && (scrElem.tagName != "SELECT") && (scrElem.tagName != "CHECKBOX") && (scrElem.tagName != "RADIO") && (scrElem.tagName != "TEXTAREA")) {
            fnDisableBrowserKey(e);
            return;
        }
        var orgSrcElem = scrElem;
        var scrElem = scrElem.id;
        if (scrElem.indexOf("cmd") != "-1") {
            fnDisableBrowserKey(e);
            return;
        }
        if (scrElem == "TBLPage" + strCurrentTabId) {
            fnDisableBrowserKey(e);
            return;
        }
        var objtbl;

        if (scrElem == "") {
            objtbl = document.activeElement;
            var count = 0;
            if ((objtbl.tagName != "INPUT") && (objtbl.tagName != "SELECT") && (objtbl.tagName != "CHECKBOX") && (objtbl.tagName != "RADIO") && (objtbl.tagName != "TEXTAREA")) {
                fnDisableBrowserKey(e);
                return;
            }
            while (objtbl.tagName != "TABLE") {
                objtbl = objtbl.parentNode;
                if (objtbl.tagName == "DIV") {
                    count = count + 1;
                }
                if (count > 2) {
                    blkname = document.activeElement.parentNode.parentNode.id;
                    colname = document.activeElement.name;
                    var filetoOpen = l_functionId + "." + blkname + "." + colname;
                    showDbt_dbc(filetoOpen);
                    fnDisableBrowserKey(e);
                    return;
                }
                if (objtbl.tagName == "HTML") {
                    fnDisableBrowserKey(e);
                    return;
                }
            }
            blkname = objtbl.id;
            colname = document.activeElement.name;
        }
        else {
            blkname = document.activeElement.getAttribute("DBT");
            colname = document.activeElement.name;
        }
        if (colname == "chkDeleteRow") {
            fnDisableBrowserKey(e);
            return;
        }
        if ((document.activeElement.parentNode.parentNode.tagName == "TD") || (document.activeElement.parentNode.parentNode.tagName == "TR")) {
            objtbl = document.activeElement;
            if ((objtbl.tagName != "INPUT") && (objtbl.tagName != "SELECT") && (objtbl.tagName != "CHECKBOX") && (objtbl.tagName != "RADIO") && (objtbl.tagName != "TEXTAREA")) {
                fnDisableBrowserKey(e);
                return;
            }
            while (objtbl.tagName != "TABLE") {
                objtbl = objtbl.parentNode;
                if (objtbl.tagName == "HTML") {
                    fnDisableBrowserKey(e);
                    return;
                }
            }
            blkname = objtbl.id;
            if (getPreviousSibling(document.activeElement) && getPreviousSibling(getPreviousSibling(document.activeElement))) {
                if (blkname == "")
                    blkname = getPreviousSibling(getPreviousSibling(document.activeElement)).id.substring(0, getPreviousSibling(getPreviousSibling(document.activeElement)).id.lastIndexOf("__"));
                colname = getPreviousSibling(getPreviousSibling(document.activeElement)).name;
            }
            else {
                if (blkname == "")
                    blkname = document.activeElement.id.substring(0, document.activeElement.id.lastIndexOf("__"));
                colname = document.activeElement.name;
            }
        }
        if ((document.activeElement.parentNode.parentNode.tagName != "TD") && (document.activeElement.parentNode.parentNode.tagName != "TR")) {
            if (getPreviousSibling(document.activeElement)) {
                if (getPreviousSibling(getPreviousSibling(document.activeElement))) {
                    //if (getPreviousSibling(getPreviousSibling(document.activeElement)).id + "I" == document.activeElement.id) {
                    var elemD = getPreviousSibling(getPreviousSibling(orgSrcElem));
                    blkname = elemD.getAttribute("DBT");
                    colname = elemD.getAttribute("DBC");
                    //}
                }
            }
        }
        if (colname == "") {
            fnDisableBrowserKey(e);
            return;
        }
        try {
            if (blkname == null) {
                blkname = scrElem.split("__")[0];
            }
			if (colname == null) {//21846192 starts
                colname = document.activeElement.name;
                if(colname!="" && colname.charAt(colname.length - 1) == 'I')
                    colname = colname.substr(0, colname.length - 1);
            }//21846192 ends
        }
        catch (e) {
        }
        var filetoOpen = l_functionId + "." + blkname + "." + colname;
        showDbt_dbc(filetoOpen);
        fnDisableBrowserKey(e);
    }
}

function showhelpwindow() {
    var filetoOpen = "";
    if (mainWin.gNumChildWindows <= 0) {
    }
    else {
        filetoOpen = mainWin.document.getElementById("fastpath").value.toUpperCase();
        if (mainWin.gActiveWindow) {
            if (mainWin.gActiveWindow.screenType) {
                if (mainWin.gActiveWindow.screenType == "WB") {
                    var xmlFile = mainWin.gActiveWindow.xmlFileName;
                    if (xmlFile.lastIndexOf(".xml") ==  - 1)
                        var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".XML"));
                    else var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".xml"));
                    filetoOpen = funcId;
                }
            }
        }
    }
    if (mainWin.gNumChildWindows > 0 && filetoOpen != "")
        mainWin.gActiveWindow.showDbt_dbc(filetoOpen);
}

function showDbt_dbc(currobject) {
    if (typeof (currobject) != "undefined") {
        var name = currobject;
        debugs("HelpFileName", name);
        if (name != "") {
            name = name.toLowerCase();
            mask();
            loadHelpFileDIV("ChildWin", "Help/" + mainWin.LangCode + "/" + name + ".htm");
        }
        else {
            alert(mainWin.getItemDesc("LBL_HELP_AVAILABLE"));
        }
    }
}

function fnExitHelpWindow() {
    /*Fix for 16714912 and 16785218*/
    var childDivObj = "";
    if (mainWin.applicationName == "FCIS" && mainWin.extHelpFile == "N") {//helpfile changes
        unmask();
        childDivObj = document.getElementById("ChildWin");
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        document.getElementById("Div_ChildWin").removeChild(childDivObj);
    }
    else {
        parent.unmask();
        childDivObj = parent.document.getElementById("ChildWin");
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
    }
}

//HelpFile changes starts
function fnshowHelpFile(){
    //if (mainWin.applicationName == "FCIS") {
        var customWin = "";
        var customWinData = "";
        var winObj = "";
        customWin = document.createElement("div");
        customWin.id = "ChildWin";
        customWin.className = "dhtmlwindow";
        customWin.style.position = "absolute";
        var customWinData = '<iframe class="frames" id="ifrSubScreen" title="" src="Help.jsp" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
        customWin.innerHTML = customWinData;
        document.getElementById("Div_ChildWin").appendChild(customWin);
        document.getElementById("Div_ChildWin").style.display = "block";
        var winObj = document.getElementById("ChildWin");
        winObj.style.zIndex = "9000";
        winObj.style.visibility = "visible";
        winObj.style.display = "block";
        
        var alertWinObj = document.getElementById("Div_ChildWin");
        
        alertWinObj.style.display = "block";
        alertWinObj.style.height = "100%";
        alertWinObj.style.width = "100%"; //For DIV
        alertWinObj.style.width = "100%";
        alertWinObj.style.top = "0px";
        alertWinObj.children[0].style.height = "100%"; //For IFRAME
        alertWinObj.children[0].style.width = "100%";
        alertWinObj.children[0].style.top = "0px";
        
}
//HelpFile changes ends
function loadHelpFileDIV(divId, src) {
    /*Fix for 16714912 and 16785218*/
    var customWin = "";
    var customWinData = "";
    var winObj = "";
    screenArgs = new Array();//helpfile changes
    //src = mainWin.addIframeReqParam(src); //session expiry change//helpfile changes
    if (mainWin.applicationName == "FCIS" && helpPath == "") {//helpfile changes
        customWin = document.createElement("div");
        customWin.id = divId;;
        customWin.className = "dhtmlwindow";
        customWin.style.position = "absolute";
        customWinData = '<DIV id=DIVWNDContainer class=WNDcontainer>';
        customWinData += '<DIV class="WNDtitlebar" id="WNDtitlebar" style="Width:503px;" onmousedown="startDragHelp(\'ChildWin\', event)">';
        customWinData += '<div class="WNDtitle" id="wndtitle">';
        customWinData += '<B class="BTNicon"><span class="ICOflexcube"></span></B>';
        customWinData += '<h1 class="WNDtitletxt">' + mainWin.getItemDesc("LBL_HELP1") + '&nbsp;</h1>';
        customWinData += '<div class="WNDbuttons">';
        customWinData += '<a class="WNDcls" id ="WNDbuttons" href="#" onblur=\"this.className=\'WNDcls\'\" onmouseover=\"this.className=\'WNDclsH\'\" onfocus=\"this.className=\'WNDclsH\'\" onmouseout=\"this.className=\'WNDcls\'\" title="' + mainWin.getItemDesc("LBL_CLOSE") + '" onclick=\"fnExitHelpWindow()\"></a>';
        customWinData += '</div>';
        customWinData += '</div>';
        customWinData += '</div>';
        customWinData += '</div>';
        customWinData += '<DIV id=DIVHelpFileContainer>';
        customWinData += '<iframe class="frames" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="auto" style="Height:400px; Width:500px"></iframe>';
        customWinData += '</DIV>';
        customWinData += '</DIV>';
        customWin.innerHTML = customWinData;
        document.getElementById("Div_ChildWin").appendChild(customWin);
        document.getElementById("Div_ChildWin").style.display = "block";
        winObj = document.getElementById(divId);
        winObj.style.visibility = "visible";
        winObj.style.display = "block";
    }
    else {
        customWin = document.createElement("div");
        customWin.id = divId;
        customWin.className = "dhtmlwindow";
        customWin.style.position = "absolute";
        if(typeof(helpPath)!= "undefined" && helpPath!=""){ //21798468 
            screenArgs["HELPFILE"] = "Help/" + mainWin.LangCode +"/" + helpPath;//helpfile changes
        }else{
            screenArgs["HELPFILE"] = src;
        }    
        var customWinData = '<iframe class="frames" id="ifrSubScreen" title="" src="Help.jsp" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
        customWin.innerHTML = customWinData;
        document.getElementById("Div_ChildWin").appendChild(customWin);
        document.getElementById("Div_ChildWin").style.display = "block";
        var winObj = document.getElementById(divId);
        winObj.style.visibility = "visible";
        winObj.style.display = "block";
    }
}

function startDragHelp(target, e) {
    var evt = window.event || e;
    /*Fix for 16714912 and 16785218*/
    var divObj = "";
    if (mainWin.applicationName == "FCIS" && mainWin.extHelpFile == "N") {//helpfile changes
        divObj = document.getElementById(target);
        if (document.getElementById("ChildWin")) {
        }
        else {
            mainWin.setActiveWindow(divObj, window);
        }
    }
    else {
        divObj = parent.document.getElementById(target);
        if (parent.document.getElementById("ChildWin")) {
        }
        else {
            mainWin.setActiveWindow(divObj, window);
        }
    }
    divObj.style.cursor = "default";
    var x = evt.clientX;
    var y = evt.clientY;
    var initx = divObj.offsetLeft;
    var inity = divObj.offsetTop;
    document.onmousemove = function (e) {
        var evt = window.event || e;
        var ex = evt.clientX;
        var ey = evt.clientY;
        var dx = ex - x;
        var dy = ey - y;
        var ypos = inity + dy;
        var tBarHgt = 0;
        if (document.getElementById("WNDtitlebar") != null) {
            tBarHgt = document.getElementById("WNDtitlebar").offsetHeight *  - 1;
        }
        else if (typeof (mainWin) != "undefined") {
            tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
        }
        if (ypos > (tBarHgt + 4)) {
            divObj.style.left = initx + dx + "px";
            divObj.style.top = inity + dy + "px";
            initx = initx + dx;
            inity = ypos;
        }
        else {
            divObj.style.top = (tBarHgt + 4) + "px";
            inity = tBarHgt + 4;
        }
    };
    document.onmouseup = function (event) {
        divObj.style.cusor = "default";
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function fnMouseDownEvents() {
	 //Fix for 22479244 starts
	var event = window.event || e;    
	//Fix for 22614404 starts	
    if (getBrowser().indexOf("IE") >=0 && getBrowser().indexOf("11") != -1 && event.button == 1) {          
	    event.preventDefault();
        preventpropagate(event);        
    } else { 
	    if (event.button == 4) {
			event.returnValue = false;
			preventpropagate(event);
		}
    }    
	//Fix for 22614404 ends		    
	//Fix for 22479244 ends
    return true;
}

function disableDefault() {
    try{//21789250 
	// 9NT1606_12_2_RETRO_12_0_1_23653303 starts
    if (getBrowser().indexOf("IE") >=0 && getBrowser().indexOf("11") != -1) {  
      event.preventDefault();
    }else{ //9NT1606_12_2_RETRO_12_0_1_23653303 ends
        event.returnValue = false;
	} //9NT1606_12_2_RETRO_12_0_1_23653303 changes 
    }catch(e){}
    return false;
}

var hotKeyPressed = false;

function fnHandleButtons(e) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var e = window.event || e;
    var srcElem = getEventSourceElement(e);
    var type = srcElem.type;//Fix for 16754359 and 16785081 
    /*Fix for 16799210*/
    if (e.keyCode == 116) {
        fnDisableBrowserKey(e);
        preventpropagate(e);
        try {
            e.keyCode = 0;
        }
        catch (ex) {
        }
        return false;
    }
    /*Fix for 16799210*/
     if(e.ctrlKey && (e.keyCode == 67 || e.keyCode == 88) && restrictReqd == 'Y'){//jc2 changes begin//PIPA
        try {
            e.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(e);
        fnDisableBrowserKey(e);
        return false;
    }
	if(e.ctrlKey && (e.keyCode == 80) && restrictPrint == 'Y'){//jc2 changes begin//PIPA
        try {
            e.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(e);
        fnDisableBrowserKey(e);
        return false;
    }
	//jc2 changes end//PIPA
    if (e.keyCode == 13) {
        if (srcElem.tagName) {
            if ((srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == "TEXT") || srcElem.tagName == "DIV")
                return false;
        }
    }
    //Fix for 16754359 and 16785081 
    if (e.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        }
        else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    if (!e.ctrlKey && !e.shiftKey && e.keyCode == 115) {
        // F4 Function key
        var event = e;
        if (getNextSibling(srcElem) && getNextSibling(srcElem).tagName == "BUTTON") {
            if (srcElem.disabled == false && !srcElem.readOnly) {
                if (getIEVersionNumber() > 0)
                    fireHTMLEvent(getNextSibling(srcElem), "onclick");
                else {
                    //eval(getNextSibling(srcElem).getAttribute("onclick"));
                    var fnEval = new Function("event", getNextSibling(srcElem).getAttribute("onclick"));
                    fnEval(event);//shortcut fix
                }
            }
            else if (srcElem.getAttribute("INPUT_LOV")) {
                if (getIEVersionNumber() > 0)
                    fireHTMLEvent(getNextSibling(srcElem), "onclick");
                else {
                    //eval(getNextSibling(srcElem).getAttribute("onclick"));
                    var fnEval = new Function("event", getNextSibling(srcElem).getAttribute("onclick"));
                    fnEval(event);//shortcut fix
                }
            }
        }
        fnDisableBrowserKey(e);
        try {
            e.keyCode = 0;
        }
        catch (e) {
        }
        return false;
    }
    else if (e.shiftKey == true && e.keyCode == 115) {
        fnDisableBrowserKey(e);
        try {
            e.keyCode = 0;
        }
        catch (e) {
        }
        var event = e;
        if (getNextSibling(getNextSibling(srcElem)) && getNextSibling(getNextSibling(srcElem)).tagName == "BUTTON") {
            if (getIEVersionNumber() > 0) {
                fireHTMLEvent(getNextSibling(getNextSibling(srcElem)), "onclick");
            }
            else {
                //eval(getNextSibling(getNextSibling(srcElem)).getAttribute('onclick'));
                var fnEval = new Function("event", getNextSibling(srcElem).getAttribute("onclick"));
                fnEval(event);
            }
        }
        return false;
    }
	//fix for bug: 19060316 starts 
         if (e.keyCode == 120 && mainWin.applicationExt == "JP") { 
    
         fieldName = srcElem.name;
         parentWinParams = new Object();
         if(srcElem.getAttribute("HOTKEYREQ")=='Y') {
            parentWinParams.custNo = srcElem.value;
            mainWin.dispHref1("STDCUADL",getSeqNo());
         } else if ((fieldName.indexOf('AC') != '-1') && srcElem.value != "") { 
              parentWinParams.accNo = srcElem.value;
                var brn = "";
                var prevSib = "";
                try{
                    try{
                    if (getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD') {
                        prevSib = getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
                    } else {
                        prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;
                    }
					/*Fix for 17434292  Starts*/
                    if(getPreviousSibling(getEventSourceElement(e).parentNode).nodeType=='3'){
                       prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
                    }
                    /*Fix for 17434292  Ends*/
					}catch(er){}
                    for (var i = 0; i < prevSib.length; i++) {
                        if (prevSib[i].maxLength == '3') {
                            /*Fix for 17434292*/
                          //if (prevSib[i].name.indexOf('BRN') != '-1' || prevSib[i].name.indexOf('BRANCH') != '-1') {
                           if (prevSib[i].name.indexOf('BR') != '-1') {  /*Fix for 17434292*/
                                brn = prevSib[i].value;
                            }
                        }
                    }
                }catch(ex){
                    brn = g_txnBranch;  
                }
                if (brn == "") {
                    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {  
                        //fix for 14807178 starts
                        if(document.getElementById(txnBranchFld)!= null){
                        brn = document.getElementById(txnBranchFld).value;   
                        //fix for 14807178 ends
                        }
                    }               
                }
                //fix for 14807178 starts
                if (brn == "") {
                  if(typeof(acnoBrn) != "undefined")brn = acnoBrn;
                }
                //fix for 14807178 ends
                if (brn == "") brn = g_txnBranch;
                currtxnBranch = g_txnBranch;
              
              parentWinParams.brn = brn;
              mainWin.dispHref1("STDCUADL",getSeqNo());
         } else {
             return false;
         }
     } //fix for bug: 19060316 ends 
    // if (e.keyCode == 120) if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') if (typeof (srcElem.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') srcElem.parentNode.getElementsByTagName("BUTTON")[0].click(); Commented as F4 is used to handle the button click()
    f1Help(e);
    if (e.ctrlKey == true && e.altKey == false && e.keyCode == 76) {
        if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'ENTERQUERY' || gAction == 'DEFAULT') {
            if (window.document.title != mainWin.gActiveWindow.document.title) {
                if (document.getElementById("BTN_EXIT_IMG"))
                    if (!document.getElementById("BTN_EXIT_IMG").disabled) {
                        fnDisableBrowserKey(e);
                        fnExitAll(scrName, e);
                    }
            }
            else {
                if (document.getElementById("BTN_EXIT_IMG")) {
                    if (!document.getElementById("BTN_EXIT_IMG").disabled) {
                        fnDisableBrowserKey(e);
                        /*if (mainWin.gActiveWindow.screenType == "WB" && returnValue != "N") {
                            fnBrnCancel()
                        } else {*/
                        fnExitAll("", e);
                        //}
                    }
                }
            }
        }
        else {
            preventpropagate(e);
            fnDisableBrowserKey(e);
            if (thirdChar == 'S') {
                fnResetAll(e);
                return false;
            }
            try {
                e.keyCode = 0;
            }
            catch (e) {
            }
            return false;
        }
    }
    else if (e.ctrlKey == true && e.altKey == false && e.keyCode == 75) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        fnDisableBrowserKey(e);
        if (document.getElementById("BTN_OK")) {
            if (!document.getElementById("BTN_OK").disabled) {
                if (typeof (scrName) != 'undefined') {
                    fnSaveAll(scrName, e);
                }
                else {
                    fnSaveAll(e);
                }
            }
        }
        return false;
    }
    else if (e.ctrlKey == true && e.altKey == false && e.keyCode == 87) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        // If 'W' is pressed with Ctrl Key...
        fnDisableBrowserKey(e);
        if (document.getElementById("BTN_EXIT_IMG")) {
            if (!document.getElementById("BTN_EXIT_IMG").disabled) {
                /*if (mainWin.gActiveWindow.screenType == "WB" && returnValue != "N") {
                    fnBrnCancel()
                } else {*/
                fnExitAll("", e);
                //}
            }
        }
        else if (document.getElementById("BTN_EXIT")) {
            if (!document.getElementById("BTN_EXIT").disabled) {
                fnExit_sum("", e);
            }
        }
        return false;
    }
   //Customer Accessibilty start
   else if (e.ctrlKey == true && e.altKey == false && e.keyCode == 33) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        fnNavigateTabsCust('backward', tab_arr, tab_ids);
        fnDisableBrowserKey(e);
        return false;
     }else if (e.ctrlKey == true && e.altKey == false && e.shiftKey == true && e.keyCode == 34) {  //9NT1606_12_4_RETRO_12_1_26744468 changes
        fnNavigateTabsCust('forward', tab_arr, tab_ids);
        fnDisableBrowserKey(e);
        return false;
     }
    else if (e.ctrlKey == true  && e.altKey == false && e.keyCode == 33) { //9NT1606_12_4_RETRO_12_1_26744468 changes
        if(parent.parent.document.getElementById(parent.seqNo) && parent.parent.document.getElementById(parent.seqNo).getElementsByTagName("IFRAME")[0].getAttribute("TYPE")){
            // If 'Page Up' is pressed with Ctrl Key...for PREVIOUS TAB
            parent.fnNavigateTabs('backward', parent.tab_arr, parent.tab_ids);
        }
        fnDisableBrowserKey(e);
        return false;
    }
    else if (e.ctrlKey == true && e.keyCode == 34) {
        if(parent.parent.document.getElementById(parent.seqNo) && parent.parent.document.getElementById(parent.seqNo).getElementsByTagName("IFRAME")[0].getAttribute("TYPE")){
            // If 'Page Down' is pressed with Ctrl Key...for NEXT TAB
            parent.fnNavigateTabs('forward', parent.tab_arr, parent.tab_ids);
        }
        fnDisableBrowserKey(e);
        return false;
    }
     //Customer Accessibilty end

    if (e.keyCode == 123 || e.keyCode == 121) {
		fnDisableBrowserKey(e);//Fix for 20826419
/*Fix for 20143643 Starts */
		/*
        hotKeyPressed = false;
        fireHTMLEvent(srcElem, "onchange");
        if (isLovOpen){
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch (e) {}
            return false;
        }
        
		var imgType ="";
        if(e.keyCode == 123) {
            imgType="S";
        }else {
            imgType="I";
        }
		
        hotKeyPressed = true;
        if (srcElem.id == "dataContainer")
            return false;
        hotkeySrcElem = srcElem;
		//Fix for 18635762 -User Level Hot Key restriction Starts
        if(e.keyCode == 123 && mainWin.f12_Reqd == 'N'){
           alert(mainWin.getItemDesc("LBL_INFRA_F12REST"));
          fnDisableBrowserKey(e);
          try {
              e.keyCode = 0;
          } catch (e) {}
          focusReqd = false;
          focusField = hotkeySrcElem;
          e.returnValue = false;
          gIsValid = false;
          return false;
        }
        if( e.keyCode == 121 && mainWin.f10_Reqd == 'N'){
          alert(mainWin.getItemDesc("LBL_INFRA_F10REST"));
          fnDisableBrowserKey(e);
          try {
              e.keyCode = 0;
          } catch (e) {}
          focusReqd = false;
          focusField = hotkeySrcElem;
          e.returnValue = false;
          gIsValid = false;
          return false;
        }
		//Fix for 18635762 -User Level Hot Key restriction Ends        
        var fieldName = srcElem.name;
        if (fieldName != undefined) {
           
            if ((fieldName.indexOf('AC') != '-1') && srcElem.value != "") {
               
                var accNo = srcElem.value;
                var brn = "";
                var prevSib = "";
                try {
                    if (getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD') {
                        prevSib = getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
                    }
                    else {
                        prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;
                    }
                   
                    if (getPreviousSibling(getEventSourceElement(e).parentNode).nodeType == '3') {
                        prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
                    }
                   
                }
                catch (er) {
                }
                for (var i = 0;i < prevSib.length;i++) {
                    if (prevSib[i].maxLength == '3') {
                        
                        //if (prevSib[i].name.indexOf('BRN') != '-1' || prevSib[i].name.indexOf('BRANCH') != '-1') {
                        if (prevSib[i].name.indexOf('BR') != '-1') {
                            
                            brn = prevSib[i].value;
                        }
                    }
                }
                if (brn == "") {
                    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
                        //fix for 14807178 starts
                        if (document.getElementById(txnBranchFld) != null) {
                            brn = document.getElementById(txnBranchFld).value;
                        }
                        //fix for 14807178 ends
                    }
                }
                //fix for 14807178 starts
                if (brn == "") {
                    if (typeof (acnoBrn) != "undefined")
                        brn = acnoBrn;
                }
                //fix for 14807178 ends
                if (brn == "")
                    brn = g_txnBranch;
                var kvalue = "";
                if (e.keyCode == 123) {
                    kvalue = "S";
                }
                else {
                    kvalue = "P";
                }
				//Fix for 15928835,19558009
				if (!fnEventsHandler('fnSetHotKeyBranch',e))
					return false;
				if(hotKeyBrn != ""){
					brn = hotKeyBrn;
				}
				//Fix for 15928835 
                //12.0.2_single_step_process
                if (screenType == 'WB') {
                    if (mainWin.functionDef[functionId].txnAcc != "null") {
                        //if (srcElem.id == mainWin.functionDef[functionId].txnAcc) { //12.0.3_18374725 
                        if (srcElem.id == mainWin.functionDef[functionId].txnAcc || srcElem.id == "BLK_TRANSACTION_DETAILS__VIRACCNO") {
                            //12.0.3_18374725 			
                            parent.gAccToBeVerified = true;
                        }
                        else {
                            parent.gAccToBeVerified = false;
                        }
                    }
                }
                //12.0.2_single_step_process             

				if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') {
                    parentWinParams.accNo = accNo;
                    parentWinParams.brn = brn;
                    parentWinParams.imgType = imgType;
                    mainWin.dispHref1("SVDIMGVW", seqNo);
                    //fndispImage(accNo, kvalue, brn);//FCUBS11.1 ITR2 SFR#983 changes, kvalue included					
                }
					
					
                fnDisableBrowserKey(e);
                try {
                    e.keyCode = 0;
                }
                catch (e) {
                }
            }
            else {
                alert(mainWin.getItemDesc("LBL_INFRA_INVFLD"));
                fnDisableBrowserKey(e);
                try {
                    e.keyCode = 0;
                }
                catch (e) {
                }
                return false;
            }
        }
        else {
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            }
            catch (e) {
            }
            return false;
        }*/
    }
    else if (e.keyCode == 122) {
		fnDisableBrowserKey(event);
/*Fix for 20143643 Starts */
		/*
        hotKeyPressed = false;
        fireHTMLEvent(srcElem, "onchange");
        if (isLovOpen){
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch (e) {}
            return false;
        }
        
        hotKeyPressed = true;
        hotkeySrcElem = srcElem;
		 //Fix for 18635762 -User Level Hot Key restriction Starts
         if(mainWin.f11_Reqd == 'N'){
          alert(mainWin.getItemDesc("LBL_INFRA_F11REST"));
          fnDisableBrowserKey(e);
          try {
              e.keyCode = 0;
          } catch (e) {}
          focusReqd = false;
          focusField = hotkeySrcElem;
          e.returnValue = false;
          gIsValid = false;
          return false;
        }
		//Fix for 18635762 -User Level Hot Key restriction Ends        
        var fieldName = srcElem.name;
        if (fieldName != undefined) {
           
            if ((fieldName.indexOf('AC') != '-1') && srcElem.value != "") {
                
                var accNo = srcElem.value;
                var brn = "";
                var prevSib = "";
                try {
                    try {
                        if (getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD') {
                            prevSib = getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
                        }
                        else {
                            prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;
                        }
                        if (getPreviousSibling(getEventSourceElement(e).parentNode).nodeType == '3') {
                            prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
                        }
                    }
                    catch (er) {
                    }
                    for (var i = 0;i < prevSib.length;i++) {
                        if (prevSib[i].maxLength == '3') {
                            //if (prevSib[i].name.indexOf('BRN') != '-1' || prevSib[i].name.indexOf('BRANCH') != '-1') {
                            if (prevSib[i].name.indexOf('BR') != '-1') {
                                
                                brn = prevSib[i].value;
                            }
                        }
                    }
                }
                catch (ex) {
                    brn = g_txnBranch;
                }
                if (brn == "") {
                    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
                        //fix for 14807178 starts
                        if (document.getElementById(txnBranchFld) != null) {
                            brn = document.getElementById(txnBranchFld).value;
                            //fix for 14807178 ends
                        }
                    }
                }
                //fix for 14807178 starts
                if (brn == "") {
                    if (typeof (acnoBrn) != "undefined")
                        brn = acnoBrn;
                }
                //fix for 14807178 ends
                if (brn == "")
                    brn = g_txnBranch;
                currtxnBranch = g_txnBranch;
                //Fix for 15928835,19558009
				if (!fnEventsHandler('fnSetHotKeyBranch',e)){
                fnDisableBrowserKey(e);
                try {
                e.keyCode = 0;
                } catch (e) {}
                return false;
                }
                if (hotKeyBrn != "") {
                    brn = hotKeyBrn;
                }
                //Fix for 15928835 
                g_txnBranch = brn;
                 if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') { //F11 extensible
                    parentWinParams.accNo = accNo;
                    parentWinParams.brn = brn; //debugger;
                    var addlArgs = new Array();
                    fnEventsHandler('fnPreCustomViewF11',addlArgs) ;
                        var cnt = 0;
                        for (var i in addlArgs) {
                            cnt++;
                        }
                        if (cnt > 0)
                            parentWinParams.addlArgs = addlArgs;
                    
                    mainWin.dispHref1("STDCUBAL",seqNo);
                    // fndispCustbal(accNo, brn);
		}
                g_txnBranch = currtxnBranch;
                fnDisableBrowserKey(e);
                try {
                    e.keyCode = 0;
                }
                catch (e) {
                }
            }
            else {
                alert(mainWin.getItemDesc("LBL_INFRA_INVFLD"));
                fnDisableBrowserKey(e);
                try {
                    e.keyCode = 0;
                }
                catch (e) {
                }
                return false;
            }
        }
        else {
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            }
            catch (e) {
            }
            return false;
        }*/
    }
    else if (e.keyCode == 117) {
		//Fix for 20840923 start
        fnDisableBrowserKey(event);
        /*hotKeyPressed = true;
        var fieldValue = srcElem.value;
        var fieldName = srcElem.name;
        var l = document.getElementsByTagName("INPUT").length;
        var brn_fldname;
        var brnFldValue;
        if (fieldName.indexOf("ACC") !=  - 1 || fieldName.indexOf("AC") !=  - 1) {
            for (var i = 0;i < l;i++) {
                if (document.getElementsByTagName("INPUT")[i].name == fieldName) {
                    brn_fldname = document.getElementsByTagName("INPUT")[i - 1].name;
                    break;
                }
            }
        }
        if (typeof (brn_fldname) != 'undefined' && brn_fldname != null && brn_fldname != "") {
            brnFldValue = document.getElementsByName(brn_fldname)[0].value;
        }
        if (brnFldValue == null || typeof (brnFldValue) == 'undefined' || brnFldValue == "") {
            brnFldValue = mainWin.CurrentBranch;
        }
        var fieldId = srcElem.id;
        fndispInstr(fieldValue, fieldName, fieldId, brnFldValue);
        fnDisableBrowserKey(e);
        e.keyCode = 0;
    }
    if (typeof (fromSubScr) != "undefined" && fromSubScr == true) {
        if ((e.ctrlKey == true && e.keyCode == 68) || (e.ctrlKey == true && e.keyCode == 77) || (e.ctrlKey == true && e.keyCode == 78) || (e.ctrlKey == true && e.keyCode == 79) || (e.ctrlKey == true && e.keyCode == 80) || (e.ctrlKey == true && e.keyCode == 82)) {
            preventpropagate(e);
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            }
            catch (e) {
            }
            return false;
        }*/
    }
}

function fnGetFieldNames(fieldName, opt, accNo) {
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><FIELDNAME>' + fieldName + '</FIELDNAME><ACCNO>' + accNo + '</ACCNO><ACTION>' + opt + '</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (responseDom != null) {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//RESPONSE/MSGSTAT"));
        var field = getNodeText(selectSingleNode(responseDom, "//RESPONSE/FIELDLIST"));
        var acc = getNodeText(selectSingleNode(responseDom, "//RESPONSE/ACCLIST"));
        if (msgStat == "SUCCESS" && field != "" && acc != "") {
            return true;
        }
        else {
            if (acc == "")
                alert(mainWin.getItemDesc("LBL_INFRA_INVACC"));
            else 
                alert(mainWin.getItemDesc("LBL_INFRA_INVFLD"));
            return false;
        }
    }
}

function NVL(strToCheck, defaultValue) {
    var lDefaultValue = "";
    if (arguments.length == 2) {
        lDefaultValue = defaultValue;
    }
    return (strToCheck == null ? lDefaultValue : strToCheck);
}

function gEncodeData(mainStr) {
    var re;
    var encodedText = "";
    re = new RegExp("%", "g");
    encodedText = mainStr.replace(re, "*");
    return (encodedText);
}

function trim(argvalue) {
    argvalue = argvalue + "";
    var tmpstr = ltrim(argvalue);
    return rtrim(tmpstr);
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

var gDateFormatDSO = "yyyy-MM-dd";
var gDateSeperator = "-";
var g_dateFromSystemSetting = true;
var gShortMonthValues = new Array();
gShortMonthValues[0] = mainWin.getItemDesc("JAN_3CHAR").toUpperCase();
gShortMonthValues[1] = mainWin.getItemDesc("FEB_3CHAR").toUpperCase();
gShortMonthValues[2] = mainWin.getItemDesc("MAR_3CHAR").toUpperCase();
gShortMonthValues[3] = mainWin.getItemDesc("APR_3CHAR").toUpperCase();
gShortMonthValues[4] = mainWin.getItemDesc("MAY_3CHAR").toUpperCase();
gShortMonthValues[5] = mainWin.getItemDesc("JUN_3CHAR").toUpperCase();
gShortMonthValues[6] = mainWin.getItemDesc("JUL_3CHAR").toUpperCase();
gShortMonthValues[7] = mainWin.getItemDesc("AUG_3CHAR").toUpperCase();
gShortMonthValues[8] = mainWin.getItemDesc("SEP_3CHAR").toUpperCase();
gShortMonthValues[9] = mainWin.getItemDesc("OCT_3CHAR").toUpperCase();
gShortMonthValues[10] = mainWin.getItemDesc("NOV_3CHAR").toUpperCase();
gShortMonthValues[11] = mainWin.getItemDesc("DEC_3CHAR").toUpperCase();

var gLongMonthValues = new Array();
gLongMonthValues[0] = mainWin.getItemDesc("JANUARY").toUpperCase();
gLongMonthValues[1] = mainWin.getItemDesc("FEBRUARY").toUpperCase();
gLongMonthValues[2] = mainWin.getItemDesc("MARCH").toUpperCase();
gLongMonthValues[3] = mainWin.getItemDesc("APRIL").toUpperCase();
gLongMonthValues[4] = mainWin.getItemDesc("MAY").toUpperCase();
gLongMonthValues[5] = mainWin.getItemDesc("JUNE").toUpperCase();
gLongMonthValues[6] = mainWin.getItemDesc("JULY").toUpperCase();
gLongMonthValues[7] = mainWin.getItemDesc("AUGUST").toUpperCase();
gLongMonthValues[8] = mainWin.getItemDesc("SEPTEMBER").toUpperCase();
gLongMonthValues[9] = mainWin.getItemDesc("OCTOBER").toUpperCase();
gLongMonthValues[10] = mainWin.getItemDesc("NOVEMBER").toUpperCase();
gLongMonthValues[11] = mainWin.getItemDesc("DECEMBER").toUpperCase();

var gCurDisplayDate;

function getSeparator(dateFormat) {
    var separator = "";
    if (dateFormat && dateFormat != "") {
        for (var i = 0;i < dateFormat.length;i++) {
            testCharacter = dateFormat.charAt(i);
            if ((testCharacter.toUpperCase() != 'D') && (testCharacter.toUpperCase() != 'Y') && (testCharacter.toUpperCase() != 'M')) {
                separator = testCharacter;
                break;
            }
        }
    }
    return separator;
}

function isValidYear(strYear) {
    var validYear = true;
    if (!strYear || strYear == null || typeof (strYear) == 'undefined') {
        validYear = false;
    }
    else if ((strYear.length != 4) && (strYear.length != 2)) {
        validYear = false;
    }
    else if (containsOnlyDigits(strYear) == false) {
        validYear = false;
    }
    else if (strYear.length == 4) {
        if (parseInt(strYear, 10) < 1601)
            validYear = false;
    }
    return validYear;
}

function containsOnlyDigits(strValue) {
    var retVal = true;
    for (var i = 0;i < strValue.length;i++) {
        dummyChr = strValue.charAt(i);
        if (dummyChr < '0' || dummyChr > '9') {
            retVal = false;
            break;
        }
    }
    return retVal;
}

function isValidFormat(dateFormat, separator) {
    var validFormat = true;
    if (!dateFormat || dateFormat == "") {
        validFormat = false;
    }
    if (validFormat) {
        validFormatCharacters = 'dyM';
        if (separator && separator != "") {
            validFormatCharacters += separator;
        }
        for (var i = 0;i < dateFormat.length;i++) {
            testCharacter = dateFormat.charAt(i);
            if (validFormatCharacters.indexOf(testCharacter) < 0) {
                validFormat = false;
                break;
            }
        }
    }
    if (validFormat) {
        if (separator && separator != "") {
            var arrFormatTokens = dateFormat.split(separator);
            if (arrFormatTokens.length != 3) {
                validFormat = false;
            }
            else {
                var numDateTokens = 0, numMonthTokens = 0, numYearTokens = 0;
                for (var i = 0;i < 3;i++) {
                    token = arrFormatTokens[i];
                    switch (token) {
                        case "d":
                            numDateTokens++;
                            break;
                        case "dd":
                            numDateTokens++;
                            break;
                        case "M":
                            numMonthTokens++;
                            break;
                        case "MM":
                            numMonthTokens++;
                            break;
                        case "MMM":
                            numMonthTokens++;
                            break;
                        case "MMMM":
                            numMonthTokens++;
                            break;
                        case "yy":
                            numYearTokens++;
                            break;
                        case "yyyy":
                            numYearTokens++;
                            break;

                        default :
                            validFormat = false;
                    }
                }

                if ((numDateTokens != 1) || (numMonthTokens != 1) || (numYearTokens != 1)) {
                    validFormat = false;
                }
            }
        }
    }
    if (validFormat) {
        if (!separator || separator == "") {
            dayStartIndex = dateFormat.indexOf("d");
            dayEndIndex = dateFormat.lastIndexOf("d");
            token = dateFormat.substring(dayStartIndex, dayEndIndex + 1);
            if (token != "dd") {
                validFormat = false;
            }
            monthStartIndex = dateFormat.indexOf("M");
            monthEndIndex = dateFormat.lastIndexOf("M");
            token = dateFormat.substring(monthStartIndex, monthEndIndex + 1);
            if ((token != "MM") && (token != "MMM")) {
                validFormat = false;
            }
            yearStartIndex = dateFormat.indexOf("y");
            yearEndIndex = dateFormat.lastIndexOf("y");
            token = dateFormat.substring(yearStartIndex, yearEndIndex + 1);
            if ((token != "yy") && (token != "yyyy")) {
                validFormat = false;
            }
        }
    }
    return validFormat;
}

function getMonthFromMMM(MMM) {
    var retVal =  - 1;
    if (MMM && MMM != "") {
        for (var i = 0;i < gShortMonthValues.length;i++) {
            if (gShortMonthValues[i] == MMM.toUpperCase()) {
                retVal = i;
                break;
            }
        }
    }
    return retVal;
}

function getMonthFromMMMM(MMMM) {
    var retVal =  - 1;
    if (MMMM && MMMM != "") {
        for (var i = 0;i < gLongMonthValues.length;i++) {
            if (gLongMonthValues[i] == MMMM.toUpperCase()) {
                retVal = i;
                break;
            }
        }
    }
    return retVal;
}

function isValidMonth(month, lengthMonthFormat) {
    var retVal = true;
    if (!month || month == "" || month == 'NaN' || typeof (month) == 'undefined') {
        retVal = false;
    }
    else {
        switch (month.length) {
            case 1:
            case 2:
                if (month.length > 2) {
                    retVal = false;
                }
                else if (containsOnlyDigits(month) == false) {
                    retVal = false;
                }
                else if ((parseInt(month, 10) < 1) || (parseInt(month, 10) > 12)) {
                    retVal = false;
                }
                break;
            case 3:
                if (getMonthFromMMM(month) < 0) {
                    retVal = false;
                }
                break;
            case 4:
                if (getMonthFromMMMM(month) < 0) {
                    retVal = false;
                }
                break;
            default :
                retVal = false;
                break;
        }
    }
    return retVal;
}

function format(y, m, d, dateFormat, separator) {
    var l_retval = '';
    var y1;
    var m1;
    var d1;
    var dateFormatComp = '';
    if (!dateFormat || dateFormat == '') {
        dateFormat = gDateFormatDSO;
    }
    if (!separator || separator == '') {
        separator = gDateSeperator
    }
    d1 = parseInt(d, 10);
    y1 = y % 100;
    m1 = parseInt(m, 10) + 1;
    dateFormatComp = splitDateFormat(dateFormat, separator);
    for (var i = 0;i < 3;i++) {
        switch (dateFormatComp[i]) {
            case 'd':
            case 'D':
                l_retval += d1;
                break;
            case 'dd':
            case 'DD':
                if (d1 < 10)
                    l_retval += '0';
                l_retval += d1;
                break;
            case 'M':
                l_retval += m1;
                break;
            case 'mm':
            case 'MM':
                if (m1 < 10)
                    l_retval += '0';
                l_retval += m1;
                break;
            case 'MMM':
            case 'MON':
                l_retval += gShortMonthValues[m];
                break;
            case 'MMMM':
                l_retval += getMonthFromMMMm(m);
                break;
            case 'yy':
            case 'YY':
                if (y1 == 0)
                    l_retval += "00";
                else {
                    if (y1 < 10)
                        l_retval += "0";
                    l_retval += y1;
                }
                break;

            case 'YYYY':
            case 'yyyy':
                var fulYear = getYYYYfromYYMMDD(y + '', m + '', d1 + '');
                l_retval += fulYear;
                break;
        }
        if (i < 2)
            if (separator && separator != '' && separator.toUpperCase() != "NULL")
                ;
        l_retval += separator;
    }
    l_retval = l_retval.substring(0, l_retval.length - 1);
    return l_retval;
}

function hostFormat(clientDate) {
    var l_retval = '';
    var m1;
    var y1;
    var dmy = new Array();
    get_dd_mm_yy(clientDate, dmy);
    y1 = parseInt(dmy[2], 10);
    m1 = dmy[1] + 1;
    if (y1 >= 0 && y1 <= 99)
        y1 += (y1 < 50 ? 2000 : 1900);
    dmy[2] = y1;
    l_retval += dmy[2];
    if (dmy[1] < 9)
        l_retval += '0';
    l_retval += m1;
    if (dmy[0] < 10)
        l_retval += '0';
    l_retval += dmy[0];
    return l_retval;
}

function clientFormat(hostDate) {
    var dmy = new Array();
    dmy[0] = hostDate.substring(6, hostDate.length);
    dmy[1] = hostDate.substring(4, 6);
    dmy[2] = hostDate.substring(0, 4);
    var clientDate = format(parseInt(dmy[2], 10), parseInt(dmy[1], 10) - 1, parseInt(dmy[0], 10));
    return clientDate;
}

function getInputDateFormat(dateFormat) {
    var dateInputFormat = null;
    if (dateFormat && dateFormat != "") {
        dateInputFormat = dateFormat;
    }
    else if (gInpDateFormat && gInpDateFormat != "") {
        dateInputFormat = gInpDateFormat;
    }
    else {
        dateInputFormat = mainWin.systemDateFormat;
    }
    return dateInputFormat;
}

function splitDateFormat(dateInputFormat, separator) {
    if (!separator || separator == '' || separator.toUpperCase() == "NULL") {
        var dateFormat = new Array();
        var upperCaseDateFormat = dateInputFormat.toUpperCase();
        var yStartIndex =  - 1;
        var yEndIndex =  - 1;
        yStartIndex = upperCaseDateFormat.indexOf("Y");
        yEndIndex = upperCaseDateFormat.lastIndexOf("Y");
        dateFormat.push(dateInputFormat.substring(yStartIndex, yEndIndex + 1));
        yStartIndex =  - 1;
        yEndIndex =  - 1;
        yStartIndex = upperCaseDateFormat.indexOf("M");
        yEndIndex = upperCaseDateFormat.lastIndexOf("M");
        dateFormat.push(dateInputFormat.substring(yStartIndex, yEndIndex + 1));
        yStartIndex =  - 1;
        yEndIndex =  - 1;
        yStartIndex = upperCaseDateFormat.indexOf("D");
        yEndIndex = upperCaseDateFormat.lastIndexOf("D");
        dateFormat.push(dateInputFormat.substring(yStartIndex, yEndIndex + 1));
        return dateFormat;
    }
    else {
        return dateInputFormat.split(separator);
    }
}

function splitDate(dt, dateFormatComp, separator) {
    if (!separator || separator == '' || separator.toUpperCase() == "NULL") {
        var dateComp = new Array();
        var offset = 0;
        for (var cnt = 0;cnt < dateFormatComp.length;cnt++) {
            dateComp.push(dt.substring(offset, offset + dateFormatComp[cnt].length));
            offset = offset + dateFormatComp[cnt].length;
        }
        return dateComp;
    }
    else {
        return dt.split(separator);
    }
}

function get_dd_mm_yy(dt, dateInputFormat, separator, dmy) {
    var dd, mm, yy;
    var date_format_parts = splitDateFormat(dateInputFormat, separator);
    var date_parts = splitDate(dt, date_format_parts, separator);
    for (var cnt = 0;cnt < date_format_parts.length;cnt++) {
        if (date_format_parts[cnt].toUpperCase().charAt(0) == 'Y') {
            yy = date_parts[cnt];
        }
        else if (date_format_parts[cnt].toUpperCase().charAt(0) == 'D') {
            dd = date_parts[cnt];
        }
        else if (date_format_parts[cnt].toUpperCase().charAt(0) == 'M') {
            switch (date_format_parts[cnt].toUpperCase()) {
                case 'M':
                    mm = date_parts[cnt];
                    break;
                case 'MM':
                    mm = date_parts[cnt];
                    break;
                case 'MMM':
                    mm = parseInt(getMonthFromMMM(date_parts[cnt].toUpperCase()), 10) + 1 + '';
                    break;
                case 'MON':
                    mm = parseInt(getMonthFromMMM(date_parts[cnt].toUpperCase()), 10) + 1 + '';
                    break;
                case 'MMMM':
                    mm = parseInt(getMonthFromMMMM(date_parts[cnt].toUpperCase()), 10) + 1 + '';
                    break;
            }

        }
    }
    dmy[0] = dd;
    dmy[1] = mm;
    dmy[2] = yy;
    return;
}

function MB3Date(inputDate, dateFormat,frmValInpDate) {//Fix for 19522233
    this.validDate = true;
    this.yyyy = 0;
    this.mm = 0;
    this.dd = 0;
    this.separator = null;
    this.dateInputFormat = null;
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
    //Fix for 19522233 begins
    if (this.validDate) {
        if (!isValidYear(yyInput)) {
            if(frmValInpDate) displayMsg('ST-COM005', dFormat + '~');
            else  parent.displayMsg('ST-COM005', dFormat + '~');
            this.validDate = false;
        }
    }
    if (this.validDate) {
        if (!isValidMonth(mmInput + '')) {
            if(frmValInpDate) displayMsg('ST-COM006', dFormat + '~');
            else parent.displayMsg('ST-COM006', dFormat + '~');
            this.validDate = false;
        }
    }
    if (this.validDate) {
        if (containsOnlyDigits(ddInput) == false) {
            if(frmValInpDate) displayMsg('ST-COM007', dFormat + '~');
            else parent.displayMsg('ST-COM007', dFormat + '~');
            this.validDate = false;
        }
    }
    if (this.validDate) {
        var dummyDate = getDateObject(yyInput, mmInput - 1, ddInput);
        if ((dummyDate.getMonth() + 1) != (mmInput)) {
            if(frmValInpDate) displayMsg('ST-COM007', dFormat + '~');
            else parent.displayMsg('ST-COM007', dFormat + '~');
            this.validDate = false;
        }
    }//Fix for 19522233 ends
    if (this.validDate) {
        yyInput = parseInt(yyInput, 10);
        if (yyInput >= 0 && yyInput <= 99)
            yyInput += (yyInput < 50 ? 2000 : 1900);
        this.yyyy = yyInput;
        this.mm = mmInput - 1 + '';
        this.dd = ddInput;
        this.separator = sep;
        this.dateInputFormat = dFormat;
    }

    this.isValidDate = isValidDate;
    this.getShortDate = getShortDate;
    this.getInputDate = getInputDate;
    this.getDSODate = getDSODate;
    this.getFormattedDate = getFormattedDate;
    this.getInputDateFormat = getInputDateFormat;
}

function getDSODate() {
    var retDate = format(this.yyyy, this.mm, this.dd, gDateFormatDSO, gDateSeperator);
    return retDate;
}

function getFormattedDate(dateFormat) {
    if (this.isValidDate()) {
        var Separator = getSeparator(dateFormat);
        var retDate = format(this.yyyy, this.mm, this.dd, dateFormat, Separator);// formatDate('' + this.yyyy + zeroPrefix(this.mm,2) + zeroPrefix(this.dd,2), dateFormat);
        return retDate;
    }
}

function getInputDate() {
    if (this.isValidDate()) {
        var retDate = format(this.yyyy, this.mm, this.dd, this.dateInputFormat, this.separator);
        return retDate;
    }
}

function getShortDate() {
    if (this.isValidDate()) {
        return getSystemShortDate(this.yyyy, parseInt(this.mm, 10) + 1, this.dd);
    }
}

function isValidDate() {
    return (this.validDate);
}

function changeDateFormatFromOracleToJava(dsDate) {
    var oraDate = dsDate;
    var oraDateParts = oraDate.split("-");
    var javaDateParts = new Array();
    javaDateParts[0] = oraDateParts[2];
    javaDateParts[2] = oraDateParts[0];
    var oraMonths = new Array();
    oraMonths['JAN'] = "01";
    oraMonths['FEB'] = "02";
    oraMonths['MAR'] = "03";
    oraMonths['APR'] = "04";
    oraMonths['MAY'] = "05";
    oraMonths['JUN'] = "06";
    oraMonths['JUL'] = "07";
    oraMonths['AUG'] = "08";
    oraMonths['SEP'] = "09";
    oraMonths['OCT'] = "10";
    oraMonths['NOV'] = "11";
    oraMonths['DEC'] = "12";
    javaDateParts[1] = oraMonths[oraDateParts[1]];
    var javaFormatDate = javaDateParts[0] + "-" + javaDateParts[1] + "-" + javaDateParts[2];
    return javaFormatDate;
}

function displayDate(dataBoundElem, triggerOnChange) {
    var idDispVal = dataBoundElem.name + "I";
    var inpElem;
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV")
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode.parentNode, idDispVal);
    else 
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode, idDispVal);

    var dsDate = dataBoundElem.value;
    if (dsDate && dsDate != "") {
        var mb3Date = new MB3Date(dsDate, gDateFormatDSO,false);//Fix for 19522233
        if (mb3Date.isValidDate()) {
            if (g_dateFromSystemSetting) {
                inpElem.value = mb3Date.getShortDate();
            }
            else {
                inpElem.value = mb3Date.getInputDate();
            }
            /*Fix for Bug 17344085 Start */
            if (typeof (gAction) != 'undefined') {
                if ((gAction != 'QUERY') && (arguments.length == 1)) {
                    fireHTMLEvent(inpElem, "onchange");
                }
            }
        }
    }
    else {
        inpElem.value = "";
        if (typeof (gAction) != 'undefined') {
            if ((gAction != 'QUERY') && (arguments.length == 1)) {
                fireHTMLEvent(inpElem, "onchange");
            }
        }
        /*Fix for Bug 17344085 End*/
    }
}

function acceptInputDate(idDate, e) {
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV")
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idDate);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idDate);
    var dsDate = curDataBoundElem.value;
    if (dsDate && dsDate != "") {
        var mb3Date = new MB3Date(dsDate, gDateFormatDSO,false);//Fix for 19522233
        if (mb3Date.isValidDate()) {
            if (g_dateFromSystemSetting) {
                curInpElem.value = mb3Date.getShortDate();
            }
            else {
                curInpElem.value = mb3Date.getInputDate();
            }
        }
    }
    gCurDisplayDate = curInpElem.value;
}

function validateInputDate(idDate, e) {
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV")
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idDate);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idDate);
    var inpDate = curInpElem.value;
    var mb3Date;
    if (inpDate && inpDate != "") {
        if (g_dateFromSystemSetting) {
            var mb3Date = new MB3Date(inpDate, mainWin.systemDateFormat,true);//Fix for 19522233
        } else {
            var mb3Date = new MB3Date(inpDate, gDateFormatDSO,true);//Fix for 19522233
        }
        if (mb3Date.isValidDate()) {
            if (curDataBoundElem.length == 2) {
                curDataBoundElem[0].value = mb3Date.getDSODate();
                fireHTMLEvent(curDataBoundElem[0], "onpropertychange");
                curDataBoundElem[1].value = mb3Date.getDSODate();
                fireHTMLEvent(curDataBoundElem[1], "onpropertychange");
            }
            else {
                curDataBoundElem.value = mb3Date.getDSODate();
                fireHTMLEvent(curDataBoundElem, "onpropertychange");
            }
        }
        else {
            curInpElem.value = "";
            getPreviousSibling(getPreviousSibling(curInpElem)).value = "";//Added by 20932 
            focusReqd = false;
            focusField = curInpElem;
            event.returnValue = false;
            gIsValid = false;
        }
    }
    else {
        curDataBoundElem.value = "";
    }
}
//9NT1606_14_0_RETRO_12_0_3_27393036 changes starts
function autoPopSep(idDate1, e) {
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);    
    var dFormat1 = getInputDateFormat();
    var sep1 = getSeparator(dFormat1);
    var numChars = curInpElem.value.length;
    if(e.which != 8) {
        if (dFormat1.charAt(numChars) == sep1) {
            curInpElem.value = curInpElem.value + sep1;
        }
    }
}
//9NT1606_14_0_RETRO_12_0_3_27393036 changes ends

function fnLeapYear(inYear) {
    var leapFlag = false;
    if (inYear % 4 == 0) {
        if (inYear % 100 == 0) {
            if (inYear % 400 == 0)
                leapFlag = true;
            else 
                leapFlag = false;
        }
        else {
            leapFlag = true;
        }
    }
    else {
        leapFlag = false;
    }
    return leapFlag;
}

function getAuditBlockDate(serverDate) {
    var dateArr = serverDate.split(" ");
    var sysDate = "";
    var mb3Date = new MB3Date(dateArr[0], gDateFormatDSO,false);//Fix for 19522233
    if (mb3Date.isValidDate()) sysDate = mb3Date.getShortDate();
    var sysTime = getSystemTime(dateArr[1]);
    return sysDate + " " + sysTime;
}

var cThousandSpecifier = "T";
var cMillionSpecifier = "M";
var cBillionSpecifier = "B";
var cAmountSpecifiers = cThousandSpecifier + cMillionSpecifier + cBillionSpecifier;
var isfromscreen = false;
var isformat = false;

function ccy(numDigitsAfterDecimal, formatMask, roundRule, roundUnit) {
    this.numDigitsAfterDecimal = numDigitsAfterDecimal;
    this.formatMask = formatMask;
    this.roundRule = roundRule;
    this.roundUnit = roundUnit;
}

function getNumDigitsAfterDecimal(ccyCode) {
   //32647772
   // if (ccyCode != "ALL") {
    //    return mainWin.g_objCcy[ccyCode].numDigitsAfterDecimal;
   // }
   // else {
   //     return mainWin.g_objCcy[mainWin.Lcy].numDigitsAfterDecimal;
   // }
   return mainWin.g_objCcy[ccyCode].numDigitsAfterDecimal;
}

function getFormatMask(ccyCode) {
   //32647772
   // if (ccyCode != "ALL") {
   //     return mainWin.g_objCcy[ccyCode].formatMask;
   // }
   // else {
   //     return mainWin.g_objCcy[mainWin.Lcy].formatMask;
   // }
   return mainWin.g_objCcy[ccyCode].formatMask;
}

function MB3Amount(amt, isInputAmt, ccy, fromSummary) {
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
    if (isInputAmt) {
        negativeSymbol = gNegativeSymbol;
        decimalSymbol = gDecimalSymbol;
        digitGroupingSymbol = gDigitGroupingSymbol;
    }
    if (ccy != null && ccy != "") {
        ccy = doTrim(ccy);
    }
    if (this.isValid()) {
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

    if (this.isValid()) {
        if (cAmountSpecifiers.indexOf(tmpAmt.toUpperCase().substr(tmpAmt.length - 1)) >  - 1) {
            amountSpecifier = tmpAmt.toUpperCase().substr(tmpAmt.length - 1);
            tmpAmt = tmpAmt.substr(0, tmpAmt.length - 1);
        }
        if (tmpAmt.substr(0, 1) == negativeSymbol) {
            this.negativeNum = true;
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
        //FCUBS_12.0.1_RETRO_16373726 Start
        if (tmpAmt.indexOf('E') !=  - 1) {
            tmpAmt = tmpAmt * 1 + "";
        }
        //FCUBS_12.0.1_RETRO_16373726 End
        arrAmtComponents = tmpAmt.split(decimalSymbol);
        if ((arrAmtComponents.length != 1) && (arrAmtComponents.length != 2)) {
            displayMsg("ST-COM009");
            this.valid = false;
        }
    }
    if (this.isValid()) {
        for (var tmpIndex = 0;tmpIndex < arrAmtComponents.length;tmpIndex++) {
            if (!containsOnlyDigits(arrAmtComponents[tmpIndex])) {
                displayMsg("ST-COM010");
                this.valid = false;
            }
        }
    }
    if (this.isValid()) {
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
                if (!fromSummary)
                    displayMsg("ST-COM011", ccy + "~");
                this.valid = false;

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
    if (this.isValid()) {
        this.amt = arrAmtComponents.join(decimalSymbol);
        this.ccy = ccy;
    }
    return this.valid;
}

MB3Amount.prototype.isValid = isValid;
MB3Amount.prototype.getDisplayAmount = getDisplayAmount;
MB3Amount.prototype.getInputAmount = getInputAmount;
MB3Amount.prototype.getDSOAmount = getDSOAmount;

function isValid() {
    return (this.valid);
}

function getInputAmount() {
    var amountFormat = getFormatMask(this.ccy);
    var numDigitsAfterDecimal = getNumDigitsAfterDecimal(this.ccy);
    return formatAmount(this.amt, this.negativeNum, amountFormat, numDigitsAfterDecimal, gDecimalSymbol, gDigitGroupingSymbol, "-1");
}

function getDisplayAmount() {
    var amountFormat = getFormatMask(this.ccy);
    var numDigitsAfterDecimal = getNumDigitsAfterDecimal(this.ccy);
    return formatAmount(this.amt, this.negativeNum, amountFormat, numDigitsAfterDecimal, gDecimalSymbol, gDigitGroupingSymbol, gNegativeFormat);
}

function getDSOAmount() {
    var retAmt = "";
	//9NT1606_14_1_RETRO_12_3_28204522 start
	/*
    if (parseFloat(this.amt) != 0) {
        if (this.negativeNum == true) {
            retAmt = "-";
        }
        retAmt += this.amt;
    }
    else {
        retAmt = this.amt;
    }
	*/
	if (this.negativeNum == true) {
		retAmt = "-";
	}
	retAmt += this.amt;    
	//9NT1606_14_1_RETRO_12_3_28204522 end
    
    return retAmt;
}

function formatAmount(dsoAmt, isNegative, digitGrouping, numDigitsAfterDecimal, gDecimalSymbol, gDigitGroupingSymbol, negativeFormat) {
    var arrTemp = dsoAmt.split(gDecimalSymbol);
    var numBeforeDecimal = arrTemp[0];
    var numAfterDecimal = arrTemp[1];
    var retVal = "";
    var digitPos = 0;
    for (var loopIndex = numBeforeDecimal.length - 1;loopIndex >= 0;loopIndex--) {
        switch (digitGrouping) {
            case "I":
                if ((digitPos > 1) && ((digitPos % 3) == 0)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
                break;
            case "N":
                if ((digitPos > 1) && ((digitPos % 2) == 1)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
                break;
            default :
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
        }
        digitPos++;
    }

    if (numDigitsAfterDecimal > 0) {
        retVal += gDecimalSymbol;
        numAfterDecimal += "000000000000000000000000000000000000";
        retVal += numAfterDecimal.substr(0, numDigitsAfterDecimal);
    }
    if (isNegative) {
        switch (negativeFormat) {
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

            default :
                retVal = gNegativeSymbol + retVal;
        }
    }
    return retVal;

}
//BUG 19457357 changes start 
function displayAmountDB(dataBoundElem, idCCY, triggerOnChange) {

    if (isformat == true && isfromscreen == true) return;
    var idDispAmt = dataBoundElem.name + "I";
    var inpElem;
    var tableObj = "";
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV") inpElem = getInpElem(dataBoundElem.parentNode.parentNode.parentNode, idDispAmt);
    else inpElem = getInpElem(dataBoundElem.parentNode.parentNode, idDispAmt);
    var amt = dataBoundElem.value;
	/*Fix for 18174232 Starts*/
	var singleView = false;
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
      singleView = true;
    }
	/*Fix for 18174232 Ends*/
    //12_0_2_RETRO_12_2_24813514
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "DIV" && dataBoundElem.parentNode.parentNode.getAttribute("VIEW") == "SE") {
       singleView = true;
    } 
    var ccy = "";
    if (idCCY == "") {
        ccy = mainWin.Lcy;
    } else {
        /*
        var rowNo = -1;
        if (document.getElementsByName(idCCY).length > 1) {
            var objTR = dataBoundElem.parentNode;
            while (typeof(objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                objTR = objTR.parentNode;
            }
            if (typeof(objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 1;
            else rowNo = 0;
        } else {
            rowNo = 0;
        }
        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
        else ccy = document.getElementsByName(idCCY)[0].value;
        */
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
                        if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex;
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
                        if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex;// fix for 21591462 
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
                      /* commented for 17073111
					  var rowNo = -1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                        else rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else */
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
                                if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex;//Fix for 21591405
                                else rowNo = 0;
                            }else{
                                if (typeof (objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 2;
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
    }

    if (ccy == "") ccy = mainWin.Lcy;

    if (document.getElementsByName(idCCY).length > 0 && ccy == "") {
        ccy = mainWin.Lcy;
    }
    
    if (amt && amt != "" &&  amt !='--') {//BUG 19457357 changes

        var mb3Amount = new MB3Amount(amt, true, ccy);
        if (mb3Amount.isValid()) {
            inpElem.value = mb3Amount.getDisplayAmount();
            isformat = true;
            isfromscreen = true;
            dataBoundElem.value = dataBoundElem.value.replace(gDecimalSymbol, ".");
        }
    } else if (amt=='--')//BUG 19457357 changes 
        inpElem.value = amt;
    else {
        inpElem.value = "";
    }
    isformat = false;
    isfromscreen = false;
}
//BUG 19457357 changes ends 

function displayAmount(dataBoundElem, idCCY, triggerOnChange) {
    if (isformat == true && isfromscreen == true)
        return;
    var idDispAmt = dataBoundElem.name + "I";
    var inpElem;
    //debugger;
    var tableObj = "";
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV")
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode.parentNode, idDispAmt);
    else 
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode, idDispAmt);
    var amt = dataBoundElem.value;
    /*Fix for 18174232 Starts*/
    var singleView = false;
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = true;
    }
    /*Fix for 18174232 Ends*/
    
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "DIV" && dataBoundElem.parentNode.parentNode.getAttribute("VIEW") == "SE") {
       singleView = true;
   } //Fix for 21457134
    var ccy = "";
    if (idCCY == "") {
        ccy = mainWin.Lcy;
    }
    else {
        /*
        var rowNo = -1;
        if (document.getElementsByName(idCCY).length > 1) {
            var objTR = dataBoundElem.parentNode;
            while (typeof(objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                objTR = objTR.parentNode;
            }
            if (typeof(objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 1;
            else rowNo = 0;
        } else {
            rowNo = 0;
        }
        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
        else ccy = document.getElementsByName(idCCY)[0].value;
        */
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/
            /*var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }
*/

            if ((isMEBlock=='true' && !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = curDataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex - 2;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
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
            blockName = dataBoundElem.id.substring(0, dataBoundElem.id.lastIndexOf("__"));

            var isMEBlock = false;
            for (var i = 0;i < multipleEntryIDs.length;++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }

            if ((isMEBlock && !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }
                if (typeof (screenType) != "undefined" && screenType == 'D') {
                    tableObj = document.getElementById("Innertable_" + functionId);
                }
                else {
                    tableObj = getTableObjForBlock(blockName);
                }
                if (tableObj && tableObj.tBodies[0].rows.length > 0) { //21457134
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                        for (var j = 0;j < inputElements.length;++j) {
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
                        /* commented for 17073111
					  var rowNo = -1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                        else rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else */
                        ccy = document.getElementsByName(idCCY)[0].value;
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
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = dataBoundElem.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if (typeof (screenType) != "undefined" && screenType == "D") {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex;//Fix for 21591405
                                else 
                                    rowNo = 0;
                            }
                            else {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 2;
                                else 
                                    rowNo = 0;
                            }
                        }
                        else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
    }

    if (ccy == "")
        ccy = mainWin.Lcy;

    if (document.getElementsByName(idCCY).length > 0 && ccy == "") {
        ccy = mainWin.Lcy;
    }

    if (amt && amt != "") {

        var mb3Amount = new MB3Amount(amt, true, ccy);
        if (mb3Amount.isValid()) {
            inpElem.value = mb3Amount.getDisplayAmount();
            isformat = true;
            isfromscreen = true;
            dataBoundElem.value = dataBoundElem.value.replace(gDecimalSymbol, ".");
        }
    }
    else {
        inpElem.value = "";
    }
    isformat = false;
    isfromscreen = false;
}

var gCurDisplayAmount = 0;

function acceptInputAmount(idAmount, idCCY, e) {
    isfromscreen = true;
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV")//Abs Positioning
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var dsAmount = curInpElem.value;

    var ccy = "";
    if (idCCY == "")
        ccy = mainWin.Lcy;
    else {
        /*
        if (document.getElementById(idCCY)) {
            var rowNo = -1;
            if (getRowIndex(e) == 0 || getRowIndex(e) == -1) rowNo = 0;
            else rowNo = getRowIndex(e) - 1;
            if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
            else ccy = document.getElementsByName(idCCY)[0].value;
        } else ccy = mainWin.Lcy;
        */
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/
            /* var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }
*/
            if (isMEBlock=='true') {
                //Block is a multiple entry
                var rowNo =  - 1;
                var rowIndex = getRowIndex(event);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
            }
            else {
                //Block is a Single Entry
                ccy = document.getElementById(idCCY).value;
            }
        }
        else {
            //Block is not part of the idCCY
            blockName = curInpElem.id.substring(0, curInpElem.id.lastIndexOf("__"));

            
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/
            /*for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }*/

            if (isMEBlock=='true') {
                //Block is a multiple entry
                var rowNo =  - 1;
                var rowIndex = getRowIndex(event);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                var tableObj = getTableObjForBlock(blockName);

                for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                    var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                    for (var j = 0;j < inputElements.length;++j) {
                        if (inputElements[j].name == idCCY) {
                            ccy = inputElements[j].value;
                            break;
                        }
                    }
                    if (ccy != "")
                        break;
                }
                if (ccy == "") {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
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
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
    }

    if (ccy == "") {
        isfromscreen = false;
        return;
    }
    if (!mainWin.g_objCcy[ccy]) {
        displayMsg("ST-COM008", ccy + "~");
        document.getElementsByName(idCCY)[0].focus();
        isfromscreen = false;
        return;
    }

    if (dsAmount && dsAmount != "") {
        var mb3Amount = new MB3Amount(dsAmount, true, ccy);
        if (mb3Amount.isValid()) {
            curInpElem.value = mb3Amount.getInputAmount();
            curDataBoundElem.value = mb3Amount.getDSOAmount();
        }
    }
    gCurDisplayAmount = curInpElem.value;
    isfromscreen = false;
    isformat = true;
}
//BUG 19457357 changes start 
function validateInputAmountDB(idAmount, idCCY, e) { 
    isfromscreen = true;
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var inpAmount = curInpElem.value;
    var ccy = "";
    if (idCCY == "") ccy = mainWin.Lcy;
    else {
        /*
         * Commented for checking the below code
        if (document.getElementsByName(idCCY).length > 0) {
            var rowNo = -1;
            if (getRowIndex(event) == 0 || getRowIndex(event) == -1) rowNo = 0;
            else rowNo = getRowIndex(event) - 1;
            if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
            else ccy = document.getElementsByName(idCCY)[0].value;
        } else ccy = mainWin.Lcy;
        */
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

            if (isMEBlock) {
                //Block is a multiple entry
                var rowNo = -1;
                var rowIndex = getRowIndex(event);
                if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                else rowNo = rowIndex - 1;

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
            } else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
            }
        } else {
            //Block is not part of the idCCY
            blockName = curInpElem.id.substring(0, curInpElem.id.lastIndexOf("__"));

            var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }

            if (isMEBlock) {
                //Block is a multiple entry
                var rowNo = -1;
                var rowIndex = getRowIndex(event);
                if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                else rowNo = rowIndex - 1;

                var tableObj = getTableObjForBlock(blockName);

                for (var i = 0; i < tableObj.tBodies[0].rows[rowNo].cells.length; ++i) {
                    var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                    for (var j = 0; j < inputElements.length; ++j) {
                        if (inputElements[j].name == idCCY) {
                            ccy = inputElements[j].value;
                            break;
                        }
                    }
                    if (ccy != "") break;
                }
                if (ccy == "") {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo = -1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                        else rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else ccy = document.getElementsByName(idCCY)[0].value;
                    } else ccy = mainWin.Lcy;
                }
            } else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                } else {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo = -1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                        else rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else ccy = document.getElementsByName(idCCY)[0].value;
                    } else ccy = mainWin.Lcy;
                }
            }
        }
    }

    if (ccy == "" && inpAmount != "") {
        mask();
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I');
        focusReqd = false;
        focusField = curInpElem;
        alertAction = "UNMASK";
        curInpElem.value = "";
        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
        gIsValid = false;
        isfromscreen = false;
        return;
    }
    if (!mainWin.g_objCcy[ccy]) {
		//Fix for 18295564
		curDataBoundElem.value = '';
        isfromscreen = false;
        return;
    }
    if (inpAmount && inpAmount != "" && inpAmount !='--') { //BUG 19457357 changes  
        var mb3Amount = new MB3Amount(inpAmount, true, ccy);
        if (mb3Amount.isValid()) {
            isformat = false;
            curDataBoundElem.value = mb3Amount.getDSOAmount();
            fireHTMLEvent(curDataBoundElem, "onpropertychange");
            isformat = true;
            var inpElemId = curDataBoundElem.name + "I";
            var inpElem;
            if (curDataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || curDataBoundElem.parentNode.tagName.toUpperCase() == "DIV") inpElem = getInpElem(curDataBoundElem.parentNode.parentNode.parentNode, inpElemId);
            else inpElem = getInpElem(curDataBoundElem.parentNode.parentNode, inpElemId);
            if (inpElem && inpElem.getAttribute("MAXLENGTH1")) {
                if (inpAmount && inpAmount != "") {
                    var tmp = inpAmount;
                    if (inpAmount.lastIndexOf(gDecimalSymbol) != -1) tmp = inpAmount.substring(0, inpAmount.lastIndexOf(gDecimalSymbol)); //9NT1606_14_1_RETRO_12_3_28204522 replace . with gDecimalSymbol
                    tmp = replaceAllChar(tmp, gDigitGroupingSymbol, "");
                    tmp = replaceAllChar(tmp, gNegativeSymbol, "");
                    if (tmp.length > inpElem.getAttribute("MAXLENGTH1")) {
                        alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") + inpElem.getAttribute("MAXLENGTH1"));
                        focusReqd = false;
                        focusField = curInpElem;
                        curInpElem.value = "";
                        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
                        event.returnValue = false;
                        gIsValid = false;
                    }
                }
            }
        } else {
            focusReqd = false;
            focusField = curInpElem;
            alertAction = "UNMASK";
            curInpElem.value = "";
            getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
            event.returnValue = false;
            gIsValid = false;
        }

    } else {
        if (curDataBoundElem.value != '') 
        {
			if(inpAmount=='--')//BUG 19457357 changes  
				curInpElem.value = inpAmount; 
			else curDataBoundElem.value = '';
		}
    }
    isfromscreen = false;
    isformat = false;
}
//BUG 19457357 changes ends 
function validateInputAmount(idAmount, idCCY, e) {
    isfromscreen = true;
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV")
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var inpAmount = curInpElem.value;
    var ccy = "";
    if (idCCY == "")
        ccy = mainWin.Lcy;
    else {
        /*
         * Commented for checking the below code
        if (document.getElementsByName(idCCY).length > 0) {
            var rowNo = -1;
            if (getRowIndex(event) == 0 || getRowIndex(event) == -1) rowNo = 0;
            else rowNo = getRowIndex(event) - 1;
            if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
            else ccy = document.getElementsByName(idCCY)[0].value;
        } else ccy = mainWin.Lcy;
        */
        var singleView = false;
		//Fix for 24683123
		if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
			singleView = true;
		}
         if (curInpElem.parentNode.tagName.toUpperCase() == "DIV" && curDataBoundElem.parentNode.parentNode.getAttribute("VIEW") == "SE" ) {
       singleView = true;
   } //Fix for 21457134
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/
            /*var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }

*/
            if (isMEBlock=='true' && !singleView ) {//Fix for 21457134
                //Block is a multiple entry
                var rowNo =  - 1;
                var rowIndex = getRowIndex(event);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
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
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/
            /* var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }

*/
             if (isMEBlock=='true' && !singleView ) {//Fix for 21457134
                //Block is a multiple entry
                var rowNo =  - 1;
                var rowIndex = getRowIndex(event);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                var tableObj = getTableObjForBlock(blockName);
				if(tableObj) { //21457134
					for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
						var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
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
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
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
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
    }

    if (ccy == "" && inpAmount != "") {
        mask();
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I');
        focusReqd = false;
        focusField = curInpElem;
        alertAction = "UNMASK";
        curInpElem.value = "";
        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
        gIsValid = false;
        isfromscreen = false;
        return;
    }
    if (!mainWin.g_objCcy[ccy]) {
        //Fix for 18295564
        curDataBoundElem.value = '';
        isfromscreen = false;
        return;
    }
    if (inpAmount && inpAmount != "") {
        var mb3Amount = new MB3Amount(inpAmount, true, ccy);
        if (mb3Amount.isValid()) {
            isformat = false;
            curDataBoundElem.value = mb3Amount.getDSOAmount();
            fireHTMLEvent(curDataBoundElem, "onpropertychange");
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
                        tmp = inpAmount.substring(0, inpAmount.lastIndexOf(gDecimalSymbol)); //9NT1606_14_1_RETRO_12_3_28204522 replace . with gDecimalSymbol
                    tmp = replaceAllChar(tmp, gDigitGroupingSymbol, "");
                    tmp = replaceAllChar(tmp, gNegativeSymbol, "");
                    if (tmp.length > inpElem.getAttribute("MAXLENGTH1")) {
                        alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") + inpElem.getAttribute("MAXLENGTH1"));
                        focusReqd = false;
                        focusField = curInpElem;
                        curInpElem.value = "";
                        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
                        event.returnValue = false;
                        gIsValid = false;
                    }
                }
            }
        }
        else {
            focusReqd = false;
            focusField = curInpElem;
            alertAction = "UNMASK";
            curInpElem.value = "";
            getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
            event.returnValue = false;
            gIsValid = false;
        }

    }
    else {
        if (curDataBoundElem.value != '')
            curDataBoundElem.value = '';
    }
    isfromscreen = false;
    isformat = false;
}

// Hitesh New function added to validate the input amount when the amount comes from the response
// in this case srcelement will not be the I field, the object will be passedfromthe calling function
function validateResponseAmount(idAmount, idCCY, srcElement) {
    isfromscreen = true;
    var curInpElem = srcElement;
    var tableObj = "";
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV")
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var inpAmount = curInpElem.value;
    var ccy = "";
    var singleView= false; 
    //12_0_2_RETRO_12_2_24813514 Starts
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
      singleView = true;
    }
    //12_0_2_RETRO_12_2_24813514 Ends
    if (curInpElem.parentNode.tagName.toUpperCase() == "DIV" && curDataBoundElem.parentNode.parentNode.getAttribute("VIEW") == "SE" ) {
       singleView = true;
   } //Fix for 21457134
    if (idCCY == "")
        ccy = mainWin.Lcy;
    else {
        /*
          if (document.getElementsByName(idCCY).length > 0) {
              var rowNo = -1;
              if (document.getElementsByName(idCCY).length > 1) {
                  var objTR = curDataBoundElem.parentNode;
                  while (typeof(objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                      objTR = objTR.parentNode;
                  }
                  if (typeof(objTR.tagName) != "undefined") rowNo = objTR.rowIndex - 1;
                  else rowNo = 0;
              } else {
                  rowNo = 0;
              }
              if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
              else ccy = document.getElementsByName(idCCY)[0].value;
          } else ccy = mainWin.Lcy;
      */

        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes */
            /*var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }*/

            //if ((isMEBlock&& !singleView) || (typeof (screenType) != "undefined" && screenType == "D" && functionId.substring(2, 3) != "D")) {//Fix for 21457134 12.4_OBDX_27189724 commented
			if ((isMEBlock == 'true' && !singleView) || (typeof (screenType) != "undefined" && screenType == "D" && functionId.substring(2, 3) != "D")) {//Fix for 21457134	// 12.4_OBDX_27189724 added
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = curDataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex - 2;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
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
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes */
            /*var isMEBlock = false;
            for (var i = 0; i < multipleEntryIDs.length; ++i) {
                if (multipleEntryIDs[i] == blockName) {
                    isMEBlock = true;
                    break;
                }
            }
*/
            //if ((isMEBlock&& !singleView) || (typeof (screenType) != "undefined" && screenType == "D" && functionId.substring(2, 3) != "D")) {//Fix for 21457134 12.4_OBDX_27189724 commented
			if ((isMEBlock == 'true' && !singleView) || (typeof (screenType) != "undefined" && screenType == "D" && functionId.substring(2, 3) != "D")) {//Fix for 21457134	// 12.4_OBDX_27189724 added
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = curDataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex - 2;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }

                if (typeof (screenType) != "undefined" && screenType == "D") {
                    tableObj = document.getElementById("Innertable_" + functionId);
                }
                else {
                    tableObj = getTableObjForBlock(blockName);
                }
				if(tableObj) {//21457134
					for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
						var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
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
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = curDataBoundElem.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if (typeof (screenType) != "undefined" && screenType == "D") {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex;//Fix for 21591405
                                else 
                                    rowNo = 0;
                            }
                            else {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 2;
                                else 
                                    rowNo = 0;
                            }
                        }
                        else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
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
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = curDataBoundElem.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if (typeof (screenType) != "undefined" && screenType == "D") {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 1;
                                else 
                                    rowNo = 0;
                            }
                            else {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 2;
                                else 
                                    rowNo = 0;
                            }
                        }
                        else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
    }

    if (ccy == "" && inpAmount != "") {
        mask();
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I');
        alertAction = "UNMASK";
        curInpElem.value = "";
        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
        return;
    }
    if (!mainWin.g_objCcy[ccy]) {
        return;
    }
    if (inpAmount && inpAmount != "") {
        var mb3Amount = new MB3Amount(inpAmount, true, ccy);
        if (mb3Amount.isValid()) {
            isformat = false;
            curDataBoundElem.value = mb3Amount.getDSOAmount();
            fireHTMLEvent(curDataBoundElem, "onpropertychange");
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
                        tmp = inpAmount.substring(0, inpAmount.lastIndexOf(gDecimalSymbol)); //9NT1606_14_1_RETRO_12_3_28204522 replace . with gDecimalSymbol
                    tmp = replaceAllChar(tmp, gDigitGroupingSymbol, "");
                    tmp = replaceAllChar(tmp, gNegativeSymbol, "");
                    if (tmp.length > inpElem.getAttribute("MAXLENGTH1")) {
                        alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") + inpElem.getAttribute("MAXLENGTH1"));
                        curInpElem.value = "";
                        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
                        event.returnValue = false;
                    }
                }
            }
        }
        else {
            curInpElem.value = "";
            getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
            event.returnValue = false;
        }

    }
    else {
        if (curDataBoundElem.value != '')
            curDataBoundElem.value = '';
    }
    isfromscreen = false;
}

function getInpElem(node, elemId) {
    var inputElem = node.getElementsByTagName("INPUT");
    var inpElem;
    for (var i = 0;i < inputElem.length;i++) {
        if (inputElem[i].name == elemId) {
            inpElem = inputElem[i];
            break;
        }
    }
    return inpElem;
}

function getRowIndex(e) {//debugger;
    var objTR;
    var rowIndex =  - 1;
    var event = window.event || e;
    if (event != null) {
        objTR = getEventSourceElement(event);
        if (objTR.tagName.toUpperCase() == 'BUTTON' && typeof(objTR.getAttribute("id"))!= "undefined" && objTR.getAttribute("id")!=""&& objTR.getAttribute("id")!= null) {//Only for Button in ME
            objTR =   document.getElementById(objTR.getAttribute("id"));
        } //21354309 
        try {
            while (objTR.tagName != "TR") {
                objTR = objTR.parentNode;
            }
            rowIndex = objTR.rowIndex;
            //rowIndex = rowIndex + 1; //OJET Migration
            
        }
        catch (e) {
        }
    }
    return rowIndex;
}

var funcErrList = new Array();

function debugs(msg, value, funcName) {
    if (mainWin.DebugWindowFlg == 'N' && mainWin.DebugFlg == 'Y') {
        var funname = arguments.callee.caller.toString();
        var i = funname.indexOf("{");
        funname = funname.substr(0, i);
        funname = funname.replace(/function/, "");
        funname = funname.substring(0, funname.indexOf("("));
        //Debug Changes Start
        if(mainWin.dbgLoggingRqd == 'Y' && mainWin.DebugStmt !=""){
            mainWin.DebugStmt += msg + "~~~" + value + "~~~" + funname + "!!!";
        }
        //Debug Changes Start
    }
    else if (mainWin.DebugWindowFlg == 'Y' && mainWin.DebugFlg == 'Y') {
        
        var col1SerialNo='';
        var col2FuncId='';
        var col3Time='';
        var col4FuncName='';
        var col5Statement='';
        var col6Value='';
        parent.debugDataCount=parent.debugDataCount+1;
        col1SerialNo=parent.debugDataCount;
        
        if (mainWin.gActiveWindow) {
            var xmlFile = mainWin.gActiveWindow.xmlFileName;
            var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".xml"));
            col2FuncId=funcId;
        }
        else {
            var funcId = mainWin.document.getElementById("fastpath").value.toUpperCase();
            col2FuncId=funcId;
        }

        var d = getDateObject();
        var curr_hour = d.getHours();
        var curr_min = d.getMinutes();
        var curr_sec = d.getSeconds();
        var curr_msec = d.getMilliseconds();
        var time = curr_hour + ":" + curr_min + ":" + curr_sec + ":" + curr_msec;
        col3Time=time;
        var fname = arguments.callee.caller.toString();
        if (funcName == undefined) {
            var i = fname.indexOf("{");
            fname = fname.substr(0, i);
            fname = fname.replace(/function/, "");
            fname = fname.substring(0, fname.indexOf("("));
            if (fname.substr(0, 6) == " debug") {
             col4FuncName=msg;
            }
            else {
            col4FuncName=fname;
            }
        }
        else {
        col4FuncName=funcName;
        }
        
        if (fname.substr(0, 6) == " debug") {
            col5Statement=value;
        }
        else {
        col5Statement=msg;
        }
        if (fname.substr(0, 6) == " debug") {
        col6Value='';
        }
        else {
            if (value != undefined) {
                if (value.length != undefined) {
                    if (value.length < 50 || value == true) {
                        col6Value=value;
                    }
                    else {
                    col6Value=  mainWin.getItemDesc("LBL_SHOWDATA") ;
                    }
                }
                else {
                     col6Value='';
                }
                //static header change
            }
            else {
                    col6Value='';
            }
            //static header change
        }

        var obj = {"Sno": col1SerialNo,
                   "FID": col2FuncId,
                   "Tim": col3Time,
                   "fnam": col4FuncName,
                   "Debugstmt": col5Statement,
                   "val": col6Value,
                   "fulData": value
                   };

        parent.debugData.push(obj);
                }
   
   
            }
function clearDebugData(){
                parent.debugData.removeAll();
                parent.debugDataCount=0; 
}


function showfullhtmlfromData(event,currentData,customData,currentObj) {

    debugWindow = parent.document.getElementById("debugwin").children[0].contentWindow;
    debugWindow.document.getElementById("div3").style.visibility = 'visible';
    debugWindow.document.getElementById("div3").style.display = "block";
    debugWindow.document.getElementById("div2").style.display = "none";
    debugWindow.document.getElementById("div1").style.display = "none";
    debugWindow.document.getElementById("div4").style.display = "none";
    var htmlvalue = currentObj.row.fulData;
    debugWindow.document.getElementById("innerHTML").value = htmlvalue;
    var functionid = currentObj.row.FID;
    var time = currentObj.row.Tim;
    var functionname = currentObj.row.fnam;
    var debugstmts = currentObj.row.Debugstmt;
    var strng = mainWin.getItemDesc("LBL_FID") + " : " + functionid + " | " + mainWin.getItemDesc("LBL_TIME") + " : " + time + " | " + mainWin.getItemDesc("LBL_FNAME") + " : " + functionname + " | " + mainWin.getItemDesc("LBL_DEBUG_STMT") + " : " + debugstmts;
    debugWindow.document.getElementById("div3").getElementsByTagName("LEGEND")[0].innerHTML = strng;
}

function debug(win, msg, dialog) {
    if (dialog == null)
        dialog = 'A';
    if (win.DebugWindowFlg == 'Y') {
        var func = arguments.callee.caller.toString();
        var i = func.indexOf("{");
        func = func.substr(0, i);
        func = func.replace(/function/, "");
        debugs(func, msg);
    }
}

function retrieveMessage(code, substitutionValues) {
    var errDesc = funcErrList[code];
    var msg;
    if (errDesc != undefined) {
        var rec = new Array();
        var rec = errDesc.split('~');
        msg = rec[0];
        msg = getMessage(msg, substitutionValues);
    }
    else {
        errDesc = mainWin.getCommonErrorList()[code];
        if (errDesc != undefined) {
            var rec = new Array();
            var rec = errDesc.split('~');
            msg = rec[0];
            msg = getMessage(msg, substitutionValues);
        }
        else {
            msg = code + "-Error Occured but message could not be determined";
        }
    }
    return msg;
}

function getMessage(eMsg, ePar) {
    var init = 0;
    var cnt = 1;
    var params = new String(ePar);
    var tilda = params.indexOf("~");
    while (tilda !=  - 1) {
        var param = params.substring(init, tilda);
        init = tilda;
        eMsg = eMsg.replace('$' + cnt, param);
        eMsg = eMsg.replace('{' + (cnt - 1) + '}', param);
        tilda = params.indexOf("~", tilda + 1);
        cnt++;
    }
    return eMsg;
}

function displayMsg(arg1, arg2, fromServer) {
    if (fromServer == null)
        fromServer = false;
    var msg;
    var msgtype;
    var errDesc;
    if (fromServer) {
        msg = arg1;
        msgtype = arg2;
    }
    else {
        errDesc = funcErrList[arg1];
        if (errDesc != undefined) {
            var rec = new Array();
            var rec = funcErrList[arg1].split('~');
            msg = getMessage(rec[0], arg2);
            msgtype = rec[1];
        }
        else {
            errDesc = mainWin.getCommonErrorList()[arg1];
            if (errDesc != undefined) {
                var rec = new Array();
                var rec = errDesc.split('~');
                msg = getMessage(rec[0], arg2);
                msgtype = rec[1];
            }
            else {
                msg = arg1 + " - Error Occured but message could not be determined";
                msgtype = "E";
            }
        }
    }
    if (msgtype == "O") {
        dispMsg();
        var ret = confirm(msg);
        if (ret == false)
            if (!fromServer)
                null;
    }
    else if (msgtype == "E") {
        alert(msg);
        if (!fromServer)
            null;//throw Error("ERROR");
    }
    else if (msgtype == 'I') {
        alert(msg);
    }
}

var isFromDisplay = false;

function validateInputNumber(dispNumField) {
    isFromDisplay = true;
    if (dispNumField.value == "") {
        getPreviousSibling(getPreviousSibling(dispNumField)).value = "";
        return;
    }
    if (gDecimalSymbol != ".") {
        var arrNumComponents = String(dispNumField.value).match(new RegExp(gDecimalSymbol,"g")); //OJET Migration
    }
    else {
       var arrNumComponents = String(dispNumField.value).match(/\./g);//OJET Migration
    }
    if (arrNumComponents != null && (arrNumComponents.length > 1)) {
        focusReqd = false;
        focusField = dispNumField;
        displayMsg("ST-COM041");
        dispNumField.value = null; //OJET Migration
        getPreviousSibling(getPreviousSibling(dispNumField)).value = "";
        gIsValid = false;
        return false;
    }
    var enteredVal = String(dispNumField.value); //OJET Migration
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
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        focusReqd = false;
        focusField = dispNumField;
        dispNumField.value = null; //OJET Migration
        getPreviousSibling(getPreviousSibling(dispNumField)).value = "";
        dispNumField.focus();
        gIsValid = false;
        return;
    }
    var hidNumField = getPreviousSibling(getPreviousSibling(dispNumField));
    if (dispNumField.value != "") {
        // updatedValue = dispNumField.value.replace(gDecimalSymbol, ".");//Changes for formatting number 
        updatedValue = enteredVal;
        //Changes for formatting number start
        if (hidNumField.value != updatedValue) {
            hidNumField.value = updatedValue.replace(gDecimalSymbol, ".");//changed
            //Changes for formatting number 
            fireHTMLEvent(hidNumField, "onpropertychange");
            fnValidateNumberRange(dispNumField);

        }
    }
    return;
}

function checkNumberValidation(AStr) {
    if (isFromDisplay) {
        if (typeof (gSummaryOpened) != 'undefined' && gSummaryOpened)
            inTheStr = "1234567890-%" + gDecimalSymbol;
        else 
            inTheStr = "1234567890-" + gDecimalSymbol;
    }
    else {
        if (typeof (gSummaryOpened) != 'undefined' && gSummaryOpened)
            inTheStr = "1234567890.-%";
        else 
            inTheStr = "1234567890.-";
    }
    tempChar = "";
    if (getLength(trim(AStr)) <= 0)
        return true;
    for (var i = 0;i < AStr.length;i++) {
        if (AStr.charAt(i) != 0) {
            tempChar = AStr.charAt(i);
            //Added "-" check for 17027626
            if (((inTheStr.indexOf(tempChar)) < 0) || (tempChar == "-" && AStr.indexOf("-") != 0)) {
                return false;
            }
        }
    }
    return true;
}

function fnValidateNumberRange(v_NumberFld) {
    //if (v_NumberFld.value != "") v_NumberFld.value = Number(v_NumberFld.value);
    if (v_NumberFld.type == "checkbox")
        return;
    if (!v_NumberFld || v_NumberFld.value == '')
        return;
    var valueEntered = v_NumberFld.value;
    var maxVal = v_NumberFld.getAttribute("MAX_VAL");
    var minVal = v_NumberFld.getAttribute("MIN_VAL");
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');//added newly 
    if (valueEntered.indexOf(gDecimalSymbol) ==  - 1) {
        if (!isNaN(parseInt(minVal))) {
            if (parseInt(valueEntered) < parseInt(minVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + " " + minVal);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseInt(valueEntered) > parseInt(maxVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + " " + maxVal);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
                return;
            }
        }
        /*Fix for 17639247 Starts*/
        var noBefDecimals = valueEntered.length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            var maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") + ": " + maxBefDecimal);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            var maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) > maxLen) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") + ": " + maxLen);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
            }
        }
        /*Fix for 17639247 Ends*/
    }
    else {
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"))) {
                var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                focusReqd = false;
                focusField = v_NumberFld;
                alert(getMessage(lblMaxDecimal, v_NumberFld.getAttribute("MAX_DECIMALS") + "~"));
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
            }
        }
        /*Fix for 17639247 Starts*/
        var noBefDecimals = valueEntered.substring(0, valueEntered.indexOf(".")).length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            var maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") + ": " + maxBefDecimal);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            var maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) - 1 > maxLen) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") + ": " + maxLen);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
            }
        }
        /*Fix for 17639247 Ends*/
        if (!isNaN(parseInt(minVal))) {
            if (parseFloat(valueEntered) < parseFloat(minVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + " " + minVal);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseFloat(valueEntered) > parseFloat(maxVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + " " + maxVal);
                v_NumberFld.value = "";
                getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";/*Fix for 17994647*/
                gIsValid = false;
                return;
            }
        }
    }
    return true;
}

function displayFormattedNumber_old(hdnNumField) {
    isFromDisplay = false;
    if (hdnNumField.value == "") {
        getNextSibling(getNextSibling(hdnNumField)).value =  null;  // ""; OJET Migration //ojet-number field will not accept string value so changing the default value to null
        return;
    }
    var arrNumComponents = hdnNumField.value.match(/\./g);
    if (arrNumComponents != null && (arrNumComponents.length > 1)) {
        displayMsg("ST-COM041");
        hdnNumField.value = "";
        getNextSibling(getNextSibling(hdnNumField)).value = "";
        return false;
    }
    //FCUBS_12.0.1_RETRO_14749705 starts
    if (hdnNumField.value.indexOf('E') !=  - 1) {
        hdnNumField.value = hdnNumField.value * 1 + "";
    }
    //FCUBS_12.0.1_RETRO_14749705 ends
    if (!checkNumberValidation(hdnNumField.value) || hdnNumField.value.indexOf(" ") !=  - 1) {
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        hdnNumField.value = "";
        getNextSibling(getNextSibling(hdnNumField)).value = null ;//""; OJET Migration
        getNextSibling(getNextSibling(hdnNumField)).focus();
        return;
    }

    var dispNumField = getNextSibling(getNextSibling(hdnNumField));
    if (hdnNumField.value != "") {
        updatedValue = hdnNumField.value.replace(".", gDecimalSymbol);
		//Changes_prefix_rateType_Fields
		if(Number(updatedValue)>0 && Number(updatedValue)<1 && updatedValue.indexOf(gDecimalSymbol)==0){
			updatedValue="0"+updatedValue;
		} 
		if(Number(updatedValue)<0 && Number(updatedValue)>-1 && updatedValue.indexOf(gDecimalSymbol)==1){
			updatedValue= updatedValue.substring(0,1)+"0"+updatedValue.substring(1,updatedValue.length);
		}
		//Changes_prefix_rateType_Fields
        //9NT1606_12_2_RETRO_12_0_3_23652325 starts
		 dispNumField.value = parseInt(updatedValue);//OJET Migration
		//9NT1606_12_2_RETRO_12_0_3_23652325 ends

    }
    if (dispNumField.getAttribute("FORMAT_REQD") && dispNumField.getAttribute("FORMAT_REQD") == "Y") {
        //Changes for formatting number
        formatNumber(dispNumField, isFromDisplay);
    }
    return;
}

function floatingPointMultiplication(num1, num2) {
    if (Math.round(num1) == num1 && Math.round(num2) == num2)
        return num1 * num2;
    var num1Comps = (num1 + '').split(gDecimalSymbol);
    var num1Decimals = 1;
    if (num1Comps[1]) {
        for (var cnt = 0;cnt < num1Comps[1].length;cnt++) {
            num1Decimals *= 10
        }
    }
    else {
        num1Comps[1] = '0';
    }
    var num2Comps = (num2 + '').split(gDecimalSymbol);
    var num2Decimals = 1;
    if (num2Comps[1]) {
        for (var cnt = 0;cnt < num2Comps[1].length;cnt++) {
            num2Decimals *= 10
        }
    }
    else {
        num2Comps[1] = '0';
    }
    //9NT1525_114_TFB_16354062 Starts
    /*
    var intNum1 = Number(num1Comps[0]) * num1Decimals + Number(num1Comps[1]);
    var intNum2 = Number(num2Comps[0]) * num2Decimals + Number(num2Comps[1]);
    return (intNum1 * intNum2) / (num1Decimals * num2Decimals); 	*/
    var intNum1;
    var num1a = parseInt(num1Comps[0] * num1Decimals);
    var num1b = parseInt(num1Comps[1]);
    if (num1Comps[1]) {
        if (num1a < 0) {
            intNum1 = parseInt(num1a - num1b);
        }
        else {
            intNum1 = parseInt(num1a + num1b);
        }
    }
    else {
        intNum1 = num1 * num1Decimals;
    }
    if (num1Comps[0] == '-0') {
        intNum1 =  - intNum1;
    }
    var intNum2 = num2 * num2Decimals
    return (intNum1 * intNum2) / (num1Decimals * num2Decimals);
    //9NT1525_114_TFB_16354062 Ends
}

function fnNavigateTabs(l_event, tab_arr, tab_ids) {
    if (tab_arr.length == 0 || tab_ids.length == 0) {
        fnTabDetails();
    }
    if (document.getElementById("tablist")) {
        if (l_event == 'backward') {
            tablist_curr_id--;
            if (tablist_curr_id < 0) {
                tablist_curr_id = tab_arr.length - 1;
            }
            /*Tab disabled Changes */
            if (!document.getElementById(tab_ids[tablist_curr_id]).disabled) {
                highlightSelTab(tab_ids[tablist_curr_id]);//Customer Accessibilty
            }
        }
        if (l_event == 'forward') {
            tablist_curr_id++;
            if (tablist_curr_id > tab_arr.length - 1) {
                tablist_curr_id = 0;
            }
            /*Tab disabled Changes */
            if (!document.getElementById(tab_ids[tablist_curr_id]).disabled) {
               highlightSelTab(tab_ids[tablist_curr_id]);//Customer Accessibilty
            }
        }
    }
}

//Customer Accessibilty start
function fnTabDetailsCust() {
    var tab_obj = mainWin.document.getElementById("tabListCust");
    var lSafIndx = 0;
    if (mainWin.document.getElementById("tabListCust")) {
        if (tab_obj.childNodes.length > 0) {
            if (tab_obj.childNodes[0].nodeType == '3')/*This happens in case of Safari Browser, the first child is text node*/
            {
                for (var i = 0;i < tab_obj.childNodes.length;i++) {
                    if (tab_obj.childNodes[i].nodeType != '3')/*checking node is not text becos, setting childNodes[0].id is not possible for text nodes*//* Fix for Bug 16514031 - changed childNodes[0] to childNodes[i] in if condition*/
                    {
                        mainWin.tab_arr[lSafIndx] = tab_obj.childNodes[i].childNodes[0];
                        mainWin.tab_ids[lSafIndx] = tab_obj.childNodes[i].childNodes[0].id;
                        lSafIndx = lSafIndx + 1;
                    }
                }

            }
            else /*normal existing processing*/
            {
                for (var i = 0;i < tab_obj.childNodes.length;i++) {
                    mainWin.tab_arr[i] = tab_obj.childNodes[i].childNodes[0];
                    mainWin.tab_ids[i] = tab_obj.childNodes[i].childNodes[0].id;
                }
            }
        }
    }
}

function fnNavigateTabsCust(l_event, tab_arr, tab_ids) {
   // if (mainWin.tab_arr.length == 0 || mainWin.tab_ids.length == 0) {
        fnTabDetailsCust();
    //}
    if (mainWin.document.getElementById("tabListCust")) {
        if (l_event == 'backward') {
            mainWin.tablist_curr_id--;
            if (mainWin.tablist_curr_id < 0) {
                mainWin.tablist_curr_id = mainWin.tab_arr.length - 1;
            }
            /*Tab disabled Changes */
            if (!mainWin.document.getElementById(mainWin.tab_ids[mainWin.tablist_curr_id]).disabled) {
                //expandcontent(tab_ids[tablist_curr_id], tab_arr[tablist_curr_id]);
                mainWin.fnToggleDisplay(mainWin.tab_ids[mainWin.tablist_curr_id]);
                //parent.document.getElementById(tab_ids[parent.tablist_curr_id]).focus();
            }
        }
        if (l_event == 'forward') {
            mainWin.tablist_curr_id++;
            if (mainWin.tablist_curr_id > mainWin.tab_arr.length - 1) {
                mainWin.tablist_curr_id = 0;
            }
            /*Tab disabled Changes */
            if (!mainWin.document.getElementById(mainWin.tab_ids[mainWin.tablist_curr_id]).disabled) {
                //expandcontent(tab_ids[tablist_curr_id], tab_arr[tablist_curr_id]);
                mainWin.fnToggleDisplay(mainWin.tab_ids[mainWin.tablist_curr_id]);
                //parent.document.getElementById(tab_ids[parent.tablist_curr_id]).focus();
            }
        }
    }
}
//Customer Accessibilty end

function fnNavigateDBoardTabs(win_event, l_event, tab_arr, tab_ids) {
    if (tab_arr.length == 0 || tab_ids.length == 0) {
        fnTabDetails();
    }
    if (document.getElementById("dboardtablist")) {
        if (l_event == 'backward') {
            tablist_curr_id--;
            if (tablist_curr_id < 0) {
                tablist_curr_id = tab_arr.length - 1;
            }
            showDBoardTabs(tab_ids[tablist_curr_id], win_event);
            document.getElementById(tab_ids[tablist_curr_id]).focus();
        }
        if (l_event == 'forward') {
            tablist_curr_id++;
            if (tablist_curr_id > tab_arr.length - 1) {
                tablist_curr_id = 0;
            }
            showDBoardTabs(tab_ids[tablist_curr_id], win_event);
            document.getElementById(tab_ids[tablist_curr_id]).focus();
        }
    }
}

//JS Segregation changes starts
function doAction(type, e) {

    var evnt = window.event || e;
    if (type == "EnterQuery") {
        mainWin.fnUpdateScreenSaverInterval();
        gAction = 'ENTERQUERY';
        fnEnterQuery();
        return;
    }
    else if (type == 'Exit') {
        exitAll();

    }
    else if (type == 'ExitCurrWin') {
        exitCurrentWindow();
    }
    else if (type == 'procTerminate') {
        alert(type);
    }
    else if (type == 'procAccept') {
        alert(type);

    }
    else if (type == 'procReject') {
        alert(type);

    }
    else {

        if ((gAction == "MODIFY") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL")))//Ashok Ext Changes
        {
            gAction = 'MODIFY';

        }
        else if ((gAction == "DELETE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'DELETE';

        }
        else if ((gAction == "CLOSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'CLOSE';

        }
        else if ((gAction == "REOPEN") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'REOPEN';

        }
        else if ((gAction == "REVERSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'REVRESE';

        }
        else if ((gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'ROLLOVER';

        }
        else if ((gAction == "CONFIRM") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'CONFIRM';

        }
        else if ((gAction == "LIQUIDATE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'LIQUIDATE';

        }
        else if ((gAction == "CRYSTALLIZE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'CRYSTALLIZE';

        }
        else if ((gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) {
            gAction = 'ROLLOVER';
        }
        else {
            if (type.toUpperCase() == "HOLD") {
            }
            else {
                gAction = type.toUpperCase();
            }
            if ('PROCNEW' == gAction) {
                gAction = 'NEW';
                type = 'New';
            }
            if ('PROCSAVE' == gAction) {
                gAction = 'NEW';
                type = 'BPELOk';//Added By Fahad
            }
            if ('PROCHOLD' == gAction) {
                //Added By Fahad
                gAction = 'HOLD';//Added By Fahad
                type = 'BPELHold';//Added By Fahad
            }
            if ('AUTHORIZE' == gAction) {
                gAction = 'AUTH';
            }
            if ('COPY' == gAction) {
                gAction = 'COPY';
            }
            if ('UNLOCK' == gAction) {
                gAction = 'MODIFY';
            }
            if ('SAVE' == gAction || 'SAVEALL' == gAction)//ashok Ext changes
            {
                gAction = 'NEW';
            }

            if (screenType == 'T') {
                if ('ROLLOVER' == gAction) {
                    gAction = 'ROLLOVER';
                }
                if ('REVERSE' == gAction) {
                    gAction = 'REVERSE';
                }
                if ('CONFIRM' == gAction) {
                    gAction = 'CONFIRM';
                }
                if ('LIQUIDATE' == gAction) {
                    gAction = 'LIQUIDATE';
                }
                if ('CRYSTALLIZE' == gAction) {
                    gAction = 'CRYSTALLIZE';
                }

            }
        }
        if (routingType == "X" && type.toUpperCase() == "SAVE") {
            //ashok Ext changes
            //eval('parent.gActiveWindow.fnSaveAll("", evnt)');
            var fnEval = new Function('evnt', 'fnSaveAll("", evnt)');
            fnEval(evnt);
        }
        else if (routingType == "X" && type.toUpperCase() == "PRINT") {
            //eval('parent.gActiveWindow.fnExtPrint()');
            var fnEval = new Function('fnExtPrint()');
            fnEval();
        }
        else if (type.toUpperCase() == "EXECUTEQUERY") {
            if (typeof (gSummaryOpened) != 'undefined' && gSummaryOpened) {
                //eval('parent.gActiveWindow.fn' + type + '(evnt)');
                var fnEval = new Function('evnt', 'fn' + type + '(evnt)');
                fnEval(evnt);
            }
            else {
                //eval('parent.gActiveWindow.fn' + type + '()');
                var fnEval = new Function('fn' + type + '()');
                fnEval();
            }
        }
        else {
            mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
            //eval('parent.gActiveWindow.fn' + type + '(evnt)');
            var fnEval = new Function('evnt', 'fn' + type + '(evnt)');
            fnEval(evnt);
        }
        if ('Print' == type)
            type = 'EXECUTEQUERY';
    }

}
//JS Segregation changes ends
function fnToUppercase(txtObj, e) {
    var event = window.event || e;
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39) {
        return;
    }
    var txtVal =  txtObj.rawValue; //OJET Migration
    if(txtVal==null){
        txtVal =  txtObj.getAttribute("value");
    }
    if(txtVal!=null)
    txtObj.value =txtVal.toUpperCase();
}

function getSystemShortDate(y, m, d) {
    return format(y, m - 1, d, mainWin.systemDateFormat, getSeparator(mainWin.systemDateFormat));
}

function getYYYYfromYYMMDD(y, m, d) {
    return (getDateObject(y, m, d)).getFullYear();
}

function doTrim(obj) {
    return obj.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function startDrag(target, e) {
    /* Zooming Changes */
    var evt = window.event || e;
	/*12_1_RETRO_12_2_23652976 Starts*/
    if(parent.document.getElementById("masker")!= null && parent.document.getElementById("masker").offsetHeight != 0){    
      return false;
    }
    /*12_1_RETRO_12_2_23652976 Ends*/
    var divObj = parent.document.getElementById(target);
	//Fix for 19427463 starts
    var sourceElem = getEventSourceElement(evt);
    if(sourceElem.getAttribute("ID") && sourceElem.getAttribute("ID").indexOf("WNDbutton") > -1) {
        preventpropagate(evt);
        return false;
    }
    //Fix for 19427463 ends
    if (parent.document.getElementById("ChildWin")) {
    }
    else {
        mainWin.setActiveWindow(divObj, window);
    }
    divObj.style.cursor = "default";
    var x = evt.clientX;
    var y = evt.clientY;
    var initx = divObj.offsetLeft;
	//9NT1606_12_4_RETRO_12_0_2_26231164 starts 
    if((mainWin.LangCode) && (mainWin.LangCode.toUpperCase() == 'ARB')){
        initx = mainWin.x-divObj.offsetWidth;
    }
	//9NT1606_12_4_RETRO_12_0_2_26231164 ends 
    var inity = divObj.offsetTop;

    var scrnWidth = 0, scrnHeight = 0;
	
   // scrnWidth = mainWin.document.getElementById("vtab").offsetWidth + mainWin.dashBoardWidth ;
    //scrnHeight = mainWin.document.getElementById("masthead").offsetHeight + mainWin.dashBoardWidth + mainWin.document.getElementById("taskbar").offsetHeight - 4;
    scrnWidth = mainWin.x;//HTML5 Changes 6/OCT/2016
	scrnHeight = mainWin.y - 4;
	document.onmousemove = function (e) {
        var evt = window.event || e;
        var ex = evt.clientX;
        var ey = evt.clientY;
        var dx = ex - x;
        var dy = ey - y;
        var ypos = inity + dy;
        var tBarHgt = 0;
        if (parent.document.getElementById("WNDtitlebar") != null) {
            tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight *  - 1;
        }
        else if (typeof (mainWin) != "undefined") {
            tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
        }
        if ((ypos + parseInt(divObj.offsetHeight)) > parseInt(scrnHeight)) {
            inity = scrnHeight - (parseInt(divObj.offsetHeight) + 4);
            divObj.style.top = inity;
        }
        else if (ypos > (tBarHgt + 4)) {
            //divObj.style.left = initx + dx + "px";
			//9NT1606_12_4_RETRO_12_0_2_26231164 starts 
            if((mainWin.LangCode) && (mainWin.LangCode.toUpperCase() == 'ARB')){
                divObj.style.right = mainWin.x - initx -dx + "px";
            }
			//9NT1606_12_4_RETRO_12_0_2_26231164 ends 
            divObj.style.top = inity + dy + "px";
            //initx = initx + dx;
            inity = ypos;
        }
        else {
            divObj.style.top = (tBarHgt) + "px";//HTML5 Changes 6/OCT/2016
            inity = tBarHgt;//HTML5 Changes 6/OCT/2016
        }
        if ((parseInt(initx) + parseInt(dx) + parseInt(divObj.offsetWidth)) > scrnWidth) {
            initx = scrnWidth - (divObj.offsetWidth + 4);
            divObj.style.left = initx + 'px';
        }
        else {
            divObj.style.left = initx + dx + "px";
            initx = initx + dx;
        }
    };
    document.onmouseup = function (event) {
        divObj.style.cusor = "default";
        document.onmousemove = null;
        document.onmouseup = null;
    }

}

/*Fix for issue while getting date in Daylight Saving enabled mode*/
function getDateObject(y, m, d) {
    var dt = null;
    if (y != null && m != null && d != null) {
        var timestamp = Date.UTC(y, m, 0, 0, 0, 0);
        var dummydate = new Date(timestamp);
        var tzoffset = dummydate.getTimezoneOffset() / 60;
        if ((m > 8) || (m < 2)) //9NT1606_12_4_RETRO_12_1_26939865 changes
            tzoffset++;
        if (tzoffset >  + 0) {
            /* Fix for Bug No 16838594 Start */
            var millisecs = parseInt(timestamp) + (Number(d) + parseFloat(tzoffset / 24)) * 86400000
            /* Fix for Bug No 16838594 End*/
            dt = new Date(millisecs);
        }
        else {
            dt = new Date(timestamp + (d) * 86400000);
        }
    }
    else {
        dt = new Date();
    }
    return dt;
}

//Changes for formatting number start
function formatNumber_old(dispNumField) {
    var numfieldVal = dispNumField.value;
    var arrTemp = numfieldVal.split(gDecimalSymbol);
    var numBeforeDecimal = arrTemp[0];
    var replacepattern = "\\" + gDigitGroupingSymbol;
    var pattern = new RegExp(replacepattern, 'g');
    //var pattern=new RegExp(gDigitGroupingSymbol,'g');
    numBeforeDecimal = numBeforeDecimal.replace(pattern, "");
    var numAfterDecimal = arrTemp[1];
    var isNegative = false;
    if (numBeforeDecimal.indexOf("-") >  - 1) {
        isNegative = true;
        numBeforeDecimal = numBeforeDecimal.replace("-", "");
    }

    if (numAfterDecimal == undefined)
        numAfterDecimal = "";
    var maxNumDigitsAfterDecimal = dispNumField.getAttribute("MAX_DECIMALS");
    maxNumDigitsAfterDecimal = parseInt(maxNumDigitsAfterDecimal);
    if (isNaN(parseInt(maxNumDigitsAfterDecimal)))
        maxNumDigitsAfterDecimal = 0;
    var retVal = "";
    var digitPos = 0;
    for (var loopIndex = numBeforeDecimal.length - 1;loopIndex >= 0;loopIndex--) {
        switch (mainWin.gNumberFormatMask) {
            case "L":
                if ((digitPos > 1) && ((digitPos % 2) == 1)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
                break;
            default :
                if ((digitPos > 1) && ((digitPos % 3) == 0)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
        }
        digitPos++;
    }
    if (numAfterDecimal != "" || maxNumDigitsAfterDecimal != 0) {
        retVal += gDecimalSymbol;
    }
    if (maxNumDigitsAfterDecimal > numAfterDecimal.length) {
        numAfterDecimal += "000000000000000000000000000000000000";
        retVal += numAfterDecimal.substr(0, maxNumDigitsAfterDecimal);
    }
    else {
        retVal += numAfterDecimal;
    }
	//Fix for 24659882
	if(numBeforeDecimal == "")
		 retVal = "0" + retVal;
    if (isNegative)
        retVal = "-" + retVal;
    dispNumField.value = retVal;

}
//Changes for formatting number end
//Fix for 18260762 ?start
function validateSummaryNumberfield(dispFieldId) {
    var dispField = document.getElementById(dispFieldId);
    if (dispField.value != "") {
        if (!checkNumberValidation(dispField.value)) {
            alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
            dispField.value = "";
            dispField.focus();
            return;
        }
    }
}
//Fix for 18260762 ?end

//FCUBS_12.1_CASA_Joint_Holder_Display Changes 
function getAccBranch(e){
    var prevSib ="";
    var brn ="";
    try{
        if (getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD') {
            prevSib = getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
        } else {
            prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;
        }
        if(getPreviousSibling(getEventSourceElement(e).parentNode).nodeType=='3'){
            prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
        }
    }catch(er){}
    for (var i = 0; i < prevSib.length; i++) {
        if (prevSib[i].maxLength == '3') {
            if (prevSib[i].name.indexOf('BR') != '-1') { 
                brn = prevSib[i].value;
            }
			//MCY/VA Hot Key  CHANGES START
			if (prevSib[i].name.indexOf('CCY') != '-1') {  /*Fix for 17434292*/
				ccy = prevSib[i].value;
			}
			//MCY/VA Hot Key  CHANGES END
        }
    }  
    if (brn == "") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") { 
            if(document.getElementById(txnBranchFld)!= null){
              brn = document.getElementById(txnBranchFld).value;   
            }
        }               
    }
    if (brn == "") brn = g_txnBranch;
    if (!fnEventsHandler('fnSetHotKeyBranch',e))
        return false;
    if(hotKeyBrn != ""){
        brn = hotKeyBrn;
    }
    return brn;
}

//30620131 -- start
function fnNavigateSubScreens(l_event, subScr_arr)
{
    if (subScr_arr.length == 0)
	{
        fnSubScreenDetails();
    }
    if (document.getElementById("subscrlist"))
	{
        if (l_event == 'backward')
		{            
			subScrlist_curr_id--;
			
            if (subScrlist_curr_id < 0)
			{
                subScrlist_curr_id = subScr_arr.length - 1;
            }
            
            if (subScr_arr[subScrlist_curr_id].hasAttribute("onclick"))
			{
				subScr_arr[subScrlist_curr_id].className='AbuttonH';
				subScr_arr[subScrlist_curr_id].focus();
            }
        }
        if (l_event == 'forward')
		{
			subScrlist_curr_id++;
			
            if (subScrlist_curr_id > subScr_arr.length - 1)
			{
                subScrlist_curr_id = 0;
            }
			
            if (subScr_arr[subScrlist_curr_id].hasAttribute("onclick"))
			{
				subScr_arr[subScrlist_curr_id].className='AbuttonH';
				subScr_arr[subScrlist_curr_id].focus();				
            }
        }
    }
}
//30620131 -- end

//Changes_prefix_rateType_Fields starts
function displayRate(dataBoundElem){
	var rateDispField = dataBoundElem.id+"I";
	var val;
	if (dataBoundElem.value!="")
	{
		val = dataBoundElem.value;
		try{
		if(val.indexOf(gDecimalSymbol)==0){
			val = "0"+val;
		}
		}catch(e){
			
		}
		dataBoundElem.value = val+"";
		document.getElementById(rateDispField).value=val+"";
	}

}
//Changes_prefix_rateType_Fields ends

function getHolidayList(year,month) {
    //inDate = setActionTime();
    var calReqDom = null;
    var serverURL = "ExtHolidayFetchData?";
    serverURL += "year=" + year;
    serverURL += "&month=" + month;
    serverURL += "&functionId=" + functionId;
    serverURL += "&txnBranch=" + g_txnBranch;
    serverURL += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
    //serverURL += "&seqNo=" + getSeqNo();//Logging changes
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    var t = getDateObject();
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    objHTTP.send(calReqDom);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
     catch(exp){
          mainWin.handleNetWorkErr(exp);
    } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    
    t = getDateObject();
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    if (objHTTP.status == 200) {
        mainWin.inactiveTime = 0;
        var respDOM = objHTTP.responseXML;
        var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
        if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
            alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
        } 
        else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change end
        else {
           /* var respTxt = getXMLString(respDOM);
            if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
                appendDebug(respDOM);
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                respDOM = loadXMLDoc(respTxt);
            }*/
            holidays = getNodeText(selectSingleNode(respDOM, "FCUBS_RES_ENV/RESPONSE"));
            return holidays;
           }
    }
}

function getClickFunction(element) {
    var ojFunction = element.getAttribute("on-oj-action");
    if(ojFunction.indexOf("[[function() {") == 0) {
        return ojFunction.substring(ojFunction.indexOf("{") + 1, ojFunction.indexOf("}")).trim();
    } else {
        var funcName = ojFunction.substring(ojFunction.indexOf("[[") + 2, ojFunction.indexOf("]]"));
        var clickFunc = funcName.split(".bind(null,");
        return clickFunc[0] + "(" + clickFunc[1];
    }
    
}