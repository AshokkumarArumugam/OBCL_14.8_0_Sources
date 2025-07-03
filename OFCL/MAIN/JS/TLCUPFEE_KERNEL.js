/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : TLCUPFEE_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Srinivasulu Ch
**  Last modified on   : 19-Aug-2019
**  Full Version       : 
**  Reason             : 14.4 SLT -Amendment Fee Accounting Changes

	Changed By         : Akhila Samson
    Date               : 03-Mar-2023
    Change Description : Redwood changes
    Search String      : Bug#34958820_Redwood_changes
****************************************************************************************************************************/
function fnPostLoad_CVS_FEE_KERNEL(){
	getElementsByOjName('cmdAddRow_BLK_TLTBS_UPLOAD_FEE_MASTER')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_TLTBS_UPLOAD_FEE_MASTER')[0].style.visibility = 'hidden';
	
	//14.4 SLT -Amendment Fee Accounting Changes Starts
	try{
for (i = 0 ; i <= getTableObjForBlock("BLK_TLTBS_UPLOAD_FEE_MASTER").tBodies[0].rows.length; i++ ) {
	if (i==0){
	if (document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__FEETYPE").value == 'AM'){
	//document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__RATEI").disabled = true; //Bug#34958820_Redwood_changes
	document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__RATE").disabled = true; //Bug#34958820_Redwood_changes
	//document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__AMOUNTI").disabled = true; //Bug#34958820_Redwood_changes
	document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__AMOUNT").disabled = true; //Bug#34958820_Redwood_changes

}		
	}
	else {
	
if (document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__FEETYPERC"+i).value == 'AM'){
document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__RATEIRC"+i).disabled = true;
document.getElementById("BLK_TLTBS_UPLOAD_FEE_MASTER__AMOUNTIRC"+i).disabled = true;

}
}
}
	}catch(e){}

	///14.4 SLT -Amendment Fee Accounting Changes ends
	return true;
}