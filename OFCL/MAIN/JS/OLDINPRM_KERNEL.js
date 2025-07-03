/*----------------------------- OFSS-COPYRIGHT-BEGIN -----------------------------
*
*
*
* This source is part of the Oracle Flexcube Software System.
*
* No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by
* any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any
* language or computer language, without the prior written permission of Oracle and/or its affiliates.
*
* Oracle Financial Services Software Limited.
* Oracle Park, Off Western Express Highway,
* Goregaon (East),
* Mumbai - 400 063, India.
*
* Copyright © 2021, Oracle and/or its affiliates.  All rights reserved.
*
* ------------------------------- OFSS-COPYRIGHT-END -----------------------------
  Created By         : Abhik Das
  CHANGE HISTORY
  SFR Number         : 32564872
  Changed By         : Abhik Das
  Change Description : To Default entity_id on click of new and for older records
  Changed On         : 09-Apr-2021
  Search String      : OBCL_14.4_Support_Bug#32564872_Changes
  
  Changed By         : Baljinder Singh
  Change Description : Query data post save and re-populate Password with **** 
  Changed On         : 07-May-2024
  Search String      : O36543720_1
 -------------------------------------------------------------------------------------------------------
  */
function fnPostNew_KERNEL() {
	document.getElementById("BLK_INTEGRATION_MASTER__ENTITYID").value = mainWin.HOMEEntity;
	return true;
}
//36543720_1 starts
function fnPostSave_KERNEL(){
    gAction = "EXECUTEQUERY";
	
    
    fnExecuteQuery();
	
	return true;
}
//36543720_1 ends

function fnPostUnlock_KERNEL() {
	if (document.getElementById("BLK_INTEGRATION_MASTER__ENTITYID").value == '' ||
		document.getElementById("BLK_INTEGRATION_MASTER__ENTITYID").value == undefined)
		document.getElementById("BLK_INTEGRATION_MASTER__ENTITYID").value = mainWin.HOMEEntity;
	return true;
}