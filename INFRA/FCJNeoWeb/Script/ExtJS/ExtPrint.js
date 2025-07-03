/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtPrint.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.
** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.
** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.
Copyright © 2009-2015  by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
*/
/* SFR HISTORY
//
// SFR NO :- FCJ 7.2 ITR1 2447
//
	**  Modified By           : Selvam Manickam
    **  Modified On           : 26-May-2023 
    **  Modified Reason       : ON CLICKING "PRINT PREVIEW", ERROR MESSAGE SHOULD BE DISPLAYED WHEN NO MASTER BLOCK FIELDS SELECTED. 
    **  Search String         : redwood_35239542
	
	**  Modified By           : Ramalingam R
    **  Modified On           : 23-June-2023
    **  Modified Reason       : ON CLICKING "PRINT PREVIEW", ERROR MESSAGE SHOULD BE DISPLAYED WHEN THERE IS NO FIELDS SELECTED. 
    **  Search String         : REDWOOD_35239542
---------------------------------------------------------------------------------------------------- 
*/
isPrintLoaded = true;
var gThirdChar;
var gErrCodes = "";
var gXmlDoc;
var gMulitE = 'Multiple Entry';
var gSingleE = 'Single Entry';
var screenType;

var extBlksArray;
var extBlkLabelsArray;
//var functionId;
/*
 * Validate Detail screen before print
 */
function canPrintDetail() {
    var canPrint = true;
    if (getXMLString(dbDataDOM) == "") {
        appendErrorCode('ST-COM027', null);
        canPrint = false;
    }
    return canPrint;
}

/*
 * Validate Summary screen before print
 */
function canPrintSummary() {
    var canPrint = false;
    if (getXMLString(dbDataDOM) == "") {
        canPrint = false;
    } else {
        var tblResult = document.getElementById("TBLPageidSummary").getElementsByTagName("TABLE")[0];
        var tblRow = tblResult.tBodies[0].rows;
        var tblFirstCell;
        if (tblRow.length != 0) {
            for (var rowCnt = 0; rowCnt < tblRow.length; rowCnt++) {
                tblFirstCell = tblRow[rowCnt].cells[0].getElementsByTagName("INPUT")[0];
                if (tblFirstCell.checked) {
                    canPrint = true;
                }
            }
        }
    }
    if (!canPrint) {
        appendErrorCode('ST-COM027', null);
    }
    return canPrint;
}

function fnExtensiblePrint() {
    //11012012
    //mainWin.showToolbar("", "", "");
    //showToolbar("", "", "");//fix for 17014727
    var canPrint = true;
    var fileName;
    var arrBlkNames = new Array();
    var arrFldNames = new Array();

    gThirdChar = functionId.substring(2, 3);

    if ((gThirdChar).toUpperCase() == "S") {
        canPrint = canPrintSummary();
    } else {
        canPrint = canPrintDetail();
    }
    if (canPrint) {
        fnGetLabelsFromExtXML(functionId, arrBlkNames, arrFldNames, langCode);
        buildPrintDialog(arrBlkNames, arrFldNames);
    } else {
        message = buildMessage(gErrCodes);
        alertMessage(message);
    }
    gAction = "";
}
var arrContainsBlk = false;

function fnGetLabelsFromExtXML(functionId, arrBlkNames, arrFldNames, langCode) {
    var fileName;
    var canPrint = true;
    //9NT1606_12_2_RETRO_12_0_3_23656967 starts
	//fileName = functionId.substring(2, 0) + "D" + functionId.substring(3, functionId.length);
    //fileName = mainWin.UIXmlPath + langCode + fileName + ".xml";
	if (typeof(detailFuncId) != "undefined") 
		fileName = mainWin.UIXmlPath + langCode + detailFuncId + ".xml";
	else
		fileName = mainWin.UIXmlPath + langCode + functionId.substring(2, 0) + "D" + functionId.substring(3, functionId.length) + ".xml";
	//9NT1606_12_2_RETRO_12_0_3_23656967 ends
    gXmlDoc = loadXMLFile(fileName);
    var fldSetNodeList = selectNodes(gXmlDoc, "//FLDSET");
    var fldSetRef;
    var blockRef;
    var count = 0;
    for (var fldSetIndex = 0; fldSetIndex < fldSetNodeList.length; fldSetIndex++) {
        fldSetRef = fldSetNodeList[fldSetIndex];
        blockRef = selectSingleNode(fldSetRef, "BLOCK");
        tempBlkId = getNodeText(blockRef);
        var screenName = fldSetRef.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("NAME");
        if (tempBlkId!= "undefined"){
		finalBlkId = screenName + "~" + tempBlkId;
		
        if (typeof (arrBlkNames[finalBlkId]) != "undefined") {
            arrContainsBlk = true;
        }
        if (!arrContainsBlk) {
            arrBlkNames[count++] = finalBlkId;
            arrBlkNames[finalBlkId] = finalBlkId;
        }
        lblRef = selectSingleNode(fldSetRef, "LBL");
        if (!arrContainsBlk) {
            if (lblRef != null) {
                if (getNodeText(lblRef) == "") {
                    var label = "";
                    if (arrBlkNames[finalBlkId].split("~")[1].indexOf("BLK") != -1) {
                        label = makeInitCaps(arrBlkNames[finalBlkId].split("~")[1].substring("4"));
                        arrBlkNames[finalBlkId] = label;
                    } else {
                        label = makeInitCaps(arrBlkNames[finalBlkId].split("~")[1]);
                        arrBlkNames[finalBlkId] = label;
                    }
                } else {
                    arrBlkNames[finalBlkId] = getNodeText(lblRef);
                }
            }
            arrFldNames[finalBlkId] = getExtFldNames(fldSetRef, arrBlkNames, finalBlkId);
        }
		}
        arrContainsBlk = false;
    }
    return canPrint;
}

function getExtFldNames(fldSetRef, arrBlkNames, finalBlkId) {
    var dbc;
    var label;
    var scrName = finalBlkId.split("~")[0];
    var blkName = finalBlkId.split("~")[1];
    var fldNodeListRef = selectNodes(gXmlDoc, "//FLDSET[BLOCK= '" + blkName + "']/FIELD");//Fix for 17253151
    var type = fldSetRef.getAttribute("TYPE");
    var view = fldSetRef.getAttribute("VIEW");
    var arrFldNames = new Array();
    var gFldCnt = 0;
    var fldType;
    var blkID;
    var dbt;
	var relatedField; //Fix for 21215359
    for (var fldCnt = 0; fldCnt < fldNodeListRef.length; fldCnt++) {
        fldRef = fldNodeListRef[fldCnt];
        if (fldRef.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "SCREEN" && fldRef.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("NAME") != scrName) {
            continue;
        }
        ctrlFld = fldRef.getAttribute("CONTROL");
        if (ctrlFld == "Y") {
            continue;
        }
        fldName = selectSingleNode(fldRef, "NAME");
        if (getNodeText(fldName) == "AUTHSTATI" || getNodeText(fldName) == "TXNSTATI") {
            continue;
        }
        dbc = fldName;
        if (dbc != null) tempDbc = getNodeText(dbc);
        blkID = selectSingleNode(fldSetRef, "BLOCK");
        dbt = blkID;
        label = selectSingleNode(fldRef, "LBL");
        fldType = selectSingleNode(fldRef, "TYPE");
        relatedField = selectSingleNode(fldRef, "RELATED_FIELD"); //Fix for 21215359
        //Fix for 21625170 start
        prepareFLDForPrint();
        if (getNodeText(fldType) != "HIDDEN" && getNodeText(fldType) != "BUTTON" && getNodeText(fldType) != "FIELDSET" && getNodeText(fldType) != "LABEL") {
            if (type == "ME") {
                if (parent != null && typeof (parent.fcjResponseDOM) != "undefined") {
                    /*if (selectSingleNode(parent.fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT") == null) {
                        break;
                    }*/
                    masterTbl = getNodeText(selectSingleNode(dbFCJDOMPrint, "FLD/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT"));
                   // break;Fix for 17253151
                } else {
                    if (selectSingleNode(dbFCJDOMPrint, "FLD/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT") != null) {
                        masterTbl = getNodeText(selectSingleNode(dbFCJDOMPrint, "FLD/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT"));
                        // break;Fix for 17253151,21625170 end
                    }
                }
            }
            if (dbc != null && type == "ME" && label != null) {
                if (!fnIsInExtMaster(getNodeText(dbc), masterTbl, dbt)) {
                    if (getNodeText(label) != "") {
                        if (arrFldNames[getNodeText(dbc)] == null) {
                            if (dbt != null) {
                                arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                arrFldNames[gFldCnt++] = getNodeText(dbc);
                                arrFldNames[getNodeText(dbc)] = getNodeText(label);
								//Fix for 21215359 starts
								if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
                                } else {
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
                                } 
								//Fix for 21215359 ends
                            }
                        }
                    } else {
                        if (arrFldNames[getNodeText(dbc)] == null) {
                            if (dbt != null) {
                                arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                arrFldNames[gFldCnt++] = getNodeText(dbc);
                                arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
								//Fix for 21215359 starts
								if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
                                } else {
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
                                } 
								//Fix for 21215359 ends
                            }
                        }
                    }
                }
            } else if (dbc != null && label != null && type == "SE") {
                if (getNodeText(label) != "") {
                    if (arrFldNames[getNodeText(dbc)] == null) {
                        if (dbt != null) {
                            arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                            arrFldNames[gFldCnt++] = getNodeText(dbc);
                            arrFldNames[getNodeText(dbc)] = getNodeText(label);
							//Fix for 21215359 starts
							if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
							} else {
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
							} 
							//Fix for 21215359 ends
                        }
                    }
                } else {
                    if (arrFldNames[getNodeText(dbc)] == null) {
                        if (dbt != null) {
                            arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                            arrFldNames[gFldCnt++] = getNodeText(dbc);
                            arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
							//Fix for 21215359 starts
							if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
							} else {
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
							} 
							//Fix for 21215359 ends						
                        }
                    }
                }
            } else {
                if (dbc != null) {
                    if (type == "ME") {
                        if (!fnIsInMaster(getNodeText(fldName), masterTbl, dbt)) {
                            if (arrFldNames[getNodeText(dbc)] == null) {
                                if (dbt != null) {
                                    arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                    arrFldNames[gFldCnt++] = getNodeText(dbc);
                                    arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
									//Fix for 21215359 starts
									if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
										arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
									} else {
										arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
									} 
									//Fix for 21215359 ends									
                                }
                            }
                        }
                    } else {
                        if (arrFldNames[getNodeText(dbc)] == null) {
                            if (dbt != null) {
                                arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                arrFldNames[gFldCnt++] = getNodeText(dbc);
                                arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
								//Fix for 21215359 starts
								if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
									arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
								} else {
									arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
								} 
								//Fix for 21215359 ends
                            }
                        }
                    }
                }
            }
        }
    }
    return arrFldNames;
}

/*
 * Function Checks this column presents in the master
 */
function fnIsInExtMaster(fieldName, tableName, dbt) {
    var blkId = tableName;
    var isInMaster;
    isInMaster = selectSingleNode(gXmlDoc, "//FLDSET[BLOCK = " + blkId + "]/FIELD[NAME = '" + getNodeText(fieldName) + "']");
    if (isInMaster == null) {
        return false;
    } else {
        return true;
    }
}

/*
 * Function to get the lable using the given labellink
 */
function getLabelFromLink(labelLink, blkId) {
    var label = selectSingleNode(gXmlDoc, "//BLOCK[ID = '" + blkId + "']/FIELD[NAME ='" + labelLink + "']/LABEL");
    if (label != null) {
        label = getNodeText(label);
    } else {
        label = "";
    }
    return label;
}

/*
 * Includes AuditLbls in arrFldNames
 */
function includeAuditLbls(arrBlkNames, arrFldNames) {
    //Include audit labels with fields of master block 
    var arrBlkFldNames = new Array();
    var masterBlkName;
    var masterBlkNodeList = selectSingleNode(gXmlDoc, "//BLOCK[@TYPE = 'Audit Entry']");
    if (masterBlkNodeList != null) {
        masterBlkScrName = masterBlkNodeList.getAttribute("SCREEN");
        masterBlkName = "BLK_" + getNodeText(selectSingleNode(masterBlkNodeList, "DBT"));
        masterDbt = getNodeText(selectSingleNode(masterBlkNodeList, "DBT"));
    } else {
        return;
    }
    var finalMasterBlkName = masterBlkScrName + "~" + masterBlkName;
    if (screenType == 'M') {
        var auditFldIds = new Array('RECORD_STAT', 'AUTH_STAT', 'MAKER_ID', 'MAKER_DT_STAMP', 'CHECKER_ID', 'CHECKER_DT_STAMP', 'MOD_NO', 'ONCE_AUTH');
        var auditFldLbls = new Array();
        auditFldLbls[0] = mainWin.getItemDesc("LBL_RECORD_STAT");
        auditFldLbls[1] = mainWin.getItemDesc("LBL_AUTH_STAT");
        auditFldLbls[2] = mainWin.getItemDesc("LBL_MAKER_ID");
        auditFldLbls[3] = mainWin.getItemDesc("LBL_MAKER_DT_STAMP");
        auditFldLbls[4] = mainWin.getItemDesc("LBL_CHECKER_ID");
        auditFldLbls[5] = mainWin.getItemDesc("LBL_CHECKER_DT_STAMP");
        auditFldLbls[6] = mainWin.getItemDesc("LBL_MOD_NO");
        auditFldLbls[7] = mainWin.getItemDesc("LBL_ONCE_AUTH");
    }
    if (screenType == 'O') {
        var auditFldIds = new Array('AUTHSTAT', 'CONTSTAT', 'MAKERID', 'MAKERSTAMP', 'CHECKERID', 'CHECKERSTAMP', 'COLLECTION_STATUS', 'PAYMENT_STATUS', 'DEAL_STATUS', 'PROCESSTAT', 'REVR_MAKERID', 'REVR_MAKERSTAMP', 'REVR_CHECKERID', 'REVR_CHECKERSTAMP');
        var auditFldLbls = new Array();
        auditFldLbls[0] = mainWin.getItemDesc("LBL_AUTH_STAT");
        auditFldLbls[1] = mainWin.getItemDesc("LBL_CONTRACT_STATUS");
        auditFldLbls[2] = mainWin.getItemDesc("LBL_MAKER_ID");
        auditFldLbls[3] = mainWin.getItemDesc("LBL_MAKER_DT_STAMP");
        auditFldLbls[4] = mainWin.getItemDesc("LBL_CHECKER_ID");
        auditFldLbls[5] = mainWin.getItemDesc("LBL_CHECKER_DT_STAMP");
        auditFldLbls[6] = mainWin.getItemDesc("LBL_COLLECTION_STATUS");
        auditFldLbls[7] = mainWin.getItemDesc("LBL_PAYMENT_STATUS");
        auditFldLbls[8] = mainWin.getItemDesc("LBL_DEAL_STATUS");
        auditFldLbls[9] = mainWin.getItemDesc("LBL_PROCESS_STATUS");
        auditFldLbls[10] = mainWin.getItemDesc("LBL_REVR_MAKERID");
        auditFldLbls[11] = mainWin.getItemDesc("LBL_REVR_MAKERSTAMP");
        auditFldLbls[12] = mainWin.getItemDesc("LBL_REVR_CHECKERID");
        auditFldLbls[13] = mainWin.getItemDesc("LBL_REVR_CHECKERSTAMP");
    }
    for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++) {
        tempBlkId = arrBlkNames[blkCnt];
        if (finalMasterBlkName == tempBlkId) {
            arrBlkFldNames = arrFldNames[tempBlkId];
            tempArrLen = arrBlkFldNames.length;
            for (var auditCnt = 0; auditCnt < auditFldIds.length; auditCnt++) {
                arrBlkFldNames[tempArrLen + '__' + auditFldIds[auditCnt]] = masterDbt;
                arrBlkFldNames[tempArrLen] = auditFldIds[auditCnt];
                arrBlkFldNames[arrBlkFldNames[tempArrLen]] = auditFldLbls[auditCnt];
                tempArrLen++;
            }
        }
    }
    return arrFldNames;
}

/*
 * Builds Print Dialog
 */
function buildPrintDialog(arrBlkNames, arrFldNames) {
    screenArgs = new Object();
    var printWindow;
    var printHeader = "";
    var printData;
    //getting printHeader and printData
    if ((gThirdChar).toUpperCase() == "S") {
        return;
        /*printData = getExtPrintSummaryData(arrBlkNames, arrFldNames);*/
    } else if ((gThirdChar).toUpperCase() == "D") {
        printData = getExtPrintDetailData(arrBlkNames, arrFldNames, getCurrentRecord());
    }
    var fldList = "";
    var count = 0;
    var info = "";
    //var cloneArray = arrBlkNames.slice(0);
    var cloneArray = new Array();
    for (var i = 0; i < arrBlkNames.length; i++) {
        cloneArray[i] = arrBlkNames[i];
    }
    for (var blkCnt = cloneArray.length - 1; blkCnt >= 0; --blkCnt) {
        var arrBlkFldNames = arrFldNames[cloneArray[blkCnt]];
        var dbt = cloneArray[blkCnt].split("~")[1];
        if (arrBlkFldNames.length == 0) {
            delete arrBlkNames[arrBlkNames[blkCnt]];
            arrBlkNames.splice(blkCnt, 1);
            continue;
        }
        for (var fldCnt = arrBlkFldNames.length - 1; fldCnt >= 0; --fldCnt) {
            var dbc = arrBlkFldNames[fldCnt];
            if (selectNodes(printData, "//" + dbt).length == 0) {
                delete arrBlkNames[arrBlkNames[blkCnt]];
                arrBlkNames.splice(blkCnt, 1);
                break;
            } else if (selectNodes(printData, "//" + dbt + "/" + dbc + "[@FIELD]").length == 0) {
                arrBlkFldNames.splice(fldCnt, 1);
            }
        }
    }
	screenArgs["printDataDom"] = printData; //Fix for 21215359
    printHeader = getPrintHeader(arrBlkNames, arrFldNames);
    screenArgs["functionId"] = functionId;
    screenArgs["langCode"] = langCode;
    screenArgs["screenHTML"] = printHeader;
    screenArgs["screenTitle"] = screenTitle;
    //Fix for 21215359 starts
	//screenArgs["printData"] = getXMLString(printData);
	screenArgs["printData"] = getXMLString(screenArgs["printDataDom"]);
	//Fix for 21215359 ends
    screenArgs["arrBlkNames"] = arrBlkNames;
    screenArgs["arrFldNames"] = arrFldNames;
    if (screenTitle.indexOf("&") != -1) {
        var re = new RegExp('&', "g");
        screenTitle = screenTitle.replace(re, "and");
    }
    mask();
    loadSubScreenDIV("ChildWin", "Print.jsp?dispTitle=" + screenTitle + "&fromExtensible=yes");
}

function checkItemInArray(arrayObj, value) {
    for (var i = 0; i < arrayObj.length; i++) {
        if (arrayObj[i] == value) {
            return true;
        }
    }
    return false;
}

function fnBuildBlkFields(blkName, blkFldsArray, arrFldNames) {    
    //Fix for 21215359 starts
    var j =0;
    var amountNodes = new Array(); 
    var printData = screenArgs["printDataDom"];
    //Fix for 21215359 ends
    for (var i = 0; i < arrFldNames.length; i++) {
        if (!checkItemInArray(blkFldsArray, arrFldNames[i])) {
            blkFldsArray[blkFldsArray.length] = arrFldNames[i];
            if (typeof (arrFldNames[arrFldNames[i]]) != "undefined") {
                blkFldsArray[arrFldNames[i]] = arrFldNames[arrFldNames[i]];
                //Fix for 21215359 starts
                blkFldsArray["TYPE__" + arrFldNames[i]] = arrFldNames["TYPE__" + arrFldNames[i]];             
                if (arrFldNames["TYPE__" + arrFldNames[i]].split("~")[0] == "AMOUNT") { 
                    if(arrFldNames["TYPE__" + arrFldNames[i]].split("~").length == 1){
                        var amtNodes1 = selectNodes(printData, "//" + arrFldNames[i + "__" + arrFldNames[i]] + "/" + arrFldNames[i]);
						var amtCcyNodeValue1 = mainWin.Lcy;
						var amtNodeValue1 = "";
						for (var k = 0; k < amtNodes1.length; k++) {
							var amtNode1 = amtNodes1[k];
							if (amtNode1 != null) {
								   amtNodeValue1 = getNodeText(amtNode1);
							}
							if (amtNodeValue1 != "" && amtNodeValue1 != undefined && amtCcyNodeValue1 != "" && amtCcyNodeValue1 != undefined) {
								   setNodeText(amtNode1, new MB3Amount(amtNodeValue1, true, amtCcyNodeValue1).getDisplayAmount());     
							}  
						}
					} else {
						amountNodes[j] = arrFldNames[i + "__" + arrFldNames[i]] + "~" + arrFldNames[i] + "~" + arrFldNames["TYPE__" + arrFldNames[i]].split("~")[1];
						j++;
					}
                }                
                if (arrFldNames["TYPE__" + arrFldNames[i]] == "DATE") {                     
                    var dateNodes = selectNodes(printData, "//" + arrFldNames[i+"__"+arrFldNames[i]] + "/" + arrFldNames[i]);
					for (var x = 0; x < dateNodes.length; x++) {
						var dateNode = dateNodes[x];
                        if (dateNode != null && getNodeText(dateNode) != "") {
                            setNodeText(dateNode, fnFormatTimeStampString(getNodeText(dateNode)));     
                    	}
					}                
                }
				if (arrFldNames["TYPE__" + arrFldNames[i]] == "DATETIME") { 
                    var dateTimeNodes = selectNodes(printData, "//" + arrFldNames[i]);
					for (var y = 0; y < dateTimeNodes.length; y++) {
						var dateTimeNode = dateTimeNodes[y];
                        if (getNodeText(dateTimeNode) != "") {
                            setNodeText(dateTimeNode, fnFormatTimeStampString(getNodeText(dateTimeNode)));     
                        }
					}                 
                }
                //Fix for 21215359 ends
            }
        }
    } 
    //Fix for 21215359 starts
    for (var l = 0; l < arrFldNames.length; l++) {
        for (var m = 0; m < amountNodes.length; m++) {
            if (arrFldNames[l] == amountNodes[m].split("~")[2]) {
                amountNodes[m] = amountNodes[m] + "~" + arrFldNames[l+"__"+arrFldNames[l]];
				//34853683 starts
                //var amtCcyNode2 = selectSingleNode(printData, "//" + arrFldNames[l+"__"+arrFldNames[l]] + "/" + amountNodes[m].split("~")[2]);
				//if (amtCcyNode2 == null) amtCcyNode2 = selectSingleNode(printData, "//" + amountNodes[m].split("~")[2]);
				var amtCcyNodes2 = selectNodes(printData,"//" + arrFldNames[l+"__"+arrFldNames[l]]+"/"+amountNodes[m].split("~")[2]);
				if (amtCcyNodes2.length == 0) amtCcyNodes2 = selectNodes(printData, "//" + amountNodes[m].split("~")[2]);
				//34853683 ends
                var amtNodes2 = selectNodes(printData, "//" + amountNodes[m].split("~")[0] + "/" + amountNodes[m].split("~")[1]);				
				if (amtNodes2.length == 0) amtNodes2 = selectNodes(printData, "//" + amountNodes[m].split("~")[1]); 
				for (var n = 0; n < amtNodes2.length; n++) {
					var amtNode2 = amtNodes2[n]; 
					var amtCcyNode2 = amtCcyNodes2[n];//34853683 added
					var amtCcyNodeValue2 = "";
					var amtNodeValue2 = "";
					if (amtCcyNode2 != undefined && amtCcyNode2 != null) {
						amtCcyNodeValue2 = getNodeText(amtCcyNode2);
					} 
					if (amtNode2 != undefined && amtNode2 != null) {//34853683 changed amtCcyNode2 to amtNode2
						amtNodeValue2 = getNodeText(amtNode2);
					}
					if (amtNodeValue2 != "" && amtNodeValue2 != undefined && amtCcyNodeValue2 != "" && amtCcyNodeValue2 != undefined) {
						setNodeText(amtNode2, new MB3Amount(amtNodeValue2, true, amtCcyNodeValue2).getDisplayAmount());     
					}  
				}
            }
        }
    }   
    screenArgs["printDataDom"] = printData;
    //Fix for 21215359 ends
}

/*
 * Bulids and returns the printHeader
 */
function getPrintHeader(arrBlkNames, arrFldNames) {
    var printHeader = "";
    var tempBlkName = "";
    var getLabels = new Array();
    getLabels[0] = mainWin.getItemDesc("LBL_SELECT_ALL");
    getLabels[1] = mainWin.getItemDesc("TTL_PRINT_OPTION");
    getLabels[2] = mainWin.getItemDesc("LBL_PRINT_PREVIEW");
    getLabels[3] = mainWin.getItemDesc("LBL_RECORD_PERPAGE");
    var forBlkCnt = 0;
//REDWOOD_CHANGES
    printHeader += "<div id='TBLPageAll'><div style='padding-left:9px;margin-top:10px'><h4>" + getLabels[1] + "</h4>";
    printHeader += "<oj-checkboxset type=CHECKBOX onclick=fnSelectAll(event)  ><oj-option >" + getLabels[0] + "</oj-option></oj-checkboxset>";//HTML5 Changes 6/OCT/2016 //HTML5 Changes 24/OCT/2016
    printHeader += "<oj-button id=btnPrintView onclick=fnPrintView(); style='float:right;padding-right: 10px;'>" + getLabels[2] + "</oj-button></div>";

   printHeader += "<div class='oj-sm-width-full sectionPanel'><div class='partitionPanel'><div class='oj-flex-item '><div class='oj-flex'> ";
//REDWOOD_CHANGES
    var tmp = new Array();
    var tmpBlkLables = new Array();
    var blkFldValues=[];   //REDWOOD_CHANGES
    var count = 0;
    for (var i = 0; i < arrBlkNames.length; i++) {
        var blkName = arrBlkNames[i].split("~")[1];
        if (!tmp[blkName]) {
            tmp[count++] = blkName;
            tmpBlkLables[blkName] = arrBlkNames[arrBlkNames[i]];
            tmp[blkName] = new Array();
        }
        fnBuildBlkFields(blkName, tmp[blkName], arrFldNames[arrBlkNames[i]]);
    }

    for (var blkCnt = 0; blkCnt < tmp.length; blkCnt++) {
        tempBlkName = tmp[blkCnt];
        if (tmp[tempBlkName].length > 0) {
//REDWOOD_CHANGES
            printHeader += "";
            for (var cnt=0;cnt<tmp.length; cnt++) {                 
                 currentFldOptionsArr[cnt] = {};
                 currentFldOptionsArr[cnt][tmp[cnt]] = [];
            }	   
//REDWOOD_CHANGES
            
            if (forBlkCnt == 0) {
//REDWOOD_CHANGES
                printHeader += "<div class='oj-sm-width-1/4'><oj-form-layout max-columns='2' direction='column' label-edge='start'>";
                printHeader += "<fieldset class='oj-flex-item' id='" + tempBlkName + "'><h4>" + tmpBlkLables[tempBlkName] + "</h4>";
                printHeader += "<oj-checkboxset id='chk-"+tempBlkName+"' type=CHECKBOX value='[["+selectAll+"]]' onclick=fnSelectAllBlkFlds(event,'" + tempBlkName + "',"+blkCnt+") ><oj-option for='chk-"+tempBlkName+"' value='selectall'>" + getLabels[0] + "</oj-option></oj-checkboxset></br>";//HTML5 Changes 6/OCT/2016 //HTML5 Changes 24/OCT/2016
                printHeader += "";	  
//REDWOOD_CHANGES
            }
            if (forBlkCnt != 0 && forBlkCnt % 3 == 0) {
//REDWOOD_CHANGES
                printHeader += "";
                printHeader += "<div class='oj-sm-width-1/4'><fieldset class='oj-flex-item' id='" + tempBlkName + "' ><h4>" + tmpBlkLables[tempBlkName] + "</h4>";
                printHeader += "<oj-checkboxset type=CHECKBOX id='chk-"+tempBlkName+"' value='[["+selectAll+"]]' onclick=fnSelectAllBlkFlds(event,'" + tempBlkName + "',"+blkCnt+") ><oj-option for='chk-"+tempBlkName+"' value='selectall'>" + getLabels[0] + "</oj-option></oj-checkboxset></br>";//HTML5 Changes 6/OCT/2016 //HTML5 Changes 24/OCT/2016
                printHeader += "";	 
//REDWOOD_CHANGES
            }
            if (forBlkCnt != 0 && forBlkCnt % 3 != 0) {
//REDWOOD_CHANGES
                printHeader += "";
                printHeader += "<div class='oj-sm-width-1/4'><fieldset class='oj-flex-item' id='" + tempBlkName + "'><h4>" + tmpBlkLables[tempBlkName] + "</h4>";
                printHeader += "<oj-checkboxset type=CHECKBOX id='chk-"+tempBlkName+"' value='[["+selectAll+"]]' onclick=fnSelectAllBlkFlds(event,'" + tempBlkName + "',"+blkCnt+") ><oj-option for='chk-"+tempBlkName+"' value='selectall'>" + getLabels[0] + "</oj-option></oj-checkboxset></br>";//HTML5 Changes 6/OCT/2016 //HTML5 Changes 24/OCT/2016
                printHeader += "";
            }
            if (tempBlkName) {
                  printHeader += "<oj-checkboxset value='[["+currentFldOptionsArr[blkCnt][tempBlkName]+"]]' name ='headerChk" + tempBlkName + "'>"
//REDWOOD_CHANGES
            }
            for (var fldCnt = 0; fldCnt < tmp[tempBlkName].length; fldCnt++) {
                printHeader += "<oj-option DBC='" + tmp[tempBlkName][fldCnt]+"' value='" + tmp[tempBlkName][tmp[tempBlkName][fldCnt]] + "'>" +tmp[tempBlkName][tmp[tempBlkName][fldCnt]]+ "</oj-option>"//REDWOOD_CHANGES
            }
            printHeader += "</oj-checkboxset>"	  //REDWOOD_CHANGES
            printHeader += "</fieldset></oj-form-layout></div>";   //REDWOOD_CHANGES
            ++forBlkCnt;
        }
//REDWOOD_CHANGES
//        if (blkCnt == tmp.length - 1) {
//            printHeader += "</div>";
//        }
    }
    
    printHeader += "</div></div></div></div>";	
//REDWOOD_CHANGES
    printHeader += "</div>"
    extBlksArray = tmp;
    extBlkLabelsArray = tmpBlkLables;
    return printHeader;
}

/*
 * Bulids and returns the printData for Summary
 */
function getPrintSummaryData(arrBlkNames, arrFldNames) {
    var strXml;
    var tempDBT;
    var tempBlkName;
    var pureXMLDOM;
    var blkNodeList;
    var fldNodeList;
    var arrBlkFldNames = new Array();
    var tblResult = document.getElementById("TBLPageidSummary").getElementsByTagName("TABLE")[0];
    var tblBody = tblResult.tBodies[0];
    var tblRow;

    strXml = "<?xml version='1.0' encoding='UTF-8' ?>";
    strXml += "<root>";
    for (var rowIndex = 0; rowIndex < tblBody.rows.length; rowIndex++) {
        tblRow = tblBody.rows[rowIndex];
        tblFirstCell = tblRow.cells[0].getElementsByTagName("INPUT")[0];
        if (tblFirstCell.checked) {
            pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, rowIndex + 1);
            for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++) {
                tempBlkName = arrBlkNames[blkCnt];
                tempDBT = tempBlkName.substring(tempBlkName.indexOf("~") + 5, tempBlkName.length);
                blkNodeList = selectNodes(pureXMLDOM, "//" + tempDBT);
                arrBlkFldNames = arrFldNames[arrBlkNames[blkCnt]];

                for (var nodeIndex = 0; nodeIndex < blkNodeList.length; nodeIndex++) {
                    blkNodeList[nodeIndex].setAttribute("LABEL", arrBlkNames[arrBlkNames[blkCnt]]);
                    for (var fldCnt = 0; fldCnt < arrBlkFldNames.length; fldCnt++) {
                        fldNodeList = selectNodes(blkNodeList[nodeIndex], "./" + arrBlkFldNames[fldCnt]);
                        for (var innerNodeIndex = 0; innerNodeIndex < fldNodeList.length; innerNodeIndex++) {
                            fldNodeList[innerNodeIndex].setAttribute("LABEL", arrBlkFldNames[arrBlkFldNames[fldCnt]]);
                            fldNodeList[innerNodeIndex].setAttribute("FIELD", 'Y');
                        }
                    }
                }
            }
    //FIX FOR 14754554 Starts
    if (getBrowser().indexOf("OPERA") != -1){//ie11 changes
    var strXml1 = getXMLString(pureXMLDOM);
    if(strXml1.substring(0,21).toLowerCase() == '<?xml version="1.0"?>'){
    strXml += strXml1.substring(21);;
    }
    }
    else{
        strXml += getXMLString(pureXMLDOM);
    }
    //FIX FOR 14754554 Ends
        }
    }
    strXml += "</root>";

    var dataDOM = loadXMLDoc(strXml);
    return dataDOM;
}

function getExtPrintDetailData(arrBlkNames, arrFldNames, pureXMLDOM) {
    var strXml;
    var tempDBT;
    var tempBlkName;
    var blkNodeList;
    var fldNode;
    var arrBlkFldNames = new Array();
    strXml = "<?xml version='1.0' encoding='UTF-8' ?>";
    strXml += "<root>";
    var fldVal;
    var fldRef;
    for (var blkCount = 0; blkCount < arrBlkNames.length; blkCount++) {
        tempDBT = arrBlkNames[blkCount].split("~")[1];
        blkNodeList = selectNodes(pureXMLDOM, "//" + tempDBT);
        arrBlkFldNames = arrFldNames[arrBlkNames[blkCount]];
        for (var nodeIndex = 0; nodeIndex < blkNodeList.length; nodeIndex++) {
			if(blkNodeList[nodeIndex].getAttribute("LABEL") == null) {    //33218235 changes
				blkNodeList[nodeIndex].setAttribute("LABEL", arrBlkNames[arrBlkNames[blkCount]]);
			}	//33218235 changes	   
            for (var fldCnt = 0; fldCnt < arrBlkFldNames.length; fldCnt++) {
                fldNode = selectSingleNode(blkNodeList[nodeIndex], "./" + arrBlkFldNames[fldCnt]);
                if (fldNode != null) {
                    fldNode.setAttribute("LABEL", makeInitCaps(arrBlkFldNames[arrBlkFldNames[fldCnt]]));
                    fldNode.setAttribute("FIELD", 'Y');
                    fldRef = document.getElementById(tempDBT + "__" + arrBlkFldNames[fldCnt]);
                    fldVal = getNodeText(fldNode);
                    if (fldRef != null) {
                        if (fldRef.type) {	 //REDWOOD_CHANGES
                        if ((fldRef.type).toUpperCase() == 'HIDDEN' || (fldRef.type).toUpperCase() == 'BUTTON' || (fldRef.type).toUpperCase() || 'FIELDSET' || (fldRef.type).toUpperCase() == 'LABEL') {
                            continue;
                        }
                    }
                        
                    }  //REDWOOD_CHANGES
                    if (fldRef != null) {
                        if ((fldRef.tagName).toUpperCase() == 'SELECT') {
                            for (var optCnt = 0; optCnt < fldRef.options.length; optCnt++) {
                                if (fldRef.options[optCnt].value == fldVal) {
                                    setNodeText(fldNode, getNodeText(fldRef.options[optCnt]));
                                    break;
                                }
                            }
                        }
                        if ((fldRef.tagName).toUpperCase() == 'INPUT') {
                            if ((fldRef.type).toUpperCase() == 'RADIO') {
                                setNodeText(fldNode, fnHandleRadio(arrBlkFldNames[fldCnt], fldVal, tempBlkName));
                            }
                        }
                    }
                }
            }
        }
    }
    //FIX FOR 14754554 Starts
    if (getBrowser().indexOf("OPERA") != -1){//ie11 changes
    var strXml1 = getXMLString(pureXMLDOM);
    if(strXml1.substring(0,21).toLowerCase() == '<?xml version="1.0"?>'){
    strXml += strXml1.substring(21);;
    }
    }
    else{
        strXml += getXMLString(pureXMLDOM);
    }
    //FIX FOR 14754554 Ends
    strXml += "</root>";
    var dataDOM = loadXMLDoc(strXml);
    return dataDOM;
}

//FCJ 7.2 ITR1 2447 Starts
function makeInitCaps(node) {
    var newNode = "";
    var words = node.split("_");
    if (words.length == 1) {
        return node.charAt(0).toUpperCase() + node.substring(1).toLowerCase();
    } else {
        for (var index = 0; index < words.length; index++) {
            newNode = newNode + words[index].charAt(0).toUpperCase() + words[index].substring(1).toLowerCase() + " ";
        }
        return newNode;
    }
}
//FCJ 7.2 ITR1 2447 Ends
/*
 * Bulids and returns the printData for Detail
 */
function getPrintDetailData(arrBlkNames, arrFldNames, pureXMLDOM) {
    var strXml;
    var tempDBT;
    var tempBlkName;
    var pureXMLDOM;
    var blkNodeList;
    var fldNodeList;
    var arrBlkFldNames = new Array();
    strXml = "<?xml version='1.0' encoding='UTF-8' ?>";
    strXml += "<root>";
    var fldVal;
    var fldRef;
    var blkRefNode;
    var blkRefNode = selectNodes(gXmlDoc, "//BLOCK[@SCREEN !='SUMMARY' and (@TYPE = '" + gSingleE + "' or @TYPE = '" + gMulitE + "') and ID != 'BLK_STD_BUTTONS_IMG']");
    for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++) {
        tempBlkName = arrBlkNames[blkCnt];
        var blkType = blkRefNode[blkCnt].getAttribute("TYPE");
        if (blkType == "Single Entry") {
            if (selectSingleNode(blkRefNode[blkCnt], "DATASRC")) tempDBT = getNodeText(selectSingleNode(blkRefNode[blkCnt], "DATASRC"));
        } else if (blkType == "Multiple Entry") {
            if (selectSingleNode(blkRefNode[blkCnt], "DBT")) tempDBT = getNodeText(selectSingleNode(blkRefNode[blkCnt], "DBT"));
        } else {
            tempDBT = tempBlkName.substring(tempBlkName.indexOf("~") + 5, tempBlkName.length);
        }

        blkNodeList = selectNodes(pureXMLDOM, "//" + tempDBT);
        arrBlkFldNames = arrFldNames[arrBlkNames[blkCnt]];
        for (var nodeIndex = 0; nodeIndex < blkNodeList.length; nodeIndex++) {
            blkNodeList[nodeIndex].setAttribute("LABEL", arrBlkNames[arrBlkNames[blkCnt]]);
            for (var fldCnt = 0; fldCnt < arrBlkFldNames.length; fldCnt++) {
                fldNodeList = selectNodes(blkNodeList[nodeIndex], "./" + arrBlkFldNames[fldCnt]);

                for (var innerNodeIndex = 0; innerNodeIndex < fldNodeList.length; innerNodeIndex++) {
                    fldNodeList[innerNodeIndex].setAttribute("LABEL", makeInitCaps(arrBlkFldNames[arrBlkFldNames[fldCnt]]));
                    fldNodeList[innerNodeIndex].setAttribute("FIELD", 'Y');
                    fldRef = document.getElementById(tempDBT + "__" + arrBlkFldNames[fldCnt]);
                    fldVal = getNodeText(fldNodeList[innerNodeIndex]);
                    if (fldRef != null) {
                        if ((fldRef.type).toUpperCase() == 'HIDDEN' || (fldRef.type).toUpperCase() == 'BUTTON' || (fldRef.type).toUpperCase() || 'FIELDSET' || (fldRef.type).toUpperCase() == 'LABEL') continue;
                    }
                    if (fldRef != null) {
                        if ((fldRef.tagName).toUpperCase() == 'SELECT') {
                            for (var optCnt = 0; optCnt < fldRef.options.length; optCnt++) {
                                if (fldRef.options[optCnt].value == fldVal) {
                                    setNodeText(fldNodeList[innerNodeIndex], getNodeText(fldRef.options[optCnt]));
                                    break;
                                }
                            }
                        }

                        if ((fldRef.tagName).toUpperCase() == 'INPUT') {
                            if ((fldRef.type).toUpperCase() == 'RADIO') {
                                setNodeText(fldNodeList[innerNodeIndex], fnHandleRadio(arrBlkFldNames[fldCnt], fldVal, tempBlkName));
                            }
                        }
                    }
                }
            }
        }
    }
    //FIX FOR 14754554 Starts
    if (getBrowser().indexOf("OPERA") != -1){//ie11 changes
    var strXml1 = getXMLString(pureXMLDOM);
    if(strXml1.substring(0,21).toLowerCase() == '<?xml version="1.0"?>'){
    strXml += strXml1.substring(21);;
    }
    }
    else{
        strXml += getXMLString(pureXMLDOM);
    }
    //FIX FOR 14754554 Ends
    strXml += "</root>";
    var dataDOM = loadXMLDoc(strXml);
    return dataDOM;
}
/*
 * Function to Handle radio Button
 */
function fnHandleRadio(fldName, val, blkId) {
    var optionLink = selectSingleNode(gXmlDoc, "//BLOCK[ID='" + blkId + "']/FIELD[NAME = '" + fldName + "' and VALUE ='" + val + "']/OPTION_LINK");
    if (optionLink != null) {
        return getLabelFromLink(optionLink.text, blkId);
    } else {
        return val;
    }
}

/*
 * function called when Screen is Loading
 */
function fnPrnLoad() {
    document.getElementById("DIVMainTmp").innerHTML = parent.screenArgs["screenHTML"];
}

/* 
 * function to print the value
 */

function fnPrintValue() {
    try {
        var oIframe = parent.document.getElementById("Div_ChildWin").children[0].children[0];
        var oContent = document.getElementById("PrintScr").innerHTML;
        var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
        if (oDoc.document) oDoc = oDoc.document;
        oDoc.write("<html style=\"overflow-y:scroll\"><head><link href=\"Theme/Ext" + strTheme + "\" rel=\"stylesheet\" type=\"text/css\"/><link href=\"Theme/Ext" + langISO + ".css\" rel=\"stylesheet\" type=\"text/css\"/><link href=\"Theme/Ext" + browserCSS + "\" rel=\"stylesheet\" type=\"text/css\"/>");
//REDWOOD_CHANGES
        oDoc.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"Script/OJET/css/libs/oj/v15.1.0/redwood/oj-redwood-min.css\">");
        oDoc.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css\">");
        oDoc.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"Script/css/OracleFont.css\">");
        oDoc.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"Script/css/_css-variable.css\">");
        oDoc.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"Script/css/jet11-override.css\">");
//REDWOOD_CHANGES
        var scriptStr = "<script type='text/javascript'> var parentScrID='" + parentScrID + "'; var launcherDIVWidth='" + launcherDIVWidth + "'; var launcherIFWidth='" + launcherIFWidth + "'; var launcherDIVHeight='" + launcherDIVHeight + "'; var launcherIFHeight='" + launcherIFHeight + "'; var launcherLeft='" + launcherLeft + "'; var launcherResTreeWidth=''; var launcherResTreeHeight=''; var launcherHeaderWidth='" + launcherHeaderWidth + "'; function fnExitPrint(e){  parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);} function printContent(bodyobj) { bodyobj.focus();bodyobj.print();document.getElementById('btndiv').style.display='';}</script>";
        oDoc.write(scriptStr);
        oDoc.write("</head><body onload='printContent(this)'><div id='btndiv' style='display:none'><button onclick='fnExitPrint(event)'>Exit</button></div>");
        oDoc.write(oContent + "</body></html>");
        oDoc.close();
    } catch (e) {
        self.print();
    }
}

/*
 * Function to select Block specific fields
 */

function fnSelectAll(evnt) {
    extBlksArray = parent.extBlksArray;
    for (var i = 0; i < extBlksArray.length; i++) {
        if (document.getElementsByName("headerChk" + extBlksArray[i]) && document.getElementsByName("headerChk" + extBlksArray[i]).length > 0) {
            fnSelectAllBlkFlds(evnt, extBlksArray[i], i);  //REDWOOD_CHANGES
        }
    }
}

function fnSelectAllBlkFlds(evnt, blkName, idx) { //REDWOOD_CHANGES
    var checkAll; //REDWOOD_CHANGES
    var e = window.event || evnt;
    var srcEle = getEventSourceElement(e);
//REDWOOD_CHANGES
    if (srcEle && ((srcEle.type && srcEle.type.toUpperCase() == "CHECKBOX") || srcEle.getAttribute('type') == 'CHECKBOX')) {
    if (evnt.target.tagName !== 'OJ-OPTION') {
    
        if (srcEle.checked || evnt.srcElement.checked) {
  //REDWOOD_CHANGES      
            checkAll = true;
//REDWOOD_CHANGES
        if (document.getElementById(blkName).getElementsByTagName('oj-checkboxset')[0]) {
            document.getElementById(blkName).getElementsByTagName('oj-checkboxset')[0].value=['selectall'];
            }		
//REDWOOD_CHANGES
        } else {
            checkAll = false;
//REDWOOD_CHANGES
        if (document.getElementById(blkName).getElementsByTagName('oj-checkboxset')[0]) {
            document.getElementById(blkName).getElementsByTagName('oj-checkboxset')[0].value=[];
            }            
        }
    
    }  
          
    }
    
    var noElements = document.getElementsByName("headerChk" + blkName)[0].getElementsByTagName('oj-option').length;
//REDWOOD_CHANGES
    for (var i = 0; i < noElements; i++) {
        if (checkAll) {
    //REDWOOD_CHANGES        
       currentFldOptionsArr[idx][blkName].push(document.getElementsByName("headerChk" + blkName)[0].getElementsByTagName('oj-option')[i].value);
            removeDuplicatesFromArr(currentFldOptionsArr[idx][blkName]);
            document.getElementsByName("headerChk" + blkName)[0].value = currentFldOptionsArr[idx][blkName];
//REDWOOD_CHANGES
            
        } else {
//REDWOOD_CHANGES
            document.getElementsByName("headerChk" + blkName)[0].value = [];
            break;
        }
        }
    
    document.getElementsByName("headerChk" + blkName)[0].refresh();
    
    
    }

function removeDuplicatesFromArr(arr) {
    return arr.filter(function(item, pos) {
        return arr.indexOf(item) == pos;
});	
//REDWOOD_CHANGES
}

/*
 * Validates the fields selection
 */
function fnValidateSelection(dataDOM) {
    var isMinOneFldSelected = false;
    var blockNodeList;
    var currBlkItem;
    var fldNodesLen;
    var cldFldNodesLen;
    var canPrint = true;
    extBlksArray = parent.extBlksArray;
    for (var blkCnt = 0; blkCnt < extBlksArray.length; blkCnt++) {
        var blkName = extBlksArray[blkCnt];
        checkBoxRefs = document.getElementsByName("headerChk" + blkName)[0].getElementsByTagName('oj-option'); //REDWOOD_CHANGES
       // isMinOneFldSelected = checkBoxRefs.length > 0; //REDWOOD_CHANGES //REDWOOD_35239542 Commented
        for (var checkCnt = 0; checkCnt < checkBoxRefs.length; checkCnt++) {
            checkBoxRef = checkBoxRefs[checkCnt];
            if (!document.getElementsByName("headerChk" + blkName)[0].getElementsByTagName('input')[checkCnt].checked) { //REDWOOD_CHANGES
                tempDBC = checkBoxRef.getAttribute("DBC");
                var removeNode = selectNodes(dataDOM, "//" + blkName + "/" + tempDBC);
                for (var i = 0; i < removeNode.length; i++) {
                    removeNode[i].parentNode.removeChild(removeNode[i]);
                }
            } else {
                isMinOneFldSelected = true;
            }
        }
    }
    if (isMinOneFldSelected) {
        for (var blkCnt = 0; blkCnt < extBlksArray.length; blkCnt++) {
            blockNodeList = selectNodes(dataDOM, "//" + extBlksArray[blkCnt]);
            currBlkItem = blockNodeList[0];

            if (currBlkItem != null) {
                fldNodesLen = selectNodes(currBlkItem, "*[@FIELD]").length;
                cldFldNodesLen = selectNodes(currBlkItem, "*[@Type]/*[@FIELD]").length;
                if ((fldNodesLen <= 0) && (cldFldNodesLen > 0)) {
                    mask();
                    //showAlerts(fnBuildAlertXML('ST-COM028', 'E'), 'E');//redwood_35239542
					mainWin.showAlerts(fnBuildAlertXML('ST-COM028', 'E'), 'E'); //redwood_35239542
                    canPrint = false;
                    break;
                }
            }
        }
    } else {
        mask();
        //showAlerts(fnBuildAlertXML('ST-COM029', 'E'), 'E'); //redwood_35239542
		mainWin.showAlerts(fnBuildAlertXML('ST-COM029', 'E'), 'E'); //redwood_35239542
        canPrint = false;
    }
    return canPrint;
}
/* 
 * Function to remove block which have no fields
 */
/* Extensible Preview */



function fnRemoveBlankExtBlksFields(blkNode) {

    var childNodesList = blkNode.childNodes;
    var totalFldNodesLength = childNodesList.length - selectNodes(blkNode, "*[@Type]").length;
    if (totalFldNodesLength != selectNodes(blkNode, "*[@FIELD]").length) {
        for (var i = childNodesList.length - 1; i >= 0; i--) {
            if (!childNodesList[i].getAttribute("FIELD") && !childNodesList[i].getAttribute("Type")) {
                childNodesList[i].parentNode.removeChild(childNodesList[i]);
            }
        }
    }

    for (var j = 0; j < selectNodes(blkNode, "*[@Type]").length; j++) {
        fnRemoveBlankExtBlksFields(selectNodes(blkNode, "*[@Type]")[j]);
    }
}




/*
 * function which builds print view.
 */
function fnPrintView() {

    var dataDOM = loadXMLDoc(parent.screenArgs["printData"]);
    var html;
    var canPrint = false;

    if (dataDOM) {
        canPrint = fnValidateSelection(dataDOM);

        if (canPrint) {
            fnRemoveBlankExtBlksFields(selectSingleNode(dataDOM, "//root").childNodes[0]);

            var blkNodes = selectNodes(dataDOM, "//*[@Type]");
            for (var j = blkNodes.length - 1; j >= 0; j--) {
                if (blkNodes[j].childNodes.length == 0) {
                    blkNodes[j].parentNode.removeChild(blkNodes[j]);
                }
            }
            html = printTransform(dataDOM);
            document.getElementById("DIVMainTmp").innerHTML = "";

            if (getBrowser().indexOf("IE") != -1) {//ie11 changes
                document.getElementById("DIVMainTmp").insertAdjacentHTML("afterBegin", html);
            } else {
                document.getElementById("DIVMainTmp").appendChild(html);
            }
            html = document.getElementById("DIVMainTmp").innerHTML;
            document.getElementById("DIVMainTmp").innerHTML = html;
//REDWOOD_CHANGES
            parent.screenKo.cleanNode(document.getElementById("DIVMainTmp"));
            parent.screenKo.applyBindings( {},document.getElementById("DIVMainTmp"));
//REDWOOD_CHANGES
        } else {
            return;
        }
    }
}
/*
 * function to transform xmlDoc to html
 */
function printTransform(xmlDOC) {

    var param = new Array();
    param["lblPrint"] = mainWin.getItemDesc("LBL_PRINT");
    param["lblPrintPreview"] = mainWin.getItemDesc("LBL_PRINT_PREVIEW");
    param["screenWidth"] = mainWin.scrWidth;  //REDWOOD_CHANGES

    var xslDoc = loadXSLFile("Templates/XSL/Print.xsl");
    var html = transform(xmlDOC, xslDoc, param);
    return html;
}

/* 
 * Performs pageing
 */
function fnPageRecords() {
    pageNum = 1;
    spanid = document.getElementsByName("pID")[0].value;
    var flag = true;
    var obj;
    cnt = numRecs + 1;
    while (flag) {
        obj = document.getElementById(spanid + cnt);
        cnt = cnt + 1;
        if (obj == null) {
            flag = false;
        } else {
            obj.style.display = "none";
        }
    }
    totRecs = cnt - 2;
    var totNotRound = totRecs / numRecs;
    totPages = Math.round(totRecs / numRecs);
    if ((totNotRound - totPages) > 0) {
        totPages++;
    }

}

/* 
 * Funtion to get previous record
 */
function fnMovePrev() {
    if (pageNum == 1) {
        appendErrorCode('ST-COM030', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
    } else {
        pageNum--;
        for (var i = ((pageNum * numRecs) + 1); i <= ((pageNum * numRecs) + numRecs); i++) {
            if (document.getElementById(spanid + i) != null) document.getElementById(spanid + i).style.display = "none";
        }
        for (var i = ((pageNum - 1) * numRecs) + 1; i <= ((pageNum - 1) * numRecs) + numRecs; i++) {
            document.getElementById(spanid + i).style.display = "block";
        }

    }
    document.getElementById("Cnt").value = pageNum + " of " + totPages;
}

/* 
 * Funtion to get Last record
 */
function fnMoveLast() {
    var pageCnt = pageNum;
    if (pageCnt == totPages) {
        appendErrorCode('ST-COM031', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
        return;
    }
    while (pageCnt < totPages) {
        fnMoveNext();
        pageCnt++;
    }
    document.getElementById("Cnt").value = pageNum + " of " + totPages;
}

/* 
 * Funtion to get First record
 */
function fnMoveFirst() {
    var pageCnt = pageNum;
    if (pageCnt == 1) {
        appendErrorCode('ST-COM030', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
        return;
    }
    while (pageCnt > 1) {
        fnMovePrev();
        pageCnt--;
    }
    document.getElementById("Cnt").value = pageNum + " of " + totPages;
}

/* 
 * Funtion to get Next record
 */
function fnMoveNext() {
    if (pageNum == totPages) {
        appendErrorCode('ST-COM031', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
    } else {
        for (var i = 1; i <= (pageNum * numRecs); i++) {
            document.getElementById(spanid + i).style.display = "none";
        }
        for (var i = ((pageNum * numRecs) + 1); i <= ((pageNum * numRecs) + numRecs); i++) {
            if (document.getElementById(spanid + i) != null) document.getElementById(spanid + i).style.display = "block";
        }
        pageNum++;

    }
    document.getElementById("Cnt").value = pageNum + " of " + totPages;
}

//---- End of Navigation functions
/*
 * function to toggle between expanded and collapsed view
 */
function toggle(branch) {
    var objBranch = document.getElementById(branch).style;
    if (objBranch.display == "") {
        objBranch.display = "block";
    }
    if (objBranch.display == "block") objBranch.display = "none";
    else objBranch.display = "block";

}
/*
 * toggleImage between plus and minus
 */
function toggleImage(img) {
    var objImg = document.getElementById(img);
    if (objImg.src.indexOf('Images/closed.gif') > -1) objImg.src = openImg.src;
    else objImg.src = closedImg.src;

}

function fnExitPrint(e) {
    parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
}

function fnCloseAlertWin(evnt) {
    unmask();
}

//Fix for 21625170 start
function prepareFLDForPrint() {
  var fldStartIndex1 = msgxml.indexOf("<FLD");
      var fldEndIndex1 = msgxml.indexOf("</FLD>");
      msgxml_fld = msgxml.substring(fldStartIndex1, fldEndIndex1);
      msgxml_fld = msgxml_fld + "</FLD>";
      dbFCJDOMPrint = loadXMLDoc(msgxml_fld);
}//Fix for 21625170 end