/*----------------------------------------------------------------------------------------------------
**
** File Name    : BuildXML.js
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

Copyright © 2004-2016   by Oracle Financial Services Software Limited..

**  Modified By          : Neethu Sreedharan
**  Modified On          : 21-Jun-2017
**  Modified Reason      : Changes done to handle special character in primary key field  
**  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230406

**  Modified By          : Manoj
**  Modified On          : 21-Jul-2023
**  Modified Reason      : Changes done to handle assignation value of strCurrentTabID for Search execution.  
**  Search String        : redwood_35423143
**
**  Modified By          : Manoj S
**  Modified On          : 05-Feb-2024
**  Modified Reason      : Changes done to handle amount and number separator in BuildXML
**  Search String        : Redwood_36226115
----------------------------------------------------------------------------------------------------
*/
//Array used to maintain Query Only Data Source added by Sankarganesh on 9/05/05
var isQuery = new Array();
var isControl = new Array();
var summaryDaraScrType = "";
var newAmountFormat = mainWin.nlsAmountFormat;
var decimalSymbol = newAmountFormat.substr(0, 1);
var digitGroupingSymbol = newAmountFormat.substr(1);
var isControlFieldsArrValues = new Array();
var webDOM = null;
/*
try
{
    var webDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
} catch(e)
{
    var webDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
}
*/
var buttonrowIndex = "";

function buildSummaryQueryXML(advCriteriaList) {
    var strCriteria = "";
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
    var sumfldTag = summaryFN.substring(summaryFN.indexOf(">") + 1, summaryFN.length);
    var queryOrderBy = defaultOrderByClause;
    /*
    try {
        var localDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e) {
        var localDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    */
	if(advCriteriaList=='Y' && strCurrentTabID != 'idQuery')//redwood_35423143
	strCurrentTabID = 'idQuery';//redwood_35423143
	
    debugs('Current Tab ' + strCurrentTabID, 'A');
    var l_strCriteria = "";

    if (strCurrentTabID == 'idQuery') {
        debugs('Inside First Tab ', 'A');
        l_strCriteria = getCriteriaList();
    } else if (strCurrentTabID == 'idAdvanced') {
        debugs('Inside Advanced', 'A');
        if (typeof(advCriteriaList)!='undefined' && advCriteriaList!="") { //REDWOOD_CHANGES
            l_strCriteria = advCriteriaList;
        } else {
            l_strCriteria = gGetAdvancedCriteria();
        }
    }
    //12.3_Bug#25772150 Changes Starts
    var sqNo = "";
    if(typeof(seqNo) != "undefined") {
       sqNo = seqNo;
    } else {
       sqNo = parent.seqNo;
    }
    //12.3_Bug#25772150 Changes Ends
    strCriteria = '<FCJMSG SRC="' + mainWin.AppSource + '" ';
    // Changes for txnbranch 
    if (typeof(g_txnBranch) != "undefined" && g_txnBranch != "") {
        strCriteria += 'BRANCH = "' + g_txnBranch +'" ';
    } else {
        strCriteria += 'BRANCH = "' + mainWin.CurrentBranch + '" ';
    }
    strCriteria += 'USERID = "' + mainWin.UserId + '" ';
    strCriteria += 'MODULEID = "' + mainWin.CurrentModule + '" ';
    strCriteria += 'SQNO = "' + sqNo + '" >'; //12.3_Bug#25772150 Changes
    strCriteria += '<MAINTQRY TYPE="N" ROOTTABLE = "' + dataSrcLocationArray[0] + '" QUERYFROM="" QUERYORDERBY = "' + queryOrderBy + '" SUMFN= "' + sumfldTag + '">';
    strCriteria += l_strCriteria;
    strCriteria += '</MAINTQRY><FCUBS_HEADER><DEBUG_MODE>'+mainWin.DebugWindowFlg+'</DEBUG_MODE></FCUBS_HEADER></FCJMSG>';// performance changes, fix for 21522706 
    //localDOM.loadXML(strCriteria);
    var localDOM = loadXMLDoc(strCriteria);
    return localDOM;
}

/* Based on the criteria entered in the query tab, this function creates a criteria string */
function getCriteriaList() {
    debugs("Inside method getCriteriaList", "P");
    var objBody = document.getElementById("TblQuery");	
//REDWOOD_CHANGES
//    var objInput = objBody.getElementsByTagName("INPUT");
//    var objSelect = objBody.getElementsByTagName("SELECT");
    var objInput = objBody.getElementsByTagName("OJ-INPUT-TEXT");
    var objSelect = objBody.getElementsByTagName("OJ-SELECT-SINGLE");
//REDWOOD_CHANGES
    var txtInput;
    var tempStr = '';
    var strCriteria = '';
    for (var i = 0; i < objInput.length; i++) {
        txtInput = objInput[i];
        if ((txtInput) && txtInput.getAttribute("DBT") == "") //set default master table if table not present
            txtInput.setAttribute("DBT", summaryDaraScrType);
        if (txtInput.getAttribute("DBC") == null || txtInput.value == "")
            continue;
        var txtInput_check = 'N';
        if (txtInput.checked == true) {
            txtInput_check = 'Y';
        } else {
            txtInput_check = 'N';
        }	
//REDWOOD_CHANGES
//        if (txtInput.type.toUpperCase() == "CHECKBOX") {
//            if (txtInput.checked) {
//                if (txtInput.getAttribute("ON")) 
//                    tempStr += txtInput.getAttribute("DBC") + ':' + txtInput.getAttribute("ON") + "~";
//                else 
//                    tempStr += txtInput.getAttribute("DBC") + ':' + txtInput_check + "~";
//            } else {
//                if (txtInput.getAttribute("OFF")) 
//                    tempStr += txtInput.getAttribute("DBC") + ':' + txtInput.getAttribute("OFF") + "~";
//                else 
//                    tempStr += txtInput.getAttribute("DBC") + ':' + txtInput_check + "~";
//            }            
//        } else if (txtInput.type.toUpperCase() == "RADIO") {
//            var l_RdoFldName = txtInput.name;
//            var l_RdoFlds = document.getElementsByName(l_RdoFldName);
//            var l_RdoChkdVal = "";
//            for (var l_RdoCnt = 0; l_RdoCnt < l_RdoFlds.length; l_RdoCnt++) {
//                if (l_RdoFlds[l_RdoCnt].checked) 
//                    l_RdoChkdVal = l_RdoFlds[l_RdoCnt].value;
//            }
//            tempStr += txtInput.getAttribute("DBC") + ':' + l_RdoChkdVal + "~";
//        } else {
            if (txtInput.value) {  
//REDWOOD_CHANGES
                var temp_txtInputVal = (txtInput.value).replace('&', '&amp;');
//                var temp_txtInputVal = replaceAllChar(txtInput.value ,'&', '&amp;');//REDWOOD_CHANGES
                //Fix for dot,comma issue begins
                if (getOuterHTML(txtInput).indexOf("displayAmount") != -1) {
                    temp_txtInputVal = txtInput.value;
                    temp_txtInputVal = temp_txtInputVal.replace(".", decimalSymbol);
                }
                if (getOuterHTML(txtInput).indexOf("displayFormattedNumber") != -1) {
                    temp_txtInputVal = txtInput.value;
                    temp_txtInputVal = temp_txtInputVal.replace(".", decimalSymbol);
                }
                //ends
                // FCUBS10.0ITR2 SFR 545. -- & 'll be recoganized as &amp;
                if (txtInput.value.indexOf(':') != -1) {
                    var re = new RegExp(':', "g");
                    temp_txtInputVal = temp_txtInputVal.replace(re, "!");
                }

                tempStr += txtInput.getAttribute("DBC") + ':' + temp_txtInputVal + '~';
            }
//        }		//REDWOOD_CHANGES
    }
    
    for (var j = 0; j < objSelect.length; j++) {
        txtInput = objSelect[j];
        if (txtInput.getAttribute("DBC") == null || txtInput.value == "")
            continue;		  
//REDWOOD_CHANGES
        if (txtInput.value) {
        if(typeof(txtInput.value) == 'number'){
            txtInput.value = ''+txtInput.value;
        }	
//REDWOOD_CHANGES
            var temp_txtInputVal = (txtInput.value).replace('&', '&amp;');
            
            if (txtInput.value.indexOf(':') != -1) {
                var re = new RegExp(':', "g");
                temp_txtInputVal = temp_txtInputVal.replace(re, "!");
            }

            //tempStr = tempStr + txtInput.getAttribute("DBC") + ':' + temp_txtInputVal;
            tempStr += txtInput.getAttribute("DBC") + ':' + temp_txtInputVal + '#SLCT~'; /*Fix for 17855306 */
        }     
    }
    
    if (tempStr.charAt(tempStr.length - 1) == '~') //remove last char '~'
        tempStr = tempStr.substring(0, tempStr.length - 1);
    var firstPKCols = pkFields[0].substring(pkFields[0].lastIndexOf('__') + 2, pkFields[0].length);
    var whereCls = "";
    //fix for 17028103 starts
    //whereCls = fnHandleDefaultWhere(); 
    //if (whereCls != "" && whereCls.indexOf(firstPKCols) == -1) {
    //    strCriteria = '<TABLE ID="' + summaryDaraScrType + '">' + pkFields[0].substring(pkFields[0].lastIndexOf('__') + 2, pkFields[0].length) + ':*' + "~" + whereCls + '~' + tempStr + '</TABLE>';
    //} else {
        strCriteria = '<TABLE ID="' + summaryDaraScrType + '">' + whereCls +'~'+ tempStr + '</TABLE>';
    //}
    //fix for 17028103 ends

    //Added By Saidul for default where clause; NEOPHASE2
    //var defaultWhere = defaultWhereClause;
    if (whereCls != "" && strCriteria.indexOf(whereCls) == -1) {
        var strCriteriaBefore = strCriteria.substring(0, strCriteria.indexOf("</TABLE>"));
        var strCriteriaAfter = strCriteria.substring(strCriteria.indexOf("</TABLE>"), strCriteria.length);
        strCriteria = strCriteriaBefore + "~" + whereCls + strCriteriaAfter;

    }

    //Added By Saidul for default where clause; NEOPHASE2
    debugs("Exiting method getCriteriaList . Built criteria :\n" + strCriteria, "P");
    return strCriteria;
}

/*
 * Return the criteria of advanced tab
 */
 
function gGetAdvancedCriteria() {	 
//REDWOOD_CHANGES
    var strCriteria = "";
    strCriteria += '<SUMTABLE>';
    strCriteria += summaryDaraScrType;
    strCriteria += '</SUMTABLE>';
    strCriteria += '<WHERE><![CDATA[';
    if (defaultWhereClause != "") {
        var advDefWhrClause = fnDefaulWhereForAdvance(summaryDaraScrType);
        strCriteria += advDefWhrClause;
    }
    if (defaultWhereClause != "" && whereClause_adv != "") {
        strCriteria += " AND ";
    }
    var advFinal = "";
    if(whereClause_adv != ""){
        var arr = whereClause_adv.split("~");
        var len = arr.length;
        for(i=0;i<len;i++){
        arr[i] = arr[i].trim();
        if(arr[i] != ''){
            if(arr[i] != "AND" && arr[i] !="OR" ){
                arr[i] = summaryDaraScrType+"."+arr[i];
            }
            advFinal += arr[i]+"~ ";
        }
        }
    }

    strCriteria += advFinal;
    strCriteria += ']]></WHERE>';
    strCriteria += '<ORDERBY>';
    strCriteria += orderByClause_adv;
    strCriteria += '</ORDERBY>';
    strCriteria += '<ADVVALUES><![CDATA[';
    strCriteria += advValueClause;
    strCriteria += ']]></ADVVALUES>';
    strCriteria += '<ADOPT><![CDATA[';
    strCriteria += advOperationClause;
    strCriteria += ']]></ADOPT>';
    strCriteria += '<ORDEBYOPT><![CDATA[';
    strCriteria += advOrderOptClause;
    strCriteria += ']]></ORDEBYOPT>';

    return strCriteria;
}

function gGetAdvancedCriteria_old() {	   
//REDWOOD_CHANGES
   //FOR ADVANCED CHANGES 
    var i = 0;    
    var valueofVaricable = "";
    var queryValue = "";
    var operationValue = "";
    var rowCount = document.getElementById("idadvQuryTable").tBodies[0].rows.length; 
    for(i=0; i<rowCount; i++) { 
        queryValue = queryValue + " " + getInnerText(document.getElementById("idadvQuryTable").tBodies[0].rows[i].cells[1].children[0]) + "~ "; //static header change
        operationValue = operationValue + " " + getInnerText(document.getElementById("idadvQuryTable").tBodies[0].rows[i].cells[2].children[0]) + "~ ";  //static header change       
        valueofVaricable =  valueofVaricable + getInnerText(document.getElementById("idadvQuryTable").tBodies[0].rows[i].cells[3].children[0]) + "~"; //static header change
    }
   
    var orderColValue = "";
    var orderOperation = "";
    var rowCount2 = document.getElementById("idadvOrderTable").tBodies[0].rows.length; 
        for(i=0; i<rowCount2; i++) { 
            orderColValue = orderColValue + " " + getInnerText(document.getElementById("idadvOrderTable").tBodies[0].rows[i].cells[1].children[0]) + "~"; /* Fix for 16039635 */ //static header change
            orderOperation = orderOperation + " " + getInnerText(document.getElementById("idadvOrderTable").tBodies[0].rows[i].cells[2].children[0]) + "~";    /* Fix for 16039635 */    //static header change
        }
   
    var strCriteria = "";
    strCriteria += '<SUMTABLE>';
    strCriteria += summaryDaraScrType;
    strCriteria += '</SUMTABLE>';
    strCriteria += '<WHERE><![CDATA[';
    if (defaultWhereClause != "") {
        var advDefWhrClause = fnDefaulWhereForAdvance(summaryDaraScrType);
        strCriteria += advDefWhrClause;
    }
    if (defaultWhereClause != "" && queryValue != "") {
        strCriteria += "  AND  ";
    }

 //   strCriteria += gEncodeQuery(document.getElementById("idTAQuery").value);
    strCriteria += queryValue;
    strCriteria += ']]></WHERE>';
    strCriteria += '<ORDERBY>';
 //   strCriteria += document.getElementById("idTAOrderBy").value;
    strCriteria += orderColValue;
    strCriteria += '</ORDERBY>';
    strCriteria += '<ADVVALUES><![CDATA[';
    strCriteria += valueofVaricable;
    strCriteria += ']]></ADVVALUES>';
    strCriteria += '<ADOPT><![CDATA[';
    strCriteria += operationValue;
    strCriteria += ']]></ADOPT>';
    strCriteria += '<ORDEBYOPT><![CDATA[';
    strCriteria += orderOperation;
    strCriteria += ']]></ORDEBYOPT>';
   
    return strCriteria;
}

/**
 * Function To build Transaction XML
 * This xml is sent as a request xml to the BPEL initiate Process.
 **/
function getTDD() {
    var txnXML = '<?xml version="1.0"?>';
    var txnStartIndex = 0;
    var txnClosingIndex = 0;
    var xmlns = "http://neo.iflex.com";
    var xsi = "http://www.w3.org/2001/XMLSchema-instance";
    var schemaLocation = "http://neo.iflex.com";
    /*
    try {
        var txnXMLDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e) {
        var txnXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    txnXMLDOM.async = false;
    txnXMLDOM.resolveExternals = true;
	*/
    var txnXMLDOM = loadXMLDoc(txnXML);
    if (txnXmlDOM == null) {
        //Create the Transaction XML DOM.
        //txnXMLDOM.loadXML(txnXML);
        txnXMLDOM = loadXMLDoc("<transaction/>");
        var transactionNode = selectSingleNode(txnXMLDOM, "//transaction");
        transactionNode.setAttribute("taskId", taskId);
        var txnidentificationNode = txnXMLDOM.createElement("txnIdentification");
        transactionNode.appendChild(txnidentificationNode);
        var txnidnode = txnXMLDOM.createElement("txnId");
        txnidentificationNode.appendChild(txnidnode);
        var processnamenode = txnXMLDOM.createElement("processName");
        //processnamenode.text = gProcessName;
        setNodeText(processnamenode, gProcessName);
        txnidentificationNode.appendChild(processnamenode);
        var branchcodennode = txnXMLDOM.createElement("branchCode");
        //branchcodennode.text = mainWin.CurrentBranch;
        setNodeText(branchcodennode, mainWin.CurrentBranch);
        txnidentificationNode.appendChild(branchcodennode);
        var currentusernode = txnXMLDOM.createElement("currentUser");
        //currentusernode.text = mainWin.UserId;
        setNodeText(currentusernode, mainWin.UserId);
        txnidentificationNode.appendChild(currentusernode);
        var txncommentnode = txnXMLDOM.createElement("txnComment");
        txnidentificationNode.appendChild(txncommentnode);
        var uixmlnode = txnXMLDOM.createElement("uiXml");
        txnidentificationNode.appendChild(uixmlnode);
        var stagenode = txnXMLDOM.createElement("stage");
        var selectValue = document.getElementById("WORKLIST_OPTION");
        if (selectValue.selectedIndex != -1) {
            var stage = selectValue.options[selectValue.selectedIndex].value;
            //stagenode.text = stage;
            setNodeText(stagenode, stage);
        }
        txnidentificationNode.appendChild(stagenode);
        var operationnode = txnXMLDOM.createElement("operation");
        //operationnode.text = "initiate";
        setNodeText(operationnode, "initiate");
        txnidentificationNode.appendChild(operationnode);
        var transactiondatanode = txnXMLDOM.createElement("transactionData");
        transactionNode.appendChild(transactiondatanode);
        var moduledatanode = txnXMLDOM.createElement("moduleData");
        var moduledatacode = getCloneDocElement(dbDataDOM.documentElement);
        moduledatanode.appendChild(moduledatacode);
        transactiondatanode.appendChild(moduledatanode);
        var additionalfldnode = txnXMLDOM.createElement("additionalFields");
        transactionNode.appendChild(additionalfldnode);
        var charfieldnode = txnXMLDOM.createElement("charField");
        additionalfldnode.appendChild(charfieldnode);
        var numericFldnode = txnXMLDOM.createElement("numericField");
        numericFldnode.setAttribute("additional_field_name", "=String");
        var numericFldcode = txnXMLDOM.createCDATASection("3.1415926535897932384626433832795");
        numericFldnode.appendChild(numericFldcode);
        additionalfldnode.appendChild(numericFldnode);
        var datefieldnode = txnXMLDOM.createElement("dateField");
        datefieldnode.setAttribute("additional_field_name", "=String");
        var datefieldcode = txnXMLDOM.createCDATASection("1967-08-13");
        datefieldnode.appendChild(datefieldcode);
        additionalfldnode.appendChild(datefieldnode);
        var genericfldnode = txnXMLDOM.createElement("genericField");
        genericfldnode.setAttribute("additional_field_name", "=String");
        additionalfldnode.appendChild(genericfldnode);
        var documentsnode = txnXMLDOM.createElement("documents");
        transactionNode.appendChild(documentsnode);
        var documentnode = txnXMLDOM.createElement("document");
        documentsnode.appendChild(documentnode);
        var docrefnode = txnXMLDOM.createElement("docRef");
        documentnode.appendChild(docrefnode);
        var doctypenode = txnXMLDOM.createElement("docType");
        documentnode.appendChild(doctypenode);
        var docurlnode = txnXMLDOM.createElement("docUrl");
        documentnode.appendChild(docurlnode);
        var docoperationnode = txnXMLDOM.createElement("docOperation");
        documentnode.appendChild(docoperationnode);
        var docremarksnode = txnXMLDOM.createElement("docRemarks");
        documentnode.appendChild(docremarksnode);
        var exceptionsnode = txnXMLDOM.createElement("exceptions");
        transactionNode.appendChild(exceptionsnode);
        var exceptionnode = txnXMLDOM.createElement("exception");
        exceptionsnode.appendChild(exceptionnode);
        var exceptioncodenode = txnXMLDOM.createElement("exceptionCode");
        exceptionnode.appendChild(exceptioncodenode);
        var exceptiontypenode = txnXMLDOM.createElement("exceptionType");
        exceptionnode.appendChild(exceptiontypenode);
        var exceptiondescnode = txnXMLDOM.createElement("exceptionDescription");
        exceptionnode.appendChild(exceptiondescnode);
        var taskAssignmentnode = txnXMLDOM.createElement("taskAssignment");
        transactionNode.appendChild(taskAssignmentnode);
        var assignmentrulenode = txnXMLDOM.createElement("assignmentRule");
        taskAssignmentnode.appendChild(assignmentrulenode);
        var srcsystemnode = txnXMLDOM.createElement("sourceSystem");
        taskAssignmentnode.appendChild(srcsystemnode);
        var assigneesnode = txnXMLDOM.createElement("assignees");
        taskAssignmentnode.appendChild(assigneesnode);
        var assigneeIdnode = txnXMLDOM.createElement("assigneeId");
        assigneesnode.appendChild(assigneeIdnode);
        var assigneenamenode = txnXMLDOM.createElement("assigneeName");
        assigneesnode.appendChild(assigneenamenode);
        var assigneetypenode = txnXMLDOM.createElement("assigneeType");
        assigneesnode.appendChild(assigneetypenode);
        var flowctrlrulenode = txnXMLDOM.createElement("flowControlRule");
        transactionNode.appendChild(flowctrlrulenode);
        var rulenamenode = txnXMLDOM.createElement("ruleName");
        flowctrlrulenode.appendChild(rulenamenode);
        var decisionnode = txnXMLDOM.createElement("decision");
        flowctrlrulenode.appendChild(decisionnode);
        transactionNode.setAttribute("xmlns");
        transactionNode.setAttribute("status", "");
    } else {
        var childNode = selectSingleNode(txnXmlDOM, "//neo:moduleData").childNodes[0];
        selectSingleNode(txnXmlDOM, "//neo:moduleData").removeChild(childNode);
        selectSingleNode(txnXmlDOM, "//neo:moduleData").appendChild(getCloneDocElement(dbDataDOM.documentElement));
        txnXML = getXMLString(selectSingleNode(txnXmlDOM, "//Payload"));
        txnXML = txnXML.substring(txnXML.indexOf('>') + 1, txnXML.lastIndexOf('<'));
        txnXML = "<?xml version='1.0'?><transaction xmlns='http://neo.iflex.com' taskId='" + taskId + "'>" + txnXML + "</transaction>";
        //txnXMLDOM.loadXML(txnXML);
        txnXMLDOM = loadXMLDoc(txnXML);
        setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[7], gOperation);
        var selectValue = document.getElementById("WORKLIST_OPTION");
        if (selectValue.selectedIndex != -1) {
            var stage = selectValue.options[selectValue.selectedIndex].value;
            if (gAction != "DOEVALUATION" & gOperation == '') {
                setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[6], stage);
            } else 
                setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[6], '');
        }
        setNodeText(txnXMLDOM.documentElement.childNodes[0].childNodes[3], mainWin.UserId);
    }

    return txnXMLDOM;

}

function buildUBSXml() {
    var ubsXML = '<?xml version="1.0"?><FCUBS_REQ_ENV/>';
    var ubsStartIndex = 0;
    var ubsClosingIndex = 0;
    var xmlns = "";
    /*
    try {
        var ubsXMLDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e) {
        var ubsXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    ubsXMLDOM.async = false;
    ubsXMLDOM.resolveExternals = true;
	*/
    var ubsXMLDOM = loadXMLDoc(ubsXML);
    if (ubsXMLDOM != null) {
        /*ubsXMLDOM.loadXML(ubsXML);
        ubsXMLDOM.loadXML("<FCUBS_REQ_ENV/>");*/
        //ubsXMLDOM = loadXMLDoc("<FCUBS_REQ_ENV/>");
        var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
        var headerNode = ubsXMLDOM.createElement("FCUBS_HEADER");
        ubsnode.appendChild(headerNode);
        var sourceNode = ubsXMLDOM.createElement("SOURCE");
        headerNode.appendChild(sourceNode);
        var ubscompNode = ubsXMLDOM.createElement("UBSCOMP");
        headerNode.appendChild(ubscompNode);
        var userIdnode = ubsXMLDOM.createElement("USERID");
        headerNode.appendChild(userIdnode);
        var branchNode = ubsXMLDOM.createElement("BRANCH");
        headerNode.appendChild(branchNode);
        var serviceNode = ubsXMLDOM.createElement("SERVICE");
        headerNode.appendChild(serviceNode);
        var opnode = ubsXMLDOM.createElement("OPERATION");
        headerNode.appendChild(opnode);
        var multitripNode = ubsXMLDOM.createElement("MULTITRIPID");
        headerNode.appendChild(multitripNode);
        var funcIdnode = ubsXMLDOM.createElement("FUNCTIONID");
        headerNode.appendChild(funcIdnode);
        var actionNode = ubsXMLDOM.createElement("ACTION");
        headerNode.appendChild(actionNode);
        var msgstatusNode = ubsXMLDOM.createElement("MSGSTAT");
        headerNode.appendChild(msgstatusNode);
        var moduleidNode = ubsXMLDOM.createElement("MODULEID");
        headerNode.appendChild(moduleidNode);
        //FCUBS10.3_WebBranch changes for validation layer starts
        var messageidNode = ubsXMLDOM.createElement("MSGID");
        headerNode.appendChild(messageidNode);
        var debugNode = ubsXMLDOM.createElement("DEBUG_MODE");
        headerNode.appendChild(debugNode);     
        var entityNode = ubsXMLDOM.createElement("ENTITY");
        headerNode.appendChild(entityNode);
        //var sessionNode = ubsXMLDOM.createElement("APP_SESSIONID");
        //headerNode.appendChild(sessionNode);
        
        var pkVals = "";
        for(var i=0; i < pkFields.length; ++i) {
            if(document.getElementById(pkFields[i])){
             //FCUBS11.3-IMPSUP-Bug 14070780_Retro - UNLOCK OF ANY RECORD IN GLDLINE Changes Starts
               if(document.getElementById(pkFields[i]).type =="radio"){
                  var radioLength = document.getElementsByName(document.getElementById(pkFields[i]).name).length;
                  for(var j=0;j<radioLength;j++){
                    if(document.getElementsByName(document.getElementById(pkFields[i]).name)[j].checked == true){
                       pkVals = pkVals + "~"+document.getElementsByName(document.getElementById(pkFields[i]).name)[j].value;
                      continue;
                    }
                  }
               } else{
                //REDWOOD_CHANGES
                 var formatter = document.getElementById(pkFields[i]).getAttribute('day-formatter');
                 var converterType = document.getElementById(pkFields[i]).getAttribute('converter');
                if ((formatter && formatter.includes('dayFormatter')) || 
                    (converterType && (converterType.includes("numberConverter") || converterType.includes("amountConverter")))) {	
                //REDWOOD_CHANGES
                pkVals = pkVals + "~" + document.getElementById(pkFields[i]).value;
               //REDWOOD_CHANGES
                } else {
                    pkVals = pkVals + "~" +document.getElementById(pkFields[i]).rawValue || document.getElementById(pkFields[i]).value;
                }  
               //REDWOOD_CHANGES
            }
            //FCUBS11.3-IMPSUP-Bug 14070780_Retro - UNLOCK OF ANY RECORD IN GLDLINE Changes Ends
            }
        }
        if(pkVals != "") {
            pkVals = pkVals.substring(1);
        }
	    //9NT1606_12_4_RETRO_12_2_26230406 Starts
		pkVals = replaceAllChar(pkVals,"/","_SLH_"); 
		pkVals = replaceAllChar(pkVals,"+","_PLS_"); 
		pkVals = replaceAllChar(pkVals,"(","_OCB_"); 
		pkVals = replaceAllChar(pkVals,")","_CCB_");
		pkVals = replaceAllChar(pkVals,"-","_HYB_");
		//9NT1606_12_4_RETRO_12_2_26230406 Ends
		pkVals = replaceAllChar(pkVals,",","_CMA_"); //Fix for 30791337
        var pkValsNode = ubsXMLDOM.createElement("PKVALS");
        headerNode.appendChild(pkValsNode);
        setNodeText(pkValsNode, pkVals);
        /*Changes for PKFIELDS start*/
             var pkFieldsReq = "";
            for (var i = 0; i < pkFields.length; ++i) {
                if (document.getElementById(pkFields[i])) {
                    //pkVals = pkVals + "~" + document.getElementById(pkFields[i]).value;
                    pkFieldsReq = pkFieldsReq +"~"+ pkFields[i];
                }
            }
            if (pkFieldsReq != "") {
                pkFieldsReq = pkFieldsReq.substring(1);
            }
            var pkFldNode = ubsXMLDOM.createElement("PKFIELDS");
            headerNode.appendChild(pkFldNode);
            setNodeText(pkFldNode, pkFieldsReq);
    /*Changes for PKFIELDS end*/
        if (typeof(duplicateTaskcheckReq) != "undefined" && duplicateTaskcheckReq == "Y" && typeof(duplicateFieldList) != "undefined" && duplicateFieldList != "") //for CTCB 5 enhancement
        // if(gAction=='DUPLICATETASKCHECK~NEW'||gAction=='DUPLICATETASKCHECK~BPELVALIDATE'|| gAction=='DUPLICATETASKCHECK')
            if (gAction.match('DUPLICATETASKCHECK')) {
                var addlNode = ubsXMLDOM.createElement("ADDL");
            headerNode.appendChild(addlNode);
                var paramNode = ubsXMLDOM.createElement("PARAM");
            addlNode.appendChild(paramNode);
                var nameNode = ubsXMLDOM.createElement("NAME");
            paramNode.appendChild(nameNode);
                var valueNode = ubsXMLDOM.createElement("VALUE");
            paramNode.appendChild(valueNode);
                setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[11].childNodes[0].childNodes[0], 'DUPLICATETASKCHECK');
            var duplicateFieldArray = duplicateFieldList.split("~");
            // ctcb lot1 infra change starts
            //  var valueList = "";
            duplicateValueList = "";
                for (var i in duplicateFieldArray) {
                    if (duplicateFieldArray[i] != "") {
                    var tempfieldlist = duplicateFieldArray[i].split("__"); //ctcb change for duplicatetask        
                        if (typeof(tempfieldlist[2]) != "undefined" && typeof(tempfieldlist[3]) != "undefined") {
                        var MEValueList = "";
                            for (j = 0; j < selectNodes(dbDataDOM, "//" + tempfieldlist[0] + "[" + tempfieldlist[2] + "='" + tempfieldlist[3] + "']/" + tempfieldlist[1]).length; j++) {
                                MEValueList = MEValueList + "~" + getNodeText(selectNodes(dbDataDOM, "//" + tempfieldlist[0] + "[" + tempfieldlist[2] + "='" + tempfieldlist[3] + "']/" + tempfieldlist[1])[j]);
                        }
                        MEValueList = MEValueList.split("~").sort();
                            for (k in MEValueList) {
                            duplicateValueList = duplicateValueList + MEValueList[k] + "~";
                        }
                        } else {
                            duplicateValueList = duplicateValueList + getNodeText(selectSingleNode(dbDataDOM, "//" + tempfieldlist[0] + "/" + tempfieldlist[1])) + '~';
                    } //ctcb change for duplicatetask
                }
            }
                setNodeText(selectSingleNode(ubsXMLDOM, "//ADDL/PARAM[NAME='DUPLICATETASKCHECK']/VALUE"), duplicateValueList + "!" + getNodeText(selectSingleNode(txnXmlDOM, "//fcubs:txnId"))); // ctcb lot1 infra change ends
            /*if (ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text!= "")
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text= ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text+"~"+document.getElementById(duplicateFieldArray[i]).value;
        else
        ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text= document.getElementById(duplicateFieldArray[i]).value;
        } */

        }
        if (functionId == 'CSDRASGN') if (gAction == 'BPELREASSIGN') {
            var addlNode = ubsXMLDOM.createElement("ADDL");
            headerNode.appendChild(addlNode);
            var paramNode = ubsXMLDOM.createElement("PARAM");
            addlNode.appendChild(paramNode);
            var nameNode = ubsXMLDOM.createElement("NAME");
            paramNode.appendChild(nameNode);
            var valueNode = ubsXMLDOM.createElement("VALUE");
            paramNode.appendChild(valueNode);
            setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[11].childNodes[0].childNodes[0], 'BPELREASSIGN');
            valueList = taskId + '~' + rUserId + '~' + status;
            setNodeText(selectSingleNode(ubsXMLDOM, "//ADDL/PARAM[NAME='BPELREASSIGN']/VALUE"), valueList);
            /*if (ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text!= "")
        	ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text= ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text+"~"+document.getElementById(duplicateFieldArray[i]).value;
        	else
        	ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(11).childNodes.item(0).childNodes.item(1).text= document.getElementById(duplicateFieldArray[i]).value;
        	} */
        }
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[8], gAction);
        //ctcb change ends
        var bodyNode = ubsXMLDOM.createElement("FCUBS_BODY");
        ubsnode.appendChild(bodyNode);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[0], "FLEXCUBE");
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[2], mainWin.UserId);
        //ubsXMLDOM.documentElement.childNodes.item(0).childNodes.item(3).text = dlgArg.mainWin.frames["Global"].CurrentBranch;
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[3], g_txnBranch);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[1], "FCUBS");
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[7], functionId);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[8], gAction);
	    var module = "";
	    if(typeof(moduleid) == 'undefined')
	        module = functionId.substring(0, 2);
	    else
	    	module = moduleid;
        if (mainWin.applicationName == 'FCIS') {
            module = mainWin.CurrentModule;
        }
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[10], module);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[12],mainWin.DebugFlg);//Debug revert
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[13],mainWin.entity);
        var fldStartIndex1 = msgxml.indexOf("<FLD");
        var fldEndIndex1 = msgxml.indexOf("</FLD>");

        msgxml_fld = msgxml.substring(fldStartIndex1, fldEndIndex1);
        msgxml_fld = msgxml_fld + "</FLD>";
        if (gAction != "EXECUTEQUERY" && gAction != "AUTHQUERY") {
            var rootNode = selectSingleNode(dbDataDOM, "/");
            var childNodes = rootNode.childNodes;
            var currNode = childNodes[0];
            var type = currNode.getAttribute("Type");
            dbStrRecords = "";
            /*
            try {
                dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            dbFCJDOM.async = false;
            dbFCJDOM.resolveExternals = true;
            dbFCJDOM.loadXML(msgxml_fld);
			*/
            dbFCJDOM = loadXMLDoc(msgxml_fld);
            /*****************************************************************/
            /* Added for isControl 16/09/08 */
            var tmp_dbFCJDOM = selectNodes(dbFCJDOM, '//FLD/FN[@ISCONTROL="1"]');
            //selectNodes(dbFCJDOM, '//FLD/FN[@ISCONTROL="1"]').removeAll();
            var removeNode = selectNodes(dbFCJDOM, '//FLD/FN[@ISCONTROL="1"]');
            for(var i=0; i < removeNode.length; i++){
                removeNode[i].parentNode.removeChild(removeNode[i]);
            }
            var isControlNodes = "";
            for (var i = 0; i < tmp_dbFCJDOM.length; i++) {
                isControlNodes = isControlNodes + getXMLString(tmp_dbFCJDOM[i]);
            }
            var isControlFields = "";
            if (tmp_dbFCJDOM.length > 1) {
                for (var i = 0; i < tmp_dbFCJDOM.length; i++) {
                    isControlFields = isControlFields + isControlNodes.substring(isControlNodes.indexOf(">") + 1, isControlNodes.indexOf("</FN>"));
                    isControlNodes = isControlNodes.substring(isControlNodes.indexOf("</FN><FN") + 5, isControlNodes.length);
                }
            } else if (tmp_dbFCJDOM.length == 1) {
                isControlFields = isControlNodes.substring(isControlNodes.indexOf(">") + 1, isControlNodes.indexOf("</FN>"));
            }
            if (tmp_dbFCJDOM.length != 0) {
                var isControlFieldsArr = isControlFields.split("~");
                for (var i = 0; i < isControlFieldsArr.length; i++) {
                   // isControlFieldsArr[isControlFieldsArr[i]] = document.getElementById(isControlFieldsArr[i]).value;
				   isControlFieldsArr[isControlFieldsArr[i]] = document.getElementsByName(isControlFieldsArr[i])[0].value;//fix for 19438162  change in the way to access the fields for non ext screen 
                }
                isControlFieldsArrValues = isControlFieldsArr;
            }
            /* Added for isControl ends 16/09/08 */
            /*****************************************************************/
            processNode(currNode);
            /*
            try {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            dbStrRecordsDOM.loadXML(dbStrRecords);
			*/
            var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM.documentElement));
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
        } else if (gAction == "EXECUTEQUERY") { //||  gAction == "AUTHQUERY"  ){
            dbStrRecords = "";
            /*
            try {
                dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }

            dbFCJDOM.async = false;
            dbFCJDOM.resolveExternals = true;
            dbFCJDOM.loadXML(msgxml_fld);
			*/
            dbFCJDOM = loadXMLDoc(msgxml_fld);
            fnPreparelist();
            /*
            try {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }

            dbStrRecordsDOM.loadXML(dbStrRecords);
			*/
            var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM.documentElement));
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
        } else if (gAction == "AUTHQUERY") {
            dbStrRecords = "";
            /*
            try {
                dbFCJDOM2 = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                dbFCJDOM2 = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            dbFCJDOM2.async = false;
            dbFCJDOM2.resolveExternals = true;
			*/
            var fnStartIndex1 = msgxml.indexOf("<FN");
            var fnEndIndex1 = msgxml.indexOf("</FN>");

            msgxml_fn = '<FLD>' + msgxml.substring(fnStartIndex1, fnEndIndex1);
            msgxml_fn += '</FN>';
            msgxml_fn += '</FLD>';
            //dbFCJDOM2.loadXML(msgxml_fn);
            dbFCJDOM2 = loadXMLDoc(msgxml_fn);
            //var l_Form = document.forms[0];
            var l_Maker_Id = "MAKER_ID";
            var l_Maker_Dt_St = "MAKER_DT_STAMP";
            if (document.getElementsByName("MAKERID").length > 0) 
                l_Maker_Id = "MAKERID";

            if (document.getElementsByName("MAKERSTAMP").length > 0) 
                l_Maker_Dt_St = "MAKERSTAMP";

            var reclog = '<FN ISQUERY="0" PARENT="' + dbStrRootTableName + '"  RELATION="" TYPE="STTB_RECORD_LOG">KEY_ID~MOD_NO~' + l_Maker_Id + '~RECORD_STAT~' + l_Maker_Dt_St + '</FN>';
            var fldlog = '<FN ISQUERY="0" PARENT="STTB_RECORD_LOG" RELATION="STTB_RECORD_LOG.MOD_NO = STTB_FIELD_LOG.MOD_NO" TYPE="STTB_FIELD_LOG">KEY_ID~MOD_NO~FIELD_NAME~OLD_VALUE~NEW_VALUE</FN>';
            /*
			try {
                reclogDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                reclogDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            reclogDOM.async = false;
            reclogDOM.resolveExternals = true;
            reclogDOM.loadXML(reclog);
			*/
            reclogDOM = loadXMLDoc(reclog);
            /*
            try {
                fldlogDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                fldlogDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            fldlogDOM.async = false;
            fldlogDOM.resolveExternals = true;
            fldlogDOM.loadXML(fldlog);
			*/
            fldlogDOM = loadXMLDoc(fldlog);
            dbFCJDOM2.documentElement.childNodes[0].parentNode.appendChild(getCloneDocElement(reclogDOM.documentElement));
            dbFCJDOM2.documentElement.childNodes[0].parentNode.appendChild(getCloneDocElement(fldlogDOM.documentElement));
            //POC ENDS
            /*
            try {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
			*/
            fnPreparelist();
            /*
            try {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            dbStrRecordsDOM.loadXML(dbStrRecords);
			*/
            var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM2.documentElement));
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
        } else if (gAction == "AUTH") {
            var rootNode = selectSingleNode(dbDataDOM, "/");
            var childNodes = rootNode.childNodes;
            var currNode = childNodes[0];
            var type = currNode.getAttribute("Type");

            dbStrRecords = "";
            /*
            try {
                dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            dbFCJDOM.async = false;
            dbFCJDOM.resolveExternals = true;
            dbFCJDOM.loadXML(msgxml_fld);
			*/
            dbFCJDOM = loadXMLDoc(msgxml_fld);
            processNode(currNode);
            /*
            try {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e) {
                var dbStrRecordsDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            dbStrRecordsDOM.loadXML(dbStrRecords);
			*/
            var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM.documentElement));
            ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
        }

        var attachments = '';
        var tempName;
        var tempName_var = "";
        if (gAction != "EXECUTEQUERY" && gAction != "AUTHQUERY") {
            for (tempName_var in fileAttachments) {
                if (tempName_var != "") {
                    var attachsNode = ubsXMLDOM.createElement("ATTACHMENTS");
                    bodyNode.appendChild(attachsNode);
                }
            }
            for (tempName in fileAttachments) {
                attachments = attachments + fileAttachments[tempName];
                if (attachments != '') {
                    /*
                    try {
                        var fileattachDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
                    } catch(e) {
                        var fileattachDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
                    }
                    fileattachDOM.loadXML(attachments);
					*/
                    var fileattachDOM = loadXMLDoc(attachments);
                    attachments = "";

                    attachsNode.appendChild(getCloneDocElement(fileattachDOM.documentElement));
                }
            }
        }
        var addlNode = ubsXMLDOM.createElement("MISC");
        bodyNode.appendChild(addlNode);
        var remarksNode = ubsXMLDOM.createElement("REMARKS");
        addlNode.appendChild(remarksNode);
    }
    return ubsXMLDOM;
}

function fnPreparelist() {
    /*
    try {
        var fcjQryRequestDOM = new ActiveXObject("MSXML2.DOMDocument.6.0");
    } catch(e) {
        var fcjQryRequestDOM = new ActiveXObject("MSXML2.DOMDocument.4.0");
    }
	*/
    var list = "";
    var tableNames = new Array();
    var tableColumnValues = new Array();

    var objNode, objAttr, objFrag;
    var objText;
    var qryCriteria;
    var fieldFoundForTable = false;
    tableNames = dataSrcLocationArray;
    /*
    try {
        dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e) {
        dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    */
    var fldStartIndex1 = msgxml.indexOf("<FLD");
    var fldEndIndex1 = msgxml.indexOf("</FLD>");

    msgxml_fld1 = msgxml.substring(fldStartIndex1, fldEndIndex1);
    msgxml_fld1 = msgxml_fld1 + "</FLD>";
    //dbFCJDOM.loadXML(msgxml_fld1);
    dbFCJDOM = loadXMLDoc(msgxml_fld1);
    var fnNodeList1 = selectNodes(dbFCJDOM, "//FLD/FN[@PARENT = '']");
    var currFNNode = null;
    var currFN = "";
    var fnTSL = "";
    var fnArray = null;
    var currField = null;
    var fieldName = "";
    var defaultPK = false;
    var colName = "";

    //Known limitation doesn't support detail blocks.
    list += "<FV><![CDATA[";
    for (var nodeIndex = 0; nodeIndex < fnNodeList1.length; nodeIndex++) {
        currFNNode = fnNodeList1[nodeIndex];
        currFN = currFNNode.getAttribute("TYPE");
        fnTSL = getNodeText(currFNNode);
        fnArray = fnTSL.split("~");
        for (var colIndex = 0; colIndex < fnArray.length; colIndex++) {
            colName = fnArray[colIndex];
            if (mainWin.applicationName == "FCJ") {
                if (fnIsAuditBlockColumn(colName)) {
                    continue;
                }
            }
            //Sabir FGL Changes 12-Aug-08
            else if (mainWin.applicationName == "FGL") {
                if (fnIsAuditBlockColumn(colName)) {
                    continue;
                }
            }

            fieldName = currFN + "__" + colName;
            currField = document.getElementById(fieldName);
            if (currField) {
                qryCriteria = getFieldData(currField);
				//Redwood_36226115 Starts
				 var txtObjHTML = getOuterHTML(currField);
				if (txtObjHTML.indexOf("amountConverter") !=  - 1 || txtObjHTML.indexOf("numberConverter") !=  - 1){
				   var re = new RegExp(gDigitGroupingSymbol, "g");
					if (typeof qryCriteria == "string") {
						qryCriteria = qryCriteria.replace(re, "");
					}     
				}
				//Redwood_36226115 Ends
                qryCriteria = (qryCriteria == null || qryCriteria == '') ? '%': qryCriteria;
                if (qryCriteria == "%") {
                    qryCriteria = "";
                    list += qryCriteria + "~";
                    qryCriteria = "%";
                } else {
                    //FCIS code change
                    if (mainWin.applicationName == "FCIS") {
                        if (fnIsAuditBlockColumn(colName)) {
                            if (colName == "AUTH_STAT") {
                                if (qryCriteria == "Y") {
                                    list += "A" + "~";
                                } else if (qryCriteria == "N") {
                                    list += "U" + "~";
                                }
                            } else {
                                list += "~";
                            }
                        } else {
                            list += qryCriteria + "~";
                        }
                    } else { //FCJ
                        list += qryCriteria + "~";
                    }
                }
            } else {
                if (qryCriteria != "") {
                    qryCriteria = "%";
                    //Prakash@FCIS8.0 - ITR1 - SCF# - 24/09/2007 - Start
                    list += "~";
                    //Prakash@FCIS8.0 - ITR1 - SCF# - 24/09/2007 - End
                } else {
                    if (qryCriteria == "%") {
                        qryCriteria = "";
                        list += qryCriteria + "~";
                        qryCriteria = "%";
                    }
                }

            }
        }
    }

    list = list + "]]></FV>";
    qryCriteria = "";

    var type = dataSrcLocationArray[0];
    dbStrRecords = dbStrRecords + "<REC TYPE=\"" + type + "\"";
    if (dataSrcLocationArray[0] == type) {
        dbStrRecords = dbStrRecords + " RECID='1'";
    }
    dbStrRecords = dbStrRecords + ">";
    dbStrRecords = dbStrRecords + list;
    list = "";
    dbStrRecords = dbStrRecords + "</REC>";
    return dbStrRecords;
}

function buildRelaseLockXML() {
    var fldStartIndex = 0;
    var fldClosingIndex = 0;
    var fvStartIndex = 0;
    var msgStartTag;
    var fvStartTag;
    var recValue;
    var rootNode = selectSingleNode(dbDataDOM, "/");
    var childNodes = rootNode.childNodes;
    var currNode = childNodes[0];
    var type = currNode.getAttribute("Type");

    dbStrRecords = "";
    /*
    try {
        dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e) {
        dbFCJDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
	*/
    msgStartTag = "<MSG OP=" + '"' + gAction + '" ';
    msgStartTag += 'MSGTYPE="REQUEST" MSGSTATUS="" ';
    msgStartTag += 'AUTHORIZATION="Y" ';
    msgStartTag += 'TIMESTAMP="' + '" ';
    msgStartTag += 'USERID="' + mainWin.UserId + '" ';
    msgStartTag += 'FUNCTIONID="' + functionId + '" ';
    msgStartTag += 'BRANCH="' + mainWin.CurrentBranch + '">';
    fcjXML2 = '<FCJMSG SRC="' + mainWin.AppSource + '">';
    fcjXML2 += msgStartTag;

    fcjXML2 += msgxml;
    fcjXML2 += '</MSG></FCJMSG>';
    //dbFCJDOM.loadXML(fcjXML2);
    dbFCJDOM = loadXMLDoc(fcjXML2);
    var queryDataSources = selectNodes(dbFCJDOM, "//FN[@ISQUERY=1]");
    for (var i = 0; i < queryDataSources.length; i++)
        isQuery[queryDataSources[i].getAttribute("TYPE")] = 1;
    //queryDataSources.removeAll();
    for(var i=0; i < queryDataSources.length; i++){
        queryDataSources[i].parentNode.removeChild(queryDataSources[i]);
    }
    processNode(currNode);
    dbStrRecords = dbStrRecords + "</MSG>";
    var fcjXML = fcjXML2.replace("</MSG>", dbStrRecords);

    //added by sandeep m -Sept 09,2005 ---begins
    var attachments = '';
    var tempName;
    for (tempName in fileAttachments) {
        //alert('attaching file for column ' +tempName);
        attachments = attachments + fileAttachments[tempName];
    }
    if (attachments != '') {
        attachments = "<ATTACHMENTS>" + attachments + "</ATTACHMENTS>" + "</MSG>";
        fcjXML = fcjXML.replace("</MSG>", attachments);
    }
    //added by sandeep m -Sept 09,2005 ---ends
    //dbFCJDOM.loadXML(fcjXML);
    dbFCJDOM = loadXMLDoc(fcjXML);
    return dbFCJDOM;
}

/**
function buildSummaryUBSXml
This function will build the ubs xml for the summary wich will be send as part of the 
request while opening the detail screen from the summary screen
Author : Md. Saidul Anam
NEOPHASE2
*/
function buildSummaryUBSXml(recTYPE, recID) {
    var ubsXML = '<?xml version="1.0"?><FCUBS_REQ_ENV/>';
    var ubsXMLDOM = loadXMLDoc(ubsXML);
    if (ubsXMLDOM != null) {
        var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
        var headerNode = ubsXMLDOM.createElement("FCUBS_HEADER");
        ubsnode.appendChild(headerNode);
        var sourceNode = ubsXMLDOM.createElement("SOURCE");
        headerNode.appendChild(sourceNode);
        var ubscompNode = ubsXMLDOM.createElement("UBSCOMP");
        headerNode.appendChild(ubscompNode);
        var userIdnode = ubsXMLDOM.createElement("USERID");
        headerNode.appendChild(userIdnode);
        var branchNode = ubsXMLDOM.createElement("BRANCH");
        headerNode.appendChild(branchNode);
        var serviceNode = ubsXMLDOM.createElement("SERVICE");
        headerNode.appendChild(serviceNode);
        var opnode = ubsXMLDOM.createElement("OPERATION");
        headerNode.appendChild(opnode);
        var multitripNode = ubsXMLDOM.createElement("MULTITRIPID");
        headerNode.appendChild(multitripNode);
        var funcIdnode = ubsXMLDOM.createElement("FUNCTIONID");
        headerNode.appendChild(funcIdnode);
        var actionNode = ubsXMLDOM.createElement("ACTION");
        headerNode.appendChild(actionNode);
        var msgstatusNode = ubsXMLDOM.createElement("MSGSTAT");
        headerNode.appendChild(msgstatusNode);
        var moduleidNode = ubsXMLDOM.createElement("MODULEID");
        headerNode.appendChild(moduleidNode);
        //fix for 17001559 starts
        var debugModeNode = ubsXMLDOM.createElement("DEBUG_MODE");
        headerNode.appendChild(debugModeNode);
        var entityModeNode = ubsXMLDOM.createElement("ENTITY");
        headerNode.appendChild(entityModeNode);
        //var sessionNode = ubsXMLDOM.createElement("APP_SESSIONID");
        //headerNode.appendChild(sessionNode);
 		//fix for 17001559 ends 
        var bodyNode = ubsXMLDOM.createElement("FCUBS_BODY");
        ubsnode.appendChild(bodyNode);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[0], "FLEXCUBE");
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[2], mainWin.UserId);
        //if (typeof(sumTxnBranch) != "undefined" && sumTxnBranch != "") setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[3], sumTxnBranch);
        //else 
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[3], g_txnBranch);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[4], detailFuncId);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[5], "EXECUTEQUERY");
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[1], "FCUBS");
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[7], detailFuncId);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[8], "EXECUTEQUERY");
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[11],mainWin.DebugFlg);//fix for 17001559 
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[12],mainWin.entity);
        var module = functionId.substring(0, 2);
        if (mainWin.applicationName == 'FCIS') {
            module = mainWin.CurrentModule;
        }
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[10], module);
        var fldStartIndex = msgxml.indexOf("<FLD");
        var fldEndIndex = msgxml.lastIndexOf("</FLD>");

        msgxml_fld = msgxml.substring(fldStartIndex, fldEndIndex);
        msgxml_fld = msgxml_fld + "</FLD>";

        //Get the fn from the FN list for master table.
        var ParentFn = msgxml_fld.substring(msgxml_fld.indexOf("<FN"), msgxml_fld.indexOf("</FN"));
        var l_FN = ParentFn.substring(ParentFn.indexOf('>') + 1, ParentFn.length);

        var l_PK_DBC = new Array();
        for (var l_Cnt = 0; l_Cnt < pkFields.length; l_Cnt++) {
            var pkFieldName = pkFields[l_Cnt].substring(pkFields[l_Cnt].indexOf("__") + 2, pkFields[l_Cnt].length);
            l_PK_DBC[pkFieldName] = pkFieldName;
        }

        var l_FNArr = l_FN.split("~");
        var l_Result = "";
        for (var l_Idx = 0; l_Idx < l_FNArr.length; l_Idx++) {
            var l_FnTemp = l_FNArr[l_Idx];
            if (l_PK_DBC[l_FnTemp]) l_Result = l_Result + l_FnTemp;
            else l_Result = l_Result + "";
            if (l_Idx < l_FNArr.length - 1) l_Result = l_Result + "~";
        }
        ParentFn = l_Result;
        var pkFldValue = new Array();

        var dateStamp = " 00:00:00.0";
        if (recID.indexOf(dateStamp) != -1) {
            var re = new RegExp(dateStamp, "g");
            recID = recID.replace(re, "");
            //alert(recID);
        }
        if (recID.indexOf('~') == -1) {
            pkFldValue[0] = recID;
        } else {
            if (recID.indexOf("~") > 0) {
                pkFldValue = recID.split("~");
            }
        }
        if (pkFldValue.length > 0) {
            for (var pkIndex = 0; pkIndex < pkFldValue.length; pkIndex++) {
                var pkFldName = pkFields[pkIndex].substring(pkFields[pkIndex].indexOf("__") + 2, pkFields[pkIndex].length);
                if (ParentFn.indexOf(pkFldName) != -1) {
                    ParentFn = ParentFn.replace(pkFldName, pkFldValue[pkIndex]);
                }
            }

        }
        /*
		try {
            dbFCJDOM2 = new ActiveXObject("Msxml2.DOMDocument.6.0");
        } catch(e) {
            dbFCJDOM2 = new ActiveXObject("Msxml2.DOMDocument.4.0");
        }
        dbFCJDOM2.async = false;
        dbFCJDOM2.resolveExternals = true;
        dbFCJDOM2.loadXML(msgxml_fld);
		*/
        dbFCJDOM2 = loadXMLDoc(msgxml_fld);
        var strbfrXML = "";
        strbfrXML = strbfrXML + '<REC TYPE="' + recTYPE + '"';
        strbfrXML = strbfrXML + '>';
        strbfrXML = strbfrXML + '<FV><![CDATA[' + ParentFn;
        strbfrXML = strbfrXML + ']]></FV>';
        strbfrXML = strbfrXML + '</REC>';
        /*
        try {
            strbfrXMLDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
        } catch(e) {
            strbfrXMLDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
        }
        strbfrXMLDOM.async = false;
        strbfrXMLDOM.resolveExternals = true;
        strbfrXMLDOM.loadXML(strbfrXML);
		*/
        strbfrXMLDOM = loadXMLDoc(strbfrXML);
        ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM2.documentElement));
        ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(strbfrXMLDOM.documentElement));
    } //END IF FOR NULL CHECK.
    return ubsXMLDOM;
}

function fnHandleDefaultWhere() {
    var defWhere = defaultWhereClause;
    if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y"){
        if(typeof(multiBrnWhereClause)!= "undefined")
            defWhere =multiBrnWhereClause;
    }
    var newDefaultWhereClause = "";
    if (defWhere != "") {
        var defWhereArr = new Array();
        //there are more tilde seperated default bind variable.
        defWhereArr = defWhere.split('~');
        var l_DefWhrLen = defWhereArr.length;

        if (l_DefWhrLen == 0) l_DefWhrLen = 1;
        for (var l_index = 0; l_index < l_DefWhrLen; l_index++) {
            // Get each bind variable
            var currentBindvarPair = defWhereArr[l_index];
            if (currentBindvarPair.indexOf('mainWin.') != -1) {
                //The curent bind var contains a global parameter             
                var bindVar = currentBindvarPair.substring(0, currentBindvarPair.indexOf(':'));
                var fnEval = new Function(currentBindvarPair.substring(currentBindvarPair.indexOf(':') + 1, currentBindvarPair.length));  
                var bindVal = fnEval();
                newDefaultWhereClause = newDefaultWhereClause + bindVar + ':' + bindVal;
                if (l_index < l_DefWhrLen - 1) {
                    newDefaultWhereClause = newDefaultWhereClause + '~';
                }
            } else {
                //The curent bind var does not contains a global parameter 
                newDefaultWhereClause = newDefaultWhereClause + currentBindvarPair;
                if (l_index < l_DefWhrLen - 1) {
                    newDefaultWhereClause = newDefaultWhereClause + '~';
                }
            }
        }
    } //end of if != ""

    return newDefaultWhereClause;
} //end of function

function getFldDType(dbc) {
    var userLanguageCode = mainWin.LangCode;
    var xmlFile = "UIXML/" + userLanguageCode + "/" + detailFuncId + ".xml";
    //var xmlDoc = dlgArg.mainWin.loadXML(xmlFile);
    var xmlDoc = loadXMLFile(xmlFile);
    var fldNode = selectSingleNode(xmlDoc, "//FIELD[DBC = '" + dbc + "']");
    var Dtype = "";
    if (fldNode && selectSingleNode(fldNode, "DTYPE")) {
        Dtype = getNodeText(selectSingleNode(fldNode, "DTYPE"));
    }
    if (Dtype == 'VARCHAR' || Dtype == 'VARCHAR2' || Dtype == 'CHAR') {
        Dtype = 'STRING';
    } else if (Dtype == 'NUMBER' || Dtype == 'INTEGER' || Dtype == 'NUMERIC') {
        Dtype = 'INT';
    } else if (Dtype == 'DATE') {
        Dtype = 'DATE';
    } else {
        Dtype = 'STRING';
    }
}	 
//REDWOOD_CHANGES
function fnDefaulWhereForAdvance_new() {
    var defaultWhereAdv = fnHandleDefaultWhere();
    var defWhereAdvArr = new Array();
    var finalWhereClause = "";
    if(typeof(defaultWhereAdv)!='undefined' && defaultWhereAdv != '' ){
    defWhereAdvArr = defaultWhereAdv.split('~');
    var l_DefWhrLen = defWhereAdvArr.length;
    for (var len = 0; len < l_DefWhrLen; len++) {
        var currClause = defWhereAdvArr[len];
        if (currClause != "") {
            var dbc = currClause.split(">")[0];
            var value = currClause.split(">")[1];
            var dtype = getFldDType(dbc);
            if (dtype == "INT") {
                finalWhereClause = finalWhereClause + dbc + " = " + value;
            } else {
                finalWhereClause = finalWhereClause + dbc + " = '" + value + "'";
            }
            if (len < l_DefWhrLen - 1) finalWhereClause = finalWhereClause + "  AND ";
        }
    }
    }
    return finalWhereClause;
}		
//REDWOOD_CHANGES
function fnDefaulWhereForAdvance(advDBT) {
    var defaultWhereAdv = fnHandleDefaultWhere();
    var defWhereAdvArr = new Array();
    var finalWhereClause = "";
    if(typeof(defaultWhereAdv)!='undefined' && defaultWhereAdv != '' ){	//REDWOOD_CHANGES
    defWhereAdvArr = defaultWhereAdv.split('~');
    var l_DefWhrLen = defWhereAdvArr.length;
    for (var len = 0; len < l_DefWhrLen; len++) {
        var currClause = defWhereAdvArr[len];
        var dbc = currClause.split(":")[0];
        var value = currClause.split(":")[1];
        var dtype = getFldDType(dbc);
        if (dtype == "INT") {
            finalWhereClause = finalWhereClause + advDBT + "." + dbc + " =  " + value;
        } else {
            finalWhereClause = finalWhereClause + advDBT + "." + dbc + " =  '" + value + "'";
        }
        if (len < l_DefWhrLen - 1) finalWhereClause = finalWhereClause + "  AND ";
    } //REDWOOD_CHANGES
    }
    return finalWhereClause;
}

/** added to build the request xml **/
function fnBuildReqxml(service, operation, requesttype) {
    appendData(document.getElementById("TBLPage" + strCurrentTabID));
    var webDOM = buildUBSXml();
    var request_type = requesttype;
    setNodeText(webDOM.documentElement.childNodes[0].childNodes[4], service);
    setNodeText(webDOM.documentElement.childNodes[0].childNodes[5], operation);
    if (request_type == "F") {
        return (getXMLString(webDOM));
    } else if (request_type == "P") {
        var requestxml = fnBuildParReqxml(webDOM);
        return (requestxml);
    }
}

function fnBuildParReqxml(webDOM) {
    buttonrowIndex = getRowIndex();
    var eventobject = window.getEventSourceElement(event);
    var blockDBT = eventobject.parentNode.parentNode.parentNode.parentNode.id;
    var currNode = blockDBT.substring(4, blockDBT.length);
    var request_xml = getXMLString(webDOM);
    var request_header = request_xml.substring(request_xml.indexOf("<FCUBS_REQ_ENV>"), request_xml.indexOf("<FCUBS_BODY>"));
    var fieldnodes_string = request_xml.substring(request_xml.indexOf("<FLD>") + 5, request_xml.indexOf("</FLD>"));
    var fieldnodes_array = fieldnodes_string.split("</FN>");
    for (var i = 0; i < fieldnodes_array.length; i++) {
        if (fieldnodes_array[i].indexOf("TYPE=" + '"' + currNode) != -1) {
            break;
        }
    }
    var fieldnode = fieldnodes_array[i] + "</FN>";
    fieldnode = "<FCUBS_BODY><FLD>" + fieldnode.substring(fieldnode.indexOf("<FN"), fieldnode.length) + "</FLD>";
    var field_value_string = request_xml.substring(request_xml.indexOf("<REC"), request_xml.indexOf("<MISC>") - 6);
    var field_value_array = field_value_string.split("</FV>");
    var fv_array = new Array();
    var count = 0;
    for (var i = 0; i < field_value_array.length; i++) {
        if (field_value_array[i].indexOf("TYPE=" + '"' + currNode) != -1) {
            fv_array[count] = field_value_array[i];
            count++;
        }
    }
    var fieldvalue = fv_array[buttonrowIndex - 1].substring(fv_array[buttonrowIndex - 1].indexOf("<REC"), fv_array[buttonrowIndex - 1].length) + "</FV></REC>";
    var endxml = request_xml.substring(request_xml.indexOf("<MISC>"), request_xml.indexOf("</FCUBS_REQ_ENV>") + 16);
    var webrequest = request_header + fieldnode + fieldvalue + endxml;
    return (webrequest);
}
