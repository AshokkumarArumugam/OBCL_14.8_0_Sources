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
**  File Name          : LBCADVIC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/

function fnPostLoad_CVS_ADVICE_KERNEL() {
	
	getElementsByOjName('cmdAddRow_BLK_CONTRACT_EVENT_ADVIC_MULTI')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_CONTRACT_EVENT_ADVIC_MULTI')[0].style.visibility = 'hidden';
	return true;

}
function fnChangeSupall()
{
	var tableRef =getTableObjForBlock("BLK_CONTRACT_EVENT_ADVIC_MULTI");//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	var totalRows = tableRef.tBodies[0].rows.length;
	var rowRef = tableRef.tBodies[0].rows;
	
	if (document.getElementById("BLK_CONTRACT_EVENT_ADVIC__CHKSUPPRESS").value)
	{
			for( i=0 ; i <= totalRows ; i++ )
			{	   
			getTableObjForBlock("BLK_CONTRACT_EVENT_ADVIC_MULTI__SUPPRESS")[i].value = 'Y';//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			}		
	}	
	return true;
}