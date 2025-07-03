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
**  File Name          : OLDFFMSG_KERNEL.js
**  Purpose            : 
**  Called From        : OLDFFMSG
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

  **  Modified By     : Pallavi R
  **  Modified On     : 17-Oct-2024
  **  Modified Reason : User was not able to capture Prorata Free Format messages 
  **  Search String   : OBCL_14.7_RABO_#37056902 Changes 
****************************************************************************************************************************/
var lAction;
var gDisbtn = 'N';
function fnPostNew_KERNEL(){
	gDisbtn ='N';
	document.getElementById("BLK_FFMBR_MAS__ORIGACTION").value = gAction;
	fnDisableScreenElement("TAB_MAIN__SEC_1");
	fnDisableScreenElement("TAB_MAIN__SEC_2");
	fnDisableScreenElement("TAB_MAIN__SEC_3");
	fnDisableScreenElement("TAB_SWIFT__SEC_SEC_1");
	fnDisableScreenElement("TAB_SWIFT__SEC_SEC_2");
	fnDisableScreenElement("TAB_TELEX__SEC_SECTION1");
	fnDisableScreenElement("TAB_OTHERS__SEC_1");
	fnDisableScreenElement("TAB_OTHERS__SEC_2");	
	return true;
}
function fnPostEnrichDetails_KERNEL(){
	fnDisableScreenElement("TAB_HEADER__SEC_HEAD");
	fnEnableScreenElement("TAB_MAIN__SEC_1");
	fnEnableScreenElement("TAB_MAIN__SEC_2");
	fnEnableScreenElement("TAB_MAIN__SEC_3");
	fnEnableScreenElement("TAB_SWIFT__SEC_SEC_1");
	fnEnableScreenElement("TAB_SWIFT__SEC_SEC_2");
	fnEnableScreenElement("TAB_TELEX__SEC_SECTION1");
	fnEnableScreenElement("TAB_OTHERS__SEC_1");
	fnEnableScreenElement("TAB_OTHERS__SEC_2");
	fnEnableElement(document.getElementById('BLK_FFMBR_MAS__MESSAGE'));
	document.getElementById("cmdAddRow_BLK_ENT_DET").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_ENT_DET").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_PART_DET").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_PART_DET").style.visibility = 'hidden';
	gDisbtn ='Y';
	return true; 
}
function fnUndoGenerate(){
	lAction = 'UNDOGENERATE';
	fnClassDefault("BLK_FFMBR_MAS");
	return true;
}
function fnMsgPreview(){
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var stat = extractSubSysStat(statusStr, 'PREVIEW');
	if ((stat == 'D') && (gAction != '')){
		lAction = 'PREVIEW';
		fnClassDefault("BLK_FFMBR_MAS");
	}
	else{
		fnSubScreenMain('OLDFFMSG','','CVS_PREVIEW');
	}
	return true;
}
/*function fnGenMsg(){
	lAction = 'PRORATATAG';
	fnClassDefault("BLK_FFMBR_MAS");
	gProrata ='Y';
	return true;
}*/
function fnGenMsg(){
	lAction = 'GENMSG';
	fnClassDefault("BLK_FFMBR_MAS");
	gGenMsg ='Y';
	return true;
}
function fnUpload(){
	try {
        
		var ffmtRefNo = document.getElementById("BLK_FFMBR_MAS__FFMTREFNO").value;
		var contractRefNo = document.getElementById("BLK_FFMBR_MAS__CONTRACTREFNO").value;
        if ((ffmtRefNo != "") && (contractRefNo != "")) {
            mask();
            loadSubScreenDIV("ChildWin", "OBCLUpload.jsp?actionType=UPLOAD&functionType=B&filePathField=pdfPath&ffmtRefNo=" + ffmtRefNo + "&contractRefNo=" + contractRefNo + "");
        }
    }
    catch (e) {
        alert(scriptError);
    }

	return true;
}
function createRequestIFrameExcel(height, width) { //9NT1606_12_2_RETRO_12_1_23664350 changes
    var requestIFrame = document.createElement('iframe');
    requestIFrame.setAttribute('id', 'RequestFrame');
    requestIFrame.setAttribute('name', 'RequestFrame');
    requestIFrame.setAttribute('class', 'TextNormal');
    requestIFrame.setAttribute('src', '');
    requestIFrame.setAttribute('frameBorder', '0');
    requestIFrame.setAttribute('height', height + 'px');
    requestIFrame.setAttribute('width', width + 'px');
    requestIFrame.setAttribute('scrolling', 'no');
    requestIFrame.style.border = '0px none';
    requestIFrame.style.margin = '0px';
    requestIFrame.style.padding = '0px';
    return requestIFrame;
}

function createResponseIFrame() {
    var responseFrameContainer = document.createElement('div');
    responseFrameContainer.setAttribute('id', 'responseContainer');
    var iFrameID = 'ResponseFrame';
    var iFrameBody = '<iframe id=\"' + iFrameID + '\"' + ' name=\"' + iFrameID + '\"' + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
    responseFrameContainer.innerHTML = iFrameBody;
    return responseFrameContainer;
}

function fnDownLoad(){
	
	    try {
        var fileInputField = document.getElementById("ResTree");
        var parent = fileInputField.parentNode;
        var iFrameBody = "";
		var ffmtRefNo = document.getElementById("BLK_FFMBR_MAS__FFMTREFNO").value;
		var contractRefNo = document.getElementById("BLK_FFMBR_MAS__CONTRACTREFNO").value;
        iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>';
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
        //iFrameBody += "<FORM id='fileUploadForm' method='post' action=FCReportHandleRequest?fileName="+fileUrl1+"&TYPE=DOWNLOAD enctype='multipart/form-data'>";
        iFrameBody += "<FORM id='fileUploadForm' method='post' action=OBCLFileProcessing?functionType=B&filePathField=pdfPath&ffmtRefNo=" + ffmtRefNo + "&contractRefNo=" + contractRefNo + "&actionType=DOWNLOAD";
        iFrameBody += " enctype='multipart/form-data'>";
        iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />";
        iFrameBody += "</FORM></body></html>"; 

        var iFrameHeight = fileInputField.offsetHeight;
        var iFrameWidth = fileInputField.offsetWidth;

        var requestIFrame = createRequestIFrameExcel(iFrameHeight + 5, iFrameWidth + 50); //9NT1606_12_2_RETRO_12_1_23664350 changes
        parent.appendChild(requestIFrame);
        var iRequestFrameID = 'RequestFrame';
        if (self.frames[iRequestFrameID].name != iRequestFrameID) {
            // *** IMPORTANT: This is a BUG FIX for Internet Explorer *** 
            self.frames[iRequestFrameID].name = iRequestFrameID;
        }
        document.getElementById('RequestFrame').contentWindow.document.open();
        document.getElementById('RequestFrame').contentWindow.document.write(iFrameBody);
        document.getElementById('RequestFrame').contentWindow.document.close();
        var responseIFrame = createResponseIFrame();
        parent.appendChild(responseIFrame);
        var iResponseFrameID = 'ResponseFrame';
        if (self.frames[iResponseFrameID].name != iResponseFrameID) {
            // *** IMPORTANT: This is a BUG FIX for Internet Explorer *** 
            self.frames[iResponseFrameID].name = iResponseFrameID;
        }
        var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
        iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
        iFrameFormDocument.getElementById("fileUploadForm").submit();
    } catch (e) {
        // do Nothing
    }
	return true;
}
function fnImport(){
	lAction = 'IMPORT';
	fnClassDefault("BLK_FFMBR_MAS");
	return true;
}
function fnPreClassDefault__KERNEL(){
	gAction = lAction;
	return true;
}

function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById('BLK_FFMBR_MAS__BTN_DOWNLOAD'));
	fnEnableElement(document.getElementById('BLK_FFMBR_MAS__BTN_MSG_PREVIEW'));
	return true;
}

function fnPostFocus_KERNEL(){
	var statusStr = getElementsByOjName('SUBSYSSTAT')[0].value;
	var pStat = extractSubSysStat(statusStr, 'PREVIEW');
	var gStat = extractSubSysStat(statusStr, 'GENERATE');
	if (((pStat != 'D') ||(gStat != 'D')) && (gAction !='')) {
		disableForm();
		fnEnableElement(document.getElementById('BLK_FFMBR_MAS__BTN_MSG_PREVIEW'));
		if (pStat != 'D'){
			fnEnableElement(document.getElementById('BLK_FFMBR_MAS__BTN_GEN'));			
		}
		else if (gStat != 'D'){
			fnEnableElement(document.getElementById('BLK_FFMBR_MAS__BTN_UNDO_GEN'));
		}		
	}
	else if (gDisbtn =='Y'){
		fnDisableElement(document.getElementById('BLK_FFMBR_MAS__BTN_GEN'));
		fnDisableElement(document.getElementById('BLK_FFMBR_MAS__BTN_UNDO_GEN'));
	}	
	if (gAction == 'NEW'){
		fnDisableElement(document.getElementById('BLK_FFMBR_MAS__BTN_DOWNLOAD'));
	}
	if (gAction != 'NEW'){
		fnEnableElement(document.getElementById('BLK_FFMBR_MAS__BTN_DOWNLOAD'));
		fnDisableElement(document.getElementById('BLK_FFMBR_MAS__BTN_UPLOAD'));
		fnDisableElement(document.getElementById('BLK_FFMBR_MAS__BTN_GEN'));
	}	
	//OBCL_14.7_RABO_#37056902 Changes Starts,PRORATA button should be enabled for  MESSAGETYPE 'P'
	if (document.getElementsByName('MESSAGETYPE')[2].checked){ 
		if (((pStat == 'D') && (gAction !='')) ||(gAction =='')){
			fnEnableElement(document.getElementById('BLK_FFMBR_MAS__BTN_PRORATA'));
		}
		else {
			fnDisableElement(document.getElementById('BLK_FFMBR_MAS__BTN_PRORATA'));
		}
	}		
	else {
		fnDisableElement(document.getElementById('BLK_FFMBR_MAS__BTN_PRORATA'));
	}
	//OBCL_14.7_RABO_#37056902 Changes Ends	
	return true;
}	
function fnPostClassDefault__KERNEL(){
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if ((msgStatus == "WARNING") || (msgStatus == "SUCCESS")){ 
		if  (lAction == 'PREVIEW') {
			fnSubScreenMain('OLDFFMSG','','CVS_PREVIEW');	
		}
		if (lAction == 'DEFAULT') {
			fnSubScreenMain('OLDFFMSG','','CVS_TAGS');		
		}
		if (lAction == 'PROTAGDFLT') {
			fnSubScreenMain('OLDFFMSG','','CVS_PRORATA');		
		}
	}		
	return true;
}
function fnTags() {
	lAction = 'DEFAULT';
	var noRows = getTableObjForBlock("BLK_PART_DET").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			if (gAction != ''){
				if (getTableObjForBlock("BLK_PART_DET").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked == true) {					
					getElementsByOjName("TAGS_VISITED")[rowIndex].value='Y';
				}
			}			
		}	
	fnClassDefault("BLK_FFMBR_MAS");	
    return true;
}
function fn_ProRataTags() {
	if (gAction != ''){//OBCL_14.7_RABO_#37056902 Changes
		lAction = 'PROTAGDFLT';	
		fnClassDefault("BLK_FFMBR_MAS");
	}
	//OBCL_14.7_RABO_#37056902 Changes Starts,On query system should only display the values
	else{
		fnSubScreenMain('OLDFFMSG','','CVS_PRORATA');
	}
	//OBCL_14.7_RABO_#37056902 Changes Ends
    return true;
}
//OBCL_14.7_RABO_#37056902 Changes Starts
 
function fnCalcAmt(){
	lAction = 'CALCAMT';
	fnClassDefault("BLK_FFMBR_MAS");
	 return true;
}
 
function fnPostLoad_CVS_PRORATA_KERNEL(){
	document.getElementById("cmdAddRow_BLK_PRORATA_BORR_DET").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_PRORATA_BORR_DET").style.visibility = 'hidden';
	return true;
}
function fnPreClassDefault_CVS_PRORATA_KERNEL(){
	gAction = lAction;
	return true;
}
//POBCL_14.7_RABO_#37056902 Changes Ends
function fnPostLoad_CVS_TAGS_KERNEL(){
	document.getElementById("cmdAddRow_BLK_PARTY_TAGS").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_PARTY_TAGS").style.visibility = 'hidden';
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
/*function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_OLTBS_CONTRACT__CONTREFNO').value;    
    return true;
}*/
function fnPostReturnValToParent_LOV_TAGS_KERNEL(event) {
	document.getElementById("BLK_FFMBR_MAS__MESSAGE").value = document.getElementById("BLK_FFMBR_MAS__MESSAGE").value+document.getElementById("BLK_FFMBR_MAS__TAGS").value;
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	document.getElementById("BLK_FFMBR_MAS__MAKERID").value = "";
    document.getElementById("BLK_FFMBR_MAS__MAKERDTSTAMP").value = "";
    document.getElementById("BLK_FFMBR_MAS__CHECKERID").value = "";
    document.getElementById("BLK_FFMBR_MAS__CHECKERDTSTAMP").value = "";
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end