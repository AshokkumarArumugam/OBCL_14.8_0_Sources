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
**  File Name          : LBDREPRC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838
**
**Changed By         : Akhila Samson
**Date               : 18-MAR-2021
**Change Description : Date format.
**Search String      : Bug#31400838
**
**Changed By         : Pallavi R
**Date               : 19-Aug-2022
**Change Description : Disabling the Reverse button on launch of the screen
**Search String      : OBCL_14.6_SMTB_#34509131 Changes

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/
//Bug#31400838 start
/*
function fnPostNew_KERNEL(){
	//document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATEI').value =document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATEI').value;//OBCL_14.3_SUPPORT_BUG#31400838 COMMENTED
	
	//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS
	document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATE').value =document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATE').value;
	fireHTMLEvent(document.getElementById("BLK_CONT_MERG_MASTER__MERGEVALUEDATE"),"onpropertychange");
	fireHTMLEvent(document.getElementById("BLK_CONT_MERG_MASTER__MERGEBOOKDATE"),"onpropertychange");
	//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES ENDS
	
	return true;	
}
*/
//Bug#31400838 end
function Fn_Calculate(){
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
 document.getElementById("BLK_CONT_MERG_MASTER__BTNCALCULATE").disabled = true;
 gAction = g_prev_gAction;
 return true; 
}
//OBCL_14.6_SMTB_#34509131 Changes Starts
/*function fnPostExecuteQuery_KERNEL(){
if ((document.getElementById("BLK_EVENT_LOG__AUTHSTAT").value == 'A') && (gAction == '')){
	EnableToolbar_buttons('Reverse'); 
		   }	
return true;
}
function fnPostFocus_KERNEL(){
if ((document.getElementById("BLK_EVENT_LOG__AUTHSTAT").value == 'A') && (gAction == '')) {
	EnableToolbar_buttons('Reverse'); 
		   }	
return true;
}*/
//OBCL_14.6_SMTB_#34509131 Changes Ends
function fnPreAuthorize_KERNEL(){
	/*if (document.getElementById("BLK_EVENT_LOG__AUTHSTATUS").value == 'A') {			
			showErrorAlerts('IN-HEAR-226');			
		   return false;
		   }*/
    authFunction = 'LBDRPAUT';
    authUixml = 'LBDRPAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDRPAUT'] = "KERNEL";
    ArrPrntFunc['LBDRPAUT'] = "";
    ArrPrntOrigin['LBDRPAUT'] = "";

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
     //screenArgs['CONREF'] = document.getElementById('BLK_CONTRACT__CONTREFNUMBER').value;
	 //screenArgs['MERGSRNO'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGESERIALNOI').value;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	 screenArgs['MERGSRNO'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGESERIALNO').value;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
    //screenArgs['BOOKDATE'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGEBOOKDATEI').value;
	//screenArgs['VALUEDATE'] = document.getElementById('BLK_CONT_MERG_MASTER__MERGEVALUEDATEI').value;
    return true;
}