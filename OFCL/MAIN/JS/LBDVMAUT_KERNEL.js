/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : LBDVMAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**
**  Last Modified By   : Prakash Ravi
**  Last modified on   : 07-May-2020
**  Search String      : OBCL_14.1_SUPPORT_BUG#31101361
**  Reason             : Re-key field(s) value becomes non-editable when press ToggleAllOrNone checkbox in Change Log/Overrides multigrid
						 Re-key field(s) value vanishes when press Navigate button in Change Log
						 
**  Last Modified By   : Pallavi R
**  Last modified on   : 29-Apr-2022
**  Search String      : OBCL_14.5_SMTB_#34094340 Changes
**  Reason             : Not able to auth during overrides because of action was made new(#31101361)		

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 02-Jun-2022
**  Search String      : Bug#34958820 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize when we have overrides as event_seq_no field value is assinged as true so commenting the assignment.

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 15-May-2024
**  Search String      : Bug#36619894 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 

****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTHVAMI_KERNEL(screenArgs) {
	setTimeout( function () { //Redwood_changes_1
    subScreen = 'Y'; 
   document.getElementById("BLK_AUTH_REKEY__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	//OBCL_14.5_SMTB_#34094340 Changes Starts
	fn_En_Disable_Fields();
	
    /*document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = false; 
    document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = false;
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__CCY"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__VALDT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__MATDT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__AMT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRATEAMT"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__TXTCOUNTERPARTY"));
    
	gAction = 'NEW';
	var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows;  
    for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }*/
	   //OBCL_14.5_SMTB_#34094340 Changes Ends
	},400); //Redwood_changes_1
	return true;
}


function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {			
			document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = true; 
            document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = true;
			// SFR-13478375 ends 
			disableForm();
		}		
		//gAction = gprev;//OBCL_14.5_SMTB_#34094340 Changes
        return;
    }
}

function fnOnlineReject() {
    var gprev = gAction;
    
	 gAction = 'LD_REJECT';  
   
    if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
			
			document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = true; 
            document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = true;
			
			// SFR-13478375 ends 
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}

function fnPostExecuteQuery_KERNEL()
{
   
//OBCL_14.5_SMTB_#34094340 Changes Starts
/*fnEnableElement(document.getElementById("BLK_AUTH_REKEY__CCY"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__VALDT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__MATDT"));
   fnEnableElement(document.getElementById("BLK_AUTH_REKEY__AMT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRATEAMT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__TXTCOUNTERPARTY"));
    
	var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows;  
    for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = false; 
    document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = false;
    // SFR-13478375 Ends*/
	fn_En_Disable_Fields();
	//OBCL_14.5_SMTB_#34094340 Changes Ends
    return true;
}
//OBCL_14.5_SMTB_#34094340 Changes Starts
/*
//OBCL_14.1_SUPPORT_BUG#31101361 Starts
function fnPreNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {
	//gAction="";
	fn_En_Disable_Fields();
    return true;
}

function fnPostNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	/*gAction='AUTH'; 
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRATEAMT"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__TXTCOUNTERPARTY"));
	fn_En_Disable_Fields();
    return true;
}
//OBCL_14.1_SUPPORT_BUG#31101361 Ends
*/
function fnPreNavigate_BLK_CONTRACT_OVD_KERNEL() { 
	fn_En_Disable_Fields();
    return true;
}
function fnPostNavigate_BLK_CONTRACT_OVD_KERNEL() {	 
	fn_En_Disable_Fields();
    return true;
}
function fnPostRow_onClick_BLK_CONTRACT_OVD_KERNEL() {
    fn_En_Disable_Fields();
    return true;
}
function fnPreNavigate_BLK_CONTRACT_CHANGE_LOG_KERNEL() { 
	fn_En_Disable_Fields();
    return true;
}
function fnPostNavigate_BLK_CONTRACT_CHANGE_LOG_KERNEL() {	 
	fn_En_Disable_Fields();
    return true;
}
function fnPostRow_onClick_BLK_CONTRACT_CHANGE_LOG_KERNEL() {
    fn_En_Disable_Fields();
    return true;
}
function fn_En_Disable_Fields() {
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__CCY"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__VALDT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__MATDT"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__AMT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRATEAMT"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__TXTCOUNTERPARTY"));
	//Bug#36619894 changes starts
	//var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_CONTRACT_OVD");
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 //getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true; Bug#34958820 - REDWOOD ADOPTION CHANGES
		 fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	   document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = false; 
       document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = false;
}		
//OBCL_14.5_SMTB_#34094340 Changes Ends