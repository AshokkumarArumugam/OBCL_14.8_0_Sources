/*----------------------------------------------------------------------------------------------------
**
** File Name    : UIUtil.js
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
 **    Changed By            	: Pavan Gupta (Suggested by infra)
 **    Changed On            	: 10-May-2013
 **    Bug No                   : 16792152(Retro from 16491625)
 **    Change Description    	: Code added to fetch the correct block ID while resetting 
									the elements on adding a new row in Multiple Asset screen 
 **    Search string         	: INTERNAL_12.0.2_16792152
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
**  Modified By          : Neethu Sreedharan
**  Modified On          : 22-Sep-2016
**  Modified Reason      : Changes done to wrap the field value when conversion of text to text area is 
                           done
**  Retro Source         : 9NT1606_12_0_3_CARIBBEAN_DEVELOPMENT_BANK
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_23652948

**  Modified By          : Rishabh Gupta
**  Modified On          : 27-Sep-2016
**  Modified Reason      : Dragging restricted when parent screen is masked.
**  Search String        : 12_1_RETRO_12_2_23652976
**  SFR no.  			 : 23652976

**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Sep-2016
**  Modified Reason      : The schedules block has been disabled as the same can be amended from the 
                           contract level. changed the function that was used to disable the elements 
                           in schedules tab UIUtil.js modified to disable/hide the buttons when the 
                           parent field is disabled. 
**  Retro Source         : 9NT1606_12_0_1_SMALL_MEDIUM_ENTERPRISE_DEVELOPMENT_BANK_MALAYSIA_BERHAD 
**  Search String        : 9NT1606_12_2_RETRO_12_0_1_23654899

**  Modified By          : Neethu Sreedharan
**  Modified On          : 30-Sep-2016
**  Modified Reason      : Code modified to pop up auto lov window when user does enter query operation. 
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_2_RETRO_12_0_2_23651196

**  Modified By          : Neethu Sreedharan
**  Modified On          : 07-Oct-2016
**  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                           to user as alert and on click of Ok button on alert window, screen will be 
                           unmasked and user can try the action again.
**  Retro Source         : 9NT1606_12_0_3_INTERNAL
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929

**  Modified By          : Saloni Rai
**  Modified On          : 29-Nov-2016
**  Modified Reason      : Code modified to enable cancel button and pop-up buttons. 
**  Search String        : Bug#25089729 

**  Modified By          : Saloni Rai
**  Modified On          : 07-Dec-2016
**  Modified Reason      : Code modified to enable proper functioning of the pop-up buttons. 
**  Search String        : Bug#25089729_1

**  Modified By          : Nalandhan G
**  Modified On          : 27-Jun-2017 
**  Modified Reason      : Code added to pass the LOV ID from screenargs
**  Retro Source         : Fix for 25655912
**  Search String        : 9NT1606_12_4_RETRO_12_0_3_26230499

**  Modified By          : Neethu Sreedharan
**  Modified On          : 2-Aug-2017 
**  Modified Reason      : code changes done in fnExpandCollapseSubSys. while assigning height for mainTabContainer. 
                           Also Subssytem display style changes is handled. 
**  Retro Source         : 9NT1606_12_1_BANK_AUDI
**  Search String        : 9NT1606_12_4_RETRO_12_1_26230371

**  Modified By          : Neethu Sreedharan
**  Modified On          : 11-Aug-2017 
**  Modified Reason      : Changes done to pass MESV attribute as part of the request parameter to avoid 
                           the screen hanging issue 
**  Retro Source         : 9NT1606_12_2_CENTRAL_BANK_OF_MALTA
**  Search String        : 9NT1606_12_4_RETRO_12_2_26583097  

**  Modified By          : Neethu Sreedharan
**  Modified On          : 11-Aug-2017 
**  Modified Reason      : Changes done to provide space between checkbox and the label. Changes also 
                           provided to drag the screen to right in case of Arabic user
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_4_RETRO_12_0_2_26231164

**  Modified By          : Ambika Selvaraj
**  Modified On          : 03-Oct-2017
**  Description          : Code changes done to accomodate special characters() used in reduction fields and bind variables of LOV. 
                           '_OPARAN_' and '_CPARAN_' are the notations used to identify '(' and ')' respectively. 
**  Retro Source         : 9NT1606_12_0_3_BANK_AUDI
**  Search String        : 9NT1606_12_4_RETRO_12_0_3_26861671

**   Modified By         : Ambika Selvaraj
**   Modified On         : 24-Oct-2017
**   Modified Reason   	 : Changes done to return proper date in case of different time zones. 
**   Retro Source        : 9NT1606_12_1_AFIANZADORA ASERTA
**   Search String       : 9NT1606_12_4_RETRO_12_1_26939865

**   Modified By         : Ambika Selvaraj
**   Modified On         : 07-Nov-2017
**   Modified Reason   	 : Code changes done to reset the dynamic text area field when query screen is done.
**   Retro Source        : 9NT1606_12_3_COÖPERATIEVE RABOBANK U.A.
**   Search String       : 9NT1606_12_4_RETRO_12_3_27074483

**    Changed By            	: Siva Kamisetti
**    Changed On            	: 01-Dec-2017
**    Modified Reason   	    : Code changes done to Fetch the proper Filed Name 
**    Search string         	: bug_27182547

**	Modified By          : Ambika S
** 	Modified on          : 31-Jan-2018
** 	Description          : Changes done to auto fill Date Separator on inputting value on Date fields.
                           The Date separator should be based on Date format configured in User Settings.
** 	Search String        : 9NT1606_14_0_RETRO_12_0_3_27393036

**    Changed By         : Indirakumari C
**    Changed On         : 06-Oct-2022
**    Modified Reason    : While displaying print screen, fix added to fetch respective type, related
                           currency field for amount fields and type for date and timestamp fields 
**    Retro string       : bug_34135792
**    Search string      : Bug_34673736
**
**	Modified By          : Bhawana Mishra
** 	Modified on          : 05-Dec-2022
** 	Modified Reason      : Code changes done to return proper date.
** 	Search String        : bug#34786584
**
**	Modified By          : Shayam Sundar Ragunathan
** 	Modified on          : 20-Apr-2023
** 	Modified Reason      : Redwood changes
** 	Search String        : REDWOOD_35282887
**
**	Modified By          : Arunkumar R
** 	Modified on          : 20-Apr-2023
** 	Modified Reason      : Code changes for Script error occured from summary screens in Redwood
** 	Search String        : bug#35262971
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 11-May-2023
**  Reason               : Added setTimeout() function to enable/disable fields after screen loading
**  Search String        : REDWOOD_35381225
**
**  Modified By          : Manoj S
**  Modified On          : 01-Jun-2023
**  Reason               : instead of using getElementid passing OjName
**  Search String        : Redwood_35326828
**
**  Modified By          : Manoj S
**  Modified On          : 15-Jun-2023
**  Reason               : instead of using getElementid passing OjName
**  Search String        : Redwood_35283152
**
**  Modified By          : Manoj S
**  Modified On          : 27-Jun-2023
**  Reason               : Lov button Enable handled 
**  Search String        : REDWOOD_35438955
**
**  Modified By          : Manoj S
**  Modified On          : 15-Jun-2023
**  Reason               : Redwood Fixes - Focusing the first Text field when Lov screen Launched.
						  Reading Tables rows order is corrected as per index format.
**  Search String        : REDWOOD_35313042
						   REDWOOD_35457560
**
**  Modified By          : Manoj
**  Modified On          : 13-Sep-2023
**  Modified Reason      : code added to Tab out from the Table.
**  Search String        : REDWOOD_35454138
**
**  Modified By          : Manoj S
**  Modified On          : 10-Oct-2023
**  Reason               : 1.Code changes provided for handling skip ccy validation for first time before OjTable prepare
						   2.validation added for value which has space and not allowing to number conversion
**  Search String        : Redwood_35850089
						   redwood_35892840
**
**  Modified By          : Manoj S
**  Modified On          : 27-Oct-2023
**  Reason               : add settimeout to load expanddata of call forms.
**  Search String        : REDWOOD_35944380
**
**  Modified By          : Chidambaram P
**  Modified On          : 26-Feb-2024
**  Modified Reason      : Fix provided to enable hotkeys functionality when pressed from 
						   non-extensible callforms.
**  Search String        : FCUBS_CNSL_OTPBANK_36210496

**  Modified By          : Chaitanya Pundlik
**  Modified On          : 17-Dec-2024
**  Change Description   : Enable Hotkeys for pps (non-codeployed setups) 
**  Search String        : Bug_36924146
********************************************************************************************
*/
var g_prev_gAction;
var gSeparator = ",";
var gLastHighlightedRow = -1;
var isDetailed = true;
var appndFlg = true;
var innerHTMLArray = new Array();
var tab_arr = new Array();
var tab_ids = new Array();
var tablist_curr_id = 0;
var attachmentData = new Array();
var fileNameArray = new Array();
var checkViewMode = false;
var screenArgs = new Array();

var isAlertOpen=false;
var timerRedirect;
/* LOV NAVIGATION BUTTONS */
var gcNAV_FIRST = 0;
var gcNAV_PREVIOUS = 1;
var gcNAV_GOTO = 2;
var gcNAV_NEXT = 3;
var gcNAV_LAST = 4;
var gcNUM_NAV_BUTTONS = 5;

var parentWinParams = new Object();

var gIsValid = true;
var alertAction = "";
var customAlertAction = "";
/*for auto lov*/
var isAutoLOVOpened = false;
var focusReqd = true;
var focusField = null;
var isSubScreen = false;//12.1 screen height change 
//jc2 changes
if (typeof (screenType) != "undefined" && screenType == "WB"){
	if( typeof(mainWin.branchAvlbltyStatus) == "undefined" || mainWin.branchAvlbltyStatus == null || mainWin.branchAvlbltyStatus=="" )//jc2 changes
	  mainWin.branchAvlbltyStatus  = 'Y';
	}
//jc2 changes end
var isBranchEOI = mainWin.BranchEoi != 'N' || (mainWin.branchAvlbltyStatus !='Y' /* && mainWin.applicationExt == "JP"*/);//Fix for 22377608//24x7 toolbar
/*function fnSetActionTime() {
    inDate = setActionTime();
}
function fnUdateStatus(action,tmpFCJRespDOM)  {
    fnpostAction(action,tmpFCJRespDOM);
}*/

function changeTabPageById(idElem){
    if (gscrPos == 'template') expandcontent("TBLPage" + idElem, document.getElementById(idElem));
    else changeTabPage(document.getElementById(idElem));
}
/* security fixes for WF starts*/
function replaceTilde(data)
{
if (typeof(data) != "undefined" && data != null ) {
if(data.indexOf("~")!=-1)
{
var re = new RegExp("~", "g");
data = data.replace(re, "|");
}
}
  return data;   
}
/* security fixes for WF ends*/
function changeTabPage(elem){
    var dlgArg = dialogArguments;
    gLastHighlightedRow = -1;
    if (!outTab(strCurrentTabID)){
        return;
    }

    var tabTR = document.getElementById("TRTab");
    var tabTDs = tabTR.getElementsByTagName("TD");

    var tabTHead = document.getElementById("THeadTab");
    var tabTHs = tabTHead.getElementsByTagName("TH");

    var numTabs = tabTDs.length - 1;
    for (var idx = 0; idx < numTabs; idx++){
        tabTDs[idx].className = "TDTab";
        if (!isDetailed) document.getElementById("TBLPage" + tabTDs[idx].id).style.display = "none";
        else document.getElementById("TBLPage" + tabTDs[idx].id).style.display = "none";
    }

    if (!isDetailed){
        elem.className = "sTDTabSelected";
    } else{
        elem.className = "TDTabSelected";
    }
    var index = elem.cellIndex;
    tabTHead = document.getElementById("THeadTab");
    tabTHs = tabTHead.getElementsByTagName("TH");
    var selectedPage = document.getElementById("TBLPage" + elem.id);
    if (!isDetailed) selectedPage.style.display = "";
    else selectedPage.style.display = "";

    var operation = gAction;
    if (operation && operation != ""){
        inTab(elem.id);
    } else{
        strCurrentTabID = elem.id;
    }

    if (!isDetailed){
        inTab(elem.id);
    }
    fnAppendHeaderData();
}

//Bug_36924146 Starts
function isRofcFunctionId() {
	/*Code to get the function id on which Hotkey is pressed.
	  If its a callform then parent function is taken */
	
	var funId = functionId;
	if(!!funId && funId.substr(2,1) == "C") {
        funId = parent.functionId;
    }
	
	if(!!funId && mainWin.rofcInstalled == "Y"){
		if(!!(mainWin.g_functionModuleMap[funId]) && 
			 mainWin.g_functionModuleMap[funId].moduleGroupId == "FCROFC"
		){
			return true;
		}else {
			return false;
		}	
	}else {
	    return false;	
	}	
}	
//Bug_36924146 Ends

function deleteTabPages(idPages, strSeparator){
    if (arguments.length < 2){
        strSeparator = gSeparator;
    }
    var arrPages = idPages.split(strSeparator);
    for (var loopIndex = 0; loopIndex < arrPages.length; loopIndex++){
        var elem = document.getElementById(arrPages[loopIndex]);
        elem.parentNode.removeChild(elem);
        elem = document.getElementById("TBLPage" + arrPages[loopIndex]);
        elem.parentNode.removeChild(elem);
    }
}

function hideTabs(idTabs, strSeparator){
    if (arguments.length < 2){
        strSeparator = gSeparator;
    }

    setTabDisplayStyle(idTabs, strSeparator, "none");
}

function showTabs(idTabs, strSeparator){
    if (arguments.length < 2){
        strSeparator = gSeparator;
    }

    setTabDisplayStyle(idTabs, strSeparator, "");
}

function changeTabPageToFirstTab(){
    var tabTable = document.getElementById("SYS_TBL_TABS");
    if (tabTable){
        var firstTabId = tabTable.tBodies[0].rows[0].cells[0].id;
        if (firstTabId == "__")
        {} else{
            changeTabPageById(firstTabId);
        }
    }
}

function setTabDisplayStyle(idTabs, strSeparator, displayStyle){

    var arrTabs = idTabs.split(strSeparator);
    for (var loopIndex = 0; loopIndex < arrTabs.length; loopIndex++){
        if (arrTabs[loopIndex] != null && arrTabs[loopIndex] != ""){
            var elem = document.getElementById(arrTabs[loopIndex]);
            elem.style.display = displayStyle;
        }

    }
}

function setFocus(inpElem){
    var curElem = null;
    var curZIndex = 32768;
    var numElem = inpElem.children.length;
    var tmpElem;
    for (var loopIndex = 0; loopIndex < numElem; loopIndex++){
        tmpElem = inpElem.children(loopIndex);
        switch (tmpElem.tagName.toUpperCase()){
        case "BUTTON":
        case "IMG":
        case "SELECT":
        case "TEXTAREA":
            if ((tmpElem.style.zIndex >= 0) && (tmpElem.style.zIndex < curZIndex) && (tmpElem.disabled == false) && (tmpElem.currentStyle.visibility != "hidden") && (tmpElem.currentStyle.display != "none")){
                curElem = tmpElem;
                curZIndex = tmpElem.style.zIndex;
            }
        case "INPUT":
            if ((tmpElem.type != 'hidden') && (tmpElem.style.zIndex >= 0) && (tmpElem.style.zIndex < curZIndex) && (tmpElem.disabled == false) && (tmpElem.currentStyle.visibility != "hidden") && (tmpElem.currentStyle.display != "none")){
                curElem = tmpElem;
                curZIndex = tmpElem.style.zIndex;
            }
        }
    }
    if (curElem){
        try{
            curElem.focus();
        } catch(e){}
    }
}

function doRequired(elem){
    var flagElem = getPreviousSibling(elem);
    if (elem.value == null || elem.value == ""){
        flagElem.style.color = "red";
    } else{
        flagElem.style.color = "black";
    }
}

function disableTabs(idTabs, strSeparator){
    if (arguments.length < 2){
        strSeparator = gSeparator;
    }

    setTabDisabledProp(idTabs, strSeparator, true);
}

function enableTabs(idTabs, strSeparator){
    if (arguments.length < 2){
        strSeparator = gSeparator;
    }

    setTabDisabledProp(idTabs, strSeparator, false);
}

function setTabDisabledProp(idTabs, strSeparator, styleValue){

    var arrTabs = idTabs.split(strSeparator);
    for (var loopIndex = 0; loopIndex < arrTabs.length; loopIndex++){
        if (arrTabs[loopIndex] != null && arrTabs[loopIndex] != ""){
            var elem = document.getElementById(arrTabs[loopIndex]);

            elem.disabled = styleValue;
            if (gscrPos == 'template') elem.parentNode.disabled = styleValue;
                if(styleValue) {
                    if(elem.getAttribute("onblur")) {
                        elem.setAttribute("onblur_old", elem.getAttribute("onblur"));
			elem.removeAttribute("onblur");
                    }
                    if(elem.getAttribute("onfocus")) {
                        elem.setAttribute("onfocus_old", elem.getAttribute("onfocus"));
                        elem.removeAttribute("onfocus");		
                    }
                    if(elem.getAttribute("onmouseout")) {
                            elem.setAttribute("onmouseout_old", elem.getAttribute("onmouseout"));
                            elem.removeAttribute("onmouseout");
                    }
                    if(elem.getAttribute("onmouseover")) {
                            elem.setAttribute("onmouseover_old", elem.getAttribute("onmouseover"));
                            elem.removeAttribute("onmouseover");
                    }
                    if(elem.getAttribute("onclick")) {
                            elem.setAttribute("onclick_old", elem.getAttribute("onclick"));
                            elem.removeAttribute("onclick");
                    }
                    if(elem.getAttribute("href")) {
                            elem.setAttribute("href_old", elem.getAttribute("href"));
                            elem.removeAttribute("href");
                    }
                   // addEvent(elem, "class", "Htab dsbT"); //REDWOOD_CHANGES
                    //addEvent(elem, "title", "selected"); //REDWOOD_CHANGES
                } else {
                    if(elem.getAttribute("onblur_old")) {
                            elem.setAttribute("onblur", elem.getAttribute("onblur_old"));
                            elem.removeAttribute("onblur_old");
                    }
                    if(elem.getAttribute("onfocus_old")) {
                            elem.setAttribute("onfocus", elem.getAttribute("onfocus_old"));
                            elem.removeAttribute("onfocus_old");
                    }
                    if(elem.getAttribute("onmouseout_old")) {
                            elem.setAttribute("onmouseout", elem.getAttribute("onmouseout_old"));
                            elem.removeAttribute("onmouseout_old");
                    }
                    if(elem.getAttribute("onmouseover_old")) {
                            elem.setAttribute("onmouseover", elem.getAttribute("onmouseover_old"));
                            elem.removeAttribute("onmouseover_old");
                    }
                    if(elem.getAttribute("onclick_old")) {
                            elem.setAttribute("onclick", elem.getAttribute("onclick_old"));
                            elem.removeAttribute("onclick_old");
                    }
                    if(elem.getAttribute("href_old")) {
                            elem.setAttribute("href", elem.getAttribute("href_old"));
                            elem.removeAttribute("href_old");
                    }
                   // addEvent(elem, "class", "Htab");//REDWOOD_CHANGES	
                    //addEvent(elem, "title", "selected");//REDWOOD_CHANGES
            }
        }
    }
}

function fnMoveNextAndPrevPgOfMultipleEntry(pstrTabID, pstrTableName, pstrBlockID, actionFlag, isNavigation){
    appendData(document.getElementById('TBLPage' + pstrTabID));
    try{//Fix for 16906635
      var fnEval = new Function("pre_Navigate('" + pstrBlockID + "', '" + actionFlag + "')");
      fnEval();
    } catch(e){}//Fix for 16906635
    var query = getXPathQuery(pstrTableName);
    var nodeList  = selectNodes(dbDataDOM,query);
    var htmlTableObj = document.getElementById(pstrBlockID);
    var pgSize          = getPageSize(pstrBlockID);
    var totalNoOfPgs;
    if(typeof(isNavigation) == 'undefined'){
        if(htmlTableObj.tBodies[0].rows.length != pgSize){
            totalNoOfPgs    = Math.ceil(nodeList.length/pgSize);
        }else{
            totalNoOfPgs    = Math.ceil((nodeList.length + 1)/pgSize);
        }
    }else if (isNavigation.toUpperCase() == 'TRUE'){
        totalNoOfPgs = +getInnerText(document.getElementById("TotPage__"+pstrBlockID));
    }
    if(totalNoOfPgs == 0){
        totalNoOfPgs = 1;
    }
    var curPgNumber     = +getInnerText(document.getElementById("CurrPage__"+pstrBlockID));
    actionFlag = actionFlag.toUpperCase();
    if(htmlTableObj) {
        if(actionFlag == "FIRST"){
            var newPgNumber     = 1;
        }else if(actionFlag == "PREV"){
            var newPgNumber     = curPgNumber - 1;
        }else if(actionFlag == "NEXT"){
            var newPgNumber     = curPgNumber + 1;
        }else if(actionFlag == "LAST"){
            var newPgNumber     = totalNoOfPgs;
        }else if(actionFlag == "GOTO"){
            var newPgNumber     = +document.getElementById("GoTo__"+pstrBlockID).value;
        }
        setInnerText(document.getElementById("CurrPage__"+pstrBlockID).children[0],newPgNumber);
        setInnerText(document.getElementById("TotPage__"+pstrBlockID).children[0],totalNoOfPgs);

        fnSetNavButtons(pstrBlockID, newPgNumber, totalNoOfPgs);
        
        var endIndex        = newPgNumber*pgSize;
        var startIndex      = endIndex - pgSize;

        deleteAllRows(pstrBlockID);

        rowIndex            = htmlTableObj.tBodies[0].rows.length;
        for(var nodeIndexME = startIndex; nodeIndexME < endIndex; nodeIndexME++) {
            if(nodeList[nodeIndexME]){
                var newRow  = addNewRow(pstrBlockID);
                setRowData(htmlTableObj.tBodies[0].rows[rowIndex], nodeList[nodeIndexME]);
                fnEnableBlockCheckBox(); //Changes Made for Enabling CheckBoxes
                rowIndex++;
            }else{
                try{//Fix for 16906635
					var fnEval = new Function("post_Navigate('" + pstrBlockID + "', '" + actionFlag + "')");
					fnEval();
				} catch(e){}//Fix for 16906635
                return;
            }
        }
        try{//Fix for 16906635
			var fnEval = new Function("post_Navigate('" + pstrBlockID + "', '" + actionFlag + "')");
			fnEval();
		} catch(e){}//Fix for 16906635
        return;
    }
}

/* Added for pagination of multiple entry block */
function fnSetNavButtons(pstrBlockID, newPgNumber, totalNoOfPgs){

    if(newPgNumber == 1){
        var prevButton = document.getElementById("nPrev__"+pstrBlockID);
        var firstButton = document.getElementById("nFirst__"+pstrBlockID);
        if(prevButton){
            /*var imgPath = document.getElementById("nPrev__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nPrev__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNPrevious_Disabled.gif";
            document.getElementById("nPrev__"+pstrBlockID).children[0].src = imgPath;*/
            prevButton.disabled = true;
        }
        if(firstButton){
            /*var imgPath = document.getElementById("nFirst__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nFirst__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNFirst_Disabled.gif";
            document.getElementById("nFirst__"+pstrBlockID).children[0].src = imgPath;*/
            firstButton.disabled = true;
        }
    }if(newPgNumber == totalNoOfPgs){
        var nextButton = document.getElementById("nNext__"+pstrBlockID);
        var lastButton = document.getElementById("nLast__"+pstrBlockID);
        if(nextButton){
            /*var imgPath = document.getElementById("nNext__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nNext__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNNext_Disabled.gif";
            document.getElementById("nNext__"+pstrBlockID).children[0].src = imgPath;*/
            nextButton.disabled = true;
        }
        if(lastButton){
            /*var imgPath = document.getElementById("nLast__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nLast__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNLast_Disabled.gif";
            document.getElementById("nLast__"+pstrBlockID).children[0].src = imgPath;*/
            lastButton.disabled = true;
        }
    }if(newPgNumber != totalNoOfPgs){
        var nextButton = document.getElementById("nNext__"+pstrBlockID);
        var lastButton = document.getElementById("nLast__"+pstrBlockID);
        if(nextButton){
            /*var imgPath = document.getElementById("nNext__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nNext__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNNext.gif";
            document.getElementById("nNext__"+pstrBlockID).children[0].src = imgPath;*/
            nextButton.disabled = false;
        }
        if(lastButton){
            /*var imgPath = document.getElementById("nLast__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nLast__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNLast.gif";
            document.getElementById("nLast__"+pstrBlockID).children[0].src = imgPath;*/
            lastButton.disabled = false;
        }
    }if(newPgNumber != 1){
        var prevButton = document.getElementById("nPrev__"+pstrBlockID);
        var firstButton = document.getElementById("nFirst__"+pstrBlockID);
        if(prevButton){
            /*var imgPath = document.getElementById("nPrev__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nPrev__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNPrevious.gif";
            document.getElementById("nPrev__"+pstrBlockID).children[0].src = imgPath;*/
            prevButton.disabled = false;
        }
        if(firstButton){
            /*var imgPath = document.getElementById("nFirst__"+pstrBlockID).children[0].src;
            imgPath = imgPath.substring(0,document.getElementById("nFirst__"+pstrBlockID).children[0].src.lastIndexOf("/"));
            imgPath = imgPath + "/BTNFirst.gif";
            document.getElementById("nFirst__"+pstrBlockID).children[0].src = imgPath;*/
            firstButton.disabled = false;
        }
    }
}

/* Added for pagination of multiple entry block -- ends */

function fnInsertNewRowForMultipleEntry(pstrTabID, pstrTableName, pstrBlockID){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
     var tableObject = getTableObjForBlock(pstrBlockID);//REDWOOD_CHANGES
    //var blnContinue = eval("fnAddRow_" + pstrBlockID + "()");
    var fnEval = new Function("return " + "fnAddRow_" + pstrBlockID + "()");
    var blnContinue =  fnEval();
    var newRow = null;
    if (blnContinue){
        meCalledAction = 'INSERT';		
        if ("Y" == getPagenationReq()) {
                if (typeof(pageActionCode) == 'undefined') {
                        pageActionCode = "LAST";
                }
                fnMoveNextAndPrevPgOfMultipleEntry(pstrTabID, pstrTableName, pstrBlockID, pageActionCode);
        }
        appendData(document.getElementById('TBLPage' + pstrTabID));	
//REDWOOD_CHANGES
         var pgSize = Number(tableObject.getAttribute("pgsize"));
         var blockIdNode = selectNodes(dbDataDOM, getXPathQuery(pstrBlockID));
   if (blockIdNode.length > 0) {
        var l_LastIndex = blockIdNode.length;
        if (l_LastIndex % pgSize == 0) {
            //clear the table if the l_LastIndex==pageSize
            //deleteAllRows(v_MeblockId);
            dbIndexArray[pstrTableName] = l_LastIndex + 1;//12.0.3 ME changes
           // fnUpdatePgBtn(v_MeblockId, pgSize, dbIndexArray[v_MeblockId]);//12.0.3 ME changes
        }
        else {
            //12.0.3 ME changes
            dbIndexArray[pstrTableName] = l_LastIndex + 1;
        }
    }
    else {
        dbIndexArray[pstrTableName] = 1;
    }
    /*
        try{
            dbIndexArray[pstrTableName] = document.getElementById("BLK_" + pstrTableName).tBodies[0].rows.length + 1;
        } catch(e){
            dbIndexArray[pstrTableName] = document.getElementById(pstrTableName).tBodies[0].rows.length + 1;
        }
*/	
//REDWOOD_CHANGES
        newRow = addNewRow(pstrBlockID);
        deleteChildTableRows(pstrTableName);
//REDWOOD_35313042 added
  setTimeout(function(){ 
 fnUncheckAll(pstrBlockID);
    var numrows=getTableObjForBlock(pstrBlockID).tBodies[0].rows.length;
    var crows=getTableObjForBlock(pstrBlockID).tBodies[0].rows;
      if(numrows>0)
      { 
		crows[numrows-1].cells[0].getElementsByTagName("INPUT")[0].click();
      }
//REDWOOD_35313042 
        //addEvent(newRow, 'onclick', 'fnMulipleEntryRow_onClick(event)'); static header change
        try{
            //eval("fnPostAddRow_" + pstrBlockID + "(newRow)");
          //  var fnEval = new Function("fnPostAddRow_" + pstrBlockID + "(newRow)"); 
          //Fix for 18357994 Start
          var fnEval = new Function("newRow","fnPostAddRow_" + pstrBlockID  + "(newRow)");  
          fnEval(newRow); 
          //Fix for 18357994 End
        } catch(e){}
        //var rowObj = document.getElementById(pstrBlockID).tBodies[0];	//REDWOOD_CHANGES
////REDWOOD_35313042 added
			if(gAction=="NEW"){
		enableForm();
	}
		   checkAnFocusSelectedRow(pstrBlockID);   
    },10);
	fnCheckToggleChkBox(pstrBlockID);
  }
//REDWOOD_35313042 ended	  

    return newRow;

}

function fnDeleteRowForMultipleEntry(pstrBlockID, pstrTableName){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
   // fnResetAttachmentData(pstrBlockID); Sudipta	//REDWOOD_CHANGES
    //var blnContinue = eval("fnDeleteRow_" + pstrBlockID + "()");
    var fnEval = new Function("return " + "fnDeleteRow_" + pstrBlockID + "()");  
    var blnContinue = fnEval();
    var count = 0;
    if (blnContinue){
        meCalledAction = 'DELETE';    	
        count = deleteSelectedRows(pstrBlockID);
        if (count > 0) dbIndexArray[pstrTableName] = dbIndexArray[pstrTableName] - 1;
    }
    if (count > 0){
        try{
            //eval("fnPostDeleteRow_" + pstrBlockID + "()")
            var fnEval = new Function("fnPostDeleteRow_" + pstrBlockID + "()");  
            fnEval();
        } catch(e){}
    }

//REDWOOD_35313042 added Begins
	selectCurrow(pstrBlockID);
	checkAnFocusSelectedRow(pstrBlockID);
    fnCheckToggleChkBox(pstrBlockID); 
//REDWOOD_35313042 added Ends

}

function addRowShortcut(obj, e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
   // var blockId = obj.id;//Redwood_35454138 commented
    var blockId = obj;//Redwood_35454138
    if(gAction != "" && gAction != "EXECUTEQUERY") {        
        var activeElement = "";                
       // var l_TableObj = document.getElementById(blockId).tBodies[0];//REDWOOD_35313042 commented 
	   var l_TableObj = getTableObjForBlock(blockId).tBodies[0];//REDWOOD_35313042
        //var DBT = obj.getAttribute("DBT");//Redwood_35454138 commented
		var DBT =document.getElementById(blockId).getAttribute("DBT");//Redwood_35454138
        if(evnt.ctrlKey == true && evnt.keyCode == 45) {
            fnDisableBrowserKey(evnt);
            try {
                evnt.keyCode = 0;
            } catch(e) {               
            }
            if(document.getElementById("cmdAddRow_"+blockId).className.toUpperCase()=="HIDDEN" ||document.getElementById("cmdAddRow_"+blockId).disabled || document.getElementById("cmdAddRow_"+blockId).style.visibility.toUpperCase() == "HIDDEN"){ 
                return false; 
            }
            evnt.cancelBubble = true;
            fnInsertNewRowForMultipleEntry(strCurrentTabID, DBT, blockId);
            l_TableObj.rows[l_TableObj.rows.length-1].cells[0].getElementsByTagName("INPUT")[0].focus();
            return false;  
        } else if(evnt.ctrlKey == true && evnt.keyCode == 46){            
            fnDisableBrowserKey(evnt);
            try {
                evnt.keyCode = 0;
            } catch(e) {               
            }
            if(document.getElementById("cmdDelRow_"+blockId).className.toUpperCase()=="HIDDEN" ||document.getElementById("cmdDelRow_"+blockId).disabled || document.getElementById("cmdDelRow_"+blockId).style.visibility.toUpperCase() == "HIDDEN"){ 
                return false; 
            }
            evnt.cancelBubble = true;
            fnDeleteRowForMultipleEntry(blockId, DBT);
            if(l_TableObj.rows.length > 0)
                l_TableObj.rows[l_TableObj.rows.length-1].cells[0].children[0].focus();
            else
                //document.getElementById("Checkbox_Title")[0].focus();//Fix for 17155663
                document.getElementById(blockId+"__Checkbox_Title").focus();//Fix for 17155663
            return false;  
        } else if((evnt.keyCode == 38) || (evnt.keyCode == 38 && srcElement.tagName=="BUTTON")){//code for traversing rows up
            if(srcElement.tagName !="SELECT"){
                activeElement = document.activeElement;
                if(srcElement.name == "chkDeleteRow")
                    var row = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
                else
                    var row = srcElement.parentNode.parentNode.rowIndex-2;
                focusPreviousRow(l_TableObj,row,activeElement);
                preventpropagate(e);
                return false; 
            }
        } else if((evnt.keyCode == 40) || (evnt.keyCode == 40 && srcElement.tagName=="BUTTON")){//code for traversing rows down
             if(srcElement.tagName !="SELECT"){
                activeElement = document.activeElement;
                if(srcElement.name == "chkDeleteRow")
                    var row = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
                else
                    var row = srcElement.parentNode.parentNode.rowIndex-2;
                focusNextRow(l_TableObj,row,activeElement);
                preventpropagate(e);
                return false; 
             }
        } else if(evnt.keyCode == 33){
            if(srcElement.name == "chkDeleteRow"){
                var rowIndex = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.parentNode.cellIndex;
            }else{
                var rowIndex = srcElement.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.cellIndex;
            }
            if(document.getElementsByName("nPrev__"+blockId)[0].disabled == false)
                fnMoveNextAndPrevPgOfMultipleEntry(strCurrentTabID, DBT, blockId, "PREV", "TRUE");
            if(rowIndex != "undefined" && cellIndex != "undefined" && l_TableObj.rows.length > 0){
                if(l_TableObj.rows[rowIndex].cells[cellIndex].children[1])
                    l_TableObj.rows[rowIndex].cells[cellIndex].children[1].focus();                            
                else
                    l_TableObj.rows[rowIndex].cells[cellIndex].getElementsByTagName("INPUT")[0].focus();
            }else{
                document.getElementById("GoTo__"+blockId).focus();
            }
            preventpropagate(e);
            return false;
        } else if(evnt.keyCode == 34){
            if(srcElement.name == "chkDeleteRow"){
                var rowIndex = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.parentNode.cellIndex;
            }else{
                var rowIndex = srcElement.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.cellIndex;
            }
            if(document.getElementsByName("nNext__"+blockId)[0].disabled == false)
                fnMoveNextAndPrevPgOfMultipleEntry(strCurrentTabID, DBT, blockId, "NEXT", "TRUE");
            if(typeof(rowIndex) != "undefined" && typeof(cellIndex) != "undefined" && l_TableObj.rows.length > 0){
                if(l_TableObj.rows[rowIndex].cells[cellIndex].children[1])
                    l_TableObj.rows[rowIndex].cells[cellIndex].children[1].focus();                            
                else
                    l_TableObj.rows[rowIndex].cells[cellIndex].getElementsByTagName("INPUT")[0].focus();
            }else{
                document.getElementById("GoTo__"+blockId).focus();
            }
            preventpropagate(e);
            return false;
        } else if(evnt.keyCode == 35){
            if(srcElement.name == "chkDeleteRow"){
                var rowIndex = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.parentNode.cellIndex;
            }else{
                var rowIndex = srcElement.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.cellIndex;
            }
            fnMoveNextAndPrevPgOfMultipleEntry(strCurrentTabID, DBT, blockId, "LAST", "TRUE");
            if(typeof(rowIndex) != "undefined" && typeof(cellIndex) != "undefined" && l_TableObj.rows.length > 0){
                if(l_TableObj.rows[rowIndex].cells[cellIndex].children[1])
                    l_TableObj.rows[rowIndex].cells[cellIndex].children[1].focus();                            
                else
                    l_TableObj.rows[rowIndex].cells[cellIndex].getElementsByTagName("INPUT")[0].focus();
            }else{
                document.getElementById("GoTo__"+blockId).focus();
            }
            preventpropagate(e);
            return false;
        } else if(evnt.keyCode == 36){
            if(srcElement.name == "chkDeleteRow"){
                var rowIndex = srcElement.parentNode.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.parentNode.cellIndex;
            }else{
                var rowIndex = srcElement.parentNode.parentNode.rowIndex-2;
                var cellIndex = srcElement.parentNode.cellIndex;
            }
            fnMoveNextAndPrevPgOfMultipleEntry(strCurrentTabID, DBT, blockId, "FIRST", "TRUE");
            if(typeof(rowIndex) != "undefined" && typeof(cellIndex) != "undefined" && l_TableObj.rows.length > 0){
                if(l_TableObj.rows[rowIndex].cells[cellIndex].children[1])
                    l_TableObj.rows[rowIndex].cells[cellIndex].children[1].focus();                            
                else
                    l_TableObj.rows[rowIndex].cells[cellIndex].getElementsByTagName("INPUT")[0].focus();
            }else{
                document.getElementById("GoTo__"+blockId).focus();
            }
            preventpropagate(e);
            return false;
        } else if(evnt.ctrlKey == true && evnt.shiftKey == true && evnt.keyCode == 9){
            document.getElementById("GoTo__"+blockId).focus();
            preventpropagate(e);
            return false;
        } else if(evnt.ctrlKey == true && evnt.keyCode == 9){
            document.getElementById(blockId).tFoot.getElementsByTagName("td")[0].focus();
			preventpropagate(e);
            return false;
        }
    }
    if(evnt.ctrlKey == true && evnt.keyCode == 73){
        fnDisableBrowserKey(evnt);
        try {
            evnt.keyCode = 0;
        } catch(e) {               
        }
        evnt.cancelBubble = true;
        fnShowSingleViewForME(blockId);
        return false;  
    }
//Redwood_35454138 starts
     if (evnt.keyCode == 9) {
        var path = evnt.path || (evnt.composedPath && evnt.composedPath());
        if (isChildOf(path,'TD')) {
            if(evnt.shiftKey == true){
                handleTableTabAndShiftKey(e,blockId);
            }else{
                if( handleTableTabKey(e))
				{
					document.getElementById(blockId).getElementsByTagName('oj-paging-control')[0].getElementsByTagName('oj-input-text')[0].focus();
					return true;
				}	
				else 
					return false;
            }        
                return false;
        }else if (isChildOf(path,'TH')) {
            if(evnt.shiftKey == true){
                focusElement(getTableObjForBlock(blockId));
            }else{
                focusElement(findImmediateOJElement(findNextActiveTDElement(l_TableObj.rows[0].cells[0])).getElementsByTagName("span")[0].children[0]);
            }        
                return false;
        }else if(isChildOf(path,'TABLE')){
             if(evnt.shiftKey == true){	
//REDWOOD_CHANGES
                return true;	
//REDWOOD_CHANGES
            }else{
                focusElement(getTableObjForBlock(blockId).parentNode.parentNode.getElementsByTagName("span")[0].children[0]);
            }
                preventpropagate(e);
                return false;
        }else if(isChildOf(path,'OJ-PAGING-CONTROL')&&evnt.shiftKey == true){
                focusElement(getTableObjForBlock(blockId).parentNode.parentNode.getElementsByTagName("span")[0].children[0]);
                preventpropagate(e);
                return false;        
        }
        }
//Redwood_35454138 ends
   return true;
}

function focusNextRow(l_TableObj,row,activeElement){
    if(l_TableObj.rows[row+1]){
        for(var k=0;k<l_TableObj.rows[row+1].cells.length;k++){
            if(l_TableObj.rows[row+1].cells[k].children[1]){
                var elemDate = getOuterHTML(l_TableObj.rows[row+1].cells[k].children[1]).indexOf("displayDate");
                var elemAmt  = getOuterHTML(l_TableObj.rows[row+1].cells[k].children[1]).indexOf("displayAmount");
                var elemNum  = getOuterHTML(l_TableObj.rows[row+1].cells[k].children[1]).indexOf("displayFormattedNumber");
                    if(elemDate != -1 || elemAmt != -1 || elemNum != -1)
                        ele = l_TableObj.rows[row+1].cells[k].children[3];
                    else
                        ele = l_TableObj.rows[row+1].cells[k].children[1];
                if(ele.name == activeElement.name){
                    ele.focus();
                    break;
                }
            }else if(l_TableObj.rows[row+1].cells[k].children[0].tagName.toUpperCase() == "BUTTON"){
                l_TableObj.rows[row+1].cells[k].children[0].focus();
            }else{
                if(l_TableObj.rows[row+1].cells[k].getElementsByTagName("INPUT")[0].name == activeElement.name){
                    l_TableObj.rows[row+1].cells[k].getElementsByTagName("INPUT")[0].focus();
                    break;
                }
            }
        }
        return;
    }
    
}

function focusPreviousRow(l_TableObj,row,activeElement){
    if(l_TableObj.rows[row-1]){
        for(var k=0;k<l_TableObj.rows[row-1].cells.length;k++){
            if(l_TableObj.rows[row-1].cells[k].children[1]){
                var elemDate = getOuterHTML(l_TableObj.rows[row-1].cells[k].children[1]).indexOf("displayDate");
                var elemAmt = getOuterHTML(l_TableObj.rows[row-1].cells[k].children[1]).indexOf("displayAmount");
                var elemNum = getOuterHTML(l_TableObj.rows[row-1].cells[k].children[1]).indexOf("displayFormattedNumber");
                    if(elemDate != -1 || elemAmt != -1 || elemNum != -1)
                        ele = l_TableObj.rows[row-1].cells[k].children[3];
                    else
                        ele = l_TableObj.rows[row-1].cells[k].children[1];
                if(ele.name == activeElement.name){
                    ele.focus();
                    break;
                }
            }else if(l_TableObj.rows[row-1].cells[k].children[0].tagName.toUpperCase() == "BUTTON"){
                l_TableObj.rows[row-1].cells[k].children[0].focus();
            }else{
                if(l_TableObj.rows[row-1].cells[k].getElementsByTagName("INPUT")[0].name == activeElement.name){
                    l_TableObj.rows[row-1].cells[k].getElementsByTagName("INPUT")[0].focus();
                    break;
                }
            }
        }
        return;
    }
}


function disableRowElements(row){

    var numElem = row.children.length;
    var tmpElem;
    var tmpIndex = 0;

    for (var loopIndex = 0; loopIndex < numElem; loopIndex++){

        var lChildRow = row.children[loopIndex].children[0];//static header change
       for ( lcount = 0; lcount < lChildRow.children.length; lcount++) {
            tmpElem = lChildRow.children[lcount];
            var queryMode = "";
            if (tmpElem.queryMode){
                queryMode = isNull(tmpElem.queryMode);
            }

            switch (tmpElem.tagName.toUpperCase()){
            case "BUTTON":
            case "SELECT":
            case "TEXTAREA":
            case "INPUT":
                if (queryMode != 'E') fnDisableElement(tmpElem);
                break;
            }
        }
    }
}

function enableRowElements(row){
    var numElem = row.children.length;
    var tmpElem;
    var tmpIndex = 0;

    for (var loopIndex = 0; loopIndex < numElem; loopIndex++){
        tmpElem = row.children(loopIndex);
        var queryMode = "";
        if (tmpElem.queryMode){
            queryMode = isNull(tmpElem.queryMode);
        }
        switch (tmpElem.tagName.toUpperCase()){	  
//REDWOOD_CHANGES
        case "OJ-BUTTON":
        case "OJ-SELECT-SINGLE":
            fnEnableElement(tmpElem);
            break;
        case "OJ-TEXT-AREA":
        case "OJ-INPUT-NUMBER":
        case "OJ-INPUT-DATE":
        case "OJ-SWITCH":  
//REDWOOD_CHANGES
            fnEnableElement(tmpElem);
            break;
        }
    }
}

function disableElementsForQuery(){	
//REDWOOD_CHANGES
   /* disableElements("INPUT");
    disableElements("BUTTON");
    disableElements("SELECT");
    disableElements("TEXTAREA");*/
    disableAllElements("OJ-INPUT-TEXT"); //OJET Migration
	disableAllElements("OJ-INPUT-NUMBER"); //OJET Migration
        disableAllElements("OJ-SELECT-SINGLE"); //OJET Migration
        disableAllElements("OJ-SWITCH"); //OJET Migration
        disableAllElements("OJ-INPUT-PASSWORD"); //OJET Migration
        disableAllElements("OJ-RADIOSET"); //OJET Migration
        disableAllElements("OJ-INPUT-DATE"); //OJET Migration
	
        disableAllElements("OJ-BUTTON");
        disableAllElements("OJ-TEXT-AREA"); 
//REDWOOD_CHANGES
}

function disableForm(){	   
//REDWOOD_CHANGES
    /*disableAllElements("INPUT");
    disableAllElements("BUTTON");
    disableAllElements("SELECT");
    disableAllElements("TEXTAREA");*/
     disableAllElements("OJ-INPUT-TEXT"); //OJET Migration
	disableAllElements("OJ-INPUT-NUMBER"); //OJET Migration
        disableAllElements("OJ-SELECT-SINGLE"); //OJET Migration
        disableAllElements("OJ-SWITCH"); //OJET Migration
        disableAllElements("OJ-INPUT-PASSWORD"); //OJET Migration
        disableAllElements("OJ-RADIOSET"); //OJET Migration
        disableAllElements("OJ-INPUT-DATE"); //OJET Migration
	
        disableAllElements("OJ-BUTTON");
        disableAllElements("OJ-TEXT-AREA"); //OJET Migration
          disableAllElements("OJ-INPUT-DATE-TIME"); //OJET Migration
       
	//REDWOOD_CHANGES
	if (document.getElementById('BTN_EXIT_IMG')) {
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        }			
//REDWOOD_CHANGES
        if (document.getElementById('BTN_AUDIT')) {
	fnEnableElement(document.getElementById('BTN_AUDIT'));
    }
    if (document.getElementById('BTN_AUDIT_CLOSE')) {
            fnEnableElement(document.getElementById('BTN_AUDIT_CLOSE'));
    }
   		
//REDWOOD_CHANGES
	//Bug_25147104 end
}

function enableForm(){	 
//REDWOOD_CHANGES
   /* fnChangeLabelToText("TEXTAREA");
    enableAllElements("INPUT");
    enableAllElements("BUTTON");
    enableAllElements("SELECT");
    enableAllElements("TEXTAREA");    */
    enableAllElements("OJ-INPUT-TEXT"); //OJET Migration
	enableAllElements("OJ-INPUT-NUMBER"); //OJET Migration
        enableAllElements("OJ-SELECT-SINGLE"); //OJET Migration
        enableAllElements("OJ-SWITCH"); //OJET Migration
         enableAllElements("OJ-INPUT-PASSWORD"); //OJET Migration
        enableAllElements("OJ-RADIOSET"); //OJET Migration
        enableAllElements("OJ-TEXT-AREA"); //OJET Migration
        enableAllElements("OJ-INPUT-DATE"); //OJET Migration
        enableAllElements("OJ-INPUT-DATE-TIME"); //OJET Migration
        enableAllElements("BUTTON");
        enableAllElements("OJ-BUTTON");	
//REDWOOD_CHANGES
}

function disableElements(type){
    var elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++){
        tmpElem = elements[loopIndex];
        var queryMode = isNull(tmpElem.queryMode);
        if (queryMode != 'E') fnDisableElement(tmpElem);
        else fnEnableElement(tmpElem);
    }
}

function disableAllElements(type) {
    var elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var tmpElem = elements[loopIndex]; 
//REDWOOD_CHANGES
        if(type== 'OJ-INPUT-TEXT' ||type== 'OJ-BUTTON' || type== 'BUTTON' ||type == "OJ-INPUT-NUMBER" || type == "OJ-SELECT-SINGLE" || type == "OJ-SWITCH" || type == "OJ-INPUT-PASSWORD" || type == "OJ-RADIOSET" || type == "OJ-INPUT-DATE" || type == "OJ-INPUT-DATE-TIME"){ // OJET Migration
			tmpElem.type = "text";
        }
        if(typeof(tmpElem.type) == "undefined"){
            tmpElem.type = "text";
        }	   
//REDWOOD_CHANGES
            if ("Y" == getPagenationReq()) {
                if(type == "OJ-BUTTON"){ //REDWOOD_CHANGES
                    if(gAction == 'EXECUTEQUERY' || gAction == '' || ShowSummary == 'TRUE') { //Fix for 21367575
                        if(tmpElem.id) {
                            if( tmpElem.id.indexOf("nFirst__") != -1 || tmpElem.id.indexOf("nPrev__") != -1 || tmpElem.id.indexOf("nNext__") != -1 || tmpElem.id.indexOf("nLast__") != -1 ) {
                                    continue;
                            } // sudipta need to check //REDWOOD_CHANGES
			}
                   }
            }
	}
	if (tmpElem.type.toUpperCase() != 'HIDDEN' && getCurrentStyle(tmpElem, "visibility").toUpperCase() != "HIDDEN" && tmpElem.className.toUpperCase() != "HIDDEN") {
            fnDisableElement(tmpElem);
            if (checkViewMode && checkViewMode == true) loopIndex--;
            checkViewMode = false;
            if (gAction == 'EXECUTEQUERY' || gAction == '' || ShowSummary == 'TRUE') {
                if (getNextSibling(tmpElem)) {
                    if (getNextSibling(tmpElem).tagName) {
                        if (getNextSibling(tmpElem).tagName == 'OJ-BUTTON' && getNextSibling(tmpElem).innerHTML) { //REDWOOD_CHANGES
                            if (getNextSibling(tmpElem).innerHTML.indexOf('IMGPopupEdit') != -1) {
                                getNextSibling(tmpElem).disabled = false;
                            }
                        }
                    }
                }
            }
        }
        if (type.toUpperCase() == "OJ-BUTTON") {  //REDWOOD_CHANGES
            if (gAction == 'EXECUTEQUERY' || gAction == '' || ShowSummary == 'TRUE') {
               // if (tmpElem.getAttribute('name')!=null &&( tmpElem.getAttribute('name').indexOf("BTN_PREV_") != -1 || tmpElem.getAttribute('name').indexOf("BTN_NEXT_") != -1)) { //REDWOOD_CHANGES
                if (tmpElem.getAttribute('name')!=null && (tmpElem.getAttribute('name').indexOf("BTN_PREV_") != -1 || tmpElem.getAttribute('name').indexOf("BTN_NEXT_") != -1 || tmpElem.getAttribute('name').indexOf("BTN_LAST_") != -1 || tmpElem.getAttribute('name').indexOf("BTN_FIRST_") != -1 || tmpElem.getAttribute('name').indexOf("BTN_GO_VER") != -1)) { //REDWOOD_CHANGES
                    fnEnableElement(tmpElem);
                } else if (tmpElem.innerHTML) {
                    if ((tmpElem.innerHTML.indexOf('IMGPopupEdit') >= 0) || (getOuterHTML(tmpElem).indexOf('show_editor') >= 0)) {
                        fnEnableElement(tmpElem);
                    }
                }
            }
            if ((tmpElem.id) && ((tmpElem.id == "BtnSubSysNav") || (tmpElem.id == "BtnSectionNav"))) {
                fnEnableElement(tmpElem); 
            }
        }
		//REDWOOD_35313042 starts 
		var block_id= tmpElem.getAttribute("dbt");
		isME = isMultipleEntry(block_id);  
        if (isME=='true') {
            if (document.getElementById(block_id)) { 

							var elemet=document.getElementById(block_id).firstChild.content.children[0];

							for(var cellindex =0; cellindex < elemet.cells.length; cellindex++){
							var txt= elemet.cells[cellindex].getElementsByTagName(type)[0];
							if ( typeof(txt) != "undefined"  && tmpElem.getAttribute("name")==txt.getAttribute("name") && type!="OJ-SWITCH" && type!="OJ-BUTTON"){ 
								txt.setAttribute("readOnly",true);
								} 
						   if (typeof(txt) != "undefined"  && (type =="OJ-SWITCH" || type=="OJ-BUTTON") ) {
                                txt.setAttribute("disabled",true);
                               }
							}  
 
                }
            }
		//REDWOOD_35313042 Ends
    }
}

function enableAllElements(type) {
    var elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var tmpElem = elements[loopIndex];	 
//REDWOOD_CHANGES
        if(type == "OJ-BUTTON" || type == "BUTTON" || type == "OJ-INPUT-TEXT" || type == "OJ-INPUT-NUMBER"  ||type == "OJ-SELECT-SINGLE" ||type == "OJ-SWITCH" ||type == "OJ-RADIOSET" || type=="OJ-TEXT-AREA"|| type=="OJ-INPUT-PASSWORD" || type=="OJ-INPUT-DATE" || type == "OJ-INPUT-DATE-TIME") {//OJET Migration
			tmpElem.type ='TEXT';
		}	 
//REDWOOD_CHANGES
       // if (tmpElem.type.toUpperCase() != 'HIDDEN' && getCurrentStyle(tmpElem, "visibility").toUpperCase() != "HIDDEN" && tmpElem.className.toUpperCase() != 'HIDDEN') {//REDWOOD_35438955 commented
		   if (tmpElem.type.toUpperCase() != 'HIDDEN') {//REDWOOD_35438955
            if (tmpElem.className != null && gAction == 'ENTERQUERY' && (tmpElem.className == 'BtnAddRow' || tmpElem.className == 'BtnDelRow')) {
                return;
            } else {
                if (tmpElem.readOnly && tmpElem.disabled && (!tmpElem.getAttribute("INPUT_LOV") || tmpElem.getAttribute("INPUT_LOV") == 'N')) {
                    if (tmpElem.type.toUpperCase() != 'CHECKBOX') {
                        tmpElem.className = 'TextReadonly';
                        tmpElem.readOnly = true;
                    }
                } else fnEnableElement(tmpElem);
            }
        }
        if ("Y" == getPagenationReq()) {
            if( type == "BUTTON" ) {
                if( gAction == "NEW" ) {
                    if( tmpElem.id ) {
                        if( tmpElem.id.indexOf("nFirst__") != -1 || tmpElem.id.indexOf("nPrev__") != -1 || tmpElem.id.indexOf("nNext__") != -1 || tmpElem.id.indexOf("nLast__") != -1 ) {
                            tmpElem.disabled = true;
                        }
                    }
                }
            }
        }
    }
}

function fnDisableElement(object) {
    if (object && object.style && (object.style.visibility.toUpperCase() == "HIDDEN" || object.className.toUpperCase() == "HIDDEN")) return;
//REDWOOD_CHANGES   
 var tagName = object.tagName.toUpperCase();//OJET Migration
    if(tagName == "OJ-BUTTON" || tagName == "OJ-INPUT-TEXT" || tagName == "OJ-INPUT-NUMBER"  ||tagName == "OJ-SELECT-SINGLE" ||tagName == "OJ-SWITCH" ||tagName == "OJ-RADIOSET" || tagName=="OJ-TEXT-AREA"|| tagName=="OJ-INPUT-PASSWORD" || tagName=="OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME") {//OJET Migration
        object.type ='TEXT';
    }  
//REDWOOD_CHANGES
	if ("Y" == getPagenationReq()) {
            if(object && "GoTo__" == object.id.substring(0,6)){
		return;
            }
	}
    var type = object.type.toUpperCase();
   // var tagName = object.tagName;	  //REDWOOD_CHANGES
    if (object) {
        if (type == 'HIDDEN') {
            var entityName = object.name;
            var indexDate = getOuterHTML(object).indexOf("displayDate");
            var indexAmount = getOuterHTML(object).indexOf("displayAmount");
            var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                var inputObj ="";
                if(getNextSibling(getNextSibling(object)).tagName == "INPUT")//Fix for 17325674 
                    inputObj = getNextSibling(getNextSibling(object));   
                else
                    inputObj = getNextSibling(getNextSibling(getNextSibling(object)));
                if(inputObj) {
	                var entityDBC = object.getAttribute("DBC");
	                var entityDBT = object.getAttribute("DBT");
	                if (entityDBC) {
	                    if (entityDBT) {
			            inputObj.readOnly = true;
                                    inputObj.className = "TextReadonly numeric";
	                        if (indexDate > 0) {
                                    if(getNextSibling(inputObj) && getNextSibling(getNextSibling(inputObj)))
                                        getNextSibling(getNextSibling(inputObj)).disabled = true;
	                        }
	                    } else {}
	                }
                }
            }
        } else if ( tagName == "OJ-INPUT-TEXT" || tagName == "OJ-INPUT-NUMBER") {//REDWOOD_CHANGES
                if (type == 'TEXT') {
                    //35262971 starts
					var objName = object.getAttribute("NAME");
					//if (object.name == 'MAKER_ID' || object.name == 'MAKERID' || object.name == 'MAKER_DT_STAMPI' || object.name == 'MAKERSTAMPI' || object.name == 'CHECKER_ID' || object.name == 'CHECKERID' || object.name == 'CHECKER_DT_STAMPI' || object.name == 'CHECKERSTAMP' || object.name == 'CHECKERSTAMPI' || object.name == 'MOD_NO' || object.name == 'RECORD_STAT' || object.name == 'AUTH_STAT' || object.name == 'AUTHSTAT' || object.name == 'AUTH_STATUS' || object.name == 'CONTSTAT' || object.name == 'COLLECTION_STATUS' || object.name == 'PAYMENT_STATUS' || object.name == 'DEAL_STATUS' || object.name == "REVR_MAKERSTAMP" || object.name == "REVR_MAKERSTAMPI" || object.name == 'REVR_MAKERID' || object.name == 'REVR_CHECKERID' || object.name == 'REVR_CHECKERSTAMP' || object.name == 'REVR_CHECKERSTAMPI' || object.name == "PROCESSTAT") {
                    if (objName == 'MAKER_ID' || objName == 'MAKERID' || objName == 'MAKER_DT_STAMPI' || objName == 'MAKERSTAMPI' || objName == 'CHECKER_ID' || objName == 'CHECKERID' || objName == 'CHECKER_DT_STAMPI' || objName == 'CHECKERSTAMP' || objName == 'CHECKERSTAMPI' || objName == 'MOD_NO' || objName == 'RECORD_STAT' || objName == 'AUTH_STAT' || objName == 'AUTHSTAT' || objName == 'AUTH_STATUS' || objName == 'CONTSTAT' || objName == 'COLLECTION_STATUS' || objName == 'PAYMENT_STATUS' || objName == 'DEAL_STATUS' || objName == "REVR_MAKERSTAMP" || objName == "REVR_MAKERSTAMPI" || objName == 'REVR_MAKERID' || objName == 'REVR_CHECKERID' || objName == 'REVR_CHECKERSTAMP' || objName == 'REVR_CHECKERSTAMPI' || objName == "PROCESSTAT") { 
					 //35262971 ends
					 fnDisableAuditBlock(object);
                    } else {
                          if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                            //object.readOnly = true;				  //REDWOOD_CHANGES
                            object.setAttribute("readOnly",true);	 //REDWOOD_CHANGES
                            if (getOuterHTML(object).indexOf("validateInputAmount") > -1 || getOuterHTML(object).indexOf("validateInputNumber") > -1) {
                               // object.className = "TextReadonly numeric"; //REDWOOD_CHANGES
                            } else {
                               // object.className = "TextReadonly";   //REDWOOD_CHANGES
                            }
                        } else {
                            //object.readOnly = true;  //REDWOOD_CHANGES
                            object.setAttribute("readOnly",true); //REDWOOD_CHANGES
                            
                            if (getOuterHTML(object).indexOf("validateInputAmount") > -1 || getOuterHTML(object).indexOf("validateInputNumber") > -1) {
                                //object.className = "TextReadonly numeric"; //REDWOOD_CHANGES
                            } else {
                                //object.className = "TextReadonly";//REDWOOD_CHANGES
//REDWOOD_CHANGES· 
                           }
                        }
                    }
//                    if (gAction == 'EXECUTEQUERY' || (viewModeAction && viewModeAction == true) || (gAction == "" && ShowSummary && ShowSummary == "TRUE") || gAction == "AUTHQUERY") {
//                        var fieldValue = object.value;
//                        var fieldId = object.id;
//                        var fieldName = object.name;
//			var fleldDBC = object.getAttribute("DBC");
//                        var fieldSize;
//						//Fixes for BUG#18053476 Starts
//                        if (object.size) {
//                            fieldSize = object.size;
//                        } else {
//                            fieldSize = object.getAttribute("size");                        
//                        }
//						//Fixes for BUG#18053476 ends                                               
//                       // var fieldSize = object.getAttribute("size");
//                        var parentDIV = object.parentNode;
//						//9NT1606_12_4_RETRO_12_3_27074483 Starts
//                        var tempVal = parentDIV.getElementsByTagName("INPUT")[0].value;
//                        parentDIV.getElementsByTagName("INPUT")[0].setAttribute("value", tempVal);
//                        //9NT1606_12_4_RETRO_12_3_27074483 Ends
//                        var oldInnerHTML = getOuterHTML(parentDIV.getElementsByTagName("INPUT")[0]);
//                        //oldInnerHTML = setValueOfTextBox(oldInnerHTML, parentDIV.getElementsByTagName("INPUT")[0]); //9NT1606_12_4_RETRO_12_3_27074483 commented
//                        var authcolor =  "";
//                        if(parentDIV.getElementsByTagName("INPUT")[0].getAttribute("style") && parentDIV.getElementsByTagName("INPUT")[0].getAttribute("style").color){
//                            authcolor =  parentDIV.getElementsByTagName("INPUT")[0].getAttribute("style").color;
//                        }
//                        var dNumber = getOuterHTML(object).indexOf("validateInputNumber");
//                        var dAmount = getOuterHTML(object).indexOf("validateInputAmount");
//                        if(fieldSize != "") {
//                            if (fieldValue.length > fieldSize && fieldValue.length > 3 && dNumber < 0 && dAmount < 0) {
//                                if (object.getAttribute("viewMode")) {
//                                    if (getNextSibling(object)) {
//                                        if (getNextSibling(object).tagName) {
//                                            if (getNextSibling(object).tagName.toUpperCase() == 'BUTTON') {
//                                               getNextSibling(object).disabled = true;
//                                                if (getNextSibling(object).className != 'BUTTONMultiple') {
//                                                    if (object.name.indexOf("BTN_PREV_") == -1 && object.name.indexOf("BTN_NEXT_") == -1 && object.name.indexOf("BTN_LAST_") == -1 && object.name.indexOf("BTN_FIRST_") == -1 && object.name.indexOf("BTN_GO_VER") == -1){
//                                                        if (getNextSibling(object).className != 'BtnViewMode' && getNextSibling(object).name.indexOf("BTN_GO_VER") == -1) {
//                                                            getNextSibling(object).setAttribute("oldClassName", getNextSibling(object).className);
//                                                            getNextSibling(object).className = 'BtnViewMode';
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                    var textareaNode = document.createElement("TEXTAREA");
//                                    textareaNode.setAttribute("id", fieldId);
//                                    textareaNode.setAttribute("DBC", fleldDBC);
//                                    addEvent(textareaNode, "class", "TEXTAREADescription");
//                                    textareaNode.setAttribute("name", fieldName);
//                                    textareaNode.setAttribute("value", fieldValue);
//                                    textareaNode.setAttribute("oldInnerHTML", oldInnerHTML);
//									var fieldValueBefReplace = fieldValue; /*Fix for bug 18883813- added*/
//                                    if (fieldValue.indexOf("<") != -1) {
//                                        var re = new RegExp('<', "g");
//                                        fieldValue =  fieldValue.replace(re, "&lt;");
//                                    } else if(fieldValue.indexOf(">") != -1) {
//                                        var re = new RegExp('>', "g");
//                                        fieldValue =  fieldValue.replace(re, "&gt;");
//                                    }
//                                    textareaNode.innerHTML = fieldValue;
//									/*Fix for bug 18883813 starts*/
//									//setInnerText(textareaNode,fieldValue); /*Fix for 16816970*/
//									setInnerText(textareaNode,fieldValueBefReplace);
//									/*Fix for bug 18883813 ends*/
//                                    parentDIV.getElementsByTagName("INPUT")[0].name = textareaNode.name;
//                                    parentDIV.getElementsByTagName("INPUT")[0].value = textareaNode.value;
//                                    var finalOuterHTML = getOuterHTML_TXADisp(textareaNode);
//                                    if(finalOuterHTML.indexOf("<TEXTAREA")== -1){
//                                        if(authcolor != ""){
//                                            finalOuterHTML = finalOuterHTML.replace("<textarea", "<TEXTAREA style=\"color:"+authcolor+"\" name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
//                                            finalOuterHTML = finalOuterHTML.replace("</textarea>", "</TEXTAREA>");
//                                        }else{
//                                            finalOuterHTML = finalOuterHTML.replace("<textarea", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
//                                            finalOuterHTML = finalOuterHTML.replace("</textarea>", "</TEXTAREA>");
//                                        }
//                                    }else{
//                                        if(authcolor != ""){
//                                            finalOuterHTML = finalOuterHTML.replace("<TEXTAREA", "<TEXTAREA style=\"color:"+authcolor+"\" name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
//                                        }else{
//                                            finalOuterHTML = finalOuterHTML.replace("<TEXTAREA", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
//                                        }
//                                    }
//                                    setOuterHTML_TXADisp(parentDIV.getElementsByTagName("INPUT")[0], finalOuterHTML);
//                                    parentDIV.getElementsByTagName("TEXTAREA")[0].readOnly = true;
//                                    adjustRows(parentDIV.getElementsByTagName("TEXTAREA")[0]);
//                                    checkViewMode = true;
//                                }
//                            }
//                        }
                    }
//                } else if (type == "RADIO") {
//                    object.disabled = true;
//                } else if (type == "CHECKBOX") {
//                    object.disabled = true;
//                } else if (type == "PASSWORD") {
//                    object.readOnly = true;
//                    object.className = "TextReadonly";
//                } else if (type == "BUTTON") {
//                    object.disabled = true;
//                } else if (type == "FILE") {
//                    object.readOnly = true;
//                    object.className = "TextReadonly";
//                } else {
//                    object.readOnly = true;
//                }
            } else if (tagName == "OJ-TEXT-AREA" || tagName == "OJ-INPUT-PASSWORD" || tagName == "OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME"){
                //object.readOnly = true;
                object.setAttribute("readOnly",true);
               /* if (!object.getAttribute("oldInnerHTML")) object.className = "TextAreaReadonly"; // Added By Malaiah
                else {
                    object.setAttribute("onpropertychange", "", 0);
                    object.className = "TEXTAREADescription";
                }*/
             } else if (type == "OJ-RADIOSET"){
                object.disabled = true;
                
       
            } /*else if (tagName == 'BUTTON') {
                if (object.children[0]) {
                    if (object.children[0].className == 'IMGPopupEdit') {
                        object.disabled = false;
                    } else {
                        object.disabled = true;
                    }
                } else {
                    object.disabled = true;
                }*/
        else if (tagName == "OJ-SELECT-SINGLE") { //OJET Migration
            //object.disabled = true;
            //object.className = "SELro"
            object.setAttribute("readOnly",true);
               object.removeAttribute("disabled");
        } else if (tagName == "OJ-BUTTON") { //OJET Migration
            //object.disabled = true;
            //object.className = "SELro"
            object.setAttribute("disabled","true");	
//REDWOOD_CHANGES
            } else {
                object.disabled = true;
            }
      
        if (getNextSibling(object)) {
            if (getNextSibling(object).tagName) {
                if (getNextSibling(object).tagName.toUpperCase() == 'BUTTON') {
                    getNextSibling(object).disabled = true;
                    if (getNextSibling(object).className != 'BUTTONMultiple' && getNextSibling(object).name != 'BTN_NEXT_VER' && getNextSibling(object).name != 'BTN_GO_VER') {
                        if (object.name.indexOf("BTN_PREV_") == -1 && object.name.indexOf("BTN_NEXT_") == -1 && object.name.indexOf("BTN_LAST_") == -1 && object.name.indexOf("BTN_FIRST_") == -1 && object.name.indexOf("BTN_GO_VER") == -1){
                            if(object.name.indexOf("nFirst__") == -1 && object.name.indexOf("nPrev__") == -1 && object.name.indexOf("nNext__") == -1 && object.name.indexOf("nLast__") == -1 && object.name.indexOf("cmdAddRow_") == -1 && object.name.indexOf("cmdDelRow_") == -1 && object.name.indexOf("BTN_SINGLE_VIEW_") == -1){
                                if (getNextSibling(object).className != 'BtnViewMode' && getNextSibling(object).name.indexOf("BTN_GO_VER") == -1) {
                                    getNextSibling(object).oldClassName = getNextSibling(object).className;
                                    getNextSibling(object).className = 'BtnViewMode';
                                }
                            }
                        }
                    }
                }
            }
        }

    }
	if(object.getElementsByTagName("OJ-BUTTON")[0])	object.getElementsByTagName("OJ-BUTTON")[0].disabled =true;//35264798
    return;
}

function fnEnableElement(object) {
    if (object && object.style && object.style.visibility.toUpperCase() == "HIDDEN" && object.className.toUpperCase() == "HIDDEN") return;
//REDWOOD_CHANGES    
  var tagName = object.tagName.toUpperCase();//OJET Migration
        if(tagName == "BUTTON" || tagName == "OJ-BUTTON" || tagName == "OJ-INPUT-TEXT" || tagName == "OJ-INPUT-NUMBER"  ||tagName == "OJ-SELECT-SINGLE" ||tagName == "OJ-SWITCH" ||tagName == "OJ-RADIOSET" || tagName=="OJ-TEXT-AREA"|| tagName=="OJ-INPUT-PASSWORD" || tagName=="OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME") {//OJET Migration
			object.type ='TEXT';
	}	
//REDWOOD_CHANGES

    var type = object.type.toUpperCase();
    //var tagName = object.tagName;	//REDWOOD_CHANGES
    if (object) {
        if (type == 'HIDDEN') {
            var entityName = object.name;
            var indexDate = getOuterHTML(object).indexOf("displayDate");
            var indexAmount = getOuterHTML(object).indexOf("displayAmount");
            var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
                var inputObj ="";
                if(getNextSibling(getNextSibling(object)).tagName != "SPAN")
                    inputObj = getNextSibling(getNextSibling(object));   
                else
                    inputObj = getNextSibling(getNextSibling(getNextSibling(object)));
                if(inputObj) {
	                var entityDBC = object.getAttribute("DBC");
	                var entityDBT = object.getAttribute("DBT");
	                if (entityDBC) {
	                    if (entityDBT) {	
//REDWOOD_CHANGES
		               // inputObj.readOnly = false;
                                inputObj.setAttribute("readOnly",true);//OJET Migration
                                //inputObj.className = "TextNormal numeric";
//REDWOOD_CHANGES
	                        if (indexDate > 0) {
			            if (getNextSibling(inputObj)) {
                                    //getNextSibling(inputObj).disabled = false; //REDWOOD_CHANGES
                                    getNextSibling(inputObj).setAttribute("readOnly",false);  //REDWOOD_CHANGES
                                    }
	                        }
	                    } else {}
	                }
                }
            }
        } else {
            if ( tagName == 'OJ-INPUT-TEXT' || tagName == "OJ-INPUT-NUMBER" || tagName == "OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME") { //REDWOOD_CHANGES
                if (type == 'TEXT') {
                    //if (object.name == 'MAKER_ID' || object.name == 'MAKERID' || object.name == 'MAKER_DT_STAMPI' || object.name == 'MAKERSTAMPI' || object.name == 'CHECKER_ID' || object.name == 'CHECKERID' || object.name == 'CHECKER_DT_STAMPI' || object.name == 'CHECKERSTAMP' || object.name == 'CHECKERSTAMPI' || object.name == 'MOD_NO' || object.name == 'RECORD_STAT' || object.name == 'AUTH_STAT' || object.name == 'AUTHSTAT' || object.name == 'AUTH_STATUS' || object.name == 'CONTSTAT' || object.name == 'COLLECTION_STATUS' || object.name == 'PAYMENT_STATUS' || object.name == 'DEAL_STATUS' || object.name == "REVR_MAKERSTAMP" || object.name == "REVR_MAKERSTAMPI" || object.name == 'REVR_MAKERID' || object.name == 'REVR_CHECKERID' || object.name == 'REVR_CHECKERSTAMP' || object.name == 'REVR_CHECKERSTAMPI' || object.name == 'PROCESSTAT') {//REDWOOD_35438955 Commented
                        //fnEnableAuditBlock(object);
                    //} else {//REDWOOD_35438955 commented
                        if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                            //object.readOnly = true; //REDWOOD_CHANGES
                            object.setAttribute("readOnly",true); //REDWOOD_CHANGES
                            if (getOuterHTML(object).indexOf("validateInputAmount") > -1 || getOuterHTML(object).indexOf("validateInputNumber") > -1) {
                                //object.className = "TextReadonly numeric"; //REDWOOD_CHANGES
                            } else {
                                //object.className = "TextReadonly"; //REDWOOD_CHANGES
                            }
                        } else {	
                  //REDWOOD_CHANGES
                            //object.disabled = false;
                            //object.readOnly = false;
                            object.setAttribute("readOnly",false); 
                  //REDWOOD_CHANGES
                            if (getOuterHTML(object).indexOf("validateInputAmount") > -1 || getOuterHTML(object).indexOf("validateInputNumber") > -1) {
                               // object.className = "TextNormal numeric"; //REDWOOD_CHANGES
                            } else {		 
                      //REDWOOD_CHANGES
                           // object.className = "TextNormal";
                           if(tagName == 'OJ-INPUT-TEXT'){
                                 var len = object.getElementsByTagName("OJ-BUTTON").length;
                                 for(i=0;i<len;i++){
                                      if( object.getElementsByTagName("OJ-BUTTON")[i]){
                                         object.getElementsByTagName("OJ-BUTTON")[i].setAttribute("disabled",false);
                                    }
                                 }
                                   
                                }
                                object.setAttribute("readOnly",false);
                                object.setAttribute("tabIndex",0); //OJET Migration
//REDWOOD_CHANGES                            
                            }
                        }
                    //}//REDWOOD_35438955 commented 
                } else if (type == "PASSWORD") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.readOnly = true;
                        object.className = "TextReadonly";
                    } else {
                        object.disabled = false;
                        object.readOnly = false;
                        object.className = "TextNormal";
                    }
                } else if (type == "FILE") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.readOnly = true;
                        object.className = "TextReadonly";
                    } else {
                        object.disabled = false;
                        object.readOnly = false;
                        object.className = "TextNormal";
                    }
                } else {
                    if (object.name == 'RECORD_STAT' || object.name == 'AUTH_STAT' || object.name == 'AUTHSTAT' || object.name == 'AUTH_STATUS' || object.name == 'CONTSTAT' || object.name == 'COLLECTION_STATUS' || object.name == 'PAYMENT_STATUS' || object.name == 'DEAL_STATUS' || object.name == 'PROCESSTAT') {
                        object.disabled = true;
                    } else object.disabled = false;
                }
            } else if (tagName == 'OJ-TEXT-AREA' || tagName == 'OJ-INPUT-PASSWORD'  ){ //REDWOOD_CHANGES
                if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {	 
          //REDWOOD_CHANGES
                    //object.readOnly = true;
                     object.setAttribute("readOnly", true);
                    //object.className = "TextAreaReadonly";   
          //REDWOOD_CHANGES 
                } else {
                object.readOnly = false;  
          //REDWOOD_CHANGES
                 object.setAttribute("readOnly", false);
                //object.className = "TEXTAREASmall";
                }
            }else if ( tagName == 'OJ-INPUT-DATE'  || tagName == 'OJ-INPUT-DATE-TIME' ) {
                    object.readOnly = false;
                    object.setAttribute("readOnly", false);
               
            }   else if (tagName == "OJ-RADIOSET") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.disabled = true;
                       
                        //object.readOnly = true;
                    } else {
                        object.disabled = false;
                         object.removeAttribute("disabled");
                         
                    }
                }else if (tagName == "OJ-SWITCH") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                       // object.disabled = true;
                        //object.readOnly = true;
                        // object.setAttribute("disabled","true");
                          object.disabled = true;
                    } else {
                        //object.disabled = false;
                        //object.readOnly = false;
                        //object.setAttribute("disabled","false");
                         object.disabled = false;
                    }
                }else if (tagName == 'SELECT' || tagName == 'OJ-SELECT-SINGLE') { 
         //REDWOOD_CHANGES
                if (object.getAttribute("READONLY1")) {
                    //object.disabled = true;	   //REDWOOD_CHANGES
                    object.setAttribute("readonly",true); //REDWOOD_CHANGES
                } else {
                    object.disabled = false;
                    object.setAttribute("readonly",false); //REDWOOD_CHANGES
                }		   
//REDWOOD_CHANGES
            }else if ( tagName == 'OJ-BUTTON') {
                   // object.disabled = false;
                    //object.setAttribute("disabled","false"); 
                    object.removeAttribute("disabled");
                  
//                if (object.name.indexOf("go__") != 0) {
//                    if (object.name.indexOf("cmdAddRow_") != -1 || object.name.indexOf("cmdDelRow_") != -1 || object.name.indexOf("BTN_SINGLE_VIEW_") != -1) {
//                        object.disabled = false;
//                        object.className = "BTNimg";
//                    } else {
//                        object.disabled = false;
//                    }
//                }	  
//REDWOOD_CHANGES
            } else {
                object.disabled = false;
            }
        }
        if (getNextSibling(object)) {
            if (getNextSibling(object).tagName) {
                if (getNextSibling(object).tagName.toUpperCase() == "BUTTON") {
                   getNextSibling(object).disabled = false;
                    if (getNextSibling(object).className == 'BtnViewMode') getNextSibling(object).className = getNextSibling(object).oldClassName;
                }
            }
        }

    }
	if(object.getElementsByTagName("OJ-BUTTON")[0])	object.getElementsByTagName("OJ-BUTTON")[0].disabled =false;//35264798
    return;
}

function resetElements() {
    clearMulitipleEntryBlocks(); 
//REDWOOD_CHANGES
   // fnChangeLabelToText("TEXTAREA");
    /*resetAllElements("CHECKBOX");
    resetAllElements("INPUT");
    resetAllElements("SELECT");
    resetAllElements("TEXTAREA");
    resetAllElements("RADIO");
    resetAllElements('OJ-TEXT-AREA');*/ //OJET Migration
        resetAllElements("OJ-INPUT-TEXT"); //OJET Migration
        resetAllElements('OJ-INPUT-NUMBER'); //OJET Migration
        resetAllElements('OJ-SELECT-SINGLE'); //OJET Migration
        resetAllElements('OJ-SWITCH'); //OJET Migration
        resetAllElements('OJ-RADIOSET'); //OJET Migration
        resetAllElements('OJ-INPUT-PASSWORD'); //OJET Migration
        resetAllElements('OJ-INPUT-DATE'); //OJET Migration
       // resetAllElements('OJ-INPUT-DATE-TIME'); 
//REDWOOD_CHANGES


}

function resetAllElements(type,obj) {
    var elements;
     if (typeof obj != "undefined" && obj!=null){ //REDWOOD_CHANGES
        elements = obj.getElementsByTagName(type);
    } else {
        elements = document.getElementById('ResTree').getElementsByTagName(type);
    }

    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var tmpElem = elements[loopIndex];		
//REDWOOD_CHANGES
        if(tmpElem.tagName.toUpperCase() == "OJ-INPUT-DATE-TIME" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-DATE" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-TEXT" || tmpElem.tagName.toUpperCase() == "OJ-SELECT-SINGLE"|| tmpElem.tagName.toUpperCase() == "OJ-SWITCH" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-PASSWORD" || tmpElem.tagName.toUpperCase() == "OJ-RADIOSET"){//OJET Migration
            tmpElem.type = "text";
        }
        if ((tmpElem.tagName.toUpperCase() == "OJ-INPUT-PASSWORD" ||tmpElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-TEXT") && tmpElem.id.toLowerCase().indexOf( 'oj-searchselect-filter') == -1 ) {//OJET Migration
//REDWOOD_CHANGES
            if (tmpElem.type.toUpperCase() == 'TEXT' || tmpElem.type.toUpperCase() == 'HIDDEN' || tmpElem.type.toUpperCase() == 'PASSWORD') {
       //REDWOOD_CHANGES         
       if (tmpElem.getAttribute("DEFAULT") ){
                    if(tmpElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER" ){ //OJET Migration
                        tmpElem.value = Number(tmpElem.getAttribute("DEFAULT"));
                    }else{	
       //REDWOOD_CHANGES
                    tmpElem.value = tmpElem.getAttribute("DEFAULT");
                    }
       //REDWOOD_CHANGES         
                }else{
                    if(tmpElem.parentNode.getElementsByTagName("OJ-INPUT-NUMBER").length>0){//OJET-Arun //need to remove this code after removing resetAllElements('INPUT')
                       tmpElem.value = null;
                    }else{
                    tmpElem.value = "";
                      tmpElem.setAttribute("value","");//OJET Migration
                    }
                } 
//REDWOOD_CHANGES
            }

            if (tmpElem.type.toUpperCase() == 'CHECKBOX') {
                if (tmpElem.getAttribute("DEFAULT") == 'yes') 
                    tmpElem.checked = true;
                else 
                    tmpElem.checked = false;
            }
            if (tmpElem.type.toUpperCase() == 'RADIO') {
                var elemName = tmpElem.name;
                if (elemName) {
                    var radioElem = document.getElementsByName(elemName);
                    if (radioElem.length > 0) {
                        for (var elemCnt = 0; elemCnt < radioElem.length; elemCnt++) {
                            if (radioElem[elemCnt].getAttribute("DEFAULT") == 'yes') {
                                radioElem[elemCnt].checked = true;
                                break;
                            }
                        }
                    } else {
                        radioElem.checked = false;
                    }
                } else {
                    tmpElem.checked = false;
                }
            }
        }
               //REDWOOD_35313042 
   if (tmpElem.tagName.toUpperCase() == "OJ-RADIOSET") {
         var elemDefault = tmpElem.getAttribute('default');
		 var radioElem   = tmpElem.getAttribute('id');
		 if (elemDefault == "yes") {
             document.getElementById(radioElem).value = tmpElem.getAttribute('value');
         }
    }
               //REDWOOD_35313042 			
//REDWOOD_CHANGES
        if (tmpElem.tagName.toUpperCase() == "OJ-SWITCH"){
                if (tmpElem.getAttribute("DEFAULT") == "yes")
                    tmpElem.value = true;
                else
                    tmpElem.value = false;
            }	
//REDWOOD_CHANGES
        if (tmpElem.tagName.toUpperCase() == 'SELECT') {
        var selOptions = tmpElem.options; 
//REDWOOD_CHANGES
            var anySelected = false;
            for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++)
                if (selOptions[optnCnt].getAttribute("DEFAULT") || selOptions[optnCnt].getAttribute("DEFAULT") == "") {
                    anySelected = true;
                    tmpElem.value = selOptions[optnCnt].getAttribute("DEFAULT")
                }
            if (!anySelected)
                if (selOptions.length != 0)
                    tmpElem.value = selOptions[0].value
        }
         if (tmpElem.tagName.toUpperCase() == "OJ-SELECT-SINGLE") { //OJET Migration
            var selOptions = tmpElem.getAttribute('DEFAULTSEL');
            if(selOptions!=null){
                tmpElem.value = selOptions;
            }else{
                var options = selectControl[tmpElem.id];
                if(options&& options[0] && typeof(options[0].value) != "undefined"){
                    tmpElem.value =options[0].value;
                }
            }
           /* var selOptions = tmpElem.options;
            var anySelected = false;
            for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++) {
                if (selOptions[optnCnt].getAttribute("DEFAULT") || selOptions[optnCnt].getAttribute("DEFAULT") == "") {
                    anySelected = true;
                    tmpElem.value = selOptions[optnCnt].getAttribute("DEFAULT");
                }
            }
            if (!anySelected) {
                if (selOptions.length != 0) 
                    tmpElem.value = selOptions[0].value;
            }*/
        }
        if (tmpElem.tagName.toUpperCase() ==  "OJ-INPUT-DATE" || tmpElem.tagName.toUpperCase() ==  "OJ-INPUT-DATE-TIME" ) {
               tmpElem.value = "";
         }
        
        if (tmpElem.tagName.toUpperCase() == "OJ-TEXT-AREA")  
//REDWOOD_CHANGES
            if (tmpElem.getAttribute("DEFAULT")) 
                tmpElem.value = tmpElem.getAttribute("DEFAULT");
            else 
                tmpElem.value = ""	//REDWOOD_CHANGES
    
    }
}

function enableFormForQuery(){	   
//REDWOOD_CHANGES
    /*fnChangeLabelToText("TEXTAREA");
    enableAllElements("INPUT");
    enableAllElements("SELECT");
    enableAllElements("TEXTAREA");*/
    enableAllElements("OJ-INPUT-TEXT");
    enableAllElements("OJ-INPUT-NUMBER"); //OJET Migration
        enableAllElements("OJ-SELECT-SINGLE"); //OJET Migration
        enableAllElements("OJ-SWITCH"); //OJET Migration
         enableAllElements("OJ-INPUT-PASSWORD"); //OJET Migration
        enableAllElements("OJ-RADIOSET"); //OJET Migration
        enableAllElements("OJ-TEXT-AREA"); //OJET Migration
        enableAllElements("OJ-INPUT-DATE"); //OJET Migration	  
//REDWOOD_CHANGES
        
}

function enableQueryElements(type){
    var elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++){
        var tmpElem = elements[loopIndex];
        for (var innerIndex = 0; innerIndex < queryFields.length; innerIndex++){
            if (tmpElem.id.toUpperCase() == queryFields[innerIndex]){
                fnEnableElement(tmpElem);
                break;
            } else{
                fnDisableElement(tmpElem);
            }
        }
    }
}

function disableAfterQuery(){
    for (var innerIndex = 0; innerIndex < queryFields.length; innerIndex++){
        var tmpElem = document.getElementById(queryFields[innerIndex]);
        fnDisableElement(tmpElem);
    }
}

function ShowXML(xmlFile, scrnName, xslName) {
    var thirdChar = '';
    if (xmlFile) {
        if (xmlFile.lastIndexOf(".xml") == -1) {
            var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".XML"));
        } else {
            var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".xml"));
        }
        thirdChar = funcId.substring(2, 3);
    }
    var imagePath = 'Images';
    var childFunc="N";
    var html;
    var xmlDoc = loadXMLFile(xmlFile);
    var mainScreenNode = null;
    if (scrnName == '') {
        mainScreenNode = selectSingleNode(xmlDoc, "//FORM/SCREEN[@MAIN_WIN='Y']/@NAME");
        if (mainScreenNode) {
            scrnName = getNodeText(mainScreenNode);

        } else {
            mainScreenNode = selectSingleNode(xmlDoc, "//FORM/SCREEN/@NAME");
            if (mainScreenNode) {
                scrnName = getNodeText(mainScreenNode);
            }
        }
    }

    if (xmlDoc!=null) {
        try {
            scrPosition = selectSingleNode(xmlDoc, "//FORM/SCREEN[@NAME='" + scrnName + "']").getAttribute("POSITION");
        } catch(e)
        {}
    }
    if ((typeof(scrPosition) != 'undefined' && scrPosition == 'template') || xslName == 'Summary.xsl' || xslName == 'Summary_Advanced.xsl') {
        imagePath += "/" + strTheme.substring(0, strTheme.indexOf('.css'));
    }
    var inputBy_Audit = mainWin.getItemDesc("LBL_INPUT_BY");
    var authBy_Audit = mainWin.getItemDesc("LBL_AUTH_BY");
    var dateTime_Audit = mainWin.getItemDesc("LBL_DATE_TIME");
    var modNo_Audit = mainWin.getItemDesc("LBL_MOD_NO");
    var recStat_Audit = mainWin.getItemDesc("LBL_OPEN");
    var authStat_Audit = mainWin.getItemDesc("LBL_AUTHORIZED");
    var contractStat_Audit = mainWin.getItemDesc("LBL_CONTRACT_STATUS");
    var paymentStat_Audit = mainWin.getItemDesc("LBL_PAYMENT_STATUS");
    var collectionStat_Audit = mainWin.getItemDesc("LBL_COLLECTION_STATUS");
    var dealStat_Audit = mainWin.getItemDesc("LBL_DEAL_STATUS");
    var processStat_Audit = mainWin.getItemDesc("LBL_PROCESS_STATUS");
    var reversal_Audit = mainWin.getItemDesc("LBL_REVERSAL");
    var exit_Audit = mainWin.getItemDesc("LBL_EXIT");
    var cancel_Audit = mainWin.getItemDesc("LBL_CANCEL");
    var ok_Audit = mainWin.getItemDesc("LBL_OK");

    var applicationName = mainWin.applicationName;
    var dispSize = mainWin.dispSize;
    var remarks_Audit = mainWin.getItemDesc("LBL_REMARKS");
    var audit_Audit = mainWin.getItemDesc("LBL_AUDIT");
    var accept_Audit = mainWin.getItemDesc("LBL_ACCEPT");
    var vernoOfLbl = mainWin.getItemDesc("LBL_OF");
    var priority_Audit = mainWin.getItemDesc("LBL_PRIORITY_AUDIT");
    var high_Audit = mainWin.getItemDesc("LBL_HIGH");
    var normal_Audit = mainWin.getItemDesc("LBL_NORMAL");
    var showErrbtn_Audit = mainWin.getItemDesc("LBL_SHOWERR");
    var remarks_Audit = mainWin.getItemDesc("LBL_REMARKS");
    var getPrioritybtn_Audit = mainWin.getItemDesc("LBL_GETPRIORITY");
    var auditbtn_Audit = mainWin.getItemDesc("LBL_AUDIT");
    
    var mandatory = mainWin.getItemDesc("LBL_INFRA_MANDATORY");
    var collapsed = mainWin.getItemDesc("LBL_COLLAPSED");
    var add_row = mainWin.getItemDesc("LBL_ADDROW");
    var delete_row = mainWin.getItemDesc("LBL_DELETEROW");
    var single_rec_view = mainWin.getItemDesc("LBL_SINGLE_REC_VIEW");
    var noScript = mainWin.getItemDesc("LBL_NOSCRIPT_LABEL");
    var gateway_browser = mainWin.getItemDesc("LBL_GATEWAY_BROWSER");
    var select_all_rows = mainWin.getItemDesc("LBL_SELECT_ALL_ROWS");
    var select_row = mainWin.getItemDesc("LBL_SELECT_ROW");
    var taskList = mainWin.getItemDesc("LBL_TASKLIST");
    var end_table = mainWin.getItemDesc("LBL_END_TABLE");
    var current_version = mainWin.getItemDesc("LBL_CURRENT_VERSION");//added for 17388325
    var total_version =mainWin.getItemDesc("LBL_TOTAL_VERSION"); //added for 17388325

	/*Fix for 14813034 */
	var case_sensitive = mainWin.getItemDesc("LBL_CASE_SENSITIVE");
    var langCode = mainWin.LangCode; 
    var summaryLabels = fnSummaryLabels();

    if (html == null || mainWin.cacheContent == 'D') {
        var xslDoc = loadXSLFile(mainWin.loadXSL(xslName));

        var params = new Array();
        params["containerId"]  = funcId;
        params["screen"]  = scrnName;
        params["isChildFunc"]  = childFunc;
        params["funcId"]  = thirdChar;
        var scrType = "";
        if (typeof(screenType) != 'undefined') {
            scrType = screenType;
        }
        params["paginationReq"]  = getPagenationReq();
        params["priority"]  = priority_Audit;
        params["high"]  = high_Audit;
        params["normal"]  = normal_Audit;
        params["showErr"]  = showErrbtn_Audit;
        params["remarks"]  = remarks_Audit;
        params["getPriority"]  = getPrioritybtn_Audit;
        params["audit_au"]  = auditbtn_Audit;
    
        params["typeString"]  = scrType;
        params["imgPath"]  = imagePath;
        params["makerId"]  = inputBy_Audit;
        params["checkerId"]  = authBy_Audit;
        params["DtStamp"]  = dateTime_Audit;
        params["modNo"]  = modNo_Audit;
        params["recStat"]  = recStat_Audit;
        params["authStat"]  = authStat_Audit;
        params["contractStat"]  = contractStat_Audit;
        params["paymentStat"]  = paymentStat_Audit;
        params["collectionStat"]  = collectionStat_Audit;
        params["dealStat"]  = dealStat_Audit;
        params["processStat"]  = processStat_Audit;
        params["reversal"]  = reversal_Audit;
        params["exit"]  = exit_Audit;
        params["cancel"]  = cancel_Audit;
        params["ok"]  = ok_Audit;
        params["displaySize"]  = dispSize;
        params["audit"]  = audit_Audit;
        params["accept"]  = accept_Audit;
        params["vernoOfLbl"]  = vernoOfLbl;

        params["mandatory"]  = mandatory;
        params["collapsed"]  = collapsed;
        params["add_row"]  = add_row;
        params["delete_row"]  = delete_row;
        params["single_rec_view"]  = single_rec_view;
        params["noScript"]  = noScript;
        params["gateway_browser"]  = gateway_browser;
        params["select_all_rows"]  = select_all_rows;            
        params["select_row"]  = select_row;
        params["taskList"]  = taskList;
        params["end_table"]  = end_table;
        params["current_version"] = current_version;//added for 17388325
        params["total_version"] = total_version;//added for 17388325
        
        params["langCode"] = langCode;
        params["functionId"] = funcId;	//REDWOOD_CHANGES
        params["summaryLabels"]  = summaryLabels;
        params["dateFormat"] = mainWin.systemDateFormat;//HTML5 Changes	//REDWOOD_CHANGES
        params["dateDelimiterReqd"] = mainWin.dateDelimiterReqd;  //REDWOOD_CHANGES
        params["applicationName"]  = applicationName;
        params["oldTheme"]  = strTheme;
		/*Fix for 14813034 */
		params["search_CaseSensitive"]  = case_sensitive;
        if (typeof(exportReq) != 'undefined') {
        params["exportReq"]  = exportReq;
        } else {
            params["exportReq"]  = "";
        }
		params["browser"]  = navigator.userAgent.toLowerCase();
		params["largeScreenWidth"] =  mainWin.scrWidth; ;//12.1 screen height change start //REDWOOD_CHANGES
		params["mediumScreenWidth"] = mainWin.dashBoardWidth - 2 ;
		if(isSubScreen  == true){
			params["largeScreenWidth"] = mainWin.scrWidth;	//REDWOOD_CHANGES
		}
		params["screenHeight"] = mainWin.y;//12.1 screen height change end
        params["dateDelimiterReqd"] = mainWin.dateDelimiterReqd; //9NT1606_14_0_RETRO_12_0_3_27393036 changes
        html = transform(xmlDoc, xslDoc, params);
       /* if (typeof(screenType) != 'undefined') {
            if (screenType != 'WB') {
                if (typeof(functionId) == 'undefined') {
                    functionId = xmlFile;
                }
                mainWin.HTMLCache[functionId + scrnName + xslName] = html.cloneNode(true);
            } else {
                mainWin.HTMLCache[funcId + scrnName + xslName] = html.cloneNode(true);
            }
        } else {
            try {
                mainWin.HTMLCache[functionId + scrnName + xslName] = html.cloneNode(true);
            } catch(e) {
                mainWin.HTMLCache[funcId + scrnName + xslName] = html.cloneNode(true);
            }
        } */

        gXmlFileName = xmlFile;
        gScreenName = scrnName;
        gXslFileName = xslName;
    } else if (mainWin.cacheContent == 'E')
    {}
    return html;
}



function fnGetSubScreenTitle(xmlFile, scrnName) {
    var xmlDoc = loadXMLFile(xmlFile);
    var screenNode = selectSingleNode(xmlDoc, "//SCREEN[@NAME='" + scrnName + "']/@TITLE");
    if (screenNode) {
        return getNodeText(screenNode);
    } else {
        return "";
    }
}

function ShowDialog(WinName, height, width, args){
    var dlgArg = new Object();
    dlgArg = args;
    return window.showModalDialog(WinName + ".jsp", dlgArg, "dialogTop:180;dialogLeft:180;dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:yes; resizable:no; scroll:no; status:no;");
}


function ShowErrorDialog(attr, message, isModal, overideAllowed){
    var isModal = (isModal == null) ? true: isModal;
    var overideAllowed = (overideAllowed == null) ? true: overideAllowed;
    if (isModal) return window.showModalDialog("OVRDMSGS.jsp?overrideAllowed=" + overideAllowed + "&type=" + attr, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
    else
    return window.showModelessDialog("OVRDMSGS.jsp?overrideAllowed=" + overideAllowed + "&type=" + attr, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
}

function show_auto_lov(returnflds, frm, bindVars, title, columnHeaders, rednFldLabels, containerId, lovId, exactFetch,dispField, e) {  //Fix for 18678458 -Exact Fetch changes  
}

function lov(qry, reductionFlds, dtyp, returnflds, title, chdr, frm, bindVars, fetchRows, pageSize, selectDB, tilde, userLOVID, autoLOVRequired, indexFields){//Index based search changes
    if (fetchRows) this.fetch_records = fetchRows;
    else this.fetch_records = 500;

    this.pageSize = 10;
    this.query_text = qry;
    this.data_type_str = dtyp.toUpperCase();
    this.reduction_criteria = reductionFlds.toUpperCase();
    this.ret_flds = returnflds;
    this.title = title;
    this.column_headings = chdr;
    this.form_name = frm;
    this.bind_vars = bindVars.toUpperCase();
    this.rednFldLabels = "";
    if (typeof(autoLOVRequired) != "undefined") {
        this.autoLOVRequired = autoLOVRequired;
    } else {
        this.autoLOVRequired = "Y";
    }
    this.tilde = tilde;
    this.userLOVID = userLOVID;
    if (selectDB) this.selectDB = selectDB;
    else this.selectDB = "R";
    this.show_lov = disp_lov;
    this.show_auto_lov = disp_auto_lov;
    this.indexFlds=indexFields;//Index based search changes
}
var returnFlds  = "";
var recordNum   = 0;
var lovBlockObj;
var lovSrcElem;
var isLovOpen = false;
function disp_lov(returnflds, frm, bindVars, title, columnHeaders, rednFldLabels, containerId, lovId,e){
    if (isLovOpen) {
        return false;
    }
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);	 
//REDWOOD_CHANGES
   /* if (srcElem.parentNode && srcElem.parentNode.tagName.toUpperCase() == 'OJ-BUTTON') {
        lovSrcElem = getPreviousSibling(srcElem.parentNode);
    } else {
        if(srcElem.tagName.toUpperCase() == 'OJ-BUTTON') {
            if (getPreviousSibling(srcElem)) {
                lovSrcElem = getPreviousSibling(srcElem);
            } else {
                lovSrcElem = srcElem;
            }
        } else { 
            lovSrcElem = srcElem;
        }
    }*/
     if (srcElem.tagName && srcElem.tagName.toUpperCase() == 'OJ-BUTTON'){ //OJET  Migration ; only for OJ-INPUT-NUMBER LOV
        var prevElem = getPreviousSibling(srcElem);
        if(prevElem && (prevElem.tagName.toUpperCase() == 'OJ-INPUT-NUMBER' || prevElem.tagName.toUpperCase() == 'OJ-TEXT-AREA')){
            srcElem = prevElem;
        }
    }
    
    while (srcElem.tagName && srcElem.tagName.toUpperCase() != 'OJ-INPUT-TEXT' && srcElem.tagName.toUpperCase() != 'OJ-INPUT-NUMBER' && srcElem.tagName.toUpperCase() != 'OJ-TEXT-AREA'){

        srcElem = srcElem.parentNode;
            }
            lovSrcElem = srcElem;	
//REDWOOD_CHANGES
   
    if ('undefined'.indexOf(this.userLOVID) == -1) {
        if (this.userLOVID != " ") {
            lovId = this.userLOVID;
        }
    }
	// Fix for Bug 17175235 - start 
    try {
        var fnEval = new Function('fnPreDispLov_' + lovId + '()');  
        fnEval();
    } catch(e){}
	/*9NT1606_12_4_RETRO_12_0_3_26230499 Starts*/
	if(screenArgs && screenArgs["lovId"]){
		lovId = screenArgs["lovId"];
	}
	/*9NT1606_12_4_RETRO_12_0_3_26230499 Ends*/
    // Fix for Bug 17175235 - end  
    var isME = "false";
    var singleView = "false";
    recordNum = 0;
    var curr_user = mainWin.UserId;
    var curr_branch = mainWin.CurrentBranch;
    var curr_module = mainWin.CurrentModule;
    var curr_dsnName = mainWin.dsnName;
    var appSource = mainWin.AppSource;
    var langCode = mainWin.LangCode; 
    var fetch_value = mainWin.getItemDesc("LBL_FETCH_VALS");
    /*12.1 lov query issue Starts*/
    //var Function_id = mainWin.document.getElementById("fastpath").value;
    var Function_id = functionId;
    /*12.1 lov query issue Ends */
    var appSource = mainWin.AppSource;
    var CSRF_token = mainWin.CSRFtoken;
    var objRet_flds;
    var objForm_name;
    var objBind_vars;
     if (typeof(g_txnBranch) == 'undefined'){
      g_txnBranch=curr_branch;
     }

   /* if (!mainWin.isSessionActive()) session expiry change  
        return; */
        
    if (returnflds){
        objRet_flds = returnflds;
    } else{
        objRet_flds = this.ret_flds;
    }
    returnFlds = objRet_flds;
    if (frm){
        objForm_name = frm;
    } else{
        objForm_name = "form1";
    }

    if (bindVars){
        objBind_vars = bindVars;
    } else{
        objBind_vars = this.bind_vars;
    }
    
    this.column_headings = columnHeaders;
    this.rednFldLabels = rednFldLabels;
    if(getPreviousSibling(lovSrcElem)){
        if(getPreviousSibling(getPreviousSibling(lovSrcElem)))
            title = getInnerText(getPreviousSibling(getPreviousSibling(lovSrcElem)));	
    }else{
        if(fnGetParentHTMLElement(lovSrcElem))
            if(getPreviousSibling(fnGetParentHTMLElement(lovSrcElem)))
                title = getInnerText(getPreviousSibling(fnGetParentHTMLElement(lovSrcElem)));	
    }
    this.title = mainWin.getItemDesc("LBL_LISTOF_VAL") + " " + title;

    strReduc = this.reduction_criteria;
    arrReduc = new Object();
    numReduc = string_parser(strReduc, '~', arrReduc);

    arrRednLabels = new Object();
    string_parser(rednFldLabels, '~', arrRednLabels);
    
    var recNum = 0;
    var inputBoxName;
    var elementsLength;
    //Fix for 17233213 start
    /*
    if (getPreviousSibling(srcElem)){
        if (getPreviousSibling(srcElem).tagName){
            if (getPreviousSibling(srcElem).tagName != "IMG"){
                inputBoxName = getPreviousSibling(srcElem).name;
                elementsLength = document.getElementsByName(inputBoxName).length;
            }
        }
    }
    */
    inputBoxName = lovSrcElem.name;
    elementsLength = document.getElementsByName(inputBoxName).length;
     //Fix for 17233213 end
    if (elementsLength > 0){
        if (document.getElementsByName(inputBoxName)[0].ownerDocument){
            
            if (document.getElementsByName(inputBoxName)[0].ownerDocument.title.indexOf('Single Record View') > -1){
                elementsLength = 1;
                singleView = "true";
            }
        }
    }
    if (elementsLength == 1){
        recordNum = 0;
    } else{
        tmpElem = srcElem;
        while (tmpElem.tagName != "TR"){
            tmpElem = tmpElem.parentNode;
            if (tmpElem == null){
                recordNum = 0;
                break;
            }
        }
        if (tmpElem){		
            if (tmpElem.rowIndex > 0) {
                isME = "true";
                lovBlockObj = tmpElem;
                while (lovBlockObj.tagName != "TABLE") {
                    lovBlockObj = lovBlockObj.parentNode;
                    if (lovBlockObj && lovBlockObj.id && lovBlockObj.id == "TblQuery"){
                        isME = "false";
                    }
                }
                recordNum = tmpElem.rowIndex ;//21147471 
                //dbIndexArray[lovBlockObj.getAttribute("DBT")] = tmpElem.rowIndex ;//21147471 //bug_27182547
				dbIndexArray[lovBlockObj.getAttribute("DBT")] = tmpElem.rowIndex+1;//bug_27182547
                if (isME == "false")
                    recordNum = 0;
            } else 
                recordNum = 0;
        }
    }

    var cpy_bind_flds = objBind_vars;
    if (! (cpy_bind_flds == "")){
        var bind_var_arr1 = new Object();
        var value = new Object();
        var type = new Object();
        var bind_size1 = string_parser(cpy_bind_flds, '~', bind_var_arr1);
        for (m = 0; m < bind_size1; m++){
            var bind_str1 = new Object();
            var cpy_bind_var_arr1 = bind_var_arr1[m];
            var bind_sub_size1 = string_parser(cpy_bind_var_arr1, '!', bind_str1);
            var bind_str1Array;
            if(singleView == "true"){
                bind_str1Array = parent.document.getElementsByName(bind_str1[0]);
            } else {
                bind_str1Array = document.getElementsByName(bind_str1[0]);
            }
            if (bind_str1Array.length > 1) {
                var rowElem = bind_str1Array[0];
                var bindRecNum = 0;
                while (rowElem.tagName != "TABLE") {
                    rowElem = rowElem.parentNode;
                    if (rowElem == null) {
                        bindRecNum = 0;
                        break;
                    }
                }
                if (rowElem) {
                    if (rowElem.getAttribute("DBT")) 
                        //bindRecNum = dbIndexArray[rowElem.getAttribute("DBT")] ;//21147471 Fix for 23106533
                        bindRecNum = dbIndexArray[rowElem.getAttribute("DBT")] - 1; // Fix for 23106533
                    else 
                        bindRecNum = 0;
                }
                value[m] = getFieldData(bind_str1Array[bindRecNum]);
            } else {
                value[m] = getFieldData(bind_str1Array[0]);
            }
            type[m] = bind_str1[1];
        }
        var strdel = "";
        for (l = 0; l < m - 1; l++){
            strdel = strdel + value[l] + "!" + type[l] + "~";
        }
        strdel = strdel + value[l] + "!" + type[l];
        cpy_bind_flds = strdel;
    }
    
    var lovType ='Y';
    screenType = mainWin.gActiveWindow.screenType;//FCUBS10.3_WebBranch LOV change
    if (screenType == "WB") { 
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".",0)); 
    }
    
    var 
    l_Params  = "title="           + title;
    l_Params += "&SourceCode="     + "FLEXCUBE"
    l_Params += "&containerId="    + containerId;
/* security fixes for WF starts*/
    l_Params += "&returnflds="     + replaceTilde(returnflds);
    /*SFR:17439180 : Fix for 17351640 starts*/
    if (typeof(cpy_bind_flds) != "undefined" &&cpy_bind_flds != null && cpy_bind_flds!="") {
      var tempCpy_bind_fldsr = cpy_bind_flds;
      tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, "/", "_SLH_");
      tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr,  "#", "_HASH_");
      tempCpy_bind_fldr = replaceAllChar(tempCpy_bind_fldsr, ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, "(", "_OPARAN_");
	  tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, ")", "_CPARAN_");
	  tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
      l_Params += "&bindVars="       + replaceTilde(tempCpy_bind_fldsr);
    }
    else{
      l_Params += "&bindVars="       + replaceTilde(cpy_bind_flds);
    }
    /*SFR:17439180 : Fix for 17351640 Ends*/
    l_Params += "&columnHeaders="  + replaceTilde(columnHeaders);
    l_Params += "&rednFldLabels="  + replaceTilde(rednFldLabels);
/* security fixes for WF ends */
    l_Params += "&lovId="          + lovId ;
    l_Params +="&screentype="      + screenType; 
    //l_Params +="&lovSrcElem="      +lovSrcElem;
    l_Params +="&isME="            +isME;
    l_Params +="&singleView="      +singleView;
    l_Params +="&lovType="         + lovType;
    //l_Params +="&query_text="      + this.query_text;
/* security fixes for WF starts*/
    l_Params +="&data_type_str="   + replaceTilde(this.data_type_str);
    l_Params +="&column_headings=" + replaceTilde(this.chdr);
/* security fixes for WF ends*/
    l_Params +="&fetch_records="   + this.fetch_records;
    l_Params +="&selectDB="        + this.selectDB;
    l_Params +="&PageSize="        + this.pageSize;
    l_Params +="&numReduc="        + numReduc;
/* security fixes for WF starts*/
    l_Params +="&objBind_vars="    + replaceTilde(objBind_vars);
    l_Params +="&objRet_flds="     + replaceTilde(objRet_flds);  
/* security fixes for WF ends*/
    //l_Params +="&recNum="          + recNum;
    l_Params +="&objForm_name="    + objForm_name;
    l_Params +="&appSource="       + appSource;
    l_Params +="&curr_dsnName="    + curr_dsnName;
    l_Params +="&curr_module="     + curr_module;
    l_Params +="&functionId="      + Function_id;
    l_Params +="&rednCriteria="    + replaceTilde(strReduc);/* security fixes for WF */
    l_Params +="&indexFlds="       + this.indexFlds;//Index based search changes
    l_Params += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
   // l_Params += "&seqNo=" + getSeqNo();//Logging changes
    if (typeof(g_txnBranch) == "undefined") {
        l_Params +="&txnBranch="+mainWin.CurrentBranch;
    }else {
        l_Params +="&txnBranch="+g_txnBranch;
        }
    // Fix for Bug 16766179 - start 
    if (lovSrcElem.value != undefined) {    
		l_Params +="&autoRedCriteria=" + lovSrcElem.value;
    }
    // Fix for Bug 16766179 - end
    isLovOpen = true    /*Changes for lov issue on SAVE*/
  //  mask();  //REDWOOD_CHANGES
    var re = new RegExp("#", "g");
    l_Params = l_Params.replace(re, "%23");
    loadSubScreenDIV("ChildWin", "LOV.jsp?"+l_Params);    
}

function show_editor(elemId, maxLength, title, e){
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    
    if (getPreviousSibling(srcElem) && getPreviousSibling(srcElem).getAttribute("LABEL_VALUE")) {
        title = getPreviousSibling(srcElem).getAttribute("LABEL_VALUE");
    } else {
        title = title;
    }
   
    var recNum = -1;
    if ((getRowIndex(event) == 0) || (getRowIndex(event) == -1)) recNum = 0;
    else recNum = getRowIndex(event);
    var inputBoxName;

   //REDWOOD_CHANGES 
    if (srcElem.parentNode.tagName.toUpperCase() == 'OJ-BUTTON') { //Safari Change
        if (getPreviousSibling(srcElem.parentNode).tagName.toUpperCase() == 'OJ-BUTTON') {
//REDWOOD_CHANGES
            inputBoxName = getPreviousSibling(getPreviousSibling(srcElem.parentNode)).name;
        }else {
            inputBoxName = getPreviousSibling(srcElem.parentNode).name;
        }
    }else {
        if (getPreviousSibling(srcElem) && getPreviousSibling(srcElem).tagName.toUpperCase() == 'OJ-BUTTON') {//REDWOOD_CHANGES
            inputBoxName = getPreviousSibling(getPreviousSibling(srcElem)).name;
        } else {
            inputBoxName = getPreviousSibling(srcElem) && getPreviousSibling(srcElem).name;//REDWOOD_CHANGES
        }
    }
    var elementsLength = document.getElementsByName(inputBoxName).length;
    if (elementsLength > 0) {
        if (document.getElementsByName(inputBoxName)[0].ownerDocument) {
            if (document.getElementsByName(inputBoxName)[0].ownerDocument.title == 'Single Record View') {
                elementsLength = 1;
            }
        }
    }
    if (elementsLength == 1) {
        recNum = 0;
    } else {
        tmpElem = srcElem;
        while (tmpElem.tagName != "TR") {
            tmpElem = tmpElem.parentNode;
            if (tmpElem == null) {
                recNum = 0;
                break;
            }
        }
		//Bug#25089729 start
		/*
        if (tmpElem) {
            recNum = tmpElem.rowIndex - 2;
        }
		*/
		//Bug#25089729 end
		//Bug#25089729_1 start
		if (tmpElem) {
            recNum = tmpElem.rowIndex;
        }
		//Bug#25089729_1 end

    }

    if (!maxLength) 
        maxLength = document.getElementsByName(elemId)[0].getAttribute("SIZE");
    var dlgLeft = 400;
    var dlgTop = window.screenTop;
    
    var readOnlyAttr = "false";	   
//REDWOOD_CHANGES
    /*if (document.getElementById(elemId) != null && (document.getElementById(elemId).readOnly || document.getElementById(elemId).disabled)){
        readOnlyAttr = "true";
    }else if(document.getElementsByName(elemId)[recNum].readOnly || document.getElementsByName(elemId)[recNum].disabled){
        readOnlyAttr = "true";
    }*/
    var isME = tmpElem && tmpElem.tagName == 'TR';	
//REDWOOD_CHANGES
	//9NT1606_12_4_RETRO_12_2_26583097 Starts
    var isMesv = false;
    if (location.pathname.indexOf("LaunchSingleViewScreen.jsp") != -1) {
        isMesv = true;
    }		
	
//REDWOOD_CHANGES
    var readOnlyAttr;
    if (isME || isMesv) {
        var rcIndex;
        if (tmpElem) {
           rcIndex = tmpElem.rowIndex;
        } else {
            rcIndex = recNum;
        }        
       // readOnlyAttr = document.getElementById(elemId+"RC"+rcIndex).readonly || document.getElementById(elemId+"RC"+rcIndex).disabled;  //Redwood_35326828 Commented      
 		  readOnlyAttr = getElementsByOjName(elemId)[rcIndex].readonly || getElementsByOjName(elemId)[rcIndex].disabled;        //Redwood_35326828
		
    } else {
		//readOnlyAttr = document.getElementById(elemId).readonly || document.getElementById(elemId).disabled;//Redwood_35326828 Commented        
        readOnlyAttr = getElementsByOjName(elemId)[0].readonly ||getElementsByOjName(elemId)[0].disabled;//Redwood_35326828
    }	
//REDWOOD_CHANGES

    //9NT1606_12_4_RETRO_12_2_26583097 Ends
	
    var l_Params  = "title="       + title;       
        l_Params += "&elemId="     + elemId;
        l_Params += "&maxLength="  + maxLength; 
        l_Params += "&recNum="     + recNum; 
        l_Params += "&readOnlyAttr="     + readOnlyAttr; 
		l_Params += "&isMesv=" + isMesv; //9NT1606_12_4_RETRO_12_2_26583097 changes 

    mask();
    loadSubScreenDIV("ChildWin", "ExtEditor.jsp?"+l_Params);
}

var gCalDSODate = null;
var gCalBtn = null;

function disp_cal(idDate, evnt) {
  /*  if (!mainWin.isSessionActive()) session expiry change  
        return; */
    var currUser = mainWin.UserId;
    var event = window.event || evnt;
    gCalBtn = getEventSourceElement(event);
    
    if (gCalBtn.parentNode.tagName.toUpperCase() == "NOBR" || gCalBtn.parentNode.tagName.toUpperCase() == "DIV") 
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode.parentNode, idDate);
    else 
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode, idDate);

    var currentBranch = mainWin.CurrentBranch;

    var date=mainWin.txnBranch[g_txnBranch].AppDate;
    if(typeof(date)=='undefined'){
        var date = mainWin.AppDate;
    }
    var nCurrYear = null;
    var nCurrMonth = null;

    if (gCalDSODate && gCalDSODate != '' && gCalDSODate.value && (gCalDSODate.value != '')) {
        var curDate = gCalDSODate.value;
        if (gDateFormatDSO == "yyyy-MM-dd") {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(5, 2);
        } else {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(4, 2);
        }
    } else {
        var l_date = date.split("-");
        nCurrYear = l_date[0];
        if (parseInt(nCurrYear) < 1000) parseInt(nCurrYear) += 1900;
        nCurrMonth = l_date[1];
    }
    var l_Params   = "&Year=" + nCurrYear;
    l_Params  += "&Month=" + nCurrMonth;
    l_Params  += "&Brn=" + currentBranch;
    l_Params  += "&currUser=" + currUser;
    l_Params  += "&functionId=" + functionId;
    l_Params +="&txnBranch="      +g_txnBranch;
    l_Params +="&txnBranchDate="  +date;
    
    mask();
    loadSubScreenDIV("ChildWin", "ExtCalendar.jsp?"+l_Params);
}

function confirmAction(){
    var messages = new Array();
    var message = "";;
    var retVal = true;
    var msg = buildMessage(gErrCodes);

    if (msg.indexOf("~") > 0){
        messages = msg.split("~");

        for (var iLoop = 0; iLoop < messages.length; iLoop++){
            if (messages[iLoop] != undefined || messages[iLoop] != ""){
                message += messages[iLoop];
            }
        }
    } else message = msg;

    retVal = window.confirm(message);
    return retVal;
}


function appendErrorCode(code, anyArg) {
    gErrCodes += code;
    if (anyArg != null && anyArg != "") {        
        replaceStr += anyArg;
        replaceStr += "~";
    } else
    	replaceStr += "~";
    gErrCodes += "~";
}

function buildMessage(pCodes){
    var substitutionValues;
    var temp = "";
    var singleCode = ""
    var message = "";
    var codes = new Array();
    var eachCode = new Array();

    codes = pCodes.split("~");
    if (codes.length > 0){
        for (var iLoop = 0; iLoop < codes.length; iLoop++){
            eachCode = new Array();
            substitutionValues = "";

            temp = codes[iLoop];

            if (temp != undefined && temp != ""){
                if (temp.indexOf("!") > 0){
                    eachCode = temp.split("!");
                    singleCode = eachCode[0];
                    for (var iInnerLoop = 1; iInnerLoop < eachCode.length; iInnerLoop++){
                        substitutionValues += eachCode[iInnerLoop];
                        substitutionValues += "~"
                    }
                } else singleCode = temp;

                message += retrieveMessage(singleCode, substitutionValues);
                message += '\n';
                message += "~";
            }
        }
    }
    gErrCodes = "";
    return message;
}
  //REDWOOD_CHANGES
function retrieveMessage(code, substitutionValues) {
    var errDesc = funcErrList[code];
    var msg;
    if (errDesc != undefined) {
        var rec = new Array();
        var rec = errDesc.split('~');
        msg = rec[0];
        msg = getMessage(msg, substitutionValues);
    }
    else {
        errDesc = mainWin.getCommonErrorList()[code];
        if (errDesc != undefined) {
            var rec = new Array();
            var rec = errDesc.split('~');
            msg = rec[0];
            msg = getMessage(msg, substitutionValues);
        }
        else {
            msg = code + "-Error Occured but message could not be determined";
        }
    }
    return msg;
}

 //REDWOOD_CHANGES
function alertMessage(msg){
    var messages = new Array();
    var message = "";;

    if (msg.indexOf("~") > 0){
        messages = msg.split("~");

        for (var iLoop = 0; iLoop < messages.length; iLoop++){
            if (messages[iLoop] != undefined || messages[iLoop] != ""){
                message += messages[iLoop] + "~";
            }
        }
    } else message = msg;
    alert(message);
    return false;
}

function confirmExit(){

    var retVal = true;
    if (document.forms(0).Op.value != ""){
        appendErrorCode('ST-COM012', "");
        if (! (confirmAction())) return false;
    }
    return retVal;
}

function fnLoadSubScreen(xmlFileName, xslFileName, screenName){
	//if (!mainWin.isSessionActive()) return; //14669746 12.0 fix  session expiry change  
	isSubScreen =  true; //12.1 screen height change
  	g_txnBranch=txnBranch;
 	// txnBranchUC=parent.txnBranchUC;
    var funcId = xmlFileName.substring(xmlFileName.lastIndexOf("/") + 1, xmlFileName.lastIndexOf(".xml"));
    debugs("FunctionId~xmlFileName~xslFileName", functionId + "~" + funcId + "~" + xslFileName);
    
    if (parent.dbDataDOM != null)
    dbDataDOM = loadXMLDoc(getXMLString(parent.dbDataDOM));
    dbIndexArray = parent.dbIndexArray;
    gAction = parent.gAction;
    ShowSummary = "FALSE";

    if (parent.relationArray){
        relationArray = parent.relationArray;
    }
    if (fromCallform == "no"){
        dataSrcLocationArray = parent.dataSrcLocationArray;
    }
    var html = ShowXML(xmlFileName, screenName, xslFileName);
    if(getBrowser().indexOf("IE") != -1) {//ie11 changes
        document.getElementById("ResTree").insertAdjacentHTML("beforeEnd", html);
    } else {
        document.getElementById("ResTree").appendChild(html);
    }
//REDWOOD_CHANGES
    
    if (getBrowser().indexOf("FIREFOX") != -1) {
        document.getElementById("ResTree").querySelectorAll('template').forEach((elem) => elem.remove());
        document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
    }else{
         document.getElementById("ResTree").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
    }
    document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
 
   var  footerContent = document.getElementById("DIVFooter");
    if(footerContent!=null){
   footerContent.classList.remove("DIVfooter");
   document.getElementById("subscreenFooter").innerHTML = footerContent.outerHTML;
   footerContent.parentNode.removeChild(footerContent);
    }
//REDWOOD_CHANGES
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes,Fix for 21355639
        try {
            var scriptElements = document.getElementsByTagName("script");
            for(var i = 0; i < scriptElements.length; ++i) {
                if(scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));  
                    fnEval();
                }
            }
        } catch(e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 start*/
    else if(getBrowser().indexOf("IE") != -1){//ie11 changes
      try {
            var scriptElements = document.getElementsByTagName("script");
            for (var i = 0; i < scriptElements.length; ++i) {
                if (scriptElements[i].defer == true) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(scriptElements[i].innerHTML);  
                    fnEval();
                }
            }
        } catch (e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 end*/
    fnTabDetails();
     fnBindScreenElements();////REDWOOD_CHANGES
        var tempgAction = mainWin.gActiveWindow.gAction;
        mainWin.gActiveWindow.gAction = "";
        //mainWin.showToolbar('', '', '');
        //Ashok 12.0
        //if (gAction == "NEW" || gAction == "MODIFY"){
        //document.getElementById("Save").disabled = true;
        //document.getElementById("Save").style.display = "none";
        ////mainWin.document.getElementById("Save").className ="BTNiconD";
        //}
        mainWin.gActiveWindow.gAction = tempgAction;
  //REDWOOD_CHANGES  
//    if (xslFileName == "Summary_Advanced.xsl") {
//		/*16861535 Fix starts*/
//        var advTblObj = document.getElementById("TblAdvanced");
//        lovHtml = advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[1].innerHTML;
//        lovHtml1= advTblObj.getElementsByTagName("FIELDSET")[1].children[1].children[2].innerHTML;
//        /*16861535 Fix ends*/
//        fnCalcHgt(true);
//        addEvent(document.getElementById("WNDbuttons"), "onclick", "fnCloseSumary()");
//        document.getElementById("BTN_EXIT_IMG").focus();   
//        if (parent.screenArg["ACTION"] == "EDITQUERY") {
//            fnPopulateAdvQueryData();
//            parent.screenArg["ACTION"] = "";
//        }
//        return;
//    }	  
//REDWOOD_CHANGES
    if (xslFileName == "Summary_Advanced.xsl") {	
//REDWOOD_CHANGES
//        var advTblObj = document.getElementById("TblAdvanced");
//         //12.1 summary performance changes new start
//        if(parent.document.getElementById("TblRcmndedQuery") != null){
//        }else{
//            document.getElementById("idRecommendedFieldFldSet").style.display  = "none";
//        }
setTimeout(function(){fnCalcHgtSubScreen();
        addEvent(document.getElementById("WNDbuttons"), "onclick", "fnExit_sum('" + screenName + "')");
       },0);  
//REDWOOD_CHANGES
        return;
    }
    debugs("InnerHTML", html);	   
//REDWOOD_CHANGES
   // parent.mask(true); //static header change
    //fnSetScreenSize(); //static header change 
    //fnBuildMultipleEntryArray();		   
//REDWOOD_CHANGES
    var xmlDoc = loadXMLFile(xmlFileName);
    //parent.mask(true); static header change
    setTimeout(function(){fnCalcHgtSubScreen();},0);  //REDWOOD_CHANGES
    //fnCalcHgt();	//REDWOOD_CHANGES
    //HTML5 Changes 6/OCT/2016 Start
    if (mainWin.document.getElementById("vtab").style.display != "none") {
        mainWin.showHideVtab();
    }//HTML5 Changes 6/OCT/2016 End
    addEvent(document.getElementById("WNDbuttons"), "onclick", "fnExitSubScreen(event)");
    if (screenName == ''){
        screenName = selectSingleNode(xmlDoc,"//SCREEN[@MAIN_WIN = 'Y']").getAttribute("NAME");
    }
    if (gAction == '' || gAction == 'EXECUTEQUERY') {
        setTimeout(function(){disableForm();},0); //REDWOOD_CHANGES
    } else if (gAction == 'MODIFY') {
        if (screenType == 'O') {
            enableForm();
        } else {
            if(onceAuthObj){
                if(onceAuthObj.value == 'Y'){
                    enableForm();	 
          //REDWOOD_CHANGES
                    disableElements("OJ-INPUT-TEXT");
                    disableElements("OJ-SELECT-SINGLE");
                    disableElements("OJ-TEXT-AREA");  
          //REDWOOD_CHANGES
                } else {
                    enableForm();
                }
            } else {
                enableForm();
//REDWOOD_CHANGES
                disableElements("OJ-INPUT-TEXT");
                disableElements("OJ-SELECT-SINGLE");
                disableElements("OJ-TEXT-AREA");   
//REDWOOD_CHANGES
            }
        }
    } else {
        enableForm();
    }	 
//REDWOOD_CHANGES
   /* try {
        //eval('fnPostLoad_' + screenName + '(parent.screenArgs);');
        var fnEval = new Function('fnPostLoad_' + screenName + '(parent.screenArgs);');  
        fnEval();
        if (gAction == 'VIEWMNTLOG') {
            showTabData_Viewchg();
            viewModeAction = true;
            disableAllElements("INPUT");
            viewModeAction =false;          
            fnEnableElement(document.getElementById("BTN_EXIT_IMG"));            
        }
    } catch(e) {
        showTabData();
        if (gAction == 'VIEWMNTLOG') {
            showTabData_Viewchg();
            viewModeAction = true;
            disableAllElements("INPUT");
            viewModeAction =false;            
            fnEnableElement(document.getElementById("BTN_EXIT_IMG"));   
        } else if (gAction == 'MODIFY') {
            if (screenType == 'O') {
                enableForm();
            } else {
                if(onceAuthObj){
                    if(onceAuthObj.value == 'Y'){
                        enableForm();
                        disableElements("INPUT");
                        disableElements("SELECT");
                        disableElements("TEXTAREA");
                    } else {
                        enableForm();
                    }
                } else {
                    enableForm();
                    disableElements("INPUT");
                    disableElements("SELECT");
                    disableElements("TEXTAREA");
                }
            }
        }
    }*/
  //REDWOOD_CHANGES
    if (selectNodes(xmlDoc,"//SCREEN[@NAME = '" + screenName + "']/TAB").length > 0) 
        strCurrentTabID = selectSingleNode(xmlDoc,"//SCREEN[@NAME = '" + screenName + "']/TAB/PAGE").getAttribute("ID");
    else 
        strCurrentTabID = 'All';
    if (selectSingleNode(xmlDoc,"//SCREEN[@NAME = '" + screenName + "']").getAttribute("POSITION") == 'template') {
        var tabNodes = selectNodes(xmlDoc,"//SCREEN[@NAME = '" + screenName + "']/TAB/PAGE[@ID != 'All']");
        if (tabNodes.length > 0) {
           setTimeout(function(){//REDWOOD_35944380
			   		   expandcontent("TBLPage" + strCurrentTabID, document.getElementById(strCurrentTabID));
		   },0);//REDWOOD_35944380

        }
    }
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (gscrPos == "template") {
            document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_CANCEL");
        } else {
            document.getElementById("BTN_EXIT_IMG").src = "";//Data Uri change
        }
    }
    if (gAction == "MODIFY" ||  gAction == "CONFIRM_QRY"||  gAction == "LIQUIDATE_QRY") { //Fix for 17448246
        if (screenType == 'O') {
        } else {
            if(onceAuthObj){
                if(onceAuthObj.value == 'Y'){
                    fnEnableAmendFields();
                } else {
                    enableForm();
                }
            }
        }
        if (document.getElementsByName("BTN_OK").length > 0) {
            document.getElementsByName("BTN_OK")[0].disabled = false;
        }
        fnEnableChkAll();
    }
    if (document.getElementById("BTN_EXIT_IMG")) 
        document.getElementById("BTN_EXIT_IMG").disabled = false;

    if (gAction == '' || gAction == 'EXECUTEQUERY') {
        fnDisableMultipleAddDel();
        viewModeAction = true;
        disableAllElements("INPUT");
        viewModeAction = false;
      //  fnEnableElement(document.getElementById("BTN_EXIT_IMG"));	//REDWOOD_CHANGES
    }										  
//REDWOOD_CHANGES
   // fnEnableBlockCheckBox(); sudipta
   // document.getElementById("BTN_EXIT_IMG").focus();   
  //  parent.mask();  
//REDWOOD_CHANGES
    //Performance Changes Starts
    /*if(gAction== "AUTHQUERY"){
    fnpostAction(gAction);
    }*/
    //Performance Changes Ends
}

function fnShowSubScreen(screenArgs){
   // mask();//changes for 22755419	//REDWOOD_CHANGES
    //if (!mainWin.isSessionActive()) return;  //Fix for 14798046 session expiry change  
	var txnBranch=g_txnBranch;
    debugs("Opening Subscreen", "");
    var langCode = mainWin.LangCode;

    try {
        //eval ("fnPreLoad_"+screenArgs['SCREEN_NAME']+"(event)");
        var fnEval = new Function("event","fnPreLoad_"+screenArgs['SCREEN_NAME']+"(event)");  
        fnEval();
    } catch (e) {}

    if (!screenArgs['SCREEN_NAME']){
        alert(mainWin.getItemDesc("LBL_SCREEN_NAME"));
        return false;
    }
    if (screenArgs['SCREEN_NAME'] == 'CVS_AUTHORIZE'){
        dlgArgs.mainWin = dlgArg.mainWin; // Main Window
        dlgArgs.parentWin = window; // Current Window
    }

    if (!screenArgs['FUNCTION_ID']){
        alert(mainWin.getItemDesc("LBL_FUNCTIONID"));
        return false;
    }
    var params = "scr=" + screenArgs['SCREEN_NAME'] + "&";
    params    += "functionid=" + screenArgs['FUNCTION_ID'] + "&";
    params    += "parentFunc=" + functionId + "&";
    params += "inTime=" + screenArgs['INTIME'] + "&";//Performance Changes
    params    += "lang=" + screenArgs['LANG'] + "&";
    params    += "description=" + screenArgs['DESCRIPTION'] + "&";
    params    += "gAction=" + gAction + "&";
    params    += "uixml=" + screenArgs['UI_XML'] + "&";
    params    += "txnBranch=" + txnBranch + "&";
    params    += "callFormLaunched=yes&";
    params    += "fromCallform=no";   
    if (getXMLString(loadXMLFile(xmlFileName)) == "" || getXMLString(loadXMLFile(xmlFileName)).indexOf("404 Not Found") != -1) {
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR"));
        unmaskTitle = false;
    } else {
        loadSubScreenDIV("ChildWin", "LaunchSubScreen.jsp?"+params);
    }

}
function loadSubScreenDIV(divId, src) {
    src = mainWin.addIframeReqParam(src); //session expiry change  
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    src = encodeURI(src);
    var customWin       = document.createElement("div");
    customWin.id        = divId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe class="frames" id="ifrSubScreen" title="" src="'+src+'" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display="block";
    var winObj = document.getElementById(divId);
    winObj.style.visibility="visible";
    winObj.style.display="block";
}

function fnSaveSubScreenData(){
    fnSaveSubScreen();
    parent.fnCloseSubScreen();
    parent.fnExitSubScreenData(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherLeft, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth);
}
function fnSaveSubScreen(){
    debugs("Saving subscreen data", "");
    var newWinParams = new Object();
    //fix for 17793729 base bug - 16022801 starts
    //mainWin.showToolbar(functionId, '', '');
    //fix for 17793729 base bug - 16022801 ends
    if (appndFlg){
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
    }
    newWinParams.dbDataDOM = dbDataDOM;
    newWinParams.dbIndexArray = dbIndexArray;
    if(dbDataDOM != null)
        dbDOMAfter = getXMLString(dbDataDOM); 
    if(parent.dbDOMBefore != null)
        dbDOMBefore = getXMLString(parent.dbDOMBefore); 
    if(parent.isSubSys == true && typeof(parent.isSubSys) != 'undefined'){
        if (dbDOMAfter != dbDOMBefore){
            changedflg = true;        
        }else{
            changedflg = false;
        }
        parent.fnSetDependentSubSystem(parent.subSysFunIDMap, changedflg);
        parent.fnPostShowSubSystem();
        parent.isSubSys = false;
    }
    parent.screenArgs['RETURN_VALUE'] = newWinParams;
    appndFlg = true;
}
//REDWOOD_CHANGES
function fnCloseSubScreen (e) {
debugger;
if (screenArgs['SCREEN_NAME'] == "CVS_ADVANCED") {
        fnPostClose_CVS_ADVANCED(screenArgs, e);
        return;
    }	
//REDWOOD_CHANGES
    if (screenArgs['RETURN_VALUE']) {
         dbDataDOM = loadXMLDoc(getXMLString(screenArgs['RETURN_VALUE'].dbDataDOM));
    }
}
 //REDWOOD_CHANGES
function fnPostClose_CVS_ADVANCED(screenArgs, e) {
    whereClause_adv = screenArgs['RETURN_VALUE'].advWhereClause;
    queryName_adv = screenArgs['RETURN_VALUE'].advQueryName;
    orderByClause_adv = screenArgs['RETURN_VALUE'].advOrderByClause;
    advValueClause = screenArgs['RETURN_VALUE'].advValueClause;
    advOperationClause = screenArgs['RETURN_VALUE'].advOperationClause;
    advOrderOptClause = screenArgs['RETURN_VALUE'].advOrderOptClause;
    strCurrentTabID = 'idAdvanced';
    fnExecuteQuery_sum('A', e);
}
 //REDWOOD_CHANGES
function fnExitSubScreen(event) {
    //fix for 17793729 base bug - 16022801 starts
    //mainWin.showToolbar(functionId, '', '');
    //fix for 17793729 base bug - 16022801 ends
    /*Commented as part of fix for 19283108
	var event = window.event || event;
    var srcElement = getEventSourceElement(event);*/
    
    //if(!srcElement.disabled) { /*Commented as part of fix for 19283108*/
        parent.fnExitSubScreenData(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherLeft, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth);
    //} /*Commented as part of fix for 19283108*/
}

function fnExitSubScreenData(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherLeft, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth) {
/* TO SET BACK THE SIZE OF THE PARENT SCREEN WHEN THE SUBSCREEN OR CALLFORM IS CLOSED OR EXITED. */
    parent.document.getElementById(parentScrID).style.width = launcherDIVWidth;
    parent.document.getElementById(parentScrID).children[0].style.width = launcherIFWidth;
    parent.document.getElementById(parentScrID).style.height = launcherDIVHeight;
    parent.document.getElementById(parentScrID).children[0].style.height = launcherIFHeight;
    parent.document.getElementById(parentScrID).style.left = launcherLeft;
    document.getElementById("DIVScrContainer").style.width = launcherResTreeWidth;
    document.getElementById("DIVScrContainer").style.height = launcherResTreeHeight;
    document.getElementById("DIVWNDContainer").style.width = launcherHeaderWidth;

    if(getBrowser().indexOf("OPERA") != -1)//ie11 changes
        setOuterHTML(document.getElementById("ChildWin"), "");
    else{
        var childDivObj = document.getElementById("ChildWin");
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        document.getElementById("Div_ChildWin").removeChild(childDivObj); 
    }
    unmask(true);
    if (typeof(forOnlineAuth) != "undefined" && forOnlineAuth) {
        forOnlineAuth = false;
        try{
            fnPostAuthorize();
        } catch(e){
            debugs("Failed in fnPostAuthorize", "");
            return;
        }
        gAction = "";
        fnSetExitButton(false);
        
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        //mainWin.showToolbar(l_FncId, '', '');
        if(launchMsgScreen)
            fnShowMsgDetails();
    }
    if (typeof(forMaintAuth) != "undefined" && forMaintAuth) {
         forMaintAuth = false;
        try {
            fnPostAuthorize();
        } catch(e) {
            debugs("Failed in fnPostAuthorize", "");
            return;
        }
        fnSetExitButton(false);
        
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        //mainWin.showToolbar(l_FncId, '', '');
    }
    if (typeof(forLiquidate) != "undefined" && forLiquidate) {
        forLiquidate = false;
        try {
            fnPostLiquidate();
        } catch(e)
        {}
    }
    try{
        document.getElementById("BTN_EXIT_IMG").focus();
    }catch(e){
        document.getElementById("BTN_EXIT").focus();
    }
}

function fnMESV_TMP(blockID, disableFlag, resetFlag){
    var arrEle = new Array("INPUT", "SELECT", "TEXTAREA");
    for (var l_cnt = 0; l_cnt < arrEle.length; l_cnt++){
        var elements = document.getElementsByTagName(arrEle[l_cnt]);
        for (var cnt = 0; cnt < elements.length; cnt++){
            // Fix for INTERNAL_12.0.2_16792152 - start
            //if (elements[cnt].MEBLOCKID == blockID){
			if (elements[cnt].getAttribute("MEBLOCKID") == blockID){
			// Fix for INTERNAL_12.0.2_16792152 - end
                currElement = elements[cnt];
                if (resetFlag){
                    resetElement(currElement);
                }
                if (disableFlag == true || currElement.READONLY1){
                    if (arrEle[l_cnt] == "SELECT"){
                        currElement.disabled = true;
                    } else{
                        if (currElement.type.toUpperCase() == "CHECKBOX" || currElement.type.toUpperCase() == "RADIO"){
                            currElement.disabled = true;
                        } else{
                            currElement.readOnly = true;
                            currElement.className = "TextReadonly";
                            if (getNextSibling(currElement) && getNextSibling(currElement).tagName && getNextSibling(currElement).tagName == "BUTTON") getNextSibling(currElement).disabled = false;
                            fnEnableElement(currElement);

                        }
                    }

                } else if (disableFlag == false){
                    if (arrEle[l_cnt] == "SELECT"){
                        currElement.disabled = false;
                    } else{
                        if (currElement.type.toUpperCase() == "CHECKBOX" || currElement.type.toUpperCase() == "RADIO"){
                            currElement.disabled = false;
                        } else{
                            fnEnableElement(currElement);
                        }
                    }
                    
                }
            }
        }
    }
}

function disableAllBlockElements(blockID, disableFlag, resetFlag) {
        fnMESV_TMP(blockID, disableFlag, resetFlag);
}

function disableBlockElements(blockRef, typeOfField, disableFlag, resetFlag){
    var elements = blockRef.getElementsByTagName(typeOfField);
    var currElement = null;
    for (var iElementIndex = 0; iElementIndex < elements.length; iElementIndex++){
        currElement = elements[iElementIndex];
        if (resetFlag){
            resetElement(currElement);
        }
        if (disableFlag == true || currElement.getAttribute("READONLY1") == "true"){
            if (typeOfField == 'SELECT'){
                currElement.disabled = true;
            } else{
                if (currElement.type.toUpperCase() == "CHECKBOX" || currElement.type.toUpperCase() == "RADIO"){
                    currElement.disabled = true;
                } else{
                    currElement.readOnly = true;
                    currElement.className = "TextReadonly";
					fnDisableElement(currElement);//9NT1606_12_2_RETRO_12_0_1_23654899 changes 
                }
            }
        } else if (disableFlag == false){
            if (arrEle[l_cnt] == "SELECT"){
                currElement.disabled = false;
            } else{
                if (currElement.type.toUpperCase() == "CHECKBOX" || currElement.type.toUpperCase() == "RADIO"){
                    currElement.disabled = false;
                } else{
                    fnEnableElement(currElement);
                }
            }
        }
    }
}

function resetAllBlockElements(blockID){
    var blockRef = document.getElementById(blockID);
    if (blockRef){
        resetBlockElements(blockRef, "INPUT");
        resetBlockElements(blockRef, "SELECT");
        resetBlockElements(blockRef, "TEXTAREA");
    }
}

function resetBlockElements(blockRef, fieldType){
    var elements = blockRef.getElementsByTagName(fieldType);
    var currElement = null;
    for (var iElementIndex = 0; iElementIndex < elements.length; iElementIndex++){
        currElement = elements[iElementIndex];
        resetElement(currElement);
    }
}

function resetElement(currElement){
    var tmpElem = currElement;
    if (!tmpElem) return;
    if (tmpElem.tagName.toUpperCase() == 'INPUT'){
        if (tmpElem.type.toUpperCase() == 'TEXT' || tmpElem.type.toUpperCase() == 'HIDDEN' || tmpElem.type.toUpperCase() == 'PASSWORD'){
            if (tmpElem.getAttribute("DEFAULT") != null) 
                tmpElem.value = tmpElem.getAttribute("DEFAULT");
            else tmpElem.value = "";
        }
        if (tmpElem.type.toUpperCase() == 'CHECKBOX'){
            if (tmpElem.getAttribute("DEFAULT") == 'yes') 
                tmpElem.checked = true;
            else tmpElem.checked = false;
        }
        if (tmpElem.type.toUpperCase() == 'RADIO'){
            var elemName = tmpElem.name;
            if (elemName){
                var radioElem = document.getElementsByName(elemName);
                if (radioElem.length > 0){
                    for (var elemCnt = 0; elemCnt < radioElem.length; elemCnt++){
                        if (radioElem[elemCnt].getAttribute("DEFAULT") == 'yes'){
                            radioElem[elemCnt].checked = true;
                            break;
                        }
                    }
                } else{
                    radioElem.checked = false;
                }
            } else{
                tmpElem.checked = false;
            }
        }
    }

    if (tmpElem.tagName.toUpperCase() == 'SELECT'){
        var selOptions = tmpElem.options;
        var anySelected = false;
        for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++){
            if (selOptions[optnCnt].getAttribute("DEFAULT") == null || selOptions[optnCnt].getAttribute("DEFAULT") == ""){
                anySelected = true;
                tmpElem.value = selOptions[optnCnt].getAttribute("DEFAULT");
            }
        }
        if (!anySelected)
        //if(anySelected==null && selOptions.length!=0)
        tmpElem.value = selOptions[0].value;
    }
    if (tmpElem.tagName.toUpperCase() == 'TEXTAREA'){
        if (tmpElem.getAttribute("DEFAULT") != null) 
            tmpElem.value = tmpElem.getAttribute("DEFAULT");
        else tmpElem.value = "";
    }
}

function ShowHelpXML(xmlFile, scrnName, xslName){
    var xmlDoc = loadXMLFile(xmlFile);
    var xslDoc = loadXSLFile(xslName);
    var params = new Array();
    params["screen"] =  scrnName;
    var html = transform(xmlDoc, xslDoc, params);
    return html;
}

function changeTabPageContent(elem){
    var tabTR = document.getElementById("TRTab");
    var tabTDs = tabTR.getElementsByTagName("TD");
    var numTabs = tabTDs.length - 1;
    for (var idx = 0; idx < numTabs; idx++){
        tabTDs[idx].className = "TDTab";
        document.getElementById("TBLPage" + tabTDs[idx].id).style.display = "none";
    }

    elem.className = "TDTabSelected";
    var selectedPage = document.getElementById("TBLPage" + elem.id);
    selectedPage.style.display = "";
    setFocus(selectedPage);
}

function focusChange(elem){
    var tabTR = document.getElementById("TRTab");
    var tabTDs = tabTR.getElementsByTagName("TD");
    var numTabs = tabTDs.length - 1;
    for (var idx = 0; idx < numTabs; idx++){
        tabTDs[idx].className = "TDTab";
        document.getElementById("TBLPage" + tabTDs[idx].id).style.display = "none";
    }
    elem.className = "TDTabSelected";
    var selectedPage = document.getElementById("TBLPage" + elem.id);
    selectedPage.style.display = "";
    setFocus(selectedPage);
}

function drillDown(funcId, drillAttri){
    this.funcId = funcId;
    this.drillAttri = drillAttri.toUpperCase();
    this.showTargetFuncId = dispTargetFuncId;
}

function dispTargetFuncId(srcValue){
    var arrFldVals = new Array();
    var fldVals = new Array();
    var srcDBC = new Array();
    var srcDBT = new Array();
    var tgtDBC = new Array();
    var tgtDBT = new Array();
    var drillDownQry;
    var numFlds = string_parser(this.drillAttri, '!', arrFldVals);
    for (var arrIndex = 0; arrIndex < numFlds; arrIndex++){
        string_parser(arrFldVals[arrIndex], '~', fldVals);
        if (fldVals.length == 4){
            srcDBC[arrIndex] = fldVals[0];
            srcDBT[arrIndex] = fldVals[1];
            tgtDBC[arrIndex] = fldVals[2];
            tgtDBT[arrIndex] = fldVals[3];
        } else{
            alert(mainWin.getItemDesc("LBL_DRILDOWN_METADATA"));
        }
    }
    drillDownQry = getQueryDrillCriteria(srcDBC, srcDBT, tgtDBC, tgtDBT, numFlds, srcValue);
    mainWin.dispHref(this.funcId, '', drillDownQry);
}

function getQueryDrillCriteria(srcDBC, srcDBT, tgtDBC, tgtDBT, numFlds, srcValue){
    var qFldVal = "";
    var qryDrillCriteria = "";
    var arrTbl = new Array();
    var srcTblRowRef;
    var srcTblCelRef;
    var rowLen;
    var srcDBCColIndex;
    var arrTemp = new Array();
    var arrTempLen;
    var index = 0;
    for (var arrCnt = 0; arrCnt < numFlds; arrCnt++){
        if (arrTbl[tgtDBT[arrCnt]] == null){
            arrTbl[index++] = tgtDBT[arrCnt];
            arrTbl[tgtDBT[arrCnt]] = "";
        }
    }
    for (var arrCnt = 0; arrCnt < numFlds; arrCnt++){
        if (getEventSourceElement(event).parentNode.tagName != "TH"){
            if (srcValue == null){
                qFldVal = document.getElementById(srcDBT[arrCnt] + "__" + srcDBC[arrCnt]).value;
            } else{
                qFldVal = srcValue;
            }
            if (qFldVal != ""){
                if (arrTbl[tgtDBT[arrCnt]] == ""){
                    arrTbl[tgtDBT[arrCnt]] = tgtDBC[arrCnt] + gcQueryTokenDelim + gEncodeQuery(qFldVal);
                } else{
                    arrTbl[tgtDBT[arrCnt]] = arrTbl[tgtDBT[arrCnt]] + gcQueryColDelim + tgtDBC[arrCnt] + gcQueryTokenDelim + gEncodeQuery(qFldVal);
                }
            }
            if (srcValue != null){
                break;
            }
        } else{
            srcTblRowRef = document.getElementById("BLK_" + srcDBT[arrCnt]).rows;
            if (srcTblRowRef.length > 1){
                srcTblCelRef = srcTblRowRef[1].cells;
                for (var cellIndex = 1; cellIndex < srcTblCelRef.length; cellIndex++){
                    if (srcTblCelRef[cellIndex].getElementsByTagName("INPUT")[0].getAttribute("DBC") == srcDBC[arrCnt]){
                        srcDBCColIndex = cellIndex;
                        break;
                    }
                }
                if (arrTbl[tgtDBT[arrCnt]] == ""){
                    for (var rowIndex = 1; rowIndex < srcTblRowRef.length; rowIndex++){
                        qFldVal = srcTblRowRef[rowIndex].cells[srcDBCColIndex].getElementsByTagName("INPUT")[0].value
                        if (qFldVal != ""){
                            arrTbl[tgtDBT[arrCnt]] = arrTbl[tgtDBT[arrCnt]] + tgtDBC[arrCnt] + gcQueryTokenDelim + gEncodeQuery(qFldVal);
                            if (rowIndex < (srcTblRowRef.length - 1)) arrTbl[tgtDBT[arrCnt]] = arrTbl[tgtDBT[arrCnt]] + gcQueryRowDelim;
                        }
                    }
                } else{
                    arrTempLen = string_parser(arrTbl[tgtDBT[arrCnt]], gcQueryRowDelim, arrTemp);
                    arrTbl[tgtDBT[arrCnt]] = "";
                    for (var tempArrCnt = 1; tempArrCnt <= arrTempLen; tempArrCnt++){
                        qFldVal = srcTblRowRef[tempArrCnt].cells[srcDBCColIndex].getElementsByTagName("INPUT")[0].value
                        if (qFldVal != ""){
                            arrTemp[tempArrCnt - 1] = arrTemp[tempArrCnt - 1] + gcQueryColDelim + tgtDBC[arrCnt] + gcQueryTokenDelim + gEncodeQuery(qFldVal);
                            arrTbl[tgtDBT[arrCnt]] = arrTbl[tgtDBT[arrCnt]] + arrTemp[tempArrCnt - 1];
                            if ((tempArrCnt - 1) < arrTempLen) arrTbl[tgtDBT[arrCnt]] = arrTbl[tgtDBT[arrCnt]] + gcQueryRowDelim;
                        }
                    }
                }
            }
        }
    }
    qryDrillCriteria = fnGetDrillDownQuery(arrTbl, tgtDBT);
    return qryDrillCriteria;
}

function fnGetDrillDownQuery(arrTbl, tgtDBT){
    var auditQuery = "RECORD_STAT:O~ONCE_AUTH:Y";
    try{
        var tblDOM = new ActiveXObject("MSXML2.DOMDocument.6.0");
    } catch(e){
        var tblDOM = new ActiveXObject("MSXML2.DOMDocument.4.0");
    }
    var tblNode;
    var tblRef;
    for (var arrTblCnt = 0; arrTblCnt < arrTbl.length; arrTblCnt++){
        arrTemp = new Array();
        arrTempLen = string_parser(arrTbl[tgtDBT[arrTblCnt]], gcQueryRowDelim, arrTemp);
        arrTbl[tgtDBT[arrTblCnt]] = "";
        for (var tempArrCnt = 0; tempArrCnt < arrTempLen; tempArrCnt++){
            arrTemp[tempArrCnt] = arrTemp[tempArrCnt] + gcQueryColDelim + auditQuery;
            arrTbl[tgtDBT[arrTblCnt]] = arrTbl[tgtDBT[arrTblCnt]] + arrTemp[tempArrCnt];
            if (tempArrCnt < (arrTempLen - 1)) arrTbl[tgtDBT[arrTblCnt]] = arrTbl[tgtDBT[arrTblCnt]] + gcQueryRowDelim;
        }
        tblNode = tblDOM.createElement("TABLE");
        tblNode.setAttribute("ID", tgtDBT[arrTblCnt]);
        tblDOM.appendChild(tblNode);
        tblRef = selectSingleNode(tblDOM,"TABLE[@ID ='" + arrTbl[arrTblCnt] + "']");
        setNodeText(tblRef,arrTbl[arrTbl[arrTblCnt]]);
    }
    return getXMLString(tblDOM);
}

function fnShowSingleViewForME(blockId) {
   // var tableObject = document.getElementById(blockId);  //REDWOOD_CHANGES
    var tableObject =getTableObjForBlock(blockId); ////REDWOOD_CHANGES
    var l_strTheme = mainWin.strTheme;
    if (gscrPos == 'template') {
        l_strTheme = strTheme.substring(0, strTheme.indexOf('.css'));
    }
    var fnId = "";
    var xmlDOM = loadXMLDoc(mainWin.getXmlMenu());
    var uiNameNode;
    if (typeof(screenArgs) != "undefined") {
        uiNameNode = selectSingleNode(xmlDOM,"//*[@FNID = '" + screenArgs['FUNCTION_ID'] + "']")
    } else {
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + mainWin.document.getElementById("fastpath").value + "']")
    }
    var uiName = "";
    if (uiNameNode) {
        for (var i = 0; i < uiNameNode.attributes.length; i++) {
            if (uiNameNode.attributes[i].nodeName == "UINAME") {
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    if (uiNameNode && uiName != "" && uiName != "null") { //since the value of uiName will comeas "null"(String) in menu xml
        fnId = uiName;
    } else {
        fnId = functionId;
    }
    if (tableObject) {
        if (tableObject.tBodies[0].rows.length > 0) {
            var params = "functionId=" + fnId + "&";
            params += "gscrPos=" + gscrPos + "&";
            params += "l_strTheme=" + l_strTheme + "&";
            params += "blockId=" + blockId + "&";
            params += "title=" + tableObject.summary +' '+ mainWin.getItemDesc("LBL_SINGLE_REC_VIEW_TITLE") + "&";
            params += "ExitLabel=" + mainWin.getItemDesc("LBL_EXIT") + "&";
            params += "OkLabel=" + mainWin.getItemDesc("LBL_OK") + "&";

         if(mainWin.txnBranch[g_txnBranch]){
                //params += "&txnBranchUC=" + txnBranchUC;
                params += "&g_txnBranch=" + g_txnBranch;
        }
        mask();
        loadSubScreenDIV("ChildWin", "LaunchSingleViewScreen.jsp?" + params);
        }
    }
}

function fnToggleAllOrNoneME(tableObjectId, chkObject){
    var rows = null;
    var currRow = null
    var currElement = null;
    var tableObject = document.getElementById(tableObjectId);
    if (tableObject){
        rows = tableObject.tBodies[0].rows;
        if (rows.length == 0) chkObject.checked = false;
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++){
            currRow = rows[rowIndex];
            currElement = currRow.cells[0].getElementsByTagName("INPUT")[0];
            if (currElement){
                if (currElement.type.toUpperCase() == "CHECKBOX"){
                    if (chkObject.checked){
                        currElement.checked = true;
                        //fnHighlightOrDimCell(currRow, 'H');static header change
                    } else{
                        currElement.checked = false;
                        //fnHighlightOrDimCell(currRow, 'D');static header change
                    }
                }
            }
        }
    }
}

function fnProcessDD(name){
    if (event.keyCode == 115){
        var ddName = "DD_" + name;
        ddName.showTargetFuncId(event.srcElement.value);
    }
    event.cancelBubble = true;
}

function fnMulipleEntryRow_onClick(e){
    var e = window.event || e;
    var eventElem = getEventSourceElement(e);

    var objCurrTR;
    var objLastTR;
    var objTable;
    var SrcElement;
    var currentIndex;
    var isSelectedForDelete;

    srcElement = eventElem;
    objCurrTR = fnGetRef("TR", srcElement);
    objTable = fnGetRef("TABLE", srcElement);

    if (objCurrTR != null || objCurrTR != "null"){
        currentIndex = objCurrTR.rowIndex - 1;
    }

    if (gLastHighlightedRow == -1){
        gLastHighlightedRow = currentIndex;
        fnHighlightOrDimCell(objCurrTR, 'H');
    } else{
        if (objTable != null || objTable != "null"){
            objLastTR = objTable.tBodies[0].rows[gLastHighlightedRow];
        }
        if (objLastTR != null){
            isSelectedForDelete = objLastTR.cells[0].getElementsByTagName("INPUT")[0].checked;
        } else{
            isSelectedForDelete = true;
        }
        if (!isSelectedForDelete){
            fnHighlightOrDimCell(objLastTR, 'D');
        }
        fnHighlightOrDimCell(objCurrTR, 'H');
        gLastHighlightedRow = currentIndex;
    }

}

function fnGetRef(tagName, objElemRef){
    while (objElemRef.tagName != tagName){
        objElemRef = objElemRef.parentNode;
    }
    return objElemRef;
}

function fnHighlightOrDimCell(objTR, mode){
   //Bug 16295605 Changes comments Starts
    /*var className = "";
    var objTD = objTR.cells;
    var TDCount = objTD.length;
    var elemType;
    if (mode == "H"){
        className = "TBODYTDMultipleHighlighted";
    } else if (mode == "D"){
        className = "TBODYTDMultiple";
    }
    for (cellIndex = 0; cellIndex < TDCount; cellIndex++){
        if (objTD[cellIndex].className != "DispNone" && objTD[cellIndex].className != "TBODYTDDispNone" && objTD[cellIndex].className != "TDnone"){
            objTD[cellIndex].className = className;
        }
    }*/
	//Bug 16295605 Changes comments Ends
}

function fnDlgArgs(){

    var dlgArgs = new Object();
    dlgArgs.openerDoc = document;
    dlgArgs.mainWin = dlgArg.mainWin;
    dlgArgs.parentWin = window;
    dlgArgs.dbDataDOM = dbDataDOM.cloneNode(true);
    dlgArgs.dbIndexArray = dbIndexArray;
    dlgArgs.gAction = gAction;
    dlgArgs.relationArray = relationArray;

    return dlgArgs;
}

function getOtherScreenArgs(functionId, screenName){

    var xmlPath = mainWin.UIXmlPath + "/" + mainWin.LangCode;
    var fullPath = xmlPath + "/" + functionId + ".xml";
    var uiXMLDOM = loadXMLFile(fullPath);
    var uiXML = getXMLString(uiXMLDOM);
    xpath = selectNodes(uiXMLDOM,"//FORM/SCREEN[@NAME='" + screenName + "']/@TITLE");

    var screenArgs = new Array();
    var userLanguageCode = mainWin.LangCode;
    screenArgs['FUNCTION_ID'] = functionId;
    screenArgs['UI_XML'] = uiXML;
    screenArgs['LANG'] = userLanguageCode;
    screenArgs['SCREEN_NAME'] = screenName;

    if (xpath[0]){
        screenArgs['DESCRIPTION'] = getNodeText(xpath[0]);
    } else{
        screenArgs['DESCRIPTION'] = "";
    }

    return screenArgs;
}

function fnGetSubScrDlgArgs(){

    var dlgArgs = new Object();
    dlgArgs.openerDoc = document;
    dlgArgs.mainWin = dlgArg.mainWin;
    try{
        var newDbDataDOM = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e){
        var newDbDataDOM = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    newDbDataDOM.loadXML(getXMLString(dbDataDOM));
    dlgArgs.dbDataDOM = newDbDataDOM;
    dlgArgs.dbIndexArray = dbIndexArray;
    dlgArgs.gAction = gAction;
    dlgArgs.relationArray = relationArray;
    dlgArgs.dataSrcLocationArray = dataSrcLocationArray;

    return dlgArgs;
}

function fnShowAsSubScreen(functionId, screenName){
    var txnBranch=g_txnBranch;
    var dlgArgs = fnDlgArgs();
    //dlgArgs.txnBranchArray = mainWin.txnBranch[g_txnBranch];
    screenArgs = getOtherScreenArgs(functionId, screenName);
    var langCode = dlgArg.mainWin.frames["Global"].LangCode;
    if (!screenArgs['SCREEN_NAME']){
        alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_SCREEN_NAME"));
        return false;
    }

    if (!screenArgs['FUNCTION_ID']){
        alert(dlgArg.mainWin.frames["Global"].getItemDesc("LBL_FUNCTIONID"));
        return false;
    }

    var xmlPath = dlgArg.mainWin.frames["Global"].UIXmlPath + "/" + dlgArg.mainWin.frames["Global"].LangCode;
    var newWinRetVal    = window.showModalDialog(encodeURI("LaunchSubScreen.jsp?scr="+screenArgs['SCREEN_NAME']+"&functionid="+screenArgs['FUNCTION_ID']+"&parentFunc="+functionId+"&lang="+screenArgs['LANG']+"&description="+ screenArgs['DESCRIPTION']+ "&txnBranch=" + txnBranch),dlgArgs,"help:no; resizable:yes; dialogTop=85px; dialogLeft=253px; scroll:no; status:no");

    if (newWinRetVal){

        dbDataDOM = newWinRetVal.dbDataDOM;
        dbIndexArray = newWinRetVal.dbIndexArray;
        disableSubSystemElement()

    }
}

function fnSetFocusOnMasterPKField() {
    if (pkFields && pkFields.length > 0) {
        var l_SortedPkFlds = fnGetPkFieldOrderby_TabIdx();
        for (var l_PkCount = 0; l_PkCount < l_SortedPkFlds.length; l_PkCount++) {
            var l_PkElement = document.getElementById(l_SortedPkFlds[l_PkCount]);
            var l_PkElement_Misc = document.getElementById(l_SortedPkFlds[l_PkCount] + "I");
            if (l_PkElement_Misc != null) 
                l_PkElement = l_PkElement_Misc;
            try {
                if (l_PkElement) {
                    if ((l_PkElement.className && l_PkElement.className.toUpperCase() == "HIDDEN") || l_PkElement.tagName.toUpperCase() == "HIDDEN" || getCurrentStyle(l_PkElement, "visibility").toUpperCase() == "HIDDEN" || l_PkElement.readOnly == true || l_PkElement.disabled == true) {
                        if ((l_PkCount == l_SortedPkFlds.length - 1) && (document.getElementById("BTN_EXIT"))) {
                            document.getElementById("BTN_EXIT_IMG").focus();
                        }
                        continue;
                    } else { if (l_PkElement.type.toUpperCase() != "RADIO") {
                            l_PkElement.focus();
                            return;
                        }
                        if (l_PkElement.type.toUpperCase() == "RADIO") {
                            fnEnableRadioField(l_PkElement);
                            return;
                        }
                    }
                }
            } catch(e) {}
        }
    } //if  
} //fnc 

// FCUBS 11 Key Board Focus On First Enabled Fied on lanuch of the Screen - Fix Starts 
function fnSetFocusOnFirstEnabledField(){
    var textFields = document.getElementsByTagName("input");
    try{  
        for (var fieldCount = 0; fieldCount < textFields.length; fieldCount++){
            var textField = textFields[fieldCount];            
              if(textField.type.toUpperCase() == "TEXT" && (!textField.readOnly)){
                  textField.focus();
                   return;
                }else
                   continue;
            }  
	}catch(e){}
}
// FCUBS 11 Key Board Focus On First Enabled Fied on lanuch of the Screen - Fix Ends 	

function fnEnableRadioField(v_PkElement) {
    var l_FldName = v_PkElement.name;
    var l_RDOFlds = document.getElementsByName(l_FldName);
    if (l_RDOFlds.length > 0) l_RDOFlds[0].focus();
}

function fnGetPkFieldOrderby_TabIdx() {
    var count = 0;
    var l_PkFieldSoretedArr = new Array();
    for (var l_Itr = 0; l_Itr < pkFields.length; l_Itr++) 
        l_PkFieldSoretedArr[l_Itr] = pkFields[l_Itr];

    for (var l_TabCnt = 0; l_TabCnt < l_PkFieldSoretedArr.length; l_TabCnt++) {
        var l_TbIdxTemp = document.getElementById(l_PkFieldSoretedArr[l_TabCnt]).tabIndex;
        if (isNaN(parseInt(l_TbIdxTemp)) || parseInt(l_TbIdxTemp) == 0) {
            return l_PkFieldSoretedArr;
        }
    }

    for (var l_Cnt = 0; l_Cnt < l_PkFieldSoretedArr.length; l_Cnt++) {
        var l_OuterPkField = document.getElementById(l_PkFieldSoretedArr[l_Cnt]);
        var l_TabIdxOuter = l_OuterPkField.tabIndex;
        for (Idx = 0; Idx < l_PkFieldSoretedArr.length; Idx++) {
            var l_InnerPkField = document.getElementById(l_PkFieldSoretedArr[Idx]);
            var l_TabIdxInner = l_InnerPkField.tabIndex;
            if (parseInt(l_TabIdxOuter) <= parseInt(l_TabIdxInner)) {
                var l_Temp = l_PkFieldSoretedArr[l_Cnt];
                l_PkFieldSoretedArr[l_Cnt] = l_PkFieldSoretedArr[Idx];
                l_PkFieldSoretedArr[Idx] = l_Temp;
                count++;
            }
        } //For Inner    
    } //for Outer         
    return l_PkFieldSoretedArr;
}

function fnEnablePKOnlyFields() {
    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++) {
        var CurrentPK = pkFields[loopIndex];
        var currObject = document.getElementById(CurrentPK);
        if (currObject && getCurrentStyle(currObject,"visibility").toUpperCase() == "HIDDEN") 
            continue; 
//REDWOOD_CHANGES
       // var type = currObject.type.toUpperCase(); OJET Changes
        var objType = currObject.getAttribute("type");
        var type = "";
        if (objType != undefined && objType != null) type = objType.toUpperCase();
//REDWOOD_CHANGES
        
        if (type == "HIDDEN") {
            currObject = document.getElementById(CurrentPK + "I");
            if (currObject != null) {
                fnEnableElement(document.getElementById(CurrentPK + "I"));
                document.getElementById(CurrentPK + "I").readOnly = false;
            } else 
                continue;
        } else {
            var l_FieldType = "";
            if (currObject) 
                l_FieldType = currObject.type;
            l_FldDataType = currObject.getAttribute("data_type");
            if (l_FldDataType && l_FldDataType.toUpperCase() == "DATE") {
                getNextSibling(document.getElementById(CurrentPK + "I")).disabled = false;
            }
            if (l_FieldType && l_FieldType.toUpperCase() == "RADIO") {
                var l_FieldName = "";
                l_FieldName = currObject.name
                var l_RdoFlds = document.getElementsByName(l_FieldName);
                for (var l_Cnt = 0; l_Cnt < l_RdoFlds.length; l_Cnt++) {
                    fnEnableElement(l_RdoFlds[l_Cnt]);
                    l_RdoFlds[l_Cnt].readOnly = false;
                } //for
            } //if Radio                
            if (mainWin.applicationName == "FCIS" && CurrentPK.indexOf("AUTH_STAT") != -1) {
                document.getElementById(CurrentPK).disabled = false;
            } else 
                fnEnableElement(document.getElementById(CurrentPK)); 
//REDWOOD_CHANGES
            if ((document.getElementById(CurrentPK).getAttribute("READONLY1")) && gAction == "ENTERQUERY") {
                //document.getElementById(CurrentPK).readOnly = false;
                document.getElementById(CurrentPK).setAttribute('readOnly', false); //OJET Migration
            }else {
               // document.getElementById(CurrentPK).readOnly = false;
                document.getElementById(CurrentPK).setAttribute('readOnly', false); //OJET Migration
//REDWOOD_CHANGES
            }
        }
    }
}

function fnEnableAmendFields() {
    if (amendArr.length > 0) {
        var chkElements = document.getElementsByName("chkDeleteRow");
        for (var elementIndex = 0; elementIndex < chkElements.length; elementIndex++) {
            fnEnableElement(chkElements[elementIndex]);
        }
        for (var fieldIndex = 0; fieldIndex < amendArr.length; fieldIndex++) {
            var elements = new Array();
            if (!isMEBlk("BLK_" + amendArr[fieldIndex].substring(0, amendArr[fieldIndex].lastIndexOf("__")))) {
                var fld = amendArr[fieldIndex].substring(amendArr[fieldIndex].lastIndexOf('__') + 2, amendArr[fieldIndex].length);
                elements = document.getElementsByName(fld);
            } else {
                if (document.getElementById("BLK_" + amendArr[fieldIndex].substring(0, amendArr[fieldIndex].lastIndexOf("__"))) != null) {
                    var fld = amendArr[fieldIndex].substring(amendArr[fieldIndex].lastIndexOf('__') + 2, amendArr[fieldIndex].length);
                    elements = document.getElementsByName(fld);
                } else 
                    continue;
            }
            if (elements.length == 0) {
                debugs("fnEnableAmendFields", "");
                var addRowButton = document.getElementById("cmdAddRow_BLK_" + amendArr[fieldIndex]);
                if (addRowButton) {
                    fnEnableElement(addRowButton);
                }
                var delRowButton = document.getElementById("cmdDelRow_BLK_" + amendArr[fieldIndex]);
                if (delRowButton) {
                    fnEnableElement(delRowButton);
                }
                var singleViewBtn = document.getElementById("BTN_SINGLE_VIEW_BLK_" + amendArr[fieldIndex]);
                if (singleViewBtn) {
                    fnEnableElement(singleViewBtn);
                }
            } else {
                for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
                    var l_TempElement = elements[elementIndex];
                    var l_Input_Lov = "";
                    try {
                        if (l_TempElement) {
                            l_Input_Lov = l_TempElement.getAttribute("INPUT_LOV");
                        }
                    } catch(e)
                    {}
                    if (l_Input_Lov == 'Y') {
                        if (getNextSibling(l_TempElement) && getNextSibling(l_TempElement).tagName && getNextSibling(l_TempElement).tagName == "OJ-BUTTON") {//REDWOOD_CHANGES
                            if (getNextSibling(l_TempElement).className == 'BtnViewMode') {
                               getNextSibling(l_TempElement).className = getNextSibling(l_TempElement).getAttribute("oldClassName");
                            }
                            getNextSibling(l_TempElement).disabled = false;
                        }
                        continue;
                    }
                    var l_Element_ToEnable = elements[elementIndex];
//REDWOOD_CHANGES
                   var l_ElementName ="";
                   try{
                        l_ElementName = l_Element_ToEnable.name;
                   }catch(e){
                        l_ElementName = l_Element_ToEnable.getAttribute("NAME");
                   }   
//REDWOOD_CHANGES
                    

                    try {
                        if(getOuterHTML(l_Element_ToEnable).indexOf("displayAmount")!= -1 || getOuterHTML(l_Element_ToEnable).indexOf("displayFormattedNumber")!= -1){
                            var l_NextSibling = getNextSibling(getNextSibling(l_Element_ToEnable));
                        }else{
                            var l_NextSibling = getNextSibling(l_Element_ToEnable);
                        }
                        var l_NextSiblingName = "";
                        if (l_NextSibling) {
                            l_NextSiblingName = l_NextSibling.name;
                        }

                        if (l_NextSiblingName == (l_ElementName + "I")) {
                            l_Element_ToEnable = l_NextSibling;
                        }
                    } catch(exception)
                    {}
                    fnEnableElement(l_Element_ToEnable);
                }

                var lovElements = document.getElementsByName("BTN_LOV_" + amendArr[fieldIndex]);
                if (lovElements.length > 0) {
                    for (var elementIndex = 0; elementIndex < lovElements.length; elementIndex++) {
                        fnEnableElement(lovElements[elementIndex]);
                    }
                }

                var popupElements = document.getElementsByName("BTN_POP_" + amendArr[fieldIndex]);
                if (popupElements.length > 0) {
                    for (var elementIndex = 0; elementIndex < popupElements.length; elementIndex++) {
                        fnEnableElement(popupElements[elementIndex]);
                    }
                }
            }
        }
    }
}

function isMEBlk(blkName) {
    for (var i = 0; i < multipleEntryIDs.length; i++) {
        if (blkName == multipleEntryIDs[i]) 
            return true;
    }
    return false;
}

function fnShowCallForm(screenArgs){
	//mask();//changes for 22755419 Sudipta	 //REDWOOD_CHANGES
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
	//if (!mainWin.isSessionActive()) return; //17344787 changes session expiry change  
    var txnBranch=g_txnBranch;
    var langCode = mainWin.LangCode;

    try {
        //eval ("fnPreLoad_"+screenArgs['SCREEN_NAME']+"(event)");
        var fnEval = new Function("event","fnPreLoad_"+screenArgs['SCREEN_NAME']+"(event)");  
        fnEval();
    } catch (e) {}

    var xmlDOM = loadXMLDoc(mainWin.getXmlMenu());
    var uiNameNode;
    uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + screenArgs['FUNCTION_ID'] + "']")
    var uiName = "";
    if (uiNameNode){
        for (var i = 0; i < uiNameNode.attributes.length; i++){
            if (uiNameNode.attributes[i].nodeName == "UINAME"){
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    
    if (uiNameNode && uiName != "" && uiName != "null"){ 
        xmlFileName = mainWin.UIXmlPath+ "/"+ langCode +"/" + uiName + ".xml";
        screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+ langCode +'/'+uiName+'.xml',screenArgs['SCREEN_NAME']);
    } else{
        xmlFileName = mainWin.UIXmlPath+ "/"+ langCode +"/" + screenArgs['FUNCTION_ID'] + ".xml";
        screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+ langCode +'/'+screenArgs['FUNCTION_ID']+'.xml',screenArgs['SCREEN_NAME']);
        uiName = screenArgs['FUNCTION_ID'];
    }
    if (!screenArgs['SCREEN_NAME']){
        alert(mainWin.getItemDesc("LBL_SCREEN_NAME"));
        return false;
    }

    if (!screenArgs['FUNCTION_ID']){
        alert(mainWin.getItemDesc("LBL_FUNCTIONID"));
        return false;
    }

    var params = "scr=" + screenArgs['SCREEN_NAME'] + "&";
    params    += "functionid=" + screenArgs['FUNCTION_ID'] + "&";
    params    += "parentFunc=" + functionId + "&";
    params    += "lang=" + screenArgs['LANG'] + "&";
    params    += "description=" + screenArgs['DESCRIPTION'] + "&";
    params    += "gAction=" + gAction + "&";
    params    += "uixml=" + uiName+"&";
    params    += "txnBranch=" + txnBranch + "&";
    params    += "callFormLaunched=yes&";
    params    += "fromCallform=yes";
    if (loadXMLFile(xmlFileName).xml != ""){

        loadSubScreenDIV("ChildWin", "LaunchSubScreen.jsp?"+params);
    } else{
        var xslProc;
        var xmlDoc;
        xmlDoc = loadXMLFile(xmlFileName);
        var myErr = xmlDoc.parseError;
        alert(mainWin.getItemDesc("LBL_XML_LOADING_ERR") + myErr.reason);

    }
}

function fnToUppercase(txtObj, e) {
    var event = window.event || e;
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39) {
        return;
    }				  
//REDWOOD_CHANGES
    var txtVal =  txtObj.rawValue; //OJET Migration
    if(txtVal==null){
        txtVal =  txtObj.getAttribute("value");
    }
    if(txtVal!=null)
    txtObj.value =txtVal.toUpperCase();	 
//REDWOOD_CHANGES
}

function readOnlyAllBlockElements(blockID, readOnlyFlag, resetFlag){
    var blockRef = document.getElementById(blockID);
    if (blockRef){
        readOnlyBlockElements(blockRef, "INPUT", readOnlyFlag, resetFlag);
        readOnlyBlockElements(blockRef, "SELECT", readOnlyFlag, resetFlag);
        readOnlyBlockElements(blockRef, "TEXTAREA", readOnlyFlag, resetFlag);
        readOnlyBlockElements(blockRef, "BUTTON", readOnlyFlag, resetFlag);
    }
}

function readOnlyBlockElements(blockRef, typeOfField, readOnlyFlag, resetFlag){
    var elements = blockRef.getElementsByTagName(typeOfField);
    var currElement = null;
    for (var iElementIndex = 0; iElementIndex < elements.length; iElementIndex++){
        currElement = elements[iElementIndex];
        if (resetFlag){
            resetElement(currElement);
        }
        if (readOnlyFlag == true){
            if (currElement.className != ''){
                if (currElement.className == 'ButtonLov' || currElement.className == 'SELECTList'){
                    currElement.disabled = true;
                }
            }
            currElement.readOnly = true;
        } else if (readOnlyFlag == false) currElement.readOnly = false;
    }
}

function disableSubSystemElement(){

    if (subsysArr.length > 0){
        for (var fieldIndex = 0; fieldIndex < subsysArr.length; fieldIndex++){
            var elements = document.getElementsByName(subsysArr[fieldIndex]);
            if (elements.length == 0){
                debugs("No Elements for subsystem ", "");
                var addRowButton = document.getElementById("cmdAddRow_BLK_" + subsysArr[fieldIndex]);
                if (addRowButton){
                    fnDisableElement(addRowButton);
                }
                var delRowButton = document.getElementById("cmdDelRow_BLK_" + subsysArr[fieldIndex]);
                if (delRowButton){
                    fnDisableElement(delRowButton);
                }
                var singleViewBtn = document.getElementById("BTN_SINGLE_VIEW_BLK_" + subsysArr[fieldIndex]);
                if (singleViewBtn){
                    fnDisableElement(singleViewBtn);
                }
            } else{
                for (var elementIndex = 0; elementIndex < elements.length; elementIndex++){
                    fnDisableElement(elements[elementIndex]);
                }
                var lovElements = document.getElementsByName("BTN_LOV_" + subsysArr[fieldIndex]);
                if (lovElements.length > 0){
                    for (var elementIndex = 0; elementIndex < lovElements.length; elementIndex++){
                        fnDisableElement(lovElements[elementIndex]);
                    }
                }
                var popupElements = document.getElementsByName("BTN_POP_" + subsysArr[fieldIndex]);
                if (popupElements.length > 0){
                    for (var elementIndex = 0; elementIndex < popupElements.length; elementIndex++){
                        fnDisableElement(popupElements[elementIndex]);
                    }
                }
            }
        }
    }
}

function enableMultipleElementsForUnlock(type){

    var elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++){
        var tmpElem = elements[loopIndex];
        if (tmpElem.type.toUpperCase() != 'HIDDEN'){
            if (tmpElem.className != null && (tmpElem.className == 'BtnAddRow' || tmpElem.className == 'BtnDelRow' || tmpElem.className == 'BtnSingleView')){
                fnEnableElement(tmpElem);
            }
        }
    }
}
function fnEnableBlockCheckBox(){
    var CurrentMultipleBlock;
    if (multipleEntryIDs.length > 0){
        for (var idIndex = 0; idIndex < multipleEntryIDs.length; idIndex++){
            CurrentMultipleBlock = document.getElementById(multipleEntryIDs[idIndex]);

            if (document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[idIndex])[0]){
                fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[idIndex])[0]);
            }

            if (CurrentMultipleBlock){
                var CurrentMultipleBlockHeader = getPreviousSibling(CurrentMultipleBlock.parentNode).children[0].children[0];
                fnEnableElement(CurrentMultipleBlockHeader.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0]);
                var tableSize = CurrentMultipleBlock.tBodies[0].rows.length;
                for (var rowIndex = 0; rowIndex < tableSize; rowIndex++){
                    var currentRow = CurrentMultipleBlock.tBodies[0].rows[rowIndex];
                    fnEnableElement(currentRow.cells[0].getElementsByTagName("INPUT")[0]);
                }
            }
        }
    }
}

function validateRestrictedTextValue(elem) {
var val = elem.rawValue;  //REDWOOD_CHANGES
    if (gAction == 'QUERY' || gAction == 'EXECUTEQUERY' || gAction == 'ENTERQUERY' || gAction == "") {
         if (/[^A-z|0-9|%]/.test(val)) {  //REDWOOD_CHANGES
            elem.value="";
            alert(mainWin.getItemDesc("LBL_SPECIAL_CHAR_NOT_ALLOWED"));
            elem.focus();
            return;
        }
    } else {
        if (/[^A-z|0-9]/.test(val)) { //REDWOOD_CHANGES
            elem.value="";
            alert(mainWin.getItemDesc("LBL_SPECIAL_CHAR_NOT_ALLOWED"));
            elem.focus();
            return;
        }
    }
}

function fnEnableRekeyFields(fcjRespDOM, rekeyDataSrc){

    var fnNode = selectSingleNode(fcjRespDOM,'//FLD/FN[@TYPE="' + rekeyDataSrc + '"]');
    if (!fnNode) return;
    var fvNode = selectSingleNode(fcjRespDOM,'//REC[@TYPE="' + rekeyDataSrc + '"]/FV');
    if (!fvNode) return;
    fnVal = getNodeText(fnNode);
    fvVal = getNodeText(fvNode);
    var fnList = new Array();
    var fvList = new Array();
    fnList = fnVal.split('~');
    fvList = fvVal.split('~');
    var i;
    for (i = 0; i < fvList.length; i++) if (fvList[i] == ""){
        fnEnableElement(document.getElementById(rekeyDataSrc + "__" + fnList[i]));
    }
}	  
//REDWOOD_CHANGES
function fnValidateRange(v_NumberFld,fldValue) {
//    if (getOuterHTML(v_NumberFld).indexOf("validateInputAmount") == -1 && getOuterHTML(v_NumberFld).indexOf("processAmount") == -1) {
//        if (v_NumberFld.value != "") v_NumberFld.value = Number(v_NumberFld.value);
//    }
    if (v_NumberFld.tagName == "OJ-CHECKBOX-SET" || v_NumberFld.tagName == "OJ-SWITCH") return;
    if (!v_NumberFld || v_NumberFld.value == '') return;
    var valueEntered = v_NumberFld.value;
    if(typeof(fldValue)!= 'undefined'){
         valueEntered = fldValue;
    }

    var maxVal = v_NumberFld.getAttribute("MAX_VAL");
    var minVal = v_NumberFld.getAttribute("MIN_VAL");
    if (!isNumericValidation(valueEntered) || (valueEntered.indexOf(" ") != -1 && gDigitGroupingSymbol != " " && gDecimalSymbol != " ")) {
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
        //v_NumberFld.value = "";
        v_NumberFld.focus();
        return;
    }
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');
    if (valueEntered.indexOf(gDecimalSymbol) == -1) {
        if (!isNaN(parseInt(minVal))) {
            if (parseInt(valueEntered) < parseInt(minVal)) {
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + " " + minVal);	 //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
                //v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseInt(valueEntered) > parseInt(maxVal)) {
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + " " + maxVal);  //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
                //v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
    } else {
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"))) {
                var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                alert(getMessage(lblMaxDecimal, v_NumberFld.getAttribute("MAX_DECIMALS") + "~"));
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
          //      v_NumberFld.value = "";
                v_NumberFld.focus();
            }
        }
        if (!isNaN(parseInt(minVal))) {
            if (parseFloat(valueEntered) < parseFloat(minVal)) {
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") + " " + minVal); //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
            //    v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseFloat(valueEntered) > parseFloat(maxVal)) {
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") + " " + maxVal);  //25173279 changes
                if(v_NumberFld.tagName == "OJ-INPUT-TEXT" ){
                    v_NumberFld.value = "";
                }
              //  v_NumberFld.value = "";
                v_NumberFld.focus();
                return;
            }
        }
    }
    return true;
}
function fnValidateRange_old(v_NumberFld){ 
//REDWOOD_CHANGES
    if (!v_NumberFld || v_NumberFld.value == '') return;
    var valueEntered = v_NumberFld.value;
    var maxVal = v_NumberFld.MAX_VAL;
    var minVal = v_NumberFld.MIN_VAL;
    if (!isNumericValidation(valueEntered) || (valueEntered.indexOf(" ") != -1 && gDigitGroupingSymbol != " " && gDecimalSymbol != " ")) {
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        v_NumberFld.value = "";
        return;
    }
    valueEntered = replaceAllChar(valueEntered, gDigitGroupingSymbol, '');
    if (valueEntered.indexOf(gDecimalSymbol) == -1){
        if (!isNaN(parseInt(minVal))){
            if (parseInt(valueEntered) < parseInt(minVal)){   focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") +" "+  minVal);
                v_NumberFld.value = "";
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))){
            if (parseInt(valueEntered) > parseInt(maxVal)){   focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") +" "+ maxVal );
                v_NumberFld.value = "";
                return;
            }
        }
    } else{
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(gDecimalSymbol) + 1).length;
        if (v_NumberFld.MAX_DECIMALS && !isNaN(parseInt(v_NumberFld.MAX_DECIMALS))){
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.MAX_DECIMALS)){   focusReqd = false;
                focusField = v_NumberFld;
                var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                alert(getMessage(lblMaxDecimal, v_NumberFld.MAX_DECIMALS + "~"));
                v_NumberFld.value = "";
                }
        }
        if (!isNaN(parseInt(minVal))){
            if (parseFloat(valueEntered) < parseFloat(minVal)){   focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") +" "+ minVal);
                v_NumberFld.value = "";
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))){
            if (parseFloat(valueEntered) > parseFloat(maxVal)){   focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") +" "+ maxVal);
                v_NumberFld.value = "";
                return;
            }
        }
    }
    return true;
}

function fnEnableChkAll(){
    setTimeout( function () { //REDWOOD_35282887
    for (var i = 0; i < multipleEntryIDs.length; i++){
        if (document.getElementById(multipleEntryIDs[i])){
            var tableRef = document.getElementById(multipleEntryIDs[i]);
            /*Bug No 16839056 Changes Start*/
             tableRef.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].disabled = false; //Bug#25089729 uncommented
            //tableRef.tHead.rows[1].cells[0].getElementsByTagName("INPUT")[0].disabled = false; //Bug#25089729 commented
            /*Bug No 16839056 Changes End*/
        }
    }
   },0); //REDWOOD_35282887
}

function fnValidateOnF8(e) {//changed starts
    var e = window.event || e;
    var eventElem = getEventSourceElement(e);

    var elem = eventElem;
    if (elem) {
        var elemName = elem.name;
        if (elemName) {
           if (getPreviousSibling(elem)) {
               if (getPreviousSibling(getPreviousSibling(elem))){
                  if (getPreviousSibling(getPreviousSibling(getPreviousSibling(elem)))){
                      if (getPreviousSibling(getPreviousSibling(getPreviousSibling(elem))).name) {
                         if (getPreviousSibling(getPreviousSibling(getPreviousSibling(elem))).name == elemName.substring(0, elemName.length - 1)) {
                             var hiddenElem = getPreviousSibling(elem);
                             if (elem.getAttribute("onblur")) {
                                //Fix for 20771102 starts
								//if (!fireHTMLEvent(elem, "onblur", e)) return false;
								fireHTMLEvent(elem, "onblur", e);
								if (!gIsValid) {
									return false;
								}
								//Fix for 20771102 ends
                             }
                          }
                       }
                   }
                }
             }
         }
        
        if (elem.blur) {
            //Fix for 20771102 starts
			/*if (!fireHTMLEvent(elem, "onblur", e)) 
                return false;*/
			fireHTMLEvent(elem, "onblur", e);
			if (!gIsValid) {
				return false;
			}
			//Fix for 20771102 ends
        }
    }//changed ends
    return true;
}

function replaceAllChar(str, searchChar, replaceChar){
    var retStr = "";
    for (var loopIndex = 0; loopIndex < str.length; loopIndex++){
        if (str.substr(loopIndex, 1) == searchChar) retStr += replaceChar;
        else retStr += str.substr(loopIndex, 1);
    }
    return retStr;
}

function isNumericValidation(AStr) {
    if (typeof(gSummaryOpened) != 'undefined' && gSummaryOpened) 
        inTheStr = "1234567890.-,%";
    else 
        inTheStr = "1234567890.-,";
    tempChar = "";

    if (getLength(trim(AStr)) <= 0) 
        return true;

    for (i = 0; i < AStr.length; i++){
        if (AStr.charAt(i) != 0){
            tempChar = AStr.charAt(i);
            if ((inTheStr.indexOf(tempChar)) < 0){
                return (false);
            }
        }
    }
    return (true);
}

function fnDisableAmendFields(){
    if (amendArr.length > 0){
        var chkElements = document.getElementsByName("chkDeleteRow");
        for (var elementIndex = 0; elementIndex < chkElements.length; elementIndex++){
            fnDisableElement(chkElements[elementIndex]);
        }
        for (var fieldIndex = 0; fieldIndex < amendArr.length; fieldIndex++){
            var elements = new Array();
            if (amendArr[fieldIndex].indexOf('__') != -1){
                var fld = amendArr[fieldIndex].substring(amendArr[fieldIndex].lastIndexOf('__') + 2, amendArr[fieldIndex].length);
                elements = document.getElementsByName(fld);
            } else elements = document.getElementsByName(amendArr[fieldIndex]); // For ME Block Field..                                
            if (elements.length == 0){
                debugs("No Elements for amend element ", "");
                var addRowButton = document.getElementById("cmdAddRow_BLK_" + amendArr[fieldIndex]);
                if (addRowButton){
                    fnDisableElement(addRowButton);
                }
                var delRowButton = document.getElementById("cmdDelRow_BLK_" + amendArr[fieldIndex]);
                if (delRowButton){
                    fnDisableElement(delRowButton);
                }
                var singleViewBtn = document.getElementById("BTN_SINGLE_VIEW_BLK_" + amendArr[fieldIndex]);
                if (singleViewBtn){
                    fnDisableElement(singleViewBtn);
                }
            } else{
                for (var elementIndex = 0; elementIndex < elements.length; elementIndex++){
                    var l_TempElement = elements[elementIndex];
                    var l_Input_Lov = "";
                    try{
                        if (l_TempElement){
                            l_Input_Lov = l_TempElement.INPUT_LOV;
                        }
                    } catch(e){}
                    if (l_Input_Lov == 'Y'){
                        if (getNextSibling(l_TempElement) && getNextSibling(l_TempElement).tagName && getNextSibling(l_TempElement).tagName == "BUTTON") getNextSibling(l_TempElement).disabled = true;
                        continue;
                    }
                    var l_Element_ToEnable = elements[elementIndex];
                    var l_ElementName = l_Element_ToEnable.name;
                    try{
                        var l_NextSibling = getNextSibling(l_Element_ToEnable);
                        var l_NextSiblingName = "";
                        if (l_NextSibling){
                            l_NextSiblingName = l_NextSibling.name;
                        }
                        if (l_NextSiblingName == (l_ElementName + "I")){
                            l_Element_ToEnable = l_NextSibling;

                        }
                    } catch(exception){}
                    fnDisableElement(l_Element_ToEnable);
                }
                var lovElements = document.getElementsByName("BTN_LOV_" + amendArr[fieldIndex]);
                if (lovElements.length > 0){
                    for (var elementIndex = 0; elementIndex < lovElements.length; elementIndex++){
                        fnDisableElement(lovElements[elementIndex]);
                    }
                }
                var popupElements = document.getElementsByName("BTN_POP_" + amendArr[fieldIndex]);
                if (popupElements.length > 0){
                    for (var elementIndex = 0; elementIndex < popupElements.length; elementIndex++){
                        fnDisableElement(popupElements[elementIndex]);
                    }
                }
            }
        }
    }
}

function fnEnableSubSystemFields(){
    if (subsysArr.length > 0){
        var chkElements = document.getElementsByName("chkDeleteRow");
        for (var elementIndex = 0; elementIndex < chkElements.length; elementIndex++){
            fnEnableElement(chkElements[elementIndex]);
        }
        for (var fieldIndex = 0; fieldIndex < subsysArr.length; fieldIndex++){
            var elements = new Array();
            if (subsysArr[fieldIndex].indexOf('__') != -1){
                var fld = subsysArr[fieldIndex].substring(subsysArr[fieldIndex].lastIndexOf('__') + 2, subsysArr[fieldIndex].length);
                elements = document.getElementsByName(fld);
            } else elements = document.getElementsByName(subsysArr[fieldIndex]);
            if (elements.length == 0){
                debugs("No Elements for amend element", "");
                //debug(dlgArg.mainWin, "A", "No Elements for amend element " +subsysArr[fieldIndex]);                                         
                var addRowButton = document.getElementById("cmdAddRow_BLK_" + subsysArr[fieldIndex]);
                if (addRowButton){
                    fnEnableElement(addRowButton);
                }
                var delRowButton = document.getElementById("cmdDelRow_BLK_" + subsysArr[fieldIndex]);
                if (delRowButton){
                    fnEnableElement(delRowButton);
                }
                var singleViewBtn = document.getElementById("BTN_SINGLE_VIEW_BLK_" + subsysArr[fieldIndex]);
                if (singleViewBtn){
                    fnEnableElement(singleViewBtn);
                }
            } else{
                for (var elementIndex = 0; elementIndex < elements.length; elementIndex++){
                    var l_TempElement = elements[elementIndex];
                    var l_Input_Lov = "";
                    try{
                        if (l_TempElement){
                            l_Input_Lov = l_TempElement.INPUT_LOV;
                        }
                    } catch(e){}
                    if (l_Input_Lov == 'Y'){
                        if (getNextSibling(l_TempElement) && getNextSibling(l_TempElement).tagName && getNextSibling(l_TempElement).tagName == "BUTTON") getNextSibling(l_TempElement).disabled = false;
                        continue;
                    }
                    var l_Element_ToEnable = elements[elementIndex];
                    var l_ElementName = l_Element_ToEnable.name;

                    try{
                        var l_NextSibling = getNextSibling(l_Element_ToEnable);
                        var l_NextSiblingName = "";
                        if (l_NextSibling){
                            l_NextSiblingName = l_NextSibling.name;
                        }

                        if (l_NextSiblingName == (l_ElementName + "I")){
                            l_Element_ToEnable = l_NextSibling;

                        }
                    } catch(exception){}
                    fnEnableElement(l_Element_ToEnable);
                }

                var lovElements = document.getElementsByName("BTN_LOV_" + subsysArr[fieldIndex]);
                if (lovElements.length > 0){
                    for (var elementIndex = 0; elementIndex < lovElements.length; elementIndex++){
                        fnEnableElement(lovElements[elementIndex]);
                    }
                }

                var popupElements = document.getElementsByName("BTN_POP_" + subsysArr[fieldIndex]);
                if (popupElements.length > 0){
                    for (var elementIndex = 0; elementIndex < popupElements.length; elementIndex++){
                        fnEnableElement(popupElements[elementIndex]);
                    }
                }
            }
        }
    }
}

function fnDisableMultipleAddDel(){
    if (dataSrcLocationArray.length > 0){
        for (var idIndex = 0; idIndex < dataSrcLocationArray.length; idIndex++){
            if (document.getElementsByName("cmdAddRow_BLK_" + dataSrcLocationArray[idIndex])[0]){
                document.getElementsByName("cmdAddRow_BLK_" + dataSrcLocationArray[idIndex])[0].disabled = true;
            }
            if (document.getElementsByName("cmdDelRow_BLK_" + dataSrcLocationArray[idIndex])[0]){
                document.getElementsByName("cmdDelRow_BLK_" + dataSrcLocationArray[idIndex])[0].disabled = true;
            }
            if (document.getElementsByName("BTN_ADD_BLK_" + dataSrcLocationArray[idIndex])[0]){
                document.getElementsByName("BTN_ADD_BLK_" + dataSrcLocationArray[idIndex])[0].disabled = true;
            }
            if (document.getElementsByName("BTN_REMOVE_BLK_" + dataSrcLocationArray[idIndex])[0]){
                document.getElementsByName("BTN_REMOVE_BLK_" + dataSrcLocationArray[idIndex])[0].disabled = true;
            }
        }
    }
}

function fnChangeClass(){
    if (multipleEntryIDs.length > 0){
        for (var idIndex = 0; idIndex < multipleEntryIDs.length; idIndex++){
            if (document.getElementById(multipleEntryIDs[idIndex])) enableRowElements(document.getElementById(multipleEntryIDs[idIndex]).tBodies[0]);
        }
    }
}

function fnDisableSubSysButtons() {
        fnDisableSubSysButtons_Tmp();
}

function fnEnableSubSysButtons(){
    if (gscrPos == "template"){	  
//REDWOOD_CHANGES
        /*if (innerHTMLArray.length == 0){
            fnBuildSubSysLabel();
        }*/					   
//REDWOOD_CHANGES
        fnEnableSubSysButtons_Tmp();
    } else{
        fnEnableSubSysButtons_ABS();
    }
}

function fnToggleSubsystemButton(btnId, flag) {
    //var btnElem = document.getElementById(btnId).children[0];	 //REDWOOD_CHANGES
     var btnElem = document.getElementById(btnId);	//REDWOOD_CHANGES
    if (typeof(flag) != "undefined" && flag == true) fnEnableSubSysButtons(btnElem);
    if (typeof(flag) != "undefined" && flag == false) fnDisableSubSysButtons(btnElem);
}

//REDWOOD_CHANGES
function fnEnableSubSysButtons_Tmp(btnElem) {
    setTimeout( function () {//REDWOOD_35381225
    if(btnElem){
        btnElem.disabled = false;
    }else{
    if(document.getElementById('subSystemConveyorBelt')){
        var subSysButtons = document.getElementById('subSystemConveyorBelt').getElementsByTagName('OJ-BUTTON');
        for(var i =0;i<subSysButtons.length;i++){
            subSysButtons[i].setAttribute('disabled','false');
        }
    }
      
    }
	},0);//REDWOOD_35381225
}
function fnDisableSubSysButtons_Tmp(btnElem){
    setTimeout( function () {//REDWOOD_35381225
    if(btnElem){
        btnElem.disabled = true;
    }else{
      if(document.getElementById('subSystemConveyorBelt')){
           var subSysButtons = document.getElementById('subSystemConveyorBelt').getElementsByTagName('OJ-BUTTON');
        for(var i =0;i<subSysButtons.length;i++){
            subSysButtons[i].disabled = true;
        }
      }
       
    }
    },0);//REDWOOD_35381225
}
function fnEnableSubSysButtons_Tmp_old(anchorElem) { 
//REDWOOD_CHANGES
     if (anchorElem) {
		if (anchorElem.getAttribute("onclick_old") != null && anchorElem.getAttribute("onclick_old") != "") {
			anchorElem.disabled = false;
			fnSetElemAttribute(anchorElem, "onkeydown", "", "onkeydown_old", true);
			fnSetElemAttribute(anchorElem, "onclick", "", "onclick_old", true);
			anchorElem.className = 'BUTTONSubSystem';
		}
    } else {
        var subSysButtons = document.getElementById("DIVSubSystem");
        if (subSysButtons) {
            var subSysElem = subSysButtons.getElementsByTagName("A");
			for (var elemLength = 0; elemLength < subSysElem.length; elemLength++) {
				if (subSysElem[elemLength].getAttribute("onclick_old") != null && subSysElem[elemLength].getAttribute("onclick_old") != "") {
					subSysElem[elemLength].disabled = false;
					fnSetElemAttribute(subSysElem[elemLength], "onkeydown", "", "onkeydown_old", true);
					fnSetElemAttribute(subSysElem[elemLength], "onclick", "", "onclick_old", true);
					subSysElem[elemLength].className = 'BUTTONSubSystem';
				}
			}
		}
    }
}

function fnDisableSubSysButtons_Tmp_old(anchorElem) { //REDWOOD_CHANGES
    if (anchorElem) {
		if (anchorElem.getAttribute("onclick") != null && anchorElem.getAttribute("onclick") != "") {
			anchorElem.disabled = true;
			fnSetElemAttribute(anchorElem, "onkeydown_old", "", "onkeydown", true);
			fnSetElemAttribute(anchorElem, "onclick_old", "", "onclick", true);
			anchorElem.className = 'BUTTONSubSystemDisabled';
		}
    } else {
        var subSysButtons = document.getElementById("DIVSubSystem");
        if (subSysButtons) {
            var subSysElem = subSysButtons.getElementsByTagName("A");
            for (var elemLength = 0; elemLength < subSysElem.length; elemLength++) {
				if (subSysElem[elemLength].getAttribute("onclick") != null && subSysElem[elemLength].getAttribute("onclick") != "") {
					subSysElem[elemLength].disabled = true;
					fnSetElemAttribute(subSysElem[elemLength], "onkeydown_old", "", "onkeydown", true);
					fnSetElemAttribute(subSysElem[elemLength], "onclick_old", "", "onclick", true);
					subSysElem[elemLength].className = 'BUTTONSubSystemDisabled';
				}
            }   
        }
    }
}

function fnSetElemAttribute(elem, attributeNameOld, attributeValue, attributeName, flag) {
    elem.setAttribute(attributeNameOld, elem.getAttribute(attributeName));
    if (typeof(flag) != "undefined" && flag != "" && flag == true) {
        elem.setAttribute(attributeName, "");
    }
}

function fnEnableSubSysButtons_ABS(){
    setTimeout( function () {//REDWOOD_35381225
    if (document.getElementById("DIV_SUBSCR_CALLFORM")){
        var callFormHTML = document.getElementById("DIV_SUBSCR_CALLFORM");
        var subSysTable = callFormHTML.getElementsByTagName("TABLE");
        if (subSysTable.length > 0){
            for (var tableIndex = 0; tableIndex < subSysTable.length; tableIndex++){
                var numRows = subSysTable[tableIndex].rows;
                var numCells = numRows[0].cells;
                for (var cellIndex = 0; cellIndex < numCells.length; cellIndex++){
                    numRows[0].cells[cellIndex].disabled = false;
                }
            }
        }
    }
    },0);//REDWOOD_35381225
}

function fnDisableSubSysButtons_ABS(){
	setTimeout( function () {//REDWOOD_35381225
    if (document.getElementById("DIV_SUBSCR_CALLFORM")){
        var callFormHTML = document.getElementById("DIV_SUBSCR_CALLFORM");
        var subSysTable = callFormHTML.getElementsByTagName("TABLE");
        if (subSysTable.length > 0){
            for (var tableIndex = 0; tableIndex < subSysTable.length; tableIndex++){
                var numRows = subSysTable[tableIndex].rows;
                var numCells = numRows[0].cells;
                for (var cellIndex = 0; cellIndex < numCells.length; cellIndex++){
                    numRows[0].cells[cellIndex].disabled = true;
                }
            }
        }
    }
    },0);//REDWOOD_35381225
}

function fnBuildSubSysLabel(){
    var footerHTML = document.getElementById("DIVFooter");
    var subSysElem = footerHTML.getElementsByTagName("LI");
    if (subSysElem.length > 0){
        for (var loopIndex = 0; loopIndex < subSysElem.length; loopIndex++){
            var curElemHTML = footerHTML.getElementsByTagName("LI")[loopIndex].innerHTML;
            innerHTMLArray[loopIndex] = curElemHTML;
        }
    }
}

function replaceEmbeddedXML(xmlDoc){
    try{
        var xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
    } catch(e){
        var xslt = new ActiveXObject("Msxml2.XSLTemplate.4.0");
    }
    try{
        var xslDetailed = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
        xslDetailed.setProperty("AllowDocumentFunction", true);
    } catch(e){
        var xslDetailed = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.4.0");
    }
    xslDetailed.async = false;
    xslDetailed.resolveExternals = true;
    xslDetailed.load("Templates/XSL/EmbedXML.xsl");
    xslt.stylesheet = xslDetailed;
    var xslProc = xslt.createProcessor();
    xslProc.input = xmlDoc;
    xslProc.transform();
    var xmlString = xslProc.output;
    return xmlString;
}

function fnSetReferenceFiledValueAsDefaultVal(rowCell){
    var refField = "";
    if (rowCell.getElementsByTagName("INPUT")[0] != undefined) refField = rowCell.getElementsByTagName("INPUT")[0].getAttribute("REF_FIELD");
    else if (rowCell.getElementsByTagName("CHECKBOX")[0] != undefined) refField = rowCell.getElementsByTagName("CHECKBOX")[0].getAttribute("REF_FIELD");
    else if (rowCell.getElementsByTagName("SELECT")[0] != undefined) refField = rowCell.getElementsByTagName("SELECT")[0].getAttribute("REF_FIELD");

    if (refField != null){
        if (refField != "") rowCell.getElementsByTagName("INPUT")[0].value = document.getElementById(refField).value;
    }
}

function toggleSelectBoxes(tableDivContainer, tableHeader){

  //Static Header change start
		var divElem = document.getElementById(tableHeader).parentNode;
    	var scrollDiv = getNextSibling(divElem.parentNode);
		divElem.scrollLeft = scrollDiv.scrollLeft;//Static Header change end
    
    if (!tableDivContainer || !tableHeader){
        return;
    }

    var selectBoxes = tableDivContainer.getElementsByTagName('select');
    if (!selectBoxes){
        return;
    }

    for (var i = 0; i < selectBoxes.length; i++){
        if (tableDivContainer.scrollTop > parseFloat(selectBoxes[i].parentNode.offsetTop - tableHeader.offsetHeight)){
            selectBoxes[i].style.visibility = 'hidden';
        } else{
            selectBoxes[i].style.visibility = 'visible';
        }
    }
}

//FCUBS10ITR2 SFR 462 STARTS
// Added as this function is used in some function IDS -SWDTXQRY..
function fnValidateNumberFields(){
    var elem = document.activeElement;
    if (elem.innerHTML == "") {
        if(getOuterHTML(elem)){
            if(getOuterHTML(elem).indexOf("validateInputAmount") != -1){
                if(elem.value.indexOf(gDigitGroupingSymbol) != -1) {
                    var elemValue = elem.value;
                    var re = new RegExp(gDigitGroupingSymbol, "g");
                    elemValue =  elemValue.replace(re, "");
		}
                if (elem.value.indexOf(gDecimalSymbol) != -1) {
                    var valueEntered = elem.value.split(gDecimalSymbol);
                    if (valueEntered[0].length > elem.getAttribute("MAXLENGTH1"))
                        return false;
                    }else {
                        if (elemValue.length > elem.getAttribute("MAXLENGTH1"))
                            return false;
                    }
                }
            }
        }
    return true;
    }

function fnValidateFields(){
    var inputvalue = document.activeElement;
    if (inputvalue.value == "") return false;
    else return true;
}

function fnSummaryLabels(){
    var labels = "@@LBL_EXPORT~~" + mainWin.getItemDesc("LBL_EXPORT"); 
    labels += "@@LBL_ADVANCED~~" + mainWin.getItemDesc("LBL_ADVANCED");
    labels += "@@LBL_RESET~~" + mainWin.getItemDesc("LBL_RESET");
    labels += "@@LBL_QRY_QUERY~~" + mainWin.getItemDesc("LBL_QRY_QUERY");
    labels += "@@LBL_REFRESH~~" + mainWin.getItemDesc("LBL_REFRESH");
    labels += "@@LBL_RESULT~~" + mainWin.getItemDesc("LBL_RESULT");
    labels += "@@LBL_MAKERID~~" + mainWin.getItemDesc("LBL_MAKERID");
    labels += "@@LBL_CHECKER_ID~~" + mainWin.getItemDesc("LBL_CHECKER_ID");
    labels += "@@LBL_MAKER_DT_STAMP~~" + mainWin.getItemDesc("LBL_MAKER_DT_STAMP");
    labels += "@@LBL_CHECKER_DT_STAMP~~" + mainWin.getItemDesc("LBL_CHECKER_DT_STAMP");
    labels += "@@LBL_RECORD_STAT~~" + mainWin.getItemDesc("LBL_RECORD_STAT");
    labels += "@@LBL_AUTHORISATION_STATUS~~" + mainWin.getItemDesc("LBL_AUTHORISATION_STATUS");
    labels += "@@LBL_A~~" + mainWin.getItemDesc("LBL_A");
    labels += "@@LBL_SUMMARY_U~~" + mainWin.getItemDesc("LBL_SUMMARY_U");
    labels += "@@LBL_UN_AUTH_FLG~~" + mainWin.getItemDesc("LBL_UN_AUTH_FLG");
    labels += "@@LBL_O~~" + mainWin.getItemDesc("LBL_O");
    labels += "@@LBL_OPEN~~" + mainWin.getItemDesc("LBL_OPEN");
    labels += "@@LBL_C~~" + mainWin.getItemDesc("LBL_C");
    labels += "@@LBL_CLOSED~~" + mainWin.getItemDesc("LBL_CLOSED");
    labels += "@@LBL_EXIT~~" + mainWin.getItemDesc("LBL_EXIT");
    labels += "@@LBL_OK~~" + mainWin.getItemDesc("LBL_OK");
    labels += "@@LBL_CANCEL~~" + mainWin.getItemDesc("LBL_CANCEL");
    labels += "@@LBL_FIELDS~~" + mainWin.getItemDesc("LBL_FIELDS");
    labels += "@@LBL_OPERATOR~~" + mainWin.getItemDesc("LBL_OPERATOR");
    labels += "@@LBL_VALUE~~" + mainWin.getItemDesc("LBL_VALUE");
    labels += "@@LBL_AND~~" + mainWin.getItemDesc("LBL_AND");
    labels += "@@LBL_ACCEPT~~" + mainWin.getItemDesc("LBL_ACCEPT");
    labels += "@@LBL_CLEAR_QUERY~~" + mainWin.getItemDesc("LBL_CLEAR_QUERY");
    labels += "@@LBL_ORDER_BY~~" + mainWin.getItemDesc("LBL_ORDER_BY");
    labels += "@@LBL_ASCENDING~~" + mainWin.getItemDesc("LBL_ASCENDING");
    labels += "@@LBL_DESCENDING~~" + mainWin.getItemDesc("LBL_DESCENDING");
    labels += "@@LBL_ACCEPT~~" + mainWin.getItemDesc("LBL_ACCEPT");
    labels += "@@LBL_TO~~" + mainWin.getItemDesc("LBL_TO");
    labels += "@@LBL_RECOMMENDED~~" + mainWin.getItemDesc("LBL_RECOMMENDED"); //REDWOOD_CHANGES
    labels += "@@LBL_OR~~" + mainWin.getItemDesc("LBL_OR");
    labels += "@@LBL_SEARCH~~" + mainWin.getItemDesc("LBL_SEARCH");
    labels += "@@LBL_RECORDS_PER_PAGE~~" + mainWin.getItemDesc("LBL_RECORDS_PER_PAGE");
    labels += "@@LBL_GOTO_PAGE~~" + mainWin.getItemDesc("LBL_GOTO_PAGE");
    labels += "@@LBL_OF~~" + mainWin.getItemDesc("LBL_OF");
    labels += "@@LBL_AUTHORIZED~~" + mainWin.getItemDesc("LBL_AUTHORIZED");
    labels += "@@LBL_CALENDAR~~" + mainWin.getItemDesc("LBL_CALENDAR");
    labels += "@@LBL_NARRATIVE~~" + mainWin.getItemDesc("LBL_NARRATIVE");
    labels += "@@LBL_LIST_OF_VALUES~~" + mainWin.getItemDesc("LBL_LIST_OF_VALUES");
    labels += "@@LBL_INFRA_PREVIOUS~~" + mainWin.getItemDesc("LBL_INFRA_PREVIOUS");
    labels += "@@LBL_NEXT~~" + mainWin.getItemDesc("LBL_NEXT");
    labels += "@@LBL_FIRST~~" + mainWin.getItemDesc("LBL_FIRST");
    labels += "@@LBL_LAST~~" + mainWin.getItemDesc("LBL_LAST");
    labels += "@@LBL_NOSCRIPT_LABEL~~" + mainWin.getItemDesc("LBL_NOSCRIPT_LABEL");
    labels += "@@LBL_INFRA_ADVANCED~~" + mainWin.getItemDesc("LBL_INFRA_ADVANCED");
    labels += "@@LBL_RECORDS~~" + mainWin.getItemDesc("LBL_RECORDS");
    labels += "@@LBL_ADVANCED_SUMMARY~~" + mainWin.getItemDesc("LBL_ADVANCED_SUMMARY");
    labels += "@@LBL_SUMMARY~~" + mainWin.getItemDesc("LBL_SUMMARY");
    labels += "@@LBL_PAGE_FOOTER~~" + mainWin.getItemDesc("LBL_PAGE_FOOTER");
    labels += "@@LBL_SEARCH_RESULT~~" + mainWin.getItemDesc("LBL_SEARCH_RESULT");  //REDWOOD_CHANGES
    labels += "@@LBL_SELECT_ALL_ROWS~~" + mainWin.getItemDesc("LBL_SELECT_ALL_ROWS");
    labels += "@@LBL_END_TABLE~~" + mainWin.getItemDesc("LBL_END_TABLE");
    labels += "@@LBL_CASE_SENSITIVE~~" + mainWin.getItemDesc("LBL_CASE_SENSITIVE");
    labels += "@@LBL_TOOLBAR_SAVE~~" + mainWin.getItemDesc("LBL_TOOLBAR_SAVE");
    labels += "@@LBL_SAVED_QUERY~~" + mainWin.getItemDesc("LBL_SAVED_QUERY");
    labels += "@@LBL_CLEAR_ALL~~" + mainWin.getItemDesc("LBL_CLEAR_ALL");
    labels += "@@LBL_EXEC_QUERY~~" + mainWin.getItemDesc("LBL_EXEC_QUERY");
    labels += "@@LBL_LOCK_COLUMNS~~"+ mainWin.getItemDesc("LBL_LOCK_COLUMNS");  //12.1 lock column changes
    labels += "@@LBL_EXPORT_ALL~~" + mainWin.getItemDesc("LBL_EXPORT_ALL"); // Bug 19609280 - Asynchronous summary export changes
//REDWOOD_CHANGES
    labels += "@@LBL_CHECKBOX_YES~~" + mainWin.getItemDesc("LBL_CHECKBOX_YES");
    labels += "@@LBL_CHECKBOX_NO~~" + mainWin.getItemDesc("LBL_CHECKBOX_NO");
    labels += "@@LBL_SEARCH_CRITERIA~~" + mainWin.getItemDesc("LBL_SEARCH_CRITERIA");
    labels += "@@LBL_PAGE~~" + mainWin.getItemDesc("LBL_PAGE");
//REDWOOD_CHANGES
    labels += "@@";

    return labels;
}
//FCUBS10ITR2 SFR 462 ENDS

function fnLaunchLinkWindow(anchorTag, paramList){
    var paramListArray = new Array();
    var paramName = '',
    fieldName = '',
    queryString = '';

    if (paramList != ''){
        paramListArray = paramList.split('&');
        for (var index = 0; index < paramListArray.length - 1; ++index){

            paramName = paramListArray[index].split('=')[0];
            fieldName = paramListArray[index].split('=')[1];

            if (document.getElementById(fieldName) && document.getElementById(fieldName).value != '') queryString += paramName + '=' + document.getElementById(fieldName).value + '&';
        }

        if (queryString != ''){
            if (anchorTag.href.indexOf('?') == -1) anchorTag.href += '?';
            else anchorTag.href += '&';
                anchorTag.href += queryString.substring(0, queryString.length - 1);
        }
    }
}

function fnChangeLabelToText(type,obj) {
    var elements;
    if(typeof(obj) != "undefined") {
        elements = obj.getElementsByTagName(type);
    } else {
        elements = document.getElementById('ResTree').getElementsByTagName(type);
    }

    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var object = elements[loopIndex];
        if (!object.getAttribute("oldInnerHTML")) 
            continue;
        else {
            var oldInnerHTML = object.getAttribute("oldInnerHTML");
            var parentDIV = object.parentNode;
            var labelElements = parentDIV.getElementsByTagName("TEXTAREA");
            for (var cnt = 0; cnt < labelElements.length; cnt++){
                if (!labelElements[cnt].getAttribute("oldInnerHTML")) {
                    continue;
                } else {
                    var tempId = labelElements[cnt].id;                        
                    setOuterHTML_TXADisp(labelElements[cnt], oldInnerHTML);
                    if(tempId!="" && tempId!="undefined"){
                        var tempObject = document.getElementById(tempId);
                        if (tempObject) {
                            if(tempObject.value == ""){
                                if(tempObject.getAttribute("DEFAULT")) {
                                    tempObject.value = tempObject.getAttribute("DEFAULT");
                                }
                            }
                        }
                    }
                    loopIndex--;
                    break;
                }
            }
            if (gAction == "NEW" || gAction == "ENTERQUERY") {
                if (parentDIV.getElementsByTagName("INPUT")[0]) 
                    parentDIV.getElementsByTagName("INPUT")[0].value = "";
            }
        }
    }
}

function alert(message){
    mask();
    showAlerts(fnBuildAlertXML('','I',message), 'I');
    alertAction = "UNMASK";
}

function confirm(message){
    var returnVal = window.showModalDialog("Alert.jsp?type=C", message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
    if (returnVal == "CANCEL") return false;
    else return true;
}

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
 
      var TEXTAREA_LINE_HEIGHT = 13;
      var textarea = isField;
      var newHeight = 0;
      var prevScrollHeight = 0;
      while((newHeight = textarea.scrollHeight) != prevScrollHeight) {
            prevScrollHeight = newHeight;
          var currentHeight = textarea.clientHeight;
          if (newHeight > currentHeight) {
			 textarea.style.whiteSpace = "pre-wrap"; /* 9NT1606_12_2_RETRO_12_0_3_23652948 changes */
             textarea.style.height = newHeight - 0.1 * TEXTAREA_LINE_HEIGHT + 'px';
        }
    }
}
function fnServiceCall(service, operation, requesttype){

    fnPreServiceCall(service, operation, requesttype);
    var webrequestxml = fnBuildReqxml(service, operation, requesttype);
    fcjRequestDOM.loadXML(webrequestxml);
    var servletURL = "FCServiceInvokerServlet";
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM){
        debugs("fcjRequestDOM", getXMLString(fcjResponseDOM));
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = "";
        var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
        if (msgStatus == 'FAILURE'){
            l_xPath += "FCUBS_ERROR_RESP";
        } else if (msgStatus == "SUCCESS" || msgStatus == "WARNING"){
            l_xPath += "FCUBS_WARNING_RESP";
        }
        var message = "";
        messageNode = selectSingleNode(fcjResponseDOM,l_xPath);
        var returnVal = displayResponse(messageNode, msgStatus);
        if (msgStatus != 'FAILURE'){
            fnPostServiceCall(fcjResponseDOM);
        }
    } else{ // Null response
    /* FC 11.4 NLS Changes Starts*/
        //alert("Processing Has Failed");
         alert(mainWin.getItemDesc("LBL_PROCESSING_FAIL"));
        return;
    }
}

function fnPreServiceCall() {
}

function fnPostServiceCall() {
}
function fnImageUpload(pkColName, pkColValues, imgFldName, seqNo, e){
    var imageName = "";
    var rowIndex = getRowIndex(e);
    var functionId = mainWin.document.getElementById("fastpath").value;
    if (rowIndex == 'undefined' || rowIndex < 0){
        rowIndex = 1;
    }
    var pkNameforFile = "";
    var title = mainWin.getItemDesc("LBL_IMG_UPLOAD");
    var upload = mainWin.getItemDesc("LBL_UPLOAD");
    pkNameforFile = replaceAllChar(pkColValues, "~", "_");
    pkNameforFile = pkNameforFile;
    if (attachmentData.length > 0){
        imageName = fileNameArray[rowIndex - 1];
    }
    var l_Params  = "keyName="    + pkNameforFile;
/* security fixes for WF starts*/
    l_Params += "&pkColName="  + replaceTilde(pkColName);
    l_Params += "&pkColVal=" + replaceTilde(pkColValues);
/* security fixes for WF ends */
    l_Params += "&seqNo="        + seqNo;
    l_Params += "&image="     + imageName;
    l_Params += "&action="       + gAction;
    l_Params += "&title="     + title;
    l_Params += "&upload="  + upload;
    l_Params += "&imgFieldName="       + imgFldName ;
    l_Params += "&rowIndex="     + rowIndex ;
    l_Params += "&functionId="        + functionId ;
    
    loadSubScreenDIV("ChildWin", "ImageUpload.jsp?"+l_Params);
    
}

function fnResetAttachmentData(pstrBlockID){
    var tempAttachMent = new Array();
    var temeFileName = new Array();
    var tableRef = getTableObjForBlock(pstrBlockID); //REDWOOD_CHANGES
    var rows = tableRef.tBodies[0].rows;
    for (var i = 0; i < rows.length; i++){
        if (rows[i].cells[0].getElementsByTagName("INPUT")[0].checked){
            attachmentData[i] = "";
            fileNameArray[i] = "";
        }
    }
    tempAttachMent = attachmentData;
    temeFileName = fileNameArray;
    attachmentData = new Array();
    fileNameArray = new Array();
    var indexCount = 0;
    for (var i = 0; i < tempAttachMent.length; i++){
        if (tempAttachMent[i] == "" || tempAttachMent[i] == "" || tempAttachMent[i] == "undefined") continue;
        attachmentData[indexCount] = tempAttachMent[i];
        fileNameArray[indexCount] = temeFileName[i];
        indexCount++;
    }
}

function fnPopulateAttachMent(pkColName, pkColValues){
    fileNameArray = new Array();
    if (fcjResponseDOM){

        pkColArray = pkColName.split("~");
        pkValArray = pkColValues.split("~");

        if (getXMLString(fcjResponseDOM).length > 0){
            if (selectNodes(fcjResponseDOM,"//ATTACHMENTS/ATTACHMENT")){
                var attachmentNodes = selectNodes(fcjResponseDOM,"//ATTACHMENTS/ATTACHMENT");
                for (var i = 0; i < attachmentNodes.length; i++){
                    var node = attachmentNodes[i];
                    var attachMentString = "";
                    attachMentString = "<ATTACHMENT>";
                    for (var pk = 0; pk < pkColArray.length; pk++){
                        if (pkColArray[pk] == "") continue;
                        attachMentString += "<" + pkColArray[pk] + ">" + pkValArray[pk] + "</" + pkColArray[pk] + ">";
                    } 
                    attachMentString += "<PKVALUES>" + getNodeText(selectSingleNode(node,"PKVALUES")) + "</PKVALUES>";
                    attachMentString += "<PKFIELDS>" + getNodeText(selectSingleNode(node,"PKFIELDS")) + "</PKFIELDS>";
                    attachMentString += "<IMGFIELDNAME>" + getNodeText(selectSingleNode(node,"IMGFIELDNAME")) + "</IMGFIELDNAME>";
                    attachMentString += "<SEQNO>" + getNodeText(selectSingleNode(node,"SEQNO")) + "</SEQNO>";
                    attachMentString += "<VALUE><![CDATA[" + getNodeText(selectSingleNode(node,"FTYPE")) + "]]></VALUE><FTYPE>" + getNodeText(selectSingleNode(node,"FTYPE")) + "</FTYPE>";
                    attachMentString += "</ATTACHMENT>";
                    attachmentData[i] = attachMentString;
                    fileNameArray[i] = getNodeText(selectSingleNode(node,"FTYPE"));
                    if (getNodeText(selectSingleNode(node,"FTYPE")) == "" || getNodeText(selectSingleNode(node,"FTYPE")) == null){
                        attachmentData[i] = "";
                        fileNameArray[i] = "";
                    }

                }
            }
        }
    }
}

function getUINameForFunc(funcId) {
    var uiName = funcId;
    var menuXml = loadXMLDoc(mainWin.gXmlMenu);
    var uiNameNode = selectSingleNode(menuXml,"//*[@FNID = '" + funcId + "']");
    if (uiNameNode) {
        for (var i = 0; i < uiNameNode.attributes.length; i++) {
            if (uiNameNode.attributes[i].nodeName == "UINAME") {
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            } 
        }
    }
    return uiName;
}

function getRightsForFunc(funcId) {
    var rights = "";
    var menuXml = loadXMLDoc(mainWin.gXmlMenu);
    var uiNameNode = selectSingleNode(menuXml,"//*[@FNID = '" + funcId + "']");
    if (uiNameNode){
        for (var i = 0; i < uiNameNode.attributes.length; i++){
            if (uiNameNode.attributes[i].nodeName == "RIGHTS") {
                rights = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    return rights;
}

function getTypeStringForFunc(funcId) {
    var typeStr = "";
    var menuXml = loadXMLDoc(mainWin.gXmlMenu);
    var uiNameNode = selectSingleNode(menuXml,"//*[@FNID = '" + funcId + "']");
    if (uiNameNode){
        for (var i = 0; i < uiNameNode.attributes.length; i++){
            if (uiNameNode.attributes[i].nodeName == "TYPSTR") {
                typeStr = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    return typeStr;
}

function getOfflineAllowedForFunc(funcId) {
    var offlineAllowed = "";
    var menuXml = loadXMLDoc(mainWin.gXmlMenu);
    var uiNameNode = selectSingleNode(menuXml,"//*[@FNID = '" + funcId + "']");
    if (uiNameNode){
        for (var i = 0; i < uiNameNode.attributes.length; i++){
            if (uiNameNode.attributes[i].nodeName == "OFFLINEALLOWED"){
                parent.frames["Global"].gOfflineAllowed = uiNameNode.getAttribute("OFFLINEALLOWED");
                offlineAllowed = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    return offlineAllowed;
}

function createDOMActiveXObject() {
    var domObj;
    try{
        domObj = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e){
        domObj = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    return domObj;
}

function EnableToolbar_buttons(type){
    switch(type.toUpperCase())
    {        
        case 'NEW':    
        enablebutton('New','actions0');
        break;      
        case 'COPY':
        enablebutton('Copy','actions1');
        break;
        case 'DELETE':
        enablebutton('Delete','actions7');
        break;
        case 'CLOSE':
        enablebutton('Close','actions5');
        break;
        case 'UNLOCK':
        enablebutton('Unlock','actions2');
        break;
        case 'REOPEN':
        enablebutton('Reopen','actions6');
        break;
        case 'PRINT':
        enablebutton('Print','actions9');
        break;
        case 'AUTHORIZE':
        enablebutton('Authorize','actions8');
        break;
        case 'REVERSE':
        enablebutton('Reverse','operation3');
        break;
        case 'ROLLOVER':
        enablebutton('Rollover','operation2');
        break;
        case 'CONFIRM':
        enablebutton('Confirm','operation0');
        break;
        case 'LIQUIDATE':
        enablebutton('Liquidate','operation1');
        break;
        case 'HOLD':
        enablebutton('Hold','actions3');
        break; 
		/*Fix for BugNo:17755434 Starts*/    
        case 'ENTERQUERY':
        enablebutton('EnterQuery', '');
        case 'EXECUTEQUERY':
        enablebutton('ExecuteQuery','');
        /*Fix for BugNo:17755434 Ends*/
        default:
        enablebutton('Save','actions4');
        break; 
    }
}

function DisableToolbar_buttons(type){
    switch(type.toUpperCase())
    {      
        case 'NEW':    
        disablebutton('New','actions0');
        break;      
        case 'COPY':
        disablebutton('Copy','actions1');
        break;
        case 'DELETE':
        disablebutton('Delete','actions7');
        break;
        case 'CLOSE':
        disablebutton('Close','actions5');
        break;
        case 'UNLOCK':
        disablebutton('Unlock','actions2');
        break;
        case 'REOPEN':
        disablebutton('Reopen','actions6');
        break;
        case 'PRINT':
        disablebutton('Print','actions9');
        break;
        case 'AUTHORIZE':
        disablebutton('Authorize','actions8');
        break;
        case 'REVERSE':
        disablebutton('Reverse','operation3');
        break;
        case 'ROLLOVER':
        disablebutton('Rollover','operation2');
        break;
        case 'CONFIRM':
        disablebutton('Confirm','operation0');
        break;
        case 'LIQUIDATE':
        disablebutton('Liquidate','operation1');
        break;
        case 'HOLD':
        disablebutton('Hold','actions3');
        break;
		/*Fix for BugNo:17947164 starts*/    
		case 'ENTERQUERY':
		disablebutton('EnterQuery', '');
		break;
		case 'EXECUTEQUERY':
		disablebutton('ExecuteQuery','');
		break;
		/*Fix for BugNo:17947164 Ends*/
        default:
        disablebutton('Save','actions4');
        break;  
    }
}
function enablebutton(type,action){
    document.getElementById(type).disabled = false;
    document.getElementById(type).style.display = "flex";//ojet	//REDWOOD_CHANGES
    //mainWin.document.getElementById(type).className ="BTNicon";
}

function disablebutton(type,action){
    document.getElementById(type).disabled = true;
    document.getElementById(type).style.display = "none";
    //mainWin.document.getElementById(type).className ="BTNiconD";
}

// Developer can call this function to create DOM objects required at fnid level
function createDOMActiveXObject() {
    var domObj;
    try{
        domObj = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e){
        domObj = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    return domObj;
}
function fnEnableGOTOVersionButton(){
    if(Number(document.getElementsByName("LATEST_VERNO")[0].value) >1){
        document.getElementsByName("BTN_GO_VER")[0].disabled = false;
        document.getElementById("Goto_version").disabled = false;
        document.getElementById("Goto_version").readOnly = false;
        document.getElementById("Goto_version").className = "TextNormal";
    }else{
        document.getElementsByName("BTN_GO_VER")[0].disabled = true;
    }
}

function  fnOnClick_BTN_NEXT_VER(){
    var verNo=Number(document.getElementsByName("VERNO")[0].value);     
    document.getElementsByName("Goto_version")[0].value ="";
    var versionCount=Number(document.getElementsByName("LATEST_VERNO")[0].value);  
    if(verNo<versionCount){
        verNo++;
        document.getElementsByName("VERNO")[0].value=verNo;       
        appendData(document.getElementById("TBLPageTAB_MAIN"));
        g_prev_gAction=gAction;
        gAction='EXECUTEQUERY';
        fcjRequestDOM = buildUBSXml();
        fnExecuteQuery(fcjRequestDOM);
        gAction=g_prev_gAction;
    }	
}

function  fnOnClick_BTN_PREV_VER(){
    var verNo=Number(document.getElementsByName("VERNO")[0].value);     
    document.getElementsByName("Goto_version")[0].value ="";
    var versionCount=Number(document.getElementsByName("LATEST_VERNO")[0].value); 
    if(verNo>1){
        verNo--;
        document.getElementsByName("VERNO")[0].value=verNo;        
        appendData(document.getElementById("TBLPageTAB_MAIN"));
        g_prev_gAction=gAction;
        gAction='EXECUTEQUERY';
        fcjRequestDOM = buildUBSXml();
        fnExecuteQuery(fcjRequestDOM);
        gAction=g_prev_gAction;
    }
}

function  fnOnClick_BTN_FIRST_VER(){
    var verNo=Number(document.getElementsByName("VERNO")[0].value);    
    document.getElementsByName("Goto_version")[0].value ="";
    if(verNo!=1 && verNo !=0 ){           
        document.getElementsByName("VERNO")[0].value=1;          
        appendData(document.getElementById("TBLPageTAB_MAIN"));
        g_prev_gAction=gAction;
        gAction='EXECUTEQUERY';
        fcjRequestDOM = buildUBSXml();
        fnExecuteQuery(fcjRequestDOM);
        gAction=g_prev_gAction;
    }	
}

function  fnOnClick_BTN_LAST_VER(){
    var verNo=Number(document.getElementsByName("VERNO")[0].value);     
    var versionCount=Number(document.getElementsByName("LATEST_VERNO")[0].value); 
    document.getElementsByName("Goto_version")[0].value ="";
    if(verNo != versionCount){           
        document.getElementsByName("VERNO")[0].value =versionCount;           
        appendData(document.getElementById("TBLPageTAB_MAIN"));
        g_prev_gAction=gAction;
        gAction='EXECUTEQUERY';
        fcjRequestDOM = buildUBSXml();
        fnExecuteQuery(fcjRequestDOM);
        gAction=g_prev_gAction;
    }	
}

function fnOnClick_goToPage(){   
    var versionCount=Number(document.getElementsByName("LATEST_VERNO")[0].value); 
    var Gotopage=Number(document.getElementsByName("Goto_version")[0].value); 
    var verNo=Number(document.getElementsByName("VERNO")[0].value);   
    if(versionCount >=Gotopage && Gotopage >0 && Gotopage != verNo){		
        document.getElementsByName("VERNO")[0].value=Gotopage;		
        appendData(document.getElementById("TBLPageTAB_MAIN"));
        g_prev_gAction=gAction;
        gAction='EXECUTEQUERY';
        fcjRequestDOM = buildUBSXml();
        fnExecuteQuery(fcjRequestDOM);
        gAction=g_prev_gAction;
    }else{
        if(Gotopage != verNo)
            alert(mainWin.getItemDesc("LBL_NO_VERSION"));
    }    
}

function fnPostDataHandler(functionId, QueryId, QueryParam) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var serverURL = "FCDataHandler";
    var strFormData = "";
    strFormData += "<FUNCTIONID>" + functionId + "</FUNCTIONID>";
    strFormData += "<QUERYID>" + QueryId + "</QUERYID>";
    strFormData += "<QUERYPARAM>" + QueryParam + "</QUERYPARAM>";
    var objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("Content-Type","application/xml"); 
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    var response = null;
    
        if (objHTTP.status != 200) { 
            alert(mainWin.getItemDesc("LBL_ERR_DESC") +  objHTTP.status + ":" + objHTTP.statusText);
        } else {
                mainWin.inactiveTime = 0;
                var csrfNode = selectSingleNode(objHTTP.responseXML,"//CSRF");
                if(csrfNode != null && getNodeText(csrfNode) == "SM-00420"){
                    alert(getNodeText(csrfNode)+mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
                }else{
                    response = objHTTP.responseXML;
                    if(response == null || getXMLString(response) == "") {
                        response = null;
                        alert(mainWin.getItemDesc("LBL_SERVER_FAILED"));
                    }
            }
            var nodeList = response.selectNodes("//DATAVALUE");
            return nodeList;
    }
}

function fnKeepDlgArgActive() {
    try{
        if(dlgArg.mainWin.frames["FrameToolbar"].isSessionActive()) {
            return;
        }
    }catch(e){}
}

function initRedirect(){
    clearInterval(timerRedirect);     
    timerRedirect = setInterval("fnKeepDlgArgActive();",60000); 
}

/* Added for pagination of multiple entry block */
function fnEnableMEElements(multipleBlockID, elemType) {
    var currentMultipleBlock = document.getElementById(multipleBlockID);
    var elements = currentMultipleBlock.getElementsByTagName(elemType);
    for(var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var tmpElem = elements[loopIndex];
        fnEnableElement(tmpElem);
    }
    return;
}

/* Added for pagination of multiple entry block */
/*function fnEval(obj) {
    try {
        eval(obj);
    } catch (e) {
    }
}
*/
/* Added for pagination of multiple entry block */
function getPagenationReq() {
    if (typeof(paginationReq) == "undefined") {
        paginationReq = "N";
    }
    return paginationReq;
    }

/* TO PROVIDE THE GO TO PAGE - START */
function goToPage(pstrTabID, pstrTableName, pstrBlockID){

    /*  THE FOLLOWING VALIDATION IS TO ENSURE THAT THE GOTO PAGE IS NOT ZEOR AND 
        THE CURRENT PAGE AND THE GOTO PAGE ARE NOT THE SAME AND THE GOTO PAGE IS
        LESS THAN OR EQUAL TO THE TOTAL NUMBER OF PAGES.
    */
    if(+document.getElementById("GoTo__"+pstrBlockID).value > 0 && +getInnerText(document.getElementById("CurrPage__"+pstrBlockID)) != +document.getElementById("GoTo__"+pstrBlockID).value && +document.getElementById("GoTo__"+pstrBlockID).value <= +getInnerText(document.getElementById("TotPage__"+pstrBlockID))){
        fnMoveNextAndPrevPgOfMultipleEntry(pstrTabID, pstrTableName, pstrBlockID, "GOTO");
    }else{
        return;
    }
}
/* TO PROVIDE THE GO TO PAGE - END */

/* FOR CLEARING ALL THE MULTIPLE ENTRY BLOCKS IN THE FUNCTION ID - START */
function clearMulitipleEntryBlocks() {	
//REDWOOD_CHANGES
  /*  if ("Y" == getPagenationReq()) {
        for (var i = 0; i < multipleEntryIDs.length; i++) {
           deleteAllRows(multipleEntryIDs[i]);
                if (document.getElementById(multipleEntryIDs[i])) {
                    setInnerText(document.getElementById("CurrPage__" + multipleEntryIDs[i]).childNodes[0],1);// Bug 14709139 Fix
                    setInnerText(document.getElementById("TotPage__" + multipleEntryIDs[i]).childNodes[0],1);// Bug 14709139 Fix
                    fnSetNavButtons(multipleEntryIDs[i], 1, 1);
                }
        }
    } else {
        for (var i = 0; i < multipleEntryIDs.length; i++) {
            deleteAllRows(multipleEntryIDs[i]);
        }
    }*/
    //ojet summary result table clearing
    if(document.getElementById('TBL_QryRslts') && document.getElementById('TBL_QryRslts').hasAttribute('summary')){
        var sumblk = document.getElementById('TBL_QryRslts').getAttribute('summary');
        if (meArrayForAddDelete[sumblk]) {
                meArrayForAddDelete[sumblk]([]);
        }
    }
    //summary changes end
    if(multipleEntryIDs && multipleEntryIDs !=""){
    for (var iLoop = 0;iLoop < multipleEntryIDs.length;iLoop++) {
    try {
            if (meArrayForAddDelete[multipleEntryIDs[iLoop]]) {
                meArrayForAddDelete[multipleEntryIDs[iLoop]]([]);
                if (document.getElementById(multipleEntryIDs[iLoop])) {
                    document.getElementById(multipleEntryIDs[iLoop]).refresh();
                }
            }
        }
        catch (e) {
        }
    }
    }
  //REDWOOD_CHANGES  
}

function fnOpenTxnBrnScreen(brnCode) {
    if(mainWin.multiBranchOperation == 'Y') {
        var currBrn = mainWin.CurrentBranch;
        var istxnBrn = true;
    	var l_Params  = "currBrn=" + currBrn;
        l_Params  += "&istxnBrn="  + istxnBrn;
        //mask(); //REDWOOD_CHANGES
        loadSubScreenDIV("ChildWin", "TxnBranch.jsp?"+l_Params);
    }
}

function fnShowTxnBrnScreen(brnCode) {
    return;
}

function fnTxnBranch(retVal) {
    //var isUCAvailable = false;
    if (retVal != "") {
        g_txnBranch = retVal;
        if (!mainWin.txnBranch[g_txnBranch]) {
            if (!fnUpdateTxnBrnVariables(retVal))
                return false;
        }
        var title=document.title;
        if(title.indexOf(":::")!= -1) {
            var titleBeforeBranch=title.split(":::")[0];
            var scrTitle=titleBeforeBranch +" ::: "+  retVal;
        } else {
            var scrTitle = document.title + " - " +mainWin.getItemDesc("LBL_TXN_BRANCH") +" ::: "+  retVal;
        }
        document.title = scrTitle;
        if(typeof(functionId) != 'undefined' ){
            setInnerText(document.getElementsByTagName("H1")[0],scrTitle);
        }
    }
    return true;
}

function fnSetTxnBranch(brnCode) {
    return true;
}

function fnUpdateTxnBrnVariables(txnBrn) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var requsetStr = "";
    var responseDOM = null;
    var requestDom  = null;
    if(typeof(functionId) != 'undefined' ){
        requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+mainWin.UserId+'</USERID><BRANCH>'
        +txnBrn+'</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>'+functionId+'</FUNCTIONID><ACTION>UCTXNBRANCH</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>'+
        '<ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
        requestDom = loadXMLDoc(requsetStr);
        responseDom = fnPost(requestDom, "MultiBranchUCFetchServlet", functionId);
    }else{        
        requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+mainWin.UserId+'</USERID><BRANCH>'
        +txnBrn+'</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>CLRU</FUNCTIONID><ACTION>UCTXNBRANCH</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>'+
        '<ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
        requestDom = loadXMLDoc(requsetStr);
        if (!mainWin.isSessionActive()) {
            event.returnValue = false;
            responseDOM = loadXMLDoc("<SESSION>EXPIRED</SESSION>");
            return responseDOM;
        }
        var strFormData = getXMLString(requestDom);
        var objHTTP = createHTTPActiveXObject();
		try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        objHTTP.open("POST", "MultiBranchUCFetchServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.setRequestHeader("TXNBRANCH", txnBrn);
        if(typeof(seqNo) != 'undefined' ){
             objHTTP.setRequestHeader("SEQNO", seqNo);
        } 
        objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
        objHTTP.send(strFormData);
		} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
        if (objHTTP.status != 200) { 
            mask();
            showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText), "I");
            alertAction = "UNMASK";
        } else {
             mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                responseDom = objHTTP.responseXML;
            }
        }
    }
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom,"//FCUBS_HEADER/MSGSTAT"));
        if (msgStat == "SUCCESS") {
            var ucVarNames  = getNodeText(selectSingleNode(responseDom,"//PARAM/NAME")).split("~");
            var ucVarValues = getNodeText(selectSingleNode(responseDom,"//PARAM/VALUE")).split("~");
            mainWin.txnBranch[txnBrn] = new setTxnBrnInfo(ucVarNames, ucVarValues);
        } else {           
            alertAction = "TXNBRANERROR";
            showAlerts(getXMLString(selectSingleNode(responseDom, "//FCUBS_ERROR_RESP")), 'E');
            return false;
        }
    }
    return true;    
}

function setTxnBrnInfo(ucVarNames, ucVarValues) {
    /*for (var i=0;i<ucVarNames.length;i++) {
        eval("var ucVarNames["+i+"] = ucVarValues["+i+"]");
    }*/
    if (typeof(ucVarValues) == "undefined") {
        this.Lcy               = mainWin.Lcy;
        this.AppDate           = mainWin.AppDate;
        this.dsnName           = mainWin.dsnName;
        this.CurrentBranchName = mainWin.CurrentBranchName;
        this.CurrentCycle      = mainWin.CurrentCycle;
        this.CurrentPeriod     = mainWin.CurrentPeriod;
        this.BankCode          = mainWin.BankCode;
        this.BranchEoi         = mainWin.BranchEoi;
        return;
    }
    this.Lcy               = ucVarValues[0];
    this.AppDate           = ucVarValues[1];
    this.dsnName           = ucVarValues[2];
    this.CurrentBranchName = ucVarValues[3];
    this.CurrentCycle      = ucVarValues[4];
    this.CurrentPeriod     = ucVarValues[5];
    this.BankCode          = ucVarValues[6];
    this.BranchEoi         = ucVarValues[7];
}

function fnExitTxnBranch(){
    unmask();                                         
    var childDivObj = document.getElementById("ChildWin");
    childDivObj.getElementsByTagName("IFRAME")[0].src = "";
    document.getElementById("Div_ChildWin").removeChild(childDivObj);
    if(typeof(alertAction) != "undefined" && alertAction != "TXNBRANERROR")
     try{
        fnPostCloseTxnBranch();
    }catch(e){}
    multiBrnScrOpened = true;
    fnNew();
}

function fnShowMsgDetails() {

    dlgArg.viewMsg = "TRUE";
    dlgArg.queryRefNo = document.getElementById(pkFields[0]).value;
    dlgArg.mainWin.frames["FrameMenuB"].dispHref1("MSSOUBRS",dlgArg);
}

var isFromDisplay=false;
function validateInputNumber(dispNumField){
    isFromDisplay=true;
    if(dispNumField.value==""){
        if(getPreviousSibling(getPreviousSibling(dispNumField)).tagName != "LABEL"){
            getPreviousSibling(getPreviousSibling(dispNumField)).value = "";
        }else{
            getPreviousSibling(getPreviousSibling(getPreviousSibling(dispNumField))).value = "";
        } 
        return;
    }
    
    if(gDecimalSymbol!="."){
        var arrNumComponents = dispNumField.value.match(new  RegExp(gDecimalSymbol,'g'));
    }else{
        var arrNumComponents = dispNumField.value.match(/\./g);
    }
    if (arrNumComponents!=null && (arrNumComponents.length > 1) ) {
        displayMsg("ST-COM041");
        focusReqd = false;
        focusField = dispNumField;
        dispNumField.value="";
        if(getPreviousSibling(getPreviousSibling(dispNumField)).tagName != "LABEL"){
            getPreviousSibling(getPreviousSibling(dispNumField)).value = "";
        }else{
            getPreviousSibling(getPreviousSibling(getPreviousSibling(dispNumField))).value = "";
        } 
        gIsValid = false;
        return false;
    }
    if (!checkNumberValidation(dispNumField.value) || dispNumField.value.indexOf(" ") != -1){
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        focusReqd = false;
        focusField = dispNumField;
        dispNumField.value="";
        if(getPreviousSibling(getPreviousSibling(dispNumField).tagName != "LABEL")){
            getPreviousSibling(getPreviousSibling(dispNumField)).value = "";
        }else{
            getPreviousSibling(getPreviousSibling(getPreviousSibling(dispNumField))).value = "";
        } 
        dispNumField.focus();
        gIsValid = false;
        return;
    }
    var hidNumField = "";
    if(getPreviousSibling(getPreviousSibling(dispNumField)).tagName != "LABEL"){
        hidNumField = getPreviousSibling(getPreviousSibling(dispNumField));
    }else{
        hidNumField = getPreviousSibling(getPreviousSibling(getPreviousSibling(dispNumField)));
    }
    updatedValue = dispNumField.value.replace(gDecimalSymbol, ".");
    if(hidNumField.value != updatedValue){
        hidNumField.value = updatedValue;
        fnValidateNumberRange(dispNumField);
    }
    return;
}

function checkNumberValidation(AStr){
     if(isFromDisplay){
        if (typeof(gSummaryOpened) != 'undefined' && gSummaryOpened) 
            inTheStr = "1234567890-%"+gDecimalSymbol;
        else 
            inTheStr = "1234567890-"+gDecimalSymbol;
    }else{
        if (typeof(gSummaryOpened) != 'undefined' && gSummaryOpened) 
                inTheStr = "1234567890.-%";
            else 
                inTheStr = "1234567890.-";
    }
    tempChar = "";

    if (getLength(trim(AStr)) <= 0) 
        return true;

    for (i = 0; i < AStr.length; i++) {
        if (AStr.charAt(i) != 0) {
            tempChar = AStr.charAt(i);
			 //Added "-" check for 17027626
            if (((inTheStr.indexOf(tempChar)) < 0) || (tempChar == "-" && AStr.indexOf("-") != 0)) {
                return false;
            }
        }
    }
    return true;
}

function fnValidateNumberRange(v_NumberFld){
    /*if(v_NumberFld.value != "")
        v_NumberFld.value = Number(v_NumberFld.value);*/
    if(v_NumberFld.type == "checkbox")
        return;
    if (!v_NumberFld || v_NumberFld.value == '') 
        return;
    var valueEntered = v_NumberFld.value;
    var maxVal = v_NumberFld.MAX_VAL;
    var minVal = v_NumberFld.MIN_VAL;
    if (valueEntered.indexOf(".") == -1) {
        if (!isNaN(parseInt(minVal))) {
            if (parseInt(valueEntered) < parseInt(minVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
            	alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") +" "+ minVal); 
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
               return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseInt(valueEntered) > parseInt(maxVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
				alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") +" "+ maxVal );		
				v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                return;
            }
        }
        /*Fix for 17639247 Starts*/
        var noBefDecimals = valueEntered.length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            var maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))-parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") +  ": " + maxBefDecimal);
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                gIsValid = false;
            }
        }
		 if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            var maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length) > maxLen) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") +  ": " + maxLen);
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                gIsValid = false;
            }
        }  
        /*Fix for 17639247 Ends*/
    } else {
        var noOfDecimals = valueEntered.substring(valueEntered.indexOf(".")+1).length;
        if (v_NumberFld.MAX_DECIMALS && !isNaN(parseInt(v_NumberFld.MAX_DECIMALS))) {
            if (parseInt(noOfDecimals) > parseInt(v_NumberFld.MAX_DECIMALS)) {
                var lblMaxDecimal = mainWin.getItemDesc("LBL_MAX_DECIMAL");
                focusReqd = false;
                focusField = v_NumberFld;
                alert(getMessage(lblMaxDecimal, v_NumberFld.MAX_DECIMALS + "~"));
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                }
        }
        /*Fix for 17639247 Starts*/
        var noBefDecimals = valueEntered.substring(0,valueEntered.indexOf(".")).length;
        if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") && !isNaN(parseInt(v_NumberFld.getAttribute("MAX_DECIMALS")))) {
            var maxBefDecimal = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))-parseInt(v_NumberFld.getAttribute("MAX_DECIMALS"));
            if (parseInt(noBefDecimals) > maxBefDecimal) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") +  ": " + maxBefDecimal);
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                gIsValid = false;
            }
        }
		if (v_NumberFld.getAttribute("MAXLENGTH1") && !isNaN(parseInt(v_NumberFld.getAttribute("MAXLENGTH1"))) && v_NumberFld.getAttribute("MAX_DECIMALS") == null) {
            var maxLen = parseInt(v_NumberFld.getAttribute("MAXLENGTH1"));
            if (parseInt(valueEntered.length)-1 > maxLen) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_NUMERALS_ALLOWED") +  ": " + maxLen);
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                gIsValid = false;
            }
        }  
        /*Fix for 17639247 Ends*/
        if (!isNaN(parseInt(minVal))) {
            if (parseFloat(valueEntered) < parseFloat(minVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_BELLOW_RANGE") +" "+ minVal);
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                return;
            }
        }
        if (!isNaN(parseInt(maxVal))) {
            if (parseFloat(valueEntered) > parseFloat(maxVal)) {
                focusReqd = false;
                focusField = v_NumberFld;
                alert(mainWin.getItemDesc("LBL_ABOVE_RANGE") +" "+ maxVal );
                v_NumberFld.value = "";
				/*Fix for 17994647  Starts*/
				if(getPreviousSibling(getPreviousSibling(v_NumberFld)).tagName != "LABEL"){
					getPreviousSibling(getPreviousSibling(v_NumberFld)).value = "";
				}else{
					getPreviousSibling(getPreviousSibling(getPreviousSibling(v_NumberFld))).value = "";
				} 
				/*Fix for 17994647  Ends*/
                return;
            }
        }
    }
    return true;
}

function displayFormattedNumber(hdnNumField){
    isFromDisplay=false;
    if(hdnNumField.value==""){
        if(getNextSibling(getNextSibling(hdnNumField)).tagName == "INPUT")//Fix for 17325674 
            getNextSibling(getNextSibling(hdnNumField)).value=""; 
        else
            getNextSibling(getNextSibling(getNextSibling(hdnNumField))).value="";                    
        return;
    }
    var arrNumComponents = hdnNumField.value.match(/\./g);
    if (arrNumComponents!=null && (arrNumComponents.length > 1) ) {
        displayMsg("ST-COM041");
        hdnNumField.value="";
        if(getNextSibling(getNextSibling(hdnNumField)).tagName == "INPUT")//Fix for 17325674 
            getNextSibling(getNextSibling(hdnNumField)).value=""; 
        else
            getNextSibling(getNextSibling(getNextSibling(hdnNumField))).value="";           
        return false;
    }
    if (!checkNumberValidation(hdnNumField.value) || hdnNumField.value.indexOf(" ") != -1){
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        hdnNumField.value="";
        if(getNextSibling(getNextSibling(hdnNumField)).tagName == "INPUT"){//Fix for 17325674 
            getNextSibling(getNextSibling(hdnNumField)).value=""; 
            getNextSibling(getNextSibling(hdnNumField)).focus();
        }else{
            getNextSibling(getNextSibling(getNextSibling(hdnNumField))).value="";  
            getNextSibling(getNextSibling(getNextSibling(hdnNumField))).focus();
        }
        return;
    }
    var dispNumField ="";
    if(getNextSibling(getNextSibling(hdnNumField)).tagName == "INPUT"){//Fix for 17325674 
        dispNumField = getNextSibling(getNextSibling(hdnNumField));
    }else{
        dispNumField = getNextSibling(getNextSibling(getNextSibling(hdnNumField)));
    }
    if(hdnNumField.value != ""){
       updatedValue = hdnNumField.value.replace( ".", gDecimalSymbol);
       dispNumField.value = updatedValue;
    }        
    return;
}

function getCalcAmount(amount){
    amount = amount.replace(gDecimalSymbol,".");
    return amount;
}

var responseDom = "";
function fndispImage(accno,kvalue,brn){	 
    var p_gAction = gAction;
    gAction = "DISPCUSTIMAGE";
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+mainWin.UserId+'</USERID><BRANCH>'+brn+
    '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>'+functionId+'</FUNCTIONID><ACTION>DISPCUSTIMAGE</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><ADDL><PARAM><NAME>ACCNO</NAME><VALUE>'+ accno +'</VALUE></PARAM><PARAM><NAME>KVALUE</NAME><VALUE>'+ kvalue +'</VALUE></PARAM></ADDL>' +
    '</FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
  var requestDom = loadXMLDoc(requsetStr);
    responseDom = fnPost(requestDom, "FCUBSSignatureServlet", functionId);
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            if(selectSingleNode(responseDom, "//FCUBS_BODY/REC")){
                loadSubScreenDIV("ChildWin", "CustomerSignView.jsp?");
            }else{
                mask();
                if(kvalue == 'S')
                    showAlerts(fnBuildAlertXML('FC-MAINT54', 'E','',brn), 'E');
                else
                    showAlerts(fnBuildAlertXML('FC-MAINT55', 'E','',brn), 'E');
                alertAction = "UNMASK";
            }
        }else{
            mask();
            if(kvalue == 'S')
                showAlerts(fnBuildAlertXML('FC-MAINT54', 'E','',brn), 'E');
            else
                showAlerts(fnBuildAlertXML('FC-MAINT55', 'E','',brn), 'E');
            alertAction = "UNMASK";
        }
    }    
    gAction = p_gAction;
}

function fndispCustbal(accno,brn) {    
    var p_gAction = gAction;
    gAction = "CUSTACCBAL";
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+mainWin.UserId+'</USERID><BRANCH>'+brn+'</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>'+functionId+'</FUNCTIONID><ADDL><PARAM><NAME>ACCNO</NAME><VALUE><![CDATA[' + accno + ']]></VALUE></PARAM></ADDL><ACTION>CUSTACCBAL</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    responseDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            loadSubScreenDIV("ChildWin", "CustomerBalance.jsp?");
        }else{
            mask();
            showAlerts(fnBuildAlertXML('FC-MAINT58', 'E'), 'E');
            alertAction = "UNMASK";
            //alert(mainWin.getItemDesc("LBL_INFRA_INVACC"));  
        }
    }
    gAction = p_gAction;
}

function fnGetParentWin() {
    var parentWin = "";
    if (parentSeqNo && parentSeqNo != "") {
        for(var i = 0; i < mainWin.arrChildWindows.length; i++) {
            if (mainWin.arrChildWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
                break;
            }
        }
    }
    return parentWin;
}

var funcErrList = new Array();
function debugs(msg, value,funcName) {    
    if(mainWin.DebugWindowFlg == 'N' && mainWin.DebugFlg == 'Y'){
        var funname = arguments.callee.caller.toString();
        var i = funname.indexOf("{");
        funname = funname.substr(0, i);
        funname = funname.replace(/function/, "");
        funname = funname.substring(0, funname.indexOf("("));
        mainWin.DebugStmt += msg+"~~~"+value+"~~~"+funname+"!!!";
    }else if (mainWin.DebugWindowFlg == 'Y' && mainWin.DebugFlg == 'Y') {
        debugWindow = mainWin.document.getElementById("debugwin").children[0].contentWindow;
        var debugTable = debugWindow.document.getElementById("debugtable").tBodies[0];
        debugWindow.document.getElementById("debugtableHeader").parentNode.style.width = debugTable.parentNode.clientWidth + "px";
        var debugHeaderRow = debugWindow.document.getElementById("debugtableHeader").tBodies[0].rows[0];//static header change
        var newRow = debugWindow.document.createElement("TR");
        var newCell = debugWindow.document.createElement("TD");
        var i = debugTable.rows.length;
        newCell.innerHTML = "<span class='SPNtbltwoC'>" + (i + 1) + "</span>";//sttaic header change
        newCell.className = 'debugTableTD';
        newCell.children[0].style.width = debugHeaderRow.cells[0].children[0].offsetWidth + "px";//static header change
        newRow.appendChild(newCell);

        var newCell = debugWindow.document.createElement("TD");
        if (mainWin.gActiveWindow) {
            var xmlFile = mainWin.gActiveWindow.xmlFileName;
            var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".xml"));
        } else {
            var funcId = mainWin.document.getElementById("fastpath").value.toUpperCase();
        }
        newCell.innerHTML = "<span class='SPNtbltwoC'>" + funcId + "</span>";
        newCell.className = 'debugTableTD';
        newCell.children[0].style.width = debugHeaderRow.cells[1].children[0].offsetWidth + "px";//static header change
        newRow.appendChild(newCell);

        var newCell = debugWindow.document.createElement("TD");
        var d = getDateObject();
        var curr_hour = d.getHours();
        var curr_min = d.getMinutes();
        var curr_sec = d.getSeconds();
        var curr_msec = d.getMilliseconds();
        var time = curr_hour + ":" + curr_min + ":" + curr_sec + ":" + curr_msec;
        newCell.innerHTML = "<span class='SPNtbltwoC'>" + time + " </span>";
        newCell.className = 'debugTableTD';
        newCell.children[0].style.width = debugHeaderRow.cells[2].children[0].offsetWidth + "px";//static header change
        newRow.appendChild(newCell);
        
        var newCell = debugWindow.document.createElement("TD");
        var fname = arguments.callee.caller.toString();
        if(funcName == undefined){            
            var i = fname.indexOf("{");
            fname = fname.substr(0, i);
            fname = fname.replace(/function/, "");
            fname = fname.substring(0, fname.indexOf("("));
            if (fname.substr(0, 6) == " debug") {
                newCell.innerHTML = "<span class='SPNtbltwoC'>" + msg + "</span>";
            } else {
                newCell.innerHTML = "<span class='SPNtbltwoC'>" + fname + "</span>";
            }
            newCell.className = 'debugTableTD';
            newCell.children[0].style.width = debugHeaderRow.cells[3].children[0].offsetWidth + "px";//static header change
            newRow.appendChild(newCell);            
        }else{            
            newCell.innerHTML = "<span class='SPNtbltwoC'>" + funcName + "</span>"; 
            newCell.className = 'debugTableTD';
            newCell.children[0].style.width = debugHeaderRow.cells[3].children[0].offsetWidth + "px";//static header change
            newRow.appendChild(newCell);
        }
        var newCell = debugWindow.document.createElement("TD");
        if (fname.substr(0, 6) == " debug") {
            newCell.innerHTML = "<span class='SPNtbltwoC'>" + value + "</span>";
        } else { // Debug Statements  
            newCell.innerHTML = "<span class='SPNtbltwoC'>" + msg + "</span>";
        }
        newCell.className = 'debugTableTD';
        newCell.children[0].style.width = debugHeaderRow.cells[4].children[0].offsetWidth + "px";//static header change
        newRow.appendChild(newCell);

        var newCell = debugWindow.document.createElement("TD");
        if (fname.substr(0, 6) == " debug") {
            newCell.innertHTML = "<span class='SPNtbltwoC'></span>"; //static header change
        } else { if (value != undefined) {
                if (value.length != undefined) {
                    if (value.length < 50 || value == true) {
                        newCell.innerHTML = "<span class='SPNtbltwoC'>" + value + "</span>";
                    } else {
                        newCell.innerHTML = "<button class='BTNtext' onclick='showfullhtml(event);' value= 'ShowData'>" + mainWin.getItemDesc("LBL_SHOWDATA") + "</button>";
                    }
                }else{
                 newCell.innerHTML = "<span class='SPNtbltwoC'></span>";
               }//static header change
            }else{
               newCell.innerHTML = "<span class='SPNtbltwoC'></span>";
            }//static header change
        }
        newCell.className = 'debugTableTD';
        newCell.children[0].style.width = debugHeaderRow.cells[5].children[0].clientWidth + "px";//static header change
        newRow.appendChild(newCell);

        var newCell = debugWindow.document.createElement("TD");
        if (value != undefined) {
            if (value.length != undefined) {
                if (value.length > 50 || value == true) {
                    newCell.innerHTML = "<label class='LBLinv' for=''></label><input type='hidden' />";
                    newCell.children[0].value = value;
                }
            }
        }
        newCell.className = 'debugTableTD';
        newCell.style.display = 'none';
        newRow.appendChild(newCell);
        debugTable.appendChild(newRow);
    }
}
/*12.1 screen height change start*/		
//REDWOOD_CHANGES
//function fnCalcHgt() { //HTML5 Changes Start
//    if ((typeof(l_tmp_scr_type) != "undefined" && l_tmp_scr_type == "large") && mainWin.document.getElementById("vtab").style.display != "none") {
//        mainWin.showHideVtab();
//    }//HTML5 Changes End
//    var containerDIV = "ChildWin";
//    if (typeof(fromSubScr) == 'undefined')
//        containerDIV = seqNo;
//    var scrWidth = document.getElementById("DIVScrContainer").offsetWidth ;
//    //var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight); //Sudipta
//    var scrHeight = parseInt(mainWin.document.getElementById("mainContent").offsetHeight);
//    if (scrWidth > mainWin.x - 12)
//        scrWidth = mainWin.x - 12;
//  /* var mainDiv = null;
//   if(parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0){
//      mainDiv =  mainWin.document.getElementById("dashboard");
//   }
//   else{
//      mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
//   }*/
//  /* if((typeof(l_tmp_scr_type) != "undefined" && l_tmp_scr_type == "small") || (typeof(parent.l_tmp_scr_type) != "undefined" && parent.l_tmp_scr_type == "small")){
//		if(scrHeight > parseInt(mainDiv.offsetHeight) - 4)
//			 scrHeight = parseInt(mainDiv.offsetHeight) - 4;
//		if(containerDIV == "ChildWin" && scrHeight+document.getElementById("WNDtitlebar").offsetHeight >= parseInt(mainDiv.offsetHeight)){
//			 scrHeight = scrHeight - document.getElementById("WNDtitlebar").offsetHeight;
//		}
//   }
//   else{
//		var parentContainer = "ChildWin";
//		if(parent.seqNo) {
//			parentContainer = parent.seqNo;
//		}
//		if(containerDIV == "ChildWin"){
//			scrHeight =  parent.parent.document.getElementById(parentContainer).offsetHeight - (parent.document.getElementById("WNDtitlebar").offsetHeight);
//		}
//		else{
//			 scrHeight = parseInt(mainDiv.offsetHeight) -4;
//		}
//   }*/
//
//   	parent.document.getElementById(containerDIV).style.width  = document.getElementById("DIVScrContainer").offsetWidth +"px";
//    parent.document.getElementById(containerDIV).children[0].style.width = document.getElementById("DIVScrContainer").offsetWidth -2+"px";
//    parent.document.getElementById(containerDIV).style.height  = scrHeight+"px";
//    parent.document.getElementById(containerDIV).children[0].style.height  = scrHeight+"px";
//    document.getElementById("DIVWNDContainer").style.width =  document.getElementById("DIVScrContainer").offsetWidth +"px";
//    var l_DivFooter = document.getElementById("DIVFooter").offsetHeight; 
//	var l_DivTmpHgt = parseInt(scrHeight)-parseInt(l_DivFooter)-document.getElementById("WNDtitlebar").offsetHeight - 10;
//
//	if(containerDIV == "ChildWin"){
//		l_DivTmpHgt = parseInt(scrHeight)-parseInt(l_DivFooter)-document.getElementById("WNDtitlebar").offsetHeight - 4;
//	}
//    if(document.getElementById("toolbar") !=null)
//        document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) - document.getElementById("toolbar").offsetHeight - 10 + 'px';
//    else
//        document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt)  + 'px';        
//         var divMainTmpChildren = document.getElementById("DIVMainTmp").children;
//    var tempContainerHgt = 0;
//    for(var divCnt = 0 ; divCnt < divMainTmpChildren.length; divCnt++){
//      if(typeof(divMainTmpChildren[divCnt].getAttribute("id")) != "undefined" && (divMainTmpChildren[divCnt].getAttribute("id")) != "mainTabContainer"){
//        tempContainerHgt += divMainTmpChildren[divCnt].offsetHeight; 
//      }
//    }
//    if(document.getElementById("mainTabContainer")){
//		// 12_1_RETRO_12_2_24344238 commented
//        //document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - tempContainerHgt  + "px";
//		// 12_1_RETRO_12_2_24344238 starts
//		if((document.getElementById("DIVMainTmp").offsetHeight- tempContainerHgt) > 200 ){
        //document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - tempContainerHgt  + "px";
//		}else{
//			document.getElementById("DIVMainTmp").style.overflow = "auto";
//		}
//		// 12_1_RETRO_12_2_24344238 ends
//         document.getElementById("mainTabContainer").style.width = scrWidth -1 + "px";//static header change
//        if (document.getElementById("SYS_TBL_TABS"))
//            document.getElementById("SYS_TBL_TABS").style.width = scrWidth - 1 + "px";//static header change
//    }
//    if(!document.getElementById("mainTabContainer")){
//      document.getElementById("DIVMainTmp").style.overflowY = 'auto';
//    }    
//    if (containerDIV == "ChildWin") {
//        if (parent.seqNo) {
//            containerDIV = parent.seqNo;
//            parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
//        } 
//        var mainScrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight);
//        mainScrHeight = parseInt(mainDiv.offsetHeight) - 4; 
//        parent.parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
//        parent.parent.document.getElementById(containerDIV).children[0].style.height = mainScrHeight + "px";
//        parent.parent.document.getElementById(containerDIV).style.width = mainWin.x -10+ "px";
//        parent.parent.document.getElementById(containerDIV).children[0].style.width = mainWin.x - 10+ "px";
//        parent.document.getElementById("DIVScrContainer").style.height = mainScrHeight - document.getElementById("WNDtitlebar").offsetHeight - 4 +"px";
//        parent.document.getElementById("DIVScrContainer").style.width  = mainWin.x - 10 +"px";
//        parent.document.getElementById("DIVWNDContainer").style.width = mainWin.x - 10+"px";
//        parent.parent.document.getElementById(containerDIV).style.left = "4px";
//    } else {
//        parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
//        setHorizontalPosition(parent.document.getElementById(containerDIV), false, mainWin.x-(scrWidth+12));
//		//Fix for 17259422 end
//        //FCUBS 11.4.1 INFRA Fix ends
//	parent.document.getElementById(containerDIV).children[0].title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);//Fix for 19463987  
//	parent.document.getElementById(containerDIV).children[0].id +=seqNo;//Fix for 19463987  
//
//    }
//    fnExpandCollapseSubSys();
//}
/*12.1 screen height changeend*/
function fnCalcHgt() {//OJET Migration
        mainWin.toggleNavigation('close');
  var containerDIVObj = parent.document.getElementById(seqNo);
  
   var scrWidth = document.getElementById("DIVMainTmp").offsetWidth;
    containerDIVObj.style.width = "100%";
   containerDIVObj.children[0].style.width = "100%";
 document.getElementById("DIVScrContainer").style.width = scrWidth ;
   var scrHeight = parseInt(mainWin.document.getElementById("mainContent").offsetHeight);
  
  if (scrWidth > mainWin.x - 2)//HTML5 Changes
    scrWidth = mainWin.x - 2;//HTML5 Changes
  containerDIVObj.style.width = "100%";
  containerDIVObj.children[0].style.width = "100%";
  containerDIVObj.style.height = scrHeight + "px";
  containerDIVObj.children[0].style.height = scrHeight + "px";
  document.getElementById("DIVWNDContainer").style.width = "100%";
  document.getElementById("DIVMainTmp").style.width = "100%";
  //document.getElementById("mainTabContainer").style.width = "100%";//static header change
  if (document.getElementById("SYS_TBL_TABS"))
    document.getElementById("SYS_TBL_TABS").style.width = "100%";//static header change
  var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
 
  var l_DivTmpHgt = 0;
  if (document.getElementById("toolbar")) {
    l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight - $("#toolbar").outerHeight(true);
  }
  else {
    l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
  }
  //l_DivTmpHgt = l_DivTmpHgt;
  document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) + 'px';
 
  containerDIVObj.style.top = 0  + "px";
  /*if (g_scrType == 'L') {
    setHorizontalPosition(containerDIVObj, false, 0);
  }
  else {*/
    setHorizontalPosition(containerDIVObj, false, 0);
  //}//HTML5 Changes End
  containerDIVObj.children[0].title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);//Fix for 19463987  
  containerDIVObj.children[0].id +=seqNo;//Fix for 19463987  

} 
//REDWOOD_CHANGES
function fnSetPkvals(v_pkVals) {
    l_pkArray = v_pkVals.split("~");    
    for (var i=0; i < l_pkArray.length; i++) {       
        if(l_pkArray[i].indexOf("00:00:00") != -1){
            l_pkArray[i] = l_pkArray[i].substring(0, l_pkArray[i].indexOf("00:00:00") - 1);  
        }               
        var element = document.getElementById(pkFields[i]);
        if(element.type.toUpperCase()=='RADIO'){
            var radioEle = document.getElementsByName(pkFields[i].substring(pkFields[i].lastIndexOf("__")+2, pkFields[i].length));
            for(var lpIdx=0;lpIdx<radioEle.length;lpIdx++){
                if(radioEle[lpIdx].value==l_pkArray[i]){
                    radioEle[lpIdx].checked=true;
                }
            }
        }else{
            element.value =l_pkArray[i];
        }
    }
}
function startDrag(target, e) { /* Zooming Changes */
var evt = window.event || e; 
     /*12_1_RETRO_12_2_23652976 Starts*/
    if(parent.document.getElementById("masker")!= null && parent.document.getElementById("masker").offsetHeight != 0){    
      return false;
    }
    /*12_1_RETRO_12_2_23652976 Ends*/
    var divObj = parent.document.getElementById(target);
	//Fix for 19427463 starts
    var sourceElem = getEventSourceElement(evt);
    if(sourceElem.getAttribute("ID") && sourceElem.getAttribute("ID").indexOf("WNDbutton") > -1) {
        preventpropagate(evt);
        return false;
    }
    //Fix for 19427463 ends
    if (parent.document.getElementById("ChildWin")) {} else {
        mainWin.setActiveWindow(divObj, window);
    }
    divObj.style.cursor = "default";
    var x = evt.clientX;
    var y = evt.clientY;
    var initx = divObj.offsetLeft;
	//9NT1606_12_4_RETRO_12_0_2_26231164 starts 
    if((mainWin.LangCode) && (mainWin.LangCode.toUpperCase() == 'ARB')){
        initx = mainWin.x-divObj.offsetWidth;
    }
	//9NT1606_12_4_RETRO_12_0_2_26231164 ends
    var inity = divObj.offsetTop;
    
    var scrnWidth = 0,
        scrnHeight = 0;
    
    scrnWidth = mainWin.document.getElementById("vtab").offsetWidth + mainWin.document.getElementById("dashboard").offsetWidth - 4 ;//Fix for 18357994
    scrnHeight =  mainWin.document.getElementById("masthead").offsetHeight + mainWin.document.getElementById("dashboard").offsetHeight + //Fix for 18357994
                  mainWin.document.getElementById("taskbar").offsetHeight - 4;//Fix for 18357994
    document.onmousemove = function (e) {
        var evt = window.event || e;
        var ex = evt.clientX;
        var ey = evt.clientY;
        var dx = ex - x;
        var dy = ey - y;
        var ypos = inity + dy;
        var tBarHgt = 0;
        if (parent.document.getElementById("WNDtitlebar") != null) {
            //tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight * -1;
			tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight; // Fix for 19487262
        } else if (typeof (mainWin) != "undefined") {
            tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
        }
        // Fix for 19487262 starts
		/*if((ypos+ parseInt(parent.document.getElementById(seqNo).offsetHeight))  > parseInt(scrnHeight)){
         inity =  scrnHeight -  (parseInt(parent.document.getElementById(seqNo).offsetHeight) + 4);
         divObj.style.top = inity;
        }*/
		if((ypos+ parseInt(divObj.offsetHeight))  > parseInt(scrnHeight)){
			inity =  scrnHeight -  (parseInt(divObj.offsetHeight) + 4);
			divObj.style.top = inity;
        }
        else if (ypos > (tBarHgt + 4)) {
            //divObj.style.left = initx + dx + "px";
			//9NT1606_12_4_RETRO_12_0_2_26231164 starts 
            if((mainWin.LangCode) && (mainWin.LangCode.toUpperCase() == 'ARB')){
            divObj.style.right = mainWin.x - initx -dx + "px";
            }
		    //9NT1606_12_4_RETRO_12_0_2_26231164 ends
            divObj.style.top = inity + dy + "px";
            //initx = initx + dx;
            inity = ypos;
        } 
        else {
            divObj.style.top = (tBarHgt + 4) + "px";
            inity = tBarHgt + 4;
        }
        // Fix for 19487262 starts
		/*if((parseInt(initx) + parseInt(dx) + parseInt(parent.document.getElementById(seqNo).offsetWidth))  > scrnWidth){
         initx =  scrnWidth - (parent.document.getElementById(seqNo).offsetWidth +4);
         parent.document.getElementById(seqNo).style.left = initx + 'px';
        }*/
		if((parseInt(initx) + parseInt(dx) + parseInt(divObj.offsetWidth))  > scrnWidth){
			initx =  scrnWidth - (divObj.offsetWidth +4);
			divObj.style.left = initx + 'px';
        }
		// Fix for 19487262 ends
        else{
        divObj.style.left = initx + dx + "px";
        initx = initx + dx;
        }
    };
    document.onmouseup = function (event) {
        divObj.style.cusor = "default";
        document.onmousemove = null;
        document.onmouseup = null;
    }
}	
//REDWOOD_CHANGES
function maskMultipleClick() { /* Mask Window Changes */
    var x = 0,
        y = 0;

    x = document.body.parentElement.clientWidth;
    y = document.body.parentElement.clientHeight;
    var maskObj = document.getElementById("masker");
    maskObj.style.height = y + "px";
    maskObj.style.width = x + "px";
    maskObj.style.display = "block";
   
}

function unmaskMultipleClick() {
    var maskObj;
    //HTML5 Changes Start
    if (document.getElementById("masker"))  {
        maskObj = document.getElementById("masker");
    } else {
        maskObj = parent.document.getElementById("masker");
    }
    //HTML5 Changes End
    maskObj.style.height = 0 + "px";
    maskObj.style.width = 0 + "px";
  
}		
//REDWOOD_CHANGES
function mask(unmaskTitleBar){	   
//REDWOOD_CHANGES
    /*var x=0,y=0;
    if (self.innerHeight) {
        x = self.innerWidth;
        y = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    } else if (document.body) {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    var maskObj = document.getElementById("masker");
       
    maskObj.style.height = y +"px";	
    maskObj.style.width = x +"px";
    maskObj.style.display="block";
    if (typeof(unmaskTitleBar) != "undefined") {
        maskObj.style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
        document.getElementById("WNDbuttons").disabled = true;
        document.getElementById("WNDbuttons").removeAttribute("href");
    }*/		 
//REDWOOD_CHANGES
}

function unmask(unmaskTitleBar) {  
//REDWOOD_CHANGES
   /* var maskObj;
    if (document.getElementById("masker"))
        maskObj = document.getElementById("masker");
    else
        maskObj = parent.document.getElementById("masker");
    maskObj.style.height = 0 +"px";	
    maskObj.style.width = 0 +"px";
    if (typeof(unmaskTitleBar) != "undefined") {
        document.getElementById("WNDbuttons").disabled = false;
        document.getElementById("WNDbuttons").setAttribute("href", "#");
    }*/	   
//REDWOOD_CHANGES
}

function fnExitSingleViewScreen() {
    unmask();
    var winDivObj = document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

/* FC11.1 Notepad Changes Starts*/

//function fndispInstr(fieldValue,fieldName,fieldId,brnFldValue) { //Bug_36924146 Changes 
  function fndispInstrCore(fieldValue,fieldName,fieldId,brnFldValue) { //Bug_36924146 Changes
    parentWinParams = new Object();
    if(typeof(fieldName) !="undefined" && fieldName.indexOf("REF")!= -1) {
        if(fieldValue !="") {
            parentWinParams.contrefno =  fieldValue;
           // mainWin.dispHref1("CSDINSTQ",seqNo); //FCUBS_CNSL_OTPBANK_36210496 Commented
		   //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
		       mainWin.dispHref1("CSDINSTQ",getSeqNo()); //FCUBS_CNSL_OTPBANK_36210496 Added
		   //Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends 
        }
    } else if(typeof(fieldName) !="undefined" && (fieldName.indexOf("ACC")!= -1 ||fieldName.indexOf("AC")!= -1)) {
        if(fieldValue !="") {
            parentWinParams.accno =  fieldValue;
            parentWinParams.branch = brnFldValue;
           // mainWin.dispHref1("CSDINSTQ",seqNo);//FCUBS_CNSL_OTPBANK_36210496 Commented
		   //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
		      mainWin.dispHref1("CSDINSTQ",getSeqNo()); //FCUBS_CNSL_OTPBANK_36210496 Added
			//Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends
        }
    } else if(typeof(fieldName) !="undefined" && (fieldName.indexOf("CST")!= -1 ||fieldName.indexOf("CUST")!= -1|| fieldName.indexOf("CIF")!= -1)) { /*fieldName.indexOf("CIF")!= -1 Added*/
        if(fieldValue !="") {
            parentWinParams.custno =  fieldValue;
           // mainWin.dispHref1("CSDINSTQ",seqNo); //FCUBS_CNSL_OTPBANK_36210496 Commented
		   //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
		      mainWin.dispHref1("CSDINSTQ",getSeqNo()); //FCUBS_CNSL_OTPBANK_36210496 Added
            //Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends
		}
    }
}
function fnLeapYear(inYear){
    var leapFlag = false;
    if (inYear % 4 == 0){
        if (inYear % 100 == 0){
            if (inYear % 400 == 0) leapFlag = true;
            else leapFlag = false;
        } else{
            leapFlag = true;
        }
    } else{
        leapFlag = false;
    }
    return leapFlag;
}

var autoRedCriteria = "";
function disp_auto_lov(returnflds, frm, bindVars, title, columnHeaders, rednFldLabels, containerId, lovId,exactFetch, dispField, e) {//Exact Fetch changes
    if (hotKeyPressed) {
        hotKeyPressed = false;
        return;
    }
    if (mainWin.autoLovReqd != 'Y')
        return;
    if (isLovOpen) {
        return;
    }
    if(returnFlds!=""){
        return;
    }
    if ((gAction == "")) { //9NT1606_12_2_RETRO_12_0_2_23651196 changes 
        return;
    }
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    autoRedCriteria = srcElem.value;
    //lovSrcElem = getEventSourceElement(event);//Redwood_35283152
	lovSrcElem = event.target;//Redwood_35283152
    autoRedCriteria = lovSrcElem.value;
	/* Fix for 17216155 Commented*/
    /*if (lovSrcElem.getAttribute("PREVAUTOLOVVAL") == lovSrcElem.value) {
        return;
    }*/
    if (lovSrcElem.readOnly == true) {
        return;
    }
    if (this.autoLOVRequired != "Y") {
        return;
    }
    if ('undefined'.indexOf(this.userLOVID) == -1) {
        if (this.userLOVID != " ") {
            lovId = this.userLOVID;
        }
    }
    var isME = "false";
    var singleView = "false";
    recordNum = 0;
    var curr_user = mainWin.UserId;
    var curr_branch = mainWin.CurrentBranch;
    var curr_module = mainWin.CurrentModule;
    var curr_dsnName = mainWin.dsnName;
    var appSource = mainWin.AppSource;
    var langCode = mainWin.LangCode;
    var fetch_value = mainWin.getItemDesc("LBL_FETCH_VALS");
    var Function_id = mainWin.document.getElementById("fastpath").value;
    var appSource = mainWin.AppSource;

    var objRet_flds;
    var objForm_name;
    var objBind_vars;
    if (typeof(g_txnBranch) == 'undefined') {
        g_txnBranch = curr_branch;
    }

   // if (!mainWin.isSessionActive()) return; session expiry change  

    if (returnflds) {
        objRet_flds = returnflds;
    } else {
        objRet_flds = this.ret_flds;
    }
    returnFlds = objRet_flds;
    if (frm) {
        objForm_name = frm;
    } else {
        objForm_name = "form1";
    }

    if (bindVars) {
        objBind_vars = bindVars;
    } else {
        objBind_vars = this.bind_vars;
    }

    this.column_headings = columnHeaders;
    this.rednFldLabels = rednFldLabels;
    if(getPreviousSibling(lovSrcElem)){
        if(getPreviousSibling(getPreviousSibling(lovSrcElem)))
            title = getInnerText(getPreviousSibling(getPreviousSibling(lovSrcElem)));	
    }else{
        if(fnGetParentHTMLElement(lovSrcElem))
            if(getPreviousSibling(fnGetParentHTMLElement(lovSrcElem)))
                title = getInnerText(getPreviousSibling(fnGetParentHTMLElement(lovSrcElem)));	
    }
    this.title = mainWin.getItemDesc("LBL_LISTOF_VAL") + " " + title;

    strReduc = this.reduction_criteria;
    arrReduc = new Object();
    numReduc = string_parser(strReduc, '~', arrReduc);

    arrRednLabels = new Object();
    string_parser(rednFldLabels, '~', arrRednLabels);

    var recNum = 0;
    var inputBoxName;
    var elementsLength;
    //Fix for 17233213 start
   /* if (getPreviousSibling(srcElem)) {
        if (getPreviousSibling(srcElem).tagName) {
            if (getPreviousSibling(srcElem).tagName != "IMG") {
                inputBoxName = getPreviousSibling(srcElem).name;
                elementsLength = document.getElementsByName(inputBoxName).length;
            }
        }
    }*/

    if (recordNum < 0) recordNum = 0;
    inputBoxName = lovSrcElem.name;
    elementsLength = document.getElementsByName(inputBoxName).length;
    //Fix for 17233213 end
    if (elementsLength > 0) {
        if (document.getElementsByName(inputBoxName)[0].ownerDocument) {
            if (document.getElementsByName(inputBoxName)[0].ownerDocument.title.indexOf('Single Record View') > -1) {
                elementsLength = 1;
                singleView = "true";
            }
        }
    }
    if (elementsLength == 1) {
        recordNum = 0;
    } else {
        tmpElem = srcElem;
        while (tmpElem.tagName != "TR") {
            tmpElem = tmpElem.parentNode;
            if (tmpElem == null) {
                recordNum = 0;
                break;
            }
        }
        if (tmpElem) {
            if (tmpElem.rowIndex > 0) {
                isME = "true";
                lovBlockObj = tmpElem;
                while (lovBlockObj.tagName != "TABLE") {
                    lovBlockObj = lovBlockObj.parentNode;
                    if (lovBlockObj && lovBlockObj.id && lovBlockObj.id == "TblQuery") {
                        isME = "false";
                    }
                }
                //recordNum = tmpElem.rowIndex ; //21147471 //REDWOOD_35457560 commented
				recordNum = getRowIndex(e) - 1;//REDWOOD_35457560
                //dbIndexArray[lovBlockObj.getAttribute("DBT")] = tmpElem.rowIndex ;//21147471  //bug_27182547
				dbIndexArray[lovBlockObj.getAttribute("DBT")] = tmpElem.rowIndex+1 ;//21147471  //bug_27182547
				 
				if (recordNum <= 0) recordNum=0; //REDWOOD_35457560
                if (isME == "false") recordNum = 0;
            } else recordNum = 0;
        }
    }

    var cpy_bind_flds = objBind_vars;
    if (! (cpy_bind_flds == "")) {
        var bind_var_arr1 = new Object();
        var value = new Object();
        var type = new Object();
        var bind_size1 = string_parser(cpy_bind_flds, '~', bind_var_arr1);
        for (m = 0; m < bind_size1; m++) {
            var bind_str1 = new Object();
            var cpy_bind_var_arr1 = bind_var_arr1[m];
            var bind_sub_size1 = string_parser(cpy_bind_var_arr1, '!', bind_str1);
            var bind_str1Array;
            if (singleView == "true") {
                bind_str1Array = parent.document.getElementsByName(bind_str1[0]);
            } else {
                bind_str1Array = document.getElementsByName(bind_str1[0]);
            }
            if (bind_str1Array.length > 1) {
                var rowElem = bind_str1Array[0];
                var bindRecNum = 0;
                while (rowElem.tagName != "TABLE") {
                    rowElem = rowElem.parentNode;
                    if (rowElem == null) {
                        bindRecNum = 0;
                        break;
                    }
                }
                if (rowElem) {
                    //if (rowElem.getAttribute("DBT")) bindRecNum = dbIndexArray[rowElem.getAttribute("DBT")] - 1;
                    if (rowElem.getAttribute("DBT")) bindRecNum = dbIndexArray[rowElem.getAttribute("DBT")] ; //21147471 
                    else bindRecNum = 0;
                }
                value[m] = getFieldData(bind_str1Array[bindRecNum]);
            } else {
                value[m] = getFieldData(bind_str1Array[0]);
            }
            type[m] = bind_str1[1];
        }
        var strdel = "";
        for (l = 0; l < m - 1; l++) {
            strdel = strdel + value[l] + "!" + type[l] + "~";
        }
        strdel = strdel + value[l] + "!" + type[l];
        cpy_bind_flds = strdel;
    }
   
    var lovType = 'Y';
    screenType = mainWin.gActiveWindow.screenType; //FCUBS10.3_WebBranch LOV change
    if (screenType == "WB") {
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
    }
    if(typeof(autoRedCriteria) =="undefined" || autoRedCriteria == "" || autoRedCriteria ==null) {
        var field_namesArr = returnFlds.split("~");
        var field_names_recNum = parseInt(recordNum, 10);
        for (var i = 0; i < field_namesArr.length; i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") == -1)  fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
				for (var j = 0; j < lovBlkObj.length; j++) {
                         var lovFldObj = "";
                        if(lovBlkObj[j].children.length > 0){
                            if(!lovBlkObj[j].children[1]){
                                lovFldObj = lovBlkObj[j].children[0].children[0];
								if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
                            }else{
                                lovFldObj = lovBlkObj[j].children[1];
                            }
                        }
                        if(lovFldObj.name == fldName){
                            lovFldObj.value = "";
                            
                            if (lovFldObj.type.toUpperCase() == 'CHECKBOX') {
                                lovFldObj.checked = false;
                            }
                        }              
                  }
            } else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                        document.getElementById(field_namesArr[i]).checked = false;
                    } else {
                        document.getElementById(field_namesArr[i]).value = "";
                        if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1) 
                            //getNextSibling(document.getElementById(field_namesArr[i])).value = "";
                            fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                    }
                } else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        document.getElementsByName(fldName)[field_names_recNum].value = "";
                        if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1) 
                            //getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = "";
                            fireHTMLEvent(document.getElementsByName(fldName)[field_names_recNum], "onpropertychange"); //19224295
                    }
                }
            }
        }
		returnFlds = "";
        return false;
    }
/* security fixes for WF starts */
    var 
    l_Params  = "title="           + title;
    l_Params += "&SourceCode="     + "FLEXCUBE"
    l_Params += "&containerId="    + containerId;
    l_Params += "&returnflds="     + replaceTilde(returnflds);
    /*SFR:17439180 : Fix for 17351640 starts*/
    if (typeof(cpy_bind_flds) != "undefined" &&cpy_bind_flds != null && cpy_bind_flds!="") {
      var tempCpy_bind_fldsr = cpy_bind_flds;
      tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, "/", "_SLH_");
      tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr,  "#", "_HASH_");
      tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, "(", "_OPARAN_");
	  tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, ")", "_CPARAN_");
	  tempCpy_bind_fldsr = replaceAllChar(tempCpy_bind_fldsr, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
      l_Params += "&bindVars="       + replaceTilde(tempCpy_bind_fldsr);
    }
    else{
      l_Params += "&bindVars="       + replaceTilde(cpy_bind_flds);
    }
    /*SFR:17439180 : Fix for 17351640 Ends*/
    l_Params += "&columnHeaders="  + replaceTilde(columnHeaders);
    l_Params += "&rednFldLabels="  + replaceTilde(rednFldLabels);
    l_Params += "&lovId="          + lovId ;
    l_Params +="&screentype="      + screenType; 
    l_Params +="&isME="            +isME;
    l_Params +="&singleView="      +singleView;
    l_Params +="&lovType="         + lovType;
	//Change for not sending the query to server
    //l_Params +="&query_text="      + this.query_text;
    l_Params +="&data_type_str="   + replaceTilde(this.data_type_str);
    l_Params +="&column_headings=" + this.chdr;
    l_Params +="&fetch_records="   + this.fetch_records;
    l_Params +="&selectDB="        + this.selectDB;
    l_Params +="&PageSize="        + this.pageSize;
    l_Params +="&numReduc="        + numReduc;
    l_Params +="&objBind_vars="    + replaceTilde(objBind_vars);
    l_Params +="&objRet_flds="     + replaceTilde(objRet_flds);  
    l_Params +="&objForm_name="    + objForm_name;
    l_Params +="&appSource="       + appSource;
    l_Params +="&curr_dsnName="    + curr_dsnName;
    l_Params +="&curr_module="     + curr_module;
    l_Params +="&functionId="      + Function_id;
    l_Params +="&rednCriteria="    + replaceTilde(strReduc);
/* security fixes for WF ends */
/*Fix for 18678458 -Exact Fetch changes starts*/
    var openLOVFlag = getAutoLovResults(this.query_text, this.data_type_str, cpy_bind_flds, this.pageSize, this.selectDB, lovId, containerId, Function_id, autoRedCriteria,this.reduction_criteria, recordNum, isME,dispField, exactFetch,this.indexFlds);
    isAutoLOVOpened = false;    
    if(openLOVFlag && "Y" == exactFetch){      
    focusReqd = false;
    focusField = dispField;
    alert(mainWin.getItemDesc("LBL_EXACT_FETCH"));  
    dispField.value = "";
    returnFlds = "";
    return false;
    }
/*Fix for 18678458 -Exact Fetch changes ends*/
    if (openLOVFlag) {
        isAutoLOVOpened = true;
        displayAutoLov(l_Params, autoRedCriteria);
    }else {
		returnFlds = "";
    }
}

function getAutoLovResults(Query, Datatypes, Bindvars, PageSize, selectDB, lovId, containerId, functionId, reductionCriteria, reduction_fields, recordNum, isME, exactFetch) {//Exact fetch changes
    //inDate = setActionTime();
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    l_sub_str = new Object();
    var reductionValues = buildReductionValues(reductionCriteria, reduction_fields, exactFetch);//Eaxctfetch changes
    //Fix for 18678458 -Index Basedsearch changes start
var indexRequired = "";
    var minIndexLength = "";
    var filedIndexValue = "";
    var reductionValue = "";
    var countIndexField = 0;
    var firstIndexField = 0;
    if(typeof(indexFlds) != "undefined" && indexFlds != "" && indexFlds.indexOf("Y") != -1){
    var indexFieldList= indexFlds.split("~");
    if(reductionValues != ""){     
    var reductionFieldValues= reductionValues.split("|");
    for(var i=0; i<1 ;i++){
      reductionValue=reductionFieldValues[i].split("!")[1];
      reductionValue=reductionValue.substring(0,reductionValue.lastIndexOf("_PCT_"));
      var tmp_redValue = replaceAll(reductionValue,"_PCT_","");
      filedIndexValue=indexFieldList[i];
      if(filedIndexValue.indexOf("!") != -1){
        indexRequired=filedIndexValue.split("!")[0];
        minIndexLength=filedIndexValue.split("!")[1];
        if("Y" == indexRequired && tmp_redValue.length < minIndexLength){
          countIndexField++;
        }else  if("Y" == indexRequired && tmp_redValue.length >= minIndexLength){
        countIndexField = 0;
        break;
        }
      }
    }
    }
    if(countIndexField >0){
      parent.alert(parent.mainWin.getItemDesc("LBL_INDEX_ALERT_AUTOLOV")); 
      dispField.value ="";
      return false;
    }
    }
//Fix for 18678458 -Index Basedsearch changes end
    var serverURL = "lovfetchdata?";
    //serverURL += "Query=" + Query;
/* security fixes for WF starts */
    serverURL += "&Datatypes=" + replaceTilde(Datatypes);
   /*SFR:17439180 : Fix for 17351640 starts*/
    if (typeof(Bindvars) != "undefined" && Bindvars != null && Bindvars!="") {
      var tempBindvars = Bindvars;
      tempBindvars = replaceAllChar(tempBindvars, "/", "_SLH_");
      tempBindvars = replaceAllChar(tempBindvars, "#", "_HASH_");//fix for 17378652
      tempBindvars = replaceAllChar(tempBindvars, ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  tempBindvars = replaceAllChar(tempBindvars, "(", "_OPARAN_");
	  tempBindvars = replaceAllChar(tempBindvars, ")", "_CPARAN_");
	  tempBindvars = replaceAllChar(tempBindvars, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
      serverURL += "&Bindvars=" + replaceTilde(tempBindvars);
    }
    else{
      serverURL += "&Bindvars="+replaceTilde(Bindvars);
    }
    /*SFR:17439180 : Fix for 17351640 Ends*/ 
/* security fixes for WF ends */
    serverURL += "&exactFetch=" + exactFetch;//Exact fetch changes 
    serverURL += "&PageSize=" + PageSize;
    serverURL += "&selectDB=" + selectDB;
    serverURL += "&lovId=" + lovId;
    serverURL += "&containerId=" + containerId;
    serverURL += "&functionId=" + functionId;
    serverURL += "&ascndg=" + 1;
    serverURL += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
    serverURL += "&isAutoLOV=Y" ;
   // serverURL += "&seqNo=" +getSeqNo(); //logging changes
    /*SFR:17439180 : Fix for 17351640 starts*/
    if (typeof(reductionValues) != "undefined" && reductionValues != null && reductionValues!="") {
      var tempReductionValues = reductionValues;
      tempReductionValues = replaceAllChar(tempReductionValues, "/", "_SLH_");
      tempReductionValues = replaceAllChar(tempReductionValues, "#", "_HASH_");//fix for 17378652
      tempReductionValues = replaceAllChar(tempReductionValues, "&", "_AMP_"); //fix for 18312338
      tempReductionValues = replaceAllChar(tempReductionValues, ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  tempReductionValues = replaceAllChar(tempReductionValues, "(", "_OPARAN_");
	  tempReductionValues = replaceAllChar(tempReductionValues, ")", "_CPARAN_");
	  tempReductionValues = replaceAllChar(tempReductionValues, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
      serverURL += "&reductionValues=" + tempReductionValues;
    }
    else{
      serverURL += "&reductionValues=" + reductionValues; 
    }
    /*SFR:17439180 : Fix for 17351640 Ends*/
   // serverURL +="&txnBranch="+txnBranch; //FCUBS 11.4.0 AUTO LOV ISSUE
	serverURL +="&txnBranch="+g_txnBranch;//FCUBS 11.4.0 AUTO LOV ISSUE
    var objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", encodeURI(serverURL), false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    var t = getDateObject();
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    objHTTP.send(null);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end 
    
    t = getDateObject();
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    var LOVResponseDOM = objHTTP.responseXML;
    var resultCount = getNodeText(LOVResponseDOM.childNodes[0]).split("!").length - 1;
    //appendDebug(LOVResponseDOM); //Logging changes
    if(resultCount == 0 || resultCount >= 2) {
        var field_namesArr = returnFlds.split("~");
        var field_names_recNum = parseInt(recordNum, 10);
        for (var i = 0; i < field_namesArr.length; i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") == -1) 
                fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0; j < lovBlkObj.length; j++) {
                 var lovFldObj = "";
                        if(lovBlkObj[j].children.length > 0){
                            if(!lovBlkObj[j].children[1]){
                                if(!lovBlkObj[j].children[0].children[0]){
                                    lovFldObj = lovBlkObj[j].children[0];
                                }else{
                                    lovFldObj = lovBlkObj[j].children[0].children[0];
                                }
								if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
                            }else{
                                lovFldObj = lovBlkObj[j].children[1];
                            }
                        }
                        if(lovFldObj.name == fldName){
                            lovFldObj.value = "";
                            
                            if (lovFldObj.type.toUpperCase() == 'CHECKBOX') {
                                lovFldObj.checked = false;
                            }
                        }              
                }
            } else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                        document.getElementById(field_namesArr[i]).checked = false;
                    } else {
                        document.getElementById(field_namesArr[i]).value = "";
                        if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1) 
                            getNextSibling(document.getElementById(field_namesArr[i])).value = "";
                    }
                } else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        document.getElementsByName(fldName)[field_names_recNum].value = "";
                        if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1) 
                            getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = "";
                    }
                }
            }
        }
        if (resultCount == 0) {
            autoRedCriteria = "";
        }
      // fnpostAction('LOVDATA',LOVResponseDOM);
        return true;
    }

    if (resultCount == 1) {
        var field_namesArr = returnFlds.split("~");
        var field_names_recNum = parseInt(recordNum, 10);
        var fieldValuesArr = new Array();
        var resValue = getNodeText(LOVResponseDOM.childNodes[0]).split("!")[0].split("~");
        for (var i = 0; i < resValue.length - 1; i++) {
			 //Bug 17065714 Changes
			 if(resValue[i].indexOf("_EXCL_") != -1){//12.0.3 citi_dev fix start
                var re = new RegExp('_EXCL_', "g");
                resValue[i] =  resValue[i].replace(re, "!");
            }//12.0.3 citi_dev fix end
			
		    if(resValue[i].indexOf("&amp;") != -1){
            	resValue[i]=resValue[i].replace("&amp;","&");
            }
            if(resValue[i].indexOf("&apos;") != -1){
            	resValue[i]=resValue[i].replace("&apos;","'");
            }
            if(resValue[i].indexOf("&lt;") != -1){
            	resValue[i]=resValue[i].replace("&lt;","<");
            }
            if(resValue[i].indexOf("&gt;") != -1){
            	resValue[i]=resValue[i].replace("&gt;",">");
            }
		    //Bug 17065714 Changes
            fieldValuesArr[i] = resValue[i];
        }
        for (var i = 0; i < field_namesArr.length; i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") == -1) 
                fldName = field_namesArr[i];

            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0; j < lovBlkObj.length; j++) {
                  var lovFldObj = "";
                    if(lovBlkObj[j].children.length > 0){
                        if(!lovBlkObj[j].children[1]){
                            lovFldObj = lovBlkObj[j].children[0].children[0];
							if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
                        }else{
                            lovFldObj = lovBlkObj[j].children[1];
                        }
                    }
                     if(lovFldObj.name == fldName){
                        lovFldObj.value = fieldValuesArr[i];
                        fireHTMLEvent(lovFldObj, "onpropertychange");//19224295
                        if (lovFldObj.type.toUpperCase() == 'CHECKBOX') {
                        if (typeof(lovFldObj.getAttribute("ON")) != "undefined") {
                            if (lovFldObj.getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y') {
                                lovFldObj.checked = true;
                            }else {
                                lovFldObj.checked = false;
                            }
                        }else {
                            if (fieldValuesArr[i] == 'Y') {
                                lovFldObj.checked = true;
                            }else {
                                lovFldObj.checked = false;
                            }
                        }
                    }
                  }
                }
            } else {
                if (field_namesArr[i] !="" && document.getElementById(field_namesArr[i])) {
                    if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                        if (typeof(getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                            if (document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i]) {
                                document.getElementById(field_namesArr[i]).checked = true;
                            } else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        } else {
                            if (fieldValuesArr[i] == 'Y') {
                                document.getElementById(field_namesArr[i]).checked = true;
                            } else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        }
                    } else {
                        var reg = new RegExp('<br/>', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
                        document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                        if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1) 
                            fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                            //getNextSibling(document.getElementById(field_namesArr[i])).value = fieldValuesArr[i];
                    }
                } else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                      //Fix for 17216155
                      if (document.getElementsByName(fldName)[field_names_recNum].type.toUpperCase() == 'CHECKBOX') {
                        if ( typeof(document.getElementsByName(fldName)[field_names_recNum]).getAttribute("ON") != "undefined"  && document.getElementsByName(fldName)[field_names_recNum].getAttribute("ON") != null) { 
                          if (document.getElementsByName(fldName)[field_names_recNum].getAttribute("ON") == fieldValuesArr[i]) {
                            document.getElementsByName(fldName)[field_names_recNum].checked = true;
                          } else {
                            document.getElementsByName(fldName)[field_names_recNum].checked = false;
                          }
                        } else {
                          if (fieldValuesArr[i] == 'Y') {
                            document.getElementsByName(fldName)[field_names_recNum].checked = true;
                          } else {
                            document.getElementsByName(fldName)[field_names_recNum].checked = false;
                          }
                        }
                      } else {
                       //Fix for 17216155
                        var reg = new RegExp('<br/>', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
                        document.getElementsByName(fldName)[field_names_recNum].value = fieldValuesArr[i];
                        if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1) 
                            fireHTMLEvent(document.getElementsByName(fldName)[field_names_recNum], "onpropertychange"); //19224295
                        //getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = fieldValuesArr[i];
                      }
                       //Fix for 17216155
                    }
                }
            }
        }
       // fnpostAction('LOVDATA',LOVResponseDOM);
        return false;
    }
}

function displayAutoLov(l_Params, autoRedCriteria) {
    if (typeof(g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    } else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    l_Params +="&autoRedCriteria=" + autoRedCriteria;
    mask();
    loadSubScreenDIV("ChildWin", "LOV.jsp?" + l_Params);
}

function buildReductionValues(criteria, fields,exactFetch){//Fix for 18678458 -Exact Fetch changes)
    var reductionFldStr = fields.split("~");
    var reductionVals = "";
    for (var i=0;i<reductionFldStr.length;i++) {
        var reductionFlds = (reductionFldStr[i].split("!"))[0];
/* security fixes for WF starts */
        //reductionVals += reductionFlds+"!%";
        //Fix for 18678458 -Exact Fetch changes starts
        if("Y" == exactFetch){
        reductionVals += reductionFlds+"!";
        }else{
        reductionVals += reductionFlds+"!_PCT_";
        } 
       //Fix for 18678458 -Exact Fetch changes ends
        if (i < reductionFldStr.length-1) {
            //reductionVals += "~";
            reductionVals += "|";

        }
    }
    criteria = replaceAllChar(criteria, "%", "_PCT_");
    if(criteria.indexOf("_PCT_") ==-1){
		reductionVals = reductionVals.substring(0, reductionVals.indexOf("!")+1) + criteria + reductionVals.substring(reductionVals.indexOf("!")+1, reductionVals.length);
    }else{
		reductionVals = reductionVals.substring(0, reductionVals.indexOf("!")+1) + criteria + reductionVals.substring(reductionVals.indexOf("!")+6, reductionVals.length);
    }
    return reductionVals; 
/* security fixes for WF ends*/ 
}

function handleScrObj(scrObj,e){
    var e = window.event || e;
    if(e.keyCode == 9 && !e.shiftKey){
        document.getElementById("WNDbuttons").focus();   
        preventpropagate(e);
        return false;
    }
    return true;
}

function fnHandleScrBtn(e) {
    var event = window.event || e;
    var srcElement = getEventSourceElement(e);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (event.keyCode == 27) {
    if(document.getElementById('queryCriteria'))
        fnExitSumCriteria(event);
    else if(document.getElementById('qCriteriaName'))
        fnExitSumQueryCriteria(event);
    document.getElementById("BTN_EXIT").focus();
    return;
    }
    if (event.shiftKey && event.keyCode == 9) {

        if (srcElement.className.indexOf("WNDcls") != -1) {
            if (document.getElementById("BTN_EXIT") != null)
                document.getElementById("BTN_EXIT").focus();
            else if (document.getElementById("BTN_EXIT_IMG"))
                document.getElementById("BTN_EXIT_IMG").focus();
            else
                document.getElementById("BTN_OK").focus();
        } else if (srcElement.id != "qryCriteriaName") {
            document.getElementById("WNDbuttons").focus();
        } else if (srcElement.id == "qryCriteriaName")
            document.getElementById("BTN_CANCEL").focus();
        if (srcElement.id == "criteriaName") {
            document.getElementById("BTN_CANCEL").focus();
        } else if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("BTN_OK")) {
                document.getElementById("BTN_OK").focus();
            } else if (document.getElementById("qryCriteriaName"))
                document.getElementById("qryCriteriaName").focus();
            else if (document.getElementById("deleteCriteria"))
                document.getElementById("deleteCriteria").focus();
        } else if (srcElement.id == "BTN_OK") {
            if (document.getElementById("REMARKS")) {
                document.getElementById("REMARKS").focus();
            }
        } else if (srcElement.id == "resultsLink")
            document.getElementById("BTN_CANCEL").focus();
        else if (srcElement.id == "deleteCriteria")
            document.getElementById("editCriteria").focus();
        else if (srcElement.id == "editCriteria")
            document.getElementById("resultsLink").focus();
        else if (srcElement.id == "REMARKS") {
            if(document.getElementById("criteriaName")) {
                document.getElementById("criteriaName").focus();
            }
        }
        preventpropagate(event);
        return false;
    } else if (event.keyCode == 9) {
        if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("criteriaName"))
                document.getElementById("criteriaName").focus();
            else if (document.getElementById("qryCriteriaName"))
                document.getElementById("qryCriteriaName").focus();
            else if (document.getElementById("resultsLink"))
                document.getElementById("resultsLink").focus();
            preventpropagate(e);
            return false;
        }
    } else if (!document.getElementById('queryCriteria')) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            if (getIEVersionNumber() > 0) {
                fireHTMLEvent(srcElement, "onclick");
            } else {
                //eval(srcElement.getAttribute("onclick"));
                var fnEval = new Function("event",srcElement.getAttribute("onclick"));  
                fnEval(event);
            }
            return false;
        }
    }
}

function fnhandleSubScrBtn(e){
    var event = window.event || e;
    var srcElement = getEventSourceElement(event);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(event.keyCode == 13 || event.keyCode == 32){
        if(getIEVersionNumber() > 0) {
            fireHTMLEvent(srcElement,"onclick");
        } else {
            //eval(srcElement.getAttribute("onclick"));
            var fnEval = new Function("event",srcElement.getAttribute("onclick"));  
            fnEval(event);
        }
        return false;
    }
    return true;
}

function getIEVersionNumber() {//ie11 changes starts

    var ua = (navigator.userAgent).toUpperCase();
    var MSIEOffset = ua.indexOf("MSIE ");                    
    if (MSIEOffset == -1) {
        if(ua.indexOf("TRIDENT") != -1 && ua.indexOf("RV:")!= -1){
        var rv=ua.indexOf("RV:");
        return parseFloat(ua.substring(rv+3 ,ua.indexOf(")", rv)));
        }
    } else {
        return parseFloat(ua.substring(MSIEOffset + 5, ua.indexOf(";", MSIEOffset)));
    }
}//ie11 changes ends

function disableCommonKeys(event){
/*Fix for 16654918 and 16785077 Starts*/
    var srcElem = getEventSourceElement(event);
    var type = srcElem.type;
    if (event.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        } else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    /*Fix for 16654918 and 16785077 Ends */
    switch(event.keyCode) {
        case 112: //F1 
        case 114: //F3
        case 118: //F7 
          fnDisableBrowserKey(event);
          preventpropagate(event);
          try {
              event.keyCode = 0;
          } catch(e) {}
          return false;
    }
    
    if (event.ctrlKey == true) {
      switch(event.keyCode) {
        case 66 : //B = Organize Favourities in IE
        case 68 : //D = Add a Favouritie in IE
        case 69 : //E = Search Web in IE
        case 70 : //F = Find in IE
        case 72 : //H = History in IE
        case 73 : //I = Manage Favourities in IE
        case 74 : //J = Manage Feeds in IE
        case 76 : //L = Open in IE
        case 78 : //N = Open in IE
        case 79 : //O = Open in IE
        case 80 : //P = Print in IE
        case 82 : //R = Refresh in IE
        case 87 : //W = Close window in IE
        case 112: //F1 = Help
        case 114: //F3 = Search
        case 116: //F5 = Refresh
          fnDisableBrowserKey(event);
          preventpropagate(event);
          document.getElementById("fastpath").focus();
          try {
              event.keyCode = 0;
          } catch(e) {}
          return false;
      }
    }
}

/****************************/
function showToolbar(funcid, txnstat, authstat, showExecute) {
    setTimeout( function () {//REDWOOD_35381225
    //12012012
    //hideTooolbarIcons();
    /*
    11012012
    if (gActiveWindow || gNumChildWindows > 0){
    } else {
    	return;
    }
    */
    //11012012
    //if (gActiveWindow && gActiveWindow.routingType == "X") {
    if(gAction == "" && mainWin.CurrentBranch != mainWin.HOBranch && typeof (hoFunction) != 'undefined' && hoFunction == 'Y'){
        disableAllTBButtons();
        if (mainWin.BranchEoi == 'N') {
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "flex"; //REDWOOD_CHANGES
        } 
        return;
    }
    if (isBranchEOI && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) == -1) && mainWin.l_OfflineAllowed != 'Y') { //changes for eod cut off //24x7 toolbar
        disableAllTBButtons();
        document.getElementById("EnterQuery").disabled = false;
        document.getElementById("EnterQuery").style.display = "flex";     //REDWOOD_CHANGES  
        return;
    }
    if (typeof(routingType) != "undefined" && routingType == "X") {
        ExtshowToolbar(funcid, txnstat, authstat, showExecute);
        return;
    }
     if  (funcid =="" || funcid.substring(2,3) == "S") {
        //fnDisableAllActions();
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
        	//FCIS10.3 Changes
            if (mainWin.applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = 'BTNiconD';
        /* along with save, the remainting 2 buttons have to be disabled */
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
        /* along with save, the remainting 2 buttons have to be disabled */
        if(gAction == "ENTERQUERY"){
            
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").style.display = "flex";//REDWOOD_CHANGES
            
        }
       
        fnSetImgSrc(actions_arr);
        return;
    }

    var l_Txn_Auth_Stat = "";
    //11012012
    //if (gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") || (gActiveWindow.screenType == "WB")) //FCUBS 10.3 WEBBRANCH CHANGES
    if ((gAction == "NEW" || gAction == "MODIFY") || (screenType == "WB")) //FCUBS 10.3 WEBBRANCH CHANGES
    {
        l_Txn_Auth_Stat = "1~2"; // paTCH fix.
    } else{
          var l_Txn_Auth_Stat   =  gnGetTxnAuthStat();
    }
    /*If txnstat and authstat are passed from FID.js*/
    if(typeof(txnstat) == "undefined"  || (typeof(txnstat) != "undefined" && txnstat == "" )){
        txnstat = l_Txn_Auth_Stat.split("~")[0];               
    }          
    if(typeof(authstat) == "undefined"  || (typeof(authstat) != "undefined" && authstat == "" )){
        authstat = l_Txn_Auth_Stat.split("~")[1];
    }       
    var l_OnceAuth = "N";
    if (mainWin.applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    if (actions_arr) {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
            if (mainWin.applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = 'BTNiconD';
        
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
    }

    var objRights = new Array();
    try {
        //objRights = new fnGetFinalRights();
        objRights = mainWin.document.getElementById("finalFunctionRights").value;
    } catch(e) {
        // do nothing if the user doesn't have rights for the branch
    }

    var finalRightsStr = ""
    /*if (objRights[funcid] != "") 
        finalRightsStr = objRights[funcid];
    */
    var funcidPos = objRights.indexOf(funcid);
    if(funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos)+1, objRights.indexOf(";", funcidPos));
    }
    if (!finalRightsStr) {
        // If it's an invalid function id then return.
        finalRightsStr = "";
    } else if (showExecute) {
        // If Enter Query button is pressed, show the Execute Query button.
        // Don't hide all the buttons. RightsString for ExecuteQuery is 65536~ 
        //finalRightsStr = "65536~"; 
    }

    var j = mainWin.finalarr.length;
    if (funcid && funcid != "") {
        for (i = 0; i < j; i++) {
            mainWin.finalarr.pop();
        }
        var finalcnt = 0;
        t1 = mainWin.t[txnstat + '+' + authstat];
        var finalActions = new Array();
        var i = 0,
        k = 0;
        var addIndex = 0;
        var l_Testing = "";
        while (finalRightsStr.indexOf('~') != -1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights; temp != 0; temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    if (t1 != null) { //Kals Comenting .. APr 30
                        for (z = 0; z < t1.length; z++) {
                            if (t1[z].toUpperCase() == actions_arr[i + addIndex].toUpperCase()) {
                                if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                                    continue;
                                }
                                /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                                    continue;
                                }*/
                                mainWin.finalarr[k] = actions_arr[i + addIndex];
                                k++;
                                break;
                            }
                        }
                    } else {
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                            continue;
                        }
                        /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                            continue;
                        }*/
                        mainWin.finalarr[k] = actions_arr[i + addIndex];
                        k++;
                    }
                } else l_Testing = l_Testing + "0";

                i++;
            }

            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }

        var lastAction = "";
        var pDoc = document;
        var auth_stat = typeof(pDoc.getElementsByName("AUTH_STAT")[0])!='undefined'?pDoc.getElementsByName("AUTH_STAT")[0]:pDoc.getElementsByName("AUTHSTAT")[0];
        var rec_stat  = typeof(pDoc.getElementsByName("RECORD_STAT")[0])!='undefined'?pDoc.getElementsByName("RECORD_STAT")[0]:pDoc.getElementsByName("TXNSTAT")[0];
        if(isSameMakerId()){
            if(mainWin.finalarr.length>0){
                for(var j=0;j<mainWin.finalarr.length;j++){
                    if (mainWin.finalarr[j]) {
	                    if(mainWin.finalarr[j].toUpperCase() == 'DELETE' ){
	                        mainWin.finalarr.splice(j,1);
	                    }
                    }
                    //Doesn't enable the unlock button before authrorization
                    if(authstat){
                        if(authstat == "U"){
                            if (mainWin.finalarr[j]) {
	                            if(mainWin.finalarr[j].toUpperCase() == 'UNLOCK'){
	                                mainWin.finalarr.splice(j,1);
	                            }
                        	}
                        }
                    }else if(auth_stat){
                    	if(auth_stat.checked == false){
                            if (mainWin.finalarr[j]) {
	                            if(mainWin.finalarr[j].toUpperCase() == 'UNLOCK'){
	                                mainWin.finalarr.splice(j,1);
	    	                    }
                            }
    	                 }
                    }
                 }
            }
        }
        for (i = 0; i < mainWin.finalarr.length; i++) {
            if (mainWin.finalarr[i] == lastAction) {
                var temp = mainWin.finalarr[i + 1];
                mainWin.finalarr[i + 1] = mainWin.finalarr[lastElement];
                for (j = i + 2; j < mainWin.finalarr.length; j++) {
                    temp1 = mainWin.finalarr[j];
                    mainWin.finalarr[j] = temp;
                    temp = temp1;
                }
            }
            if (mainWin.finalarr[i]) {
                document.getElementById(mainWin.finalarr[i]).disabled = false;
                document.getElementById(mainWin.finalarr[i]).style.display = "flex";//REDWOOD_CHANGES
                //document.getElementById(finalarr[i]).className = 'BTNicon';
            }
        }
    }

    fnEnableAcns_OnActionCode(funcid); // action code based
    //If New is enabled then save shud be disabled
    var l_SaveBtn = document.getElementById("Save");
    var l_NewBtn = document.getElementById("New");
    //hOLD Related Code
    if ((gAction == "NEW" || gAction == "MODIFY")) {
     disableAllTBButtons();//added
        for (var l_Cnt = 0; l_Cnt < actions_arr.length; l_Cnt++) {
            if (actions_arr[l_Cnt].toUpperCase() == "HOLD" || ((screenType == "P" || screenType == "T") && actions_arr[l_Cnt].toUpperCase() == "ROLLOVER")) {
                continue;
            }
            document.getElementById(actions_arr[l_Cnt]).disabled = true;
            document.getElementById(actions_arr[l_Cnt]).style.display = "none";
            //document.getElementById(actions_arr[l_Cnt]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES
        //document.getElementById("Save").className = 'BTNicon';
        }
    // If the LATESTVERNO is 1 and Record is UnAuthorized, and Action id Unlock
    // then Hold shud be enabled if its available in list of actions.
    for (var l_Cnt = 0; l_Cnt < mainWin.finalarr.length; l_Cnt++) {
        if (mainWin.finalarr[l_Cnt].toUpperCase() == "HOLD") {
            document.getElementById("Hold").disabled = true;
            document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
            //document.getElementById("Hold").className = 'BTNiconD';
                if (gAction == "NEW") {
                    document.getElementById("Hold").disabled = false;
                    document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
                    //document.getElementById("Hold").className = 'BTNicon';
                } else {
                    var l_txnval = getTxnVal_Mapping("CONTSTAT");
                    if (typeof(holdStatus) != "undefined") if (gAction == "MODIFY" && (l_txnval == "H" || holdStatus.toUpperCase() == "HOLD")) {
                        document.getElementById("Hold").disabled = false;
                        document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
                        //document.getElementById("Hold").className = 'BTNicon';
                    }
                }
        }
    }
    
    if (gAction == "") {
        document.getElementById("EnterQuery").disabled = false;
        document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
    }
    //lIQUIDATE case
    if (gAction == "LIQUIDATE") {
        if (mainWin.finalarr) {
            for (var l_Itr = 0; l_Itr < mainWin.finalarr.length; l_Itr++) {
                document.getElementById(mainWin.finalarr[l_Itr]).disabled = true;
                document.getElementById(mainWin.finalarr[l_Itr]).style.display = "none";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //Rollover case
    if (gAction == "ROLLOVER") {
        if (mainWin.finalarr) {
            for (var l_Itr = 0; l_Itr < mainWin.finalarr.length; l_Itr++) {
                document.getElementById(mainWin.finalarr[l_Itr]).disabled = true;
                document.getElementById(mainWin.finalarr[l_Itr]).style.display = "none";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //fcis Delegate case
    if (mainWin.applicationName == "FCIS") {
        if (gAction == "DELEGATE") {
            if (mainWin.finalarr) {
                for (var l_Itr = 0; l_Itr < mainWin.finalarr.length; l_Itr++) {
                    document.getElementById(mainWin.finalarr[l_Itr]).disabled = true;
                    document.getElementById(mainWin.finalarr[l_Itr]).style.display = "flex";//REDWOOD_CHANGES
                    //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
                }
            }
            enableSave();
        }
    }
    fnSetImgSrc(actions_arr);
    //FCUBS10.3_WebBranch Changes
    //11012012
    //if (gActiveWindow && gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction != "REVERSE") && (gActiveWindow.gAction != "VIEW") && (gActiveWindow.gAction != "REMOTEAUTH") && (gActiveWindow.gAction != "GENERATE") && (gActiveWindow.gAction != "AUTH")) {
    if (screenType == 'WB' && (gAction != "REVERSE") && (gAction != "VIEW") && (gAction != "REMOTEAUTH") && (gAction != "GENERATE") && (gAction != "AUTH")) {
            fnEnableHoldButton();
        }
    //11012012
    //if (gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH")) {
    if (screenType == 'WB' && (gAction == "REMOTEAUTH" || gAction == "AUTH")) {
            fnEnableAuth();
         }
   //for enabling reverse in WB 
   //FCUBS10.3_WebBranch Changes
        if ((gAction == "REVERSE") || (gAction == "GENERATE")) {
            fnEnableReverseButton();
            //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
            //fnEnableGenerateButton();
			if(typeof(mainWin.functionDef[funcid])!="undefined"){
				if (mainWin.functionDef[funcid].adviceReqd == "Y"){
					fnEnableGenerateButton();
				}
			}else{
				fnEnableGenerateButton();
			}
			//9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
         }
    },0);//REDWOOD_35381225
}

// Reddy Prasad added
function fnSetImgSrc(actions_arr)
{
    for (var l_idx = 0; l_idx < actions_arr.length; l_idx++)
    {
        var l_str;
        var l_temp = actions_arr[l_idx];
        l_str = InitCap(l_temp);

        //Murali Preformance tunning
        //while(!parent.frames['Global']){}
        // fnWaitProcess(); TODO

        if (mainWin.applicationName == "FCIS" && actions_arr[l_idx] == "ROLLOVER")
        {
            actions_arr[l_idx] = "DELEGATE";
        }
        if (document.getElementById(actions_arr[l_idx]).disabled)
        {
            //document.getElementById(actions_arr[l_idx]).firstChild.src = theme_imagesPath + "/Toolbar/ic" + l_str + "_D.gif";
            document.getElementById(actions_arr[l_idx]).disabled = true;
            document.getElementById(actions_arr[l_idx]).style.display = "none";
            //12012012
            //document.getElementById(actions_arr[l_idx]).className = "BTNiconD";
        } else
        {
            //document.getElementById(actions_arr[l_idx]).firstChild.src = theme_imagesPath + "/Toolbar/ic" + l_str + ".gif";
            document.getElementById(actions_arr[l_idx]).disabled = false;
            document.getElementById(actions_arr[l_idx]).style.display = "flex";//REDWOOD_CHANGES
            //12012012
            //document.getElementById(actions_arr[l_idx]).className = "BTNicon";
        }
    }
    
    if (document.getElementById("Save").disabled)
    {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = "BTNiconD";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";        
    } else
    {
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES
        //document.getElementById("Save").className = "BTNicon";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    }
}

function hideTooolbarIcons(){
    //11012012
    document.getElementById("TlBarOper").className = "TBgp1";
}

//JS Segregation changes starts.
function getDefaultRightsStr(funcid) {
    var finalRightsStr = "";
    //var objRights = new Array();//Array used to store menu rights
    var objRights = "";
    try {
        //objRights = new fnGetFinalRights();
        objRights = mainWin.document.getElementById("finalFunctionRights").value;

    } catch (e) {
        // do nothing if the user doesn't have rights for the branch
        return;
    }
    /*
    if(objRights[funcid] != "") {
        finalRightsStr = objRights[funcid];
    }
    */
	//change for bug id 14294364 : 11.2 version STDCIF -PROBLEM WITH ROLE RIGHTS [funcid changed to funcid+"+"]
    var funcidPos = objRights.indexOf(funcid+"=");
    if(funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos)+1, objRights.indexOf(";", funcidPos));
    }
    return finalRightsStr;
}
//JS Segregation changes ends.

// returns the final rights array based on function rights
function finalarrBasedOnFuncRights(funcid,txnstat,authstat)
{
	//JS Segregation changes starts.
    var finalRightsStr = getDefaultRightsStr(funcid);
	//JS Segregation changes ends.
    var j = mainWin.finalarr.length;
    l_OnceAuth = getOnceAuth();
    if (funcid && funcid != ""){
        for (i = 0; i < j; i++){
            mainWin.finalarr.pop();
        }
        var finalcnt = 0;
        var finalActions = new Array();
        var i = 0,k = 0;
        var addIndex = 0;
        var l_Testing = "";
        var finalRights = "";
        while (finalRightsStr.indexOf('~') != -1){
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights; temp != 0; temp = temp >>> 1){
                if (temp % 2 != 0){
                    l_Testing = l_Testing + "1";
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') continue;

                        mainWin.finalarr[k] = actions_arr[i + addIndex];
                        k++;
                } else l_Testing = l_Testing + "0";
                i++;
            }
            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }
        var lastAction = "";
        for (i = 0; i < mainWin.finalarr.length; i++){
            if (mainWin.finalarr[i] == lastAction){
                var temp = mainWin.finalarr[i + 1];
                mainWin.finalarr[i + 1] = mainWin.finalarr[lastElement];
                for (j = i + 2; j < mainWin.finalarr.length; j++){
                    temp1 = mainWin.finalarr[j];
                    mainWin.finalarr[j] = temp;
                    temp = temp1;
                }
            }
    
            if (mainWin.finalarr[i]){
                document.getElementById(mainWin.finalarr[i]).disabled = false;
                document.getElementById(mainWin.finalarr[i]).style.display = "block";
                //ocument.getElementById(mainWin.finalarr[i]).className = 'BTNicon';
            }
       }
       return mainWin.finalarr;
    }
}

function ExtfnEnableAcns_OnActionCode(funcid,finalarr,action_arr)
{

    // If no windows are opened then , disable all the actions
    /*
    11012012
    if (gNumChildWindows == 0)
        return;
    */
    /*
    if (gNumChildWindows == 0)
    {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++)
        {
            //document.getElementById(actions_arr[l_Itr]).style.visibility = "hidden";
            //document.getElementById("Save").style.visibility = "hidden";
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById("Save").className = 'BTNiconD';
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").className = 'BTNiconD';
        }
        return;
    }

    if (gNumChildWindows > 0)
    {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++)
        {
            //document.getElementById(actions_arr[l_Itr]).style.visibility = "";
            //document.getElementById("Save").style.visibility = "";
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById("Save").className = 'BTNiconD';
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").className = 'BTNiconD';
        }
    }
    if (funcid == "") {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className ='BTNiconD';
        }
        return;
    }
    */

    //Murali performance tunning
    //while(!parent.gActiveWindow) {}  
    //while(!parent.gActiveWindow.dbDataDOM && parent.gActiveWindow.dbDataDOM!=null){} //ctcb 10.1 lot1 fixes
    //fnWait();

    //setTimeout('fnEnableAcns_OnActionCode()',20);

    //FCJ BranchEoi will be N normal,F - end of finanical input,T - end of transaction input,..
    // in cas eof fcis --> N - Online , T - Offline.
    var l_OfflineAllowed = 'N';
    //11012012
    //var functionId = document.getElementById("fastpath").value.toUpperCase();
    var functionId = mainWin.document.getElementById("fastpath").value.toUpperCase();
    /*
    try
    {
        var xmlDOM = new ActiveXObject('Msxml2.DOMDocument.6.0');
    } catch(e)
    {
        var xmlDOM = new ActiveXObject('Msxml2.DOMDocument.4.0');
    }

    xmlDOM.loadXML(parent.gXmlMenu);
    */
    //11012012
    //var xmlDOM = loadXMLDoc(gXmlMenu);
    var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM,"//*[@FNID = '" + functionId + "']");
    //Changes for new menuXML starts
    if (functionIdNode) {
        for (var i = 0; i < functionIdNode.attributes.length; i++)
        {
            if (functionIdNode.attributes[i].nodeName == "OFFLINEALLOWED")
            {
                l_OfflineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
                break;
            }
        }
    }
    //11012011
    //if (gActiveWindow && gActiveWindow.gAction == "") {
    if (gAction == "") {
        if (dbDataDOM == null) {
            for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {
                if (finalarr[l_Cnt].toUpperCase() == "NEW") {
                    if (mainWin.BranchEoi == 'N') {
                        document.getElementById(finalarr[l_Cnt]).disabled = false;
                        document.getElementById(finalarr[l_Cnt]).style.display = "flex"; //REDWOOD_CHANGES
                        //document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        document.getElementById("EnterQuery").disabled = false;
                        document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
                        //document.getElementById("EnterQuery").className = 'BTNicon';
                    } else {
                        if (l_OfflineAllowed != "Y") {
                            document.getElementById(finalarr[l_Cnt]).disabled = true;
                            document.getElementById(finalarr[l_Cnt]).style.display = "none";
                            //document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                            disableActionsInToolbar();
                        } else {
                            document.getElementById(finalarr[l_Cnt]).disabled = false;
                            document.getElementById(finalarr[l_Cnt]).style.display = "flex";//REDWOOD_CHANGES
                            //document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        }
                    }
                } else {
                    document.getElementById(finalarr[l_Cnt]).disabled = true;
                    document.getElementById(finalarr[l_Cnt]).style.display = "none";
                    //document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                }
            }
        }
    }

    /*if ((gActiveWindow && gActiveWindow.gAction == "ENTERQUERY")) {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
    }
    */
    //11012012
    //if (funcid.charAt(2).toUpperCase() == "S" || (BranchEoi != "N" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1) && gActiveWindow.l_offlineAllowed != 'Y'))
    if (funcid.charAt(2).toUpperCase() == "S" || (mainWin.BranchEoi != "N" && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y'))
    { // Summary case
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++)
        {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).style.display = "none";
            //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").children[0].className = "BTNiconD";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    }
    //showtoolbar tuning
    fnSetImgSrc(action_arr);
    changeSaveImg();
} //fnc

//If the delete button is enabled and once_auth for the record is yes, 
//then disable the delete button
function gnGetOnceAuth()
{
    var l_Once_Auth = 'N';
    //11012012
    //if (gNumChildWindows != 0 && gActiveWindow)
    //{
        if (document.getElementsByName("ONCE_AUTH").length > 0)
        {
            if (document.getElementsByName("ONCE_AUTH")[0].value == "Y") l_Once_Auth = 'Y';
        }
    //}
    return l_Once_Auth;
}

function ExtshowToolbar(funcid, txnstat, authstat, showExecute) {
    var txn_auth_status = new Array(); //Array used to store txn and auth status

    //User just logs in /closes all function id's and toolbar should be disabled
    /*
    11012012
    if (!gActiveWindow || gNumChildWindows == 0) {
        disableAllTBButtons();
        return;
    }*/
    // if function id is null, disable all buttons
    if(typeof(funcid)=='undefined' || funcid==''){
        disableAllTBButtons();
        //if(gActiveWindow.gAction == "ENTERQUERY"){
        if(gAction == "ENTERQUERY"){
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").style.display = "flex";//REDWOOD_CHANGES
            //setInnerText(document.getElementById("EnterQuery").children[0], mainWin.getItemDesc("LBL_EXEC_QUERY"));
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").style.display = "none";
        }
        //hideToolBar();
        return;
    }
    //disabling toolbar on launch of summary, callform, Query, batch screens
    var screenTypes = "SCQB";
    //11012012
    //if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && gActiveWindow.screenType != 'WB') { //FCUBS10.3 WEBBRANCH CHANGES
    if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && screenType != 'WB') { //FCUBS10.3 WEBBRANCH CHANGES
        disableAllTBButtons();
        return;
    }
    //Disabling toolbar for eod status other than N (Also applicable for host screens)
    //11012012
    //if (BranchEoi != "N" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1)&& gActiveWindow.l_offlineAllowed != 'Y') {
    if (/*mainWin.BranchEoi != "N" */ isBranchEOI && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) == -1)&& l_offlineAllowed != 'Y') {//24x7 toolbar
        disableAllTBButtons();
        return;
    }
    //If dbDataDOM is undefined, disable the tool bar.
    /*
    if (!gActiveWindow.dbDataDOM || typeof(gActiveWindow.dbDataDOM) == 'undefined') {
        disableAllTBButtons();
        return;
    }
    */

    // dbDataDom is empty (Screen just launched without any data)
    //11012012
    //if (gActiveWindow.dbDataDOM == null) {
    if (dbDataDOM == null) { 
        disableAllTBButtons();       
        //11012012
        //finalarr = finalarrBasedOnFuncRights(funcid,'','','');
        finalarr = finalarrBasedOnFuncRights(funcid,'','','');
        //function that enables or disables the toolbar
        //11012012
        //ExtfnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
        ExtfnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
        if (mainWin.BranchEoi == 'N') {
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
            //document.getElementById("EnterQuery").className = 'BTNicon';
        }
        //refreshToolBar();
        return;
    } else {
        //Obtain final array based on function rights
        //
        //if (gActiveWindow.screenType != "WB") {
        if (screenType != "WB") {
        finalarr = finalarrBasedOnFuncRights(funcid,'','','');
		}//FC11.0 WB CHANGES
        // Getting txn and auth status
        txn_auth_status = getTxnAndAuthStatus();
         /*If txnstat and authstat are passed from FID.js*/
        if(typeof(txnstat) == "undefined"  || (typeof(txnstat) != "undefined" && txnstat == "" )){
                txnstat =txn_auth_status[0];                 
        }          
        if(typeof(authstat) == "undefined"  || (typeof(authstat) != "undefined" && authstat == "" )){
               authstat =txn_auth_status[1];  
        }   
        if (txn_auth_status) 
        //11012012
        //if (gActiveWindow.screenType == "WB") {
        if (screenType == "WB") {
            if (gAction == "NEW" || gAction == "HOLD" || gAction == "") {
                gAction = "NEW";
                disableAllTBButtons();//fc11.1wb changes
                enableSave();
                             
                // FCUBS 11.4 Confirmation Changes Starts             
                if(typeof(dataObj) != "undefined" && dataObj.action == "ENRICH"){
				if (typeof(mainWin.functionDef[funcid]) != "undefined") //11.4.0 ITR2 SFR 13483671 
				{ //11.4.0 ITR2 SFR 13483671 
                    if (mainWin.functionDef[funcid].slipReqd == "Y") {
                        fnEnableGenerateButton();
                    }
                    if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                        fnEnableConfirmButton();
                    }
                }
				}//11.4.0 ITR2 SFR 13483671 
                
                // FCUBS 11.4 Confirmation Changes Ends
                fnEnableHoldButton();
                enableDeleteForIPR();
                return;
            }
            if (gActiveWindow.gAction == "VIEW") {
                disableAllTBButtons();       
                //11012012
                //gActiveWindow.gAction = 'VIEW';
                gAction = 'VIEW';
                enableDeleteForIPR();
                //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
                if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                    fnEnableGenerateButton();
                }
                //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
		return;
            }
            //11012012
            //if (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH") {
            if (gAction == "REMOTEAUTH" || gAction == "AUTH") {
                disableAllTBButtons();//fc11.1wb changes
                fnEnableAuth();
                fnDisableHoldButton();
                enableDeleteForIPR();
                return;
                //fnDisableHoldButton();
            }
            //11012012
            //if ((gActiveWindow.gAction == "REVERSE") || (gActiveWindow.gAction == "GENERATE")) {
            if ((gAction == "REVERSE") || (gAction == "GENERATE")) {
                disableAllTBButtons();//fc11.1wb changes
		// FCUBS 11.4 Confirmation Changes Starts
                //11012012
                //if(typeof(gActiveWindow.dataObj) != "undefined"){
                if(typeof(dataObj) != "undefined"){
                    if(dataObj.action == "ENRICH"){
                        enableSave();
                        if (mainWin.functionDef[funcid].slipReqd == "Y") {
                            fnEnableGenerateButton();
                        }
                        if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                            fnEnableConfirmButton();
                        }
                    }else{
                        fnEnableReverseButton();
                        fnEnableGenerateButton();
			//9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
			if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                            fnEnableGenerateButton();
			}
                    }
                }
		// FCUBS 11.4 Confirmation Changes Starts
		//9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
                //fnDisableHoldButton();
                return;
                //fnDisableHoldButton();
            }
            return;
        }      
        // gAction == "" means Action is successfully completed & DbDataDome not=""
        //11012012
        //if ((gActiveWindow.gAction == "" || gActiveWindow.gAction == "EXECUTEQUERY" || gActiveWindow.gAction == "VIEWMNTLOG") && (gActiveWindow.dbDataDOM != null)) {
        if ((gAction == "" || gAction == "EXECUTEQUERY" || gAction == "VIEWMNTLOG") && (dbDataDOM != null)) {
            disableAllTBButtons();       
            finalarr = finalarrBasedOnTxnRights(finalarr,funcid,txnstat,authstat);
            //call the function that enables and disables the Tool bar based on the finalArr
            enableOrDisableBasedOnLastAction(finalarr);
            //ExtfnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
            document.getElementById("ExecuteQuery").disabled = true;
            document.getElementById("ExecuteQuery").style.display = "none";
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
            //document.getElementById("EnterQuery").className = 'BTNicon';
            return;    
        }
        //enable and disable buttons according to gAction
        //11012012
        //if (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") {
        if (gAction == "NEW" || gAction == "MODIFY") {
            disableAllTBButtons();
            //enableDeleteForIPR(); TODO
            enableHold();
            enableSave();
            //fnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
            return;
        }
        //11012012
        //if (gActiveWindow.gAction == "LIQUIDATE" || gActiveWindow.gAction == "ROLLOVER" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
        if (gAction == "LIQUIDATE" || gAction == "ROLLOVER" || (mainWin.applicationName == "FCIS" && gAction == "DELEGATE")) {
        //if (gActiveWindow.gAction == "DELETE" || gActiveWindow.gAction == "CLOSE" ||gActiveWindow.gAction == "REOPEN" ||gActiveWindow.gAction == "REVERSE" || gActiveWindow.gAction == "ROLLOVER"|| gActiveWindow.gAction == "CONFIRM"|| gActiveWindow.gAction == "LIQUIDATE" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
            for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).style.display = "flex";//REDWOOD_CHANGES
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
            enableSave();
            return;
        }
        // Problem in obtaining gAction. Disable the toolbar.
        else{
            disableAllTBButtons();
            //hideToolBar();
            return;
        }
    }
}
//17487644 starts
function fnEnableReverseButton(){
    document.getElementById("Reverse").disabled = false;
    document.getElementById("Reverse").style.display = "flex";//REDWOOD_CHANGES
}

function fnEnableGenerateButton() {
    document.getElementById("Generate").disabled = false;
    document.getElementById("Generate").style.display = "flex";//REDWOOD_CHANGES
}
//17487644 ends

//returns onceAuth flg
function getOnceAuth()
{
    var l_OnceAuth = "N";
    //11012012
    //if (applicationName == "FCJ") {
    if (mainWin.applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    return l_OnceAuth;
}

function InitCap(str)
{
    var str = str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
    if (str == "Delegate") str = "Rollover";
    return str;
}

//changes the save button image
function changeSaveImg()
{
    if (document.getElementById("Save").disabled)
    {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = "BTNiconD";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    } 
    else{
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES
        //document.getElementById("Save").className = "BTNicon";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    }

}

function disableAllTBButtons()
{
    if (actions_arr){
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++){
            if (mainWin.applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER"){
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //12012012
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //12012012
        //document.getElementById("Save").className = 'BTNiconD';
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        12012012  
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
    }
    fnSetImgSrc(actions_arr);
    changeSaveImg();
}

//returns the Txn and Auth status
function getTxnAndAuthStatus()
{
    var txn_auth_status = new Array();
    
    var l_Txn_Auth_Stat = "";
    if ((gAction == "NEW" || gAction == "MODIFY")||screenType == 'WB'){
            l_Txn_Auth_Stat = "1~2"; // paTCH fix.
    } else{
        if (routingType == "X") {
            l_Txn_Auth_Stat = fnGetExtTxnAuthStat();
        }else {
            l_Txn_Auth_Stat = gnGetTxnAuthStat();
        }
    }    
    txn_auth_status[0] = l_Txn_Auth_Stat.split("~")[0];
    txn_auth_status[1] = l_Txn_Auth_Stat.split("~")[1];
    
    return txn_auth_status;
}

function fnGetExtTxnAuthStat() {
    //11012012
    //var authStatNode = gActiveWindow.document.getElementsByName("AUTHSTAT");
    var authStatNode = document.getElementsByName("AUTHSTAT");
    var l_AuthVal = getAuthTxnNodeValue(authStatNode);
    /*if (AuthStatNode.checked == true)
        l_AuthVal = AuthStatNode.ON;
    else
        l_AuthVal = AuthStatNode.OFF;
    */  
    //11012012
    //var txnStatNode = gActiveWindow.document.getElementsByName("TXNSTAT");
    var txnStatNode = document.getElementsByName("TXNSTAT");
    var l_TxnVal = getAuthTxnNodeValue(txnStatNode);
    /*if (TxnStatNode.type.toUpperCase() == 'CHECKBOX') {
        if (TxnStatNode.checked == true)
            l_TxnVal = TxnStatNode.ON;
        else
            l_TxnVal = TxnStatNode.OFF;
    } else {
        l_TxnVal = parent.gActiveWindow.document.getElementsByName("TXNSTAT")[0].value;
    }
    */
    return (l_TxnVal + "~" + l_AuthVal);
}

function getAuthTxnNodeValue(objAuthTxn) {
    var authTxnNodeValue = "";
    if (objAuthTxn.length != 0) {
        var tagName = objAuthTxn[0].tagName;
        var type    = objAuthTxn[0].type;
        switch (tagName.toUpperCase()) {
            case 'OJ-SELECT-ONE':  //REDWOOD_CHANGES
            case 'SELECT':
            {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
            case 'TEXTAREA':
            {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
            default:
            {
                switch (type.toUpperCase()) {
                    case 'OJ-SWITCH':  //REDWOOD_CHANGES
                    {
                        if (objAuthTxn[0].checked) {
                            authTxnNodeValue = objAuthTxn[0].getAttribute("ON");
                        } else
                            authTxnNodeValue = objAuthTxn[0].getAttribute("OFF");
                        break;
                    }
                    case 'OJ-RADIO-SET':  //REDWOOD_CHANGES
                    {
                        for (var i=0;i<objAuthTxn.length;i++) {
                            if(objAuthTxn[i].checked) {
                                authTxnNodeValue = objAuthTxn[i].value;
                                break;
                            }
                        }
                        break;
                    }
                    default:
                    {
                        authTxnNodeValue = objAuthTxn[0].value;
                        break;
                    }
                }
            }
        }
        return authTxnNodeValue;
    } else {
        return "1~2";
    }
}
// returns the final rights array based on Txn rights
function finalarrBasedOnTxnRights(finalarr,funcid,txnstat,authstat)
{
    l_OnceAuth = getOnceAuth();
    if (finalarr){
        var t1 = mainWin.t[txnstat + '+' + authstat];
        var j = finalarr.length;
        var i = 0,k = 0,x=0;
        var addIndex = 0;
        var finalArray = new Array();
        if (t1 != null){ 
            if(finalarr.length>t1.length){
                for(var k=0;k<finalarr.length;k++){
                    for(var x=0;x<t1.length;x++){
                        if(finalarr[k]==t1[x]){
                            finalArray[finalArray.length] = finalarr[k];
                        }
                    }
                }
            } else{
                for(var k=0;k<t1.length;k++){
                    for(var x=0;x<finalarr.length;x++){
                        if(t1[k]==finalarr[x]){
                            finalArray[finalArray.length] = t1[k];
                        }
                    }
                }
            }
        } else {
            return finalarr;
        }
    }    
    return finalArray;
}

function enableOrDisableBasedOnLastAction(finalarr)
{
    var lastAction = "";
    for (i = 0; i < finalarr.length; i++){
        if (finalarr[i] == lastAction){
            var temp = finalarr[i + 1];
            finalarr[i + 1] = finalarr[lastElement];
            for (j = i + 2; j < finalarr.length; j++){
                var temp1 = finalarr[j];
                finalarr[j] = temp;
                temp = temp1;
            }
        }

        if (finalarr[i]){
            document.getElementById(finalarr[i]).disabled = false;
            document.getElementById(finalarr[i]).className ='BTNicon';
        }
    }
}

/* Reads the RECORD_STAT/CONTRACT_STAT , AUTH_STAT or AUTH_STATS  from the HTML and returns as a ~ separated */
function gnGetTxnAuthStat()
{

    //12012012
    //if (!gActiveWindow || gNumChildWindows < 0) return "~";

    var l_TxnVal = "";
    var l_Auth = "";
    var l_AuthField = "AUTH_STAT";
    var l_TxnField = "RECORD_STAT";
    var l_IsMaintScr = true;

        if (document.getElementsByName("MOD_NO").length == 0)
        {
            l_AuthField = "AUTHSTAT";
            l_TxnField = "CONTSTAT";
            l_IsMaintScr = false;
        }

        if (document.getElementsByName(l_AuthField).length > 0)
        {
            if (document.getElementsByName(l_AuthField)[0].value == true) l_Auth = "A"; //REDWOOD_CHANGES

            if (document.getElementsByName(l_AuthField)[0].value == false) l_Auth = "U"; //REDWOOD_CHANGES
        }

        if (document.getElementsByName(l_TxnField).length > 0)
        {
            if (l_IsMaintScr == true)
            {
                if (document.getElementsByName(l_TxnField)[0].value == true) l_TxnVal = "O"; //REDWOOD_CHANGES

                if (document.getElementsByName(l_TxnField)[0].value == false) l_TxnVal = "C";  //REDWOOD_CHANGES

            } else l_TxnVal = getTxnVal_Mapping(l_TxnField);
        }

    return (l_TxnVal + "~" + l_Auth);
}

function getTxnVal_Mapping(l_TxnField)
{

    var l_TxnTempVal = "";
    if (document.getElementsByName(l_TxnField)[0]) l_TxnTempVal = document.getElementsByName(l_TxnField)[0].value;

    if (l_TxnTempVal== null || l_TxnTempVal.length == 0) return "";	//REDWOOD_CHANGES

    if (l_TxnTempVal.length == 1) return l_TxnTempVal;

    var l_AuditValDesc = new Array();
    var LBL_CONSTAT_ACTIVE = mainWin.getItemDesc("LBL_CONSTAT_ACTIVE");
    var LBL_CONSTAT_CLOSED = mainWin.getItemDesc("LBL_CONSTAT_CLOSED");
    var LBL_CONSTAT_EXERCISED = mainWin.getItemDesc("LBL_CONSTAT_EXERCISED");
    var LBL_CONSTAT_HOLD = mainWin.getItemDesc("LBL_CONSTAT_HOLD");
    var LBL_CONSTAT_KNOCKEDIN = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDIN");
    var LBL_CONSTAT_CANCELLED = mainWin.getItemDesc("LBL_CONSTAT_CANCELLED");
    var LBL_CONSTAT_LIQUIDATED = mainWin.getItemDesc("LBL_CONSTAT_LIQUIDATED");
    var LBL_CONSTAT_REVERSED = mainWin.getItemDesc("LBL_CONSTAT_REVERSED");
    var LBL_CONSTAT_KNOCKEDOUT = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDOUT");
    var LBL_CONSTAT_EXPIRED = mainWin.getItemDesc("LBL_CONSTAT_EXPIRED");
    var LBL_CONSTAT_UNINITIATED = mainWin.getItemDesc("LBL_CONSTAT_UNINITIATED");
    var LBL_CONSTAT_OPEN = mainWin.getItemDesc("LBL_CONSTAT_OPEN");
    var LBL_CONSTAT_REV_INITIATED = mainWin.getItemDesc("LBL_CONSTAT_REV_INITIATED");
    var LBL_CONSTAT_REV_PARTIALLY = mainWin.getItemDesc("LBL_CONSTAT_REV_PARTIALLY");
    var LBL_CONSTAT_LAUNCH_INITIATED = mainWin.getItemDesc("LBL_CONSTAT_LAUNCH_INITIATED");
    var LBL_CONSTAT_LAUNCHED_PARTIALLY = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED_PARTIALLY");
    var LBL_CONSTAT_CAN_INITIATED = mainWin.getItemDesc("LBL_CONSTAT_CAN_INITIATED");
    var LBL_CONSTAT_CAN_PARTIALLY = mainWin.getItemDesc("LBL_CONSTAT_CAN_PARTIALLY");
    var LBL_CONSTAT_LAUNCHED = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED");
    var LBL_CONSTAT_TERMINATED = mainWin.getItemDesc("LBL_CONSTAT_TERMINATED");
    var LBL_CONSTAT_CL_PARTIALY = mainWin.getItemDesc("LBL_CONSTAT_CL_PARTIALY");
    var LBL_CONSTAT_REDEMD = mainWin.getItemDesc("LBL_CONSTAT_REDEMD");
    var LBL_CONSTAT_PROCESSED  = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
    var LBL_CONSTAT_SUGGESTED = mainWin.getItemDesc("LBL_CONSTAT_SUGGESTED");
    var LBL_CONSTAT_RESIDUED = mainWin.getItemDesc("LBL_CONSTAT_RESIDUED"); 

    l_AuditValDesc[LBL_CONSTAT_ACTIVE] = "A";
    l_AuditValDesc[LBL_CONSTAT_CLOSED] = "C";
    l_AuditValDesc[LBL_CONSTAT_EXERCISED] = "E";
    l_AuditValDesc[LBL_CONSTAT_HOLD] = "H";
    l_AuditValDesc[LBL_CONSTAT_KNOCKEDIN] = "I";
    l_AuditValDesc[LBL_CONSTAT_CANCELLED] = "K";
    l_AuditValDesc[LBL_CONSTAT_LIQUIDATED] = "L";
    l_AuditValDesc[LBL_CONSTAT_REVERSED] = "R";
    l_AuditValDesc[LBL_CONSTAT_CLOSED] = "S";
    l_AuditValDesc[LBL_CONSTAT_REVERSED] = "V";
    l_AuditValDesc[LBL_CONSTAT_KNOCKEDOUT] = "W";
    l_AuditValDesc[LBL_CONSTAT_EXPIRED] = "X";
    l_AuditValDesc[LBL_CONSTAT_UNINITIATED] = "Y";
    l_AuditValDesc[LBL_CONSTAT_OPEN] = "O";
    l_AuditValDesc[LBL_CONSTAT_TERMINATED] = "T";
    l_AuditValDesc[LBL_CONSTAT_REV_INITIATED] = "F";
    l_AuditValDesc[LBL_CONSTAT_REV_PARTIALLY] = "J";
    l_AuditValDesc[LBL_CONSTAT_LAUNCH_INITIATED] = "B";
    l_AuditValDesc[LBL_CONSTAT_LAUNCHED_PARTIALLY] = "G";
    l_AuditValDesc[LBL_CONSTAT_CAN_INITIATED] = "D";
    l_AuditValDesc[LBL_CONSTAT_CAN_PARTIALLY] = "Z";
    l_AuditValDesc[LBL_CONSTAT_LAUNCHED] = "Q";
    l_AuditValDesc[LBL_CONSTAT_CL_PARTIALY] = "M";
    l_AuditValDesc[LBL_CONSTAT_REDEMD] = "N";
    l_AuditValDesc[LBL_CONSTAT_PROCESSED] = "P";
    l_AuditValDesc[LBL_CONSTAT_SUGGESTED] = "s";
    l_AuditValDesc[LBL_CONSTAT_RESIDUED] = "r";

    if (l_AuditValDesc[l_TxnTempVal]) return l_AuditValDesc[l_TxnTempVal];
    else return "";
}

function isSameMakerId() {
        var field = "MAKERID";
        if (screenType == 'M') {
            field = "MAKER_ID";
        }
        if (document.getElementsByName(field).length > 0) {
            if (document.getElementsByName("REVR_MAKERID").length > 0 && document.getElementsByName("REVR_MAKERID")[0].value != "") {
                if (document.getElementsByName("REVR_MAKERID")[0].value == mainWin.UserId) {
                    return false;
                }
            } else {
                if (document.getElementsByName(field)[0].value == mainWin.UserId) {
                    return false;
                }
            }
        }
    return true;
}

/* Enables the action Codes based on Action Code
      Ex: if action Code is New then only a Save shud be enabled.
*/
function fnEnableAcns_OnActionCode(funcid)
{
    if (funcid == "")
    {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++)
        {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).style.display = "none";
            //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
        return;
    }

    var l_TempAcnCode = gAction;


    //FCJ BranchEoi will be N normal,F - end of finanical input,T - end of transaction input,..
    // in cas eof fcis --> N - Online , T - Offline.
    var l_OfflineAllowed = 'N';
    var functionId = mainWin.document.getElementById("fastpath").value.toUpperCase();
    var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM,"//*[@FNID = '" + functionId + "']");
    //Changes for new menuXML starts
    if (functionIdNode)
    {
        for (var i = 0; i < functionIdNode.attributes.length; i++)
        {
            if (functionIdNode.attributes[i].nodeName == "OFFLINEALLOWED")
            {
                l_OfflineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
                break;
            }
        }
    }
    if (gAction == "")
    {
        if (dbDataDOM == null)
        {
            disableAllTBButtons();//Added
            for (var l_Cnt = 0; l_Cnt < mainWin.finalarr.length; l_Cnt++)
            {
                if (mainWin.finalarr[l_Cnt].toUpperCase() == "NEW")
                {
                    if (/*mainWin.BranchEoi == 'N'*/!isBranchEOI)//24x7 toolbar
                    {
                        document.getElementById(mainWin.finalarr[l_Cnt]).disabled = false;
                        document.getElementById(mainWin.finalarr[l_Cnt]).style.display = "flex";//REDWOOD_CHANGES
                        //document.getElementById(mainWin.finalarr[l_Cnt]).className = 'BTNicon';
                        document.getElementById("EnterQuery").disabled = false;
                        document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
                        //document.getElementById("EnterQuery").className = 'BTNicon';
                    } else
                    {
                        if (l_OfflineAllowed != "Y")
                        {
                            document.getElementById(mainWin.finalarr[l_Cnt]).disabled = true;
                            document.getElementById(mainWin.finalarr[l_Cnt]).style.display = "none";
                            //document.getElementById(mainWin.finalarr[l_Cnt]).className = 'BTNiconD';
                            disableActionsInToolbar();
                        } else
                        {
                            document.getElementById(mainWin.finalarr[l_Cnt]).disabled = false;
                            document.getElementById(mainWin.finalarr[l_Cnt]).style.display = "none";
                            //document.getElementById(mainWin.finalarr[l_Cnt]).className = 'BTNicon';
                        }
                        }
                } else {
                    document.getElementById(mainWin.finalarr[l_Cnt]).disabled = true;
                    document.getElementById(mainWin.finalarr[l_Cnt]).style.display = "none";
                    //document.getElementById(mainWin.finalarr[l_Cnt]).className = 'BTNiconD';
                    }
            }
        } else {
            /* HAS BEEN ADDED TO ENABLE THE ENTER QUERY AFTER THE EXECUTE QUERY HAS BEEN COMPLETED */
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
            //document.getElementById("EnterQuery").className = 'BTNicon';
        }
    }
     if (gAction == ""){
        document.getElementById("EnterQuery").disabled = false;
        document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
     }
    if ((gAction == "ENTERQUERY"))
    {
        for (var l_Itr = 0; l_Itr < mainWin.finalarr.length; l_Itr++)
        {
            document.getElementById(mainWin.finalarr[l_Itr]).disabled = true;
            document.getElementById(mainWin.finalarr[l_Itr]).style.display = "none";
            //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
    }

    if (funcid.charAt(2).toUpperCase() == "S" || (mainWin.l_OfflineAllowed != "Y" && mainWin.BranchEoi == "T" && screenType != 'WB'))
    { // Summary case
        for (var l_Itr = 0; l_Itr < mainWin.finalarr.length; l_Itr++)
        {
            document.getElementById(mainWin.finalarr[l_Itr]).disabled = true;
            document.getElementById(mainWin.finalarr[l_Itr]).style.display = "none";
            //document.getElementById(mainWin.finalarr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className= "BTNiconD";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    }
} //fnc

function disableActionsInToolbar()
{
    var jIndex = mainWin.finalarr.length;
    document.getElementById("Save").disabled = true;
    for (index = 0; index < jIndex; index++)
    {
        document.getElementById(mainWin.finalarr[index]).disabled = true;
    }
}
//14640545 Fixes Starts
function enableSave() {
    //document.getElementById("Save").className ="BTNicon";
    document.getElementById("Save").disabled = false;
    document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES

    /*document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";*/

}
//14640545 Fixes Ends

function fnExpandCollapseSubSys(srcElem){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(document.getElementById("DIVSubSystem")){
    var isLiHidden = false;
    var tempLiPos = 0;
     var firstLiPos = 0 ;
    var divFooterHgt = document.getElementById("DIVFooter").offsetHeight;
    var clsName = 'subSystemCollapse'
    if(srcElem){
      clsName = srcElem.getElementsByTagName("SPAN")[0].className;
    }
    var liElemList = document.getElementById("DIVSubSystem").getElementsByTagName("LI");
    if(mainWin.LangCode != 'ARB'){
        firstLiPos = liElemList[0].offsetLeft;
    }
    else{
        firstLiPos = liElemList[0].offsetLeft + liElemList[0].offsetWidth;
    }
    if(clsName == 'subSystemCollapse'){
      for(var liCnt = 1 ; liCnt < liElemList.length; liCnt++){
		if(liElemList[liCnt].style.display != "none"){ //9NT1606_12_4_RETRO_12_1_26230371 changes 
        if((mainWin.LangCode != 'ARB') && (liElemList[liCnt].offsetLeft == firstLiPos) || (mainWin.LangCode == 'ARB') && ((liElemList[liCnt].offsetLeft + liElemList[liCnt].offsetWidth) == firstLiPos)){
          isLiHidden = true;
          tempLiPos = liCnt;
          break; 
        }
	   } //9NT1606_12_4_RETRO_12_1_26230371 changes 
      }
      if(isLiHidden){
      for(var liCnt = liElemList.length - 1 ; liCnt >= tempLiPos; liCnt--){
          liElemList[liCnt].style.display = 'none';          
      }
      }
    if(srcElem){
      srcElem.getElementsByTagName("SPAN")[0].className = 'subSystemExpand';
      srcElem.title = mainWin.getItemDesc("LBL_EXPAND_SECTION");
    }
    }
    else{
         for(var liCnt = 1 ; liCnt < liElemList.length; liCnt++){
          if(liElemList[liCnt].style.display == 'none'){
              liElemList[liCnt].style.display = 'block';
              isLiHidden = true;
          }
         }
      srcElem.getElementsByTagName("SPAN")[0].className = 'subSystemCollapse';
      srcElem.title = mainWin.getItemDesc("LBL_COLLAPSE_SECTION");
    }
    if(isLiHidden){
       document.getElementById("DIVSubSystemController").style.height =  document.getElementById("DIVSubSystem").offsetHeight + 'px';
       document.getElementById("DIVMainTmp").style.height = document.getElementById("DIVMainTmp").offsetHeight + (divFooterHgt - document.getElementById("DIVFooter").offsetHeight) - 10 +'px';
       //document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - document.getElementById("DIVVerisonBtns").offsetHeight - document.getElementById("TBLPageTAB_MAIN").children[0].offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight + "px"; //static header change //9NT1606_12_4_RETRO_12_1_26230371 commented 
	   document.getElementById("mainTabContainer").style.height = document.getElementById("mainTabContainer").offsetHeight - document.getElementById("DIVVerisonBtns").offsetHeight - document.getElementById("TBLPageTAB_MAIN").children[0].offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight + "px"; //static header change //9NT1606_12_4_RETRO_12_1_26230371 changes 
    }
    else{
        document.getElementById("DIVSubSystemController").style.visibility = "hidden";
    }
}
}
//Added for 17259422 start
function setHorizontalPosition(elem, isMargin, position){
if((mainWin.LangCode) && (mainWin.LangCode.toUpperCase() == 'ARB')){
    if(isMargin){
        elem.style.marginRight =  position + 'px';  
    }
    else{
      elem.style.right =  position + 'px';  
    }  
  }
  else{
   if(isMargin){
      elem.style.marginLeft =  position + 'px';  
    }
    else{
      elem.style.left =  position + 'px';  
    }    
  }
}
//Added for 17259422 end
//static header change
function fnSetScreenSize(){
  if (l_tmp_scr_type != 'large') {
        document.getElementById("ResTree").className = "DIVTwoColLyt"; 
            document.getElementById("DIVScrContainer").className = "WNDcontent mediumwin";
     } else {
        document.getElementById("ResTree").className = "DIVThreeColLyt";
        document.getElementById("DIVScrContainer").className = "WNDcontent bigwin";
    }
}


//Fix for 18678458 -Index Basedsearch changes start
function replaceAll(Source,stringToFind,stringToReplace){
  var temp = Source;
  var index = temp.indexOf(stringToFind);
  while(index != -1){
      temp = temp.replace(stringToFind,stringToReplace);
      index = temp.indexOf(stringToFind);
  }
  return temp;
}
//Fix for 18678458 -Index Basedsearch changes end//Performance Changes
/*function fnpostAction(action,responseDOM){
    var seqno=0;
    var scrSeqNo=0;
    var loginSeqNo=0;
    var l_TimeLogvalue="";
    
    var tmpRespDOM = "";
    if(typeof(responseDOM) == "undefined") {
        tmpRespDOM = fcjResponseDOM;
    }else {
        tmpRespDOM = responseDOM;
    }
    if(action=="AUTHQUERY" && fcjResponseDOM== null){
     posttime=parent.posttime;
     afterposttime=parent.posttime;
     functionId=authFunctionId;
    }
     
    if (mainWin.mBean_required == "Y" && getXMLString(tmpRespDOM)!="" && inDate != "") {    
       inTime = (inDate.getHours() * (3600 * 1000)) + (inDate.getMinutes() * (60 * 1000)) + (inDate.getSeconds() * 1000) + inDate.getMilliseconds();
       if(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/TIMELOG"))
        l_TimeLogvalue = getNodeText(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/TIMELOG"));       
       if(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SEQLIST"))
         seqno = getNodeText(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SEQLIST")).split("~")[2];
         scrSeqNo = getNodeText(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SEQLIST")).split("~")[1];
         loginSeqNo= getNodeText(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SEQLIST")).split("~")[0];
       try{ 
       var dbnetTime=l_TimeLogvalue.split("~")[3]-l_TimeLogvalue.split("~")[2];
       var serverTime=l_TimeLogvalue.split("~")[1]-l_TimeLogvalue.split("~")[0]-dbnetTime; 
              dbnetTime=parseFloat(dbnetTime);
              serverTime=parseFloat(serverTime);
       var dbTime=parseFloat(l_TimeLogvalue.split("~")[4]);
       var dbSesId=parseFloat(l_TimeLogvalue.split("~")[5]);
        var t = getDateObject();
        var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds(); 
         var jstime=parseFloat(parseFloat(posttime)-parseFloat(inTime));
            jstime=jstime+parseFloat(parseFloat(time)-parseFloat(afterposttime));
            jstime=Math.round(jstime*100)/100;
            
        startTime = inDate.getFullYear()+'-'+(inDate.getMonth()+1)+'-'+inDate.getDate()+" "+inDate.getHours()+':'+inDate.getMinutes()+':'+inDate.getSeconds();
        endTime = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
        var totaltime=parseFloat(parseFloat(t.getTime())-parseFloat(inDate.getTime()));
        totaltime=Math.round(totaltime*100)/100;
        var nettime=totaltime-jstime-serverTime-dbTime;
        nettime=Math.round(nettime*100)/100;        
          
         var clientLog=mainWin.DebugStmt;
         setActionTime(inTime,functionId, action);//mbean changes
         if((action=="EXECUTEQUERY" && ShowSummary == "TRUE") || action == 'AUTHQUERY'){
            mainWin.fnPopulateLoad(jstime,dbTime,serverTime,totaltime,"",scrSeqNo,dbSesId,loginSeqNo,seqno);
         }else{
            //fnPostActionLog(jstime,dbTime,serverTime,startTime, endTime, totaltime,clientLog,"","",seqno,dbSesId,loginSeqNo,scrSeqNo,action);
            fnPopulateTimes(loginSeqNo,scrSeqNo,seqno,jstime,dbTime,serverTime,startTime,endTime,totaltime);
         }
//         if (ShowSummary != "TRUE") 
//            fnPostActionLog(jstime,dbTime,serverTime,startTime, endTime, totaltime,clientLog,"","",seqno,dbSesId,loginSeqNo,scrSeqNo,action);
         }
         catch(e){}
         inTime="";
         inDate = "";
         posttime="";
         afterposttime="";
    }
}*/
var objHTTP;
/*function fnPostActionLog(jslogTime,dblogTime,serverlogTime,startTime, endTime, netlogTime,clientLog,dbLog,serverLog,actseqno,dbSesId,loginSeqNo,scrSeqNo,action) {    

    objHTTP = createHTTPActiveXObject();
    if(mainWin.mBean_required == 'Y'){
        var strActionLogData = createActionLogRequestXml(clientLog,dbLog,serverLog);
        var paramString = "&JSTIME=" + jslogTime;
            paramString += "&DBTIME=" + dblogTime;
            paramString += "&SERVTIME=" + serverlogTime;            
            paramString += "&STARTTIME=" + startTime;
            paramString += "&ENDTIME=" + endTime;
            paramString += "&NETTIME=" + netlogTime;
            paramString += "&ACTSEQNO=" +actseqno;
            paramString += "&DBSESID=" +dbSesId;
            paramString += "&LOGINSEQNO=" +loginSeqNo;
            paramString += "&SCRSEQNO=" +scrSeqNo;
            paramString += "&ACTION=" +action;
            paramString += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg;
        var url = "FCSmsLogServlet?actionType=UPDATEACTIONLOG" + paramString;
        objHTTP.open("POST", url, true);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.onreadystatechange  = fnSetResponse;
        objHTTP.send(strActionLogData);
        
    }   
}*/
function fnSetResponse() {
    if (objHTTP.readyState == 4) {
        if(objHTTP.status == 200) { 
        }else {            
        }
    }
}
function createActionLogRequestXml(clientLog,dbLog,serverLog)
{    
     var clogXML           = "<?xml version='1.0' encoding='UTF-8'?>";
     clogXML               =  clogXML+"<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FCUBS</SOURCE><UBSCOMP>FCUBS</UBSCOMP><MSGID/><USERID/><ENTITY/><BRANCH/>" +
                              "<DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><CLIENTLOG><![CDATA[";
     clogXML               =  clogXML+clientLog+"]]></CLIENTLOG><SERVERLOG><![CDATA["+serverLog+"]]></SERVERLOG><DBLOG><![CDATA["+dbLog+"]]></DBLOG>";     
     clogXML       = clogXML+"</FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY='0' PARENT='' RELATION='' TYPE=''/></FLD><REC TYPE=''/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>";
     return clogXML;
}

/*function setActionTime(inTime,jsTime,dbtime,servertime,functionId, action,nettime) {//Performance Testing
    if (mainWin.mBean_required == "N") return;
    var t = getDateObject();
    var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    if (inTime) {
        var outTime = time;
      //mainWin.fnPopulateMbeanData(inTime,outTime,jsTime,dbtime,servertime,functionId, action,nettime);//Performance Testing
      mainWin.fnPopulateMbeanData(inTime,outTime,functionId, action);//Performance Testing
    } else {
        return t;
    }
}*/
//Performance Changes
function setActionTime(inTime, functionId, action) {
    if (mainWin.mBean_required == "N") return;
    var t = getDateObject();
    var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    if (inTime) {
        var outTime = time;
        mainWin.fnPopulateMbeanData(inTime, outTime, functionId, action);
    } else {
        return t;
    }
}
/*function appendDebug(fcjResponseDOM) { //Logging changes
     if(mainWin.DebugWindowFlg == "Y") {
     	 if(typeof(ShowSummary)!= "undefined" && ShowSummary == 'TRUE'){
          launchWebDbg = webDbg
        }
         if(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/WB_DEBUG"))
            webDbg = getNodeText(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/WB_DEBUG"));
         else webDbg = "";
         if(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/AP_DEBUG")) 
            appDbg = getNodeText(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/AP_DEBUG"));
         else appDbg = "";
         if(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/DB_DEBUG")) 
            dbDbg = getNodeText(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/DB_DEBUG"));
         else dbDbg = "";
     
         //mainWin.serverDebugStmt =webDbg + "\n\n"+appDbg+"\n\n"+dbDbg;
          if(typeof(ShowSummary)!="undefined" && ShowSummary == 'TRUE'){
            mainWin.serverDebugStmt =launchWebDbg+"\n"+ webDbg + "\n\n"+ appDbg+"\n\n"+ dbDbg;
        }else{
            mainWin.serverDebugStmt = dbDbg;
      //  }
    }
}*/

function getSeqNo() {
     var parentVal = "";
     var sequenceNo ;
     if(typeof (tempSeqNo) != "undefined" && tempSeqNo != '')
        return tempSeqNo;
     if(typeof (parent.tempSeqNo) != "undefined" && parent.tempSeqNo != '')
        return parent.tempSeqNo;
    if(typeof (seqNo) != "undefined" && seqNo != '')
        return seqNo;
     
    while (typeof (sequenceNo) == "undefined") {
        parentVal += "parent."
        var fnEval = new Function("return " + parentVal + "seqNo");
        sequenceNo = fnEval();
    }
    return sequenceNo;
}
// bug#34786584 starts //commented this function and added a new logic to get the date object
/*function getDateObject(y, m, d) {
    var dt = null;
    if(y != null && m != null && d != null) {
        var timestamp = Date.UTC(y, m , 0, 0,0,0);
        var dummydate = new Date(timestamp);
	var tzoffset = dummydate.getTimezoneOffset()/60;
	if (( m >8 ) || (m<2) ) tzoffset++; //9NT1606_12_4_RETRO_12_1_26939865 changes
	if (tzoffset >+0){
        /* Fix for Bug No 16838594 Start */
		//var millisecs = parseInt(timestamp) + (Number(d)+parseFloat(tzoffset/24))*86400000
        /* Fix for Bug No 16838594 End*/
        	/*dt= new Date(millisecs);
	} else {
		 dt= new Date(timestamp+(d)*86400000);
	}
    } else {
        dt = new Date();
    }
    return dt;
}*/

function getDateObject(y, m, d) {
	var dt = null;
	if (y != null && m != null && d != null) {
		dt = new Date(y,m,d);
	}
	else {
		dt = new Date();
	}
	return dt;
}
//bug#34786584 ends

/*function fnPopulateTimes(loginSeqNo,scrSeqNo,seqno,jstime,dbTime,serverTime,startTime,endTime,totaltime){
    var seqlist = loginSeqNo+"~"+scrSeqNo+"~"+seqno;
    if(parent.timeLogsArray) { 
        parent.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    } else {
        timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }
}*/
/*function fnPopulateTimes(loginSeqNo,scrSeqNo,seqno,jstime,dbTime,serverTime,startTime,endTime,totaltime){
    var seqlist = loginSeqNo+"~"+scrSeqNo+"~"+seqno; 
    if(typeof(seqNo)!='undefined' && seqNo) { 
        timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }else if(typeof(parent.seqNo)!='undefined' && parent.seqNo) { 
        parent.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }else if(typeof(parent.parent.seqNo)!='undefined' && parent.parent.seqNo) { 
        parent.parent.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    } else {
        mainWin.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }
}*/

function fndispAccDetails(fieldValue,fieldName,fieldId,brnFldValue){    
    parent.parentWinParams = new Object();
    var seqNoTmp = "";
    if (typeof(seqNo)=="undefined"){
        seqNoTmp=parent.seqNo;
        parent.parentWinParams.accno =  fieldValue;
        parent.parentWinParams.branch = brnFldValue;
        if (typeof(seqNoTmp)=="undefined"){
          seqNoTmp=parent.parent.seqNo; 
          parent.parent.parentWinParams.accno =  fieldValue;
          parent.parent.parentWinParams.branch = brnFldValue;
        }
    } else {
        seqNoTmp = seqNo;
    }
    if(typeof(fieldName) !="undefined" && (fieldName.indexOf("ACC")!= -1 ||fieldName.indexOf("AC")!= -1)) {
        if(fieldValue !="") {   
        parent.parentWinParams.accno =  fieldValue;
        parent.parentWinParams.branch = brnFldValue;
            //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
			   mainWin.dispHref1("STDCUSBL",seqNoTmp); 
			//Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("STDCOSBL",getSeqNo());
			}	
			//Bug_36924146 Changes Ends
        }
    } 
}

function fndispNotepadDet(fieldValue, fieldName, fieldId, brnFldValue) {
    parent.parentWinParams = new Object();
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") != -1 || fieldName.indexOf("AC") != -1)) {
        if (fieldValue != "") {
            parent.parent.parentWinParams.accno = fieldValue;
            parent.parent.parentWinParams.branch = brnFldValue;
           // mainWin.dispHref1("CSDINSTQ", seqNo);//FCUBS_CNSL_OTPBANK_36210496 Commented
		   //Bug_36924146 Changes Starts
			if(isRofcFunctionId(funId)){
			//Bug_36924146 Changes Ends
		       mainWin.dispHref1("CSDINSTQ", getSeqNo()); //FCUBS_CNSL_OTPBANK_36210496 Added
		   //Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends
        }
    }
}

function fnSetDelay(milliSec) {
    var startDate = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - startDate) > milliSec) {
            break;
        }
    }
} 
//Fix for Bug_34673736 starts
function fnFormatTimeStampString(str) {
    if (str && (str != "")) {
        var objDtStampValue = str;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO,false);
        var formattedTS = mb3Date.getShortDate() + timePart;
        str = formattedTS;
    }
    return str;
}
//Fix for Bug_34673736 ends				   
							 
//REDWOOD_CHANGES
function fnCalcHgtSubScreen() {//OJET Migration
  var containerDIV = "ChildWin";
   mainWin.toggleNavigation('close');
	var parentContainer = "ChildWin";
		if(parent.seqNo) {
			parentContainer = parent.seqNo;
		}
		scrHeight =  parent.parent.document.getElementById(parentContainer).offsetHeight ;//- (parent.document.getElementById("WNDtitlebar").offsetHeight);
  parent.document.getElementById(containerDIV).style.width = "100%";
  if(typeof(dialogZIndex) !="undefined"){
       parent.document.getElementById(containerDIV).style.zIndex = dialogZIndex+100;
  }else{
       dialogZIndex = 1900;
  }
 
  parent.document.getElementById(containerDIV).children[0].style.width = "100%";
  parent.document.getElementById(containerDIV).style.height = "100%";//scrHeight + "px";
  parent.document.getElementById(containerDIV).children[0].style.height = "100%";// scrHeight + "px";
   parent.document.getElementById(containerDIV).style.top = "0px";
  document.getElementById("DIVWNDContainer").style.width = "100%";
  document.getElementById("DIVMainTmp").style.width = "100%";
 if(typeof(document.getElementById("mainTabContainer")) !="undefined" && document.getElementById("mainTabContainer") !=null)
    document.getElementById("mainTabContainer").style.width = "100%";//static header change
  document.getElementById("DIVScrContainer").style.minHeight = $("#subscreenDialog").outerHeight(true) -  $("#WNDtitlebar").outerHeight(true) - $("#subscreenFooter").outerHeight(true)  +"px";
  
  
  if (parent.seqNo) {
    containerDIV = parent.seqNo;
    //parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight - 3 + "px";
  }
  }//HTML5 Changes End
  
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
function getDefaultNumberConverter(dataBoundElem, isME, obj) {
    return {
        format : function (value) {
             if (value==undefined || value==null || value==" ") {//redwood_35892840
                //  value = 0;
                return "";
            }
            var dataBoundElemObj = document.getElementById(dataBoundElem);
            try {
                if (isME) {
                    if (event) {
                        dataBoundElemObj = event.target;
                        while (dataBoundElemObj.tagName && !dataBoundElemObj.tagName.toUpperCase().startsWith('OJ-')) {
                            dataBoundElemObj = dataBoundElemObj.parentNode;
                        }
                    }
                    else {
                        dataBoundElemObj = getNumberFieldInME(dataBoundElem);
                    }
                }
                var re = new RegExp(gDigitGroupingSymbol, "g");
                value = value.replace(re, "");
                dataBoundElemObj.value = value;
                var formattedVal = value;

                formattedVal = displayFormattedNumber(dataBoundElemObj, value);

                if (typeof (formattedVal) == 'undefined' || formattedVal == null) {
                    return "";
                }
            }
            catch (e) {
                formattedVal = value;
            }

            return formattedVal;
        }
    }
}


function displayFormattedNumber(hdnNumField,value) {
    isFromDisplay = false;
    var returnVal = value;
    if (!returnVal) {
        //getNextSibling(getNextSibling(hdnNumField)).value =  null;  // ""; OJET Migration //ojet-number field will not accept string value so changing the default value to null
        return ;
    }
    var arrNumComponents = value.match(/\./g);
    if (arrNumComponents != null && (arrNumComponents.length > 1)) {
        displayMsg("ST-COM041");
        returnVal = "";
        //getNextSibling(getNextSibling(hdnNumField)).value = "";
        return ;
    }
    //FCUBS_12.0.1_RETRO_14749705 starts
    if (returnVal.indexOf('E') !=  - 1) {
        returnVal =returnVal * 1 + "";
    }
    //FCUBS_12.0.1_RETRO_14749705 ends
    if (!checkNumberValidation(returnVal) || returnVal.indexOf(" ") !=  - 1) {
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        returnVal = "";
        //getNextSibling(getNextSibling(hdnNumField)).value = null ;//""; OJET Migration
        //getNextSibling(getNextSibling(hdnNumField)).focus();
        return ;
    }

     
    if (returnVal != "") {
        returnVal = returnVal.replace(".", gDecimalSymbol);
        //hdnNumField.value = returnVal; 
    }
    fnValidateNumberRange(hdnNumField);
    if (hdnNumField.getAttribute("FORMAT_REQD") && hdnNumField.getAttribute("FORMAT_REQD") == "Y") {
        //Changes for formatting number
      return formatNumber(hdnNumField, returnVal, isFromDisplay);
    }
    return returnVal;
}

function formatNumber(dispNumField,returnVal) {
    var numfieldVal = returnVal;
    var arrTemp = numfieldVal.split(gDecimalSymbol);
    var numBeforeDecimal = arrTemp[0];
    var replacepattern = "\\" + gDigitGroupingSymbol;
    var pattern = new RegExp(replacepattern, 'g');
    //var pattern=new RegExp(gDigitGroupingSymbol,'g');
    numBeforeDecimal = numBeforeDecimal.replace(pattern, "");
    var numAfterDecimal = arrTemp[1];
    var isNegative = false;
    if (numBeforeDecimal.indexOf("-") >  - 1) {
        isNegative = true;
        numBeforeDecimal = numBeforeDecimal.replace("-", "");
    }

    if (numAfterDecimal == undefined)
        numAfterDecimal = "";
    var maxNumDigitsAfterDecimal = dispNumField.getAttribute("MAX_DECIMALS");
    maxNumDigitsAfterDecimal = parseInt(maxNumDigitsAfterDecimal);
    if (isNaN(parseInt(maxNumDigitsAfterDecimal)))
        maxNumDigitsAfterDecimal = 0;
    var retVal = "";
    var digitPos = 0;
    for (var loopIndex = numBeforeDecimal.length - 1;loopIndex >= 0;loopIndex--) {
        switch (mainWin.gNumberFormatMask) {
            case "L":
                if ((digitPos > 1) && ((digitPos % 2) == 1)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
                break;
            default :
                if ((digitPos > 1) && ((digitPos % 3) == 0)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
        }
        digitPos++;
    }
    if (numAfterDecimal != "" || maxNumDigitsAfterDecimal != 0) {
        retVal += gDecimalSymbol;
    }
    if (maxNumDigitsAfterDecimal > numAfterDecimal.length) {
        numAfterDecimal += "000000000000000000000000000000000000";
        retVal += numAfterDecimal.substr(0, maxNumDigitsAfterDecimal);
    }
    else {
        retVal += numAfterDecimal;
    }
	//Fix for 24659882
	if(numBeforeDecimal == "")
		 retVal = "0" + retVal;
    if (isNegative)
        retVal = "-" + retVal;	
    return retVal;

}

function getCurrencyValue(dataBoundElem, idCCY, isFromLaunch,amtConverter) {
// $(dataBoundElem).bind("requiredChanged disabledChanged readonlyChanged currencyChanged currencysymbolChanged displaymodeChanged", getFormattedAmount(dataBoundElem, idCCY, isFromLaunch) );

    if(isFromLaunch){
        return;
    }
    if (isformat == true && isfromscreen == true)
        return;
   // var idDispAmt = dataBoundElem.name ;
  //  var inpElem;
    //debugger;
    var tableObj = "";
	var ccyChk = false;//REDWOOD_35850089
//    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV")
//        inpElem = getInpElem(dataBoundElem.parentNode.parentNode.parentNode, idDispAmt);
//    else 
//        inpElem = getInpElem(dataBoundElem.parentNode.parentNode, idDispAmt);
//        
    //var amt = dataBoundElem.value;
    /*Fix for 18174232 Starts*/
    var singleView = false;
    if (location.pathname.indexOf("LaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = true;
    }
    /*Fix for 18174232 Ends*/
    if (dataBoundElem.parentNode !=undefined){//REDWOOD_35850089
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "DIV" && dataBoundElem.parentNode.parentNode.getAttribute("VIEW") == "SE") {
       singleView = true;
   } //Fix for 21457134
	}//REDWOOD_35850089
    var ccy = "";
    if (idCCY == "") {
        ccy = mainWin.Lcy;
    }
    else {
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/
            
            if ((isMEBlock=='true' && !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = curDataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex - 2;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
			 if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ 
              ccy = mainWin.Lcy;
               }
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
            //Redwood_35850089 Starts
             if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ 
              ccy = mainWin.Lcy;
               }
               //Redwood_35850089 Ends  
            }
					ccyChk = true;//REDWOOD_35850089
        }
        else {
			if (dataBoundElem.id!=null) {//Redwood_35850089
            //Block is not part of the idCCY
            blockName = dataBoundElem.id.substring(0, dataBoundElem.id.lastIndexOf("__"));

            var isMEBlock = false;
//            for (var i = 0;i < multipleEntryIDs.length;++i) {
//                if (multipleEntryIDs[i] == blockName) {
//                    isMEBlock = true;
//                    break;
//                }
//            }
             isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/

            if ((isMEBlock =='true'&& !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }
//                if (typeof (screenType) != "undefined" && screenType == 'D') {
//                    tableObj = getTableObjForBlock("Innertable_" + functionId);
//                }
//                else {
//                    tableObj = getTableObjForBlock(blockName);
//                }
                tableObj = getTableObjForBlock(blockName);
                if (tableObj && tableObj.tBodies[0].rows.length > 0) { //21457134
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idCCY) {
                                ccy = inputElements[j].value;
                                break;
                            }
                        }
                    }
                }
                /* Fix for 16960456*/
                if (ccy == "") {
                    if (document.getElementsByName(idCCY).length > 0) {
                        /* commented for 17073111
					  var rowNo = -1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                        else rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else */
                        ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
                else {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = dataBoundElem.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if (typeof (screenType) != "undefined" && screenType == "D") {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex;//Fix for 21591405
                                else 
                                    rowNo = 0;
                            }
                            else {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 2;
                                else 
                                    rowNo = 0;
                            }
                        }
                        else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
					}
				}
						ccyChk = true;//REDWOOD_35850089
			}
		}
	}
	
//Redwood_35850089
 if (document.getElementsByName(idCCY).length > 0 && ccy == "") {
        ccy = mainWin.Lcy;
    }
//Redwood_35850089
//    if (ccy == "")
//        ccy = mainWin.Lcy;
if ((ccy == "" ||  ccy==null) && dataBoundElem.value != "" && ccyChk == "true" ) {//REDWOOD_35850089
        //dataBoundElem.value="";
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I');
        focusReqd = false;
        
//        focusField = curInpElem;
//        alertAction = "UNMASK";
//        curInpElem.value = "";
//        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
        gIsValid = false;
        isfromscreen = false;
        return;
    }
    /*Redwood_35850089 moved up
    if (document.getElementsByName(idCCY).length > 0 && ccy == "") {
        ccy = mainWin.Lcy;
    }*/
    isformat = false;
    isfromscreen = false;
    var patternFormat = "###,##0.##################";
    if (mainWin.gNumberFormatMask && mainWin.gNumberFormatMask == "L") {
        patternFormat = "#,##,##0.#################";
    }
//    numberOptions = {
//        style: "currency", currency : ccy,  currencyDisplay: "code", separators :  {
//            decimal : gDecimalSymbol, group : gDigitGroupingSymbol
//        },
//        pattern : patternFormat 
//    };
    
//    numberOptions = {
//                  style: "currency",
//                  currency: ccy,
//                  currencyDisplay: "code"
//              };
  // amtConverter =  new ojconverter_number.IntlNumberConverter( numberOptions);
// amtConverter.format = function (value) {
//                if (!value) {
//                    value = 0;
//                }
//                const mb3Amount = new MB3Amount(value, true, ccy);
//                return mb3Amount.getDisplayAmount() ;
//            } 
        return ccy;
//   setTimeout(function(){ 
////   amtConverter._resolvedOptions={
////        style: "currency", currency : ccy,  currencyDisplay: "code", separators :  {
////            decimal : gDecimalSymbol, group : gDigitGroupingSymbol
////        }};
//        
//       
//    
//    dataBoundElem.refresh()},0);
    //amtConverter._options=numberOptions;
    

    
}
//Redwood_35850089 Starts
function checkCurrencyValue(dataBoundElem, idCCY, e) {
	
	var dataBoundElemObj = document.getElementById(dataBoundElem);
	
    if (isformat == true && isfromscreen == true)
        return;
    var tableObj = "";

    var singleView = false;
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = true;
    }
   
    
    if (dataBoundElemObj.parentNode !=undefined){
        if (dataBoundElemObj.parentNode.tagName.toUpperCase() == "DIV" && dataBoundElemObj.parentNode.parentNode.getAttribute("VIEW") == "SE") {
       singleView = true;
  }
   } 
    var ccy = "";
    if (idCCY == "") {
        ccy = mainWin.Lcy;
    }
    else {
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);
            
            if ((isMEBlock=='true' && !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElemObj.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex - 2;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
           if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ 
              ccy = mainWin.Lcy;
               }

            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
           
             if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ 
              ccy = mainWin.Lcy;
               }
                   
            }
        }
        else {
            //Block is not part of the idCCY
			if (dataBoundElemObj.id!=null) { 
            blockName = dataBoundElemObj.id.substring(0, dataBoundElemObj.id.lastIndexOf("__"));

            var isMEBlock = false;

             isMEBlock = isMultipleEntry(blockName);

            if ((isMEBlock =='true'&& !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
               
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElemObj.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }
                tableObj = getTableObjForBlock(blockName);
                if (tableObj && tableObj.tBodies[0].rows.length > 0) {
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idCCY) {
                                ccy = inputElements[j].value;
                                break;
                            }
                        }
                    }
                }
               
                if (ccy == "") {
                    if (document.getElementsByName(idCCY).length > 0) {
                       
                        ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
                else {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = dataBoundElemObj.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if (typeof (screenType) != "undefined" && screenType == "D") {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex;
                                else 
                                    rowNo = 0;
                            }
                            else {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 2;
                                else 
                                    rowNo = 0;
                            }
                        }
                        else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
	}
    } 

	if ((ccy == "" ||  ccy==null) && dataBoundElemObj.value!=null  && dataBoundElemObj.value != "" && gAction!="AUTH") {
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I');
        focusReqd = false;
        dataBoundElemObj.value = "";
        gIsValid = false;
        isfromscreen = false;
        return;
    }

}
//Redwood_35850089 END

                    
function getDefaultAmountConverter(dataBoundElem, idCCY, isFromLaunch,isME){
  return {
        format :function (value) {
                if (!value) {
                  //  value = 0;
                    return "";
                }
                var dataBoundElemObj = document.getElementById(dataBoundElem);
               
                if(isME){
                if(event){
                    dataBoundElemObj = event.target;
					if(dataBoundElemObj.tagName!=null && dataBoundElemObj.tagName!=undefined){ //Redwood_35850089 
                      while (dataBoundElemObj.tagName && !dataBoundElemObj.tagName.toUpperCase().startsWith('OJ-') ){
                            dataBoundElemObj = dataBoundElemObj.parentNode;
                     }
					//Redwood_35850089 starts
					var boundobjName=dataBoundElem.substr(dataBoundElem.indexOf('__')+2,dataBoundElem.length-dataBoundElem.indexOf('__')+2);
					var curnum=getRowIndex(event)-1;
					if(dataBoundElemObj.name!=boundobjName)
					{dataBoundElemObj = document.getElementById(dataBoundElem+"RC"+curnum);}
					//Redwood_35850089 ends	
					}
                }
            }
            if(dataBoundElemObj) {
                var ccy = getCurrencyValue(dataBoundElemObj, idCCY, false,isME);
                if(typeof(ccy)=='undefined' || ccy==null){
                    ccy = mainWin.Lcy;
                   // return "";
                }
                 var re = new RegExp(gDigitGroupingSymbol, "g");
                value = value.replace(re, "");
                dataBoundElemObj.value = value;
                const mb3Amount = new MB3Amount(value, true, ccy);
                if(!mb3Amount.valid){
                    dataBoundElemObj.value = "";
                    return "";
                }
                //Redwood_35850089  Starts
             else   {
                if(gAction=="EXECUTEQUERY" || gAction==""){
				         dataBoundElemObj.value = mb3Amount.getInputAmount();
                }
		         }
                if(dataBoundElemObj.getAttribute!= undefined){ //Redwood_35850089
					 if(!fnValidateRange(dataBoundElemObj,mb3Amount.getDisplayAmount())){
						dataBoundElemObj.value = "";
						return "";
					}
				}//Redwood_35850089
                return mb3Amount.getDisplayAmount() ;
            }else{
                return value;
            }
            
        }
    }
}

function getNumberFieldInME(numField){
    var fieldDetails = numField.split("__");
    var blockName=fieldDetails[0];
    var idNumberFld = fieldDetails[1];
       var rowNo =  - 1;
                if (document.getElementsByName(idNumberFld).length > 1) {
                    var objTR = dataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
            }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }
//                if (typeof (screenType) != "undefined" && screenType == 'D') {
//                    tableObj = getTableObjForBlock("Innertable_" + functionId);
//                }
//                else {
//                    tableObj = getTableObjForBlock(blockName);
//                }
                tableObj = getTableObjForBlock(blockName);
                if (tableObj && tableObj.tBodies[0].rows.length > 0) { //21457134
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idNumberFld) {
                                return inputElements[j];
                               
                            }
                        }
                    }
        }
             
}

function getElementsByOjName(name, parentWin, blkId, rowNum ) {
    if(parentWin)
    {
        var elements = [...parentWin.document.getElementsByName(name)];
        return elements.filter(elem=>elem.tagName.substr(0,2) == 'OJ');
    }
    if(!blkId)
    {
        var elements = [...document.getElementsByName(name)];
        return elements.filter(elem=>elem.tagName.substr(0,2) == 'OJ');
    }
    else
    {
        var ojElems;
        var ojTagsArr = ['OJ-INPUT-TEXT',  'OJ-INPUT-DATE', 'OJ-INPUT-NUMBER', 'OJ-SELECT-SINGLE', 'OJ-SWITCH', 'OJ-INPUT-DATE-TIME', 'OJ-INPUT-PASSWORD', 'OJ-RADIOSET'];
        var row = getTableObjForBlock(blkId).tBodies[0].rows[rowNum];
        for (var i=0; i<ojTagsArr.length; i++ ) {
            ojElems = [...row.getElementsByTagName(ojTagsArr[i])].filter(elem => elem.getAttribute("name") == name);
            if (ojElems.length > 0) return ojElems;
        }
    }
}


function fnRefreshFieldValue(obj) {
    obj.value = obj.rawValue;
}
function fnBindScreenElements(tabsObj) {
    if(!tabsObj){
      tabsObj = document;  
    }
    if ((getBrowser().indexOf("SAFARI") !=  - 1) || (getBrowser().indexOf("CHROME") !=  - 1) ||  (getBrowser().indexOf("FIREFOX") !=  - 1) || (getBrowser().indexOf("OPERA") !=  - 1)) {
        //ie11 changes//12.0.4 summary performance chages
        try {
        
        
      
            var scriptElements = tabsObj.getElementsByTagName("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));
                    fnEval();
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    }
    /*Fix for 17035806 start*/
    else if (getBrowser().indexOf("IE") !=  - 1) {
        //ie11 changes
        try {
            var scriptElements = tabsObj.getElementsByTagName("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].defer == true) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(scriptElements[i].innerHTML);
                    fnEval();
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    }
      
    
     try {
     if( tabsObj.getElementsByTagName("template")){
         for(var j = 0;j< tabsObj.getElementsByTagName("template").length;j++){
            var scriptElements = tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("script");
            for (var i = 0;i < scriptElements.length;++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));
                    fnEval();
                    
                }
            }
                    fnBindSelectElements(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-select-single"));
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-button"),"oj-button","onclick","on-oj-action");
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-select-single"),"oj-select-single","onchange","on-oj-value-action");
                    fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-radioset"),"oj-radioset","onchange","on-value-changed");
             tabsObj.getElementsByTagName("template")[j].innerHTML =  tabsObj.getElementsByTagName("template")[j].innerHTML.replace(new RegExp("readonly_temp", 'g'), "readonly");
         }
         
     }
     
         
        }
        catch (e) {
            alert(e.message);
        }
        fnBindSelectElements();
       fnUpdateEventActions(null,"oj-button","onclick","on-oj-action");
       fnUpdateEventActions(null,"oj-select-single","onchange","on-oj-value-action");
       fnUpdateEventActions(null,"oj-radioset","onchange","on-value-changed");
    /*fnBindSelectElements(document.getElementsByTagName("template")[0].content.querySelectorAll("oj-select-single"));
    document.getElementsByTagName("template")[0].innerHTML =document.getElementsByTagName("template")[0].innerHTML.replace(new RegExp("value_temp", 'g'), "value");
    document.getElementsByTagName("template")[0].innerHTML =  document.getElementsByTagName("template")[0].innerHTML.replace(new RegExp("readonly_temp", 'g'), "readonly");*/


}

function fnBindSelectElements(obj) {
    var selectElem;
    if (obj != null) {
        selectElem = obj;//.getElementsByTagName("oj-select-single");
    }
    else {
        selectElem = document.getElementsByTagName("oj-select-single");
    }
    for (var cnt = 0;cnt < selectElem.length;cnt++) {
        if (selectElem[cnt].id != ""  && selectElem[cnt].getAttribute("adv_search")== null) {
        var dbt = selectElem[cnt].getAttribute("DBT");
        if(dbt==null || dbt==''){
            dbt =  selectElem[cnt].getAttribute("CONTROL_DBT");
        }
        if(dbt==null || dbt==''){ //sudipta
         dbt = "UIBLOCK";
        }
        var fldName = selectElem[cnt].getAttribute("DBC");
        if(fldName==null || fldName == ''){ //sudipta
         fldName = selectElem[cnt].getAttribute("NAME");
        }
        var fldId = dbt+"__"+fldName;
            selectElem[cnt].setAttribute("data", "[[arrProvider" +fldId + "]]");
        try {
                var parentVal = "";
                while (typeof (isDetailed) == "undefined") {
                    parentVal += "parent."
                    var fnEval = new Function("return " + parentVal + "isDetailed");
                    isDetailed = fnEval();
                }
                if (isDetailed && selectControl[fldId]) {
                    for (var i = 0;i < selectControl[fldId].length;i++) {
                        if (selectControl[fldId][i].defaultValue && selectElem[cnt].getAttribute("ME")!='Y') {
                            selectElem[cnt].setAttribute("value", selectControl[fldId][i].defaultValue);
                        break;
                    }
    }

}

        }
        catch (e) {
            console.log(e);
        }
             if(selectElem[cnt].getAttribute("ME")=='Y'){
                selectElem[cnt].setAttribute(":id", "[['" + fldId + "RC'+row.index]]");
            }
        }

    }
}

function fnUpdateEventActions(obj,elemntType,eventName,actionName) {
    var element;
    if (obj != null) {
        element = obj;//.getElementsByTagName("oj-select-single");
    }
    else {
        element = document.getElementsByTagName(elemntType);
    }
    for (var cnt = 0;cnt < element.length;cnt++) {
        if (element[cnt].id != "WNDbuttonsMin" && element[cnt].id != "WNDbuttons") {
            var onClickMethods = element[cnt].getAttribute(eventName);
            var consolidatedMethod = "";
            if (onClickMethods) {
                element[cnt].removeAttribute(eventName);
                consolidatedMethod = "[[function() {" + onClickMethods + "}.bind(null)]]";
                element[cnt].setAttribute(actionName, consolidatedMethod);
            }
        }

    }
    
    
}

//Non Extensible Mbean Changes
function displayAuditSection(){ //OJET Migration
    document.getElementById("auditPop").open("#BTN_AUDIT");
}
function cancelListener() {
    document.getElementById("auditPop").close();
}
//REDWOOD_35313042 Starts
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
function fnUncheckAll(blockId) {
    var tableObj = getTableObjForBlock(blockId);
    var rowObj = tableObj.tBodies[0].rows;
    for (var i = 0;i < rowObj.length;i++) {
        //rowObj[i].children[0].getElementsByTagName("INPUT")[0].checked = false;//redwood_35303675 commented
		//redwood_35303675 starts
        if(rowObj[i].cells[0].getElementsByTagName("INPUT")[0].checked==true)
        {rowObj[i].cells[0].getElementsByTagName("INPUT")[0].click();}
	//redwood_35303675 ends
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
        l_length = getTableObjForBlock(blockId).tBodies[0].rows.length;
        l_tblElement = getTableObjForBlock(blockId);
    }
    else {
        l_length = getTableObjForBlock(blockId).tBodies[0].rows.length;
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
//REDWOOD_35313042 Ends
//Redwood_35454138
function isChildOf(path,parent) {

    var domHeight = path.length;

    for (var i = 0;i < domHeight;i++) {

        if (path[i].tagName == parent) {
            return true;
        }

    }

    return false;

}


function handleTableTabKey(e){

    var currentCell=findImmediateParentElement(e,'TD');
    var nextCell=findNextActiveTDElement(currentCell.nextElementSibling);
    
     var nextCellElement;
    if(!nextCell){
        var nextRow=findNextRow(currentCell);
        if (nextRow) {
            nextCell = findNextActiveTDElement(nextRow.children[0]);
            nextCellElement=findImmediateOJElement(nextCell).getElementsByTagName("span")[0].children[0];
        }else{
            return true;
        }
    }else{
        nextCellElement = findImmediateOJElement(nextCell);
    }
   
    
    preventpropagate(e);
    focusElement(nextCellElement);
return false;
}

function handleTableTabAndShiftKey(e,blockId){

    var currentCell=findImmediateParentElement(e,'TD');
    var previousCell=findPreviousActiveTDElement(currentCell.previousElementSibling);
    
    if(!previousCell){
        var previousRow=findPreviousRow(currentCell);
        if (previousRow) {
            previousCell = findPreviousActiveTDElement(previousRow.children[previousRow.children.length-1]);
        }
    }
    var previousCellElement;
    if(previousCell){
        if(previousCell.previousElementSibling){
             previousCellElement = findImmediateOJElement(previousCell);
        }else{
             previousCellElement = findImmediateOJElement(previousCell).getElementsByTagName("span")[0].children[0];
        }
    }else{
        previousCellElement =getTableObjForBlock(blockId).parentNode.parentNode.getElementsByTagName("span")[0].children[0];
    }
    
    preventpropagate(e);
    focusElement(previousCellElement);

}


function findPreviousActiveTDElement(element) {
    if (!element) {
        return;
    }
    if (element.classList.contains('TDnone') || findImmediateOJElement(element).readonly) {
        return findPreviousActiveTDElement(element.previousElementSibling);
    } else{
        return element;
    }
}

function findNextActiveTDElement(element) {
    if (!element) {
        return;
    }
    
   var ojElement= findImmediateOJElement(element);
    if (element.classList.contains('TDnone') || ojElement.readonly||ojElement.disabled) {
        return findNextActiveTDElement(element.nextElementSibling);
    } else {
        return element;
    }

}

function findPreviousRow(element) {
    return element.parentNode.previousElementSibling;

}

function findNextRow(element) {
    return element.parentNode.nextElementSibling;

}

function findImmediateOJElement(parent) {
    if (!parent) {
        return;
    }
    if (parent.children[0]) {
        if (parent.children[0].tagName.startsWith('OJ')) {
            return parent.children[0];

        } else {
            return findImmediateOJElement(parent.children[0]);
        }
    }

}

function findImmediateParentElement(e,tagName){
    if(!tagName||tagName==''){
    return;
    }
    var path = e.path || (e.composedPath && e.composedPath());
    var immediateTDElement;
                for (var i = 1;i < path.length;i++) {
                    if(path[i].tagName==tagName){
                        immediateTDElement = path[i];
                        break;
                    }
                }
    return immediateTDElement;     
}			  
function getOjTableRowsLength(blockId, doc) {//OJET Migration
    var length = 0;
    var tableObj = getTableObjForBlock(blockId, doc);
    if (tableObj == null) {
        length = 0;
    } else {
        length = tableObj.tBodies[0].rows.length;
        if (length > 0 && tableObj.tBodies[0].rows[0].cells[0].getElementsByTagName('OJ-SELECTOR').length > 0) {
           // length = length;
        } else {
            length = 0;
        }
    }
    return length;
}
//Redwood_35454138