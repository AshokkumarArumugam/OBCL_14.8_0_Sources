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
**  Last Modified By   : Akhila Samson
**  Last modified on   : 31-May-2021
**  Change Description : Fix is provided to remove add/delete option from settlement multigrid. 
**  Search String      : Bug#32915428 
****************************************************************************************************************************/

var gPrevAction;

function fnPostUnlock_KERNEL() { 
	getElementsByOjName('cmdAddRow_BLK_CONTRACT_BORROWERS')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_CONTRACT_BORROWERS')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdAddRow_BLK_BORR_SETTLE_CURR_DET')[0].style.visibility = 'hidden'; //Bug#32915428
	getElementsByOjName('cmdDelRow_BLK_BORR_SETTLE_CURR_DET')[0].style.visibility = 'hidden'; //Bug#32915428
	return true;
}

/* function fnPostLoad_KERNEL() {
	getElementsByOjName('cmdAddRow_BLK_CONTRACT_BORROWERS')[0].style.visibility = 'hidden';
	return true;
} */

function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDBRMAU';
    authUixml = 'LBDBRMAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDBRMAU'] = "KERNEL";
    ArrPrntFunc['LBDBRMAU'] = "";
    ArrPrntOrigin['LBDBRMAU'] = "";
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