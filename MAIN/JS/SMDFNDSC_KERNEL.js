/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India

------------------------------------------------------------------------------------------
*/
/*
----------------------------------------------------------------------------------------- 
   Date		: 30-Sep-2011
   Changed By         : Vinodkumar Subramaniam
   Change Description : CHanges done for defaulting the value for control string after modify operation
   Search String	:11.4 ITR1 SFR 13052570 vinod changes
   
   Date		: 30-Sep-2011
   Changed By         : Vinodkumar Subramaniam
   Change Description : CHanges done for defaulting the value for control string after unlocking and without visiting the control string tab
   Search String	: 11.4 ITR1 SFR 13095320 Vinod Changes
   
   Date		: 08-Nov-2012
   Changed By         : Chidambaram P
   Change Description : Changes done for cross browser problem in control strings
   Search String	: 12.0.1 ITR1 SFR 14761538 Chip Changes
   
**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES   

**  Last Modified By   : Akshay Trivedi
**  Last modified on   : 04-May-2023
**  Reason             : REDWOOD CHANGES - Fix to populate the control string properly.
**  Search String      : Bug#35239466 Bug#35348094   

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

var g_functionControlStringBits = new Array("BLK_CNTRLSTR__UDFNEW", "BLK_CNTRLSTR__UDFCPY", "BLK_CNTRLSTR__UDFDEL", "BLK_CNTRLSTR__UDFCLOSE", "BLK_CNTRLSTR__UDFFUNLK", "BLK_CNTRLSTR__UDFREOPEN",
                                  "BLK_CNTRLSTR__UDFPRNT", "BLK_CNTRLSTR__UDFAUTH", "BLK_CNTRLSTR__UDFREV", "BLK_CNTRLSTR__UDFROLLOVR", "BLK_CNTRLSTR__UDFCNFRM",
                                  "BLK_CNTRLSTR__UDFLIQ", "BLK_CNTRLSTR__UDFHLD", "BLK_CNTRLSTR__UDFTEMPLTE", "BLK_CNTRLSTR__UDFVIEW", "BLK_CNTRLSTR__UDFGENERATE" );


function fnPreLoad_KERNEL()
{
    //debugs("In fnPreLoad", "A");
	return true;
}

function fnPostLoad_KERNEL()
{
   // debugs("In fnPostLoad", "A");

   if (parent.screenArgs['PARENT_FUNC_ID'] == "STDBRREF") 
	{
		fnPostLoad_CVS_MAIN_VIEWLOG();
    }
   return true;

}

function fnPreNew_KERNEL()
{
    //var newAction = true;
    //debugs("In fnPreNew", "A");
    return true;
}

function fnPostNew_KERNEL()
{
    debugs("In fnPostNew", "A");
	return true;
}

function fnPreUnlock_KERNEL()
{
    var unlock = true;
    //debugs("In fnPreUnlock", "A");
    return unlock;
}

function fnPostUnlock_KERNEL()
{
    debugs("In fnPostUnlock", "A");
	fnPopulateControlStringBits();
	appendTabData(document.getElementById("TBLPageTAB_CNTRLSTR"));//11.4 ITR1 SFR 13095320 Vinod Changes added
	expandcontent('TAB_CNTRLSTR'); //Bug#35239466 Bug#35348094
	return true;
}

function fnPreAuthorize_KERNEL()
{
    var authorize = true;
    debugs("In fnPreAuthorize", "A");
    return authorize;
}

function fnPostAuthorize_KERNEL()
{
    //debugs("In fnPostAuthorize", "A");
}

function fnPreCopy_KERNEL()
{
    var copy = true;
    //debugs("In fnPreCopy", "A");
    return copy;
}

function fnPostCopy_KERNEL()
{
    debugs("In fnPostCopy", "A");
	return true;
}

function fnPreClose_KERNEL()
{
    var close = true;
    //debugs("In fnPreClose", "A");
    return close;
}

function fnPostClose_KERNEL()
{
    //debugs("In fnPostClose", "A");
	return true;
}

function fnPreReOpen_KERNEL()
{
    var reOpen = true;
    //debugs("In fnPreReOpen", "A");
    return reOpen;
}

function fnPostReOpen_KERNEL()
{
    debugs("In fnPostReOpen", "A");
}

function fnPreDelete_KERNEL()
{
    var deleteAction = true;
   // debugs("In fnPreDelete", "A");
    return deleteAction;
}

function fnPostDelete_KERNEL()
{
    //debugs("In fnPostDelete", "A");
	return true;
}

function fnPreEnterQuery_KERNEL()
{
    var execute = true;
   // debugs("In fnPreEnterQuery", "A");
    return execute;
}

function fnPostEnterQuery_KERNEL()
{
    //debugs("In fnPostEnterQuery", "A");
	return true;
}

function fnPreExecuteQuery_KERNEL()
{
    var execute = true;
    //debugs("In fnPreExecuteQuery", "A");
    return execute;
}

function fnPostExecuteQuery_KERNEL()
{
    debugs("In fnPostExecuteQuery", "A");
	fnPopulateControlStringBits();
	appendTabData(document.getElementById("TBLPageTAB_CNTRLSTR"));//11.4 ITR1 SFR 13095320 Vinod Changes added
	return true;
	
}

function fnPreSave_KERNEL()
{
   // debugs("In fnPreSave", "A");
    var isValid = true;
    /*isValid = isValid & fnValidateMandatory();
    isValid = isValid & fnValidateDataType();
    if (!isValid)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }*/
	//11.4 ITR1 SFR 13052570 vinod changes Commenting starts
	/*fnPopulateControlStringBits();
	appendTabData(document.getElementById("TBLPageTAB_CNTRLSTR"));*/
	//11.4 ITR1 SFR 13052570 vinod changes Commenting Ends
	return isValid;
}

function fnPostSave_KERNEL()
{
   // debugs("In fnPostSave", "A");
	fnPopulateControlStringBits();
	return true;
}

function fnPreGoToRec_KERNEL()
{
    var navigate = true;
    return navigate;
}

function fnPostGoToRec_KERNEL()
{

}

function fnInTab_TAB_CNTRLSTR_KERNEL(){
	fnPopulateControlStringBits();
}

function fnPopulateControlStringBits() {

    // Read the control string and check/uncheck the checkboxes accordingly.
    var l_controlString = document.getElementById("BLK_MENUDET__CNTRLSTR").value;
	
    for (var i = 0; i < l_controlString.length; i++) {
        if (l_controlString.charAt(i) == "1") {
           // document.getElementsByName(g_functionControlStringBits[i])[0].checked = true; // 12.0.1 ITR1 SFR 14761538 Chip Changes
		    document.getElementById(g_functionControlStringBits[i]).value = true; // 12.0.1 ITR1 SFR 14761538 Chip Changes //redwood_Changes checkbox
        }
    }
}

function fnPostLoad_CVS_MAIN_VIEWLOG() {

	 var codes = new Array();

	 createDOM(dbStrRootTableName);

	 codes = parent.screenArgs['KEY'].split("|");

	 if (codes.length > 0)
	 {
		  getElementsByOjName("FUCID")[0].value = codes[0]; //redwood_Changes 
		  
	 }
	  getElementsByOjName("MODNO")[0].value = parent.screenArgs['MOD_NO']; //redwood_Changes 

	  gAction = 'VIEWMNTLOG';
	  functionId = 'SMDFNDSC' ;
	var relationArray = new Array();
	relationArray['BLK_MENUDET'] = ""; 
	relationArray['BLK_FNDESC'] = "BLK_MENUDET~N"; 
	relationArray['BLK_DUPLFIELDS'] = "BLK_MENUDET~N"; 
	relationArray['BLK_CNTRLSTR'] = "BLK_MENUDET~1"; 

	var dataSrcLocationArray = new Array(); 	
	dataSrcLocationArray[0] = "BLK_MENUDET"; 
	dataSrcLocationArray[1] = "BLK_FNDESC"; 
	dataSrcLocationArray[2] = "BLK_DUPLFIELDS"; 
	dataSrcLocationArray[3] = "BLK_CNTRLSTR"; 


	//appendData(document.getElementById("TBLPageAll"));
	appendTextFieldValue(getElementsByOjName('FUCID')[0], 1, 'BLK_MENUDET');	//redwood_Changes 
	appendTextFieldValue(getElementsByOjName('MODNO')[0], 1, 'BLK_MENUDET');	//redwood_Changes 

	//  dbFCJDOM.loadXML(dbDataDOM.xml);
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
