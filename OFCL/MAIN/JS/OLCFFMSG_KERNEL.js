/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
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
**  File Name          : 
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820 
****************************************************************************************************************************/

function fnpopTAGS(){
    var e = mainWin.event || e;
	currRow = getRowIndex(e);
	fnSubScreenMain('OLCFFMSG','','CVS_TAGS');
	g_prev_gAction = gAction;
	gAction = 'TAGS';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	gAction = g_prev_gAction;
	return true;
	}

function fn_ProRataTag(){
    var e = mainWin.event || e;
	currRow = getRowIndex(e);
	fnSubScreenMain('OLCFFMSG','','CVS_PRO');
	g_prev_gAction = gAction;
	gAction = 'PROTAGS';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	gAction = g_prev_gAction;
	return true;
	}	
	
/*function fnPostNew_KERNEL(){
	document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_PRORATA").disabled=true;
	if((document.getElementById("BLK_OLTBS_FFMT_MSG__REL_EVENT").value) == ""){
		document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_GENERATE").disabled=true;
		document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_UNDOGENERATE").disabled=true;
	}
	else{
		document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_MSG_PREVIEW").disabled=false;
	}
	if((document.getElementById(BLK_OLTBS_FFMT_MSG__RECEIVERTYPE)) != 'ET'){
		document.getElementById("BLK_OLTBS_FFMT_MSG__ENTITYTYPE").visibility="hidden";
	}
	else
	{
		fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__ENTITYTYPE"));
	}
	return true;
}*/

/*function fnPostNew_KERNEL(){
	if((document.getElementById("BLK_OLTBS_FFMT_MSG__REL_EVENT").value) is null){
               fnDisableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_MSG_PREVIEW"));
			   fnDisableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_GENERATE"));
			   fnDisableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_UNDOGENERATE"));
            }
    else{
               fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_MSG_PREVIEW"));
			   fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_GENERATE"));
			   fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_UNDOGENERATE"));
        }
	return true;
}*/

function fnPopulateDetails(){
	g_prev_gAction = gAction;
	gAction = 'CHECK';
	fn_BuildXML();
    gAction = g_prev_gAction;
 return true; 
}

/*function fn_Preview(){
	if ((document.getElementById("BLK_OLTBS_FFMT_MSG__REL_EVENT").value)==""){
		alert("Message can be previewed only when the Related Event is not null.");
	}
	document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_GENERATE").disabled=false;
	g_prev_gAction = gAction;
	gAction = 'PREVIEW';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
// fnShowSubSystem('OLDVWMSG','CVS_OLDVWMSG');
 gAction = g_prev_gAction;
 return true; 
}*/


function fn_PartIntShare(){
	
//	document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_GENERATE").disabled=false;
	g_prev_gAction = gAction;
	gAction = 'EXECUTEQUERY';
//	fn_BuildXML();
	screenArgs = new Array();
	screenArgs['PRM_BORR_REF_NO']	 = document.getElementById("BLK_OLTBS_FFMT_MSG__CONTRACT_REF_NO").value;
	screenArgs['PRM_PAY_VALUE_DATE']	 = document.getElementById("BLK_OLTBS_FFMT_MSG__BILLING_DATE").value;
	//screenArgs['PRM_DUMMY_REF_NO']= null;
	//screenArgs['PRM_LATEST_EVENT_SEQ_NO']=null;
	screenArgs['PRM_INT_AMT']	 = document.getElementById("BLK_OLTBS_FFMT_MSG__CASH_INTEREST_AMOUNT").value;
	//screenArgs['PRM_BORR_AMT_DUE']	 = null;
	fnSubScreenMain('LBCINTSH', 'LBCINTSH', 'CVS_LBCINTSH', false);
    gAction = g_prev_gAction;
 return true; 
}

/*function fn_Generate(){
	//document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_UNDOGENERATE").disabled=false;
	g_prev_gAction = gAction;
	gAction = 'GENMSG';
    appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
    gAction = g_prev_gAction;
 return true; 
}*/

function fn_UndoGenerate(){
	g_prev_gAction = gAction;
	gAction = 'UNDOGENERATE';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
    gAction = g_prev_gAction;
 return true; 
}

function fnDisable(){
	document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_PRORATA").disabled=true;
	//if(document.getElementsByName("MESSAGE_TYPE")[0].checked){ //Bug#34958820 changes
	if(getElementsByOjName("MESSAGE_TYPE")[0].getElementsByTagName("input")[0].checked){ //Bug#34958820 changes
	g_prev_gAction = gAction;
	gAction = 'RADIOCHANGE';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
		//showAlerts(fnBuildAlertXML("OL-05032","E"),"E");
		fnDisableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__REL_EVENT"));
		fnDisableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__TEMPLATECODE"));
		fnDisableElement(document.getElementById("BLK_OLTBS_FFMT_PARTY__BTN_PARTY_TAGS"));
	}
	//else if(document.getElementsByName("MESSAGE_TYPE")[1].checked){ //Bug#34958820 changes
	else if(getElementsByOjName("MESSAGE_TYPE")[0].getElementsByTagName("input")[1].checked){ //Bug#34958820 changes
		fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__REL_EVENT"));
		fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__TEMPLATECODE"));
		fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_PARTY__BTN_PARTY_TAGS"));
	}
	
	//else if (document.getElementsByName("MESSAGE_TYPE")[2].checked){ //Bug#34958820 changes
	else if (getElementsByOjName("MESSAGE_TYPE")[0].getElementsByTagName("input")[2].checked){ //Bug#34958820 changes
		fnEnableElement(document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_PRORATA"));
	}
    gAction = g_prev_gAction;
	var a = gAction;
	return true;
}


function fn_BuildXML(){
	
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
 return true;
	
}