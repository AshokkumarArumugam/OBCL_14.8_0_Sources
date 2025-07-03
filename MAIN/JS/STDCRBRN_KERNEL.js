/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2020, Oracle and/or its affiliates.
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
**  File Name          : STDCRBRN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

    Modified by           : Nisha B C
    Modified On          : 24-Apr-2019
    Modified Reason      : FCUBS_JC_Minicore Integration_Currency_V1.1
    Search String        : JC_Minicore Integration_Currency
	
**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES	
****************************************************************************************************************************/
function fnPostUnlock_KERNEL() {
	var L_OnceAuthStat1 = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "//BLK_CORE_BRANCH/ONCEAUTH"));
	if  (L_OnceAuthStat1 == 'Y')
	{
		fnDisableElement(document.getElementById("BLK_CORE_BRANCH__HOST_CODE"));
	}
	return true;
}
//JC_Minicore Integration_Currency Starts
function fnPostCopy_KERNEL() 
{
  /*Assigning the checkbox to be null*/
  document.getElementById("BLK_CORE_BRANCH__HO_EXRATE").value = false; //redwood_Changes checkbox
  return true;
}
function fnPostLoad_CVS_PREFERENCES_KERNEL()
{
var gPrevAction; 

	if(gPrevAction=="NEW" || gAction=="NEW" )
	{
		gPrevAction = gAction;
		gAction = "DEFAULT_HOEXRATE"; 
		console.log(g_prevAction);	
		var fcjRequestDOM = buildUBSXml();
		var i=0, count=0;
		var value;
		fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM)
		{
            fnProcessResponse();
        }
		gAction = gPrevAction;
	}
	return true;
}
//JC_Minicore Integration_Currency ends