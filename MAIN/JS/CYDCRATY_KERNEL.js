/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  Written by         : 
**  Date of creation   : 
**  File Name          : CYDCRATY_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

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
function fnPreLoad_KERNEL() {
	debugs("In fnPreLoad", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */
function fnPostLoad_KERNEL() {
	debugs("In fnPostLoad", "A");
		return true;
}
/*
 * Called to perform some neccessary operation before the fnNew() Action event
 * Specific to the functionid
 */
function fnPreNew_KERNEL() {
	var newAction = true;
	debugs("In fnPreNew", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnNew() Action event
 * Specific to the functionid 
 */
function fnPostNew_KERNEL() {
	debugs("In fnPostNew", "A");	
		return true;
}
/*
 * Called to perform some neccessary operation before the fnUlock() Action event
 * Specific to the functionid 
 */
function fnPreUnlock_KERNEL() {
	var unlock = true;
	debugs("In fnPreUnlock", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnUlock() Action event
 * Specific to the functionid 
 */
function fnPostUnlock_KERNEL() {
	debugs("In fnPostUnlock", "A");
		return true;
}
/*
 * Called to perform some neccessary operation before the fnAuthorize() Action event
 * Specific to the functionid 
 */
function fnPreAuthorize_KERNEL() {
	var authorize = true;
	debugs("In fnPreAuthorize", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnAuthorize() Action event
 * Specific to the functionid 
 */
function fnPostAuthorize() {
	debugs("In fnPostAuthorize", "A");
		return true;
}
/*
 * Called to perform some neccessary operation before the fnCopy() Action event
 * Specific to the functionid 
 */
function fnPreCopy_KERNEL() {
	var copy = true;
	debugs("In fnPreCopy", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnCopy() Action event
 * Specific to the functionid 
 */
function fnPostCopy_KERNEL() {
	debugs("In fnPostCopy", "A");
}
/*
 * Called to perform some neccessary operation before the fnClose() Window event
 * Specific to the functionid 
 */
function fnPreClose_KERNEL() {
	var close = true;
	debugs("In fnPreClose", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnClose() Window event
 * Specific to the functionid 
 */
function fnPostClose() {
	debugs("In fnPostClose", "A");
		return true;
}
/*
 * Called to perform some neccessary operation before the fnReOpen() Window event
 * Specific to the functionid 
 */
function fnPreReOpen_KERNEL() {
	var reOpen = true;
	debugs("In fnPreReOpen", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnReOpen() Window event
 * Specific to the functionid 
 */
function fnPostReOpen_KERNEL() {
	debugs("In fnPostReOpen", "A");
		return true;
}
/*
 * Called to perform some neccessary operation before the fnDelete() Action event
 * Specific to the functionid 
 */
function fnPreDelete_KERNEL() {
	var deleteAction = true;
	debugs("In fnPreDelete", "A");
		return true;
}
/*
 * Called to perform some neccessary operation after the fnDelete() Action event
 * Specific to the functionid 
 */
function fnPostDelete_KERNEL() {
	debugs("In fnPostDelete", "A");
		return true;
}
/*
 * Called to perform some neccessary operation before the fnEnterQuery() Action event
 * Specific to the functionid 
 */
function fnPreEnterQuery_KERNEL() {
	var execute = true;
	debugs("In fnPreEnterQuery", "A");
	return execute;
}
/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid 
 */
function fnPostEnterQuery_KERNEL() {
	debugs("In fnPostEnterQuery", "A");
	return true;
	
}
/*
 * Called to perform some neccessary operation before the fnExecuteQuery() Action event
 * Specific to the functionid 
 */
function fnPreExecuteQuery_KERNEL() {
	var execute = true;
	debugs("In fnPreExecuteQuery", "A");
	return true;
}
/*
 * Called to perform some neccessary operation after the fnExecuteQuery() Action event
 * Specific to the functionid 
 */
function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	return true;
}

/*
 * Called to perform some neccessary operation before the fnSave() Action event and
 * this function has to return a success/failure flag to fnSave function.
 * Specific to the functionid.
 */
function fnPreSave_KERNEL() {
	if(!fnValidate())
        return false;

	debugs("In fnPreSave", "A");	
	var isValid = true;
	// Do Mandatory validations
	

	// Do basic datatype validations
	

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
function fnPostSave_KERNEL() {
	debugs("In fnPostSave", "A");
	return true;
}

