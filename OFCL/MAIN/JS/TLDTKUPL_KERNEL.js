/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : TLDTKUPL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var PkArr= new Array();
function fnPostNew_KERNEL() {
	fnDisableScreenElement("TAB_MAIN__SEC_1");
    fnDisableScreenElement("TAB_MAIN__SEC_2");
    fnDisableScreenElement("TAB_MAIN__SEC_3");
	document.getElementById("BLK_TRD_DRAFT__EXT_FCCREF").nextSibling.stlye.visibility='hidden'; 
	return true;
}
function fnProductPickupFailure() {
	document.getElementById("BLK_TKT_MAS__PRDCD").value=''; 
	document.getElementById("BLK_TKT_MAS__PRDDESC").value='';
	gAction = g_prev_gAction;
	return true;
}
function fnPostProductPickup_KERNEL(){
	fnDisableScreenElement("TAB_HEADER__SEC_1");
	fnEnableScreenElement("TAB_MAIN__SEC_1");
    fnEnableScreenElement("TAB_MAIN__SEC_2");
    fnEnableScreenElement("TAB_MAIN__SEC_3");
	fnChangeHol();
	return true;
}
/*function fnPostCopy_KERNEL() {
	 if (msgStatus == 'SUCCESS') {
		fnDisableScreenElement("TAB_HEADER__SEC_2");
	}
    else if (msgStatus == 'FAILURE') {
         customAlertAction = "COPYFAILURE";
         gAction = 'EXECUTEQUERY';
      }
    return true;
}
function fnCloseAlertWin_COPYFAILURE() {
	gAction = 'EXECUTEQUERY';
    fnExecuteQuery();
    return true;
}*/
function fnPreLoad_CVS_TKTAUTH_KERNEL(screenArgs) {
	screenArgs['TKTID'] = document.getElementById('BLK_TKT_MAS__TKT_ID').value;
	screenArgs['BRN'] = document.getElementById('BLK_TKT_MAS__BRN').value;
	screenArgs['SRCCD'] = document.getElementById('BLK_TKT_MAS__SRCCD').value;
	screenArgs['SUB_SCREEN'] = 'Y';
    return true;
}

function fnPreAuthorize_KERNEL(screenArgs) {
	var gprev = gAction; 
		/*IF :BLK_LTTBS_UPLOAD_MASTER.MAKER_ID = :GLOBAL.SM_CURRENT_USERID
		THEN
			L_ALERT_RETURN := OVPKCS.FN_DISPMSG('LD-AU003;',';',';');
			RAISE FORM_TRIGGER_FAILURE;	
		END IF;*/
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus == 'SUCCESS') {
		authFunction = 'TLDTKUAU';
		authUixml = 'TLDTKUAU';
		authScreenName = 'CVS_TKTAUTH';
		gAction = 'EXECUTEQUERY';
		ArrFuncOrigin['TLDTKUAU'] = "KERNEL";
		ArrPrntFunc['TLDTKUAU'] = "";
		ArrPrntOrigin['TLDTKUAU'] = "";
		return true;
	}
	else{
		gAction = gprev;
		return false;
	}
    return true;
}

function fnPostAuthorize_KERNEL() {
    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
    return true;
}
function fnChangeHol(){
		var l_checked = document.getElementById("BLK_HOL_TREAT__IGRHOL").value;
	if(l_checked){
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__APP_CONTHOL_CCT"));
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__APP_LCLHOL_CCY"));
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__CONBRNHOL"));
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__HOLCCY"));					
	}
	else{
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__APP_CONTHOL_CCT"));
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__APP_LCLHOL_CCY"));
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__CONBRNHOL"));
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__HOLCCY"));		
	}
	return true;
}

function fnPostUnlock_KERNEL() {
	if  (gAction == 'MODIFY'){
		var l_CmdRndVer = document.getElementById("BLK_OTHER_DET__CMT_RND_VER").value;
		if (l_CmdRndVer != 'Y'){
			fnDisableElement(document.getElementById("BLK_CONT_DET__COMMIT_RND_PRICE"));
		}
	}	
	return true;
}
/* fnPostExecuteQuery_KERNEL() {
	 enablebutton('Copy', 'actions1');
	fnChangeHol();
	fnEnableElement(document.getElementById("BLK_TRD_DRAFT__BTN_PREV"));
	 fnEnableElement(document.getElementById("BLK_TRD_DRAFT__BTN_NEXT"));
	return true;
}*/
function fnPostAddRow_BLK_TRD_DET_KERNEL(arg) {
	rowIndex = dbIndexArray["BLK_TRD_DET"];
    getElementsByOjName("DET_CCY")[rowIndex - 1].value = document.getElementById("BLK_TKT_MAS__CCY").value;
	var old_Action = gAction;
	gAction = 'GENREF';
	appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var msgStatus = fnProcessResponse();
    gAction = old_Action;
    return true;
}