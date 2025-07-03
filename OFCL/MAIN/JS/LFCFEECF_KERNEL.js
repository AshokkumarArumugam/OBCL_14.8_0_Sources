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
**  File Name          : LFCFEECF_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Anusha K
**  Last modified on   : 6-Jul-2018
**  Full Version       : 
**  Reason             : Changes are done to disable ration callform for pfee(28184937)

**  Last Modified By   : Arvind Baskar
**  Last modified on   : 04/09/2019
**  Search String	   : Bug#30331186 
**
**Changed By         : Pallavi R
**Date               : 11-Apr-2024
**Change Description : On Deletion contact fee table data was not getting deleted
**Search String      : OBCL_14.7_Internal_#36371779_3 Changes
****************************************************************************************************************************/
var gPrevAction;
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
function fnPreLoad_CVS_PARTFEE_KERNEL(screenArgs){	
	screenArgs = new Array();
	var blkSettlementRowCnt=getTableObjForBlock("BLK_LFTBS_CONTRACT_FEE_MULTI").tBodies[0].rows.length;
	for(var i=0;i<blkSettlementRowCnt;i++)
	{
	if (getTableObjForBlock("BLK_LFTBS_CONTRACT_FEE_MULTI").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true){
	screenArgs["PFEECOMP"] = document.getElementById("BLK_LFTBS_CONTRACT_FEE_MULTI__COMPONENT").value;
	screenArgs["TXTPFEECURRENCY"] = document.getElementById("BLK_LFTBS_CONTRACT_FEE_MULTI__CCY").value;
	screenArgs["PFEESCHDT"] = document.getElementById("BLK_LFTBS_CONTRACT_FEE_MULTI__ASSOCIATIONDATE").value;
	}
	}
	return true;
}

function fnPreLoad_CVS_FAS91FEE_KERNEL(screenArgs){	
	screenArgs = new Array();
	var blkSettlementRowCnt=getTableObjForBlock("BLK_LFTBS_CONTRACT_FEE_MULTI").tBodies[0].rows.length;
	for(var i=0;i<blkSettlementRowCnt;i++)
	{
	if (getTableObjForBlock("BLK_LFTBS_CONTRACT_FEE_MULTI").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true){
	screenArgs["FASCOMP"] = document.getElementById("BLK_LFTBS_CONTRACT_FEE_MULTI__COMPONENT").value;
	screenArgs["TXTFASCURR"] = document.getElementById("BLK_LFTBS_CONTRACT_FEE_MULTI__CCY").value;	
	}
	}
	return true;
}
//OBCL_14.7_Internal_#36371779_3 Changes Starts
/*
function fnPostLoad_CVS_FAS91FEE_KERNEL(){	
fnEnableElement(document.getElementById('cmdAddRow_BLK_LFTBS_FAS91_FEE_DETAIL'));
fnEnableElement(document.getElementById('cmdDelRow_BLK_LFTBS_FAS91_FEE_DETAIL'));
return true;
}
function fnPostLoad_CVS_FEESH_KERNEL(){	
fnEnableElement(document.getElementById('cmdAddRow_BLK_LFTBS_FAS91_FEE_SPLIT_DTLS'));
fnEnableElement(document.getElementById('cmdDelRow_BLK_LFTBS_FAS91_FEE_SPLIT_DTLS'));
return true;
}*/
//OBCL_14.7_Internal_#36371779_3 Changes Ends

function fnPreLoad_CVS_RATIO_KERNEL(screenArgs){	
	screenArgs = new Array();
	var blkSettlementRowCnt=getTableObjForBlock("BLK_LFTBS_CONTRACT_FEE_MULTI").tBodies[0].rows.length;
	for(var i=0;i<blkSettlementRowCnt;i++)
	{
	if (getTableObjForBlock("BLK_LFTBS_CONTRACT_FEE_MULTI").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true){
	screenArgs["PART_COMP"] = document.getElementById("BLK_LFTBS_CONTRACT_FEE_MULTI__COMPONENT").value;		
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
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_PART_RATIO_MAS"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			if(TextContents[1]==document.getElementById("BLK_PART_RATIO_MAS__PART_COMP").value) // Comparing the Header Component and textContent Component Name
			{
				document.getElementById("BLK_PART_RATIO_MAS__PART_TOT").value = TextContents[9]; // getting TextContents[9] value
			}
		}
	}
	return true;
}
function fnPostLoad_CVS_FEECOMP_KERNEL(screenArgs)
{
	addEvent(document.getElementById("BLK_LFTBS_CONTRACT_FEE_MULTI"), "onclick", "fnDisableChecks()"); //Adding event on click of BLK_LFTBS_CONTRACT_FEE_MULTI
	fnDisableChecks(); 
	//Bug#30331186  starts
	if(parent.functionId=="OLDTRONL"){
	//OBCL_14.7_Internal_#36371779_3 Changes Strats	
	/*fnDisableElement(document.getElementById('cmdAddRow_BLK_LFTBS_CONTRACT_FEE_MULTI'));
	fnDisableElement(document.getElementById('cmdDelRow_BLK_LFTBS_CONTRACT_FEE_MULTI'));*/
	getElementsByOjName("cmdAddRow_BLK_LFTBS_CONTRACT_FEE_MULTI")[0].className="BTNhide";
	getElementsByOjName("cmdDelRow_BLK_LFTBS_CONTRACT_FEE_MULTI")[0].className="BTNhide";
	////OBCL_14.7_Internal_#36371779_3 Changes Ends
	}
	//Bug#30331186  ends
	return true;
}
function fnDisableChecks(){
	try{
		var data_blk = "BLK_LFTBS_CONTRACT_FEE_MULTI";
		var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
		for (var index = 0; index <= len; index++) {
            if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
				var agyfee=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[18].getElementsByTagName("oj-input-text")[0].value; // BLK_LFTBS_CONTRACT_FEE_MULTI__TXTAGYFEE
				var pfee=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[19].getElementsByTagName("oj-input-text")[0].value;	// BLK_LFTBS_CONTRACT_FEE_MULTI__TXTPFEE			
				var fas91fee=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[20].getElementsByTagName("oj-input-text")[0].value; // BLK_LFTBS_CONTRACT_FEE_MULTI__TXTFAS91
				var ratio=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[21].getElementsByTagName("oj-input-text")[0].value; // BLK_LFTBS_CONTRACT_FEE_MULTI__TXTRATIO
				
				//var len = document.getElementById("DIVSubSystem").children[0].children.length;
				var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem").length;
				for (var idx = 0; idx < len; idx++) {
					if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx].id == "CVS_AGY_FEE") {
						var agyfeeLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
						if(agyfeeLink==undefined){
							agyfeeLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
						}
						if (agyfee=='Y'){							
							fnEnableSubSysButtons(agyfeeLink);
						}
						else{
							fnDisableSubSysButtons(agyfeeLink);
						}							
					}
					if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx].id == "CVS_PARTFEE") {
						var pfeeLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
						if(pfeeLink==undefined){
							pfeeLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
						}
						if (pfee=='Y'){
							fnEnableSubSysButtons(pfeeLink);
							ratio= 'N'; // disabling Ratio bug no: 28184937
						}else{
							fnDisableSubSysButtons(pfeeLink);
						}
					}
					if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx].id == "CVS_FAS91FEE") {
						var fas91feeLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
						if(fas91feeLink==undefined){
							fas91feeLink =document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
						}
						if (fas91fee=='Y'){
							fnEnableSubSysButtons(fas91feeLink);
						}else{
							fnDisableSubSysButtons(fas91feeLink);
						}
					}
					if (document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx].id == "CVS_RATIO") {
						var ratioLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
						if(ratioLink==undefined){
							ratioLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[idx];
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
//OBCL_14.7_Internal_#36371779_3 Changes Starts
function fnPostLoad_CVS_PARTFEE_KERNEL(screenArgs){	
	getElementsByOjName("cmdAddRow_BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI")[0].className="BTNhide";
	getElementsByOjName("cmdDelRow_BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI")[0].className="BTNhide";
	return true;
} 
function fnPostLoad_CVS_FAS91FEE_KERNEL(){	
	getElementsByOjName("cmdAddRow_BLK_LFTBS_FAS91_FEE_DETAIL")[0].className="BTNhide";
	getElementsByOjName("cmdDelRow_BLK_LFTBS_FAS91_FEE_DETAIL")[0].className="BTNhide";
	return true;
} 
function fnPostLoad_CVS_FEESH_KERNEL(){	
	getElementsByOjName("cmdAddRow_BLK_LFTBS_FAS91_FEE_SPLIT_DTLS")[0].className="BTNhide";
	getElementsByOjName("cmdDelRow_BLK_LFTBS_FAS91_FEE_SPLIT_DTLS")[0].className="BTNhide";
	return true;
}
//OBCL_14.7_Internal_#36371779_3 Changes Ends