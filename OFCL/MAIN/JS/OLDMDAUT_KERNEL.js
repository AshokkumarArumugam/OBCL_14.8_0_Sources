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
**  File Name          : OLDMDAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Full Version       : 
**  Reason             : Bug#34958820 - REDWOOD ADOPTION
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));  //Bug#34958820
     //fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNTI")); Bug#34958820 changes
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	 DisableToolbar_buttons("Authorize");
	 var s = document.getElementById("BLK_HEADER__CONTRACTREFNO1").value;
     fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));    //Bug#34958820
     //fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNTI")); Bug#34958820 changes
	 fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	 fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	 fnEnableElement(document.getElementById("BLK_HEADER__BTNSETLINFO"));  	 
	return true;
}

function Fn_OnAuth(){
	debugger;
    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
			var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			if (l_msgStat == 'SUCCESS') {		  
				fnDisableElement(document.getElementById("BLK_HEADER__BTNAUTH"));        
				disableForm();
			}	
			if (l_msgStat == 'FAILURE') {
				gAction = gprev ;
			}
		return true;
    }
}

function fnSettleInfo(){
	fnSubScreenMain('OLCSTINF','','CVS_SETTLEMENTINFO');
	document.getElementById("BLK_HEADER__VISITED_UI").value = 'Y';
	return true;
}