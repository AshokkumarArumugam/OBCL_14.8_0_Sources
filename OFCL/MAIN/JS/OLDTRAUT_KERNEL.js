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
**  File Name          : OLDTRAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 08-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25045972 
**  Reason             : Added Custom function call to launch CallForm so that UI field value can be set
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 10-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25073643  
**  Reason             : Changed the RAD and renamed the blocks etc
**  Last Modified By   : Ravi Ranjan 
**  Last modified on   : 21-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25049289  
**  Reason             : Added Counterparty field for enabel

**  Last Modified By   : Shishirkumar Aithal
**  Last modified on   : 24-JAN-2018
**  Search String      : BUG#27205589  
**  Reason             : CAMD UDF CHANGE AUTH SCREEN DOESNOT SHOW CHANGES IN 2ND PAGE

**  Last Modified By   : Divya J
**  Last modified on   : 19-Aug-2019
**  Search String      : OBCL_14.1_SUPPORT_BUG#30177773
**  Reason             : USER NOT ABLE TO INPUT REKEY FIELDS IN OLDTRONL

**  Last Modified By   : Manivel Ganesan
**  Last modified on   : 17-Apr-2020
**  Search String      : OBCL_14.3_SUPPORT_BUG#31129011
**  Reason             : Re-key field(s) value becomes non-editable when press ToggleAllOrNone checkbox in Change Log/Overrides multigrid
						 Re-key field(s) value vanishes when press Navigate button in Change Log

**  Last Modified By   : Mohan Pal
**  Last modified on   : 01-Feb-2022
**  Search String      : BUG#33803920
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  Last Modified By   : Aishwarya Sekar
**  Last modified on   : 24-Mar-2022
**  Search String      : OBCL_14.5_SUPPORT_BUG#33992403
**  Reason             : Added code to enable confirmed checkbox.

**  Last Modified By   : Mohan Pal
**  Last modified on   : 11-May-2023
**  Search String      : Bug#35326704
**  Reason             : To enable pagination for the Block related to Amount Tag. Previously g_action was going as NEW.similar fix 31129011

**  **  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	setTimeout( function () {  //Redwood_changes_1
    subScreen = 'Y';
//OFCL_12.3.0.0.0_25073643 changes starts
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   if (document.getElementById("BLK_HEADER__REKEY_TXTCCY").value =='Y') { //Bug#33803920 added If condition
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	   }
	   if (document.getElementById("BLK_HEADER__REKEY_TXTAMOUNT").value =='Y') { //Bug#33803920 added If condition
	   //fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNTI")); //Bug#34958820
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT")); //Bug#34958820
	   
	   }
	   if (document.getElementById("BLK_HEADER__REKEY_TXTVALDT").value =='Y') { //Bug#33803920 added If condition
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   }
	   if (document.getElementById("BLK_HEADER__REKEY_TXTMATDT").value =='Y') { //Bug#33803920 added If condition
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
	   }
	   //fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATEI")); //Bug#34958820
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATE")); //Bug#34958820
	   fnEnableElement(document.getElementById("BLK_HEADER__LSTINTRTSIGN"));        
      if (document.getElementById("BLK_HEADER__REKEY_INTRT").value =='Y') { //Bug#33803920 added If condition	   
	   //fnEnableElement(document.getElementById("BLK_HEADER__INTRTI"));  //Bug#34958820
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));  //Bug#34958820
	  }
	  if (document.getElementById("BLK_HEADER__REKEY_TXTCOUNTERPARTY").value =='Y') { //Bug#33803920 added If condition
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY")); //OFCL_12.3.0.0.0_25049289
	  }
	   //OFCL_12.3.0.0.0_25045972 changes starts
	//gAction = 'NEW';	
	//gAction = 'AUTH'; //BUG#27205589
	   //OFCL_12.3.0.0.0_25045972 changes ends
	   gAction = 'NEW'; //OBCL_14.3_SUPPORT_BUG#31129011 
					 //Enabled the commented line gAction = 'NEW' in order to fix rekey field(s) value non-editable issue (BUG#31129011).
					 //Handled the BUG#27205589,BUG#25045972 issue in fnPreNavigate function.
	  //OBCL_14.5_SUPPORT_BUG#33992403 Start

	//Bug#36619894_1 changes starts						 
	//var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_CONTRACT_OVD");
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
      }
	  //OBCL_14.5_SUPPORT_BUG#33992403 End
	  },0); //Redwood_changes_1
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	   DisableToolbar_buttons("Authorize");
	   var s = document.getElementById("BLK_HEADER__CONTRACTREFNO1").value;
       fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__LSTINTRTSIGN"));        
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY")); //OFCL_12.3.0.0.0_25049289
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNSETLINFO")); //OFCL_12.3.0.0.0_25045972 changes
	 
 return true;
}

function Fn_OnAuth(){
    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_HEADER__BTNAUTH"));        
			disableForm();
		}	
				//BUG#27881109 starts
	if (l_msgStat == 'FAILURE') {
		gAction = gprev ;
		}
		//BUG#27881109 ends 
        return true;
    }
}

//OFCL_12.3.0.0.0_25045972 changes starts
function fnSettleInfo(){
	gAction="";//Bug#35326704 ADDED
	fnSubScreenMain('OLCSTINF','','CVS_SETTLEMENTINFO');
	document.getElementById("BLK_HEADER__VISITED_UI").value = 'Y';
	return true;
}
//OFCL_12.3.0.0.0_25045972 changes ends
//OFCL_12.3.0.0.0_25073643 changes ends

//OBCL_14.1_SUPPORT_BUG#30177773 Starts
function fnPostRow_onClick_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {
       var s = document.getElementById("BLK_HEADER__CONTRACTREFNO1").value;
       fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__LSTINTRTSIGN"));        
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY")); 
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNSETLINFO")); 
	 
}
function fnPostRow_onClick_BLK_CONTRACT_OVD_KERNEL() {
       var s = document.getElementById("BLK_HEADER__CONTRACTREFNO1").value;
       fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATE"));
	   fnEnableElement(document.getElementById("BLK_HEADER__LSTINTRTSIGN"));        
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY")); 
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNSETLINFO")); 
	 
}
//OBCL_14.1_SUPPORT_BUG#30177773 Ends

//OBCL_14.3_SUPPORT_BUG#31129011 Starts
function fnPreNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction="";
    return true;
}

function fnPostNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction='AUTH';
	fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));    
	fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY"));
    return true;
}
//OBCL_14.3_SUPPORT_BUG#31129011 Ends