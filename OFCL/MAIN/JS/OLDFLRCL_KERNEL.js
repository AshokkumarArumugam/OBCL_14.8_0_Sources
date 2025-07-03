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
**  File Name          : OLDFLRCL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Meha
**  Last modified on   : 12-SEP-2019	
**  Search String      : OBCL_14.4_FLRCLG 
**  Change Description : Floor And Ceiling Changes
**
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 08-Mar-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820

****************************************************************************************************************************/
var lAction; 
/* function fnPostNew_KERNEL()
{
       document.getElementById("BLK_EFFECTIVE_DATE__EFFDATE").value =mainWin.applicationDate;	
	   fnDisableElement(document.getElementById("BLK_EFFECTIVE_DATE__EFFDATE"));
	return true;
}*/

function fnPostUnlock_KERNEL() {
	if (gAction == 'MODIFY')
	{
	var curDate = mainWin.AppDate;			
	//var len = document.getElementById('BLK_EFFECTIVE_DATE').tBodies[0].rows.length; //Bug#34958820 changes
	var len = getTableObjForBlock('BLK_EFFECTIVE_DATE').tBodies[0].rows.length; //Bug#34958820 changes
	for(var idx=0; idx<len; idx++) {
		var effDate = getNodeText(selectNodes(dbDataDOM, "//BLK_EFFECTIVE_DATE/EFFDATE")[idx]);
		if (getNodeText(selectNodes(dbDataDOM, "//BLK_EFFECTIVE_DATE/EFFDATE")[idx]) != mainWin.AppDate)
		{			
		fnDisableElement(document.getElementById("BLK_CURRENCY_DETAILS__CCY"));
		fnDisableElement(document.getElementById("BLK_CURRENCY_DETAILS__CCYNAME"));
		fnDisableElement(document.getElementById("BLK_EFFECTIVE_DATE__EFFDATE"));
		fnDisableElement(document.getElementById("BLK_RATE_DETAILS__LOANPRD"));	
		fnDisableElement(document.getElementById("BLK_RATE_DETAILS__ICOMP"));
		fnDisableElement(document.getElementById("BLK_RATE_DETAILS__BASERATEFLR"));
		fnDisableElement(document.getElementById("BLK_RATE_DETAILS__BASERATECEIL"));
		fnDisableElement(document.getElementById("BLK_RATE_DETAILS__AIRTFLR"));
		fnDisableElement(document.getElementById("BLK_RATE_DETAILS__AIRTCEIL"));		
		}
	}	
	}
	return true;
}


