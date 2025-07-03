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
**  File Name          : LBDVAMND_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   :
**  Full Version       : 
**  Reason             : 

**Changed By           : Akhila Samson                                             
**Date                 : 20-Jul-2020                                         
**Change Description   : AMENDMENT DATE FIELD - Date Formatting
**Search String        : Bug#31634603

**Changed By           : JayaramN                                           
**Date                 : 22-Jul-2020                                         
**Change Description   : REVERSE BUTTON IS AVAILABLE IN LBDVAMND BEFORE PERFORMING ANY AMENDMENT TO THE DRAWDOWN
**Search String        : Bug#31624800

    **Changed By       : Anusha K
  **Date               : 21-Jul-2020
  **Change Description : commented code for ammendment date
  **Search String      : obcl_141_supp_#31628818 
  
**
**Changed By         : Pallavi R
**Date               : 15-Jul-2022
**Change Description : Rate code was not getting populated in Ratefixing screen
**Search String      : OBCL_14.5_SMTB_#34386248 Changes   

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES


**Changed By         : Mohan Pal
**Date               : 05-Apr-2023
**Change Description : 1. Added fnPostEnterQuery_KERNEL function where if user is having multi branch access then keeping the Branch field as Editable.
					   2. Assigning ammendment value date field with the application date of the Transaction Branch.
**Search String      : Bug#36401952

**Changed By       : Jeevitha K A
  **Date               : 13-Jan-2025
  **Change Description : Before the changes also reverse button was disabled for only auth right user but also commented the unnecessary function and function call of enabledisablerevbtn.
  **Search String      : Bug#37392129_1_changes
****************************************************************************************************************************/
var gPrevAction;


function fnPreAuthorize_KERNEL() {
    authFunction   = 'LBDVMAUT';
    authUixml      = 'LBDVMAUT';
    authScreenName = 'CVS_AUTHVAMI';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDVMAUT']="KERNEL";
    ArrPrntFunc['LBDVMAUT'] = "";
    ArrPrntOrigin['LBDVMAUT'] ="";
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

//Bug#33477689 starts
function fnPostSave_KERNEL(){
	debugs("In fnPostSave", "A");
    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
	
	return true;
}
//Bug#33477689 ends
function fnPreUnlock_KERNEL() {
 
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = "";
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__DIFFAMNT").value = ""; //BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
document.getElementById("BLK_CONTRACT_MASTER__NEWMATDT").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__NEWMATDT").value = "";//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
document.getElementById("BLK_CONTRACT_MASTER__REASCODE").value = ""; 
document.getElementById("BLK_CONTRACT_MASTER__LCYEQVFORINDXLCY").value = ""; 
//document.getElementById("BLK_CONTRACT_MASTER__LCYEQVFORINDXLCYI").value = "";//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
document.getElementById("BLK_CONTRACT_MASTER__LCYEQVFORINDXLCY").value = "";//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

//obcl_141_supp_#31628818 starts
 //OBCL_14.1_Support_Bug#30716636 Changes starts
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDT").value = mainWin.AppDate;	  //27770944 
//document.getElementById("BLK_CONTRACT_MASTER__AMNDDTI").value = mainWin.AppDate;
//fireHTMLEvent(document.getElementById("BLK_CONTRACT_MASTER__AMNDDT"),"onpropertychange");	 
//document.getElementById("BLK_CONTRACT_MASTER__VALUEDT").value = mainWin.curDate;
//document.getElementById("BLK_CONTRACT_MASTER__VALUEDTI").value = mainWin.curDate;
//document.getElementById("BLK_CONT_REV_SCH_BTN__BTN_REVSHDAPPLY").disabled = false; 


//document.getElementById("BLK_CONTRACT_MASTER__VALUEDT").value = mainWin.AppDate;	  //27770944 //Bug#36401952 Commented
document.getElementById("BLK_CONTRACT_MASTER__VALUEDT").value = mainWin.txnBranch[g_txnBranch].AppDate;//Bug#36401952 Added
fireHTMLEvent(document.getElementById("BLK_CONTRACT_MASTER__VALUEDT"),"onpropertychange"); //Bug#31400838:Added

//document.getElementById("BLK_CONTRACT_MASTER__VALUEDT").value = formatDate(mainWin.AppDate);//Bug#36401952 Commented
document.getElementById("BLK_CONTRACT_MASTER__VALUEDT").value = formatDate(mainWin.txnBranch[g_txnBranch].AppDate);//Bug#36401952 Added
fireHTMLEvent(document.getElementById("BLK_CONTRACT_MASTER__VALUEDT"),"onpropertychange"); //Bug#31400838:Added

//obcl_141_supp_#31628818 ends


fnEnableElement(document.getElementById("BLK_CONT_REV_SCH_BTN__BTN_REVSHDAPPLY"));
	appendData();

return true;
}
//obcl_141_supp_#31628818 starts
function formatDate(dsDate)
{
 var mb3Date = new MB3Date(dsDate, gDateFormatDSO);
 if (mb3Date.isValidDate()) 
	return mb3Date.getShortDate();
}

//obcl_141_supp_#31628818 ends
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

//Bug#37392129_1_changes start
/* 
//BUG#31624800 - starts 
function EnableDisableRevBtn()
{
 // if ( document.getElementById("BLK_CONTRACT_MASTER__AMNDINSTSTAT").value == "" || document.getElementById("BLK_CONTRACT_MASTER__AMNDINSTSTATI").value == "" )//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
  if ( document.getElementById("BLK_CONTRACT_MASTER__AMNDINSTSTAT").value == "" )  //BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
  {
	DisableToolbar_buttons("Reverse");
  }
  else
  {
   EnableToolbar_buttons("Reverse");
  }	
  return true;
}
*/ 
//Bug#37392129_1_changes ends
function fnPostExecuteQuery_KERNEL() {
	//EnableDisableRevBtn();   //Bug#37392129_1_changes commented
	return true; 
}
//BUG#31624800 - ends 
//OBCL_14.5_SMTB_#34386248 Changes Starts
function fnPrePickUpSubSystem_CVS_INTEREST_KERNEL(){
	screenArgs['FID'] = "LBDVAMND";
	screenArgs['AUTH_STAT'] = 'Y';
  	return true; 
 }
//OBCL_14.5_SMTB_#34386248 Changes Ends 


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