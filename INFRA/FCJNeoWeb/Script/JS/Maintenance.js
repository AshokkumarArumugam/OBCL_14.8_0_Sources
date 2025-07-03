/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : Maintenance.js
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

Copyright ? 2004-2015  by Oracle Financial Services Software Limited.. 

**
**	Modified By          : Arunkumar R
** 	Modified on          : 20-Apr-2023
** 	Modified Reason      : Code changes for Script error occured from summary screens in Redwood
** 	Search String        : bug#35262971
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 28-Apr-2023
**  Modified Reason      : Changes done to populate arrProvider properly for select fields
**  Search String        : REDWOOD_35313329
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 04-May-2023
**  Modified Reason      : Changes done to aviod script error for standalone summary screen
**  Search String        : REDWOOD_35357532
**
**  Modified By          : Manoj S
**  Modified On          : 01-Jun-2023
**  Modified Reason      : Changes done to handle Enable/disable of Subscreen buttons.
**  Search String        : Redwood_35372207
						   Redwood_35337126
**
**  Modified By          : Selvam Manickam
**  Modified On          : 12-Jun-2023
**  Modified Reason      : While loading screen all call forms are disbaled
**  Search String        : Redwood_35372207_1				
**
**  Modified By          : Manoj S
**  Modified On          : 23-Jun-2023
**  Modified Reason      : While perparing array provider field Name is replaced when DBC is null 
**  Search String        : REDWOOD_35512089	  
**
**  Modified By          : Manoj S
**  Modified On          : 19-Jul-2023
**  Modified Reason      : Set Focus on the screen after Loading.
**  Search String        : Redwood_35337126 
-------------------------------------------------------------------------------------------------------------*/

//var dlgArg = dialogArguments;
var servletURL = "FCClientHandler";

var isExitTriggered = false;

//Code change enables working with and without AuditBlock by Sankarganesh 19/05/06.
var gIsAuditExist = true;
var gFromSummary = true; //Once a new F7 operation is started on the Detail screen, setting this to false.[Detaching this from summary

//Saidul Added For removing alerts:
//Performance Changes Starts
var inTime="";
//Performance Changes Ends
var lblBranchStage = mainWin.getItemDesc("LBL_BRANCH_STAGE");
var lblModifyFailed = mainWin.getItemDesc("LBL_MODIFY_FAIL");
var lblProcessingFailed = mainWin.getItemDesc("LBL_PROCESSING_FAIL");
var scriptError = mainWin.getItemDesc("LBL_SCRIPT_ERROR"); //20932 to avoid Script error

var txnBranchUC         = new Array();
var g_txnBranch         = mainWin.CurrentBranch;
if (!mainWin.txnBranch[mainWin.CurrentBranch])
    mainWin.txnBranch[mainWin.CurrentBranch] = new setTxnBrnInfo();
var multiBrnScrOpened   = false;

var ShowSummary = "FALSE";

var responseDOM_Modify = null;	  
//REDWOOD_CHANGES
gscrPos = 'template';
var tempArrayDataProvider;
var pagingDataProviderView;
var selectControl={};
var auditControl={};
var selectArrayProvider={};
var multipleEntryFieldList=[];
var meArrayForAddDelete = {};
var showTable;
var recordsPerPageDataProvider;
var recordsPerPage;
var ojconverter_number; 
//REDWOOD_CHANGES
function resetIndex()
{
    try
    {
        for (var dataSrcIndex = 0; dataSrcIndex < dataSrcLocationArray.length; dataSrcIndex++)
        {
            dbIndexArray[dataSrcLocationArray[dataSrcIndex]] = 1;
        }
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnBeforeUnload()
{
    try
    {
        //debug(dlgArg.mainWin, "In fnBeforeUnload", "A");
        var retVal = false;
        if(gAction=='VIEWMNTLOG'){
            dlgArg.mainWin.frames["Global"].isViewAuthOpen = false;
        }
        if (gAction != "" && gAction!='VIEWMNTLOG')
        {
            appendErrorCode('ST-COM012', "");
            var message = buildMessage(gErrCodes).split("~");
            event.returnValue = message[0];
        }
        if (dlgArg.ShowSummary && dlgArg.ShowSummary == "TRUE")
        {
            if (!dlgArg.sourceWin.closed)
            {
                if (dlgArg.sourceWin.lastRequestTS == dlgArg.lastRequestTS)
                {
                    dlgArg.sourceWin.refresh();
                }
            }
        }
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnUnload()
{
    try
    {

        if (gAction != "")
        {
            fnDirectClose();
            debugs("Closing the window", "");
        }

        if (!isExitTriggered)
        {
            dlgArg.mainWin.frames["FrameToolbar"].showToolbar("", "", "");
            dlgArg.mainWin.fnExit(window);
        }
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnFocus() {
    try {
        mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);
        //Added for function numeric
        if (userFuncId != '' && userFuncId != 'null') {
            mainWin.document.getElementById("fastpath").value = userFuncId;
        } else {
            mainWin.document.getElementById("fastpath").value = functionId;
        } 
        /*Fix for 18180616 Starts*/
        //Fix for bug: 18556654 starts
        /*if(document.getElementById("masker")!= null && document.getElementById("masker").offsetHeight != 0){    
          showToolbar("", "", "");
          return false;
        } */
        /*Fix for 18180616 Ends*/
       // if (gAction == "VIEWMNTLOG" || gAction == "ENTERQUERY" || unmaskTitle) 
       //Commented for 12.0.2 as toolbar ia not shown after calform launch
       //Fix for bug: 18556654 ends
      if (gAction == "VIEWMNTLOG" || gAction == "ENTERQUERY" )
            showToolbar("", "", "");
        else 
            showToolbar(functionId, "", "");
       
    } catch(e) {
        alert(scriptError);
    }
    try {
        fnPostFocus();
    } catch(e) {}
}

function fnLoadWait()
{}

function fnLoad(xmlFileName, xslFileName, screenName)
{
   //Performance Changes Starts
    var t = getDateObject();
    var sjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes Ends
    try
    {
        fnPreLoad();
    } catch(e)
    {
        debugs("Failed in fnPreLoad", "");
    }
    // dlgArg.mainWin.setActiveWindow(window); TODO
    var funcId = xmlFileName.substring(xmlFileName.lastIndexOf("/") + 1, xmlFileName.lastIndexOf(".xml"));
    debugs("FunctionId~xmlFileName~xslFileName", functionId + "~" + funcId + "~" + xslFileName);

    try
    {
        var html = ShowXML(xmlFileName, screenName, xslFileName);
        if (getBrowser().indexOf("IE") != -1) {//ie11 changes
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
   // var htmlContent = document.getElementById("ResTree").innerHTML;
     try
    {
        //eval('fnPostLoad_Summary()');
        setTimeout(function(){
            try{
                var fnEval = new Function('fnPostLoad_Summary()');
                 fnEval();
            } catch(e) {
                
            }
        },0);
       // var fnEval = new Function('fnPostLoad_Summary()');  
      //  fnEval();	
//REDWOOD_CHANGES
    } catch(e)	 
//REDWOOD_CHANGES
    {
    debugger;
    }
         fnBindScreenElements();
    } catch(e)		
//REDWOOD_CHANGES
    {
        debugs("Failed in ShowXML", "");
    }
    debugs("Inner Html", html);
    document.getElementById("toolbar").style.display = "flex"; //REDWOOD_CHANGES
    onceAuthObj = document.getElementsByName("ONCE_AUTH")[0];
    /* Code for executing the Script inside XSL files - Start */
  
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1) || (getBrowser().indexOf("OPERA") != -1)) {//ie11 changes,Fix for 21355639
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
    fnTabDetails();
    //Code change that enables working with and without auditblock by Sankarganesh 19/05/06
    if (document.getElementById("DIV_BLK_AUDIT") == null || document.getElementById("DIV_BLK_AUDIT") == "null")
    {
        gIsAuditExist = false;
    }				 

    //fnSetScreenSize();//static header change	//REDWOOD_CHANGES
    //fnBuildMultipleEntryArray();	  //REDWOOD_CHANGES
    //REDWOOD_CHANGES_SUMMARY_CHANGE STARTS
  setTimeout(function() {
    if (typeof(screenType) != 'undefined' && screenType != "WB" && xslFileName !='Summary.xsl') //KIRTI for Merging
	{
		disableForm();
	//Redwood_35372207_1 start	
	//Redwood_35372207 starts
		/* var objbutton= document.getElementById("subSystemConveyorBelt").getElementsByTagName("OJ-BUTTON");
		for (var o=0; o<objbutton.length;o++)
		{fnEnableElement(objbutton[o]);} */
	fnEnableSubSysButtons();//use existing function to enable callform
	//Redwood_35372207 ends
	//Redwood_35372207_1 end	
	}
  },0);  //REDWOOD_CHANGES
    if (xslFileName =='Summary.xsl' && parseInt(summaryQryCriteria) == 0) {
        document.getElementById("SavedQry").disabled = true;
        document.getElementById("SavedQry").style.display = "none";
     }
    //REDWOOD_CHANGES_SUMMARY_CHANGE ENDS
    //var xmlDoc = dlgArg.mainWin.loadXML(xmlFileName);
    var xmlDoc = loadXMLFile(xmlFileName);
    //if (screenName == '') //REDWOOD_35357532 -Commented
	if (screenName == '' && selectSingleNode(xmlDoc, "//SCREEN[@MAIN_WIN = 'Y']") != null) //REDWOOD_35357532
    {
        screenName = selectSingleNode(xmlDoc, "//SCREEN[@MAIN_WIN = 'Y']").getAttribute("NAME");
    }

    //changed by amit starts (KIRTI for Merging. change current selected tab page)
    if (typeof(screenType) != 'undefined' && screenType == "WB")
    {
        var pages = selectNodes(xmlDoc, "//SCREEN/TAB/PAGE");
        if (pages && pages[0])
        {
            strCurrentTabID = pages[0].getAttribute("NAME");
        }
    }

    if (gscrPos == 'template')
    {
        if (strCurrentTabID != 'All' && strCurrentTabID != "")
        {
            debugs("calling expandcontent", "");
            if (document.getElementById(strCurrentTabID)) // 31/07/08 To validate if the tab exists.
            expandcontent("TBLPage" + strCurrentTabID, document.getElementById(strCurrentTabID));
        }
    }
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
	//jc2 changes
	if (typeof (screenType) != "undefined" && screenType == "WB"){
	if( typeof(mainWin.branchAvlbltyStatus) == "undefined" || mainWin.branchAvlbltyStatus == null || mainWin.branchAvlbltyStatus=="" )//jc2 changes
	  mainWin.branchAvlbltyStatus  = 'Y';
	}
	  //jc2 changes end
	//changes_for_24x7
	if (( mainWin.branchAvlbltyStatus != 'Y' || mainWin.BranchEoi != "N") && ((mainWin.eodFunctions.indexOf(functionId) > 0) || l_offlineAllowed == 'Y'))//jc2 24*7 changes
         document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML  = document.getElementById("wndtitle").getElementsByClassName("WNDtitletxt")[0].innerHTML + ": " + eodDesc;
		 //changes_for_24x7
    //12012012
    //mainWin.showToolbar(functionId, "", "");
    showToolbar(functionId, "", "");
    // fnEnableElement(document.forms[0].BTN_EXIT);
   // fnEnableElement(document.getElementById("BTN_EXIT_IMG"));	//REDWOOD_CHANGES
    if (parentSeqNo != "") {
        var parentWin = "";
        for(var i = 0; i < mainWin.arrChildWindows.length; i++) {
            if (mainWin.arrChildWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
                break;
            }
        }
        if (parentWin.detailWinParams && parentWin.detailWinParams.ShowSummary && parentWin.detailWinParams.ShowSummary == "TRUE") {
            debugs("Loading from summary", "");
                try {
                    posttime = parentWin.detailWinParams.posttime;
                    afterposttime = parentWin.detailWinParams.afterposttime;
                    //inDate=setActionTime(); //Performance Changes
                    ShowSummary = "TRUE";
                    fnExecuteQuery(null, parentWin);
                    parentWin.detailWinParams.posttime = "";
                    parentWin.detailWinParams.afterposttime = "";
                    inLoadTime = parentWin.detailWinParams.inDate;
                    parentWin.detailWinParams.inDate = "";
                } catch(e) {
                    debugs("Failed in fnExecuteQuery", "");
                }
            gAction = "";
            //12012012
            //mainWin.showToolbar(functionId, '', '');
            showToolbar(functionId, '', '');
            //Ashok Added This
            gFromSummary = true;
        }
    }
    debugs("Branch EOI status", mainWin.BranchEoi);
    
    // FCIS 9.1 code change for offline allowed start 
    var l_offlineAllowed = mainWin.gOfflineAllowed;
    if (mainWin.applicationName == "FCIS") {
        xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
        var functionIdNode = selectSingleNode(xmlDOM, "//*[@FNID = '"+ functionId + "']");
        if(functionIdNode)
            l_offlineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
    }
    // FCIS 9.1 code change for offline allowed end

    if ((mainWin.BranchEoi != 'N') && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed == 'N')
    {
        //alert("Branch is not in Transaction Input Stage"); //SFR#2136
        alert(lblBranchStage);
    }

    //code added for viewing changes while Authorize-   Muthu 
    if (mainWin.Authdom && mainWin.applicationName == 'FCJ'){
        debugs("Inside View Change for FCJ", "");
        dbDataDOM = mainWin.Authdom;
        mainWin.Authdom = null;
        resetIndex();       
        try{
            setTimeout(function() {showTabData_Viewchg(); },0);; //REDWOOD_CHANGES
        } catch(e){
            debugs("Failed in showTabData_Viewchg", "");
        }      
        viewModeAction = true;
        disableAllElements("OJ-INPUT-TEXT"); //REDWOOD_CHANGES
        viewModeAction =false;
        //fnEnableElement(document.getElementById('BTN_EXIT'));
       // fnEnableElement(document.getElementById('BTN_EXIT_IMG'));	//REDWOOD_CHANGES
        gAction = "VIEWMNTLOG";
    }
    //Sabir FGL Changes 12-Aug-08
    else if (mainWin.Authdom && mainWin.applicationName == 'FGL')
    {
        debugs("inside View Change for FGL", "");

        dbDataDOM = mainWin.Authdom;
        mainWin.Authdom = null;

        debugs("Resetting indeX", "");
        resetIndex();

        try
        {
            showTabData_Viewchg();
        } catch(e)
        {
            debugs("Failed in showTabData_Viewchg", "");
        }      
        //Added to convert text to textarea for view changes window
        viewModeAction = true;
        disableForm();
        viewModeAction =false;
        //fnEnableElement(document.getElementById('BTN_EXIT'));
        //fnEnableElement(document.getElementById('BTN_EXIT_IMG'));	//REDWOOD_CHANGES
        gAction = "VIEWMNTLOG";
    }
    // viewing changes  ended
	//fix for 16442616 starts
    /*try
    {
        fnPostLoad();
    } catch(e)
    {
        debugs("Failed in fnPostLoad", "");
    }*/
    //document.forms[0].BTN_EXIT.focus();
    if (dashboardSeqNo != "" && dashboardSeqNo!="null") {
        var dashboardWin = parent.document.getElementById(dashboardSeqNo).children[0].contentWindow;
        if(dashboardWin.detailWinParams) {
            mask();
            //gAction ="ENTERQUERY";
            fnEnterQuery();
            fnSetPkvals(dashboardWin.detailWinParams.DetailPkVals);
            gAction = 'EXECUTEQUERY';
            fnExecuteQuery();
        }
    }
     setTimeout(function() {//Sudipta  //REDWOOD_CHANGES
    fnCalcHgt();
			if(document.getElementById("BTN_EXIT_IMG")){ //Redwood_35337126 starts
			document.getElementById("BTN_EXIT_IMG").focus();
		}//Redwood_35337126 ends
     },0);//REDWOOD_CHANGES
	//Performance Changes
   /* if (mainWin.mBean_required == "Y") {
      var dbtime=0;
      var databaseSessionID = "";
      var loginSeqNo = mainWin.SignonSerial;
      var servertime=clientHandlerExit-clientHandlerEntry;
      var actionSeqno = actionseqNo;
      t = getDateObject();
      time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
      setActionTime(sjsTime,functionId,'LOAD');//mbean changes
      var jstime           = parseFloat(parseFloat(time)-parseFloat(sjsTime)); 
      
      jstime=Math.round(jstime*100)/100;  
      totaltime = parseFloat(parseFloat(t.getTime())-parseFloat(inLoadTime));
      startDate = new Date(parseFloat(inLoadTime));
      startTime = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+startDate.getDate()+" "+startDate.getHours()+':'+startDate.getMinutes()+':'+startDate.getSeconds();
      endTime = t.getFullYear()+'-'+t.getMonth()+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
      if (ShowSummary == "TRUE") {
          var executeQueryTime = mainWin.loadTimeArray[parentSeqNo];
          jstime = parseFloat(parseFloat(jstime) + parseFloat(executeQueryTime.split("~")[0]));
          dbtime = Math.round(parseFloat(parseFloat(dbtime) + parseFloat(executeQueryTime.split("~")[1])) * 100) / 100;
          servertime = Math.round(parseFloat(parseFloat(servertime) + parseFloat(executeQueryTime.split("~")[2])) * 100) / 100;
          databaseSessionID = executeQueryTime.split("~")[5];
          loginSeqNo = executeQueryTime.split("~")[6];
          actionSeqno = executeQueryTime.split("~")[7];
          mainWin.loadTimeArray[seqNo] = 0;
    }
      //fnPostActionLog(jstime,dbtime,servertime,startTime, endTime, totaltime,"","","",actionSeqno,databaseSessionID,loginSeqNo,seqNo,"LOAD"); 
     // fnPopulateTimes(loginSeqNo,seqNo,actionSeqno,jstime,dbtime,servertime,startTime,endTime,totaltime);
      
    } */
    //Performance Changes
    setActionTime(inTime,functionId,'LOAD');//Non Extensible Mbean Changes
    //document.getElementById("BTN_EXIT_IMG").focus();   //REDWOOD_CHANGES
     /*if(mainWin.DebugWindowFlg == "Y") {
       if(ShowSummary == 'TRUE'){
            mainWin.serverDebugStmt = webDbg + "\n\n" + mainWin.serverDebugStmt;
        }else{
            mainWin.serverDebugStmt = webDbg + "\n\n"+ appDbg+"\n\n"+dbDbg;
        }

     }debug revert*/
    mainWin.fnSetDatalist(functionId);//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist
	try
    {
        fnPostLoad();
    } catch(e)
    {
        debugs("Failed in fnPostLoad", "");
    }
	//fix for 16442616 ends
}

function fnNew()
{
t = getDateObject();
inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
if(navigator.appName=="Opera"){
        if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y" && multiBrnScrOpened == false){
        fnOpenTxnBrnScreen();
        processingAction = "New";
        if (!fnPreNew())  {
        debugs("Failed in fnPreNew", "");
        return;
    }
        }
    }else{
    if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y" && multiBrnScrOpened == false){
        fnOpenTxnBrnScreen();
        return;
    }
    processingAction = "New";
    if (!fnPreNew())
    {
        debugs("Failed in fnPreNew", "");
        return;
    }
    }
    try
    {
        createDOM(dbStrRootTableName);
    } catch(e)
    {
        debugs("Failed in Creating DOM ", "");
    }

    debugs("Resetting and enabling the form for new action", "");
    resetElements();

    debugs("Clearing MultipleEntryBlocks", "");
    //fnClearMultipleEntryBlocks();	//REDWOOD_CHANGES
    enableForm();
    attachmentData = new Array();
    fileNameArray = new Array();
    if (gIsAuditExist)
    {
        fn_maintenance_stamp('', 'N');

        if (document.getElementsByName("AUTH_STAT")[0])
        {
/*
            fnDisableElement(document.forms[0].AUTH_STAT);
            fnDisableElement(document.forms[0].RECORD_STAT);
            fnDisableElement(document.forms[0].ONCE_AUTH);
*/
            fnDisableElement(document.getElementsByName("AUTH_STAT")[0]);
            fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
            fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);

        } else
        {
            fnDisableElement(document.getElementsByName("AUTH_STATUS")[0]);
        }
    }
    if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y"){
        if(typeof(txnBranchFld)!="undefined" && txnBranchFld != ""){
            document.getElementById(txnBranchFld).value = g_txnBranch;
        }
    }
    try
    {
        fnPostNew();
    } catch(e)
    {
        debugs("Failed in fnPostNew", "");
    }
    //Code Added for MIS PICKUP -Muthu
    if (document.getElementById('MICPRMNT')) {
        try {
            fnPickupMIS();
        } catch(e) {
            debugs("Failed in fnPickupMIS", "");
        }
    }
    fnSetExitButton(true);
    showToolbar(functionId, '', '');
    setTimeout(function(){//Redwood_35337126
	fnSetFocusOnMasterPKField();
	},0);//Redwood_35337126
    setActionTime(inTime,functionId,'NEW');//mbean changes
}

function fnUnlock()
{
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    inDate = setActionTime();//Performance Changes
    processingAction = "Unlock";
    if (!fnPreUnlock())
    {
        debugs("Failed in fnPreUnlock", "");
        return;
    }

    var value = fnGetPKInfo();

    //Change made to remove the query only datasource from the dbDataDom - Senthil (29/03/05)
    /* for(var index = 0; index < dataSrcLocationArray.length; index++) {
    	var value = isQuery[dataSrcLocationArray[index]];
	if(value == "1") {
            dbDataDOM.selectNodes("//"+dataSrcLocationArray[index]).removeAll();
	}
    }*/
    if (!fnValidateOperation())
    {

        debugs("Failed in fnValidateOperation", "");
        return;
    }

    /*  This code will obtain a lock */
    gAction = "UNLOCK";

    try
    {
        fcjRequestDOM = buildUBSXml();
        debugs("fcjRequestDOM", getXMLString(fcjRequestDOM));
    } catch(e)
    {
        debugs("failed in buildUBSXml", "");
    }

    //selectNodes(fcjRequestDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ").removeAll();
    var removeNode = selectNodes(fcjRequestDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
    for(var i=0; i < removeNode.length; i++){
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }
    var tempParent = selectSingleNode(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT ='']").getAttribute("TYPE");
    //selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + tempParent + "']").removeAll();
    var removeNode = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + tempParent + "']");
    for(var i=0; i < removeNode.length; i++){
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }

    try{
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    } catch(e){
        debugs("failed in fnPost", "");
    }

    if (fcjResponseDOM){
        //var msgStatus = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
        var l_MsgStatNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
        var msgStatus = getNodeText(l_MsgStatNode);
        debugs("MsgStatus" + msgStatus, "");
        if (msgStatus == 'SUCCESS'){
            enableForm();

            if(document.getElementsByName("ONCE_AUTH")[0]){
                if(document.getElementsByName("ONCE_AUTH")[0].value == 'Y'){ 
//REDWOOD_CHANGES
                   // disableElements("INPUT");
                    disableElements("OJ-INPUT-TEXT");
                    disableElements("OJ-INPUT-NUMBER");
                    disableElements("OJ-SELECT-SINGLE");
                    disableElements("OJ-SWITCH");
                    disableElements("OJ-INPUT-PASSWORD");
                    disableElements("OJ-RADIOSET");
                    disableElements("OJ-TEXT-AREA");
                    disableElements("OJ-INPUT-DATE");
                   // disableElements("SELECT");
                   // disableElements("TEXTAREA"); 
//REDWOOD_CHANGES
                    fnDisablePKFields();
                    fnEnableAmendFields();
                }else{
                    fnDisablePKFields();
                }
            }else{ 
//REDWOOD_CHANGES
           // disableElements("INPUT");
           // disableElements("SELECT");
           // disableElements("TEXTAREA");
            disableElements("OJ-INPUT-TEXT");
            disableElements("OJ-INPUT-NUMBER");
            disableElements("OJ-SELECT-SINGLE");
            disableElements("OJ-SWITCH");
            disableElements("OJ-INPUT-PASSWORD");
            disableElements("OJ-RADIOSET");
            disableElements("OJ-TEXT-AREA");
            disableElements("OJ-INPUT-DATE");  
//REDWOOD_CHANGES
            fnDisablePKFields();
            fnEnableAmendFields();
            }

            if (gscrPos == 'Template'){
                fnEnableElement(document.getElementById("BTN_OK_IMG"));
            }

            if (gIsAuditExist){
                fn_maintenance_stamp('', 'M');
                appendData(document.getElementById("DIV_BLK_AUDIT"));
                /*
                document.forms[0].CHECKER_DT_STAMPI.value = '';
                document.forms[0].CHECKER_ID.value = '';
                */
                document.getElementsByName("CHECKER_DT_STAMP").value = null;//REDWOOD_CHANGES
                document.getElementsByName("CHECKER_ID")[0].value = '';
                //fnDisAudit();
            }

            fnSetExitButton(true);
            gAction = "MODIFY";

            var l_FncId = mainWin.document.getElementById("fastpath").value;
            showToolbar(l_FncId, '', '');
            //fnpostAction('UNLOCK');

        } else{
            gAction = "";
            var l_FncId = mainWin.document.getElementById("fastpath").value;
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            var messageText=getNodeText(messageNode);
            var pattern=/\s/;
            //var whiteSpaceIndex=messageText.search(pattern);
            showToolbar(l_FncId, '', '');
            //10.2sp1 Security changes.
            /*if (selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP")) {
                //alert(fcjResponseDOM.selectSingleNode("//FCJMSG/MSG/RESPONSE").text);
                alert(messageText.substring(whiteSpaceIndex+1));
            }*/
            displayResponse(messageNode,msgStatus);
            //fnpostAction('UNLOCK');
            return;
        }

    } else{
        //alert("Modify Operation Failed");
        alert(lblModifyFailed);
        debugs("Modify Operation failed", "");

        gAction = "";
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar(l_FncId, '', '');
        //fnpostAction('UNLOCK');
        return;
    }
    //fnEnableChkAll(); //REDWOOD_CHANGES
    try{
        fnPostUnlock();
    } catch(e){
        debugs("Failed in fnPostUnlock", "");
    }
    setActionTime(inTime,functionId,'UNLOCK');//mbean changes
}
// TODO .. THIS HAS TO BE CONFIRMED AND PROCEEDED.
function fnDisAudit()
{
    try
    {
        //debug(dlgArg.mainWin, "In fnDisAudit", "A");
        var l_Form = document.forms[0];
        var l_Maker_Id = "MAKER_ID";
        if (l_Form["MAKERID"]) l_Maker_Id = "MAKERID"

        var l_Maker_Dt_St = "MAKER_DT_STAMP";
        if (l_Form["MAKERSTAMP"]) l_Maker_Dt_St = "MAKERSTAMP"

        var l_Auth_St = "AUTH_STAT";
        if (l_Form["AUTHSTAT"]) l_Auth_St = "AUTHSTAT"

        var l_Chek_Id = "CHECKER_ID";
        if (l_Form["CHECKERID"]) l_Chek_Id = "CHECKERID";

        var l_Chek_Dt_St = "CHECKER_DT_STAMP";
        if (l_Form["CHECKERSTAMP"]) l_Chek_Dt_St = "CHECKERSTAMP";

        fnDisableElement(document.getElementsByName(l_Maker_Id)[0]);
        //fnDisableElement(document.getElementsByName(l_Maker_Dt_St + "I")[0]); //REDWOOD_CHANGES
        fnDisableElement(document.getElementsByName("MOD_NO")[0]);
        fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);

        fnDisableElement(document.getElementsByName(l_Auth_St)[0]);
        fnDisableElement(document.getElementsByName(l_Chek_Id)[0]);
        //fnDisableElement(document.getElementsByName(l_Chek_Dt_St + "I")[0]); //REDWOOD_CHANGES
    } catch(e)
    {
        alert(scriptError);
    }
}

function releaseLock()
{
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    inDate = setActionTime();//Performance Changes
    gAction = "RELEASELOCK";

    try
    {
        //fcjRequestDOM = buildRelaseLockXML();
         fcjRequestDOM = buildUBSXml();
        debugs("fcjRequestDOM", fcjRequestDOM);
    } catch(e)
    {
        debugs("failed in buildRelaseLockXML", "");
    }

    //selectNodes(fcjRequestDOM, "//FCJMSG/MSG/FLD/FN[@PARENT != ''] ").removeAll();
    //var removeNode = selectNodes(fcjRequestDOM, "//FCJMSG/MSG/FLD/FN[@PARENT != ''] ");
     var removeNode = selectNodes(fcjRequestDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD/FN[@PARENT != ''] ");
    for(var i=0; i < removeNode.length; i++){
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }
    var tempParent = selectSingleNode(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@PARENT ='']").getAttribute("TYPE");
    //var tempParent = selectSingleNode(fcjRequestDOM, "//FCJMSG/MSG/FLD/FN[@PARENT ='']").getAttribute("TYPE");
    //selectNodes(fcjRequestDOM, "//FCJMSG/MSG/REC/REC[@TYPE !='" + tempParent + "']").removeAll();
    //var removeNode = selectNodes(fcjRequestDOM, "//FCJMSG/MSG/REC/REC[@TYPE !='" + tempParent + "']");
    var removeNode = selectNodes(fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_BODY/REC/REC[@TYPE !='" + tempParent + "']");
    for(var i=0; i < removeNode.length; i++){
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }
    var oldResponseDOM = fcjResponseDOM;

    try
    {
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    } catch(e)
    {
        debugs("failed in fnPost", "");
    }
    if (fcjResponseDOM)
    {
        var l_MsgStatNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
        var msgStatus = getNodeText(l_MsgStatNode);
        //var msgStatus = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
        //var messageNode = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/RESPONSE");
       
        debugs("Msgstatus ", msgStatus);
        //fnpostAction('RELEASELOCK');
        
        if (msgStatus == 'SUCCESS')
        {
            debugs("Lock Released", "");
            gAction = "";
            processingAction = "Save";
            fcjResponseDOM = oldResponseDOM;
            return true;
        } else
        {
            debugs("Please check ...Lock not released!!", "");
            //debug(dlgArg.mainWin, "Please check ...Lock not released!!");    				
            //var returnVal = displayResponse_auth(messageNode);
            //displayResponse_auth(messageNode);
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            displayResponse(messageNode,msgStatus);
            return false;
        }
        setActionTime(inTime,functionId,'RELEASELOCK');//mbean changes
    }
}

/**
  * Function called when Authorize action is performed
  */
// TODO NEED TO CHECK HOW TO HANDLE AUTHORIZE SCREENS.
function fnAuthorize(e){
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    processingAction = "Authorize";
    forMaintAuth = true;
    try {
        var e = window.event || e;
        gAction = "AUTHQUERY";
        if (!fnPreAuthorize()) {
            debugs("Failed in fnPreAuthorize", "");
            return;
        }
        if (!fnValidateOperation()) {
            fnSetExitButton(false);
            debugs("Failed in fnValidateOperation", "");
            return;
        }
        try {
            authorize();
        } catch(e) {
            debugs("Failed in authorize", "");
            return;
        }
       setActionTime(inTime,functionId,'AUTHORIZE');//mbean changes 
   } catch(e) {
        alert(scriptError);
    }
}

/**   *  Function called when Copy button is clicked   */
function fnCopy()
{
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    processingAction = "Copy";
    try
    {
        if (!fnPreCopy())
        {
            debugs("Failed in fnPreCopy", "");
            return;
        }

        try
        {
            fnClearPKFields();
        } catch(e)
        {
            debugs("Failed in fnClearPKFields", "");
            return;
        }
        debugs("Clearing PK fileds", "");
        //fnClearAuditFields();
        /*try
        {
            fnChangeLabelToText("TEXTAREA");
        } catch(e)
        {
            debugs("Failed in fnChangeLabelToText", "");
            return;
        }*/
        enableForm();
        gAction = "NEW";

        if (gIsAuditExist)
        {
            fn_maintenance_stamp('', 'N');
            appendData(document.getElementById("DIV_BLK_AUDIT"));
            if (document.getElementsByName("AUTH_STAT")[0])
            {
                fnDisableElement(document.getElementsByName("AUTH_STAT")[0]);
                fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
                fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);

            } else
            {
                fnDisableElement(document.getElementsByName("AUTH_STAT")[0]);
            }
        }

        fnSetExitButton(true);
        try
        {
            fnPostCopy();
        } catch(e)
        {
            debugs("Failed in fnPreCopy", "");
        }
        var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar(l_FncId, '', '');
		    setTimeout(function(){//Redwood_35337126
			fnSetFocusOnMasterPKField();
		},0);//Redwood_35337126
        setActionTime(inTime,functionId,'COPY');//mbean changes 

    } catch(e)
    {
        alert(scriptError);
    }
}

/**  * Function called when Close Action performed   */
function fnClose()
{   
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    inDate = setActionTime();
    processingAction = "Close";
    alertAction = "CLOSEACTION";
    try
    {
        if (!fnPreClose())
        {

            debugs("Failed in fnPreClose", "");
            return;
        }
        if (!fnValidateOperation())
        {

            debugs("Failed in fnValidateOperation", "");
            return;
        }

        //appendErrorCode('FC-MAINT13', null);
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CLOSE_DESC")), "C");
        setActionTime(inTime,functionId,'CLOSE');//mbean changes 
    } catch(e)
    {
        alert(scriptError);
    }
}

/**  * Function called when Reopen Action is performed   */
function fnReopen()
{
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    inDate = setActionTime();
    processingAction = "Reopen";
    alertAction = "REOPENACTION";
    try
    {
        if (!fnPreReOpen())
        {

            debugs("Failed in fnPreReOpen", "");
            return;
        }

        if (!fnValidateOperation())
        {

            debugs("Failed in fnValidateOperation", "");
            return;
        }

        //appendErrorCode('FC-MAINT14', null);
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_REOPEN_DESC")), "C");
        setActionTime(inTime,functionId,'REOPEN');//mbean changes 
    } catch(e)
    {
        alert(scriptError);
    }
}

/**  * Function called when Delete Action performed  */
function fnDelete()
{
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    processingAction = "Delete";
    alertAction = "DELETEACTION";
    try
    {
        if (!fnPreDelete())
        {

            debugs("Failed in fnPreDelete", "");
            return;
        }

        if (!fnValidateOperation())
        {

            debugs("Failed in fnValidateOperation", "");
            return;
        }

        //appendErrorCode('FC-MAINT17', null);
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_DELETE_DESC")), "C");
        setActionTime(inTime,functionId,'DELETE');//mbean changes 
    } catch(e)
    {
        alert(scriptError);
    }
}

/** Called for allowing to enter Query Criteria **/
function fnEnterQuery()
{
    try
    {
        if (!fnPreEnterQuery())
        {

            gAction = "";
            debugs("Failed in fnPreEnterQuery", "");
            return;
        }
        resetDOM();
        resetElements();
        fnClearMultipleEntryBlocks();
        fnEnablePKOnlyFields();
        fnDisableSubSysButtons();
        fnSetExitButton(true);
        //  changeTabPageToFirstTab();

        //var xmlDoc = dlgArg.mainWin.loadXML(xmlFileName);
        var xmlDoc = loadXMLFile(xmlFileName);
        /*var screenName = xmlDoc.selectSingleNode("//SCREEN[@MAIN_WIN = 'Y']").getAttribute("NAME");
    
    var tabNodes = xmlDoc.selectNodes("//SCREEN[@NAME = '"+screenName+"']/TAB/PAGE[@ID != 'All']");
    if(tabNodes.length > 0){
        expandcontent("TBLPage"+strCurrentTabID,document.getElementById("TBLPage"+strCurrentTabID+"Head"));
    }
    document.getElementById("TBLPage"+strCurrentTabID+"Head").style.backgroundColor = cascadedstyle(document.getElementById("TBLPage"+strCurrentTabID+"Head"), "backgroundColor", "background-color");*/
        if (gIsAuditExist)
        {
            if (document.getElementsByName("AUTH_STAT")[0])
            {
                fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
                fnEnableElement(document.getElementsByName("MAKER_ID")[0]); // PHASE2 INFRA - STDFCJGN
            } else
            {
                fnDisableElement(document.getElementsByName("AUTH_STATUS")[0]);
            }
        }

        dbAuthFlag = false;
        dbRecFlag = false;
        //toolbarActions(); //disable all buttons except save
        //mainWin.document.getElementById("Save").disabled = true;
        //dlgArg.mainWin.frames["FrameMenu"].document.getElementById("actions8").disabled = true;
        try
        {
            fnPostEnterQuery();
        } catch(e)
        {
            gAction = "";
            debugs("Failed in  fnPostEnterQuery", "");
            return;
        }
        if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y" && mainWin.multiBranchOperation =="Y"){
            if(typeof(txnBranchFld)!="undefined" && txnBranchFld != ""){
                if(document.getElementById(txnBranchFld).className != "hidden"){
                    for(var j=0;j<pkFields.length;j++){
                        if(pkFields[j] == txnBranchFld){
                            fnEnableElement(document.getElementById(txnBranchFld));  
                            document.getElementById(txnBranchFld).value = g_txnBranch;
                            break;
                        }
                    }
                }                                        
            } 
        }
		    setTimeout(function(){//Redwood_35337126
			fnSetFocusOnMasterPKField();
		},0);//Redwood_35337126
        gFromSummary = false; //ashok added This.
        //var l_FncId = mainWin.document.getElementById("fastpath").value;
        showToolbar('', '', '');
    } catch(e)
    {
        alert(scriptError);
    }
}

/** * Called when Execute Query Action performed  */
function fnExecuteQuery(reqDOM, parentWin)
{
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
	inDate = setActionTime(); //Performance Changes
    try
    {
        window.focus();
        
        
        if(typeof(parentWin) != 'undefined') {
            if (parentWin.detailWinParams.ShowSummary && parentWin.detailWinParams.ShowSummary == "TRUE") 
            gFromSummary = true;
        } else {
            gFromSummary = false;
            //inDate=setActionTime(); //Performance Changes
        }
        if (!fnPreExecuteQuery())
        {

            gAction = "";
            debugs("Failed in fnPreExecuteQuery", "");
            return;
        }
        if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y"){
            if(typeof(txnBranchFld)!="undefined" && txnBranchFld != ""){
                g_txnBranch =document.getElementById(txnBranchFld).value;
            }
        }

        if (gFromSummary != true)
        {
            fcjRequestDOM = buildUBSXml();
        } else 
            resetDOM();

        intCurrentQueryResultIndex = 0;
        intCurrentQueryRecordCount = 0;
        if (gFromSummary != true)
        {
            try
            {
                fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            } catch(e)
            {
                debugs("Failed in fnpost", "");
            }
        }

        if (gFromSummary == true)
        {
            fcjResponseDOM = parentWin.detailWinParams.response;
        }

        if (fcjResponseDOM)
        {

            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("MsgStatus", msgStatus);
            if (msgStatus == 'FAILURE')
            {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");

            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }

            /* Ashok commented. As the Show Toolbar Gets the AuthStatus and recordStatus from the screen element. calling at this point always return false.
        gAction ="";
        dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
        */
            if (msgStatus != 'SUCCESS')
            {
                debugs("Failed in execute Query ", "");
                resetElements();
               // disableForm(); //REDWOOD_CHANGES
                fnEnableSubSysButtons();
                debugs("calling displayResponse", "");
                //var returnVal = displayResponse(messageNode, msgStatus);
                displayResponse(messageNode, msgStatus);
                fnSetExitButton(false);
                gAction = "";
                try{
                showToolbar(functionId, '', '');
                }catch(e){}
                //Performance Changes        
                //fnpostAction('EXECUTEQUERY');
                return;

            } else
            {
                var objQueryRecords = selectNodes(fcjResponseDOM, "//FCUBS_BODY/REC");

                if (objQueryRecords.length == 0)
                {
                    debugs("Success with out any record", "");
                    /*
                    appendErrorCode('ST-COM036', null);
                    var msg = buildMessage(gErrCodes);
                    alertMessage(msg);
                    */
                    mask();
                    showAlerts(fnBuildAlertXML('ST-COM036','E'),'E');
                    alertAction = "UNMASK";
                    disableForm();
                } else
                {

                    intCurrentQueryRecordCount = objQueryRecords.length;
                    goToRec(1);
                    viewModeAction = true;
                    disableForm();
                    viewModeAction = false;
                    fnEnableSubSysButtons();
                    fnPostExecuteQuery();
                    if(typeof(multiBrnAccessReq)!= "undefined" && multiBrnAccessReq=="Y" && mainWin.multiBranchOperation =="Y"){
                        if(typeof(txnBranchFld)!="undefined" && txnBranchFld != ""){
                            if(document.getElementById(txnBranchFld).value != ""){
                                g_txnBranch = document.getElementById(txnBranchFld).value;
                                fnUpdateTxnBrnVariables(g_txnBranch);
                            }else{
                                g_txnBranch = mainWin.CurrentBranch; //Changes for 11.4 ITR1 SFR# 13081633
                            }
                            var scrTitle = document.title + " - " +mainWin.getItemDesc("LBL_TXN_BRANCH") +" ::: "+  g_txnBranch;
                            setInnerText(document.getElementsByTagName("H1")[0],scrTitle);        
                        } 
                    }
                }

                fnSetExitButton(false);
                gAction = "";
                try{
                showToolbar(functionId, '', '');
                }catch(e){}

            }

            if (gIsAuditExist)
            {

                fnDisableElement(document.getElementsByName("MAKER_ID")[0]);
                fnDisableElement(document.getElementsByName("CHECKER_ID")[0]);
                fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
                fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
                if (document.getElementsByName("AUTH_STAT")[0])
                {
                    fnDisableElement(document.getElementsByName("AUTH_STAT")[0]);
                } else
                {
                    fnDisableElement(document.getElementsByName("AUTH_STATUS")[0]);
                }
            }
        }
        //ShowSummary = "FALSE";
        /*if(gFromSummary == false && mainWin.mBean_required == "Y") {
            fnpostAction('EXECUTEQUERY');
        }*/
        window.focus();
       // fnEnableBlockCheckBox(); //REDWOOD_CHANGES
        fnDisableMultipleAddDel();
        setActionTime(inTime,functionId,'EXECUTEQUERY');//mbean changes 
        
    } catch(e)
    {
        alert(scriptError);
    }
}

// PHASE2 INFRA - STDFCJGN
function show_remarks()
{
    try
    {
        var dlgLeft = 100;
        var dlgTop = 50;
        var dlgArg = new Object();
        dlgArg.curWin = window;
        w = window.showModalDialog("Remarks.jsp", dlgArg, "center:yes; dialogHeight:180px; dialogWidth:400px; help:no; resizable:no; scroll:no; status:no;");
    } catch(e)
    {
        alert(scriptError);
    }
}

//------------------------------------------------------------------------------
// SAVE and CANCEL functions
//------------------------------------------------------------------------------

/*
 * Method to save - ( after NEW or EDIT)
 */
function fnSave(e)
{
    t = getDateObject();//mbean changes
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();//mbean changes
    inDate = setActionTime();
    /*Changes for lov issue on SAVE*/
	if(gIsValid == false) return;
    if (isLovOpen) {
    	return false;
    }
    //inDate = setActionTime();//Performance Changes
    processingAction = "Save";
    try
    {
      //  if (!mainWin.isSessionActive()) return; //session expiry change  
        window.focus();
        debugs("Validating the fields before save", "");       
        if (gIsAuditExist)
        {
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
		//Fix for 16999792 start
        var dbDataStr = getXMLString(dbDataDOM);
        if((dbDataStr.indexOf('^') != -1) || (dbDataStr.indexOf('~') != -1))
          {
              isResponseProcessed = true; //21301992
              mask();
              showAlerts(fnBuildAlertXML('FC-MAINT03', 'I'), 'I');
              alertAction = "UNMASK";
              return false;
          }
        //Fix for 16999792 end
        if (typeof(l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") 
            appendData(document.getElementById("TBLPage" + l_HeaderTabId));
        if (!fnPreSave())
        {
            debugs("Failed in fnPreSave", "");
            return;
        }
        try
        {
            fcjRequestDOM = buildUBSXml();
        } catch(e)
        {
            debugs("Failed in buildUBSXml", "");
        }

        // image Upload DOM
        if (attachmentData.length > 0)
        {
            debugs("Adding Attachments in Request --START", "");

            var xml1 = getXMLString(fcjRequestDOM).substring(0, getXMLString(fcjRequestDOM).indexOf("<MISC>") - 6);
            var xml2 = getXMLString(fcjRequestDOM).substring(getXMLString(fcjRequestDOM).indexOf("<MISC>") - 6, getXMLString(fcjRequestDOM).length);
            var attachMentXML = getAttachmentxml();
            /*
            try
            {
                var l_dom = new ActiveXObject("Msxml2.DOMDocument.6.0");
            } catch(e)
            {
                var l_dom = new ActiveXObject("Msxml2.DOMDocument.4.0");
            }
            l_dom.async = false;
            l_dom.loadXML(xml1 + attachMentXML + xml2);
            */
            var l_dom = loadXMLDoc(xml1 + attachMentXML + xml2);
            fcjRequestDOM = l_dom;
            debugs("Adding Attachments in Request --COMPLETE", "");
        }
        //show_remarks();  //Ashok to be enabled later;
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        var temp_gAction = gAction;
        if (fcjResponseDOM)
        {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode = "";
            var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
            if (msgStatus == 'FAILURE')
            {
                l_xPath += "FCUBS_ERROR_RESP";
            } else if (msgStatus == "SUCCESS" || msgStatus == "WARNING")
            {
                l_xPath += "FCUBS_WARNING_RESP";
            }

            messageNode = selectSingleNode(fcjResponseDOM, l_xPath);
            if (msgStatus == 'SUCCESS')
            {
                debugs("Msgstatus", msgStatus);
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);

                var l_LockRelStatus = true;
                if (gAction == 'MODIFY')
                {
                    l_LockRelStatus = releaseLock();
                }
                viewModeAction = true;
                disableForm();
                viewModeAction = false;
                fnSetExitButton(false);
                gAction = "";
                //fnpostAction('SAVE');
                
            } else if (msgStatus == 'WARNING')
            {
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
            }

            //var returnVal = displayResponse(messageNode, msgStatus);
            displayResponse(messageNode, msgStatus);
            showToolbar(functionId, '', '');
            if (msgStatus == 'FAILURE')
            {
            //fnpostAction('SAVE');
            return;
            }
            setActionTime(inTime,functionId,'SAVE');//mbean changes 
        } else
        { // Null response            
            //alert("Processing Has Failed");
            //fnpostAction('SAVE');
            alert(lblProcessingFailed);
            return;
        }
        try
        {
            fnPostSave();
        } catch(e)
        {
            debugs("Failed in fnPostSave", "");
        }
        fnPasteControlFieldValues(); // 16/09/08 Added for isControl Data source
    } catch(e)
    {
        alert(scriptError);
    }
} //end of fnSave.

/** * Exit Operation */
function fnExit(e) {
    try {
        if (typeof(callFormLaunched) != "undefined" && callFormLaunched == "yes") {
            fnExitSubScreen(e);
            return;
        }
        // code added for View changes while authroziation
        if (gAction == "VIEWMNTLOG") {
        	//SFR 308	
            mainWin.isViewAuthOpen = false;
            gAction = "";
            //self.close();
            //return;
        }
        if (gAction != "") {
            mask();
            showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
            alertAction = "EXITACTION";
        } else {
            dbDataDOM = null;
            resetElements();
            isExitTriggered = true;
            fnFocus();
            //12012012
            //mainWin.showToolbar("", "", "");
            /* HAS BEEN ADDED NEWLY */
            var winObj = mainWin.document.getElementById(seqNo);
            mainWin.fnExit(winObj);
        }
    } catch(e) {
        alert(scriptError);
    }
    e.cancelBubble = true;
}

function fnExitAlertWin(evnt) {
    try {
        if(typeof(customAlertAction) != "undefined") {
            if(customAlertAction != "") {
                //eval("fnExitAlertWin_"+customAlertAction+"(evnt)");
                var fnEval = new Function("evnt","fnExitAlertWin_"+customAlertAction+"(evnt)");  
                fnEval(evnt); //Fix for 18423705
                customAlertAction = "";
                return;
            }
        }
    } catch(e) {
    }
    unmask();
    if (alertAction == "OVERRIDE") {
        return "CANCEL";
    } else if (alertAction == "CLOSEACTION") {
        gAction = "";
        debugs("Failed in confirmAction", "");
        return;
    } else if (alertAction == "REOPENACTION") {
        gAction = "";
        debugs("Failed in confirmAction", "");
        return;
    } else if (alertAction == "DELETEACTION") {
        gAction = "";
        debugs("Failed in confirmAction", "");
        return;
    }
}

function fnCloseAlertWin(evnt) {
    gIsValid = true;
     //Performance Changes
    var t = getDateObject();
    inTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds(); 
    inDate = setActionTime();
    //Performance Changes Ends
    try {
        if(typeof(customAlertAction) != "undefined") {
            if(customAlertAction != "") {
                //eval("fnCloseAlertWin_"+customAlertAction+"(evnt)");
                var fnEval = new Function("evnt","fnCloseAlertWin_"+customAlertAction+"(evnt)");  
                fnEval(evnt); //Fix for 18423705 
                customAlertAction = "";
                return;
            }
        }
    } catch(e) {
    }
    
    if (alertAction == "EXITACTION") {
    	var l_RelLockStatus = true;
        if (gAction == "MODIFY") {
            l_RelLockStatus = releaseLock();
        }
        if (l_RelLockStatus) {
            if (gAction == "ENTERQUERY") {
                    if (dbDataDOM != null) showData(dbStrRootTableName, 1);
            } else {
                dbDataDOM = null;
            }
            gAction = "";
            resetElements();
            disableForm();
            fnEnableSubSysButtons();
            fnSetExitButton(false);
            unmask();//Added 
            multiBrnScrOpened = false;
            showToolbar(functionId, "", "");
            return;
    } else {
        return;
        }
    } else if (alertAction == "OVERRIDE") {
        var ubsXMLDOM = loadXMLDoc("<FCUBS_REQ_ENV/>");
        var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
        //ubsXMLDOM.documentElement.appendChild(getCloneDocElement(fcjResponseDOM.documentElement.childNodes[0]));
        //ubsXMLDOM.documentElement.appendChild(getCloneDocElement(fcjResponseDOM.documentElement.childNodes[0]));
        
        ubsXMLDOM.documentElement.appendChild(selectSingleNode(fcjResponseDOM, "//FCUBS_HEADER"));//Fixes for 17016517 
        ubsXMLDOM.documentElement.appendChild(selectSingleNode(fcjResponseDOM, "//FCUBS_BODY"));//Fixes for 17016517 
        var moduleNode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID")//Fix for 17637992 start
        if(moduleNode == null) {
            var moduleNod = ubsXMLDOM.createElement("MODULEID");
            var module = functionId.substring(0, 2);
            //Prakash@FCIS8.0 - ITR1 - SCF# - 24/09/2007 - Start
            if (mainWin.applicationName == 'FCIS') {
                module = mainWin.CurrentModule
            }
            setNodeText(moduleNod, module);
            selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER").appendChild(moduleNod);
        }//FIx for 17637992 end 
       
        if (typeof(servletURL) == 'undefined') {
            servletURL = 'FCClientHandler';
        }
		/* Fix for 16400255 */
        if(gAction ==""){
          gAction = getNodeText(selectSingleNode(ubsXMLDOM,"//FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"));
        }
        /* Fix for 16400255 */
        fcjResponseDOM = fnPost(ubsXMLDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")); // SANDEEP-CHGMSG
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }

            if (msgStatus == 'SUCCESS') {
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                var l_LockRelStatus = true;
                if (gAction == 'MODIFY') {
                    responseDOM_Modify = loadXMLDoc(getXMLString(fcjResponseDOM));
                    l_LockRelStatus = releaseLock();
                    fcjResponseDOM = loadXMLDoc(getXMLString(responseDOM_Modify));
                    responseDOM_Modify = null;
                }
                disableForm();
                fnSetExitButton(false);
                gAction = "";
                //var returnVal = displayResponse(messageNode);
                displayResponse(messageNode);
    }
            //  dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
            if (msgStatus != 'SUCCESS') {
                //var returnVal = displayResponse(messageNode);
                displayResponse(messageNode);
                return;
            }
        } else {
            alert(mainWin.getItemDesc("LBL_EMPTY_RESPONSE"));
            fnPostProcessResponse("FAILURE");
            return;
        }
        fnPostProcessResponse(msgStatus);
    } else if (alertAction == "ERROR") {
        unmask();
        fnPostProcessResponse("FAILURE");
        return false;
    } else if (alertAction == "SUCCESS") {
        unmask();
        fnPostProcessResponse("SUCCESS");
        return true;
    } else if (alertAction == "UNMASK") {
        unmask();
    } else if (alertAction == "CLOSEACTION") {
        //Code change enables working with and without AuditBlock by Sankarganesh 19/05/06.
        if (gIsAuditExist) {
            fn_maintenance_stamp('', 'C');
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        try {
            fcjRequestDOM = buildUBSXml();
        } catch(e) {
            debugs("Failed in buildUBSXml", "");
        }
        //show_remarks();  
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch(e) {
            debugs("Failed in fnPost", "");
        }
        fnProcessResponse();
        try {
            fnpostAction('CLOSE');//Performance Changes
            fnPostClose();
        } catch(e) {
            debugs("Failed in fnPostClose", "");
        }
    } else if (alertAction == "REOPENACTION") {
        if (gIsAuditExist) {
            fn_maintenance_stamp('', 'O');
            appendData(document.getElementById("DIV_BLK_AUDIT"));
            document.getElementsByName("CHECKER_DT_STAMP").value = null; //REDWOOD_CHANGES
            document.getElementsByName("CHECKER_ID").value = '';
        }
        try {
            fcjRequestDOM = buildUBSXml();
        } catch(e) {
            debugs("failed in buildUBSXml", "");
            gAction = "";
            return;
        }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch(e) {
            debugs("failed in buildUBSXml", "");
            gAction = "";
            return;
        }
        try {
            fnProcessResponse();
        } catch(e) {
            debugs("failed in fnProcessResponse", "");
            gAction = "";
            return;
        }
        try {
             //fnpostAction('REOPEN');//Performance Changes
            fnPostReOpen();
        } catch(e) {
            debugs("failed in fnPostReOpen", "");
            gAction = "";
            return;
        }
    } else if (alertAction == "DELETEACTION") {
        try {
            fcjRequestDOM = buildUBSXml();
        } catch(e) {
            debugs("failed in buildUBSXml", "");
            return;
    }
        try {
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        } catch(e) {
            debugs("failed in fnPost", "");
        }
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            debugs("msgStatus=" + msgStatus, "");
            if (msgStatus == 'FAILURE') {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
            debugs("calling fnGetDataXMLFromFCJXML", "");
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            debugs("calling setDataXML", "");
            setDataXML(getXMLString(pureXMLDOM));
            //displayReponse is changed to displayResponse by Sankarganesh on 22/03/05
            //var returnVal = displayResponse(messageNode);
            displayResponse(messageNode, msgStatus);
            fnSetExitButton(false);
             //fnpostAction('DELETE');//Performance Changes
        }
    }else if(alertAction == "TXNBRANERROR") {
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
            
    } else if (alertAction == "PREINTRADAYBATCH") {
        fnPostAsync(fcjRequestDOM, servletURL, functionId);
        mask();
        showAlerts(fnBuildAlertXML("ST-EOD001","I"),"I");
        alertAction = "UNMASK";
        //alert(retrieveMessage('ST-EOD001', ''));
        document.getElementById("BTN_OK_IMG").disabled = true;

    } else if (alertAction == "DELETECRITERIA") {
        unmask();
        fnQueryCriteria("QUERYCRITERIA",evnt);
        return false;
    } else if (alertAction == "UPDATECRITERIA") {
        unmask();
        var flag = "true";
        fnSaveSumCriteria(evnt,flag);
        return false;
    } else {
        unmask();
    }
}


function getVersions()
{
    return buildUBSXml();
}

function postQuery(objReqDOM)
{
    try
    {
        var qryResponse = fnPost(objReqDOM, servletURL, functionId);
        return qryResponse;
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnProcessAuth(selectedMod)
{
    try
    {
       
        inDate = setActionTime();//Performance Changes
        gAction = "AUTH";
        var recId = fnGetPKValues();
        var oldMod = getNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"));

        setNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"), selectedMod);
        fcjRequestDOM = buildUBSXml();

        setNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"), oldMod);

        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        debugs("fcjResponseDOM", getXMLString(fcjResponseDOM));
        //debug(dlgArg.mainWin, fcjResponseDOM.xml, "P");

        fnProcessResponse();
        fnSetExitButton(false);
        //fnpostAction('AUTH');//Performance Changes
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnSetExitButton(enableBtn) {
    if (!document.getElementById("BTN_EXIT_IMG")) 
        return;
    try {
        fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
        //35262971 starts
		setTimeout(function(){
		document.getElementById("BTN_EXIT_IMG").focus();
		},0);
		//35262971 ends
        if (enableBtn) {
            if (gAction == "ENTERQUERY") {
                if (gscrPos) {
                    if (gscrPos == "template") {
                       // document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_CANCEL");//REDWOOD_CHANGES
                        document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_CANCEL"); //REDWOOD_CHANGES
                    } else {
                        document.getElementById("BTN_EXIT_IMG").src = cache2.src;
                    }
                }
            } else if (gscrPos) {
                if (gscrPos == "template") {
                    //document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_CANCEL"); //REDWOOD_CHANGES
                    document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_CANCEL"); //REDWOOD_CHANGES
                }
            } else {
                document.getElementById("BTN_EXIT_IMG").src = cache2.src;
            }
        } else if (gscrPos) {
            if (gscrPos == "template") {
               // document.getElementById("BTN_EXIT_IMG").value = mainWin.getItemDesc("LBL_EXIT");	//REDWOOD_CHANGES
                document.getElementById("BTN_EXIT_IMG").label = mainWin.getItemDesc("LBL_EXIT"); //REDWOOD_CHANGES
            }
        } else {
            document.getElementById("BTN_EXIT_IMG").src = cache1.src;
        }
    } catch(e) {
        alert(scriptError);
    }
}

function fnValidateMandatory()
{
    try
    {
        var validate = true; 
//REDWOOD_CHANGES
       // var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
        
        var eleArray = new Array("OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME");
       // var tempVal = "";
        
         for (var i in eleArray) {
         var elements = document.getElementById("ResTree").getElementsByTagName(eleArray[i]);
//REDWOOD_CHANGES
        var tempVal = "";
        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++)
        {

            if (elements[elemIndex] && elements[elemIndex].tagName.toUpperCase() == "OJ-RADIOSET") continue;//REDWOOD_CHANGES

            if (elements[elemIndex].getAttribute("REQUIRED") == "true")	//REDWOOD_CHANGES
            {
                tempVal = getFieldData(elements[elemIndex]);
                if (tempVal == null || isNull(tempVal)) {		//REDWOOD_CHANGES
                {
                    var label = fnGetLabel(elements[elemIndex]);
                    appendErrorCode('ST-COM013', label);
                    validate = false;
                }
            }
          }	 
//REDWOOD_CHANGES
        }
        
//        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++)
//        {
//
//            if (elements[elemIndex] && elements[elemIndex].type.toUpperCase() == "RADIO") continue;
//
//            if (elements[elemIndex].getAttribute("REQUIRED") == -1)
//            {
//                tempVal = getFieldData(elements[elemIndex]);
//                if (isNull(tempVal))
//                {
//                    var label = fnGetLabel(elements[elemIndex]);
//                    appendErrorCode('ST-COM013', label);
//                    validate = false;
//                }
//            }
//        }
	 //REDWOOD_CHANGES
       /* var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");

        for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++)
        {
            if (elements1[elemIndex1].getAttribute("REQUIRED") == -1)
            {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (isNull(tempVal))
                {
                    var label = fnGetLabel(elements1[elemIndex1]);
                    appendErrorCode('ST-COM013', label);
                    validate = false;
                }
            }
        }

        var elements = document.getElementById("ResTree").getElementsByTagName("SELECT");
        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++)
        {
            if (elements[elemIndex].getAttribute("REQUIRED") == -1)
            {
                tempVal = getFieldData(elements[elemIndex]);
                if (isNull(tempVal))
                {
                    var label = fnGetLabel(elements[elemIndex]);
                    appendErrorCode('ST-COM013', label);
                    validate = false;
                }
            }*/	  
//REDWOOD_CHANGES
        }
        return validate;
    } catch(e)
    {
        alert(scriptError);
    }
}

// Kals On June 9 .. If the field is frm ME , prepend the block lable and the field label
// Chk the Field is From ME block or SE Blk .. For ME blk , DBT = "", later 
// there can some attribute to give a better distinction of ME and SE.
// If the Field is frm ME , then if the blk lable shud also be shwn in Err presentation

function fnGetLabel(obj)
{
    try
    {
        var l_FldSetLbl = "";
        var l_DBT = "";

        if (obj.getAttribute("DBT")) l_DBT = obj.getAttribute("DBT");
        if (l_DBT) l_FldSetLbl = fnGetFldSetLbl(l_DBT);
        var l_temp = obj;
        if (l_temp.getAttribute("DBT") == null || l_temp.getAttribute("DBT") == "")
        {
            var l_parent = l_temp.parentNode;
            while (! (l_parent.tagName == 'TABLE'))
            {
                l_temp = l_parent;
                l_parent = l_temp.parentNode;
            }
            l_DBT = l_parent.getAttribute("DBT");
            l_FldSetLbl = fnGetFldSetLbl(l_DBT);
        }
        if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length > 0)
        {
            return (mainWin.getItemDesc("LBL_MANDATORY") + obj.getAttribute("LABEL_VALUE") + mainWin.getItemDesc("LBL_IN") + l_FldSetLbl);
        }

        if (obj.getAttribute("LABEL_VALUE") && trim(obj.getAttribute("LABEL_VALUE")) != "" && l_FldSetLbl.length == 0)
        {
            if (obj.getAttribute("REQUIRED") == -1) return mainWin.getItemDesc("LBL_MANDATORY") +" "+ obj.getAttribute("LABEL_VALUE");/*Fix for Bug No :16568764*/
            else return obj.getAttribute("LABEL_VALUE");
        }

        return obj.name;
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnGetFldSetLbl(v_DBT)
{
    try
    {
        var l_isMe = false;
        var l_Lbl = "";
        for (var l_Cnt = 0; l_Cnt < multipleEntryIDs.length; l_Cnt++)
        {
            if (multipleEntryIDs[l_Cnt].toUpperCase() == "BLK_" + v_DBT.toUpperCase())
            {
                l_isMe = true;
                break;
            }
        }
        if (l_isMe)
        {
            if (gscrPos != "template")
            {
                var l_FldSet = document.getElementById("LBL_FLDSET_BLK_" + v_DBT);
                if (l_FldSet) return l_FldSet.value;
                else return "";
            } else
            {
                //Changed by Saidul for Template position
                //var FldSetCaption = document.getElementById("BLK_" + v_DBT).caption;
                var FldSetCaption = document.getElementById("BLK_" + v_DBT).getAttribute("caption");
                return FldSetCaption;
            }
        }
        return "";
    } catch(e)
    {
        alert(scriptError);
    }
}

/**
  * The HTML form elements a custom attribute called DTYPE
  * which can have values VARCHAR, CHAR, DATE, NUMERIC.Validate 
  * the fields for the correct datatype. Ignore DATE and AMOUNT as
  * they are entities which will be validated by the Entity model.
  * Append the error code if the validation fail.
  */
function fnValidateDataType()
{
    try
    {
        // Do the basic data type validations for all the form elements INPUT and TEXTAREA
        // in the ResTree Tag. Use the DTYPE attribute of the form elements.
        var validate = true;
        var elements = document.getElementById("ResTree").getElementsByTagName("INPUT");
        var tempVal = "";

        var valReq = true;
        /*
        try
        {
            var dbFCJDomnew = new ActiveXObject("Msxml2.DOMDocument.6.0");
        } catch(e)
        {
            var dbFCJDomnew = new ActiveXObject("Msxml2.DOMDocument.4.0");
        }
        dbFCJDomnew.loadXML(msgxml);
        */
        var dbFCJDomnew = loadXMLDoc(msgxml);
        var isQueryTypes = new Array();
        var xmlNodes = new Array();
        xmlNodes = selectNodes(dbFCJDomnew, "//FCUBS_REQ_ENV/FCUBS_BODY/FLD/FN[@ ISQUERY='1']");

        for (var x = 0; x < xmlNodes.length; x++)
        {
            isQueryTypes[x] = xmlNodes[x].getAttribute("TYPE");
        }

        for (var elemIndex = 0; elemIndex < elements.length; elemIndex++)
        {
            valReq = true;
            //Checking for the Hidden field
            if (elements[elemIndex].type != 'hidden')
            {
                tempVal = getFieldData(elements[elemIndex]);
                if ((elements[elemIndex].getAttribute("REQUIRED") == '0') && (tempVal == ''))
                {
                    continue;
                }
                //This code checks whether the current field is part of a query datasource. If so, validation is skipped.
                for (var j = 0; j < isQueryTypes.length; j++)
                {
                    if (elements[elemIndex].getAttribute("DBT") == isQueryTypes[j])
                    {
                        valReq = false;
                    }
                }
                if (valReq)
                {
                    if (elements[elemIndex].getAttribute("DTYPE") == 'NUMERIC' || elements[elemIndex].getAttribute("DTYPE") == 'NUMBER' || elements[elemIndex].getAttribute("DTYPE") == 'DECIMAL' || elements[elemIndex].getAttribute("DTYPE") == 'SMALLINT' || elements[elemIndex].getAttribute("DTYPE") == 'INTEGER')
                    {
                        tempVal = getFieldData(elements[elemIndex]);
                        if (!isNumeric(tempVal))
                        {

                            var l_Label = fnGetLabel(elements[elemIndex]);
                            appendErrorCode('FC-MAINT02', l_Label);
                            validate = false;
                        }
                    }
                    if (elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR' || elements[elemIndex].getAttribute("DTYPE") == 'VARCHAR2' || elements[elemIndex].getAttribute("DTYPE") == 'CHAR')
                    {
                        tempVal = getFieldData(elements[elemIndex]);
                        if (!isAlphaNumeric(tempVal))
                        {
                            var l_Label = fnGetLabel(elements[elemIndex]);
                            appendErrorCode('FC-MAINT02', l_Label);
                            validate = false;
                        }
                    }
                }
            }
        }

        var elements1 = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
        for (var elemIndex1 = 0; elemIndex1 < elements1.length; elemIndex1++)
        {
            tempVal = getFieldData(elements1[elemIndex1]);
            if ((elements1[elemIndex1].getAttribute("REQUIRED") == '0') && (tempVal == ''))
            {
                continue;
            }
            if (elements1[elemIndex1].getAttribute("DTYPE") == 'NUMERIC' || elements1[elemIndex1].getAttribute("DTYPE") == 'DECIMAL' || elements1[elemIndex1].getAttribute("DTYPE") == 'SMALLINT' || elements1[elemIndex1].getAttribute("DTYPE") == 'INTEGER' || elements1[elemIndex1].getAttribute("DTYPE") == 'NUMBER')
            {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (!isNumeric(tempVal))
                {
                    var l_Label = fnGetLabel(elements1[elemIndex1]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
            if (elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR' || elements1[elemIndex1].getAttribute("DTYPE") == 'VARCHAR2' || elements1[elemIndex1].getAttribute("DTYPE") == 'CHAR')
            {
                tempVal = getFieldData(elements1[elemIndex1]);
                if (!isAlphaNumeric(tempVal))
                {
                    var l_Label = fnGetLabel(elements1[elemIndex1]);
                    appendErrorCode('FC-MAINT02', l_Label);
                    validate = false;
                }
            }
        }
        return validate;
    } catch(e)
    {
        alert(scriptError);
    }
}

/**
* This Function Will Disable all Primary Key Fields.
* Added By C Malaiah on Apr 8 , 2005.
*/
function fnDisablePKFields()
{
    try
    {
        for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++)
        //document.getElementById(pkFields[loopIndex]).disabled = true;
        fnDisableElement(document.getElementById(pkFields[loopIndex]));
    } catch(e)
    {
        alert(scriptError);
    }
}

/**
* This function will the necessary steps when user close the function window 
* directly, from the winow's exit button insert of application close button.
*/
function fnDirectClose()
{
    try
    {
        if (gAction == "MODIFY")
        {
            releaseLock();
        }
        resetElements();
        disableForm();
        gAction = "";
        fnClearMultipleEntryBlocks();
        toolbarReset(); //To reset actions in toolbar..
        if (gIsAuditExist)
        {
            fnDisableElement(document.getElementsByName("AUTH_STAT")[0]);
            fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
            fnDisableElement(document.getElementsByName("ONCE_AUTH")[0]);
        }
        isExitTriggered = true;
        mainWin.fnExit(window);
    } catch(e)
    {
        alert(scriptError);
    }
}

// For auth response will be read here .
// STDFCJGN PHASE 1
function displayResponse_auth(messageNode)
{
    try
    {
        var message = "";
        var returnVal = false;
        var firstNode = selectSingleNode(messageNode, "//MESSAGE");

        if (firstNode)
        {
            var type = firstNode.getAttribute("TYPE");
            var messageNodes = selectNodes(messageNode, "//MESSAGE");
            for (var index = 0; index < messageNodes.length; index++)
            {
                var msg = getNodeText(messageNodes[index]);
                message = message + msg + "~";
            }

            returnVal = ShowErrorDialog(type, message);

        } else
        {
            /*
            appendErrorCode('ST-COM021', null);
            var msg = buildMessage(gErrCodes);
            alertMessage(msg);
            */
            mask();
            showAlerts(fnBuildAlertXML('ST-COM021','E'),'E');
            alertAction = "UNMASK";
            disableForm();
            returnVal = false;
        }
    } catch(e)
    {
        alert(scriptError);
    }
}

// Function to show UDF Call Form, CSCUFVAL.
// Common for all maintenance forms, jun 26, 2007
function fnShowUDFScreen(funcId, screenName) //fix for 17180651 
{
  //  if (!mainWin.isSessionActive()) return;  //Fix for 14798046 //session expiry change  
    processingAction = "ShowUDFScreen";
    try
    {
        old_action = gAction;
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        var screenArgs = new Array();
        screenArgs = getOtherScreenArgs(funcId, screenName); //fix for 17180651
        screenArgs['SCREEN_NAME'] = screenName;
        screenArgs['FUNCTIONID'] = funcId; //fix for 17180651
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        if (gIsAuditExist) 
            appendData(document.getElementById("DIV_BLK_AUDIT"));

        if (gAction == "NEW" || gAction == "MODIFY")
        {

            if (selectNodes(dbDataDOM, "//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0)
            {

                gAction = "UDFPICKUP";
                fcjRequestDOM = buildUBSXml();
                gAction = old_action;

                fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
                if (fcjResponseDOM)
                {
                    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                    if (msgStatus == 'FAILURE')
                    {
                        var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                    } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
                    {
                        var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                    }

                    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                    setDataXML(getXMLString(pureXMLDOM));
                    showData(dbStrRootTableName, 1);
                }
                if (msgStatus == 'FAILURE')
                {
                    //var returnVal = displayResponse(messageNode);
                    displayResponse(messageNode);
                }

            }
            fnShowCallForm(screenArgs);

        } else if (gAction == "EXECUTEQUERY" || gAction == "")
        {
            if(fcjResponseDOM != null){ //fcubs 11.1 SFR 38
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            }
            fnShowCallForm(screenArgs);
            

        }
		/*FCUBS10.5- SFR 273*/
		else if(gAction == "VIEWMNTLOG")
        {
			var pureXMLDOM = dbDataDOM;
			setDataXML(getXMLString(pureXMLDOM));
			fnShowCallForm(screenArgs);
        }

    } catch(e)
    {
        alert(scriptError);
    }

}

function fnReverse()
{
    processingAction = "Reverse";
    try
    {
        gAction = "REVERSE";
        try
        {
            //eval('fnPreReverse()');
            var fnEval = new Function('fnPreReverse()');  
            fnEval();
        } catch(e)
        {}

        if (gIsAuditExist)
        {
            appendData(document.getElementById("DIV_BLK_AUDIT"));
        }
        appendData(document.getElementById("TBLPage" + strCurrentTabID));
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

        if (fcjResponseDOM)
        {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            if (msgStatus == 'FAILURE')
            {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
            {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }

            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
            if (msgStatus == 'SUCCESS')
            {
                disableForm();
                document.getElementById("BTN_EXIT_IMG").src = cache1.src;
                //fnEnableElement(document.forms(0).BTN_EXIT);
                fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
                showToolbar(functionId, '', '');
                gAction = "";
                fnSetExitButton(false);
            } else
            {
                fnSetExitButton(true);
                showToolbar(functionId, '', '');
            }
            //var returnVal = displayResponse(messageNode);
            displayResponse(messageNode);
        }
        try
        {
            //eval('fnPostReverse()');
            var fnEval = new Function('fnPostReverse()');  
            fnEval();
        } catch(e)
        {}
    } catch(e)
    {
        alert(scriptError);
    }

}

function fnDelegate()
{
    return true;
}

//Code Added for MIS PICKUP
function fnPickupMIS()
{
    try
    {
        if (document.getElementById('MICPRMNT'))
        {
            var old_action = gAction;
            if (selectNodes(dbDataDOM, "//MITMS_PRODUCT_DEFAULT__MI"))
            {
                if (selectNodes(dbDataDOM, "//MITMS_PRODUCT_DEFAULT__MI").length == 0)
                {
                    //FCUBS10ITR2 -- SFR 55 STARTS
                    appendData(document.getElementById("TBLPage" + strCurrentTabID))
                    //FCUBS10ITR2 -- SFR 55 END
                    gAction = "MISPICKUP";
                    fcjRequestDOM = buildUBSXml();
                    gAction = old_action;
                    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
                    if (fcjResponseDOM)
                    {
                        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                        if (msgStatus == 'FAILURE')
                        {
                            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
                        {
                            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                        }
                        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                        setDataXML(getXMLString(pureXMLDOM));
                        showData(dbStrRootTableName, 1);
                    }
                    if (msgStatus == 'FAILURE')
                    {
                        //var returnVal = displayResponse(messageNode);
                        displayResponse(messageNode);
                    }
                }
            }
        }
    } catch(e)
    {
        alert(scriptError);
    }
}
/* Function added for View changes of maintainence screen while authrization to post the VIEWMNTLOG request */
function fnProcessAuthViewchg(selectedMod)
{
    try
    {
        gAction = "VIEWMNTLOG";
        var recId = fnGetPKValues();

        setNodeText(selectSingleNode(dbDataDOM, "//MOD_NO"), selectedMod);
        fcjRequestDOM = buildUBSXml();

        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

        fnSetExitButton(false);
    } catch(e)
    {
        alert(scriptError);
    }
}

function getAttachmentxml()
{
    try
    {
        var attchMentxml = "<ATTACHMENTS>";
        for (var i = 0; i < attachmentData.length; i++)
        {
            if (attachmentData[i] == "") continue;
            attchMentxml += attachmentData[i];
        }
        attchMentxml += "</ATTACHMENTS>";
        return attchMentxml;
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnFocusWait()
{
    var t = setTimeout("fnFocus()", 2000);
}

function fnHideProcessWait()
{
    try
    {
        if (dlgArg.ShowSummary == "TRUE")
        {
            var t = setTimeout("dlgArg.mainWin.frames['FrameMenu'].fnHideProcess();", 4000);
        } else
        {
            var t = setTimeout("dlgArg.mainWin.frames['FrameMenu'].fnHideProcess();", 1000);
        }
    } catch(e)
    {
        alert(scriptError);
    }
}

function fnDeleteSuccess() {
    resetElements();
    fnPostDelete();
    dbDataDOM = null;
    gAction = "";
    var l_FncId = mainWin.document.getElementById("fastpath").value;
    showToolbar(l_FncId, '', '');
}

function fnDeleteFailure() {
    var l_FncId = mainWin.document.getElementById("fastpath").value;
    showToolbar(l_FncId, '', '');
}

function fnAuthorizeSuccess(){
	// TODO code to be added
}

function fnAuthorizeFailure(){
	// TODO code to be added
}


function fnSaveFailure(){
	// TODO code to be added
}

function fnSaveSuccess(){
	// TODO code to be added
}
//Non Extensible Mbean Changes
function setActionTime(inTime,functionId,action) {
    
    if(mainWin.mBean_required == "N") 
        return;
    var t = getDateObject();
    var time=(t.getHours()*(3600*1000))+(t.getMinutes()*(60*1000))+(t.getSeconds()*1000)+t.getMilliseconds();
    if(inTime){
        var outTime = time;
       // if(action == 'REOPEN') console.log(inTime);console.log(outTime);
        mainWin.fnPopulateMbeanData(inTime,outTime,functionId,action);
    }else{
        return t;
    }
}
//Non Extensible Mbean Changes	 
//REDWOOD_CHANGES
function displayAuditSection(){ //OJET Migration
    document.getElementById("auditPop").open("#BTN_AUDIT");
}
function cancelListener() {
    document.getElementById("auditPop").close();
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
        if(dbt==null){
            dbt =  selectElem[cnt].getAttribute("CONTROL_DBT");
        }
	//REDWOOD_35313329 starts
        if(dbt==null || dbt=='')
           dbt = selectElem[cnt].getAttribute("id").split("__")[0];
//REDWOOD_35512089 starts
       var fldName = selectElem[cnt].getAttribute("DBC");
        if(fldName==null || fldName == ''){ 
         fldName = selectElem[cnt].getAttribute("NAME");
        }
//REDWOOD_35512089 Ends
	//REDWOOD_35313329 ends
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

function validateSummaryNumberfield(dispFieldId) {
    var dispField = document.getElementById(dispFieldId);
    if (dispField.value != "") {
        if (!checkNumberValidation(dispField.value)) {
            alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
            dispField.value = "";
            dispField.focus();
            return;
        }
    }
}		  
//REDWOOD_CHANGES