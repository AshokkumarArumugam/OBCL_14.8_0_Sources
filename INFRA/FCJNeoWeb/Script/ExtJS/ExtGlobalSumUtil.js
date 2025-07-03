/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtGlobalSummary.js
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
  **  Modified On          : 12-Aug-2016
  **  Modified Reason      : In case of CASA screens, DMSUtility.js is being imported for Document upload 
                             feature which has some function name used in Summary excel export case. 
                             Renamed the function name for fixing this issue 
  **  Retro Source         : 9NT1606_12_1_PS_STORYBOARD
  **  Search String        : 9NT1606_12_2_RETRO_12_1_23664350
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 30-Sep-2016
  **  Modified Reason      : Changes done to call fnPostExecuteQuery_sum() handler on refresh action also  
  **  Retro Source         : 9NT1606_12_0_1_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_1_23652699
  
  **  Modified By          : Niranjana R
  **  Modified On          : 23-May-2017
  **  Modified Reason      : In Message browser screens, after clicking some buttons and then click on clear summary and then click any LOV in the summary screen, 
  **                         the LOVs are not responding since the gAction is not reset. Changes done to reset gAction in fnClearSummary
  **  Search String        : 9NT1606_12_4_WELLS FARGO_26078178
  
  **  Modified By          : Ambika S
  **  Modified On          : 04-Jul-2018
  **  Modified Reason      : Code changes done to use obj.textContent to get the pk field value for 
                             considering the spaces in the text value. 
  **  Search String        : 9NT1606_14_1_RETRO_12_1_28114089
  
  **  Modified By          : Divya Alagappan
  **  Modified On          : 11-Apr-2023
  **  Modified Reason      : Code changes done to display records in STSCOLON summary screen in Redwood    
  **  Search String        : REDWOOD_Bug#35114770
  **
  **  Modified By          : Shayam Sundar Ragunathan
  **  Modified On          : 26-Apr-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : REDWOOD_35326529
    **
  **  Modified By          : Selvam Manickam
  **  Modified On          : 06-May-2023
  **  Modified Reason      : Summary fields LOV button enabled after click on search but textfield was disabled
  **  Search String        : REDWOOD_CHANGES
  
  **  Modified By          : Nagendra Babu
  **  Modified On          : 22-May-2023
  **  Change Description   : STSCIF Upon doing order by, system does not open correct record.
  **  Search String        : REDWOOD_35283566 
  
  **  Modified By          : Manoj S
  **  Modified On          : 28-Sep-2023
  **  Change Description   : KYC reference details value passing properly to fetch lov data.
  **  Search String        : REDWOOD_35694934 
 
  **  Modified By          : Girish M
  **  Modified On          : 30-Apr-2024
  **  Change Description   : Wrong date is displayed on screen for different timezones. 
                             Issue is due to fix provided for bug 35326529. 
							 Reverting the same.
  **  Search String        : REDWOOD_36543777   

  **  Modified By          : Girish M
  **  Modified On          : 20-Dec-2024
  **  Change Description   : Dynamic width adjustment to column in OJ-TABLE.
  **  Search String        : REDWOOD_Column_Resize
  
  **  Modified By          : Girish M
  **  Modified On          : 20-Jan-2025
  **  Change Description   : Excel Export data issue
  **  Search String        : Bug_36099490
----------------------------------------------------------------------------------------------------
*/
function fnResetQry(e) {
   resetQueryCollapsible("true"); //REDWOOD_CHANGES
    
    fnSetImage(false, e);
    /*if(document.getElementById("toggleLock").innerHTML == mainWin.getItemDesc("LBL_SUM_UNLOCK")){
        lockCols(false);
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
//REDWOOD_CHANGES
    //static header change end
    fnClearSummary();
    if (document.getElementsByName("Search")[0].disabled == false) {
        resetElements();
		//Added for 17077004 start
        currQryCriteriaName = "";
        currQryCriteriaRemarks = "";
        document.getElementById("AdvSearch").disabled = false;
        document.getElementById("AdvSearch").style.display = "flex";	//REDWOOD_CHANGES
        //Added for 17077004 end
    }
    document.getElementById("Search").disabled = false;
    document.getElementById("Search").style.display = "flex"; //REDWOOD_CHANGES
    //Added for 17077004 start
    //document.getElementById("AdvSearch").disabled = false;
    //document.getElementById("AdvSearch").style.display = "block"
    //Added for 17077004 end
    document.getElementById("Refresh").disabled = true;
    document.getElementById("Refresh").style.display = "none";
    document.getElementById("Export").style.display = "none";
    document.getElementById("ExportAll").style.display = "none"; // Bug 19609280 - Asynchronous summary export changes
    document.getElementById("SaveCriteria").style.display = "none";
    document.getElementById("SaveCriteria").disabled = true;
    if (parseInt(summaryQryCriteria) == 0) {
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SavedQry").style.display = "none";
    } else {
        document.getElementById("SavedQry").disabled = false;
        document.getElementById("SavedQry").style.display = "flex";//REDWOOD_CHANGES
    }
    //12.0.3 Summary to detail changes starts
    document.getElementById("Details").style.display = "none";
    document.getElementById("Details").disabled = true;
    //12.0.3 Summary to detail changes ends
    setInnerText(document.getElementById("CurPage"), 1);
    setInnerText(document.getElementById("TotPgCnt"), 1);
    fnEnableQueryFlds();
    whereClause_adv = "";
    orderByClause_adv = "";
  
}

function fnResetAll(e) {
    resetQueryCollapsible("true"); //REDWOOD_CHANGES
    fnSetImage(false, e);
    /*if(document.getElementById("toggleLock").innerHTML == mainWin.getItemDesc("LBL_SUM_UNLOCK")){
        lockCols(false);
    }*/
	//Added for 17077004 start
    currQryCriteriaName = "";
    currQryCriteriaRemarks ="";
    //Added for 17077004 end
    
    resetElements();
    fnClearSummary();
    document.getElementById("Search").disabled = false;
    document.getElementById("Search").style.display = "flex"; //REDWOOD_CHANGES
    document.getElementById("AdvSearch").disabled = false;
    document.getElementById("AdvSearch").style.display = "flex";	//REDWOOD_CHANGES
    document.getElementById("Refresh").disabled = true;
    document.getElementById("Refresh").style.display = "none";
    document.getElementById("Export").style.display = "none";
    document.getElementById("ExportAll").style.display = "none";// Bug 19609280 - Asynchronous summary export changes
    document.getElementById("SaveCriteria").style.display = "none";
    document.getElementById("SaveCriteria").disabled = true;
    if (parseInt(summaryQryCriteria) == 0) {
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SavedQry").style.display = "none";
    } else {
        document.getElementById("SavedQry").disabled = false;
        document.getElementById("SavedQry").style.display = "flex";	//REDWOOD_CHANGES
    }
	//12.0.3 Summary to detail changes starts
    document.getElementById("Details").style.display = "none";
    document.getElementById("Details").disabled = true;
    //12.0.3 Summary to detail changes ends
    setInnerText(document.getElementById("CurPage"), 1);
    setInnerText(document.getElementById("TotPgCnt"), 1);
    fnEnableQueryFlds();
    whereClause_adv = "";
    orderByClause_adv = "";
}
function fnClearSummary() {
    fndisableNavBtns();
    fnClearResult();
    g_DetPkArray = new Array();
	gAction='';//9NT1606_12_4_WELLS FARGO_26078178
}

function fnClearResult() {
//REDWOOD_CHANGES
    
 var tableDBT= document.getElementById("TBL_QryRslts").getAttribute("DBT");
 if(tableDBT){
     meArrayForAddDelete[tableDBT]([]);
 }
//    var tableHeaderObj = document.getElementById("TBL_QryRsltsHeader");//Static Header change
//    //tableObj.getElementsByTagName("TH")[0].className = "TDnone";
//    tableHeaderObj.getElementsByTagName("TD")[0].children[0].children[0].children[1].disabled = true;//Static Header change
//    tableHeaderObj.getElementsByTagName("TD")[0].getElementsByTagName("INPUT")[0].checked = false;//Static Header change
//    var rows = tableObj.tBodies[0].rows;
//	var Headerelem = tableHeaderObj.tBodies[0].rows[0].cells; //Static Header change
//	var fldname = "";
//    for (var i = 0; i < rows.length; i++) {
//        cells = rows[i].cells;
//        rows[i].style.height = 'auto';//static header change
//        for (var j = 0; j < cells.length; j++) {
//            if (j == 0) {
//                //cells[0].className = "TDnone";
//                cells[0].getElementsByTagName("INPUT")[0].disabled = true;
//                cells[0].getElementsByTagName("INPUT")[0].checked = false;
//                continue;
//            }
//			fldname = Headerelem[j].getAttribute("name");
//      Headerelem[j].children[0].style.width = 'auto'; //static header change
//            cells[j].innerHTML = "<div><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">&nbsp;</a></div>";//Static Header change
//        }
//    }
//    
//    //static header change start
//    tableObj = document.getElementById("TBL_QryRsltsFreeze");
//    tableHeaderObj = document.getElementById("TBL_QryRsltsHeaderFreeze");
//    tableHeaderObj.getElementsByTagName("TD")[0].children[0].children[0].children[1].disabled = true;
//    tableHeaderObj.getElementsByTagName("TD")[0].getElementsByTagName("INPUT")[0].checked = false;
//    rows = tableObj.tBodies[0].rows;
//    Headerelem = tableHeaderObj.tBodies[0].rows[0].cells; //Static Header change
//	  fldname = "";
//    for (var i = 0; i < rows.length; i++) {
//        cells = rows[i].cells;
//        rows[i].style.height = 'auto';//static header change
//        for (var j = 0; j < cells.length; j++) {
//            if (j == 0) {
//                //cells[0].className = "TDnone";
//                cells[0].getElementsByTagName("INPUT")[0].disabled = true;
//                cells[0].getElementsByTagName("INPUT")[0].checked = false;
//                continue;
//            }
//			fldname = Headerelem[j].getAttribute("name");
//      Headerelem[j].children[0].style.width = 'auto'; //static header change
//            cells[j].innerHTML = "<div><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">&nbsp;</a></div>";//Static Header change
//        }
//    }
//    //static header change end
//    fnSyncTableWidth();//Static Header change	   
//REDWOOD_CHANGES
}

function fnDisableQueryFlds() {
    var obj = document.getElementById("TblQuery");	
//REDWOOD_CHANGES
   // var objInput = obj.getElementsByTagName("OJ-INPUT-TEXT");
    var objSelect = obj.getElementsByTagName("OJ-SELECT-SINGLE");
     var ojElements = ["OJ-INPUT-NUMBER","OJ-INPUT-TEXT","OJ-BUTTON","OJ-INPUT-DATE"];
    for(var j =0;j<ojElements.length;j++){
         objInput = obj.getElementsByTagName([ojElements[j]]);	
//REDWOOD_CHANGES
    for (var i = 0; i < objInput.length; i++) {
        if (objInput[i].type != "hidden") {
            objInput[i].readonly = true;   //REDWOOD_CHANGES
			objInput[i].disabled = true; //REDWOOD_CHANGES
            if (getNextSibling(objInput[i])) {	 
//REDWOOD_CHANGES
                if (getNextSibling(objInput[i]).tagName == "OJ-BUTTON") {
                    getNextSibling(objInput[i]).readonly = true;
                  //  fnRemoveHover(getNextSibling(objInput[i])); //Fix for disable
                   // getNextSibling(objInput[i]).className = "BTNimgD"; 
//REDWOOD_CHANGES
                }
            }
        }
    }
    }//REDWOOD_CHANGES
    
    for (var i = 0; i < objSelect.length; i++) {
        objSelect[i].readonly = true;  //REDWOOD_CHANGES

    }
}

function fnEnableQueryFlds() {
    var obj = document.getElementById("TblQuery");
//REDWOOD_CHANGES
   // var objInput = obj.getElementsByTagName("OJ-INPUT-TEXT");
    var objSelect = obj.getElementsByTagName("OJ-SELECT-SINGLE");
    var ojElements = ["OJ-INPUT-NUMBER","OJ-INPUT-TEXT","OJ-BUTTON","OJ-INPUT-DATE"];
    for(var j =0;j<ojElements.length;j++){
        objInput = obj.getElementsByTagName([ojElements[j]]); 
//REDWOOD_CHANGES
    for (var i = 0; i < objInput.length; i++) {
        if (objInput[i].type != "hidden") {
            objInput[i].readonly = false;	 //REDWOOD_CHANGES
			objInput[i].disabled = false; //REDWOOD_CHANGES
            if (getNextSibling(objInput[i])) {
                if (getNextSibling(objInput[i]).tagName == "BUTTON") {
//REDWOOD_CHANGES
                    getNextSibling(objInput[i]).readonly = false;
                 //   getNextSibling(objInput[i]).className = "BTNimg";
                  //  fnHover(getNextSibling(objInput[i])); //Fix for disable
//REDWOOD_CHANGES
                }
            }
        }
    }
    }	//REDWOOD_CHANGES
    
    for (var i = 0; i < objSelect.length; i++) {
        objSelect[i].readonly = false; //REDWOOD_CHANGES

    }
}

function fnDispChkBox(RecnodeList) {
    if ((g_SummaryType == "S" || g_SummaryType == "B") && RecnodeList.length != 0) { //Fix for  18321079
        //document.getElementById("TBL_QryRslts").getElementsByTagName("TH")[0].className = "TBLoneTH";
//REDWOOD_CHANGES
        getTableObjForBlock("TBL_QryRsltsHeader").tBodies[0].rows[0].cells[0].children[0].children[0].children[1].disabled = false;//Static Header change
        getTableObjForBlock("TBL_QryRsltsHeaderFreeze").tBodies[0].rows[0].cells[0].children[0].children[0].children[1].disabled = false;//Static Header change
        var rowElem = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
//REDWOOD_CHANGES
        for (var i = 0; i < RecnodeList.length; i++) {
            //rowElem[i].cells[0].className = "";
            rowElem[i].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
            //rowElem[i].cells[0].getElementsByTagName("INPUT")[0].className = "CHKstd";//HTML5 Changes
        }
        for (var j = RecnodeList.length; j < rowElem.length; j++) {
            //rowElem[j].cells[0].className = "";
            rowElem[j].cells[0].getElementsByTagName("INPUT")[0].disabled = true;
            //rowElem[j].cells[0].getElementsByTagName("INPUT")[0].className = "dispNone";//HTML5 Changes
        }
        
        //static header change start
        rowElem = getTableObjForBlock("TBL_QryRsltsFreeze").tBodies[0].rows;//REDWOOD_CHANGES
        for (var i = 0; i < RecnodeList.length; i++) {
            //rowElem[i].cells[0].className = "";
            rowElem[i].cells[0].getElementsByTagName("INPUT")[0].disabled = false;
            //rowElem[i].cells[0].getElementsByTagName("INPUT")[0].className = "CHKstd";//HTML5 Changes
        }
        for (var j = RecnodeList.length; j < rowElem.length; j++) {
            //rowElem[j].cells[0].className = "";
            rowElem[j].cells[0].getElementsByTagName("INPUT")[0].disabled = true;
            //rowElem[j].cells[0].getElementsByTagName("INPUT")[0].className = "dispNone";//HTML5 Changes
        }
        //static header change end
    }
}
function fnShowSummaryData() {
//REDWOOD_CHANGES
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
        singleRecObj['sumPKVals'] =  g_DetPkArray[i]; //REDWOOD_35283566
        var l_fv = getNodeText(RecnodeList[i].childNodes[0]);
        var fvArray = l_fv.split("~");
        for (var j = 0; j < fvArray.length - 1; j++) {
            for (var tdObjCnt = 0;tdObjCnt < tdObj.length;tdObjCnt++) {
				if (tdObj[tdObjCnt].childElementCount != 0) //REDWOOD_Bug#35114770 added
                var tdObjElem = tdObj[tdObjCnt].children[0].children[0];
                if(!tdObjElem){
                     tdObjElem = tdObj[tdObjCnt].children[0];
                }
                if (tdObjElem.getAttribute("name") == fnArray[j]) {
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
					//REDWOOD_36543777 Commenting the fix provided for 35326529
                    //REDWOOD_35326529
                  /*  else if(tdObjElem.tagName.toUpperCase() == "OJ-INPUT-DATE") {
                        //debugger;
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
                            singleRecObj[fnArray[j] ]= fvArray[j];					
                    }*/
                    //REDWOOD_35326529
                    else {
                        if (fieldType[fnArray[j]] == "AMOUNT") {
                            var ccy = "";
                            var ccyFld = relatedField[fnArray[j]];
                            /*Fix for 18758948 Starts*/
                            for (var indx = 0;indx <= j;indx++) {
                                if (fnArray[indx] == ccyFld) {
                                    /*Fix for 18758948 ends*/
                                    ccy = fvArray[indx];
                                    break;
                                }
                            }

                            if (ccy == "")
                                ccy = mainWin.Lcy;
                            fvArray[j] = fvArray[j].replace(decimalSymbol, gDecimalSymbol);
                            var formatAmount = new getFmtdAmt(fvArray[j], ccy);
                            if (formatAmount)
                                fvArray[j] = formatAmount.getInputAmount();
                        }
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
        document.getElementsByName("Export")[0].style.display = "flex" ;
        g_SummaryType = "B";
    }
    
    /* Bug 19609280 - Asynchronous summary export changes */
     if (expAllReq == 'Y') {
        document.getElementsByName("ExportAll")[0].disabled = false;
        document.getElementsByName("ExportAll")[0].style.display = "flex";
        g_SummaryType = "B";
    }   
    /* Bug 19609280 - Asynchronous summary export changes */
    
    //12.0.3 Summary to detail changes starts--Fix for 18716479
	if (typeof(detailRequired) != 'undefined' && detailRequired) {        
		document.getElementById("Details").style.display = "flex";
		document.getElementById("Details").disabled = false;
	}

setTimeout( function(){
    fnSyncTableWidth();//REDWOOD_Column_Resize //Static Header change
},1000);

}
function fnShowSummaryData_old() {	 
//REDWOOD_CHANGES

    var RecnodeList = selectNodes(fcjResponseDOM, "//REC");

    fnClearResult();
	g_DetPkArray = new Array(); //Fix for 15889315 
	var Headerelem = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].cells; //Static Header change
	var fldname = "";
    for (var i = 0; i < RecnodeList.length; i++) {

        g_DetPkArray[i] = RecnodeList[i].getAttribute("RECID"); //array build for 
        var l_fv = getNodeText(RecnodeList[i].childNodes[0]);
        var fvArray = l_fv.split("~");
        for (var j = 0; j < fvArray.length - 1; j++) {
            var rowElem = document.getElementById("TBL_QryRslts").tBodies[0].rows[i];
            /*var cellElem;
            if (g_SummaryType == "B" || g_SummaryType == "U") 
                cellElem = rowElem.cells[j+1];
            else
                cellElem = rowElem.cells[j];
            */
            var cellElem = rowElem.cells[j + 1];
            if (cellElem.name != undefined) var cellElemName = cellElem.name;
            else var cellElemName = cellElem.getAttribute("name");
            if (typeof (OptionValue[cellElemName]) != "undefined") {
                var options = OptionValue[cellElemName].split("~");
                fvArray[j] = getFieldDesc(options, fvArray[j]);
            } else if (typeof (fieldType[cellElemName]) != "undefined") {
                if (fieldType[cellElemName] == "AMOUNT") {

                    var ccy = "";
                    var ccyFld = relatedField[cellElemName];
                    /*Fix for 18758948 Starts*/
                    for (var indx = 0; indx <= j; indx++) {
                        if (rowElem.cells[indx].getAttribute("name") == ccyFld) {
                            /*Fix for 18758948 ends*/
                            ccy = fvArray[indx - 1];
                            break;
                        }
                    }

                    if (ccy == "") ccy = mainWin.Lcy;
                    fvArray[j] = fvArray[j].replace(decimalSymbol, gDecimalSymbol);
                    var formatAmount = new getFmtdAmt(fvArray[j], ccy);
                    if (formatAmount) fvArray[j] = formatAmount.getInputAmount();
                } 
				 else if (fieldType[cellElemName] == "NUMBER") {
                    //Number fomat changes starts
                    var enteredVal = fvArray[j];
                    var theadEle = Headerelem[j + 1];
                    if (theadEle.getAttribute("FORMAT_REQD") == "Y") {
                        var maxNumDigitsAfterDecimal = theadEle.getAttribute("MAX_DECIMALS");
                        fvArray[j] = formatNumber(enteredVal, maxNumDigitsAfterDecimal);
                    }
                }
                else {
                    //Number format changes ends				
                    var re = new RegExp("[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]");
                    if (re.test(fvArray[j]) && fvArray[j].indexOf(':') == -1) {
                        var FormatDate = new getFrmtDate(fvArray[j], gDateFormatDSO);
                        if (FormatDate.isValidDate()) fvArray[j] = FormatDate.getShortDate();
                    } else if (re.test(fvArray[j]) && fvArray[j].indexOf(':') > 0) {
                        var datePart = fvArray[j].substring(0, 10);
                        var timePart = fvArray[j].substring(10);
                        var FormatDate = new getFrmtDate(datePart, gDateFormatDSO);
                        if (FormatDate.isValidDate()) fvArray[j] = FormatDate.getShortDate() + timePart;
                    }
                    var l_index = fvArray[j].indexOf("00:00:00");
                    if (l_index > 0) fvArray[j] = fvArray[j].substring(0, fvArray[j].indexOf("00:00:00") - 1);
                }
            }
            /*
            if (g_SummaryType == "B" || g_SummaryType == "U")
                document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j+1].innerHTML = "<a href='#;return false' class='Astd'>"+ fvArray[j] +"</a>";
            else
                document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j].innerHTML = "<a href='#;return false' class='Astd'>"+ fvArray[j] +"</a>"; 
            */
            if (j == 0 || j == 1){
			fldname = Headerelem[j+1].getAttribute("name");
			document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j + 1].innerHTML = "<div><a href='#;return false' class='Astd' alt=" + fldname + ">" + fvArray[j] + "</a></div>";//Static Header change
      document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[i].cells[j + 1].innerHTML = "<div><a href='#;return false' class='Astd' alt=" + fldname + ">" + fvArray[j] + "</a></div>";//Static Header change
			
			}
            else {
			fldname = Headerelem[j+1].getAttribute("name");
			document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j + 1].innerHTML = "<div><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">" + fvArray[j] + "</a></div>";//Static Header change
      //if(j<8 && document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j + 1].className !=  "TDnone"){ //Fix for 33684166 - Changed according to max no of Lock columns
    if(j<8 && getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[j + 1].className !=  "TDnone"){ //REDWOOD_CHANGES
      document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[i].cells[j + 1].innerHTML = "<div><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">" + fvArray[j] + "</a></div>";//Static Header change
      }
			}
        }
    }
    if (exportReq == 'Y') {
        document.getElementsByName("Export")[0].disabled = false;
        document.getElementsByName("Export")[0].style.display = "flex"; //REDWOOD_CHANGES
        g_SummaryType = "B";
    }
    
    /* Bug 19609280 - Asynchronous summary export changes */
     if (expAllReq == 'Y') {
        document.getElementsByName("ExportAll")[0].disabled = false;
        document.getElementsByName("ExportAll")[0].style.display = "flex";  //REDWOOD_CHANGES
        g_SummaryType = "B";
    }   
    /* Bug 19609280 - Asynchronous summary export changes */
    
    //12.0.3 Summary to detail changes starts--Fix for 18716479
	if (typeof(detailRequired) != 'undefined' && detailRequired) {        
		document.getElementById("Details").style.display = "flex";	 //REDWOOD_CHANGES
		document.getElementById("Details").disabled = false;
	}
    //12.0.3 Summary to detail changes ends --Fix for 18716479
    fnDispChkBox(RecnodeList);
    fnDisableQueryFlds();
    fnSyncTableWidth();//Static Header change
}

//Number format changes starts
function formatNumber(entrdval,maxNumDigitsAfterDecimal){
  var decsymbol = ".";
  var arrTemp = entrdval.split(decsymbol);
  var numBeforeDecimal = arrTemp[0];
  var numAfterDecimal = arrTemp[1];
  var isNegative = false;
  if(numBeforeDecimal.indexOf("-") >-1){
      isNegative = true;
      numBeforeDecimal = numBeforeDecimal.replace("-", "");
  }

 if(numAfterDecimal == undefined) numAfterDecimal = "";
      var  maxNumDigitsAftrDecimal = parseInt(maxNumDigitsAfterDecimal);
      if(isNaN(parseInt(maxNumDigitsAftrDecimal))) maxNumDigitsAftrDecimal = 0;
      var retVal = "";
      var digitPos = 0;
          for (var loopIndex = numBeforeDecimal.length - 1; loopIndex >= 0; loopIndex--){
          switch (mainWin.gNumberFormatMask){
          case "L":
              if ((digitPos > 1) && ((digitPos % 2) == 1)){
                  retVal = gDigitGroupingSymbol + retVal;
              }
              retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
              break;
          default:
               if ((digitPos > 1) && ((digitPos % 3) == 0)){
                  retVal = gDigitGroupingSymbol + retVal;
              }
              retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
          }
          digitPos++;
          }
          if(numAfterDecimal != "" || maxNumDigitsAftrDecimal != "0") retVal += gDecimalSymbol;
           if(maxNumDigitsAftrDecimal > numAfterDecimal.length){
               numAfterDecimal += "000000000000000000000000000000000000";
               retVal += numAfterDecimal.substr(0, maxNumDigitsAftrDecimal);      
           }
           else{
               retVal += numAfterDecimal;
           }
           if(isNegative) retVal = "-"+retVal;
           return retVal;
}
//Number format changes ends

function getFieldDesc(options, fvValue) {
    var fldDesc = "";
    for (var optCnt = 0; optCnt < options.length - 1; optCnt++) {
        if (options[optCnt].split("__")[0] == fvValue) {
            fldDesc = options[optCnt].split("__")[1];
            break;
        }
    }
    return fldDesc;
}

function getFmtdAmt(amt, ccy) {
    var tmpAmt;
    var amountSpecifier = "";
    var arrAmtComponents;
    var negativeSymbol = "-";
    var decimalSymbol = ".";
    var digitGroupingSymbol = ",";
    var dbdecimalSymbol = mainWin.nlsAmountFormat.substr(0, 1);
    negativeSymbol = gNegativeSymbol;
    decimalSymbol = gDecimalSymbol;
    digitGroupingSymbol = gDigitGroupingSymbol;

    if (amt == null || amt == "") {
        tmpAmt = "0" + decimalSymbol + "0";
    } else {
        tmpAmt = doTrim(amt);
    }

    if (cAmountSpecifiers.indexOf(tmpAmt.toUpperCase().substr(tmpAmt.length - 1)) > -1) {
        amountSpecifier = tmpAmt.toUpperCase().substr(tmpAmt.length - 1);
        tmpAmt = tmpAmt.substr(0, tmpAmt.length - 1);
    }
    if (tmpAmt.substr(0, 1) == negativeSymbol) {
        this.negativeNum = true;
        tmpAmt = tmpAmt.substr(1);
    }
    tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");

    if (digitGroupingSymbol.charCodeAt(0) == 160) {
        digitGroupingSymbol = digitGroupingSymbol.replace(String.fromCharCode(digitGroupingSymbol.charCodeAt(0)), " ");
        tmpAmt = replaceAllChar(tmpAmt, digitGroupingSymbol, "");
    }
	//Fix for Bug 18181037 starts     
    if (tmpAmt.indexOf('E') != -1) {
        tmpAmt = tmpAmt*1 + "";
    }
    //Fix for Bug 18181037 ends 
    arrAmtComponents = tmpAmt.split(decimalSymbol);

    if (arrAmtComponents.length == 1) {
        arrAmtComponents[1] = "0000000000000000000000000000000000000000000000000000";
    } else {
        arrAmtComponents[1] += "0000000000000000000000000000000000000000000000000000";
    }
    var leftShift = 0;
    if (amountSpecifier == cThousandSpecifier) {
        arrAmtComponents[0] += arrAmtComponents[1].substr(0, 3);
        arrAmtComponents[1] = arrAmtComponents[1].substr(3);

    } else if (amountSpecifier == cMillionSpecifier) {
        arrAmtComponents[0] += arrAmtComponents[1].substr(0, 6);
        arrAmtComponents[1] = arrAmtComponents[1].substr(6);
    } else if (amountSpecifier == cBillionSpecifier) {
        arrAmtComponents[0] += arrAmtComponents[1].substr(0, 9);
        arrAmtComponents[1] = arrAmtComponents[1].substr(9);
    }

    if (arrAmtComponents[0].length == 0) {
        arrAmtComponents[0] = "0";
    }
    while (arrAmtComponents[0].length > 1) {
        if (arrAmtComponents[0].substr(0, 1) == "0") {
            arrAmtComponents[0] = arrAmtComponents[0].substr(1);
        } else {
            break;
        }
    }
    this.amt = arrAmtComponents.join(decimalSymbol);
    this.ccy = ccy;
}

getFmtdAmt.prototype.getInputAmount = getInputAmount;

function changeExistingTD() {
    var changedHTML = "";
    var rows = document.getElementById("TBL_QryRslts").tBodies[0].rows;
	var Headerelem = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].cells; //Static Header change
	var fldname = "";
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[0].cells.length-1; j++) {//static header change
            if (j == 0) continue;
			fldname = Headerelem[j].getAttribute("name");
            rows[i].cells[j].innerHTML = "<div><a href='#;return false' class='Astd' alt=" + fldname + ">&nbsp;</a></div>";//Static Header change
        }
    }
    changedHTML = document.getElementById("TBL_QryRslts").getElementsByTagName("TBODY")[0].innerHTML;
    return changedHTML;
}

//static header change
function changeExistingFrzTD() {
    var changedHTML = "";
    var rows = document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows;
	var Headerelem = document.getElementById("TBL_QryRsltsHeaderFreeze").tBodies[0].rows[0].cells; //Static Header change
	var fldname = "";
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[0].cells.length-1; j++) {//static header change
            if (j == 0) continue;
			fldname = Headerelem[j].getAttribute("name");
            rows[i].cells[j].innerHTML = "<div><a href='#;return false' class='Astd' alt=" + fldname + ">&nbsp;</a></div>";//Static Header change
        }
    }
    changedHTML = document.getElementById("TBL_QryRsltsFreeze").getElementsByTagName("TBODY")[0].innerHTML;
    return changedHTML;
}

function fnRefreshSummary(e) {
inDate = setActionTime();
	if (!fnPreRefreshSummaryMain()) return false; //Added for 17211829
    fcjRequestDOM = loadXMLDoc(getXMLString(LastQryDOM));
    gAction = "EXECUTEQUERY";
    fnPreQueryChange(e);
    debugs(getXMLString(fcjRequestDOM), "P");
    if (!fnSubmitQuery()) {
        debugs("CALLING fnResetQry");
        fnResetQry(e);
    }
    fnPostQueryChange();
    document.getElementById("Search").disabled = true;
    document.getElementById("Search").style.display = "none";
    document.getElementsByName("Records")[0].readonly = true;//REDWOOD_CHANGES
    document.getElementById("BTN_EXIT").focus();
    //fnpostActionSummary('REFRESH');
	if (!fnPostRefreshSummaryMain()) return false; //Added for 17211829
	/*9NT1606_12_2_RETRO_12_0_1_23652699 Starts*/
	if (mainWin.applicationName == "FCIS"){
		if (!fnEventsHandler('fnPostExecuteQuery_sum')) return false;
	}
	/*9NT1606_12_2_RETRO_12_0_1_23652699 Ends*/
}

//Fix for 27029198 start
function buildAdditionalTR(l_TRString, avalRows, l_recPerPage, e) {
    var TDElem = document.getElementById("TBL_QryRslts").tBodies[0].rows[0].cells;
    var Headerelem = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].cells; //Static Header change
    var fldname = "";
    var fldType = "TEXT";

    for (var jj = avalRows; jj < l_recPerPage; jj++) {
        if (jj % 2 == 0) {
            l_TRString = l_TRString + "<TR  class='TBLoneTR'  onblur=\"fnResetClass(" + jj + ")\" onmouseover=\"fnHighlightRow(" + jj + ")\" onfocus=\"fnHighlightRow(" + jj + ")\" onmouseout=\"fnResetClass(" + jj + ")\" onDblclick=\"fnShowDetail(" + jj + ")\" ontouchstart=\"fnShowDetailDevice(" + jj + ",event)\" onClick=\"fnSelCheckBox(event, " + jj + ")\" onkeydown=\"return fnHandleSumRslt("+jj+", event)\" oncontextmenu='fnShowContextMenu(event)'>";//HTML5 Changes
        } else {
            l_TRString = l_TRString + "<TR class='TBLoneTRalt' onblur=\"fnResetClass(" + jj + ")\" onmouseover=\"fnHighlightRow(" + jj + ")\" onfocus=\"fnHighlightRow(" + jj + ")\" onmouseout=\"fnResetClass(" + jj + ")\" onDblclick=\"fnShowDetail(" + jj + ")\" ontouchstart=\"fnShowDetailDevice(" + jj + ",event)\" onClick=\"fnSelCheckBox(event, " + jj + ")\" onkeydown=\"return fnHandleSumRslt("+jj+", event)\" oncontextmenu='fnShowContextMenu(event)'>";//HTML5 Changes
        }
        for (var i = 0; i < TDElem.length; i++) {
            if (TDElem[i].name != undefined) {
                var TDElemName = TDElem[i].name;
            } else {
                var TDElemName = TDElem[i].getAttribute("name");
            }
            if (TDElem[i].type != undefined) {
                fldType = TDElem[i].type;
            } else {
                fldType = TDElem[i].getAttribute("type");
            }
            if (fldType == undefined) {
                fldType = "TEXT";
            }
            if (i == 0) l_TRString = l_TRString + "<TD class='TBLoneTD1' scope='row'><div><label class='LBLChkRadSel NewChkbox' for='RSLT_CHKBOX"+jj+"'><span class='LBLinv'>" + mainWin.getItemDesc("LBL_SELECT_ROW") + jj + "</span><INPUT type='checkbox' name='RSLT_CHKBOX' onclick='fnToggleChkBox(this,"+ jj + ")' tabindex ='-1' disabled='true' title='"+ mainWin.getItemDesc("LBL_SELECT_ROW") + jj+"' id='RSLT_CHKBOX"+jj+"'/><div class='DIVChkRadSel'><span></span></div></label></div></TD>";//Static Header change, Fix for 21300673, HTML5 changes 24/OCT/2016
            else {
                fldname = Headerelem[i].getAttribute("name");  
                if (TDElem[i].className == "numeric") {
                    l_TRString = l_TRString + "<TD class = 'numeric' name=" + TDElemName + " type="+fldType+" onkeydown=\"fnShowDetail_key("+jj+",event)\"><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">&nbsp;</a></TD>";
                } else {
                    l_TRString = l_TRString + "<TD name=" + TDElemName + " type="+fldType+" onkeydown=\"fnShowDetail_key("+jj+",event)\"";
                    if (fldType.toUpperCase() == "HIDDEN") {
                        l_TRString = l_TRString + "class='TDnone'>";
                    }
                    l_TRString = l_TRString + "<div><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">&nbsp;</a></div></TD>";//Static Header change
                }
            }
        }
        l_TRString = l_TRString + "</TR>";
    }
    return l_TRString;
}

//static header change
function buildAdditionalTRFreeze(l_TRString, avalRows, l_recPerPage, e) {
    var TDElem = document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[0].cells;
    var Headerelem = document.getElementById("TBL_QryRsltsHeaderFreeze").tBodies[0].rows[0].cells; //Static Header change
    var fldname = "";
    var fldType = "TEXT";

    for (var jj = avalRows; jj < l_recPerPage; jj++) {
        if (jj % 2 == 0) {
            l_TRString = l_TRString + "<TR  class='TBLoneTR'  onblur=\"fnResetClass(" + jj + ")\" onmouseover=\"fnHighlightRow(" + jj + ")\" onfocus=\"fnHighlightRow(" + jj + ")\" onmouseout=\"fnResetClass(" + jj + ")\" onDblclick=\"fnShowDetail(" + jj + ")\" ontouchstart=\"fnShowDetailDevice(" + jj + ",event)\" onClick=\"fnSelCheckBox(event, " + jj + ")\" oncontextmenu='fnShowContextMenu(event)'>";//HTML5 Changes
        } else {
            l_TRString = l_TRString + "<TR class='TBLoneTRalt' onblur=\"fnResetClass(" + jj + ")\" onmouseover=\"fnHighlightRow(" + jj + ")\" onfocus=\"fnHighlightRow(" + jj + ")\" onmouseout=\"fnResetClass(" + jj + ")\" onDblclick=\"fnShowDetail(" + jj + ")\" ontouchstart=\"fnShowDetailDevice(" + jj + ",event)\" onClick=\"fnSelCheckBox(event, " + jj + ")\" oncontextmenu='fnShowContextMenu(event)'>";//HTML5 Changes
        }
        for (var i = 0; i < TDElem.length; i++) {
            if (TDElem[i].name != undefined) {
                var TDElemName = TDElem[i].name;
            } else {
                var TDElemName = TDElem[i].getAttribute("name");
            }
            if (TDElem[i].type != undefined) {
                fldType = TDElem[i].type;
            } else {
                fldType = TDElem[i].getAttribute("type");
            }
            if (fldType == undefined) {
                fldType = "TEXT";
            }
            if (i == 0) l_TRString = l_TRString + "<TD class='TBLoneTD1' scope='row'><div><label class='LBLauto' for='RSLT_CHKBOXFrz"+jj+"'><span class='LBLinv'>" + mainWin.getItemDesc("LBL_SELECT_ROW") + jj + "</span><INPUT class='CHKstd' type='checkbox' name='RSLT_CHKBOXFrz' onclick='fnToggleChkBox(this,"+ jj + ")' tabindex ='-1' disabled='true'title='"+ mainWin.getItemDesc("LBL_SELECT_ROW") + jj+"' id='RSLT_CHKBOXFrz"+jj+"'/></label></div></TD>";//Static Header change//Fix for 21300673
            else {
                fldname = Headerelem[i].getAttribute("name");  
                if (TDElem[i].className == "numeric") {
                    l_TRString = l_TRString + "<TD class = 'numeric' name=" + TDElemName + " type="+fldType+"><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">&nbsp;</a></TD>";
                } else {
                    l_TRString = l_TRString + "<TD name=" + TDElemName + " type="+fldType+"";
                    if (fldType.toUpperCase() == "HIDDEN") {
                        l_TRString = l_TRString + "class='TDnone'>";
                    }
                    l_TRString = l_TRString + "<div><a href='#;return false' class='Astd' tabindex ='-1' alt=" + fldname + ">&nbsp;</a></div></TD>";//Static Header change
                }
            }
        }
        l_TRString = l_TRString + "</TR>";
    }
    return l_TRString;
}
//Fix for 27029198 end

function fnSetImage(check, e) {
    var event1 = window.event || e;
    var elem = getEventSourceElement(event1);
    if (check) {
        //var elem = event.srcElement;
        if (elem.tagName.toUpperCase() == "SPAN") elem = elem.parentNode;
        var imgClass = "";
        if (elem.getAttribute("order") == "ASC") {
            imgClass = "SPNup";
            elem.setAttribute("order", "DESC");
        } else {
            imgClass = "SPNdown";
            elem.setAttribute("order", "ASC");
        }
        elem.getElementsByTagName("span")[0].className = imgClass;
    } else {		  
//REDWOOD_CHANGES
//        var imgLen = document.getElementById("TBL_QryRsltsHeader").tBodies[0].rows[0].getElementsByTagName("span");//static header change   //OJET Migration
//        if (imgLen.length > 0) {
//            for (var i = 1; i < imgLen.length; i++) {
//                imgLen[i].className = "SPNup hide";
//            }
//        }	
//REDWOOD_CHANGES
    }
}


function fndisableNavBtns() {
    document.getElementsByName("Records")[0].readonly = false;	 //REDWOOD_CHANGES
    document.getElementsByName("navFirst")[0].disabled = true;
   // fnRemoveHover(document.getElementsByName("navFirst")[0]);  //Fix for disable  //REDWOOD_CHANGES
    document.getElementsByName("navPrev")[0].disabled = true;
   // fnRemoveHover(document.getElementsByName("navPrev")[0])   //Fix for disable	//REDWOOD_CHANGES
    document.getElementsByName("navLast")[0].disabled = true;
   // fnRemoveHover(document.getElementsByName("navLast")[0]);  //Fix for disable	//REDWOOD_CHANGES
    document.getElementsByName("navNext")[0].disabled = true;					  
//REDWOOD_CHANGES
   // fnRemoveHover(document.getElementsByName("navNext")[0]);  //Fix for disable 
    document.getElementById("goto").readonly = true;
    //fnRemoveHover( document.getElementsByName("go")[0]);      //Fix for disable
    //document.getElementsByName("gotopage")[0].readOnly = true
    

//    document.getElementsByName("navFirst")[0].className = "BTNimgD";
//    document.getElementsByName("navPrev")[0].className = "BTNimgD";
//    document.getElementsByName("navNext")[0].className = "BTNimgD";
//    document.getElementsByName("navLast")[0].className = "BTNimgD";  
//REDWOOD_CHANGES
     
}

function fnEnableNavBtns() {
    document.getElementsByName("navFirst")[0].disabled = false;
    document.getElementsByName("navPrev")[0].disabled = false;
    document.getElementsByName("navLast")[0].disabled = false;
    document.getElementsByName("navNext")[0].disabled = false;	 
//REDWOOD_CHANGES
    document.getElementById("goto").readonly = false;
    document.getElementsByName("Records")[0].readonly = false;
    //document.getElementsByName("gotopage")[0].disabled = false;

//    document.getElementsByName("navFirst")[0].className = "BTNimg";
//    document.getElementsByName("navPrev")[0].className = "BTNimg";
//    document.getElementsByName("navNext")[0].className = "BTNimg";
//    document.getElementsByName("navLast")[0].className = "BTNimg"; 
//REDWOOD_CHANGES

}
/*Fix for 21362149 start*/
function fnToggleChkBox(obj, rowIndex) {
setTimeout(function (){
fnToggleChkBox1(obj, rowIndex);
}, 0);    
}
/*Fix for 21362149 end*/
function fnToggleChkBox1(obj, rowIndex) {
	//Fix for 21300673 start
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
    }//Fix for 21300673 end
}

function fnCheckUncheckAll() {
    var l_ChBoxs = document.getElementsByName("RSLT_CHKBOX");
    var l_ChBoxsFreeze = document.getElementsByName("RSLT_CHKBOXFrz");//Fix for 21300673
    var l_ChkStatus = document.getElementById("RSLT_CHKBOX").checked;
    if (document.getElementsByName("Locks")[0].value != "0")
        l_ChkStatus = document.getElementById("RSLT_CHKBOXFreeze").checked;
    for (var l_Cnt = 0; l_Cnt < l_ChBoxs.length; l_Cnt++) {
        l_ChBoxs[l_Cnt].checked = l_ChkStatus;
		/*Fix for 20392960 starts*/	
		if(l_ChBoxs[l_Cnt].disabled) 
			l_ChBoxs[l_Cnt].checked = false;  
			/*Fix for 20392960 ends*/	
    }
    //Fix for 21300673 start
    for (var l_Cnt = 0; l_Cnt < l_ChBoxsFreeze.length; l_Cnt++) {
        l_ChBoxsFreeze[l_Cnt].checked = l_ChkStatus;
		/*Fix for 20392960 starts*/	
		if(l_ChBoxsFreeze[l_Cnt].disabled) 
			l_ChBoxsFreeze[l_Cnt].checked = false;  
			/*Fix for 20392960 ends*/	
    }//Fix for 21300673 end
}

function fnSelCheckBox(e, v_rowid) { 
//REDWOOD_CHANGES
    var tblQueryRslts = getTableObjForBlock("TBL_QryRslts");
    var tblQryRsltsFreeze = getTableObjForBlock("TBL_QryRsltsFreeze");
    var rowList = tblQueryRslts.tBodies[0].rows;  
//REDWOOD_CHANGES
    var event1 = window.event || e;
    var scrElem = getEventSourceElement(event1);
    if (typeof (scrElem) != "undefined" && typeof (scrElem.type) != "undefined" && scrElem.type.toUpperCase() != "CHECKBOX") {
        for (var rowIndex = 0; rowIndex < rowList.length; rowIndex++) {
            if (tblQueryRslts.tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked) tblQueryRslts.tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = false; //REDWOOD_CHANGES
            if (tblQryRsltsFreeze.tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked) tblQryRsltsFreeze.tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = false;//static header changes //REDWOOD_CHANGES
        }
        if (typeof (v_rowid) != "undefined") {
        tblQueryRslts.tBodies[0].rows[v_rowid].cells[0].getElementsByTagName("INPUT")[0].checked = true; //REDWOOD_CHANGES
        tblQryRsltsFreeze.tBodies[0].rows[v_rowid].cells[0].getElementsByTagName("INPUT")[0].checked = true;//static header change //REDWOOD_CHANGES
        
        }
    }
}

/* THIS METHOD WILL DISPLY THE CONTEXT MENU ON RIGHT CLICK, IN THE SUMMARY SCREEN */
function fnShowContextMenu(e) {
    var tmpContextMenuObject = document.getElementById("SUM_CUST_BTNS");
    if (document.getElementById("CONTEXT_MENU")) {
        e = window.event || e;
        /* TO MANIPULATE THE X ADN Y POSITION AND DISPLAY THE CONTEXT MENU */
        fnDispContextMenuBlock(e);
    } else if (tmpContextMenuObject) {
        var div = document.createElement("DIV");
        div.setAttribute("id", "CONTEXT_MENU");
        /* TO BUILD THE HTML FOR THE CONTEXT MENU */
        div.appendChild(fnBuildContextMenuHTML(tmpContextMenuObject));
        e = window.event || e;
        var xPos = e.clientX;
        var yPos = e.clientY;
        div.style.position = 'absolute';
        div.style.left = xPos + "px";
        div.style.top = yPos + "px";
        document.body.appendChild(div);
        document.documentElement.onclick = fnHideContextMenu;
        fnDispContextMenuBlock(e);
    } else {
        return false;
    }
}

/* THIS METHOD WILL BUILD THE UL TAG AND WILL RETURN THE SAME */
function fnBuildContextMenuHTML(tmpContextMenuObject) {
    var ul = document.createElement("UL");
    var contextMenuLength = tmpContextMenuObject.getElementsByTagName("LI").length;
    for (var i = 0; i < contextMenuLength; i++) {
        var liObject = tmpContextMenuObject.childNodes[0].childNodes[i];
        var li = document.createElement("LI");
        var a = document.createElement("A");
        var attributeValue;
        for (var attIndex = 0; attIndex < liObject.childNodes[0].attributes.length; attIndex++) {
            if (liObject.childNodes[0].attributes[attIndex].nodeName.toUpperCase() == 'ONCLICK') {
                attributeValue = liObject.childNodes[0].attributes[attIndex].nodeValue;
                attributeValue = "fnHideContextMenu();" + attributeValue;
                break;
            }
        }
        a.setAttribute("href", "#");
        a.onmouseover = function () {
            this.className = 'contextMenuHighlighted';
        }
        a.onmouseout = function () {
            this.className = '';
        }
        a.onclick = new Function(attributeValue);
        var span = document.createElement("SPAN");
        var label = document.createTextNode(getInnerText(liObject.childNodes[0].childNodes[0]));
        span.appendChild(label);
        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);
    }
    return ul;
}

/* THIS METHOD WILL CHECK THE CURRENT POSITION OF THE CONTEXT MENU 
AND WILL MANIPULTE IT'S POSITION IF IT IS GOING OUT OF THE SCREEN*/
function fnDispContextMenuBlock(e) {

    var xPos = e.clientX;
    var yPos = e.clientY;
    document.getElementById("CONTEXT_MENU").style.left = xPos + "px";
    document.getElementById("CONTEXT_MENU").style.top = yPos + "px";
    if (document.getElementById("CONTEXT_MENU").offsetWidth == 0) {
        var xPadding = 200;
    } else {
        var xPadding = 30;
    }
    if (document.getElementById("CONTEXT_MENU").offsetHeight == 0) {
        var yPadding = 200;
    } else {
        var yPadding = 30;
    }
    if (xPos + document.getElementById("CONTEXT_MENU").offsetWidth > (document.documentElement.offsetWidth - xPadding)) {
        xPos = xPos + (document.documentElement.offsetWidth - (xPos + document.getElementById("CONTEXT_MENU").offsetWidth)) - xPadding;
    }
    if (yPos + document.getElementById("CONTEXT_MENU").offsetHeight > (document.documentElement.offsetHeight - yPadding)) {
        yPos = yPos + (document.documentElement.offsetHeight - (yPos + document.getElementById("CONTEXT_MENU").offsetHeight)) - yPadding;
    }
    document.getElementById("CONTEXT_MENU").style.left = xPos + "px";
    document.getElementById("CONTEXT_MENU").style.top = yPos + "px";
    document.getElementById("CONTEXT_MENU").style.display = 'block';

}

/* THIS METHOD WILL HIDE THE CONTEXT MENU BLOCK WHEN THE ONCLICK EVENT IS FIRED */
function fnHideContextMenu(e) {
    if (document.getElementById("CONTEXT_MENU")) {
        document.getElementById("CONTEXT_MENU").style.display = 'none';
    }
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
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;//document.getElementById("TBL_QryRslts").tBodies[0].rows; //REDWOOD_CHANGES
    var chkd = false;
    for (var j = 0; j < sumTblObj.length; j++) {
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('input')[0].checked;
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
    var rsltTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows; //REDWOOD_CHANGES
    len = rsltTblObj.length; //REDWOOD_CHANGES
    var count = 1;
    for (var i = 0; i < len; i++) {

        if (rsltTblObj[i].cells[0].getElementsByTagName("INPUT")[0]) { //REDWOOD_CHANGES
            if (rsltTblObj[i].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES

                var tabObj = rsltTblObj[i];	//REDWOOD_CHANGES
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

    var thObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[0].cells;//static header change //REDWOOD_CHANGES
    for (var l = 0; l < pkFieldCellNo.length; l++) {
        var val = getInnerText(tabObj.cells[pkFieldCellNo[l] + 1]);
		if (thObj[pkFieldCellNo[l] + 1].getAttribute("TYPE") == "SELECT" || thObj[pkFieldCellNo[l] + 1].getAttribute("TYPE") == "RADIO") {//Bug 18060503 Changes
           if (tabObj.cells[pkFieldCellNo[l] + 1].children[0]){ 		     
			 val =tabObj.cells[pkFieldCellNo[l] + 1].children[0].value; //Bug_36099490
		   }
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
            //9NT1606_14_1_RETRO_12_1_28114089 Starts
            //val = getInnerText(tabObj.cells[pkFieldCellNo[l] + 1]);
			val = tabObj.cells[pkFieldCellNo[l] + 1].textContent;
			//9NT1606_14_1_RETRO_12_1_28114089 Ends
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
                if (pkFields[l].split("__")[1] == fields[k]) {
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
		//Fix for 34273105 - If field name list exceeds 4000, change done to split & send tilda seperated list.
        if(fldlist.length > 4000){
            var tmpArray = fldlist.split("!");
            var midPostion = fldlist.split("!", tmpArray.length/2).join("!").length;        
            fldlist = fldlist.substring(0,midPostion) + "~" +fldlist.substring(midPostion);
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
		//Fix for 34273105 - If field name list exceeds 4000, change done to split & send tilda seperated list.
        if(fldlist.length > 4000){
            var tmpArray = fldlist.split("!");
            var midPostion = fldlist.split("!", tmpArray.length/2).join("!").length;        
            fldlist = fldlist.substring(0,midPostion) + "~" +fldlist.substring(midPostion);
        }
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
    reqDom = loadXMLDoc(msgxml_xlupd);

    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection(detailFuncId + "~" + "" + "~" + mainWin.UserId + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~");
    selectSingleNode(selectSingleNode(reqDom, "//REC[@RECID='1'][@TYPE='BLK_XLUPLDMSTR']"), "FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom, "//FCUBS_BODY");

}

function fnDownloadExcel() {
    try {
        var fileInputField = document.getElementById("ResTree");
        var parent = fileInputField.parentNode;
        var iFrameBody = "";
        iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>';
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
        //iFrameBody += "<FORM id='fileUploadForm' method='post' action=FCReportHandleRequest?fileName="+fileUrl1+"&TYPE=DOWNLOAD enctype='multipart/form-data'>";
        iFrameBody += "<FORM id='fileUploadForm' method='post' action=ExcelDownload?FUNCTIONID=" + functionId + "&actionType=DOWNLOAD";
        iFrameBody += " enctype='multipart/form-data'>";
        iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />";
        iFrameBody += "</FORM></body></html>"; 

        var iFrameHeight = fileInputField.offsetHeight;
        var iFrameWidth = fileInputField.offsetWidth;

        var requestIFrame = createRequestIFrameExcel(iFrameHeight + 5, iFrameWidth + 50); //9NT1606_12_2_RETRO_12_1_23664350 changes
        parent.appendChild(requestIFrame);
        var iRequestFrameID = 'RequestFrame';
        if (self.frames[iRequestFrameID].name != iRequestFrameID) {
            /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
            self.frames[iRequestFrameID].name = iRequestFrameID;
        }
        document.getElementById('RequestFrame').contentWindow.document.open();
        document.getElementById('RequestFrame').contentWindow.document.write(iFrameBody);
        document.getElementById('RequestFrame').contentWindow.document.close();
          //var responseIFrame = createResponseIFrame();//name conflict with DMSUtility
		var responseIFrame = createResponseIFrameExtGloSum();
        parent.appendChild(responseIFrame);
        var iResponseFrameID = 'ResponseFrame';
        if (self.frames[iResponseFrameID].name != iResponseFrameID) {
            /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
            self.frames[iResponseFrameID].name = iResponseFrameID;
        }
        var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
        iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
        iFrameFormDocument.getElementById("fileUploadForm").submit();
    } catch (e) {
        // do Nothing
    }
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

//function createResponseIFrame() {//name conflict with DMSUtility
	function createResponseIFrameExtGloSum(){
    var responseFrameContainer = document.createElement('div');
    responseFrameContainer.setAttribute('id', 'responseContainer');
    var iFrameID = 'ResponseFrame';
    var iFrameBody = '<iframe id=\"' + iFrameID + '\"' + ' name=\"' + iFrameID + '\"' + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
    responseFrameContainer.innerHTML = iFrameBody;
    return responseFrameContainer;
}
// Excel Export Code Ends
// Old Format Excel Export Code 
function executeExcel(resDom) {

    //reqDom = createDOMActiveXObject();
    // msgxmlDom = createDOMActiveXObject();
    try {
        reqDom = resDom;
        var blkMstrDt = getNodeText(selectSingleNode(reqDom, "//FCUBS_BODY/REC[@TYPE='BLK_XLUPLDMSTR']/FV"));
        var funcId = blkMstrDt.split("~")[0];
        var Excel = new ActiveXObject("Excel.Application");
        var shtNo = 3;
        var blkDtlsDt = "";
        var blkFldsLst = "";
        var blkFldsLstDesc = "";
        msgxmlDom = loadXMLDoc(msgxml);
        var wBook = Excel.Workbooks.Add();
        var wSheet;
        var noOfShts = 1 + selectNodes(reqDom, "//REC/REC[@TYPE='BLK_XLUPLDBLKDTLS']").length;
        for (var wSht = 1; wSht < noOfShts; wSht++) {
            try {
                wSheet = wBook.Worksheets(wSht + 2);
            } catch (e) {
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

        for (var bDt = 1; bDt <= selectNodes(reqDom, "//REC/REC[@TYPE='BLK_XLUPLDBLKDTLS']").length; bDt++) {
            blkDtlsDt = getNodeText(selectSingleNode(selectNodes(reqDom, "//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(bDt - 1), "FV"));
            blkDtlsDt = blkDtlsDt.split("~");

            wBook.Worksheets(shtNo).Cells(1, 1).value = blkDtlsDt[1];
            wBook.Worksheets(shtNo).Cells(1, 1).font.bold = true;
            wBook.Worksheets(shtNo).Cells(1, 1).style = "OutPut";
            wBook.Worksheets(shtNo).Cells(1, 1).EntireColumn.AutoFit;
            wBook.Worksheets(shtNo).name = blkDtlsDt[21]; //initCap(replaceAll(blkDtlsDt[1].substring(4), "_", " "));
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
                var blkDtls = getNodeText(selectSingleNode(selectNodes(reqDom, "//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3), "FV"));
                blkDtls = blkDtls.split("~");
                dtlsNdLen = selectNodes(selectNodes(reqDom, "//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3), "REC[@TYPE='BLK_XLUPLDBLKDATA']").length;
                if (dtlsNdLen == 0) {
                    //Application.DisplayAlerts = False;
                    Excel.Worksheets(wNo).Delete;
                    //Application.DisplayAlerts = True;
                } else {
                    for (var dtLn = 1; dtLn <= dtlsNdLen; dtLn++) {
                        blkData = getNodeText(selectSingleNode(selectNodes(selectNodes(reqDom, "//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3), "REC[@TYPE='BLK_XLUPLDBLKDATA']")[dtLn - 1], "FV"));
                        // blkData=reqDom.selectNodes("//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo-4).selectNodes("REC[@TYPE='BLK_XLUPLDBLKDATA']")[0].selectSingleNode("FV").text;
                        blkData = blkData.split("~");
                        wrkSht.Cells(1, 1) = blkData[1];

                        //actData = blkData[5].split("!");
                        actData = blkData[5].split("!");
                        var flgNullField = true;
                        for (var clDt = 0; clDt < actData.length; clDt++) {
                            if (wrkSht.cells(3, clDt + 4).value != undefined) wrkSht.cells(dtLn + 3, clDt + 4).value = "'" + actData[clDt];
                            if (actData[clDt] != "") flgNullField = false;
                        }
                        if (!flgNullField) {
                            wrkSht.Cells(dtLn + 3, 1).Value = blkData[2];
                            wrkSht.Cells(dtLn + 3, 2).Value = blkData[3];
                            wrkSht.Cells(dtLn + 3, 3).Value = blkData[4];
                        }
                    }
                }
            } else {
                dtlsNdLen = selectNodes(selectNodes(reqDom, "//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3), "REC[@TYPE='BLK_XLUPLDBLKDATA']").length;
                for (var dtLn = 1; dtLn <= dtlsNdLen; dtLn++) {
                    blkData = getNodeText(selectSingleNode(selectNodes(selectNodes(resDom, "//REC[@TYPE='BLK_XLUPLDBLKDTLS']")(wNo - 3), "REC[@TYPE='BLK_XLUPLDBLKDATA']")[dtLn - 1], "FV"));
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
    } catch (e) {
        Excel.displayAlerts = false;
        Excel.Workbooks.close();
        Excel.Application.Quit();
        //* FC 11.4 NLS Changes */
        //alert('Export Failed');
        showErrorAlerts('IN-HEAR-501');
    }
    //wrkSht.SaveAs("D:\\" + filename);
    //Excel.Workbooks.close();
    //Excel.Application.Quit();
    //alert(filename+" saved to path D:\\");
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

function fnBuildDataDictionary(resDom, wBook) {
    var DictionaryFlds = selectNodes(resDom, "//REC[@TYPE='BLK_XLUPLDDICTIONARY']");
    for (var i = 0; i < DictionaryFlds.length; i++) {
        var DictionaryDetails = getNodeText(selectSingleNode(DictionaryFlds[i], "FV")).split("~");
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
//12.1 summary performance changes new start
//REDWOOD_CHANGES
function findImmediateOJParentElement(parent) {
    if (!parent) {
        return;
    }
    if (parent.tagName.startsWith('OJ')) {
        return parent;

    } else {
        return findImmediateOJParentElement(parent.parentElement);
    }
}
//REDWOOD_CHANGES
function validateCriteria(){
    var objBody = document.getElementById("TblRcmndedQuery");
    var objInput = objBody.getElementsByTagName("INPUT");
    var objSelect = objBody.getElementsByTagName("SELECT");
    var txtInput;var txtSelect;   
    var count=0;
    var status = false;
    var alertMsg = "";
   
    for (var i = 0; i < objInput.length; i++){ 
        txtInput = findImmediateOJParentElement(objInput[i].parentElement); //REDWOOD_CHANGES
        
        if(txtInput&&txtInput.value&&txtInput.value!=""  && txtInput.getAttribute("DBC") != null){ //REDWOOD_CHANGES
        var inputVal = txtInput.value.replace (/%/g, "");
       // if(txtInput.value!="" && txtInput.getAttribute("DBC") != null ){ //REDWOOD_CHANGES
            if(inputVal.length >=parseInt(txtInput.getAttribute("MIN_CHAR") )){
                status =true;
                break;
            }else{
                count++; 
            }
        }
    }
    for (var l = 0; l < objSelect.length; l++){ 
        txtSelect = objSelect[l];   
        if(txtSelect.getAttribute("DBC") != null && txtSelect.value != ""){
            if(txtSelect.value.length >=parseInt(txtSelect.getAttribute("MIN_CHAR"))){
                status =true;
                break;
            }else{
                count++; 
            }
        }
    } 
    if(count >= 0 ) {
       alertMsg = mainWin.getItemDesc("LBL_INFO_BLIND_SRCH_DISABLED");
    }
     if(status == false){
        mask(); 
        var alertXML = fnBuildAlertXML('', 'I', alertMsg);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        alertAction = "UNMASK"; 
     }
     return status;

}
//12.1 summary performance changes new end
//static header change
function fnResetClass(rowIndex){	  
//REDWOOD_CHANGES
//  if(rowIndex % 2 ==0){
//    document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].className = 'TBLoneTR';
//    document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].className = 'TBLoneTR';
//  }else{
//    document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].className = 'TBLoneTRalt';
//    document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].className = 'TBLoneTRalt';
//  }	
//REDWOOD_CHANGES
}

function fnHighlightRow(rowIndex){	
//REDWOOD_CHANGES
//    document.getElementById("TBL_QryRsltsFreeze").tBodies[0].rows[rowIndex].className = 'TBLoneTRhover';
//    document.getElementById("TBL_QryRslts").tBodies[0].rows[rowIndex].className = 'TBLoneTRhover';
//REDWOOD_CHANGES
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
              dbnetTime=parseFloat(dbnetTime) ;
              serverTime=parseFloat(serverTime) ;
       var dbTime=parseFloat(l_TimeLogvalue.split("~")[4]); 
       var dbSesId=parseFloat(l_TimeLogvalue.split("~")[5]);
       // servletstarttime ~ endtime ~  
        var t = getDateObject();
        var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds(); 
        var jstime=parseFloat(parseFloat(posttime)-parseFloat(inTime)) ;
            jstime=jstime+parseFloat(parseFloat(time)-parseFloat(afterposttime));
            jstime=Math.round(jstime*100)/100;
        startTime = inDate.getFullYear()+'-'+(inDate.getMonth()+1)+'-'+inDate.getDate()+" "+inDate.getHours()+':'+inDate.getMinutes()+':'+inDate.getSeconds();
        endTime = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
        var totaltime=parseFloat(parseFloat(t.getTime())-parseFloat(inDate.getTime()));
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

/* Bug 19609280 - Asynchronous summary export changes */
function fnExportAllToExcel(){  
    var g_prev_gAction = gAction;
    gAction = "RUN_EXPORT_ALL";
    strCurrentTabId = 'idQuery';
    var summaryExportCriteria = getXMLString(buildSummaryQueryXML('Y'));
    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><ENTITY/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM = loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/USERID"), mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"), mainWin.entity);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "CSDXLUPD");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"), "SUBMIT_EXPORT");
    setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"), "CS");

    var bodyReq = fnCreateExcelExportBody();   
    bodyReq = fnGetBlkDetailsForExcelExport(bodyReq);
    var recData = fnGetBlkDetailsForExcelExportData();    
    var node = selectSingleNode(exlRequestDOM, "//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    var exportReqTemplate = getXMLString(exlRequestDOM);
    var exportRequestXML=  '<FCUBS_EXCEL_EXP_REQ><SUMMARY_EXPORT_CRITERIA>' + summaryExportCriteria + '</SUMMARY_EXPORT_CRITERIA><EXPORT_REQ_TEMPLATE>' + exportReqTemplate + '</EXPORT_REQ_TEMPLATE><REC_BLOCK_TEMPLATE>'+ getXMLString(recData)+'</REC_BLOCK_TEMPLATE><EXP_COUNT>'+ expAllCount +'</EXP_COUNT></FCUBS_EXCEL_EXP_REQ>';
    var exportRequestDOM = loadXMLDoc(exportRequestXML);
    fcjResponseDOM = fnPost(exportRequestDOM, servletURL, functionId);
     if (getNodeText(selectSingleNode(fcjResponseDOM, "//RESPONSE/MSGSTAT")) == "SUCCESS") { 
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_EXPORT_ALERT_DESC") + getNodeText(selectSingleNode(fcjResponseDOM, "//RESPONSE/REF_NO"))), "I");
        alertAction = "UNMASK";
        gAction = g_prev_gAction;
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
//REDWOOD_CHANGES
function resetQueryCollapsible(flag){//OJET Migration
    if(document.getElementById('queryCollapsible')){
        document.getElementById('queryCollapsible').setAttribute("expanded",flag); 

     }
} 
//REDWOOD_CHANGES

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
 /* Bug 19609280 - Asynchronous summary export changes */
 //REDWOOD_CHANGES
 function handleSelectedChanged(event){
    if(event.detail.items){
   // selectedFields = event.detail.items[0].parentElement.parentElement.id;
    var operatorDivId  = event.detail.items[0].getAttribute("elmid");
//REDWOOD_35694934 starts
	if(event.target.id=='idRecommendedField')
	{
		selectedFields = operatorDivId + '~' + event.detail.items[0].getAttribute("dtype") + '~' + getInnerText(event.detail.items[0]).split('(',1)[0];
	}
	else{
    selectedFields = operatorDivId + '~' + event.detail.items[0].getAttribute("dtype") + '~' + getInnerText(event.detail.items[0]);
	}
//REDWOOD_35694934 ends
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
    if(parentId=="idRecommendedField"){
//      selectedLiElement=document.getElementById("idSelectField").querySelector(".oj-selected");
      refreshAdvancedSearchOptionalListView();
    }else{
//      selectedLiElement=document.getElementById("idRecommendedField").querySelector(".oj-selected");
      refreshAdvancedSearchRecommendedListView();
    }
    }
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
//REDWOOD_CHANGES