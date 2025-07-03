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
**  File Name          : LBCINTSH_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 27-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/

function fnCalcTotalAmount(){
	 var TblObj = getTableObjForBlock("BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH").tBodies[0].rows;
	 var sum=0.00;
	 var amount=0.00;
    for(var j = 0; j < sumTblObj.length; j++){
		//amount=getTableObjForBlock("BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH").tBodies[0].rows[j].cells[6].getElementsByTagName("INPUT")[0].value;
		amount=getTableObjForBlock("BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH").tBodies[0].rows[j].cells[6].getElementsByTagName("oj-input-text")[0].value;//OBCL_14.7_LS_REDWOOD_CHANGES
        if(Number.isFinite(amount)){
		sum+=amount;
		}      
    }
	
	
	document.getElementById("BLK_UI_BORROWER_DETAILS__UI_TOTAL").value=sum;

	
	return true;
	
}