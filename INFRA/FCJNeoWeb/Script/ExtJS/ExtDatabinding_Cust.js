/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtDatabinding.js
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
Copyright © 2016 - 2018   by Oracle Financial Services Software Limited..

**CHANGE HISTORY**

  Modified By           : Rishabh Gupta
  Modified On           : 16-Sept-2016
  Modified Reason       : objHTTP.setRequestHeader("accept-encoding", "gzip") is getting failed and the browser is not accepting giving "Refused to set unsafe header ,
							"accept-encoding". Hence request is not been sent to FCClientHandler.java So removed objHTTP.setRequestHeader("accept-encoding",
							"gzip") this piece of code 
  Search String         : 12_1_RETRO_12_2_23664530
  SFR No.               : 23664530
  
  Modified By           : Rishabh Gupta
  Modified On           : 21-Sept-2016
  Modified Reason       : For blocks comprising fields of type multiple entry and multiple entry single
							view, code modified to build complete DOM in order to display all the
							relevant block details when querying a record.
  Search String         : 12_1_RETRO_12_2_23664506
  SFR No.               : 23664506
  
  Modified By           : Rishabh Gupta
  Modified On           : 26-Sept-2016
  Modified Reason       :In case of Radio fields,Changes done to show the previous value in red and the current value in blue color
  Search String         : 12_0_3_RETRO_12_2_24444399
  SFR No.               : 24444399

  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 07-Oct-2016
  **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                             to user as alert and on click of Ok button on alert window, screen will be 
                             unmasked and user can try the action again.
  **  Retro Source         : 9NT1606_12_0_3_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
  
  **  Modified By           : Neethu Sreedharan
  **  Modified On           : 12-Oct-2016
  **  Modified Reason       : The status code for the XMLHttpRequestObject check is done for status 
                              codes other than 200 
  **  Retro Source          : 9NT1606_12_0_3_COMMONWEALTH_BANK_OF_AUSTRALIA
  **  Search String         : 9NT1606_12_2_RETRO_12_0_3_23656268 

  **  Modified By           : Neethu Sreedharan
  **  Modified On           : 12-Aug-2017 
  **  Modified Reason       : Enhancement has been done to set udf values 
  **  Retro Source          : 9NT1606_12_0_3_ABU_DHABI_COMMERCIAL_BANK
  **  Search String         : 9NT1606_12_4_RETRO_12_0_3_26550099  
  
  **  Modified By           : Ambika Selvaraj
  **  Modified On           : 11-Sep-2017 
  **  Modified Reason       : Fix done to handle response DOM building for N-N-N relation type.
  **  Retro Source          : 9NT1606_12_1_MKB_BANK_ZRT
  **  Search String         : 9NT1606_12_4_RETRO_12_1_26780563
  
  **  Modified By           : Karthigadevi P
  **  Modified On           : 05-Oct-2017 
  **  Modified Reason       : Code changes done to handle display of data in popup editor of Multiple entry block
  **  Retro Source          : 9NT1606_12_4_RETRO_12_3_26780570
  **  Search String         : Bug#26896721 
 
  **  Modified By           : Niranjan Prajapati
  **  Modified On           : 19-June-2018
  **  Modified Reason       : CHANGES (COLOR CODE) ON COLLATERAL NOT REFLECTED PROPERLY 
  **  Retro Source          : Bug_28018410
  **  Search String         : 9NT1606_12_5_RETRO_12_3_28176165
  **
  **  Modified By           : Mohammed Alam
  **  Modified On           : 28-Aug-2018 
  **  Modified Reason       : fix given to make view change working for  multiple block in stdcif .
  **  Retro Source          : 23531999
  **  Search String         : JC_TO_MINICORE
  
  Modified By           : Partha Sarmah
  Modified On           : 12-June-2019
  Modified Reason       : Issue:Using of brackets as identifier for identifying old/new values is displaying incorrect content on click of view changes button
						  Fix:Modification done so that different unique identifier is used for identifying old/new values instead of brackets
  Search String         : FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034
  
    Modified By          :  Partha Sarmah
    Modified On          :  21-Oct-2019
    Modified Reason      :  Issue: LOCKING MECHANISM DOES NOT WORK PROPERLY IN FCUBS DURING AUTHORIZATION.Retro from 28954840 is done.
    Search string        :  FCUBS_14.1_UNICREDIT S.P.A._30439521_RETRO_28954840
	
**  Modified By          : Saloni Rai
**  Modified On          : 11-Feb-2020
**  Change Description   : Fix provided to return an error incase Advanced Search criteria results in invalid query.
**  Search String        : Bug_30849927
----------------------------------------------------------------------------------------------------
*/
// Added for ME pagination
var N_FIRST = 1;
var N_PREVIOUS = 2;
var N_NEXT = 3;
var N_LAST = 4;
var N_GOTO = 5;
var gErrCodes = "";
var replaceStr = "";
var tempCurrentTabId = "";
var objHTTP = null;
var fcjRequestDOM = null;
var fcjResponseDOM = null;
var processingAction = "";
var meHeaderLoaded = false;
//Performance Changes
var posttime = "";
var afterposttime = "";
//Performance Changes
function fnPost(fcjMsgDOM, serverURL, functionID) {
    var responseDOM = null;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/

    if (fcjMsgDOM == null) {
        return responseDOM;
    }
    mask();

    /*To mask when system is processing - start*/
    if (getBrowser().indexOf("IE") !=  - 1) {
        //ie11 changes
         window.showModelessDialog("Processing.html", null, "dialogHide:yes;status:no;resizable:no;dialogHeight:0px;dialogWidth:0px;dialogLeft:0px;dialogTop:0px");//citi ui change
    }
    /*To mask when system is processing - end*/
    var strFormData = getXMLString(fcjMsgDOM).replace(/\s\/>/g, '/>');
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    //objHTTP.setRequestHeader("Content-Encoding", "gzip");
    //objHTTP.setRequestHeader("accept-encoding", "gzip"); /*12_1_RETRO_12_2_23664530 commented*/
    
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", functionID);
    objHTTP.setRequestHeader("OPERATION", gAction);
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
    if (typeof (seqNo) != 'undefined') {  // 21258435 starts
        objHTTP.setRequestHeader("SEQNO", seqNo);
    } else if (typeof (parent.seqNo) != 'undefined') {
        objHTTP.setRequestHeader("SEQNO", parent.seqNo);
    } else if (typeof (parent.parent.seqNo) != 'undefined') {
        objHTTP.setRequestHeader("SEQNO", parent.parent.seqNo);
    } // 21258435 ends
    if (typeof (screenType) != 'undefined') {   //Function Id as Service Call Changes
    objHTTP.setRequestHeader("GW_WSCALL", screenType);
    }   
    if (typeof (g_SummaryType) != 'undefined') {
        if (g_SummaryType == "U")
            objHTTP.setRequestHeader("DBUPLOAD", "TRUE");
        else 
            objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    } else 
        objHTTP.setRequestHeader("DBUPLOAD", "FALSE");

    if (strFormData.indexOf("<ATTACHMENTS>") >  - 1)
        objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
    else 
        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    /*Added for Webservices Call start*/
    if (strFormData.indexOf("BLK_WS_DET") >  - 1 && selectNodes(fcjMsgDOM, "//REC/REC/REC[@TYPE='BLK_WS_DET']").length >= 1)
        objHTTP.setRequestHeader("WSCALLREQUIRED", "TRUE");
    else 
        objHTTP.setRequestHeader("WSCALLREQUIRED", "FALSE");
    /*Added for Webservices Call end*/
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
    //Performance Changes  
    var t = getDateObject();
    // if(gAction != 'RELEASELOCK')
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    var clientTime = (t.getHours() * (3600)) + (t.getMinutes() * (60)) + t.getSeconds();
    objHTTP.setRequestHeader("CLIENTTIME",clientTime);
    var isException = false;
    //Performance Changes
   // try { //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        objHTTP.send(strFormData);
    } catch(e) {
        if (getBrowser().indexOf("SAFARI") != -1) {
            if ((e.code && e.code == 101 && e.message && e.message.indexOf("NETWORK_ERR") != -1) || (e.code && e.code == 23 && e.message && e.message.indexOf("DOM Exception") != -1)) {
                isException = true;
            }
        }
		else //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
		{
			unmask();//unmasking in case of network error #21182929 
            mainWin.handleNetWorkErr(e);
		} //9NT1606_12_2_RETRO_12_0_3_21182929 changes end 
    }
    //Performance Changes
    t = getDateObject();
    //if(gAction != 'RELEASELOCK')
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
    if (!isException) {
        if (objHTTP.status != 200) {
            //200-OK --BUG: No hard coded message this alert will never arrive so ignore!!!!LBL_ERR_DESC
            //mask(); //9NT1606_12_2_RETRO_12_0_3_23656268 changes start
            //showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText), "I");
            //alertAction = "UNMASK";
			unmask(); 
            mainWin.displayTimeOutErrDiv(objHTTP.status + "~" +   mainWin.getCommonErrorList()["SM-NE002"].split("~")[0].split(",")[0] + "<br>" + objHTTP.status + " - " + objHTTP.statusText  );
            throw new Error(  mainWin.getCommonErrorList()["SM-NE002"].split("~")[0].split(",")[0]+ objHTTP.statusText);//9NT1606_12_2_RETRO_12_0_3_23656268 changes end
        } else {
            mainWin.inactiveTime = 0;
			if (objHTTP.responseXML != null) { //Bug_30849927
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
                /*Security bug 9843512 fixes starts*/
            } else if (selectSingleNode(objHTTP.responseXML, "//ERROR") != null && ((getNodeText(selectSingleNode(objHTTP.responseXML, "//ERROR")).indexOf("OF-4560") !=  - 1) || (getNodeText(selectSingleNode(objHTTP.responseXML, "//ERROR")).indexOf("SM-00420") !=  - 1))) {
                //12.1 session expiry fix 2
                alert(getNodeText(selectSingleNode(objHTTP.responseXML, "//ERROR")));
                /*Security bug 9843512 fixes ends*/
            } else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {
                //session expiry change start
                mainWin.mask();
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;//session expiry change end
            } else if(selectSingleNode(objHTTP.responseXML, "//SAFARIREQ") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SAFARIREQ")) == "TRUE") {
                fnSetDelay(2000);
                safariReqSentOnce = true;
                isException = false;
                responseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
            } else {
                responseDOM = objHTTP.responseXML;
                /*var respTxt = getXMLString(responseDOM);
                if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
                    appendDebug(responseDOM);
                    var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                    var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                    respTxt = start + end;
                    responseDOM = loadXMLDoc(respTxt);
                } */
    
            }
			//Bug_30849927 Changes Start
            } else{
				 responseDOM = objHTTP.responseXML;
			}
			//Bug_30849927 Changes End
        }
        unmask();
		//FCUBS_14.1_UNICREDIT S.P.A._30439521_RETRO_28954840 starts
		if (responseDOM != null) {
	    if (selectNodes(responseDOM, "FCUBS_RES_ENV//FCUBS_HEADER/SNAPSHOTID").length > 0){//29201895 changes
			if( getNodeText(selectSingleNode(responseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")) == 'SUCCESS') {
				snapShotId = getNodeText(selectSingleNode(responseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SNAPSHOTID")); 
			}
		}
       }	
       //FCUBS_14.1_UNICREDIT S.P.A._30439521_RETRO_28954840 ends
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

function fnPostAsync(fcjMsgDOM, serverURL, functionID) {
    var responseDOM = null;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (!mainWin.isSessionActive()) {
        responseDOM.loadXML("<SESSION>EXPIRED</SESSION>");
        return responseDOM;
    }
    if (fcjMsgDOM == null) {
        displayError("EXTPOST-001");
        return responseDOM;
    }
    var strFormData = getXMLString(fcjMsgDOM);

    objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", serverURL, true);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", functionID);
    objHTTP.setRequestHeader("OPERATION", gAction);
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
    if (typeof (g_SummaryType) != 'undefined') {
        if (g_SummaryType == "U")
            objHTTP.setRequestHeader("DBUPLOAD", "TRUE");
        else 
            objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    }
    else 
        objHTTP.setRequestHeader("DBUPLOAD", "FALSE");

    if (strFormData.indexOf("<ATTACHMENTS>") >  - 1)
        objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
    else 
        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    if (strFormData.indexOf("BLK_WS_DET") >  - 1 && selectNodes(fcjMsgDOM, "//REC/REC/REC[@TYPE='BLK_WS_DET']").length >= 1)
        objHTTP.setRequestHeader("WSCALLREQUIRED", "TRUE");
    else 
        objHTTP.setRequestHeader("WSCALLREQUIRED", "FALSE");
    objHTTP.onreadystatechange = fnPostResponse;
    objHTTP.send(strFormData);
    mainWin.inactiveTime = 0;
}

function appendAllData() {
    var tabList = document.getElementById("tablist");
    var tabs = "";
    var tabObject = "";
    //Header
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "")
        appendTabData(document.getElementById("TBLPage" + strHeaderTabId));

    appendTabData(document.getElementById("TBLPage" + strCurrentTabId));
    fnBuildTabHTML(true);
    if (document.getElementById("tablist")) {
        tabs = tabList.getElementsByTagName("li");
        for (var tabCnt = 0;tabCnt < tabs.length;tabCnt++) {
            tabObject = document.getElementById("TBLPage" + tabs[tabCnt].childNodes[0].id);
            appendTabData(tabObject);
        }
    }
    //Footer
//    if (typeof (strFooterTabId) != 'undefined' && strFooterTabId != "")
//        appendTabData(document.getElementById("TBLPage" + strFooterTabId));

}

function appendData() {

    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
        appendTabData(document.getElementById("TBLPage" + strHeaderTabId));
    }

    if (typeof (strCurrentTabId) != 'undefined' && strCurrentTabId != "") {
        appendTabData(document.getElementById("TBLPage" + strCurrentTabId));
    }

//    if (typeof (strFooterTabId) != 'undefined' && strFooterTabId != "") {
//        appendTabData(document.getElementById("TBLPage" + strFooterTabId));
//    }
}

function appendTabData(tabObject) {//OJET Migration
if(!tabObject) return;
    var operation = gAction;
    if (operation != '' && operation != 'ENTERQUERY' && operation != 'EXECUTEQUERY') {
        if (tabObject.innerHTML == "") {
            var id = tabObject.id;
            if (id.indexOf("TBLPage") !=  - 1)
                id = id.substring(7, id.length);
            var html = ShowXMLTabNew(xmlFileName, 'ExtDetailTab.xsl', strScreenName, id);//12.1 Caching Tab load
            debugs("tabsContent=", html);
            //  if ((window.ActiveXObject) || ("ActiveXObject" in window)) {
            // if (getBrowser().indexOf("IE") != -1) {////12.1 Caching Tab load
            tabObject.innerHTML = html;
            //} else { //12.1 Caching Tab load
            //  tabObject.appendChild(html); //12.1 Caching Tab load
            // }//12.1 Caching Tab load
            fnBuildMultipleEntryArray(id);
        }
        var fldSetList = tabObject.getElementsByTagName("fieldset");
        for (var fldSetCnt = 0;fldSetCnt < fldSetList.length;fldSetCnt++) {
            var l_curBlock = fldSetList[fldSetCnt].getAttribute("block");
            var l_fieldSetType = fldSetList[fldSetCnt].getAttribute("type");
            var l_fieldSetView = fldSetList[fldSetCnt].getAttribute("view");
            if (l_fieldSetType == 'ME' && l_fieldSetView != 'SE') {
                var l_tableobj = getTableObjForBlock(l_curBlock);
                if(!l_tableobj) return;
                appendTableValue(l_tableobj, 1, l_curBlock);
            }
            else {
                if (l_fieldSetType == 'ME' && l_fieldSetView == 'SE')
                    if (fldSetList[fldSetCnt].getAttribute("MESVNODE") == "false" && selectNodes(dbDataDOM, getXPathQuery(l_curBlock)).length == 0)
                        continue;
                appendFielsetData(fldSetList[fldSetCnt], l_curBlock);
            }
        }
    }
}

function appendTableValue(tableObject, id, DBT) {//OJET Migration
    var rowList = tableObject.tBodies[0].rows;
    var tblId = tableObject.parentNode.parentNode.id;//OJET-Arun
    
    var cPage = Number(document.getElementById('paging_'+tblId+'_nav_input').value) - 1;//OJET-Arun
    if (cPage ==  - 1) {
        cPage = 0;
    }
    var rowIndx = 0;
    //var pgsize = Number(tableObject.getAttribute("pgsize"));
    var pgsize = getPgSize(tblId);/*12.0.4 UI performance changes */
    for (var rowIndex = 0;rowIndex < meArrayForAddDelete[tblId]().length;rowIndex++) {
        var currRow = rowList[rowIndex];
        var isME = true;
        rowIndx = (pgsize * cPage) + rowIndex;
        if(currRow){
        appendOJInputData(currRow, DBT, rowIndx + 1, isME); //OJET Migration
        }
        
       /* appendInputData(currRow, DBT, rowIndx + 1, isME);
        appendSelectData(currRow, DBT, rowIndx + 1, isME);
        appendTextAreaData(currRow, DBT, rowIndx + 1, isME);*/
    }
}

function appendTableValue_old(tableObject, id, DBT) {
    var rowList = tableObject.tBodies[0].rows;
    var tblId = tableObject.parentNode.parentNode.id;//OJET-Arun
    var cPage = Number(getInnerText(document.getElementById("CurrPage__" + tblId))) - 1;//OJET-Arun
    if (cPage ==  - 1) {
        cPage = 0;
    }
    var rowIndx = 0;
    //var pgsize = Number(tableObject.getAttribute("pgsize"));
    var pgsize = getPgSize(tblId);/*12.0.4 UI performance changes */
    for (var rowIndex = 0;rowIndex < rowList.length;rowIndex++) {
        var currRow = rowList[rowIndex];
        var isME = true;
        rowIndx = (pgsize * cPage) + rowIndex;
        appendOJInputData(currRow, DBT, rowIndx + 1, isME); //OJET Migration
       /* appendInputData(currRow, DBT, rowIndx + 1, isME);
        appendSelectData(currRow, DBT, rowIndx + 1, isME);
        appendTextAreaData(currRow, DBT, rowIndx + 1, isME);*/
    }
}

function appendFielsetData(FldSetObject, blockId) {
    //Ashok commented this as part of 12.0.2
    //buildIsControl(); 
    //if (isQuery[blockId] == "1" || isControl[blockId] == "1") return;
    var id = dbIndexArray[blockId];
    var isME = false;
  //  appendInputData(FldSetObject, blockId, id, isME);
    appendOJInputData(FldSetObject, blockId, id, isME ) ;//OJET-Migration
   /* appendOJInputData(FldSetObject, blockId, id, isME,'OJ-INPUT-NUMBER') ;//OJET-Migration
    appendOJInputData(FldSetObject, blockId, id, isME,'OJ-INPUT-PASSWORD') ;//OJET-Migration
    appendOJInputData(FldSetObject, blockId, id, isME,'OJ-INPUT-PASSWORD') ;//OJET-Migration*/
   // appendSelectData(FldSetObject, blockId, id, isME);
 //   appendTextAreaData(FldSetObject, blockId, id, isME);
}

function appendInputData(FldSetObject, blockId, id, isME) {
    var currObject = FldSetObject.getElementsByTagName("INPUT");
    if (currObject && currObject.length != 0) {
        for (var i = 0;i < currObject.length;i++) {
            var type = currObject[i].getAttribute("type");
            var DBT = currObject[i].getAttribute("DBT");
            var DBC = currObject[i].getAttribute("DBC");
            if (isME) {
                if (DBC == null || typeof (DBC) == 'undefined')
                    continue;
            }
            else {
                if ((DBT == null || typeof (DBT) == 'undefined') && (DBC == null || typeof (DBC) == 'undefined'))
                    continue;
            }
            if (typeof (type) == 'undefined')
                break;
            switch (type.toUpperCase()) {
                case 'CHECKBOX': {
                    appendCheckBoxValue(currObject[i], id, blockId);
                    break;
                }
                case 'RADIO': {
                    appendRadioValue(currObject[i], id, blockId);
                    break;
                }
                default : {
                    appendTextFieldValue(currObject[i], id, blockId);
                    break;
                }
            }
        }
    }
}

function appendSelectData(FldSetObject, blockId, id, isME) {
    var currObject = FldSetObject.getElementsByTagName("SELECT");
    if (currObject && currObject.length != 0) {
        for (var i = 0;i < currObject.length;i++) {
            var DBT = currObject[i].getAttribute("DBT");
            var DBC = currObject[i].getAttribute("DBC");
            if (isME) {
                if (DBC == "" || typeof (DBC) == 'undefined')
                    continue;
            }
            else {
                if ((DBT == "" || typeof (DBT) == 'undefined') && (DBC == "" || typeof (DBC) == 'undefined'))
                    continue;
            }
            appendSelectFieldValue(currObject[i], id, blockId);
        }
    }
}

function appendTextAreaData(FldSetObject, blockId, id, isME) {
    var currObject = FldSetObject.getElementsByTagName("TEXTAREA");
    if (currObject && currObject.length != 0) {
        for (var i = 0;i < currObject.length;i++) {
            var DBT = currObject[i].getAttribute("DBT");
            var DBC = currObject[i].getAttribute("DBC");
            if (isME) {
                if (DBC == "" || typeof (DBC) == 'undefined')
                    continue;
            }
            else {
                if ((DBT == "" || typeof (DBT) == 'undefined') && (DBC == "" || typeof (DBC) == 'undefined'))
                    continue;
            }
            appendTextFieldValue(currObject[i], id, blockId);
        }
    }
}

function goToRec(recNum) {

    /*
    if (!selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FLD")) {
        var fldStartIndex1 = msgxml.indexOf("<FLD");
        var fldEndIndex1 = msgxml.indexOf("</FLD>");
        msgxml_fld = msgxml.substring(fldStartIndex1, fldEndIndex1);
        msgxml_fld = msgxml_fld + "</FLD>";
        var fldDom = loadXMLDoc(msgxml_fld);
        fcjResponseDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(fldDom.documentElement));
    }
    */
    isHeaderFooterLoaded = false;//Header/Footer field change
    // Ashok Commeneted as part of 12.1
    pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, recNum);
    setDataXML(getXMLString(pureXMLDOM));
    if (mainWin.DebugWindowFlg == "Y") {
        //debugs("Calling set data ,Message XMLDOM", getXMLString(pureXMLDOM));
        debugs("Calling set data ,Message XMLDOM", "");
    }
    if (typeof (multiBrnAccessReq) != "undefined" && multiBrnAccessReq == "Y" && mainWin.multiBranchOperation == "Y") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {
            txnBranchDBT_DBC = txnBranchFld.split("__");
            var txnBrn = getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(txnBranchDBT_DBC[0]) + "/" + txnBranchDBT_DBC[1]));
            g_txnBranch = txnBrn;
            debugs("Calling fnUpdateTxnBrnVariables Branch=", txnBrn);
            if (!fnUpdateTxnBrnVariables(txnBrn)) {
                debugs("fnUpdateTxnBrnVariables failed ", "");
                return;
            }
        }
    }
    if (typeof (screenType) != 'undefined' && screenType != "D") {
        debugs("Calling showData", "");
        showData();
    }
    else {
        debugs("Calling showData", "");
        var fldSetList = document.getElementsByTagName("fieldset");
        showFldsetData(fldSetList);
    }

}

function showAllData() {
    var tabList = document.getElementById("tablist");
    var tabs = "";
    //Header
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "")
        showTabData(strHeaderTabId);

    showTabData(strCurrentTabId);
    tempCurrentTabId = strCurrentTabId;

    if (arguments.callee.caller.toString()) {
        if (arguments.callee.caller.toString().indexOf("fnBuildTabHTML") < 0) {
            fnBuildTabHTML(true);
        }
    }

    if (document.getElementById("tablist")) {
        tabs = tabList.getElementsByTagName("li");
        for (var tabCnt = 0;tabCnt < tabs.length;tabCnt++) {
           if(! tabs[tabCnt].classList.contains( "oj-navigationlist-divider") && tempCurrentTabId != tabs[tabCnt].childNodes[0].id ){ //OJET Migration
            strCurrentTabId = tabs[tabCnt].childNodes[0].id;
            showTabData(strCurrentTabId);
           }
        }
    }
    strCurrentTabId = tempCurrentTabId;
    //Footer
//    if (typeof (strFooterTabId) != 'undefined' && strFooterTabId != "")
//        showTabData(strFooterTabId);
}

function showData() {
    if (dbDataDOM == null) {
        return;
    }
    //var d = getDateObject();   
    //var startUp= "Startup:--" + d.getHours() + ":" + d.getMinutes()+ ":" +d.getSeconds()+":"+d.getMilliseconds() ;  
    //var d = getDateObject();   
    //var startUp= "Startup:--" + d.getHours() + ":" + d.getMinutes()+ ":" +d.getSeconds()+":"+d.getMilliseconds() ;  
    if (typeof (strHeaderTabId) != 'undefined' && strHeaderTabId != "") {
        debugs("showing data for TAB=" + strHeaderTabId, "");
        showTabData(strHeaderTabId);
    }
    if (typeof (strCurrentTabId) != 'undefined' && strCurrentTabId != "") {
        debugs("showing data for TAB=" + strCurrentTabId, "");
        showTabData(strCurrentTabId);
    }
//    if (typeof (strFooterTabId) != 'undefined' && strFooterTabId != "") {
//        debugs("showing data for TAB=" + strFooterTabId, "");
//        showTabData(strFooterTabId);
//        debugs("showing data for TAB done", "");
//    }

    //var d1 = getDateObject();   
    //var startUp1= "\n --StartUp1" + d1.getHours() + ":" + d1.getMinutes()+ ":" +d1.getSeconds()+":"+d1.getMilliseconds() ;  
    //alert(startUp + startUp1);
}

function getDbIndex(DBT) {
    if (typeof (dbIndexArray[DBT] == 'undefined')) {
        dbIndexArray[DBT] = 1;
    }
    return dbIndexArray[DBT];
}

function showTabData(objName) {
    isformat = false;
    if (dbDataDOM == null) {
        return;
    }

    //Ashok Commenetd this as part of 12.0.2, not used.            
    //buildIsQuery();
    //buildIsControl();
    var tabObject = document.getElementById("TBLPage" + objName);

    if (tabObject.innerHTML == "") {
        if (typeof (xmlFileName) != 'undefined') {
            var html = ShowXMLTabNew(xmlFileName, 'ExtDetailTab.xsl', strScreenName, objName);//12.1 Caching Tab load
            //debugs("tabsContent=", html);
            //if (getBrowser().indexOf("IE") != -1) {//12.1 Caching Tab load
            if(html!= '' && html!=null){
                 screenKo.cleanNode(tabObject);
                html = html.replace(new RegExp("readonly_temp", 'g'), "readonly");
            tabObject.innerHTML = html;
                
                 if (getBrowser().indexOf("FIREFOX") !=  - 1) {
                     tabObject.innerHTML = tabObject.innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
                 }
                fnBindScreenElements(tabObject);//OJET Migration
                screenKo.applyBindings( {},tabObject);
                 if (tabObject.id != strCurrentTabId){
                        tabObject.style.display = "none";
                }
            }
           
            // } else { //12.1 Caching Tab load
            // tabObject.appendChild(html);
            //}
        }
      //  fnBuildMultipleEntryArray(objName);
    }
    var fldSetList = tabObject.getElementsByTagName("fieldset");
    showFldsetData(fldSetList);
}

function showFldsetData(fldSetList) {//OJET Migration
    var recLength = 0;/*12.0.4 UI performance changes starts*/
    for (var fldSetCnt = 0;fldSetCnt < fldSetList.length;fldSetCnt++) {
        var l_curBlock = fldSetList[fldSetCnt].getAttribute("block");
        var l_fieldSetType = fldSetList[fldSetCnt].getAttribute("type");
        var l_fieldSetView = fldSetList[fldSetCnt].getAttribute("view");
        if (l_fieldSetType == 'ME' && l_fieldSetView != 'SE') {//debugger;
            var l_tableobj = document.getElementById(l_curBlock);// getTableObjForBlock(l_curBlock);
            if (l_tableobj) {
                nodeName = l_curBlock;//l_tableobj.id
                if (nodeName && nodeName != "") {
                    query = getXPathQuery(nodeName);
                    nodeList = selectNodes(dbDataDOM, query);
//                    if ((gAction == "EXECUTEQUERY" || gAction == "") && dbDataDOM != null && isPartialDOM)/*12.0.4 UI performance changes starts*/  //21278347   //OJET Migration
//                        recLength = getBlockStructure(l_curBlock, true);
//                    else 
                       // recLength = nodeList.length;
                    //  if(typeof(recLength)=="undefined")    recLength = nodeList.length;
                    var l_Pagesize = 0;
                    if (typeof (returnMEblockpageSize(l_curBlock)) != "undefined")//getting the pagesize from SYS file array
                        l_Pagesize = Number(returnMEblockpageSize(l_curBlock));
                    else 
                        l_Pagesize = Number(l_tableobj.getAttribute("pgsize"));
                    //var l_Pagesize = Number(l_tableobj.getAttribute("pgsize"));/*12.0.4 UI performance changes ends */
                    if (nodeList.length > 0) {
                        showPageWise(l_tableobj, nodeName, nodeList);
                    }
                    else {
                        dbIndexArray[nodeName] = 1;
                        deleteAllRows(nodeName);
                    }
//                    fnUpdatePgBtn(nodeName, l_Pagesize, recLength);/*12.0.4 UI performance changes */
//                    if (nodeList.length > 0)
//                        fnCheckToggleChkBox(nodeName);
                }
            }
        }
        else {
            if (l_fieldSetType == 'ME' && l_fieldSetView == 'SE') {
                var query1 = getXPathQuery(l_curBlock);
                recLength = 0; //21304112 
                if ((gAction == "EXECUTEQUERY" || gAction == "") && dbDataDOM != null && isPartialDOM)/*12.0.4 UI performance changes starts*/  // 21293786 
                    recLength = getBlockStructure(l_curBlock, true);
                if (document.getElementById("TotPageSV__" + l_curBlock)) {
                    setInnerText(document.getElementById("CurrPageSV__" + l_curBlock), dbIndexArray[l_curBlock]);

                    if (typeof (recLength) == "undefined" || recLength == 0) {
                        //Added for Action --> New and click on + 
                        setInnerText(document.getElementById("TotPageSV__" + l_curBlock), dbIndexArray[l_curBlock]);/*12.0.4 UI performance changes ends*/
                        if (dbIndexArray[l_curBlock] < selectNodes(dbDataDOM, query1).length)
                            setInnerText(document.getElementById("TotPageSV__" + l_curBlock), selectNodes(dbDataDOM, query1).length);
                    }
                    else {
                        setInnerText(document.getElementById("TotPageSV__" + l_curBlock), recLength);
                        if (dbIndexArray[l_curBlock] < selectNodes(dbDataDOM, query1).length)
                            setInnerText(document.getElementById("TotPageSV__" + l_curBlock), recLength);
                    }
                    //if (dbIndexArray[l_curBlock] < selectNodes(dbDataDOM, query1).length) setInnerText(document.getElementById("TotPageSV__" + l_curBlock), selectNodes(dbDataDOM, query1).length);
                    /*12.0.4 UI performance changes ends*/
                    fnUpdateSEPgBtn(l_curBlock);
                }
				 //21461697 starts
                /*if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW') {
                    if (fldSetList[fldSetCnt].getAttribute("MESVNODE") == "false" && selectNodes(dbDataDOM, query1).length > 0) {
                        fldSetList[fldSetCnt].setAttribute("MESVNODE", "true");
                        enableMESVFields(l_curBlock);
                    }
                }*/  //21461697 ends
            }
           // var inputElem = fldSetList[fldSetCnt].getElementsByTagName("INPUT");
            //setObjData(inputElem);
          /*  var inputElem = fldSetList[fldSetCnt].getElementsByTagName("OJ-INPUT-TEXT"); //Arun added
            setObjData(inputElem);//OJET Migration
            var inputElem = fldSetList[fldSetCnt].getElementsByTagName("OJ-INPUT-NUMBER"); //Arun added
            setObjData(inputElem);//OJET Migration
            var inputElem = fldSetList[fldSetCnt].getElementsByTagName("OJ-INPUT-PASSWORD"); //Arun added
            setObjData(inputElem);//OJET Migration
            var selectElem = fldSetList[fldSetCnt].getElementsByTagName("SELECT");
            setObjData(selectElem);
            var textareaElem = fldSetList[fldSetCnt].getElementsByTagName("TEXTAREA");
            setObjData(textareaElem);*/
            setOJInputData(fldSetList[fldSetCnt]); //OJET Migration
        }
    }
}
function setOJInputData(fldSetList ){
    var tagNameList = ["OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME","INPUT"];
    for (var k = 0;k < tagNameList.length;k++) {
            var selectElem = fldSetList.getElementsByTagName(tagNameList[k]);
            setObjData(selectElem);
    }
}

function setObjData(chidEle) {
    for (var child = 0;child < chidEle.length;child++) {
        DBT = chidEle[child].getAttribute("DBT");
        DBC = chidEle[child].getAttribute("DBC");
        if (DBT && DBC) {
            setFieldData(chidEle[child], "");
            query = getXPathQuery(DBT);
            if (chidEle[child].getAttribute("MEBLOCKID"))
                query = query + "[@ID=" + dbIndexArray[DBT] + "]";
            query = query + "/" + DBC;
            node = selectSingleNode(dbDataDOM, query);
            if (node) {
                nodeName = node.nodeName;
                var object = document.getElementById(DBT + "__" + nodeName);
                var data = "";
                if (node.childNodes.length == 1) {
                    data = node.childNodes[0].nodeValue;
                }
                else if (node.childNodes.length > 1) {
                    data = getNodeText(node);
                }
                setFieldData(object, data);
            }
        }
		//9NT1606_12_4_RETRO_12_0_3_26550099 starts
        else {
        if(viewMnt  && typeof (functionId) != 'undefined' && (functionId=='CSCFNUDF'||
        functionId=='CSCTRUDF') ){
         var object = document.getElementById(chidEle[child].getAttribute("ID"));
         if(object && object!=undefined){
         var data = object.value;
         setFieldData(object, data);
         }
        }
        }
		//9NT1606_12_4_RETRO_12_0_3_26550099 ends
    }
}

function setFieldData(object, data) {
    if (data && data != undefined) {
        if (data.indexOf("\n") == 0) {
            data = data.substring(1, data.length);
        }
        if (object) {
            if (viewMnt) {
                setDataViewChg(object, data);
            }
            else {
                setData(object, data);
            }
        }
    }
    else {
        if (object) {
            if (viewMnt) {
                setDataViewChg(object, "");
            }
            else {
                setData(object, "");
            }
        }
    }
}

function setData(currObject, value) {//OJET Migration
    var tagName = currObject.tagName;
    switch (tagName.toUpperCase()) {
    case "OJ-INPUT-TEXT": //OJET Migration
    case "OJ-INPUT-PASSWORD":
    case "OJ-RADIOSET":
    case "OJ-TEXT-AREA":
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
            currObject.value = value;
            if (value == "") {
                if (currObject.getAttribute("HIDDEN_TYPE")&& currObject.getAttribute("DEFAULT")) {
                    currObject.value = currObject.getAttribute("DEFAULT");
                }
            }
            
            
//                if (currObject.getAttribute("type") != null)
//                var type = currObject.getAttribute("type");
//                else var type = currObject.type;
//                switch (type.toUpperCase()) {
//                    case 'TEXT':
//                    case 'PASSWORD': {
//                        if (value == "") {
//                            if (currObject.getAttribute("DEFAULT")) {
//                                currObject.value = currObject.getAttribute("DEFAULT");
//                                break;
//                            }
//                        }
//                        //Added to format the number in number field
//                        if (getOuterHTML(currObject).indexOf("fnValidateRange") !=  - 1 && getOuterHTML(currObject).indexOf("acceptInputAmount") ==  - 1) {
//                            if (value != "") {
//                                currObject.value = Number(value);
//                                break;
//                            }
//                        }
//                        currObject.value = value;
//                        break;
//                    }
//                    case 'HIDDEN': {
//                        if (value == "") {
//                            if (currObject.getAttribute("DEFAULT")) {
//                                currObject.value = currObject.getAttribute("DEFAULT");
//                            }
//                            else {
//                                currObject.value = value;
//                                fireHTMLEvent(currObject, "onpropertychange");
//                            }
//                        }
//                        else {
//                            if (getOuterHTML(currObject).indexOf("displayAmount") !=  - 1) {
//                                currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
//                                fireHTMLEvent(currObject, "onpropertychange");
//                                validateResponseAmount(currObject.name, currObject.getAttribute("related_ccy"), getNextSibling(getNextSibling(currObject)));
//                                break;
//                            }
//                            else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") !=  - 1) {
//                                currObject.value = value.replace(decimalSymbol, ".");
//                                fireHTMLEvent(currObject, "onpropertychange");
//                                break;
//                            }
//                            currObject.value = value;
//                            fireHTMLEvent(currObject, "onpropertychange");
//                        }
//                        break;
//                    }
//                    
//                    case 'RADIO': {
//                        setRadioButtonData(currObject, value);
//                        break;
//                    }
                //}
                break;
            }
        }
        
        case "OJ-SELECT-SINGLE": {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                if (value != "") {
                    currObject.value = value;
                }
            }
            break;
        }
        case 'INPUT': {
            if (currObject.type.toUpperCase() == 'HIDDEN') {
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                    }
                } else {
                    currObject.value = value;
                }
            }
            break;
        }
        case 'SELECT': {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                setSelectedIndex(currObject, value);
            }
            break;
        }
          case "OJ-INPUT-DATE-TIME":
          case "OJ-INPUT-DATE":{
            var DBC = NVL(currObject.getAttribute("DBC"));
   
               if (DBC) {
               
                    currObject.value =value;
                }
            
            break;
          }
        case "OJ-INPUT-NUMBER": {
         var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                if(value == ""){
                   // currObject.value = null;
                }else{
                    currObject.value =Number(value);
                }
            }
            break;
        }
        case 'OJ-SWITCH': {
            if (value == "") {
                if (currObject.getAttribute("DEFAULT"))
                    currObject.value = true;
                else 
                    currObject.value = false;
                break;
            }
            if (currObject.getAttribute("ON")) {
                if (value == currObject.getAttribute("ON")) {
                    currObject.value = true;
                }
            }
            else {
                if (value == CHECK_B0X_SELECTED_VALUE) {
                    currObject.value = true;
                }
            }
            if (currObject.getAttribute("OFF")) {
                if (value == currObject.getAttribute("OFF")) {
                    currObject.value = false;
                }
            }
            else if (value == CHECK_B0X_UNSELECTED_VALUE) {
                currObject.checked = false;
            }
            break;
        }
        case 'TEXTAREA': {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                currObject.value = value;
            }
            break;
        }
        case 'LABEL': {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                currObject.innerHTML = value;
            }
        }
    }
}

function setSelectedIndex(selectObject, value) {
    for (var index = 0;index < selectObject.options.length;index++) {
        if (selectObject.options[index].value == value) {
            selectObject.selectedIndex = index;
            break;
        }
    }
    if (selectObject.getAttribute("ROSELECT")) {
        fnShowROSelectValue(selectObject);
    }
}

function getNodeForquery(query) {
    if (!v_CacheNodeArr[query])
        v_CacheNodeArr[query] = selectSingleNode(dbDataDOM, query);
    return v_CacheNodeArr[query];
}
function updateAmountOrNumberConverter(parentNodeName) {
    //debugger;
    var ojTableObj = getTableObjForBlock(parentNodeName);
//    
//         while(ojTableObj.tBodies[0].rows[0].cells.length == 1){
//              setTimeout(function(){updateAmountOrNumberConverter(parentNodeName);},100);
//              return;
//         }
         
       if(!ojTableObj.tBodies[0].rows[0] || (ojTableObj.tBodies[0].rows[0] && ojTableObj.tBodies[0].rows[0].cells.length == 1 )){
              setTimeout(function(){updateAmountOrNumberConverter(parentNodeName);},100);
              return;
       }
//         var execute=true;
//         
//         do{
//             if(ojTableObj.tBodies[0].rows){
//                 if(ojTableObj.tBodies[0].rows[0]&& ojTableObj.tBodies[0].rows[0].cells.length >1){
//                    //setTimeout(function(){updateAmountOrNumberConverter(parentNodeName);},0);
//                    execute = false;
//                 }else{
//                     document.getElementById(parentNodeName).refresh();
//                 }
//             } 
//             
//         }while(execute);
         
    if (ojTableObj.tBodies[0].rows.length > 0) {
        for (var i = 0;i < ojTableObj.tBodies[0].rows.length;i++) {
            var ojText = ojTableObj.tBodies[0].rows[i].getElementsByTagName('OJ-INPUT-TEXT');
            for (k = 0;k < ojText.length;k++) {
                if (ojText[k].getAttribute("converter") != null) {
                    var converterName = ojText[k].getAttribute("converter");
                    if (converterName.includes("numberConverter")) {
                        var formattedValue = displayFormattedNumber(ojText[k], ojText[k].value);
                        ojText[k].value = formattedValue;
                    }
                    if (converterName.includes("amountConverter")) {
                        var ccy = getCurrencyValue(ojText[k],  ojText[k].getAttribute("related_field"), false, true);
                        var mb3Amount = new MB3Amount( ojText[k].value, true, ccy);
                        if (mb3Amount.valid) {
                            ojText[k].value = mb3Amount.getDisplayAmount();
                        }
                        
                    }
                    //                   var converterName = ojText[k].getAttribute("converter");
                    //                   if(converterName.indexOf("numberConverter")!= -1){
                    //                        var id = ojText[k].getAttribute(":id").replace("'+ row.index]]","").replace("[['","").replace("RC","");
                    //                    converterName = "numberConverter"+id;
                    //                    var fnEval = new Function( converterName+i+"=getDefaultNumberConverter('"+id+"RC"+i+"',  false,'"+ ojText[k].getAttribute("name")+"');"+  converterName+i+".index="+i);
                    //                    fnEval();
                    //                    ojText[k].setAttribute("converter","{{numberConverter"+id+i+"}}");
                    //                   }
                }
            }

        }

    }

}

function showPageWise(htmlTableObj, parentNodeName, nodeList, isNew) {
    //debugger;
    //meArrayForAddDelete[parentNodeName]([]); //REDWOOD CHANGES
   // document.getElementById(parentNodeName).refresh();
    //    document.getElementById('paging_'+parentNodeName).refresh();
    if(nodeList.length>0){
    setTimeout(function () {
        addRowsFromDOM(htmlTableObj, parentNodeName, nodeList, isNew);
//            updateAmountOrNumberConverter(parentNodeName);
        },
        0);
        setTimeout(function () {
            updateAmountOrNumberConverter(parentNodeName);
    },
    0);
       
    }else{
        document.getElementById(parentNodeName).refresh();
    }
    

    //    if(parentNodeName == 'BLK_INSTRU')
    //    BLK_INSTRUdataprovider = new pagingDataProviderView(new tempArrayDataProvider( meArrayForAddDelete[parentNodeName]));
    //if(parentNodeName == 'BLK_PFINSTASSET')
    //   BLK_PFINSTASSETdataprovider = new pagingDataProviderView(new tempArrayDataProvider( meArrayForAddDelete[parentNodeName]));
    //    document.getElementById('paging_'+parentNodeName).refresh();  
    // document.getElementById(parentNodeName).refresh();
    //var rowIndex =l_tableObj.tBodies[0].rows.length;
    // l_tableObj.tBodies[0].rows[rowIndex-1].cells[0].focus();
    // document.getElementById(tableName).refresh();
    // newRow = callAddNewRow(tableName, index);
    //document.getElementById(parentNodeName).refresh();
}

function addRowsFromDOM(htmlTableObj, parentNodeName, nodeList, isNew) {

    if( nodeList.length ==meArrayForAddDelete[parentNodeName]().length ){
      return;
    }
        
    var ojTableObj = document.getElementById(parentNodeName);
    if (ojTableObj) {
        var templateObj = ojTableObj.getElementsByTagName("template")[0];
        var tdObj = templateObj.content.querySelectorAll("td");
    }
    for(var i = 0;i<nodeList.length;i++){
        var singleRec = nodeList[i];
        
        var singleRecObj = Object.assign( {
        },
        multipleEntryFieldList[parentNodeName]);
        if (gAction != '' && gAction != 'EXECUTEQUERY'  ) {
            singleRecObj['readOnly'] = false;
        }else{
             singleRecObj['readOnly'] = true;
        }
        
    
        
        for(var k=0; k<singleRec.childNodes.length;k++){
            var nodeName = singleRec.childNodes[k].nodeName;
            if(multipleEntryIDs.includes(nodeName)){
                continue;
            }
            for(var tdObjCnt = 0; tdObjCnt<tdObj.length ; tdObjCnt++) {
                var tdObjElem = tdObj[tdObjCnt].children[0].children[0];
                if(tdObjElem &&tdObjElem.tagName.toUpperCase() == "DIV") { //only for number
                    tdObjElem = tdObj[tdObjCnt].children[0].children[0].children[0];
                }
                if(tdObjElem.getAttribute("name") == nodeName) {
                
                  if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH') {
                        if (tdObjElem.tagName.toUpperCase() == "OJ-INPUT-TEXT") {
                            var len = tdObjElem.getElementsByTagName("OJ-BUTTON").length;
                            for (var btnIndx = 0;btnIndx < len;btnIndx++) {
                                if (tdObjElem.getElementsByTagName("OJ-BUTTON")[btnIndx]) {
                                    tdObjElem.getElementsByTagName("OJ-BUTTON")[btnIndx].setAttribute("disabled", false);
                                }
                            }

                        }
                }
                
                    if(tdObjElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER") {
                        if(getNodeText(singleRec.childNodes[k])!=null && getNodeText(singleRec.childNodes[k])!=''){
                            singleRecObj[nodeName] = Number(getNodeText(singleRec.childNodes[k]));
                        }
                       
                    } else if(tdObjElem.tagName.toUpperCase() == "OJ-SWITCH") {
                        if(getNodeText(singleRec.childNodes[k])!=null && getNodeText(singleRec.childNodes[k])!=''){
                            if(tdObjElem.getAttribute("ON") == getNodeText(singleRec.childNodes[k])) {
                                singleRecObj[nodeName] = true;
                            } else {
                                singleRecObj[nodeName] = false;
                            }
                        }
                    } else {
                        singleRecObj[nodeName] = getNodeText(singleRec.childNodes[k]);
                    }
                    break;
                }
                
                 if (tdObjElem.tagName.toUpperCase() == "OJ-BUTTON") {
                     if( gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH' ){
                          tdObjElem.setAttribute("disabled",false);
                     }else{
                          tdObjElem.setAttribute("disabled",true);
                     }
                    
                }
            }
        }
        
       // var jsonObj =  xmlToJson(singleRec);
        //debugger;
         meArrayForAddDelete[parentNodeName].push(singleRecObj);
       // document.getElementById(parentNodeName).refresh();
         
        //         document.getElementById('paging_'+parentNodeName).refresh();
    //var rowIndex =l_tableObj.tBodies[0].rows.length;
   // l_tableObj.tBodies[0].rows[rowIndex-1].cells[0].focus();
    // document.getElementById(tableName).refresh();
   // newRow = callAddNewRow(tableName, index);
  //  document.getElementById(tableName).refresh();
      //   showTable(true);
    }

}

//OJET Migration
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		/*if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}*/
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
function showPageWise_old(htmlTableObj, nodeName, nodeList, isNew) {
    //12.0.3 ME changes
    if (!htmlTableObj) {
        var tabObject = document.getElementById("TBLPage" + strCurrentTabId);
        var TableObjArr = tabObject.getElementsByTagName("table");
        for (TableIndex = 0;TableIndex < TableObjArr.length;TableObjArr++) {
            if (TableObjArr[TableIndex].id == nodeName) {
                htmlTableObj = TableObjArr[TableIndex];
                break;
            }
        }
    }
    if (!nodeList) {
        nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
    }
    //var pageSize = Number(htmlTableObj.getAttribute("pgsize"));
    /*12.0.4 UI performance changes starts*/
    var flag = false;//12.0.3 ME changes
    var pageSize = 0;
    if (typeof (returnMEblockpageSize(nodeName)) != "undefined")//getting the pagesize from SYS file
        pageSize = Number(returnMEblockpageSize(nodeName));
    else 
        pageSize = Number(htmlTableObj.getAttribute("pgsize"));
    /*12.0.4 UI performance changes ends*/
    var startIndex = Math.floor(dbIndexArray[nodeName] / pageSize) * pageSize + 1;
    //12.0.3 ME changes starts 
    var l_CurPage = Math.floor(dbIndexArray[nodeName] / pageSize);
    var tmp_CurPage = getInnerText(document.getElementById("CurrPage__" + nodeName));

    if (isNew == true) {
        if (dbIndexArray[nodeName] % pageSize != 0)
            l_CurPage++;

        if (l_CurPage == 0)
            l_CurPage = 1;

        if (l_CurPage > tmp_CurPage) {
            deleteAllRows(nodeName);
            flag = true;
            fnUpdatePgBtn(nodeName, pageSize, dbIndexArray[nodeName]);//Append data requires, current page should update
        }
    }
    //12.0.3 ME changes ends 
    if ((dbIndexArray[nodeName]) % pageSize == 0) {
        startIndex = startIndex - pageSize;
    }
    var endIndex = startIndex + pageSize - 1;

    if (nodeList.length <= endIndex && !flag && isNew == true)// if its current page not requires to create new row  12.0.4 changes
        return;//12.0.3 ME changes
    if (endIndex > nodeList.length)
        endIndex = nodeList.length;

    //var d = getDateObject();   
    //var startUp= "Startup:--" + d.getHours() + ":" + d.getMinutes()+ ":" +d.getSeconds()+":"+d.getMilliseconds();  
    if (isNew != true)//12.0.3 ME changes 
        deleteAllRows(nodeName);

    if (nodeList.length == 0)
        return;
    var rowIndx = 0;
    for (var nodeIndex = startIndex - 1;nodeIndex < endIndex;nodeIndex++) {
        var newRow = addNewRow(nodeList[nodeIndex].nodeName, nodeIndex);
        setRowData(htmlTableObj.tBodies[0].rows[rowIndx], nodeList[nodeIndex]);
        var l_RowtobeSel = dbIndexArray[nodeName];
        if (dbIndexArray[nodeName] > pageSize)
            l_RowtobeSel = Number(dbIndexArray[nodeName]) - (Number(Math.floor(dbIndexArray[nodeName] / pageSize)) * pageSize);

        if ((dbIndexArray[nodeName] % pageSize) == 0)
            l_RowtobeSel = endIndex - (startIndex - 1);
        try {
            if ((l_RowtobeSel - 1) == rowIndx) {
                newRow.cells[0].getElementsByTagName("INPUT")[0].checked = true;
                if (tempCurrentTabId == strCurrentTabId) {

                    if (arguments.callee.caller.toString()) {

                        if (arguments.callee.caller.toString().indexOf("showDescendants") =  - 1) {
                            //Fix for 21362792
                            try {
                                if (newRow.cells[0].children[0].children[0]) {
                                    newRow.cells[0].children[0].children[0].focus();
                                }
                                else {
                                    newRow.cells[0].children[0].focus();
                                }

                            }

                            catch (ex) {
                                newRow.cells[0].children[0].focus();
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
        }
        rowIndx++;
    }
    if (htmlTableObj.tBodies[0].rows.length == 1) {
        document.getElementById(nodeName + "Header_CHK_ME").checked = true;//Static Header change
    }
    else {
        document.getElementById(nodeName + "Header_CHK_ME").checked = false;//Static Header change
    }

    //var d1 = getDateObject();   
    //var startUp1= "--StartUp1" + d1.getHours() + ":" + d1.getMinutes()+ ":" +d1.getSeconds()+":"+d1.getMilliseconds() ;  
    //alert(startUp + "\n" + startUp1);
}

function setRowData(rowObject, currNode) {
    var cells = rowObject.cells;
    for (var cellIndex = 0;cellIndex < cells.length;cellIndex++) {
        if (viewMnt) {
            setCellDataViewChg(cells[cellIndex], currNode);
        }
        else {
            setCellData(cells[cellIndex], currNode);
        }
    }
}

function setCellData(cellObject, currNode, color, action) {
    var inputElem = cellObject.getElementsByTagName("INPUT");
    setTableInputData(inputElem, currNode, color, action);
	var inputElem = cellObject.getElementsByTagName("OJ-INPUT-TEXT");//OJET Migration
    setTableInputData(inputElem, currNode, color, action);
    var selectElem = cellObject.getElementsByTagName("SELECT");
    setTableSelectData(selectElem, currNode, color, action);
    var textareaElem = cellObject.getElementsByTagName("TEXTAREA");
    setTableTextAreaData(textareaElem, currNode, color, action);
}

function setTableInputData(inputElem, currNode, color, action) {
    for (var elementIndex = 0;elementIndex < inputElem.length;elementIndex++) {
        var currObject = inputElem[elementIndex];
        var tagName = currObject.tagName;
        var DBC = NVL(currObject.getAttribute("DBC"));
        if (DBC) {
            DBC = DBC.toUpperCase();
            var type = currObject.getAttribute("type");
            var nodeValue = NVL(selectSingleNode(currNode, DBC));
            if (selectSingleNode(currNode, DBC) == null) {
                if (selectSingleNode(currNode, "./*[@Type='SINGLE']")) {
                    if (selectSingleNode(currNode, "./*[@Type='SINGLE']/" + DBC))
                        nodeValue = selectSingleNode(currNode, "./*[@Type='SINGLE']/" + DBC);
                }
            }
            if (!nodeValue) {
                continue;
            }
            var fieldValue = "";
            if (nodeValue.childNodes[0]) {
                fieldValue = nodeValue.childNodes[0].nodeValue;
            }
			var fldValue = fieldValue; //25401641  Changes
            switch (type.toUpperCase()) {
                case 'TEXT':
                case 'PASSWORD':
                case 'HIDDEN': {
                    if (typeof (action) != "undefined") {
                        if (action == 'M') {
							//9NT1606_12_5_RETRO_12_3_28176165 Change start
                            /*var s1 = fieldValue.indexOf("(");
                            var s2 = fieldValue.indexOf(")");*/
							var s1 = fieldValue.lastIndexOf("_OB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                            var s2 = fieldValue.lastIndexOf("_CB_");  //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
							//9NT1606_12_5_RETRO_12_3_28176165 Change end
                            if (s1 >= 0) {
                                var curval = fieldValue.substring(0, s1);
                                var preval = fieldValue.substring(s1 + 4, s2); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                                if (currObject) {
                                    currObject.classList.add(color);
                                    currObject.title = preval;
                                    fieldValue = curval;
                                   //JC_TO_MINICORE STARTS
                                   /* if (typeof (currObject.parentNode.childNodes[1]) != "undefined" && currObject.parentNode.childNodes[1].tagName == "INPUT") {
                                        currObject.parentNode.childNodes[1].style.color = color;
                                        currObject.parentNode.childNodes[1].title = preval;
                                    }*/
                                    

                                    if (inputElem.length >1) {
										currObject.parentNode.getElementsByTagName("INPUT")[elementIndex+1].classList.add(color);
					 currObject.parentNode.getElementsByTagName("INPUT")[elementIndex+1].title = preval;
			   	} 
                                    //JC_TO_MINICORE ENDS
                                }
                            }
                        }
                        else if (action == "") {
                        }
                        else {
                            if (currObject.style) {
                                if (color) {
                                    currObject.classList.add(color);
                                    //JC_TO_MINICORE STARTS
                                    /*if (typeof (currObject.parentNode.childNodes[1]) != "undefined" && currObject.parentNode.childNodes[1].tagName == "INPUT") {
                                        currObject.parentNode.childNodes[1].style.color = color;
                                    }*/
                                    if (inputElem.length >1) {
										currObject.parentNode.getElementsByTagName("INPUT")[elementIndex+1].classList.add(color);
				}
                                    //JC_TO_MINICORE ENDS
                                }
                            }
                        }
                    }
                    currObject.value = fieldValue;
					/*25401641 Starts*/
					if(action == 'M' && fldValue.indexOf("(") >= 0){
						if (currObject.id) {
							var id = currObject.id + "I";
							if (document.getElementById(id)) {
								document.getElementById(id).classList.add(color);
							}
						}
					}
					/*25401641 Ends*/
                    if (getOuterHTML(currObject).indexOf("displayAmount") != -1) {
                        isformat = false;
                        currObject.value = fieldValue.replace(decimalSymbol, gDecimalSymbol);
                        fireHTMLEvent(currObject, "onpropertychange");
                        break;
                    }
                    else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") !=  - 1) {
                        currObject.value = fieldValue.replace(decimalSymbol, ".");
                        fireHTMLEvent(currObject, "onpropertychange");
                        break;
                    }//Changes_prefix_rateType_Fields starts
					else if (getOuterHTML(currObject).indexOf("displayRate") != -1) {
                        currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
                        fireHTMLEvent(currObject, "onpropertychange");
                        break;
                    }
					//Changes_prefix_rateType_Fields ends
                    fireHTMLEvent(currObject, "onpropertychange");
                    break;
                }
                case 'CHECKBOX': {
                    if (typeof (action) != "undefined") {
                        if (action == 'M') {
                            //9NT1606_12_5_RETRO_12_3_28176165 Change start
                            /*var s1 = fieldValue.indexOf("(");
                            var s2 = fieldValue.indexOf(")");*/
							var s1 = fieldValue.lastIndexOf("_OB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified 
                            var s2 = fieldValue.lastIndexOf("_CB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
							//9NT1606_12_5_RETRO_12_3_28176165 Change end
                            if (s1 >= 0) {
                                var curval = fieldValue.substring(0, s1);
                                var preval = fieldValue.substring(s1 + 4, s2);//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                                if (currObject) {
                                    fieldValue = curval;
                                    currObject.title = preval;
                                    currObject.style.backgroundColor = color;
                                }
                            }
                        }
                    }
                    if (currObject.getAttribute("ON")) {
                        if (fieldValue == currObject.getAttribute("ON")) {
                            currObject.checked = true;
                        }
                    }
                    else {
                        if (fieldValue == CHECK_B0X_SELECTED_VALUE) {
                            currObject.checked = true;
                        }
                    }
                    if (currObject.getAttribute("OFF")) {
                        if (fieldValue == currObject.getAttribute("OFF")) {
                            currObject.checked = false;
                        }
                    }
                    else if (fieldValue == CHECK_B0X_UNSELECTED_VALUE) {
                        currObject.checked = false;
                    }
                    break;
                }

                case 'RADIO': {
                    if (fieldValue == RADIO_BUTTON_SELECTED_VALUE) {
                        currObject.checked = true;
                    }
                    else {
                        currObject.checked = false;
                    }
                    break;
                }
            }
            break;
        }
    }
}

function setTableSelectData(selectElem, currNode, color, action) {
    for (var elementIndex = 0;elementIndex < selectElem.length;elementIndex++) {
        var currObject = selectElem[elementIndex];
        var tagName = currObject.tagName;
        var DBC = NVL(currObject.getAttribute("DBC"));
        if (DBC) {
            DBC = DBC.toUpperCase();
            var nodeValue = NVL(selectSingleNode(currNode, DBC));
            var fieldValue = getNodeText(nodeValue);
            var curval = fieldValue;
			//9NT1606_12_5_RETRO_12_3_28176165 Change Start
            /*var s1 = fieldValue.indexOf("(");
            var s2 = fieldValue.indexOf(")");*/
			var s1 = fieldValue.lastIndexOf("_OB_");//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified 
            var s2 = fieldValue.lastIndexOf("_CB_");//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified 
			//9NT1606_12_5_RETRO_12_3_28176165 Change end
            if (s1 >= 0) {
                curval = fieldValue.substring(0, s1);
                var preval = fieldValue.substring(s1 + 4, s2);//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                currObject.disabled = false;
                var l = currObject.options.length;
                for (var i = 0;i < l;i++) {
                    if (currObject.options[i].value == preval) {
                        currObject.title = currObject.options[i].innerHTML;
                        currObject.options[i].classList.add(deleted);
                    }
                    if (currObject.options[i].value == curval) {
                        currObject.options[i].classList.add(modified);
                    }
                }
				currObject.className="";
				currObject.classList.add(modified);
				
                currObject.setAttribute("onchange", function () {
                    for (var index = 0;index < currObject.parentElement.options.length;index++) {
                        if (currObject.parentElement.options[index].value == curval) {
                            currObject.parentElement.selectedIndex = index;
                        }
                    }
                });
            }
            setSelectedIndex(currObject, curval);
        }
        return;
    }
}

function setTableTextAreaData(textareaElem, currNode, color, action) {
    for (var elementIndex = 0;elementIndex < textareaElem.length;elementIndex++) {
        var currObject = textareaElem[elementIndex];
        var tagName = currObject.tagName;
        var DBC = NVL(currObject.getAttribute("DBC"));
        if (DBC) {
            var nodeValue = NVL(selectSingleNode(currNode, DBC));
            var fieldValue = getNodeText(nodeValue);
            if (typeof (action) != "undefined") {
                if (action == 'M') {
                    // color attribute for Auth
					//9NT1606_12_5_RETRO_12_3_28176165 Change Start
                    /*var s1 = fieldValue.indexOf("(");
                    var s2 = fieldValue.indexOf(")");*/
					var s1 = fieldValue.lastIndexOf("_OB_");//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                    var s2 = fieldValue.lastIndexOf("_CB_");//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified 
					//9NT1606_12_5_RETRO_12_3_28176165 Change end
                    if (s1 >= 0) {
                        var curval = fieldValue.substring(0, s1);
                        var preval = fieldValue.substring(s1 + 4, s2);//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                        if (currObject) {
                            if (currObject.id) {
                                var id = currObject.id + "I";
                                if (document.getElementById(id)) {
                                    document.getElementById(id).classList.add(modified);
                                    document.getElementById(id).title = preval;
                                }
                            }
                            currObject.classList.add(color);
                            currObject.title = preval;
                            fieldValue = curval;
                        }
                    }
                }
                else {
                    if (currObject.style) {
                        if (color)
                            currObject.classList.add(color);
                    }
                }
            }
            currObject.value = fieldValue;
        }
    }
}

function setDataInMETable(tableId, parentTableName, parentIndex) {
    deleteAllRows(tableId);
    var node = getNode(parentTableName, parentIndex);
    if (node) {
        var rowIndex = 0;
        for (var nodeIndex = 0;nodeIndex < node.childNodes.length;nodeIndex++) {
            var currNode = node.childNodes[nodeIndex];
            if (isNodeATable(currNode) && currNode.nodeName == tableId) {
                tableObject = document.getElementById(tableId);
                if (tableObject) {
                    if (currNode.childNodes.length > 0) {
                        addNewRow(tableId);
                        setRowData(tableObject.tBodies[0].rows[rowIndex], currNode);
                        rowIndex++;
                    }
                }
            }
            else {
            }
        }
    }
}

function deleteData(DBT) {
    var query = getXPathQuery(DBT) + "[@ID = " + dbIndexArray[DBT] + "]";
    var node = selectSingleNode(dbDataDOM, query);
    if (!node)
        return;
    node.parentNode.removeChild(node);
    var l_nodeList = selectNodes(dbDataDOM, getXPathQuery(DBT));
    resetNodeIdAttributes(l_nodeList);
    if (dbIndexArray[DBT] == 1) {
        var fldSetObj = document.getElementsByTagName("fieldset");
        for (var i = 0;i < fldSetObj.length;i++) {
            if (fldSetObj[i].getAttribute("block") == DBT && fldSetObj[i].getAttribute("type") == "ME" && fldSetObj[i].getAttribute("view") == "SE")
                fldSetObj[i].setAttribute("MESVNODE", "false");
        }
        disableMESVFields(DBT);
    }
    if (dbIndexArray[DBT] > 1)
        dbIndexArray[DBT] = dbIndexArray[DBT] - 1;
    showTabData(strCurrentTabId);
}

function fnBuildMultipleEntryArray(tabId) {
    if (tabId) {
        var tabObj = document.getElementById("TBLPage" + tabId);
        if (tabObj != null)
            tableObjs = tabObj.getElementsByTagName("TABLE");
    }
    else {
        tableObjs = multipleEntryIDs;
    }
    if (typeof (functionId) != 'undefined' && functionId.substring(2, 3) == "S")
        multipleEntryIDs.length = 1;
    if (typeof (tableObjs) != 'undefined') {
        for (var i = 0;i < tableObjs.length;i++) {
            var objMultipleEntryTable;
            var objMultipleEntryTableHeader;//Static Header change
            if (typeof (functionId) != 'undefined' && functionId.substring(2, 3) == "S") {
                objMultipleEntryTable = document.getElementById(g_SummaryBlock);
            }
            else {
                if (typeof (tableObjs[i].id) != 'undefined')
                    objMultipleEntryTable = getTableObjForBlock(tableObjs[i].id);
                else 
                    objMultipleEntryTable = getTableObjForBlock(tableObjs[i]);
            }
            if (objMultipleEntryTable) {
                if (objMultipleEntryTable.getAttribute('name') == 'MEHeader')
                    continue;//static header change
                var objMultipleEntryTableHeader = document.getElementById(objMultipleEntryTable.id + "Header");//Static Header change
                var objLabelRow = objMultipleEntryTableHeader.tBodies[0].rows[0];
                var objFirstRow = objMultipleEntryTable.tBodies[0].rows[0];
                var rowArr = new Array();
                var arrCells = new Array();
                //var tagName = new Array("INPUT", "SELECT", "TEXTAREA", "BUTTON");
                objMultipleEntryTableHeader.parentNode.style.width = objMultipleEntryTable.parentNode.clientWidth + "px";//Static Header change
                for (var j = 0;j < objLabelRow.cells.length;j++) {

                    /* if (j != 0) {//Static Header change start
                        for (var tag = 0; tag < tagName.length; tag++) {
                            try {
                                if (arrCells[j].getElementsByTagName(tagName[tag])[0].getAttribute("LABEL_VALUE")) {
                                    var w = 0.71 * (arrCells[j].getElementsByTagName(tagName[tag])[0].getAttribute("LABEL_VALUE").length) + 'em';
                                    objLabelRow.cells[j].children[0].style.width = w;
                                }
                            } catch (e) {}
                        }
                    }*/
                    if (j != 0) {
                        var w = Math.max(objLabelRow.cells[j].children[0].offsetWidth, objFirstRow.cells[j].children[0].offsetWidth);
                        objLabelRow.cells[j].children[0].style.width = w + "px";
                        //objFirstRow.cells[j].children[0].style.width =  w + parseInt(window.getComputedStyle(objLabelRow.cells[j].children[0], null).getPropertyValue('padding-right'))+ "px";
                        objFirstRow.cells[j].children[0].style.width = w + "px";
                    }
                    rowArr[j] = objFirstRow.cells[j].innerHTML;
                    arrCells[j] = objFirstRow.cells[j];//Static Header change end
                }
                multipleEntryArray[objMultipleEntryTable.id] = rowArr;
                multipleEntryCells[objMultipleEntryTable.id] = arrCells;
                objMultipleEntryTable.tBodies[0].deleteRow(0);
                objMultipleEntryTable.style.width = objMultipleEntryTableHeader.offsetWidth + "px";//static header change
            }
        }
    }
}

function addNewRow(tableName, index) {//OJET Migration
    var l_tableObj = getTableObjForBlock(tableName);
       
    if(document.querySelector("#"+tableName+" .oj-table-body")){
        document.querySelector("#"+tableName+" .oj-table-body").scrollIntoView(false);
        document.querySelector("#"+tableName).scrollIntoView(false);
    }
    
    if (!l_tableObj)
        return;
    if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH') {
        multipleEntryFieldList[tableName]['readOnly']=false;
    }
    showTable(false);
    var  cloneObj = Object.assign({}, multipleEntryFieldList[tableName]);
    cloneObj.readOnly = false;
    meArrayForAddDelete[tableName].push(cloneObj);
    showTable(true);//debugger;
    var rowIndex =l_tableObj.tBodies[0].rows.length;
   // l_tableObj.tBodies[0].rows[rowIndex-1].cells[0].focus();
    // document.getElementById(tableName).refresh();
   // newRow = callAddNewRow(tableName, index);
   
   // document.getElementById(tableName).refresh();
     setTimeout(function(){ 
    var rowIndex =getTableObjForBlock(tableName).tBodies[0].rows.length;
    var btns = getTableObjForBlock(tableName).tBodies[0].rows[rowIndex-1].getElementsByTagName('OJ-BUTTON');
    for(var i = 0;i<btns.length;i++){
        if( btns[i]){
             btns[i].removeAttribute('disabled');
             //btns[i].refresh();
        }
    }
    
   // if( meArrayForAddDelete[tableName]().length > getPgSize(tableName))
            var ele = document.getElementById('paging_'+tableName).getElementsByTagName('a');
            if(typeof ele[ele.length-1]!='undefined' &&  ele[ele.length-1].className.includes("oj-pagingcontrol-nav-last")){
            if(!ele[ele.length-1].getAttribute("aria-disabled")) { // && ele[ele.length-1].getAttribute("aria-disabled") != "true") {
                ele[ele.length-1].click();
            }
        }
        try {
     
        fnEventsHandler('fnPostAddNewRow_' + tableName, l_tableObj.tBodies[0].rows[rowIndex-1]);
    }
    catch (e) {
    console.log(e);
    }
    
    },0);
     
   // return newRow;
}
//function callAddNewRow(tableName, index){
//	setTimeout(function(){addNewRow1(tableName, index);},0); //OJET-Arun ; added timeout because need to bind the oj-table
//}
//
//function addNewRow1(tableName, index) {
// var l_tableObj = getTableObjForBlock(tableName);
// var rowIndex =l_tableObj.tBodies[0].rows.length;
//    //Bug 14359263 - BOSREURFCC0025 FILEDS GET ENABLED ON CLICKING CANCLE BUTTON Starts
//    if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH')
//      //  enableRowElements(l_tableObj.tBodies[0].rows[rowIndex-1]);// FIX FOR 14735962
//    //Bug 14359263 - BOSREURFCC0025 FILEDS GET ENABLED ON CLICKING CANCLE BUTTON Ends
//    //bug : 19044983 fix starts
//    /*var len = newRow.getElementsByTagName("INPUT").length;
//    for (i = 0;i < len;i++) {
//        var obj = newRow.getElementsByTagName("INPUT")[i];
//        var objid = obj.id;
//        obj.id = objid + 0;
//        obj.id = objid;
//        fireHTMLEvent(newRow.getElementsByTagName("INPUT")[i], "onpropertychange");
//    }*/
//    //bug : 19044983 fix ends 
//    try {
//        fnEventsHandler('fnPostAddNewRow_' + tableName, l_tableObj.tBodies[0].rows[rowIndex-1]);
//    }
//    catch (e) {
//    }
//    return l_tableObj.tBodies[0].rows[rowIndex-1];
//}
function addNewRow_Old(tableName, index) {
    var l_tableObj = getTableObjForBlock(tableName);
    if (!l_tableObj)
        return;
    var THElem = l_tableObj.getElementsByTagName("TH");
    for (var i = 1;i < THElem.length;i++) {
        if (THElem[i].children[0]) {
            try {
                THElem[i].children[0].removeAttribute("style");
            }
            catch (e) {
            }
        }
    }
    var newRow = null;
    var newCell = null;
    var tableBodyRef = l_tableObj.tBodies[0];
    var styleArray = multipleEntryCells[tableName];
    var tBodyHTML = multipleEntryArray[tableName];
    if (tBodyHTML) {
        newRow = document.createElement("TR");
        addEvent(newRow, "onclick", "fnMulipleEntryRow_onClick(event)");
        for (var j = 0;j < tBodyHTML.length;j++) {
            if (tBodyHTML[j] == "") {
                continue;
            }
            newCell = document.createElement("TD");
            var selRow = mainWin.getItemDesc("LBL_SELECT_ROW");
            if (typeof (index) == "undefined") {
                var rowHTML = tBodyHTML[j].replace(selRow, selRow + 0);
                newCell.innerHTML = rowHTML;
            }
            else {
                var rowHTML = tBodyHTML[j].replace(selRow, selRow + index);
                newCell.innerHTML = rowHTML;
            }
            addEvent(newCell, "class", styleArray[j].className);
            newCell.setAttribute("nowrap", "nowrap");
            if (j == 0) {
                newCell.setAttribute("scope", "row");
            }
            var checkBoxElems = newCell.getElementsByTagName("INPUT");//12.1 UI fix start
            for (var cnt = 0;cnt < checkBoxElems.length;cnt++) {
                if (typeof (checkBoxElems[cnt].type) != "undefined" && (checkBoxElems[cnt].type == "checkbox")) {
                    newCell.style.textAlign = "center";
                }
            }
            //12.1 UI fix end
            if (typeof (index) == "undefined")
                index = tableBodyRef.rows.length;
            if (index > 0) {
                var labelElem = newCell.getElementsByTagName("LABEL");
                setObjId(labelElem, index);
                var inputElem = newCell.getElementsByTagName("INPUT");
                setObjId(inputElem, index);
                var selectElem = newCell.getElementsByTagName("SELECT");
                setObjId(selectElem, index);
                var textareaElem = newCell.getElementsByTagName("TEXTAREA");
                setObjId(textareaElem, index);
                var buttonElem = newCell.getElementsByTagName("BUTTON");
                setObjId(buttonElem, index);
            }

            fnSetReferenceFiledValueAsDefaultVal(newCell);
            newRow.appendChild(newCell);
        }
    }
    //Bug 14359263 - BOSREURFCC0025 FILEDS GET ENABLED ON CLICKING CANCLE BUTTON Starts
    if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH')
        enableRowElements(newRow);// FIX FOR 14735962
    //Bug 14359263 - BOSREURFCC0025 FILEDS GET ENABLED ON CLICKING CANCLE BUTTON Ends
    tableBodyRef.appendChild(newRow);
    //bug : 19044983 fix starts
    var len = newRow.getElementsByTagName("INPUT").length;
    for (i = 0;i < len;i++) {
        var obj = newRow.getElementsByTagName("INPUT")[i];
        var objid = obj.id;
        obj.id = objid + 0;
        obj.id = objid;
        fireHTMLEvent(newRow.getElementsByTagName("INPUT")[i], "onpropertychange");
    }
    //bug : 19044983 fix ends 
    try {
        fnEventsHandler('fnPostAddNewRow_' + tableName, newRow);
    }
    catch (e) {
    }
    return newRow;
}

function setObjId(elem, index) {
    for (var i = 0;i < elem.length;i++) {
        if (elem[i].getAttribute("for") && elem[i].getAttribute("for") != "") {
            //Bug#26896721 Retro from  25985217 Starts
            //elem[i].setAttribute("for", elem[i].getAttribute("for") + index + "RC"); //Fix for 25985217 
            elem[i].setAttribute("for", elem[i].getAttribute("for") +"RC"+ index ); 
            //Bug#26896721 Retro from  25985217 Ends
        }
        else if (elem[i].id && elem[i].id != "") {
           //Bug#26896721 Retro from  25985217 Starts	 
            //elem[i].id = elem[i].id + index + "RC"; //Fix for 25985217
            elem[i].id = elem[i].id + "RC"+ index; 
            //Bug#26896721 Retro from  25985217 Ends
        }
    }
}

function displayData(DBT, node) {
    var tableObject = document.getElementById(DBT);
    if (tableObject) {
        if (tableObject.getAttribute("VIEW")) {
            setDataInSE(DBT + "__", node);
        }
        else {
            var parentName = relationArray[DBT].substring(0, relationArray[DBT].length - 2);
            setDataInMETable(DBT, parentName, dbIndexArray[parentName]);
        }
    }
    else {
        setDataInSE(DBT + "__", node);
    }
}

function setDataViewChg(currObject, value) {
    var tagName = currObject.tagName;
	 //9NT1606_12_5_RETRO_12_3_28176165 Change start
    /*var s1 = value.indexOf("(");
    var s2 = value.indexOf(")");*/
	var s1 = value.lastIndexOf("_OB_");//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
    var s2 = value.lastIndexOf("_CB_");//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified 
	//9NT1606_12_5_RETRO_12_3_28176165 Change Ends
    if (s1 !=  - 1) {
        var curval = value.substring(0, s1);
        var preval = value.substring(s1 + 4, s2); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
        if (currObject) {
            if (currObject.id) {
                var id = currObject.id + "I";
                if (document.getElementById(id)) {
                    document.getElementById(id).classList.add(modified);
                    document.getElementById(id).title = preval;
                }
            }
            value = curval;
            //View changes for Select, Check and Radio in Authscreen--Starts    
            if (tagName != "SELECT" && tagName.toUpperCase() != "OJ-SWITCH" && tagName.toUpperCase() != "OJ-RADIO-SET") {
                currObject.classList.add(modified);
                currObject.title = preval;
            }
            if (tagName.toUpperCase() == "OJ-SWITCH") {
                currObject.disabled = false;
                currObject.parentElement.classList.add(modified);
                currObject.disabled = true;
            }
            if (tagName.toUpperCase() == 'OJ-RADIO-SET') {
                currObject.disabled = false;
                //currObject.parentElement.style.color = modified; //12_0_3_RETRO_12_2_24444399 commented
                var l = document.getElementsByName(currObject.name).length;
                for (var i = 0;i < l;i++) {
                    if (document.getElementsByName(currObject.name)[i].value == preval) {
                        currObject.title = getInnerText(document.getElementsByName(currObject.name)[i].parentElement);
                        document.getElementsByName(currObject.name)[i].parentElement.classList.add(deleted);
                    }
					//12_0_3_RETRO_12_2_24444399 Starts
					if (document.getElementsByName(currObject.name)[i].value == curval) {
                        document.getElementsByName(currObject.name)[i].parentElement.classList.add(modified);
                    }
					//12_0_3_RETRO_12_2_24444399 Ends
                }
                currObject.disabled = true;
            }

            if (tagName == "SELECT") {
                currObject.disabled = false;
                var l = currObject.options.length;
                for (var i = 0;i < l;i++) {
                    if (currObject.options[i].value == preval) {
                        currObject.title = currObject.options[i].innerHTML;
                        currObject.options[i].classList.add(deleted);
                    }
                    if (currObject.options[i].value == value) {
                        currObject.options[i].classList.add(modified);
                    }
                }
				currObject.className="";
				currObject.classList.add(modified);
                currObject.setAttribute("onchange", function () {
                    for (var index = 0;index < currObject.options.length;index++) {
                        if (currObject.options[index].value == value) {
                            currObject.selectedIndex = index;
                        }
                    }
                });
            }
            //View changes for Select, Check and Radio in Authscreen--Ends
        }
    }else {//changes for 24288151 start
		if (tagName != "SELECT" && tagName.toUpperCase() != "CHECKBOX" && tagName.toUpperCase() != "OJ-RADIO-SET") {
                currObject.style.color = orignal;
            }
            if (tagName.toUpperCase() == "OJ-SWITCH") {
                currObject.parentElement.style.color = orignal;
            }
            if (tagName.toUpperCase() == 'OJ-RADIO-SET') {
                currObject.parentElement.style.color = orignal;
                var l = document.getElementsByName(currObject.name).length;
                for (var i = 0; i < l; i++) {
                        document.getElementsByName(currObject.name)[i].parentElement.style.color = orignal;
                }
            }

            if (tagName == "SELECT") {
                var l = currObject.options.length;
                for (var i = 0; i < l; i++) {
                        currObject.options[i].style.color = orignal;
                }
            }
	}//changes for 24288151 ends
	//9NT1606_12_4_RETRO_12_0_3_26550099 starts
     if(viewMnt  && typeof (functionId) != 'undefined' && (functionId=='CSCFNUDF'||
        functionId=='CSCTRUDF') && !NVL(currObject.getAttribute("DBC"))){
         setDataUDF(currObject, value);
        }
        else //9NT1606_12_4_RETRO_12_0_3_26550099 ends 
    setData(currObject, value);
}
//9NT1606_12_4_RETRO_12_0_3_26550099 starts 
function setDataUDF(currObject, value){
     var tagName = currObject.tagName;
    switch (tagName.toUpperCase()) {
        case 'INPUT': {
                if (currObject.getAttribute("type") != null)
                    var type = currObject.getAttribute("type");
                else var type = currObject.type;
                switch (type.toUpperCase()) {
                    case 'TEXT':
                    case 'PASSWORD': {
                        if (value == "") {
                            if (currObject.getAttribute("DEFAULT") && !viewMnt) { //Fix for 30358469
                                currObject.value = currObject.getAttribute("DEFAULT");
                                break;
                            }
                        }
                        //Added to format the number in number field
                        if (getOuterHTML(currObject).indexOf("fnValidateRange") !=  - 1 && getOuterHTML(currObject).indexOf("acceptInputAmount") ==  - 1) {
                            if (value != "") {
                                currObject.value = Number(value);
                                break;
                            }
                        }
                        currObject.value = value;
                        break;
                    }
                    case 'HIDDEN': {
                        if (value == "") {
                            if (currObject.getAttribute("DEFAULT")) {
                                currObject.value = currObject.getAttribute("DEFAULT");
                            }
                            else {
                                currObject.value = value;
                                fireHTMLEvent(currObject, "onpropertychange");
                            }
                        }
                        else {
                            if (getOuterHTML(currObject).indexOf("displayAmount") !=  - 1) {
                                currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
                                fireHTMLEvent(currObject, "onpropertychange");
                                validateResponseAmount(currObject.name, currObject.getAttribute("related_ccy"), getNextSibling(getNextSibling(currObject)));
                                break;
                            }
                            else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") !=  - 1) {
                                currObject.value = value.replace(decimalSymbol, ".");
                                fireHTMLEvent(currObject, "onpropertychange");
                                break;
                            }
                            currObject.value = value;
                            fireHTMLEvent(currObject, "onpropertychange");
                        }
                        break;
                    }
        }
        }
    }
}

//9NT1606_12_4_RETRO_12_0_3_26550099 ends 

function setCellDataViewChg(cellObj, currNode) {
    var action = currNode.getAttribute("ACTION");
    if (action == null || action == "null")
        action = "";
    var color = modified;
    if (action) {
        if (action == 'N')
            color = Added;
        if (action == 'D')
            color = deleted;
    }
    setCellData(cellObj, currNode, color, action);
}

var newAmountFormat = mainWin.nlsAmountFormat;
var decimalSymbol = newAmountFormat.substr(0, 1);
var CHECK_B0X_SELECTED_VALUE = 'Y';
var CHECK_B0X_UNSELECTED_VALUE = 'N';
var RADIO_BUTTON_SELECTED_VALUE = 'Y';
var RADIO_BUTTON_UNSELECTED_VALUE = 'N';
var dbDataDOM = null;
var dbStrRecords = "";
//var dbStrRootTableName;
//setTimeout(function(){dbStrRootTableName = dataSrcLocationArray[0];},0);
var dbIndexArray = new Array();
var dbAuthFlag = false;
var dbRecFlag = false;
var dbFCJDOM;
var debugFlg = false;
//var Added = '#0aaF03';
//var deleted = '#FF364e';
//var modified = '#0ca8ff';//'#1f77FF';-- 12_0_3_RETRO_12_2_23653023
var Added = 'viewchanges-added';
var deleted = 'viewchanges-deleted';
var modified = "viewchanges-modified";
var orignal = '#000';//changes for 24288151
var xsdDom = "";
var xsdFile = "";
var gXmlFileName = "";
var gScreenName = "";
var gXslFileName = "";
var viewMode = false;
var fileAttachments = new Array();
var viewModeAction = false;

function createDOM(rootTableName) {
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = "<" + rootTableName + " ID='1' Type='SINGLE'></" + rootTableName + ">";
    dbDataDOM = loadXMLDoc(dataXML);
    resetIndex();
}

function resetDOM() {
    resetIndex();
    dbDataDOM = null;
}

function fnClearMultipleEntryBlocks() { //OJET Migration
    for (var iLoop = 0;iLoop < multipleEntryIDs.length;iLoop++) {
        // deleteAllRows(multipleEntryIDs[iLoop]);
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

function getFieldData(currObject) {
    var fieldValue = "";
    var tagName = currObject.tagName;
    switch (tagName.toUpperCase()) {
        case 'INPUT': {
            var type = currObject.type;
            switch (type.toUpperCase()) {
                case 'TEXT':
                case 'PASSWORD': {
                    fieldValue = currObject.value
                    break;
                }
                case 'HIDDEN': {
                    fieldValue = currObject.value;
                    if (getOuterHTML(currObject).indexOf("displayAmount") !=  - 1) {
                        fieldValue = fieldValue.replace(gDecimalSymbol, decimalSymbol);
                    }
                    else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") !=  - 1) {
                        fieldValue = fieldValue.replace(".", decimalSymbol);
                    }//Changes_prefix_rateType_Fields start
					else if (getOuterHTML(currObject).indexOf("displayRate") != -1) {
                        fieldValue = fieldValue.replace(gDecimalSymbol, decimalSymbol);
                    }//Changes_prefix_rateType_Fields ends
                    break;
                }
                case 'CHECKBOX': {
                    if (currObject.checked) {
                        if (currObject.getAttribute("ON")) {
                            fieldValue = currObject.getAttribute("ON");
                        }
                        else {
                            fieldValue = CHECK_B0X_SELECTED_VALUE;
                        }
                    }
                    else {
                        if (currObject.getAttribute("OFF")) {
                            fieldValue = currObject.getAttribute("OFF");
                        }
                        else {
                            fieldValue = CHECK_B0X_UNSELECTED_VALUE;
                        }
                    }

                    break;
                }
                case 'RADIO': {
                    fieldValue = getRadioButtonData(currObject);
                    break;
                }
            }
            break;
        }
        case 'SELECT': {
            fieldValue = getSelectedIndexValue(currObject);
            break;
        }
        case 'TEXTAREA': {
            fieldValue = currObject.value;
            break;
        }
        case 'OJ-SWITCH': {
                    if (currObject.value) {
                        if (currObject.getAttribute("ON")) {
                            fieldValue = currObject.getAttribute("ON");
                        }
                        else {
                            fieldValue = CHECK_B0X_SELECTED_VALUE;
                        }
                    }
                    else {
                        if (currObject.getAttribute("OFF")) {
                            fieldValue = currObject.getAttribute("OFF");
                        }
                        else {
                            fieldValue = CHECK_B0X_UNSELECTED_VALUE;
                        }
                    }

                    break;
                }
        case 'OJ-INPUT-NUMBER': 
        case 'OJ-INPUT-DATE': 
        case 'OJ-SELECT-SINGLE': 
        case 'OJ-RADIOSET': 
        case 'OJ-TEXT-AREA': 
        case 'OJ-INPUT-DATE-TIME':
        case 'OJ-INPUT-PASSWORD':
        case 'OJ-INPUT-TEXT': { //OJET Migration
            fieldValue = currObject.value;
            if(fieldValue==null || fieldValue== ""){
                fieldValue = currObject.getAttribute("value") || currObject.rawValue ;
            }
            break;
        }
    }
    return fieldValue;
}

function getSelectedIndexValue(selectObject) {
    var selectedValue = "";
    for (var index = 0;index < selectObject.options.length;index++) {
        if (selectObject.options[index].selected) {
            selectedValue = selectObject.options[index].value
            break;
        }
    }
    return selectedValue;
}

function getRadioButtonData(radioObject) {
    var radioValue = "";
    var radioObjects = document.getElementsByName(radioObject.name);
    for (var index = 0;index < radioObjects.length;index++) {
        if (radioObjects[index].checked) {
            radioValue = radioObjects[index].value;
            break;
        }
    }
    return radioValue;
}

function setRadioButtonData(radioObject, value) {
    var radioObjects = document.getElementsByName(radioObject.name);
    value = value.replace(new RegExp("\n", "g"), "");
    for (var index = 0;index < radioObjects.length;index++) {
        if (value == radioObjects[index].value) {
            radioObjects[index].checked = true;
            break;
        }
    }
}

function fnBuildRelationArray() {
    var relationshipArray = new Array();
    for (var i in relationArray) {
        var parentTable = relationArray[i].split("~")[0];
        if (parentTable != "") {
            if (relationshipArray[parentTable] != null) {
                relationshipArray[parentTable] = relationshipArray[parentTable] + "~" + i;
                relationshipArray[i] = "";
            }
            else {
                relationshipArray[parentTable] = "";
            }
        }
        else {
            relationshipArray[i] = "";
        }
    }
    return relationshipArray;
}
/* 12.0.4 RequestXML FLD removal changes starts */

function fnBuildFieldNameArray(pobjFCJXMLDOM) {
    var fieldNameArray = new Array();
    for (var i = 0;i < dataSrcLocationArray.length;i++) {
        if (selectSingleNode(pobjFCJXMLDOM, "//FCUBS_BODY/FLD/FN[@TYPE=\"" + dataSrcLocationArray[i] + "\"]")) {
            var fieldNames = getNodeText(selectSingleNode(pobjFCJXMLDOM, "//FCUBS_BODY/FLD/FN[@TYPE=\"" + dataSrcLocationArray[i] + "\"]"));
            fieldNameArray[dataSrcLocationArray[i]] = fieldNames;
        }
    }
    return fieldNameArray;
}
/* 12.0.4 RequestXML FLD removal changes ends */
var arrayValObj = new Object();/* 12.0.4 RequestXML FLD removal changes */
function fnGetDataXMLFromFCJXML(pobjFCJXMLDOM, pintRecNumber) {
    var finalXMLString = "";
	var objFCJXMLRecNode = null; //21318950 
    /*12.0.4 UI performance changes starts*/
    var relationshipArray = "";
    /*
    var relationshipArray = fnBuildRelationArray();
    var fieldNameArray = fnBuildFieldNameArray(pobjFCJXMLDOM); */
    if (arrayValObj.relationshipArray != null && typeof (arrayValObj.relationshipArray) != "undefined" && gAction!= 'CHANGELOG' ) {
        relationshipArray = arrayValObj.relationshipArray;
    }
    else {
        arrayValObj.relationshipArray = fnBuildRelationArray();
        relationshipArray = arrayValObj.relationshipArray;
    }
    if (typeof (functionId) != 'undefined' && functionId.substring(2, 3) != "S") {
        setMEBlockData(pobjFCJXMLDOM);
    }
// OJET Migration    
//    if (typeof (screenType) != 'undefined' && screenType == 'WB') {
//        var fieldNameArray1 = fnBuildFieldNameArray(pobjFCJXMLDOM);
//        var cnt = 0;
//        for (var i in fieldNameArray1) {
//            cnt++;
//        }
//        if (cnt == 0)
//            return;
//        fieldNameArray = fieldNameArray1;
//    }

    /*12.0.4 UI performance changes ends*/
    var pintRecNumber = 1;
    if (pintRecNumber == null || typeof (pintRecNumber) == "undefined") {
        pintRecNumber = 1;
    }
    if (selectSingleNode(pobjFCJXMLDOM, "//FCUBS_BODY/REC[position()=" + pintRecNumber + "]")) {
        objFCJXMLRecNode = selectSingleNode(pobjFCJXMLDOM, "//FCUBS_BODY/REC[position()=" + pintRecNumber + "]");
    }
    else {
        objFCJXMLRecNode = selectSingleNode(pobjFCJXMLDOM, "//MSG/REC[position()=" + pintRecNumber + "]");
    }
    if (objFCJXMLRecNode != null) {
        finalXMLString = fnProcessFCJRecNode(objFCJXMLRecNode, relationshipArray, fieldNameArray, 1, "SINGLE");
    }
    return loadXMLDoc(finalXMLString);
}
//OJET Migration
function fnProcessFCJRecNode(pobjFCJXMLRecNode, relationshipArray, fieldNameArray, id, recType) {
    var returnXML = "";
    var blkName = pobjFCJXMLRecNode.getAttribute("TYPE");
    returnXML = "<" + blkName + " ID = \"" + id + "\" Type = \"" + recType + "\"";
    if (pobjFCJXMLRecNode.getAttribute("ACTION")) {
        returnXML += " ACTION = \"" + pobjFCJXMLRecNode.getAttribute("ACTION") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("RECID") != null) {
        returnXML += " RECID = \"" + pobjFCJXMLRecNode.getAttribute("RECID") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS") != null) {
        returnXML += " STATUS = \"" + pobjFCJXMLRecNode.getAttribute("STATUS") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS_VAL") != null) {
        returnXML += " STATUS_VAL = \"" + pobjFCJXMLRecNode.getAttribute("STATUS_VAL") + "\"";
    }
    returnXML += ">";
    var fieldXML = "";
    if (fieldNameArray[blkName]) {
    
//     if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH') {
//        multipleEntryFieldList[tableName]['readOnly']=false;
//    }
//    showTable(false);
//    var  cloneObj = Object.assign({}, multipleEntryFieldList[tableName]);
//    meArrayForAddDelete[tableName].push(cloneObj);
//    showTable(true);debugger;
        var fieldNames = fieldNameArray[blkName].split("~");
        var fieldValues = getNodeText(selectSingleNode(pobjFCJXMLRecNode, "FV")).split("~");
        for (var i = 0; i < fieldNames.length; i++) {
            if (fieldNames[i] != "") {
                fieldXML += "<" + fieldNames[i] + "><![CDATA[" + fieldValues[i] + "]]></" + fieldNames[i] + ">";
            }
        }
    }
    returnXML += fieldXML;
    if (relationshipArray[blkName]) {
        var childBlkNames = relationshipArray[blkName].split("~");
        for (var i = 0; i < childBlkNames.length; i++) {
            var childRecs = selectNodes(pobjFCJXMLRecNode, "REC[@TYPE='" + childBlkNames[i] + "']");
            var recType = "SINGLE";
            if (childRecs.length > 1) {
                recType = "MULTIPLE";
            }
            for (var j = 0; j < childRecs.length; j++) {
                returnXML += fnProcessFCJRecNode(childRecs[j], relationshipArray, fieldNameArray, j + 1, recType);
            }
        }
    }
    returnXML += "</" + blkName + ">";
    return returnXML;
}


function fnProcessFCJRecNode_old(pobjFCJXMLRecNode, relationshipArray, fieldNameArray, id, recType) {
    var returnXML = "";
    var blkName = pobjFCJXMLRecNode.getAttribute("TYPE");
    var tabMEBlksDetails = tabMEBlks[strCurrentTabId];/*12.0.4 UI performance changes starts */
    if (!meHeaderLoaded && typeof (strHeaderTabId) != "undefined") {
        var headerMEBlksDetails = tabMEBlks[strHeaderTabId];
        if (typeof (headerMEBlksDetails) == "undefined")
            headerMEBlksDetails = "";
        if (typeof (tabMEBlksDetails) == "undefined")
            tabMEBlksDetails = "";
        tabMEBlksDetails = headerMEBlksDetails + "~" + tabMEBlksDetails;
        meHeaderLoaded = true;
    }
    /*12.0.4 UI performance changes ends */

    if (typeof (tabMEBlksDetails) == "undefined")
        tabMEBlksDetails = "";
    returnXML = "<" + blkName + " ID = \"" + id + "\" Type = \"" + recType + "\"";
    if (pobjFCJXMLRecNode.getAttribute("ACTION")) {
        returnXML += " ACTION = \"" + pobjFCJXMLRecNode.getAttribute("ACTION") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("RECID") != null) {
        returnXML += " RECID = \"" + pobjFCJXMLRecNode.getAttribute("RECID") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS") != null) {
        returnXML += " STATUS = \"" + pobjFCJXMLRecNode.getAttribute("STATUS") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS_VAL") != null) {
        returnXML += " STATUS_VAL = \"" + pobjFCJXMLRecNode.getAttribute("STATUS_VAL") + "\"";
    }
    returnXML += ">";
    var fieldXML = "";
    if (fieldNameArray[blkName]) {
        var fieldNames = fieldNameArray[blkName].split("~");
        var fieldValues = getNodeText(selectSingleNode(pobjFCJXMLRecNode, "FV")).split("~");
        for (var i = 0;i < fieldNames.length;i++) {
            if (fieldNames[i] != "") {
                fieldXML += "<" + fieldNames[i] + "><![CDATA[" + fieldValues[i] + "]]></" + fieldNames[i] + ">";
            }
        }
    }
    returnXML += fieldXML;
    if (relationshipArray[blkName]) {
        var childRecLen = 0;/*12.0.4 UI performance changes */
        var childBlkNames = relationshipArray[blkName].split("~");
        for (var i = 0;i < childBlkNames.length;i++) {
            var childRecs = selectNodes(pobjFCJXMLRecNode, "REC[@TYPE='" + childBlkNames[i] + "']");
            var recType = "SINGLE";
            if (childRecs.length > 1) {
                recType = "MULTIPLE";
            }
            /*12.0.4 UI performance changes starts*/
            childRecLen = childRecs.length;
            if (gAction == "EXECUTEQUERY" || gAction == "") {
                //preparing partial dom on EXECUTEQUERY
                if (childBlkNames[i] != "") {
                   /* if ( typeof(callFormBlocks)!="undefined" && callFormBlocks.indexOf(childBlkNames[i]) !=  - 1) {  //OJET Migration
                        isPartialDOM = true;
                    }*/
                    setRecDataLength(getBlockStructure(childBlkNames[i], false, id), childRecs.length);
                }
                if (childBlkNames[i] != "") {
                    if (typeof (multipleEntryPageSize[childBlkNames[i]]) != "undefined" && multipleEntryPageSize[childBlkNames[i]] && multipleEntrySVBlocks.indexOf(childBlkNames[i]) == - 1) { //12_1_RETRO_12_2_23664506
                        //Loading the REC upto pagesize specified in SYS File
                        childRecLen = Number(multipleEntryPageSize[childBlkNames[i]]);
                       /* if (childRecs.length > childRecLen)  //OJET Migration
                            isPartialDOM = true; */
                        if (childRecs.length < childRecLen)
                            childRecLen = childRecs.length;
                    }
                    else {
                        childRecLen = childRecs.length;
                    }
                    if (childRecLen > childRecs.length) {
                        childRecLen = childRecs.length;
                    }
                    if (!isMultipleEntry(childBlkNames[i]) && multipleEntrySVBlocks.indexOf(childBlkNames[i]) !=  - 1 && childRecs.length > 0) { //12_1_RETRO_12_2_23664506
                      childRecLen = 1;  
//                      if(childRecs.length > 1) {  //OJET Migration
//                          isPartialDOM = true;
//                      }
                      
                    }
                }
            }
            else {
                if (gAction == "LOADCALLFORMS" && childBlkNames[i] != "") {
                    setRecDataLength(getBlockStructure(childBlkNames[i], false, id), childRecs.length);
                }
                childRecLen = childRecs.length;
            }
            for (var j = 0;j < childRecLen;j++) {
                // added for chking the block is ME or not 
                var isMEBlock = 'false';
                if (childRecs[j] != null) {
                    isMEBlock = isMultipleEntry(childRecs[j].getAttribute("TYPE"));
                    if ((gAction == "EXECUTEQUERY" || gAction == "") && tabMEBlksDetails.indexOf(childRecs[j].getAttribute("TYPE")) !=  - 1 || isMEBlock=='false'  ) {
                        //For load Tab Based Data
                        returnXML += fnProcessFCJRecNode(childRecs[j], relationshipArray, fieldNameArray, j + 1, recType);
                    }
                    else {
                        // For loading all data except EXECUTEQUERY
                        returnXML += fnProcessFCJRecNode(childRecs[j], relationshipArray, fieldNameArray, j + 1, recType);
                    }
                    /*12.0.4 UI performance changes ends*/
                }
            }
        }
    }
    returnXML += "</" + blkName + ">";
    return returnXML;
}
/*12.0.4 UI performance changes starts*/
function returnRelationArray() {
    //return the FCUBS XML
    var parentVal = "";
    while (typeof (arrayValObj.relationshipArray) == "undefined") {
        parentVal += "parent."
        var fnEval = new Function("return " + parentVal + "arrayValObj.relationshipArray");
        arrayValObj.relationshipArray = fnEval();
    }
    return arrayValObj.relationshipArray;
}

function returnMEBlockData() {
    //return the FCUBS XML
    var parentVal = "";
    while (typeof (meBlockResponse) == "undefined") {
        parentVal += "parent."
        var fnEval = new Function("return " + parentVal + "meBlockResponse");
        meBlockResponse = fnEval();
    }
    return meBlockResponse;
}

function setMEBlockData(respXML) {
    //setting the FCUBS responseXML
    var parentVal = "";
    while (typeof (meBlockResponse) == "undefined") {
        parentVal += "parent."
        var fnEval = new Function("return " + parentVal + "meBlockResponse");
        meBlockResponse = fnEval();
    }
    meBlockResponse = respXML;
}

function returnMERecLength(blkName) {
    //returns  Length of the Block
    var parentVal = "";
    while (typeof (recDataLength) == "undefined") {
        parentVal += "parent."
        var fnEval = new Function("return " + parentVal + "recDataLength");
        recDataLength = fnEval();
    }
    if (recDataLength[blkName] == 0 || typeof (recDataLength[blkName]) == "undefined") {
        return 1;
    }
    else {
        return recDataLength[blkName];
    }
}

function setRecDataLength(nodeNameVal, childLength) {
    //setting Length of the block
    var parentVal = "";
    while (typeof (recDataLength) == "undefined") {
        parentVal += "parent."
        var fnEval = new Function("return " + parentVal + "recDataLength");
        recDataLength = fnEval();
    }
    recDataLength[nodeNameVal] = childLength;
}

function returnMEblockpageSize(blkName) {
    //return multiple entry pagesize from sys file
    if (typeof (multipleEntryPageSize) != "undefined") {
        return multipleEntryPageSize[blkName];
    }
    return 0;
}

function getParentBlkName(nodeName) {
    //Returns the immediate parent of the node
    var parentBlk = relationArray[nodeName];
    if (parentBlk) {
        parentBlk = parentBlk.substring(0, parentBlk.length - 2);
    }
    return parentBlk;
}

function getBlockStructure(nodeName, flag, id) {
    var xPathQuery = "";
    var parent = relationArray[nodeName];
    var query = "~" + nodeName;
    // Find the immediate parent.
    if (parent) {
        parent = parent.substring(0, parent.length - 2);
        if (flag)
            id = dbIndexArray[parent];//Initally dbIndexArray is not increased. Afterselcting the checkbox in LCDPRMNT--> EVNT its increased
        query = parent + "~" + id + "~" + query;
    }
    while (parent) {
        parent = relationArray[parent];
        if (parent) {
            parent = parent.substring(0, parent.length - 2);
            id = dbIndexArray[parent];
            query = parent + "~" + id + "~" + query;
        }
    }
    xPathQuery = xPathQuery + query;
    if (!flag)
        return xPathQuery;
    else 
        return returnMERecLength(xPathQuery);
}
var arrayValObj = new Object();

function fnGetPartialDataXMLFromFCJXML(id, nodeName, query, isLast, nodelistLength, isGoto, gotoRecLen, isTabBased) {
    //invoking time of click on Navigate(Next/Last/GoTo)
    pobjFCJXMLDOM = returnMEBlockData();//Getting the Response XML
	var objFCJXMLRecNode = null; //21318950 
    var relationshipArray = fnBuildRelationArray();
    //var fieldNameArray = fnBuildFieldNameArray(pobjFCJXMLDOM);
    var startId = id;
    if (typeof (pobjFCJXMLDOM) != "undefined" && pobjFCJXMLDOM != null && getXMLString(pobjFCJXMLDOM) != "")//12.0.3
    {
        recNodeList = getBlockStructure(nodeName, true);//getting length of the Node
        if (isLast)//for isLast 
            startid = nodelistLength + 1;
        if (nodelistLength >= recNodeList) {
            if (multipleEntrySVBlocks.indexOf(nodeName) ==  - 1) {
                return;
            }
            else {
                nodelistLength = startId;
            }
        }
    }
    var finalXMLString = "";
    var parentBlk = getParentBlkName(nodeName);//getting immediate parent
    if (selectNodes(pobjFCJXMLDOM, "//REC[@TYPE='" + parentBlk + "'][" + dbIndexArray[parentBlk] + "]/REC[@TYPE='" + nodeName + "']").length > 0) { //21318950 
        objFCJXMLRecNode = selectNodes(pobjFCJXMLDOM, "//REC[@TYPE='" + parentBlk + "'][" + dbIndexArray[parentBlk] + "]/REC[@TYPE='" + nodeName + "']");
    }
    
    if (objFCJXMLRecNode != null) {
        tmpstartid = startId;
        if (startId > 0)
            startId = startId - 1;//StartNode Value Come as NodeLength+1
        if (typeof (multipleEntryPageSize[nodeName]) != "undefined" && multipleEntryPageSize[nodeName] && !isLast) {
            childRecLen = Number(multipleEntryPageSize[nodeName]) + startId;
            if (objFCJXMLRecNode.length < childRecLen)
                childRecLen = objFCJXMLRecNode.length;
        }
        else {
            // isLast
            childRecLen = objFCJXMLRecNode.length;
        }
        if (isGoto) {
            //for Goto 
            if (gotoRecLen > objFCJXMLRecNode.length)
                childRecLen = objFCJXMLRecNode.length;
            else 
                childRecLen = gotoRecLen;
        }
        if (multipleEntrySVBlocks.indexOf(nodeName) !=  - 1 && objFCJXMLRecNode.length > startId) {
            //12.0.3 ME-SV            
            childRecLen = tmpstartid;
        }
        for (var i = startId;i < childRecLen;i++) {
            if (objFCJXMLRecNode[i] != null) {
                var recType = "SINGLE";
                if (objFCJXMLRecNode.length > 1) {
                    recType = "MULTIPLE";
                }
                finalXMLString += fnProcessPartialFCJRecNode(objFCJXMLRecNode[i], returnRelationArray(), fieldNameArray, i + 1, recType, startId, nodeName, isLast, tmpstartid);
            }
        }
    }
    var dbDataDOMTmpVal = "";
    var partialVal = selectNodes(loadXMLDoc("<ROOT>" + finalXMLString + "</ROOT>"), "//" + nodeName);//finalXMLString is not containing root node
    if (isTabBased) {
        var pntBlk = getParentBlkName(nodeName);
        dbDataDOMTmpVal = selectSingleNode(dbDataDOM, getXPathQuery(pntBlk) + "[@ID= '1']");
        if (dbDataDOMTmpVal != null)
            for (var j = 0;j < partialVal.length;j++) {
                dbDataDOMTmpVal.appendChild(partialVal[j]);
            }
    }
    else {
        dbDataDOMTmpVal = selectSingleNode(dbDataDOM, query + "[@ID=" + (nodelistLength) + "]");
        if (dbDataDOMTmpVal != null)
            for (var j = 0;j < partialVal.length;j++) {
                dbDataDOMTmpVal.parentNode.appendChild(partialVal[j]);
            }
    }
}

var childValueXML = "";

function fnProcessPartialFCJRecNode(pobjFCJXMLRecNode, relationshipArray, fieldNameArray, id, recType, startId, nodeName, isLast, tmpstartid) {
    var returnXMLValue = "";
    var blkName = pobjFCJXMLRecNode.getAttribute("TYPE");
    returnXMLValue += "<" + blkName + " ID = \"" + id + "\" Type = \"" + recType + "\"";
    if (pobjFCJXMLRecNode.getAttribute("ACTION")) {
        returnXMLValue += " ACTION = \"" + pobjFCJXMLRecNode.getAttribute("ACTION") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("RECID") != null) {
        returnXMLValue += " RECID = \"" + pobjFCJXMLRecNode.getAttribute("RECID") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS") != null) {
        returnXMLValue += " STATUS = \"" + pobjFCJXMLRecNode.getAttribute("STATUS") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS_VAL") != null) {
        returnXMLValue += " STATUS_VAL = \"" + pobjFCJXMLRecNode.getAttribute("STATUS_VAL") + "\"";
    }
    returnXMLValue += ">";
    var fieldXML = "";
    if (fieldNameArray[blkName]) {
        var fieldNames = fieldNameArray[blkName].split("~");
        var fieldValues = getNodeText(selectSingleNode(pobjFCJXMLRecNode, "FV")).split("~");
        for (var i = 0;i < fieldNames.length;i++) {
            if (fieldNames[i] != "") {
                fieldXML += "<" + fieldNames[i] + "><![CDATA[" + fieldValues[i] + "]]></" + fieldNames[i] + ">";
            }
        }
    }
    returnXMLValue += fieldXML;
    if (relationshipArray[blkName]) {
        var childBlkNames = relationshipArray[blkName].split("~");
        for (var i = 0;i < childBlkNames.length;i++) {
            var childRecLen = 0;
            var childRecs = selectNodes(pobjFCJXMLRecNode, "REC[@TYPE='" + childBlkNames[i] + "']");
            var recType = "SINGLE";
            if (childRecs.length > 1) {
                recType = "MULTIPLE";
            }
            if (childBlkNames[i] != "") {
                setRecDataLength(getBlockStructure(childBlkNames[i], false, id), childRecs.length);
            }
            if (childBlkNames[i] == nodeName) {
                if (tmpstartid > 0)
                    startId = tmpstartid - 1;
            }
            else {
                startId = 0;
            }
            if (childBlkNames[i] != "") {
                if (typeof (multipleEntryPageSize[childBlkNames[i]]) != "undefined" && multipleEntryPageSize[childBlkNames[i]] && !isLast) {
                    childRecLen = Number(multipleEntryPageSize[childBlkNames[i]]) + startId;
                    if (childRecs.length < childRecLen)
                        childRecLen = childRecs.length;
                }
                else {
                    childRecLen = childRecs.length;
                }
            }
            if (childBlkNames[i] != "") {
                nodeLength = returnMERecLength(getBlockStructure(childBlkNames[i], false, id));//getting Length of the Block
                if (childRecLen > nodeLength)
                    childRecLen = nodeLength;
            }
            var parent1 = getParentBlkName(nodeName);
            if (childBlkNames[i] == parent1) {
                startId = dbIndexArray[parent1] - 1;
                childRecLen = dbIndexArray[parent1];
            }
			childValueXML =""; //9NT1606_12_4_RETRO_12_1_26780563
			nodeName = blkName; //9NT1606_12_4_RETRO_12_1_26780563
            for (var j = startId;j < childRecLen;j++) {
                if (childRecs[j] != null)
                    childValueXML += fnProcessPartialFCJRecNode(childRecs[j], relationshipArray, fieldNameArray, j + 1, recType, startId, nodeName, isLast, tmpstartid);
            }
        }
    }

    if (blkName == nodeName) {
        returnXMLValue += (childValueXML + "</" + blkName + ">");
        childValueXML = "";
    }
    else {
        returnXMLValue += "</" + blkName + ">";
    }
    return returnXMLValue;
}
/*12.0.4 UI performance changes ends*/
function fnGetRemainDataXMLFromFCJXML(pobjFCJXMLDOM, pintRecNumber) {
    var finalXMLString = "";
    var relationshipArray = fnBuildRelationArray();

    var pintRecNumber = 1;
    if (pintRecNumber == null || typeof (pintRecNumber) == "undefined") {
        pintRecNumber = 1;
    }
    if (selectSingleNode(pobjFCJXMLDOM, "//FCUBS_BODY/REC[position()=" + pintRecNumber + "]")) {
        objFCJXMLRecNode = selectSingleNode(pobjFCJXMLDOM, "//FCUBS_BODY/REC[position()=" + pintRecNumber + "]");
    }
    else {
        objFCJXMLRecNode = selectSingleNode(pobjFCJXMLDOM, "//MSG/REC[position()=" + pintRecNumber + "]");
    }
    if (objFCJXMLRecNode != null) {
        finalXMLString = fnProcessRemainFCJRecNode(objFCJXMLRecNode, relationshipArray, fieldNameArray, 1, "SINGLE");
    }
    return loadXMLDoc(finalXMLString);
}

function fnProcessRemainFCJRecNode(pobjFCJXMLRecNode, relationshipArray, fieldNameArray, id, recType) {
    var returnXML = "";
    var blkName = pobjFCJXMLRecNode.getAttribute("TYPE");
    returnXML = "<" + blkName + " ID = \"" + id + "\" Type = \"" + recType + "\"";
    if (pobjFCJXMLRecNode.getAttribute("ACTION")) {
        returnXML += " ACTION = \"" + pobjFCJXMLRecNode.getAttribute("ACTION") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("RECID") != null) {
        returnXML += " RECID = \"" + pobjFCJXMLRecNode.getAttribute("RECID") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS") != null) {
        returnXML += " STATUS = \"" + pobjFCJXMLRecNode.getAttribute("STATUS") + "\"";
    }
    if (pobjFCJXMLRecNode.getAttribute("STATUS_VAL") != null) {
        returnXML += " STATUS_VAL = \"" + pobjFCJXMLRecNode.getAttribute("STATUS_VAL") + "\"";
    }
    returnXML += ">";
    var fieldXML = "";
    if (fieldNameArray[blkName]) {
        var fieldNames = fieldNameArray[blkName].split("~");
        var fieldValues = getNodeText(selectSingleNode(pobjFCJXMLRecNode, "FV")).split("~");
        for (var i = 0;i < fieldNames.length;i++) {
            if (fieldNames[i] != "") {
                fieldXML += "<" + fieldNames[i] + "><![CDATA[" + fieldValues[i] + "]]></" + fieldNames[i] + ">";
            }
        }
    }
    returnXML += fieldXML;
    if (relationshipArray[blkName]) {
        var childBlkNames = relationshipArray[blkName].split("~");
        for (var i = 0;i < childBlkNames.length;i++) {

            var childRecs = selectNodes(pobjFCJXMLRecNode, "REC[@TYPE='" + childBlkNames[i] + "']");
            var recType = "SINGLE";
            if (childRecs.length > 1) {
                recType = "MULTIPLE";
            }
            var startId = 0;
            if (typeof (relationArray[childBlkNames[i]]) != 'undefined' && relationArray[childBlkNames[i]].indexOf("~N") >  - 1) {
                startId = selectNodes(dbDataDOM, "//" + childBlkNames[i]).length;
            }
            for (var j = startId;j < childRecs.length;j++) {
                if (typeof (relationArray[childRecs[j].getAttribute("TYPE")]) != 'undefined' && !(relationArray[childRecs[j].getAttribute("TYPE")].indexOf("~1") >  - 1)) {
                    returnXML += fnProcessFCJRecNode(childRecs[j], relationshipArray, fieldNameArray, j + 1, recType);
                }
            }
        }
    }
    returnXML += "</" + blkName + ">";
    return returnXML;
}

function fnProcessFCJRecNodeSummary(pobjFCJXMLRecNode, pobjFCJXMLDOM, pobjDataDOM, pblnRecursive) {
    var objFVNode, objRecChildNodes, objNewChildNode, objNodesOfThisType;
    var arrFieldValues, arrFieldNames, strRecType, intID;
    var objReturnDataRecNode;
    arrFieldValues = new Array();
    arrFieldNames = new Array();
    objFVNode = selectSingleNode(pobjFCJXMLRecNode, "FV");
    arrFieldValues = getNodeText(objFVNode).split("~");
    arrFieldNames = getNodeText(selectSingleNode(pobjFCJXMLDOM, "//MSG/FLD/FN")).split("~");
    objReturnDataRecNode = pobjDataDOM.createElement(pobjFCJXMLRecNode.getAttribute("TYPE"));
    for (var i = 0;i < arrFieldNames.length;i++) {
        if (arrFieldNames[i] != "") {
            objNewChildNode = dbDataDOM.createElement(arrFieldNames[i]);
            setNodeText(objNewChildNode, arrFieldValues[i]);
            objReturnDataRecNode.appendChild(objNewChildNode);
        }
    }
    if (pblnRecursive) {
        objRecChildNodes = selectNodes(pobjFCJXMLRecNode, "REC");
        if (objRecChildNodes != null) {
            for (var j = 0;j < objRecChildNodes.length;j++) {
                objNewChildNode = fnProcessFCJRecNodeSummary(objRecChildNodes[j], pobjFCJXMLDOM, pobjDataDOM, true);//----> Recursive
                if (selectNodes(pobjFCJXMLRecNode, "REC[@TYPE='" + objRecChildNodes[j].getAttribute("TYPE") + "']").length > 1) {
                    strRecType = "MULTIPLE";
                }
                else {
                    strRecType = "SINGLE";
                }
                objNodesOfThisType = selectNodes(objReturnDataRecNode, objNewChildNode.nodeName);
                if (objNodesOfThisType != null) {
                    intID = objNodesOfThisType.length + 1;
                }
                else {
                    intID = 1;
                }
                objNewChildNode.setAttribute("ID", intID);
                objNewChildNode.setAttribute("Type", strRecType);
                if (objRecChildNodes[j].getAttribute("RECID") != null)
                    objNewChildNode.setAttribute("RECID", objRecChildNodes[j].getAttribute("RECID"));
                if (objRecChildNodes[j].getAttribute("STATUS") != null)
                    objNewChildNode.setAttribute("STATUS", objRecChildNodes[j].getAttribute("STATUS"));
                if (objRecChildNodes[j].getAttribute("STATUS_VAL") != null)
                    objNewChildNode.setAttribute("STATUS_VAL", objRecChildNodes[j].getAttribute("STATUS_VAL"));
                objReturnDataRecNode.appendChild(objNewChildNode);
            }
        }
    }
    return objReturnDataRecNode;
}

function fnGetFCJRecNodeForDataNode(pobjDataDOMNode, pobjCurrentFCJXMLDOM) {
    var objReturnRecNode, objFNDefinitionForDataNode, strDataDOMNodeName, arrFieldNames, strFieldValue, objFieldNode, objFVNode;
    strDataDOMNodeName = pobjDataDOMNode.nodeName;
    objReturnRecNode = pobjCurrentFCJXMLDOM.createElement("REC");
    objReturnRecNode.setAttribute("TYPE", strDataDOMNodeName);
    objFNDefinitionForDataNode = selectSingleNode(pobjCurrentFCJXMLDOM, "//*/FN[@TYPE='" + strDataDOMNodeName + "']");
    if (objFNDefinitionForDataNode != null) {
        arrFieldNames = getNodeText(objFNDefinitionForDataNode).split("~");
    }
    strFieldValue = "";
    for (var i = 0;i < arrFieldNames.length;i++) {
        if (arrFieldNames[i] != "") {
            objFieldNode = selectSingleNode(pobjDataDOMNode, arrFieldNames[i]);
            if (objFieldNode != null) {
                strFieldValue += getNodeText(objFieldNode);
            }
            if (i + 1 < arrFieldNames.length) {
                strFieldValue += "~";
            }
        }
    }
    objFVNode = pobjCurrentFCJXMLDOM.createElement("FV");
    setNodeText(objFVNode, strFieldValue)
    objReturnRecNode.appendChild(objFVNode);
    for (var i = 0;i < pobjDataDOMNode.childNodes.length;i++) {
        if (pobjDataDOMNode.childNodes[i].childNodes.length > 0) {
            if (pobjDataDOMNode.childNodes[i].childNodes.length == 1) {
                if (pobjDataDOMNode.childNodes[i].childNodes[0].nodeType == 1) {
                    objReturnRecNode.appendChild(fnGetFCJRecNodeForDataNode(pobjDataDOMNode.childNodes[i], pobjCurrentFCJXMLDOM));
                }
            }
            else {
                objReturnRecNode.appendChild(fnGetFCJRecNodeForDataNode(pobjDataDOMNode.childNodes[i], pobjCurrentFCJXMLDOM));
            }
        }
    }
    return objReturnRecNode;
}

function setDataXML(dataXML) {
    dbDataDOM = loadXMLDoc(dataXML);
}

function fnPasteControlFieldValues() {
    if (isControlFieldsArrValues.length > 0) {
        for (var i = 0;i < isControlFieldsArrValues.length;i++) {
            document.getElementById([isControlFieldsArrValues[i]]).value = isControlFieldsArrValues[isControlFieldsArrValues[i]];
        }
    }
}

function getXPathQuery(nodeName) {
    var xPathQuery = "/";
    var parent = relationArray[nodeName];
    if (nodeName == "STTB_FIELD_LOG") {
        xPathQuery = "//";
    }
    else {
        xPathQuery = "/";
    }
    var query = "/" + nodeName;
    // Find the immediate parent.
    if (parent) {
        parent = parent.substring(0, parent.length - 2);
        query = parent + "[@ID=" + dbIndexArray[parent] + "]" + query;
    }

    while (parent) {
        parent = relationArray[parent];
        if (parent) {
            parent = parent.substring(0, parent.length - 2);
            query = parent + "[@ID=" + dbIndexArray[parent] + "]" + "/" + query;
        }
    }
    xPathQuery = xPathQuery + query;
    return xPathQuery;
}

function appendTextFieldValue(textObject, id, DBT) {
    var DBC = textObject.getAttribute("DBC");
    var value = NVL(textObject.value);
    var txtObjHTML = getOuterHTML(textObject);
    if (txtObjHTML.indexOf("amountConverter") !=  - 1 || txtObjHTML.indexOf("numberConverter") !=  - 1){
       var re = new RegExp(gDigitGroupingSymbol, "g");
        if (typeof value == "string") {
            value = value.replace(re, "");
        }     
    }
//    if (txtObjHTML.indexOf("displayAmount") !=  - 1)
//        value = value.replace(".", decimalSymbol);
//    if (txtObjHTML.indexOf("displayFormattedNumber") !=  - 1)
//        value = value.replace(".", decimalSymbol);
    if (gAction == "EXECUTEQUERY") {
        value = gEncodeData(value);
    }
    if (DBC != "" && DBC != null) {
        DBC = DBC.toUpperCase();
        var rootNode = getNode(DBT, id);
        var currNode = selectSingleNode(rootNode, DBC);
        if(value!=null && textObject.tagName.toUpperCase() == 'OJ-INPUT-DATE-TIME'){
           value=value.replace('T', ' ').replace('Z', ''); 
        }
        if (currNode) {
            if (textObject.tagName == 'OJ-TEXT-AREA') {
                if (currNode.childNodes) {
                    if (currNode.childNodes.length > 0) {
                        currNode.removeChild(currNode.childNodes[0]);
                        var cDataNode = dbDataDOM.createCDATASection(value);
                        currNode.appendChild(cDataNode);
                    }
                    else {
                        rootNode.removeChild(currNode);
                        var newNode = dbDataDOM.createElement(DBC);
                        var cDataNode = dbDataDOM.createCDATASection(value);
                        newNode.appendChild(cDataNode);
                        rootNode.appendChild(newNode);
                    }
                }
            }
            else {
                setNodeText(currNode, value);
            }
        }
        else {
            var newNode = dbDataDOM.createElement(DBC);
            var cDataNode = dbDataDOM.createCDATASection(value);
            newNode.appendChild(cDataNode);
            rootNode.appendChild(newNode);
        }
    }
    return;
}

function appendSelectFieldValue(selectObject, id, DBT) {
    var DBC = selectObject.getAttribute("DBC");
    var selectedInd = selectObject.selectedIndex;
    var value = "";
    if (DBC != null && DBC != "") {
        DBC = DBC.toUpperCase();
        if (selectedInd !=  - 1) {
            value = NVL(selectObject.options[selectedInd].value);
            value = gEncodeData(value);
        }

        var rootNode = getNode(DBT, id);
        var currNode = selectSingleNode(rootNode, DBC);
        if (currNode) {
            setNodeText(currNode, value);
        }
        else {
            var newNode = dbDataDOM.createElement(DBC);
            var cDataNode = dbDataDOM.createCDATASection(value);
            newNode.appendChild(cDataNode);
            rootNode.appendChild(newNode);
        }
    }
    return;
}

function appendCheckBoxValue(checkBoxObject, id, DBT) {
    var DBC = checkBoxObject.getAttribute("DBC");
    var value = NVL(checkBoxObject.value);
    if (DBC != null && DBC != "") {
        DBC = DBC.toUpperCase();
        if (value) {//OJET Migration
            if (checkBoxObject.getAttribute("ON")) {
                value = checkBoxObject.getAttribute("ON");
            }
            else {
                value = CHECK_B0X_SELECTED_VALUE;
            }
        }
        else {
            if (checkBoxObject.getAttribute("OFF"))
                value = checkBoxObject.getAttribute("OFF");
            else 
                value = CHECK_B0X_UNSELECTED_VALUE;
        }
        var rootNode = getNode(DBT, id);
        var currNode = selectSingleNode(rootNode, DBC);
        if (currNode) {
            setNodeText(currNode, value);
        }
        else {
            var newNode = dbDataDOM.createElement(DBC);
            setNodeText(newNode, value);
            rootNode.appendChild(newNode);
        }
    }
    return;
}

function appendRadioValue(radioObject, id, DBT) {
    var radioObjs = document.getElementsByName(radioObject.name);
    var DBC = getDBCForRadioObject(radioObject);
    for (var i = 0;i < radioObjs.length;i++) {
        if (radioObjs[i].checked) {
            var value = NVL(radioObjs[i].value);
            if (DBC != "") {
                DBC = DBC.toUpperCase();
                var rootNode = getNode(DBT, id);
                var currNode = selectSingleNode(rootNode, DBC);
                if (currNode) {
                    setNodeText(currNode, value);
                }
                else {
                    var newNode = dbDataDOM.createElement(DBC);
                    setNodeText(newNode, value);
                    rootNode.appendChild(newNode);
                }
            }
        }
    }
    return;
}

function getDBCForRadioObject(radioObject) {
    var DBC = "";
    var radioElements = document.getElementsByName(radioObject.name);
    for (var elementIndex = 0;elementIndex < radioElements.length;elementIndex++) {
        if (radioElements[elementIndex].getAttribute("DBC")) {
            DBC = radioElements[elementIndex].getAttribute("DBC");
            break;
        }
    }
    return DBC;
}

function getNode(DBT, id) {
    var query = getXPathQuery(DBT);
    var rootNode = selectSingleNode(dbDataDOM, query + "[@ID=" + id + "]");
    var parentTableName = relationArray[DBT];
    var relation = "1";
    if (parentTableName) {
        relation = parentTableName.substring(parentTableName.length - 1);
        parentTableName = parentTableName.substring(0, parentTableName.length - 2);
        if (id >= 1 && relation == 'N') {
            if (rootNode == null) {
                var parentNode = selectSingleNode(dbDataDOM, getQueryWithId(parentTableName));
                if (parentNode == null) {
                    parentNode = getNode(parentTableName, 1);
                }
                var newNode = dbDataDOM.createElement(DBT);
                newNode.setAttribute("ID", id);
                newNode.setAttribute("Type", "MULTIPLE");
                parentNode.appendChild(newNode);
                rootNode = newNode;
            }
        }
        else if (id == 1 && relation == '1') {
            if (rootNode == null) {
                var parentNode = selectSingleNode(dbDataDOM, getQueryWithId(parentTableName));
                if (!parentNode) {
                    parentNode = getNode(parentTableName, dbIndexArray[parentTableName]);
                }
                var newNode = dbDataDOM.createElement(DBT);
                newNode.setAttribute("ID", id);
                newNode.setAttribute("Type", "SINGLE");
                parentNode.appendChild(newNode);
                rootNode = newNode;
            }
        }
        else {
            rootNode = selectSingleNode(dbDataDOM, "//" + DBT + "[@ID=" + 1 + "]");
        }
    }
    return rootNode;
}

function processNode(node,appendFld) {
    var type = node.nodeName;
    var havingNull = false;
    if (typeof (relationArray[type]) != 'undefined') {
        if ((relationArray[type]).indexOf("~N") !=  - 1) {
            var isSingleView = fnCheckforSingleView(type);
            if (isSingleView) {
                if (dbIndexArray[type] == '1') {
                    var dataEntered = fnCheckForNullValues(node);
                    if (dataEntered)
                        havingNull = true;
                }
            }
        }
    }
    if (isQuery[type])
        return;
    if (isControl[type])
        return;
    if (!havingNull) {
        dbStrRecords = dbStrRecords + "<REC TYPE=\"" + type + "\"";
        if (dataSrcLocationArray[0] == type) {
            dbStrRecords = dbStrRecords + " RECID='1'";
        }
        dbStrRecords = dbStrRecords + ">";
        var strFV = createFV(node, type,appendFld);
        dbStrRecords = dbStrRecords + strFV;
    }
    var childNodes = node.childNodes;
    for (var index = 0;index < childNodes.length;index++) {
        var currNode = childNodes[index];
        if (isNodeATable(currNode)) {
            processNode(currNode,appendFld);
        }
    }
    if (!havingNull)
        dbStrRecords = dbStrRecords + "</REC>";
}

function fnCheckforSingleView(type) {
    var blockId = type;

    if (typeof (multipleEntryIDs.indexOf) != "undefined") {
        /*12.0.4 UI performance changes starts*/
        if (multipleEntryIDs.indexOf(blockId) !=  - 1) {
            return false;
        }
    }
    else {
        for (var i = 0;i < multipleEntryIDs.length;i++) {
            if (multipleEntryIDs[i] == blockId) {
                return false;
            }
            else {
                continue;
            }
        }
    }
    /*12.0.4 UI performance changes ends*/
    return true;
}

function fnCheckForNullValues(node) {
    var childNodes = node.childNodes;
    if (childNodes.length > 0) {
        for (index = 0;index < childNodes.length;index++) {
            if (getNodeText(childNodes[index]) == "") {
                if (index == childNodes.length - 1)
                    return true;
            }
            else {
                return false;
            }
        }
    }
    else 
        return true;
}

function createFV(dataNode, DBT , appendFlg) {
    var fvStr = "";
    var fnNames = '';
    
        if(typeof(appendFlg) == "undefined" || appendFlg == true) {
            if (selectSingleNode(dbFCJDOM, '//FLD/FN[@TYPE="' + DBT + '"]')) { //21193478 
                if (!selectSingleNode(dbFCJDOM, "//FLD/FN[@TYPE=\"" + DBT + "\"]").childNodes[0]) {
                    return fvStr;
                }
                fnNames = selectSingleNode(dbFCJDOM, "//FLD/FN[@TYPE=\"" + DBT + "\"]").childNodes[0].nodeValue;
            }
            //fvStr = prepareFV(dataNode,fnNames) ;
        }else {
            fnNames = fieldNameArray[DBT];//MSGXML suppression
            //fvStr = prepareFV(dataNode,fnNames) ;
        }
        if(typeof(fnNames)!= "undefined")
            fvStr = prepareFV(dataNode,fnNames) ;
    
    return fvStr;
}

function prepareFV(dataNode,fnNames) {
    var fvStr = "";
    fvStr = fvStr + "<FV><![CDATA[";
    var tslValue = "";
    var fnArray = fnNames.split("~");
    for (var index = 0;index < fnArray.length;index++) {
        var fieldName = fnArray[index];
        if (fieldName && fieldName != "") {
            var currNode = selectSingleNode(dataNode, fieldName);
            var text = "";
            if (currNode) {
                if (currNode.childNodes.length == 1) {
                    text = currNode.childNodes[0].nodeValue;
                    if (text.indexOf("\n") == 0) {
                        text = text.substring(1);
                    }
                }
            }
            tslValue = tslValue + text + "~";
        }
    }
    fvStr = fvStr + tslValue;
    fvStr = fvStr + "]]></FV>";
    return fvStr;
}

function isNodeATable(currNode) {
    if (currNode && currNode.nodeType != 3) {
        var type = currNode.getAttribute("Type");
        if (type && (type == 'SINGLE' || type == 'MULTIPLE')) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function showDescandants(currentTable) {
    var childTable = findDescandants(currentTable);
    childTable = childTable.substring(0, childTable.length - 1);
    var childArray = childTable.split("~");
    if (childArray && childArray.length > 0) {
        setDataInMETable("BLK_" + childArray[0], currentTable, dbIndexArray[currentTable]);
        for (var index = 1;index < childArray.length;index++) {
            var parentTableName = getParentTableName(childArray[index]);
            var relationName = relationArray[childArray[index]];
            var relation = relationName.substring(relationName.length - 1);
            var tableObj = document.getElementById('BLK_' + childArray[index]);
            if (tableObj != null) {
                if (relation == '1' || fnIsSingleView(childArray[index])) {
                    var node = getNode(childArray[index], 1);
                    setDataInSE(childArray[index] + "__", node);
                }
                else {
                    setDataInMETable("BLK_" + childArray[index], parentTableName, dbIndexArray[parentTableName]);
                }
            }
        }
    }
    return;
}

function findDescandants(tableName) {
    var index = 0;
    var childTable = "";
    while (index < dataSrcLocationArray.length) {
        var indexTable = dataSrcLocationArray[index];
        var relation = relationArray[indexTable];
        relation = relation.substring(0, relation.length - 2);
        if (relation == tableName) {
            childTable = childTable + indexTable + "~";
            var desc = findDescandants(indexTable);
            if (desc != "")
                childTable = childTable + desc;
        }
        index++;
    }
    return childTable;
}

function getQueryWithId(nodeName) {
    var query = getXPathQuery(nodeName);
    query = query + "[@ID=" + dbIndexArray[nodeName] + "]";
    return query;
}

function resetChildIndex(tableName) {
    var childTable = findDescandants(tableName);
    childTable = childTable.substring(0, childTable.length - 1);
    var childArray = childTable.split("~");
    for (var index = 0;index < childArray.length;index++) {
        dbIndexArray[childArray[index]] = 1;
    }
    return;
}

function resetNodeIdAttributes(nodeList) {
    var currNode = null;
    var idAttrValue = 0;
    for (var nodeIndex = 0;nodeIndex < nodeList.length;nodeIndex++) {
        idAttrValue = nodeIndex + 1;
        currNode = nodeList[nodeIndex];
        currNode.setAttribute("ID", idAttrValue);
    }
    return;
}

function getCurrentRecord() {
    var pureXMLDOM;
    if (intCurrentQueryResultIndex == 0) {
        intCurrentQueryResultIndex = 1;
    }
    pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, intCurrentQueryResultIndex);
    return pureXMLDOM;
}

function setDataInSE(idPrefix, dataNode) {
    var childNode = null;
    if (dataNode) {
        for (var nodeIndex = 0;nodeIndex < dataNode.childNodes.length;nodeIndex++) {
            childNode = dataNode.childNodes[nodeIndex];
            if (isNodeATable(childNode)) {
                displayData(childNode.nodeName, childNode, 1);
            }
            else {
                if (document.getElementById(idPrefix + childNode.nodeName) != null) {
                    if (document.getElementById(idPrefix + childNode.nodeName).type.toUpperCase() != 'RADIO') {
                        document.getElementById(idPrefix + childNode.nodeName).value = "";
                    }
                    setFieldData(document.getElementById(idPrefix + childNode.nodeName), getNodeText(childNode));
                }
            }
        }
    }
    return;
}
//OJET Migration start
function appendOJInputData(FldSetObject, blockId, id, isME) {
    var tagNameList = ["OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME"];
    for (var k = 0;k < tagNameList.length;k++) {
        var currObject = FldSetObject.getElementsByTagName(tagNameList[k]);
        if (currObject && currObject.length != 0)
            for (var i = 0;i < currObject.length;i++) {
                var type = currObject[i].getAttribute("type");
                var DBT = currObject[i].getAttribute("DBT");
                var DBC = currObject[i].getAttribute("DBC");
                if (isME) {
                    if (DBC == null || typeof DBC == "undefined")
                        continue 
                }
                else if ((DBT == null || typeof DBT == "undefined") && (DBC == null || typeof DBC == "undefined"))
                    continue;
            /*    if (typeof type == "undefined")
                    break;*/
                switch (currObject[i].tagName.toUpperCase()) {
                    case "OJ-SWITCH": {
                        appendCheckBoxValue(currObject[i], id, blockId);
                        break 
                    }
                   case "INPUT": {
                       if(currObject[i].type.toUpperCase()=='HIDDEN') {
                           appendTextFieldValue(currObject[i], id, blockId);
                       }
                         break;
                   }
                    default : {
                        if(currObject[i].id.toLowerCase().indexOf( 'oj-searchselect-filter') == -1)
                            appendTextFieldValue(currObject[i], id, blockId);
                        break; 
                    }
                }
            }

    }  
}
//OJET Migration ends