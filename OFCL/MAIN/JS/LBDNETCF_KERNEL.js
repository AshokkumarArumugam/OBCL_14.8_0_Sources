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
**  File Name          : LBDNETCF_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostExecuteQueryMain(){
	document.getElementById('BLK_LBTBS_CASHFLOW_NETTING_MASTER__BTN_RESOLVE').disabled = false;
        return true;
}

function fnPostEnterQueryMain(){
	document.getElementById('BLK_LBTBS_CASHFLOW_NETTING_MASTER__BTN_RESOLVE').disabled = true;
        return true;
}

function fnResolveCashflow(){
	gAction = 'RESOLVENETTING';
        appendData();
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		
 // OBCL_14.4_LS Netting changes start
	//var msgStatus = fnProcessResponse();
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
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	gAction = g_prev_gAction;
	return true;
// OBCL_14.4_LS Netting changes end

}
function fnPostLoad_Sum_KERNEL(e) {
    //debugger;	
    if (typeof(parent.screenArgs) != 'undefined') {
        document.getElementById("BLK_SUMMARY__TRANCHEREFNO").value = parent.screenArgs['TRANCHEREFNO'];
		fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;               
	}
	return true;
}
