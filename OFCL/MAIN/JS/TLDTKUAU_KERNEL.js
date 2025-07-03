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
**  File Name          : TLDTDUAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostLoad_CVS_TKTAUTH_KERNEL(screenArgs) {
	subScreen = 'Y';
	if (screenArgs['SUB_SCREEN'] == 'Y'){
		document.getElementById('BLK_TKT_AUTH__TKTID').value = screenArgs['TKTID'];
		document.getElementById('BLK_TKT_AUTH__SRCCD').value = screenArgs['SRCCD'];
		document.getElementById('BLK_TKT_AUTH__BRN').value = screenArgs['BRN'];
		functionOrigin = 'KERNEL'; 
		dbIndexArray['BLK_TKT_AUTH'] = getDbIndex("BLK_TKT_AUTH");
		gAction = "EXECUTEQUERY";
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		var msgStatus = fnProcessResponse();
		fnEnable_Rekey();
	}	
	return true;
}

function fnEnable_Rekey(){
	fnEnableElement(document.getElementById("BLK_TKT_AUTH_EXPSTLDT"));
	fnEnableElement(document.getElementById("BLK_TKT_AUTH_TRDDT"));
	fnEnableElement(document.getElementById("BLK_TKT_AUTH_TRDPRICE"));
	fnEnableElement(document.getElementById("BLK_TKT_AUTH_CCY"));
	fnEnableElement(document.getElementById("BTN_OK"));
}
function fnPostExecuteQuery_KERNEL(){
	fnEnable_Rekey();
	mainWin.t['1+2'] = ['Enter Query'];	
	return true;
}
//function fnOnlineAuth() {	
function fnPreSave_KERNEL() {
   var gprev = ""; 
	gAction = 'AUTH';
	if (!fnOnlineAuthorize(subScreen)) {
       var l_msgStat =getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
       if (l_msgStat == 'SUCCESS') {
          disableForm();
		 gAction = gprev;
       }
        processingAction = 'Auth';
	   return;
	 }
	return true;
}
function fnAuthSuccess(args){
var gprev = "";  
gAction = gprev ; 
disableForm();
alertAction = 'ONLINEAUTH'; 
}
function fnPostClose_CVS_AUTH_KERNEL(screenArgs){	
	mainWin.t['1+2'] = '';
	return true;
}