/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadAccessChild.js
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
function startDrag(target, e) {
    var evt = window.event || e;
    var divObj = parent.document.getElementById(target);
    if (parent.document.getElementById("ChildWin")) {
    }
    else {
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
        if (parent.document.getElementById("WNDtitlebar") != null) {
            tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight *  - 1;
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

function fnAccessChildScreens(e) {
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (e.keyCode == 9 && !e.shiftKey && srcElement.id == "Cancel") {
        document.getElementById("WINCLOSE").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return false;
    }
    else if (e.keyCode == 9 && e.shiftKey && srcElement.id == "WINCLOSE") {
        document.getElementById("Cancel").focus();
        fnDisableBrowserKey(e);
        preventpropagate(e);
        return false;
    }
    else if (e.keyCode == 27) {
        fnRADExitSub('ChildWin', e);
        return false;
    }
    else if ((e.keyCode == 37 || e.keyCode == 39) && (srcElement.id.indexOf("TAB_DIV") == 0)) {
        var tabs = srcElement.parentNode.parentNode.getElementsByTagName("A");
        for (var t = 0;t < tabs.length;t++) {
            if (tabs[t].id == srcElement.id) {
                if (e.keyCode == 37) {
                    if (t == 0)
                        return;
                    FnShowTabs(tabs[t - 1].id.substring(4, tabs[t - 1].id.length));
                    document.getElementById(tabs[t - 1].id).focus();
                    return;
                }
                else if (e.keyCode == 39) {
                    if (t == tabs.length)
                        return;
                    FnShowTabs(tabs[t + 1].id.substring(4, tabs[t + 1].id.length));
                    document.getElementById(tabs[t + 1].id).focus();
                    return;
                }
            }
        }

    }
    if (e.keyCode == 120) {
        if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') {
            if (typeof (srcElem.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
                srcElem.parentNode.getElementsByTagName("BUTTON")[0].click();
            }
        }
    }
    else if (e.keyCode == 113) {
        parent.switchWindows();
        fnDisableBrowserKey(e);
        disableCommonKeys(e);
        return;
    }
    else if (e.ctrlKey == true && e.keyCode == 87) {
        fnRADExitAll(seqNo, e);
        disableCommonKeys(e);
        return;
    }
    else if (e.keyCode == 9 && e.shiftKey == true || (e.keyCode == 13) || (e.keyCode == 32) || (e.keyCode == 123) || (e.keyCode == 9)) {
    }
    else if ((e.keyCode == 37 && e.altKey == true) || (e.keyCode == 36 && e.altKey == true)) {
        fnDisableBrowserKey(e);
        disableCommonKeys(e);
        return;
    }
    else {
        disableCommonKeys(e);
        return;
    }
    return true;
}

function fnRADExitSub(target, e) {
    parent.unmask();
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (srcElement.disabled)
        return;
    if (parent.gen_gwinFuncId == "RDDVWCHG" || parent.gen_gwinFuncId == "RDDFNCGN" || parent.gen_gwinFuncId == "RDDGIMNT" || parent.gen_gwinFuncId == "RDDSCRDF") {
        if (parent.document.getElementById("saveRADXml").disabled == false)
            parent.document.getElementById("saveRADXml").focus();
        else 
            parent.document.getElementsByTagName("A")[0].focus();
    }
    try {
        if (parent.popTextObj)
            parent.popTextObj.focus();
    }
    catch (e) {
    }
    var winObj = document.getElementById(target);
    fnExitSub();
    fnDisableBrowserKey(e);
    preventpropagate(e);
}

function fnExitSub() {
    var winDivObj = parent.document.getElementById("ChildWin");
    if (winDivObj) {
        winDivObj.children[0].src = "";
        parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
    }
}