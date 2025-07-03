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
**  File Name          : TLDSETTL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Anusha K
**  Last modified on   : 20-DEC-2018
**  SFR    		       : 29057716
**  Search Sting       : OBCL_14.2_retro_#29057716 Changes 
**
**
**  Last Modified By   : Pallavi R
**  Last modified on   : 26-APR-2021
**  Description        : Changes to make manual funding memo screen visit mandataory without visiting anyother subsystem 
**						 in case of manual funding memo source
**  Search Sting       : OBCL_14.4_SMTB_#32655162 Changes 
**
**  Last Modified By   : Jayaram N
**  Last modified on   : 02-SEP-2021
**  Description        : UNABLE TO AUTHORIZE THE SETTLEMENT OF DRAFT TRADE
**  Search Sting       : Bug#33295786
**  Last Modified By   : Rajni K 
**  Last modified on   : 13-SEP-2022
**  Description        : Changes for HOLD action
**  Search Sting       : Bug#34483382
****************************************************************************************************************************/
function fnPostExecuteQuery_KERNEL() {
	fnEnableElement(document.getElementById("BLK_TRD_STL__BTN_PREV"));
	fnEnableElement(document.getElementById("BLK_TRD_STL__BTN_NEXT"));	
	getElementsByOjName("cmdAddRow_BLK_FEE_DET")[0].style.visibility = "hidden";
	getElementsByOjName("cmdDelRow_BLK_FEE_DET")[0].style.visibility = "hidden";
	var gFeeReqd = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/FEE_REQD"));
	 if ((gAction == 'MODIFY') && (gFeeReqd != 'N')) {
          fnDisableElement(document.getElementById("BLK_TRD_STL__BTN_FEE"));
    }
	if (gAction == ''){
		var gRevReqd = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/REV_REQD"));
		var l_Rev = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/BLK_FOOTER/TXNSTAT"));
		var l_cont_Stat = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/BLK_FOOTER/FOOT_CONT_STAT"));
		if (((gFeeReqd != 'N') && (gFeeReqd != ''))||(l_Rev == 'R')) {
			  DisableToolbar_buttons('REVERSE');
		}
		var l_Auth = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/BLK_FOOTER/FOOT_AUTH_STAT"));
		if (l_Auth == 'A') {
			  DisableToolbar_buttons('Authorize');
			  DisableToolbar_buttons('Delete');		  
		}	
		if (l_cont_Stat == 'L'){
			DisableToolbar_buttons('Unlock');		
		}
		//Bug#34483382 Changes Start
		if (l_cont_Stat == 'H'){
			  DisableToolbar_buttons('Hold');
			  DisableToolbar_buttons('Authorize');
			  DisableToolbar_buttons('REVERSE');
		}
		//Bug#34483382 Changes End
		if (gAction == ''){
			  DisableToolbar_buttons('Hold');
		}
		//Bug#33295786-Starts here
		if ( l_Rev == 'N' && l_cont_Stat == 'A' && l_Auth == 'A' ){
			DisableToolbar_buttons('Unlock');
		}	
		//Bug#33295786-Ends here
	}	
	return true;
}
function fnPostFocus_KERNEL() {
	getElementsByOjName("cmdAddRow_BLK_FEE_DET")[0].style.visibility = "hidden";
	getElementsByOjName("cmdDelRow_BLK_FEE_DET")[0].style.visibility = "hidden";
	var gFeeReqd = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/FEE_REQD"));
    if ((gAction == 'MODIFY') && (gFeeReqd != 'N')) {
          fnDisableElement(document.getElementById("BLK_TRD_STL__BTN_FEE"));
    }
	if (gAction == ''){
		var gRevReqd = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/REV_REQD"));
		var l_Rev = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/BLK_FOOTER/TXNSTAT"));
		var l_cont_Stat = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/BLK_FOOTER/FOOT_CONT_STAT"));
		if (((gFeeReqd != 'N') && (gFeeReqd != ''))||(l_Rev == 'R')) {
			  DisableToolbar_buttons('REVERSE');
		}
		var l_Auth = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "BLK_TRD_STL/BLK_FOOTER/FOOT_AUTH_STAT"));
		if (l_Auth == 'A') {
			  DisableToolbar_buttons('Authorize');
			  DisableToolbar_buttons('Delete');		  
		}	
		if (l_cont_Stat == 'L'){
			DisableToolbar_buttons('Unlock');		
		}
		//Bug#34483382 Changes Start
		if (l_cont_Stat == 'H'){
			  DisableToolbar_buttons('Hold');
			  DisableToolbar_buttons('Authorize');
			  DisableToolbar_buttons('REVERSE');
		}
		//Bug#34483382 Changes End
		if (gAction == ''){
			  DisableToolbar_buttons('Hold');
		}
		//Bug#33295786-Starts here
		if ( l_Rev == 'N' && l_cont_Stat == 'A' && l_Auth == 'A' ){
			DisableToolbar_buttons('Unlock');
		}	
		//Bug#33295786-Ends here
	}	
	return true;
}
function fnPreUnlock_KERNEL(){
	var old_Action = gAction;
	gAction = 'PRDDFLT';
	appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var msgStatus = fnProcessResponse();
	gAction = old_Action;
	if (msgStatus == 'FAILUER'){
		return false;
	}
	return true;
}	
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
	screenArgs['FCCREF'] = document.getElementById('BLK_TRD_STL__FCCREF').value;
    screenArgs['SUB_SCREEN'] = 'Y';
    return true;
}

function fnPreAuthorize_KERNEL(screenArgs) {
	var gprev = gAction; 
	gAction = "AUTHCHECK";
	appendData();
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));//fnProcessResponse();
	if (msgStatus == 'SUCCESS') {
		authFunction = 'TLDTRSAU';
		authUixml = 'TLDTRSAU';
		authScreenName = 'CVS_AUTH';
		gAction = 'EXECUTEQUERY';
		ArrFuncOrigin['TLDTRSAU'] = "KERNEL";
		ArrPrntFunc['TLDTRSAU'] = "";
		ArrPrntOrigin['TLDTRSAU'] = "";
		return true;
	}
	else{
		fnProcessResponse();
		gAction = gprev;
		return false;
	}
    return true;
}

function fnPostAuthorize_KERNEL() {
    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
    return true;
}	
 //OBCL_14.2_retro_#29057716 Changes Starts
function fnPrePickUpSubSystem_CVS_MEMUP_MAIN_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var Ssi_Stat = extractSubSysStat(l_statusStr, 'TLCONSSI');
	if (Ssi_Stat == 'R'){
		//SSI details will be cleared.SSI needs to be input.
		 showErrorAlerts('IN-TRD-003');
        return false;
	}
	return true;
}
//OBCL_14.2_retro_#29057716 Changes Ends
function fnPreLoad_CVS_MEMUP_MAIN_KERNEL(){
	var l_memup = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "//BLK_TRD_STL/FMEMUP"));
	var l_memo = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "//BLK_TRD_STL/FMEMO"));
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCMEMUP');
	if ((l_memo == 'Y') && (l_memup == 'N')&&(stat != 'U')){
		//Please visit Manual Funding Memo screen
		 showErrorAlerts('IN-TRD-002');
        return false;
	}
	return true;
}
 //OBCL_14.2_retro_#29057716 Changes  Starts
function fnPrePickUpSubSystem_CVS_MEMUP_MAIN_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
    var prevStatusStr = statusStr;
    fnCheckSubSysValues(statusStr);
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var Ssi_Stat = extractSubSysStat(l_statusStr, 'TLCONSSI');
	if (Ssi_Stat == 'R'){
		//SSI details will be cleared.SSI needs to be input.
		 showErrorAlerts('IN-TRD-003');
		 getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
		 return false;
	}
	getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
	return true;
}
//OBCL_14.2_retro_#29057716 Changes Ends
function fnPreLoad_CVS_TLCFMEMO_KERNEL(){
	var l_memup = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "//BLK_TRD_STL/FMEMUP"));
	var l_memo = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "//BLK_TRD_STL/FMEMO"));
	if ((l_memo == 'N') && (l_memup == 'Y')){
		//Please visit Funding Memo Memo screen
		 showErrorAlerts('IN-TRD-001');
        return false; 
	}
	return true;
}
 //OBCL_14.2_retro_#29057716 Changes Starts
function fnPrePickUpSubSystem_CVS_TLCFMEMO_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
    var prevStatusStr = statusStr;
    fnCheckSubSysValues(statusStr);
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var Ssi_Stat = extractSubSysStat(l_statusStr, 'TLCONSSI');
	if (Ssi_Stat == 'R'){
		//SSI details will be cleared.SSI needs to be input.
		 showErrorAlerts('IN-TRD-003');
		 getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
		 return false;
	}
	getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
	return true;
}
//OBCL_14.2_retro_#29057716 Changes Ends
function fnPostDependentSubSys_CVS_MEMUP_MAIN_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCFMEMO');
	if (stat == 'U'){
		//Funding Memo details will be cleared.Please Visit Funding Memo.
		showErrorAlerts('IN-TRD-004');
	}
	return true;
}
function fnPostDependentSubSys_CVS_ASSIGN_FEE_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCFMEMO');
	if (stat == 'U'){
		//Funding Memo details will be cleared.Please Visit Funding Memo.
		showErrorAlerts('IN-TRD-004');
	}
	return true;
}

//OBCL_14.2_retro_#29057716 Changes Starts
function fnPostDependentSubSys_CVS_SSI_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCFMEMO');
	if (stat == 'U'){
		//Funding Memo details will be cleared.Please Visit Funding Memo.
		showErrorAlerts('IN-TRD-004');
	}
	return true;
}
function fnPrePickUpSubSystem_CVS_SETTLEMENTS_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	//OBCL_14.4_SMTB_#32655162 Changes Starts
	var stat = extractSubSysStat(l_statusStr, 'TLCMEMUP');
	var fmem_Source=getElementsByOjName('FMEM_SRC')[0].value;
	if ((stat == 'D') && (fmem_Source == 'M')){
		showErrorAlerts('IN-TRD-001');
		return false;
	}
	//OBCL_14.4_SMTB_#32655162 Changes Ends
    var prevStatusStr = statusStr;
    fnCheckSubSysValues(statusStr);
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var Ssi_Stat = extractSubSysStat(l_statusStr, 'TLCONSSI');
	if (Ssi_Stat == 'R'){
		//SSI details will be cleared.SSI needs to be input.
		 showErrorAlerts('IN-TRD-003');
		 getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
		 return false;
	}
	getElementsByOjName('SUBSYSSTAT')[0].value = prevStatusStr;
	return true;
}
//OBCL_14.2_retro_#29057716 Changes Ends
//OBCL_14.4_SMTB_#32655162 Changes Starts
function fnPrePickUpSubSystem_CVS_ASSIGN_FEE_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCMEMUP');
	var fmem_Source=getElementsByOjName('FMEM_SRC')[0].value;
	if ((stat == 'D') && (fmem_Source == 'M')){
		showErrorAlerts('IN-TRD-001');
		return false;
	}
	return true;
}
function fnPrePickUpSubSystem_CVS_ENTITY_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCMEMUP');
	var fmem_Source=getElementsByOjName('FMEM_SRC')[0].value;
	if ((stat == 'D') && (fmem_Source == 'M')){
		showErrorAlerts('IN-TRD-001');
		return false;
	}
	return true;
}
function fnPrePickUpSubSystem_CVS_TLCEXSSI_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCMEMUP');
	var fmem_Source=getElementsByOjName('FMEM_SRC')[0].value;
	if ((stat == 'D') && (fmem_Source == 'M')){
		showErrorAlerts('IN-TRD-001');
		return false;
	}
	return true;
}
//OBCL_14.4_SMTB_#32655162 Changes Ends
function fnPreExit_KERNEL(event) {
	customAlertAction = "ACCEPTCANCELTRADE";
	return true;  
}
function fnCloseAlertWin_ACCEPTCANCELTRADE(event){
	if (alertAction == "EXITACTION"){
		if (gAction == "MODIFY"){
		     	releaseLock();
		}	
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		event.cancelBubble = true;
		gAction = "";
	}
	return true;
}		
//Code for Version number Starts
function fnNext() {
	var currStl=document.getElementById("BLK_TRD_STL__CURR_STL").value;
	var TotStl=document.getElementById("BLK_TRD_STL__TOT_STL").value;
	if(currStl == TotStl){
        showErrorAlerts('IN-PR0011');
	}
	if(currStl < TotStl){
		document.getElementById("BLK_TRD_STL__VERQUERY").value='YN';	
		document.getElementById("BLK_TRD_STL__CURR_STL").value = currStl;
		document.getElementById("BLK_TRD_STL__TOT_STL").value = TotStl;
		appendData();
		g_prev_gAction=gAction;		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

function fnPrev() {
	var currStl=document.getElementById("BLK_TRD_STL__CURR_STL").value;
	var TotStl=document.getElementById("BLK_TRD_STL__TOT_STL").value;
	if(currStl == 1){
		showErrorAlerts('IN-PR0012');//Already in the last record
	}
	if(currStl > 0){			
		document.getElementById("BLK_TRD_STL__VERQUERY").value='YP';		
		document.getElementById("BLK_TRD_STL__CURR_STL").value = currStl;
		document.getElementById("BLK_TRD_STL__TOT_STL").value = TotStl;		
		appendData();
		g_prev_gAction=gAction;		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}
//Code for version number Ends.
/*    
    --On click of stl button set 
	Stl_pick_reqd = 'Y'
	--On click of  ssi button set 
	Ssi_pick_reqd = 'Y'
	--after changing agency id 
		L_ALERT_RETURN := OVPKCS.FN_DISPMSG('LT-C0112;','Agency Id~;',';');
			  	:GLOBAL.G_REPICKUP_REQD := 'Y';
				--BTN_FUNDING_MEMO
				set prm_setl_amt_due_picked and check in fmb where to use that param
				
  --On Modify
  :Blk_Lttbs_Settlement_Master.Txt_Fmem_Status := NULL;
  BEGIN
				SELECT	NVL(param_val,'N')
				INTO		:PARAMETER.PRM_ASGNFEE_PMNT_ATTKT
				FROM		cstb_param	
				WHERE		param_name ='ASGNFEE_PMNT_ATTKT'; 
		EXCEPTION
						WHEN OTHERS THEN
						:PARAMETER.PRM_ASGNFEE_PMNT_ATTKT := 'N';
		END;
 		ovpkcs.pr_debug_msg('PRM_ASGNFEE_PMNT_ATTKT ::'||:PARAMETER.PRM_ASGNFEE_PMNT_ATTKT);	
		
		 IF :Parameter.Prm_Action_Code = 'N' --this has to be after execute query
       THEN
        Ltpkcs_Misc.Pr_Set_Agency_Id;
      END IF;
	 --On auth 
	  IF :Parameter.Prm_Visited_Auth = 'N' THEN
    Ov_Return := Ovpkcs.Fn_Dispmsg('LL-SET001;',
	
                                   ';',
                                   ';');
    RAISE Form_Trigger_Failure;
  END IF;
  IF :Parameter.Prm_Visited_Auth = 'N' THEN
    Ovpkcs.Pr_Debug_Msg('Before raising trigger failure');
    Ov_Return := Ovpkcs.Fn_Dispmsg('LD-SET001;',
                                   ';',
                                   ';');
  
    RAISE Form_Trigger_Failure;
  
  END IF;*/