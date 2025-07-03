/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2019, Oracle and/or its affiliates.
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
**  File Name          : OLDEAMTR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var g_prev_gAction;
function fn_Refresh(){
	gAction = "EXECUTEQUERY";
    fnExecuteQuery();
    return true;
}
function fn_Skip(){
	g_prev_gAction = gAction;
	gAction = 'SKIP';
	appendData();
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP"));
        if (msgStatus == "FAILURE") {            
			var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
			gAction = g_prev_gAction;
			return false;
        } else if (msgStatus == "WARNING" ) {
            var returnVal = displayResponse(messageNode,msgStatus,'O');            
        }
		else if ( msgStatus == "SUCCESS") {              
			var returnVal = displayResponse(messageNode,msgStatus,'I');
            }
        }
	return true; 
}
function fnPostExecuteQuery_KERNEL(){
	debugger;
	fnEnableElement(getElementsByOjName('BTN_REFRESH')[0]); 
	if (!(document.getElementById("BLK_EAMTR__SKIP").value)){
		fnEnableElement(getElementsByOjName('BTN_SKIP')[0]);  
	}
	else{
		fnDisableElement(getElementsByOjName('BTN_SKIP')[0]);  
	}
	return true;
}
