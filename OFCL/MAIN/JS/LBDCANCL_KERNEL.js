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
**  File Name          : LBDCANCL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 27-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/
var gDisableschblock= false;
var gEnableButton = false;
var gPrevAction;
var gDisablerdfschButton= false;

function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDCLAUT';
    authUixml = 'LBDCLAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDCLAUT'] = "KERNEL";
    ArrPrntFunc['LBDCLAUT'] = "";
    ArrPrntOrigin['LBDCLAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL() {
	debugs("In fnPostAuthorize", "A");
    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}

function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = getTableObjForBlock('BLK_CONTRACT_TC__CONTRACTREFNO').value;    //BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
    return true;
}

function EnableDisableAuthBtn()
{
  if (getTableObjForBlock("BLK_AUDIT__AUTHSTATUS").value == "A")//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
  if (getTableObjForBlock("BLK_AUDIT__AUTHSTATUS").value == "U")//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
{
EnableToolbar_buttons("Authorize");
EnableToolbar_buttons("Delete");
}
return true;
}

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	EnableDisableAuthBtn(); 
	return true; 
}
