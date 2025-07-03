/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtEditor.js
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
Copyright © 2004-2015   by Oracle Financial Services Software Limited..


	**		Modified By           : Rishabh Gupta
	**		Modified On           : 19-Sept-2016
	**		Modified Description  : Bug 24344307 - SETTLEMENTS TAB- DIALOG BOX SCREEN CONTROLS ARE NOT VISIBLE 
	**		Search string         : Bug_24344307
	**
    **  Modified By          : Neethu Sreedharan
    **  Modified On          : 11-Jul-2017 
    **  Modified Reason      : Changes done to handle popup editor operation in Single view screen of ME block  
    **  Retro Source         : 9NT1606_12_2_INTERNAL	
    **  Search String        : 9NT1606_12_4_RETRO_12_2_26230337
	
	**  Modified By           : Karthigadevi P
    **  Modified On           : 05-Oct-2017 
    **  Modified Reason       : Code changes done to handle display of data in popup editor of Multiple entry block
    **  Retro Source          : 9NT1606_12_4_RETRO_12_3_26780570
    **  Search String         : Bug#26896721

	**  Modified By           : Manoj S
    **  Modified On           : 15-05-2023 
    **  Modified Reason       : Handled Textarea field for Multiple Entries.
    **  Search String         : redwood_35390699

	**  Modified By           : Manoj S
    **  Modified On           : 15-05-2023 
    **  Modified Reason       : Handled Textarea field for Multiple Entries.
    **  Search String         : redwood_35494276

---------------------------------------------------------------------------------------------------- 
*/
function fnDisplayEditor(e) {
	// fix for bug:19203135  starts
	var editorElem = parent.editorSrcElem;
	if(editorElem != undefined && parent.location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1) { // fix for bug:19692167 //9NT1606_12_4_RETRO_12_2_26230337 changes 
		while (editorElem.tagName.toUpperCase() != "FIELDSET") {
			editorElem = editorElem.parentNode;
		}
	}
	// fix for bug:19203135  ends
    if (parent.document.getElementById(elemId) && !parent.document.getElementById(elemId).getAttribute("VIEW") && mainWin.gActiveWindow.routingType == "X") {//OJET Migration //REDWOOD_CHANGES
     // fix for bug:19203135 starts  
	   /* var editorElem = parent.editorSrcElem;
        while (editorElem.tagName.toUpperCase() != "FIELDSET") {
            editorElem = editorElem.parentNode;
        }*/
	// fix for bug:19203135 ends
        if (editorElem.getAttribute("VIEW") == "SE") {
            document.getElementById("TA").value = parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum].value;// Bug_24344307  changed recNum - 1 to recNum
        } else {
            var l_tableobj = getTableObjForBlock(elemId.split("__")[0], parent.document);
            if (l_tableobj) {
                for (var j = 0; j < l_tableobj.rows[recNum-1].cells.length; j++) {  //Fix for 24671607
                    if (l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[0]) { //REDWOOD_CHANGES
                        var elementId = l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[0].id;	  //REDWOOD_CHANGES
						//SFR#17255467 : Fix for 16474495
						// Fix for 17894977 starts
						//var elementIdNo = elementId.substring(elementId.length-2);
						var elementIdNo = elementId.split(elemId)[1];
						// Fix for 17894977 ends
                        if (isNaN(elementIdNo)) {
                            elementIdNo = elementId.substring(elementId.length-2);  //Fix for 23624805
                        }    
						//Fix for 23624805 Starts
						if (isNaN(elementIdNo)) {
                            elementIdNo = elementId.substring(elementId.length-1); 
                        }    
						 //Bug#26896721 Retro From 26780570 Starts
                        //if (elementId.substring(0, elementId.length - 1) == elemId || elementId == elemId ||elementId == (elemId+elementIdNo)) {
						if (elementId.substring(0, elementId.length - 1) == elemId || elementId == elemId ||elementId == (elemId+"RC"+elementIdNo)) { 
                        //Bug#26896721 Retro From 26780570 Ends
						//SFR#17255467 : Fix for 16474495
                        //if (elementId.substring(0, elementId.length - 1) == elemId || elementId == elemId) {
                            document.getElementById("TA").value = l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[0].value;  //REDWOOD_CHANGES
                            break;
                        }
                    }
                }
            }
        }
    } else {
		// fix for bug:19203135  starts
		if(editorElem != undefined) { // fix for bug:19692167
				if (editorElem.getAttribute("VIEW") == "SE" && editorElem.getAttribute("TYPE") == "ME" ) 
					document.getElementById("TA").value = parent.document.getElementById(elemId).value;
			//}//fix for 19794121
			// fix for bug:19203135  ends
			else if (elemId.indexOf("__") != -1) {
				//document.getElementById("TA").value = parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum].value; //redwood_35390699 commented
			var rowNum=recNum-1;//redwood_35390699 //redwood_35494276 
			document.getElementById("TA").value = parent.document.getElementById(elemId+"RC"+rowNum).value;//redwood_35390699 
			}
			else document.getElementById("TA").value = parent.document.getElementsByName(elemId)[recNum].value;// Bug_24344307  changed recNum - 1 to recNum
		}//fix for 19794121
		else document.getElementById("TA").value = parent.document.getElementsByName(elemId)[recNum] && parent.document.getElementsByName(elemId)[recNum].value;  // fix for bug :19888522 FIX FOR BUG 21376306 //REDWOOD_CHANGES
    }
    var previousSibling = getPreviousSibling(document.getElementById("TA")); //REDWOOD_CHANGES
    if (previousSibling) setInnerText(previousSibling, title);	  //REDWOOD_CHANGES
}

function fnOK() {
    var enteredLength = document.getElementById("TA").value.length;
    var message = mainWin.getItemDesc('LBL_INFRA_ENTEREDCHARS');
    message += enteredLength;
	/*Fix for 17223006 Starts*/
	message += " " + mainWin.getItemDesc('LBL_INFRA_MAXCHARS');
    message += " " + maxLength;
	/*Fix for 17223006 Ends*/
	/* Fix for 16504997 */
    //if ((document.getElementById("TA").tagName != "TEXTAREA") && (enteredLength > maxLength)) { //Fix for bug 17239444 
	if((maxLength !=0) && (enteredLength > maxLength)){
        alert(message);
        return false;
    }
	// fix for bug:19203135  starts
		
		var editorElem = parent.editorSrcElem;
        if(editorElem != undefined  && parent.location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1) { // fix for bug:19692167 //9NT1606_12_4_RETRO_12_2_26230337 changes 
			while (editorElem.tagName.toUpperCase() != "FIELDSET") {
	            editorElem = editorElem.parentNode;
	        }
		}
	// fix for bug:19203135  ends
    if (parent.document.getElementById(elemId.split("__")[0]) && !parent.document.getElementById(elemId.split("__")[0]).getAttribute("VIEW") && mainWin.gActiveWindow.routingType == "X") {
        
        if (editorElem && editorElem.getAttribute("VIEW") == "SE") {//REDWOOD_CHANGES
            parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum].value = document.getElementById("TA").value.substr(0, maxLength);
        } else {
            var l_tableobj = getTableObjForBlock(elemId.split("__")[0], parent.document);
            if (l_tableobj) {
                for (var j = 0; j < l_tableobj.rows[recNum - 1].cells.length; j++) {
                    if (l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[0]) { //REDWOOD_CHANGES
                        var elementId = l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[0].id;	//REDWOOD_CHANGES
						 //SFR#17255467 : Fix for 16474495 
                        var elementIdNo = elementId.substring(elementId.length-2);
                        if (isNaN(elementIdNo)) {
                            elementIdNo = elementId.substring(elementId.length-1); 
                        }                        
                        //if (elementId.substring(0, elementId.length - 1) == elemId || elementId == elemId) {
						//Bug#26896721 Retro From 26780570 Starts
                        //if (elementId.substring(0, elementId.length - 1) == elemId || elementId == elemId ||elementId == (elemId+elementIdNo)) {
						if (elementId.substring(0, elementId.length - 1) == elemId || elementId == elemId ||elementId == (elemId+"RC"+elementIdNo)) { 
                        //Bug#26896721 Retro From 26780570 Ends
                        //SFR#17255467 : Fix for 16474495 
							l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[0].value = document.getElementById("TA").value.substr(0, maxLength); //REDWOOD_CHANGES
                            break;
                        }
                    }
                }
            }
        }
    } else {
		// fix for bug:19203135  starts
		if(editorElem != undefined) { // fix for bug:19692167
			if (editorElem.getAttribute("VIEW") == "SE" && editorElem.getAttribute("TYPE") == "ME" ) {
	             parent.document.getElementById(elemId).value =  document.getElementById("TA").value.substr(0, maxLength);
	    	}   
	    //}//fix for 19794121
		// fix for bug:19203135  ends
        else if (elemId.indexOf("__") != -1) { //Fix for 23015726 Starts
			if (parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum].tagName == "TEXTAREA" && maxLength ==0)
				parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum].value = document.getElementById("TA").value;
			else
				parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum].value = document.getElementById("TA").value.substr(0, maxLength);
		// Fix for Bug 17239444  start - Added else if 
		}else if (document.getElementById("TA").tagName == "OJ-TEXT-AREA" && maxLength ==0) //Fix for 16504997,23015726 ends		  //REDWOOD_CHANGES
		parent.document.getElementsByName(elemId)[recNum].value = document.getElementById("TA").value;
		// Fix for Bug 17239444  end 
        else parent.document.getElementsByName(elemId)[recNum].value = document.getElementById("TA").value.substr(0, maxLength);
		}//fix for 19794121
		else parent.document.getElementsByName(elemId)[recNum].value = document.getElementById("TA").value.substr(0, maxLength); // fix for bug :19888522
    }
    fnExitEditor();
}

function alert(message) {
    mask();
    showAlerts(fnBuildAlertXML('', 'I', message), 'I');
    alertAction = "UNMASK";
}

function accessKeyEditor(e) {
    var e = window.event || e;
	var sourceElem = getEventSourceElement(e);
    if(e.ctrlKey && (e.keyCode == 67 || e.keyCode == 88) && restrictReqd == 'Y'){//jc2 changes begin //PIPA
        try {
            e.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(e);
        fnDisableBrowserKey(e);
        return false;
    }//jc2 changes end //PIPA
	if(e.ctrlKey && (e.keyCode == 80) && restrictPrint == 'Y'){//jc2 changes begin //PIPA
        try {
            e.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(e);
        fnDisableBrowserKey(e);
        return false;
    }//jc2 changes end //PIPA
    if (e.keyCode == 27) {
        fnExitEditor();
        return;
   } else if (e.keyCode == 8) {  //Fix for 16514685 
        	if ((sourceElem.tagName.toUpperCase() == 'TEXTAREA') && (sourceElem.readOnly != true)) {
            return true;
        } else {
        //Fix for 16980794 Start
            fnDisableBrowserKey(e);
            preventpropagate(e);
            try {
                e.keyCode = 0;
        //Fix for 16980794 End
            } catch (e) {}
            return false;
        }
    }else{ 
       return disableCommonKeys(e);
    }
}

function setHeights() {
    var childWinObj = parent.document.getElementById("ChildWin");
 //REDWOOD_CHANGES   
    // childWinObj.style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
    childWinObj.className = "oj-sm-width-full";
    childWinObj.style.height = "90%";
    //childWinObj.style.width = "50%";
    childWinObj.children[0].height = "100%";
    childWinObj.children[0].width = "100%";
   // childWinObj.children[0].style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
   // parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
    childWinObj.style.zIndex= 5990;
    childWinObj.style.top = "0px";
//    childWinObj.style.left = "4px";
    
//    var textAreaObj = document.getElementById("DIVScrContainer");
//    var childWinHeight = childWinObj.offsetHeight;
//    var titleBarHeight = document.getElementById("WNDtitlebar").offsetHeight;
//    var buttonDivHeight = document.getElementById("buttonDiv").offsetHeight;
    
   // textAreaObj.style.height = (childWinHeight - titleBarHeight - buttonDivHeight) + "px"; 
//REDWOOD_CHANGES

    var editorWinObj = parent.document.getElementById("Div_ChildWin");
    editorWinObj.focus();
    document.getElementById("TA").focus();
}

function fnExitEditor() {
    parent.unmask();
	// fix for bug:19203135  starts
     var editorElem = parent.editorSrcElem;
     var parentElement;
     if(editorElem != undefined  && parent.location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1){  // fix for bug:19692167 //9NT1606_12_4_RETRO_12_2_26230337 changes 
      while (editorElem.tagName.toUpperCase() != "FIELDSET") {
            editorElem = editorElem.parentNode;
        }
     }
	// fix for bug:19203135  ends
    if (parent.document.getElementById(elemId.split("__")[0]) && !parent.document.getElementById(elemId.split("__")[0]).getAttribute("VIEW") && mainWin.gActiveWindow.routingType == "X") {
       
        if (editorElem.getAttribute("VIEW") == "SE") {
             parentElement = parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum]; //fix for bug:19203135
            if (!parentElement.disabled && typeof (parentElement.type) != "undefined" && parentElement.type.toUpperCase() != "HIDDEN") {
                parentElement.focus();
            }
        } else {
            var l_tableobj = getTableObjForBlock(elemId.split("__")[0], parent.document);
            if (l_tableobj) {
                for (var j = 0; j < l_tableobj.rows[recNum - 1].cells.length; j++) {
                    if (l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[1]) {
                        var elementId = l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[1].id;
                        if (elementId.substring(0, elementId.length - 1) == elemId || elementId == elemId) {
                            if (!l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[1].disabled) {
                                parentElement = l_tableobj.tBodies[0].rows[recNum - 1].cells[j].children[0].children[1]; //fix for bug:19203135
                                if (!parentElement.disabled && typeof (parentElement.type) != "undefined" && parentElement.type.toUpperCase() != "HIDDEN") {
                                    parentElement.focus();
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    } else {
		// fix for bug:19203135  starts
		if(editorElem != undefined){ // fix for bug:19692167
			if (editorElem.getAttribute("VIEW") == "SE" && editorElem.getAttribute("TYPE") == "ME" ) {
	             parentElement = parent.document.getElementById(elemId);
	            if (!parentElement.disabled && typeof (parentElement.type) != "undefined" && parentElement.type.toUpperCase() != "HIDDEN") {
	                parentElement.focus();
	            }
	        }
	    //}//fix for 19794121
		// fix for bug:19203135  ends
        else if (elemId.indexOf("__") != -1) {
            var parentElement = parent.document.getElementsByName(elemId.substring(elemId.lastIndexOf("__") + 2))[recNum];
            if (!parentElement.disabled && typeof (parentElement.type) != "undefined" && parentElement.type.toUpperCase() != "HIDDEN") {
                parentElement.focus();
            }
        } else {
             parentElement = parent.document.getElementsByName(elemId)[recNum];//fix for bug:19203135
            if (!parentElement.disabled && typeof (parentElement.type) != "undefined" && parentElement.type.toUpperCase() != "HIDDEN") {
                parentElement.focus();
            } else if (getOuterHTML(parentElement).indexOf("displayFormattedNumber") > 0) {
                parent.document.getElementsByName(elemId + "I")[recNum].focus();
            }
        }
		}//fix for 19794121
		else {  // fix for bug :19888522
             parentElement = parent.document.getElementsByName(elemId)[recNum];//fix for bug:19203135
            if (parentElement && !parentElement.disabled && typeof (parentElement.type) != "undefined" && parentElement.type.toUpperCase() != "HIDDEN") {//REDWOOD_CHANGES
                parentElement.focus();
            } else if (getOuterHTML(parentElement).indexOf("displayFormattedNumber") > 0) {
                parent.document.getElementsByName(elemId + "I")[recNum].focus();
            }
        } // fix for bug :19888522
    }
    var winDivObj = parent.document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

function fnHandleEditorBtn(e) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (evnt.shiftKey && evnt.keyCode == 9) {
        if (srcElement.id == "WNDbuttons") document.getElementById("BTN_EXIT_IMG").focus();
        else document.getElementById("BTN_OK_IMG").focus();
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 9) {
        if (srcElement.id == "WNDbuttons") document.getElementById("TA").focus();
       // else document.getElementById("WNDbuttons").focus();  //REDWOOD_CHANGES
        preventpropagate(evnt);
        return false;
    }
}