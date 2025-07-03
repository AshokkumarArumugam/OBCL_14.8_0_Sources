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
**  File Name          : OLDFCREV_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**  Last Modified By   : Vineeth T M
**  Last modified on   : 31-Aug-2020
**  Reason             : Disabling add and delete row buttons on unlock
**  Search String      : OBCL_14.4_SUPP_31659592 CHANGES

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 28-Feb-2023
**  Full Version       : 
**  Reason             : Bug#34958820 - REDWOOD ADOPTION

****************************************************************************************************************************/


function fnPreAuthorize_KERNEL(){
    authFunction = 'LFDFEEAU';
    authUixml = 'LFDFEEAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LFDFEEAU'] = "KERNEL";
    ArrPrntFunc['LFDFEEAU'] = "";
    ArrPrntOrigin['LFDFEEAU'] = "";
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
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	document.getElementById("BLK_OLTBS_CONT_EVENT_LOG__MAKERID").value = "";
    document.getElementById("BLK_OLTBS_CONT_EVENT_LOG__CHECKERID").value = "";
	//Bug#34958820 changes starts
    //document.getElementById("BLK_OLTBS_CONT_EVENT_LOG__MAKERDTSTI").value = "";
    //document.getElementById("BLK_OLTBS_CONT_EVENT_LOG__CHECKERDTSTI").value = "";
	document.getElementById("BLK_OLTBS_CONT_EVENT_LOG__MAKERDTST").value = "";
    document.getElementById("BLK_OLTBS_CONT_EVENT_LOG__CHECKERDTST").value = "";
	//Bug#34958820 changes ends 
	
	//OBCL_14.4_SUPP_31659592 CHANGES start
	document.getElementById("cmdAddRow_BLK_LFTW_CONTRACT_FEE").disabled = true;
	document.getElementById("cmdDelRow_BLK_LFTW_CONTRACT_FEE").disabled = true;
	//OBCL_14.4_SUPP_31659592 CHANGES end

	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end 