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
**  File Name          : LBDRSAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Last Modified By   : Surya Prabha
**  Last modified on   : 12-OCT-2021
**  Reason             : Commented the code to disable amount field during authorization
**  Search String      : Bug#33456700 changes
**
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	//debugger;
	subScreen = 'Y';
		
		 if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_SPLIT_MASTER__BTNAUTHORIZE"));
	   
	// Bug#33456700 changes start
	/*var tableObj =getTableObjForBlock('BLK_SPLIT_DETAIL');
	 var rows = tableObj.tBodies[0].rows.length;
        for (var i = 0; i < rows; i++) 
		{
		  enableRowElements(tableObj.tBodies[0].rows[i].cells[3]);
		  enableRowElements(tableObj.tBodies[0].rows[i].cells[4]);
        }*/
	// Bug#33456700 changes end
	
    
	var tableObj =getTableObjForBlock('BLK_CONTRACT_OVD');
	//Bug#36619894 changes starts
	//var rows = tableObj.tBodies[0].rows.length;
	var rows = getOjTableRowsLength("BLK_CONTRACT_OVD");	
	//Bug#36619894 changes ends 
	
        for (var i = 0; i < rows; i++) 
		{
		  enableRowElements(tableObj.tBodies[0].rows[i].cells[1]);
        }
		gAction = 'AUTH';
	return true;
		
	

	
}

function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDRSAUT';
    authUixml = 'LBDRSAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['LBDRSAUT'] = "KERNEL";
    ArrPrntFunc['LBDRSAUT'] = "";
    ArrPrntOrigin['LBDRSAUT'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}



function FN_ONAUTH(){
	 var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_SPLIT_MASTER__BTNAUTHORIZE"));        
			disableForm();
		}	
        return true;
    }
}
function FnViewMsg(){
	return true;
}



/* 
function fnPostNew_KERNEL(){
	
	fnDisableElement(document.getElementById('BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO'));
	return true; 
} */

/*function fnPostExecuteQuery_KERNEL() {
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_UPLOAD'));
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_MARK_PRCSD'));
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_REJECT'));
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_REPLY'));
	return true;
}*/
