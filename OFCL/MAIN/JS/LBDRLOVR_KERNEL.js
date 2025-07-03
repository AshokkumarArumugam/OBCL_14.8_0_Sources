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
**  File Name          : LBDRLOVR_KERNEL.js
**  Purpose            : 
**  Called From        : 

   Changed By         : Satheesh Seshan
   Changed On         : 09-Oct-2024
   Change Description : included 36935011 as part of 37143176 to address LB
   Search String      : Bug#36935011
   
  **Changed By         : RAMYA M
  **Date               : 09-OCT-2024
  **Change Description : LS_Version_rollover_amend_changes
  **Search String      : Bug#36935011_Bug#36935011_OBCL_14.8_LS_Version_rollover_amend_changes
  
  **Changed By         : Sowmya Bitra
  **Date               : 11-NOV-2024
  **Change Description : Version Rollover Reversal Changes for LS
  **Search String      : OBCL_14.8_LS_Version_Rollover_Revv changes
  
   Changed By         : Palanisamy Muthukumar	
   Changed On         : 08-Jan-2025
   Change Description : Updated logic to ensure fields are enabled when the DD tab is opened
   Search String      : Bug#37435014  
****************************************************************************************************************************/
var defClicked = "N";
function fnPostNew_KERNEL() {
	expandcontent('TAB_VERROLL');
    defClicked = "N";
	setTimeout(function(){ //bug#36935011
    document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__ROLLBOOKDATE").value = mainWin.AppDate;
    document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__VALDATE").value = mainWin.AppDate;
	},0); //bug#36935011
    document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__CONTREFNO").focus();
}
function fnPopulateOS() {
    g_prev_gAction = gAction;
    gAction = 'POPULATEOS';
    appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    setDataXML(getXMLString(pureXMLDOM));
    showData("BLK_OLTBS_CONTRACT_VERSION_ROLL", 1);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
            gAction = g_prev_gAction;
            return false;
        }
        else if (msgStatus == "WARNING") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
    fnClassDefault('BLK_OLTBS_CONTRACT');
    gAction = g_prev_gAction;
    return true;

}
function fnDefaultRollRenog() {
    g_prev_gAction = gAction;
    gAction = 'PRDDFLT';
    processingAction = 'DefaultRoll';
    appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    setDataXML(getXMLString(pureXMLDOM));
    showData("BLK_OLTBS_CONTRACT", 1);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
            gAction = g_prev_gAction;
            return false;
        }
        else if (msgStatus == "WARNING") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }else if (msgStatus == "SUCCESS") {
            fnMoveToMain();
        }
    }
    gAction = g_prev_gAction;
		// Bug#36935011_OBCL_14.8_LS_Version_rollover_amend_changes
	if (gAction=='MODIFY')
	{
	gAction='NEW';
			}
// Bug#36935011_OBCL_14.8_LS_Version_rollover_amend_changes
  			
    return true;
	
}
//will be called on accepting overrides of default btn
function fnDefaultRollSuccess(){
    fnMoveToMain();
}
function fnInTab_TAB_VERROLL_KERNEL() {
    if (defClicked == "Y"){
        disableForm(document.getElementById("TBLPageTAB_VERROLL"));
    }
}
function fnMoveToMain(){
    defClicked = "Y";
    fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__CONTREFNO"));
    enableTabs("TAB_DD~TAB_PREF~TAB_CONTRACT~TAB_SCH~TAB_LINK~TAB_HOLIDAY_PREFERENCES","~");
    expandcontent('TAB_DD');
	// Bug#37435014 Change Starts
    setTimeout(function () {
        document.getElementById("TAB_DD").click();
    }, 0);	
	// Bug#37435014 Change ends
}
function fnPostEnterQuery_KERNEL() {
	expandcontent('TAB_VERROLL');
	return true;
}
function fnPostExecuteQuery_KERNEL() {
	gEnableButton = true;
	expandcontent('TAB_VERROLL');
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT")); 
    DisableToolbarBtns();
	return true;
}
function fnPostLoad_KERNEL() {
    DisableToolbarBtns();
    return true;
}
function DisableToolbarBtns() {
    var rollValDate = Date.parse(document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__VALDATE").value) ;
    var appDate =  Date.parse(mainWin.AppDate);
    if(rollValDate > appDate){
        DisableToolbar_buttons("Rollover");
    }
    DisableToolbar_buttons("Copy");
    if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXNSTAT").value == "L") {
        DisableToolbar_buttons("Rollover");
        //DisableToolbar_buttons("Reverse"); //OBCL_14.8_LS_Version_Rollover_Revv changes commented
        DisableToolbar_buttons("Unlock");
    }
    return true;
}
