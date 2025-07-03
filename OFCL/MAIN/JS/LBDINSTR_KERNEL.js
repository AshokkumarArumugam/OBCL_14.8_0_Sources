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
**  File Name          : LBDINSTR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 28-04-2023
**  Full Version       : 
**  Reason             : Redwood_Changes - Modified the code to set counterparty type value to NULL if it is other than RAD drop downlist options.
****************************************************************************************************************************/
function fnPostEnterQuery_KERNEL(){
	fnEnableElement(document.getElementById("BLK_OLTMS_INSTR_HDR__SSIMNEMONIC"));
	return true;
}
function fnPostUnlock_KERNEL(){
 fnDisableElement(document.getElementById("BLK_OLTMS_INSTR_HDR__SSIMNEMONIC"));
return true;	
}
// Redwood_Changes starts
/*function fnPreSave_KERNEL() {
	if (document.getElementById("BLK_OLTMS_INSTR_HDR__COUNTERPARTYTYPE").value !='B' || document.getElementById("BLK_OLTMS_INSTR_HDR__COUNTERPARTYTYPE").value !='C') {
		document.getElementById("BLK_OLTMS_INSTR_HDR__COUNTERPARTYTYPE").value=null;
	}
	
	if (document.getElementById("BLK_ACC_DET_BODY_1__TRANSFERBYPAY").value !='B' || document.getElementById("BLK_ACC_DET_BODY_1__TRANSFERBYPAY").value !='C') {
		document.getElementById("BLK_ACC_DET_BODY_1__TRANSFERBYPAY").value=null;
	}
	
	if (document.getElementById("BLK_ACC_DET_BODY_1__TRANSFERBYRECV").value !='B' || document.getElementById("BLK_ACC_DET_BODY_1__TRANSFERBYRECV").value !='C') {
		document.getElementById("BLK_ACC_DET_BODY_1__TRANSFERBYRECV").value=null;
	}
	return true;
}
// Redwood_Changes ends */