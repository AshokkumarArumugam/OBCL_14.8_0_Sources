/*----------------------------------------------------------------------------------------------------
**
** File Name    : GlobalSummary.js
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

Copyright © 2004-2016   by Oracle Financial Services Software Limited..

**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Jun-2017 
**  Modified Reason      : Issue in screen saved query tab with different query criteria is fixed 
**  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230510 

**  Modified By          : Neethu Sreedharan
**  Modified On          : 05-Jul-2017 
**  Modified Reason      : Code Changes done to correct the alignment of Saved query screen 
**  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_4_RETRO_12_2_26229997 

**  Modified By          : Neethu Sreedharan
**  Modified On          : 25-Jul-2017 
**  Modified Reason      : The issue of getting server processing failed while clicking on the column to do sorting is fixed 
**  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_4_RETRO_12_2_26384512   

**  Modified By          : Ambika Selvaraj
**  Modified On          : 14-Nov-2017 
**  Modified Reason      : During on load of non-extensible summary screens "FETCH PER PAGE DROP DOWN
                           BUTTON" was disabled hence user not able to chose the no of records by
                           default only 15 were fetching.
**  Search String        : 9NT1606_12_4_RETRO_12_0_3_27107088

**  Modified By          : Ambika Selvaraj
**  Modified On          : 24-Nov-2017 
**  Modified Reason      : In the summary screen, if user tries to sort the columns on clicking on the particular column, 
                           code added to get the order type if its null, reset the order sequence and to fetch the 
						   element field name for sorting.
**  Search String        : 9NT1606_12_4_RETRO_12_1_26709644

**  Modified By          : Siva Kamisetti
**  Modified On          : 11-Mar-2020
**  Modified Reason      : Column width expanding when clicked.
**  Search String        : Bug_30867720

**  Modified By          : Sabyasachi Routray
**  Modified On          : 01-Jun-2020
**  Modified Reason      : Date format is not proper wrt user settings in non extensible summary screens
**  Search String        : Bug_31382929
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 15-Sep-2020
**  Modified Reason      : Code correction done to use the local CCY when related CCY filed is undefined.
**  Search String        : 9NT1606_14_4_OFSS_CONSULTING_31868197

**  Modified By          : Arunkumar R
**  Modified On          : 17-June-2021
**  Modified Reason      : Fix has been provided to invoke the fnPostExecuteQuery_Summary function on sort 
						   operation so that the same is invoked if it is available as part of respective function ID js.
**  Search String        : FCUBS_MEGA_14.3_32985564
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 10-May-2021
**  Modified Reason      : Changes done to display records in non extensible summary screen via Firefox browser.
**  Search String        : REDWOOD_35273040
**
**  Modified By          : Manoj S
**  Modified On          : 08-Aug-2023
**  Modified Reason      : Commented exitising code for advance search results handling
**  Search String        : REDWOOD_35660960
**
**  Modified By          : Meenakshi
**  Modified On          : 28-April-2023
**  Modified Reason      : Hook for kernel provided.
**  Search String        : REDWOOD_35428174
**
**  Modified By          : Divya Alagappan
**  Modified On          : 29-Aug-2024
**  Modified Reason      : Screen was getting hang while trying to edit Saved Query 
**  Search String        : Bug_37004227
**  Base Bug             : 26230635
----------------------------------------------------------------------------------------------------
*/
/* Variables from Tmp_Summary.xsl - Starts Here */
	var gscrPos = null;
	var l_LablesArr = null;
        var l_QryOrdArr = null;
/* Variables from Tmp_Summary.xsl - Ends Here */

/* Declare global variables */
var gCurrentPage = 0;
var gTotalPages = 0;
var gRecordPages = 0;
var celIndex;
var submitQuery = false;
//REDWOOD_CHANGES
var tempArrayDataProvider;
var pagingDataProviderView;
var selectControl={};
var auditControl={};
var selectArrayProvider={};
var multipleEntryFieldList=[];
var meArrayForAddDelete = {};  
//REDWOOD_CHANGES
var bolAnythingToSend = false;
var arrAuthorizedRecordPosition = new Array();
var arrAuthorizedRecordValue = new Array();
var arrMakerCheckerSamePosition = new Array();
var arrMakerCheckerSameValue = new Array();
var detailWinParams = new Object();
var gAuthRequestXML;
var gAbsolutePosition = -1;
var authModNo = "";
var gRecordCountForAuth = 0;
//Array isRecClicked and isAuthCliced added by Sankarganesh on 03/05/05
var isRecClicked = new Array();
var isAuthClicked = new Array();
var arrProviderAuditLegend;	//REDWOOD_CHANGES
var arrRecordPositions = new Array();
//Stored the Values of check box values. Used During Authorization.
var checkBoxValues = new Array();
var lastRequestTS = null;
var l_LastQryFcjRequestDOM = null;
var sumTxnBranch="";
var respDom = "";
var advCriteriaList = "";
var forNumber = new Array(6);
var forText = new Array(4);
/*16861535 Fix starts*/
var lovHtml   = "";
var lovHtml1  = "";
/*16861535 Fix ends*/
//REDWOOD_CHANGES
var recommendedListView;
var optionalListView;
//REDWOOD_CHANGES
forNumber[0] = new Option(mainWin.getItemDesc("LBL_EQUAL"), " = ", false, false);
forNumber[1] = new Option(mainWin.getItemDesc("LBL_NOTEQUAL"), " <> ", false, false);
forNumber[2] = new Option(mainWin.getItemDesc("LBL_GREATER_EQUAL"), " >= ", false, false);
forNumber[3] = new Option(mainWin.getItemDesc("LBL_LESS_EQUAL"), " <= ", false, false);
forNumber[4] = new Option(mainWin.getItemDesc("LBL_GREATER"), " > ", false, false);
forNumber[5] = new Option(mainWin.getItemDesc("LBL_LESS"), " < ", false, false);
forNumber[6] = new Option(mainWin.getItemDesc("LBL_BETWEEN"), " between ", false, false);

forText[0] = new Option(mainWin.getItemDesc("LBL_EQUAL"), " = ", false, false);
forText[1] = new Option(mainWin.getItemDesc("LBL_NOTEQUAL"), " <> ", false, false);
forText[2] = new Option(mainWin.getItemDesc("LBL_LIKE"), " Like ", false, false);
forText[3] = new Option(mainWin.getItemDesc("LBL_NOTLIKE"), " NOT Like ", false, false);

var exitFlag = false;
var gSummaryOpened = false;
var imgPath = "Images/" + strTheme.substring(0, strTheme.indexOf(".css"));
var invalidSQL = mainWin.getItemDesc("LBL_INVALID_SQL");
var moreRecord = mainWin.getItemDesc("LBL_MORE_RECORDS");
var noRecord = mainWin.getItemDesc("LBL_NO_RECORD");
var selectElement = mainWin.getItemDesc("LBL_SELECT_ELEMENT");
var lblServerFailed = mainWin.getItemDesc("LBL_SERVER_FAILED");
var lblPageNotExist = mainWin.getItemDesc("LBL_PAGE_NO_NOT_EXIST");
var tmpcriteriaName = "";
var tmpremarks = "";
//Added for 17077004 start
var currQryCriteriaName = "";
var currQryCriteriaRemarks = "";
 //Added for 17077004 end

/*
 * return whether the currently selected tab is
 * Query, Summary or Advanced
 */
function gGetCurrentTab(){
    var tabTR = document.getElementById("TRTab");
    var tabTDs = tabTR.getElementsByTagName("TD");

    //First make all tabs invisible
    var numTabs = tabTDs.length - 1;
    for (var idx = 0; idx < numTabs; idx++)
    {
        var tmpTab = document.getElementById("TBLPage" + tabTDs[idx].id);
        if (tmpTab.style.display == "")
        {
            return (tmpTab.id.substr(9));
        }
    }
}

/********************************** Advanced Criteria Functionality *************************/

function fnClearQuery() {
    try {	
//REDWOOD_CHANGES
        var advQryTblRows = getTableObjForBlock("idadvQuryHeaderTable").tBodies[0].rows;
        for (i = 0;i < advQryTblRows.length;i++) {
            if(advQryTblRows[i].cells[0].children.length > 0 && advQryTblRows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                meArrayForAddDelete['advQuery'].splice(i, 1);
            }
        }
    } catch (e) {
        alert(e);
    }
    document.getElementById("idadvQuryHeaderTable").refresh();
}

function fnClearOrderBy() {
    try {
        var advOdrTblRows = getTableObjForBlock("idadvOrderHeaderTable").tBodies[0].rows;
        for (i = 0;i < advOdrTblRows.length;i++) {
            if(advOdrTblRows[i].cells[0].children.length > 0 && advOdrTblRows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                meArrayForAddDelete['advOrderBy'].splice(i, 1);
                }
            }
    } catch (e) {
        alert(e);
    }
    document.getElementById("idadvOrderHeaderTable").refresh();
}


function fnAcceptOrderBy() {
    var selOption;
    //12.1 summary performance changes start
    var selField =selectedFields.split('~');
    //12.1 summary performance changes end
    var selDir = document.getElementById("idSelectSortDirection");
    
    //Ojet changes - Sujitha
    var singleRecObj = Object.assign( {
        },
        multipleEntryFieldList[multipleEntryFieldList['advOrderBy']]);
        
        singleRecObj['orderByField'] = selField[0].split("__")[1];
        singleRecObj['orderByValue'] = selDir.value;
        
        meArrayForAddDelete['advOrderBy'].push(singleRecObj);
}

function fnClearQuery_old() {
    try { 			
//REDWOOD_CHANGES
        var table = document.getElementById("idadvQuryTable").tBodies[0]; 
        var rowCount = table.rows.length; 
  
        for(var i=0; i<rowCount; i++) { 
            var row = table.rows[i]; 
            var chkbox = row.cells[0].children[0];              
            if(null != chkbox && true == chkbox.checked) { 
               if (row.cells[0].children[0].parentNode.tagName != 'TH'){
                    table.deleteRow(i); 
                    rowCount--; 
                    i--;
                }
            } 
        }
        document.getElementById("QUERY_CHKBOX").checked = false;
    }catch(e) { 
        alert(e); 
    } 
}

function fnClearOrderBy_old() {	//REDWOOD_CHANGES
    try { 
        var table = document.getElementById("idadvOrderTable").tBodies[0]; 
        var rowCount = table.rows.length; 
  
        for(var i=0; i<rowCount; i++) { 
            var row = table.rows[i]; 
            var chkbox = row.cells[0].children[0]; 
            if(null != chkbox && true == chkbox.checked) { 
                if (row.cells[0].children[0].parentNode.tagName != 'TH'){
                    table.deleteRow(i); 
                    rowCount--; 
                    i--;
                }
            } 
        }
        document.getElementById("ORDER_CHKBOX").checked = false;
    }catch(e) { 
        alert(e); 
    } 
}

function fnAcceptOrderBy_old() {  //REDWOOD_CHANGES
    var selOption ;
    var selField = document.getElementById("idSelectField");
    var selDir = document.getElementById("idSelectSortDirection");
    if (selField.selectedIndex > -1 && selDir.selectedIndex > -1) {
        selOption = selField.options[selField.selectedIndex];
    
       
        var table = document.getElementById("idadvOrderTable").tBodies[0]; 
        var row = document.createElement("TR");
        if(table.rows.length % 2 == 0) {
            row.setAttribute("onblur", "this.className=''");
            row.setAttribute("onmouseover", "this.className='TDHoverSumRow'");
            row.setAttribute("onfocus", "this.className='TDHoverSumRow'");
            row.setAttribute("onmouseout", "this.className=''");
        } else {
            row.className = "SummaryAltTR";
            row.setAttribute("onblur", "this.className='SummaryAltTR'");
            row.setAttribute("onmouseover", "this.className='TDHoverSumRow'");
            row.setAttribute("onfocus", "this.className='TDHoverSumRow'");
            row.setAttribute("onmouseout", "this.className='SummaryAltTR'");
        }
        
        table.appendChild(row); 
        var cell1 = document.createElement("TD");
        row.appendChild(cell1);
        cell1.className = "TBLoneTD1";
        cell1.setAttribute("scope", "row");
        var element1 = document.createElement("input"); 
        element1.type = "checkbox"; 
        element1.className = "CHKstd";
        cell1.appendChild(element1);
        
        var cell2 = document.createElement("TD");
        row.appendChild(cell2);
        cell2.setAttribute("scope", "row");
        var element2 = document.createElement("span"); 
        element2.className = "SPANText";            
        setInnerText(element2, selOption.value);
        cell2.appendChild(element2); 
      
        var cell3 = document.createElement("TD");
        row.appendChild(cell3);
        cell3.setAttribute("scope", "row");
        var element2 = document.createElement("span"); 
        element2.className = "SPANText";
        setInnerText(element2, selDir.value);
        cell3.appendChild(element2); 
                
        var cell4 = document.createElement("TD");
        row.appendChild(cell4);
        cell4.width = "99%";
        cell4.setAttribute("scope", "row");
    }
}

/*
 * Called when user clicks on one of the 'Fields' in select list
 * When User clicks on any of the detail fields, we deselect the 'Accept' button of Order By
 * because we cannot order by detail field
 * Summary.XSL generates this function call
 */
function fnSelectAdvField(selectedValue) {
    var dsName = selectedValue.substring(0, selectedValue.indexOf("."));
    if (dbStrRootTableName == dsName) {
        fnEnableElement(document.getElementById('btnAcceptOrderBy'));
    } else {
        document.getElementById('btnAcceptOrderBy').disabled = true;
    }
}

/*
 * Called when print button is clicked
 * rsResult - Recordset of Results tab
 * keyField - Key Field that will be printed as first line of the row
 */
function gPrint(rsResult, keyField)
{
    //var fso = new ActiveXObject("Scripting.FileSystemObject");

    //Get the Result Rows
    var tblQuery = document.getElementById("TblSummary").tBodies[0];
    var tblBody = tblQuery.tBodies[0];
    var tblRowRec = tblBody.rows[0];

    var colName = "";
    var rs = rsResult.clone;
    var tblHdrRow = tblQuery.rows[0];
    var langCode = mainWin.LangISOCode;
    var noScript = mainWin.getItemDesc("LBL_NOSCRIPT_LABEL");

    //Get the column index of Key Field
    keyIndex = 1;
    for (var ipNmIndex = 0; ipNmIndex < tblRowRec.cells.length; ipNmIndex++)
    {
        //var tmpDF = tblRowRec.cells[ipNmIndex].all.tags("INPUT")[0].dataFld;
        var tmpDF = tblRowRec.cells[ipNmIndex].document.getElementsByTagName("INPUT")[0].dataFld;
        if (tmpDF == keyField) keyIndex = ipNmIndex;
    }

    //Print Header of report
    var strPrint = "<html lang = " + langCode + "><head>";
    strPrint += "<title>" + document.title + "</title>";
    strPrint += "<script language='JScript'>function fnCurPrint(){window.print();}</script><noscript>"+ noScript +"</noscript>";
    strPrint += "</head>";
    strPrint += "<body onload=fnCurPrint()><BR>";
    strPrint += "<center><b>" + document.title + "</b></center><br>";

    //Print Body of Report
    var recNo = 0;
    for (var i = 0; i < rs.recordCount; i++)
    {
        if (rs.Fields(0).value == -1)
        {
            recNo += 1;
            var strRow = "";
            for (var cellIndex = 1; cellIndex < tblHdrRow.cells.length; cellIndex++)
            {
                if (cellIndex == keyIndex)
                {
                    //If it is key field, insert the field as first column to print
                    strRow = "<B>" + recNo + "." + getInnerText(tblHdrRow.cells[cellIndex]) + " :</B> " + strRow;
                } else
                {
                    //If it is NOT key field, insert the field at end
                    strRow += "<B>" + "&nbsp;&nbsp;" + getInnerText(tblHdrRow.cells[cellIndex]) + " :</B> ";
                }
                strRow += rs.Fields(cellIndex).value + "<BR><BR>";
            }
            strRow += "<BR><BR>";
            strPrint += strRow;
        }
        rs.movenext();
    }

    //Print Footer of Report
    strPrint += "<center><B>No Of Records Printed : <B>" + recNo + "</center>";
    strPrint += "</body></html>";

    //Open a window and write the report
    var printWindow = window.open();
    printWindow.document.writeln(strPrint);
    printWindow.document.close();
}

function fnEnterQuery()
{

    resetElements();
    var qryTable = document.getElementById("TblQuery");
    var inputElem = qryTable.tBodies[0].getElementsByTagName("INPUT");
    setSumData(inputElem);
    var selectElem = qryTable.tBodies[0].getElementsByTagName("SELECT");
    setSumData(selectElem);
    var textareaElem = qryTable.tBodies[0].getElementsByTagName("TEXTAREA");
    setSumData(textareaElem);   
    fnSetExitButton(true);
}

function setSumData(sumElement) {
    for (var elemCnt = 0; elemCnt < sumElement.length; elemCnt++) {
        if (sumElement[elemCnt].getAttribute("DBC")) {
            if (sumElement[elemCnt].type.toUpperCase() != 'HIDDEN') {
                sumElement[elemCnt].focus();
                break;
            }
        }
    }

}

function fnExecuteQuery(advCriteriaList,e)
{
    //inDate = setActionTime();
    var evnt = window.event || e;
    if (gAction == '') gAction = "EXECUTEQUERY";
    try
    {
        //eval('fnPreExecuteQuery_Summary()');
        var fnEval = new Function('fnPreExecuteQuery_Summary()');  
        fnEval();
    } catch(e)
    {}
    var elem =  getEventSourceElement(evnt);
    fcjRequestDOM = buildSummaryQueryXML(advCriteriaList);
    if (elem || elem != null)
    {
        var elemName = elem.name;
        if (elemName)
        {
            if (getPreviousSibling(elem))
            {
                if (getPreviousSibling(elem).name)
                {
                    if (getPreviousSibling(elem).name == elemName.substring(0, elemName.length - 1))
                    {
                        var hiddenElem = getPreviousSibling(elem);
                        hiddenElem.setAttribute("onpropertychange", "", 0);
                        hiddenElem.value = "";
                    }
                }
            }
        }
    }
    chacheLastQryDOM["LastQRyDOM"] = fcjRequestDOM;
    
    lastRequestTS = getDateObject();
    var l_Resp = fnSubmitQuery(evnt);
    fnPostQueryChange();
    if (parent.screenArgs && parent.screenArgs['ISADV_SUM'] == true){
        parent.document.getElementById("BTN_EXIT").focus();
    }else{
        document.getElementsByName("gotopage")[0].focus();
        document.getElementsByName("gotopage")[0].select();
    }
    try
    {
        //eval('fnPostExecuteQuery_Summary()');
		/*Fix for 20083046 Starts*/
         var fnEval = new Function("evnt","fnPostExecuteQuery_Summary(evnt)");  
        fnEval(evnt); 
        /*Fix for 20083046 Ends*/
    } catch(e)
    {}

   /* if (mainWin.mBean_required == "Y") {
        //fnpostActionSummary('EXECUTEQUERY');
        fnCalcHgt();
        inDate="";
        posttime="";
        afterposttime="";
    }    */
    //appendDebug(fcjResponseDOM); 
    if (l_Resp) return l_Resp;
    else return "";
}

//Kals  May 19 , 
function fnSubmitQuery(e){
    var summFuncId = detailFuncId.substring(0,2)+'S'+detailFuncId.substring(3,detailFuncId.length);
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, summFuncId);
    /*if (parent.screenArgs && parent.screenArgs['ISADV_SUM'] == true) // Kals
    return fcjResponseDOM; //REDWOOD_35660960 commented */

    if (fcjResponseDOM){
        var msgStatus = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG").getAttribute("MSGSTATUS");
        var messageNode = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG/RESPONSE");

        if (msgStatus != 'SUCCESS'){
            //fnRefreshSummary();//REDWOOD_CHANGES
            alert(invalidSQL);

        } else{
            submitQuery = true;
            var objQueryRecords = selectNodes(fcjResponseDOM,"FCJMSG/MSG/REC");
            if (objQueryRecords.length == 0){
                //fnRefreshSummary();//REDWOOD_CHANGES
                showToolbar_sum('resultSet');
                alert(noRecord);
            } else{
                var objUIXML = loadXMLFile(xmlFileName);
                dbDataDOM = GetDataDOMForSummary(fcjResponseDOM);
                fnShowSummaryData(null, e);

                var hasMoreRecord = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("HAS_MORE");
                if (hasMoreRecord && hasMoreRecord == 'Y'){
                    alert(moreRecord);
                }
            }
            showToolbar_sum(gAction); //REDWOOD_CHANGES
            gAction = "";
        }
       // showToolbar_sum(sumAction); //REDWOOD_CHANGES
    } else return false;
}
 //REDWOOD_CHANGES
function fnShowSummaryData() {//debugger;
    resetQueryCollapsible("false");
    var RecnodeList = selectNodes(fcjResponseDOM, "//REC");
    //fnClearResult();
	g_DetPkArray = new Array(); //Fix for 15889315 
	//var Headerelem = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].cells; //Static Header change
        var recId =  RecnodeList[0].getAttribute("TYPE");
         meArrayForAddDelete[ recId]([]);
         
   
setTimeout(function(){
    var recId =  RecnodeList[0].getAttribute("TYPE");
    var fnNodeList = selectNodes(fcjResponseDOM, "//FN");
    var fnList = getNodeText(fnNodeList[0].childNodes[0]);
    var fnArray = fnList.split("~");
    
    var ojTableObj = document.getElementById("TBL_QryRslts");
    if (ojTableObj) {
        var templateObj = ojTableObj.getElementsByTagName("template")[0];
        var tdObj = templateObj.content.querySelectorAll("td");
    }
    
    for (var i = 0; i < RecnodeList.length; i++) {
        var singleRecObj = Object.assign( {
        },
        multipleEntryFieldList[RecnodeList[i].getAttribute("TYPE")]);
        g_DetPkArray[i] = RecnodeList[i].getAttribute("RECID"); //array build for 
        
        var l_fv = getNodeText(RecnodeList[i].childNodes[0]);
        var fvArray = l_fv.split("~");
        for (var j = 0; j < fvArray.length - 1; j++) {
            for (var tdObjCnt = 0;tdObjCnt < tdObj.length;tdObjCnt++) {
	      if (tdObj[tdObjCnt].childElementCount != 0) //REDWOOD_35273040
                var tdObjElem = tdObj[tdObjCnt].children[0].children[0];
                if(!tdObjElem){
                     tdObjElem = tdObj[tdObjCnt].children[0];
                }
                if (tdObjElem.getAttribute("name") == fnArray[j] || tdObjElem.getAttribute("name") == (fnArray[j])+'I') {
                    if (tdObjElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER") {
                        singleRecObj[fnArray[j] ]= fvArray[j]==''?null: Number(fvArray[j]);
                    } else if(tdObjElem.tagName.toUpperCase() == "OJ-SWITCH") {
                        if(tdObjElem.getAttribute("ON") == fvArray[j]) {
                            //tdObjElem.setAttribute("value", "true");
                             singleRecObj[fnArray[j]]=true;
                        } else {
                           // tdObjElem.setAttribute("value", "false");
                             singleRecObj[fnArray[j]]=false;
                        }
                    }
                    else if(tdObjElem.tagName.toUpperCase() == "OJ-INPUT-DATE") {
                        if (fvArray[j] != '')
                        {					
                            var l_date = new Date(fvArray[j]);
                            // Get the year, month, and day from the Date object
                            var year = l_date.getFullYear();
                            var month = String(l_date.getMonth() + 1).padStart(2, '0');
                            var day = String(l_date.getDate()).padStart(2, '0');
                            // Combine the year, month, and day into a string in the YYYY-MM-DD format
                            singleRecObj[fnArray[j] ] = `${year}-${month}-${day}`;                    
                        }
                        else
                        singleRecObj[fnArray[j]]= fvArray[j];
                    }
                    else {
//                        if (fieldType[fnArray[j]] == "AMOUNT") {
//                            var ccy = "";
//                            var ccyFld = relatedField[fnArray[j]];
//                            /*Fix for 18758948 Starts*/
//                            for (var indx = 0;indx <= j;indx++) {
//                                if (fnArray[indx] == ccyFld) {
//                                    /*Fix for 18758948 ends*/
//                                    ccy = fvArray[indx];
//                                    break;
//                                }
//                            }
//
//                            if (ccy == "")
//                                ccy = mainWin.Lcy;
//                            fvArray[j] = fvArray[j].replace(decimalSymbol, gDecimalSymbol);
//                            var formatAmount = new getFmtdAmt(fvArray[j], ccy);
//                            if (formatAmount)
//                                fvArray[j] = formatAmount.getInputAmount();
//                        }
                         singleRecObj[fnArray[j] ]= fvArray[j];
                    }
                    break;
                }
            }

        }
        meArrayForAddDelete[recId].push(singleRecObj);
    }
    document.getElementById('TBL_QryRslts').refresh();
    
},0);	 
    
    
    if (exportReq == 'Y') {
        document.getElementsByName("Export")[0].disabled = false;
        document.getElementsByName("Export")[0].style.display = "flex";
        g_SummaryType = "B";
    }
    
    /* Bug 19609280 - Asynchronous summary export changes */
//     if (expAllReq == 'Y') {
//        document.getElementsByName("ExportAll")[0].disabled = false;
//        document.getElementsByName("ExportAll")[0].style.display = "flex"
//        g_SummaryType = "B";
//    }   
    /* Bug 19609280 - Asynchronous summary export changes */
    
    //12.0.3 Summary to detail changes starts--Fix for 18716479
//	if (typeof(detailRequired) != 'undefined' && detailRequired) {        
//		document.getElementById("Details").style.display = "flex";
//		document.getElementById("Details").disabled = false;
//	}
} 
//REDWOOD_CHANGES
// Kals May 19 .Show Data in Table Grid
function fnShowSummaryData_old(v_ResultData, e){   //REDWOOD_CHANGES
    var event = window.event || e;
    var l_ResHTML = "";
    //14650898 Changes Starts  
     if(exportReq == 'Y'){
        //document.getElementsByName("Export")[0].style.visibility = "visible";
        //document.getElementsByName("Export")[0].className="BTNtext"; 
        document.getElementsByName("Export")[0].disabled = false;
        document.getElementsByName("Export")[0].style.display = "block"
        g_SummaryType = "B";
    } 
    //14650898 Changes Ends
    if (null != v_ResultData){
        objQueryRecords = selectNodes(v_ResultData, "FCJMSG/MSG/REC");
        if (objQueryRecords.length == 0){
            fnRefreshSummary();
            alert(noRecord);
        } else{
            var l_QryRsltHTML = fnGetQryRsltHTML(v_ResultData, event);            
            var srcElem = getEventSourceElement(event);
            if (srcElem){
                if (srcElem.tagName == "TH" || srcElem.tagName == "BUTTON"){
                    if (srcElem.tagName == "TH") fnsetimg();
                    if (srcElem.title == "Query" || srcElem.title == "Refresh"){
                        var summTable = document.getElementById("TBL_QryRslts");
                        var THLen = summTable.getElementsByTagName("TH").length;
                        for (var itr = 0; itr < THLen; itr++){
                            if (srcElem.cellIndex != itr){                                
                                var THInner = summTable.getElementsByTagName("TH")[itr].innerHTML;
                                if (THInner.indexOf("<IMG") != -1){
                                    THInner = THInner.substring(0, THInner.indexOf("<IMG"));
                                    summTable.getElementsByTagName("TH")[itr].innerHTML = THInner;
                                }
                            }
                        }
                    }
                    var summary = mainWin.getItemDesc("LBL_SUMMARY");
                    var tblDef = "<TABLE class= 'TABLESummary' id= 'TBL_QryRslts' cellSpacing= '0' cellPadding='0' border='0' summary='"+ summary +"'>";
                    var str = document.getElementById("TBL_QryRslts").innerHTML;
                    if (str.indexOf("<TBODY>") > -1) {
                        str = str.substring(0, str.lastIndexOf("<TBODY>")+ 6);
                    } else {
                    str = str.substring(0, str.lastIndexOf("<tbody>")+ 6);
                    } 
                    //str = str.substring(0, str.indexOf("TBODY") + 6);
                    l_ResHTML = tblDef + str + l_QryRsltHTML;
                } else{
                    //Fix for Bug 16367590 - start 
                    var str = fnCacheHeader["Header"]; 
                    if ((str.indexOf("<TBODY>") > -1) || (str.indexOf("<tbody>") > -1)) {
                        if (str.indexOf("<TBODY>") > -1) {
                            str = str.substring(0, str.lastIndexOf("<TBODY>"));
                        } else {
                        str = str.substring(0, str.lastIndexOf("<tbody>"));
                        }
                        l_ResHTML = str + l_QryRsltHTML;
                    } else {
                        l_ResHTML = fnCacheHeader["Header"] + l_QryRsltHTML;
                    }
                    // Fix for Bug 16367590 - end
                }
            }                  
            document.getElementById("QryRslts").innerHTML = l_ResHTML;
            
            //static header change start
            l_QryRsltHTML = fnGetQryRsltFreezeHTML(v_ResultData, event);            
            if (srcElem){
                if (srcElem.tagName == "TH" || srcElem.tagName == "BUTTON"){
                    if (srcElem.tagName == "TH") fnsetimg();
                    if (srcElem.title == "Query" || srcElem.title == "Refresh"){
                        var summTable = document.getElementById("TBL_QryRsltsFreeze");
                        var THLen = summTable.getElementsByTagName("TH").length;
                        for (var itr = 0; itr < THLen; itr++){
                            if (srcElem.cellIndex != itr){                                
                                var THInner = summTable.getElementsByTagName("TH")[itr].innerHTML;
                                if (THInner.indexOf("<IMG") != -1){
                                    THInner = THInner.substring(0, THInner.indexOf("<IMG"));
                                    summTable.getElementsByTagName("TH")[itr].innerHTML = THInner;
                                }
                            }
                        }
                    }
                    summary = mainWin.getItemDesc("LBL_SUMMARY");
                    tblDef = "<TABLE class= 'TABLESummary' id= 'TBL_QryRsltsFreeze' cellSpacing= '0' cellPadding='0' border='0' summary='"+ summary +"'>";
                    str = document.getElementById("TBL_QryRsltsFreeze").innerHTML;
                    if (str.indexOf("<TBODY>") > -1) {
                        str = str.substring(0, str.lastIndexOf("<TBODY>")+ 6);
                    } else {
                    str = str.substring(0, str.lastIndexOf("<tbody>")+ 6);
                    } 
                    //str = str.substring(0, str.indexOf("TBODY") + 6);
                    l_ResHTML = tblDef + str + l_QryRsltHTML;
                } else{
                    var str = fnCacheHeader["FreezeHeader"]; 
                    if ((str.indexOf("<TBODY>") > -1) || (str.indexOf("<tbody>") > -1)) {
                        if (str.indexOf("<TBODY>") > -1) {
                            str = str.substring(0, str.lastIndexOf("<TBODY>"));
                        } else {
                        str = str.substring(0, str.lastIndexOf("<tbody>"));
                        }
                        l_ResHTML = str + l_QryRsltHTML;
                    } else {
                        l_ResHTML = fnCacheHeader["FreezeHeader"] + l_QryRsltHTML;
                    }
                    // Fix for Bug 16367590 - end
                }
            }                  
            document.getElementById("QryRsltsFreeze").innerHTML = l_ResHTML;
            //static header change end
        }

    } else{
        if(exportReq == 'Y'){
            //document.getElementsByName("Export")[0].style.visibility = "visible";
            //document.getElementsByName("Export")[0].className="BTNtext"; 
            document.getElementsByName("Export")[0].disabled = false;
            document.getElementsByName("Export")[0].style.display = "block"
            g_SummaryType = "B";
        } 
        var l_QryRsltHTML = fnGetQryRsltHTML(v_ResultData, event);
        if (srcElem){
            if (srcElem.tagName == "TH" || srcElem.tagName == "BUTTON"||srcElem.tagName == "A") {
                if (srcElem.tagName == "TH" || srcElem.tagName == "A") fnsetimg(e);
                if (srcElem.title == "Query" || srcElem.title == "Refresh"){
                    var summTable = document.getElementById("TBL_QryRslts");
                    var THLen = summTable.getElementsByTagName("TH").length;
                    for (var itr = 0; itr < THLen; itr++){
                        if (srcElem.cellIndex != itr){
                            var THInner = summTable.getElementsByTagName("TH")[itr].innerHTML;
                            if (THInner.indexOf("<IMG") != -1){
                                THInner = THInner.substring(0, THInner.indexOf("<IMG"));
                                summTable.getElementsByTagName("TH")[itr].innerHTML = THInner;
                            }
                        }
                    }
                }
                var tblDef = "<TABLE class='TABLESummary' id='TBL_QryRslts' cellSpacing='0' cellPadding='0' border='0' summary='"+ summary +"'>";
                var str = document.getElementById("TBL_QryRslts").innerHTML;
                str = str.substring(0, str.indexOf("TBODY") + 6);
                if (srcElem.title == "Query" || srcElem.title == "Refresh"){
                    var summTable = document.getElementById("TBL_QryRslts");
                    var THLen = summTable.getElementsByTagName("TH").length;
                    for (var itr = 0; itr < THLen; itr++){
                        if (getEventSourceElement(event).cellIndex != itr){
                            var THInner = summTable.getElementsByTagName("TH")[itr].innerHTML;
                            if (THInner.indexOf("<IMG") != -1){
                                THInner = THInner.substring(0, THInner.indexOf("<IMG"));
                                summTable.getElementsByTagName("TH")[itr].innerHTML = THInner;
                            }
                        }
                    }
                }
                l_ResHTML = tblDef + str + l_QryRsltHTML;
            } else{
                // Fix for Bug 16367590 - start 
                var str = fnCacheHeader["Header"]; 
                if ((str.indexOf("<TBODY>") > -1) || (str.indexOf("<tbody>") > -1)) {
                    if (str.indexOf("<TBODY>") > -1) {
                        str = str.substring(0, str.lastIndexOf("<TBODY>"));
                    } else {
                        str = str.substring(0, str.lastIndexOf("<tbody>"));
                    }
                l_ResHTML = str + l_QryRsltHTML;
                } else {
                    l_ResHTML = fnCacheHeader["Header"] + l_QryRsltHTML;
                }
                // Fix for Bug 16367590 - end
            }
        } else{
            var existHTML = document.getElementById("QryRslts").innerHTML;            
            if (existHTML.indexOf("<TBODY>") > -1) {
                existHTML = existHTML.substring(0, existHTML.lastIndexOf("<TBODY>"));
            } else {
                existHTML = existHTML.substring(0, existHTML.lastIndexOf("<tbody>"));
            }
            l_ResHTML = existHTML + l_QryRsltHTML;
        }        
        document.getElementById("QryRslts").innerHTML = l_ResHTML;
        
        //static header change start
        l_QryRsltHTML = fnGetQryRsltFreezeHTML(v_ResultData, event);
        if (srcElem){
            if (srcElem.tagName == "TH" || srcElem.tagName == "BUTTON"||srcElem.tagName == "A") {
                if (srcElem.tagName == "TH" || srcElem.tagName == "A") fnsetimg(e);
                if (srcElem.title == "Query" || srcElem.title == "Refresh"){
                    var summTable = document.getElementById("TBL_QryRsltsFreeze");
                    var THLen = summTable.getElementsByTagName("TH").length;
                    for (var itr = 0; itr < THLen; itr++){
                        if (srcElem.cellIndex != itr){
                            var THInner = summTable.getElementsByTagName("TH")[itr].innerHTML;
                            if (THInner.indexOf("<IMG") != -1){
                                THInner = THInner.substring(0, THInner.indexOf("<IMG"));
                                summTable.getElementsByTagName("TH")[itr].innerHTML = THInner;
                            }
                        }
                    }
                }
                tblDef = "<TABLE class='TABLESummary' id='TBL_QryRsltsFreeze' cellSpacing='0' cellPadding='0' border='0' summary='"+ summary +"'>";
                str = document.getElementById("TBL_QryRsltsFreeze").innerHTML;
                str = str.substring(0, str.indexOf("TBODY") + 6);
                if (srcElem.title == "Query" || srcElem.title == "Refresh"){
                    summTable = document.getElementById("TBL_QryRsltsFreeze");
                    THLen = summTable.getElementsByTagName("TH").length;
                    for (var itr = 0; itr < THLen; itr++){
                        if (getEventSourceElement(event).cellIndex != itr){
                            var THInner = summTable.getElementsByTagName("TH")[itr].innerHTML;
                            if (THInner.indexOf("<IMG") != -1){
                                THInner = THInner.substring(0, THInner.indexOf("<IMG"));
                                summTable.getElementsByTagName("TH")[itr].innerHTML = THInner;
                            }
                        }
                    }
                }
                l_ResHTML = tblDef + str + l_QryRsltHTML;
            } else{
                // Fix for Bug 16367590 - start 
                var str = fnCacheHeader["Header"]; 
                if ((str.indexOf("<TBODY>") > -1) || (str.indexOf("<tbody>") > -1)) {
                    if (str.indexOf("<TBODY>") > -1) {
                        str = str.substring(0, str.lastIndexOf("<TBODY>"));
                    } else {
                        str = str.substring(0, str.lastIndexOf("<tbody>"));
                    }
                l_ResHTML = str + l_QryRsltHTML;
                } else {
                    l_ResHTML = fnCacheHeader["Header"] + l_QryRsltHTML;
                }
                // Fix for Bug 16367590 - end
            }
        } else{
            var existHTML = document.getElementById("QryRsltsFreeze").innerHTML;            
            if (existHTML.indexOf("<TBODY>") > -1) {
                existHTML = existHTML.substring(0, existHTML.lastIndexOf("<TBODY>"));
            } else {
                existHTML = existHTML.substring(0, existHTML.lastIndexOf("<tbody>"));
            }
            l_ResHTML = existHTML + l_QryRsltHTML;
        }        
        document.getElementById("QryRsltsFreeze").innerHTML = l_ResHTML;
        //static header change end
    }
    gRecordPages = document.getElementsByName("Records")[0].value; //14650898 Changes
    document.getElementById("SavedQry").style.display = "none";
    document.getElementById("SavedQry").disabled = true;
    document.getElementById("Search").style.display = "none";
    document.getElementById("Search").disabled = true;
    document.getElementById("SaveCriteria").disabled = false;
    document.getElementById("SaveCriteria").style.display = "block"
    document.getElementById("AdvSearch").disabled = true;
    document.getElementById("AdvSearch").style.display = "none"
    fnSyncTableWidth();//Static Header change
}

function fnsetimg(e){
    var event = window.event ||e;
    var summTable = document.getElementById("TBL_QryRslts");
    var imgSrc = "";
    var THLen = summTable.getElementsByTagName("TH").length;
    var srcElem = event.srcElement || event.target;
    for (var itr = 0; itr < THLen; itr++){
        if (srcElem.cellIndex != itr){        
            var THInner = summTable.getElementsByTagName("TH")[itr].innerHTML;
            if (THInner.indexOf("<IMG") != -1){
                THInner = THInner.substring(0, THInner.indexOf("<IMG"));
                summTable.getElementsByTagName("TH")[itr].innerHTML = THInner;
            }
        }
    }
    if (srcElem.getAttribute("order") == "asc")        
        imgSrc = imgPath+"/Icons/up.gif"; 
    else 
        imgSrc = imgPath+"/Icons/down.gif"; 
    
    if (getOuterHTML(srcElem).indexOf("IMG") == -1){
        if(document.getElementsByName("RSLT_CHKBOX").length > 0) {
            summTable.getElementsByTagName("TH")[celIndex+2].insertAdjacentHTML("BeforeEnd","<IMG CLASS='IMGLovHdr' src='"+imgSrc+"' />")
        }else{
            summTable.getElementsByTagName("TH")[celIndex+1].insertAdjacentHTML("BeforeEnd","<IMG CLASS='IMGLovHdr' src='"+imgSrc+"' />")
        }
    } else{
        if (srcElem.getAttribute("order") == "asc"){
            if (srcElem.tagName == "IMG") 
                srcElem.src = imgPath+"/Icons/up.gif"; 
            else 
                srcElem.getElementsByTagName("IMG")[0].src = imgPath+"/Icons/up.gif";
        } else{
            if (srcElem.tagName == "IMG") 
                srcElem.src = imgPath+"/Icons/down.gif";
            else 
                srcElem.getElementsByTagName("IMG")[0].src = imgPath+"/Icons/down.gif";
        }
    }
}

function fnGetQryRsltHTML(v_ResultData, e){
    var event = window.event || e;
    if (v_ResultData != null) fcjResponseDOM = v_ResultData;
    var TextWrapCls = 'SPANText';
    var l_StrHTML = "";
    var l_pageCnt = Number(document.getElementsByName("Records")[0].value);
    var curpage = Number(getInnerText(document.getElementsByName("CurPage")[0]));
    var LastPage = getInnerText(document.getElementsByName("TotPgCnt")[0]);
    var go_page = Number(document.getElementsByName("gotopage")[0].value);
    var l_ValueNodes = selectNodes(fcjResponseDOM, "//REC/FV");

    var l_No_Of_Rows = 0;
    if (l_ValueNodes.length <= l_pageCnt) l_pageCnt = l_ValueNodes.length;
    
    l_No_Of_Rows = l_pageCnt;
    var l_No_FV_Val = 0;
    var l_TBody = "<TBODY>";
    var pos = 0;
    var srcElem = getEventSourceElement(event);
    if (srcElem){
        var navpos = srcElem.name;
        if (navpos == "navNext" ||(!event.ctrlKey && event.keyCode == 34) ) pos = (curpage * l_pageCnt);
        if (navpos == "navLast" ||(!event.ctrlKey && event.keyCode == 35) ){
            if(LastPage=="..."){
                LastPage = Math.ceil((selectNodes(fcjResponseDOM, "//REC/FV").length) / (document.getElementsByName("Records")[0].value));
                setInnerText(document.getElementsByName("CurPage")[0],LastPage); 
                setInnerText(document.getElementsByName("TotPgCnt")[0],LastPage); 
            } 
            pos = ((LastPage - 1) * l_pageCnt);
         }
        if (navpos == "navFirst" || (!event.ctrlKey && event.keyCode == 36) ) pos = 0;
        if (navpos == "navPrev" ||(!event.ctrlKey && event.keyCode == 33) ) pos = ((curpage - 1) * l_pageCnt) - l_pageCnt;
        if (navpos == "go"){
            if (LastPage!="..." && go_page > LastPage){
                alert(lblPageNotExist);
                document.getElementsByName("gotopage")[0].value = curpage;
                pos = 0;
            } else{
                pos = ((go_page - 1) * l_pageCnt);
            }
        }
    }
    var LastRecPos = (pos + l_pageCnt);
    if(LastRecPos > l_ValueNodes.length){
        LastRecPos = l_ValueNodes.length;
    }
    if (srcElem){
        if (navpos == "navLast" ||(!event.ctrlKey && event.keyCode == 35) ||((curpage == (LastPage - 1))&&(!event.ctrlKey && event.keyCode == 34)) ||((go_page != 0) && (LastPage != 0) && (go_page == LastPage)) || ((curpage == (LastPage - 1) && navpos == "navLast")) || ((curpage == (LastPage - 1) && navpos == "navNext"))) LastRecPos = l_ValueNodes.length;
    }
    for (var l_Itr = pos; l_Itr < LastRecPos; l_Itr++){
        var l_FvNode = l_ValueNodes[l_Itr];
        var rowIdx = l_Itr;
        if ((pos % 2) != 0) rowIdx = l_Itr + 1;
        if ((rowIdx + 1) % 2 == 0){
            //l_TBody = l_TBody + "<TR class='SummaryAltTR' onblur=\"this.className='SummaryAltTR'\" onmouseover=\"this.className='TDHoverSumRow'\" onfocus=\"this.className='TDHoverSumRow'\" onmouseout=\"this.className='SummaryAltTR'\">";
            l_TBody = l_TBody + "<TR class='SummaryAltTR' onblur=\"fnResetClass("+rowIdx+")\" onmouseover=\"fnHighlightRow("+rowIdx+")\" onfocus=\"fnHighlightRow("+rowIdx+")\" onmouseout=\"fnResetClass("+rowIdx+")\">";//static header change
        } else{
            //l_TBody = l_TBody + "<TR onblur=\"this.className=''\" onmouseover=\"this.className='TDHoverSumRow'\" onfocus=\"this.className='TDHoverSumRow'\" onmouseout=\"this.className=''\" >";
            l_TBody = l_TBody + "<TR onblur=\"fnResetClass("+rowIdx+")\" onmouseover=\"fnHighlightRow("+rowIdx+")\" onfocus=\"fnHighlightRow("+rowIdx+")\" onmouseout=\"fnResetClass("+rowIdx+")\" >";//static header change
        }
        var l_FvValsArr = getNodeText(l_FvNode).split("~");

        if (l_FvValsArr.length > 0) l_No_FV_Val = l_FvValsArr.length;

        if (g_SummaryType == "B" || g_SummaryType == "U") l_TBody = l_TBody + "<TD class='TDgrid1' tabindex='0' ondblClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)' onkeydown = 'return fnHandleSumRslt(event)' title='"+mainWin.getItemDesc("LBL_SELECT_ROW")+"'><div> <label class='LBLauto' for='RSLT_CHKBOX"+l_Itr+"'><span class='LBLinv'>"+ mainWin.getItemDesc("LBL_RECORDS")+l_Itr+"</span><INPUT TYPE = 'CHECKBOX' tabindex='0' NAME = 'RSLT_CHKBOX' id='RSLT_CHKBOX"+l_Itr+"' class = 'INPUTCheckbox' title='"+mainWin.getItemDesc("LBL_SELECT_ROW")+"' onclick='fnToggleChkBox(this, "+l_Itr+")'/></label></div></TD>";//static header change, fix for 21609922, 21828177 //HTML5 Changes

        for (var l_Idx = 0; l_Idx < l_FvValsArr.length - 1; l_Idx++){
            var l_Idx_Temp = "";
            var align = "";
            var scope = "";
            if (g_SummaryType == "B"){
                l_Idx_Temp = l_Idx + 1;
            } else{
                l_Idx_Temp = l_Idx;
            }
            //if (document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].TYPE == 'AMOUNT'){//static header change
			if (document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("TYPE") == 'AMOUNT'){//static header change//Fix for 31382929
                var relatedCcy = document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].RELATED_FIELD;// static header change
                var ccy = "";
                if (relatedCcy != '' && relatedCcy != undefined) //9NT1606_14_4_OFSS_CONSULTING_31868197 Added undefined check
                ccy = fnGetCurrency(relatedCcy, l_FvValsArr);

                if (ccy == ""){
                    ccy = mainWin.Lcy;
                }
                var mb3Amount = new MB3Amount(l_FvValsArr[l_Idx], true, ccy, true);
                if (mb3Amount.isValid()) l_FvValsArr[l_Idx] = mb3Amount.getInputAmount();
            }
            //if (document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("DTYPE") == 'NUMBER' || document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].TYPE == 'AMOUNT'){//static header change
			if (document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("DTYPE") == 'NUMBER' || document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("TYPE") == 'AMOUNT'){//static header change//Fix for 31382929
                align = "align='right'";
            }
            var re = new RegExp("[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]");
           // if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') == -1 && document.getElementById('TBL_QryRslts').tHead.rows[0].cells[l_Idx_Temp].TYPE == 'DATE') // Fix for 15911731 
			//if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') == -1 && document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].TYPE == 'DATE') // Fix for 15911731 //static header chnage
			if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') == -1 && document.getElementById('TBL_QryRsltsHeader').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("TYPE") == 'DATE') // Fix for 15911731 //static header chnage//Fix for 31382929
            {
                //if(l_FvValsArr[l_Idx].split('-').length == 3 && l_FvValsArr[l_Idx].indexOf(':') == -1){
                var mb3Date = new MB3Date(l_FvValsArr[l_Idx], gDateFormatDSO);
                if (mb3Date.isValidDate()) l_FvValsArr[l_Idx] = mb3Date.getShortDate();
            } else if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') > 0 && l_FvValsArr[l_Idx].length>10) {//Bug 15860949 Fixes

                var datePart = l_FvValsArr[l_Idx].substring(0, 10);
                var timePart = l_FvValsArr[l_Idx].substring(10);
                var mb3Date = new MB3Date(datePart, gDateFormatDSO);
                if (mb3Date.isValidDate()) l_FvValsArr[l_Idx] = mb3Date.getShortDate() + timePart;
            }
            var l_index = l_FvValsArr[l_Idx].indexOf("00:00:00");
            if (l_index > 0) l_FvValsArr[l_Idx] = l_FvValsArr[l_Idx].substring(0, l_FvValsArr[l_Idx].indexOf("00:00:00") - 1);
            if (l_Idx == 0){
                scope = "scope='row'";
            }else{
                scope = "";
            }
            if (gscrPos == 'template'){
            	TextWrapCls = 'SPANText';
                if (l_FvValsArr[l_Idx].length > 50){
                    TextWrapCls = 'SPANTextarea';
                }
                if (l_FvValsArr[l_Idx] == ""){
                    l_TBody = l_TBody + "<TD " +scope+" ondblClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)' onclick = 'restoreStyle(this)'" + align + " ><div class='SPANText'>&nbsp;</div></TD>";//HTML5 Changes
                } else{
                        l_TBody = l_TBody + "<TD "+scope+" ondblClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)' tabindex ='0' onkeydown = 'return fnHandleSumRslt(event)' onclick = 'restoreStyle(this)'" + align + " title='"+l_FvValsArr[l_Idx]+"' > <div class='" + TextWrapCls + "'>" + l_FvValsArr[l_Idx] + "</div></TD>";//Fix for 21828177 //HTML5 Changes
                }
            } else{
                l_TBody = l_TBody + "<TD " +scope+ " ondblClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)'  onclick = 'restoreStyle(this)'" + align + " title='"+l_FvValsArr[l_Idx]+"' > <NOBR><div class='" + TextWrapCls + "'>" + l_FvValsArr[l_Idx] + "</div></NOBR></TD>";//Fix for 21828177 //HTML5 Changes
            }
        } //for FV vals
        l_TBody = l_TBody + "<TD width='99%'><div></div></TD>";//static header change
        l_TBody = l_TBody + "</TR>";
    } //For  FV
    l_TBody = l_TBody + "</TBODY></TABLE>";
    return l_TBody;

} //fnc

function fnGetTableHeader(){
    var objResMsgDOM = loadXMLDoc(msgxml_sum);

    if (!objResMsgDOM) return;

    var l_THNamesNodeTmp = selectSingleNode(objResMsgDOM, "//FN");
    var l_StrHTMLTMP = "";
    if (l_THNamesNodeTmp){
        var l_TArr = getNodeText(l_THNamesNodeTmp).split("~");
        l_StrHTMLTMP = "<TABLE  cellSpacing=1 cellPadding=2 summary=''>";
        var l_THNamesTmp = "<THEAD ><TR>";
        l_THNamesTmp = l_THNamesTmp + fnGetTHNames(l_TArr) + "</THEAD>";
        l_StrHTMLTMP = l_StrHTMLTMP + l_THNamesTmp;
    }

    document.getElementById("QryRslts").innerHTML = l_StrHTMLTMP;
}

function fnGetTHNames(l_TmpArr)
{
    fnFindMakerId_ChkId_Pos(l_TmpArr);
    var l_THNames_Tmp = "";
    var l_pos = 0;
    var l_Len = 0;
    var l_No_elements = 0;
    for (var l_Idx = 0; l_Idx < l_QryOrdArr.length; l_Idx++)
    {
        var l_LblName = fnGetLable(l_QryOrdArr[l_Idx]);
        l_pos = gnGetIndex(l_QryOrdArr[l_Idx], l_TmpArr);
        // If some fields like Auth Stat and Rec Stat are not thr  June 6
        if (typeof(l_pos) != 'number' && !l_pos)
        {
            l_pos = 10000;
        }

        //
        l_Len = l_IndexArr.length;
        if (l_IndexArr.length < l_TmpArr.length) l_IndexArr[l_Len] = l_pos;
        //l_THNames_Tmp =  l_THNames_Tmp  + "<TH class='THEADTDMultiple'>" + l_LblName  + "</TH>";
        l_THNames_Tmp = l_THNames_Tmp + "<TH onclick = 'fnSortRecs(event)' scope='col' ><a href='#' onclick='fnSortRecs(event)' order = 'asc'>" + l_LblName + "</a></TH>";//SNORAS#001517
    }

    for (var l_Cnt = 0; l_Cnt < l_TmpArr.length; l_Cnt++)
    {
        var l_TmpTH = l_TmpArr[l_Cnt];
        var l_Included = false;
        //Chk if the elements is already Included or not 
        for (var l_Itr = 0; l_Itr < l_QryOrdArr.length; l_Itr++)
        {
            if (l_QryOrdArr[l_Itr].toUpperCase() == l_TmpTH.toUpperCase())
            {
                l_Included = true;
                break;
            } //if   
        } //for    
        if (!l_Included)
        {
            var l_LblName = fnGetLable(l_TmpArr[l_Cnt]);
            l_pos = gnGetIndex(l_TmpArr[l_Cnt], l_TmpArr);
            l_Len = l_IndexArr.length;
            if (l_IndexArr.length < l_TmpArr.length) l_IndexArr[l_Len] = l_pos;

            if (l_TmpArr[l_Cnt].toUpperCase() == "MAKER_ID" || l_TmpArr[l_Cnt].toUpperCase() == "CHECKER_ID") continue;

            //l_THNames_Tmp =  l_THNames_Tmp  + "<TH class='THEADTDMultiple'>" + l_LblName  + "</TH>";
            l_THNames_Tmp = l_THNames_Tmp + "<TH onclick = 'fnSortRecs(event)' scope='col' ><a href='#' onclick='fnSortRecs(event)' order = 'asc'>" + l_LblName + "</a></TH>";//SNORAS#001517
        }

    } //for

    //l_THNames_Tmp =  l_THNames_Tmp  + "<TH class='THEADTDMultiple' STYLE = 'WIDTH:100%' >&nbsp</TH>"; // add a TD for rest of Space
    l_THNames_Tmp = l_THNames_Tmp + "<TH onclick = 'fnSortRecs(event)' scope='col' >&nbsp</TH>"; // add a TD for rest of Space //SNORAS#001517
    l_THNames_Tmp = l_THNames_Tmp + "</TR></THEAD>";

    return l_THNames_Tmp;
}

// KALS on May 28 , Be defalut show 15 rowsin the Grid , if there are no 15 rows0 Kallu
function fnMake_15_Rows(v_Rows, v_Tds)
{
    if (v_Tds <= 0)
    {
        return "<TR><TD>&nbsp;</TD></TR></TBODY></TABLE>";
    }

    var l_ExcesRows = 0;
    var l_TbTemp = "";
    var l_MaxRows = 15;
    if (g_SummaryBtnCount > 0 && g_SummaryType != "S") l_MaxRows = l_MaxRows - 2;

    if (v_Rows < l_MaxRows) l_ExcesRows = l_MaxRows - v_Rows;

    for (var l_Rnt = 0; l_Rnt < l_ExcesRows; l_Rnt++)
    {
        l_TbTemp = l_TbTemp + "<TR>"

        if (g_SummaryType == "B" || g_SummaryType == "U")
        //l_TbTemp = l_TbTemp +   "<TD class='TDHighlighted' onClick = 'fnDetailScreen()'  onclick = 'restoreStyle(this)' ><NOBR></NOBR></TD>";          
        l_TbTemp = l_TbTemp + "<TD onClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)' onclick = 'restoreStyle(this)'><NOBR></NOBR></TD>";//HTML5 Changes

        for (var l_TdCnt = 0; l_TdCnt < v_Tds; l_TdCnt++)
        {
            //l_TbTemp = l_TbTemp +   "<TD class='TDHighlighted' onclick = 'restoreStyle(this)' ><NOBR>&nbsp;</NOBR></TD>";
            l_TbTemp = l_TbTemp + "<TD onclick = 'restoreStyle(this)'><NOBR>&nbsp;</NOBR></TD>";
        } //for    

        //ashok commented removed event 'onClick = fnDetailScreen()' for blankrow.
        //l_TbTemp = l_TbTemp +   "<TD class='TDHighlighted' STYLE = 'WIDTH:100%' onClick = 'fnDetailScreen()'  onclick = 'restoreStyle(this)' ><NOBR>&nbsp;</NOBR></TD>";
        l_TbTemp = l_TbTemp + "<TD  onclick = 'restoreStyle(this)'><NOBR>&nbsp;</NOBR></TD>";
        l_TbTemp = l_TbTemp + "</TR>"

    } //for 

    return l_TbTemp;
}

/**
   Sets the check box value for each record in bulk
**/
function fnToggleAllOrNone(currState)
{
    // When this function is called from Toolbar, it will have no argument
    //When called from Column Header Checkbox, it will have current state of Toggle Flag
    if (arguments.length < 1)
    {
        document.getElementById("chkToggle").checked = !document.getElementById("chkToggle").checked;
        currState = document.getElementById("chkToggle").checked;
    }

    var checkBoxValue = 0;
    if (currState == true) checkBoxValue = -1;

    for (var iLoop = 0; iLoop < checkBoxValues.length; iLoop++)
    {
        checkBoxValues[iLoop] = checkBoxValue;
    }

    var htmlTableObj = document.getElementById("BLK_" + dbStrRootTableName);
    var tableObject = htmlTableObj.tBodies[0];

    for (var iLoop = 0; iLoop < checkBoxValues.length; iLoop++)
    {
        var rowObject = tableObject.rows[iLoop];
        if (checkBoxValues[iLoop] == -1)
        {
            rowObject.cells[0].getElementsByTagName("INPUT")[0].checked = true;
        } else
        {
            rowObject.cells[0].getElementsByTagName("INPUT")[0].checked = false;
        }
    }
}

/**
 * Called whenever check box in each row is clicked in result tab
 */
function fnChangeStatus()
{

    var obj =  getEventSourceElement(event);
    var boxValue = obj.checked;

    while (obj.tagName != "TR")
    {
        obj = obj.parentNode;
    }

    var recNum = obj.rowIndex;

    if (boxValue) checkBoxValues[recNum - 1] = -1;
    else checkBoxValues[recNum - 1] = 0;
}

/**
 * Dummy Functions. If not present then<b> 
 * changetabpagebyid function will give error.
 */
var strCurrentTabID = 'idQuery';
function inTab(pstrTabID)
{
    strCurrentTabID = pstrTabID;
}

function outTab(pstrTabID)
{
    return true;
}

/**
 * Loads the checkBoxValues with default - Unchecked
 */

function populateCheckBoxArray()
{
    var objQueryRecords = selectNodes(fcjResponseDOM, "FCJMSG/MSG/REC");
    //UnChecked Initially
    for (var iLoop = 0; iLoop < objQueryRecords.length; iLoop++)
    {
        checkBoxValues[iLoop] = 0;
    }
}

//---------------------------------------------------------------------------
// Event Handlers for Child Window Events
//---------------------------------------------------------------------------

/**
  * Inform Main Window that this child window is closed
  */
function fnBeforeUnload()
{
    //mainWin.frames["FrameToolbar"].showToolbar("", "", "");
}

function fnUnload()
{
    if (!exitFlag)
    {
        //mainWin.frames["FrameToolbar"].showToolbar("", "", "");
        mainWin.fnExit(window);
        mainWin.document.getElementById("fastpath").value = functionId;
    } else
    {
        mainWin.showToolbar(screenArgs['PARENT_FUNC_ID'], '', '');
        mainWin.document.getElementById("fastpath").value = screenArgs['PARENT_FUNC_ID'];
        exitFlag = false;
    }
}

function fnExit(e) {  
//REDWOOD_CHANGES
//    if (gAction != "") {
//        appendErrorCode('ST-COM012', "");
//        if (confirmAction()) {
//            gAction = "";
//            resetElements();
//            fnSetExitButton(false);
//        }
//    } else {		   
//REDWOOD_CHANGES
        isExitTriggered = true;
        //mainWin.showToolbar("", "", "");
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
//    }	  //REDWOOD_CHANGES
    e.cancelBubble = true;
}

/**
  * Fires during load
  */
function fnLoad(xmlFile, xslFile, scrName)
{
    var t = getDateObject();
    var startjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    gSummaryOpened = true;
    try
    {
        //eval('fnPreLoad_Summary()');
        var fnEval = new Function();  
        fnEval();
    } catch(e)
    {}

    //mainWin.setActiveWindow(window);
    /*var html = ShowXML(xmlFile, scrName, xslFile);
    ResTree.innerHTML = html;*/
    
    try {
    var html = ShowXML(xmlFile, scrName, xslFile);
        if(getBrowser().indexOf("IE") != -1) {//ie11 changes
            document.getElementById("ResTree").insertAdjacentHTML("beforeEnd",html);
        } else {
            document.getElementById("ResTree").appendChild(html);
        }
    //REDWOOD_35273040 Starts
	if (getBrowser().indexOf("FIREFOX") == 0)
	{
		   document.getElementById("TBL_QryRslts").getElementsByTagName("template")[0].content.append(document.getElementById("TBL_QryRslts").getElementsByTagName("template")[0].children[0])	       
	}
    //REDWOOD_35273040 Ends
    } catch(e) {
        alert(e.message);
    }
    /* Code for executing the Script inside XSL files - Start */
 //REDWOOD_CHANGES   
//    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1) || (getBrowser().indexOf("OPERA") != -1)) {//ie11 changes //Opera added for 19692622 
//        try {
//            var scriptElements = document.getElementsByTagName("script");
//            for(var i = 0; i < scriptElements.length; ++i) {
//                if(scriptElements[i].getAttribute("DEFER") != null) {
//                    //eval(getInnerText(scriptElements[i]));
//                    var fnEval = new Function(getInnerText(scriptElements[i]));  
//                    fnEval();
//                }
//            }
//        } catch(e) {
//            alert(e.message);
//        }
//    }
//    /*Fix for 17035806 start*/
//    else if(getBrowser().indexOf("IE") != -1 && ((getBrowser().indexOf("10") != -1) || (getBrowser().indexOf("11") != -1))){//ie11 changes-Fix for 19203090
//      try {
//            var scriptElements = document.getElementsByTagName("script");
//            for (var i = 0; i < scriptElements.length; ++i) {
//                if (scriptElements[i].defer == true) {
//                    //eval(getInnerText(scriptElements[i]));
//                    var fnEval = new Function(scriptElements[i].innerHTML);  
//                    fnEval();
//                }
//            }
//        } catch (e) {
//            alert(e.message);
//        }
//    }	
//REDWOOD_CHANGES
    /*Fix for 17035806 end*/
    /* Code for executing the Script inside XSL files - End */
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
    fnBindScreenElements();	  //REDWOOD_CHANGES
    //fnCalcHgt(false);		 //REDWOOD_CHANGES
//    fnBuildMultipleEntryArray(); //REDWOOD_CHANGES
//REDWOOD_CHANGES
    //mainWin.frames["FrameToolbar"].disableSaveInToolbarForSummary();TBL_QryRslts
//    document.getElementById("QryRsltsHeader").style.width = document.getElementById("QryRslts").clientWidth + "px";//Static header change
   // document.getElementById("QryRsltsHeader").style.width = document.getElementById("TBL_QryRslts").clientWidth + "px";//Static header change
//REDWOOD_CHANGES
    //Fix for 21253228 start  
//REDWOOD_CHANGES
 //   fnHideFreezeTable();
//     var cols = document.getElementsByName("Locks")[0].value;
//     var headerFrzTable = document.getElementById("TBL_QryRsltsHeaderFreeze"); 
//REDWOOD_CHANGES
     if (g_SummaryType == "B" || g_SummaryType == "U" || exportReq == 'Y')
        maxFreezeIndex = '5';
     else
        maxFreezeIndex = '4';
//     if (headerFrzTable.tBodies[0].rows[0].cells.length >= maxFreezeIndex) //REDWOOD_CHANGES
//        fnFreezeColumns(cols);  //REDWOOD_CHANGES
    //Fix for 21253228 end
    //document.getElementById("TBL_QryRslts").style.width = document.getElementById("TBL_QryRsltsHeader").offsetWidth + "px";//static header change
//    fnSetHeader();	//REDWOOD_CHANGES
 //   document.getElementById("QryRslts").innerHTML = fnCacheHeader["Header"] + "<TR><TD>&nbsp;</TD></TR></TBODY></TABLE>";//static header change //REDWOOD_CHANGES
    try{	 //REDWOOD_CHANGES
    fndisableNavBtns();
    }catch(e){
        
    }

    if (mainWin.applicationName == 'FCIS')
    {
        var xmlDoc = loadXMLFile(xmlFile);
        if (selectNodes(xmlDoc, "//BLOCK[@TYPE = 'Audit Entry' and ID = 'BLK_AUDIT']").length == 0)
        {
            if (msgxml_sum.indexOf("~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP") > 0)
            {
                msgxml_sum = msgxml_sum.substring(0, msgxml_sum.indexOf("~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP")) + "</FN>";
            }
        }
    }
    mainWin.fnSetDatalist(functionId);//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist
    try
    {
        //eval('fnPostLoad_Summary()');
        setTimeout(function(){	//REDWOOD_CHANGES
        var fnEval = new Function('fnPostLoad_Summary()');  
        fnEval();
        },0);				 //REDWOOD_CHANGES
       // var fnEval = new Function('fnPostLoad_Summary()');  //REDWOOD_CHANGES
      //  fnEval();	 //REDWOOD_CHANGES
    } catch(e)
    {}
    if(parseInt(summaryQryCriteria) == 0) {
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SavedQry").style.display = "none";
    }	   
//REDWOOD_CHANGES
//    fnEnableElement(document.getElementById("BTN_EXIT"));	
    setTimeout(function(){fnCalcHgt(false);},0);
//    document.getElementById("Export").style.display = "none";
    //document.getElementById("Export").style.visibility = "hidden";
    //document.getElementById("BTN_EXIT").focus();	  
//REDWOOD_CHANGES
    /* TODO
    if(viewMsg && viewMsg == "TRUE") {
        document.getElementById("TblQuery").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value = queryRefNo;
        fnExecuteQuery();
    }*/
	//fix for 17014629 starts
	var detailToolBarIcons = document.getElementById("toolbar").getElementsByTagName("LI");
    for (var cnt = 0 ; cnt < detailToolBarIcons.length; cnt++){
        detailToolBarIcons[cnt].disabled = true;
    }
	//fix for 17014629 ends
    mainWin.document.getElementById("fastpath").value = functionId;
  //  document.getElementById("TBL_QryRslts").style.width = document.getElementById("TBL_QryRsltsHeader").offsetWidth +"px"; //static header change //REDWOOD_CHANGES
    
    /*var tEnd = getDateObject();
    var jsEndTime = (tEnd.getHours() * (3600 * 1000)) + (tEnd.getMinutes() * (60 * 1000)) + (tEnd.getSeconds() * 1000) + tEnd.getMilliseconds();
     try{
          var dbtime=0;
          var servertime=clientHandlerExit-clientHandlerEntry;
          t = getDateObject();
          time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
        
          var jstime = parseFloat(parseFloat(jsEndTime)-parseFloat(startjsTime)); 
          totaltime = parseFloat(parseFloat(t.getTime())-parseFloat(inLoadTime));
          startDate = new Date(parseFloat(inLoadTime));
          startTime = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+startDate.getDate()+" "+startDate.getHours()+':'+startDate.getMinutes()+':'+startDate.getSeconds();
          endTime = t.getFullYear()+'-'+t.getMonth()+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
        
        
        jstime = Math.round(jstime*100)/100;
        //fnPostActionLog(jstime,dbtime,servertime,startTime, endTime, totaltime,"","","",seqNo,"",mainWin.SignonSerial,seqNo,"LOAD"); 
        //fnPopulateTimes(mainWin.SignonSerial,seqNo,seqNo,jstime,dbtime,servertime,startTime,endTime,totaltime);
        }catch(e){
            time="";
            sumStartTime = "";
            sumEndTime = "";
        }*/
        
        /* if(mainWin.DebugWindowFlg == "Y") {
            
                mainWin.serverDebugStmt =webDbg + "\n\n"+appDbg+"\n\n"+dbDbg;
        }debug revert*/
    
}

/**
   When got Focus
**/
function fnActivate()
{
    return true;
}

/**
   Inform main window that this Child Window is the active window
   This will allow Main Window to call this window's action,
   navigation functions when User clicks Toolbar
**/
function fnFocus()
{
    //mainWin.setActiveWindow(window);
    //mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    //Fix for 18549211 start
    if(focusDetailReq){
		focusDetailReq = false;
    }else{
		mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);
		mainWin.document.getElementById("fastpath").value = functionId;
    }
    //Fix for 18549211 End
    //mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
}

/*
 * Called from Detail Screen when Detail Screen unloads
 */
function refresh()
{
    if (fcjRequestDOM && !ShowSummary == "TRUE")
    {
        fnSubmitQuery();
    }
}

/*
 * This function call fnAuthState() or fnUnAuthState() 
 */
function fnShowValues_old(e) //REDWOOD_CHANGES
{
    var fields = document.getElementById("idSelectField");
    if (fields.options.selectedIndex == -1)
    {
        //alert("Please select an element");
        alert(selectElement);
        return;
    }
    var stateVal = fields.options[fields.options.selectedIndex].value;
    var stateValLabel = getInnerText(fields.options[fields.options.selectedIndex]);
    var stateValDtype = fields.options[fields.options.selectedIndex].getAttribute("DTYPE");

    fnBuildAdvLovSum(stateVal, stateValLabel, stateValDtype, null, e);	//REDWOOD_CHANGES
}
/*
 * This function fills the appropriate operators
 * depending on the datatype of the field choosen by the user
 */
function fnFillOperators()
{
    var operator = document.getElementById("idSelectOp");
    var fields = document.getElementById("idSelectField");
    dataType = fields.options[fields.options.selectedIndex].getAttribute("DTYPE");
    operator.options.length = 0;
    document.getElementById("idTextFieldValue").value = '';
    //document.getElementById("idTextFieldValue2").value='';
    // Murali Starts Changes to Resolve Object Expected error in Advance Query
    if (document.getElementById("idTextFieldValue2")) document.getElementById("idTextFieldValue2").value = '';
    // Murali Ends Changes to Resolve Object Expected error Advance Query
    switch (dataType)
    {
    case 'VARCHAR':
    case 'VARCHAR2':
    case 'CHAR':
        for (var arrLen = 0; arrLen < forText.length; arrLen++)
        {
            operator.options[operator.options.length] = forText[arrLen];
        }
        break;
    case 'NUMERIC':
    case 'NUMBER':
    case 'DECIMAL':
    case 'INTEGER':
    case 'SMALLINT':
        for (var arrLen = 0; arrLen < forNumber.length; arrLen++)
        {
            operator.options[operator.options.length] = forNumber[arrLen];
        }
        break;

    case 'DATE':
        for (var arrLen = 0; arrLen < forNumber.length; arrLen++)
        {
            operator.options[operator.options.length] = forNumber[arrLen];
        }
        break;
    case 'CHAR':
        for (var arrLen = 0; arrLen < 2; arrLen++)
        {
            operator.options[operator.options.length] = forNumber[arrLen];
        }
        break;

    default:
        break;
    }
	fnChangeDisplay();/*16861535 Fix */
}

function resetIndex()
{
    dbIndexArray['SUMMARY'] = 1;
    dbIndexArray[dataSrcLocationArray[0]] = 1;
}

/**
  * Function to be called from Authorize.js 
  * To Submit the Auth Query Request to Server. Since Servlet name won't be 
  * available in Authorize.js, this is written here
  */
function postQuery(objReqDOM)
{
    var qryResponse = fnPost(objReqDOM, servletURL, detailFuncId);
    return qryResponse;
}

function refreshSummary()
{
    changeTabPageById("idQuery");
    fcjRequestDOM = buildSummaryQueryXML();
    fnSubmitQuery();
}



function fnOpenAdvanced()
{
  //  if (!mainWin.isSessionActive()) return; //session expiry change  
    mask();
    fnShowSubscreen_SUM_ADV();
}

function fnShowSubscreen_SUM_ADV()
{
    var txnBranch=g_txnBranch;
    var userLanguageCode = mainWin.LangCode;
//    screenArgs['SCREEN_NAME'] = 'CVS_MAIN'; //REDWOOD_CHANGES
    screenArgs['SCREEN_NAME'] = 'CVS_ADVANCED';	 //REDWOOD_CHANGES
    screenArgs['FUNCTION_ID'] = functionId;
    screenArgs['LANG'] = userLanguageCode;
    //screenArgs['UI_XML'] = functionId.substring(2,0) + "D" + functionId.substring(3,functionId.length);
    screenArgs['UI_XML'] = uiXML.substring(2, 0) + "D" + uiXML.substring(3, uiXML.length);
    screenArgs['DESCRIPTION'] = mainWin.getItemDesc("LBL_ADVANCED");
    screenArgs['ISADV_SUM'] = true;
    //var newWinRetVal = window.showModalDialog(encodeURI("LaunchSubScreen.jsp?IsAdv_Sum_Scr=Y&scr=" + dlgArgs.screenArgs['SCREEN_NAME'] + "&functionid=" + dlgArgs.screenArgs['FUNCTION_ID'] + "&lang=" + dlgArgs.screenArgs['LANG'] + "&uixml=" + dlgArgs.screenArgs['UI_XML'] + "&description=" + dlgArgs.screenArgs['DESCRIPTION']+"&txnBranch="+txnBranch), dlgArgs, "help:no; resizable:yes; scroll:no; status:no");
    var params = "IsAdv_Sum_Scr=Y&";
    params    += "scr=" + screenArgs['SCREEN_NAME'] + "&";
    params    += "functionid=" + screenArgs['FUNCTION_ID'] + "&";
    params    += "lang=" + screenArgs['LANG'] + "&";
    params    += "uixml=" + screenArgs['UI_XML'] + "&";
    params    += "description=" + screenArgs["DESCRIPTION"] +"&";
    params    += "txnBranch=" + txnBranch +"&";
    if(loadXMLFile(xmlFileName) != null){
        loadSubScreenDIV("ChildWin", "LaunchSubScreen.jsp?"+params);
    }
    
}

function fnPaintAdv_Sum_Resp(criteriaListAdv,e)
{
    var e = window.event || e;
   /* if (!mainWin.isSessionActive())  //session expiry change  
        return; */
    strCurrentTabID = 'idAdvanced';
    var RetObj = new Object();
    RetObj.l_RetVal = fnExecuteQuery(criteriaListAdv,e);
    RetObj.lastQryReq = fcjRequestDOM;
    /*12.01 Security fixes starts*/
    if(selectSingleNode(fcjResponseDOM, "FAILACCCONTROL")){
            var failAccControl =selectSingleNode(fcjResponseDOM, "FAILACCCONTROL");
              if(failAccControl != null && getNodeText(failAccControl) == "SM-00197"){
                  showAlerts(fnBuildAlertXML("SM-00197","E"),"E");
                  alertAction = "UNMASK";            
                  return false;
         } 
    }
    /*12.01 Security fixes ends*/
    var hasMoreRecord = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("HAS_MORE");
    if (hasMoreRecord && hasMoreRecord == 'Y') 
        RetObj.hasMoreRecord = 'Y';
    else 
        RetObj.hasMoreRecord = 'N';
    if (RetObj)
    {
        //chacheLastQryDOM["LastQRyDOM"] = RetObj.lastQryReq;
        if(!criteriaListAdv) {
            parent.fnShowSummaryData(RetObj.l_RetVal, e);
            parent.fnPostQueryChange();
        }
        if (RetObj.hasMoreRecord == 'Y') {
            //alert("There are more records for this criteria; Please reframe your query criteria!");
            alert(moreRecord);
        }
    }
    // Fix for Bug 16367590 - start  
    try
    {
        //eval('parent.fnPostExecuteQuery_Summary()');
        var fnEval = new Function('parent.fnPostExecuteQuery_Summary()');  
        fnEval();
    } catch(e)
    {}
    // Fix for Bug 16367590 - end 
    if(!criteriaListAdv) {
        parent.screenArgs["fcjRequestDOM"] = fcjRequestDOM;
        parent.document.getElementById("SaveCriteria").disabled = false;
        parent.document.getElementById("SaveCriteria").style.display = "block"
        parent.document.getElementById("AdvSearch").disabled = true;
        parent.document.getElementById("AdvSearch").style.display = "none"
        fnExitSubScreen(e);
    }
}

function fnRefreshSummary()
{   
   document.getElementById("QryRslts").innerHTML = fnCacheHeader["Header"] + "<TR><TD>&nbsp;</TD></TR></TBODY></TABLE>";
   document.getElementById("QryRsltsFreeze").innerHTML = fnCacheHeader["FreezeHeader"] + "<TR><TD class=\"TDnone\">&nbsp;</TD></TR></TBODY></TABLE>";//static header change
    document.getElementById("QryRsltsHeader").style.width = document.getElementById("QryRslts").clientWidth + "px";//Static header change
}

function changeStyle(v_CurRow)
{

    v_CurRow.parentNode.className = "TDHighlightedSumRow";
    var l_Row = v_CurRow.parentNode;
    for (var l_Cnt = 0; l_Cnt < l_Row.cells.length; l_Cnt++)
    {
        l_Row.cells[l_Cnt].className = "TDHighlightedSumRow";
    }
}

function restoreStyle(v_CurRow)
{
    // Reddy Prasad added to select the last record once auth is done
    if (fnCurrentRec["l_RowIndex"])
    {
        if (document.getElementById('TBL_QryRslts').tBodies[0].rows.length < fnCurrentRec["l_RowIndex"])
        {
            fnCurrentRec["l_RowIndex"] = fnCurrentRec["l_RowIndex"] - 1;
        }
    }
    if (!submitQuery) var l_PrevIndex = fnCurrentRec["l_RowIndex"]; //Commented for temp fix
    else
    {
        var l_PrevIndex = v_CurRow.parentNode.rowIndex+1;
        submitQuery = false;
        //fnCurrentRec["l_RowIndex"];
    }
    if (l_PrevIndex)
    { // De select the prev selected row 
        var l_PrevRow = document.getElementById("TBL_QryRslts").tBodies[0].rows[(l_PrevIndex - 1)];
        if (typeof(l_PrevRow) == "undefined")
        {
            var currRowIndex = v_CurRow.parentNode.rowIndex+1;
            l_PrevRow = document.getElementById("TBL_QryRslts").tBodies[0].rows[(currRowIndex - 1)];
        }
        if (gscrPos != 'template')
        {
            l_PrevRow.className = " ";
        }
        for (var l_Cnt = 0; l_Cnt < l_PrevRow.cells.length; l_Cnt++)
        {
            l_PrevRow.cells[l_Cnt].className = " ";
        } //for
    } //if

    var l_RowIndex = v_CurRow.parentNode.rowIndex;//static header change;
    fnCurrentRec["l_RowIndex"] = l_RowIndex;

    if (gscrPos != 'template')
    {
        v_CurRow.parentNode.className = "TDHighlightedSumRow";
    }
    var l_Row = v_CurRow.parentNode;

    for (var l_Cnt = 0; l_Cnt < l_Row.cells.length; l_Cnt++)
    {
        if (l_Row.cells[l_Cnt].className != "TDHighlightedSumRow")
        {
            l_Row.cells[l_Cnt].className = "TDHighlightedSumRow";
        }
    }
}

function fnResetQry(e){
    //if (!mainWin.isSessionActive()) return; //session expiry change  
    resetQueryCollapsible("true"); //REDWOOD_CHANGES
    if(fcjResponseDOM == null) return;
    resetElements(e);
    //Added for 17077004 start
    currQryCriteriaName = "";
    currQryCriteriaRemarks = "";
    //Added for 17077004 end
//    showToolbar_sum("resetQry");//REDWOOD_CHANGES
    //Fix for 16654373 Starts
    /*fnShowSummaryData(null, e);
    fnPostQueryChange(e);
    strCurrentTabID = 'idQuery';
    advCriteriaList = "";
    screenArgs["fcjRequestDOM"] = "";
    document.getElementsByName("navFirst")[0].disabled = true;
    document.getElementsByName("navFirst")[0].className = "BTNtextD";
    document.getElementsByName("navPrev")[0].disabled = true;
    document.getElementsByName("navPrev")[0].className = "BTNtextD";
    document.getElementsByName("navLast")[0].disabled = false;
    document.getElementsByName("navLast")[0].className = "BTNtext";
    document.getElementsByName("navNext")[0].disabled = false;
    document.getElementsByName("navNext")[0].className = "BTNtext";    
    
    if (getInnerText(document.getElementsByName("CurPage")[0])== getInnerText(document.getElementsByName("TotPgCnt")[0]))
    {
        document.getElementsByName("navLast")[0].disabled = true;
        document.getElementsByName("navLast")[0].className = "BTNtextD";
        document.getElementsByName("navNext")[0].disabled = true;
        document.getElementsByName("navNext")[0].className = "BTNtextD";
    }*/
     //static header change start	
//REDWOOD_CHANGES
//    var lockElement = document.getElementsByName("Locks")[0];
//    var selOptions = lockElement.options;
//    var anySelected = false;
//    for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++) {
//        if (selOptions[optnCnt].getAttribute("DEFAULT") || selOptions[optnCnt].getAttribute("DEFAULT") == "") {
//            anySelected = true;
//            lockElement.value = selOptions[optnCnt].getAttribute("DEFAULT");
//        }
//    }
//    if (!anySelected) {
//        if (selOptions.length != 0) 
//            lockElement.value = selOptions[0].value;
//    }
    //Fix for 21253228 start
//    fnHideFreezeTable();
document.getElementById("Search").disabled = false;
    document.getElementById("Search").style.display = "flex"
   if (document.getElementsByName("Search")[0].disabled == false) {
        resetElements();
		//Added for 17077004 start
        currQryCriteriaName = "";
        currQryCriteriaRemarks = "";
        document.getElementById("AdvSearch").disabled = false;
        document.getElementById("AdvSearch").style.display = "flex"
        //Added for 17077004 end
    }
    
    //Added for 17077004 start
    //document.getElementById("AdvSearch").disabled = false;
    //document.getElementById("AdvSearch").style.display = "block"
    //Added for 17077004 end
    if(document.getElementById("Refresh")){
    document.getElementById("Refresh").disabled = true;
    document.getElementById("Refresh").style.display = "none";
    }
    if(document.getElementById("SaveCriteria")){
    document.getElementById("SaveCriteria").style.display = "none";
    document.getElementById("SaveCriteria").disabled = true;
    }
    if (parseInt(summaryQryCriteria) == 0) {
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SavedQry").style.display = "none";
    } else {
        document.getElementById("SavedQry").disabled = false;
        document.getElementById("SavedQry").style.display = "flex";
    }
    //12.0.3 Summary to detail changes starts
    if(document.getElementById("Details")){
    document.getElementById("Details").style.display = "none";
    document.getElementById("Details").disabled = true;
    }		
//REDWOOD_CHANGES
    //Fix for 16654373 Ends
}

function fnGetLable(v_FieldName)
{
    if (l_LablesArr && l_LablesArr[v_FieldName]) return l_LablesArr[v_FieldName];
    else return v_FieldName;

}

// Kals May 29 to  Get the Order of the Qry Fieds..
function fnGetQryOrder()
{
    var l_QryTableRows = document.getElementById("TblQuery").tBodies[0].rows;
    for (var l_Cnt = 0; l_Cnt < l_QryTableRows.length; l_Cnt++)
    {
        var l_RowCells = l_QryTableRows[l_Cnt].cells;
        for (var l_CellCnt = 0; l_CellCnt < l_RowCells.length; l_CellCnt++)
        {} //for Cells 
    } //for rows

}

function fnRefresSum()
{

    fcjRequestDOM = chacheLastQryDOM["LastQRyDOM"];
    var l_Resp = fnSubmitQuery();
    if (l_Resp) return l_Resp;
    else return "";

}

function chacheLastQryDOM()
{}

function fnCacheTHEADNames()
{}

function fnCacheHeader()
{}

function fnSetHeader()
{
    if (! (fnCacheHeader["Header"]))
    {
        var l_ExistingHTML = document.getElementById("QryRslts").innerHTML;
        /*if (gscrPos == 'template')
        {*/
        /*ASSUMING THE SCREEN POSITION AS TEMPLATE */
            if (l_ExistingHTML.indexOf("<TBODY>") > -1) { //16654824 changes 
                l_ExistingHTML = l_ExistingHTML.substring(0, l_ExistingHTML.lastIndexOf("<TBODY>")); //16654824 changes
            } else {
            l_ExistingHTML = l_ExistingHTML.substring(0, l_ExistingHTML.lastIndexOf("<tr>"));
            }
        /*} else
        {
            l_ExistingHTML = l_ExistingHTML.substring(0, l_ExistingHTML.indexOf("<TR>"));
        }*/
        fnCacheHeader["Header"] = l_ExistingHTML;
    }
    //static header change start
    if (! (fnCacheHeader["FreezeHeader"]))
    {
        l_ExistingHTML = document.getElementById("QryRsltsFreeze").innerHTML;
            if (l_ExistingHTML.indexOf("<TR>") > -1) {
                l_ExistingHTML = l_ExistingHTML.substring(0, l_ExistingHTML.lastIndexOf("<TR>"));
            } else {
            l_ExistingHTML = l_ExistingHTML.substring(0, l_ExistingHTML.lastIndexOf("<tr>"));
            }
        fnCacheHeader["FreezeHeader"] = l_ExistingHTML;
    }
    //static header change end
}

function fnCurrentRec()
{}

function fnCheckUncheckAll()
{

    var l_ChBoxs = document.getElementsByName("RSLT_CHKBOX");
    var l_ChBoxsFreeze = document.getElementsByName("RSLT_CHKBOXFrz");//Fix for 21609922
    var l_ChkStatus = true;
    if (l_ChBoxs[0].checked == true) l_ChkStatus = true;
    else l_ChkStatus = false;
	//Fix for 21609922 start
    if (document.getElementsByName("Locks")[0].value != "0"){
        if (l_ChBoxsFreeze[0].checked == true) l_ChkStatus = true;
        else l_ChkStatus = false;
    }//Fix for 21609922 end
    for (var l_Cnt = 0; l_Cnt < l_ChBoxs.length; l_Cnt++)
    {
        l_ChBoxs[l_Cnt].checked = l_ChkStatus;
    }
	//Fix for 21609922 start
    for (var l_Cnt = 0; l_Cnt < l_ChBoxsFreeze.length; l_Cnt++)
    {
        l_ChBoxsFreeze[l_Cnt].checked = l_ChkStatus;
    }//Fix for 21609922 end
}

/*
fnBuildWhereClauseQry() will build the default where clause Query for Summary Screen
*/
function fnBuildAdvLOVWhereClauseQry(queryFld)
{
    var WhereClause = fnHandleDefaultWhere();
    var criteriaList = new Array();
    if (typeof(WhereClause) && WhereClause && WhereClause != "")
    {
        var columnList = new Array();
        var valueList = new Array();
        var defaultArray = WhereClause.split("~");
        for (var i = 0; i < defaultArray.length; i++)
        {
            var valueArray = defaultArray[i].split(":");
            columnList[i] = valueArray[0];
            valueList[i] = valueArray[1];
        }
        var whereQry = "";
        var selectList = "";
        whereQry = " WHERE ";
        for (var i = 0; i < defaultArray.length; i++)
        {
            whereQry = whereQry + columnList[i] + " = '" + valueList[i] + "'";
            if (queryFld != columnList[i]) selectList = selectList + columnList[i];
            if (i < defaultArray.length - 1)
            {
                whereQry = whereQry + " AND ";
                if (queryFld != columnList[i]) selectList = selectList + ",";
            }
        }
        if (selectList != "") selectList = "," + selectList;
        criteriaList[0] = whereQry;
        criteriaList[1] = selectList;
        return criteriaList;
    } else
    {
        return null;
    }
}

/**
 Function fnBuildSummaryLOV()
 This function will dynamically generate the lov for summary query.
 Author : Md. Saidul Anam
*/

function fnBuildSummaryLOV(stateVal, stateValLabel, stateValDtype, e)
{
    var summ_flag = true;
    fnBuildAdvLovSum(stateVal, stateValLabel, stateValDtype, summ_flag, e);	//REDWOOD_CHANGES
}

/**
 Function fnBuildAdvLov
 This function will dynamically generate the lov for advance screen.
 Author : Md. Saidul Anam
*/

function fnBuildAdvLovSum(stateVal, stateValLabel, stateValDtype, summ_flag, e, advLovReturnFld) //REDWOOD_CHANGES
{

    var dataSrc = stateVal.substring(0, stateVal.indexOf('.'));
    var queryFld = stateVal.substring(stateVal.indexOf('.') + 1, stateVal.length);
    var queryFld_temp = queryFld;
    var l_ForDate = "";

    if (stateValDtype == 'DATE')
    {

        /*var l_format = getSystemShortDateFormat().toUpperCase();*/
        var l_format = mainWin.systemDateFormat.toUpperCase();
        if (l_format.split('D').length == 2) l_format = l_format.replace('D', 'DD');
        if (l_format.split('M').length == 2) l_format = l_format.replace('M', 'MM');
        if (l_format.indexOf('MMM') != -1) l_format = l_format.replace('MMM', 'MON');
        stateVal = "TO_CHAR(" + stateVal + ",'" + l_format + "')";

        l_ForDate += "AS " + queryFld;

        queryFld = "TO_DATE(" + queryFld_temp + ",'" + l_format + "')";
    }

    var l_lov = "";
    // var query = "SELECT "+ queryFld_temp +" FROM (SELECT DISTINCT (" + stateVal + ") "+l_ForDate+" FROM " + dataSrc + whereQry + ") ORDER BY "+ queryFld;
    criteriaList = fnBuildAdvLOVWhereClauseQry(queryFld);
    if (criteriaList != null) var query = "SELECT " + queryFld_temp + " FROM " + "(SELECT DISTINCT (" + stateVal + ") " + l_ForDate + criteriaList[1] + " FROM " + dataSrc + criteriaList[0] + " AND " + queryFld_temp + " is not null ORDER BY " + queryFld + ")";
    else var query = "SELECT " + queryFld_temp + " FROM " + "(SELECT DISTINCT (" + stateVal + ") " + l_ForDate + " FROM " + dataSrc + ") WHERE " + queryFld_temp + " is not null ORDER BY " + queryFld;
    var reductionFlds = queryFld + "!TEXT!" + queryFld;

    var dtyp = "";
    if (stateValDtype == 'VARCHAR' || stateValDtype == 'VARCHAR2' || stateValDtype == 'CHAR')
    {
        dtyp = 'STRING';
    } else if (stateValDtype == 'NUMBER' || stateValDtype == 'INTEGER' || stateValDtype == 'NUMERIC')
    {
        dtyp = 'INT';
    } else if (stateValDtype == 'DATE')
    {
        dtyp = 'DATE';
    } else
    {
        dtyp = 'STRING';
    }
    var returnfld = 'idTextFieldValue';
    //if the lov is for summray query get the returned filed.
    if (summ_flag == true)
    {
        //returnfld = queryFld;
        //   FCUBS10.0ITR2 SFR:671, return field will point to field name instead columnname
        var retFldId = stateVal.replace('.', '__');
        if(retFldId.indexOf("TO_CHAR") != -1){
            retFldId = retFldId.substring(retFldId.indexOf("TO_CHAR(")+8,retFldId.lastIndexOf(","));
        }
        if (document.getElementById(retFldId)){	  //REDWOOD_CHANGES
        if (document.getElementById(retFldId).name) {
        returnfld = document.getElementById(retFldId).name;
        } else {
            returnfld = document.getElementById(retFldId).getAttribute("name");
        }
        } 
//REDWOOD_CHANGES
    }
    if(advLovReturnFld && typeof(advLovReturnFld) != 'undefined' && advLovReturnFld != ''){
        returnfld = advLovReturnFld;
    }	
//REDWOOD_CHANGES
    var title = stateValLabel;
    var colHeading = stateValLabel;
 
 /* # BUG 9832541 fixes start */
    l_lov = new lov('', reductionFlds, dtyp, returnfld, title, colHeading, "Form1", "", "100", "10", "ORACLE", "~");
/* # BUG 9832541 fixes end */
    l_lov.show_lov('', '', '', title, colHeading, colHeading, "undefined", "undefined", e);
}

function fnShowValues2(e)
{
    var fields = document.getElementById("idSelectField");
    if (fields.options.selectedIndex == -1)
    {
        //alert("Please select an element");
        alert(selectElement);
        return;
    }
    var stateVal = fields.options[fields.options.selectedIndex].value;
    var stateValLabel = getInnerText(fields.options[fields.options.selectedIndex]);
    var stateValDtype = fields.options[fields.options.selectedIndex].getAttribute("DTYPE");

    fnBuildAdvLov2(stateVal, stateValLabel, stateValDtype);
}

function fnBuildAdvLov2(stateVal, stateValLabel, stateValDtype)
{
    var dataSrc = stateVal.substring(0, stateVal.indexOf('.'));
    var queryFld = stateVal.substring(stateVal.indexOf('.') + 1, stateVal.length);
    var queryFld_temp = queryFld;
    var l_ForDate = "";

    if (stateValDtype == 'DATE')
    {

        /*var l_format = getSystemShortDateFormat().toUpperCase();*/
        var l_format = mainWin.systemDateFormat.toUpperCase();
        if (l_format.split('D').length == 2) l_format = l_format.replace('D', 'DD');
        if (l_format.split('M').length == 2) l_format = l_format.replace('M', 'MM');
        if (l_format.indexOf('MMM') != -1) l_format = l_format.replace('MMM', 'MON');
        stateVal = "TO_CHAR(" + stateVal + ",'" + l_format + "')";

        l_ForDate += "AS " + queryFld;

        queryFld = "TO_DATE(" + queryFld_temp + ",'" + l_format + "')";
    }

    var l_lov = "";
    criteriaList = fnBuildAdvLOVWhereClauseQry(queryFld);
    if (criteriaList != null) var query = "SELECT " + queryFld_temp + " FROM " + "(SELECT DISTINCT (" + stateVal + ") " + l_ForDate + criteriaList[1] + " FROM " + dataSrc + criteriaList[0] + " AND " + queryFld_temp + " is not null ORDER BY " + queryFld + ")";
    else var query = "SELECT " + queryFld_temp + " FROM " + "(SELECT DISTINCT (" + stateVal + ") " + l_ForDate + " FROM " + dataSrc + ") WHERE " + queryFld_temp + " is not null ORDER BY " + queryFld;
    var reductionFlds = queryFld + "!TEXT!" + queryFld;

    var dtyp = "";
    if (stateValDtype == 'VARCHAR' || stateValDtype == 'VARCHAR2' || stateValDtype == 'CHAR')
    {
        dtyp = 'STRING';
    } else if (stateValDtype == 'NUMBER' || stateValDtype == 'INTEGER' || stateValDtype == 'NUMERIC')
    {
        dtyp = 'INT';
    } else if (stateValDtype == 'DATE')
    {
        dtyp = 'DATE';
    } else
    {
        dtyp = 'STRING';
    }
    var returnfld = 'idTextFieldValue2';

    var title = stateValLabel;
    var colHeading = stateValLabel;
/* # BUG 9832541 fixes start */
    l_lov = new lov('', reductionFlds, dtyp, returnfld, title, colHeading, "Form1", "", "100", "10", "ORACLE", "~");
/* # BUG 9832541 fixes end */ 
    l_lov.show_lov('', '', '', title, colHeading, colHeading);
}

function fnCloseSumary()
{
    //window.close();
    parent.unmask();
    var childDivObj = parent.document.getElementById("ChildWin");
    childDivObj.getElementsByTagName("IFRAME")[0].src = "";
    parent.document.getElementById("BTN_EXIT").focus();
    parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
}
 //REDWOOD_CHANGES
function fnExit_sum(scrName, e) {
    if (scrName == '') {
        var evnt = window.event || e;
        isExitTriggered = true;
        fnFocus();
        //mainWin.showToolbar("", "", "");
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
        evnt.cancelBubble = true;
    } else {
        parent.fnExitAdvScr(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
    }

}
//12.1 summary performance changes new start
function fnExitAdvScr(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft) {
    parent.document.getElementById(parentScrID).style.width = launcherDIVWidth;
    parent.document.getElementById(parentScrID).children[0].style.width = launcherIFWidth;
    parent.document.getElementById(parentScrID).style.height = launcherDIVHeight;
    parent.document.getElementById(parentScrID).children[0].style.height = launcherIFHeight;
    parent.document.getElementById(parentScrID).style.left = launcherLeft;
    document.getElementById("DIVScrContainer").style.width = launcherResTreeWidth;
    document.getElementById("DIVScrContainer").style.height = launcherResTreeHeight;
    document.getElementById("DIVWNDContainer").style.width = launcherHeaderWidth;
	//12.1 summary performance changes new end
    var childDivObj = document.getElementById("ChildWin");
    childDivObj.getElementsByTagName("IFRAME")[0].src = "";
    document.getElementById("Div_ChildWin").removeChild(childDivObj);
    unmask(unmaskTitle);
    unmaskTitle = false;
    //Advanced Summary Query Building
    var imgLen = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].getElementsByTagName("span");//static header change
    if (imgLen.length > 0) {
        for (var i = 1;i < imgLen.length;i++) {
            imgLen[i].className = "SPNup hide";
        }
    }
    document.getElementById("BTN_EXIT").focus();
}
  //REDWOOD_CHANGES
function fnGetCurrency(relFld, valuesArr)
{
    var returnCcy = "";
    for (var cnt = 0; cnt < valuesArr.length - 1; cnt++)
    {
        var cnt_temp = "";
        if (g_SummaryType == "B")
        {
            cnt_temp = cnt + 1;
        } else
        {
            cnt_temp = cnt;
        }
        if (document.getElementById('TBL_QryRslts').tHead.rows[1].cells[cnt_temp].getAttribute("DBC") == relFld)
        {
            returnCcy = valuesArr[cnt];
            return returnCcy;
        }
    }
    if (returnCcy == "")
    {
        if (document.getElementById(relFld)) returnCcy = document.getElementById(relFld).value;
    }
    return returnCcy;
}

function fnBuildRequest_Imp()
{
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
    var sumfldTag = summaryFN.substring(summaryFN.indexOf(">") + 1, summaryFN.length);
    var dataXML = '<FCJMSG SRC="' + mainWin.AppSource + '" BRANCH = "' + mainWin.CurrentBranch + '" USERID = "' + mainWin.UserId + '">' + '<UPLOADQRY TYPE="N" ROOTTABLE = "' + dataSrcLocationArray[0] + '" SUMFN= "' + sumfldTag + '">' + '</UPLOADQRY>' + '</FCJMSG>';
    var requestDOM =loadXMLDOC(dataXML);
    var tableObject = document.getElementById("TBL_QryRslts");
    var allRows = tableObject.tBodies[0].rows;
    var recNodes = selectNodes(fcjResponseDOM, "//MSG/REC");
    //prompt("summary resp",fcjResponseDOM.xml);    
    var recNodeReq = requestDOM.createElement("TABLE");
    var recPkCols = new Array(pkFields.length);
    for (var pkCnt = 0; pkCnt < pkFields.length; pkCnt++)
    {
        recPkCols[pkCnt] = pkFields[pkCnt].substring(pkFields[pkCnt].lastIndexOf('__') + 2, pkFields[pkCnt].length);
    }
    var recArray = new Array(pkFields.length);
    var initialize = 0;
    for (var recCnt = 0; recCnt < recNodes.length; recCnt++)
    {
        if (allRows[recCnt].cells[0].getElementsByTagName("INPUT")[0].checked)
        {
            var recNode = selectSingleNode(fcjResponseDOM, "//MSG/REC[position()=" + (recCnt + 1) + "]");
            var recId = recNode.getAttribute("RECID");
            var recType = recNode.getAttribute("TYPE");
            recNodeReq.setAttribute("ID", recType);
            if (initialize == 0)
            {
                for (var cnt = 0; cnt < recArray.length; cnt++)
                {
                    recArray[cnt] = "";
                }
                initialize++;
            }
            var recPkValues = recId.split("~");
            for (var pkValueCnt = 0; pkValueCnt < recPkValues.length; pkValueCnt++)
            {
                recArray[pkValueCnt] += recPkValues[pkValueCnt] + "!";
            }
        }
    }
    var result = "";
    for (var pkCnt = 0; pkCnt < pkFields.length; pkCnt++)
    {
        result += recPkCols[pkCnt] + ":" + recArray[pkCnt].substring(0, recArray[pkCnt].length - 1) + "~";
    }
    result = result.substring(0, result.length - 1);
    //alert(result);
    setNodetext(recNodeReq, result);
    requestDOM.documentElement.appendChild(recNodeReq);
    //prompt("upload req",requestDOM.xml);        
    var fcjResponseDOM_temp = fnPost(requestDOM, servletURL, functionId);
    if (fcjResponseDOM_temp)
    {
        var msgStatus = '';
        var msgNode = selectSingleNode(fcjResponseDOM_temp, "FCJMSG/MSG");
        if (msgNode)
        {
            msgStatus = msgNode.getAttribute("MSGSTATUS");
        }
        var message = "";
        if (selectSingleNode(fcjResponseDOM_temp, "FCJMSG/MSG/RESPONSE"))
        {
            message = getNodeText(selectSingleNode(fcjResponseDOM_temp, "FCJMSG/MSG/RESPONSE"));
            message = message.substring(message.indexOf(" "), message.length);
            alert(getMessage(message, recPkValues[0] + "~"));
        } else
        {
            //alert('Server Processing Failed');
            alert(lblServerFailed);
        }
    }
}

function fnBuildRequest()
{
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
    var sumfldTag = summaryFN.substring(summaryFN.indexOf(">") + 1, summaryFN.length);
    var dataXML = '<FCJMSG SRC="' + mainWin.AppSource + '" BRANCH = "' + mainWin.CurrentBranch + '" USERID = "' + mainWin.UserId + '">' + '<UPLOADQRY TYPE="N" ROOTTABLE = "' + dataSrcLocationArray[0] + '" SUMFN= "' + sumfldTag + '">' + '</UPLOADQRY>' + '</FCJMSG>';
    var requestDOM= loadXMLDoc(dataXML);
    var tableObject = document.getElementById("TBL_QryRslts");
    var allRows = tableObject.tBodies[0].rows;
    var recNodes = selectNodes(fcjResponseDOM, "//MSG/REC");
    //prompt("summary resp",fcjResponseDOM.xml);    
    var recNodeReq = requestDOM.createElement("TABLE");
    var recPkCols = new Array(pkFields.length);
    for (var pkCnt = 0; pkCnt < pkFields.length; pkCnt++)
    {
        recPkCols[pkCnt] = pkFields[pkCnt].substring(pkFields[pkCnt].lastIndexOf('__') + 2, pkFields[pkCnt].length);
    }
    var recArray = new Array(pkFields.length);
    var initialize = 0;
    for (var recCnt = 0; recCnt < recNodes.length; recCnt++)
    {
        if (allRows[recCnt].cells[0].getElementsByTagName("INPUT")[0].checked)
        {
            var result = "";
            var recNode = selectSingleNode(fcjResponseDOM, "//MSG/REC[position()=" + (recCnt + 1) + "]");
            var recId = recNode.getAttribute("RECID");
            var recType = recNode.getAttribute("TYPE");
            recNodeReq.setAttribute("ID", recType);
            var recPkValues = recId.split("~");
            for (var pkValueCnt = 0; pkValueCnt < recPkValues.length; pkValueCnt++)
            {
                result += recPkCols[pkValueCnt] + ":" + recPkValues[pkValueCnt] + "~";
            }
            result = result.substring(0, result.length - 1);
            //alert(result);
            setNodeText(recNodeReq, result);
            requestDOM.documentElement.appendChild(recNodeReq);
            //prompt("upload req",requestDOM.xml);        
            gAction = "SUMMARY_UPLOAD";
            var fcjResponseDOM_temp = fnPost(requestDOM, servletURL, functionId);
            if (fcjResponseDOM_temp)
            {
                var msgStatus = '';
                var msgNode = selectSingleNode(fcjResponseDOM_temp, "FCJMSG/MSG");
                if (msgNode)
                {
                    msgStatus = msgNode.getAttribute("MSGSTATUS");
                }
                var message = "";
                if (selectSingleNode(fcjResponseDOM_temp, "FCJMSG/MSG/RESPONSE"))
                {
                    message = getNodeText(selectSingleNode(fcjResponseDOM_temp, "FCJMSG/MSG/RESPONSE"));
                    message = message.substring(message.indexOf(" "), message.length);
                    alert(getMessage(message, recPkValues[0] + "~"));
                } else
                {
                    //alert('Server Processing Failed');
                    alert(lblServerFailed);
                }
            }
        }
    }
}

function fnCheckOperator()
{
    var operator = document.getElementById("idSelectOp");
    /*Fix for BugNo:17353210 starts*/
	if ((trim(operator.value)).toUpperCase() == "BETWEEN")
    {
        if (document.getElementById("idTextFieldValue2")) {
          getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))).disabled = false;
          fnEnableElement(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))));
          getNextSibling(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2")))).className = "BTNimg";
          //fnEnableElement(document.getElementById("idTextFieldValue2"));
        }
    } else
    {
        if (document.getElementById("idTextFieldValue2")) {
          fnDisableElement(document.getElementById("idTextFieldValue2"));
          if(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2")))){
            getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))).disabled = true;
            fnDisableElement(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))));
            getNextSibling(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2")))).className = "BTNhide";
          }
        }
    }
	/*Fix for BugNo:17353210 ends*/
}

// Reddy Prasad added
function doNavigate(type, e)
{
    switch (type)
    {
    case gcNAV_FIRST:
        document.getElementsByName("gotopage")[0].value = "";
        fnShowSummaryData(null, e);
        document.getElementsByName("Records")[0].value= gRecordPages;  
        document.getElementsByName("navFirst")[0].disabled = true;
        //document.getElementsByName("navFirst")[0].className = "BTNtextD";	//REDWOOD_CHANGES
        document.getElementsByName("navPrev")[0].disabled = true;
        //document.getElementsByName("navPrev")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        document.getElementsByName("navLast")[0].disabled = false;
        //document.getElementsByName("navLast")[0].className = "BTNtext"; //REDWOOD_CHANGES
        document.getElementsByName("navNext")[0].disabled = false;
        //document.getElementsByName("navNext")[0].className = "BTNtext"; //REDWOOD_CHANGES
        setInnerText(document.getElementsByName("CurPage")[0],1);
        break;
    case gcNAV_PREVIOUS:
        document.getElementsByName("gotopage")[0].value = "";
        fnShowSummaryData(null, e);
        document.getElementsByName("Records")[0].value= gRecordPages;  
        setInnerText(document.getElementsByName("CurPage")[0],Number(getInnerText(document.getElementsByName("CurPage")[0])) - 1); 
        document.getElementsByName("navLast")[0].disabled = false;
        //document.getElementsByName("navLast")[0].className = "BTNtext"; //REDWOOD_CHANGES
        document.getElementsByName("navNext")[0].disabled = false;
        //document.getElementsByName("navNext")[0].className = "BTNtext";  //REDWOOD_CHANGES
        if (getInnerText(document.getElementsByName("CurPage")[0]) == 1)
        {
            document.getElementsByName("navFirst")[0].disabled = true;
            //document.getElementsByName("navFirst")[0].className = "BTNtextD";//REDWOOD_CHANGES
            document.getElementsByName("navPrev")[0].disabled = true;
            //document.getElementsByName("navPrev")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        }
       /* if (getInnerText(document.getElementsByName("TotPgCnt")[0]) =="..." ){
            document.getElementsByName("navLast")[0].disabled = true;
            document.getElementsByName("navLast")[0].className = "BTNimgD";
        }*/
        break;
    case gcNAV_NEXT:
        document.getElementsByName("gotopage")[0].value = "";
        fnShowSummaryData(null, e);
        document.getElementsByName("Records")[0].value= gRecordPages;  
        setInnerText(document.getElementsByName("CurPage")[0],Number(getInnerText(document.getElementsByName("CurPage")[0])) + 1); 
        document.getElementsByName("navFirst")[0].disabled = false;
        //document.getElementsByName("navFirst")[0].className = "BTNtext"; //REDWOOD_CHANGES
        document.getElementsByName("navPrev")[0].disabled = false;
        //document.getElementsByName("navPrev")[0].className = "BTNtext"; //REDWOOD_CHANGES
        if (getInnerText(document.getElementsByName("TotPgCnt")[0]) !="..." && Number(getInnerText(document.getElementsByName("CurPage")[0])) == Number(getInnerText(document.getElementsByName("TotPgCnt")[0])))
        {
            document.getElementsByName("navLast")[0].disabled = true;
            //document.getElementsByName("navLast")[0].className = "BTNtextD";//REDWOOD_CHANGES
            document.getElementsByName("navNext")[0].disabled = true;
            //document.getElementsByName("navNext")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        }
        /*if (getInnerText(document.getElementsByName("TotPgCnt")[0]) =="..." ){
            document.getElementsByName("navLast")[0].disabled = true;
            document.getElementsByName("navLast")[0].className = "BTNimgD";
        }*/
        if(document.getElementById("TBL_QryRslts").tBodies[0].rows.length < gRecordPages){
            document.getElementsByName("navLast")[0].disabled = true;
            //document.getElementsByName("navLast")[0].className = "BTNtextD"; //REDWOOD_CHANGES
            document.getElementsByName("navNext")[0].disabled = true;
            //document.getElementsByName("navNext")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        }
        break;
    case gcNAV_LAST:
        document.getElementsByName("gotopage")[0].value = "";
        fnShowSummaryData(null, e);
        document.getElementsByName("Records")[0].value= gRecordPages;
        if(getInnerText(document.getElementsByName("TotPgCnt")[0])!="..."){
            setInnerText(document.getElementsByName("CurPage")[0],Number(getInnerText(document.getElementsByName("TotPgCnt")[0]))); 
        }
        document.getElementsByName("navLast")[0].disabled = true;
        //document.getElementsByName("navLast")[0].className = "BTNtextD";//REDWOOD_CHANGES
        document.getElementsByName("navNext")[0].disabled = true;
        //document.getElementsByName("navNext")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        document.getElementsByName("navFirst")[0].disabled = false;
        //document.getElementsByName("navFirst")[0].className = "BTNtext"; //REDWOOD_CHANGES
        document.getElementsByName("navPrev")[0].disabled = false;
        //document.getElementsByName("navPrev")[0].className = "BTNtext";	//REDWOOD_CHANGES
        break;
    default:
	/* FCUBS 11.2.3 NLS Changes */
        //alert("Program Error: doNavigate doesn't handle this action");
		showErrorAlerts('CS-AL-141');
    }
    document.getElementsByName("gotopage")[0].focus();
    document.getElementsByName("gotopage")[0].select();
}

function goToPage(e)
{
    if (document.getElementsByName("gotopage")[0].value == "")
    {
        alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        return;
    } else if (isNaN(document.getElementsByName("gotopage")[0].value))
    {
        alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        document.getElementsByName("gotopage")[0].value = "";
        return;
    } else if (document.getElementsByName("gotopage")[0].value <= 0 || document.getElementsByName("gotopage")[0].value.indexOf(".") != -1)
    {
        alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        document.getElementsByName("gotopage")[0].value = "";
        return;
    } else if(getInnerText(document.getElementsByName("TotPgCnt")[0]) !="..." && document.getElementsByName("gotopage")[0].value > Number(getInnerText(document.getElementsByName("TotPgCnt")[0]))) {
        alert(mainWin.getItemDesc("LBL_PAGE_NO_NOT_EXIST"));
        document.getElementsByName("gotopage")[0].value = "";
        return;       
    }
    setInnerText(document.getElementsByName("CurPage")[0],Number(document.getElementsByName("gotopage")[0].value));  
    fnShowSummaryData(null, e);
    document.getElementsByName("Records")[0].value= gRecordPages;  
    var curPag = Number(getInnerText(document.getElementsByName("CurPage")[0]));
    var goPag = Number(document.getElementsByName("gotopage")[0].value);
    var totPag = getInnerText(document.getElementsByName("TotPgCnt")[0]);
    if(totPag!="..."){
    if (goPag == totPag)
    {
        document.getElementsByName("navLast")[0].disabled = true;
        //document.getElementsByName("navLast")[0].className = "BTNtextD";//REDWOOD_CHANGES
        document.getElementsByName("navNext")[0].disabled = true;
        //document.getElementsByName("navNext")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        document.getElementsByName("navFirst")[0].disabled = false;
        //document.getElementsByName("navFirst")[0].className = "BTNtext"; //REDWOOD_CHANGES
        document.getElementsByName("navPrev")[0].disabled = false;
        //document.getElementsByName("navPrev")[0].className = "BTNtext";  //REDWOOD_CHANGES
    }
    if (goPag == 1)
    {
        document.getElementsByName("navFirst")[0].disabled = true;
        //document.getElementsByName("navFirst")[0].className = "BTNtextD";	 //REDWOOD_CHANGES
        document.getElementsByName("navPrev")[0].disabled = true;
        //document.getElementsByName("navPrev")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        document.getElementsByName("navLast")[0].disabled = false;
        //document.getElementsByName("navLast")[0].className = "BTNtext";  //REDWOOD_CHANGES
        document.getElementsByName("navNext")[0].disabled = false;
        //document.getElementsByName("navNext")[0].className = "BTNtext";  //REDWOOD_CHANGES
    }
    if (totPag == 1)
    {
        document.getElementsByName("navFirst")[0].disabled = true;
        //document.getElementsByName("navFirst")[0].className = "BTNtextD";//REDWOOD_CHANGES
        document.getElementsByName("navPrev")[0].disabled = true;
        //document.getElementsByName("navPrev")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        document.getElementsByName("navLast")[0].disabled = true;
        //document.getElementsByName("navLast")[0].className = "BTNtextD"; //REDWOOD_CHANGES
        document.getElementsByName("navNext")[0].disabled = true;
        //document.getElementsByName("navNext")[0].className = "BTNtextD"; //REDWOOD_CHANGES
    }
    if (goPag > 1 && goPag < totPag)
    {
        document.getElementsByName("navFirst")[0].disabled = false;
        //document.getElementsByName("navFirst")[0].className = "BTNtext"; //REDWOOD_CHANGES
        document.getElementsByName("navNext")[0].disabled = false;
        //document.getElementsByName("navNext")[0].className = "BTNtext";	//REDWOOD_CHANGES
        document.getElementsByName("navPrev")[0].disabled = false;
        //document.getElementsByName("navPrev")[0].className = "BTNtext";  //REDWOOD_CHANGES
        document.getElementsByName("navLast")[0].disabled = false;
        //document.getElementsByName("navLast")[0].className = "BTNtext";	//REDWOOD_CHANGES
    }
    }else{
        if (goPag == 1){
            document.getElementsByName("navFirst")[0].disabled = true;
            //document.getElementsByName("navFirst")[0].className = "BTNtextD";	 //REDWOOD_CHANGES
            document.getElementsByName("navPrev")[0].disabled = true;
            //document.getElementsByName("navPrev")[0].className = "BTNtextD";	//REDWOOD_CHANGES
            document.getElementsByName("navNext")[0].disabled = false;
            //document.getElementsByName("navNext")[0].className = "BTNtext";	//REDWOOD_CHANGES
            document.getElementsByName("navLast")[0].disabled = false;
            document.getElementsByName("navLast")[0].className = "BTNtext";
        }
        if (goPag > 1){
            document.getElementsByName("navFirst")[0].disabled = false;
            //document.getElementsByName("navFirst")[0].className = "BTNtext";	//REDWOOD_CHANGES
            document.getElementsByName("navNext")[0].disabled = false;
            //document.getElementsByName("navNext")[0].className = "BTNtext";  //REDWOOD_CHANGES
            document.getElementsByName("navPrev")[0].disabled = false;
            //document.getElementsByName("navPrev")[0].className = "BTNtext";  //REDWOOD_CHANGES
            document.getElementsByName("navLast")[0].disabled = false;
            //document.getElementsByName("navLast")[0].className = "BTNtext"; //REDWOOD_CHANGES
        }
    }
    document.getElementsByName("gotopage")[0].focus();
    document.getElementsByName("gotopage")[0].select();
}

function fnShowResults(e)
{
    fnShowSummaryData(null, e);
    fnPostQueryChange();
}

function fnPostQueryChange()
{
    if (fcjResponseDOM)
    {
        if (document.getElementById("QryRslts"))
        {
            setInnerText(document.getElementsByName("CurPage")[0],1);   
			if(gRecordPages != 0) //Fix for 14683905 
            document.getElementsByName("Records")[0].value= gRecordPages; 
            var totalPg = Math.ceil((selectNodes(fcjResponseDOM, "//REC/FV").length) / (document.getElementsByName("Records")[0].value));
            var recordPerPage = document.getElementsByName("Records")[0].value * 5;
            if(totalPg > 5){
                totalPg = "...";
            }
            setInnerText(document.getElementsByName("TotPgCnt")[0],totalPg);
            document.getElementsByName("go")[0].disabled = false;
            document.getElementsByName("go")[0].className = "BTNtext";
            document.getElementsByName("Records")[0].disabled = false;
            document.getElementsByName("gotopage")[0].readOnly = false;
            document.getElementsByName("gotopage")[0].disabled = false;
            document.getElementsByName("gotopage")[0].className = "TextNormal";
            if ((selectNodes(fcjResponseDOM, "//REC/FV").length) <= (document.getElementsByName("Records")[0].value)) setInnerText(document.getElementsByName("TotPgCnt")[0],1);

            if (getInnerText(document.getElementsByName("CurPage")[0]) == 1)
            {
                document.getElementsByName("navFirst")[0].disabled = true;
                //document.getElementsByName("navFirst")[0].className = "BTNtextD";	//REDWOOD_CHANGES
                document.getElementsByName("navPrev")[0].disabled = true;
                //document.getElementsByName("navPrev")[0].className = "BTNtextD";//REDWOOD_CHANGES
                //if(totalPg !="..."){
                    document.getElementsByName("navLast")[0].disabled = false;
                    //document.getElementsByName("navLast")[0].className = "BTNtext"; //REDWOOD_CHANGES
                //}
                document.getElementsByName("navNext")[0].disabled = false;
                //document.getElementsByName("navNext")[0].className = "BTNtext"; //REDWOOD_CHANGES
                //Fix for 21253228, 21399209 start
                var headerTable = document.getElementById("TBL_QryRsltsHeader");
                if (g_SummaryType == "B" || g_SummaryType == "U" || exportReq == 'Y')
                    maxFreezeIndex = '5';
                else
                    maxFreezeIndex = '4';
                if (headerTable.tBodies[0].rows[0].cells.length-1 > maxFreezeIndex)
                    document.getElementsByName("Locks")[0].disabled = false; //staic header change;//Fix for 21253228, 21399209 end
            }

            if (getInnerText(document.getElementsByName("CurPage")[0]) == getInnerText(document.getElementsByName("TotPgCnt")[0]))
            {
                document.getElementsByName("navFirst")[0].disabled = true;
                //document.getElementsByName("navFirst")[0].className = "BTNtextD";	  //REDWOOD_CHANGES
                document.getElementsByName("navPrev")[0].disabled = true;
                //document.getElementsByName("navPrev")[0].className = "BTNtextD";	//REDWOOD_CHANGES
                document.getElementsByName("navLast")[0].disabled = true;
                //document.getElementsByName("navLast")[0].className = "BTNtextD"; //REDWOOD_CHANGES
                document.getElementsByName("navNext")[0].disabled = true;
               // document.getElementsByName("navNext")[0].className = "BTNtextD";	//REDWOOD_CHANGES
                document.getElementsByName("gotopage")[0].disabled = false;
                //document.getElementsByName("gotopage")[0].className = "TextReadonly";  //REDWOOD_CHANGES  
                document.getElementsByName("gotopage")[0].readOnly = true;  
                document.getElementsByName("go")[0].disabled = true;
                //document.getElementsByName("go")[0].className = "BTNtextD";    //REDWOOD_CHANGES           
            }
        }
    }
}

function fnRefresh()
{
    var tblObj = document.getElementById("TBL_QryRslts");
    if (tblObj)
    {
        if (tblObj.tBodies[0].rows.length > 1) fnExecuteQuery();
    }
}

// Fix for 17919227 starts
/*function fnSortRecs(event){
    var summTable = document.getElementById("TBL_QryRslts");
    var summTableRows = summTable.tBodies[0].rows;
    var event = window.event || event;
    if (summTableRows.length == 1)    {
        return;
    }else{
        var appearingRows = selectNodes(fcjResponseDOM, "//REC/FV").length;
        var srcElem =getEventSourceElement(event);
        var cellElement = srcElem;
        while(cellElement.tagName != "TH"){
            cellElement = cellElement.parentNode;
        }
         //Bug 16615111 Changes Starts
        if(exportReq == 'Y'){
	  //Bug 16615111 Changes Ends
          celIndex = cellElement.cellIndex-1;
	  //Bug 16615111 Changes Starts
        }else{
          celIndex = cellElement.cellIndex;
        }
        //Bug 16615111 Changes Ends
      //  celIndex = cellElement.cellIndex-1;//Fix for bug 17259677
        var cellsArray = new Array();
        var recssArray = new Array();
        for (var rows = 0; rows < appearingRows; rows++){
            cellsArray[rows] = getNodeText(selectNodes(fcjResponseDOM, "//REC/FV")[rows]).split("~")[celIndex];
        }
		// Fix for bug 17259677 starts
		//var numIdentifier = true;
        //if (srcElem.getAttribute("DTYPE") == "DATE"){
		if (cellElement.getAttribute("DTYPE") == "DATE"){
		// Fix for bug 17259677 ends
            try{
                if (srcElem.getAttribute("order") == "asc"){                
                    cellsArray.sort(fnSortDateAsc);
                    srcElem.setAttribute("order","desc"); 
					cellElement.setAttribute("order","desc"); // Fix for bug 17259677 
                }else{
                    cellsArray.sort(fnSortDateDesc);
                    srcElem.setAttribute("order","asc"); 
					cellElement.setAttribute("order","asc"); // Fix for bug 17259677 
                }            	
            } catch(e){}
        // Fix for bug 17259677 starts
		//}else if(event.srcElement.DTYPE == "NUMBER" && event.srcElement.TYPE =="AMOUNT") {
		}else if(cellElement.getAttribute("DTYPE") == "NUMBER" && cellElement.getAttribute("TYPE") =="AMOUNT") {
		// Fix for bug 17259677 ends
		
            try{
			    // Fix for bug 17259677 starts
                //if(event.srcElement.order == "asc"){
				if (srcElem.getAttribute("order") == "asc"){ 
				// Fix for bug 17259677 ends
                    cellsArray.sort(sortByNumberAsc);
                    srcElem.setAttribute("order","desc"); 
					cellElement.setAttribute("order","desc"); // Fix for bug 17259677 
                }else{
                    cellsArray.sort(sortByNumberDesc);  
                    srcElem.setAttribute("order","asc"); // Fix for bug 17259677 
					cellElement.setAttribute("order","asc"); // Fix for bug 17259677 
                }            
            }catch(e){}    
        } else{
			// Fix for bug 17259677 starts
            /*for (var cnt = 0; cnt < cellsArray.length; cnt++){
                if (/[A-z|\/]/ .test(cellsArray[cnt])){
                    numIdentifier = false;
                    break;
                }
                if (isNaN(parseInt(cellsArray[cnt]))) {
                    numIdentifier = true;
                    break;
                }
            }*/
            /*try{
                if (srcElem.getAttribute("order") == "asc"){
				// Fix for bug 17259677 starts
                /*if (!numIdentifier) cellsArray.sort();
                else cellsArray.sort(sortByNumberAsc);*/
				//cellsArray.sort();
				// Fix for bug 17259677 ends
                /*srcElem.setAttribute("order","desc");
				cellElement.setAttribute("order","desc"); // Fix for bug 17259677 
				
                } else{
                    // if (!numIdentifier){ // Fix for bug 17259677 
                        cellsArray.sort();
                        cellsArray.reverse();
					// Fix for bug 17259677 starts
                    /*}
                    else{
                      cellsArray.sort(sortByNumberDesc);
                    }*/
					// Fix for bug 17259677 ends
                    /*srcElem.setAttribute("order","asc"); 
					cellElement.setAttribute("order","asc"); // Fix for bug 17259677 
                }
            } catch(e){}
        }
        
        var flag = true;
        var isdiffer = false;
        for (var cnt = 0; cnt < cellsArray.length; cnt++){
            for (var itr = 0; itr < appearingRows; itr++){
                var currRow = selectNodes(fcjResponseDOM, "//REC/FV")[itr];
                var curval = getNodeText(currRow).split("~")[celIndex];
                if (curval == cellsArray[cnt]){
                    for (var itr1 = 0; itr1 < recssArray.length; itr1++){
                        if (recssArray[itr1].getAttribute("RECID") == currRow.parentNode.getAttribute("RECID")){
                            flag = false;
                            break;
                        }
                    }
                    if (flag){
                        var rec = fcjResponseDOM.createElement("REC");
                        rec.setAttribute("TYPE", currRow.parentNode.getAttribute("TYPE"));
                        rec.setAttribute("RECID", currRow.parentNode.getAttribute("RECID"));
                        var Fv = fcjResponseDOM.createElement("FV");
                        var value = getNodeText(currRow);
                        var Fvtext = fcjResponseDOM.createCDATASection(value);
                        Fv.appendChild(Fvtext);
                        rec.appendChild(Fv);
                        recssArray[cnt] = rec;
                    }
                    flag = true;
                }
                if (itr > 0){
                    if (getNodeText(selectNodes(fcjResponseDOM, "//REC/FV")[itr]).split("~")[celIndex] != getNodeText(selectNodes(fcjResponseDOM,"//REC/FV")[itr - 1]).split("~")[celIndex])
                    {
                        isdiffer = true;
                    }
                }
            }
        }
        if (isdiffer){
            for (var itr = 0; itr < appearingRows; itr++){
                var currNode = selectNodes(fcjResponseDOM, "//REC")[0];
                selectSingleNode(fcjResponseDOM,"//MSG").removeChild(currNode);
            }
            for (var itr = 0; itr < recssArray.length; itr++) {
                selectSingleNode(fcjResponseDOM, "//MSG").appendChild(recssArray[itr]);
            }

            fnShowSummaryData(null, event);
            fnPostQueryChange();
        }
    }
	preventpropagate(event); // Fix for bug 17259677
}

function sortByNumberAsc(a, b)
{
    var re = new RegExp(',', "g");
    a = a.replace(re, "");
    b = b.replace(re, "");
    return a - b;
}

function sortByNumberDesc(a, b)
{
    var re = new RegExp(',', "g");
    a = a.replace(re, "");
    b = b.replace(re, "");
    return b - a;
}

var dateRE = /^(\d{2})[\/\- ](\d{2})[\/\- ](\d{4})/;
function fnSortDateAsc(a, b)
{
    a = a.replace(dateRE, "$3$1$2");
    b = b.replace(dateRE, "$3$1$2");
    if (a > b) return 1;
    if (a < b) return - 1;
    return 0;
}

function fnSortDateDesc(a, b)
{
    a = a.replace(dateRE, "$3$1$2");
    b = b.replace(dateRE, "$3$1$2");
    if (a > b) return - 1;
    if (a < b) return 1;
    return 0;
}*/

function fnSortRecs(e) {
    var event = window.event || e;
    var scrElem = getEventSourceElement(event);
   // if (scrElem.parentNode.getAttribute("name") == 'undefined') { //9NT1606_12_4_RETRO_12_1_26709644 
    if (scrElem.parentNode.parentNode.getAttribute("name") == 'undefined') { //9NT1606_12_4_RETRO_12_1_26709644 
        //var fldName = scrElem.parentNode.name; //9NT1606_12_4_RETRO_12_1_26709644 
		var fldName = scrElem.parentNode.parentNode.name;//9NT1606_12_4_RETRO_12_1_26709644 
    } else {
        //var fldName = scrElem.parentNode.getAttribute("name");9NT1606_12_4_RETRO_12_1_26709644 
		var fldName = scrElem.parentNode.parentNode.getAttribute("name"); //9NT1606_12_4_RETRO_12_1_26709644 
    }
    var orderType = scrElem.getAttribute("order");
	//9NT1606_12_4_RETRO_12_2_26384512 start
	if(orderType == "null" || orderType == null)
	{
		orderType = scrElem.parentNode.getAttribute("order");
	}
	//9NT1606_12_4_RETRO_12_2_26384512 end
    defaultOrderByClause = fldName + ">" + orderType;
    fnExecuteQuery_sum('Y', event);
    var headerElements = document.getElementById("TBL_QryRsltsHeader").getElementsByTagName("TD");
    for (var i=0; i < headerElements.length; i++) {
        if (headerElements[i].getAttribute("name") == fldName) {
            if (orderType == "asc") {
                headerElements[i].setAttribute("order","desc");
                headerElements[i].children[0].setAttribute("order","desc");
                headerElements[i].children[0].children[0].setAttribute("order","desc"); //9NT1606_12_4_RETRO_12_1_26709644
            } else {
                headerElements[i].setAttribute("order","asc");
                headerElements[i].children[0].setAttribute("order","asc");
                headerElements[i].children[0].children[0].setAttribute("order","asc"); //9NT1606_12_4_RETRO_12_1_26709644
            }
            break;
        }
    }
     fnSyncScroll(document.getElementById("QryRslts"));//fixes for bug#21269118
	 //FCUBS_MEGA_14.3_32985564 Starts
	 try
	 {
        var fnEval = new Function("evnt","fnPostExecuteQuery_Summary(event)");  
        fnEval(event); 
     } catch(e){}
	//FCUBS_MEGA_14.3_32985564 Ends
    preventpropagate(event);
    return true;
}

function fnExecuteQuery_sum(fromSearch, e) {
    debugs("fromSearch=", fromSearch);
    gAction = "EXECUTEQUERY";
//REDWOOD_35428174 Starts
  try
    {
         var fnEval = new Function("e","fnPreExecuteQuery_Summary(e)");  
        fnEval(e); 
    } catch(e)
    {}
//REDWOOD_35428174 ends
//REDWOOD_CHANGES    
    if(fromSearch == 'A'){
//        strCurrentTabId = 'idAdvanced';
        fcjRequestDOM = buildSummaryQueryXML('');
    }else{	   
//REDWOOD_CHANGES
    strCurrentTabId = 'idQuery';
    fcjRequestDOM = buildSummaryQueryXML('Y');
    }	//REDWOOD_CHANGES
    debugs("fcjRequestDOM=", getXMLString(fcjRequestDOM));
    LastQryDOM = loadXMLDoc(getXMLString(fcjRequestDOM));
    debugs(getXMLString(fcjRequestDOM), "P");
   // if (!fnSubmitQuery()) { 9NT1606_12_4_RETRO_12_1_26709644 
   if (!fnSubmitQuery(e)) { //9NT1606_12_4_RETRO_12_1_26709644 
        /*debugs("CALLING fnResetQry");
        fnResetQry();*/
    }
//35428174 Starts
  try
    {
         var fnEval = new Function("e","fnPostExecuteQuery_Summary(e)");  
        fnEval(e); 
    } catch(e)
    {}
//35428174 Ends
    debugs("SummaryHTML", document.body.innerHTML);
}
// Fix for 17919227 ends

function fndisableNavBtns()
{
    document.getElementsByName("navFirst")[0].disabled = true;
    //document.getElementsByName("navFirst")[0].className = "BTNtextD";//REDWOOD_CHANGES
    document.getElementsByName("navPrev")[0].disabled = true;
    //document.getElementsByName("navPrev")[0].className = "BTNtextD"; //REDWOOD_CHANGES
    document.getElementsByName("navLast")[0].disabled = true;
    //document.getElementsByName("navLast")[0].className = "BTNtextD"; //REDWOOD_CHANGES
    document.getElementsByName("navNext")[0].disabled = true;
    //document.getElementsByName("navNext")[0].className = "BTNtextD"; //REDWOOD_CHANGES
    document.getElementsByName("go")[0].disabled = true;
    //document.getElementsByName("go")[0].className = "BTNtextD";  //REDWOOD_CHANGES
    document.getElementsByName("Records")[0].disabled = false; //9NT1606_12_4_RETRO_12_0_3_27107088 - changed value from true to false 
    //document.getElementsByName("gotopage")[0].className = "TextReadonly";//REDWOOD_CHANGES
    document.getElementsByName("gotopage")[0].readOnly = true;
    //document.getElementById("QryRslts").style.height = 300;
}

/*function fnkeydown(event){
    if(event.keyCode == 13){
        fnDetailScreen(event);
    }else{
        return;
    }
}*/
function fnSortRecsk(event){
    if(event.keyCode == 13){
        fnSortRecs(event);
    }else{
        return;
    }
}
 //REDWOOD_CHANGES
function fnCalcHgt(){//OJET Migration
	mainWin.toggleNavigation('close');
    var containerDIV = "ChildWin";
    if (typeof (fromSubScr) == 'undefined'){
        containerDIV = seqNo;
    }//HTML5 Changes Start
    scrWidth = "100%";
    var pageHeadDoc = document.getElementById("PageHead");
//	scrWidth = pageHeadDoc.getAttribute("screenwidth");
//	if (scrWidth > mainWin.x - 2){
//        scrWidth = mainWin.x - 2;
//    }
	pageHeadDoc.style.width = "100%";
    //document.getElementById("toolbarSummary").style.width = "100%";
    //document.getElementById("DIVScrContainer").style.width = "100%";
    document.getElementById("DIVWNDContainer").style.width = "100%";
    //pageHeadDoc.style.overflow = "auto";
    //document.getElementById("QryRslts").style.width = "100%";
//	 var mainDiv = null;
//    if( parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0 ){
//        mainDiv =  mainWin.document.getElementById("dashboard");
//    }else{
//        mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
//    }
	parent.document.getElementById(containerDIV).style.height =  parseInt(mainWin.document.getElementById("mainContent").offsetHeight)  + "px";
    parent.document.getElementById(containerDIV).children[0].style.height = "100%";
    document.getElementById("ScrollYes").style.overflow = "auto";
	//var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight); 
    //var diffHeight = "";
    document.getElementById("ScrollYes").style.height = parseInt(mainWin.document.getElementById("mainContent").offsetHeight) -document.getElementById("ScrollNo").offsetHeight  - document.getElementById("WNDtitlebar").offsetHeight -$("#toolbarSummary").outerHeight(true) + "px";
    
   
//    if (scrHeight > parseInt(mainDiv.offsetHeight)) {
//        //diffHeight = scrHeight - mainDiv.offsetHeight - 10;
//        scrHeight = parseInt(mainDiv.offsetHeight);
//        var pageHeadDoc = document.getElementById("PageHead");
//        if (pageHeadDoc.offsetHeight + document.getElementById("toolbarSummary").offsetHeight > mainDiv.offsetHeight * 0.35) {
//            pageHeadDoc.style.height = mainDiv.offsetHeight * 0.35 - document.getElementById("toolbarSummary").offsetHeight + "px";
//            pageHeadDoc.style.overflow = "auto";
//        }
//
//    } else {
//        scrHeight = parseInt(mainDiv.offsetHeight);
//    }
////	var resultsContainerHgt = mainDiv.offsetHeight - (
////		//document.getElementById("sumHeaderContainer").offsetHeight + 
////		document.getElementById("Table_NavOptions").offsetHeight +
////		document.getElementById("PageHead").offsetHeight +
////		document.getElementById("toolbarSummary").offsetHeight +
////		document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("ScrollNo").offsetHeight) + "px";
//var resultsContainerHgt = mainDiv.offsetHeight - (
//		//document.getElementById("sumHeaderContainer").offsetHeight + 
//		document.getElementById("Table_NavOptions").offsetHeight +
//		document.getElementById("PageHead").offsetHeight +
//		document.getElementById("toolbarSummary").offsetHeight +
//		document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("ScrollNo").offsetHeight) + "px";
//		//document.getElementById("bodyContainer").style.height = resultsContainerHgt ;
//                document.getElementById("QryRslts").style.height =  resultsContainerHgt ;
		//scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight)
    //document.getElementById("QryRsltsHeader").style.width = document.getElementById("QryRslts").clientWidth + "px";//Static header change
	//parent.document.getElementById(containerDIV).style.height = scrHeight  + "px";
    //parent.document.getElementById(containerDIV).children[0].style.height = scrHeight  + "px";
    parent.document.getElementById(containerDIV).style.width =scrWidth  + "px";
    parent.document.getElementById(containerDIV).children[0].style.width =scrWidth + "px";
  
    parent.document.getElementById(containerDIV).style.top = 0 + "px";
    setHorizontalPosition( parent.document.getElementById(containerDIV), false,0);
    parent.parent.document.getElementById("ifr_LaunchWin").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
}

function fnCalcHgt_old(fromAdv) {//OJET Migration	
//REDWOOD_CHANGES
    var containerDIV = "ChildWin";
    if (typeof(fromSubScr) == 'undefined') containerDIV = seqNo;	   
//REDWOOD_CHANGES
//    if (!fromAdv) {
//        document.getElementById("ResTree").className = "DIVTwoColLyt";
//        document.getElementById("DIVScrContainer").className = "WNDcontent mediumwin";
//        document.getElementById("DIVWNDContainer").style.height = '38.6em';
//        if (l_tmp_scr_type == 'large') {
//            document.getElementById("PageHead").className = "DIVThreeColLyt";
//            document.getElementById("ResTree").className = "DIVThreeColLyt";
//            document.getElementById("DIVScrContainer").className = "WNDcontent bigwin";
//        }
//    }		  
//REDWOOD_CHANGES
  
  //var scrWidth = document.getElementById("DIVScrContainer").offsetWidth;/* 12.1 screen height change */
  var scrWidth;	 
//REDWOOD_CHANGES
  scrWidth = "100%";
     var pageHeadDoc = document.getElementById("PageHead");
     pageHeadDoc.style.width = "100%";
    document.getElementById("DIVWNDContainer").style.width = "100%";
//  if(!fromAdv) {
//    scrWidth = mainWin.dashBoardWidth - 4;/* 12.1 screen height change */
//  }else{
//    scrWidth = 0.9 * mainWin.dashBoardWidth;//HTML5 Changes 2/NOV/2016
//  }  
//REDWOOD_CHANGES
  var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);
//  if (scrWidth > mainWin.x)	//REDWOOD_CHANGES
//    scrWidth = mainWin.x - 8;	//REDWOOD_CHANGES
     // change for 12.0.2 start
/*  if (mainWin.document.getElementById("vtab").style.display == "none") {
    if(scrHeight > parseInt(mainWin.document.getElementById("vtabMin").offsetHeight))
        scrHeight = parseInt(mainWin.document.getElementById("vtabMin").offsetHeight) - 4;
  }else{
      if(scrHeight > parseInt(mainWin.document.getElementById("vtab").offsetHeight))
        scrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight) - 4;
  }*/  
//REDWOOD_CHANGES
//   var mainDiv = null;
//   if( parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0 ){
//   mainDiv =  mainWin.document.getElementById("dashboard");
//   }
//   else{
//   mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
//   }
var mainDiv  = mainWin.document.getElementById("mainContent");
parent.document.getElementById(containerDIV).style.height =  parseInt(mainWin.document.getElementById("mainContent").offsetHeight)  + "px";
    parent.document.getElementById(containerDIV).children[0].style.height = "100%";
    document.getElementById("ScrollYes").style.overflow = "auto";
    document.getElementById("ScrollYes").style.height = parseInt(mainWin.document.getElementById("mainContent").offsetHeight) 
   document.getElementById("ScrollNo").offsetHeight  - document.getElementById("WNDtitlebar").offsetHeight -$("#toolbarSummary").outerHeight(true) + "px";
//REDWOOD_CHANGES
/* 12.1 screen height change start*/
  // if(scrHeight > parseInt(mainDiv.offsetHeight))
  if(!fromAdv)
        scrHeight = parseInt(mainDiv.offsetHeight) - 4;
   // change for 12.0.2 end
   else{//HTML5 Changes 2/NOV/2016 start
      if (scrHeight>parseInt(mainDiv.offsetHeight))
      scrHeight = parseInt(mainDiv.offsetHeight) - document.getElementById("WNDtitlebar").offsetHeight - 4;
   }//HTML5 Changes 2/NOV/2016 end
   
  parent.document.getElementById(containerDIV).style.height  = scrHeight + "px";
  parent.document.getElementById(containerDIV).children[0].style.height  = scrHeight +"px";
  if(!fromAdv) {
    //parent.document.getElementById(containerDIV).style.width  = document.getElementById("button_row").offsetWidth +"px";
    //parent.document.getElementById(containerDIV).children[0].style.width = document.getElementById("button_row").offsetWidth +"px";
    parent.document.getElementById(containerDIV).style.width = scrWidth + "px";
    parent.document.getElementById(containerDIV).children[0].style.width = scrWidth + "px";
    document.getElementById("QryRslts").style.width = document.getElementById("toolbarSummary").offsetWidth +"px";
//REDWOOD_CHANGES
//    if (document.getElementById("SUM_CUST_BTNS"))
//        document.getElementById("TblOuterDiv").style.height = scrHeight - document.getElementById("WNDtitlebar").offsetHeight - document.getElementById("PageHead").offsetHeight - document.getElementById("SUM_CUST_BTNS").offsetHeight - document.getElementById("toolbarSummary").offsetHeight - document.getElementById("DIVAudit").offsetHeight - 5 +"px";
//    else
//        document.getElementById("TblOuterDiv").style.height = scrHeight - document.getElementById("WNDtitlebar").offsetHeight - document.getElementById("PageHead").offsetHeight - document.getElementById("toolbarSummary").offsetHeight - document.getElementById("ScrollNo").offsetHeight - 5+"px";
//    document.getElementById("QryRslts").style.height = document.getElementById("TblOuterDiv").offsetHeight - document.getElementById("Table_NavOptions").offsetHeight - document.getElementById("QryRsltsHeader").offsetHeight + "px"; //static header change
    debugger;	  
//REDWOOD_CHANGES
    if(document.getElementById("QryRslts").offsetHeight < 100) {
      document.getElementById("QryRslts").style.height = "100px";
    }		 
//REDWOOD_CHANGES
    if(document.getElementById("summaryDataContainer")){
        document.getElementById("QryRslts").style.width = document.getElementById("summaryDataContainer").offsetWidth+"px";
        document.getElementById("TBL_QryRslts").style.width = document.getElementById("summaryDataContainer").offsetWidth+"px";
    }
//    document.getElementById("TblOuterDiv").style.width = scrWidth+"px";
//    document.getElementById("sumHeaderContainer").style.width = document.getElementById("rsltsConatiner").offsetWidth+"px";
    
    
//    if (document.getElementById("QryRsltsHeader"))
//    document.getElementById("QryRsltsHeader").style.width = document.getElementById("sumHeaderContainer").offsetWidth - document.getElementById("QryRsltsHeaderFreeze").offsetWidth+"px";
    parent.document.getElementById(containerDIV).style.top = 0+"px";
//REDWOOD_CHANGES
	//fix for 17803383  ARB summary screens position start
	setHorizontalPosition(parent.document.getElementById(containerDIV), false, mainWin.x-(document.getElementById("DIVWNDContainer").offsetWidth+8));
/* 12.1 screen height change end*/   
 //FCUBS 11.4.1 INFRA Fix starts
    /*if(mainWin.LangCode == "ARB"){
        parent.document.getElementById(containerDIV).style.left = 12+"px";
        }else{
    parent.document.getElementById(containerDIV).style.left = mainWin.x-(document.getElementById("DIVWNDContainer").offsetWidth+12)+"px";
        }*/
    //FCUBS 11.4.1 INFRA Fix ends
	//fix for 17803383  ARB summary screens position ends
	parent.document.getElementById(containerDIV).children[0].title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);//Fix for 19463987   
	parent.document.getElementById(containerDIV).children[0].id +=seqNo;//Fix for 19463987  

  }else {
         parent.document.getElementById(containerDIV).style.top=document.getElementById("WNDtitlebar").offsetHeight+"px"; //HTML5 Changes 2/NOV/2016
        parent.document.getElementById(containerDIV).style.width  = scrWidth - (2*document.getElementById("WNDtitlebar").offsetHeight) +"px";
        parent.document.getElementById(containerDIV).children[0].style.width = scrWidth - (2*document.getElementById("WNDtitlebar").offsetHeight) +"px";
        document.getElementById("WNDtitlebar").style.width = scrWidth - (2*document.getElementById("WNDtitlebar").offsetHeight) +"px";
        document.getElementById("TBLPageidAdvanced").style.height = scrHeight - document.getElementById("WNDtitlebar").offsetHeight - document.getElementById("PageFoot").offsetHeight + "px"; //HTML5 Changes 2/NOV/2016
       // document.getElementById("DIVWNDContainer").style.width = "40em";//HTML5 Changes 2/NOV/2016
         //FCUBS 11.4.1 INFRA_ADVANCE_SEARCH_Fix startsBTN_EXIT_IMG
         if (mainWin.LangCode=='ARB'){
            document.getElementById("DIVWNDContainer").removeAttribute("style");
            document.getElementById("PageFoot").removeAttribute("style");
            document.getElementById("TBLPageidAdvanced").removeAttribute("style");
            document.getElementById("TBLPageidAdvanced").setAttribute("style","overflow: auto;")
        }
        //FCUBS 11.4.1 INFRA_ADVANCE_SEARCH_Fix ends
        parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
}
}//REDWOOD_CHANGES


// Excel Export Code Starts
function fnExportToExcel() {
var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var tmpFunc = selectSingleNode(xmlDOM, "//*[@FNID = '" + parentFunc + "']");
    if(tmpFunc==null || typeof(tmpFunc)=='undefined') {
        mask();
        showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_EXPORT_NS")), 'I');
        alertAction = "UNMASK";
        return;
    }
    var sumTblObj = document.getElementById("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('input')[0].checked;
        if(isChkd)
            chkd = true;        
    }
    if(!chkd){
        mask();
        showAlerts(fnBuildAlertXML('','I',mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    var g_prev_gAction = gAction;
    gAction = "RUN_EXPORT";

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><ENTITY/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "CSDXLUPD");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),"RUN_EXPORT");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"CS");

    var bodyReq = fnCreateBody();
    var tempbodyReq = bodyReq.cloneNode(true);
    bodyReq = fnGetBlkDetails(bodyReq);

    var recData = fnGetBlkDetailsForData();
    var recBlkData = selectSingleNode(tempbodyReq,"//REC[@TYPE='BLK_XLUPLDBLKDATA']");
    len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;
    var count = 1;
    for (var i = 0; i < len; i++) {

        if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {

                var tabObj = document.getElementById("TBL_QryRslts").tBodies[0].rows[i];
                var ClmnValNode = exlRequestDOM.createElement("REC");
                ClmnValNode.setAttribute("RECID", count);
                ClmnValNode.setAttribute("TYPE", "BLK_XLUPLDBLKDATA");

                var clmValChldNode = exlRequestDOM.createElement("FV");
                ClmnValNode.appendChild(clmValChldNode);
                var pkcells = getPkCellNo();
                var recblkData = replacePkFieldWithVlaue(pkcells, tabObj, getNodeText(recData));
                recblkData = recblkData.replace("RECNO", count);
                recblkData = recblkData.replace("RECNO", count);
                var cdatasect = exlRequestDOM.createCDATASection(recblkData);

                selectSingleNode(ClmnValNode,"FV").appendChild(cdatasect);
                selectSingleNode(bodyReq,"//REC[@TYPE='BLK_XLUPLDBLKDTLS']").appendChild(ClmnValNode);
                count++;
            }
        }

    }

    var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);

    export_fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId); //Fix for 15889549  
    
	if (export_fcjResponseDOM)  //Fix for 15889549  
	{
		// OLD Format Excel Code 
		//executeExcel(fcjResponseDOM);
        gAction = g_prev_gAction;
    }
	// New  Format Excel Code 
	fnDownloadExcel();

}

function replacePkFieldWithVlaue(pkFieldCellNo, tabObj, recData) {
 var thObj = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].cells;//static header change
    for (var l = 0; l < pkFieldCellNo.length; l++) {
var val = getInnerText(tabObj.cells[pkFieldCellNo[l] + 1]);
        try{ //Bug#29394348
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
        var val = getInnerText(tabObj.cells[pkFieldCellNo[l] + 1]);
		}
		} //Bug#29394348
		catch(e){}//Bug#29394348
        recData = recData.replace(pkFields[l].split("__")[1] + "!", val.trim() + "!");//Fix for 18901117
        }

    return recData;
}

function getPkCellNo() {
        msgxmlSumDom =loadXMLDoc(msgxml_sum);
    var fields = getNodeText(selectSingleNode(msgxmlSumDom,"//FN")).split("~");
    var pkFieldCellNo = new Array();
    if (fields) {
        var tdLen = fields.length;
        for (var l = 0; l < pkFields.length; l++) {
            for (k = 0; k < tdLen; k++) {
                if (pkFields[l].split("__")[1] == fields[k]) {
                    pkFieldCellNo[l] = k;
                }
            }
        }
    }
    return pkFieldCellNo;
}

function fnGetBlkDetails(bodyReq) {

    var NewDOM =loadXMLDoc(msgxml);
    var fnNodes = selectNodes(NewDOM,"//FN");

    for (var i = 0; i < fnNodes.length; i++) {
        var parentName = fnNodes[i].getAttribute("PARENT");
        var relationTyp = fnNodes[i].getAttribute("RELATION_TYPE");
        var blockName = fnNodes[i].getAttribute("TYPE");
        var batchRefno = "";
        var relation = fnNodes[i].getAttribute("RELATION");
        var xsdName = "";
        var fldlist = getNodeText(fnNodes[i]);
		if(fldlist == "")
		continue;

        if (relationTyp == null)
            relationTyp = "";
        if (relation == null)
            relation = "";

        while (fldlist.indexOf("~") != -1) {
            fldlist = fldlist.replace("~", "!");
        }
        var rec = '<REC RECID="' + (i + 1) + '" TYPE="BLK_XLUPLDBLKDTLS"><FV/></REC>';
        NewDOM =loadXMLDoc(rec);
        setNodeText(selectSingleNode(NewDOM,"//FV"), batchRefno + "~" + blockName + "~" + xsdName + "~" + parentName + "~" + relation + "~" + relationTyp + "~" + fldlist + "~");

        selectSingleNode(bodyReq,"//REC[@TYPE='BLK_XLUPLDMSTR']").appendChild(selectSingleNode(NewDOM,"//REC"));

        }
    return bodyReq;
}

function fnGetBlkDetailsForData() {

    //var NewDOM = createDOMActiveXObject()

        var NewDOM =loadXMLDoc(msgxml);
    var fnNodes = selectNodes(NewDOM,"//FN");

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

        if (relationTyp == null)
            relationTyp = "";
        if (relation == null)
            relation = "";

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

            var ChildNode = NewDOM.createElement("REC");
            ChildNode.setAttribute("RECID", "l");
            ChildNode.setAttribute("TYPE", "BLK_XLUPLDBLKDTLS");
            ChildNode.appendChild(NewDOM.createElement("FV"));
            setNodeText(selectSingleNode(ChildNode,"//FV"), batchRefno + "~" + blockName + "~" + recodNO + "~" + recodNO + "~" + action + "~" + parentRec + "~" + fldlist + "~");
            return ChildNode;
        }

    }
}



function fnCreateBody() {

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
    reqDom=loadXMLDoc(msgxml_xlupd);

    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection(detailFuncId + "~" + "" + "~" + mainWin.UserId + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~");
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_XLUPLDMSTR']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}

function fnDownloadExcel()
{
    try
	{
        var fileInputField = document.getElementById("ResTree");
        var parent = fileInputField.parentNode;
        var iFrameBody = "";
        iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>';
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
        //iFrameBody += "<FORM id='fileUploadForm' method='post' action=FCReportHandleRequest?fileName="+fileUrl1+"&TYPE=DOWNLOAD enctype='multipart/form-data'>";
        iFrameBody += "<FORM id='fileUploadForm' method='post' action=ExcelDownload?FUNCTIONID="+functionId+"&actionType=DOWNLOAD"; 
        iFrameBody+=" enctype='multipart/form-data'>";
        iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />";
        iFrameBody += "</FORM></body></html>";
        
        var iFrameHeight = fileInputField.offsetHeight;
        var iFrameWidth =  fileInputField.offsetWidth;
        
        var requestIFrame = createRequestIFrame(iFrameHeight+5,iFrameWidth+50);
        parent.appendChild(requestIFrame);
        var iRequestFrameID = 'RequestFrame';
        if(self.frames[iRequestFrameID].name != iRequestFrameID){
                /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                self.frames[iRequestFrameID].name = iRequestFrameID;
        }
        document.getElementById('RequestFrame').contentWindow.document.open();
        document.getElementById('RequestFrame').contentWindow.document.write(iFrameBody);
        document.getElementById('RequestFrame').contentWindow.document.close();
        var responseIFrame = createResponseIFrame();
        parent.appendChild(responseIFrame);
        var iResponseFrameID = 'ResponseFrame';
        if(self.frames[iResponseFrameID].name != iResponseFrameID){
                /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                self.frames[iResponseFrameID].name = iResponseFrameID;
        }
        var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
        iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
        iFrameFormDocument.getElementById("fileUploadForm").submit();
    }catch(e){
        // do Nothing
    }
}

function createRequestIFrame(height,width)
 {
        var requestIFrame = document.createElement('iframe');
        requestIFrame.setAttribute('id','RequestFrame');
        requestIFrame.setAttribute('name','RequestFrame');
        requestIFrame.setAttribute('class','TextNormal');
        requestIFrame.setAttribute('src','');
        requestIFrame.setAttribute('frameBorder','0');
        requestIFrame.setAttribute('height',height+'px');
        requestIFrame.setAttribute('width',width+'px');
        requestIFrame.setAttribute('scrolling','no');
        requestIFrame.style.border='0px none';
        requestIFrame.style.margin='0px';
        requestIFrame.style.padding='0px';
        return requestIFrame;
}
function createResponseIFrame()
{
    var responseFrameContainer = document.createElement('div');
    responseFrameContainer.setAttribute('id','responseContainer');
    var iFrameID = 'ResponseFrame';
    var iFrameBody = '<iframe id=\"' + iFrameID + '\"' 
                                    + ' name=\"' + iFrameID + '\"'
                                    + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
    responseFrameContainer.innerHTML = iFrameBody;
    return responseFrameContainer;
}
// Excel Export Code Ends

function fnHandleSumRslt(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById("TBL_QryRslts").tBodies[0];
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(evnt.shiftKey && evnt.keyCode == 9){
        if(document.getElementById("TBL_QryRslts").tHead.rows[1].cells[0].getElementsByTagName("INPUT")[0].disabled == false)
            document.getElementById("TBL_QryRslts").tHead.rows[1].cells[0].getElementsByTagName("INPUT")[0].focus();
        else
            document.getElementById("TBL_QryRslts").tHead.rows[1].cells[1].children[0].focus();
        preventpropagate(evnt);
        return false; 
    }
    if(evnt.keyCode == 13){
        fnDetailScreen(event);
    }else if(evnt.keyCode == 9){
        if(document.getElementById("CUST_BTNS")){
            document.getElementById("CUST_BTNS").childNodes[0].childNodes[0].focus();
        }else{
            document.getElementById("BTN_EXIT").focus();
        }
        preventpropagate(evnt);
        return false; 
    }else if(evnt.keyCode == 40){
        if(srcElement.type && srcElement.type.toUpperCase() == 'CHECKBOX'){
            var cellNum = srcElement.parentNode.parentNode.cellIndex;
            var rowNum = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
        }else{
            var cellNum = srcElement.cellIndex;
            var rowNum = srcElement.parentNode.rowIndex-2;
        }        
        if(l_TableObj.rows[rowNum+1]){     
            if(cellNum == 0)
                l_TableObj.rows[rowNum+1].cells[cellNum].getElementsByTagName("INPUT")[0].focus();
            else
                l_TableObj.rows[rowNum+1].cells[cellNum].focus();
            preventpropagate(evnt);
            return false;
        }  
    }else if(evnt.keyCode == 38){
        if(srcElement.type && srcElement.type.toUpperCase() == 'CHECKBOX'){
            var cellNum = srcElement.parentNode.parentNode.cellIndex;
            var rowNum = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
        }else{
            var cellNum = srcElement.cellIndex;
            var rowNum = srcElement.parentNode.rowIndex-2;
        } 
        if(l_TableObj.rows[rowNum-1]){  
            if(cellNum == 0)
                l_TableObj.rows[rowNum-1].cells[cellNum].getElementsByTagName("INPUT")[0].focus();
            else
                l_TableObj.rows[rowNum-1].cells[cellNum].focus();
            preventpropagate(evnt);
            return false;
        }
    }else if(evnt.keyCode == 39){
        activeElement = document.activeElement;
        if(activeElement.type == "checkbox"){
            if(getNextSibling(activeElement.parentNode.parentNode) != null)
                getNextSibling(activeElement.parentNode.parentNode).focus();
        }else{
            focusRightElement(l_TableObj, activeElement);
        }
        preventpropagate(evnt);
        return false;
    }else if(evnt.keyCode == 37){
        activeElement = document.activeElement;
        if(getPreviousSibling(activeElement)!= null && getPreviousSibling(activeElement).className != "LBLinv"){
            if(getPreviousSibling(activeElement).children[0].children[1] && getPreviousSibling(activeElement).children[0].children[1].type == "checkbox")
                getPreviousSibling(activeElement).children[0].children[1].focus();
            else
                focusLeftElement(l_TableObj, activeElement);
            preventpropagate(evnt);
            return false;
        }
    }
}

function fnHandleSumTH(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt); 
    var l_TableObj = document.getElementById("TBL_QryRslts").tBodies[0];
    if(evnt.shiftKey && evnt.keyCode == 9){
        var ele = document.getElementById("TblInnerDiv").children;
        for(var i=0; i<ele.length; i++){
            if(!ele[i].disabled && ele[i].tagName.toUpperCase() != "LABEL")
                ele[i].focus();
        }
        preventpropagate(evnt);
        return false; 
    }
    if(evnt.keyCode == 9){
        if(getInnerText(l_TableObj.rows[0]) != ""){
            l_TableObj.rows[0].cells[0].getElementsByTagName("INPUT")[0].focus();
        }else
            document.getElementById("BTN_EXIT").focus();
        preventpropagate(evnt);
        return false; 
    }else if(evnt.keyCode == 37){
        if(getPreviousSibling(srcElement.parentNode)!= null && getPreviousSibling(srcElement.parentNode).className != "LBLinv"){
            if(getPreviousSibling(srcElement.parentNode).children[0].children[1] && getPreviousSibling(srcElement.parentNode).children[0].children[1].type == "checkbox")
                getPreviousSibling(srcElement.parentNode).children[0].children[1].focus();
            else
                getPreviousSibling(srcElement.parentNode).children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }else if(evnt.keyCode == 39){
        if(srcElement.type == "checkbox"){
            if(getNextSibling(srcElement.parentNode.parentNode) != null)
                getNextSibling(srcElement.parentNode.parentNode).children[0].focus();
        }else{
            if(getNextSibling(srcElement.parentNode) != null)
                getNextSibling(srcElement.parentNode).children[0].focus();
        }
        preventpropagate(evnt);
        return false;
    }else if(evnt.keyCode == 40){
        return false;
    }
}

function fnHandleSumBtn(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    
    if(evnt.shiftKey && evnt.keyCode == 9){
        if (getPreviousSibling(srcElement)== null){
            var l_TableObj = document.getElementById("TBL_QryRslts").tBodies[0];
            if(document.getElementById("CUST_BTNS")){
                var subsyLength = document.getElementById("CUST_BTNS").childNodes.length; 
                document.getElementById("CUST_BTNS").childNodes[subsyLength-1].childNodes[0].focus();
            }else{
                if(getInnerText(l_TableObj.rows[0]) != "")
                    l_TableObj.rows[0].cells[0].getElementsByTagName("INPUT")[0].focus();
                else
                    document.getElementById("TBL_QryRslts").tHead.rows[1].cells[1].children[0].focus();
            }
        }else{
            getPreviousSibling(getPreviousSibling(srcElement)).focus();
        } 
        preventpropagate(evnt);
        return false; 
    }else if(evnt.keyCode == 9){
        document.getElementById("WNDbuttons").focus();
        preventpropagate(evnt);
        return false; 
    }
}

function focusRightElement(l_TableObj, activeElement) {
    var test=true;
    var ele = "";
    while(test){
    if(document.activeElement.nextSibling) {
        ele = document.activeElement.nextSibling;
        if(getInnerText(ele) == " "){
                test=true;
            }else{
                ele.focus();
                test=false;
            }
       } else {
            test=false;
       }
    }
    
}

function focusLeftElement(l_TableObj, activeElement){
    var test=true;
    var ele="";
    while(test){
        if(document.activeElement.previousSibling) {
        ele = document.activeElement.previousSibling;
        if(getInnerText(ele) == " "){
            test=true;
        }else{
            ele.focus();
            test=false;
        }
        }else{
            test=false;
        }
    }
}

function fnAcceptQuery(opt) {
  //REDWOOD_CHANGES  
    //Ojet changes - Sujitha
    var singleRecObj = Object.assign( {
        },
        multipleEntryFieldList[multipleEntryFieldList['advQuery']]);
        
    if ((opt == "AND" || opt == "OR" || opt == "(" || opt == ")") && meArrayForAddDelete['advQuery']().length == 0) {
        return;
    } else if(opt != "") {
        singleRecObj['queryField'] = opt;
        singleRecObj['queryFieldName'] = opt;
    } else {
    //12.1 summary performance changes start
    var selFieldData = selectedFields.split("~");
    //12.1 summary performance changes end
    var selOp = document.getElementById(selFieldData[0]);
    var selType = selFieldData[1];
    
    //Bug 15908897 fix starts    
    var dateFound=false;
    //Bug 15908897 fix ends
    singleRecObj['queryFieldName'] = selFieldData[0].split("__")[1];
    singleRecObj['queryField']=selFieldData[2].split('(')[0];
    singleRecObj['queryOperator'] = selOp.value;
    
    
        if ((trim(selOp.value)).toUpperCase() == "BETWEEN") { 
            singleRecObj['queryValue'] = document.getElementById(selFieldData[0]+"_FROM").value + " AND " + document.getElementById(selFieldData[0]+"_TO").value;
        } else {
            singleRecObj['queryValue'] = document.getElementById(selFieldData[0]+"_FROM").value;
        }
    }
    
    meArrayForAddDelete['advQuery'].push(singleRecObj);       
	
}

function fnAcceptQuery_old(opt) { 
//REDWOOD_CHANGES
    var selField = document.getElementById("idSelectField");
    var selOp = document.getElementById("idSelectOp");
    
    if(selField.selectedIndex != -1){
        var selOption = selField.options[selField.selectedIndex];
        var table = document.getElementById("idadvQuryTable").tBodies[0];
        if((opt == "AND" || opt == "OR" || opt == "(" || opt == ")") && table.rows.length == 0){
            return;
        }
        var row = document.createElement("TR");
        if(table.rows.length % 2 == 0) {
            row.setAttribute("onblur", "this.className=''");
            row.setAttribute("onmouseover", "this.className='TDHoverSumRow'");
            row.setAttribute("onfocus", "this.className='TDHoverSumRow'");
            row.setAttribute("onmouseout", "this.className=''");
        } else {
            row.className = "SummaryAltTR";
            row.setAttribute("onblur", "this.className='SummaryAltTR'");
            row.setAttribute("onmouseover", "this.className='TDHoverSumRow'");
            row.setAttribute("onfocus", "this.className='TDHoverSumRow'");
            row.setAttribute("onmouseout", "this.className='SummaryAltTR'");
        }
        
        table.appendChild(row);         
        var cell1 = document.createElement("TD");
        row.appendChild(cell1);
        cell1.className = "TBLoneTD1";
        cell1.setAttribute("scope", "row");
        var element1 = document.createElement("input"); 
        element1.type = "checkbox"; 
        element1.className = "CHKstd";
        cell1.appendChild(element1); 
        
        var cell3 = document.createElement("TD");
        row.appendChild(cell3);
        cell3.setAttribute("scope", "row");
        var element2 = document.createElement("span"); 
        element2.className = "SPANText";
    
        if (opt == "("){
            setInnerText(element2, "(");
        } else if (opt =="OR"){
            setInnerText(element2, "OR");
        } else if (opt == "AND"){
            setInnerText(element2, "AND");
        } else if (opt == ")"){
            setInnerText(element2, ")");
        } else {
            setInnerText(element2, selOption.value);
        }
        cell3.appendChild(element2); 
        
        if (opt == "") {
            var cell4 = document.createElement("TD");
            row.appendChild(cell4);
            cell4.setAttribute("scope", "row");
            var element2 = document.createElement("span"); 
            element2.className = "SPANText";
            setInnerText(element2, selOp.options[selOp.selectedIndex].value);
            cell4.appendChild(element2); 
           
            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            cell5.setAttribute("scope", "row");
            var element2 = document.createElement("span"); 
            element2.className = "SPANText";
             /*Fix for 18556638 Start*/ 
            element2.setAttribute("type","text");                
            if (selOp.options[selOp.selectedIndex].value == " between ") {
                setInnerText(element2, document.getElementById("idTextFieldValue").value + " AND " + document.getElementById("idTextFieldValue2").value);
            } else {
                setInnerText(element2, document.getElementById("idTextFieldValue").value);
            }
            //setInnerText(element2, document.getElementById("idTextFieldValue").value);
            /*Fix for 18556638 End*/ 
            cell5.appendChild(element2);
            
            var cell6 = document.createElement("TD");
            row.appendChild(cell6);
            cell6.width = "99%";
            cell6.setAttribute("scope", "row");
        } else {
            cell3.appendChild(element2); 
            var cell4 = document.createElement("TD");
            row.appendChild(cell4);
            var element2 = document.createElement("span"); 
            element2.className = "SPANText";
            cell4.appendChild(element2); 
             
            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            var element2 = document.createElement("span"); 
            element2.className = "SPANText";
            cell5.appendChild(element2); 
             
            var cell6 = document.createElement("TD");
            row.appendChild(cell6);
            cell6.width = "99%";
            cell6.setAttribute("scope", "row");
        }            
    }
}

function fnCheckUncheckAllAdv(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_ChBoxsQuery = document.getElementById("QUERY_CHKBOX");
    var l_ChBoxsOrder = document.getElementById("ORDER_CHKBOX");
    var l_ChkStatus = true;
    
    if(srcElement.id == "QUERY_CHKBOX") {
        if (l_ChBoxsQuery.checked == true) 
            l_ChkStatus = true;
        else 
            l_ChkStatus = false;
        
        var rows = document.getElementById("idadvQuryTable").tBodies[0].rows;
        for(var l_Cnt=0; l_Cnt<rows.length; l_Cnt++) {
            rows[l_Cnt].cells[0].children[0].checked = l_ChkStatus;
        }
    }else if(srcElement.id == "ORDER_CHKBOX") {
        if (l_ChBoxsOrder.checked == true) 
            l_ChkStatus = true;
        else 
            l_ChkStatus = false;
        
        var rows = document.getElementById("idadvOrderTable").tBodies[0].rows;
        for(var l_Cnt=0; l_Cnt<rows.length; l_Cnt++) {
            rows[l_Cnt].cells[0].children[0].checked = l_ChkStatus;
        }
    }
}

function handleSumkeys(e) {
    var event = window.event || e;
    if (!event.ctrlKey && event.keyCode == 33) {
        if (document.getElementsByName("navPrev")[0].disabled == false) {
            doNavigate(gcNAV_PREVIOUS, event);
            focusReqd = false;
            preventpropagate(e);
            return false; 
        }
    } else if (!event.ctrlKey && event.keyCode == 34) {
        if (document.getElementsByName("navNext")[0].disabled == false) {
            doNavigate(gcNAV_NEXT, event);
            focusReqd = false;
            preventpropagate(e);
            return false; 
        }
    } else if (!event.ctrlKey && event.keyCode == 35) {
        doNavigate(gcNAV_LAST, event);
        focusReqd = false;
        preventpropagate(e);
        return false; 
    } else if (!event.ctrlKey && event.keyCode == 36) {
        doNavigate(gcNAV_FIRST, event);
        focusReqd = false;
        preventpropagate(e);
        return false; 
    }
    return true;
}

function executeExcel(resDom) {

    //reqDom = createDOMActiveXObject();
   // msgxmlDom = createDOMActiveXObject();

   try {
    reqDom = resDom;
    var blkMstrDt = getNodeText(selectSingleNode(reqDom,"//FCUBS_BODY/REC[@TYPE='BLK_XLUPLDMSTR']/FV"));
    var funcId = blkMstrDt.split("~")[0];
    var Excel = new ActiveXObject("Excel.Application");
    var shtNo = 3;
    var blkDtlsDt = "";
    var blkFldsLst = "";
    var blkFldsLstDesc = "";
    msgxmlDom = loadXMLDoc(msgxml);
    var wBook = Excel.Workbooks.Add();
    var wSheet;
    var noOfShts = 1 + selectNodes(reqDom,"//REC/REC[@TYPE='BLK_XLUPLDBLKDTLS']").length;
    for (var wSht = 1; wSht < noOfShts; wSht++) {
        try {
            wSheet = wBook.Worksheets(wSht + 2);
        } catch(e) {
            wSheet = wBook.Worksheets.Add;
        }

    }
    wBook.Worksheets(1).name = "Copyright Clause";
    wBook.Worksheets(1).Cells(1, 3).Formula = "=YEAR(TODAY())";
    var copyRight = fnGetCopyrightInfo("", "", funcId + ".xls", "", "");
    wBook.Worksheets(1).Cells(1, 3).NumberFormat = ";;;";
    wBook.Worksheets(1).Cells(1, 1).value = "File Name";
    wBook.Worksheets(1).Cells(1, 2).value = funcId + ".xls";
    wBook.Worksheets(1).Cells(4, 2).Formula = copyRight;
    wBook.Worksheets(1).Range("B3", "J17").MergeCells = true;
    wBook.Worksheets(1).Range("B3", "J17").VerticalAlignment = -4160;
    wBook.Worksheets(1).Cells(4, 2).WrapText = true;
    wBook.Worksheets(1).Range("B3", "J17").Cells.Interior.ColorIndex = 15;

    wBook.Worksheets(1).Range("A1", "B1").font.bold = true;
    wBook.Worksheets(1).Range("A1", "B1").EntireColumn.AutoFit;
    wBook.Worksheets(1).Range("A1", "B1").style = "OutPut";

    wBook.Worksheets(2).name = "Data Dictionary";
    wBook.Worksheets(2).Cells(1, 1).value = 'Block No';
    wBook.Worksheets(2).Cells(1, 2).value = 'Block Name';
    wBook.Worksheets(2).Cells(1, 3).value = 'XSD Node';
    wBook.Worksheets(2).Cells(1, 4).value = 'Field Name';
    wBook.Worksheets(2).Cells(1, 5).value = 'Field Description';
    wBook.Worksheets(2).Cells(1, 6).value = 'Max Length';
    wBook.Worksheets(2).Cells(1, 7).value = 'Max Decimals';
    wBook.Worksheets(2).Cells(1, 8).value = 'XSD Tag';
    wBook.Worksheets(2).Cells(1, 9).value = 'Mandatory';
    wBook.Worksheets(2).Cells(1, 10).value = 'ReadOnly';
    wBook.Worksheets(2).Cells(1, 11).value = 'Datatype';
    wBook.Worksheets(2).UsedRange.Cells.EntireColumn.AutoFit;
	wBook.Worksheets(2).UsedRange.Cells.font.bold = true;
	wBook.Worksheets(2).UsedRange.Cells.Interior.ColorIndex = 15;
	wBook.Worksheets(2).UsedRange.Borders.LineStyle = 1;
	wBook.Worksheets(2).UsedRange.Borders.Weight = 2;

    for (var bDt = 1; bDt <= selectNodes(reqDom,"//REC/REC[@TYPE='BLK_XLUPLDBLKDTLS']").length; bDt++) {
        blkDtlsDt = getNodeText(selectSingleNode(selectNodes(reqDom,"//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(bDt - 1),"FV"));
        blkDtlsDt = blkDtlsDt.split("~");

        wBook.Worksheets(shtNo).Cells(1, 1).value = blkDtlsDt[1];
        wBook.Worksheets(shtNo).Cells(1, 1).font.bold = true;
        wBook.Worksheets(shtNo).Cells(1, 1).style = "OutPut";
        wBook.Worksheets(shtNo).Cells(1, 1).EntireColumn.AutoFit;
        /*wBook.Worksheets(shtNo).name = blkDtlsDt[21];//initCap(replaceAll(blkDtlsDt[1].substring(4), "_", " "));*//*Fix for 18883815*/
		wBook.Worksheets(shtNo).name = blkDtlsDt[21].replace("/","-");/*Fix for 18883815*/
        wBook.Worksheets(shtNo).Cells(2, 1).value = "RECORD_ID";
        wBook.Worksheets(shtNo).Cells(2, 2).value = "ACTION_CODE";
        wBook.Worksheets(shtNo).Cells(2, 3).value = "PARENT_RECORD_ID";
        wBook.Worksheets(shtNo).Cells(3, 1).value = "Record Id";
        wBook.Worksheets(shtNo).Cells(3, 2).value = "Action Code";
        wBook.Worksheets(shtNo).Cells(3, 3).value = "Parent Record Id";
        blkFldsLst = blkDtlsDt[6].split("!");
        blkFldsLstDesc = blkDtlsDt[11].split("!");

        for (var bFlds = 0; bFlds < blkFldsLst.length; bFlds++) {
            if ("~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH~".indexOf("~" + blkFldsLst[bFlds] + "~") == -1) {
                wBook.Worksheets(shtNo).Cells(2, bFlds + 4).value = blkFldsLst[bFlds];
                wBook.Worksheets(shtNo).Cells(3, bFlds + 4).value = blkFldsLstDesc[bFlds];
            }

        }
        wBook.Worksheets(shtNo).Rows(1).hidden = true;
        wBook.Worksheets(shtNo).Rows(2).hidden = true;
        wBook.Worksheets(shtNo).UsedRange.Cells.font.bold = true;
        wBook.Worksheets(shtNo).UsedRange.Cells.Interior.ColorIndex = 15;
        wBook.Worksheets(shtNo).UsedRange.Borders.LineStyle = 1;
        wBook.Worksheets(shtNo).UsedRange.Borders.Weight = 2;
        wBook.Worksheets(shtNo).UsedRange.Cells.EntireColumn.AutoFit;
        shtNo++;

    }

    var NumOfSheets = Excel.Worksheets.count;
    fnBuildDataDictionary(resDom, wBook);
    for (var wNo = 3; wNo <= NumOfSheets; wNo++) {

        var wrkSht = Excel.Worksheets(wNo);
        // wBook.wrkSht(wNo).name=wNo;
        var dtlsNdLen = "";
        var blkData = "";
        var actData = ""
        if (wrkSht.name != "UDF DETAILS") {
            var blkDtls = getNodeText(selectSingleNode(selectNodes(reqDom,"//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3),"FV"));
            blkDtls = blkDtls.split("~");
            dtlsNdLen = selectNodes(selectNodes(reqDom,"//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3),"REC[@TYPE='BLK_XLUPLDBLKDATA']").length;
            if (dtlsNdLen == 0) {
                //Application.DisplayAlerts = False;
                Excel.Worksheets(wNo).Delete;
                //Application.DisplayAlerts = True;
                } else {
                for (var dtLn = 1; dtLn <= dtlsNdLen; dtLn++) {
                    blkData = getNodeText(selectSingleNode(selectNodes(selectNodes(reqDom,"//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3),"REC[@TYPE='BLK_XLUPLDBLKDATA']")[dtLn - 1],"FV"));
                    // blkData=reqDom.selectNodes("//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo-4).selectNodes("REC[@TYPE='BLK_XLUPLDBLKDATA']")[0].selectSingleNode("FV").text;
                    blkData = blkData.split("~");
                    wrkSht.Cells(1, 1) = blkData[1];

                    //actData = blkData[5].split("!");
					actData = blkData[5].split("!");
                    var flgNullField = true;
                    for (var clDt = 0; clDt < actData.length; clDt++) {
                        if (wrkSht.cells(3, clDt + 4).value != undefined)
                            wrkSht.cells(dtLn + 3, clDt + 4).value = "'" + actData[clDt];
                        if (actData[clDt] != "")
                            flgNullField = false;
                    }
                    if (!flgNullField) {
                        wrkSht.Cells(dtLn + 3, 1).Value = blkData[2];
                        wrkSht.Cells(dtLn + 3, 2).Value = blkData[3];
                        wrkSht.Cells(dtLn + 3, 3).Value = blkData[4];
                    }
                }
            }
        } else {
            dtlsNdLen = selectNodes(selectNodes(reqDom,"//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3),"REC[@TYPE='BLK_XLUPLDBLKDATA']").length;
            for (var dtLn = 1; dtLn <= dtlsNdLen; dtLn++) {
                blkData = getNodeText(selectSingleNode(selectNodes(selectNodes(resDom,"//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3),"REC[@TYPE='BLK_XLUPLDBLKDATA']")[dtLn - 1],"FV"));
                blkData = blkData.split("~");
                for (var clDt = 1; clDt <= blkData.length; clDt++) {
                    wrkSht.cells(dtLn + 1, clDt).value = blkData[clDt + 1];

                }

            }

        }
        wrkSht.UsedRange.Cells.EntireColumn.AutoFit;
    }
    //var filename = funcId + "xls";
    Excel.Visible = true;
	}catch(e){
	Excel.displayAlerts = false;
	Excel.Workbooks.close();
    Excel.Application.Quit();
	//alert('Export Failed');//FC 11.4 NLS Changes 
        showErrorAlerts('IN-HEAR-501');//FC 11.4 NLS Changes 
	}
    //wrkSht.SaveAs("D:\\" + filename);
    //Excel.Workbooks.close();
    //Excel.Application.Quit();
    //alert(filename+" saved to path D:\\");
    }
function fnBuildDataDictionary(resDom, wBook) {
    var DictionaryFlds = selectNodes(resDom,"//REC[@TYPE='BLK_XLUPLDDICTIONARY']");
    for (var i = 0; i < DictionaryFlds.length; i++) {
        var DictionaryDetails = getNodeText(selectSingleNode(DictionaryFlds[i],"FV")).split("~");
        wBook.WorkSheets(2).Cells(i + 2, 1) = DictionaryDetails[3];
        wBook.WorkSheets(2).Cells(i + 2, 2) = DictionaryDetails[4];
        wBook.WorkSheets(2).Cells(i + 2, 3) = DictionaryDetails[5];
        wBook.WorkSheets(2).Cells(i + 2, 4) = DictionaryDetails[6];
        wBook.WorkSheets(2).Cells(i + 2, 5) = DictionaryDetails[6];
        wBook.WorkSheets(2).Cells(i + 2, 6) = DictionaryDetails[0];
        wBook.WorkSheets(2).Cells(i + 2, 7) = DictionaryDetails[1];
        wBook.WorkSheets(2).Cells(i + 2, 8) = DictionaryDetails[7];
        wBook.WorkSheets(2).Cells(i + 2, 9) = DictionaryDetails[8];
        wBook.WorkSheets(2).Cells(i + 2, 10) = DictionaryDetails[9];
        wBook.WorkSheets(2).Cells(i + 2, 11) = DictionaryDetails[10];
    }
    wBook.WorkSheets(2).Usedrange.Cells.EntireColumn.AutoFit;
}

function fnGetCopyrightInfo(pstrUserID, pdtCreationDate, pstrFileName, pstrPurpose, pstrCalledFrom) {
    var strCopyrightInfo = "";

    var objDate = getDateObject();
    var strCurrentYear = objDate.getFullYear();

    strCopyrightInfo = "=\"This source is part of the FLEXCUBE Software System and is copyrighted by\"";
    strCopyrightInfo += " & char(10) & \"Oracle Financial Services Software Limited.\"";
    strCopyrightInfo += " & char(10) ";
    strCopyrightInfo += " & char(10) & \"All rights reserved.  No part of this work may be reproduced, stored in a retrieval system,\"";
    strCopyrightInfo += " & char(10) & \"adopted or transmitted in any form or by any means, electronic, mechanical, photographic,\"";
    strCopyrightInfo += " & char(10) & \"graphic, optic recording or otherwise, translated in any language or computer language,\"";
    strCopyrightInfo += " & char(10) & \"without the prior written permission of Oracle Financial Services Software Limited.\"";
    strCopyrightInfo += " & char(10) ";
    strCopyrightInfo += " & char(10) & \"Oracle Financial Services Software Limited.\"";
    strCopyrightInfo += " & char(10) & \"10-11, SDF I, SEEPZ, Andheri (East),\"";
    strCopyrightInfo += " & char(10) & \"Mumbai - 400 096.\"";
    strCopyrightInfo += " & char(10) & \"India.\"";
    strCopyrightInfo += " & char(10) ";
    strCopyrightInfo += " & char(10) & \"Copyright \"& char(169) & \" 2008 - \" & C1 & \" by Oracle Financial Services Software Limited. All rights reserved.\"";

    return strCopyrightInfo;
}

function fnOpenCriteriaScr(e) {
    mask();
    if(!screenArgs["fcjRequestDOM"]) {
        var tableNode = selectSingleNode(fcjRequestDOM, "FCJMSG/MAINTQRY/TABLE");
        if(tableNode) var tableNodeValue = getNodeText(selectSingleNode(fcjRequestDOM, "FCJMSG/MAINTQRY/TABLE"));
    }
    else if((selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/SUMTABLE"))) {
        var whereBy =  getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/WHERE"))
        var orderBy = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ORDERBY"))
        var advValues = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ADVVALUES"))
        var adopt = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ADOPT"))
        var orderByOpt = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ORDEBYOPT"))
    }
    if(whereBy == "" && orderBy == "" && advValues == "" && adopt == "" && orderByOpt == "" || tableNodeValue=="~") {
        alertAction = "UNMASK";
        showAlerts(fnBuildAlertXML('SM-8002', 'I'), 'I');
        gAction = "";
        return;
    }
    if (document.getElementById("queryCriteria")) {
        document.getElementById('queryCriteria').style.display  = "block";
        //Added for 17077004 start
        document.getElementById("criteriaName").value = currQryCriteriaName;
        setInnerText(document.getElementById("REMARKS"), currQryCriteriaRemarks) ;
         //Added for 17077004 end
        document.getElementById('criteriaName').focus();
        return;
    }		
//REDWOOD_CHANGES
//    var mainWin = parent.mainWin;
//    var queryCriteriaWin = document.createElement("div");
//    queryCriteriaWin.id = "queryCriteria";
//    queryCriteriaWin.className = "queryCriteriaDIV";
//    queryCriteriaWin.style.position = "absolute";
//    queryCriteriaWin.style.left = document.getElementById("DIVScrContainer").offsetWidth/3 + "px";
//    queryCriteriaWin.style.top = document.getElementById("DIVWNDContainer").offsetHeight/5 + "px";
//    queryCriteriaWin.style.width = document.getElementById("DIVScrContainer").offsetWidth/2 + "px";
//    queryCriteriaWin.style.display = "block";
//    var html = fnBuildCriteriaHTML();
//    queryCriteriaWin.innerHTML = html;
//    document.getElementById("masker").appendChild(queryCriteriaWin);
//    //Added for 17077004 start
//    document.getElementById("criteriaName").value = currQryCriteriaName;
//    setInnerText(document.getElementById("REMARKS"), currQryCriteriaRemarks) ;
//    //Added for 17077004 end
//    document.getElementById('criteriaName').focus();
 //REDWOOD_CHANGES
    var queryCriteriaWin = document.createElement("div");
    queryCriteriaWin.id = "queryCriteria";
    queryCriteriaWin.className = "queryCriteriaDIV";
    queryCriteriaWin.style.position = "absolute";
    queryCriteriaWin.style.left = document.getElementById("DIVScrContainer").offsetWidth/3 + "px";
    queryCriteriaWin.style.top = document.getElementById("DIVWNDContainer").offsetHeight/5 + "px";
    queryCriteriaWin.style.width = document.getElementById("DIVScrContainer").offsetWidth/2 + "px";
    queryCriteriaWin.style.display = "block";
    var html = fnBuildCriteriaHTML();
    queryCriteriaWin.innerHTML = html;
    document.getElementById("masker").appendChild(queryCriteriaWin);
    screenKo.cleanNode(document.getElementById("queryCriteria"));	//REDWOOD_CHANGES
    screenKo.applyBindings(queryCriteriaWin, document.getElementById("queryCriteria"));//REDWOOD_CHANGES
    //Added for 17077004 start
    document.getElementById("criteriaName").value = currQryCriteriaName;
    setInnerText(document.getElementById("REMARKS"), currQryCriteriaRemarks) ;
    //Added for 17077004 end
    document.getElementById('criteriaName').focus();
}

function fnBuildCriteriaHTML(e) {
    var labelQCriteriaScreen = mainWin.getItemDesc("LBL_QUERY_CRITERIA_SCREEN");
    var labelQCriteriaName = mainWin.getItemDesc("LBL_QUERY_CRITERIA_NAME");
    var labelOk = mainWin.getItemDesc("LBL_OK");
    var labelCancel = mainWin.getItemDesc("LBL_CANCEL");
    var labelRemarks = mainWin.getItemDesc("LBL_REMARKS");	  
//REDWOOD_CHANGES
    var html = '<oj-dialog id=\"scrollingDialog\"  initial-visibility=\"show\" position.my.horizontal=\"center\" position.my.vertical=\"center\" position.at.horizontal=\"center\" position.at.vertical=\"center\" position.of=\"window\" style="height: 100vh">';
    html += '<div slot=header id=\"wndtitle\" class=\"oj-dialog-title\" onkeydown=\"return fnHandleScrBtn(event)\" style=\"width: 50%\">';
    html += '<h1>' + labelQCriteriaScreen + '</h1></div>';
    html += '<div slot=\"body\" id=\"wndwidth\" style="clear:both; width:100%">';
    html += '<div class=\"oj-flex-item\" id=\"ResTree\">';
    html += '<div class=\"oj-flex\">';
    html += '<div class=\"oj-sm-width-full oj-sm-margin-2x-bottom\"><oj-label-value label-edge="start" label-width="40%"><oj-label slot="label" for=\"criteriaName\">' + labelQCriteriaName + '</oj-label><oj-input-text slot="value" id="criteriaName" name="criteriaName" size =\"20\" maxLength=\"250"\></oj-input-text></oj-label-value></div>';
    html += '<div class=\"oj-sm-width-full\"><oj-label-value label-edge="start" label-width="40%"><oj-label slot="label" for=\"remarks\">' + labelRemarks + '</oj-label><oj-text-area slot="value" id="REMARKS" name="remarks" onkeydown=\"return fnHandleScrBtn(event)\" maxLength=\"255"\ cols="1" rows="3"></oj-text-area></oj-label-value></div>';
    html += '</div></div></div>';
    html += '<div slot=\"footer\" class=\"oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border\">';
    html += '<div class=\"oj-flex-bar-end\">';
    html += '<oj-button class="action-button-primary" chroming="outlined" on-oj-action=\"[[fnExitSumCriteria.bind(null,event)]]\" label=\"' + labelCancel + '\" title=\"Exit\" id=\"BTN_CANCEL\"></oj-button>&nbsp;';
    html += '<oj-button class="action-button-primary" chroming="solid" on-oj-action=\"[[fnSaveSumCriteria.bind(null, event,null)]]\" label=\"' + labelOk + '\" title=\"Ok\" id=\"BTN_OK\"></oj-button>&nbsp;&nbsp;';
    html += '</div></div></oj-dialog>';
    return html;
}

function fnBuildCriteriaHTML_old(e) {
    var labelQCriteriaScreen = mainWin.getItemDesc("LBL_QUERY_CRITERIA_SCREEN");
    var labelQCriteriaName = mainWin.getItemDesc("LBL_QUERY_CRITERIA_NAME");
    var labelOk = mainWin.getItemDesc("LBL_OK");
    var labelCancel = mainWin.getItemDesc("LBL_CANCEL");
    var labelRemarks = mainWin.getItemDesc("LBL_REMARKS");	
//REDWOOD_CHANGES
    var html = '<div id=\"WNDtitlebar\" class=\"WNDtitlebar\" onkeydown="return fnHandleScrBtn(event)">';
    html += '<b class="BTNicon"><span class="ICOflexcube"></span></b>';
    html += '<h1 class=\"WNDtitletxt\">'+labelQCriteriaScreen+'</h1></div>';              
    html += '<div id=\"wndwidth\" class=\"WNDcontent\" style="clear:both; width:100%">';
    html += '<div class=\"DIVTwoColLyt\" id=\"ResTree\">';
    html += '<div class=\"BODYLanding\"><br>';
    html += '<div class=\"DIVText\"><label for=\"criteriaName\" class=\"LABELNormal\">'+labelQCriteriaName+'</label>&nbsp;&nbsp;<input type=\"text\" onkeydown=\"return fnHandleScrBtn(event)\" id="criteriaName" name="criteriaName" size =\"20\" maxLength=\"250"\ class="TextNormal"></div>';
    html += '<div class=\"DIVText\"><label for=\"remarks\" class=\"LABELNormal\">'+labelRemarks+'</label>&nbsp;&nbsp;<textarea id="REMARKS" onkeydown=\"return fnHandleScrBtn(event)\" maxLength=\"255"\ cols="1" rows="3" style="width:50%;padding-top:2px" class="TEXTAREASmall"></textarea></div>';
    html += '<br></div>'; 
    html += '<div class=\"DIVAudit\" style=\"padding:1px 0\">';
    html += '<table class=\"TABLEAudit\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"99%\">';
    html += '<tbody><tr><td valign=\"top\">&nbsp;</td>';
    html += '<td width=\"100%\" valign=\"top\" class=\"TDAuditButton\">';
    html += '<input type=\"button\" style=\"padding:3px 4px\" onblur=\"this.className=\'BUTTONExit\'\" onfocus=\"this.className=\'BUTTONOkHover\'\" onkeydown=\"return fnHandleScrBtn(event)\" onmouseout=\"this.className=\'BUTTONExit\'\" onmouseover=\"this.className=\'BUTTONOkHover\'\" class=\"BUTTONExit\" onclick=\"fnSaveSumCriteria(event)\" value=\"'+labelOk+'\" title=\"Ok\" id=\"BTN_OK\"></input>&nbsp;&nbsp;';
    html += '<input type=\"button\" style=\"padding:3px 4px\" onblur=\"this.className=\'BUTTONExit\'\" onfocus=\"this.className=\'BUTTONExitHover\'\" onkeydown=\"return fnHandleScrBtn(event)\" onmouseout=\"this.className=\'BUTTONExit\'\" onmouseover=\"this.className=\'BUTTONExitHover\'\" class=\"BUTTONExit\" onclick=\"fnExitSumCriteria(event)\" value=\"'+labelCancel+'\" title=\"Exit\" id=\"BTN_CANCEL\"></input>&nbsp;';
    html += '</td></tr></tbody></table></div></div></div></div>';
    return html;
}

function fnExitSumCriteria(event) {
    document.getElementById("masker").removeChild(document.getElementById('queryCriteria'));
    document.getElementById("BTN_EXIT").focus();
    unmask();
}

function fnSaveSumCriteria(e,flag) {
    var fieldName = "";
    var fieldValue = "";
    //if (tmpcriteriaName != "")   //9NT1606_12_4_RETRO_12_2_26230510 changes 
	//Bug_37004227 Starts
	/*if (tmpcriteriaName != "" && tmpcriteriaName == document.getElementById("criteriaName").value) //9NT1606_12_4_RETRO_12_2_26230510 changes 
		var criteriaName = tmpcriteriaName;
    else
        var criteriaName = trim(document.getElementById("criteriaName").value);//Fix for 17072455
	*/
	var criteriaName ="";
    if (tmpcriteriaName != "" ){
        criteriaName = tmpcriteriaName;
        if(document.getElementById("criteriaName") && tmpcriteriaName != document.getElementById("criteriaName").value){  
            criteriaName = trim(document.getElementById("criteriaName").value);
        }
    }else{
        criteriaName = trim(document.getElementById("criteriaName").value);
    }
	//Bug_37004227 ends
    if(tmpremarks != "") var remarks = tmpremarks;
    else if (document.getElementById("REMARKS")) 
        var remarks = document.getElementById("REMARKS").value;
    else
        var remarks = "";
    if(typeof(flag) == "undefined" || flag == null) flag = ""; //REDWOOD_CHANGES
    if (criteriaName == "") {
        document.getElementById('queryCriteria').style.display = "none";
        alertAction = "UNMASK";
        mask();
        showAlerts(fnBuildAlertXML('SM-8004', 'I'), 'I');
        gAction = "";
        return;
    } 
    var p_gAction = gAction;
    gAction  = "SAVEQCRITERIA";
    if(!screenArgs["fcjRequestDOM"]) {
        var tableValues = getNodeText(selectSingleNode(fcjRequestDOM, "FCJMSG/MAINTQRY/TABLE"));
        var tableValue =  new Array();
        var tempString =  new Array();
        tableValue = tableValues.split("~", -1);
        for (var i = 1; i < tableValue.length; i++) {
            tempString = tableValue[i].split(":", -1);
            fieldName = fieldName + tempString[0] +"~";
            fieldValue = fieldValue + tempString[1] +"~";
        }
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>SAVEQCRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + criteriaName + ']]></VALUE></PARAM><PARAM><NAME>REMARKS</NAME><VALUE><![CDATA[' + remarks + ']]></VALUE></PARAM><PARAM><NAME>FLAG</NAME><VALUE><![CDATA[' + flag + ']]></VALUE></PARAM><PARAM><NAME>FIELDNAME</NAME><VALUE><![CDATA[' + fieldName + ']]></VALUE></PARAM><PARAM><NAME>FIELDVALUE</NAME><VALUE><![CDATA['+ fieldValue + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    } else {
        var whereBy =  getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/WHERE"))
        var orderBy = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ORDERBY"))
        var advValues = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ADVVALUES"))
        var adopt = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ADOPT"))
        var orderByOpt = getNodeText(selectSingleNode(screenArgs["fcjRequestDOM"], "FCJMSG/MAINTQRY/ORDEBYOPT"))
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>SAVEQCRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + criteriaName + ']]></VALUE></PARAM><PARAM><NAME>REMARKS</NAME><VALUE><![CDATA[' + remarks + ']]></VALUE></PARAM><PARAM><NAME>FLAG</NAME><VALUE><![CDATA[' + flag + ']]></VALUE></PARAM><PARAM><NAME>WHERE_SAVE</NAME><VALUE><![CDATA[' + whereBy + ']]></VALUE></PARAM><PARAM><NAME>ORDERBY_SAVE</NAME><VALUE><![CDATA[' + orderBy + ']]></VALUE></PARAM><PARAM><NAME>ADVVALUES_SAVE</NAME><VALUE><![CDATA[' + advValues + ']]></VALUE></PARAM><PARAM><NAME>ADOPT_SAVE</NAME><VALUE><![CDATA[' + adopt + ']]></VALUE></PARAM><PARAM><NAME>ORDEBYOPT_SAVE</NAME><VALUE><![CDATA[' + orderByOpt + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>'; 
    }
    var requestDom = loadXMLDoc(requsetStr);
    var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            screenArgs["fcjRequestDOM"] = "";
            if (document.getElementById('queryCriteria')) document.getElementById("masker").removeChild(document.getElementById('queryCriteria'));
            document.getElementById("SaveCriteria").style.display = "none";
            document.getElementById("SaveCriteria").disabled = true;
            document.getElementById("SavedQry").disabled = false;
            document.getElementById("SavedQry").style.display = "block";
            alertAction = "UNMASK";
            mask();
            showAlerts(fnBuildAlertXML('SM-8001', 'I'), 'I');
            gAction = "";
            tmpcriteriaName = "";
            tmpremarks = "";
            summaryQryCriteria=parseInt(summaryQryCriteria)+1;
            //Added for 17077004 start
            currQryCriteriaName = "";
            currQryCriteriaRemarks =  "" ;
            //Added for 17077004 end
            return;
        } else {
            tmpcriteriaName = criteriaName;
            tmpremarks = remarks;
            document.getElementById("masker").removeChild(document.getElementById('queryCriteria'));
            alertAction = "UPDATECRITERIA";
            mask();
            showAlerts(fnBuildAlertXML('SM-8003', 'C'), 'C');
            gAction = "";
            return;
        }
    }
    gAction = p_gAction;
}

function fnQueryCriteria(action,event,isLaunch) {
    var p_gAction = gAction;
    var queryCriteriaName = "";
    var queryCriteriaNameAdv = "";
    var remarks = "";
    var advRemarks = "";
    dataprovider = screenKo.observable(new tempArrayDataProvider([]));//REDWOOD_CHANGES
    gAction = action;	 
//REDWOOD_CHANGES
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>QUERYCRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    respDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (respDom && getXMLString(respDom) != "") {
    var responseArr = selectNodes(respDom, "//ADDL");
    var tempArray = [];
    var idx = 0;
    var idxAdv = 0;
    for(var i=0; i < responseArr.length; i++) {
        var queryCritObj = {};
        for(var j = 0; j< responseArr[i].childNodes.length; j++) {            
            if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'QUERYCRITERIANAME') {
            queryCritObj['index'] = idx;
            queryCritObj['queryCritName'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            queryCritObj['queryType'] = mainWin.getItemDesc("LBL_NORMAL");
            idx++;
            continue;
            } else if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'REMARKS') {
            queryCritObj['queryCritRemarks'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            continue;
            } else if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'QUERYCRITERIANAMEADV') {
            queryCritObj['index'] = idxAdv;
            queryCritObj['queryCritName'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            queryCritObj['queryType'] = mainWin.getItemDesc("LBL_ADVANCE");
            idxAdv++;
            continue;
            } else if(getNodeText(responseArr[i].childNodes[j].childNodes[0]) == 'ADVREMARKS') {
            queryCritObj['queryCritRemarks'] = getNodeText(responseArr[i].childNodes[j].childNodes[1]);
            continue;
            }
        }
        tempArray.push(queryCritObj);
    }
    
    dataprovider(new tempArrayDataProvider(tempArray));
    
      if (tempArray != [] && isLaunch != true) {
            mask();
            var queryCriteriaWin = document.createElement("div");
            queryCriteriaWin.id = "qCriteriaName";
            queryCriteriaWin.className = "queryCriteriaDIV";
            queryCriteriaWin.style.position = "absolute";
            queryCriteriaWin.style.left = document.getElementById("DIVScrContainer").offsetWidth / 7 + "px";
            queryCriteriaWin.style.top = document.getElementById("DIVWNDContainer").offsetHeight / 5 + "px";
            queryCriteriaWin.style.width = document.getElementById("DIVScrContainer").offsetWidth / 1.4 + "px";
            queryCriteriaWin.style.display = "block";
            var html = fnQueryCriteriaNameHTML(respDom, action, event);
            queryCriteriaWin.innerHTML = html;
            document.getElementById("masker").appendChild(queryCriteriaWin);
            screenKo.cleanNode(document.getElementById("qCriteriaName"));
            screenKo.applyBindings(queryCriteriaWin, document.getElementById("qCriteriaName"));
            setTimeout(function(){document.getElementById('BTN_CANCEL').focus();},0);
            gAction = p_gAction;
            return;
        } else if (tempArray == [] && action != 'QUERYCRITERIA') {
            document.getElementById("SavedQry").disabled = true;
            document.getElementById("SavedQry").style.display = "none";
            gAction = "";
            } else if (typeof(isLaunch) == "undefined"){
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML('SM-8005', 'I'), 'I');
                gAction = "";
                return;
            }
    }
    gAction = p_gAction;
}

function fnQueryCriteriaNameHTML(respDom, action, event) {
    var labelCancel = mainWin.getItemDesc("LBL_CANCEL");
    var labelSavedQryScr = mainWin.getItemDesc("LBL_SAVED_QRY_SCR");
    var labelQryName = mainWin.getItemDesc("LBL_QUERY_NAME");
    var labelAction = mainWin.getItemDesc("LBL_ACTION");
    var labelQryType = mainWin.getItemDesc("LBL_QUERY_TYPE");
    var labelNormal = mainWin.getItemDesc("LBL_NORMAL");
    var labelEdit = mainWin.getItemDesc("LBL_EDIT");
    var labelDelete = mainWin.getItemDesc("LBL_DELETE");
    var labelAdvance = mainWin.getItemDesc("LBL_ADVANCE");
    columnArr = [{'headerText': "index", 'field':  "index",  'headerStyle':'display:none', 'style':'display:none'}, { 'headerText': labelQryName, 'field':  labelQryName}, { 'headerText': labelQryType, 'field':  labelQryType}, { 'headerText': labelAction, 'field':  labelAction}];
    
    var html = '<oj-dialog id=\"scrollingDialog\"  initial-visibility=\"show\" position.my.horizontal=\"center\" position.my.vertical=\"center\" position.at.horizontal=\"center\" position.at.vertical=\"center\" position.of=\"window\" style="height: 100vh">';
    html += '<div slot=header id=\"wndtitle\" class=\"oj-dialog-title\" onkeydown=\"return fnHandleScrBtn(event)\" style=\"width: 50%\">';/*summary query save criteria width changes*/
    html += '<h2>' + labelSavedQryScr + '</h2></div>';
    html += '<div slot=\"body\" id=\"wndwidth\" style="clear:both; width:100%">';
    html += '<oj-table id=\"ERRTBL\" aria-label=\"Saved Query Criteria Table\" data=\"[[dataprovider]]\" columns=\"{{columnArr}}\" class=\"oj-sm-width-full\" display="grid" style="max-height:300px;">';
    html += '<template slot="rowTemplate" data-oj-as="row">';
    html += '<tr><td scope="row"><span><oj-bind-text value=\"{{row.data.index}}\"></oj-bind-text></span></td>'
    html += '<td scope="row"><a title ={{row.data.queryCritRemarks}} tabindex=\"0\" id=\"resultsLink\" onkeydown=\"return fnHandleScrBtn(event)\" href="#" class="oj-link-standalone" onclick=\"fnExecuteQryCriteriaByName(respDom,event,\'EXECUTEQUERY\')\" href="#"><oj-bind-text value=\"{{row.data.queryCritName}}\"></oj-bind-text></a></td>';
    html += '<td scope="row"><span><oj-bind-text value=\"{{row.data.queryType}}\"></oj-bind-text></span></td>'
    html += '<td scope="row"><oj-menu-button chroming="borderless" display="icons" data-oj-clickthrough="disabled">';
    html += '<oj-menu  slot="menu">';
    html += '<oj-option value="edit" on-oj-action=\"[[fnExecuteQryCriteria.bind(null,row.data.queryType,respDom,row.data.index,event,\'EDITQUERY\')]]\"><span class="oj-ux-ico-edit" slot="startIcon"></span>' + labelEdit + '</oj-option>';
    html += '<oj-option value="delete" on-oj-action=\"[[fnExecuteQryCriteria.bind(null,row.data.queryType,respDom,row.data.index,event,\'DELETECRITERIA\')]]\"><span class="oj-ux-ico-delete-all" slot="startIcon"></span>' + labelDelete + '</oj-option>';
    html += '</oj-menu></oj-menu-button></td></tr>';
    html += '</template></oj-table></div>';
    html += '<div slot=\"footer\" class=\"oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border\">';
    html += '<div class=\"oj-flex-bar-end\">';
    html += '<oj-button class="action-button-primary" chroming="outlined" on-oj-action=\"[[fnExitSumQueryCriteria.bind(null,event)]]\" label=\"' + labelCancel + '\" title=\"Exit\" id=\"BTN_CANCEL\"></oj-button>&nbsp;';
    html += '</div></div></oj-dialog>';
    return html;
}
function fnQueryCriteria_old(action,event,isLaunch) {
    var p_gAction = gAction;
    var queryCriteriaName = "";
    var queryCriteriaNameAdv = "";
    var remarks = "";
    var advRemarks = "";
    gAction  = action; 
//REDWOOD_CHANGES
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>QUERYCRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    respDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (respDom && getXMLString(respDom) != "") {
        var responseNode = selectNodes(respDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYCRITERIANAME']");
        remarksNode = selectNodes(respDom, "//ADDL/PARAM/VALUE[../NAME = 'REMARKS']");
        for(var i = 0;i<responseNode.length;i++) {
            queryCriteriaName =  queryCriteriaName + getNodeText(responseNode[i])+"~";
            remarks =  remarks + getNodeText(remarksNode[i])+"~";
        }
        var responseNodeAdv = selectNodes(respDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYCRITERIANAMEADV']");
        advRemarksNode = selectNodes(respDom, "//ADDL/PARAM/VALUE[../NAME = 'ADVREMARKS']");
        for(var i = 0;i<responseNodeAdv.length;i++) {
            queryCriteriaNameAdv =  queryCriteriaNameAdv + getNodeText(responseNodeAdv[i])+"~";
            advRemarks =  advRemarks + getNodeText(advRemarksNode[i])+"~";
        }
        if ((queryCriteriaName != "" || queryCriteriaNameAdv != "") && isLaunch != true) {
            mask();
            var queryCriteriaWin = document.createElement("div");
            queryCriteriaWin.id = "qCriteriaName";
            queryCriteriaWin.className = "queryCriteriaDIV";
            queryCriteriaWin.style.position = "absolute";
            queryCriteriaWin.style.left = document.getElementById("DIVScrContainer").offsetWidth/7 + "px";
            queryCriteriaWin.style.top = document.getElementById("DIVWNDContainer").offsetHeight/5 + "px";
            queryCriteriaWin.style.width = document.getElementById("DIVScrContainer").offsetWidth/1.4 + "px";
            queryCriteriaWin.style.display = "block";
            var html = fnQueryCriteriaNameHTML(respDom,queryCriteriaName,queryCriteriaNameAdv,remarks,advRemarks,action,event);
            queryCriteriaWin.innerHTML = html;
            document.getElementById("masker").appendChild(queryCriteriaWin);
            document.getElementById('BTN_CANCEL').focus();
            gAction = p_gAction;
            return;
        } else if ((queryCriteriaName == "" && queryCriteriaNameAdv =="") && action != 'QUERYCRITERIA') {
            document.getElementById("SavedQry").disabled = true;
            document.getElementById("SavedQry").style.display = "none";
            gAction = "";
            } else if (typeof(isLaunch) == "undefined"){
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML('SM-8005', 'I'), 'I');
                gAction = "";
                return;
            }
    }
    gAction = p_gAction;
}

function fnQueryCriteriaNameHTML_old(respDom,queryCriteriaName,queryCriteriaNameAdv,remarks,advRemarks,action,event) {//REDWOOD_CHANGES
    var criteriaName = queryCriteriaName.split("~");
    var criteriaNameAdv = queryCriteriaNameAdv.split("~");
    var normalremarks = remarks.split("~");
    var advanceRemarks = advRemarks.split("~");
    var labelCancel = mainWin.getItemDesc("LBL_CANCEL");
    var labelSavedQryScr = mainWin.getItemDesc("LBL_SAVED_QRY_SCR");
    var labelQryName = mainWin.getItemDesc("LBL_QUERY_NAME");
    var labelAction = mainWin.getItemDesc("LBL_ACTION");
    var labelQryType = mainWin.getItemDesc("LBL_QUERY_TYPE");
    var labelNormal = mainWin.getItemDesc("LBL_NORMAL");
    var labelEdit = mainWin.getItemDesc("LBL_EDIT");
    var labelDelete = mainWin.getItemDesc("LBL_DELETE");
    var labelAdvance = mainWin.getItemDesc("LBL_ADVANCE");
    var html = '<div class=\"WNDcontainerModal\" id=\"DIVif1\">';
    //html += '<div id=\"wndtitle\" class=\"WNDtitlebar\" style=\"width: 560px;\">'; //9NT1606_12_4_RETRO_12_2_26229997 commented 
	html += '<div id=\"wndtitle\" class=\"WNDtitlebar\">'; //9NT1606_12_4_RETRO_12_2_26229997 changes 
    html += '<h1 class=\"WNDtitletxt\">'+labelSavedQryScr+'</h1></div>';
    html += '<div id=\"wndwidth\" class=\"WNDcontentmodal\">';
    html += '<div class=\"DIVtblbox1outer2\">';
    html += '<div class=\"DIVtblbox2\" id=\"tbl-container\">';
    html += '<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" summary=\"Alert\" class=\"TBLtwo\" id=\"ERRTBL\">';
    html += '<thead><tr><th scope=\"col\" class=\"THSinglerow\"><span class=\"SPNtbltwoH\">'+labelQryName+'</span></th>';
    html += '<th scope=\"col\" class=\"THSinglerow\"><span class=\"SPNtbltwoH\">'+labelQryType+'</span></th>';
    html += '<th scope=\"col\" class=\"THSinglerow\"><span class=\"SPNtbltwoH\">'+labelAction+'</span></th></tr>';
    html += '</thead><tbody>';
    for (var i = 0; i < criteriaName.length-1; i++) {
        if (normalremarks[i] == "null") normalremarks[i] = "";
        html += '<tr><td scope=\"row\" id = \"'+i+'\"><a title = \"'+normalremarks[i]+'\" tabindex=\"0\" id=\"resultsLink\" onkeydown=\"return fnHandleScrBtn(event)\" onclick=\"fnExecuteQryCriteria(respDom,'+i+',event,\'EXECUTEQUERY\')\" href="#" class="AstdName" style="margin-left:30px;">'+criteriaName[i]+'</a></td>';
        html += '<td scope="row">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<span class="SPNtbltwoC">'+labelNormal+'</span></td>'
        html += '<td scope="row">&nbsp;&nbsp;&nbsp;&nbsp<a tabindex=\"0\" id=\"editCriteria\" onkeydown=\"return fnHandleScrBtn(event)\" onclick=\"fnExecuteQryCriteria(respDom,'+i+',event,\'EDITQUERY\')\" href="#" class="AstdName" style="margin-left:30px;">'+labelEdit+'</a>&nbsp;&nbsp|&nbsp;&nbsp';
        html += '<a tabindex=\"0\" id=\"deleteCriteria\" onkeydown=\"return fnHandleScrBtn(event)\" onclick=\"fnExecuteQryCriteria(respDom,'+i+',event,\'DELETECRITERIA\')\" href="#" class="AstdName" style=\"margin-left:0px\">'+labelDelete+'</a></td></tr>'
    }
    for (var i = 0; i < criteriaNameAdv.length-1; i++) {
        if (advanceRemarks[i] == "null") advanceRemarks[i] = "";
        html += '<tr><td scope=\"row\" id = \"'+i+'\"><a title = \"'+advanceRemarks[i]+'\" tabindex=\"0\" id=\"resultsLink\" onkeydown=\"return fnHandleScrBtn(event)\" onclick=\"fnExecuteQryCriteriaAdv(respDom,'+i+',event,\'EXECUTEQUERY\')\" href="#" class="AstdName" style="margin-left:30px;">'+criteriaNameAdv[i]+'</a></td>';
        html += '<td scope="row">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<span class="SPNtbltwoC">'+labelAdvance+'</span></td>'
        html += '<td scope="row">&nbsp;&nbsp;&nbsp;&nbsp<a tabindex=\"0\" id=\"editCriteria\" onkeydown=\"return fnHandleScrBtn(event)\" onclick=\"fnExecuteQryCriteriaAdv(respDom,'+i+',event,\'EDITQUERY\')\" href="#" class="AstdName" style="margin-left:30px;">'+labelEdit+'</a>&nbsp;&nbsp|&nbsp;&nbsp';
        html += '<a tabindex=\"0\" id=\"deleteCriteria\" onkeydown=\"return fnHandleScrBtn(event)\" onclick=\"fnExecuteQryCriteriaAdv(respDom,'+i+',event,\'DELETECRITERIA\')\" href="#" class="AstdName" style=\"margin-left:0px\">'+labelDelete+'</a></td></tr>'
    }
    html += '</tbody></table></div></div>';
    html += '<div class=\"WNDfootermodal\">';
    html += '<div class=\"WNDfbuttons\">';
    html += '<table width=\"99%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" id=\"TBLPageTAB_FOOTER\" role=\"presentation\">';
    html += '<tbody><tr><td width=\"98%\" valign=\"top\"></td><td nowrap=\"nowrap\" style=\"padding-left:10px\">';
    html += '<input type=\"button\" name=\"'+labelCancel+'\" onkeydown=\"return fnHandleScrBtn(event)\" onclick=\"fnExitSumQueryCriteria(event)\" onmouseout=\"this.className=\'BUTTONExit\'\" onmouseover=\"this.className=\'BUTTONExit\'\" onfocus=\"this.className=\'BUTTONExit\'\" id=\"BTN_CANCEL\" value=\"'+labelCancel+'\" onblur=\"this.className=\'BUTTONExit\'\" class=\"BUTTONExit\"></td>';
    html += '</tr></tbody></table></div></div></div></div>';
    return html;
}
//REDWOOD_CHANGES
function fnExecuteQryCriteriaByName(responseQryDom, event, action) {
    var index = getNodeText(event.target.parentNode.previousSibling);
    var queryType = getNodeText(event.target.parentNode.nextSibling);
    fnExecuteQryCriteria(queryType, responseQryDom, index, event, action);
} 
//REDWOOD_CHANGES

function fnExitSumQueryCriteria(event) {
    document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
    document.getElementById("BTN_EXIT").focus();
    unmask();
}	 
//REDWOOD_CHANGES
function fnExecuteQryCriteria(queryType, responseQryDom, arrayNumber, event, action) {
    if (queryType == 'Advanced') {
        fnExecuteQryCriteriaAdv(responseQryDom, arrayNumber, event, action);
    }
    else {
    fnResetQry(event);
    var queryCriteriaName = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYCRITERIANAME']");
    var queryFldName = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYFLDNAME']");
    var queryFldValue = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYFLDVALUE']");
    var qryCriteriaName = getNodeText(queryCriteriaName[arrayNumber]);
    var p_gAction = "";
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
    if (action == "DELETECRITERIA") {
        p_gAction = gAction;
        gAction = "DELETECRITERIA";
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>DELETECRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + qryCriteriaName + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
        var requestDom = loadXMLDoc(requsetStr);
        var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
        mask();
        if (responseDom && getXMLString(responseDom) != "") {
            document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
            var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
            if (msgStat == "SUCCESS") {
                alertAction = "DELETECRITERIA";
                fnQueryCriteria('DELETECRITERIA', event, true);
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-017', 'I'), 'I');
                gAction = "";
                summaryQryCriteria = parseInt(summaryQryCriteria) - 1;
                return;
                }
                else {
                alertAction = "DELETECRITERIA";
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-019', 'I'), 'I');
                gAction = "";
                return;
            }
        }
        }
        else if (action == "EXECUTEQUERY") {
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var qryFldName = getNodeText(queryFldName[arrayNumber]);
        qryFldName = qryFldName.split("~");
        var qryFldValue = getNodeText(queryFldValue[arrayNumber]);
        qryFldValue = qryFldValue.split("~");
        for (var i = 0;i < qryFldName.length - 1;i++) {
			//Fix for 21575252 starts
			if(qryFldValue[i].indexOf("#SLCT") > -1) {
				document.getElementById(summaryDaraScrType+"__"+qryFldName[i]).value = qryFldValue[i].replace("#SLCT","");
			} else { //Fix for 21575252 ends
				if (qryFldValue[i] == "today") {//Summary save - calendar changes
                                    document.getElementById(summaryDaraScrType+"__"+qryFldName[i]).value = mainWin.AppDate;
                                    document.getElementById(summaryDaraScrType + "__" + qryFldName[i]).setAttribute("today", "true");
                                } else {
                                    document.getElementById(summaryDaraScrType+"__"+qryFldName[i]).value = qryFldValue[i];
                                }
				fireHTMLEvent(document.getElementById(summaryDaraScrType+"__"+qryFldName[i]), "onpropertychange"); //9NT1606_12_4_RETRO_12_2_26230635 changes 
			} //Fix for 21575252
        }
        fnExecuteQuery_sum("Y", event);
    } else if (action == "EDITQUERY") {
        //Added for 17077004 start
        currQryCriteriaName = qryCriteriaName;
        var event = window.event || event;
        var editElem = getEventSourceElement(event);
        currQryCriteriaRemarks = editElem.parentNode.parentNode.getElementsByTagName("A")[0].title;
        //Added for 17077004 end
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var qryFldName = getNodeText(queryFldName[arrayNumber]);
        qryFldName = qryFldName.split("~");
        var qryFldValue = getNodeText(queryFldValue[arrayNumber]);
        qryFldValue = qryFldValue.split("~");
        for (var i = 0;i < qryFldName.length - 1;i++) {
            if (qryFldValue[i] == "today") {//Summary save - calendar changes
                document.getElementById(summaryDaraScrType + "__" + qryFldName[i]).value = mainWin.AppDate;
                document.getElementById(summaryDaraScrType + "__" + qryFldName[i]).setAttribute("today", "true");
            } else {
                document.getElementById(summaryDaraScrType + "__" + qryFldName[i]).value = qryFldValue[i];
            }
            fireHTMLEvent(document.getElementById(summaryDaraScrType+"__"+qryFldName[i]), "onpropertychange");
        }
        //Added for 17077004 start
        document.getElementById("AdvSearch").disabled = true;
        document.getElementById("AdvSearch").style.display = "none"
        //Added for 17077004 end
    }
    unmask();
    gAction = p_gAction;
    document.getElementById("BTN_EXIT").focus();
}
}	
//REDWOOD_CHANGES

function fnExecuteQryCriteria_old(responseQryDom,arrayNumber,event,action) {  //REDWOOD_CHANGES
    fnResetQry(event); 
    var queryCriteriaName = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYCRITERIANAME']");
    var queryFldName =selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYFLDNAME']");
    var queryFldValue = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYFLDVALUE']");
    var qryCriteriaName = getNodeText(queryCriteriaName[arrayNumber]);
    var p_gAction = "";
    if (action == "DELETECRITERIA") {
        p_gAction = gAction;
        gAction  = "DELETECRITERIA";
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>DELETECRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + qryCriteriaName + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
        var requestDom = loadXMLDoc(requsetStr);
        var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
        mask();
        if (responseDom && getXMLString(responseDom) != "") {
            document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
            var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
            if (msgStat == "SUCCESS") {
                alertAction = "DELETECRITERIA";
                fnQueryCriteria('DELETECRITERIA',event,true);
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-017', 'I'), 'I');
                gAction = "";
                summaryQryCriteria=parseInt(summaryQryCriteria)-1;
                return;
            } else {
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-019', 'I'), 'I');
                gAction = "";
                return;
            }
        }
    } else if (action == "EXECUTEQUERY") {
        strCurrentTabID = 'idQuery';
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var qryFldName =  getNodeText(queryFldName[arrayNumber]);
        qryFldName = qryFldName.split("~", -1);
        var qryFldValue = getNodeText(queryFldValue[arrayNumber]);
        qryFldValue = qryFldValue.split("~", -1);
		//fix for 17043103 starts
        var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
        summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
        for (var i=0;i < qryFldName.length-1;i++) {
            if (document.getElementById(qryFldName[i]))
                document.getElementById(qryFldName[i]).value = qryFldValue[i];
            else if(document.getElementById(summaryDaraScrType+"__"+qryFldName[i]) && document.getElementById(summaryDaraScrType+"__"+qryFldName[i]).getAttribute("data_type") == "DATE")
                document.getElementById(summaryDaraScrType+"__"+qryFldName[i]).value = qryFldValue[i];
            else
                document.getElementById(summaryDaraScrType+"__"+qryFldName[i]+"__"+qryFldName[i]).value = qryFldValue[i];
        }
        fnExecuteQuery('',event);
    } else if (action == "EDITQUERY") {
        strCurrentTabID = 'idQuery';
        //Added for 17077004 start
        currQryCriteriaName = qryCriteriaName;
        var event = window.event || event;
        var editElem = getEventSourceElement(event);
        currQryCriteriaRemarks = editElem.parentNode.parentNode.getElementsByTagName("A")[0].title ;
        //Added for 17077004 end
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var qryFldName =  getNodeText(queryFldName[arrayNumber]);
        qryFldName = qryFldName.split("~", -1);
        var qryFldValue = getNodeText(queryFldValue[arrayNumber]);
        qryFldValue = qryFldValue.split("~", -1);
        var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
        summaryDaraScrType = summaryFN.substring(summaryFN.indexOf("TYPE") + 6, summaryFN.indexOf(">") - 1);
        for (var i=0;i < qryFldName.length-1;i++) {
            if (document.getElementById(qryFldName[i]))
                document.getElementById(qryFldName[i]).value = qryFldValue[i];
            else if(document.getElementById(summaryDaraScrType+"__"+qryFldName[i]) && document.getElementById(summaryDaraScrType+"__"+qryFldName[i]).getAttribute("data_type") == "DATE")
                document.getElementById(summaryDaraScrType+"__"+qryFldName[i]).value = qryFldValue[i];
            else
                document.getElementById(summaryDaraScrType+"__"+qryFldName[i]+"__"+qryFldName[i]).value = qryFldValue[i];
        }
		//fix for 17043103 ends
		 //Added for 17077004 start
        document.getElementById("AdvSearch").disabled = true;
        document.getElementById("AdvSearch").style.display = "none"
        //Added for 17077004 end
    }
    unmask();
    gAction = p_gAction;
    document.getElementById("BTN_EXIT").focus();
}
var screenArg = new Array();
function fnExecuteQryCriteriaAdv(responseQryDom,arrayNumber,event,action) {
    fnResetQry(event);
    var queryCriteriaNameAdv = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'QUERYCRITERIANAMEADV']");
    var qryCriteriaNameAdv = getNodeText(queryCriteriaNameAdv[arrayNumber]);
    var p_gAction = "";
    if (action == "DELETECRITERIA") {
        p_gAction = gAction;
        gAction  = "DELETECRITERIA";
        var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + mainWin.CurrentBranch + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>DELETECRITERIA</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><PKVALS/><ADDL><PARAM><NAME>QUERYCRITERIANAME</NAME><VALUE><![CDATA[' + qryCriteriaNameAdv + ']]></VALUE></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
        var requestDom = loadXMLDoc(requsetStr);
        var responseDom = fnPost(requestDom, "FCClientHandler", functionId);
        mask();
        if (responseDom && getXMLString(responseDom) != "") {
            document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
            var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
            if (msgStat == "SUCCESS") {
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-017', 'I'), 'I');
                gAction = "";
                summaryQryCriteria=parseInt(summaryQryCriteria)-1;
                return;
            } else {
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML('ST-SAVE-019', 'I'), 'I');
                gAction = "";
                return;
            }
        }
    } else if (action == "EXECUTEQUERY") {
        strCurrentTabID = 'idAdvanced';
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        var whereBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'WHERE_QUERY']");
        whereBy = getNodeText(whereBy[arrayNumber]);
        var orderBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDERBY_QUERY']");
        orderBy = getNodeText(orderBy[arrayNumber]);
        var advValues = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADVVALUES_QUERY']");
        advValues = getNodeText(advValues[arrayNumber]);
        var adopt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADOPT_QUERY']");
        adopt = getNodeText(adopt[arrayNumber]);
        var orderByOpt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDEBYOPT_QUERY']");
        orderByOpt = getNodeText(orderByOpt[arrayNumber]);
        advCriteriaList= '<SUMTABLE>MSVWS_MSSOUBRS</SUMTABLE><WHERE><![CDATA['+whereBy+']]></WHERE><ORDERBY>'+orderBy+'</ORDERBY><ADVVALUES><![CDATA['+advValues+']]></ADVVALUES><ADOPT><![CDATA['+adopt+']]></ADOPT><ORDEBYOPT><![CDATA['+orderByOpt+']]></ORDEBYOPT>';
        fnPaintAdv_Sum_Resp(advCriteriaList,event);
        showToolbar_sum(strCurrentTabID);
        return;
    } else if (action == "EDITQUERY") {
        strCurrentTabID = 'idAdvanced';
		//Added for 17077004 start
        currQryCriteriaName = qryCriteriaNameAdv;
        var event = window.event || event;
        var editElem = getEventSourceElement(event);
        currQryCriteriaRemarks = editElem.parentNode.parentNode.getElementsByTagName("A")[0].title ;
        //Added for 17077004 end
        document.getElementById("masker").removeChild(document.getElementById('qCriteriaName'));
        whereBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'WHERE_QUERY']");
        whereBy = getNodeText(whereBy[arrayNumber]);
        var orderBy = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDERBY_QUERY']");
        orderBy = getNodeText(orderBy[arrayNumber]);
        var advValues = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADVVALUES_QUERY']");
        advValues = getNodeText(advValues[arrayNumber]);
        var adopt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ADOPT_QUERY']");
        adopt = getNodeText(adopt[arrayNumber]);
        var orderByOpt = selectNodes(responseQryDom, "//ADDL/PARAM/VALUE[../NAME = 'ORDEBYOPT_QUERY']");
        orderByOpt = getNodeText(orderByOpt[arrayNumber]);
        var RetObj = new Object();
        RetObj.advWhereClause = whereBy;
        RetObj.advOperationClause = adopt;
        RetObj.advValueClause = advValues;
        RetObj.advOrderByClause = orderBy;
        RetObj.advOrderOptClause = orderByOpt;
        screenArg['RETURN_VALUE'] = RetObj;
        screenArg['SCREEN_NAME'] = "CVS_ADVANCED";
        screenArg['ACTION'] = "EDITQUERY";
        if (document.getElementById("advSearch")) {
            if (getIEVersionNumber() > 0) {
                fireHTMLEvent(document.getElementById("advSearch"), "onclick");
            } else {
                var fnEval = new Function("event",document.getElementById("advSearch").getAttribute("onclick"));  
                fnEval(event);
            }
        }
       }
    unmask();
    gAction = p_gAction;
}

function showToolbar_sum(sumAction) {	
//REDWOOD_CHANGES
if (sumAction == "EXECUTEQUERY") {
        document.getElementById("Search").disabled = true;
        document.getElementById("Search").style.display = "none";
        document.getElementById("AdvSearch").disabled = true;
        document.getElementById("AdvSearch").style.display = "none";
        document.getElementsByName("Records")[0].readonly = true;
        if(document.getElementById("Refresh")){
            document.getElementById("Refresh").disabled = false;
            document.getElementById("Refresh").style.display = "flex";
        }
        document.getElementById("SavedQry").style.display = "none";
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SaveCriteria").disabled = false;
        document.getElementById("SaveCriteria").style.display = "flex";
    }	 
//REDWOOD_CHANGES
    if (sumAction == "resetQry") {
        document.getElementById("Export").style.display = "none";
        document.getElementById("SaveCriteria").disabled = true;
        document.getElementById("SaveCriteria").style.display = "none"
        document.getElementById("Search").disabled = false;
        document.getElementById("Search").style.display = "flex";	//REDWOOD_CHANGES
        document.getElementById("AdvSearch").disabled = false;
        document.getElementById("AdvSearch").style.display = "flex"; //REDWOOD_CHANGES
        if (parseInt(summaryQryCriteria) == 0) {
            document.getElementById("SavedQry").disabled = true;
            document.getElementById("SavedQry").style.display = "none";
        } else {
            document.getElementById("SavedQry").disabled = false;
            document.getElementById("SavedQry").style.display = "flex";	//REDWOOD_CHANGES
        }
    } else if (advCriteriaList !== "" && strCurrentTabID == 'idAdvanced') {
        document.getElementById("Search").style.display = "none";
        document.getElementById("Search").disabled = true;
        document.getElementById("SaveCriteria").disabled = true;
        document.getElementById("SaveCriteria").style.display = "none";
        document.getElementById("AdvSearch").disabled = true;
        document.getElementById("AdvSearch").style.display = "none";
    }
    else if(sumAction == "resultSet"){
        document.getElementById("Search").disabled = true;
        document.getElementById("Search").style.display = "none";
        document.getElementById("AdvSearch").disabled = true;
        document.getElementById("AdvSearch").style.display = "none";
        document.getElementById("SaveCriteria").disabled = false;
        document.getElementById("SaveCriteria").style.display = "flex";	 //REDWOOD_CHANGES
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SavedQry").style.display = "none";
    }
}

function fnPopulateAdvQueryData() {
    var advQuryTable=document.getElementById("idadvQuryTable").tBodies[0];
    var advOrderTable=document.getElementById("idadvOrderTable").tBodies[0];  
    var whereClsArr = "";
    var advOrderOptClauseArr = "";
    if (parent.screenArg.RETURN_VALUE.advWhereClause != "") {
        whereClsArr = parent.screenArg.RETURN_VALUE.advWhereClause.split("~");
        operationClauseArr = parent.screenArg.RETURN_VALUE.advOperationClause.split("~");
        valueClauseArr = parent.screenArg.RETURN_VALUE.advValueClause.split("~");
        for (var i =0;i<whereClsArr.length-1;i++) {
            var row = document.createElement("TR");
            row.className = "SummaryAltTR";
            row.setAttribute("onblur", "this.className='SummaryAltTR'");
            row.setAttribute("onmouseover", "this.className='TDHoverSumRow'");
            row.setAttribute("onfocus", "this.className='TDHoverSumRow'");
            row.setAttribute("onmouseout", "this.className='SummaryAltTR'");
            advQuryTable.appendChild(row);
            var cell1 = document.createElement("TD");
            row.appendChild(cell1);
            cell1.className = "TBLoneTD1";
            cell1.setAttribute("scope", "row");
            var element1 = document.createElement("input"); 
            element1.type = "checkbox"; 
            element1.className = "CHKstd";
            cell1.appendChild(element1); 
            var cell3 = document.createElement("TD");
            row.appendChild(cell3);
            cell3.setAttribute("scope", "row");
            var selectedVariableValue1 = document.createElement("SPAN");
            selectedVariableValue1.className = "SPANText";
            setInnerText(selectedVariableValue1, trim(whereClsArr[i].split("~")));
            cell3.appendChild(selectedVariableValue1);
            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            cell5.setAttribute("scope", "row");
            var selectedVariableValue3 = document.createElement("SPAN");
            cell5.appendChild(selectedVariableValue3);
            selectedVariableValue3.className = "SPANText";
            setInnerText(selectedVariableValue3, trim(operationClauseArr[i].split("~")));
            var cell7 = document.createElement("TD");
            row.appendChild(cell7);
            cell7.setAttribute("scope", "row");
            var selectedVariableValue4 = document.createElement("SPAN");
            cell7.appendChild(selectedVariableValue4);
            selectedVariableValue4.setAttribute("type","text");
            selectedVariableValue4.className = "SPANText";
            setInnerText(selectedVariableValue4, trim(valueClauseArr[i].split("~")));
            var cell6 = document.createElement("TD");
            row.appendChild(cell6);
            cell6.width = "99%";
            cell6.setAttribute("scope", "row");
        }
    }
    if (parent.screenArg.RETURN_VALUE.advOrderByClause != "") {
        orderByClauseArr = parent.screenArg.RETURN_VALUE.advOrderByClause.split("~");
        advOrderOptClauseArr = parent.screenArg.RETURN_VALUE.advOrderOptClause.split("~");
        for (var i =0;i<orderByClauseArr.length-1;i++) {
            var row = document.createElement("TR");
            row.className = "SummaryAltTR";
            row.setAttribute("onblur", "this.className='SummaryAltTR'");
            row.setAttribute("onmouseover", "this.className='TDHoverSumRow'");
            row.setAttribute("onfocus", "this.className='TDHoverSumRow'");
            row.setAttribute("onmouseout", "this.className='SummaryAltTR'");
            advOrderTable.appendChild(row);
            
            var cell1 = document.createElement("TD");
            row.appendChild(cell1);
            cell1.className = "TBLoneTD1";
            cell1.setAttribute("scope", "row");
            var element1 = document.createElement("input");
            element1.type = "checkbox";
            element1.className = "CHKstd";
            cell1.appendChild(element1);
            
            var cell3 = document.createElement("TD");
            row.appendChild(cell3);
            cell3.setAttribute("scope", "row");
            var selectedVariableValue = document.createElement("SPAN");
            cell3.appendChild(selectedVariableValue);
            selectedVariableValue.className = "SPANText";
            setInnerText(selectedVariableValue, trim(orderByClauseArr[i].split("~")));
            var cell4 = document.createElement("TD");
            row.appendChild(cell4);
            cell4.setAttribute("scope", "row");
            var selectedVariableValue1 = document.createElement("SPAN");
            cell4.appendChild(selectedVariableValue1);
            selectedVariableValue1.className = "SPANText";
            setInnerText(selectedVariableValue1, trim(advOrderOptClauseArr[i].split("~")));
            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            cell5.width = "99%";
            cell5.setAttribute("scope", "row");
         }
    }
}

/*16861535 Fix starts*/
function fnChangeDisplay(e) {
    var calHtml1  = "";
    var calHtml2  = "";
    var amtHtml1 ="";
    var amtHtml2 ="";
    var fields    = document.getElementById("idSelectField");
    var type      = fields.options[fields.options.selectedIndex].getAttribute("DTYPE").toUpperCase();
    var advTblObj = document.getElementById("TblAdvanced");      
    
    switch(type) {        
        case 'AMOUNT':
        {
            amtHtml1 += '<label class="LBLinv" for="idTextFieldValue"></label>';
            amtHtml1 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue" name="idTextFieldValue" onpropertychange="displayAmount(this)">';
            amtHtml1 += '<label for="idTextFieldValueI">'+mainWin.getItemDesc("LBL_VALUE")+'</label>';
            amtHtml1 += '<INPUT TYPE="TEXT" class="TXTstd" id="idTextFieldValueI" name="idTextFieldValueI" onblur=\"validateInputAmount(\'idTextFieldValue\', event)\" >';
            amtHtml1 +='<BUTTON id="cmdLOV" onClick=\"fnBuildAdvLOV(\'idTextFieldValue\', event)\" class="BTNimg" ';
            amtHtml1 +='onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
            amtHtml1 +='onmouseout=\"this.className=\'BTNimg\'\">';
            amtHtml1 +='<span tabindex="-1" class="ICOlov"></span>';
            amtHtml1 +='</BUTTON> ';
            
            amtHtml2 += '<label class="LBLinv" for="idTextFieldValue2"></label>';
            amtHtml2 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue2" name="idTextFieldValue2" onpropertychange="displayAmount(this)">';
            amtHtml2 += '<label for="idTextFieldValue2I">'+mainWin.getItemDesc("LBL_TO")+'</label>';
            amtHtml2 += '<INPUT TYPE="TEXT" class="TXTro" id="idTextFieldValue2I" name="idTextFieldValue2I" disabled ="true" onblur=\"validateInputAmount(\'idTextFieldValue2\', event)\" >';
            amtHtml2 +='<BUTTON id="cmdLOV" onClick=\"fnBuildAdvLOV(\'idTextFieldValue2\', event)\" disabled ="true" class="BTNhide">';
            amtHtml2 +='<span tabindex="-1" class="ICOlov"></span>';
            amtHtml2 +='</BUTTON> ';
           
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML="";
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML=amtHtml1;
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML="";
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML=amtHtml2; 
            /*if ((trim(document.getElementById("idSelectOp").value)).toUpperCase() == "BETWEEN") 
                fnCheckOperator();*/ /*Commented for BugNo:17353210*/
            break;
        }
        case 'DATE':
        {
            calHtml1 += '<label class="LBLinv" for="idTextFieldValue"></label>';
            calHtml1 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue" name="idTextFieldValue" onpropertychange="displayDate(this)">';
            calHtml1 += '<label for="idTextFieldValueI">'+mainWin.getItemDesc("LBL_VALUE")+'</label>';
            calHtml1 += '<INPUT TYPE="TEXT" class="TXTstd" id="idTextFieldValueI" name="idTextFieldValueI" onblur=\"validateInputDate(\'idTextFieldValue\', event)\" >';
            calHtml1 +='<BUTTON id="cmdLOV" onClick=\"disp_cal(\'idTextFieldValue\',event)\" class="BTNimg" ';
            calHtml1 +='onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
            calHtml1 +='onmouseout=\"this.className=\'BTNimg\'\">';
            //calHtml1 +='<IMG class=IMGInline alt=Calendar src="Images/Flexblue/Icons/calendar.gif">';
            calHtml1 +='<SPAN class="IMGInline BtnCalender" title="Calendar"></SPAN>';
            calHtml1 +='</BUTTON> ';
            
            calHtml2 += '<label class="LBLinv" for="idTextFieldValue2"></label>';
            calHtml2 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue2" name="idTextFieldValue2" onpropertychange="displayDate(this)">';
            calHtml2 += '<label for="idTextFieldValue2I">'+mainWin.getItemDesc("LBL_TO")+'</label>';
            calHtml2 += '<INPUT TYPE="TEXT" class="TXTro" id="idTextFieldValue2I" name="idTextFieldValue2I" disabled ="true" onblur=\"validateInputDate(\'idTextFieldValue2\', event)\" >';
            calHtml2 +='<BUTTON id="cmdLOV" onClick=\"disp_cal(\'idTextFieldValue2\',event)\" disabled ="true" class="BTNhide">';
            //calHtml2 +='<IMG class=IMGInline alt=Calendar src="Images/Flexblue/Icons/calendar.gif">';
            calHtml2 +='<SPAN class="IMGInline BtnCalender" title="Calendar"></SPAN>';
            calHtml2 +='</BUTTON> ';

            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML="";
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML=calHtml1;
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML="";
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML=calHtml2; 
            /*if ((trim(document.getElementById("idSelectOp").value)).toUpperCase() == "BETWEEN") 
                fnCheckOperator();*/ /*Commented for BugNo:17353210*/
            break;
        }
        default:
        {
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML="";
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML=lovHtml;
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML="";
            advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML=lovHtml1;
            /*if ((trim(document.getElementById("idSelectOp").value)).toUpperCase() == "BETWEEN") 
                fnCheckOperator();*/ /*Commented for BugNo:17353210*/
            break;
        }
    }
    fnCheckOperator();/*Fix for BugNo:17353210*/
}
/*16861535 Fix ends*/
//static header change

function fnSyncTableWidth(){
  fnShowFreezeTable();
  fnShowRsltsTable();
  var headerTable = document.getElementById("TBL_QryRsltsHeader");
				var dataTable = document.getElementById("TBL_QryRslts");
        var headerFrzTable = document.getElementById("TBL_QryRsltsHeaderFreeze");
				var dataFrzTable = document.getElementById("TBL_QryRsltsFreeze");
				headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
        headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
				for(i=0;i<headerTable.tBodies[0].rows[0].cells.length-1;i++){/* 12.1 screen height change */
				if((parseInt(dataTable.tBodies[0].rows[0].cells[i].offsetWidth) >350) && parseInt(headerTable.tBodies[0].rows[0].cells[i].offsetWidth)<350){
          w = '350';
          headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w + "px";//Fix for 21398146
          for(j=0; j<dataTable.tBodies[0].rows.length;j++){
            dataTable.tBodies[0].rows[j].cells[i].children[0].style.width =  w + "px";
            dataTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace =  'normal';
            dataFrzTable.tBodies[0].rows[j].style.height = dataTable.tBodies[0].rows[j].offsetHeight + "px"
            }
          
         
        }else  if((parseInt(dataTable.tBodies[0].rows[0].cells[i].offsetWidth) >350) && parseInt(headerTable.tBodies[0].rows[0].cells[i].offsetWidth)>350){
          w = headerTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth;
          for(j=0; j<dataTable.tBodies[0].rows.length;j++){
            //dataTable.tBodies[0].rows[j].cells[i].children[0].style.width =  w + 0.5 + "px";//Fix for 21648079 //Bug_30867720
			dataTable.tBodies[0].rows[j].cells[i].children[0].style.width =  w + "px";//Fix for 21648079 //Bug_30867720
            dataTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace =  'normal';
            dataFrzTable.tBodies[0].rows[j].style.height = dataTable.tBodies[0].rows[j].offsetHeight + "px"
          }
        }else{//Fix for 21648079 
          w = Math.max(headerTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth,dataTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth); 
          //Fix for 21302719 start
		  //Bug_30867720 Starts
          //headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w + 0.5 + "px";
	       //dataTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w + 0.5 + "px";
		   headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
	       dataTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
	  //Bug_30867720 Ends
          //Fix for 21302719 end
        }
        }
        
		for(i=0;i<headerFrzTable.tBodies[0].rows[0].cells.length;i++){/* 12.1 screen height change */
        if((parseInt(dataFrzTable.tBodies[0].rows[0].cells[i].offsetWidth) >350) && parseInt(headerFrzTable.tBodies[0].rows[0].cells[i].offsetWidth)<350){//Fix for 21398146
          w = '350';
          headerFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w + "px";//Fix for 21398146
          for(j=0; j<dataFrzTable.tBodies[0].rows.length;j++){
            dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.width =  w + "px";
            dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace =  'normal';
          }
        }else  if((parseInt(dataFrzTable.tBodies[0].rows[0].cells[i].offsetWidth) >350) && parseInt(headerFrzTable.tBodies[0].rows[0].cells[i].offsetWidth)>350){//Fix for 21398146
          w = headerFrzTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth;
          for(j=0; j<dataFrzTable.tBodies[0].rows.length;j++){
            dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.width =  w + "px";
            dataFrzTable.tBodies[0].rows[j].cells[i].children[0].style.whiteSpace =  'normal';
          }
        }else{
          w = Math.max(headerFrzTable.tBodies[0].rows[0].cells[i].children[0].clientWidth,dataFrzTable.tBodies[0].rows[0].cells[i].children[0].clientWidth);
          //Fix for 21302719 start
		   //Bug_30867720 Starts
          //headerFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w + 0.5 + "px";
          //dataFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w + 0.5 + "px";
		  headerFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
          dataFrzTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
		   //Bug_30867720 ends
          //Fix for 21302719 end
        }
        }
        //Fix for 21253228 start
        fnHideFreezeTable();
        var cols = document.getElementsByName("Locks")[0].value;
        if (g_SummaryType == "B" || g_SummaryType == "U" || exportReq == 'Y')
           maxFreezeIndex = '5';
        else
           maxFreezeIndex = '4';
        if (headerFrzTable.tBodies[0].rows[0].cells.length >= maxFreezeIndex)
            fnFreezeColumns(cols);
        //Fix for 21253228 end
}

function fnSyncScroll(scrollDiv){
				document.getElementById("QryRsltsHeader").scrollLeft = scrollDiv.scrollLeft;
        document.getElementById("QryRsltsFreeze").scrollTop = scrollDiv.scrollTop;
				}

//Fix for 21253228 start
function fnHideFreezeTable() {
    var headerFrzTbl = document.getElementById("TBL_QryRsltsHeaderFreeze");
    var bodyFrzTbl = document.getElementById("TBL_QryRsltsFreeze");
    for (j = 0;j < headerFrzTbl.tBodies[0].rows[0].cells.length;j++) {
        if (headerFrzTbl.tBodies[0].rows[0].cells[j].className.indexOf("TDnone") ==  - 1)
            headerFrzTbl.tBodies[0].rows[0].cells[j].className += ' TDnone';
    }
    for (i = 0;i < bodyFrzTbl.tBodies[0].rows.length;i++) {
        for (j = 0;j < bodyFrzTbl.tBodies[0].rows[i].cells.length;j++) {
            if (bodyFrzTbl.tBodies[0].rows[i].cells[j].className.indexOf("TDnone") ==  - 1)
                bodyFrzTbl.tBodies[0].rows[i].cells[j].className += ' TDnone';
        }
    }
}
//Fix for 21253228 end

function fnShowFreezeTable(){
      var headerFrzTbl = document.getElementById("TBL_QryRsltsHeaderFreeze");
			var bodyFrzTbl = document.getElementById("TBL_QryRsltsFreeze");
			for (j=0; j<headerFrzTbl.tBodies[0].rows[0].cells.length ; j++)
			{
        headerFrzTbl.tBodies[0].rows[0].cells[j].className = headerFrzTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone","");
			}
			for (i=0; i<bodyFrzTbl.tBodies[0].rows.length ; i++){
				for (j=0; j<bodyFrzTbl.tBodies[0].rows[i].cells.length ; j++)
				{
          bodyFrzTbl.tBodies[0].rows[i].cells[j].className = bodyFrzTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone","");
				}
			}
}

function fnShowRsltsTable(){
      var headerFrzTbl = document.getElementById("TBL_QryRsltsHeader");
			var bodyFrzTbl = document.getElementById("TBL_QryRslts");
			for (j=0; j<headerFrzTbl.tBodies[0].rows[0].cells.length ; j++)
			{
        headerFrzTbl.tBodies[0].rows[0].cells[j].className = headerFrzTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone","");
			}
			for (i=0; i<bodyFrzTbl.tBodies[0].rows.length ; i++){
				for (j=0; j<bodyFrzTbl.tBodies[0].rows[i].cells.length ; j++)
				{
          bodyFrzTbl.tBodies[0].rows[i].cells[j].className = bodyFrzTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone","");
				}
			}
}
function fnFreezeColumns(noOfCols){
	var headerFrzTbl = document.getElementById("TBL_QryRsltsHeaderFreeze");
	var bodyFrzTbl = document.getElementById("TBL_QryRsltsFreeze");
	var headerTbl = document.getElementById("TBL_QryRsltsHeader");
	var bodyTbl = document.getElementById("TBL_QryRslts");
  var maxFreezeIndex = "";
  var freezeVal = "";
  if (g_SummaryType == "B" || g_SummaryType == "U" || exportReq == 'Y'){
    maxFreezeIndex = '5';
    freezeVal = parseInt(noOfCols)+1;
  }else{
    maxFreezeIndex = '4';
    freezeVal = noOfCols;
  }
  
	for (j=0; j<maxFreezeIndex ; j++)
	{
		if(noOfCols!=0 && j < parseInt(freezeVal)) headerFrzTbl.tBodies[0].rows[0].cells[j].className =  headerFrzTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone","");
		else {
    if(headerFrzTbl.tBodies[0].rows[0].cells[j].className.indexOf("TDnone")==-1){
    headerFrzTbl.tBodies[0].rows[0].cells[j].className += ' TDnone';
    }
	}
  }
  for (j=0; j<maxFreezeIndex ; j++)
	{
		if(noOfCols!=0 && j < parseInt(freezeVal)) {
     if(headerTbl.tBodies[0].rows[0].cells[j].className.indexOf("TDnone")==-1){
     headerTbl.tBodies[0].rows[0].cells[j].className += ' TDnone';
     }
    }
		else headerTbl.tBodies[0].rows[0].cells[j].className = headerTbl.tBodies[0].rows[0].cells[j].className.replace(" TDnone","");
    
  }
  if(!(bodyTbl.tBodies[0].rows[0].cells[0] && bodyTbl.tBodies[0].rows[0].cells[0].children.length==0) && !(bodyFrzTbl.tBodies[0].rows[0].cells[0] && bodyFrzTbl.tBodies[0].rows[0].cells[0].children.length == 0)){
	for (i=0; i<bodyFrzTbl.tBodies[0].rows.length ; i++){
		for (j=0; j<maxFreezeIndex ; j++)
		{
			if(noOfCols!=0 && j < parseInt(freezeVal)) bodyFrzTbl.tBodies[0].rows[i].cells[j].className = bodyFrzTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone","");
			else {
      if(bodyFrzTbl.tBodies[0].rows[i].cells[j].className.indexOf("TDnone")==-1){
      bodyFrzTbl.tBodies[0].rows[i].cells[j].className += ' TDnone';
		}
	}
    }
  }
	
	for (i=0; i<bodyTbl.tBodies[0].rows.length ; i++){
		for (j=0; j<maxFreezeIndex ; j++)
		{
			if(noOfCols!=0 && j < parseInt(freezeVal)) {
      if(bodyTbl.tBodies[0].rows[i].cells[j].className.indexOf("TDnone")==-1){
      bodyTbl.tBodies[0].rows[i].cells[j].className += ' TDnone';
      }
      }
			else bodyTbl.tBodies[0].rows[i].cells[j].className = bodyTbl.tBodies[0].rows[i].cells[j].className.replace(" TDnone","");
		
	}
    }
  }
  
	document.getElementById("QryRslts").style.width = document.getElementById("rsltsConatiner").offsetWidth - document.getElementById("QryRsltsFreeze").offsetWidth +"px";
	document.getElementById("QryRsltsHeader").style.width = document.getElementById("QryRslts").clientWidth +"px";
	document.getElementById("QryRsltsFreeze").style.height = document.getElementById("QryRslts").clientHeight + "px";
  document.getElementById("TBL_QryRslts").style.width = document.getElementById("TBL_QryRsltsHeader").offsetWidth +"px"; //static header change
 //Fix for 21261417 start
 //if(noOfCols!=0){
    //if(document.getElementById("QryRsltsHeaderFreeze").offsetWidth>0){
        //Fix for 21371744 start
        document.getElementById("QryRsltsHeader").style.marginTop = -(document.getElementById("QryRsltsHeaderFreeze").offsetHeight) +"px";
        if(mainWin.LangCode == "ARB"){
        document.getElementById("QryRsltsHeader").style.marginRight = document.getElementById("QryRsltsHeaderFreeze").offsetWidth +"px";
        document.getElementById("QryRslts").style.marginRight = document.getElementById("QryRsltsFreeze").offsetWidth +"px";
       }else{
         document.getElementById("QryRsltsHeader").style.marginLeft = document.getElementById("QryRsltsHeaderFreeze").offsetWidth +"px";
         document.getElementById("QryRslts").style.marginLeft = document.getElementById("QryRsltsFreeze").offsetWidth +"px";
       }
       document.getElementById("QryRslts").style.marginTop = -(document.getElementById("QryRsltsFreeze").offsetHeight) +"px";
    //}
    /*if(document.getElementById("QryRsltsFreeze").offsetWidth>0){
        document.getElementById("QryRslts").style.marginTop = -(document.getElementById("QryRsltsFreeze").offsetHeight) +"px";
        if(mainWin.LangCode == "ARB"){
        document.getElementById("QryRslts").style.marginRight = document.getElementById("QryRsltsFreeze").offsetWidth +"px";
       }else{
         document.getElementById("QryRslts").style.marginLeft = document.getElementById("QryRsltsFreeze").offsetWidth +"px";
       }
    }*/
 /* }else{
    document.getElementById("QryRsltsHeader").style.marginTop = "0px";
    document.getElementById("QryRslts").style.marginTop = "0px";
     if(mainWin.LangCode == "ARB"){
    document.getElementById("QryRsltsHeader").style.marginRight = "0px";
    document.getElementById("QryRslts").style.marginRight = "0px";
   }else{
     document.getElementById("QryRsltsHeader").style.marginLeft = "0px";
     document.getElementById("QryRslts").style.marginLeft = "0px";
   }
  }*///Fix for 21261417,21371744 end
}

function fnGetQryRsltFreezeHTML(v_ResultData, e){
    var event = window.event || e;
    if (v_ResultData != null) fcjResponseDOM = v_ResultData;
    var TextWrapCls = 'SPANText';
    var l_pageCnt = Number(document.getElementsByName("Records")[0].value);
    var curpage = Number(getInnerText(document.getElementsByName("CurPage")[0]));
    var LastPage = getInnerText(document.getElementsByName("TotPgCnt")[0]);
    var go_page = Number(document.getElementsByName("gotopage")[0].value);
    var l_ValueNodes = selectNodes(fcjResponseDOM, "//REC/FV");
    var maxFreezeCols = "";
    var l_No_Of_Rows = 0;
    if (l_ValueNodes.length <= l_pageCnt) l_pageCnt = l_ValueNodes.length;
    
    l_No_Of_Rows = l_pageCnt;
    var l_No_FV_Val = 0;
    var l_TBody = "<TBODY>";
    var pos = 0;
    var srcElem = getEventSourceElement(event);
    if (srcElem){
        var navpos = srcElem.name;
        if (navpos == "navNext" ||(!event.ctrlKey && event.keyCode == 34) ) pos = (curpage * l_pageCnt);
        if (navpos == "navLast" ||(!event.ctrlKey && event.keyCode == 35) ){
            if(LastPage=="..."){
                LastPage = Math.ceil((selectNodes(fcjResponseDOM, "//REC/FV").length) / (document.getElementsByName("Records")[0].value));
                setInnerText(document.getElementsByName("CurPage")[0],LastPage); 
                setInnerText(document.getElementsByName("TotPgCnt")[0],LastPage); 
            } 
            pos = ((LastPage - 1) * l_pageCnt);
         }
        if (navpos == "navFirst" || (!event.ctrlKey && event.keyCode == 36) ) pos = 0;
        if (navpos == "navPrev" ||(!event.ctrlKey && event.keyCode == 33) ) pos = ((curpage - 1) * l_pageCnt) - l_pageCnt;
        if (navpos == "go"){
            if (LastPage!="..." && go_page > LastPage){
                alert(lblPageNotExist);
                document.getElementsByName("gotopage")[0].value = curpage;
                pos = 0;
            } else{
                pos = ((go_page - 1) * l_pageCnt);
            }
        }
    }
    var LastRecPos = (pos + l_pageCnt);
    if(LastRecPos > l_ValueNodes.length){
        LastRecPos = l_ValueNodes.length;
    }
    if (srcElem){
        if (navpos == "navLast" ||(!event.ctrlKey && event.keyCode == 35) ||((curpage == (LastPage - 1))&&(!event.ctrlKey && event.keyCode == 34)) ||((go_page != 0) && (LastPage != 0) && (go_page == LastPage)) || ((curpage == (LastPage - 1) && navpos == "navLast")) || ((curpage == (LastPage - 1) && navpos == "navNext"))) LastRecPos = l_ValueNodes.length;
    }
    
    for (var l_Itr = pos; l_Itr < LastRecPos; l_Itr++){
        var l_FvNode = l_ValueNodes[l_Itr];
        var rowIdx = l_Itr;
        if ((pos % 2) != 0) rowIdx = l_Itr + 1;
        if ((rowIdx + 1) % 2 == 0){
            l_TBody = l_TBody + "<TR class='SummaryAltTR' onblur=\"fnResetClass("+rowIdx+")\" onmouseover=\"fnHighlightRow("+rowIdx+")\" onfocus=\"fnHighlightRow("+rowIdx+")\" onmouseout=\"fnResetClass("+rowIdx+")\">";
        } else{
            l_TBody = l_TBody + "<TR onblur=\"fnResetClass("+rowIdx+")\" onmouseover=\"fnHighlightRow("+rowIdx+")\" onfocus=\"fnHighlightRow("+rowIdx+")\" onmouseout=\"fnResetClass("+rowIdx+")\" >";
        }
        var l_FvValsArr = getNodeText(l_FvNode).split("~");

        if (l_FvValsArr.length > 0) l_No_FV_Val = l_FvValsArr.length;

        if (g_SummaryType == "B" || g_SummaryType == "U") l_TBody = l_TBody + "<TD class='TDgrid1' tabindex='0' ondblClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)' onkeydown = 'return fnHandleSumRslt(event)'><div> <label class='LBLauto' for='RSLT_CHKBOXFrz"+l_Itr+"'><span class='LBLinv'>"+ mainWin.getItemDesc("LBL_RECORDS")+l_Itr+"</span><INPUT TYPE = 'CHECKBOX' tabindex='0' NAME = 'RSLT_CHKBOXFrz' id='RSLT_CHKBOXFrz"+l_Itr+"' class = 'INPUTCheckbox' title='"+mainWin.getItemDesc("LBL_SELECT_ROW")+"' onclick='fnToggleChkBox(this, "+l_Itr+")'/></label></div></TD>";//static header change,Fix for 21609922 //HTML5 Changes
        var count = 0;
        for (var l_Idx = 0; l_Idx < l_FvValsArr.length - 1; l_Idx++){//fix for bug#21391705 
        if (count==4) break;
            var l_Idx_Temp = "";
            var align = "";
            var scope = "";
                l_Idx_Temp = l_Idx;

            //if (document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].TYPE == 'AMOUNT'){//static header change
			  if (document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("TYPE") == 'AMOUNT'){//static header change//Fix for 31382929
                var relatedCcy = document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].RELATED_FIELD;// static header change
                var ccy = "";
                if (relatedCcy != '' && relatedCcy != undefined) //9NT1606_14_4_OFSS_CONSULTING_31868197 Added undefined check
                ccy = fnGetCurrency(relatedCcy, l_FvValsArr);

                if (ccy == ""){
                    ccy = mainWin.Lcy;
                }
                var mb3Amount = new MB3Amount(l_FvValsArr[l_Idx], true, ccy, true);
                if (mb3Amount.isValid()) l_FvValsArr[l_Idx] = mb3Amount.getInputAmount();
            }
            //if (document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("DTYPE") == 'NUMBER' || document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].TYPE == 'AMOUNT'){//static header change
              if (document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("DTYPE") == 'NUMBER' || document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("TYPE") == 'AMOUNT'){//static header change//Fix for 31382929  
				align = "align='right'";
            }
            var re = new RegExp("[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]");
           // if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') == -1 && document.getElementById('TBL_QryRslts').tHead.rows[0].cells[l_Idx_Temp].TYPE == 'DATE') // Fix for 15911731 
			//if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') == -1 && document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].TYPE == 'DATE') // Fix for 15911731 //static header chnage
            if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') == -1 && document.getElementById('TBL_QryRsltsHeaderFreeze').tBodies[0].rows[0].cells[l_Idx_Temp].getAttribute("TYPE") == 'DATE') // Fix for 15911731 //static header chnage//Fix for 31382929
			{
                //if(l_FvValsArr[l_Idx].split('-').length == 3 && l_FvValsArr[l_Idx].indexOf(':') == -1){
                var mb3Date = new MB3Date(l_FvValsArr[l_Idx], gDateFormatDSO);
                if (mb3Date.isValidDate()) l_FvValsArr[l_Idx] = mb3Date.getShortDate();
            } else if (re.test(l_FvValsArr[l_Idx]) && l_FvValsArr[l_Idx].indexOf(':') > 0){
                var datePart = l_FvValsArr[l_Idx].substring(0, 10);
                var timePart = l_FvValsArr[l_Idx].substring(10);
                var mb3Date = new MB3Date(datePart, gDateFormatDSO);
                if (mb3Date.isValidDate()) l_FvValsArr[l_Idx] = mb3Date.getShortDate() + timePart;
            }
            var l_index = l_FvValsArr[l_Idx].indexOf("00:00:00");
            if (l_index > 0) l_FvValsArr[l_Idx] = l_FvValsArr[l_Idx].substring(0, l_FvValsArr[l_Idx].indexOf("00:00:00") - 1);
            if (l_Idx == 0){
                scope = "scope='row'";
            }else{
                scope = "";
            }
            if (gscrPos == 'template'){
            	TextWrapCls = 'SPANText';
                if (l_FvValsArr[l_Idx].length > 50){
                    TextWrapCls = 'SPANTextarea';
                }
                if (l_FvValsArr[l_Idx] == ""){
                    l_TBody = l_TBody + "<TD " +scope+" ondblClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)'" + align + " ><div class='SPANText'>&nbsp;</div></TD>";//static header change //HTML5 Changes
                    count++;
                } else{
                        l_TBody = l_TBody + "<TD "+scope+" ondblClick = 'fnDetailScreen(event)'  ontouchstart = 'fnDetailScreenDevice(event)' tabindex ='0' onkeydown = 'return fnHandleSumRslt(event)' " + align + " > <div class='" + TextWrapCls + "'>" + l_FvValsArr[l_Idx] + "</div></TD>";//static header change //HTML5 Changes
                        count++;
                }
            } else{
                l_TBody = l_TBody + "<TD " +scope+ " ondblClick = 'fnDetailScreen(event)' ontouchstart = 'fnDetailScreenDevice(event)'  " + align + " > <NOBR><div class='" + TextWrapCls + "'>" + l_FvValsArr[l_Idx] + "</div></NOBR></TD>";//static header change //HTML5 Changes
                count++;
            }
        } 
        l_TBody = l_TBody + "</TR>";
    } //For  FV
    l_TBody = l_TBody + "</TBODY></TABLE>";
    return l_TBody;

}

function fnResetClass(rowIndex){
  if(rowIndex % 2 ==0){
    document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].className = '';
    document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].className = '';
  }else{
    document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].className = 'SummaryAltTR';
    document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].className = 'SummaryAltTR';
  }
}

function fnHighlightRow(rowIndex){
    document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].className = 'TDHoverSumRow';
    document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].className = 'TDHoverSumRow';
}

//Performance Changes
/*function fnpostActionSummary(action){
    if (mainWin.mBean_required == "Y") {       
		inTime = (inDate.getHours() * (3600 * 1000)) + (inDate.getMinutes() * (60 * 1000)) + (inDate.getSeconds() * 1000) + inDate.getMilliseconds();
       if(selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/FCUBS_HEADER/TIMELOG"))
       	var l_TimeLogvalue = getNodeText(selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/FCUBS_HEADER/TIMELOG"));       
       if(selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/FCUBS_HEADER/SEQLIST"))
       var seqno=getNodeText(selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/FCUBS_HEADER/SEQLIST")).split("~")[2];
       var scrSeqNo = getNodeText(selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/FCUBS_HEADER/SEQLIST")).split("~")[1];
       var loginSeqNo= getNodeText(selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/FCUBS_HEADER/SEQLIST")).split("~")[0];
       try{
       var dbnetTime=l_TimeLogvalue.split("~")[3]-l_TimeLogvalue.split("~")[2];
       var serverTime=l_TimeLogvalue.split("~")[1]-l_TimeLogvalue.split("~")[0]-dbnetTime; 
              dbnetTime=parseFloat(dbnetTime);
              serverTime=parseFloat(serverTime);
       var dbTime=parseFloat(l_TimeLogvalue.split("~")[4]); 
       var dbSesId=parseFloat(l_TimeLogvalue.split("~")[5]);
       // servletstarttime ~ endtime ~  
        var t = getDateObject();
        var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds(); 
        var jstime=parseFloat(parseFloat(posttime)-parseFloat(inTime));
            jstime=jstime+parseFloat(parseFloat(time)-parseFloat(afterposttime)) ;
            jstime=Math.round(jstime*100)/100;
        startTime = inDate.getFullYear()+'-'+(inDate.getMonth()+1)+'-'+inDate.getDate()+" "+inDate.getHours()+':'+inDate.getMinutes()+':'+inDate.getSeconds();
        endTime = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
        var totaltime=parseFloat(parseFloat(t.getTime())-parseFloat(inDate.getTime())) ;
              totaltime=Math.round(totaltime*100)/100;
        var nettime=totaltime-jstime-serverTime-dbTime;
              nettime=Math.round(nettime*100)/100;        
          
         var clientLog=mainWin.DebugStmt;
         setActionTime(inTime,jstime,dbTime,serverTime,functionId, action); 
         //fnPostActionLog(jstime,dbTime,serverTime,startTime, endTime, totaltime,clientLog,"","",seqno,dbSesId,loginSeqNo,scrSeqNo,action);
         fnPopulateTimes(loginSeqNo,scrSeqNo,seqno,jstime,dbTime,serverTime,startTime,endTime,totaltime);
         
         }catch(e){}
         inTime="";
         inDate = "";
         posttime="";
         afterposttime="";
    }
}*/
//Performance Changes
//Fix for 21609922 start
function fnToggleChkBox(obj, rowIndex) {
setTimeout(function (){
fnToggleChkBox1(obj, rowIndex);
}, 0);    
}

function fnToggleChkBox1(obj, rowIndex) {
    if (obj.checked){
        obj.checked = true;
        if(obj.getAttribute("name")=='RSLT_CHKBOXFrz'){
           document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].cells[0].children[0].children[0].children[1].checked = true;
        }else if(obj.getAttribute("name")=='RSLT_CHKBOX'){
            document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].cells[0].children[0].children[0].children[1].checked = true;
        }
    }
    else{ 
        obj.checked = false;
        if(obj.getAttribute("name")=='RSLT_CHKBOXFrz'){
           document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].cells[0].children[0].children[0].children[1].checked = false;
        }else if(obj.getAttribute("name")=='RSLT_CHKBOX'){
            document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].cells[0].children[0].children[0].children[1].checked = false;
        }
    }
}//Fix for 21609922 end
//REDWOOD_CHANGES
function lockColumnChangedHandler(event){
var srcEle = getEventSourceElement(event);
if(srcEle){debugger;
    var tblName = srcEle.getAttribute("tableName");
    var columnArrFun = new Function("return "+tblName+'columnArray()');
    var columnArr = columnArrFun();
    if(columnArr){
        for(var item in columnArr){
             columnArr[item].frozenEdge=null;
        }
        var lockColumnCount = Number(event.detail.value);
        for(var i=0;i<lockColumnCount;i++){
            columnArr[i].frozenEdge='start';
        }
        var fnEval = new Function("event",tblName+'columnArray');  
                fnEval(columnArr);
        //columnArrFun = Function( tblName+'columnArray('+columnArr+')');
       // columnArrFun();
        document.getElementById('TBL_QryRslts').refresh();
    }
}
    
}
function resetQueryCollapsible(flag){//OJET Migration
    if(document.getElementById('queryCollapsible')){
        document.getElementById('queryCollapsible').setAttribute("expanded",flag); 

     }
}

function handleSelectedChanged(event){
debugger;
    if(event.detail.items){
   // selectedFields = event.detail.items[0].parentElement.parentElement.id;
    var operatorDivId  = event.detail.items[0].getAttribute("elmid");
    selectedFields = operatorDivId + '~' + event.detail.items[0].getAttribute("dtype") + '~' + getInnerText(event.detail.items[0]);
    var liList =document.getElementById("TblAdvanced").getElementsByTagName("li");
    var parentId=event.detail.items[0].parentElement.parentElement.id;
    var selectedLiElement;
    

    var liArr =  [...liList];
    liArr.forEach((elem) => {   
        var id= elem.getAttribute("elmid");
        if(id){
        document.getElementById(id+'_DIV').style.display="none";
        if(document.getElementById(id+'_TODIV')){
           document.getElementById(id+'_TODIV').style.visibility="hidden";
        }
        
        if(document.getElementById(id).value== " between "){
            if(document.getElementById(id+"_TODIV")){
                document.getElementById(id+"_TODIV").style.visibility="visible";
            }
        }
        }
    });
    if(document.getElementById(operatorDivId+'_DIV')){
        document.getElementById(operatorDivId+'_DIV').style.display="block";
    }
//    if(parentId=="idRecommendedField"){
//      selectedLiElement=document.getElementById("idSelectField").querySelector(".oj-selected");
      refreshAdvancedSearchOptionalListView();
//    }else{
//      selectedLiElement=document.getElementById("idRecommendedField").querySelector(".oj-selected");
//      refreshAdvancedSearchRecommendedListView();
//    }
    }
}

//function refreshAdvancedSearchRecommendedListView(){
//document.getElementById("idRecommendedField").children[0].innerHTML=recommendedListView;
//document.getElementById("idRecommendedField").refresh();
//}

function refreshAdvancedSearchOptionalListView(){
document.getElementById("idSelectField").children[0].innerHTML=optionalListView;
document.getElementById("idSelectField").refresh();
}

function operatorValueChangedHandler(event){
    //debugger;
    if(event.detail.value== " between "){
        if(document.getElementById(event.target.id+"_TODIV")){
            document.getElementById(event.target.id+"_TODIV").style.visibility="visible";
        }
    }else{
         if(document.getElementById(event.target.id+"_TODIV")){
            document.getElementById(event.target.id+"_TODIV").style.visibility="hidden";
        }
    }
}

function storeAdvancedSearchListView(){
recommendedListView=document.getElementById("idRecommendedField").children[0].innerHTML;
optionalListView=document.getElementById("idSelectField").children[0].innerHTML;
}

function fnSave_sum(scrName,e) {
    if (scrName == "CVS_ADVANCED") {
        //  var advValuesClause ="";
        var i = 0;
        var valueofVariable = "";
        var queryValue = ""
        var operationValue = "";
        var queryName = "";
        //Advanced Summary Query Building
        parent.defaultOrderByClause = "";

        var advQryTblRows = getTableObjForBlock("idadvQuryHeaderTable").tBodies[0].rows;
        for (i = 0;i < advQryTblRows.length;i++) {
            if(advQryTblRows[i].cells[0].children.length > 0) {
            // Fix for Bug 16326855 - start 
            // queryValue = queryValue + " " + getInnerText(advQryTblRows[i].cells[1].getElementsByTagName("SPAN")[0]) + "~ "; 
                queryValue = queryValue + " " + getInnerText(advQryTblRows[i].cells[1]) + "~ ";
                queryName = queryName + " " + getInnerText(advQryTblRows[i].cells[2]) + "~ ";
            // Fix for Bug 16326855 - end
                operationValue = operationValue + " " + getInnerText(advQryTblRows[i].cells[3]) + "~ ";
            //Bug 15908897 fix starts
                valueofVariable = valueofVariable + getInnerText(advQryTblRows[i].cells[4]) + "~";
            }
        }
        //Bug 15908897 fix ends
        var orderColValue = "";
        var orderOperation = ""
        var advOdrByTblRows = getTableObjForBlock("idadvOrderHeaderTable").tBodies[0].rows;
        for (i = 0;i < advOdrByTblRows.length;i++) {
            if(advOdrByTblRows[i].cells[0].children.length > 0) {
                orderColValue = orderColValue + getInnerText(advOdrByTblRows[i].cells[1]) + "~";
                orderOperation = orderOperation + getInnerText(advOdrByTblRows[i].cells[2]) + "~";
            }
        }
        //12.1 summary performance changes new start
        if(parent.criteriaSearch=='Y'){
            if(!validateAdvCriteria(queryValue,valueofVariable)) return false;
        }
        //12.1 summary performance changes new end
        var RetObj = new Object();
        RetObj.advWhereClause = queryValue;
        RetObj.advQueryName = queryName;
        RetObj.advOperationClause = operationValue;
        RetObj.advValueClause = valueofVariable;
        //RetObj.advOrderByClause = document.getElementById("idTAOrderBy").value;
        RetObj.advOrderByClause = orderColValue;
        RetObj.advOrderOptClause = orderOperation;
        parent.screenArgs['RETURN_VALUE'] = RetObj;
        //parent.fnCloseSubScr(e);
        parent.fnCloseSubScreen(e);
        parent.fnExitAdvScr(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);//12.1 summary performance changes new 
        //return true;
    }
}

function fnShowValues(advLovReturnFld, e) {
     //12.1 summary performance changes start
    //var field = selectedFields;   
    var selFieldData = selectedFields.split('~');
    //12.1 summary performance changes End
    var customLov = "N";
    /*if (fields.options.selectedIndex == -1) {
        alert(selectElement);
        return;
    }*/
    var fieldName = selFieldData[0].split("__")[1];
    var fieldLabel = selFieldData[2];
    var fieldDtype = selFieldData[1];
    fnBuildAdvLovSum(fieldName, fieldLabel, fieldDtype, true, e, advLovReturnFld);
    //fnBuildExtSummaryLOV(fieldName, fieldLabel, fieldDtype, advLovReturnFld, e);
}

function fnBuildExtSummaryLOV(fieldName, fieldLabel, fieldDtype, advLovReturnFld, event) {

    var lovId = fieldName;
    var reductionInfo = fieldLabel + "!TEXT";
    var customLov = "N";
    var customLovId = "";
    if(parent.document.getElementsByName(fieldName).length > 0){
      if(parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOV")){
        customLov = parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOV");
         document.getElementById(advLovReturnFld).setAttribute("CUSTOMLOV", customLov);
      }   
      if(parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOVID")){   
        customLovId = parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOVID");
      }
    }
    if(customLov == "Y" && customLovId != ""){
      lovId = customLovId;
    }
    if (typeof (lovInfoFlds[lovId]) == "undefined")
        lovInfoFlds[lovId] = {
        };
    if (advLovReturnFld == '')
        lovInfoFlds[lovId][0] = fieldName + "~";//retflds[lovId] = fieldName + "~";   /*12.0.4 UI performance changes */
    else 
        lovInfoFlds[lovId][0] = advLovReturnFld + "~";
    lovInfoFlds[lovId][1] = "";/*12.0.4 UI performance changes */
    //else retflds[lovId] = advLovReturnFld + "~";
    //bndFlds[lovId] = "";
    var advFuncId = "";
    if (functionId.substring(2, 3) == "D") {
        advFuncId = functionId.substring(0, 2) + "S" + functionId.substring(3, functionId.length);
    } else {
        advFuncId = functionId;
    }
    
    //getNextSibling(parent.document.getElementsByName(fieldName).getAttribute("onclick"));
    if(customLov == 'Y'){
      var fnEval = new Function("event", getNextSibling(parent.document.getElementsByName(fieldName)[0]).getAttribute("onclick"));
      fnEval(event);
    }else{
      disp_lov(advFuncId, '', '', fieldLabel, lovId, '', fieldLabel, reductionInfo, '', event);
    }
}
 //REDWOOD_CHANGES