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
**  File Name          : LBDSTPMP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Last Modified By   : Jayaram N
**  Last modified on   : 27-Dec-2021
**  Reason             : Code fix for automation issues
**  Search String      : PID-PNTFLX08003_P01 ITR SFRNUM:29959798_automation_issue

****************************************************************************************************************************/
var gPrevAction;
//Bug#29959798
function fnPreEnterQuery_KERNEL() {
	fnEnableElement(document.getElementById("BLK_PART_PROC_STAT__BORROWER_REF_NO"));
	fnEnableElement(document.getElementById("BLK_PART_PROC_STAT__COUNTERPARTY"));
	return true;
}

function fnMarkAll(e){
 var blockId = "BLK_STP_MARK_PROCESS_DETAIL";
 var length = getTableObjForBlock(blockId).tBodies[0].rows.length;
 var waiveAllFlag = document.getElementById("BLK_PART_PROC_STAT__TXTMARKALL").value;

 for (var idx = 0;idx < length;idx++) {
  if(waiveAllFlag){
   getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
  }
  else{
   getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-input-text")[0].value = false;
  }
 }
    return true;
}

function fnPostExecuteQuery_KERNEL() {
    debugs("In fnPostExecuteQuery", "A");
    EnableDisableAuthBtn(); 
    return true; 
}

function fnPostSave_KERNEL() {
    EnableDisableAuthBtn();
    return true;
}

function fnPostAuthorize_KERNEL() {
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	EnableDisableAuthBtn();
    debugs("In fnPostAuthorize ", "A");
    return true;
}


function EnableDisableAuthBtn()
{
    if (document.getElementById("BLK_STP_MARK_PROCESS_MASTER__AUTH_STAT").value == "A")
    {
    DisableToolbar_buttons("Authorize");
    DisableToolbar_buttons("Delete");
	DisableToolbar_buttons("Unlock"); 
	}
    if (document.getElementById("BLK_STP_MARK_PROCESS_MASTER__AUTH_STAT").value == "U")
    {
    EnableToolbar_buttons("Authorize");
    EnableToolbar_buttons("Delete");
	EnableToolbar_buttons("Unlock"); 
    }
	return true;
}


