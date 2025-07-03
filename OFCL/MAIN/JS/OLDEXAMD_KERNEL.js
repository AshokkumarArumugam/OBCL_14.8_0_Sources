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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 
**  File Name          : OLDEXAMD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Neeraj Krishna
**  Last modified on   : 28-NOV-2016
**  Full Version       : OFCL_12.3.0.0.0
**  Reason             : Disabling Authorize and Delete button when the record is in authorized Status

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Full Version       : 
**  Reason             : Bug#34958820 - REDWOOD_ADOPTION
****************************************************************************************************************************/
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDEXAUT';
    authUixml = 'OLDEXAUT';
    authScreenName = 'CVS_MAIN';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDEXAUT'] = "KERNEL";
    ArrPrntFunc['OLDEXAUT'] = "";
    ArrPrntOrigin['OLDEXAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}
function fnPostExecuteQuery_KERNEL() {
if (document.getElementById("BLK_CONTRACT_EXRATE_MASTER__AUTHSTAT").value == 'A') 
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	document.getElementById("BLK_CONTRACT_EXRATE_MASTER__MAKERID").value = "";
  //document.getElementById("BLK_CONTRACT_EXRATE_MASTER__MAKERDTSTAMPI").value = ""; //Bug#34958820 changes
    document.getElementById("BLK_CONTRACT_EXRATE_MASTER__MAKERDTSTAMP").value = ""; //Bug#34958820 changes
    document.getElementById("BLK_CONTRACT_EXRATE_MASTER__CHECKERID").value = "";
  //document.getElementById("BLK_CONTRACT_EXRATE_MASTER__CHECKERDTSTAMPI").value = ""; //Bug#34958820 changes
    document.getElementById("BLK_CONTRACT_EXRATE_MASTER__CHECKERDTSTAMP").value = ""; //Bug#34958820 changes
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end