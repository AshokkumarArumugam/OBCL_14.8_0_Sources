/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadInfraAccess.js
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
  Created By         :  Vivek Aggarwal
  Change Description :  To add Accessibilty Functionality
  
  -------------------------------------------------------------------------------------------------------
*/
function FnAcessTblkeys(obj, e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var blockId = obj.id;
    var activeElement = "";
    var l_TableObj = document.getElementById(blockId).tBodies[0];
    if (evnt.keyCode == 36 && evnt.ctrlKey == true && obj.getAttribute("PARENT") == "YES") {
        document.getElementById(blockId + "_ME").focus();
    }
    else if (evnt.keyCode == 35 && evnt.ctrlKey == true) {
        try {
            document.getElementById(blockId + "_TE").focus();
        }
        catch (e) {
            document.getElementById(blockId).tFoot.getElementsByTagName("TD")[0].focus();
        }
    }
    else if (evnt.ctrlKey == true && evnt.keyCode == 45 && obj.getAttribute("PARENT") == "YES") {
        fnDisableBrowserKey(evnt);
        try {
            evnt.keyCode = 0;
        }
        catch (e) {
        }
        evnt.cancelBubble = true;
        addNewRow1(blockId, true);
        fnCheckToggleChkBox(blockId);
        checkAnFocusSelectedRow(blockId);
        return false;
    }
    else if (evnt.ctrlKey == true && evnt.keyCode == 46 && obj.getAttribute("PARENT") == "YES") {
        fnDisableBrowserKey(evnt);
        try {
            evnt.keyCode = 0;
        }
        catch (e) {
        }
        evnt.cancelBubble = true;
        delRow(blockId);
        fnCheckToggleChkBox(blockId);
        checkAnFocusSelectedRow(blockId);
        return false;
    }
    if (((evnt.keyCode == 13) || (evnt.keyCode == 32) || (evnt.keyCode == 40) || (evnt.keyCode == 39) || (evnt.keyCode == 38) || (evnt.keyCode == 37)) && obj.tagName == "TABLE" && evnt.altKey == false) {
        fnHandleGridtbls(blockId, evnt);
    }
}

function fnHandleGridtbls(tablename, e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById(tablename).tBodies[0].rows;
    if (evnt.keyCode == 40) {
        for (var i = 0;i < l_TableObj.length;i++) {
            var tblCells = l_TableObj[i].cells;
            for (var j = 0;j < tblCells.length;j++) {
                if (tblCells[j].children[0] == srcElement) {
                    if (l_TableObj[i + 1] != undefined)
                        l_TableObj[i + 1].cells[j].children[0].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }
        }
    }
    else if (evnt.keyCode == 38) {
        for (var i = 0;i < l_TableObj.length;i++) {
            var tblCells = l_TableObj[i].cells;
            for (var j = 0;j < tblCells.length;j++) {
                if (tblCells[j].children[0] == srcElement) {
                    if (l_TableObj[i - 1] != undefined) {
                        l_TableObj[i - 1].cells[j].children[0].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    }
    else if (evnt.keyCode == 39) {
        activeElement = document.activeElement;
        if (getNextSibling(activeElement.parentNode) != null) {
            getNextSibling(activeElement.parentNode).children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
    else if (evnt.keyCode == 37) {
        activeElement = document.activeElement;
        if (getPreviousSibling(activeElement.parentNode) != null) {
            getPreviousSibling(activeElement.parentNode).children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
}

function getRow(l_TableObj) {
    var rowNo = "";
    var ele = "";
    for (var j = 0;j < l_TableObj.rows.length;j++) {
        if (l_TableObj.rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            rowNo = j;
        }
    }
    return rowNo;
}

function fnCheckToggleChkBox(blockId, e) {
    var evnt, srcElem;
    if (e) {
        evnt = window.event || e;
        srcElem = getEventSourceElement(evnt);
    }
    var l_length = document.getElementById(blockId).tBodies[0].rows.length;
    document.getElementById(blockId).checked = false;
    if (l_length == 1) {
        document.getElementById(blockId).tBodies[0].rows[0].cells[0].children[0].checked = true;
        return;
    }

    var chkLen = 0;
    for (var chk = 0;chk < document.getElementById(blockId).rows.length;chk++) {
        if (document.getElementById(blockId).rows[chk].cells[0].children[0].checked) {
            chkLen++;
        }
    }
    if (chkLen != Number(document.getElementById(blockId).rows.length) - 1) {
        document.getElementById(blockId).checked = false;
    }
    else {
        if (document.getElementById(blockId).rows.length > 1) {
            document.getElementById(blockId).checked = true;
        }
    }
}

function checkAnFocusSelectedRow(blockId) {
    var l_tableObj = document.getElementById(blockId);
    for (var j = 0;j < l_tableObj.tBodies[0].rows.length;j++) {
        if (l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].focus();
            return;
        }
    }
}

function shortcut(e) {
    var event = window.event || e;
    var srcElem = e.srcElement || e.target;
    var type = srcElem.type;
    if ((event.keyCode == 37 && event.altKey == true) || (event.keyCode == 36 && event.altKey == true)) {
        fnDisableBrowserKey(event);
        disableCommonKeys(event);
        return;
    }
    if (event.shiftKey == true && event.keyCode == 9) {
        if (srcElem.id == "INFRA_Cls" || srcElem.id == "header_Cls") {
            document.getElementById("Cls").focus();
            fnDisableBrowserKey(event);
            preventpropagate(event);
            return;
        }
    }
    else if (event.keyCode == 9 && srcElem.id == "Cls") {

        if (document.getElementById("INFRA_Cls"))
            document.getElementById("INFRA_Cls").focus();
        else 
            document.getElementById("header_Cls").focus();
        fnDisableBrowserKey(event);
        preventpropagate(event);
        return;

    }
    else if ((event.keyCode == 13 || event.keyCode == 32)) {
        if (srcElem.id == "INFRA_Cls" || srcElem.id == "header_Cls") {
            fnRADExitAll(seqNo, event);
            return false;
        }
        else if (srcElem.id == "INFRA_Min" || srcElem.id == "header_Min") {
            fnMinimize(seqNo, event);
            return false;
        }
    }
    if (event.keyCode == 120) {
        if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') {
            if (typeof (srcElem.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
                srcElem.parentNode.getElementsByTagName("BUTTON")[0].click();
            }
        }
    }
    FnpaginationAccessKeys(event);
    if (event.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        }
        else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    if (e.keyCode == 13) {
        if (typeof (type) == "undefined") {
            return false;
        }
        else if ((type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "BUTTON") || srcElem.readOnly) {
            return false;
        }
    }
    if (event.keyCode == 118) {
        //F7 for Entering Query
        if (parent.gwinFuncId == 'RDDUSRDF' || parent.gwinFuncId == 'RDDENVDF' || parent.gwinFuncId == 'RDDRELDF' || parent.gwinFuncId == 'TCDMASTR' || parent.gwinFuncId == 'TCDRCMST' || parent.gwinFuncId == 'TCDRNREQ' || parent.gwinFuncId == 'TCDRCEXC' || parent.gwinFuncId == 'RDDNFTRG') {
            fnEnterQuery();
        }
    }
    else if (event.keyCode == 119) {
        //F8 to Execute Query
        if (parent.gwinFuncId == 'RDDUSRDF' || parent.gwinFuncId == 'RDDENVDF' || parent.gwinFuncId == 'RDDRELDF' || parent.gwinFuncId == 'RDSRELDF' || parent.gwinFuncId == 'RDSENVDF' || parent.gwinFuncId == 'RDSUSRDF' || parent.gwinFuncId == 'TCDMASTR' || parent.gwinFuncId == 'TCSMASTR' || parent.gwinFuncId == 'TCDRCMST' || parent.gwinFuncId == 'TCSRCMST' || parent.gwinFuncId == 'TCDRNREQ' || parent.gwinFuncId == 'TCDRNREQ' || parent.gwinFuncId == 'TCDRCEXC' || parent.gwinFuncId == 'TCSRCEXC' || parent.gwinFuncId == 'RDDNFTRG') {
            fnExecuteQuery(event);
        }
    }
    else if (event.ctrlKey == true && event.keyCode == 78) {
        // Ctrl+n for New 
        if (document.getElementById("new")) {
            if (!(document.getElementById("new").disabled)) {
                document.getElementById("new").focus();
            }
        }
        fnDisableBrowserKey(event);
        return false;
    }
    else if (event.ctrlKey == true && event.keyCode == 83) {
        // Ctrl+s for Save
        if (parent.gwinFuncId == 'RDDFNCGN') {
            if (document.getElementById("saveRADXml")) {
                if (!(document.getElementById("saveRADXml").disabled)) {
                    storeXml();
                }
            }
            event.returnValue = false;
        }
        else if (parent.gwinFuncId == 'RDDNFTRG') {
            if (document.getElementById("save")) {
                if (!(document.getElementById("save").disabled)) {
                    fnSaveTrg();
                }
            }
            event.returnValue = false;
        }
        else if (parent.gwinFuncId == 'RDDGIMNT') {
            saveGIxml('0', '');
        }
        else {
            if (!(document.getElementById("save").disabled))
                fnSave();
        }
        fnDisableBrowserKey(event);
        return false;
    }
    else if (event.keyCode == 37 || event.keyCode == 39 && (srcElem.id.indexOf("TAB_DIV_") == 0)) {
        var tabs = srcElem.parentNode.parentNode.getElementsByTagName("A");
        for (var t = 0;t < tabs.length;t++) {
            if (tabs[t].id == srcElem.id) {
                if (event.keyCode == 37) {
                    if (t == 0)
                        return;
                    document.getElementById(tabs[t - 1].id).focus();
                    FnShowTabs1(tabs[t - 1].id.substring(4, tabs[t - 1].id.length));
                    return;
                }
                else if (event.keyCode == 39) {
                    if (t == tabs.length - 1)
                        return;
                    document.getElementById(tabs[t + 1].id).focus();
                    FnShowTabs1(tabs[t + 1].id.substring(4, tabs[t + 1].id.length));
                    return;
                }
            }
        }
    }
    else if (event.keyCode == 113) {
        parent.switchWindows();
        fnDisableBrowserKey(event);
        disableCommonKeys(event);
        return;
    }
    else if (event.ctrlKey == true && event.keyCode == 87) {
        fnRADExitAll(seqNo, event);
        disableCommonKeys(event);
        return;
    }
    else if (event.keyCode == 9 && event.shiftKey == true || (event.keyCode == 13) || (event.keyCode == 32) || (event.keyCode == 123) || (event.keyCode == 9)) {
    }
    else {
        disableCommonKeys(event);
        return;
    }

}

function FnShowTabs1(divid) {

    var tablist = "DIV_fcXml~DIV_wsXml~DIV_requestXml~DIV_responseXml";
    tablist = tablist.split('~');
    for (var i = 0;i < tablist.length;i++) {
        if (document.getElementById(tablist[i]) != null) {
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
    document.getElementById("TAB_" + divid).focus();

}

function f1Help(e) {
    var l_functionId = parent.gwinFuncId;
    var e = window.event || e;
    var scrElem = getEventSourceElement(e);
    var filetoOpen = l_functionId + "__" + scrElem.id;
    showDbt_dbc(filetoOpen, scrElem.id);
    fnDisableBrowserKey(e);
    return;
}

function FnpaginationAccessKeys(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (parent.gwinFuncId.substring(3, 2) == "S") {
        if (evnt.keyCode == 8) {
            if (srcElement.tagName.toUpperCase() == 'INPUT') {
                return true;
            }
            else {
                fnDisableBrowserKey(evnt);
                preventpropagate(evnt);
                try {
                    evnt.keyCode = 0;
                }
                catch (e) {
                }
                return false;
            }
        }
        else if (evnt.keyCode == 33 && evnt.ctrlKey == false && evnt.altKey == false) {
            if (document.getElementsByName("navPrev")[0].disabled == false)
                doNavigate1(gcNAV_PREVIOUS, e);
        }
        else if (evnt.keyCode == 34 && evnt.ctrlKey == false && evnt.altKey == false) {
            if (document.getElementsByName("navNext")[0].disabled == false)
                doNavigate1(gcNAV_NEXT, e);
        }
        else if (evnt.keyCode == 35 && evnt.ctrlKey == false && evnt.altKey == false) {
            doNavigate1(gcNAV_LAST, e);
        }
        else if (evnt.keyCode == 36 && evnt.ctrlKey == false && evnt.altKey == false) {
            doNavigate1(gcNAV_FIRST, e);
        }
        else if (evnt.keyCode == 113) {
            parent.switchWindows();
            fnDisableBrowserKey(evnt);
            disableCommonKeys(evnt);
            return;
        }
        else if (evnt.ctrlKey == true && evnt.keyCode == 87) {
            fnRADExitAll(seqNo, evnt);
            disableCommonKeys(evnt);
            return;
        }
        else {
            return disableCommonKeys(evnt);
        }
    }
}