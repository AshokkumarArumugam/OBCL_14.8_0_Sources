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
**  File Name          : TLDFEELQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Srinivasulu Ch
**  Last modified on   : 19/Aug/2019
**  Full Version       : 
**  Reason             : 14.4SLT Amendment Fee Changes for version query

**  Last Modified By   : Gomathi G
**  Last modified on   : 27-MAY-2020
**  Reason             : To Display  Date, as per user date formatt
**  Search String      : OBCL_14.3_SUPPORT_BUG#31400838 Changes
****************************************************************************************************************************/
/*var fcjResponseDOM;
var fcjRequestDOM;*/
var gPrevAction;

function fnPostNew_KERNEL()
{	

    
	var version_ids = [ 'BLK_OLTBS_CONTRACT__CURRENT_PMTI','BLK_OLTBS_CONTRACT__CURRENT_PMT' 
						, 'BLK_OLTBS_CONTRACT__TOTAL_PMTSI'  , 'BLK_OLTBS_CONTRACT__TOTAL_PMTS'];
		for( var x=0; x < version_ids.length; x++ ){
			document.getElementById(version_ids[x]).value = 0;
	}
	
	document.getElementById("BLK_TLTBS_FEE_LIQD_MASTER__VALUEDATE").value = mainWin.AppDate;
	//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS
	fireHTMLEvent(document.getElementById("BLK_TLTBS_FEE_LIQD_MASTER__VALUEDATE"),"onpropertychange");
    //document.getElementById("BLK_TLTBS_FEE_LIQD_MASTER__VALUEDATE").value = formatDate(mainWin.AppDate);
	//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES ENDS

	document.getElementById('cmdAddRow_BLK_TLTBS_FEE_LIQD_DETAIL').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_TLTBS_FEE_LIQD_DETAIL').style.visibility='hidden';

	return true; 
}
//14.4SLT Amendment Fee Changes
function formatDate(dsDate)
{
 var mb3Date = new MB3Date(dsDate, gDateFormatDSO);
 if (mb3Date.isValidDate()) 
	return mb3Date.getShortDate();
}
//14.4SLT Amendment Fee Changes

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

function FnPopulate(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='POPULATE';
 //Version query  Changes
 fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
 fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
 fnBackendCall();  
 gAction=gPrevAction;
 return true;
}

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	fnEnableElement(getElementsByOjName("BTN_PREV")[0]);
	fnEnableElement(getElementsByOjName("BTN_NEXT")[0]);
	
	/////////////////////////////////////////////////////
	 //14.4SLT Amendment Fee Changes
	 //DisableToolbar_buttons("AUTHORIZE");
	 //DisableToolbar_buttons("Delete");
	/////////////////////////////////////////////////////
	return true; 
}

function fnOnClick_BTN_NEXT_VER(){

	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__CURRENT_PMT").value); 
	var VERNOCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__TOTAL_PMTS").value); 
	document.getElementById("BLK_OLTBS_CONTRACT__TXTVERSIONCHK").value = 'Y';	//Version Query
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_OLTBS_CONTRACT__CURRENT_PMT").value=verNo; 
		document.getElementById("BLK_OLTBS_CONTRACT__CURRENT_PMT").value=verNo;  
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';        
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


function fnOnClick_BTN_PREV_VER(){
	
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__CURRENT_PMT").value); 
	var VERNOCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__TOTAL_PMTS").value); 
	document.getElementById("BLK_OLTBS_CONTRACT__TXTVERSIONCHK").value = 'Y';	//Version query
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	
       if(verNo>1)
	{	
		verNo--; 
		document.getElementById("BLK_OLTBS_CONTRACT__CURRENT_PMT").value=verNo; 
		document.getElementById("BLK_OLTBS_CONTRACT__CURRENT_PMT").value=verNo; 		
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

//14.4SLT Amendment Fee Changes
/*
function FnPrevious(){
	console.log("FnPrevious called");
	var ret_val =  fnOnClick_BTN_PREV_VER();
	return ret_val;
}
function FnNext(){
	console.log("FnNext called");
	var ret_val = fnOnClick_BTN_NEXT_VER();
	return ret_val;
}*/
//14.4SLT Amendment Fee Changes


function fnPostSave_KERNEL() {
  //fnEnableElement(document.getElementByName("BTN_PREV"));
  //fnEnableElement(document.getElementByName("BTN_NEXT"));  
  //14.4SLT Amendment Fee Changes
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
  ////////////////////////////////////////////////////////////////////////////////////
  /*if(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXT_AUTH_STATUS").value=='Authorized'){
  DisableToolbar_buttons("AUTHORIZE");
  DisableToolbar_buttons("Delete");
  DisableToolbar_buttons("Liquidate");
  }*/
  ///////////////////////////////////////////////////////////////////////////////////
  return true;
}




//////////////////////////////////////////////////////////////////////////////////
function fnPostReverse_KERNEL(){
	if(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXT_AUTH_STATUS").value=='Authorized'){
  DisableToolbar_buttons("Authorize");
  DisableToolbar_buttons("Delete");
  DisableToolbar_buttons("Liquidate");
  DisableToolbar_buttons("Reverse");
  DisableToolbar_buttons("Hold");
  }
  
  
  if(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXT_AUTH_STATUS").value=='Unauthorized'){
	    
  DisableToolbar_buttons("Liquidate");
  DisableToolbar_buttons("Reverse");
  DisableToolbar_buttons("Hold");
  }
	
}
/////////////////////////////////////////////////////////////////////////////////



function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDFEEAU';
    authUixml = 'TLDFEEAU';
    //authScreenName = 'CVS_AUTHORIZE'; //14.4 SLT Chnages
	authScreenName ='CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['TLDFEEAU'] = "KERNEL";
    ArrPrntFunc['TLDFEEAU'] = "";
    ArrPrntOrigin['TLDFEEAU'] = "";
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
//function fnPreLoad_CVS_AUTHORIZE_KERNEL(screenArgs) //14.4 SLT Chnages
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTRACT_REF_NO').value;
	screenArgs['EVTDATE'] = document.getElementById('BLK_TLTBS_FEE_LIQD_MASTER__VALUE_DATE').value;
	screenArgs['MAKERID'] = document.getElementById('BLK_OLTBS_CONTRACT_EVENT_LOG__MAKER_ID').value;
	screenArgs['CNTPRTY'] = document.getElementById('BLK_OLTBS_CONTRACT__COUNTERPARTY').value;
	screenArgs['TRDDATE'] = document.getElementById('BLK_TLTBS_CONTRACT_MASTER__TRADE_DATE').value;
	screenArgs['EXPSETDATE'] = document.getElementById('BLK_TLTBS_CONTRACT_MASTER__EXPT_SETTL_DATE').value;
	screenArgs['CCY'] = document.getElementById('BLK_TLTBS_CONTRACT_MASTER__CURRENCY').value;
	screenArgs['TRDAMT'] = document.getElementById('BLK_TLTBS_CONTRACT_MASTER__TRADE_AMOUNT').value;
	screenArgs['TRDPRI'] = document.getElementById('BLK_TLTBS_CONTRACT_MASTER__TRADE_PRICE').value;
	screenArgs['SUB_SCREEN'] = 'Y';
    return true;
}