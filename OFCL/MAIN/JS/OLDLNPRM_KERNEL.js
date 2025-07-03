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
**  File Name          : OLDLNPRM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Ashokkumar Arumugam
**  Last modified on   : 29-08-2017
**  Full Version       : OBCL_12.5.0.0.0
**  Reason             : LOV selection wrongly defaulted to other field
**  Search String      : 26716063_Changes
****************************************************************************************************************************/
var g_curr_row = 0;
var g_first_row_value="";
var g_prev_count=0;
var search_count = 0;
var on_click_count = 0;
var g_prev_str = "";

function fnSearch(e) {
	var dataBlocks = ["BLK_TEXTITEM", "BLK_LOVITEM", "BLK_CHECKBOX"];
    try {
		var searchStr = document.getElementById("BLK_MASTER__TXT_SEARCH").value;
		if((searchStr!=undefined)&&(searchStr!="")){
		    searchStr = searchStr.toLowerCase();
			block_count = dataBlocks.length;
			if((searchStr!=g_prev_str)&&(g_prev_str!="")){
				on_click_count = 0;
				search_count = 0;
			}
			if(search_count>0){
				if(search_count<=on_click_count){
					on_click_count = 0;
				    search_count = 0;
				}
			}
			g_prev_str = searchStr;
			on_click_count = on_click_count + 1;
			search_count = 0;
			for (j = 0; j < block_count; j++) {
				var data_blk = dataBlocks[j];
				var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
				for (var i = 0; i < len; i++) {
					//Redwood_changes_1 starts
					//if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]) {
						if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
						//var param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[2].getElementsByTagName("TEXTAREA")[0];
						var param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[2].getElementsByTagName("oj-input-text")[0];
                    //Redwood_changes_1 ends
						if (param_Label==undefined){
							param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[2].getElementsByTagName("oj-input-text")[0];
						}
						//var param_Value = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[3].getElementsByTagName("oj-input-text")[0];
						var param_Value = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0]; //Redwood_changes_1
						if ((param_Label.value.toLowerCase().includes(searchStr))){
							search_count = search_count + 1;
						}
						if(param_Value.style.color = "red"){
							param_Value.style.color = "";
							param_Label.style.color = "";
						}
					}
				}
			}
			fnElementFocus();
		}else if(searchStr==""){
			for (k = 0; k < block_count; k++) {
				var data_blk = dataBlocks[k];
				var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
				for (var l = 0; l < len; l++) {
					//Redwood_changes_1 starts
					//if (getTableObjForBlock(data_blk).tBodies[0].rows[l].cells[0].getElementsByTagName("oj-input-text")[0]) {
						if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
						//var param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[l].cells[2].getElementsByTagName("TEXTAREA")[0];
						var param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[l].cells[2].getElementsByTagName("oj-input-text")[0];
                    //Redwood_changes_1 ends						
						if (param_Label==undefined){
							param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[l].cells[2].getElementsByTagName("oj-input-text")[0];
						}
						//var param_Value = getTableObjForBlock(data_blk).tBodies[0].rows[l].cells[3].getElementsByTagName("oj-input-text")[0];	
                        var param_Value = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0];//Redwood_changes_1				
						if ((param_Label.value.toLowerCase().includes(searchStr))){
							search_count = search_count + 1;
						}
						if(param_Value.style.color = "red"){
							param_Value.style.color = "";
							param_Label.style.color = "";
						}
					}
				}
			}			
		}
    } catch (e) {}
    return true;
}
function fnElementFocus(){
	var dataBlocks = ["BLK_TEXTITEM", "BLK_LOVITEM", "BLK_CHECKBOX"];
	var block_count = 0;
	var srch_count = 0;
    try {
		var searchStr = document.getElementById("BLK_MASTER__TXT_SEARCH").value;
		if((searchStr!=undefined)&&(searchStr!="")){
		    searchStr = searchStr.toLowerCase();
			block_count = dataBlocks.length;
			for (j = 0; j < block_count; j++) {
				var data_blk = dataBlocks[j];
				var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
				for (var i = 0; i < len; i++) {
                     //Redwood changes starts 
					//if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]) {
						if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
						//var param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[2].getElementsByTagName("TEXTAREA")[0];
						var param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[2].getElementsByTagName("oj-input-text")[0];
                        //Redwood changes ends 
						if (param_Label==undefined){
							param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[2].getElementsByTagName("oj-input-text")[0];
						}
						//Redwood changes starts 
						if (data_blk =='BLK_CHECKBOX'){ //Redwood_changes_1
						var param_Value = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0];	
						}
						else
						{
                        //Redwood changes ends 
						var param_Value = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[3].getElementsByTagName("oj-input-text")[0];	
						}
						if ((param_Label.value.toLowerCase().includes(searchStr))){
							srch_count = srch_count + 1;
							if(srch_count == g_prev_count ){
								param_Value.style.color = "";
								param_Label.style.color = "";
							}
							if(srch_count == on_click_count ){
								param_Value.style.color = "red";
								if (data_blk!='BLK_CHECKBOX'){ //Redwood_changes_1
								param_Value.focus();
								}
								param_Label.style.color = "red";
								param_Label.focus(); //ashok added
								g_prev_count = srch_count;
								return true;
							}
						}						
					}
				}
			}
		}
    } catch (e) {}
    return true;
}
function fnSingleCheck(data_blk) {
    try {
        var count = 0;
		var l_curr_row = 0;
        var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
        if (dbIndexArray[data_blk] < 1) {
            getTableObjForBlock(data_blk).tBodies[0].rows[len - 1].cells[0].getElementsByTagName("INPUT")[0].checked = true;
        }
		if (dbIndexArray[data_blk] > len) {
            getTableObjForBlock(data_blk).tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked = true;
        }
        for (var i = 0; i < len; i++) {
            //if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]) {
			if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //Redwood changes
                if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                    l_curr_row = i;
                    count = count + 1;
                }
                if (getPgSize(data_blk) != "" && dbIndexArray[data_blk] < 1) {
                    dbIndexArray[data_blk] = (Number(getInnerText(document.getElementById("CurrPage__" + data_blk))) - 1) * getPgSize(data_blk) + i + 1;
                }
            }
        }
    } catch (e) {}
    return l_curr_row;
}
function fnPreDispLov_LOV_QUERY_KERNEL(lovSrcElem){
	var prevact = "";
	prevact = gAction;
	var blockId;
	try
    {
		blockId ="BLK_LOVITEM";
		g_curr_row = fnSingleCheck(blockId);
		document.getElementById("BLK_MASTER__TXT_ROW_NUM").value = g_curr_row+1;
		gAction = "CUSTOMLOV";
		appendData(document.getElementById('TBLPageAll'));
		fcjRequestDOM = buildUBSXml(); 
		fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if (fcjResponseDOM) 
		{
			var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			if (msgStatus == "FAILURE") 
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			} 
			else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
			{
				  var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
			}
		}
		var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
		setDataXML(getXMLString(pureXMLDOM));
		showData(dbStrRootTableName, 1);
		
		if (msgStatus == "FAILURE") 
		{
			var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
			return false;
		}
		else if (msgStatus == "WARNING")
				{
					var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
					var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
		}	
	}catch(e){}
    gAction = prevact;
    return true;
}
function fnPostDispLov_LOV_QUERY_KERNEL(screenArgs){
	g_first_row_value = document.getElementById("BLK_LOVITEM__PARAMVALUE").value; //taking backup for firstrow of LOV
	return true;
}
function fnPostReturnValToParent_LOV_QUERY_KERNEL() {
	var data_blk = "BLK_LOVITEM";
	var selectedRow = g_curr_row;
	if (selectedRow !=0){
		/* 26716063_Changes :: Starts */
		//document.getElementById("BLK_LOVITEM__PARAMVALUE"+selectedRow).value = document.getElementById("BLK_LOVITEM__PARAMVALUE").value; //Assign value to the selected row of LOV
		document.getElementById("BLK_LOVITEM__PARAMVALUE"+selectedRow+"RC").value = document.getElementById("BLK_LOVITEM__PARAMVALUE").value; //Assign value to the selected row of LOV
		/* 26716063_Changes :: Ends */
		document.getElementById("BLK_LOVITEM__PARAMVALUE").value = g_first_row_value; //Assign backup value to the firstrow of LOV
	}
    return true;
}
function fnPreExit_KERNEL() {
	on_click_count = 0;
	search_count = 0;
	var data_blk = "BLK_LOVITEM";
	fnAddRow(data_blk);
	fnDeleteRow(data_blk);
    return true;
}
function fnPreSave_KERNEL() {
	on_click_count = 0;
	search_count = 0;
	var data_blk = "BLK_LOVITEM";
	fnAddRow(data_blk);
	fnDeleteRow(data_blk);
    return true;
}
function fnPostLoad_KERNEL() 
{
	on_click_count = 0;
	search_count = 0;
	document.getElementById("TAB_MAIN__SEC_1__PAR_1").style.height="2px";
	document.getElementById("cmdAddRow_BLK_TEXTITEM").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_TEXTITEM").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_LOVITEM").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_LOVITEM").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_CHECKBOX").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_CHECKBOX").style.visibility = 'hidden';
	return true;
}
function fnPostExecuteQuery_KERNEL() 
{
	on_click_count = 0;
	search_count = 0;
	fnDisableElement(document.getElementById("BLK_MASTER__PARAM"));
    fnEnableElement(document.getElementById("BLK_MASTER__TXT_SEARCH"));
	fnEnableElement(document.getElementById("BLK_MASTER__BTN_SEARCH"));
	return true;
}
function fnPostUnlock_KERNEL() {
	on_click_count = 0;
	search_count = 0;
	return true;
}
   