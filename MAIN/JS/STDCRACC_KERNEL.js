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
**  File Name          : STDCRACC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES
****************************************************************************************************************************/
function fnPostNew_KERNEL() {
	document.getElementById('BLK_ECA_CIF_ACC__HOST_CODE').value=mainWin.HostCode;
	return true;
}

function fnPostCopy_KERNEL() {
	document.getElementById('BLK_ECA_CIF_ACC__HOST_CODE').value=mainWin.HostCode;
	return true;
}

function fnPreExecuteQuery_KERNEL() {
	document.getElementById('BLK_ECA_CIF_ACC__HOST_CODE').value=mainWin.HostCode;
	return true;
}

function fnPostEnterQuery_KERNEL() {
	document.getElementById('BLK_ECA_CIF_ACC__HOST_CODE').value=mainWin.HostCode;
	return true;
}
function fnPreUnlock_KERNEL() {
    fnDisableElement(document.getElementById("BLK_ECA_CIF_ACC__ADDRESS1"));
	fnDisableElement(document.getElementById("BLK_ECA_CIF_ACC__ADDRESS2"));
	fnDisableElement(document.getElementById("BLK_ECA_CIF_ACC__ADDRESS3"));
	fnDisableElement(document.getElementById("BLK_ECA_CIF_ACC__ADDRESS4"));
    return true;
}
function fnChangeaccls() {
if (document.getElementById("BLK_ECA_CIF_ACC__ACCOUNT_CLASS").value =='7')
{
document.getElementById("BLK_ECA_CIF_ACC__ECA_CHECK_REQ").value = false; //redwood_Changes checkbox
fnDisableElement(document.getElementById("BLK_ECA_CIF_ACC__ECA_CHECK_REQ"));
document.getElementById("BLK_ECA_CIF_ACC__CUST_AC_CCY").value ='';
fnDisableElement(document.getElementById("BLK_ECA_CIF_ACC__CUST_AC_CCY"));
}
else
{
fnEnableElement(document.getElementById("BLK_ECA_CIF_ACC__CUST_AC_CCY"));
}
}
