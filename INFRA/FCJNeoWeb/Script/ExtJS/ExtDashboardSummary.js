/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : ExtDasboardSummary.js
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


	Changed By   : Rishabh Gupta
	Changed On   : 27-Sept-2016
	Reason       : 
	Search string: 12_0_3_RETRO_12_2_23653394
	Sfr no       : 23653394
	
**  Modified By          : Neethu Sreedharan
**  Modified On          : 11-Aug-2017
**  Modified Reason      : Changes done to align the dashboard navigation buttons to left and to correct 
                           the dashboard width so that the dsanboards will be displayed properly for an 
                           Arabic user 
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_4_RETRO_12_0_2_26230970

**  Modified By          : Karthik Krishnamurthy
**  Modified On          : 24-Aug-2020
**  Modified Reason      : User able to open two windows for one xref from workflow.when a xref if opened from workflow by double 
						   clicking the xref,two transaction windows are opening.due to which authorizer is able to authorizer transaction from one window and reject the transaction from other window.Fix provided to allow user to only open transaction window on single click,on double click system will not open the transaction. 
**  Retro String         : FCUBS_124_SAIGON_2844952
**  Search String 		 : FCUBS_143_CBZ_31772671


**  Modified By          : Chaitanya Pundlik
**  Modified On          : 06-Jan-2022
**  Modified Reason      : To avoid the error occuring while rendering the data to reminders grid 
**  Search String        : FCUBS_145_33691527

**  Modified By          : Girish M
**  Modified On          : 05-Feb-2025
**  Modified Reason      : Hidden field values were not getting assigned to field attribute.
**  Search String        : REDWOOD_Dashboard
---------------------------------------------------------------------------------------------------------*/
var g_txnBranch = mainWin.CurrentBranch; //REDWOOD_CHANGES
/* Variables from ExtSummary.xsl - Starts Here */
var summaryScreen = null;
var gscrPos = null;
var g_scrType = null;
var l_LablesArr = null;
var OptionValue = null;
var fieldType = null;
var relatedField   = null;
/* Variables from ExtSummary.xsl - Ends Here */
var currentpage = 1;
var totalpages = 1;
var fetchSize = 5;
var LastQryDOM = null;
var imgPath = mainWin.theme_imagesPath;
detailWinParams = new Object();
var TableDIVInnerHtml = "";

//12.1 Dashboard changes --start
function fnLoadDashboard(xmlFile, xslFile, status) {

 if(typeof(status)!="undefined"){
    fetchSize = 35;
 }
//Performance Changes Starts
    var t = getDateObject();
    var sjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes Ends
//12.1 Dashboard changes --end
	//Fix for 21574060 start
    if (!fnPreLoad_SumMain()) {
        fnSyncDasboardTableWidth();
        return false;
    }//Fix for 21574060  end
    //if (!fnEventsHandler('fnPreLoad_Sum')) 
    //    return false;
//12.1 Dashboard changes --start
     if((functionId == 'SMSTXNDB') ){
         fnPreLoad_KERNEL(xmlFile, xslFile,status);
         fnSyncDasboardTableWidth();//Fix for 21574060
         return false;
         }
//12.1 Dashboard changes --end
    document.getElementById("containerFldset").setAttribute("TYPE", "ME");
    document.getElementById("containerFldset").setAttribute("VIEW", "ME");
    try {
        var html = ShowXML(xmlFile, xslFile, strScreenName);
        if(getBrowser().indexOf("IE") != -1) {//ie11 changes
            document.getElementById("containerFldset").insertAdjacentHTML("beforeEnd",html);
        } else {
            document.getElementById("containerFldset").appendChild(html);
            //document.getElementById("containerFldset").appendChild(contentDiv);
        }
        parent.document.getElementById("ifr_LaunchWin_"+seqNo).title=getInnerText(document.getElementById("heading"));//HTML5 changes 24/OCT/2016 Fix for 24904397
    } catch(e) {
        alert(e.message);
    }
    debugs("Inner Html", document.getElementById("containerFldset").innerHTML);
//REDWOOD_CHANGES
    if (getBrowser().indexOf("FIREFOX") != -1) {
        document.getElementById("containerFldset").querySelectorAll('template').forEach((elem) => elem.remove());
        document.getElementById("containerFldset").innerHTML = document.getElementById("containerFldset").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
          
    }else{
         document.getElementById("containerFldset").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
    }
    document.getElementById("containerFldset").innerHTML =document.getElementById("containerFldset").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
//REDWOOD_CHANGES 
   /* Code for executing the Script inside XSL files - Start */
  
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
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
    /* Code for executing the Script inside XSL files - End */
  //TableDIVInnerHtml = document.getElementById("tableContainer").innerHTML; //REDWOOD_CHANGES
//12.1 Dashboard changes --start   
if(typeof(status)=="undefined"){
//preferences changes  
//REDWOOD_CHANGES
//    if(mainWin.currentTab == 'DBoardMyDashBoard'){
//      fnCalcHgtNonHomeDashboard();
//    }
    //else{
      setTimeout(function(){fnCalcHgtDashboard();},0);
    //}	 
//REDWOOD_CHANGES
    }
    else{
 setTimeout(function(){fnCalcHgtDashboard();},0);  //REDWOOD_CHANGES
 //   fnReCalcHgtDashboard();	//REDWOOD_CHANGES
    }
//12.1 Dashboard changes --end  
    if(mainSummaryScr == ""){
        document.getElementById('btnmore').disabled = true;
        document.getElementById('btnmore').className ="AfootD";
    }
//Fix for 21574060 start
    if (!fnPostLoad_SumMain()){
       // fnSyncDasboardTableWidth(); //REDWOOD_CHANGES
        return false;
    }//Fix for 21574060 end
    //if (!fnEventsHandler('fnPostLoad_Sum')) 
    //    return false;

//12.1 Dashboard changes --start
     //if((mainWin.currentTab != 'DBoardCustomer') || (status != undefined)){//bug id : 18710381 changes 
      fnExecuteQuery_sum();
         // } //bug id : 18710381 changes 

  /*  if(functionId != 'SMSTXNDB'){
      fnExecuteQuery_sum();
      }else {
        setDataWorkflow();
      }
*/
 //Performance Changes
    if (mainWin.mBean_required == "Y") {      
      var dbtime=0;
      var servertime=clientHandlerExit-clientHandlerEntry;
      t = getDateObject();
      time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
      var jstime           = parseFloat(parseFloat(time)-parseFloat(sjsTime)); 
      jstime=Math.round(jstime*100)/100;
	   // setActionTime(inLoadTime,jstime,dbtime,servertime, functionId, 'LOAD');
      
    }
    //Performance Changes

//12.1 Dashboard changes --end
}

//preferences changes
function fnCalcHgtNonHomeDashboard() {
    var scrWidth = "";
    var divElem = parent.document.getElementById(seqNo);
    if (divElem.className == "DIVColumnOne" ) {
        divElem.style.width = divElem.parentNode.offsetWidth/3 - 4 + "px";
        scrWidth = divElem.parentNode.offsetWidth/3 - 4;
    } else if(divElem.className == "DIVColumnDouble"){
		//9NT1606_12_4_RETRO_12_0_2_26230970 starts 
        //divElem.style.width =2 * (divElem.parentNode.offsetWidth/3)  - 4 + "px";
        //scrWidth = 2 * (divElem.parentNode.offsetWidth/3 )- 4;
		divElem.style.width =2 * (divElem.parentNode.offsetWidth/3)  - 10 + "px";
        scrWidth = 2 * (divElem.parentNode.offsetWidth/3 )- 10;
		//9NT1606_12_4_RETRO_12_0_2_26230970 ends 
    } else {
        divElem.style.width = divElem.parentNode.offsetWidth - 4 + "px";
        scrWidth = divElem.parentNode.offsetWidth - 4;
    }
    var scrHeight = divElem.parentNode.offsetHeight;
    divElem.style.height  = scrHeight + "px";
    divElem.children[0].style.height = scrHeight + "px";
	/*HTML5 Changes Start*/
    //document.getElementById("containerFldset").style.height = scrHeight + "px";
    document.getElementById("dataContainer").style.height = scrHeight - 8 + "px";
    if(document.getElementById("divBtnDismiss"))
        document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight -document.getElementById("divBtnDismiss").offsetHeight - document.getElementById("tableHeaderContainer").offsetHeight - 12 + "px";//12.0.3 changes 
    else
        document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight - document.getElementById("tableHeaderContainer").offsetHeight - 12 + "px";//12.0.3 changes      
    divElem.children[0].style.width = scrWidth + "px";
    //document.getElementById("containerFldset").style.width = scrWidth + "px";
    document.getElementById("dataContainer").style.width = scrWidth - 8 + "px";
    //document.getElementById("tableContainer").style.width = scrWidth - 8 + "px";
    //document.getElementById("tableHeaderContainer").style.width = scrWidth - 8 + "px";
    /*HTML5 Changes End*/
}

function fnCalcHgtDashboard() {
    var scrWidth = "";
    var divElem = parent.document.getElementById(seqNo); 
//REDWOOD_CHANGES
//    if (divElem.className == "DIVColumnOne" || divElem.className == "DIVColumnOneAndHalf") {
//        divElem.style.width = divElem.parentNode.offsetWidth/2 - 4 + "px";
//        scrWidth = divElem.parentNode.offsetWidth/2 - 4;
//    } else if(divElem.className == "DIVColumnOneThird"){
//        divElem.style.width = divElem.parentNode.offsetWidth/3 - 4 + "px";
//        scrWidth = divElem.parentNode.offsetWidth/3 - 4;
//    
//    } else if(divElem.className == "DIVColumnOneHalf"){
//        divElem.style.width =2(divElem.parentNode.offsetWidth/3)  - 4 + "px";
//        scrWidth = 2(divElem.parentNode.offsetWidth/3 )- 4;
//    
//    } else {
//        divElem.style.width = divElem.parentNode.offsetWidth - 4 + "px";
//        scrWidth = divElem.parentNode.offsetWidth - 4;
//    }
    var scrHeight = divElem.parentNode.getBoundingClientRect().height;
    divElem.style.height  = "100%";
    divElem.children[0].style.height = "100%";
    divElem.children[0].className="oj-sm-width-full  frames";
//REDWOOD_CHANGES
	/*HTML5 Changes Start*/
    //document.getElementById("containerFldset").style.height = scrHeight + "px";
//REDWOOD_CHANGES
    //document.getElementById("dataContainer").style.height = scrHeight - 8 + "px";
    //if(document.getElementById("divBtnDismiss"))
      //  document.getElementById("tableContainer").children[0].style.height = scrHeight - document.getElementById("wndtitle").offsetHeight -document.getElementById("divBtnDismiss").offsetHeight  + "px";//12.0.3 changes 
    //else
//    divElem.children[0].style.width = scrWidth + "px";
        document.getElementById("tableContainer").style.height = Math.floor(scrHeight -parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('margin-bottom')) - parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('margin-top')) - parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('padding-top'))- parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('padding-bottom')) - document.getElementById("wndtitle").offsetHeight - document.getElementById("ScrollNo").offsetHeight)+ "px";//12.0.3 changes
        document.getElementById("tableContainer").children[0].style.maxHeight = Math.floor(scrHeight -parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('margin-bottom')) - parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('margin-top')) - parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('padding-top'))- parseFloat(document.defaultView.getComputedStyle(document.getElementById("dataContainer"), '').getPropertyValue('padding-bottom')) - document.getElementById("wndtitle").offsetHeight - document.getElementById("ScrollNo").offsetHeight)+ "px";
 //REDWOOD_CHANGES
    //document.getElementById("containerFldset").style.width = scrWidth + "px";
    //document.getElementById("dataContainer").style.width = scrWidth - 8 + "px";//REDWOOD_CHANGES
    //document.getElementById("tableContainer").style.width = scrWidth - 8 + "px";
    //document.getElementById("tableHeaderContainer").style.width = scrWidth - 8 + "px";
    /*HTML5 Changes End*/
}

//12.1 Dashboard changes --start
function fnReCalcHgtDashboard() {
	/*HTML5 Changes Start*/
    var scrWidth =  document.getElementById("dataContainer").offsetWidth;
    var scrHeight = document.getElementById("dataContainer").offsetHeight;
    parent.document.getElementById(seqNo).style.height  = scrHeight + 8 + "px";
    parent.document.getElementById(seqNo).children[0].style.height = scrHeight + 8 +"px";
    /*document.getElementById("containerFldset").style.height = scrHeight;
    document.getElementById("dataContainer").style.height = scrHeight;
    */
    if(document.getElementById("divBtnDismiss"))
        document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight -document.getElementById("divBtnDismiss").offsetHeight - document.getElementById("tableHeaderContainer").offsetHeight - 23 + "px";
    else
        document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight - document.getElementById("tableHeaderContainer").offsetHeight - 8 + "px";    
    parent.document.getElementById(seqNo).style.width = scrWidth + 8 + "px";
    parent.document.getElementById(seqNo).children[0].style.width = scrWidth + 8 + "px";
    //document.getElementById("containerFldset").style.width = scrWidth;
    //document.getElementById("dataContainer").style.width = scrWidth;
    //document.getElementById("tableContainer").style.width = scrWidth;
    //document.getElementById("tableHeaderContainer").style.width = scrWidth;
    document.getElementById("heading").disable = "true";
    document.getElementById("heading").removeAttribute("onclick");
	/*HTML5 Changes End*/
}

function clearData(){
    
   var arr =  document.getElementsByTagName("input");
      for(var i =0 ; i< arr.length; i++ ){
    arr[i].value= "";
 }
}


//12.1 Dashboard changes --end
/*
function fnCalcHgtDashboard() {
    var scrWidth = parent.document.getElementById(seqNo).offsetWidth;
    var scrHeight = parent.document.getElementById(seqNo).parentNode.offsetHeight;
    
    if (g_scrType != "S")
        document.getElementById("ResTree").className = "DIVTwoColSectionContainer WNDcontent";

    if(g_scrType == "S"){
        parent.document.getElementById(seqNo).style.width  = (scrWidth/2) -12 + "px";
        parent.document.getElementById(seqNo).children[1].style.width = (scrWidth/2) -12 + "px";
        document.getElementById("DIVScrContainer").style.width  = (scrWidth/2) -18 + "px";
    }else{
        parent.document.getElementById(seqNo).style.width  = scrWidth -22 + "px";
        parent.document.getElementById(seqNo).children[1].style.width = scrWidth-22 + "px";
        document.getElementById("DIVScrContainer").style.width  = scrWidth -22 + "px";
    }
    parent.document.getElementById(seqNo).style.height  = (scrHeight/3) - 12 + "px";
    parent.document.getElementById(seqNo).children[1].style.height  = (scrHeight/3) - 12 + "px";
    document.getElementById("DIVScrContainer").style.height  = (scrHeight/3) - 20 + "px";
    document.getElementById("ResTree").style.width = document.getElementById("DIVScrContainer").offsetWidth + "px";
    document.getElementById("ResTree").style.height  = document.getElementById("DIVScrContainer").offsetHeight - document.getElementById("DIVHeading_Options").offsetHeight + "px";
    document.getElementById("contentcontainer").style.height  = document.getElementById("DIVScrContainer").offsetHeight - document.getElementById("DIVHeading_Options").offsetHeight + "px";
    document.getElementById("TBLPageTAB_SUMMARY").style.height  = document.getElementById("DIVScrContainer").offsetHeight - document.getElementById("DIVHeading_Options").offsetHeight - 16 + "px";
    document.getElementById("TBLPageTAB_SUMMARY").style.display = "block";
}*/
function fnExecuteQuery_sum() {
   //Performance Changes
    /*var dbgflag=false;
    if(mainWin.DebugFlg=='N'){
       dbgflag=true;
       mainWin.DebugFlg='Y';
    }*/
    inDate = setActionTime();
    //Performance Changes
    if (!fnPreExecuteQuery_sumMain()) return false;
    //if (!fnEventsHandler('fnPreExecuteQuery_sum')) return false;
    gAction = "EXECUTEQUERY";
    //strCurrentTabId = 'idQuery';
    fcjRequestDOM = buildSummaryQueryXML();
    LastQryDOM = loadXMLDoc(getXMLString(fcjRequestDOM));
    debugs(getXMLString(fcjRequestDOM), "P");
    fnSubmitQuery();
    fnpostqrychange();
   // fnSyncDasboardTableWidth();//REDWOOD_CHANGES
    //Performance Changes
    //fnpostAction('EXECUTEQUERY');
   //Performance Changes
}

function fnRefreshData() {
    currentpage = 1;
    totalpages = 1;
    fnExecuteQuery_sum();
}

function fnNavigate(type){

    //document.getElementById("tableContainer").innerHTML = TableDIVInnerHtml; //REDWOOD_CHANGES
    switch (type) {
        case "PREVIOUS":
            if (Number(currentpage) > 1) 
                currentpage = currentpage-1;
            break;
        case "NEXT":
            //if (Number(currentpage) < Number(totalpages) )
                currentpage = currentpage+1;
            break;
        default:        
            return;
    }if(functionId != 'SMSTXNDB'){
    fnExecuteQuery_sum();
      }else {
        setDataWorkflow();
      }
    
    //fnExecuteQuery_sum();
}
/*
function fndisableNbtns(){
    document.getElementById('btnprev_'+functionId).disabled = true;
    document.getElementById('btnnext_'+functionId).disabled = true;
}

function fnpostqrychange(){
    if (fcjResponseDOM && getXMLString(fcjResponseDOM) !=="") {
        fndisableNbtns();
        var totalQueryPages = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("TOTAL_PAGES");
        var curPage = Number(currentpage);
        if (totalQueryPages > '1') {
            document.getElementById('btnnext_'+functionId).disabled = false;
            if (curPage == 1) {
                 document.getElementById('btnprev_'+functionId).disabled = true;
                 document.getElementById('btnnext_'+functionId).disabled = false;
            } else if (curPage == totalQueryPages) {
                document.getElementById('btnprev_'+functionId).disabled = false;
                document.getElementById('btnnext_'+functionId).disabled = true;
            
            } else {
                document.getElementById('btnprev_'+functionId).disabled = false;
                document.getElementById('btnnext_'+functionId).disabled = false;
            }
        }
    }
} */

function fndisableNbtns(){
    document.getElementById('btnprev').disabled = true;
    document.getElementById('btnnext').disabled = true;
}

function fnpostqrychange(){
    if (fcjResponseDOM && getXMLString(fcjResponseDOM) !=="") {
        fndisableNbtns();
        var totalQueryPages = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("TOTAL_PAGES");
        var curPage = Number(currentpage);
        if (totalQueryPages > '1' || totalQueryPages == '...' ) {
            document.getElementById('btnnext').disabled = false;
            if (curPage == 1) {
                 document.getElementById('btnprev').disabled = true;
                 document.getElementById('btnnext').disabled = false;
            } else if (curPage == totalQueryPages) {
                document.getElementById('btnprev').disabled = false;
                document.getElementById('btnnext').disabled = true;
            
            } else {
                document.getElementById('btnprev').disabled = false;
                document.getElementById('btnnext').disabled = false;
            }
            if(selectNodes(fcjResponseDOM, "FCJMSG/MSG/REC").length == 0 && totalQueryPages == '...'){
                parent.mask();
                parent.showAlerts(fnBuildAlertXML('', 'I', mainWin.getItemDesc("LBL_NO_RECORD")), 'I');
                parent.alertAction = "UNMASK";
            }
        }else{
            document.getElementById('btnprev').disabled = true;            
            document.getElementById('btnnext').disabled = true; 
        }
        if(selectNodes(fcjResponseDOM, "FCJMSG/MSG/REC").length < 5 && curPage != 1){
            document.getElementById('btnprev').disabled = false;
            document.getElementById('btnnext').disabled = true;
        }
    }else{
        document.getElementById('btnprev').disabled = true;
        document.getElementById('btnnext').disabled = true;
    }
    
}

function fnSubmitQuery() {
    
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, detailFuncId);
    debugs("fcjResponseDOM=", getXMLString(fcjResponseDOM));
    if (fcjResponseDOM && getXMLString(fcjResponseDOM) !=="") {
        totalpages= selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("TOTAL_PAGES");
        var msgStatus = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
        var messageNode = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/RESPONSE");
        debugs("msgStatus=", msgStatus);
        if (msgStatus != 'SUCCESS') {
            //fnClearDBSummary(); //REDWOOD_CHANGES
            gAction = "";
            mask();
            showAlerts(fnBuildAlertXML("EXTSUM-001","E"),"E");
            alertAction = "UNMASK";
            return false;
        } else {
            submitQuery = true;
            var objQueryRecords = selectNodes(fcjResponseDOM, "FCJMSG/MSG/REC");
            if (objQueryRecords.length == 0)  {
              //  fnClearDBSummary();  //REDWOOD_CHANGES
                gAction = "";
                //mask();
                //showAlerts(fnBuildAlertXML("EXTSUM-002","I"),"I");
                //alertAction = "UNMASK";
                return false;
            } else {
                //fnShowDashboardData();
                //fnShowSummaryData();
                setTableData();
            }
            gAction = "";
        }
    } else {
        //mask();
        //showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_EMPTY_RESPONSE")), "C");
        //alertAction = "UNMASK";
        gAction = "";
        return false;
    }
	//Fix for 21574060
//REDWOOD_CHANGES
//    var TRElem = document.getElementById("Innertable_" +  functionId).getElementsByTagName("TR");
//    for (var i=0;i<TRElem.length;i++) {
//        TRElem[i].removeAttribute("style");
//    }		
//REDWOOD_CHANGES
    return true;
}


function fnShowSummaryData() {
    g_DetPkArray = new Array();
    var RecnodeList = selectNodes(fcjResponseDOM, "//REC");
    //fnClearResult();
    
    for (var i = 0; i < RecnodeList.length; i++) {
        g_DetPkArray[i] = RecnodeList[i].getAttribute("RECID"); //array build for 
        var l_fv = getNodeText(RecnodeList[i].childNodes[0]);
        var fvArray = l_fv.split("~");
        for (var j = 0; j < fvArray.length - 1; j++) {
            //var tablename = "InnerDashtable" + functionId;
            var rowElem = document.getElementById("Innertable_" + functionId).tBodies[0].rows[i];
            var cellElem = rowElem.cells[j];
            if(cellElem.name != undefined)
                var cellElemName = cellElem.name;
            else
                var cellElemName = cellElem.getAttribute("name");
            if (typeof(OptionValue[cellElemName]) != "undefined") {
                var options = OptionValue[cellElemName].split("~");
                fvArray[j] = getFieldDesc(options, fvArray[j]);
            } else if(typeof(fieldType[cellElemName]) != "undefined") {
                if(fieldType[cellElemName] == "AMOUNT"){
                    var ccy = "";
                    var ccyFld = relatedField[cellElemName];
                    for (var indx=0;indx<j;indx++) {
                        if (rowElem.cells[indx].name == ccyFld) {
                            ccy = fvArray[indx-1];
                            break;
                        }
                    }
                    if (ccy == "")
                        ccy = mainWin.Lcy;   
                    fvArray[j]=fvArray[j].replace(decimalSymbol, gDecimalSymbol);	
                    var formatAmount = new getFmtdAmt(fvArray[j], ccy);
                    if (formatAmount) 
                        fvArray[j] = formatAmount.getInputAmount();                
                } else {
                    var re = new RegExp("[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]");
                    if (re.test(fvArray[j]) && fvArray[j].indexOf(':') == -1) {
                        var FormatDate = new getFrmtDate(fvArray[j], gDateFormatDSO);
                        if (FormatDate.isValidDate())
                            fvArray[j] = FormatDate.getShortDate();
                    } else if (re.test(fvArray[j]) && fvArray[j].indexOf(':') > 0) {
                        var datePart = fvArray[j].substring(0, 10);
                        var timePart = fvArray[j].substring(10);
                        var FormatDate = new getFrmtDate(datePart, gDateFormatDSO);
                        if (FormatDate.isValidDate())
                            fvArray[j] = FormatDate.getShortDate() + timePart;
                    }
                    var l_index = fvArray[j].indexOf("00:00:00");
                    if (l_index > 0) 
                        fvArray[j] = fvArray[j].substring(0, fvArray[j].indexOf("00:00:00") - 1);  
                }
            }
            setInnerText(document.getElementById("Innertable_" + functionId).tBodies[0].rows[i].cells[j].children[0].children[1], fvArray[j]);
        }
    }
}


function setTableData(){
    g_DetPkArray = new Array();
    var RecnodeList = selectNodes(fcjResponseDOM, "//REC");    
//REDWOOD_CHANGES
    var recId =  RecnodeList[0].getAttribute("TYPE");
    meArrayForAddDelete[ recId]([]);

    setTimeout(function(){
    var recId =  RecnodeList[0].getAttribute("TYPE");
    var fnNodeList = selectNodes(fcjResponseDOM, "//FN");
    var fnList = getNodeText(fnNodeList[0].childNodes[0]);
    var fnArray = fnList.split("~");
    
    var ojTableObj = document.getElementById("Innertable_"+functionId);
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
                var tdObjElem = tdObj[tdObjCnt].children[0].children[1];
				
                if(!tdObjElem){
					if (tdObj[tdObjCnt].children[0].children[0]!=undefined){ //REDWOOD_Dashboard Changes
						tdObjElem = tdObj[tdObjCnt].children[0].children[0];  //REDWOOD_Dashboard Changes
					}else{
                     tdObjElem = tdObj[tdObjCnt].children[0];
					}
                }
                if (tdObjElem.getAttribute("name") == fnArray[j]) {
                    if (tdObjElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER") {
                         singleRecObj[fnArray[j] ]= fvArray[j]==''?null: Number(fvArray[j]);
                    }else if(tdObjElem.tagName.toUpperCase() == "OJ-SWITCH") {
                        if(tdObjElem.getAttribute("ON") == fvArray[j]) {
                            tdObjElem.setAttribute("value", "true");
                        } else {
                            tdObjElem.setAttribute("value", "false");
                        }
                        singleRecObj[fnArray[j]]= fvArray[j];
                    }
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
						
						if (tdObjElem.tagName.toUpperCase()=="INPUT" && tdObjElem.getAttribute("type") =="HIDDEN"){  //REDWOOD_Dashboard Changes
                            tdObjElem.setAttribute("value", fvArray[j]);  //REDWOOD_Dashboard Changes
                         }
                        singleRecObj[fnArray[j] ]= fvArray[j];
                    }
                    break;
                }
            }
            
        }
        meArrayForAddDelete[recId].push(singleRecObj);
    }
    //document.getElementById('Innertable_'+functionId).refresh();
    
},0);	 
    

}
//REDWOOD_CHANGES
function setTableData_old(){
    g_DetPkArray = new Array();
    var RecnodeList = selectNodes(fcjResponseDOM, "//REC");    
    fnClearDBSummary();    
    for (var i = 0; i < RecnodeList.length; i++) {
        g_DetPkArray[i] = RecnodeList[i].getAttribute("RECID"); //array build 
        var l_fv = getNodeText(RecnodeList[i].childNodes[0]);
        var fvArray = l_fv.split("~");
        for (var j = 0; j < fvArray.length - 1; j++) {
            var value = fvArray[j];
            var currObject = document.getElementById("Innertable_" + functionId).tBodies[0].rows[i].cells[j].children[0].children[1];
            // FCUBS_145_33691527 Starts (In case of input type="checkbox" currObject is undefined as it is a child of label not the parent div)
			if(currObject == undefined) {
			   currObject = document.getElementById("Innertable_" + functionId).tBodies[0].rows[i].cells[j].children[0].children[0].children[0];
			}
			//FCUBS_145_33691527 Ends
			var tagName = currObject.tagName;
            if (currObject.getAttribute("type") != null) 
                var type = currObject.getAttribute("type");
            else 
                var type = currObject.type;
        if (tagName == 'INPUT'){
           switch (type.toUpperCase()) {
            case 'TEXT': {
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                        break;
                    }
                }
                //Added to format the number in number field
                if (getOuterHTML(currObject).indexOf("fnValidateRange") != -1 && getOuterHTML(currObject).indexOf("acceptInputAmount") == -1) {
                    if (value != "") {
                        currObject.value = Number(value);
                        break;
                    }
                }
                currObject.value = value;
                
                var fieldValue = currObject.value;
                var fieldId = currObject.id;
                var fieldName = currObject.name;
//12.1 Dashboard changes --start check
 var fieldMaxLength = currObject.maxLength;
                var fleldDBC = currObject.getAttribute("DBC");
				/*12_0_3_RETRO_12_2_23653394 Starts*/
                var fieldSize;
                if (currObject.size) {
                    fieldSize = currObject.size;
                } else {
                    fieldSize = currObject.getAttribute("size")
                }
                /*12_0_3_RETRO_12_2_23653394 Ends*/
                var parentDIV = currObject.parentNode;
                var oldInnerHTML = getOuterHTML(parentDIV.getElementsByTagName("INPUT")[0]);
                oldInnerHTML = setValueOfTextBox(oldInnerHTML, parentDIV.getElementsByTagName("INPUT")[0]);
                var dNumber = getOuterHTML(currObject).indexOf("validateInputNumber");
                var dAmount = getOuterHTML(currObject).indexOf("validateInputAmount");
                if (fieldSize != "") {
//12.1 Dashboard changes --start check
//if (fieldValue.length > fieldMaxLength && fieldValue.length > 3 && dNumber < 0 && dAmount < 0) {
                    if (fieldValue.length > fieldSize && fieldValue.length > 3 && dNumber < 0 && dAmount < 0) {
                        if (currObject.getAttribute("viewMode")) {
                            var textareaNode = document.createElement("TEXTAREA");
                            textareaNode.setAttribute("id", fieldId);
                            textareaNode.setAttribute("DBC", fleldDBC);
                            addEvent(textareaNode, "class", "TXAro");
                            textareaNode.setAttribute("name", fieldName);
                            textareaNode.value = fieldValue;
                            if (fieldValue.indexOf("<") != -1) {
                                var re = new RegExp('<', "g");
                                fieldValue = fieldValue.replace(re, "&lt;");
                            } else if (fieldValue.indexOf(">") != -1) {
                                var re = new RegExp('>', "g");
                                fieldValue = fieldValue.replace(re, "&gt;");
                            }
                            textareaNode.innerHTML = fieldValue;
                            parentDIV.getElementsByTagName("INPUT")[0].name = textareaNode.name;
                            parentDIV.getElementsByTagName("INPUT")[0].value = textareaNode.value;
                            var finalOuterHTML = getOuterHTML_TXADisp(textareaNode);
                            if (finalOuterHTML.indexOf("<TEXTAREA") == -1) {
                                finalOuterHTML = finalOuterHTML.replace("<textarea", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
                                finalOuterHTML = finalOuterHTML.replace("</textarea>", "</TEXTAREA>");
                            } else {
                                finalOuterHTML = finalOuterHTML.replace("<TEXTAREA", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
                            }
                            setOuterHTML_TXADisp(parentDIV.getElementsByTagName("INPUT")[0], finalOuterHTML);
                            parentDIV.getElementsByTagName("TEXTAREA")[0].readOnly = true;
                            adjustRows(parentDIV.getElementsByTagName("TEXTAREA")[0]);
                        }
                    }
                }
                break;
            }
            case 'HIDDEN':{
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                    } else {
                        currObject.value = value;
                        fireHTMLEvent(currObject, "onpropertychange");
                    }
                }
            else { 
                if (getOuterHTML(currObject).indexOf("displayAmount") != -1) {
                currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
                fireHTMLEvent(currObject, "onpropertychange");
                validateResponseAmount(currObject.name, currObject.getAttribute("related_ccy"), getNextSibling(getNextSibling(currObject)));
                break;
            } else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
                currObject.value = value.replace(decimalSymbol, ".");
                fireHTMLEvent(currObject, "onpropertychange");
                break;
              } 
              currObject.value = value;
              fireHTMLEvent(currObject, "onpropertychange");
              break;
            }     
        
          }
          case 'CHECKBOX':{
              currObject.checked = false;
              break;
          }
          default:
            currObject.value = value;
        } 
        }
        else if(tagName == "TEXTAREA"){
          currObject.value = value;   

        }
        else{
            setInnerText(currObject,value);
        }
            //currObject.innerText = value;
    }
   }         
}

function fnLaunchMainSumScr() {
    if(!document.getElementById('btnmore').disabled)
        mainWin.dispHref1Dashboard(mainSummaryScr, seqNo);
}

function fnShowDashboardCol(obj, funcId, event) {
    var screenArgs = new Array();
    screenArgs["OBJECT"] = obj;
    screenArgs["FUNCTIONID"] = funcId;
    screenArgs["EVENT"] = event;
	//obj.className ='AfootC'; //REDWOOD_CHANGES
    if (!fnEventsHandler('fnPreShowDashboardCol_'+functionId, screenArgs)) 
        return false;

    detailWinParams = new Object();
    detailWinParams.ShowSummary = "TRUE";
    detailWinParams.DetailPkVals = getInnerText(obj);
    //detailWinParams.sumTxnBranch = sumTxnBranch;    
    mainWin.dispHref1Dashboard(funcId, seqNo);    
    
}

function fnShowDashboardRow(obj, event) {
    if(getInnerText(obj)=="")
    return;
    var cellElems = obj.parentNode.parentNode.parentNode.cells;//Fix for 21574060
    var nameNode = "";
    var valueNode = "";
    var cellName = "";
    var cellValue ="";
    for(var i=0;i<cellElems.length;i++) {
        if(cellElems[i].getElementsByTagName("INPUT").length >0){
            cellName = cellElems[i].getElementsByTagName("INPUT")[0].name;
            cellValue = cellElems[i].getElementsByTagName("INPUT")[0].value;
        }else if(cellElems[i].getElementsByTagName("A").length >0){
            cellName = cellElems[i].getElementsByTagName("A")[0].name;
            cellValue = getInnerText(cellElems[i].getElementsByTagName("A")[0]);
        }
        nameNode += cellName + "~";
        valueNode += cellValue + "~";
    }
    if (nameNode != "")
        nameNode = nameNode.substring(0, nameNode.length-1);
    if (valueNode != "") {
        valueNode = valueNode.substring(0, valueNode.length-1);
    }
    var screenArgs = new Array();
    screenArgs["NODENAMES"] = nameNode;
    screenArgs["NODEVALUES"] = valueNode;
    screenArgs["OBJECT"] = obj;
    screenArgs["EVENT"] = event;
   // obj.className ='AfootC';	//REDWOOD_CHANGES
    if (!fnEventsHandler('fnCallDetail_'+functionId, screenArgs))
        return false;
}

function fnQueryDetailScreen(scrArgs) {
    detailWinParams = new Object();
    detailWinParams.ShowSummary = "TRUE";
    detailWinParams.DetailPkVals = scrArgs["PKVALS"];
    var funcId = scrArgs["FUNCTIONID"];
    //detailWinParams.sumTxnBranch = sumTxnBranch;
    if(scrArgs["PKVALS"] != "")
        mainWin.dispHref1Dashboard(funcId, seqNo);    
}

function builStringWorkflow(recdom){
    var strWorkflow = "";
    var funcNodes = selectNodes(recdom, "//TASKLIST/TLREC");
        var  fnid = getNodeText(selectSingleNode(recdom, "//WFName"));
        var tkdisc = getNodeText(selectSingleNode(recdom, "//TKDisc"));
        document.getElementById("heading").innerHTML = "";
        document.getElementById("heading").innerHTML = tkdisc;
        //for(count = 0;count < funcNodes.length;count++){
            var xref = getNodeText(selectSingleNode(recdom, "//XREF")); 
			var brn = getNodeText(selectSingleNode(recdom, "//Brn"));
			var acc = getNodeText(selectSingleNode(recdom, "//Account"));
			var ccy = getNodeText(selectSingleNode(recdom, "//Ccy"));
			var amount = getNodeText(selectSingleNode(recdom, "//Amount"));
			var mkrid = getNodeText(selectSingleNode(recdom, "//MakerID"));    
            var stagename = getNodeText(selectSingleNode(recdom, "//StageName"));
            var txnstatus = getNodeText(selectSingleNode(recdom, "//TxnStatus"));
            var stagestatus = getNodeText(selectSingleNode(recdom, "//StageStatus"));
            var txnseqno = getNodeText(selectSingleNode(recdom, "//TxnSeqNo"));
            var reversal = getNodeText(selectSingleNode(recdom, "//Reversal"));
            var lockedby = getNodeText(selectSingleNode(recdom, "//LockedBy"));
            var assignedto = getNodeText(selectSingleNode(recdom, "//AssignedTo"));
           
            
            //12.1_multi_auth Changes  starts
            var status = "";
            if (txnstatus == "IPR" && stagestatus == "IPR"  && stagename != 50   && stagename != 60   && stagename != 70 )
                status = mainWin.getItemDesc("LBL_PENDING") ;
		    if( txnstatus == "IPR" && stagestatus == "IPR" && stagename == 50)
                 status = mainWin.getItemDesc("LBL_HOLD") ;   
            if( txnstatus == "IPR" && stagestatus == "APP" )
			   status = mainWin.getItemDesc("LBL_APPROVED") ;   
		    if( txnstatus == "IPR" && stagestatus == "IPR" && stagename == 60 )
                status = mainWin.getItemDesc("LBL_APPROVED") ;   
			if( txnstatus == "IPR" && stagestatus == "IPR" && stagename == 70 )
                status = mainWin.getItemDesc("LBL_REJECTED") ;   
            if (txnstatus == "IPR" && stagestatus == "WTS")
                 status = mainWin.getItemDesc("LBL_ASSIGNED") ;  
            if (txnstatus == "IPR" && stagestatus == "WMA")
               status = mainWin.getItemDesc("LBL_UNASSIGNED") ;   
            if (txnstatus == "IPR" && stagestatus == "MTS")
              status = mainWin.getItemDesc("LBL_MULTIAUTHTXN") ;    
            if (txnstatus == "COM" && stagestatus == "COM")
               status = mainWin.getItemDesc("LBL_COMPLETED") ;    
            if (txnstatus == "REV" && stagestatus == "REV")
                status = mainWin.getItemDesc("LBL_REVERSED") ;  
            if (txnstatus == "DIS" && stagestatus == "DIS")
                 status = mainWin.getItemDesc("LBL_DISCARDED") ;  
            //12.1_multi_auth changes ends 
            
            var postingdate = getNodeText(selectSingleNode(recdom, "//PostingDate"));
            var wfstarttime = getNodeText(selectSingleNode(recdom, "//WFStartTime"));
             
            strWorkflow = fnid + "~" +xref + "~" +brn+ "~" +acc+ "~" +ccy+ "~" +amount+ "~" +mkrid+ "~"+ stagename+ "~" +txnstatus+ "~" +stagestatus+ "~"  +  status + "~" + //12.1_multi_Auth .. status added
            lockedby+ "~" +assignedto+ "~" +txnseqno+ "~"+postingdate+ "~" +reversal;
        //}
        return strWorkflow;
}
function setDataWorkflow(){  
    
    document.getElementById("btnrefreshd").disabled=true;
    
    g_DetPkArray = new Array();
    var xmlstr;
    //var RecnodeList = selectNodes(fcjRespWrkflow, "//REC");
    var mypageno=currentpage*5+1;
    var prevpageno=currentpage*5-5;
     var nRows = document.getElementById("Innertable_" + functionId).tBodies[0].rows.length;
    for(var j=0;j<nRows;j++){
        var nCells = document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells.length;
        for(var k=0;k<nCells;k++){
            for(var l= 0;l<document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children.length;l++){
                if(document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l].tagName !='LABEL' && 
                document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l].type.toUpperCase() != 'CHECKBOX'){
                    setInnerText(document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l],"");
                    document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l].value = "";
                }
            }
        }
    }
	if(mainWin.WrkResp[timestamp] !=null){
    //var RecnodeList = selectNodes(mainWin.fcjRespWrkflow, "//TASKLIST/TLREC");
    var RecnodeList = selectNodes(loadXMLDoc(mainWin.WrkResp[timestamp]), "//TASKLIST/TLREC[position()>"+prevpageno+" and position()<"+mypageno+"]");
    var Recnodecount = selectNodes(loadXMLDoc(mainWin.WrkResp[timestamp]), "//TASKLIST/TLREC[position()]");
    
    document.getElementById("btnnext").disabled =false;
    if (currentpage>1)
    document.getElementById("btnprev").disabled =false;
    if(mypageno > Recnodecount.length)
    document.getElementById("btnnext").disabled =true;
    if(currentpage == 1)
    document.getElementById("btnprev").disabled =true;
    
    for (var i = 0; i < RecnodeList.length; i++) {
        g_DetPkArray[i] = getNodeText(selectSingleNode(RecnodeList[i], "WFName"));
        //g_DetPkArray[i] = RecnodeList[i].getAttribute("RECID"); //array build 
        //var l_fv = getNodeText(RecnodeList[i].childNodes[0]);
         newDOM=loadXMLDoc("<TASKLIST>"+getXMLString(RecnodeList[i])+"</TASKLIST>");
        var l_fv = builStringWorkflow(newDOM);
        var fvArray = l_fv.split("~");
        for (var j = 0; j < fvArray.length; j++) {
            var value = fvArray[j];
            var currObject = document.getElementById("Innertable_" + functionId).tBodies[0].rows[i].cells[j].children[0].children[1];
            var tagName = currObject.tagName;
            if (currObject.getAttribute("type") != null) 
                var type = currObject.getAttribute("type");
            else 
                var type = currObject.type;
        if (tagName == 'INPUT'){
           switch (type.toUpperCase()) {
            case 'TEXT': {
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                        break;
                    }
                }
                //Added to format the number in number field
                if (getOuterHTML(currObject).indexOf("fnValidateRange") != -1 && getOuterHTML(currObject).indexOf("acceptInputAmount") == -1) {
                    if (value != "") {
                        currObject.value = Number(value);
                        break;
                    }
                }
                currObject.value = value;
                break;
            }
            case 'HIDDEN':{
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                    } else {
                        currObject.value = value;
                        fireHTMLEvent(currObject, "onpropertychange");
                    }
                }
            else { 
                if (getOuterHTML(currObject).indexOf("displayAmount") != -1) {
                currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
                fireHTMLEvent(currObject, "onpropertychange");
                if(!currObject.value =='--')//BUG 19457357 changes 
                validateResponseAmount(currObject.name, currObject.getAttribute("related_ccy"), getNextSibling(getNextSibling(currObject)));
                break;
            } else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
                currObject.value = value.replace(decimalSymbol, ".");
                fireHTMLEvent(currObject, "onpropertychange");
                break;
              } 
              currObject.value = value;
              fireHTMLEvent(currObject, "onpropertychange");
              break;
            }     
        
          }
          default:
            currObject.value = value;
        } 
        }
        else
           setInnerText(currObject,value);
           //currObject.innerText = value;

    }
   } 
   }
}

function alert(message) {
    parent.mask();
    parent.showAlerts(fnBuildAlertXML('', 'I', message), 'I');
    parent.alertAction = "UNMASK";
}

function doKeyActionDashhboard(e){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var event = window.event || e;
    disableCommonKeys(event);
    if(event.ctrlKey == true){
        if(event.shiftKey == true && (event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 54)){
            var i = event.keyCode;
            if(mainWin.document.getElementsByTagName("iframe")[i-49]){
                mainWin.document.getElementsByTagName("iframe")[i-49].contentWindow.document.getElementById("btnrefreshd").focus();
                return true;
            }
        }
    }else if(event.altKey == true){
        if((event.keyCode == 70)||(event.keyCode == 102)){
          mainWin.document.getElementById("fastpath").focus();
        }
    }
}

function fnClearDBSummary(){
    var nRows = document.getElementById("Innertable_" + functionId).tBodies[0].rows.length;
    for(var j=0;j<nRows;j++){
        var nCells = document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells.length;
        for(var k=0;k<nCells;k++){
            for(var l= 0;l<document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children.length;l++){
                if(document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l].tagName !='LABEL' && 
                document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l].type.toUpperCase() != 'CHECKBOX'){
                    setInnerText(document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l],"");
                    document.getElementById("Innertable_" + functionId).tBodies[0].rows[j].cells[k].children[0].children[l].value = "";
                }
            }
        }
    }    
}
//12.1 Dashboard changes --start check
 function fnExitDboard()
          {
	debugs("overridden exit....");	
	var winObj = mainWin.document.getElementById(seqNo);
       
            mainWin.fnExit(winObj);

//12.1 Dashboard changes --end
           }
           
function fnSyncDasboardTableWidth(){
    var headerTable = document.getElementById("tableHeaderContainer").children[0];
    var dataTable = document.getElementById("tableContainer").children[0];
    headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
    headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
    for(i=0;i<headerTable.tBodies[0].rows[0].cells.length;i++){
        headerTable.tBodies[0].rows[0].cells[i].children[0].style.width = "auto";
        dataTable.tBodies[0].rows[0].cells[i].children[0].style.width = "auto";
        var w = Math.max(headerTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth,dataTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth);
        headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
        dataTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
    }
}

function fnSyncDasboardScroll(scrollDiv){
     var divElem = getPreviousSibling(scrollDiv).children[0];
     divElem.scrollLeft = scrollDiv.scrollLeft;
}

//FCUBS_143_CBZ_31772671 Starts
var cc = 0;
function fnShowDashboardRowClick(obj, event) {    
    cc++;
    if (cc == 1) {
        ct = setTimeout(function(){ cc = 0;fnShowDashboardRow(obj, event);}, 500);
    } else if (cc == 2) {
        clearTimeout(ct);
        cc = 0;
    }
}
//FCUBS_143_CBZ_31772671 ends
