/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : OLDCOROL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Mohan.S
**  Last modified on   : 26-May-2017
**  Search String      : OFCL_12.4.0.0.0_26043532 
**  Reason             : Rollover button is enabled even after doing rollover.Now disabled by checking rollover refno

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**  Last Modified By   : Chandra Prasath N
**  Last modified on   : 19-Mar-2021
**  Reason             : Modified the Audit Details FieldID's in sync with ODT
**  Search String      : OBCL_14.4_SUPPORT_BUG#32655662

 **Changed By         : Ravindranath
   **Changed On         : 24-Nov-2021
   **Change Description : Consol ROllover - RFR Parameters Change
   **Search String      : OBCL_14.5_Consol_Roll   
****************************************************************************************************************************/
function fnPostNew_KERNEL(){	
	document.getElementById('cmdAddRow_BLK_ROLL_INT_RATES').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_ROLL_INT_RATES').style.visibility='hidden';
	document.getElementById('BTN_SINGLE_VIEW_BLK_ROLL_INT_RATES').style.visibility='hidden';
	return true;
}
function fnPostExecuteQuery_KERNEL(){
/*OFCL_12.4.0.0.0_26043532--Added the condition if rollover reference number is null,then enabling the button*/
fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__BTN_INTEREST"));/*OBCL_14.5_Consol_Roll*/
if ((document.getElementById("BLK_CONSOL_MASTER__AUTHSTAT").value == 'A') && (gAction == '') && (document.getElementById("BLK_CONSOL_MASTER__ROLLOVERREFNO").value == '')){
	EnableToolbar_buttons('Rollover'); 
		   }
return true;
}
function fnPostFocus_KERNEL(){
/*OFCL_12.4.0.0.0_26043532--Added the condition if rollover reference number is null,then enabling the button*/
if ((document.getElementById("BLK_CONSOL_MASTER__AUTHSTAT").value == 'A') && (gAction == '') && (document.getElementById("BLK_CONSOL_MASTER__ROLLOVERREFNO").value == '')){
	EnableToolbar_buttons('Rollover'); 
		   }	
return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	//OBCL_14.4_SUPPORT_BUG#32655662 start
	//document.getElementById("BLK_CONSOL_MASTER__MAKER_ID").value = "";
    //document.getElementById("BLK_CONSOL_MASTER__CHECKER_ID").value = "";
    //document.getElementById("BLK_CONSOL_MASTER__MAKER_DT_STAMP").value = "";
    //document.getElementById("BLK_CONSOL_MASTER__CHECKER_DT_STAMP").value = "";
	document.getElementById("BLK_CONSOL_MASTER__MAKERID").value = "";
    document.getElementById("BLK_CONSOL_MASTER__CHECKERID").value = "";
    document.getElementById("BLK_CONSOL_MASTER__MAKERDTST").value = "";
    document.getElementById("BLK_CONSOL_MASTER__CHECKERDTST").value = "";
	//OBCL_14.4_SUPPORT_BUG#32655662 Ends
    document.getElementById("BLK_CONSOL_MASTER__TXNSTAT").value = "";
	fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__BTN_INTEREST"));/*OBCL_14.5_Consol_Roll*/
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end

//OBCL_14.5_Consol_Roll Starts
function fnPostSave_KERNEL() {
	fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__BTN_INTEREST"));/*OBCL_14.5_Consol_Roll*/
    return true;
}

function fnPostLoad_CVS_MAIN_KERNEL(){	
   	fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__BTN_INTEREST"));
    return true;
}

function fn_rollOverProd()//Ravi
{		
	fnSubScreenMain('OLDCOROL', 'OLDCOROL', 'CVS_INT_DTLS', false);	
debugs("gAction");
    return true;
}

function fnPostLoad_CVS_INT_DTLS_KERNEL(){	
    fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__BTN_RTFIX"));
	getElementsByOjName('BLK_ROLL_INT_RATES')[0].style.visibility = 'hidden';
	getElementsByOjName('BLK_ROLL_INT_RATES')[0].style.visibility = 'hidden';
	fnDisableElement(document.getElementById("BLK_ROLL_INT_RATES__COMPONENT"));
    return true;
}
//OBCL_14.5_Consol_Roll Ends