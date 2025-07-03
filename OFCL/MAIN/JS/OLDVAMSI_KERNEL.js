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
**  File Name          : OLDVAMSI_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   :  Vigneshram S
**  Last modified on   :  12-Nov-2018
**  Serach string      :  28905080
**  Reason             :  Assign a amendement date in VAMI simulation screen

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**Changed By         : Mohan Pal
**Date               : 05-Apr-2023
**Change Description : Assigning ammendment value date field with the application date of the Transaction Branch.
**Search String      : Bug#36401952

****************************************************************************************************************************/
var gPrevAction;
var visited = false;

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	DisableToolbar_buttons("Reverse");
	DisableToolbar_buttons("Authorize");
	visited = false;
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAYMENT_DETAILS")); //OBCL_14.3_PMT_DETAILS
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REVISION_DETAILS")); //OBCL_14.3_PMT_DETAILS	
	return true; 
}
function fnPostAuthorize_KERNEL() {
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Reverse");
	DisableToolbar_buttons("Authorize");
	return true; 
}
function fnPostSave_KERNEL() {
	debugs("In fnPostSave", "A");
	DisableToolbar_buttons("Reverse");
	DisableToolbar_buttons("Authorize");
	DisableToolbar_buttons("Unlock");
	visited = true;
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAYMENT_DETAILS")); //OBCL_14.3_PMT_DETAILS
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REVISION_DETAILS")); //OBCL_14.3_PMT_DETAILS	
	return true; 
}
function fnPostFocus_KERNEL() {
	if (visited == true) {
DisableToolbar_buttons("Unlock");
DisableToolbar_buttons("Authorize");
	}
    return true;
}

function fnPreUnlock_KERNEL() {
document.getElementById("BLK_CONTRACT_MASTER__NEWMATTYPE").value = ""; 	
document.getElementById("BLK_CONTRACT_MASTER__NEWMATTYPE").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = "";
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__TENORBSDSPRD").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLMATDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLMATDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLEFFTDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLEFFTDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__NEWMATDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__NEWMATDT").value = "";
document.getElementById("BLK_CONTRACT_MASTER__REASCODE").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__REMARK").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__REPGMFLAG").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__LCYEQVFORINDXLCY").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__LCYEQVFORINDXLCY").value = "";

//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.curDate;	  //28905080 //Bug#36401952 Commented
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.curDate;//Bug#36401952 Commented

document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.txnBranch[g_txnBranch].AppDate;//Bug#36401952 Added
document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.txnBranch[g_txnBranch].AppDate;//Bug#36401952 Added

//document.getElementById("BLK_CONT_REV_SCH_BTN__BTN_REVSHDAPPLY").disabled = false; 
fnEnableElement(document.getElementById("BLK_CONT_REV_SCH_BTN__BTN_REVSHDAPPLY"));
	appendData();

	var PCode = (document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value);
	var ProcessCode = PCode.substring(PCode.length - 4);
	var UnauthFunctionId;
	if (ProcessCode != 'AMND'){
		if (ProcessCode == 'REVP' || ProcessCode == 'PMNT') {
			UnauthFunctionId ='OLDPMNT';
		}
		else if (PCode == 'LDREVC' || PCode == 'LDBOOK' ||PCode == 'LDCAMD' || PCode == 'LDINIT' ||PCode == 'LDROLL' || PCode == 'LDRAMD'){
			UnauthFunctionId ='OLDTRONL';
		}
		else if (ProcessCode == 'RFND'){
			UnauthFunctionId ='OLDREFND';
		}
		else if(PCode == 'OLFEE')
		{
			UnauthFunctionId ='LFDACFIN';
		}
		else if(PCode == 'LDMSC')
		{
			UnauthFunctionId ='OLDMSCDT';
		}
		else {
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
            }
		}
        //OBCL_14.4_SUPPORT_BUG#31527262 start
	    document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHBY").value = "";
	    document.getElementById("BLK_CONTRACT_EVENT_LOG__INPUTBY").value = "";
	    document.getElementById("BLK_CONTRACT_EVENT_LOG__CK_DTSTAMP").value = "";
	    document.getElementById("BLK_CONTRACT_EVENT_LOG__MK_DTSTAMP").value = "";
	    //OBCL_14.4_SUPPORT_BUG#31527262 end
return true;
}

//Bug No 26833234 Changes Start
			
function fnPostLoad_CVS_PTMTDET_KERNEL(screenArgs) {
	document.getElementById("cmdAddRow_BLK_AMOUNT_DUE").disabled = true; 
	document.getElementById("cmdDelRow_BLK_AMOUNT_DUE").disabled = true; 
	return true;
}

function fnPostLoad_CVS_REVSCHD_KERNEL(screenArgs) {
	document.getElementById("cmdAddRow_BLK_CONTRACT_REVISION_SCH").disabled = true;
	document.getElementById("cmdDelRow_BLK_CONTRACT_REVISION_SCH").disabled = true; 
 	return true;
}
		
//Bug No 26833234 Changes Ends

function fnRevShdApply(){
	g_prev_gAction = gAction;	
	gAction = 'REVSHDAPPLY';
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
		 gAction = g_prev_gAction;
        return false;
    }
 gAction = g_prev_gAction;
 return true; 
}

