/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLDVMAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Last Modified By   : Manivel Ganesan
**  Last modified on   : 03-Mar-2020
**  Search String      : OBCL_14.3_SUPPORT_BUG#31016369
**  Reason             : Re-key field(s) value getting vanished & become non-editable when press navigation button in the change log grid 

    Last Modified By   : Yuvaraj K
**  Last modified on   : 13-APR-2021
**  Search String      : OBCL_14.3_SUPPORT_BUG#32731016
**  Reason             : (BLK_AUTH_REKEY__INTRT) field(s) changed as Editable field.

**  Last Modified By   : Mohan Pal
**  Last modified on   : 20-May-2022
**  Search String      : BUG#34194816
**  Reason             : Rekey not opted at Product level, should be disable while Auth.

**  **  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
*****************************************************************************************************************************************/
var subScreen='N'; 

function fnPostLoad_CVS_AUTHVAMI_KERNEL(screenArgs) {
    subScreen = 'Y';
   document.getElementById("BLK_AUTH_REKEY__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
            document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = false; 
          document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = false;
	if (document.getElementById("BLK_AUTH_REKEY__REKEY_TXTCCY").value =='Y') { //Bug#33803920 added If condition //34194816
     fnEnableElement(document.getElementById("BLK_AUTH_REKEY__CCY"));
	}
	if (document.getElementById("BLK_AUTH_REKEY__REKEY_TXTVALDT").value =='Y') { //Bug#33803920 added If condition //34194816
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__VALDT"));
    }
	if (document.getElementById("BLK_AUTH_REKEY__REKEY_TXTMATDT").value =='Y') { //Bug#33803920 added If condition //34194816
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__MATDT"));
    }
	if (document.getElementById("BLK_AUTH_REKEY__REKEY_TXTAMOUNT").value =='Y') { //Bug#33803920 added If condition //34194816
   fnEnableElement(document.getElementById("BLK_AUTH_REKEY__AMT"));
	}
     // fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRATEAMT"));//OBCL_14.4_Support_bug#32731016 COMMENTED 
	if (document.getElementById("BLK_AUTH_REKEY__REKEY_INTRT").value =='Y') { //Bug#33803920 added If condition //34194816
   fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRT"));//OBCL_14.4_Support_bug#32731016
	}
	if (document.getElementById("BLK_AUTH_REKEY__REKEY_TXTCOUNTERPARTY").value =='Y') { //Bug#33803920 added If condition //34194816
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__TXTCOUNTERPARTY"));
    }
    
	//gAction = 'NEW';// BUG#28936555  ... forward port of 28655005
	gAction = 'NEW'; //OBCL_14.3_SUPPORT_BUG#31016369 
					 //Enabled the commented line gAction in order to fix rekey field(s) value disappear issue (BUG#31016369).
					 //Handled the BUG#28936555  ... forward port of 28655005 issue in fnPreNavigate function.

	//Bug#36619894_1 changes starts						 
	//var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_CONTRACT_OVD");
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	return true;
}


function FNONLINEAUTH() {
    var gprev = gAction;
    gAction = 'AUTH';
	   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
			
			document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = true; 
            document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = true;			
			
			// SFR-13478375 ends 
			disableForm();
		}		
        gAction = gprev;
        return;
    }

}

function FNONLINEREJECT() {
    var gprev = gAction;
    
	 gAction = 'LD_REJECT';  
   
    if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
			
			document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = true; 
            document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = true;
			
			// SFR-13478375 ends 
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}

function fnPostExecuteQuery_KERNEL()
{
   

fnEnableElement(document.getElementById("BLK_AUTH_REKEY__CCY"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__VALDT"));
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__MATDT"));
   fnEnableElement(document.getElementById("BLK_AUTH_REKEY__AMT"));
        // fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRATEAMT"));//OBCL_14.4_Support_bug#32731016 COMMENTED
   fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRT"));//OBCL_14.4_Support_bug#32731016
    fnEnableElement(document.getElementById("BLK_AUTH_REKEY__TXTCOUNTERPARTY"));
		
	//Bug#36619894_1 changes starts						 
	//var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_CONTRACT_OVD");
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = false; 
    document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = false;
    // SFR-13478375 Ends
	

    return true;
}

//OBCL_14.3_SUPPORT_BUG#31016369 Starts
function fnPreNavigate_BLK_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction="";
    return true;
}

function fnPostNavigate_BLK_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction='AUTH';
	fnReKeyFieldsEnable();
    return true;
}

function fnPostRow_onClick_BLK_CONTRACT_CHANGE_LOG_KERNEL() {

	fnReKeyFieldsEnable();
    return true;
}

function fnPostRow_onClick_BLK_CONTRACT_OVD_KERNEL() {

	fnReKeyFieldsEnable();
    return true;
}

function fnReKeyFieldsEnable () {
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__CCY"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__AMT"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__VALDT"));
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__MATDT"));    
	//fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRATEAMT"));//OBCL_14.4_Support_bug#32731016 COMMENTED
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__INTRT")); //OBCL_14.4_Support_bug#32731016
	fnEnableElement(document.getElementById("BLK_AUTH_REKEY__TXTCOUNTERPARTY")); 
    return true;
}
//OBCL_14.3_SUPPORT_BUG#31016369 Ends