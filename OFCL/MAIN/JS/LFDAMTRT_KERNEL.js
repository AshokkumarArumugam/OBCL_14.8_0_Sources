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
**  File Name          : CFDAMTRT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostAddRow_BLK_AMT_RATE_DETAIL_KERNEL()
{
		var cnt = getTableObjForBlock('BLK_AMT_RATE_DETAIL').tBodies[0].rows.length;
		//Redwood_changes_akhila start
	/*for(var i=1;i<=cnt;i++){
	   if (i == 1){
	        var blkfld = 'BLK_AMT_RATE_DETAIL__CURRENCYCODE';
			}
		else{
	       var blkfld = 'BLK_AMT_RATE_DETAIL__CURRENCYCODE'.concat(i-1);
		   }
	document.getElementById(blkfld).value = document.getElementById('BLK_AMT_RATES_MASTER__CURRENCYCODE').value;
	}
	document.getElementById('BLK_AMT_RATE_DETAIL__CURRENCYCODE').value = document.getElementById('BLK_AMT_RATES_MASTER__CURRENCYCODE').value;
	*/
	for(var i=0;i< cnt;i++){
		getTableObjForBlock("BLK_AMT_RATE_DETAIL").tBodies[0].rows[i].cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById('BLK_AMT_RATES_MASTER__CURRENCYCODE').value;
		
	  }
	
	
	//Redwood_changes_akhila
	
}
