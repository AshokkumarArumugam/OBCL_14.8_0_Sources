/*----------------------------------------------------------------------------------------------------
**
** File Name    : Print.js
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

Copyright © 2009-2014  by Oracle Financial Services Software Limited..

**  Changed By      : Jessey Paul
**  Modified on     : 21-Sep-2016
**  Change Desc     : Fix released to fix the issue pertaining to Print option. .
**  Search string   : 12.2_SUPPORT_RETRO_23657009 

**    Changed By         : Indirakumari C
**    Changed On         : 06-Oct-2022
**    Modified Reason    : While displaying print screen, fix added to fetch respective type, related
                           currency field for amount fields and type for date and timestamp fields 
**    Retro string       : bug_34135792
**    Search string      : Bug_34673736
----------------------------------------------------------------------------------------------------
*/

/* SFR HISTORY
//
// SFR NO :- FCJ 7.2 ITR1 2447
//
*/
isPrintLoaded = true;
var gThirdChar;
var gErrCodes = "";
var gXmlDoc;
var gMulitE = 'Multiple Entry';
var gSingleE = 'Single Entry';
var screenType;
var nonExtBlksArray;
var nonExtBlkLabelsArray;

//var functionId;
/*
 * Validate Detail screen before print
 */
function canPrintDetail()
{
    var canPrint = true;
    //Have to code
    if (getXMLString(dbDataDOM) == "")
    {
        appendErrorCode('ST-COM027', null);
        canPrint = false;
    }
    return canPrint;
}

/*
 * Validate Summary screen before print
 */
function canPrintSummary()
{
    var canPrint = false;
    if (getXMLString(dbDataDOM) == "")
    {
        canPrint = false;
    } else
    {
        var tblResult = document.getElementById("TBLPageidSummary").getElementsByTagName("TABLE")[0];
        var tblRow = tblResult.tBodies[0].rows;
        var tblFirstCell;
        if (tblRow.length != 0)
        {
            for (var rowCnt = 0; rowCnt < tblRow.length; rowCnt++)
            {
                tblFirstCell = tblRow[rowCnt].cells[0].getElementsByTagName("INPUT")[0];
                if (tblFirstCell.checked)
                {
                    canPrint = true;
                }
            }
        }
    }
    if (!canPrint)
    {
        appendErrorCode('ST-COM027', null);
    }
    return canPrint;
}

/*
 * Prints Selected row values in summary
 */
function fnPrint()
{
    showToolbar("", "", "");
    var canPrint = true;
    var fileName;
    var arrBlkNames = new Array();
    var arrFldNames = new Array();

    gThirdChar = functionId.substring(2, 3);

    //Validating summary or detail screen before printing
    if ((gThirdChar).toUpperCase() == "S")
    {
        canPrint = canPrintSummary();
    } else
    {
        canPrint = canPrintDetail();
    }
    if (canPrint)
    {
        fnGetLabelsFromXML(functionId, arrBlkNames, arrFldNames, langCode);
        //function call to build print dialog
        buildPrintDialog(arrBlkNames, arrFldNames);
    } else
    {
        message = buildMessage(gErrCodes);
        alertMessage(message);
    }
    gAction = "";
}

// Made a new function so that it can be called from authorize function too
// Aakriti 29th June 2005
/*
 * Function to get block and field Lables for given functionId from UIXml.
 */
function fnGetLabelsFromXML(functionId, arrBlkNames, arrFldNames, langCode)
{
    var fileName;
    var canPrint = true;
    //Getting Labels from Eng specific XML of current functionId     
    //fileName = functionId.substring(2, 0) + "D" + functionId.substring(3, functionId.length);
    //12.2_SUPPORT_RETRO_23657009 starts
	if (typeof(detailFuncId) != "undefined") {
		fileName = mainWin.UIXmlPath + langCode + detailFuncId + ".xml";
	} else {
        fileName = mainWin.UIXmlPath + langCode + functionId.substring(2, 0) + "D" + functionId.substring(3, functionId.length) + ".xml"; //Fix for 24672761
	}
	//12.2_SUPPORT_RETRO_23657009 ends
    gXmlDoc = loadXMLFile(fileName);

    var arrBlkFldNames = new Array();
    var blkNodeListRef;
    var tempArrLen = 0;
    var tempblkId;
    var finalBlkId;
    var lblRef;
    //var blkNodeList = gXmlDoc.selectNodes("//BLOCK[@SCREEN !='SUMMARY' and (@TYPE = '" + gSingleE + "' or @TYPE = '" + gMulitE + "')]");

    //FCUBS10ITR1 -- SFR 649 START-- When copying record using ALT+A+C, "c" is defaulted pk field.
    var blkNodeList = selectNodes(gXmlDoc, "//BLOCK[@SCREEN !='SUMMARY' and (@TYPE = '" + gSingleE + "' or @TYPE = '" + gMulitE + "') and ID != 'BLK_STD_BUTTONS_IMG']");
    //FCUBS10ITR1 -- SFR 649 START-- When copying record using ALT+A+C, "c" is defaulted pk field.

    for (var blkCnt = 0; blkCnt < blkNodeList.length; blkCnt++)
    {
        blkNodeListRef = blkNodeList[blkCnt];
        var type = blkNodeListRef.getAttribute("TYPE");
        if (type == "Single Entry")
        {
            if (selectSingleNode(blkNodeListRef, "DATASRC")) var dbt = getNodeText(selectSingleNode(blkNodeListRef, "DATASRC"));
        } else if (type == "Multiple Entry")
        {
            if (selectSingleNode(blkNodeListRef, "DBT")) var dbt = getNodeText(selectSingleNode(blkNodeListRef, "DBT"));
        }
        tempBlkId = getNodeText(selectSingleNode(blkNodeListRef, "ID"));
        blkScreenName = blkNodeListRef.getAttribute("SCREEN");
        finalBlkId = blkScreenName + "~" + tempBlkId;
        arrBlkNames[blkCnt] = finalBlkId;
        lblRef = selectSingleNode(blkNodeListRef, "LABEL");
        arrBlkNames[finalBlkId] = finalBlkId;
        if (lblRef != null) {
            if (getNodeText(selectSingleNode(blkNodeListRef, "LABEL")) == "") {
                var label = "";
                if (arrBlkNames[finalBlkId].split("~")[1].indexOf("BLK") != -1) {
                    label = makeInitCaps(arrBlkNames[finalBlkId].split("~")[1].substring("4"));
                    arrBlkNames[finalBlkId] = label;
                } else {
                    label = makeInitCaps(arrBlkNames[finalBlkId].split("~")[1]);
                    arrBlkNames[finalBlkId] = label;
                }
            } else {
            arrBlkNames[finalBlkId] = getNodeText(selectSingleNode(blkNodeListRef, "LABEL"));
        }
        }
        //getting Array of field names specific to blocks
        //debugger;
        arrFldNames[finalBlkId] = getFldNames(blkNodeListRef);
    }
    //function call to includeAudit Labels
    arrFldNames = includeAuditLbls(arrBlkNames, arrFldNames);
    return canPrint;
}

/*
 * Function to get the FieldNames
 */
function getFldNames(blkNodeListRef)
{
    var dbc;
    var name;
    var label;
    var tempLabel;
    var labellink;
    var fldNodeListRef = selectNodes(blkNodeListRef, ".//FIELD");
    var type = blkNodeListRef.getAttribute("TYPE");
    if (type == "Single Entry")
    {
        if (selectSingleNode(blkNodeListRef, "DATASRC")) var dbt = getNodeText(selectSingleNode(blkNodeListRef, "DATASRC"));
    } else if (type == "Multiple Entry")
    {
        if (selectSingleNode(blkNodeListRef, "DBT")) var dbt = getNodeText(selectSingleNode(blkNodeListRef, "DBT"));
    }
    var blkId = getNodeText(selectSingleNode(blkNodeListRef, "ID"));
    var masterTbl;
    var fldRef;

    var view = blkNodeListRef.getAttribute("VIEW");
    var arrFldNames = new Array();
    var gFldCnt = 0;
    var fldType;
	var relatedField; //Fix for Bug_34673736									 
    for (var fldCnt = 0; fldCnt < fldNodeListRef.length; fldCnt++)
    {
        fldRef = fldNodeListRef[fldCnt];
        fldName = selectSingleNode(fldRef, "NAME");
        dbc = selectSingleNode(fldRef, "DBC");
        if (dbc != null) tempDbc = getNodeText(dbc);
        label = selectSingleNode(fldRef, "LABEL");
        labelLink = selectSingleNode(fldRef, "LABEL_LINK");
        fldType = selectSingleNode(fldRef, "TYPE");
		relatedField = selectSingleNode(fldRef, "RELATED_FIELD"); //Fix for Bug_34673736 
        dbt = selectSingleNode(fldRef, "DBT") ? selectSingleNode(fldRef, "DBT") : selectSingleNode(blkNodeListRef, "DBT");
        if (getNodeText(fldType) != "HIDDEN" && getNodeText(fldType) != "BUTTON" && getNodeText(fldType) != "FIELDSET" && getNodeText(fldType) != "LABEL")
        {
            if (type == gMulitE)
            {
/* change for bug id 14640667 for print issue added condition for parent.fcjResponseDOM*/
                if (parent != null && typeof(parent.fcjResponseDOM) != 'undefined')//#14848341 changes
                {
				/*BUG 16407732 fixes starts*/
                    if (selectSingleNode(parent.fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT") == null) break;
                    masterTbl = getNodeText(selectSingleNode(parent.fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT"));
                } else
                {
                     //Fix for 22070554 starts
					if (selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT") != null) //  //Fix for 22070554
                    {
                        masterTbl = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@TYPE='" + getNodeText(dbt) + "']/@PARENT"));  /*BUG 16407732 fixes ends*/ 
                        //break;
                    }
					//Fix for 22070554 ends
                }
            }
            if (dbc != null && type == gMulitE && (label != null || labelLink != null))
            {
                if (!fnIsInMaster(getNodeText(dbc), masterTbl, dbt))
                {
                    if (getNodeText(label) != "")
                    {
                        if (arrFldNames[getNodeText(dbc)] == null)
                        {
                            if (dbt != null) {
                                arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                arrFldNames[gFldCnt++] = getNodeText(dbc);
                                arrFldNames[getNodeText(dbc)] = getNodeText(label);
								//Fix for Bug_34673736 starts
								if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
                                } else {
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
                                } 
								//Fix for Bug_34673736 ends																  
                            }
                        }
                    } else
                    {
                        if (arrFldNames[getNodeText(dbc)] == null)
                        {
                            if (dbt != null) {
                                arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                arrFldNames[gFldCnt++] = getNodeText(dbc);
                                arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
								//Fix for Bug_34673736 starts
								if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
                                } else {
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
                                } 
								//Fix for Bug_34673736 ends																  
                            }
                        }
                    }
                }
            } else if (dbc != null && label != null && type == gSingleE)
            {
                if (getNodeText(label) != "")
                {
                    if (arrFldNames[getNodeText(dbc)] == null)
                    {
                        if (dbt != null) {
                            arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                            arrFldNames[gFldCnt++] = getNodeText(dbc);
                            arrFldNames[getNodeText(dbc)] = getNodeText(label);
							//Fix for Bug_34673736 starts
							if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
							} else {
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
							} 
							//Fix for Bug_34673736 ends														  
                        }
                    }
                } else
                {
                    if (arrFldNames[getNodeText(dbc)] == null)
                    {
                        if (dbt != null) {
                            arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                            arrFldNames[gFldCnt++] = getNodeText(dbc);
                            arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
							//Fix for Bug_34673736 starts
							if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
							} else {
								arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
							} 
							//Fix for Bug_34673736 ends			
                        }
                    }
                }
            } else
            {
                if (dbc != null)
                {
                    if (type == gMulitE)
                    {
                        if (!fnIsInMaster(getNodeText(fldName), masterTbl, dbt))
                        {
                            if (arrFldNames[getNodeText(dbc)] == null)
                            {
                                if (dbt != null) {
                                    arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                    arrFldNames[gFldCnt++] = getNodeText(dbc);
                                    arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
									//Fix for Bug_34673736 starts
									if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
										arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
									} else {
										arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
									} 
									//Fix for Bug_34673736 ends	
								}
                            }
                        }
                    } else
                    {
                        if (arrFldNames[getNodeText(dbc)] == null)
                        {
                            if (dbt != null) {
                                arrFldNames[gFldCnt + '__' + tempDbc] = getNodeText(dbt);
                                arrFldNames[gFldCnt++] = getNodeText(dbc);
                                arrFldNames[getNodeText(dbc)] = getNodeText(dbc);
								//Fix for Bug_34673736 starts
								if (getNodeText(fldType) == "AMOUNT" && relatedField) { 
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType) + "~" + getNodeText(relatedField); 
                                } else {
                                    arrFldNames["TYPE__" + getNodeText(dbc)] = getNodeText(fldType); 
                                } 
								//Fix for Bug_34673736 ends					
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
function fnIsInMaster(fieldName, tableName, dbt)
{
    var blkId = "BLK_" + tableName;
    //var dbt = gXmlDoc.selectSingleNode("//BLOCK[ID ='"+blkId+"']/DBT");
    var isInMaster;
    if (dbt == null)
    {
        isInMaster = selectSingleNode(gXmlDoc, "//BLOCK[ID ='" + blkId + "']/FIELD[DBC = '" + getNodeText(fieldName) + "' and DBT ='" + tableName + "']");
    } else
    {
        isInMaster = selectSingleNode(gXmlDoc, "//BLOCK[ID ='" + blkId + "' and DBT ='" + tableName + "']/FIELD[DBC = '" + getNodeText(fieldName) + "']");
    }
    if (isInMaster == null)
    {
        return false;
    } else
    {
        return true;
    }
}

/*
 * Function to get the lable using the given labellink
 */
function getLabelFromLink(labelLink, blkId)
{
    var label = selectSingleNode(gXmlDoc, "//BLOCK[ID = '" + blkId + "']/FIELD[NAME ='" + labelLink + "']/LABEL");
    if (label != null)
    {
        label = getNodeText(label);
    } else
    {
        label = "";
    }
    return label;
}

/*
 * Includes AuditLbls in arrFldNames
 */
function includeAuditLbls(arrBlkNames, arrFldNames)
{
    //Include audit labels with fields of master block 
    var arrBlkFldNames = new Array();
    var masterBlkName;
    var masterBlkNodeList = selectSingleNode(gXmlDoc, "//BLOCK[@TYPE = 'Audit Entry']");
    if (masterBlkNodeList != null)
    {
        masterBlkScrName = masterBlkNodeList.getAttribute("SCREEN");
        masterBlkName = "BLK_" + getNodeText(selectSingleNode(masterBlkNodeList, "DBT"));
        masterDbt = getNodeText(selectSingleNode(masterBlkNodeList, "DBT"));
    } else
    {
        return;
    }
    var finalMasterBlkName = masterBlkScrName + "~" + masterBlkName;
    if (screenType == 'M')
    {
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
    if (screenType == 'O')
    {
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
    for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++)
    {
        tempBlkId = arrBlkNames[blkCnt];
        if (finalMasterBlkName == tempBlkId)
        {
            arrBlkFldNames = arrFldNames[tempBlkId];
            tempArrLen = arrBlkFldNames.length;
            for (var auditCnt = 0; auditCnt < auditFldIds.length; auditCnt++)
            {
                arrBlkFldNames[tempArrLen + '__' + auditFldIds[auditCnt]] = masterDbt;
                arrBlkFldNames[tempArrLen] = auditFldIds[auditCnt];
                arrBlkFldNames[arrBlkFldNames[tempArrLen]] = auditFldLbls[auditCnt];
				//Fix for Bug_34673736 starts
				if (auditFldIds[auditCnt].indexOf("STAMP") > -1) {
					arrBlkFldNames["TYPE__" + auditFldIds[auditCnt]] = "DATETIME"; 
				}
				//Fix for Bug_34673736 ends	   
                tempArrLen++;
            }
        }
    }
    return arrFldNames;
}

/*
 * Builds Print Dialog
 */
function buildPrintDialog(arrBlkNames, arrFldNames)
{
    //var dlgArgScreenHTML = new Object();
    screenArgs = new Object();
    var printWindow;
    var printHeader = "";
    var printData;
    //getting printHeader and printData
    //printHeader = getPrintHeader(arrBlkNames, arrFldNames);
    if ((gThirdChar).toUpperCase() == "S") {
        printData = getPrintSummaryData(arrBlkNames, arrFldNames);
    } else if ((gThirdChar).toUpperCase() == "D") {
        printData = getPrintDetailData(arrBlkNames, arrFldNames, getCurrentRecord());

    }
    var cloneArray = arrBlkNames.slice(0);
    for (var blkCnt = cloneArray.length-1; blkCnt >= 0 ; --blkCnt) {
        var arrBlkFldNames = arrFldNames[cloneArray[blkCnt]];
        if (arrBlkFldNames.length == 0) {
            delete arrBlkNames[arrBlkNames[blkCnt]];
            arrBlkNames.splice(blkCnt,1);
        }
        for (var fldCnt=arrBlkFldNames.length-1; fldCnt>=0; --fldCnt) {
            var dbt = arrBlkFldNames[fldCnt + '__' + arrBlkFldNames[fldCnt]];
            var dbc = arrBlkFldNames[fldCnt];
            if (selectNodes(printData, "//" + dbt).length == 0) {
                delete arrBlkNames[arrBlkNames[blkCnt]];
                arrBlkNames.splice(blkCnt,1);
                break;
            } else {
                if (selectNodes(printData, "//" + dbt + "/"+dbc+"[@FIELD]").length ==0) {
                    arrBlkFldNames.splice(fldCnt, 1);
                }
            }
        }
    }
	screenArgs["printDataDom"] = printData; //Fix for Bug_34673736												   
    printHeader = getPrintHeader(arrBlkNames, arrFldNames);
    screenArgs["functionId"] = functionId;
    screenArgs["langCode"] = langCode;
    screenArgs["screenHTML"] = printHeader;
    screenArgs["screenTitle"] = screenTitle;
	//Fix for Bug_34673736 starts							 
    //screenArgs["printData"] = getXMLString(printData);
	screenArgs["printData"] = getXMLString(screenArgs["printDataDom"]);
	//Fix for Bug_34673736 ends					
    screenArgs["arrBlkNames"] = arrBlkNames;
    screenArgs["arrFldNames"] = arrFldNames;

    //FCUBS10ITR1 -- SFR 982 START
    if (screenTitle.indexOf("&") != -1)
    {
        var re = new RegExp('&', "g");
        screenTitle = screenTitle.replace(re, "and");
    }
    //FCUBS10ITR1 -- SFR 982 END
    //printWindow = window.showModelessDialog(encodeURI("Print.jsp?dispTitle=" + screenTitle), dlgArgScreenHTML, "center:yes;dialogWidth:60;dialogHeight:40;resizable:no;scroll:no;status:no;dialogLeft:10;dialogTop=10");//TODO
    mask();
    loadSubScreenDIV("ChildWin", "Print.jsp?dispTitle="+screenTitle+"&fromExtensible=no");
}

/*
 * Bulids and returns the printHeader
 */

function checkItemInArray(arrayObj, value) {
    for (var i = 0; i < arrayObj.length; i++) {
        if (arrayObj[i] == value) {
            return true;
        }
    }
    return false;
}

function fnBuildBlkFields(blkName, blkFldsArray, arrFldNames) {
	//Fix for Bug_34673736 starts
    var j =0;
    var amountNodes = new Array(); 
    var printData = screenArgs["printDataDom"];
    //Fix for Bug_34673736 ends				   
    for (var i = 0; i < arrFldNames.length; i++) {
        if(!checkItemInArray(blkFldsArray, arrFldNames[i])){
            blkFldsArray[blkFldsArray.length] = arrFldNames[i];
            if(typeof(arrFldNames[arrFldNames[i]]) != "undefined") {
                blkFldsArray[arrFldNames[i]] = arrFldNames[arrFldNames[i]];
				//Fix for Bug_34673736 starts
                blkFldsArray["TYPE__" + arrFldNames[i]] = arrFldNames["TYPE__" + arrFldNames[i]];             
                if (arrFldNames["TYPE__" + arrFldNames[i]] && arrFldNames["TYPE__" + arrFldNames[i]].split("~")[0] == "AMOUNT") { 
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
                if (arrFldNames["TYPE__" + arrFldNames[i]] && arrFldNames["TYPE__" + arrFldNames[i]] == "DATE") {                     
                    var dateNodes = selectNodes(printData, "//" + arrFldNames[i+"__"+arrFldNames[i]] + "/" + arrFldNames[i]);
					for (var x = 0; x < dateNodes.length; x++) {
						var dateNode = dateNodes[x];
                        if (dateNode != null && getNodeText(dateNode) != "") {
                            setNodeText(dateNode, fnFormatTimeStampString(getNodeText(dateNode)));     
                    	}
					}
                }
				if (arrFldNames["TYPE__" + arrFldNames[i]] && arrFldNames["TYPE__" + arrFldNames[i]] == "DATETIME") { 
                    var dateTimeNodes = selectNodes(printData, "//" + arrFldNames[i]);
					for (var y = 0; y < dateTimeNodes.length; y++) {
						var dateTimeNode = dateTimeNodes[y];
                        if (getNodeText(dateTimeNode) != "") {
                            setNodeText(dateTimeNode, fnFormatTimeStampString(getNodeText(dateTimeNode)));     
                        }
					}
                }
                //Fix for Bug_34673736 ends			   
            }
        }
    }
	//Fix for Bug_34673736 starts   
        for (var m = 0; m < amountNodes.length; m++) {                                
			var amtCcyNode2 = selectSingleNode(printData, "//" + amountNodes[m].split("~")[2]);
			var amtNodes2 = selectNodes(printData, "//" + amountNodes[m].split("~")[1]); 		    
			for (var n = 0; n < amtNodes2.length; n++) {
				var amtNode2 = amtNodes2[n];               
                var amtCcyNodeValue2 = "";
                var amtNodeValue2 = "";
                if (amtCcyNode2 != undefined && amtCcyNode2 != null) {
                    amtCcyNodeValue2 = getNodeText(amtCcyNode2);
                } 
                if (amtCcyNode2 != undefined && amtNode2 != null) {
                    amtNodeValue2 = getNodeText(amtNode2);
                }
                if (amtNodeValue2 != "" && amtNodeValue2 != undefined && amtCcyNodeValue2 != "" && amtCcyNodeValue2 != undefined) {
                    setNodeText(amtNode2, new MB3Amount(amtNodeValue2, true, amtCcyNodeValue2).getDisplayAmount());     
                }  		  
            }
        }
    screenArgs["printDataDom"] = printData;
    //Fix for Bug_34673736 ends	   
}

function getPrintHeader(arrBlkNames, arrFldNames)
{
    var printHeader = "";
    var arrBlkFldNames = new Array();
    var tempBlkName = "";
    var leftInc = 0;
    var getLabels = new Array();
    getLabels[0] = mainWin.getItemDesc("LBL_SELECT_ALL");
    getLabels[1] = mainWin.getItemDesc("TTL_PRINT_OPTION");
    getLabels[2] = mainWin.getItemDesc("LBL_PRINT_PREVIEW");
    getLabels[3] = mainWin.getItemDesc("LBL_RECORD_PERPAGE");
    var forBlkCnt = 0;

    printHeader += "<div id='TBLPageAll' class='DIVHeader'><h2 class='hh4'>" + getLabels[1] + "</h2><div class='DIVThreeColSectionContainer'><div class='DIVColumnTripple'>";
    printHeader += "<div class='DIVpage' style='width: 99.5%;'><label class='LBLauto'><input name='Check' class='CHKstd' type='checkbox' onclick=fnSelectAll(event)>" + getLabels[0] + "</label>&nbsp;&nbsp;";
    //printHeader += "<span><span class='SPNtext'>" + getLabels[3] + "</span><input class='TXTstd' title='" + getLabels[3] + "' size='3' value='1'></span>";
    printHeader += "<button id=btnPrintView class='BTNtext' onclick=fnPrintView();>" + getLabels[2] + "</button></div></div></div>";
    var tmp = new Array();
    var tmpBlkLables = new Array();
    var count = 0;
    for (var i=0; i < arrBlkNames.length; i++) {
        var blkName = arrBlkNames[i].split("~")[1];
        if (!tmp[blkName]){
            tmp[count++] = blkName;
            tmpBlkLables[blkName] = arrBlkNames[arrBlkNames[i]];
            tmp[blkName] = new Array();
        }
        fnBuildBlkFields(blkName, tmp[blkName], arrFldNames[arrBlkNames[i]]);
    }

    for (var blkCnt = 0; blkCnt < tmp.length; blkCnt++)
    {
        tempBlkName = tmp[blkCnt];
        if (tmp[tempBlkName].length > 0) {
            if (forBlkCnt == 0){
                printHeader += "<div class='DIVThreeColSectionContainer'><div class='DIVColumnOne'>";
                printHeader += "<fieldset class='FSTdlg' id='"+ tempBlkName +"'><legend>" + tmpBlkLables[tempBlkName] + "</legend><div class='DIVCheck'><div class='DIVchkrad'>";
                printHeader += "<label class='LBLauto'><input title='" + getLabels[0] + "' class='CHKstd' type='checkbox' onclick=fnSelectAllBlkFlds(event,'"+ tempBlkName +"')>" + getLabels[0] + "</label></div></div>";
                printHeader += "<div class='DIVCheck'><b class='LBLstd'>&nbsp;</b><div class='DIVchkrad'>";
            }
            if (forBlkCnt != 0 && forBlkCnt%3 == 0) {
                printHeader += "</div><div class='DIVThreeColSectionContainer'><div class='DIVColumnOne'>";
                printHeader += "<fieldset class='FSTdlg' id='"+ tempBlkName +"' ><legend>" + tmpBlkLables[tempBlkName] + "</legend><div class='DIVCheck'><div class='DIVchkrad'>";
                printHeader += "<label class='LBLauto'><input title='" + getLabels[0] + "' class='CHKstd' type='checkbox' onclick=fnSelectAllBlkFlds(event,'"+ tempBlkName +"')>" + getLabels[0] + "</label></div></div>";
                printHeader += "<div class='DIVCheck'><b class='LBLstd'>&nbsp;</b><div class='DIVchkrad'>";
            }
            if (forBlkCnt != 0 && forBlkCnt%3 != 0) {
                printHeader += "<div class='DIVColumnOne'>";
                printHeader += "<fieldset class='FSTdlg' id='"+ tempBlkName +"'><legend>" + tmpBlkLables[tempBlkName] + "</legend><div class='DIVCheck'><div class='DIVchkrad'>";
                printHeader += "<label class='LBLauto'><input title='" + getLabels[0] + "' class='CHKstd' type='checkbox'onclick=fnSelectAllBlkFlds(event,'"+ tempBlkName +"')>" + getLabels[0] + "</label></div></div>";
                printHeader += "<div class='DIVCheck'><b class='LBLstd'>&nbsp;</b><div class='DIVchkrad'>";
            }
            for (var fldCnt = 0; fldCnt < tmp[tempBlkName].length; fldCnt++) {
                printHeader += "<label class='LBLauto'><input title='" + tmp[tempBlkName][tmp[tempBlkName][fldCnt]] + "' label_value='" + tmp[tempBlkName][tmp[tempBlkName][fldCnt]];
                printHeader += "' class='CHKstd' type='checkbox' name ='headerChk" + tempBlkName + "' DBC='" + tmp[tempBlkName][fldCnt];
                printHeader += "' DBT ='" + tempBlkName + "'>" + tmp[tempBlkName][tmp[tempBlkName][fldCnt]] + "</label>";
            }
            printHeader += "</div></div></fieldset></div>";
            ++forBlkCnt;
        }
        if (blkCnt == tmp.length-1) {
            printHeader += "</div>";
        }
    }
    printHeader += "</div>"
    nonExtBlksArray = tmp;
    extBlkLabelsArray = tmpBlkLables;
    return printHeader;
}

/*
 * Bulids and returns the printData for Summary
 */
function getPrintSummaryData(arrBlkNames, arrFldNames)
{
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

    //Buliding strXml
    strXml = "<?xml version='1.0' encoding='UTF-8' ?>";
    strXml += "<root>";
    for (var rowIndex = 0; rowIndex < tblBody.rows.length; rowIndex++)
    {
        tblRow = tblBody.rows[rowIndex];
        tblFirstCell = tblRow.cells[0].getElementsByTagName("INPUT")[0];
        if (tblFirstCell.checked)
        {
            pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, rowIndex + 1);

            //Including the attribute LABEL in each, Block and field Tag
            for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++)
            {
                tempBlkName = arrBlkNames[blkCnt];
                //tempDBT = tempBlkName.substr(4,tempBlkName.length);
                tempDBT = tempBlkName.substring(tempBlkName.indexOf("~") + 5, tempBlkName.length);
                blkNodeList = selectNodes(pureXMLDOM, "//" + tempDBT);
                arrBlkFldNames = arrFldNames[arrBlkNames[blkCnt]];

                for (var nodeIndex = 0; nodeIndex < blkNodeList.length; nodeIndex++)
                {
                    blkNodeList[nodeIndex].setAttribute("LABEL", arrBlkNames[arrBlkNames[blkCnt]]);
                    for (var fldCnt = 0; fldCnt < arrBlkFldNames.length; fldCnt++)
                    {
                        fldNodeList = selectNodes(blkNodeList[nodeIndex], "./" + arrBlkFldNames[fldCnt]);
                        for (var innerNodeIndex = 0; innerNodeIndex < fldNodeList.length; innerNodeIndex++)
                        {
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

//FCJ 7.2 ITR1 2447 Starts
function makeInitCaps(node)
{
    var newNode = "";
    var words = node.split("_");
    if (words.length == 1)
    {
        return node.charAt(0).toUpperCase() + node.substring(1).toLowerCase();
    } else
    {
        for (var index = 0; index < words.length; index++)
        {
            newNode = newNode + words[index].charAt(0).toUpperCase() + words[index].substring(1).toLowerCase() + " ";
        }
        return newNode;
    }
}
//FCJ 7.2 ITR1 2447 Ends
/*
 * Bulids and returns the printData for Detail
 */
function getPrintDetailData(arrBlkNames, arrFldNames, pureXMLDOM)
{
    var strXml;
    var tempDBT;
    var tempBlkName;
    var pureXMLDOM;
    var blkNodeList;
    var fldNodeList;
    var arrBlkFldNames = new Array();
    //Buliding strXml
    strXml = "<?xml version='1.0' encoding='UTF-8' ?>";
    strXml += "<root>";
    //Sankarganesh 11/08/05
    var fldVal;
    var fldRef;
    var fldTyp;
    var fldName;
    var blkRefNode;
    //-----
    //Including the attribute LABEL in each, Block and field Tag
    var blkRefNode = selectNodes(gXmlDoc, "//BLOCK[@SCREEN !='SUMMARY' and (@TYPE = '" + gSingleE + "' or @TYPE = '" + gMulitE + "') and ID != 'BLK_STD_BUTTONS_IMG']");
    for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++)
    {
        tempBlkName = arrBlkNames[blkCnt];
        var blkType = blkRefNode[blkCnt].getAttribute("TYPE");
        if (blkType == "Single Entry")
        {
            if (selectSingleNode(blkRefNode[blkCnt], "DATASRC")) tempDBT = getNodeText(selectSingleNode(blkRefNode[blkCnt], "DATASRC"));
        } else if (blkType == "Multiple Entry")
        {
            if (selectSingleNode(blkRefNode[blkCnt], "DBT")) tempDBT = getNodeText(selectSingleNode(blkRefNode[blkCnt], "DBT"));
        } else
        {
            tempDBT = tempBlkName.substring(tempBlkName.indexOf("~") + 5, tempBlkName.length);
        }

        //tempDBT = tempBlkName.substr(4,tempBlkName.length);
        //tempDBT = tempBlkName.substring(tempBlkName.indexOf("~")+5,tempBlkName.length);

        blkNodeList = selectNodes(pureXMLDOM, "//" + tempDBT);
        arrBlkFldNames = arrFldNames[arrBlkNames[blkCnt]];
        for (var nodeIndex = 0; nodeIndex < blkNodeList.length; nodeIndex++)
        {
            blkNodeList[nodeIndex].setAttribute("LABEL", arrBlkNames[arrBlkNames[blkCnt]]);
            for (var fldCnt = 0; fldCnt < arrBlkFldNames.length; fldCnt++)
            {
                fldNodeList = selectNodes(blkNodeList[nodeIndex], "./" + arrBlkFldNames[fldCnt]);

                for (var innerNodeIndex = 0; innerNodeIndex < fldNodeList.length; innerNodeIndex++)
                {
                    //FCJ 7.2 ITR1 2447 modified to convert Label in InitCaps format
                    //fldNodeList.item(innerNodeIndex).setAttribute("LABEL",arrBlkFldNames[arrBlkFldNames[fldCnt]]);
                    fldNodeList[innerNodeIndex].setAttribute("LABEL", makeInitCaps(arrBlkFldNames[arrBlkFldNames[fldCnt]]));
                    fldNodeList[innerNodeIndex].setAttribute("FIELD", 'Y');
                    //handles select box and RadioButtonSankarganesh 11/08/05
                    fldRef = document.getElementById(tempDBT + "__" + arrBlkFldNames[fldCnt]);
                    fldVal = getNodeText(fldNodeList[innerNodeIndex]);
                    if (fldRef != null)
                    {
                        if ((fldRef.type).toUpperCase() == 'HIDDEN' || (fldRef.type).toUpperCase() == 'BUTTON' || (fldRef.type).toUpperCase() || 'FIELDSET' || (fldRef.type).toUpperCase() == 'LABEL') continue;
                    }
                    if (fldRef != null)
                    {
                        if ((fldRef.tagName).toUpperCase() == 'SELECT')
                        {
                            for (var optCnt = 0; optCnt < fldRef.options.length; optCnt++)
                            {
                                if (fldRef.options[optCnt].value == fldVal)
                                {
                                    setNodeText(fldNodeList[innerNodeIndex], getNodeText(fldRef.options[optCnt]));
                                    break;
                                }
                            }
                        }

                        if ((fldRef.tagName).toUpperCase() == 'INPUT')
                        {
                            if ((fldRef.type).toUpperCase() == 'RADIO')
                            {
                                setNodeText(fldNodeList[innerNodeIndex], fnHandleRadio(arrBlkFldNames[fldCnt], fldVal, tempBlkName));
                            }
                        }
                    }
                    //----
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
function fnHandleRadio(fldName, val, blkId)
{
    var optionLink = selectSingleNode(gXmlDoc, "//BLOCK[ID='" + blkId + "']/FIELD[NAME = '" + fldName + "' and VALUE ='" + val + "']/OPTION_LINK");
    if (optionLink != null)
    {
        return getLabelFromLink(optionLink.text, blkId);
    } else
    {
        return val;
    }
}
//------- End ------

//---------------------------------
// Fucntions called from Print.jsp
//---------------------------------

/*
 * function called when Screen is Loading
 */
function fnPrnLoad()
{
    /*document.getElementById("prnResTree").innerHTML = parent.screenArgs["screenHTML"];*/
    document.getElementById("DIVMainTmp").innerHTML = parent.screenArgs["screenHTML"];
}

/* 
 * function called Before Printing
 */

/*
 * function to print the value
 */

function fnPrintValue() {
    try {
        var oIframe = parent.document.getElementById("Div_ChildWin").children[0].children[0];
        var oContent = document.getElementById("PrintScr").innerHTML;
        var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
        if (oDoc.document) 
            oDoc = oDoc.document;
        oDoc.write("<html style=\"overflow-y:scroll\"><head><link href=\"Theme/Ext"+strTheme+"\" rel=\"stylesheet\" type=\"text/css\"/><link href=\"Theme/Ext"+langISO+".css\" rel=\"stylesheet\" type=\"text/css\"/><link href=\"Theme/Ext"+browserCSS+"\" rel=\"stylesheet\" type=\"text/css\"/>");
        var scriptStr = "<script type='text/javascript'> var parentScrID='"+parentScrID+"'; var launcherDIVWidth='"+launcherDIVWidth+"'; var launcherIFWidth='"+launcherIFWidth+"'; var launcherDIVHeight='"+launcherDIVHeight+"'; var launcherIFHeight='"+launcherIFHeight+"'; var launcherLeft='"+launcherLeft+"'; var launcherResTreeWidth=''; var launcherResTreeHeight=''; var launcherHeaderWidth='"+launcherHeaderWidth+"'; function fnExitPrint(e){  parent.fnExitSubScreenData(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherLeft, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth);} function printContent(bodyobj) { bodyobj.focus();bodyobj.print();document.getElementById('btndiv').style.display='';}</script>";
        oDoc.write(scriptStr);
        oDoc.write("</head><body onload='printContent(this)'><div id='btndiv' style='display:none'><button onclick='fnExitPrint(event)'>Exit</button></div>");
        oDoc.write(oContent+"</body></html>");
        oDoc.close();
    }
    catch(e){
        self.print();
    }
}

function delayRefresh() {
    oDoc.open();
    oDoc.write("<head><link href=\"Theme/ExtFlexblue.css\" rel=\"stylesheet\" type=\"text/css\"/><link href=\"Theme/Exten.css\" rel=\"stylesheet\" type=\"text/css\"/><link href=\"Theme/ExtBROWSER_IE.css\" rel=\"stylesheet\" type=\"text/css\"/>");
    oDoc.write("</head><body'>");
    oDoc.write(oContent1 + "</body>");
    oDoc.close();
}

/*
 * Function to select Block specific fields
 */

function fnSelectAll(evnt) {

    nonExtBlksArray = parent.nonExtBlksArray;
    for (var i=0; i<nonExtBlksArray.length; i++) {
        if (document.getElementsByName("headerChk" + nonExtBlksArray[i]) && document.getElementsByName("headerChk" + nonExtBlksArray[i]).length > 0) {
            fnSelectAllBlkFlds(evnt, nonExtBlksArray[i]);
        }
    }
}

function fnSelectAllBlkFlds (evnt, blkName) {
    var checkAll = true;
    var e = window.event || evnt;
    var srcEle = getEventSourceElement(e);
    if(srcEle && srcEle.type.toUpperCase() == "CHECKBOX") {
        if (srcEle.checked) {
            checkAll = true;
            document.getElementById(blkName).children[1].children[0].children[0].children[0].checked = true;
        } else {
            checkAll = false;
            document.getElementById(blkName).children[1].children[0].children[0].children[0].checked = false;
            }
            }
    var noElements = document.getElementsByName("headerChk" + blkName).length;
    for(var i=0; i<noElements; i++) {
        if (checkAll) {
            document.getElementsByName("headerChk" + blkName)[i].checked = true;
        } else {
            document.getElementsByName("headerChk" + blkName)[i].checked = false;
        }
    }
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
    for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++) {
        tempBlkName = arrBlkNames[blkCnt];
        tempBlkDBT = tempBlkName.substring(tempBlkName.indexOf("~") + 5, tempBlkName.length);
        checkBoxRefs = document.getElementsByName("headerChk" + tempBlkName.split("~")[1]);
        var arrBlkFldNames = arrFldNames[arrBlkNames[blkCnt]];
        var checkedCount = 0;
        for (var checkCnt = 0; checkCnt < checkBoxRefs.length; checkCnt++) {
            checkBoxRef = checkBoxRefs[checkCnt];
            if (!checkBoxRef.checked) {
                tempDBC = checkBoxRef.getAttribute("DBC");
                tempDBT = arrBlkFldNames[checkCnt + '__' + tempDBC];
                var removeNode = selectNodes(dataDOM, "//" + tempDBT + "/" + tempDBC);
                for (var i = 0; i < removeNode.length; i++) {
                    removeNode[i].parentNode.removeChild(removeNode[i]);
                }
            } else {
                ++checkedCount;
                isMinOneFldSelected = true;
            }
        }
    }
    if (isMinOneFldSelected) {
        for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++) {
            tempBlkName = arrBlkNames[blkCnt];
            tempBlkDBT = tempBlkName.substring(tempBlkName.indexOf("~") + 5, tempBlkName.length);
            blockNodeList = selectNodes(dataDOM, "//" + tempBlkDBT);
            currBlkItem = blockNodeList[0];

            if (currBlkItem != null) {
                fldNodesLen = selectNodes(currBlkItem, "*[@FIELD]").length;
                cldFldNodesLen = selectNodes(currBlkItem, "*[@Type]/*[@FIELD]").length;
                if ((fldNodesLen <= 0) && (cldFldNodesLen > 0)) {
                    /*appendErrorCode('ST-COM028', null);*/
                    mask();
                    showAlerts(fnBuildAlertXML('ST-COM028', 'E'), 'E');
                    canPrint = false;
                    break;
                }
            }
        }
    } else {
        //appendErrorCode('ST-COM029', null);
        mask();
        showAlerts(fnBuildAlertXML('ST-COM029', 'E'), 'E');
        canPrint = false;
    }
    return canPrint;
}
/* 
 * Function to remove block which have no fields
 */

function fnRemoveBlankBlkFlds(blkNode) {

    var childNodesList = blkNode.childNodes;
    var totalFldNodesLength = childNodesList.length - selectNodes(blkNode, "*[@Type]").length;
    if (totalFldNodesLength != selectNodes(blkNode, "*[@FIELD]").length) {
        for (var i = childNodesList.length-1; i >= 0 ; i--) {
            if (!childNodesList[i].getAttribute("FIELD") && !childNodesList[i].getAttribute("Type")) {
                childNodesList[i].parentNode.removeChild(childNodesList[i]);
            }
        }
    }

    for (var j = 0; j < selectNodes(blkNode, "*[@Type]").length; j++) {
        fnRemoveBlankBlkFlds(selectNodes(blkNode, "*[@Type]")[j]);
    }
}

/*
function fnRemoveBlankBlks(dataDOM)
{
    var tempBlkName;
    var tempBlkDBT;
    var blockNodeList;
    var currBlkItem;
    var fldNodesLen;
    var cldFldNodesLen;
    var fileName;
    fileName = functionId.substring(2, 0) + "D" + functionId.substring(3, functionId.length);
    fileName = mainWin.UIXmlPath + langCode + fileName + ".xml";
    gXmlDoc = loadXMLFile(fileName);
    var blkList = selectNodes(gXmlDoc, "//BLOCK[@SCREEN !='SUMMARY' and (@TYPE = '" + gSingleE + "' or @TYPE = '" + gMulitE + "') and ID != 'BLK_STD_BUTTONS_IMG']");
    for (var blkCnt = 0; blkCnt < arrBlkNames.length; blkCnt++)
    {
        var blkType = blkList[blkCnt].getAttribute("TYPE");
        if (blkType == "Single Entry")
        {
            if (selectSingleNode(blkList[blkCnt], "DATASRC")) tempBlkDBT = getNodeText(selectSingleNode(blkList[blkCnt], "DATASRC"));
        } else if (blkType == "Multiple Entry")
        {
            if (selectSingleNode(blkList[blkCnt], "DBT")) tempBlkDBT = getNodeText(selectSingleNode(blkList[blkCnt], "DBT"));
        } else
        {
            tempBlkName = arrBlkNames[blkCnt];
            //tempBlkDBT      =  tempBlkName.substr(4,tempBlkName.length);
            tempBlkDBT = tempBlkName.substring(tempBlkName.indexOf("~") + 5, tempBlkName.length);
        }
        blockNodeList = selectNodes(dataDOM, "//" + tempBlkDBT);

        if (blockNodeList != null)
        {
            if (blockNodeList.length != 0)
            {
                currBlkItem = blockNodeList[0];
                fldNodesLen = selectNodes(currBlkItem, "*[@FIELD]").length;
                if (fldNodesLen == 0)
                {
                    var removeNode=dataDOM.selectNodes("//" + tempBlkDBT);
                     
                        for(var i=0; i < removeNode.length; i++){
                            removeNode[i].parentNode.removeChild(removeNode[i]);
                        }
                }
            }
        }
    }
}
*/
/*
 * function which builds print view.
 */
function fnPrintView() {
    var dataDOM = loadXMLDoc(parent.screenArgs["printData"]);
    var checkBoxRefs;
    var checkBoxRef;
    var tempDBT;
    var tempDBC;
    var blkLevelFlag = new Array();
    var tempBlkName;
    var tempBlkDBT;
    var html;
    var canPrint = false;
    if (dataDOM) {
        canPrint = fnValidateSelection(dataDOM);
        if (canPrint) {
            fnRemoveBlankBlkFlds(selectSingleNode(dataDOM, "//root").childNodes[0]);
            var blkNodes = selectNodes(dataDOM, "//*[@Type]");
            /*Code to remove all the block nodes having no data*/
            for (var j = blkNodes.length-1; j >= 0; j--) {
                if (blkNodes[j].childNodes.length == 0){
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
            /*document.getElementById("btnNav").style.display = "block"; TODO*/
        } else {
            return;
        }
    }
}
/*
 * function to transform xmlDoc to html
 */
function printTransform(xmlDOC)
{
/*
    try
    {
        var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
    } catch(e)
    {
        var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.4.0");
    }
    xslDoc.async = false;
    xslDoc.resolveExternals = true;
    xslDoc.load("Templates/XSL/Print.xsl");

    try
    {
        var xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
    } catch(e)
    {
        var xslt = new ActiveXObject("Msxml2.XSLTemplate.4.0");
    }
    var xslProc;
    xslt.stylesheet = xslDoc;
    try
    {
        var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e)
    {
        var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    xmlDoc.async = false;
    xmlDoc.resolveExternals = true;
    xmlDoc.load(xmlDOC);
    xslProc = xslt.createProcessor();
    xslProc.input = xmlDoc;
    xslProc.transform();
    return xslProc.output;
*/
    var param = new Array();
    param["lblPrint"] = mainWin.getItemDesc("LBL_PRINT");
    param["lblPrintPreview"] = mainWin.getItemDesc("LBL_PRINT_PREVIEW");
    param["screenWidth"] = mainWin.scrWidth; //REDWOOD_CHANGES
    var xslDoc = loadXSLFile("Templates/XSL/Print.xsl");
    //var html = transform(xmlDOC, xslDoc, null);
    var html = transform(xmlDOC, xslDoc, param);
    return html;
}

/* 
 * Performs pageing
 */
function fnPageRecords()
{
    pageNum = 1;
    //spanid = document.forms(0).pID.value;
    spanid = document.getElementsByName("pID")[0].value;
    var flag = true;
    var obj;
    cnt = numRecs + 1;
    while (flag)
    {
        obj = document.getElementById(spanid + cnt);
        cnt = cnt + 1;
        if (obj == null){
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
    //document.getElementById("cnt").value = "1 of " + totPages;   
}

/* 
 * Funtion to get previous record
 */
function fnMovePrev()
{
    if (pageNum == 1)
    {
        appendErrorCode('ST-COM030', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
    } else
    {
        pageNum--;
        for (var i = ((pageNum * numRecs) + 1); i <= ((pageNum * numRecs) + numRecs); i++)
        {
            if (document.getElementById(spanid + i) != null) document.getElementById(spanid + i).style.display = "none";
        }
        for (var i = ((pageNum - 1) * numRecs) + 1; i <= ((pageNum - 1) * numRecs) + numRecs; i++)
        {
            document.getElementById(spanid + i).style.display = "block";
        }

    }
    document.getElementById("Cnt").value = pageNum + " of " + totPages;
}

/* 
 * Funtion to get Last record
 */
function fnMoveLast()
{
    var pageCnt = pageNum;
    if (pageCnt == totPages)
    {
        appendErrorCode('ST-COM031', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
        return;
    }
    while (pageCnt < totPages)
    {
        fnMoveNext();
        pageCnt++;
    }
    document.getElementById("Cnt").value = pageNum + " of " + totPages;
}

/* 
 * Funtion to get First record
 */
function fnMoveFirst()
{
    var pageCnt = pageNum;
    if (pageCnt == 1)
    {
        appendErrorCode('ST-COM030', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
        return;
    }
    while (pageCnt > 1)
    {
        fnMovePrev();
        pageCnt--;
    }
    document.getElementById("Cnt").value = pageNum + " of " + totPages;
}

/* 
 * Funtion to get Next record
 */
function fnMoveNext()
{
    if (pageNum == totPages)
    {
        appendErrorCode('ST-COM031', null);
        message = buildMessage(gErrCodes);
        alertMessage(message);
    } else
    {
        for (var i = 1; i <= (pageNum * numRecs); i++)
        {
            document.getElementById(spanid + i).style.display = "none";
        }
        for (var i = ((pageNum * numRecs) + 1); i <= ((pageNum * numRecs) + numRecs); i++)
        {
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
function toggle(branch)
{
    var objBranch = document.getElementById(branch).style;
    if (objBranch.display == "")
    {
        objBranch.display = "block";
    }
    if (objBranch.display == "block") objBranch.display = "none";
    else objBranch.display = "block";

}
/*
 * toggleImage between plus and minus
 */
function toggleImage(img)
{
    var objImg = document.getElementById(img);
    if (objImg.src.indexOf('Images/closed.gif') > -1) objImg.src = openImg.src;
    else objImg.src = closedImg.src;

}

function fnExitPrint(e){
    fnExitSubScreen(e);
}

function fnCloseAlertWin(evnt) {
    unmask();
}