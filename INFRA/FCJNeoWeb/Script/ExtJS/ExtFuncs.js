/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtFuncs.js
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
Copyright © 2004-2015   by Oracle Financial Services Software Limited..

**  Modified By           : Shayam Sundar Ragunathan
**  Modified On           : 28-Jun-2018
**  Modified Description  : CD MODULE - WRONG SCHEDULE CALCULATION FOR CD CONTRACTS 
                            While modifying the contract the schedules details screen is not displaying properly when we click on Explode button.
**  Search string         : 9NT1606_14_1_RETRO_12_3_28176132
**
**	Modified By		: Ambika S
**	Modified On		: 29-JUNE-2018
**	Modified Reason	: Changes provided in the unit ExtFunc.js to ensure user will be able to view 
                      the details using the single view button on unlock of existing contract 
**  Search String	: 9NT1606_14_1_RETRO_12_3_28176214 
********************************************************************************************
*/
// added for Amount/Exchange Rate patterns starts
/*function fnSetActionTime() {
    inDate = setActionTime();
}*/
/*function fnUdateStatus(action,tmpFCJRespDOM)  {
    fnpostAction(action,tmpFCJRespDOM);
}*/	  
//REDWOOD_CHANGES
function getElementsByOjName(name, parentWin, blkId, rowNum ) {
    if(parentWin)
    {
        var elements = [...parentWin.document.getElementsByName(name)];
        return elements.filter(elem=>elem.tagName.substr(0,2) == 'OJ');
    }
    if(!blkId)
    {
        var elements = [...document.getElementsByName(name)];
        return elements.filter(elem=>elem.tagName.substr(0,2) == 'OJ');
    }
    else
    {
        var ojElems;
        var ojTagsArr = ['OJ-INPUT-TEXT',  'OJ-INPUT-DATE', 'OJ-INPUT-NUMBER', 'OJ-SELECT-SINGLE', 'OJ-SWITCH', 'OJ-INPUT-DATE-TIME', 'OJ-INPUT-PASSWORD', 'OJ-RADIOSET'];
        var row = getTableObjForBlock(blkId).tBodies[0].rows[rowNum];
        for (var i=0; i<ojTagsArr.length; i++ ) {
            ojElems = [...row.getElementsByTagName(ojTagsArr[i])].filter(elem => elem.getAttribute("name") == name);
            if (ojElems.length > 0) return ojElems;
        }
    }
}


function getOjMeDataObject(blockName){
        //return meArrayForAddDelete[blockName]();
      return Object.assign({}, meArrayForAddDelete[blockName]());
}
//REDWOOD_CHANGES
function processFields(e, srcElement) {
    var previousAction = gAction;
    var event = window.event || e;
    gAction = "COMPUTEAMT";
    //Fix for 16926220 starts
    if (!fnEventsHandler('fnPreProcessFields')) {
        gAction = previousAction;
        return false;
    }//Fix for 16926220 ends
    var curInpElem = "";
    if (typeof (srcElement) != "undefined")
        curInpElem = srcElement;
    else 
        curInpElem = getEventSourceElement(event);
		
    var rtypes = curInpElem.getAttribute("RTYPES");
    var rnames = curInpElem.getAttribute("RNAMES");
    
    var rtypeArr = rtypes.split("~");
    var rnamesArr = rnames.split("~");

    for (var i = 0;i < rtypeArr.length;i++) {
        if (rtypeArr[i] == "I") {
            var rfieldObj = document.getElementById(rnamesArr[i]);
            if (rfieldObj.value == "") {
                //alert("Values are not maintained");
                gAction = previousAction;
                return;
            }
        }
        else if (rtypeArr[i] == "O") {
            document.getElementById(rnamesArr[i]).value = "";
        }
    }
    appendData();
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));    
    fnPostAndProcessReq(orgDom,previousAction);
    gAction = previousAction;
    fnEventsHandler('fnPostProcessFields');
}
// added for Amount/Exchange Rate patterns ends

function fnPostAndProcessReq(orgDom,previousAction) {
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var msgStatus = fnProcessResponse();
    if (msgStatus == "FAILURE") {
        gAction = previousAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        return false;
    }
}

function getCurrentRowOfBlock(v_block) {
    var tblObj = getTableObjForBlock(v_block);
    var currPage = Number(getInnerText(document.getElementById("CurrPage__" + v_block))) - 1;
    var pgSize = Number(tblObj.getAttribute("pgsize"));
    var rowNum = dbIndexArray[v_block] - (currPage * pgSize);
    return rowNum;
}

function getCurrentRowData(v_block) {
    var rowIndex = getCurrentRowOfBlock(v_block);
    var tblObj = getTableObjForBlock(v_block);
    var trObj = tblObj.tBodies[0].rows[rowIndex - 1];
    var str = "";
    for (var i = 0;i < trObj.cells.length-1;++i) {  //Fix for 23195933 Starts
        var cellElement = trObj.cells[i].childNodes[0].childNodes[0];
		if(cellElement.nodeType == '3')
			cellElement = trObj.cells[i].childNodes[0].childNodes[2];
		else
			cellElement = trObj.cells[i].childNodes[0].childNodes[1];
        if (typeof (cellElement) == 'undefined') {
            cellElement = trObj.cells[i].childNodes[0].childNodes[0].childNodes[1];//Fix for 23195933 ends
        }
        var type = cellElement.type.toUpperCase();
        var tagName = cellElement.tagName.toUpperCase();
        if ((tagName == "INPUT" && (type == "TEXT" || type == "HIDDEN" || (type == "CHECKBOX" && cellElement.getAttribute("name") != "chkDeleteRow") || type == "TEXTAREA")) || tagName == "TEXTAREA") {//Fix for 23195933
            str += "~" + cellElement.value;
        }
    }
    if (str.length > 0) {
        str = str.substring(1);
    }
    return str;
}

function fnClassDefault(blockId) {
    inDate = setActionTime();
    var g_prev_gAction = gAction;
    gAction = "DEFAULT";
    if (!fnEventsHandlerSubScreen('fnPreClassDefault', scrName, functionId, ''))
        return;
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
     /*var respTxt = getXMLString(fcjResponseDOM);
      if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
            appendDebug(fcjResponseDOM);
            var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
            var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
            respTxt = start + end;
            fcjResponseDOM = loadXMLDoc(respTxt);
      }*/
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
    if (!fnProcessResponse()) {
        gAction = g_prev_gAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        //fnpostAction('DEFAULT');
        return false;
    }
    if (dbDataDOM.documentElement.nodeName != dataSrcLocationArray[0]) {
		//orgDom.selectNodes("//"+blockId).removeAll();
		//Fix for 18311641 Starts 
        /* var removeNode = selectNodes(orgDom, "//" + blockId);
        for (var i = 0;i < removeNode.length;i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        } 
        orgDom.documentElement.appendChild(getCloneDocElement(dbDataDOM.documentElement)); */
		var removeNode = selectNodes(orgDom, getXPathQuery(blockId));  
        for (var i = 0; i < removeNode.length; i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        var parentNode = relationArray[dbDataDOM.documentElement.nodeName]; 
        if(parentNode.indexOf("~") == -1){            
            orgDom.documentElement.appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }else{
            var parentNodename =parentNode.substring(0,parentNode.indexOf("~"));
            var xpathquery = getXPathQuery(parentNodename) ;
            xpathquery = xpathquery + "[@ID=" + dbIndexArray[parentNodename] + "]";            
            selectSingleNode(orgDom,xpathquery).appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }
        //Fix for 18311641 Ends
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        showData();
    }
    gAction = g_prev_gAction;
    //fnpostAction('DEFAULT');
    if (!fnEventsHandlerSubScreen('fnPostClassDefault', scrName, functionId, ''))
        return;
}

function fnClearExtAuditFields() {

    if (document.getElementsByName("MAKER")[0])
        document.getElementsByName("MAKER")[0].value = "";

    if (document.getElementsByName("CHECKER")[0])
        document.getElementsByName("CHECKER")[0].value = "";

    //fix for 16169257 starts
    if (document.getElementsByName("MAKERSTAMP")[0]) {
        document.getElementsByName("MAKERSTAMP")[0].value = "";
        //fix for 14766103 starts
        if (getOuterHTML(document.getElementsByName("MAKERSTAMP")[0]).indexOf("onpropertychange") !=  - 1)
            fireHTMLEvent(document.getElementsByName("MAKERSTAMP")[0], "onpropertychange");
    }
    if (document.getElementsByName("CHECKERSTAMP")[0]) {
        document.getElementsByName("CHECKERSTAMP")[0].value = "";
        if (getOuterHTML(document.getElementsByName("CHECKERSTAMP")[0]).indexOf("onpropertychange") !=  - 1)
            fireHTMLEvent(document.getElementsByName("CHECKERSTAMP")[0], "onpropertychange");
    }
    //fix for 16169257 ends
    if (document.getElementsByName("MODNO")[0]) {
        if (gAction == "MODIFY" || gAction == "CLOSE" || gAction == "REOPEN")
            document.getElementsByName("MODNO")[0].value = Number(document.getElementsByName("MODNO")[0].value) + 1;
        else 
            document.getElementsByName("MODNO")[0].value = null; //REDWOOD_CHANGES
        if (getOuterHTML(document.getElementsByName("MODNO")[0]).indexOf("onpropertychange") !=  - 1)
            fireHTMLEvent(document.getElementsByName("MODNO")[0], "onpropertychange");
    }
    if (document.getElementsByName("ONCEAUTH")[0]) {
        if (gAction != "MODIFY") {
            document.getElementsByName("ONCEAUTH")[0].value = "";
        }
    }
    //For Online Screens field Names are different -Temp fix 
    if (document.getElementsByName("CHKR")[0])
        document.getElementsByName("CHKR")[0].value = "";

    if (document.getElementsByName("MAKDTTIME")[0]) {
        document.getElementsByName("MAKDTTIME")[0].value = null;  //REDWOOD_CHANGES
        if (getOuterHTML(document.getElementsByName("MAKDTTIME")[0]).indexOf("onpropertychange") !=  - 1)
            fireHTMLEvent(document.getElementsByName("MAKDTTIME")[0], "onpropertychange");
    }
    if (document.getElementsByName("CHKDTTIME")[0]) {
        document.getElementsByName("CHKDTTIME")[0].value = null; //REDWOOD_CHANGES
        if (getOuterHTML(document.getElementsByName("CHKDTTIME")[0]).indexOf("onpropertychange") !=  - 1)
            fireHTMLEvent(document.getElementsByName("CHKDTTIME")[0], "onpropertychange");
    }
    //fix for 14766103 ends
    if (document.getElementsByName("AUTHSTAT")[0]) {
        if (screenType == 'O') {
            if (document.getElementsByName("AUTHSTAT")[0].getAttribute("ROSELECT")) {
                var optLen = document.getElementsByName("AUTHSTAT")[0].options.length;
                for (var i = 0;i < optLen;i++) {
                    if (document.getElementsByName("AUTHSTAT")[0].options[i].value == "U")
                        document.getElementsByName("AUTHSTATI")[0].value = getInnerText(document.getElementsByName("AUTHSTAT")[0].options[i]);
                }
                document.getElementsByName("AUTHSTAT")[0].value = "U";
            }
            else {
                document.getElementsByName("AUTHSTAT")[0].checked = false;
            }
        }
        else {
            if (document.getElementsByName("AUTHSTAT")[0].getAttribute("ROSELECT")) {
                document.getElementsByName("AUTHSTAT")[0].value = "";
                document.getElementsByName("AUTHSTATI")[0].value = "";
            }
            else {
                document.getElementsByName("AUTHSTAT")[0].checked = false;
            }
        }
    }
    if (document.getElementsByName("TXNSTAT")[0]) {
        if (gAction == "MODIFY")
            return;
        if (screenType == 'O') {
            if (document.getElementsByName("TXNSTAT")[0].getAttribute("ROSELECT")) {
                document.getElementsByName("TXNSTATI")[0].value = "";
            }
            else {
                document.getElementsByName("TXNSTAT")[0].checked = true;
            }
        }
        else {
            if (document.getElementsByName("TXNSTAT")[0].getAttribute("ROSELECT")) {
                document.getElementsByName("TXNSTAT")[0].value = "";
                document.getElementsByName("TXNSTATI")[0].value = "";
            }
            else {
                document.getElementsByName("TXNSTAT")[0].checked = true;
            }
        }
    }
}
function fnEnableorDisableElement(flag,object) {
    if(flag) {
        fnEnableElement(object);
    }else {
        fnDisableElement(object);
    }
}
function fnEnableMEBlock(blockId, flag) {
    var tableObj = getTableObjForBlock(blockId);
    if (tableObj) {
        var rowObj = tableObj.tBodies[0].rows;
        for (var row = 0; row < getOjTableRowsLength(blockId); row++) { //REDWOOD_CHANGES
            for (var cell = 1; cell < rowObj[row].cells.length ; cell++) {	//REDWOOD_CHANGES
                var currCellObj = rowObj[row].cells[cell];
                    //fix for 21304627 start	   
  //REDWOOD_CHANGES
                    /*
                    if (currCellObj.children[0].children[1] && currCellObj.children[0].children[1].type != undefined && currCellObj.children[0].children[1].tagName != 'LABEL') { //9NT1606_14_1_RETRO_12_3_28176132 added and condition.
                        fnEnableorDisableElement(flag,currCellObj.children[0].children[1]);
                        var indexDate = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayDate");
                        var indexAmount = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayAmount");
                        var indexNumber = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayFormattedNumber");
                        if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                            fnEnableorDisableElement(flag,getNextSibling(currCellObj.children[0].children[3]));
                        }
                    } else {
                        if (currCellObj.children[0].children[0].children[0]&& currCellObj.children[0].children[0].children[0].type != undefined) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0].children[0]);
                        } //cldaccvm_development changes
                        else if (currCellObj.children[0].children[0].children[1]&& currCellObj.children[0].children[0].children[1].type != undefined) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0].children[1]);
                        } else if(currCellObj.children[0].children[0].children[0] && currCellObj.children[0].children[0].children[0].children[1]&& currCellObj.children[0].children[0].children[0].children[1].type != undefined) {//Fix for 21415398 
                           fnEnableorDisableElement(flag,currCellObj.children[0].children[0].children[0].children[1]);
                        } else { //cldaccvm_development changes
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0]);
                        }
                        if(!flag)
                            fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + blockId)[0]);
                    }
                    */
                     if (currCellObj.children[0].children[0].children[0]&& currCellObj.children[0].children[0].children[0].type != undefined) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0].children[0]);
                        } //cldaccvm_development changes
                        else if (currCellObj.children[0].children[0].children[1]&& currCellObj.children[0].children[0].children[1].type != undefined) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0].children[1]);
                        } else if(currCellObj.children[0].children[0].children[0] && currCellObj.children[0].children[0].children[0].children[1]&& currCellObj.children[0].children[0].children[0].children[1].type != undefined) {//Fix for 21415398 
                           fnEnableorDisableElement(flag,currCellObj.children[0].children[0].children[0].children[1]);
                        } else { //cldaccvm_development changes
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0]);
                        }
                        if(!flag)
                            fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + blockId)[0]);
 //REDWOOD_CHANGES
                    //Fix for 21304627 end
            }
		}//Fix for 21575189 Starts
            fnEnableorDisableElement(flag,document.getElementsByName("cmdAddRow_" + blockId)[0]);
            fnEnableorDisableElement(flag,document.getElementsByName("cmdDelRow_" + blockId)[0]);
			fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + blockId)[0]); //9NT1606_14_1_RETRO_12_3_28176214
            fnEnableorDisableElement(flag,document.getElementById(blockId + "Header_CHK_ME"));//Static Header change
        //} //Fix for 21575189 Ends
    }
}

function fnEnableMEField(blockId, fldName, flag) {
    var tableObj = getTableObjForBlock(blockId);
    if (tableObj) {
        var rowObj = tableObj.tBodies[0].rows;
        for (var row = 0;row < rowObj.length;row++) {
            for (var cell = 0;cell < rowObj[row].cells.length - 1;cell++) {
                var currCellObj = rowObj[row].cells[cell];
                //fix for 21304627 start
        if (currCellObj.children[0].children[1] && currCellObj.children[0].children[1].type != undefined && currCellObj.children[0].children[1].tagName != 'LABEL') { //9NT1606_14_1_RETRO_12_3_28176132 added and condition.
                    if (currCellObj.children[0].children[1].name == fldName || currCellObj.children[0].children[1].name + "I" == fldName) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[1]);
                            var indexDate = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayDate");
                            var indexAmount = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayAmount");
                            var indexNumber = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayFormattedNumber");
                            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                                fnEnableorDisableElement(flag,currCellObj.children[0].children[3]);
                            }
                            break;
                    }
                /*} else if (currCellObj.children[0].children[1]) {//for multiple entry cases only 20850099  
                    if (currCellObj.children[0].children[1].name == fldName || currCellObj.children[0].children[1].name + "I" == fldName) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[1]);
                            var indexDate = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayDate");
                            var indexAmount = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayAmount");
                            var indexNumber = getOuterHTML(currCellObj.children[0].children[1]).indexOf("displayFormattedNumber");
                            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                                fnEnableorDisableElement(flag,currCellObj.children[0].children[3]);
                            }
                            break;
                    }*/
                }
                else {
                    if (currCellObj.children[0].children[0].children[0] && currCellObj.children[0].children[0].children[0].type != undefined) { //Fix for bug 17816582
                        if (currCellObj.children[0].children[0].children[0].name == fldName) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0].children[0]);
                            break;
                        }
                    } else {
                        if (currCellObj.children[0].children[0].name == fldName) {
                            fnEnableorDisableElement(flag,currCellObj.children[0].children[0]);
                            break;
                        } else if(currCellObj.children[0].children[0].tagName == 'LABEL'){ //Fix for 17580593  start
                              if (currCellObj.children[0].children[0].children[1].name == fldName && flag) {
                                  fnEnableElement(currCellObj.children[0].children[0].children[1]);
                                  break;
                               }
                        }//Fix for 17580593 end
                    }
                }//fix for 21304627 end
            }
        }
    }
}

function fnEnableButtonsForTab(flag) {
    var fldSetObj = document.getElementById("TBLPage" + strCurrentTabId).getElementsByTagName("fieldset");
    for (var i = 0;i < fldSetObj.length;i++) {
        if (fldSetObj[i].type != "ME" || fldSetObj[i].getAttribute("view") != "ME") {
            var btnElem = fldSetObj[i].getElementsByTagName("BUTTON");
            for (var j = 0;j < btnElem.length;j++) {
                if (btnElem[j].name.indexOf("BTN_ADD_") ==  - 1 && btnElem[j].name.indexOf("BTN_REMOVE_") ==  - 1) {
                    fnEnableorDisableElement(flag,btnElem[j]);
                }
            }
        }
    }
}

//version fieldset changes starts
function fnEnableVerFldSet() {
    if (document.getElementById("DIVVerisonBtns")) {
        if(gAction == 'NEW' || gAction == 'COPY' || gAction == ''){
            document.getElementById("Goto_version").readOnly = true;
            document.getElementById("Goto_version").className = "TXTro";
            document.getElementsByName("BTN_GO_VER")[0].className = "BTNtextD";
            document.getElementsByName("BTN_GO_VER")[0].disabled = true;
            fnDisableVerFldEle(document.getElementsByName("BTN_FIRST_VER")[0]);
            fnDisableVerFldEle(document.getElementsByName("BTN_NEXT_VER")[0]);
            fnDisableVerFldEle(document.getElementsByName("BTN_LAST_VER")[0]);
            fnDisableVerFldEle(document.getElementsByName("BTN_PREV_VER")[0]);
        } else {  
        
            var currverno = Number(document.getElementsByName("VERNO")[0].value);
            var lastverno = Number(document.getElementsByName("LASTVERNO")[0].value);
            if (lastverno != 1) {
                var gotoVal = document.getElementById("Goto_version").value;
                document.getElementById("Goto_version").readOnly = false;
                document.getElementById("Goto_version").className = "TXTstd";
                document.getElementsByName("BTN_GO_VER")[0].className = "BTNtext";
                document.getElementsByName("BTN_GO_VER")[0].disabled = false;
            }
            if (currverno == 1 && lastverno > 1) {
                fnEnableVerFldEle(document.getElementsByName("BTN_NEXT_VER")[0]);
                fnEnableVerFldEle(document.getElementsByName("BTN_LAST_VER")[0]);
                fnDisableVerFldEle(document.getElementsByName("BTN_FIRST_VER")[0]);
                fnDisableVerFldEle(document.getElementsByName("BTN_PREV_VER")[0]);
            
            } else if (lastverno > 1 && currverno == lastverno) {
                fnEnableVerFldEle(document.getElementsByName("BTN_FIRST_VER")[0]);
                fnEnableVerFldEle(document.getElementsByName("BTN_PREV_VER")[0]);
                fnDisableVerFldEle(document.getElementsByName("BTN_NEXT_VER")[0]);
                fnDisableVerFldEle(document.getElementsByName("BTN_LAST_VER")[0]);
            }
            if (currverno > 1 && currverno < lastverno) {
                fnEnableVerFldEle(document.getElementsByName("BTN_FIRST_VER")[0]);
                fnEnableVerFldEle(document.getElementsByName("BTN_PREV_VER")[0]);
                fnEnableVerFldEle(document.getElementsByName("BTN_NEXT_VER")[0]);
                fnEnableVerFldEle(document.getElementsByName("BTN_LAST_VER")[0]);
            }
            if(currverno == 1 && lastverno == 1){
                fnDisableVerFldEle(document.getElementsByName("BTN_FIRST_VER")[0]);
                fnDisableVerFldEle(document.getElementsByName("BTN_PREV_VER")[0]);
                fnDisableVerFldEle(document.getElementsByName("BTN_NEXT_VER")[0]);
                fnDisableVerFldEle(document.getElementsByName("BTN_LAST_VER")[0]);
                document.getElementById("BTN_GO_VER").className = "BTNtextD";
            }
        }
    }    
}

function fnEnableVerFldEle(element){
    element.className = "BTNicon2";
    element.disabled = false;
}

function fnDisableVerFldEle(element){
    element.className = "BTNicon2D";
    element.disabled = true;
}//version fieldset changes ends

function fnChangeVersion(flag) {
    if(gAction == 'NEW' || gAction == 'COPY'){
        document.getElementById("Goto_version").readOnly = false;
        document.getElementById("Goto_version").className = "TXTstd";
        document.getElementsByName("BTN_GO_VER")[0].className = "BTNtext";
        document.getElementsByName("BTN_GO_VER")[0].disabled = false;
        fnDisableVerFldEle(document.getElementsByName("BTN_FIRST_VER")[0]);
        fnDisableVerFldEle(document.getElementsByName("BTN_NEXT_VER")[0]);
        fnEnableVerFldEle(document.getElementsByName("BTN_LAST_VER")[0]);
        fnDisableVerFldEle(document.getElementsByName("BTN_PREV_VER")[0]);
        
    } else {
        var currVer = document.getElementsByName("VERNO")[0];
        var currVersion = Number(document.getElementsByName("VERNO")[0].value);
        var totalVersions = Number(document.getElementsByName("LASTVERNO")[0].value);
        var gotoVal = document.getElementById("Goto_version").value;
        if (!fnEventsHandler('fnPreChangeVersion_' + flag.toUpperCase()))
            return;
        if(flag == "GOTO"){
            if ((isNaN(gotoVal) || gotoVal == '' || gotoVal.indexOf(".") !=  - 1 || gotoVal <= 0 || gotoVal > totalVersions)) {
                alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
                document.getElementById("Goto_version").value = "";
                return;
            }
        } 
    
        if (flag.toUpperCase() == "NEXT") {
            if (currVersion < totalVersions) {
                currVer.value = currVersion + 1;
            }
        }else if (flag.toUpperCase() == "PREVIOUS") {
            if (currVersion > 1) {
                currVer.value = currVersion - 1;
            }
        }else if (flag.toUpperCase() == "FIRST") {
            if (currVersion != 1) {
                currVer.value = 1;
            }
        }else if (flag.toUpperCase() == "LAST") {
            if (currVersion != totalVersions) {
                currVer.value = totalVersions;
            }
        }else if (flag.toUpperCase() == "GOTO") {
            var Gotopage = document.getElementById("Goto_version").value;
            if (totalVersions >= Gotopage && Gotopage > 0 && Gotopage != currVersion) {
                currVer.value = Gotopage;
            }
        }
        appendData();
        var prevAction = gAction;
        gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
        gAction = prevAction;
        fnEventsHandler('fnPostChangeVersion_' + flag.toUpperCase());
    }    
}//version fieldset changes ends

function fnProcessAuthOnLoad(screenArgs) {
    inDate = setActionTime();
    //gAction = "AUTHQUERY";
    var fnId = functionId;
    if (!fnEventsHandlerSubScreen('fnPreProcessAuthOnLoad', screenArgs['SCREEN_NAME'], functionId, screenArgs))
        return false;
    //'fnPreLoad', v_scrName, v_functionID, screenArgs
    ExecQ_RequestDOM = screenArgs['REQDOM'];
    ExecQ_ResponseDOM = screenArgs['RESDOM'];
    if (screenArgs["AUTHORIZE_SCREEN_TYPE"] == 'O') {
        resetDOM();
        for (var i = 0;i < pkFields.length;i++) {
            document.getElementById(pkFields[i]).value = screenArgs["ONLINEPKARRAY"][i];
        }
        dbStrRootTableName = dataSrcLocationArray[0];
        createDOM(dbStrRootTableName);

        debugs("calling appendData", "");
        appendData();

        debugs("calling appendData", "");
        
        fcjRequestDOM = buildUBSXml(true);
        
        var fldNode = selectSingleNode(fcjRequestDOM, "//FLD");
        if( fldNode!= null && !(typeof(screenArgs['MASTERFNID'] != 'undefined') && isFLDRequired(screenArgs['MASTERFNID'])))
            selectSingleNode(fcjRequestDOM, "//FCUBS_BODY").removeChild(fldNode);

        debugs("calling fnPost request Message", getXMLString(fcjRequestDOM));
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        debugs("response Messsage received", getXMLString(fcjResponseDOM));
    }
    else {
        var temp_RequestDOM =loadXMLDoc( getXMLString(ExecQ_RequestDOM));
        var fldNode = selectSingleNode(temp_RequestDOM, "//FLD");
        functionId = screenArgs['MASTERFNID'];
        if( fldNode!= null && !(typeof(functionId!= 'undefined') && isFLDRequired(functionId)))
            selectSingleNode(temp_RequestDOM, "//FCUBS_BODY").removeChild(fldNode);
        
        debugs("calling fnPost request Message", getXMLString(ExecQ_RequestDOM));
        fcjResponseDOM = fnPost(temp_RequestDOM, servletURL, functionId);
        debugs("response Messsage received", getXMLString(fcjResponseDOM));
    }
    
    //fnpostAction('AUTHQUERY');
    debugs("Calling fnProcessResponse", "");
    if (!fnProcessResponse())
        return false;

    if (!fnEventsHandlerSubScreen('fnPostProcessAuthOnLoad', screenArgs['SCREEN_NAME'], fnId, screenArgs))
        return false;

    return true;
}
var onlineAuthArgs = new Object();

function fnOnlineAuthorize(subScr, msgGenReqd) {
    //gAction = "AUTH";
    onlineAuthArgs = new Object();
    processingAction = "OnlineAuth";
    if (!fnEventsHandler('fnPreOnlineAuthorize'))
        return false;
    appendData();
    fcjRequestDOM = buildUBSXml(true);
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    onlineAuthArgs.subScr = subScr;
    onlineAuthArgs.msgGenReqd = msgGenReqd;
    var msgStatus = fnProcessResponse();
    fnPostProcessResponse(msgStatus, onlineAuthArgs);
}

function getIEVersionNumber() {//ie11 changes

    var ua = (navigator.userAgent).toUpperCase();
    var MSIEOffset = ua.indexOf("MSIE ");                    
    if (MSIEOffset == -1) {
        if(ua.indexOf("TRIDENT") != -1 && ua.indexOf("RV:")!= -1){
        var rv=ua.indexOf("RV:");
        return parseFloat(ua.substring(rv+3 ,ua.indexOf(")", rv)));
        }
    } else {
        return parseFloat(ua.substring(MSIEOffset + 5, ua.indexOf(";", MSIEOffset)));
    }
}


// Copied from Databinding.js Start
function getParentTableName(tableName) {
    var parentTableName = relationArray[tableName];
    parentTableName = parentTableName.substring(0, parentTableName.length - 2);
    return parentTableName;
}

function getData(tableName, seq) {
    var query = getXPathQuery(tableName);
    var node = selectSingleNode(dbDataDOM, query + "[@ID=" + seq + "]");
    return node;
}
// Copied from Databinding.js End
function fnGetSumRowVals(rowNum, colNum) {
    var sumRowVals = "";
    var RowVals = document.getElementById("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells;
    if (colNum == undefined) {
        for (i = 1;i < RowVals.length;i++) {
            sumRowVals += getInnerText(RowVals[i]) + "~";
            if (i == RowVals.length)
                sumRowVals = sumRowVals.substring(0, sumRowVals.length - 1);
        }
    }
    else {
        sumRowVals = getInnerText(RowVals[colNum]);
    }
    return sumRowVals;
}

function getColVal(columnName) {
    var tblCellObj = document.getElementById("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells;
    var tdLength = tblCellObj.length;
    var requiredTd;
    for (var i = 0;i < tdLength;i++) {
        //Fix for 21389041,22005823 start
		if (tblCellObj[i].name || tblCellObj[i].getAttribute("name")) {
            var cellName = tblCellObj[i].name || tblCellObj[i].getAttribute("name");
            if (columnName.toUpperCase() == cellName.toUpperCase()) {//Fix for 22005823 end
                requiredTd = i;
                break;
            }
        }
    }
    var colVals = getInnerText(tblCellObj[requiredTd]);
    return colVals;
}

/* Code for suppressing eval to be added here. All other methods should be written before this comment*/

function fnPreLoadMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreLoad_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreLoad_KERNEL()) {
                    return false;
                }
                if (!fnPreLoad_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreLoad_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreLoad_KERNEL()) {
                    return false;
                }
                if (!fnPreLoad_CLUSTER()) {
                    return false;
                }
                if (!fnPreLoad_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreLoad_CLUSTER()) {
                    return false;
                }
                if (!fnPreLoad_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreLoad_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreLoad_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreLoad_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreLoad_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreLoad_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreLoad_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreLoad_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreLoad_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreLoad_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreLoad_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreLoad_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreLoad_KERNEL() {
    return true;
}

function fnPreLoad_CLUSTER() {
    return true;
}

function fnPreLoad_CUSTOM() {
    return true;
}

function fnPreLoad_Child_KERNEL() {
    return true;
}

function fnPreLoad_Child_CLUSTER() {
    return true;
}

function fnPreLoad_Child_CUSTOM() {
    return true;
}

function fnPostLoadMain() {
    try {
        if (FCJStream == "KERNEL") {
            fnPostLoad_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostLoad_KERNEL();
                fnPostLoad_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostLoad_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostLoad_KERNEL();
                fnPostLoad_CLUSTER();
                fnPostLoad_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
				fnPostLoad_CLUSTER();
                fnPostLoad_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostLoad_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostLoad_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostLoad_Child_KERNEL();
                    fnPostLoad_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostLoad_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    fnPostLoad_Child_KERNEL();
                    fnPostLoad_Child_CLUSTER();
                    fnPostLoad_Child_CUSTOM();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostLoad_Child_CLUSTER();
                    fnPostLoad_Child_CUSTOM();
                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostLoad_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostLoad_KERNEL() {
    return true;
}

function fnPostLoad_CLUSTER() {
    return true;
}

function fnPostLoad_CUSTOM() {
    return true;
}

function fnPostLoad_Child_KERNEL() {
    return true;
}

function fnPostLoad_Child_CLUSTER() {
    return true;
}

function fnPostLoad_Child_CUSTOM() {
    return true;
}

function fnPreNewMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreNew_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreNew_KERNEL()) {
                    return false;
                }
                if (!fnPreNew_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreNew_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreNew_KERNEL()) {
                    return false;
                }
                if (!fnPreNew_CLUSTER()) {
                    return false;
                }
                if (!fnPreNew_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreNew_CLUSTER()) {
                    return false;
                }
                if (!fnPreNew_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreNew_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreNew_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreNew_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreNew_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreNew_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreNew_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreNew_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreNew_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreNew_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreNew_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreNew_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreNew_KERNEL() {
    return true;
}

function fnPreNew_CLUSTER() {
    return true;
}

function fnPreNew_CUSTOM() {
    return true;
}

function fnPreNew_Child_KERNEL() {
    return true;
}

function fnPreNew_Child_CLUSTER() {
    return true;
}

function fnPreNew_Child_CUSTOM() {
    return true;
}

function fnPostNewMain() {
    try {
        if (FCJStream == "KERNEL") {
            fnPostNew_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostNew_KERNEL();
                fnPostNew_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostNew_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostNew_KERNEL();
                fnPostNew_CLUSTER();
                fnPostNew_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostNew_CLUSTER();
                fnPostNew_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostNew_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostNew_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostNew_Child_KERNEL();
                    fnPostNew_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostNew_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    fnPostNew_Child_KERNEL();
                    fnPostNew_Child_CLUSTER();
                    fnPostNew_Child_CUSTOM();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostNew_Child_CLUSTER();
                    fnPostNew_Child_CUSTOM();
                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostNew_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostNew_KERNEL() {
    return true;
}

function fnPostNew_CLUSTER() {
    return true;
}

function fnPostNew_CUSTOM() {
    return true;
}

function fnPostNew_Child_KERNEL() {
    return true;
}

function fnPostNew_Child_CLUSTER() {
    return true;
}

function fnPostNew_Child_CUSTOM() {
    return true;
}

function fnPreUnlockMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreUnlock_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreUnlock_KERNEL()) {
                    return false;
                }
                if (!fnPreUnlock_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreUnlock_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreUnlock_KERNEL()) {
                    return false;
                }
                if (!fnPreUnlock_CLUSTER()) {
                    return false;
                }
                if (!fnPreUnlock_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreUnlock_CLUSTER()) {
                    return false;
                }
                if (!fnPreUnlock_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreUnlock_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreUnlock_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreUnlock_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreUnlock_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreUnlock_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreUnlock_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreUnlock_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreUnlock_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreUnlock_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreUnlock_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreUnlock_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreUnlock_KERNEL() {
    return true;
}

function fnPreUnlock_CLUSTER() {
    return true;
}

function fnPreUnlock_CUSTOM() {
    return true;
}

function fnPreUnlock_Child_KERNEL() {
    return true;
}

function fnPreUnlock_Child_CLUSTER() {
    return true;
}

function fnPreUnlock_Child_CUSTOM() {
    return true;
}

function fnPostUnlockMain() {
    try {
        if (FCJStream == "KERNEL") {
            fnPostUnlock_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostUnlock_KERNEL();
                fnPostUnlock_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostUnlock_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostUnlock_KERNEL();
                fnPostUnlock_CLUSTER();
                fnPostUnlock_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostUnlock_CLUSTER();
                fnPostUnlock_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostUnlock_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostUnlock_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostUnlock_Child_KERNEL();
                    fnPostUnlock_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostUnlock_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    fnPostUnlock_Child_KERNEL();
                    fnPostUnlock_Child_CLUSTER();
                    fnPostUnlock_Child_CUSTOM();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostUnlock_Child_CLUSTER();
                    fnPostUnlock_Child_CUSTOM();
                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostUnlock_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostUnlock_KERNEL() {
    return true;
}

function fnPostUnlock_CLUSTER() {
    return true;
}

function fnPostUnlock_CUSTOM() {
    return true;
}

function fnPostUnlock_Child_KERNEL() {
    return true;
}

function fnPostUnlock_Child_CLUSTER() {
    return true;
}

function fnPostUnlock_Child_CUSTOM() {
    return true;
}

function fnPreAuthorizeMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreAuthorize_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreAuthorize_KERNEL()) {
                    return false;
                }
                if (!fnPreAuthorize_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreAuthorize_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreAuthorize_KERNEL()) {
                    return false;
                }
                if (!fnPreAuthorize_CLUSTER()) {
                    return false;
                }
                if (!fnPreAuthorize_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreAuthorize_CLUSTER()) {
                    return false;
                }
                if (!fnPreAuthorize_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreAuthorize_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreAuthorize_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreAuthorize_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreAuthorize_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreAuthorize_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreAuthorize_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreAuthorize_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreAuthorize_KERNEL() {
    return true;
}

function fnPreAuthorize_CLUSTER() {
    return true;
}

function fnPreAuthorize_CUSTOM() {
    return true;
}

function fnPreAuthorize_Child_KERNEL() {
    return true;
}

function fnPreAuthorize_Child_CLUSTER() {
    return true;
}

function fnPreAuthorize_Child_CUSTOM() {
    return true;
}

function fnPostAuthorizeMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostAuthorize_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostAuthorize_KERNEL()) {
                    return false;
                }
                if (!fnPostAuthorize_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostAuthorize_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostAuthorize_KERNEL()) {
                    return false;
                }
                if (!fnPostAuthorize_CLUSTER()) {
                    return false;
                }
                if (!fnPostAuthorize_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostAuthorize_CLUSTER()) {
                    return false;
                }
                if (!fnPostAuthorize_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostAuthorize_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostAuthorize_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostAuthorize_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostAuthorize_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostAuthorize_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostAuthorize_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostAuthorize_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostAuthorize_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostAuthorize_KERNEL() {
    return true;
}

function fnPostAuthorize_CLUSTER() {
    return true;
}

function fnPostAuthorize_CUSTOM() {
    return true;
}

function fnPostAuthorize_Child_KERNEL() {
    return true;
}

function fnPostAuthorize_Child_CLUSTER() {
    return true;
}

function fnPostAuthorize_Child_CUSTOM() {
    return true;
}

function fnPreCopyMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreCopy_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreCopy_KERNEL()) {
                    return false;
                }
                if (!fnPreCopy_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreCopy_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreCopy_KERNEL()) {
                    return false;
                }
                if (!fnPreCopy_CLUSTER()) {
                    return false;
                }
                if (!fnPreCopy_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreCopy_CLUSTER()) {
                    return false;
                }
                if (!fnPreCopy_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreCopy_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreCopy_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreCopy_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreCopy_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreCopy_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreCopy_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreCopy_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreCopy_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreCopy_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreCopy_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreCopy_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreCopy_KERNEL() {
    return true;
}

function fnPreCopy_CLUSTER() {
    return true;
}

function fnPreCopy_CUSTOM() {
    return true;
}

function fnPreCopy_Child_KERNEL() {
    return true;
}

function fnPreCopy_Child_CLUSTER() {
    return true;
}

function fnPreCopy_Child_CUSTOM() {
    return true;
}

function fnPostCopyMain() {
    try {
        if (FCJStream == "KERNEL") {
            fnPostCopy_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostCopy_KERNEL();
                fnPostCopy_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostCopy_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostCopy_KERNEL();
                fnPostCopy_CLUSTER();
                fnPostCopy_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostCopy_CLUSTER();
                fnPostCopy_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostCopy_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostCopy_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostCopy_Child_KERNEL();
                    fnPostCopy_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostCopy_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
					fnPostCopy_Child_KERNEL();
                    fnPostCopy_Child_CLUSTER();
                    fnPostCopy_Child_CUSTOM();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostCopy_Child_CLUSTER();
					fnPostCopy_Child_CUSTOM();
                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostCopy_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostCopy_KERNEL() {
    return true;
}

function fnPostCopy_CLUSTER() {
    return true;
}

function fnPostCopy_CUSTOM() {
    return true;
}

function fnPostCopy_Child_KERNEL() {
    return true;
}

function fnPostCopy_Child_CLUSTER() {
    return true;
}

function fnPostCopy_Child_CUSTOM() {
    return true;
}

function fnPreCloseMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreClose_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreClose_KERNEL()) {
                    return false;
                }
                if (!fnPreClose_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreClose_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreClose_KERNEL()) {
                    return false;
                }
                if (!fnPreClose_CLUSTER()) {
                    return false;
                }
                if (!fnPreClose_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreClose_CLUSTER()) {
                    return false;
                }
                if (!fnPreClose_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreClose_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreClose_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreClose_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreClose_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreClose_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreClose_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreClose_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreClose_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreClose_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreClose_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreClose_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreClose_KERNEL() {
    return true;
}

function fnPreClose_CLUSTER() {
    return true;
}

function fnPreClose_CUSTOM() {
    return true;
}

function fnPreClose_Child_KERNEL() {
    return true;
}

function fnPreClose_Child_CLUSTER() {
    return true;
}

function fnPreClose_Child_CUSTOM() {
    return true;
}

function fnPostCloseMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostClose_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostClose_KERNEL()) {
                    return false;
                }
                if (!fnPostClose_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostClose_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostClose_KERNEL()) {
                    return false;
                }
                if (!fnPostClose_CLUSTER()) {
                    return false;
                }
                if (!fnPostClose_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostClose_CLUSTER()) {
                    return false;
                }
                if (!fnPostClose_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostClose_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostClose_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostClose_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostClose_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostClose_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostClose_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostClose_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostClose_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostClose_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostClose_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostClose_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostClose_KERNEL() {
    return true;
}

function fnPostClose_CLUSTER() {
    return true;
}

function fnPostClose_CUSTOM() {
    return true;
}

function fnPostClose_Child_KERNEL() {
    return true;
}

function fnPostClose_Child_CLUSTER() {
    return true;
}

function fnPostClose_Child_CUSTOM() {
    return true;
}

function fnPreReOpenMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreReOpen_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreReOpen_KERNEL()) {
                    return false;
                }
                if (!fnPreReOpen_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreReOpen_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreReOpen_KERNEL()) {
                    return false;
                }
                if (!fnPreReOpen_CLUSTER()) {
                    return false;
                }
                if (!fnPreReOpen_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreReOpen_CLUSTER()) {
                    return false;
                }
                if (!fnPreReOpen_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreReOpen_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreReOpen_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreReOpen_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreReOpen_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreReOpen_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreReOpen_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreReOpen_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreReOpen_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreReOpen_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreReOpen_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreReOpen_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreReOpen_KERNEL() {
    return true;
}

function fnPreReOpen_CLUSTER() {
    return true;
}

function fnPreReOpen_CUSTOM() {
    return true;
}

function fnPreReOpen_Child_KERNEL() {
    return true;
}

function fnPreReOpen_Child_CLUSTER() {
    return true;
}

function fnPreReOpen_Child_CUSTOM() {
    return true;
}

function fnPostReOpenMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostReOpen_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostReOpen_KERNEL()) {
                    return false;
                }
                if (!fnPostReOpen_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostReOpen_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostReOpen_KERNEL()) {
                    return false;
                }
                if (!fnPostReOpen_CLUSTER()) {
                    return false;
                }
                if (!fnPostReOpen_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostReOpen_CLUSTER()) {
                    return false;
                }
                if (!fnPostReOpen_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostReOpen_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostReOpen_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostReOpen_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostReOpen_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostReOpen_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostReOpen_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostReOpen_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostReOpen_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostReOpen_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostReOpen_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostReOpen_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostReOpen_KERNEL() {
    return true;
}

function fnPostReOpen_CLUSTER() {
    return true;
}

function fnPostReOpen_CUSTOM() {
    return true;
}

function fnPostReOpen_Child_KERNEL() {
    return true;
}

function fnPostReOpen_Child_CLUSTER() {
    return true;
}

function fnPostReOpen_Child_CUSTOM() {
    return true;
}

function fnPreDeleteMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreDelete_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreDelete_KERNEL()) {
                    return false;
                }
                if (!fnPreDelete_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreDelete_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreDelete_KERNEL()) {
                    return false;
                }
                if (!fnPreDelete_CLUSTER()) {
                    return false;
                }
                if (!fnPreDelete_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreDelete_CLUSTER()) {
                    return false;
                }
                if (!fnPreDelete_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreDelete_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreDelete_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreDelete_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreDelete_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreDelete_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreDelete_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreDelete_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreDelete_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreDelete_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreDelete_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreDelete_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreDelete_KERNEL() {
    return true;
}

function fnPreDelete_CLUSTER() {
    return true;
}

function fnPreDelete_CUSTOM() {
    return true;
}

function fnPreDelete_Child_KERNEL() {
    return true;
}

function fnPreDelete_Child_CLUSTER() {
    return true;
}

function fnPreDelete_Child_CUSTOM() {
    return true;
}

function fnPostDeleteMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostDelete_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostDelete_KERNEL()) {
                    return false;
                }
                if (!fnPostDelete_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostDelete_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostDelete_KERNEL()) {
                    return false;
                }
                if (!fnPostDelete_CLUSTER()) {
                    return false;
                }
                if (!fnPostDelete_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostDelete_CLUSTER()) {
                    return false;
                }
                if (!fnPostDelete_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostDelete_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostDelete_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostDelete_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostDelete_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostDelete_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostDelete_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostDelete_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostDelete_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostDelete_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostDelete_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostDelete_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostDelete_KERNEL() {
    return true;
}

function fnPostDelete_CLUSTER() {
    return true;
}

function fnPostDelete_CUSTOM() {
    return true;
}

function fnPostDelete_Child_KERNEL() {
    return true;
}

function fnPostDelete_Child_CLUSTER() {
    return true;
}

function fnPostDelete_Child_CUSTOM() {
    return true;
}

function fnPreEnterQueryMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreEnterQuery_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreEnterQuery_KERNEL()) {
                    return false;
                }
                if (!fnPreEnterQuery_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreEnterQuery_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreEnterQuery_KERNEL()) {
                    return false;
                }
                if (!fnPreEnterQuery_CLUSTER()) {
                    return false;
                }
                if (!fnPreEnterQuery_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreEnterQuery_CLUSTER()) {
                    return false;
                }
                if (!fnPreEnterQuery_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreEnterQuery_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreEnterQuery_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreEnterQuery_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreEnterQuery_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreEnterQuery_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreEnterQuery_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreEnterQuery_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreEnterQuery_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreEnterQuery_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreEnterQuery_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreEnterQuery_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreEnterQuery_KERNEL() {
    return true;
}

function fnPreEnterQuery_CLUSTER() {
    return true;
}

function fnPreEnterQuery_CUSTOM() {
    return true;
}

function fnPreEnterQuery_Child_KERNEL() {
    return true;
}

function fnPreEnterQuery_Child_CLUSTER() {
    return true;
}

function fnPreEnterQuery_Child_CUSTOM() {
    return true;
}

function fnPostEnterQueryMain() {
    try {
        if (FCJStream == "KERNEL") {
            fnPostEnterQuery_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostEnterQuery_KERNEL();
                fnPostEnterQuery_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostEnterQuery_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostEnterQuery_KERNEL();
                fnPostEnterQuery_CLUSTER();
                fnPostEnterQuery_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostEnterQuery_CLUSTER();
                fnPostEnterQuery_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostEnterQuery_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostEnterQuery_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostEnterQuery_Child_KERNEL();
                    fnPostEnterQuery_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostEnterQuery_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    fnPostEnterQuery_Child_KERNEL();
                    fnPostEnterQuery_Child_CLUSTER();
                    fnPostEnterQuery_Child_CUSTOM();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostEnterQuery_Child_CLUSTER();
                    fnPostEnterQuery_Child_CUSTOM();
                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostEnterQuery_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostEnterQuery_KERNEL() {
    return true;
}

function fnPostEnterQuery_CLUSTER() {
    return true;
}

function fnPostEnterQuery_CUSTOM() {
    return true;
}

function fnPostEnterQuery_Child_KERNEL() {
    return true;
}

function fnPostEnterQuery_Child_CLUSTER() {
    return true;
}

function fnPostEnterQuery_Child_CUSTOM() {
    return true;
}

function fnPreExecuteQueryMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreExecuteQuery_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreExecuteQuery_KERNEL()) {
                    return false;
                }
                if (!fnPreExecuteQuery_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreExecuteQuery_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreExecuteQuery_KERNEL()) {
                    return false;
                }
                if (!fnPreExecuteQuery_CLUSTER()) {
                    return false;
                }
                if (!fnPreExecuteQuery_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreExecuteQuery_CLUSTER()) {
                    return false;
                }
                if (!fnPreExecuteQuery_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreExecuteQuery_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreExecuteQuery_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreExecuteQuery_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreExecuteQuery_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreExecuteQuery_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreExecuteQuery_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreExecuteQuery_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreExecuteQuery_KERNEL() {
    return true;
}

function fnPreExecuteQuery_CLUSTER() {
    return true;
}

function fnPreExecuteQuery_CUSTOM() {
    return true;
}

function fnPreExecuteQuery_Child_KERNEL() {
    return true;
}

function fnPreExecuteQuery_Child_CLUSTER() {
    return true;
}

function fnPreExecuteQuery_Child_CUSTOM() {
    return true;
}

function fnPostExecuteQueryMain() {
    try {
        if (FCJStream == "KERNEL") {
            fnPostExecuteQuery_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostExecuteQuery_KERNEL();
                fnPostExecuteQuery_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostExecuteQuery_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostExecuteQuery_KERNEL();
                fnPostExecuteQuery_CLUSTER();
                fnPostExecuteQuery_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostExecuteQuery_CLUSTER();
                fnPostExecuteQuery_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostExecuteQuery_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostExecuteQuery_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostExecuteQuery_Child_KERNEL();
                    fnPostExecuteQuery_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostExecuteQuery_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    fnPostExecuteQuery_Child_KERNEL();
					fnPostExecuteQuery_Child_CLUSTER();
                    fnPostExecuteQuery_Child_CUSTOM();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostExecuteQuery_Child_CLUSTER();
                    fnPostExecuteQuery_Child_CUSTOM();
                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostExecuteQuery_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostExecuteQuery_KERNEL() {
    return true;
}

function fnPostExecuteQuery_CLUSTER() {
    return true;
}

function fnPostExecuteQuery_CUSTOM() {
    return true;
}

function fnPostExecuteQuery_Child_KERNEL() {
    return true;
}

function fnPostExecuteQuery_Child_CLUSTER() {
    return true;
}

function fnPostExecuteQuery_Child_CUSTOM() {
    return true;
}

function fnPreSaveMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreSave_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreSave_KERNEL()) {
                    return false;
                }
                if (!fnPreSave_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreSave_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreSave_KERNEL()) {
                    return false;
                }
                if (!fnPreSave_CLUSTER()) {
                    return false;
                }
                if (!fnPreSave_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreSave_CLUSTER()) {
                    return false;
                }
                if (!fnPreSave_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreSave_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreSave_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreSave_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreSave_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreSave_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreSave_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreSave_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreSave_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreSave_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreSave_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreSave_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreSave_KERNEL() {
    return true;
}

function fnPreSave_CLUSTER() {
    return true;
}

function fnPreSave_CUSTOM() {
    return true;
}

function fnPreSave_Child_KERNEL() {
    return true;
}

function fnPreSave_Child_CLUSTER() {
    return true;
}

function fnPreSave_Child_CUSTOM() {
    return true;
}

function fnPostSaveMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostSave_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostSave_KERNEL()) {
                    return false;
                }
                if (!fnPostSave_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostSave_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostSave_KERNEL()) {
                    return false;
                }
                if (!fnPostSave_CLUSTER()) {
                    return false;
                }
                if (!fnPostSave_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostSave_CLUSTER()) {
                    return false;
                }
                if (!fnPostSave_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostSave_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostSave_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostSave_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostSave_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostSave_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostSave_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostSave_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostSave_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostSave_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostSave_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostSave_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostSave_KERNEL() {
    return true;
}

function fnPostSave_CLUSTER() {
    return true;
}

function fnPostSave_CUSTOM() {
    return true;
}

function fnPostSave_Child_KERNEL() {
    return true;
}

function fnPostSave_Child_CLUSTER() {
    return true;
}

function fnPostSave_Child_CUSTOM() {
    return true;
}

function fnPreHoldMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreHold_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreHold_KERNEL()) {
                    return false;
                }
                if (!fnPreHold_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreHold_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreHold_KERNEL()) {
                    return false;
                }
                if (!fnPreHold_CLUSTER()) {
                    return false;
                }
                if (!fnPreHold_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreHold_CLUSTER()) {
                    return false;
                }
                if (!fnPreHold_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreHold_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreHold_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreHold_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreHold_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreHold_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreHold_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreHold_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreHold_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreHold_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreHold_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreHold_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreHold_KERNEL() {
    return true;
}

function fnPreHold_CLUSTER() {
    return true;
}

function fnPreHold_CUSTOM() {
    return true;
}

function fnPreHold_Child_KERNEL() {
    return true;
}

function fnPreHold_Child_CLUSTER() {
    return true;
}

function fnPreHold_Child_CUSTOM() {
    return true;
}

function fnPostHoldMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostHold_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostHold_KERNEL()) {
                    return false;
                }
                if (!fnPostHold_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostHold_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostHold_KERNEL()) {
                    return false;
                }
                if (!fnPostHold_CLUSTER()) {
                    return false;
                }
                if (!fnPostHold_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostHold_CLUSTER()) {
                    return false;
                }
                if (!fnPostHold_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostHold_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostHold_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostHold_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostHold_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostHold_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostHold_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostHold_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostHold_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostHold_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostHold_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostHold_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostHold_KERNEL() {
    return true;
}

function fnPostHold_CLUSTER() {
    return true;
}

function fnPostHold_CUSTOM() {
    return true;
}

function fnPostHold_Child_KERNEL() {
    return true;
}

function fnPostHold_Child_CLUSTER() {
    return true;
}

function fnPostHold_Child_CUSTOM() {
    return true;
}

function fnPreReverseMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreReverse_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreReverse_KERNEL()) {
                    return false;
                }
                if (!fnPreReverse_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreReverse_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreReverse_KERNEL()) {
                    return false;
                }
                if (!fnPreReverse_CLUSTER()) {
                    return false;
                }
                if (!fnPreReverse_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreReverse_CLUSTER()) {
                    return false;
                }
                if (!fnPreReverse_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreReverse_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreReverse_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreReverse_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreReverse_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreReverse_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreReverse_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreReverse_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreReverse_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreReverse_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreReverse_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreReverse_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreReverse_KERNEL() {
    return true;
}

function fnPreReverse_CLUSTER() {
    return true;
}

function fnPreReverse_CUSTOM() {
    return true;
}

function fnPreReverse_Child_KERNEL() {
    return true;
}

function fnPreReverse_Child_CLUSTER() {
    return true;
}

function fnPreReverse_Child_CUSTOM() {
    return true;
}

function fnPostReverseMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostReverse_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostReverse_KERNEL()) {
                    return false;
                }
                if (!fnPostReverse_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostReverse_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostReverse_KERNEL()) {
                    return false;
                }
                if (!fnPostReverse_CLUSTER()) {
                    return false;
                }
                if (!fnPostReverse_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostReverse_CLUSTER()) {
                    return false;
                }
                if (!fnPostReverse_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostReverse_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostReverse_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostReverse_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostReverse_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostReverse_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostReverse_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostReverse_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostReverse_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostReverse_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostReverse_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostReverse_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostReverse_KERNEL() {
    return true;
}

function fnPostReverse_CLUSTER() {
    return true;
}

function fnPostReverse_CUSTOM() {
    return true;
}

function fnPostReverse_Child_KERNEL() {
    return true;
}

function fnPostReverse_Child_CLUSTER() {
    return true;
}

function fnPostReverse_Child_CUSTOM() {
    return true;
}

function fnPreRolloverMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreRollover_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreRollover_KERNEL()) {
                    return false;
                }
                if (!fnPreRollover_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreRollover_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreRollover_KERNEL()) {
                    return false;
                }
                if (!fnPreRollover_CLUSTER()) {
                    return false;
                }
                if (!fnPreRollover_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreRollover_CLUSTER()) {
                    return false;
                }
                if (!fnPreRollover_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreRollover_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreRollover_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreRollover_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreRollover_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreRollover_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreRollover_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreRollover_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreRollover_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreRollover_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreRollover_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreRollover_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreRollover_KERNEL() {
    return true;
}

function fnPreRollover_CLUSTER() {
    return true;
}

function fnPreRollover_CUSTOM() {
    return true;
}

function fnPreRollover_Child_KERNEL() {
    return true;
}

function fnPreRollover_Child_CLUSTER() {
    return true;
}

function fnPreRollover_Child_CUSTOM() {
    return true;
}

function fnPostRolloverMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostRollover_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostRollover_KERNEL()) {
                    return false;
                }
                if (!fnPostRollover_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostRollover_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostRollover_KERNEL()) {
                    return false;
                }
                if (!fnPostRollover_CLUSTER()) {
                    return false;
                }
                if (!fnPostRollover_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostRollover_CLUSTER()) {
                    return false;
                }
                if (!fnPostRollover_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostRollover_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostRollover_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostRollover_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostRollover_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostRollover_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostRollover_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostRollover_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostRollover_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostRollover_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostRollover_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostRollover_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostRollover_KERNEL() {
    return true;
}

function fnPostRollover_CLUSTER() {
    return true;
}

function fnPostRollover_CUSTOM() {
    return true;
}

function fnPostRollover_Child_KERNEL() {
    return true;
}

function fnPostRollover_Child_CLUSTER() {
    return true;
}

function fnPostRollover_Child_CUSTOM() {
    return true;
}

function fnPreConfirmMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreConfirm_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreConfirm_KERNEL()) {
                    return false;
                }
                if (!fnPreConfirm_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreConfirm_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreConfirm_KERNEL()) {
                    return false;
                }
                if (!fnPreConfirm_CLUSTER()) {
                    return false;
                }
                if (!fnPreConfirm_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreConfirm_CLUSTER()) {
                    return false;
                }
                if (!fnPreConfirm_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreConfirm_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreConfirm_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreConfirm_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreConfirm_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreConfirm_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreConfirm_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreConfirm_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreConfirm_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreConfirm_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreConfirm_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreConfirm_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreConfirm_KERNEL() {
    return true;
}

function fnPreConfirm_CLUSTER() {
    return true;
}

function fnPreConfirm_CUSTOM() {
    return true;
}

function fnPreConfirm_Child_KERNEL() {
    return true;
}

function fnPreConfirm_Child_CLUSTER() {
    return true;
}

function fnPreConfirm_Child_CUSTOM() {
    return true;
}

function fnPostConfirmMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostConfirm_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostConfirm_KERNEL()) {
                    return false;
                }
                if (!fnPostConfirm_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostConfirm_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostConfirm_KERNEL()) {
                    return false;
                }
                if (!fnPostConfirm_CLUSTER()) {
                    return false;
                }
                if (!fnPostConfirm_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostConfirm_CLUSTER()) {
                    return false;
                }
                if (!fnPostConfirm_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostConfirm_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostConfirm_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostConfirm_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostConfirm_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostConfirm_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostConfirm_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostConfirm_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostConfirm_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostConfirm_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostConfirm_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostConfirm_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostConfirm_KERNEL() {
    return true;
}

function fnPostConfirm_CLUSTER() {
    return true;
}

function fnPostConfirm_CUSTOM() {
    return true;
}

function fnPostConfirm_Child_KERNEL() {
    return true;
}

function fnPostConfirm_Child_CLUSTER() {
    return true;
}

function fnPostConfirm_Child_CUSTOM() {
    return true;
}

function fnPreLiquidateMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreLiquidate_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreLiquidate_KERNEL()) {
                    return false;
                }
                if (!fnPreLiquidate_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreLiquidate_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreLiquidate_KERNEL()) {
                    return false;
                }
                if (!fnPreLiquidate_CLUSTER()) {
                    return false;
                }
                if (!fnPreLiquidate_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreLiquidate_CLUSTER()) {
                    return false;
                }
                if (!fnPreLiquidate_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreLiquidate_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreLiquidate_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreLiquidate_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreLiquidate_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreLiquidate_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreLiquidate_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreLiquidate_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreLiquidate_KERNEL() {
    return true;
}

function fnPreLiquidate_CLUSTER() {
    return true;
}

function fnPreLiquidate_CUSTOM() {
    return true;
}

function fnPreLiquidate_Child_KERNEL() {
    return true;
}

function fnPreLiquidate_Child_CLUSTER() {
    return true;
}

function fnPreLiquidate_Child_CUSTOM() {
    return true;
}

function fnPostLiquidateMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostLiquidate_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostLiquidate_KERNEL()) {
                    return false;
                }
                if (!fnPostLiquidate_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostLiquidate_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostLiquidate_KERNEL()) {
                    return false;
                }
                if (!fnPostLiquidate_CLUSTER()) {
                    return false;
                }
                if (!fnPostLiquidate_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostLiquidate_CLUSTER()) {
                    return false;
                }
                if (!fnPostLiquidate_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostLiquidate_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostLiquidate_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostLiquidate_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostLiquidate_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostLiquidate_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostLiquidate_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostLiquidate_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostLiquidate_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostLiquidate_KERNEL() {
    return true;
}

function fnPostLiquidate_CLUSTER() {
    return true;
}

function fnPostLiquidate_CUSTOM() {
    return true;
}

function fnPostLiquidate_Child_KERNEL() {
    return true;
}

function fnPostLiquidate_Child_CLUSTER() {
    return true;
}

function fnPostLiquidate_Child_CUSTOM() {
    return true;
}

function fnPreProductPickupMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreProductPickup_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreProductPickup_KERNEL()) {
                    return false;
                }
                if (!fnPreProductPickup_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreProductPickup_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreProductPickup_KERNEL()) {
                    return false;
                }
                if (!fnPreProductPickup_CLUSTER()) {
                    return false;
                }
                if (!fnPreProductPickup_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreProductPickup_CLUSTER()) {
                    return false;
                }
                if (!fnPreProductPickup_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreProductPickup_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreProductPickup_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreProductPickup_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreProductPickup_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreProductPickup_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreProductPickup_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreProductPickup_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreProductPickup_KERNEL() {
    return true;
}

function fnPreProductPickup_CLUSTER() {
    return true;
}

function fnPreProductPickup_CUSTOM() {
    return true;
}

function fnPreProductPickup_Child_KERNEL() {
    return true;
}

function fnPreProductPickup_Child_CLUSTER() {
    return true;
}

function fnPreProductPickup_Child_CUSTOM() {
    return true;
}

function fnPostProductPickupMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostProductPickup_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostProductPickup_KERNEL()) {
                    return false;
                }
                if (!fnPostProductPickup_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostProductPickup_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostProductPickup_KERNEL()) {
                    return false;
                }
                if (!fnPostProductPickup_CLUSTER()) {
                    return false;
                }
                if (!fnPostProductPickup_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostProductPickup_CLUSTER()) {
                    return false;
                }
                if (!fnPostProductPickup_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostProductPickup_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostProductPickup_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostProductPickup_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostProductPickup_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostProductPickup_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostProductPickup_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostProductPickup_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostProductPickup_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostProductPickup_KERNEL() {
    return true;
}

function fnPostProductPickup_CLUSTER() {
    return true;
}

function fnPostProductPickup_CUSTOM() {
    return true;
}

function fnPostProductPickup_Child_KERNEL() {
    return true;
}

function fnPostProductPickup_Child_CLUSTER() {
    return true;
}

function fnPostProductPickup_Child_CUSTOM() {
    return true;
}

function fnPreProcessRequestMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreProcessRequest_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreProcessRequest_KERNEL()) {
                    return false;
                }
                if (!fnPreProcessRequest_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreProcessRequest_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreProcessRequest_KERNEL()) {
                    return false;
                }
                if (!fnPreProcessRequest_CLUSTER()) {
                    return false;
                }
                if (!fnPreProcessRequest_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreProcessRequest_CLUSTER()) {
                    return false;
                }
                if (!fnPreProcessRequest_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreProcessRequest_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreProcessRequest_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreProcessRequest_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreProcessRequest_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreProcessRequest_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreProcessRequest_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreProcessRequest_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreProcessRequest_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreProcessRequest_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreProcessRequest_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreProcessRequest_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreProcessRequest_KERNEL() {
    return true;
}

function fnPreProcessRequest_CLUSTER() {
    return true;
}

function fnPreProcessRequest_CUSTOM() {
    return true;
}

function fnPreProcessRequest_Child_KERNEL() {
    return true;
}

function fnPreProcessRequest_Child_CLUSTER() {
    return true;
}

function fnPreProcessRequest_Child_CUSTOM() {
    return true;
}

function fnPostProcessRequestMain() {
    try {
        if (FCJStream == "KERNEL") {
            fnPostProcessRequest_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostProcessRequest_KERNEL();
                fnPostProcessRequest_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostProcessRequest_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostProcessRequest_KERNEL();
                fnPostProcessRequest_CLUSTER();
                fnPostProcessRequest_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostProcessRequest_CLUSTER();
                fnPostProcessRequest_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostProcessRequest_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostProcessRequest_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostProcessRequest_Child_KERNEL();
                    fnPostProcessRequest_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostProcessRequest_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    fnPostProcessRequest_Child_KERNEL();
                    fnPostProcessRequest_Child_CLUSTER();
                    fnPostProcessRequest_Child_CUSTOM();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostProcessRequest_Child_CLUSTER();
                    fnPostProcessRequest_Child_CUSTOM();
                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostProcessRequest_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostProcessRequest_KERNEL() {
    return true;
}

function fnPostProcessRequest_CLUSTER() {
    return true;
}

function fnPostProcessRequest_CUSTOM() {
    return true;
}

function fnPostProcessRequest_Child_KERNEL() {
    return true;
}

function fnPostProcessRequest_Child_CLUSTER() {
    return true;
}

function fnPostProcessRequest_Child_CUSTOM() {
    return true;
}

function fnPreEnrichDetailsMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreEnrichDetails_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreEnrichDetails_KERNEL()) {
                    return false;
                }
                if (!fnPreEnrichDetails_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreEnrichDetails_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreEnrichDetails_KERNEL()) {
                    return false;
                }
                if (!fnPreEnrichDetails_CLUSTER()) {
                    return false;
                }
                if (!fnPreEnrichDetails_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreEnrichDetails_CLUSTER()) {
                    return false;
                }
                if (!fnPreEnrichDetails_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreEnrichDetails_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreEnrichDetails_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreEnrichDetails_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreEnrichDetails_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreEnrichDetails_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreEnrichDetails_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreEnrichDetails_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreEnrichDetails_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreEnrichDetails_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreEnrichDetails_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreEnrichDetails_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreEnrichDetails_KERNEL() {
    return true;
}

function fnPreEnrichDetails_CLUSTER() {
    return true;
}

function fnPreEnrichDetails_CUSTOM() {
    return true;
}

function fnPreEnrichDetails_Child_KERNEL() {
    return true;
}

function fnPreEnrichDetails_Child_CLUSTER() {
    return true;
}

function fnPreEnrichDetails_Child_CUSTOM() {
    return true;
}

function fnPostEnrichDetailsMain() {
    try {
        if (FCJStream == "KERNEL") {
           fnPostEnrichDetails_KERNEL();
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                fnPostEnrichDetails_KERNEL();
                fnPostEnrichDetails_CLUSTER();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostEnrichDetails_CLUSTER();
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                fnPostEnrichDetails_KERNEL();
                fnPostEnrichDetails_CLUSTER();
                fnPostEnrichDetails_CUSTOM();
            }
            else if (functionOrigin == "CLUSTER") {
                fnPostEnrichDetails_CLUSTER();
                fnPostEnrichDetails_CUSTOM();
            }
            else if (functionOrigin == "CUSTOM") {
                fnPostEnrichDetails_CUSTOM();
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                fnPostEnrichDetails_Child_KERNEL();
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    fnPostEnrichDetails_Child_KERNEL();
                    fnPostEnrichDetails_Child_CLUSTER();
                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostEnrichDetails_Child_CLUSTER();
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    fnPostEnrichDetails_Child_KERNEL();
                    fnPostEnrichDetails_Child_CLUSTER();
                    fnPostEnrichDetails_Child_CUSTOM();

                }
                else if (functionOrigin == "CLUSTER") {
                    fnPostEnrichDetails_Child_CLUSTER();
                    fnPostEnrichDetails_Child_CUSTOM();

                }
                else if (functionOrigin == "CUSTOM") {
                    fnPostEnrichDetails_Child_CUSTOM();
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostEnrichDetails_KERNEL() {
    return true;
}

function fnPostEnrichDetails_CLUSTER() {
    return true;
}

function fnPostEnrichDetails_CUSTOM() {
    return true;
}

function fnPostEnrichDetails_Child_KERNEL() {
    return true;
}

function fnPostEnrichDetails_Child_CLUSTER() {
    return true;
}

function fnPostEnrichDetails_Child_CUSTOM() {
    return true;
}

function fnPreLoad_SumMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreLoad_Sum_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreLoad_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPreLoad_Sum_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreLoad_Sum_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreLoad_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPreLoad_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPreLoad_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreLoad_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPreLoad_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreLoad_Sum_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreLoad_Sum_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreLoad_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreLoad_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreLoad_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreLoad_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreLoad_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreLoad_Sum_KERNEL() {
    return true;
}

function fnPreLoad_Sum_CLUSTER() {
    return true;
}

function fnPreLoad_Sum_CUSTOM() {
    return true;
}

function fnPreLoad_Sum_Child_KERNEL() {
    return true;
}

function fnPreLoad_Sum_Child_CLUSTER() {
    return true;
}

function fnPreLoad_Sum_Child_CUSTOM() {
    return true;
}

function fnPostLoad_SumMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostLoad_Sum_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostLoad_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPostLoad_Sum_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostLoad_Sum_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostLoad_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPostLoad_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPostLoad_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostLoad_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPostLoad_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostLoad_Sum_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostLoad_Sum_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostLoad_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostLoad_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostLoad_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostLoad_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostLoad_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostLoad_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostLoad_Sum_KERNEL() {
    return true;
}

function fnPostLoad_Sum_CLUSTER() {
    return true;
}

function fnPostLoad_Sum_CUSTOM() {
    return true;
}

function fnPostLoad_Sum_Child_KERNEL() {
    return true;
}

function fnPostLoad_Sum_Child_CLUSTER() {
    return true;
}

function fnPostLoad_Sum_Child_CUSTOM() {
    return true;
}

function fnPreExecuteQuery_sumMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreExecuteQuery_sum_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreExecuteQuery_sum_KERNEL()) {
                    return false;
                }
                if (!fnPreExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreExecuteQuery_sum_KERNEL()) {
                    return false;
                }
                if (!fnPreExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
                if (!fnPreExecuteQuery_sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
                if (!fnPreExecuteQuery_sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreExecuteQuery_sum_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreExecuteQuery_sum_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreExecuteQuery_sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreExecuteQuery_sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreExecuteQuery_sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreExecuteQuery_sum_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreExecuteQuery_sum_KERNEL() {
    return true;
}

function fnPreExecuteQuery_sum_CLUSTER() {
    return true;
}

function fnPreExecuteQuery_sum_CUSTOM() {
    return true;
}

function fnPreExecuteQuery_sum_Child_KERNEL() {
    return true;
}

function fnPreExecuteQuery_sum_Child_CLUSTER() {
    return true;
}

function fnPreExecuteQuery_sum_Child_CUSTOM() {
    return true;
}

function fnPostExecuteQuery_sumMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostExecuteQuery_sum_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostExecuteQuery_sum_KERNEL()) {
                    return false;
                }
                if (!fnPostExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostExecuteQuery_sum_KERNEL()) {
                    return false;
                }
                if (!fnPostExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
                if (!fnPostExecuteQuery_sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostExecuteQuery_sum_CLUSTER()) {
                    return false;
                }
                if (!fnPostExecuteQuery_sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostExecuteQuery_sum_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostExecuteQuery_sum_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostExecuteQuery_sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostExecuteQuery_sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostExecuteQuery_sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostExecuteQuery_sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostExecuteQuery_sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostExecuteQuery_sum_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostExecuteQuery_sum_KERNEL() {
    return true;
}

function fnPostExecuteQuery_sum_CLUSTER() {
    return true;
}

function fnPostExecuteQuery_sum_CUSTOM() {
    return true;
}

function fnPostExecuteQuery_sum_Child_KERNEL() {
    return true;
}

function fnPostExecuteQuery_sum_Child_CLUSTER() {
    return true;
}

function fnPostExecuteQuery_sum_Child_CUSTOM() {
    return true;
}

function fnPreShowDetail_SumMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreShowDetail_Sum_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreShowDetail_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPreShowDetail_Sum_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreShowDetail_Sum_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreShowDetail_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPreShowDetail_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPreShowDetail_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreShowDetail_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPreShowDetail_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreShowDetail_Sum_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreShowDetail_Sum_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreShowDetail_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreShowDetail_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreShowDetail_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreShowDetail_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreShowDetail_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreShowDetail_Sum_KERNEL() {
    return true;
}

function fnPreShowDetail_Sum_CLUSTER() {
    return true;
}

function fnPreShowDetail_Sum_CUSTOM() {
    return true;
}

function fnPreShowDetail_Sum_Child_KERNEL() {
    return true;
}

function fnPreShowDetail_Sum_Child_CLUSTER() {
    return true;
}

function fnPreShowDetail_Sum_Child_CUSTOM() {
    return true;
}

function fnPostShowDetail_SumMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostShowDetail_Sum_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostShowDetail_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPostShowDetail_Sum_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostShowDetail_Sum_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostShowDetail_Sum_KERNEL()) {
                    return false;
                }
                if (!fnPostShowDetail_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPostShowDetail_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostShowDetail_Sum_CLUSTER()) {
                    return false;
                }
                if (!fnPostShowDetail_Sum_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostShowDetail_Sum_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostShowDetail_Sum_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostShowDetail_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostShowDetail_Sum_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostShowDetail_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostShowDetail_Sum_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostShowDetail_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostShowDetail_Sum_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostShowDetail_Sum_KERNEL() {
    return true;
}

function fnPostShowDetail_Sum_CLUSTER() {
    return true;
}

function fnPostShowDetail_Sum_CUSTOM() {
    return true;
}

function fnPostShowDetail_Sum_Child_KERNEL() {
    return true;
}

function fnPostShowDetail_Sum_Child_CLUSTER() {
    return true;
}

function fnPostShowDetail_Sum_Child_CUSTOM() {
    return true;
}

function fnPostFocusMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostFocus_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostFocus_KERNEL()) {
                    return false;
                }
                if (!fnPostFocus_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostFocus_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostFocus_KERNEL()) {
                    return false;
                }
                if (!fnPostFocus_CLUSTER()) {
                    return false;
                }
                if (!fnPostFocus_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostFocus_CLUSTER()) {
                    return false;
                }
                if (!fnPostFocus_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostFocus_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostFocus_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostFocus_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostFocus_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostFocus_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostFocus_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostFocus_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostFocus_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostFocus_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostFocus_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostFocus_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostFocus_KERNEL() {
    return true;
}

function fnPostFocus_CLUSTER() {
    return true;
}

function fnPostFocus_CUSTOM() {
    return true;
}

function fnPostFocus_Child_KERNEL() {
    return true;
}

function fnPostFocus_Child_CLUSTER() {
    return true;
}

function fnPostFocus_Child_CUSTOM() {
    return true;
}


function fnPostRefreshSummaryMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPostRefreshSummary_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostRefreshSummary_KERNEL()) {
                    return false;
                }
                if (!fnPostRefreshSummary_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostRefreshSummary_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPostRefreshSummary_KERNEL()) {
                    return false;
                }
                if (!fnPostRefreshSummary_CLUSTER()) {
                    return false;
                }
                if (!fnPostRefreshSummary_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPostRefreshSummary_CLUSTER()) {
                    return false;
                }
                if (!fnPostRefreshSummary_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPostRefreshSummary_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPostRefreshSummary_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostRefreshSummary_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPostRefreshSummary_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPostRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostRefreshSummary_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPostRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPostRefreshSummary_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPostRefreshSummary_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPostRefreshSummary_KERNEL() {
    return true;
}

function fnPostRefreshSummary_CLUSTER() {
    return true;
}

function fnPostRefreshSummary_CUSTOM() {
    return true;
}

function fnPostRefreshSummary_Child_KERNEL() {
    return true;
}

function fnPostRefreshSummary_Child_CLUSTER() {
    return true;
}

function fnPostRefreshSummary_Child_CUSTOM() {
    return true;
}


function fnPreRefreshSummaryMain() {
    try {
        if (FCJStream == "KERNEL") {
            if (!fnPreRefreshSummary_KERNEL()) {
                return false;
            }
        }
        else if (FCJStream == "CLUSTER") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreRefreshSummary_KERNEL()) {
                    return false;
                }
                if (!fnPreRefreshSummary_CLUSTER()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreRefreshSummary_CLUSTER()) {
                    return false;
                }
            }
        }
        else if (FCJStream == "CUSTOM") {
            if (functionOrigin == "KERNEL") {
                if (!fnPreRefreshSummary_KERNEL()) {
                    return false;
                }
                if (!fnPreRefreshSummary_CLUSTER()) {
                    return false;
                }
                if (!fnPreRefreshSummary_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CLUSTER") {
                if (!fnPreRefreshSummary_CLUSTER()) {
                    return false;
                }
                if (!fnPreRefreshSummary_CUSTOM()) {
                    return false;
                }
            }
            else if (functionOrigin == "CUSTOM") {
                if (!fnPreRefreshSummary_CUSTOM()) {
                    return false;
                }
            }
        }
        if ((typeof (parentFunction) != "undefined" && parentFunction != "") || (typeof (childParentFunction) != "undefined" && childParentFunction != "")) {
            if (FCJStream == "KERNEL") {
                if (!fnPreRefreshSummary_Child_KERNEL()) {
                    return false;
                }
            }
            else if (FCJStream == "CLUSTER") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreRefreshSummary_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                }
            }
            else if (FCJStream == "CUSTOM") {
                if (functionOrigin == "KERNEL") {
                    if (!fnPreRefreshSummary_Child_KERNEL()) {
                        return false;
                    }
                    if (!fnPreRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreRefreshSummary_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CLUSTER") {
                    if (!fnPreRefreshSummary_Child_CLUSTER()) {
                        return false;
                    }
                    if (!fnPreRefreshSummary_Child_CUSTOM()) {
                        return false;
                    }
                }
                else if (functionOrigin == "CUSTOM") {
                    if (!fnPreRefreshSummary_Child_CUSTOM()) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
    }
    return true;
}

function fnPreRefreshSummary_KERNEL() {
    return true;
}

function fnPreRefreshSummary_CLUSTER() {
    return true;
}

function fnPreRefreshSummary_CUSTOM() {
    return true;
}

function fnPreRefreshSummary_Child_KERNEL() {
    return true;
}

function fnPreRefreshSummary_Child_CLUSTER() {
    return true;
}

function fnPreRefreshSummary_Child_CUSTOM() {
    return true;
}

function ShowXMLTab(xmlFile, xslName, scrnName, cid) {//12.1 Caching Tab load start
    var imagePath = 'Images/Ext' + strTheme.substring(0, strTheme.indexOf('.css'));
    var html;
    var xmlDoc;
    var applicationName = mainWin.applicationName;
    var dispSize = mainWin.dispSize;
    var XslLabels = fnBuildXslLabels();
	var globalVariables = fnBuildGlobalVar();//12.0.3 Defaulting global variables
    xmlDoc = loadXMLFile(xmlFile);
    if (typeof (screenType) != "undefined") {
        if (screenType == "WB") {
            xmlDoc = embeddcall(xmlDoc);
        }
    }
    var xslDoc = loadXSLFile(mainWin.loadXSL(xslName));
    if (scrnName != "CVS_ADVANCED") {
        g_scrType = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/@TMP_SCR_TYPE"));
        subScrHeaderTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/HEADER/TAB/@ID"));
        subScrBodyTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/BODY/TAB/@ID"));
    } else {
        g_scrType = "M";
    }
    var params = new Array();
    params["screen"] = scrnName;
    params["uiXML"] = uiXML;
    params["imgPath"] = imagePath;
    params["displaySize"] = dispSize;
    params["thirdChar"] = thirdChar;
    params["XslLabels"] = XslLabels;
	params["globalVariables"] = globalVariables;//12.0.3 Defaulting global variables
    params["applicationName"] = applicationName;
	params["largeScreenWidth"] = mainWin.x;
	params["mediumScreenWidth"] = mainWin.dashBoardWidth;
	params["screenHeight"] = mainWin.y;
    if (thirdChar == "S") params["functionId"] = parentFunc;
    else params["functionId"] = functionId;
    params["CurTabId"] = cid;
    try {
        getDashboardParams(params);
    } catch (e) {}

    html = transform(xmlDoc, xslDoc, params);
    gXmlFileName = xmlFile;
    gScreenName = scrnName;
    gXslFileName = xslName;
    return html;
}//12.1 Caching Tab load end

//mbean changes starts
function setActionTime(inTime, functionId, action) {

    if (mainWin.mBean_required == "N")
        return;
    var t = getDateObject();
    var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    if (inTime) {
        var outTime = time;
        mainWin.fnPopulateMbeanData(inTime, outTime, functionId, action);
    }
    else {
        return t;
    }
}
//mbean changes ends
//fix for 20862806 starts
function fnCreateOnchangeEvent(element) {
 try {
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        element.dispatchEvent(evt);
        }else {
            element.fireEvent("onchange");
        }
    }catch(e) {
            
    }
}
//fix for 20862806 ends