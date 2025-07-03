/*----------------------------------------------------------------------------------------------------
**
** File Name    :ExtensibleMEUtil.js
**
** Module       :FCJNeoWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services  Software Limited.
** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services Software Limited.
** Oracle Financial Services  Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.
Copyright © 2004-2016   by Oracle Financial Services  Software Limited..
----------------------------------------------------------------------------------------------------
Changed By         :  Ketki Khanna 
Description        :  ME view condition change
Search String      :  change to set data in Single View conditionally bug id : 14655036 
Bug Id             :  14655036

**  Modified By          : Neethu Sreedharan
**  Modified On          : 22-Sep-2016
**  Modified Reason      : Fix provided to add the ME child table data on click of Add row of 
                           parent table.  
**  Retro Source         : 9NT1606_12_1_INTERNAL
**  Search String        : 9NT1606_12_2_RETRO_12_1_24444579
			
**  Changed By         :  Karthigadevi.P
**  Description        :  UDE navigate functionality change
**  Search String      :  [FCUBS12.3_ITR1_24956233]
**  Bug Id             :  24956233

  **  Modified By          : Rishabh Gupta
  **  Modified On          : 28-Sept-2016
  **  Modified Reason      : Changes done to get the source element by accessing through document id incase of button elements
  **  Search String        : 12_0_3_RETRO_12_2_23655529
  **  SFR No    		   : 23655529
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 29-Sep-2016
  **  Modified Reason      : In INFRA, for readability, text fields with lengthy values are converted 
                             to text area fields. When User edits the record, the same will converted 
                             back to text field. Issue is when we do operation on same ME block when the 
                             records having  text to text area converted fields and normal fields, the 
                             text area field is not getting converted to text field if subsequent row 
                             having normal field is selected. Changes done to convert the textare field 
                             to text field during row/tab navigation 
  **  Retro Source         : 9NT1606_12_0_3_UNION_BANK_UK_PLC 
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23651649
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 29-Sep-2016
  **  Modified Reason      : INFRA change done to call fnChangeLabelToText() function 
                             only in case of MESV block. 
  **  Retro Source         : 9NT1606_12_0_3_ABU_DHABI_COMMERCIAL_BANK
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_24526781
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 19-Oct-2016
  **  Modified Reason      : Code added to show the appropriate child table entries when user clicks 
                             select all checkbox and navigates back to individual rows.  
  **  Retro Source         : 9NT1606_12_0_3_EMPLOYEES_WELFARE_FUND
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23655942
  
**  Modified By          : Neethu Sreedharan
**  Modified On          : 20-Jun-2017
**  Modified Reason      : when only one record was present in the last page then we were unable to 
                           navigate to the last page from 2nd last page, changes are done to navigate to 
                           the last page. 
**  Retro Source         : 9NT1606_12_1_MKB_BANK_ZRT
**  Search String        : 9NT1606_12_4_RETRO_12_1_26229989

**  Modified By          : Niranjan Prajapati
**  Modified On          : 29-Jun-2017
**  Modified Reason      : MESV fields are editable without even clicking on '+'  
**  Retro Source         : 27658727
**  Search String        : 9NT1606_14_1_RETRO_12_4_28113973
*/
/* ExtensibleME.js functions Start************************/
function fnAddRow(v_MeblockId) { //OJET Migration
    var tableObject = getTableObjForBlock(v_MeblockId);//12.0.3 ME changes
    const busyContext = main_context.getContext(tableObject).getBusyContext();
    busyContext.whenReady().then(function() {
    
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    //appendTableValue(tableObject, 1, v_MeblockId);//12.0.3 ME changes //9NT1606_12_2_RETRO_12_1_24444579 commented
    fnAppendSingleViewData(v_MeblockId);//Fix for 18295559--MESV append changes
    try {
        if(!fnEventsHandler('fnPreAddRow_' + v_MeblockId)) return; //20978006 
    }
    catch (e) {
    }
    appendData();//9NT1606_12_2_RETRO_12_1_24444579 changes
    var pgSize = Number(tableObject.getAttribute("pgsize"));
    var blockIdNode = selectNodes(dbDataDOM, getXPathQuery(v_MeblockId));
    if (blockIdNode.length > 0) {
        var l_LastIndex = blockIdNode.length;
        if (l_LastIndex % pgSize == 0) {
            //clear the table if the l_LastIndex==pageSize
            //deleteAllRows(v_MeblockId);
            dbIndexArray[v_MeblockId] = l_LastIndex + 1;//12.0.3 ME changes
           // fnUpdatePgBtn(v_MeblockId, pgSize, dbIndexArray[v_MeblockId]);//12.0.3 ME changes
        }
        else {
            //12.0.3 ME changes
            dbIndexArray[v_MeblockId] = l_LastIndex + 1;
        }
    }
    else {
        dbIndexArray[v_MeblockId] = 1;
    }

 //   showPageWise(tableObject, v_MeblockId, null, true);//12.0.3 ME changes
    var newRow = addNewRow(v_MeblockId);
 
    //fnUncheckAll(v_MeblockId);
   showDescendants(v_MeblockId);
//    newRow.cells[0].getElementsByTagName("INPUT")[0].checked = true;
  setTimeout(function(){
        appendTableValue(tableObject, 1, v_MeblockId);
        try {
        if(!fnEventsHandler('fnPostAddRow_' + v_MeblockId)) return; //20978006 
    }
    catch (e) {
    }
    },0);
   

    fnAddSingleViewRow(v_MeblockId);
    fnAppendSingleViewData(v_MeblockId);
   // fnCheckToggleChkBox(v_MeblockId);
//    checkAnFocusSelectedRow(v_MeblockId);

    
    });
}

function fnAddRow_Old(v_MeblockId) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var tableObject = getTableObjForBlock(v_MeblockId);//12.0.3 ME changes
    //appendTableValue(tableObject, 1, v_MeblockId);//12.0.3 ME changes //9NT1606_12_2_RETRO_12_1_24444579 commented
    fnAppendSingleViewData(v_MeblockId);//Fix for 18295559--MESV append changes
    try {
        if(!fnEventsHandler('fnPreAddRow_' + v_MeblockId)) return; //20978006 
    }
    catch (e) {
    }
    appendData();//9NT1606_12_2_RETRO_12_1_24444579 changes
    var pgSize = Number(tableObject.getAttribute("pgsize"));
    var blockIdNode = selectNodes(dbDataDOM, getXPathQuery(v_MeblockId));
    if (blockIdNode.length > 0) {
        var l_LastIndex = blockIdNode.length;
        if (l_LastIndex % pgSize == 0) {
            //clear the table if the l_LastIndex==pageSize
            deleteAllRows(v_MeblockId);
            dbIndexArray[v_MeblockId] = l_LastIndex + 1;//12.0.3 ME changes
            fnUpdatePgBtn(v_MeblockId, pgSize, dbIndexArray[v_MeblockId]);//12.0.3 ME changes
        }
        else {
            //12.0.3 ME changes
            dbIndexArray[v_MeblockId] = l_LastIndex + 1;
        }
    }
    else {
        dbIndexArray[v_MeblockId] = 1;
    }

    showPageWise(tableObject, v_MeblockId, null, true);//12.0.3 ME changes
    var newRow = addNewRow(v_MeblockId);
    fnUncheckAll(v_MeblockId);
    showDescendants(v_MeblockId);
    newRow.cells[0].getElementsByTagName("INPUT")[0].checked = true;
    appendTableValue(tableObject, 1, v_MeblockId);

    fnAddSingleViewRow(v_MeblockId);
    fnAppendSingleViewData(v_MeblockId);
    fnCheckToggleChkBox(v_MeblockId);
    checkAnFocusSelectedRow(v_MeblockId);

    try {
        if(!fnEventsHandler('fnPostAddRow_' + v_MeblockId)) return; //20978006 
    }
    catch (e) {
    }
}

//Fix for 18295559--MESV append changes starts
function fnAppendSingleViewData(v_MeblockId) {
    var fldSetElem = document.getElementsByTagName("fieldset");
    for (var fs = 0;fs < fldSetElem.length;fs++) {
        if (fldSetElem[fs].getAttribute("type") == "ME" && fldSetElem[fs].getAttribute("view") == "SE") {
            if (typeof (fldSetElem[fs].getAttribute("block")) != "undefined") {
                var l_curBlock = fldSetElem[fs].getAttribute("block")
                if (fldSetElem[fs].getAttribute("MESVNODE") == "false" && selectNodes(dbDataDOM, getXPathQuery(l_curBlock)).length == 0)
                    continue;
                appendFielsetData(fldSetElem[fs], l_curBlock);
            }
        }
    }
}
//Fix for 18295559--MESV append changes ends
/* ME delete Row*****************/
function fnDeleteRow(v_MeblockId) {
	var tableObject = getTableObjForBlock(v_MeblockId);
    const busyContext = main_context.getContext(tableObject).getBusyContext();
    busyContext.whenReady().then(function() {
    mainWin.fnUpdateScreenSaverInterval();
    deleteChildTableRows(v_MeblockId);
    resetChildIndex(v_MeblockId);
    appendData();
    if (!fnEventsHandler('fnPreDeleteRow_' + v_MeblockId))
        return false;

    appendData();

    fnDeleteRowForMultipleEntry(v_MeblockId);
    fnDeleteSingleViewRow(v_MeblockId);
    fnEventsHandler('fnPostDeleteRow_' + v_MeblockId);
  	//OJET Migration
  	setTimeout(function(){
        appendData();
    },0);


    //fnCheckToggleChkBox(v_MeblockId);   //OJET Migration
    //checkAnFocusSelectedRow(v_MeblockId);
});
}
function handleOjetMEPagination(event, tname) {
 if (arguments.callee.caller && arguments.callee.caller.caller && arguments.callee.caller.caller.toString()) {
        if (arguments.callee.caller.caller.toString().indexOf("fnDeleteRowForMultipleEntry") >0) {
            return true;
        }
}

    var position;
    var l_gotoVal = 0;
    var srcElem = event.srcElement;
    // if span - all cases
        //if inner text is a no. --> goto case
        //else next prev case --> parent node -->a srcElem = srcElem.parentNode
    if (srcElem.tagName.toUpperCase() == 'SPAN') {
        var spanVal = getInnerText(srcElem);
        if(isNaN(spanVal) ){
            srcElem = srcElem.parentNode;
        }else {
            position = N_GOTO;
            l_gotoVal = Number(spanVal);
        }
    }
    if (srcElem.tagName.toUpperCase() == 'A') {
        if (srcElem.getAttribute("data-oj-pagenum") != null) {
            position = N_GOTO;
            l_gotoVal = Number(srcElem.getAttribute("data-oj-pagenum")) + 1;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-last')) {
            position = N_LAST;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-next')) {
            position = N_NEXT;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-previous')) {
            position = N_PREVIOUS;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-first')) {
            position = N_FIRST;
        }
    }
    Navigate(position, tname.id, l_gotoVal);
}
/* ME Navigation buttons*****************/
function Navigate(type, tname,l_gotoVal) {//OJET Migration
    mainWin.fnUpdateScreenSaverInterval();
//    var l_totalPg = Number(getInnerText(document.getElementById("TotPage__" + tname)));
//    if (l_totalPg == 1)
//        return;
    var htmlTableObj = getTableObjForBlock(tname);
    //var pgsize = Number(htmlTableObj.getAttribute("pgsize"));
    var nodeName =tname ;// htmlTableObj.id;
    appendTableValue(htmlTableObj, 1, nodeName);//12.0.3 ME changes
    var pgsize = getPgSize(nodeName);/*12.0.4 UI performance changes */
     var query = getXPathQuery(nodeName);
    var nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
    
    //var l_gotoVal = Number(document.getElementById("goto__" + nodeName).value);

    //var currPage = getInnerText(document.getElementById("CurrPage__" + nodeName));

    if (!fnEventsHandler('fnPreNavigate_' + tname))
        return;

    switch (type) {
        case N_FIRST:
            dbIndexArray[nodeName] = 1;
            break;
        case N_PREVIOUS:
            dbIndexArray[nodeName] = dbIndexArray[nodeName] - pgsize;
            if (dbIndexArray[nodeName] <= 0)
                dbIndexArray[nodeName] = 1;
            break;
        case N_NEXT:
            dbIndexArray[nodeName] = dbIndexArray[nodeName] + pgsize;
            /*12.0.4 UI performance changes starts*/
          /*  if (nodeList.length < dbIndexArray[nodeName]) {
                var startId = (Number(currPage) * pgsize) + 1;
                fnGetPartialDataXMLFromFCJXML(startId, nodeName, query, false, nodeList.length, false, '');//Got the Next 30 Records. appending is pending   
                nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
            }*/
            /*12.0.4 UI performance changes ends*/
            if (dbIndexArray[nodeName] > nodeList.length)
                dbIndexArray[nodeName] = nodeList.length;
            break;
        case N_LAST:
        /*12.0.4 UI performance changes starts*/

//        var prevPgLen =  (l_totalPg - 1)  * pgsize;
//        if(nodeList.length < (prevPgLen+1)) {
//            fnGetPartialDataXMLFromFCJXML(nodeList.length + 1, nodeName, query, true, nodeList.length, false, '');
//            nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
//        }
            /*12.0.4 UI performance changes ends*/
            var dataLength=meArrayForAddDelete[nodeName]().length;
            if (dataLength % pgsize == 0) {
              //  dbIndexArray[nodeName] = Number(Math.floor(nodeList.length / pgsize) * pgsize);
              dbIndexArray[nodeName] = Number(Math.floor(dataLength / pgsize) * pgsize) ;
            }
            else {
                dbIndexArray[nodeName] = Number(Math.floor(dataLength / pgsize) * pgsize) + 1;
            }
            break;
        case N_GOTO:
           /* if ((isNaN(l_gotoVal) || l_gotoVal == '' || document.getElementById("goto__" + nodeName).value.indexOf(".") !=  - 1 || l_gotoVal <= 0 || l_gotoVal > l_totalPg)) {
                alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
                document.getElementById("goto__" + nodeName).value = "";
                return;
            }*/
            SetDBIndexForGOTO(nodeName, l_gotoVal,  pgsize, nodeList);
            break;
        default :
            return;
    }

    //showTabData(strCurrentTabId);
    //fnCheckToggleChkBox(tname);
    //checkAnFocusSelectedRow(tname);
//	 if(document.getElementById("go__" + nodeName).disabled != true && getIEVersionNumber()== 9 ){ //21603599 starts
//        fireHTMLEvent(document.getElementById("go__" + nodeName), "onmouseover");
//        fireHTMLEvent(document.getElementById("go__" + nodeName), "onmouseout");
//    }//21603599  ends
//    if ((gAction == 'EXECUTEQUERY' || gAction == "") && functionId != "CLRU") {
//        var pviewmode = viewModeAction
//        viewModeAction = true;
//        disableAllElements("INPUT");
//        //fnEnableBlockCheckBox();
//        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
//        viewModeAction = pviewmode;
//    }
    showDescendants(tname);
    fnEventsHandler('fnPostNavigate_' + tname);
    return;
}
function Navigate_old(type, tname) {
    appendData();      //[FCUBS12.3_ITR1_24956233] added
    mainWin.fnUpdateScreenSaverInterval();
    var l_totalPg = Number(getInnerText(document.getElementById("TotPage__" + tname)));
    if (l_totalPg == 1)
        return;
    var htmlTableObj = getTableObjForBlock(tname);
    //var pgsize = Number(htmlTableObj.getAttribute("pgsize"));
    var nodeName = htmlTableObj.id;
    appendTableValue(htmlTableObj, 1, nodeName);//12.0.3 ME changes
    var pgsize = getPgSize(nodeName);/*12.0.4 UI performance changes */
     var query = getXPathQuery(nodeName);
    var nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
    var l_gotoVal = Number(document.getElementById("goto__" + nodeName).value);

    var currPage = getInnerText(document.getElementById("CurrPage__" + nodeName));

    if (!fnEventsHandler('fnPreNavigate_' + tname))
        return;

    switch (type) {
        case N_FIRST:
            dbIndexArray[nodeName] = 1;
            break;
        case N_PREVIOUS:
            dbIndexArray[nodeName] = dbIndexArray[nodeName] - pgsize;
            if (dbIndexArray[nodeName] <= 0)
                dbIndexArray[nodeName] = 1;
            break;
        case N_NEXT:
            //dbIndexArray[nodeName] = dbIndexArray[nodeName] + pgsize; //9NT1606_12_4_RETRO_12_1_26229989 changes 
			dbIndexArray[nodeName] =(Number(currPage)*pgsize)+1; //9NT1606_12_4_RETRO_12_1_26229989 changes 
            /*12.0.4 UI performance changes starts*/
            //if (nodeList.length < dbIndexArray[nodeName]) { //9NT1606_12_4_RETRO_12_1_26229989 changes 
			if ((gAction == 'EXECUTEQUERY' || gAction == "") && nodeList.length < dbIndexArray[nodeName]) { //9NT1606_12_4_RETRO_12_1_26229989 changes 
                var startId = (Number(currPage) * pgsize) + 1;
                fnGetPartialDataXMLFromFCJXML(startId, nodeName, query, false, nodeList.length, false, '');//Got the Next 30 Records. appending is pending   
                nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
            }
            /*12.0.4 UI performance changes ends*/
            if (dbIndexArray[nodeName] > nodeList.length)
                dbIndexArray[nodeName] = nodeList.length;
            break;
        case N_LAST:
        /*12.0.4 UI performance changes starts*/

        var prevPgLen =  (l_totalPg - 1)  * pgsize;
        if(nodeList.length < (prevPgLen+1)) {
            fnGetPartialDataXMLFromFCJXML(nodeList.length + 1, nodeName, query, true, nodeList.length, false, '');
            nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
        }
            /*12.0.4 UI performance changes ends*/
            if (nodeList.length % pgsize == 0) {
                dbIndexArray[nodeName] = Number(Math.floor(nodeList.length / pgsize) * pgsize);
            }
            else {
                dbIndexArray[nodeName] = Number(Math.floor(nodeList.length / pgsize) * pgsize) + 1;
            }
            break;
        case N_GOTO:
            if ((isNaN(l_gotoVal) || l_gotoVal == '' || document.getElementById("goto__" + nodeName).value.indexOf(".") !=  - 1 || l_gotoVal <= 0 || l_gotoVal > l_totalPg)) {
                alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
                document.getElementById("goto__" + nodeName).value = "";
                return;
            }
            SetDBIndexForGOTO(nodeName, l_gotoVal, l_totalPg, pgsize, nodeList, query);
            break;
        default :
            return;
    }

    showTabData(strCurrentTabId);
    fnCheckToggleChkBox(tname);
    checkAnFocusSelectedRow(tname);
	 if(document.getElementById("go__" + nodeName).disabled != true && getIEVersionNumber()== 9 ){ //21603599 starts
        fireHTMLEvent(document.getElementById("go__" + nodeName), "onmouseover");
        fireHTMLEvent(document.getElementById("go__" + nodeName), "onmouseout");
    }//21603599  ends
    if ((gAction == 'EXECUTEQUERY' || gAction == "") && functionId != "CLRU") {
        var pviewmode = viewModeAction
        viewModeAction = true;
        disableAllElements("INPUT");
        fnEnableBlockCheckBox();
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        viewModeAction = pviewmode;
    }
    fnEventsHandler('fnPostNavigate_' + tname);
    return;
}

function SetDBIndexForGOTO(pstrBlockID, l_gotoVal,  pgsize, nodeList) { //OJET Migration
    /*12.0.4 UI performance changes starts*/
     //var prevPgLen =  (Number(getInnerText(document.getElementById('TotPage__'+pstrBlockID))) - 1)  * pgsize; //21603599 
//    if ((l_gotoVal * pgsize) > nodeList.length && nodeList.length < (prevPgLen+1)) {
//        fnGetPartialDataXMLFromFCJXML((nodeList.length) + 1, pstrBlockID, query, false, nodeList.length, true, l_gotoVal * pgsize);
//    }
    /*12.0.4 UI performance changes ends*/
    var l_totPage = getInnerText(getNextSibling( document.getElementById('paging_'+pstrBlockID+'_nav_input')));
    l_totPage = Number(l_totPage.split(' ')[1]);
    if (l_gotoVal < 0) {
        dbIndexArray[pstrBlockID] = 1;
    }
    else if (l_gotoVal > l_totPage) {
        dbIndexArray[pstrBlockID] = Math.floor(nodeList.length / pgsize) * pgsize + 1;
    }
    else {
        dbIndexArray[pstrBlockID] = Number((l_gotoVal - 1) * pgsize) + 1;
    }
}
function SetDBIndexForGOTO_old(pstrBlockID, l_gotoVal, l_totPage, pgsize, nodeList, query) {
    /*12.0.4 UI performance changes starts*/
     var prevPgLen =  (Number(getInnerText(document.getElementById('TotPage__'+pstrBlockID))) - 1)  * pgsize; //21603599 
    if ((l_gotoVal * pgsize) > nodeList.length && nodeList.length < (prevPgLen+1)) {
        fnGetPartialDataXMLFromFCJXML((nodeList.length) + 1, pstrBlockID, query, false, nodeList.length, true, l_gotoVal * pgsize);
    }
    /*12.0.4 UI performance changes ends*/
    if (l_gotoVal < 0) {
        dbIndexArray[pstrBlockID] = 1;
    }
    else if (l_gotoVal > l_totPage) {
        dbIndexArray[pstrBlockID] = Math.floor(nodeList.length / pgsize) * pgsize + 1;
    }
    else {
        dbIndexArray[pstrBlockID] = Number((l_gotoVal - 1) * pgsize) + 1;
    }
}

/** ME set the Current Db Index****************************/
function fnMulipleEntryRow_onClick(e) {//OJET Migration
    appendData();//Ashok: to add the last added child row element into dom???
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    while(srcElement.tagName.toUpperCase()!='TD'){
        srcElement = srcElement.parentNode;
    }
    if((srcElement.children[0].tagName.toUpperCase()=='OJ-SELECTOR')){ //handling checkbox
        srcElement = getNextSibling(srcElement);
    }
    srcElement = srcElement.children[0].children[0];
   /* ME Lov issue*/
    if (srcElement.parentNode && srcElement.parentNode.tagName.toUpperCase() == 'BUTTON') {
        //if (getOuterHTML(srcElement.parentNode).indexOf("disp_lov") != -1) { Commented as part of Fix for 19522097
            srcElement = getPreviousSibling(srcElement.parentNode);
        //} Commented as part of Fix for 19522097
    } else {
        if (srcElement.tagName.toUpperCase() == 'BUTTON') {
            //if (getOuterHTML(srcElement).indexOf("disp_lov") != -1) { Commented as part of Fix for 19522097
                if (getPreviousSibling(srcElement)) {
                    srcElement = getPreviousSibling(srcElement);
                }else{ //12_0_3_RETRO_12_2_23655529 Starts 
					srcElement = document.getElementById(srcElement.id);
				}
				//12_0_3_RETRO_12_2_23655529 Ends 
            //} Commented as part of Fix for 19522097
        }
    }
    /* ME Lov issue*/
    var blockId = "";
    var currPg = "";
    var pgSize = "";
    //FCUBS11.0- Extensible Maitanance Tanking Changes
    var deSelMod = "";
    if (srcElement.name == "chkDeleteRow" || (getPreviousSibling(srcElement) && getPreviousSibling(srcElement).name == "chkDeleteRow")) {//HTML5 changes 2/NOV/2016 Fix for 24940888
        blockId = srcElement.getAttribute("parentDBT");
        currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
        pgSize = getPgSize(blockId);
        if (srcElement.parentNode.tagName == "LABEL") {
           // dbIndexArray[blockId] = (currPg - 1) * pgSize + (srcElement.parentNode.parentNode.parentNode.rowIndex - 1);
           dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
            
        }
        else {
          //  dbIndexArray[blockId] = (currPg - 1) * pgSize + (srcElement.parentNode.parentNode.rowIndex - 1);
           dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
        }
        if (!srcElement.checked) {
            setPrevDBIndexArray(blockId, currPg, pgSize, dbIndexArray[blockId]);
            document.getElementById(blockId + "Header_CHK_ME").checked = false;//Static Header change
            deSelMod = getRowIndex(evnt);
            showDescendants(blockId,evnt);
            // infra change for passing event for row click
            fnEventsHandler('fnPostRow_onClick_' + blockId, evnt);
            return;
        }
    }
    else {
        blockId = srcElement.id.substring(0, srcElement.id.lastIndexOf("__"));
        if (blockId == "") {
            if (srcElement.getElementsByTagName("INPUT")[0]) {
                if (srcElement.getElementsByTagName("INPUT")[0].id.substring(0,srcElement.getElementsByTagName("INPUT")[0].id.lastIndexOf("__")) == "chkDeleteRow") {// Split changes
                    blockId = srcElement.getElementsByTagName("INPUT")[0].getAttribute("parentDBT");
                }
                else {
                    blockId = srcElement.getElementsByTagName("INPUT")[0].id.substring(0,srcElement.getElementsByTagName("INPUT")[0].id.lastIndexOf("__"));  // // Split changes
                }
            }
            else if (srcElement.children[0]) {
                blockId = srcElement.children[0].id.substring(0,srcElement.children[0].id.lastIndexOf("__"));// // Split changes
            }
        }
        // Fix for 18295559 ends
        //currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
        currPg = Number(document.getElementById('paging_'+blockId+'_nav_input').value);
        pgSize = getPgSize(blockId);
        dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
       // fnUncheckAll(blockId);
//        if (srcElement.parentNode.tagName == "LABEL") {
//            srcElement.parentNode.parentNode.parentNode.parentNode.children[0].getElementsByTagName("INPUT")[0].checked = true;//static header change
//            dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
//        }
//        else {
//           // srcElement.parentNode.parentNode.parentNode.children[0].getElementsByTagName("INPUT")[0].checked = true;//static header change
//            dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
//        }
    }

    if (srcElement.id == "" || srcElement.tagName == "SELECT") {
        dbIndexArray[blockId] = (currPg - 1) * pgSize + (getRowIndex(evnt));
        fnSetDataSingleView(blockId);
		showDescendants(blockId); //Fix for 19522097
        fnEventsHandler('fnPostRow_onClick_' + blockId, evnt);
        return;
    }
   
    var activeElement = document.activeElement;

    showDescendants(blockId,evnt);
    //var l_tbl_obj = document.getElementById(blockId);
    var rowIndx = 0;
    if (dbIndexArray[blockId] < pgSize) {
        rowIndx = dbIndexArray[blockId];
    }
    else {
        rowIndx = dbIndexArray[blockId] - ((currPg - 1) * pgSize);
    }
//    if (activeElement.name != "chkDeleteRow" && !srcElement.disabled) {
//        srcElement.focus();
//    }
   // fnCheckToggleChkBox(blockId, e);
    fnSetDataSingleView(blockId);
    if (!fnEventsHandler('fnPostRow_onClick_' + blockId, evnt))
        return;
}


function fnMulipleEntryRow_onClick_old(e) {
    appendData();//Ashok: to add the last added child row element into dom???
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);

   /* ME Lov issue*/
    if (srcElement.parentNode && srcElement.parentNode.tagName.toUpperCase() == 'BUTTON') {
        //if (getOuterHTML(srcElement.parentNode).indexOf("disp_lov") != -1) { Commented as part of Fix for 19522097
            srcElement = getPreviousSibling(srcElement.parentNode);
        //} Commented as part of Fix for 19522097
    } else {
        if (srcElement.tagName.toUpperCase() == 'BUTTON') {
            //if (getOuterHTML(srcElement).indexOf("disp_lov") != -1) { Commented as part of Fix for 19522097
                if (getPreviousSibling(srcElement)) {
                    srcElement = getPreviousSibling(srcElement);
                }else{ //12_0_3_RETRO_12_2_23655529 Starts 
					srcElement = document.getElementById(srcElement.id);
				}
				//12_0_3_RETRO_12_2_23655529 Ends 
            //} Commented as part of Fix for 19522097
        }
    }
    /* ME Lov issue*/
    var blockId = "";
    var currPg = "";
    var pgSize = "";
    //FCUBS11.0- Extensible Maitanance Tanking Changes
    var deSelMod = "";
    if (srcElement.name == "chkDeleteRow" || (getPreviousSibling(srcElement) && getPreviousSibling(srcElement).name == "chkDeleteRow")) {//HTML5 changes 2/NOV/2016 Fix for 24940888
        blockId = srcElement.getAttribute("parentDBT");
        currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
        pgSize = getPgSize(blockId);
        if (srcElement.parentNode.tagName == "LABEL") {
           // dbIndexArray[blockId] = (currPg - 1) * pgSize + (srcElement.parentNode.parentNode.parentNode.rowIndex - 1);
           dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
            
        }
        else {
          //  dbIndexArray[blockId] = (currPg - 1) * pgSize + (srcElement.parentNode.parentNode.rowIndex - 1);
           dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
        }
        if (!srcElement.checked) {
            setPrevDBIndexArray(blockId, currPg, pgSize, dbIndexArray[blockId]);
            document.getElementById(blockId + "Header_CHK_ME").checked = false;//Static Header change
            deSelMod = getRowIndex(evnt);
            showDescendants(blockId,evnt);
            // infra change for passing event for row click
            fnEventsHandler('fnPostRow_onClick_' + blockId, evnt);
            return;
        }
    }
    else {
        blockId = srcElement.id.substring(0, srcElement.id.lastIndexOf("__"));
        if (blockId == "") {
            if (srcElement.getElementsByTagName("INPUT")[0]) {
                if (srcElement.getElementsByTagName("INPUT")[0].id.substring(0,srcElement.getElementsByTagName("INPUT")[0].id.lastIndexOf("__")) == "chkDeleteRow") {// Split changes
                    blockId = srcElement.getElementsByTagName("INPUT")[0].getAttribute("parentDBT");
                }
                else {
                    blockId = srcElement.getElementsByTagName("INPUT")[0].id.substring(0,srcElement.getElementsByTagName("INPUT")[0].id.lastIndexOf("__"));  // // Split changes
                }
            }
            else if (srcElement.children[0]) {
                blockId = srcElement.children[0].id.substring(0,srcElement.children[0].id.lastIndexOf("__"));// // Split changes
            }
        }
        // Fix for 18295559 ends
       /* currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));   //OJET Migration Need to check with hitesh
        pgSize = getPgSize(blockId);
      //  fnUncheckAll(blockId); //OJET Migration
        if (srcElement.parentNode.tagName == "LABEL") {
          //  srcElement.parentNode.parentNode.parentNode.parentNode.children[0].getElementsByTagName("INPUT")[0].checked = true;//static header change
            dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
        }
        else {
          //  srcElement.parentNode.parentNode.parentNode.children[0].getElementsByTagName("INPUT")[0].checked = true;//static header change
            dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
        }*/
    }

    if (srcElement.id == "" || srcElement.tagName == "SELECT") {
        dbIndexArray[blockId] = (currPg - 1) * pgSize + (getRowIndex(evnt));
        fnSetDataSingleView(blockId);
		showDescendants(blockId); //Fix for 19522097
        fnEventsHandler('fnPostRow_onClick_' + blockId, evnt);
        return;
    }
   
    var activeElement = document.activeElement;

    showDescendants(blockId,evnt);
    //var l_tbl_obj = document.getElementById(blockId);
    var rowIndx = 0;
    if (dbIndexArray[blockId] < pgSize) {
        rowIndx = dbIndexArray[blockId];
    }
    else {
        rowIndx = dbIndexArray[blockId] - ((currPg - 1) * pgSize);
    }
    if (activeElement.name != "chkDeleteRow" && !srcElement.disabled) {
        srcElement.focus();
    }
    //fnCheckToggleChkBox(blockId, e); //OJET Migration
    fnSetDataSingleView(blockId);
    if (!fnEventsHandler('fnPostRow_onClick_' + blockId, evnt))
        return;
}

function addRowShortcut(obj, e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var blockId = obj;
    var l_TableObj = getTableObjForBlock(blockId).tBodies[0];//Fix for 22987477 
    if ((gAction != "" && gAction != "EXECUTEQUERY") || functionId == "CLRU") {
        var activeElement = "";        
        if (evnt.ctrlKey == true && evnt.keyCode == 45) {
            fnDisableBrowserKey(evnt);
            try {
                evnt.keyCode = 0;
            }
            catch (e) {
            }
            if (document.getElementById("cmdAddRow_" + blockId).className == "BTNhide" || document.getElementById("cmdAddRow_" + blockId).disabled || document.getElementById("cmdAddRow_" + blockId).style.visibility.toUpperCase() == "HIDDEN") {
                return false;
            }
            evnt.cancelBubble = true;
            fnAddRow(blockId);
            fnCheckToggleChkBox(blockId);
            checkAnFocusSelectedRow(blockId);
            return false;
        }
        else if (evnt.ctrlKey == true && evnt.keyCode == 46) {
            fnDisableBrowserKey(evnt);
            try {
                evnt.keyCode = 0;
            }
            catch (e) {
            }
            if (document.getElementById("cmdDelRow_" + blockId).className == "BTNhide" || document.getElementById("cmdDelRow_" + blockId).disabled || document.getElementById("cmdDelRow_" + blockId).style.visibility.toUpperCase() == "HIDDEN") {
                return false;
            }
            evnt.cancelBubble = true;
            fnDeleteRow(blockId);
            fnCheckToggleChkBox(blockId);
            checkAnFocusSelectedRow(blockId);
            return false;
        }        
        else if (evnt.keyCode == 33) {
            var cellIndex = srcElement.parentNode.cellIndex;
            Navigate(N_PREVIOUS, blockId);
            if (cellIndex != undefined && l_TableObj.rows.length > 0) {
                if (l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[1])
                    l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[1].focus();
                else {
                    l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].getElementsByTagName("INPUT")[0].focus();
                }
            }
            else {
                document.getElementById("goto__" + blockId).focus();
            }
            preventpropagate(e);
            return false;
        }
        else if (evnt.keyCode == 34) {
            var cellIndex = srcElement.parentNode.cellIndex;
            Navigate(N_NEXT, blockId);
            if (cellIndex != undefined && l_TableObj.rows.length > 0) {
                if (l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[1])
                    l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[1].focus();
                else {
                    l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].getElementsByTagName("INPUT")[0].focus();
                }
            }
            else {
                document.getElementById("goto__" + blockId).focus();
            }
            preventpropagate(e);
            return false;
        }
        else if (evnt.keyCode == 35) {
            var cellIndex = srcElement.parentNode.cellIndex;
            Navigate(N_LAST, blockId);
            if (cellIndex != undefined && l_TableObj.rows.length > 0) {
                if (l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[1])
                    var type = "";
                if (type == "HIDDEN") {
                    var indexDate = getOuterHTML(object).indexOf("displayDate");
                    var indexAmount = getOuterHTML(object).indexOf("displayAmount");
                    var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
                    if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                        l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].getElementsByTagName("INPUT")[1].focus();
                    }
                    else {
                        l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[0].children[0].focus();
                    }
                }
                else {
                    document.getElementById("goto__" + blockId).focus();
                }
                preventpropagate(e);
                return false;
            }
        }
        else if (evnt.keyCode == 36) {
            var cellIndex = srcElement.parentNode.cellIndex;
            Navigate(N_FIRST, blockId);
            if (cellIndex != undefined && l_TableObj.rows.length > 0) {
                if (l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[1])
                    var type = "";
                if (type == "HIDDEN") {
                    var indexDate = getOuterHTML(object).indexOf("displayDate");
                    var indexAmount = getOuterHTML(object).indexOf("displayAmount");
                    var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
                    if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                        l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].getElementsByTagName("INPUT")[1].focus();
                    }
                    else {
                        l_TableObj.rows[getRow(l_TableObj)].cells[cellIndex].children[0].children[0].focus();
                    }
                }
                else {
                    document.getElementById("goto__" + blockId).focus();
                }
                preventpropagate(e);
                return false;
            }
        }
        else if (evnt.ctrlKey == true && evnt.shiftKey == true && evnt.keyCode == 9) {
            getTableObjForBlock(blockId).parentNode.parentNode.getElementsByTagName("span")[0].children[2].focus();
            preventpropagate(e);
            return false;
        }
        else if (evnt.ctrlKey == true && evnt.keyCode == 9) {
            getTableObjForBlock(blockId).tFoot.getElementsByTagName("td")[0].focus();
            preventpropagate(e);
            return false;
        }
    }
    if (evnt.ctrlKey == true && evnt.keyCode == 73) {
        fnShowSingleViewForME(blockId);
        fnDisableBrowserKey(evnt);
        try {
            evnt.keyCode = 0;
        }
        catch (e) {
        }
        return false;
    }else if ((evnt.keyCode == 38) || (evnt.keyCode == 38 && srcElement.tagName == "BUTTON")) {//Fix for 22987477 start
            //code for traversing rows up
            hotKeyPressed = true;//Bug 16519120 Changes
            if (srcElement.tagName != "SELECT") {
                activeElement = document.activeElement;
                focusPreviousRow(l_TableObj, getRow(l_TableObj), activeElement);
                preventpropagate(e);
                return false;
            }
        }
        else if ((evnt.keyCode == 40) || (evnt.keyCode == 40 && srcElement.tagName == "BUTTON")) {
            //code for traversing rows down
            hotKeyPressed = true;//Bug 16519120 Changes
            if (srcElement.tagName != "SELECT") {
                activeElement = document.activeElement;
                focusNextRow(l_TableObj, getRow(l_TableObj), activeElement);
                preventpropagate(e);
                return false;
            }//Fix for 22987477 end
        }else if (evnt.keyCode == 13 ) {//Customer Accessibility start
        //Fix for 22987160 start
        if(srcElement.getAttribute("ondblclick")){
            if (getBrowser().indexOf("IE") != -1 && getIEVersionNumber() > 0) {//12.0.3 changes 
                fireHTMLEvent(srcElement, "ondblclick", evnt);
            } else {
                var fnEval = new Function("event",srcElement.getAttribute("ondblclick"));  
                fnEval(evnt);
            }
        }else{
            if (getBrowser().indexOf("IE") != -1 && getIEVersionNumber() > 0) {//12.0.3 changes 
                fireHTMLEvent(srcElement, "onclick", evnt);
            } else {
                var fnEval = new Function("event",srcElement.getAttribute("onclick"));  
                fnEval(evnt);
            }
        }//Fix for 22987160 end
            return false;
        }//Customer Accessibility end
    return true;
}

function getRow(l_TableObj) {
    var rowNo = "";
    //var ele = "";
    for (var j = 0;j < l_TableObj.rows.length;j++) {
        if (l_TableObj.rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            rowNo = j;
        }
    }
    return rowNo;
}

function focusNextRow(l_TableObj, row, activeElement) {
    if (l_TableObj.rows[row + 1]) {
        l_TableObj.rows[row].cells[0].getElementsByTagName("INPUT")[0].checked = false;
        for (var k = 0;k < l_TableObj.rows[row + 1].cells.length;k++) {
            //Fix for 22987477 start
			if (l_TableObj.rows[row + 1].cells[k].children[0].children[1]) {
                var elemDate = getOuterHTML(l_TableObj.rows[row + 1].cells[k].children[0].children[1]).indexOf("displayDate");
                var elemAmt = getOuterHTML(l_TableObj.rows[row + 1].cells[k].children[0].children[1]).indexOf("displayAmount");
                var elemNum = getOuterHTML(l_TableObj.rows[row + 1].cells[k].children[0].children[1]).indexOf("displayFormattedNumber");
                if (elemDate !=  - 1 || elemAmt !=  - 1 || elemNum !=  - 1)
                    ele = l_TableObj.rows[row + 1].cells[k].children[0].children[3];
                else 
                    ele = l_TableObj.rows[row + 1].cells[k].children[0].children[1];//Fix for 22987477 end
                if (ele.name == activeElement.name) {
                    try {
                        if (getIEVersionNumber() > 0) {
                            fireHTMLEvent(ele, "onclick");
                        }
                        else {
                            var fnEval = new Function("event", ele.getAttribute('onclick'));
                            fnEval();
                        }
                    }
                    catch (ex) {
                    }
                    ele.focus();
                    break;
                }
            }
            else {
                if (l_TableObj.rows[row + 1].cells[k].getElementsByTagName("INPUT")[0].name == activeElement.name) {
                    l_TableObj.rows[row + 1].cells[k].getElementsByTagName("INPUT")[0].focus();
                    break;
                }else if (l_TableObj.rows[row + 1].cells[k].getElementsByTagName("BUTTON").length > 0 && l_TableObj.rows[row + 1].cells[k].getElementsByTagName("BUTTON")[0].name == activeElement.name) {
                    l_TableObj.rows[row + 1].cells[k].getElementsByTagName("BUTTON")[0].focus();
                    break;//Fix for 22987477 end
                }
            }
        }
        l_TableObj.rows[row + 1].cells[0].getElementsByTagName("INPUT")[0].checked = true;
        return;
    }

}

function focusPreviousRow(l_TableObj, row, activeElement) {
    if (l_TableObj.rows[row - 1]) {
        l_TableObj.rows[row].cells[0].getElementsByTagName("INPUT")[0].checked = false;
        for (var k = 0;k < l_TableObj.rows[row - 1].cells.length;k++) {//Fix for 22987477 start
            if (l_TableObj.rows[row - 1].cells[k].children[0].children[1]) {
                var elemDate = getOuterHTML(l_TableObj.rows[row - 1].cells[k].children[0].children[1]).indexOf("displayDate");
                var elemAmt = getOuterHTML(l_TableObj.rows[row - 1].cells[k].children[0].children[1]).indexOf("displayAmount");
                var elemNum = getOuterHTML(l_TableObj.rows[row - 1].cells[k].children[0].children[1]).indexOf("displayFormattedNumber");
                if (elemDate !=  - 1 || elemAmt !=  - 1 || elemNum !=  - 1)
                    ele = l_TableObj.rows[row - 1].cells[k].children[0].children[3];
                else 
                    ele = l_TableObj.rows[row - 1].cells[k].children[0].children[1];//Fix for 22987477 end
                if (ele.name == activeElement.name) {
                    try {
                        if (getIEVersionNumber() > 0) {
                            fireHTMLEvent(ele, "onclick");
                        }
                        else {
                            var fnEval = new Function("event", ele.getAttribute('onclick'));
                            fnEval();
                        }
                    }
                    catch (ex) {
                    }
                    ele.focus();
                    break;
                }
            }
            else {
                if (l_TableObj.rows[row - 1].cells[k].getElementsByTagName("INPUT")[0].name == activeElement.name) {
                    l_TableObj.rows[row - 1].cells[k].getElementsByTagName("INPUT")[0].focus();
                    break;
                }else if (l_TableObj.rows[row - 1].cells[k].getElementsByTagName("BUTTON").length > 0 && l_TableObj.rows[row - 1].cells[k].getElementsByTagName("BUTTON")[0].name == activeElement.name) {
                    l_TableObj.rows[row - 1].cells[k].getElementsByTagName("BUTTON")[0].focus();//Fix for 22987477 end
                    break;
                }
            }
        }
        l_TableObj.rows[row - 1].cells[0].getElementsByTagName("INPUT")[0].checked = true;
        return;
    }
}

function fnToggleAllOrNoneME(pstrBlockId, chkObject, e) {
    appendData();
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    if (srcElem.id == "")
        return;

    var l_srcId = srcElem.id;
    var l_blockId = l_srcId.split("Header_CHK_ME")[0];//Static Header change
    currPg = Number(getInnerText(document.getElementById("CurrPage__" + l_blockId)));

    var tableObject = getTableObjForBlock(l_blockId);
    if (tableObject) {
        var pgSize = tableObject.getAttribute("pgsize");

        var startval = 0;
        if (!srcElem.checked) {
            startval = 1;
        }

        for (var rowIndex = startval;rowIndex < tableObject.tBodies[0].rows.length;rowIndex++) {
            tableObject.tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = srcElem.checked;
            if (srcElem.checked)//if all rows are selected set the dbindex as the last one.
                dbIndexArray[l_blockId] = Number((currPg - 1) * pgSize) + Number(rowIndex + 1);//Fix for 16584887
        }

        if (!srcElem.checked) {
            //if unchekd set the db index as 1 row.
            dbIndexArray[l_blockId] = Number((currPg - 1) * pgSize) + 1;
            //showDescendants(l_blockId); //9NT1606_12_2_RETRO_12_0_3_23655942 changes 
        }
		 showDescendants(l_blockId); //9NT1606_12_2_RETRO_12_0_3_23655942 changes
    }
}

/* Type=ME and view=SE *********************************************************************************/
function fnAddRowMESV(v_MESVblockId) {//OJET Migration
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    appendData();
    if (!fnEventsHandler('fnPreAddRow_' + v_MESVblockId))
        return false;
    
    appendData();
    dbIndexArray[v_MESVblockId] = selectNodes(dbDataDOM, getXPathQuery(v_MESVblockId)).length + 1;
    showTabData(strCurrentTabId);

    var fldSetObj = document.getElementsByTagName("fieldset");
    for (var i = 0;i < fldSetObj.length;i++) {
        if (fldSetObj[i].getAttribute("block") == v_MESVblockId && fldSetObj[i].getAttribute("type") == "ME" && fldSetObj[i].getAttribute("view") == "SE")
            fldSetObj[i].setAttribute("MESVNODE", "true");
    }
    enableMESVFields(v_MESVblockId);
	
	//Multi Entry Single View add row Issue -- Start
    var childTable = findDescandants(v_MESVblockId);
    var childArray = childTable.split("~");
    var relation = "";
    for (var index = 0; index < childArray.length; index++) {
        if (childArray[index] != "") {
            var relationName = relationArray[childArray[index]];
            relation = relationName.substring(relationName.length - 1);
            if (relation == "N") {
				dbIndexArray[childArray[index]] = 1;
						
				var fldSetObj = document.getElementsByTagName("fieldset");
				for (var i = 0;i < fldSetObj.length;i++) {
					if (fldSetObj[i].getAttribute("block") == childArray[index] && fldSetObj[i].getAttribute("type") == "ME" && fldSetObj[i].getAttribute("view") == "SE"){						
						fnDelRowMESV(childArray[index]);
						disableMESVFields(childArray[index]);
						setInnerText(document.getElementById("TotPageSV__" + childArray[index]), 1);
						setInnerText(document.getElementById("CurrPageSV__" + childArray[index]), 1);
						fnUpdateSEPgBtn(childArray[index]);
					}	
				}
            }
        }
    }
	//Multi Entry Single View add row Issue -- End


    try {
        fnEventsHandler('fnPostAddRow_' + v_MESVblockId);
    }
    catch (e) {
    }

    appendData();

    fnUpdateSEPgBtn(v_MESVblockId);
}

function fnDelRowMESV(v_MESVblockId) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    appendData();
    try {
        if(!fnEventsHandler('fnPreDelRow_' + v_MESVblockId)) //21082860
			return false;
    }
    catch (e) {
    }

    deleteData(v_MESVblockId);
    appendData();
    showTabData(strCurrentTabId);

    try {
        fnEventsHandler('fnPostDelRow_' + v_MESVblockId);
    }
    catch (e) {
    }

    appendData();
    fnUpdateSEPgBtn(v_MESVblockId);
}

function fnMovePrevMESV(v_MESVblockId) {
    appendData();
    try {
        fnEventsHandler('fnPreMovePrev_' + v_MESVblockId);
    }
    catch (e) {
    }

    displayPrevData(v_MESVblockId);

    appendData();
    fnChangeLabelToText("TEXTAREA");
    showTabData(strCurrentTabId);
    fnUpdateSEPgBtn(v_MESVblockId);
    if (gAction == 'EXECUTEQUERY' || gAction == "") {
        var pviewmode = viewModeAction
        viewModeAction = true;
        disableAllElements("INPUT");
      //  fnEnableBlockCheckBox(); //OJET Migration
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        viewModeAction = pviewmode;
    }
    try {
        //ME Header Fix
        if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
            showTabData(strHeaderTabId);
        }
        fnEventsHandler('fnPostMovePrev_' + v_MESVblockId);
    }
    catch (e) {
    }
}

function fnMoveNextMESV(v_MESVblockId) {
    appendData();
    try {
        fnEventsHandler('fnPreMoveNext_' + v_MESVblockId);
    }
    catch (e) {
    }

    displayNextData(v_MESVblockId);

    appendData();
    fnChangeLabelToText("TEXTAREA");
    showTabData(strCurrentTabId);
    fnUpdateSEPgBtn(v_MESVblockId);
    if (gAction == 'EXECUTEQUERY' || gAction == "") {
        var pviewmode = viewModeAction
        viewModeAction = true;
        disableAllElements("INPUT");
        //fnEnableBlockCheckBox();//OJET Migration 
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        viewModeAction = pviewmode;
    }
    try {
        //ME Header Fix
        if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
            showTabData(strHeaderTabId);
        }
        fnEventsHandler('fnPostMoveNext_' + v_MESVblockId);
    }
    catch (e) {
    }
}

function checkAnFocusSelectedRow(blockId) {
    var l_tableObj = document.getElementById(blockId);
    for (var j = 0;j < l_tableObj.tBodies[0].rows.length;j++) {
        if (l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].focus();
            return;
        }
    }
}

/* ExtensibleME.js functions END************************/

function isMultipleEntry(dataSrc) {
    if (typeof (multipleEntryIDs.indexOf) != "undefined") {
        /*12.0.4 UI performance changes starts*/
        if (multipleEntryIDs.indexOf(dataSrc) !=  - 1) {
            return 'true';
        }
    }
    else {
        for (var i = 0;i < multipleEntryIDs.length;i++) {
            if (multipleEntryIDs[i] == dataSrc) {
                return 'true';
            }
        }
    }
    /*12.0.4 UI performance changes ends*/
    return 'false';
}

function fnIsSingleView(tableName) {
    if (typeof (multipleEntryIDs.indexOf) != "undefined") {
        /*12.0.4 UI performance changes starts*/
        if (multipleEntryIDs.indexOf(tableName) !=  - 1) {
            return false;
        }
    }
    else {
        for (var i = 0;i < multipleEntryIDs.length;i++) {
            if (multipleEntryIDs[i] == tableName)
                return false;
        }
    }
    /*12.0.4 UI performance changes ends*/
    return true;
}

/* Gets the Table object for the Given block name.*/
function getTableObjForBlock(blockId, doc) { //OJET Migration
        if (!doc) {
            doc = document;
        }
    	var tableObj = doc.getElementById(blockId );//getNextSibling(tableObj.parentNode.parentNode).children[0];
        if(tableObj==null){
            return null;
        }
	if(tableObj.tagName == 'OJ-TABLE'){ //OJET-Arun
		tableObj = doc.getElementById(blockId).getElementsByTagName('TABLE')[0];
	}
    return tableObj;
}
function getTableObjForBlock_Old(blockId, doc) {

    var tableObj;
    if (typeof (doc) != "undefined") {
        if (!doc.getElementById(blockId + "Header_CHK_ME"))
            return null;//Static Header change
        tableObj = doc.getElementById(blockId + "Header_CHK_ME").parentNode;//Static Header change
    }
    else {
        if (!document.getElementById(blockId + "Header_CHK_ME"))
            return null;//Static Header change
        tableObj = document.getElementById(blockId + "Header_CHK_ME").parentNode;//Static Header change
    }

    while (tableObj.tagName.toUpperCase() != "TABLE") {
        tableObj = tableObj.parentNode;
    }
    // return document.getElementById(tableObj.id.substring(0,tableObj.id.indexOf("Header")));//Static Header change review get sibling..
    return getNextSibling(tableObj.parentNode.parentNode).children[0];
}

/* Gets the page size for a given table name.*/
function getPgSize(blockId) {
    /*12.0.4 UI performance changes starts*/
    if (typeof (multipleEntryPageSize) != "undefined")// Else Should remove
        return Number(multipleEntryPageSize[blockId]);
    else {
        var tableObj = getTableObjForBlock(blockId);
        return Number(tableObj.getAttribute("pgsize"));
    }
    /*12.0.4 UI performance changes ends*/
}

/* Unchecks all the selected checkboxes */
function fnUncheckAll(blockId) {
    var tableObj = getTableObjForBlock(blockId);
    var rowObj = tableObj.tBodies[0].rows;
    for (var i = 0;i < rowObj.length;i++) {
        rowObj[i].children[0].getElementsByTagName("INPUT")[0].checked = false;
    }
}

/* on Uncheck of a row, sets the dbindex array*/
function setPrevDBIndexArray(blockId, curPage, PgSize, OldDbIndex) {
    var tableObj = getTableObjForBlock(blockId);
    var rowObj = tableObj.tBodies[0].rows;
    for (var i = 0;i < rowObj.length;i++) {
        if (rowObj[i].children[0].getElementsByTagName("INPUT")[0].checked == true) {
            dbIndexArray[blockId] = Number((curPage - 1) * PgSize) + (i + 1);
        }
    }
    if (OldDbIndex == dbIndexArray[blockId]) {
        dbIndexArray[blockId] = Number((curPage - 1) * PgSize) + 1;
        tableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked = true;
    }
}

/* Checks whether for agiven blcok , ME child exits*/
function isMEChildExists(parentTable) {
    var childTable = findDescandants(parentTable);
    var childArray = childTable.split("~");
    var relation = "";
    for (var index = 0;index < childArray.length;index++) {
        if (childArray[index] != "") {
            var relationName = relationArray[childArray[index]];
            relation = relationName.substring(relationName.length - 1);
            if (relation == "N") {
                return true;
            }
            else {
                return false;
            }
        }
    }
}

function showDescendants(currentTable,event) {
    if (typeof (scrName) != "undefined" && scrName != "CVS_AUTHORIZE" && functionId != "CLRU")
        fnEventsHandler('fnPreShowDescendants_' + currentTable,event); //21421080 
    var childTable = findDescandants(currentTable);
    childTable = childTable.substring(0, childTable.length - 1);
    var childArray = "";
    if (childTable != "")
        childArray = childTable.split("~");

    if (childArray != "") {
        for (var index = 0;index < childArray.length;index++) {
//            if (document.getElementById("goto__" + childArray[index])) {//OJET Migration
//                document.getElementById("goto__" + childArray[index]).value = "";//12.0.3 ME changes
//            }
            var parentTableName = getParentTableName(childArray[index]);
            var relationName = relationArray[childArray[index]];
			//Fix for 18669432 start
            //var relation = relationName.substring(0, relationName.length - 2);
			  var relation =  relationName.substring(relationName.length - 1, relationName.length )
			//Fix for 18669432 End

            var tableObj = getTableObjForBlock(childArray[index]);
            if (tableObj != null) {
                var query = getXPathQuery(childArray[index]);
                var nodeList = selectNodes(dbDataDOM, query);
                dbIndexArray[childArray[index]] = 1;//Fix for 16443475
                /*12.0.4 UI performance changes starts */
                var recLength = 0;
//OJET Migration
//                var l_Pagesize = 0;
//                if (typeof (returnMEblockpageSize(childArray[index])) != "undefined")//getting the pagesize from SYS file array
//                    l_Pagesize = Number(returnMEblockpageSize(tableObj.id));
//                else 
//                    l_Pagesize = Number(tableObj.getAttribute("pgsize"));
//                if ((gAction == "EXECUTEQUERY" || gAction == "") && dbDataDOM != null && isPartialDOM) //21278347 
//                    recLength = getBlockStructure(childArray[index], true);
//                else 
                    recLength = nodeList.length;
             //   fnUpdatePgBtn(childArray[index], l_Pagesize, recLength);/*12.0.4 UI performance changes ends*/  //OJET Migration
            showPageWise(tableObj, childArray[index],nodeList);
            } //else if (document.getElementById(childArray[index]) && document.getElementById(childArray[index]).getAttribute("VIEW") == "SE" && document.getElementById(childArray[index]).getAttribute("type") == "ME") {//Fix for 18669432
			else if(relation == "N"){//Fix for 18669432
                var childNodes = selectNodes(dbDataDOM, getXPathQuery(childArray[index]));
				//Fix for 18669432 start
                 var fldList = document.getElementsByTagName("FIELDSET");
                        var currentFldSet = null;
                        for(var cnt =0 ; cnt < fldList.length ; cnt++){
                          var blkname = fldList[cnt].getAttribute("BLOCK");
                          if(typeof(blkname) != "undefined" && blkname == childArray[index]){
                              currentFldSet = fldList[cnt];
                              break;
                          }
                        }
				//Fix for 18669432 end
                if (childNodes.length > 0) {
                    enableMESVFields(childArray[index]);
                    if ((gAction == "EXECUTEQUERY" || gAction == "") && dbDataDOM != null) { 
                        recLength = getBlockStructure(childArray[index], true);
                        if(document.getElementById("TotPageSV__"+childArray[index]) != null ) { //21075589 
                            setInnerText(document.getElementById("TotPageSV__"+childArray[index]), recLength);
                        }
                    }
                        fnUpdateSEPgBtn(childArray[index]);
                   
                    
                    
                    for (var i = 0; i < childNodes.length; i++) {
						//Fix for 18669432 start
                        
						if(currentFldSet != null && typeof(currentFldSet) != "undefined"){ //Fix for 18407062
							setDataInSingleView(childArray[index] + "__", childNodes[i], currentFldSet); // fix for 19273662 
							currentFldSet.setAttribute("MESVNODE", "true");
						}
						//Fix for 18669432 end
                    }
                    dbIndexArray[childArray[index]] = 1;
                } else {
                    dbIndexArray[childArray[index]] = 1;
                    fnUpdateSEPgBtn(childArray[index]);
					//Fix for 18669432 start
                   // document.getElementById(childArray[index]).parentNode.parentNode.setAttribute("MESVNODE", "false");
				   if(currentFldSet != null && typeof(currentFldSet) != "undefined"){ //Fix for 18407062
						currentFldSet.setAttribute("MESVNODE", "false");
					 }
					//Fix for 18669432 end
                    disableMESVFields(childArray[index]);
                }
            } 
			//Fix for 19957285
			/*else if (relation == '1') {
                var node = getNode(childArray[index], 1);
                setDataInSE(childArray[index] + "__", node);
            }*/
        }
    }
    if ((gAction == 'EXECUTEQUERY' || gAction == "") && functionId != "CLRU") {
        var pviewmode = viewModeAction
        viewModeAction = true;
        //OJET Migration
        //disableAllElements("OJ-INPUT-TEXT");
        //fnEnableBlockCheckBox();  
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        viewModeAction = pviewmode;
    }
    if (typeof (scrName) != "undefined" && scrName != "CVS_AUTHORIZE" && functionId != "CLRU")
        fnEventsHandler('fnPostShowDescendants_' + currentTable,event);
    else if (typeof (scrName) != "undefined" && scrName == "CVS_AUTHORIZE") {
        try {
            fnPostShowDescendants();
        }
        catch (e) {
        }
    }
    return;
}

function fnCheckToggleChkBox(blockId, e) {

    var evnt, srcElem;

    if (e) {
        evnt = window.event || e;
        srcElem = getEventSourceElement(evnt);
    }

    var l_length = getTableObjForBlock(blockId).tBodies[0].rows.length;
    var l_tblElement;
    document.getElementById(blockId + "Header_CHK_ME").checked = false;//Static Header change
    if (l_length == 1) {
        document.getElementById(blockId + "Header_CHK_ME").checked = true;//Static Header change
        return;
    }

    if (typeof (document.getElementById(blockId).rows) != 'undefined') {
        l_length = document.getElementById(blockId).rows.length;
        l_tblElement = document.getElementById(blockId);
    }
    else {
        l_length = getTableObjForBlock(blockId).tBodies[0].rows.length;
        l_tblElement = getTableObjForBlock(blockId).tBodies[0];
    }

    var chkLen = 0;
    for (var chk = 0;chk < l_length-1;chk++) {
        if (l_tblElement.rows[chk].cells[0].children[0].children[0].children[1].checked) {
            chkLen++;
        }
    }
    if (chkLen != Number(l_tblElement.rows.length) - 1) {
        document.getElementById(blockId + "Header_CHK_ME").checked = false;//Static Header change
    } else {
        if (l_tblElement.rows.length > 1) {
            document.getElementById(blockId + "Header_CHK_ME").checked = true;//Static Header change
        }
    }
}

//Me pagination button changes  ******************************************************/
function fnResetPgBtn() {//OJET Migration
//    for (var i = 0;i < multipleEntryIDs.length;i++) {
//        if (document.getElementById(multipleEntryIDs[i])) {
//            disableAllButtons(multipleEntryIDs[i])
//            setInnerText(document.getElementById("CurrPage__" + multipleEntryIDs[i]), 1);
//            setInnerText(document.getElementById("TotPage__" + multipleEntryIDs[i]), 1);
//            document.getElementById("goto__" + multipleEntryIDs[i]).readOnly = true;
//            document.getElementById("go__" + multipleEntryIDs[i]).disabled = true;
//        }
//    }
}

//ME pagination changes
function disableAllButtons(pstrBlockID) {//OJET Migration
//    if (document.getElementById(pstrBlockID)) {   //OJET Migration
//        document.getElementById("nFirst__" + pstrBlockID).disabled = true;
//        document.getElementById("nPrev__" + pstrBlockID).disabled = true;
//        document.getElementById("nNext__" + pstrBlockID).disabled = true;
//        document.getElementById("nLast__" + pstrBlockID).disabled = true;
//        document.getElementById("nFirst__" + pstrBlockID).className = "BTNicon2D";
//        document.getElementById("nPrev__" + pstrBlockID).className = "BTNicon2D";
//        document.getElementById("nNext__" + pstrBlockID).className = "BTNicon2D";
//        document.getElementById("nLast__" + pstrBlockID).className = "BTNicon2D";
//        document.getElementById("go__" + pstrBlockID).disabled = true;
//        document.getElementById("goto__" + pstrBlockID).readOnly = true;
//        document.getElementById("goto__" + pstrBlockID).className = "TXTro";
//    }
}

//ME pagination changes
function enableAllButtons(pstrBlockID) { //OJET Migration
//    if (document.getElementById(pstrBlockID)) {
//        document.getElementById("nFirst__" + pstrBlockID).disabled = false;
//        document.getElementById("nPrev__" + pstrBlockID).disabled = false;
//        document.getElementById("nNext__" + pstrBlockID).disabled = false;
//        document.getElementById("nLast__" + pstrBlockID).disabled = false;
//        document.getElementById("nFirst__" + pstrBlockID).className = "BTNicon2";
//        fnHover(document.getElementById("nFirst__" + pstrBlockID));
//        document.getElementById("nPrev__" + pstrBlockID).className = "BTNicon2";
//        fnHover(document.getElementById("nPrev__" + pstrBlockID));
//        document.getElementById("nNext__" + pstrBlockID).className = "BTNicon2";
//        fnHover(document.getElementById("nNext__" + pstrBlockID));
//        document.getElementById("nLast__" + pstrBlockID).className = "BTNicon2";
//        fnHover(document.getElementById("nLast__" + pstrBlockID));
//    }
}

function fnUpdatePgBtn(pstrBlockID, Pagesize, TotRows) {//OJET Migration
    disableAllButtons(pstrBlockID);
    if (dbIndexArray[pstrBlockID] == 0)
        dbIndexArray[pstrBlockID] = 1;
    var l_TotalPages = Math.ceil(TotRows / Pagesize);
    var l_CurPage = Math.floor(dbIndexArray[pstrBlockID] / Pagesize);

    if (dbIndexArray[pstrBlockID] % Pagesize != 0)
        l_CurPage++;

    if (l_TotalPages == 0)
        l_TotalPages = 1;
    if (l_CurPage == 0)
        l_CurPage = 1;

    if (l_TotalPages > 1) {
        if (l_CurPage == 1) {
            document.getElementById("nNext__" + pstrBlockID).disabled = false;
            document.getElementById("nLast__" + pstrBlockID).disabled = false;
           // document.getElementById("nNext__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nNext__" + pstrBlockID));
            //document.getElementById("nLast__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nLast__" + pstrBlockID));
        }
        else if (l_CurPage == l_TotalPages) {
            document.getElementById("nFirst__" + pstrBlockID).disabled = false;
            document.getElementById("nPrev__" + pstrBlockID).disabled = false;
           // document.getElementById("nFirst__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nFirst__" + pstrBlockID));
           // document.getElementById("nPrev__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nPrev__" + pstrBlockID));
        }
        else {
            enableAllButtons(pstrBlockID);
        }

//        document.getElementById("go__" + pstrBlockID).disabled = false;
//        document.getElementById("go__" + pstrBlockID).className = "BTNtext";
//        //fnHover(document.getElementById("go__" + pstrBlockID));
//        document.getElementById("goto__" + pstrBlockID).readOnly = false;
//        document.getElementById("goto__" + pstrBlockID).className = "TXTstd";  

    }

   // setInnerText(document.getElementById("TotPage__" + pstrBlockID), l_TotalPages);
    //setInnerText(document.getElementById("CurrPage__" + pstrBlockID), l_CurPage);
//	if(document.getElementById("go__" + pstrBlockID).disabled != true && getIEVersionNumber()== 9 ){ //21603599 starts
//        fireHTMLEvent(document.getElementById("go__" + pstrBlockID), "onmouseover");
//    }
}

function fnUpdateSEPgBtn(pstrBlockID) {//OJET Migration
    try {
        var prevBtn = document.getElementsByName("BTN_PREV_" + pstrBlockID)[0];
        var nextBtn = document.getElementsByName("BTN_NEXT_" + pstrBlockID)[0];
        var curPage = Number(getInnerText(document.getElementById("CurrPageSV__" + pstrBlockID)));
        var totPage = Number(getInnerText(document.getElementById("TotPageSV__" + pstrBlockID)));

        if (curPage == totPage && curPage != 1) {
            //prevBtn.className = "BTNicon2";
            prevBtn.disabled = false;
            //nextBtn.className = "BTNicon2D";
            nextBtn.disabled = true;
            return;
        }
        else if (totPage > 1 && curPage == 1) {
            //prevBtn.className = "BTNicon2D";
            prevBtn.disabled = true;
           // nextBtn.className = "BTNicon2";
            nextBtn.disabled = false;
        }
        else if (totPage > 1 && curPage > 1) {
            //prevBtn.className = "BTNicon2";
            prevBtn.disabled = false;
            //nextBtn.className = "BTNicon2";
            nextBtn.disabled = false;
        }
        else {
            //prevBtn.className = "BTNicon2D";
            prevBtn.disabled = true;
            //nextBtn.className = "BTNicon2D";
            nextBtn.disabled = true;
        }
    }
    catch (e) {
    }
}

function fnDeleteRowForMultipleEntry(pstrBlockID) {

    //get table obj for the given pstrBlockID
    //get The total pages, Currentpage
    //calucate the index based on the row selected
    //delete the nodes of the selected indexes.
    //rebuild the nodlist
    //delete all rows 
    //update the ME pagination
    //showtabpage wise
    var l_tabObj = getTableObjForBlock(pstrBlockID);
    //var l_Pgsize = Number(l_tabObj.getAttribute("pgsize"));
    var l_Pgsize = getPgSize(pstrBlockID);/*12.0.4 UI performance changes*/ //OJET Migration
    var l_curPage = 1;
    var l_totPages = 1;
    if (l_tabObj) {//debugger;
        //l_totPages = Number(getInnerText(document.getElementById("TotPage__" + pstrBlockID)));
        l_curPage = Number(document.getElementById('paging_'+pstrBlockID+'_nav_input').value);
        l_totPage = getInnerText(getNextSibling( document.getElementById('paging_'+pstrBlockID+'_nav_input')));
        l_totPage = Number(l_totPage.split(' ')[1]);

        for (i = l_tabObj.tBodies[0].rows.length - 1;i >= 0;i--) {

            if (l_tabObj.tBodies[0].rows[i].cells[0].children[0].children[0].children[0].checked) { //OJET Migration
               
                dbIndexArray[pstrBlockID] = (l_curPage - 1) * l_Pgsize + (i + 1);
                showTable(false);
                meArrayForAddDelete[pstrBlockID].splice((dbIndexArray[pstrBlockID]-1) ,1);
                showTable(true);
                var l_CurNode = selectSingleNode(dbDataDOM, getXPathQuery(pstrBlockID) + "[@ID=" + dbIndexArray[pstrBlockID] + "]");
                l_CurNode.parentNode.removeChild(l_CurNode);
                var l_nodeList = selectNodes(dbDataDOM, getXPathQuery(pstrBlockID));
                resetNodeIdAttributes(l_nodeList);
                l_totPages = Math.ceil(Number(l_nodeList.length) / l_Pgsize);
                if (l_curPage > l_totPages) {
                    l_curPage = l_totPages;
                    // setTimeout(function () {
                        var ele = document.getElementById('paging_' + pstrBlockID).getElementsByTagName('a');
                        if (typeof ele[ele.length - 1] != 'undefined' && ele[1].className.includes("oj-pagingcontrol-nav-previous")) {
                            ele[1].click();
                }
            }
                
            }
        }
       /* if (l_tabObj.rows.length == 1) {  //OJET Migration
            document.getElementById(pstrBlockID + "Header_CHK_ME").checked = true;//Static Header change
        }
        else {
            document.getElementById(pstrBlockID + "Header_CHK_ME").checked = false;//Static Header change
        } */
       
         document.getElementById(pstrBlockID).refresh();
     

        dbIndexArray[pstrBlockID] = Number((l_curPage - 1) * l_Pgsize) + 1;
       // var l_nodeList = selectNodes(dbDataDOM, getXPathQuery(pstrBlockID));
        //fnUpdatePgBtn(pstrBlockID, l_Pgsize, l_nodeList.length);
       // showTabData(strCurrentTabId); //OJET Migration

    }

}

function deleteAllRows(tableName) {
    var tableObject = getTableObjForBlock(tableName);
    if (tableObject) {
        if (!tableObject.getAttribute("VIEW")) {
            setInnerText(tableObject.tBodies[0], "");
        }
    }
}

function deleteChildTableRows(tableName) {
    var childTable = findDescandants(tableName);
    childTable = childTable.substring(0, childTable.length - 1);
    if (childTable && childTable != "") {
        var childArray = childTable.split("~");
        for (var index = 0;index < childArray.length;index++) {
            deleteAllRows(childArray[index]);
        }
    }
    return;
}

/****  Type=ME and View=SV*************************************/
function displayNextData(tableName) {
    dbIndexArray[tableName] = dbIndexArray[tableName] + 1;
    /*12.0.4 UI performance changes starts*/
    var l_length = selectNodes(dbDataDOM, getXPathQuery(tableName)).length;
    if (gAction == 'EXECUTEQUERY' || gAction == "" && l_length < dbIndexArray[tableName]) {
        fnGetPartialDataXMLFromFCJXML(dbIndexArray[tableName], tableName, getXPathQuery(tableName), false, l_length, false, '');
        l_length = selectNodes(dbDataDOM, getXPathQuery(tableName)).length;
    }
    /*12.0.4 UI performance changes ends*/
    //var node = getData(tableName, dbIndexArray[tableName]);
    //var l_length = selectNodes(dbDataDOM, getXPathQuery(tableName)).length; //12.0.4
    if (dbIndexArray[tableName] >= l_length) {
        dbIndexArray[tableName] = l_length;
    }
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
        showTabData(strHeaderTabId);
    }
    resetIndexForChildMETable(tableName); // Fix for 19393979
	showTabData(strCurrentTabId);
}

function displayPrevData(tableName) {
    dbIndexArray[tableName] = dbIndexArray[tableName] - 1;
    if (dbIndexArray[tableName] == 0) {
        dbIndexArray[tableName] = dbIndexArray[tableName] + 1;
    }
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
        showTabData(strHeaderTabId);
    }
    resetIndexForChildMETable(tableName); // Fix for 19393979
	showTabData(strCurrentTabId);
}

function disableAllBlockElements(blockID, disableFlag, resetFlag) {
    fnMESV_TMP(blockID, disableFlag, resetFlag);
}

function fnMESV_TMP(blockID, disableFlag, resetFlag) {
    var arrEle = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");
    //deleteAllMERows(blockID);
    deleteAllRows(blockID);
    for (var l_cnt = 0;l_cnt < arrEle.length;l_cnt++) {
        var elements = document.getElementsByTagName(arrEle[l_cnt]);

        for (var cnt = 0;cnt < elements.length;cnt++) {
            if (elements[cnt].getAttribute("MEBLOCKID") == blockID) {
                currElement = elements[cnt];
                if (resetFlag) {
                    resetElement(currElement);
                }
                if (disableFlag == true || currElement.getAttribute("READONLY1")) {
                    if (arrEle[l_cnt] == "SELECT") {
                        currElement.disabled = true;
                    }
                    else {
                        if (currElement.type.toUpperCase() == "CHECKBOX" || currElement.type.toUpperCase() == "RADIO") {
                            currElement.disabled = true;
                        }
                        else {
                            currElement.readOnly = true;
                            currElement.className = "TXTro";
                            if (getNextSibling(currElement) && getNextSibling(currElement).tagName && getNextSibling(currElement).tagName == "BUTTON")
                                getNextSibling(currElement).disabled = false;
                            fnEnableElement(currElement);

                        }
                    }

                }
                else if (disableFlag == false) {
                    // FCUBS10.0ITR1 SFR 2275 Starts
                    if (arrEle[l_cnt] == "SELECT") {
                        currElement.disabled = false;
                    }
                    else {
                        if (currElement.type.toUpperCase() == "CHECKBOX" || currElement.type.toUpperCase() == "RADIO") {
                            currElement.disabled = false;
                        }
                        else {
                            fnEnableElement(currElement);
                        }
                    }
                }
            }
        }
    }
}

function enableMESVFields(v_MESVblockId) {

    var fldSetElem = document.getElementsByTagName("fieldset");
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");
    for (var fs = 0;fs < fldSetElem.length;fs++) {
        if (fldSetElem[fs].getAttribute("block") == v_MESVblockId && fldSetElem[fs].getAttribute("type") == "ME" && fldSetElem[fs].getAttribute("view") == "SE") {

            for (var i = 0;i < eleArray.length;i++) {
                var fldSetTagElem = fldSetElem[fs].getElementsByTagName(eleArray[i]);
                for (var flds = 0;flds < fldSetTagElem.length;flds++) {
                    fnEnableElement(fldSetTagElem[flds]);
                }
            }
            var l_blockId = fldSetElem[fs].getAttribute("block");//UTDFNDRL issue fixes start
            for(var vr = 0;vr < fldSetElem.length;vr++){
                var relation = relationArray[fldSetElem[vr].getAttribute("block")];
                if(typeof(relation)!= "undefined") {
                    relation = relation.substring(0, relation.length - 2);
                    if(relation == l_blockId && (fldSetElem[vr].getAttribute("type") == "ME" && fldSetElem[vr].getAttribute("view") == "ME")){
                        fnEnableElement(document.getElementById("cmdAddRow_"+fldSetElem[vr].getAttribute("block")));
                        fnEnableElement(document.getElementById("cmdDelRow_"+fldSetElem[vr].getAttribute("block")));
                        fnEnableElement(document.getElementById("BTN_SINGLE_VIEW_"+fldSetElem[vr].getAttribute("block")));
                    }
                }
            }//UTDFNDRL issue fixes end
        }
    }
}

function disableMESVTabFields(l_blockId) {

    var fldSetElem = document.getElementById("TBLPage" + strCurrentTabId).getElementsByTagName("fieldset");
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");
    for (var fs = 0;fs < fldSetElem.length;fs++) {
        if (fldSetElem[fs].getAttribute("type") == "ME" && fldSetElem[fs].getAttribute("view") == "SE" && selectNodes(dbDataDOM, getXPathQuery(fldSetElem[fs].getAttribute("block"))).length == 0) {
            if (typeof (l_blockId) != "undefined") {
                if (l_blockId == fldSetElem[fs].getAttribute("block"))
                    disableMESVBlockFields(eleArray, fldSetElem[fs]);
                else 
                    continue;
            }
            else 
                disableMESVBlockFields(eleArray, fldSetElem[fs]);
        }
    }
}

function disableMESVFields(l_blockId) {
	var block_Id = ""; //Fix for 9NT1606_14_1_RETRO_12_4_28113973 added
    var fldSetElem = document.getElementsByTagName("fieldset");
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");
    for (var fs = 0;fs < fldSetElem.length;fs++) {
        if (fldSetElem[fs].getAttribute("type") == "ME" && fldSetElem[fs].getAttribute("view") == "SE" && selectNodes(dbDataDOM, getXPathQuery(fldSetElem[fs].getAttribute("block"))).length == 0) {
            if (typeof (l_blockId) != "undefined") {
                if (l_blockId == fldSetElem[fs].getAttribute("block"))
                    disableMESVBlockFields(eleArray, fldSetElem[fs]);
                else 
                    continue;
            }
            else {//UTDFNDRL issue fixes start
	    	// l_blockId = fldSetElem[fs].getAttribute("block"); //Fix for 9NT1606_14_1_RETRO_12_4_28113973 commented
                block_Id = fldSetElem[fs].getAttribute("block"); //Fix for 9NT1606_14_1_RETRO_12_4_28113973 added
                for(var i = 0;i < fldSetElem.length;i++){
                    var relation = relationArray[fldSetElem[i].getAttribute("block")];
                    if(typeof(relation)!= "undefined") {
                        relation = relation.split("~");
			// if(relation[0] == l_blockId && (fldSetElem[i].getAttribute("type") == "ME" && fldSetElem[i].getAttribute("view") == "ME") && relation[1] == 'N'){ //Fix for 9NT1606_14_1_RETRO_12_4_28113973 commented
                        if(relation[0] == block_Id && (fldSetElem[i].getAttribute("type") == "ME" && fldSetElem[i].getAttribute("view") == "ME") && relation[1] == 'N'){ //Fix for 9NT1606_14_1_RETRO_12_4_28113973 added
                            //Fix for 22958086 
                            if(document.getElementById("cmdAddRow_"+fldSetElem[i].getAttribute("block"))){
                                fnDisableElement(document.getElementById("cmdAddRow_"+fldSetElem[i].getAttribute("block")));
                                document.getElementById("cmdAddRow_"+fldSetElem[i].getAttribute("block")).className = "BTNimgD";
                            }
                            if(document.getElementById("cmdDelRow_"+fldSetElem[i].getAttribute("block")))
                                fnDisableElement(document.getElementById("cmdDelRow_"+fldSetElem[i].getAttribute("block")));
                            fnDisableElement(document.getElementById("BTN_SINGLE_VIEW_"+fldSetElem[i].getAttribute("block")));
                        }
                    }
                }
                disableMESVBlockFields(eleArray, fldSetElem[fs]);
            }//UTDFNDRL issue fixes end*/
        }/*else if(fldSetElem[fs].getAttribute("type") == "ME" && fldSetElem[fs].getAttribute("view") == "ME"){//UTDFNDRL issue fixes start
               for(var vr = 0;vr < fldSetElem.length;vr++){
                    var relation = relationArray[fldSetElem[fs].getAttribute("block")];
                    relation = relation.substring(0, relation.length - 2);
                    if(relation == fldSetElem[vr].getAttribute("block") && (fldSetElem[vr].getAttribute("type") == "ME" && fldSetElem[vr].getAttribute("view") == "SE")){
                        fnDisableElement(document.getElementById("cmdAddRow_"+fldSetElem[fs].getAttribute("block")));
                        document.getElementById("cmdAddRow_"+fldSetElem[fs].getAttribute("block")).className = "BTNimgD";
                        fnDisableElement(document.getElementById("cmdDelRow_"+fldSetElem[fs].getAttribute("block")));
                        fnDisableElement(document.getElementById("BTN_SINGLE_VIEW_"+fldSetElem[fs].getAttribute("block")))
                    }
                }
        }//UTDFNDRL issue fixes end*/
    }
}

/*Fix for 18758052 Starts*/
function resetMESVFields() {
    var fldSetElem = document.getElementsByTagName("fieldset");
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");
    for (var fs = 0; fs < fldSetElem.length; fs++) {
        if (fldSetElem[fs].getAttribute("type") == "ME" && fldSetElem[fs].getAttribute("view") == "SE") {
			if (document.getElementById("TotPageSV__" + fldSetElem[fs].getAttribute("block"))) {
				setInnerText(document.getElementById("CurrPageSV__" + fldSetElem[fs].getAttribute("block")), 1);
				setInnerText(document.getElementById("TotPageSV__" + fldSetElem[fs].getAttribute("block")), 1);
				fnUpdateSEPgBtn(fldSetElem[fs].getAttribute("block"));
			}
			fldSetElem[fs].setAttribute("MESVNODE", "false");
			disableMESVBlockFields(eleArray, fldSetElem[fs]);
        }
    }
}
/*Fix for 18758052 Ends*/

function disableMESVBlockFields(eleArray, fldSetElem) {
    for (var i = 0;i < eleArray.length;i++) {
        var fldSetTagElem = fldSetElem.getElementsByTagName(eleArray[i]);
        for (var flds = 0;flds < fldSetTagElem.length;flds++) {
            if(fldSetTagElem[flds].getAttribute("name")){
                if (fldSetTagElem[flds].getAttribute("name").indexOf("BTN_ADD_") !=  - 1 || fldSetTagElem[flds].getAttribute("name").indexOf("BTN_REMOVE_") !=  - 1) {
                   fldSetTagElem[flds].setAttribute('disabled','false');
                //    fldSetTagElem[flds].className = "BTNimg";
                continue;
            }
            fnDisableElement(fldSetTagElem[flds]);
            }
        }
    }
}

function fnAddSingleViewRow(v_MESVblockId) {
    var fldSetObj = document.getElementsByTagName("fieldset");
    for (var i = 0;i < fldSetObj.length;i++) {
        if (fldSetObj[i].getAttribute("block") == v_MESVblockId && fldSetObj[i].getAttribute("type") == "ME" && fldSetObj[i].getAttribute("view") == "SE") {
            fldSetObj[i].setAttribute("MESVNODE", "true");
            resetElements(fldSetObj[i]);
            enableMESVFields(v_MESVblockId);
        }
    }
}

function fnSetDataSingleView(v_MESVblockId) {
    var fldSetObj = document.getElementsByTagName("fieldset");
    for (var i = 0;i < fldSetObj.length;i++) {
        if (fldSetObj[i].getAttribute("block") == v_MESVblockId && fldSetObj[i].getAttribute("type") == "ME" && fldSetObj[i].getAttribute("view") == "SE") {
            fnChangeLabelToText("TEXTAREA"); //9NT1606_12_2_RETRO_12_0_3_23651649 changes //9NT1606_12_2_RETRO_12_0_3_24526781 changes 
			fldSetObj[i].setAttribute("MESVNODE", "true");
            rootNode = selectSingleNode(dbDataDOM, "//" + v_MESVblockId + "[@ID=" + dbIndexArray[v_MESVblockId] + "]");
            setDataInSingleView(v_MESVblockId + "__", rootNode, fldSetObj[i]);
        }
    }
}

//Bug 14765812  - fix start
function setDataInSingleView(idPrefix, dataNode, obj) {
    //var childNode;
    if (dataNode) {
        for (var nodeIndex = 0;nodeIndex < dataNode.childNodes.length;nodeIndex++) {
            // bug 17795168 changes start 
            var childNode = dataNode.childNodes[nodeIndex];
            var inputElem = obj.getElementsByTagName("INPUT");
            elemFound = setElemDataInSingleView(inputElem, childNode, idPrefix);
            if (!elemFound) {
                var selectElem = obj.getElementsByTagName("SELECT");
                elemFound = setElemDataInSingleView(selectElem, childNode, idPrefix);
            }
            if (!elemFound) {
                var textareaElem = obj.getElementsByTagName("TEXTAREA");
                setElemDataInSingleView(textareaElem, childNode, idPrefix);
            }
        }
    }
}
//Bug 14765812  - fix end
// bug 17795168 changes present 
/* change to set data in Single View conditionally bug id : 14655036 starts */
function setElemDataInSingleView(elem, childNode, idPrefix) {
    var elemFound = false;
    for (var elementIndex = 0;elementIndex < elem.length;elementIndex++) {
        var currObject = elem[elementIndex];
        DBT = currObject.getAttribute("DBT");
        DBC = currObject.getAttribute("DBC");
        if (DBT && DBC) {
            if (currObject.id == idPrefix + childNode.nodeName) {
                if (document.getElementById(idPrefix + childNode.nodeName).type.toUpperCase() != 'RADIO') {
                    document.getElementById(idPrefix + childNode.nodeName).value = "";
                }
                setFieldData(document.getElementById(idPrefix + childNode.nodeName), getNodeText(childNode));
                elemFound = true;
                break;
            }
        }
    }
    return elemFound;
}

/*change to set data in Single View conditionally bug id : 14655036 ends */
// bug 17795168 changes present 
function fnDeleteSingleViewRow(v_MESVblockId) {
    if (dbIndexArray[v_MESVblockId] == 1) {
        var fldSetObj = document.getElementsByTagName("fieldset");
        for (var i = 0;i < fldSetObj.length;i++) {
            if (fldSetObj[i].getAttribute("block") == v_MESVblockId && fldSetObj[i].getAttribute("type") == "ME" && fldSetObj[i].getAttribute("view") == "SE")
                fldSetObj[i].setAttribute("MESVNODE", "false");
        }
        disableMESVFields(v_MESVblockId);
    }
}

// Fix for 19393979 - function added to reset dbIndexArray of child ME table having parent as a MESV  
function resetIndexForChildMETable(parentTable) {
    var childTable = findDescandants(parentTable);
    var childArray = childTable.split("~");
    var relation = "";
    for (var index = 0; index < childArray.length; index++) {
        if (childArray[index] != "") {
            var relationName = relationArray[childArray[index]];
            relation = relationName.substring(relationName.length - 1);
            if (relation == "N") {
               dbIndexArray[childArray[index]] = 1;
            }
        }
    }
}