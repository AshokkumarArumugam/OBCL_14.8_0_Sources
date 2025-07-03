/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : ExtensibleUtil.js
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
Copyright © 2004-2016   by Oracle Financial Services Software Limited.. 

  **  Modified By          : Mantinder kaur
  **  Modified On          : 24-Oct-2019
  **  Modified Reason      :Unhandled exception error getting raised on click of advices tab in LCDTRONL screen,when the request data contains tilde(~).
							But when user clicks on save after entering tilde,system throws "Invalid character found,Screen data should not contain tilde/caret".
							Behaviour in both the cases should be same and the error shown should not differ.
							Tilde is used to parse the data and is a restricted character,when the back-end hit happens parsing of the data fails due to '~' cracter being available
							in the request,due to which unhandled exception error is thrown.Fix provided to show correct error i.e "Invalid character found,Screen data should not contain tilde/caret".
  **  Search String        : FCUBS_143_CTBC_30384260 
  
  **  Modified By       : Girish M
  **  Modified On       : 07-Mar-2023
  **  Modified Reason   : Redwood Fixes
  **  Search String     : REDWOOD_35030228 

  **  Modified By       : Girish/Manoj S
  **  Modified On       : 24-Mar-2023
  **  Modified Reason   : Redwood multi entries Disable Enable Fixes
  **  Search String     : REDWOOD_35159306
			
  **  Modified By       : Manoj S
  **  Modified On       : 07-Apr-2023
  **  Modified Reason   : Redwood single entries Disable Enable Fixes
  **  Search String     : REDWOOD_35243631
  
  **  Modified By       : Arunkumar
  **  Modified On       : 10-Apr-2023
  **  Modified Reason   : Validation handling in ACDASFMT Screen 
  **  Search String     : REDWOOD_35205501
  **
  **  Modified By       : Shayam Sundar Ragunathan
  **  Modified On       : 18-Apr-2023
  **  Modified Reason   : LOV amend fields issue
  **  Search String     : REDWOOD_35277084
  
  **  Modified By       : Manoj S
  **  Modified On       : 19-Apr-2023
  **  Modified Reason   : Exit and Save subscreen launch Handling
  **  Search String     : REDWOOD_35263935
  
  **  Modified By       : Manoj S
  **  Modified On       : 25-Apr-2023
  **  Modified Reason   : Defaulting Drop down value in Copy Action
  **  Search String     : REDWOOD_35308434

  **  Modified By       : Manoj S
  **  Modified On       : 07-May-2023
  **  Modified Reason   : adding condtion to check input is string or numeric.
  **  Search String     : redwood_35274684
  
  **  Modified By       : Nagendra Satrasala
  **  Modified On       : 09-May-2023
  **  Modified Reason   : adding condition to check type of block during Mandatory Field check.
  **  Search String     : Bug_35277422

  **  Modified By       : Girish M
  **  Modified On       : 14-May-2023
  **  Modified Reason   : Screen hang on multiple execute query.
  **  Search String     : REDWOOD_35389172
  
  **  Modified By       : Manoj S
  **  Modified On       : 16-May-2023
  **  Modified Reason   : amended code handle to Date and Amount fields on Unlock action.
  **  Search String     : REDWOOD_35391635
   
  **  Modified By       : Girish M
  **  Modified On       : 27-June-2024
  **  Modified Reason   : ToolBar Handling after success save operation.
  **  Search String     : REDWOOD_36767973 
  
  **  Modified By       : Girish M
  **  Modified On       : 22-July-2024
  **  Modified Reason   : Date Field LOV handling.
  **  Search String     : REDWOOD_36830099
                          REDWOOD_36886377 
--------------------------------------------------------------------------------------------*/
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
var servletURL = "FCClientHandler";
var isExitTriggered = false;
var gIsAuditExist = true;
var gFromSummary = true;
var lblBranchStage = mainWin.getItemDesc("LBL_BRANCH_STAGE");
var lblModifyFailed = mainWin.getItemDesc("LBL_MODIFY_FAIL");
var lblProcessingFailed = mainWin.getItemDesc("LBL_PROCESSING_FAIL");
var scriptError = mainWin.getItemDesc("LBL_SCRIPT_ERROR");
//var FCJStream = mainWin.FCJ_Stream;
var imagePath = mainWin.theme_imagesPath;
var override_remarks = "";
 //REDWOOD_CHANGES
if ( typeof(extBpelJs) !=  'undefined' && extBpelJs != '' ) {
    corefnValidate = fnValidate;
    corefnPickUpSubSystem = fnPickUpSubSystem;/*23653210  fix*/
    coreFnProcessResponse = fnProcessResponse;
    coreFnEventsHandler = fnEventsHandler;
    coreFnSetExitButton = fnSetExitButton;
    coreFnProcessMsgNode = fnProcessMsgNode;
}
//REDWOOD_CHANGES
function resetElements(obj) {
    if (typeof (obj) != "undefined") {	   
//REDWOOD_CHANGES
        //fnChangeLabelToText("TEXTAREA", obj);
      //  resetAllElements("CHECKBOX", obj);
      //  resetAllElements("INPUT", obj);
        //resetAllElements("SELECT", obj);
       // resetAllElements("TEXTAREA", obj);
       // resetAllElements("RADIO", obj);
        resetAllElements("OJ-INPUT-TEXT", obj); //OJET Migration
        resetAllElements('OJ-INPUT-NUMBER', obj); //OJET Migration
        resetAllElements('OJ-SELECT-SINGLE', obj); //OJET Migration
        resetAllElements('OJ-SWITCH', obj); //OJET Migration
        resetAllElements('OJ-RADIOSET', obj); //OJET Migration
        resetAllElements('OJ-TEXT-AREA', obj); //OJET Migration
        resetAllElements('OJ-INPUT-PASSWORD', obj); //OJET Migration
        resetAllElements('OJ-INPUT-DATE', obj); //OJET Migration
        resetAllElements('OJ-INPUT-DATE-TIME', obj); //OJET Migration  
//REDWOOD_CHANGES
		
    } else {	
//OJET Migration
        //fnChangeLabelToText("TEXTAREA");
        //resetAllElements("CHECKBOX");
      //  resetAllElements("INPUT");
       // resetAllElements("SELECT");
        //resetAllElements("TEXTAREA");
        //resetAllElements("RADIO");
        resetAllElements('OJ-TEXT-AREA'); //OJET Migration
        resetAllElements("OJ-INPUT-TEXT"); //OJET Migration
        resetAllElements('OJ-INPUT-NUMBER'); //OJET Migration
        resetAllElements('OJ-SELECT-SINGLE'); //OJET Migration
        resetAllElements('OJ-SWITCH'); //OJET Migration
        resetAllElements('OJ-RADIOSET'); //OJET Migration
        resetAllElements('OJ-INPUT-PASSWORD', obj); //OJET Migration
        resetAllElements('OJ-INPUT-DATE'); //OJET Migration
        resetAllElements('OJ-INPUT-DATE-TIME'); //OJET Migration  
//OJET Migration
        fnClearMultipleEntryBlocks();
        fnResetPgBtn();
        dbDataDOM = null;
    }
    //12.0.3 Data entry image changes start
    /*if(typeof(imageFldset) != "undefined"){
      var element = document.getElementById("dataEntryDiv");
      if(element){
        element.parentNode.removeChild(element);
      }
    }*/
	try{
        var elements;
        if (typeof (obj) != "undefined") {
            elements = obj.getElementsByTagName('IFRAME');
        } else {
            elements = document.getElementById('ResTree').getElementsByTagName("IFRAME");
        }
        for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
            var tmpElem = elements[loopIndex];
            if(tmpElem.parentNode.parentNode.id.indexOf('dataEntryDiv') != -1){
                tmpElem.parentNode.parentNode.parentNode.removeChild(tmpElem.parentNode.parentNode);
            }
        }
    }catch(e){}
    //12.0.3 Data entry image changes end
}

function resetIndex() {
    for (var dataSrcIndex = 0; dataSrcIndex < dataSrcLocationArray.length; dataSrcIndex++) {
        dbIndexArray[dataSrcLocationArray[dataSrcIndex]] = 1;
    }
}

function fnResetSubScrDBIndex() {
    var subScrFSObj = document.getElementsByTagName("fieldset");
    for (var i = 0; i < subScrFSObj.length; i++) {
        dbIndexArray[subScrFSObj[i].getAttribute("block")] = 1;
    }
}

function fnSetExitButton() {
    if (!document.getElementById("BTN_EXIT_IMG")) return;
    fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
    //Fix for 25400971  starts
	try { 	 
//OJET Migration
        if (gAction!="ENTERQUERY" && gAction!="NEW" && gAction!="COPY" && gAction!= "") { //REDWOOD_35389172 
		setTimeout(function(){document.getElementById("BTN_EXIT_IMG").focus();},0);
            }	
//OJET Migration
	} catch(ex){}
	//Fix for 25400971  ends
    if (gAction == "EXECUTEQUERY" || gAction == "") {
        document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_EXIT");//OJET Migration
    } else {
        document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_CANCEL");//OJET Migration
    }
}

function fnGetPKInfo() {
    var pk = "";
    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++) {
        if (loopIndex > 0) pk += "~";
        pk += pkFields[loopIndex].substr(pkFields[loopIndex].indexOf("__") + 2);
        pk += ":";
        pk += document.getElementById(pkFields[loopIndex]).value;
    }
    return pk;
}

function fnGetPKValues() {
    var pk = "";
    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++) {
        if (loopIndex > 0) pk += "~";
        pk += document.getElementById(pkFields[loopIndex]).value;
    }
    return pk;
}

function fnClearPKFields() {
    for (var fieldIndex = 0; fieldIndex < pkFields.length; fieldIndex++) {
        if (document.getElementById(pkFields[fieldIndex])) {
            if (document.getElementById(pkFields[fieldIndex]).tagName.toUpperCase() == 'OJ-SELECT-SINGLE') {//REDWOOD_35308434
                var tmpElem = document.getElementById(pkFields[fieldIndex]);
                var selOptions = tmpElem.data.data;//REDWOOD_35308434
                var anySelected = false;
                for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++) {
                    if (selOptions[optnCnt].defaultValue != null) {//REDWOOD_35308434
                        anySelected = true;
                        tmpElem.value = selOptions[optnCnt].defaultValue;//REDWOOD_35308434
                    }
                }
                if (!anySelected) tmpElem.value = selOptions[0].value;
            } else if(document.getElementById(pkFields[fieldIndex]).type.toUpperCase() == 'TEXTAREA'){
                setInnerText(document.getElementById(pkFields[fieldIndex]),"");
            }else if (document.getElementById(pkFields[fieldIndex]).getAttribute("type") && document.getElementById(pkFields[fieldIndex]).getAttribute("type").toUpperCase() == 'RADIO') { //REDWOOD_CHANGES
                var elemName = document.getElementById(pkFields[fieldIndex]).name;
                if (elemName) {
                    var radioElem = document.getElementsByName(elemName);
                    if (radioElem.length > 0) {
                        for (var elemCnt = 0; elemCnt < radioElem.length; elemCnt++) {
                            if (radioElem[elemCnt].getAttribute("DEFAULT") == 'yes') radioElem[elemCnt].checked = true;
                            else radioElem[elemCnt].checked = false;
                        }
                    } else {
                        radioElem.checked = false;
                    }
                }
            } else if (document.getElementById(pkFields[fieldIndex]).getAttribute("type")&& document.getElementById(pkFields[fieldIndex]).getAttribute("type").toUpperCase() == 'CHECKBOX') {  //REDWOOD_CHANGES
                var tmpElem = document.getElementById(pkFields[fieldIndex]);
                if (tmpElem.getAttribute("DEFAULT") == 'yes') tmpElem.checked = true;
                else tmpElem.checked = false;
            } else {
                document.getElementById(pkFields[fieldIndex]).value = "";
                var object = document.getElementById(pkFields[fieldIndex]);
                var indexDate = getOuterHTML(object).indexOf("displayDate");
                var indexAmount = getOuterHTML(object).indexOf("displayAmount");
                var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
                if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                    getNextSibling(getNextSibling(object)).value = "";
                }
            }
        }
    }
}

function fnIsColPK(fieldName) {
    var isColPK = false;
    for (var fieldIndex = 0; fieldIndex < pkFields.length; fieldIndex++) {
        if (pkFields[fieldIndex] == fieldName) {
            isColPK = true;
            break;
        }
    }
    return isColPK;
}

//Bug 16664011  Changes Starts
function fnDisablePKFields() {     
    try {
        for(var i=0; i < pkFields.length; ++i) {        
            if(document.getElementById(pkFields[i])){             
               if(document.getElementById(pkFields[i]).type =="radio"){
                  var radioLength = document.getElementsByName(document.getElementById(pkFields[i]).name).length;
                  for(var j=0;j<radioLength;j++){                    
                       fnDisableElement(document.getElementsByName(document.getElementById(pkFields[i]).name)[j]);
                  }
               } else{
                 fnDisableElement(document.getElementById(pkFields[i]));
               }            
            }
        }        
    } catch(e) {
        alert(scriptError);
    }
}

/*
function fnDisablePKFields() {
    try {
        for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++)
        fnDisableElement(document.getElementById(pkFields[loopIndex]));
    } catch(e) {
        alert(scriptError);
    }
}
*/
//Bug 16664011  Changes Ends

function fnValidate() {
    if (!fnValidateMandatory()) {
       // mask();  //REDWOOD_CHANGES
        showAlerts(fnBuildAlertXML(gErrCodes.substring(0, gErrCodes.length - 1), 'I', '', replaceStr.substring(0, replaceStr.length - 1)), 'I');
        alertAction = "UNMASK";
        gErrCodes = "";
        replaceStr = "";
        return false;
    }
    if (!fnValidateDataType()) {
        //mask();  //REDWOOD_CHANGES
        showAlerts(fnBuildAlertXML(gErrCodes.substring(0, gErrCodes.length - 1), 'I', '', replaceStr.substring(0, replaceStr.length - 1)), 'I');
        alertAction = "UNMASK";
        gErrCodes = "";
        replaceStr = "";
        return false;
    }
    return true;
}

function fnEnableTabMEAmendFields(v_Action, strCurrentTabId) {
    var tableObjs = document.getElementById("TBLPage" + strCurrentTabId).getElementsByTagName("TABLE");
    for (var i = 0; i < tableObjs.length; i++) {
        fnEnableMEBlock(tableObjs[i].id, false);
        fnEnableMEAmendFields(tableObjs[i].id, v_Action);
    }
}
/*
function fnEnableMEAmendFields(blockId, v_action) {//debugger;
    //var l_amendArrayLen = eval(v_action + "AmendArr").length;
    var l_amendArrayLen = window[v_action + "AmendArr"].length;
    //var l_amendArrayName = eval(v_action + "AmendArr");
    var l_amendArrayName = window[v_action + "AmendArr"];
    for (var i = 0; i < l_amendArrayLen; i++) {
        var amendableFld = l_amendArrayName[i];
        var amendableBlk = amendableFld.substring(0, amendableFld.lastIndexOf("__"));
        if (amendableBlk == blockId) {
            fnEnableMEField(blockId, amendableFld.substring(amendableFld.lastIndexOf("__") + 2, amendableFld.length), true);
        }
    }
    fnEnableElement(document.getElementsByName("cmdAddRow_" + blockId)[0]);
    fnEnableElement(document.getElementsByName("cmdDelRow_" + blockId)[0]);
    fnEnableElement(document.getElementById(blockId + "_CHK_ME"));
}
*/
/*12.0.4 UI performance changes starts*/
function fnEnableMEAmendFields(blockId, v_action) {
    var l_amendArrayName = window[v_action + "AmendArr"];
    for (var i in l_amendArrayName) {
        var amendableFld = l_amendArrayName[i];
        var amendableBlk = i; //blockname
        if (amendableBlk == blockId) {
                for(var j=0;j<amendableFld.length;j++) {
                    fnEnableMEField(blockId, amendableFld[j], true);
                }
                break;
        }
    }
    fnEnableElement(document.getElementsByName("cmdAddRow_" + blockId)[0]);
    fnEnableElement(document.getElementsByName("cmdDelRow_" + blockId)[0]);
    fnEnableElement(document.getElementById(blockId + "Header_CHK_ME"));
}

function fnEnableAmendFields(v_action,amendFields) {/*Amend Array Changes*/
    var l_amendArrayName = window[v_action + "AmendArr"];
	setTimeout( function () { //REDWOOD_35277084
	var eleArray = new Array("OJ-BUTTON","OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME"); //REDWOOD_CHANGES
    for (var j = 0; j < multipleEntryIDs.length; j++) {
       // if (document.getElementById(multipleEntryIDs[j] + "Header_CHK_ME")) { //REDWOOD_CHANGES
       if(document.getElementsByName("cmdAddRow_" + multipleEntryIDs[j])[0]){ //REDWOOD_CHANGES
            fnEnableElement(document.getElementsByName("cmdAddRow_" + multipleEntryIDs[j])[0]);
            fnEnableElement(document.getElementsByName("cmdDelRow_" + multipleEntryIDs[j])[0]);
            fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[j])[0]);
        }
            
      //  }	//REDWOOD_CHANGES
    }
   var x = 0;
   for (var i in l_amendArrayName) {
        var isME = 'false';
        var amendableFld = l_amendArrayName[i];
        var amendableBlk = i; //got the blockname
        isME = isMultipleEntry(amendableBlk);   /*12.0.4 UI performance changes starts*/
       /*   for (var j = 0; j < multipleEntryIDs.length; j++) {
                if (multipleEntryIDs[j] == amendableBlk) {
                    isME = true;
                    break;
                }
            }*/
        if (isME=='true') {
            if (document.getElementById(amendableBlk)) {
                for(var j=0;j<amendableFld.length;j++) { 
                  if(typeof(amendFields) == "undefined" || ((typeof(amendFields) != "undefined") && (amendFields[x] == 1 || amendFields == ""))){   /*Amend Array Changes*/
//REDWOOD_CHANGES
                  if(amendableFld[j].charAt(amendableFld[j].length - 1) == 'I') {
                     amendableFld[j] = amendableFld[j].substring(0, amendableFld[j].length - 1);
                  }	   
//REDWOOD_CHANGES
                    var amndFld = amendableBlk+"__"+amendableFld[j];
                    var amendFlds = document.getElementsByName(amendableFld[j]);
                    //12.0.2 udf changes for CSCTRUDF start
                    if (functionId == "CSCFNUDF" || functionId =="CSCTRUDF") {
                     //12.0.2 udf changes for CSCTRUDF end   
                        amendableBlk = 'BLK_UDF_DETAILS_VIEW';
                        for (var k = 0; k < amendFlds.length; k++) {
                            //Fix for 14321478 -UDF update issue starts
                            var amendElement = document.getElementById(amendableBlk + '__' + amendFlds[k].name + k);
                            var amnendElementType = amendElement.type.toUpperCase();
                            if (amnendElementType == "HIDDEN") {
                                var indexDate = getOuterHTML(amendElement).indexOf("displayDate");
                                var indexAmount = getOuterHTML(amendElement).indexOf("displayAmount");
                                var indexNumber = getOuterHTML(amendElement).indexOf("displayFormattedNumber");
                                if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                                    fnEnableElement(amendElement.parentNode.getElementsByTagName("INPUT")[1]);
                                }
                            } else {
                                fnEnableElement(amendElement);
                            }
                            // Fix for 14321478 -UDF update issue ends
                        } 
                    } else {
//REDWOOD_35159306
							var elemet=document.getElementById(amendableBlk).firstChild.content.children[0];
						for (i in eleArray){
							for(var cellindex =0; cellindex < elemet.cells.length; cellindex++)
							{
							var txt= elemet.cells[cellindex].getElementsByTagName(eleArray[i])[0];

								if ( typeof(txt) != "undefined")
								{ 
									if(amendableFld[j]==txt.getAttribute("name") && eleArray[i]!="OJ-SWITCH" && eleArray[i]!="OJ-BUTTON"){
									txt.setAttribute("readOnly","false");
										}
									if ( eleArray[i] =="OJ-SWITCH" || eleArray[i]!="OJ-BUTTON") {
									txt.setAttribute("disabled","false");
									}
								}
							}  
						}
//REDWOOD_35159306
                        for (var k = 0; k < amendFlds.length; k++) {
                            fnEnableElement(amendFlds[k]);
                        }
                    }
                    x++;
                  }else {/*Amend Array Changes*/
                    x++;
                    continue;
                  }
                  
                }
            }
        } else {
            if (document.getElementById("MESV_" + amendableBlk)) {
                fnEnableElement(document.getElementsByName("BTN_PREV_" + amendableBlk)[0]);
                fnEnableElement(document.getElementsByName("BTN_NEXT_" + amendableBlk)[0]);
                fnEnableElement(document.getElementsByName("BTN_ADD_" + amendableBlk)[0]);
                fnEnableElement(document.getElementsByName("BTN_REMOVE_" + amendableBlk)[0]);
            }
            for(var j=0;j<amendableFld.length;j++) {
              if(typeof(amendFields) == "undefined" || ((typeof(amendFields) != "undefined") && (amendFields[x] == 1 || amendFields == ""))){   /*Amend Array Changes*/
//REDWOOD_CHANGES
//REDWOOD_35243631
				var amndFld = amendableBlk+"__"+amendableFld[j];
			if (typeof(amndFld) != "undefined" && amendableFld[j].charAt(amendableFld[j].length - 1) == 'I') {
				var amndFldI=amendableBlk+"__"+amendableFld[j].substring(0, amendableFld[j].length - 1);
				if(document.getElementById(amndFldI)) {
					if (document.getElementById(amndFldI).getAttribute('dtype') == 'DATE' || document.getElementById(amndFldI).getAttribute('dtype') == 'AMOUNT' ||
					(document.getElementById(amndFldI).getAttribute('dtype')=='VARCHAR2' && document.getElementById(amndFldI).tagName=='OJ-INPUT-DATE')) {//REDWOOD_35391635
					amndFld=amndFldI;
					amendableFld[j] = amendableFld[j].substring(0, amendableFld[j].length - 1);
					}	  
				}
			}
//REDWOOD_35243631
//REDWOOD_CHANGES
                
                    if (document.getElementById(amndFld)) {
                        if (document.getElementById(amndFld).tagName.toUpperCase() == 'OJ-RADIO') { //REDWOOD_CHANGES
                            var amendFlds = document.getElementsByName(amendableFld[j]);
                            for (var k = 0; k < amendFlds.length; k++) {
                                fnEnableElement(amendFlds[k]);
                            }
                        } else {
                            fnEnableElement(document.getElementById(amndFld));
                        }
                    }
                    x++;
              }else{/*Amend Array Changes*/
                x++;
                continue;
              
              }
            }
        }
    }
   },0); //REDWOOD_35277084
}/*12.0.4 UI performance changes ends*/

/*
function fnEnableAmendFields(v_action) {//debugger;	 //REDWOOD_CHANGES
    //var l_amendArrayLen = eval(v_action + "AmendArr").length;
    var l_amendArrayLen = window[v_action + "AmendArr"].length;
    //var l_amendArrayName = eval(v_action + "AmendArr");
    var l_amendArrayName = window[v_action + "AmendArr"];
    for (var j = 0; j < multipleEntryIDs.length; j++) {
        if (document.getElementById(multipleEntryIDs[j] + "_CHK_ME")) {
            fnEnableElement(document.getElementsByName("cmdAddRow_" + multipleEntryIDs[j])[0]);
            fnEnableElement(document.getElementsByName("cmdDelRow_" + multipleEntryIDs[j])[0]);
            fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[j])[0]);
        }
    }
    for (var i = 0; i < l_amendArrayLen; i++) {
        var isME = false;
        var amendableFld = l_amendArrayName[i];
        //var amendableBlk = amendableFld.substring(0, amendableFld.indexOf("__"));
        var amendableBlk = amendableFld.substring(0, amendableFld.lastIndexOf("__"));
        for (var j = 0; j < multipleEntryIDs.length; j++) {
            if (multipleEntryIDs[j] == amendableBlk) {
                isME = true;
                break;
            }
        }
        if (isME) {
            if (document.getElementById(amendableBlk)) {
                var amendFlds = document.getElementsByName(amendableFld.substring(amendableFld.lastIndexOf('__') + 2, amendableFld.length));
                //12.0.2 udf changes for CSCTRUDF start
                if (functionId == "CSCFNUDF" || functionId =="CSCTRUDF") {
                 //12.0.2 udf changes for CSCTRUDF end   
                   amendableBlk = 'BLK_UDF_DETAILS_VIEW';
                    for (var k = 0; k < amendFlds.length; k++) {
                        //Fix for 14321478 -UDF update issue starts
                        var amendElement = document.getElementById(amendableBlk + '__' + amendFlds[k].name + k);
                        var amnendElementType = amendElement.type.toUpperCase();
                        if (amnendElementType == "HIDDEN") {
                            var indexDate = getOuterHTML(amendElement).indexOf("displayDate");
                            var indexAmount = getOuterHTML(amendElement).indexOf("displayAmount");
                            var indexNumber = getOuterHTML(amendElement).indexOf("displayFormattedNumber");
                            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                                fnEnableElement(amendElement.parentNode.getElementsByTagName("INPUT")[1]);
                            }
                        } else {
                            fnEnableElement(amendElement);
                        }
                        // Fix for 14321478 -UDF update issue ends
                    } 
                } else {
                    for (var k = 0; k < amendFlds.length; k++) {
                        fnEnableElement(amendFlds[k]);
                    }
                }
            }
        } else {
            if (document.getElementById("MESV_" + amendableBlk)) {
                fnEnableElement(document.getElementsByName("BTN_PREV_" + amendableBlk)[0]);
                fnEnableElement(document.getElementsByName("BTN_NEXT_" + amendableBlk)[0]);
                fnEnableElement(document.getElementsByName("BTN_ADD_" + amendableBlk)[0]);
                fnEnableElement(document.getElementsByName("BTN_REMOVE_" + amendableBlk)[0]);
            }
            if (document.getElementById(amendableFld)) {
                if (document.getElementById(amendableFld).type.toUpperCase() == 'RADIO') {
                    var amendFlds = document.getElementsByName(amendableFld.substring(amendableFld.lastIndexOf('__') + 2, amendableFld.length));
                    for (var k = 0; k < amendFlds.length; k++) {
                        fnEnableElement(amendFlds[k]);
                    }
                } else {
                    fnEnableElement(document.getElementById(amendableFld));
                }
            }
        }
    }
}*/
function disableSubSystemElement() {
    if (subsysArr.length > 0) {
        for (var fieldIndex = 0; fieldIndex < subsysArr.length; fieldIndex++) {
            var elements = document.getElementsByName(subsysArr[fieldIndex]);
            if (elements.length == 0) {
                debugs("No Elements for subsystem ", "");
                var addRowButton = document.getElementById("cmdAddRow_" + subsysArr[fieldIndex]);
                if (addRowButton) {
                    fnDisableElement(addRowButton);
                }
                var delRowButton = document.getElementById("cmdDelRow_" + subsysArr[fieldIndex]);
                if (delRowButton) {
                    fnDisableElement(delRowButton);
                }
                var singleViewBtn = document.getElementById("BTN_SINGLE_VIEW_" + subsysArr[fieldIndex]);
                if (singleViewBtn) {
                    fnDisableElement(singleViewBtn);
                }
            } else {
                for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
                    fnDisableElement(elements[elementIndex]);
                }
                var lovElements = document.getElementsByName("BTN_LOV_" + subsysArr[fieldIndex]);
                if (lovElements.length > 0) {
                    for (var elementIndex = 0; elementIndex < lovElements.length; elementIndex++) {
                        fnDisableElement(lovElements[elementIndex]);
                    }
                }
                var popupElements = document.getElementsByName("BTN_POP_" + subsysArr[fieldIndex]);
                if (popupElements.length > 0) {
                    for (var elementIndex = 0; elementIndex < popupElements.length; elementIndex++) {
                        fnDisableElement(popupElements[elementIndex]);
                    }
                }
            }
        }
    }
}

function fnValidateFields() {
    var inputvalue = document.activeElement;
    if (inputvalue.value == "") return false;
    else return true;
}

function fnValidateMandatory() {
    var validate = true;
    var fldSetElem = document.getElementsByTagName("fieldset");
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME"); //REDWOOD_CHANGES
    for (var fs = 0; fs < fldSetElem.length; fs++) {
        if (fldSetElem[fs].getAttribute("type") == "ME" && fldSetElem[fs].getAttribute("view") == "SE" && fldSetElem[fs].getAttribute("MESVNODE") == "false") continue;
        for (var i in eleArray) {
            var elements = fldSetElem[fs].getElementsByTagName(eleArray[i]);
            var tempVal = "";
            for (var elemIndex = 0; elemIndex < elements.length; elemIndex++) {
//REDWOOD_CHANGES
                if (elements[elemIndex] && elements[elemIndex].tagName.toUpperCase() == "OJ-RADIOSET") continue;
                if (elements[elemIndex].getAttribute("REQUIRED") == "true") {									
//REDWOOD_CHANGES
                    //Bug_35277422 changes start
					if (fldSetElem[fs].getAttribute("type") == "ME")
					tempVal = elements[elemIndex].value;
					else
						//Bug_35277422 changes end
					tempVal = getFieldData(elements[elemIndex]);
				    
                    if (tempVal == null || isNull(tempVal)) { //REDWOOD_CHANGES
					//Bug_35277422 changes start
					    var label = "";
					    if (fldSetElem[fs].getAttribute("type") == "ME")
						    label = elements[elemIndex].getAttribute('label_value');
					    else
                            label = fnGetLabel(elements[elemIndex]);
						//var label = fnGetLabel(elements[elemIndex]);
						//Bug_35277422 changes end
			//Fix for 19698809 Starts
                        if(elements[elemIndex].id.indexOf("BLK_UDF_DETAILS_VIEW__FLDVAL") == -1){
                            appendErrorCode('ST-COM013', label);
                        }else{
                            var fieldHtml = getOuterHTML(elements[elemIndex]);
                            if ((fieldHtml.indexOf("displayAmount") != -1)  || ((fieldHtml.indexOf("displayFormattedNumber") != -1) ) ||((fieldHtml.indexOf("displayDate") != -1) )){
                                appendErrorCode('ST-COM013', mainWin.getItemDesc("LBL_MANDATORY") + " " + getInnerText(getNextSibling(elements[elemIndex])));
                            }else{
                                appendErrorCode('ST-COM013', mainWin.getItemDesc("LBL_MANDATORY") + " " + getInnerText(getPreviousSibling(elements[elemIndex])));
                            }
                        }
                        //Fix for 19698809 Ends
                        validate = false;
                    }
                }
            }
        }
    }
    return validate;
}

function fnValidateDataType() {
    try {
        var validate = true;	
//REDWOOD_CHANGES
        //var elementsListResTree = document.getElementById("ResTree");
        var elementsListResTree = document.getElementsByTagName("fieldset");
        var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA", "OJ-SELECT-SINGLE", "OJ-INPUT-DATE", "OJ-INPUT-DATE-TIME");
        for (var fs = 0;fs < elementsListResTree.length;fs++) {
            if (elementsListResTree[fs].getAttribute("type") == "ME" && elementsListResTree[fs].getAttribute("view") == "SE" && elementsListResTree[fs].getAttribute("MESVNODE") == "false")
                continue;
            for (var i in eleArray) {
                //var elements = elementsListResTree[fs].getElementsByTagName(eleArray[i]);
                if (!fnValidateElementDataTypeByTagName(elementsListResTree[fs], eleArray[i])) {
                    validate = false;
                }
            }
        }
        return validate;
    }
    catch (e) {
        alert(scriptError);
    }
}

function fnValidateElementDataTypeByTagName(elementsTree, tagName) {
    var validateElement = true;
    var elements = elementsTree.getElementsByTagName(tagName);
    for (var elemIndex = 0;elemIndex < elements.length;elemIndex++) {
        var valReq = true;
		if (elements[elemIndex].getAttribute("type") !=null){//REDWOOD_35205501 
        if (elements[elemIndex].getAttribute("type") != 'hidden') {
            if (elements[elemIndex] && elements[elemIndex].tagName.toUpperCase() == "OJ-RADIOSET") continue;
            if (!fnValidateElementDataType(elements[elemIndex], valReq, tagName)) {
                //validate = false; //REDWOOD_35205501 COMMENTED
				validateElement = false; //REDWOOD_35205501 CHANGES
            }
		}
        }
    }
    return validateElement;
}

function fnValidateElementDataType(element, valReq, tagName) {
    var validateElement = true;
    var l_Label;
    var tempVal = getFieldData(element);
    if ((element.getAttribute("REQUIRED") == '0') && (tempVal == '')) {
        return validateElement;
    }
    if (valReq) {
        if (element.getAttribute("DTYPE") == 'NUMERIC' || element.getAttribute("DTYPE") == 'NUMBER' || element.getAttribute("DTYPE") == 'DECIMAL' || element.getAttribute("DTYPE") == 'SMALLINT' || element.getAttribute("DTYPE") == 'INTEGER') {
            tempVal = getFieldData(element);
            if(tempVal && typeof(tempVal)!= 'number' ){
                if (tempVal && !isNumeric(tempVal)) {
                    l_Label = fnGetLabel(element);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validateElement = false;
                }
            }
        }
        if (element.getAttribute("DTYPE") == 'VARCHAR' || element.getAttribute("DTYPE") == 'VARCHAR2' || element.getAttribute("DTYPE") == 'CHAR') {
            tempVal = getFieldData(element);
			if (typeof(AStr)=='string'){//redwood_35274684 
				if (tempVal && !isAlphaNumeric(tempVal)) {
					l_Label = fnGetLabel(element);
					appendErrorCode('FC-MAINT02', l_Label);
					validateElement = false;
				}
			}
        }
    }
    return validateElement;
}

function fnValidateDataType_old_withoutOjet() {
    try {
        var validate = true;	  
//REDWOOD_CHANGES
        var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
        var tempVal = "";
        var valReq = true;
        /* Ashok Commented this as part of 12.0.2
        var dbFCJDomnew = loadXMLDoc(msgxml);
        var isQueryTypes = new Array();
        var xmlNodes = new Array();
        xmlNodes = selectNodes(dbFCJDomnew, "//FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@ ISQUERY='1']");
        for (var x = 0; x < xmlNodes.length; x++) {
            isQueryTypes[x] = xmlNodes[x].getAttribute("TYPE");
        }
        */
        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++) {
            valReq = true;
            if (elements[elemIndex].type != 'hidden') {
                tempVal = getFieldData(elements[elemIndex]);
                if ((elements[elemIndex].getAttribute("REQUIRED") == '0') && (tempVal == '')) {
                    continue;
                }
                //for (var j = 0; j < isQueryTypes.length; j++) {
                //    if (elements[elemIndex].getAttribute("DBT") == isQueryTypes[j]) {
                //        valReq = false;
                //    }
                // }
                if (valReq) {
                    if (elements[elemIndex].getAttribute("DTYPE") == 'NUMERIC' || elements[elemIndex].getAttribute("DTYPE") == 'NUMBER' || elements[elemIndex].getAttribute("DTYPE") == 'DECIMAL' || elements[elemIndex].getAttribute("DTYPE") == 'SMALLINT' || elements[elemIndex].getAttribute("DTYPE") == 'INTEGER') {
                        tempVal = getFieldData(elements[elemIndex]);
                        if (!isNumeric(tempVal)) {
                            var l_Label = fnGetLabel(elements[elemIndex]);
                            appendErrorCode('FC-MAINT02', l_Label);
                            validate = false;
                        }
                    }
                    if (elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR' || elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR2' || elements[elemIndex].getAttribute("DTYPE") == 'CHAR') {
                        tempVal = getFieldData(elements[elemIndex]);
                        if (!isAlphaNumeric(tempVal)) {
                            var l_Label = fnGetLabel(elements[elemIndex]);
                            appendErrorCode('FC-MAINT02', l_Label);
                            validate = false;
                        }
                    }
                }
            }
        }
        var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
        for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++) {
            tempVal = getFieldData(elements1[elemIndex1]);
            if ((elements1[elemIndex1].getAttribute("REQUIRED") == '0') && (tempVal == '')) {
                continue;
            }
            if (elements1[elemIndex1].getAttribute("DTYPE") == 'NUMERIC' || elements1[elemIndex1].getAttribute("DTYPE") == 'DECIMAL' || elements1[elemIndex1].getAttribute("DTYPE") == 'SMALLINT' || elements1[elemIndex1].getAttribute("DTYPE") == 'INTEGER' || elements1[elemIndex1].getAttribute("DTYPE") == 'NUMBER') {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (!isNumeric(tempVal)) {
                    var l_Label = fnGetLabel(elements1[elemIndex1]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
            if (elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR' || elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR2' || elements1[elemIndex1].getAttribute("DTYPE") == 'CHAR') {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (!isAlphaNumeric(tempVal)) {
                    var l_Label = fnGetLabel(elements1[elemIndex1]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
        }
        return validate;
    } catch (e) {
        alert(scriptError);
    }
}
//REDWOOD_CHANGES
function fnValidateRange(v_NumberFld,fldValue) {
//    if (getOuterHTML(v_NumberFld).indexOf("validateInputAmount") == -1 && getOuterHTML(v_NumberFld).indexOf("processAmount") == -1) {
//        if (v_NumberFld.value != "") v_NumberFld.value = Number(v_NumberFld.value);
//    }
    if (v_NumberFld.tagName == "OJ-CHECKBOX-SET" || v_NumberFld.tagName == "OJ-SWITCH") return;
    if (!v_NumberFld || v_NumberFld.value == '') return;
    var valueEntered = v_NumberFld.value;
    if(typeof(fldValue)!= 'undefined'){
         valueEntered = fldValue;
    }
   
    var maxVal = v_NumberFld.getAttribute("MAX_VAL");
    var minVal = v_NumberFld.getAttribute("MIN_VAL");
    if (!isNumericValidation(valueEntered) || (valueEntered.indexOf(" ") != -1 && gDigitGroupingSymbol != " " && gDecimalSymbol != " ")) {
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
        //v_NumberFld.value = "";
        v_NumberFld.focus();
        return;
    }
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');
    if (valueEntered.indexOf(gDecimalSymbol) == -1) {
        if (!isNaN(parseInt(minVal))) {
            if (parseInt(valueEntered) < parseInt(minVal)) {
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + " " + minVal);	 //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
                //v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseInt(valueEntered) > parseInt(maxVal)) {
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + " " + maxVal);  //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
                //v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
    } else {
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"))) {
                var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                alert(getMessage(lblMaxDecimal, v_NumberFld.getAttribute("MAX_DECIMALS") + "~"));
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
          //      v_NumberFld.value = "";
                v_NumberFld.focus();
            }
        }
        if (!isNaN(parseInt(minVal))) {
            if (parseFloat(valueEntered) < parseFloat(minVal)) {
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + " " + minVal); //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
            //    v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseFloat(valueEntered) > parseFloat(maxVal)) {
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + " " + maxVal);  //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
              //  v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
    }
    return true;
}
function fnValidateRange_Old(v_NumberFld) {	
//REDWOOD_CHANGES
    if (getOuterHTML(v_NumberFld).indexOf("validateInputAmount") == -1 && getOuterHTML(v_NumberFld).indexOf("processAmount") == -1) {
        if (v_NumberFld.value != "") v_NumberFld.value = Number(v_NumberFld.value);
    }
    if (v_NumberFld.type == "checkbox") return;
    if (!v_NumberFld || v_NumberFld.value == '') return;
    var valueEntered = v_NumberFld.value;
    var maxVal = v_NumberFld.getAttribute("MAX_VAL");
    var minVal = v_NumberFld.getAttribute("MIN_VAL");
    if (!isNumericValidation(valueEntered) || (valueEntered.indexOf(" ") != -1 && gDigitGroupingSymbol != " " && gDecimalSymbol != " ")) {
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        v_NumberFld.value = "";
        v_NumberFld.focus();
        return;
    }
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');
    if (valueEntered.indexOf(gDecimalSymbol) == -1) {
        if (!isNaN(parseInt(minVal))) {
            if (parseInt(valueEntered) < parseInt(minVal)) {
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + minVal);
                v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseInt(valueEntered) > parseInt(maxVal)) {
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + maxVal);
                v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
    } else {
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"))) {
                var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                alert(getMessage(lblMaxDecimal, v_NumberFld.getAttribute("MAX_DECIMALS") + "~"));
                v_NumberFld.value = "";
                v_NumberFld.focus();
            }
        }
        if (!isNaN(parseInt(minVal))) {
            if (parseFloat(valueEntered) < parseFloat(minVal)) {
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + minVal);
                v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseFloat(valueEntered) > parseFloat(maxVal)) {
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + maxVal);
                v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
    }
    return true;
}

function fnGetLabel(obj) {
    try {
        var l_FldSetLbl = "";
        var l_DBT = "";
        if (obj.getAttribute("DBT")) l_DBT = obj.getAttribute("DBT");
        if (l_DBT) l_FldSetLbl = fnGetFldSetLbl(l_DBT);
        var l_temp = obj;
        if (l_temp.getAttribute("DBT") == null || l_temp.getAttribute("DBT") == "") {
            var l_parent = l_temp.parentNode;
            while (!(l_parent.tagName == 'TABLE')) {
                l_temp = l_parent;
                l_parent = l_temp.parentNode;
            }
            l_DBT = l_parent.getAttribute("DBT");
            l_FldSetLbl = fnGetFldSetLbl(l_DBT);
        }
        if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length > 0) {
            return (mainWin.getItemDesc("LBL_MANDATORY") + " " + obj.getAttribute("LABEL_VALUE") + " " + mainWin.getItemDesc("LBL_IN")  + " " + l_FldSetLbl);  //Fix for 16699870
        }
        if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length == 0) {
            if (obj.getAttribute("REQUIRED") == -1) return mainWin.getItemDesc("LBL_MANDATORY") + " " + obj.getAttribute("LABEL_VALUE");
            else return obj.getAttribute("LABEL_VALUE");
        }
        return obj.name;
    } catch (e) {
        alert(scriptError);
    }
}

function fnGetFldSetLbl(v_DBT) {
    try {
        var l_isMe = false;
        for (var l_Cnt = 0; l_Cnt < multipleEntryIDs.length; l_Cnt++) {
            if (multipleEntryIDs[l_Cnt].toUpperCase() == v_DBT.toUpperCase()) {
                l_isMe = true;
                break;
            }
        }
		if (l_isMe) {
			//Fix for 17958515 Starts
           var FldSetCaption = "";
            if(document.getElementById(v_DBT) != null && document.getElementById(v_DBT).tagName == "TABLE"){
              FldSetCaption = document.getElementById(v_DBT).getAttribute("caption");
            }
            else{
              var meTableObj = getTableObjForBlock(v_DBT);
              FldSetCaption = meTableObj.getAttribute("caption");
            }
            //Fix for 17958515 Ends
            return FldSetCaption;
        }
        return "";
    } catch (e) {
        alert(scriptError);
    }
}


function fnProcessAuthViewchg(selectedMod) {
    try {
        gAction = "VIEWMNTLOG";
        setNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"), selectedMod);
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        fnSetExitButton(false);
    } catch (e) {
        alert(scriptError);
    }
}

function getAttachmentxml() {
    try {
        var attchMentxml = "<ATTACHMENTS>";
        for (var i = 0; i < attachmentData.length; i++) {
            if (attachmentData[i] == "") continue;
            var XmlDeclRemoved = attachmentData[i];
            if(attachmentData[i].substring(0,21).toLowerCase() == '<?xml version="1.0"?>'){
                XmlDeclRemoved = attachmentData[i].substring(21);
           }
        attchMentxml +=  XmlDeclRemoved;
        }
        //attchMentxml += attachmentData[i];
        attchMentxml += "</ATTACHMENTS>";
        return attchMentxml;
    } catch (e) {
        alert(scriptError);
    }
}

function fnprocessExpire() {
    var sessionNode = selectSingleNode(fcjResponseDOM, "//SESSION"); //ashok
    if (sessionNode) {
        var sessionText = getNodeText(sessionNode);
        if (sessionText == "EXPIRED") {
            expiryMessage = mainWin.getItemDesc("LBL_SESSION_TIMEDOUT");
            alert(expiryMessage);
        }
    }
}

function fnProcessResponse() {
    //debugs("FunctionId=", functionId);
    var l_msgStat = "FAILURE";
    
    debugs("Calling gDispAlertOnSuccess", "");
    var dispAlert = gDispAlertOnSuccess;
    
    if (fcjResponseDOM != null) {
	    //Snapshot ID Changes Starts Here
		if (selectNodes(fcjResponseDOM, "//FCUBS_HEADER/SNAPSHOTID").length > 0){
			if( getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")) == 'SUCCESS'){
				snapShotId = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SNAPSHOTID")); 
			}
		}
		//Snapshot ID Changes Ends Here
	    
        debugs("processing fcjResponseDOM ", "");

        if (selectNodes(fcjResponseDOM, "//SESSION").length > 0) {
            debugs("calling fnprocessExpire", "");
            fnprocessExpire();
            return l_msgStat;
        }
        
        if(getXMLString(fcjResponseDOM).indexOf("FC-MAINT53")>-1){
            mask();
            debugs("showAlerts for Erorr=FC-MAINT53", "");
            showAlerts(fnBuildAlertXML('FC-MAINT53', 'E'), 'E'); 
            alertAction = "UNMASK";
            responseDOM = "";
            return l_msgStat;
        }
        
        var l_MsgStatNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
        debugs("l_MsgStatNode", l_MsgStatNode);
        if (!l_MsgStatNode) {
            mask();
            debugs("showAlerts for Erorr=ST-COM036", "");
            showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
            alertAction = "UNMASK";
            return l_msgStat;
        } else {
            l_msgStat = getNodeText(l_MsgStatNode);
            if (l_msgStat == "") {
                mask();
                debugs("showAlerts for Erorr=ST-COM036", "");
                showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
                alertAction = "UNMASK";
                return "FAILURE";
            }
        }
        
        //Ashok 12.1, This needs to be made optional. check whether debug window is open and then only  parse.
        if(mainWin.DebugWindowFlg == "Y") {
            var l_dbDebugPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_DEBUG_RESP";
            if (selectSingleNode(fcjResponseDOM, l_dbDebugPath)) 
                mainWin.serverDebugStmt = getXMLString(selectSingleNode(fcjResponseDOM, l_dbDebugPath));
            var respTxt = getXMLString(fcjResponseDOM);
            if(respTxt.indexOf("<FCUBS_DEBUG_RESP>") != -1) {
                var start = respTxt.substring(0,respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>")+19,respTxt.length);
                respTxt = start + end;
                fcjResponseDOM = loadXMLDoc(respTxt);
            }
        }
        if (l_msgStat == 'SUCCESS') {
            debugs("processing for message status=","SUCCESS");
            var l_TotalRecords = selectNodes(fcjResponseDOM, "//FCUBS_BODY/REC").length;
            if (l_TotalRecords == 0) {
                if (gAction == 'DELETE') { //REC NODE WONT BE AVAILABLE FOR DELETE OPERATION
                    return l_msgStat;
                }
                debugs("showAlerts for Erorr=ST-COM036 as total=", l_TotalRecords);
                mask();
                showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
                alertAction = "UNMASK";
                return "FAILURE";
            } else {
            
                debugs("Calling goToRec","");
                goToRec(1); //paint the response on the screen
                if ((gAction == "MODIFY" || gAction == "ROLLOVER" || gAction == "LIQUIDATE") && (gsave == true||ghold == true)) { //Bug no: 16290155 Changes
                    /*if(gAction == "MODIFY"){
                      fnpostAction("SAVE");
                    }*/
                    if (!releaseLock(gAction)) { //Fix for 32335251
                        debugs("Failed in releaseLock","");
                        return "FAILURE";
                    }
                }
            }
            
            if (gAction != 'EXECUTEQUERY' && gAction != '' && gAction != 'AUTHQUERY' && gAction != 'DELETEQUERY' && gAction != 'CHANGELOG' && gAction != 'VIEWMNTLOG' && gAction != 'MISPICKUP' && gAction != 'PRDDFLT' && gAction != 'DEFAULT' && gAction.indexOf("SUBSYSPKP") == -1 && gAction.indexOf("ENRICH") == -1 && gAction != 'COPY' && typeof (launchFormScrArgs) == "undefined" && showProcessMsg == true) {
                if (dispAlert == "Y") {
                    var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP";
                    
                    if (fnProcessMsgNode(l_msgStat, 'I', l_xPath) == "FAILURE") {
                        debugs("Failed in fnProcessMsgNode","");
                        return "FAILURE";
                    }
                }
                gDispAlertOnSuccess = "Y";
            }
            
        } else if (l_msgStat == 'WARNING') {} else if (l_msgStat == 'FAILURE') {
            debugs("processing for message status = WARNING/FAILURE","");
            
            var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP";
            debugs("Calling fnProcessMsgNode","");
            fnProcessMsgNode(l_msgStat, 'E', l_xPath);
            return l_msgStat;
        }
        
    } else {
        mask();
        debugs("showAlerts for Erorr=ST-COM036", "");
        showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
        alertAction = "UNMASK";
        return l_msgStat;
    }
    return l_msgStat;
}

function fnPostProcessResponse(msgStatus, args) {
    var dispAlert = gDispAlertOnSuccess;
    if (msgStatus == "SUCCESS") {
        if (gAction != 'EXECUTEQUERY' && gAction != '' && gAction != 'AUTHQUERY' && gAction != 'DELETEQUERY' && gAction != 'CHANGELOG' && gAction != 'VIEWMNTLOG' && gAction != 'MISPICKUP' && gAction != 'PRDDFLT' && gAction != 'DEFAULT' && gAction.indexOf("SUBSYSPKP") == -1 && gAction.indexOf("ENRICH") == -1 && gAction != 'COPY' && typeof (launchFormScrArgs) == "undefined") {
            if (dispAlert == "Y") {
                var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP";
                if (fnProcessMsgNode(msgStatus, 'I', l_xPath) == "FAILURE") {
                    try {
                        //eval("fn" + processingAction + "Failure(args)");
                    	var fnEval = new Function("args","fn" + processingAction + "Failure(args)");  
                        fnEval();
                    } catch (e) {}
                    return;
                }
            }
            gDispAlertOnSuccess = "Y";
        }
        try {
            //eval("fn" + processingAction + "Success(args)");
            var fnEval = new Function("args","fn" + processingAction + "Success(args)");  
            fnEval();
			 //12.0.3 Summary to detail changes starts
            if (detailpkArgs.length !=0 && processingAction.toUpperCase() != 'DELETE')//Fix for 21490926 
                fnUpdateMultiDetailNavBtns(false);
            //12.0.3 Summary to detail changes ends
        } catch (e) {}
    } else if (msgStatus == "WARNING") {
        var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP";
        //fnpostAction("SAVE");
        if (fnProcessMsgNode(msgStatus, 'O', l_xPath) == "FAILURE") {
            try {
                //eval("fn" + processingAction + "Failure(args)");
                var fnEval = new Function("args","fn" + processingAction + "Failure(args)");  
                fnEval();
            } catch (e) {}
            return;
        }
    } else {
        try {
            //eval("fn" + processingAction + "Failure(args)");
            var fnEval = new Function("args","fn" + processingAction + "Failure(args)");  
            fnEval();
        } catch (e) {}
        return;
    }
}

function fnProcessMsgNode(msgStatus, v_Type, v_xPath) {

    //debugs("FunctionId~MsgStatus~Type~XPath=", functionId + "~" + msgStatus + "~" + v_Type + "~" + v_xPath);
    if (!selectSingleNode(fcjResponseDOM, v_xPath)) {
        mask();
        showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
        alertAction = "UNMASK";
        return "FAILURE";
    }
    
    debugs("Getting messageNode=", v_xPath);
    messageNode = getXMLString(selectSingleNode(fcjResponseDOM, v_xPath));
    debugs("Calling displayResponse", "");
    displayResponse(messageNode, msgStatus, v_Type, v_xPath);
    return "SUCCESS";
}

function displayResponse(messageNode, msgStatus, v_Type, v_xPath) {
    //debugs("FunctionId~MsgNode~MsgStatus~Type~XPath=", functionId + "~" + messageNode + "~" + msgStatus + "~" + v_Type + "~" + v_xPath);
    
    if (v_Type == 'O') 
        alertAction = 'OVERRIDE';
    else 
        alertAction = 'UNMASK';
    
    mask();
    if (typeof (screenType) != "undefined" && screenType == 'WB') {
        debugs("Calling showAlerts alertAction=" + alertAction, "");
        showBranchAlerts(messageNode, v_Type);
    } else {
        debugs("Calling showAlerts alertAction=" + alertAction, "");
        showAlerts(messageNode, v_Type);
    }
}

function fnDeleteFailure() {
   var fcjdeleteeResponseDOM=fcjResponseDOM;//Performance Changes
    fcjResponseDOM = oldResDOM_Delete;
    goToRec(1);
    gAction = "";
    fnSetExitButton();
    //Performance Changes
    fcjResponseDOM=fcjdeleteeResponseDOM;
    //fnpostAction('DELETE');
}

function fnDeleteSuccess() {
    resetElements();
    gAction = "";
    fnSetExitButton();
	//Changed for 14747734 & 14783769  --start
     showToolbar(functionId, '', '');
    //Changed for 14747734 & 14783769  --end
     //fnpostAction('DELETE');
    if (!fnPostDeleteMain()) return;
    //if (!fnEventsHandler('fnPostDelete')) return;
}

function fnCloseFailure() {
  var fcjcloseResponseDOM=fcjResponseDOM; //Performance Changes
	// Fix for 17490931 starts
    if (responseDOM_Modify != null) {
        fcjResponseDOM = loadXMLDoc(getXMLString(responseDOM_Modify));
        responseDOM_Modify = null;
    }
    goToRec(1);
    // Fix for 17490931 ends
    gAction = "";
    fnSetExitButton();
    //Performance Changes
    fcjResponseDOM=fcjcloseResponseDOM;
    //fnpostAction('CLOSE');
    return;
}

function fnCloseSuccess() {
    gAction = "";
    fnSetExitButton();
    disableForm();
    showToolbar(functionId, '', '');
    //fnpostAction('CLOSE');
    if (!fnPostCloseMain()) return;
    //if (!fnEventsHandler('fnPostClose')) return;
}

function fnClose1Failure() {
    gAction = "";
    fnSetExitButton();
    //fnpostAction('CLOSEL');
    return;
}

function fnClose1Success() {
    gAction = "";
    fnSetExitButton();
    disableForm();
    showToolbar(functionId, '', '');
    //fnpostAction('CLOSEL');
    if (!fnPostCloseMain()) return;
    //if (!fnEventsHandler('fnPostClose')) return;
}

function fnReopenFailure() {
    gAction = "";
    fnSetExitButton();
    //fnpostAction('REOPEN');
    return;
}

function fnReopenSuccess() {
    gAction = "";
    fnSetExitButton();
    disableForm();
    showToolbar(functionId, '', '');
    //fnpostAction('REOPEN');
    if (!fnPostReOpenMain()) return;
    //if (!fnEventsHandler('fnPostReOpen')) return;
}

function fnAuthFailure() {
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('AUTH');
    return;
}

function fnAuthSuccess() {
    disableForm();
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('AUTH');
    return;
}

function fnDirectAuthSuccess() {
    disableForm();
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    return;
}

function fnDirectAuthFailure() {
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    return;
}

function fnSaveFailure() {
  //fnpostAction('SAVE');
  	// Fix for 18761171  starts
    if (responseDOM_Modify != null) {
        fcjResponseDOM = loadXMLDoc(getXMLString(responseDOM_Modify));
        responseDOM_Modify = null;
    }
    // Fix for 18761171  ends
    if (subSysFlag) {
        document.getElementsByName('SUBSYSSTAT')[0].value = prevStatusStr;
    }
    fnEventsHandler('fnPostSaveFailure'); //21774504 
    return false;
}

function fnSaveSuccess(args) { //Performance Changes
    //viewModeAction = true;
    viewModeAction = false;
   /* if(gAction != "MODIFY"){
      fnpostAction('SAVE');
    }*/
    gAction = "";
    disableForm();//Fix for 18386706 
    fnSetExitButton();
	setTimeout( function(){ //REDWOOD_36767973 Added
    showToolbar(functionId, '', '');
	},10);
    fnPasteControlFieldValues();
    setActionTime(inTime, functionId, 'SAVE');
    responseDOM_Modify =null;
    if (!fnPostSaveMain()) return false;
   
    return true;
}
 
function fnReverseFailure() {
    gAction = "";//Fix for 16983202
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('REVERSE');
}

function fnReverseSuccess() {
    disableForm();
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('REVERSE');
    if (!fnPostReverseMain()) return;
    
}

function fnConfirmFailure() {
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('CONFIRM');
    return;
}

function fnConfirmSuccess() {
    disableForm();
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('CONFIRM');
    if (!fnPostConfirmMain()) return;
    //if (!fnEventsHandler('fnPostConfirm')) return;
}

function fnHoldFailure() {
    ghold=false; //Bug no: 16290155 Changes
    if (subSysFlag) {
        document.getElementsByName('SUBSYSSTAT')[0].value = prevStatusStr;
    }
    gAction = prevAction;
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('HOLD');
    return;
}

function fnHoldSuccess() {
    disableForm();
	// Fix for 16407659
    if (gAction == 'MODIFY') releaseLock(); 
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    //fnpostAction('HOLD');
    if (!fnPostHoldMain()) return;
    //if (!fnEventsHandler('fnPostHold')) return;
}

function fnProductPickupFailure() {
    gAction = g_prev_gAction;
	 /* Fix for 18312329 start */
	if(oldResDOM_Cancel != null){
		fcjResponseDOM = oldResDOM_Cancel;
		oldResDOM_Cancel=null;
		}
	else{
	    resetDOM();
		createDOM(dbStrRootTableName);
	}
	/* Fix for 18312329  end */
    return;
}

function fnProductPickupSuccess() {
    gAction = g_prev_gAction;
    enableForm();
    showToolbar(functionId, '', '');
    if (!fnPostProductPickupMain()) return;
    //if (!fnEventsHandler('fnPostProductPickup')) return;
}

function fnProcessRequestFailure() {
    gAction = g_prev_gAction;
    resetDOM();
    createDOM(dbStrRootTableName);
    return;
}

function fnProcessRequestSuccess() {
    gAction = g_prev_gAction;
    enableForm();
    showToolbar(functionId, '', '');
    if (!fnPostProcessRequestMain()) return;
    //if (!fnEventsHandler('fnPostProcessRequest')) return;
}

//Fix for 14779627 Starts
function fnEnrichDetailsFailure() {
    gAction = g_prev_gAction;
    /*Fix for 17077066*/
    /*resetDOM();
    createDOM(dbStrRootTableName);*/
	showToolbar(functionId, '', '');
    return;
}

function fnEnrichDetailsSuccess() {
    gAction = g_prev_gAction;
    enableForm();
    showToolbar(functionId, '', '');
    if(!fnPostEnrichDetailsMain())
    //if(!fnEventsHandler('fnPostEnrichDetails'))
        return;
}
//Fix for 14779627 Ends

function fnOnlineAuthFailure() {
    return false;
}

function fnOnlineAuthSuccess(args) {
    alertAction = "ONLINEAUTH";
}

function fnProcessOnlineAuthFailure() {
    resetDOM();
    resetElements();
    disableForm();
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    return false;
}

function fnProcessOnlineAuthSuccess() {
    disableForm();
    fnPostExecuteQueryMain();
    //fnEventsHandler('fnPostExecuteQuery');
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    if (screenArgs["RETURN_VALUE"].msgGenReqd && screenArgs["RETURN_VALUE"].msgGenReqd == "TRUE") launchMsgScreen = true;
}

function fnMaintAuthFailure() {
    //fnpostAction('AUTH');
    return false;
}

function fnMaintAuthSuccess() {
    //fnpostAction('AUTH');
    alertAction = "MAINTAUTH_S";
}

function fnRejectAuthFailure() {
    return false;
}

function fnRejectAuthSuccess() {
    alertAction = "REJECTAUTH_S";
}

function fnShowError(messageNode, msgStatus, v_Type, v_xPath) {
    debugs("FunctionId~MsgNode~MsgStatus~Type~XPath=", functionId + "~" + messageNode + "~" + msgStatus + "~" + v_Type + "~" + v_xPath);
    var message = "";
    for (var index = 0; index < messageNode.length; index++) {
        var ecode = getNodeText(messageNode[index].children[0]);
        var edesc = getNodeText(messageNode[index].children[messageNode[index].children.length - 1]);
        if (ecode != '') {
            var msg = ecode + " " + edesc;
            message = message + msg + "~";
        }
    }
    return ShowErrorDialog(v_Type, message);
}

function fnProcessResponseLocal() {
    debugs("FunctionId=", functionId);
    if (fcjResponseDOM != null) {
        if (selectNodes(fcjResponseDOM, "//SESSION").length > 0) {
            fnprocessExpire();
            return;
        }
        if(getXMLString(fcjResponseDOM).indexOf("FC-MAINT53")>-1){
                mask();
                showAlerts(fnBuildAlertXML('FC-MAINT53', 'E'), 'E'); 
                alertAction = "UNMASK";
                responseDOM = "";
                return ;
        }
        var l_MsgStat = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
        var messageNode = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/RESPONSE/ERROR");
        if (l_MsgStat == "") {
            mask();
            showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
            alertAction = "UNMASK";
            return false;
        }
        if (l_MsgStat == 'SUCCESS') {
            return true;
        } else {
            var err;
            var err_code;
            var msgArr = fnBuildMsgArr(getXMLString(messageNode));
            for (var i in msgArr) {
                err_code = i + "~";
                err = msgArr[i] + "~";
            }
            err_code = err_code.substring(0, err_code.length - 1);
            err = err.substring(0, err.length - 1);
            mask();
            returnVal = showAlerts(fnBuildAlertXML(err_code, 'E', err), 'E');
            alertAction = "UNMASK";
            return false;
        }
    } else {
        showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
        alertAction = "UNMASK";
        window.focus();
        return false;
    }

    return true;
}

function displayError(errCode) {
    debugs("FunctionId~ErrCode=", functionId + "~" + errCode);
    appendErrorCode(errCode, null);
    var msg = buildMessage(gErrCodes);
    alertMessage(msg);
    window.focus();
}

function fnSaveSubScreenData() {
    debugs("Saving subscreen data", "");
    appendData();
    var newWinParams = new Object();
    newWinParams.dbDataDOM = dbDataDOM;
    newWinParams.dbIndexArray = dbIndexArray;
    parent.screenArgs['RETURN_VALUE'] = newWinParams;
}

function fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft) {
//REDWOOD_CHANGES
//    parent.document.getElementById(parentScrID).style.width = launcherDIVWidth;
//    parent.document.getElementById(parentScrID).children[0].style.width = launcherIFWidth;
//    parent.document.getElementById(parentScrID).style.height = launcherDIVHeight;
//    parent.document.getElementById(parentScrID).children[0].style.height = launcherIFHeight;
//    parent.document.getElementById(parentScrID).style.left = launcherLeft;
//    document.getElementById("DIVScrContainer").style.width = launcherResTreeWidth;
//    document.getElementById("DIVScrContainer").style.height = launcherResTreeHeight;
//    document.getElementById("DIVWNDContainer").style.width = launcherHeaderWidth;
//REDWOOD_CHANGES
//REDWOOD_35263935
  if(subscreenLaunched) {
    subscreenLaunched = false;
  }  
 //REDWOOD_35263935
	var childDivObj = document.getElementById("ChildWin");
    if (getBrowser().indexOf("OPERA") != -1)//ie11 changes 
        childDivObj.parentNode.removeChild(childDivObj); 
        //setOuterHTML(document.getElementById("ChildWin"), "");
    else {        
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        document.getElementById("Div_ChildWin").removeChild(childDivObj);
    }
    if (!fromRemarksReqd) {
        if (typeof (unmaskTitle) != "undefined") {
            unmask(unmaskTitle);
            unmaskTitle = false;
            fnFocus();
        } else {
            unmask();
        }
    } else {
        fromRemarksReqd = false;
    }
    try {
        document.getElementById("BTN_EXIT_IMG").focus();
    }catch(e){
        try {
            document.getElementById("BTN_EXIT").focus();
        }catch(e) {
            
        }
    }
}

function fnShowSubScreen(screenArgs) {

    var txnBranch = g_txnBranch;
    var langCode = mainWin.LangCode;
    var subScrXmlfile;
    var uiName = fnGetUixmlForFunction(screenArgs['FUNCTION_ID']);
    if (uiName != "") {
        subScrXmlfile = mainWin.UIXmlPath + "/" + langCode + "/" + uiName + ".xml";
    } else {
        subScrXmlfile = mainWin.UIXmlPath + "/" + langCode + "/" + screenArgs['FUNCTION_ID'] + ".xml";
    }
    
    var funcOrigin = screenArgs['FUNC_ORIGIN'];
    var prntFunc = screenArgs['PRNT_FUNC'];
    var prntOrigin = screenArgs['PRNT_ORIGIN'];
    //12.0.2 Code for Loading Cluster/Custom js File starts
    var clusterModified = screenArgs['CLUSTER_MOD'];
    var customModified = screenArgs['CUSTOM_MOD'];
    //12.0.2 Code for Loading Cluster/Custom js File ends
    var subSys = "";
    var scrtype = mainWin.gActiveWindow.screenType;

    if (typeof (screenArgs['SUBSYSTEM']) != "undefined") 
        subSys = screenArgs['SUBSYSTEM'];
        
    screenArgs['SUBSYS'] = subSys;
    var IsAdv_Sum_Scr = 'N';
    if (screenArgs['ISADV_SUM'] != "" && typeof (screenArgs['ISADV_SUM']) != 'undefined') IsAdv_Sum_Scr = 'Y';
    var scrChldFnId = "";//ScreenChild issue
    if( (typeof(screenArgs['SCR_CHLD_FNID']) != 'undefined')){//ScreenChild issue
        //ScreenChild subscreen issue start
	if(screenArgs['UIXML']!=""){
	     scrChldFnId = screenArgs['UIXML'];//ScreenChild issue
	}else{
         scrChldFnId = screenArgs['SCR_CHLD_FNID'];//ScreenChild issue
	}
	//ScreenChild subscreen issue end
    }
    
    var params = "scr=" + screenArgs['SCREEN_NAME'] + "&";
    params += "functionid=" + screenArgs['FUNCTION_ID'] + "&";
    params += "authReq=" + authReq + "&"; //extauth not load from sys path
    params += "scrChildFnId=" + scrChldFnId + "&";//ScreenChild issue
    params += "inTime=" + screenArgs['INTIME'] + "&";//Performance Changes
    params += "parentFunc=" + functionId + "&";
    params += "lang=" + screenArgs['LANG'] + "&";
    params += "description=" + screenArgs['DESCRIPTION'] + "&";
    params += "gAction=" + gAction + "&";
    params += "uixml=" + uiName + "&";
    params += "funcOrigin=" + funcOrigin + "&";
    params += "prntFunc=" + prntFunc + "&";
    params += "prntOrigin=" + prntOrigin + "&";
    params += "IsAdv_Sum_Scr=" + IsAdv_Sum_Scr + "&";
    params += "txnBranch=" + txnBranch + "&";
    params += "scrType=" + scrtype + "&";
    //12.0.2 Code for Loading Cluster/Custom js File starts
    params += "clusterModified=" + clusterModified + "&";
    params += "customModified=" + customModified + "&";
    //12.0.2 Code for Loading Cluster/Custom js File ends
    params += "callFormLaunched=yes";

    if (getXMLString(getUIXML(subScrXmlfile)) == "" || getXMLString(getUIXML(subScrXmlfile)).indexOf("404 Not Found") != -1) {
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR"));
        unmaskTitle = false;
    } else {
        debugs("Calling loadSubScreenDIV","");
        loadSubScreenDIV("ChildWin", "ExtLaunchSubScreen.jsp?" + params);
    }
    subscreenLaunched = true;	//REDWOOD_CHANGES
}

function fnCloseSubScr(e) {
    if (screenArgs['SUBSYS'] != '') fnSetDependentSubSystem(screenArgs);
    if (screenArgs['RETURN_VALUE']) {
        if (screenArgs['RETURN_VALUE'].authorize) {
            fnProcessOnlineAuth(screenArgs);
            return;
        }
    }
    if (screenArgs['SCREEN_NAME'] == "CVS_ADVANCED") {
        fnPostClose_CVS_ADVANCED(screenArgs, e);
        return;
    } else if (screenArgs['FUNCTION_ID'] == "EXTAUTHORIZE") {
        fnPostClose_CVS_AUTHORIZE(screenArgs);
    } else {
        dbDataDOM = loadXMLDoc(getXMLString(screenArgs['RETURN_VALUE'].dbDataDOM));
        if (!fnEventsHandlerSubScreen('fnPostClose', screenArgs['SCREEN_NAME'], screenArgs['FUNCTION_ID'], screenArgs)) {
            return;
        }
    }
    dbDataDOM = loadXMLDoc(getXMLString(screenArgs['RETURN_VALUE'].dbDataDOM));
    dbIndexArray = screenArgs['RETURN_VALUE'].dbIndexArray;
    if (screenArgs['SCREEN_NAME'] == "CVS_ADVANCED" && screenArgs['FUNCTION_ID'] == "EXTAUTHORIZE") {
        if (!fnEventsHandlerSubScreen('fnPostPickUpSubSystem', screenArgs['SCREEN_NAME'], screenArgs['FUNCTION_ID'], screenArgs)) return;
    }
}

function fnPostClose_CVS_ADVANCED(screenArgs, e) {
    whereClause_adv = screenArgs['RETURN_VALUE'].advWhereClause;
    queryName_adv = screenArgs['RETURN_VALUE'].advQueryName;
    orderByClause_adv = screenArgs['RETURN_VALUE'].advOrderByClause;
    advValueClause = screenArgs['RETURN_VALUE'].advValueClause;
    advOperationClause = screenArgs['RETURN_VALUE'].advOperationClause;
    advOrderOptClause = screenArgs['RETURN_VALUE'].advOrderOptClause;
    fnExecuteQuery_sum('A', e);
}

function fnPostClose_CVS_AUTHORIZE(screenArgs) {
    dbDataDOM = loadXMLDoc(getXMLString(screenArgs["RETURN_VALUE"].dbDataDOM));
   // disableForm();//Fix for 18386706 
    //12.0.3 Summary to detail changes starts
   // fnUpdateMultiDetailNavBtns(false);Fix for 18433735
    //12.0.3 Summary to detail changes ends
    viewModeAction = false;
    gAction = "";
    disableForm();//Fix for 18386706 
    fnUpdateMultiDetailNavBtns(false);//Fix for 18433735
    fnSetExitButton();
    showData();
	showToolbar(functionId, '', '');//Fix for 16900406
	if (!fnPostAuthorizeMain()) return false;//Added for FCUBS_12.0.3_CITI_DEV  //21626678 
    return true;
}

function fnProcessOnlineAuth(screenArgs) {
    processingAction = "ProcessOnlineAuth";
    dbStrRootTableName = dataSrcLocationArray[0];
    resetDOM();
    createDOM(dbStrRootTableName);
    var onlineAuthReqXml = screenArgs['REQDOM'];
    setNodeText(selectSingleNode(onlineAuthReqXml, "//FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"), "EXECUTEQUERY");
    fcjResponseDOM = fnPost(onlineAuthReqXml, servletURL, functionId);
    var msgStatus = fnProcessResponse();
    fnPostProcessResponse(msgStatus);
}

/* ExtSubSys.js funstions Start [SubSystem Functions]********/
var subSysDpndFldValues = new Array();
var statusStrPickUpSubSystem = "";
var prevStatusStrPickUpSubSystem = "";
var ActionCodePickUpSubSystem = "";
var v_scrNamePickUpSubSystem = "";
var v_functionIDPickUpSubSystem = "";
var scrArgsLength = 0;

function fnPickUpSubSystem(subsys, v_scrName, v_functionID, screenArgs) {
    inDate = setActionTime();
    scrArgsLength = 0;
    for (var i in screenArgs) {
        scrArgsLength = i;
    }
    try {
		//25882825 changes. added if not and return false
		 if (!fnEventsHandlerSubScreen('fnPrePickUpSubSystem', v_scrName, v_functionID, screenArgs))
			return false; 
    } catch (e) {}
    processingAction = "PickUpSubSystem";
    var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
    var prevStatusStr = statusStr;
    fnCheckSubSysValues(statusStr);
    statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
    appendData();
    subSystemDOM = loadXMLDoc(getXMLString(dbDataDOM));
    //FCUBS_143_CTBC_30384260 starts
    var dbDataStr = getXMLString(dbDataDOM);
    if ((dbDataStr.indexOf('^') !=  - 1) || (dbDataStr.indexOf('~') !=  - 1)) {
    mask();
    isResponseProcessed = true;
    showAlerts(fnBuildAlertXML('FC-MAINT03', 'E'), 'E');
    alertAction = "UNMASK";
    return false;
    }
    //FCUBS_143_CTBC_30384260 ends	
    if (typeof (tabDom) != "undefined" && tabDom != null && getXMLString(tabDom) != getXMLString(dbDataDOM)) {
        fnSetTabSubSystem();
        statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
        appendData();
        tabDom = null;
    }
    var stat = extractSubSysStat(statusStr, subsys);
    if (gAction != "" && gAction != "EXECUTEQUERY") {
        if ((stat != 'U') && (stat != 'S')) {
            fnGoToServerForSubSystem(subsys, statusStr, prevStatusStr, v_scrName, v_functionID);
            //fnpostAction('processingAction_'+gAction);
        } else {
            if (scrArgsLength != 0) fnPostSubScreenMain(v_scrName, v_functionID);
        }
    } else {
        if (scrArgsLength != 0) fnPostSubScreenMain(v_scrName, v_functionID);
    }
	/*SFR#17187896 retroed Fix for 17176227*/
	if (v_scrName == "" && v_functionID == "") {
      try{
       fnEventsHandlerSubScreen('fnPostPickUpSubSystem', subsys, v_functionID, screenArgs);
      }catch(e){}
    }
}

function fnCheckSubSysValues(statusStr) {
    var subSystemStr = statusStr.split(';');
    for (var i = 0; i < subSystemStr.length; i++) {
        if (subSystemStr[i] != "") {
            var subSystemFuncId = subSystemStr[i].split(":")[0];
            if (typeof (subSysDpndFldValues[subSystemFuncId]) != "undefined" && subSysDpndFldValues[subSystemFuncId] != "") {
                var subSysData = subSysDpndFldValues[subSystemFuncId].split('SPDEPSYSVAL'); //fix for 14765880
                for (var j = 0; j < subSysData.length; j++) {
                    var field = subSysData[j].split("~")[0];
                    var value = subSysData[j].split("~")[1];
                    if (document.getElementById(field).value != value) {
                        statusStr = statusStr.replace(subSystemFuncId + ':U', subSystemFuncId + ':R');
                        statusStr = statusStr.replace(subSystemFuncId + ':S', subSystemFuncId + ':R');
                        document.getElementsByName('SUBSYSSTAT')[0].value = statusStr;
                        fnSetDependentServices(subSystemFuncId, statusStr);
                    }
                }
            }
        }
    }
}

function fnSetDependentServices(masterFuncId, statusStr) {
    var subSystemStr = statusStr.split(';');
    for (var i = 0; i < subSystemStr.length; i++) {
        if (subSystemStr[i] != "") {
            var subSystemFuncId = subSystemStr[i].split(":")[0];
            if (typeof (dpndntOnSrvs[subSystemFuncId]) != "undefined" && dpndntOnSrvs[subSystemFuncId] != "") {
                var parentSubSystem = dpndntOnSrvs[subSystemFuncId].split("~");
                for (var j = 0; j < parentSubSystem.length; j++) {
                    if (parentSubSystem[j] == masterFuncId) {
                        statusStr = statusStr.replace(subSystemFuncId + ':U', subSystemFuncId + ':R');
                        statusStr = statusStr.replace(subSystemFuncId + ':S', subSystemFuncId + ':R');
                        document.getElementsByName('SUBSYSSTAT')[0].value = statusStr;
                        fnSetDependentServices(subSystemFuncId, statusStr);
                    }
                }
            }
        }
    }
}

function extractSubSysStat(statusStr, subsys) {
    var start = statusStr.indexOf(subsys + ':');
    if (start == -1) return 'D';
    return statusStr.substr(start + subsys.length + 1, 1);
}

function fnGoToServerForSubSystem(subsys, statusStr, prevStatusStr, v_scrName, v_functionID) {
    var ActionCode = gAction;
    gAction = "SUBSYSPKP_" + gAction;
    try {
        fcjRequestDOM = buildUBSXml();
    } catch (e) {
        debugs("Failed in buildUBSXml", "");
    }
    try {
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
         /*var respTxt = getXMLString(fcjResponseDOM);
          if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
                appendDebug(fcjResponseDOM);
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                fcjResponseDOM = loadXMLDoc(respTxt);
          }*/
    } catch (e) {
        debugs("Failed in fnpost", "");
    }
    var msgStatus = fnProcessResponse();
    statusStrPickUpSubSystem = statusStr;
    prevStatusStrPickUpSubSystem = prevStatusStr;
    ActionCodePickUpSubSystem = ActionCode;
    v_scrNamePickUpSubSystem = v_scrName;
    v_functionIDPickUpSubSystem = v_functionID;
    fnPostGoToServerForSubSystem(msgStatus);
}

function fnPostGoToServerForSubSystem(msgStatus) {
    if (msgStatus == "SUCCESS") {
        fnPopulateSubSystemValues(statusStrPickUpSubSystem);
        gAction = ActionCodePickUpSubSystem;
		//Fix for 16174593
        if (scrArgsLength != 0){
			fnPostSubScreenMain(v_scrNamePickUpSubSystem, v_functionIDPickUpSubSystem);
			processingAction ="";
        //fix for 15956724 starts
		}else {
      tabDom = loadXMLDoc(getXMLString(dbDataDOM)); /*Fix for 18993315*/
			showToolbar(functionId,'','');
		}//fix for 15956724 ends
	} else if (msgStatus == "WARNING") {
        var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP";
        if (fnProcessMsgNode(msgStatus, 'O', l_xPath) == "FAILURE") {
            gAction = ActionCodePickUpSubSystem;

            document.getElementsByName('SUBSYSSTAT')[0].value = prevStatusStrPickUpSubSystem;
            return;
        }
    } else {
        gAction = ActionCodePickUpSubSystem;
        document.getElementsByName('SUBSYSSTAT')[0].value = prevStatusStrPickUpSubSystem;
        return;
    }
}

function fnPopulateSubSystemValues(statusStr) {
  //Fix for 16039960
    for(var i = 0; i < tab_arr.length; i++) {
   if (typeof(tab_arr[i]) != 'undefined'){   //REDWOOD_35030228   
      var tabVisited = tab_arr[i].getAttribute("objvisited");
      if(tabVisited != null && document.getElementById("TBLPage"+tab_arr[i].id)!= null) {
        showTabData(tab_arr[i].id);
      }
    }//REDWOOD_35030228 
    }
     //Fix for 16039960
    var subSystemStr = statusStr.split(';');
    for (var i = 0; i < subSystemStr.length; i++) {
        if (subSystemStr[i] != "") {
            var subSystemFuncId = subSystemStr[i].split(":")[0];
            fnGetSubSystemDependentValues(subSystemFuncId);
        }
    }
}

function fnGetSubSystemDependentValues(subSystemFuncId) {
    var dpndFldValues = "";
    if (typeof (dpndntOnFlds[subSystemFuncId]) != "undefined" && dpndntOnFlds[subSystemFuncId] != "") {
        var fldsArray = dpndntOnFlds[subSystemFuncId].split("~");
		setTimeout(function () { 
        for (var i = 0; i < fldsArray.length; i++) {
	     //Redwood_34999920 Starts
			var blkName = fldsArray[i].replace(/\__.*/,'');
			var isMEBlock = isMultipleEntry(blkName);
			if (isMEBlock=='true'){
				fldsArray[i] = fldsArray[i] + "RC0";
			}
		 //Redwood_34999920 Ends
		 //REDWOOD_36830099 Starts
   if (document.getElementById(fldsArray[i]).value!=null && document.getElementById(fldsArray[i]).getAttribute('dtype') =='DATE' && document.getElementById(fldsArray[i]).getAttribute('DateValue') !=null) //REDWOOD_36886377 
	   {
	    document.getElementById(fldsArray[i]).setAttribute('DateValue',document.getElementById(fldsArray[i]).value);
        var FormatDate = new getFrmtDate(document.getElementById(fldsArray[i]).value, gDateFormatDSO);
        if (FormatDate.isValidDate()) 
		    document.getElementById(fldsArray[i]).value = FormatDate.getShortDate();
	   }
	   //REDWOOD_36830099 Ends
            dpndFldValues += fldsArray[i] + "~" + document.getElementById(fldsArray[i]).value + "SPDEPSYSVAL"; // fix for 14765880 
        }
		},0);
        subSysDpndFldValues[subSystemFuncId] = dpndFldValues.substring(0, dpndFldValues.length - 11);// fix for 14765558 
    }
}

function fnSetTabSubSystem() {
    var args = new Array();
    var temObj = new Object();
    temObj.dbDataDOM = loadXMLDoc(getXMLString(dbDataDOM));
    args['SCREEN_NAME'] = strScreenName;
    args['FUNCTION_ID'] = functionId;
    args['SUBSYS'] = strScreenName + "__" + strCurrentTabId;
    args['RETURN_VALUE'] = temObj;
    subSystemDOM = loadXMLDoc(getXMLString(tabDom));
    fnSetDependentSubSystem(args);
}

function fnSetDependentSubSystem(screenArgs) {
    if (!fnEventsHandlerSubScreen('fnPreDependentSubSys', screenArgs['SCREEN_NAME'], screenArgs['FUNCTION_ID'], screenArgs)) {
        return;
    }
    if (typeof (subSystemDOM) != "undefined" && subSystemDOM != null && getXMLString(subSystemDOM) != getXMLString(screenArgs['RETURN_VALUE'].dbDataDOM)) {
        var subsys = screenArgs['SUBSYS'];
        var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;       
        /* Fix for 16033555 -Commented the below code as subsys contains screenname & tabid*/
        /*if (subsys.indexOf(screenArgs['SCREEN_NAME'] + "__") != -1) {  
            var tab = statusStr.substring(statusStr.indexOf(screenArgs['SCREEN_NAME'] + "__") + (screenArgs['SCREEN_NAME'] + "__").length, statusStr.length).substring(0, statusStr.indexOf(":"));
            statusStr = statusStr.replace(subsys + tab + ':D', subsys + tab + ':U');
            statusStr = statusStr.replace(subsys + tab + ':S', subsys + tab + ':U');
        } else {*/
            statusStr = statusStr.replace(subsys + ':D', subsys + ':U');
            statusStr = statusStr.replace(subsys + ':S', subsys + ':U');
        //}
        document.getElementsByName('SUBSYSSTAT')[0].value = statusStr;
        if (!fnEventsHandlerSubScreen('fnPostDependentSubSys', screenArgs['SCREEN_NAME'], screenArgs['FUNCTION_ID'], screenArgs)) {
            return;
        }
        fnSetDependentServices(subsys, statusStr);
    }
}

function setSubSystemAsChanged(subsys) {
    var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
    if (statusStr.indexOf(subsys + ':') == -1) return;
    statusStr = statusStr.replace(subsys + ':U', subsys + ':D');
    statusStr = statusStr.replace(subsys + ':S', subsys + ':D');
    document.getElementsByName('SUBSYSSTAT')[0].value = statusStr;
}
/* ExtSubSys.js funstions End [SubSystem Functions]********/

/***** ExtValidations.js Functions Start ************************/
var TempStr;
var NewStr;
var OrgLen;
var LastPos;
var StartPos;
var Cnt;
var i;

function findStartPosition() {
    for (i = 0; i < OrgLen; i++) {
        if (TempStr.charAt(i) != ' ') {
            break;
        }
    }
    return (i);
}

function findLastPosition() {
    for (i = OrgLen - 1; i >= 0; i--) {
        if (TempStr.charAt(i) != ' ') {
            break;
        }
    }
    return (i);
}

function findOccurances(AStr, ASearch) {
    var StrLen;
    var SearchLen;
    var noofOccurences;
    var TempOccur;
    var i;
    TempOccur = new String(AStr);
    StrLen = getLength(AStr);
    SearchLen = getLength(ASearch);
    noofOccurences = 0;
    for (i = 0; i < StrLen; i++) {
        if (TempOccur.substring(i, i + SearchLen) == ASearch) {
            noofOccurences += 1;
        }
    }
    return (noofOccurences);
}

function getLength(Astr) {
    TempStr = new String(Astr);
    return (TempStr.length);
}

function stringSplit(AStr, ASplit) {
    return (AStr.split(ASplit));
}

function stringProper(AStr) {
    var StrHold;
    var StrLen;
    var TempStr;
    var Cnt;
    var ValStr;
    StrLen = AStr.length;
    Cnt = 0;
    StrHold = "";
    ValStr = "";
    if (StrLen > 0) {
        for (i = 0; i < StrLen; i++) {
            TempStr = AStr.charAt(i);
            if (TempStr != ' ' && TempStr.length > 0 && Cnt == 0) {
                ValStr = AStr.charAt(i);
                StrHold = StrHold + ValStr.toUpperCase();
                Cnt = 1;
            } else {
                ValStr = AStr.charAt(i);
                StrHold = StrHold + ValStr.toLowerCase();
            }
        }
    }
    return (StrHold)
}

function stringSqueeze(AStr, ARemove) {
    var temp = "";
    var c;
    for (var i = 0; i < AStr.length; i++) {
        c = AStr.charAt(i);
        if (c != ARemove) temp += c;
    }
    return temp;
}

function stringReplace(AStr, strReplaceWhat, strReplaceWith) {
    var strReturnValue = "";
    var strCharacter;
    var intLoop;
    for (intLoop = 0; intLoop < AStr.length; intLoop++) {
        strCharacter = AStr.charAt(intLoop);
        if (strCharacter != strReplaceWhat) {
            strReturnValue += strCharacter;
        } else {
            strReturnValue = strReturnValue + strReplaceWith;
        }
    }
    return strReturnValue;
}

function isNull(AStr) {
    if (getLength(AStr) <= 0) {
        return true;
    } else {
        return false;
    }
}

function isNumeric(ANum) {
    var dotPresent = false;
    if (getLength(trim(ANum)) <= 0) return true;
    if ((ANum.charAt(0) == '-' & ANum.length != 1)) {
        ANum = ANum.substring(1, ANum.length);
    }
    for (i = 0; i < ANum.length; i++) {
        if (ANum.charAt(i) != 0) {
            if (isNaN(ANum.charAt(i)) == true) {//Bug NO 16932456 Changes
                if (!dotPresent) {
                    if (ANum.charAt(i) != '.') {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        if (ANum.charAt(i) == '.') {
            dotPresent = true;
            if (ANum.length == 1) return false;
        }
    }
    return true;
}

function isAlpha(AStr) {
    var inTheStr = "~";
    if (AStr.indexOf(inTheStr) > -1) {
        return false;
    }
    return true;
}

function isAlphaNumeric(AStr) {
    var inTheStr1 = "~";
    var inTheStr2 = "^";//Fix for 16999792
    if ((AStr.indexOf(inTheStr1) > -1) || (AStr.indexOf(inTheStr2) > -1)) {//Fix for 16999792
        return false;
    }
    return true;
}

function isUCAlphaNumeric(AStr) {
    inTheStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    tempChar = "";
    if (getLength(trim(AStr)) <= 0) return true;
    for (i = 0; i < AStr.length; i++) {
        if (AStr.charAt(i) != 0) {
            tempChar = AStr.charAt(i);
            if ((inTheStr.indexOf(tempChar)) < 0) {
                return (false);
            }
        }
    }
    return (true);
}

function isNoEntrySelected() {
    var intSelectedCount = 0;
    for (var iLoop = 0; iLoop < checkBoxValues.length; iLoop++) {
        if (checkBoxValues[iLoop] == "-1") {
            intSelectedCount++;
        }
        if (intSelectedCount >= 1) {
            break;
        }
    }
    if (intSelectedCount == 0) {
        return true;
    } else {
        return false;
    }
}

function isMultipleEntrySelected() {
    var intSelectedCount = 0;
    for (var iLoop = 0; iLoop < checkBoxValues.length; iLoop++) {
        if (checkBoxValues[iLoop] == -1) {
            intSelectedCount++;
        }
        if (intSelectedCount > 1) {
            break;
        }
    }
    if (intSelectedCount > 1) {
        return true;
    } else {
        return false;
    }
}

function isMakerCheckerSame(makerID) {
    if (makerID == mainWin.UserId) return true;
    else return false;
}

function isSelectedEntryAuthorized(authValue) {
    if (authValue == "A") return true;
    else return false;
}

function fnValidateSwiftCode(swiftCode) {
    var validate = true;
    if (!isUCAlphaNumeric(swiftCode)) {
        appendErrorCode('FC-MAINT18', "SWIFT Code");
        validate = false;
    }
    if (getLength(swiftCode) != 8 && getLength(swiftCode) != 11) {
        appendErrorCode('FC-MAINT25', null);
        validate = false;
    }
    return validate;
}

function isNegative(ANum) {
    var dotPresent = false;
    if (getLength(trim(ANum)) <= 0) return true
    if ((ANum.charAt(0) == '-' & ANum.length != 1)) {
        ANum = ANum.substring(1, ANum.length);
    } else {
        return (false);
    }
    for (var i = 0; i < ANum.length; i++) {
        if (ANum.charAt(i) != 0) {
            if (isNaN(ANum.charAt(i)) == true) {//Bug NO 16932456 Changes
                if (!dotPresent) {
                    if (ANum.charAt(i) != '.') {
                        return (false)
                    }
                } else {
                    return (false);
                }
            }
        }
        if (ANum.charAt(i) == '.') {
            dotPresent = true;
        }
    }
    return (true)
}

function isPositive(ANum) {
    var dotPresent = false;
    if (getLength(trim(ANum)) <= 0) return true
    for (var i = 0; i < ANum.length; i++) {
        if (ANum.charAt(i) != 0) {
            if (isNaN(ANum.charAt(i)) == true) {//Bug NO 16932456 Changes
                if (!dotPresent) {
                    if (ANum.charAt(i) != '.') {
                        return (false)
                    }
                } else {
                    return (false);
                }
            }
        }
        if (ANum.charAt(i) == '.') {
            dotPresent = true;
        }
    }
    return (true)
}

function isInteger(ANum) {
    if (getLength(trim(ANum)) <= 0) return true;
    if ((ANum.charAt(0) == '-' & ANum.length != 1)) {
        ANum = ANum.substring(1, ANum.length);
    }
    for (i = 0; i < ANum.length; i++) {
        if (ANum.charAt(i) != 0) {
           if (isNaN(ANum.charAt(i)) == true) {//Bug NO 16932456 Changes
                return false;
            }
        }
    }
    return true;
}

/***** ExtValidations.js Functions End************************/

// The following code has been copied from ExtensibleEvnt.js for performance tuning
function fnEventsHandler(eventName, arg) {
    if (!fnEventsHandler_funcOrigin(eventName, arg)) return false;
    if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
        if (!fnEventsHandler_Child_funcOrigin(eventName, arg)) return false;
    }
    return true;
}
function fnEventsHandlerKey(eventName, arg,evnt) { //21311632
    if (!fnEventsHandlerKey_funcOrigin(eventName, arg,evnt)) return false;
    if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
        if (!fnEventsHandlerKey_Child_funcOrigin(eventName, arg,evnt)) return false;
    }
    return true;
}

function fnEventsHandlerSubScreen(eventName, v_scrName, v_functionID, screenArgs) {
    var childParentFunction = ArrPrntFunc[v_functionID];
    if (!fnEventsHandlerSubScreen_funcOrigin(eventName,screenArgs,v_scrName)) return false;
    if (childParentFunction != "") {
        if (!fnEventsHandlerSubScreen_Child_funcOrigin(eventName,screenArgs,v_scrName)) return false;
    }
    return true;
}

function fnTabEventsHandler(eventName) {
    return fnEventsHandler(eventName);
}

function fnEventsHandler_funcOrigin(eventName, arg) {
    try {
        var fnEval = new Function("arg","return " + eventName + "_KERNEL(arg);");  
        if (!fnEval(arg)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg","return " + eventName + "_CLUSTER(arg);");  
        if (!fnEval(arg)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg","return " + eventName + "_CUSTOM(arg);");  
        if (!fnEval(arg)) {
            return false;
        }
    } catch (e) {}
    return true;
}

function fnEventsHandler_Child_funcOrigin(eventName, arg) {
    try {
        var fnEval = new Function("arg","return " + eventName + "_Child_KERNEL(arg);");  
        if (!fnEval(arg)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg","return " + eventName + "_Child_CLUSTER(arg);");  
        if (!fnEval(arg)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg","return " + eventName + "_Child_CUSTOM(arg);");  
        if (!fnEval(arg)) {
            return false;
        }
    } catch (e) {}
    return true;
}

function fnEventsHandlerKey_funcOrigin(eventName, arg,evnt) { //21311632 starts
    try {
        var fnEval = new Function("arg,evnt","return " + eventName + "_KERNEL(arg,evnt);");  
        if (!fnEval(arg,evnt)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg,evnt","return " + eventName + "_CLUSTER(arg,evnt);");  
        if (!fnEval(arg,evnt)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg,evnt","return " + eventName + "_CUSTOM(arg,evnt);");  
        if (!fnEval(arg,evnt)) {
            return false;
        }
    } catch (e) {}
    return true;
}

function fnEventsHandlerKey_Child_funcOrigin(eventName, arg,evnt) {
    try {
        var fnEval = new Function("arg,evnt","return " + eventName + "_Child_KERNEL(arg,evnt);");  
        if (!fnEval(arg,evnt)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg,evnt","return " + eventName + "_Child_CLUSTER(arg,evnt);");  
        if (!fnEval(arg,evnt)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("arg,evnt","return " + eventName + "_Child_CUSTOM(arg,evnt);");  
        if (!fnEval(arg,evnt)) {
            return false;
        }
    } catch (e) {}
    return true;
}
//21311632 ends


function fnEventsHandlerSubScreen_funcOrigin(eventName, screenArgs, v_scrName) {
    try {
        var fnEval = new Function("screenArgs","return " + eventName + "_" + v_scrName + "_KERNEL(screenArgs);");  
        if (!fnEval(screenArgs)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("screenArgs","return " + eventName + "_" + v_scrName + "_CLUSTER(screenArgs);");  
        if (!fnEval(screenArgs)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("screenArgs","return " + eventName + "_" + v_scrName + "_CUSTOM(screenArgs);");  
        if (!fnEval(screenArgs)) {
            return false;
        }
    } catch (e) {}
    return true;
}

function fnEventsHandlerSubScreen_Child_funcOrigin(eventName, screenArgs, v_scrName) {
    try {
        var fnEval = new Function("screenArgs","return " + eventName + "_" + v_scrName + "_Child_KERNEL(screenArgs);");  
        if (!fnEval(screenArgs)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("screenArgs","return " + eventName + "_" + v_scrName + "_Child_CLUSTER(screenArgs);");  
        if (!fnEval(screenArgs)) {
            return false;
        }
    } catch (e) {}
    try {
        var fnEval = new Function("screenArgs","return " + eventName + "_" + v_scrName + "_Child_CUSTOM(screenArgs);");  
        if (!fnEval(screenArgs)) {
            return false;
        }
    } catch (e) {}
    return true;
}

function fnProcessResponseLock() {
    debugs("FunctionId=", functionId);

    if (fcjResponseDOM != null) {
        if (selectNodes(fcjResponseDOM, "//SESSION").length > 0) {
            fnprocessExpire();
            return;
        }
        if(getXMLString(fcjResponseDOM).indexOf("FC-MAINT53")>-1){
                mask();
                showAlerts(fnBuildAlertXML('FC-MAINT53', 'E'), 'E'); 
                alertAction = "UNMASK";
                responseDOM = "";
                return ;
        }
        var l_MsgStatNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
        if (!l_MsgStatNode) {
            mask();
            showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
            alertAction = "UNMASK";
            return false;
        } else {
            l_msgStat = getNodeText(l_MsgStatNode);
            if (l_msgStat == 'SUCCESS') {
                return true;
            } else {
                var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP";
                fnProcessMsgNode(l_msgStat, 'E', l_xPath);
                return false;
            }
        }
    } else {
        showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
        alertAction = "UNMASK";
        window.focus();
        return false;
    }

    return true;
}

//OBIEE changes
function fnShowObieeSubScr(screenArgs){
    var funcOrigin = screenArgs['FUNC_ORIGIN'];
    var prntFunc = screenArgs['PRNT_FUNC'];
    var prntOrigin = screenArgs['PRNT_ORIGIN'];
    var scrType = mainWin.gActiveWindow.screenType;
    var params = "scr=" + screenArgs['SCREEN_NAME'] +"&";
    params += "&SourceCode=" + "FLEXCUBE" + "&";
    params += "functionId=" + screenArgs['FUNCTION_ID'] + "&";
    params += "parentFunc=" + functionId + "&";
    params += "lang=" + screenArgs['LANG'] + "&";
    params += "title=" + screenArgs['TITLE'] + "&";
    params += "funcOrigin=" + funcOrigin + "&";
    params += "prntFunc=" + prntFunc + "&";
    params += "prntOrigin=" + prntOrigin + "&";
    params += "scrType=" + scrType + "&";
    params += "paramOp=" + screenArgs['OBIEE_PARAM_URL'];
    loadSubScreenDIV("ChildWin","OBIEELauncherSubScreen.jsp?"+params+"&actionType=subscr");
}
//OBIEE changes