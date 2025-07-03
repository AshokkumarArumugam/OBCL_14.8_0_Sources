/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2014, Oracle and/or its affiliates.
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
**  Written by         : Palanisamy Muthukumar
**  Date of creation   : 
**  File Name          : LBDPSUAT_KERNEL.js
**  Purpose            : Payables/Receivables Upload
**  Called From        : LBDPRUAT
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
   // document.getElementById("BLK_OLTBS_CONTRACT__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;      
	if (document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER_AU__REFERENCE_NO").value != null){
		document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER_AU__BTN_AUTH").disabled = false;
	}
    
	gAction = 'NEW';
	
	return true;
}
function fnAuthorise() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
		document.getElementById("BLK_LBTBS_PAY_RECV_UPL_MASTER_AU__BTN_AUTH").disabled = true;
            
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}