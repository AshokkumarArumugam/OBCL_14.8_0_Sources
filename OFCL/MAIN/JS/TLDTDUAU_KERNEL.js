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
**  Last Modified By   : Srinivasulu Ch
**  Last modified on   : 10-Jan-2020
**  Full Version       : Added __ for the fields to enable or disable
**  Reason             : OBCL_14.4#SLT Sub Participation changes

**  Last Modified By   : Jayaram N
**  Last modified on   : 06-Feb-2022
**  Search String      : Bug#33805591
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  Last Modified By   : Jayaram N
**  Last modified on   : 26-Apr-2022
**  Search String      : Bug#33805591
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  Last Modified By   : Akhila Elsa Samson
**  Last modified on   : 10-Mar-2023
**  Search String      : Redwood_changes
**  Reason             : Redwood changes
****************************************************************************************************************************/
function fnPostLoad_CVS_TDUAU_KERNEL(screenArgs) {
	setTimeout( function () {  //Redwood_changes_1
	subScreen = 'Y';
	if (screenArgs['SUB_SCREEN'] == 'Y'){
		document.getElementById('BLK_CONTDET__EXT_FCCREF').value = screenArgs['FCCREF'];
		document.getElementById('BLK_CONTDET__SRCCD').value = screenArgs['SRCCD'];
		document.getElementById('BLK_CONTDET__BRN').value = screenArgs['BRN'];
		document.getElementById('BLK_CONTDET__VERNO').value = screenArgs['VERNO'];
		functionOrigin = 'KERNEL'; 
		dbIndexArray['BLK_CONTDET'] = getDbIndex("BLK_CONTDET");
		gAction = "EXECUTEQUERY";
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		var msgStatus = fnProcessResponse();
		fnEnable_Rekey();
	}	
	},0); //Redwood_changes_1
	return true;
}

function fnEnable_Rekey(){
	
	 //Bug#33805591:Changes Starts here
	 if (document.getElementById("BLK_REKEY__TXTCPTY").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__CPTY")); 
		 //fnEnableElement(document.getElementById("BLK_REKEY__CPTYI")); // Redwood_changes
	 }
	 if (document.getElementById("BLK_REKEY__TXTCCY").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__CCY"));
		// fnEnableElement(document.getElementById("BLK_REKEY__CCYI"));// Redwood_changes
	 }
	 if (document.getElementById("BLK_REKEY__TXTTRD_AMT").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__TRD_AMT"));
		// fnEnableElement(document.getElementById("BLK_REKEY__TRD_AMTI"));// Redwood_changes
	 }
	 if (document.getElementById("BLK_REKEY__TXTTRD_PRICE").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__TRD_PRICE"));
		// fnEnableElement(document.getElementById("BLK_REKEY__TRD_PRICEI")); // Redwood_changes
	 }
	 if (document.getElementById("BLK_REKEY__TXTTRD_DT").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__TRD_DT"));
		 //fnEnableElement(document.getElementById("BLK_REKEY__TRD_DTI")); // Redwood_changes
	 }
	 if (document.getElementById("BLK_REKEY__TXTEXPT_STL_DT").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__EXPT_STL_DT")); 
		// fnEnableElement(document.getElementById("BLK_REKEY__EXPT_STL_DTI")); // Redwood_changes
	 }
	 fnEnableElement(document.getElementById("BTN_OK"));
	 //Bug#33805591:Changes Ends here
	 
	//Commented below code for Bug#33805591
	  /*fnEnableElement(document.getElementById("BLK_REKEY__CPTY")); //OBCL_14.4#SLT Sub Participation changes starts
		fnEnableElement(document.getElementById("BLK_REKEY__CCY"));
		fnEnableElement(document.getElementById("BLK_REKEY__TRD_AMT"));
		fnEnableElement(document.getElementById("BLK_REKEY__TRD_PRICE"));
		fnEnableElement(document.getElementById("BLK_REKEY__TRD_DT"));
		fnEnableElement(document.getElementById("BLK_REKEY__EXPT_STL_DT")); //OBCL_14.4#SLT Sub Participation changes ends
		fnEnableElement(document.getElementById("BTN_OK"));*/ 
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