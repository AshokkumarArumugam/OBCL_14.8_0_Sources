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
**  File Name          : OLDREPRC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838 

**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Asigning mainWin.AppDate to format the date as per user preference 
**Search String      : Bug#31400838 

  **Changed By         : Mohan Pal
  **Date               : 17-Feb-2022
  **Change Description : Introducing Version Control Buttons in OLDREPRC
  **Search String      : Bug#33859084
  
  **Changed By         : Kavitha Asokan
  **Date               : 29-Aug-2022
  **Change Description : Address the data format issue at the time of auth.
  **Search String      : Bug#34523700 
  
**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
****************************************************************************************************************************/

function fnPostNew_KERNEL(){
	  //document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATEI').value =document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATEI').value;//OBCL_14.3_Support_Bug#31400838  COMMENTED
	//OBCL_14.3_Support_Bug#31400838  CHANGES STARTS
	document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATE').value =document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATE').value;
	//fireHTMLEvent(document.getElementById("BLK_CONT_MERG_MASTER__MERGEVALUEDATE"),"onpropertychange");// Commented as part of Bug#31400838 
	document.getElementById("BLK_CONT_MERG_MASTER__MERGEBOOKDATE").value = mainWin.AppDate;	//Bug#31400838
	fireHTMLEvent(document.getElementById("BLK_CONT_MERG_MASTER__MERGEBOOKDATE"),"onpropertychange");
	//OBCL_14.3_Support_Bug#31400838  CHANGES ENDS
	//document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATEI').value = new Date().toISOString().slice(0,10);
	//document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATEI').value = new Date().toISOString().slice(0,10); 
	return true;	
}

function FN_CALCULATE(){
	g_prev_gAction = gAction;
	gAction = 'CALCULATE';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
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
 gAction = g_prev_gAction;
 return true; 
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDRPAUT';
    authUixml = 'OLDRPAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['OLDRPAUT'] = "KERNEL";
    ArrPrntFunc['OLDRPAUT'] = "";
    ArrPrntOrigin['OLDRPAUT'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_CONTRACT__CONTREFNUMBER').value;
    //screenArgs['BOOKDATE'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATEI').value; --Bug#34523700
	//screenArgs['VALUEDATE'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATEI').value; --Bug#34523700
	screenArgs['BOOKDATE'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATE').value;   //Bug#34523700
	screenArgs['VALUEDATE'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATE').value;  //Bug#34523700
    return true;
}

//Bug#33859084 STARTS

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	//fnEnableElement(document.getElementsByName("BTN_PREV")[0]);
	//fnEnableElement(document.getElementsByName("BTN_NEXT")[0]);
	fnEnableElement(getElementsByOjName("BTN_PREV")[0]); //Bug#34958820_REDWOOD_ADOPTION
	fnEnableElement(getElementsByOjName("BTN_NEXT")[0]); //Bug#34958820_REDWOOD_ADOPTION
	
	
	return true; 
}


function  fnOnClick_BTN_NEXT_VER(){

	
	var verNo=Number(document.getElementById("BLK_CONTRACT__CURRVERUI").value); //BLK_MDSB_MAS__CURRVERUI
	var VERNOCount=Number(document.getElementById("BLK_CONTRACT__TOTVERNOUI").value); //BLK_MDSB_MAS__TOTVERNOUI
	
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_CONTRACT__CURRVERUI").value=verNo; 
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';	
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


function  fnOnClick_BTN_PREV_VER(){


	var verNo=Number(document.getElementById("BLK_CONTRACT__CURRVERUI").value);  
	var VERNOCount=Number(document.getElementById("BLK_CONTRACT__TOTVERNOUI").value);  
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
       if(verNo>1)
	{	
		verNo--;
		document.getElementById("BLK_CONTRACT__CURRVERUI").value=verNo;
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';	
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

function fnPostSave_KERNEL() { 
  fnEnableElement(document.getElementById("BLK_CONTRACT__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_CONTRACT__BTN_NEXT"));
 
  return true;
}

//Bug#33859084 ENDS
