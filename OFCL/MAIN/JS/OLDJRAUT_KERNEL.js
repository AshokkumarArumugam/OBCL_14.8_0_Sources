/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2007 - 2015  Oracle and/or its affiliates.  All rights reserved.
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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 24-AUG-2016
**  File Name          :LDDJRAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
var subScreen ='N';

function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	getElementsByOjName("BTN_AUTH")[0].disabled = false;
	 gAction = 'NEW'; //Bug#17888935

	//Bug#36619894_1 changes starts						 
    //var rowRef =getTableObjForBlock("BLK_OVD_DEATILS").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_OVD_DEATILS");
    //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_OVD_DEATILS").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
         fnEnableElement(getTableObjForBlock("BLK_OVD_DEATILS").tBodies[0].rows[rowIndex].cells[2].getElementsByTagName("oj-input-text")[0]);
		 fnEnableElement(getTableObjForBlock("BLK_OVD_DEATILS").tBodies[0].rows[rowIndex].cells[7].getElementsByTagName("oj-input-text")[0]);		 
       }
	if (document.getElementById("BLK_AUTH_DETAILS__RKEY_TXNCODE").value=='Y')
		{
			fnEnableElement(document.getElementById("BLK_AUTH_DETAILS__TXNCODE"));	
                         document.getElementById("BLK_AUTH_DETAILS__TXNCODE").value='';//bug#16705276
		}
	if (document.getElementById("BLK_AUTH_DETAILS__RKEY_VALDT").value=='Y')
		{
			fnEnableElement(document.getElementById("BLK_AUTH_DETAILS__VALDT"));	
                        document.getElementById("BLK_AUTH_DETAILS__VALDT").value='';//bug#16705276
		}
	if (document.getElementById("BLK_AUTH_DETAILS__RKEY_ACCNO").value=='Y')
		{
			fnEnableElement(document.getElementById("BLK_AUTH_DETAILS__ACCNO"));	
                        document.getElementById("BLK_AUTH_DETAILS__ACCNO").value='';//bug#16705276
		}
	if (document.getElementById("BLK_AUTH_DETAILS__RKEY_AMT").value=='Y')
		{
			fnEnableElement(document.getElementById("BLK_AUTH_DETAILS__AMT"));	
                        document.getElementById("BLK_AUTH_DETAILS__AMT").value='';//bug#16705276
		}	
	return true;
}

function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
    if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
			getElementsByOjName("BTN_AUTH")[0].disabled = true;
			disableForm();
		}		
        return;
    }
}

function fnPostExecuteQuery_KERNEL()
{
    getElementsByOjName("BTN_AUTH")[0].disabled = false;
    return true;
}

