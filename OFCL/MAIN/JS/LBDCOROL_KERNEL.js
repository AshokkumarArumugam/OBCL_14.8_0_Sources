/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright ? 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : LBDCOROL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  SRF  : 27325189 
**  Last modified on   : 04-JAN-2018
**  search string       : OBCL_27325189 
**  Reason             : added fetch button for LS rate fixing
**
**  SRF  : 27353639 
**  Last modified on   : 24-JAN-2018
**  search string       : OBCL_27353639 
**  Reason             : added extra screen args to rate fixing sub screen

	**Changed By         : Ramya M
    **Change Description : Changes done to Enable/disable TABS based on consolidationType
    **Search String      : OBCL_14.3_BASE_BUG#30541128
    **Changed On         : 20-FEB-2020
**Changed By         : Pallavi R
**Changed On         : 16-Jun-2021
**Change Description : Floating Periodic Manual changes
**Search String      : OBCL_14.4_SMTB#33014309 changes   	

**Changed By         : Arunprasath
**Changed On         : 23-Jul-2021
**Change Description : Added for RFR parameter addition
**Search String      : OBCL_14.5_Consol_Roll


**Changed By         : Arunprasath
**Changed On         : 22-Feb-2023
**Change Description : Added fix to populate exchange rate fixing screen header details
**Search String      : Bug#35078192

  **Changed By         : Chandra Achuta
  **Date               : 19-Jul-2023
  **Change Description : User selected Consolidated+Split rollover type, then maturity_date, other fields are disable.
                         User went to Split tab, come back to Main tab. Then maturity_date, other fields should be disable.
  **Search String      : Bug#35615226

  **Changed By         : Pallavi R
  **Date               : 14-Jul-2023
  **Change Description : Changes to populate split no for gateway and Rollover type change related changes
  **Search String      : OBCL_14.7_RABO_#35579173 Changes  
  
    
  **Changed By         : Sudharshini Balaji
  **Changed On         : 10-AUG-2023
  **Change Description : Added default Interest parameter basis to product when error occurs. 
  **Search String      : Bug#35676110 changes
  
***************************************************************************************************************************
*/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
var fcjRequestDOM;
var fcjResponseDOM;
var screenArguments = new Array(); /*OBCL_14.5_Consol_Roll*/
function fnPostLoad_KERNEL() {
    return true;
}

function fnPostNew_KERNEL() {
    return true;
}

function fnPreUnlock_KERNEL() {
    return true;
}

function fnPostUnlock_KERNEL() {
    return true;
}

function fnPreSave_KERNEL() {
    return true;
}

function fnPostSave_KERNEL() {
	fnEnableIntDetBtn();/*OBCL_14.5_Consol_Roll*/
    return true;
}

function fnPostExecuteQuery_KERNEL() {
	
    fnEnableElement(document.getElementById("BLK_ROLL_RATES__BTN_EXRFX"));
    fnEnableElement(document.getElementById("BLK_ROLL_RATES__BTN_RT_SET"));
    fnEnableElement(document.getElementById("BLK_MASTER__BTN_EXRATE"));
    fnEnableElement(document.getElementById("BLK_SPLIT_ROLL__BTN_EXRATE_FIXING"));
    fnEnableElement(document.getElementById("BLK_CONSOL_INT_RATE__BTN_RATE_FIXING"));
    fnEnableElement(document.getElementById("BLK_CONSOL_INT_RATE__BTN_RATE_SETTINGS"));
    return true;
}

function fnPreAuthorize_KERNEL() {
    authFunction = 'LBDCORAU';
    authUixml = 'LBDCORAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    screenArgs['CONTRACT_REF_NO'] = document.getElementById('BLK_MASTER__CONFREFNO').value;
    ArrFuncOrigin['LBDCORAU'] = "KERNEL";
    ArrPrntFunc['LBDCORAU'] = "";
    ArrPrntOrigin['LBDCORAU'] = "";

    return true;
}

function fnPostAuthorize_KERNEL() {
    debugs("In fnPostAuthorize", "A");
    DisableToolbar_buttons("Authorize");
    DisableToolbar_buttons("Unlock");
    DisableToolbar_buttons("Rollover");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
    return true;
}

function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_MASTER__CONFREFNO').value;
    return true;
}
//OBCL_14.7_RABO_#35579173 Changes Starts
function fnPostAddRow_BLK_SPLIT_ROLL_KERNEL(){
	setTimeout( function(){
	fnUpdateNoteSeqno();
	},0);
}
function fnPostDeleteRow_BLK_SPLIT_ROLL_KERNEL(){
	setTimeout( function(){
						fnUpdateNoteSeqno();
						}
				,0);
}
function fnUpdateNoteSeqno(){
	
	var cnt = getTableObjForBlock('BLK_SPLIT_ROLL').tBodies[0].rows.length;
	for(var i=0;i<cnt;i++){
	getTableObjForBlock('BLK_SPLIT_ROLL').tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0].value=i+1; 
	}
	return true;
}
//OBCL_14.7_RABO_#35579173 Changes Ends


function fn_borrEvents() {
    //BLK_BORR_LINKAGE

    var contractRefNo = "";
    var tblObj = getTableObjForBlock("BLK_BORR_LINKAGE").tBodies[0].rows;
    var chkd = false;
    for (var j = 0; j < tblObj.length; j++) {
        var isChkd = tblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;
        if (isChkd) {
            chkd = true;
            if ((getInnerText(getTableObjForBlock("BLK_BORR_LINKAGE").tBodies[0].rows[j].cells[1])) != "") {
                contractRefNo = getInnerText(getTableObjForBlock("BLK_BORR_LINKAGE").tBodies[0].rows[j].cells[1]);
            }
        }
    }
    if (!chkd) {
        mask();
        showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    g_prev_gAction = gAction;
    gAction = 'EXECUTEQUERY';
    screenArgs['CONTREF'] = contractRefNo;
    screenArgs['ACTION_CODE'] = 'EXECUTEQUERY';
    screenArgs['OPERATION'] = 'View';
    screenArgs['ACTION'] = 'EXECUTEQUERY';
    mainWin.dispHref1('OLDEVENT', 1);
    parent.screenArgs = screenArgs;
    return true;
}

function fnPreLoad_CVS_PART_SHARE_KERNEL() {
	
    var borrRefNo = "";
    var tblObj = getTableObjForBlock("BLK_CONSOL_DETAIL").tBodies[0].rows;
    var chkd = false;
    for (var j = 0; j < tblObj.length; j++) {
        var isChkd = tblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;
        if (isChkd) {
            chkd = true;
            if ((getInnerText(getTableObjForBlock("BLK_CONSOL_DETAIL").tBodies[0].rows[j].cells[1])) != "") {
                borrRefNo = getInnerText(getTableObjForBlock("BLK_CONSOL_DETAIL").tBodies[0].rows[j].cells[1]);
            }
        }
    }
    if (!chkd) {
        mask();
        showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    document.getElementById("BLK_MASTER__TXT_BORRREFNO_LBCINTSH").value = document.getElementById("borrRefNo").value;
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "CFORMPRTSHARE";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    //var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var consolidationType = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").value;
                    var defaultFronting = document.getElementById("BLK_CONSOL_MASTER__DEFAULTFRONTING").value;
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }

        }
    }
    return true;

}

function fn_consolTypeChange() {
	
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "CONCHANGE";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");

                    if (msgStatus == "SUCCESS") {
                        var consolidationType = "";
                        if (document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").value) {
                            consolidationType = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").value;
                        } else if (document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE2").value) {
                            consolidationType = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE2").value;
                        }

                        if (consolidationType == 'S') {
                            disableTabs("TAB_NORMAL"); //OBCL_14.3_BASE_BUG#30541128
                            fnDisableElement(document.getElementById("TAB_NORMAL")); //TAB_NORMAL	
                            /*COMMENT STARTS OBCL_14.3_BASE_BUG#30541128*/
                            /*fnEnableElement(document.getElementById("TAB_SPLIT"));
                            document.getElementById("TAB_SPLIT").style.visibility="VISIBLE";
                             document.getElementById("TAB_SPLIT").parentElement.style.visibility = 'visible';                  
                            document.getElementById("TAB_SPLIT").parentNode.style.display = "block";
                            document.getElementById("TAB_SPLIT").style.display = "block";
                            document.getElementById("TAB_NORMAL").parentElement.style.visibility = 'hidden';
                            document.getElementById("TAB_NORMAL").style.visibility="HIDDEN";
                            document.getElementById("TAB_NORMAL").parentNode.style.display = "none";
                            document.getElementById("TAB_NORMAL").style.display = "none";*/
                            /*COMMENT ENDS OBCL_14.3_BASE_BUG#30541128*/
                            fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDATEI"));
                            fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDAYSI"));
                            fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__ROLLBY"));
                            fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__INTPARMBASIS"));
                            fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__LIQDINTPREPAYMENT"));
                            enableTabs("TAB_SPLIT"); //OBCL_14.3_BASE_BUG#30541128
                            //fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID"));
                            if (msgStatus == 'WARNING') {
                                //    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                                var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                                 gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
								return false;
                            }
                        } else {
                            enableTabs("TAB_NORMAL"); //OBCL_14.3_BASE_BUG#30541128
                            fnEnableElement(document.getElementById("TAB_NORMAL"));
                            /*COMMENT STARTS OBCL_14.3_BASE_BUG#30541128*/
                            /*fnDisableElement(document.getElementById("TAB_SPLIT"));
                   document.getElementById("TAB_NORMAL").style.visibility="VISIBLE";
                   document.getElementById("TAB_NORMAL").parentElement.style.visibility = 'visible';
                  
                   document.getElementById("TAB_NORMAL").parentNode.style.display = "block";
                   document.getElementById("TAB_NORMAL").style.display = "block";
                   document.getElementById("TAB_SPLIT").style.visibility="HIDDEN";*/
                            /*COMMENT ENDS OBCL_14.3_BASE_BUG#30541128*/
                            fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDATEI"));
                            fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDAYSI"));
                            fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__ROLLBY"));
                            fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__INTPARMBASIS"));
                            fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__LIQDINTPREPAYMENT"));
                            disableTabs("TAB_SPLIT"); //OBCL_14.3_BASE_BUG#30541128            
                        }
                    }
                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
        }
        return true;
    }
    return true;
}

function fn_rollOverAmtChange() {
	
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "ROLLAMTCHG";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    //var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var consolidationType = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").value;
                    var defaultFronting = document.getElementById("BLK_CONSOL_MASTER__DEFAULTFRONTING").value;
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var defaultFronting = document.getElementById("BLK_CONSOL_MASTER__DEFAULTFRONTING").value;
                var rollOverAmountType = document.getElementById("BLK_CONSOL_MASTER__ROLLOVERAMTYPE").value;
                if (defaultFronting == 'Y' && rollOverAmountType == 'T') {
                    //enable consol detail rollover amount
                } else {
                    //disable consol detail rollover amount
                }
            }
        }
        return true;
    }
}

function fn_scheduleBasisChange() {
	
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "SCHBASIS";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;
                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
        }
        return true;
    }
}

function fn_maturityDaysChange() {
	
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var matDays = document.getElementById("BLK_CONSOL_MASTER__MATURITYDAYS").value;
    document.getElementById("BLK_CONSOL_MASTER__MATURITYDAYS").value = matDays;
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "MATDAYS";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    // var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    //  showAlerts(getXMLString(selectSingleNode(fcjResponseDOM, "//FCUBS_ERROR_RESP")), 'O');
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;
                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == "WARNING") {
                if (!fnProcessResponse())
                    return false;
            }
        }

        return true;
    }
    return true;
}

function fn_intParamBasisChange() {
	
    //action=INTPARAM
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "INTPARAM";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
				document.getElementById('BLK_CONSOL_MASTER__INTPARMBASIS').value = "P" ;// Bug#35676110 CHANGES
               
                if (!fnProcessResponse())
					gAction = g_prev_gAction; //Bug#35676110 CHANGES
                    return false;
            }
        }
		gAction = g_prev_gAction; //Bug#35676110 CHANGES
        return true;
    }
    return true;
}

function fn_holParamBasisChange() {
	
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "HOLPARAM";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
        }

        return true;
    }
    return true;
}

function fn_rollByChange() {
	
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "ROLLBY";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
        }
        return true;
    }

    return true;
}

function fn_defaultFrontingChange() {
	
    return true;
}

function fn_netROlloverMetChange() {
	
    //action=NETROLLOV
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "NETROLLOV";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
        }

        return true;
    }
    return true;
}
/*function fn_driverContractChange(){
//action=DEFCONT
if(gAction=='EXECUTEQUERY'){
		return true;
	}
           var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));    
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "DEFCONT";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);    
            if (fcjResponseDOM) {
                var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                }else if (msgStatus == "WARNING"  ) {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    return false;
               
                }    
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
if(msgStatus == 'FAILURE' || msgStatus=='WARNING'){
            if(!fnProcessResponse())
                return false;        
}       
         
        }   
        
	return true;
}
	return true;
}*/

function fn_driverContractChange() {
	
    return true;
}

function fn_productChange() {
	
    //action=PRODCHG
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "PRODCHG";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");


                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }

            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
            /*Starts OBCL_14.3_BASE_BUG#30541128*/
            if (msgStatus == "SUCCESS") {
                var consolidationType_def = "";
                if (document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").value) {
                    consolidationType_def = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").value;
                } else if (document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE2").value) {
                    consolidationType_def = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE2").value;
                }
                if (consolidationType_def == 'S') {
                    disableTabs("TAB_NORMAL");
                    fnDisableElement(document.getElementById("TAB_NORMAL")); //TAB_NORMAL
                    enableTabs("TAB_SPLIT");
                } else if (consolidationType_def == 'C') {
                    disableTabs("TAB_SPLIT");
                    fnDisableElement(document.getElementById("TAB_SPLIT")); //TAB_NORMAL
                    enableTabs("TAB_NORMAL");

                }
            }
            /*ends OBCL_14.3_BASE_BUG#30541128*/
            return true;
        }
        return true;
    }
    return true;
}

function fn_rollOverProd() {
	
    //action=PRODCHG
    if (gAction == 'EXECUTEQUERY') {
		fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_INT_DTLS_S', false);/*OBCL_14.5_Consol_Roll*/
        return true;
    }
    var g_prev_gAction = gAction;
	fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_INT_DTLS_S', false);	/*OBCL_14.5_Consol_Roll*/
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "ROLLPRODCHG";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");


                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
                    //var returnVal = displayResponse(messageNode,msgStatus,'E');

                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }

            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            }
        }

        return true;
    }
    return true;
}

function fn_marginPopulate() {

    //action=PRODCHG
    if (gAction == 'EXECUTEQUERY') {
        return true;
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "MARPOP";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");


                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
                    //var returnVal = displayResponse(messageNode,msgStatus,'E');

                } else if (msgStatus == "WARNING") {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;

                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }

            if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
                if (!fnProcessResponse())
                    return false;
            } else {

                var len = getTableObjForBlock("BLK_ROLL_MARGIN").tBodies[0].rows.length;
                //var marBasis="";
                for (var index = 0; index < len; index++) {

                    //var marBasis = getTableObjForBlock("BLK_ROLL_MARGIN").tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value;
                    var basisAmtTag = getTableObjForBlock("BLK_ROLL_MARGIN").tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value;

                    if (basisAmtTag == 'U') {
                        if (index == 0) {
                            document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI").readOnly = false;
                        } else {
                            document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI" + index).readOnly = false;
                        }
                    } else {
                        if (index == 0) {
                            document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI").readOnly = true;
                        } else {
                            document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI" + index).readOnly = true;
                        }
                    }


                }
            }
        }
        return true;
    }
    return true;

}


function fn_liquidatePrinChange() {

    return true;
}

function fn_splitRateTypeChange() {

    return true;
}

function fn_splFixedRateType() {
	
    return true;
}

function fn_splCCYRoundChange() {
	
    return true;
}

function fn_splMarginBasisChange() {
	
    return true;
}

function fn_splitRollMaturityDate() {
	
    return true;
}

function fn_splitRollByChange() { //fn_splitRollByChange

    if (gAction == 'EXECUTEQUERY') {
        return true;
    }

    var tblObj = getTableObjForBlock("BLK_SPLIT_ROLL").tBodies[0].rows;
    var chkd = false;
    for (var j = 0; j < tblObj.length; j++) {

        if (j == 0) {
            document.getElementById("BLK_SPLIT_ROLL__MATURITYDAYS").value = document.getElementById("BLK_SPLIT_ROLL__MATURITYDAYS").value;

        } else {
            document.getElementById("BLK_SPLIT_ROLL__MATURITYDAYSI" + j).value = document.getElementById("BLK_SPLIT_ROLL__MATURITYDAYSI" + j).value;

        }
    }
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "SPMATDAYS";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            if (fcjResponseDOM) {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                } else if (msgStatus == "WARNING") {
                    // var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    //  showAlerts(getXMLString(selectSingleNode(fcjResponseDOM, "//FCUBS_ERROR_RESP")), 'O');
                    var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                     gAction = g_prev_gAction;//OBCL_14.4_SMTB#33014309 changes
					return false;


                }
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if (msgStatus == 'FAILURE' || msgStatus == "WARNING") {
                if (!fnProcessResponse())
                    return false;
            }

        }
        return true;
    }

    return true;
}

function fn_splitRollMaturityDays() { //fn_splitRollMaturityDays


    return true;
}

function fn_considerForSplitRoll() {
	
    return true;
}

function fn_normalRateType() {
	
    return true;
}

function fn_normalFixedRateType() {
	
    return true;
}

function fn_normalCCYRound() {
	
    return true;
}

function fn_normalMarginBasis() {
	
    return true;
}

function fn_valueDateChange() {
	
    return true;
}

function fn_subscreenRateFixing() {
	
    fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_ROIFX', false);
    return true;
}

function fn_subscreenRateSetting() {
	
    fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_INT_SET', false);
    return true;
}

function fn_splitRateSetting() {
	
    fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_INT_SET', false);
    return true;
}

function fn_splitRateFixing() {
	
    fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_ROIFX', false);
    return true;
}

function fn_partShare() {
	
    fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_PART_SHARE', false);
    return true;
}


function fn_splitExrateFixingSub() {
	
    fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_EXRATE_FIXING', false);
    return true;

}

function fn_normalSubExrate() {

    fnSubScreenMain('LBDCOROL', 'LBDCOROL', 'CVS_EXRATE_FIXING', false);
    return true;
}

function fn_rollAmountChange() { //BLK_SPLIT_ROLL//BLK_SPLIT_ROLL__PRINCIROLLAMTI//BLK_SPLIT_ROLL__ROLLAMOUNTI

    var tblObj = getTableObjForBlock("BLK_SPLIT_ROLL").tBodies[0].rows;
    var chkd = false;
    for (var j = 0; j < tblObj.length; j++) {

        if (j == 0) {
            document.getElementById("BLK_SPLIT_ROLL__PRINCIROLLAMT").value = document.getElementById("BLK_SPLIT_ROLL__ROLLAMOUNT").value;
            document.getElementById("BLK_SPLIT_ROLL__PRINCIROLLAMTI").readOnly = true;
        } else {
            document.getElementById("BLK_SPLIT_ROLL__PRINCIROLLAMTI" + j).value = document.getElementById("BLK_SPLIT_ROLL__ROLLAMOUNTI" + j).value;
            document.getElementById("BLK_SPLIT_ROLL__PRINCIROLLAMTI" + j).readOnly = true;
        }
    }
    return true;
}


function fnPreLoad_CVS_INT_SET_KERNEL(screenArgs) {
	
	try{//OBCL_14.5_Consol_Roll
    screenArgs['CONREF'] = document.getElementById("BLK_MASTER__CONFREFNO").value;
    screenArgs['MATURITYDT'] = document.getElementById("BLK_CONSOL_MASTER__MATURITYDATE").value;
    screenArgs['COUNTPART'] = document.getElementById("BLK_MASTER__COUNTERPARTY").value;
    screenArgs['PRODCODE'] = document.getElementById("BLK_MASTER__PRODUCTCODE").value;
    screenArgs['USERREF'] = document.getElementById("BLK_MASTER__USEREFNO").value;
    } catch (e) {}//OBCL_14.5_Consol_Roll
	//OBCL_14.5_Consol_Roll start
	if ((document.getElementById("BLK_CONSOL_INT_RATE__COMPONENT").value != 'undefined' ) && (document.getElementById("BLK_CONSOL_INT_RATE__COMPONENT").value != "" )){
		try{
		screenArguments["CONTRACT"] = parent.document.getElementById("BLK_MASTER__CONFREFNO").value;
		screenArguments["MATURITY_DATE"] = parent.document.getElementById("BLK_CONSOL_MASTER__MATURITYDATE").value;
		screenArguments["COUNTERPARTY"] = parent.document.getElementById("BLK_MASTER__COUNTERPARTY").value;
		screenArguments["PRODUCT"] = parent.document.getElementById("BLK_MASTER__PRODUCTCODE").value;
		screenArguments["USEREFNO"] = parent.document.getElementById("BLK_MASTER__USEREFNO").value;
	    } catch (e) {}
	  }
  ////OBCL_14.5_Consol_Roll end
    return true;
}

function fnPostLoad_CVS_INT_SET_KERNEL(screenArgs) {
	
	
    document.getElementById("BLK_RATE_SETTING__CONTRACT_REF_NO").value = screenArgs['CONREF'];
    document.getElementById("BLK_RATE_SETTING__TXTMATURITYDATE").value = screenArgs['MATURITYDT'];
    document.getElementById("BLK_RATE_SETTING__TXTCOUNTERPARTY").value = screenArgs['COUNTPART'];
    document.getElementById("BLK_RATE_SETTING__TXTPRD").value = screenArgs['USERREF'];
    document.getElementById("BLK_RATE_SETTING__TXTUSERREF").value = screenArgs['USERREF'];
	//OBCL_14.5_Consol_Roll start
	if ((document.getElementById("BLK_RATE_SETTING__CONTRACT_REF_NO").value =="") || (document.getElementById("BLK_RATE_SETTING__CONTRACT_REF_NO").value =='undefined')) {
	document.getElementById("BLK_RATE_SETTING__CONTRACT_REF_NO").value = parent.screenArguments["CONTRACT"];
    document.getElementById("BLK_RATE_SETTING__TXTMATURITYDATE").value = parent.screenArguments["MATURITY_DATE"];
    document.getElementById("BLK_RATE_SETTING__TXTCOUNTERPARTY").value = parent.screenArguments["COUNTERPARTY"];
    document.getElementById("BLK_RATE_SETTING__TXTPRD").value = parent.screenArguments["PRODUCT"];
    document.getElementById("BLK_RATE_SETTING__TXTUSERREF").value = parent.screenArguments["USEREFNO"];
	}
	
	if (document.getElementById("BLK_RATE_SETTING__CONTRACT_REF_NO").value =='undefined') {
		document.getElementById("BLK_RATE_SETTING__CONTRACT_REF_NO").value = '';
	}
	
	if (document.getElementById("BLK_RATE_SETTING__TXTCOUNTERPARTY").value =='undefined') {
		document.getElementById("BLK_RATE_SETTING__TXTCOUNTERPARTY").value = '';
	}
	
	if (document.getElementById("BLK_RATE_SETTING__TXTMATURITYDATE").value =='undefined') {
		document.getElementById("BLK_RATE_SETTING__TXTMATURITYDATE").value = '';
	}
	
	if (document.getElementById("BLK_RATE_SETTING__TXTUSERREF").value =='undefined') {
		document.getElementById("BLK_RATE_SETTING__TXTUSERREF").value = '';
	}
	
	if (document.getElementById("BLK_RATE_SETTING__TXTPRD").value =='undefined') {
		document.getElementById("BLK_RATE_SETTING__TXTPRD").value = '';
	}
	//OBCL_14.5_Consol_Roll end
    return true;
}

function fnPreLoad_CVS_ROIFX_KERNEL(screenArgs) {
	
	try{ /*OBCL_14.5_Consol_Roll*/
    screenArgs['CONREF'] = document.getElementById("BLK_MASTER__CONFREFNO").value;
    screenArgs['PRODCODE'] = document.getElementById("BLK_MASTER__PRODUCTCODE").value;
    screenArgs['COUNTPARTY'] = document.getElementById("BLK_MASTER__COUNTERPARTY").value;
    screenArgs['USERREFNO'] = document.getElementById("BLK_MASTER__USEREFNO").value;
    //OBCL_27353639 starts
    screenArgs['CCY'] = document.getElementById("BLK_MASTER__CONTRACTCCY").value;
    screenArgs['STARTDATE'] = document.getElementById("BLK_CONSOL_MASTER__INTRATEFIXINGDATE").value;
	screenArgs['COMPONENT'] = document.getElementById("BLK_ROLL_RATES__COMPONENT").value;/*OBCL_14.5_Consol_Roll*/
	screenArgs['FLOATING_RATE_CODE'] = document.getElementById("BLK_ROLL_RATES__FLOATRATECODE").value;/*OBCL_14.5_Consol_Roll*/
	} catch (e) {}/*OBCL_14.5_Consol_Roll*/
	//OBCL_14.5_Consol_Roll start
	if ((document.getElementById("BLK_CONSOL_INT_RATE__COMPONENT").value != 'undefined' ) && (document.getElementById("BLK_CONSOL_INT_RATE__COMPONENT").value != "" )){
		try{
		screenArguments["CONTRACT"] = parent.document.getElementById("BLK_MASTER__CONFREFNO").value;
		screenArguments["PRODUCT"] = parent.document.getElementById("BLK_MASTER__PRODUCTCODE").value;
		screenArguments["COUNTERPARTY"] = parent.document.getElementById("BLK_MASTER__COUNTERPARTY").value;
		screenArguments["USEREFNO"] = parent.document.getElementById("BLK_MASTER__USEREFNO").value;
		
		//OBCL_27353639 starts
		screenArguments["CCY"] = parent.document.getElementById("BLK_MASTER__CONTRACTCCY").value;
		screenArguments["VALUEDATE"] = parent.document.getElementById("BLK_CONSOL_MASTER__INTRATEFIXINGDATE").value;
		screenArgs['COMPONENT'] = document.getElementById("BLK_CONSOL_INT_RATE__COMPONENT").value;
		screenArgs['FLOATING_RATE_CODE'] = document.getElementById("BLK_CONSOL_INT_RATE__FLOATRATECODE").value;
		} catch (e) {}
	  }
	//OBCL_14.5_Consol_Roll end
    /*var data_blk = "BLK_ROLL_RATES";
    try {
        var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
        for (var index = 0; index <= len; index++) {
            if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[13].getElementsByTagName("oj-input-text")[0].value == true) {
                    screenArgs['COMPONENT'] = getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[1].getElementsByTagName("oj-input-text")[0].value;
					screenArgs['FLOATING_RATE_CODE'] = getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value;//OBCL_14.4_SMTB#33014309 changes
                }
            }
        }
    } catch (e) {

        var data_blk2 = "BLK_CONSOL_INT_RATE";
        var len = getTableObjForBlock(data_blk2).tBodies[0].rows.length;
        for (var index = 0; index <= len; index++) {
            if (getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                if (getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[13].getElementsByTagName("oj-input-text")[0].value == true) {
                    screenArgs['COMPONENT'] = getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[1].getElementsByTagName("oj-input-text")[0].value;
					screenArgs['FLOATING_RATE_CODE'] =getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value;//OBCL_14.4_SMTB#33014309 changes
                }
            }
        }
    }*//*commenented as part of OBCL_14.5_Consol_Roll*/
    //OBCL_27353639 ends
    return true;
}

function fnPostLoad_CVS_ROIFX_KERNEL(screenArgs) {
	
    document.getElementById("BLK_MASTER__TXT_CONREF_LBCROIFX").value = screenArgs['CONREF'];
    document.getElementById("BLK_MASTER__TXT_PRODCODE_LBCROIFX").value = screenArgs['PRODCODE'];
    document.getElementById("BLK_MASTER__TXT_COUNPARTY_LBCROIFX").value = screenArgs['COUNTPARTY'];
    document.getElementById("BLK_MASTER__TXT_USERREFNO_LBCROIFX").value = screenArgs['USERREFNO'];
    //OBCL_27353639 starts
    document.getElementById("BLK_INTRATE_FIX__COMPONENT").value = screenArgs['COMPONENT'];
    document.getElementById("BLK_INTRATE_FIX__UI_CCY").value = screenArgs['CCY'];
    document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value = screenArgs['STARTDATE'];
	document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value = screenArgs['STARTDATE'];//OBCL_14.5_Consol_Roll
    //OBCL_27353639 ends
	//OBCL_14.4_SMTB#33014309 changes Starts
	//if ( (screenArgs["FLOATING_RATE_CODE"] != 'undefined' ) && (screenArgs["FLOATING_RATE_CODE"] != "")) {
	//	document.getElementById("BLK_INTRATE_FIX__RATE_CODE").value = screenArgs["FLOATING_RATE_CODE"];
	//	fnFetch();
	//}
	//OBCL_14.4_SMTB#33014309 changes Ends --Commented as part of OBCL_14.5_Consol_Roll.
	
	//OBCL_14.5_Consol_Roll start
	if ((document.getElementById("BLK_MASTER__TXT_CONREF_LBCROIFX").value =="") || (document.getElementById("BLK_MASTER__TXT_CONREF_LBCROIFX").value =='undefined')) {
		
        document.getElementById("BLK_MASTER__TXT_CONREF_LBCROIFX").value = parent.screenArguments["CONTRACT"];
        document.getElementById("BLK_MASTER__TXT_PRODCODE_LBCROIFX").value = parent.screenArguments["CONTRACT"];
        document.getElementById("BLK_MASTER__TXT_COUNPARTY_LBCROIFX").value = parent.screenArguments["COUNTERPARTY"];
        document.getElementById("BLK_MASTER__TXT_USERREFNO_LBCROIFX").value = parent.screenArguments["USEREFNO"];
		document.getElementById("BLK_INTRATE_FIX__COMPONENT").value = screenArgs['COMPONENT'];
		document.getElementById("BLK_INTRATE_FIX__UI_CCY").value = parent.screenArguments['CCY'];
		document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value = parent.screenArguments['VALUEDATE'];
		document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value = parent.screenArguments['VALUEDATE'];
	}
	
	if (document.getElementById("BLK_MASTER__TXT_CONREF_LBCROIFX").value =='undefined') {
		document.getElementById("BLK_MASTER__TXT_CONREF_LBCROIFX").value = '';
	}
	
	if (document.getElementById("BLK_MASTER__TXT_PRODCODE_LBCROIFX").value =='undefined') {
		document.getElementById("BLK_MASTER__TXT_PRODCODE_LBCROIFX").value = '';
	}
	
	if (document.getElementById("BLK_MASTER__TXT_COUNPARTY_LBCROIFX").value =='undefined') {
		document.getElementById("BLK_MASTER__TXT_COUNPARTY_LBCROIFX").value = '';
	}
	
	if (document.getElementById("BLK_MASTER__TXT_USERREFNO_LBCROIFX").value =='undefined') {
		document.getElementById("BLK_MASTER__TXT_USERREFNO_LBCROIFX").value = '';
	}
	
	if (document.getElementById("BLK_INTRATE_FIX__COMPONENT").value =='undefined') {
		document.getElementById("BLK_INTRATE_FIX__COMPONENT").value = '';
	}
	
	if (document.getElementById("BLK_INTRATE_FIX__UI_CCY").value =='undefined') {
		document.getElementById("BLK_INTRATE_FIX__UI_CCY").value = '';
	}
	
	if (document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value =='undefined') {
		document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value = '';
	}
	
	if (document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value =='undefined') {
		document.getElementById("BLK_INTRATE_FIX__RATE_EFFECTIVE_START_DATE").value = '';
	}
	if (document.getElementById("BLK_INTRATE_FIX__RATE_CODE").value =='undefined') {
		document.getElementById("BLK_INTRATE_FIX__RATE_CODE").value = '';
	}
	//OBCL_14.5_Consol_Roll end	
    
    //OBCL_14.4_SMTB#33014309 changes Starts
	if ( (screenArgs["FLOATING_RATE_CODE"] != 'undefined' ) && (screenArgs["FLOATING_RATE_CODE"] != "")) {
		document.getElementById("BLK_INTRATE_FIX__RATE_CODE").value = screenArgs["FLOATING_RATE_CODE"];
		fnFetch();
	}
	//OBCL_14.4_SMTB#33014309 changes Ends
    
    return true;
}

function fnPreLaunchForm_CVS_PARTSUM_KERNEL(screenArgs) {
	
    var borrRefNo = "";
    var tblObj = getTableObjForBlock("BLK_CONSOL_DETAIL").tBodies[0].rows;
    var chkd = false;
    for (var j = 0; j < tblObj.length; j++) {
        var isChkd = tblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;
        if (isChkd) {
            chkd = true;
            borrRefNo = getTableObjForBlock("BLK_CONSOL_DETAIL").tBodies[0].rows[j].cells[1].getElementsByTagName("oj-input-text")[0].value
        }

    }
    if (!chkd) {
        mask();
        showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    screenArgs['Product_Type'] = 'D';
    //screenArgs['PTREF'] = document.getElementById("BLK_MASTER__CONFREFNO").value;
    screenArgs['PTREF'] = borrRefNo;
    parent.screenArgs = screenArgs;
    return true;
}

//function fnPreLoad_CVS_EXRATE_FIXING(screenArgs) { //Bug#35078192
function fnPreLoad_CVS_EXRATE_FIXING_KERNEL(screenArgs) { //Bug#35078192
	
    screenArgs['CONREF'] = document.getElementById("BLK_MASTER__CONFREFNO").value;
    screenArgs['PRODCODE'] = document.getElementById("BLK_MASTER__PRODUCTCODE").value;
    screenArgs['COUNTPARTY'] = document.getElementById("BLK_MASTER__COUNTERPARTY").value;
    screenArgs['USERREFNO'] = document.getElementById("BLK_MASTER__USEREFNO").value;
    screenArgs['CONCCY'] = document.getElementById('BLK_MASTER__CONTRACTCCY').value;

    return true;
}

//function fnPostLoad_CVS_EXRATE_FIXING(screenArgs) {//Bug#35078192
function fnPostLoad_CVS_EXRATE_FIXING_KERNEL(screenArgs) {//Bug#35078192

    document.getElementById('BLK_MASTER__TXTPRO_LBCEXRFX').value = screenArgs['PRODCODE'];
    document.getElementById('BLK_MASTER__TXTCONREF_LBCEXRFX').value = screenArgs['CONREF'];
    document.getElementById('BLK_MASTER__TXTUSERREF_LBCEXRFX').value = screenArgs['USERREFNO'];
    document.getElementById('BLK_EXRATE_FIXING_DETAILS__CONTRACTCCY').value = screenArgs['CONCCY'];
	document.getElementById('BLK_MASTER__TXTCUST_LBCEXRFX').value = screenArgs['COUNTPARTY'] //Bug#35078192
    return true;
}

/*function fnPostAddRow_BLK_CONSOL_DETAIL_KERNEL(){
	var data_blk = "BLK_CONSOL_DETAIL";
	var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
	var amountType="";
	if (document.getElementById("BLK_CONSOL_MASTER__ROLLOVERAMTYPE").value){
            amountType=document.getElementById("BLK_CONSOL_MASTER__ROLLOVERAMTYPE").value; 
        }else if(document.getElementById("BLK_CONSOL_MASTER__ROLLOVERAMTYPE2").value){
            amountType=document.getElementById("BLK_CONSOL_MASTER__ROLLOVERAMTYPE2").value; 
       }
	if(amountType == 'P'){				
	
	for (var index = 0; index <= len; index++) {
		
		getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value = 0;
	
	}
	
	}
	return true;
}*/


/*function fnPostAddRow_BLK_ROLL_MARGIN_KERNEL(){
	var data_blk = "BLK_ROLL_MARGIN";
	var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
	//var marBasis="";
	for (var index = 0; index < len; index++) {
		
		var marBasis = getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value;
		var basisAmtTag = getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value;
		
		if(marBasis=='D' && basisAmtTag=='U'){
			if(index==0){
				document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI").readOnly = false;
			}else{
				document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI"+index).readOnly = false;
			}			
		}else{
			if(index==0){
				document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI").readOnly = true;
			}else{
				document.getElementById("BLK_ROLL_MARGIN__MARGINRATEI"+index).readOnly = true;
			}
		}
			
	
	}
	
	
	return true;
}	*/


/*function fnPostAddRow_BLK_CONSOL_MARGIN_KERNEL(){
	var data_blk = "BLK_CONSOL_MARGIN";
	var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
	//var marBasis="";
	for (var index = 0; index < len; index++) {
		
		//var marBasis = getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value;
		var basisAmtTag = getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[2].getElementsByTagName("oj-input-text")[0].value;
		
		if(basisAmtTag=='U'){
			if(index==0){
				document.getElementById("BLK_CONSOL_MARGIN__MARGINRATEI").readOnly = false;
			}else{
				document.getElementById("BLK_CONSOL_MARGIN__MARGINRATEI"+index).readOnly = false;
			}			
		}else{
			if(index==0){
				document.getElementById("BLK_CONSOL_MARGIN__MARGINRATEI").readOnly = true;
			}else{
				document.getElementById("BLK_CONSOL_MARGIN__MARGINRATEI"+index).readOnly = true;
			}
		}
			
	
	}
	
	
	return true;
}	*/

//OBCL_27325189 starts
var screenArguments = new Array();

function mySplit(str, ch) {
    var pos, start = 0,
        result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return (result);
}

function getText(elem) {
    if (getBrowser().indexOf("IE") != -1) {
        return elem.text;
    } else {
        return elem.textContent;
    }
}

function fnFetch() {
	
    var g_prev_gAction = gAction;
    gAction = "FETCH";
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
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_INTRATE_FIX"]/FV');
        if (RecnodeList.length > 0) {
            var RecnodeListLen = RecnodeList.length;
            for (var i = 0; i < RecnodeListLen; i++) {
                var TextContents = mySplit(getText(RecnodeList[i]), "~");
                document.getElementById("BLK_INTRATE_FIX__RATE").value = '';
                document.getElementById("BLK_INTRATE_FIX__RATE").value = '';

            }
        }
        gAction = g_prev_gAction;
        return false;
    }

    var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_INTRATE_FIX"]/FV');
    if (RecnodeList.length > 0) {
        var RecnodeListLen = RecnodeList.length;
        for (var i = 0; i < RecnodeListLen; i++) {
            var TextContents = mySplit(getText(RecnodeList[i]), "~");
            document.getElementById("BLK_INTRATE_FIX__RATE").value = TextContents[4];
            document.getElementById("BLK_INTRATE_FIX__RATE").value = TextContents[4];
        }
    }
    return true;
}

function fnPreSave_CVS_ROIFX_KERNEL(screenArgs) {
	
    if (document.getElementById("BLK_INTRATE_FIX__RATE").value != '') {
		//OBCL_14.5_Consol_Roll start
		try{
		   parent.document.getElementById("BLK_ROLL_RATES__FLOATRATECODE").value = document.getElementById("BLK_INTRATE_FIX__RATE_CODE").value;
		   parent.document.getElementById("BLK_ROLL_RATES__RATE").value = document.getElementById("BLK_INTRATE_FIX__RATE").value;
		   fireHTMLEvent(parent.document.getElementById("BLK_ROLL_RATES__RATE"),"onpropertychange");
	      
		} catch (e) {
		   parent.document.getElementById("BLK_CONSOL_INT_RATE__FLOATRATECODE").value = document.getElementById("BLK_INTRATE_FIX__RATE_CODE").value;
		   parent.document.getElementById("BLK_CONSOL_INT_RATE__RATE").value = document.getElementById("BLK_INTRATE_FIX__RATE").value;
		   fireHTMLEvent(parent.document.getElementById("BLK_CONSOL_INT_RATE__RATE"),"onpropertychange");		
		}
		//OBCL_14.5_Consol_Roll end
        /*var data_blk = "BLK_ROLL_RATES";
        try {
            var len = parent.getTableObjForBlock(data_blk).tBodies[0].rows.length;
            for (var index = 0; index <= len; index++) {
                if (parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                    if (parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[13].getElementsByTagName("oj-input-text")[0].value == true) {
                        //parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock("BLK_INTRATE_FIX__RATE_CODE").value; //OBCL_27353639 
                        parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock("BLK_INTRATE_FIX__RATE").value;
                        fireHTMLEvent(parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0], "onpropertychange");
                    }
                }
            }
        } catch (e) {
            var data_blk2 = "BLK_CONSOL_INT_RATE";
            var len = parent.getTableObjForBlock(data_blk2).tBodies[0].rows.length;
            for (var index = 0; index <= len; index++) {
                if (parent.getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                    if (parent.getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[13].getElementsByTagName("oj-input-text")[0].value == true) {
                        //parent.getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock("BLK_INTRATE_FIX__RATE_CODE").value; //OBCL_27353639
                        parent.getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock("BLK_INTRATE_FIX__RATE").value;
                        fireHTMLEvent(parent.getTableObjForBlock(data_blk2).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0], "onpropertychange");
                    }
                }
            }
        }*/

    }

    return true;
}
//OBCL_14.5_Consol_Roll start
function fnInTab_TAB_SPLIT_KERNEL() { 
	fnEnableIntDetBtn()
		return true;
}

function fnPostLoad_CVS_INT_DTLS_S_KERNEL(){	
    fnEnableElement(document.getElementById("BLK_CONSOL_INT_RATE__BTN_RATE_FIXING"));
	fnEnableElement(document.getElementById("BLK_CONSOL_INT_RATE__BTN_RATE_SETTINGS"));	
    return true;
}

function fnEnableIntDetBtn(){
	var noRows = getTableObjForBlock("BLK_SPLIT_ROLL").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
		fnEnableElement(getElementsByOjName("BTN_DEFAULT")[rowIndex]);					
    }
}
//OBCL_14.5_Consol_Roll end
//OBCL_27325189 ends

//Bug#35615226  Changes Starts
function fnInTab_TAB_MAIN_KERNEL() { 
if (gAction == 'EXECUTEQUERY') {
        return true;
    }   
   var consolidationType = "";
   if (document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").checked) {
       consolidationType = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE").value;
   } else if (document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE2").checked) {
       consolidationType = document.getElementById("BLK_CONSOL_MASTER__CONSOLIDATIONTYPE2").value;
   }

   if (consolidationType == 'S') {
       disableTabs("TAB_NORMAL");
       fnDisableElement(document.getElementById("TAB_NORMAL"));                             
       fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDATEI"));
       fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDAYSI"));
       fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__ROLLBY"));
       fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__INTPARMBASIS"));
       fnDisableElement(document.getElementById("BLK_CONSOL_MASTER__LIQDINTPREPAYMENT"));
       enableTabs("TAB_SPLIT");                             
   } else {
       enableTabs("TAB_NORMAL"); 
       fnEnableElement(document.getElementById("TAB_NORMAL"));                            
       fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDATEI"));
       fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__MATURITYDAYSI"));
       fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__ROLLBY"));
       fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__INTPARMBASIS"));
       fnEnableElement(document.getElementById("BLK_CONSOL_MASTER__LIQDINTPREPAYMENT"));
       disableTabs("TAB_SPLIT");          
   }                  
    return true;
}
//Bug#35615226  Changes Ends