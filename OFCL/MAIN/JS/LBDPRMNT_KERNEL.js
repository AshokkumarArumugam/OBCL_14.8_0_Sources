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
**  File Name          : LBDPRMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Revathi Aula
**  Last modified on   : 08-Nov-2019
**  Full Version       : OBCL_14.3.0.0.0
**  Search String      : OBCL_14.1_SUPP_BCIEHN_#30504621 changes
**  Reason             : Added code to disable Additional Preferences for Draw down during Modification

**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838

**Changed By         : Akhila Samson
**Date               : 18-MAR-2021
**Change Description : Date format.
**Search String      : Bug#31400838

**  Last Modified By   : Rahul Garg
**  Last modified on   : 21-Apr-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820

**Changed By         : Sudharshini Balaji
**Date               : 22-JAN-2024
**Change Description : Added action code condition while calling chkiccf function.
**Search String      : Bug#36200495

****************************************************************************************************************************/
var prfvstd = 'N';
function fnInsertComp() {
    var g_prev_gAction = gAction;
    gAction = "INSCOMP";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
    gDispAlertOnSuccess = 'N';
    if (!fnProcessResponse()) {
        gAction = g_prev_gAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        return false;
    }
    gAction = g_prev_gAction;
    return true;
}
//Bug#31400838 start
/*
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS
function fnPostNew_KERNEL(){

     
     fireHTMLEvent(document.getElementById("BLK_PRODUCT__PRDSTARTDT"),"onpropertychange"); 
	return true;

}
//OBCL_14.3_SUPPORT_BUG#31400838  CHANGES ENDS
*/
//Bug#31400838 end
function fnPostLoad_CVS_PREFERENCES_KERNEL() {
    if (gAction == 'NEW' || gAction == 'MODIFY') {
    prfvstd = 'Y';
    fnInsertComp();
    }
	if (gAction == 'NEW')
	{
		//if (parent.document.getElementById('BLK_PRODUCT__PRODTYPE').value) {		// commented for Bug#34958820_Redwood
		if (parent.getElementsByOjName("PRODTYPE")[0].getElementsByTagName("input")[0].checked) {	// Added for Bug#34958820_Redwood
		disableTabs("TAB_LS_ADDL_PREF");
		}
	}
	if (gAction == 'MODIFY')
	{
		enableTabs("TAB_LS_ADDL_PREF");
		//if (parent.document.getElementById('BLK_PRODUCT__PRODTYPE2').value) {						// commented for Bug#34958820_Redwood
		if (parent.getElementsByOjName("PRODTYPE")[0].getElementsByTagName("input")[1].checked) {		// Added for Bug#34958820_Redwood
		fnEnableElement(document.getElementById('BtnSectionNavSEC_TWOExpand'));
		fnEnableElement(document.getElementById('BtnSectionNavSEC_HOLExpand'));
		fnEnableElement(document.getElementById('BtnSectionNavSEC_HOL2Expand'));
		fnEnableElement(document.getElementById('BtnSectionNavSEC_HOL3Expand'));
		fnDisableElement(document.getElementById('BtnSectionNavSEC_REVAL_PREFExpand'));
		}
		//if (parent.document.getElementById('BLK_PRODUCT__PRODTYPE').value) {		//Commented for Bug#34958820_Redwood
		if (parent.getElementsByOjName("PRODTYPE")[0].getElementsByTagName("input")[0].checked) {	// Added for Bug#34958820_Redwood
		fnDisableElement(document.getElementById('BtnSectionNavSEC_TWOExpand'));
		fnDisableElement(document.getElementById('BtnSectionNavSEC_HOLExpand'));
		fnDisableElement(document.getElementById('BtnSectionNavSEC_HOL2Expand'));
		fnDisableElement(document.getElementById('BtnSectionNavSEC_HOL3Expand'));
		fnEnableElement(document.getElementById('BtnSectionNavSEC_REVAL_PREFExpand'));
		disableTabs("TAB_LS_ADDL_PREF"); // OBCL_14.1_SUPP_BCIEHN_#30504621 changes
		}
		
	}
	
		try {
                /* Commented for Bug#34958820_Redwood
				if (parent.document.getElementById('BLK_PRODUCT__PRODTYPE2').value) {
                    var len = document.getElementById("DIVSubSystem").children[0].children.length;
                    for (var idx = 0; idx < len; idx++) {
                        if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_ROLLOVER" || document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_SPECIALPENALTY" ){
                            fnDisableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0]);
                        }
                    }
                } */
				// changes start for Bug#34958820_Redwood
				if (parent.getElementsByOjName("PRODTYPE")[0].getElementsByTagName("input")[1].checked) {	
					var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button").length;
					for (var idx = 0; idx < len; idx++) {
						if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx].id == "CVS_ROLLOVER" || document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx].id  == "CVS_SPECIALPENALTY" ){
							fnDisableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx]);
						}
					}
				}
				// Changes end for Bug#34958820_Redwood
				/* Commented for Bug#34958820_Redwood
				if (parent.document.getElementById('BLK_PRODUCT__PRODTYPE').value) {
                    var len = document.getElementById("DIVSubSystem").children[0].children.length;
                    for (var idx = 0; idx < len; idx++) {
                        if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_ROLLOVER" || document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_SPECIALPENALTY") {
                            fnEnableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonH")[0]);
                        }
                    }
                }
				*/
				// Changes start for Bug#34958820_Redwood
				if (parent.getElementsByOjName("PRODTYPE")[0].getElementsByTagName("input")[0].checked) {	
					var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button").length;
					for (var idx = 0; idx < len; idx++) {
						if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx].id == "CVS_ROLLOVER" || document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx].id  == "CVS_SPECIALPENALTY" ){
							fnEnableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx]);
						}	
					}
				}
				// Changes end for 	Bug#34958820_Redwood
        }
     catch (e) {}
	
    return true;
}
function fnPreSave_KERNEL() {
    if (gAction == 'NEW' || gAction == 'MODIFY') {
    if (prfvstd == 'N') {
    fnInsertComp();
    }
    }
    return true;
}
//Added for LFCLSFEE
function fnPreLoad_CVS_MAIN_KERNEL(screenArgs){
	/* commented for Bug#34958820_Redwood
    //if (document.getElementById('BLK_PRODUCT__PRODTYPE').value){
	  if (getElementsByOjName("PRODTYPE")[0].getElementsByTagName("input")[0].checked) {	
        screenArgs['PRODTYPE'] = document.getElementById('BLK_PRODUCT__PRODTYPE').value;
    }
    //else if (document.getElementById('BLK_PRODUCT__PRODTYPE2').value){
	  else if (getElementsByOjName("PRODTYPE")[0].getElementsByTagName("input")[1].checked) {	
        //screenArgs['PRODTYPE'] = document.getElementById('BLK_PRODUCT__PRODTYPE2').value;
		 screenArgs['PRODTYPE'] = document.getElementById('BLK_PRODUCT__PRODTYPE').value;
    }*/
	screenArgs['PRODTYPE'] = document.getElementById('BLK_PRODUCT__PRODTYPE').value; // Added for Bug#34958820_Redwood
    return true;
}
function fnChkTime(){
	try{
	var time = document.getElementById('BLK_LS_ADD_PREF__EXCHRATEFIXINGTIME').value;
   if (time != 'undefined')	{
	 var isValid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
	  if (isValid) {
            debugs("Valid Time", "A");
        } else {
            showErrorAlerts('LB-TIM-01');
        }
	}
	} catch (e) {}
	try{
	var time2 = document.getElementById('BLK_LS_ADD_PREF__DDNOTIFICATIONTIME').value;
   if (time2 != 'undefined')	{
	 var isValid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time2);
	  if (isValid) {
            debugs("Valid Time", "A");
        } else {
            showErrorAlerts('LB-TIM-01');
        }
	}
	} catch (e) {}
	return true;
}

function fnDisableBtn() {
    try {
        var x = getElementsByOjName("PRODTYPE").length;
        for (var index = 0; index < x; index++) {
            if (getElementsByOjName("PRODTYPE")[index].value) {
                if (getElementsByOjName("PRODTYPE")[index].value == "C") {
					/* commented for Bug#34958820_Redwood
                    var len = document.getElementById("DIVSubSystem").children[0].children.length;
                    for (var idx = 0; idx < len; idx++) {
                        if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "LFCLICCF") {
                            fnDisableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0]);
                        }
                    }*/
					// Chnage start for Bug#34958820_Redwood
					var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;
					for (var idx = 0; idx < len; idx++) {
						if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "LFCLICCF") {
							fnDisableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx]);
						}
					}
					// Changes end for Bug#34958820_Redwood
                }
				if (getElementsByOjName("PRODTYPE")[index].value == "L") {
					/* commented for Bug#34958820_Redwood
                    var len = document.getElementById("DIVSubSystem").children[0].children.length;
                    for (var idx = 0; idx < len; idx++) {
                        if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "LFCLICCF") {
                            fnEnableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonH")[0]);
                        }
                    }*/
					// Changes Start for Bug#34958820_Redwood
					var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;
					for (var idx = 0; idx < len; idx++) {
						if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "LFCLICCF") {
							fnEnableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx]);
						}
					}		
					// Changes end for Bug#34958820_Redwood
                }
				
            }

        }
    } catch (e) {}
    return true;
}
function chkiccf()
{
	var g_prev_gAction = gAction;
    gAction = "CHKICCF";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	 gAction = g_prev_gAction;
	return true;
}
function fnPostLoad_CVS_DEFLTSCHDLES_KERNEL(screenArgs) {
	
	if (gAction == 'NEW' || gAction == 'MODIFY') { //  Bug#36200495 CHANGES
	try {
	//if (parent.parent.document.getElementById('BLK_PRODUCT__PRODTYPE2').value){
	  if (parent.parent.document.getElementById('BLK_PRODUCT__PRODTYPE').value == 'C') {  // Added for Bug#34958820_Redwood	
	chkiccf();
	}
  }
     catch (e) {}
	}//  Bug#36200495 CHANGES
	return true;
}
function fnPostLoad_CVS_LIQ_ORDER_KERNEL(screenArgs) {
	if (gAction == 'NEW' || gAction == 'MODIFY') { //  Bug#36200495 CHANGES
	chkiccf();  
	}//  Bug#36200495 CHANGES
	return true;
}

function fnPostLoad_CVS_ROLE_TO_HEAD_MAP_KERNEL(screenArgs)
{
	if (gAction == 'NEW' || gAction == 'MODIFY') { //  Bug#36200495 CHANGES
	chkiccf();  
	}//  Bug#36200495 CHANGES
	return true;
}
function fnPostLoad_CVS_EVENTS_KERNEL(screenArgs)
{
	if (gAction == 'NEW' || gAction == 'MODIFY') { //  Bug#36200495 CHANGES
	chkiccf();  
	}//  Bug#36200495 CHANGES
	return true;
}
function fnPostLoad_CVS_MAIN_KERNEL(screenArgs)
{
	if (gAction == 'NEW' || gAction == 'MODIFY') { //  Bug#36200495 CHANGES
	chkiccf();  
	}//  Bug#36200495 CHANGES
	return true;
}
//Ashok
function fnPostLoad_KERNEL(screenArgs){
    addEvent(document.getElementById("BLK_PRODUCT__PRODTYPE"), "onchange", "fnDisableBtn()"); //Adding event on change of BLK_PRODUCT__PRODTYPE
	addEvent(document.getElementById("BLK_PRODUCT__PRODTYPE2"), "onchange", "fnDisableBtn()"); //Adding event on change of BLK_PRODUCT__PRODTYPE2
	fnDisableBtn(); 
    return true;
}

function fnPostExecuteQuery_KERNEL(screenArgs){
	fnDisableBtn(); 
    return true;
}
function fnPostUnlock_KERNEL(screenArgs){
	fnDisableBtn(); 
    return true;
}

function fnPostCopy_KERNEL(screenArgs){
	fnDisableBtn(); 
    return true;
}

function fnPreExit_KERNEL() {
	fnDisableBtn(); 
    return true;
}