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
**  Date of creation   : 05/08/16
**  File Name          : UDDEVENT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**	Last Modified By   : Sudharshini Balaji
**	Last modified on   : 05-Nov-2020
**	Search String      : Bug#32025374
**	Reason             : To Launch Authorize screen OLDEVAUT from OLDUDEVT
****************************************************************************************************************************/
function appending_data()
{
	appendData(document.getElementById("TBLPageAll"));
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") 
	{
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
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
}

function fnBackendCall(){
 fcjRequestDOM = buildUBSXml();
 fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
     if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }   
return true;
}

function FN_DEFAULT(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='DEFAULT';
 fnBackendCall();  
 gAction=gPrevAction;
 return true;
}

//function fn_default()
/*function FN_DEFAULT()//27427886_Changes
{
	l_prev_gAction=gAction;
	gAction = "DEFAULT";
	appending_data()
	gAction = l_prev_gAction;
	  
	/*if (document.getElementById('BLK_OLVWS_CONTRACT_EVENT__AMTCHECK').value == 'N')
	{
		document.getElementById("cmdAddRow_BLK_OLVWS_CONTRACT_LIQ").disabled=true;
		document.getElementById("cmdDelRow_BLK_OLVWS_CONTRACT_LIQ").disabled=true;
		document.getElementById("BLK_UDVWS_CONTRACT_LIQ_tableContainer").disabled=true;
	 	/*var tableRef = document.getElementById('BLK_OLVWS_CONTRACT_LIQ');
		var rowRef = tableRef.tBodies[0].rows;
		for( var i = 0 ; i < rowRef.length ; i++ )
		{
			rowRef[i].cells[4].getElementsByTagName("INPUT")[0].nextSibling.disabled = true;
			rowRef[i].cells[5].getElementsByTagName("INPUT")[0].disabled = true;
		}
	}/
	return true;
}
*/
function fn_prev()
{
	l_prev_gAction=gAction;
	gAction = "PREV";
	appending_data();
	gAction = l_prev_gAction;
	return true; 
}
function fn_next(){
	l_prev_gAction=gAction;
	gAction = "NEXT";
	appending_data();
	gAction = l_prev_gAction;
	return true; 
}
function fnPostExecuteQuery_KERNEL(){
  fnEnableElement(document.getElementById('BLK_OLVWS_CONTRACT_EVENT__BTN_NEXT'));
  fnEnableElement(document.getElementById('BLK_OLVWS_CONTRACT_EVENT__BTN_PREV'));
  return true;
}
function fnPostNew_KERNEL() {
  fnDisableElement(document.getElementById('BLK_OLVWS_CONTRACT_EVENT__BTN_NEXT'));
  fnDisableElement(document.getElementById('BLK_OLVWS_CONTRACT_EVENT__BTN_PREV'));
  return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDEVAUT';
    authUixml = 'OLDEVAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['OLDEVAUT'] = "KERNEL";
    ArrPrntFunc['OLDEVAUT'] = "";
    ArrPrntOrigin['OLDEVAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
	return true;
}

//Bug#32025374 Changes starts
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLVWS_CONTRACT_EVENT__FCCREF').value;    
    return true;
}
//Bug#32025374 Changes ends
