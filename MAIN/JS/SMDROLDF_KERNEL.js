/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2004 - 2009  Oracle and/or its affiliates.  All rights reserved.
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
---------------------------------------------------------------------------------------- 
**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

function fnPreLoad()
{
    debugs("In fnPreLoad", "A");
}

function fnPostLoad()
{
    debugs("In fnPostLoad", "A");
}

function fnPreNew()
{
    var newAction = true;
    debugs("In fnPreNew", "A");
    return newAction;
}

function fnPostNew()
{
    debugs("In fnPostNew", "A");
}

function fnPreUnlock()
{
    var unlock = true;
    debugs("In fnPreUnlock", "A");
    return unlock;
}

function fnPostUnlock()
{
    debugs("In fnPostUnlock", "A");
}

function fnPreAuthorize()
{
    var authorize = true;
    debugs("In fnPreAuthorize", "A");
    return authorize;
}

function fnPostAuthorize()
{
    debugs("In fnPostAuthorize", "A");
}

function fnPreCopy()
{
    var copy = true;
    debugs("In fnPreCopy", "A");
    return copy;
}

function fnPostCopy()
{
    debugs("In fnPostCopy", "A");
}

function fnPreClose()
{
    var close = true;
    debugs("In fnPreClose", "A");
    return close;
}

function fnPostClose()
{
    debugs("In fnPostClose", "A");
}

function fnPreReOpen()
{
    var reOpen = true;
    debugs("In fnPreReOpen", "A");
    return reOpen;
}

function fnPostReOpen()
{
    debugs("In fnPostReOpen", "A");
}

function fnPreDelete()
{
    var deleteAction = true;
    debugs("In fnPreDelete", "A");
    return deleteAction;
}

function fnPostDelete()
{
    debugs("In fnPostDelete", "A");
}

function fnPreEnterQuery()
{
    var execute = true;
    debugs("In fnPreEnterQuery", "A");
    return execute;
}

function fnPostEnterQuery()
{
    debugs("In fnPostEnterQuery", "A");
}

function fnPreExecuteQuery()
{
    var execute = true;
    debugs("In fnPreExecuteQuery", "A");
    return execute;
}

function fnPostExecuteQuery()
{
    debugs("In fnPostExecuteQuery", "A");
}

function fnPreSave()
{
    debugs("In fnPreSave", "A");
    var isValid = true;
    
    
    if (!isValid)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }

    return isValid;
}

function fnPostSave()
{
    debugs("In fnPostSave", "A");
}

function fnPreGoToRec()
{
    var navigate = true;
    return navigate;
}

function fnPostGoToRec()
{

}

/*  Custom implementation for function validateRestrictedTextValue(elem)  
      originally present in uiutil.js
*/


function fnPostLoad_KERNEL() {

	debugs("In fnPostLoad", "A");

	if (parent.screenArgs['PARENT_FUNC_ID'] == "STDBRREF") 
	{
		fnPostLoad_CVS_MAIN_VIEWLOG();
    }
}

function fnPostLoad_CVS_MAIN_VIEWLOG() {

	 var codes = new Array();

	 createDOM(dbStrRootTableName);

	 codes = parent.screenArgs['KEY'].split("|");

	 if (codes.length > 0)
	 {
		  getElementsByOjName("ROLEIDENTIFICATION")[0].value = codes[0]; //REDWOOD_CHANGES
	 }
	  getElementsByOjName("MODNO")[0].value = parent.screenArgs['MOD_NO']; //REDWOOD_CHANGES

	  gAction = 'VIEWMNTLOG';
	  functionId = 'SMDROLDF' ;

	var relationArray = new Array(); 			
	relationArray['BLK_ROLEMASTER'] = ""; 
	relationArray['BLK_ROLEDETAIL'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEDETAILB'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEDETAILC'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEDETAILD'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEBRANCHES'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEACCCLASS'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_MSGCRIGHTS'] = "BLK_ROLEMASTER~1"; 
	relationArray['BLK_QUEUERIGHTS'] = "BLK_ROLEMASTER~N"; 
	//relationArray['BLK_RESTRICTIVEPASSWD'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEBRANCHLIMITS'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEDETAILE'] = "BLK_ROLEMASTER~N"; 
	relationArray['BLK_ROLEDETAILF'] = "BLK_ROLEMASTER~N"; 

	var dataSrcLocationArray = new Array(); 	
	dataSrcLocationArray[0] = "BLK_ROLEMASTER"; 
	dataSrcLocationArray[1] = "BLK_ROLEDETAIL"; 
	dataSrcLocationArray[2] = "BLK_ROLEDETAILB"; 
	dataSrcLocationArray[3] = "BLK_ROLEDETAILC"; 
	dataSrcLocationArray[4] = "BLK_ROLEDETAILD"; 
	dataSrcLocationArray[5] = "BLK_ROLEBRANCHES"; 
	dataSrcLocationArray[6] = "BLK_ROLEACCCLASS"; 
	dataSrcLocationArray[7] = "BLK_MSGCRIGHTS"; 
	dataSrcLocationArray[8] = "BLK_QUEUERIGHTS"; 
	//dataSrcLocationArray[9] = "BLK_RESTRICTIVEPASSWD"; 
	dataSrcLocationArray[10] = "BLK_ROLEBRANCHLIMITS"; 
	dataSrcLocationArray[11] = "BLK_ROLEDETAILE"; 
	dataSrcLocationArray[12] = "BLK_ROLEDETAILF"; 

	//appendData(document.getElementById("TBLPageAll"));
	appendTextFieldValue(getElementsByOjName('ROLEIDENTIFICATION')[0], 1, 'BLK_ROLEMASTER');	 //REDWOOD_CHANGES
	appendTextFieldValue(getElementsByOjName('MODNO')[0], 1, 'BLK_ROLEMASTER');	 //REDWOOD_CHANGES

	//  dbFCJDOM=loadXMLDoc(dbDataDOM.xml);
	fcjRequestDOM = buildUBSXml();

	// Post the XML to Server
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);

	if(fcjResponseDOM) {
		var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

		if (msgStatus == 'FAILURE') {
			var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		    var returnVal = displayResponse(messageNode);
	    }

		if(msgStatus == 'SUCCESS') {
			var authResDom = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
			setDataXML(getXMLString(authResDom));
			mainWin.Authdom = null;
			resetIndex();
			//showTabData_Viewchg();
			viewMnt = true;
			showData();
	        gAction = "";
		}
	disableForm();
  }
}
