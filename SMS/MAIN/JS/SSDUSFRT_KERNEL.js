/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright ? 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
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
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : SSDUSFRT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**
**  Modified By        : Ambika Selvaraj
**  Modified On        : 16-Apr-2018
**  Modified Reason    : Fix provided to avoid user to provide user details for bank initiated forget user process 
                         and to disable unlock after authorizing a record.
**  Search String      : 9NT1606_12_3_GDPR_27859203


**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES
***************************************************************************************************************************
*/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

function fnEnableOrDisableForgetUserDetails() {
    if(/*document.getElementById("BLK_FORGET_USER_MASTER__FORGET_USER_PROCESS_TYPE").value == true && */
	   document.getElementById("BLK_FORGET_USER_MASTER__FORGET_USER_PROCESS_TYPE").value == "U") { //redwood_Changes checkbox
        fnEnableMEBlock("BLK_FORGET_USER_DETAIL", true);        
    } else {
        fnEnableMEBlock("BLK_FORGET_USER_DETAIL", false);  
        deleteAllRows("BLK_FORGET_USER_DETAIL"); //9NT1606_12_3_GDPR_27859203
    } 
    return true;
}

function fnPostExecuteQuery_KERNEL(){
     var l_once_auth = document.getElementById("BLK_FORGET_USER_MASTER__ONCEAUTH").value;
     if (l_once_auth == 'Y') 
     {
         DisableToolbar_buttons('DELETE');
         DisableToolbar_buttons('UNLOCK');	 
     }
     return true;
}

//9NT1606_12_3_GDPR_27859203 - added below function
function fnPostAuthorize_KERNEL() {
    DisableToolbar_buttons('UNLOCK');
    return true;
}
//29672981
function fnPostNew_KERNEL(){
  g_prevAction = gAction;
  gAction = "DEFAULT";  
  appendData();
  fcjRequestDOM = buildUBSXml(); 
  fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
  fnProcessResponse();
  gAction = g_prevAction;
  return true;
}//29672981