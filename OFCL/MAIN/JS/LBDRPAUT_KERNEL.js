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
**  File Name          : LBDRPAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Last Modified By   : Pallavi R
**  Last modified on   : 06-Feb-2025
**  Search String      : OBCL_14.7_RABO_#37547099 Changes
**  Reason             : Added code to enable confirmed checkbox.
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	//gAction = 'NEW';
	gAction = 'AUTH';
	fnEnableElement(document.getElementById("BLK_MERGE_MASTER__BTNAUTHORIZE"));
	//OBCL_14.7_RABO_#37547099 Changes Starts
	 var rowRef =document.getElementById("BLK_CONTRACT_OVD").tBodies[0].rows;  
      for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(document.getElementById("BLK_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[5].getElementsByTagName("INPUT")[0]);
      }
	//OBCL_14.7_RABO_#37547099 Changes Ends
	 //document.getElementById('BLK_OLTBS_CONTRACT__CONTRACTREF_NO').value = screenArgs['CONREF'] ;
	// document.getElementById('BLK_MERGE_MASTER__MERGESERIALNOI').value = screenArgs['MERGSRNO'] ;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	 document.getElementById('BLK_MERGE_MASTER__MERGESERIALNO').value = screenArgs['MERGSRNO'] ;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
     //document.getElementById('BLK_MERGE_MASTER_HDR__MERGEBOOKDATE').value = screenArgs['BOOKDATE'] ;
	 //document.getElementById('BLK_MERGE_MASTER_HDR__MERGEVALUEDATE').value =screenArgs['VALUEDATE'] ;	 
	return true;
}
function Fn_Authorize(){
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
		document.getElementById("BLK_MERGE_MASTER__BTNAUTHORIZE").disabled = true;
            
			disableForm();
		}		
        gAction = gprev;
        return;
    }
}