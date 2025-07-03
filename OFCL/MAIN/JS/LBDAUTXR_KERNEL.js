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
**  File Name          : LBDAUTXR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Written by         : Soumya B
**  Date of creation   : 24-Feb-20
**  File Name          : LBDTXREF_KERNEL.js
**  Purpose            : OBCL_14.4_LS_TAX_Changes 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 27-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_TAXREF_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
	if(!fnProcessAuthOnLoad(screenArgs))
        return false; 
	if (getTableObjForBlock("BLK_OLTBS_CONTRACT_EVENT_LOG__BORROWERCONTRACTREFNO").value != null){//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		getTableObjForBlock("BLK_OLTBS_CONTRACT_EVENT_LOG__BTN_AUTHORIZE").disabled = false;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	}
    
	gAction = 'NEW';
		
	return true;
}
function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
		getTableObjForBlock("BLK_OLTBS_CONTRACT_EVENT_LOG__BTN_AUTHORIZE").disabled = true;
            
			disableForm();
		}		
        gAction = gprev;
        return true;
    }
}

