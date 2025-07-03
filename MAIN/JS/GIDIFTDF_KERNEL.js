/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2020, Oracle and/or its affiliates.
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
**  File Name          : GIDIFTDF_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**Modified By         : Sudheer
**Modified On         : 14-03-2018
**Modified Reason     : GIDIFTDF Non Ext to EXT converions
**
** Modified By      : Alam
** Modified On      : 05-Jul-2019
** Modified Reason  : Schedule changes
** Search String    : JCROFC_Minicore_Integration_Remediation_Fix

** Modified By      : Srinivasan Perumal
** Modified On      : 22-SEP-2021
** Modified Reason  : Fix added to ensure to validate for interface type is Incoming, then user cannot choose format type as  
						"Delimited (without end trail)".
** Search String    : FCUBS14.6->CSNL->SUMITOMO_MITSUI_TRUST_BANK_BugId#33165850
****************************************************************************************************************************/
var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";
function fnPreLoad_KERNEL() {
	debugs( "In fnPreLoad", "A");
	return true;
}

function fnPostLoad_KERNEL() {
	debugs( "In fnPostLoad", "A");
	return true;
}
function fnPreNew_KERNEL() {
	var newAction = true;
	debugs( "In fnPreNew", "A");
	return newAction;
}
function fnPostNew_KERNEL() {
	debugs( "In fnPostNew", "A");	
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__BRANCH_CODE").value=mainWin.CurrentBranch;
        if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").checked == true){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
    else{
   document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
    
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value == 'R'){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    }
    else if (document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value == 'P'){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    
    }else{
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
    
    
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FORMAT_TYPE").value == 'F'){
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION").value = 'L';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION").value = 'L';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION").value = 'R';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER").value = '*';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER").value = '*';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER").value = '$';

        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER"));

    }else{
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION").value  = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER").value = "";
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER"));
    }
    
    
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE").value == 'O'){
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = "";
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }else{
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = 'New';
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = 'R';
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK").value = ""; 
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }
  fnValidateType_KERNEL();  
    
}
function fnPreUnlock_KERNEL() {
	var unlock = true;
	debugs( "In fnPreUnlock", "A");
	return unlock;
}
function fnPostUnlock_KERNEL() {
	debugs( "In fnPostUnlock", "A");
    /* 
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").checked == true){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
    else{
   document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
    
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value == 'R'){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    }
    else if (document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value == 'P'){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    
    }else{
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
    */
    
    /*
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FORMAT_TYPE").value == 'F'){
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION").value = 'L';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION").value = 'L';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION").value = 'R';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER").value = '*';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER").value = '*';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER").value = '$';

        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER"));

    }else{
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION").value  = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER").value = "";
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER"));
    }
    
    /*
    
     if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE").value == 'O'){
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").value = "";
         document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE").value = "";
         document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = "";
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }else{
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = 'New';
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = 'R';
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK").value = ""; 
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }
    */
   
   // fnValidateType();
   if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE").value == 'O'){
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").value = "";
         document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE").value = "";
         document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = "";
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }
    fnEnableDisableScheduleFields_KERNEL(); //JCROFC_Minicore_Integration_Remediation_Fix
  }
function fnPreAuthorize_KERNEL() {
	var authorize = true;
	debugs("In fnPreAuthorize", "A");
	return authorize;
}
function fnPostAuthorize_KERNEL() {
	debugs("In fnPostAuthorize", "A");
}
function fnPreCopy_KERNEL() {
	var copy = true;
	debugs("In fnPreCopy", "A");
	return copy;
}
function fnPostCopy_KERNEL() {
	debugs("In fnPostCopy", "A");

    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE").value == 'O'){
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = "";
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }else{
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = 'New';
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = 'R';
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK").value = ""; 
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }
 fnValidateType_KERNEL();
}
function fnPreClose_KERNEL() {
	var close = true;
	debugs("In fnPreClose", "A");
	return close;
}
function fnPostClose_KERNEL() {
	debugs("In fnPostClose", "A");
}
function fnPreReOpen_KERNEL() {
	var reOpen = true;
	debugs("In fnPreReOpen", "A");
	return reOpen;
}
function fnPostReOpen_KERNEL() {
	debugs("In fnPostReOpen", "A");
}
function fnPreDelete_KERNEL() {
	var deleteAction = true;
	debugs("In fnPreDelete", "A");
	return deleteAction;
}

function fnPostDelete_KERNEL() {
	debugs("In fnPostDelete", "A");
}

function fnPreEnterQuery_KERNEL() {
	var execute = true;
	debugs("In fnPreEnterQuery", "A");
	return execute;
}

function fnPostEnterQuery_KERNEL() {
	debugs("In fnPostEnterQuery", "A");
}

function fnPreExecuteQuery_KERNEL() {
	var execute = true;
	debugs("In fnPreExecuteQuery", "A");
	return execute;
}
function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
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
	
	//FCUBS14.6->CSNL->SUMITOMO_MITSUI_TRUST_BANK_BugId#33165850 start
	
		if ((document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE").value == 'I') && (document.getElementById("BLK_GITM_FORMAT_DEFINITION__FORMAT_TYPE").value == 'T'))
		{			
			showErrorAlerts('GI-OUT-001');
			return false;
		}		
		//FCUBS14.6->CSNL->SUMITOMO_MITSUI_TRUST_BANK_BugId#33165850 end
	return isValid;	
}
function fnPostSave_KERNEL() {
	debugs("In fnPostSave", "A");
}
function fnPreGoToRec() {
	var navigate = true;
	return navigate;
}

function fnPostGoToRec() {
	
}
function fnHandleEventBlock(evnt) {//#14709507 changes
	appendData(document.getElementById('TBLPageAll'));
	var rowIndex = getRowIndex(evnt);
	//Fix for USDWFNAFCC0012 start
	if (rowIndex == -1) {
		rowIndex = 1;
	}
	//Fix for USDWFNAFCC0012 end
	var tableName = 'GITM_COMPONENT_LINKAGE';
	dbIndexArray[tableName] = rowIndex;
	resetChildIndex(tableName);
	showDescandants(tableName);
	return true;
}
function fnEnableParalleFields_KERNEL(){
    //alertMessage(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").value);
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").checked == true){
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    if (document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value != 'R' || 
         document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value != 'P'){
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
    }
    else{
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
}
function fnEnableRelatedFields_KERNEL(value){
//alertMessage(value);
    if(value == 'R'){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    }
    else if (value == 'P'){
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    
    }else{
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    }
}
function fnEnableDisableFields_KERNEL(){
    if (functionId == 'GIDIFTDF'){
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE").value == 'O'){
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = "";
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__PROCESSED_FILE_MASK").value = "";
	document.getElementById("BLK_GITM_FORMAT_DEFINITION__FREQUENCY").value = ""; //NON EXT TO EXT
    
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PROCESSED_FILE_MASK"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FREQUENCY"));//NON EXT TO EXT
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }else{
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS_REQD"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_PARALLEL_PROCESS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NO_OF_RECORDS"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION").value = 'New';
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__PROCESSED_FILE_MASK"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DEFAULT_ACTION"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__OUTGOING_INTERFACE"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__ON_OVERRIDE").value = 'R';
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK").value = ""; 
	document.getElementById("BLK_GITM_FORMAT_DEFINITION__FREQUENCY").value = "1"; //NON EXT TO EXT
	fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FREQUENCY"));//NON EXT TO EXT
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FILE_MASK"));
    }
    }
    fnEnableDisableScheduleFields_KERNEL();//JCROFC_Minicore_Integration_Remediation_Fix
}
function fnEnableDisableJust_KERNEL(){
    if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__FORMAT_TYPE").value == 'F'){
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION").value = 'L';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION").value = 'L';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION").value = 'R';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER").value = '*';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER").value = '*';
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER").value = '$';

        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER"));

    }else{
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION").value  = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER").value = "";
        document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER").value = "";
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_JUSTIFICATION"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATE_PADDING_CHARACTER"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__NUMBER_PADDING_CHARACTER"));
        fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__TEXT_PADDING_CHARACTER"));
        fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DELIMETER"));
		
		//FCUBS14.6->CSNL->SUMITOMO_MITSUI_TRUST_BANK_BugId#33165850 start
		
		if ((document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE").value == 'I') && (document.getElementById("BLK_GITM_FORMAT_DEFINITION__FORMAT_TYPE").value == 'T'))
		{
			showErrorAlerts('GI-OUT-001');
			return false;
		}
		
		//FCUBS14.6->CSNL->SUMITOMO_MITSUI_TRUST_BANK_BugId#33165850 end
		
    }

}
function fnValidateType_KERNEL(){
 if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERVAL_TYPE").value == 'D' || 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERVAL_TYPE").value == 'A' || 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERVAL_TYPE").value == 'F'){
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DAY").value = ''; 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__MONTH").value = ''; 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATES").value = ''; 
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DAY"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__MONTH"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATES"));
  }else if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERVAL_TYPE").value == 'W'){
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DAY"));
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__MONTH").value = ''; 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATES").value = ''; 
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__MONTH"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATES"));
  }else if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERVAL_TYPE").value == 'M'){
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__DAY").value = ''; 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__MONTH").value = ''; 
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DAY"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__MONTH"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATES"));
  }else{
     document.getElementById("BLK_GITM_FORMAT_DEFINITION__DAY").value = ''; 
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DAY"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__MONTH"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__DATES"));
  }  
  fnEnableDisableScheduleFields_KERNEL(); //JCROFC_Minicore_Integration_Remediation_Fix
}
//#19577643 changes starts
function fnPreDispLov_LOV_CALLFORM_KERNEL(){
    var event = window.event || e;
    var tempIndex = getRowIndex(event)-1;
    document.getElementsByName("FUNCTION_NAME")[tempIndex].value = parent.document.getElementById("BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID").value;  
    return true;
}

function fnPostDispLov_LOV_CALLFORM_KERNEL(){
    var event = window.event || e;
    var tempIndex = getRowIndex(event)-1;
    document.getElementsByName("FUNCTION_NAME")[tempIndex].value = "";
    return true;
}
//#19577643 changes ends
//JCROFC_Minicore_Integration_Remediation_Fix starts
function fnEnableDisableScheduleFields_KERNEL(){
if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__INTERVAL_TYPE").value == 'D')
  {
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCHEDULED"));
 }
  else
  {
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCHEDULED").checked =false;
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_HH"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_MIN"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_HH"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_MIN"));  
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCHEDULED"));
  }
  fnEnableScheduleTimeFields_KERNEL();
}
function fnEnableScheduleTimeFields_KERNEL(){
  if(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCHEDULED").checked == true) {
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_HH"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_MIN"));    
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_HH"));
    fnEnableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_MIN"));
  }
  else
  {
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_HH").value = "";    
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_MIN").value = ""; 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_HH").value = ""; 
    document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_MIN").value = "";   
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_HH"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_START_MIN"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_HH"));
    fnDisableElement(document.getElementById("BLK_GITM_FORMAT_DEFINITION__SCH_END_MIN"));
  }
}
//JCROFC_Minicore_Integration_Remediation_Fix ends