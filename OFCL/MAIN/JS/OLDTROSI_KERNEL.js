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
**  File Name          : OLDTROSI_KERNEL.js
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
	
	**  Last Modified By   : Shishirkumar Aithal
    **  Last modified on   : 29-Nov-2017
    **  Search String      : OFCL_12.3.0.0.0_26965953
    **  Reason             : Equivated Principal changes handling for amount not being negative. 
	
	**Changed By           : Shishirkumar Aithal
	**Date                 : 29-Nov-2017
	**Change Description   : 26952771 -Schedules enhancement for equated principal check.
	**Search String        : OBCL_123_SUPP_26952771
	
	**  Last Modified By   : Shishirkumar Aithal
	**  Last modified on   : 29-Nov-2017
	**  Search String      : BUG#26952771
	**  Reason             : Equated principal changes for handling frequency options. 
							 Amount formating also done .
	
	**Changed By         : Prakash Ravi
	**Date               : 11-NOV-2017
	**Change Description : Validate on unlock in OLDTRONL when modified from other screens.
	**Search String      : OBCL_14.0.0.0.0_UnlockValidation

	**  Last Modified By   : Siddharth S
**  Last modified on   : 05-MAR-2018
**  Search String      : BUG#27272107
**  Reason             : next version number incremented correctly . 

**  Last Modified By   : Siddharth S
**  Last modified on   : 05-MAR-2018
**  Search String      : BUG#27461832
**  Reason             : Units to be considered on distribute principal
**
**
**  Last Modified By   : Priyadarshini K
**  Last modified on   : 28-DEC-2017
**  Search String      : BUG#27301958 
**  Reason             : Added code for query from ACDTRNQY screen by getting contract ref no.	
	
**  Last Modified By   : Srinivasulu Ch
**  Last modified on   : 06-MAR-2018
**  Search String      : BUG#27461830   
**  Reason             : Added code for initialise the subsystem status while doing copy.

**  Last Modified By   : Siddharth S
**  Last modified on   : 02-FEB-2017
**  Search String      : BUG#27205142
**  Reason             : Reset subsystem stat after hold.

  SFR Number         : 29028579
  Changed By         : Ravi
  Change Description : OLDTRONL: BA ACCEPTANCE WORKFLOW VALIDATIONS
  Search String      : 29028579

    **Changed By         : Pallavi R
    **Date               : 27-Dec-2018
    **Change Description : After repice not able to visit ICCF  
    **Search String      : OBCL_14.2_Supp_BA_#29020354 Changes   

    **Changed By         : Ravi
    **Change Description : Support for Discounted Schedules
    **Search String      : OBCL_14.3_OL_Discounted_Schedules	

	**Changed By         : Vigneshram S
    **Date               : 30-Apr-2019
    **Change Description : Commented the fn_recalc_unit and it will use OLDTRONL_KERNEL.js function.
    **Search String      : Bug#29698734 Changes 
	
	**Changed By         : Meha
    **Date               : 11-Sep-2019
    **Change Description : Floor And  Ceiling changes
    **Search String      : OBCL_14.4_FLRCLG
	
	**Changed By         : Vigneshram S
    **Date               : 13-Mar-2020
    **Change Description : Enable the Active/InActive button during simulation without override case.
    **Search String      : Bug#30996272 Changes

    **Changed By         : Balaji Gopal
    **Changed On         : 21-Jul-2022
    **Search String      : BUG#34300314 Changes
    **Change Reason      : OL/LB SCREEN - OVERWRITE DEFAULT SSI CALLFORM NEED TO REMOVE
****************************************************************************************************************************/
var gPrevAction;
var gEnableButton = false;
var gDisabledefschButton= false;
var gDisablerdfschButton= false;
var gDisableschblock= false;
var gSubSysStat ;  //BUG#27205142
var gActionCode ; 
var visited = false;



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
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));	

	//29028579 Changes starts
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
		fnDisableSubSysButtons(document.getElementById("LBCBADTL").children[0]);
	}
	//29028579 Changes ends	
	//OBCL_14.4_FLRCLG Changes Starts
	if (document.getElementById("BLK_OLTBS_CONTRACT__PRODTYPE").value != 'C') {
		fnDisableSubSysButtons(document.getElementById("OLCFLRCL").children[0]);
	}
	//OBCL_14.4_FLRCLG Changes Ends
 return true; 	
}	
function Fn_defaultschedule(){
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'DEFSCH';
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
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));
 return true; 
}
function fn_explodeSchdelue() {
	if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_NEW' || gAction == 'SUBSYSPKP_MODIFY')
	{
		if (gActionCode != 'SIMCON' && gActionCode != 'ACTIVE' && gActionCode != 'INACTIVE') //Bug#30996272 changes
			{
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'EXPSCH';
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
	}
fnSubScreenMain('OLDTRONL', 'OLDTRONL', 'CVS_SCHEDULE_DETAILS', false);
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));
 return true; 
}
function fnPostAuthorize_KERNEL(){
	DisableToolbar_buttons("Authorize");
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
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));
	//29028579 Changes starts
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
		fnDisableSubSysButtons(document.getElementById("LBCBADTL").children[0]);
	}
	//29028579 Changes ends
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
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EQUIV_PRIN")); //OBCL_125_SUPP_26517132 //OBCL_123_SUPP_26952771
	
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
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo; //BUG#27272107
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;//BUG#27272107		
		appendData(document.getElementById("TBLPageAll"));
		g_prev_gAction=gAction;
		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));
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
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));
	return true;
}
function fnPostUnlock_KERNEL() {
	
	if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
	{
     gDisabledefschButton = true;
     gDisableschblock = true;	 
	if ((document.getElementById("BLK_OLTBS_CONTRACT_MASTER__PAYMETHOD").value == 'D' || document.getElementById("BLK_OLTBS_CONTRACT_MASTER__PAYMETHOD").value == 'T') && (!document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__DISCOUNTED_SCH").value)) //OBCL_14.3_OL_Discounted_Schedules CHANGES
	{	
	gDisablerdfschButton = true;
	}
	//document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;';--OBCL_14.2_RETRO_#29057705 Changes
	/*document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S';//OBCL_14.2_RETRO_#29057705 Changes*/
	//document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S;LBCBADTL:S;';//OBCL_14.2_Supp_BA_#29020354 Changes
	document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S;LBCBADTL:S;';//OBCL_14.2_Supp_BA_#29020354 Changes -- BUG#34300314 removal Overwrite Default SI
	}
  else
	{
		gDisablerdfschButton = true;
	}		
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));	
    expandcontent('TAB_MAIN');
	//BUG#27205142 starts
 if (getElementsByOjName('SUBSYSSTAT') && getElementsByOjName('SUBSYSSTAT').length != 0) {
    var contStat = getElementsByOjName("TXNSTAT")[0].value;
    var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
    if (contStat == 'H') {
     // var reg = new RegExp(':D', "g");
    //  statusStr = statusStr.replace(reg, ":U");
       getElementsByOjName('SUBSYSSTAT')[0].value =  gSubSysStat ; 
	   fnPopulateSubSystemValues(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value);
    }

  }


//BUG#27205142 ends 
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
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));
 return true; 
}
function fnPostNew_KERNEL() {
	gDisablerdfschButton = true;

expandcontent('TAB_MAIN');
	DisableToolbar_buttons("Save");
	DisableToolbar_buttons("Hold");
	gActionCode ='NEW';
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_VIEW_ADVICE"));
	return true;
}
function fnPostCopy_KERNEL(){
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE"));
	fnPopulateSubSystemValues(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value); //Bug#27461830
	//29028579 Changes starts
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
		fnDisableSubSysButtons(document.getElementById("LBCBADTL").children[0]);
	}
	//29028579 Changes ends
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
   try{ //BUG#27301958
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
	 	}
	 catch(e){} //BUG#27301958
	 //BUG#27301958 starts
	 if (parent.screenArgs['PARENT_FUNC_ID']=="ACDTRNQY") 
	{                    
		fnEnterQuery();
		document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parent.screenArgs["CONTREF"];
		gAction= "EXECUTEQUERY";
		fnExecuteQuery();
	}
	 //BUG#27301958 ends  
	return true;
}
//OBCL12.5-26634495 changes ends

// OBCL_125_SUPP_26517132 start
//Bug#29698734 start -Commented the fn_recalc_unit
/*function fn_recalc_unit()
{
	if (gAction == 'NEW' || gAction == 'MODIFY')
	{
		var len = getTableObjForBlock('BLK_OLTBS_CONTRACT_SCHEDULES').tBodies[0].rows.length;
		//var out_amt = document.getElementById('BLK_OLTBS_CONTRACT__TXT_OUT_BAL').value; //Bug#28351681 
		var out_amt = Number(document.getElementById('BLK_OLTBS_CONTRACT_MASTER__AMOUNT').value); //Bug#28351681 
		var total_no = 0;
		var units = 0; //BUG#27461832
		var net_amt = 0;
		var bullet_idx = 0;
		var temp_amt = 0; //OFCL_12.3.0.0.0_26965953
		var lContinue ='Y';//
		//OBCL_14.3_IOF changes starts
		var iof_amt=Number(document.getElementById('BLK_OLTBS_CONTRACT__IOFTAXAMOUNT').value);
		var mora_amt=Number(document.getElementById('BLK_OLTBS_CONTRACT__MORAAMOUNT').value);
		//OBCL_14.3_IOF changes ends
//BUG#27618524 starts
		try{
		evaluatetotalamout1('BLK_OLTBS_CONTRACT_SCHEDULES_PAID');
		}catch(e){
		totalOutstanding=0;
		}
//BUG#27618524 ends
//BUG#26952771 starts 
	 try {
		var endDt = Date.parse(document.getElementById('BLK_OLTBS_CONTRACT_MASTER__MATDT').value);
		var end_date = new Date(endDt); 
		var startDt = Date.parse(document.getElementById('BLK_OLTBS_CONTRACT_MASTER__VALDT').value);
		var start_date = new Date(startDt); 
		var freqCount = 0  ;
		var months = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth());
		//BUG#27618524 starts
		try{
		if(totalOutstanding!= null && totalOutstanding!="" && totalOutstanding != 0) {
			if(Number(out_amt) != Number(totalOutstanding)){
				out_amt = totalOutstanding;
				}
			}
		}catch(e){
		out_amt = document.getElementById('BLK_OLTBS_CONTRACT__TXT_OUT_BAL').value;
		}
		//BUG#27618524 ends
		out_amt = Number(out_amt) + Number(iof_amt) + Number(mora_amt); //OBCL_14.3_IOF changes
		for(var idx=0; idx<len; idx++) {
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
			{
				
				if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value != 'B') 
					&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value != 'L'))//OBCL_14.3_OBCL_14.3_DSBR Changes
					{
					freqCount++ ;
					if (freqCount > 1 ) {
						//showAlerts(fnBuildAlertXML("OL-2999","E"),"E"); //Commented for BUG#26952771
						showAlerts(fnBuildAlertXML("OL-2999","E","Only 1 frequency option apart from bullet is allowed for Principal Component"),"E"); //Added for BUG#26952771
						return false ;
					}
					//BUG#27461832 starts
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == "" 
			|| getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == null
			||	getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == "null"
			|| getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == undefined
			|| getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == "undefined"
			){

			getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = 1 ;  
			getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value = 1 ; 
			}
			units = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value ; 
			 
			//BUG#27461832 ends
			try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'D'){ //Daily
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" ){
											getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value = Math.floor( Math.round((end_date-start_date)/(1000*60*60*24))/units) ; //BUG#27461832 units added
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value = Math.floor( Math.round((end_date-start_date)/(1000*60*60*24))/units) ; //BUG#27461832  units added
					}
				}
			 } catch(e){}
			try {
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'M'){ //Monthly
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" ){
	getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(months/units)  ; //BUG#27461832 units added
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value = Math.floor(months/units)  ;//BUG#27461832 units added
				}
				}
			 } catch(e){}
			 try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'Q'){ //Quarterly 
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" ){
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/3)/units);//BUG#27461832 units added
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/3)/units);//BUG#27461832 units added
					}
				}	
			 } catch(e){}
			 try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'H') {//Halfyearly
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" ){	
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/6)/units); //BUG#27461832 units added
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/6)/units);//BUG#27461832 units added

				}
				}
			 } catch(e){}
			 try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'Y'){ //Yearly
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" ){
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/12)/units);//BUG#27461832 units added
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/12)/units);//BUG#27461832 units added
					}
				}
			 } catch(e){}
			}
		}
		}
	 } catch(e){}
//BUG#26952771 ends		
		
		for(var idx=0; idx<len; idx++)
			if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
				&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value != 'L'))//OBCL_14.3_OBCL_14.3_DSBR Changes
				total_no += parseInt(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value);
			
			//Bug#26952771 Changes Starts 
			try
			{
				if (total_no <= 0 || isNaN(total_no) ) 
				{
					return true;
				}
				//net_amt = Math.ceil((out_amt/total_no)/10)*10; //Commented for OFCL_12.3.0.0.0_26965953
				
				//  OFCL_12.3.0.0.0_26965953 starts
				temp_amt = out_amt/total_no ;
				net_amt = temp_amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value)));

				//  OFCL_12.3.0.0.0_26965953 ends
				
				if (net_amt <= 0 || isNaN(net_amt) ) 
				{
					return true;
				}
			}
			catch(e){
				return true;
			}
			//Bug#26952771 Changes Ends
		for(var idx=0; idx<len; idx++)
			if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
				&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value != 'L'))//OBCL_14.3_OBCL_14.3_DSBR Changes
			{
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value != 'B')
					{ //BUG#27461832
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value != '0' )//BUG#27461832
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = net_amt;
				else
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = 0; //BUG#27461832
				}//BUG#27461832
				else
				//	getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = net_amt + (out_amt-(net_amt*total_no)); //Commented for OFCL_12.3.0.0.0_26965953
				//  OFCL_12.3.0.0.0_26965953 starts
				{
					var count = total_no -1 ; 
					var amt = 0 ;
					amt = out_amt-(net_amt*count);
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = amt.toFixed(parseInt(getNumDigitsAfterDecimal( getTableObjForBlock('BLK_OLTBS_CONTRACT_MASTER__CCY').value)));
				}
				//   OFCL_12.3.0.0.0_26965953 ends				
				try
				{
					//getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value; //Commented for BUG#26952771
				    
					//BUG#26952771 Starts
					 var mb3Amount = new MB3Amount(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value, true, getTableObjForBlock('BLK_OLTBS_CONTRACT_MASTER__CCY').value);
          	        //getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value;
			        getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[1].value =  mb3Amount.getDisplayAmount() ;
				    //BUG#26952771 Ends
				
				}				
				catch(e){}
			}   
	}
	return true; 
}*/


function fn_active_con(event)
{
	g_prev_gAction=gAction;
	gAction = "NEW";
getElementsByOjName('UIACTIONCOD')[0].value='ACTIVE';
	appendData(document.getElementById('TBLPageAll'));
	gActionCode ='ACTIVE';
  doAction('Save',event) 
	{
	 }
 gAction = "NEW";

visited = true;
 return true; 

}
function fn_view_advice(functionId,screenName)
{
	old_action = gAction;
	screenArgs = new Array();
	parent.parentWinParams.brn = mainWin.CurrentBranch;    
	parent.parentWinParams.dcn=getElementsByOjName('DCN_SIM')[0].value;
	fnShowLaunchForm("OLDVWMSG","OLDVWMSG","CVS_OLDVWMSG");
	visited = true;
	return true;
}
function fn_sim_con(event)
{	
	g_prev_gAction=gAction;
	gAction = "NEW";
 getElementsByOjName('UIACTIONCOD')[0].value='SIMCON';
	appendData(document.getElementById('TBLPageAll'));
gActionCode ='SIMCON';
    doAction('Save',event) 
	{ 

	}
    gAction=g_prev_gAction;

visited = true;
    return true;
}
function fn_inactive_acc(event)
{
	g_prev_gAction=gAction;
	gAction = "NEW";
getElementsByOjName('UIACTIONCOD')[0].value='INACTIVE';
	appendData(document.getElementById('TBLPageAll'));
gActionCode ='INACTIVE';
    doAction('Save',event) 
	{ 

	}
    gAction = "NEW";

visited = true;
    return true;

}

function fnPostLoad_KERNEL(){
 
visited = true;
DisableToolbar_buttons("EnterQuery"); 
// document.getElementById("EnterQuery").disabled = true;
 //document.getElementById("EnterQuery").className = "BTNiconD";
 	return true;
}
function fnPostSave_KERNEL() 
{

if (gActionCode =="SIMCON") {
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_SIM_CON"));//Bug#30996272 changes
fnDisableElement(document.getElementById('OLDEVENT'));
}
if (gActionCode =="ACTIVE") {
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_SIM_CON"));
fnEnableElement(document.getElementById('OLDEVENT'));
}
if (gActionCode =="INACTIVE") {
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_SIM_CON"));
fnDisableElement(document.getElementById('OLDEVENT'));
}
visited = true;
	return true;
}

function fnInTab_TAB_MAIN_KERNEL()
{

if (gActionCode !="SIMCON") {
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
}
return true;	
}
function fnPostFocus_KERNEL() {
	if (visited == true) {
		DisableToolbar_buttons("EnterQuery");
	}
    return true;
}

//#29028579 Changes ends
function fnPrePickUpSubSystem_CVS_INTEREST_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'LBCBADTL');
	if (gAction != ''){//OBCL_14.2_Supp_BA_#29020354 Changes
		if (((stat == 'D')||(stat == 'R')) && document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value=='Y'){//OBCL_14.2_Supp_BA_#29020354 Changes
			showErrorAlerts('IN-LB-005');
			return false;
		}
	}
	return true;
}
//#29028579 Changes ends
//OBCL_14.4_FLRCLG Changes Starts  
function fnPostFocus_KERNEL() {	
	var prdType = document.getElementById("BLK_OLTBS_CONTRACT__PRODTYPE").value;
	if ((prdType == 'L') && (prdType != ""))		
		{
		fnDisableSubSysButtons(document.getElementById("OLCFLRCL").children[0]);
		}
	return true;
}
//OBCL_14.4_FLRCLG Changes Ends
//Bug#30996272 changes starts
function fnPreSave_KERNEL() 
{

if (gActionCode =="SIMCON") {
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById('OLDEVENT'));
}
if (gActionCode =="ACTIVE") {
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_SIM_CON"));
fnEnableElement(document.getElementById('OLDEVENT'));
}
if (gActionCode =="INACTIVE") {
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_ACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_INACTIVE_CON"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_SIM_CON"));
fnDisableElement(document.getElementById('OLDEVENT'));
}
visited = true;
	return true;
}
//Bug#30996272 changes ends