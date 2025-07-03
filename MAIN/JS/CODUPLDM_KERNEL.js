/***************************************************************************************************************************
**
** This source is part of the Oracle BANKING Software Product.
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : CODUPLDM_KERNEL.js

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

****************************************************************************************************************************/
function fnPostNew_KERNEL() {
	 debugs("In fnPostNew", "A");
    fnDisableElement(document.getElementById('BLK_COTMS_SOURCE_PREF__ALLOW_EOD_WITH_DEFERRED'));
	return true;
}

function fnPostCopy_KERNEL() {
	
	return true;
}

function fnPreExecuteQuery_KERNEL() {
	
	return true;
}

function fnPostEnterQuery_KERNEL() {

	return true;
}
function fnPostUnlock_KERNEL(){
    debugs("In fnPostUnlock", "A");
	
	if (document.getElementById('BLK_BLK_COTMS_SOURCE_PREF__ALLOW_DEFERRED_PROCESSING').value == true) {  //redwood_changes
		document.getElementById('BLK_BLK_COTMS_SOURCE_PREF__ALLOW_EOD_WITH_DEFERRED').disabled = false;
	} else {
		document.getElementById('BLK_BLK_COTMS_SOURCE_PREF__ALLOW_EOD_WITH_DEFERRED').disabled = true;		
	}
return true;
}
function fnSetEODStatus() {
	// Enable EOD status only if deferred is selected.
	if (document.getElementById("BLK_COTMS_SOURCE_PREF__ALLOW_DEFERRED_PROCESSING").value == true) {  //redwood_changes
		document.getElementById("BLK_COTMS_SOURCE_PREF__ALLOW_EOD_WITH_DEFERRED").disabled = false;
	} else {
		document.getElementById("BLK_COTMS_SOURCE_PREF__ALLOW_EOD_WITH_DEFERRED").disabled = true;
		document.getElementById("BLK_COTMS_SOURCE_PREF__ALLOW_EOD_WITH_DEFERRED").value = false;  //redwood_changes
	}
}

function fnShowSubscreen_CVS_DETAIL(){
	screenArgs['SCREEN_NAME'] = 'CVS_DETAIL';
	screenArgs['FUNCTION_ID'] = 'CODUPLDM';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'CODUPLDM';
	screenArgs['SOURCE_CODE'] = document.getElementById("BLK_COTMS_SOURCE_PREF__SOURCE_CODE").value;
	screenArgs['MODULE_CODE'] = document.getElementById("BLK_COTMS_SOURCE_PREF__MODULE_CODE").value;
	appendData(document.getElementById('TBLPage'+strCurrentTabID));
	screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+mainWin.LangCode+'/CODUPLDM.xml',screenArgs['SCREEN_NAME']);

	fnShowSubScreen(screenArgs);
}

function fnPostAddRow_BLK_COTMS_SOURCE_FUNCID_PREF(newRow) {
    getElementsByOjName("SOURCE_CODE")[newRow.rowIndex - 2].value = parent.screenArgs['SOURCE_CODE'];  //redwood_changes
    getElementsByOjName("MODULE_CODE")[newRow.rowIndex - 2].value = parent.screenArgs['MODULE_CODE'];  //redwood_changes
    return true;
}
