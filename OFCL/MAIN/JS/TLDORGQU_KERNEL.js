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
**  File Name          : TLDORGQU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**	Changed By         : Jayaram Namburaj
**	Date               : 07-JUL-2020
**	Change Description : Audit Trail Issue in TLDORGQU
**  Search String      : Bug#31545562
****************************************************************************************************************************/
function hit_backend()
{
	
    appendData();
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
    return true;
}
function fnPrev()
{
	var verNo=Number(document.getElementById("BLK_TLTBS_UPLOAD_MASTER__UI_CURRENT_VER").value); 
	var VERNOCount=Number(document.getElementById("BLK_TLTBS_UPLOAD_MASTER__UI_LATEST_VER").value); 	
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	l_prev_gAction=gAction;
	gAction = "PREV";
	hit_backend();
	gAction = l_prev_gAction;
	return true; 
}
function fnNext(){
	
	var verNo=Number(document.getElementById("BLK_TLTBS_UPLOAD_MASTER__UI_CURRENT_VER").value); 
	var VERNOCount=Number(document.getElementById("BLK_TLTBS_UPLOAD_MASTER__UI_LATEST_VER").value); 
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}	
	l_prev_gAction=gAction;
	gAction = "NEXT";
	hit_backend();
	gAction = l_prev_gAction;
	return true; 
}

function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById('BLK_TLTBS_UPLOAD_MASTER__UI_CURRENT_VER'));
	fnEnableElement(document.getElementById('BLK_TLTBS_UPLOAD_MASTER__UI_LATEST_VER'));
	fnEnableElement(document.getElementById('BLK_TLTBS_UPLOAD_MASTER__BTN_NEXT'));
	fnEnableElement(document.getElementById('BLK_TLTBS_UPLOAD_MASTER__BTN_PREV'));
	return true;
}

/* function fnPostUnlock_KERNEL() {
	l_prev_gAction= gAction;
    gAction = "UNLOCKCHECK";
    hit_backend();
    gAction = l_prev_gAction;
    return true;
} */
/* function fnPreAuthorize_KERNEL() {
	var confirm1=document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__CONFIRM");
	var confirm2=document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__CONFIRM2");
	
	if(!confirm1.value&&!confirm2.value){
		showAlerts(fnBuildAlertXML('IN-IR006', 'E',"Operation not allowed."),'E');
		fnExecuteQuery();
		return false;
	}
    return true;
} */
function fnPreUnlock_KERNEL() {
	var auth_stat=document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__AUTHSTAT").value;
	var confirm=document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__CONFIRM").value
	if(auth_stat=='A' && (confirm=='R'||confirm=='C')){
		showAlerts(fnBuildAlertXML('IN-IR005', 'E',"Operation not allowed."),'E');
		return false;
	}
    return true;
}

//Bug#31545562 - Start
function fnPostUnlock_KERNEL() {
	if  (gAction == 'MODIFY'){
		document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__MAKER_DT_STAMP").value='';
		document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__CHECKER_DT_STAMP").value='';
		document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__CHECKER_ID").value='';
		document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__MAKER_ID").value='';
		document.getElementById("BLK_TLTBS_ORIGINATION_TRADE_MASTER__UI_AUTH_STATUS").value='Unauthorized';
	}	
	return true;
}
//Bug#31545562 - End