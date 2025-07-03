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
**  File Name          : TLDTDUPL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Srinivsulu Ch
**  Last modified on   : 20-Aug-2019
**  Full Version       : 
**  Reason             : 14.4 SLT-Amendment fee acoounting changes
**
**  Last Modified By   : Jayaram N
**  Last modified on   : 10-Apr-2020
**  Full Version       : 
**  Reason             : OBCL14.4:SFR#29959798:SLT_Financial_Centre_Holiday_Treatment
**
**  Last Modified By   : Jayaram N
**  Last modified on   : 25-Jul-2022
**  Reason             : Bug#34411726
**
**  Last Modified By   : Jayaram N
**  Last modified on   : 02-Sep-2022
**	Reason             : TLDTDUPL : FIELDS ARE AMENDABLE WHEN DRAFT TRADE IS LAUNCHED FROM SUMMARY SCREEN AND TRADE IS NOT UNLOCKED 
**  Reason             : Bug#34555236
****************************************************************************************************************************/
var PkArr= new Array();
function fnPostNew_KERNEL() {
	fnDisableScreenElement("TAB_MAIN__SEC_1");
    fnDisableScreenElement("TAB_MAIN__SEC_2");
    fnDisableScreenElement("TAB_MAIN__SEC_3");
	fnDisableScreenElement("TAB_MAIN__SEC_4");
	document.getElementById("BLK_TRD_DRAFT__EXT_FCCREF").nextSibling.stlye.visibility='hidden'; 
	return true;
}
function fnProductPickupFailure() {
	document.getElementById("BLK_TRD_DRAFT__PRD_CD").value=''; 
	document.getElementById("BLK_TRD_DRAFT__PRD_DESC").value='';
	gAction = g_prev_gAction;
	return true;
}
function fnPostProductPickup_KERNEL(){
	fnDisableScreenElement("TAB_HEADER__SEC_2");
	fnEnableScreenElement("TAB_MAIN__SEC_1");
    fnEnableScreenElement("TAB_MAIN__SEC_2");
    fnEnableScreenElement("TAB_MAIN__SEC_3");
	fnEnableScreenElement("TAB_MAIN__SEC_4");
	fnChangeHol();
	fnDisable_Swap();
	fnDisableElement(document.getElementById("BLK_CONT_DET__COMMIT_RND_PRICE")); //Bug#34411726:Added
	return true;
}
function fnPostCopy_KERNEL() {
	var msgStatus = fnProcessResponse();
    if (msgStatus == 'SUCCESS') {
		fnDisableScreenElement("TAB_HEADER__SEC_2");
	}
    else if (msgStatus == 'FAILURE') {
         customAlertAction = "COPYFAILURE";
         gAction = 'EXECUTEQUERY';
      }
    return true;
}
function fnCloseAlertWin_COPYFAILURE() {
	gAction = 'EXECUTEQUERY';
    fnExecuteQuery();
    return true;
}
function fnPreLoad_CVS_TDUAU_KERNEL(screenArgs) {
    screenArgs['FCCREF'] = document.getElementById('BLK_TRD_DRAFT__EXT_FCCREF').value;
	screenArgs['BRN'] = document.getElementById('BLK_TRD_DRAFT__BRN').value;
	screenArgs['SRCCD'] = document.getElementById('BLK_TRD_DRAFT__SRC_CODE').value;
	screenArgs['VERNO'] = document.getElementById('BLK_TRD_DRAFT__VERNO').value;
    screenArgs['SUB_SCREEN'] = 'Y';
    return true;
}

function fnPreAuthorize_KERNEL(screenArgs) {
	var gprev = gAction; 
	gAction = "AUTHCHECK";
	appendData();
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	/*
	var l_Maker = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TRD_DRAFT/MAKER"));
		if (l_Maker == mainWin.UserId) {
			 showErrorAlerts('ST-VALS-100');//Maker  cannot authorise
			 return false;
		} */
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus == 'SUCCESS') {
		authFunction = 'TLDTDUAU';
		authUixml = 'TLDTDUAU';
		authScreenName = 'CVS_TDUAU';
		gAction = 'EXECUTEQUERY';
		ArrFuncOrigin['TLDTDUAU'] = "KERNEL";
		ArrPrntFunc['TLDTDUAU'] = "";
		ArrPrntOrigin['TLDTDUAU'] = "";
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
function fnLineTrade(){
	if ( gAction == "NEW" || gAction == "MODIFY" ) { 
	var trdID = document.getElementById("BLK_TRD_DRAFT__TRDID").value;
	var LineTrd = document.getElementById("BLK_OTHER_DET__LINE_TRD").value;
	if (((trdID == 'PO') &&(LineTrd == 'Y')) || (trdID == 'PL') ||(trdID == 'OL')){
		fnDisableElement(document.getElementById("BLK_OTHER_DET__LINE_TRD"));
	}
	else{
		fnEnableElement(document.getElementById("BLK_OTHER_DET__LINE_TRD"));
	}
	}
}
function fnChangeHol(){
	var l_checked = document.getElementById("BLK_HOL_TREAT__IGR_HOL").value;
	if(l_checked){
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__CONSI_BRN_HOL"));
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__LCL_HOL_CCY"));
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__CONT_HOL_CCY"));
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__HOL_CCY"));		
		fnDisableElement(document.getElementById("BLK_HOL_TREAT__APPLY_FC_HOL_TREATMENT")); // OBCL14.4:SFR#29959798:SLT_Financial_Centre_Holiday_Treatment
	}
	else{
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__CONSI_BRN_HOL"));
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__LCL_HOL_CCY"));
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__CONT_HOL_CCY"));
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__HOL_CCY"));	
		fnEnableElement(document.getElementById("BLK_HOL_TREAT__APPLY_FC_HOL_TREATMENT"));	// OBCL14.4:SFR#29959798:SLT_Financial_Centre_Holiday_Treatment	
	}
	fnLineTrade();
	return true;
}
function fnChgCmdRVer(){
	var l_checked = document.getElementById("BLK_OTHER_DET__CMT_RND_VER").value;
	if(l_checked){
		document.getElementById("BLK_OTHER_DET__PIK_VER").value = false;
		fnEnableElement(document.getElementById("BLK_CONT_DET__COMMIT_RND_PRICE"));	
	}
	else{
		document.getElementById("BLK_OTHER_DET__PIK_VER").value = '';
		fnDisableElement(document.getElementById("BLK_CONT_DET__COMMIT_RND_PRICE"));	
	}
	return true;
}
function fnChgPikVer(){
	var l_checked = document.getElementById("BLK_OTHER_DET__PIK_VER").value;
	if(l_checked){
		document.getElementById("BLK_OTHER_DET__CMT_RND_VER").value = false;
	}
	else{
		document.getElementById("BLK_OTHER_DET__CMT_RND_VER").value = true;	
	}
	return true;
}
function fnPostUnlock_KERNEL() {
	if  (gAction == 'MODIFY'){
		var l_CmdRndVer = document.getElementById("BLK_OTHER_DET__CMT_RND_VER").value;
		if (l_CmdRndVer != 'Y'){
			fnDisableElement(document.getElementById("BLK_CONT_DET__COMMIT_RND_PRICE"));
		}
	}	
	return true;
}
//Code for Version number Starts
function fnNext() {
	var verNo=Number(document.getElementById("BLK_TRD_DRAFT__VERNO").value);
	var versionCount=Number(document.getElementById("BLK_TRD_DRAFT__MAX_VERNO").value);
	if(verNo == versionCount){
        showErrorAlerts('IN-PR0011');//Already in the last record
		//showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}
	if(verNo < versionCount){
		verNo++;
		document.getElementById("BLK_TRD_DRAFT__VERNO").value=verNo;	
		document.getElementById("BLK_TRD_DRAFT__VERNO").value=verNo;			
		appendData(document.getElementById("TBLPageAll"));
		g_prev_gAction=gAction;		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

function fnPrev() {	
	var verNo=Number(document.getElementById("BLK_TRD_DRAFT__VERNO").value);
	var versionCount=Number(document.getElementById("BLK_TRD_DRAFT__MAX_VERNO").value);
	if(verNo == 1){
		showErrorAlerts('IN-PR0012');//Already in the last record
		//showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the last record
	}
	verNo--;
	if(verNo > 0){			
		document.getElementById("BLK_TRD_DRAFT__VERNO").value=verNo;		
		document.getElementById("BLK_TRD_DRAFT__VERNO").value=verNo;
		//document.getElementById("BLK_TRD_DRAFT__LVER").value=verNo;		
		//document.getElementById("BLK_TRD_DRAFT__LVER").value=verNo;
		appendData(document.getElementById("TBLPageAll"));
		g_prev_gAction=gAction;		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}
//Code for version number Ends.
//For Summary
function fnCheck(){
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
	msob_tchk = 0;
    for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
            msob_tchk = msob_tchk +1; 
            selected_row = i ; 
           	} 
         }
        else
          break;
     }
	 if (msob_tchk == 0 ) {        
		showErrorAlerts('IN-HEAR-206');
         return false ;  
	}
	if (msob_tchk > 1 ) {        
		showErrorAlerts('IN-HEAR-283');
        return false ;
    }	
	return true;	
}
function fn_GetCellIndex(pVar){
	for (var i = 0 ; i < getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells.length ; i++){
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells[i].getAttribute("name") == pVar){
			return i;
		}
	}
}
function fn_GetId(){
    var tableObject = getTableObjForBlock("TBL_QryRslts");
    var allRows = tableObject.tBodies[0].rows;
    count = 0 ;
     try {                                                                              
		for (var recCnt=0; recCnt<allRows.length; recCnt++){                                            
            if (allRows[recCnt].cells[0].getElementsByTagName("INPUT")[0].checked){
				var recIdcell= fn_GetCellIndex("EXT_FCCREF");
				var recId = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[recCnt].cells[recIdcell]);
				var Vercell= fn_GetCellIndex("VERNO");
				var Ver = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[recCnt].cells[Vercell]);
				PkArr[count] = recId +'~' + Ver ;
				count++;
			}
		}
	}
	catch(e) {}         
    return true;	  
}
function fnPreShowDetail_Sum_KERNEL(arg){
	if (event.type == 'click'){
	fn_GetId();
	userDetailPk = PkArr;
	userParentFunc = 'TLDERONL';
	}
	return true;
}
function fnErrorLog(){
	if(fnCheck()){
		fnShowDetail(selected_row);
	}
}
function fnPostExecuteQuery_KERNEL() {
	 enablebutton('Copy', 'actions1');
	//fnChangeHol();
	fnEnableElement(document.getElementById("BLK_TRD_DRAFT__BTN_PREV"));
	fnEnableElement(document.getElementById("BLK_TRD_DRAFT__BTN_NEXT"));
	var  l_process_stat = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TRD_DRAFT/TXNSTAT"));
	var  l_Auth_Stat = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TRD_DRAFT/AUTHSTAT"));
	if (l_Auth_Stat == 'A'){
		 DisableToolbar_buttons('Authorize'); 
		 DisableToolbar_buttons('Delete');
	}
	//for bug  	25817497 start
	var l_Maker = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TRD_DRAFT/MAKER"));
		if (l_Maker == mainWin.UserId) {
			DisableToolbar_buttons('Authorize');
		}
	//for bug  	25817497 end
	return true;
}
function fnPostFocus_KERNEL() {
	//fnChangeHol();  Bug#34555236:Commented
	var  l_process_stat = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TRD_DRAFT/TXNSTAT"));
	var  l_Auth_Stat = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TRD_DRAFT/AUTHSTAT"));
	if (l_Auth_Stat == 'A'){
		 DisableToolbar_buttons('Authorize'); 
		 DisableToolbar_buttons('Delete');
	}
	return true;
}
function fnDisable_Swap(){
	var  l_Swap_reqd = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TRD_DRAFT/SWAPREQD"));
	if (l_Swap_reqd == 'N'){
		var len = document.getElementById("DIVSubSystem").children[0].children.length;
		for (var idx = 0; idx < len; idx++) {
			if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "TLCSWUPL") {
					var SwapLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];
					if(SwapLink==undefined){
							SwapLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
						}
					fnDisableSubSysButtons(SwapLink);
			}
		}				
	}
	return true;
}

//14.4 SLT-Amendment fee acoounting changes
/*
function fnPostDependentSubSys_CVS_FEE_KERNEL(){
	var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(l_statusStr, 'TLCUPSSI');
	if (stat == 'U'){
		showErrorAlerts('IN-TRD-003');
	}
	return true;
}*/