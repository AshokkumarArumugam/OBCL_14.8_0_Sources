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
**  File Name          : LBDBLKPT_KERNEL.js
**  Purpose            : 
**  Called From        : 

**  CHANGE LOG
**  Last Modified By   : Sowmya Bitra
**  Last modified on   : 02-Mar-2021
**  Reason             : OBCL_14.5_Bulk_Payment Changes
**  
**  CHANGE LOG         : RAMYA M
**  Last modified on   : 27-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
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
    else if (msgStatus == "WARNING"){
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
		var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}	
}
function fnPopulateContracts() {
 appendData(getTableObjForBlock("TBLPageAll"));	//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES	
 gPrevAction=gAction;
 gAction='POPCONT';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnPopulateAmount() {
 appendData(getTableObjForBlock("TBLPageAll"));	//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES	
 gPrevAction=gAction;
 gAction='BLKPOP';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnAllocateAmount() {
 appendData(getTableObjForBlock("TBLPageAll"));		//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
 gPrevAction=gAction;
 gAction='BLKALLOC';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnSumAmount() {
 appendData(getTableObjForBlock("TBLPageAll"));		//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
 gPrevAction=gAction;
 gAction='BLKSUM';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
function fnDisableButtons() {
 DisableToolbar_buttons("Authorize");
 DisableToolbar_buttons("Delete");
 DisableToolbar_buttons("Copy");
 DisableToolbar_buttons("Close");
 DisableToolbar_buttons("Unlock");
 DisableToolbar_buttons("Reopen");
 DisableToolbar_buttons("Print");
 DisableToolbar_buttons("Reverse");
 return true;
}
function fnPostExecuteQuery_KERNEL() {
 fnDisableButtons();
 return true;
}
function fnPostSave_KERNEL() { 
 fnDisableButtons();
 return true;
}

