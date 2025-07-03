/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtGlobalSum.js
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
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Jun-2017 
**  Modified Reason      : Issue in screen saved query tab with different query criteria is fixed 
**  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230510 

**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Jun-2017 
**  Modified Reason      : Code changes to handle save query feature when recommended search 
                           criteria search in Advanced search is used. Also changes done to handle 
                           modification of existing save criteria 
**  Retro Source         : 9NT1606_12_2_NORTHERN_TRUST_COMPANY
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230635 

**  Modified By          : Neethu Sreedharan
**  Modified On          : 25-Jul-2017 
**  Modified Reason      : The issue of getting server processing failed while clicking on the column to do sorting is fixed 
**  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_4_RETRO_12_2_26384512

**  Modified By          : Vignesh MG
**  Modified On          : 23-Jan-2020
**  Change Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
**  Search String        : 30620131  

**  Modified By          : Saloni Rai
**  Modified On          : 11-Feb-2020
**  Change Description   : Fix provided to return an error incase Advanced Search criteria results in invalid query.
**  Search String        : Bug_30849927

**  Modified By          : Vignesh MG
**  Modified On          : 01-Dec-2021
**  Change Description   : LOCK COLUMN ISSUE ON SUMMARY SCREENS WITH LESS THAN 8 COLUMNNS.
**  Search String        : FCUBS_14_5_INV_SUPP_SFR_33144068

**  Modified By          : Girish M
**  Modified On          : 04-Apr-2023
**  Change Description   : Advance Search Button not working on second click.
**  Search String        : REDWOOD_35217626

**  Modified By          : Nagendra Babu
**  Modified On          : 22-May-2023
**  Change Description   : STSCIF Upon doing order by, system does not open correct record.
**  Search String        : REDWOOD_35283566 


**  Modified By          : Girish M
**  Modified On          : 08-May-2024
**  Change Description   : Sorting and selecting record from summary using detail button is not displaying correct record.
**  Search String        : REDWOOD_36575123

**  Modified By          : Girish M
**  Modified On          : 20-Dec-2024
**  Change Description   : Dynamic width adjustment to column in OJ-TABLE.
**  Search String        : REDWOOD_Column_Resize
----------------------------------------------------------------------------------------------------
*/
/* Variables from ExtSummary.xsl - Starts Here */
var summaryScreen = null;
var gscrPos = null;
var g_scrType = null;
//imgpath = "<xsl:value-of select="$imgPath_XSL"/>";
var l_LablesArr = null;
var OptionValue = null;
var fieldType = null;
var relatedField = null;
var scrollReqd = null;//12.0.3 change
/* Variables from ExtSummary.xsl - Ends Here */

var defaultWhereClause = "";
var defaultOrderByClause = "";
var travOrderByClause = "";/* 15903479 */
var g_DetPkArray = new Array();//RECid ARRAY EXTRACTED FROM THE SUMMARY RESPONSE WILL BE STORED
var imgPath = mainWin.theme_imagesPath;
var LastQryDOM = null;
var sumTxnBranch = "";

//Added for Navigation
/* 9NT1606 ITR SFR 18807298 - FCUBS 12.0.2 - SIEBEL 8.2.2.4.0 Integration Changes Starts */
var gfrmSearch = "";
var gcEvent = "";
/* 9NT1606 ITR SFR 18807298 - FCUBS 12.0.2 - SIEBEL 8.2.2.4.0 Integration Changes Ends */
var gcNAV_FIRST = 0;
var gcNAV_PREVIOUS = 1;
var gcNAV_GOTO = 2;
var gcNAV_NEXT = 3;
var gcNAV_LAST = 4;
var gcNUM_NAV_BUTTONS = 5;
var detailWinParams = new Object();
var sumRsltRowNo;
var userParentFunc = "";
var userDetailPk = "";
var searchQry = "";
var respDom = "";
var tmpcriteriaName = "";
var tmpremarks = "";
//Added for 17077004 start
var currQryCriteriaName = "";
var currQryCriteriaRemarks = "";
//Added for 17077004 start
var dataprovider;  //REDWOOD_CHANGES
var columnArr = [];	//REDWOOD_CHANGES
function fnLoad(xmlFile, xslFile) {
    var t = getDateObject();
    var startjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    gSummaryOpened = true;
    whereClause_adv = "";
    orderByClause_adv = "";
	//12.1 summary performance changes new start
     if(typeof(criteriaSearch) == "undefined"){
        criteriaSearch="N";
    }
	//12.1 summary performance changes new end
    if (!fnPreLoad_SumMain())
        return false;
    try {
        /*12.1 Performance related changes start */
        /*12.1 fix for bug 14761489 start */
        var funScrName = functionId + strScreenName;
        if (typeof (mainWin.screenHtmlCache[funScrName]) == "undefined") {
            mainWin.screenHtmlCache[funScrName] = new Object();
            mainWin.screenHtmlCache[funScrName] = new Object();//12.1 Caching Tab load
            mainWin.screenHtmlCache[funScrName].cachedUIXML = loadXMLFile(xmlFileName);//12.1 Caching Tab load
            var html = ShowXML(xmlFile, xslFile, strScreenName);

            if (getBrowser().indexOf("IE") !=  - 1) {
                //ie11 changes
                document.getElementById("ResTree").insertAdjacentHTML("beforeEnd", html);
            }
            else {
                document.getElementById("ResTree").appendChild(html);
            }
   //REDWOOD_CHANGES         
             if (getBrowser().indexOf("FIREFOX") != -1) {
                document.getElementById("ResTree").querySelectorAll('template').forEach((elem) => elem.remove());
                document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
                  
            }else{
                 document.getElementById("ResTree").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
            }  
            
            /* Code for executing the Script inside XSL files - Start */
//
//            if ((getBrowser().indexOf("SAFARI") !=  - 1) || (getBrowser().indexOf("CHROME") !=  - 1) || (getBrowser().indexOf("OPERA") !=  - 1)) {
//                //ie11 changes//12.0.4 summary performance chages
//                try {
//                    var scriptElements = document.getElementsByTagName("script");
//                    for (var i = 0;i < scriptElements.length;++i) {
//                        if (scriptElements[i].getAttribute("DEFER") != null) {
//                            //eval(getInnerText(scriptElements[i]));
//                            var fnEval = new Function(getInnerText(scriptElements[i]));
//                            fnEval();
//                        }
//                    }
//                }
//                catch (e) {
//                    alert(e.message);
//                }
//            }
//            /*Fix for 17035806 start*/
//            else if (getBrowser().indexOf("IE") !=  - 1) {
//                //ie11 changes
//                try {
//                    var scriptElements = document.getElementsByTagName("script");
//                    for (var i = 0;i < scriptElements.length;++i) {
//                        if (scriptElements[i].defer == true) {
//                            //eval(getInnerText(scriptElements[i]));
//                            var fnEval = new Function(scriptElements[i].innerHTML);
//                            fnEval();
//                        }
//                    }
//                }
//                catch (e) {
//                    alert(e.message);
//                }
//            }	   
//REDWOOD_CHANGES
            /*Fix for 17035806 end*/
            /* Code for executing the Script inside XSL files - End */
            mainWin.screenHtmlCache[funScrName].cachedHTML = document.getElementById("ResTree").innerHTML;
            mainWin.screenHtmlCache[funScrName].cachedScrName = strScreenName;
            mainWin.screenHtmlCache[funScrName].cachedScrType = g_scrType;
            mainWin.screenHtmlCache[funScrName].cachedSubScrHeaderTabId = subScrHeaderTabId;
            mainWin.screenHtmlCache[funScrName].cachedSubScrBodyTabId = subScrBodyTabId;
            mainWin.screenHtmlCache[funScrName].cachedXmlFileName = gXmlFileName;
            mainWin.screenHtmlCache[funScrName].cachedScreenName = gScreenName;
            mainWin.screenHtmlCache[funScrName].cachedXslFileName = gXslFileName;
            mainWin.screenHtmlCache[funScrName].cachedSummaryScreen = summaryScreen;
            mainWin.screenHtmlCache[funScrName].cachedGscrPos = gscrPos;
            mainWin.screenHtmlCache[funScrName].cachedGscrType = g_scrType;
            mainWin.screenHtmlCache[funScrName].cachedLablesArr = l_LablesArr;
            mainWin.screenHtmlCache[funScrName].cachedOptionValue = OptionValue;
            mainWin.screenHtmlCache[funScrName].cachedFieldType = fieldType;
            mainWin.screenHtmlCache[funScrName].cachedRelatedField = relatedField;
            mainWin.screenHtmlCache[funScrName].cachedScrollReqd = scrollReqd;//Fix for 18365550 
        }
        else {
            /* Code for executing the Script inside XSL files - Start */  
//REDWOOD_CHANGES
//
//            if ((getBrowser().indexOf("SAFARI") !=  - 1) || (getBrowser().indexOf("CHROME") !=  - 1) || (getBrowser().indexOf("OPERA") !=  - 1)) {
//                //ie11 changes//12.0.4 summary performance chages
//                try {
//                    var scriptElements = document.getElementsByTagName("script");
//                    for (var i = 0;i < scriptElements.length;++i) {
//                        if (scriptElements[i].getAttribute("DEFER") != null) {
//                            //eval(getInnerText(scriptElements[i]));
//                            var fnEval = new Function(getInnerText(scriptElements[i]));
//                            fnEval();
//                        }
//                    }
//                }
//                catch (e) {
//                    alert(e.message);
//                }
//            }
//            else if (getBrowser().indexOf("IE") !=  - 1) {
//                //ie11 changes
//                try {
//                    var scriptElements = document.getElementsByTagName("script");
//                    for (var i = 0;i < scriptElements.length;++i) {
//                        if (scriptElements[i].defer == true) {
//                            //eval(getInnerText(scriptElements[i]));
//                            var fnEval = new Function(scriptElements[i].innerHTML);
//                            fnEval();
//                        }
//                    }
//                }
//                catch (e) {
//                    alert(e.message);
//                }
//            }		  
//REDWOOD_CHANGES
            /* Code for executing the Script inside XSL files - End */
            strScreenName = mainWin.screenHtmlCache[funScrName].cachedScrName;
            g_scrType = mainWin.screenHtmlCache[funScrName].cachedScrType;
            subScrHeaderTabId = mainWin.screenHtmlCache[funScrName].cachedSubScrHeaderTabId;
            subScrBodyTabId = mainWin.screenHtmlCache[funScrName].cachedSubScrBodyTabId;
            gXmlFileName = mainWin.screenHtmlCache[funScrName].cachedXmlFileName;
            gScreenName = mainWin.screenHtmlCache[funScrName].cachedScreenName;
            gXslFileName = mainWin.screenHtmlCache[funScrName].cachedXslFileName;
            document.getElementById("ResTree").innerHTML = mainWin.screenHtmlCache[funScrName].cachedHTML;
            summaryScreen = mainWin.screenHtmlCache[funScrName].cachedSummaryScreen;
            gscrPos = mainWin.screenHtmlCache[funScrName].cachedGscrPos;
            g_scrType = mainWin.screenHtmlCache[funScrName].cachedGscrType;
            l_LablesArr = mainWin.screenHtmlCache[funScrName].cachedLablesArr;
            OptionValue = mainWin.screenHtmlCache[funScrName].cachedOptionValue;
            fieldType = mainWin.screenHtmlCache[funScrName].cachedFieldType;
            relatedField = mainWin.screenHtmlCache[funScrName].cachedRelatedField;
            scrollReqd = mainWin.screenHtmlCache[funScrName].cachedScrollReqd;//12.0.3 change
        }
        /*12.1 Performance related changes ends */
    }
    catch (e) {
        alert(e.message);
    }
    fnBindScreenElements();//REDWOOD_CHANGES
    /*12.1 fix for bug 14761489 ends */
    debugs("Inner Html", html);
    fndisableNavBtns();
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);   
//REDWOOD_CHANGES
    mainWin.fnSetDatalist(functionId);
    //fnSetScreenSize();//static header change
    // fnSyncTableWidth();//Static Header change
    //fnCalcHgt(false);	   
//REDWOOD_CHANGES
    //document.getElementById("WNDbuttons").setAttribute('onclick','fnExit_sum("",event)');
    if (parseInt(summaryQryCriteria) == 0) {
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SavedQry").style.display = "none";
    }
    addEvent(document.getElementById("WNDbuttons"), "onclick", "fnExit_sum(\"\",event)");
    setTimeout(function(){fnCalcHgt(false);},0);//REDWOOD_CHANGES
    //document.getElementById("Refresh").disabled = true;
    //document.getElementById("Refresh").style.display = "none";
    //document.getElementById("Export").style.display = "none";
    mainWin.document.getElementById("fastpath").value = functionId;
    //mainWin.showToolbar("", "", "");
    //fix for 17014629 starts
    var detailToolBarIcons = document.getElementById("toolbar").getElementsByTagName("LI");
    for (var cnt = 0;cnt < detailToolBarIcons.length;cnt++) {
        detailToolBarIcons[cnt].disabled = true;
    }
   
    //fix for 17014629 ends	  
//REDWOOD_CHANGES
   // mainWin.fnSetDatalist(functionId);//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist
   // fnPostLoad_SumMain();	  
//REDWOOD_CHANGES
        
    /*var tEnd = getDateObject();
    var jsEndTime = (tEnd.getHours() * (3600 * 1000)) + (tEnd.getMinutes() * (60 * 1000)) + (tEnd.getSeconds() * 1000) + tEnd.getMilliseconds();
    try{
          var dbtime=0;
          var servertime=clientHandlerExit-clientHandlerEntry;
          t = getDateObject();
          time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
        
          var jstime = parseFloat(parseFloat(jsEndTime)-parseFloat(startjsTime)) ; 
          totaltime = parseFloat(parseFloat(t.getTime())-parseFloat(inLoadTime)) ;
          startDate = new Date(parseFloat(inLoadTime));
          startTime = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate()+" "+startDate.getHours()+':'+startDate.getMinutes()+':'+startDate.getSeconds();
          endTime = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
        
        
        jstime = Math.round(jstime*100)/100;
        //fnPostActionLog(jstime,dbtime,servertime,startTime, endTime, totaltime,"","","",seqNo,"",mainWin.SignonSerial,seqNo,"LOAD"); 
        //fnPopulateTimes(mainWin.SignonSerial,seqNo,actionseqNo,jstime,dbtime,servertime,startTime,endTime,totaltime);
    }catch(e){
            time="";
            sumStartTime = "";
            sumEndTime = "";
    }*/
    /*if(mainWin.DebugWindowFlg == "Y") {
        mainWin.serverDebugStmt =webDbg + "\n\n"+appDbg+"\n\n"+dbDbg;
    }debug revert*/
    //if (!fnEventsHandler('fnPostLoad_Sum')) return false;
    /*if (dashboardSeqNo != null && dashboardSeqNo != "") {
        eval(document.getElementsByName("Search")[0].getAttribute("onclick"));
    }*/
}

function fnExecuteQuery_sum(fromSearch, e) {
  inDate = setActionTime();
	/* 9NT1606 ITR SFR 18807298 - FCUBS 12.0.2 - SIEBEL 8.2.2.4.0 Integration Changes Starts */
	gfrmSearch = fromSearch;
	gcEvent = e;
	/* 9NT1606 ITR SFR 18807298 - FCUBS 12.0.2 - SIEBEL 8.2.2.4.0 Integration Changes Ends */	

    //12.1 summary performance changes new start
    if(fromSearch == "Y" && criteriaSearch =='Y'){
        if(!validateCriteria()) return false;
    }
   //12.1 summary performance changes new end
    if (!fnPreExecuteQuery_sumMain()) return false;
    //if (!fnEventsHandler('fnPreExecuteQuery_sum')) return false;
    debugs("fromSearch=", fromSearch);
    gAction = "EXECUTEQUERY";

    //strCurrentTabId = 'idQuery';
    strCurrentTabId = 'idQuery';//Fix for 17694660
    if (fromSearch == 'S') {
        /*15903479 Start*/
        setInnerText(document.getElementsByName("CurPage")[0], 1);
        setInnerText(document.getElementsByName("TotPgCnt")[0], 1);
        fcjRequestDOM = buildSummaryQueryXML('Y');
    }
    else /*15903479 End*/
        if (fromSearch == 'Y') {
            setInnerText(document.getElementsByName("CurPage")[0], 1);
            setInnerText(document.getElementsByName("TotPgCnt")[0], 1);
            strCurrentTabId = 'idQuery';
            defaultOrderByClause = "";/*15903479 */
            travOrderByClause = "";/*15903479 */
            whereClause_adv = "";
            orderByClause_adv = "";
            fcjRequestDOM = buildSummaryQueryXML('Y');
        }
        else if (fromSearch == 'N') {
            fcjRequestDOM = buildSummaryQueryXML('N');
        }
        else {
            setInnerText(document.getElementsByName("CurPage")[0], 1);
            defaultOrderByClause = "";/*15903479 */
            travOrderByClause = "";/*15903479 */
            strCurrentTabId = 'idAdvanced';
            fcjRequestDOM = buildSummaryQueryXML('A');
        }
    debugs("fcjRequestDOM=", getXMLString(fcjRequestDOM));

    //chacheLastQryDOM["LastQRyDOM"] = fcjRequestDOM; //Ashok this needs to be enabled.
    //LastQryDOM = fcjRequestDOM.cloneNode(true);
    searchQry = fromSearch;
    LastQryDOM = loadXMLDoc(getXMLString(fcjRequestDOM));
    fnPreQueryChange(e);
    debugs(getXMLString(fcjRequestDOM), "P");
    if (!fnSubmitQuery()) {
        /*debugs("CALLING fnResetQry");
        fnResetQry();*/
    }
    fnPostQueryChange();
    if (getInnerText(document.getElementById("TotPgCnt")) == "..." || getInnerText(document.getElementById("TotPgCnt")) > 1) {
        document.getElementById("goto").readonly = false;  //REDWOOD_CHANGES
    }
    if (fromSearch != 'A') {
        //document.getElementById("goto").focus();	 //REDWOOD_CHANGES
        //document.getElementById("goto").select();	 //REDWOOD_CHANGES
    }
    debugs("SummaryHTML", document.body.innerHTML);
    fnDisableQueryFlds();// fix for 17016639
    if (!fnPostExecuteQuery_sumMain()) return false;
    //if (!fnEventsHandler('fnPostExecuteQuery_sum')) return false;
    /*var seqNumarry = getNodeText(selectSingleNode(fcjResponseDOM,"//SEQLIST"));
    var actSeq="0";
    if(seqNumarry != null || seqNumarry!= "")
        actSeq =  seqNumarry.split("~")[2];
        fnpostActionSummary('EXECUTEQUERY');*/
  //  appendDebug(fcjResponseDOM); 
    /*if(mainWin.DebugWindowFlg == "Y") {
        webDbg = selectSingleNode(fcjResponseDOM,"//FCUBS_BODY/WB_DEBUG");
        appDbg = selectSingleNode(fcjResponseDOM,"//FCUBS_BODY/AP_DEBUG");
       // dbDbg = selectSingleNode(fcjResponseDOM,"//FCUBS_BODY/DB_DEBUG");
        mainWin.serverDebugStmt =getNodeText(webDbg) + "\n\n"+getNodeText(appDbg)+"\n\n";
    }*/
       
}

function fnSubmitQuery() {
    var summFuncId = detailFuncId.substring(0,2)+'S'+detailFuncId.substring(3,detailFuncId.length);
/* Changes for 29191645*/
    if(functionId != summFuncId){
        summFuncId = functionId;
    }
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, summFuncId);
    //debugs("fcjResponseDOM=", getXMLString(fcjResponseDOM)); //Bug_30849927 Commented

    /*if (dlgArg && dlgArg.screenArgs && dlgArg.screenArgs['ISADV_SUM'] == true) // TODO
        return fcjResponseDOM;*/

    if (fcjResponseDOM && getXMLString(fcjResponseDOM) != "") {
        if (getXMLString(fcjResponseDOM).indexOf("FC-MAINT53") >  - 1) {
            mask();
            showAlerts(fnBuildAlertXML('FC-MAINT53', 'E'), 'E');
            alertAction = "UNMASK";
            return false;
        }
        var msgStatus = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
        var messageNode = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/RESPONSE");
        debugs("msgStatus=", msgStatus);
        if (msgStatus != 'SUCCESS') {
            fnClearSummary();
            //alert(invalidSQL);
            gAction = "";
            mask();
            showAlerts(fnBuildAlertXML("EXTSUM-001", "E"), "E");
            alertAction = "UNMASK";
            //displayError("EXTSUM-001"); //ashok eRROR pROCESSING NEEDS TO BE DONE..BY PASSING THE ERROR NODE --OVRDMSGS.JSP
            return false;
        } else {
            submitQuery = true;
            var objQueryRecords = selectNodes(fcjResponseDOM, "FCJMSG/MSG/REC");
            if (objQueryRecords.length == 0) {
                fnClearSummary();
                //alert(noRecord); 
                showToolbar_sum(gAction);
                gAction = "";
                mask();
                showAlerts(fnBuildAlertXML("EXTSUM-002", "I"), "I");
                alertAction = "UNMASK";
                //displayError("EXTSUM-002"); //ashok eRROR pROCESSING NEEDS TO BE DONE..BY PASSING THE ERROR NODE --OVRDMSGS.JSP
                return false;
            } else {
                resetQueryCollapsible("false"); //REDWOOD_CHANGES
                fnShowSummaryData();
            }

            //fnSetExitButton();
            showToolbar_sum(gAction);
            gAction = "";
        }
    } else {
        /*appendErrorCode('ST-COM036', null); //Response dom is no null
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);*/
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_EMPTY_RESPONSE")), "C");
        alertAction = "UNMASK";
        return false;
    }	
//REDWOOD_CHANGES
//    var THElem = document.getElementById("TBL_QryRsltsHeader").getElementsByTagName("TD");//static header change  //OJET Migration
//    for (var i = 0;i < THElem.length;i++) {
//        THElem[i].removeAttribute("style");
//    }	  
//REDWOOD_CHANGES
    return true;
}

function fnPreQueryChange(e) {
    //check the no of rows in the result table, document.getElementsByName("Records")[0].value, create the blank rows...
//REDWOOD_CHANGES
//    var tblDivObj = document.getElementById("QryRslts");
//    var tabStr = tblDivObj.innerHTML;
//    var avalRows = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;
//    var rowsHtml = document.getElementById("TBL_QryRslts").tBodies[0].innerHTML;
//
//    var l_TRString = "";
//    var l_recPerPage = document.getElementsByName("Records")[0].value;
//    if (Number(l_recPerPage) > avalRows) {
//        rowsHtml = changeExistingTD();
//        l_TRString = buildAdditionalTR(l_TRString, avalRows, l_recPerPage, e);
//		//Fortify fix starts
//		if (l_TRString==null)
//			return false;
//		//Fortify fix ends
//        rowsHtml = rowsHtml + l_TRString;
//        //tblDivObj.innerHTML = tabStr.substring(0,tabStr.indexOf("<TBODY>")+6) + rowsHtml + tabStr.substring(tabStr.indexOf("</TBODY>"));
//    } else {
//        for (var i = avalRows - 1; i >= Number(l_recPerPage); i--) {
//            document.getElementById("TBL_QryRslts").tBodies[0].deleteRow(i);
//        }
//        rowsHtml = changeExistingTD();
//    }
//    if (tabStr.indexOf("<TBODY>") !=  - 1) {
//        tblDivObj.innerHTML = tabStr.substring(0, tabStr.indexOf("<TBODY>") + 7) + rowsHtml + tabStr.substring(tabStr.indexOf("</TBODY>"));
//    } else { //Mozilla case
//        tblDivObj.innerHTML = tabStr.substring(0, tabStr.indexOf("<tbody>") + 7) + rowsHtml + tabStr.substring(tabStr.indexOf("</tbody>"));
//    }
//    var selectObject = document.getElementsByName("Records")[0];
//    for (var index = 0;index < selectObject.length;index++) {
//        if (selectObject.options[index].value == l_recPerPage) {
//            //selectObject.options[index].selectedIndex = index;
//            selectObject.selectedIndex = index;
//        }
//    }
//
//    //static header change start
//    tblDivObj = document.getElementById("QryRsltsFreeze");
//    tabStr = tblDivObj.innerHTML;
//    avalRows = document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows.length;
//    rowsHtml = document.getElementById("TBL_QryRsltsFreeze").tBodies[0].innerHTML;
//
//    l_TRString = "";
//    if (Number(l_recPerPage) > avalRows) {
//        rowsHtml = changeExistingFrzTD();
//        l_TRString = buildAdditionalTRFreeze(l_TRString, avalRows, l_recPerPage, e);
//		//Fortify fix starts
//		if (l_TRString==null)
//			return false;
//		//Fortify fix ends
//        rowsHtml = rowsHtml + l_TRString;
//        //tblDivObj.innerHTML = tabStr.substring(0,tabStr.indexOf("<TBODY>")+6) + rowsHtml + tabStr.substring(tabStr.indexOf("</TBODY>"));
//    } else {
//        for (var i = avalRows - 1; i >= Number(l_recPerPage); i--) {
//            document.getElementById("TBL_QryRsltsFreeze").tBodies[0].deleteRow(i);
//        }
//        rowsHtml = changeExistingFrzTD();
//    }
//    if (tabStr.indexOf("<TBODY>") !=  - 1) {
//        tblDivObj.innerHTML = tabStr.substring(0, tabStr.indexOf("<TBODY>") + 7) + rowsHtml + tabStr.substring(tabStr.indexOf("</TBODY>"));
//    } else { //Mozilla case
//        tblDivObj.innerHTML = tabStr.substring(0, tabStr.indexOf("<tbody>") + 7) + rowsHtml + tabStr.substring(tabStr.indexOf("</tbody>"));
//    }
	return true;//Fortify fix	
//REDWOOD_CHANGES
    //static header change end
}

function fnPostQueryChange() {
    if (fcjResponseDOM && getXMLString(fcjResponseDOM) !== "") {
        if (document.getElementById("QryRslts")) {
            fndisableNavBtns();
            document.getElementsByName("Records")[0].readonly = true; //REDWOOD_CHANGES
            document.getElementById("goto").value = "";	//REDWOOD_CHANGES
            var totalQueryPages = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("TOTAL_PAGES");
            var curPage = Number(getInnerText(document.getElementById("CurPage")));
            if (totalQueryPages == '' || totalQueryPages == '0' || totalQueryPages == null) {
                setInnerText(document.getElementById("TotPgCnt"), 1);
            } else {
                setInnerText(document.getElementById("TotPgCnt"), totalQueryPages);
                if (getInnerText(document.getElementById("CurPage")) == "...") {
                    setInnerText(document.getElementById("CurPage"), totalQueryPages);
                    curPage = Number(getInnerText(document.getElementById("CurPage")));
                }
            }

            if (totalQueryPages != "..." && totalQueryPages > '1') {  
//REDWOOD_CHANGES
                //document.getElementsByName("gotopage")[0].disabled = false;
                document.getElementById("goto").readonly = false;
                //document.getElementsByName("go")[0].className = "BTNtext";
            //    fnHover(document.getElementsByName("go")[0]);
//REDWOOD_CHANGES
                if (curPage == 1) {
                    document.getElementsByName("navLast")[0].disabled = false;
                    document.getElementsByName("navNext")[0].disabled = false;
//REDWOOD_CHANGES
                   // document.getElementsByName("navNext")[0].className = "BTNimg";
                  //  fnHover(document.getElementsByName("navNext")[0]);
                  //  document.getElementsByName("navLast")[0].className = "BTNimg";
                    //fnHover(document.getElementsByName("navLast")[0]); 
//REDWOOD_CHANGES
                } else if (curPage == totalQueryPages) {
                    document.getElementsByName("navFirst")[0].disabled = false;
                    document.getElementsByName("navPrev")[0].disabled = false;
//REDWOOD_CHANGES
//                    document.getElementsByName("navFirst")[0].className = "BTNimg";
//                    //fnHover(document.getElementsByName("navFirst")[0]);
//                    document.getElementsByName("navPrev")[0].className = "BTNimg";
                    //fnHover(document.getElementsByName("navPrev")[0]);  
//REDWOOD_CHANGES
                } else {
                    document.getElementsByName("navLast")[0].disabled = false;
                    document.getElementsByName("navNext")[0].disabled = false;
                    document.getElementsByName("navFirst")[0].disabled = false;
                    document.getElementsByName("navPrev")[0].disabled = false;
//REDWOOD_CHANGES
//                    document.getElementsByName("navFirst")[0].className = "BTNimg";
//                    //fnHover(document.getElementsByName("navFirst")[0]);
//                    document.getElementsByName("navPrev")[0].className = "BTNimg";
//                   // fnHover(document.getElementsByName("navPrev")[0]);
//                    document.getElementsByName("navNext")[0].className = "BTNimg";
//                    //fnHover(document.getElementsByName("navNext")[0]);
//                    document.getElementsByName("navLast")[0].className = "BTNimg";
//                    ///fnHover(document.getElementsByName("navLast")[0]);
//REDWOOD_CHANGES
                }
            } else if (totalQueryPages == "...") {	 
//REDWOOD_CHANGES
              //  document.getElementsByName("gotopage")[0].disabled = false;
                document.getElementById("goto").readonly = false;
               // document.getElementsByName("go")[0].className = "BTNtext";
                //fnHover(document.getElementsByName("go")[0]);	 
//REDWOOD_CHANGES
                if (curPage == 1) {
                    document.getElementsByName("navNext")[0].disabled = false;
                   // document.getElementsByName("navNext")[0].className = "BTNimg"; //REDWOOD_CHANGES
                  //  fnHover(document.getElementsByName("navNext")[0]);  //REDWOOD_CHANGES
                    document.getElementsByName("navLast")[0].disabled = false;
                   // document.getElementsByName("navLast")[0].className = "BTNimg"; //REDWOOD_CHANGES
                    //fnHover(document.getElementsByName("navLast")[0]);  //REDWOOD_CHANGES
                } else if (curPage != '1') {
                    document.getElementsByName("navFirst")[0].disabled = false;
                    document.getElementsByName("navPrev")[0].disabled = false;	  
          //REDWOOD_CHANGES
                   //// document.getElementsByName("navFirst")[0].className = "BTNimg";
                   // fnHover(document.getElementsByName("navFirst")[0]);
                   // document.getElementsByName("navPrev")[0].className = "BTNimg";
                   // fnHover(document.getElementsByName("navPrev")[0]); 
          //REDWOOD_CHANGES
                    document.getElementsByName("navNext")[0].disabled = false;
                    document.getElementsByName("navFirst")[0].disabled = false;
                    document.getElementsByName("navPrev")[0].disabled = false;
          //REDWOOD_CHANGES
                    //document.getElementsByName("navFirst")[0].className = "BTNimg";
                    //fnHover(document.getElementsByName("navFirst")[0]);
                    //document.getElementsByName("navPrev")[0].className = "BTNimg";
                    //fnHover(document.getElementsByName("navPrev")[0]);
                    //document.getElementsByName("navNext")[0].className = "BTNimg";
                    //fnHover(document.getElementsByName("navNext")[0]);  
          //REDWOOD_CHANGES
                    document.getElementsByName("navLast")[0].disabled = false;
                    //document.getElementsByName("navLast")[0].className = "BTNimg"; //REDWOOD_CHANGES
                    //fnHover(document.getElementsByName("navLast")[0]);  //REDWOOD_CHANGES
                }
            }
        }
        if (selectNodes(fcjResponseDOM, "FCJMSG/MSG/REC").length < document.getElementsByName("Records")[0].value && getInnerText(document.getElementById("CurPage")) != '1') {
            setInnerText(document.getElementById("TotPgCnt"), curPage);
            document.getElementsByName("navFirst")[0].disabled = false;
            document.getElementsByName("navPrev")[0].disabled = false;	  
//REDWOOD_CHANGES
          //  document.getElementsByName("navFirst")[0].className = "BTNimg";
            //fnHover(document.getElementsByName("navFirst")[0]);
           // document.getElementsByName("navPrev")[0].className = "BTNimg";
            //fnHover(document.getElementsByName("navPrev")[0]); 
//REDWOOD_CHANGES
            document.getElementsByName("navNext")[0].disabled = true;
           // document.getElementsByName("navNext")[0].className = "BTNimgD"; //REDWOOD_CHANGES
            document.getElementsByName("navLast")[0].disabled = true;
           // document.getElementsByName("navLast")[0].className = "BTNimgD"; //REDWOOD_CHANGES
        }
        document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage")));//REDWOOD_CHANGES
    }
}

function fnSortRecs(e) {
    var event = window.event || e;
    var scrElem = getEventSourceElement(event);
    if (document.getElementsByName("Search")[0].disabled == true) {
        if (scrElem.parentNode.parentNode.getAttribute("name") == 'undefined') {
            //static header change
            var fldName = scrElem.parentNode.parentNode.name;//static header change
        } else {
            var fldName = scrElem.parentNode.parentNode.getAttribute("name");//static header change
        }
        var orderType = scrElem.getAttribute("order");
	//9NT1606_12_4_RETRO_12_2_26384512 start
	if(orderType == "null" || orderType == null)
	{
		orderType = scrElem.parentNode.getAttribute("order");
	}
	//9NT1606_12_4_RETRO_12_2_26384512 end
        /*var imgLen = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].getElementsByTagName("span");//static header change
        if (imgLen.length > 0) {
            for (var i = 1; i < imgLen.length; i++) { //Fix for 18321079
                imgLen[i].className = "SPNup hide";
            }
        } static header change*/
        fnSetImage(true, event);
        var tempDefaultOrderByClause = defaultOrderByClause;
        //fnResetQry();
        defaultOrderByClause = fldName + ">" + orderType;
        travOrderByClause = defaultOrderByClause;/*15903479 */
        fnExecuteQuery_sum('S');/*15903479 - Changed to 'S'- Sort*/
        //fnExecuteQuery_sum('Y', event);
        //defaultOrderByClause = tempDefaultOrderByClause;
        fnSyncScroll(document.getElementById("QryRslts"));//fixes for bug#21269118
        return true;
    }
}

/*HTML5 Changes Start*/
var doubleTap = false;
function fnShowDetailDevice(v_rowid,event) {
    var evnt = window.event || event;
    if(!doubleTap) {
        doubleTap = true;
        setTimeout( function() { doubleTap = false; }, 500 );
        return false;
    }
    preventpropagate(evnt);
    fnShowDetail(v_rowid, event);
}
/*HTML5 Changes End*/

function fnShowDetail(v_rowid) {
    if (typeof (detailRequired) != 'undefined' && !detailRequired) {
        return false;
    }
    sumRsltRowNo = getRowIndex(v_rowid) -1; //REDWOOD_CHANGES
    userParentFunc = "";
    userDetailPk = "";
    var fromSummary = 'TRUE';
    if (!fnPreShowDetail_SumMain())
        return false;
    //if (!fnEventsHandler('fnPreShowDetail_Sum')) return false;
    if (userParentFunc == "") {
        if (g_DetPkArray.length > 0 && g_DetPkArray.length > sumRsltRowNo) { //REDWOOD_CHANGES
            var detailPk = g_DetPkArray[sumRsltRowNo]; //REDWOOD_CHANGES
			//REDWOOD_35283566 starts
			var currentRow = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells; //summary_sort_issue starts
            for(var i=0;i<currentRow.length;i++){
                if(currentRow[i].getAttribute("name") == 'sumPKs'){
                   detailPk = currentRow[i].getElementsByTagName('OJ-INPUT-TEXT')[0].value;
                }
            } 
			//REDWOOD_35283566 Ends
            detailWinParams.ShowSummary = "TRUE";
            detailWinParams.DetailPkVals = detailPk;
            detailWinParams.sumTxnBranch = sumTxnBranch;
            mainWin.dispHref1(parentFunc, seqNo, fromSummary);
        }
    } else {
        detailWinParams.ShowSummary = "TRUE";
        detailWinParams.DetailPkVals = userDetailPk;
        detailWinParams.sumTxnBranch = sumTxnBranch;
        mainWin.dispHref1(userParentFunc, seqNo, fromSummary);
    }
}

function doNavigate(type, e) {
    switch (type) {
        case gcNAV_FIRST:
            setInnerText(document.getElementById("CurPage"), 1);
            break;
        case gcNAV_PREVIOUS:
            if (Number(getInnerText(document.getElementById("CurPage"))) > 1)
                setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))) - 1);
            break;
        case gcNAV_NEXT:

        //if (Number(getInnerText(document.getElementById("CurPage"))) < Number(getInnerText(document.getElementById("TotPgCnt")) )) 
            setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))) + 1);
            break;
        case gcNAV_LAST:
            if (getInnerText(document.getElementById("TotPgCnt")) != "...") {
                setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("TotPgCnt"))));
            } else {
                setInnerText(document.getElementById("CurPage"), "...");
            }
            break;
        default :
            return;
    }
    document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage"))); //REDWOOD_CHANGES
    defaultOrderByClause = travOrderByClause;/*15903479 */
    fnExecuteQuery_sum('N', e);
    /*if (document.getElementById("toggleLock").title == 'Unlock'){
        lockCols(true);
    }*/
   // fnSelCheckBox(e);	//REDWOOD_CHANGES
   return true;	//REDWOOD_CHANGES
}

function goToPage(e) {
    if (document.getElementById("goto").rawValue == "") { //REDWOOD_CHANGES
        alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        return;
    } else if (isNaN(document.getElementById("goto").value)) {	//REDWOOD_CHANGES
        alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        document.getElementById("goto").value = "";	  //REDWOOD_CHANGES
        return;
    } else if (document.getElementById("goto").rawValue <= 0 || document.getElementById("goto").rawValue.indexOf(".") != -1 || (Number(document.getElementById("goto").rawValue) > Number(getInnerText(document.getElementById("TotPgCnt"))))) { //REDWOOD_CHANGES
        alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        document.getElementById("goto").value = "";	//REDWOOD_CHANGES
        return;
    }
    setInnerText(document.getElementById("CurPage"), Number(document.getElementById("goto").rawValue)); //REDWOOD_CHANGES
    defaultOrderByClause = travOrderByClause;/*15903479 */
    fnExecuteQuery_sum('N', e);
    /*if (document.getElementById("toggleLock").title == 'Unlock'){
        lockCols(true);
    }*/
    fnSelCheckBox(e);
}

/*function lockCols(navigate) {
    var resultTbl = document.getElementById("TBL_QryRslts");
    var TRElem = resultTbl.getElementsByTagName("TR");
    var columnNum = Number(document.getElementsByName("Locks")[0].value);
    if (g_SummaryType == "S") {
        if (!navigate) {
            if (TRElem[0].cells[1].className == 'TBLoneTH') {
                for (var TRCnt = 0; TRCnt < TRElem.length; TRCnt++) {                
                    for (var columnCnt = 0; columnCnt < columnNum; columnCnt++) {
                        TRElem.item(TRCnt).cells[columnCnt+1].className = 'locked';                
                        TRElem.item(TRCnt).cells[columnCnt+1].removeAttribute("style");
                    }                
                }
                document.getElementById("toggleLock").innerHTML = mainWin.getItemDesc("LBL_SUM_UNLOCK");
                document.getElementById("toggleLock").title = 'Unlock';
                document.getElementsByName("Locks")[0].disabled =true;
            } else {
                for (var TRCnt = 1; TRCnt < TRElem.length; TRCnt++) {
                    for (var columnCnt = 0; columnCnt < columnNum; columnCnt++){                
                        TRElem[TRCnt].cells[columnCnt+1].className = '';                
                    }               
                }
                for (var columnCnt = 0; columnCnt < columnNum; columnCnt++) { 
                    TRElem[0].cells[columnCnt+1].className = 'TBLoneTH';
                }
                document.getElementById("toggleLock").innerHTML = mainWin.getItemDesc("LBL_SUM_LOCK");
                document.getElementById("toggleLock").title = 'Lock';
                document.getElementsByName("Locks")[0].disabled =false;
            }
        } else {
            for (var TRCnt = 0; TRCnt < TRElem.length; TRCnt++) {                
                for (var columnCnt = 0; columnCnt < columnNum; columnCnt++){                
                    TRElem[TRCnt].cells[columnCnt+1].className = 'locked';                
                    TRElem[TRCnt].cells[columnCnt+1].removeAttribute("style");
                }
            }
            document.getElementById("toggleLock").innerHTML = mainWin.getItemDesc("LBL_SUM_UNLOCK");
            document.getElementById("toggleLock").title = 'Unlock';        
        }
    } else {
        if (!navigate) {
            if (TRElem[0].cells[1].className == 'TBLoneTH') {
                for (var TRCnt = 0; TRCnt < TRElem.length; TRCnt++) {                
                    for (var columnCnt = 0; columnCnt < columnNum+1; columnCnt++) {
                        TRElem[TRCnt].cells[columnCnt].className = 'locked';                
                        TRElem[TRCnt].cells[columnCnt].removeAttribute("style");
                    }                
                }
                document.getElementById("toggleLock").innerHTML = mainWin.getItemDesc("LBL_SUM_UNLOCK");
                document.getElementById("toggleLock").title = 'Unlock';
                document.getElementsByName("Locks")[0].disabled =true;
            } else {
                for (var TRCnt = 1; TRCnt < TRElem.length; TRCnt++) {
                    for (var columnCnt = 0; columnCnt < columnNum+1; columnCnt++){                
                        TRElem[TRCnt].cells[columnCnt].className = '';                
                    }               
                }
                for (var columnCnt = 0; columnCnt < columnNum+1; columnCnt++) { 
                    TRElem[0].cells[columnCnt].className = 'TBLoneTH';
                }
                document.getElementById("toggleLock").innerHTML =mainWin.getItemDesc("LBL_SUM_LOCK");
                document.getElementById("toggleLock").title = 'Lock';
                document.getElementsByName("Locks")[0].disabled =false;
            }
        } else {
            for (var TRCnt = 0; TRCnt < TRElem.length; TRCnt++) {                
                for (var columnCnt = 0; columnCnt < columnNum+1; columnCnt++){                
                    TRElem[TRCnt].cells[columnCnt].className = 'locked';                
                    TRElem[TRCnt].cells[columnCnt].removeAttribute("style");
                }
            }
            document.getElementById("toggleLock").innerHTML = mainWin.getItemDesc("LBL_SUM_UNLOCK");
            document.getElementById("toggleLock").title = 'Unlock';
        }
    }
}*/

function fnPreLoad_CVS_ADVANCED(screenArgs) {
    screenArgs['DESCRIPTION'] = mainWin.getItemDesc("LBL_ADVANCED");
    screenArgs['ISADV_SUM'] = true;
    return true;
}

function fnBuildExtSummaryLOV(fieldName, fieldLabel, fieldDtype, advLovReturnFld, event) {

    var lovId = fieldName;
    var reductionInfo = fieldLabel + "!TEXT";
    var customLov = "N";
    var customLovId = "";
    if(parent.document.getElementsByName(fieldName).length > 0){
      if(parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOV")){
        customLov = parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOV");
         document.getElementById(advLovReturnFld).setAttribute("CUSTOMLOV", customLov); //REDWOOD_CHANGES
      }   
      if(parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOVID")){   
        customLovId = parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOVID");
      }
    }
    if(customLov == "Y" && customLovId != ""){
      lovId = customLovId;
    }
    if (typeof (lovInfoFlds[lovId]) == "undefined")
        lovInfoFlds[lovId] = {
        };
    if (advLovReturnFld == '')
        lovInfoFlds[lovId][0] = fieldName + "~";//retflds[lovId] = fieldName + "~";   /*12.0.4 UI performance changes */
    else 
        lovInfoFlds[lovId][0] = advLovReturnFld + "~";
    lovInfoFlds[lovId][1] = "";/*12.0.4 UI performance changes */
    //else retflds[lovId] = advLovReturnFld + "~";
    //bndFlds[lovId] = "";
    var advFuncId = "";
    if (functionId.substring(2, 3) == "D") {
        advFuncId = functionId.substring(0, 2) + "S" + functionId.substring(3, functionId.length);
    } else {
        advFuncId = functionId;
    }
    
    //getNextSibling(parent.document.getElementsByName(fieldName).getAttribute("onclick"));
    if(customLov == 'Y'){
      var fnEval = new Function("event", getNextSibling(parent.document.getElementsByName(fieldName)[0]).getAttribute("onclick"));
      fnEval(event);
    }else{
      disp_lov(advFuncId, '', '', fieldLabel, lovId, '', fieldLabel, reductionInfo, '', event);
    }
}
/* Changes for AUTO_LOV start */
function fnBuildAutoSummaryLOV(fieldName, fieldLabel, fieldDtype) {
    var lovId = fieldName;
    var reductionInfo = fieldLabel + "!TEXT";
    // if (advLovReturnFld == '')
    if (typeof (lovInfoFlds[lovId]) == "undefined")
        lovInfoFlds[lovId] = {
        };
    lovInfoFlds[lovId][0] = fieldName + "~";/*12.0.4 UI performance changes */
    //retflds[lovId] = fieldName + "~";
    /*else
        retflds[lovId] = advLovReturnFld + "~";*/
    lovInfoFlds[lovId][1] = "";/*12.0.4 UI performance changes */
    //bndFlds[lovId] = "";
    var advFuncId = "";
    if (functionId.substring(2, 3) == "D") {
        advFuncId = functionId.substring(0, 2) + "S" + functionId.substring(3, functionId.length);
    } else {
        advFuncId = functionId;
    }

    disp_auto_lov(advFuncId, '', fieldLabel, fieldLabel, lovId, '', fieldLabel, reductionInfo);
}
/* Changes for AUTO_LOV end */

function fnSave_sum(scrName, e) {
    if (scrName == "CVS_ADVANCED") {
        //  var advValuesClause ="";
        var i = 0;
        var valueofVariable = ""; //REDWOOD_CHANGES
        var queryValue = ""
        var operationValue = "";
        var queryName = "";
        //Advanced Summary Query Building
        parent.defaultOrderByClause = "";

        var advQryTblRows = getTableObjForBlock("idadvQuryHeaderTable").tBodies[0].rows; //REDWOOD_CHANGES
        for (i = 0;i < advQryTblRows.length;i++) {
            if(advQryTblRows[i].cells[0].children.length > 0) {	//REDWOOD_CHANGES
            // Fix for Bug 16326855 - start 
            // queryValue = queryValue + " " + getInnerText(advQryTblRows[i].cells[1].getElementsByTagName("SPAN")[0]) + "~ "; 
                queryValue = queryValue + " " + getInnerText(advQryTblRows[i].cells[1]) + "~ "; //REDWOOD_CHANGES
                queryName = queryName + " " + getInnerText(advQryTblRows[i].cells[2]) + "~ "; //REDWOOD_CHANGES
            // Fix for Bug 16326855 - end
                operationValue = operationValue + " " + getInnerText(advQryTblRows[i].cells[3]) + "~ ";	//REDWOOD_CHANGES
            //Bug 15908897 fix starts	
//REDWOOD_CHANGES
          /*  if (advQryTblRows[i].cells[3].getElementsByTagName("INPUT")[0]) {
                if (advQryTblRows[i].cells[3].getElementsByTagName("INPUT")[0].name == "HIDDATE") {
                    valueofVaricable = valueofVaricable + advQryTblRows[i].cells[3].getElementsByTagName("INPUT")[0].value + "~";
                }
            }
            else {	 
                valueofVaricable = valueofVaricable + getInnerText(advQryTblRows[i].cells[3].getElementsByTagName("SPAN")[0]) + "~";
            */
		      valueofVariable = valueofVariable + getInnerText(advQryTblRows[i].cells[4]) + "~";
//REDWOOD_CHANGES
            }
        }
        //Bug 15908897 fix ends
        var orderColValue = "";
        var orderOperation = ""
        var advOdrByTblRows = getTableObjForBlock("idadvOrderHeaderTable").tBodies[0].rows;//REDWOOD_CHANGES
        for (i = 0;i < advOdrByTblRows.length;i++) {
            if(advOdrByTblRows[i].cells[0].children.length > 0) { //REDWOOD_CHANGES
                orderColValue = orderColValue + getInnerText(advOdrByTblRows[i].cells[1]) + "~";  //REDWOOD_CHANGES
                orderOperation = orderOperation + getInnerText(advOdrByTblRows[i].cells[2]) + "~"; //REDWOOD_CHANGES
            }	 //REDWOOD_CHANGES
        }
        //12.1 summary performance changes new start
        if(parent.criteriaSearch=='Y'){
            if(!validateAdvCriteria(queryValue,valueofVariable)) return false;//REDWOOD_CHANGES
        }
        //12.1 summary performance changes new end
        var RetObj = new Object();
        RetObj.advWhereClause = queryValue;
        RetObj.advQueryName = queryName;
        RetObj.advOperationClause = operationValue;
        RetObj.advValueClause = valueofVariable;  //REDWOOD_CHANGES
        //RetObj.advOrderByClause = document.getElementById("idTAOrderBy").value;
        RetObj.advOrderByClause = orderColValue;
        RetObj.advOrderOptClause = orderOperation;
        parent.screenArgs['RETURN_VALUE'] = RetObj;
        parent.fnCloseSubScr(e);
        parent.fnExitAdvScr(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);//12.1 summary performance changes new 
        //return true;
    }
}

function fnExit_sum(scrName, e) {
    if (scrName == '') {
        var evnt = window.event || e;
        isExitTriggered = true;
        fnFocus();
        //mainWin.showToolbar("", "", "");
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
        evnt.cancelBubble = true;
    } else {
        parent.fnExitAdvScr(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
    }

}
//12.1 summary performance changes new start
function fnExitAdvScr(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft) {
    parent.document.getElementById(parentScrID).style.width = launcherDIVWidth;
    subscreenLaunched = false; //REDWOOD_35217626
    parent.document.getElementById(parentScrID).children[0].style.width = launcherIFWidth;
    parent.document.getElementById(parentScrID).style.height = launcherDIVHeight;
    parent.document.getElementById(parentScrID).children[0].style.height = launcherIFHeight;
    parent.document.getElementById(parentScrID).style.left = launcherLeft;
    document.getElementById("DIVScrContainer").style.width = launcherResTreeWidth;
    document.getElementById("DIVScrContainer").style.height = launcherResTreeHeight;
    document.getElementById("DIVWNDContainer").style.width = launcherHeaderWidth;
	//12.1 summary performance changes new end
    var childDivObj = document.getElementById("ChildWin");
    childDivObj.getElementsByTagName("IFRAME")[0].src = "";
    document.getElementById("Div_ChildWin").removeChild(childDivObj);
    unmask(unmaskTitle);
    unmaskTitle = false;
    //Advanced Summary Query Building
    var imgLen = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].getElementsByTagName("span");//static header change
    if (imgLen.length > 0) {
        for (var i = 1;i < imgLen.length;i++) {
            imgLen[i].className = "SPNup hide";
        }
    }
    document.getElementById("BTN_EXIT").focus();
}

function fnShowDetail_key(e) { //REDWOOD_CHANGES
    var event = window.event || e;
    if (event.keyCode == 13) {
        fnShowDetail(e);	//REDWOOD_CHANGES
    } else return false;
}

function fnGetOptions() {
    return OptionValue;
}
//12.1 summary performance changes new start
function fnCalcHgt(){ 
//REDWOOD_CHANGES 
/*
    //Fix for 27029198 start
    if (g_scrType == "L" && mainWin.document.getElementById("vtab").style.display != "none") {
        mainWin.showHideVtab();
    }//Fix for 27029198 end	   
*/ 
 	mainWin.toggleNavigation('close');
//REDWOOD_CHANGES 
    var containerDIV = "ChildWin";
    if (typeof (fromSubScr) == 'undefined'){
        containerDIV = seqNo;
    }//HTML5 Changes Start
    scrWidth = "100%";	//REDWOOD_CHANGES 
    var pageHeadDoc = document.getElementById("PageHead");	
//REDWOOD_CHANGES 
//	scrWidth = pageHeadDoc.getAttribute("screenwidth");
//	if (scrWidth > mainWin.x - 2){
//        scrWidth = mainWin.x - 2;
//    }
	pageHeadDoc.style.width = "100%";
    //document.getElementById("toolbarSummary").style.width = "100%";
    //document.getElementById("DIVScrContainer").style.width = "100%";
    document.getElementById("DIVWNDContainer").style.width = "100%";
    //pageHeadDoc.style.overflow = "auto";
    //document.getElementById("QryRslts").style.width = "100%";
//	 var mainDiv = null;
//    if( parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0 ){
//        mainDiv =  mainWin.document.getElementById("dashboard");
//    }else{
//        mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
//    }
	parent.document.getElementById(containerDIV).style.height =  parseInt(mainWin.document.getElementById("mainContent").offsetHeight)  + "px";
    parent.document.getElementById(containerDIV).children[0].style.height = "100%";
    document.getElementById("ScrollYes").style.overflow = "auto";
	//var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight); 
    //var diffHeight = "";
    document.getElementById("ScrollYes").style.height = parseInt(mainWin.document.getElementById("mainContent").offsetHeight) -document.getElementById("ScrollNo").offsetHeight  - document.getElementById("WNDtitlebar").offsetHeight -$("#toolbarSummary").outerHeight(true) + "px";
    
   
//    if (scrHeight > parseInt(mainDiv.offsetHeight)) {
//        //diffHeight = scrHeight - mainDiv.offsetHeight - 10;
//        scrHeight = parseInt(mainDiv.offsetHeight);
//        var pageHeadDoc = document.getElementById("PageHead");
//        if (pageHeadDoc.offsetHeight + document.getElementById("toolbarSummary").offsetHeight > mainDiv.offsetHeight * 0.35) {
//            pageHeadDoc.style.height = mainDiv.offsetHeight * 0.35 - document.getElementById("toolbarSummary").offsetHeight + "px";
//            pageHeadDoc.style.overflow = "auto";
//        }
//
//    } else {
//        scrHeight = parseInt(mainDiv.offsetHeight);
//    }
////	var resultsContainerHgt = mainDiv.offsetHeight - (
////		//document.getElementById("sumHeaderContainer").offsetHeight + 
////		document.getElementById("Table_NavOptions").offsetHeight +
////		document.getElementById("PageHead").offsetHeight +
////		document.getElementById("toolbarSummary").offsetHeight +
////		document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("ScrollNo").offsetHeight) + "px";
//var resultsContainerHgt = mainDiv.offsetHeight - (
//		//document.getElementById("sumHeaderContainer").offsetHeight + 
//		document.getElementById("Table_NavOptions").offsetHeight +
//		document.getElementById("PageHead").offsetHeight +
//		document.getElementById("toolbarSummary").offsetHeight +
//		document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("ScrollNo").offsetHeight) + "px";
//		//document.getElementById("bodyContainer").style.height = resultsContainerHgt ;
//                document.getElementById("QryRslts").style.height =  resultsContainerHgt ;
		//scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight)
    //document.getElementById("QryRsltsHeader").style.width = document.getElementById("QryRslts").clientWidth + "px";//Static header change
	//parent.document.getElementById(containerDIV).style.height = scrHeight  + "px";
    //parent.document.getElementById(containerDIV).children[0].style.height = scrHeight  + "px";
    parent.document.getElementById(containerDIV).style.width =scrWidth  + "px";
    parent.document.getElementById(containerDIV).children[0].style.width =scrWidth + "px";
  
    parent.document.getElementById(containerDIV).style.top = 0 + "px";
    setHorizontalPosition( parent.document.getElementById(containerDIV), false,0);
//REDWOOD_CHANGES  
   parent.parent.document.getElementById("ifr_LaunchWin").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
}//HTML5 Changes End
function fnCalcHgtAdvScr(){
    var containerDIV = "ChildWin";
    if (typeof (fromSubScr) == 'undefined'){
        containerDIV = seqNo;
    }
    document.getElementById("ResTree").className = "DIVTwoColLyt";
    var scrWidth = 0.9 * mainWin.dashBoardWidth;//HTML5 Changes 3/OCT/2016
    var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight); 
    var diffHeight = "";
    if (scrWidth > mainWin.x){
        scrWidth = mainWin.x - 8;
    }
    var mainDiv = null;
    if( parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0 ){
        mainDiv =  mainWin.document.getElementById("dashboard");
    }else{
        mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
    }
    if (scrHeight > parseInt(mainDiv.offsetHeight)){
        diffHeight = scrHeight - mainDiv.offsetHeight - 4;
        scrHeight = parseInt(mainDiv.offsetHeight) - document.getElementById("WNDtitlebar").offsetHeight - 4;//HTML5 Changes 3/OCT/2016
    }
    parent.document.getElementById(containerDIV).style.height = scrHeight + "px";
    parent.document.getElementById(containerDIV).children[0].style.height = scrHeight + "px";
   // var mainScrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight);
  //  parent.parent.document.getElementById(parent.seqNo).style.height = mainScrHeight    + "px";
   // parent.parent.document.getElementById(parent.seqNo).children[0].style.height = mainScrHeight    + "px";
         
    document.getElementById("PageHead").style.height = scrHeight -document.getElementById("WNDtitlebar").offsetHeight - document.getElementById("PageFoot").getElementsByTagName("DIV")[0].offsetHeight +"px";
    parent.document.getElementById(containerDIV).style.width = scrWidth - (2 * document.getElementById("WNDtitlebar").offsetHeight) + "px";
    parent.document.getElementById(containerDIV).children[0].style.width = scrWidth - (2 * document.getElementById("WNDtitlebar").offsetHeight) + "px";
    document.getElementById("WNDtitlebar").style.width = scrWidth - (2 * document.getElementById("WNDtitlebar").offsetHeight) + "px";
    document.getElementById("DIVScrContainer").style.width = scrWidth - (2 * document.getElementById("WNDtitlebar").offsetHeight) + "px";//HTML5 Changes 14/NOV/2016
    //document.getElementById("DIVWNDContainer").style.width = "40em";//HTML5 Changes 3/OCT/2016
    /*if (mainWin.LangCode=='ARB'){ //33924144 starts
        document.getElementById("DIVWNDContainer").removeAttribute("style");
        document.getElementById("PageFoot").removeAttribute("style");
        document.getElementById("PageHead").removeAttribute("style");
        document.getElementById("PageHead").setAttribute("style","overflow: auto;");
    }*///33924144 ends
    parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
    //Fix for 28714234 Starts
    if(document.getElementById("idRecommendedFieldFldSet").style.display == "none" ){
        document.getElementById("idSelectField").style.height = 0.9*document.getElementById("PageHead").offsetHeight + "px";
    }else{
        document.getElementById("idSelectField").style.height = 0.75*document.getElementById("PageHead").offsetHeight + "px";
        document.getElementById("idRecommendedField").style.height = 0.15*document.getElementById("PageHead").offsetHeight + "px";
    }
    //Fix for 28714234 Ends
    parent.mask();
}
//12.1 summary performance changes new end

function fnHandleSumRslt(e) { //REDWOOD_CHANGES
    var evnt = window.event || e;
    var path = e.path || (e.composedPath && e.composedPath()); //REDWOOD_CHANGES
    // var srcElement = getEventSourceElement(evnt);
    var row = getRowIndex(e) - 1; //REDWOOD_CHANGES
    var l_TableObj = getTableObjForBlock("TBL_QryRslts").tBodies[0]; //REDWOOD_CHANGES
    var l_TableHdr = getTableObjForBlock("TBL_QryRslts").tHead;	//REDWOOD_CHANGES
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.shiftKey && evnt.keyCode == 9) {	
//REDWOOD_CHANGES
        if (isChildOf(path, 'TD')) {
            focusElement(l_TableHdr.rows[0].cells[0].getElementsByTagName("INPUT")[0]);//static header change 
        } else if(isChildOf(path, 'TH')) {
            document.getElementsByName("Records")[0].focus();
        }	  
//REDWOOD_CHANGES
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 9) { 
//REDWOOD_CHANGES
        if (isChildOf(path,'TH')) {
            focusElement(l_TableObj.rows[0].cells[0].getElementsByTagName("INPUT")[0]);//static header change 
        } else if(isChildOf(path,'TD')) {
            document.getElementById("goto").focus(); 
//REDWOOD_CHANGES
        }
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 40) {
        activeElement = document.activeElement;
        var ele = l_TableObj.rows[row].cells;
        var cellNum = "";
        for (var i = 0;i < ele.length;i++) { 
//REDWOOD_CHANGES
            if (ele[i].getElementsByTagName("INPUT").length > 0 && ele[i].getElementsByTagName("INPUT")[0].type == 'checkbox') {//Fix for 21824240 start
                if (ele[i].getElementsByTagName("INPUT")[0] == activeElement) {
                    cellNum = i;
                    break;
                }	
//REDWOOD_CHANGES
            } else {	 
//REDWOOD_CHANGES
                if (getPreviousSibling(ele[i].getElementsByTagName("INPUT")[0]).children[0] == activeElement) {
                    cellNum = i;
                    break;
                }	  
//REDWOOD_CHANGES
            }
        }
        if (l_TableObj.rows[row + 1]) {	
//REDWOOD_CHANGES
            if (cellNum == 0) focusElement(l_TableObj.rows[row + 1].cells[cellNum].getElementsByTagName("INPUT")[0]);
            else {
                var elemType = l_TableObj.rows[row + 1].cells[cellNum];
                if(elemType.children[0] && elemType.children[0].tagName == 'OJ-SELECT-SINGLE') {
                    elemType.children[0].classList.add('oj-table-custom-focus',0);
                }
                focusElement(getPreviousSibling(l_TableObj.rows[row + 1].cells[cellNum].getElementsByTagName("INPUT")[0]).children[0]);
            }
        } else {
            focusElement(activeElement);
        }	 
//REDWOOD_CHANGES
            preventpropagate(evnt);
            return false;
    } else if (evnt.keyCode == 38) {
        activeElement = document.activeElement;
        var ele = l_TableObj.rows[row].cells;
        var cellNum = "";
        for (var i = 0;i < ele.length;i++) {   
//REDWOOD_CHANGES
            if (ele[i].getElementsByTagName("INPUT").length > 0 && ele[i].getElementsByTagName("INPUT")[0].type == 'checkbox') {//Fix for 21824240 start
                if (ele[i].getElementsByTagName("INPUT")[0] == activeElement) {
                    cellNum = i;
                    break;
                }  
//REDWOOD_CHANGES
            } else {  
//REDWOOD_CHANGES
                if (getPreviousSibling(ele[i].getElementsByTagName("INPUT")[0]).children[0] == activeElement) {
                    cellNum = i;
                    break;
                }	
//REDWOOD_CHANGES
            }
        }
        if (l_TableObj.rows[row - 1]) {	
//REDWOOD_CHANGES
            if (cellNum == 0) focusElement(l_TableObj.rows[row - 1].cells[cellNum].getElementsByTagName("INPUT")[0]);
            else {
                var elemType = l_TableObj.rows[row - 1].cells[cellNum];
                if(elemType.children[0] && elemType.children[0].tagName == 'OJ-SELECT-SINGLE') {
                    elemType.children[0].classList.add('oj-table-custom-focus',0);
                }
                focusElement(getPreviousSibling(l_TableObj.rows[row - 1].cells[cellNum].getElementsByTagName("INPUT")[0]).children[0]);
            }
        } else {
            focusElement(activeElement);
        }  
//REDWOOD_CHANGES
            preventpropagate(evnt);
            return false;
        
    } else if (evnt.keyCode == 39) {
        activeElement = document.activeElement;	
//REDWOOD_CHANGES
        var nextValue = getNextSibling(getTableObjElement(activeElement, "TD"));
        if (nextValue != null && nextValue.getElementsByTagName("INPUT").length > 0 && nextValue.getElementsByTagName("INPUT")[0].type == 'checkbox') {
            focusElement(nextValue.getElementsByTagName("INPUT")[0]);
        } else {
            if(nextValue.children[0] && nextValue.children[0].tagName == 'OJ-SELECT-SINGLE') {
                nextValue.children[0].classList.add('oj-table-custom-focus',0);
            }
            focusElement(getPreviousSibling(nextValue.getElementsByTagName("INPUT")[0]).children[0]);
//REDWOOD_CHANGES
        }
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 37) {
        activeElement = document.activeElement;	
//REDWOOD_CHANGES
        var prevValue = getPreviousSibling(getTableObjElement(activeElement, "TD"));
        if (prevValue != null && prevValue.getElementsByTagName("INPUT").length > 0 && prevValue.getElementsByTagName("INPUT")[0].type == 'checkbox') {
            focusElement(prevValue.getElementsByTagName("INPUT")[0]);
        } else {
            if(prevValue.children[0] && prevValue.children[0].tagName == 'OJ-SELECT-SINGLE') {
                prevValue.children[0].classList.add('oj-table-custom-focus',0);
            }
            focusElement(getPreviousSibling(prevValue.getElementsByTagName("INPUT")[0]).children[0]);
        }  
//REDWOOD_CHANGES
            preventpropagate(evnt);
            return false;
        }
    }


function fnHandleSumTH(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById("TBL_QryRslts").tBodies[0];
    if (evnt.shiftKey && evnt.keyCode == 9) {
        var ele = document.getElementById("TblInnerDiv").children;
        for (var i = 0;i < ele.length;i++) {
            if (!ele[i].disabled && ele[i].tagName.toUpperCase() != "LABEL")
                ele[i].focus();
        }
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 9) {
        if (getInnerText(l_TableObj.rows[0].cells[1].children[0]) != " ") {
            if (l_TableObj.rows[0].cells[0].getElementsByTagName("INPUT")[0].disabled == true) l_TableObj.rows[0].cells[1].children[0].focus();
            else l_TableObj.rows[0].cells[0].getElementsByTagName("INPUT")[0].focus();
        } else if (document.getElementById("CUST_BTNS")) {
            document.getElementById("CUST_BTNS").childNodes[0].childNodes[0].focus();
        } else document.getElementById("BTN_EXIT").focus();
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 37) {
		//Fix for 21824240 start
        if (getPreviousSibling(srcElement.parentNode.parentNode) != null) {
            if (getPreviousSibling(srcElement.parentNode.parentNode).children[0].children[0] && getPreviousSibling(srcElement.parentNode.parentNode).children[0].children[0].children[1] && getPreviousSibling(srcElement.parentNode.parentNode).children[0].children[0].children[1].disabled == false) getPreviousSibling(srcElement.parentNode.parentNode).children[0].children[0].children[1].focus();
            else getPreviousSibling(srcElement.parentNode.parentNode).children[0].children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    } else if (evnt.keyCode == 39) {
        if (srcElement.type == "checkbox") {
            if (getNextSibling(srcElement.parentNode.parentNode.parentNode) != null && getNextSibling(srcElement.parentNode.parentNode.parentNode).children[0].children[0]!= null) getNextSibling(srcElement.parentNode.parentNode.parentNode).children[0].children[0].focus();
        } else {
            if (getNextSibling(srcElement.parentNode.parentNode) != null && getNextSibling(srcElement.parentNode.parentNode).children[0].children[0]!=null) getNextSibling(srcElement.parentNode.parentNode).children[0].children[0].focus();//Fix for 21824240 end
        }
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 40) {
        preventpropagate(evnt);
        return false;
    }
}

function fnHandleSumBtn(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);

    if (evnt.shiftKey && evnt.keyCode == 9) {
        if (scrName != "CVS_ADVANCED") {
            var l_TableObj = document.getElementById("TBL_QryRslts").tBodies[0];
            if (document.getElementById("CUST_BTNS")) {
                var subsyLength = document.getElementById("CUST_BTNS").childNodes.length;
                document.getElementById("CUST_BTNS").childNodes[subsyLength - 1].childNodes[0].focus();
            } else {
                if (getInnerText(l_TableObj.rows[0].cells[1].children[0]) != " ") if (l_TableObj.rows[0].cells[0].getElementsByTagName("INPUT")[0].disabled == false) l_TableObj.rows[0].cells[0].getElementsByTagName("INPUT")[0].focus();
                else l_TableObj.rows[0].cells[1].children[0].focus();
                else document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].cells[1].children[0].focus();//static header change
            }
        } else {
            getPreviousSibling(srcElement).focus();
        }
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 9) {
        document.getElementById("WNDbuttons").focus();
        preventpropagate(evnt);
        return false;
    }
}

function handleSumkeys(e) {
    var event = window.event || e;
    if (!event.ctrlKey && event.keyCode == 33) {
        if (document.getElementsByName("navPrev")[0].disabled == false) {
            doNavigate(gcNAV_PREVIOUS, event);
            document.getElementById("goto").focus();
            focusReqd = false;
            preventpropagate(e);
            return false;
        }
    } else if (!event.ctrlKey && event.keyCode == 34) {
        if (document.getElementsByName("navNext")[0].disabled == false) {
            doNavigate(gcNAV_NEXT, event);
            document.getElementById("goto").focus();
            focusReqd = false;
            preventpropagate(e);
            return false;
        }
    } else if (!event.ctrlKey && event.keyCode == 35) {
        doNavigate(gcNAV_LAST, event);
        document.getElementById("goto").focus();
        focusReqd = false;
        preventpropagate(e);
        return false;
    } else if (!event.ctrlKey && event.keyCode == 36) {
        doNavigate(gcNAV_FIRST, event);
        document.getElementById("goto").focus();
        focusReqd = false;
        preventpropagate(e);
        return false;
    }
    return true;
}

function fnOpenCriteriaScr(e) {
    mask();
    if (searchQry == "A" && whereClause_adv == "" && orderByClause_adv == "" && advValueClause == "" && advOperationClause == "" && advOrderOptClause == "") {
        alertAction = "UNMASK";
        showAlerts(fnBuildAlertXML('SM-8002', 'I'), 'I');
        gAction = "";
        return;
    }
    if (searchQry != "A") {
        var tableNode = getNodeText(selectSingleNode(fcjRequestDOM, "FCJMSG/MAINTQRY/TABLE"));
        if (tableNode == "") {
            alertAction = "UNMASK";
            showAlerts(fnBuildAlertXML('SM-8002', 'I'), 'I');
            gAction = "";
            return;
        }
    }
    if (document.getElementById("queryCriteria")) {
        document.getElementById('queryCriteria').style.display = "block";
        //Added for 17077004 start
        document.getElementById("criteriaName").value = currQryCriteriaName;
        setInnerText(document.getElementById("REMARKS"), currQryCriteriaRemarks);
        //Added for 17077004 end
        document.getElementById('criteriaName').focus();
        return;
    }
    var queryCriteriaWin = document.createElement("div");
    queryCriteriaWin.id = "queryCriteria";
    queryCriteriaWin.className = "queryCriteriaDIV";
    queryCriteriaWin.style.position = "absolute";
    queryCriteriaWin.style.left = document.getElementById("DIVScrContainer").offsetWidth / 3 + "px";
    queryCriteriaWin.style.top = document.getElementById("DIVWNDContainer").offsetHeight / 5 + "px";
    queryCriteriaWin.style.width = document.getElementById("DIVScrContainer").offsetWidth / 2 + "px";
    queryCriteriaWin.style.display = "block";
    var html = fnBuildCriteriaHTML();
    queryCriteriaWin.innerHTML = html;
    document.getElementById("masker").appendChild(queryCriteriaWin);
    screenKo.cleanNode(document.getElementById("queryCriteria"));  //REDWOOD_CHANGES
    screenKo.applyBindings(queryCriteriaWin, document.getElementById("queryCriteria"));//REDWOOD_CHANGES
    //Added for 17077004 start
    document.getElementById("criteriaName").value = currQryCriteriaName;
    setInnerText(document.getElementById("REMARKS"), currQryCriteriaRemarks);
    //Added for 17077004 end
    document.getElementById('criteriaName').focus();
}

function fnBuildCriteriaHTML(e) {
    var labelQCriteriaScreen = mainWin.getItemDesc("LBL_QUERY_CRITERIA_SCREEN");
    var labelQCriteriaName = mainWin.getItemDesc("LBL_QUERY_CRITERIA_NAME");
    var labelOk = mainWin.getItemDesc("LBL_OK");
    var labelCancel = mainWin.getItemDesc("LBL_CANCEL");
    var labelRemarks = mainWin.getItemDesc("LBL_REMARKS");	
//REDWOOD_CHANGES
    var html = '<oj-dialog id=\"scrollingDialog\"  initial-visibility=\"show\" position.my.horizontal=\"center\" position.my.vertical=\"center\" position.at.horizontal=\"center\" position.at.vertical=\"center\" position.of=\"window\" style="height: 100vh">';
    html += '<div slot=header id=\"wndtitle\" class=\"oj-dialog-title\" onkeydown=\"return fnHandleScrBtn(event)\" style=\"width: 50%\">';
    html += '<h1>' + labelQCriteriaScreen + '</h1></div>';
    html += '<div slot=\"body\" id=\"wndwidth\" style="clear:both; width:100%">';
    html += '<div class=\"oj-flex-item\" id=\"ResTree\">';
    html += '<div class=\"oj-flex\">';
    html += '<div class=\"oj-sm-width-full oj-sm-margin-2x-bottom\"><oj-label-value label-edge="start" label-width="40%"><oj-label slot="label" for=\"criteriaName\">' + labelQCriteriaName + '</oj-label><oj-input-text slot="value" id="criteriaName" name="criteriaName" size =\"20\" maxLength=\"250"\></oj-input-text></oj-label-value></div>';
    html += '<div class=\"oj-sm-width-full\"><oj-label-value label-edge="start" label-width="40%"><oj-label slot="label" for=\"remarks\">' + labelRemarks + '</oj-label><oj-text-area slot="value" id="REMARKS" name="remarks" onkeydown=\"return fnHandleScrBtn(event)\" maxLength=\"255"\ cols="1" rows="3"></oj-text-area></oj-label-value></div>';
    html += '</div></div></div>';
    html += '<div slot=\"footer\" class=\"oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border\">';
    html += '<div class=\"oj-flex-bar-end\">';
    html += '<oj-button class="action-button-primary" chroming="outlined" on-oj-action=\"[[fnExitSumCriteria.bind(null,event)]]\" label=\"' + labelCancel + '\" title=\"Exit\" id=\"BTN_CANCEL\"></oj-button>&nbsp;';
    html += '<oj-button class="action-button-primary" chroming="solid" on-oj-action=\"[[fnSaveSumCriteria.bind(null, event, null)]]\" label=\"' + labelOk + '\" title=\"Ok\" id=\"BTN_OK\"></oj-button>&nbsp;&nbsp;';
    html += '</div></div></oj-dialog>';
//REDWOOD_CHANGES
    return html;
}

function fnExitSumCriteria(event) {
    document.getElementById("masker").removeChild(document.getElementById('queryCriteria'));
    document.getElementById("BTN_EXIT").focus();
    unmask();
}

function fnSaveSumCriteria(e, flag) {
    var fieldName = "";
    var fieldValue = "";	
//REDWOOD_CHANGES
    if (tmpcriteriaName != "")
        var criteriaName = tmpcriteriaName;
    else var criteriaName = trim(document.getElementById("criteriaName").value);//Fix for 17072455
 //REDWOOD_CHANGES
    if (tmpremarks != "")
        var remarks = tmpremarks;
    else if (document.getElementById("REMARKS") && document.getElementById("REMARKS").value != null) //REDWOOD_CHANGES
        var remarks = document.getElementById("REMARKS").value;
    else var remarks = "";
    if (typeof (flag) == "undefined" || flag == null) //REDWOOD_CHANGES
        flag = "";
    if (criteriaName == "") {
        document.getElementById('queryCriteria').style.display = "none";
        alertAction = "UNMASK";
        mask();
        showAlerts(fnBuildAlertXML('SM-8004', 'I'), 'I');
        gAction = "";
        return;
    }
    var p_gAction = gAction;
    gAction = "SAVEQCRITERIA";
    if (searchQry != "A") {
        var tableValues = getNodeText(selectSingleNode(fcjRequestDOM, "FCJMSG/MAINTQRY/TABLE"));
        if (tableValues != "") {
            var tableValue = new Array();
            var tempString = new Array();
            tableValue = tableValues.split("~");
            for (var i = 0;i < tableValue.length;i++) {
                tempString = tableValue[i].split(">");
                fieldName = fieldName + tempString[0] + "~";
                //fieldValue = fieldValue + tempString[1] +"~";
                if (tempString[1].indexOf("SLCT") !=  - 1) {
                    var selectvalue = tempString[1].split("#");
                    fieldValue = fieldValue + selectvalue[0] + "~";
                }
                else {
                    fieldValue = fieldValue + tempString[1] + "~";
                }
            }
        }
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>SAVEQCRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + criteriaName + ']]></VALUE></PARAM><PARAM><NAME>REMARKS</NAME><VALUE><![CDATA[' + remarks + ']]></VALUE></PARAM><PARAM><NAME>FLAG</NAME><VALUE><![CDATA[' + flag + ']]></VALUE></PARAM><PARAM><NAME>FIELDNAME</NAME><VALUE><![CDATA[' + fieldName + ']]></VALUE></PARAM><PARAM><NAME>FIELDVALUE</NAME><VALUE><![CDATA[' + fieldValue + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    } else {
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>SAVEQCRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + criteriaName + ']]></VALUE></PARAM><PARAM><NAME>REMARKS</NAME><VALUE><![CDATA[' + remarks + ']]></VALUE></PARAM><PARAM><NAME>FLAG</NAME><VALUE><![CDATA[' + flag + ']]></VALUE></PARAM><PARAM><NAME>WHERE_SAVE</NAME><VALUE><![CDATA[' + whereClause_adv + '!' + queryName_adv + ']]></VALUE></PARAM><PARAM><NAME>ORDERBY_SAVE</NAME><VALUE><![CDATA[' + orderByClause_adv + ']]></VALUE></PARAM><PARAM><NAME>ADVVALUES_SAVE</NAME><VALUE><![CDATA[' + advValueClause + ']]></VALUE></PARAM><PARAM><NAME>ADOPT_SAVE</NAME><VALUE><![CDATA[' + advOperationClause + ']]></VALUE></PARAM><PARAM><NAME>ORDEBYOPT_SAVE</NAME><VALUE><![CDATA[' + advOrderOptClause + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    }
    var requestDom = loadXMLDoc(requsetStr);
    var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            if (document.getElementById('queryCriteria'))
                document.getElementById("masker").removeChild(document.getElementById('queryCriteria'));
            showToolbar_sum(gAction);
            alertAction = "UNMASK";
            mask();
            showAlerts(fnBuildAlertXML('SM-8001', 'I'), 'I');
            gAction = "";
            tmpcriteriaName = "";
            tmpremarks = "";
            summaryQryCriteria = parseInt(summaryQryCriteria) + 1;
            //Added for 17077004 start
            currQryCriteriaName = "";
            currQryCriteriaRemarks = "";
            //Added for 17077004 end
            return;
        } else {
            tmpcriteriaName = criteriaName;
            tmpremarks = remarks;
            document.getElementById("masker").removeChild(document.getElementById('queryCriteria'));
            alertAction = "UPDATECRITERIA";
            mask();
            showAlerts(fnBuildAlertXML('SM-8003', 'C'), 'C');
            gAction = "";
            return;
        }
    }
    gAction = p_gAction;
}

function fnQueryCriteria(action, event, isLaunch) {
    var p_gAction = gAction;
    var queryCriteriaName = "";
    var queryCriteriaNameAdv = "";
    var remarks = "";
    var advRemarks = "";
    dataprovider = screenKo.observable(new tempArrayDataProvider([])); //REDWOOD_CHANGES
    gAction = action;
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>QUERYCRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    respDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (respDom && getXMLString(respDom) != "") {  
//REDWOOD_CHANGES
    var responseArr = selectNodes(respDom, "//ADDL");
    var tempArray = [];
    var idx = 0;
    var idxAdv = 0;
    for(var i=0; i < responseArr.length; i++) {
        var queryCritObj = {};
        for(var j = 0; j< responseArr[i].childNodes.length; j++) {            
            if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'QUERYCRITERIANAME') {
            queryCritObj['index'] = idx;
            queryCritObj['queryCritName'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            queryCritObj['queryType'] = mainWin.getItemDesc("LBL_NORMAL");
            idx++;
            continue;
            } else if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'REMARKS') {
            queryCritObj['queryCritRemarks'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            continue;
            } else if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'QUERYCRITERIANAMEADV') {
            queryCritObj['index'] = idxAdv;
            queryCritObj['queryCritName'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            queryCritObj['queryType'] = mainWin.getItemDesc("LBL_ADVANCE");
            idxAdv++;
            continue;
            } else if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'ADVREMARKS') {
            queryCritObj['queryCritRemarks'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            continue;
            }
        }
        tempArray.push(queryCritObj);
    }
    
    dataprovider(new tempArrayDataProvider(tempArray));
    
      if (tempArray != [] && isLaunch != true) { 
//REDWOOD_CHANGES
            mask();
            var queryCriteriaWin = document.createElement("div");
            queryCriteriaWin.id = "qCriteriaName";
            queryCriteriaWin.className = "queryCriteriaDIV";
            queryCriteriaWin.style.position = "absolute";
            queryCriteriaWin.style.left = document.getElementById("DIVScrContainer").offsetWidth / 7 + "px";
            queryCriteriaWin.style.top = document.getElementById("DIVWNDContainer").offsetHeight / 5 + "px";
            queryCriteriaWin.style.width = document.getElementById("DIVScrContainer").offsetWidth / 1.4 + "px";
            queryCriteriaWin.style.display = "block";
            var html = fnQueryCriteriaNameHTML(respDom, action, event); //REDWOOD_CHANGES
            queryCriteriaWin.innerHTML = html;
            document.getElementById("masker").appendChild(queryCriteriaWin);
            screenKo.cleanNode(document.getElementById("qCriteriaName"));  //REDWOOD_CHANGES
            screenKo.applyBindings(queryCriteriaWin, document.getElementById("qCriteriaName")); //REDWOOD_CHANGES
            setTimeout(function(){document.getElementById('BTN_CANCEL').focus();},0); //REDWOOD_CHANGES
            gAction = p_gAction;
            return;
        } else if (tempArray == [] && action != 'QUERYCRITERIA') { //REDWOOD_CHANGES
            document.getElementById("SavedQry").disabled = true;
            document.getElementById("SavedQry").style.display = "none";
            gAction = "";
            } else if (typeof(isLaunch) == "undefined"){
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML('SM-8005', 'I'), 'I');
                gAction = "";
                return;
            }
    }
    gAction = p_gAction;
}

function fnQueryCriteriaNameHTML(respDom, action, event) { //REDWOOD_CHANGES
    var labelCancel = mainWin.getItemDesc("LBL_CANCEL");
    var labelSavedQryScr = mainWin.getItemDesc("LBL_SAVED_QRY_SCR");
    var labelQryName = mainWin.getItemDesc("LBL_QUERY_NAME");
    var labelAction = mainWin.getItemDesc("LBL_ACTION");
    var labelQryType = mainWin.getItemDesc("LBL_QUERY_TYPE");
    var labelNormal = mainWin.getItemDesc("LBL_NORMAL");
    var labelEdit = mainWin.getItemDesc("LBL_EDIT");
    var labelDelete = mainWin.getItemDesc("LBL_DELETE");
    var labelAdvance = mainWin.getItemDesc("LBL_ADVANCE"); 
//REDWOOD_CHANGES
    columnArr = [{'headerText': "index", 'field':  "index",  'headerStyle':'display:none', 'style':'display:none'}, { 'headerText': labelQryName, 'field':  labelQryName}, { 'headerText': labelQryType, 'field':  labelQryType}, { 'headerText': labelAction, 'field':  labelAction}];
    
    var html = '<oj-dialog id=\"scrollingDialog\"  initial-visibility=\"show\" position.my.horizontal=\"center\" position.my.vertical=\"center\" position.at.horizontal=\"center\" position.at.vertical=\"center\" position.of=\"window\" style="height: 100vh">';
    html += '<div slot=header id=\"wndtitle\" class=\"oj-dialog-title\" onkeydown=\"return fnHandleScrBtn(event)\" style=\"width: 50%\">';/*summary query save criteria width changes*/
    html += '<h2>' + labelSavedQryScr + '</h2></div>';
    html += '<div slot=\"body\" id=\"wndwidth\" style="clear:both; width:100%">';
    html += '<oj-table id=\"ERRTBL\" aria-label=\"Saved Query Criteria Table\" data=\"[[dataprovider]]\" columns=\"{{columnArr}}\" class=\"oj-sm-width-full\" display="grid" style="max-height:300px;">';
    html += '<template slot="rowTemplate" data-oj-as="row">';
    html += '<tr><td scope="row"><span><oj-bind-text value=\"{{row.data.index}}\"></oj-bind-text></span></td>'
    html += '<td scope="row"><a title ={{row.data.queryCritRemarks}} tabindex=\"0\" id=\"resultsLink\" onkeydown=\"return fnHandleScrBtn(event)\" href="#" class="oj-link-standalone" onclick=\"fnExecuteQryCriteriaByName(respDom,event,\'EXECUTEQUERY\')\" href="#"><oj-bind-text value=\"{{row.data.queryCritName}}\"></oj-bind-text></a></td>';
    html += '<td scope="row"><span><oj-bind-text value=\"{{row.data.queryType}}\"></oj-bind-text></span></td>'
    html += '<td scope="row"><oj-menu-button chroming="borderless" display="icons" data-oj-clickthrough="disabled">';
    html += '<oj-menu  slot="menu">';
    html += '<oj-option value="edit" on-oj-action=\"[[fnExecuteQryCriteria.bind(null,row.data.queryType,respDom,row.data.index,event,\'EDITQUERY\')]]\"><span class="oj-ux-ico-edit" slot="startIcon"></span>' + labelEdit + '</oj-option>';
    html += '<oj-option value="delete" on-oj-action=\"[[fnExecuteQryCriteria.bind(null,row.data.queryType,respDom,row.data.index,event,\'DELETECRITERIA\')]]\"><span class="oj-ux-ico-delete-all" slot="startIcon"></span>' + labelDelete + '</oj-option>';
    html += '</oj-menu></oj-menu-button></td></tr>';
    html += '</template></oj-table></div>';
    html += '<div slot=\"footer\" class=\"oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border\">';
    html += '<div class=\"oj-flex-bar-end\">';
    html += '<oj-button class="action-button-primary" chroming="outlined" on-oj-action=\"[[fnExitSumQueryCriteria.bind(null,event)]]\" label=\"' + labelCancel + '\" title=\"Exit\" id=\"BTN_CANCEL\"></oj-button>&nbsp;';
    html += '</div></div></oj-dialog>';
//REDWOOD_CHANGES
    return html;
}

function fnExitSumQueryCriteria(event) {
    document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
    document.getElementById("BTN_EXIT").focus();
    unmask();
}
//REDWOOD_CHANGES
function fnExecuteQryCriteriaByName(responseQryDom, event, action) {
    var index = getNodeText(event.target.parentNode.previousSibling);
    var queryType = getNodeText(event.target.parentNode.nextSibling);
    fnExecuteQryCriteria(queryType, responseQryDom, index, event, action);
}

function fnExecuteQryCriteria(queryType, responseQryDom, arrayNumber, event, action) {
    if (queryType == 'Advanced') {
        fnExecuteQryCriteriaAdv(responseQryDom, arrayNumber, event, action);
    }
    else {	 
//REDWOOD_CHANGES
    fnResetAll(event);
    var queryCriteriaName = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYCRITERIANAME']");
    var queryFldName = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYFLDNAME']");
    var queryFldValue = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYFLDVALUE']");
    var qryCriteriaName = getNodeText(queryCriteriaName[arrayNumber]);
    var p_gAction = "";
    if (action == "DELETECRITERIA") {
        p_gAction = gAction;
        gAction = "DELETECRITERIA";
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>DELETECRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + qryCriteriaName + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
        var requestDom = loadXMLDoc(requsetStr);
        var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
        mask();
        if (responseDom && getXMLString(responseDom) != "") {
            document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
            var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
            if (msgStat == "SUCCESS") {
                alertAction = "DELETECRITERIA";
                fnQueryCriteria('DELETECRITERIA', event, true);
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-017', 'I'), 'I');
                gAction = "";
                summaryQryCriteria = parseInt(summaryQryCriteria) - 1;
                return;
            } else {
                alertAction = "DELETECRITERIA";
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-019', 'I'), 'I');
                gAction = "";
                return;
            }
        }
    } else if (action == "EXECUTEQUERY") {
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var qryFldName = getNodeText(queryFldName[arrayNumber]);
        qryFldName = qryFldName.split("~");
        var qryFldValue = getNodeText(queryFldValue[arrayNumber]);
        qryFldValue = qryFldValue.split("~");
        for (var i = 0;i < qryFldName.length - 1;i++) {
			//Fix for 21575252 starts
			if(qryFldValue[i].indexOf("#SLCT") > -1) {
				document.getElementById(g_SummaryBlock+"__"+qryFldName[i]).value = qryFldValue[i].replace("#SLCT","");
			} else { //Fix for 21575252 ends
				if (qryFldValue[i] == "today") {//Summary save - calendar changes
                                    document.getElementById(g_SummaryBlock+"__"+qryFldName[i]).value = mainWin.AppDate;
                                    document.getElementById(g_SummaryBlock + "__" + qryFldName[i]).setAttribute("today", "true");
                                } else {
                                    document.getElementById(g_SummaryBlock+"__"+qryFldName[i]).value = qryFldValue[i];
                                }
				fireHTMLEvent(document.getElementById(g_SummaryBlock+"__"+qryFldName[i]), "onpropertychange"); //9NT1606_12_4_RETRO_12_2_26230635 changes 
			} //Fix for 21575252
        }
        fnExecuteQuery_sum("Y", event);
    } else if (action == "EDITQUERY") {
        //Added for 17077004 start
        currQryCriteriaName = qryCriteriaName;
        var event = window.event || event;
        var editElem = getEventSourceElement(event);
        currQryCriteriaRemarks = editElem.parentNode.parentNode.getElementsByTagName("A")[0].title;
        //Added for 17077004 end
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var qryFldName = getNodeText(queryFldName[arrayNumber]);
        qryFldName = qryFldName.split("~");
        var qryFldValue = getNodeText(queryFldValue[arrayNumber]);
        qryFldValue = qryFldValue.split("~");
        for (var i = 0;i < qryFldName.length - 1;i++) {
            if (qryFldValue[i] == "today") {//Summary save - calendar changes
                document.getElementById(g_SummaryBlock + "__" + qryFldName[i]).value = mainWin.AppDate;
                document.getElementById(g_SummaryBlock + "__" + qryFldName[i]).setAttribute("today", "true");
            } else {
                document.getElementById(g_SummaryBlock + "__" + qryFldName[i]).value = qryFldValue[i];
            }
            fireHTMLEvent(document.getElementById(g_SummaryBlock+"__"+qryFldName[i]), "onpropertychange");
        }
        //Added for 17077004 start
        document.getElementById("AdvSearch").disabled = true;
        document.getElementById("AdvSearch").style.display = "none"
        //Added for 17077004 end
    }
    unmask();
    gAction = p_gAction;
    document.getElementById("BTN_EXIT").focus();
}
}  //REDWOOD_CHANGES
var screenArg = new Array();

function fnExecuteQryCriteriaAdv(responseQryDom, arrayNumber, event, action) {
    fnResetAll(event);
    var queryCriteriaNameAdv = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYCRITERIANAMEADV']");
    var qryCriteriaNameAdv = getNodeText(queryCriteriaNameAdv[arrayNumber]);
    var p_gAction = "";
    if (action == "DELETECRITERIA") {
        p_gAction = gAction;
        gAction = "DELETECRITERIA";
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>DELETECRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + qryCriteriaNameAdv + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
        var requestDom = loadXMLDoc(requsetStr);
        var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
        mask();
        if (responseDom && getXMLString(responseDom) != "") {
            document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
            var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
            if (msgStat == "SUCCESS") {
                alertAction = "DELETECRITERIA";
                fnQueryCriteria('DELETECRITERIA', event, true);
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-017', 'I'), 'I');
                gAction = "";
                summaryQryCriteria = parseInt(summaryQryCriteria) - 1;
                return;
            } else {
                alertAction = "DELETECRITERIA";
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-019', 'I'), 'I');
                gAction = "";
                return;
            }
        }
    } else if (action == "EXECUTEQUERY") {
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var whereBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'WHERE_QUERY']");
        var whereBy1 = getNodeText(whereBy[arrayNumber])
        var whereBy2 = whereBy1.split("!")[0];
        var orderBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDERBY_QUERY']");
        orderBy = getNodeText(orderBy[arrayNumber]);
        var advValues = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADVVALUES_QUERY']");
        advValues = getNodeText(advValues[arrayNumber]);
        var adopt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADOPT_QUERY']");
        adopt = getNodeText(adopt[arrayNumber]);
        var orderByOpt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDEBYOPT_QUERY']");
        orderByOpt = getNodeText(orderByOpt[arrayNumber]);
        var RetObj = new Object();
        RetObj.advWhereClause = whereBy2;
        RetObj.advOperationClause = adopt;
        RetObj.advValueClause = advValues;
        RetObj.advOrderByClause = orderBy;
        RetObj.advOrderOptClause = orderByOpt;
        screenArgs['RETURN_VALUE'] = RetObj;
        screenArgs['SCREEN_NAME'] = "CVS_ADVANCED";
        fnCloseSubScr(event);
        document.getElementById("SaveCriteria").disabled = true;
        document.getElementById("SaveCriteria").style.display = "none"
        document.getElementById("BTN_EXIT").focus();
        return;
    } else if (action == "EDITQUERY") {
        //Added for 17077004 start
        currQryCriteriaName = qryCriteriaNameAdv;
        var event = window.event || event;
        var editElem = getEventSourceElement(event);
        currQryCriteriaRemarks = editElem.parentNode.parentNode.getElementsByTagName("A")[0].title;
        //Added for 17077004 end
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        whereBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'WHERE_QUERY']");
        whereBy = getNodeText(whereBy[arrayNumber]);
        var orderBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDERBY_QUERY']");
        orderBy = getNodeText(orderBy[arrayNumber]);
        var advValues = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADVVALUES_QUERY']");
        advValues = getNodeText(advValues[arrayNumber]);
        var adopt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADOPT_QUERY']");
        adopt = getNodeText(adopt[arrayNumber]);
        var orderByOpt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDEBYOPT_QUERY']");
        orderByOpt = getNodeText(orderByOpt[arrayNumber]);
        var RetObj = new Object();
        RetObj.advWhereClause = whereBy;
        RetObj.advOperationClause = adopt;
        RetObj.advValueClause = advValues;
        RetObj.advOrderByClause = orderBy;
        RetObj.advOrderOptClause = orderByOpt;
        screenArg['RETURN_VALUE'] = RetObj;
        screenArg['SCREEN_NAME'] = "CVS_ADVANCED";
        screenArg['ACTION'] = "EDITQUERY";
        if (document.getElementById("AdvSearch")) {//REDWOOD_CHANGES
            if (getIEVersionNumber() > 0) {
                fireHTMLEvent(document.getElementById("AdvSearch"), "onclick"); //REDWOOD_CHANGES
            } else {
                var fnEval = new Function("event",getClickFunction(document.getElementById("AdvSearch")));   //REDWOOD_CHANGES
                fnEval(event);
            }
        }
    }
    gAction = p_gAction;
}

function showToolbar_sum(sumAction) {
    if (sumAction == "EXECUTEQUERY") {
        document.getElementById("Search").disabled = true;
        document.getElementById("Search").style.display = "none";
        document.getElementById("AdvSearch").disabled = true;
        document.getElementById("AdvSearch").style.display = "none";
        document.getElementsByName("Records")[0].readonly = true; //REDWOOD_CHANGES
        document.getElementById("Refresh").disabled = false;
        document.getElementById("Refresh").style.display = "flex"; //REDWOOD_CHANGES
        document.getElementById("SavedQry").style.display = "none";
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SaveCriteria").disabled = false;
        document.getElementById("SaveCriteria").style.display = "flex";	//REDWOOD_CHANGES
    }
    if (sumAction == "SAVEQCRITERIA") {
        document.getElementById("SaveCriteria").style.display = "none";
        document.getElementById("SaveCriteria").disabled = true;
        document.getElementById("SavedQry").disabled = false;
        document.getElementById("SavedQry").style.display = "flex";	//REDWOOD_CHANGES
    }
}
//12.0.3 Summary to detail changes starts
function fnShowMultiDetails(event) {
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;//document.getElementById("TBL_QryRslts").tBodies[0].rows; //REDWOOD_CHANGES
    var chkd = false;
    var detailPkArr = new Array();
    for (var i = 0;i < sumTblObj.length;i++) {
		//REDWOOD_36575123 Starts
	if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].getAttribute('class').includes('oj-selected')){
		var currentRow = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells; 
            for(var i=0;i<currentRow.length;i++){
                if(currentRow[i].getAttribute("name") == 'sumPKs'){
                   detailPkArr[detailPkArr.length] = currentRow[i].getElementsByTagName('OJ-INPUT-TEXT')[0].value;
				    chkd = true;
                }
            } 
			
		}
       /* if (sumTblObj[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (sumTblObj[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                if(g_DetPkArray[i]){//Fix for 19515252 starts
                        detailPkArr[detailPkArr.length] = g_DetPkArray[i];
                        chkd = true;
                }//Fix for 19515252 ends        
            }
        }*/
		//REDWOOD_36575123 Ends
    }
    if (!chkd) {
        mask();
        showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    if (typeof (detailRequired) != 'undefined' && !detailRequired) {
        return false;
    }
    userParentFunc = "";
    userDetailPk = "";
    if (!fnPreShowDetail_SumMain())
        return false;
    if (userParentFunc == "") {
        if (g_DetPkArray.length > 0) {
            detailWinParams.ShowSummary = "TRUE";
            detailWinParams.DetailPkVals = detailPkArr;
            detailWinParams.sumTxnBranch = sumTxnBranch;
            mainWin.dispHref1(parentFunc, seqNo);
        }
    } else {
        detailWinParams.ShowSummary = "TRUE";
        detailWinParams.DetailPkVals = userDetailPk;
        detailWinParams.sumTxnBranch = sumTxnBranch;
        mainWin.dispHref1(userParentFunc, seqNo);
    }
}
//12.0.3 Summary to detail changes ends

//REDWOOD_Column_Resize Starts // fnSyncTableWidth function written for dynamic column width
function fnSyncTableWidth() {	
    var headerTable = document.getElementById("TBL_QryRsltsHeader");
    var dataTable = document.getElementById("TBL_QryRslts");
    var Tablewidth = 0;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    for (i = 1;i < dataTable.children[0].content.querySelectorAll('td').length;i++) {
      if ((parseInt(dataTable.querySelectorAll('colgroup')[0].children[i].style.width))) {
        if( document.getElementById("TBL_QryRslts").getElementsByTagName('tbody')[0].rows[0].cells[i].children[0].tagName =='OJ-INPUT-TEXT'){

        var ColumnTitle = document.getElementById("TBL_QryRslts").getElementsByTagName('thead')[0].rows[0].cells[i].title;
        var TitleWidth = context.measureText(ColumnTitle).width;
        var Data = document.getElementById("TBL_QryRslts").getElementsByTagName('tbody')[0].rows[0].cells[i].getElementsByTagName("OJ-INPUT-TEXT")[0].value;
        var DataWidth = context.measureText(Data).width;
        var length =document.getElementById("TBL_QryRslts").getElementsByTagName('tbody')[0].rows[0].cells[i].getElementsByTagName("OJ-INPUT-TEXT")[0].value.length;
        var curWidth = dataTable.querySelectorAll('colgroup')[0].children[i].style.width;
	var NewWidth = parseInt(curWidth); 

	if (DataWidth > TitleWidth ){
            var calcWidth = DataWidth - TitleWidth ;
	      NewWidth = parseInt(curWidth) + calcWidth + TitleWidth;
                 }
			 Tablewidth =  (Tablewidth + NewWidth);
			 dataTable.querySelectorAll('colgroup')[0].children[i].style.width = NewWidth + "px";
			
    }
}

    }
	 dataTable.querySelectorAll('colgroup')[0].parentNode.style.width = Tablewidth + "px";

   
}
//REDWOOD_Column_Resize Ends

function fnSyncTableWidth_old() {	
//REDWOOD_CHANGES
  //  fnShowFreezeTable();
    //fnShowRsltsTable();  
//REDWOOD_CHANGES
    var headerTable = document.getElementById("TBL_QryRsltsHeader");
    var dataTable = document.getElementById("TBL_QryRslts");
    var headerFrzTable = document.getElementById("TBL_QryRsltsHeaderFreeze");
    var dataFrzTable = document.getElementById("TBL_QryRsltsFreeze");
    headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
    headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
    headerTable.tBodies[0].rows[0].cells[headerTable.tBodies[0].rows[0].cells.length - 1].removeAttribute('width');
    dataTable.tBodies[0].rows[0].cells[dataTable.tBodies[0].rows[0].cells.length - 1].removeAttribute('width');
    for (i = 1;i < headerTable.tBodies[0].rows[0].cells.length;i++) {
        if ((parseInt(dataTable.tBodies[0].rows[0].cells[i].offsetWidth) > 350) && parseInt(headerTable.tBodies[0].rows[0].cells[i].offsetWidth) < 350) {
            w = '350';
            headerTable.tBodies[0].rows[0].cells[i].children[0].style.width = w + "px";//Fix for 21398146
            for (j = 0;j < dataTable.tBodies[0].rows.length;j++) {
                dataTable.tBodies[0].rows[j].cells[i].children[0].style.width = w + "px";
                dataTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace = 'normal';
                dataFrzTable.tBodies[0].rows[j].style.height = dataTable.tBodies[0].rows[j].offsetHeight + "px"
            }
        }
        else if ((parseInt(dataTable.tBodies[0].rows[0].cells[i].offsetWidth) > 350) && parseInt(headerTable.tBodies[0].rows[0].cells[i].offsetWidth) > 350) {
            w = headerTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth;
            for (j = 0;j < dataTable.tBodies[0].rows.length;j++) {
                dataTable.tBodies[0].rows[j].cells[i].children[0].style.width = w + 0.5+"px";//Fix for 21648079 
                dataTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace = 'normal';
                dataFrzTable.tBodies[0].rows[j].style.height = dataTable.tBodies[0].rows[j].offsetHeight + "px"
            }
        }
        else {//Fix for 21648079 
        w = Math.max(headerTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth, dataTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth);
        //Fix for 21302719 start
        headerTable.tBodies[0].rows[0].cells[i].children[0].style.width = w + 0.5 + "px"; 
        dataTable.tBodies[0].rows[0].cells[i].children[0].style.width = w + 0.5 +"px";
        //Fix for 21302719 end
        }

    }

    //headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
    //headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
    for (i = 1;i < headerFrzTable.tBodies[0].rows[0].cells.length;i++) {
        if ((parseInt(dataFrzTable.tBodies[0].rows[0].cells[i].offsetWidth) > 350) && parseInt(headerFrzTable.tBodies[0].rows[0].cells[i].offsetWidth) < 350) {
            w = '350';
            headerFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width = w + "px";//Fix for 21398146
            for (j = 0;j < dataFrzTable.tBodies[0].rows.length;j++) {
                dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.width = w + "px";
                dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace = 'normal';
            }
        }
        else if ((parseInt(dataFrzTable.tBodies[0].rows[0].cells[i].offsetWidth) > 350) && parseInt(headerFrzTable.tBodies[0].rows[0].cells[i].offsetWidth) > 350) {
            w = headerFrzTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth;
            for (j = 0;j < dataFrzTable.tBodies[0].rows.length;j++) {
                dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.width = w + "px";
                dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace = 'normal';
            }
        }
        else {
            w = Math.max(headerFrzTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth, dataFrzTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth);
            //Fix for 21302719 start
            headerFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width = w + 0.5 + "px";
            dataFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width = w + 0.5 + "px";
            //Fix for 21302719 end
        }
    }

    fnHideFreezeTable();
    var cols = document.getElementsByName("Locks")[0].value;
    if (headerFrzTable.tBodies[0].rows[0].cells.length >= 5) //REDWOOD_CHANGES
        fnFreezeColumns(cols);
    alignSummaryRsltsTable();//Fix for 21433193    
   // if (headerTable.offsetWidth < headerTable.parentNode.offsetWidth) {
        headerTable.tBodies[0].rows[0].cells[headerTable.tBodies[0].rows[0].cells.length - 1].setAttribute('width', '99%');
        dataTable.tBodies[0].rows[0].cells[dataTable.tBodies[0].rows[0].cells.length - 1].setAttribute('width', '99%');
   // }
}

function fnSyncScroll(scrollDiv) {
    document.getElementById("QryRsltsHeader").scrollLeft = scrollDiv.scrollLeft;
    document.getElementById("QryRsltsFreeze").scrollTop = scrollDiv.scrollTop;
}

//Fix for 21824240 
function fnSyncScrollHeader(scrollDiv) {
    document.getElementById("QryRslts").scrollLeft = scrollDiv.scrollLeft;
}

function fnHideFreezeTable() {
    var headerFrzTbl = document.getElementById("TBL_QryRsltsHeaderFreeze");
    var bodyFrzTbl = document.getElementById("TBL_QryRsltsFreeze");
    for (j = 0;j < headerFrzTbl.tBodies[0].rows[0].cells.length;j++) {
        if (headerFrzTbl.tBodies[0].rows[0].cells[j].className.indexOf("TDnone") ==  - 1)
            headerFrzTbl.tBodies[0].rows[0].cells[j].className += ' TDnone';
    }
    for (i = 0;i < bodyFrzTbl.tBodies[0].rows.length;i++) {
        for (j = 0;j < bodyFrzTbl.tBodies[0].rows[i].cells.length;j++) {
            if (bodyFrzTbl.tBodies[0].rows[i].cells[j].className.indexOf("TDnone") ==  - 1)
                bodyFrzTbl.tBodies[0].rows[i].cells[j].className += ' TDnone';
        }
    }
}

function fnShowFreezeTable() {
    var headerFrzTbl = document.getElementById("TBL_QryRsltsHeaderFreeze");
    var bodyFrzTbl = document.getElementById("TBL_QryRsltsFreeze");
    for (j = 0;j < headerFrzTbl.tBodies[0].rows[0].cells.length;j++) {
        headerFrzTbl.tBodies[0].rows[0].cells[j].className = headerFrzTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone", "");
    }
    for (i = 0;i < bodyFrzTbl.tBodies[0].rows.length;i++) {
        for (j = 0;j < bodyFrzTbl.tBodies[0].rows[i].cells.length;j++) {
            bodyFrzTbl.tBodies[0].rows[i].cells[j].className = bodyFrzTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone", "");
        }
    }
}

function fnShowRsltsTable() {
    var headerFrzTbl = document.getElementById("TBL_QryRsltsHeader");
    var bodyFrzTbl = document.getElementById("TBL_QryRslts");
    for (j = 0;j < headerFrzTbl.tBodies[0].rows[0].cells.length;j++) {
        headerFrzTbl.tBodies[0].rows[0].cells[j].className = headerFrzTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone", "");
    }
    for (i = 0;i < bodyFrzTbl.tBodies[0].rows.length;i++) {
        for (j = 0;j < bodyFrzTbl.tBodies[0].rows[i].cells.length;j++) {
            bodyFrzTbl.tBodies[0].rows[i].cells[j].className = bodyFrzTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone", "");
        }
    }
}

function fnFreezeColumns(noOfCols) {
	//FCUBS_14_5_INV_SUPP_SFR_33144068 - start
	var summaryScreenCols = document.querySelectorAll('td.TBLoneTH.TDnone').length;
	if(summaryScreenCols<8){
		var lockColElement = document.getElementsByName('Locks')[0];
		var init = lockColElement.length-1;
		for (var i=init; i>summaryScreenCols; i--) {
			lockColElement.remove(i);
		}
	}
	//FCUBS_14_5_INV_SUPP_SFR_33144068 - end
    var headerFrzTbl = document.getElementById("TBL_QryRsltsHeaderFreeze");
    var bodyFrzTbl = document.getElementById("TBL_QryRsltsFreeze");
    var headerTbl = document.getElementById("TBL_QryRsltsHeader");
    var bodyTbl = document.getElementById("TBL_QryRslts");
	//30620131
    for (j = 0;j < 9;j++)
	{
        if (noOfCols != 0 && j < (parseInt(noOfCols) + 1))
            headerFrzTbl.tBodies[0].rows[0].cells[j].className = headerFrzTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone", "");
        else
		{
			if (j < headerFrzTbl.tBodies[0].rows[0].cells.length)
			{
				if (headerFrzTbl.tBodies[0].rows[0].cells[j].className.indexOf("TDnone") ==  - 1)
				{
					headerFrzTbl.tBodies[0].rows[0].cells[j].className += ' TDnone';
				}				
			}            
        }
    }
	
    for (i = 0;i < bodyFrzTbl.tBodies[0].rows.length;i++)
	{
        for (j = 0;j < 9;j++)
		{
            if (noOfCols != 0 && j < (parseInt(noOfCols) + 1))
                bodyFrzTbl.tBodies[0].rows[i].cells[j].className = bodyFrzTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone", "");
            else
			{
				if (j < bodyFrzTbl.tBodies[0].rows[i].cells.length)
				{
					if (bodyFrzTbl.tBodies[0].rows[i].cells[j].className.indexOf("TDnone") ==  - 1)
					{
						bodyFrzTbl.tBodies[0].rows[i].cells[j].className += ' TDnone';
					}					
				}
                
            }
        }
    }
	
    for (j = 0;j < 9;j++)
	{
        if (noOfCols != 0 && j < (parseInt(noOfCols) + 1))
		{
            if (headerTbl.tBodies[0].rows[0].cells[j].className.indexOf("TDnone") ==  - 1)
			{
                headerTbl.tBodies[0].rows[0].cells[j].className += ' TDnone';
            }
        }
        else
		{
			if (j < headerTbl.tBodies[0].rows[0].cells.length)
			{
				headerTbl.tBodies[0].rows[0].cells[j].className = headerTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone", "");				
			}			
		}
	}
	
    for (i = 0;i < bodyTbl.tBodies[0].rows.length;i++)
	{
        for (j = 0;j < 9;j++)
		{
            if (noOfCols != 0 && j < (parseInt(noOfCols) + 1))
			{
                if (bodyTbl.tBodies[0].rows[i].cells[j].className.indexOf("TDnone") ==  - 1)
				{
                    bodyTbl.tBodies[0].rows[i].cells[j].className += ' TDnone';
                }
            }
            else
			{
				if (j < bodyTbl.tBodies[0].rows[i].cells.length)
				{
					bodyTbl.tBodies[0].rows[i].cells[j].className = bodyTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone", "");					
				}
			}
		}
    }
	//30620131
//REDWOOD_CHANGES
//    document.getElementById("QryRslts").style.width = document.getElementById("rsltsConatiner").offsetWidth - document.getElementById("QryRsltsFreeze").offsetWidth + "px";
//    document.getElementById("QryRsltsHeader").style.width = document.getElementById("QryRslts").clientWidth + "px";
//    document.getElementById("QryRsltsFreeze").style.height = document.getElementById("QryRslts").clientHeight + "px";
//REDWOOD_CHANGES
    alignSummaryRsltsTable();//Fix for 21433193 start
    /*document.getElementById("QryRsltsHeader").style.marginTop =  - (document.getElementById("QryRsltsHeaderFreeze").offsetHeight) + "px";
    if (mainWin.LangCode == "ARB") {
        document.getElementById("QryRsltsHeader").style.marginRight = document.getElementById("QryRsltsHeaderFreeze").offsetWidth + "px";
        document.getElementById("QryRslts").style.marginRight = document.getElementById("QryRsltsFreeze").offsetWidth + "px";
    }
    else {
        document.getElementById("QryRsltsHeader").style.marginLeft = document.getElementById("QryRsltsHeaderFreeze").offsetWidth + "px";
        document.getElementById("QryRslts").style.marginLeft = document.getElementById("QryRsltsFreeze").offsetWidth + "px";
    }
    document.getElementById("QryRslts").style.marginTop =  - (document.getElementById("QryRsltsFreeze").offsetHeight) + "px";*///Fix for 21433193 end
}

function fnSetScreenSize(fromAdv) {
    document.getElementById("ResTree").className = "DIVTwoColLyt";
    document.getElementById("DIVScrContainer").className = "WNDcontent mediumwin";
    if (g_scrType == 'L') {
        document.getElementById("PageHead").className = "DIVThreeColSectionContainer";
        document.getElementById("ResTree").className = "DIVThreeColLyt";
        document.getElementById("DIVScrContainer").className = "WNDcontent bigwin";
    }
    //document.getElementById("QryRslts").style.width = document.getElementById("rsltsConatiner").offsetWidth + "px"; //REDWOOD_CHANGES
}

//Fix for 21433193 start
function alignSummaryRsltsTable(){	
//REDWOOD_CHANGES
//    document.getElementById("QryRsltsHeader").style.marginTop =  - (document.getElementById("QryRsltsHeaderFreeze").offsetHeight) + "px";
//    if (mainWin.LangCode == "ARB") {
//        document.getElementById("QryRsltsHeader").style.marginRight = document.getElementById("QryRsltsHeaderFreeze").offsetWidth + "px";
//        document.getElementById("QryRslts").style.marginRight = document.getElementById("QryRsltsFreeze").offsetWidth + "px";
//    }
//    else {
//        document.getElementById("QryRsltsHeader").style.marginLeft = document.getElementById("QryRsltsHeaderFreeze").offsetWidth + "px";
//        document.getElementById("QryRslts").style.marginLeft = document.getElementById("QryRsltsFreeze").offsetWidth + "px";
//    }
//    document.getElementById("QryRslts").style.marginTop =  - (document.getElementById("QryRsltsFreeze").offsetHeight) + "px";
//REDWOOD_CHANGES
}
//Fix for 21433193 end
 //REDWOOD_CHANGES
function lockColumnChangedHandler(event){
var srcEle = getEventSourceElement(event);
if(srcEle){//debugger;
    var tblName = srcEle.getAttribute("tableName");
    var columnArrFun = new Function("return "+tblName+'columnArray()');
    var columnArr = columnArrFun();
    if(columnArr){
        for(var item in columnArr){
             columnArr[item].frozenEdge=null;
        }
        var lockColumnCount = Number(event.detail.value);
        for(var i=0;i<lockColumnCount;i++){
            columnArr[i].frozenEdge='start';
        }
        var fnEval = new Function("event",tblName+'columnArray');  
                fnEval(columnArr);
        //columnArrFun = Function( tblName+'columnArray('+columnArr+')');
       // columnArrFun();
        document.getElementById('TBL_QryRslts').refresh();
    }
}
}
    
function handleMenuAction(event){
     var fnEval = new Function("event",event.target.getAttribute("menu-click"));  
    fnEval(event);
}	 
//REDWOOD_CHANGES