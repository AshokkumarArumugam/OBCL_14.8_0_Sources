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
**  File Name          : LBDPTFR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Ashokkumar Arumugam
**  Last modified on   : 06-Dec-2018
**  Full Version       : OBCL_14.2
**  Reason             : Fix provided for on query system to refresh screen properly
**
**  
**  Last Modified By   : Jayaram N
**  Last modified on   : 07-Apr-2020
**  Full Version       : OBCL_14.4
**  Reason             : OBCL14.4:SFR#29959798:LOR_Adjustments
**  
**  Last Modified By   : Sowmya Bitra
**  Last modified on   : 21-Jan-2021
**  Change Description : Fix for LOV issue during Query (after removal of default button).
**  Search String      : Default_Action_Changes

     Changed By         : ANUSHA K
    Date               : 10-FEB-2022
    Change Description : Syndication silent participant changes
    Search String      : 14.5_LS_SILENT_PART_CHANGES

**  
**  Last Modified By   : Divya J
**  Last modified on   : 18-Aug-2022
**  Change Description : Tranche Participant Transfer from Multiple Participants
**  Search String      : OBCL_14.6_Bug#34493834

**  Last Modified By   : Anusha K
**  Last modified on   : 14-Oct-2022
**  Change Description : changes done to comment code where fee is enabled and disable based on instruction type
**  Search String      : OBCL_14.6_RABO_Bug#34667485 CHANGES

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 15-MAY-2023
**  Reason             : From Summary screen unable to view query the detail screen 
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**  CHANGE LOG         : Jayaram N
**  Last modified on   : 29-Feb-2024
**  Reason             : ISSUE IN VIEWING PARTICIPANT TRANSFER CONTRACT
**  SEARCH STRING      : BUG#36325538

   Changed By         : ANUSHA K
    Date               : 18-mar-2024
    Change Description : changes to diable add and delete button in fee screen
    Search String      : OBCL_RABO_#36396770 CHANGES
	
   Changed By         : Akhila Samson
   Changed On         : 03-Dec-2024
   Change Description : Fix has been provided to populate the currency from the main screen to the child screen multigrid.
   Search String      : Bug#37331556 
****************************************************************************************************************************/
/* Ashok Added :: Passing Summary Values to Detail */
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
queryFields[1] = "BLK_OLTBS_CONTRACT__TXT_VAL_DATE";
queryFields[2] = "BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO";
queryFields[3] = "BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NO";
queryFields[4] = "BLK_OLTBS_CONTRACT__TXT_TABLE_TYPE";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
pkFields[1] = "BLK_OLTBS_CONTRACT__TXT_VAL_DATE";
pkFields[2] = "BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO";
pkFields[3] = "BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NO";
pkFields[4] = "BLK_OLTBS_CONTRACT__TXT_TABLE_TYPE";
var pkFieldsCustom = new Array();
pkFieldsCustom[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
pkFieldsCustom[1] = "BLK_OLTBS_CONTRACT__VALUEDATE";
pkFieldsCustom[2] = "BLK_OLTBS_CONTRACT__EVENTSEQNO";
pkFieldsCustom[3] = "BLK_OLTBS_CONTRACT__ENTRYSEQNO";
pkFieldsCustom[4] = "BLK_OLTBS_CONTRACT__TABLETYPE";
/* Ashok Added :: Passing Summary Values to Detail */

var gvaluedt;
var gExecuteQueryCheck = false;

function EnableDisableAuthBtn()
{
	if(document.getElementById("BLK_LBTWS_TRANSFER_MASTER__TXT_AUTH_STATUS").value == "Authorised")
	{
		DisableToolbar_buttons("Authorize");
	}

  if(document.getElementById("BLK_LBTWS_TRANSFER_MASTER__TXT_AUTH_STATUS").value == "Unauthorised")
{
EnableToolbar_buttons("Authorize");
}
return true;
}

function fnDisablePT(){
	 try {
				//Added to disable pending and processed transfer after New
				//var len = document.getElementById("DIVSubSystem").children[0].children.length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

				for (var idx = 0; idx < len; idx++) {
					//if ((document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "LBCPCDTR") || (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "LBCPRCTR")) {////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						if ((document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "LBCPCDTR") ||////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id =="LBCPRCTR"))//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						{
						
						//fnDisableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						fnDisableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
					}
				}
				
	    } catch (e) {}
	return true;
}
function fnEnablePT(){
	 try {
				//Added to disable pending and processed transfer after New
			//	var len = document.getElementById("DIVSubSystem").children[0].children.length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

				for (var idx = 0; idx < len; idx++) {
					//if ((document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "LBCPCDTR") || (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "LBCPRCTR")) {
						((document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id  == "LBCPCDTR") || (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "LBCPRCTR")) 
						{
					//	fnEnableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonH")[0]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
					fnDisableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

					}
				}
				
	    } catch (e) {}
	return true;
}
//OBCL_14.6_RABO_Bug#34667485 CHANGES STARTS
/*function fnEnableDisableFees(){
	var detailed_instruction = document.getElementById("BLK_LBTWS_TRANSFER_MASTER__INSTRUCTION_TYPE"); // Detailed Instraction check
		if (detailed_instruction.value==true){
			try{
			var len = document.getElementById("DIVSubSystem").children[0].children.length;
			for (var idx = 0; idx < len; idx++) {
				if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_FEES") {
					fnDisableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0]);
				}
			}
			} catch (e) {}
		}
		else
		{
			try{
			var len = document.getElementById("DIVSubSystem").children[0].children.length;
			for (var idx = 0; idx < len; idx++) {
				if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_FEES") {
					fnEnableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonH")[0]);
				}
			}
			} catch (e) {}
		}
            
	return true;
}*/
//OBCL_14.6_RABO_Bug#34667485 CHANGES ENDS
function fnPostAddRow_BLK_LBTWS_PART_TRANSFER_MASTER_KERNEL(){
	setTimeout( function(){//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnUpdateNoteSeqno();
	},0);
}
function fnPostDeleteRow_BLK_LBTWS_PART_TRANSFER_MASTER_KERNEL(){
		setTimeout( function(){//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnUpdateNoteSeqno();
		},0);
}
function fnUpdateNoteSeqno(){
	var cnt = getTableObjForBlock('BLK_LBTWS_PART_TRANSFER_MASTER').tBodies[0].rows.length;
	for(var i=0;i<cnt;i++){//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	 /*  if (i == 1){//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	        var blkfld = 'BLK_LBTWS_PART_TRANSFER_MASTER__SEQNO';
	      //  var blkfldI = 'BLK_LBTWS_PART_TRANSFER_MASTER__SEQNOI';//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		   var blkfldI = 'BLK_LBTWS_PART_TRANSFER_MASTER__SEQNO';//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	    }
		else{
			//OBCL_14.6_Bug#34493834 Starts
	       //var blkfld = 'BLK_LBTWS_PART_TRANSFER_MASTER__SEQNO'.concat(i-1);
	       //var blkfldI = 'BLK_LBTWS_PART_TRANSFER_MASTER__SEQNOI'.concat(i-1);  //Commented
		   var blkfld = 'BLK_LBTWS_PART_TRANSFER_MASTER__SEQNORC'.concat(i-1);
	       var blkfldI = 'BLK_LBTWS_PART_TRANSFER_MASTER__SEQNOIRC'.concat(i-1);
		   //OBCL_14.6_Bug#34493834 Ends
		   	}
	document.getElementById(blkfld).value = i;
	document.getElementById(blkfldI).value = i;*///BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	getTableObjForBlock('BLK_LBTWS_PART_TRANSFER_MASTER').tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0].value=i+1;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	}
	return true;
}

function fnPostAddRow_BLK_SILENT_DETAILS_KERNEL(){
	var cnt = getTableObjForBlock('BLK_SILENT_DETAILS').tBodies[0].rows.length;
	for(var i = 0; i< cnt; i++){ //Bug#37331556 "=" condition removed
	//Bug#37331556 start
	//for(var i = 1; i<=cnt; i++){
		
		getTableObjForBlock('BLK_SILENT_DETAILS').tBodies[0].rows[i].cells[4].getElementsByTagName("oj-input-text")[0].value = parent.document.getElementById("BLK_OLTBS_CONTRACT__CONTRACTCCY").value;
		//commented below code
		/*if (i ==1){
		
			
			document.getElementById('BLK_SILENT_DETAILS__CCY').value = parent.document.getElementById("BLK_OLTBS_CONTRACT__CONTRACTCCY").value;
		}
		
		else{	
		  
			var flagstats=4;
			getTableObjForBlock('BLK_SILENT_DETAILS').tBodies[0].rows[i-1].cells[flagstats].getElementsByTagName("oj-input-text")[0].value= parent.getTableObjForBlock('BLK_OLTBS_CONTRACT__CONTRACTCCY').value ;
			
		}*/
		//Bug#37331556 End
	}
		
	
	return true;
}		

function fnPostAddRow_BLK_LBTWS_PART_TRANSFER_KERNEL(){
	
	try {
        var blockId = "BLK_LBTWS_PART_TRANSFER_MASTER";
        var len = getTableObjForBlock(blockId).tBodies[0].rows.length;
        for (var idx = 0;idx < len;idx++) {
            if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0]) {
                if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0].checked) {
					var blockId2 = "BLK_LBTWS_PART_TRANSFER";
					var len2 = getTableObjForBlock(blockId).tBodies[0].rows.length;
					for (var idx2 = 0;idx2 < len2;idx2++) {
						if (getTableObjForBlock(blockId2).tBodies[0].rows[idx2].cells[0].getElementsByTagName("INPUT")[0]) {
							if (getTableObjForBlock(blockId2).tBodies[0].rows[idx2].cells[0].getElementsByTagName("INPUT")[0].checked) {
								getTableObjForBlock(blockId2).tBodies[0].rows[idx2].cells[11].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[1].getElementsByTagName("oj-input-text")[0].value;
								getTableObjForBlock(blockId2).tBodies[0].rows[idx2].cells[12].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[2].getElementsByTagName("oj-input-text")[0].value;
							}
						}
					}
				}
			}
        }
		
    }
    catch (e) {}
	//fnUpdateSeqno();
	fnDisableTransferPrice();
	return true;
}
function fnPostDeleteRow_BLK_LBTWS_PART_TRANSFER_KERNEL(){
	fnDisableTransferPrice();
	return true;
}

function fnPostAddRow_BLK_LBTWS_CONSOL_TRANSFER_KERNEL(){
	fnDisableTransferPrice();
	return true;
}
function fnPostDeleteRow_BLK_LBTWS_CONSOL_TRANSFER_KERNEL(){
	fnDisableTransferPrice();
	return true;
}
/* function fnPostDeleteRow_BLK_LBTWS_PART_TRANSFER_KERNEL(){
	fnUpdateSeqno();
}
function fnUpdateSeqno(){
	var cnt = getTableObjForBlock('BLK_LBTWS_PART_TRANSFER').tBodies[0].rows.length;
	for(var i=1;i<=cnt;i++){
	   if (i == 1){
	        var blkfld = 'BLK_LBTWS_PART_TRANSFER__SEQNO';
	        var blkfldI = 'BLK_LBTWS_PART_TRANSFER__SEQNOI';
	    }
		else{
	       var blkfld = 'BLK_LBTWS_PART_TRANSFER__SEQNO'.concat(i-1);
	       var blkfldI = 'BLK_LBTWS_PART_TRANSFER__SEQNOI'.concat(i-1);
	}
	document.getElementById(blkfld).value = i;
	document.getElementById(blkfldI).value = i;
	}
	return true;//Ashok Added
} */
function fnDefaultParticipants()
{
	var g_prev_gAction = gAction;
    gAction = "DEFPART";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	 gAction = g_prev_gAction;
	return true;
}
function fnComponentDeflt(evnt)
{
	var g_prev_gAction = gAction;
	gvaluedt =  document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE").value; //added to retain the value dt value after def comps
    gAction = "DEFCOMPS";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	 gAction = g_prev_gAction;
	document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE").value =  gvaluedt; //added to retain the value dt value after def comps
	return true;
}
function fnDisableChecks() {
	var detailed_instruction = document.getElementById("BLK_LBTWS_TRANSFER_MASTER__INSTRUCTION_TYPE"); // Detailed Instraction check
	if(gAction == "NEW"){
			fnDisablePT();
		if (detailed_instruction.value==true){
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[0].style.display="block"; // Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[2].style.display="block"; // Total Transfer Amount Detailed section //BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[4].style.display="none";  // Consolidated section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			document.getElementsByClassName("oj-collapsible-header")[0].style.display = "block";////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			document.getElementsByClassName("oj-collapsible-header")[1].style.display="block"; // Total Transfer Amount Detailed section //BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			document.getElementsByClassName("oj-collapsible-header")[2].style.display="none";  // Consolidated section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[6].style.display="none";  // Total Transfer Amount Consolidated section
		
		}else{
			
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[0].style.display="none";  // Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[2].style.display="none";  // Total Transfer Amount Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[4].style.display="block"; // Consolidated section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			document.getElementsByClassName("oj-collapsible-header")[0].style.display="none";  // Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			document.getElementsByClassName("oj-collapsible-header")[1].style.display="none";  // Total Transfer Amount Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			document.getElementsByClassName("oj-collapsible-header")[2].style.display="block"; // Consolidated section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[6].style.display="block"; // Total Transfer Amount Consolidated section //BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		}
	}else{
		fnEnablePT();
		//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[0].style.display="block";  // Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[2].style.display="block";  // Total Transfer Amount Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		document.getElementsByClassName("oj-collapsible-header")[0].style.display="block";  // Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		document.getElementsByClassName("oj-collapsible-header")[1].style.display="block";  // Total Transfer Amount Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		
		//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[4].style.display="block";  // Consolidated section //29022199_Changes
		//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[6].style.display="block";  // Total Transfer Amount Consolidated section 
	}
	if(gExecuteQueryCheck==true){
		fnEnablePT();
		if (detailed_instruction.value==false){
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[0].style.display="none";  // Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			//document.getElementsByClassName("DIVThreeColSectionContainer toggleDivHeader")[2].style.display="none";  // Total Transfer Amount Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			
			document.getElementsByClassName("oj-collapsible-header")[0].style.display="none";  // Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			document.getElementsByClassName("oj-collapsible-header")[1].style.display="none";  // Total Transfer Amount Detailed section//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		
		}
	}		
	return true;
}
function fnDisableTransferPrice()
{
	var HFS = document.getElementById("BLK_LBTWS_TRANSFER_MASTER__HFS_TRANSFER"); // HFS Transfer check
	
		try {
        var blockId = "BLK_LBTWS_CONSOL_TRANSFER";
        var len = getTableObjForBlock(blockId).tBodies[0].rows.length;
        for (var idx = 0;idx < len;idx++) {
            if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0]) {
                if (HFS.value==true){
					var param_Value = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0];
					param_Value.disabled=false;
					param_Value.readonly1 = false;
					}
					else{
						var param_Value = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[4].getElementsByTagName("oj-input-text")[0];
						param_Value.disabled=true;
						param_Value.readonly1 = true;
					}
			}
        }
		
    }
    catch (e) {}

		try {
        var blockId = "BLK_LBTWS_PART_TRANSFER";
        var len = getTableObjForBlock(blockId).tBodies[0].rows.length;
        for (var idx = 0;idx < len;idx++) {
            if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0]) {
                if (HFS.value==true){
					var param_Value = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0];
					param_Value.disabled=false;
					param_Value.readonly1 = false;
					}
					else{
						var param_Value = getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[5].getElementsByTagName("oj-input-text")[0];
						param_Value.disabled=true;
						param_Value.readonly1 = true;
					}
			}
          }
        }
		
    
    catch (e) {}
	
	return true;
}
function fnPostLoad_KERNEL() {
	addEvent(document.getElementById("BLK_LBTWS_TRANSFER_MASTER__INSTRUCTION_TYPE"), "onchange", "fnDisableChecks()");
	addEvent(document.getElementById("BLK_LBTWS_TRANSFER_MASTER__HFS_TRANSFER"), "onchange", "fnDisableTransferPrice()");
	EnableDisableAuthBtn();
	//fnEnableDisableFees();OBCL_14.6_RABO_Bug#34667485 CHANGES
	fnDisableChecks();
	fnDisableTransferPrice();
	return true;
}
function fnPostNew_KERNEL() {
		expandcontent('TAB_MAIN'); //29022199_Changes
		fnDisableChecks();
		//fnEnableDisableFees();OBCL_14.6_RABO_Bug#34667485 CHANGES
		fnDisablePT();
		fnDisableTransferPrice();
	return true;
}
function fnInTab_TAB_CONTRACT_KERNEL() {

	//fnEnableDisableFees();OBCL_14.6_RABO_Bug#34667485 CHANGES
	fnDisableChecks();
	fnDisableTransferPrice();
    return true;
}
function fnOutTab_TAB_CONTRACT_KERNEL() {
    return true;
}
function fnInTab_TAB_PARTICIPANT_KERNEL() {

	///fnEnableDisableFees();OBCL_14.6_RABO_Bug#34667485 CHANGES
	fnDisableChecks();
	fnDisableTransferPrice();
    return true;
}
function fnOutTab_TAB_PARTICIPANT_KERNEL() {
    return true;
}

function fnPreAuthorize_KERNEL() {
    authFunction   = 'LBDPTAUT';
    authUixml      = 'LBDPTAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDPTAUT']="KERNEL";
    ArrPrntFunc['LBDPTAUT'] = "";
    ArrPrntOrigin['LBDPTAUT'] ="";
	screenArgs['CONTRAREFNO'] = document.getElementById("BLK_OLTBS_CONTRACT__CONTRACTREFNO").value;
	screenArgs['USERREFNO'] = document.getElementById("BLK_OLTBS_CONTRACT__USERREFNO").value;
	screenArgs['EVESEQNUMB'] = document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO").value;
	screenArgs['VALUEDT'] = document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE").value;
    return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(){
	//Called to reinitalise the screen arg array after the infra call
	screenArgs['CONTRAREFNO'] = document.getElementById("BLK_OLTBS_CONTRACT__CONTRACTREFNO").value;
	screenArgs['USERREFNO'] = document.getElementById("BLK_OLTBS_CONTRACT__USERREFNO").value;
	screenArgs['EVESEQNUMB'] = document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO").value;
	screenArgs['VALUEDT'] = document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE").value;
	return true;
}
function fnPreExecuteQuery_KERNEL() {
	/* Ashok Added :: Passing Summary Values to Detail */
    var parent = fnGetParentWin();
    if(parent.detailWinParams!=undefined){
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE").value = parent.detailWinParams["ValueDate"];
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO").value = parent.detailWinParams["EventSeqNo"];
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NO").value = parent.detailWinParams["EntrySeqNo"];
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_TABLE_TYPE").value = parent.detailWinParams["TableType"];
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_SUMMARY_ID").value = parent.detailWinParams["SummaryID"];
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE").value = parent.detailWinParams["ValueDate"];
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO").value = parent.detailWinParams["EventSeqNo"];
		document.getElementById("BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NO").value = parent.detailWinParams["EntrySeqNo"];
		//fireHTMLEvent is used to assign values to db items alone
		//fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE"), "onpropertychange");
		//fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO"), "onpropertychange");
		//fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NO"), "onpropertychange");
		//fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_TABLE_TYPE"), "onpropertychange");
	}
	else
	{
		if (document.getElementById("BLK_OLTBS_CONTRACT__TXT_SUMMARY_ID").value == undefined)
		{document.getElementById("BLK_OLTBS_CONTRACT__TXT_SUMMARY_ID").value = "Save";}
	}
	/* Ashok Added :: Passing Summary Values to Detail */
	/* fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE"), "onpropertychange");
	fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO"), "onpropertychange");
	fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NO"), "onpropertychange");
	fireHTMLEvent(document.getElementById("BLK_OLTBS_CONTRACT__TXT_TABLE_TYPE"), "onpropertychange"); */
    return true;
}
function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
}
function fnPostLoad_CVS_FEES_KERNEL(){
	var g_prev_gAction = gAction;
    gAction = "FEEPARTPROD";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	 gAction = g_prev_gAction;
	return true;
}
function fnDefaultFees(event){
	var g_prev_gAction = gAction;
    gAction = "FEESDEF";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
	//OBCL_RABO_#36396770 CHANGES starts
   getElementsByOjName('cmdAddRow_BLK_LBTWS_PRAM_FEE_TEMP')[0].style.visibility = 'hidden';
   getElementsByOjName('cmdDelRow_BLK_LBTWS_PRAM_FEE_TEMP')[0].style.visibility = 'hidden';
// OBCL_RABO_#36396770 CHANGES ends	
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	 gAction = g_prev_gAction;
	return true;
}

function fnPostLoad_CVS_LOG_KERNEL(){
	var g_prev_gAction = gAction;
    gAction = "LOG";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	 gAction = g_prev_gAction;
	return true;
}
/* Ashok Added :: Passing Summary Values to Detail */
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
/* Ashok Added :: Passing Summary Values to Detail */
function fnShowDetail(v_rowid) {
    if (typeof (detailRequired) != 'undefined' && !detailRequired) {
        return false;
    }
	currIndex=v_rowid.currentTarget.rowIndex -1;//redwood changes BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
   //sumRsltRowNo = v_rowid;//redwood changes BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	sumRsltRowNo = currIndex;//redwood changes BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
    userParentFunc = "";
    userDetailPk = "";
    var fromSummary = 'TRUE';
    if (!fnPreShowDetail_SumMain())
        return false;
    //if (!fnEventsHandler('fnPreShowDetail_Sum')) return false;
    if (userParentFunc == "") {
        //if (g_DetPkArray.length > 0 && g_DetPkArray.length > v_rowid) { --Bug#36325538:Commented
        //    var detailPk = g_DetPkArray[v_rowid];	--Bug#36325538:Commented
		  if (g_DetPkArray.length > 0 && g_DetPkArray.length > currIndex) {	//Bug#36325538:Added
            var detailPk = g_DetPkArray[currIndex];	//Bug#36325538:Added
            detailWinParams.ShowSummary = "TRUE";
            detailWinParams.DetailPkVals = detailPk;
            detailWinParams.sumTxnBranch = sumTxnBranch;
            mainWin.dispHref1(parentFunc, seqNo, fromSummary);
        }
    } else {
        detailWinParams.ShowSummary = "TRUE";
        detailWinParams.DetailPkVals = userDetailPk;
        detailWinParams.sumTxnBranch = sumTxnBranch;
        mainWin.dispHref1(userParentFunc, seqNo, fromSummary);
    }
	detailWinParams["ValueDate"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currIndex].cells[2].getElementsByTagName("oj-input-text")[0]);
	detailWinParams["EventSeqNo"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currIndex].cells[3].getElementsByTagName("oj-input-text")[0]);
	detailWinParams["EntrySeqNo"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currIndex].cells[4].getElementsByTagName("oj-input-text")[0]);
	detailWinParams["TableType"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currIndex].cells[5].getElementsByTagName("oj-input-text")[0]);
	detailWinParams["SummaryID"] = "Summary";
	/* len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
				detailWinParams["ValueDate"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2].getElementsByTagName("A")[0]);
				detailWinParams["EventSeqNo"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3].getElementsByTagName("A")[0]);
				detailWinParams["EntrySeqNo"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[4].getElementsByTagName("A")[0]);
				detailWinParams["TableType"] = getText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[5].getElementsByTagName("A")[0]);
				detailWinParams["SummaryID"] = "Summary";
           	} 
		}
    } */
	return true;
}
/* Ashok Added :: Passing Summary Values to Detail */
function fnEnableDisableDetConsol(){
	fnEnablePT();
	EnableDisableAuthBtn();
	//fnEnableDisableFees();OBCL_14.6_RABO_Bug#34667485 CHANGES
		fnDisableChecks();
		
	return true;
}

function fnPostEnterQuery_KERNEL(){
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NOI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NOI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATEI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_ENTRY_SEQ_NO"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NO"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE"));
	document.getElementById("BLK_OLTBS_CONTRACT__TXT_SUMMARY_ID").value = "Summary";
	return true;
}
function fnPostExecuteQuery_KERNEL(){
	expandcontent('TAB_MAIN'); //29022199_Changes
	gExecuteQueryCheck=true;
	EnableDisableAuthBtn();
	fnEnablePT();
	//fnEnableDisableFees()OBCL_14.6_RABO_Bug#34667485 CHANGES;
	fnDisableChecks();
	
	return true;
}

function fnPostUnlock_KERNEL(){
	//fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATE"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	expandcontent('TAB_MAIN'); //29022199_Changes
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_DEFAULT"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_DEFAULT_COMPONENTS"));
	//Code to clear the consol block for recomputation in unlock
	var len = getTableObjForBlock("BLK_LBTWS_CONSOL_TRANSFER").tBodies[0].rows.length;
	for (var idx2 = 0;idx2 < len;idx2++) {
	fireHTMLEvent(document.getElementById("cmdDelRow_BLK_LBTWS_CONSOL_TRANSFER"), "onclick");
	}
	fnEnablePT();
	return true;
}
function fnPostSave_KERNEL() {
EnableDisableAuthBtn();
  return true;
}

function fnPreLoad_CVS_TRNFR_HIST_KERNEL(screenArgs){
//Initialise screen args for disabling consol transfer history button in call form
var detailed_instruction = document.getElementById("BLK_LBTWS_TRANSFER_MASTER__INSTRUCTION_TYPE"); // Detailed Instraction check
if (detailed_instruction.value==true){
	screenArgs['INSTRTYPE'] = 'Y';
}
else
{
	screenArgs['INSTRTYPE'] = 'N';
}

return true;
}

function fnPreLoad_CVS_PROCESS_TRNFR_HIST_KERNEL(screenArgs){
//Initialise screen args for disabling consol transfer history button in call form
var detailed_instruction = document.getElementById("BLK_LBTWS_TRANSFER_MASTER__INSTRUCTION_TYPE"); // Detailed Instraction check
if (detailed_instruction.value==true){
	screenArgs['INSTRTYPE'] = 'Y';
}
else
{
	screenArgs['INSTRTYPE'] = 'N';
}

return true;
}
// Excel Export Code Starts
function fnExportToExcel() {
    /*Fix for 20133322 starts*/
    var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var tmpFunc = selectSingleNode(xmlDOM, "//*[@FNID = '" + parentFunc + "']");
    if(tmpFunc==null || typeof(tmpFunc)=='undefined') {
        mask();
        showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_EXPORT_NS")), 'I');
        alertAction = "UNMASK";
        return;
    }/*Fix for 20133322 ends*/
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for (var j = 0; j < sumTblObj.length; j++) {
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('input')[0].value;
        if (isChkd) chkd = true;
    }
    if (!chkd) {
        mask();
        showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    var g_prev_gAction = gAction;
    gAction = "RUN_EXPORT";
    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><ENTITY/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><DEBUG_MODE>N</DEBUG_MODE><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM = loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/USERID"), mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"), mainWin.entity);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "CSDXLUPD");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"), "RUN_EXPORT");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"), "CS");
    /*if(mainWin.userLevelDbgEnabled == 'Y'){
       setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/DEBUG_MODE"),"Y");
    }    *///Debug revert
    var bodyReq = fnCreateBody();
    var tempbodyReq = bodyReq.cloneNode(true);
    bodyReq = fnGetBlkDetails(bodyReq);

    var recData = fnGetBlkDetailsForData();
    var recBlkData = selectSingleNode(tempbodyReq, "//REC[@TYPE='BLK_XLUPLDBLKDATA']");
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    var count = 1;
    for (var i = 0; i < len; i++) {

        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {

                var tabObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i];
                var ClmnValNode = exlRequestDOM.createElement("REC");
                ClmnValNode.setAttribute("RECID", count);
                ClmnValNode.setAttribute("TYPE", "BLK_XLUPLDBLKDATA");

                var clmValChldNode = exlRequestDOM.createElement("FV");
                ClmnValNode.appendChild(clmValChldNode);
                var pkcells = getPkCellNo();
                var recblkData = replacePkFieldWithVlaue(pkcells, tabObj, getNodeText(selectSingleNode(recData, "//REC")));//Fix for 17035806 
                recblkData = recblkData.replace("RECNO", count);
                recblkData = recblkData.replace("RECNO", count);
                var cdatasect = exlRequestDOM.createCDATASection(recblkData);

                selectSingleNode(ClmnValNode, "FV").appendChild(cdatasect);
                selectSingleNode(bodyReq, "//REC[@TYPE='BLK_XLUPLDBLKDTLS']").appendChild(ClmnValNode);
                count++;
            }
        }

    }

    var node = selectSingleNode(exlRequestDOM, "//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);

    if (fcjResponseDOM) {
        // OLD Format Excel Export Code  
        //executeExcel(fcjResponseDOM);
        gAction = g_prev_gAction;
    }
    //New  Format Excel Export Code  
    fnDownloadExcel();

}
function replacePkFieldWithVlaue(pkFieldCellNo, tabObj, recData) {

    var thObj = getTableObjForBlock("TBL_QryRsltsHeader").tBodies[0].rows[0].cells;//static header change
    for (var l = 0; l < pkFieldCellNo.length; l++) {
        var val = getInnerText(tabObj.cells[pkFieldCellNo[l] + 1]);
		if (thObj[pkFieldCellNo[l] + 1].getAttribute("TYPE") == "SELECT" || thObj[pkFieldCellNo[l] + 1].getAttribute("TYPE") == "RADIO") {//Bug 18060503 Changes
            var fldObj = OptionValue[thObj[pkFieldCellNo[l] + 1].getAttribute("NAME")].split("~");//Fix for 17197742
            for (var k = 0; k < fldObj.length; k++) {
                var selObj = fldObj[k].split("__");
                if (selObj[1] == getInnerText(tabObj.cells[pkFieldCellNo[l] + 1])) {
                    val = selObj[0];
                }
            }
        }
        /*Fix for 17183162 Start*/
        else if(thObj[pkFieldCellNo[l] + 1].getAttribute("TYPE") == "DATE"){
               val = new MB3Date(getInnerText(tabObj.cells[pkFieldCellNo[l] + 1]), mainWin.systemDateFormat,false);//Fix for 19522233
               val=val.getDSODate();        
        }
        /*Fix for 17183162 End*/
        else {
            val = getInnerText(tabObj.cells[pkFieldCellNo[l] + 1]);
        }
        recData = recData.replace(pkFields[l].split("__")[1] + "!", val + "!");
    }
    return recData;
}
function getPkCellNo() {
    msgxmlSumDom = loadXMLDoc(msgxml_sum);
    var fields = getNodeText(selectSingleNode(msgxmlSumDom, "//FN")).split("~");
    var pkFieldCellNo = new Array();
    if (fields) {
        var tdLen = fields.length;
        for (var l = 0; l < pkFields.length; l++) {
            for (k = 0; k < tdLen; k++) {
                if (pkFieldsCustom[l].split("__")[1] == fields[k]) {
                    pkFieldCellNo[l] = k;
				}
            }
        }
    }
    return pkFieldCellNo;
}
function fnGetBlkDetails(bodyReq) {

    var NewDOM = loadXMLDoc(msgxml);
    var fnNodes = selectNodes(NewDOM, "//FN");

    for (var i = 0; i < fnNodes.length; i++) {
        var parentName = fnNodes[i].getAttribute("PARENT");
        var relationTyp = fnNodes[i].getAttribute("RELATION_TYPE");
        var blockName = fnNodes[i].getAttribute("TYPE");
        var batchRefno = "";
        var relation = fnNodes[i].getAttribute("RELATION");
        var xsdName = "";
        var fldlist = getNodeText(fnNodes[i]);
        if (fldlist == "") continue;

        if (relationTyp == null) relationTyp = "";
        if (relation == null) relation = "";

        while (fldlist.indexOf("~") != -1) {
            fldlist = fldlist.replace("~", "!");
        }
        var rec = '<REC RECID="' + (i + 1) + '" TYPE="BLK_XLUPLDBLKDTLS"><FV/></REC>';
        NewDOM = loadXMLDoc(rec);
        setNodeText(selectSingleNode(NewDOM, "//FV"), batchRefno + "~" + blockName + "~" + xsdName + "~" + parentName + "~" + relation + "~" + relationTyp + "~" + fldlist + "~");

        //if(parentName=="") {
        //var ChildNode = NewDOM.createNode("element", "REC", "");
        //ChildNode.setAttribute("RECID",i+1);
        //ChildNode.setAttribute("TYPE", "BLK_XLUPLDBLKDTLS");
        //ChildNode.appendChild(NewDOM.createNode("element", "FV", ""));
        //ChildNode.selectSingleNode("//FV").text = batchRefno + "~" + blockName + "~" + xsdName + "~" + parentName + "~" + relation + "~" + relationTyp + "~" + fldlist + "~";
        selectSingleNode(bodyReq, "//REC[@TYPE='BLK_XLUPLDMSTR']").appendChild(selectSingleNode(NewDOM, "//REC"));

        //  }
    }
    return bodyReq;
}

function fnGetBlkDetailsForData() {

    //var NewDOM = createDOMActiveXObject()
    var NewDOM = loadXMLDoc(msgxml);
    var fnNodes = selectNodes(NewDOM, "//FN");

    for (var i = 0; i < fnNodes.length; i++) {
        var parentName = fnNodes[i].getAttribute("PARENT");
        var relationTyp = fnNodes[i].getAttribute("RELATION_TYPE");
        var blockName = fnNodes[i].getAttribute("TYPE");
        var fldlist = getNodeText(fnNodes[i]);
        var batchRefno = "";
        var relation = fnNodes[i].getAttribute("RELATION");
        var parentRec = "";
        var action = "";
        var recodNO = "RECNO";

        if (relationTyp == null) relationTyp = "";
        if (relation == null) relation = "";

        while (fldlist.indexOf("~") != -1) {
            fldlist = fldlist.replace("~", "!");
        }

        var recPos = 0;
        var list = ""
        var fldarray = new Array();
        fldarray = fldlist.split("!")
        for (var k = 0; k < fldarray.length; k++) {
            for (var p = 0; p < pkFields.length; p++) {

                if (fldarray[k] == pkFields[p].split("__")[1]) {
                    recPos = 1;
                }
            }
            if (recPos != 1) {
                fldarray[k] = "";

            }
            recPos = 0;
        }

        for (var k = 0; k < fldarray.length; k++) {
            list += fldarray[k] + "!";
        }
        fldlist = list;
        if (parentName == "") {

            //Fix for 17035806 --start
            var RecNode = loadXMLDoc("<REC></REC>") ;
            //var ChildNode = NewDOM.createElement("REC");
            //Fix for 17035806 --end
            ChildNode = selectSingleNode(RecNode, "//REC");
            ChildNode.setAttribute("RECID", "l");
            ChildNode.setAttribute("TYPE", "BLK_XLUPLDBLKDTLS");
            ChildNode.appendChild(NewDOM.createElement("FV"));
            //Fix for 17035806 --start
			setNodeText(selectSingleNode(RecNode, "//FV"), batchRefno + "~" + blockName + "~" + recodNO + "~" + recodNO + "~" + action + "~" + parentRec + "~" + fldlist + "~");
            return RecNode;
			//Fix for 17035806 --end
        }

    }
}
function fnGetBlkDetailsForExcelExport(bodyReq) {

    var NewDOM = loadXMLDoc(msgxml);
    var fnNodes = selectNodes(NewDOM, "//FN");

    for (var i = 0; i < fnNodes.length; i++) {
        var parentName = fnNodes[i].getAttribute("PARENT");
        var relationTyp = fnNodes[i].getAttribute("RELATION_TYPE");
        var blockName = fnNodes[i].getAttribute("TYPE");        
        var relation = fnNodes[i].getAttribute("RELATION");
        var xsdName = "";
        var fldlist = getNodeText(fnNodes[i]);
        if (fldlist == "") continue;

        if (relationTyp == null) relationTyp = "";
        if (relation == null) relation = "";

        while (fldlist.indexOf("~") != -1) {
            fldlist = fldlist.replace("~", "!");
        }
        var rec = '<REC RECID="' + (i + 1) + '" TYPE="BLK_XLUPLDBLKDTLS"><FV/></REC>';
        NewDOM = loadXMLDoc(rec);
        setNodeText(selectSingleNode(NewDOM, "//FV"), "batch_ref_no" + "~" + blockName + "~" + xsdName + "~" + parentName + "~" + relation + "~" + relationTyp + "~" + fldlist + "~");

        //if(parentName=="") {
        //var ChildNode = NewDOM.createNode("element", "REC", "");
        //ChildNode.setAttribute("RECID",i+1);
        //ChildNode.setAttribute("TYPE", "BLK_XLUPLDBLKDTLS");
        //ChildNode.appendChild(NewDOM.createNode("element", "FV", ""));
        //ChildNode.selectSingleNode("//FV").text = batchRefno + "~" + blockName + "~" + xsdName + "~" + parentName + "~" + relation + "~" + relationTyp + "~" + fldlist + "~";
        selectSingleNode(bodyReq, "//REC[@TYPE='BLK_XLUPLDMSTR']").appendChild(selectSingleNode(NewDOM, "//REC"));

        //  }
    }
    return bodyReq;
}
function fnGetBlkDetailsForExcelExportData() {

    //var NewDOM = createDOMActiveXObject()
    var NewDOM = loadXMLDoc(msgxml);
    var fnNodes = selectNodes(NewDOM, "//FN");

    for (var i = 0; i < fnNodes.length; i++) {
        var parentName = fnNodes[i].getAttribute("PARENT");
        var relationTyp = fnNodes[i].getAttribute("RELATION_TYPE");
        var blockName = fnNodes[i].getAttribute("TYPE");
        var fldlist = getNodeText(fnNodes[i]);       
        var relation = fnNodes[i].getAttribute("RELATION");
        var parentRec = "";
        var action = "";
        var recodNO = "RECNO";

        if (relationTyp == null) relationTyp = "";
        if (relation == null) relation = "";

        while (fldlist.indexOf("~") != -1) {
            fldlist = fldlist.replace("~", "!");
        }

        var recPos = 0;
        var list = ""
        var fldarray = new Array();
        fldarray = fldlist.split("!")
        for (var k = 0; k < fldarray.length; k++) {
            for (var p = 0; p < pkFields.length; p++) {

                if (fldarray[k] == pkFields[p].split("__")[1]) {
                    recPos = 1;
                }
            }
            if (recPos != 1) {
                fldarray[k] = "";

            }
            recPos = 0;
        }

        for (var k = 0; k < fldarray.length; k++) {
            list += fldarray[k] + "!";
        }
        fldlist = list;
        if (parentName == "") {       
       
            var RecNode = loadXMLDoc("<REC></REC>") ;
            ChildNode = selectSingleNode(RecNode, "//REC");
            ChildNode.setAttribute("RECID", "l");
            ChildNode.setAttribute("TYPE", "BLK_XLUPLDBLKDTLS");
            ChildNode.appendChild(NewDOM.createElement("FV"));
            //Bug 16654387 Changes Starts
			/* Fix for 16476411*/
            setNodeText(selectSingleNode(RecNode,"//FV"), "batch_ref_no" + "~" + blockName + "~" + recodNO + "~" + recodNO + "~" + action + "~" + parentRec + "~" + fldlist + "~");
            //setNodeText(selectSingleNode(ChildNode,"//FV"),  batchRefno +"~" + blockName +  "~" + recodNO + "~" +  action + "~" + parentRec + "~" + fldlist + "~");
            //Bug 16654387 Changes Ends
            return RecNode;
        }

    }
}

function fnCreateExcelExportBody() {

    var msgxml_xlupd = "<FCUBS_BODY>";
    msgxml_xlupd += '    <FLD>';
    msgxml_xlupd += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_XLUPLDMSTR">FUNCID~BATCHREFNO~USERID~NOUPLDED~NOSUCCFUL~NOFAILED~FILENAME~OVRDACT~PSTUPDSTS~GENORUPLD~SOURCE~ACTION</FN>';
    msgxml_xlupd += '      <FN PARENT="BLK_XLUPLDMSTR" RELATION_TYPE="N" TYPE="BLK_XLUPLDDTLS">BATCHREFNO~RECID~RECKEY~UPLOADSTS~ERRS~RECNO</FN>';
    msgxml_xlupd += '      <FN PARENT="BLK_XLUPLDMSTR" RELATION_TYPE="N" TYPE="BLK_XLUPLDBLKDTLS">BATCHREFNO~BLKNAME~XSDND~PARENTBLK~RELATION~RELATIONTYP~FLDNAMES1~FLDNAMES2~FLDNAMES3~FLDNAMES4~FLDNAMES5~FLDDESC1~FLDDESC2~FLDDESC3~FLDDESC4~FLDDESC5~FLDDESC6~FLDDESC7~FLDDESC8~FLDDESC9~FLDDESC10~BLKTITLE</FN>';
    msgxml_xlupd += '      <FN PARENT="BLK_XLUPLDBLKDTLS" RELATION_TYPE="N" TYPE="BLK_XLUPLDBLKDATA">BATCHREFNO~BLKNAME~RECNO~RECID~ACTCODE~PRECID~FLDVALS1~FLDVALS2~FLDVALS3~FLDVALS4~FLDVALS5~FLDVALS6~FLDVALS7~FLDVALS8~FLDVALS9~FLDVALS10~FLDVALS11~FLDVALS12~FLDVALS13~FLDVALS14~FLDVALS15~FLDVALS16~FLDVALS17~FLDVALS18~FLDVALS19~FLDVALS20~FLDVALS21~FLDVALS22~FLDVALS23~FLDVALS24~FLDVALS25~FLDVALS26~FLDVALS27~FLDVALS28~FLDVALS29~FLDVALS30~FLDVALS31~FLDVALS32~FLDVALS33~FLDVALS34~FLDVALS35~FLDVALS36~FLDVALS37~FLDVALS38~FLDVALS39~FLDVALS40~FLDVALS41~FLDVALS42~FLDVALS43~FLDVALS44~FLDVALS45~FLDVALS46~FLDVALS47~FLDVALS48~FLDVALS49~FLDVALS50~PRECNO</FN>';
    msgxml_xlupd += '      <FN PARENT="BLK_XLUPLDDTLS" RELATION_TYPE="N" TYPE="BLK_XLUPLDERRORS">BATCHREFNO~RECID~RECKEY~ERRNO~ERRCD~ERRPARAM~ERRMSG~RECNO</FN>';
    msgxml_xlupd += '      <FN PARENT="BLK_XLUPLDMSTR" RELATION_TYPE="N" TYPE="BLK_XLUPLDDICTIONARY">MAXLEN~MAXDEC~FLDDESC~BLKNO~BLKNAME~XSDNODE~FLDNAME~XSDTAG~MAND~READONLY~DATATYP~BATCHREFNO</FN>';
    msgxml_xlupd += '    </FLD>';
    msgxml_xlupd += '<REC RECID="1" TYPE="BLK_XLUPLDMSTR"><FV/></REC></FCUBS_BODY>';
    reqDom = loadXMLDoc(msgxml_xlupd);

    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection(detailFuncId + "~" + "batch_ref_no" + "~" + mainWin.UserId + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~");
    selectSingleNode(selectSingleNode(reqDom, "//REC[@RECID='1'][@TYPE='BLK_XLUPLDMSTR']"), "FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom, "//FCUBS_BODY");

}

// OBCL14.4:SFR#29959798:LOR_Adjustments -Starts
function fnPopulateLorDiff()
{
	var g_prev_gAction = gAction;
    gAction = "POPLORDIFF";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	 gAction = g_prev_gAction;
	return true;
}
// OBCL14.4:SFR#29959798:LOR_Adjustments - Ends

//Default_Action_Changes Start
function fnPostFocus_KERNEL() {
    var obj = document.getElementById("BLK_OLTBS_CONTRACT__CONTRACTREFNO");
    if ((gAction == 'ENTERQUERY') || (gAction == 'EXECUTEQUERY') || (gAction == 'NEW') || (gAction == 'MODIFY')) {
        if ((gAction == 'ENTERQUERY') || (gAction == 'EXECUTEQUERY')) {
            obj.removeAttribute("pickup_product");
            obj.removeAttribute("onchange");
            obj.setAttribute("onchange", "disp_auto_lov('LBDPTFR','BLK_OLTBS_CONTRACT','CONTRACTREFNO','"+ obj.getAttribute("label_value") +"','LOV_CONTRACT','','','','', this, event);");
            appendData();
        }
        else {
            obj.removeAttribute("onchange");
            obj.setAttribute("pickup_product", "");
            obj.setAttribute("onchange", "fnToUppercase(this, event);disp_auto_lov('LBDPTFR','BLK_OLTBS_CONTRACT','CONTRACTREFNO','"+ obj.getAttribute("label_value") +"','LOV_CONTRACT','','','','', this, event);");
            appendData();
        }
    }
    return true;
}
//Default_Action_Changes End