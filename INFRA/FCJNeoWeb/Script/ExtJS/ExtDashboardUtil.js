/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : ExtDasboardUtil.js
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
Copyright © 2004-2014   by Oracle Financial Services Software Limited.. 
---------------------------------------------------------------------------------------------------------*/
var summaryreqd = "true";

function expandContentLoad(cid) {
    var aobject = document.getElementById(cid);
    if (!aobject) {
        if (tab_arr.length == 0 || tab_ids.length == 0) {
            fnTabDetails();
        }
        if (tab_arr.length == 0) {
            cid = strCurrentTabId;
        } else {
            for (var i = 0; i < tab_arr.length; i++) {
                cid = tab_ids[0];
                break;
            }
        }
        aobject = document.getElementById(cid);
    }
    if (document.getElementById("tablist")) {
        highlighttab(aobject);
        detectSourceindex(aobject);
        document.getElementById("TBLPage" + cid).style.display = "block";
        previoustab = cid;
    }
    strCurrentTabId = cid;
}

function expandcontent(cid) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var aobject = document.getElementById(cid);
    if (!aobject) {
        if (tab_arr.length == 0 || tab_ids.length == 0) {
            fnTabDetails();
        }
        if (tab_arr.length == 0) {
            cid = strCurrentTabId;
        } else {
            for (var i = 0; i < tab_arr.length; i++) {
                cid = tab_ids[0];
                break;
            }
        }
        aobject = document.getElementById(cid);
    }
    if (document.getElementById("tablist")) {
        prevTab = strCurrentTabId;
        try {
            if (!fnTabEventsHandler("fnOutTab_" + prevTab)) return false;
        } catch (e) {}
        if (gAction != "" && gAction != "EXECUTEQUERY") appendTabData(document.getElementById("TBLPage" + strCurrentTabId));
        if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
            var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
            var subSys = strScreenName + '__' + strCurrentTabId;
            if (statusStr.indexOf(subSys) != "-1") {
                if (typeof (tabDom) != "undefined" && tabDom != null && getXMLString(tabDom) != getXMLString(dbDataDOM)) {
                    fnSetTabSubSystem();
                    tabDom = loadXMLDoc("");
                }
            }
        }
        highlighttab(aobject);
        detectSourceindex(aobject);
        if (previoustab != "") {
            document.getElementById("TBLPage" + previoustab).style.display = "none";
            document.getElementById("TBLPage" + previoustab).style.height = "0px";
            document.getElementById("TBLPage" + previoustab).parentNode.style.height = "0px";
        }
        document.getElementById("TBLPage" + cid).style.display = "block";
        previoustab = cid;
        for (var i = 0; i < tab_arr.length; i++) {
            if (tab_ids[i] == cid) {
                tablist_curr_id = i;
                break;
            }
        }
    }
    strCurrentTabId = cid;
    if (document.getElementById("TBLPage" + strCurrentTabId).innerHTML == "") {
        var html = ShowXMLTabNew(xmlFileName, 'ExtDashboardDetailTab.xsl', strScreenName, strCurrentTabId); //12.1 Caching Tab load
        debugs("tabsContent=", html);
       // if (getBrowser().indexOf("IE") != -1) {//12.1 Caching Tab load
            document.getElementById("TBLPage" + strCurrentTabId).innerHTML = html;
        //} else {//12.1 Caching Tab load
           // document.getElementById("TBLPage" + strCurrentTabId).appendChild(html);
       // }//12.1 Caching Tab load
        fnBuildMultipleEntryArray(strCurrentTabId);
        if (gAction == "NEW") {
            resetElements(document.getElementById("TBLPage" + strCurrentTabId));
            enableForm(document.getElementById("TBLPage" + strCurrentTabId));
            disableMESVTabFields();
        }
        if (gAction == "ENTERQUERY") {
            resetElements(document.getElementById("TBLPage" + strCurrentTabId));
            fnEnablePKOnlyFields();
            if (queryAmendArr.length != 0) fnEnableAmendFields("query");
        }
    }
    if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
        var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
        var screenArgs = new Array();
        var subsys = strScreenName + '__' + strCurrentTabId;
        if (statusStr != "" && statusStr.indexOf(subsys) != -1) {
            fnPickUpSubSystem(subsys, strScreenName, functionId, screenArgs);
            tabDom = dbDataDOM;
        }
    }
    showTabData(strCurrentTabId);
    if (gAction == 'EXECUTEQUERY' || gAction == "") {
        var pviewmode = viewModeAction;
        viewModeAction = true;
        disableAllElements("INPUT");
        fnEnableBlockCheckBox();
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        viewModeAction = pviewmode;
    }
    if (gAction == "MODIFY" || gAction == "ROLLOVER" || gAction == "LIQUIDATE") {
        if (gAction == "MODIFY") {
            if (document.getElementsByName("ONCEAUTH")[0]) {
                if (document.getElementsByName("ONCEAUTH")[0].value == 'Y') {
                    fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
                }
            } else if (onceAuthObj) {
                if (onceAuthObj.value == 'Y') {
                    fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
                }
            } else {
                fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
            }
        } else {
            fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
        }
    }
    if (document.getElementById("tablist")) {
        try {
            if (!fnTabEventsHandler("fnInTab_" + strCurrentTabId)) return false;
        } catch (e) {}
    }
    document.getElementById("TBLPage" + strCurrentTabId).style.height = document.getElementById("DIVMainTmp").offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight - 16 + "px";
    document.getElementById("TBLPage" + strCurrentTabId).parentNode.style.height = document.getElementById("DIVMainTmp").offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight + "px";
    return false;
}

function fnSetTabAttributes(aobject, tabobjlinks) {
    for (i = 0; i < tabobjlinks.length; i++) {
        tabobjlinks[i].parentNode.id = "";
        addEvent(tabobjlinks[i], "class", "DashTBitem"); // my change
        tabobjlinks[i].setAttribute("objClicked", "false");
    }
    aobject.parentNode.id = "current";
    aobject.setAttribute("objClicked", "true");
    aobject.setAttribute("objvisited", "true");
    addEvent(aobject, "onmouseover", "setTabClass(this,'onmouseover')");
    addEvent(aobject, "onmouseout", "setTabClass(this,'onmouseout')");
    addEvent(aobject, "onblur", "setTabClass(this,'onblur')");
    addEvent(aobject, "class", "DashTBitem Dashboardcurrent4"); // my change
}

function setTabClass(object, event_type) {
    /*if (object.getAttribute("objClicked") == "false") {
        if (event_type == "onmouseover") {
            addEvent(object, "class", "Htabover");
        } else {
            addEvent(object, "class", "DashTBitem");
        }
    }*/
}

function getDashboardParams(params) {

    params["tablename"] = "Innertable_" + functionId;
    if (typeof (fetchSize) != "undefined") params["fetchSize"] = fetchSize;
    params["summaryrequired"] = summaryreqd;
    params["scrTitle"] = screenTitle;
}