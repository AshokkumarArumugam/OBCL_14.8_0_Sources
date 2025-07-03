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
**  File Name          : LBDCOLPA_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   :
**  Last modified on   : 
**  Search String      :  
**  Reason             : 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';

    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__BTN_AUTH"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTCCY"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTAMOUNT"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTMATDT"));
	var tableObj =getTableObjForBlock('BLK_CONTRACT_OVD');//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
	//Bug#36619894 changes starts						 
    // var rows = tableObj.tBodies[0].rows.length; 
    //for (var i = 0; i < rows; i++) 
    var rows = getOjTableRowsLength("BLK_CONTRACT_OVD");
	for(var rowIndex =0; rowIndex < rows; rowIndex++)	
	//Bug#36619894 changes ends
		{
		  enableRowElements(tableObj.tBodies[0].rows[i].cells[1]);
        }	   
	  // fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXT_COUNTERPARTY")); 
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__BTNAUTH"));
	 	
	gAction = 'AUTH';
	 
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	   DisableToolbar_buttons("Authorize");
	   var s = document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CONTRACTREFNO1").value;
       fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__BTN_AUTH"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTCCY"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTAMOUNT"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXTMATDT"));
	  // fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__TXT_COUNTERPARTY")); 
	  fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__BTNAUTH"));        
	  
      	   
	 
 return true;
}

function FN_ONAUTH(){
	    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__BTNAUTH"));        
			disableForm();
		}	
        return true;
    }
}
