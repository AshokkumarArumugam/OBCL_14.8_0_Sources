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
**  File Name          : OLDVAMND_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             :

	**Changed By         : Prakash Ravi
	**Date               : 11-NOV-2017
	**Change Description : Validate on unlock in OLDVAMND when modified from other screens.
	**Search String      : OBCL_14.0.0.0.0_UnlockValidation

**  Modified By        : Shishirkumar Aithal
**  Last modified on   : 05-Jan-2018
**  Search String      : Bug No 26833234 Changes 	
**  Reason             : OLDVAMND-BASE-DEV: Revised Schedules & Payment details tabs have no option to save amendments	

**  SFR Number         : 27576550 
**  Search String      : BUG#27576550
**  Changed By         : Vigneshram S
**  Change Description : Disable the reverse button if VAMI reversed

**  SFR Number         : 27536221 
**  Search String      : BUG#27536221
**  Changed By         : Prakash Ravi
**  Change Description : Unlock Validation is moved to the function that was avaiable in the code. Automation issue.
**  Search String      : 27770944
**  Changed By         : Anub Mathew
** Change Description :Forward ported from 27755391 

**  Search String      : OBCL_14.2_VAMI_Sch changes
**  Changed By         : Meha
** Change Description  : Added Redefinition,Default,Distribute principal code 

**  Changed By         : Prakash Ravi
**  Date               : 12-FEB-2019
**  Change Description : Added code to calculate the value of oltb_amount_due before save.
**  Search String      : OBCL_14.3_PMT_DETAILS
**  
**  Changed By         : Pallavi R
**  Date               : 11-Apr-2019
**  Change Description : To display proper functionId for unauth records on Unlock
**  Search String      : OBCL_14.3_DSBR_#29628464 Changes 	

**  Changed By         : Vigneshram S
**  Date               : 15-Apr-2019
**  Change Description : Distribute principal with IOF capitalized amount
**  Search String      : OBCL_14.3_IOF

**  Changed By         : Vigneshram S
**  Date               : 30-Apr-2019
**  Change Description : Validate on DELETE in OLDVAMND when modified from other screens.
**  Search String      : Bug#29634299

**  SFR Number         : 30003484  
**  Search String      : Bug#30003484 
**  Changed By         : Arvind Baskar
**  Change Description : Changed assignment to AppDate

**Changed By           : Revathi D                                              
**Date                 : 23-Dec-2019                                          
**Change Description   : OL AMENDMENT DATE FIELD - Date Formatting
**Search String        : OBCL_14.3_Support_Bug#30684138

**	Changed By         : Manivel Ganesan                                              
**	Date               : 17-Apr-2020                                          
**	Change Description : Modified fnPreUnlock_KERNEL function to throw the following error message when user clicks on
						 unlock button in oldvamnd screen for an unauthorized vami.
						 
						 "Unauthorized amendments exist for contract in $1	OL-01490"
						 
**	Search String      : OBCL_14.3_Support_Bug#31129013  

**  Last Modified By   : Gomathi G
**  Last modified on   : 27-MAY-2020
**  Reason             : To Display  Date, as per user date formatt
**  Search String      : OBCL_14.3_SUPPORT_BUG#31400838 Changes 

**  Last Modified By   : Shikha Trivedi
**  Last modified on   : 10-JUN-2020
**  Reason             : To disable reverse button for unamended contracts
**  Search String      : OBCL_14.4_SUPPORT_BUG#31452425

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31452933

**Changed By         : Kavitha Asokan
**Date               : 19-Feb-2021
**Change Description : New reverse screen for swift messages(103/202) and All the top menu options from main screen will get 
                       disappear on click of Cancel button in Reverse Subscreen during VAMI.                
**Search String      : OBCL_14.4_PM_ReversalviaService starts

**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : changes to show date as user format by fire html instead of  formatdate()
**Search String      : Bug#31400838
**Changed By         : Mohan Pal
**Date               : 29-Jul-2021
**Change Description : Audit Trial Population on SAVE for RFR
**Search String      : Bug#33188129 

**  Last Modified By   : Pallavi R
**  Last modified on   : 31-Jan-2022
**  Search String      : OBCL_14.5_Gulf_#33804237 Changes
**  Reason             : Handle to set focus on Amendment tab during unlock

  **Changed By         : Mohan Pal
  **Date               : 14-Feb-2022
  **Change Description : Validation removed if No of rows more that one for Principal component
  **Search String      : Bug#33850802 

  **Changed By         : Kavitha Asokan
  **Date               : 10-Jun-2022
  **Change Description : Handled Distribute Principal for Open Loans VAMI
  **Search String      : Bug#34154465
  
  **  Last Modified By   : Abhinav K
  **  Last modified on   : 19-Aug-2022
  **  Search String      : Bug#34492162 Change
  **  Reason             : Payment schedules disabled on value dated amendment (OLDVAMND) while Authorizing  
  
  **  Last Modified By   : Abhinav K
  **  Last modified on   : 05-Sep-2022
  **  Search String      : Bug#34359125 Change
  **  Reason             : Action code was assigned incorrect on click of Payment details button   

  **Changed By         : Abhinav Kumar
  **Date               : 13-Mar-2023
  **Change Description : Reverting EXPSCH change, As MODIFY action will be passed on click of Payment details from VAMI screen after Redefinition clicked
  **Search String      : Bug#35140996


  **Changed By         : Mohan Pal
  **Date               : 18-Jul-2023
  **Change Description : 2nd time db call with DEFAULT action code, to populate payment details for RFR contract from RFR staging table.
  **Search String      : Bug#35595945
  
  
**Changed By         : Mohan Pal
**Date               : 05-Apr-2023
**Change Description : 1. Added fnPostEnterQuery_KERNEL function where if user is having multi branch access then keeping the Branch field as Editable.
					   2. Assigning ammendment value date field with the application date of the Transaction Branch.
**Search String      : Bug#36401952

**Changed By         : Jeevitha K A
  **Date               : 09-Jan-2025
  **Change Description : COMMENTED THE FUNCTION WHICH DISABLE THE REVERSE BUTTON FOR USER HAVING ONLY AUTH RIGHT 
  **Search String      : Bug#37392129
****************************************************************************************************************************/
var gPrevAction;
//OBCL_14.2_VAMI_Sch changes
var gDisableschblock= false;
var gEnableButton = false;
var totalOutstanding ;
//OBCL_14.2_VAMI_Sch changes
//OBCL_14.4_PM_ReversalviaService starts
function fnPreReverse_KERNEL(){
	if (document.getElementById('BLK_CONTRACT_MASTER__PMT_MSG_GEN_FLAG').value=='Y'){
	fnSubScreenMain('OLDVAMND','OLDVAMND','CVS_REVERSE');
	}
	return true;
}

function fnPreExit_CVS_REVERSE_KERNEL()
{
	parent.gAction = "";
	return true;
}
//OBCL_14.4_PM_ReversalviaService ends
//Bug#37392129 changes starts
//BUG#27576550  starts 
/*function EnableDisableRevBtn()
{
  if (document.getElementById("BLK_CONTRACT_MASTER__AMNDINSTSTAT").value == "Reversed" || document.getElementById("BLK_CONTRACT_MASTER__AMNDINSTSTAT").value == "Reversed")
{
DisableToolbar_buttons("Reverse");

}
 else if (document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHSTAT").value == "Unauthorized" || document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHSTAT").value == "Unauthorized")
{
DisableToolbar_buttons("Reverse");
}
//OBCL_14.4_SUPPORT_BUG#31452425 starts
 else if (document.getElementById("BLK_CONTRACT_MASTER__AMNDINSTSTAT").value == "" || document.getElementById(
 "BLK_CONTRACT_MASTER__AMNDINSTSTAT").value == "")
 {
	DisableToolbar_buttons("Reverse"); 
 }
//OBCL_14.4_SUPPORT_BUG#31452425 end
else
{
EnableToolbar_buttons("Reverse");
}	
return true;
}
*/
//Bug#37392129 changes ends

function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	gEnableButton = true; //Bug#34492162 Change
	//EnableDisableRevBtn();   //Bug#37392129 code added
	fnEnableMEBlock("BLK_CONTRACT_SCHEDULES",false);	
    //fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAYMENT_DETAILS")); //OBCL_14.3_PMT_DETAILS
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REVISION_DETAILS")); //OBCL_14.3_PMT_DETAILS	
	return true; 
}
function fnPostReverse_KERNEL() {
	debugs("In fnPostReverse", "A");
	//EnableDisableRevBtn();   //Bug#37392129 code added
	//fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes
	return true; 
}
//BUG#27576550 ends
function fnPreAuthorize_KERNEL() {
    authFunction   = 'OLDVMAUT';
    authUixml      = 'OLDVMAUT';
    authScreenName = 'CVS_AUTHVAMI';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDVMAUT']="KERNEL";
    ArrPrntFunc['OLDVMAUT'] = "";
    ArrPrntOrigin['OLDVMAUT'] ="";
    return true;
}

function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
    //setDataXML(getXMLString(pureXMLDOM));
   // showData(dbStrRootTableName, 1);
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
}
//Bug#33188129 starts
function fnPostSave_KERNEL(){
	debugs("In fnPostSave", "A");
    gAction = "EXECUTEQUERY";
	
    
    fnExecuteQuery();
	
	return true;
}
//Bug#33188129 ends
function fnPreUnlock_KERNEL() {
//BUG#27536221 changes start
//OBCL_14.0.0.0.0_UnlockValidation Changes start	
	expandcontent('TAB_AMEND');	//OBCL_14.5_Gulf_#33804237 Changes
	var PCode = (document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value);
	var ProcessCode = PCode.substring(PCode.length - 4);
	var UnauthFunctionId;
	if (ProcessCode != 'AMND'){
		if (ProcessCode == 'REVP' || ProcessCode == 'PMNT') {
			UnauthFunctionId ='OLDPMNT';
		}
		else if (PCode == 'LDREVC' || PCode == 'LDBOOK' ||PCode == 'LDCAMD' || PCode == 'LDINIT' ||PCode == 'LDROLL' || PCode == 'LDRAMD'){
			UnauthFunctionId ='OLDTRONL';
		}
		else if (ProcessCode == 'RFND'){
			UnauthFunctionId ='OLDREFND';
		}
		else if(PCode == 'OLFEE')
		{
			UnauthFunctionId ='LFDACFIN';
		}
		else if(PCode == 'LDMSC')
		{
			UnauthFunctionId ='OLDMSCDT';
		}
		//OBCL_14.3_DSBR_#29628464 Changes Starts
		else if (ProcessCode =='DSBR') 
		{
			UnauthFunctionId ='OLDMNDSB';
		}
		//OBCL_14.3_DSBR_#29628464 Changes Ends
		else {
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
            }
		}
//OBCL_14.0.0.0.0_UnlockValidation Changes end
//BUG#27536221 changes end
//OBCL_14.3_Support_Bug#31129013 Start
	else if (ProcessCode = 'AMND'){
		UnauthFunctionId ='OLDVAMND'
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
			}
		}
//OBCL_14.3_Support_Bug#31129013 End
document.getElementById("BLK_CONTRACT_MASTER__NEWMATTYPE").value = ""; 	
document.getElementById("BLK_CONTRACT_MASTER__NEWMATTYPE").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = "";
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__TENORBSDSPRD").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLMATDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLMATDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLEFFTDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__CONTLEFFTDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__NEWMATDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__NEWMATDT").value = "";
document.getElementById("BLK_CONTRACT_MASTER__REASCODE").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__REMARK").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__REPGMFLAG").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__LCYEQVFORINDXLCY").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__LCYEQVFORINDXLCY").value = "";
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.curDate;	  //27755391

//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.AppDate;//Bug#30003484 //Bug#36401952 COMMENTED
document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.txnBranch[g_txnBranch].AppDate;//Bug#36401952 ADDED



fireHTMLEvent(document.getElementById("BLK_CONTRACT_MASTER__AMNDDT"),"onpropertychange");//OBCL_14.3_SUPPORT_BUG#31004838 Changes
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.curDate;//30003484 
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.AppDate;//Bug#30003484 commented OBCL_14.3_Support_Bug#30684138
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = formatDate(mainWin.AppDate); //added OBCL_14.3_Support_Bug#30684138 //OBCL_14.3_SUPPORT_BUG#31004838 Changes
//document.getElementById("BLK_CONT_REV_SCH_BTN__BTN_REVSHDAPPLY").disabled = false; 
//OBCL_14.2_VAMI_Sch changes Starts
fnEnableElement(document.getElementById("BLK_CONT_REV_SCH_BTN__BTN_REVSHDAPPLY"));
fnDisableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_DIS_PRIN"));	
//OBCL_14.2_VAMI_Sch changes Ends
	appendData();

return true;
}
 //Bug#31400838 changes starts
function fnPostUnlock_KERNEL() {
	{
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.AppDate;	 //Bug#36401952 COMMENTED
document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.txnBranch[g_txnBranch].AppDate;//Bug#36401952 ADDED 
fireHTMLEvent(document.getElementById("BLK_CONTRACT_MASTER__AMNDDT"),"onpropertychange");
  
}
return true;

}
 //Bug#31400838 changes ends
//Bug No 26833234 Changes Start		
function fnPostLoad_CVS_PTMTDET_KERNEL(screenArgs) {
	document.getElementById("cmdAddRow_BLK_AMOUNT_DUE").disabled = true; 
	document.getElementById("cmdDelRow_BLK_AMOUNT_DUE").disabled = true; 
	return true;
}

function fnPostLoad_CVS_REVSCHD_KERNEL(screenArgs) {
	document.getElementById("cmdAddRow_BLK_CONTRACT_REVISION_SCH").disabled = true;
	document.getElementById("cmdDelRow_BLK_CONTRACT_REVISION_SCH").disabled = true; 
 	return true;
}
//OBCL_14.2_VAMI_Sch change Starts
function fnPostLoad_CVS_PAID_SCHEDLS_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
return true;
}
//OBCL_14.2_VAMI_Sch change Ends		
//Bug No 26833234 Changes Ends

function fnRevShdApply(){
	g_prev_gAction = gAction;	
	gAction = 'REVSHDAPPLY';
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
//OBCL_14.2_VAMI_Sch change Starts
function Fn_Defaultschedule(){
	g_prev_gAction = gAction;	
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
 fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REDEFINE"));
 //fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS"));  
 document.getElementById("BLK_CONTRACT_MASTER__REDEFCLICKED").value = 'N';
 document.getElementById("BLK_CONTRACT_MASTER__DISPRCLICKED").value = 'N';
 gDisableschblock = true;
 fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",false);
 return true; 
}
function Fn_redefineschedule(){
		if (gAction == 'SUBSYSPKP_MODIFY' || gAction == 'MODIFY')
	{
	g_prev_gAction = gAction;
	//document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;--Need to check this
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
document.getElementById("BLK_CONTRACT_MASTER__REDEFCLICKED").value = 'Y';
//document.getElementById("BLK_CONTRACT_MASTER__DISPRCLICKED").value = 'N';
fnEnableMEBlock("BLK_CONTRACT_SCHEDULES",true);	
fnDisableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REDEFINE"));
fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS")); 
fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_DIS_PRIN"));
fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAYMENT_DETAILS")); //OBCL_14.3_PMT_DETAILS
fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REVISION_DETAILS")); //OBCL_14.3_PMT_DETAILS	
 gDisableschblock = false;
 
 var fldSet = document.getElementById("TAB_SCHD__SEC_1__PART1__FST_CONTSCHD");
    fldSet.disabled = false;
 return true; 
}
function fn_recalc_unit()
{
		if (gAction == 'NEW' || gAction == 'MODIFY')
	{
		var len = getTableObjForBlock('BLK_CONTRACT_SCHEDULES').tBodies[0].rows.length;		
		var total_no = 0;
		var units = 0; 
		var net_amt = 0;
		var bullet_idx = 0;
		var temp_amt = 0;
		var diff_amt = document.getElementById('BLK_CONTRACT_MASTER__DIFFAMNT').value;
		//var out_amnt = 0;
		var endDt;
		var out_amt=Number(document.getElementById('BLK_CONTRACT_MASTER__AMT').value);
		//OBCL_14.3_IOF changes starts
		var iof_amt=Number(document.getElementById('BLK_CONTRACT_MASTER__IOFTAXAMOUNT').value);
		var mora_amt=Number(document.getElementById('BLK_CONTRACT_MASTER__MORAAMOUNT').value);
		//OBCL_14.3_IOF changes ends
		/*try
		{
		if(Number(document.getElementById('BLK_CONTRACT_MASTER__DIFFAMNT').value )!= 0 )
		{
		diff_amt = document.getElementById('BLK_CONTRACT_MASTER__DIFFAMNT').value;
		out_amnt = document.getElementById('BLK_CONTRACT_MASTER__AMT').value;
		out_amt= Number(Diff_amt) +Number(out_amnt);			
		}
		if(Number(document.getElementById('BLK_CONTRACT_MASTER__DIFFAMNT').value) == 0 )
		{
		out_amt= Number(document.getElementById('BLK_CONTRACT_MASTER__AMT').value);		
		}
		}
		catch(e)
		{}*/
		try{
		evaluatetotalamout1('BLK_OLTBS_CONTRACT_SCHEDULES_PAID');
		}catch(e){
		totalOutstanding=0;
		}
	try {
		if(document.getElementById('BLK_CONTRACT_MASTER__NEWMATDT').value != "" )
		{
		endDt = Date.parse(document.getElementById('BLK_CONTRACT_MASTER__NEWMATDT').value);
		}
		if(document.getElementById('BLK_CONTRACT_MASTER__NEWMATDT').value == "" )
		{
		endDt = Date.parse(document.getElementById('BLK_CONTRACT_MASTER__MATDT').value);
		}
		}
		catch(e)
		{
		endDt = Date.parse(document.getElementById('BLK_CONTRACT_MASTER__MATDT').value);
		}
	try{
		var end_date = new Date(endDt); 
		var startDt = Date.parse(document.getElementById('BLK_CONTRACT_MASTER__VALDT').value);
		var start_date = new Date(startDt); 
		var freqCount = 0 ;
		var months = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth());
		try{
			if((totalOutstanding!= null && totalOutstanding!="" && totalOutstanding != 0) || ((document.getElementById('BLK_CONTRACT_MASTER__OPENLOAN').value == 'Y'))) //Bug#34154465 changes
			{			
			if(Number(out_amt) != Number(totalOutstanding))// && Number(diff_amt)==0 )
			{
			//out_amt = totalOutstanding;
			out_amt = Number(totalOutstanding) + Number(diff_amt);
			}					
			if(Number(out_amt) == Number(totalOutstanding))// && Number(diff_amt)!=0 )
			{
			out_amt = Number(totalOutstanding)+ Number(diff_amt);
			}
			}			
		   }			
		catch(e)
		   {
			//out_amt = document.getElementById('BLK_CONTRACT_MASTER__AMT').value + Number(diff_amt);
		   }
		   out_amt =  Number(out_amt) + Number(iof_amt) +Number(mora_amt) ; //OBCL_14.3_IOF changes
		for(var idx=0; idx<len; idx++) 
			{
				if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL' && 
				    getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value !='L')
				{
					if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value != 'B')
					{
						freqCount++ ;
						//Bug#33850802 starts
						/*
						if (freqCount > 1 ) 
						{					
							showAlerts(fnBuildAlertXML("OL-2999","E","Only 1 frequency option apart from bullet is allowed for Principal Component"),"E");
							return false ;
						}	
						*/
						//Bug#33850802 ends
						if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == "" 
						|| getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == null
						||	getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == "null"
						|| getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == undefined
						|| getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value == "undefined")
						{
						getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value = 1 ;  
						getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value = 1 ; 
						}
						units = getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value ; 
						try {
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value!= null && 
							getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value != ""	
							)
							{
							startDt = Date.parse(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0].value );
							start_date = new Date(startDt); 
							months = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth());
							}
							}
						catch(e) {}
						try {
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'D')
							{ //Daily
								if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
									getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" )
									{
									getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value = Math.floor( Math.round((end_date-start_date)/(1000*60*60*24))/units) ; 
									getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value = Math.floor( Math.round((end_date-start_date)/(1000*60*60*24))/units) ; 
									}
							}
							} 
						catch(e){}
						try {
						if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'M')
							{ //Monthly
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
								getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" )
								{
								getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(months/units); 
								getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value = Math.floor(months/units);
								}
							}
							} 
						catch(e){}
						try {
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'Q')
							{ //Quarterly 
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
							   getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" )
							{
							getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/3)/units);
							getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/3)/units);
							}
							}	
							} 
						catch(e){}
						try {
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'H') 
							{//Halfyearly
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
								getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" )
							{	
							getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/6)/units); 
							getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/6)/units);
							}
							}
							} catch(e){}
						try {
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value == 'Y')
							{ //Yearly
							if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "" || 
								getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value == "null" )
							{
								getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value =  Math.floor(((months)/12)/units);
								getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[1].value =  Math.floor(((months)/12)/units);
							}
							}
							} catch(e){}
					}
				}
			}
		} catch(e){}	
		for(var idx=0; idx<len; idx++)
			if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL' && 
				    getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value !='L')
				total_no += parseInt(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value);			
				try															
				{
					if (total_no <= 0 || isNaN(total_no)) 
					{
						return true;
					}
					temp_amt = out_amt/total_no ;
					net_amt = temp_amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_CONTRACT_MASTER__CCY').value)));				
					if (net_amt <= 0 || isNaN(net_amt)) 
					{
						return true;
					}
				}
			catch(e)
				{
				return true;
				}                                       
		for(var idx=0; idx<len; idx++)
			if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL' && 
				    getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value  !='L')
				{
				if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value != 'B')
				{ 
					if(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value != '0' )
					getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = net_amt;
				else
					getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = 0; 
				}
				else					
				{			
					var count = total_no -1 ; 
					var amt = 0 ;
					amt = out_amt-(net_amt*count);
					getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = amt.toFixed(parseInt(getNumDigitsAfterDecimal( getTableObjForBlock('BLK_CONTRACT_MASTER__CCY').value)));
				}				
				try
				{						
					  var mb3Amount = new MB3Amount(getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value, true, getTableObjForBlock('BLK_CONTRACT_MASTER__CCY').value);          	
					  getTableObjForBlock("BLK_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[1].value =  mb3Amount.getDisplayAmount() ;				
				}				
				catch(e){}
			}   
	}
	document.getElementById("BLK_CONTRACT_MASTER__DISPRCLICKED").value = 'Y';
	//document.getElementById("BLK_CONTRACT_MASTER__REDEFCLICKED").value = 'N';
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAYMENT_DETAILS")); //OBCL_14.3_PMT_DETAILS
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REVISION_DETAILS")); //OBCL_14.3_PMT_DETAILS
	return true; 
}
function evaluatetotalamout1(blkname) 
{
	var totalamt = 0;
    var amount;
    var units;
	var numSDP  ;
	numSDP = getNumDigitsAfterDecimal(document.getElementById('BLK_CONTRACT_MASTER__CCY').value);
	var schedulesPaid = selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID")
	if (schedulesPaid!= null && schedulesPaid.length > 0 ) 
	{
		for (var i = 0;i < schedulesPaid.length;i++) 
		{
			if (getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/COMPONENT")[i]) == "PRINCIPAL" && getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/SCHEDULE_TYPE")[i]) != "L" )
			{
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
	totalOutstanding = Number(document.getElementById('BLK_CONTRACT_MASTER__AMT').value) - Number(totalamt) ; 
	totalOutstanding = totalOutstanding.toFixed(parseInt(numSDP)); 
return true ;
}
//OBCL_14.3_PMT_DETAILS changes start
function fn_explodeSchedule() {
	if (gAction == 'MODIFY')
	{
		if (document.getElementById("BLK_CONTRACT_MASTER__REDEFCLICKED").value == 'Y'){
	g_prev_gAction = gAction;
	//document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	//gAction = 'MODIFY';  //Bug#34359125 Change
	//gAction = 'EXPSCH';  //Bug#34359125 Change
    gAction = 'MODIFY';  //Bug#35140996 Change
	document.getElementById("BLK_CONTRACT_MASTER__PMTDETFLD").value = 'Y';
	/*doAction('Save',event) 
	{ 

	}*/
	
	
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
		fnClassDefault('BLK_CONTRACT_MASTER'); // Bug#35595945 ADDED
	}
fnSubScreenMain('OLDVAMND', 'OLDVAMND', 'CVS_SCHEDULE_DETAILS', false);
 document.getElementById("BLK_CONTRACT_MASTER__PMTDETFLD").value = 'N';
 return true; 
}
//OBCL_14.3_PMT_DETAILS changes End
function getdigits(num)
{
	num=num.toString();
	var digits=num.indexOf(gDecimalSymbol);
	if (digits==-1) digits=num.length;
	return digits;
}
function addlargefloatsigned(x,y)
{	
	var sum='';
	var neg=false;
	x=x.toString();
	y=y.toString();
	x=trimstartzeros(x);
	y=trimstartzeros(y);
	
	if (x.indexOf(gNegativeSymbol)!=-1 && y.indexOf(gNegativeSymbol)!=-1){
		sum = addlargefloat(x.replace(gNegativeSymbol,''),y.replace(gNegativeSymbol,''));
		neg=true;
	}else if (x.indexOf(gNegativeSymbol)!=-1 || y.indexOf(gNegativeSymbol)!=-1){
		if (comparenum(x.replace(gNegativeSymbol,''),y.replace(gNegativeSymbol,''))>=0){
			sum = subtractlargefloat(x.replace(gNegativeSymbol,''),y.replace(gNegativeSymbol,''));
			if (x.indexOf(gNegativeSymbol)!=-1) neg=true;
		}else{
			sum = subtractlargefloat(y.replace(gNegativeSymbol,''),x.replace(gNegativeSymbol,''));
			if (y.indexOf(gNegativeSymbol)!=-1) neg=true;
		}
		
	}else{
		sum = addlargefloat(x,y);
	}
	if (neg==true)
		sum=gNegativeSymbol+sum;
	
	return trimstartzeros(sum);
}
function fnPostUnlock_KERNEL() {
	var fldSet = document.getElementById("TAB_SCHD__SEC_1__PART1__FST_CONTSCHD");
    fldSet.disabled = true;	
	if (gDisableschblock)
    { 
     fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",false);
	}	
	fnDisableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_DIS_PRIN"));	
	//fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes
	//OBCL_14.4_SUPPORT_BUG#31452933 start
	document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHBY").value = "";
	document.getElementById("BLK_CONTRACT_EVENT_LOG__INPUTBY").value = "";
	document.getElementById("BLK_CONTRACT_EVENT_LOG__CK_DTSTAMP").value = "";
	document.getElementById("BLK_CONTRACT_EVENT_LOG__MK_DTSTAMP").value = "";
	//OBCL_14.4_SUPPORT_BUG#31452933 end
	return true;
}	

//function fnInTab_TAB_SCHEDULES_KERNEL() {  //Bug#34492162 Change --Commented Code as TAB name is incorrect, wrt what maintained at RAD
	function fnInTab_TAB_SCHD_KERNEL() {	//Bug#34492162 Change
	//fnEnableMEBlock("BLK_CONTRACT_SCHEDULES",false);
	var fldSet = document.getElementById("TAB_SCHD__SEC_1__PART1__FST_CONTSCHD");
    fldSet.disabled = true;
	//Bug#34492162 Change Starts
	if (gEnableButton)
	{
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_PAYMENT_DETAILS"));
	fnEnableElement(document.getElementById("BLK_CONTRACT_SCHEDULES__BTN_REVISION_DETAILS"));
	}
	//Bug#34492162 Change Ends
	if (gDisableschblock)
    { 
     fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",false);
	}
	return true;
}
//OBCL_14.2_VAMI_Sch change Ends
//BUG#27536221 changes start
/*//OBCL_14.0.0.0.0_UnlockValidation Changes start
function fnPreUnlock_KERNEL(){
	var PCode = (document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value);
	var ProcessCode = PCode.substring(PCode.length - 4);
	var UnauthFunctionId;
	if (ProcessCode != 'AMND'){
		if (ProcessCode == 'REVP' || ProcessCode == 'PMNT') {
			UnauthFunctionId ='OLDPMNT';
		}
		else if (PCode == 'LDREVC' || PCode == 'LDBOOK' ||PCode == 'LDCAMD' || PCode == 'LDINIT' ||PCode == 'LDROLL' || PCode == 'LDRAMD'){
			UnauthFunctionId ='OLDTRONL';
		}
		else if (ProcessCode == 'RFND'){
			UnauthFunctionId ='OLDREFND';
		}
		else if(PCode == 'OLFEE')
		{
			UnauthFunctionId ='LFDACFIN';
		}
		else if(PCode == 'LDMSC')
		{
			UnauthFunctionId ='OLDMSCDT';
		}
		else {
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
            }
		}
	return true;
}
//OBCL_14.0.0.0.0_UnlockValidation Changes end*/
//BUG#27536221 changes end
/* Removed Enable Disable Message_Preview Subsystem Changes :: Starts */
/* //OBCL_14.2.0.0.0_Message_Preview_Changes_Starts
function fnEnableDisableMessagePreviewSubsys() {
    var pCode = document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value;
    var processCode = pCode.substring(pCode.length - 4);
    var unauthFunctionId = 'OLDVAMND';
    if (processCode != 'AMND') {
        if (processCode == 'REVP' || processCode == 'PMNT') {
            unauthFunctionId = 'OLDPMNT';
        } else if (pCode == 'LDREVC' || pCode == 'LDBOOK' || pCode == 'LDCAMD' || pCode == 'LDINIT' || pCode == 'LDROLL' || pCode == 'LDRAMD') {
            unauthFunctionId = 'OLDTRONL';
        } else if (processCode == 'RFND') {
            unauthFunctionId = 'OLDREFND';
        } else if (pCode == 'OLFEE') {
            unauthFunctionId = 'LFDACFIN';
        } else if (pCode == 'LDMSC') {
            unauthFunctionId = 'OLDMSCDT';
        } else {
            unauthFunctionId = pCode;
        }
        var len = document.getElementById("DIVSubSystem").children[0].children.length;
        for (var idx = 0; idx < len; idx++) {
            if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "OLDMSPRV") {
                var messagPreviewLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];
                if (messagPreviewLink == undefined) {
                    messagPreviewLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
                }
                if (pCode != "" && unauthFunctionId != 'OLDVAMND') {
                    fnDisableSubSysButtons(messagPreviewLink);
                } else if (pCode == "") {
					fnDisableSubSysButtons(messagPreviewLink);
				} else {
                    fnEnableSubSysButtons(messagPreviewLink);
                }
            }
        }
    }
    return true;
}
//OBCL_14.2.0.0.0_Message_Preview_Changes_Ends */
/* Removed Enable Disable Message_Preview Subsystem Changes :: Ends */
//Bug#29634299 starts
function fnPreDelete_KERNEL() {
	var PCode = (document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value);
	var ProcessCode = PCode.substring(PCode.length - 4);
	var UnauthFunctionId;
	if (ProcessCode != 'AMND'){
		if (ProcessCode == 'REVP' || ProcessCode == 'PMNT') {
			UnauthFunctionId ='OLDPMNT';
		}
		else if (PCode == 'LDREVC' || PCode == 'LDBOOK' ||PCode == 'LDCAMD' || PCode == 'LDINIT' ||PCode == 'LDROLL' || PCode == 'LDRAMD'){
			UnauthFunctionId ='OLDTRONL';
		}
		else if (ProcessCode == 'RFND'){
			UnauthFunctionId ='OLDREFND';
		}
		else if(PCode == 'OLFEE')
		{
			UnauthFunctionId ='LFDACFIN';
		}
		else if(PCode == 'LDMSC')
		{
			UnauthFunctionId ='OLDMSCDT';
		}
		else if (ProcessCode =='DSBR') 
		{
			UnauthFunctionId ='OLDMNDSB';
		}
		else {
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-0158', 'E', UnauthFunctionId);
                return false;
            }
		}



return true;
}
//Bug#29634299 ends
//OBCL_14.3_SUPPORT_BUG#31004838 Changes starts
//OBCL_14.3_Support_Bug#30684138 Changes 
/*function formatDate(dsDate)
{
 var mb3Date = new MB3Date(dsDate, gDateFormatDSO);
 if (mb3Date.isValidDate()) 
	return mb3Date.getShortDate();
}*/
//OBCL_14.3_Support_Bug#30684138 Changes Ends
//OBCL_14.3_SUPPORT_BUG#31004838 Changes Ends




//Bug#36401952 ADDED STARTS
 function fnPostEnterQuery_KERNEL(){
		
	if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y" && multiBrnScrOpened == false && mainWin.gActiveWindow.screenType != "WB"){		
	   fnEnableElement(document.getElementById("BLK_CONTRACT_MASTER__BRN"));
	} else {	
	   fnDisableElement(document.getElementById("BLK_CONTRACT_MASTER__BRN"));
	}
	return true;
}
//Bug#36401952 ADDED ENDS