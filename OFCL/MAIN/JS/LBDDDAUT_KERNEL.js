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
**  File Name          : LBDDDAUT_KERNEL.js
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
**  Last Modified By   : Palanisamy M
**  Last modified on   : 03-Feb-2022
**  Search String      : BUG#33805591
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  Last Modified By   : Pallavi R
**  Last modified on   : 11-Feb-2022
**  Search String      : OBCL_14.5_SMTB_#33835817 Changes
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  Last Modified By   : Mohan Pal
**  Last modified on   : 11-May-2023
**  Search String      : Bug#35326704
**  Reason             : To enable pagination for the Block related to Amount Tag. Previously g_action was going as NEW.similar fix 31129011

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 08-MAY-2024
**  Search String      : Bug#36596453 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize rekey fields are disabled.

****************************************************************************************************************************/
var subScreen = 'N';

function fnPostLoad_CVS_DRAWDOWN_AUTH_KERNEL(screenArgs) {
	setTimeout( function () {  //Bug#36596453 changes
    subScreen = 'Y';
    //debugger;
    if (!fnProcessAuthOnLoad(screenArgs))
        return false;
    //OBCL_14.5_SMTB_#33835817 Changes Starts
    /*fnEnableElement(document.getElementById("BLK_HEADER__BTN_AUTH"));
	   if (document.getElementById("BLK_HEADER__REKEY_TXTCCY").value =='Y') { //Bug#33805591 added If condition	   
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_CCY"));
	   }
	   if (document.getElementById("BLK_HEADER__REKEY_TXTAMOUNT").value =='Y') { //Bug#33805591 added If condition
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_AMOUNT"));
	   }
	   if (document.getElementById("BLK_HEADER__REKEY_TXTVALDT").value =='Y') { //Bug#33805591 added If condition	   
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_VALUEDATE"));
	   }
      if (document.getElementById("BLK_HEADER__REKEY_INTRT").value =='Y') { //Bug#33805591 added If condition	   	   
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRATE"));
	  }
	   if (document.getElementById("BLK_HEADER__REKEY_TXTMATDT").value =='Y') { //Bug#33805591 added If condition	  
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_MATURITYDATE"));
	   }
	  	fnEnableElement(document.getElementById("BLK_HEADER__TXT_COUNTERPARTY")); 
	 	fnEnableElement(document.getElementById("BLK_HEADER__BTN_SETTLE")); 
		fnEnableElement(document.getElementById("BLK_HEADER__BTN_MESSAGE")); 
		fnEnableElement(document.getElementById("BLK_HEADER__BTN_PART_INT_SHARE"));*/

    //OBCL_14.5_SMTB_#33835817 Changes Ends
    //gAction = 'AUTH'; //OBCL_14.1_SUPPORT_BUG#31101361 

    gAction = 'NEW'; //OBCL_14.1_SUPPORT_BUG#31101361 
    //Handled the AUTH in fnPreNavigate function.
    fn_En_Disable_Fields(); //OBCL_14.5_SMTB_#33835817 Changes Ends
	},400); //Bug#36596453 changes 
    return true;
}

function fnPostExecuteQuery_KERNEL() {
    //debugger;
    DisableToolbar_buttons("Authorize");
    var s = document.getElementById("BLK_HEADER__CONTRACT_REF_NO1").value;
    fnEnableElement(document.getElementById("BLK_HEADER__BTN_AUTH"));
    //OBCL_14.5_SMTB_#33835817 Changes Starts
    /*fnEnableElement(document.getElementById("BLK_HEADER__TXT_CCY"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_AMOUNT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_VALUEDATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_MATURITYDATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_COUNTERPARTY")); 
	   fnEnableElement(document.getElementById("BLK_HEADER__BTN_SETTLE"));
       fnEnableElement(document.getElementById("BLK_HEADER__BTN_MESSAGE")); 
 	   fnEnableElement(document.getElementById("BLK_HEADER__BTN_PART_INT_SHARE")); */
    fn_reKey_Fields();
    //OBCL_14.5_SMTB_#33835817 Changes Ends

    return true;
}

function FN_ONAUTH() {
    var gprev = gAction;
    gAction = 'AUTH';
    if (!fnOnlineAuthorize(subScreen)) {
        var l_msgStat = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (l_msgStat == 'SUCCESS') {
            fnDisableElement(document.getElementById("BLK_HEADER__BTN_AUTH"));
            disableForm();
        }
        return true;
    }
}

function fnsettle() {
	gAction="";//Bug#35326704 ADDED
    fnSubScreenMain('OLCSTINF', '', 'CVS_SETTLEMENTINFO');
    document.getElementById("BLK_HEADER__VISITED_UI").value = 'Y';
    return true;
}

//OBCL_14.1_SUPPORT_BUG#31101361 Starts
function fnPreNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

    gAction = "";
    return true;
}

function fnPostNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {
    gAction = 'AUTH';
    //OBCL_14.5_SMTB_#33835817 Changes Starts
    /*fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXT_VALUEDATE"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXT_MATURITYDATE"));    
	fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));*/
    fn_En_Disable_Fields();
    //OBCL_14.5_SMTB_#33835817 Changes Ends
    return true;
}
//OBCL_14.1_SUPPORT_BUG#31101361 Ends
//OBCL_14.5_SMTB_#33835817 Changes Starts
function fnPostRow_onClick_BLK_CONTRACT_OVD_KERNEL() {
    fn_En_Disable_Fields();
    return true;
}

function fn_En_Disable_Fields() {
    if (document.getElementById("BLK_HEADER__REKEY_TXTCCY").value == 'Y') { //Bug#33805591 added If condition	   
        fnEnableElement(document.getElementById("BLK_HEADER__TXT_CCY"));
    }
    if (document.getElementById("BLK_HEADER__REKEY_TXTAMOUNT").value == 'Y') { //Bug#33805591 added If condition
        fnEnableElement(document.getElementById("BLK_HEADER__TXT_AMOUNT"));
    }
    if (document.getElementById("BLK_HEADER__REKEY_TXTVALDT").value == 'Y') { //Bug#33805591 added If condition	   
        fnEnableElement(document.getElementById("BLK_HEADER__TXT_VALUEDATE"));
    }
    if (document.getElementById("BLK_HEADER__REKEY_INTRT").value == 'Y') { //Bug#33805591 added If condition	   	   
        fnEnableElement(document.getElementById("BLK_HEADER__INTRATE"));
    }
    if (document.getElementById("BLK_HEADER__REKEY_TXTMATDT").value == 'Y') { //Bug#33805591 added If condition	  
        fnEnableElement(document.getElementById("BLK_HEADER__TXT_MATURITYDATE"));
    }
    fnEnableElement(document.getElementById("BLK_HEADER__BTN_SETTLE"));
    fnEnableElement(document.getElementById("BLK_HEADER__BTN_MESSAGE"));
    fnEnableElement(document.getElementById("BLK_HEADER__BTN_PART_INT_SHARE"));
    if (gAction == 'NEW')
        fnEnableElement(document.getElementById("BLK_HEADER__BTN_AUTH"));
    return true;
}
//OBCL_14.5_SMTB_#33835817 Changes Ends