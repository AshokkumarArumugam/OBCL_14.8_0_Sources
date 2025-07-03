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
**  File Name          : OLDTRONL_KERNEL.js 
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 02-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25034600
**  Reason             : Version number changes
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 03-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25039084 
**  Reason             : fnPostExecuteQuery_KERNEL was written twice, now code is consolidated into one function.

**  Last Modified By   : Krithika Gopalakrishnan
**  Last modified on   : 27-JUN-2017
**  Reason             : Change of Function Name for FN_GETCREDITLINES()
	
    **Changed By         : Pallavi R
    **Date               : 21-Aug-2017
    **Change Description : CAMD AFTER PRINCIPAL LIQUIDATION AND MODIFICATION OF SCHEDULES FAILS 
    **Search String      : OBCL_12.5.0.0.0_ITR1_#26584136 Changes
	
    **Changed By         : Ranjan Kumar
    **Date               : 10-OCT-2017
    **Change Description : 26517132 - SCHEDULES ENHANCEMENT CHECK IN 
    **Search String      : OBCL_125_SUPP_26517132
	
	**Changed By         : Pallavi R
	**Date               : 25-Oct-2017
	**Change Description : ELCM External LOV Changes
	**Search String      : OBCL_12.5.0.0.0_Support_#26924371_LOV Changes
	
	**Changed By         : Prakash Ravi ravi
	**Date               : 11-NOV-2017
	**Change Description : Contract amendment for Contract Modified from other screens.
	**Search String      : OBCL_14.0.0.0.0
	
	**  Last Modified By   : Aishwarya
    **  Last modified on   : 17-Jun-2020
    **  Reason             : Updating audit trail when unlock
    **  Search String      : OBCL_14.4_SUPPORT_BUG#31527262
	
	**  Last Modified By   : Divya J
    **  Last modified on   : 16-Dec-2021
    **  Reason             : Distribute principal - not working in oldtroic
    **  Search String      : OBCL_14.5_SUPPORT_BUG#33672425
	
	**Changed By         : Rahul Garg
    **Date               : 21-JUL-2022
    **Change Description : OL/LB SCREEN - OVERWRITE DEFAULT SSI CALLFORM NEED TO REMOVE + Adding changes for Bug#33989949 
    **Search String      : BUG#34300314	
		
	**Changed By         : Akhila Samson
    **Date               : 16-OCT-2023
    **Change Description : Added the code to query the contract after save. 
    **Search String      : BUG#35859466_2	
****************************************************************************************************************************/
var gPrevAction;
var gEnableButton = false;
var gDisabledefschButton= false;
var gDisablerdfschButton= false;
var gDisableschblock= false;
var gActionCode ; 

function fnPostProductPickup_KERNEL() {
	if (document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value != '') {
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO"));
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE"));
	} else {
		fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO"));
		fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
		fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
		fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE"));
		document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE").focus();
	}
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));	
 return true; 	
}	
function Fn_defaultschedule(){
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'DEFSCH';
	//Bug#33989949  Changes Starts
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var prevStatusStr = statusStr;
	fnCheckSubSysValues(statusStr);
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
    var statint = extractSubSysStat(l_statusStr, 'LFCINTCH'); 
		if (statint == 'R'){
			document.getElementById("BLK_OLTBS_CONTRACT__UIAMTCHANGE").value='Y';
		}
	getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
    //Bug#33989949  Changes Ends
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
		 gAction = g_prev_gAction;
        return false;
    }
 gAction = g_prev_gAction;
 fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
 return true; 
}
function fn_explodeSchdelue() {
	if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_NEW' || gAction == 'SUBSYSPKP_MODIFY')
	{
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'EXPSCH';
	//Bug#33989949  Changes Starts
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var prevStatusStr = statusStr;
	fnCheckSubSysValues(statusStr);
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
    var statint = extractSubSysStat(l_statusStr, 'LFCINTCH'); 
		if (statint == 'R'){
			document.getElementById("BLK_OLTBS_CONTRACT__UIAMTCHANGE").value='Y';
		}
	getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
    //Bug#33989949  Changes Ends
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
		 gAction = g_prev_gAction;
        return false;
    }
 gAction = g_prev_gAction;
	}
fnSubScreenMain('OLDTRONL', 'OLDTRONL', 'CVS_SCHEDULE_DETAILS', false);
if (gActionCode !="DISABLE") {
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
}
 return true; 
}
function fnPreAuthorize_KERNEL()
{
showErrorAlerts('OL-SIM-01', 'E', "Authorize~OLDTROIC");
return false;

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
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTREFNO').value;    
    return true;
}

function fnPostExecuteQuery_KERNEL() {
	gEnableButton = true;
	expandcontent('TAB_MAIN');
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV")); //OFCL_12.3.0.0.0_25039084 changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT")); //OFCL_12.3.0.0.0_25039084 changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
	gActionCode ='DISABLE';
	return true;
}

function fnInTab_TAB_SCHEDULES_KERNEL() {
	if (gEnableButton)
	{
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAYMENT_DETAILS"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REVISION_DETAILS"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_UNEARNEDINT_DETAIL"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_CMTREDN_SCHEDULE_DUE"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_RATE_REVISION"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__BTN_LIQ_ORDER"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EQUIV_PRIN")); //OBCL_125_SUPP_26517132
	
	
	}
	if (gDisabledefschButton)
	{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DEF_SCH"));
	}
	if (gDisablerdfschButton)
	{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFINE"));
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS"));//OBCL_12.5.0.0.0_ITR1_#26584136 Changes
	}
	if (gDisableschblock)
    { 
     fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",false);
	}
		return true;
}
//OBCL_12.5.0.0.0_Support_#26924371_LOV Changes Starts
/*function FN_GETCREDITLINES(){
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'GETLINES';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    gAction = g_prev_gAction;
 return true; 
}*/
//OBCL_12.5.0.0.0_Support_#26924371_LOV Changes Ends

//OFCL_12.3.0.0.0_25034600 changes starts
function  fnOnClick_BTN_NEXT(){
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = 'VERSIONQUERY';
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value);
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value);
	if(verNo == versionCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}
	if(verNo<versionCount)
	{
		verNo++;
		document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;	
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
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value);
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value);
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	verNo--;
	if(verNo>0)
	{			
		document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;		
		document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;		
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;
		appendData(document.getElementById("TBLPageAll"));
		g_prev_gAction=gAction;
		
		gAction='EXECUTEQUERY';		
		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}


function fnPostUnlock_KERNEL() {
	
	if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
	{
     gDisabledefschButton = true;
     gDisableschblock = true;	 
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__PAYMETHOD").value == 'D' || document.getElementById("BLK_OLTBS_CONTRACT_MASTER__PAYMETHOD").value == 'T')
	{	
	gDisablerdfschButton = true;
	}
	document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value=	'LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;'; // BUG#34300314 - remove the OLCSTDET
	//'LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;'; // commented for BUG#34300314
	}
  else
	{
		gDisablerdfschButton = true;
	}		
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));	
    expandcontent('TAB_MAIN');
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
	return true;
}

function Fn_redefineschedule(){
		if (gAction == 'SUBSYSPKP_MODIFY' || gAction == 'MODIFY')
	{
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'RDFSCH';
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
		 gAction = g_prev_gAction;
        return false;
    }
  gAction = g_prev_gAction;
	}
fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",true);	
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFINE"));
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS"));//OBCL_12.5.0.0.0_ITR1_#26584136 Changes
 gDisableschblock = false;
 fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
 return true; 
}
function fnPostNew_KERNEL() {
	gDisablerdfschButton = true;
expandcontent('TAB_MAIN');
	gActionCode ='NEW';
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
	return true;
}
function fnPostCopy_KERNEL(){
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE"));
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
	return true;
}
function fnPostLoad_CVS_CONTRACT_ALIQ_REDF_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_CONTRACT_COMP_ALIQ_REDFN')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_CONTRACT_COMP_ALIQ_REDFN')[0].style.visibility = 'hidden';
return true;
}
function fnPostLoad_CVS_REV_SCH_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTBS_CONTRACT_REVISION_SCH')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTBS_CONTRACT_REVISION_SCH')[0].style.visibility = 'hidden';
return true;
}
function fnPostLoad_CVS_UNEARNED_INT_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTB_INST_SCHEDULES')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTB_INST_SCHEDULES')[0].style.visibility = 'hidden';
return true;
}
function fnPostLoad_CVS_CMTREDN_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTBS_CONTRACT_CMTREDN_DUE')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTBS_CONTRACT_CMTREDN_DUE')[0].style.visibility = 'hidden';
return true;
}
function fnPostLoad_CVS_INT_RT_REV_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_LFTB_CONTRACT_INT_REVISION')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_LFTB_CONTRACT_INT_REVISION')[0].style.visibility = 'hidden';
return true;
}
function fnPostLoad_CVS_SCHEDULE_DETAILS_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLVWS_SCHEDULE_SUMMARY')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLVWS_SCHEDULE_SUMMARY')[0].style.visibility = 'hidden';
getElementsByOjName('cmdAddRow_BLK_OLTBS_AMOUNT_DUE')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTBS_AMOUNT_DUE')[0].style.visibility = 'hidden';
getElementsByOjName('cmdAddRow_BLK_OLVWS_AMOUNT_SETTLED')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLVWS_AMOUNT_SETTLED')[0].style.visibility = 'hidden';

return true;
}
function fnPostLoad_CVS_LIQ_SUM_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTB_CONTRACT_LIQ')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTB_CONTRACT_LIQ')[0].style.visibility = 'hidden';
return true;
}
function fnPostLoad_CVS_PENALTY_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTB_CONTRACT_PENALTY_COMP')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTB_CONTRACT_PENALTY_COMP')[0].style.visibility = 'hidden';
return true;
}
//OBCL_12.5.0.0.0_ITR1_#26584136 Changes Starts
function fnPostLoad_CVS_PAID_SCHEDLS_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
return true;
}
//OBCL_12.5.0.0.0_ITR1_#26584136 Changes Ends
function fnInTab_TAB_ROLLOVER_KERNEL() {	
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__ROLLALLOW").value == 'Y') {
       if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__ROLLMECH").value == 'C' ){
		   if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__ROLLMETH").value == 'S') {			
			showErrorAlerts('IN-HEAR-999');			
			disableTabs("TAB_ROLLOVER", "~");
			fnDisableScreenElement("TAB_ROLLOVER__SEC_ROLLOVER");
			fnDisableScreenElement("TAB_ROLLOVER__SEC_ROLLPREF");
			fnDisableScreenElement("TAB_ROLLOVER__SEC_INTERESTBASIS");
		   }		   
	   }		
	}
return true;	
}

//OBCL12.5-26634495 changes starts
function fnPostLoad_KERNEL(){
	var parentWin = fnGetParentWin();
	if (parentWin != "") { 
	if (parentWin.parentWinParams.CALLFORM =='LOANDET' ) { 
	  if (parentWin.parentWinParams.PARENT_FUNC_ID== "STDCUSVW") 
	  {                    
	  fnEnterQuery();
	  document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.ACCOUNT_NUMBER;
	  gAction= "EXECUTEQUERY";
	   fnExecuteQuery();
	   }
	   }
	 else if (parentWin.parentWinParams.CALLFORM =='COMMDET' ) { 
	 if (parentWin.parentWinParams.PARENT_FUNC_ID== "STDCUSVW") 
	  {                    
	  fnEnterQuery();
	  document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.ACCOUNT_NUMBER;
	  gAction= "EXECUTEQUERY";
	   fnExecuteQuery();
	   }
	 }
	}
   	
	return true;
}
//OBCL12.5-26634495 changes ends

//OBCL_14.5_SUPPORT_BUG#33672425 Commented
// OBCL_125_SUPP_26517132 start
/*function fn_recalc_unit()
{
	if (gAction == 'NEW' || gAction == 'MODIFY')
	{
		var len = getTableObjForBlock('BLK_OLTBS_CONTRACT_SCHEDULES').tBodies[0].rows.length;
		var out_amt = document.getElementById('BLK_OLTBS_CONTRACT__TXT_OUT_BAL').value;
		var total_no = 0;
		var net_amt = 0;
		var bullet_idx = 0;
		for(var idx=0; idx<len; idx++)
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
				total_no += parseInt(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value);
			
			try
			{
				if (total_no <= 0 || isNaN(total_no) ) 
				{
					return true;
				}
				net_amt = Math.ceil((out_amt/total_no)/10)*10;
				
				if (net_amt <= 0 || isNaN(net_amt) ) 
				{
					return true;
				}
			}
			catch(e){
				return true;
			}
		for(var idx=0; idx<len; idx++)
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
			{
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-select-single")[0].value != 'B')
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = net_amt;
				else
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = net_amt + (out_amt-(net_amt*total_no));
				try
				{
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value;
				}				
				catch(e){}
			}   
	}
	return true; 
}
*/ //OBCL_14.5_SUPPORT_BUG#33672425 Commented

// OBCL_125_SUPP_26517132 end
//OBCL_14.0.0.0.0 Changes start
function fnPreUnlock_KERNEL(){
	var pList = ['LDPMNT', 'LDREVC', 'LDBOOK', 'LDCAMD','LDINIT', 'LDROLL', 'LSPMNT', 'LDRAMD'];
	var check = false;
	var PCode = (document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value);
	
	for (var i = 0;i<pList.length;i++){
		if (PCode == pList[i] && check == false){
			check = true;
		}
	}
	
	if (!check){
		var ProcessCode = PCode.substring(PCode.length - 4);
		var UnauthFunctionId;
		if  (ProcessCode =='REVP'||ProcessCode =='PMNT') 
		{
			UnauthFunctionId ='OLDPMNT';
		}
        else if (ProcessCode == 'AMND') 
		{
			UnauthFunctionId ='OLDVAMND';
		}
        else if (ProcessCode == 'RFND')
		{
			 UnauthFunctionId ='OLDREFND';
		}
        else 
		{
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
            }
		}
		//OBCL_14.4_SUPPORT_BUG#31527262 start
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERID").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERDTST").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERID").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERDTST").value = "";
	    //OBCL_14.4_SUPPORT_BUG#31527262 end
		return true;
}
//OBCL_14.0.0.0.0 Changes end
function fn_activate_con()
{
	gAction = "ACTIVATE";
	fcjRequestDOM = buildUBSXml();
	processingAction = "activatecontract"; 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var msgStatus = fnProcessResponse();
    fnPostProcessResponse(msgStatus);     
    gAction="ACTIVATE";
	gActionCode ='ACTIVATE';
	if (msgStatus == "SUCCESS") 
	{
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
	}
    return true;	
}
	
function fnPostSave_KERNEL() 
{
	//Bug#35859466_2 Start
    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
	//Bug#35859466_2 Ends
	gActionCode ='DISABLE';
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
}

function fnInTab_TAB_MAIN_KERNEL()
{

if (gActionCode !="DISABLE") {
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVATE"));
}
return true;	
}