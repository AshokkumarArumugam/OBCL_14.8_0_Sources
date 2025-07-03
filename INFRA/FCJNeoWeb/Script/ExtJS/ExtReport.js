/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : ExtReport.js
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
Copyright © 2010-2016 by Oracle Financial Services Software Limited.. 

 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                            to user as alert and on click of Ok button on alert window, screen will be 
                            unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
 
 ** Changed By			  : Rishabh Gupta
 ** Changed On		 	  : 13-Oct-2016
 ** Search String		  : 12_0_3_12_2_24762597
 ** SFR No.				  : 24762597
 
 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 18-Oct-2016
 **  Modified Reason      : Code changes done wrt to chrome for opening the view dialog window 
 **  Retro Source         : 9NT1606_12_0_3_KRIS_FIN_SOFTWARE_INC
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23654851
 
 
**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Jul-2017
**  Modified Reason      : When including a pdf file in chrome as an embedded <object> element, it does not acknowledge 
                           any view or zoom parameters. For this to work in Chrome ,the file should be embedded in an <iframe> element.
						   Changes done for the same 
**  Retro Source         : 9NT1606_12_0_3_BANK_AUDI
**  Search String        : 9NT1606_12_4_RETRO_12_0_3_26440993  

**  Modified By          : Chaitanya Pundlik
**  Modified On          : 02-FEB-2022
**  Modified Reason      : System is not showing validation message in REPORT(ACRPMOVE) Screen when output option is selected as SPOOL
**  Fix Description      : Added extra condition to check whether there is any FAILURE or WARNING in the response.
**  Search String        : BUG_33782526  
--------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------*/
var servletURL = "FCClientHandler";
var isExitTriggered = false;
var gIsAuditExist = true;
var gFromSummary = true;
if (!mainWin.txnBranch[mainWin.CurrentBranch]) mainWin.txnBranch[mainWin.CurrentBranch] = new setTxnBrnInfo();
var g_txnBranch = mainWin.CurrentBranch;
var gCurrentBranch = mainWin.CurrentBranch;
var gBranchDate = mainWin.AppDate;
var gBranchName = mainWin.CurrentBranchName;
var gCurrentUser = mainWin.UserId;
var gLcy = mainWin.Lcy;
var gLangCode = mainWin.LangCode;
var langCode = mainWin.LangISOCode;
var gModule = '';
var gTsname = "PM_BRANCH_CODE#PM_BRANCH_DATE#PM_BRANCH_DESC#PM_CURRENT_USER#PM_LCY#PM_MODULE#PM_LANGUAGE"; //Added by Praveen to handle report screen-rprcndlg call
var gTsvalue = gCurrentBranch + "#" + gBranchDate + "#" + "#PM_BRANCH_DESC#" + "#" + gCurrentUser + "#" + gLcy + "#" + gModule + "#" + gLangCode; //Added by Praveen to handle report screen-rprcndlg call,Fix for 22062429
function resetIndex() {
    for (var dataSrcIndex = 0; dataSrcIndex < dataSrcLocationArray.length; dataSrcIndex++) {
        dbIndexArray[dataSrcLocationArray[dataSrcIndex]] = 1;
    }
}

function fnFocus() {
    mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);
    if (userFuncId != '' && userFuncId != 'null') {
        mainWin.document.getElementById("fastpath").value = userFuncId;
    } else {
        mainWin.document.getElementById("fastpath").value = functionId;
    }
    //showToolbar(functionId, '', '');
}

function fnLoad(xmlFileName, xslFileName, screenName) {
    var p_Action = "";
    if (!fnPreLoadMain()) return false;
    //if (!fnEventsHandler('fnPreLoad')) return false;
    try {
        var html = ShowXML(xmlFileName, xslFileName, strScreenName);
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
   //REDWOOD_CHANGES         
    } catch (e) {
        debugs("Failed in ShowXML", "");
    }
    document.getElementById("toolbar").style.display = "block";
    
    if ((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
        try {
            var scriptElements = document.getElementsByTagName("script");
            for (var i = 0; i < scriptElements.length; ++i) {
                if (scriptElements[i].getAttribute("DEFER") != null) {
                    //eval(getInnerText(scriptElements[i]));
                    var fnEval = new Function(getInnerText(scriptElements[i]));  
                    fnEval();
                }
            }
        } catch (e) {
            alert(e.message);
        }
    }
    if (document.getElementById("DIV_BLK_AUDIT") == null || document.getElementById("DIV_BLK_AUDIT") == "null") {
        gIsAuditExist = false;
    }
    fnBindScreenElements();	  //REDWOOD_CHANGES
    debugs(html, "P");
    fnBuildMultipleEntryArray();
    disableForm();
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
    fnEnableElement(document.getElementById("BTN_EXIT_IMG"));
    fnEnableElement(document.getElementById("BTN_OK"));	
//REDWOOD_CHANGES
  /*  fnCalcHgt();
    fnNew();
    fnDefaultReport();
    fnSetExitButton(true);
    document.getElementById("BTN_EXIT_IMG").focus();
    p_Action = gAction;
    gAction = "NEW";
	//Fix for 17205256  start
    //showToolbar(functionId, '', '');
	showToolbar('', '', '');
	//Fix for 17205256  end 
   // gAction = p_Action; commented for 17078745 
    // fnSetReportParam();
    mainWin.fnSetDatalist(functionId);//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist
    if (!fnPostLoadMain()) return false;  */
//REDWOOD_CHANGES
    //if (!fnEventsHandler('fnPostLoad')) return false;
}

/*function fnSetReportParam(){
    document.getElementsByName('PM_BRANCH_CODE')[0].value = gCurrentBranch;
    //document.getElementsByName('PM_BRANCH_DATE')[0].value = gBranchDate;
    document.getElementsByName('PM_BRANCH_DESC')[0].value = gBranchName;
    document.getElementsByName('PM_CURRENT_USER')[0].value = gCurrentUser;
    document.getElementsByName('PM_LCY')[0].value = gLcy;
    document.getElementsByName('PM_LANGUAGE')[0].value = gLangCode;
    document.getElementsByName('PM_MODULE')[0].value = gModule;
}*/

function fnDefaultReport() {
    var p_Action = gAction;
    gAction = "DEFAULT";
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    fcjRequestDOM = buildUBSXml(true);
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = "";
        var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
        if (msgStatus == 'FAILURE') {
            l_xPath += "FCUBS_ERROR_RESP";
        } else if (msgStatus == "SUCCESS" || msgStatus == "WARNING") {
            l_xPath += "FCUBS_WARNING_RESP";
        }
        messageNode = selectSingleNode(fcjResponseDOM, l_xPath);
        if (msgStatus == 'SUCCESS') {
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
            fnSetExitButton(false);
        } else if (msgStatus == 'WARNING') {
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
        }
        showToolbar(functionId, '', '');
        if (msgStatus == 'FAILURE' || msgStatus == 'WARNING') {
            return;
        }
    } else {
        alert(mainWin.getItemDesc("LBL_PROCESS_FAIL"));
        return;
    }
    gAction = p_Action;
}

function fnSaveAll(e) {
    window.focus();
    if (!fnValidate()) return false;
    gAction = "GENERATE";
    if (gIsAuditExist) {
        appendData(document.getElementById("DIV_BLK_AUDIT"));
    }
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") appendData(document.getElementById("TBLPage" + strHeaderTabId));
    //if (!fnEventsHandler('fnPreSave')) {
    if (!fnPreSaveMain()) {
        var validate = mainWin.ValidateFlag;
        if (validate == 'N') {
            debugs("No Validation at Client Side", "P");
        }
        if (mainWin.ValidateFlag == 'Y') {
            return;
        }
    }
    fcjRequestDOM = buildUBSXml(true);
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        debugs(getXMLString(fcjResponseDOM), "P");
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = "";
        var l_xPath = "FCUBS_RES_ENV/FCUBS_BODY/";
        if (msgStatus == 'FAILURE') {
            l_xPath += "FCUBS_ERROR_RESP";
        } else if (msgStatus == "SUCCESS" || msgStatus == "WARNING") {
            l_xPath += "FCUBS_WARNING_RESP";
        }
        messageNode = selectSingleNode(fcjResponseDOM, l_xPath);
        if (msgStatus == 'SUCCESS' || msgStatus == 'WARNING') {
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
        }
        showToolbar(functionId, '', '');
		/*Fix for 21651323 Starts*/
		if (msgStatus != 'FAILURE' && msgStatus != 'WARNING' && document.getElementsByName("REPOUTPUT")[0].value == "S") { //BUG_33782526 Changes 
            fnPostProcessResponse(msgStatus);
            return;
        }
        if (msgStatus == 'FAILURE' || msgStatus == 'WARNING' ) { /*Fix for 21651323 Ends*/
            var returnVal = displayResponseReport(messageNode, msgStatus);
            return;
        }
		 if(msgStatus == 'SUCCESS' && document.getElementsByName("PRINTAT")[0].value=="S"){
         showAlerts(fnBuildAlertXML("", "I", "Request Processed Successfully"), "I");
          return;
        }
    } else {
        alert(mainWin.getItemDesc("LBL_PROCESS_FAIL"));
        return;
    }
    if (!fnPostSaveMain()) return false;
    //if (!fnEventsHandler('fnPostSave')) return false;
    fnReportAction(e); //Method to view , spool or print Report depends on choice
}

function fnPost(fcjMsgDOM, serverURL, functionID) {

    var responseDOM = null;
  /*  if (!mainWin.isSessionActive()) { //session expiry change start
        event.returnValue = false;
        responseDOM = loadXMLDoc("<SESSION>EXPIRED</SESSION>");
        return responseDOM;
    }session expiry change  end */
    if (fcjMsgDOM == null) {
        return responseDOM;
    }
    mask();
    var strFormData = getXMLString(fcjMsgDOM).replace(/\s\/>/g, '/>');
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", functionID);
    objHTTP.setRequestHeader("OPERATION", gAction);
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
    objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHTTP.setRequestHeader("EXTREPORT", "Y");
    objHTTP.setRequestHeader("REPFMT", document.getElementsByName("REPFMT")[0].value);
    objHTTP.setRequestHeader("REPOUTPUT", document.getElementsByName("REPOUTPUT")[0].value);
    objHTTP.setRequestHeader("PRINTAT", document.getElementsByName("PRINTAT")[0].value);
    objHTTP.setRequestHeader("PRINTER", document.getElementsByName("PRINTER")[0].value);
    objHTTP.setRequestHeader("TSNAME", gTsname);
    objHTTP.setRequestHeader("TSVALUE", gTsvalue);
    if (typeof (seqNo) != 'undefined') {
        objHTTP.setRequestHeader("SEQNO", seqNo);
    }
	//12_0_3_12_2_24762597 starts
	else if (typeof (parent.seqNo) != 'undefined') { 
        objHTTP.setRequestHeader("SEQNO", parent.seqNo);
    }else if (typeof (parent.parent.seqNo) != 'undefined') {
        objHTTP.setRequestHeader("SEQNO", parent.parent.seqNo);
    } 
	//12_0_3_12_2_24762597 ends
    if (typeof (seqNo) == 'undefined') {
        objHTTP.setRequestHeader("SEQNO", parent.seqNo);
    }
    if (getBrowser().indexOf("SAFARI") != -1) {
        objHTTP.setRequestHeader("SAFARIREQ","TRUE");
    } else {
        objHTTP.setRequestHeader("SAFARIREQ","FALSE");
    }
    if (typeof(safariReqSentOnce)!= "undefined" && safariReqSentOnce == true) {
        objHTTP.setRequestHeader("SAFARIREQSENTONCE","TRUE");
    } else {
        objHTTP.setRequestHeader("SAFARIREQSENTONCE","FALSE");
    }
    safariReqSentOnce = false;
    var t = getDateObject();
    //posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    var clientTime = (t.getHours() * (3600)) + (t.getMinutes() * (60)) + t.getSeconds();
    objHTTP.setRequestHeader("CLIENTTIME",clientTime);
    var isException = false;

    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    if (!isException) {
        if (objHTTP.status != 200) {
            mask();
            showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText), "I");
            alertAction = "UNMASK";
        } else {
            mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            }
            else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start
                mainWin.mask();
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            } else if(selectSingleNode(objHTTP.responseXML, "//SAFARIREQ") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SAFARIREQ")) == "TRUE") {
                fnSetDelay(2000);
                safariReqSentOnce = true;
                isException = false;
                responseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            } else {
                responseDOM = objHTTP.responseXML;
                if (gAction != "DEFAULT" && document.getElementsByName("REPOUTPUT")[0].value == "P" && document.getElementsByName("PRINTAT")[0].value == "S") {
                    //alert("Print Job Sent To Printer Queue"); FC 11.4 NLS Changes
                    showErrorAlerts('IN-HEAR-504');
                    return responseDOM;
                }
            }
        }
        unmask();
        return responseDOM;
    } else {
        fnSetDelay(2000);
        safariReqSentOnce = true;
        isException = false;
        responseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        unmask();
        return responseDOM;
    }
}

function fnReportAction(e) {
    var rFormat = document.getElementsByName('REPFMT')[0].value;
    var rOutput = document.getElementsByName('REPOUTPUT')[0].value;
    var repFileName = document.getElementsByName("FILENAME")[0].value;
    var fileUrl1 = mainWin.reportURL + repFileName + "." + rFormat;
    if (rOutput == "V") {
       
            fnReportRequest(repFileName + "." + rFormat);
			if (getBrowser().indexOf("IE") != -1) { //9NT1606_12_2_RETRO_12_0_3_23654851 changes start
				mainWin.document.getElementById("IFlauncher").removeChild(mainWin.document.getElementById("RequestFrame")); //Fix for 20682656
			} //9NT1606_12_2_RETRO_12_0_3_23654851 changes end 
        
    } else if (rOutput == "P") {
        var printAt = document.getElementsByName("PRINTAT")[0].value;
        if (printAt == "C") {
            if (rFormat == "pdf") {
				if(getBrowser().indexOf("CHROME") == -1){ //9NT1606_12_4_RETRO_12_0_3_26440993 added 
                var l_Params = "fileUrl=" + fileUrl1;
                l_Params += "&reportName=" + repFileName + "." + rFormat;
                l_Params += "&seqNo=" + seqNo;
                l_Params += "&Closelbl=" + mainWin.getItemDesc("LBL_CLOSE");
                loadSubScreenDIV("ChildWin", "ExtPrintReport.jsp?" + l_Params);
				//9NT1606_12_4_RETRO_12_0_3_26440993 starts 
				}else{
					fnReportRequest(repFileName + "." + rFormat);
					if (getBrowser().indexOf("IE") != -1) { 
						mainWin.document.getElementById("IFlauncher").removeChild(mainWin.document.getElementById("RequestFrame")); 
					}
				}
				//9NT1606_12_4_RETRO_12_0_3_26440993 ends 
            }else {
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML("", "I", "Silent Printing Supports PDF Format Only"), "I");
            }
        }
    }
}

//Bug 16994212 Changes Starts
/*
function fnReportRequest(fileUrl1) {
    try {
        var fileInputField = document.getElementById("ResTree");
        var parent = fileInputField.parentNode;
        var iFrameBody = "";
        var CSRF_token = mainWin.CSRFtoken;
        iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>';
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
        iFrameBody += "<FORM id='fileUploadForm' method='post' action=FCReportHandleRequest?fileName=" + fileUrl1 + "&TYPE=DOWNLOAD enctype='multipart/form-data'>";
         iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />";
        iFrameBody += "</FORM></body></html>";

        var iFrameHeight = fileInputField.offsetHeight;
        var iFrameWidth = fileInputField.offsetWidth;

        var requestIFrame = createRequestIFrame(iFrameHeight + 5, iFrameWidth + 50);
        parent.appendChild(requestIFrame);
        var iRequestFrameID = 'RequestFrame';
        if (self.frames[iRequestFrameID].name != iRequestFrameID) {
            self.frames[iRequestFrameID].name = iRequestFrameID;
        }
        document.getElementsByName('RequestFrame')[0].contentWindow.document.open();
        document.getElementsByName('RequestFrame')[0].contentWindow.document.write(iFrameBody);
        document.getElementsByName('RequestFrame')[0].contentWindow.document.close();
        var responseIFrame = createResponseIFrame();
        parent.appendChild(responseIFrame);
        var iResponseFrameID = 'ResponseFrame';
        if (self.frames[iResponseFrameID].name != iResponseFrameID) {
            self.frames[iResponseFrameID].name = iResponseFrameID;
        }
        var iFrameFormDocument = document.getElementsByName('RequestFrame')[0].contentWindow.document;
        iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
        iFrameFormDocument.getElementById("fileUploadForm").submit();
    } catch (e) {}
}
*/

function fnReportRequest(fileUrl1) {
    try {
        var fileInputField = document.getElementById("ResTree");
        var parent = fileInputField.parentNode;
        var iFrameBody = "";
        var CSRF_token = mainWin.CSRFtoken;
        iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>';
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
        iFrameBody += "<FORM id='fileUploadForm' method='post' action=FCReportHandleRequest?fileName=" + fileUrl1 +"&TYPE=DOWNLOAD enctype='multipart/form-data'>";//Fix for 19463474
         iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />";
        iFrameBody += "</FORM></body></html>";

        var iFrameHeight = fileInputField.offsetHeight;
        var iFrameWidth = fileInputField.offsetWidth;

        var requestIFrame = createRequestIFrame(iFrameHeight + 5, iFrameWidth + 50);
        //parent.appendChild(requestIFrame);
        var iRequestFrameID = 'RequestFrame';
         if(fileUrl1.indexOf("htm") >= 0 && fileUrl1.indexOf("HTM") >= 0){
           parent.appendChild(requestIFrame);
          if (self.frames[iRequestFrameID].name != iRequestFrameID) {
            self.frames[iRequestFrameID].name = iRequestFrameID;
          }
        document.getElementsByName('RequestFrame')[0].contentWindow.document.open();
        document.getElementsByName('RequestFrame')[0].contentWindow.document.write(iFrameBody);
        document.getElementsByName('RequestFrame')[0].contentWindow.document.close();
        var iFrameFormDocument = document.getElementsByName('RequestFrame')[0].contentWindow.document;
        }else{
          mainWin.document.getElementById("IFlauncher").appendChild(requestIFrame);
          mainWin.document.getElementsByName('RequestFrame')[0].contentWindow.document.open();
          mainWin.document.getElementsByName('RequestFrame')[0].contentWindow.document.write(iFrameBody);
          mainWin.document.getElementsByName('RequestFrame')[0].contentWindow.document.close();
          var iFrameFormDocument = mainWin.document.getElementsByName('RequestFrame')[0].contentWindow.document;
        }
        
        
        var responseIFrame = createResponseIFrame();        
        var iResponseFrameID = 'ResponseFrame';
        var iResponseFrameID = 'ResponseFrame';
        if(fileUrl1.indexOf("htm") >= 0 && fileUrl1.indexOf("HTM") >= 0){
           parent.appendChild(responseIFrame);
           if (self.frames[iResponseFrameID].name != iResponseFrameID) {
            self.frames[iResponseFrameID].name = iResponseFrameID;
           }
        }
        
        iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
        iFrameFormDocument.getElementById("fileUploadForm").submit();
        if(fileUrl1.indexOf("htm") >= 0 ||fileUrl1.indexOf("HTM") >= 0){
          if(mainWin.document.getElementById("IFlauncher").innerHTML!="")
            mainWin.document.getElementById("IFlauncher").removeChild(mainWin.document.getElementById("responseContainer"));
          mainWin.document.getElementById("IFlauncher").appendChild(responseIFrame);
          mainWin.document.getElementById("IFlauncher").style.display = "block";
        }
    } catch (e) {}
}
//Bug 16994212 Changes Ends

function createResponseIFrame() {
    var responseFrameContainer = document.createElement('div');
    responseFrameContainer.setAttribute('id', 'responseContainer');
    var iFrameID = 'ResponseFrame';
    var iFrameBody = '<iframe id=\"' + iFrameID + '\"' + ' name=\"' + iFrameID + '\"' + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
    responseFrameContainer.innerHTML = iFrameBody;
    return responseFrameContainer;
}

function createRequestIFrame(height, width) {
    var requestIFrame = document.createElement('iframe');
    requestIFrame.setAttribute('id', 'RequestFrame');
    requestIFrame.setAttribute('name', 'RequestFrame');
    requestIFrame.setAttribute('class', 'TextNormal');
    requestIFrame.setAttribute('src', '');
    requestIFrame.setAttribute('frameBorder', '0');
    requestIFrame.setAttribute('height', height + 'px');
    requestIFrame.setAttribute('width', width + 'px');
    requestIFrame.setAttribute('scrolling', 'no');
    requestIFrame.style.border = '0px none';
    requestIFrame.style.display = 'none';//Fix for 21506532
    requestIFrame.style.margin = '0px';
    requestIFrame.style.padding = '0px';
    return requestIFrame;
}

function displayResponseReport(messageNode, msgStatus) {
    if (!msgStatus || typeof (msgStatus) == 'undefined') {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    }
    if (messageNode != null) {
        if (msgStatus == 'SUCCESS') {
            alertAction = "SUCCESS";
            type = "I";
        } else if (msgStatus == 'WARNING') {
            alertAction = "OVERRIDE";
            type = "O";
        } else if (msgStatus == 'FAILURE') {
            alertAction = "ERROR";
            type = "E";
        }
        mask();
        showAlerts(getXMLString(messageNode), type);
    }
}

function fnExit(fromAlert) {
    if (gAction != "") {
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
        alertAction = "EXITACTION";
    } else {
        dbDataDOM = null;
        resetElements();
        isExitTriggered = true;
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
    }
}

function fnCloseAlertWin(event) {
    if (alertAction == "EXITACTION") {
        unmask();
        var l_RelLockStatus = true;
        if (gAction == "MODIFY") {
            l_RelLockStatus = releaseLock();
        }
        if (l_RelLockStatus) {
            if (gAction == "ENTERQUERY") {
                showData(dbStrRootTableName, 1);
            } else {
                resetElements();
                dbDataDOM = null;
            }
			/*Fix for 19274492 Starts*/
            /*gAction = "";
            disableForm();
            fnSetExitButton(false);
            multiBrnScrOpened = false;*/
            //mainWin.showToolbar("", "", "");
			dbDataDOM = null;
            resetElements();
            isExitTriggered = true;
            var winObj = mainWin.document.getElementById(seqNo);
            setTimeout(function(){mainWin.fnExit(winObj);},0);//REDWOOD_CHANGES
			/*Fix for 19274492 Ends*/
            return;   //REDWOOD_CHANGES
        } else {
            return;
        }
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
    }
}

function fnExitAlertWin(evnt) {
    unmask();
    if (alertAction == "EXITACTION") {
        return;
    }
}