/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadPreviewHelp.js
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
var functionId = "";

function shortcut() {
    if (event.keyCode == 120)
        if (event.srcElement.tagName == "INPUT" && event.srcElement.type.toUpperCase() == 'TEXT')
            if (typeof (event.srcElement.parentElement.getElementsByTagName("BUTTON")[0]) != 'undefined')
                event.srcElement.parentElement.getElementsByTagName("BUTTON")[0].click();

    f1Help();
}

function disableDefault() {
    event.returnValue = false;
    return false;
}

function f1Help() {
    var elem = event.srcElement;
    var docelem = document.activeElement;
    var blkname;
    var colname;
    var id;
    if (elem.className == "BTNfooter" || elem.className == "BTNfooterH" || elem.parentElement.parentElement.tagName == "TD") {
        return;
    }
    if (elem.tagName == "DIV") {
        for (var i = 0;i < elem.childNodes.length;i++) {
            if (elem.childNodes[i].tagName == 'LABEL') {
                if (elem.childNodes[i].childNodes.length != 0 && elem.childNodes[i].childNodes.length != 1) {
                    elem = elem.childNodes[i];
                }
            }
            if ((elem.childNodes[i].tagName == "INPUT") || (elem.childNodes[i].tagName == "SELECT") || (elem.childNodes[i].tagName == "TEXTAREA")) {
                elem = elem.childNodes[i];
                id = elem.id;
                break;
            }
        }
        blkname = elem.DBT;
        colname = elem.DBC;
        if (colname != "" && typeof (colname) != "undefined") {
            var filetoOpen = functionId + "." + blkname + "." + colname;
            showDbt_dbc(filetoOpen);
            return;
        }
        else {
            return;
        }
    }
    if ((event.srcElement.tagName != "INPUT") && (event.srcElement.tagName != "SELECT") && (event.srcElement.tagName != "CHECKBOX") && (event.srcElement.tagName != "RADIO") && (event.srcElement.tagName != "TEXTAREA")) {
        return;
    }
    var elem = event.srcElement.id;
    if (elem.indexOf("cmd") != "-1") {
        return;
    }
    var objtbl;

    if (elem == "") {
        objtbl = document.activeElement;
        var count = 0;
        if ((objtbl.tagName != "INPUT") && (objtbl.tagName != "SELECT") && (objtbl.tagName != "CHECKBOX") && (objtbl.tagName != "RADIO") && (objtbl.tagName != "TEXTAREA")) {
            return;
        }
        while (objtbl.tagName != "TABLE") {
            objtbl = objtbl.parentElement;
            if (objtbl.tagName == "DIV") {
                count = count + 1;
            }
            if (count > 2) {
                blkname = document.activeElement.parentElement.parentElement.id;
                colname = document.activeElement.name;
                var filetoOpen = functionId + "." + blkname + "." + colname;
                showDbt_dbc(filetoOpen);
                return;
            }
            if (objtbl.tagName == "HTML") {
                return;
            }
        }
        blkname = objtbl.id;
        colname = document.activeElement.name;
    }
    else {
        blkname = document.activeElement.DBT;
        colname = document.activeElement.name;
    }

    if (event.srcElement.id.substring(0, 2) == "__") {
        if ((document.activeElement.parentElement.parentElement.tagName == "TD") || (document.activeElement.parentElement.parentElement.tagName == "TR")) {
            objtbl = document.activeElement;
            if ((objtbl.tagName != "INPUT") && (objtbl.tagName != "SELECT") && (objtbl.tagName != "CHECKBOX") && (objtbl.tagName != "RADIO") && (objtbl.tagName != "TEXTAREA")) {
                return;
            }
            while (objtbl.tagName != "TABLE") {
                objtbl = objtbl.parentElement;
                if (objtbl.tagName == "HTML") {
                    return;
                }
            }
            blkname = objtbl.id;
            colname = document.activeElement.previousSibling.name;

        }
    }
    if ((document.activeElement.parentElement.parentElement.tagName != "TD") && (document.activeElement.parentElement.parentElement.tagName != "TR")) {
        if (document.activeElement.previousSibling) {
            if (document.activeElement.previousSibling.id + "I" == document.activeElement.id) {
                var elemD = event.srcElement.previousSibling;
                blkname = elemD.DBT;
                colname = elemD.DBC;
            }
        }
    }
    if (colname == "") {
        return;
    }
    var filetoOpen = functionId + "." + blkname + "." + colname;
    showDbt_dbc(filetoOpen);
}

function showDbt_dbc(currobject) {
    if (typeof (currobject) != "undefined") {
        var name = currobject;
        var winParams = new Object();
        winParams.mainWin = top.window;
        if (name != "") {
            name = name.toLowerCase();
            var newWin = parent.showModelessDialog("HELP/" + name + ".htm", winParams, "center:yes; dialogHeight:350px; dialogWidth:500px; help:yes; resizable:yes; scroll:yes; status:no");
            window.focus();
        }
        else {
            alertMessage(top.frames["Global"].getItemDesc("LBL_HELP_AVAILABLE"), "I");
        }
    }
}