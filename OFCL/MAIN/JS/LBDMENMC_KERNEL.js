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
**  File Name          : LBDMENMC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Ch Srinivasulu
**  Last modified on   : 11-Jul-2019
**  Full Version       : 
**  Reason             : Added participant serach field to query the participants

**  Modified By   		: Abhinav Kumar
**  Modified on   		: 08-Oct-2024
**	Modified Reason	   	: Added code to disable Settlement Seq Number field as the same is populated from LOV		 
**  Bug no     			: Bug#37146786
****************************************************************************************************************************/

var gPrevAction;
//Bug#29959798
function fnPreEnterQuery_KERNEL() {
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MNMIC__PARTSEARCH"));
	return true;
}
//Bug#29959798
function fnPostUnlock_KERNEL() { 
	getElementsByOjName('cmdAddRow_BLK_CONTRACT_PARTICIPANT')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_CONTRACT_PARTICIPANT')[0].style.visibility = 'hidden';
    
    //Bug#29959798 starts
    getElementsByOjName('cmdAddRow_BLK_PART_SETTLE_CURR_TEMP')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_PART_SETTLE_CURR_TEMP')[0].style.visibility = 'hidden';
    //Bug#29959798 ends
    //Bug#37146786 Starts
	var i = 0;
    var tableRef = document.getElementById("BLK_PART_SETTLE_CURR_TEMP");
    var rows = tableRef.tBodies[0].rows;
    var len = rows.length;
	if (len > 0) 
	{
		for (i = 0; i < len; i++) 
		{	
			fnDisableElement(document.getElementsByName('SETSEQNO')[i]);
		}
	}
	//Bug#37146786 Ends
	return true;
}

/* function fnPostLoad_KERNEL() {
	getElementsByOjName('cmdAddRow_BLK_CONTRACT_BORROWERS')[0].style.visibility = 'hidden';
	return true;
} */

function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDMNAUT';
    authUixml = 'LBDMNAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDMNAUT'] = "KERNEL";
    ArrPrntFunc['LBDMNAUT'] = "";
    ArrPrntOrigin['LBDMNAUT'] = "";
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
}
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHSTATUS").value == "A")
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
  if (document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHSTATUS").value == "U")
{
EnableToolbar_buttons("Authorize");
}
return true;
}
function fnPostExecuteQuery_KERNEL(){
  DisableToolbar_buttons("Close");
  EnableDisableAuthBtn();
  
  return true;
}
//Bug#37146786 Starts
function fnPostFocus_KERNEL() {
    
	var i = 0;
    var tableRef = document.getElementById("BLK_PART_SETTLE_CURR_TEMP");
    var rows = tableRef.tBodies[0].rows;
    var len = rows.length;
	if (len > 0) 
	{
		for (i = 0; i < len; i++) 
		{	
			fnDisableElement(document.getElementsByName('SETSEQNO')[i]);
		}
	}

    return true;
}
//Bug#37146786 Ends