/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadAccessibility.js
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
    var formName = "";
    var xpath = "";
    var xpathvalues = new Array();
    try {
        xpathvalues = getNodepath(Preobjec);
        xpath = xpathvalues[0];
        formName = xpathvalues[1];
    }
    catch (e) {
    }
    var l_TableObj = document.getElementById(blockId).tBodies[0];
    if (evnt.keyCode == 36 && evnt.ctrlKey == true && obj.getAttribute("PARENT") == "YES") {
        try {
            document.getElementById(blockId + "_ME").getElementsByTagName("BUTTON")[0].focus();
        }
        catch (e) {
        }
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
        addNewRow(blockId);
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
    if (((evnt.keyCode == 13) || (evnt.keyCode == 32) || (evnt.keyCode == 40) || (evnt.keyCode == 39) || (evnt.keyCode == 38) || (evnt.keyCode == 37)) && evnt.altKey == false) {
        fnHandleGridtbls(blockId, evnt);
    }
}

function fnHandleGridtbls(tablename, e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById(tablename).tBodies[0].rows;
    if ((evnt.keyCode == 13 || evnt.keyCode == 32) && getPreviousSibling(srcElement.parentNode) == null && document.getElementById(tablename).getAttribute("PARENT") == "NO") {
        if (selected != "LFM" && selected != "CFM")
            getNodeDetails(selected + "~" + srcElement.value);
        return;
    }
    if (evnt.keyCode == 40) {
        for (var i = 0;i < l_TableObj.length;i++) {
            var tblCells = l_TableObj[i].cells;
            for (var j = 0;j < tblCells.length;j++) {
                if (tblCells[j].children[0] == srcElement && srcElement.tagName != "SELECT") {
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
                    if (l_TableObj[i - 1] != undefined && srcElement.tagName != "SELECT") {
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
    var evnt = window.event || e;
    var srcElem = e.srcElement || e.target;
    var srcElement = getEventSourceElement(evnt);
    var type = srcElem.type;
    if (Preobjec != "") {
        var screenlen = document.getElementById(formName).getElementsByTagName("*").length;
        var Tdlen = document.getElementById(formName).getElementsByTagName("TD");
        var INputlen = document.getElementById(formName).getElementsByTagName("INPUT");

        if (evnt.shiftKey == true && evnt.keyCode == 9) {
            if (srcElement.id == "RADINDEXCLOSE") {
                if (formName == "SUM" || formName == "BFD") {
                    var tablist = "DIV_DBF~DIV_CB~DIV_SUMORDER~DIV_EVENTS~DIV_CUST_ATTRS~DIV_BIND_VRBLS~DIV_RTN_FLD~DIV_OFF_LINE_BIND_VRBLS~DIV_OFF_LINE_RTN_FLD~DIV_DASHBOARD_LINK~DIV_AMOUNTTAB~DIV_PATTERNS~DIV_MENUTABLS~DIV_BLKFLDS";
                    tablist = tablist.split('~');
                    for (var i = 0;i < tablist.length;i++) {
                        if (document.getElementById(tablist[i]).style.display == "block") {
                            Tdlen = document.getElementById(tablist[i]).getElementsByTagName("TD");
                        }
                    }
                }
                var frm1 = Preobjec.split("~")[Preobjec.split("~").length - 1];
                if (frm1 == "HEADER" || frm1 == "BODY" || frm1 == "FOOTER") {
                    document.getElementById(frm1).getElementsByTagName("BUTTON")[0].focus();
                    fnDisableBrowserKey(evnt);
                    preventpropagate(evnt);
                    return;
                }
                if (Tdlen.length >= 1) {
                    Tdlen[Tdlen.length - 1].focus();
                    fnDisableBrowserKey(evnt);
                    preventpropagate(evnt);
                    return;
                }
                else if (INputlen.length >= 1) {
                    INputlen[INputlen.length - 1].focus();
                    fnDisableBrowserKey(evnt);
                    preventpropagate(evnt);
                    return;
                }
            }
        }
        else if (evnt.keyCode == 9) {
            if (srcElement.id.indexOf("TAB_DIV") == 0) {
                var tabs = srcElement.parentNode.parentNode.getElementsByTagName("A");
                for (var t = 0;t < tabs.length;t++) {
                    if (document.getElementById(tabs[t].id.substring(4, tabs[t].id.length)).style.display == "block") {
                        document.getElementById(tabs[t].id.substring(4, tabs[t].id.length)).getElementsByTagName("BUTTON")[0].focus();
                        //document.getElementById("RADINDEXCLOSE").focus();
                        fnDisableBrowserKey(evnt);
                        preventpropagate(evnt);
                        return;
                    }
                }
            }
            var frm1 = Preobjec.split("~")[Preobjec.split("~").length - 1];
            if (frm1 == "HEADER" || frm1 == "BODY" || frm1 == "FOOTER") {
                if (srcElement.id == document.getElementById(frm1).getElementsByTagName("BUTTON")[0].id) {
                    document.getElementById("RADINDEXCLOSE").focus();
                    fnDisableBrowserKey(evnt);
                    preventpropagate(evnt);
                    return;
                }
            }
            if (srcElement.id.substring(srcElement.id.length - 3, srcElement.id.length) == "_TE") {
                document.getElementById("RADINDEXCLOSE").focus();
                fnDisableBrowserKey(evnt);
                preventpropagate(evnt);
                return;
            }
            if (Tdlen.length >= 1) {
                if (srcElement.id == Tdlen[Tdlen.length - 1].id) {
                    document.getElementById("RADINDEXCLOSE").focus();
                    fnDisableBrowserKey(evnt);
                    preventpropagate(evnt);
                    return;
                }
            }
            else {
                if (srcElement.id == INputlen[INputlen.length - 1].id && INputlen.length >= 1) {
                    document.getElementById("RADINDEXCLOSE").focus();
                    fnDisableBrowserKey(evnt);
                    preventpropagate(evnt);
                    return;
                }
            }
        }
        else if ((evnt.keyCode == 37 || evnt.keyCode == 39) && (srcElement.id.indexOf("TAB_DIV") == 0)) {
            var tabs = srcElement.parentNode.parentNode.getElementsByTagName("A");
            for (var t = 0;t < tabs.length;t++) {
                if (tabs[t].id == srcElement.id) {
                    if (evnt.keyCode == 37) {
                        if (t == 0)
                            return;
                        FnShowTabs(tabs[t - 1].id.substring(4, tabs[t - 1].id.length));
                        document.getElementById(tabs[t - 1].id).focus();
                        return;
                    }
                    else if (evnt.keyCode == 39) {
                        if (t == tabs.length - 1 || document.getElementById(tabs[t + 1].parentNode.id).style.display == "none")
                            return;
                        FnShowTabs(tabs[t + 1].id.substring(4, tabs[t + 1].id.length));
                        document.getElementById(tabs[t + 1].id).focus();
                        return;
                    }
                }
            }

        }
    }
    else if (evnt.keyCode == 9 && srcElement.id == "TSUM" && evnt.shiftKey == false) {
        document.getElementById("RADINDEXCLOSE").focus();
        fnDisableBrowserKey(evnt);
        preventpropagate(evnt);
        return;
    }
    else if (evnt.keyCode == 9 && evnt.shiftKey == true && srcElement.id == "RADINDEXCLOSE") {
        document.getElementById("TSUM").focus();
        fnDisableBrowserKey(evnt);
        preventpropagate(evnt);
        return;
    }
    if (evnt.keyCode == 120) {
        if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') {
            if (typeof (srcElem.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
                srcElem.parentNode.getElementsByTagName("BUTTON")[0].click();
            }
        }
    }
    if ((evnt.keyCode == 13 || evnt.keyCode == 32)) {
        if (srcElem.id == "RADINDEXCLOSE" || srcElem.id == "RADINDEXCLOSE") {
            fnRADExitAll(seqNo, evnt);
            return false;
        }
        else if (srcElem.id == "RADINDEXMINIMIZE" || srcElem.id == "RADINDEXMINIMIZE") {
            fnMinimize(seqNo, evnt);
            return false;
        }
    }
    if (evnt.altKey == true && evnt.keyCode == 70) {
        if (document.getElementById("FIND")) {
            document.getElementById("FIND").focus();
            return;
        }
    }
    else if (evnt.altKey == true && evnt.keyCode == 72) {
        if (document.getElementById("ACTION").value == "NONE") {
            if (document.getElementById("missingLabels"))
                document.getElementById("missingLabels").focus();
            return;
        }
        else if (document.getElementById("saveRADXml")) {
            document.getElementById("saveRADXml").focus();
            return;
        }
    }
    else if (evnt.altKey == true && evnt.keyCode == 77 && Preobjec != "") {
        var frm1 = Preobjec.split("~")[Preobjec.split("~").length - 1];
        if (frm1 == "HEADER" || frm1 == "BODY" || frm1 == "FOOTER")
            document.getElementById(frm1).getElementsByTagName("BUTTON")[0].focus();
        else 
            document.getElementById(formName).getElementsByTagName("BUTTON")[0].focus();
        return;
    }
    else if (evnt.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        }
        else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    else if (evnt.keyCode == 13) {
        if (typeof (type) == "undefined") {
            return false;
        }
        else if ((type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "BUTTON") || srcElem.readOnly) {
            return false;
        }
    }
    else if (evnt.keyCode == 118) {
        //F7 for Entering Query
        if (parent.gwinFuncId == 'RDDUSRDF' || parent.gwinFuncId == 'RDDENVDF' || parent.gwinFuncId == 'RDDRELDF' || parent.gwinFuncId == 'TCDMASTR' || parent.gwinFuncId == 'TCDRCMST' || parent.gwinFuncId == 'TCDRNREQ' || parent.gwinFuncId == 'TCDRCEXC' || parent.gwinFuncId == 'RDDNFTRG') {
            fnEnterQuery();
        }
    }
    else if (evnt.keyCode == 119) {
        //F8 to Execute Query
        if (parent.gwinFuncId == 'RDDUSRDF' || parent.gwinFuncId == 'RDDENVDF' || parent.gwinFuncId == 'RDDRELDF' || parent.gwinFuncId == 'RDSRELDF' || parent.gwinFuncId == 'RDSENVDF' || parent.gwinFuncId == 'RDSUSRDF' || parent.gwinFuncId == 'TCDMASTR' || parent.gwinFuncId == 'TCSMASTR' || parent.gwinFuncId == 'TCDRCMST' || parent.gwinFuncId == 'TCSRCMST' || parent.gwinFuncId == 'TCDRNREQ' || parent.gwinFuncId == 'TCDRNREQ' || parent.gwinFuncId == 'TCDRCEXC' || parent.gwinFuncId == 'TCSRCEXC' || parent.gwinFuncId == 'RDDNFTRG') {
            fnExecuteQuery(evnt);
        }
    }
    else if (evnt.ctrlKey == true && evnt.keyCode == 83) {
        // Ctrl+s for Save
        if (parent.gwinFuncId == 'RDDFNCGN') {
            if (document.getElementById("saveRADXml")) {
                if (!(document.getElementById("saveRADXml").disabled)) {
                    disableCommonKeys(evnt);
                    storeXml();
                }
            }
            evnt.returnValue = false;
        }
        else if (parent.gwinFuncId == 'RDDNFTRG') {
            if (document.getElementById("save")) {
                if (!(document.getElementById("save").disabled)) {
                    disableCommonKeys(evnt);
                    fnSaveTrg();
                }
            }
            evnt.returnValue = false;
        }
        else if (parent.gwinFuncId == 'RDDGIMNT') {
            saveGIxml('0', '');
        }
        else {
            disableCommonKeys(evnt);
            fnSave();
            return false;
        }
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
    else if (evnt.keyCode == 9 && evnt.shiftKey == true || (evnt.keyCode == 13) || (evnt.keyCode == 32) || (evnt.keyCode == 123) || (evnt.keyCode == 9)) {
    }
    else if ((evnt.keyCode == 37 && evnt.altKey == true) || (evnt.keyCode == 36 && evnt.altKey == true)) {
        fnDisableBrowserKey(evnt);
        disableCommonKeys(evnt);
        return;
    }
    else {
        disableCommonKeys(evnt);
        return;
    }

}

function f1Help(e) {
    var l_functionId = parent.gwinFuncId;
    var evnt = window.event || e;
    var scrElem = getEventSourceElement(evnt);
    var filetoOpen = l_functionId + "__" + scrElem.id;
    showDbt_dbc(filetoOpen, scrElem.id);
    fnDisableBrowserKey(evnt);
    return;
}