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
**  File Name          : TLDTDONL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Ch Srinivasulu 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 14.4 SLT amendment fee accounting changes

  Changed By         : Palanisamy M
  Changed On         : 16-Nov-2021
  Search String      : BUG#33393976
  Change Reason      : Added code for query from ACDTRNQY screen by getting contract ref no.  
****************************************************************************************************************************/
//Code for Version number Starts
function fnNext() {
	var verNo=Number(document.getElementById("BLK_TD_MASTER__UIVER").value);
	var versionCount=Number(document.getElementById("BLK_TD_MASTER__LVER").value);
	if(verNo == versionCount){
        showErrorAlerts('IN-PR0011');//Already in the last record
			}
	if(verNo < versionCount){
		verNo++;
		document.getElementById("BLK_TD_MASTER__QUERY_TYPE").value = 'VERSIONQUERY';
		document.getElementById("BLK_TD_MASTER__UIVER").value=Number(verNo);	
		document.getElementById("BLK_TD_MASTER__UIVER").value=Number(verNo);	
		document.getElementById("BLK_TD_MASTER__LVER").value=Number(versionCount);		
		document.getElementById("BLK_TD_MASTER__LVER").value=Number(versionCount);
		appendData();
		g_prev_gAction=gAction;		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

function fnPrev() {
	var verNo=Number(document.getElementById("BLK_TD_MASTER__UIVER").value);
	var versionCount=Number(document.getElementById("BLK_TD_MASTER__LVER").value);
	if(verNo == 1){
		showErrorAlerts('IN-PR0012');//Already in the last record		
	}
	verNo--;
	if(verNo > 0){	
		document.getElementById("BLK_TD_MASTER__QUERY_TYPE").value = 'VERSIONQUERY';	
		document.getElementById("BLK_TD_MASTER__UIVER").value=Number(verNo);	
		document.getElementById("BLK_TD_MASTER__UIVER").value=Number(verNo);
		document.getElementById("BLK_TD_MASTER__LVER").value=Number(versionCount);		
		document.getElementById("BLK_TD_MASTER__LVER").value=Number(versionCount);
		appendData();
		g_prev_gAction=gAction;		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}
//Code for version number Ends.

function fnPreLoad_CVS_TDOAU_KERNEL(screenArgs) {
	screenArgs['FCCREF'] = document.getElementById('BLK_TD_MASTER__FCCREF').value;
    screenArgs['SUB_SCREEN'] = 'Y';
    return true;
}

function fnPreAuthorize_KERNEL(screenArgs) {	
		authFunction = 'TLDTDOAU';
		authUixml = 'TLDTDOAU';
		authScreenName = 'CVS_TDOAU';
		gAction = 'EXECUTEQUERY';
		ArrFuncOrigin['TLDTDOAU'] = "KERNEL";
		ArrPrntFunc['TLDTDOAU'] = "";
		ArrPrntOrigin['TLDTDOAU'] = "";
		return true;	
}
function fnPostAuthorize_KERNEL() {
    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
    return true;
}	
function fnPostExecuteQuery_KERNEL() {
	var trdId = document.getElementById('BLK_TD_MASTER__TRDID').value;
	if (trdId != 'SP') {
	 fnDisableElement(document.getElementById("BLK_TD_MASTER__BTN_SWAP"));
	}
	/*var ignHol = document.getElementById('BLK_HOL_TREAT__IGNORE_HOL').value;
	if (trdId == 'N') {
	 fnDisableElement(document.getElementById("BLK_TD_MASTER__BTN_SWAP"));
	}
	--Check post query of  contract master*/
	 fnEnableElement(document.getElementById("BLK_TD_MASTER__BTN_PREV"));
	 fnEnableElement(document.getElementById("BLK_TD_MASTER__BTN_NEXT"));
	 var l_Rever = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_FOOTER/CONTSTAT"));
	 var l_auth = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_FOOTER/AUTHSTAT")); 
	if (l_Rever == 'V') {
	 DisableToolbar_buttons('Reverse');
	}
	if (l_auth == 'A') {
	 DisableToolbar_buttons('Authorize');
	 DisableToolbar_buttons('Delete');//14.4 SLT amendment fee accounting changes
	}
	return true;
}


function fnPostFocus_KERNEL() {
	
	 var l_Rever = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_FOOTER/CONTSTAT"));
	 var l_auth = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_FOOTER/AUTHSTAT")); 
	if (l_Rever == 'V') {
	 DisableToolbar_buttons('Reverse');
	}
	if (l_auth == 'A') {
	 DisableToolbar_buttons('Authorize');
	}
	return true;
}
//BUG#33393976 starts
function fnPostLoad_KERNEL() {
	var parentWin = fnGetParentWin();
        if (parentWin != "") {
			if  (parent.screenArgs['PARENT_FUNC_ID'] == "ACDTRNQY") {
              fnEnterQuery();
              document.getElementById("BLK_TD_MASTER__FCCREF").value =
                parent.screenArgs["CONTREF"];
              gAction = "EXECUTEQUERY";
              fnExecuteQuery();
            }
		}
}
//BUG#33393976 ends