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
Copyright   2004-2016   by Oracle Financial Services  Software Limited..
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

  **  Modified By          : MANOJ
  **  Modified On          : 31-MAR-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : REDWOOD_35101083
 
   **  Modified By         : Girish
  **  Modified On          : 07-Apr-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : redwood_35200441

   **  Modified By         : MANOJ S/Girish
  **  Modified On          : 20-Apr-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : redwood_35303675
                             redwood_35278374 
  **
   **  Modified By         : Bhawana Mishra
  **  Modified On          : 24-Apr-2023
  **  Modified Reason      : Added gAction New to enable the form for new action too and added the condition to check whether ONCEAUTH exist or not before checking its value.
  **  Search String        : redwood_35101083_1
  
     **  Modified By       : MANOJ S
  **  Modified On          : 27-Apr-2023
  **  Modified Reason      : Mutigrid Table Row,Selecting/Checking Next Row By Default after Deletion
  **  Search String        : redwood_35328612 
  **
  **  Modified By          : Manoj S
  **  Modified On          : 10-May-2023
  **  Reason               : Changes made to add new row with Editable of Non Amendable Fiedls 
  **  Search String        : REDWOOD_35327971
 
    **  Modified By        : Girish
  **  Modified On          : 07-Apr-2023
  **  Modified Reason      : Redwood Fixes for SE view type.
  **  Search String        : REDWOOD_35307988

  **  Modified By          : Manoj
  **  Modified On          : 12-May-2023
  **  Modified Reason      : As Changes of redwood_35328612 reverted and written logic to focus on the first row at after deletion .
  **  Search String        : REDWOOD_35363863
  
 
  **  Modified By          : Girish M
  **  Modified On          : 13-May-2023
  **  Modified Reason      : REDWOOD CHANGES
  **  Search String        : REDWOOD_35377810 
 
  **  Modified By          : Manoj
  **  Modified On          : 15-May-2023
  **  Modified Reason      : Table records needs to be refresh at after deletion .
  **  Search String        : REDWOOD_35390101
  
   
  **  Modified By          : Girish M
  **  Modified On          : 13-May-2023
  **  Modified Reason      : REDWOOD CHANGES OJ-TABLE Refresh
  **  Search String        : REDWOOD_35472205
  
  **  Modified By          : Girish M
  **  Modified On          : 1-Sep-2023
  **  Modified Reason      : Child OJ-table refresh was not happening during navigation of Single view multi entry. Code modfied to handle the same. 
  **  Search String        : REDWOOD_35732033
  
  **  Modified By          : Manoj
  **  Modified On          : 04-Sep-2023
  **  Modified Reason      : code added to Tab out from the Table.
  **  Search String        : REDWOOD_35358181
  
  **  Modified By          : Selvam Manickam
  **  Modified On          : 15-Sep-2023
  **  Modified Reason      : PRIMARY KEY/NON AMENDABLE FIELDS ARE GETTING ENABLED WHEN CLICK ON ME BLOCK
  **  Search String        : REDWOOD_35788845  
  
  **  Modified By          : Girish M
  **  Modified On          : 10-Nov-2023
  **  Modified Reason      : OJ-SELECTOR
  **  Search String        : REDWOOD_35917822 
  
  **  Modified By          : Manoj S
  **  Modified On          : 05-jan-2024
  **  Modified Reason      : pre and post navigate function call changes. 
  **  Search String        : redwood_36141712 
  
  **  Modified By          : Manoj S
  **  Modified On          : 17-jan-2024
  **  Modified Reason      : handle Multi Entry rows deletion and reseting the index. 
  **  Search String        : redwood_36168949
  
  **  Modified By          : Manoj S
  **  Modified On          : 09-May-2024
  **  Modified Reason      : handled multientry adding rows timing issue of Cross browser
  **  Search String        : redwood_36591056
  
  **  Modified By          : Manoj S
  **  Modified On          : 13-jun-2024
  **  Modified Reason      : handled multientry adding rows timing issue of Cross browser
  **  Search String        : redwood_36213474
  
  **  Modified By          : Manoj S
  **  Modified On          : 08-01-2025
  **  Modified Reason      : handled immediate child table data refreshment when multientry adding rows in parent.
  **  Search String        : REDWOOD_37441954

  **  Modified By          : Manoj S
  **  Modified On          : 27-01-2025
  **  Modified Reason      : handled focusing issue on new row when we add a new rows.
  **  Search String        : REDWOOD_37511777 
      
*/
/* ExtensibleME.js functions Start************************/
var isDeletRow=false;//REDWOOD_35327971
var ischkdelete=false;//redwood_36213474
var isNav =false; //REDWOOD_35377810 
var SelectChck = false; //REDWOOD_35917822 
var isaddrow=false;//REDWOOD_37441954
function fnAddRow(v_MeblockId) { 
//REDWOOD_CHANGES
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
           

   showDescendants(v_MeblockId);
var timer=300;
/*redwood_36213474 Commented 
//redwood_36591056 Starts
if (navigator.userAgent.indexOf("Firefox") != -1) {timer=100;} 
//redwood_36591056  ends
else if(ischkdelete){ //redwood_36213474
	timer=100
}
else{timer=10;} //redwood_36213474
*/ 

  setTimeout(function(){
//redwood_35303675 added 
isaddrow=true;//REDWOOD_37441954
			 fnUncheckAll(v_MeblockId);
       //    var numrows=getTableObjForBlock(v_MeblockId).tBodies[0].rows.length;  //redwood_36213474 commented
				var numrows=getOjTableRowsLength(v_MeblockId); //redwood_36213474 
				var crows=getTableObjForBlock(v_MeblockId).tBodies[0].rows;
				  if(numrows>0)
				  { 
					if(crows[numrows-1].cells[0].getElementsByTagName("INPUT")[0]){
						crows[numrows-1].cells[0].getElementsByTagName("INPUT")[0].click();
					}
					else{
						crows[numrows].cells[0].getElementsByTagName("INPUT")[0].click();
					}
				  }
//redwood_35303675 Ends
        appendTableValue(tableObject, 1, v_MeblockId);
		isaddrow=false;//REDWOOD_37441954
        try {
        if(!fnEventsHandler('fnPostAddRow_' + v_MeblockId)) return; //20978006 
    }
    catch (e) {
    }
	//redwood_35101083_1 starts
	//redwood_35278374 Starts
       /*  if(gAction=="MODIFY"){ 
	if (document.getElementsByName("ONCEAUTH")[0].value == 'N') {  
	} *///redwood_35278374 Ends
		if(gAction=="NEW"){
		enableForm();
	}
	else if (gAction=="MODIFY" && typeof(getElementsByOjName("ONCEAUTH")[0]) != 'undefined'){
		if (getElementsByOjName("ONCEAUTH")[0].value == 'N') { 
			enableForm(); 
			fnDisablePKFields();//REDWOOD_35788845
		}
	}
		//redwood_35101083_1 ends	
    
	   
	   checkAnFocusSelectedRow(v_MeblockId);
	   fnCheckToggleChkBox(v_MeblockId); //REDWOOD_37511777 added

    //},10); //REDWOOD_35101083
    },timer);//redwood_36591056

    fnAddSingleViewRow(v_MeblockId);
    fnAppendSingleViewData(v_MeblockId);
   //fnCheckToggleChkBox(v_MeblockId); //REDWOOD_37511777 commented


    
    });
}

function fnAddRow_Old(v_MeblockId) {  
//REDWOOD_CHANGES
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
//REDWOOD_CHANGES
	var tableObject = getTableObjForBlock(v_MeblockId);
    const busyContext = main_context.getContext(tableObject).getBusyContext();
    busyContext.whenReady().then(function() {	
//REDWOOD_CHANGES
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
  	
  	setTimeout(function(){	 //REDWOOD_CHANGES
    appendData();
    },0);
document.getElementById(v_MeblockId).refresh();//REDWOOD_35390101
//REDWOOD_CHANGES
//REDWOOD_35363863 Begins
	setTimeout(function(){	
	selectCurrow(v_MeblockId);
	checkAnFocusSelectedRow(v_MeblockId);
	fnCheckToggleChkBox(v_MeblockId);   //REDWOOD_37511777 added
		//redwood_36213474	
		var l_curPage = Number(document.getElementById('paging_'+v_MeblockId+'_nav_input').value);
        var l_totPage = getInnerText(getNextSibling( document.getElementById('paging_'+v_MeblockId+'_nav_input')));
        l_totPage = Number(l_totPage.split(' ')[1]); 
			if (l_curPage > l_totPage ) {
                    l_curPage = l_totPage;	
                        var ele = document.getElementById('paging_' + v_MeblockId).getElementsByTagName('a');
                        if (typeof ele[ele.length - 1] != 'undefined' && ele[1].className.includes("oj-pagingcontrol-nav-previous")) {
                            ele[1].click();
						}
			}

			//redwood_36213474 	
	},800);
//REDWOOD_35363863 Ends
   // fnCheckToggleChkBox(v_MeblockId);   //REDWOOD_37511777 commented
});
}
//REDWOOD_35363863 Begins
function selectCurrow(v_MeblockId){
		var mainTableObj = getTableObjForBlock(v_MeblockId);
			for(var rowLength=0;rowLength<mainTableObj.tBodies[0].rows.length;rowLength++) {
				 if(mainTableObj.tBodies[0].rows[0].cells[0].children[0]){
				if(mainTableObj.tBodies[0].rows[0].cells[0].children[0].tagName.toUpperCase()=='OJ-SELECTOR') {
							if(mainTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked == false){//redwood_35303675 starts
								mainTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].click();
							}
				}
			}
			}

return true;
}
//REDWOOD_35363863 ends
function handleOjetMEPagination(event, tname) {
 if (arguments.callee.caller && arguments.callee.caller.caller && arguments.callee.caller.caller.toString()) {
        if (arguments.callee.caller.caller.toString().indexOf("fnDeleteRowForMultipleEntry") >0) {
            return true;
        }
}

    var position;
    var l_gotoVal = 0;
    var srcElem = event.srcElement;
	    if (!fnEventsHandler('fnPreNavigate_' + tname.id)) //redwood_36141712 
        return;//redwood_36141712
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
    
    setTimeout(function(){
 //Navigate(position, tname.id, l_gotoVal); //REDWOOD_35377810
        var mainTableObj = getTableObjForBlock(tname.id); 
        for(var rowLength=0;rowLength<mainTableObj.tBodies[0].rows.length;rowLength++) {
			if(mainTableObj.tBodies[0].rows[0].cells[0].children[0]){
            if(mainTableObj.tBodies[0].rows[0].cells[0].children[0].tagName.toUpperCase()=='OJ-SELECTOR') {
                fnEventsHandler('fnPostAddNewRow_' + tname.id, mainTableObj.tBodies[0].rows[rowLength]);
             //REDWOOD_35377810 Starts
              if(rowLength >0 && mainTableObj.tBodies[0].rows[rowLength].cells[0].getElementsByTagName("INPUT")[0].checked == true){
                     mainTableObj.tBodies[0].rows[rowLength].cells[0].getElementsByTagName("INPUT")[0].click();
                 } 
              //REDWOOD_35377810   
            }
		}
        }
        //REDWOOD_35377810 
		if(mainTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked == false){
	             mainTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].click();
		}
    //REDWOOD_35377810 
	fnEventsHandler('fnPostNavigate_' + tname.id);//redwood_36141712
    },100);    
}	 
//REDWOOD_CHANGES
/* ME Navigation buttons*****************/

function Navigate(type, tname,l_gotoVal) {	  //REDWOOD_CHANGES
//REDWOOD_CHANGES
    mainWin.fnUpdateScreenSaverInterval();
//    var l_totalPg = Number(getInnerText(document.getElementById("TotPage__" + tname)));
//    if (l_totalPg == 1)
//        return;
    var htmlTableObj = getTableObjForBlock(tname);
    //REDWOOD_35377810 
	if(!isNav ){
	if(htmlTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0]){
	    htmlTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].focus();
		}
return;
}
//REDWOOD_35377810 
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
//REDWOOD_CHANGES
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

function SetDBIndexForGOTO(pstrBlockID, l_gotoVal,  pgsize, nodeList) { //REDWOOD_CHANGES
//REDWOOD_CHANGES
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
//REDWOOD_CHANGES
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
function fnMulipleEntryRow_onClick(e) {
    appendData();//Ashok: to add the last added child row element into dom???
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);	
//REDWOOD_CHANGES
    while(srcElement.tagName.toUpperCase()!='TD'){
        srcElement = srcElement.parentNode;
    }
    if((srcElement.children[0].tagName.toUpperCase()=='OJ-SELECTOR')){ //handling checkbox
		//REDWOOD_35917822  Starts
    if(srcElement.children[0]){
    var selectClass = srcElement.children[0].getElementsByTagName('span')[0].getAttribute("class");
        if (selectClass.includes('oj-selected')){
        SelectChck = true;
 
       }else{
			SelectChck = false;
	   }
     }
    // REDWOOD_35917822  Ends
        srcElement = getNextSibling(srcElement);
    }
    srcElement = srcElement.children[0].children[0];  
//REDWOOD_CHANGES
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
    if (SelectChck==false || srcElement.name == "chkDeleteRow" || (getPreviousSibling(srcElement) && getPreviousSibling(srcElement).name == "chkDeleteRow")) {//HTML5 changes 2/NOV/2016 Fix for 24940888 //REDWOOD_35917822 
        blockId = srcElement.getAttribute("DBT");
        currPg = Number(document.getElementById('paging_'+blockId+'_nav_input').value);	//REDWOOD_35917822 
        pgSize = getPgSize(blockId);
        if (srcElement.parentNode.tagName == "LABEL") {
           // dbIndexArray[blockId] = (currPg - 1) * pgSize + (srcElement.parentNode.parentNode.parentNode.rowIndex - 1);
           dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
            
        }
        else {
          //  dbIndexArray[blockId] = (currPg - 1) * pgSize + (srcElement.parentNode.parentNode.rowIndex - 1);
           dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
        }
        if (!srcElement.checked && srcElement.checked!=undefined) { //redwood_36213474
            setPrevDBIndexArray(blockId, currPg, pgSize, dbIndexArray[blockId]);
           // document.getElementById(blockId + "Header_CHK_ME").checked = false;//Static Header change //REDWOOD_35917822 
            deSelMod = getRowIndex(evnt);
            showDescendants(blockId,evnt);
			        SelectChck =true; //REDWOOD_35917822 
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
        //currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));//REDWOOD_CHANGES
        currPg = Number(document.getElementById('paging_'+blockId+'_nav_input').value);	 //REDWOOD_CHANGES
        pgSize = getPgSize(blockId);
            dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
//REDWOOD_CHANGES
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
if(isaddrow!=true){//REDWOOD_37441954
    showDescendants(blockId,evnt);
} //REDWOOD_37441954
   //var l_tbl_obj = document.getElementById(blockId);
    var rowIndx = 0;
    if (dbIndexArray[blockId] < pgSize) {
        rowIndx = dbIndexArray[blockId]; 
//REDWOOD_CHANGES
        }
    else {			 
//REDWOOD_CHANGES
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
//REDWOOD_CHANGES
            dbIndexArray[blockId] = (currPg - 1) * pgSize + getRowIndex(evnt);
 //REDWOOD_CHANGES           
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
//REDWOOD_CHANGES
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
    fnCheckToggleChkBox(blockId, e); //REDWOOD_CHANGES
    fnSetDataSingleView(blockId);
    if (!fnEventsHandler('fnPostRow_onClick_' + blockId, evnt))
        return;
}

function addRowShortcut(obj, e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var blockId = obj;	  
//REDWOOD_CHANGES
    if(!blockId||blockId==" "){
        return;  
    }	   
//REDWOOD_CHANGES
    if ((gAction != "" && gAction != "EXECUTEQUERY") || functionId == "CLRU") {
        var activeElement = "";
        var l_TableObj = getTableObjForBlock(blockId).tBodies[0];
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
        else if ((evnt.keyCode == 38) || (evnt.keyCode == 38 && srcElement.tagName == "BUTTON")) {
            //code for traversing rows up
            hotKeyPressed = true;//Bug 16519120 Changes
            if (srcElement.tagName != "SELECT") {
                activeElement = document.activeElement;	  
//REDWOOD_CHANGES
            var tdElem=findImmediateParentElement(evnt,'TD');
            var currentCellIndex=0;
	            if(tdElem)
	            {
	                currentCellIndex = tdElem.cellIndex;
	            }    
        
                var currentRow=findImmediateParentElement(evnt,'TR');
                var previousRow=currentRow.previousElementSibling;
                
                if (previousRow) {
	                 var  previousCell =previousRow.cells[currentCellIndex];
	                 var previousCellElement
                         if(currentCellIndex==0){
                            previousCellElement = findImmediateOJElement(previousCell).getElementsByTagName("span")[0].children[0];        
                         }else{
                            previousCellElement = findImmediateOJElement(previousCell);        
                         }	   
//REDWOOD_CHANGES
                preventpropagate(e);
	                 focusElement(previousCellElement);	 //REDWOOD_CHANGES
                 }    
                return false;
            }
        }
        else if ((evnt.keyCode == 40) || (evnt.keyCode == 40 && srcElement.tagName == "BUTTON")) {
            //code for traversing rows down
            hotKeyPressed = true;//Bug 16519120 Changes
            if (srcElement.tagName != "SELECT") {
                activeElement = document.activeElement;	 
//REDWOOD_CHANGES
            var tdElem=findImmediateParentElement(evnt,'TD');
            var currentCellIndex=0;
            if(tdElem)
            {
                currentCellIndex = tdElem.cellIndex;
            }    
            
              var currentRow=findImmediateParentElement(evnt,'TR');
    
                var nextRow=currentRow.nextElementSibling;
                
                if (nextRow) {

                     var  nextCell =nextRow.cells[currentCellIndex];
                     var nextCellElement;        
                     if(currentCellIndex==0){
                            nextCellElement = findImmediateOJElement(nextCell).getElementsByTagName("span")[0].children[0];        
                         }else{
                            nextCellElement = findImmediateOJElement(nextCell);        
                         }		
//REDWOOD_CHANGES
                preventpropagate(e);
                     focusElement(nextCellElement);			//REDWOOD_CHANGES
                 
                 }    
                return false;
            }
        }
        else if (evnt.keyCode == 33) {		
//REDWOOD_CHANGES
                document.getElementById('paging_'+obj).previousPage();
                focusElement(document.getElementById("paging_" + blockId+"_nav_input").getElementsByTagName('INPUT')[0]);
//REDWOOD_CHANGES
            preventpropagate(e);
            return false;
        }
        else if (evnt.keyCode == 34) {
                document.getElementById('paging_'+obj).nextPage();	  //REDWOOD_CHANGES
                focusElement(document.getElementById("paging_" + blockId+"_nav_input").getElementsByTagName('INPUT')[0]);//REDWOOD_CHANGES
            preventpropagate(e);
            return false;
        }
        else if (evnt.keyCode == 35) {
                document.getElementById('paging_'+obj).lastPage();	 //REDWOOD_CHANGES
                focusElement(document.getElementById("paging_" + blockId+"_nav_input").getElementsByTagName('INPUT')[0]);//REDWOOD_CHANGES
                preventpropagate(e);
                return false;
            }
        
        else if (evnt.keyCode == 36) {
                document.getElementById('paging_'+obj).firstPage();	  //REDWOOD_CHANGES
                focusElement(document.getElementById("paging_" + blockId+"_nav_input").getElementsByTagName('INPUT')[0]); //REDWOOD_CHANGES
                preventpropagate(e);
                return false;
            }
        else if (evnt.ctrlKey == true && evnt.keyCode == 37) { //REDWOOD_CHANGES
                focusElement(document.getElementById("BTN_SINGLE_VIEW_" + blockId)); //REDWOOD_CHANGES
            preventpropagate(e);
            return false;
            }	
//REDWOOD_CHANGES
        else if (evnt.ctrlKey == true && evnt.keyCode == 39) {
           var nextElement=document.getElementById("paging_" + blockId+"_nav_input").getElementsByTagName('INPUT')[0];
           if(nextElement.tabindex===0){
               focusElement(document.getElementById("paging_" + blockId+"_nav_input").getElementsByTagName('INPUT')[0]);
           }else{
            var  pageDivs=document.getElementById("paging_" + blockId+"_nav_input").getElementsByTagName('DIV');
            for(var index=0;index<pageDivs.length;index++){
            if(pageDivs[index].getAttribute("tabindex")==="0"){
                focusElement(pageDivs[index]);
                break;
            }
        }
        }	
//REDWOOD_CHANGES
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
    }		
//REDWOOD_CHANGES
     if (e.keyCode == 9) {
        var path = e.path || (e.composedPath && e.composedPath());
        if (isChildOf(path,'TD')) {
            if(e.shiftKey == true){
                handleTableTabAndShiftKey(e,blockId);
            }else{
                if( handleTableTabKey(e))//REDWOOD_35358181
				{
					document.getElementById(blockId).getElementsByTagName('oj-paging-control')[0].getElementsByTagName('oj-input-text')[0].focus();
					return true;
				}	
				else 
					{
						return false;//REDWOOD_35358181 Ends
					}
            }        
                return false;
        }else if (isChildOf(path,'TH')) {
            if(e.shiftKey == true){
                focusElement(getTableObjForBlock(blockId));
            }else{
                focusElement(findImmediateOJElement(findNextActiveTDElement(l_TableObj.rows[0].cells[0])).getElementsByTagName("span")[0].children[0]);
            }        
                return false;
        }else if(isChildOf(path,'TABLE')){
             if(e.shiftKey == true){	
//REDWOOD_CHANGES
                return true;	
//REDWOOD_CHANGES
            }else{
                focusElement(getTableObjForBlock(blockId).parentNode.parentNode.getElementsByTagName("span")[0].children[0]);
            }
                preventpropagate(e);
                return false;
        }else if(isChildOf(path,'OJ-PAGING-CONTROL')&&e.shiftKey == true){
                focusElement(getTableObjForBlock(blockId).parentNode.parentNode.getElementsByTagName("span")[0].children[0]);
                preventpropagate(e);
                return false;        
        }
        }
    return true;	
//REDWOOD_CHANGES
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
function fnAddRowMESV(v_MESVblockId) {
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
//REDWOOD_CHANGES	
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

  //REDWOOD_CHANGES
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
    var prevAction =gAction; //REDWOOD_35732033 
    gAction ='NAVIGATE'; //REDWOOD_35732033  

    displayPrevData(v_MESVblockId);

    appendData();
    fnChangeLabelToText("TEXTAREA");
    showTabData(strCurrentTabId);
    gAction= prevAction; //REDWOOD_35732033 
    fnUpdateSEPgBtn(v_MESVblockId);
    if (gAction == 'EXECUTEQUERY' || gAction == "") {
        var pviewmode = viewModeAction
        viewModeAction = true;
        disableAllElements("INPUT");
      //  fnEnableBlockCheckBox(); //REDWOOD_CHANGES
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
    var prevAction =gAction; //REDWOOD_35732033 
    gAction ='NAVIGATE'; //REDWOOD_35732033 

    displayNextData(v_MESVblockId);

    appendData();
    fnChangeLabelToText("TEXTAREA");
    showTabData(strCurrentTabId);
    gAction= prevAction; //REDWOOD_35732033 
    fnUpdateSEPgBtn(v_MESVblockId);
    if (gAction == 'EXECUTEQUERY' || gAction == "") {
        var pviewmode = viewModeAction
        viewModeAction = true;
        disableAllElements("INPUT");
        //fnEnableBlockCheckBox();//REDWOOD_CHANGES 
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
    var l_tableObj = getTableObjForBlock(blockId);
    for (var j = 0;j < l_tableObj.tBodies[0].rows.length;j++) {
		if (l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0]){
        if (l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].focus();
            return;
        }
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
//REDWOOD_CHANGES
function getOjTableRowsLength(blockId, doc) {//OJET Migration
    var length = 0;
	var slength=0; //redwood_36213474
    var tableObj = getTableObjForBlock(blockId, doc);
    if (tableObj == null) {
        length = 0;
    } else {
        length = tableObj.tBodies[0].rows.length;
        //redwood_36213474 starts
		if(length >1){
			
			for(i=0;i<length;i++){
				if(tableObj.tBodies[0].rows[i].cells[0].getElementsByTagName('OJ-SELECTOR').length>0){
				slength++;
				}
			}
			if(slength>0)
			{
				length=slength;
			}
		}
    //redwood_36213474 end
        else if (length > 0 && tableObj.tBodies[0].rows[0].cells[0].getElementsByTagName('OJ-SELECTOR').length > 0) {
           // length = length;
        } 
		else {
            length = 0;
        }
    }
    return length;
}
  //REDWOOD_CHANGES
/* Gets the Table object for the Given block name.*/
function getTableObjForBlock(blockId, doc) { 
//REDWOOD_CHANGES
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
//REDWOOD_CHANGES

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
	var rowObjlen= getOjTableRowsLength(blockId); //redwood_36213474
    for (var i = 0;i < rowObjlen;i++) {
        //rowObj[i].children[0].getElementsByTagName("INPUT")[0].checked = false;//redwood_35303675 commented
		//redwood_35303675 starts
		if(rowObj[i].cells[0].getElementsByTagName("INPUT")[0]){ //redwood_36213474
        if(rowObj[i].cells[0].getElementsByTagName("INPUT")[0].checked==true)
        {rowObj[i].cells[0].getElementsByTagName("INPUT")[0].click();}
	//redwood_35303675 ends
		}
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
//            if (document.getElementById("goto__" + childArray[index])) {//REDWOOD_CHANGES
//                document.getElementById("goto__" + childArray[index]).value = "";//12.0.3 ME changes//REDWOOD_CHANGES
//            }//REDWOOD_CHANGES
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
//REDWOOD_CHANGES Commented
//                var l_Pagesize = 0;
//                if (typeof (returnMEblockpageSize(childArray[index])) != "undefined")//getting the pagesize from SYS file array
//                    l_Pagesize = Number(returnMEblockpageSize(tableObj.id));
//                else 
//                    l_Pagesize = Number(tableObj.getAttribute("pgsize"));
//                if ((gAction == "EXECUTEQUERY" || gAction == "") && dbDataDOM != null && isPartialDOM) //21278347 
//                    recLength = getBlockStructure(childArray[index], true);
//                else 
                    recLength = nodeList.length;
             //   fnUpdatePgBtn(childArray[index], l_Pagesize, recLength);/*12.0.4 UI performance changes ends*/  //REDWOOD_CHANGES
          meArrayForAddDelete[childArray[index]]([]); //REDWOOD_35472205
            showPageWise(tableObj, childArray[index],nodeList); //REDWOOD_CHANGES
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
        //REDWOOD_CHANGES Comment
        //disableAllElements("OJ-INPUT-TEXT");
        //fnEnableBlockCheckBox();  
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        viewModeAction = pviewmode;
    }
	//redwood_35101083_1 starts
    //redwood_35278374 Starts
   /*if((gAction=="NEW") || (gAction=="MODIFY" && getElementsByOjName("ONCEAUTH")[0] != 'undefined' && getElementsByOjName("ONCEAUTH")[0].value == 'N')) { //redwood_35101083_1 added
    enableForm(); 
    } *///redwood_35278374 Ends
	
	if(gAction=="NEW"){
		enableForm();
	}
	else if (gAction=="MODIFY" && typeof(getElementsByOjName("ONCEAUTH")[0]) != 'undefined'){
		if (getElementsByOjName("ONCEAUTH")[0].value == 'N') { 
			enableForm(); 
		}
	} 
	//redwood_35101083_1 ends

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
    //document.getElementById(blockId + "Header_CHK_ME").checked = false;//Static Header change//redwood_35303675 commented
	getTableObjForBlock(blockId).tHead.rows[0].cells[0].getElementsByTagName("INPUT")[0].click();//redwood_35303675 
    if (l_length == 1) {
        //document.getElementById(blockId + "Header_CHK_ME").checked = true;//Static Header change//redwood_35303675 commented
		getTableObjForBlock(blockId).tHead.rows[0].cells[0].getElementsByTagName("INPUT")[0].click();////redwood_35303675 
        return;
    }

    if (typeof (document.getElementById(blockId).rows) != 'undefined') {
        l_length = getOjTableRowsLength(blockId);
        l_tblElement = getTableObjForBlock(blockId);
    }
    else {
        l_length = getOjTableRowsLength(blockId);
        l_tblElement = getTableObjForBlock(blockId).tBodies[0];
    }

    var chkLen = 0;
    for (var chk = 0;chk <= l_length-1;chk++) {
        if (l_tblElement.rows[chk].cells[0].getElementsByTagName("INPUT")[0].checked) {
            chkLen++;
        }
    }
    if (chkLen != Number(l_tblElement.rows.length) - 1) {
        if (getTableObjForBlock(blockId).tHead.rows[0].cells[0].getElementsByTagName("INPUT")[0].checked == true){//Static Header change//redwood_35303675
		getTableObjForBlock(blockId).tHead.rows[0].cells[0].getElementsByTagName("INPUT")[0].click();}//redwood_35303675
    } else {
        if (l_tblElement.rows.length > 1) {
            //document.getElementById(blockId + "Header_CHK_ME").checked = true;//Static Header change
			getTableObjForBlock(blockId).tHead.rows[0].cells[0].getElementsByTagName("INPUT")[0].click();//redwood_35303675
        }
    }
}

//Me pagination button changes  ******************************************************/
function fnResetPgBtn() {
//REDWOOD_CHANGES
//    for (var i = 0;i < multipleEntryIDs.length;i++) {
//        if (document.getElementById(multipleEntryIDs[i])) {
//            disableAllButtons(multipleEntryIDs[i])
//            setInnerText(document.getElementById("CurrPage__" + multipleEntryIDs[i]), 1);
//            setInnerText(document.getElementById("TotPage__" + multipleEntryIDs[i]), 1);
//            document.getElementById("goto__" + multipleEntryIDs[i]).readOnly = true;
//            document.getElementById("go__" + multipleEntryIDs[i]).disabled = true;
//        }
//    }	  
//REDWOOD_CHANGES
}

//ME pagination changes
function disableAllButtons(pstrBlockID) {
//REDWOOD_CHANGES
//    if (document.getElementById(pstrBlockID)) {   
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
//REDWOOD_CHANGES
}

//ME pagination changes
function enableAllButtons(pstrBlockID) {
//REDWOOD_CHANGES
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
//REDWOOD_CHANGES
}					  


function fnUpdatePgBtn(pstrBlockID, Pagesize, TotRows) {
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
//REDWOOD_CHANGES
           // document.getElementById("nNext__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nNext__" + pstrBlockID));
            //document.getElementById("nLast__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nLast__" + pstrBlockID));
//REDWOOD_CHANGES
        }
        else if (l_CurPage == l_TotalPages) {
            document.getElementById("nFirst__" + pstrBlockID).disabled = false;
            document.getElementById("nPrev__" + pstrBlockID).disabled = false;
//REDWOOD_CHANGES
           // document.getElementById("nFirst__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nFirst__" + pstrBlockID));
           // document.getElementById("nPrev__" + pstrBlockID).className = "BTNicon2";
            //fnHover(document.getElementById("nPrev__" + pstrBlockID));
//REDWOOD_CHANGES
        }
        else {
            enableAllButtons(pstrBlockID);
        }
//REDWOOD_CHANGES
//        document.getElementById("go__" + pstrBlockID).disabled = false;
//        document.getElementById("go__" + pstrBlockID).className = "BTNtext";
//        //fnHover(document.getElementById("go__" + pstrBlockID));
//        document.getElementById("goto__" + pstrBlockID).readOnly = false;
//        document.getElementById("goto__" + pstrBlockID).className = "TXTstd";  
//REDWOOD_CHANGES
    }
//REDWOOD_CHANGES
   // setInnerText(document.getElementById("TotPage__" + pstrBlockID), l_TotalPages);
    //setInnerText(document.getElementById("CurrPage__" + pstrBlockID), l_CurPage);
//	if(document.getElementById("go__" + pstrBlockID).disabled != true && getIEVersionNumber()== 9 ){ //21603599 starts
//        fireHTMLEvent(document.getElementById("go__" + pstrBlockID), "onmouseover");
//    }		
//REDWOOD_CHANGES
}

function fnUpdateSEPgBtn(pstrBlockID) {
    try {
        var prevBtn = document.getElementsByName("BTN_PREV_" + pstrBlockID)[0];
        var nextBtn = document.getElementsByName("BTN_NEXT_" + pstrBlockID)[0];
        var curPage = Number(getInnerText(document.getElementById("CurrPageSV__" + pstrBlockID)));
        var totPage = Number(getInnerText(document.getElementById("TotPageSV__" + pstrBlockID)));

        if (curPage == totPage && curPage != 1) {
            //prevBtn.className = "BTNicon2"; //REDWOOD_CHANGES
            prevBtn.disabled = false;
            //nextBtn.className = "BTNicon2D";  //REDWOOD_CHANGES
            nextBtn.disabled = true;
            return;
        }
        else if (totPage > 1 && curPage == 1) {
            //prevBtn.className = "BTNicon2D";  //REDWOOD_CHANGES
            prevBtn.disabled = true;
           // nextBtn.className = "BTNicon2";	 //REDWOOD_CHANGES
            nextBtn.disabled = false;
        }
        else if (totPage > 1 && curPage > 1) {
            //prevBtn.className = "BTNicon2";	 //REDWOOD_CHANGES
            prevBtn.disabled = false;
            //nextBtn.className = "BTNicon2";	  //REDWOOD_CHANGES
            nextBtn.disabled = false;
        }
        else {
            //prevBtn.className = "BTNicon2D";	  //REDWOOD_CHANGES
            prevBtn.disabled = true;
            //nextBtn.className = "BTNicon2D";	 //REDWOOD_CHANGES
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
    var l_Pgsize = getPgSize(pstrBlockID);/*12.0.4 UI performance changes*/ //REDWOOD_CHANGES
    var l_curPage = 1;
    var l_totPages = 1;
    if (l_tabObj) {		

//REDWOOD_CHANGES
        //l_totPages = Number(getInnerText(document.getElementById("TotPage__" + pstrBlockID)));
        l_curPage = Number(document.getElementById('paging_'+pstrBlockID+'_nav_input').value);
        l_totPage = getInnerText(getNextSibling( document.getElementById('paging_'+pstrBlockID+'_nav_input')));
        l_totPage = Number(l_totPage.split(' ')[1]);  
//REDWOOD_CHANGES

        for (i = l_tabObj.tBodies[0].rows.length - 1;i >= 0;i--) {

            if (l_tabObj.tBodies[0].rows[i].cells[0].children[0].children[0].children[0].checked) { //REDWOOD_CHANGES
               
                dbIndexArray[pstrBlockID] = (l_curPage - 1) * l_Pgsize + (i + 1);
        //REDWOOD_CHANGES
                showTable(false);
                meArrayForAddDelete[pstrBlockID].splice((dbIndexArray[pstrBlockID]-1) ,1);
                showTable(true);	
        //REDWOOD_CHANGES
                var l_CurNode = selectSingleNode(dbDataDOM, getXPathQuery(pstrBlockID) + "[@ID=" + dbIndexArray[pstrBlockID] + "]");
                l_CurNode.parentNode.removeChild(l_CurNode);
                var l_nodeList = selectNodes(dbDataDOM, getXPathQuery(pstrBlockID));
                resetNodeIdAttributes(l_nodeList);
                l_totPages = Math.ceil(Number(l_nodeList.length) / l_Pgsize);
                if (l_curPage > l_totPages) {
                    l_curPage = l_totPages;	   
             //REDWOOD_CHANGES
                     //setTimeout(function () {
                        var ele = document.getElementById('paging_' + pstrBlockID).getElementsByTagName('a');
                        if (typeof ele[ele.length - 1] != 'undefined' && ele[1].className.includes("oj-pagingcontrol-nav-previous")) {
                            ele[1].click();
                }
            }
                
            }
        }
       /* if (l_tabObj.rows.length == 1) { 
            document.getElementById(pstrBlockID + "Header_CHK_ME").checked = true;//Static Header change
        }
        else {
            document.getElementById(pstrBlockID + "Header_CHK_ME").checked = false;//Static Header change
        } */
       
        // document.getElementById(pstrBlockID).refresh(); //redwood_35200441
   //REDWOOD_CHANGES  
		if(l_curPage>0){ //redwood_36168949
        dbIndexArray[pstrBlockID] = Number((l_curPage - 1) * l_Pgsize) + 1;
		}//redwood_36168949
//REDWOOD_CHANGES
		isDeletRow=true;//REDWOOD_35327971
       // var l_nodeList = selectNodes(dbDataDOM, getXPathQuery(pstrBlockID));
        //fnUpdatePgBtn(pstrBlockID, l_Pgsize, l_nodeList.length);
       // showTabData(strCurrentTabId); //redwood_35328612 uncommented REDWOOD_35363863 commented
//REDWOOD_CHANGES

    }

}

function deleteAllRows(tableName) {
    var tableObject = getTableObjForBlock(tableName);
    if (tableObject) {			
//REDWOOD_CHANGES
       // if (!tableObject.getAttribute("VIEW")) {
           // setInnerText(tableObject.tBodies[0], "");
            meArrayForAddDelete[tableName]([]);
            document.getElementById(tableName).refresh();
       // }	 
//REDWOOD_CHANGES
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
    var arrEle = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");//REDWOOD_CHANGES
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
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");//REDWOOD_CHANGES
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
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");//REDWOOD_CHANGES
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
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON");//REDWOOD_CHANGES
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
    var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","OJ-BUTTON"); //REDWOOD_CHANGES
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
//REDWOOD_CHANGES
            if(fldSetTagElem[flds].getAttribute("name")){
                if (fldSetTagElem[flds].getAttribute("name").indexOf("BTN_ADD_") !=  - 1 || fldSetTagElem[flds].getAttribute("name").indexOf("BTN_REMOVE_") !=  - 1) {
                   fldSetTagElem[flds].setAttribute('disabled','false');
                //    fldSetTagElem[flds].className = "BTNimg";	  
//REDWOOD_CHANGES
                continue;
            }
            fnDisableElement(fldSetTagElem[flds]);
            }	 //REDWOOD_CHANGES
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
        //REDWOOD_35307988 Starts
         if(currObject.type.toUpperCase()!= 'RADIO' && currObject.type.toUpperCase()!= 'CHECKBOX'){
       // DBT = currObject.getAttribute("DBT");
        //DBC = currObject.getAttribute("DBC");
			 if (currObject.getAttribute("ID")!=null){
        DBT = currObject.getAttribute("ID").split('__')[0]; 
        DBC = currObject.getAttribute("NAME");
			 }
         }else if(currObject.type.toUpperCase()== 'RADIO'){
          DBT = currObject.getAttribute("NAME").split('__')[0]; 
          DBC =currObject.getAttribute("NAME").split('__')[1]; 
         }
       //REDWOOD_35307988 Ends
        if (DBT && DBC) {
            if (currObject.id == idPrefix + childNode.nodeName +"|input"){ //REDWOOD_35307988 Added
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