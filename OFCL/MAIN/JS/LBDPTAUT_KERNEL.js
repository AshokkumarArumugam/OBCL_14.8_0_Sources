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
**  File Name          : LBDPTAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 21-04-2023
**  Reason             : Authorize button issue
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
**
**  Last Modified By   : Pallavi R
**  Last modified on   : 06-Feb-2025
**  Search String      : OBCL_14.7_RABO_#37547099 Changes
**  Reason             : Added code to enable confirmed checkbox.
****************************************************************************************************************************/
var subScreen='N';
var fcjResponseDOM;
var fcjRequestDOM;
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	 subScreen = 'Y';
	 screenArgs = parent.screenArgs;
	 if (screenArgs['CONTRAREFNO'] != undefined)
	{
		document.getElementById("BLK_MAIN__CONTRACTREFNO").value =  screenArgs['CONTRAREFNO'];
	}
	if (screenArgs['USERREFNO'] != undefined)
	{
		document.getElementById("BLK_MAIN__USERREFNO").value =  screenArgs['USERREFNO'];
	}
	if (screenArgs['EVESEQNUMB'] != undefined)
	{
		//document.getElementById("BLK_MAIN__TXT_EVENTSEQNOI").value =  screenArgs['EVESEQNUMB'];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		document.getElementById("BLK_MAIN__TXT_EVENTSEQNO").value =  screenArgs['EVESEQNUMB'];
	}
	if (screenArgs['VALUEDT'] != undefined)
	{
		document.getElementById("BLK_MAIN__TXT_VALUE_DATE").value =  screenArgs['VALUEDT'];
	}
	
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	
	/* if (screenArgs['EVESEQNUMB'] != undefined)
	{
		document.getElementById("BLK_MAIN__TXT_EVENTSEQNOI").value =  screenArgs['EVESEQNUMB'];
		document.getElementById("BLK_MAIN__TXT_EVENTSEQNO").value =  screenArgs['EVESEQNUMB'];
	} */

	//OBCL_14.7_RABO_#37547099 Changes Starts
	 var rowRef =document.getElementById("BLK_AUTH_OVD").tBodies[0].rows;  
      for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(document.getElementById("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("INPUT")[0]);
      }
	//OBCL_14.7_RABO_#37547099 Changes Ends
	 fnEnableElement(document.getElementById("BLK_MAIN__BTNAUTHORISEUI"));
	return true;
}
function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById("BLK_MAIN__BTNAUTHORISEUI"));
	document.getElementById("Authorize").style.visibility="hidden";
	  return true;
}
function fnPartTransferAuth(){
    var g_prev_gAction = gAction;
    gAction = 'AUTH';
  if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {

			disableForm();
		}
   
    gAction = g_prev_gAction;
    return true;
}
}
