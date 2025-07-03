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
**  File Name          : LBDFEAMD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

   **Changed By         : Pallavi R
   **Date               : 04-Apr-2019
   **Change Description : Expense fee changes
   **Search String      : OBCL_14.4_LS_EXP_Fee Changes  
   
   **Changed By         : Sowmya B
   **Date               : 05-AUG-2020
   **Change Description : Fix for Fee Basis modification upon unlock
   **Search String      : OBCL_14.1_Support_Bug#31522642_changes 
   
   **Changed By         : RAMYA M
   **Date               : 02-JAN-2023
   **Change Description : Fix for Fee component modification upon unlock
   **Search String      : OBCL_14.7_Bug#34953774
   
   **Changed By         : Rashmi B V
   **Date               : 02-APR-2023
   **Change Description : REDWOOD - Fix to disable Add row & delete(+/-) button during unlock.
   **Search String      : Redwood_changes_1

    Changed By         : Pallavi R
    Changed On         : 18-Jul-2024
    Change Description : New component addition from FAMD
    Search String      : OBCL_14.7_RABO_#36772442 Changes     
	
    Changed By         : Pallavi R
    Changed On         : 24-Dec-2024
    Change Description : To enable the buttons after populate
    Search String      : OBCL_14.7_RABO_#37380859 Changes  	
****************************************************************************************************************************/
var gPrevAction;
var g_Add_Row ='N';//OBCL_14.7_RABO_#36772442 Changes 
function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
function fnPostLoad_KERNEL(screenArgs)
{
	addEvent(document.getElementById("BLK_LFTBS_CONTARCT_FEE"), "onclick", "fnDisableChecks()"); //Adding event on click of BLK_LFTBS_CONTRACT_FEE_MULTI
	addEvent(document.getElementById("BLK_OLTBS_CONTRACT_FEAMD__BTN_PARTCAL"), "onclick", "fnPartcal()"); //Adding event on click of BLK_OLTBS_CONTRACT_FEAMD__BTN_PARTCAL Button calculate
	fnDisableChecks(); 
	return true;
}
function fnPostExecuteQuery_KERNEL()
{
	//fnDisableElement(document.getElementById('cmdDelRow_BLK_LFTBS_CONTARCT_FEE'));//Commented Redwood_changes_1
	document.getElementById('cmdDelRow_BLK_LFTBS_CONTARCT_FEE').style.visibility = 'hidden'; //Added Redwood_changes_1
	fnDisableChecks(); 
	return true;
}
function fnPostUnlock_KERNEL()
{
	fnEnableMEBlock("BLK_LFTBS_CONTARCT_FEE",true);   //OBCL_14.1_Support_Bug#31522642_changes
	//fnDisableElement(document.getElementById('cmdAddRow_BLK_LFTBS_CONTARCT_FEE'));// OBCL_14.7_Bug#34953774 //Commented Redwood_changes_1
	//fnDisableElement(document.getElementById('cmdDelRow_BLK_LFTBS_CONTARCT_FEE'));	//Commented Redwood_changes_1
	//document.getElementById('cmdAddRow_BLK_LFTBS_CONTARCT_FEE').style.visibility = 'hidden'; //Added Redwood_changes_1 
	//OBCL_14.7_RABO_#36772442 Changes,Commented the +Button diabling code
	document.getElementById('cmdDelRow_BLK_LFTBS_CONTARCT_FEE').style.visibility = 'hidden'; //Added Redwood_changes_1
	fnDisableChecks(); 
	return true;
}
function fnDisableChecks(){
	try{
		var data_blk = "BLK_LFTBS_CONTARCT_FEE";
		var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
		for (var index = 0; index <= len; index++) {
            if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {				
				var pfee=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[18].getElementsByTagName("oj-input-text")[0].value;	// BLK_LFTBS_CONTARCT_FEE__TXTPFEE			
				var fas91fee=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[19].getElementsByTagName("oj-input-text")[0].value; // BLK_LFTBS_CONTARCT_FEE__TXTFAS91
				var ratio=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[20].getElementsByTagName("oj-input-text")[0].value; // BLK_LFTBS_CONTARCT_FEE__TXTRATIO
				
				var len = document.getElementById("DIVSubSystem").children[0].children.length;
				for (var idx = 0; idx < len; idx++) {
					if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_PARTFEE") {
						var pfeeLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];
						if(pfeeLink==undefined){
							pfeeLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
						}
						if (pfee=='Y'){
							fnEnableSubSysButtons(pfeeLink);
						}else{
							fnDisableSubSysButtons(pfeeLink);
						}
					}
					if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_FAS91FEE") {
						var fas91feeLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];
						if(fas91feeLink==undefined){
							fas91feeLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
						}
						if (fas91fee=='Y'){
							fnEnableSubSysButtons(fas91feeLink);
						}else{
							fnDisableSubSysButtons(fas91feeLink);
						}
					}
					if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_RATIO") {
						var ratioLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];
						if(ratioLink==undefined){
							ratioLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
						}
						if (ratio=='Y'){
							fnEnableSubSysButtons(ratioLink);
						}else{
							fnDisableSubSysButtons(ratioLink);
						}
					}
				}				
			}
		}
	}catch(e){}
	return true;	
}
/*
function fnPreLoad_CVS_PARTFEE_KERNEL(){
fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_FEAMD__BTN_PARTCAL"));
    appendData(document.getElementById("TBLPageAll"));		
	gPrevAction=gAction;
	gAction='SCHDCHK';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	gAction=gPrevAction;
	return true;
}
*/

function fnPostLoad_CVS_FAS91FEE_KERNEL(){	
fnEnableElement(document.getElementById('cmdAddRow_BLK_LFTBS_FAS91_FEE_DETAIL'));
fnEnableElement(document.getElementById('cmdDelRow_BLK_LFTBS_FAS91_FEE_DETAIL'));
return true;
}

function fnPostLoad_CVS_FEESH_KERNEL(){	
fnEnableElement(document.getElementById('cmdAddRow_BLK_LFTBS_FAS91_FEE_SPLIT_DTLS'));
fnEnableElement(document.getElementById('cmdDelRow_BLK_LFTBS_FAS91_FEE_SPLIT_DTLS'));
return true;
}
//OBCL_14.4_LS_EXP_Fee Changes Starts
function fnPopulate() {
	g_prev_gAction = gAction;
	fnClassDefault("BLK_OLTBS_CONTRACT_FEAMD");
	gAction = g_prev_gAction;
	return true; 
}
//OBCL_14.7_RABO_#36772442 Changes Starts
function fnPostClassDefault__KERNEL(){
	document.getElementById('cmdAddRow_BLK_LFTBS_CONTARCT_FEE').style.visibility = 'hidden';
	fnDisableElement(getElementsByOjName('BTN_POPULATE')[0]);
	fnDisableChecks();//OBCL_14.7_RABO_#37380859 Changes
	g_Add_Row ='N';
	return true; 
}
function fnPostAddRow_BLK_LFTBS_CONTARCT_FEE_KERNEL() {
	g_Add_Row ='Y';
	return true; 
}
function fnPrePickUpSubSystem_CVS_SETTLEMENTS_KERNEL(){	
	if ((gAction == 'MODIFY') ||(gAction == 'SUBSYSPKP_MODIFY')){
		if ((g_Add_Row == 'Y')){
			 showErrorAlerts('IN-TRD-008');
			return false;
		}
	}
	return true;
}
//OBCL_14.7_RABO_#36772442 Changes  ends
function fnPreLoad_CVS_FESCH_KERNEL(){	
	if ((gAction == 'MODIFY') ||(gAction == 'SUBSYSPKP_MODIFY')){
		var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
		var Stl_Stat = extractSubSysStat(l_statusStr, 'OLCONDET');
		if (Stl_Stat == 'D'){
			//Please Visit Settlement screen.
			 showErrorAlerts('IN-TRD-005');
			return false;
		}
		document.getElementById("BLK_OLTBS_CONTRACT_FEAMD__FEE_SCH_VISITED").value = 'Y';
	}
	return true;
}
function fnPrePickUpSubSystem_CVS_FEERULEMAINT_KERNEL(){
	if ((gAction == 'MODIFY') ||(gAction == 'SUBSYSPKP_MODIFY')){
		var l_statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
		var Stl_Stat = extractSubSysStat(l_statusStr, 'OLCONDET');
		if (Stl_Stat == 'D'){
			//Please Visit Settlement screen.
			 showErrorAlerts('IN-TRD-005');
			return false;
		}
	}
	return true;
}
//OBCL_14.4_LS_EXP_Fee Changes Ends
function fnPartcal(){	
appendData(document.getElementById("TBLPageAll"));		
	gPrevAction=gAction;
	gAction='PARTCAL';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_PFEE"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			if(TextContents[1]==document.getElementById("BLK_PFEE__PFEECOMP").value) // Comparing the Header Component and textContent Component Name
			{
				document.getElementById("BLK_PFEE__TXTTOTPFEE").value = TextContents[4]; // getting TextContents[4] value
				document.getElementById("BLK_PFEE__TXTTOTPFEE").value = TextContents[4]; // getting TextContents[4] value
			}
		}
	}
	return true;
}

function fnRatcal(){
    appendData(document.getElementById("TBLPageAll"));		
	gPrevAction=gAction;
	gAction='RATCAL';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_RATIO_FEAMD"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			if(TextContents[1]==document.getElementById("BLK_RATIO_FEAMD__RATCOMP").value) // Comparing the Header Component and textContent Component Name
			{
				document.getElementById("BLK_RATIO_FEAMD__TXTTOTPARTRATIO").value = TextContents[9]; // getting TextContents[9] value
				document.getElementById("BLK_RATIO_FEAMD__TXTTOTPARTRATIO").value = TextContents[9]; // getting TextContents[9] value
			}
		}
	}
	return true;
}

function fnCompute(){
appendData(document.getElementById("TBLPageAll"));		
	gPrevAction=gAction;
	gAction='COMPUTE';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_FAS91FEE"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			if(TextContents[1]==document.getElementById("BLK_FAS91FEE__FASCOMP").value) // Comparing the Header Component and textContent Component Name
			{   
			    	document.getElementById("BLK_FAS91FEE__TXTFASTOTCITIFEES").value = TextContents[8]; // getting TextContents[8] value
				document.getElementById("BLK_FAS91FEE__TXTFASTOTNONCITIFEES").value = TextContents[9]; // getting TextContents[9] value
				document.getElementById("BLK_FAS91FEE__TXTFASFEESTORECOGNIZE").value = TextContents[10]; // getting TextContents[10] value
				document.getElementById("BLK_FAS91FEE__TXTFASFEESTOAMORTIZE").value = TextContents[11]; // getting TextContents[11] value
				document.getElementById("BLK_FAS91FEE__TXTFASFEESTOWAVERAGEYIELD").value = TextContents[12]; // getting TextContents[12] value		
				document.getElementById("BLK_FAS91FEE__TXTFASTOTCITIFEES").value = TextContents[8]; // getting TextContents[8] value
				document.getElementById("BLK_FAS91FEE__TXTFASTOTNONCITIFEES").value = TextContents[9]; // getting TextContents[9] value
				document.getElementById("BLK_FAS91FEE__TXTFASFEESTORECOGNIZE").value = TextContents[10]; // getting TextContents[10] value
				document.getElementById("BLK_FAS91FEE__TXTFASFEESTOAMORTIZE").value = TextContents[11]; // getting TextContents[11] value
				document.getElementById("BLK_FAS91FEE__TXTFASFEESTOWAVERAGEYIELD").value = TextContents[12]; // getting TextContents[12] value
			}
		}
	}
	return true;
}

function fnFascal(){
appendData(document.getElementById("TBLPageAll"));		
	gPrevAction=gAction;
	gAction='FASCAL';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_FAS91FEE"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			if(TextContents[1]==document.getElementById("BLK_FAS91FEE__FASCOMP").value) // Comparing the Header Component and textContent Component Name
			{
				document.getElementById("BLK_FAS91FEE__TXTTOTFASFACAMT").value = TextContents[5]; // getting TextContents[5] value
				document.getElementById("BLK_FAS91FEE__TXTTOTFASMGMTCOMP").value = TextContents[6]; // getting TextContents[6] value
				document.getElementById("BLK_FAS91FEE__TXTTOTFASYIELDADJCOMP").value = TextContents[7]; // getting TextContents[7] value
				document.getElementById("BLK_FAS91FEE__TXTTOTFASFACAMT").value = TextContents[5]; // getting TextContents[5] value
				document.getElementById("BLK_FAS91FEE__TXTTOTFASMGMTCOMP").value = TextContents[6]; // getting TextContents[6] value
				document.getElementById("BLK_FAS91FEE__TXTTOTFASYIELDADJCOMP").value = TextContents[7]; // getting TextContents[7] value

			}
		}
	}
	return true;
}

function fnFeshcal(){
appendData(document.getElementById("TBLPageAll"));		
	gPrevAction=gAction;
	gAction='FESHCAL';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_FAS_FESCH"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			if(TextContents[1]==document.getElementById("BLK_FAS_FESCH__FESCHCOMP").value) // Comparing the Header Component and textContent Component Name
			{
				document.getElementById("BLK_FAS_FESCH__TXTTOTFESCHTRAIO").value = TextContents[5]; // getting TextContents[5] value				
			}
		}
	}
	return true;
}

function fnPreAuthorize_KERNEL(){
    authFunction = 'LFDFEEAU';
    authUixml = 'LFDFEEAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LFDFEEAU'] = "KERNEL";
    ArrPrntFunc['LFDFEEAU'] = "";
    ArrPrntOrigin['LFDFEEAU'] = "";
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