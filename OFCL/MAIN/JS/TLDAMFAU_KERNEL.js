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
**  File Name          : TLDAMFAU_KERNEL.js
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
	/* if(screenArgs["AMENDREFNO"]!=undefined||screenArgs["AMENDREFNO"]!=""){
		document.getElementById("BLK_TLTBS_AMEND_FEE_AUTH__AMENDREFNO").value = screenArgs["AMENDREFNO"]; 
		document.getElementById("BLK_TLTBS_AMEND_FEE_AUTH__RATE").value = screenArgs["AMENDDATE"]; 
		document.getElementById("BLK_TLTBS_AMEND_FEE_AUTH__AMENDMENTDATE").value = screenArgs["AMENDRATE"]; 
	} */
	document.getElementById("BLK_TLTBS_AMEND_FEE_AUTH__BTN_AUTHORIZE").disabled = false;        
	gAction = 'AUTH';	
	return true;
}
function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';   
    if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		
			document.getElementById("BLK_TLTBS_AMEND_FEE_AUTH__BTN_AUTHORIZE").disabled = true;            
			disableForm();
		}		
        gAction = gprev;
        return true;
    }
}