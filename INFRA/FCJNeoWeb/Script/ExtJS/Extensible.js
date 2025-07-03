/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : Extensible.js
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
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
---------------------------------------------------------------------------------------------------------
**  Modified By          : Neethu Sreedharan
**  Modified On          : 22-Sep-2016
**  Modified Reason      : Changes done to populate subsystem dependent field values during modify 
                           operation 
**  Retro Source         : 9NT1606_12_0_1_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_2_RETRO_12_0_1_23652853

**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Sep-2016
**  Modified Reason      : For screens like 1401 where UDF appears to be as a subsystem, multiple entry table in 
                             UDF call form is converted to be displayed as single entry fields. 
**  Retro Source         : 9NT1606_12_1_METROPOLITAN_BANK_&_TRUST_CO 
**  Search String        : 9NT1606_12_2_RETRO_12_1_23664151

**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Sep-2016
**  Modified Reason      : Changes done to retain the query response when user cancels liquidate action 
**  Retro Source         : 9NT1606_12_0_2_UNITED_COMMERCIAL_BANK_LTD 
**  Search String        : 9NT1606_12_2_RETRO_12_0_2_23656279

**  Modified By          : Neethu Sreedharan
**  Modified On          : 26-Jul-2017
**  Modified Reason      : Changes done to show the scroll bar in the header, if the header section 
                           contains more contents than 40 percent of screen height.  
**  Retro Source         : 9NT1606_12_3_BANK_SOUTH_PACIFIC_LTD 
**  Search String        : 9NT1606_12_4_RETRO_12_3_26524964
**
**  Modified By          : Shayam Sundar R
**  Modified On          : 08-Mar-2017
**  Modified Reason      : Changes done to validate mandatory fields for hold operation
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230533

**  Modified By          : Neethu Sreedharan
**  Modified On          : 12-Aug-2017 
**  Modified Reason      : Enhancement has been done to set udf values 
**  Retro Source         : 9NT1606_12_0_3_ABU_DHABI_COMMERCIAL_BANK
**  Search String        : 9NT1606_12_4_RETRO_12_0_3_26550099  
**
**  Modified By          : Nalandhan G
**  Modified On          : 25-Sep-2017
**  Modified Reason      : Changes done to check the 'fieldIdDesc' so that OK button 
                           should work on UDF screen
**  Retro string         : ALPHA ROMANIA_26518591
**  Search String        : 9NT1606_12_4_RETRO_12_3_26724244
**
**  Modified By          : Nalandhan G
**  Modified On          : 26-Sep-2017
**  Modified Reason      : Changes done so that Custom call will happen whenever modifiable
                           flag is yes at rad level.
                           code added for same to pass proper arguments.
**  Retro string         : COÖPERATIEVE RABOBANK U.A._26793222 
**  Search String        : 9NT1606_12_4_RETRO_12_3_26861729

**  Modified By          : Ambika S 
**  Modified On          : 03-Jan-2018
**  Modified Reason      : Changes done to update the branch Info array(date,period,EOI status) on load
                           of the functionID screen
**  Search String        : 9NT1606_14_0_RETRO_12_2_27297165

**  Modified By          : Ambika Selvaraj
**  Modified On          : 18-Jun-2018
**  Modified Reason      : Advanced search is not getting displayed for screen child of ELCM screens
**  Search String        : 9NT1606_14_1_RETRO_12_4_28118332

**  Modified By          : Shen
**  Modified On          : 29-Aug-2018
**  Change Description   : For Maintenance screen derivation UDF is not getting picked up during Modification, code Modified for Derivation UDF Pickup
**  Search String        : BUG_27762675_UDFPickup_FIX

**  Modified By          : Mantinder Kaur
**  Modified On          : 29-Aug-2018
**  Change Description   : Failure response not getting shown on the screen on failure to get the previous modification details.							 
**  Search String        : FCUBS_KBANK_140_28897769

**  Modified By          : Partha Sarmah
**  Modified On          : 23-Nov-2018
**  Change Description   : Changes done to avoid duplication of UDF during Copy.
**  Search String        : Bug_28934648 	

**  Modified By          : Partha Sarmah
**  Modified On          : 21-Oct-2019
**  Change Description   : Added code to reset the snapshot id for new ,Query and copy case.Retro from 29251038 is done.
**  Search String        : FCUBS_14.1_UNICREDIT S.P.A._30439521_RETRO_29251038

**  Modified By          : Vignesh MG
**  Modified On          : 23-Jan-2020
**  Change Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
**  Search String        : 30620131

**  Modified By          : Saloni Rai
**  Modified On          : 11-Feb-2020
**  Change Description   : Changes done to restrict entering special characters (tilde/carat) in the UDF fields.
**  Search String        : Bug_30834995

**  Modified By          : Mayuri Mudliar
**  Modified On          : 13-Mar-2020
**  Change Description   : Bug 30989461 - SYSTEM FREEZE WHEN USER TRY TO POP-UP INSTRUCTION VIEW WHEN CLICK ON F6 BUTTON 
**  Search String        : FCUBS_141_JACCS INTERNATIONAL VIETNAM FINANCE_30989461_RETRO_28784372

**  Changed By         : Ravisankar P
**  Changed On		 : 29-Oct-2020
**  Change Description : Changes to modify error message during snapshot id validation
**  Search String		 : OBTF14.5_Snapshot_ID_Validation

**  Modified By          : Pulak Rabha
**  Modified On          : 11-Jul-2022
**  Change Description   : Authorize subscreen doesn't open for OBPM Maintenance screens 
**  Search String        : Bug33917911

**  Modified By          : Nagendra Satrasala
**  Modified On          : 18-Apr-2023
**  Change Description   : STDPGMNT: IN MULTI ENTRY BLOCK DIFFERENT BEHAVIOR NOTICED BETWEEN NON-REDWOORD AND REDWOOD
**  Search String        : Bug_35239333_Redwood

**  Modified By          : Girish M
**  Modified On          : 20-Apr-2023
**  Change Description   : Enable of Multi Entry was not happening
**  Search String        : redwood_35278374

**  Modified By          : Girish M
**  Modified On          : 29-Apr-2023
**  Change Description   : Subscreens were not launching when no data is available.
**  Search String        : REDWOOD_35176392

**  Modified By          : Selvam Manickam
**  Modified On          : 09-May-2023
**  Change Description   : Unable to launch the EOD related screen from branch which is not in the transaction stage
**  Search String        : REDWOOD_35369271

**  Modified By          : Selvam Manickam
**  Modified On          : 15-May-2023
**  Change Description   : Unable to launch the CLRU screen
**  Search String        : REDWOOD_35357384

**  Modified By          : Girish M
**  Modified On          : 11-June-2023
**  Change Description   : Page number handling during navigation
**  Search String        : REDWOOD_35425629

**  Modified By          : Manoj
**  Modified On          : 17-Aug-2023
**  Change Description   : Functions are moved into settimeout call.
**  Search String        : redwood_35686586

**  Modified By          : Selvam Manickam
**  Modified On          : 28-Aug-2023
**  Modified Reason      : Redwood Fixes for View Changes
                           SCRIPT ERROR IN USER DEFINED ELEMENT VALUES MAINTENANCE SCREEN
**  Search String        : REDWOOD_35670751


**  Modified By          : Girish M
**  Modified On          : 28-Nov-2023
**  Modified Reason      : Redwood Fixes for Enabling fields during unlock
**  Search String        : Bug_36057720 


**  Modified By          : Girish M
**  Modified On          : 20-May-2024
**  Modified Reason      : Code handled to fetch proper values if more than 25 UDFs are maintained.
**  Search String        : REDWOOD_36402699

**  Modified By          : Chaitanya Pundlik
**  Modified On          : 17-Dec-2024
**  Change Description   : Enable Hotkeys for pps (non-codeployed setups) 
**  Search String        : Bug_36924146
---------------------------------------------------------------------------------------------------------*/
//REDWOOD_CHANGES
//define([
//    'jquery',
//    'ojs/ojcore',
//    'knockout',
//    'ojs/ojarraydataprovider',
//    'ojs/ojpagingdataproviderview',"ojs/ojconverter-number",
//    'ojs/ojinputtext',
//    'ojs/ojnavigationlist',
//    'ojs/ojradioset',
//    'ojs/ojtable',
//    'ojs/ojswitcher',
//    'ojs/ojselectsingle',
//    'ojs/ojselectcombobox',
//    'ojs/ojarraytabledatasource',
//    'ojs/ojpagingcontrol',
//    'ojs/ojpagingtabledatasource',
//    'ojs/ojswitch',"ojs/ojlabelvalue", "ojs/ojbutton","ojs/ojswitch", 'ojs/ojnavigationlist','ojs/ojconveyorbelt'
//],
//       function ($, oj, ko,  ArrayDataProvider,PagingDataProviderView,ojconverter_number_1) {
//        function mainContentViewModel(context) {
//        };
//      $(document).ready(function(){
//        var model = new mainContentViewModel();
//	try{
//          mainWinKo = ko;
//          ojconverter_number=ojconverter_number_1;
//          tempArrayDataProvider = ArrayDataProvider;
//          pagingDataProviderView = PagingDataProviderView;
//          showTable = ko.observable(true);
//            setTimeout(function() {
//                fnLoad(xmlFileName,xslFileName);
//                ko.cleanNode(document.getElementById("DIVWNDContainer"));
//                ko.applyBindings(model,document.getElementById("DIVWNDContainer")); 
//                parent.unmask();
//          },500);
//	  }catch (e){
//	  }
//	 
//	});
//    }
//);
var tempArrayDataProvider;
var pagingDataProviderView;
var selectControl={};
var selectArrayProvider={};
var multipleEntryFieldList=[];
var meArrayForAddDelete = {};
var showTable;
var recordsPerPageDataProvider;
var recordsPerPage;
var ojconverter_number; 
//REDWOOD_CHANGES
var isPrintLoaded = false;
var authFunction = '';
var authUixml = '';
var authScreenName = '';
var viewMnt = false;
var responseDOM_Modify = null;
var ShowSummary = "FALSE";
//11.1 Remarks Changes - Starts Here
var maker_Remarks = '';
var makerOverideRemarks = '';
var checkerRemarks = '';
var snapShotId = ''; //Snapshot ID Changes

//11.1 Remarks Changes - Ends Here 
var g_txnBranch = mainWin.CurrentBranch;
if (!mainWin.txnBranch[mainWin.CurrentBranch]) {
  mainWin.txnBranch[mainWin.CurrentBranch] = new setTxnBrnInfo();
}
var viewMntWinParams = new Object();
var VIEWMAINT = "FALSE";
var oldResDOM_Delete = '';
var oldResDOM_Cancel = null;
var g_scrType = "";
var subScrHeaderTabId = "";
var subScrBodyTabId = "";
var gActionMainScreen = "";
var gIsValid = true;
var gDispAlertOnSuccess = "Y";
var l_offlineAllowed = "N";
var slipopened = false;
var gsave = false;
var ghold = false;//Bug no: 16290155 Changes
//Performance Changes Starts
var inTime = "";
//Performance Changes Ends
var authReq = 'N';
var detailpkArgs = new Array();
var actualAction="";//Amend Array Changes
var isResponseProcessed = false; //21301992
var gActualAction =""; //BUG_27762675_UDFPickup_FIX
window.onorientationchange = fnCalcHgt;//HTML5 Changes	   
//REDWOOD_CHANGES
if ( typeof(extBpelJs) !=  'undefined' && extBpelJs != '' ) {
    coreFnLoad = fnLoad;
    coreFnSave = fnSaveAll;
    coreFnExit = fnExitAll;
    coreFnNew = fnNew;
    coreFnSubScreenMain = fnSubScreenMain;
    coreFnCloseAlertWin = fnCloseAlertWin;
}	   
//REDWOOD_CHANGES
function fnFocus() {
  mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);

  if (userFuncId != '' && userFuncId != 'null') {
    mainWin.document.getElementById("fastpath").value = userFuncId;
  }
  else {
    mainWin.document.getElementById("fastpath").value = functionId;
  }		 
//REDWOOD_CHANGES
 if(parent.document.getElementsByTagName("OJ-MENU")){ //OJET Migration
    var menuList = parent.document.getElementsByTagName("OJ-MENU");
    for(var i = 0;i<menuList.length;i++){
        menuList[i].close();
    }
 }	
//REDWOOD_CHANGES
  fnPostFocusMain();
}

function fnSetPkvals(v_pkVals) {
  l_pkArray = v_pkVals.split("~");
  for (var i = 0;i < l_pkArray.length;i++) {
    if (l_pkArray[i].indexOf("00:00:00") !=  - 1) {
      l_pkArray[i] = l_pkArray[i].substring(0, l_pkArray[i].indexOf("00:00:00") - 1);
    }
    var element = document.getElementById(pkFields[i]);
   // if (element.type.toUpperCase() == 'RADIO') {	  //REDWOOD_CHANGES
    if (element.tagName.toUpperCase() == 'OJ-RADIO-SET') { //REDWOOD_CHANGES
      var radioEle = document.getElementsByName(pkFields[i].substring(pkFields[i].lastIndexOf("__") + 2, pkFields[i].length));
      for (var lpIdx = 0;lpIdx < radioEle.length;lpIdx++) {
        if (radioEle[lpIdx].value == l_pkArray[i]) {
          radioEle[lpIdx].checked = true;
        }
      }
    }
    else {
		element.setAttribute("value", l_pkArray[i]) ;//REDWOOD_CHANGES
      //element.value = l_pkArray[i];  //REDWOOD_CHANGES
    }
  }
}

function fnwaitExecuteQuery(parentWin) {
    //fnCalcHgt();
    mask();
    gAction = "ENTERQUERY";
    debugs("calling resetDOM", "");
    resetDOM();
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
            if (document.getElementById(txnBranchFld).className != "hidden") {
                for (var j = 0;j < pkFields.length;j++) {
                    if (pkFields[j] == txnBranchFld) {
                        fnEnableElement(document.getElementById(txnBranchFld));
                        document.getElementById(txnBranchFld).value = g_txnBranch;
                        break;
                    }
                }
            }
        }
    }

    debugs("calling fnSetPkvals", "");
    //12.0.3 Summary to detail changes starts
    if (typeof (parentWin.detailWinParams.DetailPkVals) == "object") {
        fnSetPkvals(parentWin.detailWinParams.DetailPkVals[0]);
        detailpkArgs = parentWin.detailWinParams.DetailPkVals;
    }
    else {
        fnSetPkvals(parentWin.detailWinParams.DetailPkVals);
    }
    //12.0.3 Summary to detail changes ends
    gAction = 'EXECUTEQUERY';
    //fnExecuteQueryAsync();  
    debugs("calling fnExecuteQuery", "");
    if (!fnExecuteQuery())
        return;
    //12.0.3 Summary to detail changes starts
    fnUpdateMultiDetailNavBtns(false);
    //12.0.3 Summary to detail changes starts
}

function fnLoad(xmlFileName, xslFileName) {//REDWOOD_CHANGES
  var t = getDateObject();
  var startjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();

  var tmpFnid = functionId;
  debugs("FunctionId", functionId);
  debugs("xmlFileName", xmlFileName);
  debugs("xslFileName", xslFileName);
  if (!fnPreLoadMain())
    return false;

  try {
    //SFR#17180707 retro Bug 17054547 Changes starts
    if (typeof (screenType) != "undefined" && screenType == "WB") {
      var funcid = functionId;
      functionId = uiXML.substr(0, uiXML.indexOf("."));
    }
    //SFR#17180707 retro Bug 17054547 Changes Ends
    /*12.1 Performance related changes start */
    if (screenType == "WB") {
      if (xmlFileName.indexOf("ASSIGN.xml") ==  - 1) {
        var tmpxml = dataObj.uiXml.substring(0, dataObj.uiXml.indexOf(".", 0));
        tmpFnid = tmpxml;
      }
      else {
        tmpFnid = "ASSIGN.xml";
      }
    }
    var tmpFnidScrName = tmpFnid + strScreenName;
    if (typeof (mainWin.screenHtmlCache[tmpFnidScrName]) == "undefined") {
      debugs("Screen cached=No", "");
      var html = ShowXML(xmlFileName, xslFileName, strScreenName);
      mainWin.screenHtmlCache[tmpFnidScrName] = new Object();//12.1 Caching Tab load
      if (getBrowser().indexOf("IE") !=  - 1) {
        //ie11 changes
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
    document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly").replace(new RegExp("oj_switch_readonly", 'g'), "disabled");
    var htmlContent = document.getElementById("ResTree").innerHTML;
    
      
      mainWin.screenHtmlCache[tmpFnidScrName].cachedHTML = htmlContent;
//REDWOOD_CHANGES
      mainWin.screenHtmlCache[tmpFnidScrName].cachedScrName = strScreenName;
      mainWin.screenHtmlCache[tmpFnidScrName].cachedScrType = g_scrType;
      mainWin.screenHtmlCache[tmpFnidScrName].cachedSubScrHeaderTabId = subScrHeaderTabId;
      mainWin.screenHtmlCache[tmpFnidScrName].cachedSubScrBodyTabId = subScrBodyTabId;
      mainWin.screenHtmlCache[tmpFnidScrName].cachedXmlFileName = gXmlFileName;
      mainWin.screenHtmlCache[tmpFnidScrName].cachedScreenName = gScreenName;
      mainWin.screenHtmlCache[tmpFnidScrName].cachedXslFileName = gXslFileName;
    
    } else {
      strScreenName = mainWin.screenHtmlCache[tmpFnidScrName].cachedScrName;
      g_scrType = mainWin.screenHtmlCache[tmpFnidScrName].cachedScrType;
      subScrHeaderTabId = mainWin.screenHtmlCache[tmpFnidScrName].cachedSubScrHeaderTabId;
      subScrBodyTabId = mainWin.screenHtmlCache[tmpFnidScrName].cachedSubScrBodyTabId;
      gXmlFileName = mainWin.screenHtmlCache[tmpFnidScrName].cachedXmlFileName;
      gScreenName = mainWin.screenHtmlCache[tmpFnidScrName].cachedScreenName;
      gXslFileName = mainWin.screenHtmlCache[tmpFnidScrName].cachedXslFileName;
      document.getElementById("ResTree").innerHTML = mainWin.screenHtmlCache[tmpFnidScrName].cachedHTML;
    }
    fnBindScreenElements();//REDWOOD_CHANGES
  } catch (e) {
    alert(e.message);
    alertAction = "CLOSESCR";
    return;
  }
  //SFR#17180707 retro Bug 17054547 Changes starts
  if (typeof (screenType) != "undefined" && screenType == "WB" && typeof (funcid) != "undefined") {
    functionId = funcid;
  }
  //SFR#17180707 retro Bug 17054547 Changes Ends
  debugs("Inner Html", document.getElementById("ResTree").innerHTML);
  document.getElementById("toolbar").style.display = "flex";  //REDWOOD_CHANGES
  //static header change start
  fnSetScreenSize();
  if (ShowSummary != "TRUE")
    expandContentLoad(strCurrentTabId);//12.0.3 changes
//  fnBuildMultipleEntryArray(strCurrentTabId);//REDWOOD_CHANGES
  //Static Header change end
  debugs("fnProcessOtherActions", "");
  /*Summary Action Start*/
  var tSum = getDateObject();
  var sumStartTime = (tSum.getHours() * (3600 * 1000)) + (tSum.getMinutes() * (60 * 1000)) + (tSum.getSeconds() * 1000) + tSum.getMilliseconds();
  var result = fnProcessOtherActions();
  var tSumEnd = getDateObject();
  var sumEndTime = (tSumEnd.getHours() * (3600 * 1000)) + (tSumEnd.getMinutes() * (60 * 1000)) + (tSumEnd.getSeconds() * 1000) + tSumEnd.getMilliseconds();

  if (!result){
    fnCalcTimings(startjsTime, sumStartTime, sumEndTime);
    return;
  }

  //static header change    
  expandContentLoad(strCurrentTabId);
  debugs("loadChildWindow for seqno", seqNo);
  mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
  debugs("fnAddWindowMenu for seqno", seqNo);
  mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
  mainWin.fnSetDatalist(functionId); //REDWOOD_CHANGES
  //changes_for_24x7 and 30797073 
  if (typeof (screenType) != "undefined" && screenType == "WB"){
	if( typeof(mainWin.branchAvlbltyStatus) == "undefined" || mainWin.branchAvlbltyStatus == null || mainWin.branchAvlbltyStatus=="" )//jc2 changes
	  mainWin.branchAvlbltyStatus  = 'Y';
	}
  if ((mainWin.branchAvlbltyStatus != 'Y' || mainWin.BranchEoi != 'N' ) && ((mainWin.eodFunctions.indexOf(functionId) > 0) || l_offlineAllowed == 'Y'))//jc2 24*7 changes fix for bug#21980772
        //document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML  = document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML + ": " + eodDesc;
	      document.getElementById("wndtitle").getElementsByTagName("H1")[0].innerHTML  = document.getElementById("wndtitle").getElementsByTagName("H1")[0].innerHTML + ": " + eodDesc; //REDWOOD_35369271
  //changes_for_24x7
  debugs("calling showToolbar", "");
  if(ShowSummary != "TRUE") //Fix for 23087742
  showToolbar(functionId, "", "");
  debugs("Adjusting Height", "");
//change to fix tab container height while section expand/collapse start 19/Jan/2017

  var expandSectionArr = document.getElementsByName("BtnSectionExpand");
  if (expandSectionArr.length > 0) {
    for (var cnt = 0;cnt < expandSectionArr.length;cnt++) {
      expandCollapseSection(expandSectionArr[cnt], "EXPAND");
    }
  }	  
//REDWOOD_CHANGES
  if (ShowSummary != "TRUE"){//12.0.3 changes
    setTimeout(function() {
    fnCalcHgt();
    if(document.getElementById("BTN_EXIT_IMG")){
       document.getElementById("BTN_EXIT_IMG").focus();
  }
    },0);
  }    
//REDWOOD_CHANGES
  fnExpandCollapseSubSys(); //Fix for 25460761 27/Jan/17
  //Fix for 17233213 start
  var collapsedSectionArr = document.getElementsByName("BtnSectionCollapse");
  if (collapsedSectionArr.length > 0) {
    for (var cnt = 0;cnt < collapsedSectionArr.length;cnt++) {
      fireHTMLEvent(collapsedSectionArr[cnt], "onclick");
    }
  }
    //change to fix tab container height while section expand/collapse end 19/Jan/2017
    //mainWin.fnSetDatalist(functionId);//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist //REDWOOD_CHANGES
  //30620131 -- start
  if (document.getElementById("subscrlist"))
  {
	fnSubScreenDetails();
  }
  //30620131 -- end
  debugs("Calling fnPostLoad", "");
  //document.getElementById("BTN_EXIT_IMG").focus();   //REDWOOD_CHANGES
  //fnPostLoadMain();  //REDWOOD_CHANGES
  if(typeof (screenType) != "undefined" && screenType !="WB"){
    fnCalcTimings(startjsTime, sumStartTime, sumEndTime);
  }
  ShowSummary = "FALSE";

}
//REDWOOD_CHANGES
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
                    //fnUpdateEventActions(tabsObj.getElementsByTagName("template")[j].content.querySelectorAll("oj-input-text"),"oj-input-text","onchange","on-value-changed");
             tabsObj.getElementsByTagName("template")[j].innerHTML =  tabsObj.getElementsByTagName("template")[j].innerHTML.replace(new RegExp("readonly_temp", 'g'), "readonly").replace(new RegExp("oj_switch_readonly", 'g'), "disabled").replace(new RegExp("viewchanges", 'g'), ":viewchanges");//REDWOOD_35670751
         }
         
     }
     
         
        }
        catch (e) {
            alert(e.message);
        }
       fnBindSelectElements(tabsObj.getElementsByTagName("oj-select-single"));
       fnUpdateEventActions(null,"oj-button","onclick","on-oj-action");
       fnUpdateEventActions(null,"oj-select-single","onchange","on-oj-value-action");
       fnUpdateEventActions(null,"oj-radioset","onchange","on-value-changed");
       //fnUpdateEventActions(null,"oj-input-text","onchange","on-value-changed");
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
        if(dbt==null){
            dbt =  selectElem[cnt].getAttribute("CONTROL_DBT");
        }
        var fldName = selectElem[cnt].getAttribute("name");
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
				selectElem[cnt].setAttribute("viewchanges", "[[row.data." + fldName + "color]]");//REDWOOD_35670751 //redwood_36205179
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
                //onClickMethods = onClickMethods.replaceAll('this',"document.getElementById('"+element[cnt].id+"')");
                consolidatedMethod = "[[function() {" + onClickMethods + "}.bind(null)]]";;
                element[cnt].setAttribute(actionName, consolidatedMethod);
            }
        }

    }
    
    
}  
//REDWOOD_CHANGES
function fnSetTime(inLoadTime, startTime, functionId) {

  if (mainWin.mBean_required == "Y") {
    var dbtime = 0;

    var servertime = parseFloat(clientHandlerExit - clientHandlerEntry)/parseFloat(1000);//my mbean changes
    t = getDateObject();
    time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    var jstime = parseFloat(parseFloat(time) - parseFloat(startTime)) / parseFloat(1000);
    jstime = Math.round(jstime * 100) / 100;
    setActionTime(inLoadTime, functionId, 'LOAD');//mbean changes
  }

}

function fnProcessOtherActions() {

  //Ashok I am not getting what is hapenning here?
  if (document.getElementsByName("ONCEAUTH")[0] != undefined) {
    onceAuthObj = document.getElementsByName("ONCEAUTH")[0];
    debugs("once Auth", onceAuthObj);
  }

  if (parentSeqNo != "" && parentSeqNo != "null") {
    debugs("parentSeqNo=", parentSeqNo);
    var parentWin = "";

    for (var i = 0;i < mainWin.arrChildWindows.length;i++) {
      if (mainWin.arrChildWindows[i].id == parentSeqNo) {
        parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
        break;
      }
    }
	//parentWin.hotKeyPressed = false;//12.1_22453735 //FCUBS_141_JACCS INTERNATIONAL VIETNAM FINANCE_30989461_RETRO_28784372
    if (parentWin.VIEWMAINT == "TRUE") {
      inDate = setActionTime();
      debugs("Loading detail screen for View Maint Log changes", "");
      var gPrevAction = gAction;
      gAction = parentWin.viewMntWinParams.action;
	  //Fix for bug 21075589
      if(typeof (parentWin.viewMntWinParams.FcjViewMntReqDom) != "undefined")
        FcjViewMntResDom = fnPost(parentWin.viewMntWinParams.FcjViewMntReqDom, servletURL, functionId);
      else if(typeof(parentWin.viewMntWinParams.FcjViewMntResDom != "undefined"))
        FcjViewMntResDom = parentWin.viewMntWinParams.FcjViewMntResDom;
		//Fix for bug 21075589
      //fnpostAction(gAction, FcjViewMntResDom);
      gAction = gPrevAction;
      var authResDom = fnGetDataXMLFromFCJXML(FcjViewMntResDom, 1);
      debugs("authResDom received", authResDom);
      setDataXML(getXMLString(authResDom));
      //11.4_TFCBTWD_16514103 starts
      var mesgStatusNode = selectSingleNode(FcjViewMntResDom, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
      var mesgStatus = getNodeText(mesgStatusNode);
      if (mesgStatus == "FAILURE") {
        v_xPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP";
        if (!selectSingleNode(FcjViewMntResDom, v_xPath)) {
          mask();
          showAlerts(fnBuildAlertXML('ST-COM036', 'E'), 'E');
          alertAction = "UNMASK";
          return false;
        }
        messageNode = getXMLString(selectSingleNode(FcjViewMntResDom, v_xPath));
        displayResponse(messageNode, mesgStatus, 'E', v_xPath);
		//FCUBS_KBANK_140_28897769 starts
        alertAction = "CLOSESCR";
        return 'FAILURE';		
        //return false;
		//FCUBS_KBANK_140_28897769 ends
      }
      //11.4_TFCBTWD_16514103	ends
      mainWin.Authdom = null;
      resetIndex();
      viewMnt = true;
      debugs("Painting Data", "");
      showData();
      viewModeAction = true;
      disableAllElements("INPUT");
      fnEnableBlockCheckBox();
      viewModeAction = false;
      fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
      gAction = "";
      showToolbar("", "", "");
      debugs("sucessfully Loaded Detail screen for View Maint Log changes", "");
    } else if (parentWin.launchFormScrArgs) {
      if (parentWin.launchFormScrArgs["ACTION_CODE"] && parentWin.launchFormScrArgs["ACTION_CODE"] != '') {
        debugs("Loading Detail screen for Launch Screen", "");
        //expandContentLoad(strCurrentTabId); static header change
        fnCalcHgt();
        debugs("loadChildWindow and adding to menu", seqNo);
        mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
        mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);

        fnEnterQuery();
        fnPopulateScrArgs(parentWin.launchFormScrArgs, strScreenName, functionId);
        gAction = parentWin.launchFormScrArgs["ACTION_CODE"];
        debugs("Action code=", gAction);
        if (!fnEventsHandlerSubScreen('fnPostLaunchForm', strScreenName, functionId, parentWin.launchFormScrArgs))
          return;
        debugs("Calling fnExecuteQuery", "");
        setTimeout(function() { fnExecuteQuery()},0); //REDWOOD_CHANGES
        debugs("sucessfully loaded Detail screen for Launch Screen", "");
        return false;
      }
    }/*Function Id as Service Call Changes starts */
    else if (parentWin.serviceScrArgs) {
      if (parentWin.serviceScrArgs["ACTION_CODE"] && parentWin.serviceScrArgs["ACTION_CODE"] != '') {
        debugs("Loading Detail screen for Service Screen", "");
        //expandContentLoad(strCurrentTabId); static header change
        fnCalcHgt();
        debugs("loadChildWindow and adding to menu", seqNo);
        mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
        mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);

        fnEnterQuery();
        fnPopulateScrArgs(parentWin.serviceScrArgs, strScreenName, functionId);
        gAction = parentWin.serviceScrArgs["ACTION_CODE"];
        debugs("Action code=", gAction);
        if (!fnEventsHandlerSubScreen('fnPostLaunchServiceScr', strScreenName, functionId, parentWin.serviceScrArgs))
          return;
        debugs("Calling fnExecuteQuery", "");
        fnExecuteQuery();
        debugs("sucessfully loaded Detail screen for Service Screen", "");
        return false;
      }
    } 
    /*Function Id as Service Call Changes ends */
    else if (parentWin.detailWinParams && !parentWin.hotKeyPressed) { //FCUBS_141_JACCS INTERNATIONAL VIETNAM FINANCE_30989461_RETRO_28784372
      debugs("Launch Detail screen from summary", "");
      //expandContentLoad(strCurrentTabId); static header change
      //fnCalcHgt();   //REDWOOD_CHANGES
      debugs("calling fnwaitExecuteQuery", "");
      ShowSummary = "TRUE";
      setTimeout(function () { //REDWOOD_CHANGES
        fnCalcHgt();
      fnwaitExecuteQuery(parentWin);
      },0);					    //REDWOOD_CHANGES
      debugs("Loading Detail screen from summary", "");
    }
	parentWin.hotKeyPressed = false; //FCUBS_141_JACCS INTERNATIONAL VIETNAM FINANCE_30989461_RETRO_28784372
  } else {
    debugs("Nothing to Process", "");
  }

  if (typeof (dashboardSeqNo) != "undefined" && dashboardSeqNo != "" && dashboardSeqNo != "null" && dashboardSeqNo != "undefined") {
    var dashboardWin = parent.document.getElementById(dashboardSeqNo).children[0].contentWindow;
    if (dashboardWin.detailWinParams) {
      fnCalcHgt();
      fnwaitExecuteQuery(dashboardWin);
      ShowSummary = "TRUE";
      if (!fnEventsHandler('fnPostLoadDashboard')) {
        mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
        mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
        return false;
      }
    }
  }

  l_offlineAllowed = mainWin.gOfflineAllowed;
  if (mainWin.applicationName == "FCIS") {
    xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + functionId + "']");
    if (functionIdNode)
      l_offlineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
  }

  /*Fix for 19780217 Starts*/
    fnUpdateTxnBrnVariables(g_txnBranch); //9NT1606_14_0_RETRO_12_2_27297165
    var branchEoi = "";
    if (!mainWin.txnBranch[g_txnBranch]) {
        branchEoi = mainWin.BranchEoi;
    }else{        
        branchEoi = mainWin.txnBranch[g_txnBranch].BranchEoi;
    }
    if ((branchEoi != 'N') && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y')  /*Fix for 19780217 ends*/
    alert(lblBranchStage);
  return true;
}

function fnNew() {
  //12.0.3 Summary to detail changes starts
  fnUpdateMultiDetailNavBtns(true);
  detailpkArgs = new Array();
  //12.0.3 Summary to detail changes ends
  debugs("FunctionId=", functionId);

  if (getBrowser().indexOf("OPERA") !=  - 1) {
    //ie11 changes
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && multiBrnScrOpened == false && mainWin.gActiveWindow.screenType != "WB") {
      var currBrn = mainWin.CurrentBranch;
      var istxnBrn = true;
      var l_Params = "currBrn=" + currBrn;
      l_Params += "&istxnBrn=" + istxnBrn;
      //mask();	   //REDWOOD_CHANGES
      loadSubScreenDIV("ChildWin", "TxnBranch.jsp?" + l_Params)
      if (!fnPreNewMain())
        return;
    }
  }
  else {

    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && multiBrnScrOpened == false && mainWin.gActiveWindow.screenType != "WB") {
      fnOpenTxnBrnScreen();
      return;
    }
    if (!fnPreNewMain())
      return;
  }
  //changes_for_24x7
  if (typeof (screenType) != "undefined" && screenType == "WB"){
	if( typeof(mainWin.branchAvlbltyStatus) == "undefined" || mainWin.branchAvlbltyStatus == null || mainWin.branchAvlbltyStatus=="" )//jc2 changes
	  mainWin.branchAvlbltyStatus  = 'Y';
	}
  if ((mainWin.branchAvlbltyStatus != 'Y') && typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && ((mainWin.eodFunctions.indexOf(functionId) > 0) || l_offlineAllowed == 'Y'))//jc2 24*7 changes //fix for bug#22162563 
        document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML  = document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML + ": " + eodDesc;
		//changes_for_24x7
  try {
   multiBrnScrOpened = false; //Fix for 20117468
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
      resetElements(document.getElementById("TBLPage" + strHeaderTabId));
    }
    resetElements(document.getElementById("TBLPage" + strCurrentTabId));
    fnClearMultipleEntryBlocks();
    if (typeof (strFooterTabId) != 'undefined' && strFooterTabId != "") {
      resetElements(document.getElementById("TBLPage" + strFooterTabId));
    }
    fcjResponseDOM = null;
	snapShotId =''; //Fix for FCUBS_14.1_UNICREDIT S.P.A._30439521_RETRO_29251038
    createDOM(dbStrRootTableName);
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
      enableForm(document.getElementById("TBLPage" + strHeaderTabId));
    }

    if (tab_arr.length == 0 || tab_ids.length == 0) {
      fnTabDetails();
    }
    for (var i = 0;i < tab_arr.length;i++) {
      debugs("tab_arr", tab_arr[i]);
      if(typeof tab_arr[i] != "undefined"){	 //REDWOOD_CHANGES
      var objvisited = tab_arr[i].getAttribute("objvisited");
      if (objvisited != null && document.getElementById("TBLPage" + tab_arr[i].id) != null) {
        enableForm(document.getElementById("TBLPage" + tab_arr[i].id));
      }
    }
     
    }	   //REDWOOD_CHANGES
    if (document.getElementById("TBLPage" + strCurrentTabId) != null)
      enableForm(document.getElementById("TBLPage" + strCurrentTabId));
    //Fix for 18312355 end 
    //Fix for 18758052 Starts
    //disableMESVFields(); // added function call 
    resetMESVFields();
    //Fix for 18758052 Ends	
    fnEnableVerFldSet();//version control changes
  }
  catch (e) {
    mask();
    showAlerts(fnBuildAlertXML("EXTNEW-001", "E"), "E");
    alertAction = "UNMASK";
    return;
  }
  attachmentData = new Array();
  fileNameArray = new Array();
  if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y") {
    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
      document.getElementById(txnBranchFld).value = g_txnBranch;
    }
  }
  /*Fix for 18872788  Starts*/
  /*if (document.getElementById('MICPRMNT')) {
	fnPickupMIS();
    }*/
  /*Fix for 18872788  Ends*/
  //12012012
  fnSetExitButton();
  if (screenType == "WB") {
    fnSetFocusOnFirstEnabledField();
  }
  else {
    fnSetFocusOnMasterPKField();
  }

  showToolbar(functionId, '', '');
  fnCalcHgt();

  if (!fnPostNewMain())
    return;

}

function fnCopy() {
  inDate = setActionTime();
  fnUpdateMultiDetailNavBtns(true);
  detailpkArgs = new Array();
  if (document.getElementById("BLK_PROCESS_AUDIT__AUDIT") != null) {
    fnTemplateCopyTask();
    gAction = '';
    showToolbar(functionId, '', '');
    fnSetFocusOnMasterPKField();
    return;
  }
  fnBuildFullDOM();/*12.0.4 UI performance changes*/
  fnBuildTabHTML();
  debugs("FunctionId=", functionId);
  if (!fnPreCopyMain())
    return;

  if (screenType == 'O') {
    gAction = 'COPY';
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var msgStatus = fnProcessResponse();
    showAllData();
    //fnpostAction('COPY');
  }
  else {
    try {
      fnClearPKFields();
    }
    catch (e) {
      mask();
      showAlerts(fnBuildAlertXML("EXTCPY-001", "E"), "E");
      alertAction = "UNMASK";
      return;
    }
  }
  fnClearExtAuditFields();
  enableForm();
  disableMESVFields();
  gAction = "NEW";
  snapShotId =''; //Fix for FCUBS_14.1_UNICREDIT S.P.A._30439521_RETRO_29251038
  fnSetExitButton();
  showToolbar(functionId, '', '');
  fnCalcHgt();
  fnSetFocusOnMasterPKField();
  if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y") {
    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
      document.getElementById(txnBranchFld).value = g_txnBranch;
    }
  }
  /*if (!fnPostCopyMain())
    return; */
    fnPostCopyMain();
    //fnpostAction('COPY');
    fnEnableVerFldSet();//version control changes
	if (screenType == 'M') {
		gActualAction ='COPY'; //BUG_27762675_UDFPickup_FIX
	}
}

function fnUnlock() {
  inDate = setActionTime();//Performance Changes
  debugs("FunctionId=", functionId);
  //fnBuildFullDOM();/*12.0.4 UI performance changes*/	  //REDWOOD_CHANGES
  fnBuildTabHTML();
  if (!fnPreUnlockMain()) {
    //gAction = "";
    return;
  }

  /* ******** Resetting the status of all subsystems to D in case contract is on HOLD ***********/
  if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
    var contStat = document.getElementsByName("TXNSTAT")[0].value;
    var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
    if (contStat == 'H') {
      var reg = new RegExp(':S', "g");
      statusStr = statusStr.replace(reg, ":D");
      var reg1 = new RegExp(':R', "g");
      statusStr = statusStr.replace(reg1, ":D");
      document.getElementsByName('SUBSYSSTAT')[0].value = statusStr;
    }
	fnPopulateSubSystemValues(statusStr); //9NT1606_12_2_RETRO_12_0_1_23652853 changes
  }

  gAction = "UNLOCK";
  try {
    fcjRequestDOM = buildUBSXml();//ADDA NEW ATTARIBUTE key
    debugs("fcjRequestDOM", getXMLString(fcjRequestDOM));
  }
  catch (e) {
    mask();
    showAlerts(fnBuildAlertXML("EXTUNL-001", "E"), "E");
    alertAction = "UNMASK";
    return;
  }

  var removeNode1 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
  for (var i = 0;i < removeNode1.length;i++) {
    removeNode1[i].parentNode.removeChild(removeNode1[i]);
  }
  var removeNode2 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + dataSrcLocationArray[0] + "']");
  for (var i = 0;i < removeNode2.length;i++) {
    removeNode2[i].parentNode.removeChild(removeNode2[i]);
  }
  var oldResponseDOM = loadXMLDoc(getXMLString(fcjResponseDOM));
responseDOM_Modify = loadXMLDoc(getXMLString(fcjResponseDOM)); //Fix for 19438327
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  //fnpostAction('UNLOCK');
  /*Amend Array Changes Start*/
  var amendFields = "";
  if(getXMLString(fcjResponseDOM).indexOf("FCUBS_AMEND_FIELDS")>0){
      amendFields= getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_AMEND_FIELDS"));
  }
  /*Amend Array Changes Ends*/
  if (!fnProcessResponseLock()) {
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    return;
  }

  fcjResponseDOM = loadXMLDoc(getXMLString(oldResponseDOM));
  gAction = "MODIFY";
  disableForm();

  if (document.getElementsByName("ONCEAUTH")[0]) {
    if (document.getElementsByName("ONCEAUTH")[0].value == 'Y') {
     // fnChangeLabelToText("TEXTAREA"); //REDWOOD_CHANGES
      //fnEnableAmendFields(gAction.toLowerCase());
	  setTimeout( function(){ //Bug_35239333_Redwood
		fnEnableAmendFields(gAction.toLowerCase(),amendFields);
	  },50); //Bug_35239333_Redwood //Bug_36057720 increased time to 50
      disableMESVFields();
    }
    else {
   setTimeout( function(){	//redwood_35278374	
      enableForm();
	  fnUpdateMultiDetailNavBtns(true);//redwood_35686586
      fnDisablePKFields();//redwood_35686586
    },100); //redwood_35278374	  

    }
  }
  else {
    //fnChangeLabelToText("TEXTAREA"); //REDWOOD_CHANGES
    //fnEnableAmendFields(gAction.toLowerCase());
	setTimeout( function(){ //Bug_35239333_Redwood
		fnEnableAmendFields(gAction.toLowerCase(),amendFields);/*Amend Array Changes*/
	},50); //Bug_35239333_Redwood //Bug_36057720 increased time to 50
    disableMESVFields();
  }

  fnClearExtAuditFields();
  fnSetExitButton();
  showToolbar(functionId, '', '');
  fnCalcHgt();
  if (!fnPostUnlockMain())
    return;
}

function releaseLock(action) { //Fix for 32335251
  inDate = setActionTime();//Performance Changes
  debugs("FunctionId=", functionId);
  var gPrevAction = gAction;//Fix for 18758066
  gAction = "RELEASELOCK";
  if(action!= undefined && action!="") gAction = "RELEASELOCK_"+action.toUpperCase(); //Fix for 32335251

  try {
    fcjRequestDOM = buildUBSXml();
    debugs("fcjRequestDOM", fcjRequestDOM);
  }
  catch (e) {
    debugs("failed in buildRelaseLockXML", "");
  }

  var removeNode1 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
  for (var i = 0;i < removeNode1.length;i++) {
    removeNode1[i].parentNode.removeChild(removeNode1[i]);
  }
  var removeNode2 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + dataSrcLocationArray[0] + "']");
  for (var i = 0;i < removeNode2.length;i++) {
    removeNode2[i].parentNode.removeChild(removeNode2[i]);
  }

  var oldResponseDOM = fcjResponseDOM;
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  //fnpostAction('RELEASELOCK');
  if (!fnProcessResponseLock()) {
    return false;
  }

  fcjResponseDOM = oldResponseDOM;
  //if (responseDOM_Modify == null)
    	//Fix for 19438327
    //responseDOM_Modify =oldResponseDOM;//fix for 14767424
  gAction = gPrevAction;//Fix for 18758066
  return true;
}

function fnDelete() {
  inDate = setActionTime();
  fnUpdateMultiDetailNavBtns(true);
  fnBuildFullDOM();
  fnBuildTabHTML();/*Fix for 16990696*/
  processingAction = "Delete";
  debugs("FunctionId", functionId);
  if (!fnPreDeleteMain())
    return;

  mask();
  showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_DELETE_DESC")), "C");
  alertAction = "DELETEACTION";
}

function fnClose() {
  fnBuildFullDOM();/*12.0.4 UI performance changes*/
  //12.0.3 Summary to detail changes starts
  fnUpdateMultiDetailNavBtns(true);
  processingAction = "Close";
  debugs("FunctionId", functionId);
  if (!fnPreCloseMain())
    return;
  mask();
  showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CLOSE_DESC")), "C");
  alertAction = "CLOSEACTION";
}

function fnClose1() {
  inDate = setActionTime();
  //12.0.3 Summary to detail changes starts
  fnUpdateMultiDetailNavBtns(true);
  //12.0.3 Summary to detail changes ends
  processingAction = "Close1";
  debugs("FunctionId=", functionId);

  try {
    fcjRequestDOM = buildUBSXml();
  }
  catch (e) {
    mask();
    showAlerts(fnBuildAlertXML("EXTCLS-001", "E"), "E");
    alertAction = "EXITACTION";
    return false;
  }

  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  var msgStatus = fnProcessResponse();
  fnPostProcessResponse(msgStatus);
}

/**  * Function called when Reopen Action is performed   */
function fnReopen() {
  inDate = setActionTime();
  fnBuildFullDOM();
  fnUpdateMultiDetailNavBtns(true);
  processingAction = "Reopen";
  debugs("FunctionId", functionId);
  if (!fnPreReOpenMain())
    return;
  mask();
  showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_REOPEN_DESC")), "C");
  alertAction = "REOPENACTION";
}

var printJSAdded = false;

function fnExtPrint() {
  fnBuildFullDOM();/*12.0.4 UI performance changes*/
  fnExtensiblePrint();
}

function fnAuthorize() {
  authReq = 'Y';
  gAction = '';//Fix for 21326844
  //fnBuildFullDOM();/*12.0.4 UI performance changes*/	   //REDWOOD_CHANGES
  debugs("calling fnBuildTabHTML", functionId);
  fnBuildTabHTML();
  setTimeout(function(){  //REDWOOD_CHANGES
  processingAction = "Authorize";
  gAction = "AUTHQUERY";
  //if(screenType == 'O'||screenType == 'PMO')
   //if ((screenType.indexOf('O'))!= -1|| screenType == 'PMM') //31670971 added PMM TypeString //to support PM transaction screens //Bug33917911 commented
	if ((screenType.indexOf('O'))!= -1)//Bug33917911 added
	{
    debugs("Processing for Online screens", "");
    if (!fnPreAuthorizeMain())
      return;
    if (!fnvalidateAuthVersion())
      return;
    //if (!fnEventsHandler('fnPreAuthorize')) return;
    if (authFunction == "") {
	  inDate = setActionTime();
      processingAction = "DirectAuth";
      gAction = "AUTH";
      //functionId = parentFuncId;
      debugs("Calling buildUBSXml", "");
      fcjRequestDOM = buildUBSXml(true);

      debugs("Calling fnPost with request message", getXMLString(fcjRequestDOM));
      fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
      debugs("calling fnProcessResponse response Message", getXMLString(fcjResponseDOM));
      //fnpostAction('AUTH');
      var msgStatus = fnProcessResponse();

      debugs("calling fnPostProcessResponse", "");
      fnPostProcessResponse(msgStatus);
     
      return;
    }
  } else {
    authFunction = 'EXTAUTHORIZE';
    authUixml = 'EXTAUTHORIZE';
    authScreenName = 'CVS_AUTHORIZE';

    debugs("calling buildUBSXml", "");
    fcjRequestDOM = buildUBSXml(true);
  }

  debugs("calling fnSubScreenMain", "");
  debugs("authFunction", authFunction);
  debugs("authUixml", authUixml);
  debugs("authScreenName", authScreenName);

  debugs("calling fnSubScreenMain", "");
  fnSubScreenMain(authFunction, authUixml, authScreenName, true);
  inDate = '';
  if (typeof (launchMsgScreen) != "undefined") {
    debugs("calling fnShowMsgDetails", "");
    fnShowMsgDetails();
  }
  authReq = 'N';
  },0);	 //REDWOOD_CHANGES
}

function fnEnterQuery() {
  fnUpdateMultiDetailNavBtns(true);
  detailpkArgs = new Array();
  debugs("FunctionId=", functionId);

  if (!fnPreEnterQueryMain()) {
    return;
  }

  resetDOM();
  resetElements();
  fnEnablePKOnlyFields();
  if (queryAmendArr.length != 0)
    fnEnableAmendFields("query");

  fnDisableSubSysButtons();
  gAction = "ENTERQUERY";
  fnSetExitButton();
  //gAction = "";
  if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
      if (document.getElementById(txnBranchFld).className != "hidden") {
        for (var j = 0;j < pkFields.length;j++) {
          if (pkFields[j] == txnBranchFld) {
            fnEnableElement(document.getElementById(txnBranchFld));
            document.getElementById(txnBranchFld).value = g_txnBranch;
            break;
          }
        }
      }
    }
  }
  fnSetFocusOnMasterPKField();
  gFromSummary = false;
  showToolbar('', '', '');
  fnCalcHgt();
  fnPostEnterQueryMain();
}

function fnExecuteQuery() {
  inDate = setActionTime();
  //fnUpdateMultiDetailNavBtns(true);//Fix for 21782325 
  window.focus();
  debugs("calling fnPreExecuteQuery", "");
  if (!fnPreExecuteQueryMain()) {
    gAction = "";
    resetElements();
    disableForm();
    fnSetExitButton();
    return false;
  }
  if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y") {
    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
      for (var j = 0;j < pkFields.length;j++) {
        //Fix for 16906563
        if (pkFields[j] == txnBranchFld) {
          g_txnBranch = document.getElementById(txnBranchFld).value;
          debugs("setting g_txnBranch=", g_txnBranch);
          break;
        }
      }
    }
  }
  snapShotId =''; //Fix for FCUBS_14.1_UNICREDIT S.P.A._30439521_RETRO_29251038
  debugs("Calling buildUBSXml", "");
  fcjRequestDOM = buildUBSXml();

  debugs("Calling fnPost with Request Mesage=", getXMLString(fcjRequestDOM));
  //Bug_36924146 Changes Starts 
  if(functionId == "STDCOSBL" || functionId == "STDCOBAL" || functionId == "SVDCOIMG" || functionId == "CSDCOINS" || functionId=="SVDCOSGN") {
	  fcjResponseDOM = fnPost(fcjRequestDOM, "FCExtRestCallServlet", functionId);
	  if(checkForErrors(fcjResponseDOM)){
	    return ;
	  }
  }	else{  
  //Bug_36924146 Changes Ends
	  if (ShowSummary == "TRUE") {
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL + "?fromSummary=" + ShowSummary, functionId);
	  }
	  else {
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	  }
 } //Bug_36924146 Changes
  debugs("Response Mesage=", getXMLString(fcjResponseDOM));
  var msgStatus = fnProcessResponse();
  if (msgStatus == "FAILURE") {
    debugs(" processing for MsgStatus=", msgStatus);
    gAction = "ENTERQUERY";
    //fnpostAction('EXECUTEQUERY');
    return false;
  }

  disableForm();
  //Fix for 21782325
  if(document.getElementById("navigatePrev").style.display != 'none' && document.getElementById("navigateNext").style.display != 'none'){
      fnUpdateMultiDetailNavBtns(false);
  }
  if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
      if (document.getElementById(txnBranchFld).value != "") {
        g_txnBranch = document.getElementById(txnBranchFld).value;
        fnUpdateTxnBrnVariables(g_txnBranch);
      }
      else {
        g_txnBranch = mainWin.CurrentBranch;//Changes for 11.4 ITR1 SFR# 13081633
      }
      debugs("checking and Caching TxnBranch Det", g_txnBranch);
      var scrTitle = document.title + " - " + mainWin.getItemDesc("LBL_TXN_BRANCH") + " ::: " + g_txnBranch;
      setInnerText(document.getElementsByTagName("H1")[0], scrTitle);
    }
  }
  gAction = "";
  fnSetExitButton();
  debugs("Calling showToolbar", "");
  setTimeout(function() {showToolbar(functionId, '', '')},0);//REDWOOD_CHANGES
  //fnpostAction('EXECUTEQUERY');
  if (mainWin.mBean_required == "Y") { //Ashok added this if condition as part of 12.0.2
	setActionTime(inTime, functionId, 'EXECUTEQUERY');
    }
  fnCalcHgt();
  debugs("Calling fnPostExecuteQuery", "");
 /*Fix for 19780217 Starts*/
    var branchEoi = "";
    if (!mainWin.txnBranch[g_txnBranch]) {
        branchEoi = mainWin.BranchEoi;
    }else{        
        branchEoi = mainWin.txnBranch[g_txnBranch].BranchEoi;
    }
    if ((branchEoi != 'N') && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y')  /*Fix for 19780217 ends*/
	alert(lblBranchStage);
  // if(ShowSummary !='TRUE')
  // appendDebug(fcjResponseDOM); //Logging changes
  //fnEnableVerFldSet();
  //fnPostExecuteQueryMain();	    //REDWOOD_CHANGES
  setTimeout(function() { fnPostExecuteQueryMain()},0);	    //REDWOOD_CHANGES
  return true;
}
//Bug_36924146 Changes Starts
function checkForErrors(fcjResponseDOM) {
	
	if(fcjResponseDOM != null && selectSingleNode(fcjResponseDOM, "ERROR") != null) {
		var errorCodeMsg = getNodeText(selectSingleNode(fcjResponseDOM, "ERROR"));
		if(errorCodeMsg != null){
			mask();
            var message = errorCodeMsg.substr(0,errorCodeMsg.indexOf(' ')); 
			var errCode = errorCodeMsg.substr(errorCodeMsg.indexOf(' ')+1);
            var alertResp = "<FCUBS_ERROR_RESP>";
                alertResp = alertResp + "<ERROR><ECODE>";
                alertResp = alertResp + message;
                alertResp = alertResp + "</ECODE><EDESC>";
                alertResp = alertResp + errCode;
                alertResp = alertResp + "</EDESC></ERROR>";
		alertResp = alertResp + "</FCUBS_ERROR_RESP>";
		customAlertAction = "CLOSESIGWIN";
		//showBranchAlerts(alertResp, 'E');		
		showAlerts(alertResp,'E');
		return true;
		}else{
		  return false;
		}
	}else{
      return false;
    }		
}
//Bug_36924146 Changes Ends
//Ashok, need to check not used i guess 
function fnPostResponse() {
  if (objHTTP.readyState == 4) {
    if (objHTTP.status != 200) {
      alert(mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText);
    }
    else {
      responseDOM = objHTTP.responseXML;
      debugs("Request Message -->", getXMLString(fcjRequestDOM));
      fcjResponseDOM = responseDOM;
      var msgStatus = fnProcessResponse();
      if (msgStatus == "FAILURE") {
        resetDOM();
        resetElements();
        disableForm();
        gAction = "";
        fnSetExitButton();
        showToolbar(functionId, '', '');
        unmask();
        return false;
      }
      disableForm();
      fnPostExecuteQueryMain();
      gAction = "";
      fnSetExitButton();
      showToolbar(functionId, '', '');
      //Performance Changes
      /*var l_TimeLogvalue = getNodeText(selectSingleNode(responseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/TIMELOG"));
      var dbTime = l_TimeLogvalue.split("~")[3] - l_TimeLogvalue.split("~")[2];
      var serverTime = l_TimeLogvalue.split("~")[1] - l_TimeLogvalue.split("~")[0] - dbTime;
      //setActionTime(inTime, dbTime, serverTime, functionId, 'EXECUTEQUERY');
      setActionTime(inTime, functionId, 'EXECUTEQUERY');*/
      //Performance Changes
      setActionTime(inTime, functionId, 'EXECUTEQUERY');
      unmask();
      ShowSummary = "FALSE";
    }
  }
}

function show_remarks() {
  try {
    //mask();   //REDWOOD_CHANGES
    debugs("loading Remarks.jsp", "");
    loadSubScreenDIV("ChildWin", "Remarks.jsp");
  }
  catch (e) {
    alert(scriptError);
  }
}

/* v_scrName will be there only for the callform/subscreen*/
function fnSaveAll(v_scrName, e) {

  if(parent.subscreenLaunched) {   //REDWOOD_CHANGES
    parent.subscreenLaunched = false;   //REDWOOD_CHANGES
  }	    //REDWOOD_CHANGES
  
  if (gIsValid == false)
    return;
  gsave = true;

  processingAction = "Save";
  window.focus();

  if (isLovOpen)
    return false;

  subSysFlag = false;
  var prevStatusStr = "";
  inDate = setActionTime();
  if (typeof (v_scrName) == 'undefined')
    v_scrName = '';

  if (v_scrName != '' && v_scrName != "CVS_AUTHORIZE") {
    debugs("calling fnPreSave_" + v_scrName, "");

    if (!fnEventsHandler('fnPreSave_' + v_scrName))
      return false;
    if (functionId == "CSCFNUDF" || functionId == "CSCTRUDF" || functionId == "UDCD") { //9NT1606_12_2_RETRO_12_1_23664151 changes
      fnUpdateUDFValues();
    }
    debugs(" calling fnSaveSubScreenData", "");
    fnSaveSubScreenData();
	//Bug_30834995 starts
    if ((getXMLString(dbDataDOM).indexOf('^') !=  - 1) || (getXMLString(dbDataDOM).indexOf('~') !=  - 1)) {
		mask();
		isResponseProcessed = true;
		showAlerts(fnBuildAlertXML('FC-MAINT03', 'E'), 'E');
		alertAction = "UNMASK";
		return false;
    }
    //Bug_30834995 ends	
    debugs(" calling fnResetSubScrDBIndex", "");
    fnResetSubScrDBIndex();//1. get ALl the Tables , check this name is in ME array and then set to 1.
    debugs(" calling fnCloseSubScr", "");
    parent.fnCloseSubScr(e);
    debugs(" calling fnExitSubScreen", "");
    parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
    return true;

  }
  else if (v_scrName == "CVS_AUTHORIZE") {
    debugs("calling fnPreSave_CVS_AUTHORIZE", "");
    if (!fnPreSave_CVS_AUTHORIZE())
      return false;

    debugs(" calling fnSaveSubScreenData", "");
    fnSaveSubScreenData();

    debugs(" calling fnResetSubScrDBIndex", "");
    fnResetSubScrDBIndex();//1. get ALl the Tables , check this name is in ME array and then set to 1.            
    debugs(" calling fnCloseSubScr", "");
    parent.fnCloseSubScr(e);

    debugs(" calling fnExitSubScreen", "");
    parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
    return true;

  }
  else {
    debugs("calling fnValidate v_scrName=" + v_scrName, "");//Ashok this needs to be checked.
    if (!fnValidate())
      return false;
appendData(); //Fix for 19636403

    /* On save changing the subsystem status to R for those subsystems whose dependent field values have been changed */
    if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
      subSysFlag = true;
      var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
      debugs("SubSystem Status=", statusStr);
      prevStatusStr = statusStr;
      var subSys = strScreenName + '__' + strCurrentTabId;
      if (statusStr.indexOf(subSys) != "-1") {
        if (typeof (tabDom) != "undefined" && tabDom != null && getXMLString(tabDom) != getXMLString(dbDataDOM)) {
          debugs("calling fnSetTabSubSystem", "");
          fnSetTabSubSystem();
          tabDom = null;
        }
      }

      debugs("calling fnCheckSubSysValues", "");
      fnCheckSubSysValues(statusStr);
    }

    debugs("calling appendData", "");
    debugs("calling fnPreSave", "");
    if (!fnPreSaveMain())
      return false;
    appendData();

    //Fix for 16999792 start
    var dbDataStr = getXMLString(dbDataDOM);

    if ((dbDataStr.indexOf('^') !=  - 1) || (dbDataStr.indexOf('~') !=  - 1)) {
      mask();
      isResponseProcessed = true;
      showAlerts(fnBuildAlertXML('FC-MAINT03', 'E'), 'E');
      alertAction = "UNMASK";
      return false;
    }
  }

  debugs("calling buildUBSXml", "");
  fcjRequestDOM = buildUBSXml();

  //Fix for 19438327
    /*if (gAction == 'MODIFY') {
    //debugs("calling buildUBSXml", ""); Ashok need to underStand This ?????
    responseDOM_Modify = loadXMLDoc(getXMLString(fcjResponseDOM));
  }*/
  //11.1 Remarks Changes - Starts Here
  if (typeof (remarksReq) != "undefined" && remarksReq == "Y") {
    debugs("calling show_remarks", "");
    show_remarks();
  }
  else {
    debugs("calling fnSaveAll_ReqResp", "");
    fnSaveAll_ReqResp();
  }

  debugs("calling fnCalcHgt", "");
  fnCalcHgt();
  inDate = '';//Performance Changes
  return true;
}
//end of fnSave.
function fnSaveAll_ReqResp() {
  inDate = setActionTime();
  debugs("calling fnPost with request Message", getXMLString(fcjRequestDOM));
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  debugs("Response Message", getXMLString(fcjResponseDOM));
  var msgStatus = fnProcessResponse();
  debugs("calling fnPostProcessResponse", "");
  fnPostProcessResponse(msgStatus);

  inDate = "";
  posttime = "";
  afterposttime = "";
}
var fromRemarksReqd = false;

function closeRemarksScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft) {
  fromRemarksReqd = true;
  fnSaveAll_ReqResp();
  fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
}

function fnExitAll(v_scrName, e) {
  var e = window.event || e;
  var srcElement = getEventSourceElement(e);
  var VIEWMAINT;		   
 //REDWOOD_CHANGES
  if(parent.subscreenLaunched) {
    parent.subscreenLaunched = false;
  }
  if (srcElement && srcElement.disabled)   
 //REDWOOD_CHANGES
    return;
  debugs("FunctionId~ScreenName", functionId + "~" + v_scrName);
  //FCUBS11.1 Changes SFR#2604 starts here
  if (typeof (v_scrName) == 'undefined' || (typeof (mainWin.screenType) != 'undefined' && mainWin.screenType == 'WB'))
    v_scrName = '';
  //FCUBS11.1 Changes SFR#2604 ends here
  if (v_scrName != "CVS_AUTHORIZE" && v_scrName != "CVS_ADVANCED") {
    if (v_scrName != '') {
      if (!fnEventsHandler('fnPreExit_' + v_scrName))
        return false;
    }
    else {
      if (!fnEventsHandler('fnPreExit'))
        return false;
    }
  }
  if (v_scrName != '' || typeof (exitOnlineAuth) != "undefined") {
    fnResetSubScrDBIndex();//1. get ALl the Tables , check this name is in ME array and then set to 1.
    if (!fnEventsHandler('fnPostResetIndex'))
      return false;
    if (parent.gAction == "DELETEQUERY" || parent.gAction == "AUTHQUERY" || parent.gAction == "EXECUTEQUERY" || (screenArgs["AUTHORIZE_SCREEN_TYPE"] && screenArgs["AUTHORIZE_SCREEN_TYPE"] == 'O')) {
      parent.gAction = "";
    }
    if (parent.gAction == "CHANGELOG") {
      parent.gAction = parent.gActionMainScreen;
    }
    //11012012
    //parent.mainWin.showToolbar(parent.functionId, "", "");
    if (parent.scrName == "") {
      parent.showToolbar(parent.functionId, "", "");
    }
    parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);

  }
  else if (typeof (callFormLaunched) != "undefined" && callFormLaunched == "yes") {
    fnResetSubScrDBIndex();//1. get ALl the Tables , check this name is in ME array and then set to 1.
    if (parent.gAction == "DELETEQUERY" || parent.gAction == "AUTHQUERY" || parent.gAction == "EXECUTEQUERY" || (screenArgs["AUTHORIZE_SCREEN_TYPE"] && screenArgs["AUTHORIZE_SCREEN_TYPE"] == 'O')) {
      parent.gAction = "";
    }
    if (parent.gAction == "CHANGELOG") {
      parent.gAction = parent.gActionMainScreen;
    }
    if (parent.scrName == "") {
      parent.showToolbar(parent.functionId, "", "");
    }
    parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);

  }
  else {
    if (gAction != "") {
    //  mask();	  //REDWOOD_CHANGES
      showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
      alertAction = "EXITACTION";
    }
    else {
      dbDataDOM = null;
      isExitTriggered = true;
      fnFocus();
	  if (functionId != "CLRU"){ //redwood_35357384
      showToolbar("", "", "");
      var parentWin = fnGetParentWin();
      if (parentWin != "") {
        parentWin.launchFormScrArgs = undefined;
        VIEWMAINT = parentWin.VIEWMAINT;
      }
	  }//redwood_35357384
      var winObj = mainWin.document.getElementById(seqNo);
      
      setTimeout(function(){mainWin.fnExit(winObj, '', VIEWMAINT);},200);//fix for 25695019
    }
  }

  e.cancelBubble = true;
}

function fnExitAlertWin(evnt) {
  try {
    if (typeof (customAlertAction) != "undefined") {
      if (customAlertAction != "") {
        //eval("fnExitAlertWin_" + customAlertAction + "(evnt)");
        var fnEval = new Function("evnt", "fnExitAlertWin_" + customAlertAction + "(evnt)");
        fnEval(evnt);//Fix for 18423705
        customAlertAction = "";
        return;
      }
    }
  }
  catch (e) {
  }

  unmask();
  if (alertAction == "OVERRIDE") {
    if (processingAction == "PickUpSubSystem") {
      gAction = ActionCodePickUpSubSystem;
      document.getElementsByName('SUBSYSSTAT')[0].value = prevStatusStrPickUpSubSystem;
      return;
    }
    else {
      try {
        var fnEval = new Function("fn" + processingAction + "Failure()");
        fnEval();
      }
      catch (e) {
      }
    }
  }
  else if (alertAction == "DELETEACTION" || alertAction == "CLOSEACTION" || alertAction == "REOPENACTION" || alertAction == "REVERSEACTION") {
    fnUpdateMultiDetailNavBtns(false);//Fix for 18433691
    gAction = "";
  }
}

function fnCloseAlertWin(evnt) {
  gIsValid = true;
  if (typeof (inTime) != "undefined" && inTime != "") {
  }
  else {
    var t = getDateObject();
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();

  }

  try {
    if (typeof (customAlertAction) != "undefined") {
      if (customAlertAction != "") {
        var fnEval = new Function("evnt", "fnCloseAlertWin_" + customAlertAction + "(evnt)");
        fnEval(evnt);//Fix for 18423705
        customAlertAction = "";
        return;
      }
    }
  }
  catch (e) {
  }

  if (alertAction == "EXITACTION") {
    unmask();
    multiBrnScrOpened = false;
    if (gAction == "MODIFY" || gAction == "ROLLOVER" || gAction == "LIQUIDATE") {
      if (releaseLock(gAction)) { //Fix for 32335251
        if (responseDOM_Modify != null) {
          fcjResponseDOM = loadXMLDoc(getXMLString(responseDOM_Modify));
          responseDOM_Modify = null;
        }
        goToRec(1);
        viewModeAction = true;
        disableForm();
        fnUpdateMultiDetailNavBtns(false);
        viewModeAction = false;
        gAction = "";
        fnSetExitButton();
        showToolbar(functionId, "", "");
        unmask();
        fnCalcHgt();
        return 
      }
      else {
        unmask();
        fnCalcHgt();
        return;
      }
    }
    resetElements();
    gAction = "";
    fnSetExitButton();
    disableForm();
    multiBrnScrOpened = false;
    showToolbar(functionId, "", "");
    fnCalcHgt();

  }
  else if (alertAction == "CLOSEACTION") {
    unmask();
    try {
      fnClearExtAuditFields();
      //Fix for 19438327,32308053- Fix done to capture query response before doing Close operation.
      responseDOM_Modify = loadXMLDoc(getXMLString(fcjResponseDOM)); // Fix for 17490931
      appendData()
      fcjRequestDOM = buildUBSXml();
    }
    catch (e) {
      mask();
      showAlerts(fnBuildAlertXML("EXTCLS-001", "E"), "E");
      alertAction = "UNMASK";
      return;
    }
    if (typeof (remarksReq) != "undefined" && remarksReq == "Y") {
      show_remarks();
    }
    else {
      fnSaveAll_ReqResp();
    }
  }
  else if (alertAction == "REOPENACTION") {
    unmask();
    try {
      fnClearExtAuditFields();
      appendData()
      fcjRequestDOM = buildUBSXml();
    }
    catch (e) {
      displayError("EXTREO-001");
      return;
    }
    if (typeof (remarksReq) != "undefined" && remarksReq == "Y") {
      show_remarks();
    }
    else {
      fnSaveAll_ReqResp();
    }

  }
  else if (alertAction == "DELETEACTION") {
    unmask();
    try {
      if (typeof (tankModifications) != "undefined" && tankModifications == "Y") {
        gAction = 'DELETEQUERY';
        authFunction = 'EXTAUTHORIZE';
        authUixml = 'EXTAUTHORIZE';
        authScreenName = 'CVS_AUTHORIZE';
        fcjRequestDOM = buildUBSXml(true);

        fnSubScreenMain(authFunction, authUixml, authScreenName, true);
        if (typeof (launchMsgScreen) != "undefined")
          fnShowMsgDetails();
        return;
      }
      fcjRequestDOM = buildUBSXml(true);
    }
    catch (e) {
      mask();
      showAlerts(fnBuildAlertXML("EXTDEL-001", "E"), "E");
      alertAction = "UNMASK";
      //displayError("EXTDEL-001");
      return;
    }
    debugs("fcjRequestDOM", getXMLString(fcjRequestDOM));

    oldResDOM_Delete = fcjResponseDOM;
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    debugs("fcjResponseDOM", getXMLString(fcjResponseDOM));
    var msgStatus = fnProcessResponse();
    fnPostProcessResponse(msgStatus);

  }
  else if (alertAction == "REVERSEACTION") {
    unmask();
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var msgStatus = fnProcessResponse();
    fnPostProcessResponse(msgStatus);

  }
  else if (alertAction == "UNMASK") {
    unmask();

  }
  else if (alertAction == "OVERRIDE") {
    unmask();
multiBrnScrOpened = false; //Fix for 20117468
    var ubsXMLDOM = loadXMLDoc("<FCUBS_REQ_ENV/>");
    var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
    ubsXMLDOM.documentElement.appendChild(selectSingleNode(fcjResponseDOM, "//FCUBS_HEADER"));
    ubsXMLDOM.documentElement.appendChild(selectSingleNode(fcjResponseDOM, "//FCUBS_BODY"));
    var headerNode = selectSingleNode(ubsXMLDOM, "//FCUBS_HEADER");
   // var sessionNode = ubsXMLDOM.createElement("APP_SESSIONID");
   // headerNode.appendChild(sessionNode);
    //CHANGES IN INFRA FOR MODULE ID //
    var moduleNode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID");
    if (moduleNode == null) {
      var moduleNod = ubsXMLDOM.createElement("MODULEID");
      var module = functionId.substring(0, 2);
      if (mainWin.applicationName == 'FCIS') {
        module = mainWin.CurrentModule;
      }
      setNodeText(moduleNod, module);
      selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER").appendChild(moduleNod);
    }
    inDate = setActionTime();
    var ovdRemNod = ubsXMLDOM.createElement("MAKEROVDREMARKS");
    setNodeText(ovdRemNod, override_remarks);
    selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER").appendChild(ovdRemNod);

    if (typeof (servletURL) == 'undefined') {
      servletURL = 'FCClientHandler';
    }
	
	//OBTF14.5_Snapshot_ID_Validation Starts
	if (selectNodes(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/SNAPSHOTID").length > 0){
		setNodeText(selectSingleNode(ubsXMLDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/SNAPSHOTID"), snapShotId);
	}
	//OBTF14.5_Snapshot_ID_Validation Ends

    fcjResponseDOM = fnPost(ubsXMLDOM, servletURL, functionId);
    var msgStatus = fnProcessResponse();
    if (processingAction == "PickUpSubSystem") {
      fnPostGoToServerForSubSystem(msgStatus);
      appendData();//Fix for 18096629
      tabDom = loadXMLDoc(getXMLString(dbDataDOM));
    }
    else 
      fnPostProcessResponse(msgStatus);
    /*Fix for 17924897 Ends*/

  }
  else if (alertAction == "MAINTAUTH_F") {
    unmask();
    if (fnProcessResponse() == "FAILURE")
      return false;
    else {
      fnSaveSubScreenData();
      fnResetSubScrDBIndex();//1. get ALl the Tables , check this name is in ME array and then set to 1.            
      parent.fnCloseSubScr(evnt);
      parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
      return true;
    }

  }
  else if (alertAction == "MAINTAUTH_S") {
    unmask();
    //#14481096 changes start
    if (gAction == "DELETE") {
      parent.resetElements();
      parent.resetIndex();
      parent.gAction = "";
      parent.dbDataDOM = loadXMLDoc("");
      //Fix for 17620538
      parent.showToolbar(functionId, '', '');
    }
    else {
      fnSaveSubScreenData();
      fnResetSubScrDBIndex();//1. get ALl the Tables , check this name is in ME array and then set to 1.            
      parent.fnCloseSubScr(evnt);
    }
    //#14481096 changes end
    parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
    return true;
  }
  else if (alertAction == "REJECTAUTH_S") {
    unmask();
    fnSaveSubScreenData();
    fnResetSubScrDBIndex();//1. get ALl the Tables , check this name is in ME array and then set to 1.            
    parent.fnCloseSubScr(evnt);
    parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
    return true;
  }
  else if (alertAction == "ONLINEAUTH") {
    unmask();
    if (typeof (onlineAuthArgs.subScr) != "undefined" && onlineAuthArgs.subScr == 'Y') {
      var newWinParams = new Object();
      newWinParams.dbDataDOM = dbDataDOM;
      newWinParams.dbIndexArray = dbIndexArray;
      newWinParams.authorize = "ONLINEAUTH";
      newWinParams.msgGenReqd = onlineAuthArgs.msgGenReqd;
      parent.screenArgs['RETURN_VALUE'] = newWinParams;
      if (!fnEventsHandler('fnPostOnlineAuthorize'))
        return false;
      parent.fnCloseSubScr(evnt);
      parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft);
    }
  }
  else if (alertAction == "TXNBRANERROR") {
    unmask();
    resetElements();
    resetIndex();
    disableForm();
    fnEnableSubSysButtons();
    fnSetExitButton(false);
    gAction = "";
    dbDataDOM = loadXMLDoc("");
    multiBrnScrOpened = false;
    fnSetExitButton();
    showToolbar(functionId, '', '');
    return false;
  }
  else if (alertAction == "DELETECRITERIA") {
    unmask();
    fnQueryCriteria("QUERYCRITERIA", evnt);
    return false;
  }
  else if (alertAction == "UPDATECRITERIA") {
    unmask();
    var flag = "true";
    fnSaveSumCriteria(evnt, flag);
    return false;
  }
  else if (alertAction == "CLOSESCR") {
    unmask();
    fnExitAll('', evnt);
  }
}

function fnShowLaunchForm(v_functionID, v_UiXml, v_scrName) {
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
  screenArgs = new Array();
  appendData();//Fix for 18200269
  fnBuildTabHTML();//Fix for 18145621
  if (!fnEventsHandlerSubScreen('fnPreLaunchForm', v_scrName, v_functionID, screenArgs))
    return;
  fnBuildScrArgs(screenArgs, v_scrName, v_functionID)
  if (typeof (seqNo) != "undefined") {
    launchFormScrArgs = screenArgs;
    mainWin.dispHref1(v_functionID, seqNo);
  }
  else {
    parent.launchFormScrArgs = screenArgs;
    mainWin.dispHref1(v_functionID, parent.seqNo);
  }
}
 /**Function Id as Service Call Changes starts**/
function fnShowServiceScr(v_functionID, v_UiXml, v_scrName) {
  mainWin.fnUpdateScreenSaverInterval();
  screenArgs = new Array();
  appendData();
  fnBuildTabHTML();
  if (!fnEventsHandlerSubScreen('fnPreLaunchServiceScr', v_scrName, v_functionID, screenArgs))
    return;
  fnBuildScrArgs(screenArgs, v_scrName, v_functionID)
  if (typeof (seqNo) != "undefined") {
    serviceScrArgs = screenArgs;
    mainWin.dispHref1(v_functionID, seqNo);
  }
  else {
    parent.serviceScrArgs = screenArgs;
    mainWin.dispHref1(v_functionID, parent.seqNo);
  }
}
 /**Function Id as Service Call Changes ends**/
 
function fnBuildScrArgs(screenArgs, scrName, funcId) {

  var screenArgName = "";
  var screenArgSource = "";
  var screenArgVals = "";
  if (typeof (scrArgName) != "undefined") {
    if (scrArgName[scrName] && scrArgSource[scrName]) {
      screenArgName = scrArgName[scrName].split("~");
      screenArgSource = scrArgSource[scrName].split("~");
      if (scrArgVals[scrName])
        screenArgVals = scrArgVals[scrName].split("~");
    }
    else if (scrArgName[funcId]) {
      screenArgName = scrArgName[funcId].split("~");
      screenArgSource = scrArgSource[funcId].split("~");
      if (scrArgVals[funcId])
        screenArgVals = scrArgVals[funcId].split("~");
    }

    for (var i = 0;i < screenArgName.length;i++) {
      if (screenArgSource[i] == "")
        screenArgs[screenArgName[i]] = screenArgVals[i];
      else {
        var block = screenArgSource[i].substr(0, screenArgSource[i].lastIndexOf("__"));
        var blockFld = screenArgSource[i].substr(screenArgSource[i].lastIndexOf("__") + 2);
        /* Fix for 17997956 Ends*/
        if (document.getElementById(block) && document.getElementById(block).getAttribute("TYPE") && document.getElementById(block).getAttribute("TYPE") == "ME" && document.getElementById(block).getAttribute("VIEW") != "SE") {
            //var curpage = Number(getInnerText(document.getElementById('paging_'+block+'_nav_input')));//REDWOOD_35425629 
             var curpage = document.getElementById('paging_'+block+'_nav_input').value;  //REDWOOD_CHANGES  //REDWOOD_35425629
          var blkRowIndx = dbIndexArray[block] - (getPgSize(block) * (curpage - 1)) - 1;
            if (typeof (getElementsByOjName(blockFld)[blkRowIndx]) != "undefined") {		 //REDWOOD_CHANGES
                screenArgs[screenArgName[i]] = getElementsByOjName(blockFld)[blkRowIndx].value;	  //REDWOOD_CHANGES
          }
          /* Fix for 17997956 Ends*/
        }
        else {
          screenArgs[screenArgName[i]] = document.getElementById(screenArgSource[i]).value;
        }
      }
    }
  }
}

/* For Subscreen : v_functionID = paremnt Function id, v_UiXml = parent Uixml, v_scrName = maintained in the RAD*/
/* For Call form : v_functionID = maintained in the RAD, v_UiXml = maintained in the RAD, v_scrName = maintained in the RAD*/
/* Susb System Follows the Cal form Route*/

//screenArgs declaration made global for multi browser support
var screenArgs = new Array();
var subSysFnid = "";

function fnSubScreenMain(v_functionID, v_UiXml, v_scrName, v_Auth) {
 //REDWOOD_CHANGES
    if(subscreenLaunched) {
        return;
    }		 
 //REDWOOD_CHANGES
  var t = getDateObject();
  inTime= t.getTime();
  if (gAction == '' || gAction == 'EXECUTEQUERY') {
    var prevAction = gAction;
    gAction = "LOADCALLFORMS";
    fnBuildFullDOM();/* Added for MultipleEntry DOM changes */
    gAction = prevAction;
  }
  /*12.0.4 UI performance changes ends*/
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
  // if (!mainWin.isSessionActive()) //session expiry change  
  //  return;//Fix for 14798046 
if(v_UiXml == "") v_UiXml = v_functionID; //Fix for 19558007
  var scrChldFnId = "";//ScreenChild issue
  //debugs("FunctionId~xmlFileName~ScreenName=", functionId + "~" + v_UiXml + "~" + v_scrName);
  //Screen Child Fix
  if (v_functionID == functionId || thirdChar == "S" ) {  //9NT1606_14_1_RETRO_12_4_28118332 Added
    if (typeof (scrChild) != "undefined" && scrChild == "Y") {
      scrChldFnId = v_functionID;//ScreenChild issue
      v_functionID = parentFunction;
    }
  }

  debugs("Building Screen Args", "");
  screenArgs = new Array();
  screenArgs['SCREEN_NAME'] = v_scrName;
  screenArgs['FUNCTION_ID'] = v_functionID;
  screenArgs['LANG'] = mainWin.LangCode;
  screenArgs['UIXML'] = v_UiXml;
  screenArgs['SCR_CHLD_FNID'] = scrChldFnId;//ScreenChild issue
  screenArgs['INTIME'] = inTime//Performance Changes
  //Fix for 16907168 starts
  if (typeof (ArrFuncOrigin[v_functionID]) == "undefined") {
    screenArgs['FUNC_ORIGIN'] = ArrFuncOrigin[functionId];
    screenArgs['PRNT_FUNC'] = ArrPrntFunc[functionId];
    screenArgs['PRNT_ORIGIN'] = ArrPrntOrigin[functionId];
  }
  else {
    screenArgs['FUNC_ORIGIN'] = ArrFuncOrigin[v_functionID];
    screenArgs['PRNT_FUNC'] = ArrPrntFunc[v_functionID];
    screenArgs['PRNT_ORIGIN'] = ArrPrntOrigin[v_functionID];
  }

  if (typeof (ArrClusterModified[v_functionID]) == "undefined") {
    screenArgs['CLUSTER_MOD'] = ArrClusterModified[functionId];
  }
  else {
    screenArgs['CLUSTER_MOD'] = ArrClusterModified[v_functionID];
  }
  if (typeof (ArrCustomModified[v_functionID]) == "undefined") {
    screenArgs['CUSTOM_MOD'] = ArrCustomModified[functionId];
  }
  else {
    screenArgs['CUSTOM_MOD'] = ArrCustomModified[v_functionID];
  }

screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + screenArgs['LANG'] + '/' + screenArgs['UIXML'] + '.xml', screenArgs['SCREEN_NAME']); //Fix for 19558007

  if (v_Auth) {
    debugs("Calling fnGetAuthScreenArgs", "");
    fnGetAuthScreenArgs(screenArgs);// this will populate for Authorization screen Only
  }

  subSysFnid = "";
  if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
    var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
    
       if(statusStr!=null){ //REDWOOD_35176392 
    if (statusStr != "" && (statusStr.indexOf(v_functionID) !=  - 1 || statusStr.indexOf(v_scrName) !=  - 1)) {

      if (statusStr.indexOf(v_functionID) !=  - 1)
        subSysFnid = v_functionID;
      else 
        subSysFnid = v_scrName;

      debugs("caling append data subSysFnid", subSysFnid);
      appendData();
      debugs("caling fnBuildTabHTML", "");
      fnBuildTabHTML();
      if (gAction == "NEW") {
        //Fix for 16982862
        for (var i = 0;i < tab_arr.length;i++) {
         /*Fix for 19908206 starts*/
      if(typeof(tab_arr[i])!='undefined'){ //redwood_crossbrowser_35200441
			if(strCurrentTabId != tab_arr[i].id){
				enableForm(document.getElementById("TBLPage" + tab_arr[i].id));
			}
            }
			/*Fix for 19908206 Ends*/
        }
      }

      debugs("caling fnPickUpSubSystem", "");
      fnPickUpSubSystem(subSysFnid, v_scrName, v_functionID, screenArgs);
      return;
    } //REDWOOD_35176392 
  }
  }

  debugs("caling fnPostSubScreenMain", "");
  fnPostSubScreenMain(v_scrName, v_functionID);

}

function fnPostSubScreenMain(v_scrName, v_functionID) {

  //if (!mainWin.isSessionActive()) 12.1 SESSIOn expiry fix 2
  // return;//Fix for 14798046
  screenArgs['SUBSYSTEM'] = subSysFnid;

  fnBuildScrArgs(screenArgs, v_scrName, v_functionID);//Based on the SYS File, Additional Screen Arguments are Build by this function c 
  if (v_scrName == 'CVS_ADVANCED' || v_functionID == "EXTAUTHORIZE") {
    if (v_scrName == 'CVS_ADVANCED')
      fnPreLoad_CVS_ADVANCED(screenArgs);
    if (v_functionID == "EXTAUTHORIZE")
      fnPreLoad_CVS_AUTHORIZE(screenArgs);
  }
  else {
    debugs("calling fnPreLoad" + v_scrName, "");
    if (!fnEventsHandlerSubScreen('fnPreLoad', v_scrName, v_functionID, screenArgs))
      return false;
  }

  for (var i in screenArgs) {
    debugs("calling ScreenArgs", screenArgs[i]);
  }

  debugs("calling appendData", "");
  appendData();
  if (typeof (unmaskTitle) != "undefined") {
    unmaskTitle = true;
    //mask(unmaskTitle);	  //REDWOOD_CHANGES
  }
  else {
    //mask();   //REDWOOD_CHANGES
  }

  debugs("calling fnShowSubScreen", "");
  fnShowSubScreen(screenArgs);
}

function fnGetAuthScreenArgs(screenArgs) {
  screenArgs['MASTERFNID'] = functionId;

  //FCUBS11.0- Extensible Maitanance Tanking Changes Start
  if (gAction == 'DELETEQUERY')
    screenArgs['PARENTACTION'] = 'DELETE'
  else if (gAction == 'AUTHQUERY')
    screenArgs['PARENTACTION'] = 'AUTH'
  else 
    screenArgs['PARENTACTION'] = 'CHANGELOG';

  //FCUBS11.0- Extensible Maitanance Tanking Changes End
  screenArgs['REQDOM'] = loadXMLDoc(getXMLString(fcjRequestDOM));
  screenArgs['RESDOM'] = loadXMLDoc(getXMLString(fcjResponseDOM));
  if (screenType == 'O') {
    screenArgs["AUTHORIZE_SCREEN_TYPE"] = 'O';
    var pkArray = new Array();
    for (var i = 0;i < pkFields.length;i++) {
      pkArray[i] = document.getElementById(pkFields[i]).value;
    }
    screenArgs["ONLINEPKARRAY"] = pkArray;
  }
  else 
    screenArgs["AUTHORIZE_SCREEN_TYPE"] = 'M';

  screenArgs["remarksReq"] = remarksReq;
  screenArgs["tankModifications"] = tankModifications;//Fix for 14380846 -Hiding Reject Button for Non tanking FunnctionID
}

function fnShowUDFScreen(functionId, uiXml, screenName) {
  /*12.0.4 UI performance changes starts*/
  if (gAction == '' || gAction == 'EXECUTEQUERY') {
    var prevAction = gAction;
    gAction = "LOADCALLFORMS";
    fnBuildFullDOM();/* Added for MultipleEntry DOM changes */
    gAction = prevAction;
  }
  /*12.0.4 UI performance changes ends*/
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
  // if (!mainWin.isSessionActive()) //session expiry change  
  // return;//Fix for 14798046
  debugs("FunctionId~xmlFileName~ScreenName=", functionId + "~" + uiXml + "~" + screenName);
  old_action = gAction;
  screenArgs = new Array();
  screenArgs['SCREEN_NAME'] = screenName;
  screenArgs['FUNCTION_ID'] = functionId;
  screenArgs['UIXML'] = uiXml;
  screenArgs['LANG'] = mainWin.LangCode;
  screenArgs['FUNC_ORIGIN'] = ArrFuncOrigin[functionId];
  screenArgs['PRNT_FUNC'] = ArrPrntFunc[functionId];
  screenArgs['PRNT_ORIGIN'] = ArrPrntOrigin[functionId];
  screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + screenArgs['LANG'] + '/' + screenArgs['FUNCTION_ID'] + '.xml', screenArgs['SCREEN_NAME']);
  //9NT1606_12_4_RETRO_12_3_26861729 Changes Starts
  screenArgs['CUSTOM_MOD'] = ArrCustomModified[functionId]; 
  screenArgs['CLUSTER_MOD'] = ArrClusterModified[functionId];
  //9NT1606_12_4_RETRO_12_3_26861729 Changes Ends
  try {
    fnEventsHandlerSubScreen('fnPreLoad', screenName, functionId, screenArgs);
  }
  catch (e) {
  }

  for (var i in screenArgs) {
    debugs('screenArgs:' + i, screenArgs[i]);
  }

  appendData();
	
  if (gAction == "NEW" || gAction == "MODIFY" || gActualAction == "COPY") {//BUG_27762675_UDFPickup_FIX
        if ((selectNodes(dbDataDOM, "//BLK_UDF_DETAILS").length == 0) || (gAction == "MODIFY" && screenType == 'M') || (gActualAction =="COPY" && screenType == 'M')){ //BUG_27762675_UDFPickup_FIX
      inDate = setActionTime();
      
      //if (gAction == "MODIFY"){//BUG_27762675_UDFPickup_FIX//Bug_28934648 commented
	   if (gAction == "MODIFY" || gActualAction == "COPY"){ //Bug_28934648 
          gAction = "UDFREPICKUP";
      }else{
		  gAction = "UDFPICKUP"; 
	  }

      debugs("New gAction AFTER Change", gAction);
      fcjRequestDOM = buildUBSXml();
      debugs("RequestXML", getXMLString(fcjRequestDOM));

      fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
      debugs("RequestXML", fcjResponseDOM);
      gDispAlertOnSuccess = 'N';
      if (!fnProcessResponse()) {
        gAction = old_action;
        return;
      }
	  //BUG_27762675_UDFPickup_FIX Changes starts
	  if (fcjResponseDOM != null) {
		var processStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (processStatus != 'FAILURE') {
			if (screenType == 'M') {
				gActualAction =""; 
			}
		}
	  }	
	  //BUG_27762675_UDFPickup_FIX Changes ends
      //Fix for 15902078 starts
      gDispAlertOnSuccess = 'Y';
      //Fix for 15902078 ends
      gAction = old_action;
      //mask(unmaskTitle);  //REDWOOD_CHANGES
      fnShowSubScreen(screenArgs);
      //fnPostAction("UDFPICKUP");
    }
    else {
      //mask(unmaskTitle);  //REDWOOD_CHANGES
      fnShowSubScreen(screenArgs);
    }

  }
  else {
    if (fcjResponseDOM != null) {
      var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

      if (msgStatus != 'FAILURE') {
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        debugs("response XML", getXMLString(fcjResponseDOM));
        setDataXML(getXMLString(pureXMLDOM));
        //mask(unmaskTitle); //REDWOOD_CHANGES
        fnShowSubScreen(screenArgs);
      }
      else {
        resetDOM();
       // mask(unmaskTitle); //REDWOOD_CHANGES
        fnShowSubScreen(screenArgs);
      }
    }
	//9NT1606_12_4_RETRO_12_0_3_26550099 starts
        else if (viewMnt) {
            if (dbDataDOM != null) {
                //mask(unmaskTitle);  //REDWOOD_CHANGES
                fnShowSubScreen(screenArgs);
            }
    else {
                resetDOM();
                //mask(unmaskTitle);  //REDWOOD_CHANGES
                fnShowSubScreen(screenArgs);
            }
        }
		//9NT1606_12_4_RETRO_12_0_3_26550099 ends 
    else {
      resetDOM();
      //mask(unmaskTitle);  //REDWOOD_CHANGES
      fnShowSubScreen(screenArgs);
    }
  }
}

function fnUpdateUDFValues() {
  var udfFldSet = document.getElementsByTagName("fieldset");
    var tagNameList = ["OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA", "OJ-SELECT-SINGLE", "OJ-INPUT-DATE", "OJ-INPUT-DATE-TIME", "INPUT"];  //REDWOOD_CHANGES
  for (var i = 0;i < udfFldSet.length;i++) {
    if (udfFldSet[i].getAttribute("VIEW") != "ME") {
            for (var k = 0;k < tagNameList.length;k++) {   //REDWOOD_CHANGES
                udfFields = udfFldSet[i].getElementsByTagName(tagNameList[k]); //REDWOOD_CHANGES
      for (var j = 0;j < udfFields.length;j++) {
        fireHTMLEvent(udfFields[j], "onbeforedeactivate");
      }
    }
  }
}
}					   //REDWOOD_CHANGES

function fnUpdateUDFDBField(currFld) {
  //Fix for 14321478 -UDF update issue starts
  var udfFldNo = "";
  var indexDate = getOuterHTML(currFld).indexOf("validateInputDate");
  var indexAmount = getOuterHTML(currFld).indexOf("validateInputAmount");
  var indexNumber = getOuterHTML(currFld).indexOf("validateInputNumber");
  var udfFldLength = "";
  //12.0.2 udf changes for CSCTRUDF start 
  if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
    udfFld = currFld.id.substring(0, currFld.id.length - 1);
    udfFldNo = udfFld.substring(udfFld.length - 3);
    udfFldLength = 3;
    if (isNaN(udfFldNo)) {
      udfFldNo = udfFld.substring(udfFld.length - 2);
      udfFldLength = 2;
    }
    if (isNaN(udfFldNo)) {
      udfFldNo = udfFld.substring(udfFld.length - 1);
      udfFldLength = 1;
    }
  }
  else {
    udfFldNo = currFld.id.substring(currFld.id.length - 3);
    udfFldLength = 3;
    if (isNaN(udfFldNo)) {
      udfFldNo = currFld.id.substring(currFld.id.length - 2);
      udfFldLength = 2;
    }
    if (isNaN(udfFldNo)) {
      udfFldNo = currFld.id.substring(currFld.id.length - 1);
      udfFldLength = 1;
    }
  }
  //12.0.2 udf changes for CSCTRUDF end 
  //var udfFldNo = currFld.id.substring(currFld.id.length-1);
  //12.0.2 udf changes for CSCTRUDF start 
  if (indexDate > 0 || indexAmount > 0 || indexNumber > 0) {
    if (document.getElementById("BLK_UDF_DETAILS"))
      document.getElementById("BLK_UDF_DETAILS").tBodies[0].rows[udfFldNo].cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = getPreviousSibling(getPreviousSibling(currFld)).value; //REDWOOD_CHANGES
    if (document.getElementById("BLK_TXN_UDF_DETAILS"))
      document.getElementById("BLK_TXN_UDF_DETAILS").tBodies[0].rows[udfFldNo].cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = getPreviousSibling(getPreviousSibling(currFld)).value;	//REDWOOD_CHANGES
  }
  else {
    if (document.getElementById("BLK_UDF_DETAILS"))
		if(getTableObjForBlock("BLK_UDF_DETAILS").tBodies[0].rows[udfFldNo]!= undefined){ //REDWOOD_36402699 
      getTableObjForBlock("BLK_UDF_DETAILS").tBodies[0].rows[udfFldNo].cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = currFld.value;  //REDWOOD_CHANGES
    } else if (getTableObjForBlock("All__").getElementsByTagName("fieldset")[udfFldNo]){ //REDWOOD_36402699
	  getTableObjForBlock("All__").getElementsByTagName("fieldset")[udfFldNo].getElementsByTagName("OJ-INPUT-TEXT")[0].value = currFld.value;//36402699
    }
    
    if (document.getElementById("BLK_TXN_UDF_DETAILS"))
      getTableObjForBlock("BLK_TXN_UDF_DETAILS").tBodies[0].rows[udfFldNo].cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = currFld.value;	 //REDWOOD_CHANGES
  }
  //12.0.2 udf changes for CSCTRUDF end
  //Fix for 14321478 -UDF update issue ends
  //Udf fld desc change
  if (getNextSibling(currFld) && getNextSibling(currFld).tagName == 'BUTTON' && getOuterHTML(getNextSibling(currFld)).indexOf("disp_cal") ==  - 1) {
    /*Fix for 16976058 Start*/
    if (indexNumber > 0) {
      udfFldLength = udfFldLength + 1;
    }
    var fieldIdDesc = currFld.id.substring(0, currFld.id.length - udfFldLength) + 'DESC' + udfFldNo;
    /*Fix for 16976058 Ends*/
    if(document.getElementById("BLK_UDF_DETAILS")&& document.getElementById(fieldIdDesc)) //Fix for 19698809
      getTableObjForBlock("BLK_UDF_DETAILS").tBodies[0].rows[udfFldNo].cells[7].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById(fieldIdDesc).value;
    if (document.getElementById("BLK_TXN_UDF_DETAILS") && document.getElementById(fieldIdDesc)) //9NT1606_12_4_RETRO_12_3_26724244 added AND condition
      getTableObjForBlock("BLK_TXN_UDF_DETAILS").tBodies[0].rows[udfFldNo].cells[7].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById(fieldIdDesc).value;
  }
  //Udf fld desc change
}

function fnPickupMIS() {
  var old_action = gAction;
  inDate = setActionTime();
  if (selectNodes(dbDataDOM, "//BLK_DEFAULT_MIS_CODES")) {
    if (selectNodes(dbDataDOM, "//BLK_DEFAULT_MIS_CODES").length == 0) {
      appendData();
      gAction = "MISPICKUP";
      fcjRequestDOM = buildUBSXml();
      fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
      var msgStatus = fnProcessResponse();
      //fnPostAction("MISPICKUP");
      if (msgStatus == "FAILURE") {
        gAction = old_action;
        return false;
      }
      gAction = old_action;
      return true;
    }
  }
}

function fnPreLoad_CVS_AUTHORIZE(screenArgs) {
  screenArgs['MASTERFNID'] = functionId;
  screenArgs['REQDOM'] = fcjRequestDOM;
  screenArgs['RESDOM'] = fcjResponseDOM;
  return true;
}

// Online Screen Code Changes
function fnProductPickup() {
  inDate = setActionTime();
  processingAction = "ProductPickup";
  if (!fnPreProductPickupMain())
    return;
  //if (!fnEventsHandler('fnPreProductPickup')) return;
  appendData();
  g_prev_gAction = gAction;
  gAction = 'PRDDFLT';
  /* retro of bug 18295549 for change for 18312329  start*/
  oldResDOM_Cancel = fcjResponseDOM;
  /* retro of bug 18295549 for change for 18312329  end */
  fcjRequestDOM = buildUBSXml();
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
   /*var respTxt = getXMLString(fcjResponseDOM);
  if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
        appendDebug(fcjResponseDOM);
        var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
        var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
        respTxt = start + end;
        fcjResponseDOM = loadXMLDoc(respTxt);
  }*/
  var msgStatus = fnProcessResponse();
  fnPostProcessResponse(msgStatus);
  //fnpostAction('PRDDFLT');
  
}
var showProcessMsg = true;

function fnProcessRequest() {
  appendData();
  processingAction = "ProcessRequest";
  g_prev_gAction = gAction;
  gAction = 'PROCESS';
  if (!fnPreProcessRequestMain())
    return;

  fcjRequestDOM = buildUBSXml();
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  var msgStatus = fnProcessResponse();
  fnPostProcessResponse(msgStatus);
}

function fnEnrichDetails() {
  inDate = setActionTime();
  processingAction = "EnrichDetails";
  if (!fnPreEnrichDetailsMain())
    return;

  appendData();
  //Fix for 14779627 Starts
  //var gprev = gAction;
  g_prev_gAction = gAction;
  //Fix for 14779627  Ends 
  gAction = 'ENRICH_' + gAction;
  fcjRequestDOM = buildUBSXml();
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  /*var respTxt = getXMLString(fcjResponseDOM);
  if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
        appendDebug(fcjResponseDOM);
        var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
        var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
        respTxt = start + end;
        fcjResponseDOM = loadXMLDoc(respTxt);
  }*/
  var msgStatus = fnProcessResponse();
  fnPostProcessResponse(msgStatus);
  //Fix for 14779627 Starts
  //gAction = gprev;
  //fnpostAction(gAction);
  gAction = g_prev_gAction;
  //Fix for 14779627 Ends
}

function fnHold() {
  inDate = setActionTime();//Performance Changes
  //12.0.3 Summary to detail changes starts
  fnUpdateMultiDetailNavBtns(true);
  //12.0.3 Summary to detail changes ends
  processingAction = "Hold";
  ghold = true;//Bug no: 16290155 Changes
  subSysFlag = false;
  //9NT1606_12_4_RETRO_12_2_26230533 sts
   if (!fnValidate()) {
        return false;
      }
  //9NT1606_12_4_RETRO_12_2_26230533 ends
  var prevStatusStr = "";
  if (!fnPreHoldMain())
    return;
  //if (!fnEventsHandler('fnPreHold')) return;
  var prevAction = gAction;
  gAction = "HOLD";

  /* On HOLD changing the subsystem status to R for those subsystems whose dependent field values have been changed */
  if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
    subSysFlag = true;
    var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
    prevStatusStr = statusStr;
    var subSys = strScreenName + '__' + strCurrentTabId;
    if (statusStr.indexOf(subSys) != "-1") {
      /* Fix for 17332597  Start*/
      if (typeof (tabDom) != "undefined" && tabDom != null && getXMLString(tabDom) != getXMLString(dbDataDOM)) {
        fnSetTabSubSystem();
        tabDom = null;
      }
    }
    /* Fix for 17332597  End*/
    fnCheckSubSysValues(statusStr);
  }

  appendData();
  fcjRequestDOM = buildUBSXml();
  try {
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  }
  catch (e) {
    debugs("Failed in fnpost", "");
  }
  gAction = prevAction;
  var msgStatus = fnProcessResponse();
  fnPostProcessResponse(msgStatus);
  inDate = "";//Performance Changes
}

function fnReverse() {
  inDate = setActionTime();
  fnBuildFullDOM();/*12.0.4 UI performance changes*/
  //12.0.3 Summary to detail changes starts
  fnUpdateMultiDetailNavBtns(true);
  //12.0.3 Summary to detail changes ends
  //if(typeof(actStageArry)== "undefined"  || (typeof(actStageArry)!= "undefined" && actStageArry['REVERSE'] && actStageArry['REVERSE'] != '2')){
  processingAction = "Reverse";
  if (!fnPreReverseMain())
    return;
  //if (!fnEventsHandler('fnPreReverse')) return;
  gAction = "REVERSE";
  mask();
  showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_REVERSE_DESC")), "C");
  alertAction = "REVERSEACTION";
}

function fnRollover() {
  inDate = setActionTime();
  setLock('Rollover');
}

function fnConfirm() {
  inDate = setActionTime();
  fnBuildFullDOM();/*12.0.4 UI performance changes*/
  //12.0.3 Summary to detail changes starts
  fnUpdateMultiDetailNavBtns(true);
  //12.0.3 Summary to detail changes ends
  //if(typeof(actStageArry)== "undefined"  || (typeof(actStageArry)!= "undefined" && actStageArry['CONFIRM'] && actStageArry['CONFIRM'] != '2')){
  processingAction = "Confirm";
  //if (!fnEventsHandler('fnPreConfirm')) {
  if (!fnPreConfirmMain()) {
    gAction = "";
    return;
  }
  gAction = 'CONFIRM';
  appendData();
  fcjRequestDOM = buildUBSXml();
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  var msgStatus = fnProcessResponse();
  fnPostProcessResponse(msgStatus);
}

function fnLiquidate() {
  inDate = setActionTime();
  setLock('Liquidate');
}

//change to fix tab container height while section expand/collapse start 19/Jan/2017
function fnCalcHgtTabContainer(action) {//Fix for 31066455
    var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
    var l_DivTmpHgt = 0;
    var mainDiv = null;
    if (parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0) {
        mainDiv = mainWin.document.getElementById("dashboard");
    } else {
        mainDiv = mainWin.document.getElementById("MenuSearchDiv");
    }
    var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);
    if (g_scrType != "S")
	scrHeight = mainDiv.offsetHeight;
    if (document.getElementById("toolbar")) {
        l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight - document.getElementById("toolbar").offsetHeight;
    } else {
        l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
    }
    document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) + 'px';
    var divMainTmpChildren = document.getElementById("DIVMainTmp").children;
    var tempContainerHgt = 0;
    for (var divCnt = 0;divCnt < divMainTmpChildren.length;divCnt++) {
        if (typeof (divMainTmpChildren[divCnt].getAttribute("id")) != "undefined" && (divMainTmpChildren[divCnt].getAttribute("id")) != "mainTabContainer") {
            tempContainerHgt += divMainTmpChildren[divCnt].offsetHeight;
        }
    }
	//Fix for 31066455 starts
	if(action != undefined) {
		document.getElementsByClassName("DIVHeader")[0].removeAttribute("style");
	}
	//Fix for 31066455 ends
    document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - tempContainerHgt + "px";
}
//change to fix tab container height while section expand/collapse end 19/Jan/2017

//screen height change start
function fnCalcHgt() {// //REDWOOD_CHANGES
    //HTML5 Changes Start  
 //REDWOOD_CHANGES
//    if ( mainWin.document.getElementById("vtab").style.display != "none") { //OJET Migration
        mainWin.toggleNavigation('close');
//    }//HTML5 Changes End		  
 //REDWOOD_CHANGES
  var containerDIVObj = parent.document.getElementById(seqNo);
  
   var scrWidth = document.getElementById("DIVMainTmp").offsetWidth;  
 //REDWOOD_CHANGES
    containerDIVObj.style.width = "100%";
   containerDIVObj.children[0].style.width = "100%";   
 //REDWOOD_CHANGES
 // var scrWidth = document.getElementById("DIVScrContainer").offsetWidth;
 document.getElementById("DIVScrContainer").style.width = scrWidth ; 
 //REDWOOD_CHANGES
  //var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);
   var scrHeight = parseInt(mainWin.document.getElementById("mainContent").offsetHeight);
  //REDWOOD_CHANGES 
  if (scrWidth > mainWin.x - 2)//HTML5 Changes
    scrWidth = mainWin.x - 2;//HTML5 Changes   
 //REDWOOD_CHANGES
//  var mainDiv = null;
//  if (parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0) {
//    mainDiv = mainWin.document.getElementById("dashboard");
//  }
//  else {
//    mainDiv = mainWin.document.getElementById("MenuSearchDiv");
//  }
// // if (g_scrType != "S") //OJET Migration
//  scrHeight = mainDiv.offsetHeight;//HTML5 Changes
  containerDIVObj.style.width = "100%";
  containerDIVObj.children[0].style.width = "100%";	 
 //REDWOOD_CHANGES
  containerDIVObj.style.height = scrHeight + "px";
  containerDIVObj.children[0].style.height = scrHeight + "px";	
 //REDWOOD_CHANGES
  document.getElementById("DIVWNDContainer").style.width = "100%";
  document.getElementById("DIVMainTmp").style.width = "100%";
  document.getElementById("mainTabContainer").style.width = "100%";//static header change
 //REDWOOD_CHANGES 
 if (document.getElementById("SYS_TBL_TABS"))
    document.getElementById("SYS_TBL_TABS").style.width = "100%";//static header change  //REDWOOD_CHANGES
  var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
  //HTML5 changes 24/OCT/2016 start		   
 //REDWOOD_CHANGES
//  var headerDivHgt = document.getElementsByClassName("DIVHeader")[0].offsetHeight;
//  if (parseInt(headerDivHgt) > 0.5*parseInt(scrHeight)) {
//      document.getElementsByClassName("DIVHeader")[0].style.height = 0.5*parseInt(scrHeight) + "px";
//      document.getElementsByClassName("DIVHeader")[0].style.overflow = "auto";
//  }
  //HTML5 changes 24/OCT/2016 end
  var l_DivTmpHgt = 0;
  if (document.getElementById("toolbar")) {
    l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight - $("#toolbar").outerHeight(true);
  }
  else {
    l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
  }
  document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) + 'px';
  var divMainTmpChildren = document.getElementById("DIVMainTmp").children;
  var tempContainerHgt = 0;
  /*for (var divCnt = 0;divCnt < divMainTmpChildren.length;divCnt++) {
    if (typeof (divMainTmpChildren[divCnt].getAttribute("id")) != "undefined" && (divMainTmpChildren[divCnt].getAttribute("id")) != "mainTabContainer") {
      tempContainerHgt += divMainTmpChildren[divCnt].offsetHeight;
  }
  }//HTML5 Changes Start
  document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - tempContainerHgt + "px";*/
  //containerDIVObj.style.top = mainWin.document.getElementById("masthead").offsetHeight  + "px";
  containerDIVObj.style.top = 0  + "px";  
 //REDWOOD_CHANGES
  if (g_scrType == 'L') {
    setHorizontalPosition(containerDIVObj, false, 0);  //REDWOOD_CHANGES
  }
  else {
    setHorizontalPosition(containerDIVObj, false, 0);   //REDWOOD_CHANGES
  }//HTML5 Changes End
  containerDIVObj.children[0].title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);//Fix for 19463987  
  containerDIVObj.children[0].id +=seqNo;//Fix for 19463987  

}
//screen height change end
function fnCalcHgtSubScreen() {//REDWOOD_CHANGES
    //HTML5 Changes 6/OCT/2016 Start
 //REDWOOD_CHANGES
//    if (mainWin.document.getElementById("vtab").style.display != "none") {
//        mainWin.showHideVtab();
//    }//HTML5 Changes 6/OCT/2016 End 
 //REDWOOD_CHANGES
  var containerDIV = "ChildWin";
 //REDWOOD_CHANGES
   mainWin.toggleNavigation('close');
  //var scrWidth = document.getElementById("DIVScrContainer").offsetWidth;
  //var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);
  //if (scrWidth > mainWin.x - 3)//HTML5 Changes
    //scrWidth = mainWin.x - 3;

//  var mainDiv = null;
//
//  if (parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0) {
//    mainDiv = mainWin.document.getElementById("dashboard");
//  }
//  else {
//    mainDiv = mainWin.document.getElementById("MenuSearchDiv");
//  }
  //if(parent.g_scrType != "S"){	 
 //REDWOOD_CHANGES
	var parentContainer = "ChildWin";
		if(parent.seqNo) {
			parentContainer = parent.seqNo;
		}
		scrHeight =  parent.parent.document.getElementById(parentContainer).offsetHeight ;//- (parent.document.getElementById("WNDtitlebar").offsetHeight);
 //REDWOOD_CHANGES
	/* }
	 else{
		if (scrHeight > parseInt(mainDiv.offsetHeight - 14))
			scrHeight = parseInt(mainDiv.offsetHeight) - 14;
		if (scrHeight + document.getElementById("WNDtitlebar").offsetHeight >= parseInt(mainDiv.offsetHeight)) {
			scrHeight = scrHeight - document.getElementById("WNDtitlebar").offsetHeight;
		}
	 } */
  //parent.document.getElementById(containerDIV).style.width = scrWidth + "px";
  //parent.document.getElementById(containerDIV).children[0].style.width = scrWidth + "px";
  parent.document.getElementById(containerDIV).style.width = "100%";
  if(dialogZIndex){
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
  document.getElementById("mainTabContainer").style.width = "100%";//static header change
  //if (document.getElementById("SYS_TBL_TABS"))
    //document.getElementById("SYS_TBL_TABS").style.width = scrWidth + "px";//static header change
 // var l_DivFooter = document.getElementById("subscreenFooter").offsetHeight;outerHeight
  //var l_DivTmpHgt = 0;
 // l_DivFooter = "0";
  //l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
  //document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) + 'px';
  document.getElementById("DIVScrContainer").style.minHeight = $("#subscreenDialog").outerHeight(true) -  $("#WNDtitlebar").outerHeight(true) - $("#subscreenFooter").outerHeight(true)  +"px";
  
  /*var divMainTmpChildren = document.getElementById("DIVMainTmp").children; 
  var tempContainerHgt = 0;

  for (var divCnt = 0;divCnt < divMainTmpChildren.length;divCnt++) {
    if (typeof (divMainTmpChildren[divCnt].getAttribute("id")) != "undefined" && (divMainTmpChildren[divCnt].getAttribute("id")) != "mainTabContainer") {
      tempContainerHgt += divMainTmpChildren[divCnt].offsetHeight;
    }
  }
  document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - (tempContainerHgt) + "px";*/
 //REDWOOD_CHANGES
//HTML5 Changes Start
  if (parent.seqNo) {
    containerDIV = parent.seqNo;
    //parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight - 3 + "px"; //REDWOOD_CHANGES
  }	   
 //REDWOOD_CHANGES
  //var mainScrHeight = parseInt(mainDiv.offsetHeight);
  //parent.parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
  //parent.parent.document.getElementById(containerDIV).children[0].style.height = mainScrHeight + "px";
  //parent.parent.document.getElementById(containerDIV).style.width = mainWin.x - 2 + "px";
  //parent.parent.document.getElementById(containerDIV).children[0].style.width = mainWin.x - 2 + "px";//HTML5 Changes
  //parent.document.getElementById("DIVScrContainer").style.height = mainScrHeight - document.getElementById("WNDtitlebar").offsetHeight - 4 + "px";
  //parent.document.getElementById("DIVScrContainer").style.width = mainWin.x - 2 + "px";
  //parent.document.getElementById("DIVWNDContainer").style.width = mainWin.x - 2 + "px";
 // setHorizontalPosition(parent.parent.document.getElementById(containerDIV), false, 0);//HTML5 Changes
  //parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H3")[0]);
 //REDWOOD_CHANGES
}//HTML5 Changes End

function fnCalcChildScrHgt(containerDIV, scrHeight) {
  if (parent.g_scrType == 'L' && g_scrType == 'L') {
    scrHeight = parent.document.getElementById("DIVWNDContainer").offsetHeight - parent.document.getElementById("WNDtitlebar").offsetHeight;
  }
  else if (parent.g_scrType == 'M' && g_scrType == 'L') {
    scrHeight = document.getElementById("DIVWNDContainer").offsetHeight;
  }
  else if (parent.g_scrType == 'M' && g_scrType == 'M') {
    scrHeight = document.getElementById("DIVWNDContainer").offsetHeight;
  }
 /* else if (parent.g_scrType == 'S' && g_scrType == 'L') {
  }
  else if (parent.g_scrType == 'S' && g_scrType == 'M') {
  }
  else if (parent.g_scrType == 'S' && g_scrType == 'S') {
  }*/
  return scrHeight;
}

function fnCalcChildScrWdt(containerDIV, scrWidth) {
  if (parent.g_scrType == 'L' && g_scrType == 'L') {
    scrHeight = parent.document.getElementById("DIVWNDContainer").offsetHeight - parent.document.getElementById("WNDtitlebar").offsetHeight;
  }
  else if (parent.g_scrType == 'M' && g_scrType == 'L') {
    scrWidth = document.getElementById("DIVWNDContainer").offsetWidth;
  }
  else if (parent.g_scrType == 'M' && g_scrType == 'M') {
    scrWidth = document.getElementById("DIVWNDContainer").offsetWidth;
  }
  /*else if (parent.g_scrType == 'S' && g_scrType == 'L') {
  }
  else if (parent.g_scrType == 'S' && g_scrType == 'M') {
  }
  else if (parent.g_scrType == 'S' && g_scrType == 'S') {
  }*/
  return scrWidth;
}

function fnViewChangeLog() {
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
  debugs("FunctionId=", functionId);
  gActionMainScreen = gAction;
  gAction = "CHANGELOG";
  authFunction = 'EXTAUTHORIZE';
  authUixml = 'EXTAUTHORIZE';
  authScreenName = 'CVS_AUTHORIZE';
  fcjRequestDOM = buildUBSXml();
  fnSubScreenMain(authFunction, authUixml, authScreenName, true);
  if (typeof (launchMsgScreen) != "undefined")
    fnShowMsgDetails();
}

function setLock(action) {
  fnBuildFullDOM();/*12.0.4 UI performance changes*/
  //12.0.3 Summary to detail changes starts
  fnUpdateMultiDetailNavBtns(true);
  //12.0.3 Summary to detail changes ends
  fnBuildTabHTML();
  if (action == "Rollover") {
    if (!fnPreRolloverMain()) {
      gAction = "";
      return;
    }
  }
  else if (action == "Liquidate") {
    if (!fnPreLiquidateMain()) {
      gAction = "";
      return;
    }
  }

  gAction = "UNLOCK_"+action.toUpperCase(); //Fix for 32335251
  //Amend Array Changes Start
  actualAction =action.toUpperCase();
  //Amend Array Changes End
  fcjRequestDOM = buildUBSXml();
  actualAction="";//Amend Array Changes
  var removeNode1 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
  for (var i = 0;i < removeNode1.length;i++) {
    removeNode1[i].parentNode.removeChild(removeNode1[i]);
  }
  var removeNode2 = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + dataSrcLocationArray[0] + "']");
  for (var i = 0;i < removeNode2.length;i++) {
    removeNode2[i].parentNode.removeChild(removeNode2[i]);
  }
  var oldResponseDOM = loadXMLDoc(getXMLString(fcjResponseDOM));
  responseDOM_Modify = loadXMLDoc(getXMLString(fcjResponseDOM)); //9NT1606_12_2_RETRO_12_0_2_23656279 changes 
  fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
  /*Amend Array Changes Start*/
  var amendFields = "";
  if(getXMLString(fcjResponseDOM).indexOf("FCUBS_AMEND_FIELDS")>0){
      amendFields= getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_AMEND_FIELDS"));
  }
  /*Amend Array Changes Ends*/
  if (!fnProcessResponseLock()) {
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    return;
  }
  gAction = action.toUpperCase();
  fcjResponseDOM = loadXMLDoc(getXMLString(oldResponseDOM));
  disableForm();
  fnChangeLabelToText("TEXTAREA");
  //fnEnableAmendFields(gAction.toLowerCase());
  fnEnableAmendFields(gAction.toLowerCase(),amendFields);//Amend Array Changes
  disableMESVFields();
  fnClearExtAuditFields();
  fnSetExitButton();
  showToolbar(functionId, '', '');
  if (action == "Rollover") {
    fnPreRolloverMain();
  }
  else if (action == "Liquidate") {
    fnPostLiquidateMain();
  }
}

function fnBuildTabHTML(flag) {//REDWOOD_CHANGES
  if (tab_arr.length == 0 || tab_ids.length == 0) {
    fnTabDetails();
  }
  for (var i = 0;i < tab_arr.length;i++) {
    if (tab_arr[i] && document.getElementById("TBLPage" + tab_arr[i].id)) {  //REDWOOD_CHANGES
      if (document.getElementById("TBLPage" + tab_arr[i].id).innerHTML == "") {
        var html = ShowXMLTabNew(xmlFileName, 'ExtDetailTab.xsl', strScreenName, tab_arr[i].id);//12.1 Caching Tab load
        debugs("tabsContent=", html);
        document.getElementById("TBLPage" + tab_arr[i].id).innerHTML = html;
        document.getElementById("TBLPage" + tab_arr[i].id).style.display = "block";
    //REDWOOD_CHANGES 
       //fnBuildMultipleEntryArray(tab_arr[i].id);
          screenKo.cleanNode(document.getElementById("TBLPage" +  tab_arr[i].id));
          html = html.replace(new RegExp("readonly_temp", 'g'), "readonly").replace(new RegExp("oj_switch_readonly", 'g'), "disabled").replace(new RegExp("viewchanges", 'g'), ":viewchanges");//REDWOOD_35670751 added
                
         fnBindScreenElements(document.getElementById("TBLPage" +  tab_arr[i].id));//OJET Migration
         screenKo.applyBindings( {},document.getElementById("TBLPage" +  tab_arr[i].id));
 //REDWOOD_CHANGES
        if (tab_arr[i].id != strCurrentTabId)
          document.getElementById("TBLPage" + tab_arr[i].id).style.display = "none";
      }
    }
  }
   //fnBindScreenElements(); //REDWOOD_CHANGES
  if (typeof (flag) == "undefined" || (typeof (flag) != "undefined" && flag == false)) {
    showAllData();
  }
}

function fnExpandCollapseSubSys(srcElem) {
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
  if (document.getElementById("DIVSubSystem")) {
    var isLiHidden = false;
    var tempLiPos = 0;
    var firstLiPos = 0;
    var divFooterHgt = document.getElementById("DIVFooter").offsetHeight;
    var clsName = 'subSystemCollapse'
    if (srcElem) {
      clsName = srcElem.getElementsByTagName("SPAN")[0].className;
    }
    var liElemList = document.getElementById("DIVSubSystem").getElementsByTagName("LI");
    if (mainWin.LangCode != 'ARB') {
      firstLiPos = liElemList[0].offsetLeft;
    }
    else {
      firstLiPos = liElemList[0].offsetLeft + liElemList[0].offsetWidth;
    }
    if (clsName == 'subSystemCollapse') {
      for (var liCnt = 1;liCnt < liElemList.length;liCnt++) {
        if ((mainWin.LangCode != 'ARB') && (liElemList[liCnt].offsetLeft == firstLiPos) || (mainWin.LangCode == 'ARB') && ((liElemList[liCnt].offsetLeft + liElemList[liCnt].offsetWidth) == firstLiPos)) {
          isLiHidden = true;
          tempLiPos = liCnt;
          break;
        }
      }
      if (isLiHidden) {
        for (var liCnt = liElemList.length - 1;liCnt >= tempLiPos;liCnt--) {
          liElemList[liCnt].style.display = 'none';
        }
      }
      if (srcElem) {
        srcElem.getElementsByTagName("SPAN")[0].className = 'subSystemExpand';
        srcElem.title = mainWin.getItemDesc("LBL_EXPAND_SECTION");
      }
    }
    else {
      for (var liCnt = 1;liCnt < liElemList.length;liCnt++) {
        if (liElemList[liCnt].style.display == 'none') {
          liElemList[liCnt].style.display = 'block';
          isLiHidden = true;
        }
      }
      srcElem.getElementsByTagName("SPAN")[0].className = 'subSystemCollapse';
      srcElem.title = mainWin.getItemDesc("LBL_COLLAPSE_SECTION");
    }
    if (isLiHidden) {
      document.getElementById("DIVSubSystemController").style.height = document.getElementById("DIVSubSystem").offsetHeight + 'px';
      document.getElementById("DIVMainTmp").style.height = document.getElementById("DIVMainTmp").offsetHeight + (divFooterHgt - document.getElementById("DIVFooter").offsetHeight) + 'px';

      if (document.getElementById("DIVMainTmp").children[0].innerHTML == "") {
        document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - document.getElementById("DIVMainTmp").children[0].offsetHeight + "px";
      }
      else {
        document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - document.getElementById("DIVMainTmp").children[0].offsetHeight - 8 + "px";
      }

      if (document.getElementById("SYS_TBL_TABS"))
        document.getElementById("mainTabContainer").style.height = document.getElementById("mainTabContainer").offsetHeight - document.getElementById("SYS_TBL_TABS").offsetHeight + "px";
    }
    else {
      document.getElementById("DIVSubSystemController").style.visibility = "hidden";
    }
  }
}

//12.0.2 SOATEAM Changes Starts
function fnTemplateCopyTask() {
  var wfIdList = '';
  try {
    var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    var taskActionXML = "<TaskRequest OP = 'ACTION'>";
    taskActionXML = taskActionXML + "<ActionName>COPYTEMPLATETASK</ActionName>";
    taskActionXML = taskActionXML + "<PayLoad>" + getXMLString(fcjResponseDOM) + "</PayLoad>";
    taskActionXML = taskActionXML + "</TaskRequest>";
    objHTTP.send(taskActionXML);
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
      alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    }
    else {
      if (objHTTP.readyState == 4 && getXMLString(objHTTP.responseXML) != '') {
        wfIdList = objHTTP.responseXML;
      }
      else 
        return null;
    }
    if (selectNodes(wfIdList, "//RESPONSE/MESSAGE").length > 0) {
      for (var msgIdx = 1;msgIdx <= selectNodes(wfIdList, "//RESPONSE/MESSAGE").length;msgIdx++) {
        messageNode = selectSingleNode(wfIdList, "//RESPONSE/MESSAGE[" + msgIdx + "]");
        if (msgIdx == 1) {
          msgType = getNodeText(messageNode.getAttribute("TYPE"));
          msg = getNodeText(messageNode);
          errcode = msg.substring(0, msg.indexOf(" "));
        }
        else {
          msgType = msgType + "~" + getNodeText(messageNode.getAttribute("TYPE"));
          msg = msg + "~" + getNodeText(messageNode);
          errcode = errcode + "~" + msg.substring(0, msg.indexOf(" "));
        }
        if (msgType == null || msgType == "")
          msgType = "I";
        if (msgType.indexOf("E") >  - 1)
          msgType = "E";
        else 
          msgType = "I";
      }
    }
    mask();
    showAlerts(fnBuildAlertXML(errcode, msgType, msg), msgType);
    alertAction = "UNMASK";
    wfIdList = mainWin.fnCopyTaskDom(wfIdList);
  }
  catch (e) {
  }
  mainWin.document.getElementById('BLK_BRANCH__STAGE').value = '';
  return true;
}
//12.0.2 SOATEAM Changes Ends
//12.0.3 Summary to detail changes starts
function fnQueryMultiDetail(type, event) {
  var navPrev = document.getElementById("navigatePrev");
  var navNext = document.getElementById("navigateNext");
  var prevCurrPage = navPrev.getAttribute("currPage");
  var nextCurrPage = navNext.getAttribute("currPage");
  switch (type) {
    case gcNAV_PREVIOUS:
      currPage = Number(prevCurrPage) - 1;
      navNext.setAttribute("currPage", currPage);
      navPrev.setAttribute("currPage", currPage);
	  resetDOM();//21839221 
      resetElements();
      fnSetPkvals(detailpkArgs[currPage]);
      gAction = 'EXECUTEQUERY';
      fnExecuteQuery();
      fnUpdateMultiDetailNavBtns(false);
      break;
    case gcNAV_NEXT:
      currPage = Number(nextCurrPage) + 1;
      navNext.setAttribute("currPage", currPage);
      navPrev.setAttribute("currPage", currPage);
	  resetDOM();//21839221 
      resetElements();
      fnSetPkvals(detailpkArgs[currPage]);
      gAction = 'EXECUTEQUERY';
      fnExecuteQuery();
      fnUpdateMultiDetailNavBtns(false);
      break;
    default :
      showErrorAlerts('IN-HEAR-500');
  }
}

function fnUpdateMultiDetailNavBtns(hideBtns) {
  var navPrev = document.getElementById("navigatePrev");
  var navNext = document.getElementById("navigateNext");
  if (navPrev != null && navNext != null) {
    var currentPage = navPrev.getAttribute("currPage");
    if (hideBtns == true) {
      navNext.style.display = "none";
      navPrev.style.display = "none";
    }
    else if (navPrev) {
      if (Number(currentPage) < (detailpkArgs.length) && Number(currentPage) != 0) {
        navNext.disabled = false;
        navNext.style.display = "block";
        navPrev.disabled = false;
        navPrev.style.display = "block";
      }

      if (Number(currentPage) < (detailpkArgs.length - 1) && Number(currentPage) == 0) {
        navNext.disabled = false;
        navNext.style.display = "block";
        navPrev.disabled = true;
        navPrev.style.display = "block";
      }
      if (currentPage == detailpkArgs.length - 1 && Number(currentPage) != 0) {
        navPrev.disabled = false;
        navPrev.style.display = "block";
        navNext.disabled = true;
        navNext.style.display = "block";
      }
    }
  }
}
//12.0.3 Summary to detail changes ends
//static header change
function fnSetScreenSize() { //REDWOOD_CHANGES
  if (g_scrType != 'L') {
//    document.getElementById("ResTree").className = "DIVTwoColLyt";  //REDWOOD_CHANGES
//    document.getElementById("DIVScrContainer").className = "WNDcontent mediumwin";   //REDWOOD_CHANGES
  }
  else {
//    document.getElementById("ResTree").className = "DIVThreeColLyt";	 //REDWOOD_CHANGES
//    document.getElementById("DIVScrContainer").className = "WNDcontent bigwin";  //REDWOOD_CHANGES
  }
}

/*12.0.4 UI performance changes starts*/
function fnBuildFullDOM() {

  if (typeof (isPartialDOM) == "undefined") {
    //12.0.3
    isPartialDOM = parent.isPartialDOM;
  }
  if (isPartialDOM) {
    fcjResponseDOM = returnMEBlockData();
    pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    debugs("Calling set data ,Message XMLDOM in fnBuildFullDOM ", getXMLString(pureXMLDOM));
    setDataXML(getXMLString(pureXMLDOM));
    isPartialDOM = false;//12.0.3
  }
  else {
    return;
  }
}

function fnCalcTimings(startjsTime, sumStartTime, sumEndTime){
   fnSetTime(startjsTime, startjsTime, functionId);//Performance Changes
   
   if (parentSeqNo != "" && parentSeqNo != "null") {
    debugs("parentSeqNo=", parentSeqNo);
    var parentWin = "";

    for (var i = 0;i < mainWin.arrChildWindows.length;i++) {
      if (mainWin.arrChildWindows[i].id == parentSeqNo) {
        parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
        break;
      }
    }
   }
 /* try {
    var dbtime = 0;
    var servertime = clientHandlerExit - clientHandlerEntry;
    t = getDateObject();
    time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();

    var jstime = parseFloat(parseFloat(sumStartTime) - parseFloat(startjsTime)) ;
    var loadAfterSum = parseFloat(parseFloat(time) - parseFloat(sumEndTime)) ;
    jstime = parseFloat(parseFloat(jstime) + parseFloat(loadAfterSum));
    totaltime = parseFloat(parseFloat(t.getTime()) - parseFloat(inLoadTime)) ;
    startDate = new Date(parseFloat(inLoadTime));
    startTime = startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate() + " " + startDate.getHours() + ':' + startDate.getMinutes() + ':' + startDate.getSeconds();
    endTime = t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + " " + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
    var databaseSessionID = "";
    var loginSeqNo = "";
    var actionSeqno = "";
     if (ShowSummary == "TRUE" || (typeof(parentWin) != 'undefined' && parentWin.VIEWMAINT == "TRUE")) {
      var executeQueryTime = mainWin.loadTimeArray[seqNo];
      jstime = parseFloat(parseFloat(jstime) + parseFloat(executeQueryTime.split("~")[0]));
      dbtime = Math.round(parseFloat(parseFloat(dbtime) + parseFloat(executeQueryTime.split("~")[1])) * 100) / 100;
      servertime = Math.round(parseFloat(parseFloat(servertime) + parseFloat(executeQueryTime.split("~")[2])) * 100) / 100;
      databaseSessionID = executeQueryTime.split("~")[5];
      loginSeqNo = executeQueryTime.split("~")[6];
      actionSeqno = executeQueryTime.split("~")[7];
      mainWin.loadTimeArray[seqNo] = 0;

    }
    else {
      loginSeqNo = mainWin.SignonSerial;
      actionSeqno = actionseqNo;
    }
    jstime = Math.round(jstime * 100) / 100;
    //fnPostActionLog(jstime, dbtime, servertime, startTime, endTime, totaltime, "", "", "", actionSeqno, databaseSessionID, loginSeqNo, seqNo, //"LOAD-EXECUTEQUERY");
    //fnPopulateTimes(loginSeqNo,seqNo,actionSeqno,jstime,dbtime,servertime,startTime,endTime,totaltime);

  }
  catch (e) {
    time = "";
    sumStartTime = "";
    sumEndTime = "";
  }*/

  /*if (mainWin.DebugWindowFlg == "Y") {
    if (ShowSummary != "TRUE") {
      mainWin.serverDebugStmt = webDbg + "\n\n" + appDbg + "\n\n" + dbDbg;
    }
  }debug revert */
}
/*12.0.4 UI performance changes ends*/

//OBIEE Changes
    function fnLaunchOBIEESubScreen(functionID, UiXml, scrName,title){
    mainWin.fnUpdateScreenSaverInterval();
    if (!mainWin.isSessionActive()) return;
    debugs("Building Screen Args", "");
    screenArgs = new Array();
    screenArgs['SCREEN_NAME'] = scrName;
    screenArgs['FUNCTION_ID'] = functionID; 
    screenArgs['LANG'] = mainWin.LangCode;
    screenArgs['UIXML'] = UiXml;
    screenArgs['TITLE'] = title;
    appendData();
    if (typeof (unmaskTitle) != "undefined") {
	unmaskTitle = true;
	mask(unmaskTitle);
    } else {
	mask();
    }
    debugs("calling fnShowOBIEESubScreen", "");
    fnbuildObieeScrArgs(screenArgs,scrName,functionID);
    fnShowObieeSubScr(screenArgs);
}

function fnbuildObieeScrArgs(screenArgs, scrName, functionID){
    var paramNames,paramValue,url,paramSrc = new Array();
    var block,blockFld = "";
    if(typeof (obScrArgName) != "undefined"){
    	var cnt=0;
        for(var i in obScrArgName){
            cnt++;
        }
        if(cnt == 0) return;
        paramNames = obScrArgName[scrName].split("~");
        paramSrc = obScrArgSource[scrName].split("~");
        var x = 6;
        url ="&p0=" + (paramNames.length+2);
        for(i=0;i<paramNames.length;i++){
            block = paramSrc[i].substr(0,paramSrc[i].lastIndexOf("__"));
            blockFld = paramSrc[i].substr(paramSrc[i].lastIndexOf("__")+2);
            if (document.getElementById(block) && document.getElementById(block).getAttribute("TYPE") && document.getElementById(block).getAttribute("TYPE") == "ME" && document.getElementById(block).getAttribute("VIEW") != "SE") {
                var curpage = Number(getInnerText(document.getElementById("CurrPage__" + block)));
		var blkRowIndx = dbIndexArray[block] - (getPgSize(block) * (curpage - 1)) - 1;
                if(typeof(document.getElementsByName(blockFld)[blkRowIndx]) != "undefined"){
			paramValue = document.getElementsByName(blockFld)[blkRowIndx].value;
		}else{
                        paramValue = document.getElementById(paramSrc[i]).value;
                }
                
            }else{
                        paramValue = document.getElementById(paramSrc[i]).value;
                }
            url += "&p"+(++x)+"=eq&p"+(++x)+"=\""+paramNames[i]+"\"&p"+(++x)+"=\""+paramValue+"\"";//fix for bug#19975061
        }
        url =replaceAll(url,"&","_AMP_");
        screenArgs['OBIEE_PARAM_URL'] = url;
    }
}//OBIEE Changes			
 //REDWOOD_CHANGES
function fntabSelectionChanged(event) {
    if (document.getElementById(event.detail.value) != document.getElementById(event.detail.value).parentNode.children[0]) {
        document.getElementById(event.detail.value).parentNode.children[0].classList.remove("oj-focus", "oj-focus-highlight", "oj-selected")
    }
}

function displayAuditSection(){ //OJET Migration
    document.getElementById("auditPop").open("#BTN_AUDIT");
}
function cancelListener() {
    document.getElementById("auditPop").close();
}				 
 //REDWOOD_CHANGES
 
function fnvalidateAuthVersion() {
    if(snapShotId == "") return true;
    var p_gAction = gAction;
    gAction = "AUTHVCHK";
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + g_txnBranch + '</BRANCH><ENTITY>' + mainWin.entity + '</ENTITY><SNAPSHOTID>' + snapShotId + '</SNAPSHOTID><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ADDL><PARAM><NAME>PKVALS</NAME><VALUE><![CDATA[' + fnGetPKValuesAuth()+ ']]></VALUE></PARAM></ADDL><ACTION>AUTHVCHK</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    var responseDom= fnPost(requestDom, "FCClientHandler", functionId);
    gAction = p_gAction;
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            return true;
        }else{
            mask();
            showAlerts(fnBuildAlertXML('FC-MAINT48', 'E'), 'E');
            alertAction = "UNMASK";
            return false;
        }
    }    
    return true;
}

function fnGetPKValuesAuth() {
    var pk = "";
    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++) {
        if (loopIndex > 0) pk += "~";
        pk += document.getElementById(pkFields[loopIndex]).value;
    }
    return pk;
}
