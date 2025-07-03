/*----------------------------------------------------------------------------------------------------
 **
 ** File Name    : WFReminderUtils.js
 **
 ** Module       : FCJNeoWeb
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
 ----------------------------------------------------------------------------------------------------
 */
 
function fnDISMISS(alertdetails,remarks){
    var alertIds = "";
    var alertSrc = "";
    var taskIdList = "";
    parent.resetAlert = alertdetails.split("!!!");
    for(var id=0; id < parent.resetAlert.length; id++) {
        if(parent.resetAlert[id].split(",")[7] != "NA")
        alertIds =  parent.resetAlert[id].split(",")[7]+"~"+alertIds;
        else
            taskIdList = parent.resetAlert[id].split(",")[3]+ "~" + taskIdList;
        alertSrc =  parent.resetAlert[id].split(",")[8]+ "~" + alertSrc;
    }
    parent.alertComments = remarks;
	parent.deleteProcessed = deleteRecords;
	parent.countRefresh = refreshCount;
    if(alertIds !="")
    buildAlertRequest("","",alertIds,alertSrc,"DISMISS"); 
    if(taskIdList !="")
        fnDismissReminder(taskIdList);
}

function fnFORWARD(alertdetails,remarks){
    var alertIds = "";
    var alertSrc = "";
    var taskIdList = "";
    parent.resetAlert  = alertdetails.split("!!!");
    for(var id=0; id < parent.resetAlert.length; id++) {
        alertIds =  parent.resetAlert[id].split(",")[7]+"~"+alertIds;
        alertSrc =  parent.resetAlert[id].split(",")[8]+ "~" + alertSrc;
        taskIdList = parent.resetAlert[id].split(",")[3]+ "~" + taskIdList;
    }
    parent.alertComments = remarks;
	parent.deleteProcessed = deleteRecords;
	parent.countRefresh = refreshCount;	
    fnSetReminder(taskIdList,alertIds,"FORWARD",alertSrc);
}

function fnRESET(alertdetails,remarks){
    var alertIds = "";
    var alertSrc = "";
    var taskIdList = "";
    parent.resetAlert = alertdetails.split("!!!");
    for(var id=0; id < parent.resetAlert.length; id++) {
        alertIds =  parent.resetAlert[id].split(",")[7]+"~"+alertIds;
        alertSrc =  parent.resetAlert[id].split(",")[8]+ "~" + alertSrc;
        taskIdList = parent.resetAlert[id].split(",")[3]+ "~" + taskIdList;
    }
    parent.alertComments = remarks;
	parent.deleteProcessed = deleteRecords;
	parent.countRefresh = refreshCount;	
    fnSetReminder(taskIdList,alertIds,"RESET",alertSrc);
}

function fnVIEW(alertdetails, remarks) {
        var alertIds = "";
        parent.resetAlert = alertdetails.split("!!!");
        for(var id=0; id < parent.resetAlert.length; id++) {
         alertIds = alertIds + "~" + parent.resetAlert[id].split(",")[7];
        }
        if(alertIds.split('~').length >2) {
		parent.showAlerts(parent.fnBuildAlertXML('IN-HEAR-205', 'E'), 'E');
		return false;
	}
	createTempForwardIframe( "FCDocumentControllerServlet?actionType=ViewMail&documentID=" + alertIds.split('~')[1]);
}
function createTempForwardIframe(src){
    try {
       clearTempDiv();
        var parent = document.getElementById('DIVif1');
        var iFrameBody = "";
        
        var customWin       = document.createElement("div");
		customWin.id        = "tempForwardDiv";
		customWin.className = "dhtmlwindow";
		customWin.style.position = "absolute";
		customWin.style.zIndex = 10;
       
        iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head><style>html, body{overflow: auto;}</style>';
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" width:100%; height:100%;padding:0px; margin:0px; border:0px none; \">';
        iFrameBody += "<FORM id='tempForward' method='post' action=\""+src+"\">";
        iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />";
        iFrameBody += "</FORM></body></html>";
        customWin.innerHTML = iFrameBody;
        parent.appendChild(customWin);
        
          var winObj = document.getElementById("tempForwardDiv");
		winObj.style.visibility="visible";
		winObj.style.display="block";
		document.getElementById("tempForward").submit();

    } catch (e) {}
}
function clearTempDiv(){
  var tempDiv = document.getElementById('tempForwardDiv');
  if(tempDiv){
    tempDiv.parentNode.removeChild(tempDiv);
}
}


function deleteRecords(failedAlertCount,failedAlertsIds,failedReasons){
        var tableBody = document.getElementById("ALERTTBL").tBodies[0];
        var tableBodyRows = tableBody.rows.length;
	if(failedAlertCount == 0)
	{
		failedAlertsIds = "";
		failedReasons = "";
	}
        for(var idx=0,idx2=0; idx<tableBodyRows; idx++) {
            if(tableBody.rows[idx2].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
			if(failedAlertsIds.indexOf(tableBody.rows[idx2].getAttribute("alertDtl").split(",")[7]) != -1) {
                            for(var id=0; id<failedAlertsIds.split("~").length ;id++)
				{
					if((tableBody.rows[idx2].getAttribute("alertDtl").split(",")[7]) == failedAlertsIds.split("~")[id])
					{
						tableBody.rows[idx2].cells[5].getElementsByTagName("SPAN")[0].innerHTML = mainWin.getCommonErrorList()[failedReasons.split("~")[id].split("~")[0]];
                                               
					}
				}
				 idx2++;				
			}
			else
			{
                            document.getElementById("ALERTTBL").tBodies[0].deleteRow(idx2);
			}
            }
             else {
                    idx2++;
            }
        }
    return true;
}

function refreshCount(){
    setInnerText(document.getElementById("wndtitle").getElementsByTagName('h1')[0],parent.lblNotification+'('+document.getElementById("ALERTTBL").tBodies[0].rows.length+')');
    return true;
}
function buildAlertRequest(resetDate,forwardUserId,alertIds,alertSrc,action){
        var response = false;
	var alertRequestXml = "<TaskRequest OP = 'ACTIONALERT'>";
        alertRequestXml += "<action>"+action+"</action>";
        alertRequestXml += "<alertIds>"+alertIds+"</alertIds>";
        alertRequestXml += "<alertSrc>"+alertSrc+"</alertSrc>";
        alertRequestXml += "<resetDate>"+resetDate+"</resetDate>";
        alertRequestXml += "<forwardUserId>"+forwardUserId+"</forwardUserId>";
        alertRequestXml += "<remarks>"+parent.alertComments+"</remarks>";
        alertRequestXml += "</TaskRequest>";
	try {
             var alertsRespDOM = parent.getTasksDom(alertRequestXml);             
	} catch(e) {
	}
	var failedAlertCount = getNodeText(selectSingleNode(alertsRespDOM, "//TaskResponse/FailedAlertCount"));
	var failedAlertsIds = getNodeText(selectSingleNode(alertsRespDOM, "//TaskResponse/FailedAlertsIds"));
	var failedReasons = getNodeText(selectSingleNode(alertsRespDOM, "//TaskResponse/FailedReasons"));        
        if(!parent.deleteProcessed(failedAlertCount,failedAlertsIds,failedReasons))
            return false;
        if(!parent.countRefresh())
            return false;
	if(action != 'FORWARD'){
            var resetDateObj = new Date();
            var resetDateArr = (resetDate.replace(" ","-").replace(":","-").replace(":","-")).split("-");
            resetDateObj.setYear(resetDateArr[0]);
            resetDateObj.setMonth(resetDateArr[1]-1);
            resetDateObj.setDate(resetDateArr[2]);
            resetDateObj.setHours(resetDateArr[3]);
            resetDateObj.setMinutes(resetDateArr[4]);
            resetDateObj.setSeconds(resetDateArr[5]);
            if(parent.lastPollTime < resetDateObj)
            {
                    for(var id=0;id < parent.resetAlert.length; id++) {
                            var tempArr =new Array();
                            tempArr[0] =parent.resetAlert[id].split(",")[0];
                            tempArr[1] =parent.resetAlert[id].split(",")[1];
                            tempArr[2] =(resetDate.replace(" ","-").replace(":","-").replace(":","-"));
                            tempArr[3] =parent.resetAlert[id].split(",")[3];
                            tempArr[4] =parent.resetAlert[id].split(",")[4];
                            tempArr[5] =parent.resetAlert[id].split(",")[5];
                            tempArr[6] =parent.resetAlert[id].split(",")[6];
                            tempArr[7] =parent.resetAlert[id].split(",")[7];
                            tempArr[8] =parent.resetAlert[id].split(",")[8];
                            parent.reminderAlertArray[parent.reminderAlertArray.length] = tempArr;
                    }
            }
	}
    
}

function fnNOTIFY(details,remarks)
{
       
     parent.gNotifAlerts = details.split('!!!');
     fnShowNotifScreen();
     
     return true;
}

function fnDismissReminder(taskIdList) {
	if (taskIdList != '')
	{
		var msg = '';
		var taskActionDOM = parent.fnDoAction(taskIdList, 'DISMISS_REMINDER');
		if (selectSingleNode(taskActionDOM, "//RESPONSE"))
		{
				parent.deleteProcessed('','','');
				parent.countRefresh();		
				unmask();
                parent.displayQueueTasks(parent.currentTaskTab);
                        //parent.fnBpelRefresh();
		}
		else if (selectSingleNode(taskActionDOM, "//ERROR/MESSAGE"))
		{
			var msgType = '';
			var errcode = '';
			if (selectNodes(taskActionDOM, "//ERROR/MESSAGE").length > 0)
			{
				for (var msgIdx = 1; msgIdx <= selectNodes(taskActionDOM, "//ERROR/MESSAGE").length; msgIdx++)
				{
					var messageNode = selectSingleNode(taskActionDOM, "//ERROR/MESSAGE["+msgIdx+"]");
					if (msgIdx == 1)
					{
						msgType = getNodeText(messageNode.getAttribute("TYPE"));
						msg = getNodeText(messageNode);
						errcode = msg.substring(0, msg.indexOf(" "));
					}
					else
					{
						msgType = msgType + "~" + getNodeText(messageNode.getAttribute("TYPE"));
						msg = msg + "~" + getNodeText(messageNode);
						errcode = errcode + "~" + msg.substring(0, msg.indexOf(" "));
					}
					if (msgType == null || msgType == "") 
						msgType = "I";
					if (msgType.indexOf("E") > -1)
						msgType = "E";
					else
						msgType = "I";
				}
			}
			parent.mask();
			parent.showAlerts(fnBuildAlertXML(errcode, msgType,msg), msgType);
			parent.alertAction = "UNMASK";
			//parent.fnBpelRefresh();
		}
	}
}


function deleteDayNote(param) {
        var response = false; //NISH#ALERT
	var taskRequestXml = "<TaskRequest OP = 'DELETENOTE'>";
        taskRequestXml += "<DayNote>" +param+ "</DayNote>";
        taskRequestXml += "</TaskRequest>";
	try {
             var tasksDom = parent.getTasksDom(taskRequestXml);
	} catch(e) {
	}
//        //NISH#ALERT STARTS
	if (selectNodes(tasksDom, "//RESPONSE").length == 1) 
            {
                 if(getNodeText(selectSingleNode(tasksDom,"//RESPONSE/STATUS"))=='SUCCESS')
                    response =true;
                 else if(getNodeText(selectSingleNode(tasksDom,"//RESPONSE/ERRCODE"))=='OR-NOTF-02')
                    {  
                        parent.showErrorAlerts(getNodeText(selectSingleNode(tasksDom,"//RESPONSE/ERRCODE")), 'E', getNodeText(selectSingleNode(tasksDom,"//RESPONSE/ERRPARAM")));
                        response =true;
                    }
                 else
                    {  
                        parent.showErrorAlerts(getNodeText(selectSingleNode(tasksDom,"//RESPONSE/ERRCODE")), 'E', getNodeText(selectSingleNode(tasksDom,"//RESPONSE/ERRPARAM")));
                        response =false;
                   }
             }   
    return response; //NISH#ALERT ENDS
}


function fnShowNotifScreen(event) {
    var screenArgs = new Array();
    //screenArgs["OBJECT"] = obj;
    screenArgs["FUNCTIONID"] = 'ORDNOTIF';
    screenArgs["EVENT"] = event;
    //detailWinParams = new Object();
    //detailWinParams.ShowSummary = "TRUE";
    //detailWinParams.DetailPkVals = getInnerText(obj);
    //parent.dispHref1Dashboard(funcId, parent.seqNo);    
    parent.dispHref1Dashboard('ORDNOTIF');    
    
}
function fnMinimizewindow(){
    parent.showReminderAlert();
}
function fnSetReminder(taskIdList,alertId,actionTaken,alertSrc) {
    var l_Params  = "&g_txnBranch=" +mainWin.CurrentBranch;
    l_Params += "&isFromAlert=true";
    l_Params += "&taskIdList="+taskIdList;
    l_Params += "&alertId="+alertId;
    l_Params += "&appDate=" +mainWin.AppDate;
    l_Params += "&appFormatedDate=" +mainWin.formattedDate;
    l_Params += "&actionTaken=" +actionTaken;
    l_Params += "&alertSrc=" +alertSrc;
    try {
            parent.mask();
            parent.loadSubScreenDIV("ChildWin", "WFReminder.jsp?"+l_Params);
    } catch (e) {
    }
}