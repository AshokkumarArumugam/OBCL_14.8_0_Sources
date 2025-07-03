/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : TLDAMFEE_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Srinivasulu Ch
**  Last modified on   : 
**  Full Version       : 
**  Reason             : OBCL_14.4_SLT_Amendment_Fee Changes
****************************************************************************************************************************/
function fnPopulate(e) {
    gPrevAction = gAction;
    gAction = 'POPULATE';
    appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    gAction = gPrevAction;
    return true;
}
function fnPostNew_KERNEL() {
	gPrevAction = gAction;
    gAction = 'GENAMDREF';
    appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	
	
	
	 fnDisableElement(document.getElementById('BLK_MASTER__AMENDREFNO'));
	
	
    return true;
}
function fnPostLoad_KERNEL() {
    document.getElementById("cmdAddRow_BLK_DETAIL").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_DETAIL").style.visibility = 'hidden';
    return true;
}
//OBCL_14.4_SLT_Amendment_Fee Changes
function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	fnEnableElement(document.getElementById('BLK_MASTER__AMENDREFNO'));
	////////////////////////////////
	if(document.getElementById("BLK_MASTER__TXNSTAT").value=='C'){
		DisableToolbar_buttons("Close");      
        
	}
	if(document.getElementById("BLK_MASTER__AUTHSTAT").value=='A'){
		DisableToolbar_buttons("Authorize");
		DisableToolbar_buttons("Delete");
	}
	if(document.getElementById("BLK_MASTER__TXNSTAT").value=='O'){
		DisableToolbar_buttons("Reopen");       
		
	}
      
	if(document.getElementById("BLK_MASTER__AUTHSTAT").value=='U'){
		DisableToolbar_buttons("Unlock");     
		
	}  
	  
	///////////////////////////////////
	
	return true; 
}




//OBCL_14.4_SLT_Amendment_Fee Changes
function fnPostSave_KERNEL() {
 		DisableToolbar_buttons("Close");
		DisableToolbar_buttons("Reopen");
	    DisableToolbar_buttons("Unlock");
  return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDAMFAU';
    authUixml = 'TLDAMFAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['TLDAMFAU'] = "KERNEL";
    ArrPrntFunc['TLDAMFAU'] = "";
    ArrPrntOrigin['TLDAMFAU'] = "";
    return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
	screenArgs["AMENDREFNO"] = document.getElementById("BLK_MASTER__AMENDREFNO").value;
	screenArgs["AMENDDATE"] = document.getElementById("BLK_MASTER__AMENDMENTDATE").value;
	screenArgs["AMENDRATE"] = document.getElementById("BLK_MASTER__RATE").value;
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
//OBCL_14.4_SLT_Amendment_Fee Changes
function fnWaiveAll(e){
 var blockId = "BLK_DETAIL";
 var length = getTableObjForBlock(blockId).tBodies[0].rows.length;
 var waiveAllFlag = document.getElementById("BLK_MASTER__WAIVEALL").value;

 for (var idx = 0;idx < length;idx++) {
  if(waiveAllFlag){
   getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-input-text")[0].value = true;
  }
  else{
   getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-input-text")[0].value = false;
  }
 }
    return true;
}