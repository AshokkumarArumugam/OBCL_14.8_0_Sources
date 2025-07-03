/*----------------------------------------------------------------------------------------------------
**
** File Name    : UserAlerts.js
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

**  Modified By          : Neethu Sreedharan
**  Modified On          : 07-Oct-2016
**  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                           to user as alert and on click of Ok button on alert window, screen will be 
                           unmasked and user can try the action again.
**  Retro Source         : 9NT1606_12_0_3_INTERNAL
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
---------------------------------------------------------------------------------------------------- 
*/

var alertSeqArr  = new Array();
var alertTypeArr = new Array();
var alertMsgArr  = new Array();

function fnShowUserAlerts() {

    var requsetStr = "<?xml version='1.0'?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>"+
                    UserId+"</USERID><BRANCH>"+CurrentBranch+"</BRANCH><DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>GET_USERALERTS</ACTION>" +
                    "<MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY='0' PARENT='' RELATION='' TYPE=''/></FLD><REC TYPE=''/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>";
    /*
    fnPostAlertsToServer(requsetStr, 'GET_USERALERTS');
    var newcount = fncountAlerts();
    */
    var newcount = fnPostAlertsToServer(requsetStr, 'GET_USERALERTS');
    if(parseInt(newcount) > 0) {
        document.getElementById("userAlertLink").disabled = false;
        document.getElementById("userAlertLink").setAttribute("href", "#");
    } else {
        document.getElementById("userAlertLink").disabled = true;
        document.getElementById("userAlertLink").removeAttribute("href", "#");
    }
    //document.getElementById("vTabDB_DASHBOARD").innerHTML ="";
    var mesg = getInnerText(document.getElementById("userAlertCount"));
    countAlerts = newcount;
    var lIdx = mesg.lastIndexOf(")");
    var lpIdx = mesg.lastIndexOf("(", lIdx);
    mesg = mesg.substring(0, lpIdx+1) + newcount + mesg.substring(lIdx);
    setInnerText(document.getElementById("userAlertCount"), mesg);
}

function fnProcessUserAlerts() {
    var recStr = "";
    var chkFlag = false;
    var alertTblRowObj = document.getElementById("userAlertTbl").tBodies[0].rows;
    for (var i=0;i<alertTblRowObj.length;i++) {
        if (alertTblRowObj[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
            recStr += '<REC ID="'+alertSeqArr[i]+'"></REC>';
            chkFlag = true;
        }
    }
    if (!chkFlag) {
        alert(mainWin.getItemDesc("LBL_SELECT_ATLEAST_ONE_ROW"));
        return;
    }
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+mainWin.UserId+'</USERID><BRANCH>'
                        +mainWin.CurrentBranch+'</BRANCH><DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>PROCESS_USERALERTS</ACTION><MSGSTAT/><MODULEID>INFRA' +
                        '</MODULEID><MSGID/><ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY>'+recStr+'</FCUBS_BODY></FCUBS_REQ_ENV>';
    //fnPostAlertsToServer(requsetStr, 'PROCESS_USERALERTS');
    var newcount = fnPostAlertsToServer(requsetStr, 'PROCESS_USERALERTS');
    updateUserAlertHtml();    
    var mesg = getInnerText(document.getElementById("userAlertLink").children[0]).substring(0,18);          
    //var newcount = fncountAlerts();
    setInnerText(document.getElementById("userAlertLink").children[0], mesg+ "("+newcount+")");
}

function fnPostAlertsToServer(requsetStr, action) {
    var userAlertReqDom = loadXMLDoc(requsetStr);
    var userAlertResDom = fnPostAlerts(userAlertReqDom, action);
	var alertcount = 0;
    if (userAlertResDom != null) {
        var msgstat = getNodeText(selectSingleNode(userAlertResDom, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if(msgstat=="SUCCESS"){
            var alertStr = getNodeText(selectSingleNode(userAlertResDom, "FCUBS_RES_ENV/FCUBS_HEADER/ADDL/PARAM/VALUE"));
            if (alertStr != "")
                processAlertStr(alertStr);
            if(alertStr.split("####")[0] !=null && alertStr.split("####")[0] !='')
                alertcount = alertStr.split("####").length;
        } else {
            var errMsg = getNodeText(selectSingleNode(userAlertResDom, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            if(errMsg == "") {
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML("", "I", getItemDesc("LBL_ERROR_PROCESSING_ALERTS")), "I");
            } else {
                alertAction = "UNMASK";
                mask();
                showAlerts(fnBuildAlertXML("", "I", errMsg), "I");
            }
        }
    }
    return alertcount;
}

function fnPostAlerts(reqDom, action) {
    var labelSessionExp = getItemDesc("LBL_SESSION_EXPIRED");
    if (!isSessionActive()) {
        event.returnValue = false;
        var alertResDOM = loadXMLDoc("<RESPONSE><MSGSTAT>FAILURE</MSGSTAT><MESSAGE>"+labelSessionExp+"</MESSAGE></RESPONSE>");
        return alertResDOM;
    }
    alertSeqArr  = new Array();
    alertTypeArr = new Array();
    alertMsgArr  = new Array();    
    var strFormData = getXMLString(reqDom);
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", 'FCUserAlertsServlet', false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("OPERATION", action);
    objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    if (objHTTP.status != 200) { 
        alert(mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText);
    } else {
        responseDOM = objHTTP.responseXML;
        mainWin.inactiveTime = 0;
    }

    return responseDOM;
}

function processAlertStr(alertString) {
    var alertNodes = alertString.split("####");
    for (var i=0;i<alertNodes.length;i++) {
        alertSeqArr[i]  = alertNodes[i].split("::::")[0];
        alertTypeArr[i] = alertNodes[i].split("::::")[1];
        alertMsgArr[i]  = alertNodes[i].split("::::")[2];
    }
}

function updateUserAlertHtml() {

    var selectAll = getItemDesc("LBL_SELECT_ALL");
    var desc = getItemDesc("LBL_DESCRIPTION");
    var alertType = getItemDesc("LBL_ALERT_TYPE");
    var seqNo = getItemDesc("LBL_SEQUENCE_NUMBER");
    var selectItem = getItemDesc("LBL_SELECT_ITEM");
    var userAlerts = getItemDesc("LBL_UNPROCESSED_ALERTS");
    var labelProcess = getItemDesc("LBL_PROCESS_CODE");
    
    var userAlertHtml = '<DIV style=\"HEIGHT: 576px; OVERFLOW: auto\" id=\"dashboardContainer\">';
    userAlertHtml += '<table id = \"userAlertTbl\" summary=\"'+ userAlerts +'\" class=\"widgetonetbl colw\" cellspacing=\"1\" cellpadding=\"0\" border=\"0\">';
    userAlertHtml += '<thead>';
    userAlertHtml += '<tr>';
    userAlertHtml += '<th scope="col" onclick="fnCheckUncheckAll()">';
    userAlertHtml += '<label for="chkall" class="LBLauto"><input type="CHECKBOX" id="chkall" class="CHKStd"><span class="LBLinv">'+ selectAll +'</span></label>';
    userAlertHtml += '</th>';
    userAlertHtml += '<th scope="col">';
    userAlertHtml += '<a class="Anorm"><span class="SPNup hide">&nbsp;&nbsp;&nbsp;&nbsp;</span>'+ desc +'</a>';
    userAlertHtml += "&nbsp;&nbsp;<button class=\'BTNtext\' onclick=\'fnProcessUserAlerts()\' onmouseover= this.className=\'BTNtextH\' onfocus= this.className=\'BTNtextH\' onmouseout= this.className=\'BTNtext\' onblur= this.className=\'BTNtext\' style= \'vertical-align:middle\'>" + labelProcess + "</button>";
    userAlertHtml += '</th>';
    userAlertHtml += '<th scope="col"><a class="Anorm"><span class="SPNup hide">&nbsp;&nbsp;&nbsp;&nbsp;</span>'+ alertType +'</a></th>';
    userAlertHtml += '<th scope="col"><a class="Anorm"><span class="SPNup hide">&nbsp;&nbsp;&nbsp;&nbsp;</span>'+ seqNo +'</a></th>';
    userAlertHtml += '</tr>';
    userAlertHtml += '</thead>';
    userAlertHtml += '<tbody id="bdyTaskList">';
    for (var i=0;i<alertSeqArr.length;i++) {
        if (i%2 == 0) {
            userAlertHtml += '<tr class= \"TBLoneTR\" onblur= this.className=\"TBLoneTR\" onmouseover= this.className=\"TBLoneTRhover\" onfocus= this.className=\"TBLoneTRhover\" onmouseout= this.className=\"TBLoneTR\">';
        } else {
            userAlertHtml += '<tr class=\"TBLoneTRalt\" onblur=this.className=\"TBLoneTRalt\" onmouseover= this.className=\"TBLoneTRhover\" onfocus= this.className=\"TBLoneTRhover\" onmouseout= this.className=\"TBLoneTRalt\">';
        }
        userAlertHtml += '<TD scope=\"row\"  align=\"center\"><label for=\"chk1\" class=\"LBLinv\">' + selectItem + '</label>';
        userAlertHtml += '<input class=\"CHKStd\" type=\"checkbox\" id=\"chk1\" name=\"chk1\" title=\"'+ selectItem +'\"></td>';
        userAlertHtml += '<td><span>'+ alertMsgArr[i] +'</span></td>';
        userAlertHtml += '<td><span>'+ alertTypeArr[i] +'</span></td>';
        userAlertHtml += '<td><span>'+ alertSeqArr[i] +'</span></td>';
        userAlertHtml += '</tr>';
    }
    userAlertHtml += '</tbody></table></DIV>';
    userAlertHtml += '<SPAN class=\"bl\"></SPAN><SPAN class=\"br\"></SPAN></DIV></DIV>';
    userAlertHtml += '<TD></TR></tbody></TABLE></div>';
    document.getElementById("MDBTabContent").innerHTML = "";
    document.getElementById("MDBTabContent").innerHTML = userAlertHtml;
    document.getElementById("chkall").focus();
    return false;
}

function fnCheckUncheckAll()
{

    var l_ChBoxs = document.getElementsByName("chkall");
    var l_ChkStatus = true;
    if (l_ChBoxs[0].checked == true) 
        l_ChkStatus = true;
    else 
        l_ChkStatus = false;
    
    var l_ChBox = document.getElementsByName("chk1");
    for (var l_Cnt = 0; l_Cnt < l_ChBox.length; l_Cnt++)
    {
        l_ChBox[l_Cnt].checked = l_ChkStatus;
    }
}

function fncountAlerts(){
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+UserId+'' +
                    '</USERID><BRANCH>'+CurrentBranch+'</BRANCH><DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>GET_USERALERTS</ACTION><MSGSTAT/>' +
                    '<MODULEID>INFRA</MODULEID><MSGID/><ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV></FCUBS_REQ_ENV>';
    var userAlertReqDom = loadXMLDoc(requsetStr);
    var userAlertResDom = fnPostAlerts(userAlertReqDom, 'GET_USERALERTS');
    if (userAlertResDom  != null) {
        var msgstat = getNodeText(selectSingleNode(userAlertResDom, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if(msgstat=="SUCCESS"){
            var alertStr = getNodeText(selectSingleNode(userAlertResDom, "FCUBS_RES_ENV/FCUBS_HEADER/ADDL/PARAM/VALUE"));
            var alertcount = 0;
            if (alertStr != ""){
                processAlertStr(alertStr);                
                if(alertStr.indexOf("####") != -1)
                    alertcount = alertStr.split("####").length;
                else
                    alertcount = 1;
            }
        } 
    }
    return alertcount;
}