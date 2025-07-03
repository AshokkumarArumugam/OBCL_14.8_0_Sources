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
/*
 **
 **  Written by         : NEERAJ.KRISHNA
 **  Date of creation   : 17-AUG-16
 **  File Name          : LDCBATOP_KERNEL.js
 **  Purpose            : 
 **  Called From        :
 **

 ****************************************************************************************************************************/
var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

var g_prevAction = "";
var servletURL = "FCClientHandler";

function fnPreLoad_KERNEL() {
	debugs("In fnPreLoad", "A");
}
/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */

/*function fnPostLoad_CVS_BATCH_OP_KERNEL() {
if (parent.screenArgs["AUTOBAT"])
getElementsByOjName("BATCH_NO")[0].value = parent.screenArgs["AUTOBAT"];
screenArgs['BATCH'] = "";
fnSetFocusOnMasterPKField();
debugs("In fnPostLoad", "A");
}*/

function fnPostLoad_KERNEL() {
	screenArgs['BATCH'] = "";
	getElementsByOjName("LAST_OPER_ID")[0].value = mainWin.UserId;
	debugs("In fnPostLoad", "A");
}

function fnPreNew_KERNEL() {
	var newAction = true;
	debugs("In fnPreNew", "A");
	return newAction;
}

function fnPostNew_KERNEL() {
	debugs("In fnPostNew", "A");
}

/*function fnPostLoad_CVS_BATCH_OP_KERNEL(screenArgs){
if (parent.currAxn == "REOPEN" ){
fnPreExecuteQuery();
getElementsByOjName("BATCH_NO")[0].value = parent.batchNo ;
getElementsByOjName("BRANCH_CODE")[0].value == mainWin.CurrentBranch;
var gprev = gAction;
gAction = "EXECUTEQUERY";
fnExecuteQuery();
gAction=gprev;
}
return true;
}
 */
function fnPostLoad_CVS_BATCH_OP(screenArgs) {
	showData();
	fnSetFocusOnMasterPKField();
}

function fnSetFocusOnMasterPKField() {
	document.getElementById("OLVWS_BATCH_MASTER__BATCH_NO").focus();
}

function fnPreExit_KERNEL() {
	parent.screenArgs['EXITVAL'] = 'E';
	fnExitSubScreen();
	return true;
}

//FCUBS11.1 SFR1334 changes ends
function fnPreSave_CVS_BATCH_OP_KERNEL(screenArgs) {
	if (!fnValidate())
		return false;
	getElementsByOjName("BRANCH_CODE")[0].value == mainWin.CurrentBranch;
	parent.screenArgs['BATCH'] = getElementsByOjName("BATCH_NO")[0].value;
	parent.screenArgs['EXITVAL'] = 'S';
	parent.screenArgs['DESC'] = getElementsByOjName("DESCRIPTION")[0].value; //Fix for sfr#14470812
	//parent.screenArgs['ACDESC'] = getElementsByOjName("DESCRIPTION")[0].value; //Fix for sfr#14470812
	//	parent.description = getElementsByOjName("DESCRIPTION")[0].value;
	//parent.screenArgs['BAL'] = getElementsByOjName("BALANCING")[0].value;Commented Ravi

	//bug#16714914 starts
	//	parent.screenArgs['BAL'] = getElementsByOjName("BALANCING")[0].value;

	if (getElementsByOjName("BALANCING")[0].value) {
		parent.screenArgs['BAL'] = getElementsByOjName("BALANCING")[0].getAttribute("ON")
	} else {
		parent.screenArgs['BAL'] = getElementsByOjName("BALANCING")[0].getAttribute("OFF")
	}
	//bug#16714914 ends

	parent.screenArgs['DEBIT'] = getElementsByOjName("DR_CHK_TOTAL")[0].value;
	parent.screenArgs['CREDIT'] = getElementsByOjName("CR_CHK_TOTAL")[0].value;
	return true;
}
