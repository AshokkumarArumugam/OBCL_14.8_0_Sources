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
**  Oracle Financial Services Software Limitd.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : TLDTRSAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Changed By         : Jayaram N
**  Date               : 20-May-2020
**  Change Description : TLDTDUPL/TLDSETTL - REKEY VALIDATION FAILING
**  Search String      : PID-PANFLX08001 ITR SFRNUM:Bug#31133064_TLDTDUPL/TLDSETTL - REKEY VALIDATION FAILING

**  Changed By         : Surya Prabha
**  Date               : 14-Sept-2021
**  Change Description : Code fix to populate Settlement info on first visit
**  Search String      : Bug#33308256 changes

**  Changed By         : Jayaram N
**  Date               : 04-Oct-2021
**  Change Description : TLDSETTL-UNABLE TO AUTHORIZE THE SETTLEMENT OF DRAFT TRADE AFTER UNCHECKING AND CHECKING THE OVERRIDE
**  Search String      : Bug#33400722

**  Last Modified By   : Jayaram N
**  Last modified on   : 06-Feb-2022
**  Search String      : Bug#33805591
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  Last Modified By   : Jayaram N
**  Last modified on   : 26-Apr-2022
**  Search String      : Bug#33805591
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 08-MAY-2024
**  Search String      : Bug#36596453 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize rekey fields are disabled.

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
						 Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
*****************************************************************************************************************************/

function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	//setTimeout( function () { //REDWOOD_CHANGES
	subScreen = 'Y';
	// Bug#33308256 changes start
	if(!fnProcessAuthOnLoad(screenArgs))
        return false;
    // Bug#33308256 changes end
	if (screenArgs['SUB_SCREEN'] == 'Y'){
		document.getElementById('BLK_AUTH__FCCREF').value = screenArgs['FCCREF'];
		functionOrigin = 'KERNEL'; 
		dbIndexArray['BLK_AUTH'] = getDbIndex("BLK_AUTH");
		gAction = "EXECUTEQUERY";
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		var msgStatus = fnProcessResponse();
		fnEnableElement(document.getElementById("BLK_AUTH__BTN_STL_INFO"));
		fnEnableElement(document.getElementById("BLK_AUTH__BTN_AUTH"));		//Bug#33400722:Added
	}
	// Bug#33308256 changes start
	fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
	// Bug#33308256 changes end	
	//setTimeout( function(){ //REDWOOD_CHANGES

	//Bug#36619894_1 changes starts	
	//var rowRef =getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows;  
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_AUTH_OVD");
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends
      {
	     fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	//},0); //REDWOOD_CHANGES
	fnEnable_Rekey();	 //Bug#31133064_TLDTDUPL/TLDSETTL - REKEY VALIDATION FAILING
	//},0); //REDWOOD_CHANGES
	return true;
}

//Bug#31133064_TLDTDUPL/TLDSETTL - REKEY VALIDATION FAILING - Start
function fnEnable_Rekey()
{
	setTimeout( function () { //Bug#36596453 changes
	//Bug#33805591:Changes Starts here
	if (document.getElementById("BLK_AUTH__TXTTRDAMT").value =='Y') {
		fnEnableElement(document.getElementById("BLK_AUTH__TRDAMT"));
		//fnEnableElement(document.getElementById("BLK_AUTH__TRDAMTI")); //Redwood_Changes
	}
	if (document.getElementById("BLK_AUTH__TXTCNPRTY").value =='Y') {
		fnEnableElement(document.getElementById("BLK_AUTH__CNPRTY"));
		//fnEnableElement(document.getElementById("BLK_AUTH__CNPRTYI"));  //Redwood_Changes
	}
	if (document.getElementById("BLK_AUTH__TXTTRDPRICE").value =='Y') {
		fnEnableElement(document.getElementById("BLK_AUTH__TRDPRICE"));
		//fnEnableElement(document.getElementById("BLK_AUTH__TRDPRICEI"));  //Redwood_Changes
	}
	if (document.getElementById("BLK_AUTH__TXTTRDDT").value =='Y') {
		fnEnableElement(document.getElementById("BLK_AUTH__TRDDT"));
		//fnEnableElement(document.getElementById("BLK_AUTH__TRDDTI"));  //Redwood_Changes
	}
	if (document.getElementById("BLK_AUTH__TXTEXPSETDT").value =='Y') {
		fnEnableElement(document.getElementById("BLK_AUTH__EXPSETDT"));
		//fnEnableElement(document.getElementById("BLK_AUTH__EXPSETDTI"));  //Redwood_Changes
	}
	if (document.getElementById("BLK_AUTH__TXTCCY").value =='Y') {
		fnEnableElement(document.getElementById("BLK_AUTH__CCY"));
		//fnEnableElement(document.getElementById("BLK_AUTH__CCYI"));  //Redwood_Changes
	}
	fnEnableElement(document.getElementById("BLK_AUTH__BTN_AUTH"));
	//Bug#33805591:Changes Ends here
	   
    },0); //Bug#36596453 changes	
	//Commented below code for Bug#33805591
	/*
		fnEnableElement(document.getElementById("BLK_AUTH__TRDAMT")); //OBCL_14.4#SLT Sub Participation changes starts
		fnEnableElement(document.getElementById("BLK_AUTH__CNPRTY"));
		fnEnableElement(document.getElementById("BLK_AUTH__TRDPRICE"));
		fnEnableElement(document.getElementById("BLK_AUTH__TRDDT"));
		fnEnableElement(document.getElementById("BLK_AUTH__EXPSETDT"));
		fnEnableElement(document.getElementById("BLK_AUTH__CCY")); //OBCL_14.4#SLT Sub Participation changes ends
		//fnEnableElement(document.getElementById("BTN_OK"));	//Bug#33400722:Commented
		fnEnableElement(document.getElementById("BLK_AUTH__BTN_AUTH"));	//Bug#33400722:Added */
		
}
//Bug#31133064_TLDTDUPL/TLDSETTL - REKEY VALIDATION FAILING - End

function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById("BLK_AUTH__BTN_STL_INFO"));
	//fnEnableElement(document.getElementById("BTN_OK"));	//Bug#33400722:Commented
	fnEnableElement(document.getElementById("BLK_AUTH__BTN_AUTH"));	//Bug#33400722:Added
	mainWin.t['1+2'] = ['Enter Query'];	

	//Bug#36619894_1 changes starts	
	//var rowRef =getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows;  
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_AUTH_OVD");
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends
      {
	     fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnDisableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[4].getElementsByTagName("oj-input-text")[0]);  
		 fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);   
		 }
	fnEnable_Rekey();	 //Bug#31133064_TLDTDUPL/TLDSETTL - REKEY VALIDATION FAILING
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
// Bug#33308256 changes start
/*function fnPreLoad_CVS_SETTLEMENTINFO_KERNEL(screenArgs) {
	setNodeText(selectSingleNode(dbDataDOM, "//BLK_AUTH/STL_INFO_VISIT"), 'Y');
    return true;
}*/
function fnsettle(){
	fnSubScreenMain('OLCSTINF','','CVS_SETTLEMENTINFO');	
	document.getElementById('BLK_AUTH__STL_INFO_VISIT').value = 'Y';
	return true;
}
// Bug#33308256 changes end
//oN VISIT OF STL INFO SET THE VALE STL_INFO_VISIT = 'Y'


//Bug#33400722:Added-Starts here
function fn_auth()
{	
	var g_prev_gAction = gAction;
    gAction = 'USRAUTH';
    if (!fnOnlineAuthorize(subScreen)) {
        var l_msgStat =getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (l_msgStat == 'SUCCESS') {
            disableForm();
        }
    gAction = g_prev_gAction;
    return true;
    }
//Bug#33400722:Added-Ends here
}

