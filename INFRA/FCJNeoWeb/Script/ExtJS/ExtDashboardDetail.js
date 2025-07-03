/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : ExtDashboardDetail.js
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

**  Modified By          : Neethu Sreedharan
**  Modified On          : 11-Aug-2017
**  Modified Reason      : Changes done to align the dashboard navigation buttons to left and to correct 
                           the dashboard width so that the dsanboards will be displayed properly for an 
                           Arabic user 
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_4_RETRO_12_0_2_26230970
---------------------------------------------------------------------------------------------------------*/
var g_scrType = "";
var g_txnBranch = mainWin.CurrentBranch;
if (!mainWin.txnBranch[mainWin.CurrentBranch]) mainWin.txnBranch[mainWin.CurrentBranch] = new setTxnBrnInfo();
var gDispAlertOnSuccess = "Y";
var viewMnt = false;
var fetchSize = 5;
showsummary = "FALSE";

function fnLoadDashboard(xmlFileName, xslFileName) {
   //Performance Changes Starts
    var t = getDateObject();
    var sjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes Ends
    debugs("FunctionId~xmlFileName~xslFileName", functionId + "~" + xmlFileName + "~" + xslFileName);
    if (!fnPreLoadMain()) return false;
    //if (!fnEventsHandler('fnPreLoad')) return false;
    document.getElementById("containerFldset").setAttribute("TYPE", "SE");
    document.getElementById("containerFldset").setAttribute("VIEW", "SE"); 
//REDWOOD_Changes
    //document.getElementById("containerFldset").className = "FSTstd";
    //document.getElementById("containerFldset").style.overflow = "auto";
    //var legendHTML = "<h4>" + screenTitle + "</h4>";
    //document.getElementById("containerFldset").innerHTML = legendHTML;
//REDWOOD_Changes
    try {
        var html = ShowXML(xmlFileName, xslFileName, strScreenName);
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes
        document.getElementById("containerFldset").insertAdjacentHTML("beforeEnd", html);
        } else {
        document.getElementById("containerFldset").appendChild(html);
        }
    } catch (e) {
        alert(e.message);
        return;
    }  
//REDWOOD_Changes
    if (getBrowser().indexOf("FIREFOX") !=  - 1) {
        document.getElementById("containerFldset").querySelectorAll('template').forEach((elem) => elem.remove());
        document.getElementById("containerFldset").innerHTML = document.getElementById("containerFldset").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");

    }
    else {
        document.getElementById("containerFldset").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
    }
    document.getElementById("containerFldset").innerHTML = document.getElementById("containerFldset").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
    fnBindScreenElements();//OJET Migration	 
//REDWOOD_Changes
    //12.0.2 fix
   /* if (window.ActiveXObject) {
        document.getElementById("containerFldset").insertAdjacentHTML("beforeEnd", html);
    } else {
        document.getElementById("containerFldset").appendChild(html);
    }*/
    debugs("Inner Html", document.getElementById("containerFldset").innerHTML);
    if (document.getElementsByName("ONCEAUTH")[0] != undefined) onceAuthObj = document.getElementsByName("ONCEAUTH")[0].value;
    //fnBuildMultipleEntryArray(strCurrentTabId); //REDWOOD_Changes
    
    //12.1 Dashboard changes --start
    if(mainWin.currentTab == 'DBoardCustomer' ){
    if(functionId == 'SMDCSDDB' || functionId == 'SMDACDDB'){
        setCustTableData();
    }
    }
     //12.1 Dashboard changes --end
    
    
    /*gAction = "ENTERQUERY";
    fnEnterQueryDashboard();
    fnSetPkvals(mainWin.dashboardParams.custno);
    gAction = 'EXECUTEQUERY';
    fnExecuteQueryDashboard();*/
    //fnExecuteQueryAsync();  
    //fnDisableElement(document.getElementById("BLK_USR__USRID"));
    //document.getElementById("BLK_USR__USRID").className = 'DashTXTro';
    l_offlineAllowed = mainWin.gOfflineAllowed;
    /*if (mainWin.applicationName == "FCIS") {
        xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
        var functionIdNode = selectSingleNode(xmlDOM, "//*[@FNID = '"+ functionId + "']");
        if(functionIdNode)
            l_offlineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
    }*/
    if ((mainWin.BranchEoi != 'N') && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y') alert(lblBranchStage);
    //expandContentLoad("TAB_SUMMARY");
    //ExtshowToolbarDashboard(functionId, '', '', '');
	//preferences changes
       if(mainWin.currentTab == 'DBoardMyDashBoard'){
      //fnCalcHgtNonHomeDashboard(); 	   //REDWOOD_Changes
      setTimeout(function(){fnCalcHgtDashboard();},0);	 //REDWOOD_Changes
      if(mainWin.usrDetails.length > 0){
      var startIndex = 0;   
      if(functionId == 'SMDUSRD2') startIndex =6;
      if(functionId == 'SMDUSRD3') startIndex = 13;

      setCustTableData(mainWin.usrDetails, startIndex);
      }
      
    }
    else{
    fnCalcHgtDashboard();
    }
   //Performance Changes
    var dbtime=0;
    var servertime=clientHandlerExit-clientHandlerEntry;
    t = getDateObject();
    time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();       
    jstime=time-sjsTime;
    //setActionTime(inLoadTime,jstime,dbtime,servertime, functionId,'LOAD');
    //setActionTime(inTime, functionId, 'LOAD');//HTML5 Changes
    //Performance Changes
	//Fix for 24741294 Starts
    if(functionId == 'SMDUSRD3') {
        if (mainWin.SSO_REQ == 'Y'){
            document.getElementById('BLK_USER__PWD_CHANGED_ON').className = "hidden";  
            getPreviousSibling(document.getElementById('BLK_USER__PWD_CHANGED_ON')).className ="LBLinv"
        }
    }
    //Fix for 24741294 Ends
    debugs("Calling fnPostLoad", "");
    if (!fnPostLoadMain()) return false;
    //if (!fnEventsHandler('fnPostLoad')) return false;
    //var orgFnid = functionId;
    //functionId = functionId.substring(0,2) + "S" + functionId.substring(3,functionId.length);
    //fnExecuteQuery_sum();
    //functionId = orgFnid; 
}


//preferences changes
function fnCalcHgtNonHomeDashboard() {
    var scrWidth = "";
   /* if (parent.document.getElementById(seqNo).className == "DIVColumnOne" || parent.document.getElementById(seqNo).className == "DIVColumnOneAndHalf") {
        parent.document.getElementById(seqNo).style.width = parent.document.getElementById(seqNo).parentNode.offsetWidth/2 - 4 + "px";
        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth/2 - 4;
    } */
     if(parent.document.getElementById(seqNo).className == "DIVColumnOne"){
	 //9NT1606_12_4_RETRO_12_0_2_26230970 starts 	 
     /*parent.document.getElementById(seqNo).style.width = parent.document.getElementById(seqNo).parentNode.offsetWidth/3 - 4 + "px";
        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth/3 - 4;*/
		 parent.document.getElementById(seqNo).style.width = parent.document.getElementById(seqNo).parentNode.offsetWidth/3 - 10 + "px";
        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth/3 - 10;
      //9NT1606_12_4_RETRO_12_0_2_26230970 ends 
    }
      else if(parent.document.getElementById(seqNo).className == "DIVColumnDouble"){
     parent.document.getElementById(seqNo).style.width =2 *( parent.document.getElementById(seqNo).parentNode.offsetWidth/3 )- 4 + "px";
        scrWidth = 2 *(parent.document.getElementById(seqNo).parentNode.offsetWidth/3 )- 4;
    
    }

    else {
        parent.document.getElementById(seqNo).style.width = parent.document.getElementById(seqNo).parentNode.offsetWidth - 4 + "px";
        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth - 4;
    }
    var scrHeight = parent.document.getElementById(seqNo).parentNode.offsetHeight;
    parent.document.getElementById(seqNo).style.height = scrHeight + "px";
    parent.document.getElementById(seqNo).children[0].style.height = scrHeight + "px";
    document.getElementById("containerFldset").style.height = scrHeight + "px";
    //document.getElementById("dataContainer").style.height = scrHeight + "px";
    //document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight - 8 + "px";
    parent.document.getElementById(seqNo).children[0].style.width = scrWidth + "px";
    document.getElementById("containerFldset").style.width = scrWidth + "px";
    //document.getElementById("dataContainer").style.width = scrWidth + "px";
    //document.getElementById("tableContainer").style.width = scrWidth - 8 + "px";
}



function fnCalcHgtDashboard() {	
//REDWOOD_Changes
    //var scrWidth = "";
    var divElem = parent.document.getElementById(seqNo);
    var scrHeight = divElem.parentNode.getBoundingClientRect().height;
    divElem.style.height  = "100%";
    divElem.children[0].style.height = "100%";
    divElem.children[0].className="oj-sm-width-full  frames";
    //document.getElementById("DIVMainTmp").style.height = scrHeight - document.getElementById("wndtitle").offsetHeight+ "px";
    document.getElementById("DIVMainTmp").style.height = Math.floor(scrHeight -parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('margin-bottom')) - parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('margin-top')) - parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('padding-top'))- parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('padding-bottom')) - document.getElementById("wndtitle").offsetHeight)+ "px";
    //document.getElementById("containerFldset").className="oj-sm-width-full";
//    if (parent.document.getElementById(seqNo).className == "DIVColumnOne" || parent.document.getElementById(seqNo).className == "DIVColumnOneAndHalf") {
//        parent.document.getElementById(seqNo).style.width = parent.document.getElementById(seqNo).parentNode.offsetWidth/2 - 4 + "px";
//        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth/2 - 4;
//    } 
//    else if(parent.document.getElementById(seqNo).className == "DIVColumnOneThird"){
//     parent.document.getElementById(seqNo).style.width = parent.document.getElementById(seqNo).parentNode.offsetWidth/3 - 4 + "px";
//        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth/2 - 4;
//    
//    }
//     else if(parent.document.getElementById(seqNo).className == "DIVColumnOneHalf"){
//      parent.document.getElementById(seqNo).style.width =3(parent.document.getElementById(seqNo).parentNode.offsetWidth/3)  - 4 + "px";
//        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth/2 - 4;
//    
//    }
//    else {
//        parent.document.getElementById(seqNo).style.width = parent.document.getElementById(seqNo).parentNode.offsetWidth - 4 + "px";
//        scrWidth = parent.document.getElementById(seqNo).parentNode.offsetWidth - 4;
//    }
//    var scrHeight = parent.document.getElementById(seqNo).parentNode.offsetHeight;
//    parent.document.getElementById(seqNo).style.height = scrHeight + "px";
//    parent.document.getElementById(seqNo).children[0].style.height = scrHeight + "px";
    //document.getElementById("containerFldset").style.height = scrHeight + "px";
    //document.getElementById("dataContainer").style.height = scrHeight + "px";
    //document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight - 8 + "px";
    //parent.document.getElementById(seqNo).children[0].style.width = scrWidth + "px";
    //document.getElementById("containerFldset").style.width = scrWidth + "px";
    //document.getElementById("dataContainer").style.width = scrWidth + "px";
    //document.getElementById("tableContainer").style.width = scrWidth - 8 + "px";
//REDWOOD_Changes
}
/*function fnCalcHgtDashboard() {
    var scrWidth = parent.document.getElementById("dashboardContainer").offsetWidth;
    var scrHeight = parent.document.getElementById("dashboardContainer").offsetHeight;
    if (g_scrType != "S")
        document.getElementById("ResTree").className = "DIVTwoColSectionContainer WNDcontent";
    
    if(g_scrType == "S"){
        parent.document.getElementById(seqNo).style.width  = (scrWidth/2) -12 + "px";
        parent.document.getElementById(seqNo).children[1].style.width = (scrWidth/2) -12 + "px";
        document.getElementById("DIVScrContainer").style.width  = (scrWidth/2) -18 + "px";
        //parent.document.getElementById("trElem").style.height = (scrHeight/3) + "px";
    }else{
        parent.document.getElementById(seqNo).style.width  = scrWidth -22 + "px";
        parent.document.getElementById(seqNo).children[1].style.width = scrWidth-22 + "px";
        document.getElementById("DIVScrContainer").style.width  = scrWidth -22 + "px";
        /*parent.document.getElementById(seqNo).style.height  = (scrHeight*2)/3 + "px";
        parent.document.getElementById(seqNo).children[1].style.height  = (scrHeight*2)/3 + "px";  
        document.getElementById("DIVMainTmp").style.height = (scrHeight*2)/3 + "px";   
    }
    document.getElementById("ResTree").style.width = document.getElementById("DIVScrContainer").offsetWidth + "px";
    document.getElementById("DIVMainTmp").style.width = document.getElementById("DIVScrContainer").offsetWidth + "px";
    parent.document.getElementById(seqNo).style.height  = (scrHeight/3) - 12 + "px";
    parent.document.getElementById(seqNo).children[1].style.height  = (scrHeight/3) - 12 + "px";
    document.getElementById("DIVScrContainer").style.height  = (scrHeight/3) - 20 + "px";
    document.getElementById("ResTree").style.height  = document.getElementById("DIVScrContainer").offsetHeight - document.getElementById("DIVHeading_Options").offsetHeight + "px";
    document.getElementById("DIVMainTmp").style.height = document.getElementById("ResTree").offsetHeight + "px";
    document.getElementById("TBLPage"+strCurrentTabId).style.height = document.getElementById("DIVMainTmp").offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight - 16 + "px";
    document.getElementById("TBLPage"+strCurrentTabId).parentNode.style.height = document.getElementById("DIVMainTmp").offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight + "px";
} */

function fnEnterQueryDashboard() {
    debugs("FunctionId=", functionId);
    if (!fnPreEnterQueryMain()) {
        return;
    }
    //if (!fnEventsHandler('fnPreEnterQuery')) {
    //    return;
    //}
    resetDOM();
    //resetElements();
    fnEnablePKOnlyFields();
    if (queryAmendArr.length != 0) fnEnableAmendFields("query");

    //fnDisableSubSysButtons();
    gAction = "ENTERQUERY";
    if (!fnPostEnterQueryMain()) {
        gAction = "";
        return;
    }
    //if (!fnEventsHandler('fnPostEnterQuery')) {
    //    gAction = "";
    //    return;
    //}
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
            if (document.getElementById(txnBranchFld).className != "hidden") {
                for (var j = 0; j < pkFields.length; j++) {
                    if (pkFields[j] == txnBranchFld) {
                        fnEnableElement(document.getElementById(txnBranchFld));
                        document.getElementById(txnBranchFld).value = g_txnBranch;
                        break;
                    }
                }
            }
        }
    }
    fnSetFocusOnMasterPKField();
    gFromSummary = false;
    //ExtshowToolbarDashboard(functionId, '', '');
    //fnCalcHgtDashboard();
}


function fnExecuteQueryDashboard() {
    debugs("FunctionId=", functionId);
    debugs("from summary screen=" + gFromSummary, "");
    var inDate = setActionTime();
    //window.focus();
    if (!fnPreExecuteQueryMain()) {
        gAction = "";
        return;
    }
    //if (!fnEventsHandler('fnPreExecuteQuery')) {
    //   gAction = "";
        //resetElements();
        //disableForm();
    //    return;
    //}
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
            g_txnBranch = document.getElementById(txnBranchFld).value;
        }
    }
    fcjRequestDOM = buildUBSXml();
    //fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    fcjResponseDOM = loadXMLFile("UIXML/ENG/Test_Response.xml");

    debugs("Request Message -->", getXMLString(fcjRequestDOM));
    var msgStatus = fnProcessResponse();
    if (msgStatus == "FAILURE") {
        resetDOM();
        //resetElements();
        //disableForm();
        gAction = "";
        //ExtshowToolbarDashboard(functionId, '', '');
        //fnCalcHgtDashboard();
        return false;
    }
    //disableForm();
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
            if (document.getElementById(txnBranchFld).value != "") {
                g_txnBranch = document.getElementById(txnBranchFld).value;
                fnUpdateTxnBrnVariables(g_txnBranch);
            } else {
                g_txnBranch = mainWin.CurrentBranch; //Changes for 11.4 ITR1 SFR# 13081633
            }
            var scrTitle = document.title + " - " + mainWin.getItemDesc("LBL_TXN_BRANCH") + " ::: " + g_txnBranch;
            setInnerText(document.getElementsByTagName("H1")[0], scrTitle);
        }
    }
    if (!fnPostExecuteQueryMain()) return false;
    //if (!fnEventsHandler('fnPostExecuteQuery')) return false;
    gAction = "";
    //ExtshowToolbarDashboard(functionId, '', '');
    //fnCalcHgtDashboard();
    //Performance Changes
    /*var l_TimeLogvalue = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/TIMELOG"));
    var dbTime=l_TimeLogvalue.split("~")[3]-l_TimeLogvalue.split("~")[2];
    var serverTime=l_TimeLogvalue.split("~")[1]-l_TimeLogvalue.split("~")[0]-dbTime;    */
	  //setActionTime(inTime,dbTime,serverTime,functionId, 'EXECUTEQUERY');
    setActionTime(inTime, functionId, 'EXECUTEQUERY');
    //Performance Changes
    return true;
}

function fnNewDashboard() {
    debugs("FunctionId=", functionId);
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && multiBrnScrOpened == false && mainWin.gActiveWindow.screenType != "WB") {
        fnOpenTxnBrnScreen();
        return;
    }
    if (!fnPreNewMain()) return;
    //if (!fnEventsHandler('fnPreNew')) return;

    try {
        if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
            resetElements(document.getElementById("TBLPage" + strHeaderTabId));
        }
        resetElements(document.getElementById("TBLPage" + strCurrentTabId));
        if (typeof (strFooterTabId) != 'undefined' && strFooterTabId != "") {
            resetElements(document.getElementById("TBLPage" + strFooterTabId));
        }
        fcjResponseDOM = null;
        createDOM(dbStrRootTableName);
        if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
            enableForm(document.getElementById("TBLPage" + strHeaderTabId));
        }

        if (tab_arr.length == 0 || tab_ids.length == 0) {
            fnTabDetails();
        }
        for (var i = 0; i < tab_arr.length; i++) {
            debugs("tab_arr", tab_arr[i]);
            var objvisited = tab_arr[i].getAttribute("objvisited");
            if (objvisited != null && document.getElementById("TBLPage" + tab_arr[i].id) != null) {
                enableForm(document.getElementById("TBLPage" + tab_arr[i].id));
            }
        }
        if (document.getElementById("TBLPage" + strCurrentTabId) != null) enableForm(document.getElementById("TBLPage" + strCurrentTabId));
        disableMESVTabFields();
    } catch (e) {
        mask();
        showAlerts(fnBuildAlertXML("EXTNEW-001", "E"), "E");
        alertAction = "UNMASK";
        return;
    }
    attachmentData = new Array();
    fileNameArray = new Array();
    if (!fnPostNewMain()) return;
    //if (!fnEventsHandler('fnPostNew')) return;
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
            document.getElementById(txnBranchFld).value = g_txnBranch;
        }
    }
    if (document.getElementById('MICPRMNT')) {
        fnPickupMIS();
    }
    ExtshowToolbarDashboard(functionId, '', '');
    fnCalcHgtDashboard();
    if (mainWin.screenType == "WB") {
        fnSetFocusOnFirstEnabledField();
    } else {
        fnSetFocusOnMasterPKField();
    }
}

function fnUnlockDashboard() {
    debugs("FunctionId=", functionId);
    fnBuildTabHTML();
    if (!fnPreUnlockMain()) {
        gAction = "";
        return;
    }
    //if (!fnEventsHandler('fnPreUnlock')) {
    //    gAction = "";
    //   return;
    //}

    /* ******** Resetting the status of all subsystems to D in case contract is on HOLD ***********/
    if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
        var contStat = document.getElementsByName("TXNSTAT")[0].value;
        var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
        if (contStat == 'H') {
            var reg = new RegExp(':S', "g");
            statusStr = statusStr.replace(reg, ":D");
            var reg1 = new RegExp(':R', "g");
            statusStr = statusStr.replace(reg1, ":D");
            document.getElementsByName('SUBSYSSTAT')[0].value = statusStr;
        }
        //fnPopulateSubSystemValues(statusStr);
    }

    gAction = "UNLOCK";
    try {
        fcjRequestDOM = buildUBSXml(); //ADDA NEW ATTARIBUTE key
        debugs("fcjRequestDOM", getXMLString(fcjRequestDOM));
    } catch (e) {
        //mask();
        //showAlerts(fnBuildAlertXML("EXTUNL-001","E"),"E");
        //alertAction = "UNMASK";
        //displayError("EXTUNL-001");
        return;
    }

    //fcjRequestDOM.selectNodes("FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ").removeAll();
    //fcjRequestDOM.selectNodes("FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + dataSrcLocationArray[0] + "']").removeAll();
    var removeNode1 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
    for (var i = 0; i < removeNode1.length; i++) {
        removeNode1[i].parentNode.removeChild(removeNode1[i]);
    }
    var removeNode2 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + dataSrcLocationArray[0] + "']");
    for (var i = 0; i < removeNode2.length; i++) {
        removeNode2[i].parentNode.removeChild(removeNode2[i]);
    }
    var oldResponseDOM = loadXMLDoc(getXMLString(fcjResponseDOM));
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (!fnProcessResponseLock()) {
        gAction = "";
        fnSetExitButton();
        showToolbar(functionId, '', '');
        return;
    }

    fcjResponseDOM = loadXMLDoc(getXMLString(oldResponseDOM));
    gAction = "MODIFY";
    disableForm();

    if (document.getElementsByName("ONCEAUTH")[0]) {
        if (document.getElementsByName("ONCEAUTH")[0].value == 'Y') {
            fnChangeLabelToText("TEXTAREA");
            fnEnableAmendFields(gAction.toLowerCase());
            disableMESVFields();
            //disableMESVTabFields();
        } else {
            enableForm();
            fnDisablePKFields();
        }
    } else {
        fnChangeLabelToText("TEXTAREA");
        fnEnableAmendFields(gAction.toLowerCase());
        disableMESVFields();
        //disableMESVTabFields();
    }

    ExtshowToolbarDashboard(functionId, '', '');
    fnCalcHgtDashboard();
    if (!fnPostUnlockMain()) return;
    //if (!fnEventsHandler('fnPostUnlock')) return;
}

function fnShowDetailScreen(obj, funcId, event) {
    var screenArgs = new Array();
    screenArgs["OBJECT"] = obj;
    screenArgs["FUNCTIONID"] = funcId;
    screenArgs["EVENT"] = event;
    if (!fnEventsHandler('fnPreShowDetailScreen', screenArgs)) return false;

    expandcontent(document.getElementById("tablist").children[1].children[0].id);
    fnEnterQueryDashboard();
    document.getElementById(pkFields[0]).value = getInnerText(obj);
    if (getOuterHTML(document.getElementById(pkFields[0])).indexOf("onpropertychange") != -1) fireHTMLEvent(document.getElementById(pkFields[0]), "onpropertychange", event);
    gAction = "EXECUTEQUERY";
    fnExecuteQueryDashboard();
}

function fnSetPkvals(v_pkVals) {
    l_pkArray = v_pkVals.split("~");
    for (var i = 0; i < l_pkArray.length; i++) {
        if (l_pkArray[i].indexOf("00:00:00") != -1) {
            l_pkArray[i] = l_pkArray[i].substring(0, l_pkArray[i].indexOf("00:00:00") - 1);
        }
        var element = document.getElementById(pkFields[i]);
        if (element.type.toUpperCase() == 'RADIO') {
            var radioEle = document.getElementsByName(pkFields[i].substring(pkFields[i].lastIndexOf("__") + 2, pkFields[i].length));
            for (var lpIdx = 0; lpIdx < radioEle.length; lpIdx++) {
                if (radioEle[lpIdx].value == l_pkArray[i]) {
                    radioEle[lpIdx].checked = true;
                }
            }
        } else {
            element.value = l_pkArray[i];
        }
    }
}

//preferences changes
function setCustTableData(dataArr, startIndex){
    var fvArray = new Array();
    var i = 0;
    if(typeof(dataArr) == "undefined"){
        if(functionId == 'SMDCSDDB'){
            fvArray = mainWin.custData;
        }else if(functionId == 'SMDACDDB'){
           fvArray = mainWin.accDataArray;
           var elem1 = null;
           if('ONLINE' != mainWin.brnHostLinkStatus){//DC offline LOV
          elem1 = document.getElementById("BLK_B1__SPEND_ANALYSIS_REQD");//Fix for 17772239  
           if(elem1 != undefined) {
              elem1.disabled = true;
              elem1.style.opacity = 0.9;
           }
           elem1 = document.getElementById("BLK_B1__TRACK_RECEIVABLE");//Fix for 17772239  
            if(elem1 != undefined) {
              elem1.disabled = true;
              elem1.style.opacity = 0.9;
            }
           }

        }
		startIndex = 0;
    }
    else{
		fvArray = dataArr;
      
    }
        for (var j = startIndex; j < fvArray.length; j++) {
            var value = fvArray[j];
			if(value == undefined || value == "undefined") value = "";//Fix for 18383816 
            var currObject = document.getElementsByTagName("OJ-INPUT-TEXT")[i]; //REDWOOD_Changes
            i = i + 1;
            //var currObject = document.getElementById("Innertable_" + functionId).tBodies[0].rows[i].cells[j].children[1];
             if(currObject){
			if (currObject.getAttribute("type") != null) 
                var type = currObject.getAttribute("type");
            else 
                var type = currObject.type;
           switch (type.toUpperCase()) {
            case 'TEXT': {
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                        break;
                    }
                }
                //Added to format the number in number field
                if (getOuterHTML(currObject).indexOf("fnValidateRange") != -1 && getOuterHTML(currObject).indexOf("acceptInputAmount") == -1) {
                    if (value != "") {
                        currObject.value = Number(value);
                        break;
                    }
                }
                currObject.value = value;
                break;
            }
            case 'HIDDEN':{
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                        i = i + 1;
                    } else {
                        currObject.value = value;
                        fireHTMLEvent(currObject, "onpropertychange");
                        i = i + 1;
                    }
                }
                else { 
                    if (getOuterHTML(currObject).indexOf("displayAmount") != -1) {
                    currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
                    fireHTMLEvent(currObject, "onpropertychange");
                    validateResponseAmount(currObject.name, currObject.getAttribute("related_ccy"), getNextSibling(getNextSibling(currObject)));
                    i = i + 1;
                    break;
                } else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
                    currObject.value = value.replace(decimalSymbol, ".");
                    fireHTMLEvent(currObject, "onpropertychange");
                    i = i + 1;
                    break;
                  } 
                  currObject.value = value;
                  fireHTMLEvent(currObject, "onpropertychange");
                  i = i + 1;
                  break;
                }   
            }
          default:
            currObject.value = value;
        } 
		}
		else{
			break;
		}
    }
          
}
function fnShowCustomerDetails(obj, event){    
    var e = window.event || event;
    var srcElement = getEventSourceElement(e);
    if(obj.id =="BLK_B1__SPEND_ANALYSIS_REQD"){
		//sfr 17332969 : sending customer number as pkey field
		 fndispJointAccDB(mainWin.custData[0],'CUST_NO','',mainWin.dashboardParams.accPkVals.split('~')[0]); //Fix for 19224256
       // fndispJointAccDB(document.getElementById("BLK_B1__CUST_AC_NO").value,'CUST_ACC','',g_txnBranch);
    }else if(obj.id =="BLK_B1__TRACK_RECEIVABLE"){
        fndispNotepadDetDB(document.getElementById("BLK_B1__CUST_AC_NO").value,'CUST_ACC','',mainWin.dashboardParams.accPkVals.split('~')[0]) //Fix for 19224256
    }else{
        fnStartCustomerSessionAction();       
    }
}


function fndispJointAccDB(fieldValue, fieldName, fieldId, brnFldValue) {
    detailWinParams = new Object();
    /*Bug No 16929551 Changes Start */
    detailWinParams.DetailPkVals = fieldValue;//Bug No 16929551 Changes 
   /* if (typeof (fieldName) != "undefined" && fieldName.indexOf("REF") != -1) {
        if (fieldValue != "") {
            detailWinParams.contrefno = fieldValue;
            mainWin.dispHref1Dashboard("CSDJNTHD", seqNo);
        }
    } else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") != -1 || fieldName.indexOf("AC") != -1)) {
        if (fieldValue != "") {
            detailWinParams.accno = fieldValue;
            detailWinParams.branch = brnFldValue;
            mainWin.dispHref1Dashboard("CSDJNTHD", seqNo);
        }
    } else*/
    /*Bug No 16929551 Changes End*/
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("CST") != -1 || fieldName.indexOf("CUST") != -1 || fieldName.indexOf("CIF") != -1)) { 
        if (fieldValue != "") {
            detailWinParams.custno = fieldValue;
			detailWinParams.accno =	document.getElementById("BLK_B1__CUST_AC_NO").value; //Added for 17332969 
            detailWinParams.branch = brnFldValue;//Added for 17332969
			mainWin.dispHref1Dashboard("CSDJNTHD", seqNo);
        }
    }
}

function fndispNotepadDetDB(fieldValue, fieldName, fieldId, brnFldValue) {
    detailWinParams = new Object();
    detailWinParams.DetailPkVals = fieldValue;
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") != -1 || fieldName.indexOf("AC") != -1)) {
        if (fieldValue != "") {
            detailWinParams.accno = fieldValue;
            detailWinParams.branch = brnFldValue;
            mainWin.dispHref1Dashboard("STSCUREL", seqNo);
        }
    }
}


function alert(message) {
    parent.mask();
    parent.showAlerts(fnBuildAlertXML('', 'I', message), 'I');
    parent.alertAction = "UNMASK";
}
//REDWOOD_Changes
//OJET Migration
function fnBindScreenElements(tabsObj) {
    if(!tabsObj){
      tabsObj = document;  
    }
    if ((getBrowser().indexOf("SAFARI") !=  - 1) || (getBrowser().indexOf("CHROME") !=  - 1) ||  (getBrowser().indexOf("FIREFOX") !=  - 1) || (getBrowser().indexOf("OPERA") !=  - 1)) {
        //ie11 changes//12.0.4 summary performance chages
        try {
        
        
      
            var scriptElements = tabsObj.getElementsByTagName("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));
                    fnEval();
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 start*/
    else if (getBrowser().indexOf("IE") !=  - 1) {
        //ie11 changes
        try {
            var scriptElements = tabsObj.getElementsByTagName("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].defer == true) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(scriptElements[i].innerHTML);
                    fnEval();
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    }
      
    
     try {
     if( tabsObj.getElementsByTagName("template")){
         for(var j = 0;j< tabsObj.getElementsByTagName("template").length;j++){
            var scriptElements = tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));
                    fnEval();
                    
                }
            }
                    fnBindSelectElements(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-select-single"));
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-button"),"oj-button","onclick","on-oj-action");
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-select-single"),"oj-select-single","onchange","on-oj-value-action");
             tabsObj.getElementsByTagName("template")[j].innerHTML =  tabsObj.getElementsByTagName("template")[j].innerHTML.replace(new RegExp("readonly_temp", 'g'), "readonly");
         }
         
     }
     
         
        }
        catch (e) {
            alert(e.message);
        }
        fnBindSelectElements();
       fnUpdateEventActions(null,"oj-button","onclick","on-oj-action");
       fnUpdateEventActions(null,"oj-select-single","onchange","on-oj-value-action");
    /*fnBindSelectElements(document.getElementsByTagName("template")[0].content.querySelectorAll("oj-select-single"));
    document.getElementsByTagName("template")[0].innerHTML =document.getElementsByTagName("template")[0].innerHTML.replace(new RegExp("value_temp", 'g'), "value");
    document.getElementsByTagName("template")[0].innerHTML =  document.getElementsByTagName("template")[0].innerHTML.replace(new RegExp("readonly_temp", 'g'), "readonly");*/


}

function fnBindSelectElements(obj) {
    var selectElem;
    if (obj != null) {
        selectElem = obj;//.getElementsByTagName("oj-select-single");
    }
    else {
        selectElem = document.getElementsByTagName("oj-select-single");
    }
    for (var cnt = 0;cnt < selectElem.length;cnt++) {
        if (selectElem[cnt].id != ""  && selectElem[cnt].getAttribute("adv_search")== null) {
        var dbt = selectElem[cnt].getAttribute("DBT");
        if(dbt==null){
            dbt =  selectElem[cnt].getAttribute("CONTROL_DBT");
        }
        var fldName = selectElem[cnt].getAttribute("name");
        var fldId = dbt+"__"+fldName;
            selectElem[cnt].setAttribute("data", "[[arrProvider" +fldId + "]]");
        try {
                var parentVal = "";
                while (typeof (isDetailed) == "undefined") {
                    parentVal += "parent."
                    var fnEval = new Function("return " + parentVal + "isDetailed");
                    isDetailed = fnEval();
                }
                if (isDetailed && selectControl[fldId]) {
                    for (var i = 0;i < selectControl[fldId].length;i++) {
                        if (selectControl[fldId][i].defaultValue && selectElem[cnt].getAttribute("ME")!='Y') {
                            selectElem[cnt].setAttribute("value", selectControl[fldId][i].defaultValue);
                        break;
                    }
    }

}

        }
        catch (e) {
            console.log(e);
        }
             if(selectElem[cnt].getAttribute("ME")=='Y'){
                selectElem[cnt].setAttribute(":id", "[['" + fldId + "RC'+row.index]]");
            }
        }

    }
}

function fnUpdateEventActions(obj,elemntType,eventName,actionName) {
    var element;
    if (obj != null) {
        element = obj;//.getElementsByTagName("oj-select-single");
    }
    else {
        element = document.getElementsByTagName(elemntType);
    }
    for (var cnt = 0;cnt < element.length;cnt++) {
        if (element[cnt].id != "WNDbuttonsMin" && element[cnt].id != "WNDbuttons") {
            var onClickMethods = element[cnt].getAttribute(eventName);
            var consolidatedMethod = "";
            if (onClickMethods) {
                element[cnt].removeAttribute(eventName);
                consolidatedMethod = "[[function() {" + onClickMethods + "}.bind(null)]]";
                element[cnt].setAttribute(actionName, consolidatedMethod);
            }
        }

    }
    
 //REDWOOD_Changes
}