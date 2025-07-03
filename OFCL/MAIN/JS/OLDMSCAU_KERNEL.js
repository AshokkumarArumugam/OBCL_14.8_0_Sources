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
**  File Name          : OLDMSCAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
   // document.getElementById("BLK_OLTBS_CONTRACT__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
       document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_AUTH").disabled = false;
     fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__AMT"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__MATUDATE"));
    fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__CURR"));
   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__VALDATE"));
    fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__RATE"));
    
    
	gAction = 'NEW';
	//Bug#36619894_1 changes starts						 
    //var rowRef =getTableObjForBlock("BLK_OLTBS_CONTRACT_OVD").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_OLTBS_CONTRACT_OVD");
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_OLTBS_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_OLTBS_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("INPUT")[0].checked = true;
		 fnEnableElement(getTableObjForBlock("BLK_OLTBS_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	return true;
}
function FNONLINEAUTH() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
		document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_AUTH").disabled = true; 
            
			
			// SFR-13478375 ends 
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}
