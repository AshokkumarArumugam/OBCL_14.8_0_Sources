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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 26-AUG-2016
**  File Name          : LDDEXAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Satheesh Seshan 
**  Last modified on   : 06-Jun-2022
**  Search String      : Bug#34240321
**  Reason             : Commented NEW action-assign prev action only incase of Fail
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_MAIN_KERNEL(screenArgs) {
    subScreen = 'Y';
   // document.getElementById("BLK_OLTBS_CONTRACT__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
       //document.getElementById("BLK_EXRATE_MASTER__BTNAUTH").disabled = false;
    fnEnableElement(document.getElementById("BLK_EXRATEMASTER__CONTRACTREFNO"));
    fnEnableElement(document.getElementById("BLK_EXRATEMASTER__MAKERID"));
    fnEnableElement(document.getElementById("BLK_EXRATEMASTER__BTNAUTH"));

    
	//gAction = 'NEW'; //Bug#34240321 commented
	
	return true;
}
function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
        //document.getElementById("BLK_EXRATEMASTER__BTNAUTH").disabled = true; //Bug#34240321 commented
		
		fnDisableElement(document.getElementById("BLK_EXRATEMASTER__BTNAUTH")); //Bug#34240321 Added
            
			disableForm();
		}		
        //Bug#34240321 Starts
		if (l_msgStat == 'FAILURE') { 
		gAction = gprev ;
		}
		//Bug#34240321 Ends
		
        //gAction = gprev; Bug#34240321 commented
        return true;  //Bug#34240321 Added true
    }
}
