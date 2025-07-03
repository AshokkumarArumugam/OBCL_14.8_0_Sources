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
**  File Name          : TLDTDOAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Last Modified By   : Jayaram N
**  Last modified on   : 03-Feb-2022
**  Description        : TLDTDONL : REKEY FIELDS ARE NOT EDITABLE DURING AUTHORISATION
**  Search Sting       : Bug#33918063
**  **  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
						   Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
function fnPostLoad_CVS_TDOAU_KERNEL(screenArgs) {
	subScreen = 'Y';
	if (screenArgs['SUB_SCREEN'] == 'Y'){
		document.getElementById('BLK_TDOAU__FCCREF').value = screenArgs['FCCREF'];
		functionOrigin = 'KERNEL'; 
		dbIndexArray['BLK_TDOAU'] = getDbIndex("BLK_TDOAU");
		gAction = "EXECUTEQUERY";
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		var msgStatus = fnProcessResponse();
		fnEnableElement(document.getElementById("BTN_OK"));
		fnEnable_Rekey();   //Bug#33918063:Added
	}
	//Bug#36619894_1 changes starts	
	//var rowRef =getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows;  
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_TDOAU_OVD");
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows[rowIndex].cells[2].getElementsByTagName("oj-input-text")[0]);
         
       }	
	return true;
}


function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById("BTN_OK"));
	fnEnable_Rekey(); //Bug#33918063:Added
	mainWin.t['1+2'] = ['Enter Query'];	

	//Bug#36619894_1 changes starts	
	//var rowRef =getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows;  
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_TDOAU_OVD");
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends
      {
	     fnEnableElement(getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnDisableElement(getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows[rowIndex].cells[4].getElementsByTagName("oj-input-text")[0]);  
		 fnEnableElement(getTableObjForBlock("BLK_TDOAU_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);   
		 }
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
function fnPostClose_CVS_TDOAU_KERNEL(screenArgs){	
	mainWin.t['1+2'] = '';
	return true;
}

//Bug#33918063:Changes Starts here 
function fnEnable_Rekey()
{
 	 if (document.getElementById("BLK_REKEY__TXTCPTY").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_CPTY")); 
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_CPTYI")); 
	 }
	 if (document.getElementById("BLK_REKEY__TXTCCY").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_CCY"));
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_CCYI"));
	 }
	 if (document.getElementById("BLK_REKEY__TXTTRD_AMT").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_TRD_AMT"));
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_TRD_AMTI"));
	 }
	 if (document.getElementById("BLK_REKEY__TXTTRD_PRICE").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_TRD_PRICE"));
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_TRD_PRICEI"));
	 }
	 if (document.getElementById("BLK_REKEY__TXTTRD_DT").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_TRD_DT"));
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_TRD_DTI"));
	 }
	 if (document.getElementById("BLK_REKEY__TXTEXPT_STL_DT").value =='Y') {
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_EXPT_SETTL_DT")); 
		 fnEnableElement(document.getElementById("BLK_REKEY__RK_EXPT_SETTL_DTI")); 
	 }
	 fnEnableElement(document.getElementById("BTN_OK"));	 
}
//Bug#33918063:Changes Ends here 