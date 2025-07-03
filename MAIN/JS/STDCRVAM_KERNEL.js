/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2019, Oracle and/or its affiliates.
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
**  Written by         : SSCOELHO
**  Date of creation   : 20-Oct-2020
**  File Name          : STDCRVAM_KERNEL.js
**  Purpose            : External Virtual Account Input
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnPostUnlock_KERNEL()
{
	fnDisableElement(document.getElementById("BLK_STTMS_CORE_VIRTUAL_ACCOUNT__VIRTUAL_ACCOUNT_NO"));
	return true;
}

function fnPostLoad_KERNEL() {
	debugs("In fnPostLoad", "A");	
	return true;  
}

function fnPostNew_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_VIRTUAL_ACCOUNT__HOST_CODE').value = mainWin.HostCode;
    return true;
}



function fnPostEnterQuery_KERNEL()
{
	return true;
}

function fnPostCopy_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_VIRTUAL_ACCOUNT__HOST_CODE').value = mainWin.HostCode;
	return true;
}

function fnPreExecuteQuery_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_VIRTUAL_ACCOUNT__HOST_CODE').value = mainWin.HostCode;
	return true;
}

function fnPostEnterQuery_KERNEL() {
	document.getElementById('BLK_STTMS_CORE_VIRTUAL_ACCOUNT__HOST_CODE').value = mainWin.HostCode;
	return true;
}


