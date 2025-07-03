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
**  CHANGE LOG
**  Written by         : K.PRIYADARSHINI
**  Date of creation   : 11-AUG-2016
**  File Name          : LDDDRYET_KERNEL.js
**  Purpose            : 
**  Called From        : OLDDRYET
**  
**   Modified By        : Gomathi G
**   Modified on        : 10-AUG-2019
**   Reason             : Enabling Message field only on Internal Event CheckBox is checked
**   Search String      : OBCL_14.3_SUPPORT_BUG#29588577 
  Changed By         : Prakash Ravi
  Changed On         : 20-AUG-2019
  Search String      : OBCL_14.4_DIARY_EVENT_UPDATE
  Change Reason      : Added code to view contract details on click of a button.
****************************************************************************************************************************/

var fcjResponseDOM;
var fcjRequestDOM;
/* OBCL_Field_Tag_Populate_Changes :: Starts */
var gFlag = true;
var gFieldLabelAvail = false;
var blockId = "";//block id to upload the CSV file
var currPg = 1;//current page of the block
var totPg = 1;//total page of the block
var pgSize = 0;//page size to dispaly the datas
var totRow = 0;//total rows of the block
var length = 0;//current length of the block
/* OBCL_Field_Tag_Populate_Changes :: Ends */

function fnPostLoad_KERNEL(){   
document.getElementById("cmdAddRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
	return true;
}

function fnPostNew_KERNEL(){
	fnEnableElement(document.getElementById("BLK_CONTRACT_DETAILS__BTN_P"));
	document.getElementById("cmdAddRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
		/* To Check if Read only Radio btn is RAD bug */
	//fnDisableElement(document.getElementById("BLK_CONTRACT_DETAILS__INTEVNT"));//OBCL_14.3_SUPPORT_BUG#29588577 Changes Commented
	return true;
}	

function fnPostUnlock_KERNEL(){
	document.getElementById("cmdAddRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
	/* To Check if Read only Radio btn is RAD bug */
	//fnDisableElement(document.getElementById("BLK_CONTRACT_DETAILS__INTEVNT"));//OBCL_14.3_SUPPORT_BUG#29588577 Changes Commented
	return true;
}

function fn_default_details(){
    var g_prev_gAction = gAction;
    gAction = 'CHECK';
    appendData(document.getElementById("TBLPageAll"));
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
	
	  if (document.getElementById("BLK_CONTRACT_DETAILS__INTEVNT").value == "Y")
	{
	fnEnableElement(document.getElementById("BLK_CONTRACT_DETAILS__MESSAGECD"));
	}
	//OBCL_14.3_SUPPORT_BUG#29588577 Changes Starts
	else if  (document.getElementById("BLK_CONTRACT_DETAILS__INTEVNT").value == "N")
		{
		fnDisableElement(document.getElementById("BLK_CONTRACT_DETAILS__MESSAGECD"));
		}
	//OBCL_14.3_SUPPORT_BUG#29588577 Changes Ends	
	
	
    gAction = g_prev_gAction;
    return true;
}
function fnPostLoad_Sum_KERNEL(e) {
   //debugger;	
    if (typeof(parent.screenArgs["FCCREF"]) != 'undefined') {
        //var evnt = window.event || e;//Ashok Changes
        document.getElementById("BLK_SUMMARY_DETAILS__CONREFNUM").value = parent.screenArgs['FCCREF'];
		//fnExecuteQuery_sum('Y', e);	
	}
	parent.screenArgs['FCCREF'] = "";
    return true;
}
/* OBCL_Field_Tag_Populate_Changes :: Starts */
function fnResetUpload() {
    gFlag = true;
    gFieldLabelAvail = false;
    blockId = "";//block id to upload the CSV file
    currPg = 1;//current page of the block
    totPg = 1;//total page of the block
    pgSize = 0;//page size to dispaly the datas
    totRow = 0;//total rows of the block
    length = 0;//current length of the block
    return true;
}

function fnUpdateAvailabilityFlag() {
    if (blockId != undefined && blockId != '' && blockId != "") {
        currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));//current page of the block
        totPg = Number(getInnerText(document.getElementById("TotPage__" + blockId)));//total page of the block
        pgSize = getPgSize(blockId);//page size to dispaly the datas
        if (currPg != 1) {
            Navigate(N_FIRST, blockId);//navigate to last page, if the current page not equal to total page
        }
        totRow = 0;
        for (var idx = 0;idx < totPg;idx++) {
            length = getTableObjForBlock(blockId).tBodies[0].rows.length;//current length of the block
            currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
            if (length > 0 && length != '' && length != "") {
                for (var idy = 0;idy < length;idy++) {
                    var fieldTagValField = getTableObjForBlock(blockId).tBodies[0].rows[idy].cells[6].getElementsByTagName("oj-input-text")[0];//fieldTagLabels availity check
                    if (fieldTagValField.value != "" && fieldTagValField.value != '' && gFlag) {
                        gFieldLabelAvail = true;
                        gFlag = false;
                    }
                }
            }
            if (totPg > currPg) {
                Navigate(N_NEXT, blockId);//navigate to next page, if the current page not equal to total page    
            }
        }
        if (currPg != 1) {
            Navigate(N_FIRST, blockId);//navigate to last page, if the current page not equal to total page
        }
    }
    return true;
}

function fn_populate_details(e) {
    var g_prev_gAction = gAction;
    blockId = "BLK_OLTWS_FIELDS_TEMP";
    fnUpdateAvailabilityFlag();
    appendData(document.getElementById("TBLPageAll"));
    var avaiabilityFieldObj = document.getElementById("BLK_CONTRACT_DETAILS__AVAILABILITY_FLAG");
    if (gFieldLabelAvail) {
        avaiabilityFieldObj.value = "Y";
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_CONTRACT_DETAILS/AVAILABILITY_FLAG"), "Y");
    }
    else {
        avaiabilityFieldObj.value = "N";
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_CONTRACT_DETAILS/AVAILABILITY_FLAG"), "N");        
    } 
    appendData();
    fnResetUpload();
    gAction = 'POPULATE';
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = "";
        if (msgStatus == "FAILURE") {
            messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
        else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
            messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    setDataXML(getXMLString(pureXMLDOM));
    showData(dbStrRootTableName, 1);
    var returnVal = "";
    if (msgStatus == "FAILURE") {
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        gAction = g_prev_gAction;
        return false;
    }
    if (msgStatus == "WARNING") {
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'O');
        gAction = g_prev_gAction;
        return true;
    }
    if (msgStatus == "SUCCESS") {
        returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        gAction = g_prev_gAction;
        return true;
    }
    gAction = g_prev_gAction;
    return true;
}

function fnPreSave_KERNEL() {
    if ((gAction == 'NEW') || (gAction == 'MODIFY')) {
        blockId = "BLK_OLTWS_FIELDS_TEMP";
        fnUpdateAvailabilityFlag();
        appendData(document.getElementById("TBLPageAll"));
        var avaiabilityFieldObj = document.getElementById("BLK_CONTRACT_DETAILS__AVAILABILITY_FLAG");
        if (gFieldLabelAvail) {
            avaiabilityFieldObj.value = "Y";
            setNodeText(selectSingleNode(dbDataDOM, "//BLK_CONTRACT_DETAILS/AVAILABILITY_FLAG"), "Y");
        }
        else {
            avaiabilityFieldObj.value = "N";
            setNodeText(selectSingleNode(dbDataDOM, "//BLK_CONTRACT_DETAILS/AVAILABILITY_FLAG"), "N");        
        }
        fnResetUpload();
    }
    return true;
}
/* OBCL_Field_Tag_Populate_Changes :: Ends */

  //OBCL_14.4_DIARY_EVENT_UPDATE Change starts
function fnPostExecuteQuery_KERNEL() {
    debugs("In fnPostExecuteQuery", "A");
    fnEnableElement(document.getElementById("BLK_CONTRACT_DETAILS__BTN_LS"));
    return true;
}

function fn_launch_ls(event) {
    parentWinParams = new Object();
    var index = getRowIndex(event) - 1;
    //var tableObj = document.getElementById('BLK_OVD');
    //parentWinParams.CONTRACT_REF_NO = tableObj.tBodies[0].rows[index].cells[1].getElementsByTagName("oj-input-text")[0].value;
    //var brnCode = document.getElementById("BLK_HEAD__BRANCH").value;
    parentWinParams.CONTRACT_REF_NO = document.getElementById("BLK_CONTRACT_DETAILS__CONREFNUM").value;
	var l_module = document.getElementById("BLK_CONTRACT_DETAILS__MODULECODE").value;
	var l_prod_type = document.getElementById("BLK_CONTRACT_DETAILS__PRODUCTTYPE").value;
	if (l_module == 'OL' || l_module == 'FC' || l_module == 'LB') {
    try {
        if (l_module == 'OL') {
            parentWinParams.FUNCTION_ID = 'OLDTRONL';
        } else if (l_module == 'FC') {
			parentWinParams.FUNCTION_ID = 'FCDTRONL';
		} else if (l_module == 'LB') {
			if (l_prod_type == 'C') {
				parentWinParams.FUNCTION_ID = 'LBDTRONL';
			} else if (l_prod_type == 'L') {
				parentWinParams.FUNCTION_ID = 'LBDDDONL';
			}
		}
    }
    catch (e) {
        debugs("In fn_launch_ls exceptions", "A");
    }
    parentWinParams.LANG = mainWin.LangCode;
    parentWinParams.UI_XML = '';
    //parentWinParams.BRANCH = '011';
    parentWinParams.PARENT_FUNC_ID = 'OLDDRYET';
    mainWin.dispHref1(parentWinParams.FUNCTION_ID, seqNo);
	}
    return true;
}
//OBCL_14.4_DIARY_EVENT_UPDATE Change ends