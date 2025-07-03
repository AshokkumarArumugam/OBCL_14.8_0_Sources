/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : TLDPRAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTHVAMI_KERNEL(screenArgs) {
    subScreen = 'Y';
   document.getElementById("BLK_FMEM_LOR_INT_PARAMS__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
            document.getElementById("BLK_FMEM_LOR_INT_PARAMS__BTN_AUTH").disabled = false; 
       
    
    
	gAction = 'NEW';
	
	return true;
}


function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
			
			document.getElementById("BLK_FMEM_LOR_INT_PARAMS__BTN_AUTH").disabled = true; 
      
			
			// SFR-13478375 ends 
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}