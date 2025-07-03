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
**  File Name          : LBDCLAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Search String      : 
**  Reason             : 
**
**  Last Modified By   : Prakash Ravi
**  Last modified on   : 07-May-2020
**  Search String      : OBCL_14.1_SUPPORT_BUG#31101361
**  Reason             : Re-key field(s) value becomes non-editable when press ToggleAllOrNone checkbox in Change Log/Overrides multigrid
						 Re-key field(s) value vanishes when press Navigate button in Change Log
						 
**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES						 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	  // fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNTI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
	   gAction = 'NEW'; //OBCL_14.1_SUPPORT_BUG#31101361 
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	   DisableToolbar_buttons("Authorize");
	   var s = document.getElementById("BLK_HEADER__CONTRACTREFNO1").value;
       fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	    //fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNTI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
 return true;
}

/*function fnPostLoad_CVS_AUTH(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	document.getElementById('BLK_AUTH__CONTRACT_REF_NO').value=screenArgs.CONREF;
	fnEnableElement(document.getElementById('BLK_AUTH__BTN_AUTH'));
	gAction = "EXECUTEQUERY";
	inputScr=1;
	appending_data();
	return true;
}*/

function Fn_Auth(){
    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_HEADER__BTNAUTH"));        
			disableForm();
		}	
        return true;
    }
}

//OBCL_14.1_SUPPORT_BUG#31101361 Starts
function fnPreNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction="";
    return true;
}

function fnPostNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction='AUTH';
	fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));    
	fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY"));
    return true;
}
//OBCL_14.1_SUPPORT_BUG#31101361 Ends
