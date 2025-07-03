/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : STDCSFRT_KERNEL.js
**  Purpose            : 
**  Called From        : 

**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES
****************************************************************************************************************************/


function fnPostNew_KERNEL(){
  g_prevAction = gAction;
  gAction = "DEFAULT";  
  appendData();
  fcjRequestDOM = buildUBSXml(); 
  fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
  fnProcessResponse();
  gAction = g_prevAction;
  return true;
}


function fnPostExecuteQuery_KERNEL(){
     var l_once_auth = document.getElementById("BLK_FORGET_MASTER__ONCEAUTH").value;
     if (l_once_auth == 'Y') 
     {
         DisableToolbar_buttons('DELETE');
         DisableToolbar_buttons('UNLOCK');	 
     }
     return true;
}

function fnEnableOrDisableForgetCustDetails() {
    if(/*document.getElementById("BLK_FORGET_MASTER__FORGET_CUS_PROCESS_TYPE").checked == true && */
	   document.getElementById("BLK_FORGET_MASTER__FORGET_CUS_PROCESS_TYPE").value == "C") { //REDWOOD_CHANGES
        fnEnableMEBlock("BLK_FORGET_DETAIL", true);        
    } else {
        fnEnableMEBlock("BLK_FORGET_DETAIL", false);  
    } 
    return true;
}