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
**  File Name          : OLDMSCDT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**  Changed By         : Vigneshram S
**  Date               : 30-JAN-2018
**  Change Description : Validate on unlock in OLDMSCDT when modified from other screens.
**  Search String      : OBCL_14.0_27459748 

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**  Last Modified By   : Abhinav Kumar
**  Last modified on   : 17-July-2020
**  Reason             : Auth Status Not Updated Correctly on Unlocking a Record
**  Search String      : OBCL_14.4_SUPPORT_BUG#31633576
****************************************************************************************************************************/
function fnPreAuthorize_KERNEL() {
    authFunction   = 'OLDMSCAU';
    authUixml      = 'OLDMSCAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDMSCAU']="KERNEL";
    ArrPrntFunc['OLDMSCAU'] = "";
    ArrPrntOrigin['OLDMSCAU'] ="";
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
//OFCL_12.3.0.0.0_25038677 changes starts
function fnPostExecuteQuery_KERNEL() {
/*If (document.getElementById(BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTA) == 'A')
{
document.getElementById("Authorize").style.visibility = 'hidden';
} */
DisableToolbar_buttons("Close");
EnableDisableAuthBtn();
return true;
}

function EnableDisableAuthBtn()
{
  //if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTA").value == "A")    //OBCL_14.4_SUPPORT_BUG#31633576
  if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTAT").value == "A")	  //OBCL_14.4_SUPPORT_BUG#31633576
{
DisableToolbar_buttons("Reverse");
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
  //if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTA").value == "U")  //OBCL_14.4_SUPPORT_BUG#31633576
  if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTAT").value == "U")   //OBCL_14.4_SUPPORT_BUG#31633576
{
DisableToolbar_buttons("Reverse");
EnableToolbar_buttons("Authorize");
}
return true;
}

//OFCL_12.3.0.0.0_25038677 changes ends


//OBCL_14.0_27459748 Changes start
function fnPreUnlock_KERNEL(){
	var PCode = (document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value);
	var ProcessCode = PCode.substring(PCode.length - 4);
	var UnauthFunctionId;
	if (PCode != 'LDMSC'){
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
		else if(PCode == 'OLDLNKAM')
		{
			UnauthFunctionId ='OLDLNKAM';
		}
		else if(ProcessCode == 'AMND')
		{
			UnauthFunctionId ='OLDVAMND';
		}
		else {
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
            }
		}
		//OBCL_14.4_SUPPORT_BUG#31527262 start
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERID").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERDTSTAMP").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERID").value = "";
	    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERDTSTAMP").value = "";
	    //OBCL_14.4_SUPPORT_BUG#31527262 end
	return true;
}
//OBCL_14.0_27459748 Changes end