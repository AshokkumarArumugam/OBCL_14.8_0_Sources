/*----------------------------------------------------------------------------------------------------
**
** File Name    : Authorize.js
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
**  Modified By           : Ambika Selvaraj
**  Modified On           : 27-Oct-2017
**  Modified Reason       : STDCCHOL - Changes in CCY holiday calendar don't provide an audit trail/changes list during Authorization 
**  Search String         : 9NT1606_12_4_RETRO_12_3_26524831 

**  Modified By           : Nagendra Satrasala
**  Modified On           : 07-Apr-2023
**  Modified Reason       : Code changes to authorize non extensible screens in Redwood
**  Search String         : 35092666 
---------------------------------------------------------------------------------------------------------*/

var lastHilightedRow = 0;

var tableNames = new Array();
var columnNames = new Array();
var modNos = new Array();
var columnValues = new Array();

//REDWOOD_CHANGES

var tempArrayDataProvider;
var pagingDataProviderView;
var selectControl={};
var selectArrayProvider={};
var multipleEntryFieldList=[];
var meArrayForAddDelete = {};
 //REDWOOD_CHANGES
//view changes declaration
var LMODNO = 0;
var winParams = new Object();

var objResDOM; // Object to hold the Response Data XML
var objReqDOM; // Object to hold the Request Data XML

var objResBackUpDOM = null;

var fromSubScr = false;
var tablesFromParent = new Array();

var relationArray = new Array();

relationArray['STTB_RECORD_LOG'] = "";
relationArray['STTB_FIELD_LOG'] = "STTB_RECORD_LOG~N";

var dataSrcLocationArray = new Array();
dataSrcLocationArray[1] = "STTB_FIELD_LOG";

dataSrcLocationArray[0] = "STTB_RECORD_LOG";

var strRootTableName = "AUTH_TABLE";
var gAction = "";

var arrBlkNames = new Array();
var arrFldNames = new Array();
var modArray = new Array();
var maxCheckedModNoIndex;

var makerId = "";
var checkerId = "";
var modNo = "";
var processingAction;
/* * resets dbIndexArray; */
function resetIndex(){
    dbIndexArray['STTB_RECORD_LOG'] = 1;
    dbIndexArray['STTB_FIELD_LOG'] = 1;
}

/*
 * This function called when the screen is loading.
 */
function fnLoad(){
    var t = getDateObject();
    var startjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    processingAction = "AUTHLOAD";
    mainWin.isAuthOpen =true;
    var globalRef = mainWin;
    var UIXmlPath = globalRef.UIXmlPath + "/" + globalRef.LangCode;

    if (mainWin.applicationName == 'FCIS'){
        var html = ShowXML(UIXmlPath + "/AUTHORIZE.xml", "CVS_MAIN", "Detail.xsl");
    } else{
        var html = ShowXML(UIXmlPath + "/AUTHORIZE_FCJ.xml", "CVS_MAIN", "Detail.xsl");
    }
    if (getBrowser().indexOf("IE") != -1) {//ie11 changes
        document.getElementById("ResTree").insertAdjacentHTML("afterBegin", html);
    } else {
        document.getElementById("ResTree").appendChild(html);
    }
   //REDWOOD_CHANGES start
   if (getBrowser().indexOf("FIREFOX") != -1) {
        document.getElementById("ResTree").querySelectorAll('template').forEach((elem) => elem.remove());
        document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
    }else{
         document.getElementById("ResTree").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
    }
    document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
   
   var  footerContent = document.getElementById("DIVFooter");
    if(footerContent!=null){
   footerContent.classList.remove("DIVfooter");
   document.getElementById("subscreenFooter").innerHTML = footerContent.outerHTML;
   footerContent.parentNode.removeChild(footerContent);
    }
  
   /* if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {
        try {
            var scriptElements = document.getElementsByTagName("script");
            for(var i = 0; i < scriptElements.length; ++i) {
                if(scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));  
                    fnEval();
                }
            }
        } catch(e) {
            alert(e.message);
        }
    }
	\*Fix for 19203090 Starts*\
	else if(getBrowser().indexOf("IE") != -1 && ((getBrowser().indexOf("10") != -1) || (getBrowser().indexOf("11") != -1))){
      try {
            var scriptElements = document.getElementsByTagName("script");
            for (var i = 0; i < scriptElements.length; ++i) {
                if (scriptElements[i].defer == true) {
                    var fnEval = new Function(scriptElements[i].innerHTML);  
                    fnEval();
                }
            }
        } catch (e) {
            alert(e.message);
        }
    } */
    fnBindScreenElements();
 //REDWOOD_CHANGES end
	/*Fix for 19203090 Ends*/
    var texec = getDateObject();
    var execStartTime = (texec.getHours() * (3600 * 1000)) + (texec.getMinutes() * (60 * 1000)) + (texec.getSeconds() * 1000) + texec.getMilliseconds();
    objReqDOM = parent.getVersions();
    //inDate = setActionTime();//Performance Changes
    objResDOM = parent.postQuery(objReqDOM);
    //Performance Changes Starts    
    //fnpostAction('AUTHQUERY',objResDOM);
    //Performance Changes Ends
    var tExecEnd = getDateObject();
    var execEndTime = (tExecEnd.getHours() * (3600 * 1000)) + (tExecEnd.getMinutes() * (60 * 1000)) + (tExecEnd.getSeconds() * 1000) + tExecEnd.getMilliseconds();
    if (mainWin.applicationName == 'FCIS'){
        if (selectNodes(objResDOM,"//REC")[1] == null){
            if (parent.document.getElementsByName("MAKER_ID")){
                var authDataSrc = parent.document.getElementsByName("MAKER_ID")[0].getAttribute("DBT");
                makerId = parent.document.getElementsByName("MAKER_ID")[0].value;
            } else{
                var authDataSrc = parent.document.getElementsByName("MAKERID")[0].getAttribute("DBT");
                makerId = parent.document.getElementsByName("MAKERID")[0].value;
            }
            checkerId = mainWin.UserId;
            alertAction = "FCISAUTHLOAD";
            modNo = parent.document.getElementById(authDataSrc + "__MOD_NO").value;
            mask();
            showAlerts(fnBuildAlertXML('ST-COM039','I'), "C");
        }
    }
    gAction = parent.gAction;
    var functionId = authFunctionId;

    if (!fnGetLabelsFromXMLforAuthorize(functionId, arrBlkNames, arrFldNames, parent.langCode)){
        mask();
        showAlerts(fnBuildAlertXML(gErrCodes, 'E'), 'E');
    }

    objResBackUpDOM = objResDOM;
    debugs(getXMLString(objResDOM), "P");
    if (!getModNumbers()){
        return;
    }
    resetIndex();
    //fnBuildMultipleEntryArray();  //REDWOOD_CHANGES
    
    var respDOM = fnGetDataXMLFromFCJXML(objResBackUpDOM, 1);
    fnSortDbDOMNodes(respDOM);

   setTimeout(function(){showAuditBlkData("AUTH_TABLE", 1, true, respDOM); },0); //REDWOOD_CHANGES

    //var recRows = document.getElementById("BLK_STTB_RECORD_LOG"); //.tBodies[0].rows; //REDWOOD_CHANGES
    //var recRowsLength = recRows.tBodies[0].rows.length; //REDWOOD_CHANGES

    if (mainWin.applicationName == 'FCIS'){
        document.getElementById("cmdAddRow_BLK_STTB_FIELD_LOG").style.visibility = "hidden";
        document.getElementById("cmdDelRow_BLK_STTB_FIELD_LOG").style.visibility = "hidden";
        document.getElementById("BTN_SINGLE_VIEW_BLK_STTB_FIELD_LOG").style.visibility = "hidden";
    }
    var checkBoxRef = document.getElementsByName("chkDeleteRow");
    for (var chkIndex = 0; chkIndex < checkBoxRef.length; chkIndex++){
        addEvent(checkBoxRef[chkIndex], "onclick", "fnCheck(event)");
        checkBoxRef[chkIndex].disabled = false;
    }

   // var modDetailsRef = document.getElementById("BLK_STTB_RECORD_LOG").tBodies[0].rows[0];//REDWOOD_CHANGES

    document.getElementById("BTN_SINGLE_VIEW_BLK_STTB_RECORD_LOG").style.visibility = "hidden";
    disableForm();

    var checkBoxRef = document.getElementsByName("chkDeleteRow");
    for (var chkIndex = 0; chkIndex < checkBoxRef.length; chkIndex++){
        addEvent(checkBoxRef[chkIndex], "onclick", "fnCheck(event)");
        checkBoxRef[chkIndex].disabled = false;
    }
    enableAllElements("BUTTON");
    if (document.getElementsByName("MOD_NO").length > 0) {
        if (mainWin.applicationName == 'FCIS') {
            if (document.getElementById("BTN_VIEW")) {
                document.getElementsByName("BTN_VIEW")[0].disabled = true;
            }
        } else {
            if (document.getElementsByName("MOD_NO")[0].value == 1) {
                document.getElementsByName("BTN_VIEW")[0].disabled = true;
            }
        }
    }
    //document.getElementById("Checkbox_Title").style.visibility = "hidden";//fix for 17155663
    fnEnableElement(document.getElementById("BTN_OK_IMG"));
    fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
    setTimeout(function(){fnCalcHgtSubScreen();},0); //REDWOOD_CHANGES
   // fnCalcHgt();	 //REDWOOD_CHANGES
    /*var dbtime = 0;
    var servertime = 0;
    t = getDateObject();
    time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    var jstime = parseFloat(parseFloat(execStartTime) - parseFloat(startjsTime)) ;
    var loadAfterExec = parseFloat(parseFloat(time) - parseFloat(execEndTime)) ;
    jstime = parseFloat(parseFloat(jstime) + parseFloat(loadAfterExec));
    totaltime = parseFloat(parseFloat(t.getTime()) - parseFloat(parent.inTime)) ;
    startDate = new Date(parseFloat(parent.inTime));
    startTime = startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate() + " " + startDate.getHours() + ':' + startDate.getMinutes() + ':' + startDate.getSeconds();
    endTime = t.getFullYear() + '-' + t.getMonth() + '-' + t.getDate() + " " + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
    var executeQueryTime = mainWin.loadTimeArray[parent.seqNo];
    jstime = parseFloat(parseFloat(jstime) + parseFloat(executeQueryTime.split("~")[0]));
    dbtime = Math.round(parseFloat(parseFloat(dbtime) + parseFloat(executeQueryTime.split("~")[1])) * 100) / 100;
    servertime = Math.round(parseFloat(parseFloat(servertime) + parseFloat(executeQueryTime.split("~")[2])) * 100) / 100;
    var databaseSessionID = executeQueryTime.split("~")[5];
    var loginSeqNo = executeQueryTime.split("~")[6];
    var actionSeqno = executeQueryTime.split("~")[7];
    mainWin.loadTimeArray[parent.seqNo] = 0;
    jstime = Math.round(jstime * 100) / 100; */
    //fnPostActionLog(jstime, dbtime, servertime, startTime, endTime, totaltime, "", "", "", actionSeqno, databaseSessionID, loginSeqNo, parent.seqNo, "AUTHQUERY");
    //fnPopulateTimes(loginSeqNo,parent.seqNo,actionSeqno,jstime,dbtime,servertime,startTime,endTime,totaltime);
    //parent.mask(); //REDWOOD_CHANGES
	/*Fix for 20381271 Starts */
	if(document.getElementsByName("chkDeleteRow")[0])
		document.getElementsByName("chkDeleteRow")[0].checked = true;
	/*Fix for 20381271 Ends */
  //  document.getElementById("BTN_EXIT_IMG").focus();//REDWOOD_CHANGES
    
}

/*
 * Manages the check Boxs State when ever User checks and unchecks
 */
function fnCheck(event){
    var event = window.event || event;
    currRowIndex = getRowIndex(event);
    var modDetailsRef = document.getElementById("BLK_STTB_RECORD_LOG").tBodies[0].rows;
    var srcElem = getEventSourceElement(event);
    if (srcElem.checked){
        for (var rowCnt = 0; rowCnt < currRowIndex; rowCnt++){
            if (modDetailsRef[rowCnt]){
                modDetailsRef[rowCnt].cells[0].getElementsByTagName("INPUT")[0].checked = true;
            }
        }
    } else{
        for (var rowCnt = currRowIndex; rowCnt < modDetailsRef.length; rowCnt++){
            modDetailsRef[rowCnt].cells[0].getElementsByTagName("INPUT")[0].checked = false;
        }
    }

}

/*
 * Populates the value or the record that is selected by click
 */
function fnShowValue(){

    var objTRRef;
    var currRowIndex;
    var tdRef;
    var tdRefLen;
    objTRRef = getEventSourceElement(event);

    if (objTRRef.tagName != "TH" && objTRRef.tagName != "IMG" && objTRRef.tagName != "TABLE" && getRowIndex() != 0){

        var modDetailsRef = document.getElementById("BLK_STTB_RECORD_LOG").tBodies[0].rows;
        tdRef = modDetailsRef[lastHilightedRow].getElementsByTagName("TD");
        tdRefLen = tdRef.length;
        for (var cellIndex = 0; cellIndex < tdRefLen - 1; cellIndex++){
            tdRef[cellIndex].className = "TBODYTDMultiple";
        }
        while (objTRRef.tagName != "TR"){
            objTRRef = objTRRef.parentNode;
        }
        currRowIndex = objTRRef.rowIndex - 1;
        tdRef = objTRRef.getElementsByTagName("TD");
        tdRefLen = tdRef.length;
        for (var cellIndex = 0; cellIndex < tdRefLen - 1; cellIndex++){
            tdRef[cellIndex].className = "authTRHighleted";
        }
        lastHilightedRow = currRowIndex;
        if (currRowIndex != -1){
            document.getElementById("DIV_MOD_DETAILS").innerHTML = document.getElementsByName("MOD_DETAILS")[currRowIndex].value;
        }
    }
}

/*
 * gets modified versions of record
 */
function getModNumbers(){

    var objNodeRESPONSE;
    var msgStatus;
    var msg;
    var FVMaster;
    var modIndex = 0;

    var msgStatus = getNodeText(selectSingleNode(objResDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    var xPathQry = "FCUBS_RES_ENV/FCUBS_BODY"
    if (msgStatus == 'FAILURE'){
        objNodeRESPONSE = selectSingleNode(objResDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        xPathQry +=  "/FCUBS_ERROR_RESP/ERROR/ECODE";
        
    } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS"){
        objNodeRESPONSE = selectSingleNode(objResDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        xPathQry +=  "/FCUBS_WARNING_RESP/WARNING/WCODE";
    }
    var errCodes = selectNodes(objResDOM, xPathQry);
    for(var i = 0; i < errCodes.length; ++i) {
        var errCode = getNodeText(errCodes[i]);
        if(errCode == 'ST-MAINT01') type = "I";
        else type = "E";
    }
    
    if (msgStatus != 'SUCCESS'){
        var returnVal = displayResponse(objNodeRESPONSE, msgStatus);
        return returnVal;
    }

    tablesFromParent = parent.dataSrcLocationArray;
    relationArr = parent.relationArray;
    FVMaster = selectNodes(objResDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "']");

    for (var outerLoop = 0; outerLoop < FVMaster.length; outerLoop++){
        modNo = FVMaster[outerLoop].getAttribute("RECID");
        if (modNo != null){
            modNos[modIndex++] = modNo;
        }
    }
    return true;
}

/*
 * performs comparision between modified versions
 */
function fnProcessModNumbers(){

    var prevVal, curVal;
    var tablename;
    var recid;
    var recArr;
    var prevNodes, curNodes;
    var objCurrModDOM;
    var modNo;
    var nxtModNo;
    var pNode, curNode;
    var authRecordTag = "";
    var objFirstRecFCJDOM;

    var lbl_added = mainWin.getItemDesc('LBL_ADDED');
    var lbl_deleted = mainWin.getItemDesc('LBL_DELETED');
    var lbl_modified = mainWin.getItemDesc('LBL_MODIFIED');

    FVMaster = selectNodes(objResDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "']");

    objFirstRecFCJDOM = objResDOM;
    var removeNode = selectNodes(objFirstRecFCJDOM, "//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "' and @RECID !='" + modNos[0] + "']");
    for(var i=0; i < removeNode.length; i++){
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }
    var auditArray = fnGetAuditDetails(objFirstRecFCJDOM);
    if (auditArray['authStat'] == "U"){
        curNode = selectSingleNode(objFirstRecFCJDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "']");

        curNode.setAttribute("STATUS", "ADD");
        curNode.setAttribute("STATUS_VAL", lbl_added);
        authRecordTag += fnBuildAuthXML(objFirstRecFCJDOM, auditArray, 0, modNos[0]);
    }

    for (var cnt = 0; cnt < modNos.length - 1; cnt++){
        modNo = modNos[cnt];
        nxtModNo = modNos[cnt + 1];
        objCurrModDOM = objResDOM;
        var removeNode = selectNodes(objCurrModDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "' and @RECID !='" + nxtModNo + "']");
        for(var i=0; i < removeNode.length; i++){
             removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        auditArray = fnGetAuditDetails(objCurrModDOM);

        prevVal = getNodeText(selectSingleNode(FVMaster[cnt],"FV"));
        curVal = getNodeText(selectSingleNode(FVMaster[cnt + 1],"FV"));
        if (prevVal != curVal){
            curVal = fnIdentifyChanges(prevVal, curVal);
            curNode = selectSingleNode(objCurrModDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "']");

            curNode.setAttribute("STATUS", "MOD");
            curNode.setAttribute("STATUS_VAL", lbl_modified);
            setNodeText(selectSingleNode(curNode,"FV"),curVal);
        }

        if (selectNodes(FVMaster[cnt],"REC").length > 0){
            fnProcessChildNode(FVMaster[cnt]);
        }
        if (selectNodes(FVMaster[cnt + 1],"REC").length > 0){
            fnProcessChildNode(FVMaster[cnt + 1]);
        }
        
        for (var i = 0; i < columnValues.length; i++){
            tablename = columnValues[i];
            recArr = columnValues[tablename];
            for (var j = 0; j < recArr.length; j++){
                if (recArr[j] != null){
                    prevNodes = selectNodes(objResDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "' and @RECID='" + modNos[cnt] + "']//REC[@TYPE='" + tablename + "' and @RECID='" + recArr[j] + "']");
                    curNodes = selectNodes(objResDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "' and @RECID='" + modNos[cnt + 1] + "']//REC[@TYPE='" + tablename + "' and @RECID='" + recArr[j] + "']");

                    if ((prevNodes.length > 0) & (curNodes.length == 0)){
                        pNode = prevNodes[0].parentNode;
                        curNode = prevNodes[0];
                        curNode.setAttribute("STATUS", "DEL");
                        curNode.setAttribute("STATUS_VAL", lbl_deleted);
                        if (pNode.getAttribute("RECID") == modNo) selectSingleNode(objCurrModDOM,"//REC[@TYPE='" + pNode.getAttribute("TYPE") + "' and @RECID='" + nxtModNo + "']").appendChild(curNode);
                        else selectSingleNode(objCurrModDOM,"//REC[@TYPE='" + pNode.getAttribute("TYPE") + "' and @RECID='" + pNode.getAttribute("RECID") + "']").appendChild(curNode);

                        if (i + 1 != columnValues.length) fnDeleteChildRecids(columnValues, i, recArr[j]);
                    } else if ((prevNodes.length == 0) & (curNodes.length > 0)){
                        curNode = selectSingleNode(objCurrModDOM,"//REC[@TYPE='" + tablename + "' and @RECID='" + recArr[j] + "']");
                        curNode.setAttribute("STATUS", "ADD");
                        curNode.setAttribute("STATUS_VAL", lbl_added);
                        if (i + 1 != columnValues.length) fnDeleteChildRecids(columnValues, i, recArr[j]);
                    } else if ((prevNodes.length > 0) & (curNodes.length > 0)){
                        prevVal = getNodeText(selectSingleNode(prevNodes[0],"FV"));
                        curVal = getNodeText(selectSingleNode(curNodes[0],"FV"));
                        if (prevVal != curVal){
                            curVal = fnIdentifyChanges(prevVal, curVal);
                            curNode = selectSingleNode(objCurrModDOM,"//REC[@TYPE='" + tablename + "' and @RECID='" + recArr[j] + "']");
                            curNode.setAttribute("STATUS", "MOD");
                            curNode.setAttribute("STATUS_VAL", lbl_modified);
                             setNodeText(selectSingleNode(curNode,"FV"),curVal);
                        } else{
                            curNode = selectSingleNode(objCurrModDOM,"//REC[@TYPE='" + tablename + "' and @RECID='" + recArr[j] + "']");
                            curNode.setAttribute("STATUS_VAL", "");
                        }
                    }
                } //if (recArr[j] != null)
            } //  for (var j=0; j<recArr.length; j++)
        } // for (var i = 0; i< columnValues.length; i++)
        authRecordTag += fnBuildAuthXML(objCurrModDOM, auditArray, cnt + 1, nxtModNo);
    } // loop on mod numbers
    return authRecordTag;
}

/*
 * function to BuildAuthXml
 */
function fnBuildAuthXML(fcjDOM, auditArray, id, modNo){
    var authRecordTag;
    var xmlDOM;
    var html;

    xmlDOM = fnGetDataXMLFromFCJXML(fcjDOM, 1);
    html = transform(xmlDOM);
    authRecordTag = "<STTB_RECORD_LOG ID ='" + id + "'>";
    authRecordTag += "<AUTHORIZE>0</AUTHORIZE>";
    authRecordTag += "<MOD_NO>" + modNo + "</MOD_NO>";
    authRecordTag += "<RECORD_STAT>" + auditArray['recStat'] + "</RECORD_STAT>";
    authRecordTag += "<MAKER_ID>" + auditArray['makerId'] + "</MAKER_ID>";
    authRecordTag += "<MAKER_DT>" + auditArray['makerDt'] + "</MAKER_DT>";
    authRecordTag += "<MOD_DETAILS><![CDATA[" + html + "]]></MOD_DETAILS>";
    authRecordTag += "</STTB_RECORD_LOG>";

    return authRecordTag;
}

/*
 * function to get Audit field values
 */
function fnGetAuditDetails(fcjDOM){
    
    var FNMaster = getNodeText((selectSingleNode(fcjDOM,"//FCUBS_BODY/FLD/FN[@TYPE='" + tablesFromParent[0] + "']")));
    var FVCurrent = getNodeText((selectSingleNode(fcjDOM,"//FCUBS_BODY/REC[@TYPE='" + tablesFromParent[0] + "']/FV")));

    var FVRec = getNodeText((selectSingleNode(fcjDOM,"//FCUBS_BODY/REC/REC[@TYPE='" + "STTB_RECORD_LOG" + "']/FV")));
    var FVFld = getNodeText((selectSingleNode(fcjDOM,"//FCUBS_BODY/REC/REC/REC[@TYPE='" + "STTB_FIELD_LOG" + "']/FV")));

    var FNArray = new Array();
    var FVArray = new Array();
    var auditArray = new Array();
    string_parser(FNMaster, '~', FNArray);
    string_parser(FVCurrent, '~', FVArray);
    for (var index = 0; index < FNArray.length; index++){
        switch (FNArray[index])
        {
        case "MAKER_ID":
        case "MAKERID":
            auditArray['makerId'] = "SANDR";
            break;
        case "MAKER_DT_STAMP":
        case "MAKERSTAMP":
            auditArray['makerDt'] = FVArray[index];
            auditArray['makerDt'] = "2007-05-15 23:08:23";
            break;
        case "RECORD_STAT":
            auditArray['recStat'] = "O";
            break;
        case "AUTH_STAT":
        case "AUTHSTAT":
            auditArray['authStat'] = "U";
            break;
        }
    }
    return auditArray;
}

/*
 * process the child nodes and fills the collumnValues array
 */
function fnProcessChildNode(pNode, pCurNode){
    var lChildNodes;
    var chldNode;
    var index = columnValues.length;
    var index1;
    var tableName;
    var key;
    var childArr;

    lChildNodes = selectNodes(pNode,"REC");

    if (lChildNodes != null){
        for (var j = 0; j < lChildNodes.length; j++){
            chldNode = lChildNodes[j];
            tableName = chldNode.getAttribute("TYPE");
            if (columnValues[tableName] == null){
                columnValues[index++] = tableName;
                childArr = new Array();
                key = chldNode.getAttribute("RECID");
                childArr[0] = key;
                childArr[key] = getNodeText((selectSingleNode(chldNode,"FV")));
                columnValues[tableName] = childArr;
            } else{
                childArr = columnValues[tableName];
                key = chldNode.getAttribute("RECID");
                if (childArr[key] == null){
                    index1 = childArr.length;
                    childArr[index1] = key;
                    childArr[key] = getNodeText((selectSingleNode(chldNode,"FV")));
                    columnValues[tableName] = childArr;
                }
            }
        }

        for (var j = 0; j < lChildNodes.length; j++){
            if (selectNodes(lChildNodes[j],"REC").length > 0){
                fnProcessChildNode(lChildNodes[j]);
            }
        }
    }
}

/*
 * Deletes the child Recids by setting its array to null
 */

function fnDeleteChildRecids(arrVals, index, key){
    var tableName;
    var recArr;

    for (var cnt = index + 1; cnt < arrVals.length; cnt++){
        tableName = columnValues[cnt];
        recArr = columnValues[tableName];
        for (var j = 0; j < recArr.length; j++){
            if (recArr[j] != null){
                if (recArr[j].indexOf(key) != -1) recArr[j] = null;
            }
        }
    }
}

/* This function would compare the old and new FV
   and return the new FV with the changes marked within brackets
*/
function fnIdentifyChanges(prevValue, curValue){
    var newFV = "";
    var prevArr = new Array();
    var curArr = new Array();
    string_parser(prevValue, '~', prevArr);
    string_parser(curValue, '~', curArr);
    for (var i = 0; i < prevArr.length; i++){
        newFV = newFV + curArr[i] + "~";
    }

    newFV = newFV.substring(0, newFV.length - 1);
    return newFV;
}

/*
 * sending request for authorization
 */
/*Redwood changes for 35092666 added below function fnSave_CVS_MAIN*/ 
function fnSave_CVS_MAIN(){
	fnSave();
}

function fnSave(){
    var canAuthorize = fnValidateModNos();
    selectedMod = modArray[maxCheckedModNoIndex];
    var errCode = "";
    if (!canAuthorize){
        var attr = "E";
        if (gErrCodes.indexOf('!') != -1){
            errCode = gErrCodes.substring(0,gErrCodes.length-1);
            gErrCodes = "";
            mask();
            showAlerts(fnBuildAlertXML(errCode,'E',"",replaceStr), "E");
            replaceStr = "";
        } else{
            errCode = gErrCodes.substring(0,gErrCodes.length-1);
            gErrCodes = "";
            mask();
            showAlerts(fnBuildAlertXML(errCode,'E',"",replaceStr), "E");
            replaceStr = "";
        }
        
        return false;
    } else{
        var recNode = selectSingleNode(objResBackUpDOM,"//FCUBS_BODY/REC/REC[@RECID =" + selectedMod + "]");
        if (recNode){
            var fvList = selectNodes(recNode,"//FV");
            for (var fvIndex = 0; fvIndex < fvList.length; fvIndex++){
                var fvNode = fvList[fvIndex];
                var fvData = "";
                if (fvNode.childNodes.length > 0){
                    fvData = fvNode.childNodes[0].nodeValue;
                    fvData = gEncodeData(fvData);
                    fvNode.childNodes[0].nodeValue = fvData;
                }
            }
            parent.fnProcessAuth(selectedMod);

            fnExit();
        }
    }
}

/*
 * sending request for authorization for online screens
 */
function fnSave_CVS_AUTHORIZE(){

    var objOnlineAuthReqDOM = null;
    gAction = 'AUTH';
    var objOnlineReqDOM = buildFCJXML();

    var recNode = selectSingleNode(objOnlineReqDOM,"FCJMSG/MSG/REC");
    if (recNode){
        var fvList = selectNodes(recNode,"//FV");
        for (var fvIndex = 0; fvIndex < fvList.length; fvIndex++){
            var fvNode = fvList[fvIndex];
            var fvData = "";
            if (fvNode.children.length > 0){
                fvData = fvNode.children[0].nodeValue;
                fvData = gEncodeData(fvData);
                fvNode.children[0].nodeValue = fvData;
            }
        }
    }

    parent.fnProcessAuth(recNode);
    fnExit();
}

/*
 * Validates ModNumbers.
 */
function fnValidateModNos(){
    var userId = mainWin.UserId;
    //var authRowsRef = document.getElementById("BLK_STTB_RECORD_LOG").tBodies[0].rows; //REDWOOD_CHANGES
    var authRowsRef = getTableObjForBlock("BLK_STTB_RECORD_LOG").tBodies[0].rows;  //REDWOOD_CHANGES
    var authRowsRefLen = authRowsRef.length;
    var modCnt = 0;
    var isChecked;
    var currModNo;
    var currMakerId;
    var minOneChecked = false;
    maxCheckedModNoIndex = -1;
    var lastCorrectVersion = -1;
    var error = new Array();
    error[0] = "";
    var isValid = true;
    for (var rowIndex = 0; rowIndex < authRowsRefLen; rowIndex++){
        isChecked = authRowsRef[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked;
        currModNo = authRowsRef[rowIndex].cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value; //REDWOOD_CHANGES
        currMakerId = authRowsRef[rowIndex].cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value; //REDWOOD_CHANGES
        modArray[modCnt] = currModNo;
        LMODNO = currModNo;
        if (isChecked){
            minOneChecked = true;
            if (userId != currMakerId){
                maxCheckedModNoIndex = modCnt;
                lastCorrectVersion = currModNo;
            } else{
                error[0] = error[0] + currModNo + ',';
            }
        }
        modCnt++;
    }
    if (!minOneChecked){
        appendErrorCode("ST-COM033", null);
        isValid = false;

    } else{
        if (error[0] != ""){
            var chkLastVar = error[0].substring(error[0].length - 1, error[0].length);
            if (chkLastVar == ",") error[0] = error[0].substring(0, error[0].length - 1);
            appendErrorCode("ST-COM034", error[0]);
            isValid = false;

        }
    }
    return isValid;
}

function fnExit(){
    parent.unmask();
	parent.gAction="";//changes for 22755419
    parent.fnExitSubScreenData(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherLeft, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth);
}
//*****SCRIPT FOR MULTIPLE ENTRY BLOCKS - START*****
//-----------------------------------------------------------------------
var multipleEntryIDs = new Array();
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//-----------------------------------------------------------------------
multipleEntryIDs[0] = 'BLK_STTB_RECORD_LOG';
multipleEntryIDs[1] = 'BLK_STTB_FIELD_LOG';

//-----------------------------------------------------------------------
function fnAddRow_BLK_STTB_RECORD_LOG(){
    return true;
}
//-----------------------------------------------------------------------
function fnDeleteRow_BLK_STTB_RECORD_LOG(){
    return true;
}

function fnAddRow_BLK_STTB_FIELD_LOG(){
    return true;
}
//-----------------------------------------------------------------------
function fnDeleteRow_BLK_STTB_FIELD_LOG(){
    return true;
}
//-----------------------------------------------------------------------
//*****SCRIPT FOR MULTIPLE ENTRY BLOCKS - END*****

// SANDEEP, FUNCTION TO SHOW THE NEW AUDIT SCREEN.
// STDFCJGN PHASE 1 

function showAuditBlkData(rootName, index, isAuth, respDOM){

    disableAllBlockElements('BLK_STTB_FIELD_LOG', true, false);

    showTabData(dataSrcLocationArray, respDOM);
    if (mainWin.applicationName == 'FCIS'){
        var misTable1 = document.getElementById("BLK_STTB_FIELD_LOG");
        var misRows1 = misTable1.tBodies[0].rows;
        var rowIndex = 0;

        for (var nodeIndex = 0; nodeIndex < misRows1.length; nodeIndex++){
            misRows1[nodeIndex].cells[0].getElementsByTagName("INPUT")[0].style.visibility = "hidden";

            misRows1[nodeIndex].cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
            misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].readOnly = true;
            misRows1[nodeIndex].cells[3].getElementsByTagName("INPUT")[0].readOnly = true;
        }
    }
    return;
}

function fnShowValue_field(event){
    gAction = "AUTHQUERY";
    appendData(document.getElementById("TBLPageAll"));
    var rowIndex = getRowIndex(event);
    var tableName = 'STTB_RECORD_LOG';
    dbIndexArray[tableName] = rowIndex;
    resetChildIndex(tableName);
    showDescandants(tableName);
    if (mainWin.applicationName == 'FCIS'){
        fnDisableMultipleEntry('BLK_STTB_FIELD_LOG');
    }
}

function getNode_auth(DBT, id){

    var respDOM = fnGetDataXMLFromFCJXML(objResBackUpDOM, 1);
    var query = getXPathQuery(DBT);
    var rootNode = selectSingleNode(respDOM,query + "[@ID=" + id + "]");

    var parentTableName = relationArray[DBT];
    var relation = "1";
    if (parentTableName){
        relation = parentTableName.substring(parentTableName.length - 1);
        parentTableName = parentTableName.substring(0, parentTableName.length - 2);

        if (id >= 1 && relation == 'N'){
            if (rootNode == null){
                var parentNode = selectSingleNode(respDOM,getQueryWithId(parentTableName));
                if (parentNode == null){
                    parentNode = getNode(parentTableName, 1);
                }
                var newNode = respDOM.createElement(DBT);
                newNode.setAttribute("ID", id);
                newNode.setAttribute("Type", "MULTIPLE");
                parentNode.appendChild(newNode);
                rootNode = newNode;
            }
        } else if (id == 1 && relation == '1'){
            if (rootNode == null){
                var parentNode = selectSingleNode(respDOM,getQueryWithId(parentTableName));
                if (!parentNode){
                    parentNode = getNode(parentTableName, dbIndexArray[parentTableName]);
                }
                var newNode = respDOM.createElement(DBT);
                newNode.setAttribute("ID", id);
                newNode.setAttribute("Type", "SINGLE");
                parentNode.appendChild(newNode);
                rootNode = newNode;
            }
        } else{
            rootNode = selectSingleNode(respDOM,"//" + DBT + "[@ID=" + 1 + "]");
        }
    }
    return rootNode;
}

function fnChangeColor(){

    var l_TblObj = document.getElementById("BLK_STTB_RECORD_LOG");
    if (l_TblObj == null) return;
    var l_RowIdx = getRowIndex() -1;
    var l_Rows = l_TblObj.tBodies[0].rows;
    for (var l_Cnt = 0; l_Cnt < l_Rows.length; l_Cnt++){
        if (l_Cnt != l_RowIdx){
            for (var l_Idx = 1; l_Idx < l_Rows[l_Cnt].cells.length; l_Idx++){
                l_Rows[l_Cnt].cells[l_Idx].className = "TBODYTDMultiple"
            } //for
        } //if    

        if (l_Cnt == l_RowIdx){
            for (var l_Idx = 1; l_Idx < l_Rows[l_Cnt].cells.length; l_Idx++){
                l_Rows[l_Cnt].cells[l_Idx].className = "TBODYTDMultipleHighlighted"
            } //for

        } //if  

    }
}

// Kals On June 22 , Sort the records based on the Mod Number.. 
function fnSortOn_MOD_NO(v_ResDOM){
    var l_NewRes = v_ResDOM;

    var l_Xp_RecFlds = "//REC[@TYPE = 'STTB_RECORD_LOG']";
    var l_RecNodes = selectNodes(v_ResDOM,l_Xp_RecFlds);
    var l_No_OfRec = 0;
    l_No_OfRec = l_RecNodes.length;

    for (var l_Cnt = 0; l_Cnt < l_No_OfRec; l_Cnt++){
        var l_RecNodeXp = "//REC[@TYPE = 'STTB_RECORD_LOG'][@RECID = " + (l_Cnt + 1) + "]";
        var l_RecNode = selectSingleNode(v_ResDOM,l_RecNodeXp);
        if (l_RecNode){ 
            l_RecNode.parentNode.appendChild(l_RecNode);
        }
    }
}

function fnSortDbDOMNodes(v_dbDOMNodes){

    var l_Xp_RecFlds = "//STTB_RECORD_LOG";
    var l_RecNodesDbDOM = selectNodes(v_dbDOMNodes,l_Xp_RecFlds);
    var l_No_OfRecDBDOM = 0;
    l_No_OfRecDBDOM = l_RecNodesDbDOM.length;

    var l_SortedArray = fnGetSortedRecIds(l_RecNodesDbDOM);

    for (var l_Cnt = 0; l_Cnt < l_No_OfRecDBDOM; l_Cnt++){
        var l_RecNodeXp = "//STTB_RECORD_LOG[@RECID = " + (l_SortedArray[l_Cnt]) + "]";
        var l_RecNodeDbDOM = selectSingleNode(v_dbDOMNodes,l_RecNodeXp);
        if (l_RecNodeDbDOM){ 
            l_RecNodeDbDOM.parentNode.appendChild(l_RecNodeDbDOM);
        }
    }

}

function fnGetSortedRecIds(v_RecNodes_ToSort){
    var l_ArrTemp = new Array();

    for (var l_Itr = 0; l_Itr < v_RecNodes_ToSort.length; l_Itr++){
        l_ArrTemp[l_Itr] = v_RecNodes_ToSort[l_Itr].getAttribute("RECID");
    }

    return bubbleSort_Array(l_ArrTemp);

}

// Kals On june 26 
function bubbleSort_Array(arrayElements){
    for (var outer = 0; outer < arrayElements.length; outer++){
        for (var inner = outer + 1; inner < arrayElements.length; inner++){
            if (parseInt(arrayElements[outer]) > parseInt(arrayElements[inner])){
                var temp = arrayElements[outer];
                arrayElements[outer] = arrayElements[inner];
                arrayElements[inner] = temp;
            }

        }

    }
    return arrayElements;
}

function fnDisableMultipleEntry(l_obj){
    var misTable1 = document.getElementById(l_obj);
    var misRows1 = misTable1.tBodies[0].rows;
    var rowIndex = 0;

    for (var nodeIndex = 0; nodeIndex < misRows1.length; nodeIndex++){
        misRows1[nodeIndex].cells[0].getElementsByTagName("INPUT")[0].style.visibility = "hidden";
        fnDisableElement(misRows1[nodeIndex].cells[1].getElementsByTagName("INPUT")[0]);
        fnDisableElement(misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0]);
        fnDisableElement(misRows1[nodeIndex].cells[3].getElementsByTagName("INPUT")[0]);
    }
}


function fnGetLabelsFromXMLforAuthorize(functionId, arrBlkNames, arrFldNames, langCode){
    var fileName;
    var canPrint = true;
    fileName = functionId.substring(2, 0) + "D" + functionId.substring(3, functionId.length);
    fileName = mainWin.UIXmlPath.substring(0) + langCode + fileName + ".xml";
    gXmlDoc = loadXMLFile(fileName);

    var arrBlkFldNames = new Array();
    var blkNodeListRef;
    var tempArrLen = 0;
    var tempblkId;
    var lblRef;
    var blkNodeList = selectNodes(gXmlDoc,"//BLOCK[@SCREEN !='SUMMARY' and (@TYPE = '" + gSingleE + "' or @TYPE = '" + gMulitE + "')]");

    for (var blkCnt = 0; blkCnt < blkNodeList.length; blkCnt++){
        blkNodeListRef = blkNodeList[blkCnt];
        tempBlkId = getNodeText(selectSingleNode(blkNodeListRef,"ID"));
        arrBlkNames[blkCnt] = tempBlkId;
        lblRef = selectSingleNode(blkNodeListRef,"LABEL");
        arrBlkNames[tempBlkId] = tempBlkId;
        if (lblRef != null){
            arrBlkNames[tempBlkId] = getNodeText(selectSingleNode(blkNodeListRef,"LABEL"));
        }
        arrFldNames[tempBlkId] = getFldNames(blkNodeListRef);
    }
    arrFldNames = includeAuditLblsforAuthorize(arrBlkNames, arrFldNames);
    return canPrint;
}

function includeAuditLblsforAuthorize(arrBlkNames, arrFldNames){
    var arrBlkFldNames = new Array();
    var masterBlkName;
    var masterBlkNodeList = selectSingleNode(gXmlDoc,"//BLOCK[@TYPE = 'Audit Entry']");
    if (masterBlkNodeList != null){
        masterBlkName = getNodeText(selectSingleNode(masterBlkNodeList,"DBT"));
    }
    var auditFldIds = new Array('RECORD_STAT', 'AUTH_STAT', 'MAKER_ID', 'MAKER_DT_STAMP', 'CHECKER_ID', 'CHECKER_DT_STAMP', 'MOD_NO', 'ONCE_AUTH');
    var auditFldLbls = new Array();
    auditFldLbls[0] = mainWin.getItemDesc("LBL_RECORD_STAT");
    auditFldLbls[1] = mainWin.getItemDesc("LBL_AUTH_STAT");
    auditFldLbls[2] = mainWin.getItemDesc("LBL_MAKER_ID");
    auditFldLbls[3] = mainWin.getItemDesc("LBL_MAKER_DT_STAMP");
    auditFldLbls[4] = mainWin.getItemDesc("LBL_CHECKER_ID");
    auditFldLbls[5] = mainWin.getItemDesc("LBL_CHECKER_DT_STAMP");
    auditFldLbls[6] = mainWin.getItemDesc("LBL_MOD_NO");
    auditFldLbls[7] = mainWin.getItemDesc("LBL_ONCE_AUTH");
    for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++){
        tempBlkId = arrBlkNames[blkCnt];
        if (masterBlkName == tempBlkId){
            arrBlkFldNames = arrFldNames[tempBlkId];
            tempArrLen = arrBlkFldNames.length;
            for (var auditCnt = 0; auditCnt < auditFldIds.length; auditCnt++){
                arrBlkFldNames[tempArrLen] = auditFldIds[auditCnt];
                arrBlkFldNames[arrBlkFldNames[tempArrLen]] = auditFldLbls[auditCnt];
                tempArrLen++;
            }
        }
    }
    return arrFldNames;
}

/*Function For Viewing changes in maintainence screen before Authorize*/

function fnGetDetails(event){
    //inDate = setActionTime();
//REDWOOD_CHANGES
    //var authRowsRef = document.getElementById("BLK_STTB_RECORD_LOG").tBodies[0].rows; //ojet
    var authRowsRef = getTableObjForBlock("BLK_STTB_RECORD_LOG").tBodies[0].rows; 
    
    var selectedMod = authRowsRef[getRowIndex(event)-1].cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value;
  //REDWOOD_CHANGES  
    var recNode = selectSingleNode(objResBackUpDOM,"//FCUBS_BODY/REC/REC[@RECID =" + selectedMod + "]");
    if (recNode){
        var fvList = selectNodes(recNode,"//FV");
        for (var fvIndex = 0; fvIndex < fvList.length; fvIndex++){
            var fvNode = fvList[fvIndex];
            var fvData = "";
            if(typeof(fvNode.children) == "undefined"){
                if (fvNode.childNodes.length > 0){
                    fvData = fvNode.childNodes[0].nodeValue;
                    fvData = gEncodeData(fvData);
                    fvNode.childNodes[0].nodeValue = fvData;
                }
            } else {
                if (fvNode.children.length > 0){
                    fvData = fvNode.children[0].nodeValue;
                    fvData = gEncodeData(fvData);
                    fvNode.children[0].nodeValue = fvData;
                }
            }
        }
        parent.fnProcessAuthViewchg(selectedMod);

    }

    var prevmod = selectedMod - 1;
   
   var  NewfcjResponseXML = parent.fcjResponseDOM;
   
    var fcjResponseDOM = loadXMLDoc(getXMLString(NewfcjResponseXML));
    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    dbDataDOM = loadXMLDoc(getXMLString(pureXMLDOM));

    var functionId = parent.functionId;
    posttime = parent.posttime;
    afterposttime = parent.afterposttime;
    var uiName = getUINameForFunc(functionId);
    if (functionId != ""){
        winParams.doc = document;
        mainWin.Authdom = dbDataDOM;
        gAction = "VIEWMNTLOG";
        var timeStamp = getDateObject();
        mainWin.dispHref1(functionId, parent.seqNo);
    }
    mainWin.isViewAuthOpen = true;
    //fnpostAction(gAction, fcjResponseDOM); //9NT1606_12_4_RETRO_12_3_26524831 Commented the code since the function is not present.
}

/*Function For Viewing changes in maintainence screen before Authorize*/
function fnGetModNos(){
    var userId = mainWin.UserId;
    var authRowsRef = document.getElementById("BLK_STTB_RECORD_LOG").tBodies[0].rows;
    var authRowsRefLen = authRowsRef.length;
    var modCnt = 0;
    var isChecked;
    var currModNo;
    var isValid = true;
    for (var rowIndex = 0; rowIndex < authRowsRefLen; rowIndex++){
        isChecked = authRowsRef[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked;
        if (isChecked){
            currModNo = authRowsRef[rowIndex].cells[1].getElementsByTagName("INPUT")[0].value;
        }
    }
    LMODNO = currModNo;
}

function fnFocusViewWin(){
    if(typeof(viewWin)!= "undefined"){
        if(viewWin){
            try{
                viewWin.focus();
            } catch(e){}           
        }    
    }
    return;
}

function fnKeepDlgArgActive() {
    try{
        if(mainWin.isSessionActive()) {
            var userId1 = mainWin.UserId;
            return;
        }
    }catch(e){}
}

function initRedirect(){
    clearInterval(timerRedirect);     
    timerRedirect = setInterval("fnKeepDlgArgActive();",60000); 
}

function fnCloseAlertWin(evnt) {
    try {
            if(typeof(customAlertAction) != "undefined") {
                if(customAlertAction != "") {
                    //eval("fnCloseAlertWin_"+customAlertAction+"(evnt)");
                    var fnEval = new Function("evnt","fnCloseAlertWin_"+customAlertAction+"(evnt)");  
                    fnEval(evnt); //Fix for 18423705
                    customAlertAction = "";
                    return;
                }
            }
        } catch(e) {
        }
    if (alertAction == "FCISAUTHLOAD") {
        if (checkerId != makerId) {
            parent.fnProcessAuth(modNo);
            fnExit(event);
            return;
        } else {
            alertAction = "UNMASK";
            showAlerts(fnBuildAlertXML('ST-COM034','E', '', modNo), "E");
            fnExit();
        }
    }else if (alertAction == "ERROR") {
        unmask();
        fnPostProcessResponse("FAILURE");
        return false;
    } else if (alertAction == "SUCCESS") {
        unmask();
        fnPostProcessResponse("SUCCESS");
        return true;
    }else if (alertAction == "UNMASK") {
        unmask();
    } else if (alertAction == "OVERRIDE") {
        var ubsXMLDOM = loadXMLDoc("<FCUBS_REQ_ENV/>");
        var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
        ubsXMLDOM.documentElement.appendChild(fcjResponseDOM.documentElement.childNodes[0]);
        ubsXMLDOM.documentElement.appendChild(fcjResponseDOM.documentElement.childNodes[0]);
        var moduleNode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID");//Fix for 21505061 start
        if(moduleNode == null) {
          var moduleNod = ubsXMLDOM.createElement("MODULEID");
          var module = functionId.substring(0, 2);
          //Prakash@FCIS8.0 - ITR1 - SCF# - 24/09/2007 - Start
          if (mainWin.applicationName == 'FCIS') {
              module = mainWin.CurrentModule
          }
          setNodeText(moduleNod, module);
          selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER").appendChild(moduleNod);
        }//Fix for 21505061 end

        if (typeof(servletURL) == 'undefined') {
            servletURL = 'FCClientHandler';
        }

        fcjResponseDOM = fnPost(ubsXMLDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")); // SANDEEP-CHGMSG
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }

            if (msgStatus == 'SUCCESS') {
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                var l_LockRelStatus = true;
                if (gAction == 'MODIFY') {
                    l_LockRelStatus = releaseLock();
                }
                disableForm();
                fnSetExitButton(false);//Fix for 21505061 
                gAction = "";
                displayResponse(messageNode);
            }
            if (msgStatus != 'SUCCESS') {
                displayResponse(messageNode);
                return;
                }
        } else {
            alert(mainWin.getItemDesc("LBL_EMPTY_RESPONSE"));
            fnPostProcessResponse("FAILURE");
                return;
        }
    } else {
        unmask();
    }
}

function fnExitAlertWin(evnt) {
    try {
        if(typeof(customAlertAction) != "undefined") {
            if(customAlertAction != "") {
                //eval("fnExitAlertWin_"+customAlertAction+"(evnt)");
                var fnEval = new Function("evnt","fnExitAlertWin_"+customAlertAction+"(evnt)");  
                fnEval(evnt); //Fix for 18423705
                customAlertAction = "";
                return;
            }
        }
    } catch(e) {
    }
    if(alertAction == "FCISAUTHLOAD"){
        fnExit();
    } else {
        unmask();
    }
}
//Fix for 21505061 start
function fnSetExitButton(enableBtn) {
    try {
        fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
        document.getElementById("BTN_EXIT_IMG").focus();
        if (enableBtn) {
            if (gAction == "ENTERQUERY") {
                if (gscrPos) {
                    if (gscrPos == "template") {
                        document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_CANCEL");
                    } else {
                        document.getElementById("BTN_EXIT_IMG").src = cache2.src;
                    }
                }
            } else if (gscrPos) {
                if (gscrPos == "template") {
                    document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_CANCEL");
                }
            } else {
                document.getElementById("BTN_EXIT_IMG").src = cache2.src;
            }
        } else if (gscrPos) {
            if (gscrPos == "template") {
                document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_EXIT");
            }
        } else {
            document.getElementById("BTN_EXIT_IMG").src = cache1.src;
        }
    } catch (e) {
        alert(scriptError);
    }
}
//Fix for 21505061 end