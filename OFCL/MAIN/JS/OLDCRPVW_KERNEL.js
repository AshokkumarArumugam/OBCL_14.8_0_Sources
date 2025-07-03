/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2019, Oracle and/or its affiliates.
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
**  Written by         : ARUNADEVI RAJENDRAN
**  Date of creation   : 
**  File Name          : OLDCRPVW_KERNEL.js
**  Purpose            : New screen to view corporate customer loan details
**  Called From        : 

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 07-Mar-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820

**  Last Modified By   : Rashmi B V
**  Last modified on   : 30-Aug-2023
**  Reason             : Component detail screen is not showing any detail for Commitment and Syndication
**  Search String      : Bug#35726944

****************************************************************************************************************************/
function fnPreEnterQuery_KERNEL() {
    return true;
}

function fnPostExecuteQuery_KERNEL() {
    enableForm();
    //fnDisableElement(document.getElementById("BLK_CORP_SUMMARY__CUSTOMER_NO"));
    return true; 
}

//for LOAN DETAILS
function fnShowLoan(event)
 {
    //	debugger;
    parentWinParams = new Object();
    var index = getRowIndex(event);
    //var tableObj = document.getElementById("BLK_LOAN_DETAILS"); //Bug#34958820
	var tableObj = getTableObjForBlock("BLK_LOAN_DETAILS");     //Bug#34958820
    var brnCode = tableObj.tBodies[0].rows[index-1].cells[2].getElementsByTagName("oj-input-text")[0].value;  
    var moduleCode = tableObj.tBodies[0].rows[index - 1].cells[14].getElementsByTagName("oj-input-text")[0].value;
	
    parentWinParams.FUNCTION_ID = 'OLDTRONL';	

    parentWinParams.FUNCTION_ID = 'OLDTRONL';
    parentWinParams.CALLFORM 	= 'LOANDET';
    parentWinParams.LANG 	= mainWin.LangCode;
    parentWinParams.UI_XML 	= '';
    parentWinParams.BRANCH 	= brnCode;
    parentWinParams.PARENT_FUNC_ID = 'OLDCRPVW';
    parentWinParams.CONTRACT_REF_NO= tableObj.tBodies[0].rows[index-1].cells[5].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHNAGES
    //alert("HI");
    //alert(parentWinParams.CONTRACT_REF_NO);
    mainWin.dispHref1(parentWinParams.FUNCTION_ID, seqNo);
    fnDisableElement(document.getElementById("BLK_CORP_SUMMARY__CUSTOMER_NO"));	
}

//for COMMITMENT DETAILS
function fnShowCommitment(event) { 
    //debugger;
    parentWinParams = new Object();
    var index = getRowIndex(event);
    //var tableObj = document.getElementById("BLK_COMITTMENT_DETAILS"); //Bug#34958820
	var tableObj = getTableObjForBlock("BLK_COMITTMENT_DETAILS");     //Bug#34958820
    var brnCode = tableObj.tBodies[0].rows[index-1].cells[2].getElementsByTagName("oj-input-text")[0].value;   
    var moduleCode = tableObj.tBodies[0].rows[index - 1].cells[14].getElementsByTagName("oj-input-text")[0].value;
    
    parentWinParams.FUNCTION_ID = 'OLDTRONL';
    parentWinParams.CALLFORM = 'COMMDET';
    parentWinParams.LANG = mainWin.LangCode;
    parentWinParams.UI_XML = '';
    parentWinParams.BRANCH = brnCode;
    parentWinParams.PARENT_FUNC_ID = 'OLDCRPVW';
    parentWinParams.CONTRACT_REF_NO= tableObj.tBodies[0].rows[index-1].cells[5].getElementsByTagName("oj-input-text")[0].value; 
    mainWin.dispHref1(parentWinParams.FUNCTION_ID, seqNo);
    fnDisableElement(document.getElementById("BLK_CORP_SUMMARY__CUSTOMER_NO"));	
}

//for SYNDICATE LOAN DETAILS
function fnShowSyndicate(event) {
    //	debugger;
    parentWinParams = new Object();
    var index = getRowIndex(event);
    //var tableObj = document.getElementById("BLK_SYNDICATION_DETAILS"); //Bug#34958820
	var tableObj = getTableObjForBlock("BLK_SYNDICATION_DETAILS");     //Bug#34958820
    var moduleCode = tableObj.tBodies[0].rows[index - 1].cells[14].getElementsByTagName("oj-input-text")[0].value;
    var prdtype = tableObj.tBodies[0].rows[index - 1].cells[16].getElementsByTagName("oj-input-text")[0].value;	
    
    if (moduleCode == 'FC' || moduleCode == 'LB' || moduleCode == 'LP') 
    {
	if (moduleCode == 'FC')
	{
	   parentWinParams.FUNCTION_ID = 'FCDTRONL';		
	}
	else if (moduleCode == 'LB')
	{
	     if (prdtype == 'C')
	     {
		parentWinParams.FUNCTION_ID = 'LBDTRONL';		
	     }
	     else if (prdtype == 'L')
	     {
		parentWinParams.FUNCTION_ID = 'LBDDDONL';		
	     }
	}		
	else if (moduleCode == 'LP')
	{
	    parentWinParams.FUNCTION_ID = 'LPDCOMNT';		
	}
        parentWinParams.CALLFORM = 'SYNDLNDET';
	parentWinParams.LANG = mainWin.LangCode;
	parentWinParams.UI_XML = '';
	parentWinParams.PARENT_FUNC_ID = 'OLDCRPVW';
	parentWinParams.CONTRACT_REF_NO= tableObj.tBodies[0].rows[index-1].cells[5].getElementsByTagName("oj-input-text")[0].value;
	mainWin.dispHref1(parentWinParams.FUNCTION_ID, seqNo);
	fnDisableElement(document.getElementById("BLK_CORP_SUMMARY__CUSTOMER_NO"));
    }
}

function fnShowLoanComp_Other() {
    //var tableObject = document.getElementById('BLK_LOAN_DETAILS'); //Bug#34958820
	var tableObject = getTableObjForBlock('BLK_LOAN_DETAILS'); //Bug#34958820
    var PgSize = Number(tableObject.getAttribute("pgsize"));
    //var curPage = Number(getInnerText(document.getElementById('CurrPage__BLK_LOAN_DETAILS')));
	var curPage = Number(getInnerText(document.getElementById("paging_BLK_LOAN_DETAILS_nav_input"))); //REDWOOD_CHANGES
    var numRows = tableObject.tBodies[0].rows.length;
    var count = 0;
    for (var index = 0;index <= numRows - 1;index++) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {	
	   screenArgs['BRANCH'] = tableObject.tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value;
	   screenArgs['CONTRACTREFNO'] = tableObject.tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value;
           selindex = index;
           count++;
        }
    }
    if (count == 0) {
        showErrorAlerts('CO-VAL-048');
        //alert('No records selected for drill down');
        return false;
    }
    if (count > 1) {
        showErrorAlerts('CO-VAL-050');
        //alert('Select only one record at a time');
        return false;
    }

    document.getElementById('BLK_CORP_SUMMARY__SELECTED_INDEX').value = Number((curPage - 1) * PgSize) + selindex;

    gAction = 'NEW';
    appendData();
    gAction = 'LOANCOMP_OTHER';
    fcjRequestDOM = buildUBSXml();
    servletURL = "FCClientHandler";
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    //setglobal();
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == 'FAILURE') {
            var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP")); 
            var returnVal = displayResponse(messageNode, msgStatus, 'E', "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
        if (msgStatus == 'SUCCESS') {
            screenArgs['SCREEN_NAME'] = 'CVS_COMP';
            screenArgs['FUNCTION_ID'] = 'OLDCRPVW';
            screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + mainWin.LangCode + '/OLDCRPVW.xml', screenArgs['SCREEN_NAME']);
            fnShowSubScreen(screenArgs);
        }
    }
    fnDisableElement(document.getElementById("BLK_CORP_SUMMARY__CUSTOMERNO"));
    gAction = ""; 
}

function fnShowLoanComp_Comp() {
    //var tableObject = document.getElementById('BLK_COMITTMENT_DETAILS'); //Bug#34958820
	var tableObject = getTableObjForBlock('BLK_COMITTMENT_DETAILS'); //Bug#34958820
    var PgSize = Number(tableObject.getAttribute("pgsize"));
    //var curPage = Number(getInnerText(document.getElementById('CurrPage__BLK_COMITTMENT_DETAILS')));
	var curPage = Number(getInnerText(document.getElementById("paging_BLK_COMITTMENT_DETAILS_nav_input"))); //REDWOOD_CHANGES
    var numRows = tableObject.tBodies[0].rows.length;
    var count = 0;

    for (var index = 0;index <= numRows - 1;index++) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            screenArgs['BRANCH'] = tableObject.tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value;
	    screenArgs['CONTRACTREFNO'] = tableObject.tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value;
            selindex = index;
            count++;
        }
    }
    if (count == 0) {
        showErrorAlerts('CO-VAL-048');
        return false;
    }
    if (count > 1) {
        showErrorAlerts('CO-VAL-050');
        return false;
    }
    document.getElementById('BLK_CORP_SUMMARY__SELECTED_INDEX').value = Number((curPage - 1) * PgSize) + selindex;

    gAction = 'NEW';
    appendData();
    gAction = 'LOANCOMP_COMMIT';
    fcjRequestDOM = buildUBSXml();
    servletURL = "FCClientHandler";
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    //setglobal();
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == 'FAILURE') {
            var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP")); 
            var returnVal = displayResponse(messageNode, msgStatus, 'E', "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
        if (msgStatus == 'SUCCESS') {
            //screenArgs['SCREEN_NAME'] = 'CVS_COMP'; //Commented since the screen name was going wrong
			screenArgs['SCREEN_NAME'] = 'CVS_COMT_COMP'; //Bug#35726944
            screenArgs['FUNCTION_ID'] = 'OLDCRPVW';
            screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + mainWin.LangCode + '/OLDCRPVW.xml', screenArgs['SCREEN_NAME']);
            fnShowSubScreen(screenArgs);
        }
    }
    fnDisableElement(document.getElementById("BLK_CORP_SUMMARY__CUSTOMERNO"));
    gAction = ""; 
}

function fnShowSyndComp_Comp(){
//var tableObject = document.getElementById('BLK_SYNDICATION_DETAILS'); //Bug#34958820
var tableObject = getTableObjForBlock('BLK_SYNDICATION_DETAILS'); //Bug#34958820
    var PgSize = Number(tableObject.getAttribute("pgsize"));
    //var curPage = Number(getInnerText(document.getElementById('CurrPage__BLK_SYNDICATION_DETAILS')));
	var curPage = Number(getInnerText(document.getElementById("paging_BLK_SYNDICATION_DETAILS_nav_input"))); //REDWOOD_CHANGES
    var numRows = tableObject.tBodies[0].rows.length;
    var count = 0;

    for (var index = 0;index <= numRows - 1;index++) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            screenArgs['BRANCH'] = tableObject.tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value;
	        screenArgs['CONTRACTREFNO'] = tableObject.tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value;
            selindex = index;
            count++;
        }
    }
    if (count == 0) {
        showErrorAlerts('CO-VAL-048');
        return false;
    }
    if (count > 1) {
        showErrorAlerts('CO-VAL-050');
        return false;
    }
    document.getElementById('BLK_CORP_SUMMARY__SELECTED_INDEX').value = Number((curPage - 1) * PgSize) + selindex;

    gAction = 'NEW';
    appendData();
    gAction = 'LOANCOMP_SYNDICATE';
    fcjRequestDOM = buildUBSXml();
    servletURL = "FCClientHandler";
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    //setglobal();
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == 'FAILURE') {
            var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP")); 
            var returnVal = displayResponse(messageNode, msgStatus, 'E', "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
        if (msgStatus == 'SUCCESS') {
            //screenArgs['SCREEN_NAME'] = 'CVS_COMP';//Commented since the screen name was going wrong
			screenArgs['SCREEN_NAME'] = 'CVS_SYND_COMP';//Bug#35726944
            screenArgs['FUNCTION_ID'] = 'OLDCRPVW';
            screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + mainWin.LangCode + '/OLDCRPVW.xml', screenArgs['SCREEN_NAME']);
            fnShowSubScreen(screenArgs);
        }
    }
    fnDisableElement(document.getElementById("BLK_CORP_SUMMARY__CUSTOMERNO"));
    gAction = "";
}
function fnPostNavigate_BLK_LOAN_DETAILS_KERNEL(newRow) {
	enableForm();
}

function fnPostNavigate_BLK_COMITTMENT_DETAILS_KERNEL(newRow) {
	enableForm();
}

function fnPostNavigate_BLK_SYNDICATION_DETAILS_KERNEL(newRow) {
	enableForm();
}