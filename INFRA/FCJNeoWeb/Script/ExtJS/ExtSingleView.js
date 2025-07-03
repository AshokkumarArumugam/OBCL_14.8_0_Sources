/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtSingleView.js
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

  Modified By   : Rishabh Gupta
  Modified On	: 29-Sept-2016
  Reason		: Changes done to retain the  disable state of the ME buttons when single view option is performed
  Search String : 12_0_2_RETRO_12_2_23652276
  SFR no.		: 23652276
  
**  Modified By          : Neethu Sreedharan
**  Modified On          : 20-Jun-2017
**  Modified Reason      : USER ABLE TO EDIT DISABLED FIELDS IN SINGLE VIEW OF MULTI RECORD BLOCK IN IE11 
**  Retro Source         : 9NT1606_12_2_BANK_MED_SAL
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230090 

**  Modified By          : Neethu Sreedharan
**  Modified On          : 12-Jul-2017
**  Modified Reason      : Lov is getting disabled while clicking single view. Code corrected to enable the same.
**  Retro Source         : 9NT1606_12_0_3_BANK_AUDI
**  Search String        : 9NT1606_12_4_RETRO_12_0_3_26230476

**  Modified By          : Neethu Sreedharan
**  Modified On          : 12-Jul-2017
**  Modified Reason      : Fix is added in ExtSingleView.js file to support firefox and chrome browser for textarea field 
**  Retro Source         : 9NT1606_12_1_MKB_BANK_ZRT
**  Search String        : 9NT1606_12_4_RETRO_12_1_26230944  

**  Modified By   : Niranjan Prajapati
**  Modified On	: 28-June-2018
**  Reason	: STDCIF - CUSTOMER ACCOUNT DETAILS SINGLE RECORD VIEW 
**  Retro Source         : Bug_28126643
**  Search String        : 9NT1606_14_1_RETRO_12_3_28204512


**  Modified By   		: Arunkumar R
**  Modified On	  		: 24-Apr-2023
**  Reason		  		: Redwood Application Single View LOV is disable issue 
**  Search String       : REDWOOD_35264828
**
**  Modified By       : Shayam Sundar Ragunathan
**  Modified On       : 02-May-2023
**  Reason            : Changes done to format OJ-INPUT-DATE-TIME tag values
**  Search String     : REDWOOD_35278106
**
**  Modified By       : Chandrashekar N
**  Modified On       : 11-May-2023
**  Modified Reason   : Single view button is not enabled on execute query because of a wrong regular expression
**  Search String     : REDWOOD_35366805

**  Modified By       : Ramalingam R
**  Modified On       : 12-May-2023
**  Modified Reason   : Single view is not working for some cases if switch/check box field is present in multi-grid
**  Search String     : REDWOOD_35384868

**  Modified By       : Ramalingam R
**  Modified On       : 14-June-2023
**  Modified Reason   : In Single view, LOV button is not getting disabled on querying the record.
**  Search String     : REDWOOD_35498061

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
var parentDivHeight = "";
var parentIFrame = "";
var parentDIVScrContainer = "";
var ShowSummary = "FALSE"; //Fix for 9NT1606_14_1_RETRO_12_3_28204512

function fnDisplaySingleViewRecord(recPosition) {
    fnSetExitButton();
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
    
    //rowsTemplate =  rowsTemplate.replaceAll(/(?!{{row.data.readOnly)({{row.data.*?}})/g, ''); 	//REDWOOD_35366805 Commented
	rowsTemplate =  rowsTemplate.replaceAll(/(?!{{row.data.readOnly}})({{row.data.*?}})/g, ''); 	//REDWOOD_35366805 Added
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
    ojElems=ojElems.filter((v)=>!v.includes('style="display:none;"'));	 
//REDWOOD_CHANGES
    var nViewRows = sViewTObject.children.length;
    var nextElement = null;
    var prevElement = null;
    var isHidden = false;
    var divArr = [];   //REDWOOD_CHANGES
    var ojDivElemArr = []; //REDWOOD_CHANGES
    fnUpdateDataBackToME();

    for (var rowIndex = 0; rowIndex < nViewRows; rowIndex++) {
        sViewTObject.innerHTML = "";
    }

    if (recPosition == 'FIRST') {
        fnCopyTableData();
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            currElement = rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0];
            if (currElement) {
                if (currElement.checked) { //REDWOOD_CHANGES//OJET15_Upgrade Uncommented
                    currentRow = rows[rowIndex];
                    currentRecPosition = rowIndex;
                    break;
                }  //REDWOOD_CHANGES
            }
        }
    }

    if (recPosition == 'NEXT') {
        for (var rowIndex = currentRecPosition + 1; rowIndex < rows.length; rowIndex++) {
            currElement = rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0];
            if (currElement) {
                currentRow = rows[rowIndex];
                currentRecPosition = rowIndex;
                break;
            }
        }
    }

    if (recPosition == 'PREV') {
        for (var rowIndex = currentRecPosition - 1; rowIndex >= 0; rowIndex--) {
            currElement = rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0];
            if (currElement) {
                currentRow = rows[rowIndex];
                currentRecPosition = rowIndex;
                break;
            }
        }
    }

    if (currentRow) {	
//REDWOOD_CHANGES
        for (var cRowIndex = 0; cRowIndex < ojElems.length; cRowIndex++) {

            newDiv = document.createElement("div");

            addEvent(newDiv, "class", "");
            sViewTObject.appendChild(newDiv);
            newCell = ojElems[cRowIndex];//static header changes

            var valRegex=/value="{{.*?}}/;
            var readOnlyRegex=/readonly="{{.*?}}/;
            var dataRegex=/data="[[.*?]]/; 
            newCell = newCell.replace(valRegex,'');
            newCell = newCell.replace(readOnlyRegex,'');
            newCell = newCell.replace(/\+/, '')

             newCell = newCell.replaceAll('arrProvider', 'parent.arrProvider')
            newCell = newCell.replace('Label', headdingsArr[cRowIndex].innerText);
            newDiv.innerHTML = newCell;
            newDiv.getElementsByTagName('oj-label-value')[0].setAttribute('label-edge', 'start')
            newDiv.getElementsByTagName('oj-form-layout')[0].setAttribute('label-edge', 'start')
            newDiv.children[0].children[0].children[1].id=newDiv.children[0].children[0].children[1].id.replace(/ /g,'');
            newDiv.children[0].children[0].children[1].id = newDiv.children[0].children[0].children[1].id.replace(/RC'/, 'RC'+rowIndex)
            var converter = newDiv.children[0].children[0].children[1].getAttribute("converter");
            if (converter && (converter.includes("numberConverter") || converter.includes("amountConverter"))) {
                newDiv.children[0].children[0].children[1].setAttribute('onchange', 'formatAmountValues(null,event)');                 
            }            
            
			
			//REDWOOD_35264828 STARTS
			
			if (newDiv.getElementsByTagName('OJ-INPUT-TEXT')[0]){

			var txtButton = newDiv.getElementsByTagName('OJ-INPUT-TEXT')[0].getElementsByTagName('OJ-BUTTON')[0];
			
			if (txtButton){
			
					var treadOnly = txtButton.getAttribute("readonly");
					var treadonly1 = txtButton.getAttribute("readonly1");
					var buttonDisable = txtButton.getAttribute("disabled");
					if ((treadOnly==null || treadOnly1==null || treadOnly ==false || treadOnly1==false)
						&&(buttonDisable == null || buttonDisable=='')){
						newDiv.getElementsByTagName("OJ-BUTTON")[0].setAttribute("disabled",false);
						}				
						
			}
			}
			
			//REDWOOD_35264828 ENDS
			
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
                    //REDWOOD_35278106 Starts
                    if(ojDivElem.tagName === "OJ-INPUT-DATE-TIME") 
                    {
                        if (ojTagElem.value != '')
                        {
                            var timeStamp = new Date(ojTagElem.value);
                            ojDivElem.value = timeStamp.toISOString();
                        }
                        else
                            ojDivElem.value = ojTagElem.value;
                    }
                    else
                       ojDivElem.value = ojTagElem.value;
                    //REDWOOD_35278106 Ends
					
					//REDWOOD_35384868 starts
                    if(ojDivElem.tagName === "OJ-SWITCH") 
                    {
						if(ojTagElem.getAttribute("class").indexOf("oj-disabled") != -1){
							  ojDivElem.setAttribute("disabled",true); 
						}
						else{
							ojDivElem.setAttribute("disabled",false);		
						}
                    }
					//REDWOOD_35384868 ends
					
					//REDWOOD_35498061 starts
					if(ojDivElem.tagName === "OJ-INPUT-TEXT" && ojDivElem.getElementsByTagName("OJ-BUTTON")[0])
                    {					
						if(ojTagElem.getAttribute("class").indexOf("oj-read-only") != -1){
							ojDivElem.getElementsByTagName("OJ-BUTTON")[0].setAttribute("disabled",true);		
						}
						else{
							ojDivElem.getElementsByTagName("OJ-BUTTON")[0].setAttribute("disabled",false);		
						}						
                    }
					//REDWOOD_35498061 ends
					
                    if(ojTagElem.readonly) {
                          ojDivElem.setAttribute('readonly',ojTagElem.readonly)
                    }
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
            
 //REDWOOD_CHANGES
}
//Copied from SingleView.js
function fnCopyTableData() {
    tableObjectOld = document.createElement("TABLE");
    var rows = tableObject.getElementsByTagName('tbody')[0].getElementsByTagName('tr'); //REDWOOD_CHANGES
    var row = null;
    var cell = null;
    var newDiv = null;

    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        row = rows[rowIndex];
        if (row) {
            newDiv = document.createElement("div");
            for (var innerIndex = 0; innerIndex < row.cells.length; innerIndex++) {
                cell = row.cells[innerIndex];
				if(cell.children[0]!= undefined) //Redwood_36356779 
                newDiv.innerHTML = cell.children[0].innerHTML;//static header change
                var cellElements = cell.getElementsByTagName("INPUT");
                var newCellElements = newDiv.getElementsByTagName("INPUT");
                for (var i = 0; i < cellElements.length; ++i) {
                    if (cellElements[i].type.toUpperCase() == "CHECKBOX") {
                        newCellElements[i].checked = cellElements[i].checked;
                    }
                }
            }
        }
    }
}

function setMESVCellData(currentRow, newDiv) {
//REDWOOD_CHANGES
    //var cells = currentRow.cells;
    var cells = [...currentRow.cells];
    cells=cells.filter((td) =>  ![...td.classList].includes('TDnone'))
    cells = cells.filter(cell=> ![...cell.classList].includes('oj-table-selector-cell'))
//REDWOOD_CHANGES
    for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
//REDWOOD_CHANGES
        setInputData(newDiv, cells[cellIndex].getElementsByTagName("OJ-INPUT-TEXT"), cellIndex);
//        setSelectData(newDiv, cells[cellIndex].getElementsByTagName("SELECT"), cellIndex);
//        setTextAreaData(newDiv, cells[cellIndex].getElementsByTagName("TEXTAREA"), cellIndex);
//REDWOOD_CHANGES 
    }
}

function setInputData(newDiv, inputElem, cellIndex) {
//REDWOOD_CHANGES
        console.log('in 2', newDiv.getElementsByTagName('oj-input-text')[0])
        console.log(inputElem[0].value)
        newDiv.getElementsByTagName('oj-input-text')[0].value = inputElem[0].value;
    


//    if (inputElem && inputElem.length>0 && inputElem[0].value) {
//     if (newDiv.getElementsByTagName("OJ-INPUT-TEXT") && newDiv.getElementsByTagName("OJ-INPUT-TEXT").length>0){
//        newDiv.getElementsByTagName("OJ-INPUT-TEXT")[0].value = inputElem[0].value;
//        newDiv.getElementsByTagName("OJ-INPUT-TEXT")[0].setAttribute('value', inputElem[0].value);
//        //newDiv.getElementsByTagName("OJ-INPUT-TEXT")[0].refresh();
//        fireHTMLEvent(newDiv.getElementsByTagName("OJ-INPUT-TEXT")[0], "onpropertychange");
//     }
//        
//    }
    
    
    //    var type = inputElem[0].type;
//        if (newDiv.getElementsByTagName("INPUT")[0].name == inputElem[0].name) {
//            switch (type.toUpperCase()) {
//            case 'TEXT':
//            case 'HIDDEN':
//                {
//                    if (getOuterHTML(inputElem[0]).indexOf("displayAmount") != -1) {
//                        newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
//                        fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
//                        break;
//                    } else if (getOuterHTML(inputElem[0]).indexOf("displayFormattedNumber") != -1) {
//                        newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
//                        fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
//                        break;
//                    } else if (getOuterHTML(inputElem[0]).indexOf("displayDate") != -1) {
//                        newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
//                        fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
//                        break;
//                    } else {
//                        newDiv.getElementsByTagName("INPUT")[0].value = inputElem[0].value;
//                        fireHTMLEvent(newDiv.getElementsByTagName("INPUT")[0], "onpropertychange");
//                        break;
//                    }
//
//                }
//            case 'CHECKBOX':
//                {
//                    if (inputElem[0].checked) {
//                        newDiv.getElementsByTagName("INPUT")[0].checked = true;
//                    } else {
//                        newDiv.getElementsByTagName("INPUT")[0].checked = false;
//                    }
//                    break;
//                }
//            }
//        }		
//REDWOOD_CHANGES

}

function setSelectData(newDiv, selectElem, cellIndex) {
	//Fix for 24471666
    if (selectElem.length > 0 && newDiv.getElementsByTagName("SELECT")[0] && newDiv.getElementsByTagName("SELECT")[0].name == selectElem[0].name) {
		setSelectedIndex(newDiv.getElementsByTagName("SELECT")[0], selectElem[0].value);
	}
}

function setTextAreaData(newDiv, textareaElem, cellIndex) {
    //if (textareaElem.length > 0 && newDiv.getElementsByTagName("TEXTAREA")[cellIndex]) newDiv.getElementsByTagName("TEXTAREA")[0].value = textareaElem[0].value; //9NT1606_12_4_RETRO_12_1_26230944 commented
	if (textareaElem.length > 0 && newDiv.getElementsByTagName("TEXTAREA")[0] && newDiv.getElementsByTagName("TEXTAREA")[0].name == textareaElem[0].name ) newDiv.getElementsByTagName("TEXTAREA")[0].value = textareaElem[0].value;/*9NT1606_12_4_RETRO_12_1_26230944 changes */
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
//REDWOOD_CHANGES
    //parent.document.getElementById("ChildWin").style.left = "4px";
    parent.document.getElementById("ChildWin").style.zIndex= 5980; //REDWOOD_CHANGES
    if (typeof (parent.fromSubScr) == 'undefined') {
        var parentScrID = parent.seqNo;
        parentDivHeight = parent.parent.document.getElementById(parentScrID).clientHeight + "px";
        parentIFrame = parent.parent.document.getElementById(parentScrID).children[0].clientHeight + "px";
        parentDIVScrContainer = parent.document.getElementById("DIVScrContainer").clientHeight + "px";
        if (parent.parent.document.getElementById(parentScrID).style.height < parent.document.getElementById("ChildWin").style.height) {
//REDWOOD_CHANGES
          //  parent.parent.document.getElementById(parentScrID).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
          //  parent.parent.document.getElementById(parentScrID).children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
          //  parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
//REDWOOD_CHANGES
        }
    } else {
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

function fnUpdateDataBackToME() {
    var sViewTObject = document.getElementById("SINGLE_VIEW");
    var rows = tableObject.getElementsByTagName('tbody')[0].getElementsByTagName('tr');//REDWOOD_CHANGES

    if (currentRow) {
        for (var rowIndex = 0; rowIndex < sViewTObject.children.length; rowIndex++) {
            var cElem = sViewTObject.children[rowIndex];
            if (cElem) {
                if (cElem.childNodes[0]) {
                    if (cElem.getElementsByTagName("INPUT").length > 0) {
                        updateInputElements(cElem.getElementsByTagName("INPUT"), rowIndex);
                    } else if (cElem.getElementsByTagName("SELECT").length > 0) {
                        updateSelectElements(cElem.getElementsByTagName("SELECT"), rowIndex);
                    } else if (cElem.getElementsByTagName("TEXTAREA").length > 0) {
                        updateTextareaElements(cElem.getElementsByTagName("TEXTAREA"), rowIndex);
                    }
                }
            }
        }
    }
}

function updateInputElements(currentElem, rowIndex) {
//REDWOOD_CHANGES
//    if (currentRow.cells[rowIndex + 1]) {
//    }
    var cells = [...currentRow.cells];
    cells=cells.filter((td) =>  ![...td.classList].includes('TDnone'))
    var row =  cells[rowIndex + 1].getElementsByTagName("INPUT")[0];  
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
            } else if (getOuterHTML(currentElem[0]).indexOf("displayFormattedNumber") != -1) {
                row.value = currentElem[0].value;
                fireHTMLEvent(row, "onpropertychange");
                break;
            } else if (getOuterHTML(currentElem[0]).indexOf("displayDate") != -1) {
                row.value = currentElem[0].value;
                fireHTMLEvent(row, "onpropertychange");
                break;
            } else {
                row.value = currentElem[0].value;
//REDWOOD_CHANGES
                var parentOjElem = row.parentElement;
                while (parentOjElem.tagName.substring(0,2) !== 'OJ'){
                    parentOjElem = parentOjElem.parentElement;
                    
                }
//Redwood_36356779 Starts				
				if(parentOjElem.tagName === "OJ-INPUT-DATE") {
					if(parentOjElem.value != currentElem[0].value){
						var tempelem =currentElem[0];
						
						while (tempelem.tagName.substring(0,2) !== 'OJ'){
						tempelem = tempelem.parentElement;
						}
						currentElem[0].value=tempelem.value;
					}
				}
//Redwood_36356779 ends
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
                else if(parentOjElem.tagName === "OJ-INPUT-DATE-TIME") {
                    if (currentElem[0].value != '')
                    {
                        var timeStamp = new Date(currentElem[0].value);
                        row.value = timeStamp.toISOString();
                    }
                    else
                        row.value = currentElem[0].value;
                }
				
//REDWOOD_CHANGES                
                break;
            }

        }
    case 'CHECKBOX':
        {
            if (currentElem[0].checked) {
                row.checked = true;
                row.parentElement.value = true;	  //REDWOOD_CHANGES
            } else {
                row.checked = false;
                row.parentElement.value = false;  //REDWOOD_CHANGES
            }
            break;
        }
    }
}

function updateSelectElements(currentElem, rowIndex) {
	//Fix for 24471666 starts
	var row = currentRow.cells[rowIndex + 1].getElementsByTagName("SELECT")[0];
    setSelectedIndex(row, currentElem[0].value);
	//Fix for 24471666 ends
}

function updateTextareaElements(currentElem, rowIndex) {
    //currentRow.getElementsByTagName("TEXTAREA")[0].value = currentElem[0].value; //9NT1606_12_4_RETRO_12_1_26230944 commented 
	/* 9NT1606_12_4_RETRO_12_1_26230944 starts */
    var row = currentRow.cells[rowIndex + 1].getElementsByTagName("TEXTAREA")[0];
	if(row && row.name == currentElem[0].name)
    row.value = currentElem[0].value;
   /* 9NT1606_12_4_RETRO_12_1_26230944 ends */
}

function fnEnabeButtonsInME() {
    var currElement = null;
    var nextElement = null;
    var rows = tableObject.getElementsByTagName('tbody')[0].getElementsByTagName('tr');//REDWOOD_CHANGES
    var cRow = null;
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        cRow = rows[rowIndex];
        if (cRow) {
            for (var iRowIndex = 0; iRowIndex < cRow.cells.length; iRowIndex++) {
                currElement = cRow.cells[iRowIndex].getElementsByTagName("INPUT")[0];
                if (currElement) {
                    if (getToolBarNextSibling(currElement)) {
                        nextElement = getNextSibling(currElement);
                        if (nextElement) {
                            if (nextElement.tagName.toUpperCase() == "BUTTON") {
                                if (currElement.disabled) {
                                    nextElement.disabled = true;
                                } else {
                                    nextElement.disabled = false;
                                }
                            }
                        }
                    }
                }
                if (currElement) {
                    if (currElement.type.toUpperCase() == "BUTTON") {
                        currElement.disabled = false;
                    }
                }
                currElement = cRow.cells[iRowIndex].getElementsByTagName("BUTTON")[0];
                if (currElement) {
                    //currElement.disabled = false; 12_0_2_RETRO_12_2_23652276
                    if (getPreviousSibling(currElement)) {
                        if (getPreviousSibling(currElement).disabled) currElement.disabled = true;
                    }
                }
            }
        }
    }
}

function fnDispNextSingleViewRecord() {
    fnDisplaySingleViewRecord("NEXT");
}

function fnDispPrevSingleViewRecord() {
    fnDisplaySingleViewRecord("PREV");
}

function fnSaveSingleViewScreen() {
    fnUpdateDataBackToME();
    fnEnabeButtonsInME();
    saveFlag = true;
    if (typeof (parent.fromSubScr) == 'undefined') {
        if (parentDivHeight < parent.document.getElementById("ChildWin").style.height) {
            var parentScrID = parent.seqNo;
            parent.parent.document.getElementById(parentScrID).style.height = parentDivHeight;
            parent.parent.document.getElementById(parentScrID).children[0].style.height = parentIFrame;
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer;
        }
    } else {
        if (parentDivHeight < parent.document.getElementById("ChildWin").style.height) {
            parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight;
            parent.parent.document.getElementById("ChildWin").children[0].style.height = parentIFrame;
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer;
        }
    }
    parent.document.getElementById("paging_" + blockId).focus();  //REDWOOD_CHANGES
    parent.fnExitSingleViewScreen();
}

function fnExitSingleView() {
    fnEnabeButtonsInME();
    if (typeof (parent.fromSubScr) == "undefined") {
        var parentScrID = parent.seqNo;
        if (parentDivHeight < parent.document.getElementById("ChildWin").style.height) {
            parent.parent.document.getElementById(parentScrID).style.height = parentDivHeight;
            parent.parent.document.getElementById(parentScrID).children[0].style.height = parentIFrame;
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer;
        }
    } else {
        if (parentDivHeight < parent.document.getElementById("ChildWin").style.height) {
            parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight;
            parent.parent.document.getElementById("ChildWin").children[0].style.height = parentIFrame;
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer;
        }
    }
    parent.document.getElementById("paging_" + blockId).focus(); //REDWOOD_CHANGES
    parent.fnExitSingleViewScreen();
}

function fnCloseAlertWin() {
    unmask();
    return false;
}

function SingleViewAccessKeys(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var tblObj = document.getElementById("SINGLE_VIEW").children;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.keyCode == 27) {
        fnExitSingleView();
        return;
    } else if (evnt.keyCode == 38) {
        if (srcElement.tagName != "SELECT") {
            fnDispPrevSingleViewRecord();
            for (var i = 0; i < tblObj.length; i++) {
                if (tblObj[i].children[1]) {
                    if (tblObj[i].children[1].name == srcElement.name) {
                        tblObj[i].children[1].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                } else {
                    if (tblObj[i].children[0].children[0].name == srcElement.name) {
                        tblObj[i].children[0].children[0].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    } else if (evnt.keyCode == 40) {
        if (srcElement.tagName != "SELECT") {
            fnDispNextSingleViewRecord();
            for (var i = 0; i < tblObj.length; i++) {
                if (tblObj[i].children[1]) {
                    if (tblObj[i].children[1].name == srcElement.name) {
                        tblObj[i].children[1].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                } else {
                    if (tblObj[i].children[0].children[0].name == srcElement.name) {
                        tblObj[i].children[0].children[0].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    } else if (!evnt.ctrlKey && evnt.keyCode == 115) {
        var event = evnt;
        if (getNextSibling(srcElement) && getNextSibling(srcElement).tagName == "BUTTON") {
            if (srcElement.disabled == false && !srcElement.readOnly) {
                if (getIEVersionNumber() > 0) fireHTMLEvent(getNextSibling(srcElement), "onclick");
                else {
                //eval(getNextSibling(srcElement).getAttribute("onclick"));
                var fnEval = new Function("event",getNextSibling(srcElement).getAttribute("onclick"));  
                fnEval();
                }
            } else if (srcElement.getAttribute("INPUT_LOV")) {
                if (getIEVersionNumber() > 0) fireHTMLEvent(getNextSibling(srcElement), "onclick");
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
        } catch (e) {}
        return false;
    }
}

function fnHandleSVBtn(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.shiftKey && evnt.keyCode == 9) {
        if (srcElement == document.getElementById("WNDbuttons")) document.getElementById("BTN_EXIT_IMG").focus();
        else document.getElementsByName("BTN_OK")[0].focus();
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 9) {
        if (srcElement == document.getElementById("WNDbuttons")) document.getElementById("TBL_SINGLE_VIEW_BUTTONS").getElementsByTagName("BUTTON")[0].focus();
        else document.getElementById("WNDbuttons").focus();
        preventpropagate(evnt);
        return false;
    }
}
function isMultipleEntry(dataSrc) {  //21505219  
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
}//21505219  