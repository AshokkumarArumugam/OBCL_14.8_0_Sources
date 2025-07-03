/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLDPMTBR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

var REQ_LIST;
var len = 0;
var currRowIndex = 0;
var actionCode;

function fnSetAction(lAction) {
    actionCode = lAction;
    return true;
}

function fnPreLoad_CVS_MSG_BROWSER_KERNEL() {
    SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
    var QryTable = getTableObjForBlock('TBL_QryRslts');
    var rowInfo = QryTable.rows[currRowIndex];
    var er = fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
    dbDataDOM = er;
    var detailPk = g_DetPkArray[currRowIndex - 1];
    detailWinParams.ShowSummary = 'TRUE';
    detailWinParams.DetailPkVals = detailPk;
    screenArgs['QUEUE_REFNO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['SEQ_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[3]);
    var process_status = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[4]);
	if (process_status == 'Processed') {
        screenArgs['PROCESS_STATUS'] = 'P';
    }
    else if (process_status == 'Error Message') {
        screenArgs['PROCESS_STATUS'] = 'E';
    }
    else if (process_status == 'Work In Progress') {
        screenArgs['PROCESS_STATUS'] = 'W';
    }
	else if (process_status == 'Unprocessed') {
        screenArgs['PROCESS_STATUS'] = 'U';
    }
	else if (process_status == 'Time Out') {
        screenArgs['PROCESS_STATUS'] = 'T';
    }
    else {
        screenArgs['PROCESS_STATUS'] = 'R';
    }
    screenArgs['ACTION'] = actionCode;
    parent.screenArgs = screenArgs;
    return true;
}

function fnPreShowDetail_Sum_KERNEL(arg) {
    return false;
}

function fnPostExecuteQuery_sum_KERNEL(arg) {
	addEvent(document.getElementById("REQUEST"), "onclick", "fnSetAction('REQSTMSG');fnSubScreenMain('OLDPMTBR', 'OLDPMTBR', 'CVS_MSG_BROWSER', false);");
    addEvent(document.getElementById("RESPONSE"), "onclick", "fnSetAction('RESPMSG');fnSubScreenMain('OLDPMTBR', 'OLDPMTBR', 'CVS_MSG_BROWSER', false);");
	addEvent(document.getElementById("RETRY"), "onclick", "fnSetAction('RETRY');fn_Resend();");
    return false;
}

function fnPostLoad_Sum_KERNEL(e) {
	if ((typeof(parent.screenArgs) != undefined) || (typeof(parent.screenArgs) != '')) {
		document.getElementById("BLK_REQ_MASTER__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];	
	    fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
    }
    addEvent(document.getElementById("REQUEST"), "onclick", "fnSetAction('REQSTMSG');fnSubScreenMain('OLDPMTBR', 'OLDPMTBR', 'CVS_MSG_BROWSER', false);");
    addEvent(document.getElementById("RESPONSE"), "onclick", "fnSetAction('RESPMSG');fnSubScreenMain('OLDPMTBR', 'OLDPMTBR', 'CVS_MSG_BROWSER', false);");
	addEvent(document.getElementById("RETRY"), "onclick", "fnSetAction('RETRY');fn_Resend();");
    return true;
}

function formatXML(input, indent) {
    indent = indent || '\t';//you can set/define other ident than tabs
    //PART 1: Add \n where necessary
    xmlString = input.replace(/^\s+|\s+$/g, '');//trim it (just in case) {method trim() not working in IE8}
    xmlString = input.replace(/(<([a-zA-Z]+\b)[^>]*>)(?!<\/\2>|[\w\s])/g, "$1\n")//add \n after tag if not followed by the closing tag of pair or text node
					 .replace(/(<\/[a-zA-Z]+[^>]*>)/g, "$1\n")//add \n after closing tag
					 .replace(/>\s+(.+?)\s+<(?!\/)/g, ">\n$1\n<")//add \n between sets of angled brackets and text node between them
					 .replace(/>(.+?)<([a-zA-Z])/g, ">\n$1\n<$2")//add \n between angled brackets and text node between them
					 .replace(/\?></, "?>\n<")//detect a header of XML
    xmlArr = xmlString.split('\n');//split it into an array (for analise each line separately)
    //PART 2: indent each line appropriately
    var tabs = '';//store the current indentation
    var start = 0;//starting line
    if (/^<[?]xml/.test(xmlArr[0]))
        start++;//if the first line is a header, ignore it
    for (var i = start;i < xmlArr.length;i++)//for each line
    {
        var line = xmlArr[i].replace(/^\s+|\s+$/g, '');//trim it (just in case)
        if (/^<[\/]/.test(line))//if the line is a closing tag
        {
            tabs = tabs.replace(indent, '');//remove one indent from the store
            xmlArr[i] = tabs + line;//add the tabs at the beginning of the line
        }
        else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(line))//if the line contains an entire node
        {
            //leave the store as is
            xmlArr[i] = tabs + line;//add the tabs at the beginning of the line
        }
        else if (/<.*>/.test(line))//if the line starts with an opening tag and does not contain an entire node
        {
            xmlArr[i] = tabs + line;//add the tabs at the beginning of the line
            tabs += indent;//and add one indent to the store
        }
        else //if the line contain a text node
        {
            xmlArr[i] = tabs + line;// add the tabs at the beginning of the line
        }
    }
    //PART 3: return formatted string (source)
    return xmlArr.join('\n');//rejoin the array to a string and return it
}

function fnPostLoad_CVS_MSG_BROWSER_KERNEL() {
    if (parent.screenArgs != null && parent.screenArgs['ACTION'] != null) {
        document.getElementById("BLK_REQ_MASTER__QUEUE_REFNO").value = parent.screenArgs['QUEUE_REFNO'];
        document.getElementById("BLK_REQ_MASTER__SEQ_NO").value = parent.screenArgs['SEQ_NO'];
        document.getElementById("BLK_REQ_MASTER__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];
        document.getElementById("BLK_REQ_MASTER__PROCESS_STATUS").value = parent.screenArgs['PROCESS_STATUS'];
		document.getElementById("BLK_REQ_MASTER__MESSAGE").value = '';
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/QUEUE_REFNO"), parent.screenArgs['QUEUE_REFNO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/SEQ_NO"), parent.screenArgs['SEQ_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/CONTRACT_REF_NO"), parent.screenArgs['CONTRACT_REF_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/PROCESS_STATUS"), parent.screenArgs['PROCESS_STATUS']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/MESSAGE"), '');		
        g_prev_gAction = gAction;
        gAction = parent.screenArgs['ACTION'];
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode;
            if (msgStatus == "FAILURE") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				gAction = g_prev_gAction;
				return false;
            }
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);

        if (document.getElementById("BLK_REQ_MASTER__MESSAGE").value != '') {
            try {
                var XMLMessage = formatXML(document.getElementById("BLK_REQ_MASTER__MESSAGE").value, '\t');
                if (XMLMessage != '') {
                    document.getElementById("BLK_REQ_MASTER__MESSAGE").value = XMLMessage;
                }
            }
            catch (e) {
                XMLMessage = '';
            }

        }
        parent.screenArgs = null;
        showToolbar('', '', '', '');
    }
    return true;
}

function SingleCheck() {
    var selected_row = 0;
    var msob_tchk = 0;
    currRowIndex = 0;
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    var temp = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
                temp = i;
            }
        }
        else 
            break;
    }
    if (msob_tchk > 1) {
        showErrorAlerts('IN-HEAR-205');
        return false;
    }
    else if (msob_tchk == 0) {
        showErrorAlerts('IN-HEAR-206');
        return false;
    }
    else {
        currRowIndex = selected_row + 1;
    }
}
function fn_Resend() {
	
	SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
	var QryTable = getTableObjForBlock('TBL_QryRslts');
    var rowInfo = QryTable.rows[currRowIndex];
    var er = fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
    dbDataDOM = er;
    var detailPk = g_DetPkArray[currRowIndex - 1];
    detailWinParams.ShowSummary = 'TRUE';
    detailWinParams.DetailPkVals = detailPk;
	screenArgs = new Array();
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[3]);
    screenArgs['QUEUE_REFNO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['SEQ_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
	var process_status = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[4]);
	if (process_status == 'Processed') {
        screenArgs['PROCESS_STATUS'] = 'P';
    }
    else if (process_status == 'Error Message') {
        screenArgs['PROCESS_STATUS'] = 'E';
    }
    else if (process_status == 'Work In Progress') {
        screenArgs['PROCESS_STATUS'] = 'W';
    }
	else if (process_status == 'Unprocessed') {
        screenArgs['PROCESS_STATUS'] = 'U';
    }
	else if (process_status == 'Time Out') {
        screenArgs['PROCESS_STATUS'] = 'T';
    }
    else {
        screenArgs['PROCESS_STATUS'] = 'R';
    }
    screenArgs['ACTION'] = actionCode;
    parent.screenArgs = screenArgs;
	fnBackend();
    return true;	
}
function fnBackend(){
	if (parent.screenArgs != null && parent.screenArgs['ACTION'] != null) {        
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/QUEUE_REFNO"), parent.screenArgs['QUEUE_REFNO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/SEQ_NO"), parent.screenArgs['SEQ_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/CONTRACT_REF_NO"), parent.screenArgs['CONTRACT_REF_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/PROCESS_STATUS"), parent.screenArgs['PROCESS_STATUS']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_REQ_MASTER/MESSAGE"), '');        
		g_prev_gAction = gAction;
        gAction = parent.screenArgs['ACTION'];
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode;
            if (msgStatus == "FAILURE") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				gAction = g_prev_gAction;
				return false;
			}
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
		
        parent.screenArgs = null;
        showToolbar('', '', '', '');
    }
    return true;
}

//Manikandan V Starts (Common Browser Screen)
/*function fnPostLoad_Sum_KERNEL(e){
	if (typeof(parent.screenArgs) != 'undefined') {
		 document.getElementById("BLK_REQ_MASTER__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];	
	    fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
   }	
return true;	
 }*/
 //Manikandan V End for get date from parent screen