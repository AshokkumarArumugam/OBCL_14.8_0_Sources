/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2018, Oracle and/or its affiliates.
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
**  File Name          : OLDPMNSI_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Changed By         : Abhinav Kumar
**  Date               : 29-Sep-2022
**  Change Description : Users unable to click schedule button in OLDPMNSI after Save
**  Search String      : BUG#34642502 
****************************************************************************************************************************/
var visited = false;
function fnPostSave_KERNEL() {
  fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_NEXT"));
  //EnableDisableAuthBtn(); //BUG#27190209_Commented
  //fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_SCHDT"));
  fnEnableElement(document.getElementById("BLK_OLVWS_PAYMENT_SUMMARY__BTN_SCHDT")); //BUG#34642502  --Uncommented Above code so users can click schedule button and check details in OLDPMNSI after Save.
  visited = true;
  return true;
}

function fnPostLoad_KERNEL(){
	document.getElementById("EnterQuery").style.display = "none";
    visited = true;
	return true;
}

function fnPostAuthorize_KERNEL(){
    visited = true;
	return true;
}

function fnPostFocus_KERNEL() {
	if (visited == true) {
		DisableToolbar_buttons("EnterQuery");
	}
    return true;
}