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
**  File Name          : OLDFFMCU_KERNEL.js
**  Purpose            : 
**  Called From        : OLDFFMCU
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             :   
**
**  Modified By     : Pallavi R
**  Modified On     : 28-Oct-2024
**  Modified Reason : User was not able to capture Free Format messages for customers/Hold contracts.
**  Search String   : OBCL_14.7_RABO_#36819729 Changes 
					  (No Search string added in this unit as The code was completely rewritten to correspond with the transaction screens)

****************************************************************************************************************************/
var lAction;
var gDisbtn = 'N';
function fnPostNew_KERNEL(){
	gDisbtn ='N';
	document.getElementById("BLK_FFMCU_MAS__ORIGACTION").value = gAction;
	fnDisableScreenElement("TAB_MAIN__SEC_1");
	fnDisableScreenElement("TAB_MAIN__SEC_2");
	fnDisableScreenElement("TAB_MAIN__SEC_3");
	return true;
}

function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById('BLK_FFMCU_MAS__BTN_MSG_PREVIEW'));
	return true;
}
function fnPostEnrichDetails_KERNEL(){
	fnDisableScreenElement("TAB_HEADER__SEC_HEAD");
	fnEnableScreenElement("TAB_MAIN__SEC_1");
	fnEnableScreenElement("TAB_MAIN__SEC_2");
	fnEnableScreenElement("TAB_MAIN__SEC_3");
	fnEnableElement(document.getElementById('BLK_FFMCU_MAS__MESSAGE'));
	document.getElementById("cmdAddRow_BLK_ENT_DET").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_ENT_DET").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_BORR_DET").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_BORR_DET").style.visibility = 'hidden';
	gDisbtn ='Y';
	return true; 
}
function fnMsgPreview(){
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(statusStr, 'PREVIEW');
	if ((stat == 'D') && (gAction != '')){
		lAction = 'PREVIEW';
		fnClassDefault("BLK_FFMCU_MAS");
	}
	else{
		fnSubScreenMain('OLDFFMCU','','CVS_PREVIEW');
	}
	return true;
}
function fnGenMsg(){
	lAction = 'GENMSG';
	fnClassDefault("BLK_FFMCU_MAS");
	return true;
}
function fnPreClassDefault__KERNEL(){
	gAction = lAction;
	return true;
}
function fnPostFocus_KERNEL(){
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var pStat = extractSubSysStat(statusStr, 'PREVIEW');
	var gStat = extractSubSysStat(statusStr, 'GENERATE');
	if (((pStat != 'D') ||(gStat != 'D')) && (gAction !='')) {
		disableForm();
		fnEnableElement(document.getElementById('BLK_FFMCU_MAS__BTN_MSG_PREVIEW'));
		if (pStat != 'D'){
			fnEnableElement(document.getElementById('BLK_FFMCU_MAS__BTN_GEN'));			
		}
	}
	else if (gDisbtn =='Y'){
		fnDisableElement(document.getElementById('BLK_FFMCU_MAS__BTN_GEN'));
	}	
	if (gAction == 'NEW'){
	}
	if (gAction != 'NEW'){
		fnDisableElement(document.getElementById('BLK_FFMCU_MAS__BTN_GEN'));
	}
	return true;
}	
function fnPostClassDefault__KERNEL(){
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if ((msgStatus == "WARNING" || msgStatus == "SUCCESS") &&  (lAction == 'PREVIEW')) {
		fnSubScreenMain('OLDFFMCU','','CVS_PREVIEW');	
	}
	return true;
}
function fnPreAuthorize_KERNEL(){
	authFunction = 'OLDFFMAT';
    authUixml = 'OLDFFMAT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDFFMAT'] = "KERNEL";
    ArrPrntFunc['OLDFFMAT'] = "";
    ArrPrntOrigin['OLDFFMAT'] = "";
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
	return true;
}