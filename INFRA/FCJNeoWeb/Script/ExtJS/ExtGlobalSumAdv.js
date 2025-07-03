/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtGlobalSumAdv.js
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
**  Modified On          : 28-Jun-2017 
**  Modified Reason      : Code changes to handle save query feature when recommended search 
                           criteria search in Advanced search is used. Also changes done to handle 
                           modification of existing save criteria 
**  Retro Source         : 9NT1606_12_2_NORTHERN_TRUST_COMPANY
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230635 

**
**  Modified By          : Selvam Manickam
**  Modified On          : 12-May-2023
**  Modified Reason      : FOR ADVANCED SEARCH - CLEAR QUERY NOT WORKING PROPERLY IN SUMMARY SCREEN
**  Search String        : REDWOOD_35239371

**  Modified By          : Ramalingam R
**  Modified On          : 17-May-2023
**  Modified Reason      : Records are not filtering based on the values given in checkbox field in Advanced search.
						   Changes done in function - fnAcceptQuery(opt)
**  Search String        : REDWOOD_35239371
----------------------------------------------------------------------------------------------------
*/
var forNumber = new Array(6);
var forText = new Array(4);
var lovHtml = "";
var lovHtml1 = "";
var selectedFields="";//12.1 summary performance changes 
fromAdvanced = "true";

var recommendedListView; //REDWOOD_CHANGES
var optionalListView //REDWOOD_CHANGES

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

function fnFillOperators(e) {
    var operator = document.getElementById("idSelectOp");
    //12.1 summary performance changes start
    var fields =selectedFields;   
    //12.1 summary performance changes End
    dataType = fields.options[fields.options.selectedIndex].getAttribute("DTYPE");
    operator.options.length = 0;
    if (document.getElementById("idTextFieldValue")) document.getElementById("idTextFieldValue").value = '';
    //document.getElementById("idTextFieldValue2").value='';
    // Murali Starts Changes to Resolve Object Expected error in Advance Query
    if (document.getElementById("idTextFieldValue2")) document.getElementById("idTextFieldValue2").value = '';
    // Murali Ends Changes to Resolve Object Expected error Advance Query
    switch (dataType) {
    case 'VARCHAR':
    case 'VARCHAR2':
    case 'CHAR':
        for (var arrLen = 0; arrLen < forText.length; arrLen++) {
            operator.options[operator.options.length] = forText[arrLen];
        }
        break;
    case 'NUMERIC':
    case 'NUMBER':
    case 'DECIMAL':
    case 'INTEGER':
    case 'SMALLINT':
        for (var arrLen = 0; arrLen < forNumber.length; arrLen++) {
            operator.options[operator.options.length] = forNumber[arrLen];
        }
        break;

    case 'DATE':
        for (var arrLen = 0; arrLen < forNumber.length; arrLen++) {
            operator.options[operator.options.length] = forNumber[arrLen];
        }
        break;
    case 'CHAR':
        for (var arrLen = 0; arrLen < 2; arrLen++) {
            operator.options[operator.options.length] = forNumber[arrLen];
        }
        break;
	// Fix for 19233688 starts
	case 'DATETIME':
        for (var arrLen = 0; arrLen < forNumber.length; arrLen++) {
            operator.options[operator.options.length] = forNumber[arrLen];
        }
        break;
	// Fix for 19233688 ends
    default:
        break;
    }
    fnChangeDisplay(e);
}

function fnBuildAdvLOV(advLovReturnFld, e) {
     //12.1 summary performance changes start
    //var field = selectedFields;     //REDWOOD_CHANGES
    var selFieldData = selectedFields.split('~');  //REDWOOD_CHANGES
    //12.1 summary performance changes End
    var customLov = "N";		  
//REDWOOD_CHANGES
    /*if (fields.options.selectedIndex == -1) {	 
        alert(selectElement);
        return;
    }*/
    var fieldName = selFieldData[0].split("__")[1];
    var fieldLabel = selFieldData[2];
    var fieldDtype = selFieldData[1];
//REDWOOD_CHANGES

    fnBuildExtSummaryLOV(fieldName, fieldLabel, fieldDtype, advLovReturnFld, e);
}

function fnClearQuery() {
    try {		  
//REDWOOD_CHANGES
        var advQryTblRows = getTableObjForBlock("idadvQuryHeaderTable").tBodies[0].rows;
		var tmp=0; //REDWOOD_35239371
        var cur;   //REDWOOD_35239371 
        for (i = 0;i < advQryTblRows.length;i++) {
            if(advQryTblRows[i].cells[0].children.length > 0 && advQryTblRows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
				//REDWOOD_35239371 START
				cur=i-tmp;
                //meArrayForAddDelete['advQuery'].splice(i, 1);
				meArrayForAddDelete['advQuery'].splice(cur, 1);
				tmp++;
				//REDWOOD_35239371 END
            }
        }  
//REDWOOD_CHANGES
    } catch (e) {
        alert(e);
    }
    document.getElementById("idadvQuryHeaderTable").refresh();	//REDWOOD_CHANGES
}

function fnClearOrderBy() {
    try {  
//REDWOOD_CHANGES
        var advOdrTblRows = getTableObjForBlock("idadvOrderHeaderTable").tBodies[0].rows;
		var tmp=0; //REDWOOD_35239371
        var cur;   //REDWOOD_35239371
        for (i = 0;i < advOdrTblRows.length;i++) {
            if(advOdrTblRows[i].cells[0].children.length > 0 && advOdrTblRows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
				//REDWOOD_35239371 START
				cur=i-tmp;
                //meArrayForAddDelete['advOrderBy'].splice(i, 1);
				meArrayForAddDelete['advOrderBy'].splice(cur, 1);
				tmp++;
				//REDWOOD_35239371 END
                }
            }	
//REDWOOD_CHANGES
    } catch (e) {
        alert(e);
    }
    document.getElementById("idadvOrderHeaderTable").refresh();	//REDWOOD_CHANGES
}


function fnAcceptOrderBy() {
    var selOption;
    //12.1 summary performance changes start
    var selField =selectedFields.split('~');//REDWOOD_CHANGES
    //12.1 summary performance changes end
    var selDir = document.getElementById("idSelectSortDirection");
   //REDWOOD_CHANGES 
    //Ojet changes - Sujitha
    var singleRecObj = Object.assign( {
        },
        multipleEntryFieldList[multipleEntryFieldList['advOrderBy']]);
        
        singleRecObj['orderByField'] = selField[0].split("__")[1];
        singleRecObj['orderByValue'] = selDir.value;
        
        meArrayForAddDelete['advOrderBy'].push(singleRecObj);
    //REDWOOD_CHANGES
   /* if (selField.selectedIndex > -1 && selDir.selectedIndex > -1) {  //REDWOOD_CHANGES
        selOption = selField.options[selField.selectedIndex];

        var table = document.getElementById("idadvOrderTable").tBodies[0];
        var row = document.createElement("TR");
        if (table.rows.length % 2 == 0) {
            row.className = "TBLoneTR";
            row.setAttribute("onblur", "this.className='TBLoneTR'");
            row.setAttribute("onmouseover", "this.className='TBLoneTRhover'");
            row.setAttribute("onfocus", "this.className='TBLoneTRhover'");
            row.setAttribute("onmouseout", "this.className='TBLoneTR'");
        } else {
            row.className = "TBLoneTRalt";
            row.setAttribute("onblur", "this.className='TBLoneTRalt'");
            row.setAttribute("onmouseover", "this.className='TBLoneTRhover'");
            row.setAttribute("onfocus", "this.className='TBLoneTRhover'");
            row.setAttribute("onmouseout", "this.className='TBLoneTRalt'");
        }

        table.appendChild(row);
        var cell1 = document.createElement("TD");
        row.appendChild(cell1);
        cell1.className = "TBLoneTD1";
        cell1.setAttribute("scope", "row");
        var div1 = document.createElement("div");//static header change
        cell1.appendChild(div1); //static header change
        var element1 = document.createElement("input");
        element1.type = "checkbox";
        element1.className = "CHKstd";
        div1.appendChild(element1); //static header change

        var cell2 = document.createElement("TD");
        row.appendChild(cell2);
        cell2.setAttribute("scope", "row");
        var div2 = document.createElement("div");//static header change
        cell2.appendChild(div2); //static header change
        var element2 = document.createElement("span");
        element2.className = "Astd";
        setInnerText(element2, selOption.value);
        div2.appendChild(element2); //sttaic header change

        var cell3 = document.createElement("TD");
        row.appendChild(cell3);
        cell3.setAttribute("scope", "row");
        var div3 = document.createElement("div");//static header change
        cell3.appendChild(div3); //static header change
        var element2 = document.createElement("span");
        element2.className = "Astd";
        setInnerText(element2, selDir.value);
        div3.appendChild(element2); //static header change

        var cell4 = document.createElement("TD");
        row.appendChild(cell4);
        cell4.width = "99%";
        cell4.setAttribute("scope", "row");
        var div4 = document.createElement("div");//static header change
        cell4.appendChild(div4); //static header change
    }
    fnSyncOrderTableWidth();*/ //static header change	 //REDWOOD_CHANGES
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

function fnCheckOperator() {
    var operator = document.getElementById("idSelectOp");
    //12.1 summary performance changes start
    // var fields = document.getElementById("idSelectField");
    var fields = selectedFields;
    //12.1 summary performance changes end
    dataType = fields.options[fields.options.selectedIndex].getAttribute("DTYPE");
    type = fields.options[fields.options.selectedIndex].getAttribute("TYPE");
    /* Fix for 18260762 */
    //if (type.toUpperCase() != 'DATE' && type.toUpperCase() != 'AMOUNT') {
    if (type.toUpperCase() != 'DATE') {
        if ((trim(operator.value)).toUpperCase() == "BETWEEN") {
            if (document.getElementById("idTextFieldValue2")) {
                document.getElementById("idTextFieldValue2").disabled = false;
                fnEnableElement(document.getElementById("idTextFieldValue2"));
                getNextSibling(document.getElementById("idTextFieldValue2")).className = "BTNimg";
            }
        } else {
            if (document.getElementById("idTextFieldValue2")) {
                fnDisableElement(document.getElementById("idTextFieldValue2"));
                document.getElementById("idTextFieldValue2").disabled = true;
                fnDisableElement(document.getElementById("idTextFieldValue2"));
                getNextSibling(document.getElementById("idTextFieldValue2")).className = "BTNhide";
            }
        }
    } else {
        if ((trim(operator.value)).toUpperCase() == "BETWEEN") {
            if (document.getElementById("idTextFieldValue2")) {
                getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))).disabled = false;
                fnEnableElement(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))));
                getNextSibling(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2")))).className = "BTNimg";
            }
        } else {
            if (document.getElementById("idTextFieldValue2")) {
                fnDisableElement(document.getElementById("idTextFieldValue2"));
                getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))).disabled = true;
                fnDisableElement(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2"))));
                getNextSibling(getNextSibling(getNextSibling(document.getElementById("idTextFieldValue2")))).className = "BTNhide";
            }
        }
    }
}

function fnChangeDisplay(e) {
    var calHtml1 = "";
    var calHtml2 = "";
    var amtHtml1 = "";
    var amtHtml2 = "";
    //12.1 summary performance changes start
     var fields =selectedFields;
    //12.1 summary performance changes End
    var type = fields.options[fields.options.selectedIndex].getAttribute("TYPE").toUpperCase();
    var advTblObj = document.getElementById("TblAdvanced");

    switch (type) {
    case 'TEXT':
    case 'RESTRICTED_TEXT':
    case 'DATETIME':
	case 'TEXTAREA':
        {
             //12.1 summary performance changes new start
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = lovHtml;
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = lovHtml1;
            //12.1 summary performance changes new end
            
            if ((trim(document.getElementById("idSelectOp").value)).toUpperCase() == "BETWEEN") fnCheckOperator();
            break;
        }
    case 'CHECKBOX':
        {
            //var THElem = parent.document.getElementById("TBL_QryRslts").getElementsByTagName("TH"); //Checkbox Changes //12_2_INTERBNAL_24651877 Commented
            var THElem = parent.document.getElementById("TBL_QryRsltsHeader").getElementsByTagName("TD"); //12_2_INTERBNAL_24651877 Changes
            var onValue = "";
            var offValue = "";
            for (var j = 0; j < THElem.length; j++) {
                //Fix for 19498964 starts
				//if (THElem[j].id == fields.options[fields.options.selectedIndex].getAttribute("blk_name")) {
				if (THElem[j].getAttribute("name") == fields.options[fields.options.selectedIndex].getAttribute("blk_name").split("__")[1]) { //Fix for 19498964 ends
                    onValue = THElem[j].getAttribute("ON");
                    offValue = THElem[j].getAttribute("OFF");
                    break;
                }
            }
		//12.1 summary performance changes new start
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = '<label class="LBLChkRadSel NewChkbox" for="idTextFieldValue"><input type="checkbox" name="idTextFieldValue" id="idTextFieldValue" onchange="fnCheckOperator()" ON="' + onValue + '" OFF="' + offValue + '" ></input><div class="DIVChkRadSel"><span></span></div>'+ mainWin.getItemDesc("LBL_VALUE")+'</label>' ;//HTML5 Changes//HTML5 changes 24/OCT/2016//HTML5 changes 14/NOV/2016
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = "";
		//12.1 summary performance changes new end
            break;
        }
    case 'AMOUNT':
        {
            /*Fix for 18260762  Starts*/
            /*amtHtml1 += '<label class="LBLinv" for="idTextFieldValue"></label>';
            amtHtml1 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue" name="idTextFieldValue" onpropertychange="displayAmount(this)">';
            amtHtml1 += '<label for="idTextFieldValueI">' + mainWin.getItemDesc("LBL_VALUE") + '</label>';
            amtHtml1 += '<INPUT TYPE="TEXT" class="TXTstd" id="idTextFieldValueI" name="idTextFieldValueI" onblur=\"validateInputAmount(\'idTextFieldValue\', event)\" >';*/
            amtHtml1 += '<label for="idTextFieldValue">' + mainWin.getItemDesc("LBL_VALUE") + '</label>';
            amtHtml1 += '<INPUT TYPE="TEXT" class="TXTstd" id="idTextFieldValue" name="idTextFieldValue"  onblur=\"validateSummaryNumberfield(\'idTextFieldValue\', event)\">';
            /*Fix for 18260762 Ends*/
            amtHtml1 += '<BUTTON id="cmdLOV" onClick=\"fnBuildAdvLOV(\'idTextFieldValue\', event)\" class="BTNimg" ';
            amtHtml1 += 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
            amtHtml1 += 'onmouseout=\"this.className=\'BTNimg\'\">';
            amtHtml1 += '<span tabindex="-1" class="ICOlov"></span>';
            amtHtml1 += '</BUTTON> ';

            /*Fix for 18260762  Starts*/
            /*amtHtml2 += '<label class="LBLinv" for="idTextFieldValue2"></label>';
            amtHtml2 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue2" name="idTextFieldValue2" onpropertychange="displayAmount(this)">';
            amtHtml2 += '<label for="idTextFieldValue2I">' + mainWin.getItemDesc("LBL_TO") + '</label>';
            amtHtml2 += '<INPUT TYPE="TEXT" class="TXTro" id="idTextFieldValue2I" name="idTextFieldValue2I" disabled ="true" size="16" onblur=\"validateInputAmount(\'idTextFieldValue2\', event)\" >';*/
            amtHtml2 += '<label for="idTextFieldValue2">' + mainWin.getItemDesc("LBL_TO") + '</label>';
            amtHtml2 += '<INPUT TYPE="TEXT" class="TXTro" id="idTextFieldValue2" name="idTextFieldValue2" disabled ="true" size="16"  onblur=\"validateSummaryNumberfield(\'idTextFieldValue2\', event)\">';
            /*Fix for 18260762  Ends*/
            amtHtml2 += '<BUTTON id="cmdLOV" onClick=\"fnBuildAdvLOV(\'idTextFieldValue2\', event)\" disabled ="true" class="BTNhide">';
            amtHtml2 += '<span tabindex="-1" class="ICOlov"></span>';
            amtHtml2 += '</BUTTON> ';
			//12.1 summary performance changes new start
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = amtHtml1;
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = amtHtml2;
			//12.1 summary performance changes new end
            if ((trim(document.getElementById("idSelectOp").value)).toUpperCase() == "BETWEEN") fnCheckOperator();
            break;
        }

    case 'DATE':
        {
            calHtml1 += '<label class="LBLinv" for="idTextFieldValue"></label>';
            calHtml1 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue" name="idTextFieldValue" onpropertychange="displayDate(this)">';
            calHtml1 += '<label for="idTextFieldValueI">' + mainWin.getItemDesc("LBL_VALUE") + '</label>';
            calHtml1 += '<INPUT TYPE="TEXT" class="TXTstd" id="idTextFieldValueI" name="idTextFieldValueI" onblur=\"validateInputDate(\'idTextFieldValue\', event)\" >';
            calHtml1 += '<BUTTON id="cmdLOV" onClick=\"disp_cal_sum(\'idTextFieldValue\',event)\" class="BTNimg" ';//Summary save - calendar changes
            calHtml1 += 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
            calHtml1 += 'onmouseout=\"this.className=\'BTNimg\'\">';
            calHtml1 += '<span tabindex="-1" class="ICOcalendar"></span>';
            calHtml1 += '</BUTTON> ';

            calHtml2 += '<label class="LBLinv" for="idTextFieldValue2"></label>';
            calHtml2 += '<INPUT TYPE="HIDDEN" id="idTextFieldValue2" name="idTextFieldValue2" onpropertychange="displayDate(this)">';
            calHtml2 += '<label for="idTextFieldValue2I">' + mainWin.getItemDesc("LBL_TO") + '</label>';
            calHtml2 += '<INPUT TYPE="TEXT" class="TXTro" id="idTextFieldValue2I" name="idTextFieldValue2I" size="16" disabled ="true" onblur=\"validateInputDate(\'idTextFieldValue2\', event)\" >';
            calHtml2 += '<BUTTON id="cmdLOV" onClick=\"disp_cal_sum(\'idTextFieldValue2\',event)\" disabled ="true" class="BTNhide">';//Summary save - calendar changes
            calHtml2 += '<span tabindex="-1" class="ICOcalendar"></span>';
            calHtml2 += '</BUTTON> ';
			//12.1 summary performance changes new start
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = calHtml1;
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = calHtml2;
			//12.1 summary performance changes new end
            if ((trim(document.getElementById("idSelectOp").value)).toUpperCase() == "BETWEEN") fnCheckOperator();
            break;
        }
    default:
        {
            var optionFlds = parent.fnGetOptions();
            var optionValues = optionFlds[fields.options[fields.options.selectedIndex].value].split("~");
            var optionHTML = "<OPTION value ='' selected DEFAULT =''></OPTION>";
            for (var i = 0; i < optionValues.length - 1; i++) {
                var options = optionValues[i].split("__");
                optionHTML += "<OPTION value = " + options[0] + ">" + options[1] + "</OPTION>";
            }
			//12.1 summary performance changes new start
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = "";
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML = '<label class="LBLtd" for ="idTextFieldValue">' + mainWin.getItemDesc("LBL_VALUE") + '</label><SELECT name="idTextFieldValue" class="SELstd" id="idTextFieldValue" onchange="fnCheckOperator()">' + optionHTML + '</SELECT>';
            advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML = "";
			//12.1 summary performance changes new end
            break;
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
//REDWOOD_CHANGES
    //12.1 summary performance changes start
    var selFieldData = selectedFields.split("~");  //REDWOOD_CHANGES
    //12.1 summary performance changes end	   
//REDWOOD_CHANGES
    var selOp = document.getElementById(selFieldData[0]);
    var selType = selFieldData[1]; 
//REDWOOD_CHANGES
    
    //Bug 15908897 fix starts    
    var dateFound=false;
    //Bug 15908897 fix ends	 
//REDWOOD_CHANGES
    //var selOption = selField.options[selField.selectedIndex];
   // if (selField.selectedIndex != -1) {
    singleRecObj['queryFieldName'] = selFieldData[0].split("__")[1];
//    singleRecObj['queryField'] = selFieldData[2];
    singleRecObj['queryField']=selFieldData[2].split('(')[0];
    singleRecObj['queryOperator'] = selOp.value;
    
	
	   if ((trim(selOp.value)).toUpperCase() == "BETWEEN") { 
            singleRecObj['queryValue'] = document.getElementById(selFieldData[0]+"_FROM").value + " AND " + document.getElementById(selFieldData[0]+"_TO").value;
        } else {
            singleRecObj['queryValue'] = document.getElementById(selFieldData[0]+"_FROM").value;
        }
		//REDWOOD_35239371 starts
		if (document.getElementById(selFieldData[0]+"_FROM").tagName == "OJ-SWITCH") {
			 singleRecObj['queryValue'] = (singleRecObj['queryValue'] == true) ? 'Y' : 'N';
		}
		//REDWOOD_35239371 ends
    }
    
    meArrayForAddDelete['advQuery'].push(singleRecObj);
        //var table = document.getElementById("idadvQuryTable").tBodies[0];
        /*if ((opt == "AND" || opt == "OR" || opt == "(" || opt == ")") && meArrayForAddDelete['advQuery'].length == 0) {
            return;
        }*/				 
//REDWOOD_CHANGES
        /*var row = document.createElement("TR");  //REDWOOD_CHANGES
        if (table.rows.length % 2 == 0) {
            row.className = "TBLoneTR";
            row.setAttribute("onblur", "this.className='TBLoneTR'");
            row.setAttribute("onmouseover", "this.className='TBLoneTRhover'");
            row.setAttribute("onfocus", "this.className='TBLoneTRhover'");
            row.setAttribute("onmouseout", "this.className='TBLoneTR'");
        } else {
            row.className = "TBLoneTRalt";
            row.setAttribute("onblur", "this.className='TBLoneTRalt'");
            row.setAttribute("onmouseover", "this.className='TBLoneTRhover'");
            row.setAttribute("onfocus", "this.className='TBLoneTRhover'");
            row.setAttribute("onmouseout", "this.className='TBLoneTRalt'");
        }

        table.appendChild(row);
        var cell1 = document.createElement("TD");
        row.appendChild(cell1);
        cell1.className = "TBLoneTD1";
        cell1.setAttribute("scope", "row");
        var div1 = document.createElement("div");//static header change
        cell1.appendChild(div1);//static header change
        var element1 = document.createElement("input");
        element1.type = "checkbox";
        element1.className = "CHKstd";
        div1.appendChild(element1);//static header change

        var cell3 = document.createElement("TD");
        row.appendChild(cell3);
        cell3.setAttribute("scope", "row");
        var div3 = document.createElement("div");//static header change
        cell3.appendChild(div3);//static header change
        // Fix for Bug 16326855 - start 
        // var element2 = document.createElement("span");
        // element2.className = "Astd";
        var selectedVariableValue = document.createElement("input");
        selectedVariableValue.name="HIDELEM";
        selectedVariableValue.setAttribute("type","hidden");
        selectedVariableValue.setAttribute("id","HIDELEM");
                
        var element2 = document.createElement("INPUT");
        element2.className = "TXTro";
        element2.setAttribute("type","text");
        element2.readOnly = true;
        element2.name="HIDELEMI";*/	 //REDWOOD_CHANGES
        // Fix for Bug 16326855 - end 

       /* if (opt == "(") {	  //REDWOOD_CHANGES
            setInnerText(element2, "(");
            // Fix for Bug 16326855 - start 
            setInnerText(selectedVariableValue, "("); 
            element2.value = "(";
            selectedVariableValue.value = "(";
            // Fix for Bug 16326855 - end 
        } else if (opt == "OR") {
            setInnerText(element2, "OR");
            // Fix for Bug 16326855 - start
            setInnerText(selectedVariableValue, "OR"); 
            element2.value = "OR";
            selectedVariableValue.value = "OR";
            // Fix for Bug 16326855 - end 
        } else if (opt == "AND") {
            setInnerText(element2, "AND");
            // Fix for Bug 16326855 - start
            setInnerText(selectedVariableValue, "AND"); 
            element2.value = "AND";
            selectedVariableValue.value = "AND";
            // Fix for Bug 16326855 - end 
        } else if (opt == ")") {
            setInnerText(element2, ")");
            // Fix for Bug 16326855 - start
            setInnerText(selectedVariableValue, ")");
            element2.value = ")";
            selectedVariableValue.value = ")";
            // Fix for Bug 16326855 - end 
        } else {
            // Fix for Bug 16326855 - start 
            setInnerText(element2, getInnerText(selOption)); 
            setInnerText(selectedVariableValue, selOption.value); 
			//9NT1606_12_4_RETRO_12_2_26230635 starts 
            if(getInnerText(selOption).indexOf("(") != -1){
                element2.value =  getInnerText(selOption).substring(0, getInnerText(selOption).indexOf("("));
            }else{
                element2.value = getInnerText(selOption);
            }
			//9NT1606_12_4_RETRO_12_2_26230635 ends 
            selectedVariableValue.value = selOption.value;
            // Fix for Bug 16326855 - end
        }
        cell3.appendChild(selectedVariableValue); // Fix for Bug 16326855
        cell3.appendChild(element2);

        if (opt == "") {
            var cell4 = document.createElement("TD");
            row.appendChild(cell4);
            cell4.setAttribute("scope", "row");
            var div4 = document.createElement("div");//static header change
            cell4.appendChild(div4);//static header change
            var element2 = document.createElement("span");
            element2.className = "Astd";
            setInnerText(element2, selOp.options[selOp.selectedIndex].value);
            div4.appendChild(element2);//static header change

            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            cell5.setAttribute("scope", "row");
            var div5 = document.createElement("div");//static header change
            cell5.appendChild(div5);//static header change
            //Bug 15908897 fix starts
			//12.1 summary performance changes start
            //var fields = document.getElementById("idSelectField");
             var fields =selectedFields;
            //12.1 summary performance changes end
            dataType = fields.options[fields.options.selectedIndex].getAttribute("DTYPE");
            fieldType = fields.options[fields.options.selectedIndex].getAttribute("TYPE"); // Fix for 19233688
            
            if(dataType=="DATE"  && fieldType=="DATE"){ // Fix for 19233688 - added additional check fieldtype
                dateFound=true;
                var hidElem=document.createElement("input");
                hidElem.name="HIDDATE";
                hidElem.setAttribute("type","hidden");
                hidElem.setAttribute("id","HIDDATE");
                
                
                var element2 = document.createElement("INPUT");
                element2.className = "TXTro";
                element2.setAttribute("type","text");
                element2.setAttribute("readOnly","true");
                element2.name="HIDDATEI";
                
                div5.appendChild(hidElem);//static header change
                
            } else{
                var element2 = document.createElement("SPAN");
                element2.className = "Astd";
            }
            //Bug 15908897 fix ends
            if (document.getElementById("idTextFieldValue").type == "checkbox") {
                if (document.getElementById("idTextFieldValue").checked == true) setInnerText(element2, document.getElementById("idTextFieldValue").getAttribute("ON"));
                else setInnerText(element2, document.getElementById("idTextFieldValue").getAttribute("OFF"));
                //Bug 15908897 fix starts
                element2.setAttribute("type","checkbox");
            } else if(!dateFound){
                element2.setAttribute("type","text");
                //Bug 15908897 fix ends
                if (selOp.options[selOp.selectedIndex].value == " between ") {
                    setInnerText(element2, document.getElementById("idTextFieldValue").value + " AND " + document.getElementById("idTextFieldValue2").value);
                } else {
                    setInnerText(element2, document.getElementById("idTextFieldValue").value);
                }
            }
            div5.appendChild(element2);//static header change

            var cell6 = document.createElement("TD");
            row.appendChild(cell6);
            cell6.width = "99%";
            cell6.setAttribute("scope", "row");
            var div6 = document.createElement("div");//static header change
            cell6.appendChild(div6);//static header change
        } else {
            div3.appendChild(element2);//sttaic header change
            var cell4 = document.createElement("TD");
            row.appendChild(cell4);
            var div4 = document.createElement("div");//static header change
            cell4.appendChild(div4);//static header change
            var element2 = document.createElement("span");
            element2.className = "Astd";
            div4.appendChild(element2);//static header change

            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            var div5 = document.createElement("div");//static header change
            cell5.appendChild(div5);//static header change
            var element2 = document.createElement("span");
            element2.className = "Astd";
            div5.appendChild(element2); //sttaic header change

            var cell6 = document.createElement("TD");
            row.appendChild(cell6);
            cell6.width = "99%";
            cell6.setAttribute("scope", "row");
            var div6 = document.createElement("div");//static header change
            cell6.appendChild(div6);//static header change
        }
//Bug 15908897 fix starts
    }
    if(dateFound){        
	//Bug 16181158 fix starts
        var tempTableRows = document.getElementById("idadvQuryTable").tBodies[0].rows;
        var inputElem=tempTableRows[tempTableRows.length-1].cells[3].getElementsByTagName("INPUT")[0];        
        if (selOp.options[selOp.selectedIndex].value == " between ") {			
          var fromDate=document.getElementById("idTextFieldValueI").value;
          var toDate=document.getElementById("idTextFieldValue2I").value;
          setInnerText(element2, fromDate+ " AND " + toDate);
		  element2.value = fromDate+ " AND " + toDate; // Fix for Bug 16326855
          if (document.getElementById("idTextFieldValue").getAttribute("today") != null) {//Summary save - calendar changes start
              inputElem.value = "today AND ";
          } else {
              inputElem.value = document.getElementById("idTextFieldValue").value + " AND ";
          }
          if (document.getElementById("idTextFieldValue2").getAttribute("today") != null) {
              inputElem.value += "today";
          } else {
              inputElem.value += document.getElementById("idTextFieldValue2").value;
          }
          //inputElem.value = document.getElementById("idTextFieldValue").value + " AND " + document.getElementById("idTextFieldValue2").value;//Summary save - calendar changes end
          dateFound=false;
        }else {
         //Bug 16181158 fix ends
          addEvent(inputElem, "onpropertychange", "displayDate(this)");
		  element2.value = document.getElementById("idTextFieldValueI").value; // Fix for Bug 16326855
          if (document.getElementById("idTextFieldValue").getAttribute("today") != null) {//Summary save - calendar changes
              inputElem.value = "today";
          } else {
            inputElem.value = document.getElementById("idTextFieldValue").value;
          }
          dateFound=false;
        }
        //Bug 15908897 fix ends
    }
    fnSyncQueryTableWidth();//static header change*/   //REDWOOD_CHANGES
    
//document.getElementById("idadvQuryTable").focus(); //REDWOOD_CHANGES
}

function fnCheckUncheckAll(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_ChBoxsQuery = document.getElementById("QUERY_CHKBOX");
    var l_ChBoxsOrder = document.getElementById("ORDER_CHKBOX");
    var l_ChkStatus = true;

    if (srcElement.id == "QUERY_CHKBOX") {
        if (l_ChBoxsQuery.checked == true) l_ChkStatus = true;
        else l_ChkStatus = false;

        var rows = document.getElementById("idadvQuryTable").tBodies[0].rows;
        for (var l_Cnt = 0; l_Cnt < rows.length; l_Cnt++) {
            rows[l_Cnt].cells[0].children[0].children[0].checked = l_ChkStatus; //sttaic header change
        }
    } else if (srcElement.id == "ORDER_CHKBOX") {
        if (l_ChBoxsOrder.checked == true) l_ChkStatus = true;
        else l_ChkStatus = false;

        var rows = document.getElementById("idadvOrderTable").tBodies[0].rows;
        for (var l_Cnt = 0; l_Cnt < rows.length; l_Cnt++) {
            rows[l_Cnt].cells[0].children[0].children[0].checked = l_ChkStatus; //sttaic header change
        }
    }
}

function fnPopulateAdvQueryData() {	   

    var advQuryTable=getTableObjForBlock("idadvQuryHeaderTable").tBodies[0]; //REDWOOD_CHANGES
    var advOrderTable=getTableObjForBlock("idadvOrderHeaderTable").tBodies[0]; //REDWOOD_CHANGES 
    var whereClsArr = "";
    var whereClsFldName = ""; //REDWOOD_CHANGES
    var whereClsFldValue = ""; //REDWOOD_CHANGES
    var advOrderOptClauseArr = "";
    if (parent.screenArg.RETURN_VALUE.advWhereClause != "!") {
        whereClsArr = parent.screenArg.RETURN_VALUE.advWhereClause.split("!");
        operatorClauseArr = parent.screenArg.RETURN_VALUE.advOperationClause.split("~");//REDWOOD_CHANGES
        valueClauseArr = parent.screenArg.RETURN_VALUE.advValueClause.split("~");
   //REDWOOD_CHANGES   
     whereClsFldName = whereClsArr[0].split("~"); 
        whereClsFldValue = whereClsArr[1].split("~");
        for (var i=0; i < whereClsFldValue.length-1; i++) {
            var advQueryObj = Object.assign( {}, multipleEntryFieldList[multipleEntryFieldList['advQuery']]);
            advQueryObj['queryFieldName'] = trim(whereClsFldName[i].split("~"));
            advQueryObj['queryField'] = trim(whereClsFldValue[i].split("~"));
            advQueryObj['queryOperator'] = trim(operatorClauseArr[i].split("~"));
            advQueryObj['queryValue'] = trim(valueClauseArr[i].split("~"));
    
            meArrayForAddDelete['advQuery'].push(advQueryObj);
        }  
//REDWOOD_CHANGES
        
           /* var row = document.createElement("TR");	//REDWOOD_CHANGES
            row.className = "TBLoneTR";
            row.setAttribute("onblur", "this.className='TBLoneTR'");
            row.setAttribute("onmouseover", "this.className='TBLoneTRhover'");
            row.setAttribute("onfocus", "this.className='TBLoneTRhover'");
            row.setAttribute("onmouseout", "this.className='TBLoneTR'");
            advQuryTable.appendChild(row);
            
            var cell1 = document.createElement("TD");
            row.appendChild(cell1);
            cell1.className = "TBLoneTD1";
            cell1.setAttribute("scope", "row");
            var div1 = document.createElement("div"); //static header change
            cell1.appendChild(div1);//static header change
            var element1 = document.createElement("input");
            element1.type = "checkbox";
            element1.className = "CHKstd";
            div1.appendChild(element1);//static header change
            var cell3 = document.createElement("TD");
            row.appendChild(cell3);
            cell3.setAttribute("scope", "row");
            var div3 = document.createElement("div"); //static header change
            cell3.appendChild(div3);//static header change
            var selectedVariableValue = document.createElement("input");
            
            selectedVariableValue.name="HIDELEM";
            selectedVariableValue.type = "hidden";
            selectedVariableValue.className = "Astd";
            selectedVariableValue.setAttribute("id","HIDELEM");
            selectedVariableValue.setAttribute("value",trim(whereClsValue[i].split("~")));
            div3.appendChild(selectedVariableValue);//static header change
            var selectedVariableValue1 = document.createElement("INPUT");
            selectedVariableValue1.className = "TXTro";
            selectedVariableValue1.type = "text";
            selectedVariableValue1.readOnly = true;
            selectedVariableValue1.name="HIDELEMI";
            selectedVariableValue1.setAttribute("value",trim(whereClsValue1[i].split("~")));
            div3.appendChild(selectedVariableValue1);//static header change
            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            cell5.setAttribute("scope", "row");
            var div5 = document.createElement("div"); //static header change
            cell5.appendChild(div5);//static header change
            var selectedVariableValue3 = document.createElement("SPAN");
            div5.appendChild(selectedVariableValue3);//static header change
            selectedVariableValue3.className = "Astd";
            setInnerText(selectedVariableValue3, trim(operationClauseArr[i].split("~")));
            

            var cell7 = document.createElement("TD");
            row.appendChild(cell7);
            cell7.setAttribute("scope", "row");
            var div7 = document.createElement("div"); //static header change
            cell7.appendChild(div7);//static header change
            var selectedVariableValue4 = document.createElement("SPAN");
            div7.appendChild(selectedVariableValue4);//static header change
            selectedVariableValue4.setAttribute("type","text");
            selectedVariableValue4.className = "Astd";
            setInnerText(selectedVariableValue4, trim(valueClauseArr[i].split("~")));
            var cell6 = document.createElement("TD");
            row.appendChild(cell6);
            cell6.width = "99%";
            cell6.setAttribute("scope", "row");
            var div6 = document.createElement("div"); //static header change
            cell6.appendChild(div6);//static header change
        }*/	//REDWOOD_CHANGES
    }
    if (parent.screenArg.RETURN_VALUE.advOrderByClause != "") {
        orderByClauseArr = parent.screenArg.RETURN_VALUE.advOrderByClause.split("~");
        advOrderOptClauseArr = parent.screenArg.RETURN_VALUE.advOrderOptClause.split("~");
        for (var i =0;i<orderByClauseArr.length-1;i++) {  
//REDWOOD_CHANGES
            var advOrderByObj = Object.assign( {}, multipleEntryFieldList[multipleEntryFieldList['advOrderBy']]);
            advOrderByObj['orderByField'] = trim(orderByClauseArr[i].split("~"));
            advOrderByObj['orderByValue'] = trim(advOrderOptClauseArr[i].split("~"));
    
            meArrayForAddDelete['advOrderBy'].push(advOrderByObj);
        }			
//REDWOOD_CHANGES
       /* for (var i =0;i<orderByClauseArr.length-1;i++) { //REDWOOD_CHANGES
            var row = document.createElement("TR");
            row.className = "TBLoneTR";
            row.setAttribute("onblur", "this.className='TBLoneTR'");
            row.setAttribute("onmouseover", "this.className='TBLoneTRhover'");
            row.setAttribute("onfocus", "this.className='TBLoneTRhover'");
            row.setAttribute("onmouseout", "this.className='TBLoneTR'");
            advOrderTable.appendChild(row);
            
            var cell1 = document.createElement("TD");
            row.appendChild(cell1);
            cell1.className = "TBLoneTD1";
            cell1.setAttribute("scope", "row");
            var div1 = document.createElement("div"); //static header change
            cell1.appendChild(div1);//static header change
            var element1 = document.createElement("input");
            element1.type = "checkbox";
            element1.className = "CHKstd";
            div11.appendChild(element1);//static header change
            
            var cell3 = document.createElement("TD");
            row.appendChild(cell3);
            cell3.setAttribute("scope", "row");
            var div3 = document.createElement("div"); //static header change
            cell3.appendChild(div3);//static header change
            var selectedVariableValue = document.createElement("SPAN");
            div3.appendChild(selectedVariableValue);//static header change
            selectedVariableValue.className = "Astd";
            setInnerText(selectedVariableValue, orderByClauseArr[i].split("~"));
            var cell4 = document.createElement("TD");
            row.appendChild(cell4);
            cell4.setAttribute("scope", "row");
            var div4 = document.createElement("div"); //static header change
            cell4.appendChild(div4);//static header change
            var selectedVariableValue1 = document.createElement("SPAN");
            div4.appendChild(selectedVariableValue1);//static header change
            selectedVariableValue1.className = "Astd";
            setInnerText(selectedVariableValue1, advOrderOptClauseArr[i].split("~"));
            var cell5 = document.createElement("TD");
            row.appendChild(cell5);
            cell5.width = "99%";
            cell5.setAttribute("scope", "row");
            var div5 = document.createElement("div"); //static header change
            cell5.appendChild(div5);//static header change
         }*/ //REDWOOD_CHANGES
    }
}
//12.1 summary performance changes new start
function validateAdvCriteria(queryValue,valueofVariable){
    var advSrchEnteredVal=valueofVariable.split("~"); 
    var advSrchqueryValue  = queryValue.split("~");
    var status = false;
    var  alertMsg ="";
    var criteriaList = document.getElementById("idRecommendedField").getElementsByTagName("LI");//REDWOOD_CHANGES
      if(queryValue == ""){
              alertMsg = mainWin.getItemDesc("LBL_INFO_BLIND_SRCH_DISABLED");
    }
    for(var j=0;j<advSrchqueryValue.length-1;j++) {
            for(var m=0;m<criteriaList.length;m++) {
                advSrchEnteredVal[j] =  advSrchEnteredVal[j].replace(/%/g,"" );
                var  advSearchGivenValLen = advSrchEnteredVal[j].length;
                var advSrchQryVal = trim(advSrchqueryValue[j]);
                if( advSrchQryVal != "AND" && advSrchQryVal != "OR" && advSrchQryVal!="(" && advSrchQryVal!=")" ){ 
                    if(criteriaList[m].getAttribute("NAME")== advSrchQryVal && advSearchGivenValLen >= parseInt(criteriaList[m].getAttribute("MIN_CHAR"))){//REDWOOD_CHANGES
                        status = true;
                        break;
                    }else{
                         alertMsg = mainWin.getItemDesc("LBL_INFO_BLIND_SRCH_DISABLED");
                    }
                }
            }
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

function fngetSelectedFields(fields){
    var idRcmndedflds = document.getElementById("idRecommendedField");
    var idSelectfields = document.getElementById("idSelectField");
    if(fields=='idRecommendedField'){
        idSelectfields.selectedIndex= -1;
        selectedFields =idRcmndedflds;
    }else{
        idRcmndedflds.selectedIndex=-1;
        selectedFields =idSelectfields;     
    }
    document.getElementById("idTextFieldValue").setAttribute("CUSTOMLOV", "");
    document.getElementById("idTextFieldValue").setAttribute("onchange", "");
    document.getElementById("idTextFieldValue").removeAttribute("CUSTOMLOV");
    document.getElementById("idTextFieldValue").removeAttribute("onchange");
      
    
    
}
//12.1 summary performance changes end

function fnSyncQueryTableWidth(){
  var headerTable = document.getElementById("idadvQuryHeaderTable");
				var dataTable = document.getElementById("idadvQuryTable");
        if(dataTable.tBodies[0].rows[0]){
          for(i=0;i<headerTable.tBodies[0].rows[0].cells.length-1;i++){
           var w = Math.max(headerTable.tBodies[0].rows[0].cells[i].offsetWidth,dataTable.tBodies[0].rows[0].cells[i].offsetWidth);
           headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w - 13 + "px";
           dataTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w -13 + "px";
          }
        }
}

function fnSyncOrderTableWidth(){
  var headerTable = document.getElementById("idadvOrderHeaderTable");
				var dataTable = document.getElementById("idadvOrderTable");
        if(dataTable.tBodies[0].rows[0]){
          for(i=0;i<headerTable.tBodies[0].rows[0].cells.length-1;i++){
          var w = Math.max(headerTable.tBodies[0].rows[0].cells[i].offsetWidth,dataTable.tBodies[0].rows[0].cells[i].offsetWidth);
           headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w - 13 + "px";
           dataTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w -13 + "px";
          }
        }
}

function fnCheckCustomLov(){

    var fieldName = selectedFields.options[selectedFields.options.selectedIndex].value;
    if(parent.document.getElementsByName(fieldName).length > 0){
      if(parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOV")){
        customLov = parent.document.getElementsByName(fieldName)[0].getAttribute("CUSTOMLOV");
        if(customLov == 'Y'){
         document.getElementById("idTextFieldValue").setAttribute("CUSTOMLOV", customLov);
         if(parent.document.getElementsByName(fieldName)[0].getAttribute("onchange")){
            document.getElementById("idTextFieldValue").setAttribute("onchange", parent.document.getElementsByName(fieldName)[0].getAttribute("onchange"));
         }
        }
      }   
     
    }
}
//REDWOOD_CHANGES
function refreshAdvancedSearchRecommendedListView(){
document.getElementById("idRecommendedField").children[0].innerHTML=recommendedListView;
document.getElementById("idRecommendedField").refresh();
}


function refreshAdvancedSearchOptionalListView(){
document.getElementById("idSelectField").children[0].innerHTML=optionalListView;
document.getElementById("idSelectField").refresh();
}

function storeAdvancedSearchListView(){
recommendedListView=document.getElementById("idRecommendedField").children[0].innerHTML;
optionalListView=document.getElementById("idSelectField").children[0].innerHTML;
}
//REDWOOD_CHANGES

