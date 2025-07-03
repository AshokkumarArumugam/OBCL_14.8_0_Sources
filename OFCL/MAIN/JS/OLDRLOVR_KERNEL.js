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
**  File Name          : OLDRLOVR_KERNEL.js
**  Purpose            : 
**  Called From        : 

    **Changed By         : RAMYA M
	**Date               : 25-July-2024
	**Change Description :VERSION ROLL PRODUCT CHANGES DURING AMEND
	**Search String      : OBCL_14.8_VERSION_ROLL_DEL_AMEND CHANGES
	
	**Changed By         : Vineeth T M
	**Date               : 14-Aug-2024
	**Change Description : Move to rollover tab on clicking new
	**Search String      : bug#36935011 changes
	
  **Changed By         : Palainsamy M
  **Date               : 13-NOV-2024
  **Change Description : Version Rollover Reversal Changes for OL
  **Search String      : OBCL_14.8_OL_Version_Rollover_Revv changes	
****************************************************************************************************************************/
var defClicked = "N";
function fnPostNew_KERNEL() {
	expandcontent('TAB_VERROLL');//bug#36935011 changes
    defClicked = "N";
	setTimeout(function(){//bug#36935011 changes
    document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__ROLLBOOKDATE").value = mainWin.AppDate;
    document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__VALDATE").value = mainWin.AppDate;
	},0);//bug#36935011 changes
    document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__CONTREFNO").focus();
}
function fnPopulateOS() {
    //console.log("fnPopulateOS....");
    g_prev_gAction = gAction;
    gAction = 'POPULATEOS';
    appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    /* if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    } */
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
    //console.log("fnDefaultRollRenog....");
    g_prev_gAction = gAction;
    gAction = 'PRDDFLT';
    processingAction = 'DefaultRoll';
    appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    /* if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    } */
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
    //fnClassDefault('BLK_OLTBS_CONTRACT');
    gAction = g_prev_gAction;
	//OBCL_14.8_VERSION_ROLL_DEL_AMEND CHANGES
	if (gAction=='MODIFY')
	{
	gAction='NEW';
			}
    return true;
	//OBCL_14.8_VERSION_ROLL_DEL_AMEND CHANGES
}
//will be called on accepting overrides of default btn
function fnDefaultRollSuccess(){
    fnMoveToMain();
}
function fnInTab_TAB_VERROLL_KERNEL() {
    //console.log("fnInTab_TAB_VERROLL_KERNEL...." + defClicked);
    if (defClicked == "Y"){
        disableForm(document.getElementById("TBLPageTAB_VERROLL"));
    }
}
function fnMoveToMain(){
    defClicked = "Y";
    fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_VERSION_ROLL__CONTREFNO"));
    enableTabs("TAB_MAIN~TAB_PREFERENCE~TAB_SCHEDULES~TAB_LINKAGES","~");
    expandcontent('TAB_MAIN');
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
	/* if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
		fnDisableSubSysButtons(document.getElementById("LBCBADTL"));  
	} */
    DisableToolbarBtns();
    //console.log("return true from fnPostExecuteQuery_KERNEL" );
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
        //DisableToolbar_buttons("Reverse"); //OBCL_14.8_OL_Version_Rollover_Revv changes commented
        DisableToolbar_buttons("Unlock");
    }
    return true;
}