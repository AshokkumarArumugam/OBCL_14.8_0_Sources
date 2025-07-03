/*----------------------------------------------------------------------------------------------------
**
** File Name    : SingleView.js
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

Copyright © 2004-2012   by Oracle Financial Services Software Limited..

**  Modified By          : Rishabh Gupta
**  Modified On          : 27-Sep-2016
**  Modified Reason      : Changes done to set the value of textarea field using innertext attribute to fix the issue in chrome
**  Search String        : 12_0_3_RETRO_12_2_23653222
**  SFR no.  			 : 23653222

**  Modified By          : Manoj S
**  Modified On          : 05-Feb-2024
**  Modified Reason      : In Buildselect, replacement done for view change attribute which needs to be displayed as proper attribution 
**  Search String        : redwood_36205179
---------------------------------------------------------------------------------------------------- 
*/

var currentRecPosition = -1;
var currentRow = null;
var tableObjectOld = null;
var tableObject = parent.document.getElementById(blockId);
var tableObjectHeader = tableObject.getElementsByTagName('thead')[0];//static header change //REDWOOD_CHANGES
var saveFlag = false;

function fnDisplaySingleViewRecord(recPosition){
    var sViewTObject = document.getElementById("SINGLE_VIEW");
    var currElement = null;
    var elements = null;
    var eValue = "";
//REDWOOD_CHANGES
    var headdings = tableObjectHeader.getElementsByTagName('tr')[0];//static header change
    var headdingsArr = [...headdings.cells]
    headdingsArr = headdingsArr.filter((v)=>v.getAttribute('style') !== "display: none;")
    headdingsArr = headdingsArr.filter((head)=>head.innerText!= '')
 //REDWOOD_CHANGES
    var newDiv = null;
    var newCell = null;	  
//REDWOOD_CHANGES
    var rows = tableObject.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var rowsTemplate = tableObject.getElementsByTagName('template')[0].innerHTML;
    rowsTemplate = rowsTemplate.replace(/<tr.*?">/, '');
    rowsTemplate = rowsTemplate.replace(/<\/tr>/, '');
    rowsTemplate = rowsTemplate.replace(/(\r\n|\n|\r)/gm,"");
    while(rowsTemplate.match(/<td class="TDnone.*?<\/td>+/) && rowsTemplate.match(/<td class="TDnone.*?<\/td>+/).length > 0) {
        rowsTemplate = rowsTemplate.replace(/<td class="TDnone.*?<\/td>+/, '');
    }
    
    rowsTemplate = rowsTemplate.replaceAll('<td>', '<oj-form-layout><oj-label-value>')
    rowsTemplate = rowsTemplate.replaceAll(/<td.*?>/g, '<oj-form-layout><oj-label-value>')
    rowsTemplate = rowsTemplate.replaceAll('</td>', '</oj-label-value></oj-form-layout>')
    rowsTemplate = rowsTemplate.replaceAll('<div>', '')
    rowsTemplate = rowsTemplate.replaceAll('<div slot="value">', '')
    rowsTemplate = rowsTemplate.replaceAll('</div>', '')
    rowsTemplate = rowsTemplate.replaceAll(/<script.*?<\/script>/g, '');
    rowsTemplate = rowsTemplate.replaceAll(/user-assistance-density="compact"/g, '');
    
    rowsTemplate =  rowsTemplate.replaceAll(/(?!{{row.data.readOnly)({{row.data.*?}})/g, ''); 
   // rowsTemplate = rowsTemplate.replaceAll(/{{row.*?}}/g, '');
   rowsTemplate =  rowsTemplate.replaceAll(/{{ /g, '');

    rowsTemplate = rowsTemplate.replaceAll(/row.index*?]]/g, '')
    
    rowsTemplate = rowsTemplate.replaceAll(/:id="\[\['/g,'id="');    
	rowsTemplate = rowsTemplate.replaceAll(/:viewchanges=/g,'viewchanges=');//redwood_36205179
    rowsTemplate = rowsTemplate.replaceAll(/numberConverter/g, 'parent.numberConverter')
    rowsTemplate = rowsTemplate.replaceAll(/amountConverter/g, 'parent.amountConverter')
    rowsTemplate = rowsTemplate.replaceAll(/(<oj-label-value>+)(<oj-)+/g, "$1<oj-label slot=label>Label</oj-label> $2");
    var ojLabelValRegex = /<oj-form-layout>.*?<\/oj-form-layout>/g;
    var ojElems=rowsTemplate.match(ojLabelValRegex);   
//REDWOOD_CHANGES
    var nViewRows = sViewTObject.children.length;
    var nextElement = null;
    var prevElement = null;
    var isHidden = false;
    var divArr = [];	//REDWOOD_CHANGES
    var ojDivElemArr = [];	//REDWOOD_CHANGES
    fnUpdateDataBackToME();

    for (var rowIndex = 0; rowIndex < nViewRows; rowIndex++){
        sViewTObject.innerHTML = "";
    }

    if (recPosition == 'FIRST'){
        fnCopyTableData();
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++){
            currElement = rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0];
            if (currElement){
               // if (currElement.checked){	  //REDWOOD_CHANGES
                    currentRow = rows[rowIndex];
                    currentRecPosition = rowIndex;
                    break;
                }
            }
        }
    //}	  //REDWOOD_CHANGES

    if (recPosition == 'NEXT'){
        for (var rowIndex = currentRecPosition + 1; rowIndex < rows.length; rowIndex++){
            currElement = rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0];
            if (currElement){
                    currentRow = rows[rowIndex];
                    currentRecPosition = rowIndex;
                    break;
                }
            }
        }

    if (recPosition == 'PREV'){
        for (var rowIndex = currentRecPosition - 1; rowIndex >= 0; rowIndex--){
            currElement = rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0];
            if (currElement){
                    currentRow = rows[rowIndex];
                    currentRecPosition = rowIndex;
                    break;
                }
            }
        }

    if (currentRecPosition == -1){
        newDiv = document.createElement("div");
        addEvent(newDiv, "class", "DIVText");
        newDiv.innerHTML = "<B><FONT color='RED'>" + mainWin.getItemDesc("LBL_NO_RECORDS_SEL") + "</FONT></B>";
        sViewTObject.appendChild(newDiv);
    }
    if (currentRow){   
//REDWOOD_CHANGES
       // for (var rowIndex = 0; rowIndex < headdings.cells.length; rowIndex++){
        for (var cRowIndex = 0; cRowIndex < ojElems.length; cRowIndex++) {
           /* isHidden = false;
            elements = currentRow.cells[rowIndex].getElementsByTagName("INPUT");
            for (var innerIndex = 0; innerIndex < elements.length; innerIndex++){
                currElement = elements[innerIndex];
                if (currElement.type.toUpperCase() == "BUTTON"){
                    prevElement = getPreviousSibling(currElement);
                    if (prevElement){
                        if (prevElement.type){
                            if (prevElement.type.toUpperCase() == "TEXT"){
                                currElement.disabled = false;
                            } else currElement.disabled = true;
                        }
                    }
                }
                if (currElement.type.toUpperCase() == "TEXT"){
                    nextElement = getNextSibling(currElement);
                    if (nextElement){
                        if (nextElement.tagName.toUpperCase() == "BUTTON"){
                            if (currElement.className != "TextReadonly"){
                                nextElement.disabled = false;
                            } else{
                                if (nextElement.children[0]){
                                    if (nextElement.children[0].className == 'IMGPopupEdit'){
                                        nextElement.disabled = false;
                                    } else{
                                        nextElement.disabled = true;
                                    }
                                } else{
                                    nextElement.disabled = true;
                                }
                            }
                        }
                    }
                }
            }
            currElement = elements[0];
            if (currElement){
                if (currElement.type.toUpperCase() == "CHECKBOX" && currElement.name.toUpperCase() == "CHKDELETEROW") continue;
            }
            if (elements.length == 1){
                if (currElement){
                    if (currElement.type.toUpperCase() == "HIDDEN") isHidden = true;
                } 
            }*/				 
//REDWOOD_CHANGES
            newDiv = document.createElement("div");
            addEvent(newDiv, "class", "");	//REDWOOD_CHANGES
            sViewTObject.appendChild(newDiv);
//REDWOOD_CHANGES       
      newCell = ojElems[cRowIndex];
             
           /* newCell = currentRow.cells[rowIndex].children[0].innerHTML;//static header change
            if(currentRow.cells[rowIndex].children[0].tagName.toUpperCase() != "BUTTON") {*/
            newCell = newCell.replaceAll('arrProvider', 'parent.arrProvider')
            newCell = newCell.replace('Label', headdingsArr[cRowIndex].innerText);
 //REDWOOD_CHANGES          
                newDiv.innerHTML = newCell;
//REDWOOD_CHANGES
             newDiv.getElementsByTagName('oj-label-value')[0].setAttribute('label-edge', 'start')
            newDiv.getElementsByTagName('oj-form-layout')[0].setAttribute('label-edge', 'start')
            newDiv.children[0].children[0].children[1].id=newDiv.children[0].children[0].children[1].id.replace(/ /g,'');
            newDiv.children[0].children[0].children[1].id = newDiv.children[0].children[0].children[1].id.replace(/RC'/, 'RC'+rowIndex)
            var converter = newDiv.children[0].children[0].children[1].getAttribute("converter");
            if (converter && (converter.includes("numberConverter") || converter.includes("amountConverter"))) {
                newDiv.children[0].children[0].children[1].setAttribute('onchange', 'formatAmountValues(null,event)');                 
            }            
            
            divArr.push(newDiv);    
            var cells = [...currentRow.cells];
            cells=cells.filter((td) =>  ![...td.classList].includes('TDnone'))
            cells = cells.filter(cell=> ![...cell.classList].includes('oj-table-selector-cell'))
        }

        for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) { 
            for (divIndex=0; divIndex<divArr.length; divIndex++) {
                if (cellIndex == divIndex) {
                    var ojTagElem = cells[cellIndex].children[0];
                    while(ojTagElem.tagName.substr(0,2)!== 'OJ') {
                        ojTagElem = ojTagElem.children[0];
                    }
                
                    if(divArr[cellIndex].children[0].tagName === 'OJ-FORM-LAYOUT') {                        
                        var ojDivElem = divArr[cellIndex].children[0].children[0].children[1]

                    }
                  
                     ojDivElem.value = ojTagElem.value;
                    ojDivElemArr.push(ojDivElem);
                }
                }
        }
        singleViewKo.cleanNode(document.getElementById("ResTree"));
        singleViewKo.applyBindings( {},document.getElementById("ResTree"));
        setTimeout(function(){
            formatAmountValues(ojDivElemArr);
        },0);
        
}
            

}
           /*   if(newDiv.getElementsByTagName("LABEL").length > 0){  

                  var elem1 = getOuterHTML(newDiv.children[0]);
                  var elem2 = getOuterHTML(newDiv.children[1]);                
                  if(newDiv.children[1].getAttribute("required") == "-1")
                      //var l_txt = '<img src="Images/star.gif" title="" ALT=""/>';
                      var l_txt = '<SPAN class="star" title=""></SPAN>';//Data Uri changes
                  else
                      //var l_txt = '<img src="Images/star_disabled.gif" title="" ALT=""/>';
                      var l_txt = '<SPAN class="stardisabled"></SPAN>';//Data Uri changes
                  if(newDiv.children[2]){
                      if(newDiv.children[2].tagName.toUpperCase() == "BUTTON"){
                          var btnElem = getOuterHTML(newDiv.children[2]);
                          newDiv.innerHTML = elem1 + l_txt + elem2 + btnElem;
                          setInnerText(newDiv.getElementsByTagName("LABEL")[0], getInnerText(headdings.cells[rowIndex]));
                          newDiv.getElementsByTagName("LABEL")[0].className = "LABELNormal";
                      } else if(newDiv.children[2].tagName.toUpperCase() == "LABEL"){
                          var elem3 = getOuterHTML(newDiv.children[2]);
                          var elem4 = getOuterHTML(newDiv.children[3]);
                          newDiv.innerHTML = elem1 + l_txt + elem2 + elem3 + elem4;
                          setInnerText(newDiv.getElementsByTagName("LABEL")[0], getInnerText(headdings.cells[rowIndex]));
                          newDiv.getElementsByTagName("LABEL")[0].className = "LABELNormal";
                      }
                  }else if(newDiv.children[1].type != "hidden") {
                      newDiv.innerHTML = elem1 + l_txt + elem2;               
                      setInnerText(newDiv.getElementsByTagName("LABEL")[0], getInnerText(headdings.cells[rowIndex]));
                      newDiv.getElementsByTagName("LABEL")[0].className = "LABELNormal";   
                  }                 
              }else{
                  if(newDiv.children[0].getAttribute("required") == "-1"){
                      var l_txt = '<LABEL style="WHITE-SPACE: nowrap" class=LABELNormal>'+ getInnerText(headdings.cells[rowIndex]) +'</LABEL>';
                      //l_txt += '<img src="Images/star.gif" title="" ALT=""/>';
                      l_txt += '<SPAN class="star" title=""></SPAN>';//Data Uri changes
                  }else{
                      var l_txt = '<LABEL style="WHITE-SPACE: nowrap" class=LABELNormal>'+ getInnerText(headdings.cells[rowIndex]) +'</LABEL>';
                      //l_txt += '<img src="Images/star_disabled.gif" title="" ALT=""/>';
                      l_txt += '<SPAN class="stardisabled"></SPAN>';//Data uri changes
                  }
                  newDiv.innerHTML = l_txt + newCell;
              }
            }
            
            var cellElements = currentRow.cells[rowIndex].getElementsByTagName("INPUT");
            var newCellElements = newDiv.getElementsByTagName("INPUT");
            for(var i = 0; i < cellElements.length; ++i) {
                if(cellElements[i].type.toUpperCase() == "CHECKBOX") {
                    newCellElements[i].checked = cellElements[i].checked;
                }
            }
            if (isHidden) {
                addEvent(newDiv, "class", "dispNone");
            } 
            setMESVCellData(currentRow, newDiv);
        }
    }
}*/

function formatAmountValues(ojElemArr, event) {

            if (!ojElemArr) {
                const ojConverterElem = event && event.currentTarget;
                let converterName = ojConverterElem && ojConverterElem.getAttribute("converter");
                    if (converterName && converterName.includes("numberConverter")) {
                        var formattedValue = displayFormattedNumber(ojConverterElem, ojConverterElem.value);
                        ojConverterElem.value = formattedValue;
                    }
                    if (converterName && converterName.includes("amountConverter")) {
                        var ccy = getCurrencyValue(ojConverterElem, ojConverterElem.getAttribute("related_field"), false, true);
                        var mb3Amount = new MB3Amount(ojConverterElem.rawValue, true, ccy);
                        if (mb3Amount.valid) {
                            ojConverterElem.value = mb3Amount.getDisplayAmount();
                        }
                        
                    }
                    return;
            }

            for (var i=0;i<ojElemArr.length;i++) {
                
                let ojConverterElem = ojElemArr[i];
                
                var converterName = ojConverterElem && ojConverterElem.getAttribute("converter");
                    if (converterName && converterName.includes("numberConverter")) {
                        var formattedValue = displayFormattedNumber(ojConverterElem, ojConverterElem.value);
                        ojConverterElem.value = formattedValue;
                    }
                    if (converterName && converterName.includes("amountConverter")) {
                        var ccy = getCurrencyValue(ojConverterElem, ojConverterElem.getAttribute("related_field"), false, true);
                        var mb3Amount = new MB3Amount(ojConverterElem.rawValue, true, ccy);
                        if (mb3Amount.valid) {
                            ojConverterElem.value = mb3Amount.getDisplayAmount();
                        }
                        
                    }
    }

} 
//REDWOOD_CHANGES
function fnCopyTableData(){
    tableObjectOld = document.createElement("TABLE");
    var rows = tableObject.getElementsByTagName('tbody')[0].getElementsByTagName('tr'); //REDWOOD_CHANGES
   // var rows = tableObject.tBodies[0].rows;//REDWOOD_CHANGES
    var row = null;
    var cell = null;
    var newDiv = null;

    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++){
        row = rows[rowIndex];
        if (row){
            newDiv = document.createElement("div");
            for (var innerIndex = 0; innerIndex < row.cells.length; innerIndex++){
                cell = row.cells[innerIndex];
                newDiv.innerHTML = cell.innerHTML;
                var cellElements = cell.getElementsByTagName("INPUT");
                var newCellElements = newDiv.getElementsByTagName("INPUT");
                for(var i = 0; i < cellElements.length; ++i) {
                    if(cellElements[i].type.toUpperCase() == "CHECKBOX") {
                        newCellElements[i].checked = cellElements[i].checked;
                    }
                }
            }
        }
    }
}

function setMESVCellData(currentRow, newDiv){  
//REDWOOD_CHANGES
   // var cells = currentRow.cells;
     var cells = [...currentRow.cells];
    cells=cells.filter((td) =>  ![...td.classList].includes('TDnone'))
    cells = cells.filter(cell=> ![...cell.classList].includes('oj-table-selector-cell'))
//REDWOOD_CHANGES
    for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {  
//REDWOOD_CHANGES
    setInputData(newDiv, cells[cellIndex].getElementsByTagName("OJ-INPUT-TEXT"), cellIndex);
     /*   setInputData(newDiv, cells[cellIndex].getElementsByTagName("INPUT"), cellIndex);
        setSelectData(newDiv, cells[cellIndex].getElementsByTagName("SELECT"), cellIndex);
        setTextAreaData(newDiv, cells[cellIndex].getElementsByTagName("TEXTAREA"), cellIndex);*/
//REDWOOD_CHANGES
    }
}

function setInputData(newDiv, inputElem, cellIndex){  
//REDWOOD_CHANGES
 console.log('in 2', newDiv.getElementsByTagName('oj-input-text')[0])
        console.log(inputElem[0].value)
        newDiv.getElementsByTagName('oj-input-text')[0].value = inputElem[0].value;
    
  /*   if(inputElem.length > 0 && newDiv.getElementsByTagName("INPUT")[0]){
         var type = inputElem[0].type;
         if(newDiv.getElementsByTagName("INPUT")[0].name == inputElem[0].name){
              switch (type.toUpperCase()) {
                     case 'TEXT':
                     case 'HIDDEN':
                        {
                            if (getOuterHTML(inputElem[0]).indexOf("displayAmount") != -1) {
                                newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
                                fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
                                break;
                            } else if (getOuterHTML(inputElem[0]).indexOf("displayFormattedNumber") != -1){
                                newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
                                fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
                                break;
                            }else if (getOuterHTML(inputElem[0]).indexOf("displayDate") != -1){
                                newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
                                fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
                                break;
                            }else {
                                newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
                                fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
                                break;
                            }
                                
                        }
                    case 'CHECKBOX':
                    {
                    if (inputElem[0].checked) {
                            newDiv.getElementsByTagName("INPUT")[0].checked = true;                        
                        } else{
                            newDiv.getElementsByTagName("INPUT")[0].checked = false;
                        }                   
                        break;
                    }
                }
        }
    }*/		
//REDWOOD_CHANGES
}

function setSelectData(newDiv, selectElem, cellIndex){
    if(selectElem.length > 0 && newDiv.getElementsByTagName("SELECT")[0])
        setSelectedIndex(newDiv.getElementsByTagName("SELECT")[0], selectElem[0].value);
}

function setTextAreaData(newDiv, textareaElem, cellIndex){
    if(textareaElem.length > 0 && newDiv.getElementsByTagName("TEXTAREA")[cellIndex]){ //12_0_3_RETRO_12_2_23653222 Starts
        newDiv.getElementsByTagName("TEXTAREA")[0].value = textareaElem[0].value;
		setInnerText(newDiv.getElementsByTagName("TEXTAREA")[0],textareaElem[0].value);
	} //12_0_3_RETRO_12_2_23653222 Ends
}

function setMESVScreenHeights() {	 
	//REDWOOD_CHANGES
    var scrHeight = parseInt(mainWin.document.getElementById("mainContent").offsetHeight);
    parent.document.getElementById("ChildWin").className = "oj-sm-width-full";
    // parent.document.getElementById("ChildWin").style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
    parent.document.getElementById("ChildWin").children[0].style.width = "100%";
    parent.document.getElementById("ChildWin").style.height = "100%";
    parent.document.getElementById("ChildWin").children[0].style.height = "100%";
    //parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);

    parent.document.getElementById("ChildWin").style.top = "0px";
    //parent.document.getElementById("ChildWin").style.left = "4px";
    parent.document.getElementById("ChildWin").style.zIndex= 5980; 
//REDWOOD_CHANGES
    if(typeof(parent.fromSubScr) == 'undefined') {
        var parentScrID = parent.seqNo;         
        parentDivHeight = parent.parent.document.getElementById(parentScrID).clientHeight + "px";
        parentIFrame = parent.parent.document.getElementById(parentScrID).children[0].clientHeight + "px";
        parentDIVScrContainer = parent.document.getElementById("DIVScrContainer").clientHeight + "px";									
//REDWOOD_CHANGES
        if (parent.parent.document.getElementById(parentScrID).style.height < parent.document.getElementById("ChildWin").style.height) {
          //  parent.parent.document.getElementById(parentScrID).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
          //  parent.parent.document.getElementById(parentScrID).children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
          //  parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
//REDWOOD_CHANGES
        }
    }else{
       // parentDivHeight = parent.parent.document.getElementById("ChildWin").clientHeight + "px";//REDWOOD_CHANGES
        parentIFrame = parent.parent.document.getElementById("ChildWin").children[0].clientHeight + "px";
        parentDIVScrContainer = parent.document.getElementById("DIVScrContainer").clientHeight + "px";
//REDWOOD_CHANGES
//        if (parent.parent.document.getElementById("ChildWin").style.height < parent.document.getElementById("ChildWin").style.height) {
//          //  parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
//            parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
//            parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
//        }
        }
  //  document.getElementById("DIVMainTmp").style.overflow = 'auto';//Fix for 22996608 
   // parent.mask();
    
//  document.getElementById("SINGLE_VIEW").style.height = scrHeight - 130 - parent.document.getElementById("WNDtitlebar").offsetHeight + "px";
//    document.getElementById("SINGLE_VIEW").style.overflow = "scroll"
 //   document.getElementsByName("BTN_OK")[0].focus();	 
//REDWOOD_CHANGES
}

function fnUpdateDataBackToME(){
    var sViewTObject = document.getElementById("SINGLE_VIEW");
    //var rows = tableObject.tBodies[0].rows; //REDWOOD_CHANGES
    var rows = tableObject.getElementsByTagName('tbody')[0].getElementsByTagName('tr');//REDWOOD_CHANGES
    if (currentRow) {
        for (var rowIndex = 0; rowIndex < sViewTObject.children.length; rowIndex++) {
            var cElem = sViewTObject.children[rowIndex];
            if (cElem) {
                if (cElem.childNodes[0]) {
                    if(cElem.getElementsByTagName("INPUT").length > 0){
                    updateInputElements(cElem.getElementsByTagName("INPUT"), rowIndex);
                    } else if(cElem.getElementsByTagName("SELECT").length > 0){
                    updateSelectElements(cElem.getElementsByTagName("SELECT"), rowIndex);
                    } else if(cElem.getElementsByTagName("TEXTAREA").length > 0){
                    updateTextareaElements(cElem.getElementsByTagName("TEXTAREA"), rowIndex);
                    }
                    //currentRow.cells[rowIndex + 1].innerHTML = sViewTObject.tBodies[0].rows[rowIndex].cells[1].innerHTML;
                }
            }
        }
    }
    //10.2 change ends
}

function updateInputElements(currentElem, rowIndex){
    if(currentRow.getElementsByTagName("INPUT").length > 0){
        //var row = currentRow.getElementsByTagName("INPUT")[rowIndex];
//REDWOOD_CHANGES
        var cells = [...currentRow.cells];
    cells=cells.filter((td) =>  ![...td.classList].includes('TDnone'))
    var row =  cells[rowIndex + 1].getElementsByTagName("INPUT")[0];
   
       // var row = currentRow.cells[rowIndex + 1].getElementsByTagName("INPUT")[0];
//REDWOOD_CHANGES
        var type = currentElem[0].type;
        switch (type.toUpperCase()) {
             case 'TEXT':
             case 'HIDDEN':
                {
                    if (getOuterHTML(currentElem[0]).indexOf("displayAmount") != -1) {
                        row.value = currentElem[0].value;
                        fireHTMLEvent(row, "onpropertychange");
                        break;
                    } else if (getOuterHTML(currentElem[0]).indexOf("displayFormattedNumber") != -1){
                        row.value = currentElem[0].value;
                        fireHTMLEvent(row, "onpropertychange");
                        break;
                    }else if (getOuterHTML(currentElem[0]).indexOf("displayDate") != -1){
                        row.value = currentElem[0].value;
                        fireHTMLEvent(row, "onpropertychange");
                        break;
                    }else {
                        row.value = currentElem[0].value;	  
//REDWOOD_CHANGES
                        var parentOjElem = row.parentElement;
                while (parentOjElem.tagName.substring(0,2) !== 'OJ'){
                    parentOjElem = parentOjElem.parentElement;
                    
                }
                parentOjElem.setAttribute('value', currentElem[0].value)
                parentOjElem.refresh();
                
                if(parentOjElem.tagName === "OJ-SELECT-SINGLE") {
                    var dataKey = parentOjElem.getAttribute('data');
                    dataKey=dataKey.replaceAll('[[','')
                    dataKey=dataKey.replaceAll(']]','')
                    var singleSelectDataArr = parent[dataKey].data;
                    var selectedValue = singleSelectDataArr.filter((val)=>val.label===currentElem[0].value || val.value===currentElem[0].value);
                    parentOjElem.setAttribute('value', selectedValue[0].value)
                    parentOjElem.refresh();
                }		
//REDWOOD_CHANGES
                
                        break;
                    }
                        
                }
            case 'CHECKBOX':
            {
                if (currentElem[0].getAttribute("ON")) {                        
                    row.checked = true;                        
                    row.parentElement.value = true;	//REDWOOD_CHANGES
                } else{
                    row.checked = false;
                    row.parentElement.value = false;   //REDWOOD_CHANGES
                }                   
                break;
            }
        }
    }
}

function updateSelectElements(currentElem, rowIndex){
        setSelectedIndex(currentRow.getElementsByTagName("SELECT")[0], currentElem[0].value);
}

function updateTextareaElements(currentElem, rowIndex){
    if(currentRow.getElementsByTagName("TEXTAREA").length > 0){
        currentRow.getElementsByTagName("TEXTAREA")[0].value = currentElem[0].value;
    }
}

function fnEnabeButtonsInME(){
    var currElement = null;
    var nextElement = null;
   // var rows = tableObject.tBodies[0].rows; //REDWOOD_CHANGES   
    var rows = tableObject.getElementsByTagName('tbody')[0].getElementsByTagName('tr'); //REDWOOD_CHANGES
    var cRow = null;
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++){
        cRow = rows[rowIndex];
        if (cRow){
            for (var iRowIndex = 0; iRowIndex < cRow.cells.length; iRowIndex++){
                currElement = cRow.cells[iRowIndex].getElementsByTagName("INPUT")[0];
                if (currElement){
                    if (getNextSibling(currElement)){
                        nextElement = getNextSibling(currElement);
                        if (nextElement){
                            if (nextElement.tagName.toUpperCase() == "BUTTON"){
                                if (currElement.disabled){
                                    nextElement.disabled = true;
                                } else{
                                    nextElement.disabled = false;
                                }
                            }
                        }
                    }
                }
                if (currElement){
                    if (currElement.type.toUpperCase() == "BUTTON"){
                        currElement.disabled = false;
                    }
                }
                currElement = cRow.cells[iRowIndex].getElementsByTagName("BUTTON")[0];
                if (currElement){
                    currElement.disabled = false;
                    if (getPreviousSibling(currElement)){
                        if (getPreviousSibling(currElement).disabled) currElement.disabled = true;
                    }
                }
            }
        }
    }
}

function fnDispNextSingleViewRecord(){
    fnDisplaySingleViewRecord("NEXT");
}

function fnDispPrevSingleViewRecord(){
    fnDisplaySingleViewRecord("PREV");
}

function fnSaveSingleViewScreen(){
    fnUpdateDataBackToME();
    fnEnabeButtonsInME();
    saveFlag = true;
    //parent.document.getElementsByName("Checkbox_Title")[0].focus();
	//Fix for 15916159 
    try{
		var blockId = tableObject.getAttribute("id");
		parent.document.getElementById(blockId+"__Checkbox_Title").focus();//Fix for 17155663
	}catch(e){}
	//Fix for 15916159 
    parent.fnExitSingleViewScreen();
}

function fnExitSingleView(){
    fnEnabeButtonsInME();
    var singleViewHeight = document.getElementById("DIVWNDContainer").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight+"px";
    if(typeof(parent.fromSubScr) == 'undefined') {
        var parentScrID = parent.seqNo;
        if(parentDivHeight < singleViewHeight){
            parent.parent.document.getElementById(parentScrID).style.height = parentDivHeight;
            parent.parent.document.getElementById(parentScrID).children[0].style.height = parentIFrame;
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer;
        }
    }else{
        if(parentDivHeight < singleViewHeight){
            parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight;
            parent.parent.document.getElementById("ChildWin").children[0].style.height = parentIFrame;
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer;
        }
    }
    //parent.document.getElementById("Checkbox_Title")[0].focus();
	//Fix for 15916159 
    try{
		var blockId = tableObject.getAttribute("id");
		parent.document.getElementById(blockId+"__Checkbox_Title").focus();//Fix for 17155663
	}catch(e){}
	//Fix for 15916159 
    parent.fnExitSingleViewScreen();
}

function fnCloseAlertWin() {
    unmask();
    return false;
}

function SingleViewAccessKeys(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var tblObj = document.getElementById("SINGLE_VIEW").children;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.keyCode == 27) {
        fnExitSingleView();
        return;
    }else if(evnt.keyCode == 38){
     if(srcElement.tagName !="SELECT"){
        fnDispPrevSingleViewRecord();
        for(var i=0; i<tblObj.length; i++){
            if(tblObj[i].children[1]){
                if(tblObj[i].children[1].name == srcElement.name){
                    tblObj[i].children[1].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }else{
                if(tblObj[i].children[0].children[0].name == srcElement.name){
                    tblObj[i].children[0].children[0].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }
        }
     }
    }else if(evnt.keyCode == 40){
     if(srcElement.tagName !="SELECT"){
        fnDispNextSingleViewRecord();                
        for(var i=0; i<tblObj.length; i++){
            if(tblObj[i].children[1]){
                if(tblObj[i].children[1].name == srcElement.name){
                    tblObj[i].children[1].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }else{
                if(tblObj[i].children[0].children[0].name == srcElement.name){
                    tblObj[i].children[0].children[0].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }
        }
     }
    }else if(!evnt.ctrlKey && evnt.keyCode == 115) {
        var event = evnt;
        if (getNextSibling(srcElement) && getNextSibling(srcElement).tagName == "BUTTON") {
            if (srcElement.disabled == false && !srcElement.readOnly) {
                if(getIEVersionNumber() > 0)
                    fireHTMLEvent(getNextSibling(srcElement),"onclick");
                else {
                    //eval(getNextSibling(srcElement).getAttribute("onclick"));
                    var fnEval = new Function("event",getNextSibling(srcElement).getAttribute("onclick"));  
                    fnEval();
                }
            } else if (srcElement.getAttribute("INPUT_LOV")) {
                if(getIEVersionNumber() > 0)
                    fireHTMLEvent(getNextSibling(srcElement),"onclick");
                else {
                    //eval(getNextSibling(srcElement).getAttribute("onclick"));
                    var fnEval = new Function("event",getNextSibling(srcElement).getAttribute("onclick"));  
                    fnEval();
                }
            }
        }
        fnDisableBrowserKey(e);
        try {
            evnt.keyCode = 0;
        } catch(e) {           
        }        
        return false;        
    }
}

function fnHandleSVBtn(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if(evnt.shiftKey && evnt.keyCode == 9){
        if(srcElement == document.getElementById("WNDbuttons"))
            document.getElementById("BTN_EXIT_IMG").focus();
        else          
            document.getElementsByName("BTN_OK")[0].focus();        
        preventpropagate(evnt);
        return false; 
    }
    if(evnt.keyCode == 9){
        if(srcElement == document.getElementById("WNDbuttons"))
            document.getElementById("TBL_SINGLE_VIEW_BUTTONS").getElementsByTagName("BUTTON")[0].focus();
        else
            document.getElementById("WNDbuttons").focus();        
        preventpropagate(evnt);
        return false;
    }
}

function fnUndoChanges()
{
    var rows = tableObject.tBodies[0].rows;
    var row = null;
    var cell = null;
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++){
        row = rows[rowIndex];
        if (row){
            for (var innerIndex = 0; innerIndex < row.cells.length; innerIndex++){
                cell = row.cells[innerIndex];
                cell.innerHTML = tableObjectOld.tBodies[0].rows[rowIndex].cells[innerIndex].innerHTML;
            }
        }
    }
}

//10.2 change starts
function cursorEOT(isField){
    isRange = isField.createTextRange();
    isRange.move('textedit');
    isRange.select();
    testOverflow = isField.scrollTop;
    if (testOverflow != 0){
        return true
    } else{
        return false
    }
}

function adjustRows(isField){
    /*
    if (!isField.value || isField.value == "") return;
    while (cursorEOT(isField)){
        isField.setAttribute("onpropertychange", "", 0);
        isField.rows++;
    }
    */
    //10.2change ends
    var TEXTAREA_LINE_HEIGHT = 13;
      //var textarea = document.getElementById(isField);
      var textarea = isField;
      var newHeight = textarea.scrollHeight;
      var currentHeight = textarea.clientHeight;
    
      if (newHeight > currentHeight) {
         textarea.style.height = newHeight - 0.1 * TEXTAREA_LINE_HEIGHT + 'px';
    }
}