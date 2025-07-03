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
**  File Name          : LBDPSAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
      // document.getElementById("BLK_SCHEDULE_MASTER_PAYAU__BTNAUTH").disabled = false;
	  if (document.getElementById("BLK_SCHEDULE_MASTER_PAYAU__REFERENCE_NO").value != null){
         fnEnableElement(document.getElementById("BLK_SCHEDULE_MASTER_PAYAU__BTNAUTH"));
	  }

    
	gAction = 'NEW';
	
	return true;
}
function Fn_OnAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
	 //document.getElementById("BLK_SCHEDULE_MASTER_PAYAU__BTNAUTH").disabled = true;
        fnEnableElement(document.getElementById("BLK_SCHEDULE_MASTER_PAYAU__BTNAUTH"));
            
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}
