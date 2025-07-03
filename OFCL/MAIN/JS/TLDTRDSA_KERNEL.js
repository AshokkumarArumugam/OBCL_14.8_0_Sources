/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : TLDTRDSQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';

    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_TLTB_MARKIT_TRD_STL_Q__BTN_AUTH"));
	   fnEnableElement(document.getElementById("BLK_TLTB_MARKIT_TRD_STL_Q__BTN_SETTLEMNT")); //27536221_automation_changes
	gAction = 'AUTH';
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	   DisableToolbar_buttons("Authorize");
	   var s = document.getElementById("BLK_HEADER__CONTRACTREFNO1").value;
       fnEnableElement(document.getElementById("BLK_TLTB_MARKIT_TRD_STL_Q__BTN_AUTH"));
	   fnEnableElement(document.getElementById("BLK_TLTB_MARKIT_TRD_STL_Q__BTN_SETTLEMNT")); //27536221_automation_changes
	 
 return true;
}

function FN_AUTH(){
    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_TLTB_MARKIT_TRD_STL_Q__BTN_AUTH"));
    fnDisableElement(document.getElementById("BLK_TLTB_MARKIT_TRD_STL_Q__BTN_SETTLEMNT")); //27536221_automation_changes	
			disableForm();
		}	
        return true;
    }
}
// 27536221_automation_changes :: starts
function fnSettleInfo(){
	fnSubScreenMain('OLCSTINF','','CVS_SETTLEMENTINFO');
	document.getElementById("BLK_TLTB_MARKIT_TRD_STL_Q__VISITED_STTL").value = 'Y';
	return true;
}
// 27536221_automation_changes :: ends
