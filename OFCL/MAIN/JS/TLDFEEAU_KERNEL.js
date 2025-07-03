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
**  File Name          : TLDFEEAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 13-Aug-2019
**  Full Version       : 
**  Reason             : 14.4SLT Amendment Fee Changes
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
	
	if(!fnProcessAuthOnLoad(screenArgs))
        return false;
        document.getElementById("BLK_AUTHORIZE__BTN_OK_AUTHORIZE").disabled = false;        
	gAction = 'AUTH';	
	/*if (screenArgs['SUB_SCREEN'] == 'Y'){
		document.getElementById('BLK_AUTHORIZE__CONTRACT_REF_NO').value = screenArgs['CONREF'];
		document.getElementById('BLK_AUTHORIZE__TXT_CONTRACT_REF_NO').value = document.getElementById('BLK_AUTHORIZE__CONTRACT_REF_NO').value;
		document.getElementById('BLK_AUTHORIZE__COUNTERPARTY').value = screenArgs['CNTPRTY'];
		document.getElementById('BLK_AUTHORIZE__TXT_EVENT_DATE').value = screenArgs['EVTDATE'];
		document.getElementById('BLK_AUTHORIZE__TXT_MAKER_ID').value = screenArgs['MAKERID'];
		document.getElementById('BLK_AUTHORIZE__TXT_COUNTERPARTY').value = screenArgs['CNTPRTY'];
		document.getElementById('BLK_AUTHORIZE__TXT_TRADE_DATE').value = screenArgs['TRDDATE'];
		document.getElementById('BLK_AUTHORIZE__TXT_EXPT_SETTLEMENT_DATE').value = screenArgs['EXPSETDATE'];
		document.getElementById('BLK_AUTHORIZE__TXT_CURRENCY').value = screenArgs['CCY'];
		document.getElementById('BLK_AUTHORIZE__TXT_TRADE_AMOUNT').value = screenArgs['TRDAMT'];
		document.getElementById('BLK_AUTHORIZE__TXT_TRADE_PRICE').value = screenArgs['TRDPRI'];
		functionOrigin = 'KERNEL'; 
		dbIndexArray['BLK_AUTHORIZE'] = getDbIndex("BLK_AUTHORIZE");
		gAction = "EXECUTEQUERY";
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		var msgStatus = fnProcessResponse();
		fnEnableElement(document.getElementById('BLK_AUTHORIZE__BTN_OK_AUTHORIZE'));
	}	
	
	var rowRef =getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows;  
    for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 //fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }*/
	return true;
}
//14.4 SLT Amendment Fee Changes
/*
function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById('BLK_AUTHORIZE__BTN_OK_AUTHORIZE'));
	//mainWin.t['1+2'] = ['Enter Query'];	
	var rowRef =getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows;  
    for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 //fnEnableElement(getTableObjForBlock("BLK_AUTH_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	return true;
}*/

function FnAuthorize() {
   var gprev = ""; 
	gAction = 'AUTH';
	if (!fnOnlineAuthorize(subScreen)) {
       var l_msgStat =getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
       if (l_msgStat == 'SUCCESS') {
          document.getElementById("BLK_FEE_AUTH__BTN_AUTH").disabled = true;            
			disableForm();		
       }
	    gAction = gprev;
        //processingAction = 'Auth';
	   return;
	 }
	return true;
}