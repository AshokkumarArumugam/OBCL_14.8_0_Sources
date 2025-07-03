/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright � 2004 - 2011  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
----------------------------------------------------------------------------------------- 
********************************** START OF LOG HISTORY **************************************
   
	26-Aug-2010 9NT1428 - FLEXCUBE KERNEL 11.2	


Changed By         :  Kundan Verma
Description        :  Changed language code while searching from ertb_msgs
Search String      :  FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes	

 Changed By         :  Ajai
 Change Description :  Commented the code default where clause in summary screen.
 Search String       : bug_17578799 
 Changed on			 :11-OCT-2013
********************************** END   OF LOG HISTORY **************************************

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

/*
function fnPreLoad() {
	debugs("In fnPreLoad", "A");
}

function fnPostLoad() {
	debugs("In fnPostLoad", "A");
}

function fnPreNew() {
	var newAction = true;
	debugs("In fnPreNew", "A");
	return newAction;
}

function fnPostNew() {
	debugs("In fnPostNew", "A");	
}

function fnPreUnlock() {
	var unlock = true;
	debugs("In fnPreUnlock", "A");
	return unlock;
}

function fnPostUnlock() {
	debugs("In fnPostUnlock", "A");
}

function fnPreAuthorize() {
	var authorize = true;
	debugs("In fnPreAuthorize", "A");
	return authorize;
}

function fnPostAuthorize() {
	debugs("In fnPostAuthorize", "A");
}

function fnPreCopy() {
	var copy = true;
	debugs("In fnPreCopy", "A");
	return copy;
}

function fnPostCopy() {
	debugs("In fnPostCopy", "A");
}

function fnPreClose() {
	var close = true;
	debugs("In fnPreClose", "A");
	return close;
}

function fnPostClose() {
	debugs("In fnPostClose", "A");
}

function fnPreReOpen() {
	var reOpen = true;
	debugs("In fnPreReOpen", "A");
	return reOpen;
}

function fnPostReOpen() {
	debugs("In fnPostReOpen", "A");
}

function fnPreDelete() {
	var deleteAction = true;
	debugs("In fnPreDelete", "A");
	return deleteAction;
}

function fnPostDelete() {
	debugs("In fnPostDelete", "A");
}

function fnPreEnterQuery() {
	var execute = true;
	debugs("In fnPreEnterQuery", "A");
	return execute;
}

function fnPostEnterQuery() {
	debugs("In fnPostEnterQuery", "A");
}

function fnPreExecuteQuery() {
	var execute = true;
	debugs("In fnPreExecuteQuery", "A");
	return execute;
}

function fnPostExecuteQuery() {
	debugs("In fnPostExecuteQuery", "A");
}
*
function fnPreSave() {
	if(!fnValidate())
        return false;

	debugs("In fnPreSave", "A");	
	var isValid = true;
		
	
	if (!isValid) {		
		var msg = buildMessage(gErrCodes);
		alertMessage(msg);
		return false;
	}
	
	return isValid;	
}

function fnPostSave() {
	debugs("In fnPostSave", "A");
}


function fnPreGoToRec() {
	var navigate = true;
	return navigate;
}

function fnPostGoToRec() {
	
}
*/
function fnShowSubscreen_CVS_EVENT_TRIGGER(){
	
	screenArgs = new Array();
	screenArgs['SCREEN_NAME'] = 'CVS_EVENT_TRIGGER';
	screenArgs['FUNCTION_ID'] = 'OLDUDEMT';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'OLDUDEMT';
	appendData(document.getElementById('TBLPage'+strCurrentTabID));
	screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+mainWin.LangCode +'/OLDUDEMT.xml',screenArgs['SCREEN_NAME']);	
	//alert('MODULE '+document.getElementById("MODULE").value);
	//alert('EVENT_CODE '+document.getElementById("EVENT_CODE").value);
	 screenArgs['MODULE_CODE'] = document.getElementById("OLTBS_EVENT__MODULE").value;
	screenArgs['EVENT_CODE'] = document.getElementById("OLTBS_EVENT__EVENT_CODE").value;
	fnShowSubScreen(screenArgs);
//fnShowCallForm(screenArgs);
}
function fnPostLoad_CVS_EVENT_TRIGGER(screenArgs)
{
    showTabData();
   getElementsByOjName('MODULE_CODE')[0].value=screenArgs['MODULE_CODE'];
   getElementsByOjName('EVENT_CODE')[0].value=screenArgs['EVENT_CODE'];   
  if(gAction == "")
  {
  disableForm();   
  }
  /* 9NT1428 - FLEXCUBE KERNEL 11.2 Changes Starts */
  else if(gAction == "NEW")
  {
	if (getElementsByOjName("EVENT_TRIGGER")[0].getElementsByTagName("input")[0].checked  == false && getElementsByOjName("EVENT_TRIGGER")[0].getElementsByTagName("oj-input-text")[1].checked  == false){
		getElementsByOjName("EVENT_TRIGGER")[0].getElementsByTagName("input")[0].checked  = true;
		getElementsByOjName("EVENT_TRIGGER")[0].getElementsByTagName("input")[1].checked  = false;
	}
  }
  else if(gAction == "MODIFY")
  {
	fnEnableElement(getElementsByOjName("VALUE_DT_RULE_TYPE")[0]);
	fnEnableElement(getElementsByOjName("EVENT_PS_RULE_TYPE")[0]);
	fnEnableElement(getElementsByOjName("EVENT_TRIGGER")[0]);
	fnEnableElement(getElementsByOjName("EVENT_TRIGGER")[1]);
	fnEnableElement(getElementsByOjName("VAL_RULE")[0]);	
  }
  /* 9NT1428 - FLEXCUBE KERNEL 11.2 Changes Ends */
}

/* 9NT1428 - FLEXCUBE KERNEL 11.2 Changes Starts */
function fnPostLoad_CVS_DERIVATION_RULE(screenArgs)
{
	showTabData();
	if(gAction == "MODIFY")
  	{
		fnEnableElement(getElementsByOjName("EVENT_PROCESS")[0]);
  	}
}

function fnPostLoad_CVS_VAL_DATE_RULE(screenArgs)
{
	showTabData();
	if(gAction == "MODIFY")
  	{
		fnEnableElement(getElementsByOjName("DRV_VALUE_DT_RULE")[0]);
  	}
}
/* 9NT1428 - FLEXCUBE KERNEL 11.2 Changes Ends */

//saran starts
function fnDrvAction()
{	
	
	showErrorAlerts('CO-VAL-062');  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
	
	
	//alert('in set action');
	appendData(document.getElementById("TBLPage" + strCurrentTabID));
	g_prev_gAction = gAction;  	
	gAction = 'DRVACT';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  var returnVal = displayResponse(messageNode);
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
					
			  }
		   gAction=g_prev_gAction;
}
function fnProAction()
{	
	
	showErrorAlerts('CO-VAL-062');  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
	
	//alert('in set action');
	appendData(document.getElementById("TBLPage" + strCurrentTabID));
	g_prev_gAction = gAction;  	
	gAction = 'PROACT';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  var returnVal = displayResponse(messageNode);
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
					
			  }
		   gAction=g_prev_gAction;
}

function fnDrvExecute()
{     
	appendData(document.getElementById("TBLPage" + strCurrentTabID));
	g_prev_gAction = gAction;  	
	gAction = 'EXECDRV';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  var returnVal = displayResponse(messageNode);
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
					
			  }
		   gAction=g_prev_gAction;
}
function fnProExecute()
{
	appendData(document.getElementById("TBLPage" + strCurrentTabID));
	g_prev_gAction = gAction;  	
	gAction = 'EXECPRO';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  var returnVal = displayResponse(messageNode);
			  }

			  if (msgStatus == "SUCCESS" )  
			  {	
					
			  }
		   gAction=g_prev_gAction;
}
function fnDrvErrors()
{  
   appendData(document.getElementById("TBLPage" + strCurrentTabID));
	g_prev_gAction = gAction;  	
	gAction = 'ERRSDRV';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  var returnVal = displayResponse(messageNode);
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
					
			  }
		   gAction=g_prev_gAction;

    
}
function fnProErrors()
{
	appendData(document.getElementById("TBLPage" + strCurrentTabID));
	g_prev_gAction = gAction;  	
	gAction = 'ERRSPRO';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  var returnVal = displayResponse(messageNode);
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
					
			  }
		   gAction=g_prev_gAction;
}

//saran ends
  //bug_17578799 commented
   /*
function fnPostLoad_Summary()
{
	defaultWhereClause = "USER_DEFINED:" + 'Y';
}  
*/
