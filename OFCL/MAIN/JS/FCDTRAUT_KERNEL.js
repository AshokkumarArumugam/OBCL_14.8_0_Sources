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
**  File Name          : FCDTRAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   :
**  Last modified on   : 
**  Search String      :  
**  Reason             : 
**
**  Last Modified By   : Prakash Ravi
**  Last modified on   : 07-May-2020
**  Search String      : OBCL_14.1_SUPPORT_BUG#31101361
**  Reason             : Re-key field(s) value becomes non-editable when press ToggleAllOrNone checkbox in Change Log/Overrides multigrid
						 Re-key field(s) value vanishes when press Navigate button in Change Log
**
**  Last Modified By   : Pallavi R
**  Last modified on   : 06-Feb-2025
**  Search String      : OBCL_14.7_RABO_#37547099 Changes
**  Reason             : Added code to enable confirmed checkbox.
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_FAC_AUTH_KERNEL(screenArgs) {
	setTimeout( function () {  //Redwood_changes_1
    subScreen = 'Y';

    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_HEADER__BTN_AUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_CCY"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_AMOUNT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_VALUEDATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_MATURITYDATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_COUNTERPARTY")); 
	 	
	//gAction = 'AUTH'; //OBCL_14.1_SUPPORT_BUG#31101361 
   //OBCL_14.7_RABO_#37547099 Changes Starts
	 var rowRef =document.getElementById("BLK_CONTRACT_OVD").tBodies[0].rows;  
      for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(document.getElementById("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("INPUT")[0]);
      }
	//OBCL_14.7_RABO_#37547099 Changes Ends
	gAction = 'NEW'; //OBCL_14.1_SUPPORT_BUG#31101361 
					 //Handled the AUTH in fnPreNavigate function.
	 },0); //Redwood_changes_1
	 
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	   DisableToolbar_buttons("Authorize");
	   var s = document.getElementById("BLK_HEADER__CONTRACT_REF_NO1").value;
       fnEnableElement(document.getElementById("BLK_HEADER__BTN_AUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_CCY"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_AMOUNT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_VALUEDATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_MATURITYDATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXT_COUNTERPARTY")); 
	  
	 
 return true;
}

function FN_ONAUTH(){
    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_HEADER__BTN_AUTH"));        
			disableForm();
		}	
        return true;
    }
}

//OBCL_14.1_SUPPORT_BUG#31101361 Starts
function fnPreNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction="";
    return true;
}

function fnPostNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction='AUTH';
	fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXT_VALUEDATE"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXT_MATURITYDATE"));    
	fnEnableElement(document.getElementById("BLK_HEADER__TXT_COUNTERPARTY"));
    return true;
}
//OBCL_14.1_SUPPORT_BUG#31101361 Ends