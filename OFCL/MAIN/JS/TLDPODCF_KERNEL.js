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
**  File Name          : TLDPODCF_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
/*var fcjResponseDOM;
var fcjRequestDOM;*/
var gPrevAction;
function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	fnEnableElement(getElementsByOjName("BTN_PREV")[0]);
	fnEnableElement(getElementsByOjName("BTN_NEXT")[0]);
	
	////////////////////////////////
	if(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__RECORDSTAT").value=='C'){
		DisableToolbar_buttons("CLOSE");
	}
	if(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__TXNSTAT").value=='A'){
		DisableToolbar_buttons("AUTHORIZE");
		DisableToolbar_buttons("DELETE");
	}
	if(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__RECORDSTAT").value=='O'){
		DisableToolbar_buttons("REOPEN");
		
	}
	///////////////////////////////////
	
	return true; 
}
function fnOnClick_BTN_NEXT_VER(){

	var verNo=Number(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__VERSIONNO").value); 
	var VERNOCount=Number(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__TXTMAXVERSIONNO").value); 
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__VERSIONNO").value=verNo; 
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';        
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


function fnOnClick_BTN_PREV_VER(){
	
	var verNo=Number(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__VERSIONNO").value); 
	var VERNOCount=Number(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__TXTMAXVERSIONNO").value); 
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	
       if(verNo>1)
	{	
		verNo--; 
		document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__VERSIONNO").value=verNo;
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}
function fnPostSave_KERNEL() {
  fnEnableElement(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_TLTBS_POSITION_DCF_STAT_CHANGE__BTN_NEXT"));
  
  
 
		DisableToolbar_buttons("CLOSE");
		DisableToolbar_buttons("REOPEN");
	
  
  return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDPODAU';
    authUixml = 'TLDPODAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['TLDPODAU'] = "KERNEL";
    ArrPrntFunc['TLDPODAU'] = "";
    ArrPrntOrigin['TLDPODAU'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
    //setDataXML(getXMLString(pureXMLDOM));
    //showData(dbStrRootTableName, 1);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}
