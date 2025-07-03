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
**  File Name          : LBDDDONL_KERNEL.js
**  Purpose            : 
**  Called From        : 

** 	  Changed By         : Ramya M
**	  Date               : 21-FEB-2020
**	  Change Description : OBCL 14.4 Changes done to Introduce Distribute Principal in drawdown for LS
**	  Search String      : OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL

  Changed By         : Prakash Ravi
  Changed On         : 17-Jan-2020
  Search String      : BUG#30920049
  Change Reason      : Code changes for Hold action.
  
  Changed By         : Surya Prabha
  Changed On         : 15-July-2020
  Search String      : Bug#31618524
  Change Reason      : Code changes to update version number.

  Changed By         : Vigneshram S
  Changed On         : 15-Jul-2020
  Search String      : BUG#31610744
  Change Reason      : Code changes for SOFR payment details
  
  Changed By         : Vineeth T M
  Changed On         : 28-Jan-2021
  Search String      : OBCL_14.4_SUPP#32426586 changes
  Change Reason      : Restrict user from visiting interest screen before participant.
  
  Changed By         : Ramya M
  Changed On         : 15-Apr-2021
  Search String      : OBCL_14.5_LS_SWINGLINE_ENHANCEMENT_CHANGES
  Change Reason      : Disabled split rollover susbsytem for swingline contracts during CAMD

  Changed By         : Palanisamy M
  Changed On         : 28-Oct-2021
  Search String      : BUG#33393976
  Change Reason      : Added code for query from ACDTRNQY screen by getting contract ref no.
  
  Changed By         : Ramya M
  Changed On         : 10-feb-2022
  Search String      : obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
  Change Reason      : Added code to restrict the validation of BA subsystem
  
  Changed By         : Ramya M
  Changed On         : 14-feb-2022
  Search String      : obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
  Change Reason      : Added code to Disable BA Details subsystem for participantwise BA Contracts
 
  Changed By         : Rajni Kumari
  Changed On         : 28-Mar-2022
  Search String      : OBCL_14.4_SUPP#3398980
  Change Reason      : Bug 33989803 - LBDDDONL: RATE DETAILS GETTING RESET ON RE-ASSIGNMENT 
  
  Changed By         : Arunprasath
  Changed On         : 09-Jul-2022
  Search String      : Bug#34300314
  Change Reason      : Added code to hide overwrite SSI call form  
  
 **
**Changed By         : Pallavi R
**Date               : 15-Jul-2022
**Change Description : Rate code was not getting populated in Ratefixing screen
**Search String      : OBCL_14.5_SMTB_#34386248 Changes  

**Changed By         : Rashmi B V
**Date               : 06-Dec-2022
**Change Description : Ancillary Drawdown Changes
**Search String      : Bug#34758372

**Changed By         : Mohan Pal
**Date               : 15-Mar-2023
**Change Description : initialising UI field 'REDEFCLICKED'
**Search String      : Bug#35172289

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 29-03-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 04-04-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**Changed By         : Sudharshini Balaji
**Changed On         : 04-Aug-2023
**Search String      : BUG#35675376
**Change Reason      : Added code for query from OLDCRPVW screen by getting contract ref no.

**  CHANGE LOG         : Arunprsath
**  Last modified on   : 27-Jul-2023
**  Reason             : Drawdown SSI change - Updating OLCONDET susystem status to S during CAMD action 
**  SEARCH STRING      : Bug#35647444
**  CHANGE LOG         : Mohan Pal
**  Last modified on   : 30-Oct-2023
**  Reason             : Making DB call during CAMD payment details click with action code DEFAULT
**  SEARCH STRING      : Bug#35892712

**  CHANGE LOG         : Kavitha Asokan
**  Last modified on   : 06-Jun-2024
**  Reason             : REDWOOD CHANGES - "Distribute principal" button functionality is not working , so commented out resetting the action code before painting the data.
**  SEARCH STRING      : Bug#36697755_Fix_3
**  Reason             : REDWOOD CHANGES - After save schedules block is empty and only during requery able to see the schedules. 
                         Commented out the fnexecutequery and calling the kernel postexecute query in postsave. 
**  SEARCH STRING      : Bug#36697755_Fix_4

**  CHANGE LOG         : Balaji Gopal
**  Last modified on   : 26-Dec-2024
**  Reason             : Distribute Principal is Enabled when contract is unauthorized
**  SEARCH STRING      : Bug#37392330
****************************************************************************************************************************/
var gPrevAction;
var gEnableButton = false;
var gDisabledefschButton= false;
var gDisablerdfschButton= false;
var gDisableschblock= false;

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
 return true; 	
}	
function FN_DEFAULTSCHEDULE(){
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
 return true; 
}
function fn_explodeSchdelue() {
	if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_NEW' || gAction == 'SUBSYSPKP_MODIFY')
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
 if (gAction == 'NEW' || gAction == 'MODIFY' ){  //  gAction == 'MODIFY' added BUG#35892712 
		fnClassDefault('BLK_OLTBS_CONTRACT'); // Bug#31610744
	} 
	}
fnSubScreenMain('LBDDDONL', 'LBDDDONL', 'CVS_SCHEDULED_DETAILS', false);
 return true; 
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDDDAUT';
    authUixml = 'LBDDDAUT';
    authScreenName = 'CVS_DRAWDOWN_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDTRAUT'] = "KERNEL";
    ArrPrntFunc['LBDDDAUT'] = "";
    ArrPrntOrigin['LBDDDAUT'] = "";
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

//Bug#33477689 starts
function fnPostSave_KERNEL(){
	debugs("In fnPostSave", "A");
    gAction = "EXECUTEQUERY";
	//Bug#36697755_Fix_4 changes starts
    //fnExecuteQuery();
    fnPostExecuteQuery_KERNEL(); 
	//Bug#36697755_Fix_4 changes ends 
	
	return true;
}
//Bug#33477689 ends

function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTREFNO').value;    
    return true;
}

function fnPostExecuteQuery_KERNEL() {
	gEnableButton = true;
	expandcontent('TAB_MAIN');
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV")); //OFCL_12.3.0.0.0_25039084 changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT")); //OFCL_12.3.0.0.0_25039084 changes
	return true;
}


//ankk changes done to enable reval schedules
function fnInTab_TAB_CONTRACT_KERNEL() {
	
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_REVSCH"));
	
	
}
function fnInTab_TAB_SCH_KERNEL() {
	if (gEnableButton)
	{
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PYMNT_DTS"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EXPSCH"));
     //OBCL_14.1_SUPP_SMTB_#29412429 Changes starts
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_UNEARNEDINT_DETAIL"));
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_CMTREDN_SCHEDULE_DUE"));
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_RATE_REVISION"));
     //OBCL_14.1_SUPP_SMTB_#29412429 Changes ends
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__BTN_LIQ_ORDER"));
	}
	if (gDisabledefschButton)
	{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DEF_SCH"));
	}
	if (gDisablerdfschButton)
	{
		//fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));--commented OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL
		/*Starts OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL*/
		if (gAction == 'NEW') 
		{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));//DISPR
		fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DISPR"));//DISPR
			fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS")); //OBCL_14.1_SUPP_SMTB_#29412429 Changes
		
}
		else if (gAction == 'MODIFY')
		{
			fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));//DISPR
			fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DISPR"));//DISPR
            //Bug#37392330 Starts Here
            if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'N'){
               fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DISPR"));
            }
            //Bug#37392330 Ends Here
			fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS")); //OBCL_14.1_SUPP_SMTB_#29412429 Changes
		
}
		/*Ends OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL*/
	}
	if (gDisableschblock)
    { 
     fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",false);
	}
		return true;
}
function Fn_GetCreditLines(){
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'GETLINES';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    gAction = g_prev_gAction;
 return true; 
}

//OFCL_12.3.0.0.0_25034600 changes starts
function  fnOnClick_BTN_NEXT(){
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = 'VERSIONQUERY';
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__DDVERNO").value);
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value);
	if(verNo == versionCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}
	if(verNo<versionCount)
	{
		verNo++;
		document.getElementById("BLK_OLTBS_CONTRACT__DDVERNO").value=verNo;	
		document.getElementById("BLK_OLTBS_CONTRACT__DDVERNO").value=verNo;	
        document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;	//Bug#31618524 changes
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;    //Bug#31618524 changes			
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
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__DDVERNO").value);
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value);
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	verNo--;
	if(verNo>0)
	{			
		document.getElementById("BLK_OLTBS_CONTRACT__DDVERNO").value=verNo;		
		document.getElementById("BLK_OLTBS_CONTRACT__DDVERNO").value=verNo;
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
	
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
    if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
	{
//OBCL_14.1_SUPP_SMTB_#29412429 Changes STARTS
		 gDisabledefschButton = true;
     gDisableschblock = true;
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));//OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL
	

//fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DISPR"));//OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL
  fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DISPR"));//Bug#37392330
	 
	document.getElementById("BLK_LBTBS_DRAWDOWN_SCHEDULE__SUBSYSSTAT").value='LBCENTTY:U;LBCPARAT:S;LBCEXRFX:S;LBCINTRS:S;LBCSKMDR:S;LFCTRCHG:S;LFCFEECF:S;LBCPRTAX:S;OLCONDET:S;OLCTRMIS:S;LBCONPTY:S;OLCTRUDF:S;OLCINTRT:S;LBCADVIC:S;LPCPRATE:S;LBCUKUDF:S;OLCESCAM:S;LBCFPMLS:S;LBCSPROL:S;LBCRTHIS:D;LBCCONHL:D'; //#28780549 Changes
	}	
	else //LBCSTDET:S -- removed as part of Bug#34300314  
    {
	 gDisablerdfschButton = true; 	
	 document.getElementById("BLK_LBTBS_DRAWDOWN_SCHEDULE__SUBSYSSTAT").value='LBCENTTY:U;LBCPARAT:S;LBCEXRFX:S;LBCINTRS:U;LBCSKMDR:S;LFCTRCHG:S;LFCFEECF:S;LBCPRTAX:S;OLCONDET:S;OLCTRMIS:S;LBCONPTY:S;OLCTRUDF:S;OLCINTRT:S;LBCADVIC:S;LPCPRATE:S;LBCUKUDF:S;OLCESCAM:S;LBCFPMLS:S;LBCSPROL:D;LBCRTHIS:D'; //BUG#30920049 Change //OBCL_14.4_SUPP#3398980 LBCINTRS STAT changed to U
	} //LBCSTDET:S --removed as part of Bug#34300314

//OBCL_14.5_LS_SWINGLINE_ENHANCEMENT_CHANGES starts; //Bug#34758372 Added condition for ANCILLARY 
if (gAction == 'SUBSYSPKP_MODIFY' || gAction == 'MODIFY')
{
	
if (document.getElementById("BLK_LBTBS_DRAWDOWN_SCHEDULE__SWINGLNDD").value==true || document.getElementById("BLK_LBTBS_DRAWDOWN_SCHEDULE__ANCILLARY").value==true) 
{
		//fnDisableSubSysButtons(document.getElementById("LBCSPROL").children[0]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		fnDisableSubSysButtons(document.getElementById("LBCSPROL"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
 }
}
 //OBCL_14.5_LS_SWINGLINE_ENHANCEMENT_CHANGES ENDS	
	
	 expandcontent('TAB_MAIN');
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
   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DISPR"));//OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL 
	}
fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",true);	
//OBCL_14.1_SUPP_SMTB_#29412429 Changes STARTS	
//fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFINE"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DEF_SCH"));
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS"));
//OBCL_14.1_SUPP_SMTB_#29412429 Changes ENDS



 gDisableschblock = false;
 //Bug#35172289 ADDED STARTS
 try {
 document.getElementById("BLK_OLTBS_CONTRACT__REDEFCLICKED").value = 'Y';
 }catch(e) {}
  //Bug#35172289 ADDED ENDS
 return true; 
}
/*Starts OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL*/
function Fn_Distribute_Principal(){
		if ( gAction == 'MODIFY' || gAction == 'NEW')
	{
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'DISPR';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			if (msgStatus == "FAILURE") {
					//gAction = g_prev_gAction; //Bug#36697755_Fix_3 changes
	
					var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
				//gAction = g_prev_gAction; //Bug#36697755_Fix_3 changes
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
//fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DISPR"));
 gDisableschblock = false;
 return true; 
}
/*Ends OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL*/
function fnPostNew_KERNEL() {
	gDisablerdfschButton = true;
expandcontent('TAB_MAIN');
	return true;
}
function fnPostCopy_KERNEL(){
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE"));
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
//OBCL_14.1_SUPP_SMTB_#29412429 Changes STARTS
function fnPostLoad_CVS_SCH_PAID_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
return true;
}
//OBCL_14.1_SUPP_SMTB_#29412429 Changes ENDS

function fnPreLaunchForm_CVS_PARTSUM_KERNEL(screenArgs ){
	screenArgs['Product_Type'] = 'D';
	screenArgs['PTREF'] = document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value;
parent.screenArgs =screenArgs;
	return true;
}

function fnPreLaunchForm_CVS_NETTING_KERNEL(screenArgs ){
	screenArgs['TRANCHEREFNO'] = document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value;
parent.screenArgs =screenArgs;
	return true;
}
//OBCL 14.0 27353773 - customer 360 changes starts
function fnPostLoad_KERNEL(){
	var parentWin = fnGetParentWin();
	if (parentWin != "") { 
	//if (parentWin.parentWinParams.CALLFORM =='LOANDET' ) { 
	  if (parentWin.parentWinParams.PARENT_FUNC_ID== "STDCUSVW") 
	  {                    
	    fnEnterQuery();
	    document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
	    gAction= "EXECUTEQUERY";
	    fnExecuteQuery();
	  }
	//}	 //OBCL_14.3_diary_event
	  if (parentWin.parentWinParams.PARENT_FUNC_ID== "OLDDRYET") 
	  {                    
	    fnEnterQuery();
	    document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
	    gAction= "EXECUTEQUERY";
	    fnExecuteQuery();
	  }
	  
	  //Bug#35675376 changes starts
	  if (parentWin.parentWinParams.PARENT_FUNC_ID== "OLDCRPVW") 
	  {                    
	    fnEnterQuery();
	    document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
	    gAction= "EXECUTEQUERY";
	    fnExecuteQuery();
	  }
	 //Bug#35675376 changes ends
	//BUG#33393976 starts
	  if (parent.screenArgs['PARENT_FUNC_ID']== "ACDTRNQY") 
	  {                    
	    fnEnterQuery();
	    document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parent.screenArgs["CONTREF"];
	    gAction= "EXECUTEQUERY";
	    if (fnExecuteQuery() == false)
		{
			mainWin.dispHref1("LBDTRONL", seqNo);
		}
	  }
	//BUG#33393976 ends		  
	}
   	
	return true;
}
//OBCL 14.0 27353773 - customer 360 changes ends

//#28780549 Changes starts
function fnPrePickUpSubSystem_CVS_BADETS_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCPARAT');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-003');
  return false;
 }
 return true;
}

function fnPrePickUpSubSystem_CVS_PARAT_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
	 //fnDisableSubSysButtons(document.getElementById("LBCBADTL").children[0]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		fnDisableSubSysButtons(document.getElementById("LBCBADTL"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
 }
 /*obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES STARTS*/
  if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value=='Y') {//obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_PART_BA_RATE_YN").value=='Y'){//obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
	//	fnDisableSubSysButtons(document.getElementById("LBCBADTL").children[0]);//obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
		fnDisableSubSysButtons(document.getElementById("LBCBADTL"));//obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
	 }	
 }
 /*obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES ENDS*/
 var stat = extractSubSysStat(l_statusStr, 'LBCENTTY');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-006');
  return false;
 }
 return true;
}

function fnPrePickUpSubSystem_CVS_INTEREST_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'LBCBADTL');
	//OBCL_14.5_SMTB_#34386248 Changes Starts
	screenArgs['FID'] = "LBDDDONL";
	screenArgs['AUTH_STAT'] = document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value;
	//OBCL_14.5_SMTB_#34386248 Changes Ends
 if (stat != 'U' && document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value=='Y'){
	 if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_PART_BA_RATE_YN").value=='N'){//obcl_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
		showErrorAlerts('IN-LB-005');
		return false;
	 }
 }
  //OBCL_14.4_SUPP#32426586 changes start
 var stat_part = extractSubSysStat(l_statusStr, 'LBCPARAT');
 if(stat_part != 'U' && document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value=='N' && gAction=='NEW'){
 showErrorAlerts('IN-LB-003');
 return false;
 }
 //OBCL_14.4_SUPP#32426586 changes ends
 return true;
}
//#28780549 Changes ends
//OBCL_14.1_SUPP_SMTB_#29412429 Changes STARTS

function fn_recalc_unit()
{
	if (gAction == 'NEW' || gAction == 'MODIFY')
	{
		var len = getTableObjForBlock('BLK_OLTBS_CONTRACT_SCHEDULES').tBodies[0].rows.length;
		var out_amt = document.getElementById('BLK_OLTBS_CONTRACT__TXTOBAL').value;
		var total_no = 0;
		var units = 0; 
		var net_amt = 0;
		var bullet_idx = 0;
		var temp_amt = 0; 
		try{
		evaluatetotalamout1('BLK_OLTBS_CONTRACT_SCHEDULES_PAID');
		}catch(e){
		totalOutstanding=0;
		}

	 try {
		var endDt = Date.parse(document.getElementById('BLK_LBTBS_DRAWDOWN_SCHEDULE__MATDT').value);
		var end_date = new Date(endDt); 
		var startDt = Date.parse(document.getElementById('BLK_LBTBS_DRAWDOWN_SCHEDULE__DDDT').value);
		var start_date = new Date(startDt); 
		var freqCount = 0  ;
		var months = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth());
		try{
		if(totalOutstanding!= null && totalOutstanding!="" && totalOutstanding != 0) {
			if(Number(out_amt) != Number(totalOutstanding)){
				out_amt = totalOutstanding;
				}
			}
		}catch(e){
		out_amt = document.getElementById('BLK_OLTBS_CONTRACT__TXTOBAL').value;
		}
		for(var idx=0; idx<len; idx++) {
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
			{
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-select-single")[0].value != 'B'){
					freqCount++ ;
					if (freqCount > 1 ) {
						return false ;
					}
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value == "" 
			|| getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value == null
			||	getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value == "null"
			|| getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value == undefined
			|| getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value == "undefined"
			){

			getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value = 1 ;  
			getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[1].value = 1 ; 
			}
			units = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-input-text")[0].value ; 
			 
			try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-select-single")[0].value == 'D'){ 
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "null" ){
											getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value = Math.floor( Math.round((end_date-start_date)/(1000*60*60*24))/units) ; added
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[1].value = Math.floor( Math.round((end_date-start_date)/(1000*60*60*24))/units) ; 
					}
				}
			 } catch(e){}
			try {
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-select-single")[0].value == 'M'){ 
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "null" ){
	getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value =  Math.floor(months/units)  ;
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[1].value = Math.floor(months/units)  ;
				}
				}
			 } catch(e){}
			 try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-select-single")[0].value == 'Q'){ 
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "null" ){
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/3)/units);
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/3)/units);
					}
				}	
			 } catch(e){}
			 try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-select-single")[0].value == 'H') {//Halfyearly
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "null" ){	
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/6)/units); 
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/6)/units);

				}
				}
			 } catch(e){}
			 try {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-select-single")[0].value == 'Y'){ //Yearly
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "" || 
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value == "null" ){
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/12)/units);
						getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/12)/units);
					}
				}
			 } catch(e){}
			}
		}
		}
	 } catch(e){}
		
		for(var idx=0; idx<len; idx++)
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
				total_no += parseInt(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value);
			
			try
			{
				if (total_no <= 0 || isNaN(total_no) ) 
				{
					return true;
				}
				
				temp_amt = out_amt/total_no ;
				net_amt = temp_amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_LBTBS_DRAWDOWN_SCHEDULE__DDCCY').value)));

				
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
					{ 
					if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value != '0' )
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = net_amt;
				else
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = 0; 
				}
				else
				
				{
					var count = total_no -1 ; 
					var amt = 0 ;
					amt = out_amt-(net_amt*count);
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = amt.toFixed(parseInt(getNumDigitsAfterDecimal( getTableObjForBlock('BLK_LBTBS_DRAWDOWN_SCHEDULE__DDCCY').value)));
				}
				try
				{
					
					 var mb3Amount = new MB3Amount(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value, true, getTableObjForBlock('BLK_LBTBS_DRAWDOWN_SCHEDULE__DDCCY').value);
          	       
			        getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value =  mb3Amount.getDisplayAmount() ;
				
				}				
				catch(e){}
			}   
	}
	return true; 
}

function evaluatetotalamout1(blkname) {
   var totalamt = 0;
    var amount;
    var units;
var numSDP  ;
numSDP = getNumDigitsAfterDecimal(document.getElementById('BLK_LBTBS_DRAWDOWN_SCHEDULE__DDCCY').value);

 var schedulesPaid = selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID")
if (schedulesPaid!= null && schedulesPaid.length > 0 ) {
 for (var i = 0;i < schedulesPaid.length;i++) {
if (getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/COMPONENT")[i]) == "PRINCIPAL"){
  amount =getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/AMOUNT")[i]);
  units =getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/NO_OF_SCHEDULES")[i]);
if (units == 0 || units == "") 
	    	continue;
else if (getdigits(amount)>12 || getdigits(totalamt)>12)
                totalamt = addlargefloatsigned(totalamt,amount);
   else {
   totalamt = (Number(totalamt) * Number(1000)) + (Number(amount) *Number(units) * Number(1000));    
		            totalamt = totalamt / 1000;
    totalamt = totalamt.toFixed(parseInt(numSDP)); 
    }


}
}

}
totalOutstanding = Number(document.getElementById('BLK_OLTBS_CONTRACT_MASTER__AMOUNT').value) - Number(totalamt) ; 
totalOutstanding = totalOutstanding.toFixed(parseInt(numSDP)); 

return true ;
}

function evaluatetotalamout(blkname) {
  var meblkName = document.getElementById(blkname); 
  var tableObject;
   var numSDP = '';
    var rowList;
tableObject = meblkName;
  rowList = tableObject.tBodies[0].rows;
  	numSDP = getNumDigitsAfterDecimal(document.getElementById(parentDenomBlock+"__CDCCY").value);
    if (rowList != undefined && rowList.length != 0) {
        for (var rowIndex = 0; rowIndex < rowList.length; rowIndex++) {
	 amount = rowList[rowIndex].cells[4].getElementsByTagName("oj-input-text")[0].value;
         units = rowList[rowIndex].cells[3].getElementsByTagName("oj-input-text")[1].value;
	if (units == 0 || units == "") 
	    	continue;
		else if (getdigits(amount)>12 || getdigits(totalamt)>12)
                totalamt = addlargefloatsigned(totalamt,amount);
   else {
   totalamt = (Number(totalamt) * Number(1000)) + (Number(amount) * Number(1000));    
		            totalamt = totalamt / 1000; //Moved to here From Down
    totalamt = totalamt.toFixed(parseInt(numSDP)); 
    }
    }
 if (isNaN(parseInt(totalamt))) {
            totalamt = 0.0;
        }


}
return true ;
}

//OBCL_14.1_SUPP_SMTB_#29412429 Changes ENDS

//34758372 changes start
function fn_acillaryChange(){
  if (gAction == 'SUBSYSPKP_NEW' || gAction == 'NEW'){	 
	if (document.getElementById("BLK_LBTBS_DRAWDOWN_SCHEDULE__ANCILLARY").value==true) {
			//fnDisableSubSysButtons(document.getElementById("LBCSPROL").children[0]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			fnDisableSubSysButtons(document.getElementById("LBCSPROL"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	 } else{
		// fnEnableSubSysButtons(document.getElementById("LBCSPROL").children[0]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		fnEnableSubSysButtons(document.getElementById("LBCSPROL"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	 }
	}
 return true;
}
//34758372 changes end

//Bug#35647444 Start
//Screen Arguments to LBCENTTY screen for disabling ssi menmonc field during CAMD action
function fnPrePickUpSubSystem_CVS_ENTITYLB_KERNEL(){
	screenArgs['FID'] = "LBDDDONL";
	screenArgs['AUTH_STAT'] = document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value;
  return true;
}

//Changing Settlement sub status to S incase of user click on OK on Entity screen during camd action 
function fnPrePickUpSubSystem_CVS_SETTLEMENTS_KERNEL(){
	var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(statusStr, 'OLCONDET');
	if ((gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY') && (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
	     &&( stat == 'R'))
	{
		if (statusStr.indexOf('OLCONDET' + ':') != -1) {
		statusStr = statusStr.replace('OLCONDET' + ':R', 'OLCONDET' + ':S');
		document.getElementsByName('SUBSYSSTAT')[0].value = statusStr;
		}
	}
  return true;
}

//Bug#35647444 end