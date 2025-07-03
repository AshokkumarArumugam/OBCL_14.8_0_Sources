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
**  File Name          : LBDREPRS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  SRF : 27322722
**  Purpose : Added Fetch button for LS rate fixing
**  Search string : OBCL_27322722

**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838

**Changed By         : Akhila Samson
**Date               : 18-MAR-2021
**Change Description : Date format.
**Search String      : Bug#31400838

**Changed By         : Arunprasath
**Date               : 11-Jun-2021
**Change Description : Added changes for split reprice
**Search String      : OBCL_14.4_SOFR_Reprice

**Changed By         : RAMYA M
**Date               : 09-FEB-2022
**Change Description : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
**Search String      : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES

**Changed By         : RAMYA
**Date               : 06-MAR-2022
**Change Description : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
**Search String      : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES


**Changed By         : RAMYA
**Date               : 13-MAR-2022
**Change Description : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
**Search String      : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES

**Changed By         : Divya J
**Date               : 08-Jun-2022
**Change Description : RATE DISPLAY ISSUE-BASE RATE 
**Search String      : OBCL_14.5_SUPPORT_Bug#34247237

**Changed By         : Rahul Garg
**Date               : 27-Jul-2022
**Change Description : QIP_LBDREPRS: WHILE SELECTING DD CONTRACT IN LBDREPRS AND TAB OUT, BOOKING DATE, VALUE DATE ETC. DOESNOT GET DEFAULTED. 
**Search String      : Bug#34356377

**Changed By         : Vineeth T M
**Date               : 17-Aug-2022
**Change Description : Fix for alignment issue of contract status.  
**Search String      : OBCL_14.5_SUPP#34490532 changes

**Changed By         : Rajni Kumari
**Date               : 24-Aug-2022
**Change Description : Bug 34487912 - LBDREPRS: EXCHANGE RATE SUB SCREEN VALUES NOT AUTO POPULATED OR RETAINED 
**Search String      : OBCL_14.5_SMTB_#34487912

**Changed By         : Sowmya Bitra
**Date               : 01-Dec-2022
**Change Description : Changes for editing rate fixing required flag during split reprice transaction
**Search String      : Bug#34819588

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES


**  CHANGE LOG         : RAMYA M
**  Last modified on   : 17-APR-2023
**  Reason             : Divsubsystem changes
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES


**Changed By         : Jayaram N
**Date               : 05-Aug-2023
**Change Description : LBDREPRS - UNHANDLED EXCEPTION ON VISITING INTEREST RATE FIXING CALL FORM
**Search String      : Bug#35425170

 
**  CHANGE LOG         : KAVITHA ASOKAN
**  Last modified on   : 03-MAY-2024
**  Reason             : Modified the code to default the currency in split detail grid. 
**  SEARCH STRING      : BUG#36567946 changes 

**  CHANGE LOG         : KAVITHA ASOKAN
**  Last modified on   : 13-AUG-2024
**  Reason             : Modified the code to fetch the checked state correctly. 
**  SEARCH STRING      : BUG#36567946 changes 

  **  Changed By         : T P Nihal Jain
  **  Changed On         : 28-jan-2025
  **  Change Description : added executequery function to make sure advices are refelected immediately after save.
  **  Search String      : BUG#37523280

****************************************************************************************************************************/
var gActiontry;
var l_Action ; //OBCL_14.5_SMTB_#34487912
//OBCL_27322722 starts
var screenArguments = new Array(); 
function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
//OBCL_27322722 ends

function fnPostNew_KERNEL(){
	//Bug#31400838 start
	/*
	document.getElementById('BLK_CONT_SPLIT_MASTER__SPLITVALUEDATE').value = document.getElementById('BLK_CONT_SPLIT_MASTER__SPLITBOOKDATE').value;
	//OBCL_14.3_SUPPORT_BUG#31400838 STARTS
	fireHTMLEvent(document.getElementById("BLK_CONT_SPLIT_MASTER__SPLITVALUEDATE"),"onpropertychange");
	fireHTMLEvent(document.getElementById("BLK_CONT_SPLIT_MASTER__SPLITBOOKDATE"),"onpropertychange");
	//OBCL_14.3_SUPPORT_BUG#31400838 ENDS
	*/
	//Bug#31400838 end
	// Changes start for BUG#34356377
	document.getElementById("BLK_CONT_SPLIT_MASTER__SPLITVALUEDATE").value = mainWin.AppDate; 
  	fireHTMLEvent(document.getElementById("BLK_CONT_SPLIT_MASTER__SPLITVALUEDATE"),"onpropertychange");
	document.getElementById("BLK_CONT_SPLIT_MASTER__SPLITBOOKDATE").value = mainWin.AppDate;	
	fireHTMLEvent(document.getElementById("BLK_CONT_SPLIT_MASTER__SPLITBOOKDATE"),"onpropertychange");
	//changes end for BUG#34356377
	
parent.gActiontry = '';
gActiontry = '';
//OBCL_14.5_SUPP#34490532 changes start
if (typeof (strFooterTabId) != 'undefined' && strFooterTabId != "") {
	enableForm(document.getElementById("TBLPage" + strFooterTabId));
}
//OBCL_14.5_SUPP#34490532 changes end
	return true;
}
function fnDisableExchangeRate(){
	try{
		//var len = document.getElementById("DIVSubSystem").children[0].children.length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

		for (var idx = 0; idx < len; idx++) {
			//if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_EXCHANGE_RATE") {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id  == "CVS_EXCHANGE_RATE") {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				//var exchange_rateLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				var exchange_rateLink =document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				if(exchange_rateLink==undefined){
				//	exchange_rateLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				exchange_rateLink =document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				}
				if (document.getElementById('BLK_CONT_SPLIT_MASTER__CONTCCY').value == document.getElementById('BLK_CONTRACT__TXT_PRM_TRANCHE_CCY').value)
				{
					fnDisableSubSysButtons(exchange_rateLink);
				}else{
					fnEnableSubSysButtons(exchange_rateLink);
				}
			}
		}
	} catch (e) {}	
	return true;
}



function fnPreLoad_CVS_INT_RATE_FIXING_KERNEL(screenArgs){
//fnEnableDisableIntRateFixing();
FN_DEFAULT_RTFX();  //Bug#34819588 Changes
fnDisableChecks();
fnEnableDisableBaseRate(); /* OBCL_14.4_Spread_Changes */
/*//related blocks to be looped together else the loop will exit after master when put separately
//OBCL_27322722 starts
   //ashok added
   var consoleSplitBlock = "BLK_CONT_SPLIT_DETAIL";
	var consoleSplitBlockLen = getTableObjForBlock(consoleSplitBlock).tBodies[0].rows.length;
	for (var consoleSplitIdx = 0;consoleSplitIdx < consoleSplitBlockLen;consoleSplitIdx++) {
		if (getTableObjForBlock(consoleSplitBlock).tBodies[0].rows[consoleSplitIdx].cells[0].getElementsByTagName("INPUT")[0]) {
			if (getTableObjForBlock(consoleSplitBlock).tBodies[0].rows[consoleSplitIdx].cells[0].getElementsByTagName("INPUT")[0].checked) {
				var productIntBlockId = "BLK_SPLIT_PROD_INTCOMP";
				var productIntLen = getTableObjForBlock(productIntBlockId).tBodies[0].rows.length;
				for (var productIdx = 0;productIdx < productIntLen;productIdx++) {
					if (getTableObjForBlock(productIntBlockId).tBodies[0].rows[productIdx].cells[0].getElementsByTagName("INPUT")[0]) {
						if (getTableObjForBlock(productIntBlockId).tBodies[0].rows[productIdx].cells[0].getElementsByTagName("INPUT")[0].checked) {
							screenArguments["MATURITY_DATE"] = getTableObjForBlock(consoleSplitBlock).tBodies[0].rows[consoleSplitIdx].cells[9].getElementsByTagName("oj-input-text")[0].value;
							screenArguments["FLOATING_RATE_CODE"] = getTableObjForBlock(productIntBlockId).tBodies[0].rows[productIdx].cells[8].getElementsByTagName("oj-input-text")[0].value;
						}
					}
				}
			}
		}
	}
//OBCL_27322722 ends*/ //Commented as part of #OBCL_14.4_SOFR_Reprice	
    //OBCL_14.4_SOFR_Reprice start
		screenArguments["FLOATING_RATE_CODE"] = document.getElementById("BLK_SPLIT_PROD_INTCOMP__RATECODE").value;
		screenArguments["RATE_FIXING_REQD"] = document.getElementById("BLK_SPLIT_PROD_INTCOMP__RATEFIXINGREQD").value;
	//OBCL_14.4_SOFR_Reprice end
return true;
}

function fnPostLoad_CVS_INT_RATE_FIXING_KERNEL(screenArgs){
if(parent.gActiontry != "EXECUTEQUERY"){
	try{
	fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__RATECODE"));
	//fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__RATEEFFECTIVEENDDATEI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__RATEEFFECTIVEENDDATE"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	//fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__RATEI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	 fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__RATE"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__REMARKS"));
	//fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__TENORVALUEI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__TENORVALUE"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__TENORUNIT"));
	fnEnableElement(document.getElementById("BLK_INT_RATE_FIXING__BTN_FETCH")); //OBCL_27322722
	} catch (e) {}
}
/*//OBCL_27322722 starts
if ( (parent.screenArguments["FLOATING_RATE_CODE"] != 'undefined' ) && (parent.screenArguments["FLOATING_RATE_CODE"] != "" )) {
		document.getElementById("BLK_INT_RATE_FIXING__RATECODE").value = parent.screenArguments["FLOATING_RATE_CODE"];
	}
if (parent.screenArguments["MATURITY_DATE"] != 'undefined'){
	document.getElementById("BLK_INT_RATE_FIXING__RATEEFFECTIVEENDDATE").value = parent.screenArguments["MATURITY_DATE"];
	document.getElementById("BLK_INT_RATE_FIXING__RATEEFFECTIVEENDDATE").value = parent.screenArguments["MATURITY_DATE"];
}	
        /* Resetting screenArguments[] Parameters */
	/*parent.screenArguments['FLOATING_RATE_CODE'] == '';
	parent.screenArguments["MATURITY_DATE"] == '';*/
//OBCL_27322722 ends*/ //Commented As part of OBCL_14.4_SOFR_Reprice
   
   if ( (parent.screenArguments["FLOATING_RATE_CODE"] != 'undefined' ) && (parent.screenArguments["FLOATING_RATE_CODE"] != "" )) {
	  if ((document.getElementById("BLK_INT_RATE_FIXING__RATE_EFFECTIVESTARTDATE").value != 'undefined' ) && (document.getElementById("BLK_INT_RATE_FIXING__RATE_EFFECTIVESTARTDATE").value != "" )){
		document.getElementById("BLK_INT_RATE_FIXING__RATECODE").value = parent.screenArguments["FLOATING_RATE_CODE"];
	  }
	}
	// OBCL_14.4_SOFR_Reprice starts
    //Resetting screenArguments[] Parameters
    parent.screenArguments["FLOATING_RATE_CODE"] ="";
    
	if (document.getElementById("BLK_INT_RATE_FIXING__RATE_EFFECTIVESTARTDATE").value =="") {
	fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__RATECODE"));
	fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__RATEEFFECTIVEENDDATEI")); 
	//fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__RATEI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__RATE"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__REMARKS"));
	//fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__TENORVALUEI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__TENORVALUE"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
	fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__TENORUNIT"));
	fnDisableElement(document.getElementById("BLK_INT_RATE_FIXING__BTN_FETCH"));
	document.getElementById("BLK_INT_RATE_FIXING__SPLITSERIALNO").value ='';
	document.getElementById("BLK_INT_RATE_FIXING__COMPONENT").value ='';
    }
   // OBCL_14.4_SOFR_Reprice end
return true;
}
//OBCL_14.5_SMTB_#34487912 starts
function fnExrate() {
	//debugger;
    l_Action = "ENRICHEX";
	FN_DEFAULT();
    return true;
}
//OBCL_14.5_SMTB_#34487912 ends
function fnPreLoad_CVS_EXCHANGE_RATE_KERNEL(screenArgs){
//nEnableDisableIntRateFixing();
fnDisableChecks();
fnEnableDisableBaseRate(); /* OBCL_14.4_Spread_Changes */
//OBCL_14.5_SMTB_#34487912 starts
	var noRows = getTableObjForBlock("BLK_CONT_SPLIT_DETAIL").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
		    //Bug#36946402 changes starts
			//if (getTableObjForBlock("BLK_CONT_SPLIT_DETAIL").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("oj-input-text")[0].value==true)
			
            if (getTableObjForBlock("BLK_CONT_SPLIT_DETAIL").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked==true)
	        //Bug#36946402 changes ends
	
			{
				screenArgs["PRODCD"] = getElementsByOjName("PROD")[rowIndex].value;
				screenArgs["PRODDESC"] = getElementsByOjName("TXT_PROD_DESC_DETAIL")[rowIndex].value;
				screenArgs["ENDDT"]=getElementsByOjName("MATURITYDATE")[rowIndex].value;
			}	
		}
//OBCL_14.5_SMTB_#34487912 ends
return true;
}
function fnPreLoad_CVS_RATE_SETTING_KERNEL(screenArgs){
fnDisableExchangeRate();
//fnEnableDisableIntRateFixing();
fnDisableChecks();
fnEnableDisableBaseRate(); /* OBCL_14.4_Spread_Changes */
return true;
}

function FN_CALCULATE(){
	g_prev_gAction = gAction;
	gAction = 'CALCULATE';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
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
	document.getElementById("BLK_CONT_SPLIT_MASTER__BTNCALCULATE").disabled = true;
	fnDisableExchangeRate();
 gAction = g_prev_gAction;
 return true; 
}

function FN_DEFAULT(){
var g_prev_gAction = gAction;
    gAction = "ENRICH";
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
	/*document.getElementById("BLK_CONT_SPLIT_DETAIL__BTNDEFAULT").disabled = true;
	fnDisableElement(document.getElementById("cmdAddRow_BLK_SPLIT_PROD_INTCOMP"));
	fnDisableElement(document.getElementById("cmdDelRow_BLK_SPLIT_PROD_INTCOMP"));
	fnDisableElement(document.getElementById("cmdAddRow_BLK_SPLIT_PROD_MRGCOMP"));
	fnDisableElement(document.getElementById("cmdDelRow_BLK_SPLIT_PROD_MRGCOMP"));*/ //Commented as part of OBCL_14.4_SOFR_Reprice
	//OBCL_14.5_SMTB_#34487912 starts
   gAction = g_prev_gAction;
	if (l_Action == 'ENRICHEX')  {
		fnSubScreenMain('LBDREPRS', 'LBDREPRS', 'CVS_EXCHANGE_RATE', false);
	}	
	else	{
		fnSubScreenMain('LBDREPRS', 'LBDREPRS', 'CVS_INT_DTLS', false); //OBCL_14.4_SOFR_Reprice
	}	
	l_Action='';
  //OBCL_14.5_SMTB_#34487912 ends
 fnDisableChecksForSplitDetail();
 fnDisableChecks(); 
 fnEnableDisableBaseRate(); /* OBCL_14.4_Spread_Changes */ 
 /*fnDisableChecksForMargin();*///OBCL_14.4_SOFR_Reprice 
 debugs("gAction");
 return true; 
}

function fnPostAddRow_BLK_CONT_SPLIT_DETAIL_KERNEL(){
	var cnt = getTableObjForBlock('BLK_CONT_SPLIT_DETAIL').tBodies[0].rows.length;
	for(var i = 0; i<=cnt; i++){
	// Bug#36567946 chnages starts 
	getTableObjForBlock('BLK_CONT_SPLIT_DETAIL').tBodies[0].rows[i].cells[8].getElementsByTagName("oj-input-text")[0].value = document.getElementById('BLK_CONT_SPLIT_MASTER__CONTCCY').value ;
	//	if (i ==1){		
	
			// var blkfld = 'BLK_CONT_SPLIT_DETAIL__CCY';
		/* 	document.getElementById('BLK_CONT_SPLIT_DETAIL__CCY').value = document.getElementById('BLK_CONT_SPLIT_MASTER__CONTCCY').value ;
		}
		else{	
		  //var blkfld = 'BLK_CONT_SPLIT_DETAIL__CCY'.concat(i-1); 
		  //BUG #27076460 start
     		//document.getElementById('BLK_CONT_SPLIT_DETAIL__CCY'.concat(i-1)).value = document.getElementById('BLK_CONT_SPLIT_MASTER__CONTCCY').value ;
			var flagstats=8;
			getTableObjForBlock('BLK_CONT_SPLIT_DETAIL').tBodies[0].rows[i-1].cells[flagstats].getElementsByTagName("oj-input-text")[0].value=  getTableObjForBlock('BLK_CONT_SPLIT_MASTER__CONTCCY').value ;
			 *///BUG #27076460 end
	//	}
	//Bug#36567946 changes ends 
	}
	return true;
}		
function fnPostExecuteQuery_KERNEL() {
	
	gActiontry = 'EXECUTEQUERY';
	//alert(document.getElementById('BLK_EVNT_LOG__AUTHSTATI').value);
	
	//if(document.getElementById('BLK_EVNT_LOG__AUTHSTATI').value=="Authorized" && document.getElementById('BLK_EVNT_LOG__REPRICE_STATUS_UI').value=="Active")//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		if(document.getElementById('BLK_EVNT_LOG__AUTHSTAT').value=="Authorized" && document.getElementById('BLK_EVNT_LOG__REPRICE_STATUS_UI').value=="Active")//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
	{
		EnableToolbar_buttons('Reverse'); 
	}
    else
	{
		DisableToolbar_buttons('Reverse');
	}
	fnEnableIntDetBtn();/*OBCL_14.4_SOFR_Reprice*/
	return true;
}	

function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDRSAUT';
    authUixml = 'LBDRSAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDRSAUT'] = "KERNEL";
    ArrPrntFunc['LBDRSAUT'] = "";
    ArrPrntOrigin['LBDRSAUT'] = "";
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


function fnPostLoad_CVS_EXCHANGE_RATE_KERNEL(screenArgs){
if(parent.gActiontry != "EXECUTEQUERY"){
	try{
	fnEnableElement(document.getElementById("BLK_EXRATE_FIXING__EXRATEENDDATE"));
	fnEnableElement(document.getElementById("BLK_EXRATE_FIXING__EXCHANGERATE"));
	fnEnableElement(document.getElementById("BLK_EXRATE_FIXING__REMARKS"));
	} catch (e) {}
}
//OBCL_14.5_SMTB_#34487912 starts
	if ((parent.screenArgs["PRODCD"] != 'undefined' ) && (parent.screenArgs["PRODCD"] != "" )) {
		document.getElementById("BLK_EXRATE_FIXING__TXT_PROD_CD").value = parent.screenArgs["PRODCD"];
		document.getElementById("BLK_EXRATE_FIXING__TXT_PROD_DESCR").value = parent.screenArgs["PRODDESC"];
		document.getElementById("BLK_EXRATE_FIXING__EXRATEENDDATE").value = parent.screenArgs["ENDDT"];
		document.getElementById("BLK_EXRATE_FIXING__EXRATEENDDATE").value = parent.screenArgs["ENDDT"];
	}
//OBCL_14.5_SMTB_#34487912 ends
return true;
}
function fnPostLoad_CVS_RATE_SETTING_KERNEL(screenArgs){
if(parent.gActiontry != "EXECUTEQUERY"){
	try{
	fnEnableElement(document.getElementById("BLK_RATE_SETTING__ROUNDINGRULE"));
	//fnEnableElement(document.getElementById("BLK_RATE_SETTING__ROUNDINGUNITI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnEnableElement(document.getElementById("BLK_RATE_SETTING__ROUNDINGUNIT"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
	fnEnableElement(document.getElementById("BLK_RATE_SETTING__TENOR"));
	} catch (e) {}
}
//OBCL_14.4_SOFR_Reprice start
if (document.getElementById("BLK_RATE_SETTING__CONTRACTREFNO").value =="") {
	
	fnDisableElement(document.getElementById("BLK_RATE_SETTING__ROUNDINGRULE"));
	//fnDisableElement(document.getElementById("BLK_RATE_SETTING__ROUNDINGUNITI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnDisableElement(document.getElementById("BLK_RATE_SETTING__ROUNDINGUNIT"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnDisableElement(document.getElementById("BLK_RATE_SETTING__TENOR"));
	fnDisableElement(document.getElementById("BLK_RATE_SETTING__CONTRACTREFNO"));
	document.getElementById("BLK_RATE_SETTING__TENOR").value ='';
    }
//OBCL_14.4_SOFR_Reprice end
return true;
}
/* function fnEnableDisableIntRateFixing(){
	var param_Value;
	try {
        var blockId = "BLK_SPLIT_PROD_INTCOMP";
        var len = getTableObjForBlock(blockId).tBodies[0].rows.length;
        for (var idx = 0;idx < len;idx++) {
            if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0]) {
				if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0].checked) {
					param_Value = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[13].getElementsByTagName("oj-input-text")[0].value;

					
			}
		}
      }
		
    }
    catch (e) {}
	    if (param_Value == 'N'){
			try{
			var len = document.getElementById("DIVSubSystem").children[0].children.length;
			for (var idx = 0; idx < len; idx++) {
				if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_INT_RATE_FIXING") {
					fnDisableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0]);
				}
			}
			} catch (e) {}
		}
		else
		{
			try{
			var len = document.getElementById("DIVSubSystem").children[0].children.length;
			for (var idx = 0; idx < len; idx++) {
				if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_INT_RATE_FIXING") {
					fnEnableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonH")[0]);
				}
			}
			} catch (e) {}
		}
            
	return true;
} */
/* OBCL_14.4_Spread_Changes :: Starts */
function fnEnableDisableBaseRate(){
	var fixed_rate_type = "";
	try {
        /*var blockId = "BLK_SPLIT_PROD_INTCOMP";
        var len = getTableObjForBlock(blockId).tBodies[0].rows.length;
        for (var idx = 0;idx < len;idx++) {
			fixed_rate_type = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[14].getElementsByTagName("oj-input-text")[0].value;
			if(fixed_rate_type == 'U' && gAction == 'NEW') {
				fnEnableElement(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[9].getElementsByTagName("oj-input-text")[0]);
				fnEnableElement(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[9].getElementsByTagName("oj-input-text")[0].nextSibling.nextSibling);
			}else {
				fnDisableElement(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[9].getElementsByTagName("oj-input-text")[0]);
				fnDisableElement(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[9].getElementsByTagName("oj-input-text")[0].nextSibling.nextSibling);
			}
		}*/ //commented as part of OBCL_14.4_SOFR_Reprice
		
    }
    catch (e) {}
            
	return true;
}
/* OBCL_14.4_Spread_Changes :: Ends */ 

function fnPostLoad_CVS_MAIN_KERNEL(screenArgs){
	fnEnableIntDetBtn();//OBCL_14.4_SOFR_Reprice
	fnDisableElement(document.getElementById("cmdAddRow_BLK_SPLIT_PROD_INTCOMP"));
	fnDisableElement(document.getElementById("cmdDelRow_BLK_SPLIT_PROD_INTCOMP"));
	fnDisableElement(document.getElementById("cmdAddRow_BLK_SPLIT_PROD_MRGCOMP"));
	fnDisableElement(document.getElementById("cmdDelRow_BLK_SPLIT_PROD_MRGCOMP"));
	
	return true;
}
function fnPostLoad_KERNEL(screenArgs)
{
	addEvent(document.getElementById("BLK_CONT_SPLIT_DETAIL"), "onclick", "fnDisableChecksForSplitDetail()"); //Adding event on click of BLK_CONT_SPLIT_DETAIL
	addEvent(document.getElementById("BLK_SPLIT_PROD_INTCOMP"), "onclick", "fnDisableChecks()"); //Adding event on click of BLK_SPLIT_PROD_INTCOMP
	fnDisableExchangeRate();
	fnDisableChecksForSplitDetail();
	fnDisableChecks(); 
    fnEnableDisableBaseRate(); /* OBCL_14.4_Spread_Changes */	
	return true;
}
function fnDisableChecksForSplitDetail(){
	fnDisableExchangeRate();
	fnDisableChecks();
	fnEnableDisableBaseRate(); /* OBCL_14.4_Spread_Changes */	
	//fnDisableChecksForMargin(); /*Commented as part of OBCL_14.4_SOFR_Reprice*/
	return true;
}
function fnDisableChecks(){
	try{
		var data_blk = "BLK_SPLIT_PROD_INTCOMP";
		var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
		for (var index = 0; index <= len; index++) {
			//Bug#36946402 changes starts
            //if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("oj-input-text")[0].value == true)

            if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
			//Bug#36946402 changes ends
			
				{				
				var main_component_regd=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[16].getElementsByTagName("oj-input-text")[0].value; // BLK_SPLIT_PROD_INTCOMP__SHOWNINCONTRACTMAINSCREEN	/* OBCL_14.4_Spread_Changes */		
				var rate_fixing_reqd=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[15].getElementsByTagName("oj-input-text")[0].value; // BLK_SPLIT_PROD_INTCOMP__TXT_RATE_FIXING_REQD	/* OBCL_14.4_Spread_Changes */		
				
				//var len = document.getElementById("DIVSubSystem").children[0].children.length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

				for (var idx = 0; idx < len; idx++) {
					//if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_INT_RATE_FIXING") {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "CVS_INT_RATE_FIXING") {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						//var main_component_regdLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						var main_component_regdLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						if(main_component_regdLink==undefined){
							//main_component_regdLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						main_component_regdLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
						}
						if (main_component_regd=='Y' && rate_fixing_reqd=='Y'){
							fnEnableSubSysButtons(main_component_regdLink);
						}else{
							fnDisableSubSysButtons(main_component_regdLink);
						}
					}
					//if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_RATE_SETTING") {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
					if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "CVS_RATE_SETTING") {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						//var rate_fixing_reqdLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						var rate_fixing_reqdLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						if(rate_fixing_reqdLink==undefined){
						//	rate_fixing_reqdLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						rate_fixing_reqdLink =document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						}
						if (main_component_regd=='Y' && rate_fixing_reqd=='Y'){
							fnEnableSubSysButtons(rate_fixing_reqdLink);
						}else{
							fnDisableSubSysButtons(rate_fixing_reqdLink);
						}
					}
				}				
			}
		}
	}catch(e){}
	fnEnableDisableBaseRate(); /* OBCL_14.4_Spread_Changes */	
	return true;	
}
function fnDisableChecksForMargin(){
	var data_blk = "BLK_SPLIT_PROD_MRGCOMP";
	var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
	for (var index = 0; index <len; index++) {
		var marginBasis=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0].value;// BLK_SPLIT_PROD_MRGCOMP__MARGINBASIS			
		var basisAmtTag=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[7].getElementsByTagName("oj-input-text")[0].value; // BLK_SPLIT_PROD_MRGCOMP__BASISAMTAG	
		if(marginBasis=='D' && basisAmtTag=='U'){
			if(index==0){
				document.getElementById("BLK_SPLIT_PROD_MRGCOMP__MARGINRATEI").readOnly = false;
			}else{
				document.getElementById("BLK_SPLIT_PROD_MRGCOMP__MARGINRATEIRC"+index).readOnly = false; /* OBCL_14.4_Spread_Changes */
			}			
		}else{
			if(index==0){
				document.getElementById("BLK_SPLIT_PROD_MRGCOMP__MARGINRATEI").readOnly = true;
			}else{
				document.getElementById("BLK_SPLIT_PROD_MRGCOMP__MARGINRATEIRC"+index).readOnly = true; /* OBCL_14.4_Spread_Changes */
			}
		}
	}
	return true;
}

function fnPreSave_CVS_INT_RATE_FIXING_KERNEL(screenArgs)
{
	if (document.getElementById("BLK_INT_RATE_FIXING__RATE").value != ''){
		/*var data_blk = "BLK_SPLIT_PROD_INTCOMP";
		var len = parent.getTableObjForBlock(data_blk).tBodies[0].rows.length;
		for (var index = 0; index <= len; index++) {
            if (parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {	
				parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[9].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock("BLK_INT_RATE_FIXING__RATE").value;
				fireHTMLEvent(parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[9].getElementsByTagName("oj-input-text")[0], "onpropertychange");
			}*/
		//OBCL_14.5_SUPPORT_Bug#34247237 Starts
		/*	
		try{   
		   parent.document.getElementById("BLK_SPLIT_PROD_INTCOMP__RATE").value = document.getElementById("BLK_INT_RATE_FIXING__RATE").value;
		   fireHTMLEvent(parent.document.getElementById("BLK_SPLIT_PROD_INTCOMP__RATE"),"onpropertychange");
	      
		} catch (e) {}
		*/
		try{ 
		   parent.document.getElementById("BLK_SPLIT_PROD_INTCOMP__BASERATE").value = document.getElementById("BLK_INT_RATE_FIXING__RATE").value;
		   fireHTMLEvent(parent.document.getElementById("BLK_SPLIT_PROD_INTCOMP__BASERATE"),"onpropertychange");
	      
		} catch (e) {}
		//OBCL_14.5_SUPPORT_Bug#34247237 Ends
		
		}
	parent.fnDisableChecksForSplitDetail();
	return true;
}
//OBCL_27322722 starts
function fnFetch(){
	var g_prev_gAction = gAction;
	var splitRowNo;//Bug#35425170:Added
    gAction = "FETCH";
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
       if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_INT_RATE_FIXING"]/FV');
		if(RecnodeList.length>0){
			var RecnodeListLen = RecnodeList.length;
			for(var i = 0; i < RecnodeListLen; i++){
				var TextContents = mySplit(getText(RecnodeList[i]),"~");			
					document.getElementById("BLK_INT_RATE_FIXING__RATE").value = '';  
					document.getElementById("BLK_INT_RATE_FIXING__RATE").value = '';
		 					
			}
		}
		 gAction = g_prev_gAction;		 
        return false;
    }
	
	/*var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_INT_RATE_FIXING"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
			    document.getElementById("BLK_INT_RATE_FIXING__RATE").value = TextContents[2]; 
				document.getElementById("BLK_INT_RATE_FIXING__RATEI").value = TextContents[2];
		}
	}*///Bug#35425170:Commented
	
	//Bug#35425170:Changes Starts here
	try
	{
		var data_blk = "BLK_CONT_SPLIT_DETAIL";
		var len = parent.parent.document.getElementById(data_blk).tBodies[0].rows.length;
		for (var index = 0; index <= len; index++) 
		{
            if (parent.parent.document.getElementById(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) 
				splitRowNo = index;			
		}
	} 
	catch (e) {}	
	
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_INT_RATE_FIXING"]/FV');
	if(RecnodeList.length>0)
	{
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++)
		{
				var TextContents = mySplit(getText(RecnodeList[i]),"~");	
				if (TextContents[6] == splitRowNo+1)
				{
					document.getElementById("BLK_INT_RATE_FIXING__RATE").value = TextContents[2]; 
					document.getElementById("BLK_INT_RATE_FIXING__RATEI").value = TextContents[2];
				}
			    
		}
			
	}
	//Bug#35425170:Changes Starts here
	return true;
}

function fnEnableIntDetBtn(){
	var noRows = getTableObjForBlock("BLK_CONT_SPLIT_DETAIL").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
		fnEnableElement(getElementsByOjName("BTNDEFAULT")[rowIndex]);
		fnEnableElement(getElementsByOjName("BTN_PART_DTLS")[rowIndex]);	//OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES		
		fnEnableElement(getElementsByOjName("BTN_EXCH_RATE1")[rowIndex]); //OBCL_14.5_SMTB_#34487912
    }
}
//OBCL_14.4_SOFR_Reprice start
function fnPostLoad_CVS_INT_DTLS_KERNEL(){	
    fnDisableElement(document.getElementById("cmdAddRow_BLK_SPLIT_PROD_INTCOMP"));
	fnDisableElement(document.getElementById("cmdDelRow_BLK_SPLIT_PROD_INTCOMP"));
	fnDisableElement(document.getElementById("cmdAddRow_BLK_SPLIT_PROD_MRGCOMP"));
	fnDisableElement(document.getElementById("cmdDelRow_BLK_SPLIT_PROD_MRGCOMP"));
    if(parent.gActiontry == "EXECUTEQUERY"){
        gActiontry = "EXECUTEQUERY";
    }	
    addEvent(document.getElementById("BLK_SPLIT_PROD_INTCOMP"), "onclick", "fnDisableChecks()");
    addEvent(document.getElementById("BLK_SPLIT_PROD_MRGCOMP"), "onclick", "fnDisableChecksForMargin()");	
    return true;
}
/*OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES STARTS*/
function FN_DEFAULT_BA()
{	var g_prev_gAction = gAction;
    gAction = "ENRICHBA";//OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
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
	
	//fnSubScreenMain('LBDREPRS', 'LBDREPRS', 'CVS_BA_PART_DTLS', false);
	gAction = g_prev_gAction;
	debugs("gAction");
    return true;
}
/*OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES ENDS*/
function fnPostSave_KERNEL() { 
 fnEnableIntDetBtn();
 gAction = "EXECUTEQUERY"; //Bug#37523280
 fnExecuteQuery();//Bug#37523280
 return true;
}
//OBCL_14.4_SOFR_Reprice end   
//OBCL_27322722 ends

//Bug#34819588 Changes Start
function FN_DEFAULT_RTFX()
{	var g_prev_gAction = gAction;
    gAction = "ENRICHRTFX";
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
	
	gAction = g_prev_gAction;
	debugs("gAction");
    return true;
}
//Bug#34819588 Changes End