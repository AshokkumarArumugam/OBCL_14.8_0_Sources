/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : TabContent.js
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

Copyright © 2007-2011  by Oracle Financial Services Software Limited.. 

---------------------------------------------------------------------------------------------------------*/

function cascadedstyle(el, cssproperty, csspropertyNS) {
    if (el.currentStyle)
        return el.currentStyle[cssproperty]
    else if (window.getComputedStyle) {
        var elstyle = window.getComputedStyle(el, "");
        return elstyle.getPropertyValue(csspropertyNS)
    }
}

var previoustab = "";
var prevTab = "";

function expandcontent(cid, aobject) {
    for (var i = 0;i < tab_arr.length;i++) {
        if (cid == tab_ids[i])
            tablist_curr_id = i;
    }
    prevTab = strCurrentTabID;
    if (document.getElementById) {
        if (!outTab(prevTab)) {
            return;
        }
        highlighttab(aobject);
        detectSourceindex(aobject);
        if (previoustab != "")
            document.getElementById(previoustab).style.display = "none";
        document.getElementById(cid).style.display = "block";
        previoustab = cid;
        if (aobject.blur)
            aobject.blur();
        strCurrentTabID = cid.substring(7);
        inTab(strCurrentTabID);
        return false
    }
    else 
        return true
}

function highlighttab(aobject) {

    if (typeof tabobjlinks == "undefined")
        collecttablinks();
    for (i = 0;i < tabobjlinks.length;i++) {
        tabobjlinks[i].style.backgroundColor = cascadedstyle(tabobjlinks[i], "backgroundColor", "background-color");
        tabobjlinks[i].parentNode.id = "";
    }
    aobject.parentNode.id = "current";
    var themecolor = aobject.getAttribute("theme") ? aobject.getAttribute("theme") : cascadedstyle(tabobjlinks[0], "backgroundColor", "background-color");
    aobject.style.backgroundColor = document.getElementById("tabcontentcontainer").style.backgroundColor = themecolor;
}

function collecttablinks() {
    var tabobj = document.getElementById("tablist");
    tabobjlinks = tabobj.getElementsByTagName("A")
}

function getFirstElementToFocus(Obj) {
    if (Obj != null) {
        var objTagName = Obj.tagName.toUpperCase();
        if ((objTagName == "INPUT" || objTagName == "TEXTAREA" || objTagName == "SELECT") && !Obj.disabled && Obj.type.toUpperCase() != "HIDDEN")
            return Obj;
        else {
            var children = Obj.children;
            for (var i = 0;i < children.length;++i) {
                var firstElementToFocus = getFirstElementToFocus(children[i]);
                if (firstElementToFocus != null) {
                    return firstElementToFocus;
                }
            }
            return null;
        }
    }
    else {
        return null;
    }
}

function handleTabKeys(tabObj, e) {
    var e = window.event || e;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (e.shiftKey == true && e.keyCode == 9) {
        var headerInputElem = document.getElementById("TBLPageTAB_HEADER").getElementsByTagName("INPUT");
        for (var i = 0;i < headerInputElem.length;i++) {
            if (!headerInputElem[i].disabled && headerInputElem[i].type.toUpperCase() != "HIDDEN") {
                headerInputElem[i].focus();
                preventpropagate(e);
                return false;
            }
        }
    }
    else if (e.keyCode == 9) {
        /*
        var tabInputElem = document.getElementById("TBLPage"+tabObj.id).getElementsByTagName("INPUT");
        for(var i=0; i<tabInputElem.length; i++) {
            if(!tabInputElem[i].disabled && tabInputElem[i].type.toUpperCase() != "HIDDEN") {
                tabInputElem[i].focus();
                preventpropagate(e);
                return false;
            }
        }        
      */
        var firstElementToFocus = getFirstElementToFocus(document.getElementById("TBLPage" + tabObj.id));
        if (firstElementToFocus != null) {
            firstElementToFocus.focus();
        }
        else {
            document.getElementById("BTN_EXIT_IMG").focus();
        }
        preventpropagate(e);
        return false;
    }
    else if (e.keyCode == 39) {
        if (getNextSibling(tabObj.parentNode) != null) {
            var focusObj = getNextSibling(tabObj.parentNode).getElementsByTagName("A");
            expandcontent("TBLPage" + focusObj[0].id, focusObj[0]);
            focusObj[0].focus();
            preventpropagate(e);
            return false;
        }
    }
    else if (e.keyCode == 37) {
        if (getPreviousSibling(tabObj.parentNode) != null) {
            var focusObj = getPreviousSibling(tabObj.parentNode).getElementsByTagName("A");
            expandcontent("TBLPage" + focusObj[0].id, focusObj[0]);
            focusObj[0].focus();
            preventpropagate(e);
            return false;
        }
    }
}

function detectSourceindex(aobject) {
    for (i = 0;i < tabobjlinks.length;i++) {
        if (aobject == tabobjlinks[i]) {
            tabsourceindex = i
            break 
        }
    }
}