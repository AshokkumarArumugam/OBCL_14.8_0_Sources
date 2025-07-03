/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Corporation
**  World Headquarters
**  500 Oracle Parkway
**  Redwood Shores, CA 94065
**  U.S.A.
**  
**  Copyright © 2008- 2009 by Oracle Financial Services Software Limited.
**  Oracle Financial Services Software Limited.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : GWDEXFUN.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG		   : 1
**  Last Modified By   : Satyakam Jena
**  Last modified on   : 23-Jun-2010
**  Full Version       : 
**  Reason             : FCUBS11.1 ITR1 SFR#5758
***************************************************************************************************************************
Copyright © 2004- 2009 by Oracle Financial Services Software Limited.
----------------------------------------------------------------------------------------------------
 Caution Don't Delete this. This is used by the Version control utility.
   	
	********************************** START OF LOG HISTORY **************************************
	$Log: Template.js.v $
	Revision 1.2  2005/02/22 09:30:48  IDSENTHILL
	1.2:Relesing to vercon

	Revision 1.1.1.0  2005/02/22 09:02:34  IDSENTHILL
	All the preAction functions should return a flag indicating the caller to proceed or not.

	Revision 1.1  2005/02/08 12:33:59  IDSENTHILL
	1.1:Relesing to vercon

	Revision 1.0.1.0  2005/02/07 07:39:16  IDSENTHILL
	Usage of AVCS Begin.

	Revision 1.0  2005/02/02 08:10:26  IDSENTHILL
	Initial Checkin
 
	********************************** END   OF LOG HISTORY **************************************

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

/*
 * Called to perform some neccessary operation before the fnLoad() Window event
 * Specific to the functionid
 */
function fnPreLoad() {
	//debug(dlgArg.mainWin, "In fnPreLoad", "A");
	debugs("In fnPreLoad", "A");
}
/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */
function fnPostLoad() {
	//debug(dlgArg.mainWin, "In fnPostLoad", "A");
	debugs("In fnPostLoad", "A");
}
/*
 * Called to perform some neccessary operation before the fnNew() Action event
 * Specific to the functionid
 */
function fnPreNew() {
	var newAction = true;
	//debug(dlgArg.mainWin, "In fnPreNew", "A");
	debugs("In fnPreNew", "A");
	return newAction;
}
/*
 * Called to perform some neccessary operation after the fnNew() Action event
 * Specific to the functionid 
 */
function fnPostNew() {
  //FCUBS11.1 ITR1 SFR#5758 Changes Starts..
  //LOV_FUNCID = new lov("SELECT function_id, action, service_name, operation_code FROM  gwtms_gateway_functions WHERE function_id || action NOT IN (				SELECT 	function_id || action	FROM	gwtms_ext_sys_functions				 WHERE	ext_system = ?) ORDER BY service_name, operation_code","FUNCTION_ID!TEXT!FUNCTION_ID~ACTION!TEXT!ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","EXT_SYSTEM!STRING","500","10","ORACLE","~");
    LOV_FUNCID = new lov("SELECT Sms_Function_Id, Sms_Action, Service_Name, Operation_Code FROM   Gwtm_Operations_Master WHERE  Sms_Function_Id NOT IN ('BCGCONON') AND       Sms_Function_Id || Sms_Action NOT IN (SELECT Function_Id || Action FROM   Gwtm_Ext_Sys_Functions             WHERE  Ext_System = ?)","SMS_FUNCTION_ID!TEXT!SMS_FUNCTION_ID~SMS_ACTION!TEXT!SMS_ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","EXT_SYSTEM!STRING","500","10","ORACLE","~"," ","Y");
  //FCUBS11.1 ITR1 SFR#5758 Changes Ends..
	//debug(dlgArg.mainWin, "In fnPostNew", "A");	
	debugs("In fnPostNew", "A");	
}
/*
 * Called to perform some neccessary operation before the fnUlock() Action event
 * Specific to the functionid 
 */
function fnPreUnlock() {
	var unlock = true;
	//debug(dlgArg.mainWin, "In fnPreUnlock", "A");
	debugs("In fnPreUnlock", "A");
	return unlock;
}
/*
 * Called to perform some neccessary operation after the fnUlock() Action event
 * Specific to the functionid 
 */
function fnPostUnlock() {
	//debug(dlgArg.mainWin, "In fnPostUnlock", "A");
	debugs("In fnPostUnlock", "A");
}
/*
 * Called to perform some neccessary operation before the fnAuthorize() Action event
 * Specific to the functionid 
 */
function fnPreAuthorize() {
	var authorize = true;
	//debug(dlgArg.mainWin, "In fnPreAuthorize", "A");
	debugs("In fnPreAuthorize", "A");
	return authorize;
}
/*
 * Called to perform some neccessary operation after the fnAuthorize() Action event
 * Specific to the functionid 
 */
function fnPostAuthorize() {
	//debug(dlgArg.mainWin, "In fnPostAuthorize", "A");
	debugs("In fnPostAuthorize", "A");
}
/*
 * Called to perform some neccessary operation before the fnCopy() Action event
 * Specific to the functionid 
 */
function fnPreCopy() {
	var copy = true;
	//debug(dlgArg.mainWin, "In fnPreCopy", "A");
	debugs("In fnPreCopy", "A");
	return copy;
}
/*
 * Called to perform some neccessary operation after the fnCopy() Action event
 * Specific to the functionid 
 */
function fnPostCopy() {
  //FCUBS11.1 ITR1 SFR#5758 Changes Starts..
  //LOV_FUNCID = new lov("SELECT function_id, action, service_name, operation_code FROM  gwtms_gateway_functions WHERE function_id || action NOT IN (				SELECT 	function_id || action	FROM	gwtms_ext_sys_functions				 WHERE	ext_system = ?) ORDER BY service_name, operation_code","FUNCTION_ID!TEXT!FUNCTION_ID~ACTION!TEXT!ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","EXT_SYSTEM!STRING","500","10","ORACLE","~");
    LOV_FUNCID = new lov("SELECT Sms_Function_Id, Sms_Action, Service_Name, Operation_Code FROM   Gwtm_Operations_Master WHERE  Sms_Function_Id NOT IN ('BCGCONON') AND       Sms_Function_Id || Sms_Action NOT IN (SELECT Function_Id || Action FROM   Gwtm_Ext_Sys_Functions             WHERE  Ext_System = ?)","SMS_FUNCTION_ID!TEXT!SMS_FUNCTION_ID~SMS_ACTION!TEXT!SMS_ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","EXT_SYSTEM!STRING","500","10","ORACLE","~"," ","Y");
  //FCUBS11.1 ITR1 SFR#5758 Changes Ends..
  document.getElementById("GWTM_EXT_SYS_MASTER__DESCRIPTION").value = '';
  document.getElementById("GWTMS_GATEWAY_FUNCTIONS__SERVICE_NAME").value = '';
  document.getElementById("GWTMS_GATEWAY_FUNCTIONS__OPERATION_CODE").value = '';  
  //debug(dlgArg.mainWin, "In fnPostCopy", "A");
  debugs("In fnPostCopy", "A");
}
/*
 * Called to perform some neccessary operation before the fnClose() Window event
 * Specific to the functionid 
 */
function fnPreClose() {
	var close = true;
	//debug(dlgArg.mainWin, "In fnPreClose", "A");
	debugs("In fnPreClose", "A");
	return close;
}
/*
 * Called to perform some neccessary operation after the fnClose() Window event
 * Specific to the functionid 
 */
function fnPostClose() {
	//debug(dlgArg.mainWin, "In fnPostClose", "A");
	debugs("In fnPostClose", "A");
}
/*
 * Called to perform some neccessary operation before the fnReOpen() Window event
 * Specific to the functionid 
 */
function fnPreReOpen() {
	var reOpen = true;
	//debug(dlgArg.mainWin, "In fnPreReOpen", "A");
	debugs("In fnPreReOpen", "A");
	return reOpen;
}
/*
 * Called to perform some neccessary operation after the fnReOpen() Window event
 * Specific to the functionid 
 */
function fnPostReOpen() {
	//debug(dlgArg.mainWin, "In fnPostReOpen", "A");
	debugs("In fnPostReOpen", "A");
}
/*
 * Called to perform some neccessary operation before the fnDelete() Action event
 * Specific to the functionid 
 */
function fnPreDelete() {
	var deleteAction = true;
	//debug(dlgArg.mainWin, "In fnPreDelete", "A");
	debugs("In fnPreDelete", "A");
	return deleteAction;
}
/*
 * Called to perform some neccessary operation after the fnDelete() Action event
 * Specific to the functionid 
 */
function fnPostDelete() {
	debugs("In fnPostDelete", "A");
}
/*
 * Called to perform some neccessary operation before the fnEnterQuery() Action event
 * Specific to the functionid 
 */
function fnPreEnterQuery() {
	var execute = true;
	debugs("In fnPreEnterQuery", "A");
	return execute;
}
/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid 
 */
function fnPostEnterQuery() {
 // LOV_FUNCID = new lov("SELECT function_id, action, service_name, operation_code FROM  gwtms_gateway_functions  ORDER BY service_name, operation_code","FUNCTION_ID!TEXT!FUNCTION_ID~ACTION!TEXT!ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","","500","10","ORACLE","~");
    //document.getElementById("GWTMS_EXT_SYS_FUNCTIONS__FUNCTION_ID").nextSibling.attachEvent('onclick',fn_lov_FUNCTION_ID);
	addEvent(document.getElementById("GWTMS_EXT_SYS_FUNCTIONS__FUNCTION_ID").nextSibling,'onclick',"fn_lov_FUNCTION_ID()");
	debugs("In fnPostEnterQuery", "A");
}
/*
 * Called to perform some neccessary operation before the fnExecuteQuery() Action event
 * Specific to the functionid 
 */
function fnPreExecuteQuery() {
	var execute = true;
	debugs("In fnPreExecuteQuery", "A");
	return execute;
}
/*
 * Called to perform some neccessary operation after the fnExecuteQuery() Action event
 * Specific to the functionid 
 */
function fnPostExecuteQuery() {
	debugs("In fnPostExecuteQuery", "A");
}

/*
 * Called to perform some neccessary operation before the fnSave() Action event and
 * this function has to return a success/failure flag to fnSave function.
 * Specific to the functionid.
 */
function fnPreSave() {
	debugs("In fnPreSave", "A");	
	var isValid = true;
	// Do Mandatory validations
	isValid = isValid & fnValidateMandatory();

	// Do basic datatype validations
	isValid = isValid & fnValidateDataType();

	// Get all the Messages from Previuos Validate and now
	// display all
	if (!isValid) {
		//Call Functions in Util
		var msg = buildMessage(gErrCodes);
		alertMessage(msg);
		return false;
	}
	
	return isValid;	
}
/*
 * Called to perform some neccessary operation after the fnSave() Action event
 * Specific to the functionid 
 */
function fnPostSave() {
	debugs("In fnPostSave", "A");
}

/*
 * Before Navigating to the next/prev record.
 */
function fnPreGoToRec() {
	var navigate = true;
	return navigate;
}

/*
 * After Navigating to the next/prev record.
 */

function fnPostGoToRec() {
	
}

function fnPostLoad_Summary()
{
  //FCUBS11.1 ITR1 SFR#5758 Changes Starts..
  //LOV_FUNCID = new lov("SELECT function_id, action, service_name, operation_code FROM  gwtms_gateway_functions  ORDER BY service_name, operation_code","FUNCTION_ID!TEXT!FUNCTION_ID~ACTION!TEXT!ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","","500","10","ORACLE","~");
    LOV_FUNCID = new lov("SELECT Sms_Function_Id, Sms_Action, Service_Name, Operation_Code FROM   Gwtm_Operations_Master WHERE  Sms_Function_Id NOT IN ('BCGCONON') AND       Sms_Function_Id || Sms_Action NOT IN (SELECT Function_Id || Action FROM   Gwtm_Ext_Sys_Functions             WHERE  Ext_System = ?)","SMS_FUNCTION_ID!TEXT!SMS_FUNCTION_ID~SMS_ACTION!TEXT!SMS_ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","EXT_SYSTEM!STRING","500","10","ORACLE","~"," ","Y");
  //FCUBS11.1 ITR1 SFR#5758 Changes Ends..
}

function fn_lov_FUNCTION_ID()
{
	if(gAction=='ENTERQUERY'){
		//FCUBS11.1 ITR1 SFR#5758 Changes Starts..
		LOV_FUNCID = new lov("select distinct(function_id) from gwtms_gateway_functions order by function_id","FUNCTION_ID!TEXT!FUNCTION_ID","STRING","FUNCTION_ID","Function ID","LBL_FUNCTION_ID","GWDEXFUN","","500","10","ORACLE","~");
          //LOV_FUNCID = new lov("SELECT Sms_Function_Id, Sms_Action, Service_Name, Operation_Code FROM   Gwtm_Operations_Master WHERE  Sms_Function_Id NOT IN ('BCGCONON') AND       Sms_Function_Id || Sms_Action NOT IN (SELECT Function_Id || Action FROM   Gwtm_Ext_Sys_Functions             WHERE  Ext_System = ?)","SMS_FUNCTION_ID!TEXT!SMS_FUNCTION_ID~SMS_ACTION!TEXT!SMS_ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","EXT_SYSTEM!STRING","500","10","ORACLE","~"," ","Y");
        //FCUBS11.1 ITR1 SFR#5758 Changes Ends..
		LOV_FUNCID.show_lov('','','','Function','Function', 'Function','GWDEXFUN','FUNCTION_ID' );
	}
}
