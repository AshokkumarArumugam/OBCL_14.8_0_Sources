/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright Â© 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
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
**	Modified By   :	Priyadharshini Balachandran
** 	Modified on   : 1-Nov-2018
** 	Description   : Changes done to invoke the dynamic calls to be compiled in PDB from screen
** 	Search String : FCUBS_14.2_18C_Changes

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes
****************************************************************************************************************************
********************************* END   OF LOG HISTORY **************************************
*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

function fnPostNew_KERNEL() {
	gAction = "NEW";
	DisableToolbar_buttons("EnterQuery");
    DisableToolbar_buttons("Save");
	fnEnableElement(document.getElementById("BLK_MASTER__BTN_POPULATE"));
	fnDisableElement(document.getElementById("BLK_MASTER__BTN_PROCESS_ALL"));
	return true;
}

function fnPostLoad_KERNEL() {	
	fnDisableElement(document.getElementById("BLK_MASTER__BTN_PROCESS_ALL"));
	return true;
}
function fn_fetch() {

	g_prev_gAction=gAction;
	appendData();
	gAction = "FETCH_RECORDS";
	
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
	
	gAction=g_prev_gAction;
	DisableToolbar_buttons("Save");
	fnDisableElement(document.getElementById("BLK_MASTER__BTN_POPULATE"));
	
	if (getElementsByOjName("STATUS")[0].value == 'P') {  //redwood_changes
		fnDisableElement(document.getElementById("BLK_MASTER__BTN_PROCESS_ALL"));
	}
	else {
		fnEnableElement(document.getElementById("BLK_MASTER__BTN_PROCESS_ALL"));
	}
}

function fn_process_all() {

	g_prev_gAction=gAction;
	appendData();
	gAction = "PROCESS_ALL";
		
	fcjRequestDOM = buildUBSXml();
	servletURL = "FCClientHandler";
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	
	gAction=g_prev_gAction;
	alert('Records are processed');
	fnDisableElement(document.getElementById("BLK_MASTER__BTN_POPULATE"));
	fnDisableElement(document.getElementById("BLK_MASTER__BTN_PROCESS_ALL"));
	disableForm();
}
