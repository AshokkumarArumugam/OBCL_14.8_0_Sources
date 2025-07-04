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
**  Last Modified By   :ANUB MATHEW
**  Search String      : OBCL 14.0 27461834 BUG#27157960 
**  Reason             : Validate schedules only if redef is clicked during CAMD

**  Last Modified By   : Priyadarshini K 
**  Last modified on   : 02-FEB-2017
**  Search String      : BUG#28351681
**  Reason             : Enabled distribute principle button only after redefine and default.

  SFR Number         : 29028579
  Changed By         : Ravi
  Change Description : OLDTRONL: BA ACCEPTANCE WORKFLOW VALIDATIONS
  Search String      : 29028579
  
  Changed By          : ANUSHA KERNEL
   Changes On         : 20-DEC-2018
   Change Description : Split rollover modification on CAMD
   Search  String     : OBCL_14.2_RETRO_#29057705 Changes 

    **Changed By         : Pallavi R
    **Date               : 27-Dec-2018
    **Change Description : After repice not able to visit ICCF  
    **Search String      : OBCL_14.2_Supp_BA_#29020354 Changes   

**  Last Modified By   : Aruna Devi Rajendran
**  Last modified on   : 11-FEB-2019
**  Search String      : OBCL_14.3.0.0.0_RolloverChanges 
**  Reason             : Rollover changes for subsys pickup


      **Changed By         : Pallavi R
      **Date               : 06-Mar-2019
      **Change Description : Changes done for Disbursement
      **Search String      : OBCL_14.3_OBCL_14.3_DSBR Changes 

    **Changed By         : Ravi
    **Change Description : Support for Discounted Schedules
    **Search String      : OBCL_14.3_OL_Discounted_Schedules	

      **Changed By         : Pallavi R
      **Date               : 11-Apr-2019
      **Change Description : To display proper functionId for unauth records on Unlock
      **Search String      : OBCL_14.3_DSBR_#29628464 Changes 	

      **Changed By         : Vigneshram S
      **Date               : 15-Apr-2019
      **Change Description : Distribute principal for IOF tax amount
      **Search String      : OBCL_14.3_IOF

      **Changed By         : Pallavi R
      **Date               : 11-Apr-2019
      **Change Description : Distribute pricipal button changes for futuer and current dated contracts
      **Search String      : OBCL_14.3_DSBR_#29518026 Changes 		  
			
      **Changed By         : Prakash RAvi
      **Date               : 14-May-2019
      **Change Description : Code for contract details button.
      **Search String      : BUG#29608519 Changes 

      **Changed By         : Aruna R
      **Date               : 25-May-2019
      **Change Description : Handle moratorium amount for distribute principal in CAMD.
      **Search String      : BUG#29828479 Changes	

	**  Last Modified By   : Chandra Achuta
	**  Last modified on   : 10-JUL-2019
	**  Search String      : BUG#30003626
	**  Reason             : Reset subsystem stat after hold. 	  
	
	**  Last Modified By   : Aruna
**  Last modified on   : 30-Aug-2019
**  Search String      : BUG#30239017
**  Reason             : Handle to set focus on main tab during query

**  Last Modified By   : Meha
**  Last modified on   : 11-Sep-2019
**  Search String      : OBCL_14.4_FLRCLG
**  Reason             : Floor And  Ceiling changes
	  **Last Modified By   : Palanivel Jayaraman
	  **Last modified on   : 26-Feb-2020
	  **Search String      : OBCL_14.3_Schedule_upload
	  **Reason             : Added the logic to read the csv file for schedule upload
    
**  Last Modified By   : Gomathi
**  Last modified on   : 12-Mar-2020
**  Search String      : OBCL_14.3_Support_Bug#31016539
**  Reason             : On click of New button, user wants the focus to be placed on product code instead of contract ref no.

**Last Modified By   : Aishwarya
**Last modified on   : 31-Mar-2020
**Search String      : OBCL_14.4_support_Bug#31054736
**Reason             : Handled empty file upload issue.	  		

    ** Changed By         : Divya J
    ** Changed On         : 16-Apr-2020
    **  Search String     : OBCL_14.3_Support_Bug#30920052
    **  Reason            : Linkages tab display of commitment available amount.
	
**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31452933

  **Changed By         : ArunaDevi Rajendran
  **Date			   : 21-Jul-2020
  **Change Description : Added code for the new action DSBRSPLSCH
  **Search String      : OBCL_14.4_DSBR_SplitSettlementAmount
  
**	Last Modified By   : Abhinav Kumar
**	Last modified on   : 18-Sept-2020
**	Search String      : OBCL_14.3_Support_Bug#31904242 Forward port Bug#31612116
**	Reason             : Commitment linkage Erases Data In settlements subsystem- To Handle LNKDET-only for Action New and Modify  
  
**	Last Modified By   : Navoneel Nandan
**	Last modified on   : 09-Oct-2020
**	Search String      : OBCL_14.5_Hist_int
**	Reason             : Disabling the Interest Rate History Button during new contract

**	Last Modified By   : Jithin Mahesh
**	Last modified on   : 13-Nov-2020
**	Search String      : Bug#32136677
**	Reason             : fnEnableDisableMessagePreviewSubsys call was going to exception as this fnEnableDisableMessagePreviewSubsys definition was already removed.

**	Last Modified By   : Chandra Prasath
**	Last modified on   : 20-Nov-2020
**	Search String      : OBCL_14.5_Repayment_Details
**	Reason             : Disabling the Repayment Details Button for Non Commitment Contracts

**	Last Modified By   : Bharathish Diggavi
**	Last modified on   : 11-Dec-2020
**	Search String      : ChatBot Integration
**	Reason             : Chat Bot implementation for contratc search with partial detail and copy contract.

**	Last Modified By   : ArunaDevi Rajendran
**	Last modified on   : 19-Jan-2021
**	Search String      : OBCL_14.4_360CorporateCustomerView
**	Reason             : To invoke the contract screen from 360 Corporate customer view Screen

**  Last Modified By   : Jithin Mahesh
**  Last modified on   : 27-Jan-2021
**  Search String      : Bug#32011999
**  Reason             : Forward port of 31577476. Fix provided to keep schedules grid disabled when subsystem is opened without clicking redefinition button. 

**Changed By         : Navoneel Nandan
**Date               : 21-Jan-2021
**Change Description : Calling the Reversal Reason Capture Screen during Reverse                         
**Search String      : OBCL_14.5_Reversal_Reason_Capture 

**Changed By         : Navoneel Nandan
**Date               : 29-Jan-2021
**Change Description : Diasabling the toolbar buttons for payment reversal (INRV)                         
**Search String      : OBCL_14.4_PM_ReversalviaService starts

    ** Changed By         : Divya J
    ** Changed On         : 03-Mar-2021
    **  Search String     : OBCL_14.3_Support_Bug#30920052_1
    **  Reason            : Linkages tab Failure on Balance population for F4 Click.

**Changed By         : Navoneel Nandan
**Date               : 15-Mar-2021
**Change Description : Resetting the Rollover Tab on click of New and Enter Query                         
**Search String      : OBCL_14.4_Rollover_tab_reset_#32636886

  **Changed By         : Mohan Pal
  **Date               : 10-jun-2021
  **Change Description : Distribute DSBR Split
  **Search String      : Bug#32897832
  
  **Changed By         : Reghuraj
  **Date               : 9-july-2021
  **Change Description : issue with post redefinition click and schedule change payment details not updating properly fwd BUG#32998230
  **Search String      : BUG#33068478 

  **Changed By         : Satheesh Seshan
  **Date               : 12-Jul-2021
  **Change Description : Added Code to enable Interest Details Button in rollover tab
  **Search String      : OBCL_14.5_RFR_ROLLOVER_33105279  

  **Changed By         : Abhinav Kumar
  **Date               : 02-Aug-2021
  **Change Description : Code Change to Handle Schedule Upload with Multipage record/more than 15 record without clicking Default Button
  **Search String      : OBCL_14.5_Support_Bug#33165328  
  
  **Changed By         : Mohan Pal
  **Date               : 29-Jul-2021
  **Change Description : Audit Trial Population on SAVE for RFR
  **Search String      : Bug#33188129
  
  **Changed By         : Sudharshini Balaji
  **Date               : 18-Oct-2021
  **Change Description : Commented duplicate PostLoad_KERNEL function
  **Search String      : OBCL_14.5_Oct21   
    
  **Changed By         : Divya J
  **Date               : 11-Oct-2021
  **Change Description : Auto LOV population from Linkages Tab
  **Search String      : OBCL_14.3_Support_Bug#33435663
     
  **Changed By         : Abhinav Bhasker
  **Date               : 28-Oct-2021
  **Change Description : Projection for Future Dated Contracts
  **Search String      : Bug#33300194

  **Changed By         : Mohan Pal
  **Date               : 14-Feb-2022
  **Change Description : Validation removed if No of rows more that one for Principal component
  **Search String      : Bug#33850802 
  
  **Changed By         : Abhinav Kumar
  **Date               : 02-Mar-2022
  **Change Description : OLDTRONL: ON ACTION NEW, JS CALL IS NOT GOING TO OLDTRONL_CUSTOM.JS
  **Search String      : Bug#33914596  

  **Changed By         : Abhinav Kumar
  **Date               : 07-Mar-2022
  **Change Description : OLDTRONL- REDEF Button is not enabled when unlock done immediately for new contract with Auto Auth User
  **Search String      : Bug#33925546

  **Changed By         : Chandra Achuta
  **Date               : 13-APR-2022
  **Change Description : Added code for displaying the error message if RAD dependency fields are changed
  **Search String      : Bug#33989949  
  
  **Changed By         : Abhinav Kumar
  **Date               : 07-May-2022
  **Change Description : OLDTRONL- On click of Pricipal Distribution button -- Only Principal ~ Payment type Schedule should get Distributed.
  **Search String      : Bug#34134835 Change

  **Changed By         : Satheesh Seshan
  **Date               : 07-Jul-2022
  **Change Description : Assign value as NULL on click of NEW to commitment type revolv/non revolv radio button.
  **Search String      : Bug#33805053

  **Changed By         : Balaji Gopal
  **Changed On         : 21-Jul-2022
  **Search String      : BUG#34300314 Changes
  **Change Reason      : OL/LB SCREEN - OVERWRITE DEFAULT SSI CALLFORM NEED TO REMOVE
  
  **Changed By         : Abhinav Kumar
  **Date               : 20-Feb-2023
  **Change Description : OLDOVDEF- On click -> Contract Details, users unable to fetch contract Details from Multilevel Authorization screen
  **Search String      : Bug#35093822
  
   **Changed By         : Rashmi B V
   **Date               : 02-APR-2023
   **Change Description : User is not able to select Reverse Reason and Reverse action is failing with Response Empty Error
   **Search String      : Redwood_changes_1
   
  **Changed By         : Akhila Samson
  **Date               : 02-Apr-2024
  **Change Description : Add the condition to set the value of the status, revolving, and amortized type radio buttons to null for the New action if the values are not null.
  **Search String      : Bug#36464951
  
    **Changed By         : Kavitha Asokan
  **Date               : 08-MAY-2024 
  **Change Description : OLDTRONL- Unlock – Redefinition button in schedules tab is getting disabled. 
  **Search String      : Bug#36596453
  
    **Changed By         : Kavitha Asokan
  **Date               : 06-Jun-2024
  **Change Description : During CAMD distirubute principal is failing in redwood environment. Reverting the redwood changes as amount field is populating as NUMBER field without commas (,)
  **Search String      : Bug#36697755_Fix_2
  
  **Changed By         : Vineeth T M
   **Date               : 30-Jul-2024
   **Change Description : OBCL_14.8_VER_ROL Changes
   **Search String      : OBCL_14.8_VER_ROL Changes

  **Changed By         : Balaji Gopal
  **Date               : 26-Dec-2024
  **Change Description : Distribute Principal is Enabled when contract is unauthorized
  **Search String      : Bug#37392330

  **Changed By         : Ashokkumar Arumugam
  **Date               : 04-Jul-2025
  **Change Description : OBCL_14.3_Schedule_upload
  **Search String      : OBCL_14.3_Schedule_upload
****************************************************************************************************************************/
var gPrevAction;
var gEnableButton = false;
var gDisabledefschButton= false;
var gDisablerdfschButton= false;
var gDisableschblock= false;
var gSubSysStat ;  //BUG#27205142
var totalOutstanding ;//BUG#27618524
var dsbrOutstanding ;//OBCL_14.3_OBCL_14.3_DSBR Changes
//OBCL_14.3_Schedule_upload -- starts 
var gDisableBrowseButton = true;
var lclBlockId = "";//block id to upload the CSV file
var currPg = 1;//current page of the block
var totPg = 1;//total page of the block
var pgSize = 0;//page size to dispaly the datas
var totRow = 0;//total rows of the block
var length = 0;//current length of the block
var fileUploadBtn = "";//file upload object
var errCode = "";//error code
var errParam = "";//error param
var csvRows = "";//rows parser object
var gIsValid = true;
var valid = true;
var negativeNum = false;
var redif_flag=false;
//OBCL_14.3_Schedule_upload -- End
//OBCL_14.5_Reversal_Reason_Capture starts
function fnPreReverse_KERNEL(){
	if (document.getElementById('BLK_OLTBS_CONTRACT__PMT_MSG_GEN_FLAG').value=='Y'){
		//Redwood_changes_1 starts
		var alertWinObj = document.getElementById("Div_AlertWin");
        if(alertWinObj == null) {
            alertWinObj = parent.document.getElementById("Div_AlertWin");
        }
		alertWinObj.style.zIndex="0";
		//Redwood_changes_1 ends
	fnSubScreenMain('OLDTRONL','OLDTRONL','CVS_REVERSE');
	}
	return true;
}
function fnPreExit_CVS_REVERSE_KERNEL()
{
	parent.gAction = "";
	return true;
}
//OBCL_14.5_Reversal_Reason_Capture ends
//OBCL_14.4_Rollover_tab_reset_#32636886 starts
function fnResetTabs()
{ 
	enableTabs("TAB_ROLLOVER", "~");
			fnEnableScreenElement("TAB_ROLLOVER__SEC_ROLLOVER");
			//Bug#33914596 Starts  Commented below code
			//fnEnsableScreenElement("TAB_ROLLOVER__SEC_ROLLPREF");
			//fnEnsableScreenElement("TAB_ROLLOVER__SEC_INTERESTBASIS");
			fnEnableScreenElement("TAB_ROLLOVER__SEC_ROLLPREF");
			fnEnableScreenElement("TAB_ROLLOVER__SEC_INTERESTBASIS");			
			//Bug#33914596 Ends
}
//OBCL_14.4_Rollover_tab_reset_#32636886 Ends
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
	//29028579 Changes starts
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
		fnDisableSubSysButtons(document.getElementById("LBCBADTL")); //REDWOOD_CHANGES
	}
	//29028579 Changes ends
	//OBCL_14.4_FLRCLG Changes Starts
	if (document.getElementById("BLK_OLTBS_CONTRACT__PRODTYPE").value != 'C') {
		fnDisableSubSysButtons(document.getElementById("OLCFLRCL"));  //REDWOOD_CHANGES
	}
	//OBCL_14.4_FLRCLG Changes Ends
	//OBCL_14.5_Hist_int Changes Starts
	if (gAction == 'NEW') {
		fnDisableSubSysButtons(document.getElementById("OLDINHST"));  //REDWOOD_CHANGES
	}
	//OBCL_14.5_Hist_int Changes Ends
	
	//OBCL_14.5_Repayment_Details Changes Starts
	if (document.getElementById("BLK_OLTBS_CONTRACT__PRODTYPE").value != 'C') {
		fnDisableSubSysButtons(document.getElementById("OLDREPMT"));  //REDWOOD_CHANGES
	}
	//OBCL_14.5_Repayment_Details Changes Ends
	
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
		//Bug#27463555  changes starts
	if (document.getElementById("BLK_OLTBS_CONTRACT__REDEFCLICKED").value == 'N' && g_prev_gAction == 'MODIFY'){
		fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",false);
	}
	//Bug#27463555  changes ends
 gAction = g_prev_gAction;
 if (gAction == 'NEW' || gAction == 'MODIFY' ){  //  gAction == 'MODIFY' added BUG#33068478
		fnClassDefault('BLK_OLTBS_CONTRACT'); // master block
	}
	}
fnSubScreenMain('OLDTRONL', 'OLDTRONL', 'CVS_SCHEDULE_DETAILS', false);
 return true; 
}
//OBCL_14.4_DSBR_SplitSettlementAmount starts
function fn_dsbrsplitdetails() {
	if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_NEW' || gAction == 'SUBSYSPKP_MODIFY')
	{
		g_prev_gAction = gAction;
		document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
		gAction = 'DSBRSPLSCH';
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
	fnSubScreenMain('OLDTRONL', 'OLDTRONL', 'CVS_DSBR_SPLIT_STTL', false);
 	return true; 
}
function fnPostLoad_CVS_DSBR_SPLIT_STTL_KERNEL(){
	getElementsByOjName('cmdAddRow_BLK_OLVWS_CONT_DSBR_SCH')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_OLVWS_CONT_DSBR_SCH')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdAddRow_BLK_OLVWS_CONT_DSBR_SPL_DTLS')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_OLVWS_CONT_DSBR_SPL_DTLS')[0].style.visibility = 'hidden';
	return true;
}
//OBCL_14.4_DSBR_SplitSettlementAmount ends
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDTRAUT';
    authUixml = 'OLDTRAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDTRAUT'] = "KERNEL";
    ArrPrntFunc['OLDTRAUT'] = "";
    ArrPrntOrigin['OLDTRAUT'] = "";
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
//Bug#33188129 starts
function fnPostSave_KERNEL(){
	debugs("In fnPostSave", "A");
    gAction = "EXECUTEQUERY";
	
    fnPostExecuteQuery_KERNEL(); //Redwood_changes_1
    //fnExecuteQuery();
	
	return true;
}
//Bug#33188129 ends
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTREFNO').value;    
    return true;
}

function fnPostExecuteQuery_KERNEL() {
	gEnableButton = true;
	expandcontent('TAB_MAIN');
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV")); //OFCL_12.3.0.0.0_25039084 changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT")); //OFCL_12.3.0.0.0_25039084 changes
	//29028579 Changes starts
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
		fnDisableSubSysButtons(document.getElementById("LBCBADTL"));  //REDWOOD_CHANGES
	}
	//29028579 Changes ends
	//OBCL_14.5_Repayment_Details Changes Starts
	if (document.getElementById("BLK_OLTBS_CONTRACT__PRODTYPE").value != 'C') {
		fnDisableSubSysButtons(document.getElementById("OLDREPMT"));  //REDWOOD_CHANGES
	}
	//OBCL_14.5_Repayment_Details Changes Ends
	//fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes //commented as part of Bug#32136677
    DisableTxnBtn(); //OBCL_14.4_PM_ReversalviaService

	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_ROLLOVER__BTNROLLINTDETAILS")); //OBCL_14.5_RFR_ROLLOVER_33105279
    //OBCL_14.8_VER_ROL Changes start
    var rollMech = getNodeText(selectSingleNode(dbDataDOM, "//BLK_OLTBS_CONTRACT_MASTER/ROLLMECH"));
    if(rollMech == "V"){
        DisableToolbar_buttons("Rollover");
    }
    //OBCL_14.8_VER_ROL Changes end
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
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DSBR_SCH"));//OBCL_14.3_OBCL_14.3_DSBR Changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DSBR_SPLIT"));//OBCL_14.4_DSBR_SplitSettlementAmount
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EQUIV_PRIN")); //OBCL_125_SUPP_26517132 //OBCL_123_SUPP_26952771 //BUG#28351681

    //Bug#37392330 Starts Here
	if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'N'){
       fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EQUIV_PRIN"));		
	}
    //Bug#37392330 Ends Here
	
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
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo; //BUG#27272107
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;//BUG#27272107		
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
//BUG#30003626  changes starts
/*
//BUG#27205142 starts
function fnPreUnlock_KERNEL() {
 if (getElementsByOjName('SUBSYSSTAT') && getElementsByOjName('SUBSYSSTAT').length != 0) {
    var contStat = getElementsByOjName("TXNSTAT")[0].value;
    var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
    if (contStat == 'H') {
     // var reg = new RegExp(':D', "g");
    //  statusStr = statusStr.replace(reg, ":U");
      gSubSysStat =  getElementsByOjName('SUBSYSSTAT')[0].value ; 
	//   fnPopulateSubSystemValues(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value);
    }

  }
return true ;
}

//BUG#27205142 ends
*/
//BUG#30003626  changes ends
function fnPostUnlock_KERNEL() {
	setTimeout( function () {  //Bug#36596453 changes
	if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
	{
     gDisabledefschButton = true; 
     gDisableschblock = true;	 
	 gDisablerdfschButton = false; //BUG#33925546 changes //Redefine Button getting disable for AutoAuth User on unlock immediately after Save-Auth.
    
	if ((document.getElementById("BLK_OLTBS_CONTRACT_MASTER__PAYMETHOD").value == 'D' || document.getElementById("BLK_OLTBS_CONTRACT_MASTER__PAYMETHOD").value == 'T') && (!document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__DISCOUNTED_SCH").value)) //OBCL_14.3_OL_Discounted_Schedules CHANGES
	{	
	gDisablerdfschButton = true;
	}
	//document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;';--OBCL_14.2_RETRO_#29057705 Changes
	/*document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S';//OBCL_14.2_RETRO_#29057705 Changes*/
	//document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S;LBCBADTL:S;OLCRORES:D;';//OBCL_14.2_Supp_BA_#29020354 Changes
    document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S;LBCBADTL:S;OLCRORES:D;';//OBCL_14.2_Supp_BA_#29020354 Changes -- BUG#34300314 removal Overwrite Default SI
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
fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EQUIV_PRIN")); //BUG#28351681	
	//fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes	//commented as part of Bug#32136677
	//OBCL_14.3_OBCL_14.3_DSBR Changes Starts
	if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'N'){
		var amt=0;
	    document.getElementById("BLK_OLTBS_CONTRACT_MASTER__AMOUNT").value=	amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value)));
		for(var idx=0; idx<len; idx++){
			if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
				&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value != 'P')){
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[1].value = amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value)));
				}		
		}
	}	
	//OBCL_14.3_OBCL_14.3_DSBR Changes Ends
 },100); //Bug#36596453 changes 
	return true;
}

function Fn_redefineschedule(){
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD"));
	//gDisableBrowseButton=false;
	//redif_flag=true;
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
 fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EQUIV_PRIN")); //BUG#28351681
 gDisableschblock = false;
  //OBCL 14.0 27461834 BUG#27157960  starts
 try {
 document.getElementById("BLK_OLTBS_CONTRACT__REDEFCLICKED").value = 'Y';
 }catch(e) {}
 //OBCL 14.0 27461834 BUG#27157960  ends
 
 return true; 
}
function fnPostNew_KERNEL() {
	gDisablerdfschButton = true;
	//Bug#33805053 start
	if (document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__STATCONT") != null || document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__STATCONT2") != null ){ //Bug#36464951
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__STATCONT").value = ""; 
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__STATCONT2").value = "";
	} //Bug#36464951
	if (document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__AMORTTYPE") != null || document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__AMORTTYPE2") != null ){ //Bug#36464951
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__AMORTTYPE").value = ""; 
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__AMORTTYPE2").value = ""; 
	}//Bug#36464951
	if (document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMIT") != null || document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMIT2") != null ){ //Bug#36464951
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMIT").value = ""; 
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMIT2").value = ""; 
	}//Bug#36464951
	//Bug#33805053 End
	
	document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE").focus(); //OBCL_14.3_Support_Bug#31016539
expandcontent('TAB_MAIN');
    //fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes //commented as part of Bug#32136677
	//fnResetTabs();//OBCL_14.4_Rollover_tab_reset_#32636886 //OBCL_14.8_VER_ROL Changes 
	return true;
}
function fnPostCopy_KERNEL(){
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE"));
	fnPopulateSubSystemValues(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value); //Bug#27461830
	fnDisableSubSysButtons(document.getElementById("OLDINHST"));//OBCL_14.5_Hist_int Changes  //REDWOOD_CHANGES
	//29028579 Changes starts
	if (document.getElementById("BLK_OLTBS_CONTRACT_MASTER__UI_BANKER_ACCPETANCE").value!='Y') {
		fnDisableSubSysButtons(document.getElementById("LBCBADTL")); //REDWOOD_CHANGES
	}
	//29028579 Changes ends
	//OBCL_14.5_Repayment_Details Changes Starts
	if (document.getElementById("BLK_OLTBS_CONTRACT__PRODTYPE").value != 'C') {
		fnDisableSubSysButtons(document.getElementById("OLDREPMT"));  //REDWOOD_CHANGES
	}
	//OBCL_14.5_Repayment_Details Changes Ends
	//fnEnableDisableMessagePreviewSubsys(); //OBCL_14.2.0.0.0_Message_Preview_Changes //commented as part of Bug#32136677
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
		    //OBCL_14.8_VER_ROL start commented below			
			//disableTabs("TAB_ROLLOVER", "~");
			//fnDisableScreenElement("TAB_ROLLOVER__SEC_ROLLOVER");
			//fnDisableScreenElement("TAB_ROLLOVER__SEC_ROLLPREF");
			//fnDisableScreenElement("TAB_ROLLOVER__SEC_INTERESTBASIS");
	        //OBCL_14.8_VER_ROL end 
		   }		   
	   }	
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_ROLLOVER__BTNROLLINTDETAILS")); //OBCL_14.5_RFR_ROLLOVER_33105279 
	}
return true;	
}

//OBCL12.5-26634495 changes starts
function fnPostLoad_KERNEL() {
    //ChatBot Integration start
    if (mainWin.chatBotArray && mainWin.chatBotArray.frmChatBot == "Y") {
      try {
        if (mainWin.chatBotArray.respVal) {
          if (
            mainWin.chatBotArray.respVal.split("~")[1].trim().toLowerCase() ===
            "query"
          ) {
            fnEnterQuery();
            document.getElementById(
              "BLK_OLTBS_CONTRACT__CONTREFNO"
            ).value = mainWin.chatBotArray.respVal
              .split("~")[0]
              .trim()
              .toUpperCase();
            gAction = "EXECUTEQUERY";
            fnExecuteQuery();
          } else if (
            mainWin.chatBotArray.respVal.split("~")[1].trim().toLowerCase() ===
            "copy"
          ) {
            fnEnterQuery();
            document.getElementById(
              "BLK_OLTBS_CONTRACT__CONTREFNO"
            ).value = mainWin.chatBotArray.respVal
              .split("~")[0]
              .trim()
              .toUpperCase();
            gAction = "EXECUTEQUERY";
            fnExecuteQuery();
            document.getElementById("Copy").getElementsByTagName("a")[0].click();
          }
        }
      } finally {
        mainWin.chatBotArray.frmChatBot == "";
      }
    } else {
      //ChatBot Integration end
      try {
        //BUG#27301958
        var parentWin = fnGetParentWin();
        if (parentWin != "") {
          if (parentWin.parentWinParams.CALLFORM == "LOANDET") {
            if (parentWin.parentWinParams.PARENT_FUNC_ID == "STDCUSVW") {
              fnEnterQuery();
              document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value =
                parentWin.parentWinParams.ACCOUNT_NUMBER;
              gAction = "EXECUTEQUERY";
              fnExecuteQuery();
	    //OBCL_14.4_360CorporateCustomerView starts
            }  else if  (parentWin.parentWinParams.PARENT_FUNC_ID == "OLDCRPVW") {
              fnEnterQuery();
              document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value =
                parentWin.parentWinParams.CONTRACT_REF_NO;
              //alert(document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value);
              gAction = "EXECUTEQUERY";
              fnExecuteQuery();
             //OBCL_14.4_360CorporateCustomerView ends
            }
          } else if (parentWin.parentWinParams.CALLFORM == "COMMDET") {
            if (parentWin.parentWinParams.PARENT_FUNC_ID == "STDCUSVW") {
              fnEnterQuery();
              document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value =
                parentWin.parentWinParams.ACCOUNT_NUMBER;
              gAction = "EXECUTEQUERY";
              fnExecuteQuery();
            //OBCL_14.4_360CorporateCustomerView starts
            }  else if  (parentWin.parentWinParams.PARENT_FUNC_ID == "OLDCRPVW") {
              fnEnterQuery();
              document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value =
                parentWin.parentWinParams.CONTRACT_REF_NO;
              //alert(document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value);
              gAction = "EXECUTEQUERY";
              fnExecuteQuery();
	    //OBCL_14.4_360CorporateCustomerView ends
            }
          } //OBCL_14.3_DIary_event
          if (parentWin.parentWinParams.PARENT_FUNC_ID == "OLDDRYET") {
            fnEnterQuery();
            document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value =
              parentWin.parentWinParams.CONTRACT_REF_NO;
            gAction = "EXECUTEQUERY";
            fnExecuteQuery();
          }
		  //Bug#35093822 Changes Starts //To populate contract data from OLDOVDEF Screen
		  if (parentWin.parentWinParams.PARENT_FUNC_ID == "OLDOVDEF") {
			var g_prv_actn = gAction;
			gAction = "ENTERQUERY";	
			fnEnterQuery();
			document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
			gAction= "EXECUTEQUERY";
			fnExecuteQuery();
			showToolbar('', '', '', '');
			gAction = g_prv_actn;
		  }
		//Bug#35093822 Changes Ends
        }
      } catch (e) {} //BUG#27301958
	  try{   //Bug#35093822 Added try
      //BUG#27301958 starts
      if (parent.screenArgs['PARENT_FUNC_ID'] == "ACDTRNQY") {
        fnEnterQuery();
        document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value =
          parent.screenArgs["CONTREF"];
        gAction = "EXECUTEQUERY";
        fnExecuteQuery();
      }
	  } catch (e) {}  //Bug#35093822 Added try catch to handle  any failure will not break and code will process further
      //BUG#27301958 ends
	  //Bug#35093822  Changes Starts --Commented Below code and moved above within ELSE block
      //BUG#29608519	Changes	start
      /*if (parentWin.parentWinParams.PARENT_FUNC_ID == "OLDOVDEF") {
        fnEnterQuery();
        document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value =
          parentWin.parentWinParams.CONTRACT_REF_NO;
        gAction = "EXECUTEQUERY";
        fnExecuteQuery();
      }*/
      //BUG#29608519	Changes	ends
	  //Bug#35093822 Changes Ends
	  DisableTxnBtn();//OBCL_14.4_PM_ReversalviaService
      return true;
    }
  }
  //OBCL12.5-26634495 changes ends  

// OBCL_125_SUPP_26517132 start
function fn_recalc_unit()
{
	if (gAction == 'NEW' || gAction == 'MODIFY')
	{
		var len = getTableObjForBlock('BLK_OLTBS_CONTRACT_SCHEDULES').tBodies[0].rows.length;
		//var out_amt = document.getElementById('BLK_OLTBS_CONTRACT__TXT_OUT_BAL').value; //Bug#28351681 
		//BUG#29828479 Starts
			try {
			for(var idx=0; idx<len; idx++) {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-select-single")[0].value== 'M')
				{					
						g_prev_gAction = gAction;
						document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
						gAction = 'DISPR';
				}
			}
			}
			catch(e){}
			try {
			var lenpaid = getTableObjForBlock('BLK_OLTBS_CONTRACT_SCHEDULES_PAID').tBodies[0].rows.length;
			for(var idx=0; idx<lenpaid; idx++) {
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES_PAID").tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-select-single")[0].value== 'M')
				{					
						g_prev_gAction = gAction;
						document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
						gAction = 'DISPR';
				}
			}
			}
			catch(e){}
			try {
			if (gAction == 'DISPR')	
				{	
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
			catch(e){}
		//BUG#29828479 Ends
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
		//REDWOOD_CHANGES starts
		//Bug#36697755_Fix_2 changes starts ---> reverting the changes 
        //out_amt = replaceAllChar(out_amt, ',', '');
		//iof_amt = replaceAllChar(iof_amt, ',', '');
		//mora_amt = replaceAllChar(mora_amt, ',', '');
		//Bug#36697755_Fix_2 changes ends 
		//REDWOOD_CHANGES ENDS
		out_amt = Number(out_amt) + Number(iof_amt) + Number(mora_amt); //OBCL_14.3_IOF changes

		for(var idx=0; idx<len; idx++) {
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
			{
				
				if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value != 'B') 
					&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value != 'L'))//OBCL_14.3_OBCL_14.3_DSBR Changes
					{
					freqCount++ ;
					//Bug#33850802 starts
					/*
					if (freqCount > 1 ) {
						//showAlerts(fnBuildAlertXML("OL-2999","E"),"E"); //Commented for BUG#26952771
						showAlerts(fnBuildAlertXML("OL-2999","E","Only 1 frequency option apart from bullet is allowed for Principal Component"),"E"); //Added for BUG#26952771
						return false ;
					}
					*/
					//Bug#33850802 ends
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
				//&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value != 'L'))//OBCL_14.3_OBCL_14.3_DSBR Changes  //Bug#34134835 Change
				&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value == 'P'))//Bug#34134835 Change
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
				
				if (net_amt < 0 || isNaN(net_amt) ) 
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
				//&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value != 'L'))//OBCL_14.3_OBCL_14.3_DSBR Changes  //Bug#34134835 Change
			    && (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value == 'P'))//Bug#34134835 Change
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
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value)));
				}
				//   OFCL_12.3.0.0.0_26965953 ends				
				try
				{
					//getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value; //Commented for BUG#26952771
				    
					//BUG#26952771 Starts
					 var mb3Amount = new MB3Amount(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value, true, document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value);
          	        //getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[1].value = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[7].getElementsByTagName("oj-input-text")[0].value;
			        getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[1].value =  mb3Amount.getDisplayAmount() ;
				    //BUG#26952771 Ends
				
				}				
				catch(e){}
			}   
	}
	return true; 
}
// OBCL_125_SUPP_26517132 end
//OBCL_14.3_OBCL_14.3_DSBR Changes Starts
function fn_Distribute_Dsbr(){
	if (gAction == 'NEW' || gAction == 'MODIFY')
	var len = getTableObjForBlock('BLK_OLTBS_CONTRACT_SCHEDULES').tBodies[0].rows.length;
	var out_amt = document.getElementById('BLK_OLTBS_CONTRACT_MASTER__AMOUNT').value; 
	var total_no = 0;
	var net_amt = 0;
	var temp_amt = 0;
	dsbrOutstanding =0;	
	try{
		evaluatetotalamout1('BLK_OLTBS_CONTRACT_SCHEDULES_PAID');
	}catch(e){
			dsbrOutstanding = 0; 
	}
	for(var idx=0; idx<len; idx++){
		if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
				&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value == 'L'))
				total_no += parseInt(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value);
	}		
	try{
		if (total_no <= 0 || isNaN(total_no)){
				return true;
			}
		temp_amt = dsbrOutstanding/total_no ;
		net_amt = temp_amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value)));
		if (net_amt <= 0 || isNaN(net_amt) ){
			return true;
		}
	}
	catch(e){
		return true;
	}
	for(var idx=0; idx<len; idx++){
		if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
			&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value == 'L')){
			if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[6].getElementsByTagName("oj-select-single")[0].value != 'B'){ 
				if(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0].value != '0' )
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = net_amt;
				else
					getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = 0; //BUG#27461832
			}
			else{
				var count = total_no -1 ; 
				var amt = 0 ;
				amt = out_amt-(net_amt*count);
				getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value = amt.toFixed(parseInt(getNumDigitsAfterDecimal( document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value)));
			}
			try{	 
				var mb3Amount = new MB3Amount(getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value, true, document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value);
          	    getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[1].value =  mb3Amount.getDisplayAmount() ;
			}				
			catch(e){}
		}  
	}
//Bug#32897832 STARTS

if (dsbrOutstanding != (total_no*net_amt)) {
	showErrorAlerts("OL-C0596", "I", "Schedules");

g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'DISTDSBR';
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

//Bug#32897832 ENDS	
	return true;
}
function fn_ViewDsbrSch(){
	screenArgs = new Array(); 
	screenArgs['CONTREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTREFNO').value;
	screenArgs['ACTION'] = 'LAUNCHDSBVW';
	screenArgs['FUNCTION_ID'] 	= 'OLDDSBVW';
	screenArgs['PARENT_FUNC_ID']= 'OLDTRONL';
	screenArgs['SCREEN_NAME'] = 'CVS_DSBVW';
    screenArgs['UI_XML'] = 'CVS_DSBVW';
	funcid = 'OLDDSBVW';	
	parent.screenArgs = screenArgs;
	mainWin.dispHref1("OLDDSBVW", parent.seqNo);
	return true;
}	
//OBCL_14.3_OBCL_14.3_DSBR Changes Ends
//OBCL_14.0.0.0.0_UnlockValidation Changes start
function fnPreUnlock_KERNEL(){
	var pList = ['LDREVC', 'LDBOOK', 'LDCAMD','LDINIT', 'LDROLL', 'LSPMNT', 'LDRAMD'];
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
		else if(PCode == 'OLFEE')
		{
			UnauthFunctionId ='LFDACFIN';
		}
		else if(PCode == 'LDMSC')
		{
			UnauthFunctionId ='OLDMSCDT';
		}
		//OBCL_14.3_DSBR_#29628464 Changes Starts
		else if  (ProcessCode =='DSBR') 
		{
			UnauthFunctionId ='OLDMNDSB';
		}
		//OBCL_14.3_DSBR_#29628464 Changes Ends
        else 
		{
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
            }
		}
		
		//Bug#30003626  changes starts
		if (getElementsByOjName('SUBSYSSTAT') && getElementsByOjName('SUBSYSSTAT').length != 0) {
		var contStat = getElementsByOjName("TXNSTAT")[0].value;
		var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
		if (contStat == 'H') {     
		  gSubSysStat =  getElementsByOjName('SUBSYSSTAT')[0].value ; 	
		}
		}
		//Bug#30003626  changes ends
		//OBCL_14.4_SUPPORT_BUG#31452933 start
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERID").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERDTSTI").value = ""; //Bug#34958820
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERID").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERDTSTI").value = ""; //Bug#34958820
	    //OBCL_14.4_SUPPORT_BUG#31452933 end
		return true;
}
//OBCL_14.0.0.0.0_UnlockValidation Changes end

//BUG#27618524 starts
function addlargefloatsigned(x,y){
	//This function any two decimal numbers which maybe positive or negative
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
	 amount = rowList[rowIndex].cells[8].getElementsByTagName("oj-input-text")[0].value;
         units = rowList[rowIndex].cells[7].getElementsByTagName("oj-input-text")[1].value;
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

function evaluatetotalamout1(blkname) {
	var totalamt = 0;
	var dsbrtotalamt = 0;
    var amount;
    var units;
	var numSDP  ;
	var dsbrschedulecounter = 0; //Bug#33300194
	var dsbrscheduledate; //Bug#33300194
	numSDP = getNumDigitsAfterDecimal(document.getElementById('BLK_OLTBS_CONTRACT_MASTER__CCY').value);
	var schedulesPaid = selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID");
	if (schedulesPaid!= null && schedulesPaid.length > 0 && gAction != 'NEW') {
		for (var i = 0;i < schedulesPaid.length;i++) {
			if ((getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/COMPONENT")[i]) == "PRINCIPAL") && 
				(getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/SCHEDULE_TYPE")[i]) != "L")){//OBCL_14.3_OBCL_14.3_DSBR Changes
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
			//OBCL_14.3_OBCL_14.3_DSBR Changes Starts
			else if ((getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/COMPONENT")[i]) == "PRINCIPAL") && 
				(getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/SCHEDULE_TYPE")[i]) == "L")){
				amount =getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/AMOUNT")[i]);
				units =getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_SCHEDULES_PAID/NO_OF_SCHEDULES")[i]);
				if (units == 0 || units == "") 
					continue;
				else if (getdigits(amount)>12 || getdigits(dsbrtotalamt)>12)
					dsbrtotalamt = addlargefloatsigned(dsbrtotalamt,amount);
				else {
					dsbrtotalamt = (Number(dsbrtotalamt) * Number(1000)) + (Number(amount) *Number(units) * Number(1000));    
		            dsbrtotalamt = dsbrtotalamt / 1000;
					dsbrtotalamt = dsbrtotalamt.toFixed(parseInt(numSDP)); 
				}

			}
			//OBCL_14.3_OBCL_14.3_DSBR Changes Ends			
		}
	totalOutstanding = Number(document.getElementById('BLK_OLTBS_CONTRACT_MASTER__AMOUNT').value) - Number(totalamt) ; 
	totalOutstanding = totalOutstanding.toFixed(parseInt(numSDP)); 
	}
	//OBCL_14.3_DSBR_#29518026 Changes Starts
	else{
			var len = getTableObjForBlock('BLK_OLTBS_CONTRACT_SCHEDULES').tBodies[0].rows.length;
			for(var idx=0; idx<len; idx++){
				if((getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value=='PRINCIPAL')
					&& (getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-select-single")[0].value == 'L')
					&& (document.getElementById('BLK_OLTBS_CONTRACT_MASTER__VALDT').value == getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-date")[0].value)
					&& (gAction == 'NEW' || gAction == 'MODIFY')) //gAction == 'MODIFY' added w.r.t. Bug#33300194 CAMD
					{
						//if (document.getElementById('BLK_OLTBS_CONTRACT_MASTER__VALDT').value <= mainWin.AppDate)		//Commented w.r.t. Bug#33300194	
							if  (dsbrschedulecounter == 0) {
								dsbrschedulecounter = 1;
								dsbrscheduledate = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-date")[0].value;
							totalamt = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value;
							}
							else if (dsbrscheduledate > getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-date")[0].value){
								dsbrscheduledate = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-date")[0].value;
								//Bug#33300194 End
								totalamt = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows[idx].cells[8].getElementsByTagName("oj-input-text")[0].value;
							}
						//else //Commented w.r.t. Bug#33300194	
						//	totalamt = 0; //Commented w.r.t. Bug#33300194
					}
		}	
		//REDWOOD_CHANGES
		//totalOutstanding = Number(totalamt) ; 
        totalOutstanding = replaceAllChar(totalamt, ',', '');	
		//totalOutstanding = totalamt; 
		//totalOutstanding = totalOutstanding.toFixed(parseInt(numSDP)); 
		//REDWOOD_CHANGES
	}
	//OBCL_14.3_DSBR_#29518026 Changes ends
	//OBCL_14.3_OBCL_14.3_DSBR Changes Starts
	dsbrOutstanding = Number(document.getElementById('BLK_OLTBS_CONTRACT_MASTER__AMTFIN').value) - Number(dsbrtotalamt) ; 
	dsbrOutstanding = dsbrOutstanding.toFixed(parseInt(numSDP)); 
	
	//OBCL_14.3_OBCL_14.3_DSBR Changes Ends
	return true ;
}

function getdigits(num){
	num=num.toString();
	var digits=num.indexOf(gDecimalSymbol);
	if (digits==-1) digits=num.length;
	return digits;
}
//BUG#27618524 ends
/* Removed Enable Disable Message_Preview Subsystem Changes :: Starts */ 
/* //OBCL_14.2.0.0.0_Message_Preview_Changes_Starts
function fnEnableDisableMessagePreviewSubsys() {
    var processList = ['LDREVC', 'LDBOOK', 'LDCAMD', 'LDINIT', 'LDROLL', 'LSPMNT', 'LDRAMD'];
    var validCheck = false;
	var unauthFunctionId;
    var pCode = document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value;
    for (var i = 0; i < processList.length; i++) {
        if (pCode == processList[i] && validCheck == false) {
            validCheck = true;
			unauthFunctionId = 'OLDTRONL';
        }
    }
    if (!validCheck) {
        var processCode = pCode.substring(pCode.length - 4);
        if (processCode == 'REVP' || processCode == 'PMNT') {
            unauthFunctionId = 'OLDPMNT';
        } else if (processCode == 'AMND') {
            unauthFunctionId = 'OLDVAMND';
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
				if (pCode != "" && unauthFunctionId != 'OLDTRONL') {
					fnDisableSubSysButtons(messagPreviewLink);
				} else if (pCode == "") {
					fnDisableSubSysButtons(messagPreviewLink);
				}
				else {
					fnEnableSubSysButtons(messagPreviewLink);
				}
			}
		}        
    }
    return true;
}
//OBCL_14.2.0.0.0_Message_Preview_Changes_Ends */
/* Removed Enable Disable Message_Preview Subsystem Changes :: Ends */

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

//OBCL_14.3.0.0.0_RolloverChanges starts
function fnPreRollover_KERNEL(){
	//document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCSTDET:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S;LBCBADTL:S;OLCRORES:D;';
	document.getElementById("BLK_OLTBS_CONTRACT_MASTER__SUBSYSSTAT").value='LFCINTCH:D;LFCTRCHG:D;TXCTRTAX:D;OLCONDET:D;DEFSCH:D;EXPSCH:D;LFCFEECF:D;LFCFRMNT:D;OLCTRUDF:D;OLCTRMIS:D;OLCTRADV:D;OLCTRENT:D;OLCINTRT:D;OLCFLRCL:D;OLCCONRL:D;OLCONBRW:D;RDFSCH:D;OLCSPROL:S;LBCBADTL:S;OLCRORES:D;'; // BUG#34300314 removal Overwrite Default SI
	return true;
}
//OBCL_14.3.0.0.0_RolloverChanges ends

/* BUG#30239017 :: STARTS */
function fnPostEnterQuery_KERNEL() {
	expandcontent('TAB_MAIN');
	//fnResetTabs();//OBCL_14.4_Rollover_tab_reset_#32636886 //Bug#OBCL_14.8_VER_ROL end 
	return true;
}
/* BUG#30239017 :: ENDS */
//OBCL_14.4_FLRCLG Changes Starts  
function fnPostFocus_KERNEL() {	
	var prdType = document.getElementById("BLK_OLTBS_CONTRACT__PRODTYPE").value;
	if ((prdType == 'L') && (prdType != "")
    && (functionId != 'OLDRLOVR')) //OBCL_14.8_VER_ROL Changes		
		{
		fnDisableSubSysButtons(document.getElementById("OLCFLRCL"));  //REDWOOD_CHANGES
		/*//OBCL_14.4_RESD Changes Starts
		if (gAction != 'ROLLOVER') 
		{
			fnDisableSubSysButtons(document.getElementById("OLCRORES").children[0]);
		}	
		//OBCL_14.4_RESD Changes Ends*/
		}
		if ((gAction == 'NEW')  && gDisableBrowseButton) 
		{
			fnEnableUploadBtnElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD")); //Bug#34958820 -- check the changes
		}
		else if((gAction=='MODIFY') && (gDisableBrowseButton && redif_flag)) // To Enable shcedule upload btn while click the redefinition
		{
			fnEnableUploadBtnElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD")); //Bug#34958820 check 
			//redif_flag=false;
			//gDisableBrowseButton=false;
		}
		else 
		{
			fnDisableUploadBtnElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD"));//Bug#34958820 check fn change
		}
	
	return true;
}
//OBCL_14.4_FLRCLG Changes Ends  
//OBCL_14.3_Schedule_upload starts 

function fnSchedulesUploadValidation(rows) 
{
    for (var i = 0;i < 2;i++) 
	{
        var cells = rows[i].split(",");
        if (cells.length > 1) 
		{
            if (i == 0) 
			{
                if (cells[0].toUpperCase() != '[Schedule Details]'.toUpperCase()) 
				{
                   // fnResetUpload();
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
            if (i == 1) 
			{
               if 
				(
					(cells[0].toUpperCase() != 'Type'.toUpperCase()) ||
					(cells[1].toUpperCase() != 'Schedule_flag'.toUpperCase()) || 
					(cells[2].toUpperCase() != 'Component'.toUpperCase()) ||   
					(cells[3].toUpperCase() != 'Start_date'.toUpperCase()) || 
					(cells[4].toUpperCase() != 'No'.toUpperCase()) || 
					(cells[5].toUpperCase() != 'Frequency'.toUpperCase()) || 
					(cells[6].toUpperCase() != 'Unit'.toUpperCase()) || 
					(cells[7].toUpperCase() != 'Amount'.toUpperCase()) || 
					(cells[8].toUpperCase() != 'Lcy'.toUpperCase()) || 
					(cells[9].toUpperCase() != 'Reset Tenor'.toUpperCase()) ||
					(cells[10].toUpperCase() !='Month End'.toUpperCase())||
					(cells[11].toUpperCase() !='Capitalize'.toUpperCase())
				)
				{
                    //fnResetUpload();
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
        }
    }
	
    return true;
}

function fnUpdateBlockLength() 
{
    if (lclBlockId != undefined && lclBlockId != '' && lclBlockId != "") 
	{
        //currPg = Number(getInnerText(document.getElementById("CurrPage__" + lclBlockId)));//current page of the block		
        //totPg = Number(getInnerText(document.getElementById("TotPage__" + lclBlockId)));//total page of the block
		
		currPg = Number(getInnerText(document.getElementById("paging_" + lclBlockId + "_nav_input")));//current page of the block
		totPg = getInnerText(document.getElementById("paging_" + lclBlockId + "_nav_input"));//total page of the block
		totPg = Number(totPg.split(' ')[1]);
        if (currPg != totPg) 
		{
            Navigate(N_LAST, lclBlockId);//navigate to last page, if the current page not equal to total page
        }
        pgSize = getPgSize(lclBlockId);//page size to dispaly the datas
        totRow = 0;
        length = getTableObjForBlock(lclBlockId).tBodies[0].rows.length;//current length of the block
        //currPg = Number(getInnerText(document.getElementById("CurrPage__" + lclBlockId)));
		currPg = Number(getInnerText(document.getElementById("paging_" + lclBlockId + "_nav_input")));        if (length > 0 && length != '' && length != "") 
		{
            for (var idx = 0;idx < length;idx++) 
			{
                totRow = (currPg - 1) * pgSize + idx + 1;//total row
            }
        }
    }
    return true;
}

function fnGetHeaderDetails(rows, i, j) 
{
    var cells = rows[i].split(",");
    if (cells.length > 1) 
	{
        if (i == 0) 
		{
            return cells[j];//returns upload CSV header.
        }
        if (i >= 1) 
		{
            return cells[j];//returns current cell header for display
        }
    }
    return null;
}

function fnCheckAnFocusSelectedRow(j) 
{
    getTableObjForBlock(lclBlockId).tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked = false;
    getTableObjForBlock(lclBlockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = true;
    getTableObjForBlock(lclBlockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].click();
    return true;
}

function validateCSVUploadNumber(dispNumField, dispNumFieldValue, currentCellHeader, firstCellValue, firstCellHeader) 
{
    var arrNumComponents = "";
    if (dispNumFieldValue == "") 
	{
        return true;
    }
    if (gDecimalSymbol != ".") 
	{
        arrNumComponents = dispNumFieldValue.match(new RegExp(gDecimalSymbol, 'g'));
    }
    else 
	{
        arrNumComponents = dispNumFieldValue.match(/\./g);
    }
    if (arrNumComponents != null && (arrNumComponents.length > 1)) 
	{
        errCode = 'LB-UPD-023';
        errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    //Changes for formatting number start
    var enteredVal = dispNumFieldValue;//changed
    var replacepattern = "\\" + gDigitGroupingSymbol;
    var pattern = new RegExp(replacepattern, 'g');
    var digitsBfreDecimal = enteredVal.split(gDecimalSymbol)[0].replace(pattern, "");
    if (enteredVal.split(gDecimalSymbol)[1] != undefined) 
	{
        var digitsAftrDecimal = enteredVal.split(gDecimalSymbol)[1].replace(pattern, "");
        enteredVal = digitsBfreDecimal + gDecimalSymbol + digitsAftrDecimal;
    }
    else 
	{
        enteredVal = digitsBfreDecimal;
    }
    //Changes for formatting number end
    if (!checkNumberValidation(enteredVal) || ((enteredVal.indexOf(" ") !=  - 1))) 
	{
        //CHANGED
        errCode = 'LB-UPD-022';
        errParam = dispNumFieldValue + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    var hidNumField = getNextSibling(getNextSibling(dispNumField));
    if (dispNumFieldValue != "") 
	{
        updatedValue = enteredVal;
        //Changes for formatting number start
        if (hidNumField.value != updatedValue) 
		{
            var validateNumberRange = fnValidateCSVUploadNumberRange(hidNumField, dispNumFieldValue, currentCellHeader, firstCellValue, firstCellHeader);
            if (validateNumberRange) 
			{
                return true;
            }
            else 
			{
                return false;
            }

        }
    }
    return true;
}

function fnValidateCSVUploadAmount(idAmount, idCCY, curInpElemValue, currentCellHeader, firstCellValue, firstCellHeader, curInpElem) 
{
    isfromscreen = true;
    var curDataBoundElem;
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV")
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode, idAmount);
    else 
        curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode, idAmount);
    var inpAmount = curInpElemValue;
    var ccy = "";
    var isMEBlock = "";
    var rowNo =  - 1;
    var rowIndex = 0;
    if (idCCY == "")
        ccy = mainWin.Lcy;
    else 
	{
        var singleView = false;
        if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) 
		{
            singleView = true;
        }
        if (curInpElem.parentNode.tagName.toUpperCase() == "DIV") 
		{
            singleView = true;
        }
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) 
		{
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            isMEBlock = isMultipleEntry(blockName);
            if (isMEBlock == 'true' && !singleView) 
			{
                //Block is a multiple entry
                rowNo =  - 1;
                rowIndex = fnSingleCheck(blockName);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                ccy = getElementsByOjName(ccyFieldName)[rowNo].value;
            }
            else 
			{
                if (document.getElementById(blockName + "__" + ccyFieldName)) 
				{
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
            }
        }
        else 
		{
            //Block is not part of the idCCY
            blockName = curInpElem.id.substring(0, curInpElem.id.lastIndexOf("__"));
            isMEBlock = isMultipleEntry(blockName);
            if (isMEBlock == 'true' && !singleView) 
			{
                //Block is a multiple entry
                rowNo =  - 1;
                rowIndex = fnSingleCheck(blockName);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                var tableObj = getTableObjForBlock(blockName);
                if (tableObj) 
				{
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) 
					{
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("oj-input-text");
                        for (var j = 0;j < inputElements.length;++j) 
						{
                            if (inputElements[j].name == idCCY) 
							{
                                ccy = inputElements[j].value;
                                break;
                            }
                        }
                        if (ccy != "")
                            break;
                    }
                }
                if (ccy == "") {
                    if (getElementsByOjName(idCCY).length > 0) 
					{
                        rowNo =  - 1;
                        rowIndex = fnSingleCheck(blockName);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (getElementsByOjName(idCCY)[rowNo])
                            ccy = getElementsByOjName(idCCY)[rowNo].value;
                        else 
                            ccy = getElementsByOjName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
            else 
			{
                if (document.getElementById(blockName + "__" + ccyFieldName)) 
				{
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
                else 
				{
                    if (getElementsByOjName(idCCY).length > 0) 
					{
                        rowNo =  - 1;
                        rowIndex = fnSingleCheck(blockName);
                        if (rowIndex == 0 || rowIndex ==  - 1)
                            rowNo = 0;
                        else 
                            rowNo = rowIndex - 1;
                        if (getElementsByOjName(idCCY)[rowNo])
                            ccy = getElementsByOjName(idCCY)[rowNo].value;
                        else 
                            ccy = getElementsByOjName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
    }

    if (ccy == "" && inpAmount != "") 
	{
        errCode = 'LB-UPD-024';
        errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        isfromscreen = false;
        return false;
    }
    if (!mainWin.g_objCcy[ccy]) 
	{
        isfromscreen = false;
        return false;
    }
    if (inpAmount && inpAmount != "") 
	{
        fnMB3CSVUploadAmount(inpAmount, true, ccy, currentCellHeader, firstCellValue, firstCellHeader);
        if (isValid()) 
		{
            isformat = false;
            isformat = true;
            var inpElemId = curDataBoundElem.name + "I";
            var inpElem;
            if (curDataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || curDataBoundElem.parentNode.tagName.toUpperCase() == "DIV")
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode.parentNode, inpElemId);
            else 
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode, inpElemId);
            if (inpElem && inpElem.getAttribute("MAXLENGTH1")) 
			{
                if (inpAmount && inpAmount != "") 
				{
                    var tmp = inpAmount;
                    if (inpAmount.lastIndexOf(gDecimalSymbol) !=  - 1)
                        tmp = inpAmount.substring(0, inpAmount.lastIndexOf(gDecimalSymbol));
                    tmp = replaceAllChar(tmp, gDigitGroupingSymbol, "");
                    tmp = replaceAllChar(tmp, gNegativeSymbol, "");
                    if (tmp.length > inpElem.getAttribute("MAXLENGTH1")) 
					{
                        errCode = 'LB-UPD-021';
                        errParam = inpElem.getAttribute("MAXLENGTH1") + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                        gIsValid = false;
                        return false;
                    }
                }
            }
        }
        else 
		{
            gIsValid = false;
            return false;
        }

    }
    else 
	{
        if (curDataBoundElem.value != '')
            curDataBoundElem.value = '';
    }
    isfromscreen = false;
    isformat = false;
    return true;
}

function fnMB3CSVUploadAmount(amt, isInputAmt, ccy, currentCellHeader, firstCellValue, firstCellHeader) 
{
    var tmpAmt;
    var amountSpecifier = "";
    var arrAmtComponents;
    var negativeSymbol = "-";
    var decimalSymbol = ".";
    var digitGroupingSymbol = ",";
    var newAmountFormat = mainWin.nlsAmountFormat;
    var dbdecimalSymbol = newAmountFormat.substr(0, 1);
    if (isInputAmt) 
	{
        negativeSymbol = gNegativeSymbol;
        decimalSymbol = gDecimalSymbol;
        digitGroupingSymbol = gDigitGroupingSymbol;
    }
    if (ccy != null && ccy != "") 
	{
        ccy = doTrim(ccy);
    }
    if (isValid()) 
	{
        if (amt == null || amt == "") 
		{
            tmpAmt = "0" + decimalSymbol + "0";
        }
        else 
		{
            tmpAmt = doTrim(amt);
            if (tmpAmt == null || tmpAmt == "") 
			{
                tmpAmt = "0" + decimalSymbol + "0";
            }
        }
    }

    if (isValid()) 
	{
        if (cAmountSpecifiers.indexOf(tmpAmt.toUpperCase().substr(tmpAmt.length - 1)) >  - 1) 
		{
            amountSpecifier = tmpAmt.toUpperCase().substr(tmpAmt.length - 1);
            tmpAmt = tmpAmt.substr(0, tmpAmt.length - 1);
        }
        if (tmpAmt.substr(0, 1) == negativeSymbol) 
		{
            negativeNum = true;
            tmpAmt = tmpAmt.substr(1);
        }
        if (!isfromscreen) 
		{
            tmpAmt = replaceAllChar(tmpAmt, dbdecimalSymbol, decimalSymbol);
        }
        tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
        if (digitGroupingSymbol.charCodeAt(0) == 160) 
		{
            digitGroupingSymbol = digitGroupingSymbol.replace(String.fromCharCode(digitGroupingSymbol.charCodeAt(0)), " ");
            tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
        }
        if (tmpAmt.indexOf('E') !=  - 1) 
		{
            tmpAmt = tmpAmt * 1 + "";
        }
        arrAmtComponents = tmpAmt.split(decimalSymbol);
        if ((arrAmtComponents.length != 1) && (arrAmtComponents.length != 2)) 
		{
            //displayMsg("ST-COM009");
            errCode = 'LB-UPD-025';
            errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
            valid = false;
            return false;
        }
    }
    if (isValid()) 
	{
        for (var tmpIndex = 0;tmpIndex < arrAmtComponents.length;tmpIndex++) 
		{
            if (!containsOnlyDigits(arrAmtComponents[tmpIndex])) 
			{
                //displayMsg("ST-COM010");
                errCode = 'LB-UPD-026';
                errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                valid = false;
                return false;
            }
        }
    }
    if (isValid()) 
	{
        if (arrAmtComponents.length == 1) 
		{
            arrAmtComponents[1] = "0000000000000000000000000000000000000000000000000000";
        }
        else 
		{
            arrAmtComponents[1] += "0000000000000000000000000000000000000000000000000000";
        }
        if (amountSpecifier == cThousandSpecifier) 
		{
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 3);
            arrAmtComponents[1] = arrAmtComponents[1].substr(3);

        }
        else if (amountSpecifier == cMillionSpecifier) 
		{
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 6);
            arrAmtComponents[1] = arrAmtComponents[1].substr(6);
        }
        else if (amountSpecifier == cBillionSpecifier) 
		{
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 9);
            arrAmtComponents[1] = arrAmtComponents[1].substr(9);
        }
        if (isInputAmt) 
		{
            var discardableVal = arrAmtComponents[1].substr(getNumDigitsAfterDecimal(ccy));
            if (parseInt(discardableVal, 10) > 0) 
			{
                //displayMsg("ST-COM011", ccy + "~");
                errCode = 'LB-UPD-027';
                errParam = ccy + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                valid = false;
                return false;
            }
            else 
			{
                arrAmtComponents[1] = arrAmtComponents[1].substr(0, getNumDigitsAfterDecimal(ccy));
            }
        }
        if (isInputAmt) 
		{
            if (arrAmtComponents[0].length == 0) 
			{
                arrAmtComponents[0] = "0";
            }
            while (arrAmtComponents[0].length > 1) 
			{
                if (arrAmtComponents[0].substr(0, 1) == "0") 
				{
                    arrAmtComponents[0] = arrAmtComponents[0].substr(1);
                }
                else 
				{
                    break;
                }
            }
        }
    }
    if (isValid()) 
	{
        amt = arrAmtComponents.join(decimalSymbol);
        ccy = ccy;
    }
    return valid;
}

function isValid() 
{
    return valid;
}

function fnValidateCSVUploadNumberRange(v_NumberFld, v_NumberFldValue, currentCellHeader, firstCellValue, firstCellHeader) 
{
    var noBefDecimals = "";
    var maxBefDecimal = "";
    var maxLen = "";
    
    if (v_NumberFld.type == "checkbox")
        return true;
    if (!v_NumberFld || v_NumberFldValue == '')
        return true;
    var valueEntered = v_NumberFldValue;
    var maxVal = v_NumberFld.getAttribute("MAX_VAL");
    var minVal = v_NumberFld.getAttribute("MIN_VAL");
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');
    if (!isNumericValidation(valueEntered) || (valueEntered.indexOf(" ") !=  - 1 && gDigitGroupingSymbol != " " && gDecimalSymbol != " ")) 
	{
        errCode = 'LB-UPD-022';
        errParam = v_NumberFldValue + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    if (valueEntered.indexOf(gDecimalSymbol) ==  - 1) 
	{
        if (!isNaN(parseInt(minVal))) 
		{
            if (parseInt(valueEntered) < parseInt(minVal)) 
			{
                errCode = 'LB-UPD-019';
                errParam = minVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(maxVal))) 
		{
            if (parseInt(valueEntered) > parseInt(maxVal)) 
			{
                errCode = 'LB-UPD-018';
                errParam = maxVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        noBefDecimals = valueEntered.length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) 
		{
            maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) 
			{
                errCode = 'LB-UPD-021';
                errParam = maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) 
		{
            maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) > maxLen) 
			{
                errCode = 'LB-UPD-021';
                errParam = maxLen + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
    }
    else 
	{
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) 
		{
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"))) 
			{
                errCode = 'LB-UPD-020';
                errParam = v_NumberFld.getAttribute("MAX_DECIMALS") + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
            }
        }
        noBefDecimals = valueEntered.substring(0, valueEntered.indexOf(".")).length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) 
		{
            maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) 
			{
                errCode = 'LB-UPD-021';
                errParam = ":" + maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) 
		{
            maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) - 1 > maxLen) 
			{
                errCode = 'LB-UPD-021';
                errParam = ":" + maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(minVal))) 
		{
            if (parseFloat(valueEntered) < parseFloat(minVal)) 
			{
                errCode = 'LB-UPD-019';
                errParam = minVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(maxVal))) 
		{
            if (parseFloat(valueEntered) > parseFloat(maxVal)) 
			{
                errCode = 'LB-UPD-018';
                errParam = maxVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
    }
    return true;
}

function fnProcessSchedulesUpload(rows) 
{
    var rowCheck = true;//row availability check
    var rowsLength = rows.length - 1;
	var i=0;
	var currIdx=0;
	var row=0;
	var multiplesPgSize=0;
	var cells =0;
	var firstCellHeader = "";
	var firstCellValue = "";
    var currentCellHeader = "";
	var chk_file_empty =0;
	
	for (var itr=2;itr<rowsLength;itr++)  // This logic is for check when the component is morethan 10 char or not.
	{
		var cells_comp = rows[itr].split(",");
		if(itr >=2 && itr<=rowsLength && cells_comp !=null && cells_comp.length !=0)
		{
			var len=null;
			var str_comp =null;
			str_comp=cells_comp[2];
			len=str_comp.length;
			if((len) >10)
			{
				showErrorAlerts('OL-UPD-018');//Component is morethan 10 char length
				fnResetUpload();
				return false;
			}
		}
	}
	
	for (var itr_1=2;itr_1<rowsLength;itr_1++)
	{
		chk_file_empty=0;
		var cells_comp_1 = rows[itr_1].split(",");
		for (var itr_2=0;itr_2<=11;itr_2++)
		{
			var len_1=null;
			var str_data_1 =null;
			str_data_1=cells_comp_1[itr_2];
			len_1=str_data_1.length;
			if (len_1==0)
			{
				chk_file_empty =chk_file_empty+1;
			}
			
			if(chk_file_empty==12)
			{
				showErrorAlerts('OL-UPD-021');
				fnResetUpload();//OBCL_14.4_support_Bug#31054736
				return false;
			}
		}
	}
	
    for (i = 2 + length;i < rowsLength + length;i++) 
	{
        //row iteration
        currIdx = i - 1;//current index of the row in block
        row = currIdx % pgSize;
        multiplesPgSize = Math.floor(currIdx / pgSize);
        if ((row == 0) && (multiplesPgSize != 0)) 
		{
            row = pgSize;
        }
        try {
            if (getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) 
			{
                rowCheck = false;//if rowCheck flag is false then, system will not allow to add new row
            }
            if ((rowCheck) || (multiplesPgSize >= 1 && row == 1)) 
			{
                fnAddRow(lclBlockId);//add new row to upload CSV file datas
                appendData();
                fnCheckToggleChkBox(lclBlockId);
                checkAnFocusSelectedRow(lclBlockId);//check and focus to the current row
            }
        }
        catch (e) 
		{
            fnAddRow(lclBlockId);//add new row to upload CSV file datas
            appendData();
            fnCheckToggleChkBox(lclBlockId);
            checkAnFocusSelectedRow(lclBlockId);//check and focus to the current row
        }
        cells = rows[i - length].split(",");//cells split logic in rows
        if (cells.length > 1) 
		{
            //if ((getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("oj-input-text")[0]) && (rowCheck)) //commented code OBCL_14.5_Support_Bug#33165328
			if ((getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) && ((rowCheck)||(multiplesPgSize >= 1))) //Handled Multipage Schedule upload OBCL_14.5_Support_Bug#33165328
			{
				var j =0;
                for (j = 0;j < cells.length - 1;j++) 
				{
                    //cells iteration of current row
                    if (cells[j] == '~END~') 
					{
                        //last cell value in current row
                        continue;//if last cell value is '~END~' then, system will skip current row and continue to the next row      
                    }
                    if (cells[j] != "" && cells[j] != '~END~') 
					{
                        var currObject = getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-select-single")[0];
                        firstCellHeader = "";
                        firstCellValue = "";
                        currentCellHeader = "";
                        if (currObject == undefined) 
						{
                            currObject = getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-input-text")[0];
                            if (currObject == undefined) 
							{
                                currObject = getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("TEXTAREA")[0];
                            }
                            if (currObject.getAttribute("data_type") == "DATE") 
							{
                                //current object type is 'DATE'
                                currObject.value = dateFormat('mm/dd/yyyy', 'yyyy-mm-dd', '/', '-', cells[j]);//date format parser
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else if ((currObject.type == "hidden") && (currObject.getAttribute("onpropertychange") == "displayFormattedNumber(this)")) 
							{
                                if(lclBlockId=="BLK_OLTBS_CONTRACT_SCHEDULES")
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 1);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 1);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                }
								else
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);                                                                        
                                }
                                //process for number validation, if the current object is number
                                var validateNumber = validateCSVUploadNumber(currObject, cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                if (validateNumber && gIsValid) 
								{
                                    currObject.value = cells[j];
                                    fireHTMLEvent(currObject, 'onpropertychange');
                                }
                                else 
								{
                                    return false;
                                }
                            }
                            else if ((currObject.type == "hidden") && (getOuterHTML(currObject).indexOf("displayAmount") !=  - 1)) 
							{
                                if(lclBlockId=="BLK_OLTBS_CONTRACT_SCHEDULES")
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 1);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 1);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                }
								else
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);                                                                        
                                }
                                //process for number validation, if the current object is number
                                var validateAmount = fnValidateCSVUploadAmount(currObject.getAttribute("name"), currObject.getAttribute("related_ccy"), cells[j], currentCellHeader, firstCellValue, firstCellHeader, getNextSibling(getNextSibling(currObject)));
                                if (validateAmount && gIsValid) 
								{
                                    var validateAmtRange = fnValidateCSVUploadNumberRange(getNextSibling(getNextSibling(currObject)), cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                    if (validateAmtRange && gIsValid) 
									{
                                        currObject.value = cells[j];
                                        fireHTMLEvent(currObject, 'onpropertychange');
                                    }
                                    else 
									{
                                        return false;
                                    }
                                }
                                else 
								{
                                    return false;
                                }
                            }
                            else if (currObject.type == "checkbox") 
							{
                                //current object type is 'CHECKBOX'
                                currObject.value = cells[j];
                                if (currObject.value == 'Y') 
								{
                                    currObject.checked = true; //Bug#34958820 check
                                }
                                else 
								{
                                    currObject.checked = false; //Bug#34958820 check
                                }
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else 
							{
                                currObject.value = cells[j];
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                        }
                        else 
						{
                            currObject.value = cells[j];//current object type is 'SELECT'
                            fireHTMLEvent(currObject, 'onpropertychange');
                        }
                    }
                }
            }
        }
    }
    appendData();
    return true;
}

function fnDeleteAllRowOfUpload() 
{
    if (lclBlockId != undefined && lclBlockId != '' && lclBlockId != "") 
	{
        fnUpdateBlockLength();
        var deleteCount = 1;
        var focusRow = 0;
        //delete rows, if the rows already have records in the block
        for (var index = 0;index < totRow;index++) 
		{
            fnDeleteRow(lclBlockId);
            deleteCount = deleteCount + 1;
            focusRow = totRow - deleteCount;
            if (totPg > 1)
			{
                focusRow = focusRow % pgSize;
            }
            if (focusRow > 1) 
			{
                fnCheckAnFocusSelectedRow(focusRow);//focus to the selected row
            }
        }
        appendData();
    }
    return true;
}

function fnCheckAnFocusSelectedRow(j) 
{
    getTableObjForBlock(lclBlockId).tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked = false;
    getTableObjForBlock(lclBlockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = true;
    getTableObjForBlock(lclBlockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].click();
    return true;
}

function fnResetUpload() 
{
    gDisableBrowseButton = true;
    lclBlockId = "";//block id to upload the CSV file
    currPg = 1;//current page of the block
    totPg = 1;//total page of the block
    pgSize = 0;//page size to dispaly the datas
    totRow = 0;//total rows of the block
    length = 0;//current length of the block
    fileUploadBtn.value = "";//file upload object
    errCode = "";//error code
    errParam = "";//error param
    csvRows = "";//rows parser object
    gIsValid = true;
    valid = true;
    negativeNum = false;
    return true;
}

function fnBackEndCall() 
{
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'UPLFSCH';
	appendData(document.getElementById('TBLPageAll'));
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
    
    if (msgStatus == "FAILURE") 
	{
		var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		gAction = g_prev_gAction;
		return false;
    }
 gAction = g_prev_gAction;
 return true; 
}

function fnSchedulesUpload(e) 
{
    gDisableBrowseButton = false;
    lclBlockId = "BLK_OLTBS_CONTRACT_SCHEDULES";//block id to upload the CSV file
    fileUploadBtn = document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD");
    evnt = e;//onchange event
    if (gAction == 'NEW' || gAction == 'MODIFY') 
	{
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;//file format parser
        if (regex.test(fileUploadBtn.value.toLowerCase())) 
		{
            if (typeof (FileReader) != undefined) 
			{
                var reader = new FileReader();
                reader.onload = function (e) 
				{
                    var rows = e.target.result.split("\n");//csv file parser
                    var schedulesVal = fnSchedulesUploadValidation(rows);//header validations, system will validate first two rows
                    if (schedulesVal) 
					{
                        fnUpdateBlockLength();
                        if (totRow > 0) 
						{
							csvRows = rows;
                            customAlertAction = "ACCEPTOVERRIDE";
                            mask();//masking the screen
                            showErrorAlerts("LB-UPD-016", "O", "Schedules");
							//fnCloseAlertWin_ACCEPTOVERRIDE();
							return false;
                        }
                        else 
						{
                            var uploadSuccess = fnProcessSchedulesUpload(rows);//process upload schedules 
                            if (uploadSuccess) 
							{
                                fnUpdateBlockLength();//current length of block 
								fileUploadBtn.value = "";
                                if (totRow > 0 && schedulesVal) 
								{
                                    var backEndCall =fnBackEndCall();//back end call to validate uploaded schedules
                                    if (backEndCall) 
									{
                                        //fnResetUpload();//reset upload parameters
										fileUploadBtn.value = "";
                                        return true;
                                    }
                                    else 
									{
										fnDeleteAllRowOfUpload();
                                        //fnResetUpload();//reset upload parameters // commented on Feb 24 2020
                                        return false;
                                    }
                                }
                            }
                            else 
							{
                                if (errCode != null && errCode != '' && errCode != "") 
								{
                                    fnUpdateBlockLength();//current length of block
                                    fnDeleteAllRowOfUpload();  
                                    if (errParam != null && errParam != '' && errParam != "") 
									{
                                        var alertMessage = fnBuildAlertMessage(errCode, "E", "", errParam);
                                        fnResetUpload();
                                        alert(alertMessage);//display error if upload fails
                    }
                    else 
					{
                                        fnResetUpload();//reset upload parameters
                                        showErrorAlerts(errCode);//display error if upload fails
                                    }
                                    return false;
                                }
                            }
                        }
                    }
                    else 
					{
                       
						fileUploadBtn.value = "";
                        showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file."); 
                        return false;
                    }
                }
                reader.readAsText(fileUploadBtn.files[0]);
            }
            else 
			{
                fnResetUpload();//reset upload parameters
                showErrorAlerts("LB-UPD-015");//alert("This browser does not support CSV upload.");
                return false;
            }
        }
        else 
		{
            //fnResetUpload();
			fnUpdateBlockLength();
			gDisableBrowseButton = true;
			lclBlockId = "";
			currPg = 1;
			totPg = 1;
			pgSize = 0;
			//totRow = 0;
			length = 0;
			//fileUploadBtn.value = "";//file upload object
			errCode = "";
			errParam = "";
			csvRows = "";
			gIsValid = true;
			valid = true;
			negativeNum = false;
            //showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file.");  
			
			if (totRow==0)
			{
				fileUploadBtn.value = "";
				totRow = 0;
			}
            return false;
        }
    }
    else 
	{
        fnResetUpload();//reset upload parameters
        showErrorAlerts("LB-UPD-014");//alert("CSV file Upload is not supported for this operation");
        return false;
    }
    gDisableBrowseButton = true;
    return true;
}

function dateFormat(existingFormat, neededFormat, existingSeperator, newSeperator, dateValue) 
{
	var mm =null;
	var dd =null;
	var yyyy=null;
    var exst = existingFormat.toLowerCase().split(existingSeperator);
    var d = dateValue.split(existingSeperator);
    d[exst[0]] = d[0]; // month
    d[exst[1]] = d[1];// date
    d[exst[2]] = d[2];//year
	
    var newst = neededFormat.toLowerCase().split(newSeperator);
    newDate = d[newst[0]] + newSeperator + d[newst[1]] + newSeperator + d[newst[2]];
	
	mm=d[0];
	dd=d[1];
	yyyy=d[2];
	if  (mm >12 || mm=='0' || mm=='00')//month validation
	{
		showErrorAlerts('ST-COM006');
		fnResetUpload();
		return false;
	}
	if (dd >31 || dd=='0' ||dd=='00')//date validation
	{
		showErrorAlerts('ST-COM007');
		fnResetUpload();
		return false;
	}
	
	if(yyyy=='0' || yyyy=='0000' || yyyy=='00')//year validation
	{
		showErrorAlerts('ST-COM005');
		fnResetUpload();
		return false;
	}
    return (newDate);
}

function fnBuildAlertMessage(alertCode, type, message, replaceString) 
{
    if (typeof (message) == "undefined" || (typeof (message) != "undefined" && message == "")) 
	{
        var alertCodes = alertCode.split("~");
        message = "";
        for (var i = 0;i < alertCodes.length;i++) 
		{
            if (alertCodes[i] != "") 
			{
                var tempmessage = mainWin.getCommonErrorList()[alertCodes[i]];
                if (tempmessage == undefined) 
				{
                    message += mainWin.getItemDesc("LBL_UNKNOWN_ERROR") + "~";
                }
                else 
				{
                    if (typeof (replaceString) != "undefined") 
					{
                        replaceString = replaceString + "";
                        var replaceStr = replaceString.split("~");
                        for (var j = 0;j < replaceStr.length;j++) 
						{
                            if (replaceStr[j] != "") 
							{
                                var findReplaceStr = '$' + getSum(j, 1);
                                tempmessage = tempmessage.replace(findReplaceStr, replaceStr[j]);
                            }
                        }
                    }
                    message += tempmessage.split("~")[0];
                    message += "~";
                }
            }
        }
        message = message.substring(0, message.length - 1);
    }
    return message;
}

function getSum(total, num) 
{
    return total + num;
}

function fnDisableUploadBtnElement(object) 
{
    object.disabled = true;
    object.readOnly = true;
    object.className = "TXTro";
    return true;
}

function fnEnableUploadBtnElement(object) 
{
    object.disabled = false;
    object.readOnly = false;
    object.className = "TXTstd";
    return true;
}

function fnProcessSchedulesUploadOverride(rows) // This function will override the schedule data.
{
	fnDeleteAllRowOfUpload();
	fnUpdateBlockLength() 
    var rowCheck = true;//row availability check
    var rowsLength = rows.length - 1;
	var i=0;
	var currIdx=0;
	var row=0;
	var multiplesPgSize=0;
	var cells =0;
	var firstCellHeader = "";
	var firstCellValue = "";
    var currentCellHeader = "";
    for (i = 2 + length ;i < rowsLength + length;i++)  
	{
        //row iteration
        currIdx = i - 1;//current index of the row in block
        row = currIdx % pgSize;
        multiplesPgSize = Math.floor(currIdx / pgSize);
        if ((row == 0) && (multiplesPgSize != 0)) 
		{
            row = pgSize;
        }
        try {
            if (getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) 
			{
                rowCheck = false;//if rowCheck flag is false then, system will not allow to add new row
            }
            if ((rowCheck) || (multiplesPgSize >= 1 && row == 1)) 
			{
                fnAddRow(lclBlockId);//add new row to upload CSV file datas
                appendData();
                fnCheckToggleChkBox(lclBlockId);
                checkAnFocusSelectedRow(lclBlockId);//check and focus to the current row
            }
        }
        catch (e) 
		{
            fnAddRow(lclBlockId);//add new row to upload CSV file datas
            appendData();
            fnCheckToggleChkBox(lclBlockId);
            checkAnFocusSelectedRow(lclBlockId);//check and focus to the current row
        }
        cells = rows[i - length].split(",");//cells split logic in rows
        if (cells.length > 1) 
		{
            if ((getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) && (rowCheck)) 
			{
				var j =0;
                for (j = 0;j < cells.length - 1;j++) 
				{
                    //cells iteration of current row
                    if (cells[j] == '~END~') 
					{
                        //last cell value in current row
                        continue;//if last cell value is '~END~' then, system will skip current row and continue to the next row      
                    }
                    if (cells[j] != "" && cells[j] != '~END~') 
					{
                        var currObject = getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-select-single")[0];
                        firstCellHeader = "";
                        firstCellValue = "";
                        currentCellHeader = "";
                        if (currObject == undefined) 
						{
                            currObject = getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-input-text")[0];
                            if (currObject == undefined) 
							{
                                currObject = getTableObjForBlock(lclBlockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("TEXTAREA")[0];
                            }
                            if (currObject.getAttribute("data_type") == "DATE") 
							{
                                //current object type is 'DATE'
                                currObject.value = dateFormat('mm/dd/yyyy', 'yyyy-mm-dd', '/', '-', cells[j]);//date format parser
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else if ((currObject.type == "hidden") && (currObject.getAttribute("onpropertychange") == "displayFormattedNumber(this)")) 
							{
                                if(lclBlockId=="BLK_OLTBS_CONTRACT_SCHEDULES")
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 1);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 1);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                }
								else
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);                                                                        
                                }
                                //process for number validation, if the current object is number
                                var validateNumber = validateCSVUploadNumber(currObject, cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                if (validateNumber && gIsValid) 
								{
                                    currObject.value = cells[j];
                                    fireHTMLEvent(currObject, 'onpropertychange');
                                }
                                else 
								{
                                    return false;
                                }
                            }
                            else if ((currObject.type == "hidden") && (getOuterHTML(currObject).indexOf("displayAmount") !=  - 1)) 
							{
                                if(lclBlockId=="BLK_OLTBS_CONTRACT_SCHEDULES")
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 1);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 1);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                }
								else
								{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);                                                                        
                                }
                                //process for number validation, if the current object is number
                                var validateAmount = fnValidateCSVUploadAmount(currObject.getAttribute("name"), currObject.getAttribute("related_ccy"), cells[j], currentCellHeader, firstCellValue, firstCellHeader, getNextSibling(getNextSibling(currObject)));
                                if (validateAmount && gIsValid) 
								{
                                    var validateAmtRange = fnValidateCSVUploadNumberRange(getNextSibling(getNextSibling(currObject)), cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                    if (validateAmtRange && gIsValid) 
									{
                                        currObject.value = cells[j];
                                        fireHTMLEvent(currObject, 'onpropertychange');
                                    }
                                    else 
									{
                                        return false;
                                    }
                                }
                                else 
								{
                                    return false;
                                }
                            }
                            else if (currObject.type == "checkbox") 
							{
                                //current object type is 'CHECKBOX'
                                currObject.value = cells[j];
                                if (currObject.value == 'Y') 
								{
                                    currObject.checked = true;
                                }
                                else 
								{
                                    currObject.checked = false;
                                }
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else 
							{
                                currObject.value = cells[j];
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                        }
                        else 
						{
                            currObject.value = cells[j];//current object type is 'SELECT'
                            fireHTMLEvent(currObject, 'onpropertychange');
                        }
                    }
                }
            }
        }
    }
    appendData();
    return true;
}
function fnExitAlertWin_ACCEPTOVERRIDE() 
{ //to close the window
    fnUpdateBlockLength();
    fnResetUpload();//reset upload parameters
    unmask();//unmasking the screen
    customAlertAction = "";
    return true;
}

function fnCloseAlertWin_ACCEPTOVERRIDE() 
{
	fnDeleteAllRowOfUpload();
    unmask();//unmasking the screen
	var schedulesVal_1 = fnSchedulesUploadValidation(csvRows);
	if (schedulesVal_1)
	{
		var uploadSuccess_1 = fnProcessSchedulesUploadOverride(csvRows)
								if (uploadSuccess_1)
								{
									fnUpdateBlockLength();
									var backEndCall_1 =fnBackEndCall();
									fileUploadBtn.value = "";
									return true;
								}
								else
								{
									return false;
								}
	}
	customAlertAction = "";
    return true;
}

//OBCL_14.3_Schedule_upload end

//OBCL_14.3_Support_Bug#30920052 Starts
function fnPostReturnValToParent_LOV_LINKEDTOREF_KERNEL()
{
	//OBCL_14.3_Support_Bug#31904242 Starts  --To Handle only for Action New and Modify	
  if (gAction == 'NEW' || gAction == 'MODIFY')
   {
    //OBCL_14.3_Support_Bug#31904242 Ends 	
	g_prev_gAction = gAction;	
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	
	gAction = 'LNKDET';
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
   }  //OBCL_14.3_Support_Bug#31904242
 return true; 
}
function fn_get_linkage_details()
{
	appendData(); //OBCL_14.3_Support_Bug#33435663
	var linkagesdet = selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_LINKAGES")
	for (var i = 0;i < linkagesdet.length;i++) {
	if ((getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_LINKAGES/LINKREF")[i]) == null ||
	    getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_LINKAGES/LINKREF")[i]) == "") //OBCL_14.3_Support_Bug#30920052_1 Starts
		||(getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_LINKAGES/LNKBRN")[i]) == null ||
	    getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_LINKAGES/LNKBRN")[i]) == "")
		||(getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_LINKAGES/LNKCCY")[i]) == null ||
	    getNodeText(selectNodes(dbDataDOM, "//BLK_OLTBS_CONTRACT_LINKAGES/LNKCCY")[i]) == "")) //OBCL_14.3_Support_Bug#30920052_1 Ends
		{
			return true; 
		}
	}
	fnPostReturnValToParent_LOV_LINKEDTOREF_KERNEL();
}
//OBCL_14.3_Support_Bug#30920052 Ends
//OBCL_14.4_PM_ReversalviaService starts
function DisableTxnBtn()
{
     
 if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXNSTAT").value == "X")	 
{
DisableToolbar_buttons("Reverse");
//DisableToolbar_buttons("Unlock");
DisableToolbar_buttons("Copy");
DisableToolbar_buttons("Rollover");
} 
return true;
}
//OBCL_14.4_PM_ReversalviaService ends

//ChatBot Integration start
function fnPostLoad_Sum_KERNEL(e) {
    try {
      if (mainWin.chatBotArray.frmChatBot == "Y") {
        details = new Object();
        mainWin.chatBotArray.respVal
          .trim()
          .split(",")
          .forEach((e) => {
            if (e.trim().split("=")[0] && e.trim().split("=")[1]) {
              details[
                e.trim().split("=")[0].trim().toLowerCase()
              ] = e.trim().split("=")[1].trim();
            }
          });
        if (details.urn)
          document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__USRREFNO").value =
            "%" + details.urn.toUpperCase() + "%";
        if (details.cus)
          document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__CUSTNAM").value =
            "%" + details.cus + "%";
        if (details.crn)
          document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__CONTREFNO").value =
            "%" + details.crn.toUpperCase() + "%";
        if (details.md) {
        //  document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__MATDTI").value = //Bug#34958820 check
         //   details.md;
          document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__MATDT").value =
            details.md;
        }
        if (details.vd) {
          document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__VALDT").value =
            details.vd;
         // document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__VALDTI").value = //Bug#34958820 check 
          //  details.vd;
        }
        if (details.prd)
          document.getElementById("BLK_OLVW_CONTRACT_SUMMARY__PRODUCT").value =
            "%" + details.prd.toUpperCase() + "%";
        fnExecuteQuery_sum("Y", event);
      }
    } finally {
      mainWin.chatBotArray.frmChatBot = "";
    }
  }
  //ChatBot Integration end 
 //Bug#32011999 Start
function fnPrePickUpSubSystem_CVS_INTEREST_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPreLaunchForm_CVS_EVENTS_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}	

function fnPrePickUpSubSystem_CVS_ADVICE_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}	

function fnPrePickUpSubSystem_CVS_SETTLEMENTS_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}	

function fnPrePickUpSubSystem_CVS_SETINFO_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_TAX_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}	

function fnPrePickUpSubSystem_CVS_MIS_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_UDF_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_CFCTRCHG_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_FEECOMP_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_CONREL_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_LDCONBRW_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_FLRCL_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_DACINTRT_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_FEERULEMAINT_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_ENTITY_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPrePickUpSubSystem_CVS_SPROLL_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

function fnPreLaunchForm_CVS_INTDT_KERNEL(screenArgs)
{
	expandcontent('TAB_MAIN');
	return true;
}

//Bug#32011999  End 
//OBCL_14.5_Oct21 commenting starts
//Bug#32476677  Start
/* function fnPostLoad_KERNEL() {
var parentWin = fnGetParentWin();
if(parentWin != ""){ 
	 if (parentWin.parentWinParams.PARENT_FUNC_ID=="OLDOVDEF") 
	  {
		var g_prv_actn = gAction;
     	gAction = "ENTERQUERY";	
	  	fnEnterQuery();
	  	document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
	  	gAction= "EXECUTEQUERY";
	   	fnExecuteQuery();
		showToolbar('', '', '', '');
		gAction = g_prv_actn;
		}
	}		
} */
//Bug#32476677  End
//OBCL_14.5_Oct21 commenting ends