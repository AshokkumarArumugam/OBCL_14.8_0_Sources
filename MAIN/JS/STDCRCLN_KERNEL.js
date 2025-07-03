/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  Written by         : Abraham I.
**  Date of creation   : 03-Jul-2018
**  File Name          : STDCRCLN_KERNEL.js
**  Purpose            : CL Core entity screen
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Abraham I.
**  Last modified on   : 08-Oct-2018
**  Reason             : Host Code is not defaulting
**  Search String      : OFCUB_14_2_Bug#28714036
**
**  Last Modified By   : Abraham I.
**  Last modified on   : 23-Oct-2018
**  Reason             : Branch transfer failing
**  Search String      : OFCUB_14_2_Bug#28727078

**  Last Modified By   : Vishakha Agrawal
**  Last modified on   : 21-APR-2023
**  Reason             : REDWOOD Changes
**  Search String      : REDWOOD
****************************************************************************************************************************/

function fnPostUnlock_KERNEL()
{
	// REDWOOD commented
	//fnDisableElement(document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__LOAN_ACCOUNT_BRN"));
	//fnDisableElement(document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__CUSTOMER_NO"));
	//fnDisableElement(document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__SOURCE_SYSTEM_ACC_BRN")); //OFCUB_14_2_Bug#28727078 added
	
	document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__LOAN_ACCOUNT_BRN").disabled = true;  // REDWOOD added
	document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__CUSTOMER_NO").disabled = true;  // REDWOOD added
	document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__SOURCE_SYSTEM_ACC_BRN").disabled = true;  // REDWOOD added
	return true;
}

function fnPostLoad_KERNEL() {
	debugs("In fnPostLoad", "A");	
	return true;  
}


function fnPostEnterQuery_KERNEL()
{
	return true;
}

function fnPostNew_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_CONSUMERLOAN_ACC__HOST_CODE').value = mainWin.HostCode;  //OFCUB_14_2_Bug#28714036 added
	fnEnableElement(document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__LOAN_ACCOUNT_BRN"));
	fnEnableElement(document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__CUSTOMER_NO"));	
	fnEnableElement(document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__SOURCE_SYSTEM_ACC_BRN")); //OFCUB_14_2_Bug#28727078 added
    return true;
}

//OFCUB_14_2_Bug#28714036 starts
function fnPostCopy_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_CONSUMERLOAN_ACC__HOST_CODE').value = mainWin.HostCode;
	fnEnableElement(document.getElementById("BLK_STTMS_CORE_CONSUMERLOAN_ACC__SOURCE_SYSTEM_ACC_BRN")); //OFCUB_14_2_Bug#28727078 added
	return true;
}

function fnPreExecuteQuery_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_CONSUMERLOAN_ACC__HOST_CODE').value = mainWin.HostCode;
	return true;
}

function fnPostEnterQuery_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_CONSUMERLOAN_ACC__HOST_CODE').value = mainWin.HostCode;
	return true;
}
//OFCUB_14_2_Bug#28714036 ends

