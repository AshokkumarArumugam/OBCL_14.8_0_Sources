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
**  File Name          : LBDTRONL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Ashokkumar Arumugam
**  Last modified on   : 17-Apr-2019
**  Full Version       : OBCL_14.3.0.0.0
**  Search String      : OBCL_14.3_29658421_Changes
**  Reason             : Added code to pickup Agreement details during Tranche Modification.

  Changed By         : Anusha k
  Changed On         :06-DEC-2019
  Search String      : OBCL_14.4_BUG#30717108
  Reason             : Added code for disabling the value date and original start date retro.
  
  Changed By         : Anusha k
  Changed On         : 05-MAR-2020
  Search String      : OBCL_14.4_LS_Changes
  Reason             : Changes done to assign subsystem stat as 'U' .
  
  Changed By         : Prakash Ravi
  Changed On         : 17-Jan-2020
  Search String      : BUG#30920049
  Change Reason      : Code changes for Hold action. 

  Changed By         : Surya Prabha
  Changed On         : 15-July-2020
  Search String      : Bug#31618524
  Change Reason      : Code changes to update version number.  
  
  Changed By         : Sowmya Bitra
  Changed On         : 14-Aug-2020
  Search String      : OBCL_14.1_SupportBug#31443785 Changes  
  Change Reason      : Code changes to default schedules. (forward port) 
  
  Changed By         : Sowmya Bitra
  Changed On         : 14-Aug-2020
  Search String      : OBCL_14.1_SupportBug#31544114 Changes  
  Change Reason      : Changes done to redefine tranche schedules upon CAMD (forward port) 
  
  Changed By         : JayaramN
  Changed On         : 17-Dec-2020
  Search String      : BUG#32264871
  Change Reason      : POST AUTHORIZATION ON RE-QUERY THE AGREEMENT START DATE NOT GETTING POPULATED IN FCDTRONL SCREEN

**	Last Modified By   : ArunaDevi Rajendran
**	Last modified on   : 25-Jan-2021
**	Search String      : OBCL_14.4_360CorporateCustomerView
**	Reason             : To invoke the contract screen from 360 Corporate customer view Screen

  Changed By         : Surya Prabha
  Changed On         : 16-Mar-2021
  Search String      : Bug#32530503 changes
  Change Reason      : Code changes to update subsys stat for FCCRCMNT and LFCFEECF. 
  
  Changed By         : Janki kholiya
  Changed On         : 19-Oct-2021
  Search String      : Bug#33442741 changes
  Change Reason      : code changes to make tranche repayment read only during CAMD.
  
  Changed By         : Palanisamy M
  Changed On         : 28-Oct-2021
  Search String      : BUG#33393976
  Change Reason      : Added code for query from ACDTRNQY screen by getting contract ref no.  
  
  Changed By         : Janki kholiya
  Changed On         : 23-NOV-2021
  Search String      : Bug#33442741 changes
  Change Reason      : reverted the code changes to make tranche repayment read only during CAMD.
  
  Changed By         : Palanisamy M
  Changed On         : 25-JAN-2022
  Search String      : Bug#33769978 changes
  Change Reason      : Fix for AMENDMENT DETAILS ARE DISAPPEARING AFTER VISITING FEE SUB SCREEN 
  
  Changed By         : Surya Prabha
  Changed On         : 16-Feb-2022
  Search String      : Bug#33850398 changes
  Change Reason      : Code fix to validate DD Product screen visit before visiting UDF callform 
 
  Changed By         : Pallavi R
  Changed On         : 24-Feb-2022
  Search String      : OBCL_14.5_SMTB_#33875435 Changes
  Change Reason      : Tax is getting pickedup during unlock  (For Tax callform changing status from D to S)
  
  Changed By         : Arunprasth
  Changed On         : 09-Jul-2022
  Search String      : Bug#34300314
  Change Reason      : Added code hide overwrite SSI call form

  Changed By         : Satheesh Seshan
  Changed On         : 07-Jul-2022
  Search String      : Bug#33805053
  Change Reason      : Assign value as NULL on click of NEW to commitment type revolv/non revolv radio button. 
  
  Changed By         : Palanisamy M
  Changed On         : 21-Nov-2022
  Search String      : Bug#34719024
  Change Reason      : Display margin components only from attached Drawdown products.  

  Changed By         : Anusha K
  Changed On         : 12-Sep-2023
  Search String      : obcl_14.6_#35789127 changes
  Change Reason      : Reverted 34719024 as margin callform repickup is happenig on simply visting dd product screen

  Changed By         : Mohan Pal
  Changed On         : 12-Dec-2023
  Search String      : Bug#36056539
  Change Reason      : If user visit dd product screen before first auth, margin callform repickup should happen

	Changed By         : Rashmi B V
    Date               : 21-FEB-2024
    Change Description : Explode schedule call restricted if 'redefine' button not clicked. 
    Search String      : Bug#36234922
	
  **Changed By         : Vineeth T M
  **Date               : 23-Feb-2024
  **Change Description : Collect list of participants and assign to listTrancheParticipants variable in post execute query.
						 It will be then further passed on to participant limit screen to pick only tranche particpants in participant LOV.
						 This is required here for copy/unlock cases where visiting particpant screen is optional.
  **Search String      : Bug#36263557 Changes
  
    Changed By         : Rashmi B V
    Date               : 09-May-2024
    Change Description : After Tranche copy - on change of value date, Subsys repickup was not happeing for Fee call form
    Search String      : Bug#36542385
	
  **Changed By         : Anusha K
  **Date               : 09-Jul-2024
  **Change Description : Changes to update subsytem status for issuer screen.
  **Search String      : OBCL_RABO_Bug#36799884
  
   **Changed By         : Chandra Achuta
  **Date               : 06-NOV-2024
  **Change Description : Changes to update subsytem status for Advices call form screen.
  **Search String      : Bug#37227787


****************************************************************************************************************************/
var gDisableschblock= false;
var gEnableButton = false;
var gPrevAction;
var gDisablerdfschButton= false;
var gDisabledefschButton= false;  //OBCL_14.1_SupportBug#31443785 Changes

/* OBCL_CSV_File_Upload_Changes :: Starts */
var gDisableBrowseButton = true;
var blockId = "";//block id to upload the CSV file
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
/* OBCL_CSV_File_Upload_Changes :: Ends */
var listTrancheParticipants = "#"; //Bug#36263557 Changes

function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDTRAUT';
    authUixml = 'LBDTRAUT';
    authScreenName = 'CVS_TRANCHE_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDTRAUT'] = "KERNEL";
    ArrPrntFunc['LBDTRAUT'] = "";
    ArrPrntOrigin['LBDTRAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL() {
    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
    return true;
}
function fnPreLaunchForm_CVS_PARTSUM_KERNEL(screenArgs ){
	screenArgs['Product_Type'] = 'T';
	screenArgs['TRANREF'] = document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value;
parent.screenArgs =screenArgs;
	return true;
}
function fnPreLaunchForm_CVS_NETTING_KERNEL(screenArgs ){
	screenArgs['TRANCHEREFNO'] = document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value;
parent.screenArgs =screenArgs;
	return true;
}
function fnPreLoad_CVS_TRANCHE_AUTH(screenArgs) {
    screenArgs['CONTRACT_REF_NO1'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTREFNO').value;    
    return true;
}

//OBCL_14.1_SupportBug#31443785 Changes Start
function fn_defaultSchedule(){
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
//OBCL_14.1_SupportBug#31443785 Changes End

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
function  fnOnClick_BTN_NEXT(){
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = 'VERSIONQUERY';
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__VERNOI").value);
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNOI").value);
	if(verNo == versionCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}
	if(verNo<versionCount)
	{
		verNo++;
		document.getElementById("BLK_OLTBS_CONTRACT__VERNOI").value=verNo;	
		document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;
        document.getElementById("BLK_OLTBS_CONTRACT__LATVERNOI").value=verNo;		//Bug 31618524 changes
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;		//Bug 31618524 changes
		
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
	var verNo=Number(document.getElementById("BLK_OLTBS_CONTRACT__VERNOI").value);
	var versionCount=Number(document.getElementById("BLK_OLTBS_CONTRACT__LATVERNOI").value);
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	verNo--;
	if(verNo>0)
	{			
		document.getElementById("BLK_OLTBS_CONTRACT__VERNOI").value=verNo;		
		document.getElementById("BLK_OLTBS_CONTRACT__VERNO").value=verNo;
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNOI").value=verNo;		
		document.getElementById("BLK_OLTBS_CONTRACT__LATVERNO").value=verNo;
		appendData(document.getElementById("TBLPageAll"));
		g_prev_gAction=gAction;
		
		gAction='EXECUTEQUERY';		
		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}
function fnPostCopy_KERNEL(){
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__PRODCODE"));
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
	fnPopulateSubSystemValues(document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value); //Bug#36542385
	return true;
}
function fnPostUnlock_KERNEL() {
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV"));
    if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
	{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__VALUEDT")); //OBCL_14.4_BUG#30717108 
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__ORIGSTDT"));//OBCL_14.4_BUG#30717108 
		
      var noRows = getTableObjForBlock("BLK_OLTBS_CONTRACT_SCHEDULES").tBodies[0].rows.length;	
     if (noRows > 0)
     {		 
     gDisableschblock = true;
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));
	 }
	//document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:D;OLCONDET:S;LBCSTDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:D;FCCRCMNT:D;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:D;';//OBCL_14.3_29658421_Changes	
	//document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:D;OLCONDET:S;LBCSTDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:D;FCCRCMNT:U;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:D;';//OBCL_14.4_LS_Changes
	//document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:D;OLCONDET:S;LBCSTDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:D;FCCRCMNT:U;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;'; /* BUG#32264871 Bug#33769978 changes*/
	 //OBCL_14.5_SMTB_#33875435 Changes Starts 
	 //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LBCSTDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:D;FCCRCMNT:U;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;'; /* BUG#32264871 Bug#33769978 changes*/	 
	  //OBCL_RABO_Bug#36799884 starts
	  //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:S;FCCRCMNT:U;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;'; 
	//LBCSTDET:S; removed as part Bug#34300314
	//OBCL_14.5_SMTB_#33875435 Changes Ends	
     //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:S;FCCRCMNT:U;LBCLCISR:U;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;'; //Bug#37227787  Code Commented
	 document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LFCTRCHG:D;LFCFRMNT:S;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:S;LBCPRTAX:S;FCCRCMNT:U;LBCLCISR:U;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:U;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;'; //Bug#37227787  Code Added  (OLCTRUDF, LBCADVIC, LFCFRMNT)
	////OBCL_RABO_Bug#36799884 ends
	}	
	else
    {
	 gDisablerdfschButton = true; 	
	 //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:D;OLCONDET:S;LBCSTDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:D;FCCRCMNT:D;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;';	//BUG#30920049 change	 
     //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:D;OLCONDET:S;LBCSTDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:D;FCCRCMNT:D;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;';	/* BUG#32264871 */	 
	 //OBCL_14.5_SMTB_#33875435 Changes Starts  
	 //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LBCSTDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:D;FCCRCMNT:U;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;';	//Bug#32530503 changes	
	  ////OBCL_RABO_Bug#36799884 ends STARTS 
	  //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:S;FCCRCMNT:U;LBCLCISR:S;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;';	 
	 //LBCSTDET:S; removed as part of Bug#34300314
	 //OBCL_14.5_SMTB_#33875435 Changes Ends
	  //document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LFCTRCHG:D;LFCFRMNT:D;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:D;LBCPRTAX:S;FCCRCMNT:U;LBCLCISR:U;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:D;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;';	 //Bug#37227787  Code Commented
	  document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value='LBCONCCY:U;LBCCONBW:U;LBCPARAT:U;LBCCONDP:U;LFCFEECF:U;OLCONDET:S;LFCTRCHG:D;LFCFRMNT:S;OLCTRMIS:S;OLDEVENT:S;OLCTRUDF:S;LBCPRTAX:S;FCCRCMNT:U;LBCLCISR:U;LBCSKMTR:S;LBCASGVL:S;LBCONPTY:S;LBCADVIC:U;LBCCOLET:S;LBSNETCF:S;OLCFFMBR:S;OLCFFMSG:S;LBCFLRCL:S;LBCCOLAT:S;LBCCOLAC:S;LBCCOLPT:S;LBCAGCIF:S;OLCESCAM:S;LBCCYRST:S;LBCAGDET:U;';	//Bug#37227787  Code Added  (OLCTRUDF, LBCADVIC, LFCFRMNT)
	 
	////OBCL_RABO_Bug#36799884 ends CHANGED SUBSYTEM STATUS OF LBCLCISR TO U
	}		
	 expandcontent('TAB_MAIN');
	return true;
}
function fnPostNew_KERNEL() {
	gDisablerdfschButton = true;
	//Bug#33805053 start
	//document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMI").value = false;
	//document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMI2").value = false;
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMI").value =""
	document.getElementById("BLK_OLTBS_CONTRACT_PREFERENCE__REVCOMMI2").value ="";
	//Bug#33805053 End
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV")); 
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT"));	
    expandcontent('TAB_MAIN');
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	gEnableButton = true;
	expandcontent('TAB_MAIN');
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_PREV")); 
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_NEXT")); 
	//Bug#36263557 Changes start	
	var listNode = selectNodes(dbDataDOM, "//BLK_CON_PARAT");
	var participants = "";
	for (let i=0; i<listNode.length; i++){
		participants = participants + "#" + getNodeText(selectNodes(dbDataDOM,"//BLK_CON_PARAT/PARTICIPANT")[i]);
	}
	listTrancheParticipants = participants;
	//Bug#36263557 Changes end
	return true;
}

function fnInTab_TAB_SCH_KERNEL() {
	if (gEnableButton)
	{
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_EXPSCH"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_CMTREDNSCH"));
	fnEnableElement(document.getElementById("BLK_LBTBS_TRANCHE_SCHEDULE_INPUT__BTN_EXPTRSCH"));
	fnEnableElement(document.getElementById("BLK_LBTBS_TRANCHE_SCHEDULES__BTN_UNSCHREP"));
	fnEnableElement(document.getElementById("BLK_LBTBS_TRANCHE_SCHEDULES__BTN_SCHHIST"));
	}

	if (gDisablerdfschButton)
	{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS")); //OBCL_14.1_SupportBug#31544114 Changes 		

	}	
	if (gDisableschblock)
    { 
     fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",false);
	}
	
    //OBCL_14.1_SupportBug#31443785 Changes Start
    if (gDisabledefschButton)
	{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_DEF_SCH"));
	}
	//OBCL_14.1_SupportBug#31443785 Changes End
	
		return true;
}

//OBCL_14.1_SupportBug#31544114 Changes Start
function fnPostLoad_CVS_PAID_SCHEDULES_KERNEL(){
getElementsByOjName('cmdAddRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
getElementsByOjName('cmdDelRow_BLK_OLTBS_CONTRACT_SCHEDULES_PAID')[0].style.visibility = 'hidden';
return true;
}
//OBCL_14.1_SupportBug#31544114 Changes End

function fnInTab_TAB_COMLNK_KERNEL() {
    if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
	{	
     getElementsByOjName('cmdAddRow_BLK_LBTBS_LOAN_COMMITMENT_LINK')[0].style.visibility = 'hidden';
     getElementsByOjName('cmdDelRow_BLK_LBTBS_LOAN_COMMITMENT_LINK')[0].style.visibility = 'hidden';
	}
	return true;
}
function Fn_redefineschedule(){
    if (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')
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
  fnEnableMEBlock("BLK_OLTBS_CONTRACT_SCHEDULES",true);	
  fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_REDEFSCH"));
  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_PAIDSCHDLS"));  //OBCL_14.1_SupportBug#31544114 Changes 
  gDisableschblock = false;
	} 
 //Bug#36234922 starts
 try {
 document.getElementById("BLK_OLTBS_CONTRACT__REDEFCLICKED").value = 'Y';
 }catch(e) {}
 //Bug#36234922 ends
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
	}
fnSubScreenMain('LBDTRONL', 'LBDTRONL', 'CVS_PAYDET', false);
 return true; 
}
function fn_cmtrednSchdelue() {
	if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_NEW' || gAction == 'SUBSYSPKP_MODIFY')
	{
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'CMTREDN';
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
fnSubScreenMain('LBDTRONL', 'LBDTRONL', 'CVS_REDNSCH', false);
 return true; 
}
function Fn_poptrancheschdet(){
	if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_NEW' || gAction == 'SUBSYSPKP_MODIFY')
	{
	g_prev_gAction = gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
	gAction = 'EXPTRSCH';
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
 return true; 
}

function fnPrePickUpSubSystem_CVS_LBCCONBW_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCONCCY');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-001');
  return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_PARAT_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONBW');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-002');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_DRAWDOWN_PROD_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
//Bug#36056539 added starts
	if ((gAction == 'MODIFY' && (document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'N')))  {
	  getElementsByOjName('SUBSYSSTAT')[0].value = l_statusStr.replace("FCCRCMNT:U", "FCCRCMNT:D");	
	}
 
//Bug#36056539 added ends
 //getElementsByOjName('SUBSYSSTAT')[0].value = l_statusStr.replace("FCCRCMNT:U", "FCCRCMNT:D"); //Bug#34719024 Change//obcl_14.6_#35789127 changes
 var stat = extractSubSysStat(l_statusStr, 'LBCPARAT');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-003');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_MARGIN_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_FLOOR_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_FEERULEMAINT_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_FEECOMP_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_CCYRST_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_PARTLCISS_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_SKIMDTLS_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_PARTTAX_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_CFCTRCHG_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_SETTLEMENTS_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_OVSI_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_PARTYDETAILS_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_MIS_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
// Bug#33850398 changes start
// function fnPrePickUpSubSystem_CVS_FLD_KERNEL(){
function fnPrePickUpSubSystem_CVS_UDF_KERNEL(){
// Bug#33850398 changes end
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_ADVICE_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_ASIGN_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
    return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_COLAT_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
      return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_COLAC_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
      return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_COLLAT_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
      return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_COLLPRT_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
      return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_ESCROW_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
      return false;
 }
 return true;
}
function fnPrePickUpSubSystem_CVS_ORIG_SSI_MAINT_KERNEL(){
 var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
 var stat = extractSubSysStat(l_statusStr, 'LBCCONDP');
 if (stat != 'U'){
  showErrorAlerts('IN-LB-004');
      return false;
 }
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
	//}	  //OBCL_14.3_Diary_event
	  if (parentWin.parentWinParams.PARENT_FUNC_ID== "OLDDRYET") 
	  {                    
	    fnEnterQuery();
	    document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
	    gAction= "EXECUTEQUERY";
	    fnExecuteQuery();
	  }
	 //OBCL_14.4_360CorporateCustomerView starts
	  if (parentWin.parentWinParams.PARENT_FUNC_ID== "OLDCRPVW") 
	  {                    
	    fnEnterQuery();
	    document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parentWin.parentWinParams.CONTRACT_REF_NO;
	    gAction= "EXECUTEQUERY";
	    fnExecuteQuery();
	  }
	 //OBCL_14.4_360CorporateCustomerView ends
	//BUG#33393976 starts
	  if (parent.screenArgs['PARENT_FUNC_ID']== "ACDTRNQY") 
	  {                    
	    fnEnterQuery();
	    document.getElementById("BLK_OLTBS_CONTRACT__CONTREFNO").value = parent.screenArgs["CONTREF"];
	    gAction= "EXECUTEQUERY";
	    fnExecuteQuery();
	  }
	//BUG#33393976 ends			 
	}
   	
	return true;
}
//OBCL 14.0 27353773 - customer 360 changes ends
/* OBCL_CSV_File_Upload_Changes :: Starts */
function dateFormat(existingFormat, neededFormat, existingSeperator, newSeperator, dateValue) {
    var exst = existingFormat.toLowerCase().split(existingSeperator);
    var d = dateValue.split(existingSeperator);
    d[exst[0]] = d[0];
    d[exst[1]] = d[1];
    d[exst[2]] = d[2];
    var newst = neededFormat.toLowerCase().split(newSeperator);
    newDate = d[newst[0]] + newSeperator + d[newst[1]] + newSeperator + d[newst[2]];
    return (newDate);
}

function fnCheckAnFocusSelectedRow(j) {
    getTableObjForBlock(blockId).tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked = false;
    getTableObjForBlock(blockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked = true;
    getTableObjForBlock(blockId).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].click();
    return true;
}

function fnResetUpload() {
    gDisableBrowseButton = true;
    blockId = "";//block id to upload the CSV file
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

function fnUpdateBlockLength() {
    if (blockId != undefined && blockId != '' && blockId != "") {
        currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));//current page of the block
        totPg = Number(getInnerText(document.getElementById("TotPage__" + blockId)));//total page of the block
        if (currPg != totPg) {
            Navigate(N_LAST, blockId);//navigate to last page, if the current page not equal to total page
        }
        pgSize = getPgSize(blockId);//page size to dispaly the datas
        totRow = 0;
        length = getTableObjForBlock(blockId).tBodies[0].rows.length;//current length of the block
        currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
        if (length > 0 && length != '' && length != "") {
            for (var idx = 0;idx < length;idx++) {
                totRow = (currPg - 1) * pgSize + idx + 1;//total row
            }
        }
    }
    return true;
}

function fnDeleteAllRowOfUpload() {
    if (blockId != undefined && blockId != '' && blockId != "") {
        fnUpdateBlockLength();
        var deleteCount = 1;
        var focusRow = 0;
        //delete rows, if the rows already have records in the block
        for (var index = 0;index < totRow;index++) {
            fnDeleteRow(blockId);
            deleteCount = deleteCount + 1;
            focusRow = totRow - deleteCount;
            if (totPg > 1) {
                focusRow = focusRow % pgSize;
            }
            if (focusRow > 1) {
                fnCheckAnFocusSelectedRow(focusRow);//focus to the selected row
            }
        }
        appendData();
    }
    return true;
}

function fnCloseAlertWin_ACCEPTOVERRIDE() {
    unmask();//unmasking the screen
    fnDeleteAllRowOfUpload();
    fnUpdateBlockLength();
    var uploadSuccess = fnProcessSchedulesUpload(csvRows);
    if (uploadSuccess) {
        fnUpdateBlockLength();
        if (totRow > 0 && uploadSuccess) {
            var backEndCall = fnBackEndCall();
            if (backEndCall) {
                fnResetUpload();//reset upload parameters
                return true;
            }
            else {
                fnResetUpload();//reset upload parameters
                return false;
            }
        }
    }
    else {
        if (errCode != null && errCode != '' && errCode != "") {
            fnUpdateBlockLength();//current length of block
            fnDeleteAllRowOfUpload();
            if (errParam != null && errParam != '' && errParam != "") {
                var alertMessage = fnBuildAlertMessage(errCode, "E", "", errParam);
            fnResetUpload();
                alert(alertMessage);//display error if upload fails
            }
            else {
                fnResetUpload();
                showErrorAlerts(errCode);//display error if upload fails
            }
            return false;
        }
    }
    customAlertAction = "";
    return true;
}

function fnExitAlertWin_ACCEPTOVERRIDE() {
    fnUpdateBlockLength();
    fnResetUpload();//reset upload parameters
    unmask();//unmasking the screen
    customAlertAction = "";
    return true;
}

function fnRepaySchedulesUploadValidation(rows) {
    for (var i = 0;i < 2;i++) {
        var cells = rows[i].split(",");
        if (cells.length > 1) {
            if (i == 0) {
                if (cells[0].toUpperCase() != '[Tranche Repayment Schedule Details]'.toUpperCase()) {
                    fnResetUpload();
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
            if (i == 1) {
                if ((cells[0].toUpperCase() != 'Start Date'.toUpperCase()) || (cells[1].toUpperCase() != 'End Date'.toUpperCase()) || (cells[2].toUpperCase() != 'Number of Schedules'.toUpperCase()) || (cells[3].toUpperCase() != 'Frequency'.toUpperCase()) || (cells[4].toUpperCase() != 'Unit'.toUpperCase()) || (cells[5].toUpperCase() != 'Schedule Percentage'.toUpperCase()) || (cells[6].toUpperCase() != 'Amount'.toUpperCase()) || (cells[7].toUpperCase() != 'Repayment Rule'.toUpperCase())) {
                    fnResetUpload();
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
        }
    }
    return true;
}

function fnRepaySchedulesUpload(e) {
    gDisableBrowseButton = false;
    blockId = "BLK_LBTBS_TRANCHE_SCHEDULE_INPUT";//block id to upload the CSV file
    fileUploadBtn = document.getElementById("BLK_LBTBS_TRANCHE_SCHEDULE_INPUT__BTN_REPAYSCH_UPLD");
    evnt = e;//onchange event
    if (gAction == 'NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_NEW' || gAction == 'SUBSYSPKP_MODIFY') {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;//file format parser
        if (regex.test(fileUploadBtn.value.toLowerCase())) {
            if (typeof (FileReader) != undefined) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var rows = e.target.result.split("\n");//csv file parser
                    var repaySchedulesVal = fnRepaySchedulesUploadValidation(rows);//header validations, system will validate first two rows
                    if (repaySchedulesVal) {
                        fnUpdateBlockLength();
                        if (totRow > 0) {
                            csvRows = rows;
                            customAlertAction = "ACCEPTOVERRIDE";
                            mask();//masking the screen
                            showErrorAlerts("LB-UPD-016", "O", "Tranche Repayment Schedules");
                            return false;
                        }
                        else {
                            var uploadSuccess = fnProcessSchedulesUpload(rows);//process upload schedules
                            if (uploadSuccess) {
                                fnUpdateBlockLength();//current length of block
                                if (totRow > 0 && repaySchedulesVal) {
                                    var backEndCall = fnBackEndCall();//back end call to validate uploaded schedules
                                    if (backEndCall) {
                                        fnResetUpload();//reset upload parameters
                                        return true;
                                    }
                                    else {
                                        fnResetUpload();//reset upload parameters
                                        return false;
                                    }
                                }
                            }
                            else {
                                if (errCode != null && errCode != '' && errCode != "") {
                                    fnUpdateBlockLength();//current length of block
                                    fnDeleteAllRowOfUpload();
                                    if (errParam != null && errParam != '' && errParam != "") {
                                        var alertMessage = fnBuildAlertMessage(errCode, "E", "", errParam);
                                    fnResetUpload();
                                        alert(alertMessage);//display error if upload fails
                    }
                    else {
                                        fnResetUpload();//reset upload parameters
                                        showErrorAlerts(errCode);//display error if upload fails
                                    }
                                    return false;
                                }
                            }
                        }
                    }
                    else {
                        fnResetUpload();//reset upload parameters
                        showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file.");
                        return false;
                    }
                }
                reader.readAsText(fileUploadBtn.files[0]);
            }
            else {
                fnResetUpload();//reset upload parameters
                showErrorAlerts("LB-UPD-015");//alert("This browser does not support CSV upload.");
                return false;
            }
        }
        else {
            fnResetUpload();//reset upload parameters
            showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file.");
            return false;
        }
    }
    else {
        fnResetUpload();//reset upload parameters
        showErrorAlerts("LB-UPD-014");//alert("CSV file Upload is not supported for this operation");
        return false;
    }
    gDisableBrowseButton = true;
    return true;
}

function fnSchedulesUploadValidation(rows) {
    for (var i = 0;i < 2;i++) {
        var cells = rows[i].split(",");
        if (cells.length > 1) {
            if (i == 0) {
                if (cells[0].toUpperCase() != '[Fee Schedule Details]'.toUpperCase()) {
                    fnResetUpload();
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
            if (i == 1) {
                if ((cells[0].toUpperCase() != 'Schedule Type'.toUpperCase()) || (cells[1].toUpperCase() != 'Component'.toUpperCase()) || (cells[2].toUpperCase() != 'Start Date'.toUpperCase()) || (cells[3].toUpperCase() != 'End Date'.toUpperCase()) || (cells[4].toUpperCase() != 'Number of Schedules'.toUpperCase()) || (cells[5].toUpperCase() != 'Frequency'.toUpperCase()) || (cells[6].toUpperCase() != 'Unit'.toUpperCase()) || (cells[7].toUpperCase() != 'Percentage'.toUpperCase()) || (cells[8].toUpperCase() != 'Amount'.toUpperCase()) || (cells[9].toUpperCase() != 'Local Currency Eqvt For Index Loans'.toUpperCase())) {
                    fnResetUpload();
                    errCode = 'LB-UPD-013';//alert("Please upload a valid CSV file.");
                    return false;
                }
            }
        }
    }
    return true;
}

function fnBackEndCall() {
    g_prev_gAction = gAction;
    document.getElementById("BLK_OLTBS_CONTRACT__ORGACTCOD").value = gAction;
    if (blockId == "BLK_OLTBS_CONTRACT_SCHEDULES") {
        gAction = 'FEESCHUPLD';
    }
    else {
        gAction = 'REPAYSCHUPLD';
    }
    appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml();//requestDOM
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);//responseDOM
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = "";
        if (msgStatus == "FAILURE") {
            messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
            messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    setDataXML(getXMLString(pureXMLDOM));
    showData(dbStrRootTableName, 1);
    var returnVal = "";
    if (msgStatus == "FAILURE") {
        //delete all rows if message status is 'FAILURE'
        fnDeleteAllRowOfUpload();
        fnResetUpload();//reset upload parameters
        gAction = g_prev_gAction;
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    else if (msgStatus == "WARNING") {
        fnResetUpload();//reset upload parameters
        gAction = g_prev_gAction;
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'O');
        return true;
    }
    else if (msgStatus == "SUCCESS") {
        fnResetUpload();//reset upload parameters
        gAction = g_prev_gAction;
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    }
    return true;
}

function fnProcessSchedulesUpload(rows) {
    var rowCheck = true;//row availability check
    var rowsLength = rows.length - 1;
    for (var i = 2 + length;i < rowsLength + length;i++) {
        //row iteration
        var currIdx = i - 1;//current index of the row in block
        var row = currIdx % pgSize;
        var multiplesPgSize = Math.floor(currIdx / pgSize);
        if ((row == 0) && (multiplesPgSize != 0)) {
            row = pgSize;
        }
        try {
            if (getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) {
                rowCheck = false;//if rowCheck flag is false then, system will not allow to add new row
            }
            if ((rowCheck) || (multiplesPgSize >= 1 && row == 1)) {
                fnAddRow(blockId);//add new row to upload CSV file datas
                appendData();
                fnCheckToggleChkBox(blockId);
                checkAnFocusSelectedRow(blockId);//check and focus to the current row
            }
        }
        catch (e) {
            fnAddRow(blockId);//add new row to upload CSV file datas
            appendData();
            fnCheckToggleChkBox(blockId);
            checkAnFocusSelectedRow(blockId);//check and focus to the current row
        }
        var cells = rows[i - length].split(",");//cells split logic in rows
        if (cells.length > 1) {
            if ((getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[0].getElementsByTagName("INPUT")[0]) && (rowCheck)) {
                for (var j = 0;j < cells.length - 1;j++) {
                    //cells iteration of current row
                    if (cells[j] == '~END~') {
                        //last cell value in current row
                        continue;//if last cell value is '~END~' then, system will skip current row and continue to the next row      
                    }
                    if (cells[j] != "" && cells[j] != '~END~') {
                        var currObject = getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-select-single")[0];
                        var firstCellHeader = "";
                        var firstCellValue = "";
                        var currentCellHeader = "";
                        if (currObject == undefined) {
                            currObject = getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("oj-input-text")[0];
                            if (currObject == undefined) {
                                currObject = getTableObjForBlock(blockId).tBodies[0].rows[row - 1].cells[j + 1].getElementsByTagName("TEXTAREA")[0];
                            }
                            if (currObject.getAttribute("data_type") == "DATE") {
                                //current object type is 'DATE'
                                currObject.value = dateFormat('mm/dd/yyyy', 'yyyy-mm-dd', '/', '-', cells[j]);//date format parser
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else if ((currObject.type == "hidden") && (currObject.getAttribute("onpropertychange") == "displayFormattedNumber(this)")) {
                                if(blockId=="BLK_OLTBS_CONTRACT_SCHEDULES"){
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 1);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 1);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                }else{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);                                                                        
                                }
                                //process for number validation, if the current object is number
                                var validateNumber = validateCSVUploadNumber(currObject, cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                if (validateNumber && gIsValid) {
                                    currObject.value = cells[j];
                                    fireHTMLEvent(currObject, 'onpropertychange');
                                }
                                else {
                                    return false;
                                }
                            }
                            else if ((currObject.type == "hidden") && (getOuterHTML(currObject).indexOf("displayAmount") !=  - 1)) {
                                if(blockId=="BLK_OLTBS_CONTRACT_SCHEDULES"){
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 1);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 1);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);
                                }else{
                                    firstCellHeader = fnGetHeaderDetails(rows, 1, 0);
                                    firstCellValue = fnGetHeaderDetails(rows, i - length, 0);
                                    currentCellHeader = fnGetHeaderDetails(rows, 1, j);                                                                        
                                }
                                //process for number validation, if the current object is number
                                var validateAmount = fnValidateCSVUploadAmount(currObject.getAttribute("name"), currObject.getAttribute("related_ccy"), cells[j], currentCellHeader, firstCellValue, firstCellHeader, getNextSibling(getNextSibling(currObject)));
                                if (validateAmount && gIsValid) {
                                    var validateAmtRange = fnValidateCSVUploadNumberRange(getNextSibling(getNextSibling(currObject)), cells[j], currentCellHeader, firstCellValue, firstCellHeader);
                                    if (validateAmtRange && gIsValid) {
                                        currObject.value = cells[j];
                                        fireHTMLEvent(currObject, 'onpropertychange');
                                    }
                                    else {
                                        return false;
                                    }
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (currObject.type == "checkbox") {
                                //current object type is 'CHECKBOX'
                                currObject.value = cells[j];
                                if (currObject.value == 'Y') {
                                    currObject.value = true;
                                }
                                else {
                                    currObject.value = false;
                                }
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                            else {
                                currObject.value = cells[j];
                                fireHTMLEvent(currObject, 'onpropertychange');
                            }
                        }
                        else {
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

function fnSchedulesUpload(e) {
    gDisableBrowseButton = false;
    blockId = "BLK_OLTBS_CONTRACT_SCHEDULES";//block id to upload the CSV file
    fileUploadBtn = document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD");
    evnt = e;//onchange event
    if (gAction == 'NEW' || gAction == 'MODIFY') {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;//file format parser
        if (regex.test(fileUploadBtn.value.toLowerCase())) {
            if (typeof (FileReader) != undefined) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var rows = e.target.result.split("\n");//csv file parser
                    var schedulesVal = fnSchedulesUploadValidation(rows);//header validations, system will validate first two rows
                    if (schedulesVal) {
                        fnUpdateBlockLength();
                        if (totRow > 0) {
                            csvRows = rows;
                            customAlertAction = "ACCEPTOVERRIDE";
                            mask();//masking the screen
                            showErrorAlerts("LB-UPD-016", "O", "Fee Schedules");
                            return false;
                        }
                        else {
                            var uploadSuccess = fnProcessSchedulesUpload(rows);//process upload schedules
                            if (uploadSuccess) {
                                fnUpdateBlockLength();//current length of block
                                if (totRow > 0 && schedulesVal) {
                                    var backEndCall = fnBackEndCall();//back end call to validate uploaded schedules
                                    if (backEndCall) {
                                        fnResetUpload();//reset upload parameters
                                        return true;
                                    }
                                    else {
                                        fnResetUpload();//reset upload parameters
                                        return false;
                                    }
                                }
                            }
                            else {
                                if (errCode != null && errCode != '' && errCode != "") {
                                    fnUpdateBlockLength();//current length of block
                                    fnDeleteAllRowOfUpload();
                                    if (errParam != null && errParam != '' && errParam != "") {
                                        var alertMessage = fnBuildAlertMessage(errCode, "E", "", errParam);
                                    fnResetUpload();
                                        alert(alertMessage);//display error if upload fails
                    }
                    else {
                                        fnResetUpload();//reset upload parameters
                                        showErrorAlerts(errCode);//display error if upload fails
                                    }
                                    return false;
                                }
                            }
                        }
                    }
                    else {
                        fnResetUpload();//reset upload parameters
                        showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file.");
                        return false;
                    }
                }
                reader.readAsText(fileUploadBtn.files[0]);
            }
            else {
                fnResetUpload();//reset upload parameters
                showErrorAlerts("LB-UPD-015");//alert("This browser does not support CSV upload.");
                return false;
            }
        }
        else {
            fnResetUpload();//reset upload parameters
            showErrorAlerts("LB-UPD-013");//alert("Please upload a valid CSV file.");
            return false;
        }
    }
    else {
        fnResetUpload();//reset upload parameters
        showErrorAlerts("LB-UPD-014");//alert("CSV file Upload is not supported for this operation");
        return false;
    }
    gDisableBrowseButton = true;
    return true;
}

function fnGetHeaderDetails(rows, i, j) {
    var cells = rows[i].split(",");
    if (cells.length > 1) {
        if (i == 0) {
            return cells[j];//returns upload CSV header.
        }
        if (i >= 1) {
            return cells[j];//returns current cell header for display
        }
    }
    return null;
}

function getSum(total, num) {
    return total + num;
}

function fnBuildAlertMessage(alertCode, type, message, replaceString) {
    if (typeof (message) == "undefined" || (typeof (message) != "undefined" && message == "")) {
        var alertCodes = alertCode.split("~");
        message = "";
        for (var i = 0;i < alertCodes.length;i++) {
            if (alertCodes[i] != "") {
                var tempmessage = mainWin.getCommonErrorList()[alertCodes[i]];
                if (tempmessage == undefined) {
                    message += mainWin.getItemDesc("LBL_UNKNOWN_ERROR") + "~";
                }
                else {
                    if (typeof (replaceString) != "undefined") {
                        replaceString = replaceString + "";
                        var replaceStr = replaceString.split("~");
                        for (var j = 0;j < replaceStr.length;j++) {
                            if (replaceStr[j] != "") {
                                var findReplaceStr = '$' + getSum(j, 1);
                                tempmessage = tempmessage.replace(findReplaceStr, replaceStr[j]);
                                //tempmessage = tempmessage.replace('{0}', replaceStr[j]);
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

function validateCSVUploadNumber(dispNumField, dispNumFieldValue, currentCellHeader, firstCellValue, firstCellHeader) {
    var arrNumComponents = "";
    if (dispNumFieldValue == "") {
        return true;
    }
    if (gDecimalSymbol != ".") {
        arrNumComponents = dispNumFieldValue.match(new RegExp(gDecimalSymbol, 'g'));
    }
    else {
        arrNumComponents = dispNumFieldValue.match(/\./g);
    }
    if (arrNumComponents != null && (arrNumComponents.length > 1)) {
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
    if (enteredVal.split(gDecimalSymbol)[1] != undefined) {
        var digitsAftrDecimal = enteredVal.split(gDecimalSymbol)[1].replace(pattern, "");
        enteredVal = digitsBfreDecimal + gDecimalSymbol + digitsAftrDecimal;
    }
    else {
        enteredVal = digitsBfreDecimal;
    }
    //Changes for formatting number end
    if (!checkNumberValidation(enteredVal) || ((enteredVal.indexOf(" ") !=  - 1))) {
        //CHANGED
        errCode = 'LB-UPD-022';
        errParam = dispNumFieldValue + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    var hidNumField = getNextSibling(getNextSibling(dispNumField));
    if (dispNumFieldValue != "") {
        updatedValue = enteredVal;
        //Changes for formatting number start
        if (hidNumField.value != updatedValue) {
            var validateNumberRange = fnValidateCSVUploadNumberRange(hidNumField, dispNumFieldValue, currentCellHeader, firstCellValue, firstCellHeader);
            if (validateNumberRange) {
                return true;
            }
            else {
                return false;
            }

        }
    }
    return true;
}

function fnValidateCSVUploadNumberRange(v_NumberFld, v_NumberFldValue, currentCellHeader, firstCellValue, firstCellHeader) {
    var noBefDecimals = "";
    var maxBefDecimal = "";
    var maxLen = "";
    /*if (getOuterHTML(v_NumberFld).indexOf("validateInputAmount") ==  - 1 && getOuterHTML(v_NumberFld).indexOf("processAmount") ==  - 1) {
        if (v_NumberFldValue != "")
            v_NumberFldValue = Number(v_NumberFldValue);
    }*/
    if (v_NumberFld.type == "checkbox")
        return true;
    if (!v_NumberFld || v_NumberFldValue == '')
        return true;
    var valueEntered = v_NumberFldValue;
    var maxVal = v_NumberFld.getAttribute("MAX_VAL");
    var minVal = v_NumberFld.getAttribute("MIN_VAL");
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');//added newly
    if (!isNumericValidation(valueEntered) || (valueEntered.indexOf(" ") !=  - 1 && gDigitGroupingSymbol != " " && gDecimalSymbol != " ")) {
        errCode = 'LB-UPD-022';
        errParam = v_NumberFldValue + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        return false;
    }
    if (valueEntered.indexOf(gDecimalSymbol) ==  - 1) {
        if (!isNaN(parseInt(minVal))) {
            if (parseInt(valueEntered) < parseInt(minVal)) {
                errCode = 'LB-UPD-019';
                errParam = minVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseInt(valueEntered) > parseInt(maxVal)) {
                errCode = 'LB-UPD-018';
                errParam = maxVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        noBefDecimals = valueEntered.length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                errCode = 'LB-UPD-021';
                errParam = maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) > maxLen) {
                errCode = 'LB-UPD-021';
                errParam = maxLen + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
    }
    else {
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"))) {
                //var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                errCode = 'LB-UPD-020';
                errParam = v_NumberFld.getAttribute("MAX_DECIMALS") + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
            }
        }
        noBefDecimals = valueEntered.substring(0, valueEntered.indexOf(".")).length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1")) - parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                errCode = 'LB-UPD-021';
                errParam = ":" + maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) - 1 > maxLen) {
                errCode = 'LB-UPD-021';
                errParam = ":" + maxBefDecimal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(minVal))) {
            if (parseFloat(valueEntered) < parseFloat(minVal)) {
                errCode = 'LB-UPD-019';
                errParam = minVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseFloat(valueEntered) > parseFloat(maxVal)) {
                errCode = 'LB-UPD-018';
                errParam = maxVal + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                gIsValid = false;
                return false;
            }
        }
    }
    return true;
}

function fnValidateCSVUploadAmount(idAmount, idCCY, curInpElemValue, currentCellHeader, firstCellValue, firstCellHeader, curInpElem) {
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
    else {
        var singleView = false;
        if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
            singleView = true;
        }
        if (curInpElem.parentNode.tagName.toUpperCase() == "DIV") {
            singleView = true;
        }
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            isMEBlock = isMultipleEntry(blockName);
            if (isMEBlock == 'true' && !singleView) {
                //Block is a multiple entry
                rowNo =  - 1;
                rowIndex = fnSingleCheck(blockName);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                ccy = getElementsByOjName(ccyFieldName)[rowNo].value;
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
            }
        }
        else {
            //Block is not part of the idCCY
            blockName = curInpElem.id.substring(0, curInpElem.id.lastIndexOf("__"));
            isMEBlock = isMultipleEntry(blockName);
            if (isMEBlock == 'true' && !singleView) {
                //Block is a multiple entry
                rowNo =  - 1;
                rowIndex = fnSingleCheck(blockName);
                if (rowIndex == 0 || rowIndex ==  - 1)
                    rowNo = 0;
                else 
                    rowNo = rowIndex - 1;

                var tableObj = getTableObjForBlock(blockName);
                if (tableObj) {
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("oj-input-text");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idCCY) {
                                ccy = inputElements[j].value;
                                break;
                            }
                        }
                        if (ccy != "")
                            break;
                    }
                }
                if (ccy == "") {
                    if (getElementsByOjName(idCCY).length > 0) {
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
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
                else {
                    if (getElementsByOjName(idCCY).length > 0) {
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

    if (ccy == "" && inpAmount != "") {
        errCode = 'LB-UPD-024';
        errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
        gIsValid = false;
        isfromscreen = false;
        return false;
    }
    if (!mainWin.g_objCcy[ccy]) {
        isfromscreen = false;
        return false;
    }
    if (inpAmount && inpAmount != "") {
        fnMB3CSVUploadAmount(inpAmount, true, ccy, currentCellHeader, firstCellValue, firstCellHeader);
        if (isValid()) {
            isformat = false;
            isformat = true;
            var inpElemId = curDataBoundElem.name + "I";
            var inpElem;
            if (curDataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || curDataBoundElem.parentNode.tagName.toUpperCase() == "DIV")
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode.parentNode, inpElemId);
            else 
                inpElem = getInpElem(curDataBoundElem.parentNode.parentNode, inpElemId);
            if (inpElem && inpElem.getAttribute("MAXLENGTH1")) {
                if (inpAmount && inpAmount != "") {
                    var tmp = inpAmount;
                    if (inpAmount.lastIndexOf(gDecimalSymbol) !=  - 1)
                        tmp = inpAmount.substring(0, inpAmount.lastIndexOf(gDecimalSymbol));
                    tmp = replaceAllChar(tmp, gDigitGroupingSymbol, "");
                    tmp = replaceAllChar(tmp, gNegativeSymbol, "");
                    if (tmp.length > inpElem.getAttribute("MAXLENGTH1")) {
                        errCode = 'LB-UPD-021';
                        errParam = inpElem.getAttribute("MAXLENGTH1") + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                        gIsValid = false;
                        return false;
                    }
                }
            }
        }
        else {
            gIsValid = false;
            return false;
        }

    }
    else {
        if (curDataBoundElem.value != '')
            curDataBoundElem.value = '';
    }
    isfromscreen = false;
    isformat = false;
    return true;
}

function fnMB3CSVUploadAmount(amt, isInputAmt, ccy, currentCellHeader, firstCellValue, firstCellHeader) {
    var tmpAmt;
    var amountSpecifier = "";
    var arrAmtComponents;
    var negativeSymbol = "-";
    var decimalSymbol = ".";
    var digitGroupingSymbol = ",";
    var newAmountFormat = mainWin.nlsAmountFormat;
    var dbdecimalSymbol = newAmountFormat.substr(0, 1);
    if (isInputAmt) {
        negativeSymbol = gNegativeSymbol;
        decimalSymbol = gDecimalSymbol;
        digitGroupingSymbol = gDigitGroupingSymbol;
    }
    if (ccy != null && ccy != "") {
        ccy = doTrim(ccy);
    }
    if (isValid()) {
        if (amt == null || amt == "") {
            tmpAmt = "0" + decimalSymbol + "0";
        }
        else {
            tmpAmt = doTrim(amt);
            if (tmpAmt == null || tmpAmt == "") {
                tmpAmt = "0" + decimalSymbol + "0";
            }
        }
    }

    if (isValid()) {
        if (cAmountSpecifiers.indexOf(tmpAmt.toUpperCase().substr(tmpAmt.length - 1)) >  - 1) {
            amountSpecifier = tmpAmt.toUpperCase().substr(tmpAmt.length - 1);
            tmpAmt = tmpAmt.substr(0, tmpAmt.length - 1);
        }
        if (tmpAmt.substr(0, 1) == negativeSymbol) {
            negativeNum = true;
            tmpAmt = tmpAmt.substr(1);
        }
        if (!isfromscreen) {
            tmpAmt = replaceAllChar(tmpAmt, dbdecimalSymbol, decimalSymbol);
        }
        tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
        if (digitGroupingSymbol.charCodeAt(0) == 160) {
            digitGroupingSymbol = digitGroupingSymbol.replace(String.fromCharCode(digitGroupingSymbol.charCodeAt(0)), " ");
            tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
        }
        if (tmpAmt.indexOf('E') !=  - 1) {
            tmpAmt = tmpAmt * 1 + "";
        }
        arrAmtComponents = tmpAmt.split(decimalSymbol);
        if ((arrAmtComponents.length != 1) && (arrAmtComponents.length != 2)) {
            //displayMsg("ST-COM009");
            errCode = 'LB-UPD-025';
            errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
            valid = false;
            return false;
        }
    }
    if (isValid()) {
        for (var tmpIndex = 0;tmpIndex < arrAmtComponents.length;tmpIndex++) {
            if (!containsOnlyDigits(arrAmtComponents[tmpIndex])) {
                //displayMsg("ST-COM010");
                errCode = 'LB-UPD-026';
                errParam = currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                valid = false;
                return false;
            }
        }
    }
    if (isValid()) {
        if (arrAmtComponents.length == 1) {
            arrAmtComponents[1] = "0000000000000000000000000000000000000000000000000000";
        }
        else {
            arrAmtComponents[1] += "0000000000000000000000000000000000000000000000000000";
        }
        if (amountSpecifier == cThousandSpecifier) {
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 3);
            arrAmtComponents[1] = arrAmtComponents[1].substr(3);

        }
        else if (amountSpecifier == cMillionSpecifier) {
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 6);
            arrAmtComponents[1] = arrAmtComponents[1].substr(6);
        }
        else if (amountSpecifier == cBillionSpecifier) {
            arrAmtComponents[0] += arrAmtComponents[1].substr(0, 9);
            arrAmtComponents[1] = arrAmtComponents[1].substr(9);
        }
        if (isInputAmt) {
            var discardableVal = arrAmtComponents[1].substr(getNumDigitsAfterDecimal(ccy));
            if (parseInt(discardableVal, 10) > 0) {
                //displayMsg("ST-COM011", ccy + "~");
                errCode = 'LB-UPD-027';
                errParam = ccy + "~" + currentCellHeader + "~" + firstCellValue + " " + firstCellHeader;
                valid = false;
                return false;

            }
            else {
                arrAmtComponents[1] = arrAmtComponents[1].substr(0, getNumDigitsAfterDecimal(ccy));
            }
        }
        if (isInputAmt) {
            if (arrAmtComponents[0].length == 0) {
                arrAmtComponents[0] = "0";
            }
            while (arrAmtComponents[0].length > 1) {
                if (arrAmtComponents[0].substr(0, 1) == "0") {
                    arrAmtComponents[0] = arrAmtComponents[0].substr(1);
                }
                else {
                    break;
                }
            }
        }
    }
    if (isValid()) {
        amt = arrAmtComponents.join(decimalSymbol);
        ccy = ccy;
    }
    return valid;
}

function isValid() {
    return valid;
}

function fnSingleCheck(ccyBlockId) {
    var selected_row = 0;
    var msob_tchk = 0;
    var currRowIndex = 0;
    len = getTableObjForBlock(ccyBlockId).tBodies[0].rows.length;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock(ccyBlockId).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (getTableObjForBlock(ccyBlockId).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }
        }
        else 
            break;
    }
    return currRowIndex + 1;
}

function fnDisableUploadBtnElement(object) {
    object.disabled = true;
    object.readOnly = true;
    object.className = "TXTro";
    return true;
}

function fnEnableUploadBtnElement(object) {
    object.disabled = false;
    object.readOnly = false;
    object.className = "TXTstd";
    return true;
}

function fnPostFocus_KERNEL() {
    var onceAuth = document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value;
	
    if (((gAction == 'NEW') || (gAction == 'MODIFY')) && gDisableBrowseButton) {
        if ((selectNodes(dbDataDOM, "//BLK_LFTBS_CONTRACT_FEE_MULTI").length > 0) && (onceAuth == 'N') ) {
            fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD"));
        }
        else {
            fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD"));
        }
        fnEnableElement(document.getElementById("BLK_LBTBS_TRANCHE_SCHEDULE_INPUT__BTN_REPAYSCH_UPLD"));
    }
    else {
        fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_SCHEDULES__BTN_SCH_UPLD"));
        fnDisableElement(document.getElementById("BLK_LBTBS_TRANCHE_SCHEDULE_INPUT__BTN_REPAYSCH_UPLD"));
    }
	/*
	//start: Bug#33442741
	if (gAction == 'MODIFY'&& onceAuth == 'Y') {
		console.log('in fnPostFocus_KERNEL');
		fnDisableScreenElement("TAB_TRCSCH__SEC_1"); 	
		fnDisableScreenElement("TAB_TRCSCH__SEC_2"); 
		fnDisableScreenElement("TAB_TRCSCH__SEC_3"); 
		fnDisableUploadBtnElement(document.getElementById("BLK_LBTBS_TRANCHE_SCHEDULE_INPUT__BTN_REPAYSCH_UPLD"));	
		}
	//end: Bug#33442741
	*/ //Bug#33442741 reverted
    return true;
}
/* OBCL_CSV_File_Upload_Changes :: Ends */
