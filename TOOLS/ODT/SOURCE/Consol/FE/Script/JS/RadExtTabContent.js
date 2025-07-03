/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadExtTabContent.js
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

function cascadedstyle(el, cssproperty, csspropertyNS) {
    if (el.currentStyle)
        return el.currentStyle[cssproperty]
    else if (window.getComputedStyle) {
        var elstyle = window.getComputedStyle(el, "")
        return elstyle.getPropertyValue(csspropertyNS)
    }
}

var previoustab = "";
var prevTab = "";

function expandcontent(cid) {

    var tab = cid.substring(0, 7);
    if (tab != 'TBLPage') {
        cid = "TBLPage" + cid;
    }

    if (document.getElementById) {
        var aobject = document.getElementsByName(cid)

        if (aobject == undefined) {

            var aobject = document.getElementById("TBLPage" + cid)
        }
        highlighttab(aobject)
        detectSourceindex(aobject)
        if (previoustab != "")
            document.getElementById(previoustab).style.display = "none"
        document.getElementById(cid).style.display = "block";

        previoustab = cid
        if (aobject.blur)
            aobject.blur()
        strCurrentTabId = cid.substring(7);
        if (document.getElementById("TBLPage" + strCurrentTabId).innerHTML == "") {
            var html = ShowXMLTab(xmlddd, 'Templates/ExtXSL/ExtDetailTab.xsl', scrnName, strCurrentTabId);

            if (window.ActiveXObject) {
                document.getElementById("TBLPage" + strCurrentTabId).innerHTML = html;
            }
            else {
                document.getElementById("TBLPage" + strCurrentTabId).appendChild(html);
            }

        }

        return false;
    }
    else 
        return true;
}

function highlighttab(aobject) {

    if (typeof tabobjlinks == "undefined")
        collecttablinks();
    if (typeof tabobjlinks != "undefined") {

        for (i = 0;i < tabobjlinks.length;i++) {
            tabobjlinks[i].style.backgroundColor = cascadedstyle(tabobjlinks[i], "backgroundColor", "background-color");
            tabobjlinks[i].parentElement.id = "";
        }
        var themecolor = cascadedstyle(tabobjlinks[0], "backgroundColor", "background-color");
        //var themecolor=aobject.getAttribute("theme")? aobject.getAttribute("theme") : cascadedstyle(tabobjlinks[0], "backgroundColor", "background-color");
        //aobject.style.backgroundColor=document.getElementsByName("tabcontentcontainer")[0].style.backgroundColor=themecolor;
        //aobject.style.backgroundColor=themecolor;
        //document.getElementsByName("tabcontentcontainer")[0].style.backgroundColor=themecolor;
    }
}

function collecttablinks() {
    var tabobj = document.getElementsByName("tablist")[0]

    if (tabobj) {
        tabobjlinks = tabobj.getElementsByTagName("A");
    }

}

function detectSourceindex(aobject) {
    if (typeof tabobjlinks != "undefined") {
        for (i = 0;i < tabobjlinks.length;i++) {
            if (aobject == tabobjlinks[i]) {
                tabsourceindex = i;
                break 
            }
        }
    }
}

function getTabId() {

    var itstab = document.getElementById(parent.previewfieldid)

    while (itstab.id.substring(0, 7) != "TBLPage") {
        itstab = itstab.parentNode;
    }
    var tabId1 = itstab.id;
    return tabId1;
}

function getFuncid(funcid) {
    if (window.location.search) {
        var itstab = document.getElementsByName(window.location.search.substring(1));

        if (itstab != null) {
            while (itstab.id.substring(0, 7) != "TBLPage") {
                itstab = itstab.parentElement;
            }
            var tabId1 = itstab.id;
            expandcontent(tabId1);
            DisableFormControls(false);
            document.getElementsByName(window.location.search.substring(1)).style.background = '#FFFF00';
        }
        else 
            self.close();
    }
    else 
        functionId = funcid;
}

function ShowXMLTab(xmlddd, xslName, scrnName, cid) {

    var html;
    var xmlDoc;
    var applicationName = 'FCUBS';
    var dispSize = '600';
    var XslLabels = '@@LBL_ADVANCED~~Advanced Search@@LBL_RESET~~Reset@@LBL_QRY_QUERY~~Query@@LBL_REFRESH~~Refresh@@LBL_RESULT~~Result@@LBL_MAKERID~~Maker Id@@LBL_CHECKER_ID~~Checker Id@@LBL_MAKER_DT_STAMP~~Maker Date Stamp@@LBL_CHECKER_DT_STAMP~~Checker Date Stamp@@LBL_RECORD_STAT~~Record Status@@LBL_AUTHORISATION_STATUS~~Authorization Status@@LBL_A~~A@@LBL_SUMMARY_U~~U@@LBL_UN_AUTH_FLG~~Unauthorized@@LBL_O~~O@@LBL_OPEN~~Open@@LBL_C~~C@@LBL_CLOSED~~Closed@@LBL_EXIT~~Exit@@LBL_OK~~Ok@@LBL_CANCEL~~Cancel@@LBL_FIELDS~~Fields@@LBL_OPERATOR~~Operator@@LBL_VALUE~~Value @@LBL_AND~~And@@LBL_CLEAR_QUERY~~Clear Query@@LBL_ORDER_BY~~Order By@@LBL_ASCENDING~~Ascending@@LBL_DESCENDING~~Descending@@LBL_ACCEPT~~Accept@@LBL_TO~~To@@LBL_OR~~Or@@LBL_SEARCH~~Search@@LBL_RECORDS_PER_PAGE~~Records per page@@LBL_GOTO_PAGE~~Go to Page@@LBL_OF~~of@@LBL_AUTHORIZED~~Authorized @@LBL_INPUT_BY~~Input By@@LBL_AUTH_BY~~Authorized By@@LBL_DATE_TIME~~Date Time@@LBL_MOD_NO~~Modification Number@@LBL_OPEN~~Open@@LBL_CONTRACT_STATUS~~Contract Status@@LBL_PAYMENT_STATUS~~Payment Status@@LBL_COLLECTION_STATUS~~Collection Status@@LBL_DEAL_STATUS~~Deal Status@@LBL_PROCESS_STATUS~~Process Status@@LBL_REVERSAL~~Reversal@@LBL_REMARKS~~Remarks@@LBL_AUDIT~~Audit@@LBL_PRIORITY_AUDIT~~PRIORITY@@LBL_HIGH~~HIGH@@LBL_NORMAL~~NORMAL@@LBL_SHOWERR~~ERROR@@LBL_REMARKS~~Remarks@@LBL_GETPRIORITY~~Priority@@LBL_SUM_LOCK~~Lock@@LBL_CHECKBOX_YES~~YES@@LBL_CHECKBOX_NO~~NO@@LBL_INFRA_MANDATORY~~Mandatory@@LBL_NOSCRIPT_LABEL~~Script Label@@LBL_SUMMARY~~undefined@@LBL_EXPAND_GROUP~~undefined@@LBL_LIST_OF_VALUES~~List Of Values@@LBL_INFRA_PREVIOUS~~Previous@@LBL_NEXT~~Next@@LBL_FIRST~~First@@LBL_LAST~~Last@@LBL_ADDROW~~Add Row@@LBL_DELETEROW~~Delete Row@@LBL_SINGLE_REC_VIEW~~Single view@@LBL_LOCK~~undefined@@LBL_COLUMNS~~undefined@@LBL_NARRATIVE~~Narrative@@LBL_SELECT_ALL_ROWS~~Select All Rows@@LBL_REJECT~~Reject@@LBL_EXPORT~~Export@@';
    xmlDoc = xmlddd;
    if (typeof (screenType) != "undefined") {
        if (screenType == "WB") {
            xmlDoc = embeddcall(xmlDoc);
        }
    }
    var xslDoc = loadXSLFile(xslName);
    if (scrnName != "CVS_ADVANCED") {
        g_scrType = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/@TMP_SCR_TYPE"));
        subScrHeaderTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/HEADER/TAB/@ID"));
        subScrBodyTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/BODY/TAB/@ID"));
    }
    else {
        g_scrType = "M";
    }
    var params = new Array();
    params["screen"] = scrnName;
    params["uiXML"] = functionId;
    params["imgPath"] = '/Images/ExtFlexblue';
    params["displaySize"] = dispSize;
    params["thirdChar"] = thirdChar;
    params["XslLabels"] = XslLabels;
    params["applicationName"] = applicationName;
    if (thirdChar == "S")
        params["functionId"] = parentFunc;
    else 
        params["functionId"] = functionId;
    params["CurTabId"] = cid;

    html = transform(xmlDoc, xslDoc, params);
    return html;
}

function addEvent(ele, eventType, eventHandler) {
    try {
	debugger;
        if (navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
            if (eventType == "class") {
                ele.setAttribute("className", eventHandler);
            }
        }
        else {
            ele.setAttribute(eventType, eventHandler);
        }
    }
    catch (e) {
        ele.setAttribute(eventType, eventHandler);
    }
}