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
**  Written by         : Avinav Seal
**  Date of creation   : 07/09/16
**  File Name          : CFDACFIN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
  SFR Number         :29583890
  Changed By         :Chandra Achuta 
  Change Description :Done code changes auth button related changes.
  search string	     :Bug#29583890
****************************************************************************************************************************/
var subScreen='N';
function appending_data()
{
	appendData(document.getElementById("TBLPageAll"));
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
	else if (msgStatus == "SUCCESS") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    }	
}
//Bug#29583890  changes starts
/*
function FN_AUTH()
{
	l_prev_gAction=gAction;
	gAction = "USRAUTH";
	appending_data();
	gAction = l_prev_gAction;
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));
	return true; 
}

function FN_REJ()
{
	l_prev_gAction=gAction;
	gAction = "USRREJECT";
	appending_data();
	gAction = l_prev_gAction;
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));
	return true; 
}

function fnPostExecuteQuery_KERNEL()
{
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));
	return true;
}

function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));
	gAction = "USRAUTH";
	return true;
}
*/
function Fn_OnAuth()
{
	var gprev = gAction;
	gAction = 'AUTH';
	if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	        fnDisableElement(document.getElementById("BLK_CONTRACT__BTN_AUTH"));        
			disableForm();
		}		
	if (l_msgStat == 'FAILURE') {
		gAction = gprev ;
		}		
        return true;
    }	
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));
	return true; 
}

function Fn_Rej()
{
	l_prev_gAction=gAction;
	gAction = 'REJECT';
	appending_data();
	gAction = l_prev_gAction;
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnDisableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));
	return true; 
}

function fnPostExecuteQuery_KERNEL()
{   
    DisableToolbar_buttons("Authorize");
	var s = document.getElementById("BLK_CONTRACT__CONREFNO").value;
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));
	return true;
}

function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_REJECT'));	
	return true;
}
//Bug#29583890  changes ends