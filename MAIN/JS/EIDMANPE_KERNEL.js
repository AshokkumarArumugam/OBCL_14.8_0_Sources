/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : EIDMANPE_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

****************************************************************************************************************************/



//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

function fnPostLoad_KERNEL() {
  getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;  //redwood_changes
   return true;
}

function fnPostNew_KERNEL() {

  getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;  //redwood_changes
   return true;
 

}

 function fnPostLoad_Summary_KERNEL()
 {
 getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;  //redwood_changes
  return true;
 }
 

function fnPostCopy_KERNEL() {
      getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;  //redwood_changes
      document.getElementById("SMTBS_FUNCTION_DESCRIPTION__SUB_MENU_1").value = "";
  return true;
}

function fnPreEnterQuery_KERNEL() {

        //Neetu for FC_UBS_V.UM_10.3.0.0.0.0.0 ITR1 SFR#1238 -START
        fnEnableElement(document.getElementById("EITMS_MODULES_INSTALLED__MODULE_ID"));
        //Neetu for FC_UBS_V.UM_10.3.0.0.0.0.0 ITR1 SFR#1238 - END
      return true;
  
}
/*
function fnPostEnterQuery_KERNEL() {
  getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;
  LOV_FUNCTION_NAME = new lov("select a.function_id ,a.main_menu || ' ' || a.sub_menu_1 || ' ' || a.sub_menu_2 func_desc from smtbs_function_description a, smtbs_menu b where a.lang_code = global.lang and (ltrim (rtrim (a.main_menu)) is not null or executable_type = 'S')and a.function_id = b.function_id and b.module = ?  order by a.main_menu,a.sub_menu_1,a.sub_menu_2","A.FUNCTION_ID!TEXT!A.FUNCTION_ID","STRING~STRING","FUNCTION_ID~SUB_MENU_1","Select Function IDs","LBL_FUNCTION_ID_NEW~LBL_FUNC_DESC","EIMANPRG","MODULE_ID!STRING","100","10","ORACLE","~");
 return true;
}


function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
  getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;  
  LOV_FUNCTION_NAME = new lov("select a.function_id ,a.main_menu || ' ' || a.sub_menu_1 || ' ' || a.sub_menu_2 func_desc from smtbs_function_description a, smtbs_menu b where a.lang_code = global.lang and (ltrim (rtrim (a.main_menu)) is not null or executable_type = 'S')and a.function_id = b.function_id and b.module = ? order by a.main_menu,a.sub_menu_1,a.sub_menu_2","A.FUNCTION_ID!TEXT!A.FUNCTION_ID","STRING~STRING","FUNCTION_ID~SUB_MENU_1","Select Function IDs","LBL_FUNCTION_ID_NEW~LBL_FUNC_DESC","EIMANPRG","MODULE_ID!STRING","100","10","ORACLE","~");
   return true;
}

*/



 
 
