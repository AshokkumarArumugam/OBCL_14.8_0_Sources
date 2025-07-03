/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  Written by         : 
**  Date of creation   : 
**  File Name          : STDPRCDE_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Anoop R
**  Last modified on   : 22-Oct-2014
**  Reason             : Added validations for end date in period code and financial cycle. Also made some cross browser changes.
**  Search String	   : 1203_19855022
****************************************************************************************************************************/


//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
var fcjRequestDOM;
var fcjResponseDOM;
var gErrCodes = "";

function fnPreLoad_KERNEL() {
	debugs("In fnPreLoad", "A");
	return true;
}
function fnPostLoad_KERNEL() {
	debugs("In fnPostLoad", "A");	
	return true;
}
function fnPreNew_KERNEL() {
	var newAction = true;
	debugs("In fnPreNew", "A");
	return true;
}
function fnPostNew_KERNEL() {
	debugs("In fnPostNew", "A");
	var g_prev_gAction = gAction;
	gAction = 'DEFAULT';
	appendData(document.getElementById("TBLPage" + strCurrentTabId));
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var messageNode;

	if (fcjResponseDOM) {
		var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

		if (msgStatus == 'FAILURE') {
			messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		} else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
			messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
		}

		var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
		setDataXML(getXMLString(pureXMLDOM));
		showData(dbStrRootTableName, 1);
		gAction = g_prev_gAction;
	}

	if (msgStatus == 'FAILURE') {
		var returnVal = displayResponse(messageNode);
		gAction = g_prev_gAction;
		return false;
	}
		//return true;
}
//1203_19855022 starts
function fnValidateEnddate()
{
	var arr1 = document.getElementById("BLK_STFINCLE__FCENDDT").value.split('-');
	var arr2 = document.getElementById("BLK_STFINCLE__FCSTDT").value.split('-');
	if(arr1.length > 0 && arr2.length > 0) {
		var startDate = new Date(arr2[0],arr2[1],arr2[2]);
		var endDate = new Date(arr1[0],arr1[1],arr1[2]);
		if(endDate < startDate) {
	   		showErrorAlerts('IN-HEAR-580');
			document.getElementById("BLK_STFINCLE__FCENDDT").value = "";
		}
	}
}
//1203_19855022 ends

function fnPreUnlock_KERNEL() {
	var unlock = true;
	debugs("In fnPreUnlock", "A");
		return true;
}
function fnPostUnlock_KERNEL() {
	debugs("In fnPostUnlock", "A");
		return true;
}

function fnPreCopy_KERNEL() {
	var copy = true;
	debugs("In fnPreCopy", "A");
		return true;
}
function fnPostCopy_KERNEL() {
	debugs("In fnPostCopy", "A");
		return true;
}
function fnPreEnterQuery_KERNEL() {
	var execute = true;
	debugs("In fnPreEnterQuery", "A");
		return true;
}

function fnPostEnterQuery_KERNEL() {
	debugs("In fnPostEnterQuery", "A");
		return true;
}

function fnPreExecuteQuery_KERNEL() {
	var execute = true;
	debugs("In fnPreExecuteQuery", "A");
		return true;
}

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
		return true;
}

function fnPreSave_KERNEL() {
	if(!fnValidate())
        return false;

	debugs("In fnPreSave", "A");
	var isValid = true;
	setChildKeyValues("STTMS_FIN_CYCLE", "FIN_CYCLE", "FIN_CYCLE");
	setChildKeyValues("STTMS_PERIOD_CODES", "PERIOD_CODE", "PERIOD_CODE");
	if (!isValid) {
		// Call Functions in Util
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
	return true;
}

function fnPostAddRow_BLK_STPRDCDS_KERNEL() {

	if (document.getElementById("BLK_STFINCLE__FCENDDT").value == "") {
		//alert("Please enter the End Date");
		showErrorAlerts('IN-HEAR-270');//NLS change -Removal of hardcoded alerts
		return false;
	}

	if (document.getElementById("BLK_STFINCLE__FCSTDT").value == "") {
		//alert("Please enter the Start Date");
		showErrorAlerts('IN-HEAR-271');//NLS change -Removal of hardcoded alerts
		return false;
	}

	if (document.getElementById("BLK_STFINCLE__FCENDDT").value != "") {
		if (!fncheckdate(document
				.getElementById("BLK_STFINCLE__FCENDDT").value)) {
			//alert("End Date of a financial cycle should be the last day of a month");
			showErrorAlerts('IN-HEAR-272');//NLS change -Removal of hardcoded alerts
			return false;
		}
	}

   var tableRef = getTableObjForBlock("BLK_STPRDCDS");
	var noOfRows = tableRef.tBodies[0].rows;
	var id = "BLK_STPRDCDS";
	//var newRow = addNewRow(id); //ANJALI

	if (noOfRows.length >= 1) {

		for (i = 0;i < noOfRows.length; i++) {
			var rowindx = noOfRows.length - 1;

			if (rowindx == 0) {
				tableRef.tBodies[0].rows[rowindx].cells[1]
						.getElementsByTagName("oj-input-text")[0].value = 'FIN';
				tableRef.tBodies[0].rows[rowindx].cells[2].getElementsByTagName("oj-input-text")[0].value = document
						.getElementById("BLK_STFINCLE__FCENDDT").value;
               // fireHTMLEvent(tableRef.tBodies[0].rows[rowindx].cells[3].getElementsByTagName("oj-input-text")[0], "onpropertychange");//FCUBS_KER11.1 ITR 1 SFR#1170 Santhosh added //1203_19855022 commented
			   
			   fireHTMLEvent(tableRef.tBodies[0].rows[rowindx].cells[2].getElementsByTagName("oj-input-text")[0], "onpropertychange");//FCUBS_KER11.1 ITR 1 SFR#1170 Santhosh added //1203_19855022
			   
					tableRef.tBodies[0].rows[rowindx].cells[3].getElementsByTagName("oj-input-text")[0].value = document
						.getElementById("BLK_STFINCLE__FCENDDT").value;
						
                //fireHTMLEvent(tableRef.tBodies[0].rows[rowindx].cells[4].getElementsByTagName("oj-input-text")[0], "onpropertychange");//FCUBS_KER11.1 ITR 1 SFR#1170 Santhosh added //1203_19855022 commented
				
				fireHTMLEvent(tableRef.tBodies[0].rows[rowindx].cells[3].getElementsByTagName("oj-input-text")[0], "onpropertychange");//FCUBS_KER11.1 ITR 1 SFR#1170 Santhosh added //1203_19855022
			} else if (rowindx == 1) {
				tableRef.tBodies[0].rows[rowindx].cells[2]
						.getElementsByTagName("oj-input-text")[0].value = document
						.getElementById("BLK_STFINCLE__FCSTDT").value;
                                fireHTMLEvent(tableRef.tBodies[0].rows[rowindx].cells[2].getElementsByTagName("oj-input-text")[0], "onpropertychange");//FCUBS_KER11.1 ITR 1 SFR#1170 Santhosh added
			} else {
				var date = tableRef.tBodies[0].rows[rowindx - 1].cells[3]
						.getElementsByTagName("oj-input-text")[0].value;
                                fireHTMLEvent(tableRef.tBodies[0].rows[rowindx].cells[3].getElementsByTagName("oj-input-text")[0], "onpropertychange");//FCUBS_KER11.1 ITR 1 SFR#1170 Santhosh added						

				if (date == "") {
					
					
					showErrorAlerts('CO-VAL-046');  
					tableRef.tBodies[0].rows[rowindx].cells[0]
							.getElementsByTagName("oj-input-text")[0].value = true;
					deleteSelectedRows(id);
					return false;
				}

				if (fncheckdate(date)) {
					var dt = fnIncrementDate(date);
					tableRef.tBodies[0].rows[rowindx].cells[2]
							.getElementsByTagName("oj-input-text")[0].value = dt;
                                        fireHTMLEvent(tableRef.tBodies[0].rows[rowindx].cells[2].getElementsByTagName("oj-input-text")[0], "onpropertychange");//FCUBS_KER11.1 ITR 1 SFR#1170 Santhosh added
					break;
				} else {
					
					
					showErrorAlerts('CO-VAL-047');  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
					
					//alert("The End Date should be Last Day of a Month for the row " + rowindx);
					tableRef.tBodies[0].rows[rowindx].cells[0]
							.getElementsByTagName("oj-input-text")[0].value = true;
					deleteSelectedRows(id);
					return false;
				}
			}
		}
	}

	// false has to be returned to prevent addition of new rows.
	return false;
}

function fncheckdate(date) {

	var arr = date.split('-');
	var days = arr[2];
	var month = arr[1];
	var year = arr[0];
	var noOfDays = daysInMonth(month, year);
	if (days != noOfDays)
		return false;

	return true;
}

function daysInMonth(month, year) {
	var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (month != 2)
		return m[month - 1];

	if (year % 4 != 0)
		return m[1];

	if (year % 100 == 0 && year % 400 != 0)
		return m[1];

	return m[1] + 1;
}

function fnIncrementDate(date) {
	var arr = date.split('-');
	var days = arr[2];
	var month = arr[1];
	var year = arr[0];

	days = 1;
	days = formatInt(days);

	if (month != 12) {
		month = parseInt(month, 10) + 1;
		month = formatInt(month);
	} else {
		month = 1;
		year = parseInt(year, 10) + 1;
	}

	date = year + "-" + month + "-" + days;
	if (date == "-NaN-01") {
		date = "";
	}
	return date;
}

function fnIncDate() {
	var tableRef = 	getTableObjForBlock("BLK_STPRDCDS");

	var noOfRows = tableRef.tBodies[0].rows;
	var index = noOfRows.length - 1;
	//  alert('again '+noOfRows.length);

	//for (index = 1;index < noOfRows.length; index++) {
	//alert('ymca  '+tableRef.tBodies[0].rows[index].cells[1].getElementsByTagName("oj-input-text")[0].value);
	if (gAction != "EXECUTEQUERY") { //12.0_14461316 CHANGES ADDES
		if (noOfRows.length > 1 && tableRef.tBodies[0].rows[index - 1].cells[1].getElementsByTagName("oj-input-text")[0].value != 'FIN') {
			var chkDate = tableRef.tBodies[0].rows[index - 1].cells[3].getElementsByTagName("oj-input-text")[0].value;
			tableRef.tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value = fnIncrementDate(chkDate);			
		}
		//}
	} //12.0_14461316 CHANGES ADDED	

	//1203_19855022 starts
	if(tableRef.tBodies[0].rows[index].cells[1].getElementsByTagName("oj-input-text")[0].value != 'FIN'){
		var arr1 = tableRef.tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value.split('-');
		var arr2 = tableRef.tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value.split('-');
		var startDate = new Date(arr1[0],arr1[1],arr1[2]);
		var endDate = new Date(arr2[0],arr2[1],arr2[2]);
		var arr3 = document.getElementById("BLK_STFINCLE__FCENDDT").value.split('-');
		var endFYDate =  new Date(arr3[0],arr3[1],arr3[2]);
		if(endDate < startDate) {
			showErrorAlerts('IN-HEAR-580');
			tableRef.tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value = "";
		}
		else if(endDate > endFYDate) {
			showErrorAlerts('IN-HEAR-581');
			tableRef.tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value = "";
		}
	}
	//1203_19855022 ends
}

function formatInt(num) {
	num = num.toString();
	if (num.length < 2)
		num = '0' + num;
	return num;
}
/*
function fnGetRowNumber() {
	dbIndexArray['STTMS_PERIOD_CODES'] = getRowIndex(event);
}

function fnDisplayPeriodCodes() {

	// Status need to be displayed for any action other than f7/f8. The action
	// code is blank after a record is queried.
	if (gAction != '') {
		return;
	}

	// Do not open the screen until a valid row is double clicked.
	var rowIndex = getRowIndex(evnt);
	if (rowIndex < 1) {
		return;
	}

	screenArgs = new Array();
	screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
	screenArgs['FUNCTION_ID'] = 'STDACPEQ';
	//screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/ENG/STDACPEQ.xml','CVS_MAIN');
	screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+mainWin.LangCode+'/STDACPEQ.xml','CVS_MAIN'); // NLS_11.4

	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'STDACPEQ';
	screenArgs['PARENT_FUNC_ID'] = 'STDACPER';
	screenArgs['MODULE'] = 'ST';
	screenArgs['FIN_CYCLE'] = document
			.getElementById("STTMS_FIN_CYCLE__FIN_CYCLE").value;
	screenArgs['PERIOD_CODE'] = document
			.getElementById("BLK_STTMS_PERIOD_CODES").tBodies[0].rows[rowIndex
			- 1].cells[1].getElementsByTagName("oj-input-text")[0].value;

	parent.screenArgs = screenArgs;
	appendData(document.getElementById('TBLPage' + strCurrentTabID));

	var newwin = mainWin
/*Commented by CB Utility.Please refer Developer Handbook document for info.*/
/*			.showModelessDialog(
					"dialogTop:74px;dialogLeft:253px; dialogHeight:480px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no");*/

/*} */
