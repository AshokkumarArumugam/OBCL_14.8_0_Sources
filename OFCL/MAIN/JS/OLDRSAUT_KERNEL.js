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
**  File Name          : OLDRSAUT_KERNEL.js
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
	gAction = 'NEW';	
	 document.getElementById('BLK_CONT_SPLIT_HDR__CONTRACTREFNO').value = screenArgs['CONREF'] ;
     document.getElementById('BLK_CONT_SPLIT_HDR__SPLITSERIALNO').value = screenArgs['SPLITSERNO'] ;
	 document.getElementById('BLK_CONT_SPLIT_HDR__SPLITBOOKDATE').value = screenArgs['BOOKDATE'] ;
	 document.getElementById('BLK_CONT_SPLIT_HDR__SPLITVALUEDATE').value = screenArgs['VALUEDATE'] ;
	  //fnEnableElement(document.getElementById("BLK_CONT_SPLIT_HDR__BTNAUTHORIZE"));
	document.getElementById("BLK_CONT_SPLIT_HDR__BTNAUTHORIZE").disabled = false; //REDWOOD_CHANGES
	return true;
}
function FN_AUTHORIZE(){
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
		document.getElementById("BLK_CONT_SPLIT_HDR__BTNAUTHORIZE").disabled = true;
            
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}
