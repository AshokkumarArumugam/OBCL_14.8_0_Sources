/*----------------------------------------------------------------------------------------------------
**
** File Name    : BatchUtil.js
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

Copyright © 2004-2014   by Oracle Financial Services Software Limited..

**  Modified By          : Neethu Sreedharan
**  Modified On          : 22-Sep-2016
**  Modified Reason      : Error handling in BatchUtil.js done
**  Retro Source         : 9NT1606_12_0_2_PILATUS_BANK_LTD
**  Search String        : 9NT1606_12_2_RETRO_12_0_2_23653186
**
** Modified By           : Nalandhan G
** Modified On           : 22-Aug-2017
** Modified Reason       : Added the error code to dispaly it in the global language
** Retro String          : Bug#26620864
** Search string         : 9NT1606_12_4_RETRO_12_1_26658841
---------------------------------------------------------------------------------------------------- 
*/
var currBrn = "";
var objHTTP = createHTTPActiveXObject();
function fnPostAsync(fcjMsgDOM, servletURL, functionID, callbackMethod)
{
    if (fcjMsgDOM != null)
    {
        var strFormData = getXMLString(fcjMsgDOM);
        objHTTP.open("POST", servletURL, true);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("FUNCTIONID", functionID);
        objHTTP.setRequestHeader("OPERATION", gAction);
        // Added for txn branch
        objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        if (strFormData.indexOf("<ATTACHMENTS>") > -1)
        {
            objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
        } else
        {
            objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
        }
        if (typeof(callbackMethod) != 'undefined' && callbackMethod != null) 
			objHTTP.onreadystatechange = callbackMethod ;
			objHTTP.send(strFormData);
    }
}

function buildHeader()
{
    var fcjRequest = '<FCUBS_HEADER>';
    fcjRequest += '<SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP>';
    fcjRequest += '<USERID>' + mainWin.UserId + '</USERID>';
    fcjRequest += '<BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE>' + functionId + '</SERVICE>';
    fcjRequest += '<OPERATION>' + gAction + '</OPERATION><MULTITRIPID/>';
    fcjRequest += '<FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>' + gAction + '</ACTION><MSGSTAT/>';
    fcjRequest += '</FCUBS_HEADER>';
    return fcjRequest;
}

function callback_ST()
{
    if (objHTTP.readyState == 4) if (objHTTP.status != 200)
    //alert("failed");
    //CHANGES FOR NLS
    alert(mainWin.getItemDesc("LBL_FAILED"));
    else alert(retrieveMessage(getNodeText(objHTTP.responseXML), ''));
}
//Kathish added the code to get Where condition for the query consisting of Auth stat and Record Stat
function populateScreen()
{
    var fcjRequest = '<FCJMSG SRC="FLEXCUBE" BRANCH="' + mainWin.CurrentBranch + '" USERID="' + mainWin.UserId + '">';
    fcjRequest += '<MAINTQRY TYPE="N" ROOTTABLE="STTM_BRANCH" QUERYFROM="" QUERYORDERBY="STTM_BRANCH.BRANCH_CODE ASC" SUMFN="BRANCH_CODE~END_OF_INPUT">';
    fcjRequest += '<TABLE ID="STTM_BRANCH"></TABLE>';
    fcjRequest += '<WHERE>AUTH_STAT=\'A\' AND RECORD_STAT=\'O\'</WHERE>';
    fcjRequest += '<ORDERBY>STTM_BRANCH.BRANCH_CODE ASC </ORDERBY>';
    fcjRequest += '</MAINTQRY>';
    fcjRequest += '</FCJMSG>';
    fcjRequestDOM = loadXMLDoc(fcjRequest);
    gAction = "EXECUTEQUERY";
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    populateTable();
}

function enableItems()
{
    document.getElementById("BTN_OK").disabled = false;
    document.getElementById("BTN_OK").onclick = fnStartEOD;
    document.getElementById("BTN_EXIT").onclick = function()
    {
        fnDirectClose();
    };
    document.getElementById("SELECT_CRITERIA").disabled = false;
    document.getElementById("SELECT_TIME_LEVEL").disabled = false;
    document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
    document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].onclick = enableAllActions;//TODO
}

var batchPreEODStart = 'BATCHPREEODSTART';
var batchEODStart = 'BATCHEODSTART';
function fnStartEOD()
{
    fcjRequestDOM = loadXMLDoc("");
    fcjResponseDOM= loadXMLDoc("");
    gAction = batchPreEODStart;
    fcjRequestDOM = loadXMLDoc("<FCUBS_REQ_ENV>" + buildHeader() + "<FCUBS_BODY><REC><FV></FV></REC></FCUBS_BODY></FCUBS_REQ_ENV>");
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (getNodeText(fcjResponseDOM.childNodes[0]) == 'S')
    {
        gAction = batchEODStart;
        fcjRequestDOM = loadXMLDoc(buildEODRequest());
        var ok = confirm("Do you want to continue?");
        if (ok)
        {
            fnPostAsync(fcjRequestDOM, servletURL, functionId, fnGetDateChgResp);
            alert(retrieveMessage('ST-EOD001', ''));
            document.getElementById("BTN_OK").disabled = true;
        }
    } else
    {
        var error_code = getNodeText(fcjResponseDOM);
        ShowErrorDialog('E', error_code + " " + retrieveMessage(error_code, ''));
    }
}

function buildEODRequest()
{
    var fcjRequest = '<FCUBS_REQ_ENV>';
    fcjRequest += buildHeader();
    fcjRequest += '<FCUBS_BODY>';
    fcjRequest += msgxml;
    var recs = document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows.length;
    var numberOfSelectedRecs = 0;
    for (var indexRows = 0; indexRows < recs; indexRows++)
    {
        if (document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[indexRows].getElementsByTagName("INPUT")[0].checked)
        {
            numberOfSelectedRecs++;
            fcjRequest += '<REC TYPE="STTMS_BRANCH" RECID="' + (numberOfSelectedRecs) + '"><FV>';
            fcjRequest += document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[indexRows].getElementsByTagName("INPUT")[1].value;
            fcjRequest += "~" + document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[indexRows].getElementsByTagName("SELECT")[0].value;
            fcjRequest += "~" + document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[indexRows].getElementsByTagName("INPUT")[3].checked;
            fcjRequest += '</FV></REC>';
        }
    }
    fcjRequest += '<MISC><REMARKS/></MISC></FCUBS_BODY></FCUBS_REQ_ENV>';
    return fcjRequest;
}

var tableName = "BLK_STTMS_BRANCH";
var dbTableName = "STTMS_BRANCH";

function populateTable()
{
    var recs = selectNodes(fcjResponseDOM,"//FV");
    if (recs)
    {
        for (var index = 0; index < recs.length; index++)
        {
            fnInsertNewRowForMultipleEntry('All', dbTableName, tableName);
            document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[index + 1].cells[0].getElementsByTagName("INPUT")[0].onclick = enableAction;//TODO EVENT NEED TO PASS
            setInnerText(document.getElementsByName("BRANCH_CODE")[index], getNodeText((recs[index]).split("~")[0]));
            var eoc_Level = getNodeText(recs[index]).split("~")[1];
            //Added Newly by Kathish for FCUBS10ITR1 SFR No.1154
            var tableRef1 = document.getElementById("BLK_STTMS_BRANCH");
            var rows1 = tableRef1.tBodies[0].rows;
            var l_ChkBoxVal;
            switch (eoc_Level)
            {
            case 'T':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[1]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            case 'X':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[2]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            case 'F':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[3]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            case 'X':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[4]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            case 'E':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[5]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            case 'X':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[6]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            case 'B':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[7]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            case 'N':
                document.getElementsByName("CURRENT_STATUS")[index].value = getInnerText(document.getElementsByName("END_OF_INPUT")[index].children[8]);
                rows1[index].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
                break;
            }
        }
    }
}

function enableAction()
{
    var srcElem = getEventSourceElement(event);
    var targetParent = srcElem.parentNode.parentNode;
    enableEND_OF_INPUT(targetParent, srcElem.checked);
}
function enableAllActions()
{
    var srcElem = getEventSourceElement(event);
    recs = document.getElementById("BLK_STTMS_BRANCH").rows.length;
    var enable = false;
    if (srcElem.checked) enable = true;
    for (var index = 1; index < recs; index++)
    {
        var targetParent = document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[index];
        targetParent.cells[0].getElementsByTagName("INPUT")[0].checked = enable;
        enableEND_OF_INPUT(targetParent, enable);
    }
}
function enableEND_OF_INPUT(targetParent, enable)
{
    if (enable)
    {
        targetParent.getElementsByTagName("SELECT")[0].disabled = false;
        targetParent.getElementsByTagName("SELECT")[0].className = "SELECTList";
        targetParent.getElementsByTagName("SELECT")[0].selectedIndex = document.getElementById("SELECT_CRITERIA").selectedIndex;
        targetParent.getElementsByTagName("INPUT")[3].disabled = false;
        targetParent.getElementsByTagName("INPUT")[3].checked = document.getElementById("SELECT_TIME_LEVEL").checked
    } else
    {
        targetParent.getElementsByTagName("SELECT")[0].selectedIndex = 0;
        targetParent.getElementsByTagName("SELECT")[0].className = "TextDisabled";
        targetParent.getElementsByTagName("SELECT")[0].disabled = true;
        targetParent.getElementsByTagName("INPUT")[3].disabled = true;
        targetParent.getElementsByTagName("INPUT")[3].checked = false;
    }
}
function selectActivity()
{
    var srcElem = getEventSourceElement(event);
    recs = document.getElementById("BLK_STTMS_BRANCH").rows.length;
    for (var index = 0; index < recs - 1; index++)
    {
        if (!document.getElementsByName("END_OF_INPUT")[index].disabled)
        {
            document.getElementsByName("END_OF_INPUT")[index].selectedIndex = srcElem.selectedIndex;
        }
    }
}

function selectTimeLevel()
{
    var srcElem = getEventSourceElement(event);
    recs = document.getElementById("BLK_STTMS_BRANCH").rows.length;
    for (var index = 0; index < recs - 1; index++)
    {
        if (!document.getElementsByName("TIME_LEVEL")[index].disabled)
        {
            document.getElementsByName("TIME_LEVEL")[index].checked = srcElem.checked;
        }
    }
}

var fontColor = '';
var selectedRec = null; //current select Row in Table
var objHTTP = createHTTPActiveXObject();
var eocStatus = '';
var batchEodStatus = 'BATCHEODSTATUS';
batchReRun = 'BATCHEODRERUN';
function getEOCStatus()
{
    document.getElementById("EOD_STATUS").readOnly = true; //30-Aug-07
    if (!fcjRequestDOM) return false;
    var requestXML = getXMLString(fcjRequestDOM);
    fcjRequestDOM = loadXMLDoc(buildStatusRequest());
    var Action = gAction;
    gAction = batchEodStatus;
    fnPostAsync(fcjRequestDOM, servletURL, detailFuncId, callback1);
	gAction = Action;
    fcjRequestDOM = loadXMLDoc(requestXML);

}
function buildStatusRequest()
{
    var Action = gAction;
    gAction = batchEodStatus;
    var FuncId = detailFuncId;
    var fcjRequest = '<FCUBS_REQ_ENV>';
    fcjRequest += buildHeader();
    fcjRequest += '<FCUBS_BODY></FCUBS_BODY></FCUBS_REQ_ENV>';
    gAction = Action;
    return fcjRequest;
}

function fnDoPostExecuteQuery()
{
    selectedRec = null;
    document.getElementById("QryRslts").getElementsByTagName("THEAD")[0].rows[0].getElementsByTagName("INPUT")[0].disabled = true;//fix for 18260990 
    var recs = document.getElementById("QryRslts").getElementsByTagName("TBODY")[0].rows;
    try
    {
        for (var index = 0; index < recs.length; index++)
        {
            recs[index].cells[0].getElementsByTagName("INPUT")[0].onclick = checkForAborted;//TODO
            fireHTMLEvent(recs[index].cells[0], "onclick");//fix for 18260990
            if (getInnerText(recs[index].cells[3]).trim() == 'A')//fix for 18260990
            {
                fontColor = recs[index].style.color;
                recs[index].style.color = 'red';
            }
        }
    } catch(e)
    {}
}

function fnExecuteAborted()
{
    var requestXML = getXMLString(fcjRequestDOM);
    if (selectedRec && selectedRec.cells && selectedRec.cells[0].getElementsByTagName("INPUT")[0].checked && getInnerText(selectedRec.cells[3]) == 'A' && getInnerText(selectedRec.cells[4]) != '0')
    {
        fcjRequestDOM =loadXMLDoc(buildReRunRequest());
        var ok = confirm("Do you want to continue?");
        if (ok) fnPostAsync(fcjRequestDOM, servletURL, functionId, callback2);
    }
    fcjRequestDOM = loadXMLDoc(requestXML);
}

function buildReRunRequest()
{
    gAction = batchReRun;
    var fcjRequest = '<FCUBS_REQ_ENV>';
    fcjRequest += buildHeader();
    fcjRequest += '<FCUBS_BODY>';
    fcjRequest += msgxml;

    fcjRequest += '<REC TYPE="STTMS_BRANCH" RECID="1"><FV>';
    if (selectedRec && selectedRec != null)
    {
        fcjRequest += getInnerText(selectedRec.cells[1]);
        fcjRequest += "~" + getInnerText(selectedRec.cells[2]);
        fcjRequest += "~" + getInnerText(selectedRec.cells[4]);
    }
    fcjRequest += '</FV></REC>';
    fcjRequest += '<MISC><REMARKS/></MISC></FCUBS_BODY></FCUBS_REQ_ENV>';
    return fcjRequest;
}
function callback1()
{
    if (objHTTP.readyState == 4) if (objHTTP.status != 200)
    //alert("failed");
    //CHANGES FOR NLS
    alert(mainWin.getItemDesc("LBL_FAILED"));
    else
    {
        if (getNodeText(objHTTP.responseXML) != '') document.getElementById("EOD_STATUS").value = retrieveMessage(getNodeText(objHTTP.responseXML));
    }
}
function callback2()
{
    if (objHTTP.readyState == 4) if (objHTTP.status != 200)
    //alert("failed");
    //CHANGES FOR NLS
    alert(mainWin.getItemDesc("LBL_FAILED"));
    else
    {
        alert(retrieveMessage('ST-ID0002', ''));
        fnRefresSum_Overloaded();
    }
}

function checkForAborted(event)//fix for 18260990
{
    var srcElem = getEventSourceElement(event);
	/*Fix for 17947068*/
    //if (getInnerText(srcElem.parentNode.parentNode.cells[3]) != 'A' || getInnerText(srcElem.parentNode.parentNode.cells[4]) == '0')
	/*Fix for 18093619 starts*/
	//if (getInnerText(srcElem.parentNode.parentNode.cells[3]) != 'A' || getInnerText(srcElem.parentNode.parentNode.parentNode.cells[4]) == '0')
	if (getInnerText(srcElem.parentNode.parentNode.parentNode.cells[3]).trim() != 'A' || getInnerText(srcElem.parentNode.parentNode.parentNode.cells[4]) == '0') /*Fix for 18093619 ends*///fix for 18260990
    { //30-Aug-07
        srcElem.checked = false;
    } else
    {
		/*Fix for 17947068 starts*/
        //if (selectedRec && selectedRec != null && selectedRec != srcElem.parentNode.parentNode) selectedRec.cells[0].getElementsByTagName("INPUT")[0].checked = false;
		//selectedRec = srcElem.parentNode.parentNode;
		if (selectedRec && selectedRec != null && selectedRec != srcElem.parentNode.parentNode.parentNode) selectedRec.cells[0].getElementsByTagName("INPUT")[0].checked = false;
        selectedRec = srcElem.parentNode.parentNode.parentNode;
		/*Fix for 17947068 Ends*/
    }
}

function fnClearEODStatus()
{
    document.getElementById("EOD_STATUS").value = "";
}

var batchPreID = 'BATCHPREINTRADAY';
var batchStartID = 'BATCHSTARTINTRADAY';
function exeBatch()
{
    if (document.getElementById("AETBS_FUNC_MASTER__FUNCTION_ID").value == '') return false;
    var requestXML = null;
	if (fcjRequestDOM != null)
		requestXML = getXMLString(fcjRequestDOM);
    gAction = batchPreID;
    fcjRequestDOM = loadXMLDoc(buildIDRequest());
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (getNodeText(fcjResponseDOM.childNodes[0]) == 'S')
    {
        gAction = batchStartID;
        fcjRequestDOM = loadXMLDoc(buildIDRequest());
		mask();		
		//showAlerts(fnBuildAlertXML("", "I", "Do you want to continue?"), "C"); //9NT1606_12_4_RETRO_12_1_26658841 Commented
		showAlerts(fnBuildAlertXML("BA-BABID01", "I"), "C"); //9NT1606_12_4_RETRO_12_1_26658841  Added 
		alertAction = "PREINTRADAYBATCH";
    } else
    {
        //var err_code = getNodeText(fcjResponseDOM); //9NT1606_12_2_RETRO_12_0_2_23653186 changes
		var err_code = getNodeText(selectSingleNode(fcjResponseDOM,"//RESP")); //9NT1606_12_2_RETRO_12_0_2_23653186 changes
        mask();
        showAlerts(fnBuildAlertXML(err_code,"E"),"E");
        alertAction = "UNMASK";
    }
    if (requestXML != null)
		fcjRequestDOM = loadXMLDoc(requestXML);
}

function buildIDRequest()
{
    var fcjRequest = '<FCUBS_REQ_ENV>';
    fcjRequest += buildHeader();
    fcjRequest += '<FCUBS_BODY>';
    fcjRequest += msgxml;
	//FCUBS10.5- ITR1 SFR#548
    fcjRequest += '<REC TYPE="STTMS_BRANCH" RECID="1"><FV><![CDATA[';

    if (functionId == 'BABIDBAT')
    { //Intra Day Batch screen
        fcjRequest += document.getElementById("AETBS_FUNC_MASTER__FUNCTION_ID").value; //function id
        fcjRequest += '~' + document.getElementById("AETBS_FUNC_MASTER__EOC_GROUP").value; //EOC group
        fcjRequest += '~' + document.getElementById("AETBS_FUNC_MASTER__BRANCH_CODE").value; //Branch
    } else
    {
        fcjRequest += getInnerText(selectedRec.cells[2]);
        fcjRequest += '~' + getInnerText(selectedRec.cells[8]);
        fcjRequest += '~' + getInnerText(selectedRec.cells[1]);
        fcjRequest += '~' + getInnerText(selectedRec.cells[9]);
    }
	//FCUBS10.5- ITR1 SFR#548
    fcjRequest += ']]></FV></REC>';
    fcjRequest += '<MISC><REMARKS/></MISC></FCUBS_BODY></FCUBS_REQ_ENV>';
    return fcjRequest;
}

function callback_ID()
{
    if (objHTTP.readyState == 4) if (objHTTP.status != 200)
    //alert("failed");
    //CHANGES FOR NLS
    alert(mainWin.getItemDesc("LBL_FAILED"));
    else
    {
        /*Fix for 18093619 starts*/
		/*alert(retrieveMessage('ST-ID0002', ''));
        fnExecuteQuery();*/
		showErrorAlerts('ST-ID0002');
		/*Fix for 18093619 ends*/
    }
}

function fnStartIntraDayBatch(event)//fix for 18260990
{
    var requestXML = getXMLString(fcjRequestDOM);
    if (selectedRec && selectedRec != null)
    {
        gAction = batchStartID;
        fcjRequestDOM = loadXMLDoc(buildIDRequest());
        fnPostAsync(fcjRequestDOM, servletURL, functionId, callback_ID);
		fnExecuteQuery('',event); /*Fix for 18093619 - added*/
        gAction = "";
    }
    fcjRequestDOM = loadXMLDoc(requestXML);
}

function fnGetDateChgResp()
{
    if (objHTTP.readyState == 4)
    {
        if (objHTTP.status == 200)
        {
            gAction = "BATCHCHGBRNDT";
            var totalRows = document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows.length;
            for (var currRow = 0; currRow < totalRows; currRow++)
            {
                if (document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[currRow].getElementsByTagName("INPUT")[1].value == mainWin.CurrentBranch && document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[currRow].getElementsByTagName("INPUT")[0].checked)
                {
                    currBrn = mainWin.CurrentBranch;
                    var fcjRequest = '<FCUBS_REQ_ENV>';
                    fcjRequest += buildHeaderDtChg();
                    fcjRequest += '<FCUBS_BODY>';
                    fcjRequest += '<FLD>';
                    fcjRequest += '<FN ISQUERY="0" PARENT="" RELATION="" TYPE="STTM_DATES">BRANCH_CODE~TODAY</FN>';
                    fcjRequest += '</FLD>';
                    fcjRequest += '<REC TYPE="STTMS_DATES"><FV>';
                    fcjRequest += document.getElementById("BLK_STTMS_BRANCH").tBodies[0].rows[currRow].getElementsByTagName("SELECT")[0].value;
                    fcjRequest += '</FV></REC>';
                    fcjRequest += '</FCUBS_BODY></FCUBS_REQ_ENV>';
                }
            }
            fcjRequestDOM = loadXMLDoc(fcjRequest);
            if (currBrn != "")
            {
                fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
                var respString = getNodeText(selectSingleNode(fcjResponseDOM,"RESP"));
                if (respString.indexOf("~") != -1)
                {
                    var finalResp = respString.split("~");
                    var todaysDate = finalResp[0];
                    var dateComp = todaysDate.split("-", -1);
                    var strEODInputLabelDesc = "";
                    if (finalResp[1] == "N")
                    {
                        strEODInputLabelDesc = "LBL_TRANSACTION_INPUT";
                    } else if (finalResp[1] == "B")
                    {
                        strEODInputLabelDesc = "LBL_BEGIN_OF_DAY";
                    } else if (finalResp[1] == "F")
                    {
                        strEODInputLabelDesc = "LBL_END_FIN_INPUT";
                    } else if (finalResp[1] == "E")
                    {
                        strEODInputLabelDesc = "LBL_END_OF_DAY";
                    } else if (finalResp[1] == "T")
                    {
                        strEODInputLabelDesc = "LBL_END_TRANSAC_INPUT";
                    }
                    var brnStatusDesc = mainWin.getItemDesc(strEODInputLabelDesc);
                    var nextWrkingDay = getSystemShortDate(parseInt(dateComp[0], 10), parseInt(dateComp[1], 10), parseInt(dateComp[2], 10));
                    var currTitle = mainWin.document.title.split("-");
                    mainWin.document.title = currTitle[0] + '   -   ' + currTitle[1] + '   -   ' + currTitle[2] + '   -   ' + currTitle[3] + '   -   ' + nextWrkingDay + '   -   ' + currTitle[5] + '   -   ' + brnStatusDesc;
                } else
                {
                    var strEODInputLabelDesc = "";
                    if (respString == "N")
                    {
                        strEODInputLabelDesc = "LBL_TRANSACTION_INPUT";
                    } else if (respString == "B")
                    {
                        strEODInputLabelDesc = "LBL_BEGIN_OF_DAY";
                    } else if (respString == "F")
                    {
                        strEODInputLabelDesc = "LBL_END_FIN_INPUT";
                    } else if (respString == "E")
                    {
                        strEODInputLabelDesc = "LBL_END_OF_DAY";
                    } else if (respString == "T")
                    {
                        strEODInputLabelDesc = "LBL_END_TRANSAC_INPUT";
                    }
                    var brnStatusDesc = mainWin.getItemDesc(strEODInputLabelDesc);
                    var currTitle = mainWin.document.title.split("-");
                    mainWin.document.title = currTitle[0] + '   -   ' + currTitle[1] + '   -   ' + currTitle[2] + '   -   ' + currTitle[3] + '   -   ' + currTitle[4] + '   -   ' + currTitle[5] + '   -   ' + brnStatusDesc;
                }
            }
        }
    }
    /*      if (objHTTP.status != 200)	  
       alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_FAILED"));
      else{                 
        if(objHTTP.responseXML.text != '')
          document.getElementById("EOD_STATUS").value = retrieveMessage(objHTTP.responseXML.text);            
      } */
}

function buildHeaderDtChg()
{

    var fcjRequest = '<FCUBS_HEADER>';
    fcjRequest += '<SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP>';
    fcjRequest += '<USERID>' + mainWin.UserId + '</USERID>';
    fcjRequest += '<BRANCH>' + currBrn + '</BRANCH><SERVICE>' + functionId + '</SERVICE>';
    fcjRequest += '<OPERATION>' + gAction + '</OPERATION><MULTITRIPID/>';
    fcjRequest += '<FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>' + gAction + '</ACTION><MSGSTAT/>';
    fcjRequest += '</FCUBS_HEADER>';
    return fcjRequest;
}
