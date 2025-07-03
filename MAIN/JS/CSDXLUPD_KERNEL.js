/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : CSDXLUPD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             :  
****************************************************************************************************************************/
function fnUploadExcel111() {
	var g_prev_gAction = gAction;
	gAction = "SUBMIT_IMPORT";

	var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
		headerNode +='<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
	
	exlRequestDOM=loadXMLDoc(headerNode);
setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"), mainWin.UserId);
setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "CSDXLUPD");
setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"), "SUBMIT_IMPORT");
setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"), "CS");
	var bodyReq = fnCreateUploadRequest();
	var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY")
	node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
	
	fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
	if (!fnProcessResponse()) {
		resetDOM();
		resetElements();
		disableForm();
		gAction = "";
		fnSetExitButton();
		showToolbar(functionId, '', '');
		return false;
	}
		resetDOM();
		createDOM(dataSrcLocationArray[0]);
		gAction = "RUN_IMPORT";
		appendData();
		fcjRequestDOM = buildUBSXml();
		var funcId = document.getElementById("BLK_XLUPLDMSTR__FUNCID").value;
		var btchRefNo = document.getElementById("BLK_XLUPLDMSTR__BATCHREFNO").value;
		var pstUpldSts = document.getElementById("BLK_XLUPLDMSTR__PSTUPDSTS").value;
		var ovrdt = document.getElementById("BLK_XLUPLDMSTR__OVRDACT").value;
		var genOrUpload = document.getElementById("BLK_XLUPLDMSTR__GENORUPLD").value;
		var UploadSource = document.getElementById("BLK_XLUPLDMSTR__SOURCE").value;
		var action = document.getElementById("BLK_XLUPLDMSTR__ACTION").value;
		var nodeText = funcId + "~" + btchRefNo + "~" + mainWin.UserId + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + ovrdt + "~" + pstUpldSts + "~" + genOrUpload + "~" + UploadSource + "~" + action + "~";
		setNodeText(selectSingleNode(fcjRequestDOM,("//REC[@RECID='1'][@TYPE='BLK_XLUPLDMSTR']/FV")),nodeText);
		fnPostAsync(fcjRequestDOM,servletURL,functionId);
	disableForm();
	gAction = "";
	fnSetExitButton();
	showToolbar(functionId, '', '');
}

function fnCreateUploadRequest() {
		var msgxml_xlupd=""; 
		msgxml_xlupd += '<FCUBS_BODY>'+msgxml+'</FCUBS_BODY>';
	reqDom=loadXMLDoc(msgxml_xlupd);
	
	
	var fileName = "";
	var funcId = document.getElementById("BLK_XLUPLDMSTR__FUNCID").value;
	var btchRefNo = document.getElementById("BLK_XLUPLDMSTR__BATCHREFNO").value;
	var pstUpldSts = document.getElementById("BLK_XLUPLDMSTR__PSTUPDSTS").value;
	var ovrdt = document.getElementById("BLK_XLUPLDMSTR__OVRDACT").value;
	var genOrUpload = document.getElementById("BLK_XLUPLDMSTR__GENORUPLD").value;
	var UploadSource = document.getElementById("BLK_XLUPLDMSTR__SOURCE").value;
	var action = document.getElementById("BLK_XLUPLDMSTR__ACTION").value;

	var ChildNode = reqDom.createNode("element", "REC", "");
	ChildNode.setAttribute("RECID", "1");
	ChildNode.setAttribute("TYPE", "BLK_XLUPLDMSTR");
	var blkCdtSecNd = "";
	var rtChldNode = reqDom.createElement("FV");
	ChildNode.appendChild(rtChldNode);
	var excel = new ActiveXObject("Excel.Application");
	var excel_file = excel.Workbooks.Open(document.getElementById("BLK_XLUPLDMSTR__FILENAME").value);
	var excel_sheet = "";
	/*excel_sheet = excel.Worksheets("Block Details");
	var aryBlks = new Array();
	var blks = "";
	var blkDtls = "";
	var blkCell = 3;
	while (excel_sheet.cells(blkCell, 1).value != undefined) {
		blks += excel_sheet.cells(blkCell, 1).value + "~";
		blkCell++;
	}
	blks = blks.substring(0, blks.length - 1);
	blks = blks.split("~");
	for (var blk = 3; blk <= blks.length + 2; blk++) {
		blkDtls = "";
		for (var bcell = 2; bcell <= 5; bcell++) {
			if (excel_sheet.cells(blk, bcell).value != undefined) {
				blkDtls += excel_sheet.cells(blk, bcell).value + "~";
			} else {
				blkDtls += "" + "~";
			}
		}
		blkDtls = blkDtls.substring(0, blkDtls.length - 1);
		aryBlks[blks[blk - 3]] = blkDtls;
	}*/

	var NumOfSheets = excel.Worksheets.count;

	for (var i = 3; i <= NumOfSheets; i++) {
		excel_sheet = excel.Worksheets(i);
		var ClmnNode = reqDom.createNode("element", "REC", "");
		ClmnNode.setAttribute("RECID", (i - 2));
		ClmnNode.setAttribute("TYPE", "BLK_XLUPLDBLKDTLS");

		var clmChldNode = reqDom.createElement("FV");
		ClmnNode.appendChild(clmChldNode);
		ChildNode.appendChild(ClmnNode);
		var clmns = "";
		var colval = "";
		var colCDtSecnd = "";
		var work_sheet_name = excel.Worksheets(i).name;
		var clmVals = "";
		clmVals = work_sheet_name + "~";

		if (work_sheet_name != "UDF Details") {

			var fldcol = btchRefNo + "~" + excel_sheet.Cells(1, 1) + "~" + "~~~" + "~";
			j = 4;
			while (excel_sheet.Cells(2, j).Value != undefined) {
				colval += excel_sheet.Cells(2, j) + "!";
				j++;

			}

			while (colval.length > 4000) {
				fldcol += colval.substring(0, 3999) + "~";
				colval = colval.substring(4000, fldcol.length);
			}

			if (colval.length > 0) {
				fldcol += colval;
			}

			clmns = clmns.substring(0, clmns.length - 1);

			colCDtSecnd = reqDom.createCDATASection(fldcol);
selectSingleNode(selectSingleNode(ChildNode ,"//REC[@RECID='" + (i - 2) + "'][@TYPE='BLK_XLUPLDBLKDTLS']"), "FV").appendChild(colCDtSecnd);
			var row = 4;

			while (excel_sheet.Cells(row, 1).Value != undefined) {
				var ClmnValNode = reqDom.createNode("element", "REC", "");
				ClmnValNode.setAttribute("RECID", row - 3);
				ClmnValNode.setAttribute("TYPE", "BLK_XLUPLDBLKDATA")

				var clmValChldNode = reqDom.createElement("FV");
				var clmvalCDtSecNd = "";
				ClmnValNode.appendChild(clmValChldNode);
				ClmnNode.appendChild(ClmnValNode);
				clmVals = "";
				var fldvals = btchRefNo + "~" + excel_sheet.Cells(1, 1) + "~";
				if (excel_sheet.Cells(row, 1).Value != undefined) {
					fldvals += excel_sheet.Cells(row, 1).Value + "~";
				} else {
					fldvals += "" + "~";
				}
				if (excel_sheet.Cells(row, 2).Value != undefined) {
					fldvals += excel_sheet.Cells(row, 2).Value + "~";
				} else {
					fldvals += "" + "~";
				}
				if (excel_sheet.Cells(row, 3).Value != undefined) {
					fldvals += excel_sheet.Cells(row, 3).Value + "~";
				} else {
					fldvals += "" + "~";
				}

				var fldDt = "";
				for (var val = 4; val < j; val++) {
					if (excel_sheet.Cells(row, val).Value != undefined) {
						fldDt += excel_sheet.Cells(row, val).Value + "!";
					}
					else {
						fldDt += "" + "!";
					}
				}
				while (fldDt.length > 4000) {
					fldvals += fldDt.substring(0, 3999) + "~";
					fldDt = fldDt.substring(4000, fldvals.length);
				}

				if (fldDt.length > 0) {
					fldvals += fldDt;
				}
				clmvalCDtSecNd = reqDom.createCDATASection(fldvals);
selectSingleNode(selectSingleNode(ClmnNode, "REC[@RECID='" + (row - 3) + "'][@TYPE='BLK_XLUPLDBLKDATA']"), "FV").appendChild(clmvalCDtSecNd);
				row++;
			}
		} else {
			j = 2;
			clmns = btchRefNo + "~" + work_sheet_name + "~" + "UDF Details" + "~";
			while (excel_sheet.Cells(1, j).Value != undefined) {
				clmns += excel_sheet.Cells(1, j).Value + "~";
				j++;
			}
			clmns = clmns.substring(0, clmns.length - 1);
setNodeText(selectSingleNode(selectSingleNode(ChildNode, "//REC[@RECID='" + (i - 2) + "'][@TYPE='BLK_XLUPLDBLKDTLS']"), "FV"), clmns);
			var row = 2;

			while (excel_sheet.Cells(row, 1).Value != undefined) {
				var ClmnValNode = reqDom.createNode("element", "REC", "");
				ClmnValNode.setAttribute("RECID", row - 1);
				ClmnValNode.setAttribute("TYPE", "BLK_XLUPLDBLKDATA")

				var clmValChldNode = reqDom.createElement("FV");
				var clmvalCDtSecNd = "";
				ClmnValNode.appendChild(clmValChldNode);
				ClmnNode.appendChild(ClmnValNode);
				clmVals = work_sheet_name + "!" + btchRefNo + "!";
				for (var val = 1; val < j; val++) {
					if (excel_sheet.Cells(row, val).Value != undefined) {
						clmVals += excel_sheet.Cells(row, val).Value + "!";
					} else {
						clmVals += "" + "~";
					}
				}
				clmVals = clmVals.substring(0, clmVals.length - 1);
				clmvalCDtSecNd = reqDom.createCDATASection(clmVals);
selectSingleNode(selectSingleNode(ClmnNode, "REC[@RECID='" + (row - 3) + "'][@TYPE='BLK_XLUPLDBLKDATA']"), "FV").appendChild(clmvalCDtSecNd);
				row++;
			}
		}
		ChildNode.appendChild(ClmnNode);
	}
selectSingleNode(	reqDom,"//FCUBS_BODY").appendChild(ChildNode);
	blkCdtSecNd = reqDom.createCDATASection(funcId + "~" + btchRefNo + "~" + mainWin.UserId + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + ovrdt + "~" + pstUpldSts + "~" + genOrUpload + "~" + UploadSource + "~" + action + "~");
selectSingleNode(selectSingleNode(reqDom, "//REC[@RECID='1'][@TYPE='BLK_XLUPLDMSTR']"), "FV").appendChild(blkCdtSecNd);
excel.displayAlerts = false;
	excel.Workbooks.close();
	return selectSingleNode(reqDom,"//FCUBS_BODY");
}

function fnPopulateFunctionId() {
fnUpload();
var excel = new ActiveXObject("Excel.Application");
var excel_file = excel.Workbooks.Open(document.getElementById("BLK_XLUPLDMSTR__FILENAME").value);
var filename = excel_file.Worksheets(1).cells(1,2).value;
document.getElementById("BLK_XLUPLDMSTR__FUNCID").value = filename.split(".")[0];
excel.displayAlerts = false;
excel.Workbooks.close();
excel.Application.Quit();
}

function fnonblurGENORUPLD(){

if(document.getElementById("BLK_XLUPLDMSTR__GENORUPLD").value == "U"){
document.getElementById("BLK_XLUPLDMSTR__SOURCE").value="FLEXCUBE";
document.getElementById("BLK_XLUPLDMSTR__SOURCE").readOnly=true;
} else{
document.getElementById("BLK_XLUPLDMSTR__SOURCE").value="";
document.getElementById("BLK_XLUPLDMSTR__SOURCE").readOnly=false;
}

}

function fnPostAsync(fcjMsgDOM, servletURL, functionID)
{  
  if (fcjMsgDOM != null )  {
  var objHTTP = createHTTPActiveXObject();
    var strFormData = getXMLString(fcjMsgDOM);    
    objHTTP.open("POST", servletURL, true); // Open the Connection to the Server in Asynchronous mode
    //objHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");      
    objHTTP.setRequestHeader("FUNCTIONID", functionID); 
    objHTTP.setRequestHeader("OPERATION", gAction);
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    if(strFormData.indexOf("<ATTACHMENTS>")>-1){
        objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
    }
    else{
        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
     }
     objHTTP.send(strFormData);    
  } 
}

function fnUpload() {
	try {		
		mask();
		loadSubScreenDIV("ChildWin", "ExcelUpload.jsp");
	} catch (e) {
		alert(scriptError);
	}
}

function fnUploadExcel() {	
    
	if (!fnValidate()) return false;

	var g_prev_gAction = gAction;
	appendData(document.getElementById('TBLPageTAB_MAIN'));
	gAction = "SUBMIT_IMPORT";
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (!fnProcessResponse()) {
		resetDOM();
		resetElements();
		disableForm();
		gAction = "";
		fnSetExitButton();
		showToolbar(functionId, '', '');
		return false;
	}
	resetDOM();
	createDOM(dataSrcLocationArray[0]);
	gAction = "RUN_IMPORT";
	appendData();
	fcjRequestDOM = buildUBSXml();
	//Bug 16502176 Changes Starts
	  try{
		var errornode = selectSingleNode(fcjResponseDOM, "//ERROR");
		if (errornode != null && getNodeText(errornode) == "DE-SAL03") {
			alert("Falied to read excel");
			return;
		}
	  }catch(e){}
    //Bug 16502176 Changes Ends
	var funcId = document.getElementById("BLK_XLUPLDMSTR__FUNCID").value;
	var btchRefNo = document.getElementById("BLK_XLUPLDMSTR__BATCHREFNO").value;
	var pstUpldSts = document.getElementById("BLK_XLUPLDMSTR__PSTUPDSTS").value;
	var ovrdt = document.getElementById("BLK_XLUPLDMSTR__OVRDACT").value;
	var genOrUpload = document.getElementById("BLK_XLUPLDMSTR__GENORUPLD").value;
	var UploadSource = document.getElementById("BLK_XLUPLDMSTR__SOURCE").value;
	var action = document.getElementById("BLK_XLUPLDMSTR__ACTION").value;
	var nodeText = funcId + "~" + btchRefNo + "~" + mainWin.UserId + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + ovrdt + "~" + pstUpldSts + "~" + genOrUpload + "~" + UploadSource + "~" + action + "~";
	setNodeText(selectSingleNode(fcjRequestDOM, ("//REC[@RECID='1'][@TYPE='BLK_XLUPLDMSTR']/FV")), nodeText);
        //27588804
        var importFunction = document.getElementById("BLK_XLUPLDMSTR__FUNCID").value;
	fnPostAsync(fcjRequestDOM, servletURL, importFunction);
        //27588804
	disableForm();
	gAction = "";
	fnSetExitButton();
	showToolbar(functionId, '', '');
}
