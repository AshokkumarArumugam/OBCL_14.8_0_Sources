/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2020 ,2020, Oracle and/or its affiliates.
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
**  Written by         : Poornachandran R
**  Date of creation   : 03-Jun-2020
**  File Name          : STDCRTRD_KERNEL.js
**  Purpose            : Trade Core entity screen
**  
****************************************************************************************************************************/

function fnPostUnlock_KERNEL()
{
	fnDisableElement(document.getElementById("BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_BRN"));
	fnDisableElement(document.getElementById("BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CUSTOMER_NO"));
	fnDisableElement(document.getElementById("BLK_STTM_CORE_TRADE_CONTRACT__SOURCE_SYSTEM_CONT_BRN"));
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
	document.getElementById('BLK_STTM_CORE_TRADE_CONTRACT__HOST_CODE').value = mainWin.HostCode;  
	fnEnableElement(document.getElementById("BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_BRN"));
	fnEnableElement(document.getElementById("BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CUSTOMER_NO"));	
	fnEnableElement(document.getElementById("BLK_STTM_CORE_TRADE_CONTRACT__SOURCE_SYSTEM_CONT_BRN")); 
    return true;
}

function fnPostCopy_KERNEL() {
	document.getElementById('BLK_STTM_CORE_TRADE_CONTRACT__HOST_CODE').value = mainWin.HostCode;
	fnEnableElement(document.getElementById("BLK_STTM_CORE_TRADE_CONTRACT__SOURCE_SYSTEM_CONT_BRN")); 
	return true;
}

function fnPreExecuteQuery_KERNEL() {
	document.getElementById('BLK_STTM_CORE_TRADE_CONTRACT__HOST_CODE').value = mainWin.HostCode;
	return true;
}

function fnPostEnterQuery_KERNEL() {
	document.getElementById('BLK_STTM_CORE_TRADE_CONTRACT__HOST_CODE').value = mainWin.HostCode;
	return true;
}