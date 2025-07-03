/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadGiAccessibility.js
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
    if (Preobjec != "") {
        var screenlen = document.getElementById(formName).getElementsByTagName("*").length;
        var Tdlen = document.getElementById(formName).getElementsByTagName("TD");
        var INputlen = document.getElementById(formName).getElementsByTagName("INPUT");
        var frmca = document.getElementById("FORMAT_CATEGORY").value;
        if (frmca == "O") {
            frmca = "OUT";
            frmca1 = "Records";
        }
        else {
            frmca = "IN";
            frmca1 = "Blocks";
        }
        var frmcafld = "";
        if (evnt.shiftKey == true && evnt.keyCode == 9) {
            if (srcElement.id == "RADGIINDEXCLOSE") {
                if (Tdlen.length >= 1) {
                    frmcafld = Tdlen[Tdlen.length - 1].id;
                    frmcafld = frmcafld.replace("OUT", frmca);
                    frmcafld = frmcafld.replace("IN", frmca);
                    frmcafld = frmcafld.replace("Records", frmca1);
                    frmcafld = frmcafld.replace("Blocks", frmca1);
                    document.getElementById(frmcafld).focus();
                    fnDisableBrowserKey(e);
                    preventpropagate(e);
                    return;
                }
                else if (INputlen.length >= 1) {
                    INputlen[INputlen.length - 1].focus();
                    fnDisableBrowserKey(e);
                    preventpropagate(e);
                    return;
                }
            }
        }
        else if (evnt.keyCode == 9) {
            if (srcElement.id.substring(srcElement.id.length - 3, srcElement.id.length) == "_TE") {
                document.getElementById("RADGIINDEXCLOSE").focus();
                fnDisableBrowserKey(e);
                preventpropagate(e);
                return;
            }
            if (Tdlen.length >= 1) {
                if (srcElement.id == Tdlen[Tdlen.length - 1].id) {
                    document.getElementById("RADGIINDEXCLOSE").focus();
                    fnDisableBrowserKey(e);
                    preventpropagate(e);
                    return;
                }
            }
            else {
                if (srcElement.id == INputlen[INputlen.length - 1].id && INputlen.length >= 1) {
                    document.getElementById("RADGIINDEXCLOSE").focus();
                    fnDisableBrowserKey(e);
                    preventpropagate(e);
                    return;
                }
            }
        }
    }
    if (evnt.keyCode == 120) {
        if (srcElement.tagName == "INPUT" && srcElement.type.toUpperCase() == 'TEXT') {
            if (typeof (srcElement.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
                srcElement.parentNode.getElementsByTagName("BUTTON")[0].click();
            }
        }
    }
    if (evnt.keyCode == 9 && srcElement.id == "TSUM" && evnt.shiftKey == false) {
        document.getElementById("RADGIINDEXCLOSE").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return;
    }
    if (evnt.keyCode == 9 && evnt.shiftKey == true && srcElement.id == "RADGIINDEXCLOSE") {
        document.getElementById("ACTION").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return;
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
        fnDisableBrowserKey(e);
        disableCommonKeys(evnt);
        return;
    }
    else {
        disableCommonKeys(evnt);
        return;
    }

}