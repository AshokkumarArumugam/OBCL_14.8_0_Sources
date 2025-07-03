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
**  File Name          : LDDRTAUT_KERNEL.js
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
function fnPostLoad_CVS_MAIN_KERNEL(screenArgs) {
    subScreen = 'Y';
   // document.getElementById("BLK_OLTBS_CONTRACT__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
       //document.getElementById("BLK_OLTBS_CONTRACT__BTNAUTH").disabled = false;
    fnEnableElement(document.getElementById("BLK_CSTSB_CONTRACT__CONTRACTREFNO"));
    fnEnableElement(document.getElementById("BLK_CSTSB_CONTRACT__MAKERID"));
	fnEnableElement(document.getElementById("BLK_CSTSB_CONTRACT__EVENTSEQNO"));	
    fnEnableElement(document.getElementById("BLK_CSTSB_CONTRACT__EVENTCODE"));	
	fnEnableElement(document.getElementById("BLK_RATE_FIXING_DETAILS__COMPONENT"));	
	fnEnableElement(document.getElementById("BLK_RATE_FIXING_DETAILS__CURRENTRESETDATE"));	
	fnEnableElement(document.getElementById("BLK_RATE_FIXING_DETAILS__SPREAD"));	
	fnEnableElement(document.getElementById("BLK_RATE_FIXING_DETAILS__REMARKS"));	
	fnEnableElement(document.getElementById("BLK_RATE_FIXING_DETAILS__RATE"));	
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTNAUTH"));
	gAction = 'NEW';
	
	return true;
}
function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
		//document.getElementById("BLK_EXRATE_MASTER__BTNAUTH").disabled = true;
            
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}
function fnPostExecuteQuery_KERNEL(){
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTNAUTH"));
	document.getElementById("Authorize").style.visibility="hidden";
	  return true;
}
