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
**  File Name          : OLDEACBR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**	Changed By         : Abhinav Kumar
**	Date               : 04-Jun-2021
** 	Change Description : EXTERNAL ACCOUNTING ENTRIES BROWSER (OLSEACBR) -- fnPostLoad_Sum_KERNEL was used twice within the same js file
**                         Moved the content of fnPostLoad_Sum_KERNEL within the same function and added fnPostExecuteQuery_sum_KERNEL
** 	Search String      : OBCL_14.4_SUPPORT_BUG#32943956
**  
**	Changed By         : Sowmya Bitra
**	Date               : 15-Nov-2021
** 	Change Description : Error Details Subscreen added
** 	Search String      : OBCL_14.5_SUPPORT_BUG#33570019

**	Changed By         : Reghuraj
**	Date               : 01-Jul-2022
** 	Change Description : issue with process status value passing for retry addressed
** 	Search String      : #33869043

**	Changed By         : Satheesh Seshan
**	Date               : 24-Sep-2024
** 	Change Description : addEvent setting action code is not working in Redwood for response,request and retry.
** 	Search String      : Bug#36820658 

****************************************************************************************************************************/

var len = 0;
var currRowIndex = 0;
var actionCode;


function fnSetAction(lAction) {
    actionCode = lAction;
    return true;
}

function fnPreShowDetail_Sum_KERNEL(arg) {

    return false;
}
//Bug#36820658 start
function fnshowResponse(){
	fnSetAction('RESPMSG');
	fnSubScreenMain('OLDEACBR', 'OLDEACBR', 'CVS_ACC_BR', false);
}
function fnshowRequest(){
	fnSetAction('REQSTMSG');
	fnSubScreenMain('OLDEACBR', 'OLDEACBR', 'CVS_ACC_BR', false);
}

// commented the below function call. 
//OBCL_14.4_SUPPORT_BUG#32943956 Starts
/*
function fnPostExecuteQuery_sum_KERNEL(arg) {
    addEvent(document.getElementById("REQUEST"), "onclick", "fnSetAction('REQSTMSG');fnSubScreenMain('OLDEACBR', 'OLDEACBR', 'CVS_ACC_BR', false);");
    addEvent(document.getElementById("RESPONSE"), "onclick", "fnSetAction('RESPMSG');fnSubScreenMain('OLDEACBR', 'OLDEACBR', 'CVS_ACC_BR', false);");
	addEvent(document.getElementById("RETRY"), "onclick", "fnSetAction('RETRY');fn_Resend();");
    return false;
}*/
//OBCL_14.4_SUPPORT_BUG#32943956 Ends
//Bug#36820658 end

function fnPostLoad_Sum_KERNEL(e) {
	//OBCL_14.4_SUPPORT_BUG#32943956 Starts  --Moved the below code in single function as it was used twice. 
	if (typeof(parent.screenArgs) != undefined) {
		 document.getElementById("BLK_EXT_ACC_LOG__BRANCH").value = parent.screenArgs['BRANCH'];	
		 document.getElementById("BLK_EXT_ACC_LOG__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];	
		 document.getElementById("BLK_EXT_ACC_LOG__PROCESS_STATUS").value = parent.screenArgs['PROCESS_STATUS'];	
	    fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
   }
   //Bug#36820658 start
    //OBCL_14.4_SUPPORT_BUG#32943956 Ends   
    //addEvent(document.getElementById("REQUEST"), "onclick", "fnSetAction('REQSTMSG');fnSubScreenMain('OLDEACBR', 'OLDEACBR', 'CVS_ACC_BR', false);");
    //addEvent(document.getElementById("RESPONSE"), "onclick", "fnSetAction('RESPMSG');fnSubScreenMain('OLDEACBR', 'OLDEACBR', 'CVS_ACC_BR', false);");
	//addEvent(document.getElementById("RETRY"), "onclick", "fnSetAction('RETRY');fn_Resend();");
	//Bug#36820658 end
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
					 .replace(/\?></, "?>\n<");//detect a header of XML
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

function fnViewAccountingEntries()
{
	
	SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	g_prev_gAction = gAction;
	gAction='EXECUTEQUERY';
	var QryTable = getTableObjForBlock('TBL_QryRslts');
	var rowInfo = QryTable.rows[currRowIndex];
	var er = fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
	dbDataDOM = er;
	var detailPk = g_DetPkArray[currRowIndex - 1];
	detailWinParams.ShowSummary = 'TRUE';
	detailWinParams.DetailPkVals = detailPk;
	screenArgs = new Array();
	screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
	screenArgs['FUNCTION_ID'] = 'OLDEACHS';
	screenArgs['ACTION'] = 'LAUNCH';
	screenArgs['MODULE'] = 'OL';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'OLDEACHS';
	screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
	screenArgs['EXTERNAL_REF_NO']  = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
	parent.screenArgs = screenArgs;
	mainWin.dispHref1('OLDEACHS', parent.seqNo);	 
	gAction = g_prev_gAction;
	return true;
}

function SingleCheck() {
	
    var selected_row = 0;
    var msob_tchk = 0;
    currRowIndex = 0;
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    var temp = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //REDWOOD_CHANGES
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true) { //REDWOOD_CHANGES
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

function fnPreLoad_CVS_ACC_BR_KERNEL() {
	
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
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['EXTERNAL_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
    screenArgs['BRANCH'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[3]);
	screenArgs['EXTERNAL_ACC_SYSTEM_CODE'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[4]);
	screenArgs['MSG_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[5]);
    screenArgs['PROCESS_STATUS'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[6]);
    screenArgs['ACTION'] = actionCode;
    parent.screenArgs = screenArgs;
    return true;
}

function fnPostLoad_CVS_ACC_BR_KERNEL() {
	
    if (parent.screenArgs != undefined && parent.screenArgs['ACTION'] != undefined) {
        document.getElementById("BLK_EXT_ACC_LOG__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];
        document.getElementById("BLK_EXT_ACC_LOG__EXTERNAL_REF_NO").value = parent.screenArgs['EXTERNAL_REF_NO'];        
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/CONTRACT_REF_NO"), parent.screenArgs['CONTRACT_REF_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/EXTERNAL_REF_NO"), parent.screenArgs['EXTERNAL_REF_NO']);
		setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/BRANCH"), parent.screenArgs['BRANCH']);
		setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/EXTERNAL_ACC_SYSTEM_CODE"), parent.screenArgs['EXTERNAL_ACC_SYSTEM_CODE']);
		setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/MSG_REF_NO"), parent.screenArgs['MSG_REF_NO']);
		//setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/PROCESS_STATUS"), parent.screenArgs['PROCESS_STATUS']);
		
        g_prev_gAction = gAction;
        gAction = parent.screenArgs['ACTION'];
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode;
            if (msgStatus == "FAILURE") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            }
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }	
			var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
			setDataXML(getXMLString(pureXMLDOM));
			showData(dbStrRootTableName, 1);

			if (msgStatus == "FAILURE") {
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				gAction = g_prev_gAction;
				return false;
			}
			if (document.getElementById("BLK_EXT_ACC_LOG__MESSAGE").value != "undefined") {
				try {
					var XMLMessage = formatXML(document.getElementById("BLK_EXT_ACC_LOG__MESSAGE").value, '\t');
					if (XMLMessage != undefined) {
						document.getElementById("BLK_EXT_ACC_LOG__MESSAGE").value = XMLMessage;
					}
				}
				catch (e) {
					XMLMessage = undefined;
				}

			}	   
			parent.screenArgs = undefined;
			
		 gAction = g_prev_gAction;
		
		fnRefreshSummary();
	}

    return true;
}

function fn_Resend() {

	fnSetAction('RETRY');	//Bug#36820658 added
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
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['EXTERNAL_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
    screenArgs['BRANCH'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[3]);
	screenArgs['EXTERNAL_ACC_SYSTEM_CODE'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[4]);
	screenArgs['MSG_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[5]);
    /*screenArgs['PROCESS_STATUS'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[6]); #33869043 commended*/ 
	screenArgs['PROCESS_STATUS'] = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[6].value; //#33869043 added
    screenArgs['ACTION'] = actionCode;
    parent.screenArgs = screenArgs;
	fnResendHitBackend();
    return true;	
}

function fnResendHitBackend(){
	
	if (parent.screenArgs != undefined && parent.screenArgs['ACTION'] != undefined) {
       /*  document.getElementById("BLK_EXT_ACC_LOG__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];
        document.getElementById("BLK_EXT_ACC_LOG__EXTERNAL_REF_NO").value = parent.screenArgs['EXTERNAL_REF_NO']; 
		document.getElementById("BLK_EXT_ACC_LOG__BRANCH").value = parent.screenArgs['BRANCH'];
        document.getElementById("BLK_EXT_ACC_LOG__EXTERNAL_ACC_SYSTEM_CODE").value = parent.screenArgs['EXTERNAL_ACC_SYSTEM_CODE']; 
		document.getElementById("BLK_EXT_ACC_LOG__MSG_REF_NO").value = parent.screenArgs['MSG_REF_NO'];
        document.getElementById("BLK_EXT_ACC_LOG__PROCESS_STATUS").value = parent.screenArgs['PROCESS_STATUS'];  */
		
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/CONTRACT_REF_NO"), parent.screenArgs['CONTRACT_REF_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/EXTERNAL_REF_NO"), parent.screenArgs['EXTERNAL_REF_NO']);
		setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/BRANCH"), parent.screenArgs['BRANCH']);
		setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/EXTERNAL_ACC_SYSTEM_CODE"), parent.screenArgs['EXTERNAL_ACC_SYSTEM_CODE']);
		setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/MSG_REF_NO"), parent.screenArgs['MSG_REF_NO']);
		setNodeText(selectSingleNode(dbDataDOM, "//BLK_EXT_ACC_LOG/PROCESS_STATUS"), parent.screenArgs['PROCESS_STATUS']);
		
        g_prev_gAction = gAction;
        gAction = parent.screenArgs['ACTION'];
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode;
            if (msgStatus == "FAILURE") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
				var returnVal = displayResponse(messageNode,msgStatus,'E');
            }
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
                var returnVal = displayResponse(messageNode,msgStatus,'I');
			}
        }
		 
		parent.screenArgs = undefined;
	  
		 gAction = g_prev_gAction;
		
		fnRefreshSummary();
	}
	
	return true;
}

//OBCL_14.5_SUPPORT_BUG#33570019 changes start
function fnViewErrorNodes()
{
	
	SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	g_prev_gAction = gAction;
	gAction='EXECUTEQUERY';
	var QryTable = getTableObjForBlock('TBL_QryRslts');
	var rowInfo = QryTable.rows[currRowIndex];
	var er = fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
	dbDataDOM = er;
	var detailPk = g_DetPkArray[currRowIndex - 1];
	detailWinParams.ShowSummary = 'TRUE';
	detailWinParams.DetailPkVals = detailPk;
	screenArgs = new Array();
	screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
	screenArgs['FUNCTION_ID'] = 'OLDEACER';
	screenArgs['ACTION'] = 'LAUNCH';
	screenArgs['MODULE'] = 'OL';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'OLDEACER';
	screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
	screenArgs['EXTERNAL_REF_NO']  = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
	parent.screenArgs = screenArgs;
	mainWin.dispHref1('OLDEACER', parent.seqNo);	 
	gAction = g_prev_gAction;
	return true;
}
//OBCL_14.5_SUPPORT_BUG#33570019 Changes end

//Manikandan V Starts for get data from parent screen (common Browser Screen)
//OBCL_14.4_SUPPORT_BUG#32943956 --Commented the function as it was used twice and moved the content above.
/*function fnPostLoad_Sum_KERNEL(e){
	if (typeof(parent.screenArgs) != 'undefined') {
		 document.getElementById("BLK_EXT_ACC_LOG__BRANCH").value = parent.screenArgs['BRANCH'];	
		 document.getElementById("BLK_EXT_ACC_LOG__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];	
		 document.getElementById("BLK_EXT_ACC_LOG__PROCESS_STATUS").value = parent.screenArgs['PROCESS_STATUS'];	
	    fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
   }	
return true;	
 }*/
 //Manikandan V End for get data from parent screen 