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
**  File Name          : OLDPLMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**Changed By         : Chandra Achuta
**Changed On         : 20-FEB-2023
**Search String      : BUG#35102840
**Change Reason      : Added code for passing the correct block_name and filed_name
  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 08-Mar-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 08-Mar-2023
**  Reason             : REDWOOD_ADOPTION changes - Disabling the functionality of defaulting the authorization role mapping 
**  Search String      : Bug#36950583
****************************************************************************************************************************/

var gErrCodes = "";

function fnPreUnlock_KERNEL() {
	var unlock = true;
	debugs("In fnPreUnlock_KERNEL()", "A");
	return unlock;
}
function fnPostLoad_KERNEL() {
fnDisableElement('BLK_OLTM_AUTH_ROLE_MAP');

return true;
}


function fnPostUnlock_KERNEL() { 
//fnDisableElement(document.getElementById("cmdAddRow_BLK_OLTM_AUTH_ROLE_MAP"));	
//fnDisableElement(document.getElementById("cmdDelRow_BLK_OLTM_AUTH_ROLE_MAP"));	
	debugs("In fnPostUnlock", "A");
    //BUG#35102840  Changes Starts
	//showPageWise(document.getElementById('BLK_OLTM_PROD_TXN_AUTH_LIM'), 'BLK_OLTM_PROD_TXN_AUTH_LIM', null);
	showPageWise(document.getElementById('BLK_OLTM_PROD_TXN_AUTH_LIMITS'), 'BLK_OLTM_PROD_TXN_AUTH_LIMITS', null);
	//BUG#35102840  Changes Ends
}

function fnPostCopy_KERNEL() { 
//fnDisableElement(document.getElementById("cmdAddRow_BLK_OLTM_AUTH_ROLE_MAP"));	
//fnDisableElement(document.getElementById("cmdDelRow_BLK_OLTM_AUTH_ROLE_MAP"));	
}


function fnPreSave_KERNEL() {
	if(!fnValidate())
        return false;
	debugs("In fnPreSave", "A");	
	var isValid = true;

	if (!isValid) {		
		var msg = buildMessage(gErrCodes);
		alertMessage(msg);
		return false;
	}
	return isValid;	
}

function fnPostSave_KERNEL() {
	debugs("In fnPostSave", "A");
	return true;
}

function fnPostNew_KERNEL() {
//fnDisableElement(document.getElementById("cmdAddRow_BLK_OLTM_AUTH_ROLE_MAP"));	
//fnDisableElement(document.getElementById("cmdDelRow_BLK_OLTM_AUTH_ROLE_MAP"));	
fnDisableElement(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__FOLLOW_SEQUENCE"));
return true;
}

//BUG#35102840  Changes Starts
//function fnPostAddRow_BLK_OLTM_PROD_TXN_AUTH_LIM_KERNEL() {
function fnPostAddRow_BLK_OLTM_PROD_TXN_AUTH_LIMITS_KERNEL() {
//fnDisableElement(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTHORIZATION"));	
fnDisableElement(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTH"));
//if (document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTHORIZATION").value) {
//Bug#36950583 changes
/*if (document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTH").value) {	
//BUG#35102840  Changes Ends
fnAddRow('BLK_OLTM_AUTH_ROLE_MAP');
 //var tableRef = document.getElementById("BLK_OLTM_AUTH_ROLE_MAP"); //Bug#34958820 changes
 var tableRef = getTableObjForBlock("BLK_OLTM_AUTH_ROLE_MAP"); //Bug#34958820 changes
fnAddRow('BLK_OLTM_AUTH_ROLE_MAP');
 
fnDisableElement(document.getElementById("cmdAddRow_BLK_OLTM_AUTH_ROLE_MAP"));	
fnDisableElement(document.getElementById("cmdDelRow_BLK_OLTM_AUTH_ROLE_MAP"));	

 //tableRef.tBodies[0].rows[0].cells[1].getElementsByTagName("oj-select-single")[0].value ='P';
//tableRef.tBodies[0].rows[1].cells[1].getElementsByTagName("oj-select-single")[0].value ='A'; 
 setTimeout( function () {   //REDWOOD_ADOPTION
 getTableObjForBlock("BLK_OLTM_AUTH_ROLE_MAP").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-select-single")[0].value ='P';
 getTableObjForBlock("BLK_OLTM_AUTH_ROLE_MAP").tBodies[0].rows[1].cells[1].getElementsByTagName("oj-select-single")[0].value ='A';
   },100); //REDWOOD_ADOPTION
} */
//Bug#36950583 changes ends 
}
   
//BUG#35102840  Changes Starts   
//function fnPostDeleteRow_BLK_OLTM_PROD_TXN_AUTH_LIM_KERNEL() {
function fnPostDeleteRow_BLK_OLTM_PROD_TXN_AUTH_LIMITS_KERNEL() {
//var tableRef = document.getElementById("BLK_OLTM_PROD_TXN_AUTH_LIM");
//var tableRef = document.getElementById("BLK_OLTM_PROD_TXN_AUTH_LIMITS");//Bug#34958820 changes
var tableRef = getTableObjForBlock("BLK_OLTM_PROD_TXN_AUTH_LIMITS");//Bug#34958820 changes
//BUG#35102840  Changes Ends
    var noOfRows = tableRef.tBodies[0].rows;
	if (noOfRows.length < 1 ) {
		     //BUG#35102840  Changes Starts
			//fnEnableElement(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTHORIZATION"));
			fnEnableElement(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTH"));
			//BUG#35102840  Changes Ends
			}		


}

function fnauthorization(){  
//BUG#35102840  Changes Starts
//if(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTHORIZATION").value)
if(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__ROLE_BASED_AUTH").value)
//BUG#35102840  Changes Ends	
{
fnEnableElement(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__FOLLOW_SEQUENCE"));
}
else
{
document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__FOLLOW_SEQUENCE").value = false;
fnDisableElement(document.getElementById("BLK_OLTM_PROD_TXN_LIMITS__FOLLOW_SEQUENCE"));

}
return true;
}