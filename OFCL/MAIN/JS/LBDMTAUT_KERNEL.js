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
**  File Name          : LBDMTAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTHVAMI_KERNEL(screenArgs) {
    subScreen = 'Y';
   document.getElementById("BLK_AUTH_REKEY__CALLINGFID").value=screenArgs['MASTERFNID'];
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
            document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = false; 
         
    
	gAction = 'NEW';
	//Bug#36619894 changes starts 
	//var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows; 
    var len = getOjTableRowsLength("BLK_CONTRACT_OVD");	
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
    for(var rowIndex =0; rowIndex < len; rowIndex++)
	//Bug#36619894 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	return true;
}


function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
			
			document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = true; 
            document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = true;
			
			// SFR-13478375 ends 
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}

function fnOnlineReject() {
    var gprev = gAction;
    
	 gAction = 'LB_REJECT';  
   
    if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
			
			document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = true; 
            document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = true;
			
			// SFR-13478375 ends 
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}

function fnPostExecuteQuery_KERNEL()
{
   

	//Bug#36619894 changes starts 
	//var rowRef =getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows; 
    var len = getOjTableRowsLength("BLK_CONTRACT_OVD");	
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
    for(var rowIndex =0; rowIndex < len; rowIndex++)
	//Bug#36619894 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	document.getElementById("BLK_AUTH_REKEY__BTN_AUTH").disabled = false; 
    document.getElementById("BLK_AUTH_REKEY__BTN_REJECT").disabled = false;
    // SFR-13478375 Ends
	

    return true;
}
