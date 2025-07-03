/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
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
**  File Name          : LPDCOMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
  Changed By         : Palanisamy M
  Changed On         : 16-Nov-2021
  Search String      : BUG#33393976
  Change Reason      : Added code for query from ACDTRNQY screen by getting contract ref no.  
  	
  Changed By         : Akhila Samson
  Date               : 03-Mar-2023
  Change Description : Redwood changes
  Search String      : Bug#34958820_Redwood_changes
  
  	
  Changed By         : Sudharshini Balaji
  Changed On         : 23-June-2023
  Search String      : BUG#35521631
  Change Reason      : Commented REVERSE action set on Dairy Button  
  
**  Changed By         : Pallavi R
**  Date               : 20-Nov-2023
**  Change Description : Redwood Compatability changes
**  Search String      : OBCL_PreSales_#36013477 Changes

**Changed By         : Arunpraath
**Changed On         : 21-Jun-2024
**Search String      : BUG#36742619 
**Change Reason      : Added code for query LPDCOMNT screen from OLDCRPVW screen by getting contract ref no.

****************************************************************************************************************************/
var gPrevAction;
var gEnableButton = false;
var gDisabledefschButton= false;
var gDisablerdfschButton= false;
var gDisableschblock= false;

function  fnOnClick_BTN_NEXT(){
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = 'VERSIONQUERY';
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value); //Bug#34958820_Redwood_changes
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value); //Bug#34958820_Redwood_changes
	if(verNo == versionCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}
	if(verNo<versionCount)
	{
		verNo++;
		//document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;	//Bug#34958820_Redwood_changes
		document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;			
		appendData(document.getElementById("TBLPageAll"));
		g_prev_gAction=gAction;
		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


function  fnOnClick_BTN_PREV(){
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = 'VERSIONQUERY';
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value); //Bug#34958820_Redwood_changes
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value); //Bug#34958820_Redwood_changes
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	verNo--;
	if(verNo>0)
	{			
		//document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;	//Bug#34958820_Redwood_changes	
		document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;
		//document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo; //Bug#34958820_Redwood_changes		
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;
		appendData(document.getElementById("TBLPageAll"));
		g_prev_gAction=gAction;
		
		gAction='EXECUTEQUERY';		
		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


///////////////////////////////////////////////////////////////////////////////////////HITESH
function fnShowSubscreen_CVS_REVERSE() {
    screenArgs = new Array();
    screenArgs['l_values'] = document.getElementById("BLK_OLTBS_CONTRACT__CONTRACT_REF_NO").value;

   
    screenArgs['FUNCTION_ID'] = 'OLSDRYET';
    screenArgs['PARENT_FUNC_ID'] = 'LPDCOMNT';
    funcid = 'OLSDRYET';
    parent.screenArgs = screenArgs;
    mainWin.dispHref1("OLSDRYET", parent.seqNo);
}

function fn_Dairy() {
 //   gAction = 'REVERSE'; commented for BUG#35521631
    fnShowSubscreen_CVS_REVERSE();
}
///////////////////////////////////////////////////////////////////////////////////////HITESH





function fnPreAuthorize_KERNEL(){
    authFunction = 'LPDTRAUT';
    authUixml = 'LPDTRAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LPDTRAUT'] = "KERNEL";
    ArrPrntFunc['LPDTRAUT'] = "";
    ArrPrntOrigin['LPDTRAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTRACT_REF_NO').value;    
    return true;
}

function fnPostExecuteQuery_KERNEL() {
	gEnableButton = true;
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV")); //OFCL_12.3.0.0.0_25039084 changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT")); //OFCL_12.3.0.0.0_25039084 changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_DAIRY")); //OFCL_12.3.0.0.0_25039084 changes
	return true;
}

//SUMMARY
function fn_GetCellIndex(pVar) {
    for (var i = 0; i < getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells.length; i++) { //Bug#34958820_Redwood_changes
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells[i].getAttribute("name") == pVar) { //Bug#34958820_Redwood_changes
            return i;
        }
    }
}
/////////////////////////////////////////////////////////
function fnCheck() {
	//debugger;
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length; //Bug#34958820_Redwood_changes
    //alert(len);
    msob_tchk = 0;
    for (i = 0; i < len; i++) {
        //if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]) { //Bug#34958820_Redwood_changes
            //if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].value) { //Bug#34958820_Redwood_changes//OBCL_PreSales_#36013477 Changes
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked){//OBCL_PreSales_#36013477 Changes
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            //}
        } else
            break;
    }
    if (msob_tchk == 0) {
        alert('Please Select a Record');
        //showErrorAlerts('IN-HEAR-206');
        return false;
    } else if (msob_tchk > 1) {
        alert('Please Select One Record');
        //showErrorAlerts('IN-HEAR-206');
        return false;
    }
    return true;
}

function fnTranche() {
   //debugger;
    //alert('inside Tranche');
    screenArgs = new Array();
    screenArgs['Product_Type'] = 'T';
    var tableObject = getTableObjForBlock('TBL_QryRslts'); //Bug#34958820_Redwood_changes
    var numRows = tableObject.tBodies[0].rows.length;
    if (fnCheck()) {
        for (var index = 0; index <= numRows - 1; index++) {
            //if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("oj-input-text")[0].value == true) {  //Bug#34958820_Redwood_changes//OBCL_PreSales_#36013477 Changes
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked){//OBCL_PreSales_#36013477 Changes
                var ContRef = fn_GetCellIndex("CONTRACT_REF_NO");
                screenArgs['TRANREF'] = tableObject.tBodies[0].rows[index].cells[ContRef].innerText;
                parent.screenArgs = screenArgs;
                mainWin.dispHref1("LPSCOMNT", parent.seqNo);
            }
        }
    }
    return true;
}
function fnPartFacility() {
   //debugger;
    screenArgs = new Array();
    screenArgs['Product_Type'] = 'F';
    var tableObject = getTableObjForBlock('TBL_QryRslts');  //Bug#34958820_Redwood_changes
    var numRows = tableObject.tBodies[0].rows.length;
    if (fnCheck()) {
        for (var index = 0; index <= numRows - 1; index++) {
            //if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("oj-input-text")[0].value == true) {  //Bug#34958820_Redwood_changes//OBCL_PreSales_#36013477 Changes
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked){//OBCL_PreSales_#36013477 Changes
                var ContRef = fn_GetCellIndex("CONTRACT_REF_NO");
                screenArgs['FCCREF'] = tableObject.tBodies[0].rows[index].cells[ContRef].innerText;
                parent.screenArgs = screenArgs;
                mainWin.dispHref1("LPSCOMNT", parent.seqNo);
            }
        }
    }
    return true;
}
function fnDrawDown() {
    // debugger;
    screenArgs = new Array();
    screenArgs['Product_Type'] = 'D';
    var tableObject = getTableObjForBlock('TBL_QryRslts');  //Bug#34958820_Redwood_changes
    var numRows = tableObject.tBodies[0].rows.length;
    if (fnCheck()) {
        for (var index = 0; index <= numRows - 1; index++) {
            //if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("oj-input-text")[0].value == true) {  //Bug#34958820_Redwood_changes//OBCL_PreSales_#36013477 Changes
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked){//OBCL_PreSales_#36013477 Changes
                //var ContRef = fn_GetCellIndex("PARTY_TRANCHE_REF_NO");
                var ContRef = fn_GetCellIndex("CONTRACT_REF_NO");
                screenArgs['PTREF'] = tableObject.tBodies[0].rows[index].cells[ContRef].innerText;
                parent.screenArgs = screenArgs;
                mainWin.dispHref1("LPSCOMNT", parent.seqNo);
            }
        }
    }
    return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function fnDetail() {
    
    var tableObject = getTableObjForBlock('TBL_QryRslts');  //Bug#34958820_Redwood_changes
    var numRows = tableObject.tBodies[0].rows.length;
    var rowid;
	if (fnCheck()) {
    for (var index = 0; index <= numRows - 1; index++) {
        //if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("oj-input-text")[0].value == true) {   //Bug#34958820_Redwood_changes//OBCL_PreSales_#36013477 Changes
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked){//OBCL_PreSales_#36013477 Changes
            rowid = index;
        }
    }
	}
    fnShowDetail(rowid);
    return true;
}
//OBCL_PreSales_#36013477 Changes Starts
/*function fnPostLoad_Sum_KERNEL(e) {
    //debugger;	
    if (typeof(parent.screenArgs) != 'undefined') {
        //var evnt = window.event || e;//Ashok Changes
        document.getElementById("BLK_LBVWS_PARTY_SUMMARY__PRODUCT_TYPE").value = parent.screenArgs['Product_Type'];
        if (parent.screenArgs['Product_Type'] == 'T') {           
           	//document.getElementById("TRANCHE").style.visibility = "hidden";
			document.getElementById("TRANCHE").nextSibling.style.visibility = "hidden";
			document.getElementById("DRAWDOWN").style.visibility = "hidden";
			document.getElementById("DRAWDOWN").nextSibling.style.visibility = "hidden";
			document.getElementById("PART_FACILITY").style.visibility = "hidden";
			document.getElementById("PART_FACILITY").nextSibling.style.visibility = "hidden";
			document.getElementById("DETAIL").style.visibility = "hidden";
            document.getElementById("BLK_LBVWS_PARTY_SUMMARY__BORROWER_TRANCHE_REF_NO").value = parent.screenArgs['TRANREF'];
        }
        //////////////////////////////////////////////////////////		 
        if (parent.screenArgs['Product_Type'] == 'D') {
			document.getElementById("TRANCHE").style.visibility = "hidden";
			document.getElementById("TRANCHE").nextSibling.style.visibility = "hidden";
			//document.getElementById("DRAWDOWN").style.visibility = "hidden";
			document.getElementById("DRAWDOWN").nextSibling.style.visibility = "hidden";
			document.getElementById("PART_FACILITY").style.visibility = "hidden";
			document.getElementById("PART_FACILITY").nextSibling.style.visibility = "hidden";
			//document.getElementById("DETAIL").nextSibling.style.visibility = "visible";
			//document.getElementById("DETAIL").style.visibility = "visible";
			document.getElementById("DETAIL").style.visibility = "hidden";
            document.getElementById("BLK_LBVWS_PARTY_SUMMARY__BORROWER_CONTRACT_REF_NO").value = parent.screenArgs['PTREF'];
		
        }
        //////////////////////////////////////////////////////////
        if (parent.screenArgs['Product_Type'] == 'F') {
			document.getElementById("DRAWDOWN").style.visibility = "hidden";
			document.getElementById("DRAWDOWN").nextSibling.style.visibility = "hidden";
			document.getElementById("TRANCHE").style.visibility = "hidden";
			document.getElementById("TRANCHE").nextSibling.style.visibility = "hidden";
			//document.getElementById("PART_FACILITY").style.visibility = "hidden";
			document.getElementById("PART_FACILITY").nextSibling.style.visibility = "hidden";
			document.getElementById("DETAIL").style.visibility = "hidden";
			document.getElementById("BLK_LBVWS_PARTY_SUMMARY__BORR_FCLT_REF_NO").value = parent.screenArgs['FCCREF'];			
        }
        /////////////////////////////////////////////////////////
		fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
               
	}
	else {
		document.getElementById("TRANCHE").style.visibility = "hidden";
		document.getElementById("TRANCHE").nextSibling.style.visibility = "hidden";
		document.getElementById("DRAWDOWN").style.visibility = "hidden";
		document.getElementById("DRAWDOWN").nextSibling.style.visibility = "hidden";
		document.getElementById("DETAIL").style.visibility = "hidden";
		//document.getElementById("DETAIL").nextSibling.style.visibility = "hidden";
		document.getElementById("PART_FACILITY").style.visibility = "hidden";	
		document.getElementById("PART_FACILITY").nextSibling.style.visibility = "hidden";
		parent.screenArgs = undefined;
	}
       return true;
}*/
function fnPostLoad_Sum_KERNEL(e) {
    debugger;	
	var len =document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button").length;
    if (typeof(parent.screenArgs) != 'undefined') {
        document.getElementById("BLK_LBVWS_PARTY_SUMMARY__PRODUCT_TYPE").value = parent.screenArgs['Product_Type'];		
		for (var idx = 0; idx <len; idx++) { 
			if ((parent.screenArgs['Product_Type'] == 'T') && (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].textContent != "Tranche")){					
				document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].style.visibility ="hidden";
				document.getElementById("BLK_LBVWS_PARTY_SUMMARY__BORROWER_TRANCHE_REF_NO").value = parent.screenArgs['TRANREF'];

			}
			//////////////////////////////////////////////////////////		
			if ((parent.screenArgs['Product_Type'] == 'D') && (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].textContent != "Drawdown")){
				document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].style.visibility ="hidden";
				document.getElementById("BLK_LBVWS_PARTY_SUMMARY__BORROWER_CONTRACT_REF_NO").value = parent.screenArgs['PTREF'];
			}		
			
			//////////////////////////////////////////////////////////
			if ((parent.screenArgs['Product_Type'] == 'F') && (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].textContent != "Participant Facility Detail")){
				document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].style.visibility ="hidden";
				document.getElementById("BLK_LBVWS_PARTY_SUMMARY__BORR_FCLT_REF_NO").value = parent.screenArgs['FCCREF'];			
			}
		}
        /////////////////////////////////////////////////////////
		fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
               
	}
	else {
		for (var idx = 0; idx < len; idx++) { 	 			//document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].nextSibling.style.visibility ="hidden";
			document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].style.visibility ="hidden";
		}	
		parent.screenArgs = undefined;
	}
       return true;
}
//OBCL_PreSales_#36013477 Changes Ends
//BUG#33393976 starts
function fnPostLoad_KERNEL() {
	var parentWin = fnGetParentWin();
        if (parentWin != "") {
			
			//Bug#36742619 changes starts
			if (parentWin.parentWinParams.PARENT_FUNC_ID == "OLDCRPVW") 
			{                    
			fnEnterQuery();
			document.getElementById("BLK_OLTBS_CONTRACT__CONTRACT_REF_NO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
			gAction= "EXECUTEQUERY";
			fnExecuteQuery();
			}
			//Bug#36742619 changes ends
			
			if  (parent.screenArgs['PARENT_FUNC_ID'] == "ACDTRNQY") {
              fnEnterQuery();
              document.getElementById("BLK_OLTBS_CONTRACT__CONTRACT_REF_NO").value =
                parent.screenArgs["CONTREF"];
              gAction = "EXECUTEQUERY";
              fnExecuteQuery();
            }
		}
}
//BUG#33393976 ends