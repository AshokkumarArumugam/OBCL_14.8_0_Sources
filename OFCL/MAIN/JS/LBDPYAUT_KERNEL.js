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
**  File Name          : LBDPYAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Last Modified By   : Pallavi R
**  Last modified on   : 06-Feb-2025
**  Search String      : OBCL_14.7_RABO_#37547099 Changes
**  Reason             : Added code to enable confirmed checkbox.
****************************************************************************************************************************/
var subScreen='N';
var fcjResponseDOM;
var fcjRequestDOM;
/*function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
    fnEnableElement(document.getElementById("BLK_PMT_HDR__BTN_AUTH"));
	fnEnableElement(document.getElementById("BLK_PMT_SUMMARY__BTN_SHOW_DETAILS"));
    return true;
}*/
//OBCL_14.7_RABO_#37547099 Changes Starts
/*function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
//OFCL_12.3.0.0.0_25073643 changes starts
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_PMT_HDR__BTN_AUTH"));
	   //fnEnableElement(document.getElementById("BLK_PMT_SUMMARY__BTN_SHOW_DETAILS"));
	    //OFCL_12.3.0.0.0_25049289
	   //OFCL_12.3.0.0.0_25045972 changes starts
	//gAction = 'NEW';	
	gAction = 'AUTH';
	   //OFCL_12.3.0.0.0_25045972 changes ends
	return true;
}*/
//OBCL_14.7_RABO_#37547099 Changes Ends
function fnPostExecuteQuery_KERNEL(){
    fnEnableElement(document.getElementById("BLK_PMT_HDR__BTN_AUTH"));
	fnEnableElement(document.getElementById("BLK_PMT_SUMMARY__BTN_SHOW_DETAILS"));
    return true;
}
function fnLBPaymentAuth(){
    var g_prev_gAction = gAction;
    gAction = 'AUTH';
    if (!fnOnlineAuthorize(subScreen)) {
        var l_msgStat =getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (l_msgStat == 'SUCCESS') {
            disableForm();
        }
    gAction = g_prev_gAction;
    return true;
    }
}
function fnLBShowDetails(){
    var g_prev_gAction = gAction;
    gAction = 'SHOWDET';
    if (!fnOnlineAuthorize(subScreen)) {
        var l_msgStat =getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (l_msgStat == 'SUCCESS') {
            disableForm();
        }
    gAction = g_prev_gAction;
    return true;
    }
}
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_PMT_HDR__CONTRACT_REF_NO').value; 
    subScreen = 'Y';
    //OFCL_12.3.0.0.0_25073643 changes starts
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_PMT_HDR__BTN_AUTH"));	
	   fnEnableElement(document.getElementById("BLK_PMT_SUMMARY__BTN_SHOW_DETAILS"));
	//OBCL_14.7_RABO_#37547099 Changes Starts
	 var rowRef =document.getElementById("BLK_CONTRACT_OVD").tBodies[0].rows;  
      for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(document.getElementById("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[5].getElementsByTagName("INPUT")[0]);
      }
	//OBCL_14.7_RABO_#37547099 Changes Ends		   
    return true;
}
