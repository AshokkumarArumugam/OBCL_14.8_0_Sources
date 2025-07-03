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
**  File Name          : OLDPRMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838 
**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Asigning mainWin.AppDate to format the date as per user preference 
**Search String      : Bug#31400838 

**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
****************************************************************************************************************************/
var prfvstd = 'N';
function fnInsertComp() {
    var g_prev_gAction = gAction;
    gAction = "INSCOMP";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
    gDispAlertOnSuccess = 'N';
    if (!fnProcessResponse()) {
        gAction = g_prev_gAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        return false;
    }
    gAction = g_prev_gAction;
    return true;
}
function fnPostLoad_CVS_PREFERENCES_KERNEL() {
    if (gAction == 'NEW' || gAction == 'MODIFY') {
    prfvstd = 'Y';
    fnInsertComp();
    }
    return true;
}
function fnPreSave_KERNEL() {
    if (gAction == 'NEW' || gAction == 'MODIFY') {
    if (prfvstd == 'N') {
    fnInsertComp();
    }
    }
    return true;
}
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS
function fnPostNew_KERNEL(){
{
     document.getElementById("BLK_PRODUCT__PRDSTARTDT").value = mainWin.AppDate;	//Bug#31400838
     fireHTMLEvent(document.getElementById("BLK_PRODUCT__PRDSTARTDT"),"onpropertychange"); 
  
}
return true;

}
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES ENDS
//Added for LFCLSFEE
function fnPreLoad_CVS_MAIN_KERNEL(screenArgs){
	//if (document.getElementById('BLK_PRODUCT__PRODTYPE').checked){
    if (document.getElementById('BLK_PRODUCT__PRODTYPE').value){ //Bug#34958820_REDWOOD_ADOPTION
        screenArgs['PRODTYPE'] = document.getElementById('BLK_PRODUCT__PRODTYPE').value;
    }
	//else if (document.getElementById('BLK_PRODUCT__PRODTYPE2').checked){
    else if (document.getElementById('BLK_PRODUCT__PRODTYPE2').value){ //Bug#34958820_REDWOOD_ADOPTION
        screenArgs['PRODTYPE'] = document.getElementById('BLK_PRODUCT__PRODTYPE2').value;
    }
    return true;
}